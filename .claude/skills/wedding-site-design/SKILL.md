---
name: wedding-site-design
description: Use whenever making visual/design decisions in this repo — layout, typography, color, spacing, imagery, animation, or new sections/pages. Grounds choices in how polished wedding websites built on tools like Squarespace, Zola, Minted, and Riley & Grey actually look, so the site reads as a professionally-designed wedding site rather than a generic web app.
---

# Wedding site design

This is a wedding website, not a SaaS dashboard or web app. Every design decision — new section, component, form, color, spacing tweak — should be checked against how genre-appropriate wedding sites look: the polished, editorial, slightly romantic aesthetic produced by builders like Squarespace wedding templates, Zola, Minted, Joy, Appy Couple, and Riley & Grey. Those tools encode a lot of good taste into their defaults; borrow it rather than reinventing generic web-app UI patterns.

## Core visual language

- **Typography pairing, not a single font.** A display face for names/headings (serif or script — this repo already uses Cormorant Garamond) paired with a plain, quiet sans or serif for body/UI text. Avoid using more than two families total.
- **Generous whitespace and vertical rhythm.** Sections breathe — think 4–8rem of vertical padding, not app-density spacing. Content blocks are usually centered, narrow-measure (`max-width` ~28–40rem for text), not edge-to-edge.
- **Muted, restrained palette.** One neutral base (cream/ivory/blush/sand), one ink/charcoal for text, at most one accent color. No saturated UI colors, no bright system blues — this repo's `#faf9f7` / `#2c2c2c` / `#f0ebe5` palette is the right register; extend it rather than introducing new hues.
- **Uppercase, letter-spaced micro-labels.** Small eyebrow text (section labels, taglines) in uppercase with wide letter-spacing (`0.15–0.2em`) is a recurring builder-template pattern — used for hierarchy without adding visual weight.
- **Full-bleed photography over cropped/boxed images.** When photos are involved, they go edge-to-edge or large-format, not thumbnails in cards.
- **Flat, chrome-less UI.** No drop shadows, gradients-as-decoration, rounded "card" containers, or SaaS-style buttons with icons. Buttons are typically simple rectangles or pill shapes, uppercase label, subtle hover (color shift, not elevation).
- **Subtle motion only.** If animating: gentle fade/slide-up on scroll reveal, soft transitions on hover/focus. Never bouncy, playful, or attention-grabbing motion — the tone is calm and editorial.

## Structure

Wedding sites built on these platforms converge on a predictable section vocabulary — reach for these before inventing new patterns: Hero (names + date + tagline), Our Story, Event Details/Schedule, Wedding Party, Gallery, Travel/Accommodations, Registry, FAQ, RSVP, Footer (often with a small map or closing message). Keep section order narrative — practical logistics (RSVP, travel) typically come after the emotional/story content, not before it.

## Applying this

- When adding or restyling a section, name which reference pattern above it follows (e.g. "eyebrow label + serif heading, per the micro-label pattern") rather than styling from scratch.
- When in doubt between a "web app" affordance (card with shadow, colored button, icon) and a "wedding site" affordance (flat, spacious, typographic), choose the latter.
- Check new colors/spacing against the existing values in `app/pages/index.vue` before introducing new ones — consistency with what's already there matters more than any single choice.
