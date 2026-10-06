/* =========================================================
   MARK THOMAS FILMS — TAG/CATEGORY HEADER

   Tag pages use exactly one concise header.paragraph.
   Tag breadcrumbs use films-breadcrumbs.js for hierarchy and
   site-breadcrumbs.js for shared rendering + schema.
   Category/fallback contexts may still use paragraphs arrays.
   Missing or empty optional fields render nothing.
   ========================================================= */
(function () {
  'use strict';
  window.MTF = window.MTF || {};

  function text(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function vimeoId(value) {
    const source = text(value);
    if (!source) return '';

    if (/^\d+$/.test(source)) return source;

    try {
      const url = new URL(source, window.location.origin);
      const match = url.pathname.match(/(?:\/video)?\/(\d+)(?:\/|$)/);
      return match ? match[1] : '';
    } catch (error) {
      const match = source.match(/(?:vimeo\.com\/(?:video\/)?)?(\d{6,})/i);
      return match ? match[1] : '';
    }
  }

  function heroVideoURL(header) {
    return text(header && header.heroVideoUrl) ||
      text(window.MTF.defaultFilmHeroVideoUrl);
  }

  function createHeroVideo(header, context) {
    const source = heroVideoURL(header);
    const id = vimeoId(source);
    if (!id) return null;

    const reduceMotion = Boolean(
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const hero = document.createElement('div');
    hero.className = 'mtf-films-header__hero' +
      (reduceMotion ? ' mtf-films-header__hero--reduced-motion' : '');

    const iframe = document.createElement('iframe');
    iframe.className = 'mtf-films-header__hero-frame';
    iframe.src = 'https://player.vimeo.com/video/' + id +
      (reduceMotion
        ? '?autoplay=0&muted=1&loop=0&controls=1&title=0&byline=0&portrait=0&dnt=1'
        : '?autoplay=1&muted=1&loop=1&background=1&autopause=0&playsinline=1&dnt=1');
    iframe.title = text(context && context.name)
      ? context.name.trim() + ' wedding film hero'
      : 'Mark Thomas Films wedding film hero';
    iframe.loading = 'eager';
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    if (!reduceMotion) {
      iframe.setAttribute('tabindex', '-1');
    }

    hero.appendChild(iframe);
    return hero;
  }

  function paragraphs(parent, values, className) {
    if (!Array.isArray(values)) return 0;
    let count = 0;
    values.forEach(function (value) {
      if (!text(value)) return;
      const p = document.createElement('p');
      p.className = className;
      p.textContent = value.trim();
      parent.appendChild(p);
      count += 1;
    });
    return count;
  }

  function render(archive, context, filmGrid, options) {
    if (!archive || !filmGrid || !filmGrid.parentNode) return null;
    const existing = document.querySelector('.mtf-archive-context');
    if (existing) return existing;

    options = options || {};
    const compact = Boolean(options.compact);
    const header = !compact && context && context.header || {};
    const enhanced = !compact && Boolean(
      text(header.title) || text(header.subtitle) ||
      text(header.galleryTitle) || text(header.eyebrow)
    );
    const intro = !compact && enhanced
      ? (text(header.paragraph) ? [header.paragraph.trim()] : [])
      : (!compact && context && Array.isArray(context.paragraphs)
          ? context.paragraphs
          : []);

    const section = document.createElement('section');
    section.className = 'mtf-archive-context mtf-films-header' +
      (enhanced ? ' mtf-section mtf-films-header--enhanced' : '');
    section.setAttribute('aria-label', 'Wedding film archive');

    const inner = document.createElement('div');
    inner.className = 'mtf-films-header__inner';
    section.appendChild(inner);

    const headingWrap = document.createElement('div');
    headingWrap.className = enhanced ? 'mtf-section__heading' : '';

    if (enhanced) {
      if (text(header.eyebrow)) {
        const eyebrow = document.createElement('p');
        eyebrow.className = 'mtf-section__eyebrow';
        eyebrow.textContent = header.eyebrow.trim();
        headingWrap.appendChild(eyebrow);
      }
    } else {
      const label = document.createElement('p');
      label.className = 'mtf-archive-context-label';
      label.textContent = archive.type === 'tag'
        ? 'Browse wedding films related to:'
        : 'Browse wedding films in this collection:';
      headingWrap.appendChild(label);
    }

    const headingText = text(header.title) || text(context && context.name) || archive.name;

    /*
     * This is the primary heading for tag/category archive pages.
     * Squarespace renders each native film-card title as an H1, but
     * films-cards.js normalizes those card headings to H2 after this
     * archive header is created.
     */
    const title = document.createElement('h1');
    title.className = 'mtf-archive-context-title' +
      (enhanced ? ' mtf-section__title mtf-section__title--display' : '');
    title.textContent = headingText;
    headingWrap.appendChild(title);

    if (text(header.subtitle)) {
      const subtitle = document.createElement('p');
      subtitle.className = 'mtf-films-header__subtitle';
      subtitle.textContent = header.subtitle.trim();
      headingWrap.appendChild(subtitle);
    }
    inner.appendChild(headingWrap);

    const countSlot = document.createElement('div');
    countSlot.className = 'mtf-film-count-slot';

    function renderHero() {
      if (!enhanced) return;
      const hero = createHeroVideo(header, context);
      if (hero) inner.appendChild(hero);
    }

    function renderIntro() {
      if (!Array.isArray(intro) || !intro.some(text)) return;
      const copy = document.createElement('div');
      copy.className = 'mtf-archive-context-copy mtf-films-header__intro mtf-section__prose';
      paragraphs(copy, intro, 'mtf-archive-context-paragraph');
      if (copy.childElementCount) inner.appendChild(copy);
    }

    function renderBrowser() {
      if (!window.MTF.filmBrowser ||
          typeof window.MTF.filmBrowser.createArchive !== 'function') return;
      const browser = window.MTF.filmBrowser.createArchive(
        filmGrid, archive.type === 'tag' ? archive.name : null
      );
      if (browser) inner.appendChild(browser);
    }

    if (enhanced) {
      renderHero();
      renderIntro();
      if (text(header.galleryTitle)) {
        const galleryTitle = document.createElement('h2');
        galleryTitle.className = 'mtf-films-header__gallery-title';
        galleryTitle.textContent = header.galleryTitle.trim();
        inner.appendChild(galleryTitle);
      }
      inner.appendChild(countSlot);
      renderBrowser();
    } else {
      inner.appendChild(countSlot);
      renderBrowser();
      renderIntro();
    }

    if (
      !compact &&
      archive.type === 'tag' &&
      window.MTF.filmBreadcrumbs &&
      window.MTF.siteBreadcrumbs &&
      typeof window.MTF.filmBreadcrumbs.archiveItems === 'function' &&
      typeof window.MTF.siteBreadcrumbs.create === 'function'
    ) {
      const crumbs = window.MTF.filmBreadcrumbs.archiveItems(
        archive,
        context
      );

      if (crumbs.length) {
        const nav = window.MTF.siteBreadcrumbs.create(
          crumbs,
          {
            ariaLabel: 'Wedding film breadcrumbs',
            className: 'mtf-breadcrumbs--films-tag'
          }
        );

        filmGrid.parentNode.insertBefore(nav, filmGrid);

        if (typeof window.MTF.siteBreadcrumbs.syncSchema === 'function') {
          window.MTF.siteBreadcrumbs.syncSchema(crumbs);
        }
      }
    }

    filmGrid.parentNode.insertBefore(section, filmGrid);
    return section;
  }

  window.MTF.filmHeader = { render: render };
})();
