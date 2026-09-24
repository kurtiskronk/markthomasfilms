(function () {

	'use strict';


	window.MTF =
		window.MTF || {};


	const GRID_SELECTOR =
		'.blog-basic-grid.collection-content-wrapper';

	const CARD_SELECTOR =
		'article.blog-item';

	const LOAD_MORE_BATCH_SIZE =
		60;

	const COUNT_CACHE_PREFIX =
		'mtf-film-count-v2:';

	const pageCache =
		new Map();


	/* =====================================================
		 BASIC HELPERS
		 ===================================================== */

	function normalizeText(value) {

		return String(
			value || ''
		)
			.trim()
			.replace(
				/\s+/g,
				' '
			);

	}


	function normalizeURL(value) {

		try {

			const url =
				new URL(
					value,
					window.location.origin
				);

			url.hash =
				'';

			return url.href;

		}

		catch (error) {

			return String(
				value || ''
			);

		}

	}


	function normalizeTag(value) {

		return String(
			value || ''
		)
			.trim()
			.toLowerCase();

	}


	/* =====================================================
		 TAG DETECTION

		 Supports:

		 /films/tag/Kendall+Point

		 and Squarespace pagination URLs such as:

		 /films?offset=123456789&tag=Kendall+Point
		 ===================================================== */

	function getCurrentTag() {

		const pathMatch =
			window.location.pathname.match(
				/^\/films\/tag\/([^/]+)\/?$/i
			);

		if (pathMatch) {

			let tag =
				pathMatch[1];

			try {

				tag =
					decodeURIComponent(
						tag
					);

			}

			catch (error) {

				/* Keep original value. */

			}

			return tag
				.replace(
					/\+/g,
					' '
				)
				.trim();

		}


		const params =
			new URLSearchParams(
				window.location.search
			);

		const tag =
			params.get(
				'tag'
			);

		return tag
			? tag.trim()
			: '';

	}


	function getCanonicalTagURL(tag) {

		const encodedTag =
			encodeURIComponent(
				tag.trim()
			).replace(
				/%20/g,
				'+'
			);

		return (
			window.location.origin +
			'/films/tag/' +
			encodedTag
		);

	}


	/* =====================================================
		 PAGINATION LINKS
		 ===================================================== */

	function findPaginationAnchor(
		root,
		direction
	) {

		if (!root) {
			return null;
		}


		const expectedTexts =
			direction === 'older'
				? [
					'older posts',
					'older films'
				]
				: [
					'newer posts',
					'newer films'
				];


		const links =
			Array.from(
				root.querySelectorAll(
					'a[href]'
				)
			);


		const textMatch =
			links.find(function (link) {

				return expectedTexts.includes(
					normalizeText(
						link.textContent
					).toLowerCase()
				);

			});


		if (textMatch) {
			return textMatch;
		}


		return root.querySelector(
			direction === 'older'
				? 'a[rel="next"]'
				: 'a[rel="prev"]'
		);

	}


	function getPaginationHref(
		root,
		direction,
		baseURL
	) {

		const link =
			findPaginationAnchor(
				root,
				direction
			);

		if (!link) {
			return '';
		}


		const href =
			link.getAttribute(
				'href'
			);

		if (!href) {
			return '';
		}


		try {

			return new URL(
				href,
				baseURL
			).href;

		}

		catch (error) {

			return href;

		}

	}


	function findNativePagination() {

		const olderLink =
			findPaginationAnchor(
				document,
				'older'
			);

		const newerLink =
			findPaginationAnchor(
				document,
				'newer'
			);

		const link =
			olderLink ||
			newerLink;

		if (!link) {
			return null;
		}


		return (
			link.closest(
				'.blog-list-pagination'
			) ||
			link.parentElement
		);

	}


	/* =====================================================
		 FETCH + PARSE ARCHIVE PAGE
		 ===================================================== */

	function fetchArchivePage(url) {

		const normalizedURL =
			normalizeURL(
				url
			);

		const currentURL =
			normalizeURL(
				window.location.href
			);


		if (
			normalizedURL ===
			currentURL
		) {

			return Promise.resolve({
				document:
					document,

				url:
					normalizedURL
			});

		}


		if (
			pageCache.has(
				normalizedURL
			)
		) {

			return pageCache.get(
				normalizedURL
			);

		}


		const request =
			fetch(
				normalizedURL,
				{
					credentials:
						'same-origin'
				}
			)
				.then(function (response) {

					if (!response.ok) {

						throw new Error(
							'Archive request failed: ' +
							response.status
						);

					}

					return response.text();

				})
				.then(function (html) {

					const pageDocument =
						new DOMParser()
							.parseFromString(
								html,
								'text/html'
							);

					return {
						document:
							pageDocument,

						url:
							normalizedURL
					};

				});


		pageCache.set(
			normalizedURL,
			request
		);

		return request;

	}


	/* =====================================================
		 FILM IDENTIFIER

		 Used to avoid duplicates when loading additional
		 archive pages.
		 ===================================================== */

	function getFilmKey(card) {

		if (!card) {
			return '';
		}


		const titleLink =
			card.querySelector(
				'.blog-title a[href]'
			);

		if (titleLink) {

			return normalizeURL(
				titleLink.href
			);

		}


		const firstLink =
			card.querySelector(
				'a[href]'
			);

		if (firstLink) {

			return normalizeURL(
				firstLink.href
			);

		}


		return '';

	}


	function collectExistingFilmKeys(filmGrid) {

		const keys =
			new Set();


		filmGrid
			.querySelectorAll(
				CARD_SELECTOR
			)
			.forEach(function (card) {

				const key =
					getFilmKey(
						card
					);

				if (key) {

					keys.add(
						key
					);

				}

			});


		return keys;

	}


	/* =====================================================
		 FILM COUNT CACHE
		 ===================================================== */

	function getCachedFilmCount(tag) {

		try {

			const value =
				sessionStorage.getItem(
					COUNT_CACHE_PREFIX +
					normalizeTag(
						tag
					)
				);

			if (!value) {
				return null;
			}


			const number =
				parseInt(
					value,
					10
				);

			return Number.isFinite(
				number
			)
				? number
				: null;

		}

		catch (error) {

			return null;

		}

	}


	function cacheFilmCount(
		tag,
		count
	) {

		try {

			sessionStorage.setItem(
				COUNT_CACHE_PREFIX +
				normalizeTag(
					tag
				),
				String(
					count
				)
			);

		}

		catch (error) {

			/* Storage unavailable. */

		}

	}


	/* =====================================================
		 COUNT ALL FILMS

		 Walks Squarespace's native archive pagination.
		 ===================================================== */

	async function countAllFilms(tag) {

		const cached =
			getCachedFilmCount(
				tag
			);

		if (cached !== null) {
			return cached;
		}


		let pageURL =
			getCanonicalTagURL(
				tag
			);

		let total =
			0;

		let pageNumber =
			0;

		const visited =
			new Set();


		while (
			pageURL &&
			pageNumber < 100
		) {

			const normalizedURL =
				normalizeURL(
					pageURL
				);


			if (
				visited.has(
					normalizedURL
				)
			) {
				break;
			}


			visited.add(
				normalizedURL
			);


			const page =
				await fetchArchivePage(
					normalizedURL
				);

			const grid =
				page.document
					.querySelector(
						GRID_SELECTOR
					);

			if (!grid) {
				break;
			}


			total +=
				grid.querySelectorAll(
					CARD_SELECTOR
				).length;


			pageURL =
				getPaginationHref(
					page.document,
					'older',
					page.url
				);

			pageNumber += 1;

		}


		if (total > 0) {

			cacheFilmCount(
				tag,
				total
			);

		}


		return total;

	}


	/* =====================================================
		 PROCESS A NEWLY APPENDED FILM CARD
		 ===================================================== */

	function processFilmCard(
		card,
		attempt
	) {

		attempt =
			attempt || 0;


		if (
			window.MTF.filmCards &&
			typeof window.MTF.filmCards.process ===
				'function'
		) {

			window.MTF.filmCards.process(
				card
			);

			return;

		}


		if (attempt < 20) {

			setTimeout(
				function () {

					processFilmCard(
						card,
						attempt + 1
					);

				},
				100
			);

		}

	}


	/* =====================================================
		 IMPORT FILM CARD
		 ===================================================== */

	function appendFilmCard(
		sourceCard,
		filmGrid
	) {

		const card =
			document.importNode(
				sourceCard,
				true
			);


		/*
		 * Fetched Squarespace cards can retain animation
		 * state from the remote document.
		 */

		card.style.opacity =
			'1';

		card.style.visibility =
			'visible';

		card.style.transform =
			'none';

		card.removeAttribute(
			'data-animation-state'
		);


		/*
		 * Encourage browser-native lazy loading for
		 * newly imported images.
		 */

		card
			.querySelectorAll(
				'img'
			)
			.forEach(function (image) {

				image.loading =
					'lazy';

			});


		/*
		 * The film grid can contain Squarespace pagination
		 * markup. Insert new cards before that markup when
		 * possible.
		 */

		const nativePagination =
			filmGrid.querySelector(
				'.blog-list-pagination'
			);


		if (
			nativePagination &&
			nativePagination.parentNode ===
				filmGrid
		) {

			filmGrid.insertBefore(
				card,
				nativePagination
			);

		}

		else {

			filmGrid.appendChild(
				card
			);

		}


		processFilmCard(
			card
		);


		return card;

	}


	/* =====================================================
		 LOAD MORE CONTROLS
		 ===================================================== */

	function createLoadMoreControls(
		filmGrid,
		totalCount
	) {

		const existing =
			document.querySelector(
				'.mtf-film-load-more'
			);

		if (existing) {
			return existing;
		}


		const wrapper =
			document.createElement(
				'div'
			);

		wrapper.className =
			'mtf-film-load-more';


		const status =
			document.createElement(
				'p'
			);

		status.className =
			'mtf-film-load-more__status';

		status.setAttribute(
			'aria-live',
			'polite'
		);


		const button =
			document.createElement(
				'button'
			);

		button.type =
			'button';

		button.className =
			'mtf-button mtf-film-load-more__button';

		button.textContent =
			'Load More Films';


		wrapper.appendChild(
			status
		);

		wrapper.appendChild(
			button
		);


		const nativePagination =
			findNativePagination();


		if (
			nativePagination &&
			nativePagination.parentNode
		) {

			nativePagination.parentNode.insertBefore(
				wrapper,
				nativePagination
			);

		}

		else {

			filmGrid.insertAdjacentElement(
				'afterend',
				wrapper
			);

		}


		function updateStatus() {

			const visibleCount =
				filmGrid.querySelectorAll(
					CARD_SELECTOR
				).length;


			if (
				totalCount &&
				visibleCount < totalCount
			) {

				status.textContent =
					'Showing ' +
					visibleCount +
					' of ' +
					totalCount +
					' films';

			}

			else if (totalCount) {

				status.textContent =
					'Showing all ' +
					totalCount +
					' films';

			}

			else {

				status.textContent =
					visibleCount +
					(
						visibleCount === 1
							? ' film'
							: ' films'
					);

			}


			if (
				totalCount &&
				visibleCount >= totalCount
			) {

				button.hidden =
					true;

			}

		}


		wrapper.updateStatus =
			updateStatus;

		wrapper.button =
			button;

		wrapper.status =
			status;


		updateStatus();


		return wrapper;

	}


	/* =====================================================
		 LOAD UP TO 60 ADDITIONAL FILMS

		 Fetches as many native Squarespace archive pages as
		 necessary until:

		 - 60 new films have been appended, or
		 - there are no more archive pages.
		 ===================================================== */

	async function loadMoreFilms(
		filmGrid,
		startURL
	) {

		let pageURL =
			startURL;

		let addedCount =
			0;

		let finalNextURL =
			pageURL;

		const visited =
			new Set();

		const existingKeys =
			collectExistingFilmKeys(
				filmGrid
			);


		while (
			pageURL &&
			addedCount <
				LOAD_MORE_BATCH_SIZE
		) {

			const normalizedURL =
				normalizeURL(
					pageURL
				);


			if (
				visited.has(
					normalizedURL
				)
			) {
				break;
			}


			visited.add(
				normalizedURL
			);


			const page =
				await fetchArchivePage(
					normalizedURL
				);

			const nextGrid =
				page.document
					.querySelector(
						GRID_SELECTOR
					);

			if (!nextGrid) {
				break;
			}


			const cards =
				Array.from(
					nextGrid.querySelectorAll(
						CARD_SELECTOR
					)
				);


			for (
				let index = 0;
				index < cards.length;
				index += 1
			) {

				if (
					addedCount >=
						LOAD_MORE_BATCH_SIZE
				) {
					break;
				}


				const sourceCard =
					cards[index];

				const key =
					getFilmKey(
						sourceCard
					);


				if (
					key &&
					existingKeys.has(
						key
					)
				) {
					continue;
				}


				appendFilmCard(
					sourceCard,
					filmGrid
				);


				if (key) {

					existingKeys.add(
						key
					);

				}


				addedCount += 1;

			}


			const followingURL =
				getPaginationHref(
					page.document,
					'older',
					page.url
				);


			finalNextURL =
				followingURL;


			/*
			 * If this native page contained more cards than
			 * we had room to add, stopping here would skip
			 * some films on the next click.
			 *
			 * In normal Squarespace pagination this should
			 * not happen because native page sizes are much
			 * smaller than 60. Warn instead of silently
			 * producing broken pagination.
			 */

			if (
				addedCount >=
					LOAD_MORE_BATCH_SIZE &&
				cards.length >
					LOAD_MORE_BATCH_SIZE
			) {

				console.warn(
					'Mark Thomas Films: a native archive page contains more than ' +
					LOAD_MORE_BATCH_SIZE +
					' films. Load More pagination may need adjustment.'
				);

			}


			pageURL =
				followingURL;

		}


		return {
			addedCount:
				addedCount,

			nextURL:
				finalNextURL
		};

	}


	/* =====================================================
		 INITIALIZE
		 ===================================================== */

	async function initFilmArchivePagination() {

		const tag =
			getCurrentTag();

		if (!tag) {
			return;
		}


		const filmGrid =
			document.querySelector(
				GRID_SELECTOR
			);

		if (!filmGrid) {
			return;
		}


		const nativePagination =
			findNativePagination();

		const olderLink =
			findPaginationAnchor(
				document,
				'older'
			);


		/*
		 * No Older Films link means Squarespace already has
		 * every film on the current archive page.
		 */

		let nextURL =
			olderLink
				? getPaginationHref(
					document,
					'older',
					window.location.href
				)
				: '';


		let totalCount =
			null;


		try {

			totalCount =
				await countAllFilms(
					tag
				);

		}

		catch (error) {

			console.warn(
				'Mark Thomas Films: unable to count archive films.',
				error
			);

		}


		const controls =
			createLoadMoreControls(
				filmGrid,
				totalCount
			);


		/*
		 * Hide Squarespace's native pagination only after
		 * the custom controls have successfully initialized.
		 *
		 * If this script fails before this point, native
		 * pagination remains available as a fallback.
		 */

		if (nativePagination) {

			nativePagination.hidden =
				true;

			nativePagination.setAttribute(
				'aria-hidden',
				'true'
			);

		}


		if (!nextURL) {

			controls.button.hidden =
				true;

			controls.updateStatus();

			return;

		}


		controls.button.addEventListener(
			'click',
			async function () {

				if (
					controls.button.disabled ||
					!nextURL
				) {
					return;
				}


				const originalText =
					controls.button.textContent;


				controls.button.disabled =
					true;

				controls.button.textContent =
					'Loading Films…';

				controls.wrapper =
					controls;


				try {

					const result =
						await loadMoreFilms(
							filmGrid,
							nextURL
						);


					nextURL =
						result.nextURL;


					controls.updateStatus();


					if (
						!nextURL ||
						result.addedCount === 0
					) {

						controls.button.hidden =
							true;

					}

				}

				catch (error) {

					console.warn(
						'Mark Thomas Films: unable to load additional films.',
						error
					);


					/*
					 * Restore native pagination if background
					 * loading fails.
					 */

					if (nativePagination) {

						nativePagination.hidden =
							false;

						nativePagination.removeAttribute(
							'aria-hidden'
						);

					}

				}

				finally {

					controls.button.disabled =
						false;

					controls.button.textContent =
						originalText;

				}

			}
		);

	}


	window.MTF.filmArchivePagination = {
		init:
			initFilmArchivePagination
	};


	if (
		document.readyState ===
			'loading'
	) {

		document.addEventListener(
			'DOMContentLoaded',
			initFilmArchivePagination,
			{
				once:
					true
			}
		);

	}

	else {

		initFilmArchivePagination();

	}

})();