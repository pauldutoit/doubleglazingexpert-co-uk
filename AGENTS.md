# doubleglazingexpert.co.uk — agent notes

Static Astro lead-gen site for **uPVC windows / double glazing**, independent quote-matching
positioning. Forked from the `astro-lead-site-template` (via `platinumdoubleglazing-co-uk`).
Deploy target: Cloudflare Pages. Lead delivery: email via Resend (Cloudflare Pages Function).

## Development

```
npm run dev        # astro dev, localhost:4321
npm run build      # static build to dist/
npm run preview     # serve dist/
```

## Where things live

- `src/data/site.config.json` — brand, domain, contact, theme, testimonials, FAQ. Single source of truth.
- `src/data/intents.json` — the 6 services (upvc-windows, double-glazing, casement-windows, bay-windows, upvc-doors, window-repair). Slugs here drive routes, nav, sitemap, funnel options and the `lead.js` whitelist — change a slug and everything follows.
- `src/data/intentEnrichment.json` — per-service hub copy, keyed by intent slug. Keep keys in sync with `intents.json`.
- `src/data/cities.json` + `cityEnrichment.json` — 123 UK cities + local context. Geo data only, shared with other portfolio sites.
- `src/content/cityContent/{citySlug}/{intentSlug}.md` — unique per-city×service body. **Currently empty.** Generate with `ANTHROPIC_API_KEY=... npm run generate:content` (idempotent, `--force` to rebuild).
- `functions/api/lead.js` — Cloudflare Pages Function: honeypot + Turnstile + rate limit + Resend email.
- `src/data/installers/{citySlug}.json` + `_index.json` — installer directory data, one file per
  city. Regenerate with `php scripts/fetch-installers.php --csv <BasicCompanyDataAsOneFile.csv>`
  (downloads the Companies House bulk export if no `--csv`; ~3 min parse; `--sample=leeds` to
  dry-run one city). Source: SIC 43342 "Glazing", active companies, dormant + long-overdue filers
  dropped, registered-office post town matched to a city (`$POST_TOWN_ALIAS` for Hull / Burton).
  `src/data/serviceSic.json` maps each service intent to SIC codes (all 6 -> 43342 today).
  `src/lib/installers.ts` ranks/filters and exposes `getListing()` (own companies topped up from
  neighbours; London boroughs fall back to central London). Pages:
  `double-glazing-installers-[citySlug].astro` (category listing, one per city) and
  `installers/[citySlug]/[companySlug].astro` (top-5 companies per city). PUBLIC register data,
  NOT a vetted list — pages say so and keep the quote form primary. Gated exactly like
  cityContent: `INDEXABLE_INSTALLER_CITIES` in `installers.ts` is the allowlist (empty = all
  noindex, none in sitemap); open a city and its category + 5 company pages go in together.

## Indexation gate (do not bypass)

Every city×service page with **no** `.md` in `src/content/cityContent/` renders the built-in
fallback and is hard-forced to `noindex,follow` (`[intentSlug]-[citySlug].astro`). `sitemap.xml`
only lists entries whose `.md` frontmatter has `indexable: true`. New `.md` files start
`indexable: false` — flip to `true` per page only once the content is genuinely localised and
the page has earned it. Internal links stay live for gated pages so PageRank still flows.
Rationale: portfolio-wide scaled-content risk — see the `feedback_leadgen_thin_content` memory.

## Portfolio hygiene

Do NOT reuse another portfolio site's Matomo ID, contact email, or generated city content on
this domain — the shared-fingerprint / duplicate-content risk is the whole reason this site
exists as a separate build. `matomoUrl`/`matomoSiteId` are intentionally blank until a
dedicated analytics property is created.
