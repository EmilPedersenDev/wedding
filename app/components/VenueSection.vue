<template>
  <section id="plats" class="section section--alt">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ v.eyebrow }}</p>
        <h2 class="section__title">{{ v.title }}</h2>
        <p class="section__lead">{{ v.body }}</p>
        <p class="venue__address">{{ v.address }}</p>
      </div>

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

      <ul class="venue__info">
        <li v-for="(item, i) in v.items" :key="item.title" v-reveal="{ delay: i * 80 }" class="venue__info-item">
          <h3 class="venue__info-title">{{ item.title }}</h3>
          <p class="venue__info-body">{{ item.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const v = wedding.venue;
const mapSrc = mapEmbedSrc(v.mapQuery);
</script>

<style lang="scss" scoped>
.venue__address {
  margin-top: 1.25rem;
  font-size: 0.8125rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-mute);
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

.venue__info {
  display: grid;
  max-width: 46rem;
  margin: clamp(3rem, 7vw, 4.5rem) auto 0;
  text-align: center;

  @media (min-width: 48rem) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.venue__info-item {
  padding: 2rem 1rem;

  & + & {
    border-top: 1px solid var(--line);
  }

  @media (min-width: 48rem) {
    padding: 0.5rem 2.5rem;

    & + & {
      border-top: 0;
      border-left: 1px solid var(--line);
    }
  }
}

.venue__info-title {
  font-size: 1.5rem;

  &::after {
    content: "";
    display: block;
    width: 2rem;
    height: 1px;
    margin: 0.9rem auto 1rem;
    background: var(--accent);
  }
}

.venue__info-body {
  color: var(--ink-soft);
  font-size: 0.9375rem;
  text-wrap: pretty;
}
</style>
