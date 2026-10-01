
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


		function cleanText(value) {
				const div = document.createElement('div');
				div.innerHTML = String(value || '');

				return (div.textContent || '')
						.replace(/\s+/g, ' ')
						.trim();
		}


		function seriesCopy(name) {
				const configured =
						window.MTF &&
						window.MTF.journalSeriesCopy &&
						window.MTF.journalSeriesCopy[
								String(name || '').trim().toLowerCase()
						];

				return configured || {
						subtitle:
								'A continuing Journal series exploring the stories, people and ideas behind the work.',

						intro:
								'A collection of related Journal articles exploring this subject in greater depth.'
				};
		}


		/* =====================================================
			 PAGE DETECTION
			 ===================================================== */

		function pageInfo() {
				const path =
						location.pathname.replace(/\/+$/, '') || '/';

				const match = path.match(
						/^\/journal\/(tag|category)\/([^/]+)$/i
				);

				const home = path === '/journal';

				const pagination =
						/^\/journal\/page\/[^/]+$/i.test(path);

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
								!/^\/journal\/[^/]+$/i.test(path) ||
								/^\/journal\/(?:tag|category|page)$/i.test(path)
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
						'/journal/' +
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
						'/journal/' + type + '/';

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

				const excerptText = cleanText(
						card.querySelector('.blog-excerpt-wrapper')?.textContent || ''
				);

				const bodyText = cleanText(
						card.querySelector('.blog-body-wrapper')?.textContent || ''
				);

				const wordCount = bodyText
						? bodyText.split(/\s+/).length
						: excerptText.split(/\s+/).filter(Boolean).length;

				return {
						card,
						path,
						title: cleanText(title.textContent),
						excerpt: excerptText,
						readTime: Math.max(1, Math.ceil(wordCount / 225)),
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
														? '/journal/' +
															String(item.urlId).replace(
																	/^\/journal\//,
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
								'/journal/',
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

												title: cleanText(
																item.querySelector('title')?.textContent || ''
												),

												excerpt: cleanText(
																item.querySelector('description')?.textContent || ''
												),

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
			 SERIES LANDING PAGE
			 ===================================================== */

		function insertSeriesLandingHero(
				archive,
				seriesName,
				category
		) {
				if (document.querySelector('.mtf-journal-series-landing-hero')) {
						return;
				}

				const hero = document.createElement('section');
				hero.className = 'mtf-journal-series-landing-hero';

				const eyebrow = ['Journal'];
				if (category?.name) eyebrow.push(category.name);

				hero.innerHTML = `
						<div class="mtf-journal-series-landing-hero__inner">
								<p class="mtf-journal-series-landing-hero__eyebrow"></p>
								<h1 class="mtf-journal-series-landing-hero__title"></h1>
								<p class="mtf-journal-series-landing-hero__subtitle"></p>
						</div>
				`;

				hero.querySelector('.mtf-journal-series-landing-hero__eyebrow')
						.textContent = eyebrow.join(' / ');

				hero.querySelector('.mtf-journal-series-landing-hero__title')
						.textContent = seriesName;

				hero.querySelector('.mtf-journal-series-landing-hero__subtitle')
						.textContent = seriesCopy(seriesName).subtitle;

				archive.before(hero);

				const nav = document.createElement('nav');
				nav.className = 'mtf-journal-series-breadcrumbs';
				nav.setAttribute('aria-label', 'Journal breadcrumbs');

				const crumbs = [{ label: 'Journal', href: '/journal' }];

				if (category?.name) {
						crumbs.push({ label: category.name, href: category.href });
				}

				crumbs.push({ label: seriesName, current: true });

				const list = document.createElement('ol');

				crumbs.forEach((crumb, index) => {
						if (index) {
								const separator = document.createElement('li');
								separator.className = 'mtf-journal-series-breadcrumbs__separator';
								separator.setAttribute('aria-hidden', 'true');
								separator.textContent = '›';
								list.appendChild(separator);
						}

						const item = document.createElement('li');

						if (crumb.href) {
								const link = document.createElement('a');
								link.href = crumb.href;
								link.textContent = crumb.label;
								item.appendChild(link);
						} else {
								const current = document.createElement('span');
								current.textContent = crumb.label;
								current.setAttribute('aria-current', 'page');
								item.appendChild(current);
						}

						list.appendChild(item);
				});

				nav.appendChild(list);
				hero.after(nav);
		}


		function seriesRow(record, post, part, total) {
				const text = record.card.querySelector('.blog-single-column--text');
				if (!text) return;

				const title = record.title || post.title;
				const excerpt = record.excerpt || post.excerpt;
				const category = record.categories[0] || null;

				text.replaceChildren();

				const partLabel = document.createElement('div');
				partLabel.className = 'mtf-journal-series-row__part';
				partLabel.textContent = 'Part ' + part + ' of ' + total;

				const main = document.createElement('div');
				main.className = 'mtf-journal-series-row__main';

				const heading = document.createElement('h2');
				heading.className = 'mtf-journal-series-row__title';

				const titleLink = document.createElement('a');
				titleLink.href = record.path;
				titleLink.textContent = title;
				heading.appendChild(titleLink);

				const deck = document.createElement('p');
				deck.className = 'mtf-journal-series-row__excerpt';
				deck.textContent = excerpt;

				const meta = document.createElement('div');
				meta.className = 'mtf-journal-series-row__meta';

				const time = document.createElement('span');
				time.textContent = record.readTime + ' min read';
				meta.appendChild(time);

				if (category?.name) {
						const divider = document.createElement('span');
						divider.setAttribute('aria-hidden', 'true');
						divider.textContent = '|';

						const cat = document.createElement('a');
						cat.href = category.href;
						cat.textContent = category.name;

						meta.append(divider, cat);
				}

				main.append(heading, deck, meta);

				const read = document.createElement('a');
				read.className = 'mtf-journal-series-row__read';
				read.href = record.path;
				read.innerHTML = 'Read Article <span aria-hidden="true">→</span>';

				text.append(partLabel, main, read);
				record.card.classList.add('mtf-journal-series-row');
		}


		async function renderSeriesLanding(archive, info, records) {
				if (info.type !== 'tag' || !info.name) return false;

				const posts = await seriesPosts(info.name);

				if (posts.length < 2 || posts.length >= 20) {
						return false;
				}

				const recordMap = new Map(
						records.map(record => [record.path, record])
				);

				const ordered = posts.map(post => ({
						post,
						record: recordMap.get(post.path)
				})).filter(item => item.record);

				if (ordered.length < 2) return false;

				document.documentElement.classList.add('mtf-journal-series-page');

				const category = ordered
						.map(item => item.record.categories[0])
						.find(Boolean) || null;

				insertSeriesLandingHero(archive, info.name, category);

				const wrapper = archive.querySelector('.blog-single-column--wrapper');
				if (!wrapper) return true;

				const intro = document.createElement('div');
				intro.className = 'mtf-journal-series-intro';
				intro.textContent = seriesCopy(info.name).intro;
				wrapper.prepend(intro);

				ordered.forEach((item, index) => {
						item.record.title = item.record.title || item.post.title;
						item.record.excerpt = item.record.excerpt || item.post.excerpt;

						seriesRow(
								item.record,
								item.post,
								index + 1,
								posts.length
						);

						wrapper.appendChild(item.record.card);
				});

				const footer = document.createElement('div');
				footer.className = 'mtf-journal-series-footer';

				const all = document.createElement('a');
				all.href = '/journal';
				all.innerHTML = '<span aria-hidden="true">☷</span> View All Journal Articles <span aria-hidden="true">→</span>';

				footer.appendChild(all);
				wrapper.appendChild(footer);

				return true;
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

						record.title = cleanText(
								item.title || record.title
						);

						record.excerpt = cleanText(
								item.excerpt ||
								item.bodyExcerpt ||
								item.description ||
								record.excerpt
						);

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


				/* AUTOMATIC SERIES NUMBERING

				   Tag-filtered series pages intentionally use the same
				   archive presentation as category-filtered pages. */

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
