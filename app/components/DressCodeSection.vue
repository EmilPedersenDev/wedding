<template>
  <section id="kladkod" class="section">
    <div class="shell split">
      <figure v-reveal class="split__figure">
        <img :src="wedding.images.dressCode.src" :alt="wedding.images.dressCode.alt" loading="lazy" />
      </figure>

      <div v-reveal class="split__text">
        <p class="eyebrow">{{ d.eyebrow }}</p>
        <h2 class="section__title">{{ d.title }}</h2>
        <p class="section__lead">{{ d.body }}</p>
        <p class="split__note">{{ d.note }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const d = wedding.dressCode;
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

.split__figure {
  margin: 0;

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }
}

.split__note {
  margin-top: 1.25rem;
  font-size: 0.9375rem;
  color: var(--ink-mute);
}
</style>
