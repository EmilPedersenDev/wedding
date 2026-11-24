<template>
  <section id="tal" class="section section--alt">
    <div v-reveal class="shell measure speeches">
      <h2 class="section__title">{{ s.title }}</h2>
      <p class="section__lead">{{ s.intro }}</p>
      <p class="speeches__para">
        {{ s.mailLabel }}: <a :href="`mailto:${s.email}`">{{ s.email }}</a>
      </p>
      <p class="speeches__para">{{ s.subjectLabel }}: {{ s.subject }}</p>
      <p class="speeches__para">{{ s.instructions }}</p>
      <p class="speeches__para">{{ s.timeLimit }}</p>
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

.speeches__para {
  margin-top: 1rem;
  color: var(--ink-soft);
}
</style>
