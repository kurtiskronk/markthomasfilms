/* =========================================================
	 MARK THOMAS FILMS
	 RELATED FILMS — CAROUSEL UI

	 Renders related-film recommendations on individual
	 wedding film pages.

	 Responsibilities:
	 - Ask films-related.js for related recommendations.
	 - Build a two-up carousel on desktop / one-up on mobile.
	 - Fetch images for the visible cards and adjacent previews.
	 - Extract the Squarespace featured image.
	 - Render clickable image + title cards.
	 - Support arrows, drag, swipe, and progress dragging.
	 ========================================================= */

(function () {

	'use strict';

	window.MTF = window.MTF || {};
	const MTF = window.MTF;

	const imageCache = new Map();

	function normalizePath(value) {
		if (!value) {
			return '';
		}

		try {
			const url = new URL(value, window.location.origin);
			return url.pathname.replace(/\/+$/, '');
		}
		catch (error) {
			return '';
		}
	}

	function normalizeImageURL(value) {
		if (!value) {
			return '';
		}

		try {
			const url = new URL(value, window.location.origin);
			if (url.protocol === 'http:') {
				url.protocol = 'https:';
			}
			return url.href;
		}
		catch (error) {
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
		return '/films/tag/' + encodeURIComponent(tag).replace(/%20/g, '+');
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

	function extractImageFromDocument(documentRoot) {
		if (!documentRoot) {
			return '';
		}

		const ogImage = documentRoot.querySelector('meta[property="og:image"]');
		if (ogImage) {
			const url = normalizeImageURL(ogImage.getAttribute('content'));
			if (url) {
				return url;
			}
		}

		const twitterImage = documentRoot.querySelector('meta[name="twitter:image"]');
		if (twitterImage) {
			const url = normalizeImageURL(twitterImage.getAttribute('content'));
			if (url) {
				return url;
			}
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

			for (let index = 0; index < candidates.length; index += 1) {
				const candidate = normalizeImageURL(candidates[index]);
				if (candidate) {
					return candidate;
				}
			}
		}

		return '';
	}

	async function fetchFilmImage(filmURL) {
		const path = normalizePath(filmURL);

		if (!path) {
			return '';
		}

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
				const pageDocument = new DOMParser().parseFromString(html, 'text/html');
				return extractImageFromDocument(pageDocument);
			}
			catch (error) {
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
				separator.className = 'mtf-related-film__meta-separator';
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

	function createImageElements(film, imageFrame) {
		const image = document.createElement('img');
		image.className = 'mtf-related-film__image';
		image.alt = film.title + ' wedding film';
		image.decoding = 'async';
		image.draggable = false;
		image.loading = 'eager';
		image.setAttribute('fetchpriority', 'low');
		image.hidden = true;

		const placeholder = document.createElement('div');
		placeholder.className = 'mtf-related-film__image-placeholder';
		placeholder.setAttribute('aria-hidden', 'true');

		imageFrame.appendChild(image);
		imageFrame.appendChild(placeholder);

		return { image: image, placeholder: placeholder };
	}

	function populateImage(frame, image, placeholder, filmURL) {
		fetchFilmImage(filmURL).then(function (imageURL) {
			if (!imageURL) {
				frame.classList.add('mtf-related-film__image-frame--empty');
				return;
			}

			image.addEventListener('load', function () {
				image.hidden = false;
				placeholder.hidden = true;
				frame.classList.add('mtf-related-film__image-frame--loaded');
			}, { once: true });

			image.src = imageURL;
		});
	}

	function createCard(film) {
		const article = document.createElement('article');
		article.className = 'mtf-related-film';

		const filmURL = normalizePath(film.url);

		const mediaLink = document.createElement('a');
		mediaLink.className = 'mtf-related-film__media';
		mediaLink.href = filmURL;
		mediaLink.draggable = false;
		mediaLink.setAttribute('aria-label', 'View ' + film.title + ' wedding film');

		const imageFrame = document.createElement('div');
		imageFrame.className = 'mtf-related-film__image-frame';

		const imageElements = createImageElements(film, imageFrame);
		mediaLink.appendChild(imageFrame);
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

		article._mtfLoadImage = function () {
			if (article.__mtfImageRequested) {
				return;
			}

			article.__mtfImageRequested = true;

			populateImage(
				imageFrame,
				imageElements.image,
				imageElements.placeholder,
				filmURL
			);
		};

		return article;
	}

	function createEdgePreview(direction) {
		const edge = document.createElement('div');
		edge.className = 'mtf-related-films__edge mtf-related-films__edge--' + direction;

		const preview = document.createElement('div');
		preview.className = 'mtf-related-films__edge-preview';

		const image = document.createElement('img');
		image.className = 'mtf-related-films__edge-image';
		image.alt = '';
		image.loading = 'eager';
		image.decoding = 'async';
		image.draggable = false;
		image.hidden = true;

		const placeholder = document.createElement('div');
		placeholder.className = 'mtf-related-films__edge-placeholder';
		placeholder.setAttribute('aria-hidden', 'true');

		preview.appendChild(image);
		preview.appendChild(placeholder);
		preview.setAttribute('aria-hidden', 'true');

		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'mtf-related-films__edge-button';
		button.setAttribute(
			'aria-label',
			direction === 'prev'
				? 'Show previous related film'
				: 'Show next related film'
		);
		button.textContent = direction === 'prev' ? '←' : '→';

		edge.appendChild(preview);
		edge.appendChild(button);

		return {
			element: edge,
			image: image,
			placeholder: placeholder,
			button: button
		};
	}

	function createSection(recommendations) {
		const config = MTF.filmRelatedConfig || {};

		const section = document.createElement('section');
		section.className = 'mtf-related-films mtf-section mtf-section--light';
		section.setAttribute('data-mtf-related-films', '');

		const container = document.createElement('div');
		container.className = 'mtf-section__container mtf-related-films__container';

		const heading = document.createElement('div');
		heading.className = 'mtf-section__heading mtf-related-films__heading';

		const eyebrow = document.createElement('p');
		eyebrow.className = 'mtf-section__eyebrow';
		eyebrow.textContent = config.eyebrow || 'CONTINUE EXPLORING';
		heading.appendChild(eyebrow);

		const title = document.createElement('h2');
		title.className = 'mtf-section__title mtf-section__title--subsection';
		title.textContent = recommendations.heading;
		title.id = 'mtf-related-films-title';
		section.setAttribute('aria-labelledby', title.id);
		heading.appendChild(title);

		if (recommendations.venueOnly && recommendations.sameVenueCount >= 6) {
			const venueCount = document.createElement('p');
			venueCount.className = 'mtf-related-films__venue-count';
			venueCount.textContent =
				recommendations.sameVenueCount + ' more wedding films at this venue';
			heading.appendChild(venueCount);
		}

		container.appendChild(heading);

		const carousel = document.createElement('div');
		carousel.className = 'mtf-related-films__carousel';
		carousel.setAttribute('aria-roledescription', 'carousel');

		const prevEdge = createEdgePreview('prev');
		const nextEdge = createEdgePreview('next');

		const viewport = document.createElement('div');
		viewport.className = 'mtf-related-films__viewport';
		viewport.setAttribute('aria-label', 'Related wedding film carousel');

		const track = document.createElement('div');
		track.className = 'mtf-related-films__track';

		const cards = recommendations.films.map(createCard);
		cards.forEach(function (card) {
			track.appendChild(card);
		});

		viewport.appendChild(track);
		carousel.appendChild(prevEdge.element);
		carousel.appendChild(viewport);
		carousel.appendChild(nextEdge.element);
		container.appendChild(carousel);

		const mobileNav = document.createElement('div');
		mobileNav.className = 'mtf-related-films__mobile-nav';

		const mobilePrev = document.createElement('button');
		mobilePrev.type = 'button';
		mobilePrev.className = 'mtf-related-films__mobile-button';
		mobilePrev.textContent = '←';
		mobilePrev.setAttribute('aria-label', 'Previous related film');

		const mobileNext = document.createElement('button');
		mobileNext.type = 'button';
		mobileNext.className = 'mtf-related-films__mobile-button';
		mobileNext.textContent = '→';
		mobileNext.setAttribute('aria-label', 'Next related film');

		mobileNav.appendChild(mobilePrev);
		mobileNav.appendChild(mobileNext);
		container.appendChild(mobileNav);

		const controls = document.createElement('div');
		controls.className = 'mtf-related-films__controls';

		const progress = document.createElement('div');
		progress.className = 'mtf-related-films__progress';
		progress.setAttribute('role', 'slider');
		progress.setAttribute('tabindex', '0');
		progress.setAttribute('aria-label', 'Browse related wedding films');
		progress.setAttribute('aria-valuemin', '1');

		const progressTrack = document.createElement('div');
		progressTrack.className = 'mtf-related-films__progress-track';

		const progressFill = document.createElement('div');
		progressFill.className = 'mtf-related-films__progress-fill';

		progress.appendChild(progressTrack);
		progress.appendChild(progressFill);

		const count = document.createElement('p');
		count.className = 'mtf-related-films__count';

		controls.appendChild(progress);
		controls.appendChild(count);
		container.appendChild(controls);

		const collectionConfig = config.collectionLink || {};
		if (collectionConfig.label && collectionConfig.url) {
			const footer = document.createElement('div');
			footer.className = 'mtf-related-films__footer';

			const collectionLink = document.createElement('a');
			collectionLink.className = 'mtf-related-films__all-link';
			collectionLink.href = collectionConfig.url;
			collectionLink.textContent = collectionConfig.label;

			footer.appendChild(collectionLink);
			container.appendChild(footer);
		}

		section.appendChild(container);

		section._mtfInitCarousel = function () {
			initCarousel({
			section: section,
			films: recommendations.films,
			cards: cards,
			viewport: viewport,
			track: track,
			prevEdge: prevEdge,
			nextEdge: nextEdge,
			mobilePrev: mobilePrev,
			mobileNext: mobileNext,
			progress: progress,
			progressFill: progressFill,
			count: count
			});
		};

		return section;
	}

	function initCarousel(parts) {
		const section = parts.section;
		const films = parts.films;
		const cards = parts.cards;
		const viewport = parts.viewport;
		const track = parts.track;
		const prevEdge = parts.prevEdge;
		const nextEdge = parts.nextEdge;
		const mobilePrev = parts.mobilePrev;
		const mobileNext = parts.mobileNext;
		const progress = parts.progress;
		const progressFill = parts.progressFill;
		const count = parts.count;

		const state = {
			index: 0,
			visibleCount: 2,
			gap: 0,
			stepWidth: 0,
			pointerId: null,
			startX: 0,
			startY: 0,
			deltaX: 0,
			dragging: false,
			moved: false,
			suppressClick: false,
			progressPointerId: null,
			unused: 0
		};

		function getVisibleCount() {
			return window.matchMedia('(max-width: 767px)').matches
				? 1
				: Math.min(2, films.length);
		}

		function maxIndex() {
			return Math.max(0, films.length - state.visibleCount);
		}

		function clampIndex(value) {
			return Math.max(0, Math.min(maxIndex(), value));
		}

		function currentRangeLabel() {
			const start = state.index + 1;
			const end = Math.min(films.length, state.index + state.visibleCount);

			if (state.visibleCount === 1) {
				return start + ' of ' + films.length;
			}

			return start + '–' + end + ' of ' + films.length;
		}

		function updateProgress() {
			const total = films.length;
			const max = maxIndex();
			const fillFraction = total <= state.visibleCount
				? 1
				: (state.visibleCount / total);
			const travel = 1 - fillFraction;
			const position = max === 0
				? 0
				: (state.index / max) * travel;

			progressFill.style.width = (fillFraction * 100) + '%';
			progressFill.style.left = (position * 100) + '%';

			progress.setAttribute('aria-valuemax', String(max + 1));
			progress.setAttribute('aria-valuenow', String(state.index + 1));
			progress.setAttribute('aria-valuetext', currentRangeLabel());

			count.textContent = currentRangeLabel();
			progress.setAttribute('aria-disabled', String(max === 0));
			progress.setAttribute('tabindex', max === 0 ? '-1' : '0');
		}

		function applyEdgeImage(edge, film, disabled) {
			edge.element.classList.toggle('is-disabled', disabled);
			edge.button.disabled = disabled;

			const filmPath = film ? normalizePath(film.url) : '';
			if (!filmPath) {
				edge.image.hidden = true;
				edge.placeholder.hidden = false;
				edge._currentPath = '';
				return;
			}

			// Dragging must not request the same image on every pointermove.
			if (edge._currentPath === filmPath) {
				return;
			}

			edge._currentPath = filmPath;
			edge._requestId = (edge._requestId || 0) + 1;
			const requestId = edge._requestId;

			edge.image.hidden = true;
			edge.placeholder.hidden = false;

			fetchFilmImage(filmPath).then(function (imageURL) {
				// Ignore a stale promise when someone advances rapidly.
				if (requestId !== edge._requestId || !imageURL) return;

				const showLoadedImage = function () {
					if (requestId !== edge._requestId) return;
					edge.image.hidden = false;
					edge.placeholder.hidden = true;
				};

				edge.image.addEventListener('load', showLoadedImage, { once: true });
				if (edge.image.src !== imageURL) {
					edge.image.src = imageURL;
				} else if (edge.image.complete) {
					showLoadedImage();
				}
			});
		}

		function updateEdges() {
			const prevIndex = state.index - 1;
			const nextIndex = state.index + state.visibleCount;

			applyEdgeImage(
				prevEdge,
				films[prevIndex] || films[state.index] || null,
				state.index === 0
			);

			applyEdgeImage(
				nextEdge,
				films[nextIndex] || films[films.length - 1] || null,
				state.index >= maxIndex()
			);

			mobilePrev.disabled = state.index === 0;
			mobileNext.disabled = state.index >= maxIndex();
		}

		function preloadVisibleCards() {
			const start = Math.max(0, state.index - 1);
			const end = Math.min(films.length - 1, state.index + state.visibleCount);

			for (let i = start; i <= end; i += 1) {
				if (cards[i] && typeof cards[i]._mtfLoadImage === 'function') {
					cards[i]._mtfLoadImage();
				}
			}
		}

		function render(animate) {
			const offset = state.index * state.stepWidth;
			const dragOffset = state.dragging ? state.deltaX : 0;

			if (animate) {
				// Re-enable transitions after a no-transition drag frame.
				if (track.style.transition === 'none') {
					void track.offsetWidth;
					track.style.transition = '';
				}
			} else {
				track.style.transition = 'none';
			}

			track.style.transform = 'translate3d(' +
				((offset * -1) + dragOffset) + 'px, 0, 0)';

			cards.forEach(function (card, index) {
				const visible = index >= state.index &&
					index < state.index + state.visibleCount;
				card.inert = !visible;
				card.setAttribute('aria-hidden', String(!visible));
			});

			updateProgress();
			updateEdges();
			preloadVisibleCards();
		}

		function measure() {
			state.visibleCount = getVisibleCount();
			state.index = clampIndex(state.index);

			const style = window.getComputedStyle(track);
			state.gap = parseFloat(style.columnGap || style.gap || '0') || 0;

			if (cards[0]) {
				state.stepWidth = cards[0].getBoundingClientRect().width + state.gap;
			}
			else {
				state.stepWidth = 0;
			}

			render(false);
			window.requestAnimationFrame(function () {
				if (!state.dragging) track.style.transition = '';
			});
			section.classList.toggle(
				'mtf-related-films--single',
				films.length <= state.visibleCount
			);
		}

		function setIndex(nextIndex, animate) {
			state.index = clampIndex(nextIndex);
			state.dragging = false;
			state.deltaX = 0;
			render(animate !== false);
		}

		function step(direction) {
			setIndex(state.index + direction, true);
		}

		function dragThreshold() {
			return Math.min(120, Math.max(40, state.stepWidth * 0.18));
		}

		function onPointerDown(event) {
			if (films.length <= state.visibleCount || state.pointerId !== null) {
				return;
			}

			if (event.button !== undefined && event.button !== 0) {
				return;
			}

			state.pointerId = event.pointerId;
			state.startX = event.clientX;
			state.startY = event.clientY;
			state.deltaX = 0;
			state.moved = false;
			state.dragging = false;
			// Do NOT capture on down: a simple click on the image/title
			// must still activate the anchor in desktop/mobile browsers.
		}

		function onPointerMove(event) {
			if (event.pointerId !== state.pointerId) return;

			const deltaX = event.clientX - state.startX;
			const deltaY = event.clientY - state.startY;

			if (!state.dragging) {
				if (Math.abs(deltaX) < 7) return;
				if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

				state.dragging = true;
				state.moved = true;
				viewport.setPointerCapture(event.pointerId);
				viewport.classList.add('is-dragging');
			}

			state.deltaX = deltaX;
			track.style.transition = 'none';
			track.style.transform = 'translate3d(' +
				((state.index * state.stepWidth * -1) + deltaX) + 'px, 0, 0)';
		}

		function finishPointer(event, cancelled) {
			if (event.pointerId !== state.pointerId) return;

			const wasDragging = state.dragging;
			const deltaX = state.deltaX;

			if (wasDragging && viewport.hasPointerCapture(event.pointerId)) {
				viewport.releasePointerCapture(event.pointerId);
			}

			viewport.classList.remove('is-dragging');
			state.dragging = false;
			state.pointerId = null;
			state.startX = 0;
			state.startY = 0;
			state.deltaX = 0;
			state.moved = false;

			if (wasDragging) {
				state.suppressClick = true;
				// Click fires immediately after pointerup. Clear on a later task.
				window.setTimeout(function () {
					state.suppressClick = false;
				}, 80);

				const movedEnough = !cancelled && Math.abs(deltaX) > dragThreshold();
				const direction = deltaX < 0 ? 1 : -1;
				setIndex(state.index + (movedEnough ? direction : 0), true);
			}
		}

		function onViewportClickCapture(event) {
			if (!state.suppressClick) return;
			event.preventDefault();
			event.stopPropagation();
		}

		function progressIndexFromClientX(clientX) {
			const rect = progress.getBoundingClientRect();
			const ratio = rect.width > 0
				? Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
				: 0;
			return Math.round(ratio * maxIndex());
		}

		function onProgressPointerDown(event) {
			if (films.length <= state.visibleCount) {
				return;
			}

			state.progressPointerId = event.pointerId;
			progress.setPointerCapture(event.pointerId);
			progress.classList.add('is-dragging');
			setIndex(progressIndexFromClientX(event.clientX), false);
		}

		function onProgressPointerMove(event) {
			if (event.pointerId !== state.progressPointerId) {
				return;
			}

			setIndex(progressIndexFromClientX(event.clientX), false);
		}

		function onProgressPointerUp(event) {
			if (event.pointerId !== state.progressPointerId) {
				return;
			}

			if (progress.hasPointerCapture(event.pointerId)) {
				progress.releasePointerCapture(event.pointerId);
			}
			progress.classList.remove('is-dragging');
			setIndex(progressIndexFromClientX(event.clientX), true);
			state.progressPointerId = null;
		}

		function onProgressKeyDown(event) {
			if (films.length <= state.visibleCount) {
				return;
			}

			switch (event.key) {
				case 'ArrowLeft':
				case 'Left':
					event.preventDefault();
					step(-1);
					break;

				case 'ArrowRight':
				case 'Right':
					event.preventDefault();
					step(1);
					break;

				case 'Home':
					event.preventDefault();
					setIndex(0, true);
					break;

				case 'End':
					event.preventDefault();
					setIndex(maxIndex(), true);
					break;
			}
		}

		prevEdge.button.addEventListener('click', function () {
			step(-1);
		});

		nextEdge.button.addEventListener('click', function () {
			step(1);
		});

		mobilePrev.addEventListener('click', function () {
			step(-1);
		});

		mobileNext.addEventListener('click', function () {
			step(1);
		});

		viewport.addEventListener('pointerdown', onPointerDown);
		viewport.addEventListener('pointermove', onPointerMove);
		viewport.addEventListener('pointerup', function (event) {
			finishPointer(event, false);
		});
		viewport.addEventListener('pointercancel', function (event) {
			finishPointer(event, true);
		});
		viewport.addEventListener('click', onViewportClickCapture, true);

		progress.addEventListener('pointerdown', onProgressPointerDown);
		progress.addEventListener('pointermove', onProgressPointerMove);
		progress.addEventListener('pointerup', onProgressPointerUp);
		progress.addEventListener('pointercancel', function (event) {
			if (event.pointerId !== state.progressPointerId) return;
			progress.classList.remove('is-dragging');
			state.progressPointerId = null;
			render(true);
		});
		progress.addEventListener('keydown', onProgressKeyDown);

		let resizeFrame = null;
		window.addEventListener('resize', function () {
			if (resizeFrame) {
				window.cancelAnimationFrame(resizeFrame);
			}

			resizeFrame = window.requestAnimationFrame(function () {
				measure();
			});
		});

		measure();
	}

	function insertSection(section, options) {
		options = options || {};

		if (options.before && options.before.parentNode) {
			options.before.parentNode.insertBefore(section, options.before);
			return true;
		}

		if (options.after && options.after.parentNode) {
			options.after.parentNode.insertBefore(section, options.after.nextSibling);
			return true;
		}

		const footer = document.querySelector('footer');
		if (footer && footer.parentNode) {
			footer.parentNode.insertBefore(section, footer);
			return true;
		}

		return false;
	}

	function init(options) {
		if (!isIndividualFilmPage()) {
			return null;
		}

		const existingSection = document.querySelector('[data-mtf-related-films]');
		if (existingSection) {
			return existingSection;
		}

		if (
			!MTF.filmRelated ||
			typeof MTF.filmRelated.getRecommendations !== 'function'
		) {
			return null;
		}

		const recommendations = MTF.filmRelated.getRecommendations();

		if (
			!recommendations ||
			!Array.isArray(recommendations.films) ||
			!recommendations.films.length
		) {
			return null;
		}

		const section = createSection(recommendations);
		const inserted = insertSection(section, options);

		if (!inserted) {
			console.warn('Mark Thomas Films: unable to insert related films section.');
			return null;
		}

		// Measure only after insertion; detached cards have zero width.
		if (typeof section._mtfInitCarousel === 'function') {
			section._mtfInitCarousel();
			delete section._mtfInitCarousel;
		}

		return section;
	}

	MTF.filmRelatedUI = {
		init: init,
		fetchFilmImage: fetchFilmImage
	};

})();
