// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// This is its own, fully separate Astro project for deltaexecut.net,
// distinct from the deltaxexecutor.com.co codebase, no shared files.
const siteUrl = 'https://deltaexecut.net';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
