/* =========================================================
	 MARK THOMAS FILMS — LEGACY TAG CLOUD EXPLORER

	 Archived September 2026 before replacement with the
	 dynamic Venue / City film browser.

	 Reference only. This file should NOT be loaded by loader.js.

	 Extracted from the production js/films.js implementation.
	 It preserves the former tag-cloud discovery, display,
	 frequency sizing, TX removal, and explorer construction.

	 NOTE:
	 This code originally lived inside initFilms(), where
	 filmGrid was available in the surrounding scope.
	 ========================================================= */


/* =========================================================
	 TAG CLOUD SIZE SETTINGS

	 SMALL:  3 or fewer posts
	 MEDIUM: 4–6 posts
	 LARGE:  7+ posts
	 ========================================================= */

const TAG_CLOUD_SIZES = {

	small: {
		maxPosts: 3,
		fontSize: 14
	},

	medium: {
		minPosts: 4,
		maxPosts: 6,
		fontSize: 16
	},

	large: {
		minPosts: 7,
		fontSize: 18
	}

};


/* =========================================================
	 FIND ALL FILMS TAG CLOUDS
	 ========================================================= */

function findFilmsTagClouds() {

	return Array
		.from(
			document.querySelectorAll(
				'.sqs-block-tagcloud'
			)
		)
		.filter(function (block) {

			return Boolean(
				block.querySelector(
					'a[href*="/films/tag/"]'
				)
			);

		});

}


/* =========================================================
	 REMOVE TAG CLOUDS FROM FILTERED ARCHIVES
	 ========================================================= */

function removeFilmsTagClouds() {

	const blocks =
		findFilmsTagClouds();


	blocks.forEach(function (block) {

		const section =
			block.closest(
				'section'
			);


		/*
		 * If this is a dedicated Tag Cloud
		 * section, remove the entire section so
		 * Fluid Engine spacing disappears too.
		 */

		if (
			section &&
			!section.contains(
				filmGrid
			)
		) {

			section.remove();

		}

		else {

			block.remove();

		}

	});

}


/* =========================================================
	 FIND MAIN FILMS TAG CLOUD
	 ========================================================= */

function findFilmsTagCloud() {

	const blocks =
		findFilmsTagClouds();


	return blocks.length
		? blocks[0]
		: null;

}


/* =========================================================
	 MAIN FILMS EXPLORER
	 ========================================================= */

function buildFilmsExplorer() {

	if (
		document.querySelector(
			'.mtf-films-intro-explorer'
		)
	) {
		return;
	}


	const tagCloudBlock =
		findFilmsTagCloud();


	if (!tagCloudBlock) {
		return;
	}


	const originalSection =
		tagCloudBlock.closest(
			'section'
		);


	const wrapper =
		document.createElement(
			'section'
		);


	wrapper.className =
		'mtf-films-intro-explorer';


	const explorer =
		document.createElement(
			'div'
		);


	explorer.className =
		'mtf-film-explorer';


	const explorerTitle =
		document.createElement(
			'h2'
		);


	explorerTitle.className =
		'mtf-film-explorer-title';


	explorerTitle.textContent =
		'Explore Wedding Films';


	const explorerCopy =
		document.createElement(
			'p'
		);


	explorerCopy.className =
		'mtf-film-explorer-copy';


	explorerCopy.textContent =
		'Browse by venue and location.';


	explorer.appendChild(
		explorerTitle
	);


	explorer.appendChild(
		explorerCopy
	);


	tagCloudBlock.classList.add(
		'mtf-film-tag-cloud-block'
	);


	explorer.appendChild(
		tagCloudBlock
	);


	wrapper.appendChild(
		explorer
	);


	scaleTagCloud(
		tagCloudBlock
	);


	if (
		originalSection &&
		!originalSection.contains(
			filmGrid
		)
	) {

		originalSection.remove();

	}


	filmGrid.parentNode.insertBefore(
		wrapper,
		filmGrid
	);

}


/* =========================================================
	 COMPACT + SCALE TAG CLOUD
	 ========================================================= */

function scaleTagCloud(block) {

	let entries =
		Array.from(
			block.querySelectorAll(
				'li'
			)
		)
		.map(function (item) {

			const link =
				item.querySelector(
					'a[href*="/films/tag/"]'
				);


			if (!link) {
				return null;
			}


			const name =
				link.textContent
					.trim();


			/*
			 * Squarespace stores the number
			 * of posts using this format:
			 *
			 * title="Kendall Point - 8"
			 *
			 * The title normally lives on the
			 * LI element, but we check the link
			 * as a fallback too.
			 */

			const title =
				item.getAttribute(
					'title'
				) ||
				link.getAttribute(
					'title'
				) ||
				'';


			const countMatch =
				title.match(
					/-\s*(\d+)\s*$/
				);


			const postCount =
				countMatch
					? parseInt(
						countMatch[1],
						10
					)
					: 1;


			return {
				item: item,
				link: link,
				name: name,
				postCount: postCount
			};

		})
		.filter(Boolean);


	/* ==============================================
		 REMOVE TX COMPLETELY
		 ============================================== */

	entries =
		entries.filter(function (entry) {

			if (
				entry.name
					.toLowerCase() !==
				'tx'
			) {
				return true;
			}


			entry.item.remove();


			return false;

		});


	if (!entries.length) {
		return;
	}


	/* ==============================================
		 APPLY SMALL / MEDIUM / LARGE SIZES
		 ============================================== */

	entries.forEach(function (entry) {

		let sizeName =
			'small';


		let fontSize =
			TAG_CLOUD_SIZES
				.small
				.fontSize;


		/*
		 * LARGE
		 * 7+ posts
		 */

		if (
			entry.postCount >=
			TAG_CLOUD_SIZES
				.large
				.minPosts
		) {

			sizeName =
				'large';


			fontSize =
				TAG_CLOUD_SIZES
					.large
					.fontSize;

		}


		/*
		 * MEDIUM
		 * 4–6 posts
		 */

		else if (
			entry.postCount >=
				TAG_CLOUD_SIZES
					.medium
					.minPosts &&
			entry.postCount <=
				TAG_CLOUD_SIZES
					.medium
					.maxPosts
		) {

			sizeName =
				'medium';


			fontSize =
				TAG_CLOUD_SIZES
					.medium
					.fontSize;

		}


		/*
		 * SMALL
		 * 1–3 posts
		 *
		 * Small is already the default,
		 * so nothing else is required.
		 */


		/*
		 * Normalize Squarespace's own LI sizing
		 * so it cannot interfere with our sizes.
		 */

		entry.item.style.fontSize =
			'1rem';


		entry.item.style.lineHeight =
			'1';


		entry.item.style.margin =
			'0';


		entry.item.style.padding =
			'0';


		/*
		 * Apply our explicit final font size
		 * directly to the link.
		 */

		entry.link.style.fontSize =
			fontSize +
			'px';


		entry.link.style.lineHeight =
			'1.1';


		/*
		 * Debugging information.
		 *
		 * Inspecting a tag in DevTools will show:
		 *
		 * data-mtf-post-count="8"
		 * data-mtf-tag-size="large"
		 */

		entry.item.dataset.mtfPostCount =
			String(
				entry.postCount
			);


		entry.link.dataset.mtfTagSize =
			sizeName;

	});

}