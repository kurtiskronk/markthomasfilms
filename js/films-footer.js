/* =========================================================
   MARK THOMAS FILMS — COLLECTION FOOTER

   1. Available tag-specific sections, then optional tag CTA.
   2. Shared About sections (films-footer-shared.js).
   3. Existing rotating testimonials remain a separate component.

   This file never executes on an individual film page.
   ========================================================= */
(function () {
  'use strict';
  window.MTF = window.MTF || {};

  function text(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function addParagraphs(parent, values) {
    if (!Array.isArray(values)) return 0;
    let count = 0;
    values.forEach(function (value) {
      if (!text(value)) return;
      const p = document.createElement('p');
      p.textContent = value.trim();
      parent.appendChild(p);
      count += 1;
    });
    return count;
  }

  function safeHref(value) {
    const candidate = text(value);
    if (!candidate) return '';
    try {
      const url = new URL(candidate, window.location.origin);
      if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) return '';
      return url.href;
    } catch (error) {
      return '';
    }
  }

  function createContentSection(content, extraClass) {
    if (!content || typeof content !== 'object') return null;
    const title = text(content.heading);
    const eyebrow = text(content.eyebrow);
    const values = Array.isArray(content.paragraphs)
      ? content.paragraphs.filter(text)
      : [];
    if (!title && !eyebrow && !values.length) return null;

    const section = document.createElement('section');
    section.className = 'mtf-section mtf-films-footer__section' +
      (content.theme === 'light' ? ' mtf-section--light' : '') +
      (extraClass ? ' ' + extraClass : '');

    const container = document.createElement('div');
    container.className = 'mtf-section__container';
    const heading = document.createElement('div');
    heading.className = 'mtf-section__heading';

    if (eyebrow) {
      const p = document.createElement('p');
      p.className = 'mtf-section__eyebrow';
      p.textContent = eyebrow;
      heading.appendChild(p);
    }
    if (title) {
      const h2 = document.createElement('h2');
      h2.className = 'mtf-section__title mtf-section__title--subsection';
      h2.textContent = title;
      heading.appendChild(h2);
    }
    if (heading.childElementCount) container.appendChild(heading);
    if (values.length) {
      const copy = document.createElement('div');
      copy.className = 'mtf-section__prose';
      addParagraphs(copy, values);
      container.appendChild(copy);
    }
    section.appendChild(container);
    return section;
  }

  function createCTA(content) {
    if (!content || typeof content !== 'object') return null;
    const heading = text(content.heading);
    const values = Array.isArray(content.paragraphs)
      ? content.paragraphs.filter(text)
      : [];
    const href = safeHref(content.buttonUrl);
    const label = text(content.buttonText);
    if (!heading && !values.length && !(href && label)) return null;

    const section = document.createElement('section');
    section.className = 'mtf-section mtf-films-footer__cta mtf-section--compact';
    const container = document.createElement('div');
    container.className = 'mtf-section__container mtf-cta';
    if (heading) {
      const h2 = document.createElement('h2');
      h2.className = 'mtf-section__title mtf-section__title--subsection';
      h2.textContent = heading;
      container.appendChild(h2);
    }
    if (values.length) {
      const copy = document.createElement('div');
      copy.className = 'mtf-section__description mtf-section__prose';
      addParagraphs(copy, values);
      container.appendChild(copy);
    }
    if (href && label) {
      const actions = document.createElement('div');
      actions.className = 'mtf-cta__actions';
      const link = document.createElement('a');
      link.className = 'mtf-button mtf-button--primary';
      link.href = href;
      link.textContent = label;
      actions.appendChild(link);
      container.appendChild(actions);
    }
    section.appendChild(container);
    return section;
  }

  function render(archive, context) {
    const existing = document.querySelector('.mtf-films-footer');
    if (existing) return existing;

    const root = document.createElement('div');
    root.className = 'mtf-films-footer';
    root.setAttribute('aria-label', 'More about Mark Thomas Films');

    const footer = context && context.footer;
    const customSections = footer && Array.isArray(footer.sections) ? footer.sections : [];
    customSections.forEach(function (item) {
      const section = createContentSection(item, 'mtf-films-footer__specific');
      if (section) root.appendChild(section);
    });
    if (footer && footer.cta) {
      const cta = createCTA(footer.cta);
      if (cta) root.appendChild(cta);
    }

    const shared = window.MTF.filmFooterShared;
    const sharedSections = shared && Array.isArray(shared.sections) ? shared.sections : [];
    sharedSections.forEach(function (item) {
      const section = createContentSection(item, 'mtf-films-footer__shared');
      if (section) root.appendChild(section);
    });

    if (!root.childElementCount) return null;

    /* Testimonials are already placed ahead of Squarespace's footer. */
    const anchor = document.querySelector('.mtf-film-testimonials') ||
      document.querySelector('#footer-sections') ||
      document.querySelector('footer.sections') ||
      document.querySelector('body > footer') ||
      document.querySelector('footer');
    if (!anchor || !anchor.parentNode) return null;
    anchor.parentNode.insertBefore(root, anchor);
    return root;
  }

  window.MTF.filmFooter = { render: render };
})();
