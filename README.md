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

`functions/api/lead.js` (Cloudflare Pages Function): honeypot + per-IP rate limit + optional
Turnstile check, then emails the lead via Resend. Email only for now (manual monitoring);
Leads2Trade API hand-off is a later step.

**Phase 1 setup (no DNS, minimal):**

1. Sign up at resend.com with the address leads should be delivered to (`webzqsd@gmail.com`),
   create an API key.
2. Cloudflare Pages → Settings → Environment variables (Production **and** Preview):

   | Var | Scope | Phase 1 value |
   |---|---|---|
   | `RESEND_API_KEY` | Functions | the key from step 1 |
   | `LEAD_FROM_EMAIL` | Functions | `onboarding@resend.dev` |
   | `LEAD_TO_EMAIL` | Functions | `webzqsd@gmail.com` (must equal the Resend account email) |

   That's it - the form works. `onboarding@resend.dev` only sends to the account's own
   address, which is why `LEAD_TO_EMAIL` has to match it in this phase.

**Optional - Turnstile anti-spam:** Cloudflare dashboard → Turnstile → add widget, then set
`PUBLIC_TURNSTILE_SITE_KEY` (build scope) and `TURNSTILE_SECRET_KEY` (Functions scope). If
unset, the widget is hidden and the server skips the check; honeypot + rate limit still run.

**Optional - `LEAD_RATE_KV`:** a KV namespace binding for per-IP rate limiting. Skipped if unbound.

**Phase 2 (later):** verify `doubleglazingexpert.co.uk` on Resend (SPF/DKIM DNS records), then
switch `LEAD_FROM_EMAIL` to `leads@doubleglazingexpert.co.uk` and `LEAD_TO_EMAIL` to any address.

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
