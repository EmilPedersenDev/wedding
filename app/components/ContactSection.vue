<template>
  <section id="kontakt" class="section section--alt">
    <div v-reveal class="shell measure contact">
      <p class="eyebrow">{{ c.eyebrow }}</p>
      <h2 class="section__title">{{ c.title }}</h2>
      <p class="section__lead">{{ c.body }}</p>

      <div class="contact__card">
        <p class="contact__name">{{ c.person }}</p>
        <p class="contact__role">{{ c.role }}</p>

        <p class="contact__links">
          <a :href="`mailto:${c.email}`">{{ c.email }}</a>
          <span class="contact__dot" aria-hidden="true">·</span>
          <a :href="`tel:${c.phone.replace(/[^+\d]/g, '')}`">{{ c.phone }}</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const c = wedding.contact;
</script>

<style lang="scss" scoped>
.contact {
  text-align: center;
}

.contact__card {
  margin-top: 2.5rem;
  padding-block: 2rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.contact__name {
  font-family: var(--serif);
  font-size: 1.75rem;
}

.contact__role {
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-top: 0.35rem;
}

.contact__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 0.85rem;
  margin-top: 1.5rem;
  font-size: 0.9375rem;

  a {
    color: var(--ink-soft);
    text-underline-offset: 5px;
    text-decoration-color: var(--line);
    transition: color 0.2s ease;

    &:hover {
      color: var(--ink);
    }
  }
}

.contact__dot {
  color: var(--ink-mute);
}
</style>
