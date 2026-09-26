
/* =========================================================
	 MARK THOMAS FILMS — JOURNAL ARCHIVE

	 Features:
	 - Static hero on the main journal archive
	 - Two-column editorial article layout
	 - Category above each article title
	 - Tag below each article title
	 - Automatic series numbering for shared tags
	 - Native Squarespace excerpts
	 - Custom Read More links
	 - Clickable article rows

	 Series are discovered automatically.
	 No hardcoded tag names or series configuration.
	 ========================================================= */

(() => {
		'use strict';

		const ARCHIVE =
				'.blog-single-column.collection-content-wrapper';

		const CARD =
				'article.blog-single-column--container';


		/* =====================================================
			 PAGE DETECTION
			 ===================================================== */

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

				const params =
						new URLSearchParams(location.search);

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
								// Retain the original name.
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


		/* =====================================================
			 URL UTILITIES
			 ===================================================== */

		function articlePath(value) {
				try {
						const url = new URL(
								value,
								location.origin
						);

						const path =
								url.pathname.replace(/\/+$/, '');

						if (
								url.origin !== location.origin ||
								!/^\/blog\/[^/]+$/i.test(path) ||
								/^\/blog\/(?:tag|category|page)$/i.test(path)
						) {
								return '';
						}

						return path;

				} catch (_) {
						return '';
				}
		}


		function termURL(type, name) {
				return (
						'/blog/' +
						type +
						'/' +
						encodeURIComponent(name).replace(
								/%20/g,
								'+'
						)
				);
		}


		/* =====================================================
			 TAGS AND CATEGORIES
			 ===================================================== */

		function nativeTerms(card, type) {
				const prefix =
						'/blog/' + type + '/';

				const result = [];

				card.querySelectorAll(
						'a[href]'
				).forEach(link => {

						// Do not extract metadata from the
						// complete article body.

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
										item =>
												item.name.toLowerCase() ===
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

						const text =
								String(name).trim();

						const key =
								text.toLowerCase();

						if (
								!text ||
								seen.has(key)
						) {
								return null;
						}

						seen.add(key);

						return {
								name: text,
								href: termURL(type, text)
						};

				}).filter(Boolean);
		}


		/* =====================================================
			 TAXONOMY DISPLAY

			 CATEGORY: ABOVE THE TITLE

			 TAG: BELOW THE TITLE

			 PART NUMBER: AFTER THE TAG, WHEN TWO OR
			 MORE PUBLISHED ARTICLES SHARE THAT TAG
			 ===================================================== */

		function taxonomyGroup(terms, type) {
				const group =
						document.createElement('span');

				group.className =
						'mtf-journal-taxonomy__' + type;

				terms.forEach((term, index) => {

						if (index) {
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
				tags,
				part = null
		) {
				const title =
						card.querySelector('.blog-title');
		
				if (!title) return;
		
				// Remove previously generated metadata.
				card.querySelector(
						'.mtf-journal-eyebrow'
				)?.remove();
		
				card.querySelector(
						'.mtf-journal-taxonomy'
				)?.remove();
		
		
				/* CATEGORY ABOVE THE TITLE */
		
				if (categories.length) {
						const eyebrow =
								document.createElement('div');
		
						eyebrow.className =
								'mtf-journal-eyebrow';
		
						const link =
								document.createElement('a');
		
						link.href = categories[0].href;
						link.textContent = categories[0].name;
		
						eyebrow.appendChild(link);
						title.before(eyebrow);
				}
		
		
				/* TAG BELOW THE TITLE */
		
				if (tags.length) {
						const nav =
								document.createElement('nav');
		
						nav.className =
								'mtf-journal-taxonomy';
		
						nav.setAttribute(
								'aria-label',
								part !== null
										? 'Article series and part'
										: 'Article tags'
						);
		
						nav.appendChild(
								taxonomyGroup(
										[tags[0]],
										'tags'
								)
						);
		
		
						/* AUTOMATIC PART NUMBER */
		
						if (part !== null) {
								const separator =
										document.createElement('span');
		
								separator.textContent = '·';
		
								separator.setAttribute(
										'aria-hidden',
										'true'
								);
		
								const number =
										document.createElement('span');
		
								number.className =
										'mtf-journal-series-part';
		
								number.textContent =
										'Part ' + part;
		
								nav.appendChild(separator);
								nav.appendChild(number);
						}
		
		
						/* INSERT THE COMPLETED NAVIGATION */
		
						title.after(nav);
				}
		}



		/* =====================================================
			 STATIC JOURNAL HERO
			 ===================================================== */

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


		/* =====================================================
			 ARTICLE ENHANCEMENT
			 ===================================================== */

		function enhanceCard(card) {
				if (
						card.dataset.mtfJournalReady
				) {
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

				// Prevent Squarespace's entrance animation
				// from leaving an article invisible.

				card.classList.add('is-loaded');


				/* INITIAL NATIVE METADATA */

				const categories =
						nativeTerms(card, 'category');

				const tags =
						nativeTerms(card, 'tag');

				applyTaxonomy(
						card,
						categories,
						tags
				);


				/* CUSTOM READ MORE */

				const excerpt =
						card.querySelector(
								'.blog-excerpt'
						);

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

						link.textContent =
								'Read More';

						link.setAttribute(
								'aria-label',
								'Read more: ' +
										title.textContent.trim()
						);

						excerpt.appendChild(link);
				}


				/* CLICKABLE ARTICLE ROW */

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


		/* =====================================================
			 SQUARESPACE ARTICLE METADATA
			 ===================================================== */

		async function loadMetadata() {
				try {
						const url =
								new URL(location.href);

						url.searchParams.set(
								'format',
								'json'
						);

						const response = await fetch(
								url,
								{
										credentials: 'same-origin',

										headers: {
												Accept: 'application/json'
										}
								}
						);

						if (!response.ok) {
								return new Map();
						}

						const data =
								await response.json();

						const items =
								data.items ||
								data.collection?.items ||
								[];

						const map =
								new Map();

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

				} catch (error) {
						console.warn(
								'Journal: article metadata unavailable',
								error
						);

						return new Map();
				}
		}


		/* =====================================================
			 AUTOMATIC SERIES DETECTION

			 Retrieve the published articles for a tag
			 using Squarespace's filtered RSS feed.

			 A tag shared by two or more articles is
			 treated as a series.

			 Posts are sorted oldest to newest.

			 If the feed is unavailable or potentially
			 incomplete, omit the part number rather
			 than displaying an incorrect one.
			 ===================================================== */

		async function seriesPosts(tagName) {
				try {
						const url = new URL(
								'/blog/',
								location.origin
						);

						url.searchParams.set(
								'tag',
								tagName
						);

						url.searchParams.set(
								'format',
								'rss'
						);

						const response = await fetch(
								url,
								{
										credentials: 'same-origin'
								}
						);

						if (!response.ok) {
								return [];
						}

						const xml =
								new DOMParser().parseFromString(
										await response.text(),
										'application/xml'
								);

						if (
								xml.querySelector(
										'parsererror'
								)
						) {
								return [];
						}

						const items = [
								...xml.querySelectorAll('item')
						];

						const posts = items.map(
								(item, index) => {

										const link =
												item.querySelector('link')
														?.textContent.trim();

										const published =
												item.querySelector('pubDate')
														?.textContent.trim();

										if (!link) {
												return null;
										}

										const path =
												articlePath(link);

										if (!path) {
												return null;
										}

										const parsedDate =
												Date.parse(
														published || ''
												);

										return {
												path,

												date:
														Number.isFinite(
																parsedDate
														)
																? parsedDate
																: null,

												index
										};
								}
						).filter(Boolean);


						/* OLDEST PUBLICATION FIRST */

						posts.sort((a, b) => {

								if (
										a.date !== null &&
										b.date !== null
								) {
										return (
												a.date - b.date ||
												b.index - a.index
										);
								}

								// RSS normally returns newest first.

								return (
										b.index - a.index
								);
						});


						/* REMOVE DUPLICATE URLS */

						return [
								...new Map(
										posts.map(post => [
												post.path,
												post
										])
								).values()
						];

				} catch (error) {
						console.warn(
								'Journal: series feed unavailable',
								tagName,
								error
						);

						return [];
				}
		}


		/* =====================================================
			 APPLY AUTOMATIC PART NUMBERS

			 No hardcoded series names.

			 Check each article's tags in order.
			 The first tag shared with another published
			 article becomes the displayed series.

			 A unique tag remains an ordinary tag.
			 ===================================================== */

		async function updateSeriesParts(records) {
				const feedCache =
						new Map();

				function postsForTag(tag) {
						const key =
								tag.name.trim().toLowerCase();

						if (!feedCache.has(key)) {
								feedCache.set(
										key,
										seriesPosts(tag.name)
								);
						}

						return feedCache.get(key);
				}


				await Promise.all(
						records.map(async record => {

								for (
										const tag of record.tags
								) {
										const posts =
												await postsForTag(tag);


										/* NOT A SERIES */

										if (
												posts.length < 2
										) {
												continue;
										}


										/*
										 * A feed with 20 entries may
										 * omit older posts.
										 *
										 * Do not assign potentially
										 * incorrect part numbers.
										 */

										if (
												posts.length >= 20
										) {
												continue;
										}


										/* FIND THE CURRENT ARTICLE */

										const index =
												posts.findIndex(
														post =>
																post.path ===
																record.path
												);

										if (
												index === -1
										) {
												continue;
										}


										/* DISPLAY THE SERIES */

										applyTaxonomy(
												record.card,
												record.categories,
												[tag],
												index + 1
										);

										return;
								}

								/*
								 * No shared tag found.
								 *
								 * Keep the normal category
								 * and first tag display.
								 */
						})
				);
		}


		/* =====================================================
			 INITIALIZATION
			 ===================================================== */

		async function init() {
				const info =
						pageInfo();

				if (!info) {
						return;
				}

				document.documentElement.classList.add(
						'mtf-blog-archive-page'
				);

				const archive =
						document.querySelector(
								ARCHIVE
						);

				if (!archive) {
						return;
				}


				/* HERO */

				if (
						info.showHero
				) {
						insertHero(archive);
				}


				/* ENHANCE NATIVE ARTICLES */

				const records = [
						...archive.querySelectorAll(
								CARD
						)
				]
						.map(enhanceCard)
						.filter(Boolean);


				/* FALLBACK FOR TAG/CATEGORY PAGES */

				records.forEach(record => {

						if (
								!info.name
						) {
								return;
						}

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


				/* RETRIEVE ACTUAL SQUARESPACE METADATA */

				const metadata =
						await loadMetadata();

				records.forEach(record => {

						const item =
								metadata.get(
										record.path
								);

						if (!item) {
								return;
						}

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


						/* UPDATE THE RECORD */

						record.categories =
								categories.length
										? categories
										: record.categories;

						record.tags =
								tags.length
										? tags
										: record.tags;


						/* DISPLAY CATEGORY AND TAG */

						applyTaxonomy(
								record.card,
								record.categories,
								record.tags
						);
				});


				/* AUTOMATIC SERIES NUMBERING */

				await updateSeriesParts(
						records
				);
		}


		/* =====================================================
			 START
			 ===================================================== */

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
