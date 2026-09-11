/* ==================================================
	 MARK THOMAS FILMS
	 CLOUDFLARE ASSET LOADER
	 ================================================== */

(function () {

	'use strict';


	const baseURL =
		'https://markthomasfilms.mark-a7f.workers.dev';


	/*
	 * Change this value whenever deployed assets change.
	 * This prevents the browser or CDN from reusing an
	 * older copy of a file at the same URL.
	 */

	const assetVersion =
		'2026-09-11-r2';


	const cssFile =
		'dist/markthomasfilms.css';


	const jsFiles = [
		'js/films-tag-context.js',
		'js/films-cities-list.js',
		'js/films-testimonials.js',
		'js/films-browser.js',
		'js/films-cards.js',
		'js/films-testimonials-ui.js',
		'js/films.js',
		'js/forms.js',
		'js/site.js'
	];


	function assetURL(filename) {

		return (
			baseURL +
			'/' +
			filename +
			'?v=' +
			encodeURIComponent(
				assetVersion
			)
		);

	}


	/* ==================================================
		 LOAD CSS
		 ================================================== */

	function loadCSS() {

		const link =
			document.createElement(
				'link'
			);


		link.rel =
			'stylesheet';


		link.href =
			assetURL(
				cssFile
			);


		link.setAttribute(
			'data-mtf-asset',
			'stylesheet'
		);


		document.head.appendChild(
			link
		);

	}


	/* ==================================================
		 LOAD JAVASCRIPT
		 ================================================== */

	function loadScripts() {

		let completed =
			0;


		function assetFinished() {

			completed += 1;


			if (completed === jsFiles.length) {

				console.info(
					'Mark Thomas Films: Cloudflare assets loaded.'
				);

			}

		}


		jsFiles.forEach(
			function (filename) {

				const script =
					document.createElement(
						'script'
					);


				script.src =
					assetURL(
						filename
					);


				script.async =
					false;


				script.setAttribute(
					'data-mtf-asset',
					filename
				);


				script.onload =
					assetFinished;


				script.onerror =
					function () {

						console.error(
							'Mark Thomas Films: failed to load',
							filename
						);


						assetFinished();

					};


				document.head.appendChild(
					script
				);

			}
		);

	}


	/* ==================================================
		 INITIALIZE
		 ================================================== */

	loadCSS();

	loadScripts();

})();