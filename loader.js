
/* ==================================================
	 MARK THOMAS FILMS
	 CLOUDFLARE ASSET LOADER

	 CSS is loaded directly by Squarespace's header.
	 This loader manages JavaScript only.
	 ================================================== */

(function () {
	'use strict';

	const baseURL =
		'https://markthomasfilms.mark-a7f.workers.dev';

	const assetVersion =
		'2026-09-25-blog-retired-r1';

	const jsFiles = [
		'js/films-tag-context.js',
		'js/films-cities-list.js',
		'js/films-testimonials.js',
		'js/films-footer-shared.js',

		/* Related-film data and settings */
		'js/films-related-index.js',
		'js/films-related-config.js',

		/* Existing archive and shared UI */
		'js/films-browser.js',
		'js/films-cards.js',
		'js/films-testimonials-ui.js',
		'js/films-header.js',
		'js/filmes-detail-header.js',
		'js/films-detail-header.js',
		'js/films-footer.js',

		/* Recommendation engine and UI */
		'js/films-related.js',
		'js/films-related-ui.js',

		/* Controllers and site modules */
		'js/films.js',
		'js/films-archive-pagination.js',
		'js/forms.js',
		'js/site.js'
	];

	function assetURL(filename) {
		return (
			baseURL +
			'/' +
			filename +
			'?v=' +
			encodeURIComponent(assetVersion)
		);
	}

	function loadScripts() {
		let completed = 0;

		function assetFinished() {
			completed += 1;

			if (completed === jsFiles.length) {
				console.info(
					'Mark Thomas Films: Cloudflare assets loaded.'
				);
			}
		}

		jsFiles.forEach(function (filename) {
			const script =
				document.createElement('script');

			script.src = assetURL(filename);

			/* Preserve module execution order. */
			script.async = false;

			script.setAttribute(
				'data-mtf-asset',
				filename
			);

			script.onload = assetFinished;

			script.onerror = function () {
				console.error(
					'Mark Thomas Films: failed to load',
					filename
				);

				assetFinished();
			};

			document.head.appendChild(script);
		});
	}

	loadScripts();

})();
