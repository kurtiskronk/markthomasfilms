(function () {
	'use strict';

	window.MTF = window.MTF || {};

	function getTestimonials() {

		if (
			!Array.isArray(
				window.MTF.filmTestimonials
			)
		) {
			return [];
		}

		return window.MTF.filmTestimonials
			.filter(function (testimonial) {

				return (
					testimonial &&
					typeof testimonial.quote === 'string' &&
					testimonial.quote.trim() &&
					typeof testimonial.name === 'string' &&
					testimonial.name.trim()
				);

			});
	}

	function createSection() {

		const section =
			document.createElement(
				'section'
			);

		section.className =
			'mtf-film-testimonials';

		section.setAttribute(
			'aria-labelledby',
			'mtf-film-testimonials-title'
		);

		const heading =
			document.createElement(
				'div'
			);

		heading.className =
			'mtf-film-testimonials-heading';

		const eyebrow =
			document.createElement(
				'p'
			);

		eyebrow.className =
			'mtf-film-testimonials-eyebrow';

		eyebrow.textContent =
			'Real Feedback';

		const title =
			document.createElement(
				'h2'
			);

		title.id =
			'mtf-film-testimonials-title';

		title.className =
			'mtf-film-testimonials-title';

		title.textContent =
			'What Couples Are Saying';

		const intro =
			document.createElement(
				'p'
			);

		intro.className =
			'mtf-film-testimonials-intro';

		intro.textContent =
			'Kind words from couples who trusted Mark Thomas Films to preserve their wedding day.';

		heading.appendChild(
			eyebrow
		);

		heading.appendChild(
			title
		);

		heading.appendChild(
			intro
		);

		const testimonial =
			document.createElement(
				'div'
			);

		testimonial.className =
			'mtf-film-testimonial';

		const quoteMark =
			document.createElement(
				'span'
			);

		quoteMark.className =
			'mtf-film-testimonial-mark';

		quoteMark.setAttribute(
			'aria-hidden',
			'true'
		);

		quoteMark.textContent =
			'“';

		const blockquote =
			document.createElement(
				'blockquote'
			);

		blockquote.className =
			'mtf-film-testimonial-quote';

		const quoteText =
			document.createElement(
				'p'
			);

		quoteText.className =
			'mtf-film-testimonial-text';

		const attribution =
			document.createElement(
				'footer'
			);

		attribution.className =
			'mtf-film-testimonial-name';

		blockquote.appendChild(
			quoteText
		);

		blockquote.appendChild(
			attribution
		);

		testimonial.appendChild(
			quoteMark
		);

		testimonial.appendChild(
			blockquote
		);

		section.appendChild(
			heading
		);

		section.appendChild(
			testimonial
		);

		return {
			section: section,
			testimonial: testimonial,
			quoteText: quoteText,
			attribution: attribution
		};
	}

	function findPaginationTarget(filmGrid) {

		const selectorMatch =
			document.querySelector(
				'.blog-list-pagination, ' +
				'.blog-pagination, ' +
				'.pagination, ' +
				'nav[aria-label*="pagination" i]'
			);

		if (selectorMatch) {
			return selectorMatch;
		}


		/*
		 * Squarespace markup can vary, so also find
		 * pagination by its visible link text.
		 */

		const paginationLink =
			Array
				.from(
					document.querySelectorAll(
						'a'
					)
				)
				.find(function (link) {

					const text =
						link.textContent
							.trim();

					return /^(older|newer) posts?$/i.test(
						text
					);

				});

		if (!paginationLink) {
			return null;
		}


		let node =
			paginationLink;


		while (
			node.parentElement &&
			node.parentElement !== document.body &&
			filmGrid &&
			!node.parentElement.contains(
				filmGrid
			)
		) {

			node =
				node.parentElement;

		}


		return node;
	}

	function findArchiveInsertionTarget(
		filmGrid
	) {
	
		if (!filmGrid) {
			return null;
		}
	
	
		/*
		 * Squarespace keeps the film cards AND the
		 * Older/Newer Posts pagination inside the
		 * blog grid container.
		 *
		 * Therefore the testimonial needs to be
		 * inserted AFTER the entire grid, not after
		 * the pagination element itself.
		 */
	
		return filmGrid;
	
	}

	function findIndividualInsertionTarget() {

		return document.querySelector(
			'.blog-item-wrapper, ' +
			'article.blog-item, ' +
			'.blog-item-content-wrapper, ' +
			'main article'
		);
	}

	function insertSection(
		section,
		filmGrid
	) {

		const target =
			filmGrid
				? findArchiveInsertionTarget(
					filmGrid
				)
				: findIndividualInsertionTarget();

		if (!target) {
			return false;
		}

		target.insertAdjacentElement(
			'afterend',
			section
		);

		return true;
	}

	function startRotation(
		testimonialElement,
		testimonials,
		quoteText,
		attribution
	) {

		let currentIndex =
			0;

		let intervalId =
			null;

		let transitionTimer =
			null;

		const motionQuery =
			window.matchMedia
				? window.matchMedia(
					'(prefers-reduced-motion: reduce)'
				)
				: null;

		function reducedMotion() {

			return Boolean(
				motionQuery &&
				motionQuery.matches
			);

		}

		function render(index) {

			quoteText.textContent =
				testimonials[index].quote;

			attribution.textContent =
				testimonials[index].name;

		}

		function advance() {

			testimonialElement.classList.add(
				'is-changing'
			);

			window.clearTimeout(
				transitionTimer
			);

			transitionTimer =
				window.setTimeout(
					function () {

						currentIndex =
							(
								currentIndex + 1
							) %
							testimonials.length;

						render(
							currentIndex
						);

						testimonialElement.classList.remove(
							'is-changing'
						);

					},
					250
				);

		}

		function stop() {

			if (!intervalId) {
				return;
			}

			window.clearInterval(
				intervalId
			);

			intervalId =
				null;

		}

		function start() {

			if (
				reducedMotion() ||
				testimonials.length < 2 ||
				intervalId ||
				document.hidden
			) {
				return;
			}

			intervalId =
				window.setInterval(
					advance,
					7000
				);

		}

		render(
			currentIndex
		);

		start();

		testimonialElement.addEventListener(
			'mouseenter',
			stop
		);

		testimonialElement.addEventListener(
			'mouseleave',
			start
		);

		testimonialElement.addEventListener(
			'focusin',
			stop
		);

		testimonialElement.addEventListener(
			'focusout',
			start
		);

		document.addEventListener(
			'visibilitychange',
			function () {

				if (document.hidden) {
					stop();
				}
				else {
					start();
				}

			}
		);

	}

	function init(options) {

		if (
			document.querySelector(
				'.mtf-film-testimonials'
			)
		) {
			return;
		}

		const testimonials =
			getTestimonials();

		if (!testimonials.length) {
			return;
		}

		const elements =
			createSection();

		const filmGrid =
			options &&
			options.filmGrid
				? options.filmGrid
				: null;

		if (
			!insertSection(
				elements.section,
				filmGrid
			)
		) {
			return;
		}

		startRotation(
			elements.testimonial,
			testimonials,
			elements.quoteText,
			elements.attribution
		);

	}

	window.MTF.filmTestimonialsUI = {
		init:
			init
	};

})();