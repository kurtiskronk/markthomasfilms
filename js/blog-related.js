
/* =========================================================
	 MARK THOMAS FILMS — OTHER POSTS YOU MAY BE INTERESTED IN

	 Uses public Squarespace /blog archive HTML. No manual list
	 or invented articles. Shows up to three posts, no carousel.
	 Future category/tag matching is ready when Mark adds them.
	 ========================================================= */

(function () {
	'use strict';

	window.MTF = window.MTF || {};

	const MAX_POSTS = 3;
	const MAX_ARCHIVE_PAGES = 8;

	function isPost() {
		return /^\/blog\/[^/]+\/?$/i.test(
			location.pathname
		) && !/^\/blog\/(?:tag|category|page)\//i.test(
			location.pathname
		);
	}

	function canonical(value, base) {
		try {
			const u = new URL(
				value,
				base || location.origin
			);

			if (u.origin !== location.origin) return '';

			return u.pathname.replace(/\/+$/, '') || '/';
		} catch (error) {
			return '';
		}
	}

	function postPath(value, base) {
		const path = canonical(value, base);

		return /^\/blog\/[^/]+$/i.test(path) &&
			!/^\/blog\/(?:tag|category|page)$/i.test(path)
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
		).map(function (a) {
			return cleanText(
				a.textContent
			).toLowerCase();
		}).filter(Boolean);
	}

	function articleData(container, base) {
		const links = Array.from(
			container.querySelectorAll('a[href]')
		);

		const titleLink = links.find(function (a) {
			return a.closest(
				'.blog-title, .entry-title, .blog-item-title, h2, h3'
			) && postPath(
				a.getAttribute('href'),
				base
			);
		}) || links.find(function (a) {
			return postPath(
				a.getAttribute('href'),
				base
			) && cleanText(a.textContent).length > 6;
		});

		if (!titleLink) return null;

		const path = postPath(
			titleLink.getAttribute('href'),
			base
		);

		const title = cleanText(
			titleLink.textContent
		);

		if (!path || !title) return null;

		const img = container.querySelector('img');

		const image = img
			? img.getAttribute('data-src') ||
				img.getAttribute('src') ||
				''
			: '';

		const excerptNode = container.querySelector(
			'.blog-excerpt, ' +
			'.blog-excerpt-wrapper, ' +
			'.summary-excerpt, ' +
			'.blog-item-excerpt'
		);

		const excerpt = excerptNode
			? cleanText(
					excerptNode.textContent
				).slice(0, 160)
			: '';

		const time = container.querySelector(
			'time[datetime], time, .blog-meta-item--date'
		);

		const date = time
			? time.getAttribute('datetime') ||
				cleanText(time.textContent)
			: '';

		return {
			path: path,
			title: title,
			image: image
				? new URL(image, base).href
				: '',
			excerpt: excerpt,
			date: date,
			categories: taxonomy(
				container,
				'category'
			),
			tags: taxonomy(
				container,
				'tag'
			)
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

		return containers.map(function (el) {
			return articleData(el, base);
		}).filter(Boolean);
	}

	function nextPage(doc, base) {
		const candidates = [
			'.blog-list-pagination .older a[href]',
			'.blog-list-pagination a[rel="next"]',
			'.pagination .next a[href]'
		];

		for (const selector of candidates) {
			const a = doc.querySelector(selector);

			if (!a) continue;

			try {
				const u = new URL(
					a.getAttribute('href'),
					base
				);

				if (
					u.origin === location.origin &&
					/^\/blog\/?$/i.test(u.pathname)
				) {
					return u.href;
				}
			} catch (error) {
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
			categories: taxonomy(
				article,
				'category'
			),
			tags: taxonomy(
				article,
				'tag'
			)
		};
	}

	function score(post, current) {
		// When posts gain categories/tags, shared subjects are
		// prioritized. Until then, archive order is preserved.

		const sharedCategories = post.categories.filter(
			function (cat) {
				return current.categories.includes(cat);
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
			'/blog',
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
					'Blog archive HTTP ' + response.status
				);
			}

			const doc = new DOMParser().parseFromString(
				await response.text(),
				'text/html'
			);

			parsePosts(
				doc,
				next
			).forEach(function (post) {
				if (
					post.path !== canonical(location.pathname) &&
					!found.has(post.path)
				) {
					found.set(post.path, post);
				}
			});

			next = nextPage(doc, next);

			// If there are no assigned categories/tags,
			// three posts suffice. Otherwise scan additional
			// archive pages for closer matches.
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

		return Array.from(
			found.values()
		).map(function (post, index) {
			return {
				post: post,
				score: score(post, terms),
				index: index
			};
		}).sort(function (a, b) {
			return b.score - a.score ||
				a.index - b.index;
		}).slice(
			0,
			MAX_POSTS
		).map(function (item) {
			return item.post;
		});
	}

	function card(post) {
		const article = document.createElement(
			'article'
		);

		article.className =
			'mtf-blog-related__card';

		const media = document.createElement(
			'a'
		);

		media.className =
			'mtf-blog-related__media';

		media.href = post.path;

		media.setAttribute(
			'aria-label',
			'Read ' + post.title
		);

		if (post.image) {
			const img = document.createElement(
				'img'
			);

			img.src = post.image;
			img.alt = '';
			img.loading = 'lazy';

			media.appendChild(img);
		} else {
			media.classList.add(
				'mtf-blog-related__media--empty'
			);

			media.textContent =
				'Mark Thomas Films';
		}

		const body = document.createElement(
			'div'
		);

		body.className =
			'mtf-blog-related__body';

		if (
			post.categories.length ||
			post.date
		) {
			const meta = document.createElement(
				'p'
			);

			meta.className =
				'mtf-blog-related__meta';

			meta.textContent = [
				post.categories[0] || '',
				post.date || ''
			].filter(Boolean).join(' · ');

			body.appendChild(meta);
		}

		const title = document.createElement(
			'h3'
		);

		title.className =
			'mtf-blog-related__card-title';

		const link = document.createElement(
			'a'
		);

		link.href = post.path;
		link.textContent = post.title;

		title.appendChild(link);
		body.appendChild(title);

		if (post.excerpt) {
			const excerpt = document.createElement(
				'p'
			);

			excerpt.className =
				'mtf-blog-related__excerpt';

			excerpt.textContent = post.excerpt;

			body.appendChild(excerpt);
		}

		article.append(media, body);

		return article;
	}

	function render(posts) {
		if (
			!posts.length ||
			document.querySelector('.mtf-blog-related')
		) {
			return;
		}

		const section = document.createElement(
			'section'
		);

		section.className =
			'mtf-blog-related';

		section.setAttribute(
			'aria-labelledby',
			'mtf-blog-related-title'
		);

		const inner = document.createElement(
			'div'
		);

		inner.className =
			'mtf-blog-related__inner';

		const heading = document.createElement(
			'div'
		);

		heading.className =
			'mtf-blog-related__heading';

		const eyebrow = document.createElement(
			'span'
		);

		eyebrow.className =
			'mtf-blog-related__eyebrow';

		eyebrow.textContent =
			'Continue Reading';

		const title = document.createElement(
			'h2'
		);

		title.id =
			'mtf-blog-related-title';

		title.className =
			'mtf-blog-related__title';

		title.textContent =
			'Other Posts You May Be Interested In';

		heading.append(eyebrow, title);

		const grid = document.createElement(
			'div'
		);

		grid.className =
			'mtf-blog-related__grid';

		grid.dataset.count =
			String(posts.length);

		posts.forEach(function (post) {
			grid.appendChild(card(post));
		});

		const footer = document.createElement(
			'div'
		);

		footer.className =
			'mtf-blog-related__footer';

		const all = document.createElement(
			'a'
		);

		all.className =
			'mtf-blog-related__all';

		all.href = '/blog';

		all.textContent =
			'Explore All Articles';

		footer.appendChild(all);

		inner.append(
			heading,
			grid,
			footer
		);

		section.appendChild(inner);

		const pagination = document.querySelector(
			'#itemPagination, .item-pagination'
		);

		if (
			pagination &&
			pagination.parentNode
		) {
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
			.then(render)
			.catch(function (error) {
				console.warn(
					'MTF: unable to retrieve related blog posts:',
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
