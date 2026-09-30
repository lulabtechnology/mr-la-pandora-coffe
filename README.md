# La Pandora Coffee

Sitio estático Astro, optimizado el 30/09/2026 para búsquedas locales, consultas de marca y respuestas de IA. Conserva el diseño y los tres idiomas. Incluye código fuente y `dist/` listo para alojar.

## Cambios

- Dos contactos visibles con enlaces para llamar: **+507 6982-5757** y **+507 6626-8763**, en visita, pie, página de ubicación y datos estructurados.
- La nueva foto del usuario reemplaza la tercera imagen de galería, «La Pandora por dentro». Se retiraron el zoom fuerte y el filtro anterior.
- Página de ubicación y contacto en ES/EN/RU; navegación y enlaces internos rastreables.
- Siete respuestas concretas: ubicación, contacto, horario, estacionamiento, origen, comida y consultas de café empacado/microlotes.
- Grafo JSON-LD con `CafeOrCoffeeShop`, `WebSite`, páginas y breadcrumbs; preguntas coherentes con el texto visible.
- WebP responsive, dimensiones, textos alternativos y carga diferida. Portada: de 2.559.741 bytes a variantes de 91.430, 175.642 o 244.490 bytes.
- Imagen social real de 1200 × 630, Open Graph/Twitter completos y fuentes locales con subconjuntos latinos.
- Canonical, hreflang, sitemap y robots desde una única configuración de dominio. Todo el contenido se puede leer sin JavaScript de cliente.

## Rutas

| Idioma | Inicio | Ubicación y contacto |
| --- | --- | --- |
| Español | `/` | `/cafeteria-calle-50/` |
| Inglés | `/en/` | `/en/visit/` |
| Ruso | `/ru/` | `/ru/visit/` |

## Desarrollo

Node.js 22.12+ y pnpm 11.19.0.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm check:seo
pnpm dev
```

Para previsualizar la compilación: `pnpm preview`. El auditor `check:seo` comprueba el HTML final, metadatos, contactos, Schema/preguntas visibles, enlaces, recursos, idiomas, canonical, sitemap y robots. La entrega también se revisó en navegador a 390 y 1440 px en las seis rutas.

## Publicación

1. En Vercel: build `pnpm build`, output `dist`. En otro alojamiento estático: publicar el contenido de `dist/`.
2. Conectar `lapandoracoffee.com` y configurar una redirección permanente de `www` hacia la variante canónica.
3. Si cambia el dominio, definir `PUBLIC_SITE_URL` con el origen completo, por ejemplo `https://lapandoracoffee.com`, y reconstruir. Sin ruta, query ni credenciales. Robots y sitemap se actualizan automáticamente.
4. Verificar las seis rutas, `/robots.txt` y `/sitemap.xml` en el dominio final.
5. Verificar la propiedad en Google Search Console, enviar el sitemap e inspeccionar las páginas.
6. Actualizar Google Business Profile con dominio, ambos contactos, dirección y horarios coherentes.

**No se ha publicado ni modificado Vercel, DNS, Search Console o Google Business Profile desde este entorno.**

## Edición

| Dato | Archivo |
| --- | --- |
| Teléfonos, pin, Instagram y horario estructurado | `src/data/site.ts` |
| Textos y horarios visibles ES/EN/RU | `src/data/content.ts` |
| Metadatos y entidad | `src/layouts/BaseLayout.astro` |
| Inicio / ubicación | `src/components/Landing.astro`, `src/components/Visit.astro` |
| Estilos / fotografías | `src/styles/global.css`, `public/images/optimized/` |
| Auditoría del HTML compilado | `scripts/check-seo.mjs` |

Al cambiar horarios, actualizar `site.ts` y `content.ts`. La dirección postal exacta (edificio/local) sigue pendiente: se conserva Calle 50 y el pin del PDF. Revisar ese pin, Instagram, horarios y traducciones antes del lanzamiento. No se inventaron números de local, premios, puntuaciones, precios ni productos. `SEO-GEO.md` explica el alcance y `FUENTES.md` la procedencia.
