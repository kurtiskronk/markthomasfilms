/* =========================================================
	 MARK THOMAS FILMS
	 RELATED FILMS — RECOMMENDATION ENGINE

	 Reads the published film index. All same-venue films are
	 included when at least three are available. Otherwise
	 choose up to 10 films from the most specific available
	 geographic group, with same-venue films first.

	 No network requests or visitor tracking happen here.
	 films-related-ui.js will handle images and rendering.
	 ========================================================= */

(function () {
		'use strict';

		window.MTF = window.MTF || {};

		const MTF = window.MTF;

		const STATE_NAMES = {
				AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
				CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
				FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
				IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
				KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
				MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
				MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska',
				NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
				NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
				ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
				PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
				SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
				VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
				WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
				'QUINTANA ROO': 'Quintana Roo'
		};

		const REGION_TAGS = new Set([
				'texas hill country', 'hill country', 'south texas',
				'central texas', 'mexico', 'united states', 'usa'
		]);

		function normalize(value) {
				return String(value || '')
						.normalize('NFKD')
						.replace(/[\u0300-\u036f]/g, '')
						.replace(/[\u2018\u2019]/g, "'")
						.replace(/\s+/g, ' ')
						.trim()
						.toLowerCase();
		}

		function pathname(value) {
				try {
						const url = new URL(value, window.location.origin);
						const path = url.pathname.replace(/\/+$/, '');
						return /^\/films\/(?!tag\/|category\/)[^/]+$/i.test(path)
								? path
								: '';
				} catch (error) {
						return '';
				}
		}

		function stateName(tag) {
				const raw = String(tag || '').trim();
				const abbreviation = STATE_NAMES[raw.toUpperCase()];
				if (abbreviation) return abbreviation;

				return Object.values(STATE_NAMES).find(function (name) {
						return normalize(name) === normalize(raw);
				}) || null;
		}

		function uniqueTags(tags) {
				const seen = new Set();
				return (Array.isArray(tags) ? tags : []).filter(function (tag) {
						const key = normalize(tag);
						if (!key || seen.has(key)) return false;
						seen.add(key);
						return true;
				});
		}

		function classify(film, context, cities) {
				const metadata = { venues: [], cities: [], states: [] };

				uniqueTags(film.tags).forEach(function (tag) {
						const key = normalize(tag);
						const state = stateName(tag);
						const entry = context.get(key);
						const type = entry && entry.type;

						if (state) {
								metadata.states.push({ key: normalize(state), name: state });
						} else if (cities.has(key)) {
								metadata.cities.push({ key: key, name: tag });
						} else if (type === 'venue' || type === 'church') {
								metadata.venues.push({ key: key, name: tag });
						} else if (type === 'location' || type === 'setting' ||
											 REGION_TAGS.has(key)) {
								// A region or generic setting is not a specific venue.
						} else if (String(tag).replace(/[^A-Za-z]/g, '').length >= 3 &&
											 String(tag).replace(/[^A-Za-z]/g, '') ===
											 String(tag).replace(/[^A-Za-z]/g, '').toUpperCase()) {
								// Ignore administrative, all-caps and regional tags.
						} else {
								// Some genuine venue tags are not in filmTagContext yet.
								metadata.venues.push({ key: key, name: tag });
						}
				});

				return metadata;
		}

		function overlaps(first, second) {
				const keys = new Set(second.map(function (item) { return item.key; }));
				return first.some(function (item) { return keys.has(item.key); });
		}

		function buildCatalog() {
				const data = MTF.filmIndex;
				if (!data || !Array.isArray(data.films)) return [];

				const context = new Map(
						Object.entries(MTF.filmTagContext || {}).map(function (entry) {
								return [normalize(entry[0]), entry[1]];
						})
				);
				const cities = new Set(
						Array.from(MTF.filmCities || []).map(normalize)
				);
				const seen = new Set();

				return data.films.reduce(function (catalog, film) {
						const url = pathname(film.url);
						if (!url || seen.has(url)) return catalog;
						seen.add(url);
						catalog.push({
								film: Object.assign({}, film, { url: url }),
								metadata: classify(film, context, cities)
						});
						return catalog;
				}, []);
		}

		function getRecommendations(currentURL) {
				const catalog = buildCatalog();
				const currentPath = pathname(currentURL || window.location.pathname);
				const current = catalog.find(function (item) {
						return item.film.url === currentPath;
				});
				if (!current) return null;

				const config = MTF.filmRelatedConfig || {};

				// Deliberately do not use the old config.maxResults=2.
				// Venue-only collections have no cap; mixed collections do.
				const maxBroadResults =
						Number.isInteger(config.maxBroadResults) && config.maxBroadResults > 0
								? config.maxBroadResults : 10;
				const minVenueOnly =
						Number.isInteger(config.minVenueOnly) && config.minVenueOnly > 0
								? config.minVenueOnly : 3;

				const featured = new Set(
						(Array.isArray(config.featured) ? config.featured : [])
								.map(pathname)
								.filter(Boolean)
				);
				const others = catalog.filter(function (item) {
						return item.film.url !== currentPath;
				});

				if (!others.length) return null;

				// The primary venue is the current film's venue that appears
				// most frequently elsewhere; ties retain Squarespace tag order.
				const rankedVenues = current.metadata.venues.map(function (venue) {
						return {
								venue: venue,
								count: others.filter(function (item) {
										return item.metadata.venues.some(function (candidate) {
												return candidate.key === venue.key;
										});
								}).length
						};
				}).sort(function (a, b) { return b.count - a.count; });

				const primary = rankedVenues.length ? rankedVenues[0].venue : null;

				function matchesVenue(item) {
						return Boolean(primary && item.metadata.venues.some(function (venue) {
								return venue.key === primary.key;
						}));
				}

				function matchesCity(item) {
						return overlaps(item.metadata.cities, current.metadata.cities);
				}

				function matchesState(item) {
						return overlaps(item.metadata.states, current.metadata.states);
				}

				function newestFirst(a, b) {
						const featuredDifference =
								Number(featured.has(b.film.url)) -
								Number(featured.has(a.film.url));
						if (featuredDifference) return featuredDifference;

						const dateDifference = String(b.film.published || '')
								.localeCompare(String(a.film.published || ''));
						return dateDifference || a.film.url.localeCompare(b.film.url);
				}

				const venueMatches = others.filter(matchesVenue).sort(newestFirst);
				const sameCityMatches = others.filter(matchesCity).sort(newestFirst);
				const sameStateMatches = others.filter(matchesState).sort(newestFirst);

				const venueOnly = venueMatches.length >= minVenueOnly;
				let selected = [];

				if (venueOnly) {
						// The principal trust signal: show ALL weddings at this venue.
						selected = venueMatches.map(function (item) {
								return { item: item, matchType: 'venue' };
						});
				} else {
						// Keep the heading specific: choose ONE geographic scope.
						// If Boerne has other films, don't pad with unrelated TX films.
						let candidates;
						if (sameCityMatches.some(function (item) { return !matchesVenue(item); })) {
								candidates = others.filter(function (item) {
										return matchesVenue(item) || matchesCity(item);
								});
						} else if (sameStateMatches.some(function (item) { return !matchesVenue(item); })) {
								candidates = others.filter(function (item) {
										return matchesVenue(item) || matchesState(item);
								});
						} else if (venueMatches.length) {
								// No broader geographic matches: the small venue set is
								// still accurate and useful by itself.
								candidates = venueMatches;
						} else if (sameCityMatches.length) {
								candidates = sameCityMatches;
						} else if (sameStateMatches.length) {
								candidates = sameStateMatches;
						} else {
								// Mexico with no other Mexico films falls back to the
								// general portfolio rather than suggesting false locality.
								candidates = others;
						}

						// Venue > city > state > other, then featured and recency
						// INSIDE each tier. Never duplicate a film across tiers.
						const priorities = ['venue', 'city', 'state', 'all'];
						const seen = new Set();

						priorities.forEach(function (tier) {
								if (selected.length >= maxBroadResults) return;
								candidates.filter(function (item) {
										if (seen.has(item.film.url)) return false;
										if (tier === 'venue') return matchesVenue(item);
										if (tier === 'city') return matchesCity(item) && !matchesVenue(item);
										if (tier === 'state') {
												return matchesState(item) && !matchesCity(item) && !matchesVenue(item);
										}
										return !matchesVenue(item) && !matchesCity(item) && !matchesState(item);
								}).sort(newestFirst).forEach(function (item) {
										if (selected.length >= maxBroadResults) return;
										seen.add(item.film.url);
										selected.push({ item: item, matchType: tier });
								});
						});
				}

				if (!selected.length) return null;

				// A geographic headline is used only if EVERY selected film
				// shares that same location with the current film.
				let headingType = 'all';
				let headingName = '';

				if (primary && selected.every(function (selection) {
						return matchesVenue(selection.item);
				})) {
						headingType = 'venue';
						headingName = primary.name;
				} else {
						const sharedCity = current.metadata.cities.find(function (city) {
								return selected.every(function (selection) {
										return selection.item.metadata.cities.some(function (candidate) {
												return candidate.key === city.key;
										});
								});
						});
						const sharedState = current.metadata.states.find(function (state) {
								return selected.every(function (selection) {
										return selection.item.metadata.states.some(function (candidate) {
												return candidate.key === state.key;
										});
								});
						});

						if (sharedCity) {
								headingType = 'city';
								headingName = sharedCity.name;
						} else if (sharedState) {
								headingType = 'state';
								headingName = sharedState.name;
						}
				}

				const defaultHeadings = {
						venue: 'More Weddings at {name}',
						city: 'More Weddings in {name}',
						state: 'More {name} Wedding Films',
						all: 'More Wedding Films'
				};
				// Use the existing venue/city/state overrides if provided.
				// For the no-location case, the agreed heading is exactly
				// "More Wedding Films" (not the old config's "Explore More").
				const configuredHeadings = config.headings || {};
				const template = headingType === 'all'
						? (configuredHeadings.fallback || defaultHeadings.all)
						: (configuredHeadings[headingType] || defaultHeadings[headingType]);

				return {
						current: current.film,
						primaryVenue: primary ? primary.name : null,
						headingType: headingType,
						heading: template.replace('{name}', headingName),
						venueOnly: venueOnly,
						sameVenueCount: venueMatches.length,
						films: selected.map(function (selection) {
								return Object.assign({}, selection.item.film, {
										matchType: selection.matchType
								});
						})
				};
		}

		MTF.filmRelated = { getRecommendations: getRecommendations };

})();
