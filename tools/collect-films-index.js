
/* =========================================================
	 MARK THOMAS FILMS
	 RELATED FILMS — INDEX COLLECTOR

	 Run this script in your browser on:
	 https://www.markthomasfilms.com/films

	 It will:
	 - Follow Squarespace's native archive pagination.
	 - Collect every published film it encounters.
	 - Read individual film pages for complete metadata.
	 - Remove duplicate films.
	 - Download a populated films-related-index.js file.

	 This is a development utility, NOT a public site module.
	 ========================================================= */

(async function () {

		'use strict';


		const ARCHIVE_URL =
				window.location.origin + '/films';

		const GRID_SELECTOR =
				'.blog-basic-grid.collection-content-wrapper';

		const CARD_SELECTOR =
				'article.blog-item';

		const MAX_PAGES =
				200;

		const CONCURRENT_REQUESTS =
				3;


		/* =====================================================
			 HELPERS
			 ===================================================== */

		function clean(value) {

				return String(value || '')
						.replace(/\s+/g, ' ')
						.trim();

		}


		function absoluteURL(value, base) {

				if (!value) {
						return '';
				}

				try {

						const url = new URL(
								value,
								base || window.location.origin
						);

						if (url.origin !== window.location.origin) {
								return '';
						}

						url.hash = '';

						return url.href;

				}

				catch (error) {
						return '';
				}

		}


		function filmPath(value, base) {

				const url = absoluteURL(value, base);

				if (!url) {
						return '';
				}

				const parsed = new URL(url);

				if (
						!/^\/films\/[^/]+/i.test(parsed.pathname) ||
						/^\/films\/(tag|category)\//i.test(parsed.pathname)
				) {
						return '';
				}

				return parsed.pathname.replace(/\/$/, '');

		}


		function dateValue(value) {

				if (!value) {
						return null;
				}

				const date = new Date(value);

				return Number.isNaN(date.getTime())
						? null
						: date.toISOString().slice(0, 10);

		}


		async function fetchPage(url) {

				const response = await fetch(url, {
						credentials: 'same-origin'
				});

				if (!response.ok) {

						throw new Error(
								'Unable to fetch ' + url +
								' (HTTP ' + response.status + ')'
						);

				}

				const html = await response.text();

				return new DOMParser().parseFromString(
						html,
						'text/html'
				);

		}


		/* =====================================================
			 EXTRACT FILM METADATA
			 ===================================================== */

		function extractTags(root) {

				const selectors = [
						'a.blog-item-tag[href]',
						'.blog-item-tag a[href]',
						'.blog-meta-section a[href*="/tag/"]',
						'.blog-item-meta-wrapper a[href*="/tag/"]',
						'.blog-item-wrapper a[href*="/tag/"]',
						'article.blog-item a[href*="/tag/"]'
				];

				const tags = [];
				const seen = new Set();

				root.querySelectorAll(
						selectors.join(',')
				).forEach(function (link) {

						const href = link.getAttribute('href') || '';
						const url = absoluteURL(href);

						if (!url) {
								return;
						}

						const match = new URL(url).pathname.match(
								/^\/(?:films|blog)\/tag\/([^/]+)\/?$/i
						);

						if (!match) {
								return;
						}

						let name = clean(link.textContent);

						if (!name) {

								try {

										name = decodeURIComponent(
												match[1].replace(/\+/g, ' ')
										);

								}

								catch (error) {
										name = match[1];
								}

						}

						const key = name.toLowerCase();

						if (name && !seen.has(key)) {

								seen.add(key);
								tags.push(name);

						}

				});

				return tags;

		}


		function extractDate(root) {

				const selectors = [
						'meta[property="article:published_time"]',
						'meta[itemprop="datePublished"]',
						'.blog-meta-item--date time[datetime]',
						'article.blog-item time[datetime]',
						'time[datetime]'
				];

				for (const selector of selectors) {

						const element = root.querySelector(selector);

						if (!element) {
								continue;
						}

						const value =
								element.getAttribute('content') ||
								element.getAttribute('datetime');

						const date = dateValue(value);

						if (date) {
								return date;
						}

				}

				const visibleDate = root.querySelector(
						'.blog-meta-item--date'
				);

				return visibleDate
						? dateValue(clean(visibleDate.textContent))
						: null;

		}


		function extractThumbnail(root, base) {

				const image = root.querySelector(
						'.blog-item .image-wrapper img, ' +
						'.blog-item img, ' +
						'.blog-item-wrapper .image-wrapper img'
				);

				if (image) {

						const candidates = [
								image.getAttribute('data-src'),
								image.getAttribute('data-image'),
								image.getAttribute('src')
						];

						for (const candidate of candidates) {

								const url = absoluteURL(candidate, base);

								if (url) {
										return url;
								}

						}

				}

				/* Individual film pages may have an OG thumbnail. */

				const ogImage = root.querySelector(
						'meta[property="og:image"]'
				);

				return ogImage
						? absoluteURL(
								ogImage.getAttribute('content'),
								base
						) || null
						: null;

		}


		function extractTitle(root) {

				const element = root.querySelector(
						'.blog-title a, ' +
						'h1.blog-item-title, ' +
						'.blog-item-title h1, ' +
						'.blog-item-title'
				);

				return element
						? clean(element.textContent)
						: '';

		}


		/* =====================================================
			 FIND THE NEXT NATIVE ARCHIVE PAGE
			 ===================================================== */

		function nextArchiveURL(root, currentURL) {

				let link = root.querySelector(
						'.blog-list-pagination .older a[href]'
				);

				if (!link) {

						link = Array.from(
								root.querySelectorAll(
										'.blog-list-pagination a[href]'
								)
						).find(function (anchor) {

								return /older\s+(films|posts)/i.test(
										clean(anchor.textContent)
								);

						});

				}

				return link
						? absoluteURL(
								link.getAttribute('href'),
								currentURL
						)
						: '';

		}


		/* =====================================================
			 COLLECT PUBLISHED ARCHIVE CARDS
			 ===================================================== */

		async function collectArchive() {

				const films = new Map();
				const visitedPages = new Set();

				let pageURL = ARCHIVE_URL;

				while (
						pageURL &&
						visitedPages.size < MAX_PAGES
				) {

						if (visitedPages.has(pageURL)) {
								break;
						}

						visitedPages.add(pageURL);

						console.log(
								'Reading archive page ' +
								visitedPages.size + ':',
								pageURL
						);

						const page = await fetchPage(pageURL);

						const grid = page.querySelector(
								GRID_SELECTOR
						);

						if (!grid) {

								throw new Error(
										'The Squarespace film grid was not found on ' +
										pageURL
								);

						}

						const cards = grid.querySelectorAll(
								CARD_SELECTOR
						);

						cards.forEach(function (card) {

								const link = card.querySelector(
										'.blog-title a[href]'
								);

								if (!link) {
										return;
								}

								const url = filmPath(
										link.getAttribute('href'),
										pageURL
								);

								if (!url || films.has(url)) {
										return;
								}

								films.set(url, {

										url: url,

										title: clean(link.textContent),

										published: extractDate(card),

										thumbnail: extractThumbnail(
												card,
												pageURL
										),

										tags: extractTags(card)

								});

						});

						const following = nextArchiveURL(
								page,
								pageURL
						);

						pageURL =
								following &&
								!visitedPages.has(following)
										? following
										: '';

				}

				if (pageURL && visitedPages.size >= MAX_PAGES) {

						throw new Error(
								'Stopped after ' + MAX_PAGES +
								' archive pages. The index may be incomplete.'
						);

				}

				if (!films.size) {

						throw new Error(
								'No films were found. Check the archive selectors.'
						);

				}

				console.log(
						'Archive collection complete:',
						films.size,
						'unique films.'
				);

				return Array.from(films.values());

		}


		/* =====================================================
			 READ INDIVIDUAL FILM PAGES

			 Film pages can contain tags and image metadata
			 that are missing from Squarespace archive cards.
			 ===================================================== */

		async function enrichFilm(film, errors) {

				const url =
						window.location.origin + film.url;

				try {

						const page = await fetchPage(url);

						const title = extractTitle(page);
						const tags = extractTags(page);
						const date = extractDate(page);
						const thumbnail = extractThumbnail(
								page,
								url
						);

						if (!film.title && title) {
								film.title = title;
						}

						if (tags.length >= film.tags.length) {
								film.tags = tags;
						}

						if (!film.published && date) {
								film.published = date;
						}

						if (!film.thumbnail && thumbnail) {
								film.thumbnail = thumbnail;
						}

				}

				catch (error) {

						errors.push({
								url: film.url,
								error: error.message
						});

				}

		}


		async function enrichAllFilms(films, errors) {

				for (
						let index = 0;
						index < films.length;
						index += CONCURRENT_REQUESTS
				) {

						const batch = films.slice(
								index,
								index + CONCURRENT_REQUESTS
						);

						await Promise.all(
								batch.map(function (film) {

										return enrichFilm(
												film,
												errors
										);

								})
						);

						console.log(
								'Checked ' +
								Math.min(
										index + CONCURRENT_REQUESTS,
										films.length
								) +
								' of ' +
								films.length +
								' film pages.'
						);

				}

		}


		/* =====================================================
			 GENERATE THE JAVASCRIPT INDEX FILE
			 ===================================================== */

		function downloadIndex(films) {

				const index = {

						schemaVersion: 1,

						generatedAt:
								new Date().toISOString(),

						films: films

				};

				const contents = [
						'/* MARK THOMAS FILMS — GENERATED FILM INDEX */',
						'',
						'(function () {',
						'',
						"    'use strict';",
						'',
						'    window.MTF = window.MTF || {};',
						'',
						'    window.MTF.filmIndex = ' +
								JSON.stringify(index, null, 4) + ';',
						'',
						'})();',
						''
				].join('\n');

				const blob = new Blob(
						[contents],
						{ type: 'text/javascript' }
				);

				const objectURL = URL.createObjectURL(blob);

				const link = document.createElement('a');

				link.href = objectURL;
				link.download = 'films-related-index.js';

				document.body.appendChild(link);

				link.click();
				link.remove();

				setTimeout(function () {
						URL.revokeObjectURL(objectURL);
				}, 30000);

				/* Keep the result available for inspection. */

				window.MTFIndexDraft = index;

		}


		/* =====================================================
			 RUN COLLECTOR
			 ===================================================== */

		if (
				!/^(www\.)?markthomasfilms\.com$/i.test(
						window.location.hostname
				)
		) {

				console.error(
						'Run this collector on www.markthomasfilms.com.'
				);

				return;

		}

		try {

				const errors = [];

				console.log(
						'Mark Thomas Films: collecting published films...'
				);

				const films = await collectArchive();

				await enrichAllFilms(
						films,
						errors
				);

				const missing = {

						titles: films.filter(
								film => !film.title
						),

						tags: films.filter(
								film => !film.tags.length
						),

						dates: films.filter(
								film => !film.published
						),

						thumbnails: films.filter(
								film => !film.thumbnail
						)

				};

				console.log(
						'Index review:',
						{
								totalFilms: films.length,
								missingTitles: missing.titles.length,
								missingTags: missing.tags.length,
								missingDates: missing.dates.length,
								missingThumbnails: missing.thumbnails.length,
								pageErrors: errors.length
						}
				);

				if (
						errors.length ||
						missing.titles.length ||
						missing.tags.length ||
						missing.dates.length ||
						missing.thumbnails.length
				) {

						console.warn(
								'Review these records before publishing:',
								{
										errors: errors,
										missing: missing
								}
						);

				}

				downloadIndex(films);

				console.log(
						'Downloaded films-related-index.js. ' +
						'Review the console warnings before deploying.'
				);

		}

		catch (error) {

				console.error(
						'Film index collection failed:',
						error
				);

		}

})();