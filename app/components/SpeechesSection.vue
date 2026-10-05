<template>
  <section id="tal" class="section">
    <div v-reveal class="shell measure speeches">
      <h2 class="section__title">{{ s.title }}</h2>
      <p class="section__lead" v-html="s.body"></p>
      <p class="speeches__note">{{ s.note }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const s = wedding.speeches;
</script>

<style lang="scss" scoped>
.speeches {
  text-align: center;
}

.speeches__note {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  color: var(--ink-mute);
  font-size: 0.9375rem;
}
</style>
