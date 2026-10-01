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

  const INTERNAL_CATEGORY = 'INTERNAL';

  function isPost() {
    return /^\/journal\/[^/]+\/?$/i.test(
      window.location.pathname
    ) && !/^\/journal\/(?:tag|category|page)\//i.test(
      window.location.pathname
    );
  }

  function categoryNames(root) {
    return Array.from(
      (root || document).querySelectorAll(
        '.blog-meta-item--categories a, .blog-item-category-wrapper a'
      )
    ).map(function (link) {
      return String(link.textContent || '').trim();
    }).filter(Boolean);
  }

  function isInternalPost() {
    if (!isPost()) return false;

    return categoryNames(document).some(function (name) {
      return name.toUpperCase() === INTERNAL_CATEGORY;
    });
  }

  function ensureInternalNoIndex() {
    let meta = document.querySelector(
      'meta[data-mtf-journal-internal-robots]'
    );

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      meta.dataset.mtfJournalInternalRobots = '';
      document.head.appendChild(meta);
    }

    meta.content = 'noindex, follow';
  }

  function markInternalPost() {
    if (!isInternalPost()) return false;

    document.documentElement.classList.add(
      'mtf-journal-internal'
    );

    ensureInternalNoIndex();
    return true;
  }

  window.MTF.journalInternal = {
    category: INTERNAL_CATEGORY,
    isCurrent: isInternalPost,
    ensure: markInternalPost
  };

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

    markInternalPost();

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

/* =========================================================
   MARK THOMAS FILMS — JOURNAL COMMENTS

   Replaces Squarespace's oversized zero-comment composer with
   a compact editorial invitation. The real Squarespace comment
   form remains intact and is revealed on demand.
   ========================================================= */

(function () {
  'use strict';

  const ROOT_CLASS = 'mtf-comments-editorial';
  const OPEN_CLASS = 'mtf-comments-editorial--open';
  const ENHANCED_ATTR = 'data-mtf-comments-enhanced';

  let scheduled = false;

  function isPost() {
    return /^\/journal\/[^/]+\/?$/i.test(
      window.location.pathname
    ) && !/^\/journal\/(?:tag|category|page)\//i.test(
      window.location.pathname
    );
  }

  function scheduleEnhance() {
    if (scheduled) return;

    scheduled = true;

    window.requestAnimationFrame(function () {
      scheduled = false;
      enhance();
    });
  }

  function publicCommentCount(component, root) {
    const direct = Number(
      component.getAttribute('data-public-comment-count')
    );

    if (Number.isFinite(direct) && direct >= 0) {
      return direct;
    }

    return root.querySelectorAll(
      ':scope > .comment-list > .comment'
    ).length;
  }

  function makeIntro(commentCount) {
    const intro = document.createElement('div');
    intro.className = 'mtf-comments-editorial__intro';

    const title = document.createElement('div');
    title.className = 'mtf-comments-editorial__title';

    const leftRule = document.createElement('span');
    leftRule.setAttribute('aria-hidden', 'true');

    const heading = document.createElement('h2');
    heading.textContent = 'Comments';

    const rightRule = document.createElement('span');
    rightRule.setAttribute('aria-hidden', 'true');

    title.append(leftRule, heading, rightRule);

    const bubble = document.createElement('div');
    bubble.className = 'mtf-comments-editorial__bubble';
    bubble.setAttribute('aria-hidden', 'true');
    bubble.innerHTML = [
      '<svg viewBox="0 0 40 40" focusable="false">',
      '<path ',
      'd="M7.5 18.3c0-6.2 5.6-11.2 12.5-11.2s12.5 5 12.5 11.2S26.9 29.5 20 29.5c-1.6 0-3.1-.3-4.5-.7l-6.2 3 1.8-5.4c-2.3-2-3.6-4.9-3.6-8.1Z" ',
      'fill="none" stroke="currentColor" stroke-width="1.7" ',
      'stroke-linecap="round" stroke-linejoin="round"/>',
      '</svg>'
    ].join('');

    const prompt = document.createElement('div');
    prompt.className = 'mtf-comments-editorial__prompt';
    prompt.textContent = commentCount === 0
      ? 'Start the conversation'
      : 'Join the conversation';

    const sub = document.createElement('div');
    sub.className = 'mtf-comments-editorial__sub';
    sub.textContent =
      'Share your thoughts, ask a question, or say hello.';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mtf-comments-editorial__write';
    button.textContent = 'Write a Comment';

    intro.append(
      title,
      bubble,
      prompt,
      sub,
      button
    );

    return intro;
  }

  function makeListMeta(commentCount, nativeSort) {
    const meta = document.createElement('div');
    meta.className = 'mtf-comments-editorial__list-meta';

    const count = document.createElement('span');
    count.className = 'mtf-comments-editorial__count';
    count.textContent = commentCount === 1
      ? '1 COMMENT'
      : commentCount + ' COMMENTS';

    meta.appendChild(count);

    if (nativeSort) {
      meta.appendChild(nativeSort);
    }

    return meta;
  }

  function updateCount(component, root) {
    const commentCount = publicCommentCount(
      component,
      root
    );

    root.dataset.mtfCommentCount = String(commentCount);

    const prompt = root.querySelector(
      ':scope > .mtf-comments-editorial__intro ' +
      '.mtf-comments-editorial__prompt'
    );

    if (prompt) {
      prompt.textContent = commentCount === 0
        ? 'Start the conversation'
        : 'Join the conversation';
    }

    const count = root.querySelector(
      ':scope > .mtf-comments-editorial__list-meta ' +
      '.mtf-comments-editorial__count'
    );

    if (count) {
      count.textContent = commentCount === 1
        ? '1 COMMENT'
        : commentCount + ' COMMENTS';
    }

    return commentCount;
  }

  function enhance() {
    if (!isPost()) return false;

    if (
      window.MTF?.journalInternal?.isCurrent?.()
    ) {
      return false;
    }

    const component = document.querySelector(
      '.squarespace-comments'
    );

    const root = component && component.querySelector(
      'section#comments'
    );

    if (!component || !root) return false;

    if (root.hasAttribute(ENHANCED_ATTR)) {
      updateCount(component, root);
      return true;
    }

    const nativeHeader = root.querySelector(
      ':scope > .header-controls'
    );

    const topArea = root.querySelector(
      ':scope > .new-comment-area.top-level-comment-area'
    );

    const commentList = root.querySelector(
      ':scope > .comment-list'
    );

    const textarea = topArea && topArea.querySelector(
      'textarea.comment-input'
    );

    if (!topArea || !textarea) return false;

    const commentCount = publicCommentCount(
      component,
      root
    );

    root.classList.add(ROOT_CLASS);
    root.setAttribute(ENHANCED_ATTR, 'true');
    root.dataset.mtfCommentCount = String(commentCount);

    const intro = makeIntro(commentCount);

    // Deliberately keep the editorial UI outside Squarespace's
    // native .new-comment-area so it inherits the article page,
    // rather than the native composer panel treatment.
    root.insertBefore(intro, topArea);

    if (commentCount > 0 && commentList) {
      const nativeSort = nativeHeader && nativeHeader.querySelector(
        '.comment-sort'
      );

      const listMeta = makeListMeta(
        commentCount,
        nativeSort
      );

      root.insertBefore(listMeta, commentList);
    }

    const button = intro.querySelector(
      '.mtf-comments-editorial__write'
    );

    button.addEventListener('click', function () {
      root.classList.add(OPEN_CLASS);

      window.requestAnimationFrame(function () {
        textarea.focus();
        textarea.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      });
    });

    return true;
  }

  function watchForComments() {
    if (!isPost()) return;

    enhance();

    const article = document.querySelector(
      '.blog-item-comments'
    ) || document.body;

    if (!article) return;

    const observer = new MutationObserver(function (mutations) {
      const meaningful = mutations.some(function (mutation) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-public-comment-count'
        ) {
          return true;
        }

        return mutation.type === 'childList';
      });

      if (meaningful) {
        scheduleEnhance();
      }
    });

    observer.observe(article, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        'data-public-comment-count'
      ]
    });
  }

  window.MTF = window.MTF || {};
  window.MTF.journalComments = {
    init: watchForComments,
    enhance: enhance
  };

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      watchForComments,
      { once: true }
    );
  } else {
    watchForComments();
  }
})();

