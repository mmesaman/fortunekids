/* ========================================
   FORTUNE KIDS - MOTOR DE CATÁLOGO
   Render de tarjetas y vistas: listado,
   categoría (?slug=) y detalle (?id=).
   ======================================== */

const FKCatalog = (function () {
    'use strict';

    const PAGE_SIZE = 6;

    // ----------------------------------------
    // Utilidades
    // ----------------------------------------

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    }

    function formatDate(iso) {
        const d = new Date(iso + 'T00:00:00');
        return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function getUrlParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function byDateDesc(a, b) {
        return new Date(b.fecha) - new Date(a.fecha);
    }

    function getItems(categoriaSlug) {
        let items = FK_CONTENIDOS.slice().sort(byDateDesc);
        if (categoriaSlug && FK_CATEGORIAS[categoriaSlug]) {
            items = items.filter(function (it) { return it.categoria === categoriaSlug; });
        }
        return items;
    }

    // ----------------------------------------
    // Tarjetas reutilizables (FK-053)
    // ----------------------------------------

    function cardHTML(item) {
        const cat = FK_CATEGORIAS[item.categoria] || {};
        const tipo = FK_TIPOS[item.tipo] || {};
        const grad = 'story-card__media--' + item.categoria;
        return (
            '<article class="card story-card content-card">' +
                '<a class="story-card__media ' + grad + '" href="contenido.html?id=' + encodeURIComponent(item.id) + '" aria-hidden="true" tabindex="-1">' +
                    '<span class="badge ' + (tipo.badge || '') + ' story-card__badge">' + escapeHtml(tipo.etiqueta || '') + '</span>' +
                '</a>' +
                '<div class="card__content">' +
                    '<span class="content-card__meta">' + escapeHtml(cat.nombre || '') + '</span>' +
                    '<h3 class="card__title"><a href="contenido.html?id=' + encodeURIComponent(item.id) + '">' + escapeHtml(item.titulo) + '</a></h3>' +
                    '<p class="card__text">' + escapeHtml(item.resumen) + '</p>' +
                    '<div class="content-card__footer">' +
                        '<time datetime="' + item.fecha + '">' + formatDate(item.fecha) + '</time>' +
                        '<a class="card__link" href="contenido.html?id=' + encodeURIComponent(item.id) + '">Leer más →</a>' +
                    '</div>' +
                '</div>' +
            '</article>'
        );
    }

    function renderCards(container, items) {
        container.innerHTML = items.map(cardHTML).join('');
    }

    function emptyStateHTML(mensaje, volverHref, volverTexto) {
        return (
            '<div class="empty-state">' +
                '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' +
                '<h3>No hay resultados</h3>' +
                '<p>' + escapeHtml(mensaje) + '</p>' +
                '<a href="' + volverHref + '" class="btn btn--secondary">' + escapeHtml(volverTexto) + '</a>' +
            '</div>'
        );
    }

    // ----------------------------------------
    // Vista: listado completo (FK-051)
    // ----------------------------------------

    function initListing() {
        const grid = document.getElementById('listado-grid');
        if (!grid) return null;

        const state = {
            categoria: getUrlParam('slug') || '',
            tipo: '',
            orden: 'recientes',
            visibles: PAGE_SIZE
        };

        function apply() {
            let items = getItems(state.categoria);

            if (state.tipo) {
                items = items.filter(function (it) { return it.tipo === state.tipo; });
            }
            if (state.orden === 'antiguos') {
                items = items.slice().reverse();
            } else if (state.orden === 'az') {
                items = items.slice().sort(function (a, b) { return a.titulo.localeCompare(b.titulo, 'es'); });
            } else if (state.orden === 'za') {
                items = items.slice().sort(function (a, b) { return b.titulo.localeCompare(a.titulo, 'es'); });
            }

            const total = items.length;
            const visibleItems = items.slice(0, state.visibles);

            if (!total) {
                grid.innerHTML = emptyStateHTML(
                    'No hay contenidos con estos filtros. Prueba con otra combinación.',
                    'contenidos.html',
                    'Ver todos los contenidos'
                );
            } else {
                renderCards(grid, visibleItems);
            }

            const counter = document.getElementById('listado-counter');
            if (counter) {
                counter.textContent = total === 1 ? '1 contenido' : visibleItems.length + ' de ' + total + ' contenidos';
            }

            const moreBtn = document.getElementById('load-more');
            if (moreBtn) {
                moreBtn.hidden = visibleItems.length >= total;
            }
        }

        return { state: state, apply: apply };
    }

    // ----------------------------------------
    // Controles: filtros, orden y paginación
    // (FK-054 / FK-055 / FK-056)
    // ----------------------------------------

    function initControls() {
        const api = window.FKListado;
        if (!api) return;

        const state = api.state;
        const apply = api.apply;

        function resetPage() {
            state.visibles = PAGE_SIZE;
        }

        // Chips de categoría
        const chips = Array.prototype.slice.call(document.querySelectorAll('[data-filter-categoria]'));
        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                state.categoria = chip.getAttribute('data-filter-categoria');
                resetPage();
                chips.forEach(function (c) {
                    const active = c === chip;
                    c.classList.toggle('is-active', active);
                    c.setAttribute('aria-pressed', String(active));
                });
                apply();
            });
        });

        // Estado inicial desde ?slug=
        chips.forEach(function (c) {
            const active = c.getAttribute('data-filter-categoria') === state.categoria;
            c.classList.toggle('is-active', active);
            c.setAttribute('aria-pressed', String(active));
        });

        // Tipo de contenido
        const tipoSel = document.getElementById('filtro-tipo');
        if (tipoSel) {
            tipoSel.addEventListener('change', function () {
                state.tipo = tipoSel.value;
                resetPage();
                apply();
            });
        }

        // Ordenación
        const ordenSel = document.getElementById('orden');
        if (ordenSel) {
            ordenSel.addEventListener('change', function () {
                state.orden = ordenSel.value;
                resetPage();
                apply();
            });
        }

        // Cargar más
        const moreBtn = document.getElementById('load-more');
        if (moreBtn) {
            moreBtn.addEventListener('click', function () {
                state.visibles += PAGE_SIZE;
                apply();
            });
        }
    }

    // ----------------------------------------
    // Vista: categoría (FK-050)
    // ----------------------------------------

    function initCategory() {
        const grid = document.getElementById('categoria-grid');
        if (!grid) return;

        const slug = getUrlParam('slug');
        const cat = FK_CATEGORIAS[slug];

        const title = document.getElementById('categoria-title');
        const desc = document.getElementById('categoria-desc');

        if (!cat) {
            title.textContent = 'Categoría no encontrada';
            desc.textContent = 'La categoría que buscas no existe o ha cambiado de nombre.';
            grid.innerHTML = emptyStateHTML(
                'Explora todos nuestros contenidos desde el listado completo.',
                'contenidos.html',
                'Ver todos los contenidos'
            );
            return;
        }

        document.title = cat.nombre + ' | Fortune Kids';
        title.textContent = cat.nombre;
        desc.textContent = cat.descripcion;

        // Marcar breadcrumb actual
        const crumb = document.querySelector('.breadcrumbs__current');
        if (crumb) crumb.textContent = cat.nombre;

        const items = getItems(slug);
        if (!items.length) {
            grid.innerHTML = emptyStateHTML('Aún no hay contenidos publicados en esta categoría.', 'contenidos.html', 'Ver otros contenidos');
            return;
        }
        renderCards(grid, items);
    }

    // ----------------------------------------
    // Vista: detalle (FK-052)
    // ----------------------------------------

    function initDetail() {
        const titleEl = document.getElementById('detalle-titulo');
        if (!titleEl) return;

        const id = getUrlParam('id');
        const item = FK_CONTENIDOS.find(function (it) { return it.id === id; });
        const catCrumb = document.getElementById('breadcrumb-categoria');

        if (!item) {
            titleEl.textContent = 'Contenido no encontrado';
            document.getElementById('detalle-meta').innerHTML = '';
            document.getElementById('detalle-cuerpo').innerHTML =
                '<p>El contenido que buscas no existe o ha sido movido.</p>' +
                '<a href="contenidos.html" class="btn btn--primary">Ver todos los contenidos</a>';
            return;
        }

        const cat = FK_CATEGORIAS[item.categoria] || {};
        const tipo = FK_TIPOS[item.tipo] || {};

        document.title = item.titulo + ' | Fortune Kids';
        titleEl.textContent = item.titulo;
        catCrumb.innerHTML = '<a href="categoria.html?slug=' + encodeURIComponent(item.categoria) + '" class="breadcrumbs__link">' + escapeHtml(cat.nombre) + '</a>';

        document.getElementById('detalle-meta').innerHTML =
            '<span class="badge ' + (tipo.badge || '') + '">' + escapeHtml(tipo.etiqueta) + '</span> ' +
            '<span class="badge badge--neutral"><a href="categoria.html?slug=' + encodeURIComponent(item.categoria) + '">' + escapeHtml(cat.nombre) + '</a></span>' +
            '<p class="detail__date">Publicado el <time datetime="' + item.fecha + '">' + formatDate(item.fecha) + '</time></p>';

        document.getElementById('detalle-cuerpo').innerHTML =
            item.contenido.map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');

        // Relacionados: misma categoría, excluyendo el actual
        const relGrid = document.getElementById('relacionados-grid');
        const related = FK_CONTENIDOS
            .filter(function (it) { return it.categoria === item.categoria && it.id !== item.id; })
            .sort(byDateDesc)
            .slice(0, 3);

        if (relGrid) {
            if (related.length) {
                relGrid.innerHTML = related.map(cardHTML).join('');
            } else {
                document.getElementById('relacionados-section').hidden = true;
            }
        }
    }

    // ----------------------------------------
    // Vista: búsqueda (FK-060..063)
    // ----------------------------------------

    function searchItems(q) {
        const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
        if (!tokens.length) return [];
        return getItems().filter(function (it) {
            const cat = FK_CATEGORIAS[it.categoria] || {};
            const tipo = FK_TIPOS[it.tipo] || {};
            const haystack = [it.titulo, it.resumen, cat.nombre || '', tipo.etiqueta || '']
                .concat(it.contenido)
                .join(' ')
                .toLowerCase();
            return tokens.every(function (t) { return haystack.indexOf(t) !== -1; });
        });
    }

    function noResultsHTML(q) {
        const chips = Object.keys(FK_CATEGORIAS).map(function (slug) {
            return '<a class="btn btn--secondary btn--sm" href="categoria.html?slug=' + encodeURIComponent(slug) + '">' + escapeHtml(FK_CATEGORIAS[slug].nombre) + '</a>';
        }).join('');
        return (
            '<div class="empty-state">' +
                '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' +
                '<h3>Sin resultados para &ldquo;' + escapeHtml(q) + '&rdquo;</h3>' +
                '<p>No encontramos contenidos que coincidan con tu búsqueda. Prueba con otras palabras o explora por categoría:</p>' +
                '<div class="empty-state__links">' + chips + '</div>' +
            '</div>'
        );
    }

    function initSearchPage() {
        const grid = document.getElementById('busqueda-grid');
        if (!grid) return;

        const q = (getUrlParam('q') || '').trim();
        const input = document.getElementById('busqueda-input');
        const title = document.getElementById('busqueda-title');
        const counter = document.getElementById('busqueda-counter');

        if (input) input.value = q;

        if (!q) {
            grid.innerHTML = emptyStateHTML(
                'Escribe en el buscador lo que quieras encontrar: historias, noticias, recursos o eventos.',
                'contenidos.html',
                'Explorar todo el contenido'
            );
            return;
        }

        title.textContent = 'Resultados para \u201C' + q + '\u201D';
        document.title = 'Búsqueda: ' + q + ' | Fortune Kids';
        const crumb = document.querySelector('.breadcrumbs__current');
        if (crumb) crumb.textContent = 'Búsqueda';

        const items = searchItems(q);
        if (!items.length) {
            counter.textContent = '';
            grid.innerHTML = noResultsHTML(q);
            return;
        }

        renderCards(grid, items);
        counter.textContent = items.length === 1 ? '1 resultado' : items.length + ' resultados';
    }

    // ----------------------------------------
    // Init según página
    // ----------------------------------------

    function init() {
        const api = initListing();
        if (api) {
            window.FKListado = api; // usado por initControls
            api.apply();
            initControls();
        }
        initCategory();
        initSearchPage();
        initDetail();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // API pública mínima
    return {
        cardHTML: cardHTML,
        renderCards: renderCards,
        getItems: getItems
    };
})();
