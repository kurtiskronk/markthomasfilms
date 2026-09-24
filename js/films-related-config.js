/* =========================================================
	 MARK THOMAS FILMS
	 RELATED FILMS — CONFIGURATION

	 Controls the recommendation behavior used on
	 individual wedding film pages.

	 Recommendation priority:

	 1. Same primary venue
	 2. Same city
	 3. Same state
	 4. Featured / recent films

	 The related-films module will normally display
	 two recommendations.

	 Featured films are optional. Add the pathname of
	 any film Mark particularly wants prioritized when
	 the recommendation system reaches the general
	 fallback level.

	 Example:
	 '/films/jane-john'

	 Do not include the domain.
	 ========================================================= */

(function () {

	'use strict';


	window.MTF =
		window.MTF || {};


	window.MTF.filmRelatedConfig = {

		/*
		 * Number of related films displayed.
		 */

		maxResults:
			2,


		/*
		 * Featured films.
		 *
		 * These are NOT automatically shown ahead of
		 * venue, city, or state matches.
		 *
		 * They are used as preferred choices when the
		 * recommendation system needs to fall back to
		 * the broader film collection.
		 *
		 * Keep these as Squarespace film pathnames.
		 */

		featured: [

			/*
		 * Examples:
		 *
		 * '/films/couple-name',
		 * '/films/another-couple'
		 */

		],


		/*
		 * Recommendation hierarchy.
		 *
		 * Keeping this here makes the intended behavior
		 * explicit and gives us an easy place to change
		 * priorities later without rewriting the UI.
		 */

		priority: [
			'venue',
			'city',
			'state',
			'all'
		],


		/*
		 * Section labels.
		 */

		eyebrow:
			'CONTINUE EXPLORING',


		headings: {

			venue:
				'More Weddings at {name}',

			city:
				'More Weddings in {name}',

			state:
				'More {name} Wedding Films',

			all:
				'Explore More Wedding Films'

		},


		/*
		 * Link below the recommendations.
		 */

		collectionLink: {

			label:
				'Explore All Wedding Films',

			url:
				'/films'

		}

	};


})();