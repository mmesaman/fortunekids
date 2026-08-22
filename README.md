# Fortune Kids — Web

Web estática de Fortune Kids, organización local de Arusha (Tanzania) que trabaja por el desarrollo de niños, jóvenes y comunidades.

**Publicación:** https://www.fortunekids.org/

## Stack

- HTML5 + CSS3 + JavaScript vanilla (sin dependencias ni build)
- Design tokens en `css/variables.css`; estilos por página en `css/base.css`, layout y componentes
- Contenido del catálogo desacoplado en `js/data.js`; motor de render en `js/catalogo.js`
- Accesibilidad: skip-links, ARIA, foco visible, `prefers-reduced-motion`

## Estructura

```
web/
├── index.html              Home
├── 404.html                Página 404 (GitHub Pages)
├── offline.html            Página sin conexión (service worker)
├── sw.js                   Service worker: precache + network-first
├── manifest.webmanifest    PWA instalable (iconos PNG 192/512)
├── sitemap.xml / robots.txt
├── css/                    variables, base, layout, components (+ print)
├── js/                     main.js, data.js (datos demo), catalogo.js (motor)
├── pages/                  quienes-somos, que-hacemos, impacto, como-ayudar,
│                           transparencia, contacto, contenidos, categoria (?slug=),
│                           contenido (?id=), busqueda (?q=), legales
├── assets/icons/           favicon.svg + icon-192.png + icon-512.png
└── docs/                   arquitectura.md, sistema-diseno.md
```

## Funcionalidades

- **Catálogo**: listado con filtros por categoría/tipo, ordenación, "cargar más", vistas de categoría (`?slug=`), detalle (`?id=`) y búsqueda (`?q=`, `noindex`)
- **PWA**: instalable, funciona offline tras la primera visita; aviso de "nueva versión" al desplegar cambios (subir `VERSION` en `sw.js`)
- **SEO**: titles/descriptions únicos, Open Graph + Twitter completos, canonical en URLs fijas, JSON-LD (NGO, BreadcrumbList, Article), sitemap y robots
- **Compartir** artículos vía WhatsApp/Facebook/X o copiando el enlace
- **Impresión**: estilos `@media print` para transparencia e informes
- **Accesibilidad**: skip-links, ARIA, foco visible, targets táctiles 44px, `prefers-reduced-motion`

## Desarrollo local

```bash
cd web
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar

Push a `master` → GitHub Pages lo despliega automáticamente (~1 min).

## Pendiente al publicar con dominio real

1. Sustituir `https://www.fortunekids.org` en `sitemap.xml` y las meta `og:url`/`og:image`
2. Actualizar rutas absolutas de `404.html` (`/fortunekids/…`)
3. Crear `assets/images/og-cover.jpg` (1200×630) e imágenes reales
4. Reemplazar los datos demo de `js/data.js` por contenido real

## Limitaciones conocidas

- **OG en páginas dinámicas**: al compartir un artículo (`contenido.html?id=…`) las redes sociales muestran el título genérico del template, porque los crawlers no ejecutan JavaScript. Solución real: generar HTML estático por artículo (SSG) o backend
- **Verificación externa pendiente**: pasar el JSON-LD por el Rich Results Test de Google y probar SW/instalación/compartir en navegador real
