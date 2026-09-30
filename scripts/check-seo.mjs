import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';

// Validate the emitted HTML rather than relying on component source assumptions.
const dist = path.resolve(process.argv[2] || 'dist');
const origin = new URL(process.argv[3] || 'https://lapandoracoffee.com').origin;
const groups = [['/', '/en/', '/ru/'], ['/cafeteria-calle-50/', '/en/visit/', '/ru/visit/']];
const languages = ['es', 'en', 'ru'];
const htmls = new Map();
const read = (file) => readFile(path.join(dist, file), 'utf8');
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1];
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const text = (html) => decode(html.replace(/<[^>]+>/g, '').trim());
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(m => m[0]);
const titles = new Set();
const descriptions = new Set();

for (const group of groups) {
 for (const [i, route] of group.entries()) {
  const html = await read(`${route.slice(1)}index.html`);
  htmls.set(route, html);
  assert.equal(attr(tags(html, 'html')[0], 'lang'), languages[i]);
  assert.equal(tags(html, 'h1').length, 1, `${route}: one H1`);
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/)[1]);
  assert(!titles.has(title), 'Unique title'); titles.add(title);
  const metas = tags(html, 'meta');
  const description = decode(attr(metas.find(t=>attr(t,'name')==='description'), 'content'));
  assert(!descriptions.has(description), 'Unique description'); descriptions.add(description);
  assert(description.length >= 70 && description.length <= 180, `${route}: description length ${description.length}`);
  const robots = attr(metas.find(t=>attr(t,'name')==='robots'), 'content');
  assert(!robots.includes('noindex'));
  const links = tags(html, 'link');
  assert.equal(attr(links.find(t=>attr(t,'rel')==='canonical'),'href'), origin+route);
  for(const [j, alternate] of group.entries()) assert(links.some(t=>attr(t,'hreflang')===languages[j]&&attr(t,'href')===origin+alternate), 'Reciprocal language alternates');
  assert(links.some(t=>attr(t,'hreflang')==='x-default'&&attr(t,'href')===origin+group[0]));
  for(const property of ['og:url','og:image','og:image:alt']) assert(metas.some(t=>attr(t,'property')===property));
  assert.equal(attr(metas.find(t=>attr(t,'property')==='og:url'),'content'),origin+route);
  assert.equal(attr(metas.find(t=>attr(t,'property')==='og:image'),'content'),origin+'/images/social-preview.jpg');
  const json = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const business = json['@graph'].find(n=>n['@type']==='CafeOrCoffeeShop');
  assert.equal(business['@id'],origin+'/#business');
  assert.equal(business.telephone,'+50769825757');
  assert.deepEqual(business.contactPoint.map(c=>c.telephone),['+50769825757','+50766268763']);
  for(const number of business.contactPoint.map(c=>c.telephone)) assert(html.includes(`href="tel:${number}"`));
  assert.equal(business.openingHoursSpecification[0].closes,'21:00');
  assert.equal(business.geo.latitude,8.991044);
  const page = json['@graph'].find(n=>n['@id']===origin+route+'#webpage');
  assert.equal(page.inLanguage,languages[i]);
  assert.equal(page.about['@id'],business['@id']);
  const visibleQuestions=[...html.matchAll(/<article class="question">\s*<h[34][^>]*>([\s\S]*?)<\/h[34]>\s*<p>([\s\S]*?)<\/p>/g)].map(m=>({question:text(m[1]),answer:text(m[2])}));
  assert.equal(visibleQuestions.length,7);
  assert.deepEqual(page.mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),visibleQuestions,'FAQ markup matches visible answers exactly');
  assert(tags(html,'script').every(t=>attr(t,'type')==='application/ld+json'), 'No client JS needed for content');
  if(group===groups[0]) assert(html.includes('/images/optimized/espacio-960.webp')&&!html.includes('WhatsApp Image'), 'Requested photo replacement');
 }
}
for(const [route,html] of htmls) {
 for(const tag of [...tags(html,'a'),...tags(html,'link'),...tags(html,'img'),...tags(html,'source')]) {
  const values=[attr(tag,'href'),attr(tag,'src'),...(attr(tag,'srcset')||'').split(',').map(s=>s.trim().split(' ')[0])].filter(Boolean);
  for(const raw of values) {
   const href=decode(raw);
   if(/^(https?:|tel:|mailto:|data:)/.test(href)) continue;
   const url=new URL(href,origin+route);
   const local=url.pathname;
   if(local.endsWith('/')) {
    await access(path.join(dist,local.slice(1),'index.html'));
    if(url.hash&&htmls.has(local)) assert(htmls.get(local).includes(`id="${url.hash.slice(1)}"`),'Anchor exists: '+href);
   } else await access(path.join(dist,decodeURIComponent(local.slice(1))));
  }
 }
}
const sitemap=await read('sitemap.xml');
const locations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>decode(m[1]));
assert.deepEqual(locations.sort(),groups.flat().map(r=>origin+r).sort());
for(const group of groups) for(const [i,route] of group.entries()) assert(sitemap.includes(`hreflang="${languages[i]}" href="${origin+route}"`));
const robots=await read('robots.txt');
assert(robots.includes('Allow: /')&&robots.includes(`Sitemap: ${origin}/sitemap.xml`));
console.log(`PASS: ${htmls.size} static pages; metadata, contact numbers, schema/visible FAQ parity, hreflang, sitemap, robots, images and internal links. Origin: ${origin}`);
