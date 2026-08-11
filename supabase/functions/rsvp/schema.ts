import { z } from "zod";

// Speglar app/utils/rsvpLimits.ts (klientvalidering) och check-constraints i
// supabase/migrations/20260811092112_rsvp.sql (sista skyddslinjen i databasen).
const LIMITS = { name: 100, email: 254, diet: 500, note: 1000, guestsMax: 10 } as const;

/**
 * Enda källan till sanning för indata till OSA-funktionen. `.strict()` avvisar
 * okända nycklar. Varje fälts felmeddelande ÄR maskinkoden som skickas till
 * klienten (se toFieldErrors) — indata ekas aldrig tillbaka i ett svar.
 */
export const rsvpPayloadSchema = z
  .object({
    name: z
      .string({ error: "required" })
      .trim()
      .min(1, { error: "required" })
      .max(LIMITS.name, { error: "too_long" }),
    email: z
      .string({ error: "required" })
      .trim()
      .toLowerCase()
      .pipe(z.email({ error: "invalid_email" }).max(LIMITS.email, { error: "too_long" })),
    // Strikt boolean — ingen coercion från t.ex. strängen "yes".
    attending: z.boolean({ error: "invalid_type" }),
    num_of_guests: z
      .int({ error: "invalid_type" })
      .min(0, { error: "out_of_range" })
      .max(LIMITS.guestsMax, { error: "out_of_range" }),
    allergies_and_special_food: z.string().trim().max(LIMITS.diet, { error: "too_long" }).optional().default(""),
    other_information: z.string().trim().max(LIMITS.note, { error: "too_long" }).optional().default(""),
    // Honeypot: riktiga besökare lämnar den tom. Kontrolleras redan innan schemat
    // körs (se index.ts), men max(0) håller den strikt även här.
    website: z.string().max(0, { error: "invalid_type" }).optional().default(""),
    turnstile_token: z.string().max(2048, { error: "invalid_type" }).optional().default(""),
  })
  .strict();

export type RsvpPayload = z.infer<typeof rsvpPayloadSchema>;

/**
 * zod-fel → { fält: maskinkod }. Meddelandet i varje issue ÄR koden (satt ovan
 * via `{ error: "..." }`), så den här funktionen kan aldrig råka läcka indata.
 * Bara första felet per fält tas med — klienten behöver inte fler.
 */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (key in fields) continue;
    // .strict()'s default "unrecognized_keys" message includes the raw key name the
    // caller sent — override it so every code we return is one of our own fixed strings.
    fields[key] = issue.code === "unrecognized_keys" ? "unrecognized_key" : issue.message;
  }
  return fields;
}
