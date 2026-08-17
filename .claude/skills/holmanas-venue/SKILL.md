---
name: holmanas-venue
description: Use whenever writing or editing guest-facing copy that touches the venue, the schedule, accommodation, travel/parking, or practical logistics — i.e. most edits to app/content/wedding.ts. Supplies the verified facts about Holmanäs Gård (location, capacity, rooms, access times, house rules) so copy is accurate instead of invented, and flags which details are still unconfirmed and must not be stated as fact.
---

# Holmanäs Gård — venue facts

The wedding is at **Holmanäs Gård**, Lyckebovägen 248, 231 93 Trelleborg, Skåne.

This skill exists because the site's copy in `app/content/wedding.ts` was written as placeholder
text before the venue's own material was read. Several placeholders are subtly wrong. Use the
verified facts below and in `references/venue-facts.md` instead of paraphrasing the placeholders.

## Non-negotiable rule: never invent a fact

Everything in `references/venue-facts.md` is sourced from the venue's own information sheet, its
house rules, or holmanas.se. Anything **not** in that file — ceremony location and time, officiant,
menu, dress code, toastmaster, transport arrangements, gift wishes, hashtag — is a decision the
couple has not documented here.

For those, do one of:

1. Write copy that is deliberately provisional in Swedish ("preliminärt", "vi uppdaterar närmare
   bröllopet") and keep it vague enough to be true.
2. Leave a `// TODO:` comment in `wedding.ts` naming exactly what the couple needs to decide.

Never upgrade a guess into a stated fact. A wedding site that tells 100 guests the wrong arrival
time is worse than one that says the time is coming.

## The facts most likely to be got wrong

| Claim | Correct |
| --- | --- |
| Drive time from Malmö | ~20 minutes by car, not 30 |
| Address | Lyckebovägen 248, 231 93 Trelleborg (the site currently omits the number) |
| Max guests in the venue | 130 people at once, fire-safety cap |
| Seating | 100 chairs — so 100 is the practical seated limit, not 130 |
| Sleeping capacity | Up to 13 double rooms across 4 houses per the venue's info sheet; holmanas.se says 15. **Unresolved — must be confirmed with Emma before any number goes on the site.** |
| Music/doors | The glass doors toward the field must be shut from 22.00 out of respect for neighbours |
| Taxi | Taxis pick guests up at the large car park, not at the courtyard |

## Where venue facts belong in the site

- `venue` — the barn, the setting (grain fields, sea on the horizon), the mid-1800s history, the
  fact that ceremony and party can both be on site so guests never have to move.
- `accommodation` — rooms on the farm, and that they are limited and allocated by the couple.
- `travel` — ~20 min from Malmö, the large car park, taxi pickup point, drop-off in the courtyard.
- `schedule` — anything time-bound should respect the 22.00 door rule.
- `faq` — smoking outdoors only, no fireworks, taxi must be pre-booked.

Guests should never be told about rental prices, cleaning duties, damage charges, catering
suppliers or check-in/check-out logistics for the rental itself. That is the couple's business with
the venue, not content for the site.

## Tone

Copy is Swedish (see CLAUDE.md) and the visual/editorial register is set by the
`wedding-site-design` skill. Venue facts should read as warm invitation, not as a spec sheet:
"sädesfält ända fram till husknuten och havet i horisonten" belongs on the site; "130 personer,
brandsäkerhetsskäl" does not.
