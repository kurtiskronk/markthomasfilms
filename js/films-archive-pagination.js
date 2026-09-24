/* =========================================================
	 MARK THOMAS FILMS — FILM ARCHIVE: LOAD MORE

	 Native Squarespace pagination remains in the HTML as a
	 fallback. On the first tag-archive page, this module:
	 - Keeps the initial Squarespace film cards in place.
	 - Replaces visible Older/Newer navigation with Load More.
	 - Appends up to 60 additional films per click.
	 - Preserves unfinished native pages between clicks.
	 - Leaves the header, footer and testimonials untouched.

	 Directly opened ?offset= pages keep native navigation so
	 visitors arriving through an old link can go backward.
	 ========================================================= */
(function () {
	'use strict';

	window.MTF = window.MTF || {};

	const GRID_SELECTOR = '.blog-basic-grid.collection-content-wrapper';
	const CARD_SELECTOR = 'article.blog-item';
	const BATCH_SIZE = 60;
	const COUNT_CACHE_PREFIX = 'mtf-film-count-v5:';
	const pageCache = new Map();

	function absoluteURL(value, base) {
		try {
			const url = new URL(value, base || window.location.href);
			if (url.origin !== window.location.origin) return '';
			url.hash = '';
			return url.href;
		} catch (error) {
			return '';
		}
	}

	function getCurrentTag() {
		const path = window.location.pathname.match(/^\/films\/tag\/([^/]+)\/?$/i);
		if (path) {
			let value = path[1].replace(/\+/g, ' ');
			try { value = decodeURIComponent(value); } catch (error) { /* Keep original. */ }
			return value.trim();
		}
		if (!/^\/films\/?$/i.test(window.location.pathname)) return '';
		return (new URLSearchParams(window.location.search).get('tag') || '').trim();
	}

	function isLaterPage() {
		const params = new URLSearchParams(window.location.search);
		return params.has('offset') || params.has('page');
	}

	function canonicalTagURL(tag) {
		return window.location.origin + '/films/tag/' +
			encodeURIComponent(tag).replace(/%20/g, '+');
	}

	function paginationLink(root, direction) {
		if (!root) return null;
		const className = direction === 'older' ? '.older' : '.newer';
		const scoped = root.querySelector('.blog-list-pagination ' + className + ' a[href]');
		if (scoped) return scoped;

		const labels = direction === 'older'
			? ['older posts', 'older films']
			: ['newer posts', 'newer films'];
		return Array.from(root.querySelectorAll('.blog-list-pagination a[href]'))
			.find(function (link) {
				return labels.includes(link.textContent.trim().toLowerCase());
			}) || root.querySelector(direction === 'older'
				? '.blog-list-pagination a[rel="next"]'
				: '.blog-list-pagination a[rel="prev"]');
	}

	function olderURL(root, base) {
		const link = paginationLink(root, 'older');
		return link ? absoluteURL(link.getAttribute('href'), base) : '';
	}

	function filmKey(card) {
		const link = card.querySelector('.blog-title a[href]');
		if (link) return absoluteURL(link.getAttribute('href'), window.location.origin);
		return card.getAttribute('data-item-id') || card.id || '';
	}

	function existingKeys(grid) {
		const keys = new Set();
		grid.querySelectorAll(CARD_SELECTOR).forEach(function (card) {
			const key = filmKey(card);
			if (key) keys.add(key);
		});
		return keys;
	}

	function fetchArchivePage(url) {
		const address = absoluteURL(url);
		if (!address) return Promise.reject(new Error('Invalid archive URL.'));
		if (pageCache.has(address)) return pageCache.get(address);

		const request = fetch(address, { credentials: 'same-origin' })
			.then(function (response) {
				if (!response.ok) throw new Error('Archive request failed: ' + response.status);
				return response.text();
			})
			.then(function (html) {
				return {
					url: address,
					document: new DOMParser().parseFromString(html, 'text/html')
				};
			})
			.catch(function (error) {
				// An unsuccessful request must be retryable on the next click.
				pageCache.delete(address);
				throw error;
			});

		pageCache.set(address, request);
		return request;
	}

	async function countAllFilms(tag) {
		const cacheKey = COUNT_CACHE_PREFIX + tag.trim().toLowerCase();
		try {
			const cached = Number(sessionStorage.getItem(cacheKey));
			if (Number.isInteger(cached) && cached > 0) return cached;
		} catch (error) { /* Storage may be disabled. */ }

		let url = canonicalTagURL(tag);
		const visited = new Set();
		const unique = new Set();
		let withoutKey = 0;

		while (url && visited.size < 200) {
			if (visited.has(url)) break;
			visited.add(url);

			const page = await fetchArchivePage(url);
			const grid = page.document.querySelector(GRID_SELECTOR);
			if (!grid) break;
			grid.querySelectorAll(CARD_SELECTOR).forEach(function (card) {
				const key = filmKey(card);
				if (key) unique.add(key);
				else withoutKey += 1;
			});
			url = olderURL(page.document, page.url);
		}

		const total = unique.size + withoutKey;
		if (total > 0) {
			try { sessionStorage.setItem(cacheKey, String(total)); }
			catch (error) { /* Storage may be disabled. */ }
		}
		return total;
	}

	function processCard(card) {
		if (window.MTF.filmCards &&
				typeof window.MTF.filmCards.process === 'function') {
			window.MTF.filmCards.process(card);
		}
	}

	function appendCard(grid, source) {
		const card = document.importNode(source, true);
		card.style.opacity = '1';
		card.style.visibility = 'visible';
		card.style.transform = 'none';
		card.removeAttribute('data-animation-state');

		card.querySelectorAll('img').forEach(function (image) {
			image.loading = 'lazy';
			if (!image.getAttribute('src') && image.getAttribute('data-src')) {
				image.src = image.getAttribute('data-src');
			}
		});

		// Insert alongside existing cards, not after Squarespace pagination.
		const cards = grid.querySelectorAll(CARD_SELECTOR);
		const last = cards.length ? cards[cards.length - 1] : null;
		if (last) last.insertAdjacentElement('afterend', card);
		else grid.prepend(card);
		processCard(card);
	}

	/* The cursor includes an index, so stopping halfway through a
		 native Squarespace page never skips the unconsumed cards. */
	async function loadBatch(grid, state) {
		let added = 0;
		const visited = new Set();

		while (state.cursor.url && added < BATCH_SIZE && visited.size < 200) {
			const token = state.cursor.url + '|' + state.cursor.index;
			if (visited.has(token)) throw new Error('Archive pagination loop detected.');
			visited.add(token);

			const page = await fetchArchivePage(state.cursor.url);
			const nextGrid = page.document.querySelector(GRID_SELECTOR);
			if (!nextGrid) throw new Error('Film grid missing from fetched archive page.');
			const cards = Array.from(nextGrid.querySelectorAll(CARD_SELECTOR));

			for (let index = state.cursor.index;
					 index < cards.length && added < BATCH_SIZE;
					 index += 1) {
				const source = cards[index];
				const key = filmKey(source);
				if (!key || !state.keys.has(key)) {
					appendCard(grid, source);
					if (key) state.keys.add(key);
					added += 1;
				}
				state.cursor.index = index + 1;
			}

			if (state.cursor.index >= cards.length) {
				const following = olderURL(page.document, page.url);
				state.cursor.url = following && following !== page.url ? following : '';
				state.cursor.index = 0;
			}
			// Otherwise, the next click resumes at cursor.index on this page.
		}

		return added;
	}

	// Preserve the archive-count slot used by films-header.js.
	// The separate "Showing X of Y" status remains below the film grid.
	function displayArchiveCount(count) {
		if (!Number.isInteger(count) || count <= 0) return;
		const slot = document.querySelector('.mtf-film-count-slot');
		if (!slot) return;
		let element = slot.querySelector('.mtf-film-count');
		if (!element) {
			element = document.createElement('p');
			element.className = 'mtf-film-count';
			slot.appendChild(element);
		}
		element.textContent = count + (count === 1 ? ' film' : ' films');
	}

	function nativePaginationNodes() {
		const nodes = Array.from(document.querySelectorAll('.blog-list-pagination'));
		['older', 'newer'].forEach(function (direction) {
			const link = paginationLink(document, direction);
			if (!link) return;
			const parent = link.closest('.blog-list-pagination, .blog-pagination, .pagination') ||
				link.closest('.older, .newer');
			if (parent && !nodes.includes(parent)) nodes.push(parent);
		});
		return nodes;
	}

	function hideNative(state) {
		state.native.forEach(function (item) {
			item.node.style.setProperty('display', 'none', 'important');
		});
	}

	function restoreNative(state) {
		state.native.forEach(function (item) {
			if (item.display) item.node.style.setProperty('display', item.display, item.priority);
			else item.node.style.removeProperty('display');
		});
	}

	function createControls(grid) {
		const wrapper = document.createElement('div');
		wrapper.className = 'mtf-film-load-more';

		// Structural styles ensure this is a complete row, even if the
		// Squarespace parent itself happens to use CSS Grid.
		Object.assign(wrapper.style, {
			boxSizing: 'border-box',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			gridColumn: '1 / -1',
			flexBasis: '100%',
			clear: 'both',
			width: '100%',
			maxWidth: '1180px',
			marginLeft: 'auto',
			marginRight: 'auto',
			textAlign: 'center'
		});

		const status = document.createElement('p');
		status.className = 'mtf-film-load-more__status';
		status.setAttribute('aria-live', 'polite');
		status.style.textAlign = 'center';

		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'mtf-button mtf-film-load-more__button';
		button.textContent = 'Load More Films';

		wrapper.appendChild(status);
		wrapper.appendChild(button);

		// IMPORTANT: outside .blog-basic-grid, never among the cards.
		grid.insertAdjacentElement('afterend', wrapper);
		return { wrapper: wrapper, status: status, button: button };
	}

	function init() {
		const tag = getCurrentTag();
		if (!tag || isLaterPage()) return;

		const grid = document.querySelector(GRID_SELECTOR);
		if (!grid || document.querySelector('.mtf-film-load-more')) return;
		const firstURL = olderURL(document, window.location.href);
		if (!firstURL) return;

		const state = {
			cursor: { url: firstURL, index: 0 },
			keys: existingKeys(grid),
			total: null,
			loading: false,
			native: nativePaginationNodes().map(function (node) {
				return {
					node: node,
					display: node.style.getPropertyValue('display'),
					priority: node.style.getPropertyPriority('display')
				};
			})
		};

		const ui = createControls(grid);

		function displayedCount() {
			return grid.querySelectorAll(CARD_SELECTOR).length;
		}

		function updateStatus() {
			const shown = displayedCount();
			const total = state.total && state.total >= shown ? state.total : null;
			ui.status.textContent = total
				? 'Showing ' + shown + ' of ' + total + ' films'
				: 'Showing ' + shown + ' films';
			if (!state.cursor.url) {
				ui.status.textContent = 'Showing all ' + shown + ' films';
				ui.button.hidden = true;
				ui.button.style.setProperty('display', 'none', 'important');
			}
		}

		hideNative(state);
		updateStatus();

		// Count in the background: don't delay the button while 38 or more
		// film pages are being counted.
		countAllFilms(tag).then(function (total) {
			if (total > 0) {
				state.total = total;
				displayArchiveCount(total);
			}
			if (!state.loading) updateStatus();
		}).catch(function (error) {
			console.warn('MTF: unable to count films:', error);
		});

		ui.button.addEventListener('click', async function () {
			if (state.loading || !state.cursor.url) return;
			state.loading = true;
			ui.button.disabled = true;
			ui.button.textContent = 'Loading Films…';
			ui.status.textContent = 'Loading additional films…';
			grid.setAttribute('aria-busy', 'true');

			try {
				const added = await loadBatch(grid, state);
				if (added === 0 && state.cursor.url) {
					throw new Error('No additional films were returned.');
				}

				// Keep the native fallback pointing at the next unconsumed page.
				const older = paginationLink(document, 'older');
				if (older && state.cursor.url) older.href = state.cursor.url;
				hideNative(state);
				updateStatus();
			} catch (error) {
				console.warn('MTF: unable to load more films:', error);
				const older = paginationLink(document, 'older');
				if (older && state.cursor.url) older.href = state.cursor.url;
				restoreNative(state);
				ui.status.textContent = 'Unable to load more films. Try again or use Older Films below.';
			} finally {
				state.loading = false;
				ui.button.disabled = false;
				ui.button.textContent = 'Load More Films';
				grid.removeAttribute('aria-busy');
			}
		});
	}

	window.MTF.filmArchivePagination = { init: init };
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init, { once: true });
	} else {
		init();
	}
})();
