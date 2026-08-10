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
  ],
});
</script>
