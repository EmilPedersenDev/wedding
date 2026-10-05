// OSA-formulärets backend. Sajten är publik och oautentiserad, så den här funktionen
// är den enda skrivvägen till rsvp-tabellen (RLS är på, utan policies — service_role
// förbigår RLS, alla andra får ingenting). Pipeline: zod-validering → insert.
import { createClient } from "@supabase/supabase-js";
import { rsvpPayloadSchema, toFieldErrors } from "./schema.ts";

const ALLOWED_ORIGINS = new Set(
  (Deno.env.get("ALLOWED_ORIGINS") ?? "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

const MAX_BODY_BYTES = 8_192;

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

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, code: "invalid" }, 400, origin);
  }

  // 1. VALIDERING — enda auktoritativa källan, oavsett vad klienten redan kollat.
  const parsed = rsvpPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, code: "invalid", fields: toFieldErrors(parsed.error) }, 400, origin);
  }
  const data = parsed.data;

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 2. INSERT — via service_role, som förbigår RLS.
  const { error: insertError } = await db.from("rsvp").insert({
    ...data,
    guest_name: data.guest_name || null,
    allergies_and_special_food: data.allergies_and_special_food || null,
    other_information: data.other_information || null,
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 512) || null,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return json({ ok: false, code: "duplicate" }, 409, origin);
    }
    // Logga aldrig error.message/.details — PostgREST:s konfliktdetaljer innehåller
    // den inskickade e-postadressen i klartext. Bara felkoden.
    console.error("rsvp: insert misslyckades", { code: insertError.code });
    return json({ ok: false, code: "server_error" }, 500, origin);
  }

  return json({ ok: true }, 200, origin);
});
