<template>
  <section id="boende" class="section">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ a.eyebrow }}</p>
        <h2 class="section__title">{{ a.title }}</h2>
      </div>

      <!-- Typografiskt block istället för bild: siffran bär sektionen. -->
      <div v-reveal class="beds">
        <p class="beds__number">{{ a.beds }}</p>
        <p class="beds__label">{{ a.bedsLabel }}</p>
      </div>

      <div v-reveal class="measure accommodation__text">
        <p>{{ a.body }}</p>
        <p class="accommodation__note">{{ a.note }}</p>
      </div>

      <div v-reveal class="nearby">
        <h3 class="nearby__title">{{ a.nearbyTitle }}</h3>
        <ul class="nearby__list">
          <li v-for="stay in a.nearby" :key="stay.name" class="nearby__item">
            <p class="nearby__name">
              <a v-if="stay.link" :href="stay.link" target="_blank" rel="noopener noreferrer">{{ stay.name }}</a>
              <template v-else>{{ stay.name }}</template>
            </p>
            <p class="nearby__detail">{{ stay.detail }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const a = wedding.accommodation;
</script>

<style lang="scss" scoped>
.beds {
  text-align: center;
  margin-bottom: clamp(2.5rem, 6vw, 3.5rem);
}

.beds__number {
  font-family: var(--serif);
  font-size: clamp(6rem, 22vw, 12rem);
  line-height: 0.9;
  color: var(--ink);
}

.beds__label {
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-top: 1rem;
}

.accommodation__text {
  text-align: center;
  color: var(--ink-soft);
}

.accommodation__note {
  margin-top: 1rem;
  font-size: 0.9375rem;
  color: var(--ink-mute);
}

.nearby {
  margin-top: clamp(3.5rem, 8vw, 5.5rem);
}

.nearby__title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
}

.nearby__list {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--line);
  max-width: 46rem;
  margin-inline: auto;

  @media (min-width: 48rem) {
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
  }
}

.nearby__item {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--line);
}

.nearby__name {
  font-family: var(--serif);
  font-size: 1.25rem;

  a {
    text-underline-offset: 4px;
    text-decoration-color: var(--line);
  }
}

.nearby__detail {
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  color: var(--ink-mute);
}
</style>
