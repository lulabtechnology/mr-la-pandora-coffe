import { locales, type Locale } from './content';

// All public URLs derive from Astro's single site setting.
export const siteUrl = new URL(import.meta.env.SITE).origin;
export const homePaths: Record<Locale, string> = { es: '/', en: '/en/', ru: '/ru/' };
export const visitPaths: Record<Locale, string> = {
  es: '/cafeteria-calle-50/', en: '/en/visit/', ru: '/ru/visit/',
};
export const routeGroups = [homePaths, visitPaths];
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;
export const business = {
  name: 'La Pandora Coffee',
  alternateName: ['La Pandora', 'Mr La Pandora'],
  instagram: 'https://www.instagram.com/lapandoracoffee/',
  latitude: 8.991044,
  longitude: -79.511425,
  // The pin is supplied by the business. An exact street/local number is still pending.
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=8.991044%2C-79.511425',
  contacts: [
    { display: '+507 6982-5757', telephone: '+50769825757' },
    { display: '+507 6626-8763', telephone: '+50766268763' },
  ],
  hours: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '08:00', closes: '16:00' },
  ],
};

export function businessSchema(description: string) {
  return {
    '@type': 'CafeOrCoffeeShop', '@id': absoluteUrl('/#business'),
    name: business.name, alternateName: business.alternateName, description,
    url: absoluteUrl('/'), logo: absoluteUrl('/images/logo-oficial.jpg'),
    image: [absoluteUrl('/images/optimized/interior-960.webp'), absoluteUrl('/images/optimized/espacio-960.webp')],
    telephone: business.contacts[0].telephone,
    contactPoint: business.contacts.map(({ telephone }) => ({ '@type': 'ContactPoint', telephone, contactType: 'customer service' })),
    founder: [{ '@type': 'Person', name: 'Mario Lozano' }, { '@type': 'Person', name: 'Consuelo García' }],
    sameAs: [business.instagram], hasMap: business.mapUrl,
    address: { '@type': 'PostalAddress', streetAddress: 'Calle 50', addressLocality: 'Ciudad de Panamá', addressRegion: 'Panamá', addressCountry: 'PA' },
    geo: { '@type': 'GeoCoordinates', latitude: business.latitude, longitude: business.longitude },
    openingHoursSpecification: business.hours,
  };
}

export function sitemapXml() {
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  const entries = routeGroups.flatMap((group) => locales.map((locale) => {
    const alternates = locales.map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${escape(absoluteUrl(group[lang]))}" />`).join('');
    return `<url><loc>${escape(absoluteUrl(group[locale]))}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${escape(absoluteUrl(group.es))}" /></url>`;
  })).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`;
}
