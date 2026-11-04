// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://nforce.ai',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [preact()],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  // URL parity with the Nuxt site. Add 301s here for any slug that changes.
  // Pages not yet rebuilt (Phase 2/3) keep their existing URLs on the live site.
  redirects: {},
});
