
/* =====================================================
	 MARK THOMAS FILMS — JOURNAL ARCHIVE
	 ===================================================== */

(() => {
	'use strict';

	const ARCHIVE =
		'.blog-single-column.collection-content-wrapper';

	const CARD =
		'article.blog-single-column--container';


	/* PAGE DETECTION */

	function pageInfo() {
		const path =
			location.pathname.replace(/\/+$/, '') || '/';

		const match = path.match(
			/^\/blog\/(tag|category)\/([^/]+)$/i
		);

		const home = path === '/blog';

		const pagination =
			/^\/blog\/page\/[^/]+$/i.test(path);

		if (!home && !match && !pagination) {
			return null;
		}

		const params = new URLSearchParams(
			location.search
		);

		const type = match
			? match[1].toLowerCase()
			: params.has('tag')
				? 'tag'
				: params.has('category')
					? 'category'
					: '';

		const raw = match
			? match[2].replace(/\+/g, ' ')
			: params.get('tag') ||
				params.get('category') ||
				'';

		let name = raw;

		if (match) {
			try {
				name = decodeURIComponent(raw);
			} catch (_) {
				/* Retain original value. */
			}
		}

		return {
			showHero:
				home &&
				!type &&
				!params.has('offset') &&
				!params.has('page'),

			type,
			name: name.trim()
		};
	}


	/* URL UTILITIES */

	function articlePath(value) {
		try {
			const url = new URL(
				value,
				location.origin
			);

			const path = url.pathname.replace(
				/\/+$/,
				''
			);

			return (
				url.origin === location.origin &&
				/^\/blog\/[^/]+$/i.test(path) &&
				!/^\/blog\/(?:tag|category|page)$/i.test(path)
			)
				? path
				: '';

		} catch (_) {
			return '';
		}
	}

	const termURL = (type, name) =>
		'/blog/' +
		type +
		'/' +
		encodeURIComponent(name).replace(
			/%20/g,
			'+'
		);


	/* TAGS AND CATEGORIES */

	function nativeTerms(card, type) {
		const prefix =
			'/blog/' + type + '/';

		const result = [];

		card.querySelectorAll(
			'a[href]'
		).forEach(link => {

			// Never extract tags from the full article.
			if (
				link.closest('.blog-body-wrapper')
			) {
				return;
			}

			const path = new URL(
				link.href,
				location.origin
			).pathname;

			const name =
				link.textContent.trim();

			if (
				path.startsWith(prefix) &&
				name &&
				!result.some(
					x =>
						x.name.toLowerCase() ===
						name.toLowerCase()
				)
			) {
				result.push({
					name,
					href: path
				});
			}
		});

		return result;
	}

	function jsonTerms(value, type) {
		const entries = Array.isArray(value)
			? value
			: value
				? [value]
				: [];

		const seen = new Set();

		return entries.map(entry => {

			const name =
				typeof entry === 'string'
					? entry
					: entry &&
						(
							entry.name ||
							entry.title ||
							entry.label
						) ||
						'';

			const text = String(name).trim();

			if (
				!text ||
				seen.has(text.toLowerCase())
			) {
				return null;
			}

			seen.add(text.toLowerCase());

			return {
				name: text,
				href: termURL(type, text)
			};

		}).filter(Boolean);
	}


	/* TAXONOMY DISPLAY */

	function taxonomyGroup(terms, type) {
		const group =
			document.createElement('span');

		group.className =
			'mtf-journal-taxonomy__' + type;

		terms.forEach((term, i) => {

			if (i) {
				const separator =
					document.createElement('span');

				separator.textContent = '|';

				separator.setAttribute(
					'aria-hidden',
					'true'
				);

				group.appendChild(separator);
			}

			const link =
				document.createElement('a');

			link.href = term.href;
			link.textContent = term.name;

			group.appendChild(link);
		});

		return group;
	}

	function applyTaxonomy(
		card,
		categories,
		tags
	) {
		const title =
			card.querySelector('.blog-title');

		if (!title) return;

		card.querySelector(
			'.mtf-journal-eyebrow'
		)?.remove();

		card.querySelector(
			'.mtf-journal-taxonomy'
		)?.remove();

		const primary =
			tags[0] || categories[0];

		// Featured tag above the article title.
		if (primary) {
			const eyebrow =
				document.createElement('div');

			eyebrow.className =
				'mtf-journal-eyebrow';

			const link =
				document.createElement('a');

			link.href = primary.href;
			link.textContent = primary.name;

			eyebrow.appendChild(link);

			title.before(eyebrow);
		}

		if (
			!tags.length &&
			!categories.length
		) {
			return;
		}

		const nav =
			document.createElement('nav');

		nav.className =
			'mtf-journal-taxonomy';

		nav.setAttribute(
			'aria-label',
			'Article categories and tags'
		);

		if (categories.length) {
			nav.appendChild(
				taxonomyGroup(
					categories,
					'categories'
				)
			);
		}

		if (
			categories.length &&
			tags.length
		) {
			const sep =
				document.createElement('span');

			sep.textContent = '|';

			sep.setAttribute(
				'aria-hidden',
				'true'
			);

			nav.appendChild(sep);
		}

		if (tags.length) {
			nav.appendChild(
				taxonomyGroup(tags, 'tags')
			);
		}

		title.after(nav);
	}


	/* STATIC JOURNAL HERO */

	function insertHero(archive) {
		if (
			document.querySelector(
				'.mtf-journal-hero'
			)
		) {
			return;
		}

		const section =
			document.createElement('section');

		section.className =
			'mtf-journal-hero';

		section.setAttribute(
			'aria-label',
			'Journal introduction'
		);

		section.innerHTML = `
			<div class="mtf-journal-hero__inner">

				<p class="mtf-journal-hero__eyebrow">
					Journal
				</p>

				<h2 class="mtf-journal-hero__title">
					Stories, perspective<br>
					and everything in between.
				</h2>

				<p class="mtf-journal-hero__subtitle">
					Thoughts on wedding filmmaking,<br>
					creative process and real events.
				</p>

			</div>
		`;

		archive.before(section);
	}


	/* ARTICLE ENHANCEMENT */

	function enhanceCard(card) {
		if (card.dataset.mtfJournalReady) {
			return null;
		}

		const title =
			card.querySelector(
				'.blog-title a[href]'
			);

		const path =
			title && articlePath(title.href);

		if (!path) return null;

		card.dataset.mtfJournalReady = '1';

		const categories =
			nativeTerms(card, 'category');

		const tags =
			nativeTerms(card, 'tag');

		applyTaxonomy(
			card,
			categories,
			tags
		);

		// Read More stays inside the excerpt column.
		const excerpt =
			card.querySelector('.blog-excerpt');

		if (
			excerpt &&
			!excerpt.querySelector(
				'.mtf-journal-read-more'
			)
		) {
			const link =
				document.createElement('a');

			link.className =
				'mtf-journal-read-more';

			link.href = path;
			link.textContent = 'Read More';

			link.setAttribute(
				'aria-label',
				'Read more: ' +
					title.textContent.trim()
			);

			excerpt.appendChild(link);
		}

		// The article row is clickable, but its tag,
		// category and title links remain independent.
		card.addEventListener(
			'click',
			event => {

				if (
					event.button !== 0 ||
					event.metaKey ||
					event.ctrlKey ||
					event.shiftKey ||
					event.altKey ||
					event.target.closest(
						'a, button, input, select, textarea, label'
					)
				) {
					return;
				}

				const selection =
					window.getSelection();

				if (
					selection &&
					!selection.isCollapsed
				) {
					return;
				}

				location.assign(path);
			}
		);

		return {
			card,
			path,
			categories,
			tags
		};
	}


	/* OPTIONAL SQUARESPACE METADATA */

	async function loadMetadata() {
		try {
			const url = new URL(
				location.href
			);

			url.searchParams.set(
				'format',
				'json'
			);

			const res = await fetch(
				url,
				{
					credentials: 'same-origin',
					headers: {
						Accept: 'application/json'
					}
				}
			);

			if (!res.ok) {
				return new Map();
			}

			const data =
				await res.json();

			const items =
				data.items ||
				data.collection?.items ||
				[];

			const map = new Map();

			items.forEach(item => {

				const candidate =
					item.fullUrl ||
					item.url ||
					(
						item.urlId
							? '/blog/' +
								String(item.urlId).replace(
									/^\/blog\//,
									''
								)
							: ''
					);

				const path =
					candidate &&
					articlePath(candidate);

				if (path) {
					map.set(path, item);
				}
			});

			return map;

		} catch (_) {
			return new Map();
		}
	}


	/* INITIALIZATION */

	async function init() {
		const info = pageInfo();

		if (!info) return;

		document.documentElement.classList.add(
			'mtf-blog-archive-page'
		);

		const archive =
			document.querySelector(ARCHIVE);

		if (!archive) return;

		if (info.showHero) {
			insertHero(archive);
		}

		const records = [
			...archive.querySelectorAll(CARD)
		]
			.map(enhanceCard)
			.filter(Boolean);

		// The current tag/category is a fallback
		// when Squarespace omits listing metadata.
		records.forEach(record => {

			if (!info.name) return;

			if (
				info.type === 'tag' &&
				!record.tags.length
			) {
				record.tags = [{
					name: info.name,
					href: termURL(
						'tag',
						info.name
					)
				}];
			}

			if (
				info.type === 'category' &&
				!record.categories.length
			) {
				record.categories = [{
					name: info.name,
					href: termURL(
						'category',
						info.name
					)
				}];
			}

			applyTaxonomy(
				record.card,
				record.categories,
				record.tags
			);
		});

		const metadata =
			await loadMetadata();

		records.forEach(record => {

			const item =
				metadata.get(record.path);

			if (!item) return;

			const categories =
				jsonTerms(
					item.categories ||
					item.category,
					'category'
				);

			const tags =
				jsonTerms(
					item.tags,
					'tag'
				);

			applyTaxonomy(
				record.card,
				categories.length
					? categories
					: record.categories,
				tags.length
					? tags
					: record.tags
			);
		});
	}

	if (
		document.readyState === 'loading'
	) {
		document.addEventListener(
			'DOMContentLoaded',
			init,
			{ once: true }
		);
	} else {
		init();
	}

})();
