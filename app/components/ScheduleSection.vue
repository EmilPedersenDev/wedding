<template>
  <section id="schema" class="section section--alt">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ s.eyebrow }}</p>
        <h2 class="section__title">{{ s.title }}</h2>
        <p class="section__lead">{{ s.body }}</p>
      </div>

      <div class="schedule">
        <figure v-reveal class="schedule__figure">
          <img :src="wedding.images.schedule.src" :alt="wedding.images.schedule.alt" loading="lazy" />
        </figure>

        <ol class="schedule__list">
          <li
            v-for="(item, i) in s.items"
            :key="item.time"
            v-reveal="{ delay: i * 80 }"
            class="schedule__item"
          >
            <p class="schedule__time">{{ item.time }}</p>
            <div>
              <h3 class="schedule__title">{{ item.title }}</h3>
              <p class="schedule__body">{{ item.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const s = wedding.schedule;
</script>

<style lang="scss" scoped>
.schedule {
  display: grid;
  gap: clamp(2.5rem, 6vw, 4rem);
  align-items: start;

  @media (min-width: 60rem) {
    grid-template-columns: 1fr 1fr;
  }
}

.schedule__figure {
  margin: 0;

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }
}

.schedule__list {
  display: flex;
  flex-direction: column;
}

.schedule__item {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 1.5rem;
  padding-bottom: 2.25rem;
  position: relative;

  /* Hårfin tidslinje mellan punkterna. */
  &::before {
    content: "";
    position: absolute;
    left: calc(4.5rem + 0.75rem - 1px);
    top: 0.9rem;
    bottom: -0.4rem;
    width: 1px;
    background: var(--line);
  }

  &::after {
    content: "";
    position: absolute;
    left: calc(4.5rem + 0.75rem - 3px);
    top: 0.65rem;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent);
  }

  &:last-child {
    padding-bottom: 0;

    &::before {
      display: none;
    }
  }
}

.schedule__time {
  font-family: var(--serif);
  font-size: 1.25rem;
  line-height: 1.4;
  text-align: right;
  color: var(--ink-soft);
}

.schedule__title {
  font-size: 1.375rem;
  margin-bottom: 0.35rem;
}

.schedule__body {
  color: var(--ink-soft);
  font-size: 0.9375rem;
}

/* Ge plats åt tidslinjen till höger om tidskolumnen. */
.schedule__item > div {
  padding-left: 1.25rem;
}
</style>
