/* ==================================================
	 MARK THOMAS FILMS
	 CLOUDFLARE ASSET LOADER
	 ================================================== */

(function () {

	'use strict';


	const baseURL =
		'https://markthomasfilms.mark-a7f.workers.dev';


	const cssFile =
		'dist/markthomasfilms.css';


	const jsFiles = [
		'js/films-tag-context.js',
		'js/films.js',
		'js/form.js',
		'js/site.js'
	];


	/* ==================================================
		 LOAD CSS
		 ================================================== */

	function loadCSS() {

		const link =
			document.createElement('link');


		link.rel =
			'stylesheet';


		link.href =
			baseURL +
			'/' +
			cssFile;


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
					baseURL +
					'/' +
					filename;


				/*
				 * Download files concurrently while
				 * preserving execution order.
				 */

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