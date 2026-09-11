(function () {

	'use strict';


	window.MTF =
		window.MTF || {};


	/* ==================================================
		 GET TESTIMONIAL DATA
		 ================================================== */

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
					typeof testimonial.quote ===
						'string' &&
					testimonial.quote.trim() &&
					typeof testimonial.name ===
						'string' &&
					testimonial.name.trim()
				);

			});

	}


	/* ==================================================
		 CREATE TESTIMONIAL SECTION
		 ================================================== */

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


		/* --------------------------------------------------
			 HEADING
			 -------------------------------------------------- */

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


		/* --------------------------------------------------
			 QUOTE
			 -------------------------------------------------- */

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


	/* ==================================================
		 INSERT DIRECTLY BEFORE SITE FOOTER
		 ================================================== */

	function insertBeforeFooter(section) {

		const siteFooter =
			document.querySelector(
				'#footer-sections, ' +
				'footer.sections, ' +
				'footer'
			);


		if (
			!siteFooter ||
			!siteFooter.parentNode
		) {
			return false;
		}


		siteFooter.parentNode.insertBefore(
			section,
			siteFooter
		);


		return true;

	}


	/* ==================================================
		 TESTIMONIAL ROTATION
		 ================================================== */

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


						testimonialElement
							.classList.remove(
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


	/* ==================================================
		 INITIALIZE
		 ================================================== */

	function init() {

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


		if (
			!insertBeforeFooter(
				elements.section
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
		init: init
	};

})();