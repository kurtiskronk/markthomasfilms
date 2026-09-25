
/* =========================================================
	 MARK THOMAS FILMS — SHARED FILM ARCHIVE PAGINATION

	 One Load More controller for /films and /films/tag/*.
	 Also supports category archives without a second codepath.
	 Uses Squarespace's own next-page URLs internally;
	 native archive pagination is hidden after initialization.
	 ========================================================= */
(function () {
	'use strict';

	window.MTF = window.MTF || {};

	const GRID_SELECTOR = '.blog-basic-grid.collection-content-wrapper';
	const CARD_SELECTOR = 'article.blog-item';
	const BATCH_SIZE = 60;
	const COUNT_CACHE_PREFIX = 'mtf-film-count-v6:';
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

	function canonicalArchiveURL(type, name) {
		if (type === 'all') return window.location.origin + '/films';
		return window.location.origin + '/films/' + type + '/' +
			encodeURIComponent(name).replace(/%20/g, '+');
	}

	function getCurrentArchive() {
		const path = window.location.pathname;
		const match = path.match(/^\/films\/(tag|category)\/([^/]+)\/?$/i);
		const params = new URLSearchParams(window.location.search);

		if (match) {
			// Literal + separates words; percent-encoded %2B remains a plus sign.
			let name = match[2].replace(/\+/g, ' ');
			try { name = decodeURIComponent(name); } catch (error) { /* Keep input. */ }
			name = name.trim();
			if (!name) return null;
			const type = match[1].toLowerCase();
			return {
				key: type + ':' + name.toLowerCase(),
				url: canonicalArchiveURL(type, name)
			};
		}

		if (!/^\/films\/?$/i.test(path)) return null;

		for (const type of ['tag', 'category']) {
			const name = (params.get(type) || '').trim();
			if (name) return {
				key: type + ':' + name.toLowerCase(),
				url: canonicalArchiveURL(type, name)
			};
		}

		return { key: 'all', url: canonicalArchiveURL('all', '') };
	}

	function paginationLink(root, direction) {
		if (!root) return null;
		const selector = direction === 'older' ? '.older' : '.newer';
		const direct = root.querySelector('.blog-list-pagination ' + selector + ' a[href]');
		if (direct) return direct;

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
				pageCache.delete(address); // Retry failed requests on the next click.
				throw error;
			});

		pageCache.set(address, request);
		return request;
	}

	async function countAllFilms(archive) {
		const cacheKey = COUNT_CACHE_PREFIX + archive.key;
		try {
			const cached = Number(sessionStorage.getItem(cacheKey));
			if (Number.isInteger(cached) && cached > 0) return cached;
		} catch (error) { /* Storage may be unavailable. */ }

		let url = archive.url;
		const visited = new Set();
		const unique = new Set();
		let withoutKey = 0;
		let complete = true;

		while (url && visited.size < 200) {
			if (visited.has(url)) {
				complete = false;
				break;
			}
			visited.add(url);

			const page = await fetchArchivePage(url);
			const grid = page.document.querySelector(GRID_SELECTOR);
			if (!grid) {
				complete = false;
				break;
			}
			grid.querySelectorAll(CARD_SELECTOR).forEach(function (card) {
				const key = filmKey(card);
				if (key) unique.add(key);
				else withoutKey += 1;
			});
			url = olderURL(page.document, page.url);
		}

		if (url) complete = false; // Prevent caching a partial total.
		const total = unique.size + withoutKey;
		if (complete && total > 0) {
			try { sessionStorage.setItem(cacheKey, String(total)); }
			catch (error) { /* Storage may be unavailable. */ }
		}
		return complete ? total : 0;
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

		const cards = grid.querySelectorAll(CARD_SELECTOR);
		const last = cards.length ? cards[cards.length - 1] : null;
		if (last) last.insertAdjacentElement('afterend', card);
		else grid.prepend(card);
		processCard(card);
	}

	// The URL + index cursor avoids skipping cards when a batch stops
	// halfway through a native Squarespace pagination page.
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
		}

		if (state.cursor.url && visited.size >= 200) {
			throw new Error('Archive exceeded the pagination safety limit.');
		}
		return added;
	}

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

	function createControls(grid) {
		const wrapper = document.createElement('div');
		wrapper.className = 'mtf-film-load-more';

		const status = document.createElement('p');
		status.className = 'mtf-film-load-more__status';
		status.setAttribute('role', 'status');
		status.setAttribute('aria-live', 'polite');

		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'mtf-button mtf-film-load-more__button';
		button.textContent = 'Load More Films';

		wrapper.append(status, button);
		grid.insertAdjacentElement('afterend', wrapper); // Never a grid card.
		return { wrapper, status, button };
	}

	function init() {
		const archive = getCurrentArchive();
		if (!archive) return;

		// Only turn the initial collection page into Load More. Pagination
		// URLs remain internal fetch targets, not visible navigation choices.
		const params = new URLSearchParams(window.location.search);
		if (params.has('offset') || params.has('page')) return;

		const grid = document.querySelector(GRID_SELECTOR);
		if (!grid || document.querySelector('.mtf-film-load-more')) return;

		const firstURL = olderURL(document, window.location.href);
		const state = {
			cursor: { url: firstURL, index: 0 },
			keys: existingKeys(grid),
			total: null,
			loading: false
		};
		const ui = createControls(grid);
		document.body.classList.add('mtf-load-more-active');

		function displayedCount() {
			return grid.querySelectorAll(CARD_SELECTOR).length;
		}

		function updateStatus() {
			const shown = displayedCount();
			const total = state.total && state.total >= shown ? state.total : null;
			if (!state.cursor.url) {
				ui.status.textContent = 'Showing all ' + shown + ' films';
				ui.button.hidden = true;
			} else {
				ui.status.textContent = total
					? 'Showing ' + shown + ' of ' + total + ' films'
					: 'Showing ' + shown + ' films';
				ui.button.hidden = false;
			}
		}

		updateStatus();

		if (firstURL) {
			// Count asynchronously; never delay the Load More button.
			countAllFilms(archive).then(function (total) {
				if (total > 0) {
					state.total = total;
					displayArchiveCount(total);
				}
				if (!state.loading) updateStatus();
			}).catch(function (error) {
				console.warn('MTF: unable to count films:', error);
			});
		} else {
			displayArchiveCount(displayedCount());
		}

		ui.button.addEventListener('click', async function () {
			if (state.loading || !state.cursor.url) return;
			state.loading = true;
			ui.button.disabled = true;
			ui.button.textContent = 'Loading Films…';
			ui.status.textContent = 'Loading additional films…';
			grid.setAttribute('aria-busy', 'true');

			try {
				const added = await loadBatch(grid, state);
				if (!added && state.cursor.url) {
					throw new Error('No additional films were returned.');
				}
				updateStatus();
			} catch (error) {
				console.warn('MTF: unable to load more films:', error);
				ui.status.textContent = 'Unable to load more films. Please try again.';
			} finally {
				state.loading = false;
				ui.button.disabled = false;
				ui.button.textContent = 'Load More Films';
				grid.removeAttribute('aria-busy');
			}
		});
	}

	window.MTF.filmArchivePagination = { init };
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init, { once: true });
	} else {
		init();
	}
})();
