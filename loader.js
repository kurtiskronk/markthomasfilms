/* ==================================================
	 MARK THOMAS FILMS
	 PERMANENT ASSET BOOTSTRAP
	 ================================================== */

(function () {

	'use strict';


	const owner =
		'kurtiskronk';


	const repository =
		'markthomasfilms';


	const branch =
		'main';


	const apiURL =
		'https://api.github.com/repos/' +
		owner +
		'/' +
		repository +
		'/commits/' +
		branch;


	/* ==================================================
		 GET CURRENT MAIN COMMIT
		 ================================================== */

	async function getCurrentCommit() {

		try {

			const response =
				await fetch(
					apiURL,
					{
						cache: 'no-store',

						headers: {
							'Accept':
								'application/vnd.github+json'
						}
					}
				);


			if (!response.ok) {

				throw new Error(
					'GitHub returned ' +
					response.status
				);

			}


			const data =
				await response.json();


			if (!data.sha) {

				throw new Error(
					'GitHub response contained no commit SHA'
				);

			}


			sessionStorage.setItem(
				'mtf-last-commit',
				data.sha
			);


			return data.sha;

		}

		catch (error) {

			console.warn(
				'Mark Thomas Films: could not resolve latest commit.',
				error
			);


			return sessionStorage.getItem(
				'mtf-last-commit'
			);

		}

	}


	/* ==================================================
		 GET ASSET MANIFEST
		 ================================================== */

	async function getManifest(
		cdnBase
	) {

		const response =
			await fetch(
				cdnBase +
				'/assets.json'
			);


		if (!response.ok) {

			throw new Error(
				'Unable to load assets.json'
			);

		}


		return response.json();

	}


	/* ==================================================
		 LOAD CSS
		 ================================================== */

	function loadCSS(
		cdnBase,
		cssFile
	) {

		if (!cssFile) {
			return;
		}


		const href =
			cdnBase +
			'/' +
			cssFile;


		const link =
			document.createElement(
				'link'
			);


		link.rel =
			'stylesheet';


		link.href =
			href;


		link.setAttribute(
			'data-mtf-asset',
			'stylesheet'
		);


		document.head.appendChild(
			link
		);

	}


	/* ==================================================
		 PRELOAD JS

		 Starts downloading all JavaScript immediately
		 instead of waiting for each previous file to
		 finish first.
		 ================================================== */

	function preloadScripts(
		cdnBase,
		files
	) {

		files.forEach(
			function (filename) {

				const preload =
					document.createElement(
						'link'
					);


				preload.rel =
					'preload';


				preload.as =
					'script';


				preload.href =
					cdnBase +
					'/' +
					filename;


				preload.setAttribute(
					'data-mtf-preload',
					filename
				);


				document.head.appendChild(
					preload
				);

			}
		);

	}


	/* ==================================================
		 LOAD JS IN ORDER / DOWNLOAD IN PARALLEL

		 Dynamic scripts normally behave asynchronously.

		 Setting async = false preserves manifest execution
		 order while allowing the browser to fetch the
		 files concurrently.
		 ================================================== */

	function loadScripts(
		cdnBase,
		files
	) {

		if (!files.length) {

			console.info(
				'Mark Thomas Films: assets loaded.'
			);


			return;

		}


		let completed =
			0;


		function assetFinished() {

			completed += 1;


			if (completed === files.length) {

				console.info(
					'Mark Thomas Films: assets loaded.'
				);

			}

		}


		files.forEach(
			function (filename) {

				const script =
					document.createElement(
						'script'
					);


				script.src =
					cdnBase +
					'/' +
					filename;


				/*
				 * Critical:
				 *
				 * All scripts are appended immediately,
				 * allowing parallel downloads, but
				 * async=false preserves execution order.
				 *
				 * So films-tag-context.js can still
				 * execute before films.js.
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

	async function initialize() {

		const commit =
			await getCurrentCommit();


		if (!commit) {

			console.error(
				'Mark Thomas Films: no repository version available.'
			);


			return;

		}


		console.info(
			'Mark Thomas Films: loading commit',
			commit.substring(0, 7)
		);


		const cdnBase =
			'https://cdn.jsdelivr.net/gh/' +
			owner +
			'/' +
			repository +
			'@' +
			commit;


		try {

			const manifest =
				await getManifest(
					cdnBase
				);


			const jsFiles =
				Array.isArray(
					manifest.js
				)
					? manifest.js
					: [];


			/*
			 * Start CSS immediately.
			 */

			loadCSS(
				cdnBase,
				manifest.css
			);


			/*
			 * Tell the browser about every JS asset
			 * immediately so their downloads can begin
			 * together.
			 */

			preloadScripts(
				cdnBase,
				jsFiles
			);


			/*
			 * Append all scripts immediately.
			 *
			 * async=false preserves the order defined
			 * in assets.json while downloads happen
			 * concurrently.
			 */

			loadScripts(
				cdnBase,
				jsFiles
			);

		}

		catch (error) {

			console.error(
				'Mark Thomas Films: unable to load asset manifest.',
				error
			);

		}

	}


	initialize();

})();