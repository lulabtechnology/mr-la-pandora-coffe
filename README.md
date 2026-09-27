# La Pandora Coffee · landing page

Landing de presentación de La Pandora Coffee en español (`/`), inglés (`/en/`) y ruso (`/ru/`). No contiene menú, precios, catálogo ni tienda. El dominio canónico configurado es `https://lapandoracoffee.com`.

Esta propuesta se inspira en la fotografía inmersiva y el ritmo editorial de Nkora sin copiar sus elementos. La portada ocupa toda la pantalla con una taza real de La Pandora; espresso, madera y tonos tostados dominan la página. El rojo queda en el logotipo oficial, que se conserva sin editar. La fábula, el espacio, la preparación y el origen usan imágenes del material entregado. No se usan fotos genéricas. `FUENTES.md` detalla la procedencia.

## Desarrollo

Requiere Node.js 22.12+ y pnpm 11.19.0.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm dev
```

El resultado estático queda en `dist/` y también se incluye en este ZIP. Para revisar la compilación local: `pnpm preview`.

## Vercel y dominio

1. Importar este proyecto en Vercel desde un repositorio Git.
2. Build command: `pnpm build`. Output directory: `dist`.
3. Añadir `lapandoracoffee.com` y, si se desea, `www.lapandoracoffee.com` al proyecto. Configurar los registros DNS que Vercel indique y redirigir una variante a la canónica.
4. Si el destino canónico cambia, definir `PUBLIC_SITE_URL` con la URL completa sin barra final, reconstruir y actualizar también `public/robots.txt`.
5. Verificar `https://lapandoracoffee.com/robots.txt` y `/sitemap.xml` después de publicar.

No se ha cambiado la web en Vercel desde este entorno: este ZIP es la versión preparada para desplegar.

## SEO y GEO

La página incluye títulos y descripciones por idioma, URL canónicas y `hreflang`, sitemap, `robots.txt`, imagen social absoluta, datos estructurados `CafeOrCoffeeShop` y `WebPage`, texto sobre origen y preguntas frecuentes visibles para consultas locales y de marca. La estrategia, las búsquedas investigadas y las acciones pendientes están en `SEO-GEO.md`.

El pie incluye el enlace de crédito solicitado hacia [LulabTech](https://lulabtech.com/). Ese enlace va **desde** La Pandora **hacia** LulabTech; para ganar una mención entrante se necesita además que LulabTech u otros sitios enlacen a `https://lapandoracoffee.com/`.

## Identidad y fuentes

El logotipo que se muestra es una copia byte a byte de la imagen roja y blanca compartida por el usuario, sin frase añadida. Su presentación en cabecera y pie recorta solo el espacio rojo alrededor mediante CSS para ajustarla al formato horizontal. El archivo original entregado en Illustrator contiene otras variantes con la frase “Where Coffee And Culture Meet”; esas variantes no se usan en esta revisión. Consulta `FUENTES.md` para la procedencia de fotos, arte y datos.

## Pendientes de publicación

- Confirmar el teléfono oficial: el PDF indica `69825757` y el perfil público de Google muestra `6626-8763`. Por coherencia se omitió de la página y los datos estructurados hasta confirmar cuál corresponde.
- Confirmar dirección postal exacta y el pin de Maps. La página usa la zona Calle 50 y las coordenadas aportadas por el PDF.
- Confirmar horario, Instagram y las traducciones con el cliente.
- Vincular la URL final en Google Business Profile y Search Console; verificar la propiedad y enviar el sitemap. Esto requiere acceso a esas cuentas.

## Ediciones

| Cambio | Archivo |
| --- | --- |
| Textos ES/EN/RU | `src/data/content.ts` |
| Datos estructurados, enlaces y secciones | `src/components/Landing.astro` |
| Estilos | `src/styles/global.css` |
| Imágenes | `public/images/` |
| Sitemap | `src/pages/sitemap.xml.ts` |
