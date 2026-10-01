/* =========================================================
   MARK THOMAS FILMS — JOURNAL BREADCRUMBS

   Default article breadcrumb:
   Journal › Article Title

   Series articles are expanded later by
   journal-series-header.js.
   ========================================================= */

(function () {
  'use strict';

  window.MTF = window.MTF || {};

  function isPost() {
    return /^\/journal\/[^/]+\/?$/i.test(
      window.location.pathname
    ) && !/^\/journal\/(?:tag|category|page)\//i.test(
      window.location.pathname
    );
  }

  function makeItem(content, href, current) {
    const item = document.createElement('li');
    item.className = 'mtf-blog-breadcrumbs__item';

    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = content;
      item.appendChild(link);
    } else {
      const span = document.createElement('span');
      span.className = current
        ? 'mtf-blog-breadcrumbs__current'
        : '';
      span.textContent = content;

      if (current) {
        span.setAttribute('aria-current', 'page');
      }

      item.appendChild(span);
    }

    return item;
  }

  function separatorItem() {
    const item = document.createElement('li');
    item.className =
      'mtf-blog-breadcrumbs__item mtf-blog-breadcrumbs__item--separator';

    const separator = document.createElement('span');
    separator.className = 'mtf-blog-breadcrumbs__separator';
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '›';

    item.appendChild(separator);
    return item;
  }

  function render(nav, crumbs) {
    const list = document.createElement('ol');
    list.className = 'mtf-blog-breadcrumbs__list';

    crumbs.forEach(function (crumb, index) {
      if (index) {
        list.appendChild(separatorItem());
      }

      list.appendChild(
        makeItem(
          crumb.label,
          crumb.href || '',
          Boolean(crumb.current)
        )
      );
    });

    nav.replaceChildren(list);
  }

  function ensureSchema(h1) {
    const hasSchema = Array.from(
      document.querySelectorAll(
        'script[type="application/ld+json"]'
      )
    ).some(function (node) {
      return /"BreadcrumbList"/.test(
        node.textContent || ''
      );
    });

    if (hasSchema) return;

    const schema = document.createElement('script');

    schema.type = 'application/ld+json';
    schema.dataset.mtfJournalBreadcrumbSchema = '';

    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Journal',
          item: new URL('/journal', location.origin).href
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: h1.textContent.trim(),
          item: location.origin + location.pathname
        }
      ]
    }).replace(/</g, '\\u003c');

    document.head.appendChild(schema);
  }

  function init() {
    if (!isPost()) return;

    const wrapper = document.querySelector(
      '.blog-item-wrapper'
    );

    if (!wrapper) return;

    const h1 = wrapper.querySelector(
      'h1.entry-title, .blog-item-title h1, h1'
    );

    if (!h1 || !h1.textContent.trim()) return;

    let nav = wrapper.querySelector(
      ':scope > .mtf-blog-breadcrumbs'
    );

    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'mtf-blog-breadcrumbs';
      nav.setAttribute(
        'aria-label',
        'Journal breadcrumbs'
      );
      wrapper.prepend(nav);
    }

    render(nav, [
      {
        label: 'Journal',
        href: '/journal'
      },
      {
        label: h1.textContent.trim(),
        current: true
      }
    ]);

    ensureSchema(h1);

    window.MTF.journalBreadcrumbs = {
      nav: nav,
      render: function (crumbs) {
        render(nav, crumbs);
      }
    };
  }

  window.MTF.journalDetailHeader = {
    init: init
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
