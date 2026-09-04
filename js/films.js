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

			removeFilmsTagClouds();

			addArchiveContext(
				archive
			);

		}

		else {

			buildFilmsExplorer();

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
			 GET TAG CONTEXT
			 ================================================== */

		function getTagContext(archive) {

			/*
			 * We intentionally provide expanded context
			 * only for tag archives.
			 *
			 * Categories continue using the standard
			 * archive heading.
			 */

			if (
				!archive ||
				archive.type !== 'tag'
			) {
				return null;
			}


			if (
				!window.MTF ||
				!window.MTF.filmTagContext
			) {
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
				window.MTF.filmTagContext[
					key
				]
			) {

				return window.MTF.filmTagContext[
					key
				];

			}


			/*
			 * Fallback for any context definitions that
			 * still contain curly apostrophes.
			 */

			const contextKeys =
				Object.keys(
					window.MTF.filmTagContext
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
				? window.MTF.filmTagContext[
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
			 REMOVE TAG CLOUDS FROM FILTERED ARCHIVES
			 ================================================== */

		function removeFilmsTagClouds() {

			const blocks =
				findFilmsTagClouds();


			blocks.forEach(function (block) {

				const section =
					block.closest(
						'section'
					);


				/*
				 * If this is a dedicated Tag Cloud
				 * section, remove the entire section so
				 * Fluid Engine spacing disappears too.
				 */

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
			 MAIN FILMS EXPLORER
			 ================================================== */

		function buildFilmsExplorer() {

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


			const originalSection =
				tagCloudBlock.closest(
					'section'
				);


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
				'Browse by venue, location, or setting.';


			explorer.appendChild(
				explorerTitle
			);


			explorer.appendChild(
				explorerCopy
			);


			tagCloudBlock.classList.add(
				'mtf-film-tag-cloud-block'
			);


			explorer.appendChild(
				tagCloudBlock
			);


			wrapper.appendChild(
				explorer
			);


			scaleTagCloud(
				tagCloudBlock
			);


			if (
				originalSection &&
				!originalSection.contains(
					filmGrid
				)
			) {

				originalSection.remove();

			}


			filmGrid.parentNode.insertBefore(
				wrapper,
				filmGrid
			);

		}


		/* ==================================================
			 COMPACT + SCALE TAG CLOUD
			 ================================================== */

		function scaleTagCloud(block) {

			let entries =
				Array.from(
					block.querySelectorAll(
						'li'
					)
				)
				.map(function (item) {

					const link =
						item.querySelector(
							'a[href*="/films/tag/"]'
						);


					if (!link) {
						return null;
					}


					const name =
						link.textContent
							.trim();


					const sourceSize =
						parseFloat(
							window
								.getComputedStyle(
									item
								)
								.fontSize
						);


					return {
						item: item,
						link: link,
						name: name,
						sourceSize: sourceSize
					};

				})
				.filter(Boolean);


			/* ==============================================
				 REMOVE TX COMPLETELY
				 ============================================== */

			entries =
				entries.filter(function (entry) {

					if (
						entry.name
							.toLowerCase() !==
						'tx'
					) {
						return true;
					}


					entry.item.remove();


					return false;

				});


			if (!entries.length) {
				return;
			}


			/* ==============================================
				 PRESERVE SQUARESPACE FREQUENCY WEIGHTING
				 ============================================== */

			const sourceSizes =
				entries.map(function (entry) {

					return entry.sourceSize;

				});


			const minSource =
				Math.min.apply(
					null,
					sourceSizes
				);


			const maxSource =
				Math.max.apply(
					null,
					sourceSizes
				);


			const targetMin =
				13;


			const targetMax =
				18;


			entries.forEach(function (entry) {

				let targetSize =
					targetMin;


				if (
					maxSource >
					minSource
				) {

					const ratio =
						(
							entry.sourceSize -
							minSource
						) /
						(
							maxSource -
							minSource
						);


					targetSize =
						targetMin +
						(
							ratio *
							(
								targetMax -
								targetMin
							)
						);

				}


				entry.item.style.fontSize =
					'1rem';


				entry.item.style.lineHeight =
					'1';


				entry.item.style.margin =
					'0';


				entry.item.style.padding =
					'0';


				entry.link.style.fontSize =
					targetSize.toFixed(2) +
					'px';


				entry.link.style.lineHeight =
					'1.1';

			});

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


			const tagContext =
				getTagContext(
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


			/*
			 * If a venue definition supplies an official
			 * display name, use it.
			 *
			 * Otherwise use the tag/category name from
			 * Squarespace.
			 */

			title.textContent =
				tagContext &&
				tagContext.name
					? tagContext.name
					: archive.name;


			context.appendChild(
				title
			);


			/* --------------------------------------------------
				 DESCRIPTIVE VENUE CONTEXT
				 -------------------------------------------------- */

			if (
				tagContext &&
				Array.isArray(
					tagContext.paragraphs
				) &&
				tagContext.paragraphs.length
			) {

				const copy =
					document.createElement(
						'div'
					);


				copy.className =
					'mtf-archive-context-copy';


				tagContext.paragraphs
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


			/* --------------------------------------------------
				 INSERT ABOVE FILM GRID
				 -------------------------------------------------- */

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


			/* ==============================================
				 FEATURED IMAGE
				 ============================================== */

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


			/* ==============================================
				 EXCERPT
				 ============================================== */

			if (excerpt) {

				excerpt.classList.add(
					'mtf-film-excerpt'
				);


				normalizeExcerptSpaces(
					excerpt
				);

			}


			/* ==============================================
				 WATCH THE FILM
				 ============================================== */

			if (readMore) {

				readMore.textContent =
					'Watch the Film';


				readMore.classList.add(
					'mtf-watch-film'
				);

			}


			/* ==============================================
				 TAXONOMY
				 ============================================== */

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


			/* ==============================================
				 WHOLE CARD CLICK
				 ============================================== */

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


			const items =
				[];


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