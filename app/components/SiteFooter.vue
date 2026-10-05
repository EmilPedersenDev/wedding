<template>
  <footer class="footer">
    <div class="footer__media">
      <img :src="wedding.images.footer.src" :alt="wedding.images.footer.alt" loading="lazy" />
    </div>

    <div class="footer__inner">
      <nav class="footer__links" aria-label="Sidfot">
        <a v-for="item in wedding.nav" :key="item.id" :href="`#${item.id}`">{{ item.label }}</a>
      </nav>

      <hr class="rule" />

      <p class="footer__closing">{{ wedding.footer.closing }}</p>
      <p class="footer__meta">{{ wedding.names }} · {{ wedding.date }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";
</script>

<style lang="scss" scoped>
.footer {
  background: var(--bg-tint);
}

.footer__media {
  padding: clamp(3rem, 8vw, 5rem) var(--gutter) 0;

  img {
    width: min(100%, 24rem);
    aspect-ratio: 3 / 4;
    object-fit: cover;
    margin-inline: auto;
  }
}

.footer__inner {
  text-align: center;
  padding: clamp(3rem, 8vw, 5rem) var(--gutter);
  max-width: 40rem;
  margin-inline: auto;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 1.5rem;

  a {
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--ink-soft);
    transition: color 0.2s ease;

    &:hover {
      color: var(--ink);
    }
  }
}

.footer__closing {
  font-family: var(--serif);
  font-size: 1.25rem;
  margin-top: 2rem;
}

.footer__meta {
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  color: var(--ink-mute);
  margin-top: 0.5rem;
}
</style>
