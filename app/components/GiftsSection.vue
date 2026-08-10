<template>
  <section id="presenter" class="section section--alt">
    <div class="shell split">
      <div v-reveal class="split__text">
        <p class="eyebrow">{{ g.eyebrow }}</p>
        <h2 class="section__title">{{ g.title }}</h2>
        <p class="section__lead">{{ g.body }}</p>

        <div class="swish">
          <p class="swish__label">{{ g.swishLabel }}</p>
          <p class="swish__number">{{ g.swish }}</p>
        </div>

        <p class="split__note">{{ g.note }}</p>
      </div>

      <figure v-reveal class="split__figure">
        <img :src="wedding.images.gifts.src" :alt="wedding.images.gifts.alt" loading="lazy" />
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const g = wedding.gifts;
</script>

<style lang="scss" scoped>
.split {
  display: grid;
  gap: clamp(2rem, 6vw, 4rem);
  align-items: center;

  @media (min-width: 60rem) {
    grid-template-columns: 1fr 1fr;
  }
}

/* Bilden först på mobil, texten först på desktop. */
.split__figure {
  margin: 0;
  order: -1;

  @media (min-width: 60rem) {
    order: 0;
  }

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }
}

.swish {
  margin-top: 2rem;
  padding-block: 1.25rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.swish__label {
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.swish__number {
  font-family: var(--serif);
  font-size: clamp(1.5rem, 4vw, 2rem);
  letter-spacing: 0.04em;
  margin-top: 0.35rem;
}

.split__note {
  margin-top: 1.25rem;
  font-size: 0.9375rem;
  color: var(--ink-mute);
}
</style>
