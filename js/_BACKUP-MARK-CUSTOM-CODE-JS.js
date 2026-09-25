<!-- Loads your script directly from your GitHub repository -->
<link
	rel="preconnect"
	href="https://markthomasfilms.mark-a7f.workers.dev"
	crossorigin
>

<script
	src="https://markthomasfilms.mark-a7f.workers.dev/loader.js"
	defer>
</script>
<script>
(function () {
	const retiredFilms = [
		"Addison & Austin",
		"Abigail & Christopher",
		"Alexis & Chase",
		"Alexandra & Jesus",
		"Aileen & Ryan",
		"Alexa & Matthew",
		"Ashley & Stephen",
		"Amanda and Bazan",
		"Amanda & Jordan",
		"Amanda & Scott",
		"Amy & John",
		"Anna & Bradley",
		"Clarissa & Seth",
		"Kayle & Lance",
		"Kelly & Alejandro",
		"Kelly & Jason",
		"Colleen & Brent",
		"Anna & Christopher",
		"Ashley & Neil",
		"Aly & Nathan",
		"Grace & Daniel",
		"Henley & Nathan",
		"Janice & Colin",
		"Jeff & Courtney",
		"Jennifer & Gerardo",
		"Jenna & Colton",
		"Jonahlyn & Joe",
		"Katherine & Jacob",
		"Katie & David",
		"Katie & Owen",
		"Katie & Trevor",
		"Katy & Colby",
		"Kelli & Stephen",
		"Kimberly & Justin",
		"Korey & Katie",
		"Kryzta & Fabio",
		"Lauren & Ryan",
		"Madeline and Greg",
		"Ricky & Emily",
		"Anne & Ryan",
		"Aby & Raz",
		"Alessandra & Derek ",
		"Brooke & Matt",
		"Bailey & Landon",
		"Courtney & Jeffrey",
		"Craig & Amanda",
		"Desiree & Richie",
		"Emily & John",
		"Emily & Robert",
		"Erin & John",
		"Eva & Ricardo",
		"Fallon & Carl",
		"Gloria & Gabe",
		"Hillary & Michael",
		"DeAnna & Therrion",
		"Bethany & Stuart",
		"Brent & Hillary",
		"Briana & Stephen",
		"Brianne & Matthew",
		"Brittany & Jacoby",
		"Calley & Scott",
		"Candace & Adam",
		"Casey & Ashley",
		"Catalina & Thomas",
		"Christi & Taylor",
		"Rosalie & Jesus",
		"Caitlin & Austin",
		"Chase & Amy",
		"Chasity & Cody",
		"CJ & Keith",
		"Eric & Darling",
		"Fallon & Landry",
		"Heidi & Clayton",
		"Holly & Cade",
		"Jason & Camille",
		"Jennifer & Randy",
		"Jessica & Michael",
		"Jessie & James",
		"Jyoti & Manish",
		"Larkin & Garrett",
		"Latha & Ryan",
		"Tiffany & Jay",
		"Sara & Austin"
	];

	function replaceRetiredFilm() {
		const heading = document.querySelector("h1");
		if (!heading) return false;

		const pageTitle = heading.textContent.trim();
		if (!retiredFilms.includes(pageTitle)) return false;

		const iframe = document.querySelector(
			'iframe[src*="vimeo.com"], iframe[src*="player.vimeo.com"]'
		);

		if (!iframe) return false;

		const block =
			iframe.closest(".sqs-block-video") ||
			iframe.closest(".sqs-video-wrapper") ||
			iframe.parentElement;

		if (!block || block.dataset.retiredFilm === "true") return true;

		block.dataset.retiredFilm = "true";

		// Pull the page's existing thumbnail/social image
		const ogImage = document.querySelector('meta[property="og:image"]');
		const imageUrl = ogImage ? ogImage.content : "";

		block.innerHTML = `
			<div class="mtf-retired-film">

				${
					imageUrl
						? `
					<div class="mtf-retired-image">
						<img
							src="${imageUrl}"
							alt="${pageTitle} wedding"
						>
					</div>
				`
						: ""
				}

				<div class="mtf-retired-message">
					<div class="mtf-retired-heading">
						This Film Has Been Retired
					</div>

					<div class="mtf-retired-copy">
						Some of our older wedding films have been retired from our online archive.
						We’ve kept this page as part of the Mark Thomas Films story and wedding archive.
					</div>
				</div>

			</div>
		`;

		return true;
	}

	const style = document.createElement("style");

	style.textContent = `
		.mtf-retired-film {
			width: 100%;
			overflow: hidden;
		}

		.mtf-retired-image {
			width: 100%;
			aspect-ratio: 16 / 9;
			overflow: hidden;
			background: #111;
		}

		.mtf-retired-image img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}

		.mtf-retired-message {
			background: #111;
			color: #fff;
			text-align: center;
			padding: 34px 30px 38px;
			box-sizing: border-box;
		}

		.mtf-retired-heading {
			font-size: 28px;
			font-weight: 600;
			line-height: 1.2;
			margin-bottom: 12px;
		}

		.mtf-retired-copy {
			max-width: 700px;
			margin: 0 auto;
			font-size: 17px;
			line-height: 1.55;
		}

		@media (max-width: 640px) {
			.mtf-retired-message {
				padding: 26px 22px 30px;
			}

			.mtf-retired-heading {
				font-size: 23px;
			}

			.mtf-retired-copy {
				font-size: 16px;
			}
		}
	`;

	document.head.appendChild(style);

	if (!replaceRetiredFilm()) {
		const observer = new MutationObserver(() => {
			if (replaceRetiredFilm()) observer.disconnect();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}
})();
</script>

<!-- MTF FILM PAGE ARROW NAVIGATION -->

<style>
/* =========================================
	 MTF FILM NAVIGATION
	 KEEP EXISTING POSITIONING INTACT
	 ========================================= */

.mtf-film-arrow-nav {
	z-index: 50 !important;
	pointer-events: auto !important;
}

.mtf-film-arrow-nav a {
	pointer-events: auto !important;
}


/* =========================================
	 EXPLORE FILMS LINKS
	 ========================================= */

.mtf-film-arrow-label,
.mtf-bottom-nav-label {
	z-index: 60 !important;

	color: #2b2a28 !important;

	text-decoration: underline !important;
	text-decoration-thickness: 1px !important;
	text-underline-offset: 5px !important;

	font-weight: 600 !important;

	cursor: pointer !important;
	pointer-events: auto !important;
}

.mtf-film-arrow-label:hover,
.mtf-bottom-nav-label:hover {
	color: #000000 !important;
}
</style>


<script>
(function () {

	function updateFilmNavigation() {

		const previous =
			document.querySelector('.item-pagination-link--prev');

		const next =
			document.querySelector('.item-pagination-link--next');


		if (!previous && !next) return;


		/*
		 * FIND NORMAL VIDEO
		 */
		const video =
			document.querySelector('.sqs-block-video') ||
			document.querySelector('iframe[src*="vimeo"]')?.closest('.sqs-block') ||
			document.querySelector('iframe[src*="youtube"]')?.closest('.sqs-block') ||
			document.querySelector('video')?.closest('.sqs-block');


		/*
		 * FIND RETIRED FILM NOTICE
		 */
		const retiredNotice =
			Array.from(
				document.querySelectorAll(
					'div, section, p, h1, h2, h3, h4'
				)
			).find(function (el) {

				return (
					(el.textContent || '').trim() ===
					'This Film Has Been Retired'
				);

			});


		/*
		 * IF RETIRED, FIND THE IMAGE
		 * IMMEDIATELY BEFORE THE NOTICE
		 */
		let retiredImage = null;


		if (retiredNotice) {

			const imageBlocks =
				Array.from(
					document.querySelectorAll(
						'.sqs-block-image'
					)
				);


			const imagesBeforeNotice =
				imageBlocks.filter(function (image) {

					return !!(
						image.compareDocumentPosition(
							retiredNotice
						) &
						Node.DOCUMENT_POSITION_FOLLOWING
					);

				});


			if (imagesBeforeNotice.length) {

				retiredImage =
					imagesBeforeNotice[
						imagesBeforeNotice.length - 1
					];

			}

		}


		/*
		 * RETIRED IMAGE TAKES PRIORITY.
		 * OTHERWISE USE NORMAL VIDEO.
		 */
		const arrowTarget =
			retiredImage || video;


		/*
		 * ADD TOP / VIDEO-FRAME NAVIGATION
		 */
		if (
			arrowTarget &&
			!arrowTarget.querySelector(
				'.mtf-film-arrow-nav'
			)
		) {

			if (
				window
					.getComputedStyle(arrowTarget)
					.position === 'static'
			) {

				arrowTarget.style.position =
					'relative';

			}


			const nav =
				document.createElement('div');

			nav.className =
				'mtf-film-arrow-nav';


			/*
			 * PREVIOUS FILM
			 */
			if (previous) {

				const left =
					document.createElement('a');

				left.href =
					previous.href;

				left.className =
					'mtf-film-arrow mtf-film-arrow-prev';

				left.setAttribute(
					'aria-label',
					'Previous Film'
				);

				left.innerHTML =
					'&#8249;';

				nav.appendChild(left);

			} else {

				nav.appendChild(
					document.createElement('span')
				);

			}


			/*
			 * EXPLORE FILMS
			 */
			const label =
				document.createElement('a');

			label.href =
				'/films';

			label.className =
				'mtf-film-arrow-label';

			label.textContent =
				'Explore Films';

			label.setAttribute(
				'aria-label',
				'Explore all wedding films'
			);

			nav.appendChild(label);


			/*
			 * NEXT FILM
			 */
			if (next) {

				const right =
					document.createElement('a');

				right.href =
					next.href;

				right.className =
					'mtf-film-arrow mtf-film-arrow-next';

				right.setAttribute(
					'aria-label',
					'Next Film'
				);

				right.innerHTML =
					'&#8250;';

				nav.appendChild(right);

			} else {

				nav.appendChild(
					document.createElement('span')
				);

			}


			arrowTarget.appendChild(nav);

		}


		/*
		 * BUILD CUSTOM BOTTOM NAVIGATION
		 */
		const bottomNav =
			document.querySelector(
				'.item-pagination'
			);


		if (
			bottomNav &&
			!bottomNav.querySelector(
				'.mtf-bottom-nav'
			)
		) {

			const customBottomNav =
				document.createElement('div');

			customBottomNav.className =
				'mtf-bottom-nav';


			/*
			 * BOTTOM PREVIOUS
			 */
			if (previous) {

				const bottomPrev =
					document.createElement('a');

				bottomPrev.href =
					previous.href;

				bottomPrev.className =
					'mtf-bottom-nav-arrow mtf-bottom-nav-prev';

				bottomPrev.setAttribute(
					'aria-label',
					'Previous Film'
				);

				bottomPrev.textContent =
					'‹';

				customBottomNav.appendChild(
					bottomPrev
				);

			} else {

				customBottomNav.appendChild(
					document.createElement('span')
				);

			}


			/*
			 * BOTTOM EXPLORE FILMS
			 */
			const bottomLabel =
				document.createElement('a');

			bottomLabel.href =
				'/films';

			bottomLabel.className =
				'mtf-bottom-nav-label';

			bottomLabel.textContent =
				'Explore Films';

			bottomLabel.setAttribute(
				'aria-label',
				'Explore all wedding films'
			);

			customBottomNav.appendChild(
				bottomLabel
			);


			/*
			 * BOTTOM NEXT
			 */
			if (next) {

				const bottomNext =
					document.createElement('a');

				bottomNext.href =
					next.href;

				bottomNext.className =
					'mtf-bottom-nav-arrow mtf-bottom-nav-next';

				bottomNext.setAttribute(
					'aria-label',
					'Next Film'
				);

				bottomNext.textContent =
					'›';

				customBottomNav.appendChild(
					bottomNext
				);

			} else {

				customBottomNav.appendChild(
					document.createElement('span')
				);

			}


			bottomNav.appendChild(
				customBottomNav
			);

		}

	}


	/*
	 * WAIT UNTIL SQUARESPACE AND THE
	 * RETIRED-FILM REPLACEMENT HAVE
	 * FINISHED BUILDING THE PAGE.
	 */
	function startFilmNavigation() {

		setTimeout(
			updateFilmNavigation,
			400
		);

		setTimeout(
			updateFilmNavigation,
			900
		);

		setTimeout(
			updateFilmNavigation,
			1600
		);


		let timer;


		const observer =
			new MutationObserver(function () {

				clearTimeout(timer);

				timer =
					setTimeout(function () {

						updateFilmNavigation();

					}, 100);

			});


		observer.observe(
			document.body,
			{
				childList: true,
				subtree: true
			}
		);

	}


	if (
		document.readyState ===
		'loading'
	) {

		document.addEventListener(
			'DOMContentLoaded',
			startFilmNavigation
		);

	} else {

		startFilmNavigation();

	}

})();
</script>
<!-- MARK THOMAS FILMS — EDITORIAL BLOG STYLE -->

<script>
document.addEventListener("DOMContentLoaded", function () {
	const path = window.location.pathname;

	if (path.startsWith("/blog/") && path !== "/blog/") {
		document.body.classList.add("mtf-editorial-blog");
	}
});
</script>

<style>

/* =========================================================
	 MARK THOMAS FILMS
	 EDITORIAL BLOG POST STYLE
	 Applies ONLY to individual posts inside /blog/
	 ========================================================= */


/* ---------- PAGE BACKGROUND ---------- */

body.mtf-editorial-blog {
	background: #f5f2ec !important;
}

body.mtf-editorial-blog main,
body.mtf-editorial-blog #page,
body.mtf-editorial-blog .page-section,
body.mtf-editorial-blog .blog-item-wrapper {
	background: #f5f2ec !important;
}


/* ---------- OVERALL POST ---------- */

body.mtf-editorial-blog .blog-item-wrapper {
	max-width: 1100px !important;
	margin: 0 auto !important;
	padding-left: 40px !important;
	padding-right: 40px !important;
}


/* ---------- TITLE AREA ---------- */

body.mtf-editorial-blog .blog-item-header {
	text-align: center !important;
	padding-top: 70px !important;
	padding-bottom: 38px !important;
	margin-bottom: 38px !important;
	border-bottom: 1px solid rgba(0,0,0,.20) !important;
}


/* ---------- MAIN POST TITLE ---------- */

body.mtf-editorial-blog .blog-item-title,
body.mtf-editorial-blog .blog-item-title h1,
body.mtf-editorial-blog h1.entry-title {
	font-family: Georgia, "Times New Roman", serif !important;
	font-weight: 400 !important;
	font-size: clamp(46px, 5.2vw, 68px) !important;
	line-height: 1.02 !important;
	letter-spacing: -0.025em !important;
	text-align: center !important;
	color: #0f0f0f !important;

	max-width: 820px !important;
	margin-left: auto !important;
	margin-right: auto !important;
}


/* ---------- DATE / AUTHOR / META ---------- */

body.mtf-editorial-blog .blog-item-meta-wrapper,
body.mtf-editorial-blog .blog-meta-item,
body.mtf-editorial-blog .blog-item-meta {
	text-align: center !important;
	font-size: 11px !important;
	letter-spacing: .16em !important;
	text-transform: uppercase !important;
	color: #1b1b1b !important;
}


/* ---------- ARTICLE AREA ---------- */

body.mtf-editorial-blog .blog-item-content {
	width: 100% !important;
	max-width: 1000px !important;
	margin: 0 auto !important;
	padding-bottom: 75px !important;
	color: #111111 !important;
}


/* =========================================================
	 NARROW ACTUAL SQUARESPACE TEXT BLOCKS
	 ========================================================= */

body.mtf-editorial-blog .blog-item-content .sqs-block-html {
	max-width: 660px !important;
	width: 100% !important;
	margin-left: auto !important;
	margin-right: auto !important;
}

body.mtf-editorial-blog .blog-item-content .sqs-block-html .sqs-block-content,
body.mtf-editorial-blog .blog-item-content .html-block .sqs-block-content {
	max-width: 660px !important;
	width: 100% !important;
	margin-left: auto !important;
	margin-right: auto !important;
}


/* ---------- NORMAL PARAGRAPHS ---------- */

body.mtf-editorial-blog .blog-item-content p {
	font-family: Georgia, "Times New Roman", serif !important;
	font-size: 18px !important;
	line-height: 1.68 !important;
	letter-spacing: 0 !important;
	color: #111111 !important;

	margin-top: 0 !important;
	margin-bottom: 18px !important;
}


/* ---------- ARTICLE HEADINGS ---------- */

body.mtf-editorial-blog .blog-item-content h2 {
	font-family: Georgia, "Times New Roman", serif !important;
	font-size: clamp(29px, 3.5vw, 38px) !important;
	line-height: 1.15 !important;
	font-weight: 400 !important;
	letter-spacing: -.015em !important;
	text-transform: none !important;
	text-align: left !important;
	color: #0f0f0f !important;

	margin-top: 58px !important;
	margin-bottom: 22px !important;
	padding-top: 34px !important;

	border-top: 1px solid rgba(0,0,0,.20) !important;
}


body.mtf-editorial-blog .blog-item-content h3 {
	font-family: Georgia, "Times New Roman", serif !important;
	font-size: 26px !important;
	line-height: 1.25 !important;
	font-weight: 400 !important;
	color: #0f0f0f !important;

	margin-top: 42px !important;
	margin-bottom: 18px !important;
}


/* ---------- FIRST ARTICLE HEADING ---------- */

body.mtf-editorial-blog .blog-item-content > h2:first-child {
	text-align: center !important;
	font-family: Arial, Helvetica, sans-serif !important;
	font-size: 13px !important;
	font-weight: 500 !important;
	line-height: 1.4 !important;
	letter-spacing: .18em !important;
	text-transform: uppercase !important;
	color: #161616 !important;

	border-top: 0 !important;
	padding-top: 0 !important;
	margin-top: 0 !important;
	margin-bottom: 34px !important;
}


/* =========================================================
	 PULL QUOTES
	 ========================================================= */

body.mtf-editorial-blog .blog-item-content .sqs-block-quote {
	width: 100% !important;
	max-width: 660px !important;
	margin: 46px auto !important;
	padding: 0 !important;
}


body.mtf-editorial-blog blockquote {
	width: 100% !important;
	max-width: 660px !important;
	box-sizing: border-box !important;

	margin: 0 auto !important;
	padding: 30px 20px !important;

	border-top: 1px solid rgba(0,0,0,.25) !important;
	border-bottom: 1px solid rgba(0,0,0,.25) !important;
	border-left: 0 !important;
	border-right: 0 !important;

	text-align: center !important;

	quotes: none !important;
}


/* ---------- REMOVE AUTOMATIC QUOTATION MARKS ---------- */

body.mtf-editorial-blog blockquote::before,
body.mtf-editorial-blog blockquote::after,
body.mtf-editorial-blog blockquote p::before,
body.mtf-editorial-blog blockquote p::after,
body.mtf-editorial-blog .sqs-block-quote blockquote::before,
body.mtf-editorial-blog .sqs-block-quote blockquote::after {
	content: none !important;
	display: none !important;
}


/* ---------- QUOTE TEXT ---------- */

body.mtf-editorial-blog blockquote p,
body.mtf-editorial-blog .sqs-block-quote blockquote {
	font-family: Georgia, "Times New Roman", serif !important;
	font-size: clamp(24px, 3vw, 31px) !important;
	font-style: italic !important;
	font-weight: 400 !important;
	line-height: 1.38 !important;
	text-align: center !important;
	color: #0f0f0f !important;

	margin: 0 !important;
}


/* ---------- QUOTE SOURCE IF EVER USED ---------- */

body.mtf-editorial-blog .sqs-block-quote figcaption,
body.mtf-editorial-blog .sqs-block-quote .source {
	font-family: Arial, Helvetica, sans-serif !important;
	font-size: 11px !important;
	letter-spacing: .12em !important;
	text-transform: uppercase !important;
	text-align: center !important;
	margin-top: 16px !important;
	color: #333333 !important;
}


/* ---------- LINKS ---------- */

body.mtf-editorial-blog .blog-item-content a {
	color: #0f0f0f !important;
	text-decoration-thickness: 1px !important;
	text-underline-offset: 4px !important;
}


/* ---------- SQUARESPACE BLOCK SPACING ---------- */

body.mtf-editorial-blog .blog-item-content .sqs-block {
	padding-top: 4px !important;
	padding-bottom: 4px !important;
}


/* =========================================================
	 MOBILE
	 ========================================================= */

@media screen and (max-width: 767px) {

	body.mtf-editorial-blog .blog-item-wrapper {
		padding-left: 22px !important;
		padding-right: 22px !important;
	}

	body.mtf-editorial-blog .blog-item-header {
		padding-top: 45px !important;
		padding-bottom: 28px !important;
		margin-bottom: 30px !important;
	}

	body.mtf-editorial-blog .blog-item-title,
	body.mtf-editorial-blog .blog-item-title h1,
	body.mtf-editorial-blog h1.entry-title {
		font-size: 42px !important;
		line-height: 1.04 !important;
	}

	body.mtf-editorial-blog .blog-item-content {
		max-width: 100% !important;
	}

	body.mtf-editorial-blog .blog-item-content .sqs-block-html,
	body.mtf-editorial-blog .blog-item-content .sqs-block-html .sqs-block-content,
	body.mtf-editorial-blog .blog-item-content .html-block .sqs-block-content {
		max-width: 100% !important;
	}

	body.mtf-editorial-blog .blog-item-content p {
		font-size: 17px !important;
		line-height: 1.65 !important;
		margin-bottom: 17px !important;
		color: #101010 !important;
	}

	body.mtf-editorial-blog .blog-item-content h2 {
		font-size: 30px !important;
		margin-top: 46px !important;
		padding-top: 28px !important;
	}

	body.mtf-editorial-blog .blog-item-content .sqs-block-quote {
		max-width: 100% !important;
		margin: 38px auto !important;
	}

	body.mtf-editorial-blog blockquote {
		max-width: 100% !important;
		padding: 26px 10px !important;
	}

	body.mtf-editorial-blog blockquote p,
	body.mtf-editorial-blog .sqs-block-quote blockquote {
		font-size: 24px !important;
	}

}

</style>