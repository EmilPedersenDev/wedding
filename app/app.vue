<template>
  <div>
    <NuxtRouteAnnouncer />
    <a class="skip-link" href="#main">Hoppa till innehållet</a>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

useHead({
  htmlAttrs: { lang: "sv" },
  title: `${wedding.names} — ${wedding.date}`,
  link: [
    { rel: "icon", type: "image/png", href: "/wedding-rings.png" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "preconnect", href: "https://images.unsplash.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400;500&display=swap",
    },
  ],
  meta: [
    { name: "description", content: `${wedding.names} gifter sig ${wedding.date} på ${wedding.venue.title}.` },
    // Sidan är byggd för att delas direkt med gäster via länk, inte för att hittas via sökmotorer.
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: `${wedding.names} — ${wedding.date}` },
    { property: "og:description", content: `${wedding.names} gifter sig ${wedding.date} på ${wedding.venue.title}.` },
    { property: "og:image", content: wedding.images.hero.src },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${wedding.names} — ${wedding.date}` },
    { name: "twitter:description", content: `${wedding.names} gifter sig ${wedding.date} på ${wedding.venue.title}.` },
    { name: "twitter:image", content: wedding.images.hero.src },
  ],
});
</script>
