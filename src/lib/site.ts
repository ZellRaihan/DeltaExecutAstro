// Single source of truth for this site's own domain, set once in
// astro.config.mjs. Every canonical tag, schema URL, breadcrumb item, and
// sitemap entry pulls from here, so changing the domain means editing one
// line in the config and rebuilding, nothing else.

import type { AstroGlobal } from 'astro';

export function getSiteUrl(Astro: AstroGlobal): string {
  return Astro.site?.toString().replace(/\/$/, '') ?? '';
}

export function getSiteHost(Astro: AstroGlobal): string {
  const url = getSiteUrl(Astro);
  if (!url) return '';
  try {
    return new URL(url).host;
  } catch {
    return '';
  }
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbSchema(Astro: AstroGlobal, items: BreadcrumbItem[]) {
  const siteUrl = getSiteUrl(Astro);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path === '/' ? '/' : item.path}`,
    })),
  };
}
