<template>
  <section id="resa" class="section section--alt">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ t.eyebrow }}</p>
        <h2 class="section__title">{{ t.title }}</h2>
        <p class="section__lead">{{ t.body }}</p>
      </div>

      <figure v-reveal class="travel__figure">
        <img :src="wedding.images.travel.src" :alt="wedding.images.travel.alt" loading="lazy" />
      </figure>

      <ul class="travel__list">
        <li v-for="(item, i) in t.items" :key="item.title" v-reveal="{ delay: i * 80 }" class="travel__item">
          <h3 class="travel__title">{{ item.title }}</h3>
          <p class="travel__body">{{ item.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const t = wedding.travel;
</script>

<style lang="scss" scoped>
.travel__figure {
  margin: 0 0 clamp(2.5rem, 6vw, 4rem);

  img {
    width: 100%;
    aspect-ratio: 21 / 9;
    object-fit: cover;
  }
}

.travel__list {
  display: grid;
  gap: 2.5rem;

  @media (min-width: 48rem) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}

.travel__item {
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.travel__title {
  font-size: 1.375rem;
  margin-bottom: 0.6rem;
}

.travel__body {
  color: var(--ink-soft);
  font-size: 0.9375rem;
}
</style>
