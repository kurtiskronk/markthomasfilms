/* =========================================================
   MARK THOMAS FILMS — TAG/CATEGORY HEADER

   Reads one entry from films-tag-context.js. Missing or empty
   optional fields render nothing. No anchor flag required.
   ========================================================= */
(function () {
  'use strict';
  window.MTF = window.MTF || {};

  function text(value) {
    return typeof value === 'string' ? value.trim() : '';
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
    const intro = !compact && context && Array.isArray(header.paragraphs)
      ? header.paragraphs
      : (!compact && context && context.paragraphs || []);

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
    /* Keep existing H1s intact; never inject a second H1 in main. */
    const headingTag = enhanced && !document.querySelector('main h1, #page h1')
      ? 'h1'
      : 'h2';
    const title = document.createElement(headingTag);
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

    filmGrid.parentNode.insertBefore(section, filmGrid);
    return section;
  }

  window.MTF.filmHeader = { render: render };
})();
