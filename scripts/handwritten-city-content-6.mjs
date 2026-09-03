#!/usr/bin/env node
/* Hand-written city content, batch 6 (completes top 30): Norwich, Luton, Reading, Chelmsford, Sunderland.
 *   node scripts/handwritten-city-content-6.mjs --force
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyCity = args.find((a) => a.startsWith('--city='))?.split('=')[1];

const content = {
  norwich: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Norwich | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Norwich from FENSA fitters. From £319 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Norwich home

Norwich has one of the highest concentrations of listed buildings in England outside London - the medieval and Georgian core inside the old city walls is almost entirely protected. Most window work happens outside that, on the Victorian terraces of the Golden Triangle and Thorpe Hamlet and the interwar semis around Eaton and Hellesdon.

## Why Norwich homeowners choose us

- Clear guidance on where the walled centre requires timber and consent
- Fitters who know the Golden Triangle terrace openings between Unthank Road and Newmarket Road
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- Foiled finishes to suit Norwich brick and rendered streets, as well as white
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Norwich

Golden Triangle, Thorpe St Andrew, Eaton, Heigham, Hellesdon and Sprowston, out to Wymondham, Diss, Aylsham and North Walsham. Postcodes NR1 to NR4 and NR6.

## Frequently asked questions

**Can I fit uPVC windows in central Norwich?**
Inside the old walls, usually not on the street elevation - the historic centre is a large conservation area with a very high density of listed buildings, and timber is normally required. Check with the council first.

**Is the Golden Triangle restricted?**
Parts are covered by conservation controls on street-facing frames - check your specific street before ordering.

**How much do uPVC windows cost in Norwich?**
Typically £319 to £819 per window fitted, using the East of England regional factor of 0.91x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Norwich | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Norwich from vetted installers. Typical £2,730-£8,190. Free, no-obligation.',
      body: `## Whole-home double glazing in Norwich

A Golden Triangle or Thorpe Hamlet terrace is usually 8 to 12 openings including a bay; the Eaton and Cringleford semis are more uniform. Doing everything in one visit gets you a matched finish and one set of access costs.

## Why Norwich homeowners choose us

- One itemised quote per opening so you can compare fairly
- Mixed-material projects handled where a central-Norwich elevation must stay timber
- A single matched foiled finish across the property where uPVC is used
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Norwich

Golden Triangle, Thorpe St Andrew, Eaton, Heigham, Hellesdon and Sprowston, out to Wymondham, Diss, Aylsham and North Walsham. Postcodes NR1 to NR6.

## Frequently asked questions

**Can a house in the Norwich walled centre be done in uPVC?**
Often not - a listed or conservation-area property there usually needs timber on the street elevation, making it a mixed-material job.

**What does whole-home double glazing cost in Norwich?**
Usually £2,730 to £8,190 for uPVC, using the local 0.91x cost factor. A part-timber conservation job costs more.

**How long does it take?**
Two to four days for a terrace, longer where a structural bay is involved.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Norwich | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Norwich from FENSA fitters. From £319 per window. Free, no-obligation.',
      body: `## Casement windows for Norwich homes

Casements are the standard replacement across the interwar semis of Eaton, Hellesdon and Thorpe St Andrew, and on the rear elevations of the Golden Triangle terraces. A flush-sash casement holds a cleaner line on the older streets than a standard lipped frame.

## Why Norwich homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements for terrace rears where the front stays period
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Norwich

Eaton, Hellesdon, Thorpe St Andrew, Heigham and Sprowston, plus Wymondham, Diss, Aylsham and North Walsham. Postcodes NR1 to NR6.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Norwich's Victorian streets, at roughly 10 to 15% more.

**Can casements meet bedroom fire-escape rules?**
Yes, with the right hinge - a clear opening of at least 450mm x 450mm and 0.33 square metres, confirmed per window.

**How much are casement windows in Norwich?**
Around £319 to £819 per window fitted, using the local 0.91x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Norwich | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Norwich from vetted installers. Typical £1,092-£2,912. Free, no-obligation.',
      body: `## Bay window replacement in Norwich

Bays in Norwich are common on the Golden Triangle and Thorpe Hamlet Victorian terraces and villas. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs.

## Why Norwich homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Norwich

Golden Triangle, Thorpe Hamlet, Eaton, Heigham and Sprowston, plus Wymondham, Diss, Aylsham and North Walsham. Postcodes NR1 to NR6.

## Frequently asked questions

**Does my Norwich Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Norwich?**
Typically £1,092 to £2,912 for the glazing using the local 0.91x factor, plus the structural work if needed.

**Will a new bay match a Golden Triangle street?**
It can, but the profile usually needs council sign-off first - get that in writing before manufacture.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Norwich | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Norwich from vetted fitters. From £592. Free, no-obligation.',
      body: `## uPVC doors for Norwich homes

For a Norwich terrace or semi outside the walled centre, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. A uPVC French or patio door onto a Golden Triangle courtyard or an Eaton garden costs far less than aluminium.

## Why Norwich homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Foiled colours matched to your existing windows and joinery
- French and patio door options for terrace courtyards and suburban gardens
- Clear on where a central-Norwich street door must remain timber
- Old door and frame removed and disposed of within the quote

## Areas we cover around Norwich

Golden Triangle, Thorpe St Andrew, Eaton, Heigham and Sprowston, out to Wymondham, Diss, Aylsham and North Walsham. Postcodes NR1 to NR6.

## Frequently asked questions

**Is a uPVC front door secure enough for Norwich?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Norwich?**
Roughly £592 to £1,638 fitted using the local 0.91x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Norwich | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Norwich. From £81. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Norwich

Where a Norwich frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Eaton, Hellesdon and Sprowston are the most common call.

## Why Norwich homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including tall Golden Triangle terrace sizes
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Timber sash repair specialists for the listed walled-centre stock

## Areas we cover around Norwich

Repairs across Eaton, Hellesdon, Sprowston, Golden Triangle and Thorpe St Andrew, plus Wymondham, Diss, Aylsham and North Walsham. Postcodes NR1 to NR6.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £81 to £273 per unit in Norwich using the local 0.91x factor.

**Blown seal or condensation?**
A blown seal mists permanently between the panes and can't be wiped. Room-side condensation is a ventilation problem, not a glazing fault.

**Can you repair a listed timber sash in the city centre?**
Often, yes - draught-proofing and slim glazing in a refurbished sash is frequently the compliant and cheaper route on a listed property.`,
    },
  },

  luton: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Luton | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Luton from FENSA fitters. From £371 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Luton home

Luton grew on the hat trade and then the Vauxhall car works, and the housing reflects both - Victorian and Edwardian terraces near the town centre and High Town, interwar semis in Stopsley and Round Green, and postwar estates in Farley Hill and Lewsey. Parts of the town sit under the airport flightpath, where acoustic glazing is worth considering.

## Why Luton homeowners choose us

- Acoustic laminated glazing options for homes under the flightpath
- Made-to-measure frames for High Town and town-centre terrace openings
- Knowledge of the Wardown Park and other conservation areas
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Luton

Stopsley, Round Green, Wardown, High Town, Bushmead and Leagrave, out to Dunstable, Houghton Regis, Harpenden and Hitchin. Postcodes LU1 to LU4.

## Frequently asked questions

**Does acoustic glazing help with aircraft noise in Luton?**
It can - a laminated acoustic pane in a well-sealed uPVC frame noticeably cuts aircraft and traffic noise compared with an old single-glazed or first-generation double-glazed window. Ask for the acoustic rating, not just the U-value.

**Do Luton conservation areas restrict windows?**
Around 7 conservation areas including Wardown Park have controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Luton?**
Typically £371 to £954 per window fitted, using the East of England regional factor of 1.06x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Luton | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Luton from vetted installers. Typical £3,180-£9,540. Free, no-obligation.',
      body: `## Whole-home double glazing in Luton

A High Town or town-centre terrace is usually 8 to 12 openings including a bay; the Stopsley and Round Green semis are more uniform. For homes under the flightpath, doing the whole house at once with acoustic glazing throughout gives the biggest noise reduction.

## Why Luton homeowners choose us

- One itemised quote per opening so you can compare fairly
- Acoustic glazing specified across the whole house for flightpath properties
- A single matched foiled finish across the property
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Luton

Stopsley, Round Green, Wardown, High Town, Bushmead and Leagrave, out to Dunstable, Houghton Regis, Harpenden and Hitchin. Postcodes LU1 to LU4.

## Frequently asked questions

**Is it worth doing the whole house for noise?**
For a flightpath property, yes - noise finds the weakest window, so acoustic glazing only on a couple of rooms leaves the rest exposed.

**What does whole-home double glazing cost in Luton?**
Usually £3,180 to £9,540 depending on opening count, frame material and whether acoustic glazing is specified, using the local 1.06x cost factor.

**How long does it take?**
Two to four days for a terrace, longer where a structural bay is involved.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Luton | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Luton from FENSA fitters. From £371 per window. Free, no-obligation.',
      body: `## Casement windows for Luton homes

Casements are the standard replacement across the interwar semis of Stopsley, Round Green and Icknield, and on the rear elevations of the High Town terraces. Acoustic laminated glass can be specified in a casement unit for homes near the airport or the main roads.

## Why Luton homeowners choose us

- Flush-sash and standard casements priced side by side
- Acoustic laminated glazing available in any casement unit
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Luton

Stopsley, Round Green, Icknield, High Town, Bushmead and Leagrave, plus Dunstable, Houghton Regis, Harpenden and Hitchin. Postcodes LU1 to LU4.

## Frequently asked questions

**Can a casement window have acoustic glass?**
Yes - a laminated acoustic pane fits a standard casement sealed unit and cuts noise from aircraft and traffic. Ask for the dB rating.

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Luton's Victorian streets, at roughly 10 to 15% more.

**How much are casement windows in Luton?**
Around £371 to £954 per window fitted, using the local 1.06x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Luton | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Luton from vetted installers. Typical £1,272-£3,392. Free, no-obligation.',
      body: `## Bay window replacement in Luton

Bays in Luton are common on the Edwardian terraces of High Town and the villas around Wardown Park. Pre-1914 bays were often built without a full structural beam, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs.

## Why Luton homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Acoustic laminated glazing available in the bay for flightpath homes
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Luton

High Town, Wardown, Round Green, Stopsley and Bushmead, plus Dunstable, Houghton Regis, Harpenden and Hitchin. Postcodes LU1 to LU4.

## Frequently asked questions

**Does my Luton Edwardian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Luton?**
Typically £1,272 to £3,392 for the glazing using the local 1.06x factor, plus the structural work if needed.

**Can the bay have acoustic glass?**
Yes - a large bay facing the flightpath or a main road benefits from laminated acoustic panes.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Luton | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Luton from vetted fitters. From £689. Free, no-obligation.',
      body: `## uPVC doors for Luton homes

For a Luton terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. Composite doors with an acoustic core are worth considering for a street-facing door on a busy road or under the flightpath.

## Why Luton homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Acoustic-core and laminated-glazed door options for noisy locations
- Foiled colours matched to your existing windows and joinery
- French and patio door options for semi and terrace gardens
- Old door and frame removed and disposed of within the quote

## Areas we cover around Luton

Stopsley, Round Green, Wardown, High Town and Leagrave, out to Dunstable, Houghton Regis, Harpenden and Hitchin. Postcodes LU1 to LU4.

## Frequently asked questions

**Is a uPVC front door secure enough for Luton?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Luton?**
Roughly £689 to £1,908 fitted using the local 1.06x factor, with French and sliding patio sets at the top.

**Does a solid door help with noise?**
A composite door with a dense core and laminated glazing cuts noise noticeably compared with a hollow or single-glazed door.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Luton | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Luton. From £94. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Luton

Where a Luton frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Stopsley, Round Green and Leagrave are the most common call.

## Why Luton homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including acoustic laminated glass on a like-for-like basis
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Luton

Repairs across Stopsley, Round Green, Leagrave, High Town and Bushmead, plus Dunstable, Houghton Regis, Harpenden and Hitchin. Postcodes LU1 to LU4.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £94 to £318 per unit in Luton using the local 1.06x factor.

**Can you upgrade a plain misted unit to acoustic glass?**
Yes - if you are replacing a blown unit anyway, specifying a laminated acoustic pane for the same frame is a small extra for a useful noise reduction.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  reading: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Reading | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Reading from FENSA fitters. From £392 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Reading home

Reading is a busy commuter town with a dense core of Victorian terraces in Newtown, Katesgrove and east Reading - much of it rental and HMO stock near the station and the university. Around that sit the interwar semis of Caversham, Tilehurst and Woodley. Homes near the Great Western main line often want acoustic glazing.

## Why Reading homeowners choose us

- Acoustic laminated glazing options for homes near the main line and the IDR
- Landlord-friendly quoting for the Newtown and east Reading HMO streets
- Made-to-measure frames for tall Victorian terrace openings
- Knowledge of the Caversham and central Reading conservation areas
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Reading

Caversham, Tilehurst, Earley, Woodley, Newtown and Whitley, out to Wokingham, Bracknell, Henley and Twyford. Postcodes RG1, RG2, RG4, RG6 and RG30.

## Frequently asked questions

**Does acoustic glazing help near the Reading main line?**
Yes - a laminated acoustic pane in a well-sealed uPVC frame noticeably cuts rail and road noise. Ask for the acoustic (dB) rating, not just the U-value.

**Do the HMO streets in Reading have different rules?**
The core rules are the same, but safe bedroom escape and ventilation matter more in a shared house - egress hinges and trickle vents should be sized accordingly.

**How much do uPVC windows cost in Reading?**
Typically £392 to £1,008 per window fitted, using the South East regional factor of 1.12x - among the highest in the country.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Reading | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Reading from vetted installers. Typical £3,360-£10,080. Free, no-obligation.',
      body: `## Whole-home double glazing in Reading

A Newtown or east Reading terrace is usually 8 to 12 openings including a bay; the Caversham and Tilehurst semis are more uniform. For homes near the main line, doing the whole house at once with acoustic glazing throughout gives the biggest noise reduction.

## Why Reading homeowners choose us

- One itemised quote per opening so you can compare fairly
- Acoustic glazing specified across the whole house for main-line properties
- Landlord-friendly whole-house quoting for shared terraces
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Reading

Caversham, Tilehurst, Earley, Woodley, Newtown and Whitley, out to Wokingham, Bracknell, Henley and Twyford. Postcodes RG1 to RG30.

## Frequently asked questions

**What does whole-home double glazing cost in Reading?**
Usually £3,360 to £10,080 depending on opening count, frame material and whether acoustic glazing is specified, using the local 1.12x cost factor.

**Is it worth doing the whole house for rail noise?**
Yes - noise finds the weakest window, so acoustic glazing on just a room or two leaves the rest exposed.

**How long does it take?**
Two to four days for a terrace, longer where a structural bay is involved.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Reading | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Reading from FENSA fitters. From £392 per window. Free, no-obligation.',
      body: `## Casement windows for Reading homes

Casements are the standard replacement across the interwar semis of Caversham, Tilehurst and Woodley, and on the rear elevations of the Newtown and east Reading terraces. Acoustic laminated glass can be specified in any casement unit for homes near the railway or the IDR.

## Why Reading homeowners choose us

- Flush-sash and standard casements priced side by side
- Acoustic laminated glazing available in any casement unit
- Egress hinges on bedroom windows for the 450mm fire-escape rule, sized for HMO use where needed
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Reading

Caversham, Tilehurst, Earley, Woodley, Newtown and Whitley, plus Wokingham, Bracknell, Henley and Twyford. Postcodes RG1 to RG30.

## Frequently asked questions

**Can a casement window have acoustic glass?**
Yes - a laminated acoustic pane fits a standard casement sealed unit and cuts rail and road noise. Ask for the dB rating.

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Reading's Victorian streets, at roughly 10 to 15% more.

**How much are casement windows in Reading?**
Around £392 to £1,008 per window fitted, using the local 1.12x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Reading | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Reading from vetted installers. Typical £1,344-£3,584. Free, no-obligation.',
      body: `## Bay window replacement in Reading

Bays in Reading are common on the Newtown, east Reading and Caversham Victorian and Edwardian terraces. Pre-1914 bays were often built without a full structural beam, so a steel or reinforced lintel is usually needed above the bay to meet current Building Regs.

## Why Reading homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Acoustic laminated glazing available in the bay for main-line homes
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Reading

Newtown, east Reading, Caversham, Tilehurst and Earley, plus Wokingham, Bracknell, Henley and Twyford. Postcodes RG1 to RG30.

## Frequently asked questions

**Does my Reading Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Reading?**
Typically £1,344 to £3,584 for the glazing using the local 1.12x factor, plus the structural work if needed.

**Can the bay have acoustic glass?**
Yes - a large bay facing the railway or a main road benefits from laminated acoustic panes.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Reading | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Reading from vetted fitters. From £728. Free, no-obligation.',
      body: `## uPVC doors for Reading homes

For a Reading terrace or semi, uPVC is the sensible choice for back, side and garden doors, and a budget option for the front. In the Newtown and east Reading HMO streets a secure, well-sealed set of doors with anti-snap cylinders is worth specifying.

## Why Reading homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Secure door sets for shared and let properties
- Acoustic-core door options for homes near the main line
- Foiled colours matched to your existing windows and joinery
- Old door and frame removed and disposed of within the quote

## Areas we cover around Reading

Caversham, Tilehurst, Earley, Woodley and Newtown, out to Wokingham, Bracknell, Henley and Twyford. Postcodes RG1 to RG30.

## Frequently asked questions

**Is a uPVC front door secure enough for Reading?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Reading?**
Roughly £728 to £2,016 fitted using the local 1.12x factor, with French and sliding patio sets at the top.

**Can you fit a patio door where the back door is now?**
Sometimes as-is, but widening for a patio set usually needs a lintel. A site check confirms it.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Reading | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Reading. From £100. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Reading

Where a Reading frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. Blown seals on the 1990s and 2000s uPVC across Caversham, Tilehurst and Woodley are the most common call.

## Why Reading homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, with an option to upgrade to acoustic laminated glass
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Fast turnaround for landlords with a window that will not lock

## Areas we cover around Reading

Repairs across Caversham, Tilehurst, Earley, Woodley and Newtown, plus Wokingham, Bracknell, Henley and Twyford. Postcodes RG1 to RG30.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £100 to £336 per unit in Reading using the local 1.12x factor.

**Can you upgrade a blown unit to acoustic glass?**
Yes - if you are replacing the unit anyway, a laminated acoustic pane in the same frame is a small extra for a useful noise reduction.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  chelmsford: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Chelmsford | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Chelmsford from FENSA fitters. From £368 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Chelmsford home

Chelmsford runs from the Victorian and Edwardian terraces of Moulsham and the Marconi-era workers' housing near the old radio factory, through interwar semis in Springfield and Broomfield, to the large 2000s new-build districts of Beaulieu Park and Chancellor Park. The new-build stock is already double-glazed but much of it is now reaching the end of its original builder-spec life.

## Why Chelmsford homeowners choose us

- Replacement of tired builder-spec units in Beaulieu Park and Chancellor Park with better-performing frames
- Made-to-measure frames for Moulsham and Marconi-era terrace openings
- Knowledge of the Cathedral and Moulsham Street conservation areas
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Chelmsford

Moulsham, Springfield, Broomfield, Great Baddow, Writtle and Galleywood, out to Colchester, Braintree, Witham and Billericay. Postcodes CM1 to CM4.

## Frequently asked questions

**My Beaulieu Park house is only 15 years old - why replace the windows?**
Volume builder-spec units often use thinner profiles and lower-grade sealed units than a quality replacement, so failed seals, draughts and poor thermal performance are common by 12 to 20 years. A better-grade uPVC window is a worthwhile upgrade.

**Do Chelmsford conservation areas restrict windows?**
Around 15 conservation areas including the Cathedral area and Moulsham Street have controls on street-facing frames - check with the council before ordering.

**How much do uPVC windows cost in Chelmsford?**
Typically £368 to £945 per window fitted, using the East of England regional factor of 1.05x the national average.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Chelmsford | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Chelmsford from vetted installers. Typical £3,150-£9,450. Free, no-obligation.',
      body: `## Whole-home double glazing in Chelmsford

A Moulsham terrace is usually 8 to 12 openings including a bay; the Springfield and Broomfield semis are more uniform; and the Beaulieu Park new-builds are often a whole-house refresh of tired builder-spec glazing. Doing everything in one visit gets you a matched finish and one set of access costs.

## Why Chelmsford homeowners choose us

- One itemised quote per opening so you can compare fairly
- Whole-house upgrade of end-of-life builder-spec glazing on newer estates
- A single matched foiled finish across the whole property
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Chelmsford

Moulsham, Springfield, Broomfield, Great Baddow, Writtle and Galleywood, out to Colchester, Braintree, Witham and Billericay. Postcodes CM1 to CM4.

## Frequently asked questions

**What does whole-home double glazing cost in Chelmsford?**
Usually £3,150 to £9,450 depending on opening count, frame material and bays, using the local 1.05x cost factor.

**How long does it take?**
Two to three days for a semi or a new-build refresh, longer for a Moulsham terrace with a structural bay.

**Should I be wary of "sign today" discounts?**
Yes. A genuine quote is itemised and holds for at least a week.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Chelmsford | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Chelmsford from FENSA fitters. From £368 per window. Free, no-obligation.',
      body: `## Casement windows for Chelmsford homes

Casements are the standard across the interwar semis of Springfield, Broomfield and Melbourne, the new-build estates, and the rear elevations of the Moulsham terraces. A flush-sash casement suits the older Moulsham Street area better than a standard lipped frame.

## Why Chelmsford homeowners choose us

- Flush-sash and standard casements priced side by side
- Better-grade casements to replace thin builder-spec units on newer estates
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Trickle vents to Building Regs, colour-matched to the frame
- Multi-point locking and internal beading as standard

## Areas we cover around Chelmsford

Springfield, Broomfield, Melbourne, Moulsham, Great Baddow and Writtle, plus Colchester, Braintree, Witham and Billericay. Postcodes CM1 to CM4.

## Frequently asked questions

**Can you replace the casements on a newer Chelmsford estate house?**
Yes - swapping thin builder-spec casements for a better-grade uPVC unit with a proper warm-edge sealed unit is a common upgrade once the originals start to fail.

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for the Moulsham Street area, at roughly 10 to 15% more.

**How much are casement windows in Chelmsford?**
Around £368 to £945 per window fitted, using the local 1.05x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Chelmsford | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Chelmsford from vetted installers. Typical £1,260-£3,360. Free, no-obligation.',
      body: `## Bay window replacement in Chelmsford

Bays in Chelmsford are common on the Moulsham and Springfield Victorian and Edwardian terraces, and as a built-in feature on some newer estate houses. Pre-1914 bays were often built without a full structural beam, so a steel or reinforced lintel is usually needed; newer bays generally have a modern lintel already.

## Why Chelmsford homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where an older bay needs it
- Lead flashing and apron repairs above the bay included where needed
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Chelmsford

Moulsham, Springfield, Great Baddow, Broomfield and Writtle, plus Colchester, Braintree, Witham and Billericay. Postcodes CM1 to CM4.

## Frequently asked questions

**Does my Chelmsford bay need a steel?**
A pre-1914 Moulsham bay almost always does; a newer estate bay usually has a modern lintel. A survey confirms it before any frame is ordered.

**How much does a bay window cost in Chelmsford?**
Typically £1,260 to £3,360 for the glazing using the local 1.05x factor, plus £600 to £1,200 if structural work is needed.

**Can you keep the internal window seat?**
Usually yes - the frame is replaced around the existing seat and reveal, with making-good where they have to be disturbed.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Chelmsford | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Chelmsford from vetted fitters. From £683. Free, no-obligation.',
      body: `## uPVC doors for Chelmsford homes

For a Chelmsford terrace, semi or newer estate house, uPVC handles back, side and garden doors well and is a budget option for the front. On the newer estates the original patio doors are often tired and draughty after 15 to 20 years and are a straightforward replacement.

## Why Chelmsford homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Direct replacement of end-of-life builder-spec patio and French doors
- Foiled colours matched to your existing windows and joinery
- Toughened or laminated safety glass in every door side panel
- Old door and frame removed and disposed of within the quote

## Areas we cover around Chelmsford

Moulsham, Springfield, Broomfield, Great Baddow and Writtle, out to Colchester, Braintree, Witham and Billericay. Postcodes CM1 to CM4.

## Frequently asked questions

**Is a uPVC front door secure enough for Chelmsford?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Chelmsford?**
Roughly £683 to £1,890 fitted using the local 1.05x factor, with French and sliding patio sets at the top.

**Can you replace a tired builder-spec patio door like for like?**
Usually, yes - a modern uPVC slider or French set fits the same opening with better sealing, locking and glazing.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Chelmsford | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Chelmsford. From £93. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Chelmsford

Where a Chelmsford frame is sound but a sealed unit has misted or a mechanism has failed, a repair costs a fraction of replacement and is usually one visit. On the newer estates, thin builder-spec units start blowing seals earlier than a quality window, so misting is a common call in Beaulieu Park and Chancellor Park.

## Why Chelmsford homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units, including for builder-spec estate windows
- Friction stay, gearbox and multi-point mechanism swaps done in situ
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Chelmsford

Repairs across Beaulieu Park, Chancellor Park, Springfield, Moulsham and Great Baddow, plus Colchester, Braintree, Witham and Billericay. Postcodes CM1 to CM4.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £93 to £315 per unit in Chelmsford using the local 1.05x factor.

**Why have my 15-year-old windows already blown?**
Thin volume-builder sealed units and spacers fail earlier than a quality window - a made-to-measure replacement unit with a warm-edge spacer lasts longer.

**How quickly can you come out?**
Same week for most repairs; sooner for a window that will not lock or close.`,
    },
  },

  sunderland: {
    'upvc-windows': {
      metaTitle: 'uPVC Windows in Sunderland | Double Glazing Expert',
      metaDescription: 'uPVC window quotes in Sunderland from FENSA fitters. From £291 per window. Free, no-obligation, no cold calls.',
      body: `## New uPVC windows for a Sunderland home

Sunderland has a coastal Victorian terrace stock around Roker, Fulwell and Hendon, Tyneside flats in the western wards, and 1950s municipal estates in Farringdon and Silksworth. The seafront position at Roker and Seaburn means salt air and driving rain, so weather-rated seals and good hardware matter here. Ashbrooke is the city's leafy Victorian conservation area.

## Why Sunderland homeowners choose us

- Weather-rated units and marine-grade hardware for the Roker and Seaburn seafront
- Fitters who understand Tyneside flat layouts and split ownership of a terrace
- Knowledge of the Ashbrooke and Roker conservation areas
- A-rated 28mm units, warm-edge spacers and trickle vents to Building Regs as standard
- FENSA or CERTASS registered, frames and glass guaranteed separately

## Areas we cover around Sunderland

Roker, Ashbrooke, Fulwell, Barnes, East Herrington and Silksworth, out to Washington, Houghton-le-Spring, Seaham and Chester-le-Street. Postcodes SR1 to SR5.

## Frequently asked questions

**Who pays for windows in a Sunderland Tyneside flat?**
Each flat owns and pays for its own windows - the upper flat its upstairs windows, the lower flat its downstairs. You only quote for your own.

**Does the seafront position affect a window job?**
Yes - salt air corrodes cheap hardware and degrades seals faster, so marine-grade friction stays and hinges are worth specifying at Roker, Seaburn and Fulwell.

**How much do uPVC windows cost in Sunderland?**
Typically £291 to £747 per window fitted, using the North East regional factor of 0.83x - the lowest of the major cities.`,
    },
    'double-glazing': {
      metaTitle: 'Double Glazing in Sunderland | Double Glazing Expert',
      metaDescription: 'Whole-home double glazing quotes in Sunderland from vetted installers. Typical £2,490-£7,470. Free, no-obligation.',
      body: `## Whole-home double glazing in Sunderland

A whole Tyneside flat is often just 4 to 7 openings - one floor of a terrace - so a full-flat job is smaller and cheaper than a whole house. A Farringdon or East Herrington semi is the more usual 9 to 12-opening job. Sunderland's regional prices are the lowest of the major cities, which makes a whole-house job here affordable.

## Why Sunderland homeowners choose us

- One itemised quote per opening so you can compare fairly
- Whole-flat quoting for a single floor of a Tyneside terrace
- Marine-grade hardware and weather sealing for seafront properties
- Structural check on any bay before glass is ordered
- FENSA certificate registered in your name within 30 days

## Areas we cover around Sunderland

Roker, Ashbrooke, Fulwell, Barnes, East Herrington and Silksworth, out to Washington, Houghton-le-Spring, Seaham and Chester-le-Street. Postcodes SR1 to SR5.

## Frequently asked questions

**Is a whole-flat job smaller than a whole house?**
Usually, yes - a Tyneside flat is one floor of a terrace, often 4 to 7 openings, so the job and the price are smaller.

**What does whole-home double glazing cost in Sunderland?**
Usually £2,490 to £7,470 for a house, using the local 0.83x cost factor; a single flat is less.

**How long does it take?**
One to two days for a flat, two to four for a house with a structural bay.`,
    },
    'casement-windows': {
      metaTitle: 'Casement Windows in Sunderland | Double Glazing Expert',
      metaDescription: 'uPVC casement window quotes in Sunderland from FENSA fitters. From £291 per window. Free, no-obligation.',
      body: `## Casement windows for Sunderland homes

Casements are the standard replacement across the 1950s estates of Farringdon, Thorney Close and Springwell, and on many Tyneside flats where the original sash has already been changed once. On the seafront terraces, marine-grade hardware is worth specifying.

## Why Sunderland homeowners choose us

- Flush-sash and standard casements priced side by side
- Casements sized to Tyneside flat and terrace openings
- Marine-grade friction stays for Roker and Seaburn seafront elevations
- Egress hinges on bedroom windows for the 450mm fire-escape rule
- Multi-point locking and internal beading as standard

## Areas we cover around Sunderland

Farringdon, Thorney Close, Springwell, Roker, Fulwell and Ashbrooke, plus Washington, Houghton-le-Spring, Seaham and Chester-le-Street. Postcodes SR1 to SR5.

## Frequently asked questions

**What is a flush casement window?**
One where the sash closes level with the frame - a more traditional line for Sunderland's Victorian streets, at roughly 10 to 15% more.

**Do casement hinges last near the sea?**
Standard ones corrode faster - ask for marine-grade friction stays on any elevation facing the coast.

**How much are casement windows in Sunderland?**
Around £291 to £747 per window fitted, using the local 0.83x cost factor.`,
    },
    'bay-windows': {
      metaTitle: 'Bay Windows in Sunderland | Double Glazing Expert',
      metaDescription: 'Bay window replacement quotes in Sunderland from vetted installers. Typical £996-£2,656. Free, no-obligation.',
      body: `## Bay window replacement in Sunderland

Bays in Sunderland are common on the Ashbrooke and Roker Victorian villas and terraces. Many were built with the box frames carrying load, so a steel or reinforced lintel is usually needed above the bay - and on a seafront elevation the lead flashing has to stand up to driving coastal rain.

## Why Sunderland homeowners choose us

- Structural survey of the bay before any frame is ordered
- Matched frame widths so the bay keeps its proportions
- Steel or reinforced lintel fitted where the opening needs it
- Robust lead flashing and apron detail for seafront bays
- Scaled elevation drawings to approve before manufacture

## Areas we cover around Sunderland

Ashbrooke, Roker, Fulwell, Barnes and East Herrington, plus Washington, Houghton-le-Spring, Seaham and Chester-le-Street. Postcodes SR1 to SR5.

## Frequently asked questions

**Does my Sunderland Victorian bay need a steel?**
Almost certainly if it is pre-1914. A survey confirms it before any frame is ordered. Budget £600 to £1,200 for the work.

**How much does a bay window cost in Sunderland?**
Typically £996 to £2,656 for the glazing using the local 0.83x factor, plus the structural work if needed.

**Does the seafront position affect the flashing?**
Yes - a bay facing the coast needs a heavier lead flashing and apron detail to keep out driving rain.`,
    },
    'upvc-doors': {
      metaTitle: 'uPVC Doors in Sunderland | Double Glazing Expert',
      metaDescription: 'uPVC front, back and patio door quotes in Sunderland from vetted fitters. From £540. Free, no-obligation.',
      body: `## uPVC doors for Sunderland homes

The Tyneside flat has a pair of front doors on the street - one for the upper flat's stair, one for the lower flat - and each is the responsibility of that flat. A modern uPVC door with a good compression seal is a real gain against North East coastal weather. For semis, uPVC handles back and garden doors well.

## Why Sunderland homeowners choose us

- PAS 24 multi-point locking and anti-snap cylinders as standard
- Marine-grade hinges and handles for coastal, salt-laden air
- Clear on which of the two Tyneside-flat front doors is yours
- Foiled colours matched to your existing windows and joinery
- Old door and frame removed and disposed of within the quote

## Areas we cover around Sunderland

Roker, Ashbrooke, Fulwell, Barnes and Silksworth, out to Washington, Houghton-le-Spring, Seaham and Chester-le-Street. Postcodes SR1 to SR5.

## Frequently asked questions

**Which front door is mine on a Tyneside flat?**
The one opening onto your flat's stair. The two doors sit side by side but each belongs to a separate flat, so you only replace your own.

**Is a uPVC front door secure enough for Sunderland?**
A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for.

**How much do uPVC doors cost in Sunderland?**
Roughly £540 to £1,494 fitted using the local 0.83x factor, with French and sliding patio sets at the top.`,
    },
    'window-repair': {
      metaTitle: 'Double Glazing Repairs in Sunderland | Double Glazing Expert',
      metaDescription: 'Misted units, blown seals and faulty hinges repaired in Sunderland. From £74. Same-week visits, free quotes.',
      body: `## Double glazing repairs in Sunderland

Where a Sunderland frame is sound but a sealed unit has misted or a mechanism has seized, a repair costs a fraction of replacement and is usually one visit. On the coast, salt speeds up blown seals and corrodes friction stays, so both are common calls at Roker, Seaburn and Fulwell.

## Why Sunderland homeowners choose us

- Written diagnosis first - some "misting" is room condensation, a ventilation issue
- Made-to-measure replacement units for Tyneside flat and terrace openings
- Friction stay and gearbox swaps using marine-grade parts on exposed elevations
- Replacement units guaranteed to match the original 10-year seal warranty
- Call-out fees quoted up front for urgent jobs

## Areas we cover around Sunderland

Repairs across Roker, Seaburn, Fulwell, Ashbrooke and Farringdon, plus Washington, Houghton-le-Spring, Seaham and Chester-le-Street. Postcodes SR1 to SR5.

## Frequently asked questions

**Can a misted unit be repaired without a new window?**
Yes - it is a glass-unit swap and the frame stays in place. Around £74 to £249 per unit in Sunderland using the local 0.83x factor.

**Why do my window hinges keep seizing?**
Near the coast, salt corrosion is the usual cause - a marine-grade friction stay lasts far longer than a standard one.

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
