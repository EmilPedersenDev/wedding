<template>
  <section id="faq" class="section">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ f.eyebrow }}</p>
        <h2 class="section__title">{{ f.title }}</h2>
      </div>

      <div v-reveal class="faq">
        <!-- Native details/summary ger korrekt tangentbords- och skärmläsarbeteende. -->
        <details v-for="item in f.items" :key="item.q" class="faq__item">
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

const f = wedding.faq;
</script>

<style lang="scss" scoped>
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
