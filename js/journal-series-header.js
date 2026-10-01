/* =========================================================
   MARK THOMAS FILMS — JOURNAL SERIES EXPERIENCE

   On individual Journal articles, detects whether the post
   belongs to a multi-part tag series and, when it does:
   - builds the photographic series hero
   - expands breadcrumbs to Journal / Category / Series / Post
   - adds Part X of Y, deck, read time and category
   - adds the "In This Series" index and previous/next links

   Articles without a multi-part tag remain unchanged.
   ========================================================= */

(function () {
  'use strict';

  window.MTF = window.MTF || {};

  window.MTF.journalSeriesCopy = Object.assign(
    {
      'why i still film weddings': {
        subtitle:
          'A personal series on what keeps me behind the camera, the people who inspire me and the stories worth telling.',
        intro:
          'A collection of articles about creativity, connection and the deeper reasons I still film weddings after all these years.'
      }
    },
    window.MTF.journalSeriesCopy || {}
  );

  const MAX_SERIES_POSTS = 10;

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

  function termURL(type, name) {
    return (
      '/journal/' +
      type +
      '/' +
      encodeURIComponent(name).replace(/%20/g, '+')
    );
  }

  function cleanText(value) {
    const div = document.createElement('div');
    div.innerHTML = String(value || '');

    return (div.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeTerms(value, type) {
    const entries = Array.isArray(value)
      ? value
      : value
        ? [value]
        : [];

    const seen = new Set();

    return entries.map(function (entry) {
      const raw = typeof entry === 'string'
        ? entry
        : entry && (
            entry.name ||
            entry.title ||
            entry.label
          ) || '';

      const name = cleanText(raw);
      const key = name.toLowerCase();

      if (!name || seen.has(key)) return null;
      seen.add(key);

      return {
        name: name,
        href: termURL(type, name)
      };
    }).filter(Boolean);
  }

  function itemFromJSON(data) {
    if (!data) return null;

    if (data.item) return data.item;

    if (Array.isArray(data.items) && data.items.length) {
      const current = canonical(location.pathname);

      return data.items.find(function (item) {
        return canonical(
          item.fullUrl ||
          item.url ||
          (item.urlId ? '/journal/' + item.urlId : '')
        ) === current;
      }) || data.items[0];
    }

    if (
      data.collection &&
      Array.isArray(data.collection.items) &&
      data.collection.items.length
    ) {
      return data.collection.items[0];
    }

    return null;
  }

  async function currentMetadata() {
    try {
      const url = new URL(location.href);
      url.searchParams.set('format', 'json');

      const response = await fetch(url, {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) return null;
      return itemFromJSON(await response.json());
    } catch (error) {
      console.warn(
        'Journal: current article metadata unavailable',
        error
      );
      return null;
    }
  }

  async function seriesPosts(tagName) {
    try {
      const url = new URL('/journal/', location.origin);
      url.searchParams.set('tag', tagName);
      url.searchParams.set('format', 'rss');

      const response = await fetch(url, {
        credentials: 'same-origin'
      });

      if (!response.ok) return [];

      const xml = new DOMParser().parseFromString(
        await response.text(),
        'application/xml'
      );

      if (xml.querySelector('parsererror')) return [];

      const posts = Array.from(
        xml.querySelectorAll('item')
      ).map(function (item, index) {
        const link = item.querySelector('link')
          ?.textContent.trim();

        const path = link && canonical(link);
        if (!path || !/^\/journal\/[^/]+$/i.test(path)) {
          return null;
        }

        const published = item.querySelector('pubDate')
          ?.textContent.trim();

        const parsedDate = Date.parse(published || '');

        return {
          path: path,
          title: cleanText(
            item.querySelector('title')?.textContent || ''
          ),
          excerpt: cleanText(
            item.querySelector('description')?.textContent || ''
          ),
          date: Number.isFinite(parsedDate)
            ? parsedDate
            : null,
          rssIndex: index
        };
      }).filter(Boolean);

      posts.sort(function (a, b) {
        if (a.date !== null && b.date !== null) {
          return a.date - b.date || b.rssIndex - a.rssIndex;
        }

        return b.rssIndex - a.rssIndex;
      });

      return Array.from(
        new Map(
          posts.map(function (post) {
            return [post.path, post];
          })
        ).values()
      );
    } catch (error) {
      console.warn(
        'Journal: series feed unavailable',
        tagName,
        error
      );
      return [];
    }
  }

  async function filteredMetadata(tagName) {
    try {
      const url = new URL(
        termURL('tag', tagName),
        location.origin
      );
      url.searchParams.set('format', 'json');

      const response = await fetch(url, {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) return new Map();

      const data = await response.json();
      const items = data.items || data.collection?.items || [];
      const map = new Map();

      items.forEach(function (item) {
        const path = canonical(
          item.fullUrl ||
          item.url ||
          (item.urlId ? '/journal/' + item.urlId : '')
        );

        if (!path) return;

        map.set(path, {
          title: cleanText(item.title || ''),
          excerpt: cleanText(
            item.excerpt ||
            item.bodyExcerpt ||
            item.description ||
            ''
          ),
          categories: normalizeTerms(
            item.categories || item.category,
            'category'
          )
        });
      });

      return map;
    } catch (_) {
      return new Map();
    }
  }

  function readTime() {
    const content = document.querySelector('.blog-item-content');
    if (!content) return 1;

    const clone = content.cloneNode(true);

    clone.querySelectorAll(
      '.mtf-editorial-eyebrow, .mtf-editorial-series, script, style'
    ).forEach(function (node) {
      node.remove();
    });

    const words = (clone.textContent || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 225));
  }

  function seriesCopy(name) {
    return window.MTF.journalSeriesCopy[
      String(name || '').trim().toLowerCase()
    ] || {
      subtitle:
        'A continuing Journal series exploring the stories, people and ideas behind the work.',
      intro:
        'A collection of related Journal articles exploring this subject in greater depth.'
    };
  }

  function insertHero(wrapper, series, category) {
    if (wrapper.querySelector(':scope > .mtf-journal-series-hero')) {
      return;
    }

    const hero = document.createElement('section');
    hero.className = 'mtf-journal-series-hero';
    hero.setAttribute('aria-label', series.name + ' series');

    const eyebrowParts = ['Journal'];
    if (category?.name) eyebrowParts.push(category.name);

    const eyebrow = eyebrowParts.map(function (part) {
      return '<span>' + part + '</span>';
    }).join('<span aria-hidden="true">/</span>');

    hero.innerHTML = `
      <div class="mtf-journal-series-hero__inner">
        <p class="mtf-journal-series-hero__eyebrow">
          ${eyebrow}
        </p>
        <h2 class="mtf-journal-series-hero__title"></h2>
        <p class="mtf-journal-series-hero__subtitle"></p>
      </div>
    `;

    hero.querySelector(
      '.mtf-journal-series-hero__title'
    ).textContent = series.name;

    hero.querySelector(
      '.mtf-journal-series-hero__subtitle'
    ).textContent = seriesCopy(series.name).subtitle;

    wrapper.prepend(hero);
  }

  function updateBreadcrumbs(series, category, title) {
    const crumbs = [
      { label: 'Journal', href: '/journal' }
    ];

    if (category?.name) {
      crumbs.push({
        label: category.name,
        href: category.href
      });
    }

    crumbs.push({
      label: series.name,
      href: series.href
    });

    crumbs.push({
      label: title,
      current: true
    });

    if (
      window.MTF.journalBreadcrumbs &&
      typeof window.MTF.journalBreadcrumbs.render === 'function'
    ) {
      window.MTF.journalBreadcrumbs.render(crumbs);
    }
  }

  function enhanceArticleHeader(
    wrapper,
    series,
    category,
    part,
    total,
    excerpt,
    minutes
  ) {
    const header = wrapper.querySelector('.blog-item-top-wrapper');
    const titleBox = header?.querySelector('.blog-item-title');

    if (!header || !titleBox) return;

    header.classList.add('mtf-series-article-header');

    /* Squarespace may render the post excerpt natively inside the
       header, before the title. We build our own deck in the exact
       editorial position below the series label, so suppress the
       native copy to avoid the excerpt appearing above the H1. */
    header.querySelectorAll(
      '.blog-item-excerpt, .blog-excerpt, .entry-excerpt, [data-content-field="excerpt"]'
    ).forEach(function (node) {
      node.classList.add('mtf-series-native-excerpt');
    });

    header.querySelectorAll(
      '.mtf-series-article-toolbar, .mtf-series-article-deck, .mtf-series-article-meta'
    ).forEach(function (node) {
      node.remove();
    });

    /* Series labels are generated dynamically from the detected
       tag and current part number. Article bodies no longer need
       to contain a static "WHY I STILL FILM WEDDINGS — PART TWO"
       style label. */
    wrapper.querySelectorAll(
      '.mtf-editorial-article > .mtf-editorial-eyebrow'
    ).forEach(function (node) {
      node.remove();
    });

    const toolbar = document.createElement('div');
    toolbar.className = 'mtf-series-article-toolbar';

    const partText = document.createElement('span');
    partText.className = 'mtf-series-article-toolbar__part';
    partText.textContent = 'Part ' + part + ' of ' + total;

    const rule = document.createElement('span');
    rule.className = 'mtf-series-article-toolbar__rule';
    rule.setAttribute('aria-hidden', 'true');

    const all = document.createElement('a');
    all.className = 'mtf-series-article-toolbar__all';
    all.href = series.href;
    all.innerHTML = '<span aria-hidden="true">☷</span> View Entire Series';

    toolbar.append(partText, rule, all);
    header.insertBefore(toolbar, titleBox);

    const meta = document.createElement('div');
    meta.className = 'mtf-series-article-meta';

    const time = document.createElement('span');
    time.textContent = minutes + ' min read';
    meta.appendChild(time);

    if (category?.name) {
      const divider = document.createElement('span');
      divider.className = 'mtf-series-article-meta__divider';
      divider.setAttribute('aria-hidden', 'true');
      divider.textContent = '|';

      const categoryLink = document.createElement('a');
      categoryLink.href = category.href;
      categoryLink.textContent = category.name;

      meta.append(divider, categoryLink);
    }

    /* Option B hierarchy:
       toolbar → read time/category → title → series label → excerpt.
       Explicit flex orders are also set in CSS because Squarespace
       assigns its own order value to .blog-item-title. */
    titleBox.before(meta);

    const partWords = {
      1: 'ONE',
      2: 'TWO',
      3: 'THREE',
      4: 'FOUR',
      5: 'FIVE',
      6: 'SIX',
      7: 'SEVEN',
      8: 'EIGHT',
      9: 'NINE',
      10: 'TEN'
    };

    const seriesLabel = document.createElement('div');
    seriesLabel.className = 'mtf-multi-part-series';
    seriesLabel.textContent =
      series.name.toUpperCase() +
      ' — PART ' +
      (partWords[part] || String(part));

    titleBox.after(seriesLabel);

    if (excerpt) {
      const deck = document.createElement('p');
      deck.className = 'mtf-series-article-deck';
      deck.textContent = excerpt;
      seriesLabel.after(deck);
    }
  }

  function seriesIndex(posts, currentPath) {
    const section = document.createElement('section');
    section.className = 'mtf-series-index';
    section.setAttribute('aria-label', 'Articles in this series');

    const heading = document.createElement('div');
    heading.className = 'mtf-series-index__heading';

    const title = document.createElement('h2');
    title.textContent = 'In This Series';

    const rule = document.createElement('span');
    rule.setAttribute('aria-hidden', 'true');

    heading.append(title, rule);

    const list = document.createElement('ol');
    list.className = 'mtf-series-index__list';

    posts.forEach(function (post, index) {
      const li = document.createElement('li');
      li.className = 'mtf-series-index__item';

      const number = document.createElement('span');
      number.className = 'mtf-series-index__number';
      number.textContent = String(index + 1) + '.';

      const link = document.createElement('a');
      link.href = post.path;
      link.textContent = post.title;

      if (post.path === currentPath) {
        li.classList.add('is-current');
        link.setAttribute('aria-current', 'page');
      }

      li.append(number, link);
      list.appendChild(li);
    });

    section.append(heading, list);
    return section;
  }

  function seriesNavigation(posts, currentIndex, seriesHref) {
    const nav = document.createElement('nav');
    nav.className = 'mtf-series-pagination';
    nav.setAttribute('aria-label', 'Series navigation');

    const previous = posts[currentIndex - 1];
    const next = posts[currentIndex + 1];

    function articleLink(post, direction) {
      const cell = document.createElement('div');
      cell.className =
        'mtf-series-pagination__article mtf-series-pagination__article--' +
        direction;

      if (!post) {
        cell.setAttribute('aria-hidden', 'true');
        return cell;
      }

      const link = document.createElement('a');
      link.href = post.path;

      const label = document.createElement('span');
      label.className = 'mtf-series-pagination__label';
      label.textContent = direction === 'previous'
        ? 'Previous Article'
        : 'Next Article';

      const articleTitle = document.createElement('span');
      articleTitle.className = 'mtf-series-pagination__title';
      articleTitle.textContent = post.title;

      link.append(label, articleTitle);
      cell.appendChild(link);
      return cell;
    }

    const previousCell = articleLink(previous, 'previous');

    const allCell = document.createElement('div');
    allCell.className = 'mtf-series-pagination__all';

    const allLink = document.createElement('a');
    allLink.href = seriesHref;
    allLink.innerHTML =
      '<span aria-hidden="true">☷</span><span>All Articles<br>In This Series</span>';
    allCell.appendChild(allLink);

    const nextCell = articleLink(next, 'next');

    nav.append(previousCell, allCell, nextCell);
    return nav;
  }

  function appendSeriesFooter(
    wrapper,
    posts,
    currentPath,
    currentIndex,
    seriesHref
  ) {
    const content = wrapper.querySelector('.blog-item-content');
    if (!content) return;

    content.querySelectorAll(
      '.mtf-series-index, .mtf-series-pagination'
    ).forEach(function (node) {
      node.remove();
    });

    content.append(
      seriesIndex(posts, currentPath),
      seriesNavigation(posts, currentIndex, seriesHref)
    );
  }

  async function init() {
    if (!isPost()) return;

    const wrapper = document.querySelector('.blog-item-wrapper');
    const h1 = wrapper?.querySelector(
      'h1.entry-title, .blog-item-title h1, h1'
    );

    if (!wrapper || !h1) return;

    const item = await currentMetadata();
    if (!item) return;

    const tags = normalizeTerms(item.tags, 'tag');
    const categories = normalizeTerms(
      item.categories || item.category,
      'category'
    );

    if (!tags.length) return;

    const currentPath = canonical(location.pathname);
    let detected = null;

    for (const tag of tags) {
      const posts = await seriesPosts(tag.name);

      if (
        posts.length >= 2 &&
        posts.length <= MAX_SERIES_POSTS &&
        posts.some(function (post) {
          return post.path === currentPath;
        })
      ) {
        detected = {
          name: tag.name,
          href: tag.href,
          posts: posts
        };
        break;
      }
    }

    if (!detected) return;

    const details = await filteredMetadata(detected.name);

    detected.posts.forEach(function (post) {
      const extra = details.get(post.path);
      if (!extra) return;

      post.title = extra.title || post.title;
      post.excerpt = extra.excerpt || post.excerpt;
      post.categories = extra.categories || [];
    });

    const currentIndex = detected.posts.findIndex(
      function (post) {
        return post.path === currentPath;
      }
    );

    if (currentIndex === -1) return;

    const current = detected.posts[currentIndex];
    const category = categories[0] || current.categories?.[0] || null;
    const excerpt = cleanText(
      item.excerpt ||
      item.bodyExcerpt ||
      item.description ||
      current.excerpt ||
      ''
    );

    wrapper.classList.add('mtf-journal-series-article');
    document.documentElement.classList.add(
      'mtf-journal-series-article-page'
    );

    insertHero(wrapper, detected, category);
    updateBreadcrumbs(
      detected,
      category,
      cleanText(h1.textContent)
    );

    enhanceArticleHeader(
      wrapper,
      detected,
      category,
      currentIndex + 1,
      detected.posts.length,
      excerpt,
      readTime()
    );


    appendSeriesFooter(
      wrapper,
      detected.posts,
      currentPath,
      currentIndex,
      detected.href
    );
  }

  window.MTF.journalSeriesHeader = {
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
