/* ========================================
   FORTUNE KIDS - CATALOG ENGINE
   Render de tarjetas y vistas: listado,
   category (?slug=) and detail (?id=).
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
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function getUrlParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    // Datos estructurados JSON-LD (fase 11)
    function ldInject(obj) {
        if (!document.head) return;
        try {
            const s = document.createElement('script');
            s.type = 'application/ld+json';
            s.textContent = JSON.stringify(obj);
            document.head.appendChild(s);
        } catch (e) {}
    }

    function ldBreadcrumb(items) {
        try {
            const base = document.baseURI || window.location.href;
            ldInject({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items.map(function (it, i) {
                    const li = { '@type': 'ListItem', position: i + 1, name: it.nombre };
                    if (it.url) li.item = new URL(it.url, base).href;
                    return li;
                })
            });
        } catch (e) {}
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
                        '<a class="card__link" href="contenido.html?id=' + encodeURIComponent(item.id) + '">Read more →</a>' +
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
                '<h3>No results found</h3>' +
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
                items = items.slice().sort(function (a, b) { return a.titulo.localeCompare(b.titulo, 'en'); });
            } else if (state.orden === 'za') {
                items = items.slice().sort(function (a, b) { return b.titulo.localeCompare(a.titulo, 'en'); });
            }

            const total = items.length;
            const visibleItems = items.slice(0, state.visibles);

            if (!total) {
                grid.innerHTML = emptyStateHTML(
                    'No content matches these filters. Try a different combination.',
                    'contenidos.html',
                    'View all content'
                );
            } else {
                renderCards(grid, visibleItems);
            }

            const counter = document.getElementById('listado-counter');
            if (counter) {
                counter.textContent = total === 1 ? '1 item' : visibleItems.length + ' of ' + total + ' items';
            }

            const moreBtn = document.getElementById('load-more');
            if (moreBtn) {
                moreBtn.hidden = visibleItems.length >= total;
            }
        }

        return { state: state, apply: apply };
    }

    // ----------------------------------------
    // Controls: filters, sorting and pagination
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

        // Category chips
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

        // Sorting
        const ordenSel = document.getElementById('orden');
        if (ordenSel) {
            ordenSel.addEventListener('change', function () {
                state.orden = ordenSel.value;
                resetPage();
                apply();
            });
        }

        // Load more
        const moreBtn = document.getElementById('load-more');
        if (moreBtn) {
            moreBtn.addEventListener('click', function () {
                state.visibles += PAGE_SIZE;
                apply();
            });
        }
    }

    // ----------------------------------------
    // View: category (FK-050)
    // ----------------------------------------

    function initCategory() {
        const grid = document.getElementById('categoria-grid');
        if (!grid) return;

        const slug = getUrlParam('slug');
        const cat = FK_CATEGORIAS[slug];

        const title = document.getElementById('categoria-title');
        const desc = document.getElementById('categoria-desc');

        if (!cat) {
            title.textContent = 'Category not found';
            desc.textContent = 'The category you are looking for does not exist or has been renamed.';
            grid.innerHTML = emptyStateHTML(
                'Browse all our content from the full listing.',
                'contenidos.html',
                'View all content'
            );
            return;
        }

        document.title = cat.nombre + ' | Fortune Kids';
        title.textContent = cat.nombre;
        desc.textContent = cat.descripcion;

        ldBreadcrumb([
            { nombre: 'Home', url: '../index.html' },
            { nombre: cat.nombre, url: 'categoria.html?slug=' + slug }
        ]);

        // Marcar breadcrumb actual
        const crumb = document.querySelector('.breadcrumbs__current');
        if (crumb) crumb.textContent = cat.nombre;

        const items = getItems(slug);
        if (!items.length) {
            grid.innerHTML = emptyStateHTML('No content has been published in this category yet.', 'contenidos.html', 'View other content');
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
            titleEl.textContent = 'Content not found';
            document.getElementById('detalle-meta').innerHTML = '';
            document.getElementById('detalle-cuerpo').innerHTML =
                '<p>The content you are looking for does not exist or has been moved.</p>' +
                '<a href="contenidos.html" class="btn btn--primary">View all content</a>';
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
            '<p class="detail__date">Published on <time datetime="' + item.fecha + '">' + formatDate(item.fecha) + '</time></p>';

        document.getElementById('detalle-cuerpo').innerHTML =
            item.contenido.map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');

        // Related: same category, excluding current item
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

        // Compartir (fase 11)
        const share = document.getElementById('detalle-share');
        if (share) {
            const url = window.location.href;
            const texto = item.titulo + ' | Fortune Kids';
            const wa = document.getElementById('share-wa');
            const fb = document.getElementById('share-fb');
            const x = document.getElementById('share-x');
            if (wa) wa.href = 'https://wa.me/?text=' + encodeURIComponent(texto + ' ' + url);
            if (fb) fb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
            if (x) x.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(texto) + '&url=' + encodeURIComponent(url);

            const copyBtn = document.getElementById('share-copy');
            if (copyBtn) {
                copyBtn.addEventListener('click', function () {
                    function marcarCopiado() {
                        copyBtn.classList.add('is-copied');
                        copyBtn.setAttribute('aria-label', 'Link copied');
                        setTimeout(function () {
                            copyBtn.classList.remove('is-copied');
                            copyBtn.setAttribute('aria-label', 'Copy link');
                        }, 2000);
                    }
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(url).then(marcarCopiado, function () {});
                    } else {
                        const tmp = document.createElement('input');
                        tmp.value = url;
                        document.body.appendChild(tmp);
                        tmp.select();
                        try { document.execCommand('copy'); marcarCopiado(); } catch (e) {}
                        document.body.removeChild(tmp);
                    }
                });
            }
            share.hidden = false;
        }

        // Datos estructurados Article (fase 11)
        ldInject({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: item.titulo,
            datePublished: item.fecha,
            inLanguage: 'en',
            author: { '@type': 'Organization', name: 'Fortune Kids' },
            publisher: { '@type': 'Organization', name: 'Fortune Kids' },
            mainEntityOfPage: window.location.href
        });

        ldBreadcrumb([
            { nombre: 'Home', url: '../index.html' },
            { nombre: 'Stories & news', url: 'contenidos.html' },
            { nombre: cat.nombre, url: 'categoria.html?slug=' + item.categoria },
            { nombre: item.titulo }
        ]);
    }

    // ----------------------------------------
    // View: search (FK-060..063)
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
                '<h3>No results for &ldquo;' + escapeHtml(q) + '&rdquo;</h3>' +
                '<p>We could not find any content matching your search. Try other words or explore by category:</p>' +
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
                'Type what you are looking for in the search box: stories, news, resources or events.',
                'contenidos.html',
                'Explore all content'
            );
            return;
        }

        title.textContent = 'Resultados para \u201C' + q + '\u201D';
        document.title = 'Search: ' + q + ' | Fortune Kids';
        const crumb = document.querySelector('.breadcrumbs__current');
        if (crumb) crumb.textContent = 'Search';

        const items = searchItems(q);
        if (!items.length) {
            counter.textContent = '';
            grid.innerHTML = noResultsHTML(q);
            return;
        }

        renderCards(grid, items);
        counter.textContent = items.length === 1 ? '1 result' : items.length + ' results';
    }

    // ----------------------------------------
    // Init depending on page
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

    // Minimal public API
    return {
        cardHTML: cardHTML,
        renderCards: renderCards,
        getItems: getItems
    };
})();
