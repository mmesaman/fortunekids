# Fortune Kids — Arquitectura general de la web

> Tareas cubiertas: FK-010, FK-011, FK-012, FK-013, FK-014
> Fase: Arquitectura y diseño · Prioridad: P0

## 1. Arquitectura general (FK-010)

Fortune Kids es un sitio web **estático** (HTML5 + CSS3 + JavaScript vanilla), sin framework ni dependencias de build. La arquitectura se organiza en tres capas:

```
web/
├── index.html              # Página Home (entrada única del sitio)
├── css/
│   ├── variables.css       # Design tokens (colores, tipografía, espaciado, sombras…)
│   ├── base.css            # Reset, estilos base y componentes de página (header, hero, footer…)
│   ├── layout.css          # Sistema de layout y utilidades (grid, flex, spacing, responsive)
│   └── components.css      # Componentes reutilizables (card, badge, modal, tabs…)
├── js/
│   └── main.js             # Módulos JS: menú móvil, tabs, modales, validación, animaciones…
├── docs/                   # Documentación de arquitectura y sistemas de diseño
└── assets/                 # Imágenes e iconos (pendiente: fase de contenido real)
```

### Principios

1. **Mobile first**: los estilos base son móviles; las media queries amplían hacia tablet (`≥768px`) y escritorio (`≥1024px`).
2. **BEM**: todas las clases siguen la convención `bloque__elemento--modificador` (ej. `.header__nav-link`, `.card--horizontal`).
3. **Tokens primero**: ningún valor "mágico" en CSS; todo color, tamaño o espaciado proviene de una variable de `variables.css`.
4. **Separación de responsabilidades**: HTML = estructura, CSS = presentación, JS = comportamiento.
5. **Progresivo**: el sitio funciona sin JavaScript; JS solo añade interactividad.

### Orden de carga de CSS

```html
<link rel="stylesheet" href="css/variables.css">   <!-- 1. Tokens -->
<link rel="stylesheet" href="css/base.css">        <!-- 2. Reset + base -->
<link rel="stylesheet" href="css/layout.css">      <!-- 3. Layout + utilidades -->
<link rel="stylesheet" href="css/components.css">  <!-- 4. Componentes -->
```

---

## 2. Mapa de páginas (FK-011)

El sitio se compone de los siguientes tipos de página:

| Página | Ruta | Plantilla | Estado |
|--------|------|-----------|--------|
| Home | `/index.html` | `index.html` | Implementada |
| Categoría | `/categoria.html?slug=…` | Plantilla de categoría | Pendiente (FK-050) |
| Listado de contenidos | `/contenidos.html` | Plantilla de listado | Pendiente (FK-051) |
| Detalle de contenido | `/contenido.html?id=…` | Plantilla de detalle | Pendiente (FK-052) |
| Resultados de búsqueda | `/busqueda.html?q=…` | Plantilla de búsqueda | Pendiente (FK-062) |

### Jerarquía de navegación

```
Home
├── Quiénes somos          (#nosotros / página futura)
├── Programas              (#programas → listado por categoría)
│   ├── Educación
│   ├── Nutrición
│   ├── Salud
│   └── Comunidad
├── Historias              (#historias → detalle de contenido)
├── Colabora               (#colabora / CTA)
└── Contacto               (#contacto / footer)
```

Todas las páginas comparten el mismo `<header>` y `<footer>` (ver secciones 3 y 5).

---

## 3. Estructura del Header (FK-012)

Header **fijo** (`position: fixed`, altura `80px`, `z-index: sticky`) con fondo blanco y sombra sutil. Al hacer scroll aparece el modificador `.header--scrolled`; al bajar, `.header--hidden` lo oculta.

```html
<header class="header">
  <div class="container header__container">
    <!-- Logo -->
    <a href="index.html" class="header__logo">
      <img src="assets/logo.png" alt="Fortune Kids" class="header__logo-img">
    </a>

    <!-- Navegación principal (oculta en móvil) -->
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li><a href="#…" class="header__nav-link active">Inicio</a></li>
        …
      </ul>
    </nav>

    <!-- Botón hamburguesa (solo móvil) -->
    <button class="header__menu-toggle" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```

### Comportamiento responsive

| Breakpoint | Navegación | Toggle |
|------------|------------|--------|
| `<1024px` (móvil/tablet) | Oculta (se abre con hamburguesa) | Visible |
| `≥1024px` (escritorio) | Visible en línea | Oculto |

### Estados del enlace activo

`.header__nav-link.active` muestra subrayado animado (`::after` con transición de ancho) y color primario.

---

## 4. Estructura del menú de navegación (FK-013)

### Menú de escritorio

Lista horizontal (`flex`, `gap: --space-8`) dentro de `.header__nav-list`. Cada enlace:

- Color neutro-700 en reposo, primario en hover/activo.
- Subrayado inferior animado mediante pseudo-elemento `::after`.

### Menú móvil

Al pulsar `.header__menu-toggle`:

1. El toggle recibe `.active` (animación de sus 3 barras a X).
2. `.header__nav` recibe `.active` y se despliega.
3. `body.menu-open` bloquea el scroll del fondo.

Cierre automático: al pulsar un enlace, al hacer clic fuera, o con la tecla `Escape`.

### Accesibilidad

- `aria-label="Abrir menú"` en el toggle.
- Enlaces con texto descriptivo (sin "clic aquí").
- Área táctil mínima de 44×44 px garantizada por el padding de los enlaces.

---

## 5. Estructura del Footer (FK-014)

Footer oscuro (`--color-neutral-900`) organizado en una rejilla de 4 columnas en escritorio (`2fr 1fr 1fr 1fr`), 2 en tablet y 1 en móvil:

```html
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <!-- Columna 1: marca -->
      <div>
        <h3 class="footer__title">Fortune Kids</h3>
        <p class="footer__text">Descripción de la organización…</p>
        <div class="footer__social">…</div>
      </div>

      <!-- Columna 2: enlaces -->
      <div>
        <h4 class="footer__subtitle">Enlaces</h4>
        <ul class="footer__links">…</ul>
      </div>

      <!-- Columna 3: programas -->
      <div>
        <h4 class="footer__subtitle">Programas</h4>
        <ul class="footer__links">…</ul>
      </div>

      <!-- Columna 4: contacto -->
      <div>
        <h4 class="footer__subtitle">Contacto</h4>
        <ul class="footer__contact">…</ul>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="footer__bottom">
      <p>© 2026 Fortune Kids</p>
      <nav class="footer__legal">…</nav>
    </div>
  </div>
</footer>
```

### Elementos clave

- **Redes sociales**: `.footer__social-link` — círculos de 40×40 px con hover primario.
- **Enlaces legales**: privacidad, cookies, términos (`.footer__legal`).
- **Barra inferior**: separada por borde superior; centrada en móvil, justificada en escritorio.
