(function () {
	'use strict';

	window.MTF = window.MTF || {};

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

	function normalizeArchiveHref(
		link,
		text
	) {

		const href =
			link.href;

		if (!href) {
			return '';
		}

		try {

			const url =
				new URL(
					href,
					window.location.origin
				);

			const match =
				url.pathname.match(
					/^\/(films|blog)\/(tag|category)\/[^/]+\/?$/i
				);

			/*
			 * Only normalize Squarespace film/blog
			 * tag and category archive URLs.
			 *
			 * All other links remain untouched.
			 */

			if (!match) {
				return href;
			}

			/*
			 * Squarespace archive URLs use +
			 * in place of spaces.
			 *
			 * Example:
			 * Kendall Point
			 * → Kendall+Point
			 *
			 * A genuine plus sign remains safely
			 * encoded as %2B.
			 */

			const encodedName =
				encodeURIComponent(
					text.trim()
				).replace(
					/%20/g,
					'+'
				);

			url.pathname =
				'/' +
				match[1] +
				'/' +
				match[2] +
				'/' +
				encodedName;

			return url.href;

		}

		catch (error) {

			return href;

		}
	}

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

				if (!text) {
					return;
				}

				const href =
					normalizeArchiveHref(
						link,
						text
					);

				if (!href) {
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

	
	function shouldDisplayFilmTag(tag) {
			const letters = String(tag || "")
					.trim()
					.replace(/[^A-Za-z]/g, "");
	
			// Hide tags entered with 3+ uppercase letters.
			// Two-letter state abbreviations remain visible.
			return letters.length < 3 ||
					letters !== letters.toUpperCase();
	}
	
	window.MTF.shouldDisplayFilmTag = shouldDisplayFilmTag;
	
	function hideEnteredAllCapsTags(items) {
			return items.filter(item =>
					shouldDisplayFilmTag(item.text)
			);
	}

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

		if (
			lineClass ===
				'mtf-film-tags'
		) {

			items =
				hideEnteredAllCapsTags(
					items
				);

		}

		if (!items.length) {
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

			const postDocument =
				new DOMParser()
					.parseFromString(
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

	function process(post) {

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

	window.MTF.filmCards = {
		process:
			process
	};

})();