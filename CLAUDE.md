# CLAUDE.md

One-page NPF marketing site. See README.md for the full map.

- All editable copy lives in `/data/*.ts` — change content there, not in components.
- Never fabricate stats, testimonials, bios, partner logos, or prices. Every stat carries a source.
- Scroll animation is a core feature (see README "Scroll animation map"). Core content must stay readable at any mid-scroll state, and every scrub/pin effect needs a `prefers-reduced-motion` fallback.
- Dev server: launch config `npf-v2`, port 3002.
