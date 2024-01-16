import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [tailwind()],
  i18n: {
    locales: ['en', 'es', 'gl'],
    defaultLocale: 'es'
  },
  adapter: netlify()
});