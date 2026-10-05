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
	 NEW TAG / AUTHORITY PAGE TEMPLATE

	 Copy this structure when creating an enhanced tag.
	 Blank heroVideoUrl = shared default video above.
	 Blank strings/arrays = that optional content is skipped.
	 ================================================== */

// 'tag-name': {
// 	name:	'Display Name',
// 	type:	'venue',
// 	paragraphs: [
// 		'Standard archive introduction paragraph one.',
// 		'Standard archive introduction paragraph two.'
// 	],
// 	header: {
// 		eyebrow: '',
// 		title: '',
// 		subtitle: '',
// 		heroVideoUrl: '',
// 		paragraphs: [],
// 		galleryTitle: ''
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
	AMERICAN BANK CENTER
	================================================== */

'american bank center': {
	name:	'American Bank Center',
	type:	'venue',
	paragraphs: [
		'American Bank Center in Corpus Christi offers a large-scale setting for South Texas weddings and receptions, with the flexibility to host celebrations filled with family, music, dancing, and personal details. Its event spaces provide a distinctive backdrop for couples planning a memorable Corpus Christi wedding.',
		'Browse American Bank Center wedding films by Mark Thomas Films to experience real ceremonies, receptions, speeches, dances, and candid moments captured throughout the day. These films show how each couple brings a unique story and personality to this Corpus Christi wedding venue.'
	]
},

/* ==================================================
	AUSTIN
	================================================== */

'austin': {
	name:	'Austin',
	type:	'location',
	paragraphs: [
		'Austin weddings can range from downtown celebrations and modern event spaces to outdoor venues, private properties, churches, and Hill Country settings on the edges of the city. That variety gives couples many ways to shape a wedding day while keeping Austin’s energy and Central Texas character in the background of the story.',
		'Browse Austin wedding films by Mark Thomas Films to see real celebrations documented with an emphasis on vows, voices, family relationships, speeches, reactions, and the unscripted moments that make each wedding personal.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'Austin Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Austin, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning an Austin wedding, we’d love to hear where you are celebrating and what matters most to you. Mark Thomas Films offers story-driven wedding videography and photography for celebrations throughout Austin and Central Texas.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding day.'
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
	paragraphs: [
		'Bandera weddings combine the character of the Texas Hill Country with ranch settings, open landscapes, historic surroundings, and the relaxed atmosphere that makes this part of Texas distinctive. Couples planning a wedding in Bandera have opportunities to create a celebration that feels personal, scenic, and unmistakably Texan.',
		'Explore Bandera wedding films by Mark Thomas Films to see real wedding days captured throughout the area. From quiet preparations and emotional ceremonies to energetic receptions, these films preserve the people, places, and unscripted moments that make every Bandera wedding different.'
	]
},

/* ==================================================
	BOERNE
	================================================== */

'boerne': {
	name:	'Boerne',
	type:	'location',
	paragraphs: [
		'Boerne is one of the Texas Hill Country’s most popular wedding destinations, offering a mix of elegant venues, ranch properties, churches, historic spaces, and scenic outdoor settings. Its proximity to San Antonio and unmistakable Hill Country character make Boerne a natural choice for couples planning a Texas wedding.',
		'Browse Boerne wedding films by Mark Thomas Films to see celebrations at venues throughout the area. These wedding films capture the emotion, movement, relationships, and atmosphere of real Boerne weddings while giving future couples a glimpse of how different venues and celebrations look on film.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'Boerne Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Boerne, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning a wedding in Boerne or the surrounding Texas Hill Country, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography built around the people, moments, and memories that make your day your own.',
				'Build a preliminary quote to explore coverage options and pricing, then we can talk through the details and create coverage that fits your wedding day.'
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
	paragraphs: [
		'Braches House provides an intimate setting for wedding celebrations where personal details, family connections, and the natural rhythm of the day can take center stage. Weddings here can feel especially personal because the setting allows the people and relationships surrounding the couple to remain at the heart of the celebration.',
		'Explore Braches House wedding films by Mark Thomas Films to see how real couples have celebrated at this distinctive venue. Each film brings together meaningful details, candid interactions, ceremony moments, and reception memories into a cinematic record of the wedding day.'
	]
},

/* ==================================================
	BULVERDE
	================================================== */

'bulverde': {
	name:	'Bulverde',
	type:	'location',
	paragraphs: [
		'Bulverde weddings offer couples the scenery and relaxed character of the Texas Hill Country while remaining convenient to San Antonio and surrounding communities. Ranches, event venues, outdoor ceremony spaces, and natural landscapes make the area well suited for celebrations ranging from intimate gatherings to large wedding weekends.',
		'Explore Bulverde wedding films by Mark Thomas Films to see real celebrations captured throughout this part of the Hill Country. These films highlight the emotion, relationships, scenery, and spontaneous moments that give each Bulverde wedding its own personality.'
	]
},

/* ==================================================
	CANYON LAKE
	================================================== */

'canyon lake': {
	name:	'Canyon Lake',
	type:	'location',
	paragraphs: [
		'Canyon Lake provides a scenic Texas Hill Country setting for weddings surrounded by open landscapes, natural beauty, and venues designed to take advantage of the area’s distinctive character. Couples planning a Canyon Lake wedding can create a celebration that feels both relaxed and visually memorable.',
		'Browse Canyon Lake wedding films by Mark Thomas Films to see how ceremonies, portraits, receptions, and candid moments unfold across real wedding days in the area. Each film preserves both the atmosphere of the location and the personal story of the couple celebrating there.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'Canyon Lake Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Canyon Lake, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning a wedding in Canyon Lake or the surrounding Texas Hill Country, we’d love to hear what you have in mind. Mark Thomas Films offers wedding videography and photography designed around real moments, natural emotion, and the people who matter most.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your Canyon Lake wedding day.'
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
	paragraphs: [
		'Canyon Springs Golf Club provides a scenic San Antonio setting for wedding ceremonies and receptions, combining landscaped outdoor spaces with a convenient location for couples celebrating in the city. The surroundings create opportunities for beautiful wedding-day imagery while keeping the celebration together in one location.',
		'Explore Canyon Springs Golf Club wedding films by Mark Thomas Films to see how real couples have celebrated at this San Antonio wedding venue. From preparations and vows to speeches, first dances, and the energy of the reception, each film tells the story of the day as it naturally unfolds.'
	]
},

/* ==================================================
	CASTROVILLE
	================================================== */

'castroville': {
	name:	'Castroville',
	type:	'location',
	paragraphs: [
		'Castroville offers couples a wedding setting with small-town Texas character, historic surroundings, and convenient access to the greater San Antonio area. Weddings in Castroville often bring together local traditions, family connections, and relaxed celebrations in a setting that feels distinct from the city.',
		'Browse Castroville wedding films by Mark Thomas Films to experience real celebrations filmed throughout the area. These stories preserve the vows, laughter, family interactions, reception energy, and personal moments that make every Castroville wedding unique.'
	]
},

/* ==================================================
	CESTOHOWA HALL
	================================================== */

'cestohowa hall': {
	name:	'Cestohowa Hall',
	type:	'venue',
	paragraphs: [
		'Cestohowa Hall provides a traditional gathering place for wedding receptions where family, community, music, food, dancing, and longtime traditions can all become part of the celebration. These elements often create the lively and deeply personal moments that make South Texas wedding receptions memorable.',
		'Explore wedding films featuring Cestohowa Hall by Mark Thomas Films to see real couples surrounded by the people and traditions that matter most to them. Each film captures both the planned events of the reception and the spontaneous interactions that give the celebration its personality.'
	]
},

/* ==================================================
	CHANDELIER OF GRUENE
	================================================== */

'chandelier of gruene': {
	name:	'Chandelier of Gruene',
	type:	'venue',
	paragraphs: [
		'Chandelier of Gruene offers a warm Texas Hill Country setting for weddings near New Braunfels, creating a beautiful backdrop for ceremonies, portraits, receptions, and the quieter moments in between. Its setting gives couples the opportunity to combine Hill Country atmosphere with a thoughtfully designed wedding venue.',
		'Browse Chandelier of Gruene wedding films by Mark Thomas Films to see how different couples make the venue their own. These films capture the emotion, details, relationships, dancing, and unscripted moments that turn a wedding at Chandelier of Gruene into a story worth preserving.'
	],
	header: {
		eyebrow: 'VENUE',
		title: 'Chandelier of Gruene Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Chandelier of Gruene',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning your wedding at The Chandelier of Gruene, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography built around real moments, natural emotion, and the people whose voices and relationships make the day meaningful.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your Chandelier of Gruene wedding.'
			]
		}
	}
},

/* ==================================================
	CONCAN
	================================================== */

'concan': {
	name:	'ConCan',
	type:	'location',
	paragraphs: [
		'ConCan weddings bring couples and their guests into one of the most recognizable natural areas of the Texas Hill Country. The Frio River, surrounding landscape, ranch properties, and relaxed destination atmosphere make ConCan an appealing setting for wedding weekends centered on time with family and friends.',
		'Explore ConCan wedding films by Mark Thomas Films to see real celebrations captured in this unique part of Texas. These films preserve not only the ceremony and reception, but also the scenery, relationships, laughter, and spontaneous moments that give a destination wedding in ConCan its character.'
	]
},

/* ==================================================
	CONCORDIA LUTHERAN CHURCH
	================================================== */

'concordia lutheran church': {
	name:	'Concordia Lutheran Church',
	type:	'church',
	paragraphs: [
		'Concordia Lutheran Church provides a meaningful setting for wedding ceremonies centered on faith, commitment, family, and community. A church ceremony creates moments that naturally become some of the most important parts of a wedding film, from the processional and vows to the reactions of the people closest to the couple.',
		'Browse wedding films featuring Concordia Lutheran Church by Mark Thomas Films to see how these ceremonies become part of the complete story of the wedding day. Each film preserves the words, traditions, emotions, and personal interactions that make the ceremony uniquely meaningful.'
	]
},

/* ==================================================
	CORPUS CHRISTI
	================================================== */

'corpus christi': {
	name:	'Corpus Christi',
	type:	'location',
	paragraphs: [
		'Corpus Christi weddings offer couples a distinctive South Texas setting shaped by the coast, city venues, churches, ballrooms, and waterfront surroundings. From large formal celebrations to intimate ceremonies, the area provides a wide range of possibilities for couples planning a wedding near the Texas Gulf Coast.',
		'Explore Corpus Christi wedding films by Mark Thomas Films to experience real celebrations filmed throughout the city. These stories capture everything from meaningful ceremonies and family traditions to reception entrances, speeches, dancing, and the candid moments that happen naturally throughout a wedding day.'
	]
},

/* ==================================================
	DEVILS RIVER DISTILLERY
	================================================== */

'devils river distillery': {
	name:	'Devils River Distillery',
	type:	'venue',
	paragraphs: [
		'Devils River Distillery offers a distinctive urban setting for couples looking for a San Antonio wedding or reception venue with character. Its atmosphere gives wedding celebrations a different visual personality from a traditional ballroom or ranch while still providing space for the moments and traditions that define the day.',
		'Browse Devils River Distillery wedding films by Mark Thomas Films to see how real couples have transformed the venue through décor, music, family, friends, and personal touches. Each film documents the energy and emotion of the celebration as it unfolds.'
	]
},

/* ==================================================
	DOS PALOMAS RANCH
	================================================== */

'dos palomas ranch': {
	name:	'Dos Palomas Ranch',
	type:	'venue',
	paragraphs: [
		'Dos Palomas Ranch offers a Texas ranch setting for wedding celebrations where open surroundings and a relaxed atmosphere can become part of the experience. Ranch weddings provide opportunities for outdoor ceremonies, natural portraits, family gatherings, and receptions filled with personality.',
		'Explore Dos Palomas Ranch wedding films by Mark Thomas Films to see how different couples bring their own style and traditions to the property. These films preserve the scenery, vows, relationships, dancing, and spontaneous moments that make each ranch wedding unique.'
	]
},

/* ==================================================
	EAGLE DANCER RANCH
	================================================== */

'eagle dancer ranch': {
	name:	'Eagle Dancer Ranch',
	type:	'venue',
	paragraphs: [
		'Eagle Dancer Ranch provides a scenic ranch setting for Texas weddings where outdoor surroundings and a sense of privacy create a natural backdrop for the celebration. The property gives couples room to build a wedding day around their own style, family traditions, and the people most important to them.',
		'Browse Eagle Dancer Ranch wedding films by Mark Thomas Films to see real wedding stories captured at the venue. From preparations and portraits to ceremonies, receptions, and late-night dancing, each film preserves the moments that gave the day its individual character.'
	]
},

/* ==================================================
	FALLS CITY
	================================================== */

'falls city': {
	name:	'Falls City',
	type:	'location',
	paragraphs: [
		'Falls City weddings often reflect the close family connections, community traditions, churches, halls, and rural South Texas surroundings that give the area its character. Celebrations here can feel deeply personal, with generations of family and longtime friends sharing in the wedding day.',
		'Explore Falls City wedding films by Mark Thomas Films to see real South Texas weddings documented with an emphasis on people, relationships, and authentic moments. Each film brings together the ceremony, celebration, and spontaneous interactions that make a wedding story worth remembering.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'Falls City Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Falls City, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning a Falls City wedding, we’d love to learn about your ceremony, reception plans, family traditions, and the moments that matter most to you. Mark Thomas Films creates story-driven wedding films and photography that preserve not only how the day looked, but the voices and emotions that made it yours.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding day.'
			]
		}
	}
},

/* ==================================================
	FREDERICKSBURG
	================================================== */

'fredericksburg': {
	name:	'Fredericksburg',
	type:	'location',
	paragraphs: [
		'Fredericksburg weddings place couples in a distinctive part of the Texas Hill Country where ranches, vineyards, historic surroundings, outdoor ceremony spaces, and destination-style weekends can all shape the celebration. The setting gives couples room to build a wedding experience that feels closely connected to the landscape and time spent with family and friends.',
		'Explore Fredericksburg wedding films by Mark Thomas Films to see real Hill Country celebrations preserved through cinematic storytelling focused on the people, voices, emotions, traditions, and unscripted moments that make each wedding different.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'Fredericksburg Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Fredericksburg, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning a wedding in Fredericksburg or the surrounding Texas Hill Country, we’d love to hear about the setting, timeline, and people you want to remember most. Mark Thomas Films offers story-driven wedding videography and photography for celebrations throughout the region.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding day.'
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
	paragraphs: [
		'Frio River weddings offer a destination-style experience surrounded by one of the Texas Hill Country’s most recognizable landscapes. The river, ranches, trees, hills, and relaxed atmosphere give couples a naturally beautiful setting for wedding weekends shared with family and friends.',
		'Browse Frio River wedding films by Mark Thomas Films to experience real celebrations captured throughout the area. These films combine the scenery of the Texas Hill Country with the emotional moments, personal traditions, laughter, and relationships that tell the complete story of each wedding.'
	]
},

/* ==================================================
	GEORGE WEST
	================================================== */

'george west': {
	name:	'George West',
	type:	'location',
	paragraphs: [
		'George West weddings bring together South Texas scenery, community, family traditions, and celebrations that often feel closely connected to the people and places surrounding the couple. Local churches, ranch properties, and reception spaces provide a range of settings for wedding days in the area.',
		'Explore George West wedding films by Mark Thomas Films to see real celebrations documented from beginning to end. These films preserve the vows, family connections, reception traditions, dancing, laughter, and unexpected moments that make every wedding different.'
	]
},

/* ==================================================
	GERONIMO OAKS
	================================================== */

'geronimo oaks': {
	name:	'Geronimo Oaks',
	type:	'venue',
	paragraphs: [
		'Geronimo Oaks offers a Texas wedding setting where natural surroundings and dedicated event spaces create a backdrop for ceremonies, portraits, receptions, and time spent with family and friends. The venue gives each couple room to personalize the day through décor, traditions, and the overall style of their celebration.',
		'Browse Geronimo Oaks wedding films by Mark Thomas Films to see how real weddings unfold at the venue. Each film combines the planned details of the day with candid interactions, emotional moments, speeches, dancing, and the energy of the people celebrating together.'
	]
},

/* ==================================================
	GONZALES
	================================================== */

'gonzales': {
	name:	'Gonzales',
	type:	'location',
	paragraphs: [
		'Gonzales weddings combine historic Texas character with churches, ranches, event spaces, and surrounding countryside that can accommodate many different styles of celebration. The area provides a distinctive setting for couples who want their wedding day to feel connected to family, community, and place.',
		'Explore Gonzales wedding films by Mark Thomas Films to see real wedding stories captured throughout the area. These films preserve the details couples planned as well as the unplanned laughter, emotions, conversations, and celebrations that ultimately make each wedding personal.'
	]
},

/* ==================================================
	HELOTES
	================================================== */

'helotes': {
	name:	'Helotes',
	type:	'location',
	paragraphs: [
		'Helotes weddings combine convenient access to San Antonio with the more relaxed character of the Hill Country edge. Couples can celebrate in churches, ranch-style properties, outdoor settings, and event venues while remaining close to the city and the people traveling from throughout the region.',
		'Browse Helotes wedding films by Mark Thomas Films to see real celebrations captured with a focus on meaningful vows, family relationships, speeches, traditions, reactions, and the candid moments that make each wedding personal.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'Helotes Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Helotes, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning a wedding in Helotes or the surrounding San Antonio and Hill Country area, we’d love to hear what you have in mind. Mark Thomas Films offers wedding videography and photography built around real moments, natural emotion, and the people who matter most.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding day.'
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
	paragraphs: [
		'Hofmann Ranch offers a Texas ranch setting for weddings where open surroundings and dedicated celebration spaces create opportunities for ceremonies, portraits, receptions, and relaxed time with guests. The setting allows couples to combine classic wedding traditions with the character of a ranch celebration.',
		'Browse Hofmann Ranch wedding films by Mark Thomas Films to see how different couples have made the venue their own. Each film documents the meaningful details, family relationships, ceremony moments, speeches, dancing, and spontaneous interactions that shaped the wedding day.'
	]
},

/* ==================================================
	HOLY TRINITY CATHOLIC CHURCH
	================================================== */

'holy trinity catholic church': {
	name:	'Holy Trinity Catholic Church',
	type:	'church',
	paragraphs: [
		'Holy Trinity Catholic Church provides a traditional and reverent setting for Catholic wedding ceremonies where faith, family, vows, and sacramental traditions become an important part of the wedding story. The ceremony often contains some of the most meaningful and emotionally significant moments of the entire day.',
		'Explore wedding films featuring Holy Trinity Catholic Church by Mark Thomas Films to see how these traditions and personal moments are preserved on film. Each wedding story connects the ceremony with the celebrations, relationships, and experiences that follow throughout the day.'
	]
},

/* ==================================================
	HOTEL EMMA
	================================================== */

'hotel emma': {
	name:	'Hotel Emma',
	type:	'venue',
	paragraphs: [
		'Hotel Emma at the Pearl brings together historic character, thoughtful design, and a strong sense of place, making it one of San Antonio’s most distinctive settings for wedding celebrations. Its architecture and surroundings provide a memorable backdrop for preparations, portraits, gatherings, and wedding-weekend events.',
		'Explore Hotel Emma wedding films by Mark Thomas Films to see how the atmosphere of the Pearl and the personal moments of each wedding come together on film. These stories capture the details, relationships, emotion, and energy that make every Hotel Emma wedding unique.'
	]
},

/* ==================================================
	HOTEL VALENCIA RIVERWALK
	================================================== */

'hotel valencia riverwalk': {
	name:	'Hotel Valencia Riverwalk',
	type:	'venue',
	paragraphs: [
		'Hotel Valencia Riverwalk offers couples a sophisticated downtown San Antonio setting with convenient access to the River Walk and the energy of the city. Hotel weddings allow preparations, portraits, gatherings, and celebrations to unfold within a setting designed for a complete wedding-day experience.',
		'Browse Hotel Valencia Riverwalk wedding films by Mark Thomas Films to see real San Antonio weddings captured in and around this downtown venue. Each film preserves the atmosphere of the setting while focusing on the couple, their families, and the moments that give the celebration its meaning.'
	]
},

/* ==================================================
	IMMACULATE CONCEPTION OF THE BLESSED
	VIRGIN MARY CATHOLIC CHURCH
	================================================== */

'immaculate conception of the blessed virgin mary catholic church': {
	name:	'Immaculate Conception of the Blessed Virgin Mary Catholic Church',
	type:	'church',
	paragraphs: [
		'Immaculate Conception of the Blessed Virgin Mary Catholic Church provides a meaningful setting for Catholic wedding ceremonies rooted in faith, family, tradition, and commitment. The processional, readings, vows, sacramental moments, and reactions of loved ones naturally become an important part of the wedding story.',
		'Browse wedding films featuring Immaculate Conception of the Blessed Virgin Mary Catholic Church by Mark Thomas Films to see how these ceremonies are preserved through cinematic wedding videography. Each film connects the significance of the ceremony with the people and celebrations surrounding it.'
	]
},

/* ==================================================
	JACK GUENTHER PAVILION
	================================================== */

'jack guenther pavilion': {
	name:	'Jack Guenther Pavilion',
	type:	'venue',
	paragraphs: [
		'Jack Guenther Pavilion offers a distinctive San Antonio setting for weddings and receptions, giving couples access to the character and scenery of the downtown River Walk area. Its location provides a strong visual backdrop for celebrations that combine the atmosphere of the city with personal wedding-day details.',
		'Explore Jack Guenther Pavilion wedding films by Mark Thomas Films to see real San Antonio celebrations captured at this unique venue. These films preserve everything from quiet interactions and emotional speeches to reception energy, dancing, and the moments couples may not have seen themselves.'
	]
},

/* ==================================================
	KENDALL POINT
	================================================== */

'kendall point': {
	name:	'Kendall Point',
	type:	'venue',
	paragraphs: [
		'Kendall Point is a memorable Boerne and Texas Hill Country wedding setting where elegant event spaces and expansive surroundings create opportunities for ceremonies, portraits, receptions, and a complete wedding-day experience. The venue provides a polished backdrop while still allowing each couple’s style to define the celebration.',
		'Browse Kendall Point wedding films by Mark Thomas Films to see how different couples make this Hill Country venue their own. These films capture vows, emotional reactions, family relationships, speeches, dances, and the unscripted moments that bring the full wedding story to life.'
	],
	header: {
		eyebrow: 'VENUE',
		title: 'Kendall Point Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Kendall Point in Boerne, Texas',
		heroVideoUrl: '',
		paragraphs: [
			'Mark Thomas Films has filmed more than 40 weddings at Kendall Point, giving us firsthand experience with the venue, its outdoor ceremony spaces, covered porches, ballroom, and the flow of a full wedding day. Our approach focuses on real moments, natural emotion, and the people and voices that make each celebration unique.'
		],
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
				'If you’re planning a wedding at Kendall Point, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography built around real moments, natural emotion, and the people who matter most.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your Kendall Point wedding day.'
			]
			/* Optional buttonText and VERIFIED buttonUrl may be added here. */
		}
	}
},

/* ==================================================
	KERRVILLE
	================================================== */

'kerrville': {
	name:	'Kerrville',
	type:	'location',
	paragraphs: [
		'Kerrville weddings place couples in the heart of the Texas Hill Country, surrounded by natural scenery, ranch properties, churches, and event venues suited to a wide variety of celebrations. The area is a popular destination for couples who want a wedding that combines Hill Country character with time shared among family and friends.',
		'Explore Kerrville wedding films by Mark Thomas Films to experience real wedding days captured throughout the area. These films preserve not only the beautiful settings couples choose, but also the emotion, relationships, traditions, and candid moments that make each Kerrville wedding personal.'
	]
},

/* ==================================================
	KOSCIUSKO HALL
	================================================== */

'kosciusko hall': {
	name:	'Kosciusko Hall',
	type:	'venue',
	paragraphs: [
		'Kosciusko Hall provides a traditional South Texas setting for wedding receptions centered on family, community, music, dancing, and celebration. Reception halls like this often become the setting for some of the most energetic and spontaneous moments of a wedding day.',
		'Browse wedding films featuring Kosciusko Hall by Mark Thomas Films to see real receptions filled with entrances, speeches, first dances, traditions, laughter, and late-night celebrations. Each film documents both the major events and the smaller interactions that couples may otherwise never get to see.'
	]
},

/* ==================================================
	LA VERNIA
	================================================== */

'la vernia': {
	name:	'La Vernia',
	type:	'location',
	paragraphs: [
		'La Vernia weddings offer couples a South Texas setting close to San Antonio while maintaining the character of a smaller community. Churches, ranches, halls, and event venues throughout the area provide options for weddings rooted in family, tradition, and a relaxed celebration with the people who matter most.',
		'Explore La Vernia wedding films by Mark Thomas Films to see real wedding stories from the area. These films preserve meaningful ceremonies, candid family interactions, reception traditions, speeches, dancing, and the unscripted moments that make every La Vernia wedding different.'
	]
},

/* ==================================================
	LULING
	================================================== */

'luling': {
	name:	'Luling',
	type:	'location',
	paragraphs: [
		'Luling provides a distinctive Central Texas setting for weddings that can include historic spaces, churches, outdoor venues, and celebrations shaped by local character. Its location between San Antonio and Austin also makes the area accessible for couples and guests coming from across Central Texas.',
		'Browse Luling wedding films by Mark Thomas Films to experience real celebrations filmed in the area. From ceremonies and family traditions to speeches, portraits, dancing, and candid interactions, each wedding film preserves the moments that made the day unique to the couple.'
	]
},

/* ==================================================
	MCKINNEY
	================================================== */

'mckinney': {
	name:	'McKinney',
	type:	'location',
	paragraphs: [
		'McKinney weddings offer couples a North Texas setting with a broad range of venues, churches, event spaces, and surrounding landscapes for ceremonies and receptions. Whether the celebration is formal, relaxed, modern, or traditional, the people and relationships surrounding the couple ultimately define the wedding day.',
		'Explore McKinney wedding films by Mark Thomas Films to see real Texas wedding stories documented through cinematic videography. These films preserve the vows, details, family connections, speeches, dancing, and unexpected moments that couples can return to long after the celebration is over.'
	]
},

/* ==================================================
	NATIVITY OF THE BLESSED VIRGIN MARY
	CATHOLIC CHURCH
	================================================== */

'nativity of the blessed virgin mary catholic church': {
	name:	'Nativity of the Blessed Virgin Mary Catholic Church',
	type:	'church',
	paragraphs: [
		'Nativity of the Blessed Virgin Mary Catholic Church provides a traditional setting for Catholic wedding ceremonies where faith, family, commitment, and generations of tradition come together. The ceremony creates meaningful opportunities to preserve the words, rituals, music, and reactions that are central to the marriage celebration.',
		'Explore wedding films featuring Nativity of the Blessed Virgin Mary Catholic Church by Mark Thomas Films to see how these ceremonies become part of a complete wedding story. Each film follows the emotional moments of the ceremony into the celebrations and relationships surrounding the couple throughout the day.'
	],
	header: {
		eyebrow: 'CHURCH',
		title: 'Nativity BVM Catholic Church Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Nativity of the Blessed Virgin Mary Catholic Church',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning your wedding ceremony at Nativity of the Blessed Virgin Mary Catholic Church, we’d love to learn about your plans for the ceremony, reception, family traditions, and the moments that matter most to you. Mark Thomas Films creates story-driven wedding films and photography designed to preserve both the significance of the ceremony and the celebration surrounding it.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding day.'
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
	paragraphs: [
		'New Braunfels is a popular Texas wedding destination where Hill Country scenery, historic Gruene, riverside settings, churches, ranches, and dedicated wedding venues give couples a wide range of options for their celebration. Its location between San Antonio and Austin makes it especially convenient for Central Texas weddings.',
		'Browse New Braunfels wedding films by Mark Thomas Films to see real celebrations at venues throughout the area. These films combine the setting and details of each wedding with the emotion, family relationships, traditions, and spontaneous moments that make the day worth remembering.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'New Braunfels Wedding Videographer',
		subtitle: 'Wedding Films & Photography in New Braunfels, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
	PANNA MARIA
	================================================== */

'panna maria': {
	name:	'Panna Maria',
	type:	'location',
	paragraphs: [
		'Panna Maria weddings are often deeply connected to faith, family, community, and generations of South Texas tradition. Historic surroundings, church ceremonies, family connections, and local reception celebrations give wedding days here a sense of place that becomes an important part of the story.',
		'Explore Panna Maria wedding films by Mark Thomas Films to see real celebrations shaped by these traditions and relationships. Each film preserves the ceremony, family interactions, reception energy, dancing, and meaningful moments that connect the couple’s wedding day to the people and community around them.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'Panna Maria Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Panna Maria, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
	paragraphs: [
		'Panna Maria Catholic Church provides a historic and meaningful setting for South Texas wedding ceremonies where faith, family, and tradition take center stage. The church and surrounding community give these ceremonies a strong sense of place that can become an important part of a couple’s wedding story.',
		'Explore wedding films featuring Panna Maria Catholic Church by Mark Thomas Films to see how vows, traditions, music, family reactions, and reverent moments are preserved through cinematic wedding videography. Each ceremony becomes part of a larger story that continues throughout the wedding-day celebration.'
	]
},

/* ==================================================
	PANNA MARIA HALL
	================================================== */

'panna maria hall': {
	name:	'Panna Maria Hall',
	type:	'venue',
	paragraphs: [
		'Panna Maria Hall serves as a gathering place for South Texas wedding receptions filled with family, tradition, conversation, music, and dancing. Celebrations here often reflect deep community connections and create the kind of spontaneous, energetic moments that make reception footage especially meaningful.',
		'Browse wedding films featuring Panna Maria Hall by Mark Thomas Films to see real celebrations unfold through speeches, dances, traditions, laughter, and time spent with loved ones. Each film preserves the personality of the reception and the people who made the wedding day memorable.'
	],
	header: {
		eyebrow: 'VENUE',
		title: 'Panna Maria Hall Wedding Videographer',
		subtitle: 'Wedding Films & Photography at Panna Maria Hall',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If your wedding celebration includes Panna Maria Hall, we’d love to hear about your ceremony, reception plans, family traditions, and the people who matter most to you. Mark Thomas Films creates wedding films and photography designed to preserve the full story of the day, including the voices and moments that can become even more meaningful with time.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding celebration.'
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
	paragraphs: [
		'Park 31 offers a Texas Hill Country wedding setting designed to accommodate ceremonies, receptions, portraits, and celebrations in one location. Its event spaces give couples the flexibility to create a wedding day that reflects their own style while taking advantage of the surrounding Hill Country atmosphere.',
		'Explore Park 31 wedding films by Mark Thomas Films to see how real couples have celebrated at the venue. Each film brings together the visual details of the setting with vows, family relationships, speeches, dancing, and the spontaneous moments that ultimately tell the story of the day.'
	]
},

/* ==================================================
	PRIVATE RANCH
	================================================== */

'private ranch': {
	name:	'Private Ranch',
	type:	'setting',
	paragraphs: [
		'Private ranch weddings give couples the freedom to celebrate in a setting that often carries personal, family, or regional significance. Open landscapes, familiar surroundings, custom layouts, and fewer traditional venue constraints can make a ranch wedding feel especially connected to the couple and the people closest to them.',
		'Browse private ranch wedding films by Mark Thomas Films to see how unique Texas properties become the backdrop for ceremonies and celebrations. These films capture the scenery and details of each location while keeping the focus on relationships, emotion, traditions, and authentic moments.'
	]
},

/* ==================================================
	RUSTIC FALLS AT VAUGHN RANCH
	================================================== */

'rustic falls at vaughn ranch': {
	name:	'Rustic Falls at Vaughn Ranch',
	type:	'venue',
	paragraphs: [
		'Rustic Falls at Vaughn Ranch offers a ranch-inspired Texas setting for wedding ceremonies and receptions, giving couples room to celebrate among natural surroundings and dedicated event spaces. The venue creates opportunities for outdoor moments, portraits, gatherings, and a reception that reflects the couple’s personality.',
		'Explore Rustic Falls at Vaughn Ranch wedding films by Mark Thomas Films to see real celebrations captured throughout the property. These films preserve the visual character of the venue alongside vows, family connections, speeches, dancing, laughter, and the moments that happen naturally between scheduled events.'
	]
},

/* ==================================================
	SAN ANTONIO
	================================================== */

'san antonio': {
	name:	'San Antonio',
	type:	'location',
	paragraphs: [
		'San Antonio offers an extraordinary variety of wedding settings, from historic churches and downtown hotels to Hill Country venues, elegant estates, gardens, ranches, and River Walk celebrations. That variety allows couples to create wedding days that feel distinctly personal while still reflecting the history and character of South Texas.',
		'Explore San Antonio wedding films by Mark Thomas Films to see real weddings captured at venues throughout the city and surrounding area. These films preserve ceremonies, family traditions, emotional reactions, speeches, dancing, and candid moments through cinematic San Antonio wedding videography.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'San Antonio Wedding Videographer',
		subtitle: 'Wedding Films & Photography in San Antonio, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
	paragraphs: [
		'San Antonio Botanical Garden offers couples a naturally beautiful wedding setting surrounded by gardens, architecture, and changing seasonal scenery. The variety of spaces throughout the property creates opportunities for ceremonies, portraits, cocktail hours, and celebrations with a visual character that differs from a traditional ballroom.',
		'Browse San Antonio Botanical Garden wedding films by Mark Thomas Films to see how real couples have celebrated in this distinctive San Antonio setting. Each film combines the surroundings with meaningful vows, relationships, details, laughter, and candid moments from throughout the wedding day.'
	]
},

/* ==================================================
	SAN FERNANDO CATHEDRAL
	================================================== */

'san fernando cathedral': {
	name:	'San Fernando Cathedral',
	type:	'church',
	paragraphs: [
		'San Fernando Cathedral provides an extraordinary downtown San Antonio setting for Catholic wedding ceremonies, combining architectural presence, history, faith, and a sense of occasion. The setting gives the ceremony a distinctive visual identity while keeping the vows and relationships at the center of the wedding story.',
		'Explore San Fernando Cathedral wedding films by Mark Thomas Films to see how the cathedral’s atmosphere complements the processional, vows, traditions, emotions, and family connections of each wedding. These films preserve the ceremony as part of a complete cinematic story of the day.'
	]
},

/* ==================================================
	SAN FERNANDO EVENT CENTRE
	================================================== */

'san fernando event centre': {
	name:	'San Fernando Event Centre',
	type:	'venue',
	paragraphs: [
		'San Fernando Event Centre provides a welcoming San Antonio setting for wedding receptions and celebrations where couples can bring together family, friends, traditions, décor, music, and personal details in one memorable evening. Reception spaces become especially meaningful once they are filled with the people who define the wedding day.',
		'Browse San Fernando Event Centre wedding films by Mark Thomas Films to experience real speeches, first dances, family traditions, laughter, and energetic receptions. Each film captures both the planned events and the unexpected moments that give every San Antonio wedding celebration its own personality.'
	]
},

/* ==================================================
	SEGUIN
	================================================== */

'seguin': {
	name:	'Seguin',
	type:	'location',
	paragraphs: [
		'Seguin weddings offer couples a Central Texas setting with historic character, churches, ranches, event venues, and easy access to San Antonio, New Braunfels, and surrounding communities. The area works well for celebrations that combine Texas tradition with the couple’s own style and family connections.',
		'Explore Seguin wedding films by Mark Thomas Films to see real celebrations documented throughout the area. These films preserve the meaningful ceremonies and carefully planned details along with candid conversations, emotional reactions, speeches, dancing, and all the moments that happen in between.'
	]
},

/* ==================================================
	SENDERA SPRINGS
	================================================== */

'sendera springs': {
	name:	'Sendera Springs',
	type:	'venue',
	paragraphs: [
		'Sendera Springs offers a Texas wedding setting where natural surroundings and dedicated event spaces provide a backdrop for ceremonies, portraits, receptions, and time spent with family and friends. The venue gives couples the flexibility to personalize their celebration while keeping the wedding-day experience connected in one place.',
		'Browse Sendera Springs wedding films by Mark Thomas Films to see how real couples have celebrated at the venue. Each story captures the details and scenery alongside vows, emotional reactions, family relationships, speeches, dancing, and the spontaneous moments couples may not have witnessed themselves.'
	]
},

/* ==================================================
	SPRING BRANCH
	================================================== */

'spring branch': {
	name:	'Spring Branch',
	type:	'location',
	paragraphs: [
		'Spring Branch weddings place couples in the Texas Hill Country with access to ranches, outdoor settings, churches, and dedicated wedding venues throughout the area. Located near San Antonio, Bulverde, and Canyon Lake, Spring Branch offers the scenery of the Hill Country without feeling far removed from the city.',
		'Explore Spring Branch wedding films by Mark Thomas Films to see real Texas Hill Country celebrations captured from preparations through the final reception moments. These films preserve both the beauty of the setting and the relationships, traditions, emotions, and energy that make each wedding unique.'
	],
	header: {
		eyebrow: 'LOCATION',
		title: 'Spring Branch Wedding Videographer',
		subtitle: 'Wedding Films & Photography in Spring Branch, Texas',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning a wedding in Spring Branch or the surrounding Texas Hill Country, we’d love to hear where you are celebrating and what matters most to you. Mark Thomas Films offers story-driven wedding videography and photography designed around real moments and natural emotion.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding day.'
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
	paragraphs: [
		'St. Andrew’s Lutheran Church provides a meaningful setting for wedding ceremonies centered on faith, commitment, family, and community. The ceremony brings together the vows, readings, music, traditions, and emotional reactions that often become some of the most important moments preserved from the wedding day.',
		'Browse wedding films featuring St. Andrew’s Lutheran Church by Mark Thomas Films to see how these ceremonies become part of a larger cinematic wedding story. Each film connects the significance of the ceremony with the relationships and celebrations that surround the couple throughout the day.'
	]
},

/* ==================================================
	ST. JOHN LUTHERAN CHURCH
	================================================== */

'st. john lutheran church': {
	name:	'St. John Lutheran Church',
	type:	'church',
	paragraphs: [
		'St. John Lutheran Church offers a traditional and meaningful setting for wedding ceremonies centered on commitment, family, faith, and the moments shared between a couple and the people closest to them. The ceremony naturally becomes one of the emotional foundations of the complete wedding story.',
		'Explore wedding films featuring St. John Lutheran Church by Mark Thomas Films to see how vows, readings, music, reactions, and quiet interactions are preserved on film. These intimate moments become an important part of remembering not only how the wedding looked, but how it felt.'
	]
},

/* ==================================================
	ST. JOSEPH'S CATHOLIC CHURCH
	================================================== */

"st. joseph's catholic church": {
	name:	'St. Joseph’s Catholic Church',
	type:	'church',
	paragraphs: [
		'St. Joseph’s Catholic Church provides a reverent and traditional setting for Catholic wedding ceremonies where faith, vows, family, and sacramental traditions create some of the most meaningful moments of the day. The church ceremony often becomes the emotional centerpiece around which the rest of the celebration unfolds.',
		'Browse wedding films featuring St. Joseph’s Catholic Church by Mark Thomas Films to see how ceremony traditions, emotional reactions, music, family connections, and personal moments become part of a timeless cinematic wedding story.'
	]
},

/* ==================================================
	ST. PAUL LUTHERAN CHURCH
	================================================== */

'st. paul lutheran church': {
	name:	'St. Paul Lutheran Church',
	type:	'church',
	paragraphs: [
		'St. Paul Lutheran Church provides a traditional setting for wedding ceremonies focused on faith, commitment, family, and the people gathered to support the couple. The vows, readings, music, processional, and recessional all contribute important moments to the larger story of the wedding day.',
		'Explore wedding films featuring St. Paul Lutheran Church by Mark Thomas Films to see how these ceremonies are captured and preserved through cinematic wedding videography. Each film connects the significance of the ceremony with the celebrations, relationships, and experiences that follow.'
	]
},

/* ==================================================
	ST. PETER CATHOLIC CHURCH
	================================================== */

'st. peter catholic church': {
	name:	'St. Peter Catholic Church',
	type:	'church',
	paragraphs: [
		'St. Peter Catholic Church provides a meaningful setting for Catholic wedding ceremonies shaped by faith, tradition, vows, and the presence of family and friends. The ceremony offers many of the moments couples most value seeing and hearing again, from the processional and readings to the exchange of vows and rings.',
		'Browse wedding films featuring St. Peter Catholic Church by Mark Thomas Films to experience how these traditions and personal moments are woven into a complete wedding story. Cinematic videography preserves not only the visual setting, but also the words, music, reactions, and emotion of the ceremony.'
	]
},

/* ==================================================
	STONE CREST VENUE
	================================================== */

'stone crest venue': {
	name:	'Stone Crest Venue',
	type:	'venue',
	paragraphs: [
		'Stone Crest Venue provides a Texas wedding setting designed for couples to bring ceremonies, receptions, portraits, and personal details together in one celebration. Dedicated wedding venues offer the flexibility to shape the space around the couple’s style while creating opportunities for both polished imagery and candid moments.',
		'Explore Stone Crest Venue wedding films by Mark Thomas Films to see how real couples have used the venue for their own celebrations. Each film documents the details of the day alongside vows, family connections, speeches, dancing, laughter, and the unscripted moments that tell the complete story.'
	]
},

/* ==================================================
	TEXAS HILL COUNTRY
	================================================== */

'texas hill country': {
	name:	'Texas Hill Country',
	type:	'location',
	paragraphs: [
		'Texas Hill Country weddings can take place beside lakes and rivers, beneath mature oak trees, on private ranches, at family homes, inside churches and chapels, and at venues that combine outdoor ceremony spaces with large indoor receptions. The region offers couples a wide range of landscapes and wedding styles within a recognizable Central Texas setting.',
		'Browse Texas Hill Country wedding films by Mark Thomas Films to see real celebrations across communities, venues, churches, ranches, and private properties throughout the region. Each film preserves the setting while keeping the people, voices, relationships, traditions, and unscripted moments at the center of the story.'
	],
	header: {
		eyebrow: 'REGION',
		title: 'Texas Hill Country Wedding Videographer',
		subtitle: 'Wedding Films & Photography Across the Texas Hill Country',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning a wedding in the Texas Hill Country, we’d love to hear where you’re celebrating and what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography for celebrations throughout the region, from established venues to private properties and destinations off the beaten path.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding day.'
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
	paragraphs: [
		'Texas weddings can take many different forms, from large celebrations at established wedding venues to intimate ceremonies on private ranches, family properties, churches, gardens, hotels, and unique event spaces throughout the state. Mark Thomas Films has documented weddings across Texas and the Hill Country, including secular and faith-based ceremonies, destination-style weekends, traditional receptions, and highly personal celebrations designed around each couple and their families.',
		'Browse Texas wedding films by Mark Thomas Films to see real celebrations captured in San Antonio, the Texas Hill Country, South Texas, Central Texas, and beyond. These films feature everything from private ranch weddings and elegant venue celebrations to church ceremonies, outdoor vows, large receptions, and intimate gatherings, all documented with a focus on authentic moments, family connections, meaningful traditions, and the natural story of the wedding day.'
	]
},

/* ==================================================
	THE ALLEN FARMHAUS
	================================================== */

'the allen farmhaus': {
	name:	'The Allen Farmhaus',
	type:	'venue',
	paragraphs: [
		'The Allen Farmhaus offers a New Braunfels wedding setting with Texas character and spaces designed for ceremonies, gatherings, portraits, and receptions. Its location gives couples the opportunity to create a celebration that feels connected to the Hill Country while remaining convenient to San Antonio and Central Texas.',
		'Browse The Allen Farmhaus wedding films by Mark Thomas Films to see how real couples have made the venue their own. These films preserve the setting and details along with meaningful vows, family relationships, speeches, dancing, laughter, and the moments that naturally happen throughout a wedding day.'
	]
},

/* ==================================================
	THE KENDALL
	================================================== */

'the kendall': {
	name:	'The Kendall',
	type:	'venue',
	paragraphs: [
		'The Kendall offers couples a distinctive Boerne setting with historic Hill Country character and convenient access to the shops, restaurants, and surroundings of the community. Weddings and wedding-weekend events here can combine the personality of downtown Boerne with meaningful time spent among family and friends.',
		'Explore The Kendall wedding films by Mark Thomas Films to see real Boerne wedding stories preserved through cinematic videography. These films focus on the relationships, details, emotion, conversations, and celebration that turn a beautiful location into a deeply personal wedding experience.'
	]
},

/* ==================================================
	THE MARQUARDT RANCH
	================================================== */

'the marquardt ranch': {
	name:	'The Marquardt Ranch',
	type:	'venue',
	paragraphs: [
		'The Marquardt Ranch offers a Texas ranch setting for weddings surrounded by open scenery and the relaxed character of the Hill Country. Ranch venues create opportunities for outdoor ceremonies, portraits, gatherings, and receptions where the landscape itself becomes part of the visual story of the day.',
		'Browse The Marquardt Ranch wedding films by Mark Thomas Films to see real couples celebrate through vows, family traditions, speeches, dancing, and candid moments. Each film combines the atmosphere of the ranch with the personalities and relationships that make every wedding different.'
	]
},

/* ==================================================
	THE OAKS AT BOERNE
	================================================== */

'the oaks at boerne': {
	name:	'The Oaks at Boerne',
	type:	'venue',
	paragraphs: [
		'The Oaks at Boerne offers a relaxed Texas Hill Country setting for weddings where natural surroundings and thoughtfully designed celebration spaces create a beautiful backdrop for ceremonies, portraits, and receptions. Its Boerne location gives couples the character of the Hill Country within easy reach of San Antonio.',
		'Explore wedding films from The Oaks at Boerne by Mark Thomas Films to see how ceremonies, receptions, family relationships, and candid moments unfold differently for every couple. Each film preserves both the visual setting and the emotion and energy that defined the wedding day.'
	]
},

/* ==================================================
	THE PRESERVE AT CANYON LAKE
	================================================== */

'the preserve at canyon lake': {
	name:	'The Preserve at Canyon Lake',
	type:	'venue',
	paragraphs: [
		'The Preserve at Canyon Lake offers a scenic Texas Hill Country setting for wedding celebrations where the surrounding landscape becomes part of the visual character of the day. The location gives couples opportunities for ceremonies, portraits, receptions, and quiet moments surrounded by the natural beauty of the Canyon Lake area.',
		'Browse wedding films from The Preserve at Canyon Lake by Mark Thomas Films to experience how each couple, celebration, and collection of meaningful moments comes together through cinematic storytelling. These films preserve both the beauty of the venue and the people who made the day unforgettable.'
	],
	header: {
		eyebrow: 'VENUE',
		title: 'The Preserve at Canyon Lake Wedding Videographer',
		subtitle: 'Wedding Films & Photography at The Preserve at Canyon Lake',
		heroVideoUrl: '',
		paragraphs: [],
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
				'If you’re planning your wedding at The Preserve at Canyon Lake, we’d love to hear what you have in mind. Mark Thomas Films offers story-driven wedding videography and photography built around the people and moments you’ll want to remember long after the celebration is over.',
				'Build a preliminary quote to explore coverage and pricing, then we can talk through the details of your wedding at The Preserve.'
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
	paragraphs: [
		'The Red Berry Estate offers an elegant San Antonio setting for weddings where refined event spaces, surrounding grounds, and carefully planned details create a strong visual backdrop for the celebration. The property gives couples multiple opportunities for memorable ceremony, portrait, reception, and wedding-day imagery.',
		'Explore wedding films from The Red Berry Estate by Mark Thomas Films to see how different couples transform the venue through their own style, relationships, traditions, and unforgettable moments. Each film documents both the polished details and the candid interactions that make the celebration personal.'
	]
},

/* ==================================================
	VILLA AT CIBOLO CHASE
	================================================== */

'villa at cibolo chase': {
	name:	'Villa at Cibolo Chase',
	type:	'venue',
	paragraphs: [
		'Villa at Cibolo Chase offers a distinctive Texas wedding setting for couples planning a celebration surrounded by family, friends, and thoughtfully chosen details. The venue provides a backdrop for ceremonies, portraits, receptions, and the many smaller interactions that happen naturally throughout a wedding day.',
		'Browse Villa at Cibolo Chase wedding films by Mark Thomas Films to see how real couples have made the venue part of their wedding story. Each film preserves the atmosphere of the location along with vows, emotional reactions, speeches, dancing, laughter, and candid moments.'
	]
},

/* ==================================================
	WILLOW RIDGE
	================================================== */

'willow ridge': {
	name:	'Willow Ridge',
	type:	'venue',
	paragraphs: [
		'Willow Ridge provides a Texas wedding setting where couples can bring together ceremony traditions, personal details, family connections, and a reception celebration in a setting designed for memorable events. The venue becomes unique with every wedding through the people and personalities that fill it.',
		'Explore Willow Ridge wedding films by Mark Thomas Films to see real wedding days documented through cinematic storytelling. These films capture the important scheduled moments along with the quiet interactions, laughter, emotional reactions, speeches, and dancing that couples often value most when looking back.'
	]
},

/* ==================================================
	YORKTOWN
	================================================== */

'yorktown': {
	name:	'Yorktown',
	type:	'location',
	paragraphs: [
		'Yorktown weddings often bring together the traditions, family connections, churches, halls, ranch properties, and South Texas character of the surrounding community. Celebrations in smaller Texas communities can feel especially personal because the people and places involved are often connected to generations of family history.',
		'Browse Yorktown wedding films by Mark Thomas Films to see real South Texas wedding stories preserved on film. These celebrations include meaningful ceremonies, family traditions, speeches, dancing, laughter, and the candid moments that allow couples to relive not only what happened, but how the day felt.'
	]
},

/* ==================================================
	ZEDLER MILL
	================================================== */

'zedler mill': {
	name:	'Zedler Mill',
	type:	'venue',
	paragraphs: [
		'Zedler Mill provides a distinctive Luling wedding setting where historic character and the surrounding property create a memorable backdrop for ceremonies, portraits, and celebrations. The location offers couples something visually different from a traditional ballroom while maintaining a strong connection to Central Texas.',
		'Explore Zedler Mill wedding films by Mark Thomas Films to see how real couples have celebrated at this Luling venue. These films combine the character of the setting with emotional vows, family relationships, speeches, dancing, laughter, and the spontaneous moments that complete the wedding story.'
	]
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