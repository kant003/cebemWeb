import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [tailwind(), preact()],
  i18n: {
    locales: ['es', 'gl'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true
  }
  },
  adapter: netlify()
});