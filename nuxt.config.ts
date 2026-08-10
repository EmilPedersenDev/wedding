// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // Innehållet på sajten bor i app/content/wedding.ts, inte här.
  css: ["~/assets/css/main.scss"],
});
