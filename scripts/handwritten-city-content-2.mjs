#!/usr/bin/env node
/* Hand-written city content, batch 2: Leeds, Glasgow, Bristol, Edinburgh.
 * Same contract as handwritten-city-content.mjs. Ships indexable:false.
 *   node scripts/handwritten-city-content-2.mjs --force
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyCity = args.find((a) => a.startsWith('--city='))?.split('=')[1];

const content = {
  leeds: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Leeds | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Leeds from FENSA fitters. From £308 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Leeds home

Leeds has housing stock you do not see much elsewhere - back-to-back terraces in Harehills, Beeston and Armley that share a rear wall with the next street, so they only have windows on one or two elevations. Add the gritstone Victorian villas of Headingley and Roundhay and the interwar semis further out, and a window job here really depends on which of those you have.

## Why Leeds homeowners choose us

- Fitters who understand back-to-back layouts and their single-aspect ventilation
- Knowledge of the Headingley, Roundhay Park and city-centre conservation rules
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- Foiled finishes to suit gritstone and red-brick streets, as well as white
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Leeds

Headingley, Roundhay, Chapel Allerton, Meanwood, Kirkstall and Horsforth, out to Bradford, Wakefield, Huddersfield and Harrogate. Postcodes LS1 to LS8 and LS11 to LS17.

## Frequently asked questions

**Do back-to-back houses in Leeds have special ventilation rules?**
They can. A single-aspect house relies heavily on trickle ventilation and extract fans, so trickle vents in the new frames are not optional - your installer should confirm the ventilation strategy meets Building Regs Part F.

**Do Leeds conservation areas restrict windows?**
In several of the 48 conservation areas, yes - Headingley and around Roundhay Park in particular. Check the council planning portal before ordering.

**How much do uPVC windows cost in Leeds?**
Typically £308 to £792 per window fitted, using the Yorkshire regional factor of 0.88x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Leeds | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Leeds from vetted installers. Typical £2,640-£7,920. Free, no-obligation.',
      body: `## Whole-home double glazing in Leeds

A back-to-back or through terrace in Leeds might only be 6 to 9 openings because of the shared rear wall, which keeps a whole-house job smaller and cheaper than an equivalent semi elsewhere. The gritstone villas in Headingley and Roundhay are the bigger jobs - more openings, often a bay, and conservation constraints on the street elevation.

## Why Leeds homeowners choose us

- One itemised quote per opening so you can compare fairly
- Ventilation strategy confirmed for single-aspect back-to-back houses
- A single matched foiled finish across the whole property
- Structural check on Headingley and Roundhay bay fronts before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Leeds

Headingley, Roundhay, Chapel Allerton, Meanwood and Horsforth, out to Bradford, Wakefield, Huddersfield and Harrogate. Postcodes LS1 to LS17.

## Frequently asked questions

**Is a whole-house job cheaper on a Leeds back-to-back?**
Often, yes - fewer openings because of the shared rear wall. Expect 6 to 9 rather than the 10 to 14 of a comparable semi.

**What does whole-home double glazing cost in Leeds?**
Usually £2,640 to £7,920 depending on opening count, frame material and bays, using the local 0.88x cost factor.

**Can I do it in phases?**
You can, but one visit means one scaffold and one matched finish - usually a better per-window price too.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Leeds | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Leeds from FENSA fitters. From £308 per window. Free, no-obligation.',
      body: `## Casement windows for Leeds homes

The casement is the standard replacement across the interwar semis of Moortown, Cross Gates and Rothwell, and on the back-to-backs where the original openings are small and square. A flush-sash casement suits the gritstone and stone-mullion streets of Headingley and Meanwood far better than a chunky lipped frame.

## Why Leeds homeowners choose us

- Flush-sash and standard casements priced side by side
- Small-opening casements sized to back-to-back terrace windows
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Leeds

Moortown, Headingley, Meanwood, Chapel Allerton, Kirkstall and Horsforth, plus Bradford, Wakefield, Huddersfield and Harrogate. Postcodes LS1 to LS17.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame instead of standing proud - a cleaner line for Leeds's stone streets, at about 10 to 15% over a standard casement.

**Can a small back-to-back window still meet fire-escape rules?**
Not always from a standard casement - the clear opening has to be at least 450mm x 450mm and 0.33 square metres. Your installer should check each bedroom window and flag any that need a different opening style.

**How much are casement windows in Leeds?**
Around £308 to £792 per window fitted, using the local 0.88x factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Leeds | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Leeds from vetted installers. Typical £1,056-£2,816. Free, no-obligation.',
      body: `## Bay window replacement in Leeds

The stone or brick bay on a Headingley, Chapel Allerton or Roundhay villa is the trickiest window in the house. Many of the Victorian ones were built with the box frames doing structural work, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs - that structural element, not the glass, drives the price.

## Why Leeds homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so a stone bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Leeds

Headingley, Chapel Allerton, Roundhay, Meanwood and Kirkstall, plus Bradford, Wakefield, Huddersfield and Harrogate. Postcodes LS1 to LS17.

## Frequently asked questions

**Does my Leeds Victorian bay need a steel beam?**
Almost certainly if it is pre-1914. A structural survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work on top of the glazing.

**How much does a bay window cost in Leeds?**
Typically £1,056 to £2,816 for the glazing using the local 0.88x factor, plus the structural work if needed.

**Will a new bay match a conservation area street?**
It can, but the profile and glazing bar pattern usually need council sign-off first - get that in writing before the frames are made.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Leeds | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Leeds from vetted fitters. From £572. Free, no-obligation.',
      body: `## uPVC doors for Leeds homes

On a Leeds back-to-back the front door opens straight onto the street with no hallway buffer, so draught-proofing and a good seal matter more than usual. uPVC handles that well, and a French or patio door onto a yard or small garden costs far less in uPVC than aluminium while performing fine for most homes here.

## Why Leeds homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Draught-sealed thresholds for front doors that open straight onto the street
- Foiled colours matched to your existing windows and joinery
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Leeds

Headingley, Chapel Allerton, Meanwood, Roundhay and Horsforth, out to Bradford, Wakefield, Huddersfield and Harrogate. Postcodes LS1 to LS17.

## Frequently asked questions

**Is a uPVC front door secure enough for Leeds?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Leeds?**
Roughly £572 to £1,584 fitted using the local 0.88x factor, with French and sliding patio sets at the top of that range.

**Can you improve draughts on a street-facing front door?**
Yes - a compression-seal uPVC door with a weathered threshold is a big step up from an old timber door that opens straight onto the pavement.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Leeds | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Leeds. From £78. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Leeds

Where a Leeds frame is sound but a sealed unit has misted or a mechanism has jammed, a repair costs a fraction of replacement and is usually one visit. Blown seals - permanent misting between the panes - are the most common call, and on a single-aspect back-to-back they are worth fixing quickly because there is less cross-ventilation to hide a damp problem.

## Why Leeds homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units for small back-to-back openings
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Leeds

Repairs across Headingley, Chapel Allerton, Meanwood, Roundhay and Kirkstall, plus Bradford, Wakefield, Huddersfield and Harrogate. Postcodes LS1 to LS17.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays put. Around £78 to £264 per unit in Leeds using the local 0.88x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem - especially worth checking in a single-aspect house.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  glasgow: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Glasgow | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Glasgow from registered fitters. From £308 per window. Free, no-obligation, no cold calls.',
      body: `## uPVC windows in Glasgow - what is and is not allowed

Glasgow is sandstone tenement country in the West End and Southside, and a large number of those blocks are B-listed or sit in a conservation area, which usually rules out uPVC on the street elevation - timber sash-and-case is the compliant route there. Where uPVC does work well is the interwar semis of Bearsden, Cardonald and Knightswood, and the postwar stock across the outer schemes.

## Why Glasgow homeowners choose us

- Honest guidance on where uPVC is allowed and where a listed tenement needs timber
- Fitters matched to your building - suburban semi or protected tenement
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs (Scotland) as standard
- Foiled finishes for the interwar and postwar streets where uPVC is fine
- Registered installers, frames and glass guaranteed separately

## Areas we cover around Glasgow

Bearsden, Knightswood, Cardonald, Shawlands and the wider city, out to Paisley, East Kilbride and beyond. Postcodes G1 to G4, G12, G13, G20 and G41.

## Frequently asked questions

**Can I fit uPVC windows in a Glasgow tenement?**
On a B-listed block or in a conservation area, usually not on the street elevation - Listed Building Consent is required and uPVC is rarely approved. Rear elevations are sometimes more flexible. We can match you with a timber sash-and-case specialist where that is the compliant route.

**How much do uPVC windows cost in Glasgow?**
Typically £308 to £792 per window fitted, using the Scotland regional factor of 0.88x the national average - for the suburban and postwar stock where uPVC is permitted.

**Do trickle vents apply in Scotland?**
Scottish Building Standards require background ventilation on replacement windows; your installer should confirm the approach for your property.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Glasgow | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Glasgow from vetted installers. Typical £2,640-£7,920. Free, no-obligation.',
      body: `## Whole-home double glazing in Glasgow

A whole-home job in Glasgow depends heavily on the building type. A Bearsden or Newton Mearns semi is a straightforward 9 to 12 openings. A West End tenement flat is a different proposition - fewer, larger windows, high ceilings, and if the block is listed the street-facing units usually have to be timber sash-and-case rather than uPVC.

## Why Glasgow homeowners choose us

- Building-appropriate advice: uPVC for suburban stock, timber for protected tenements
- One itemised quote per opening so you can compare fairly
- Common-repair and factor obligations flagged for tenement flats
- A single matched finish across the whole property where uPVC is used
- Registered installer, certificate issued for the completed work

## Areas we cover around Glasgow

Bearsden, Newton Mearns, Shawlands, Knightswood and the West End, out to Paisley, East Kilbride and Dumbarton. Postcodes G1 to G41.

## Frequently asked questions

**Can a whole tenement flat be done in uPVC?**
Only if the block is not listed and not in a conservation area that restricts frames. Many West End and Southside blocks are, so timber sash-and-case is often the compliant answer for the street elevation.

**What does whole-home double glazing cost in Glasgow?**
Usually £2,640 to £7,920 for uPVC on suburban stock, using the local 0.88x cost factor. Timber sash-and-case for a listed flat costs considerably more.

**Do I need the factor's permission?**
For a tenement flat, changes to the common street elevation usually need agreement through the building's factor or owners' association.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Glasgow | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Glasgow from registered fitters. From £308 per window. Free, no-obligation.',
      body: `## Casement windows for Glasgow homes

Casements are the standard replacement across Glasgow's interwar and postwar stock - Bearsden, Knightswood, Cardonald, Castlemilk - where the original windows were timber casements or steel. On the tenements the original pattern is vertical sash-and-case, so a casement is only appropriate on rear elevations or unlisted blocks.

## Why Glasgow homeowners choose us

- Casements for suburban and postwar stock where the original style allows it
- Flush-sash option for streets where a modern lipped frame would look wrong
- Egress hinges on bedroom windows for fire-escape requirements
- Trickle ventilation to Scottish Building Standards
- Multi-point locking and internal beading as standard

## Areas we cover around Glasgow

Bearsden, Knightswood, Cardonald, Shawlands and the wider city, plus Paisley, East Kilbride and Dumbarton. Postcodes G1 to G41.

## Frequently asked questions

**Should a Glasgow tenement have casements or sash windows?**
The original and usually the required style for a listed or conservation-area tenement is vertical sash-and-case. Casements suit the suburban stock and unlisted rear elevations.

**What is a flush casement window?**
One where the sash closes level with the frame - a cleaner, more traditional line, at roughly 10 to 15% over a standard casement.

**How much are casement windows in Glasgow?**
Around £308 to £792 per window fitted for suburban stock, using the local 0.88x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Glasgow | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Glasgow from vetted installers. Typical £1,056-£2,816. Free, no-obligation.',
      body: `## Bay window replacement in Glasgow

Bay windows in Glasgow are mostly on the interwar bungalows and villas of Bearsden, Giffnock and Newlands rather than the tenements. Many of those 1920s and 1930s bays have a timber or early concrete lintel already, so a full structural steel is needed less often here than on a Victorian English bay - but a survey still confirms it before anything is ordered.

## Why Glasgow homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so an interwar splay bay keeps its proportions
- Lead flashing and apron repairs above the bay included where needed
- Steel or reinforced lintel fitted only where the survey shows it is needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Glasgow

Bearsden, Giffnock, Newlands, Shawlands and Newton Mearns, plus Paisley, East Kilbride and Dumbarton. Postcodes G1 to G41.

## Frequently asked questions

**Does a Glasgow 1930s bay need a steel beam?**
Often not - interwar builders usually fitted a lintel. A survey confirms whether the existing support is adequate before any frame is ordered.

**How much does a bay window cost in Glasgow?**
Typically £1,056 to £2,816 for the glazing using the local 0.88x factor, plus £600 to £1,200 if structural work is needed.

**Can you keep the internal bay reveal and seat?**
Usually yes - the frame is replaced around them; making-good is included where they have to be disturbed.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Glasgow | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Glasgow from vetted fitters. From £572. Free, no-obligation.',
      body: `## uPVC doors for Glasgow homes

For a Glasgow suburban house, a uPVC door handles the west-coast weather well and takes a full PAS 24 multi-point lock. On a tenement, the flat's own entrance door off the close is usually the homeowner's to change, while the main close door onto the street is a common repair handled through the factor.

## Why Glasgow homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Weather-sealed doors suited to west-coast wind-driven rain
- Foiled colours matched to your existing windows and joinery
- French and patio door options for suburban gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Glasgow

Bearsden, Knightswood, Shawlands, Giffnock and the wider city, out to Paisley, East Kilbride and Dumbarton. Postcodes G1 to G41.

## Frequently asked questions

**Can I change my tenement flat's front door?**
The door from the close into your flat is normally yours to replace. The main close door onto the street is shared and usually dealt with through the building's factor.

**Is a uPVC front door secure enough for Glasgow?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Glasgow?**
Roughly £572 to £1,584 fitted using the local 0.88x factor, with French and patio sets at the top.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Glasgow | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Glasgow. From £78. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Glasgow

Glasgow's suburban uPVC stock from the 1990s and 2000s is now at the age where sealed units fail and friction hinges wear, and the wet climate speeds up blown seals. Where the frame is sound, a misted unit is a glass swap in the existing frame, not a new window - usually one visit.

## Why Glasgow homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement sealed units
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Timber sash-and-case repair specialists for listed tenement windows

## Areas we cover around Glasgow

Repairs across Bearsden, Knightswood, Shawlands, Giffnock and the West End, plus Paisley, East Kilbride and Dumbarton. Postcodes G1 to G41.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £78 to £264 per unit in Glasgow using the local 0.88x factor.

**Can you repair rather than replace a listed tenement sash window?**
Often, yes - a refurbished sash-and-case with draught-proofing and a slim double-glazed or secondary unit is frequently the compliant and cheaper route on a listed block.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  bristol: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Bristol | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Bristol from FENSA fitters. From £343 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Bristol home

Bristol runs from Georgian Clifton townhouses - heavily restricted - through the bay-fronted Victorian terraces of Bedminster, Southville and Totterdown, to the 1930s semis of Henleaze and Westbury-on-Trym. The Victorian bay-fronts are the classic Bristol window job; Clifton and Kingsdown streets usually need timber or a slimline sympathetic option rather than standard uPVC.

## Why Bristol homeowners choose us

- Honest guidance on where uPVC works and where Clifton or Kingsdown needs timber
- Fitters who know the Bedminster and Totterdown bay-front detail
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- Foiled finishes for the coloured-terrace streets of Southville and Montpelier
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Bristol

Clifton, Redland, Bishopston, Southville, Bedminster and Fishponds, out to Bath, Portishead, Nailsea and Thornbury. Postcodes BS1 to BS9.

## Frequently asked questions

**Can I fit uPVC windows in Clifton?**
Often not on the street elevation - Clifton, Kingsdown and Cliftonwood are strict conservation areas and listed building consent is common. A slimline sympathetic uPVC or timber sash may be acceptable; check with the council first.

**How much do uPVC windows cost in Bristol?**
Typically £343 to £882 per window fitted, using the South West regional factor of 0.98x the national average.

**Do the coloured terrace streets have rules on frame colour?**
The walls, not usually the windows - but a foiled frame in a heritage colour tends to suit those streets better than bright white.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Bristol | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Bristol from vetted installers. Typical £2,940-£8,820. Free, no-obligation.',
      body: `## Whole-home double glazing in Bristol

A Bristol bay-fronted terrace is usually 8 to 12 openings including the front bay, and Bristol's hilly streets in Totterdown and Windmill Hill can make access - and scaffolding - the swing cost. Clifton and Kingsdown whole-house jobs are constrained: the street elevation often has to stay timber, so it becomes a mixed-material project.

## Why Bristol homeowners choose us

- One itemised quote per opening so you can compare fairly
- Access and scaffolding for Bristol's steep terraced streets priced up front
- Mixed-material projects handled where a conservation elevation must stay timber
- Structural check on the front bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Bristol

Clifton, Redland, Bishopston, Southville, Bedminster and Fishponds, out to Bath, Portishead and Nailsea. Postcodes BS1 to BS9.

## Frequently asked questions

**Can the whole house be uPVC in a Bristol conservation area?**
Often not - the street-facing elevation may have to stay timber while the rear and sides can be uPVC. That makes it a mixed-material job, which a good installer will quote clearly.

**What does whole-home double glazing cost in Bristol?**
Usually £2,940 to £8,820 for uPVC, using the local 0.98x cost factor. A part-timber conservation job costs more.

**How long does it take?**
Two to four days for a terrace, longer where a steep-street scaffold or a structural bay is involved.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Bristol | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Bristol from FENSA fitters. From £343 per window. Free, no-obligation.',
      body: `## Casement windows for Bristol homes

Casements are the default across the interwar semis of Henleaze, Westbury-on-Trym and Horfield, and on the rear elevations of the Victorian terraces where the front keeps its sashes or bay. A flush-sash casement holds a cleaner line on Bristol's older streets than a standard lipped frame.

## Why Bristol homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements for terrace rears where the front elevation stays period
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Bristol

Henleaze, Westbury-on-Trym, Horfield, Bishopston, Redland and Fishponds, plus Bath, Portishead and Nailsea. Postcodes BS1 to BS9.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame rather than standing proud of it - a more traditional look for Bristol's Victorian and Edwardian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Bristol?**
Around £343 to £882 per window fitted, using the local 0.98x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Bristol | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Bristol from vetted installers. Typical £1,176-£3,136. Free, no-obligation.',
      body: `## Bay window replacement in Bristol

The two-storey Victorian bay is a Bristol trademark across Bedminster, Totterdown, Redland and St Andrews - often a double bay stacked over two floors. Those were commonly built without a full structural beam, so a steel or reinforced lintel is usually needed to bring the opening up to current Building Regs, and a two-storey bay needs the structure checked at both levels.

## Why Bristol homeowners choose us

- Structural survey of the bay - both floors on a two-storey bay - before any frame is ordered
- Matched frame widths so the stacked bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs between and above the bays included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Bristol

Bedminster, Totterdown, Redland, Bishopston, St Andrews and Southville, plus Bath, Portishead and Nailsea. Postcodes BS1 to BS9.

## Frequently asked questions

**My Bristol bay runs over two floors - is that a bigger job?**
Yes. The structure has to be checked at both levels and the two bays have to line up, so it costs more than a single-storey bay and takes longer.

**How much does a bay window cost in Bristol?**
Typically £1,176 to £3,136 for the glazing using the local 0.98x factor, plus £600 to £1,200 or more for structural work on a two-storey bay.

**Will a new bay match a conservation area street?**
It can, but the profile usually needs council sign-off first - get that in writing before manufacture.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Bristol | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Bristol from vetted fitters. From £637. Free, no-obligation.',
      body: `## uPVC doors for Bristol homes

For a Bristol semi or terrace rear, uPVC is the sensible choice for back, side and garden doors; the front is where Clifton and Redland homeowners often prefer timber or composite for appearance. A uPVC French or patio door onto a courtyard garden costs far less than aluminium and suits most Bristol homes.

## Why Bristol homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Foiled colours matched to your existing windows and joinery
- French and patio door options for Bristol's small courtyard gardens
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Bristol

Bishopston, Redland, Southville, Bedminster, Henleaze and Fishponds, out to Bath, Portishead and Nailsea. Postcodes BS1 to BS9.

## Frequently asked questions

**Is a uPVC front door secure enough for Bristol?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**Can I fit uPVC doors on a Clifton house?**
Rear and side doors usually, yes. A street-facing door on a listed Clifton house may need to stay timber - check with the council first.

**How much do uPVC doors cost in Bristol?**
Roughly £637 to £1,764 fitted using the local 0.98x factor, with French and sliding patio sets at the top.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Bristol | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Bristol. From £87. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Bristol

When a Bristol frame is sound but a sealed unit has misted or a mechanism has failed, repair beats replacement until the cost approaches half a new window. Blown seals on the 1990s and 2000s uPVC in Henleaze, Horfield and Fishponds are the most common call - the failed unit comes out, a new one made to size goes into the existing frame.

## Why Bristol homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including odd sizes on terrace rears
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Timber sash repair specialists for Clifton and Kingsdown windows

## Areas we cover around Bristol

Repairs across Henleaze, Horfield, Bishopston, Redland, Southville and Fishponds, plus Bath, Portishead and Nailsea. Postcodes BS1 to BS9.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £87 to £294 per unit in Bristol using the local 0.98x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**Can you repair a Clifton timber sash rather than replace it?**
Often, yes - draught-proofing and a slim double-glazed or secondary unit in a refurbished sash is frequently the compliant and cheaper route on a listed street.`,
    },
  },

  edinburgh: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Edinburgh | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Edinburgh from registered fitters. From £333 per window. Free, no-obligation, no cold calls.',
      body: `## uPVC windows in Edinburgh - where they are allowed

Edinburgh's New Town and Old Town are a UNESCO World Heritage Site, and the Victorian tenements of Marchmont, Bruntsfield and Morningside sit in conservation areas too - on all of those, a street-facing window change needs Listed Building or conservation-area consent and uPVC is very rarely approved. Where uPVC works is the interwar bungalows and semis of Corstorphine, Colinton and Liberton, and postwar stock further out.

## Why Edinburgh homeowners choose us

- Straight advice on where uPVC is permitted and where the answer is timber sash-and-case
- Fitters matched to your property - suburban house or protected tenement
- A-rated units and trickle ventilation to Scottish Building Standards as standard
- Foiled finishes for the suburban streets where uPVC is fine
- Registered installers, frames and glass guaranteed separately

## Areas we cover around Edinburgh

Corstorphine, Colinton, Liberton, Cramond and the wider city, out to Livingston, Musselburgh, Dalkeith and Penicuik. Postcodes EH1 to EH3, EH8 to EH12.

## Frequently asked questions

**Can I fit uPVC windows in an Edinburgh tenement?**
In the New Town, Old Town or a conservation-area block, almost never on the street elevation - Listed Building or conservation consent is required and uPVC is rarely approved. Timber sash-and-case is the compliant route, and we can match you with a specialist.

**How much do uPVC windows cost in Edinburgh?**
Typically £333 to £855 per window fitted for suburban stock, using the Scotland regional factor of 0.95x the national average.

**Is the whole city restricted?**
No - the suburbs (Corstorphine, Colinton, Liberton and similar) are largely unrestricted and uPVC is common there.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Edinburgh | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Edinburgh from vetted installers. Typical £2,850-£8,550. Free, no-obligation.',
      body: `## Whole-home double glazing in Edinburgh

A whole-house job in Edinburgh splits sharply by area. A Corstorphine or Barnton bungalow is a standard 9 to 12-opening uPVC job. A Marchmont or New Town flat is a heritage project - fewer, much larger sash windows, high ceilings, and Listed Building Consent for anything visible from the street, which means timber sash-and-case, not uPVC.

## Why Edinburgh homeowners choose us

- Area-appropriate advice: uPVC for the suburbs, timber for New Town and tenement flats
- One itemised quote per opening so you can compare fairly
- Listed Building Consent requirements flagged before you commit
- A single matched finish across the property where uPVC is used
- Registered installer, certificate issued for the completed work

## Areas we cover around Edinburgh

Corstorphine, Colinton, Liberton, Cramond and Barnton, out to Livingston, Musselburgh and Dalkeith. Postcodes EH1 to EH12.

## Frequently asked questions

**Can a New Town flat be done in uPVC?**
No - the New Town is a World Heritage Site and street-facing windows must be timber sash-and-case under Listed Building Consent. The job is still worth doing, just as a heritage timber project rather than uPVC.

**What does whole-home double glazing cost in Edinburgh?**
Usually £2,850 to £8,550 for uPVC on suburban stock, using the local 0.95x cost factor. A timber sash-and-case job for a tenement or New Town flat costs significantly more.

**How long does it take?**
Two to four days for a suburban house; a heritage sash project is longer and often phased.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Edinburgh | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Edinburgh from registered fitters. From £333 per window. Free, no-obligation.',
      body: `## Casement windows for Edinburgh homes

Casements are the standard replacement across Edinburgh's interwar and postwar suburbs - Corstorphine, Colinton, Liberton, Clermiston - where the original windows were timber casements. In the tenement and New Town areas the original and required style is vertical sash-and-case, so casements are only appropriate on the unrestricted suburban stock.

## Why Edinburgh homeowners choose us

- Casements for suburban stock where the original style allows it
- Flush-sash option for a cleaner line on older suburban streets
- Egress hinges on bedroom windows for fire-escape requirements
- Trickle ventilation to Scottish Building Standards
- Multi-point locking and internal beading as standard

## Areas we cover around Edinburgh

Corstorphine, Colinton, Liberton, Clermiston and Cramond, plus Livingston, Musselburgh and Dalkeith. Postcodes EH1 to EH12.

## Frequently asked questions

**Should an Edinburgh tenement have casements?**
No - the required style for a listed or conservation-area tenement is vertical sash-and-case. Casements suit the suburban stock.

**What is a flush casement window?**
One where the sash closes level with the frame rather than proud of it - a cleaner line, at roughly 10 to 15% over a standard casement.

**How much are casement windows in Edinburgh?**
Around £333 to £855 per window fitted for suburban stock, using the local 0.95x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Edinburgh | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Edinburgh from vetted installers. Typical £1,140-£3,040. Free, no-obligation.',
      body: `## Bay window replacement in Edinburgh

Bay windows in Edinburgh are mostly on the interwar bungalows and villas of Corstorphine, Craiglockhart and Blackhall rather than the tenements. Those 1920s and 1930s bays often have adequate structural support already, so a full steel is needed less often than on an English Victorian bay - but a survey still confirms it, and any bay on a conservation-area frontage may be restricted to timber.

## Why Edinburgh homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so an interwar splay bay keeps its proportions
- Steel or reinforced lintel fitted only where the survey shows it is needed
- Lead flashing and apron repairs above the bay included where needed
- Timber bay specialists where a conservation frontage requires it

## Areas we cover around Edinburgh

Corstorphine, Craiglockhart, Blackhall, Colinton and Barnton, plus Livingston, Musselburgh and Dalkeith. Postcodes EH1 to EH12.

## Frequently asked questions

**Does an Edinburgh 1930s bay need a steel beam?**
Often not - interwar builders usually provided support. A survey confirms whether the existing structure is adequate before any frame is ordered.

**How much does a bay window cost in Edinburgh?**
Typically £1,140 to £3,040 for the glazing using the local 0.95x factor, plus structural work if the survey calls for it.

**Can the bay be uPVC?**
On an unrestricted suburban street, yes. On a conservation-area frontage it may have to be timber - check before ordering.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Edinburgh | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Edinburgh from vetted fitters. From £618. Free, no-obligation.',
      body: `## uPVC doors for Edinburgh homes

For a suburban Edinburgh house, a uPVC door handles the weather well and takes a full PAS 24 multi-point lock. On a tenement, your flat's entrance door off the stair is normally yours to change; the main street door is shared and handled through the stair's owners. Street-facing doors on New Town and listed properties usually have to stay timber.

## Why Edinburgh homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Weather-sealed doors for Edinburgh's exposed, windy sites
- Foiled colours matched to your existing windows and joinery
- French and patio door options for suburban gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Edinburgh

Corstorphine, Colinton, Liberton, Cramond and Barnton, out to Livingston, Musselburgh and Dalkeith. Postcodes EH1 to EH12.

## Frequently asked questions

**Can I change my Edinburgh tenement flat's door?**
The door from the stair into your flat is normally yours to replace. The main street door is shared and dealt with through the stair's owners' association.

**Can a New Town front door be uPVC?**
Usually not - a street-facing door on a listed New Town property has to stay timber under Listed Building Consent.

**How much do uPVC doors cost in Edinburgh?**
Roughly £618 to £1,710 fitted for suburban properties using the local 0.95x factor.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Edinburgh | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Edinburgh. From £85. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Edinburgh

Edinburgh's suburban uPVC from the 1990s and 2000s is now at the age where sealed units mist and friction hinges wear. Where the frame is sound, that is a glass-unit swap in the existing frame - one visit. For the tenement and New Town flats, the equivalent job is refurbishing and draught-proofing the original timber sash-and-case.

## Why Edinburgh homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement sealed units for suburban uPVC
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Timber sash-and-case refurbishment specialists for listed and New Town flats

## Areas we cover around Edinburgh

Repairs across Corstorphine, Colinton, Liberton, Cramond and Barnton, plus Livingston, Musselburgh and Dalkeith. Postcodes EH1 to EH12.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £85 to £285 per unit in Edinburgh using the local 0.95x factor.

**Can you repair a New Town sash window instead of replacing it?**
Usually, yes - and on a listed New Town property, refurbishment with draught-proofing and slim glazing is often the only consented option as well as the cheaper one.

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
