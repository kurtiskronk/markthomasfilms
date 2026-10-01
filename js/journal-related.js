/* =========================================================
   MARK THOMAS FILMS — OTHER JOURNAL ARTICLES

   Text-only editorial recommendations for individual Journal posts.
   Uses the public Squarespace /journal archive to discover candidates,
   then fetches each selected article to calculate read time from the
   actual article body and retrieve its display category.
   ========================================================= */

(function () {
  'use strict';

  window.MTF = window.MTF || {};

  const MAX_POSTS = 3;
  const MAX_ARCHIVE_PAGES = 8;
  const WORDS_PER_MINUTE = 225;

  function isPost() {
    return /^\/journal\/[^/]+\/?$/i.test(
      location.pathname
    ) && !/^\/journal\/(?:tag|category|page)\//i.test(
      location.pathname
    );
  }

  function canonical(value, base) {
    try {
      const url = new URL(value, base || location.origin);

      if (url.origin !== location.origin) return '';

      return url.pathname.replace(/\/+$/, '') || '/';
    } catch (_) {
      return '';
    }
  }

  function postPath(value, base) {
    const path = canonical(value, base);

    return /^\/journal\/[^/]+$/i.test(path) &&
      !/^\/journal\/(?:tag|category|page)$/i.test(path)
      ? path
      : '';
  }

  function cleanText(value) {
    return String(value || '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function taxonomy(root, type) {
    const selector = type === 'category'
      ? '.blog-meta-item--categories a, a[rel="category tag"]'
      : '.blog-meta-item--tags a, a[rel="tag"]';

    return Array.from(
      root.querySelectorAll(selector)
    ).map(function (link) {
      return cleanText(link.textContent).toLowerCase();
    }).filter(Boolean);
  }

  function firstCategoryLabel(root) {
    const link = root.querySelector(
      '.blog-meta-item--categories a, a[rel="category tag"]'
    );

    return cleanText(link?.textContent || '');
  }

  function articleData(container, base) {
    const links = Array.from(
      container.querySelectorAll('a[href]')
    );

    const titleLink = links.find(function (link) {
      return link.closest(
        '.blog-title, .entry-title, .blog-item-title, h2, h3'
      ) && postPath(
        link.getAttribute('href'),
        base
      );
    }) || links.find(function (link) {
      return postPath(
        link.getAttribute('href'),
        base
      ) && cleanText(link.textContent).length > 6;
    });

    if (!titleLink) return null;

    const path = postPath(
      titleLink.getAttribute('href'),
      base
    );

    const title = cleanText(titleLink.textContent);

    if (!path || !title) return null;

    const excerptNode = container.querySelector(
      '.blog-excerpt-wrapper, ' +
      '.summary-excerpt, ' +
      '.blog-item-excerpt, ' +
      '.blog-excerpt'
    );

    return {
      path: path,
      title: title,
      excerpt: excerptNode
        ? cleanText(excerptNode.textContent).slice(0, 220)
        : '',
      categoryLabel: firstCategoryLabel(container),
      categories: taxonomy(container, 'category'),
      tags: taxonomy(container, 'tag'),
      readMinutes: null
    };
  }

  function parsePosts(doc, base) {
    const selectors = [
      '.blog-basic-grid article.blog-item',
      '.blog-list article',
      '.blog-item',
      '.blog-list-item',
      '.summary-item'
    ];

    let containers = [];

    for (const selector of selectors) {
      containers = Array.from(
        doc.querySelectorAll(selector)
      );

      if (containers.length) break;
    }

    if (!containers.length) {
      containers = Array.from(
        doc.querySelectorAll('article')
      );
    }

    return containers.map(function (container) {
      return articleData(container, base);
    }).filter(Boolean);
  }

  function nextPage(doc, base) {
    const candidates = [
      '.blog-list-pagination .older a[href]',
      '.blog-list-pagination a[rel="next"]',
      '.pagination .next a[href]'
    ];

    for (const selector of candidates) {
      const link = doc.querySelector(selector);

      if (!link) continue;

      try {
        const url = new URL(
          link.getAttribute('href'),
          base
        );

        if (
          url.origin === location.origin &&
          /^\/journal\/?$/i.test(url.pathname)
        ) {
          return url.href;
        }
      } catch (_) {
        // Try the next candidate.
      }
    }

    return '';
  }

  function currentTaxonomy() {
    const article = document.querySelector(
      '.blog-item-wrapper'
    ) || document;

    return {
      categories: taxonomy(article, 'category'),
      tags: taxonomy(article, 'tag')
    };
  }

  function score(post, current) {
    const sharedCategories = post.categories.filter(
      function (category) {
        return current.categories.includes(category);
      }
    ).length;

    const sharedTags = post.tags.filter(
      function (tag) {
        return current.tags.includes(tag);
      }
    ).length;

    return sharedCategories * 4 + sharedTags;
  }

  async function findRecommendations() {
    const found = new Map();
    const visited = new Set();

    let next = new URL(
      '/journal',
      location.origin
    ).href;

    while (
      next &&
      visited.size < MAX_ARCHIVE_PAGES
    ) {
      if (visited.has(next)) break;
      visited.add(next);

      const response = await fetch(next, {
        credentials: 'same-origin'
      });

      if (!response.ok) {
        throw new Error(
          'Journal archive HTTP ' + response.status
        );
      }

      const doc = new DOMParser().parseFromString(
        await response.text(),
        'text/html'
      );

      parsePosts(doc, next).forEach(function (post) {
        if (
          post.path !== canonical(location.pathname) &&
          !found.has(post.path)
        ) {
          found.set(post.path, post);
        }
      });

      next = nextPage(doc, next);

      if (found.size >= MAX_POSTS) {
        const terms = currentTaxonomy();

        if (
          !terms.categories.length &&
          !terms.tags.length
        ) {
          break;
        }
      }
    }

    const terms = currentTaxonomy();

    return Array.from(found.values())
      .map(function (post, index) {
        return {
          post: post,
          score: score(post, terms),
          index: index
        };
      })
      .sort(function (a, b) {
        return b.score - a.score || a.index - b.index;
      })
      .slice(0, MAX_POSTS)
      .map(function (item) {
        return item.post;
      });
  }

  function readMinutesFromDocument(doc) {
    const content = doc.querySelector(
      '.blog-item-content, .blog-body-wrapper'
    );

    if (!content) return null;

    const clone = content.cloneNode(true);

    clone.querySelectorAll(
      '.mtf-editorial-eyebrow, ' +
      '.mtf-editorial-series, ' +
      '.mtf-series-index, ' +
      '.mtf-series-pagination, ' +
      'script, style'
    ).forEach(function (node) {
      node.remove();
    });

    const words = cleanText(clone.textContent)
      .split(/\s+/)
      .filter(Boolean)
      .length;

    return words
      ? Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
      : null;
  }

  async function enrichPost(post) {
    try {
      const response = await fetch(post.path, {
        credentials: 'same-origin'
      });

      if (!response.ok) return post;

      const doc = new DOMParser().parseFromString(
        await response.text(),
        'text/html'
      );

      const category = firstCategoryLabel(doc);
      if (category) post.categoryLabel = category;

      const minutes = readMinutesFromDocument(doc);
      if (minutes) post.readMinutes = minutes;

      return post;
    } catch (error) {
      console.warn(
        'MTF: unable to enrich related Journal article:',
        post.path,
        error
      );
      return post;
    }
  }

  async function enrichRecommendations(posts) {
    return Promise.all(
      posts.map(function (post) {
        return enrichPost(post);
      })
    );
  }

  function card(post) {
    const article = document.createElement('article');
    article.className = 'mtf-blog-related__card';

    const body = document.createElement('div');
    body.className = 'mtf-blog-related__body';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'mtf-blog-related__category';
    eyebrow.textContent = post.categoryLabel || 'Journal';

    const title = document.createElement('h3');
    title.className = 'mtf-blog-related__card-title';

    const titleLink = document.createElement('a');
    titleLink.href = post.path;
    titleLink.textContent = post.title;

    title.appendChild(titleLink);
    body.append(eyebrow, title);

    if (post.excerpt) {
      const excerpt = document.createElement('p');
      excerpt.className = 'mtf-blog-related__excerpt';
      excerpt.textContent = post.excerpt;
      body.appendChild(excerpt);
    }

    const bottom = document.createElement('div');
    bottom.className = 'mtf-blog-related__bottom';

    const readTime = document.createElement('span');
    readTime.className = 'mtf-blog-related__read-time';
    readTime.textContent = post.readMinutes
      ? post.readMinutes + ' min read'
      : '';

    const readLink = document.createElement('a');
    readLink.className = 'mtf-blog-related__read-link';
    readLink.href = post.path;
    readLink.textContent = 'Read Article';
    readLink.setAttribute(
      'aria-label',
      'Read article: ' + post.title
    );

    bottom.append(readTime, readLink);
    body.appendChild(bottom);
    article.appendChild(body);

    return article;
  }

  function render(posts) {
    if (
      !posts.length ||
      document.querySelector('.mtf-blog-related')
    ) {
      return;
    }

    const section = document.createElement('section');
    section.className = 'mtf-blog-related';
    section.setAttribute(
      'aria-labelledby',
      'mtf-blog-related-title'
    );

    const inner = document.createElement('div');
    inner.className = 'mtf-blog-related__inner';

    const heading = document.createElement('div');
    heading.className = 'mtf-blog-related__heading';

    const eyebrow = document.createElement('span');
    eyebrow.className = 'mtf-blog-related__eyebrow';
    eyebrow.textContent = 'Continue Reading';

    const headingTitle = document.createElement('h2');
    headingTitle.id = 'mtf-blog-related-title';
    headingTitle.className = 'mtf-blog-related__title';
    headingTitle.textContent =
      'Other Posts You May Be Interested In';

    heading.append(eyebrow, headingTitle);

    const grid = document.createElement('div');
    grid.className = 'mtf-blog-related__grid';
    grid.dataset.count = String(posts.length);

    posts.forEach(function (post) {
      grid.appendChild(card(post));
    });

    const footer = document.createElement('div');
    footer.className = 'mtf-blog-related__footer';

    const all = document.createElement('a');
    all.className = 'mtf-blog-related__all';
    all.href = '/journal';
    all.textContent = 'View All Journal Articles';

    footer.appendChild(all);
    inner.append(heading, grid, footer);
    section.appendChild(inner);

    const pagination = document.querySelector(
      '#itemPagination, .item-pagination'
    );

    if (pagination?.parentNode) {
      pagination.parentNode.insertBefore(
        section,
        pagination
      );
    } else {
      const wrapper = document.querySelector(
        '.blog-item-wrapper'
      );

      if (wrapper) {
        wrapper.insertAdjacentElement(
          'afterend',
          section
        );
      }
    }
  }

  function init() {
    if (
      !isPost() ||
      document.querySelector('.mtf-blog-related')
    ) {
      return;
    }

    findRecommendations()
      .then(enrichRecommendations)
      .then(render)
      .catch(function (error) {
        console.warn(
          'MTF: unable to retrieve related Journal posts:',
          error
        );
      });
  }

  window.MTF.blogRelated = {
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
