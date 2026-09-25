
/* =========================================================
	 MARK THOMAS FILMS
	 RELATED FILMS — CONTINUOUS CAROUSEL UI
	 ========================================================= */

(function () {
	'use strict';

	window.MTF = window.MTF || {};
	const MTF = window.MTF;
	const imageCache = new Map();

	/* HELPERS */

	function normalizePath(value) {
		if (!value) return '';

		try {
			const url = new URL(value, window.location.origin);
			return url.pathname.replace(/\/+$/, '');
		} catch (error) {
			return '';
		}
	}

	function normalizeImageURL(value) {
		if (!value) return '';

		try {
			const url = new URL(value, window.location.origin);
			if (url.protocol === 'http:') {
				url.protocol = 'https:';
			}
			return url.href;
		} catch (error) {
			return '';
		}
	}

	function normalizeTagKey(value) {
		return String(value || '')
			.normalize('NFKD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[\u2018\u2019]/g, "'")
			.replace(/\s+/g, ' ')
			.trim()
			.toLowerCase();
	}

	function createTagURL(tag) {
		return '/films/tag/' +
			encodeURIComponent(tag).replace(/%20/g, '+');
	}

	function shouldDisplayFilmTag(value) {
		if (typeof MTF.shouldDisplayFilmTag === 'function') {
			return MTF.shouldDisplayFilmTag(value);
		}

		const lettersOnly = String(value || '')
			.trim()
			.replace(/[^A-Za-z]/g, '');

		return !(
			lettersOnly.length >= 3 &&
			lettersOnly === lettersOnly.toUpperCase()
		);
	}

	function isIndividualFilmPage() {
		const path = window.location.pathname.replace(/\/+$/, '');

		return (
			/^\/films\/[^/]+$/i.test(path) &&
			!/^\/films\/(?:tag|category)\//i.test(path)
		);
	}

	/* IMAGE RETRIEVAL */

	function extractImageFromDocument(documentRoot) {
		if (!documentRoot) return '';

		const ogImage = documentRoot.querySelector(
			'meta[property="og:image"]'
		);

		if (ogImage) {
			const url = normalizeImageURL(
				ogImage.getAttribute('content')
			);

			if (url) return url;
		}

		const twitterImage = documentRoot.querySelector(
			'meta[name="twitter:image"]'
		);

		if (twitterImage) {
			const url = normalizeImageURL(
				twitterImage.getAttribute('content')
			);

			if (url) return url;
		}

		const image = documentRoot.querySelector(
			'.blog-item img, .blog-item-wrapper img, article img'
		);

		if (image) {
			const candidates = [
				image.getAttribute('data-src'),
				image.getAttribute('data-image'),
				image.getAttribute('src')
			];

			for (const value of candidates) {
				const candidate = normalizeImageURL(value);
				if (candidate) return candidate;
			}
		}

		return '';
	}

	async function fetchFilmImage(filmURL) {
		const path = normalizePath(filmURL);
		if (!path) return '';

		if (imageCache.has(path)) {
			return imageCache.get(path);
		}

		const promise = (async function () {
			try {
				const response = await fetch(path, {
					credentials: 'same-origin'
				});

				if (!response.ok) {
					throw new Error('HTTP ' + response.status);
				}

				const html = await response.text();

				const pageDocument = new DOMParser().parseFromString(
					html,
					'text/html'
				);

				return extractImageFromDocument(pageDocument);
			} catch (error) {
				console.warn(
					'Mark Thomas Films: unable to retrieve related-film image for',
					path,
					error
				);

				return '';
			}
		})();

		imageCache.set(path, promise);
		return promise;
	}

	/* CARD METADATA */

	function buildMetadata(film) {
		const tags = Array.isArray(film.tags)
			? film.tags.filter(shouldDisplayFilmTag)
			: [];

		const metadata = document.createElement('div');
		metadata.className = 'mtf-related-film__meta';

		const seen = new Set();

		tags.forEach(function (tag) {
			const text = String(tag || '').trim();
			const key = normalizeTagKey(text);

			if (!text || !key || seen.has(key)) {
				return;
			}

			seen.add(key);

			if (metadata.children.length) {
				const separator = document.createElement('span');
				separator.className =
					'mtf-related-film__meta-separator';
				separator.textContent = ' · ';
				separator.setAttribute('aria-hidden', 'true');
				metadata.appendChild(separator);
			}

			const link = document.createElement('a');
			link.className = 'mtf-related-film__meta-link';
			link.href = createTagURL(text);
			link.textContent = text;
			metadata.appendChild(link);
		});

		return metadata;
	}

	/* CARD IMAGES */

	function createImageElements(film, frame) {
		const image = document.createElement('img');

		image.className = 'mtf-related-film__image';
		image.alt = film.title + ' wedding film';
		image.decoding = 'async';
		image.draggable = false;
		image.loading = 'eager';
		image.setAttribute('fetchpriority', 'low');
		image.hidden = true;

		const placeholder = document.createElement('div');
		placeholder.className =
			'mtf-related-film__image-placeholder';
		placeholder.setAttribute('aria-hidden', 'true');

		frame.appendChild(image);
		frame.appendChild(placeholder);

		return { image, placeholder };
	}

	function populateImage(frame, image, placeholder, filmURL) {
		fetchFilmImage(filmURL).then(function (imageURL) {
			if (!imageURL) {
				frame.classList.add(
					'mtf-related-film__image-frame--empty'
				);
				return;
			}

			image.addEventListener('load', function () {
				image.hidden = false;
				placeholder.hidden = true;

				frame.classList.add(
					'mtf-related-film__image-frame--loaded'
				);
			}, { once: true });

			image.src = imageURL;
		});
	}

	/* CARD CREATION */

	function createCard(film) {
		const article = document.createElement('article');
		article.className = 'mtf-related-film';

		const filmURL = normalizePath(film.url);

		const mediaLink = document.createElement('a');
		mediaLink.className = 'mtf-related-film__media';
		mediaLink.href = filmURL;
		mediaLink.draggable = false;
		mediaLink.setAttribute(
			'aria-label',
			'View ' + film.title + ' wedding film'
		);

		const frame = document.createElement('div');
		frame.className = 'mtf-related-film__image-frame';

		const imageElements = createImageElements(film, frame);

		mediaLink.appendChild(frame);
		article.appendChild(mediaLink);

		const body = document.createElement('div');
		body.className = 'mtf-related-film__body';

		const title = document.createElement('h3');
		title.className = 'mtf-related-film__title';

		const titleLink = document.createElement('a');
		titleLink.href = filmURL;
		titleLink.textContent = film.title;

		title.appendChild(titleLink);
		body.appendChild(title);

		const metadata = buildMetadata(film);

		if (metadata.children.length) {
			body.appendChild(metadata);
		}

		article.appendChild(body);

		// Fetch only when the card approaches the viewport.
		article._mtfLoadImage = function () {
			if (article.__mtfImageRequested) return;

			article.__mtfImageRequested = true;

			populateImage(
				frame,
				imageElements.image,
				imageElements.placeholder,
				filmURL
			);
		};

		return article;
	}

	/* NAVIGATION BUTTONS */

	function navButton(direction) {
		const button = document.createElement('button');

		button.type = 'button';
		button.className =
			'mtf-related-films__nav-button ' +
			'mtf-related-films__nav-button--' + direction;

		button.setAttribute(
			'aria-label',
			direction === 'prev'
				? 'Previous related wedding film'
				: 'Next related wedding film'
		);

		button.textContent = direction === 'prev' ? '←' : '→';

		return button;
	}

	/* SECTION CREATION */

	function createSection(recommendations) {
		const config = MTF.filmRelatedConfig || {};
		const films = recommendations.films;

		const section = document.createElement('section');

		section.className =
			'mtf-related-films mtf-section mtf-section--light';

		section.setAttribute('data-mtf-related-films', '');

		if (films.length === 1) {
			section.classList.add('mtf-related-films--single');
		}

		const container = document.createElement('div');

		container.className =
			'mtf-section__container mtf-related-films__container';

		/* HEADING */

		const heading = document.createElement('div');

		heading.className =
			'mtf-section__heading mtf-related-films__heading';

		const eyebrow = document.createElement('p');
		eyebrow.className = 'mtf-section__eyebrow';
		eyebrow.textContent =
			config.eyebrow || 'CONTINUE EXPLORING';

		heading.appendChild(eyebrow);

		const title = document.createElement('h2');

		title.className =
			'mtf-section__title mtf-section__title--subsection';

		title.textContent = recommendations.heading;
		title.id = 'mtf-related-films-title';

		section.setAttribute('aria-labelledby', title.id);
		heading.appendChild(title);

		if (
			recommendations.venueOnly &&
			recommendations.sameVenueCount >= 6
		) {
			const venueCount = document.createElement('p');

			venueCount.className =
				'mtf-related-films__venue-count';

			venueCount.textContent =
				recommendations.sameVenueCount +
				' more wedding films at this venue';

			heading.appendChild(venueCount);
		}

		container.appendChild(heading);

		/* CAROUSEL STRUCTURE */

		const stage = document.createElement('div');
		stage.className = 'mtf-related-films__stage';

		const carousel = document.createElement('div');
		carousel.className = 'mtf-related-films__carousel';

		carousel.setAttribute(
			'aria-roledescription',
			'carousel'
		);

		const viewport = document.createElement('div');
		viewport.className = 'mtf-related-films__viewport';

		viewport.setAttribute(
			'aria-label',
			'Related wedding films'
		);

		const track = document.createElement('div');
		track.className = 'mtf-related-films__track';

		const cards = films.map(createCard);

		cards.forEach(function (card) {
			track.appendChild(card);
		});

		viewport.appendChild(track);

		/* ARROWS */

		const navigation = document.createElement('div');

		navigation.className =
			'mtf-related-films__navigation';

		const prevButton = navButton('prev');
		const nextButton = navButton('next');

		navigation.appendChild(prevButton);
		navigation.appendChild(nextButton);

		carousel.appendChild(viewport);
		carousel.appendChild(navigation);

		stage.appendChild(carousel);
		container.appendChild(stage);

		/* PROGRESS BAR */

		const controls = document.createElement('div');

		controls.className =
			'mtf-related-films__controls';

		const progress = document.createElement('div');

		progress.className =
			'mtf-related-films__progress';

		progress.setAttribute('role', 'slider');
		progress.setAttribute('tabindex', '0');

		progress.setAttribute(
			'aria-label',
			'Browse related wedding films'
		);

		progress.setAttribute('aria-valuemin', '1');

		const progressTrack = document.createElement('div');

		progressTrack.className =
			'mtf-related-films__progress-track';

		const progressFill = document.createElement('div');

		progressFill.className =
			'mtf-related-films__progress-fill';

		progress.appendChild(progressTrack);
		progress.appendChild(progressFill);

		const count = document.createElement('p');

		count.className =
			'mtf-related-films__count';

		controls.appendChild(progress);
		controls.appendChild(count);

		container.appendChild(controls);

		/* EXPLORE ALL FILMS */

		const collection = config.collectionLink || {};

		if (collection.label && collection.url) {
			const footer = document.createElement('div');

			footer.className =
				'mtf-related-films__footer';

			const link = document.createElement('a');

			link.className =
				'mtf-related-films__all-link';

			link.href = collection.url;
			link.textContent = collection.label;

			footer.appendChild(link);
			container.appendChild(footer);
		}

		section.appendChild(container);

		// Geometry must be measured after DOM insertion.
		section._mtfInitCarousel = function () {
			initCarousel({
				section,
				films,
				stage,
				viewport,
				track,
				cards,
				prevButton,
				nextButton,
				progress,
				progressFill,
				count
			});
		};

		return section;
	}

	/* CONTINUOUS CAROUSEL */

	function initCarousel(parts) {
		const {
			section,
			films,
			stage,
			viewport,
			track,
			cards,
			prevButton,
			nextButton,
			progress,
			progressFill,
			count
		} = parts;

		const state = {
			index: 0,
			visible: 2,
			step: 0,
			inset: 0,
			startX: 0,
			startY: 0,
			deltaX: 0,
			pointerId: null,
			isDragging: false,
			suppressClick: false,
			progressPointer: null,
			pendingFrame: null
		};

		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		);

		function visibleCount() {
			return window.matchMedia('(max-width: 767px)').matches
				? 1
				: Math.min(2, films.length);
		}

		function maxIndex() {
			return Math.max(0, films.length - state.visible);
		}

		function clamp(value) {
			return Math.max(0, Math.min(maxIndex(), value));
		}

		function rangeText() {
			const from = state.index + 1;

			const to = Math.min(
				films.length,
				from + state.visible - 1
			);

			return state.visible === 1
				? from + ' of ' + films.length
				: from + '–' + to + ' of ' + films.length;
		}

		/* PRELOAD CURRENT AND ADJACENT CARDS */

		function preloadNearby() {
			const first = Math.max(0, state.index - 1);

			const last = Math.min(
				films.length - 1,
				state.index + state.visible
			);

			for (let i = first; i <= last; i += 1) {
				if (
					typeof cards[i]._mtfLoadImage === 'function'
				) {
					cards[i]._mtfLoadImage();
				}
			}
		}

		/* ACTIVE / PREVIEW / OFFSTAGE STATES */

		function updateCards() {
			cards.forEach(function (card, index) {
				const active =
					index >= state.index &&
					index < state.index + state.visible;

				const preview =
					index === state.index - 1 ||
					index === state.index + state.visible;

				card.classList.toggle('is-active', active);
				card.classList.toggle('is-preview', preview);

				card.classList.toggle(
					'is-offstage',
					!active && !preview
				);

				// Preview cards are decorative until they
				// move into the active viewing area.
				card.inert = !active;

				card.setAttribute(
					'aria-hidden',
					String(!active)
				);
			});
		}

		/* PROGRESS BAR */

		function updateProgress() {
			const fraction = Math.min(
				1,
				state.visible / films.length
			);

			const travel = 1 - fraction;

			const progressPosition = maxIndex() === 0
				? 0
				: (state.index / maxIndex()) * travel;

			progressFill.style.width =
				(fraction * 100) + '%';

			progressFill.style.left =
				(progressPosition * 100) + '%';

			progress.setAttribute(
				'aria-valuemax',
				String(maxIndex() + 1)
			);

			progress.setAttribute(
				'aria-valuenow',
				String(state.index + 1)
			);

			progress.setAttribute(
				'aria-valuetext',
				rangeText()
			);

			progress.setAttribute(
				'aria-disabled',
				String(maxIndex() === 0)
			);

			progress.tabIndex =
				maxIndex() === 0 ? -1 : 0;

			count.textContent = rangeText();
		}

		/* BUTTON AVAILABILITY */

		function updateNavigation() {
			const atStart = state.index === 0;
			const atEnd = state.index >= maxIndex();

			prevButton.disabled = atStart;
			nextButton.disabled = atEnd;

			prevButton.classList.toggle(
				'is-unavailable',
				atStart
			);

			nextButton.classList.toggle(
				'is-unavailable',
				atEnd
			);
		}

		/* TRACK POSITION */

		function position(animate, draggingOffset) {
			const x =
				state.inset -
				state.index * state.step +
				(draggingOffset || 0);

			if (!animate || reducedMotion.matches) {
				track.style.transition = 'none';
			} else if (track.style.transition === 'none') {
				// Commit the current drag position first.
				void track.offsetWidth;
				track.style.transition = '';
			}

			track.style.transform =
				'translate3d(' + x + 'px, 0, 0)';

			if (!animate || reducedMotion.matches) {
				requestAnimationFrame(function () {
					if (!state.isDragging) {
						track.style.transition = '';
					}
				});
			}
		}

		/* RE-RENDER */

		function update(animate) {
			updateCards();
			updateNavigation();
			updateProgress();
			preloadNearby();

			// Offscreen cards may have longer metadata.
			// Height follows the active cards only.
			let visibleHeight = 0;

			for (
				let i = state.index;
				i < state.index + state.visible;
				i += 1
			) {
				visibleHeight = Math.max(
					visibleHeight,
					cards[i].offsetHeight
				);
			}

			viewport.style.height =
				Math.ceil(visibleHeight + 28) + 'px';

			position(animate, 0);
		}

		/* RESPONSIVE MEASUREMENTS */

		function measure() {
			state.visible = visibleCount();
			state.index = clamp(state.index);

			const stageRect =
				stage.getBoundingClientRect();

			const viewportRect =
				viewport.getBoundingClientRect();

			const trackStyle =
				window.getComputedStyle(track);

			const gap =
				parseFloat(
					trackStyle.columnGap || trackStyle.gap
				) || 0;

			const cardWidth = Math.max(
				1,
				(
					stageRect.width -
					gap * (state.visible - 1)
				) / state.visible
			);

			state.step = cardWidth + gap;

			state.inset = Math.max(
				0,
				stageRect.left - viewportRect.left
			);

			track.style.setProperty(
				'--mtf-related-card-width',
				cardWidth + 'px'
			);

			stage.style.setProperty(
				'--mtf-related-side-space',
				state.inset + 'px'
			);

			stage.style.setProperty(
				'--mtf-related-card-image-height',
				(cardWidth * 9 / 16) + 'px'
			);

			section.classList.toggle(
				'mtf-related-films--single',
				films.length <= state.visible
			);

			update(false);
		}

		function goTo(index, animate) {
			state.index = clamp(index);
			update(animate !== false);
		}

		function move(direction) {
			goTo(state.index + direction, true);
		}

		/* DRAG AND SWIPE */

		function onPointerDown(event) {
			if (
				maxIndex() === 0 ||
				state.pointerId !== null
			) {
				return;
			}

			if (
				event.button !== undefined &&
				event.button !== 0
			) {
				return;
			}

			state.pointerId = event.pointerId;
			state.startX = event.clientX;
			state.startY = event.clientY;
			state.deltaX = 0;
			state.isDragging = false;
		}

		function onPointerMove(event) {
			if (event.pointerId !== state.pointerId) {
				return;
			}

			const dx = event.clientX - state.startX;
			const dy = event.clientY - state.startY;

			if (!state.isDragging) {
				if (
					Math.abs(dx) < 8 ||
					Math.abs(dx) < Math.abs(dy) * 1.25
				) {
					return;
				}

				state.isDragging = true;
				viewport.classList.add('is-dragging');

				if (viewport.setPointerCapture) {
					viewport.setPointerCapture(event.pointerId);
				}
			}

			state.deltaX = dx;
			position(false, dx);
		}

		function finishPointer(event, cancelled) {
			if (event.pointerId !== state.pointerId) {
				return;
			}

			const dragging = state.isDragging;
			const dx = state.deltaX;

			if (
				dragging &&
				viewport.hasPointerCapture &&
				viewport.hasPointerCapture(event.pointerId)
			) {
				viewport.releasePointerCapture(
					event.pointerId
				);
			}

			state.pointerId = null;
			state.isDragging = false;
			state.deltaX = 0;

			viewport.classList.remove('is-dragging');

			if (dragging) {
				state.suppressClick = true;

				window.setTimeout(function () {
					state.suppressClick = false;
				}, 100);

				const threshold = Math.min(
					90,
					Math.max(35, state.step * .17)
				);

				if (
					!cancelled &&
					Math.abs(dx) > threshold
				) {
					move(dx < 0 ? 1 : -1);
				} else {
					update(true);
				}
			}
		}

		function onClickCapture(event) {
			if (!state.suppressClick) return;

			event.preventDefault();
			event.stopPropagation();
		}

		/* PROGRESS-BAR SCRUBBING */

		function seekFromClientX(x) {
			const rect =
				progress.getBoundingClientRect();

			const ratio = Math.max(
				0,
				Math.min(
					1,
					(x - rect.left) / Math.max(1, rect.width)
				)
			);

			return Math.round(ratio * maxIndex());
		}

		function progressDown(event) {
			if (maxIndex() === 0) return;

			if (
				event.button !== undefined &&
				event.button !== 0
			) {
				return;
			}

			state.progressPointer = event.pointerId;

			if (progress.setPointerCapture) {
				progress.setPointerCapture(event.pointerId);
			}

			progress.classList.add('is-dragging');

			goTo(
				seekFromClientX(event.clientX),
				false
			);
		}

		function progressMove(event) {
			if (
				event.pointerId !== state.progressPointer
			) {
				return;
			}

			goTo(
				seekFromClientX(event.clientX),
				false
			);
		}

		function progressUp(event, cancelled) {
			if (
				event.pointerId !== state.progressPointer
			) {
				return;
			}

			if (
				progress.hasPointerCapture &&
				progress.hasPointerCapture(event.pointerId)
			) {
				progress.releasePointerCapture(
					event.pointerId
				);
			}

			state.progressPointer = null;
			progress.classList.remove('is-dragging');

			if (!cancelled) {
				goTo(
					seekFromClientX(event.clientX),
					false
				);
			}
		}

		/* KEYBOARD NAVIGATION */

		function progressKeydown(event) {
			if (maxIndex() === 0) return;

			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					move(-1);
					break;

				case 'ArrowRight':
					event.preventDefault();
					move(1);
					break;

				case 'Home':
					event.preventDefault();
					goTo(0, true);
					break;

				case 'End':
					event.preventDefault();
					goTo(maxIndex(), true);
					break;
			}
		}

		/* EVENT LISTENERS */

		prevButton.addEventListener(
			'click',
			function () {
				move(-1);
			}
		);

		nextButton.addEventListener(
			'click',
			function () {
				move(1);
			}
		);

		viewport.addEventListener(
			'pointerdown',
			onPointerDown
		);

		viewport.addEventListener(
			'pointermove',
			onPointerMove
		);

		viewport.addEventListener(
			'pointerup',
			function (event) {
				finishPointer(event, false);
			}
		);

		viewport.addEventListener(
			'pointercancel',
			function (event) {
				finishPointer(event, true);
			}
		);

		viewport.addEventListener(
			'click',
			onClickCapture,
			true
		);

		viewport.addEventListener(
			'dragstart',
			function (event) {
				event.preventDefault();
			}
		);

		progress.addEventListener(
			'pointerdown',
			progressDown
		);

		progress.addEventListener(
			'pointermove',
			progressMove
		);

		progress.addEventListener(
			'pointerup',
			function (event) {
				progressUp(event, false);
			}
		);

		progress.addEventListener(
			'pointercancel',
			function (event) {
				progressUp(event, true);
			}
		);

		progress.addEventListener(
			'keydown',
			progressKeydown
		);

		/* RESIZING */

		function scheduleMeasure() {
			if (state.pendingFrame) {
				cancelAnimationFrame(state.pendingFrame);
			}

			state.pendingFrame =
				requestAnimationFrame(measure);
		}

		if ('ResizeObserver' in window) {
			const resizeObserver = new ResizeObserver(
				scheduleMeasure
			);

			resizeObserver.observe(stage);
			resizeObserver.observe(viewport);
		}

		window.addEventListener(
			'resize',
			scheduleMeasure
		);

		measure();
	}

	/* SECTION INSERTION */

	function insertSection(section, options) {
		options = options || {};

		if (
			options.before &&
			options.before.parentNode
		) {
			options.before.parentNode.insertBefore(
				section,
				options.before
			);

			return true;
		}

		if (
			options.after &&
			options.after.parentNode
		) {
			options.after.parentNode.insertBefore(
				section,
				options.after.nextSibling
			);

			return true;
		}

		const footer = document.querySelector('footer');

		if (footer && footer.parentNode) {
			footer.parentNode.insertBefore(
				section,
				footer
			);

			return true;
		}

		return false;
	}

	/* INITIALIZATION */

	function init(options) {
		if (!isIndividualFilmPage()) {
			return null;
		}

		const existing = document.querySelector(
			'[data-mtf-related-films]'
		);

		if (existing) {
			return existing;
		}

		if (
			!MTF.filmRelated ||
			typeof MTF.filmRelated.getRecommendations !==
				'function'
		) {
			return null;
		}

		const recommendations =
			MTF.filmRelated.getRecommendations();

		if (
			!recommendations ||
			!Array.isArray(recommendations.films) ||
			!recommendations.films.length
		) {
			return null;
		}

		const section =
			createSection(recommendations);

		if (!insertSection(section, options)) {
			console.warn(
				'Mark Thomas Films: unable to insert related films section.'
			);

			return null;
		}

		// Detached elements measure as zero width.
		if (
			typeof section._mtfInitCarousel === 'function'
		) {
			section._mtfInitCarousel();
			delete section._mtfInitCarousel;
		}

		return section;
	}

	MTF.filmRelatedUI = {
		init,
		fetchFilmImage
	};

})();
