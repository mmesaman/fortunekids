# Fortune Kids Web

Repositorio de la web de Fortune Kids, una organización local en Arusha, Tanzania, que trabaja por el desarrollo de niños, jóvenes y comunidades.

## Estructura del Proyecto

```
fortune-kids-web/
├── index.html                 # Página principal
├── css/
│   ├── variables.css          # Tokens de diseño (colores, tipografías, espaciados)
│   ├── base.css               # Estilos base y reset
│   ├── layout.css             # Utilidades de layout
│   └── components.css         # Estilos de componentes reutilizables
├── js/
│   └── main.js                # JavaScript principal
├── assets/
│   ├── images/                # Imágenes del proyecto
│   ├── fonts/                 # Fuentes personalizadas
│   └── icons/                 # Iconos
├── pages/                     # Páginas internas
├── .gitignore                 # Archivos excluidos del repositorio
└── README.md                  # Este archivo
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Flexbox, Grid, Media Queries
- **JavaScript**: Vanilla JS, ES6+, Intersection Observer API

## Sistema de Diseño

### Colores

- **Primario**: Azules (#0ea5e9 a #0c4a6e)
- **Secundario**: Naranjas (#f97316 a #7c2d12) - Inspirados en Tanzania
- **Neutrales**: Gris (#fafafa a #171717)

### Tipografías

- **Inter**: Texto general
- **Playfair Display**: Títulos y encabezados

### Espaciados

Sistema de espaciado basado en múltiplos de 4px:
- space-1: 4px
- space-2: 8px
- space-3: 12px
- space-4: 16px
- space-6: 24px
- space-8: 32px
- space-12: 48px
- space-16: 64px

## Componentes

- **Button**: Botones primarios, secundarios y blancos
- **Card**: Tarjetas de contenido
- **Badge**: Etiquetas de estado
- **Modal**: Ventanas modales
- **Dropdown**: Menús desplegables
- **Tabs**: Pestañas de contenido
- **Accordion**: Acordeones expandibles
- **Form**: Formularios con validación

## Desarrollo

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)

### Iniciar Desarrollo

1. Clonar el repositorio
2. Abrir `index.html` en el navegador
3. Editar archivos en tu editor favorito

### Buenas Prácticas

- Usar las variables CSS definidas en `variables.css`
- Seguir la metodología BEM para nomenclatura de clases
- Mantener los componentes reutilizables en `components.css`
- Probar en diferentes dispositivos y navegadores

## Responsive Design

Breakpoints definidos:
- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: ≥ 1024px

## Próximos Pasos

1. ✅ Definir estructura inicial del proyecto (FK-001..008)
2. ✅ Arquitectura y sistemas de diseño documentados (FK-010..019)
3. ✅ Página Home completa con todas sus secciones (FK-020..030)
4. ⏳ Implementar navegación entre páginas (FK-040..045)
5. ⏳ Implementar páginas interiores (FK-050..)
6. ⏳ Añadir contenido real
7. ⏳ Optimizar y publicar

## Licencia

© 2026 Fortune Kids. Todos los derechos reservados.