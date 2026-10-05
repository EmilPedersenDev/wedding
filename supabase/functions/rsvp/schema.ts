import { z } from "zod";

// Speglar app/utils/rsvpLimits.ts (klientvalidering) och check-constraints i
// supabase/migrations/20260811092112_rsvp.sql (sista skyddslinjen i databasen).
const LIMITS = { name: 100, email: 254, diet: 500, note: 1000, guestsMax: 10 } as const;

/**
 * Enda källan till sanning för indata till OSA-funktionen. Okända nycklar strippas
 * i stället för att avvisas, så att en cachad äldre klient som fortfarande skickar
 * borttagna fält (t.ex. `website`, `turnstile_token`) inte fastnar på ett 400 den
 * inte kan visa. Varje fälts felmeddelande ÄR maskinkoden som skickas till
 * klienten (se toFieldErrors) — indata ekas aldrig tillbaka i ett svar.
 */
export const rsvpPayloadSchema = z.object({
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
});

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
    fields[key] = issue.message;
  }
  return fields;
}
