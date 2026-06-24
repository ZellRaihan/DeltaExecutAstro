import type { APIContext } from 'astro';

export async function GET({ site }: APIContext) {
  const siteUrl = site?.toString().replace(/\/$/, '') ?? '';

  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/download', priority: '0.9', changefreq: 'weekly' },
    { path: '/download/android', priority: '0.9', changefreq: 'weekly' },
    { path: '/download/ios', priority: '0.9', changefreq: 'weekly' },
    { path: '/download/windows', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/terms', priority: '0.4', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.4', changefreq: 'monthly' },
    { path: '/disclaimer', priority: '0.4', changefreq: 'monthly' },
  ];

  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
