/**
 * Gränser för OSA-formuläret, delade mellan klientvalideringen i RsvpSection.vue
 * och den auktoritativa servervalideringen. Måste hållas i synk för hand med:
 * - `LIMITS` i supabase/functions/rsvp/schema.ts (zod-schemat, körs på servern)
 * - check-constraints i supabase/migrations/20260811092112_rsvp.sql (sista skyddslinjen)
 */
export const RSVP_LIMITS = {
  name: 100,
  email: 254,
  diet: 500,
  note: 1000,
  guestsMin: 1,
  guestsMax: 10,
} as const;
