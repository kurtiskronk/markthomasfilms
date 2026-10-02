/* =========================================================
   MARK THOMAS FILMS — JOURNAL ARTICLE / SERIES EXPERIENCE

   Every normal individual Journal article shares one base
   editorial template:
   - photographic Journal hero
   - Journal / Category / Article breadcrumbs
   - read time + dynamic category
   - centered H1 + divider
   - excerpt/deck
   - common body, related posts and comments styling

   Tagged series articles layer on only the pieces that are
   actually series-specific:
   - series context beneath the article title in the hero
   - series crumb in breadcrumbs
   - Part X of Y / View Entire Series toolbar
   - SERIES NAME — PART X label
   - In This Series + previous/next series navigation

   INTERNAL utility posts remain excluded.
   ========================================================= */

(function () {
  'use strict';

  window.MTF = window.MTF || {};


  const MAX_SERIES_POSTS = 10;

  function partWord(part) {
    const words = {
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

    return words[part] || String(part);
  }

  function isPost() {
    return /^\/journal\/[^/]+\/?$/i.test(
      location.pathname
    ) && !/^\/journal\/(?:tag|category|page)\//i.test(
      location.pathname
    );
  }

  function canonical(value, base) {
    try {
      const url = new URL(
        value,
        base || location.origin
      );

      /* Series data may be fetched from the public custom domain
         while the page itself is running inside Squarespace's editor
         host. The pathname, not matching hostnames, is the stable
         identity for Journal entries. */
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

  function termsFromDOM(root, selector, type) {
    const names = Array.from(
      (root || document).querySelectorAll(selector)
    ).map(function (link) {
      return cleanText(link.textContent || '');
    }).filter(Boolean);

    return normalizeTerms(names, type);
  }

  function nativeExcerpt(wrapper) {
    const node = wrapper.querySelector(
      '.blog-item-excerpt, .blog-excerpt, .entry-excerpt, [data-content-field="excerpt"]'
    );

    return cleanText(node?.textContent || '');
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

      /* Use the origin the page is actually running on. On the live
         site this is markthomasfilms.com; inside Squarespace's editor
         it is the Squarespace preview origin. The editor-origin feed
         is same-origin and exposes published siblings correctly.
         RSS item links may still use the public domain, so entries are
         matched by pathname rather than hostname. */
      const response = await fetch(url, {
        credentials: 'same-origin',
        cache: 'no-store'
      });

      if (!response.ok) {
        return { ok: false, posts: [] };
      }

      const xml = new DOMParser().parseFromString(
        await response.text(),
        'application/xml'
      );

      if (xml.querySelector('parsererror')) {
        return { ok: false, posts: [] };
      }

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

      return {
        ok: true,
        posts: Array.from(
          new Map(
            posts.map(function (post) {
              return [post.path, post];
            })
          ).values()
        )
      };
    } catch (error) {
      console.warn(
        'Journal: series feed unavailable',
        tagName,
        error
      );
      return { ok: false, posts: [] };
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
        cache: 'no-store',
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


  function insertHero(
    wrapper,
    heroTitle,
    category,
    ariaLabel,
    seriesMetaText
  ) {
    const eyebrowParts = ['Journal'];
    if (category?.name) eyebrowParts.push(category.name);

    function updateEyebrow(hero) {
      const eyebrowNode = hero.querySelector(
        '.mtf-journal-hero__eyebrow'
      );

      if (!eyebrowNode) return;

      eyebrowNode.replaceChildren();

      eyebrowParts.forEach(function (part, index) {
        if (index) {
          const slash = document.createElement('span');
          slash.setAttribute('aria-hidden', 'true');
          slash.textContent = '/';
          eyebrowNode.appendChild(slash);
        }

        const text = document.createElement('span');
        text.textContent = part;
        eyebrowNode.appendChild(text);
      });
    }

    function updateSeriesMeta(hero) {
      const title = hero.querySelector(
        '.mtf-journal-hero__title'
      );
      let meta = hero.querySelector(
        '.mtf-journal-hero__series-meta'
      );

      if (!seriesMetaText) {
        meta?.remove();
        return;
      }

      if (!meta) {
        meta = document.createElement('p');
        meta.className = 'mtf-journal-hero__series-meta';
        title?.after(meta);
      }

      meta.textContent = seriesMetaText;
    }

    const existing = wrapper.querySelector(
      ':scope > .mtf-journal-hero'
    );

    if (existing) {
      const title = existing.querySelector(
        '.mtf-journal-hero__title'
      );

      if (title) title.textContent = heroTitle || 'Journal';
      updateEyebrow(existing);
      updateSeriesMeta(existing);

      existing.setAttribute(
        'aria-label',
        ariaLabel || heroTitle || 'Journal'
      );

      return existing;
    }

    const hero = document.createElement('section');
    hero.className = 'mtf-journal-hero mtf-journal-series-hero';
    hero.setAttribute(
      'aria-label',
      ariaLabel || heroTitle || 'Journal'
    );

    hero.innerHTML = `
      <div class="mtf-journal-hero__inner mtf-journal-series-hero__inner">
        <p class="mtf-journal-hero__eyebrow mtf-journal-series-hero__eyebrow"></p>
        <h2 class="mtf-journal-hero__title mtf-journal-series-hero__title"></h2>
      </div>
    `;

    updateEyebrow(hero);

    hero.querySelector(
      '.mtf-journal-hero__title'
    ).textContent = heroTitle || 'Journal';

    updateSeriesMeta(hero);

    wrapper.prepend(hero);
    return hero;
  }

  function updateStandaloneBreadcrumbs(category, title) {
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

  function enhanceArticleHeader(wrapper, options) {
    const config = options || {};
    const series = config.series || null;
    const category = config.category || null;
    const part = config.part || null;
    const total = config.total || null;
    const pendingSeriesNumber = Boolean(config.pendingSeriesNumber);
    const excerpt = cleanText(config.excerpt || '');
    const minutes = config.minutes || 1;

    const header = wrapper.querySelector('.blog-item-top-wrapper');
    const titleBox = header?.querySelector('.blog-item-title');

    if (!header || !titleBox) return;

    wrapper.classList.add('mtf-journal-article');
    header.classList.add('mtf-journal-article-header');
    header.classList.toggle(
      'mtf-series-article-header',
      Boolean(series)
    );
    header.classList.toggle(
      'mtf-series-article-header--pending',
      Boolean(series && pendingSeriesNumber)
    );

    /* Squarespace may render the native excerpt before the H1.
       The shared Journal template always places our deck after the
       title (and after the series label when one exists). */
    header.querySelectorAll(
      '.blog-item-excerpt, .blog-excerpt, .entry-excerpt, [data-content-field="excerpt"]'
    ).forEach(function (node) {
      node.classList.add('mtf-journal-native-excerpt');
    });

    header.querySelectorAll(
      [
        '.mtf-series-article-toolbar',
        '.mtf-journal-article-meta',
        '.mtf-series-article-meta',
        '.mtf-multi-part-series',
        '.mtf-journal-article-deck',
        '.mtf-series-article-deck'
      ].join(', ')
    ).forEach(function (node) {
      node.remove();
    });

    /* Remove legacy manually-authored series labels only when this
       article is actually in a series. New article bodies use only
       semantic HTML inside .mtf-editorial-article. */
    if (series) {
      wrapper.querySelectorAll(
        '.mtf-editorial-article > .mtf-editorial-eyebrow'
      ).forEach(function (node) {
        node.remove();
      });
    }

    if (series) {
      const toolbar = document.createElement('div');
      toolbar.className = 'mtf-series-article-toolbar';

      const partText = document.createElement('span');
      partText.className = 'mtf-series-article-toolbar__part';
      partText.textContent = pendingSeriesNumber
        ? 'Series Article'
        : total > 1
          ? 'Part ' + part + ' of ' + total
          : 'Part ' + part;

      const rule = document.createElement('span');
      rule.className = 'mtf-series-article-toolbar__rule';
      rule.setAttribute('aria-hidden', 'true');

      let trailing;

      if (pendingSeriesNumber) {
        trailing = document.createElement('span');
        trailing.className = 'mtf-series-article-toolbar__status';
        trailing.textContent =
          'Part numbering will update when published.';
      } else if (total > 1) {
        trailing = document.createElement('a');
        trailing.className = 'mtf-series-article-toolbar__all';
        trailing.href = series.href;
        trailing.innerHTML =
          '<span aria-hidden="true">☷</span> View Entire Series';
      } else {
        trailing = document.createElement('span');
        trailing.className = 'mtf-series-article-toolbar__status';
        trailing.textContent = 'More in this series coming soon.';
      }

      toolbar.append(partText, rule, trailing);
      header.insertBefore(toolbar, titleBox);
    }

    const meta = document.createElement('div');
    meta.className = 'mtf-journal-article-meta';

    const time = document.createElement('span');
    time.textContent = minutes + ' min read';
    meta.appendChild(time);

    if (category?.name) {
      const divider = document.createElement('span');
      divider.className = 'mtf-journal-article-meta__divider';
      divider.setAttribute('aria-hidden', 'true');
      divider.textContent = '|';

      const categoryLink = document.createElement('a');
      categoryLink.href = category.href;
      categoryLink.textContent = category.name;

      meta.append(divider, categoryLink);
    }

    titleBox.before(meta);

    let deckAnchor = titleBox;

    if (series) {
      const seriesLabel = document.createElement('div');
      seriesLabel.className = 'mtf-multi-part-series';
      seriesLabel.textContent = pendingSeriesNumber
        ? series.name.toUpperCase() + ' — PART [X]'
        : series.name.toUpperCase() +
          ' — PART ' +
          partWord(part);

      titleBox.after(seriesLabel);
      deckAnchor = seriesLabel;
    }

    if (excerpt) {
      const deck = document.createElement('p');
      deck.className = 'mtf-journal-article-deck';
      deck.textContent = excerpt;
      deckAnchor.after(deck);
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

    /* A series can begin with a single public entry.
       The hero and article header still identify the series, but
       the footer index/navigation becomes useful only once another
       entry is available. */
    if (posts.length < 2) return;

    content.append(
      seriesIndex(posts, currentPath),
      seriesNavigation(posts, currentIndex, seriesHref)
    );
  }


  function pendingSeriesIndex(posts, currentTitle) {
    const section = document.createElement('section');
    section.className =
      'mtf-series-index mtf-series-index--pending';
    section.setAttribute('aria-label', 'Articles in this series');

    const heading = document.createElement('div');
    heading.className = 'mtf-series-index__heading';

    const title = document.createElement('h2');
    title.textContent = 'In This Series';

    const rule = document.createElement('span');
    rule.setAttribute('aria-hidden', 'true');
    heading.append(title, rule);

    const body = document.createElement('div');
    body.className = 'mtf-series-index__body';

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

      li.append(number, link);
      list.appendChild(li);
    });

    const current = document.createElement('li');
    current.className =
      'mtf-series-index__item is-current is-pending';

    const currentNumber = document.createElement('span');
    currentNumber.className = 'mtf-series-index__number';
    currentNumber.textContent = '[X]';

    const currentLabel = document.createElement('span');
    currentLabel.className = 'mtf-series-index__item-title';
    currentLabel.textContent = currentTitle;

    current.append(currentNumber, currentLabel);
    list.appendChild(current);

    const status = document.createElement('div');
    status.className = 'mtf-series-index__pending-note';

    const statusLead = document.createElement('p');
    statusLead.className = 'mtf-series-index__pending-lead';
    statusLead.textContent =
      'This article is part of this series.';

    const statusCopy = document.createElement('p');
    statusCopy.textContent =
      'Series order and navigation will update when published.';

    status.append(statusLead, statusCopy);
    body.append(list, status);
    section.append(heading, body);

    return section;
  }

  function pendingSeriesNavigation(posts, seriesHref) {
    const nav = document.createElement('nav');
    nav.className =
      'mtf-series-pagination mtf-series-pagination--pending';
    nav.setAttribute('aria-label', 'Series navigation preview');

    const previous = document.createElement('div');
    previous.className =
      'mtf-series-pagination__article mtf-series-pagination__article--previous';

    const latestPublished = posts[posts.length - 1] || null;

    if (latestPublished) {
      const link = document.createElement('a');
      link.href = latestPublished.path;

      const label = document.createElement('span');
      label.className = 'mtf-series-pagination__label';
      label.textContent = 'Latest Published Article';

      const title = document.createElement('span');
      title.className = 'mtf-series-pagination__title';
      title.textContent = latestPublished.title;

      link.append(label, title);
      previous.appendChild(link);
    } else {
      const label = document.createElement('span');
      label.className = 'mtf-series-pagination__label';
      label.textContent = 'Previous Article';

      const title = document.createElement('span');
      title.className =
        'mtf-series-pagination__title mtf-series-pagination__title--pending';
      title.textContent = 'Not available yet';

      previous.append(label, title);
    }

    const allCell = document.createElement('div');
    allCell.className = 'mtf-series-pagination__all';

    const allLink = document.createElement('a');
    allLink.href = seriesHref;
    allLink.innerHTML =
      '<span aria-hidden="true">☷</span><span>All Published Articles<br>In This Series</span>';
    allCell.appendChild(allLink);

    const next = document.createElement('div');
    next.className =
      'mtf-series-pagination__article mtf-series-pagination__article--next';

    const nextLabel = document.createElement('span');
    nextLabel.className = 'mtf-series-pagination__label';
    nextLabel.textContent = 'Next Article';

    const nextTitle = document.createElement('span');
    nextTitle.className =
      'mtf-series-pagination__title mtf-series-pagination__title--pending';
    nextTitle.textContent = 'Coming soon';

    next.append(nextLabel, nextTitle);
    nav.append(previous, allCell, next);

    return nav;
  }

  function appendPendingSeriesFooter(
    wrapper,
    posts,
    currentTitle,
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
      pendingSeriesIndex(posts, currentTitle),
      pendingSeriesNavigation(posts, seriesHref)
    );
  }

  async function init() {
    if (!isPost()) return;

    if (
      window.MTF?.journalInternal?.isCurrent?.()
    ) {
      return;
    }

    const wrapper = document.querySelector('.blog-item-wrapper');
    if (!wrapper) return;

    const item = await currentMetadata();

    /* Resolve the article title from Squarespace's actual article
       title field, never from a generic H1. In editing mode Squarespace
       can render other H1s (including Journal UI) before the native
       post title; a broad `querySelector('h1')` could therefore make
       the article appear to be titled "Journal". */
    const titleBox = wrapper.querySelector(
      '.blog-item-top-wrapper .blog-item-title, .blog-item-title'
    );
    const h1 = titleBox?.querySelector('h1.entry-title, h1') ||
      wrapper.querySelector('h1.entry-title');
    const metadataTitle = cleanText(item?.title || '');
    const domTitle = cleanText(h1?.textContent || '');
    const articleTitle = metadataTitle || domTitle;

    if (!articleTitle) return;

    /* Keep the native visible post title synchronized with the
       authoritative Squarespace metadata in editor and live views. */
    if (h1 && metadataTitle && domTitle !== metadataTitle) {
      h1.textContent = metadataTitle;
    }

    const metadataTags = normalizeTerms(
      item?.tags,
      'tag'
    );
    const tags = metadataTags.length
      ? metadataTags
      : termsFromDOM(
          wrapper,
          '.blog-meta-item--tags a, .blog-item-tag-wrapper a',
          'tag'
        );

    const metadataCategories = normalizeTerms(
      item?.categories || item?.category,
      'category'
    );
    const categories = metadataCategories.length
      ? metadataCategories
      : termsFromDOM(
          wrapper,
          '.blog-meta-item--categories a, .blog-item-category-wrapper a',
          'category'
        );

    if (
      categories.some(function (category) {
        return category.name.trim().toUpperCase() === 'INTERNAL';
      })
    ) {
      window.MTF?.journalInternal?.ensure?.();
      return;
    }

    const category = categories[0] || null;
    const excerpt = cleanText(
      item?.excerpt ||
      item?.bodyExcerpt ||
      item?.description ||
      nativeExcerpt(wrapper) ||
      ''
    );
    const minutes = readTime();

    /* Base Journal template: every normal article gets exactly the
       same hero, breadcrumbs, article meta, H1 treatment and deck. */
    wrapper.classList.add(
      'mtf-journal-article',
      'mtf-journal-hero-article'
    );
    document.documentElement.classList.add(
      'mtf-journal-article-page',
      'mtf-journal-hero-article-page'
    );

    insertHero(
      wrapper,
      articleTitle,
      category,
      articleTitle
    );

    updateStandaloneBreadcrumbs(
      category,
      articleTitle
    );

    enhanceArticleHeader(wrapper, {
      category: category,
      excerpt: excerpt,
      minutes: minutes
    });

    /* No tag means this is a standalone article. The shared Journal
       template is already complete, so there is nothing else to add. */
    if (!tags.length) return;

    const currentPath = canonical(location.pathname);
    let detected = null;
    let pendingSeries = null;

    for (const tag of tags) {
      const feed = await seriesPosts(tag.name);
      const posts = feed.posts;
      const currentIsInFeed = posts.some(function (post) {
        return post.path === currentPath;
      });

      /* The same-origin RSS feed is the source of truth for real
         numbering. On both the live site and inside Squarespace's
         editor it exposes published siblings; returned links are
         matched by pathname, so public-domain RSS links still match
         editor-origin article URLs. */
      if (
        feed.ok &&
        posts.length >= 1 &&
        posts.length <= MAX_SERIES_POSTS &&
        currentIsInFeed
      ) {
        detected = {
          name: tag.name,
          href: tag.href,
          posts: posts
        };
        break;
      }

      /* If a tagged article is absent from the feed, its final part
         number is not safely knowable yet (draft/scheduled state).
         A feed/network failure must not make a tagged article look
         standalone either. With one Journal tag we still know the
         article belongs to that series, so preserve the complete
         pending-series preview instead of inventing Part 1. */
      if (
        !currentIsInFeed &&
        tags.length === 1 &&
        posts.length < MAX_SERIES_POSTS
      ) {
        pendingSeries = {
          name: tag.name,
          href: tag.href,
          posts: posts
        };
      }
    }

    if (!detected && pendingSeries) {
      wrapper.classList.add(
        'mtf-journal-series-article',
        'mtf-journal-series-article--pending'
      );
      document.documentElement.classList.add(
        'mtf-journal-series-article-page',
        'mtf-journal-series-pending-page'
      );

      insertHero(
        wrapper,
        articleTitle,
        category,
        articleTitle,
        pendingSeries.name + ' — PART [X]'
      );

      updateBreadcrumbs(
        pendingSeries,
        category,
        articleTitle
      );

      enhanceArticleHeader(wrapper, {
        series: pendingSeries,
        category: category,
        excerpt: excerpt,
        minutes: minutes,
        pendingSeriesNumber: true
      });

      appendPendingSeriesFooter(
        wrapper,
        pendingSeries.posts || [],
        articleTitle,
        pendingSeries.href
      );

      return;
    }

    /* Multiple tags are intentionally ambiguous. If none can be
       resolved as a published series, keep the shared Journal article
       template rather than guessing which tag is the series. */
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
    const seriesCategory =
      category || current.categories?.[0] || null;
    const seriesExcerpt = cleanText(
      item?.excerpt ||
      item?.bodyExcerpt ||
      item?.description ||
      current.excerpt ||
      excerpt ||
      ''
    );

    wrapper.classList.add('mtf-journal-series-article');
    document.documentElement.classList.add(
      'mtf-journal-series-article-page'
    );

    insertHero(
      wrapper,
      articleTitle,
      seriesCategory,
      articleTitle,
      detected.name +
        ' — PART ' +
        partWord(currentIndex + 1)
    );

    updateBreadcrumbs(
      detected,
      seriesCategory,
      articleTitle
    );

    enhanceArticleHeader(wrapper, {
      series: detected,
      category: seriesCategory,
      part: currentIndex + 1,
      total: detected.posts.length,
      excerpt: seriesExcerpt,
      minutes: minutes
    });

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
