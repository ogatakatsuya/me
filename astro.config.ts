// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';

import icon from 'astro-icon';

import partytown from '@astrojs/partytown';
import remarkLinkCard from 'remark-link-card-plus';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ogatakatsuya.com',
  output: 'static',

  vite: {
      plugins: [tailwindcss()],
      resolve: {
        // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
        // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
        alias: import.meta.env.PROD? { "react-dom/server": "react-dom/server.edge" } : undefined,
      }
  },

  integrations: [react(), sitemap(), expressiveCode({
    defaultProps: {
      wrap: false,
      preserveIndent: true,
    },
    themes: ['everforest-dark', 'everforest-light'],
  }), 
  mdx(), 
  icon(), 
  partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  })
],

  markdown: {
    remarkPlugins: [
      [
        remarkLinkCard, {
          cache: true,
          shortenUrl: true,
          thumbnailPosition: "right",
        },
      ],
    ],
  },

  image: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'storage.r2.ogatakatsuya.com',
    }],
  },

  adapter: cloudflare({
     imageService: 'cloudflare'
  }),
});