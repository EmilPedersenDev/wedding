// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // Innehållet på sajten bor i app/content/wedding.ts, inte här.
  css: ["~/assets/css/main.scss"],
  runtimeConfig: {
    public: {
      // Bakas in vid `nuxt generate` — måste alltså finnas i byggmiljön, inte
      // bara lokalt. Standardvärdet gör att ett vanligt `npm run generate`
      // ändå pekar mot rätt edge-funktion.
      rsvpEndpoint: "https://awrcqefsaikbupktaqdj.supabase.co/functions/v1/rsvp",
      // Tom sträng lokalt = OSA-formuläret hoppar över Turnstile-widgeten och
      // faller tillbaka till mock-inskickningen. Sätts via NUXT_PUBLIC_TURNSTILE_SITE_KEY.
      turnstileSiteKey: "",
    },
  },
});
