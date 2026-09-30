import { defineConfig } from 'astro/config';

const site = new URL(process.env.PUBLIC_SITE_URL || 'https://lapandoracoffee.com');
if (!['https:', 'http:'].includes(site.protocol) || site.pathname !== '/' || site.search || site.hash || site.username || site.password) {
  throw new Error('PUBLIC_SITE_URL must be an HTTP(S) origin without a path, query or credentials.');
}

export default defineConfig({
  output: 'static',
  site: site.origin,
  trailingSlash: 'always',
});
