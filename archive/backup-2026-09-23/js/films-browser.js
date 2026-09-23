(function () {
	'use strict';

	window.MTF = window.MTF || {};

	function normalizeKey(value) {
		return value
			? value.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ')
			: '';
	}

	function findTagClouds() {
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

	function findTagCloud() {
		const blocks =
			findTagClouds();

		return blocks.length
			? blocks[0]
			: null;
	}

	function removeTagClouds(filmGrid) {

		findTagClouds()
			.forEach(function (block) {

				const section =
					block.closest(
						'section'
					);

				if (
					section &&
					filmGrid &&
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

	function collectTags(
		block,
		currentKey
	) {

		const items =
			[];

		block
			.querySelectorAll(
				'a[href*="/films/tag/"]'
			)
			.forEach(function (link) {

				const name =
					link.textContent
						.trim();

				const href =
					link.href;

				const key =
					normalizeKey(
						name
					);

				if (
					!name ||
					!href ||
					!key ||
					key === 'tx'
				) {
					return;
				}

				const exists =
					items.some(function (item) {

						return (
							item.key === key
						);

					});

				if (exists) {
					return;
				}

				items.push({
					name: name,
					href: href,
					key: key,
					isCurrent:
						Boolean(
							currentKey &&
							key === currentKey
						)
				});

			});

		return items;
	}

	function sortTags(items) {

		items.sort(function (a, b) {

			return a.name.localeCompare(
				b.name,
				'en',
				{
					sensitivity:
						'base'
				}
			);

		});
	}

	function setupSearch(
		dropdown,
		searchInput,
		noResults
	) {

		const items =
			dropdown.querySelectorAll(
				'.mtf-link-list > a, ' +
				'.mtf-link-list > .mtf-current-item'
			);

		searchInput.addEventListener(
			'input',
			function () {

				const searchTerm =
					normalizeKey(
						this.value
					);

				let visibleCount =
					0;

				items.forEach(function (item) {

					const itemName =
						item.dataset.mtfSearchName ||
						normalizeKey(
							item.textContent
						);

					const visible =
						itemName.includes(
							searchTerm
						);

					item.hidden =
						!visible;

					if (visible) {
						visibleCount += 1;
					}

				});

				noResults.hidden =
					visibleCount !== 0;

			}
		);

		dropdown.addEventListener(
			'toggle',
			function () {

				if (dropdown.open) {
					return;
				}

				searchInput.value =
					'';

				items.forEach(function (item) {

					item.hidden =
						false;

				});

				noResults.hidden =
					true;

			}
		);
	}

	function createDropdown(options) {

		const dropdown =
			document.createElement(
				'details'
			);

		dropdown.className =
			'mtf-dropdown mtf-' +
			options.type +
			'-dropdown';

		const summary =
			document.createElement(
				'summary'
			);

		const summaryLabel =
			document.createElement(
				'span'
			);

		summaryLabel.textContent =
			options.label;

		const chevron =
			document.createElement(
				'span'
			);

		chevron.className =
			'mtf-chevron';

		chevron.setAttribute(
			'aria-hidden',
			'true'
		);

		summary.appendChild(
			summaryLabel
		);

		summary.appendChild(
			chevron
		);

		const panel =
			document.createElement(
				'div'
			);

		panel.className =
			'mtf-dropdown-panel';

		const searchWrap =
			document.createElement(
				'div'
			);

		searchWrap.className =
			'mtf-search-wrap';

		const search =
			document.createElement(
				'input'
			);

		search.type =
			'search';

		search.className =
			'mtf-search';

		search.placeholder =
			options.searchPlaceholder;

		search.autocomplete =
			'off';

		search.setAttribute(
			'aria-label',
			options.searchLabel
		);

		searchWrap.appendChild(
			search
		);

		const list =
			document.createElement(
				'div'
			);

		list.className =
			'mtf-link-list';

		options.items.forEach(function (item) {

			if (item.isCurrent) {

				const currentItem =
					document.createElement(
						'div'
					);

				currentItem.className =
					'mtf-current-item';

				currentItem.dataset.mtfSearchName =
					normalizeKey(
						item.name
					);

				currentItem.setAttribute(
					'aria-current',
					'page'
				);

				const currentName =
					document.createElement(
						'span'
					);

				currentName.className =
					'mtf-current-item-name';

				currentName.textContent =
					item.name;

				const currentLabel =
					document.createElement(
						'span'
					);

				currentLabel.className =
					'mtf-current-label';

				currentLabel.textContent =
					'Current';

				currentItem.appendChild(
					currentName
				);

				currentItem.appendChild(
					currentLabel
				);

				list.appendChild(
					currentItem
				);

				return;
			}

			const link =
				document.createElement(
					'a'
				);

			link.href =
				item.href;

			link.textContent =
				item.name;

			link.dataset.mtfSearchName =
				normalizeKey(
					item.name
				);

			list.appendChild(
				link
			);

		});

		const noResults =
			document.createElement(
				'div'
			);

		noResults.className =
			'mtf-no-results';

		noResults.textContent =
			options.noResultsText;

		noResults.hidden =
			true;

		panel.appendChild(
			searchWrap
		);

		panel.appendChild(
			list
		);

		panel.appendChild(
			noResults
		);

		dropdown.appendChild(
			summary
		);

		dropdown.appendChild(
			panel
		);

		setupSearch(
			dropdown,
			search,
			noResults
		);

		return dropdown;
	}

	function setupDropdownBehavior(browser) {

		const dropdowns =
			browser.querySelectorAll(
				'.mtf-dropdown'
			);

		dropdowns.forEach(function (dropdown) {

			dropdown.addEventListener(
				'toggle',
				function () {

					if (!dropdown.open) {
						return;
					}

					dropdowns.forEach(function (other) {

						if (other !== dropdown) {
							other.open =
								false;
						}

					});

				}
			);

		});

		document.addEventListener(
			'click',
			function (event) {

				if (
					browser.contains(
						event.target
					)
				) {
					return;
				}

				dropdowns.forEach(function (dropdown) {

					dropdown.open =
						false;

				});

			}
		);

		document.addEventListener(
			'keydown',
			function (event) {

				if (
					event.key !==
					'Escape'
				) {
					return;
				}

				dropdowns.forEach(function (dropdown) {

					dropdown.open =
						false;

				});

			}
		);
	}

	function createBrowser(currentTagName) {

		if (
			!(
				window.MTF.filmCities
				instanceof Set
			)
		) {

			console.error(
				'Mark Thomas Films: film city list is unavailable.'
			);

			return null;
		}

		const tagCloudBlock =
			findTagCloud();

		if (!tagCloudBlock) {
			return null;
		}

		const currentKey =
			normalizeKey(
				currentTagName
			);

		const tags =
			collectTags(
				tagCloudBlock,
				currentKey
			);

		if (!tags.length) {
			return null;
		}

		const cities =
			[];

		const venues =
			[];

		tags.forEach(function (tag) {

			if (
				window.MTF.filmCities.has(
					tag.key
				)
			) {

				cities.push(
					tag
				);

			}

			else {

				venues.push(
					tag
				);

			}

		});

		sortTags(
			cities
		);

		sortTags(
			venues
		);

		const browser =
			document.createElement(
				'div'
			);

		browser.className =
			'mtf-film-browser';

		browser.setAttribute(
			'aria-label',
			'Browse wedding films'
		);

		browser.appendChild(
			createDropdown({
				type: 'venue',
				label: 'Browse by Venue',
				searchPlaceholder:
					'Search venues...',
				searchLabel:
					'Search venues',
				noResultsText:
					'No matching venues.',
				items: venues
			})
		);

		browser.appendChild(
			createDropdown({
				type: 'city',
				label: 'Browse by City',
				searchPlaceholder:
					'Search cities...',
				searchLabel:
					'Search cities',
				noResultsText:
					'No matching cities.',
				items: cities
			})
		);

		setupDropdownBehavior(
			browser
		);

		return browser;
	}

	function buildMain(filmGrid) {

		if (
			!filmGrid ||
			document.querySelector(
				'.mtf-films-intro-explorer'
			)
		) {
			return;
		}

		const browser =
			createBrowser();

		if (!browser) {
			return;
		}

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

		const title =
			document.createElement(
				'h2'
			);

		title.className =
			'mtf-film-explorer-title';

		title.textContent =
			'Explore Wedding Films';

		const copy =
			document.createElement(
				'p'
			);

		copy.className =
			'mtf-film-explorer-copy';

		copy.textContent =
			'Browse by venue and location.';

		explorer.appendChild(
			title
		);

		explorer.appendChild(
			copy
		);

		explorer.appendChild(
			browser
		);

		wrapper.appendChild(
			explorer
		);

		removeTagClouds(
			filmGrid
		);

		filmGrid.parentNode.insertBefore(
			wrapper,
			filmGrid
		);
	}

	function createArchive(
		filmGrid,
		currentTagName
	) {

		const browser =
			createBrowser(
				currentTagName
			);

		if (!browser) {
			return null;
		}

		browser.classList.add(
			'mtf-film-browser--archive'
		);

		removeTagClouds(
			filmGrid
		);

		return browser;
	}

	window.MTF.filmBrowser = {
		buildMain:
			buildMain,
		createArchive:
			createArchive,
		removeTagClouds:
			removeTagClouds
	};

})();