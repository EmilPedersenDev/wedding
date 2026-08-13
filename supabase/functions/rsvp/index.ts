// OSA-formulärets backend. Sajten är publik och oautentiserad, så den här funktionen
// är den enda skrivvägen till rsvp-tabellen (RLS är på, utan policies — service_role
// förbigår RLS, alla andra får ingenting). Pipeline, i ordning, med tidig retur på
// första felet: honeypot → Turnstile → rate limit → zod-validering → insert.
import { createClient } from "@supabase/supabase-js";
import { rsvpPayloadSchema, toFieldErrors } from "./schema.ts";

const ALLOWED_ORIGINS = new Set(
  (Deno.env.get("ALLOWED_ORIGINS") ?? "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_MAX_PER_HOUR = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_RETENTION_MS = 24 * 60 * 60 * 1000;

function corsHeaders(origin: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  // Origin ekas bara tillbaka om den finns i allowlistan — aldrig "*".
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(body: unknown, status: number, origin: string | null, extra?: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
      ...extra,
    },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function requireEnv(name: string): string | null {
  const value = Deno.env.get(name);
  return value && value.length > 0 ? value : null;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  // 0. CORS-preflight och metod.
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json({ ok: false, code: "method_not_allowed" }, 405, origin, { Allow: "POST, OPTIONS" });
  }

  // 0b. Storleksgräns innan vi ens parsar JSON.
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: "invalid" }, 400, origin);
  }

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, code: "invalid" }, 400, origin);
  }

  // 1. HONEYPOT — svara som en lyckad inskickning, men skriv ingenting.
  // Riktiga besökare ser aldrig fältet och lämnar det tomt.
  if (typeof raw?.website === "string" && raw.website.length > 0) {
    return json({ ok: true }, 200, origin);
  }

  // 2. TURNSTILE — fail closed om hemligheten saknas i miljön.
  const turnstileSecret = requireEnv("TURNSTILE_SECRET");
  if (!turnstileSecret) {
    console.error("rsvp: TURNSTILE_SECRET saknas i miljön");
    return json({ ok: false, code: "server_error" }, 500, origin);
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown";

  const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: turnstileSecret,
      response: String(raw?.turnstile_token ?? ""),
      remoteip: ip,
    }),
  });
  const turnstileOutcome = await turnstileResponse.json().catch(() => null);
  if (!turnstileOutcome?.success) {
    return json({ ok: false, code: "captcha" }, 403, origin);
  }

  // 3a. RATE LIMIT (läs) — blockera om över gränsen. Raden för det här försöket skrivs inte
  // här, utan efter lyckad validering (steg 3b) — annars förbrukar ett skräpigt eller trasigt
  // inskick av kvoten precis som ett giltigt, och en familj bakom samma NAT som råkar mista
  // en tangenttryckning tappar en del av sin gemensamma kvot i onödan.
  const ipSalt = requireEnv("IP_SALT");
  if (!ipSalt) {
    console.error("rsvp: IP_SALT saknas i miljön");
    return json({ ok: false, code: "server_error" }, 500, origin);
  }
  const ipHash = await sha256Hex(ip + ipSalt);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error: countError } = await db
    .from("rsvp_rate_limit")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", windowStart);

  if (countError) {
    console.error("rsvp: kunde inte läsa rate-limit-tabellen", { ipHash, code: countError.code });
    return json({ ok: false, code: "server_error" }, 500, origin);
  }

  if ((count ?? 0) >= RATE_LIMIT_MAX_PER_HOUR) {
    console.error("rsvp: rate limited", { ipHash });
    return json({ ok: false, code: "rate_limited" }, 429, origin, { "Retry-After": "3600" });
  }

  // Städa gamla rader opportunistiskt (~5 % av anropen), utan att blockera svaret.
  if (Math.random() < 0.05) {
    const retentionCutoff = new Date(Date.now() - RATE_LIMIT_RETENTION_MS).toISOString();
    EdgeRuntime.waitUntil(
      db.from("rsvp_rate_limit").delete().lt("created_at", retentionCutoff).then(() => {}),
    );
  }

  // 4. VALIDERING — enda auktoritativa källan, oavsett vad klienten redan kollat.
  const parsed = rsvpPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, code: "invalid", fields: toFieldErrors(parsed.error) }, 400, origin);
  }
  const { website: _honeypot, turnstile_token: _token, ...data } = parsed.data;

  // 3b. RATE LIMIT (skriv) — försöket är nu giltigt, räkna det mot kvoten.
  await db.from("rsvp_rate_limit").insert({ ip_hash: ipHash });

  // 5. INSERT — via service_role, som förbigår RLS.
  const { error: insertError } = await db.from("rsvp").insert({
    ...data,
    allergies_and_special_food: data.allergies_and_special_food || null,
    other_information: data.other_information || null,
    submitted_ip_hash: ipHash,
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 512) || null,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return json({ ok: false, code: "duplicate" }, 409, origin);
    }
    // Logga aldrig error.message/.details — PostgREST:s konfliktdetaljer innehåller
    // den inskickade e-postadressen i klartext. Bara felkod och hashad IP.
    console.error("rsvp: insert misslyckades", { ipHash, code: insertError.code });
    return json({ ok: false, code: "server_error" }, 500, origin);
  }

  return json({ ok: true }, 200, origin);
});
