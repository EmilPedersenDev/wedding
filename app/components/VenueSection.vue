<template>
  <section id="plats" class="section">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ v.eyebrow }}</p>
        <h2 class="section__title">{{ v.title }}</h2>
        <p class="section__lead">{{ v.body }}</p>
        <p class="venue__address">{{ v.address }}</p>
      </div>

      <figure v-reveal class="venue__figure">
        <img :src="wedding.images.venue.src" :alt="wedding.images.venue.alt" loading="lazy" />
      </figure>

      <div v-reveal class="venue__map">
        <iframe
          :src="mapSrc"
          title="Karta över Holmanäs gård"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>

      <p v-reveal class="venue__link">
        <a :href="v.mapLink" target="_blank" rel="noopener noreferrer">Öppna i Google Maps</a>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const v = wedding.venue;

// Google Maps embed utan API-nyckel.
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(v.mapQuery)}&output=embed`;
</script>

<style lang="scss" scoped>
.venue__address {
  margin-top: 1.25rem;
  font-size: 0.8125rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

.venue__figure {
  margin: 0 0 clamp(2rem, 5vw, 3rem);

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
}

.venue__map {
  iframe {
    width: 100%;
    aspect-ratio: 16 / 10;
    border: 1px solid var(--line);

    @media (min-width: 48rem) {
      aspect-ratio: 21 / 9;
    }
  }
}

.venue__link {
  text-align: center;
  margin-top: 1.5rem;

  a {
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-soft);
    text-underline-offset: 5px;
    text-decoration-color: var(--line);
    transition: color 0.2s ease;

    &:hover {
      color: var(--ink);
    }
  }
}
</style>
