# doubleglazingexpert.co.uk

Static **Astro + Cloudflare Pages** lead-gen site for uPVC windows and double glazing, built
as an independent quote-matching service (homeowners fill one form, up to three vetted local
installers quote). Forked from `astro-lead-site-template`.

## Services covered

`uPVC Windows` · `Double Glazing` (whole-home) · `Casement Windows` · `Bay Windows` ·
`uPVC Doors` · `Double Glazing Repairs` — defined in `src/data/intents.json`, across 123 UK
towns/cities in `src/data/cities.json`. URL pattern: `/{intentSlug}-{citySlug}/`.

## Local dev

```bash
npm install
npm run dev        # http://localhost:4321
npm run build && npm run preview
```

## Per-city content

City × service pages render a generic fallback (and stay `noindex`) until a unique body exists
at `src/content/cityContent/{citySlug}/{intentSlug}.md`. Generate them:

```bash
ANTHROPIC_API_KEY=sk-ant-... npm run generate:content
```

Idempotent — skips files that already exist, `--force` rebuilds. Review the output before
flipping any page's frontmatter `indexable: true`. See `AGENTS.md` for the indexation gate.

## Lead delivery

`functions/api/lead.js` (Cloudflare Pages Function) verifies a Cloudflare Turnstile token,
checks a honeypot + per-IP rate limit, then emails the lead via Resend. For now leads are
**email only** (manual monitoring); automatic hand-off to the Leads2Trade API is a later step.

Environment variables (Cloudflare Pages → Settings → Environment variables, Production + Preview):

| Var | Scope | Purpose |
|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | build | Turnstile widget (client) |
| `TURNSTILE_SECRET_KEY` | Functions | Turnstile server verify |
| `RESEND_API_KEY` | Functions | Resend API |
| `LEAD_TO_EMAIL` | Functions | where leads are delivered |
| `LEAD_FROM_EMAIL` | Functions | verified sender on the Resend domain |
| `LEAD_RATE_KV` | Functions (KV binding) | optional per-IP rate limiting |

Turnstile: Cloudflare dashboard → Turnstile → add widget (site key = public, secret key =
Functions only). Resend: verify the sending domain (SPF/DKIM), `LEAD_FROM_EMAIL` must be on it.

## Deploy

Push to GitHub, connect the repo in Cloudflare Pages. Build command `npm run build`, output
`dist`. `functions/` is picked up automatically.

## Before going live

- Replace the placeholder testimonials in `src/data/site.config.json` with real reviews; the
  `aggregateRating` / `stats` figures are illustrative — verify or remove them.
- Set a real `legalName` / `legalAddress`.
- Create a dedicated analytics property (do **not** reuse another portfolio site's Matomo ID)
  and fill `matomoUrl` / `matomoSiteId`.
- Generate + review city content, then open indexation gradually — portfolio-wide
  scaled-content risk, see the `feedback_leadgen_thin_content` memory.
