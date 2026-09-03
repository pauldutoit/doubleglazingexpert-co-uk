#!/usr/bin/env node
/* Hand-written city content, batch 3: Sheffield, Bradford, Liverpool, Cardiff, Coventry, Leicester.
 * Same contract as handwritten-city-content.mjs. Ships indexable:false.
 *   node scripts/handwritten-city-content-3.mjs --force
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyCity = args.find((a) => a.startsWith('--city='))?.split('=')[1];

const content = {
  sheffield: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Sheffield | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Sheffield from FENSA fitters. From £305 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Sheffield home

Sheffield is a stone city on steep ground. The Victorian terraces of Walkley, Crookes and Nether Edge are built from local sandstone with tall openings, and many sit on hillsides where scaffolding and access add to a window job. Dore, Totley and Bradway bring more standard 1930s red-brick semis where the work is quicker and more predictable.

## Why Sheffield homeowners choose us

- Fitters who allow for hillside access and scaffolding on the steep terraced streets
- Openings sized to stone-mullion and stone-lintel Victorian terraces
- Knowledge of the 38 conservation areas, concentrated in the south-west suburbs and Porter Valley
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Sheffield

Walkley, Crookes, Nether Edge, Sharrow, Broomhill and Dore, out to Rotherham, Barnsley, Chesterfield and Doncaster. Postcodes S1 to S3, S6, S7, S10 and S11.

## Frequently asked questions

**Does a hillside terrace cost more to reglaze in Sheffield?**
It can - a steep or stepped access often needs a tailored scaffold or a longer working day, which a good installer will price openly rather than hide.

**Do Sheffield conservation areas restrict windows?**
In several of the 38, yes - particularly around Nether Edge, Broomhill and the Porter Valley. Check the council planning portal before ordering.

**How much do uPVC windows cost in Sheffield?**
Typically £305 to £783 per window fitted, using the Yorkshire regional factor of 0.87x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Sheffield | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Sheffield from vetted installers. Typical £2,610-£7,830. Free, no-obligation.',
      body: `## Whole-home double glazing in Sheffield

A whole-house job on a Walkley or Crookes stone terrace is often 8 to 11 openings, and on those hillside streets the scaffold is the single biggest variable in the price. Doing everything in one visit gets you a matched finish and one set of access costs rather than paying for scaffolding twice.

## Why Sheffield homeowners choose us

- One itemised quote per opening so you can compare fairly
- Hillside access and scaffolding for steep terraced streets priced up front
- A single matched foiled finish across the whole property
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Sheffield

Walkley, Crookes, Nether Edge, Ecclesall, Broomhill and Dore, out to Rotherham, Barnsley, Chesterfield and Doncaster. Postcodes S1 to S11.

## Frequently asked questions

**How long does a whole-house job take in Sheffield?**
Two to four days for a terrace, with more time where a hillside scaffold or a structural bay is involved.

**What does whole-home double glazing cost in Sheffield?**
Usually £2,610 to £7,830 depending on opening count, frame material and bays, using the local 0.87x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Sheffield | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Sheffield from FENSA fitters. From £305 per window. Free, no-obligation.',
      body: `## Casement windows for Sheffield homes

Casements are the standard replacement across the interwar semis of Dore, Totley and Beauchief, and on the rear elevations of the stone terraces. A flush-sash casement, sitting level with the frame, holds a cleaner line against Sheffield sandstone than a chunky lipped profile.

## Why Sheffield homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements sized to narrow stone-terrace openings
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Sheffield

Dore, Totley, Nether Edge, Crookes, Walkley and Ecclesall, plus Rotherham, Barnsley, Chesterfield and Doncaster. Postcodes S1 to S11.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame instead of standing proud - a more traditional line for Sheffield's stone streets, at roughly 10 to 15% over a standard casement.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Sheffield?**
Around £305 to £783 per window fitted, using the local 0.87x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Sheffield | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Sheffield from vetted installers. Typical £1,044-£2,784. Free, no-obligation.',
      body: `## Bay window replacement in Sheffield

Stone bays on the Victorian villas of Nether Edge, Broomhill and Endcliffe are the trickiest window in a Sheffield house. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs - and on a stone elevation the making-good has to be done carefully.

## Why Sheffield homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so a stone bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Careful making-good of stonework and lead flashing above the bay
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Sheffield

Nether Edge, Broomhill, Endcliffe, Crookes and Ecclesall, plus Rotherham, Barnsley, Chesterfield and Doncaster. Postcodes S1 to S11.

## Frequently asked questions

**Does my Sheffield Victorian bay need a steel?**
Almost certainly if it is pre-1914 - most were built without one. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the structural work.

**How much does a bay window cost in Sheffield?**
Typically £1,044 to £2,784 for the glazing using the local 0.87x factor, plus the structural work if needed.

**Will the stonework be made good properly?**
It should be - insist the quote covers reinstating the stone reveal and any lead flashing, not just fitting the frame.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Sheffield | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Sheffield from vetted fitters. From £566. Free, no-obligation.',
      body: `## uPVC doors for Sheffield homes

For a Sheffield semi or terrace, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. On the hillside terraces the back door often opens onto a raised yard or steps, so a weathered threshold and a solid seal matter.

## Why Sheffield homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Weathered thresholds for back doors onto raised yards and steps
- Foiled colours matched to your existing windows and joinery
- French and patio door options for sloping Sheffield gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Sheffield

Crookes, Walkley, Nether Edge, Dore, Ecclesall and Broomhill, out to Rotherham, Barnsley, Chesterfield and Doncaster. Postcodes S1 to S11.

## Frequently asked questions

**Is a uPVC front door secure enough for Sheffield?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Sheffield?**
Roughly £566 to £1,566 fitted using the local 0.87x factor, with French and sliding patio sets at the top.

**Can you fit a level threshold on a sloping site?**
Often yes, with a made-up step or ramp inside or out - worth discussing at the site visit.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Sheffield | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Sheffield. From £77. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Sheffield

Where a Sheffield frame is sound but a sealed unit has misted or a mechanism has failed, repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Dore, Totley and Beauchief are the most common call.

## Why Sheffield homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including odd sizes on stone-terrace openings
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Sheffield

Repairs across Dore, Totley, Nether Edge, Crookes, Walkley and Ecclesall, plus Rotherham, Barnsley, Chesterfield and Doncaster. Postcodes S1 to S11.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £77 to £261 per unit in Sheffield using the local 0.87x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  bradford: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Bradford | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Bradford from FENSA fitters. From £301 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Bradford home

Bradford shares the Yorkshire stone back-to-back with Leeds - houses in Great Horton, Girlington and West Bowling that adjoin the next street at the rear, so windows face only one or two ways. Add the mill-owner villas of Manningham and the interwar semis of Wibsey and Idle, and a window job here really depends on which you have. Saltaire is a separate case entirely.

## Why Bradford homeowners choose us

- Fitters who understand back-to-back layouts and single-aspect ventilation
- Openings sized to Yorkshire stone terraces, not forced into stock frames
- Clear guidance on Saltaire, where the whole village is protected
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Bradford

Manningham, Heaton, Idle, Wibsey, Clayton and the wider district, out to Leeds, Keighley, Shipley and Bingley. Postcodes BD1 to BD3, BD5, BD7 and BD9.

## Frequently asked questions

**Can I fit uPVC windows in Saltaire?**
Saltaire is a UNESCO World Heritage Site and the whole village is a conservation area with strict rules - uPVC is very rarely permitted on the street elevation, and consent is required. A sympathetic timber or slimline option may be acceptable; check with Bradford Council first.

**Do back-to-back houses have special ventilation rules?**
They can - a single-aspect house depends heavily on trickle ventilation and extract fans, so trickle vents in the new frames are not optional.

**How much do uPVC windows cost in Bradford?**
Typically £301 to £774 per window fitted, using the Yorkshire regional factor of 0.86x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Bradford | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Bradford from vetted installers. Typical £2,580-£7,740. Free, no-obligation.',
      body: `## Whole-home double glazing in Bradford

A back-to-back or through terrace in Bradford might only be 6 to 9 openings because of the shared rear wall, keeping a whole-house job smaller and cheaper than an equivalent semi. The Manningham villas are the bigger jobs - more openings, often a stone bay, and a conservation constraint on the street elevation.

## Why Bradford homeowners choose us

- One itemised quote per opening so you can compare fairly
- Ventilation strategy confirmed for single-aspect back-to-back houses
- A single matched foiled finish across the whole property
- Structural check on Manningham stone bay fronts before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Bradford

Manningham, Heaton, Idle, Wibsey and Clayton, out to Leeds, Keighley, Shipley and Bingley. Postcodes BD1 to BD9.

## Frequently asked questions

**Is a whole-house job cheaper on a Bradford back-to-back?**
Often, yes - fewer openings because of the shared rear wall. Expect 6 to 9 rather than the 10 to 14 of a comparable semi.

**What does whole-home double glazing cost in Bradford?**
Usually £2,580 to £7,740 depending on opening count, frame material and bays, using the local 0.86x cost factor.

**Can I do it in phases?**
You can, but one visit means one scaffold and one matched finish.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Bradford | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Bradford from FENSA fitters. From £301 per window. Free, no-obligation.',
      body: `## Casement windows for Bradford homes

Casements are the standard replacement across the interwar semis of Wibsey, Idle and Thackley, and on the back-to-backs where the original openings are small and square. A flush-sash casement suits the Yorkshire stone streets of Heaton and Manningham better than a lipped frame.

## Why Bradford homeowners choose us

- Flush-sash and standard casements priced side by side
- Small-opening casements sized to back-to-back terrace windows
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Bradford

Wibsey, Idle, Heaton, Manningham and Clayton, plus Leeds, Keighley, Shipley and Bingley. Postcodes BD1 to BD9.

## Frequently asked questions

**Can a small back-to-back window meet fire-escape rules?**
Not always from a standard casement - the clear opening has to be at least 450mm x 450mm and 0.33 square metres. Your installer should check each bedroom window and flag any that need a different opening style.

**What is a flush casement window?**
One where the sash closes level with the frame - a cleaner line for Bradford's stone streets, at roughly 10 to 15% over a standard casement.

**How much are casement windows in Bradford?**
Around £301 to £774 per window fitted, using the local 0.86x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Bradford | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Bradford from vetted installers. Typical £1,032-£2,752. Free, no-obligation.',
      body: `## Bay window replacement in Bradford

Stone bays on the Victorian villas of Manningham, Heaton and Frizinghall are the trickiest window job in a Bradford house. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay, and the stone reveal has to be reinstated carefully afterwards.

## Why Bradford homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so a stone bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Careful making-good of stonework and lead flashing above the bay
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Bradford

Manningham, Heaton, Frizinghall, Idle and Clayton, plus Leeds, Keighley, Shipley and Bingley. Postcodes BD1 to BD9.

## Frequently asked questions

**Does my Bradford Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the structural work.

**How much does a bay window cost in Bradford?**
Typically £1,032 to £2,752 for the glazing using the local 0.86x factor, plus the structural work if needed.

**Will the stone reveal be reinstated?**
It should be - the quote must cover making-good the stonework and lead flashing, not just the frame.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Bradford | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Bradford from vetted fitters. From £559. Free, no-obligation.',
      body: `## uPVC doors for Bradford homes

On a Bradford back-to-back the front door opens straight onto the street with no hallway buffer, so a good compression seal and a weathered threshold matter. uPVC handles that well, and a French or patio door onto a yard costs far less than aluminium.

## Why Bradford homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Draught-sealed thresholds for front doors that open straight onto the street
- Foiled colours matched to your existing windows and joinery
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Bradford

Manningham, Heaton, Idle, Wibsey and Clayton, out to Leeds, Keighley, Shipley and Bingley. Postcodes BD1 to BD9.

## Frequently asked questions

**Is a uPVC front door secure enough for Bradford?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Bradford?**
Roughly £559 to £1,548 fitted using the local 0.86x factor, with French and sliding patio sets at the top.

**Can you improve draughts on a street-facing front door?**
Yes - a compression-seal uPVC door with a weathered threshold is a big step up from an old timber door opening straight onto the pavement.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Bradford | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Bradford. From £77. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Bradford

Where a Bradford frame is sound but a sealed unit has misted or a mechanism has jammed, a repair is a fraction of replacement cost and usually one visit. On a single-aspect back-to-back a blown seal is worth fixing quickly, as there is less cross-ventilation to mask a damp problem.

## Why Bradford homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units for small back-to-back openings
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Bradford

Repairs across Manningham, Heaton, Idle, Wibsey and Clayton, plus Leeds, Keighley, Shipley and Bingley. Postcodes BD1 to BD9.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays put. Around £77 to £258 per unit in Bradford using the local 0.86x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem - worth checking in a single-aspect house.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  liverpool: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Liverpool | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Liverpool from FENSA fitters. From £308 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Liverpool home

Liverpool runs from the Georgian townhouses around Rodney Street and the cathedral - heavily restricted - through the Victorian terraces of Anfield, Toxteth and Kensington, to the Wavertree and Aigburth interwar semis. The Georgian streets usually need timber or a slimline sympathetic option; uPVC works well on the terrace and suburban stock.

## Why Liverpool homeowners choose us

- Honest guidance on where the Georgian glazing-bar pattern has to be replicated
- Fitters who know the Anfield and Kensington terrace openings
- Knowledge of the 35 conservation areas, including Canning and Woolton village
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Liverpool

Woolton, Allerton, Aigburth, Wavertree, Mossley Hill and Crosby, out to Waterloo, Bootle, Huyton and St Helens. Postcodes L1 to L3, L8, L15, L17 and L18.

## Frequently asked questions

**Can I fit uPVC windows in the Canning or Rodney Street area?**
Often not on the street elevation - these are strict conservation areas with many listed buildings, and the Georgian glazing-bar pattern usually has to be replicated in timber. Check with the council first.

**How much do uPVC windows cost in Liverpool?**
Typically £308 to £792 per window fitted, using the North West regional factor of 0.88x the national average.

**Do the Woolton sandstone streets have rules?**
Woolton village is a conservation area - street-facing changes there need care and often consent.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Liverpool | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Liverpool from vetted installers. Typical £2,640-£7,920. Free, no-obligation.',
      body: `## Whole-home double glazing in Liverpool

A whole Liverpool terrace in Anfield, Kensington or Old Swan is usually 8 to 12 openings including a bay. Doing everything in one visit gets you a matched finish rather than the patchwork most terraces build up over years. Georgian and Woolton conservation streets become mixed-material jobs, with timber on the front.

## Why Liverpool homeowners choose us

- One itemised quote per opening so you can compare fairly
- Mixed-material projects handled where a conservation elevation must stay timber
- A single matched finish across the property where uPVC is used
- Structural check on the front bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Liverpool

Woolton, Allerton, Aigburth, Wavertree, Mossley Hill and Crosby, out to Waterloo, Bootle, Huyton and St Helens. Postcodes L1 to L18.

## Frequently asked questions

**Can the whole house be uPVC in a Liverpool conservation area?**
Often not - the street elevation may have to stay timber while the rear and sides can be uPVC, making it a mixed-material job.

**What does whole-home double glazing cost in Liverpool?**
Usually £2,640 to £7,920 for uPVC, using the local 0.88x cost factor.

**How long does it take?**
Two to four days for a terrace, longer where a structural bay is involved.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Liverpool | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Liverpool from FENSA fitters. From £308 per window. Free, no-obligation.',
      body: `## Casement windows for Liverpool homes

Casements are the default across the interwar semis of West Derby, Childwall and Aigburth, and on the rear elevations of the Victorian terraces. A flush-sash casement holds a cleaner line on the older brick and sandstone streets than a standard lipped frame.

## Why Liverpool homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements for terrace rears where the front elevation stays period
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Liverpool

West Derby, Childwall, Aigburth, Wavertree, Allerton and Mossley Hill, plus Waterloo, Bootle, Huyton and St Helens. Postcodes L1 to L18.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame rather than proud of it - a more traditional look for Liverpool's Victorian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Liverpool?**
Around £308 to £792 per window fitted, using the local 0.88x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Liverpool | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Liverpool from vetted installers. Typical £1,056-£2,816. Free, no-obligation.',
      body: `## Bay window replacement in Liverpool

The Victorian bay front is common across Wavertree, Mossley Hill and Sefton Park, and most were built without a full structural beam. Bringing that opening up to current Building Regs usually means a steel or reinforced lintel above the bay - the structural element, not the glass, drives the price.

## Why Liverpool homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay proportions stay right
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Liverpool

Wavertree, Mossley Hill, Sefton Park, Allerton and Aigburth, plus Waterloo, Bootle, Huyton and St Helens. Postcodes L1 to L18.

## Frequently asked questions

**Does my Liverpool Victorian bay need a steel?**
Almost certainly if it is pre-1914 - most were built without one. A structural survey confirms it. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Liverpool?**
Typically £1,056 to £2,816 for the glazing using the local 0.88x factor, plus the structural work if needed.

**Will a new bay match a conservation area street?**
It can, but the profile usually needs council sign-off first - get that in writing before manufacture.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Liverpool | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Liverpool from vetted fitters. From £572. Free, no-obligation.',
      body: `## uPVC doors for Liverpool homes

For a Liverpool terrace or semi, uPVC is the sensible choice for back, side and garden doors; the front is where homeowners in Georgian and Woolton streets often prefer timber for appearance. A uPVC French or patio door onto a yard or garden costs far less than aluminium.

## Why Liverpool homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Weather-sealed doors suited to the Merseyside coast and wind-driven rain
- Foiled colours matched to your existing windows and joinery
- French and patio door options for terrace yards and suburban gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Liverpool

Woolton, Allerton, Aigburth, Wavertree, West Derby and Crosby, out to Waterloo, Bootle, Huyton and St Helens. Postcodes L1 to L18.

## Frequently asked questions

**Is a uPVC front door secure enough for Liverpool?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Liverpool?**
Roughly £572 to £1,584 fitted using the local 0.88x factor, with French and sliding patio sets at the top.

**Can I fit uPVC doors on a Rodney Street property?**
Rear and side doors usually, yes. A street-facing door on a listed Georgian property may need to stay timber - check with the council first.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Liverpool | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Liverpool. From £78. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Liverpool

Where a Liverpool frame is sound but a sealed unit has misted or a mechanism has failed, a repair is a fraction of replacement cost and usually one visit. Blown seals on the 1990s and 2000s uPVC in West Derby, Childwall and Aigburth are the most common call, and the coastal climate speeds them up.

## Why Liverpool homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including odd sizes on terrace rears
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Timber sash repair specialists for Georgian and Woolton windows

## Areas we cover around Liverpool

Repairs across West Derby, Childwall, Aigburth, Wavertree and Allerton, plus Waterloo, Bootle, Huyton and St Helens. Postcodes L1 to L18.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £78 to £264 per unit in Liverpool using the local 0.88x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**Can you repair a Georgian timber sash instead of replacing it?**
Often, yes - draught-proofing and slim glazing in a refurbished sash is frequently the compliant and cheaper route on a listed street.`,
    },
  },

  cardiff: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Cardiff | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Cardiff from FENSA fitters. From £308 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Cardiff home

Cardiff is a city of bay-fronted Victorian terraces - Cathays, Roath, Grangetown and Canton are street after street of them, with a two-storey bay on the front and tall sash openings behind. Cyncoed and Lisvane bring detached Edwardian villas, and the Bay has modern apartments. The terrace bays are the classic Cardiff window job.

## Why Cardiff homeowners choose us

- Fitters who know the Cathays and Roath bay-front detail inside out
- Openings sized to tall Victorian terrace sashes, not forced into stock frames
- Knowledge of the conservation areas around Pontcanna, Roath Park and Cathays Park
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Cardiff

Cathays, Roath, Pontcanna, Canton, Penylan and Cyncoed, out to Penarth, Barry, Caerphilly and Newport. Postcodes CF10, CF11, CF14, CF23 and CF24.

## Frequently asked questions

**Do Cardiff conservation areas restrict windows?**
Around 27 conservation areas including Pontcanna, Roath Park and Cathays Park have controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Cardiff?**
Typically £308 to £792 per window fitted, using the Wales regional factor of 0.88x the national average.

**Can a student-let terrace still be reglazed to standard?**
Yes, and it should be - trickle ventilation and safe egress from bedrooms matter more in a shared house, not less.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Cardiff | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Cardiff from vetted installers. Typical £2,640-£7,920. Free, no-obligation.',
      body: `## Whole-home double glazing in Cardiff

A Cardiff bay-fronted terrace is usually 8 to 12 openings including the two-storey front bay. That stacked bay is the biggest single item on the quote - it often needs the structure checked at both levels. Doing the whole house in one visit gets you a matched finish rather than a patchwork.

## Why Cardiff homeowners choose us

- One itemised quote per opening so you can compare fairly
- Structural check of the two-storey bay at both levels before glass is ordered
- A single matched foiled finish across the whole property
- Access and scaffolding for terraced streets priced up front
- FENSA certificate registered in your name within 30 days

## Areas we cover around Cardiff

Cathays, Roath, Pontcanna, Canton, Penylan and Cyncoed, out to Penarth, Barry, Caerphilly and Newport. Postcodes CF10 to CF24.

## Frequently asked questions

**My Cardiff bay runs over two floors - is that a bigger job?**
Yes - the structure has to be checked at both levels and the bays have to line up, so it costs more and takes longer than a single-storey bay.

**What does whole-home double glazing cost in Cardiff?**
Usually £2,640 to £7,920 depending on opening count, frame material and the bay, using the local 0.88x cost factor.

**How long does it take?**
Two to four days for a terrace, longer where the two-storey bay needs structural work.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Cardiff | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Cardiff from FENSA fitters. From £308 per window. Free, no-obligation.',
      body: `## Casement windows for Cardiff homes

Casements are the standard replacement across the interwar semis of Rhiwbina, Whitchurch and Llanishen, and on the rear elevations of the bay-fronted terraces where the front keeps its sashes. A flush-sash casement suits the older Cardiff streets better than a chunky lipped profile.

## Why Cardiff homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements for terrace rears where the front bay and sashes stay period
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Cardiff

Rhiwbina, Whitchurch, Llanishen, Roath, Canton and Penylan, plus Penarth, Barry, Caerphilly and Newport. Postcodes CF10 to CF24.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame rather than proud of it - a more traditional line for Cardiff's Victorian and Edwardian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Cardiff?**
Around £308 to £792 per window fitted, using the local 0.88x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Cardiff | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Cardiff from vetted installers. Typical £1,056-£2,816. Free, no-obligation.',
      body: `## Bay window replacement in Cardiff

The two-storey Victorian bay is a Cardiff trademark - Cathays, Roath, Grangetown and Canton are full of them, a stacked pair of bays over the front rooms. Those were commonly built without a full structural beam, so a steel or reinforced lintel is usually needed, and on a two-storey bay the structure has to be checked at both levels.

## Why Cardiff homeowners choose us

- Structural survey of the bay - both floors on a stacked bay - before any frame is ordered
- Matched frame widths so the paired bays keep their proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs between and above the bays included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Cardiff

Cathays, Roath, Grangetown, Canton and Penylan, plus Penarth, Barry, Caerphilly and Newport. Postcodes CF10 to CF24.

## Frequently asked questions

**Why does a Cardiff two-storey bay cost more?**
The structure has to be checked and often reinforced at both levels, the two bays have to align, and there is more lead flashing and making-good. It is a bigger job than a single-storey bay.

**How much does a bay window cost in Cardiff?**
Typically £1,056 to £2,816 for the glazing using the local 0.88x factor, plus £600 to £1,200 or more for structural work on a stacked bay.

**Will a new bay match a conservation area street?**
It can, but the profile usually needs council sign-off first - get that in writing before manufacture.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Cardiff | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Cardiff from vetted fitters. From £572. Free, no-obligation.',
      body: `## uPVC doors for Cardiff homes

For a Cardiff terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. A uPVC French or patio door onto a small terrace garden or a Cyncoed lawn costs far less than aluminium and performs well for most homes here.

## Why Cardiff homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Foiled colours matched to your existing windows and joinery
- French and patio door options for terrace gardens and suburban plots
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Cardiff

Cathays, Roath, Pontcanna, Canton, Penylan and Cyncoed, out to Penarth, Barry, Caerphilly and Newport. Postcodes CF10 to CF24.

## Frequently asked questions

**Is a uPVC front door secure enough for Cardiff?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Cardiff?**
Roughly £572 to £1,584 fitted using the local 0.88x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Cardiff | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Cardiff. From £78. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Cardiff

Where a Cardiff frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Rhiwbina, Whitchurch and Llanishen are the most common call.

## Why Cardiff homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including tall Victorian-terrace sizes
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Cardiff

Repairs across Rhiwbina, Whitchurch, Llanishen, Roath, Canton and Penylan, plus Penarth, Barry, Caerphilly and Newport. Postcodes CF10 to CF24.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £78 to £264 per unit in Cardiff using the local 0.88x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  coventry: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Coventry | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Coventry from FENSA fitters. From £319 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Coventry home

Coventry has an unusual housing mix because the city centre was rebuilt after heavy WWII bombing. That left postwar and system-built stock across the inner ring, alongside surviving Victorian terraces in Earlsdon and interwar semis in Chapelfields, Stoke and Cheylesmore. The postwar houses often had metal or early aluminium windows that have already been replaced once.

## Why Coventry homeowners choose us

- Fitters who know the postwar and system-built stock and its window quirks
- Replacement of old metal and early aluminium frames with correctly sized uPVC
- Openings sized to surviving Earlsdon Victorian terraces
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Coventry

Earlsdon, Chapelfields, Stivichall, Cheylesmore, Radford and Tile Hill, out to Nuneaton, Bedworth, Rugby and Leamington Spa. Postcodes CV1 to CV6.

## Frequently asked questions

**Can you replace old metal windows in a postwar Coventry house?**
Yes - the metal frame comes out, the opening is made good and a correctly sized uPVC window is fitted. It is a common job on the city's postwar stock.

**Do Coventry conservation areas restrict windows?**
Around 20 conservation areas, mostly protecting the surviving prewar suburbs like Earlsdon - check with the council if your street is one of them.

**How much do uPVC windows cost in Coventry?**
Typically £319 to £819 per window fitted, using the West Midlands regional factor of 0.91x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Coventry | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Coventry from vetted installers. Typical £2,730-£8,190. Free, no-obligation.',
      body: `## Whole-home double glazing in Coventry

A postwar Coventry semi is usually a straightforward 9 to 12-opening job - uniform sizes and simple lintels. The Earlsdon Victorian terraces are the more involved work, with taller openings and often a bay. Doing everything in one visit gets you a matched finish across the property.

## Why Coventry homeowners choose us

- One itemised quote per opening so you can compare fairly
- Removal of any remaining metal or early aluminium frames included
- A single matched foiled finish across the whole property
- Structural check on Earlsdon bay fronts before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Coventry

Earlsdon, Chapelfields, Stivichall, Cheylesmore and Tile Hill, out to Nuneaton, Bedworth, Rugby and Leamington Spa. Postcodes CV1 to CV6.

## Frequently asked questions

**How long does a whole-house job take in Coventry?**
Two to three days for a postwar semi, longer for an Earlsdon terrace with a structural bay.

**What does whole-home double glazing cost in Coventry?**
Usually £2,730 to £8,190 depending on opening count, frame material and bays, using the local 0.91x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Coventry | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Coventry from FENSA fitters. From £319 per window. Free, no-obligation.',
      body: `## Casement windows for Coventry homes

Casements are the standard replacement across Coventry's interwar and postwar stock - Chapelfields, Cheylesmore, Wyken and Tile Hill - where the originals were timber casements or steel. On the Earlsdon terraces a flush-sash casement suits the older brick better than a lipped frame.

## Why Coventry homeowners choose us

- Flush-sash and standard casements priced side by side
- Replacement of old steel and metal casements with correctly sized uPVC
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Coventry

Chapelfields, Cheylesmore, Wyken, Earlsdon, Radford and Tile Hill, plus Nuneaton, Bedworth, Rugby and Leamington Spa. Postcodes CV1 to CV6.

## Frequently asked questions

**Can you replace old steel casements with uPVC?**
Yes - the steel frame comes out, the opening is made good and a new uPVC casement is fitted to size. Common on Coventry's postwar houses.

**What is a flush casement window?**
One where the sash closes level with the frame - a cleaner line for the older Earlsdon streets, at roughly 10 to 15% over a standard casement.

**How much are casement windows in Coventry?**
Around £319 to £819 per window fitted, using the local 0.91x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Coventry | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Coventry from vetted installers. Typical £1,092-£2,912. Free, no-obligation.',
      body: `## Bay window replacement in Coventry

Bays in Coventry are mostly on the Earlsdon and Stoke Victorian terraces and the interwar semis of Chapelfields and Cheylesmore. The Victorian ones were often built without a full structural beam, so a steel or reinforced lintel is usually needed; the 1930s bays more often have adequate support already.

## Why Coventry homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where a Victorian bay needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Coventry

Earlsdon, Stoke, Chapelfields, Cheylesmore and Radford, plus Nuneaton, Bedworth, Rugby and Leamington Spa. Postcodes CV1 to CV6.

## Frequently asked questions

**Does my Coventry bay need a steel beam?**
A pre-1914 Earlsdon or Stoke bay almost always does; a 1930s Chapelfields bay often does not. A survey confirms it before any frame is ordered.

**How much does a bay window cost in Coventry?**
Typically £1,092 to £2,912 for the glazing using the local 0.91x factor, plus £600 to £1,200 if structural work is needed.

**Can you keep the internal window seat?**
Usually yes - the frame is replaced around the existing seat and reveal, with making-good where they have to be disturbed.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Coventry | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Coventry from vetted fitters. From £592. Free, no-obligation.',
      body: `## uPVC doors for Coventry homes

For a Coventry semi, uPVC handles back, side and garden doors well and is a budget option for the front. Many postwar houses still have their original doors or a first-generation replacement, so this is often a straightforward upgrade with a big gain in security and draught-proofing.

## Why Coventry homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Foiled colours matched to your existing windows and joinery
- French and patio door options for postwar semi gardens
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Coventry

Earlsdon, Chapelfields, Cheylesmore, Wyken and Tile Hill, out to Nuneaton, Bedworth, Rugby and Leamington Spa. Postcodes CV1 to CV6.

## Frequently asked questions

**Is a uPVC front door secure enough for Coventry?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Coventry?**
Roughly £592 to £1,638 fitted using the local 0.91x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Coventry | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Coventry. From £81. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Coventry

Where a Coventry frame is sound but a sealed unit has misted or a mechanism has failed, a repair is a fraction of replacement cost and usually one visit. Blown seals on the 1990s and 2000s uPVC across Cheylesmore, Wyken and Tile Hill are the most common call.

## Why Coventry homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement sealed units
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Coventry

Repairs across Cheylesmore, Wyken, Tile Hill, Earlsdon and Chapelfields, plus Nuneaton, Bedworth, Rugby and Leamington Spa. Postcodes CV1 to CV6.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £81 to £273 per unit in Coventry using the local 0.91x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  leicester: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Leicester | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Leicester from FENSA fitters. From £312 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Leicester home

Leicester runs from the dense Victorian terraces of Highfields and Clarendon Park - many now shared houses and student lets - through the red-brick villas of Stoneygate to the interwar semis of Knighton, Evington and Oadby. The Highfields and Clarendon Park streets have tall, narrow openings rarely made to a stock size.

## Why Leicester homeowners choose us

- Made-to-measure frames for tall Victorian terrace openings
- Landlord-friendly quoting for shared houses in Highfields and Clarendon Park - safe egress and ventilation done right
- Knowledge of the Clarendon Park and Stoneygate conservation areas
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Leicester

Clarendon Park, Stoneygate, Knighton, Evington, Aylestone and Oadby, out to Loughborough, Wigston, Hinckley and Melton Mowbray. Postcodes LE1 to LE5.

## Frequently asked questions

**Do shared houses in Leicester have different window rules?**
The core rules are the same, but safe escape from bedrooms and adequate ventilation matter more in an HMO - your installer should size egress hinges and trickle vents accordingly.

**Do Leicester conservation areas restrict windows?**
Clarendon Park and Stoneygate in particular have controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Leicester?**
Typically £312 to £801 per window fitted, using the East Midlands regional factor of 0.89x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Leicester | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Leicester from vetted installers. Typical £2,670-£8,010. Free, no-obligation.',
      body: `## Whole-home double glazing in Leicester

A Highfields or Clarendon Park terrace is usually 8 to 12 tall openings including a bay. The Knighton and Oadby semis are the more uniform, quicker jobs. Doing the whole house in one visit gets you a matched finish and one set of access costs.

## Why Leicester homeowners choose us

- One itemised quote per opening so you can compare fairly
- Landlord-friendly whole-house quoting for shared terraces
- A single matched foiled finish across the whole property
- Structural check on Clarendon Park and Stoneygate bay fronts before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Leicester

Clarendon Park, Stoneygate, Knighton, Evington, Aylestone and Oadby, out to Loughborough, Wigston, Hinckley and Melton Mowbray. Postcodes LE1 to LE5.

## Frequently asked questions

**How long does a whole-house job take in Leicester?**
Two to three days for a Knighton semi, longer for a Highfields terrace with a structural bay.

**What does whole-home double glazing cost in Leicester?**
Usually £2,670 to £8,010 depending on opening count, frame material and bays, using the local 0.89x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Leicester | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Leicester from FENSA fitters. From £312 per window. Free, no-obligation.',
      body: `## Casement windows for Leicester homes

Casements are the standard replacement across the interwar semis of Knighton, Evington and Braunstone, and on the rear elevations of the Highfields and Clarendon Park terraces. A flush-sash casement holds a cleaner line on the older red-brick streets than a standard lipped frame.

## Why Leicester homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements for terrace rears where the front stays period
- Egress hinges on bedroom windows for the 450mm fire-escape rule, sized for HMO use where needed
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Leicester

Knighton, Evington, Braunstone, Clarendon Park, Stoneygate and Aylestone, plus Loughborough, Wigston, Hinckley and Melton Mowbray. Postcodes LE1 to LE5.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Leicester's Victorian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window and important in a shared house.

**How much are casement windows in Leicester?**
Around £312 to £801 per window fitted, using the local 0.89x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Leicester | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Leicester from vetted installers. Typical £1,068-£2,848. Free, no-obligation.',
      body: `## Bay window replacement in Leicester

Bays in Leicester are common on the Clarendon Park, Stoneygate and Highfields Victorian terraces and villas. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs.

## Why Leicester homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Leicester

Clarendon Park, Stoneygate, Highfields, Knighton and Evington, plus Loughborough, Wigston, Hinckley and Melton Mowbray. Postcodes LE1 to LE5.

## Frequently asked questions

**Does my Leicester Victorian bay need a steel?**
Almost certainly if it is pre-1914 - most were built without one. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Leicester?**
Typically £1,068 to £2,848 for the glazing using the local 0.89x factor, plus the structural work if needed.

**Will a new bay match a Clarendon Park street?**
It can, but the profile usually needs council sign-off first - get that in writing before manufacture.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Leicester | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Leicester from vetted fitters. From £579. Free, no-obligation.',
      body: `## uPVC doors for Leicester homes

For a Leicester terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. In the shared houses of Highfields and Clarendon Park a secure, well-sealed front and rear door with anti-snap cylinders is worth specifying.

## Why Leicester homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Secure front and rear door sets for shared and let properties
- Foiled colours matched to your existing windows and joinery
- French and patio door options for semi and terrace gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Leicester

Clarendon Park, Stoneygate, Knighton, Evington and Aylestone, out to Loughborough, Wigston, Hinckley and Melton Mowbray. Postcodes LE1 to LE5.

## Frequently asked questions

**Is a uPVC front door secure enough for Leicester?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Leicester?**
Roughly £579 to £1,602 fitted using the local 0.89x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Leicester | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Leicester. From £79. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Leicester

Where a Leicester frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Knighton, Evington and Oadby are the most common call.

## Why Leicester homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including tall Victorian-terrace sizes
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Fast turnaround for landlords with a window that will not lock

## Areas we cover around Leicester

Repairs across Knighton, Evington, Oadby, Clarendon Park and Stoneygate, plus Loughborough, Wigston, Hinckley and Melton Mowbray. Postcodes LE1 to LE5.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £79 to £267 per unit in Leicester using the local 0.89x factor.

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
