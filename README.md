# Wedding site

A single-page wedding website built with Nuxt 4, with an RSVP form backed by a Supabase edge
function. Site copy is in Swedish; code and docs are in English.

## Stack

- **Nuxt 4** / Vue 3, static-generated
- **SCSS** design system (`app/assets/css/main.scss`) — no component library
- **Supabase** (Postgres + Edge Functions) for the RSVP backend
- **Cloudflare Turnstile** for captcha on the RSVP form

## Getting started

```bash
npm install        # installs deps, runs `nuxt prepare` via postinstall
cp .env.example .env
npm run dev         # http://localhost:3000
```

Without a configured RSVP endpoint / Turnstile key, the RSVP form falls back to logging the
payload to the console and showing the success state, so the site is usable out of the box.

Other scripts: `npm run build`, `npm run generate` (static export), `npm run preview`.

There is no test suite, linter, or CI configured in this repo.

## Project structure

```
app/
  app.vue                  root component: global <head>, skip link, <NuxtPage />
  pages/index.vue          composition only — SiteNav, section components, SiteFooter
  components/              SiteNav, SiteFooter, and one component per page section
  content/wedding.ts       all user-facing copy and image URLs (typed, `as const`)
  assets/css/main.scss     design tokens, reset, base typography, shared classes
  plugins/reveal.ts        v-reveal directive (scroll fade-in)
  utils/rsvpLimits.ts      client-side copy of the RSVP field limits

supabase/
  migrations/              rsvp + rsvp_rate_limit tables (RLS on, no policies)
  functions/rsvp/          the only write path (Deno + zod) — see its README.md
```

To change wedding details or copy, edit `app/content/wedding.ts`. To change the look, check the
tokens in `main.scss` first — see the `wedding-site-design` skill in `.claude/skills/` for the
visual language this site follows.

## RSVP flow

`RsvpSection.vue` gets a Turnstile token, then POSTs JSON straight to a Supabase edge function —
there is no Supabase client or anon key in the browser. The function pipeline is: honeypot →
Turnstile verification → per-IP rate limit → zod validation → insert. Responses map to one of:
success, duplicate (already RSVP'd), rate-limited, captcha-failed, field validation errors, or a
generic error.

Field limits (name/email length, guest count, etc.) are kept in sync by hand across three places:
`app/utils/rsvpLimits.ts`, `supabase/functions/rsvp/schema.ts` (authoritative), and the migration's
`check` constraints (last line of defense).

See `supabase/functions/rsvp/README.md` for required secrets, running the function locally with
the Supabase CLI, and example curl requests.

## Deployment

`npm run generate` produces a static build. `NUXT_PUBLIC_RSVP_ENDPOINT` and
`NUXT_PUBLIC_TURNSTILE_SITE_KEY` must be set in the build environment, not just locally — see the
comment next to `runtimeConfig` in `nuxt.config.ts`.

## More detail

`CLAUDE.md` has the fuller architecture writeup (component conventions, hook behavior, content
language rules) for anyone — human or agent — making non-trivial changes here.
