/* =========================================================
   MARK THOMAS FILMS — FILMS PAGE CONTROLLER

   /films                               main listing
   /films/tag/Kendall+Point             tag archive
   /films?offset=...&tag=Kendall+Point   paginated tag archive
   /films/category/weddings             category archive
   /films/individual-film               leave archive sections off

   No anchor flag: populated context fields determine sections.
   ========================================================= */
(function () {
  'use strict';
  window.MTF = window.MTF || {};

  function normalizeContextKey(value) {
    return value ? String(value).trim().toLowerCase()
      .replace(/[’‘]/g, "'").replace(/\s+/g, ' ') : '';
  }

  /* Keep Squarespace's native older/newer URLs and rename only labels. */
  function renameFilmPagination() {
    document.querySelectorAll('.blog-list-pagination .older a').forEach(function (link) {
      const label = link.querySelector('.next-label') || link.querySelector('span');
      if (label) label.textContent = 'Older Films';
    });
    document.querySelectorAll('.blog-list-pagination .newer a').forEach(function (link) {
      const label = link.querySelector('.prev-label, .previous-label') || link.querySelector('span');
      if (label) label.textContent = 'Newer Films';
    });
  }

  function getCurrentArchive() {
    const pathname = window.location.pathname;
    const pathMatch = pathname.match(/^\/films\/(tag|category)\/([^/]+)\/?$/i);
    if (pathMatch) {
      /* Decode literal URL + as a space, but preserve encoded %2B. */
      let name = pathMatch[2].replace(/\+/g, ' ');
      try { name = decodeURIComponent(name); } catch (error) { /* Keep URL text. */ }
      return { type: pathMatch[1].toLowerCase(), name: name.trim() };
    }

    /* Squarespace switches to query-string URLs on later archive pages. */
    if (/^\/films\/?$/i.test(pathname)) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tag')) return { type: 'tag', name: params.get('tag').trim() };
      if (params.get('category')) return { type: 'category', name: params.get('category').trim() };
    }
    return null;
  }

  function getArchiveContext(archive) {
    if (!archive) return null;
    const source = archive.type === 'tag'
      ? window.MTF.filmTagContext
      : window.MTF.filmCategoryContext;
    if (!source || typeof source !== 'object') return null;
    const key = normalizeContextKey(archive.name);
    if (Object.prototype.hasOwnProperty.call(source, key)) return source[key];
    const match = Object.keys(source).find(function (sourceKey) {
      return normalizeContextKey(sourceKey) === key;
    });
    return match ? source[match] : null;
  }

  function isLaterPage() {
    const params = new URLSearchParams(window.location.search);
    return params.has('offset') || params.has('page');
  }

  function initFilms() {
    if (!/^\/films(?:\/|$)/i.test(window.location.pathname)) return;
    renameFilmPagination();

    const filmGrid = document.querySelector('.blog-basic-grid.collection-content-wrapper');
    const filmCards = document.querySelectorAll('.blog-basic-grid article.blog-item');

    /* Retain testimonials on individual film pages exactly as before. */
    if (window.MTF.filmTestimonialsUI &&
        typeof window.MTF.filmTestimonialsUI.init === 'function') {
      window.MTF.filmTestimonialsUI.init({ filmGrid: filmGrid });
    }

    /* No archive header/footer on an individual film page. */
    if (!filmGrid || !filmCards.length) return;

    const archive = getCurrentArchive();
    const context = getArchiveContext(archive);
    const compact = isLaterPage();

    if (archive) {
      if (window.MTF.filmHeader &&
          typeof window.MTF.filmHeader.render === 'function') {
        window.MTF.filmHeader.render(archive, context, filmGrid, { compact: compact });
      }
    } else if (window.MTF.filmBrowser &&
               typeof window.MTF.filmBrowser.buildMain === 'function') {
      window.MTF.filmBrowser.buildMain(filmGrid);
    }

    /* Avoid repeating extended SEO copy on paginated archive pages. */
    if (!compact && window.MTF.filmFooter &&
        typeof window.MTF.filmFooter.render === 'function') {
      window.MTF.filmFooter.render(archive, context);
    }

    if (window.MTF.filmCards &&
        typeof window.MTF.filmCards.process === 'function') {
      filmCards.forEach(function (post) { window.MTF.filmCards.process(post); });
    }
  }

  window.MTF.films = { init: initFilms };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilms, { once: true });
  } else {
    initFilms();
  }
})();
