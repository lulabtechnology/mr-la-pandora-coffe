# SEO y GEO: cambios y activación

Actualizado el 30/09/2026. Trabajo sobre el sitio real: contenido útil, entidad coherente, HTML estático y fotografías más ligeras. Los grupos siguientes expresan intención; no son volúmenes ni posiciones de búsqueda medidos.

## Intenciones cubiertas

| Intención | Contenido útil |
| --- | --- |
| La Pandora Coffee Panamá / Mr La Pandora | Nombre consistente, historia, identidad y contactos |
| Cafetería Calle 50 / coffee shop Calle 50 Panama City | Página de visita: zona, pin, horario, estacionamiento y teléfonos |
| Café de origen panameño de La Pandora | Historia de microlotes y del primer grano en Palmira/Boquete a 1.200 m |
| Comida, café empacado, microlotes | Respuestas concretas y contacto para disponibilidad vigente |
| Visitantes angloparlantes y rusoparlantes | Versiones completas con URL propias y hreflang entre páginas equivalentes |

## Implementación

Los dos teléfonos fueron autorizados por el usuario el 30/09/2026. Ambos están en texto y enlaces `tel:`. El número escrito primero se usa como `telephone` en `CafeOrCoffeeShop`; los dos figuran como `ContactPoint`. No se dedujo que uno sustituya al otro.

El negocio mantiene un único `@id` bajo el dominio canónico. `WebSite`, páginas y breadcrumbs referencian la misma entidad. Se incluyen nombre, variantes existentes, logo, fotos reales, fundadores, Instagram, dirección de zona, coordenadas y horario. No se añadieron premios, puntuaciones SCA, valoraciones, precios o `Offer` sin respaldo.

La dirección completa sigue pendiente. Calle 50 y el pin `8.991044,-79.511425` provienen del PDF; no se inventó edificio/local. El enlace Maps abre ese pin en lugar de una búsqueda genérica por nombre.

La nueva página de ubicación responde a una necesidad distinta del inicio: planificar una visita y encontrar contacto/acceso. El inicio conserva la historia. Sus enlaces son HTML normales. Siete respuestas cubren dudas concretas. Palmira/Boquete a 1.200 m se presenta como **primer grano del proyecto**, no como propiedad de todos los lotes actuales. Menú, lote disponible y días festivos se consultan con el equipo.

`FAQPage` organiza las respuestas para consumidores de Schema.org y reproduce exactamente el contenido visible. **No se promete un resultado enriquecido de preguntas en Google:** Google retiró esa función en 2026. [Registro oficial de cambios](https://developers.google.com/search/updates).

Google explica que sus funciones generativas se apoyan en SEO, contenido útil y datos locales coherentes. No hay un Schema especial que garantice citas de IA; `llms.txt` no mejora posiciones en Google. Se prioriza contenido sustantivo. [Guía de optimización para IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [funciones de IA y sitios web](https://developers.google.com/search/docs/appearance/ai-features).

## Rastreo y presentación

- Seis páginas estáticas, títulos/descripciones propios, idioma HTML y un H1 por página.
- Canonical absoluto y hreflang recíprocos entre páginas equivalentes; x-default al español de cada grupo.
- Sitemap con las seis URL y alternancias; robots generado desde la misma configuración de dominio.
- Sin lastmod ficticio, redirección automática de idioma ni páginas masivas para variantes de palabras clave.
- Open Graph/Twitter completos, imagen social de 1200 × 630 y favicon de 48 × 48.
- Todo el contenido es legible sin JavaScript de cliente.

## Fotografías y rendimiento

Se sirven WebP responsive con dimensiones, alt, srcset y sizes. La portada se precarga según pantalla y mantiene prioridad alta. Las fotos secundarias usan carga diferida, excepto la primera de la página de ubicación. Las fuentes son locales, con subconjuntos latinos y font-display swap.

| Portada | Bytes | Reducción frente al PNG original |
| --- | --- | --- |
| Original | 2.559.741 | — |
| 960 px | 91.430 | 96,4% |
| 1440 px | 175.642 | 93,1% |
| 1920 px | 244.490 | 90,4% |

La nueva foto reemplaza la tercera imagen de galería y también ilustra la ubicación. Se retiraron su zoom 1.72 y el filtro anterior. Estas mejoras reducen transferencia; **no equivalen a un puntaje Lighthouse ni garantizan Core Web Vitals**.

## Verificación

`pnpm check` y compilación estática completados. `pnpm check:seo` revisa el HTML final de las seis rutas, contactos, concordancia de preguntas visibles/Schema, recursos, enlaces, metadatos, sitemap y robots. Revisión de navegador a 390 y 1440 px: fotos cargadas, enlaces de teléfono correctos, cero desbordamientos horizontales y errores de página.

Se comprueba una segunda compilación bajo otro dominio con el mismo auditor. Las pruebas locales no confirman rastreo, indexación, rankings o citas de IA.

## Activación después de publicar

1. Conectar dominio, configurar redirección permanente de www y revisar respuestas 200 en páginas, robots y sitemap.
2. Verificar Search Console, enviar sitemap e inspeccionar URL. Medir marca/local, impresiones, clics y páginas de destino.
3. Revisar Google Business Profile: dirección completa, pin, sitio, teléfonos y horario. El posicionamiento local también depende de relevancia, distancia y popularidad. [Ayuda oficial](https://support.google.com/business/answer/7091?hl=es).
4. Mantener datos coherentes en Instagram/directorios reales y buscar cobertura editorial verificable. El crédito a LulabTech es saliente; no representa una mención entrante a La Pandora.
5. Publicar menú rastreable cuando exista archivo final; mantener disponibilidad y horarios especiales con datos del equipo.
6. Establecer línea base tras el lanzamiento y revisar en 4–8 semanas. No hay acceso conectado a Analytics, Search Console o Business Profile en esta entrega.

No se garantiza indexación, ranking ni resultado enriquecido. [Documentación LocalBusiness de Google](https://developers.google.com/search/docs/appearance/structured-data/local-business).
