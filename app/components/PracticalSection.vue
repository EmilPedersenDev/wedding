<template>
  <section id="praktiskt" class="section section--alt">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ p.eyebrow }}</p>
        <h2 class="section__title">{{ p.title }}</h2>
      </div>

      <div class="notes">
        <div v-reveal class="notes__item">
          <p class="eyebrow">{{ p.dressCode.label }}</p>
          <h3 class="notes__title">{{ p.dressCode.title }}</h3>
          <p class="notes__body">{{ p.dressCode.body }}</p>
        </div>

        <div v-reveal="{ delay: 80 }" class="notes__item">
          <p class="eyebrow">{{ p.gifts.label }}</p>
          <h3 class="notes__title">{{ p.gifts.title }}</h3>
          <p class="notes__body">{{ p.gifts.body }}</p>

          <div class="swish">
            <p class="swish__label">{{ p.gifts.swishLabel }}</p>
            <p class="swish__number">{{ p.gifts.swish }}</p>
          </div>
        </div>
      </div>

      <h3 v-reveal class="faq__title">{{ p.faqTitle }}</h3>

      <div v-reveal class="faq">
        <!-- Native details/summary ger korrekt tangentbords- och skärmläsarbeteende. -->
        <details v-for="item in p.faq" :key="item.q" class="faq__item">
          <summary class="faq__q">
            <span>{{ item.q }}</span>
            <span class="faq__icon" aria-hidden="true"></span>
          </summary>
          <p class="faq__a">{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const p = wedding.practical;
</script>

<style lang="scss" scoped>
.notes {
  display: grid;
  gap: 3rem;

  @media (min-width: 48rem) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.notes__item {
  padding-top: 2rem;
  border-top: 1px solid var(--line);

  .eyebrow {
    margin-bottom: 0.9rem;
  }
}

.notes__title {
  font-size: 1.625rem;
  margin-bottom: 1rem;
}

.notes__body {
  color: var(--ink-soft);
  font-size: 0.9375rem;
}

.swish {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  margin-top: 1.75rem;
}

.swish__label {
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.swish__number {
  font-family: var(--serif);
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  letter-spacing: 0.04em;
}

.faq__title {
  font-size: 1.5rem;
  text-align: center;
  margin: clamp(4rem, 9vw, 6rem) 0 2.5rem;
}

.faq {
  max-width: 44rem;
  margin-inline: auto;
  border-top: 1px solid var(--line);
}

.faq__item {
  border-bottom: 1px solid var(--line);
}

.faq__q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.35rem 0;
  cursor: pointer;
  font-family: var(--serif);
  font-size: 1.25rem;
  list-style: none;
  transition: color 0.2s ease;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    color: var(--accent);
  }
}

/* Plustecken som roterar till minus när frågan är öppen. */
.faq__icon {
  position: relative;
  flex: 0 0 auto;
  width: 0.75rem;
  height: 0.75rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 50% 0 auto;
    height: 1px;
    background: currentColor;
    transition: transform 0.25s ease;
  }

  &::after {
    transform: rotate(90deg);
  }
}

.faq__item[open] .faq__icon::after {
  transform: rotate(0deg);
}

.faq__a {
  padding: 0 0 1.5rem;
  max-width: 36rem;
  color: var(--ink-soft);
  font-size: 0.9375rem;
}
</style>
