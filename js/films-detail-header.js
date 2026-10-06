/* =========================================================
   MARK THOMAS FILMS — INDIVIDUAL FILM HEADER

   Film hierarchy/classification lives in films-breadcrumbs.js.
   Shared breadcrumb rendering + schema live in site-breadcrumbs.js.

   This file owns only the individual-film title and linked
   venue/location subtitle presentation.
   ========================================================= */
(function () {
  'use strict';

  window.MTF = window.MTF || {};
  const MTF = window.MTF;

  function isIndividualFilmPage() {
    const logic = MTF.filmBreadcrumbs;

    if (
      logic &&
      typeof logic.trimPath === 'function'
    ) {
      return /^\/films\/(?!tag\/|category\/)[^/]+$/i.test(
        logic.trimPath(window.location.pathname)
      );
    }

    return /^\/films\/(?!tag\/|category\/)[^/]+$/i.test(
      window.location.pathname.replace(/\/+$/, '')
    );
  }

  function findNativeTitle(header) {
    return header.querySelector(
      'h1.entry-title, h1.blog-item-title, ' +
      'h2.entry-title, h2.blog-item-title, ' +
      'h1, h2'
    );
  }

  function appendSubtitleSeparator(parent, value) {
    const separator = document.createElement('span');
    separator.className = 'mtf-film-detail__subtitle-separator';
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = value;
    parent.appendChild(separator);
  }

  function appendSubtitleTag(parent, tagName, label) {
    if (!tagName) return;

    const logic = MTF.filmBreadcrumbs;

    if (
      !logic ||
      typeof logic.tagURL !== 'function'
    ) {
      return;
    }

    const link = document.createElement('a');
    link.className = 'mtf-film-detail__subtitle-link';
    link.href = logic.tagURL(tagName);
    link.textContent = label || tagName;
    parent.appendChild(link);
  }

  function makeLocationSubtitle(location) {
    const subtitle = document.createElement('p');
    subtitle.className = 'mtf-film-detail__subtitle';

    const venues = Array.isArray(location.venues)
      ? location.venues
      : [];

    const cities =
      Array.isArray(location.cities) && location.cities.length
        ? location.cities
        : (location.city ? [location.city] : []);

    venues.forEach(function (venue, index) {
      if (index > 0) {
        appendSubtitleSeparator(subtitle, '  ·  ');
      }

      appendSubtitleTag(subtitle, venue);
    });

    const hasDestination = Boolean(
      cities.length ||
      location.state ||
      (location.country && location.country !== 'United States')
    );

    if (venues.length && hasDestination) {
      appendSubtitleSeparator(subtitle, '  ·  ');
    }

    cities.forEach(function (city, index) {
      if (index > 0) {
        appendSubtitleSeparator(subtitle, ' / ');
      }

      appendSubtitleTag(subtitle, city);
    });

    if (location.state) {
      if (cities.length) {
        appendSubtitleSeparator(subtitle, ', ');
      }

      appendSubtitleTag(
        subtitle,
        location.stateTag || location.state,
        location.state
      );
    }

    if (
      location.country &&
      location.country !== 'United States'
    ) {
      if (cities.length || location.state) {
        appendSubtitleSeparator(subtitle, ', ');
      }

      appendSubtitleTag(
        subtitle,
        location.countryTag || location.country,
        location.country
      );
    }

    return subtitle.childNodes.length ? subtitle : null;
  }

  function init() {
    if (!isIndividualFilmPage()) return null;

    const logic = MTF.filmBreadcrumbs;
    const shared = MTF.siteBreadcrumbs;

    if (
      !logic ||
      !shared ||
      typeof logic.findCurrentFilm !== 'function' ||
      typeof logic.classifyTags !== 'function' ||
      typeof logic.filmItems !== 'function' ||
      typeof shared.create !== 'function'
    ) {
      console.warn(
        'Mark Thomas Films: shared breadcrumb modules must load before films-detail-header.js.'
      );

      return null;
    }

    const existing = document.querySelector(
      '.blog-item-top-wrapper > .mtf-breadcrumbs'
    );

    if (existing) return existing;

    const film = logic.findCurrentFilm();

    if (!film || !film.title) return null;

    const header = document.querySelector(
      '.blog-item-top-wrapper'
    );

    if (!header) return null;

    const title = findNativeTitle(header);

    if (!title) return null;

    const location = logic.classifyTags(film.tags);
    const crumbs = logic.filmItems(film, location);

    const nav = shared.create(
      crumbs,
      {
        ariaLabel: 'Wedding film breadcrumbs',
        className: 'mtf-breadcrumbs--film-detail'
      }
    );

    header.insertBefore(nav, header.firstChild);

    /*
     * Preserve Squarespace's native H1 and native meta/SEO tags.
     */
    title.textContent = film.title;
    title.classList.add('mtf-film-detail__couple-title');
    header.classList.add('mtf-film-detail-header');

    const subtitle = makeLocationSubtitle(location);

    if (subtitle) {
      title.insertAdjacentElement('afterend', subtitle);
    }

    if (typeof shared.syncSchema === 'function') {
      shared.syncSchema(crumbs);
    }

    return nav;
  }

  MTF.filmDetailHeader = {
    init: init,
    classifyTags: function (tags) {
      return MTF.filmBreadcrumbs.classifyTags(tags);
    },
    breadcrumbItems: function (film, location) {
      return MTF.filmBreadcrumbs.filmItems(film, location);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
