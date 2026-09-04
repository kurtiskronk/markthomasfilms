/* ==================================================
	 MARK THOMAS FILMS
	 ASSET LOADER
	 ================================================== */

(function () {

	'use strict';


	/* ==================================================
		 REPOSITORY
		 ================================================== */

	const repository =
		'kurtiskronk/markthomasfilms';


	/* ==================================================
		 DETECT LOADER VERSION
		 ================================================== */

	/*
	 * Example loader URL:
	 *
	 * https://cdn.jsdelivr.net/gh/kurtiskronk/
	 * markthomasfilms@COMMIT_SHA/loader.js
	 *
	 * Whatever appears after the @ becomes the version
	 * used for every CSS and JS asset.
	 */

	const loaderScript =
		document.currentScript;


	let repositoryVersion =
		'main';


	if (
		loaderScript &&
		loaderScript.src
	) {

		const match =
			loaderScript.src.match(
				/markthomasfilms@([^/]+)\//
			);


		if (match) {

			repositoryVersion =
				match[1];

		}

	}


	const cdnBase =
		'https://cdn.jsdelivr.net/gh/' +
		repository +
		'@' +
		repositoryVersion;


	console.info(
		'Mark Thomas Films: loading repository version',
		repositoryVersion
	);


	/* ==================================================
		 JAVASCRIPT MANIFEST
		 ================================================== */

	/*
	 * Only explicitly listed JS files execute.
	 *
	 * Order matters.
	 */

	const jsFiles = [
		'films.js',
		'form.js',
		'site.js'
	];


	/* ==================================================
		 LOAD CSS BUNDLE
		 ================================================== */

	function loadCSS() {

		const link =
			document.createElement(
				'link'
			);


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
			document.createElement(
				'script'
			);


		script.src =
			cdnBase +
			'/js/' +
			filename;


		script.setAttribute(
			'data-mtf-asset',
			filename
		);


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
				 * Continue loading later modules even
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