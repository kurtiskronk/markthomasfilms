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

	function hideEnteredAllCapsTags(items) {

		return items.filter(function (item) {

			const originalText =
				item.text.trim();

			const lettersOnly =
				originalText.replace(
					/[^A-Za-z]/g,
					''
				);

			/*
			 * CSS text-transform does not alter textContent.
			 * This therefore checks how the tag was actually
			 * entered in Squarespace.
			 *
			 * Three or more letters in ALL CAPS are hidden.
			 * TX remains visible.
			 */

			const wasEnteredAllCaps =
				lettersOnly.length >= 3 &&
				lettersOnly ===
					lettersOnly.toUpperCase();

			return !wasEnteredAllCaps;

		});
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