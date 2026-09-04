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


			/*
			 * If GitHub is temporarily unavailable,
			 * use the last commit this browser successfully
			 * resolved rather than breaking the site.
			 */

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


		const link =
			document.createElement(
				'link'
			);


		link.rel =
			'stylesheet';


		link.href =
			cdnBase +
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
		 LOAD JS SEQUENTIALLY
		 ================================================== */

	function loadScripts(
		cdnBase,
		files,
		index
	) {

		if (index >= files.length) {

			console.info(
				'Mark Thomas Films: assets loaded.'
			);


			return;

		}


		const filename =
			files[index];


		const script =
			document.createElement(
				'script'
			);


		script.src =
			cdnBase +
			'/' +
			filename;


		script.setAttribute(
			'data-mtf-asset',
			filename
		);


		script.onload =
			function () {

				loadScripts(
					cdnBase,
					files,
					index + 1
				);

			};


		script.onerror =
			function () {

				console.error(
					'Mark Thomas Films: failed to load',
					filename
				);


				loadScripts(
					cdnBase,
					files,
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


			loadCSS(
				cdnBase,
				manifest.css
			);


			loadScripts(
				cdnBase,
				Array.isArray(manifest.js)
					? manifest.js
					: [],
				0
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