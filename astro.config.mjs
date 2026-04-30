// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://olearylab.com',
  integrations: [tailwind()],
  build: {
    assets: 'assets',
  },
  vite: {
    assetsInclude: ['**/*.astro'],
  },
});