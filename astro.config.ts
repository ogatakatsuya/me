// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://ogatakatsuya.com',
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [react(), sitemap(), expressiveCode({
      defaultProps: {
        wrap: false,
        preserveIndent: true,
      },
      themes: ['everforest-dark', 'everforest-light'],
    }), mdx(), icon()],
});