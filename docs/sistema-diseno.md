# Fortune Kids — Sistemas de diseño

> Tareas cubiertas: FK-015, FK-016, FK-017, FK-018, FK-019
> Fase: Arquitectura y diseño · Prioridad: P0

Todos los sistemas se apoyan en los tokens definidos en `css/variables.css`.

---

## 1. Sistema de botones (FK-015)

Clase base `.btn` + modificadores. Implementación: `css/base.css`.

### Variantes

| Clase | Uso | Estilo |
|-------|-----|--------|
| `.btn--primary` | Acción principal | Fondo primario sólido, texto blanco |
| `.btn--secondary` | Acción secundaria | Transparente con borde primario |
| `.btn--white` | Sobre fondos de color | Fondo blanco, texto primario |
| `.btn--ghost` | Acciones terciarias / inline | Solo texto, sin borde |
| `.btn--danger` | Acciones destructivas | Fondo rojo (`--color-error`) |

### Tamaños

| Clase | Padding | Fuente |
|-------|---------|--------|
| *(default)* | `12px 24px` | 16px |
| `.btn--sm` | `8px 16px` | 14px |
| `.btn--lg` | `16px 32px` | 18px |

### Estados y utilidades

- `:hover` — oscurece fondo/borde según variante.
- `:focus-visible` — anillo exterior de 3px (`--color-primary-300`) para navegación por teclado.
- `:disabled` / `.btn--disabled` — opacidad 50%, cursor `not-allowed`.
- `.btn--block` — botón a ancho completo.

```html
<a href="#" class="btn btn--primary btn--lg">Donar ahora</a>
<button class="btn btn--secondary" disabled>Enviar</button>
```

---

## 2. Sistema de tarjetas (FK-016)

Clase base `.card`. Implementación: `css/components.css`.

### Anatomía

```
.card
├── .card__image      (opcional, 200px alto, object-fit: cover)
├── .card__header     (opcional, separado por borde inferior)
├── .card__content
│   ├── .card__title
│   ├── .card__text
│   └── .card__link
└── .card__footer     (opcional, separado por borde superior)
```

### Variantes

| Clase | Uso |
|-------|-----|
| *(default)* | Elevación media (`--shadow-md`) + lift al hover |
| `.card--horizontal` | Imagen a la izquierda en `≥768px`, vertical en móvil |
| `.card--flat` | Sin sombra ni hover (para listados densos) |
| `.card--bordered` | Borde 1px neutro en lugar de sombra |

---

## 3. Sistema de etiquetas y badges (FK-017)

Clase base `.badge`: píldora compacta (`border-radius: full`) con fuente 12px. Implementación: `css/components.css`.

### Colores semánticos

| Clase | Significado |
|-------|-------------|
| `.badge--primary` | Contenido destacado / categoría principal |
| `.badge--secondary` | Categoría alternativa (naranja cálido) |
| `.badge--success` | Estado positivo |
| `.badge--warning` | Precaución |
| `.badge--error` | Error o urgencia |
| `.badge--info` | Informativo |
| `.badge--neutral` | Neutro |

### Variantes

| Clase | Uso |
|-------|-----|
| `.badge--outline` | Sin fondo, borde del color del texto |
| `.badge--lg` | 14px con más padding |

---

## 4. Sistema de espaciados (FK-018)

Escala basada en múltiplos de 4px, definida en `variables.css`:

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--space-1` | 4px | Separaciones mínimas (icono-texto) |
| `--space-2` | 8px | Elementos relacionados |
| `--space-3` | 12px | Padding compacto |
| `--space-4` | 16px | Espaciado base entre elementos |
| `--space-6` | 24px | Padding de tarjetas, grupos |
| `--space-8` | 32px | Separación entre bloques |
| `--space-12` | 48px | Margen de títulos de sección |
| `--space-16` | 64px | Padding vertical de secciones (móvil) |
| `--space-20` | 80px | Padding vertical de secciones grandes |
| `--space-24/32` | 96/128px | Reservado para hero/CTA destacados |

**Reglas:**

1. Nunca usar valores intermedios ("magic numbers").
2. El espaciado dentro de un componente crece menos que el espaciado entre componentes.
3. Utilidades disponibles en `layout.css`: `.mt-*`, `.mb-*`, `.pt-*`, `.pb-*` (escalas 0–16).

---

## 5. Sistema responsive (FK-019)

Enfoque **mobile first**: estilos base para móvil; las media queries amplían progresivamente.

### Breakpoints

| Token | Valor | Dispositivo |
|-------|-------|-------------|
| `--breakpoint-sm` | 640px | Móvil grande |
| `--breakpoint-md` | 768px | Tablet |
| `--breakpoint-lg` | 1024px | Escritorio |
| `--breakpoint-xl` | 1280px | Escritorio grande |
| `--breakpoint-2xl` | 1536px | Pantallas anchas |

> Nota: como las custom properties de CSS no funcionan dentro de `@media`, los breakpoints se escriben literalmente en las queries; los tokens sirven como referencia única.

### Estrategia por componente

- **Contenedor**: max-width 1280px; padding lateral 16px → 24px (tablet) → 32px (escritorio).
- **Grids**: columnas automáticas — 1 col móvil, 2 tablet, 3–4 escritorio.
- **Header**: nav oculta bajo 1024px (menú hamburguesa).
- **Tipografía fluida**: `--text-4xl` a `--text-6xl` se reducen bajo 768px vía media query en `variables.css`.

### Utilidades de visibilidad (`layout.css`)

| Clase | Efecto |
|-------|--------|
| `.hide-mobile` | Oculto `<768px` |
| `.hide-tablet` | Oculto 768–1023px |
| `.hide-desktop` | Oculto `≥1024px` |
| `.show-mobile` / `.show-mobile-flex` | Visible solo `<768px` |
| `.show-tablet` / `.show-tablet-flex` | Visible solo 768–1023px |
| `.show-desktop` / `.show-desktop-flex` | Visible solo `≥1024px` |
