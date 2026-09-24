/* =========================================================
	 MARK THOMAS FILMS
	 RELATED FILMS — UI

	 Renders related-film recommendations on individual
	 wedding film pages.

	 Responsibilities:
	 - Ask films-related.js for two recommendations.
	 - Build the recommendation section.
	 - Fetch each selected film page immediately.
	 - Extract the current Squarespace featured image.
	 - Render two linked film cards.
	 - Keep image retrieval separate from recommendation logic.

	 This module does NOT decide which films are related.
	 ========================================================= */

(function () {

	'use strict';


	window.MTF =
		window.MTF || {};


	const MTF =
		window.MTF;


	/* =====================================================
		 IMAGE CACHE

		 Prevent duplicate requests during the same page visit.
		 ===================================================== */

	const imageCache =
		new Map();


	/* =====================================================
		 HELPERS
		 ===================================================== */

	function normalizePath(value) {

		if (!value) {
			return '';
		}


		try {

			const url =
				new URL(
					value,
					window.location.origin
				);


			return url.pathname
				.replace(
					/\/+$/,
					''
				);

		}

		catch (error) {

			return '';

		}

	}


	function normalizeImageURL(value) {

		if (!value) {
			return '';
		}


		try {

			const url =
				new URL(
					value,
					window.location.origin
				);


			/*
			 * Squarespace may return an http://
			 * URL in Open Graph metadata even when
			 * the site itself is HTTPS.
			 */

			if (
				url.protocol ===
				'http:'
			) {

				url.protocol =
					'https:';

			}


			return url.href;

		}

		catch (error) {

			return '';

		}

	}


	function normalizeTagKey(value) {

		return String(
			value || ''
		)
			.normalize(
				'NFKD'
			)
			.replace(
				/[\u0300-\u036f]/g,
				''
			)
			.replace(
				/[\u2018\u2019]/g,
				"'"
			)
			.replace(
				/\s+/g,
				' '
			)
			.trim()
			.toLowerCase();

	}


	function createTagURL(tag) {

		const encoded =
			encodeURIComponent(
				tag
			)
				.replace(
					/%20/g,
					'+'
				);


		return (
			'/films/tag/' +
			encoded
		);

	}



	/*
	 * All-caps tags are archive-only metadata, not card labels.
	 * Keep two-letter state abbreviations such as TX visible.
	 * Reuse the shared cards predicate when it is available.
	 */
	function shouldDisplayFilmTag(value) {

		if (typeof MTF.shouldDisplayFilmTag === 'function') {
			return MTF.shouldDisplayFilmTag(value);
		}

		const lettersOnly =
			String(value || '')
				.trim()
				.replace(/[^A-Za-z]/g, '');

		return !(
			lettersOnly.length >= 3 &&
			lettersOnly === lettersOnly.toUpperCase()
		);

	}


	/* =====================================================
		 CURRENT FILM PAGE DETECTION
		 ===================================================== */

	function isIndividualFilmPage() {

		const path =
			window.location.pathname
				.replace(
					/\/+$/,
					''
				);


		return (
			/^\/films\/[^/]+$/i.test(
				path
			) &&
			!/^\/films\/(?:tag|category)\//i.test(
				path
			)
		);

	}


	/* =====================================================
		 FEATURED IMAGE RETRIEVAL
		 ===================================================== */

	function extractImageFromDocument(
		documentRoot,
		pageURL
	) {

		if (!documentRoot) {
			return '';
		}


		/*
		 * Preferred source:
		 * Squarespace's Open Graph image.
		 *
		 * Your live film pages currently expose
		 * the post's featured image here.
		 */

		const ogImage =
			documentRoot.querySelector(
				'meta[property="og:image"]'
			);


		if (ogImage) {

			const url =
				normalizeImageURL(
					ogImage.getAttribute(
						'content'
					)
				);


			if (url) {
				return url;
			}

		}


		/*
		 * Secondary fallback:
		 * Twitter image metadata.
		 */

		const twitterImage =
			documentRoot.querySelector(
				'meta[name="twitter:image"]'
			);


		if (twitterImage) {

			const url =
				normalizeImageURL(
					twitterImage.getAttribute(
						'content'
					)
				);


			if (url) {
				return url;
			}

		}


		/*
		 * Final fallback:
		 * Look for a likely Squarespace post image.
		 */

		const image =
			documentRoot.querySelector(
				'.blog-item img, ' +
				'.blog-item-wrapper img, ' +
				'article img'
			);


		if (image) {

			const candidates = [
				image.getAttribute(
					'data-src'
				),
				image.getAttribute(
					'data-image'
				),
				image.getAttribute(
					'src'
				)
			];


			for (
				let index = 0;
				index < candidates.length;
				index += 1
			) {

				const candidate =
					normalizeImageURL(
						candidates[index]
					);


				if (candidate) {
					return candidate;
				}

			}

		}


		return '';

	}


	async function fetchFilmImage(
		filmURL
	) {

		const path =
			normalizePath(
				filmURL
			);


		if (!path) {
			return '';
		}


		if (
			imageCache.has(
				path
			)
		) {

			return imageCache.get(
				path
			);

		}


		const promise =
			(async function () {

				try {

					const response =
						await fetch(
							path,
							{
								credentials:
									'same-origin'
							}
						);


					if (!response.ok) {

						throw new Error(
							'HTTP ' +
							response.status
						);

					}


					const html =
						await response.text();


					const pageDocument =
						new DOMParser()
							.parseFromString(
								html,
								'text/html'
							);


					return extractImageFromDocument(
						pageDocument,
						path
					);

				}

				catch (error) {

					console.warn(
						'Mark Thomas Films: unable to retrieve related-film image for',
						path,
						error
					);


					return '';

				}

			})();


		imageCache.set(
			path,
			promise
		);


		return promise;

	}


	/* =====================================================
		 CARD METADATA

		 Show existing Squarespace tags beneath each couple.

		 Venue/location tags remain links so visitors can
		 continue browsing those archive pages directly.
		 ===================================================== */

	function buildMetadata(
		film
	) {

		const tags =
			Array.isArray(film.tags)
				? film.tags.filter(shouldDisplayFilmTag)
				: [];


		const metadata =
			document.createElement(
				'div'
			);


		metadata.className =
			'mtf-related-film__meta';


		const seen =
			new Set();


		tags.forEach(
			function (
				tag,
				index
			) {

				const text =
					String(
						tag || ''
					)
						.trim();


				const key =
					normalizeTagKey(
						text
					);


				if (
					!text ||
					!key ||
					seen.has(
						key
					)
				) {
					return;
				}


				seen.add(
					key
				);


				if (
					metadata.children.length
				) {

					const separator =
						document.createElement(
							'span'
						);


					separator.className =
						'mtf-related-film__meta-separator';


					separator.textContent =
						' · ';


					separator.setAttribute(
						'aria-hidden',
						'true'
					);


					metadata.appendChild(
						separator
					);

				}


				const link =
					document.createElement(
						'a'
					);


				link.className =
					'mtf-related-film__meta-link';


				link.href =
					createTagURL(
						text
					);


				link.textContent =
					text;


				metadata.appendChild(
					link
				);

			}
		);


		return metadata;

	}


	/* =====================================================
		 CARD CREATION
		 ===================================================== */

	function createCard(
		film,
		position
	) {

		const article =
			document.createElement(
				'article'
			);


		article.className =
			'mtf-related-film';


		article.classList.add(
			position === 1
				? 'mtf-related-film--right'
				: 'mtf-related-film--left'
		);


		const filmURL =
			normalizePath(
				film.url
			);


		/*
		 * IMAGE LINK
		 */

		const mediaLink =
			document.createElement(
				'a'
			);


		mediaLink.className =
			'mtf-related-film__media';


		mediaLink.href =
			filmURL;


		mediaLink.setAttribute(
			'aria-label',
			'View ' +
			film.title +
			' wedding film'
		);


		const imageFrame =
			document.createElement(
				'div'
			);


		imageFrame.className =
			'mtf-related-film__image-frame';


		const image =
			document.createElement(
				'img'
			);


		image.className =
			'mtf-related-film__image';


		image.alt =
			film.title +
			' wedding film';


		image.decoding =
			'async';


		/*
		 * Start downloading as soon as the related-film
		 * component initializes rather than waiting for
		 * scroll position.
		 */

		image.loading =
			'eager';


		image.setAttribute(
			'fetchpriority',
			'low'
		);


		image.hidden =
			true;


		const placeholder =
			document.createElement(
				'div'
			);


		placeholder.className =
			'mtf-related-film__image-placeholder';


		placeholder.setAttribute(
			'aria-hidden',
			'true'
		);


		imageFrame.appendChild(
			image
		);


		imageFrame.appendChild(
			placeholder
		);


		mediaLink.appendChild(
			imageFrame
		);


		article.appendChild(
			mediaLink
		);


		/*
		 * TEXT
		 */

		const body =
			document.createElement(
				'div'
			);


		body.className =
			'mtf-related-film__body';


		const title =
			document.createElement(
				'h3'
			);


		title.className =
			'mtf-related-film__title';


		const titleLink =
			document.createElement(
				'a'
			);


		titleLink.href =
			filmURL;


		titleLink.textContent =
			film.title;


		title.appendChild(
			titleLink
		);


		body.appendChild(
			title
		);


		const metadata =
			buildMetadata(
				film
			);


		if (
			metadata.children.length
		) {

			body.appendChild(
				metadata
			);

		}


		const watchLink =
			document.createElement(
				'a'
			);


		watchLink.className =
			'mtf-related-film__watch';


		watchLink.href =
			filmURL;


		const watchText =
			document.createElement(
				'span'
			);


		watchText.className =
			'mtf-related-film__watch-label';

		watchText.textContent =
			'View Wedding Film';


		const arrow =
			document.createElement(
				'span'
			);


		arrow.className =
			'mtf-related-film__watch-arrow';


		arrow.setAttribute(
			'aria-hidden',
			'true'
		);


		arrow.textContent =
			'→';


		watchLink.appendChild(
			watchText
		);


		watchLink.appendChild(
			arrow
		);


		body.appendChild(
			watchLink
		);


		article.appendChild(
			body
		);


		/*
		 * Begin image retrieval immediately.
		 */

		fetchFilmImage(
			filmURL
		)
			.then(
				function (
					imageURL
				) {

					if (!imageURL) {

						imageFrame.classList.add(
							'mtf-related-film__image-frame--empty'
						);

						return;

					}


					image.addEventListener(
						'load',
						function () {

							image.hidden =
								false;


							placeholder.hidden =
								true;


							imageFrame.classList.add(
								'mtf-related-film__image-frame--loaded'
							);

						},
						{
							once:
								true
						}
					);


					image.src =
						imageURL;

				}
			);


		return article;

	}


	/* =====================================================
		 SECTION CREATION
		 ===================================================== */

	function createSection(
		recommendations
	) {

		const config =
			MTF.filmRelatedConfig || {};


		const section =
			document.createElement(
				'section'
			);


		section.className =
			'mtf-related-films mtf-section mtf-section--light';


		section.setAttribute(
			'data-mtf-related-films',
			''
		);


		const container =
			document.createElement(
				'div'
			);


		container.className =
			'mtf-section__container mtf-related-films__container';


		/*
		 * HEADING
		 */

		const heading =
			document.createElement(
				'div'
			);


		heading.className =
			'mtf-section__heading mtf-related-films__heading';


		const eyebrow =
			document.createElement(
				'p'
			);


		eyebrow.className =
			'mtf-section__eyebrow';


		eyebrow.textContent =
			config.eyebrow ||
			'CONTINUE EXPLORING';


		heading.appendChild(
			eyebrow
		);


		const title =
			document.createElement(
				'h2'
			);


		title.className =
			'mtf-section__title mtf-section__title--subsection';


		title.textContent =
			recommendations.heading;


		heading.appendChild(
			title
		);


		container.appendChild(
			heading
		);


		/*
		 * TWO-CARD GRID
		 */

		const grid =
			document.createElement(
				'div'
			);


		grid.className =
			'mtf-related-films__grid';


		recommendations.films
			.forEach(
				function (
					film,
					index
				) {

					grid.appendChild(
						createCard(
							film,
							index
						)
					);

				}
			);


		container.appendChild(
			grid
		);


		/*
		 * EXPLORE ALL FILMS
		 */

		const collectionConfig =
			config.collectionLink || {};


		if (
			collectionConfig.label &&
			collectionConfig.url
		) {

			const footer =
				document.createElement(
					'div'
				);


			footer.className =
				'mtf-related-films__footer';


			const collectionLink =
				document.createElement(
					'a'
				);


			collectionLink.className =
				'mtf-related-films__all-link';


			collectionLink.href =
				collectionConfig.url;


			const label =
				document.createElement(
					'span'
				);


			label.className =
				'mtf-related-films__all-label';

			label.textContent =
				collectionConfig.label;


			const arrow =
				document.createElement(
					'span'
				);


			arrow.className =
				'mtf-related-films__all-arrow';


			arrow.setAttribute(
				'aria-hidden',
				'true'
			);


			arrow.textContent =
				'→';


			collectionLink.appendChild(
				label
			);


			collectionLink.appendChild(
				arrow
			);


			footer.appendChild(
				collectionLink
			);


			container.appendChild(
				footer
			);

		}


		section.appendChild(
			container
		);


		return section;

	}


	/* =====================================================
		 INSERTION TARGET

		 Related films belong after film-specific content and
		 before the universal About / testimonials sections.

		 films.js will ultimately control the exact ordering.
		 This module accepts an insertion target so it does not
		 need to know the implementation details of the footer.
		 ===================================================== */

	function insertSection(
		section,
		options
	) {

		options =
			options || {};


		if (
			options.before &&
			options.before.parentNode
		) {

			options.before.parentNode
				.insertBefore(
					section,
					options.before
				);


			return true;

		}


		if (
			options.after &&
			options.after.parentNode
		) {

			options.after.parentNode
				.insertBefore(
					section,
					options.after.nextSibling
				);


			return true;

		}


		/*
		 * Safe fallback:
		 * place it immediately before the true
		 * Squarespace footer if no explicit target
		 * was supplied.
		 */

		const footer =
			document.querySelector(
				'footer'
			);


		if (
			footer &&
			footer.parentNode
		) {

			footer.parentNode
				.insertBefore(
					section,
					footer
				);


			return true;

		}


		return false;

	}


	/* =====================================================
		 INITIALIZE
		 ===================================================== */

	function init(
		options
	) {

		if (
			!isIndividualFilmPage()
		) {
			return null;
		}


		if (
			document.querySelector(
				'[data-mtf-related-films]'
			)
		) {

			return document.querySelector(
				'[data-mtf-related-films]'
			);

		}


		if (
			!MTF.filmRelated ||
			typeof MTF.filmRelated.getRecommendations !==
				'function'
		) {

			return null;

		}


		const recommendations =
			MTF.filmRelated
				.getRecommendations();


		if (
			!recommendations ||
			!Array.isArray(
				recommendations.films
			) ||
			!recommendations.films.length
		) {

			return null;

		}


		const section =
			createSection(
				recommendations
			);


		const inserted =
			insertSection(
				section,
				options
			);


		if (!inserted) {

			console.warn(
				'Mark Thomas Films: unable to insert related films section.'
			);


			return null;

		}


		return section;

	}


	MTF.filmRelatedUI = {

		init:
			init,

		fetchFilmImage:
			fetchFilmImage

	};


})();