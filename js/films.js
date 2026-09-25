
/* =========================================================
   MARK THOMAS FILMS — FILMS PAGE CONTROLLER

   /films                               main listing
   /films/tag/Kendall+Point             tag archive
   /films?offset=...&tag=Kendall+Point   paginated tag archive
   /films/category/weddings             category archive
   /films/individual-film               related films + shared About

   No anchor flag: populated context fields determine sections.
   ========================================================= */

(function () {
  'use strict';

  window.MTF = window.MTF || {};


  function normalizeContextKey(value) {
    return value ? String(value).trim().toLowerCase()
      .replace(/[’‘]/g, "'").replace(/\s+/g, ' ') : '';
  }


  function getCurrentArchive() {
    const pathname = window.location.pathname;
    const pathMatch = pathname.match(/^\/films\/(tag|category)\/([^/]+)\/?$/i);

    if (pathMatch) {
      /* Decode literal URL + as a space, but preserve encoded %2B. */
      let name = pathMatch[2].replace(/\+/g, ' ');

      try {
        name = decodeURIComponent(name);
      } catch (error) {
        /* Keep URL text. */
      }

      return {
        type: pathMatch[1].toLowerCase(),
        name: name.trim()
      };
    }

    /* Squarespace switches to query-string URLs on later archive pages. */

    if (/^\/films\/?$/i.test(pathname)) {
      const params = new URLSearchParams(window.location.search);

      if (params.get('tag')) {
        return {
          type: 'tag',
          name: params.get('tag').trim()
        };
      }

      if (params.get('category')) {
        return {
          type: 'category',
          name: params.get('category').trim()
        };
      }
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

    if (Object.prototype.hasOwnProperty.call(source, key)) {
      return source[key];
    }

    const match = Object.keys(source).find(function (sourceKey) {
      return normalizeContextKey(sourceKey) === key;
    });

    return match ? source[match] : null;
  }


  function isLaterPage() {
    const params = new URLSearchParams(window.location.search);

    return params.has('offset') || params.has('page');
  }


  /* =========================================================
     INDIVIDUAL FILM PAGES
     ========================================================= */

  function isIndividualFilmPage() {
    const path = window.location.pathname.replace(/\/+$/, '');

    return /^\/films\/[^/]+$/i.test(path);
  }


  function initIndividualFilm() {

    /*
     * With no archive context, films-footer.js renders
     * only the universal About sections.
     *
     * It inserts them immediately before the existing
     * testimonials.
     */

    let sharedFooter = document.querySelector(
      '.mtf-films-footer'
    );

    if (
      !sharedFooter &&
      window.MTF.filmFooter &&
      typeof window.MTF.filmFooter.render === 'function'
    ) {
      sharedFooter = window.MTF.filmFooter.render(
        null,
        null
      );
    }


    /*
     * Related films must appear before About and
     * testimonials, after all wedding-specific content.
     *
     * films-related-ui.js starts retrieving both
     * featured images as soon as its cards are created.
     */

    const anchor =
      sharedFooter ||
      document.querySelector('.mtf-film-testimonials') ||
      document.querySelector('#footer-sections') ||
      document.querySelector('footer.sections') ||
      document.querySelector('body > footer');


    if (
      anchor &&
      anchor.parentNode &&
      window.MTF.filmRelatedUI &&
      typeof window.MTF.filmRelatedUI.init === 'function'
    ) {

      window.MTF.filmRelatedUI.init({
        before: anchor
      });

    }
  }


  /* =========================================================
     MAIN PAGE CONTROLLER
     ========================================================= */

  function initFilms() {

    if (
      !/^\/films(?:\/|$)/i.test(
        window.location.pathname
      )
    ) {
      return;
    }

    const filmGrid = document.querySelector(
      '.blog-basic-grid.collection-content-wrapper'
    );

    const filmCards = document.querySelectorAll(
      '.blog-basic-grid article.blog-item'
    );


    /*
     * Testimonials belong on both archive pages and
     * individual film pages.
     */

    if (
      window.MTF.filmTestimonialsUI &&
      typeof window.MTF.filmTestimonialsUI.init === 'function'
    ) {

      window.MTF.filmTestimonialsUI.init({
        filmGrid: filmGrid
      });

    }


    /*
     * Individual films receive related recommendations
     * and shared About content, but no archive-specific
     * headers, footers or SEO sections.
     */

    if (isIndividualFilmPage()) {

      initIndividualFilm();

      return;

    }


    /* =====================================================
       FILM ARCHIVES
       ===================================================== */

    if (!filmGrid || !filmCards.length) {
      return;
    }


    const archive = getCurrentArchive();

    const context = getArchiveContext(archive);

    const compact = isLaterPage();


    /*
     * Tag/category heading or main film browser.
     */

    if (archive) {

      if (
        window.MTF.filmHeader &&
        typeof window.MTF.filmHeader.render === 'function'
      ) {

        window.MTF.filmHeader.render(
          archive,
          context,
          filmGrid,
          { compact: compact }
        );

      }

    } else if (
      window.MTF.filmBrowser &&
      typeof window.MTF.filmBrowser.buildMain === 'function'
    ) {

      window.MTF.filmBrowser.buildMain(
        filmGrid
      );

    }


    /*
     * Avoid repeating extended SEO copy on
     * paginated archive pages.
     */

    if (
      !compact &&
      window.MTF.filmFooter &&
      typeof window.MTF.filmFooter.render === 'function'
    ) {

      window.MTF.filmFooter.render(
        archive,
        context
      );

    }


    /*
     * Process existing Squarespace film cards.
     */

    if (
      window.MTF.filmCards &&
      typeof window.MTF.filmCards.process === 'function'
    ) {

      filmCards.forEach(function (post) {

        window.MTF.filmCards.process(
          post
        );

      });

    }

  }


  window.MTF.films = {
    init: initFilms
  };


  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      initFilms,
      { once: true }
    );

  } else {

    initFilms();

  }

})();
