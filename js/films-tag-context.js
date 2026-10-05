/* ==================================================
	 MARK THOMAS FILMS
	 FILM TAG CONTEXT

	 Adds descriptive, SEO-friendly context to all
	 film tag archive pages.

	 Includes:
	 - Wedding venues
	 - Churches
	 - Cities and communities
	 - Regional/location tags
	 - Private ranch settings

	 Each tag receives its own unique descriptive
	 content rather than duplicated template copy.
	 ================================================== */

(function () {
'use strict';
window.MTF = window.MTF || {};


/* ==================================================
	 AUTHORITY PAGE DEFAULTS
	 ================================================== */

/* Used whenever header.heroVideoUrl is blank or omitted. */
window.MTF.defaultFilmHeroVideoUrl =
	'';

/* ==================================================
	 TAG / AUTHORITY PAGE TEMPLATE

	 Every tag has one concise paragraph in header.paragraph.
	 There is no separate top-level tag prose.

	 No footer = standard tag page.
	 footer present = expanded authority page below the film grid.

	 Blank heroVideoUrl = shared default video above.
	 Category context may continue using paragraphs arrays.
	 ================================================== */

// 'tag-name': {
// 	name:	'Display Name',
// 	type:	'venue',
// 	header: {
// 		eyebrow: 'VENUE',
// 		title: 'Display Name Wedding Videographer',
// 		subtitle: 'Wedding Films & Photography at Display Name',
// 		heroVideoUrl: '',
// 		paragraph: 'One concise, tag-specific introduction for the page header.',
// 		galleryTitle: 'Wedding Films at Display Name'
// 	},
// 	footer: {
// 		sections: [
// 			{
// 				heading: '',
// 				paragraphs: []
// 			}
// 		],
// 		cta: {
// 			heading: '',
// 			paragraphs: [],
// 			buttonText: '',
// 			buttonUrl: ''
// 		}
// 	}
// },

window.MTF.filmCategoryContext = {

'weddings': {
	name:	'Weddings',
	paragraphs: [
		'Explore wedding films by Mark Thomas Films featuring real couples, ceremonies, receptions, traditions, and celebrations throughout San Antonio, the Texas Hill Country, South Texas, Central Texas, and destinations across the state. Each film preserves the atmosphere of the wedding day along with the relationships, emotions, voices, and unscripted moments that make every celebration different.',
		'Browse the wedding film collection by venue or city to discover celebrations at churches, ranches, hotels, estates, event venues, private properties, and other distinctive Texas wedding locations. These films offer couples a look at both the places Mark Thomas Films has worked and the cinematic storytelling used to preserve each wedding day.'
	]
}
}

window.MTF.filmTagContext = {

/* ==================================================
	ALAMO HEIGHTS UNITED METHODIST CHURCH
	================================================== */

'alamo heights united methodist church': {
	name:	'Alamo Heights United Methodist Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Alamo Heights United Methodist Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Alamo Heights United Methodist Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Alamo Heights United Methodist Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Alamo Heights United Methodist Church'
	}
},

/* ==================================================
	AMERICAN BANK CENTER
	================================================== */

'american bank center': {
	name:	'American Bank Center',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'American Bank Center Wedding Videographer',
		subtitle: 'Wedding Films & Photography at American Bank Center',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at American Bank Center, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at American Bank Center'
	}
},

/* ==================================================
	AUSTIN
	================================================== */

'austin': {
	name:	'Austin',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Austin Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Austin, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Austin, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Austin'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Austin Weddings Matters',
				paragraphs: [
					'Austin wedding days can move between very different environments: hotels and getting-ready spaces, churches or outdoor ceremonies, portraits around the city, and receptions that may continue well into the evening. Planning for travel, changing light, professional audio, and the pace of each location helps us keep coverage efficient without making the wedding feel overproduced.',
					'Our approach is built around preparation before the day and observation during it. We want the technical decisions to support the story quietly so the couple can stay present while we preserve the people, voices, emotions, and interactions that give the celebration its meaning.'
				]
			},
			{
				heading: 'Austin Wedding Stories',
				paragraphs: [
					'Austin offers a broad range of wedding styles, from formal city celebrations to relaxed outdoor gatherings and Hill Country weddings just outside the urban core. That variety is useful for couples exploring our work because it shows how the same story-first approach adapts to very different settings.',
					'Wherever the celebration takes place, we use the location as context rather than the subject of the film. The vows, relationships, family voices, speeches, reactions, and unplanned moments remain at the center.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in Austin?',
			paragraphs: [
				'If you’re planning an Austin wedding, we’d love to hear where you are celebrating and what matters most to you. Mark Thomas Films offers story-driven wedding videography and photography for celebrations throughout Austin and Central Texas.'
			]
		}
	}
},

/* ==================================================
	BANDERA
	================================================== */

'bandera': {
	name:	'Bandera',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Bandera Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Bandera, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Bandera, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Bandera'
	}
},

/* ==================================================
	BETHANY LUTHERAN CHURCH
	================================================== */

'bethany lutheran church': {
	name:	'Bethany Lutheran Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Bethany Lutheran Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Bethany Lutheran Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Bethany Lutheran Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Bethany Lutheran Church'
	}
},

/* ==================================================
	BLESSED SACRAMENT CATHOLIC CHURCH
	================================================== */

'blessed sacrament catholic church': {
	name:	'Blessed Sacrament Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Blessed Sacrament Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Blessed Sacrament Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Blessed Sacrament Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Blessed Sacrament Catholic Church'
	}
},

/* ==================================================
	BOERNE
	================================================== */

'boerne': {
	name:	'Boerne',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Boerne Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Boerne, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Boerne, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Boerne'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Weddings in Boerne Matters',
				paragraphs: [
					'Boerne weddings often bring together Hill Country venues, churches, outdoor ceremony spaces, changing light, and timelines that move between multiple locations. Experience in the area matters because every venue presents its own opportunities and challenges for camera placement, audio, lighting, and coverage.',
					'Mark Thomas Films has filmed weddings throughout Boerne at venues and churches including Kendall Point, The Oaks at Boerne, Eagle Dancer Ranch, Dos Palomas Ranch, St. Peter the Apostle Catholic Church, and St. John Lutheran Church. That familiarity helps us work efficiently, anticipate the flow of the day, and stay focused on the moments that matter most.'
				]
			},
			{
				heading: 'Boerne Wedding Venues We Know',
				paragraphs: [
					'Over the years, Mark Thomas Films has filmed weddings at a wide range of venues and churches throughout Boerne and the surrounding Texas Hill Country. That experience gives us a strong understanding of how different locations affect coverage, timing, lighting, audio, and the overall flow of a wedding day.',
					'Boerne venues and churches we have filmed include Kendall Point, The Oaks at Boerne, Eagle Dancer Ranch, Dos Palomas Ranch, St. Peter the Apostle Catholic Church, and St. John Lutheran Church.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in Boerne?',
			paragraphs: [
				'If you’re planning a wedding in Boerne or the surrounding Texas Hill Country, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography built around the people, moments, and memories that make your day your own.'
			]
		}
	}
},

/* ==================================================
	BRACHES HOUSE
	================================================== */

'braches house': {
	name:	'Braches House',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Braches House Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Braches House',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Braches House, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Braches House'
	}
},

/* ==================================================
	BUDA
	================================================== */

'buda': {
	name:	'Buda',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Buda Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Buda, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Buda, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Buda'
	}
},

/* ==================================================
	BULVERDE
	================================================== */

'bulverde': {
	name:	'Bulverde',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Bulverde Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Bulverde, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Bulverde, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Bulverde'
	}
},

/* ==================================================
	CANYON LAKE
	================================================== */

'canyon lake': {
	name:	'Canyon Lake',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Canyon Lake Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Canyon Lake, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Canyon Lake, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Canyon Lake'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Weddings in Canyon Lake Matters',
				paragraphs: [
					'Wedding days in Canyon Lake often make full use of the surrounding Hill Country setting, and experience helps us prepare for the transitions that happen throughout the day. We plan for changing outdoor light, ceremony audio, portraits, reception coverage, and the movement between spaces so we can stay focused on the people and moments rather than reacting to the venue for the first time.',
					'Our Canyon Lake weddings have taken place in two distinctly different settings. The Preserve at Canyon Lake offers its own ceremony and reception flow, while Willow Ridge Weddings & Events brings an elevated outdoor ceremony setting and an indoor reception space. Knowing both gives us useful experience while still allowing every couple’s wedding to feel entirely their own.'
				]
			},
			{
				heading: 'Canyon Lake Wedding Venues We Know',
				paragraphs: [
					'Our Canyon Lake wedding portfolio includes The Preserve at Canyon Lake and Willow Ridge Weddings & Events. Together, these weddings give couples real examples of celebrations in different Canyon Lake settings rather than a single version of what a Hill Country wedding can look and feel like.',
					'At Willow Ridge, we have documented elevated outdoor ceremonies, indoor receptions, and wedding weekends with guests staying nearby. At The Preserve, our portfolio includes multiple couples and a range of personal, family-centered wedding stories. The setting matters, but our films remain centered on the vows, voices, relationships, reactions, and moments that make each wedding personal.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in Canyon Lake?',
			paragraphs: [
				'If you’re planning a wedding in Canyon Lake or the surrounding Texas Hill Country, we’d love to hear what you have in mind. Mark Thomas Films offers wedding videography and photography designed around real moments, natural emotion, and the people who matter most.'
			]
		}
	}
},

/* ==================================================
	CANYON SPRINGS GOLF CLUB
	================================================== */

'canyon springs golf club': {
	name:	'Canyon Springs Golf Club',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Canyon Springs Golf Club Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Canyon Springs Golf Club',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Canyon Springs Golf Club, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Canyon Springs Golf Club'
	}
},

/* ==================================================
	CASTROVILLE
	================================================== */

'castroville': {
	name:	'Castroville',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Castroville Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Castroville, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Castroville, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Castroville'
	}
},

/* ==================================================
	CESTOHOWA
	================================================== */

'cestohowa': {
	name:	'Cestohowa',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Cestohowa Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Cestohowa, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Cestohowa, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Cestohowa'
	}
},

/* ==================================================
	CESTOHOWA HALL
	================================================== */

'cestohowa hall': {
	name:	'Cestohowa Hall',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Cestohowa Hall Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Cestohowa Hall',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented wedding receptions and celebrations at Cestohowa Hall, preserving entrances, speeches, family traditions, first dances, reception energy, and the spontaneous interactions that happen once everyone is together. Our approach combines professional audio with unobtrusive coverage so the personality of the celebration comes through naturally.',
		galleryTitle: 'Wedding Films at Cestohowa Hall'
	}
},

/* ==================================================
	CHANDELIER OF GRUENE
	================================================== */

'chandelier of gruene': {
	name:	'Chandelier of Gruene',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Chandelier of Gruene Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Chandelier of Gruene',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Chandelier of Gruene, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at The Chandelier of Gruene'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience at The Chandelier of Gruene Matters',
				paragraphs: [
					'Knowing the property before the wedding day allows us to anticipate how coverage will move between preparation, the chapel, portraits, outdoor gathering spaces, and the reception. That familiarity helps with camera placement, professional audio, changing natural light, and the transitions that keep the day moving without making the couple feel like they are being directed through a production.',
					'The venue gives couples several very different visual settings within one wedding day, from the chapel and mature oak trees to outdoor portrait locations and the indoor reception space. Our job is to use those surroundings naturally while keeping the people, relationships, vows, speeches, reactions, and emotions at the center of the film.'
				]
			},
			{
				heading: 'Weddings We’ve Filmed at The Chandelier of Gruene',
				paragraphs: [
					'Our Chandelier of Gruene portfolio includes multiple couples and a variety of wedding stories. Across those celebrations, we have filmed ceremonies in the venue’s distinctive chapel, portraits around the property and beneath the oak trees, receptions filled with family and friends, and evening moments when the changing Hill Country light becomes part of the atmosphere.',
					'Those films give couples considering The Chandelier a collection of real wedding days to explore rather than a single example. The venue remains recognizable from film to film, but the personalities, timelines, traditions, families, and emotions make every celebration different.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding at The Chandelier of Gruene?',
			paragraphs: [
				'If you’re planning your wedding at The Chandelier of Gruene, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography built around real moments, natural emotion, and the people whose voices and relationships make the day meaningful.'
			]
		}
	}
},

/* ==================================================
	COMFORT
	================================================== */

'comfort': {
	name:	'Comfort',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Comfort Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Comfort, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Comfort, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Comfort'
	}
},

/* ==================================================
	CONCAN
	================================================== */

'concan': {
	name:	'ConCan',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'ConCan Wedding Videographer',
		subtitle: 'Wedding Films & Photography in ConCan, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in ConCan, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in ConCan'
	}
},

/* ==================================================
	CONCORDIA LUTHERAN CHURCH
	================================================== */

'concordia lutheran church': {
	name:	'Concordia Lutheran Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Concordia Lutheran Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Concordia Lutheran Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Concordia Lutheran Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Concordia Lutheran Church'
	}
},

/* ==================================================
	CORPUS CHRISTI
	================================================== */

'corpus christi': {
	name:	'Corpus Christi',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Corpus Christi Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Corpus Christi, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Corpus Christi, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Corpus Christi'
	}
},

/* ==================================================
	DEVILS RIVER DISTILLERY
	================================================== */

'devils river distillery': {
	name:	'Devils River Distillery',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Devils River Distillery Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Devils River Distillery',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Devils River Distillery, planning carefully for outdoor light, ceremony audio, portraits, reception coverage, and the transitions between different parts of the property. We use the setting naturally while keeping the vows, relationships, reactions, and unscripted moments at the center of the film.',
		galleryTitle: 'Wedding Films at Devils River Distillery'
	}
},

/* ==================================================
	DOS PALOMAS RANCH
	================================================== */

'dos palomas ranch': {
	name:	'Dos Palomas Ranch',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Dos Palomas Ranch Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Dos Palomas Ranch',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Dos Palomas Ranch, using the ranch setting and surrounding landscape naturally while planning for ceremony audio, changing light, portraits, and the flow into the reception. Our approach keeps the people, relationships, vows, and spontaneous moments at the center of the story.',
		galleryTitle: 'Wedding Films at Dos Palomas Ranch'
	}
},

/* ==================================================
	EAGLE DANCER RANCH
	================================================== */

'eagle dancer ranch': {
	name:	'Eagle Dancer Ranch',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Eagle Dancer Ranch Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Eagle Dancer Ranch',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Eagle Dancer Ranch, using the ranch setting and surrounding landscape naturally while planning for ceremony audio, changing light, portraits, and the flow into the reception. Our approach keeps the people, relationships, vows, and spontaneous moments at the center of the story.',
		galleryTitle: 'Wedding Films at Eagle Dancer Ranch'
	}
},

/* ==================================================
	ÉILAN HOTEL & SPA
	================================================== */

'éilan hotel & spa': {
	name:	'Éilan Hotel & Spa',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Éilan Hotel & Spa Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Éilan Hotel & Spa',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings and wedding events at Éilan Hotel & Spa, documenting preparations, portraits, ceremonies, receptions, speeches, and the candid interactions that connect the day. We plan coverage around the property and timeline so the setting supports the story while the people and relationships remain the focus.',
		galleryTitle: 'Wedding Films at Éilan Hotel & Spa'
	}
},

/* ==================================================
	FALLS CITY
	================================================== */

'falls city': {
	name:	'Falls City',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Falls City Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Falls City, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Falls City, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Falls City'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Falls City Weddings Matters',
				paragraphs: [
					'A traditional church wedding has a different rhythm from an all-in-one venue celebration. Experience with Falls City weddings helps us plan carefully for ceremony coverage, professional audio, camera placement, family moments, portraits, travel between locations, and the transition from a reverent church ceremony into the reception celebration.',
					'Our goal is to preserve more than the schedule of events. The vows, familiar voices, family relationships, traditions, and reactions throughout the day are what give these weddings their meaning. Careful preparation allows us to document those moments without disrupting the ceremony or pulling attention away from the people experiencing them.'
				]
			},
			{
				heading: 'Falls City Church Weddings and Reception Celebrations',
				paragraphs: [
					'Our Falls City portfolio includes multiple ceremonies at Nativity of the Blessed Virgin Mary Catholic Church. After those ceremonies, the weddings we have documented have continued to different reception destinations, including Panna Maria Hall, Kosciusko Hall, and Cestohowa Hall.',
					'Those reception locations should not be treated as if they are all located in Falls City. What connects these films is the Falls City ceremony and the church-to-reception wedding-day pattern. That experience helps us understand how to plan coverage when a celebration moves between communities and locations.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in Falls City?',
			paragraphs: [
				'If you’re planning a Falls City wedding, we’d love to learn about your ceremony, reception plans, family traditions, and the moments that matter most to you. Mark Thomas Films creates story-driven wedding films and photography that preserve not only how the day looked, but the voices and emotions that made it yours.'
			]
		}
	}
},

/* ==================================================
	FALLS CITY COMMUNITY HALL
	================================================== */

'falls city community hall': {
	name:	'Falls City Community Hall',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Falls City Community Hall Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Falls City Community Hall',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented wedding receptions and celebrations at Falls City Community Hall, preserving entrances, speeches, family traditions, first dances, reception energy, and the spontaneous interactions that happen once everyone is together. Our approach combines professional audio with unobtrusive coverage so the personality of the celebration comes through naturally.',
		galleryTitle: 'Wedding Films at Falls City Community Hall'
	}
},

/* ==================================================
	FIRST BAPTIST CHURCH OF FLORESVILLE
	================================================== */

'first baptist church of floresville': {
	name:	'First Baptist Church of Floresville',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'First Baptist Church of Floresville Wedding Videographer',
		subtitle: 'Wedding Films & Photography at First Baptist Church of Floresville',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at First Baptist Church of Floresville, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at First Baptist Church of Floresville'
	}
},

/* ==================================================
	FREDERICKSBURG
	================================================== */

'fredericksburg': {
	name:	'Fredericksburg',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Fredericksburg Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Fredericksburg, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Fredericksburg, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Fredericksburg'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Fredericksburg Weddings Matters',
				paragraphs: [
					'Fredericksburg weddings often depend heavily on the surrounding landscape and natural light, with parts of the day taking place outdoors and others moving into reception spaces after sunset. Careful planning for ceremony audio, changing light, portraits, weather, and transitions between spaces helps us work efficiently without interrupting the experience of the wedding.',
					'Destination-style timelines can also mean guests and wedding events are spread across several locations during the weekend. We plan around the actual schedule and priorities of the couple so coverage remains coordinated while leaving room for spontaneous moments and time with family.'
				]
			},
			{
				heading: 'Fredericksburg and Texas Hill Country Wedding Stories',
				paragraphs: [
					'One of the strengths of a Fredericksburg wedding is that the setting can feel distinctly Hill Country without requiring every celebration to look the same. Ranch properties, vineyards, historic spaces, churches, and outdoor venues each create a different rhythm and visual character.',
					'Our films use those surroundings naturally while keeping the couple and the people around them at the center. The location establishes the atmosphere; the voices, relationships, reactions, traditions, and emotions tell the story.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in Fredericksburg?',
			paragraphs: [
				'If you’re planning a wedding in Fredericksburg or the surrounding Texas Hill Country, we’d love to hear about the setting, timeline, and people you want to remember most. Mark Thomas Films offers story-driven wedding videography and photography for celebrations throughout the region.'
			]
		}
	}
},

/* ==================================================
	FRIO RIVER
	================================================== */

'frio river': {
	name:	'Frio River',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Frio River Wedding Videographer',
		subtitle: 'Wedding Films & Photography Along the Frio River in Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings along the Frio River, using the surrounding Hill Country landscape naturally while planning carefully for outdoor light, ceremony audio, weather, and the movement of the day. Our films stay centered on the vows, voices, relationships, and unscripted moments that make each celebration personal.',
		galleryTitle: 'Wedding Films Along the Frio River'
	}
},

/* ==================================================
	GARDEN RIDGE
	================================================== */

'garden ridge': {
	name:	'Garden Ridge',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Garden Ridge Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Garden Ridge, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Garden Ridge, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Garden Ridge'
	}
},

/* ==================================================
	GEORGE WEST
	================================================== */

'george west': {
	name:	'George West',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'George West Wedding Videographer',
		subtitle: 'Wedding Films & Photography in George West, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in George West, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in George West'
	}
},

/* ==================================================
	GEORGETOWN
	================================================== */

'georgetown': {
	name:	'Georgetown',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Georgetown Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Georgetown, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Georgetown, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Georgetown'
	}
},

/* ==================================================
	GERONIMO OAKS
	================================================== */

'geronimo oaks': {
	name:	'Geronimo Oaks',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Geronimo Oaks Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Geronimo Oaks',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Geronimo Oaks, planning carefully for outdoor light, ceremony audio, portraits, reception coverage, and the transitions between different parts of the property. We use the setting naturally while keeping the vows, relationships, reactions, and unscripted moments at the center of the film.',
		galleryTitle: 'Wedding Films at Geronimo Oaks'
	}
},

/* ==================================================
	GONZALES
	================================================== */

'gonzales': {
	name:	'Gonzales',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Gonzales Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Gonzales, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Gonzales, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Gonzales'
	}
},

/* ==================================================
	HAYES HOLLOW AT HIDDEN FALLS
	================================================== */

'hayes hollow at hidden falls': {
	name:	'Hayes Hollow at Hidden Falls',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Hayes Hollow at Hidden Falls Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Hayes Hollow at Hidden Falls',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Hayes Hollow at Hidden Falls, planning carefully for outdoor light, ceremony audio, portraits, reception coverage, and the transitions between different parts of the property. We use the setting naturally while keeping the vows, relationships, reactions, and unscripted moments at the center of the film.',
		galleryTitle: 'Wedding Films at Hayes Hollow at Hidden Falls'
	}
},

/* ==================================================
	HELOTES
	================================================== */

'helotes': {
	name:	'Helotes',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Helotes Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Helotes, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Helotes, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Helotes'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Helotes Weddings Matters',
				paragraphs: [
					'Helotes wedding days can combine outdoor Hill Country surroundings with church ceremonies, reception spaces, and timelines that move between locations. Planning for professional audio, natural light, portraits, travel, and reception coverage helps us stay ready for the important moments without directing the day more than necessary.',
					'The proximity to San Antonio also means wedding plans can easily cross city and community lines. We build coverage around the actual ceremony and reception locations rather than treating the tag on the page as a boundary.'
				]
			},
			{
				heading: 'Helotes Wedding Stories',
				paragraphs: [
					'Helotes gives couples a useful balance between San Antonio accessibility and a more open Hill Country atmosphere. That can produce wedding days that feel very different depending on the property, ceremony traditions, season, and family involved.',
					'Our approach is to let those differences remain visible in the film while consistently preserving the voices, emotions, relationships, and unscripted interactions that couples will want to revisit later.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in Helotes?',
			paragraphs: [
				'If you’re planning a wedding in Helotes or the surrounding San Antonio and Hill Country area, we’d love to hear what you have in mind. Mark Thomas Films offers wedding videography and photography built around real moments, natural emotion, and the people who matter most.'
			]
		}
	}
},

/* ==================================================
	HOFMANN RANCH
	================================================== */

'hofmann ranch': {
	name:	'Hofmann Ranch',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Hofmann Ranch Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Hofmann Ranch',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Hofmann Ranch, using the ranch setting and surrounding landscape naturally while planning for ceremony audio, changing light, portraits, and the flow into the reception. Our approach keeps the people, relationships, vows, and spontaneous moments at the center of the story.',
		galleryTitle: 'Wedding Films at Hofmann Ranch'
	}
},

/* ==================================================
	HOLY SPIRIT CATHOLIC CHURCH
	================================================== */

'holy spirit catholic church': {
	name:	'Holy Spirit Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Holy Spirit Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Holy Spirit Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Holy Spirit Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Holy Spirit Catholic Church'
	}
},

/* ==================================================
	HOLY TRINITY CATHOLIC CHURCH
	================================================== */

'holy trinity catholic church': {
	name:	'Holy Trinity Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Holy Trinity Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Holy Trinity Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Holy Trinity Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Holy Trinity Catholic Church'
	}
},

/* ==================================================
	HOTEL EMMA
	================================================== */

'hotel emma': {
	name:	'Hotel Emma',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Hotel Emma Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Hotel Emma',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings and wedding events at Hotel Emma, documenting preparations, portraits, ceremonies, receptions, speeches, and the candid interactions that connect the day. We plan coverage around the property and timeline so the setting supports the story while the people and relationships remain the focus.',
		galleryTitle: 'Wedding Films at Hotel Emma'
	}
},

/* ==================================================
	HOTEL VALENCIA RIVERWALK
	================================================== */

'hotel valencia riverwalk': {
	name:	'Hotel Valencia Riverwalk',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Hotel Valencia Riverwalk Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Hotel Valencia Riverwalk',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings and wedding events at Hotel Valencia Riverwalk, documenting preparations, portraits, ceremonies, receptions, speeches, and the candid interactions that connect the day. We plan coverage around the property and timeline so the setting supports the story while the people and relationships remain the focus.',
		galleryTitle: 'Wedding Films at Hotel Valencia Riverwalk'
	}
},

/* ==================================================
	HYATT REGENCY AUSTIN
	================================================== */

'hyatt regency austin': {
	name:	'Hyatt Regency Austin',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Hyatt Regency Austin Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Hyatt Regency Austin',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings and wedding events at Hyatt Regency Austin, documenting preparations, portraits, ceremonies, receptions, speeches, and the candid interactions that connect the day. We plan coverage around the property and timeline so the setting supports the story while the people and relationships remain the focus.',
		galleryTitle: 'Wedding Films at Hyatt Regency Austin'
	}
},

/* ==================================================
	IMMACULATE CONCEPTION OF THE BLESSED
	VIRGIN MARY CATHOLIC CHURCH
	================================================== */

'immaculate conception of the blessed virgin mary catholic church': {
	name:	'Immaculate Conception of the Blessed Virgin Mary Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Immaculate Conception of the Blessed Virgin Mary Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Immaculate Conception of the Blessed Virgin Mary Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Immaculate Conception of the Blessed Virgin Mary Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Immaculate Conception of the Blessed Virgin Mary Catholic Church'
	}
},

/* ==================================================
	JACK GUENTHER PAVILION
	================================================== */

'jack guenther pavilion': {
	name:	'Jack Guenther Pavilion',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Jack Guenther Pavilion Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Jack Guenther Pavilion',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Jack Guenther Pavilion, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Jack Guenther Pavilion'
	}
},

/* ==================================================
	KENDALL POINT
	================================================== */

'kendall point': {
	name:	'Kendall Point',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Kendall Point Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Kendall Point in Boerne, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed more than 40 weddings at Kendall Point, giving us firsthand experience with the venue, its outdoor ceremony spaces, covered porches, ballroom, and the flow of a full wedding day. Our approach focuses on real moments, natural emotion, and the people and voices that make each celebration unique.',
		galleryTitle: 'Wedding Films at Kendall Point'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Weddings at Kendall Point Matters',
				paragraphs: [
					'Knowing a venue well makes a real difference on a wedding day. After filming many weddings at Kendall Point, we are familiar with how the property flows from getting ready through the ceremony, portraits, cocktail hour, and reception. That familiarity helps us anticipate lighting changes, camera placement, audio needs, and the transitions that keep coverage moving naturally without making the day feel staged.',
					'Every wedding at Kendall Point is still different. Some couples hold their ceremony on the property, while others arrive after a church ceremony elsewhere in Boerne. Our familiarity with the venue gives us a strong starting point while leaving room for each wedding to unfold in its own way.'
				]
			},
			{
				heading: 'Weddings We’ve Filmed at Kendall Point',
				paragraphs: [
					'Our Kendall Point archive includes weddings with ceremonies on the property as well as celebrations that began at churches elsewhere in Boerne before continuing at Kendall Point. Across those films, we have documented different timelines, seasons, ceremony setups, reception styles, family traditions, and ways couples use the property.',
					'That depth of experience is useful because it lets couples see real weddings at Kendall Point instead of a single styled example. The setting may be familiar to us, but the story remains centered on the people, voices, relationships, and moments that make each wedding personal.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding at Kendall Point?',
			paragraphs: [
				'If you’re planning a wedding at Kendall Point, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography built around real moments, natural emotion, and the people who matter most.'
			]
			/* Optional buttonText and VERIFIED buttonUrl may be added here. */
		}
	}
},

/* ==================================================
	KARNES CITY
	================================================== */

'karnes city': {
	name:	'Karnes City',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Karnes City Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Karnes City, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Karnes City, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Karnes City'
	}
},

/* ==================================================
	KING RANCH MUSEUM
	================================================== */

'king ranch museum': {
	name:	'King Ranch Museum',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'King Ranch Museum Wedding Videographer',
		subtitle: 'Wedding Films & Photography at King Ranch Museum',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at King Ranch Museum, using the ranch setting and surrounding landscape naturally while planning for ceremony audio, changing light, portraits, and the flow into the reception. Our approach keeps the people, relationships, vows, and spontaneous moments at the center of the story.',
		galleryTitle: 'Wedding Films at King Ranch Museum'
	}
},

/* ==================================================
	KERRVILLE
	================================================== */

'kerrville': {
	name:	'Kerrville',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Kerrville Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Kerrville, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Kerrville, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Kerrville'
	}
},

/* ==================================================
	KOSCIUSKO HALL
	================================================== */

'kosciusko hall': {
	name:	'Kosciusko Hall',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Kosciusko Hall Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Kosciusko Hall',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented wedding receptions and celebrations at Kosciusko Hall, preserving entrances, speeches, family traditions, first dances, reception energy, and the spontaneous interactions that happen once everyone is together. Our approach combines professional audio with unobtrusive coverage so the personality of the celebration comes through naturally.',
		galleryTitle: 'Wedding Films at Kosciusko Hall'
	}
},

/* ==================================================
	LA CANTERA RESORT & SPA
	================================================== */

'la cantera resort & spa': {
	name:	'La Cantera Resort & Spa',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'La Cantera Resort & Spa Wedding Videographer',
		subtitle: 'Wedding Films & Photography at La Cantera Resort & Spa',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings and wedding events at La Cantera Resort & Spa, documenting preparations, portraits, ceremonies, receptions, speeches, and the candid interactions that connect the day. We plan coverage around the property and timeline so the setting supports the story while the people and relationships remain the focus.',
		galleryTitle: 'Wedding Films at La Cantera Resort & Spa'
	}
},

/* ==================================================
	LA VERNIA
	================================================== */

'la vernia': {
	name:	'La Vernia',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'La Vernia Wedding Videographer',
		subtitle: 'Wedding Films & Photography in La Vernia, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in La Vernia, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in La Vernia'
	}
},

/* ==================================================
	LE SAN MICHELE
	================================================== */

'le san michele': {
	name:	'Le San Michele',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Le San Michele Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Le San Michele',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Le San Michele, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Le San Michele'
	}
},

/* ==================================================
	LOS ENCINOS
	================================================== */

'los encinos': {
	name:	'Los Encinos',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Los Encinos Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Los Encinos',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Los Encinos, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Los Encinos'
	}
},

/* ==================================================
	LOST MISSION
	================================================== */

'lost mission': {
	name:	'Lost Mission',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Lost Mission Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Lost Mission',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Lost Mission, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Lost Mission'
	}
},

/* ==================================================
	LULING
	================================================== */

'luling': {
	name:	'Luling',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Luling Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Luling, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Luling, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Luling'
	}
},

/* ==================================================
	MCKINNEY
	================================================== */

'mckinney': {
	name:	'McKinney',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'McKinney Wedding Videographer',
		subtitle: 'Wedding Films & Photography in McKinney, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in McKinney, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in McKinney'
	}
},

/* ==================================================
	MCNAY ART MUSEUM
	================================================== */

'mcnay art museum': {
	name:	'McNay Art Museum',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'McNay Art Museum Wedding Videographer',
		subtitle: 'Wedding Films & Photography at McNay Art Museum',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at McNay Art Museum, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at McNay Art Museum'
	}
},

/* ==================================================
	NATIVITY OF THE BLESSED VIRGIN MARY
	CATHOLIC CHURCH
	================================================== */

'nativity of the blessed virgin mary catholic church': {
	name:	'Nativity of the Blessed Virgin Mary Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Nativity BVM Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Nativity of the Blessed Virgin Mary Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Nativity of the Blessed Virgin Mary Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Nativity BVM Catholic Church'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Catholic Ceremonies at Nativity BVM Matters',
				paragraphs: [
					'A Catholic wedding ceremony requires a different approach from an all-in-one wedding venue. We prepare carefully for professional audio, multiple camera angles, processional and recessional coverage, the exchange of vows, family reactions, and the meaningful moments that unfold throughout the ceremony.',
					'Because we have filmed several weddings at Nativity BVM, we are familiar with the rhythm of wedding days that begin at the church and then continue elsewhere for the reception. That experience helps us plan the transition between locations without treating every wedding as if it follows the same timeline or traditions.'
				]
			},
			{
				heading: 'Weddings We’ve Filmed at Nativity BVM Catholic Church',
				paragraphs: [
					'Our Nativity BVM portfolio includes multiple couples who began their marriage with a Catholic ceremony at the church. Those wedding days have continued to several different reception destinations, including Panna Maria Hall, Kosciusko Hall, and Cestohowa Hall, while some published films focus primarily on the Falls City ceremony without identifying a reception venue.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding at Nativity BVM?',
			paragraphs: [
				'If you’re planning your wedding ceremony at Nativity of the Blessed Virgin Mary Catholic Church, we’d love to learn about your plans for the ceremony, reception, family traditions, and the moments that matter most to you. Mark Thomas Films creates story-driven wedding films and photography designed to preserve both the significance of the ceremony and the celebration surrounding it.'
			]
		}
	}
},

/* ==================================================
	NEW BRAUNFELS
	================================================== */

'new braunfels': {
	name:	'New Braunfels',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'New Braunfels Wedding Videographer',
		subtitle: 'Wedding Films & Photography in New Braunfels, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in New Braunfels, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in New Braunfels'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Weddings in New Braunfels Matters',
				paragraphs: [
					'Our New Braunfels portfolio includes open-air ceremonies at Chandelier of Gruene and a celebration at The Allen Farmhaus. Maddy and Travis’s film brings together an outdoor ceremony, a barn reception, and sunset portraits, showing how different parts of a wedding day can call for different approaches to light and coverage.',
					'We consider the ceremony setting, professional audio, portrait time, and reception flow when planning your film. Thoughtful preparation helps us work alongside your other wedding professionals and leave room for the vows, family exchanges, and unplanned moments that give your story its meaning.'
				]
			},
			{
				heading: 'New Braunfels Wedding Venues We Know',
				paragraphs: [
					'Chandelier of Gruene is represented throughout our New Braunfels films, including celebrations for Maddy and Travis, Ryann and Slade, and Grayson and Joshua. These stories include the property’s open-air ceremony setting and reception spaces, with each film centered on a different couple and family.',
					'We have also filmed Katie and Ian’s wedding at The Allen Farmhaus. Their celebration adds another setting to the portfolio above, offering a look at our work beyond Chandelier of Gruene.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in New Braunfels?',
			paragraphs: [
				'We would love to hear where you are celebrating and what matters most to you. Let’s talk about wedding film and photography coverage that preserves the voices, people, and moments you will want to revisit.'
			]
		}
	}
},

/* ==================================================
	NEW BRAUNFELS BIBLE CHURCH
	================================================== */

'new braunfels bible church': {
	name:	'New Braunfels Bible Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'New Braunfels Bible Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at New Braunfels Bible Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at New Braunfels Bible Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at New Braunfels Bible Church'
	}
},

/* ==================================================
	NEW BRAUNFELS CIVIC & CONVENTION CENTER
	================================================== */

'new braunfels civic & convention center': {
	name:	'New Braunfels Civic & Convention Center',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'New Braunfels Civic & Convention Center Wedding Videographer',
		subtitle: 'Wedding Films & Photography at New Braunfels Civic & Convention Center',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented wedding receptions and celebrations at New Braunfels Civic & Convention Center, preserving entrances, speeches, family traditions, first dances, reception energy, and the spontaneous interactions that happen once everyone is together. Our approach combines professional audio with unobtrusive coverage so the personality of the celebration comes through naturally.',
		galleryTitle: 'Wedding Films at New Braunfels Civic & Convention Center'
	}
},

/* ==================================================
	PANNA MARIA
	================================================== */

'panna maria': {
	name:	'Panna Maria',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Panna Maria Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Panna Maria, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Panna Maria, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Panna Maria'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Weddings in Panna Maria Matters',
				paragraphs: [
					'Many of our Panna Maria wedding stories move from a church ceremony to a reception at Panna Maria Hall. Brittany and Collin’s celebration began at Panna Maria Catholic Church, while Hailee and Will married at Nativity of the Blessed Virgin Mary Catholic Church in Falls City before gathering at the hall. Planning for both locations helps keep ceremony coverage and reception preparations coordinated.',
					'We consider camera placement, professional audio, the transition between locations, and the flow of the reception before the day arrives. That preparation leaves us ready for the vows, speeches, family traditions, and spontaneous moments that make each celebration personal.'
				]
			},
			{
				heading: 'Panna Maria Wedding Venues We Know',
				paragraphs: [
					'Panna Maria Hall is a familiar setting in our portfolio, with celebrations for Brittany and Collin, Nikki and Bennett, Aileen and Colby, and many other couples. Panna Maria Catholic Church also appears in our films, including Brittany and Collin’s ceremony.',
					'Some films pair a ceremony outside Panna Maria with a reception at Panna Maria Hall. Hailee and Will, for example, married at Nativity of the Blessed Virgin Mary Catholic Church in Falls City before celebrating at the hall. Aileen and Colby’s film also brings together a ceremony at St. Andrew’s Lutheran Church and a reception at Panna Maria Hall.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in Panna Maria?',
			paragraphs: [
				'Share your ceremony and reception plans with us, along with the people and traditions you want to preserve. We would love to discuss wedding film and photography coverage for a story your family can return to together.'
			]
		}
	}
},

/* ==================================================
	PANNA MARIA CATHOLIC CHURCH
	================================================== */

'panna maria catholic church': {
	name:	'Panna Maria Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'Panna Maria Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Panna Maria Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at Panna Maria Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at Panna Maria Catholic Church'
	}
},

/* ==================================================
	PANNA MARIA HALL
	================================================== */

'panna maria hall': {
	name:	'Panna Maria Hall',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Panna Maria Hall Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Panna Maria Hall',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented wedding receptions and celebrations at Panna Maria Hall, preserving entrances, speeches, family traditions, first dances, reception energy, and the spontaneous interactions that happen once everyone is together. Our approach combines professional audio with unobtrusive coverage so the personality of the celebration comes through naturally.',
		galleryTitle: 'Wedding Films at Panna Maria Hall'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Receptions at Panna Maria Hall Matters',
				paragraphs: [
					'A church-to-hall wedding day requires careful planning because the story moves through more than one location. Experience with Panna Maria Hall celebrations helps us plan the transition from the ceremony into portraits, travel, reception entrances, speeches, dances, family traditions, and the moments that develop once everyone gathers together.',
					'Professional audio is especially important to the way we tell these stories. Toasts, introductions, laughter, music, family voices, and spontaneous moments all become part of the record of the celebration. Knowing the general rhythm of these wedding days allows us to stay prepared while still responding naturally to each family and couple.'
				]
			},
			{
				heading: 'Church-to-Hall Weddings and Panna Maria Traditions',
				paragraphs: [
					'The Panna Maria Hall weddings we have filmed do not all begin at the same church. Our portfolio includes wedding days that move to the hall after ceremonies in Panna Maria, Falls City, and other nearby communities. The hall is the reception destination that connects these films, while each couple’s ceremony, family, and traditions remain distinct.',
					'Some of the celebrations we have documented also include traditions such as the Grand March and Daj Daj. These are not presented as features of every Panna Maria Hall wedding, but they are meaningful examples of the Polish Texas family and community traditions preserved in several of our films.'
				]
			}
		],
		cta: {
			heading: 'Planning a Reception at Panna Maria Hall?',
			paragraphs: [
				'If your wedding celebration includes Panna Maria Hall, we’d love to hear about your ceremony, reception plans, family traditions, and the people who matter most to you. Mark Thomas Films creates wedding films and photography designed to preserve the full story of the day, including the voices and moments that can become even more meaningful with time.'
			]
		}
	}
},

/* ==================================================
	PARK 31
	================================================== */

'park 31': {
	name:	'Park 31',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Park 31 Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Park 31',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Park 31, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Park 31'
	}
},

/* ==================================================
	PLAYA DEL CARMEN
	================================================== */

'playa del carmen': {
	name:	'Playa del Carmen',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Playa del Carmen Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Playa del Carmen, Mexico',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented destination weddings in Playa del Carmen, preserving the ceremony, travel experience, family relationships, speeches, and spontaneous moments that make celebrating away from home memorable. We plan carefully for the setting while keeping the people and emotions at the center of the film.',
		galleryTitle: 'Wedding Films in Playa del Carmen'
	}
},

/* ==================================================
	PRIVATE RANCH
	================================================== */

'private ranch': {
	name:	'Private Ranch',
	type:	'setting',
	header: {
		eyebrow: 'SETTING',
		title: 'Private Ranch Wedding Videographer',
		subtitle: 'Wedding Films & Photography for Private Ranch Weddings in Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed private ranch weddings across Texas, where the property, landscape, family history, and custom flow of the day often become part of the celebration itself. We plan carefully for changing light, outdoor audio, travel, and flexible timelines while keeping the people, traditions, and real moments at the center of the film.',
		galleryTitle: 'Private Ranch Wedding Films'
	}
},

/* ==================================================
	QUINTANA ROO
	================================================== */

'quintana roo': {
	name:	'Quintana Roo',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Quintana Roo Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Quintana Roo, Mexico',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented destination weddings in Quintana Roo, preserving the ceremony, travel experience, family relationships, speeches, and spontaneous moments that make celebrating away from home memorable. We plan carefully for the setting while keeping the people and emotions at the center of the film.',
		galleryTitle: 'Wedding Films in Quintana Roo'
	}
},

/* ==================================================
	RIO CIBOLO RANCH
	================================================== */

'rio cibolo ranch': {
	name:	'Rio Cibolo Ranch',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Rio Cibolo Ranch Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Rio Cibolo Ranch',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Rio Cibolo Ranch, using the ranch setting and surrounding landscape naturally while planning for ceremony audio, changing light, portraits, and the flow into the reception. Our approach keeps the people, relationships, vows, and spontaneous moments at the center of the story.',
		galleryTitle: 'Wedding Films at Rio Cibolo Ranch'
	}
},

/* ==================================================
	RUSTIC FALLS AT VAUGHN RANCH
	================================================== */

'rustic falls at vaughn ranch': {
	name:	'Rustic Falls at Vaughn Ranch',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Rustic Falls at Vaughn Ranch Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Rustic Falls at Vaughn Ranch',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Rustic Falls at Vaughn Ranch, using the ranch setting and surrounding landscape naturally while planning for ceremony audio, changing light, portraits, and the flow into the reception. Our approach keeps the people, relationships, vows, and spontaneous moments at the center of the story.',
		galleryTitle: 'Wedding Films at Rustic Falls at Vaughn Ranch'
	}
},

/* ==================================================
	SAN ANTONIO
	================================================== */

'san antonio': {
	name:	'San Antonio',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'San Antonio Wedding Videographer',
		subtitle: 'Wedding Films & Photography in San Antonio, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in San Antonio, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in San Antonio'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Weddings in San Antonio Matters',
				paragraphs: [
					'Our San Antonio films include a ceremony at San Fernando Cathedral followed by a reception at San Fernando Event Centre, as well as a sunset lakeside ceremony at Red Berry Estate. Those different settings call for thoughtful preparation around camera placement, professional audio, changing light, and the time needed to move between parts of the day.',
					'We plan coverage around your ceremony and reception so the practical details support the story. Clear recordings of vows and speeches, room for natural moments with family, and coordination with your other wedding professionals help us preserve how the celebration felt.'
				]
			},
			{
				heading: 'San Antonio Wedding Venues We Know',
				paragraphs: [
					'Our wedding films feature Hotel Emma, The Red Berry Estate, and San Antonio Botanical Garden, each offering a different setting for couples and their families. We have also filmed at San Fernando Cathedral and San Fernando Event Centre, with ceremony and reception coverage represented in Madison and Jon Ross’s film.',
					'Canyon Springs Golf Club and Jack Guenther Pavilion are also part of our San Antonio portfolio. Explore the films above to see the people, places, and celebrations we have had the honor to capture.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in San Antonio?',
			paragraphs: [
				'Tell us about your plans and the people you want to remember most. We would love to discuss wedding film and photography coverage that lets you enjoy the day and return to its meaningful moments for years to come.'
			]
		}
	}
},

/* ==================================================
	SAN ANTONIO BOTANICAL GARDEN
	================================================== */

'san antonio botanical garden': {
	name:	'San Antonio Botanical Garden',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'San Antonio Botanical Garden Wedding Videographer',
		subtitle: 'Wedding Films & Photography at San Antonio Botanical Garden',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at San Antonio Botanical Garden, planning carefully for outdoor light, ceremony audio, portraits, reception coverage, and the transitions between different parts of the property. We use the setting naturally while keeping the vows, relationships, reactions, and unscripted moments at the center of the film.',
		galleryTitle: 'Wedding Films at San Antonio Botanical Garden'
	}
},

/* ==================================================
	SAN FERNANDO CATHEDRAL
	================================================== */

'san fernando cathedral': {
	name:	'San Fernando Cathedral',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'San Fernando Cathedral Wedding Videographer',
		subtitle: 'Wedding Films & Photography at San Fernando Cathedral',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at San Fernando Cathedral, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at San Fernando Cathedral'
	}
},

/* ==================================================
	SAN FERNANDO EVENT CENTRE
	================================================== */

'san fernando event centre': {
	name:	'San Fernando Event Centre',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'San Fernando Event Centre Wedding Videographer',
		subtitle: 'Wedding Films & Photography at San Fernando Event Centre',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented wedding receptions and celebrations at San Fernando Event Centre, preserving entrances, speeches, family traditions, first dances, reception energy, and the spontaneous interactions that happen once everyone is together. Our approach combines professional audio with unobtrusive coverage so the personality of the celebration comes through naturally.',
		galleryTitle: 'Wedding Films at San Fernando Event Centre'
	}
},

/* ==================================================
	SEGUIN
	================================================== */

'seguin': {
	name:	'Seguin',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Seguin Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Seguin, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Seguin, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Seguin'
	}
},

/* ==================================================
	SENDERA SPRINGS
	================================================== */

'sendera springs': {
	name:	'Sendera Springs',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Sendera Springs Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Sendera Springs',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Sendera Springs, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Sendera Springs'
	}
},

/* ==================================================
	SPRING BRANCH
	================================================== */

'spring branch': {
	name:	'Spring Branch',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Spring Branch Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Spring Branch, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Spring Branch, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Spring Branch'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Weddings in Spring Branch Matters',
				paragraphs: [
					'Spring Branch weddings often combine outdoor Hill Country settings with indoor reception spaces, and the conditions can change considerably from one part of the day to the next. Planning for natural light, ceremony audio, portraits, weather, and the movement between spaces allows us to stay prepared without turning the wedding into a production.',
					'Experience throughout the surrounding Hill Country also helps when timelines connect Spring Branch with nearby communities such as Bulverde, Canyon Lake, and San Antonio. We plan around the actual locations and priorities of the couple so coverage remains efficient and the story stays centered on the people experiencing the day.'
				]
			},
			{
				heading: 'Spring Branch Wedding Stories',
				paragraphs: [
					'Our Spring Branch wedding films reflect the variety that makes this part of the Hill Country appealing: outdoor ceremonies, ranch and venue settings, family-centered celebrations, and receptions that take on the personality of each couple.',
					'Rather than treating the area as one visual formula, we use the landscape and venue as context while focusing the film on vows, voices, relationships, traditions, reactions, and the unscripted moments that make the wedding personal.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding in Spring Branch?',
			paragraphs: [
				'If you’re planning a wedding in Spring Branch or the surrounding Texas Hill Country, we’d love to hear where you are celebrating and what matters most to you. Mark Thomas Films offers story-driven wedding videography and photography designed around real moments and natural emotion.'
			]
		}
	}
},

/* ==================================================
	ST. ANDREW'S LUTHERAN CHURCH
	================================================== */

"st. andrew's lutheran church": {
	name:	'St. Andrew’s Lutheran Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Andrew’s Lutheran Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Andrew’s Lutheran Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Andrew’s Lutheran Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Andrew’s Lutheran Church'
	}
},

/* ==================================================
	ST. ANN'S CATHOLIC CHURCH
	================================================== */

"st. ann's catholic church": {
	name:	"St. Ann's Catholic Church",
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Ann\'s Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Ann\'s Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Ann\'s Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Ann\'s Catholic Church'
	}
},

/* ==================================================
	ST. ANTHONY MARY CLARET CATHOLIC CHURCH
	================================================== */

'st. anthony mary claret catholic church': {
	name:	'St. Anthony Mary Claret Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Anthony Mary Claret Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Anthony Mary Claret Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Anthony Mary Claret Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Anthony Mary Claret Catholic Church'
	}
},

/* ==================================================
	ST. ELIZABETH ANN SETON CATHOLIC CHURCH
	================================================== */

'st. elizabeth ann seton catholic church': {
	name:	'St. Elizabeth Ann Seton Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Elizabeth Ann Seton Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Elizabeth Ann Seton Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Elizabeth Ann Seton Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Elizabeth Ann Seton Catholic Church'
	}
},

/* ==================================================
	ST. JOHN LUTHERAN CHURCH
	================================================== */

'st. john lutheran church': {
	name:	'St. John Lutheran Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. John Lutheran Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. John Lutheran Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. John Lutheran Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. John Lutheran Church'
	}
},

/* ==================================================
	ST. JOSEPH'S CATHOLIC CHURCH
	================================================== */

"st. joseph's catholic church": {
	name:	'St. Joseph’s Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Joseph’s Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Joseph’s Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Joseph’s Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Joseph’s Catholic Church'
	}
},

/* ==================================================
	ST. JOSEPH CATHOLIC CHURCH - HONEY CREEK
	================================================== */

'st. joseph catholic church - honey creek': {
	name:	'St. Joseph Catholic Church - Honey Creek',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Joseph Catholic Church - Honey Creek Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Joseph Catholic Church - Honey Creek',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Joseph Catholic Church - Honey Creek, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Joseph Catholic Church - Honey Creek'
	}
},

/* ==================================================
	ST. MARTIN OF TOURS CATHOLIC CHURCH
	================================================== */

'st. martin of tours catholic church': {
	name:	'St. Martin of Tours Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Martin of Tours Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Martin of Tours Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Martin of Tours Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Martin of Tours Catholic Church'
	}
},

/* ==================================================
	ST. PAUL LUTHERAN CHURCH
	================================================== */

'st. paul lutheran church': {
	name:	'St. Paul Lutheran Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Paul Lutheran Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Paul Lutheran Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Paul Lutheran Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Paul Lutheran Church'
	}
},

/* ==================================================
	ST. PETER CATHOLIC CHURCH
	================================================== */

'st. peter catholic church': {
	name:	'St. Peter Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Peter Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Peter Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Peter Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Peter Catholic Church'
	}
},

/* ==================================================
	ST. PETER THE APOSTLE CATHOLIC CHURCH
	================================================== */

'st. peter the apostle catholic church': {
	name:	'St. Peter the Apostle Catholic Church',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'St. Peter the Apostle Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at St. Peter the Apostle Catholic Church',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at St. Peter the Apostle Catholic Church, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at St. Peter the Apostle Catholic Church'
	}
},

/* ==================================================
	STONE CREST VENUE
	================================================== */

'stone crest venue': {
	name:	'Stone Crest Venue',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Stone Crest Venue Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Stone Crest Venue',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Stone Crest Venue, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Stone Crest Venue'
	}
},

/* ==================================================
	STOCKDALE
	================================================== */

'stockdale': {
	name:	'Stockdale',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Stockdale Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Stockdale, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Stockdale, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Stockdale'
	}
},

/* ==================================================
	SUNSET STATION
	================================================== */

'sunset station': {
	name:	'Sunset Station',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Sunset Station Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Sunset Station',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Sunset Station, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Sunset Station'
	}
},

/* ==================================================
	TEXAS HILL COUNTRY
	================================================== */

'texas hill country': {
	name:	'Texas Hill Country',
	type:	'location',
	header: {
		eyebrow: 'REGION',
		title: 'Texas Hill Country Wedding Videographer',
		subtitle: 'Wedding Films & Photography Across the Texas Hill Country',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented weddings throughout the Texas Hill Country, from riverside and lakeside celebrations to churches, ranches, private properties, and dedicated wedding venues. We plan around the changing light, audio, travel, and landscape of each location while keeping the people, voices, and relationships at the center of the story.',
		galleryTitle: 'Texas Hill Country Wedding Films'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience Filming Texas Hill Country Weddings Matters',
				paragraphs: [
					'Hill Country weddings often make the landscape an important part of the celebration, but the locations themselves can be dramatically different. We have filmed weddings beside lakes and rivers, beneath mature oak trees, on private ranches, at family homes, inside churches and chapels, and at venues that combine outdoor ceremony spaces with large indoor receptions.',
					'That variety matters behind the camera. Outdoor light changes throughout the day, wind can affect ceremony audio, timelines may involve travel between locations, and portraits often depend on making the most of the landscape without turning the wedding into a photo or video production. Experience helps us prepare for those variables while remaining focused on the people experiencing the day.'
				]
			},
			{
				heading: 'There Is No Single Texas Hill Country Wedding',
				paragraphs: [
					'One of the things we enjoy most about filming weddings throughout the Texas Hill Country is how different one celebration can feel from the next. A sunset ceremony overlooking the water in Kerrville has a completely different atmosphere from a private ranch wedding in Bandera. A wedding beside the Frio River feels different from a chapel and reception venue in Canyon Lake, while a church ceremony followed by a reception at the family home in Boerne tells another kind of story entirely.',
					'This collection is intentionally varied. Rather than showing nine versions of the same venue or city, these films give couples a look at the range of places, landscapes, wedding styles, and celebrations we have documented throughout the region. Wherever the wedding takes place, our goal remains the same: preserve the people, voices, emotions, traditions, and relationships that make the day personal.'
				]
			}
		],
		cta: {
			heading: 'Planning a Texas Hill Country Wedding?',
			paragraphs: [
				'If you’re planning a wedding in the Texas Hill Country, we’d love to hear where you’re celebrating and what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography for celebrations throughout the region, from established venues to private properties and destinations off the beaten path.'
			]
		}
	}
},

/* ==================================================
	TEXAS
	================================================== */

'tx': {
	name:	'Texas',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Texas Wedding Videographer',
		subtitle: 'Wedding Films & Photography Across Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented weddings across Texas in churches, hotels, ranches, private properties, outdoor settings, and dedicated wedding venues. Wherever the celebration takes place, our approach focuses on real moments, natural emotion, clear audio, and the people and voices that make the wedding personal.',
		galleryTitle: 'Wedding Films Across Texas'
	}
},

/* ==================================================
	THE ALLEN FARMHAUS
	================================================== */

'the allen farmhaus': {
	name:	'The Allen Farmhaus',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Allen Farmhaus Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Allen Farmhaus',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Allen Farmhaus, planning carefully for outdoor light, ceremony audio, portraits, reception coverage, and the transitions between different parts of the property. We use the setting naturally while keeping the vows, relationships, reactions, and unscripted moments at the center of the film.',
		galleryTitle: 'Wedding Films at The Allen Farmhaus'
	}
},

/* ==================================================
	THE CHAPEL OF THE INCARNATE WORD
	================================================== */

'the chapel of the incarnate word': {
	name:	'The Chapel of the Incarnate Word',
	type:	'church',
	header: {
		eyebrow: 'CHURCH',
		title: 'The Chapel of the Incarnate Word Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Chapel of the Incarnate Word',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed wedding ceremonies at The Chapel of the Incarnate Word, with careful attention to professional audio, respectful camera placement, processional and recessional coverage, vows, music, and family reactions. Our goal is to preserve both the significance of the ceremony and the personal moments surrounding it without disrupting the experience.',
		galleryTitle: 'Wedding Films at The Chapel of the Incarnate Word'
	}
},

/* ==================================================
	THE GARDENS AT OLD TOWN HELOTES
	================================================== */

'the gardens at old town helotes': {
	name:	'The Gardens at Old Town Helotes',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Gardens at Old Town Helotes Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Gardens at Old Town Helotes',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Gardens at Old Town Helotes, planning carefully for outdoor light, ceremony audio, portraits, reception coverage, and the transitions between different parts of the property. We use the setting naturally while keeping the vows, relationships, reactions, and unscripted moments at the center of the film.',
		galleryTitle: 'Wedding Films at The Gardens at Old Town Helotes'
	}
},

/* ==================================================
	THE KENDALL
	================================================== */

'the kendall': {
	name:	'The Kendall',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Kendall Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Kendall',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Kendall, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at The Kendall'
	}
},

/* ==================================================
	THE LODGE EVENT CENTER
	================================================== */

'the lodge event center': {
	name:	'The Lodge Event Center',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Lodge Event Center Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Lodge Event Center',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has documented wedding receptions and celebrations at The Lodge Event Center, preserving entrances, speeches, family traditions, first dances, reception energy, and the spontaneous interactions that happen once everyone is together. Our approach combines professional audio with unobtrusive coverage so the personality of the celebration comes through naturally.',
		galleryTitle: 'Wedding Films at The Lodge Event Center'
	}
},

/* ==================================================
	THE MARQUARDT RANCH
	================================================== */

'the marquardt ranch': {
	name:	'The Marquardt Ranch',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Marquardt Ranch Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Marquardt Ranch',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Marquardt Ranch, using the ranch setting and surrounding landscape naturally while planning for ceremony audio, changing light, portraits, and the flow into the reception. Our approach keeps the people, relationships, vows, and spontaneous moments at the center of the story.',
		galleryTitle: 'Wedding Films at The Marquardt Ranch'
	}
},

/* ==================================================
	THE MILESTONE BOERNE
	================================================== */

'the milestone boerne': {
	name:	'The Milestone Boerne',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Milestone Boerne Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Milestone Boerne',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Milestone Boerne, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at The Milestone Boerne'
	}
},

/* ==================================================
	THE MILESTONE GEORGETOWN
	================================================== */

'the milestone georgetown': {
	name:	'The Milestone Georgetown',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Milestone Georgetown Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Milestone Georgetown',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Milestone Georgetown, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at The Milestone Georgetown'
	}
},

/* ==================================================
	THE MILESTONE NEW BRAUNFELS
	================================================== */

'the milestone new braunfels': {
	name:	'The Milestone New Braunfels',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Milestone New Braunfels Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Milestone New Braunfels',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Milestone New Braunfels, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at The Milestone New Braunfels'
	}
},

/* ==================================================
	THE OAKS AT BOERNE
	================================================== */

'the oaks at boerne': {
	name:	'The Oaks at Boerne',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Oaks at Boerne Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Oaks at Boerne',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Oaks at Boerne, planning carefully for outdoor light, ceremony audio, portraits, reception coverage, and the transitions between different parts of the property. We use the setting naturally while keeping the vows, relationships, reactions, and unscripted moments at the center of the film.',
		galleryTitle: 'Wedding Films at The Oaks at Boerne'
	}
},

/* ==================================================
	THE PRESERVE AT CANYON LAKE
	================================================== */

'the preserve at canyon lake': {
	name:	'The Preserve at Canyon Lake',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Preserve at Canyon Lake Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Preserve at Canyon Lake',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Preserve at Canyon Lake, planning carefully for outdoor light, ceremony audio, portraits, reception coverage, and the transitions between different parts of the property. We use the setting naturally while keeping the vows, relationships, reactions, and unscripted moments at the center of the film.',
		galleryTitle: 'Wedding Films at The Preserve at Canyon Lake'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience at The Preserve at Canyon Lake Matters',
				paragraphs: [
					'Knowing a venue before the wedding day allows us to spend less time figuring out logistics and more time paying attention to the story happening in front of us. Experience at The Preserve helps us anticipate the movement between ceremony, portraits, gathering spaces, and the reception while planning camera placement, audio, lighting, and coverage around the actual timeline.',
					'That familiarity does not mean every wedding is approached the same way. Each couple brings different people, traditions, emotions, and priorities to the venue. We use what we know about the property as a foundation, then build the film around the individual wedding rather than forcing the day into a formula.'
				]
			},
			{
				heading: 'Weddings We’ve Filmed at The Preserve at Canyon Lake',
				paragraphs: [
					'Our Preserve portfolio includes several different couples and wedding stories, including celebrations centered on family relationships and meaningful personal moments. Across those weddings, we have documented the venue through ceremony coverage, portraits, reception celebrations, and the transitions that connect the different parts of the day.',
					'The result is a collection of real wedding films that allows couples considering The Preserve to see the venue as part of an actual wedding story rather than simply a collection of property images. The setting provides the backdrop, while the voices, relationships, reactions, and emotions remain at the center of the film.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding at The Preserve at Canyon Lake?',
			paragraphs: [
				'If you’re planning your wedding at The Preserve at Canyon Lake, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography built around the people and moments you’ll want to remember long after the celebration is over.'
			]
		}
	}
},

/* ==================================================
	THE RED BERRY ESTATE
	================================================== */

'the red berry estate': {
	name:	'The Red Berry Estate',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Red Berry Estate Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Red Berry Estate',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Red Berry Estate, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at The Red Berry Estate'
	},
	footer: {
		sections: [
			{
				heading: 'Why Experience at The Red Berry Estate Matters',
				paragraphs: [
					'The Red Berry Estate gives couples several distinct environments across a wedding day, from preparation and ceremony spaces to portraits around the property and a polished reception setting. Knowing how those spaces connect helps us plan camera positions, professional audio, lighting, and transitions before the day begins so coverage can stay unobtrusive once the celebration is underway.',
					'That preparation lets the estate support the visual story without becoming the story itself. We can take advantage of the architecture, grounds, and changing light while keeping the vows, family relationships, speeches, reactions, and unscripted moments at the center of the film.'
				]
			},
			{
				heading: 'Weddings We’ve Filmed at The Red Berry Estate',
				paragraphs: [
					'Mark Thomas Films has filmed multiple weddings at The Red Berry Estate, giving couples a collection of real celebrations to explore rather than a single example of the venue. Each wedding brings its own design, traditions, timeline, families, and energy to the property.',
					'Across those films, couples can see how ceremony moments, portraits, speeches, first dances, reception energy, and quieter interactions unfold throughout a complete wedding day. The setting remains recognizable, but the people and relationships make every Red Berry Estate wedding feel different.'
				]
			}
		],
		cta: {
			heading: 'Planning a Wedding at The Red Berry Estate?',
			paragraphs: [
				'If you’re planning your wedding at The Red Berry Estate, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography centered on the people, voices, relationships, and moments that make the day uniquely yours.'
			]
		}
	}
},

/* ==================================================
	THE ST. ANTHONY HOTEL
	================================================== */

'the st. anthony hotel': {
	name:	'The St. Anthony Hotel',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The St. Anthony Hotel Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The St. Anthony Hotel',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings and wedding events at The St. Anthony Hotel, documenting preparations, portraits, ceremonies, receptions, speeches, and the candid interactions that connect the day. We plan coverage around the property and timeline so the setting supports the story while the people and relationships remain the focus.',
		galleryTitle: 'Wedding Films at The St. Anthony Hotel'
	}
},

/* ==================================================
	THE VERANDA
	================================================== */

'the veranda': {
	name:	'The Veranda',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Veranda Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Veranda',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at The Veranda, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at The Veranda'
	}
},

/* ==================================================
	THE WESTIN RIVERWALK
	================================================== */

'the westin riverwalk': {
	name:	'The Westin Riverwalk',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'The Westin Riverwalk Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Westin Riverwalk',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings and wedding events at The Westin Riverwalk, documenting preparations, portraits, ceremonies, receptions, speeches, and the candid interactions that connect the day. We plan coverage around the property and timeline so the setting supports the story while the people and relationships remain the focus.',
		galleryTitle: 'Wedding Films at The Westin Riverwalk'
	}
},

/* ==================================================
	VILLA AT CIBOLO CHASE
	================================================== */

'villa at cibolo chase': {
	name:	'Villa at Cibolo Chase',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Villa at Cibolo Chase Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Villa at Cibolo Chase',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Villa at Cibolo Chase, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Villa at Cibolo Chase'
	}
},

/* ==================================================
	WESTERN SKY WEDDING & EVENT VENUE
	================================================== */

'western sky wedding & event venue': {
	name:	'Western Sky Wedding & Event Venue',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Western Sky Wedding & Event Venue Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Western Sky Wedding & Event Venue',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Western Sky Wedding & Event Venue, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Western Sky Wedding & Event Venue'
	}
},

/* ==================================================
	WILLOW RIDGE
	================================================== */

'willow ridge': {
	name:	'Willow Ridge',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Willow Ridge Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Willow Ridge',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Willow Ridge, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Willow Ridge'
	}
},

/* ==================================================
	YORKTOWN
	================================================== */

'yorktown': {
	name:	'Yorktown',
	type:	'location',
	header: {
		eyebrow: 'LOCATION',
		title: 'Yorktown Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Yorktown, Texas',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings in Yorktown, preserving the vows, voices, relationships, and unscripted moments that make each celebration personal. We plan coverage around the actual venues, timelines, light, and audio needs of the day so the location adds atmosphere without distracting from the people at the center of the story.',
		galleryTitle: 'Wedding Films in Yorktown'
	}
},

/* ==================================================
	ZEDLER MILL
	================================================== */

'zedler mill': {
	name:	'Zedler Mill',
	type:	'venue',
	header: {
		eyebrow: 'VENUE',
		title: 'Zedler Mill Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Zedler Mill',
		heroVideoUrl: '',
		paragraph: 'Mark Thomas Films has filmed weddings at Zedler Mill, documenting the ceremony, portraits, family interactions, speeches, dancing, and spontaneous moments that give each celebration its personality. Our approach combines careful preparation with unobtrusive coverage so the setting supports the story without overtaking the people at the center of it.',
		galleryTitle: 'Wedding Films at Zedler Mill'
	}
}
};

/* ==================================================
	 ALIASES

	 The lookup code already normalizes curly
	 apostrophes to straight apostrophes.

	 These aliases provide an additional safeguard
	 for anything that accesses the context object
	 directly.
	 ================================================== */

window.MTF.filmTagContext['st. andrew’s lutheran church'] =
	window.MTF.filmTagContext["st. andrew's lutheran church"];

window.MTF.filmTagContext['st. joseph’s catholic church'] =
	window.MTF.filmTagContext["st. joseph's catholic church"];

})();