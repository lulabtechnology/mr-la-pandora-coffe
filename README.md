# La Pandora Coffee · landing page

Sitio de presentación de una sola página para dar a conocer La Pandora Coffee y facilitar la visita al local. Incluye versiones en español (`/`), inglés (`/en/`) y ruso (`/ru/`). No incluye menú, catálogo, precios, productos ni comercio electrónico.

## Requisitos

- Node.js 22.12 o superior.
- pnpm 11.19.0 (se indica en `package.json`).

## Uso local

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Astro mostrará la dirección local en la terminal. Para verificar el proyecto:

```bash
pnpm check
pnpm build
pnpm preview
```

La versión compilada queda en `dist/`. Esta carpeta se incluye en el ZIP para revisión rápida; Vercel la regenerará al desplegar.

## Publicar en Vercel

1. Descomprime el proyecto y súbelo a un repositorio Git.
2. En Vercel, elige **Add New → Project**, importa el repositorio y selecciona **Astro** si no se detecta automáticamente.
3. Usa **Build Command** `pnpm build` y **Output Directory** `dist`. La instalación se hace con `pnpm install --frozen-lockfile`.
4. Añade la variable de entorno `PUBLIC_SITE_URL` con la URL final, sin barra al final, por ejemplo `https://www.ejemplo.com`. Es necesaria para URL canónicas, idiomas alternativos y vista previa social absoluta.
5. Despliega. Después, configura el dominio en Vercel y coloca en el proveedor de DNS los registros exactos que Vercel indique.

El proyecto es estático y no necesita adaptador de Vercel, base de datos ni servidor propio.

## Ediciones habituales

| Qué editar | Archivo |
| --- | --- |
| Textos de las tres versiones | `src/data/content.ts` |
| Enlace de Google Maps e Instagram | `src/components/Landing.astro` |
| Diseño y colores | `src/styles/global.css` |
| Fotografías, arte, logos y vista previa social | `public/images/` |
| URL de producción | Variable `PUBLIC_SITE_URL` en Vercel |

Las imágenes web se optimizaron a partir de los archivos proporcionados para este proyecto: fotos del local, logotipo y arte de La Pandora. Las fotos ajenas de Unsplash que venían en el material no se usaron. No hace falta cargar las carpetas originales de PSD/AI/PDF al hosting.

## Revisar antes de publicar

- Confirmar con La Pandora el horario de martes a domingo incluido en la página. El lunes no se anuncia como día abierto.
- Confirmar que el enlace `@lapandoracoffee` y el pin de Google Maps (8.991044, -79.511425) siguen siendo los correctos.
- Revisar la redacción en inglés y ruso con una persona de la marca.
- Confirmar el dominio definitivo y colocar `PUBLIC_SITE_URL` antes del despliegue final.

## Incluido

Diseño adaptable a móvil y escritorio, fotografías y arte original optimizados, selector de idioma, enlaces para llegar al local y a Instagram, favicon, metadatos SEO y Open Graph, datos estructurados de cafetería, navegación por teclado, alternativas de texto para imágenes y respeto por movimiento reducido. No hay cookies, rastreadores ni formularios.
