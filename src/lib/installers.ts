// Per-city installer directory, sourced from the UK register of companies
// (Companies House bulk export, SIC 43342 "Glazing", active companies whose
// registered-office post town matches the city). Regenerate with
// `php scripts/fetch-installers.php --csv <BasicCompanyDataAsOneFile.csv>`.
//
// This is PUBLIC statutory data, NOT a vetted or endorsed list. A registered
// office is not proof of trading area or of competent-person-scheme
// membership. Pages built from it must say so and must keep the quote form as
// the primary call to action. See AGENTS.md + the feedback_leadgen_thin_content
// memory: these pages start `indexable: false` and open one at a time.

import serviceSic from '../data/serviceSic.json';

export interface InstallerRecord {
  company_number: string;
  name: string;
  address: string;
  postcode: string;
  postcode_area: string;
  town: string;
  county: string;
  region: string;
  sic: string;
  sic_label: string;
  incorporated: string; // dd/mm/yyyy (Companies House format)
  company_type: string; // "Ltd" | "LLP" | "PLC" | ... | ""
  size: string; // "Micro" | "Small" | "Medium" | "Large" | ""
  last_accounts: string; // "yyyy" | ""
  slug: string;
}

// Minimum own-city register hits before a city gets its own company pages and
// a mesh link from its service pages. The *category* listing page is generated
// for every city (own companies, topped up from neighbours - see getListing).
export const MIN_INSTALLERS = 1;
// Companies surfaced per city (the "top N"), and the count of company pages
// generated per city.
export const TOP_N = 5;

// Indexation allowlist - same philosophy as the cityContent gate. When a city
// slug is added here, its category page AND its TOP_N company pages all become
// indexable together (and enter the sitemap). Add slugs one at a time, only
// once the list has been eyeballed.
export const INDEXABLE_INSTALLER_CITIES = new Set<string>([]);

const files = import.meta.glob<InstallerRecord[]>('../data/installers/*.json', {
  eager: true,
  import: 'default',
});

// citySlug -> records
const byCity: Record<string, InstallerRecord[]> = {};
for (const [path, records] of Object.entries(files)) {
  const base = path.split('/').pop() ?? '';
  if (base === '_index.json') continue;
  byCity[base.replace(/\.json$/, '')] = records as InstallerRecord[];
}

// Names that are on SIC 43342 but are not domestic window/door installers:
// vehicle glass, commercial facades / curtain walling, mirrors, greenhouses.
const OFF_TRADE =
  /windscreen|auto\s?glass|autoglass|vehicle glass|facade|façade|curtain wall|cladding|balustrad|shopfit|laminate|mirror|greenhouse|aquarium|splashback|rooflight|partition|glass block/i;

// Names that positively signal the window / door / glazing trade.
const ON_TRADE =
  /window|glaz|glass|\bdoor|frame|conservator|sash|casement|fenest|upvc|pvcu/i;

const iso = (d: string): string => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : d;
};

/**
 * Presentational cleanup of a Companies House name. The register stores names
 * in UPPERCASE; the fetch script title-cases them, but leaves artefacts like
 * "(leeds)", "Pvcu", "C.j.t.". Fix those for display without changing the data.
 */
export function displayName(name: string): string {
  let s = name;
  s = s.replace(/\(([a-z])/g, (_, c: string) => `(${c.toUpperCase()}`); // "(leeds)" -> "(Leeds)"
  s = s.replace(/\b([A-Za-z](?:\.[A-Za-z]){1,3}\.?)\b/g, (m) => m.toUpperCase()); // "C.j.t." -> "C.J.T."
  const tokens: Record<string, string> = {
    Pvcu: 'PVCu', Upvc: 'uPVC', Uk: 'UK', Llp: 'LLP', Cctv: 'CCTV',
  };
  s = s.replace(/\b([A-Za-z]+)\b/g, (w) => tokens[w] ?? w);
  return s;
}

export const incorporatedYear = (d: string): string => {
  const m = /^\d{2}\/\d{2}\/(\d{4})$/.exec(d);
  return m ? m[1] : d;
};

/** Raw count for a city (pre-filter), for gating / "N firms" copy. */
export function installerCount(citySlug: string): number {
  return byCity[citySlug]?.length ?? 0;
}

/** Does this city clear the bar for its own installer category page? */
export function hasInstallerPage(citySlug: string): boolean {
  return installerCount(citySlug) >= MIN_INSTALLERS;
}

/**
 * Ranked, filtered, de-duplicated installer list for a city:
 *  - drop off-trade names (windscreens, facades, ...)
 *  - trade-named firms first, then neutral names
 *  - oldest incorporation first within each group (established firms lead)
 */
export function getInstallers(citySlug: string, limit = 12): InstallerRecord[] {
  const raw = byCity[citySlug] ?? [];
  const seen = new Set<string>();
  const cleaned = raw.filter((r) => {
    if (seen.has(r.company_number)) return false;
    seen.add(r.company_number);
    return !OFF_TRADE.test(r.name);
  });
  cleaned.sort((a, b) => {
    const sa = ON_TRADE.test(a.name) ? 0 : 1;
    const sb = ON_TRADE.test(b.name) ? 0 : 1;
    return sa - sb || iso(a.incorporated).localeCompare(iso(b.incorporated)) || a.name.localeCompare(b.name);
  });
  return cleaned.slice(0, limit);
}

/** The TOP_N companies shown for a city, each of which gets its own page. */
export function getTopInstallers(citySlug: string, n = TOP_N): InstallerRecord[] {
  return getInstallers(citySlug, n);
}

export interface ListingRow extends InstallerRecord {
  homeCity: string; // display name of the city this company is registered in
  homeCitySlug: string;
  fromNearby: boolean; // true = shown because the requested city was short
}

export interface CityListing {
  rows: ListingRow[];
  ownCount: number; // companies registered in the city itself
  nearbyUsed: string[]; // display names of neighbour cities drawn on
}

type CityMeta = { slug: string; name: string; region?: string; nearby?: string[] };

/**
 * Listing for a city's category page: its own companies first, topped up from
 * neighbouring cities (and central London for the boroughs) when it has fewer
 * than `n`. Every city gets a listing; a handful with no companies anywhere
 * near come back with an empty `rows`.
 */
export function getListing(city: CityMeta, n = TOP_N): CityListing {
  const ownCount = installerCount(city.slug);
  const rows: ListingRow[] = getInstallers(city.slug, n).map((r) => ({
    ...r, homeCity: city.name, homeCitySlug: city.slug, fromNearby: false,
  }));

  const nearbyUsed: string[] = [];
  if (rows.length < n) {
    const seen = new Set(rows.map((r) => r.company_number));
    const pool = [
      ...(city.region === 'London' && city.slug !== 'london' ? ['london'] : []),
      ...(city.nearby ?? []),
    ];
    for (const slug of pool) {
      if (rows.length >= n) break;
      const near = byCity[slug];
      if (!near) continue;
      const nearName = near[0]?.town ?? slug;
      let added = false;
      for (const r of getInstallers(slug, n)) {
        if (rows.length >= n) break;
        if (seen.has(r.company_number)) continue;
        seen.add(r.company_number);
        rows.push({ ...r, homeCity: nearName, homeCitySlug: slug, fromNearby: true });
        added = true;
      }
      if (added) nearbyUsed.push(nearName);
    }
  }

  return { rows, ownCount, nearbyUsed };
}

// --- company-page slugs -----------------------------------------------------
// The JSON `slug` is derived from the name and can collide within a city
// (e.g. two "* Windows Ltd"). Disambiguate with the company number so every
// company page URL is stable and unique.
const slugCacheByCity: Record<string, Map<string, string>> = {};
function citySlugMap(citySlug: string): Map<string, string> {
  if (slugCacheByCity[citySlug]) return slugCacheByCity[citySlug];
  const map = new Map<string, string>(); // company_number -> pageSlug
  const counts = new Map<string, number>();
  for (const r of byCity[citySlug] ?? []) counts.set(r.slug, (counts.get(r.slug) ?? 0) + 1);
  for (const r of byCity[citySlug] ?? []) {
    const base = r.slug || `company-${r.company_number.toLowerCase()}`;
    map.set(r.company_number, (counts.get(r.slug) ?? 0) > 1 ? `${base}-${r.company_number.toLowerCase()}` : base);
  }
  slugCacheByCity[citySlug] = map;
  return map;
}

export function companyPageSlug(citySlug: string, r: InstallerRecord): string {
  return citySlugMap(citySlug).get(r.company_number) ?? r.slug;
}

/** Look up one company on a city's top list by its page slug. */
export function getInstaller(citySlug: string, companySlug: string): InstallerRecord | undefined {
  return getTopInstallers(citySlug).find((r) => companyPageSlug(citySlug, r) === companySlug);
}

/** Other companies on the same city's top list (for cross-linking). */
export function siblingInstallers(citySlug: string, companySlug: string): InstallerRecord[] {
  return getTopInstallers(citySlug).filter((r) => companyPageSlug(citySlug, r) !== companySlug);
}

/** { citySlug, companySlug } for every company page to build. */
export function allCompanyPageParams(cities: { slug: string }[]): { citySlug: string; companySlug: string }[] {
  const out: { citySlug: string; companySlug: string }[] = [];
  for (const c of cities) {
    if (!hasInstallerPage(c.slug)) continue;
    for (const r of getTopInstallers(c.slug)) {
      out.push({ citySlug: c.slug, companySlug: companyPageSlug(c.slug, r) });
    }
  }
  return out;
}

// --- service <-> SIC mesh --------------------------------------------------
const SERVICE_SIC = serviceSic as Record<string, string[]>;

/** SIC codes a given service intent maps to ([] = no installer directory). */
export function sicCodesForService(intentSlug: string): string[] {
  return SERVICE_SIC[intentSlug] ?? [];
}

/**
 * Should this service x city page link to the city's installer directory?
 * True only when the city clears MIN_INSTALLERS *and* at least one of its
 * top companies is registered under a SIC code this service maps to.
 * ("Link services and cities to companies that match by SIC; no match, no
 * company.")
 */
export function cityHasInstallersForService(citySlug: string, intentSlug: string): boolean {
  if (!hasInstallerPage(citySlug)) return false;
  const codes = sicCodesForService(intentSlug);
  if (codes.length === 0) return false;
  return getTopInstallers(citySlug).some((r) => codes.includes(r.sic));
}
