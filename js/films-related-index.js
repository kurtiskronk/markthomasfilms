
/* =========================================================
	 MARK THOMAS FILMS
	 RELATED FILMS — FILM INDEX

	 Catalog of published wedding films used to generate
	 related-film recommendations.

	 Each film contains:

	 url:
		 The film's Squarespace pathname.

	 title:
		 The couple's names, as displayed on the website.

	 published:
		 Publication date in YYYY-MM-DD format.

	 thumbnail:
		 URL of the image displayed on the related-film card.

	 tags:
		 The film's existing Squarespace tags, in order:
		 venue(s), city, state.

	 IMPORTANT:
	 - Include every published film.
	 - Do not include drafts or unpublished films.
	 - Multiple venues should all be included in tags.
	 - Do not invent missing dates or locations.
	 - Featured selections belong in
		 films-related-config.js, not here.

	 This index will be populated from Squarespace.
	 ========================================================= */

(function () {

		'use strict';


		window.MTF =
				window.MTF || {};


		window.MTF.filmIndex = {

				schemaVersion:
						1,


				/*
				 * Updated when the catalog is regenerated.
				 *
				 * Example: '2026-09-24'
				 */

				generatedAt:
						null,


				/*
				 * Published film records.
				 *
				 * Each record follows this structure:
				 *
				 * {
				 *     url: '/films/actual-film-slug',
				 *
				 *     title: 'Couple Names',
				 *
				 *     published: '2026-09-01',
				 *
				 *     thumbnail: 'ACTUAL_IMAGE_URL',
				 *
				 *     tags: [
				 *         'Reception Venue',
				 *         'Ceremony Venue',
				 *         'Boerne',
				 *         'TX'
				 *     ]
				 * }
				 *
				 * The record above is illustrative only.
				 * Actual entries will be generated from
				 * published Squarespace films.
				 */

				films: []

		};


})();