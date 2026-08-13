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
- `app/plugins/reveal.ts` — the `v-reveal` directive (IntersectionObserver fade-in; no-ops under `prefers-reduced-motion`). Deliberately not `.client.ts` — see the file's own docblock for why.

Component-specific styling is scoped SCSS in each SFC, built on the tokens and shared classes from `main.scss`. Don't introduce new colors or spacing values without checking those tokens first.

### RSVP flow

The RSVP form (`app/components/RsvpSection.vue`) POSTs JSON to a Supabase Edge Function — there is
no Supabase client and no anon key in the browser. `onSubmit` awaits a Cloudflare Turnstile token
from `app/components/TurnstileWidget.vue`, then `$fetch`s `runtimeConfig.public.rsvpEndpoint` and
maps the response to one of five states: success, already-RSVP'd (`duplicate`), rate-limited,
captcha-failed, or a generic error. A 400 with field-level errors is not terminal — it writes into
`serverErrors` and returns the guest to the form. If `runtimeConfig.public.rsvpEndpoint` is unset
(e.g. a bare `npm run dev` with no `.env`), submission falls back to logging the payload to the
console and showing the success state, so the site stays usable without Supabase configured.

Backend lives in `supabase/`:

- `supabase/migrations/` — the `rsvp` and `rsvp_rate_limit` tables. RLS is enabled on both with
  **no policies** — only the service role (used exclusively by the edge function) can read or
  write; there is no anon insert path to weaken.
- `supabase/functions/rsvp/` — the only write path. Deno + zod, pipeline order: honeypot →
  Turnstile verification → per-IP rate limit → validation → insert. See its `README.md` for
  required secrets, local `supabase functions serve` usage, and example curl requests.
- Shared validation limits live in three places kept in sync by hand: `app/utils/rsvpLimits.ts`
  (client UX), `supabase/functions/rsvp/schema.ts` (the zod schema — authoritative), and the
  migration's `check` constraints (last line of defense). The `check-rsvp-limits` hook (below)
  reports drift between them, but it does not fix it — the sync is still yours to maintain.

### Hooks

`.claude/settings.json` registers three hooks; their scripts live in `.claude/hooks/`. Run
`/hooks` to review or disable them. Successful hooks are silent by design.

- **`guard-secrets.sh`** (`PreToolUse` on `Read|Edit|Write|Bash`) — denies access to `.env`,
  `supabase/.env.local`, `.env.keys` and `.mcp.json`, which hold live secrets. `.env.example`
  is allowed. For `Bash` it matches on the command string, so it is a guardrail, not a sandbox.
- **`check-rsvp-limits.mjs`** (`PostToolUse` on `Edit|Write`) — when one of the three coupled
  RSVP files is edited, compares `name`/`email`/`diet`/`note`/`guestsMax` across all three and
  reports mismatches. Also reports a limit it can no longer parse, so a rename can't silently
  disable the check. Advisory — it never blocks the edit.
- **Swedish-copy check** (`PostToolUse` on `Edit|Write`, a `prompt` hook) — flags newly added
  English user-facing text, enforcing the "Content language" rule below. Runs `continueOnBlock`,
  so a false positive is fed back as a note rather than halting the turn.

### Design

There is a `wedding-site-design` skill in `.claude/skills/` covering the visual language (typography pairing, whitespace, muted palette, flat chrome-less UI, subtle motion). Consult it for any layout, color, spacing, imagery or new-section work.

## Content language

All user-facing text on the site — headings, labels, form fields, buttons, the content strings in `app/content/wedding.ts` (`names`, `date`, `venue`, `tagline`, etc.), etc. — must be written in Swedish. Code, comments, and identifiers stay in English as usual; only rendered site copy is Swedish.
