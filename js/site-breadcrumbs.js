/* =========================================================
   MARK THOMAS FILMS — SHARED BREADCRUMB COMPONENT

   Shared rendering, accessibility and BreadcrumbList schema
   for Films and Journal. Page-specific hierarchy stays in
   the calling module.
   ========================================================= */
(function () {
  'use strict';

  window.MTF = window.MTF || {};
  const MTF = window.MTF;

  function clean(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function makeItem(crumb) {
    const item = document.createElement('li');
    item.className = 'mtf-breadcrumbs__item';

    const label = clean(crumb && (crumb.label || crumb.name));
    const href = clean(crumb && crumb.href);
    const current = Boolean(crumb && crumb.current);

    if (href && !current) {
      const link = document.createElement('a');
      link.className = 'mtf-breadcrumbs__link';
      link.href = href;
      link.textContent = label;
      item.appendChild(link);
    } else {
      const span = document.createElement('span');
      span.className = current ? 'mtf-breadcrumbs__current' : '';
      span.textContent = label;

      if (current) {
        span.setAttribute('aria-current', 'page');
      }

      item.appendChild(span);
    }

    return item;
  }

  function makeSeparator() {
    const item = document.createElement('li');
    item.className =
      'mtf-breadcrumbs__item mtf-breadcrumbs__item--separator';

    const separator = document.createElement('span');
    separator.className = 'mtf-breadcrumbs__separator';
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '›';

    item.appendChild(separator);
    return item;
  }

  function render(nav, crumbs) {
    if (!nav || !Array.isArray(crumbs)) return nav || null;

    const values = crumbs.filter(function (crumb) {
      return clean(crumb && (crumb.label || crumb.name));
    });

    const list = document.createElement('ol');
    list.className = 'mtf-breadcrumbs__list';
    list.setAttribute('role', 'list');

    values.forEach(function (crumb, index) {
      if (index) {
        list.appendChild(makeSeparator());
      }

      list.appendChild(makeItem(crumb));
    });

    nav.replaceChildren(list);
    return nav;
  }

  function create(crumbs, options) {
    const config = options || {};
    const nav = document.createElement('nav');

    nav.className =
      'mtf-breadcrumbs' +
      (clean(config.className) ? ' ' + config.className.trim() : '');

    nav.setAttribute(
      'aria-label',
      clean(config.ariaLabel) || 'Breadcrumbs'
    );

    render(nav, crumbs);
    return nav;
  }

  function hasExternalBreadcrumbSchema(ownScript) {
    return Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    ).some(function (node) {
      if (node === ownScript) return false;

      return /["']BreadcrumbList["']/.test(
        node.textContent || ''
      );
    });
  }

  function schemaData(crumbs) {
    const values = (Array.isArray(crumbs) ? crumbs : []).filter(
      function (crumb) {
        return clean(crumb && (crumb.label || crumb.name));
      }
    );

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: values.map(function (crumb, index) {
        const href =
          clean(crumb.href) ||
          (crumb.current
            ? window.location.pathname + window.location.search
            : window.location.pathname);

        return {
          '@type': 'ListItem',
          position: index + 1,
          name: clean(crumb.label || crumb.name),
          item: new URL(href, window.location.origin).href
        };
      })
    };
  }

  function syncSchema(crumbs) {
    let script = document.querySelector(
      'script[data-mtf-breadcrumb-schema]'
    );

    if (!script && hasExternalBreadcrumbSchema(null)) {
      return null;
    }

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-mtf-breadcrumb-schema', '');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(
      schemaData(crumbs)
    ).replace(/</g, '\\u003c');

    return script;
  }

  MTF.siteBreadcrumbs = {
    create: create,
    render: render,
    syncSchema: syncSchema
  };

})();
