// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      rsvpFormUrl: "", // e.g. Google Form URL; leave empty to use mailto
      wedding: {
        names: "Emil & Anna",
        date: "Date TBA",
        time: "Time TBA",
        venue: "Venue TBA",
        tagline: "We're getting married!",
      },
    },
  },
});
