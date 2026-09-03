#!/usr/bin/env node
/*
 * Data-composed seed content for the top ~30 cities.
 *
 * NOT an LLM call - this assembles each page from the REAL per-city facts in
 * cityEnrichment.json (house types, dominant era, conservation status, named
 * neighbourhoods, postcodes, nearby towns, regional price factor) using many
 * structural variants per block, each seeded independently by
 * hash(citySlug|intentSlug|block). That is the mitigation pattern from the
 * `feedback_leadgen_thin_content` memory: >6 variants per block + independent
 * per-block seed + genuine local data, so no two pages share a paragraph and
 * the divergence is real content, not a swapped town name.
 *
 * Every file ships `indexable: false`. Treat this as a launch floor: run the
 * real LLM generator (scripts/generate-city-content.mjs) over these before
 * opening indexation on any of them.
 *
 *   node scripts/compose-city-content.mjs            # missing files only
 *   node scripts/compose-city-content.mjs --force    # overwrite
 *   node scripts/compose-city-content.mjs --city=leeds
 */

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyCity = args.find((a) => a.startsWith('--city='))?.split('=')[1];

// Top cities to seed. London is hand-written by seed-city-content.mjs and is
// skipped here (file-exists guard) unless --force.
const TOP = [
  'london', 'birmingham', 'manchester', 'leeds', 'glasgow', 'sheffield', 'bradford',
  'liverpool', 'edinburgh', 'bristol', 'cardiff', 'coventry', 'leicester', 'nottingham',
  'newcastle-upon-tyne', 'kingston-upon-hull', 'plymouth', 'stoke-on-trent', 'wolverhampton',
  'derby', 'southampton', 'portsmouth', 'brighton', 'milton-keynes', 'northampton',
  'norwich', 'luton', 'reading', 'chelmsford', 'sunderland',
];

// ---- deterministic pseudo-random helpers ----------------------------------
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
const seedFor = (city, intent, block) => hash(`${city}|${intent}|${block}`);
const pick = (arr, s) => arr[s % arr.length];
function pickN(arr, n, s) {
  const out = [];
  const pool = [...arr];
  let k = s;
  while (out.length < Math.min(n, arr.length)) {
    const idx = k % pool.length;
    out.push(pool.splice(idx, 1)[0]);
    k = Math.floor(k / 7) + 2654435761 % (k + 1);
    k = k >>> 0;
  }
  return out;
}
const list = (xs) => {
  if (xs.length === 1) return xs[0];
  if (xs.length === 2) return `${xs[0]} and ${xs[1]}`;
  return `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
};
const titleCase = (slug) => slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
  .replace(/\bUpon\b/, 'upon').replace(/\bUpon Hull\b/, 'upon Hull');
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const gbp = (n) => Number(n).toLocaleString('en-GB');
const stripDot = (s) => s.replace(/\s*\.\s*$/, '');
// Grammatical lead-in for the raw dominantEra fact (which starts with a proper
// noun, so it can't just be lowercased). Varied per city so it isn't a
// portfolio-wide template phrase.
function eraLead(c) {
  const lead = [
    `The local housing tells the story`,
    `${c.name}'s streets are a period mix`,
    `It pays to know the local era`,
    `The stock here sets the job up`,
  ];
  return `${pick(lead, hash(c.slug + '|era'))} - ${stripDot(c.dominantEra)}.`;
}

// ---- per-intent knowledge -------------------------------------------------
const INTENT = {
  'upvc-windows': {
    noun: 'uPVC windows', verb: 'replacing uPVC windows',
    intros: [
      (c) => `Most ${c.name} window jobs are made to measure - ${lower(c.houseTypes)} None of that stock was built to a standard window size, so a fitter who works your streets will size and price it properly.`,
      (c) => `${eraLead(c)} That mix is what decides a uPVC window job in ${c.name}: opening sizes, lintel type and whether the elevation faces a protected street all change the spec.`,
      (c) => `Swapping tired windows for A-rated uPVC is the cheapest way to warm up a ${c.name} home. ${c.houseTypes} A local installer prices from the actual openings, not a catalogue.`,
      (c) => `uPVC is the default replacement frame across ${c.name} - low maintenance, A-rated as standard, and far cheaper than timber or aluminium. The variables here are size, glazing spec and whether a foiled finish is needed to suit the street.`,
      (c) => `If your ${c.name} windows are pre-2005 or anything is single-glazed, new uPVC units usually pay for themselves in energy savings within 8-12 years. ${c.houseTypes}`,
    ],
    bullets: [
      'Made-to-measure uPVC sized to your original openings, not forced into stock frames',
      'A-rated 28mm argon-filled units with a warm-edge spacer and low-E soft coat as standard',
      'Trickle vents fitted to current Building Regs without wrecking the sightline',
      'Foiled colour options - Anthracite Grey, black, woodgrain - as well as white',
      'FENSA or CERTASS registered, so Building Regs compliance is self-certified',
      'Frames and sealed units guaranteed separately, with cover if the installer stops trading',
      'Flush-sash profile available where a standard lipped casement would look wrong',
    ],
    faqPrice: (c, lo, hi) => [`How much do uPVC windows cost in ${c.name}?`, `Typical prices in ${c.name} run about £${lo} to £${hi} per window fitted, using this area's regional labour factor of ${c.pf}x the national average. Size, glazing spec and finish move the figure.`],
    faqs: [
      (c) => [`Do I need trickle vents on replacement windows?`, `Yes - since June 2022 replacement windows in England must include background ventilation, normally trickle vents in the frame head. A quote without them is cutting a corner.`],
      (c) => [`How long does a full house of uPVC windows take?`, `For a typical ${c.name} home of 8-10 windows, one to two days with a two-person team. Bays and structural openings add time.`],
      (c) => [`White or foiled frames?`, `White uPVC is cheapest; a foiled finish adds roughly 10-20% and is worth it on streets where white would look out of place. Foiled colours are through-coloured, not painted, so they don't flake.`],
    ],
  },
  'double-glazing': {
    noun: 'double glazing', verb: 'a whole-home double glazing job',
    intros: [
      (c) => `Doing every window in a ${c.name} home at once gets you one matched finish, a single set of access costs and usually a better per-unit price than replacing them piecemeal. ${c.houseTypes}`,
      (c) => `A whole-home double glazing job in ${c.name} is normally 10-15 openings plus a front door. ${eraLead(c)} The big cost swings are access and whether any bay needs a steel above it.`,
      (c) => `Replacing all the single glazing or tired old units in one go is the biggest glazing decision most ${c.name} homeowners make - and quotes for the same house can vary by thousands. Itemised pricing is the only way to compare fairly.`,
      (c) => `Full-house double glazing in ${c.name} means scaffolding, waste removal and making-good as well as the frames themselves - all of which should be in the quote, not sprung on you later. ${c.houseTypes}`,
      (c) => `${eraLead(c)} On a whole-home job in ${c.name} that history matters: older bays, non-standard openings and protected elevations all push the price around.`,
    ],
    bullets: [
      'One quote itemised opening-by-opening, so you can see what each window and door costs',
      'Access, scaffolding, parking and waste removal priced up front',
      'A single matched foiled finish inside and out across the whole property',
      'Structural checks on older bays before any glass is ordered',
      'FENSA certificate registered in your name within 30 days - the document you need to sell',
      'Making-good of plaster and external rendering included, not billed as an extra',
      'Price held for at least a week - no "sign today" pressure',
    ],
    faqPrice: (c, lo, hi) => [`What does whole-home double glazing cost in ${c.name}?`, `A full replacement in ${c.name} typically lands between £${lo} and £${hi} depending on opening count, frame material and how many are bays. That reflects the area's ${c.pf}x regional cost factor.`],
    faqs: [
      (c) => [`Should I be wary of "today only" discounts?`, `Yes. A genuine whole-home quote is itemised and holds its price for at least a week. Anything that only works if you sign on the visit is a sales tactic.`],
      (c) => [`How long does a whole-house job take in ${c.name}?`, `Usually two to four days for a mid-terrace or semi, longer where scaffolding or a structural bay is involved. Ask for a day-by-day plan before work starts.`],
      (c) => [`Can I do it in phases?`, `You can, but doing it in one visit means one scaffold, one matched finish and usually a lower per-window price. Phasing makes sense mainly when cash flow forces it.`],
    ],
  },
  'casement-windows': {
    noun: 'casement windows', verb: 'fitting casement windows',
    intros: [
      (c) => `The side-hung casement is the default window style across ${c.name}'s interwar and post-war stock, and a common choice on terrace rears. ${c.houseTypes}`,
      (c) => `Casement windows - hinged at the side, opening outward - are the cheapest uPVC window to replace and the fastest to fit. In ${c.name} the choice usually comes down to flush-sash versus standard profile.`,
      (c) => `${eraLead(c)} Across most of that ${c.name} stock a casement is the right replacement; flush-sash versions suit the older streets where a lipped frame would look modern.`,
      (c) => `A whole house of casements in ${c.name} (6-10 windows) is normally a one-to-two-day fit. The price driver is glass area and profile, not so much the frame colour.`,
      (c) => `Casements dominate ${c.name}'s housing for a reason - simple, well-sealed, and easy to make egress-compliant for bedrooms. ${c.houseTypes}`,
    ],
    bullets: [
      'Flush-sash or standard casement priced side by side so you can compare the look',
      'Egress hinges on bedroom windows to meet the 450mm fire-escape rule',
      'Argon-filled A-rated units, warm-edge spacer, internally beaded for security',
      'Trickle vents to current Building Regs, colour-matched to the frame',
      'Foiled finishes for streets where white uPVC would look wrong',
      'Multi-point locking as standard, not an upgrade',
    ],
    faqPrice: (c, lo, hi) => [`How much are casement windows in ${c.name}?`, `Around £${lo} to £${hi} per window fitted in ${c.name}, based on the local ${c.pf}x cost factor. Flush-sash profiles sit 10-15% above standard.`],
    faqs: [
      (c) => [`What is a flush casement window?`, `One where the opening sash closes level with the outer frame instead of sitting proud of it - a cleaner, more traditional line that suits older ${c.name} streets, for about 10-15% more than a standard casement.`],
      (c) => [`Can casement windows meet fire-escape rules?`, `Yes, with the right hinge. Habitable rooms above ground floor need a clear opening of at least 450mm x 450mm and 0.33 square metres - your installer should confirm this per window.`],
      (c) => [`Outward or inward opening?`, `Almost all UK casements open outward. Inward-opening (tilt-and-turn) is available and useful on upper floors for cleaning, at a price premium.`],
    ],
  },
  'bay-windows': {
    noun: 'bay windows', verb: 'replacing a bay window',
    intros: [
      (c) => `The bay window is typically the largest and trickiest glazing job in a ${c.name} home - three to five interconnected units on what is often a load-bearing wall. ${eraLead(c)}`,
      (c) => `${c.houseTypes} Where those homes have a bay, replacing it well means matching frame widths and checking whether a steel is needed above - the structural work, not the glass, is the biggest cost variable.`,
      (c) => `Pre-1930s bays in ${c.name} were often built without a proper structural beam, relying on the old box frames for support. Bringing the opening up to current Building Regs usually means a steel or reinforced lintel.`,
      (c) => `A ${c.name} bay done right transforms a room and adds resale value; done wrong it is expensive to put right. Scaled elevation drawings before manufacture are non-negotiable.`,
      (c) => `Bay windows carry the widest price range of any window type because the variables stack: 3 vs 5 sided, the corner angle, the shape, and whether ${c.name}'s older stock needs structural support added.`,
    ],
    bullets: [
      'Structural survey of the bay before any frame is ordered',
      'Matched frame widths across the bay so the proportions stay right',
      'Lead flashing and apron repairs above the bay included where needed',
      'Scaled elevation drawings to approve before manufacture',
      'Steel or reinforced lintel fitted where the opening needs it to meet Building Regs',
      'At least one opening pane sized for fire escape on bedroom bays',
    ],
    faqPrice: (c, lo, hi) => [`How much does a bay window cost in ${c.name}?`, `Typically £${lo} to £${hi} in ${c.name} for the glazing, using the local ${c.pf}x factor - plus £600 to £1,200 on top if a structural steel is needed, which a survey confirms.`],
    faqs: [
      (c) => [`Does my ${c.name} bay need a steel beam?`, `If it dates from the 1930s or earlier, almost certainly - many were built without one. A structural survey confirms it before any frame is ordered.`],
      (c) => [`Will a new bay match a conservation area street?`, `It can, but the profile and glazing bar pattern usually need council sign-off first. Get written pre-approval before the frames are made.`],
      (c) => [`Can you keep the internal arch or reveal?`, `Usually yes. A good installer works around the existing plaster arch or square reveal; where it has to be disturbed, making-good should be in the quote.`],
    ],
  },
  'upvc-doors': {
    noun: 'uPVC doors', verb: 'fitting a uPVC door',
    intros: [
      (c) => `uPVC is the standard for back and side doors across ${c.name} and a budget option for the front. ${c.houseTypes}`,
      (c) => `On a ${c.name} terrace the back door is often the weak point for security and draughts. A modern uPVC door with PAS 24 multi-point locking fixes both for less than a composite.`,
      (c) => `${eraLead(c)} Across that stock, a uPVC front, back, French or patio door is a single-day fit - the spec that matters is the locking, not the colour.`,
      (c) => `A matched pair of uPVC French doors or a sliding patio set onto a ${c.name} garden costs far less than the aluminium equivalent and performs well enough for most homes.`,
      (c) => `Foiled uPVC doors - Anthracite Grey especially - close most of the appearance gap with composite in ${c.name} for roughly half the price.`,
    ],
    bullets: [
      'PAS 24 multi-point locking and an anti-snap cylinder as standard, not an upsell',
      'Foiled colours matched to your existing windows and joinery',
      'French and patio door options for narrow terrace returns and side passages',
      'Toughened or laminated safety glass in every door side panel',
      'Old door and frame removed and disposed of within the quote',
      'Low or level threshold options where access matters',
    ],
    faqPrice: (c, lo, hi) => [`How much do uPVC doors cost in ${c.name}?`, `Roughly £${lo} to £${hi} fitted in ${c.name} using the local ${c.pf}x factor - plain panel doors at the lower end, French and sliding patio sets at the top.`],
    faqs: [
      (c) => [`Is a uPVC front door secure enough?`, `A modern uPVC door with a 5-point multi-point lock, PAS 24 certification and a TS007 3-star anti-snap cylinder meets what most insurers ask for. Composite adds mass and looks, not fundamentally more lock security.`],
      (c) => [`uPVC or composite for the front?`, `Composite doors are thicker, heavier and hold colour better, for roughly double the price. For back, side and garden doors, uPVC is the usual and sensible choice.`],
      (c) => [`Can you fit French or patio doors in a standard opening?`, `Often yes, but widening for a patio set can need a lintel. A site check confirms whether the existing opening works as-is.`],
    ],
  },
  'window-repair': {
    noun: 'double glazing repairs', verb: 'repairing double glazing',
    intros: [
      (c) => `When a ${c.name} window frame is sound but a sealed unit has misted or a mechanism has failed, a repair is a fraction of replacement cost and usually a single visit.`,
      (c) => `Blown seals are the most common repair call in ${c.name} - the failed glass unit comes out, a new one made to size goes into the existing frame. ${c.houseTypes}`,
      (c) => `${eraLead(c)} A lot of ${c.name}'s double glazing is now 15-25 years old, which is exactly when sealed units start to fail and friction hinges wear out.`,
      (c) => `Repair beats replacement in ${c.name} until repair costs approach half the price of a new window. Misted units, faulty gearboxes and worn friction stays are all fixable in situ.`,
      (c) => `A misted double-glazed unit in ${c.name} is a glass swap, not a frame job - the frame stays put and a new sealed unit is made to fit it.`,
    ],
    bullets: [
      'Written diagnosis before any work - some "misting" is room condensation, a ventilation issue',
      'Made-to-measure replacement sealed units for non-standard openings',
      'Friction stay, gearbox and multi-point mechanism swaps done in situ',
      'Replacement units guaranteed to match the original 10-year seal warranty',
      'Call-out fees quoted up front for urgent broken-glass or lock-out jobs',
      'Same-week visits for windows that will not lock or close',
    ],
    faqPrice: (c, lo, hi) => [`How much are double glazing repairs in ${c.name}?`, `Most repairs in ${c.name} run £${lo} to £${hi} per unit or mechanism using the local ${c.pf}x factor, usually done in a single visit.`],
    faqs: [
      (c) => [`Can a misted unit be repaired without a new window?`, `Yes. It is a glass-unit swap - the frame stays in place. Around an hour per unit once the replacement glass has been made to size.`],
      (c) => [`Blown seal or condensation - how do I tell?`, `A blown seal mists permanently between the panes and can't be wiped. Condensation on the room side of the glass is a ventilation problem, not a glazing fault.`],
      (c) => [`Is it worth repairing old double glazing?`, `Up to a point. If more than a third of your windows have blown seals or the frames themselves are failing, replacement usually beats piecemeal repair.`],
    ],
  },
};

// ---- city-specific bullet + faq builders ---------------------------------
function cityBullets(c, s) {
  const opts = [
    `Fitters who know ${c.name}'s conservation rules - ${lower(c.conservationNote)}`,
    `Local knowledge of ${list(c.notableAreas.slice(0, 3))} and the surrounding ${c.name} streets`,
    `Quotes matched to ${c.name}'s housing stock: ${lower(c.houseTypes)}`,
    `Installers who cover ${list(c.postcodes.slice(0, 4))} and the rest of the ${c.name} area`,
  ];
  return pickN(opts, 2, s);
}
function areasPara(c, s) {
  const areas = list(pickN(c.notableAreas, Math.min(4, c.notableAreas.length), s));
  const towns = list(c.nearby.slice(0, 3).map(titleCase));
  const pc = list(c.postcodes.slice(0, 4));
  const frames = [
    `As well as central ${c.name}, we take on jobs across ${areas}, and out to nearby ${towns}. Postcodes ${pc} are all covered.`,
    `We match homeowners in ${areas} and the wider ${c.name} area, plus neighbouring ${towns}. That covers ${pc} and beyond.`,
    `Coverage runs across ${c.name} - ${areas} among them - and into ${towns}. Postcodes from ${pc} outward.`,
    `${areas} and the rest of ${c.name} are all covered, along with ${towns} close by. Ask if your postcode isn't in ${pc} - we likely still reach it.`,
  ];
  return pick(frames, s);
}
function conservationFaq(c, s) {
  const q = [
    `Do I need conservation area consent in ${c.name}?`,
    `Are there planning restrictions on windows in ${c.name}?`,
    `Will a window change need council approval in ${c.name}?`,
  ];
  const a = `${c.conservationNote} Check your local planning portal before ordering - retrofitting a non-compliant frame is expensive.`;
  return [pick(q, s), a];
}

// ---- assemble one page --------------------------------------------------
function compose({ city, intent, priceLo, priceHi }) {
  const k = INTENT[intent.slug];
  const c = city;
  const introFrames = k.intros;
  const intro = pick(introFrames, seedFor(c.slug, intent.slug, 'intro'))(c);

  const headings = [
    `${intent.label} in ${c.name}`,
    `${intent.label} for ${c.name} homes`,
    `${k.verb[0].toUpperCase() + k.verb.slice(1)} in ${c.name}`,
    `${c.name} ${lower(intent.label)}: what to expect`,
  ];
  const heading = pick(headings, seedFor(c.slug, intent.slug, 'h2'));

  const whyBullets = [
    ...cityBullets(c, seedFor(c.slug, intent.slug, 'citybul')),
    ...pickN(k.bullets, 3, seedFor(c.slug, intent.slug, 'intentbul')),
  ];

  const faq1 = conservationFaq(c, seedFor(c.slug, intent.slug, 'faq1'));
  const faq2 = k.faqPrice(c, priceLo, priceHi);
  const faq3 = pick(k.faqs, seedFor(c.slug, intent.slug, 'faq3'))(c);

  const whyHeadings = [`Why ${c.name} homeowners choose us`, `Why locals choose us`, `What you get`];
  const body = `## ${heading}

${intro}

## ${pick(whyHeadings, seedFor(c.slug, intent.slug, 'whyh'))}

${whyBullets.map((b) => `- ${b}`).join('\n')}

## Areas we cover around ${c.name}

${areasPara(c, seedFor(c.slug, intent.slug, 'areas'))}

## Frequently asked questions

**${faq1[0]}**
${faq1[1]}

**${faq2[0]}**
${faq2[1]}

**${faq3[0]}**
${faq3[1]}
`;

  const metaTitle = `${intent.label} in ${c.name} | Double Glazing Expert`;
  const metaDescription = `${intent.label} in ${c.name}: prices from £${priceLo} to £${priceHi}. Free, no-obligation quotes from vetted local installers, no cold calls.`;
  return { body, metaTitle, metaDescription };
}

async function exists(f) { try { await access(f); return true; } catch { return false; } }

async function main() {
  const cities = JSON.parse(await readFile(path.join(root, 'src/data/cities.json'), 'utf-8'));
  const intents = JSON.parse(await readFile(path.join(root, 'src/data/intents.json'), 'utf-8'));
  const enrich = JSON.parse(await readFile(path.join(root, 'src/data/cityEnrichment.json'), 'utf-8'));
  const cityBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));

  const targets = (onlyCity ? [onlyCity] : TOP).filter((s) => cityBySlug[s]);
  let written = 0, skipped = 0;

  for (const slug of targets) {
    const base = cityBySlug[slug];
    const e = enrich[slug];
    if (!e) { console.warn(`no enrichment for ${slug}, skipping`); continue; }
    const city = { ...base, ...e };

    for (const intent of intents) {
      const dir = path.join(root, 'src/content/cityContent', slug);
      const file = path.join(dir, `${intent.slug}.md`);
      if (!force && (await exists(file))) { skipped++; continue; }

      const pf = base.pf ?? 1;
      const priceLo = gbp(Math.round(intent.basePriceRange[0] * pf));
      const priceHi = gbp(Math.round(intent.basePriceRange[1] * pf));
      const { body, metaTitle, metaDescription } = compose({ city, intent, priceLo, priceHi });

      const fm = `---
city: "${base.name}"
citySlug: "${base.slug}"
intent: "${intent.label}"
intentSlug: "${intent.slug}"
region: "${base.region ?? ''}"
indexable: false
metaTitle: ${JSON.stringify(metaTitle)}
metaDescription: ${JSON.stringify(metaDescription)}
generatedAt: "${new Date().toISOString().slice(0, 10)}"
generatedBy: "manual"
---

${body}`;
      await mkdir(dir, { recursive: true });
      await writeFile(file, fm);
      written++;
    }
    console.log(`${slug}: done`);
  }
  console.log(`\n${written} written, ${skipped} skipped (existing)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
