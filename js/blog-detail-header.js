
/* =========================================================
	 MARK THOMAS FILMS — BLOG BREADCRUMBS
	 Blog > full article title. Reuses the film bar's appearance
	 without duplicating film metadata or navigation logic.
	 ========================================================= */

(function () {
	'use strict';

	window.MTF = window.MTF || {};

	function isPost() {
		return /^\/blog\/[^/]+\/?$/i.test(
			window.location.pathname
		) && !/^\/blog\/(?:tag|category|page)\//i.test(
			window.location.pathname
		);
	}

	function init() {
		if (!isPost()) return;

		const wrapper = document.querySelector(
			'.blog-item-wrapper'
		);

		if (
			!wrapper ||
			wrapper.querySelector('.mtf-blog-breadcrumbs')
		) {
			return;
		}

		const h1 = wrapper.querySelector(
			'h1.entry-title, .blog-item-title h1, h1'
		);

		if (!h1 || !h1.textContent.trim()) return;

		const nav = document.createElement('nav');

		nav.className = 'mtf-blog-breadcrumbs';
		nav.setAttribute('aria-label', 'Blog breadcrumbs');

		const label = document.createElement('span');

		label.className = 'mtf-blog-breadcrumbs__label';
		label.textContent = 'Navigate to:';

		const list = document.createElement('ol');
		list.className = 'mtf-blog-breadcrumbs__list';

		const blogItem = document.createElement('li');
		blogItem.className = 'mtf-blog-breadcrumbs__item';

		const blogLink = document.createElement('a');
		blogLink.href = '/blog';
		blogLink.textContent = 'Blog';

		blogItem.appendChild(blogLink);

		const currentItem = document.createElement('li');
		currentItem.className = 'mtf-blog-breadcrumbs__item';

		const separator = document.createElement('span');
		separator.className = 'mtf-blog-breadcrumbs__separator';
		separator.setAttribute('aria-hidden', 'true');
		separator.textContent = '›';

		const current = document.createElement('span');

		current.className = 'mtf-blog-breadcrumbs__current';
		current.setAttribute('aria-current', 'page');
		current.textContent = h1.textContent.trim();

		currentItem.append(separator, current);

		list.append(blogItem, currentItem);
		nav.append(label, list);

		wrapper.prepend(nav);

		// Do not inject competing BreadcrumbList schema if another
		// Squarespace or SEO integration has already provided it.
		const hasSchema = Array.from(
			document.querySelectorAll(
				'script[type="application/ld+json"]'
			)
		).some(function (node) {
			return /"BreadcrumbList"/.test(
				node.textContent || ''
			);
		});

		if (!hasSchema) {
			const schema = document.createElement('script');

			schema.type = 'application/ld+json';
			schema.dataset.mtfBlogBreadcrumbSchema = '';

			schema.textContent = JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Blog',
						item: new URL('/blog', location.origin).href
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: h1.textContent.trim(),
						item: location.origin + location.pathname
					}
				]
			}).replace(/</g, '\\u003c');

			document.head.appendChild(schema);
		}
	}

	window.MTF.blogDetailHeader = {
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
