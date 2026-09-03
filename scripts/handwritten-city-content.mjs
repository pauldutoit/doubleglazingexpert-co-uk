#!/usr/bin/env node
/*
 * Hand-written city content (LLM-authored, not data-composed).
 * Replaces the compose-city-content.mjs floor for the cities listed here.
 * Same frontmatter contract; ships indexable:false - flip per page once earned.
 *
 *   node scripts/handwritten-city-content.mjs           # missing only
 *   node scripts/handwritten-city-content.mjs --force   # overwrite
 *   node scripts/handwritten-city-content.mjs --city=leeds
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyCity = args.find((a) => a.startsWith('--city='))?.split('=')[1];

// content[citySlug][intentSlug] = { metaTitle, metaDescription, body }
const content = {
  birmingham: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Birmingham | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Birmingham from FENSA fitters. From £322 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Birmingham home

Birmingham splits neatly for a window job: red-brick Victorian terraces and back-to-backs in the inner wards, big 1930s semi belts in Hall Green, Kingstanding and Northfield, and postwar blocks across the centre. The inner terraces are rarely a standard size and often have segmental brick arches that need a matching head detail; the interwar semis are far more uniform and quicker to price.

## Why Birmingham homeowners choose us

- Fitters who know the inner-ward terrace openings and the arch detailing they need
- Quotes that account for Bournville and Edgbaston conservation rules, where consent is common
- A-rated 28mm units, warm-edge spacers and trickle vents to current Building Regs as standard
- Anthracite Grey and other foiled finishes for streets where white uPVC looks wrong
- FENSA or CERTASS registered, with frames and glass guaranteed separately

## Areas we cover around Birmingham

Edgbaston, Moseley, Harborne, Bournville, Kings Heath and the wider city, out to Sutton Coldfield, Solihull, Walsall and Dudley. Postcodes B1 to B5 through to B15, B17 and B29.

## Frequently asked questions

**Do I need consent for windows in a Birmingham conservation area?**
Often, yes. The city has around 30 conservation areas including Bournville and Edgbaston, and listed building consent is common in the central and inner suburbs. Check the council planning portal before ordering.

**How much do uPVC windows cost in Birmingham?**
Typically £322 to £828 per window fitted, reflecting the West Midlands regional factor of 0.92x the national average. Size, glazing spec and finish move the figure.

**Can you match the brick arch above a terrace window?**
Yes. A good installer fits a frame head that follows the segmental arch rather than squaring it off with a flat infill, which keeps the elevation right.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Birmingham | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Birmingham from vetted installers. Typical £2,760-£8,280. Free, no-obligation.',
      body: `## Whole-home double glazing in Birmingham

Doing a whole Birmingham semi in one visit is usually 9 to 12 openings plus doors, and the interwar stock makes that straightforward - uniform sizes, timber lintels, few surprises. Inner-ward terraces are the harder job: taller openings, brick arches, and often a bay on the front elevation that needs checking for a lintel before anything is ordered.

## Why Birmingham homeowners choose us

- One itemised quote per opening, so you can compare like for like
- Access and scaffolding for three-storey terraces priced up front
- A single matched foiled finish across the whole property
- Structural check on any front bay before glass is ordered
- FENSA certificate registered in your name within 30 days - you need it to sell

## Areas we cover around Birmingham

Homeowners across Moseley, Harborne, Kings Heath, Bournville and Edgbaston, out to Sutton Coldfield, Solihull, Walsall and Dudley. Covered postcodes B1 through B29.

## Frequently asked questions

**How long does a whole-house job take in Birmingham?**
Two to three days for a standard interwar semi, longer for an inner-ward terrace with scaffolding or a structural bay. Ask for a day-by-day plan first.

**What does whole-home double glazing cost in Birmingham?**
Usually £2,760 to £8,280 depending on opening count, frame material and how many are bays, using the local 0.92x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week. A price that only works on the visit is a sales tactic.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Birmingham | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Birmingham from FENSA fitters. From £322 per window. Free, no-obligation.',
      body: `## Casement windows for Birmingham houses

The side-hung casement is the default across Birmingham's huge 1930s semi belt - Hall Green, Kingstanding, Northfield, Perry Barr - where the original steel Crittall windows have usually already been swapped once. On the inner-ward terraces a flush-sash casement, sitting level with the frame, suits the older brick elevations better than a standard lipped profile.

## Why Birmingham homeowners choose us

- Flush-sash and standard casements priced side by side
- Replacement of old steel Crittall openings with a properly sized uPVC frame
- Egress hinges on bedroom windows to meet the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Birmingham

Hall Green, Kings Heath, Moseley, Harborne, Edgbaston and Bournville, plus Sutton Coldfield, Solihull, Walsall and Dudley. Postcodes B1 to B29.

## Frequently asked questions

**Can you replace old Crittall steel windows with uPVC casements?**
Yes. The steel frame comes out, the opening is made good and a new uPVC casement is fitted to the correct size - a common job on Birmingham interwar semis.

**What is a flush casement window?**
One where the opening sash closes level with the outer frame rather than sitting proud of it. It gives a cleaner line for older Birmingham streets, at about 10 to 15% more than a standard casement.

**How much are casement windows in Birmingham?**
Around £322 to £828 per window fitted, based on the local 0.92x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Birmingham | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Birmingham from vetted installers. Typical £1,104-£2,944. Free, no-obligation.',
      body: `## Bay window replacement in Birmingham

The splayed or square bay on a Birmingham interwar semi is a common replacement job, and generally more predictable than a Victorian bay - the 1930s builders usually put a timber or early concrete lintel in, so a full structural steel is less often needed. Victorian bays in the inner wards are the opposite: frequently built without a beam, needing a steel to meet current Building Regs.

## Why Birmingham homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so a 1930s splay bay keeps its proportions
- Lead flashing and apron repairs above the bay included where needed
- Steel or reinforced lintel fitted where a Victorian bay needs it
- Scaled elevation drawing to approve before manufacture

## Areas we cover around Birmingham

Interwar bays across Hall Green, Kingstanding, Northfield and Perry Barr, Victorian bays in Moseley and Kings Heath, plus Sutton Coldfield, Solihull, Walsall and Dudley. Postcodes B1 to B29.

## Frequently asked questions

**Does a Birmingham 1930s bay need a steel beam?**
Often not - interwar builders usually fitted a lintel. A pre-1914 Victorian bay in the inner wards almost always does. A survey confirms it before anything is ordered.

**How much does a bay window cost in Birmingham?**
Typically £1,104 to £2,944 for the glazing using the local 0.92x factor, plus £600 to £1,200 if structural work is needed.

**Can you keep the internal window seat?**
Usually yes. The frame is replaced around the existing seat and reveal; where they have to be disturbed, making-good should be in the quote.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Birmingham | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Birmingham from vetted fitters. From £598. Free, no-obligation.',
      body: `## uPVC doors for Birmingham homes

On a Birmingham semi the side and back doors take the weather and are usually the first to go stiff or draughty; the front is where homeowners weigh uPVC against a composite. French or patio doors onto the garden are far cheaper in uPVC than aluminium and perform well enough for the vast majority of Birmingham homes.

## Why Birmingham homeowners choose us

- PAS 24 multi-point locking and an anti-snap cylinder as standard, not an upsell
- Foiled colours - Anthracite Grey especially - matched to your existing windows
- French and patio door options for narrow semi side returns
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and taken away within the quote

## Areas we cover around Birmingham

Moseley, Harborne, Kings Heath, Edgbaston, Bournville and the wider city, out to Sutton Coldfield, Solihull, Walsall and Dudley. Postcodes B1 to B29.

## Frequently asked questions

**Is a uPVC front door secure enough for Birmingham?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for. Composite adds mass and appearance, not fundamentally more lock security.

**How much do uPVC doors cost in Birmingham?**
Roughly £598 to £1,656 fitted using the local 0.92x factor - plain panel doors at the lower end, French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening the opening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Birmingham | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Birmingham. From £82. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Birmingham

A lot of Birmingham's uPVC was fitted in the late 1990s and 2000s, which is exactly when sealed units start to fail and friction hinges wear out. If the frame itself is sound - and most of that stock is - a misted unit or a stiff mechanism is a repair, not a replacement, and usually a single visit.

## Why Birmingham homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement sealed units, including for non-standard terrace openings
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent broken-glass or lock-out jobs

## Areas we cover around Birmingham

Repairs across Moseley, Kings Heath, Harborne, Edgbaston and Bournville, plus Sutton Coldfield, Solihull, Walsall and Dudley. Postcodes B1 to B29.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes. It is a glass-unit swap - the frame stays put. Around £82 to £276 per unit in Birmingham using the local 0.92x factor, usually done in under an hour.

**Blown seal or condensation - how do I tell?**
A blown seal mists permanently between the panes and can't be wiped. Condensation on the room side of the glass is a ventilation problem, not a glazing fault.

**Is it worth repairing 20-year-old double glazing?**
Up to a point. If more than a third of the units have blown or the frames themselves are failing, replacement usually beats piecemeal repair.`,
    },
  },

  manchester: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Manchester | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Manchester from FENSA fitters. From £315 per window. Free, no-obligation, no cold calls.',
      body: `## Replacing uPVC windows in Manchester

Inner Manchester is two-up-two-down terrace country - Rusholme, Levenshulme, Gorton - with tall narrow openings that are almost never a stock size. Didsbury and Whalley Range bring Victorian merchants' villas with big bay fronts, and the city centre has a wall of post-2000 apartments where window changes usually go through a managing agent. A local fitter will know which of those you are before quoting.

## Why Manchester homeowners choose us

- Made-to-measure frames for narrow terrace openings, not forced into stock sizes
- Knowledge of the Didsbury Village and Victoria Park conservation rules
- Managing-agent paperwork handled for city-centre and converted-mill apartments
- A-rated 28mm units, warm-edge spacers, trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Manchester

Didsbury, Chorlton, Withington, Levenshulme and the wider city, out to Salford, Stockport, Bolton and Oldham. Postcodes M1 to M4 through to M20, M21 and M22.

## Frequently asked questions

**Do Manchester conservation areas restrict window changes?**
In several, yes - there are around 39, including Didsbury Village and Victoria Park, and sash restoration is common in the listed streets. Check with the council before ordering.

**How much do uPVC windows cost in Manchester?**
Typically £315 to £810 per window fitted, using the North West regional factor of 0.90x the national average.

**Can you replace windows in a converted-mill apartment?**
Usually, but the freeholder or managing agent has to approve anything visible from outside first. A good installer tells you what they need to see.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Manchester | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Manchester from vetted installers. Typical £2,700-£8,100. Free, no-obligation.',
      body: `## Whole-home double glazing in Manchester

A full Manchester terrace is usually 8 to 12 openings over two or three storeys, so access is the swing factor - scaffolding up a narrow back alley adds cost. Doing everything in one visit gets you a single matched finish rather than the patchwork most terraces end up with after years of one-window-at-a-time replacement.

## Why Manchester homeowners choose us

- One quote itemised per opening, so you can compare fairly
- Scaffolding and alley access for two and three-storey terraces priced up front
- A single matched foiled finish inside and out
- Structural check on Victorian bay fronts in Didsbury and Whalley Range
- FENSA certificate registered in your name within 30 days

## Areas we cover around Manchester

Chorlton, Didsbury, Withington, Levenshulme and Whalley Range, out to Salford, Stockport, Bolton and Oldham. Postcodes M1 through M22.

## Frequently asked questions

**How long does a whole-house job take in Manchester?**
Two to four days for a mid-terrace, more where a back-alley scaffold or a structural bay is involved.

**What does whole-home double glazing cost in Manchester?**
Usually £2,700 to £8,100 depending on opening count, frame material and bays, using the local 0.90x cost factor.

**Can I phase the work?**
You can, but one visit means one scaffold, one matched finish and usually a better per-window price.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Manchester | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Manchester from FENSA fitters. From £315 per window. Free, no-obligation.',
      body: `## Casement windows for Manchester homes

The casement is the default replacement across Manchester's interwar semis in Burnage, Chorltonville and Prestwich. On the inner terraces, a flush-sash casement keeps a cleaner line against the older brick than a standard lipped frame, and it is worth specifying where the street-facing look matters.

## Why Manchester homeowners choose us

- Flush-sash and standard casements priced side by side
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Argon-filled A-rated units, warm-edge spacer, internal beading
- Trickle vents to Building Regs, colour-matched to the frame
- Foiled finishes for terrace streets where white uPVC looks wrong

## Areas we cover around Manchester

Burnage, Chorlton, Withington, Levenshulme and Didsbury, plus Salford, Stockport, Bolton and Oldham. Postcodes M1 to M22.

## Frequently asked questions

**What is a flush casement window?**
One where the opening sash closes flush with the frame instead of standing proud of it - a more traditional line for Manchester's Victorian and Edwardian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Manchester?**
Around £315 to £810 per window fitted, using the local 0.90x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Manchester | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Manchester from vetted installers. Typical £1,080-£2,880. Free, no-obligation.',
      body: `## Bay window replacement in Manchester

The Victorian bay front is a Manchester signature in Chorlton, Whalley Range and Old Trafford, and most were built without a proper structural beam. Bringing that opening up to current Building Regs usually means a steel or reinforced lintel above the bay, and that structural work is the biggest single cost - not the glass.

## Why Manchester homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay proportions stay right
- Steel or reinforced lintel fitted where a Victorian bay needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Manchester

Chorlton, Whalley Range, Old Trafford, Didsbury and Withington, plus Salford, Stockport, Bolton and Oldham. Postcodes M1 to M22.

## Frequently asked questions

**Does my Manchester Victorian bay need a steel?**
Almost certainly if it is pre-1914 - most were built without one. A structural survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Manchester?**
Typically £1,080 to £2,880 for the glazing using the local 0.90x factor, plus the structural work if needed.

**Will a new bay suit a conservation area street?**
It can, but the profile and glazing bar pattern usually need council sign-off first - get that in writing before the frames are made.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Manchester | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Manchester from vetted fitters. From £585. Free, no-obligation.',
      body: `## uPVC doors for Manchester homes

On a Manchester terrace the back door opening onto a yard or alley is the security weak point and the first to swell in the wet. A modern uPVC door with PAS 24 multi-point locking fixes both, and a uPVC French or patio door onto a small garden costs far less than aluminium while performing well enough for most homes here.

## Why Manchester homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Foiled colours matched to your existing windows and joinery
- French and patio door options for narrow terrace yards and returns
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Manchester

Chorlton, Didsbury, Withington, Levenshulme and Whalley Range, out to Salford, Stockport, Bolton and Oldham. Postcodes M1 to M22.

## Frequently asked questions

**Is a uPVC front door secure enough for Manchester?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers require. Composite adds mass, not fundamentally more lock security.

**How much do uPVC doors cost in Manchester?**
Roughly £585 to £1,620 fitted using the local 0.90x factor, with French and sliding patio sets at the top of that range.

**Can you fit a secure back door onto an alley?**
Yes - and it is worth the anti-snap cylinder and hinge bolts on an alley-facing door in particular.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Manchester | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Manchester. From £80. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Manchester

Much of Manchester's uPVC dates from the late 1990s and 2000s, and the damp climate is hard on sealed units - blown seals showing as permanent misting between the panes are the most common call. If the frame is sound, that is a glass-unit swap in the existing frame, not a new window.

## Why Manchester homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation problem
- Made-to-measure replacement units for non-standard terrace openings
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Manchester

Repairs across Chorlton, Didsbury, Withington, Levenshulme and Whalley Range, plus Salford, Stockport, Bolton and Oldham. Postcodes M1 to M22.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £80 to £270 per unit in Manchester using the local 0.90x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation issue, not a glazing fault - worth diagnosing before authorising a unit swap.

**How quickly can you come out?**
Same week for most repairs; faster for a window that will not lock or close, which is usually charged with a call-out fee.`,
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
    if (onlyCity && citySlug !== onlyCity) continue;
    const city = cityBySlug[citySlug];
    if (!city) { console.warn(`unknown city ${citySlug}`); continue; }
    for (const [intentSlug, data] of Object.entries(byIntent)) {
      const intent = intentBySlug[intentSlug];
      if (!intent) { console.warn(`unknown intent ${intentSlug}`); continue; }
      const dir = path.join(root, 'src/content/cityContent', citySlug);
      const file = path.join(dir, `${intentSlug}.md`);
      if (!force && (await exists(file))) { skipped++; continue; }
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
    }
    console.log(`${citySlug}: done`);
  }
  console.log(`\n${written} written, ${skipped} skipped`);
}

main().catch((e) => { console.error(e); process.exit(1); });
