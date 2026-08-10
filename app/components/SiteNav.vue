<template>
  <header class="nav" :class="{ 'nav--solid': scrolled || menuOpen }">
    <div class="nav__bar">
      <a class="nav__brand" href="#top">{{ wedding.names }}</a>

      <nav class="nav__links" aria-label="Sektioner">
        <a
          v-for="item in wedding.nav"
          :key="item.id"
          class="nav__link"
          :class="{ 'nav__link--active': activeId === item.id }"
          :href="`#${item.id}`"
          :aria-current="activeId === item.id ? 'true' : undefined"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        class="nav__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="nav-overlay"
        @click="menuOpen = !menuOpen"
      >
        <span class="nav__toggle-label">{{ menuOpen ? "Stäng" : "Meny" }}</span>
        <span class="nav__toggle-icon" :class="{ 'is-open': menuOpen }" aria-hidden="true">
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <div v-show="menuOpen" id="nav-overlay" class="nav__overlay">
      <nav aria-label="Sektioner, mobil">
        <a
          v-for="item in wedding.nav"
          :key="item.id"
          class="nav__overlay-link"
          :href="`#${item.id}`"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const scrolled = ref(false);
const menuOpen = ref(false);
const activeId = ref<string>("");

function onScroll() {
  scrolled.value = window.scrollY > 80;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") menuOpen.value = false;
}

// Lås bakgrundsscroll när mobilmenyn är öppen.
watch(menuOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

let sectionObserver: IntersectionObserver | undefined;

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);

  // Markera den sektion som ligger närmast toppen av vyn.
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) activeId.value = visible.target.id;
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  for (const item of wedding.nav) {
    const el = document.getElementById(item.id);
    if (el) sectionObserver.observe(el);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
  sectionObserver?.disconnect();
  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  color: var(--bg);
  transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease;
  border-bottom: 1px solid transparent;

  &--solid {
    background: var(--bg);
    color: var(--ink);
    border-bottom-color: var(--line);
  }
}

.nav__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  height: var(--nav-h);
  padding-inline: var(--gutter);
  max-width: 78rem;
  margin-inline: auto;
}

.nav__brand {
  font-family: var(--serif);
  font-size: 1.25rem;
  letter-spacing: 0.06em;
  text-decoration: none;
  white-space: nowrap;
}

.nav__links {
  display: none;
  gap: 1.75rem;

  @media (min-width: 64rem) {
    display: flex;
  }
}

.nav__link {
  position: relative;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  padding-block: 0.25rem;
  opacity: 0.85;
  transition: opacity 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 1px;
    background: var(--accent);
    transform: scaleX(0);
    transition: transform 0.25s ease;
  }

  &:hover {
    opacity: 1;
  }

  &--active {
    opacity: 1;

    &::after {
      transform: scaleX(1);
    }
  }
}

.nav__toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: 0;
  padding: 0.5rem 0;
  cursor: pointer;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  @media (min-width: 64rem) {
    display: none;
  }
}

.nav__toggle-icon {
  display: block;
  width: 1.25rem;

  span {
    display: block;
    height: 1px;
    background: currentColor;
    transition: transform 0.25s ease, opacity 0.25s ease;

    & + span {
      margin-top: 5px;
    }
  }

  &.is-open span:first-child {
    transform: translateY(3px) rotate(45deg);
  }

  &.is-open span:last-child {
    transform: translateY(-3px) rotate(-45deg);
  }
}

.nav__overlay {
  background: var(--bg);
  color: var(--ink);
  height: calc(100dvh - var(--nav-h));
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem var(--gutter) 4rem;

  @media (min-width: 64rem) {
    display: none;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
}

.nav__overlay-link {
  font-family: var(--serif);
  font-size: 1.75rem;
  text-decoration: none;
  padding-block: 0.6rem;
  border-bottom: 1px solid var(--line);

  &:last-child {
    border-bottom: 0;
  }
}
</style>
