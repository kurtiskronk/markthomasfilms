
/* =========================================================
	 MARK THOMAS FILMS
	 BLOG SERIES HEADER

	 Moves the optional series label from the custom
	 article HTML to above Squarespace's native H1.

	 Articles without a series label are unaffected.
	 ========================================================= */

(function () {
	'use strict';

	function positionSeriesHeader() {
		const wrapper = document.querySelector(
			'.blog-item-wrapper'
		);

		if (!wrapper) return;

		const article = wrapper.querySelector(
			'.mtf-editorial-article'
		);

		const header = wrapper.querySelector(
			'.blog-item-top-wrapper'
		);

		if (!article || !header) return;

		const title = header.querySelector(
			'.blog-item-title'
		);

		const series = article.querySelector(
			':scope > .mtf-editorial-eyebrow'
		);

		if (!title || !series) return;

		series.classList.add('mtf-multi-part-series');

		header.insertBefore(series, title);
	}

	function init() {
		if (
			!document.documentElement.classList.contains(
				'mtf-editorial-blog'
			)
		) {
			return;
		}

		positionSeriesHeader();
	}

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
