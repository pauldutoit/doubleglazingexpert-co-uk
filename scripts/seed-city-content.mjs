#!/usr/bin/env node
// Hand-written seed content for the largest cities, so the site launches with
// genuinely city-specific pages without needing an ANTHROPIC_API_KEY.
//
// Same output contract as generate-city-content.mjs (frontmatter + markdown body,
// FAQ section formatted for the extractFaqs() parser in [intentSlug]-[citySlug].astro).
// All seed files ship indexable:false - flip per page once it has earned it.
//
//   node scripts/seed-city-content.mjs           # write missing files only
//   node scripts/seed-city-content.mjs --force   # overwrite

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const force = process.argv.includes('--force');

// content[citySlug][intentSlug] = { metaTitle, metaDescription, body }
const content = {
  london: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in London | Double Glazing Expert',
      metaDescription: 'Compare uPVC window quotes in London from FENSA-registered fitters. Prices from £438. Free, no-obligation, no cold calls.',
      body: `## Replacing uPVC windows in a London terrace

Most inner-London window jobs are on Victorian or Edwardian terraces where the original openings are tall, narrow and rarely a standard size, so nearly everything is made to measure. Outer boroughs bring interwar semis and 1960s blocks with their own quirks - concrete lintels, metal Crittall replacements, communal-repair rules on estates. A local fitter who works your borough will know which before quoting.

## Why locals choose us

- Made-to-measure uPVC sized to original London terrace openings, not forced into stock frames
- Fitters who know borough-by-borough conservation rules across Islington, Hackney, Camden and beyond
- Slimline sightlines and astragal bar options where a street-facing frame needs to keep its period look
- Leaseholder and freeholder paperwork handled for flats and estate properties
- Parking, permits and skip logistics factored into the quote, not sprung on you later

## Areas we cover around London

We match homeowners across all 33 boroughs - Islington, Hackney, Camden, Wandsworth, Greenwich, Ealing and Croydon among them - and out to Bromley, Enfield, Harrow and Richmond. Postcodes from EC1 and W1 through to E17, SE15 and E14 are all covered.

## Frequently asked questions

**Do I need conservation area consent for uPVC windows in London?**
Often, yes. London has more than 1,000 conservation areas and many boroughs restrict street-facing frame changes - check your borough's planning portal before ordering, as retrofitting is expensive.

**Can you replace windows in a leasehold flat?**
Yes, but you'll usually need the freeholder's written consent first, especially for anything visible from the street. A good installer will tell you what the managing agent needs to see.

**How much do uPVC windows cost in London?**
Typical London prices run about £438 to £1,125 per window fitted, reflecting the capital's higher labour rates - the exact figure depends on size, glazing spec and finish.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in London | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in London from vetted installers. Typical £3,750-£11,250. Free and no-obligation.',
      body: `## Whole-home double glazing in London

Doing every opening in one go on a London property usually means 10 to 15 units across a terrace, plus a front door and often a bay. The big cost swings here are access - scaffolding over a basement lightwell or onto a busy road adds up - and whether a Victorian bay needs a steel above it. A single-visit whole-house job also means one matched finish rather than a patchwork built up over years.

## Why locals choose us

- One itemised quote per opening so you can see exactly what each window and door costs
- Access, scaffolding, parking suspensions and waste removal priced in up front
- Matched foiled finish inside and out across the whole property
- Structural checks on Victorian and Edwardian bays before any glass is ordered
- FENSA certificate registered in your name within 30 days - the document you need when you sell

## Areas we cover around London

Homeowners across inner boroughs like Islington, Hackney, Camden, Wandsworth and Greenwich, the outer belt through Ealing and Croydon, and neighbouring Bromley, Enfield, Harrow and Richmond. Covered postcodes span E1, EC1, N1, NW1, SE1, SW1 and W1 out to N7, SW9 and E14.

## Frequently asked questions

**How long does a whole-house job take in London?**
Usually two to four days for a mid-terrace, longer where scaffolding or a structural bay is involved. Installers should give you a day-by-day plan before starting.

**Should I be wary of "today only" discounts?**
Yes. A genuine whole-home quote holds its price for at least a week and is itemised. Anything that only works if you sign on the visit is a sales tactic, not a price.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in London | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in London from FENSA fitters. From £438 per window. Free, no-obligation comparison.',
      body: `## Casement windows for London homes

The side-hung casement is the default replacement across London's interwar semis and post-war stock, and a common choice on terrace rears where the street-facing elevation keeps sashes. Flush-sash casements - where the opener sits level with the frame - suit period London streets better than the standard lipped profile and are worth specifying if the look matters.

## Why locals choose us

- Flush-sash or standard casement options priced side by side so you can compare
- Egress-hinge sizing on bedroom windows to meet the 450mm fire-escape rule
- Trickle vents fitted to current Building Regs without spoiling the sightline
- Colour-matched foiled frames for streets where white uPVC would look wrong
- Fitters who handle London parking permits and access as part of the job

## Areas we cover around London

From Islington, Hackney and Camden through Wandsworth, Greenwich and Ealing, out to Croydon, Bromley, Enfield, Harrow and Richmond. Postcodes E1, N1, NW1, SE1, SW1, W1, WC1 and beyond.

## Frequently asked questions

**What is a flush casement window?**
One where the opening sash closes flush with the outer frame rather than sitting proud of it. It gives a cleaner, more traditional line that works well on London's Victorian and Edwardian streets, for roughly 10 to 15% more than a standard casement.

**Can casement windows meet fire-escape rules?**
Yes, with the right hinge. Habitable-room windows above ground floor need a clear opening of at least 450mm by 450mm and 0.33 square metres - your installer should confirm this per window.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in London | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in London from vetted installers. Typical £1,500-£4,000. Free, no-obligation.',
      body: `## Bay window replacement in London

The double-fronted Victorian and Edwardian bay is a London signature - and the trickiest window to replace. Pre-1930s bays were often built without a proper structural beam, relying on the old box frames for support, so a steel or reinforced lintel is usually needed to bring the opening up to current Building Regs. That structural work, not the glass, is the biggest cost variable.

## Why locals choose us

- Structural survey of the bay before any frame is ordered - no nasty surprises mid-job
- Matched frame widths across the bay so the proportions stay right
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture
- Conservation-compliant profiles for streets in Islington, Camden and similar

## Areas we cover around London

Terraced and semi-detached bays across Hackney, Wandsworth, Greenwich, Ealing and Croydon, plus Bromley, Enfield, Harrow and Richmond. Postcodes from SW1 and W2 to SE15, E17 and N7.

## Frequently asked questions

**Does my London bay need a steel beam?**
If it dates from the 1930s or earlier, almost certainly. Many were built without one. Budget £600 to £1,200 on top of the glazing for the structural work, confirmed by a survey.

**Will a new bay match the neighbours in a conservation area?**
It can, but the profile and glazing bar pattern usually need council sign-off first. Get written pre-approval before the frames are made, not after.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in London | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in London from vetted fitters. From £813. Free, no-obligation.',
      body: `## uPVC doors for London homes

uPVC is the standard for back and side doors across London and a budget option for the front, where composite doors are more common. On a terrace, the back door is often the weak point for security and draughts, and a French or patio door onto a small London garden is far cheaper in uPVC than aluminium while performing well enough for most homes.

## Why locals choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard, not an upsell
- Foiled colours - Anthracite Grey especially - to match existing London joinery
- French and patio door options for narrow terrace returns and side passages
- Toughened or laminated safety glass in all door side panels
- Old door and frame removed and disposed of within the quote

## Areas we cover around London

Homeowners across Islington, Hackney, Camden, Wandsworth, Greenwich, Ealing and Croydon, out to Bromley, Enfield, Harrow and Richmond. Covered postcodes include E1, EC1, N1, NW1, SE1, SW1 and W1.

## Frequently asked questions

**Is a uPVC front door secure enough for London?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for. Composite doors add mass and appearance, not fundamentally more lock security.

**How much do uPVC doors cost in London?**
Roughly £813 to £2,250 fitted in London depending on style, glazing and hardware - French and sliding patio sets sit at the upper end.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in London | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in London. From £111. Same-week visits, free quotes.',
      body: `## Double glazing repairs in London

When a London window frame is sound but a sealed unit has misted or a mechanism has failed, a repair is a fraction of replacement cost and usually a single visit. Blown seals are the most common call - the failed glass unit comes out, a new one made to size goes into the existing frame. Faulty friction stays and gearboxes on casements are the next most frequent.

## Why locals choose us

- Written diagnosis before any work - some "misting" is actually room condensation, a ventilation issue
- Made-to-measure replacement sealed units for non-standard London terrace openings
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent broken-glass or lock-out jobs

## Areas we cover around London

Repairs across Islington, Hackney, Camden, Wandsworth, Greenwich, Ealing and Croydon, plus Bromley, Enfield, Harrow and Richmond. Postcodes E1 through W1 and out to E14, SE15 and E17.

## Frequently asked questions

**Can a misted double-glazed unit be repaired without a new window?**
Yes. It is a glass-unit swap - the frame stays put. Around £111 to £375 per unit in London depending on size and glass spec, usually done in under an hour once the glass is made.

**How do I know if it is a blown seal or condensation?**
Blown seals mist permanently between the panes and can't be wiped away. Condensation on the room side of the glass is a ventilation problem, not a glazing fault - get it diagnosed before authorising a unit replacement.`,
    },
  },
};

async function exists(f) { try { await access(f); return true; } catch { return false; } }

async function main() {
  const cities = JSON.parse(await readFile(path.join(root, 'src/data/cities.json'), 'utf-8'));
  const intents = JSON.parse(await readFile(path.join(root, 'src/data/intents.json'), 'utf-8'));
  const cityBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));
  const intentBySlug = Object.fromEntries(intents.map((i) => [i.slug, i]));

  let written = 0, skipped = 0;
  for (const [citySlug, byIntent] of Object.entries(content)) {
    const city = cityBySlug[citySlug];
    if (!city) { console.warn(`unknown city ${citySlug}, skipping`); continue; }
    for (const [intentSlug, data] of Object.entries(byIntent)) {
      const intent = intentBySlug[intentSlug];
      if (!intent) { console.warn(`unknown intent ${intentSlug}, skipping`); continue; }
      const dir = path.join(root, 'src/content/cityContent', citySlug);
      const file = path.join(dir, `${intentSlug}.md`);
      if (!force && (await exists(file))) { skipped++; console.log(`skip  ${citySlug}/${intentSlug}`); continue; }
      const fm = `---
city: "${city.name}"
citySlug: "${city.slug}"
intent: "${intent.label}"
intentSlug: "${intent.slug}"
region: "${city.region ?? ''}"
indexable: false
metaTitle: ${JSON.stringify(data.metaTitle)}
metaDescription: ${JSON.stringify(data.metaDescription)}
generatedAt: "${new Date().toISOString().slice(0, 10)}"
generatedBy: "manual"
---

${data.body.trim()}
`;
      await mkdir(dir, { recursive: true });
      await writeFile(file, fm);
      written++;
      console.log(`write ${citySlug}/${intentSlug}`);
    }
  }
  console.log(`\n${written} written, ${skipped} skipped`);
}

main().catch((e) => { console.error(e); process.exit(1); });
