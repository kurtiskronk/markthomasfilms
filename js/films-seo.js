/* =========================================================
   MARK THOMAS FILMS — FILM TAG SEO

   Programmatic SEO for first-page film tag archives.

   Uses the already-resolved tag context from films.js:
   - header.title       -> document title
   - header.subtitle    -> meta description + service name
   - current tag URL    -> CollectionPage / Service IDs

   Intentionally does NOT:
   - change canonical URLs
   - add robots directives
   - run on individual film pages
   - run on paginated archive URLs
   - add BreadcrumbList until tag pages have visible breadcrumbs
   ========================================================= */

(function () {
  'use strict';

  window.MTF = window.MTF || {};

  function text(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function pageUrl() {
    return new URL(
      window.location.pathname,
      window.location.origin
    ).href;
  }

  function seoTitle(context) {
    const header = context && context.header || {};

    return text(header.title) ||
      (text(context && context.name)
        ? text(context.name) + ' Wedding Videographer'
        : '');
  }

  function serviceName(context) {
    const header = context && context.header || {};
    const subtitle = text(header.subtitle);

    if (subtitle) {
      return subtitle.replace(
        /^Wedding Films & Photography/i,
        'Wedding Videography and Photography'
      );
    }

    const name = text(context && context.name);

    if (!name) return '';

    return 'Wedding Videography and Photography ' +
      (context.type === 'location' ? 'in ' : 'at ') +
      name;
  }

  function seoDescription(context) {
    const service = serviceName(context);

    if (service) {
      return (
        service.charAt(0).toUpperCase() +
        service.slice(1) +
        '. Explore real wedding films by Mark Thomas Films.'
      );
    }

    const values = context && Array.isArray(context.paragraphs)
      ? context.paragraphs
      : [];

    const fallback = values.map(text).find(Boolean);

    return fallback || '';
  }

  function ensureMetaDescription(value) {
    if (!value) return null;

    let meta = document.querySelector(
      'meta[name="description"]'
    );

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', value);

    return meta;
  }

  function updateExistingMeta(selector, value) {
    if (!value) return;

    document.querySelectorAll(selector).forEach(function (meta) {
      meta.setAttribute('content', value);
    });
  }

  function removeExistingMTFSchema() {
    document.querySelectorAll(
      'script[data-mtf-film-tag-seo-schema]'
    ).forEach(function (node) {
      node.remove();
    });
  }

  function addSchema(context, title, description) {
    if (!context || !title || !description) return null;

    const url = pageUrl();
    const service = serviceName(context);

    if (!service) return null;

    removeExistingMTFSchema();

    const webpageId = url + '#webpage';
    const serviceId = url + '#service';
    const organizationId =
      window.location.origin + '/#organization';

    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': webpageId,
          url: url,
          name: title,
          description: description,
          mainEntity: {
            '@id': serviceId
          }
        },
        {
          '@type': 'Service',
          '@id': serviceId,
          name: service,
          serviceType: [
            'Wedding videography',
            'Wedding photography'
          ],
          url: url,
          provider: {
            '@type': 'Organization',
            '@id': organizationId,
            name: 'Mark Thomas Films',
            url: window.location.origin + '/'
          }
        }
      ]
    };

    const script = document.createElement('script');

    script.type = 'application/ld+json';
    script.setAttribute(
      'data-mtf-film-tag-seo-schema',
      ''
    );
    script.textContent = JSON.stringify(data).replace(
      /</g,
      '\\u003c'
    );

    document.head.appendChild(script);

    return script;
  }

  function render(archive, context, options) {
    options = options || {};

    if (
      !archive ||
      archive.type !== 'tag' ||
      !context ||
      options.compact
    ) {
      return null;
    }

    const title = seoTitle(context);
    const description = seoDescription(context);

    if (title) {
      document.title = title;

      /*
       * Keep rendered Open Graph/Twitter title signals aligned
       * when Squarespace already supplied them. These are not
       * created here because many social crawlers do not execute JS.
       */
      updateExistingMeta(
        'meta[property="og:title"], meta[name="twitter:title"]',
        title
      );
    }

    if (description) {
      ensureMetaDescription(description);

      updateExistingMeta(
        'meta[property="og:description"], ' +
        'meta[name="twitter:description"]',
        description
      );
    }

    const schema = addSchema(
      context,
      title,
      description
    );

    return {
      title: title,
      description: description,
      schema: schema
    };
  }

  window.MTF.filmSEO = {
    render: render,

    /* Exposed pure helpers for regression testing. */
    seoTitle: seoTitle,
    seoDescription: seoDescription,
    serviceName: serviceName
  };

})();
