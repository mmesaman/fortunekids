# Fortune Kids — Web

Web estática de Fortune Kids, organización local de Arusha (Tanzania) que trabaja por el desarrollo de niños, jóvenes y comunidades.

**Publicación:** https://mmesaman.github.io/fortunekids/

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
├── manifest.webmanifest    PWA manifest
├── sitemap.xml / robots.txt
├── css/                    variables, base, layout, components
├── js/                     main.js, data.js (datos demo), catalogo.js (motor)
├── pages/                  quienes-somos, que-hacemos, impacto, como-ayudar,
│                           transparencia, contacto, contenidos, categoria (?slug=),
│                           contenido (?id=), busqueda (?q=), legales
├── assets/icons/favicon.svg
└── docs/                   arquitectura.md, sistema-diseno.md
```

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
