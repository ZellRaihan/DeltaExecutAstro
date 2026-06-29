// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// This is its own, fully separate Astro project, now serving
// deltaaexecutor.net (migrated from deltaexecut.net).
const siteUrl = 'https://deltaaexecutor.net';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
