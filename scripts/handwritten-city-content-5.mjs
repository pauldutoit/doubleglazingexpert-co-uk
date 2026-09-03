#!/usr/bin/env node
/* Hand-written city content, batch 5: Southampton, Portsmouth, Brighton, Milton Keynes, Northampton.
 *   node scripts/handwritten-city-content-5.mjs --force
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyCity = args.find((a) => a.startsWith('--city='))?.split('=')[1];

const content = {
  southampton: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Southampton | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Southampton from FENSA fitters. From £368 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Southampton home

Southampton runs from the Victorian terraces of Portswood and Bevois Valley - much of it student and rental stock now - through the interwar semis of Highfield, Bassett and Bitterne to the modern dockside apartments built since 2005. The terraces have tall, non-standard openings; the interwar semis are far more uniform.

## Why Southampton homeowners choose us

- Made-to-measure frames for tall Portswood and Bevois Valley terrace openings
- Landlord-friendly quoting for the student streets - safe bedroom egress and ventilation done right
- Weather-rated units for exposed, coastal-influenced sites near the water
- Knowledge of the Old Town and Bassett Green conservation areas
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Southampton

Portswood, Highfield, Bassett, Bitterne, Shirley and Woolston, out to Eastleigh, Chandler's Ford, Totton and Hedge End. Postcodes SO14 to SO18.

## Frequently asked questions

**Do the student streets in Southampton have different rules?**
The rules are the same, but safe escape from bedrooms and adequate ventilation matter more in a shared house - your installer should size egress hinges and trickle vents accordingly.

**Do Southampton conservation areas restrict windows?**
The Old Town and a few suburban areas have controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Southampton?**
Typically £368 to £945 per window fitted, using the South East regional factor of 1.05x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Southampton | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Southampton from vetted installers. Typical £3,150-£9,450. Free, no-obligation.',
      body: `## Whole-home double glazing in Southampton

A Portswood or Shirley terrace is usually 8 to 12 openings including a bay; the Highfield and Bassett semis are more uniform. Doing the whole house in one visit gets you a matched finish and one set of access costs rather than paying twice for scaffolding.

## Why Southampton homeowners choose us

- One itemised quote per opening so you can compare fairly
- Landlord-friendly whole-house quoting for shared terraces
- A single matched foiled finish across the whole property
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Southampton

Portswood, Highfield, Bassett, Bitterne, Shirley and Woolston, out to Eastleigh, Chandler's Ford, Totton and Hedge End. Postcodes SO14 to SO18.

## Frequently asked questions

**How long does a whole-house job take in Southampton?**
Two to three days for a Highfield semi, longer for a Portswood terrace with a structural bay.

**What does whole-home double glazing cost in Southampton?**
Usually £3,150 to £9,450 depending on opening count, frame material and bays, using the local 1.05x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Southampton | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Southampton from FENSA fitters. From £368 per window. Free, no-obligation.',
      body: `## Casement windows for Southampton homes

Casements are the standard replacement across the interwar semis of Bassett, Bitterne and Sholing, and on the rear elevations of the Portswood terraces. A flush-sash casement holds a cleaner line on the older brick streets than a standard lipped frame.

## Why Southampton homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements for terrace rears where the front stays period
- Egress hinges on bedroom windows for the 450mm fire-escape rule, sized for shared-house use where needed
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Southampton

Bassett, Bitterne, Sholing, Portswood, Highfield and Shirley, plus Eastleigh, Chandler's Ford, Totton and Hedge End. Postcodes SO14 to SO18.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Southampton's Victorian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window and important in a shared house.

**How much are casement windows in Southampton?**
Around £368 to £945 per window fitted, using the local 1.05x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Southampton | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Southampton from vetted installers. Typical £1,260-£3,360. Free, no-obligation.',
      body: `## Bay window replacement in Southampton

Bays in Southampton are common on the Portswood, Bevois Valley and Highfield Victorian and Edwardian terraces. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs.

## Why Southampton homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Southampton

Portswood, Bevois Valley, Highfield, Bassett and Shirley, plus Eastleigh, Chandler's Ford, Totton and Hedge End. Postcodes SO14 to SO18.

## Frequently asked questions

**Does my Southampton Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Southampton?**
Typically £1,260 to £3,360 for the glazing using the local 1.05x factor, plus the structural work if needed.

**Will a new bay match a conservation area street?**
It can, but the profile usually needs council sign-off first - get that in writing before manufacture.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Southampton | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Southampton from vetted fitters. From £683. Free, no-obligation.',
      body: `## uPVC doors for Southampton homes

For a Southampton terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. In the shared houses of Portswood a secure, well-sealed set of doors with anti-snap cylinders is worth specifying.

## Why Southampton homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Secure door sets for shared and let properties
- Foiled colours matched to your existing windows and joinery
- French and patio door options for semi and terrace gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Southampton

Portswood, Highfield, Bassett, Bitterne and Shirley, out to Eastleigh, Chandler's Ford, Totton and Hedge End. Postcodes SO14 to SO18.

## Frequently asked questions

**Is a uPVC front door secure enough for Southampton?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Southampton?**
Roughly £683 to £1,890 fitted using the local 1.05x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Southampton | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Southampton. From £93. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Southampton

Where a Southampton frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Bitterne, Sholing and Bassett are the most common call.

## Why Southampton homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including tall Victorian-terrace sizes
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Fast turnaround for landlords with a window that will not lock

## Areas we cover around Southampton

Repairs across Bitterne, Sholing, Bassett, Portswood and Highfield, plus Eastleigh, Chandler's Ford, Totton and Hedge End. Postcodes SO14 to SO18.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £93 to £315 per unit in Southampton using the local 1.05x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  portsmouth: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Portsmouth | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Portsmouth from FENSA fitters. From £361 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Portsmouth home

Portsmouth is the most densely built city in the UK - long, tight terraced streets across Southsea, Fratton and North End on flat, exposed Portsea Island. The salt air off the Solent is hard on frames and hardware, and the terraces have tall, narrow openings rarely a stock size. Old Portsmouth and Southsea seafront are tightly controlled.

## Why Portsmouth homeowners choose us

- Made-to-measure frames for narrow, tall island terrace openings
- Marine-grade hardware and weather-rated seals for salt-laden Solent air
- Knowledge of the Old Portsmouth and Southsea conservation areas
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Portsmouth

Southsea, Fratton, North End, Cosham, Drayton and Milton, out to Fareham, Gosport, Havant and Waterlooville. Postcodes PO1, PO2, PO4, PO5 and PO6.

## Frequently asked questions

**Does the sea air affect a Portsmouth window job?**
Yes - salt corrodes cheap hardware and degrades seals faster, so marine-grade friction stays, hinges and handles are worth specifying on any weather-facing elevation.

**Do Portsmouth conservation areas restrict windows?**
Old Portsmouth and parts of Southsea have tight controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Portsmouth?**
Typically £361 to £927 per window fitted, using the South East regional factor of 1.03x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Portsmouth | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Portsmouth from vetted installers. Typical £3,090-£9,270. Free, no-obligation.',
      body: `## Whole-home double glazing in Portsmouth

A Southsea or Fratton terrace is usually 8 to 12 openings including a bay, on a street where parking and access are tight. Doing everything in one visit gets you a matched finish and one set of access costs - and the salt-air position makes consistent weather sealing across the whole house worth having.

## Why Portsmouth homeowners choose us

- One itemised quote per opening so you can compare fairly
- Access and parking for tight island streets planned up front
- Marine-grade hardware and weather sealing across every elevation
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Portsmouth

Southsea, Fratton, North End, Cosham, Drayton and Milton, out to Fareham, Gosport, Havant and Waterlooville. Postcodes PO1 to PO6.

## Frequently asked questions

**How long does a whole-house job take in Portsmouth?**
Two to four days for a terrace, with access on tight island streets adding time.

**What does whole-home double glazing cost in Portsmouth?**
Usually £3,090 to £9,270 depending on opening count, frame material and bays, using the local 1.03x cost factor.

**Is marine-grade hardware worth it across the whole house?**
On an exposed Portsea Island site, yes - it is a small premium for hardware that lasts much longer near the sea.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Portsmouth | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Portsmouth from FENSA fitters. From £361 per window. Free, no-obligation.',
      body: `## Casement windows for Portsmouth homes

Casements are the standard replacement across the interwar and postwar stock of Cosham, Paulsgrove and Drayton, and on the rear elevations of the Southsea and Fratton terraces. A flush-sash casement suits the older island streets better than a lipped frame.

## Why Portsmouth homeowners choose us

- Flush-sash and standard casements priced side by side
- Marine-grade friction stays and hardware for weather-facing elevations
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Portsmouth

Cosham, Paulsgrove, Drayton, Southsea, Fratton and North End, plus Fareham, Gosport, Havant and Waterlooville. Postcodes PO1 to PO6.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Portsmouth's Victorian streets, at roughly 10 to 15% more.

**Do casement hinges last near the sea?**
Standard ones corrode faster - ask for marine-grade friction stays on any elevation that faces the weather.

**How much are casement windows in Portsmouth?**
Around £361 to £927 per window fitted, using the local 1.03x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Portsmouth | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Portsmouth from vetted installers. Typical £1,236-£3,296. Free, no-obligation.',
      body: `## Bay window replacement in Portsmouth

Bays in Portsmouth are common on the Southsea, Fratton and North End Victorian terraces. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed - and on an exposed island elevation the lead flashing has to be robust against driving rain off the Solent.

## Why Portsmouth homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Robust lead flashing and apron detail for weather-facing island bays
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Portsmouth

Southsea, Fratton, North End, Milton and Cosham, plus Fareham, Gosport, Havant and Waterlooville. Postcodes PO1 to PO6.

## Frequently asked questions

**Does my Portsmouth Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Portsmouth?**
Typically £1,236 to £3,296 for the glazing using the local 1.03x factor, plus the structural work if needed.

**Does the exposed position affect the flashing?**
Yes - a bay facing the weather off the Solent needs a heavier lead flashing and apron detail to keep out driving rain.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Portsmouth | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Portsmouth from vetted fitters. From £670. Free, no-obligation.',
      body: `## uPVC doors for Portsmouth homes

For a Portsmouth terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. On the exposed island the door hardware needs to be marine-grade and the threshold well weathered.

## Why Portsmouth homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Marine-grade hinges and handles for salt-laden air
- Weathered thresholds for exposed island elevations
- Foiled colours matched to your existing windows and joinery
- Old door and frame removed and disposed of within the quote

## Areas we cover around Portsmouth

Southsea, Fratton, North End, Cosham and Drayton, out to Fareham, Gosport, Havant and Waterlooville. Postcodes PO1 to PO6.

## Frequently asked questions

**Is a uPVC front door secure enough for Portsmouth?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Portsmouth?**
Roughly £670 to £1,854 fitted using the local 1.03x factor, with French and sliding patio sets at the top.

**Does salt air corrode door fittings?**
It can - ask for marine-grade or stainless hinges and handles on any door that faces the weather.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Portsmouth | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Portsmouth. From £92. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Portsmouth

Where a Portsmouth frame is sound but a sealed unit has misted or a mechanism has seized, a repair costs a fraction of replacement and is usually one visit. On Portsea Island the salt air means corroded friction stays and stiff gearboxes are common calls alongside blown seals.

## Why Portsmouth homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement sealed units
- Friction stay and gearbox swaps using marine-grade parts on exposed elevations
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Portsmouth

Repairs across Southsea, Fratton, North End, Cosham and Drayton, plus Fareham, Gosport, Havant and Waterlooville. Postcodes PO1 to PO6.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £92 to £309 per unit in Portsmouth using the local 1.03x factor.

**Why do my window hinges keep seizing?**
Near the sea, salt corrosion is the usual cause - a marine-grade friction stay lasts far longer than a standard one.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  brighton: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Brighton | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Brighton & Hove from installers. From £385 per window. Free, no-obligation, no cold calls.',
      body: `## uPVC windows in Brighton - where they are allowed

Brighton and Hove has some of the finest Regency architecture in England - the stucco-fronted squares and terraces of Kemptown, Brunswick and Montpelier - and around 34 conservation areas covering most of the city. On the Regency and early-Victorian frontages a street-facing window change needs consent and timber sash is almost always required. uPVC works on the later Victorian terraces of Hanover and Preston and the interwar stock further out.

## Why Brighton homeowners choose us

- Honest guidance on where uPVC is allowed and where a Regency frontage needs timber sash
- Fitters matched to your property - later Victorian terrace or protected Regency house
- A-rated units and trickle ventilation to Building Regs on the unrestricted stock
- Weather-rated seals for an exposed south-coast position
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Brighton

Hanover, Preston Park, Fiveways, Hove, Portslade and Woodingdean, out to Worthing, Shoreham, Lewes and Newhaven. Postcodes BN1, BN2 and BN3.

## Frequently asked questions

**Can I fit uPVC windows on a Regency house in Kemptown or Brunswick?**
Almost never on the street elevation - these are strict conservation areas with many listed buildings, and timber sash to the original profile is required under Listed Building Consent. Rear elevations are sometimes more flexible.

**Where does uPVC work in Brighton?**
On the later Victorian terraces of Hanover, Elm Grove and Preston, and the interwar semis of Patcham and Woodingdean, uPVC is common and usually unrestricted.

**How much do uPVC windows cost in Brighton?**
Typically £385 to £990 per window fitted, using the South East regional factor of 1.10x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Brighton | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Brighton & Hove from vetted installers. Typical £3,300-£9,900. Free, no-obligation.',
      body: `## Whole-home double glazing in Brighton

A whole-house job in Brighton splits by area. A Hanover or Preston Park terrace is a standard 8 to 12-opening uPVC job. A Kemptown or Brunswick Regency house is a heritage project - timber sash to the original profile under Listed Building Consent for anything visible from the street.

## Why Brighton homeowners choose us

- Area-appropriate advice: uPVC for the later Victorian and interwar stock, timber for Regency frontages
- One itemised quote per opening so you can compare fairly
- Listed Building Consent requirements flagged before you commit
- Weather sealing detailed for an exposed south-coast position
- FENSA certificate registered in your name within 30 days where uPVC is used

## Areas we cover around Brighton

Hanover, Preston Park, Fiveways, Hove, Portslade and Woodingdean, out to Worthing, Shoreham, Lewes and Newhaven. Postcodes BN1 to BN3.

## Frequently asked questions

**Can a Regency Brighton house be done in uPVC?**
No - the street-facing windows must be timber sash to the original profile under Listed Building Consent. It is still worth doing, just as a heritage timber project.

**What does whole-home double glazing cost in Brighton?**
Usually £3,300 to £9,900 for uPVC on the later stock, using the local 1.10x cost factor. A timber sash job for a Regency house costs significantly more.

**How long does it take?**
Two to four days for a Victorian terrace; a heritage sash project is longer and often phased.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Brighton | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Brighton & Hove from installers. From £385 per window. Free, no-obligation.',
      body: `## Casement windows for Brighton homes

Casements are the standard replacement across the interwar semis of Patcham, Woodingdean and Saltdean, and on the rear elevations of the Hanover and Elm Grove terraces. On the Regency and early-Victorian stock the original and required style is vertical sash, so casements suit the later and unrestricted stock.

## Why Brighton homeowners choose us

- Casements for the later Victorian and interwar stock where the style allows it
- Flush-sash option for a cleaner line on older streets
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Weather-rated seals for an exposed south-coast position
- Multi-point locking and internal beading as standard

## Areas we cover around Brighton

Patcham, Woodingdean, Saltdean, Hanover, Elm Grove and Portslade, plus Worthing, Shoreham, Lewes and Newhaven. Postcodes BN1 to BN3.

## Frequently asked questions

**Should a Regency Brighton house have casements?**
No - the required style there is vertical sash. Casements suit the later Victorian terraces and interwar semis.

**What is a flush casement window?**
One where the sash closes level with the frame - a cleaner line, at roughly 10 to 15% over a standard casement.

**How much are casement windows in Brighton?**
Around £385 to £990 per window fitted for the unrestricted stock, using the local 1.10x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Brighton | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Brighton & Hove from vetted installers. Typical £1,320-£3,520. Free, no-obligation.',
      body: `## Bay window replacement in Brighton

Bays in Brighton are common on the later Victorian terraces of Preston Park, Fiveways and Hove, and on some Regency frontages as a full-height bow. The Victorian bays were often built without a full structural beam, so a steel or reinforced lintel is usually needed; a Regency bow on a listed frontage must be timber and consented.

## Why Brighton homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so a Victorian bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Timber bow-window specialists where a Regency frontage requires it
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Brighton

Preston Park, Fiveways, Hove, Hanover and Portslade, plus Worthing, Shoreham, Lewes and Newhaven. Postcodes BN1 to BN3.

## Frequently asked questions

**Does my Brighton Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**Can a Regency bow window be uPVC?**
No - on a listed Regency frontage it must be timber to the original profile under Listed Building Consent.

**How much does a bay window cost in Brighton?**
Typically £1,320 to £3,520 for the glazing using the local 1.10x factor, plus the structural work if needed.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Brighton | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Brighton & Hove from vetted fitters. From £715. Free, no-obligation.',
      body: `## uPVC doors for Brighton homes

For a Brighton terrace or semi in the unrestricted areas, uPVC handles back, side and garden doors well and is a budget option for the front. On the Regency and early-Victorian frontages a street-facing door usually has to stay timber under conservation or listed rules.

## Why Brighton homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Weather-rated doors and seals for an exposed south-coast position
- Foiled colours matched to your existing windows and joinery
- Clear guidance on where a street-facing door must remain timber
- Old door and frame removed and disposed of within the quote

## Areas we cover around Brighton

Hanover, Preston Park, Fiveways, Hove and Portslade, out to Worthing, Shoreham, Lewes and Newhaven. Postcodes BN1 to BN3.

## Frequently asked questions

**Can a Kemptown or Brunswick front door be uPVC?**
Usually not - a street-facing door on a listed or conservation-area Regency property has to stay timber. Rear and garden doors are more flexible.

**Is a uPVC front door secure enough for Brighton?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Brighton?**
Roughly £715 to £1,980 fitted using the local 1.10x factor, with French and sliding patio sets at the top.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Brighton | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Brighton & Hove. From £98. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Brighton

Where a Brighton frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. On the exposed south coast, salt and wind speed up blown seals and wear friction hinges. For the Regency stock, the equivalent job is refurbishing and draught-proofing the original timber sash.

## Why Brighton homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units for the later uPVC stock
- Friction stay and gearbox swaps, marine-grade where exposed
- Timber sash refurbishment specialists for listed and Regency frontages
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Brighton

Repairs across Patcham, Woodingdean, Hanover, Preston Park and Hove, plus Worthing, Shoreham, Lewes and Newhaven. Postcodes BN1 to BN3.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £98 to £330 per unit in Brighton using the local 1.10x factor.

**Can you repair a Regency sash rather than replace it?**
Usually, yes - and on a listed frontage, refurbishment with draught-proofing and slim glazing is often the only consented option as well as the cheaper one.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  'milton-keynes': {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Milton Keynes | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Milton Keynes from FENSA fitters. From £378 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Milton Keynes home

Milton Keynes was founded as a New Town in 1967, so almost the entire city is 1970s and 1980s housing - grid-square estates, cul-de-sacs, brick and timber-frame semis, often with large picture windows and patio doors. Much of that original glazing is now at the end of its life. The pre-New-Town villages of Stony Stratford, Wolverton and Woburn Sands are the exceptions.

## Why Milton Keynes homeowners choose us

- Fitters who know the standard 1970s and 1980s estate house types and their large window openings
- Timber-frame construction handled correctly where the house is not traditional masonry
- Easy access and parking on the grid-road estates factored in
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Milton Keynes

Bletchley, Wolverton, Stony Stratford, Woburn Sands, Newport Pagnell and Central Milton Keynes, out to Bedford, Buckingham, Leighton Buzzard and Bicester. Postcodes MK1 to MK4 and MK9.

## Frequently asked questions

**My MK house is timber-framed - can it still have uPVC windows?**
Yes, but the fixing method is different - the frame is fixed back to the timber structure, not just the outer brick skin. A fitter who knows the local house types will do this correctly.

**Are there conservation areas in Milton Keynes?**
Nine, all in the pre-New-Town villages - Stony Stratford, Newport Pagnell and Woburn Sands. The rest of the city has no such constraints.

**How much do uPVC windows cost in Milton Keynes?**
Typically £378 to £972 per window fitted, using the South East regional factor of 1.08x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Milton Keynes | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Milton Keynes from vetted installers. Typical £3,240-£9,720. Free, no-obligation.',
      body: `## Whole-home double glazing in Milton Keynes

A standard MK estate house is usually 9 to 13 openings including large picture windows and a patio door - uniform, well-documented house types make whole-house pricing predictable. Access is easy on the grid roads. Doing everything in one visit gets you a matched finish.

## Why Milton Keynes homeowners choose us

- One itemised quote per opening so you can compare fairly
- Predictable pricing on the standard 1970s and 1980s house types
- Timber-frame fixing done correctly where the house is not masonry
- Patio and picture-window openings sized and structurally checked
- FENSA certificate registered in your name within 30 days

## Areas we cover around Milton Keynes

Bletchley, Wolverton, Stony Stratford, Woburn Sands, Newport Pagnell and Central Milton Keynes, out to Bedford, Buckingham, Leighton Buzzard and Bicester. Postcodes MK1 to MK9.

## Frequently asked questions

**How long does a whole-house job take in Milton Keynes?**
Two to three days for a standard estate house - the uniform house types and easy grid-road access keep it predictable.

**What does whole-home double glazing cost in Milton Keynes?**
Usually £3,240 to £9,720 depending on opening count, how many large picture windows and patio doors, using the local 1.08x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Milton Keynes | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Milton Keynes from FENSA fitters. From £378 per window. Free, no-obligation.',
      body: `## Casement windows for Milton Keynes homes

Casements are the default across MK's 1970s and 1980s estates in Bletchley, Furzton, Bradwell Common and Shenley. The original windows were often large casements or fixed picture panes with a side opener, and many are now failing. A modern uPVC casement is a like-for-like replacement.

## Why Milton Keynes homeowners choose us

- Large-format casements sized to the original estate window openings
- Timber-frame fixing done correctly where the house is not masonry
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Milton Keynes

Bletchley, Furzton, Bradwell Common, Shenley, Wolverton and Newport Pagnell, plus Bedford, Buckingham, Leighton Buzzard and Bicester. Postcodes MK1 to MK9.

## Frequently asked questions

**Can you replace a large fixed picture window with an opening casement?**
Yes - a fixed pane can be swapped for a casement or a fixed light with a side opener, subject to keeping enough clear opening for ventilation and escape.

**What is a flush casement window?**
One where the sash closes level with the frame - a cleaner line, at roughly 10 to 15% over a standard casement.

**How much are casement windows in Milton Keynes?**
Around £378 to £972 per window fitted, using the local 1.08x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Milton Keynes | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Milton Keynes from vetted installers. Typical £1,296-£3,456. Free, no-obligation.',
      body: `## Bay window replacement in Milton Keynes

Bays in Milton Keynes are mostly on the 1980s and later executive estates and the older houses in Stony Stratford and Newport Pagnell. The MK-era bays usually have a modern lintel already, so full structural steel is needed less often than on a Victorian bay - but a survey still confirms it, and timber-frame houses need the bay tied back correctly.

## Why Milton Keynes homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Correct tie-back to the structure on timber-frame houses
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Milton Keynes

Stony Stratford, Newport Pagnell, Woburn Sands, Bletchley and Shenley, plus Bedford, Buckingham, Leighton Buzzard and Bicester. Postcodes MK1 to MK9.

## Frequently asked questions

**Does an MK-era bay need a steel beam?**
Often not - houses from the 1970s onward usually have a modern lintel. A survey confirms whether the existing support is adequate.

**How much does a bay window cost in Milton Keynes?**
Typically £1,296 to £3,456 for the glazing using the local 1.08x factor, plus structural work if the survey calls for it.

**Do timber-frame bays need special work?**
The bay has to be tied back to the timber structure correctly - a fitter who knows ML house types will handle this.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Milton Keynes | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Milton Keynes from vetted fitters. From £702. Free, no-obligation.',
      body: `## uPVC doors for Milton Keynes homes

MK estate houses almost all have a patio door onto the garden as standard, and after 30 to 40 years many of the original units are draughty or sticking. uPVC French and sliding patio doors are a straightforward, well-priced replacement. uPVC also handles front and back doors well.

## Why Milton Keynes homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Direct replacement of tired 1980s patio doors with modern uPVC sliders or French sets
- Timber-frame fixing done correctly where the house is not masonry
- Foiled colours matched to your existing windows and joinery
- Old door and frame removed and disposed of within the quote

## Areas we cover around Milton Keynes

Bletchley, Furzton, Shenley, Wolverton and Newport Pagnell, out to Bedford, Buckingham, Leighton Buzzard and Bicester. Postcodes MK1 to MK9.

## Frequently asked questions

**Can you replace an old 1980s patio door like for like?**
Usually, yes - a modern uPVC slider or a French door set fits the same opening, with better sealing, locking and glazing.

**Is a uPVC front door secure enough for Milton Keynes?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Milton Keynes?**
Roughly £702 to £1,944 fitted using the local 1.08x factor, with French and sliding patio sets at the top.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Milton Keynes | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Milton Keynes. From £96. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Milton Keynes

Much of MK's original glazing is 1970s and 1980s and now well past its design life, so blown sealed units and worn patio-door rollers are common calls. Where the frame is sound, a repair is a fraction of replacement and usually one visit.

## Why Milton Keynes homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units for large estate-house window openings
- Patio-door roller, track and gearbox swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Milton Keynes

Repairs across Bletchley, Furzton, Bradwell Common, Shenley and Wolverton, plus Bedford, Buckingham, Leighton Buzzard and Bicester. Postcodes MK1 to MK9.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £96 to £324 per unit in Milton Keynes using the local 1.08x factor.

**My patio door drags along the track - is that repairable?**
Usually, yes - worn rollers and a cleaned or replaced track will often bring an old slider back to smooth operation without a full replacement.

**How quickly can you come out?**
Same week for most repairs; sooner for a door or window that will not lock or close.`,
    },
  },

  northampton: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Northampton | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Northampton from FENSA fitters. From £322 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Northampton home

Northampton grew on the shoe trade, and the Victorian terraces of Semilong, St James and Kingsley were built for shoe workers - compact, red-brick, tall narrow openings. Around them sit Edwardian villas in Abington and Kingsthorpe and large postwar overspill estates. The Boot and Shoe Quarter is a conservation area.

## Why Northampton homeowners choose us

- Made-to-measure frames for the compact shoe-worker terrace openings
- Knowledge of the Boot and Shoe Quarter and Abington conservation areas
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- Foiled finishes to suit red-brick streets, as well as white
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Northampton

Abington, Kingsley, Kingsthorpe, Weston Favell, Duston and Far Cotton, out to Wellingborough, Kettering, Daventry and Towcester. Postcodes NN1 to NN5.

## Frequently asked questions

**Do Northampton conservation areas restrict windows?**
Around 22 conservation areas including the Boot and Shoe Quarter and Abington have controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Northampton?**
Typically £322 to £828 per window fitted, using the East Midlands regional factor of 0.92x the national average.

**Are shoe-worker terrace openings a standard size?**
Rarely - they were built small and to no fixed pattern, so made-to-measure frames are the norm.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Northampton | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Northampton from vetted installers. Typical £2,760-£8,280. Free, no-obligation.',
      body: `## Whole-home double glazing in Northampton

A Semilong or St James shoe-worker terrace is often a compact 6 to 9-opening job; the Abington and Kingsthorpe villas and the postwar estates are larger. Doing the whole house in one visit gets you a matched finish and one set of access costs.

## Why Northampton homeowners choose us

- One itemised quote per opening so you can compare fairly
- A single matched foiled finish across the whole property
- Structural check on any Abington bay before glass is ordered
- Access and scaffolding for terraced streets priced up front
- FENSA certificate registered in your name within 30 days

## Areas we cover around Northampton

Abington, Kingsley, Kingsthorpe, Weston Favell, Duston and Far Cotton, out to Wellingborough, Kettering, Daventry and Towcester. Postcodes NN1 to NN5.

## Frequently asked questions

**How long does a whole-house job take in Northampton?**
Two to three days for a shoe-worker terrace, longer for an Abington villa with a structural bay.

**What does whole-home double glazing cost in Northampton?**
Usually £2,760 to £8,280 depending on opening count, frame material and bays, using the local 0.92x cost factor.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Northampton | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Northampton from FENSA fitters. From £322 per window. Free, no-obligation.',
      body: `## Casement windows for Northampton homes

Casements are the standard replacement across the postwar estates of Kingsthorpe, Weston Favell and Duston, and on the small openings of the shoe-worker terraces. A flush-sash casement suits the older red-brick streets of Abington better than a lipped frame.

## Why Northampton homeowners choose us

- Flush-sash and standard casements priced side by side
- Small-opening casements sized to shoe-worker terrace windows
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Northampton

Kingsthorpe, Weston Favell, Duston, Abington, Kingsley and Far Cotton, plus Wellingborough, Kettering, Daventry and Towcester. Postcodes NN1 to NN5.

## Frequently asked questions

**Can a small terrace window meet fire-escape rules?**
Not always from a standard casement - the clear opening must be at least 450mm x 450mm and 0.33 square metres. Your installer should check each bedroom window.

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Northampton's Victorian streets, at roughly 10 to 15% more.

**How much are casement windows in Northampton?**
Around £322 to £828 per window fitted, using the local 0.92x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Northampton | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Northampton from vetted installers. Typical £1,104-£2,944. Free, no-obligation.',
      body: `## Bay window replacement in Northampton

Bays in Northampton are common on the Edwardian villas of Abington, Kingsthorpe and the Billing Road area. Pre-1914 bays were often built without a full structural beam, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs.

## Why Northampton homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Northampton

Abington, Kingsthorpe, Billing Road, Kingsley and Weston Favell, plus Wellingborough, Kettering, Daventry and Towcester. Postcodes NN1 to NN5.

## Frequently asked questions

**Does my Northampton Edwardian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Northampton?**
Typically £1,104 to £2,944 for the glazing using the local 0.92x factor, plus the structural work if needed.

**Can you keep the internal window seat?**
Usually yes - the frame is replaced around the existing seat and reveal, with making-good where they have to be disturbed.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Northampton | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Northampton from vetted fitters. From £598. Free, no-obligation.',
      body: `## uPVC doors for Northampton homes

For a Northampton terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. On a shoe-worker terrace the front door often opens straight onto the street, so a good compression seal and a weathered threshold matter.

## Why Northampton homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Draught-sealed thresholds for front doors that open onto the street
- Foiled colours matched to your existing windows and joinery
- French and patio door options for semi and terrace gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Northampton

Abington, Kingsley, Kingsthorpe, Weston Favell and Duston, out to Wellingborough, Kettering, Daventry and Towcester. Postcodes NN1 to NN5.

## Frequently asked questions

**Is a uPVC front door secure enough for Northampton?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Northampton?**
Roughly £598 to £1,656 fitted using the local 0.92x factor, with French and sliding patio sets at the top.

**Can you improve draughts on a street-facing front door?**
Yes - a compression-seal uPVC door with a weathered threshold is a big step up from an old timber door opening straight onto the pavement.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Northampton | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Northampton. From £82. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Northampton

Where a Northampton frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Kingsthorpe, Weston Favell and Duston are the most common call.

## Why Northampton homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units for small shoe-worker terrace openings
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Northampton

Repairs across Kingsthorpe, Weston Favell, Duston, Abington and Kingsley, plus Wellingborough, Kettering, Daventry and Towcester. Postcodes NN1 to NN5.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £82 to £276 per unit in Northampton using the local 0.92x factor.

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
