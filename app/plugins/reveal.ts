/**
 * v-reveal — tonar in elementet första gången det scrollas in i vyn.
 *
 * Styling ligger i main.scss (.reveal / .reveal--visible).
 *
 * Plugin:et är universellt (inte .client) så att direktivet finns registrerat
 * även under SSR — annars varnar Vue "Failed to resolve directive" vid varje
 * server-render. getSSRProps returnerar tomt: servern renderar innehållet
 * synligt, och klienten tar över animeringen efter hydrering.
 *
 * Element som redan syns vid inladdning markeras som synliga direkt, så att
 * innehåll ovanför vikningen aldrig blinkar till efter hydrering. Utan JS
 * förblir allt innehåll synligt.
 *
 * Användning:  <section v-reveal>  eller  <div v-reveal="{ delay: 120 }">
 */

type RevealOptions = { delay?: number };

const observers = new WeakMap<HTMLElement, IntersectionObserver>();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, RevealOptions | undefined>("reveal", {
    getSSRProps: () => ({}),

    mounted(el, binding) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const alreadyInView = el.getBoundingClientRect().top < window.innerHeight;

      if (reducedMotion || alreadyInView || typeof IntersectionObserver === "undefined") {
        el.classList.add("reveal", "reveal--visible");
        return;
      }

      el.classList.add("reveal");

      const delay = binding.value?.delay ?? 0;
      if (delay) el.style.transitionDelay = `${delay}ms`;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            el.classList.add("reveal--visible");
            observer.disconnect();
            observers.delete(el);
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
      );

      observer.observe(el);
      observers.set(el, observer);
    },

    unmounted(el) {
      observers.get(el)?.disconnect();
      observers.delete(el);
    },
  });
});
