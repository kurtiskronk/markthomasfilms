(function () {
	'use strict';

	window.MTF = window.MTF || {};

	const MAX_FILMS_PER_MTF_PAGE =
		36;

	const EXPECTED_NATIVE_PAGE_SIZE =
		18;

	const GRID_SELECTOR =
		'.blog-basic-grid.collection-content-wrapper';

	const CARD_SELECTOR =
		'article.blog-item';

	const COUNT_CACHE_PREFIX =
		'mtf-film-count-v1:';

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


	/* =====================================================
		 TAG DETECTION

		 Supports both:

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

		 We intentionally identify these primarily by their
		 visible Squarespace labels instead of depending on
		 fragile Squarespace-generated class names.
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


		/*
		 * Fallback in case Squarespace changes
		 * the visible pagination wording.
		 */

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


	/* =====================================================
		 FETCH + PARSE ARCHIVE PAGE

		 Results are cached for this page load so that the
		 film count and scrolling behavior can share the
		 same requests.
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


		/*
		 * If we're asking for the page already displayed,
		 * use the live document instead of fetching it.
		 */

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
		 FILM COUNT
		 ===================================================== */

	function getCachedFilmCount(tag) {

		try {

			const value =
				sessionStorage.getItem(
					COUNT_CACHE_PREFIX +
					tag.toLowerCase()
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
					tag.toLowerCase(),
				String(
					count
				)
			);

		}

		catch (error) {

			/* Storage unavailable. */

		}
	}


	async function countAllFilms(
		tag
	) {

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


		/*
		 * Safety ceiling prevents an accidental loop
		 * if Squarespace ever returns malformed pagination.
		 */

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

			pageNumber +=
				1;

		}


		if (total > 0) {

			cacheFilmCount(
				tag,
				total
			);

		}


		return total;
	}


	function displayFilmCount(
		count
	) {

		if (!count) {
			return;
		}


		let countElement =
			document.querySelector(
				'.mtf-film-count'
			);


		if (!countElement) {

			countElement =
				document.createElement(
					'p'
				);

			countElement.className =
				'mtf-film-count';


			const archiveTitle =
				document.querySelector(
					'.mtf-archive-context-title'
				);

			if (archiveTitle) {

				archiveTitle.insertAdjacentElement(
					'afterend',
					countElement
				);

			}

			else {

				const filmGrid =
					document.querySelector(
						GRID_SELECTOR
					);

				if (!filmGrid) {
					return;
				}

				filmGrid.parentNode.insertBefore(
					countElement,
					filmGrid
				);

			}

		}


		countElement.textContent =
			count +
			(
				count === 1
					? ' film'
					: ' films'
			);

	}


	/* =====================================================
		 COUNT STYLING
		 ===================================================== */

	function addCountStyles() {

		if (
			document.getElementById(
				'mtf-film-count-styles'
			)
		) {
			return;
		}


		const style =
			document.createElement(
				'style'
			);

		style.id =
			'mtf-film-count-styles';

		style.textContent = `
			.mtf-film-count {
				margin: 6px 0 0;
				font-size: 0.95em;
				line-height: 1.4;
				opacity: 0.65;
			}
		`;

		document.head.appendChild(
			style
		);

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


		/*
		 * Defensive fallback if this module happens to
		 * initialize before film-cards.js.
		 */

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
		 LOGICAL "NEWER POSTS"

		 Each MTF page represents two native Squarespace
		 pages. Therefore, when we are on a later MTF page,
		 "Newer Posts" needs to jump back two Squarespace
		 pages instead of one.
		 ===================================================== */

	async function updateNewerPagination() {

		const newerLink =
			findPaginationAnchor(
				document,
				'newer'
			);

		if (!newerLink) {
			return;
		}


		const firstNewerURL =
			getPaginationHref(
				document,
				'newer',
				window.location.href
			);

		if (!firstNewerURL) {
			return;
		}


		try {

			const firstNewerPage =
				await fetchArchivePage(
					firstNewerURL
				);

			const secondNewerURL =
				getPaginationHref(
					firstNewerPage.document,
					'newer',
					firstNewerPage.url
				);


			/*
			 * Normal MTF pagination uses the second link.
			 *
			 * If none exists, retain the first link as a
			 * safe fallback for a visitor who arrived on
			 * an old/native Squarespace pagination URL.
			 */

			newerLink.href =
				secondNewerURL ||
				firstNewerURL;

		}

		catch (error) {

			console.warn(
				'Mark Thomas Films: unable to update newer film pagination.',
				error
			);

		}
	}


	/* =====================================================
		 APPEND ONE NATIVE PAGE

		 18 existing films + 18 appended films = 36.

		 After appending, the visible "Older Posts" link
		 is changed to point beyond the appended films.
		 ===================================================== */

	async function appendSecondPage(
		filmGrid
	) {

		const olderLink =
			findPaginationAnchor(
				document,
				'older'
			);

		if (!olderLink) {
			return;
		}


		const olderURL =
			getPaginationHref(
				document,
				'older',
				window.location.href
			);

		if (!olderURL) {
			return;
		}


		try {

			const page =
				await fetchArchivePage(
					olderURL
				);

			const nextGrid =
				page.document
					.querySelector(
						GRID_SELECTOR
					);

			if (!nextGrid) {
				return;
			}


			const currentCards =
				filmGrid.querySelectorAll(
					CARD_SELECTOR
				);

			const nextCards =
				Array.from(
					nextGrid.querySelectorAll(
						CARD_SELECTOR
					)
				);

			const remainingSlots =
				MAX_FILMS_PER_MTF_PAGE -
				currentCards.length;


			if (
				remainingSlots <= 0 ||
				!nextCards.length
			) {
				return;
			}


			/*
			 * Important fail-safe:
			 *
			 * If Mark later changes Squarespace from
			 * 18 posts/page to 20, we do NOT append only
			 * part of a native page because doing so would
			 * make the following pagination skip films.
			 */

			if (
				nextCards.length >
				remainingSlots
			) {

				console.warn(
					'Mark Thomas Films: native archive page size has changed. ' +
					'Automatic 36-film pagination was not applied.'
				);

				return;

			}


			const firstCurrentCard =
				filmGrid.querySelector(
					CARD_SELECTOR
				);

			if (!firstCurrentCard) {
				return;
			}


			const cardContainer =
				firstCurrentCard.parentNode;
			
			
			/*
			 * Squarespace places its Older/Newer Posts navigation
			 * inside the same overall archive container.
			 *
			 * Find the highest ancestor of the Older Posts link
			 * that is a direct child of the film-card container.
			 * New cards will be inserted immediately before it.
			 */
			
			let paginationReference =
				olderLink;
			
			while (
				paginationReference &&
				paginationReference.parentNode &&
				paginationReference.parentNode !==
					cardContainer
			) {
			
				paginationReference =
					paginationReference.parentNode;
			
			}
			
			
			/*
			 * If the pagination could not be resolved as a direct
			 * child of the card container, safely fall back to the
			 * end of the container.
			 */
			
			if (
				!paginationReference ||
				paginationReference.parentNode !==
					cardContainer
			) {
			
				paginationReference =
					null;
			
			}
			
			
			nextCards.forEach(
				function (sourceCard) {
			
					const card =
						document.importNode(
							sourceCard,
							true
						);
			
					/*
					 * Dynamically imported Squarespace cards retain
					 * the pre-animation state from the fetched page.
					 * Force them into their visible state.
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
			
			
					if (paginationReference) {
			
						cardContainer.insertBefore(
							card,
							paginationReference
						);
			
					}
			
					else {
			
						cardContainer.appendChild(
							card
						);
			
					}
			
			
					processFilmCard(
						card
					);
			
				}
			);


			/*
			 * The current Older Posts link originally
			 * pointed to the page we just appended.
			 *
			 * Replace it with that page's Older Posts
			 * link so the visitor advances to the next
			 * unseen group of films.
			 */

			const followingURL =
				getPaginationHref(
					page.document,
					'older',
					page.url
				);


			if (followingURL) {

				olderLink.href =
					followingURL;

			}

			else {

				/*
				 * No films remain after the appended page.
				 */

				olderLink.style.display =
					'none';

			}


			console.log(
				'Mark Thomas Films: appended archive films. ' +
				filmGrid.querySelectorAll(
					CARD_SELECTOR
				).length +
				' films now displayed.'
			);

		}

		catch (error) {

			/*
			 * If anything goes wrong, Squarespace's native
			 * pagination remains usable.
			 */

			console.warn(
				'Mark Thomas Films: unable to append additional films.',
				error
			);

		}
	}


	/* =====================================================
		 SCROLL TRIGGER

		 Loads the second group before the visitor actually
		 reaches the native pagination.
		 ===================================================== */

	function setupScrollLoading(
		filmGrid
	) {

		const currentFilmCount =
			filmGrid.querySelectorAll(
				CARD_SELECTOR
			).length;


		if (
			currentFilmCount >
				EXPECTED_NATIVE_PAGE_SIZE ||
			currentFilmCount >=
				MAX_FILMS_PER_MTF_PAGE
		) {

			return;
		}


		const olderLink =
			findPaginationAnchor(
				document,
				'older'
			);

		if (!olderLink) {
			return;
		}


		const sentinel =
			document.createElement(
				'div'
			);

		sentinel.className =
			'mtf-film-scroll-sentinel';

		sentinel.setAttribute(
			'aria-hidden',
			'true'
		);

		filmGrid.insertAdjacentElement(
			'afterend',
			sentinel
		);


		let loading =
			false;


		const observer =
			new IntersectionObserver(
				function (entries) {

					const visible =
						entries.some(
							function (entry) {

								return entry.isIntersecting;

							}
						);

					if (
						!visible ||
						loading
					) {
						return;
					}


					loading =
						true;

					observer.disconnect();


					appendSecondPage(
						filmGrid
					)
						.finally(function () {

							sentinel.remove();

						});

				},
				{
					rootMargin:
						'700px 0px'
				}
			);


		observer.observe(
			sentinel
		);

	}


	/* =====================================================
		 INITIALIZE
		 ===================================================== */

	function initFilmArchivePagination() {

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


		addCountStyles();


		/*
		 * films.js creates the archive heading during its
		 * own initialization. A zero-delay tick gives that
		 * module an opportunity to finish first.
		 */

		setTimeout(
			function () {

				countAllFilms(
					tag
				)
					.then(function (count) {

						displayFilmCount(
							count
						);

					})
					.catch(function (error) {

						console.warn(
							'Mark Thomas Films: unable to count archive films.',
							error
						);

					});


				updateNewerPagination();

				setupScrollLoading(
					filmGrid
				);

			},
			0
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