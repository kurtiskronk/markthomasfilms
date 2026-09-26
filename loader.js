
/* =========================================================
	 MARK THOMAS FILMS — CLOUDFLARE JAVASCRIPT LOADER
	 Compiled CSS loads directly from Squarespace's header.
	 Keep the version synchronized with Squarespace's CSS URL.
	 ========================================================= */

(function () {
	'use strict';

	const baseURL =
		'https://markthomasfilms.mark-a7f.workers.dev';

	const assetVersion =
		'2026-09-26-blog-layout-r8';

	const jsFiles = [
		'js/films-tag-context.js',
		'js/films-cities-list.js',
		'js/films-testimonials.js',
		'js/films-footer-shared.js',

		'js/films-related-index.js',
		'js/films-related-config.js',

		'js/films-browser.js',
		'js/films-cards.js',
		'js/films-testimonials-ui.js',
		'js/films-header.js',
		'js/films-detail-header.js',
		'js/films-retired.js',
		'js/films-footer.js',

		'js/films-related.js',
		'js/films-related-ui.js',

		/* Blog components: only act on individual /blog/* posts. */
		'js/blog-detail-header.js',
		'js/blog-related.js',

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

	let completed = 0;

	jsFiles.forEach(function (filename) {
		const script = document.createElement(
			'script'
		);

		script.src = assetURL(filename);
		script.async = false;

		script.setAttribute(
			'data-mtf-asset',
			filename
		);

		function finish() {
			completed += 1;

			if (completed === jsFiles.length) {
				console.info(
					'Mark Thomas Films: Cloudflare assets loaded.'
				);
			}
		}

		script.onload = finish;

		script.onerror = function () {
			console.error(
				'Mark Thomas Films: failed to load',
				filename
			);

			finish();
		};

		document.head.appendChild(script);
	});
})();
