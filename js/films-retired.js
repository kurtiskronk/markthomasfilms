
/* =========================================================
	 MARK THOMAS FILMS — RETIRED WEDDING FILMS

	 Replaces obsolete video players on specifically listed
	 film pages with their thumbnail and an archive notice.

	 Does not create navigation arrows.
	 ========================================================= */

(function () {
	'use strict';

	window.MTF = window.MTF || {};

	const retiredTitles = [
		'Addison & Austin',
		'Abigail & Christopher',
		'Alexis & Chase',
		'Alexandra & Jesus',
		'Aileen & Ryan',
		'Alexa & Matthew',
		'Ashley & Stephen',
		'Amanda and Bazan',
		'Amanda & Jordan',
		'Amanda & Scott',
		'Amy & John',
		'Anna & Bradley',
		'Clarissa & Seth',
		'Kayle & Lance',
		'Kelly & Alejandro',
		'Kelly & Jason',
		'Colleen & Brent',
		'Anna & Christopher',
		'Ashley & Neil',
		'Aly & Nathan',
		'Grace & Daniel',
		'Henley & Nathan',
		'Janice & Colin',
		'Jeff & Courtney',
		'Jennifer & Gerardo',
		'Jenna & Colton',
		'Jonahlyn & Joe',
		'Katherine & Jacob',
		'Katie & David',
		'Katie & Owen',
		'Katie & Trevor',
		'Katy & Colby',
		'Kelli & Stephen',
		'Kimberly & Justin',
		'Korey & Katie',
		'Kryzta & Fabio',
		'Lauren & Ryan',
		'Madeline and Greg',
		'Ricky & Emily',
		'Anne & Ryan',
		'Aby & Raz',
		'Alessandra & Derek',
		'Brooke & Matt',
		'Bailey & Landon',
		'Courtney & Jeffrey',
		'Craig & Amanda',
		'Desiree & Richie',
		'Emily & John',
		'Emily & Robert',
		'Erin & John',
		'Eva & Ricardo',
		'Fallon & Carl',
		'Gloria & Gabe',
		'Hillary & Michael',
		'DeAnna & Therrion',
		'Bethany & Stuart',
		'Brent & Hillary',
		'Briana & Stephen',
		'Brianne & Matthew',
		'Brittany & Jacoby',
		'Calley & Scott',
		'Candace & Adam',
		'Casey & Ashley',
		'Catalina & Thomas',
		'Christi & Taylor',
		'Rosalie & Jesus',
		'Caitlin & Austin',
		'Chase & Amy',
		'Chasity & Cody',
		'CJ & Keith',
		'Eric & Darling',
		'Fallon & Landry',
		'Heidi & Clayton',
		'Holly & Cade',
		'Jason & Camille',
		'Jennifer & Randy',
		'Jessica & Michael',
		'Jessie & James',
		'Jyoti & Manish',
		'Larkin & Garrett',
		'Latha & Ryan',
		'Tiffany & Jay',
		'Sara & Austin'
	];

	function normalize(value) {
		return String(value || '')
			.trim()
			.replace(/\s+/g, ' ')
			.toLowerCase();
	}

	const retired = new Set(
		retiredTitles.map(normalize)
	);

	function isIndividualFilm() {
		const path = window.location.pathname
			.replace(/\/+$/, '');

		return /^\/films\/(?!tag\/|category\/)[^/]+$/i
			.test(path);
	}

	function getFilmTitle() {
		const heading = document.querySelector(
			'.blog-item-top-wrapper h1.entry-title, ' +
			'.blog-item-top-wrapper h1, ' +
			'.blog-item-wrapper h1.entry-title'
		);

		return heading ? heading.textContent.trim() : '';
	}

	function createNotice(title) {
		const notice = document.createElement('div');
		notice.className = 'mtf-retired-film';
		notice.dataset.mtfRetiredFilm = 'true';

		const imageMeta = document.querySelector(
			'meta[property="og:image"]'
		);

		if (imageMeta && imageMeta.content) {
			const imageWrap = document.createElement('div');
			imageWrap.className = 'mtf-retired-film__image';

			const image = document.createElement('img');
			image.src = imageMeta.content;
			image.alt = title + ' wedding film';
			image.loading = 'eager';

			imageWrap.appendChild(image);
			notice.appendChild(imageWrap);
		}

		const message = document.createElement('div');
		message.className = 'mtf-retired-film__message';

		const heading = document.createElement('h2');
		heading.className = 'mtf-retired-film__heading';
		heading.textContent = 'This Film Has Been Retired';

		const copy = document.createElement('p');
		copy.className = 'mtf-retired-film__copy';
		copy.textContent =
			'Some of our older wedding films have been retired ' +
			'from our online archive. We’ve kept this page as ' +
			'part of the Mark Thomas Films story and wedding archive.';

		message.append(heading, copy);
		notice.appendChild(message);

		return notice;
	}

	function init() {
		if (!isIndividualFilm()) return;

		const title = getFilmTitle();
		if (!retired.has(normalize(title))) return;

		const content = document.querySelector(
			'.blog-item-content'
		);

		if (!content) return;

		// Do not duplicate an existing retired-film notice.
		if (
			content.querySelector(
				'.mtf-retired-film, [data-mtf-retired-film]'
			)
		) {
			return;
		}

		// Prefer replacing the entire native Squarespace
		// video block, including its player and wrapper.
		const videoBlock =
			content.querySelector('.sqs-block-video') ||
			content.querySelector(
				'iframe[src*="vimeo.com"]'
			)?.closest('.sqs-block') ||
			content.querySelector(
				'iframe[src*="youtube.com"]'
			)?.closest('.sqs-block') ||
			content.querySelector('video')?.closest('.sqs-block');

		const notice = createNotice(title);

		if (videoBlock) {
			videoBlock.replaceWith(notice);
		} else {
			// Preserve any other unique content on the page.
			content.prepend(notice);
		}
	}

	window.MTF.filmsRetired = {
		init: init
	};

	if (document.readyState === 'loading') {
		document.addEventListener(
			'DOMContentLoaded',
			init,
			{ once: true }
		);
	} else {
		init();
	}

})();
