import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';

/** @param {string | undefined} path */
function normalizeBase(path) {
  if (!path || path === '/') return '/';
  const p = path.startsWith('/') ? path : `/${path}`;
  return p.endsWith('/') ? p : `${p}/`;
}

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');

export default defineConfig({
  site: env.PUBLIC_SITE_URL || undefined,
  base: normalizeBase(env.PUBLIC_BASE_PATH || '/'),
  integrations: [react(), tailwind()],
  output: 'static',
  build: {
    // directory: /admin/ → admin/index.html (works with baseHref('/admin') on GitHub Pages)
    format: 'directory',
  },
});
