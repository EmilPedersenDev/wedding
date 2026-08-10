# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install    # install dependencies (runs `nuxt prepare` via postinstall)
npm run dev    # start dev server at http://localhost:3000
npm run build  # production build
npm run generate  # static site generation
npm run preview   # preview a production build locally
```

There is no test suite, linter, or CI configured in this repo.

## Architecture

This is a Nuxt 4 wedding website: one long single-page site with anchor navigation.

- `app/app.vue` — root component. Global `useHead` (fonts, favicon, `lang="sv"`), skip link, `<NuxtPage />`.
- `app/pages/index.vue` — composition only: `SiteNav`, ten section components, `SiteFooter`. No markup or logic of its own.
- `app/components/*.vue` — `SiteNav`, `SiteFooter` and one component per section (`HeroSection`, `VenueSection`, …). Flat directory so Nuxt auto-import gives unprefixed names.
- `app/content/wedding.ts` — **all user-facing copy and image URLs**, as a typed `as const` object. This is the file to edit when changing wedding details or replacing placeholder text. Sections import their own slice (`const v = wedding.venue`).
- `app/assets/css/main.scss` — the design system: CSS custom properties (palette, fonts, spacing), reset, base typography, and shared classes (`.section`, `.shell`, `.measure`, `.eyebrow`, `.btn`, `.rule`). Loaded globally via `css` in `nuxt.config.ts`.
- `app/plugins/reveal.client.ts` — the `v-reveal` directive (IntersectionObserver fade-in; no-ops under `prefers-reduced-motion`).

Component-specific styling is scoped SCSS in each SFC, built on the tokens and shared classes from `main.scss`. Don't introduce new colors or spacing values without checking those tokens first.

### RSVP flow

The RSVP form in `RsvpSection.vue` is UI only — client-side validation, error states and a submitted state, but **no backend**. `onSubmit` logs the form values to the console and flips to the thank-you state; see the `// TODO: Supabase` comment where the persistence call belongs.

### Design

There is a `wedding-site-design` skill in `.claude/skills/` covering the visual language (typography pairing, whitespace, muted palette, flat chrome-less UI, subtle motion). Consult it for any layout, color, spacing, imagery or new-section work.

## Content language

All user-facing text on the site — headings, labels, form fields, buttons, config strings in `nuxt.config.ts` (`names`, `date`, `time`, `venue`, `tagline`), etc. — must be written in Swedish. Code, comments, and identifiers stay in English as usual; only rendered site copy is Swedish.
