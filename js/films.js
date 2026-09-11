(function () {

	'use strict';


	function initFilms() {

		/* ==================================================
			 MARK THOMAS FILMS — FILM GRID
			 ================================================== */

		const filmGrid =
			document.querySelector(
				'.blog-basic-grid.collection-content-wrapper'
			);


		const filmCards =
			document.querySelectorAll(
				'.blog-basic-grid article.blog-item'
			);


		if (!filmGrid || !filmCards.length) {
			return;
		}


		const archive =
			getCurrentArchive();


		/* ==================================================
			 MAIN PAGE / FILTERED PAGE SETUP
			 ================================================== */

		if (archive) {

			addArchiveContext(
				archive
			);

		}

		else {

			buildFilmsBrowser();

		}


		/* ==================================================
			 PROCESS FILM CARDS
			 ================================================== */

		filmCards.forEach(function (post) {

			processFilmCard(
				post
			);

		});


		/* ==================================================
			 CURRENT TAXONOMY ARCHIVE
			 ================================================== */

		function getCurrentArchive() {

			const match =
				window.location.pathname.match(
					/\/films\/(tag|category)\/([^/]+)\/?$/i
				);


			if (!match) {
				return null;
			}


			const type =
				match[1]
					.toLowerCase();


			let name =
				match[2]
					.replace(
						/\+/g,
						' '
					);


			try {

				name =
					decodeURIComponent(
						name
					);

			}

			catch (error) {

				/*
				 * Keep the readable URL value if
				 * decoding somehow fails.
				 */

			}


			return {
				type: type,
				name: name
			};

		}


		/* ==================================================
			 NORMALIZE TAG CONTEXT KEY
			 ================================================== */

		function normalizeTagContextKey(value) {

			if (!value) {
				return '';
			}


			return value
				.trim()
				.toLowerCase()
				.replace(
					/[’‘]/g,
					"'"
				)
				.replace(
					/\s+/g,
					' '
				);

		}


		/* ==================================================
			 GET ARCHIVE CONTEXT
			 ================================================== */
		
		function getArchiveContext(archive) {
		
			if (
				!archive ||
				!window.MTF
			) {
				return null;
			}
		
		
			let contextSource =
				null;
		
		
			if (
				archive.type === 'tag' &&
				window.MTF.filmTagContext
			) {
		
				contextSource =
					window.MTF.filmTagContext;
		
			}
		
			else if (
				archive.type === 'category' &&
				window.MTF.filmCategoryContext
			) {
		
				contextSource =
					window.MTF.filmCategoryContext;
		
			}
		
		
			if (!contextSource) {
				return null;
			}
		
		
			const key =
				normalizeTagContextKey(
					archive.name
				);
		
		
			/*
			 * Try the normalized key first.
			 */
		
			if (
				contextSource[
					key
				]
			) {
		
				return contextSource[
					key
				];
		
			}
		
		
			/*
			 * Fallback for keys containing alternate
			 * apostrophes or spacing.
			 */
		
			const contextKeys =
				Object.keys(
					contextSource
				);
		
		
			const matchingKey =
				contextKeys.find(
					function (contextKey) {
		
						return (
							normalizeTagContextKey(
								contextKey
							) ===
							key
						);
		
					}
				);
		
		
			return matchingKey
				? contextSource[
					matchingKey
				]
				: null;
		
		}


		/* ==================================================
			 FIND ALL FILMS TAG CLOUDS
			 ================================================== */

		function findFilmsTagClouds() {

			return Array
				.from(
					document.querySelectorAll(
						'.sqs-block-tagcloud'
					)
				)
				.filter(function (block) {

					return Boolean(
						block.querySelector(
							'a[href*="/films/tag/"]'
						)
					);

				});

		}


		/* ==================================================
			 REMOVE FILMS TAG CLOUDS
			 ================================================== */

		function removeFilmsTagClouds() {

			const blocks =
				findFilmsTagClouds();


			blocks.forEach(function (block) {

				const section =
					block.closest(
						'section'
					);


				if (
					section &&
					!section.contains(
						filmGrid
					)
				) {

					section.remove();

				}

				else {

					block.remove();

				}

			});

		}


		/* ==================================================
			 FIND MAIN FILMS TAG CLOUD
			 ================================================== */

		function findFilmsTagCloud() {

			const blocks =
				findFilmsTagClouds();


			return blocks.length
				? blocks[0]
				: null;

		}


		/* ==================================================
			 MAIN FILMS BROWSER
			 ================================================== */

		function buildFilmsBrowser() {

			if (
				document.querySelector(
					'.mtf-films-intro-explorer'
				)
			) {
				return;
			}


			const tagCloudBlock =
				findFilmsTagCloud();


			if (!tagCloudBlock) {
				return;
			}


			const browser =
				createFilmBrowser(
					tagCloudBlock
				);


			if (!browser) {
				return;
			}


			const wrapper =
				document.createElement(
					'section'
				);


			wrapper.className =
				'mtf-films-intro-explorer';


			const explorer =
				document.createElement(
					'div'
				);


			explorer.className =
				'mtf-film-explorer';


			const explorerTitle =
				document.createElement(
					'h2'
				);


			explorerTitle.className =
				'mtf-film-explorer-title';


			explorerTitle.textContent =
				'Explore Wedding Films';


			const explorerCopy =
				document.createElement(
					'p'
				);


			explorerCopy.className =
				'mtf-film-explorer-copy';


			explorerCopy.textContent =
				'Browse by venue and location.';


			explorer.appendChild(
				explorerTitle
			);


			explorer.appendChild(
				explorerCopy
			);


			explorer.appendChild(
				browser
			);


			wrapper.appendChild(
				explorer
			);


			removeFilmsTagClouds();


			filmGrid.parentNode.insertBefore(
				wrapper,
				filmGrid
			);

		}


		/* ==================================================
			 CREATE FILM BROWSER
			 ================================================== */

		function createFilmBrowser(
			tagCloudBlock,
			currentTagName
		) {

			if (
				!window.MTF ||
				!(window.MTF.filmCities instanceof Set)
			) {

				console.error(
					'Mark Thomas Films: film city list is unavailable.'
				);

				return null;
			}


			if (!tagCloudBlock) {
				return null;
			}


			const currentKey =
				normalizeTagContextKey(
					currentTagName
				);


			const tags =
				collectFilmBrowserTags(
					tagCloudBlock,
					currentKey
				);


			if (!tags.length) {
				return null;
			}


			const cities = [];
			const venues = [];


			tags.forEach(function (tag) {

				if (
					window.MTF.filmCities.has(
						tag.key
					)
				) {

					cities.push(tag);

				}

				else {

					venues.push(tag);

				}

			});


			sortFilmBrowserTags(
				cities
			);


			sortFilmBrowserTags(
				venues
			);


			const browser =
				document.createElement(
					'div'
				);


			browser.className =
				'mtf-film-browser';


			browser.setAttribute(
				'aria-label',
				'Browse wedding films'
			);


			browser.appendChild(
				createFilmBrowserDropdown({
					type: 'venue',
					label: 'Browse by Venue',
					searchPlaceholder: 'Search venues...',
					searchLabel: 'Search venues',
					noResultsText: 'No matching venues.',
					items: venues
				})
			);


			browser.appendChild(
				createFilmBrowserDropdown({
					type: 'city',
					label: 'Browse by City',
					searchPlaceholder: 'Search cities...',
					searchLabel: 'Search cities',
					noResultsText: 'No matching cities.',
					items: cities
				})
			);


			setupFilmBrowserDropdowns(
				browser
			);


			return browser;

		}


		/* ==================================================
			 COLLECT FILM BROWSER TAGS
			 ================================================== */

		function collectFilmBrowserTags(
			block,
			currentKey
		) {

			const items = [];


			block
				.querySelectorAll(
					'a[href*="/films/tag/"]'
				)
				.forEach(function (link) {

					const name =
						link.textContent
							.trim();


					const href =
						link.href;


					const key =
						normalizeTagContextKey(
							name
						);


					if (
						!name ||
						!href ||
						!key ||
						key === 'tx'
					) {
						return;
					}


					const exists =
						items.some(function (item) {

							return item.key === key;

						});


					if (!exists) {

						items.push({
							name: name,
							href: href,
							key: key,
							isCurrent:
								Boolean(
									currentKey &&
									key === currentKey
								)
						});

					}

				});


			return items;

		}


		/* ==================================================
			 SORT FILM BROWSER TAGS
			 ================================================== */

		function sortFilmBrowserTags(items) {

			items.sort(function (a, b) {

				return a.name.localeCompare(
					b.name,
					'en',
					{
						sensitivity: 'base'
					}
				);

			});

		}


		/* ==================================================
			 CREATE FILM BROWSER DROPDOWN
			 ================================================== */

		function createFilmBrowserDropdown(options) {

			const dropdown =
				document.createElement(
					'details'
				);


			dropdown.className =
				'mtf-dropdown mtf-' +
				options.type +
				'-dropdown';


			const summary =
				document.createElement(
					'summary'
				);


			const summaryLabel =
				document.createElement(
					'span'
				);


			summaryLabel.textContent =
				options.label;


			const chevron =
				document.createElement(
					'span'
				);


			chevron.className =
				'mtf-chevron';


			chevron.setAttribute(
				'aria-hidden',
				'true'
			);


			summary.appendChild(
				summaryLabel
			);


			summary.appendChild(
				chevron
			);


			const panel =
				document.createElement(
					'div'
				);


			panel.className =
				'mtf-dropdown-panel';


			const searchWrap =
				document.createElement(
					'div'
				);


			searchWrap.className =
				'mtf-search-wrap';


			const search =
				document.createElement(
					'input'
				);


			search.type =
				'search';


			search.className =
				'mtf-search';


			search.placeholder =
				options.searchPlaceholder;


			search.autocomplete =
				'off';


			search.setAttribute(
				'aria-label',
				options.searchLabel
			);


			searchWrap.appendChild(
				search
			);


			const list =
				document.createElement(
					'div'
				);


			list.className =
				'mtf-link-list';


			options.items.forEach(function (item) {

				if (item.isCurrent) {

					const currentItem =
						document.createElement(
							'div'
						);


					currentItem.className =
						'mtf-current-item';


					currentItem.dataset.mtfSearchName =
						normalizeTagContextKey(
							item.name
						);


					currentItem.setAttribute(
						'aria-current',
						'page'
					);


					const currentName =
						document.createElement(
							'span'
						);


					currentName.className =
						'mtf-current-item-name';


					currentName.textContent =
						item.name;


					const currentLabel =
						document.createElement(
							'span'
						);


					currentLabel.className =
						'mtf-current-label';


					currentLabel.textContent =
						'Current';


					currentItem.appendChild(
						currentName
					);


					currentItem.appendChild(
						currentLabel
					);


					list.appendChild(
						currentItem
					);


					return;

				}


				const link =
					document.createElement(
						'a'
					);


				link.href =
					item.href;


				link.textContent =
					item.name;


				link.dataset.mtfSearchName =
					normalizeTagContextKey(
						item.name
					);


				list.appendChild(
					link
				);

			});


			const noResults =
				document.createElement(
					'div'
				);


			noResults.className =
				'mtf-no-results';


			noResults.textContent =
				options.noResultsText;


			noResults.hidden =
				true;


			panel.appendChild(
				searchWrap
			);


			panel.appendChild(
				list
			);


			panel.appendChild(
				noResults
			);


			dropdown.appendChild(
				summary
			);


			dropdown.appendChild(
				panel
			);


			setupFilmBrowserSearch(
				dropdown,
				search,
				noResults
			);


			return dropdown;

		}


		/* ==================================================
			 FILM BROWSER SEARCH
			 ================================================== */

		function setupFilmBrowserSearch(
			dropdown,
			searchInput,
			noResults
		) {

			const items =
				dropdown.querySelectorAll(
					'.mtf-link-list > a, ' +
					'.mtf-link-list > .mtf-current-item'
				);


			searchInput.addEventListener(
				'input',
				function () {

					const searchTerm =
						normalizeTagContextKey(
							this.value
						);


					let visibleCount = 0;


					items.forEach(function (item) {

						const itemName =
							item.dataset.mtfSearchName ||
							normalizeTagContextKey(
								item.textContent
							);


						const visible =
							itemName.includes(
								searchTerm
							);


						item.hidden =
							!visible;


						if (visible) {
							visibleCount += 1;
						}

					});


					noResults.hidden =
						visibleCount !== 0;

				}
			);


			dropdown.addEventListener(
				'toggle',
				function () {

					if (dropdown.open) {
						return;
					}


					searchInput.value =
						'';


					items.forEach(function (item) {

						item.hidden =
							false;

					});


					noResults.hidden =
						true;

				}
			);

		}


		/* ==================================================
			 FILM BROWSER DROPDOWN BEHAVIOR
			 ================================================== */
		
		function setupFilmBrowserDropdowns(browser) {
		
			const dropdowns =
				browser.querySelectorAll(
					'.mtf-dropdown'
				);
		
		
			/*
			 * Only allow one browser dropdown
			 * to remain open at a time.
			 */
		
			dropdowns.forEach(function (dropdown) {
		
				dropdown.addEventListener(
					'toggle',
					function () {
		
						if (!dropdown.open) {
							return;
						}
		
		
						dropdowns.forEach(function (other) {
		
							if (other !== dropdown) {
								other.open = false;
							}
		
						});
		
					}
				);
		
			});
		
		
			/*
			 * Close all dropdowns when the user
			 * clicks anywhere outside the browser.
			 */
		
			document.addEventListener(
				'click',
				function (event) {
		
					if (
						browser.contains(
							event.target
						)
					) {
						return;
					}
		
		
					dropdowns.forEach(function (dropdown) {
		
						dropdown.open = false;
		
					});
		
				}
			);
		
		
			/*
			 * Escape closes any open dropdown.
			 */
		
			document.addEventListener(
				'keydown',
				function (event) {
		
					if (event.key !== 'Escape') {
						return;
					}
		
		
					dropdowns.forEach(function (dropdown) {
		
						dropdown.open = false;
		
					});
		
				}
			);
		
		}


		/* ==================================================
			 FILTERED ARCHIVE CONTEXT
			 ================================================== */

		function addArchiveContext(archive) {

			if (
				document.querySelector(
					'.mtf-archive-context'
				)
			) {
				return;
			}


			const archiveContext =
				getArchiveContext(
					archive
				);


			const context =
				document.createElement(
					'div'
				);


			context.className =
				'mtf-archive-context';


			/* --------------------------------------------------
				 LABEL
				 -------------------------------------------------- */

			const label =
				document.createElement(
					'p'
				);


			label.className =
				'mtf-archive-context-label';


			label.textContent =
				archive.type === 'tag'
					? 'Browse wedding films related to:'
					: 'Browse wedding films in this collection:';


			context.appendChild(
				label
			);


			/* --------------------------------------------------
				 TITLE
				 -------------------------------------------------- */

			const title =
				document.createElement(
					'h2'
				);


			title.className =
				'mtf-archive-context-title';


			title.textContent =
				archiveContext &&
				archiveContext.name
					? archiveContext.name
					: archive.name;


			context.appendChild(
				title
			);


			/* --------------------------------------------------
				 ARCHIVE FILM BROWSER
				 -------------------------------------------------- */
			
			const tagCloudBlock =
				findFilmsTagCloud();
			
			
			if (tagCloudBlock) {
			
				const browser =
					createFilmBrowser(
						tagCloudBlock,
						archive.type === 'tag'
							? archive.name
							: null
					);
			
			
				if (browser) {
			
					browser.classList.add(
						'mtf-film-browser--archive'
					);
			
			
					context.appendChild(
						browser
					);
			
			
					removeFilmsTagClouds();
			
				}
			
			}


			/* --------------------------------------------------
				 DESCRIPTIVE VENUE CONTEXT
				 -------------------------------------------------- */

			if (
				archiveContext &&
				Array.isArray(
					archiveContext.paragraphs
				) &&
				archiveContext.paragraphs.length
			) {

				const copy =
					document.createElement(
						'div'
					);


				copy.className =
					'mtf-archive-context-copy';


				archiveContext.paragraphs
					.forEach(function (text) {

						if (
							typeof text !==
								'string' ||
							!text.trim()
						) {
							return;
						}


						const paragraph =
							document.createElement(
								'p'
							);


						paragraph.className =
							'mtf-archive-context-paragraph';


						paragraph.textContent =
							text.trim();


						copy.appendChild(
							paragraph
						);

					});


				if (copy.children.length) {

					context.appendChild(
						copy
					);

				}

			}


			filmGrid.parentNode.insertBefore(
				context,
				filmGrid
			);

		}


		/* ==================================================
			 PROCESS FILM CARD
			 ================================================== */

		function processFilmCard(post) {

			const titleLink =
				post.querySelector(
					'.blog-title a'
				);


			const metaSection =
				post.querySelector(
					'.blog-meta-section'
				);


			const readMore =
				post.querySelector(
					'.blog-more-link'
				);


			const imageWrapper =
				post.querySelector(
					'a.image-wrapper'
				);


			const excerpt =
				post.querySelector(
					'.blog-excerpt'
				);


			if (!titleLink) {
				return;
			}


			const postURL =
				titleLink.href;


			post.classList.add(
				'mtf-film-card',
				'mtf-clickable-card'
			);


			if (imageWrapper) {

				imageWrapper.classList.add(
					'mtf-film-media'
				);


				const image =
					imageWrapper.querySelector(
						'img'
					);


				if (image) {

					image.classList.add(
						'mtf-film-image'
					);

				}

			}


			if (excerpt) {

				excerpt.classList.add(
					'mtf-film-excerpt'
				);


				normalizeExcerptSpaces(
					excerpt
				);

			}


			if (readMore) {

				readMore.textContent =
					'Watch the Film';


				readMore.classList.add(
					'mtf-watch-film'
				);

			}


			const categories =
				collectUniqueLinks(
					metaSection,
					'.blog-categories, ' +
					'a[href*="/films/category/"], ' +
					'a[href*="/blog/category/"]'
				);


			const existingTags =
				collectUniqueLinks(
					post,
					'.blog-item-tag, ' +
					'a[href*="/films/tag/"], ' +
					'a[href*="/blog/tag/"]'
				);


			if (metaSection) {

				metaSection.innerHTML =
					'';


				metaSection.classList.add(
					'mtf-film-meta'
				);


				renderMetaLine(
					metaSection,
					categories,
					'mtf-film-categories',
					'mtf-category-separator'
				);


				if (existingTags.length) {

					renderMetaLine(
						metaSection,
						existingTags,
						'mtf-film-tags',
						'mtf-tag-separator'
					);

				}

				else {

					loadPostTags(
						postURL
					)
						.then(function (tags) {

							if (!tags.length) {
								return;
							}


							renderMetaLine(
								metaSection,
								tags,
								'mtf-film-tags',
								'mtf-tag-separator'
							);

						});

				}

			}


			post.addEventListener(
				'click',
				function (event) {

					if (
						event.target.closest(
							'a, button, input, textarea, select, iframe, [role="button"]'
						)
					) {
						return;
					}


					const selection =
						window.getSelection();


					if (
						selection &&
						selection
							.toString()
							.trim()
					) {
						return;
					}


					window.location.href =
						postURL;

				}
			);

		}


		/* ==================================================
			 NORMALIZE EXCERPT SPACES
			 ================================================== */

		function normalizeExcerptSpaces(excerpt) {

			const walker =
				document.createTreeWalker(
					excerpt,
					NodeFilter.SHOW_TEXT
				);


			let textNode =
				walker.nextNode();


			while (textNode) {

				textNode.nodeValue =
					textNode.nodeValue.replace(
						/\u00A0/g,
						' '
					);


				textNode =
					walker.nextNode();

			}

		}


		/* ==================================================
			 LOAD POST TAGS
			 ================================================== */

		async function loadPostTags(postURL) {

			try {

				const response =
					await fetch(
						postURL,
						{
							credentials:
								'same-origin'
						}
					);


				if (!response.ok) {
					return [];
				}


				const html =
					await response.text();


				const parser =
					new DOMParser();


				const postDocument =
					parser.parseFromString(
						html,
						'text/html'
					);


				return collectUniqueLinks(
					postDocument,
					'.blog-item-tag, ' +
						'a[href*="/films/tag/"], ' +
						'a[href*="/blog/tag/"]'
				);

			}

			catch (error) {

				console.warn(
					'Mark Thomas Films: unable to retrieve tags for',
					postURL,
					error
				);


				return [];

			}

		}


		/* ==================================================
			 COLLECT UNIQUE LINKS
			 ================================================== */

		function collectUniqueLinks(
			root,
			selector
		) {

			if (!root) {
				return [];
			}


			const items = [];


			root
				.querySelectorAll(
					selector
				)
				.forEach(function (link) {

					const text =
						link.textContent
							.trim();


					const href =
						link.href;


					if (
						!text ||
						!href
					) {
						return;
					}


					const exists =
						items.some(function (item) {

							return (
								item.text
									.toLowerCase() ===
								text.toLowerCase()
							);

						});


					if (!exists) {

						items.push({
							text: text,
							href: href
						});

					}

				});


			return items;

		}


		/* ==================================================
			 RENDER META LINE
			 ================================================== */

		function renderMetaLine(
			parent,
			items,
			lineClass,
			separatorClass
		) {

			if (
				!parent ||
				!items.length ||
				parent.querySelector(
					'.' + lineClass
				)
			) {
				return;
			}


			const line =
				document.createElement(
					'div'
				);


			line.className =
				lineClass;


			items.forEach(
				function (item, index) {

					if (index > 0) {

						const separator =
							document.createElement(
								'span'
							);


						separator.className =
							separatorClass;


						separator.textContent =
							' · ';


						line.appendChild(
							separator
						);

					}


					const link =
						document.createElement(
							'a'
						);


					link.href =
						item.href;


					link.textContent =
						item.text;


					line.appendChild(
						link
					);

				}
			);


			parent.appendChild(
				line
			);

		}

	}


	/* ==================================================
		 SAFE INITIALIZATION
		 ================================================== */

	if (document.readyState === 'loading') {

		document.addEventListener(
			'DOMContentLoaded',
			initFilms,
			{ once: true }
		);

	}

	else {

		initFilms();

	}

})();