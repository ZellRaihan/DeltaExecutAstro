import type { APIContext } from 'astro';

export async function GET({ site }: APIContext) {
  const siteUrl = site?.toString().replace(/\/$/, '') ?? '';

  const body = `User-agent: *
Allow: /

User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
