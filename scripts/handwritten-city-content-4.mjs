#!/usr/bin/env node
/* Hand-written city content, batch 4: Nottingham, Newcastle upon Tyne, Kingston upon Hull,
 * Plymouth, Stoke-on-Trent, Wolverhampton. Ships indexable:false.
 *   node scripts/handwritten-city-content-4.mjs --force
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyCity = args.find((a) => a.startsWith('--city='))?.split('=')[1];

const content = {
  nottingham: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Nottingham | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Nottingham from FENSA fitters. From £312 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Nottingham home

Nottingham runs from the private villa roads of The Park Estate - gas-lit, gated, tightly controlled - through the red-brick terraces of Sneinton, Radford and Forest Fields, to the interwar semis of West Bridgford, Wollaton and Sherwood. The Park is a special case; most window jobs here are terrace or suburban work.

## Why Nottingham homeowners choose us

- Made-to-measure frames for tall Sneinton and Radford terrace openings
- Clear guidance on The Park Estate, where the private estate has its own consent process on top of the council's
- Knowledge of the 27 conservation areas, including the Lace Market
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Nottingham

The Park, West Bridgford, Wollaton, Sherwood, Mapperley and Beeston, out to Arnold, Carlton, Hucknall and Ilkeston. Postcodes NG1 to NG3, NG7 and NG8.

## Frequently asked questions

**Are windows restricted in The Park Estate?**
Yes - The Park is a conservation area and the private estate also runs its own architectural approval, so a window change usually needs sign-off from both. Allow extra time for it.

**Do other Nottingham conservation areas restrict windows?**
Several do, including the Lace Market and parts of Mapperley Park - check the council planning portal before ordering.

**How much do uPVC windows cost in Nottingham?**
Typically £312 to £801 per window fitted, using the East Midlands regional factor of 0.89x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Nottingham | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Nottingham from vetted installers. Typical £2,670-£8,010. Free, no-obligation.',
      body: `## Whole-home double glazing in Nottingham

A Sneinton or Forest Fields terrace is usually 8 to 12 openings including a bay; the West Bridgford and Wollaton semis are the more uniform jobs. Doing the whole house in one visit gets you a matched finish and a single set of access costs.

## Why Nottingham homeowners choose us

- One itemised quote per opening so you can compare fairly
- Access and scaffolding for terraced streets priced up front
- A single matched foiled finish across the whole property
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Nottingham

West Bridgford, Wollaton, Sherwood, Mapperley, Beeston and Sneinton, out to Arnold, Carlton, Hucknall and Ilkeston. Postcodes NG1 to NG8.

## Frequently asked questions

**How long does a whole-house job take in Nottingham?**
Two to three days for a West Bridgford semi, longer for a Sneinton terrace with a structural bay.

**What does whole-home double glazing cost in Nottingham?**
Usually £2,670 to £8,010 depending on opening count, frame material and bays, using the local 0.89x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Nottingham | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Nottingham from FENSA fitters. From £312 per window. Free, no-obligation.',
      body: `## Casement windows for Nottingham homes

Casements are the standard replacement across the interwar semis of Wollaton, Sherwood and Bilborough, and on the rear elevations of the Sneinton and Radford terraces. A flush-sash casement holds a cleaner line on the older red-brick streets than a lipped frame.

## Why Nottingham homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements for terrace rears where the front stays period
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Nottingham

Wollaton, Sherwood, Bilborough, West Bridgford, Mapperley and Beeston, plus Arnold, Carlton, Hucknall and Ilkeston. Postcodes NG1 to NG8.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Nottingham's Victorian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Nottingham?**
Around £312 to £801 per window fitted, using the local 0.89x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Nottingham | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Nottingham from vetted installers. Typical £1,068-£2,848. Free, no-obligation.',
      body: `## Bay window replacement in Nottingham

Bays in Nottingham are common on the Mapperley Park, Sherwood and Forest Fields Victorian villas and terraces. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs.

## Why Nottingham homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Nottingham

Mapperley Park, Sherwood, Forest Fields, West Bridgford and Wollaton, plus Arnold, Carlton, Hucknall and Ilkeston. Postcodes NG1 to NG8.

## Frequently asked questions

**Does my Nottingham Victorian bay need a steel?**
Almost certainly if it is pre-1914 - most were built without one. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Nottingham?**
Typically £1,068 to £2,848 for the glazing using the local 0.89x factor, plus the structural work if needed.

**Will a new bay match a Mapperley Park street?**
It can, but the profile usually needs council sign-off first - get that in writing before manufacture.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Nottingham | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Nottingham from vetted fitters. From £579. Free, no-obligation.',
      body: `## uPVC doors for Nottingham homes

For a Nottingham terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. A uPVC French or patio door onto a West Bridgford or Wollaton garden costs far less than aluminium.

## Why Nottingham homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Foiled colours matched to your existing windows and joinery
- French and patio door options for semi and terrace gardens
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Nottingham

West Bridgford, Wollaton, Sherwood, Mapperley and Beeston, out to Arnold, Carlton, Hucknall and Ilkeston. Postcodes NG1 to NG8.

## Frequently asked questions

**Is a uPVC front door secure enough for Nottingham?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Nottingham?**
Roughly £579 to £1,602 fitted using the local 0.89x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Nottingham | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Nottingham. From £79. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Nottingham

Where a Nottingham frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across West Bridgford, Wollaton and Arnold are the most common call.

## Why Nottingham homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement sealed units
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Nottingham

Repairs across West Bridgford, Wollaton, Sherwood, Mapperley and Beeston, plus Arnold, Carlton, Hucknall and Ilkeston. Postcodes NG1 to NG8.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £79 to £267 per unit in Nottingham using the local 0.89x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  'newcastle-upon-tyne': {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Newcastle upon Tyne | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Newcastle from FENSA fitters. From £298 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Newcastle home

Newcastle has a housing type you mostly see in the North East - the Tyneside flat, a two-storey terrace split into an upper and lower flat with a pair of front doors side by side. Heaton, Byker and Sandyford are full of them, and each flat owns its own windows. Add the Georgian terraces of Grainger Town and the 1930s Gosforth semis and the picture is varied.

## Why Newcastle homeowners choose us

- Fitters who understand Tyneside flat layouts and split ownership of a terrace
- Openings sized to the tall sash windows of Heaton and Sandyford flats
- Knowledge of the 18 conservation areas, including Grainger Town and Jesmond
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Newcastle

Jesmond, Gosforth, Heaton, Sandyford, Fenham and Byker, out to Gateshead, Whitley Bay, North Shields and Wallsend. Postcodes NE1 to NE4, NE6 and NE7.

## Frequently asked questions

**Who pays for windows in a Tyneside flat?**
Each flat owns and pays for its own windows - the upper flat its upstairs windows, the lower flat its downstairs. There is usually no shared budget, so you only quote for your own.

**Do Newcastle conservation areas restrict windows?**
Grainger Town and Jesmond in particular have tight controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Newcastle?**
Typically £298 to £765 per window fitted, using the North East regional factor of 0.85x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Newcastle upon Tyne | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Newcastle from vetted installers. Typical £2,550-£7,650. Free, no-obligation.',
      body: `## Whole-home double glazing in Newcastle

A whole Tyneside flat is often just 4 to 7 openings - one floor of a terrace - so a full-flat job is smaller and cheaper than a whole house elsewhere. A Gosforth or Fenham semi is the more usual 9 to 12-opening job. Doing everything in one visit gets you a matched finish.

## Why Newcastle homeowners choose us

- One itemised quote per opening so you can compare fairly
- Whole-flat quoting for a single floor of a Tyneside terrace
- A single matched foiled finish across the property
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Newcastle

Jesmond, Gosforth, Heaton, Sandyford, Fenham and Byker, out to Gateshead, Whitley Bay, North Shields and Wallsend. Postcodes NE1 to NE7.

## Frequently asked questions

**Is a whole-flat job smaller than a whole house?**
Usually, yes - a Tyneside flat is one floor of a terrace, often 4 to 7 openings, so the job and the price are smaller than a full house.

**What does whole-home double glazing cost in Newcastle?**
Usually £2,550 to £7,650 for a house, using the local 0.85x cost factor; a single flat is less.

**How long does it take?**
One to two days for a flat, two to four for a house with a structural bay.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Newcastle upon Tyne | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Newcastle from FENSA fitters. From £298 per window. Free, no-obligation.',
      body: `## Casement windows for Newcastle homes

Casements are the standard replacement across the interwar semis of Gosforth, Fenham and Kenton, and on many Tyneside flats where the original sash has already been changed once. A flush-sash casement holds a cleaner line on the older streets than a lipped frame.

## Why Newcastle homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements sized to Tyneside flat and terrace openings
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Newcastle

Gosforth, Fenham, Kenton, Heaton, Jesmond and Byker, plus Gateshead, Whitley Bay, North Shields and Wallsend. Postcodes NE1 to NE7.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Newcastle's Victorian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Newcastle?**
Around £298 to £765 per window fitted, using the local 0.85x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Newcastle upon Tyne | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Newcastle from vetted installers. Typical £1,020-£2,720. Free, no-obligation.',
      body: `## Bay window replacement in Newcastle

Bays in Newcastle are common on the larger Jesmond and Gosforth villas and on the upper storey of some Tyneside flats. Victorian bays were often built without a full structural beam, so a steel or reinforced lintel is usually needed to meet current Building Regs.

## Why Newcastle homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Newcastle

Jesmond, Gosforth, Heaton, Sandyford and Fenham, plus Gateshead, Whitley Bay, North Shields and Wallsend. Postcodes NE1 to NE7.

## Frequently asked questions

**Does my Newcastle Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**A bay on the upper flat of a Tyneside terrace - whose job is that?**
The upper flat's - each flat owns its own windows, including a bay on its floor.

**How much does a bay window cost in Newcastle?**
Typically £1,020 to £2,720 for the glazing using the local 0.85x factor, plus the structural work if needed.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Newcastle upon Tyne | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Newcastle from vetted fitters. From £553. Free, no-obligation.',
      body: `## uPVC doors for Newcastle homes

The Tyneside flat has a pair of front doors on the street - one for the upper flat's stair, one for the lower flat - and each is the responsibility of that flat. A modern uPVC door with a good compression seal is a real gain against North East winters. For semis, uPVC handles back and garden doors well.

## Why Newcastle homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Weather-sealed doors for exposed North East sites
- Clear on which of the two Tyneside-flat front doors is yours
- Foiled colours matched to your existing windows and joinery
- Old door and frame removed and disposed of within the quote

## Areas we cover around Newcastle

Jesmond, Gosforth, Heaton, Fenham and Byker, out to Gateshead, Whitley Bay, North Shields and Wallsend. Postcodes NE1 to NE7.

## Frequently asked questions

**Which front door is mine on a Tyneside flat?**
The one opening onto your flat's stair. The two doors sit side by side but each belongs to a separate flat, so you only replace your own.

**Is a uPVC front door secure enough for Newcastle?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Newcastle?**
Roughly £553 to £1,530 fitted using the local 0.85x factor, with French and sliding patio sets at the top.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Newcastle upon Tyne | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Newcastle. From £76. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Newcastle

Where a Newcastle frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Gosforth, Fenham and Kenton are the most common call, and the exposed North East weather speeds them up.

## Why Newcastle homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units for Tyneside flat and terrace openings
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Newcastle

Repairs across Gosforth, Fenham, Kenton, Heaton and Jesmond, plus Gateshead, Whitley Bay, North Shields and Wallsend. Postcodes NE1 to NE7.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £76 to £255 per unit in Newcastle using the local 0.85x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  'kingston-upon-hull': {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Hull | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Hull from FENSA fitters. From £294 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Hull home

Hull's best-known residential streets are the Avenues in the west of the city - wide, tree-lined Victorian roads that form a conservation area - alongside the terraced streets of Newland and the interwar semis of Bilton Grange and Anlaby Park. Central Hull was heavily bombed in WWII, so there is postwar stock mixed in too.

## Why Hull homeowners choose us

- Fitters who know the Avenues conservation area and its street-facing frame rules
- Openings sized to Victorian terrace and Avenues villa windows
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- Foiled finishes to suit red-brick and rendered streets, as well as white
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Hull

The Avenues, Newland, Cottingham, Hessle, Anlaby and Kirk Ella, out to Beverley, Willerby, Hedon and Brough. Postcodes HU1 to HU3, HU5, HU7 and HU8.

## Frequently asked questions

**Are windows restricted in the Hull Avenues?**
The Avenues is a conservation area, so street-facing frame changes there need care and often consent - check with Hull City Council before ordering. Rear elevations are usually more flexible.

**How much do uPVC windows cost in Hull?**
Typically £294 to £756 per window fitted, using the Yorkshire regional factor of 0.84x the national average - among the lowest in the country.

**Does Hull's flat, low-lying ground affect a window job?**
Not the window itself, but damp and condensation are more common in low-lying property, so getting trickle ventilation right matters.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Hull | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Hull from vetted installers. Typical £2,520-£7,560. Free, no-obligation.',
      body: `## Whole-home double glazing in Hull

A Newland or Avenues terrace is usually 8 to 12 openings including a bay; the Bilton Grange and Anlaby Park semis are more uniform. Hull's regional prices are among the lowest in the country, which makes a whole-house job here more affordable than most cities.

## Why Hull homeowners choose us

- One itemised quote per opening so you can compare fairly
- A single matched foiled finish across the whole property
- Trickle ventilation sized properly for low-lying, damp-prone property
- Structural check on any Avenues bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Hull

The Avenues, Newland, Cottingham, Hessle, Anlaby and Kirk Ella, out to Beverley, Willerby, Hedon and Brough. Postcodes HU1 to HU8.

## Frequently asked questions

**Is a whole-house job cheaper in Hull?**
Generally, yes - Hull has one of the lowest regional cost factors in the country, so the same job costs less here than in most cities.

**What does whole-home double glazing cost in Hull?**
Usually £2,520 to £7,560 depending on opening count, frame material and bays, using the local 0.84x cost factor.

**How long does it take?**
Two to four days for a terrace, longer where a structural bay is involved.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Hull | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Hull from FENSA fitters. From £294 per window. Free, no-obligation.',
      body: `## Casement windows for Hull homes

Casements are the standard replacement across the interwar semis of Bilton Grange, Anlaby Park and Sutton, and on the rear elevations of the Newland and Avenues terraces. A flush-sash casement holds a cleaner line on the older brick streets than a lipped frame.

## Why Hull homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements for terrace rears where the front stays period
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents sized for damp-prone low-lying property
- Multi-point locking and internal beading as standard

## Areas we cover around Hull

Bilton Grange, Anlaby Park, Sutton, Newland, Cottingham and Hessle, plus Beverley, Willerby, Hedon and Brough. Postcodes HU1 to HU8.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Hull's Victorian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Hull?**
Around £294 to £756 per window fitted, using the local 0.84x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Hull | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Hull from vetted installers. Typical £1,008-£2,688. Free, no-obligation.',
      body: `## Bay window replacement in Hull

Bays in Hull are common on the Avenues villas and the larger Newland and Pearson Park terraces. Many Victorian bays were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs.

## Why Hull homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Hull

The Avenues, Newland, Pearson Park, Cottingham and Hessle, plus Beverley, Willerby, Hedon and Brough. Postcodes HU1 to HU8.

## Frequently asked questions

**Does my Hull Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Hull?**
Typically £1,008 to £2,688 for the glazing using the local 0.84x factor, plus the structural work if needed.

**Will a new bay match an Avenues street?**
It can, but the profile usually needs council sign-off first - get that in writing before manufacture.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Hull | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Hull from vetted fitters. From £546. Free, no-obligation.',
      body: `## uPVC doors for Hull homes

For a Hull terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. A weathered threshold and a solid compression seal matter on the exposed, flat land around the Humber.

## Why Hull homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Weathered thresholds and solid seals for exposed Humber-side sites
- Foiled colours matched to your existing windows and joinery
- French and patio door options for semi and terrace gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Hull

The Avenues, Newland, Cottingham, Hessle, Anlaby and Kirk Ella, out to Beverley, Willerby, Hedon and Brough. Postcodes HU1 to HU8.

## Frequently asked questions

**Is a uPVC front door secure enough for Hull?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Hull?**
Roughly £546 to £1,512 fitted using the local 0.84x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Hull | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Hull. From £75. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Hull

Where a Hull frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Bilton Grange, Sutton and Anlaby Park are the most common call.

## Why Hull homeowners choose us

- Written diagnosis first - some "misting" is room condensation, common in low-lying property
- Made-to-measure replacement sealed units
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Hull

Repairs across Bilton Grange, Sutton, Anlaby Park, Newland and Cottingham, plus Beverley, Willerby, Hedon and Brough. Postcodes HU1 to HU8.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £75 to £252 per unit in Hull using the local 0.84x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation issue - more common in Hull's low-lying property, and worth ruling out first.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  plymouth: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Plymouth | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Plymouth from FENSA fitters. From £315 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Plymouth home

Central Plymouth was rebuilt after severe WWII bombing to Patrick Abercrombie's plan, so the inner city has distinctive postwar terraces and flats - many with original metal or early aluminium windows. Around that sit the Victorian streets of Peverell, Mannamead and Mutley, the naval terraces of Devonport and Stonehouse, and the Barbican's protected old town.

## Why Plymouth homeowners choose us

- Replacement of old metal and early aluminium frames in postwar stock with correctly sized uPVC
- Openings sized to Peverell and Mannamead Victorian terraces
- Clear guidance on the Barbican and Stonehouse, where old-town frames are tightly controlled
- Weather-rated units and finishes for a coastal, salt-laden climate
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Plymouth

Peverell, Mannamead, Mutley, Plymstock, Stoke and Devonport, out to Saltash, Ivybridge, Tavistock and Torpoint. Postcodes PL1 to PL6.

## Frequently asked questions

**Can I fit uPVC windows on a Barbican property?**
Often not on the street elevation - the Barbican is a conservation area with many listed Elizabethan and Jacobean buildings, and timber is usually required. Check with the council first.

**Can you replace the metal windows in a postwar Plymouth house?**
Yes - the metal frame comes out, the opening is made good and a correctly sized uPVC window is fitted. A common job on the city's rebuilt stock.

**How much do uPVC windows cost in Plymouth?**
Typically £315 to £810 per window fitted, using the South West regional factor of 0.90x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Plymouth | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Plymouth from vetted installers. Typical £2,700-£8,100. Free, no-obligation.',
      body: `## Whole-home double glazing in Plymouth

A postwar Plymouth terrace or a Peverell Victorian house is usually 8 to 12 openings including a bay. The coastal position means weather sealing and drainage detailing matter more than inland. Doing the whole house in one visit gets you a matched finish and one set of access costs.

## Why Plymouth homeowners choose us

- One itemised quote per opening so you can compare fairly
- Removal of remaining metal or early aluminium frames included
- Weather sealing and cill drainage detailed for a coastal climate
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Plymouth

Peverell, Mannamead, Mutley, Plymstock, Stoke and Devonport, out to Saltash, Ivybridge, Tavistock and Torpoint. Postcodes PL1 to PL6.

## Frequently asked questions

**Does the coast affect a whole-house job in Plymouth?**
Salt air is hard on hardware and seals, so marine-grade fittings and good cill drainage are worth specifying, especially on exposed elevations.

**What does whole-home double glazing cost in Plymouth?**
Usually £2,700 to £8,100 depending on opening count, frame material and bays, using the local 0.90x cost factor.

**How long does it take?**
Two to four days for a terrace, longer where a structural bay is involved.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Plymouth | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Plymouth from FENSA fitters. From £315 per window. Free, no-obligation.',
      body: `## Casement windows for Plymouth homes

Casements are the standard replacement across Plymouth's postwar and interwar stock - Efford, Honicknowle, Plymstock - where the originals were metal or timber casements. On the Peverell and Mannamead terraces a flush-sash casement suits the older brick better than a lipped frame.

## Why Plymouth homeowners choose us

- Flush-sash and standard casements priced side by side
- Replacement of old steel and metal casements with correctly sized uPVC
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Marine-grade hardware for exposed coastal elevations
- Multi-point locking and internal beading as standard

## Areas we cover around Plymouth

Efford, Honicknowle, Plymstock, Peverell, Mannamead and Stoke, plus Saltash, Ivybridge, Tavistock and Torpoint. Postcodes PL1 to PL6.

## Frequently asked questions

**Can you replace old steel casements with uPVC?**
Yes - the steel frame comes out, the opening is made good and a new uPVC casement is fitted to size. Common on Plymouth's postwar houses.

**What is a flush casement window?**
One where the sash closes level with the frame - a cleaner line for the older Peverell streets, at roughly 10 to 15% over a standard casement.

**How much are casement windows in Plymouth?**
Around £315 to £810 per window fitted, using the local 0.90x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Plymouth | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Plymouth from vetted installers. Typical £1,080-£2,880. Free, no-obligation.',
      body: `## Bay window replacement in Plymouth

Bays in Plymouth are common on the Peverell, Mannamead and Mutley Victorian and Edwardian terraces. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay, and on an exposed coastal elevation the flashing detail has to be right.

## Why Plymouth homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay, detailed for driving coastal rain
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Plymouth

Peverell, Mannamead, Mutley, Stoke and Plymstock, plus Saltash, Ivybridge, Tavistock and Torpoint. Postcodes PL1 to PL6.

## Frequently asked questions

**Does my Plymouth Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Plymouth?**
Typically £1,080 to £2,880 for the glazing using the local 0.90x factor, plus the structural work if needed.

**Does the coast affect the flashing?**
Yes - a bay on a weather-facing elevation needs a more robust lead flashing and apron detail to keep out driving rain.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Plymouth | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Plymouth from vetted fitters. From £585. Free, no-obligation.',
      body: `## uPVC doors for Plymouth homes

For a Plymouth semi or terrace, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. On exposed coastal elevations, marine-grade hardware and a good weathered threshold are worth specifying.

## Why Plymouth homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Marine-grade hardware and weathered thresholds for coastal sites
- Foiled colours matched to your existing windows and joinery
- French and patio door options for semi and terrace gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Plymouth

Peverell, Mannamead, Plymstock, Stoke and Devonport, out to Saltash, Ivybridge, Tavistock and Torpoint. Postcodes PL1 to PL6.

## Frequently asked questions

**Is a uPVC front door secure enough for Plymouth?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Plymouth?**
Roughly £585 to £1,620 fitted using the local 0.90x factor, with French and sliding patio sets at the top.

**Does salt air affect door hardware?**
It can corrode cheap fittings - ask for marine-grade or stainless hinges and handles on a weather-facing door.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Plymouth | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Plymouth. From £80. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Plymouth

Where a Plymouth frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. The salt-laden coastal air is hard on hardware, so worn friction stays and stiff gearboxes are common calls alongside blown seals.

## Why Plymouth homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement sealed units
- Friction stay, gearbox and multi-point mechanism swaps, with marine-grade parts where exposed
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Plymouth

Repairs across Peverell, Mannamead, Mutley, Plymstock and Stoke, plus Saltash, Ivybridge, Tavistock and Torpoint. Postcodes PL1 to PL6.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £80 to £270 per unit in Plymouth using the local 0.90x factor.

**Why do my window hinges keep seizing?**
On a coastal elevation, salt corrosion is the usual cause - a marine-grade friction stay lasts far longer than a standard one.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  'stoke-on-trent': {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Stoke-on-Trent | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Stoke-on-Trent from FENSA fitters. From £301 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Stoke-on-Trent home

Stoke-on-Trent is six towns federated into one city, so the housing stock is fragmented - pottery workers' two-up-two-down terraces in Burslem, Longton and Fenton, Edwardian villas in Penkhull and Hartshill, and interwar estates in Trentham and Blurton. Some inner areas have a history of mining subsidence, which can leave older frames racked out of square.

## Why Stoke-on-Trent homeowners choose us

- Fitters who allow for out-of-square openings on settled or historically undermined terraces
- Openings sized to the small windows of pottery workers' cottages
- Knowledge of the conservation areas protecting surviving pottery-era streets
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Stoke-on-Trent

Hanley, Burslem, Longton, Fenton, Trentham and Penkhull, out to Newcastle-under-Lyme, Stone, Kidsgrove and Biddulph. Postcodes ST1 to ST4 and ST6.

## Frequently asked questions

**My terrace window openings are not square - is that a problem?**
Not for a good installer. Historic settlement and mining subsidence have left many Stoke terraces slightly racked, and a made-to-measure uPVC frame can be packed and sealed to fit an out-of-square opening.

**Do Stoke conservation areas restrict windows?**
Around 15 conservation areas, mostly protecting pottery-era terraces - check the council portal if your street is one.

**How much do uPVC windows cost in Stoke-on-Trent?**
Typically £301 to £774 per window fitted, using the West Midlands regional factor of 0.86x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Stoke-on-Trent | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Stoke-on-Trent from vetted installers. Typical £2,580-£7,740. Free, no-obligation.',
      body: `## Whole-home double glazing in Stoke-on-Trent

A pottery workers' terrace in Burslem or Longton is often a compact 6 to 9-opening job; the Penkhull and Trentham houses are larger. Doing the whole house in one visit gets you a matched finish and lets the installer set every frame square in one go.

## Why Stoke-on-Trent homeowners choose us

- One itemised quote per opening so you can compare fairly
- Every opening set square and packed properly, even on a settled terrace
- A single matched foiled finish across the whole property
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Stoke-on-Trent

Hanley, Burslem, Longton, Fenton, Trentham and Penkhull, out to Newcastle-under-Lyme, Stone, Kidsgrove and Biddulph. Postcodes ST1 to ST6.

## Frequently asked questions

**How long does a whole-house job take in Stoke-on-Trent?**
Two to three days for a terrace, longer for a larger Penkhull or Trentham house with a bay.

**What does whole-home double glazing cost in Stoke-on-Trent?**
Usually £2,580 to £7,740 depending on opening count, frame material and bays, using the local 0.86x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Stoke-on-Trent | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Stoke-on-Trent from FENSA fitters. From £301 per window. Free, no-obligation.',
      body: `## Casement windows for Stoke-on-Trent homes

Casements are the standard replacement across the interwar estates of Trentham, Blurton and Bentilee, and on the small openings of the pottery workers' terraces. A flush-sash casement suits the older red-brick streets of Penkhull and Hartshill better than a lipped frame.

## Why Stoke-on-Trent homeowners choose us

- Flush-sash and standard casements priced side by side
- Small-opening casements sized to pottery-cottage windows
- Frames packed square where an opening has settled out of true
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Multi-point locking and internal beading as standard

## Areas we cover around Stoke-on-Trent

Trentham, Blurton, Bentilee, Penkhull, Hartshill and Longton, plus Newcastle-under-Lyme, Stone, Kidsgrove and Biddulph. Postcodes ST1 to ST6.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for the older Penkhull streets, at roughly 10 to 15% more.

**Can a small pottery-cottage window meet fire-escape rules?**
Not always from a standard casement - the clear opening must be at least 450mm x 450mm and 0.33 square metres. Your installer should check each bedroom window.

**How much are casement windows in Stoke-on-Trent?**
Around £301 to £774 per window fitted, using the local 0.86x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Stoke-on-Trent | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Stoke-on-Trent from vetted installers. Typical £1,032-£2,752. Free, no-obligation.',
      body: `## Bay window replacement in Stoke-on-Trent

Bays in Stoke are mostly on the Edwardian villas of Penkhull, Hartshill and Basford and the larger interwar semis. Pre-1914 bays were often built without a full structural beam, so a steel or reinforced lintel is usually needed - and any historic settlement in the wall has to be assessed at the same time.

## Why Stoke-on-Trent homeowners choose us

- Structural survey of the bay - including any settlement in the surrounding wall - before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Stoke-on-Trent

Penkhull, Hartshill, Basford, Trentham and Longton, plus Newcastle-under-Lyme, Stone, Kidsgrove and Biddulph. Postcodes ST1 to ST6.

## Frequently asked questions

**Does my Stoke bay need a steel?**
A pre-1914 Edwardian bay almost always does. The survey also checks for any historic settlement in the wall around the opening. Budget £600 to £1,200 for the structural work.

**How much does a bay window cost in Stoke-on-Trent?**
Typically £1,032 to £2,752 for the glazing using the local 0.86x factor, plus the structural work if needed.

**Can you keep the internal window seat?**
Usually yes - the frame is replaced around the existing seat and reveal, with making-good where they have to be disturbed.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Stoke-on-Trent | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Stoke-on-Trent from vetted fitters. From £559. Free, no-obligation.',
      body: `## uPVC doors for Stoke-on-Trent homes

For a Stoke terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. On a pottery workers' terrace the front door often opens straight onto the street, so a good compression seal and a weathered threshold matter.

## Why Stoke-on-Trent homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Draught-sealed thresholds for front doors that open onto the street
- Frames fitted true even where the opening has settled
- Foiled colours matched to your existing windows and joinery
- Old door and frame removed and disposed of within the quote

## Areas we cover around Stoke-on-Trent

Penkhull, Hartshill, Trentham, Blurton and Longton, out to Newcastle-under-Lyme, Stone, Kidsgrove and Biddulph. Postcodes ST1 to ST6.

## Frequently asked questions

**Is a uPVC front door secure enough for Stoke-on-Trent?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Stoke-on-Trent?**
Roughly £559 to £1,548 fitted using the local 0.86x factor, with French and sliding patio sets at the top.

**My door frame is out of square - can it still be replaced?**
Yes - a made-to-measure uPVC door can be fitted and packed to a slightly racked opening, common on Stoke's settled terraces.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Stoke-on-Trent | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Stoke-on-Trent. From £77. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Stoke-on-Trent

Where a Stoke frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Alongside blown seals, doors and windows that have dropped or stopped closing flush are common where an opening has settled over time.

## Why Stoke-on-Trent homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units for small pottery-cottage openings
- Realignment and packing of frames that have dropped in a settled opening
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Stoke-on-Trent

Repairs across Penkhull, Hartshill, Trentham, Blurton and Longton, plus Newcastle-under-Lyme, Stone, Kidsgrove and Biddulph. Postcodes ST1 to ST6.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £77 to £258 per unit in Stoke-on-Trent using the local 0.86x factor.

**My window will not close flush any more - is that repairable?**
Often, yes - it may just need the hinges adjusted or the frame re-packed where the opening has settled, rather than a new window.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  wolverhampton: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Wolverhampton | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Wolverhampton from FENSA fitters. From £315 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Wolverhampton home

Wolverhampton runs from the red-brick Victorian terraces of Whitmore Reans and Blakenhall through large interwar municipal estates in Low Hill and the Scotlands to the more spacious semis of Tettenhall, Penn and Compton. The council-built interwar stock is a big part of the city and usually has uniform, straightforward openings.

## Why Wolverhampton homeowners choose us

- Fitters who know the interwar municipal stock and its standard opening sizes
- Openings sized to Whitmore Reans and Blakenhall Victorian terraces
- Knowledge of the conservation areas around Tettenhall Wood and Chapel Ash
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Wolverhampton

Tettenhall, Compton, Penn, Wednesfield, Bilston and Whitmore Reans, out to Walsall, Dudley, Cannock and Telford. Postcodes WV1 to WV4 and WV6.

## Frequently asked questions

**Is an interwar council house quicker to reglaze?**
Often, yes - the municipal estates were built to standard patterns, so openings are uniform and the job is more predictable than a Victorian terrace.

**Do Wolverhampton conservation areas restrict windows?**
Tettenhall Wood and Chapel Ash in particular have controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Wolverhampton?**
Typically £315 to £810 per window fitted, using the West Midlands regional factor of 0.90x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Wolverhampton | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Wolverhampton from vetted installers. Typical £2,700-£8,100. Free, no-obligation.',
      body: `## Whole-home double glazing in Wolverhampton

An interwar semi in Penn or Wednesfield is a straightforward 9 to 12-opening job with uniform sizes. The Whitmore Reans and Blakenhall terraces are the more involved work, with taller openings and often a bay. Doing everything in one visit gets you a matched finish.

## Why Wolverhampton homeowners choose us

- One itemised quote per opening so you can compare fairly
- Predictable pricing on the standard-pattern interwar estates
- A single matched foiled finish across the whole property
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Wolverhampton

Tettenhall, Compton, Penn, Wednesfield, Bilston and Whitmore Reans, out to Walsall, Dudley, Cannock and Telford. Postcodes WV1 to WV6.

## Frequently asked questions

**How long does a whole-house job take in Wolverhampton?**
Two to three days for an interwar semi, longer for a Whitmore Reans terrace with a structural bay.

**What does whole-home double glazing cost in Wolverhampton?**
Usually £2,700 to £8,100 depending on opening count, frame material and bays, using the local 0.90x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Wolverhampton | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Wolverhampton from FENSA fitters. From £315 per window. Free, no-obligation.',
      body: `## Casement windows for Wolverhampton homes

Casements are the standard replacement across the interwar estates of Penn, Wednesfield and Fordhouses, and on the rear elevations of the Whitmore Reans terraces. A flush-sash casement holds a cleaner line on the older red-brick streets than a lipped frame.

## Why Wolverhampton homeowners choose us

- Flush-sash and standard casements priced side by side
- Standard-pattern casements sized to the municipal interwar estates
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Wolverhampton

Penn, Wednesfield, Fordhouses, Tettenhall, Compton and Bilston, plus Walsall, Dudley, Cannock and Telford. Postcodes WV1 to WV6.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for the older Wolverhampton streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Wolverhampton?**
Around £315 to £810 per window fitted, using the local 0.90x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Wolverhampton | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Wolverhampton from vetted installers. Typical £1,080-£2,880. Free, no-obligation.',
      body: `## Bay window replacement in Wolverhampton

Bays in Wolverhampton are common on the Victorian and Edwardian terraces of Whitmore Reans and Blakenhall and the larger interwar semis of Penn and Tettenhall. Pre-1914 bays were often built without a full structural beam, so a steel or reinforced lintel is usually needed.

## Why Wolverhampton homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Wolverhampton

Whitmore Reans, Blakenhall, Penn, Tettenhall and Compton, plus Walsall, Dudley, Cannock and Telford. Postcodes WV1 to WV6.

## Frequently asked questions

**Does my Wolverhampton bay need a steel?**
A pre-1914 terrace bay almost always does; a 1930s Penn bay often has adequate support already. A survey confirms it before any frame is ordered.

**How much does a bay window cost in Wolverhampton?**
Typically £1,080 to £2,880 for the glazing using the local 0.90x factor, plus £600 to £1,200 if structural work is needed.

**Can you keep the internal window seat?**
Usually yes - the frame is replaced around the existing seat and reveal, with making-good where they have to be disturbed.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Wolverhampton | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Wolverhampton from vetted fitters. From £585. Free, no-obligation.',
      body: `## uPVC doors for Wolverhampton homes

For a Wolverhampton semi or terrace, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. Many interwar council houses still have their original doors or a first replacement, so this is often a straightforward upgrade.

## Why Wolverhampton homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Foiled colours matched to your existing windows and joinery
- French and patio door options for interwar semi gardens
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Wolverhampton

Tettenhall, Compton, Penn, Wednesfield and Bilston, out to Walsall, Dudley, Cannock and Telford. Postcodes WV1 to WV6.

## Frequently asked questions

**Is a uPVC front door secure enough for Wolverhampton?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Wolverhampton?**
Roughly £585 to £1,620 fitted using the local 0.90x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Wolverhampton | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Wolverhampton. From £80. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Wolverhampton

Where a Wolverhampton frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Penn, Wednesfield and Tettenhall are the most common call.

## Why Wolverhampton homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement sealed units
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Wolverhampton

Repairs across Penn, Wednesfield, Tettenhall, Compton and Bilston, plus Walsall, Dudley, Cannock and Telford. Postcodes WV1 to WV6.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £80 to £270 per unit in Wolverhampton using the local 0.90x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
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
