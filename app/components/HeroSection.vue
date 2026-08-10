<template>
  <section id="top" class="hero">
    <img
      class="hero__img"
      :src="wedding.images.hero.src"
      :alt="wedding.images.hero.alt"
      fetchpriority="high"
    />

    <div class="hero__inner">
      <p class="hero__intro">{{ wedding.hero.intro }}</p>
      <h1 class="hero__names">{{ wedding.names }}</h1>

      <p class="hero__meta">
        <time :datetime="wedding.dateISO">{{ wedding.date }}</time>
        <span class="hero__dot" aria-hidden="true">·</span>
        <span>{{ wedding.hero.location }}</span>
      </p>

      <a class="btn hero__cta" href="#osa">{{ wedding.hero.cta }}</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: calc(var(--nav-h) + 2rem) var(--gutter) 4rem;
  overflow: hidden;
  color: #fff;
  isolation: isolate;
}

.hero__img {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Mörk gradient så texten håller kontrast oavsett bild. */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgba(20, 18, 16, 0.55) 0%, rgba(20, 18, 16, 0.35) 45%, rgba(20, 18, 16, 0.6) 100%);
}

.hero__inner {
  text-align: center;
  max-width: 44rem;
}

.hero__intro {
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.9;
  margin-bottom: 1.75rem;
}

.hero__names {
  font-size: clamp(3rem, 12vw, 6.5rem);
  line-height: 1.05;
  margin-bottom: 1.75rem;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 3rem;
}

.hero__dot {
  opacity: 0.6;
}

.hero__cta {
  color: var(--ink);
  background: #fff;
  border-color: #fff;

  &:hover {
    background: transparent;
    color: #fff;
  }
}
</style>
