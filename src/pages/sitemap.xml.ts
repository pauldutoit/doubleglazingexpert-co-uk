import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '../data/site.config.json';
import intents from '../data/intents.json';
import cities from '../data/cities.json';
import {
  getListing,
  companyPageSlug,
  INDEXABLE_INSTALLER_CITIES,
} from '../lib/installers';

export const GET: APIRoute = async () => {
  const entries = await getCollection('cityContent');
  const indexableEntries = entries.filter((e) => e.data.indexable);
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.indexable);

  // Installer category + company pages are gated the same way as cityContent:
  // only cities on the manual allowlist enter the sitemap. Every other city's
  // pages still render (and stay internally linked) but as noindex. When a
  // city is opened, its category page and its TOP_N company pages go in
  // together.
  const openCities = cities.filter((c) => INDEXABLE_INSTALLER_CITIES.has(c.slug));
  const installerUrls = openCities.flatMap((c) => [
    `/double-glazing-installers-${c.slug}/`,
    // Only companies actually registered in this city have a page under it.
    ...getListing(c).rows
      .filter((r) => !r.fromNearby)
      .map((r) => `/installers/${c.slug}/${companyPageSlug(c.slug, r)}/`),
  ]);

  const staticUrls = [
    '/',
    '/areas',
    '/blog/',
    ...intents.map((i) => `/services/${i.slug}/`),
  ];

  const urls = [
    ...staticUrls,
    ...indexableEntries.map((e) => `/${e.data.intentSlug}-${e.data.citySlug}/`),
    ...installerUrls,
    ...posts.map((p) => `/blog/${p.id}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>https://${siteConfig.domain}${u}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
