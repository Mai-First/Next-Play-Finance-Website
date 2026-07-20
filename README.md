# Next Play Finance — one-page site

Single-page marketing + credibility site for Next Play Finance (NPF):
financial literacy for student athletes **before** NIL money arrives.
Visual language modeled on trytrust.ai (minimal white, huge headlines,
heavy scroll-driven animation); content from the NPF investor advisory deck.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion. Deploys to Vercel.

> The previous multi-page site is archived at `../next-play-finance-old/`.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000 (Claude launch config npf-v2 uses 3002)
npm run build    # production build check
```

## Where to edit content (no code knowledge needed)

All copy lives in `/data` — edit these and the site updates automatically:

| File | What it controls |
| --- | --- |
| `data/site.ts` | Name, tagline, description, contact email, social links, site URL |
| `data/stats.ts` | Problem stats (88/8/61) and opportunity cards + source lines |
| `data/curriculum.ts` | The 4 modules and the scroll-reveal mission sentence |
| `data/team.ts` | The four founder cards ("Meet the Roster") |
| `data/ask.ts` | The three "Join the mission" cards |
| `data/faq.ts` | FAQ questions & answers |

**Content rules:** every stat keeps its source attribution; no fabricated
testimonials, partner logos, or prices; keep copy legally conservative (minors,
financial education, no outcome guarantees).

## Contact form wiring

The form posts to `/api/contact`. With no configuration, submissions are
logged to the server console. To receive them for real, copy `.env.example`
to `.env.local` (or set the same variables on Vercel) with either or both:

- **Email (Resend):** `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (optional `CONTACT_FROM_EMAIL`)
- **Webhook (Sheet / Airtable / Zapier):** `CONTACT_WEBHOOK_URL`

## Scroll animation map

| Section | Effect |
| --- | --- |
| Hero | Pinned; scroll scrubs a word wheel (quarterbacks → … → every athlete.) then reveals subline + CTA |
| Problem | Pinned dark scene; stats count up in sequence as you scroll, punchline lands last |
| Opportunity | Cards stagger in; numbers count up on view |
| Curriculum | Ghost module numbers parallax; cards stagger in |
| Mission | Pinned; sentence highlights word-by-word with scroll |
| Join | Background interpolates white → dark on entry; cards fade up |
| Contact | Headline scales/fades in on arrival |

All pinned/scrub effects collapse to simple fades under `prefers-reduced-motion`.

## Before launch checklist

- [ ] Set the production domain in `data/site.ts` (`url`)
- [ ] Add real social links in `data/site.ts` (empty = icon hidden)
- [ ] Configure contact form delivery (env vars on Vercel)
- [ ] Team photos: add `/public/team/*.jpg` and wire `image` in `data/team.ts` (initials show until then)
- [ ] Real logo/wordmark if one exists (currently a text wordmark)
