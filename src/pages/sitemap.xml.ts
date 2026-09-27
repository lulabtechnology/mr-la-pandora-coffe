import type { APIRoute } from 'astro';

const routes = ['/', '/en/', '/ru/'];
const languages = ['es', 'en', 'ru'];
const origin = (import.meta.env.PUBLIC_SITE_URL || 'https://lapandoracoffee.com').replace(/\/$/, '');

export const GET: APIRoute = () => {
  const entries = routes.map((route) => {
    const alternates = routes.map((alternate, index) =>
      `<xhtml:link rel="alternate" hreflang="${languages[index]}" href="${origin}${alternate}" />`,
    ).join('');
    return `<url><loc>${origin}${route}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${origin}/" /></url>`;
  }).join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
