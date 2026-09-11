(function () {
	'use strict';

	window.MTF = window.MTF || {};

	function normalizeContextKey(value) {
		return value
			? value.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ')
			: '';
	}

	function getCurrentArchive() {
		const match = window.location.pathname.match(
			/\/films\/(tag|category)\/([^/]+)\/?$/i
		);

		if (!match) return null;

		let name = match[2].replace(/\+/g, ' ');

		try {
			name = decodeURIComponent(name);
		}
		catch (error) {
			/* Keep the readable URL value if decoding fails. */
		}

		return {
			type: match[1].toLowerCase(),
			name: name
		};
	}

	function getArchiveContext(archive) {
		if (!archive) return null;

		let source = null;

		if (
			archive.type === 'tag' &&
			window.MTF.filmTagContext
		) {
			source =
				window.MTF.filmTagContext;
		}
		else if (
			archive.type === 'category' &&
			window.MTF.filmCategoryContext
		) {
			source =
				window.MTF.filmCategoryContext;
		}

		if (!source) return null;

		const key =
			normalizeContextKey(
				archive.name
			);

		if (source[key]) {
			return source[key];
		}

		const matchingKey =
			Object.keys(source)
				.find(function (sourceKey) {

					return (
						normalizeContextKey(
							sourceKey
						) === key
					);

				});

		return matchingKey
			? source[matchingKey]
			: null;
	}

	function addArchiveContext(
		archive,
		filmGrid
	) {
		if (
			!filmGrid ||
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

		if (
			window.MTF.filmBrowser &&
			typeof window.MTF.filmBrowser.createArchive ===
				'function'
		) {

			const browser =
				window.MTF.filmBrowser.createArchive(
					filmGrid,
					archive.type === 'tag'
						? archive.name
						: null
				);

			if (browser) {
				context.appendChild(
					browser
				);
			}

		}

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
						typeof text !== 'string' ||
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

	function initFilms() {

		/*
		 * films.js loads site-wide but should
		 * only operate inside /films.
		 */

		if (
			!/^\/films(?:\/|$)/i.test(
				window.location.pathname
			)
		) {
			return;
		}

		const filmGrid =
			document.querySelector(
				'.blog-basic-grid.collection-content-wrapper'
			);

		const filmCards =
			document.querySelectorAll(
				'.blog-basic-grid article.blog-item'
			);

		/*
		 * Testimonials also belong on individual
		 * film pages, which do not have the grid.
		 */

		if (
			window.MTF.filmTestimonialsUI &&
			typeof window.MTF.filmTestimonialsUI.init ===
				'function'
		) {

			window.MTF.filmTestimonialsUI.init({
				filmGrid: filmGrid
			});

		}

		if (
			!filmGrid ||
			!filmCards.length
		) {
			return;
		}

		const archive =
			getCurrentArchive();

		if (archive) {

			addArchiveContext(
				archive,
				filmGrid
			);

		}

		else if (
			window.MTF.filmBrowser &&
			typeof window.MTF.filmBrowser.buildMain ===
				'function'
		) {

			window.MTF.filmBrowser.buildMain(
				filmGrid
			);

		}

		if (
			window.MTF.filmCards &&
			typeof window.MTF.filmCards.process ===
				'function'
		) {

			filmCards.forEach(function (post) {

				window.MTF.filmCards.process(
					post
				);

			});

		}
	}

	if (
		document.readyState ===
			'loading'
	) {

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