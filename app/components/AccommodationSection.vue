<template>
  <section id="boende" class="section">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <h2 class="section__title">{{ a.title }}</h2>
      </div>

      <div v-reveal class="stays measure">
        <p class="section__lead farm__intro" v-html="a.intro"></p>
        <ul class="farm">
          <li v-for="(unit, i) in a.nearby" :key="i" class="farm__item">
            <span class="farm__name">{{ unit.name }}</span>
            <span class="farm__detail">{{ unit.detail }}</span>
          </li>
        </ul>
        <p class="stays__note">{{ a.bookingNote }}</p>
      </div>

      <div v-reveal class="stays">
        <h3 class="stays__title">{{ a.hotelsTitle }}</h3>
        <div class="explorer">
          <div class="explorer__map">
            <iframe
              id="stays-map"
              :key="selected.name"
              :src="mapEmbedSrc(selected.mapQuery, 12)"
              :title="`Karta över ${selected.name}`"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>

          <ul class="explorer__list">
            <li v-for="hotel in a.hotels" :key="hotel.name">
              <button
                type="button"
                class="stay"
                :class="{ 'stay--active': hotel === selected }"
                :aria-pressed="hotel === selected"
                aria-controls="stays-map"
                @click="selected = hotel"
              >
                <span class="stay__distance">{{ hotel.distance }}</span>
                <span class="stay__name">{{ hotel.name }}</span>
                <span class="stay__detail">{{ hotel.detail }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <hr v-reveal class="rule" />
      <div v-reveal class="measure accommodation__footer">
        <p>{{ a.cityNote }}</p>
        <p v-html="a.footer"></p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const a = wedding.accommodation;
// shallowRef så att jämförelsen mot listans objekt sker på identitet, inte mot en reaktiv proxy.
const selected = shallowRef<(typeof a.hotels)[number]>(a.hotels[0]);
</script>

<style lang="scss" scoped>
.stays {
  & + & {
    margin-top: clamp(3.5rem, 8vw, 5.5rem);
  }
}

.stays__title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
}

.stays__note {
  text-align: center;
  margin: 2rem auto 0;
  max-width: 34rem;
  font-size: 0.9375rem;
  color: var(--ink-mute);
}

.farm__intro {
  text-align: center;
  margin-bottom: 2rem;
}

.farm {
  border-top: 1px solid var(--line);
}

.farm__item {
  display: grid;
  gap: 0.15rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--line);

  @media (min-width: 36rem) {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1.5rem;
  }
}

.farm__name {
  font-family: var(--serif);
  font-size: 1.25rem;
  line-height: 1.35;
}

.farm__detail {
  font-size: 0.875rem;
  color: var(--ink-soft);
}

.explorer {
  display: grid;
  gap: 1rem;

  @media (min-width: 60rem) {
    grid-template-columns: minmax(0, 1fr) 21rem;
    gap: 1.5rem;
  }
}

.explorer__map iframe {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  border: 1px solid var(--line);

  @media (min-width: 60rem) {
    aspect-ratio: auto;
    min-height: 28rem;
  }
}

/* Horisontell, snäppande rad på mobil så att kartan syns medan man bläddrar. */
.explorer__list {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  margin-inline: calc(-1 * var(--gutter));
  padding: 0 var(--gutter) 0.5rem;
  scroll-padding-inline: var(--gutter);

  li {
    flex: 0 0 min(78%, 18rem);
    scroll-snap-align: start;
  }

  @media (min-width: 60rem) {
    flex-direction: column;
    overflow: visible;
    margin-inline: 0;
    padding: 0;

    li {
      flex: none;
    }
  }
}

.stay {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  height: 100%;
  padding: 0.9rem 1.1rem;
  text-align: left;
  background: transparent;
  border: 1px solid var(--line);
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: var(--ink-mute);
  }

  &--active,
  &--active:hover {
    border-color: var(--ink);
    background: var(--bg-tint);
  }
}

.stay__distance {
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

.stay__name {
  font-family: var(--serif);
  font-size: 1.1875rem;
  line-height: 1.3;
}

.stay__detail {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

.rule {
  margin-top: clamp(3rem, 7vw, 4.5rem);
}

.accommodation__footer {
  display: grid;
  gap: 1rem;
  text-align: center;
  margin-top: 2rem;
  color: var(--ink-soft);
}
</style>
