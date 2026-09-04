/* ==================================================
	 MARK THOMAS FILMS
	 ASSET LOADER
	 ================================================== */

(function () {

	'use strict';


	/* ==================================================
		 CONFIGURATION
		 ================================================== */

	const cdnBase =
		'https://cdn.jsdelivr.net/gh/kurtiskronk/markthomasfilms@main';


	/*
	 * JAVASCRIPT MANIFEST
	 *
	 * Only files explicitly listed here will execute.
	 * Order matters.
	 */

	const jsFiles = [
		'films.js',
		'form.js',
		'site.js'
	];


	/* ==================================================
		 LOAD COMBINED CSS
		 ================================================== */

	function loadCSS() {

		const link =
			document.createElement('link');


		link.rel =
			'stylesheet';


		link.href =
			cdnBase +
			'/dist/markthomasfilms.css';


		link.setAttribute(
			'data-mtf-asset',
			'stylesheet'
		);


		document.head.appendChild(
			link
		);

	}


	/* ==================================================
		 LOAD JAVASCRIPT SEQUENTIALLY
		 ================================================== */

	function loadScript(index) {

		if (index >= jsFiles.length) {

			console.info(
				'Mark Thomas Films: assets loaded.'
			);

			return;

		}


		const filename =
			jsFiles[index];


		const script =
			document.createElement('script');


		script.src =
			cdnBase +
			'/js/' +
			filename;


		script.setAttribute(
			'data-mtf-asset',
			filename
		);


		/*
		 * Load the next file only after this one
		 * has successfully executed.
		 */

		script.onload =
			function () {

				loadScript(
					index + 1
				);

			};


		script.onerror =
			function () {

				console.error(
					'Mark Thomas Films: failed to load JS:',
					filename
				);


				/*
				 * Continue loading remaining scripts even
				 * if one file fails.
				 */

				loadScript(
					index + 1
				);

			};


		document.head.appendChild(
			script
		);

	}


	/* ==================================================
		 INITIALIZE
		 ================================================== */

	loadCSS();

	loadScript(0);

})();