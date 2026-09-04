/* ==================================================
	 MARK THOMAS FILMS
	 FILM TAG CONTEXT

	 Adds descriptive context to selected venue tag
	 archive pages.

	 Geographic tags such as cities and regions are
	 intentionally excluded.
	 ================================================== */

(function () {

	'use strict';


	window.MTF =
		window.MTF || {};


	window.MTF.filmTagContext = {


		/* ==================================================
			 AMERICAN BANK CENTER
			 ================================================== */

		'american bank center': {

			name:
				'American Bank Center',

			type:
				'venue',

			paragraphs: [

				'American Bank Center provides a distinctive setting for wedding celebrations with the scale and flexibility to accommodate memorable ceremonies, receptions, and large gatherings.',

				'Explore wedding films created at American Bank Center to see how each couple brings their own personality, energy, and story to the venue through cinematic wedding filmmaking.'

			]

		},


		/* ==================================================
			 CHANDELIER OF GRUENE
			 ================================================== */

		'chandelier of gruene': {

			name:
				'Chandelier of Gruene',

			type:
				'venue',

			paragraphs: [

				'Chandelier of Gruene offers a warm Texas Hill Country setting for weddings, creating a beautiful backdrop for both intimate moments and lively celebrations.',

				'Browse wedding films from Chandelier of Gruene to see how different couples, details, and moments come together through cinematic storytelling at this distinctive venue.'

			]

		},


		/* ==================================================
			 HOTEL EMMA
			 ================================================== */

		'hotel emma': {

			name:
				'Hotel Emma',

			type:
				'venue',

			paragraphs: [

				'Hotel Emma brings together historic character, thoughtful design, and an unmistakable sense of place, making it an especially distinctive setting for wedding celebrations.',

				'Explore wedding films created at Hotel Emma to see how the atmosphere, architecture, and personal moments of each wedding translate into a cinematic story unique to the couple.'

			]

		},


		/* ==================================================
			 KENDALL POINT
			 ================================================== */

		'kendall point': {

			name:
				'Kendall Point',

			type:
				'venue',

			paragraphs: [

				'Kendall Point is a memorable Hill Country wedding setting where elegant spaces and expansive surroundings create opportunities for beautiful ceremony, portrait, and reception imagery.',

				'Browse wedding films from Kendall Point to see how different couples make the venue their own and how the emotion, movement, and atmosphere of each celebration come together on film.'

			]

		},


		/* ==================================================
			 PANNA MARIA CATHOLIC CHURCH
			 ================================================== */

		'panna maria catholic church': {

			name:
				'Panna Maria Catholic Church',

			type:
				'venue',

			paragraphs: [

				'Panna Maria Catholic Church provides a meaningful and historic setting for wedding ceremonies, where tradition, family, and the significance of the ceremony itself take center stage.',

				'Explore wedding films featuring ceremonies at Panna Maria Catholic Church to see how these personal and reverent moments become part of the larger story of each wedding day.'

			]

		},


		/* ==================================================
			 PANNA MARIA HALL
			 ================================================== */

		'panna maria hall': {

			name:
				'Panna Maria Hall',

			type:
				'venue',

			paragraphs: [

				'Panna Maria Hall serves as a gathering place for wedding celebrations filled with family, tradition, conversation, dancing, and the spontaneous moments that make a reception memorable.',

				'Browse wedding films featuring Panna Maria Hall to see how each celebration takes on its own character through the people, traditions, and experiences shared throughout the day.'

			]

		},


		/* ==================================================
			 SAN FERNANDO CATHEDRAL
			 ================================================== */

		'san fernando cathedral': {

			name:
				'San Fernando Cathedral',

			type:
				'venue',

			paragraphs: [

				'San Fernando Cathedral provides an extraordinary setting for wedding ceremonies, combining architectural presence, tradition, and a sense of occasion that gives the ceremony a distinct character on film.',

				'Explore wedding films featuring San Fernando Cathedral to see how the beauty of the setting complements the vows, emotions, family connections, and meaningful moments of each wedding day.'

			]

		},


		/* ==================================================
			 SAN FERNANDO EVENT CENTRE
			 ================================================== */

		'san fernando event centre': {

			name:
				'San Fernando Event Centre',

			type:
				'venue',

			paragraphs: [

				'San Fernando Event Centre provides a welcoming setting for wedding receptions and celebrations, giving couples room to bring together family, friends, traditions, and personal details in one memorable evening.',

				'Browse wedding films from San Fernando Event Centre to experience the speeches, dancing, laughter, and unscripted moments that give every reception its own energy and personality.'

			]

		},


		/* ==================================================
			 ST. JOHN LUTHERAN CHURCH
			 ================================================== */

		'st. john lutheran church': {

			name:
				'St. John Lutheran Church',

			type:
				'venue',

			paragraphs: [

				'St. John Lutheran Church offers a traditional and meaningful setting for wedding ceremonies centered on commitment, family, faith, and the moments shared between a couple and the people closest to them.',

				'Explore wedding films featuring ceremonies at St. John Lutheran Church to see how those intimate moments become an important part of the complete story of the wedding day.'

			]

		},


		/* ==================================================
			 ST. JOSEPH’S CATHOLIC CHURCH
			 ================================================== */

		'st. joseph’s catholic church': {

			name:
				'St. Joseph’s Catholic Church',

			type:
				'venue',

			paragraphs: [

				'St. Joseph’s Catholic Church provides a reverent and traditional setting for wedding ceremonies, where the significance of the vows and the presence of family and friends create some of the most meaningful moments of the day.',

				'Browse wedding films featuring St. Joseph’s Catholic Church to see how the ceremony, traditions, and emotions of each couple become part of a timeless cinematic wedding story.'

			]

		},


		/* ==================================================
			 THE OAKS AT BOERNE
			 ================================================== */

		'the oaks at boerne': {

			name:
				'The Oaks at Boerne',

			type:
				'venue',

			paragraphs: [

				'The Oaks at Boerne offers a relaxed Hill Country setting for weddings where natural surroundings and thoughtfully designed celebration spaces create a beautiful backdrop for the day.',

				'Explore wedding films from The Oaks at Boerne to see how ceremonies, portraits, receptions, and candid moments unfold differently for every couple at this distinctive venue.'

			]

		},


		/* ==================================================
			 THE PRESERVE AT CANYON LAKE
			 ================================================== */

		'the preserve at canyon lake': {

			name:
				'The Preserve at Canyon Lake',

			type:
				'venue',

			paragraphs: [

				'The Preserve at Canyon Lake offers a scenic setting for wedding celebrations where the surrounding landscape becomes part of the visual character of the day.',

				'Browse wedding films from The Preserve at Canyon Lake to experience how each couple, celebration, and collection of meaningful moments comes together through cinematic storytelling.'

			]

		},


		/* ==================================================
			 THE RED BERRY ESTATE
			 ================================================== */

		'the red berry estate': {

			name:
				'The Red Berry Estate',

			type:
				'venue',

			paragraphs: [

				'The Red Berry Estate offers an elegant setting for weddings where refined spaces, beautiful surroundings, and carefully planned details create a strong visual backdrop for the celebration.',

				'Explore wedding films from The Red Berry Estate to see how different couples transform the venue through their own style, relationships, traditions, and unforgettable moments.'

			]

		}

	};


	/* ==================================================
		 ALIASES

		 Protect against straight-versus-curly apostrophe
		 differences in Squarespace tag URLs or titles.
		 ================================================== */

	window.MTF.filmTagContext[
		"st. joseph's catholic church"
	] =
		window.MTF.filmTagContext[
			'st. joseph’s catholic church'
		];


})();