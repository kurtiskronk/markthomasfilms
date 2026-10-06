/* =========================================================
   MARK THOMAS FILMS — FILMS BREADCRUMB LOGIC

   Film-specific hierarchy only. Rendering, accessibility and
   BreadcrumbList schema live in site-breadcrumbs.js.

   Load AFTER:
   - films-tag-context.js
   - films-cities-list.js
   - films-related-index.js

   Load BEFORE:
   - films-header.js
   - films-detail-header.js
   ========================================================= */
(function () {
  'use strict';

  window.MTF = window.MTF || {};
  const MTF = window.MTF;

  const STATES = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
    CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
    FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
    IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
    KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
    MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
    NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
    NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
    NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
    OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
    RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
    TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
    VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
    WI: 'Wisconsin', WY: 'Wyoming',
    'QUINTANA ROO': 'Quintana Roo'
  };

  const REGIONS = new Set([
    'texas hill country', 'hill country', 'south texas',
    'central texas', 'north texas', 'west texas',
    'united states', 'usa'
  ]);

  const ADDITIONAL_CITIES = new Set(['cestohowa']);

  const COUNTRIES = {
    mexico: 'Mexico',
    'united states': 'United States',
    usa: 'United States'
  };

  function normalize(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function trimPath(value) {
    try {
      return new URL(value, window.location.origin)
        .pathname.replace(/\/+$/, '');
    } catch (error) {
      return '';
    }
  }

  function tagURL(name) {
    return '/films/tag/' +
      encodeURIComponent(String(name || '').trim())
        .replace(/%20/g, '+');
  }

  function tagContext(name) {
    const map = MTF.filmTagContext || {};
    const key = normalize(name);

    return Object.keys(map).reduce(function (found, entry) {
      return found || (normalize(entry) === key ? map[entry] : null);
    }, null);
  }

  function isAdminTag(name) {
    const letters = String(name).replace(/[^A-Za-z]/g, '');
    return letters.length >= 3 && letters === letters.toUpperCase();
  }

  function expandedState(name) {
    const raw = String(name || '').trim();
    const byCode = STATES[raw.toUpperCase()];
    if (byCode) return byCode;

    const key = normalize(raw);

    return Object.values(STATES).find(function (item) {
      return normalize(item) === key;
    }) || null;
  }

  function isKnownCity(name) {
    const key = normalize(name);

    if (ADDITIONAL_CITIES.has(key)) return true;

    const cityList = MTF.filmCities;

    if (
      cityList &&
      typeof cityList.has === 'function' &&
      cityList.has(key)
    ) {
      return true;
    }

    const context = tagContext(name);

    return Boolean(
      context &&
      context.type === 'location' &&
      !REGIONS.has(key)
    );
  }

  function classifyTags(rawTags) {
    const tags = [];
    const seen = new Set();

    (Array.isArray(rawTags) ? rawTags : []).forEach(function (value) {
      const name = String(value || '').trim();
      const key = normalize(name);

      if (!name || !key || seen.has(key)) return;

      seen.add(key);
      tags.push({ name: name, key: key });
    });

    const countryTag = tags.find(function (item) {
      return Object.prototype.hasOwnProperty.call(COUNTRIES, item.key);
    });

    const country = countryTag ? COUNTRIES[countryTag.key] : '';

    const stateTag = tags.find(function (item) {
      return expandedState(item.name) !== null;
    });

    const state = stateTag ? expandedState(stateTag.name) : '';

    const eligible = tags.filter(function (item) {
      return (
        !expandedState(item.name) &&
        !Object.prototype.hasOwnProperty.call(COUNTRIES, item.key) &&
        !REGIONS.has(item.key) &&
        !isAdminTag(item.name)
      );
    });

    const cities = eligible.filter(function (item) {
      return isKnownCity(item.name);
    });

    if (!cities.length && eligible.length) {
      const priorToState = stateTag
        ? eligible.filter(function (item) {
            return tags.indexOf(item) < tags.indexOf(stateTag);
          })
        : eligible;

      const untyped = priorToState.filter(function (item) {
        const context = tagContext(item.name);

        return !context ||
          (context.type !== 'venue' && context.type !== 'church');
      });

      if (untyped.length && (state || country)) {
        cities.push(untyped[untyped.length - 1]);
      }
    }

    const cityKeys = new Set(
      cities.map(function (item) {
        return item.key;
      })
    );

    const venues = eligible.filter(function (item) {
      return !cityKeys.has(item.key);
    });

    return {
      city: cities.length ? cities[0].name : '',
      cities: cities.map(function (item) { return item.name; }),
      venues: venues.map(function (item) { return item.name; }),
      state: state,
      stateTag: stateTag ? stateTag.name : '',
      country: country,
      countryTag: countryTag ? countryTag.name : ''
    };
  }

  function filmList() {
    return MTF.filmIndex && Array.isArray(MTF.filmIndex.films)
      ? MTF.filmIndex.films
      : [];
  }

  function findCurrentFilm() {
    const here = trimPath(window.location.pathname);

    return filmList().find(function (film) {
      return trimPath(film.url) === here;
    }) || null;
  }

  function primaryDestination(film, location) {
    const choices = location.venues.map(function (venue, index) {
      const key = normalize(venue);

      const count = filmList().filter(function (candidate) {
        return (
          trimPath(candidate.url) !== trimPath(film.url) &&
          Array.isArray(candidate.tags) &&
          candidate.tags.some(function (tag) {
            return normalize(tag) === key;
          })
        );
      }).length;

      return {
        venue: venue,
        index: index,
        count: count
      };
    }).sort(function (a, b) {
      return b.count - a.count || a.index - b.index;
    });

    const primary = choices[0] || null;

    const matchedCity =
      primary &&
      location.cities.length === location.venues.length
        ? location.cities[primary.index]
        : location.city;

    return {
      venue: primary ? primary.venue : '',
      city: matchedCity
    };
  }

  function filmItems(film, location) {
    const crumbs = [
      { label: 'Films', href: '/films' }
    ];

    const destination = primaryDestination(film, location);

    if (destination.city) {
      crumbs.push({
        label: destination.city,
        href: tagURL(destination.city)
      });
    }

    if (
      destination.venue &&
      normalize(destination.venue) !== normalize(destination.city)
    ) {
      crumbs.push({
        label: destination.venue,
        href: tagURL(destination.venue)
      });
    }

    crumbs.push({
      label: film.title,
      current: true
    });

    return crumbs;
  }

  function filmsWithTag(name) {
    const key = normalize(name);

    return filmList().filter(function (film) {
      return (
        Array.isArray(film.tags) &&
        film.tags.some(function (tag) {
          return normalize(tag) === key;
        })
      );
    });
  }

  function parentCityForTag(name) {
    const tagKey = normalize(name);
    const counts = new Map();

    filmsWithTag(name).forEach(function (film) {
      const location = classifyTags(film.tags);

      const venueIndex = location.venues.findIndex(function (venue) {
        return normalize(venue) === tagKey;
      });

      let city = '';

      if (
        venueIndex >= 0 &&
        location.cities.length === location.venues.length
      ) {
        city = location.cities[venueIndex] || '';
      } else {
        city = location.city || '';
      }

      if (!city || normalize(city) === tagKey) return;

      const cityKey = normalize(city);
      const existing = counts.get(cityKey) || {
        name: city,
        count: 0
      };

      existing.count += 1;
      counts.set(cityKey, existing);
    });

    const ranked = Array.from(counts.values()).sort(function (a, b) {
      return b.count - a.count || a.name.localeCompare(b.name);
    });

    return ranked.length ? ranked[0].name : '';
  }

  function archiveItems(archive, context) {
    if (!archive || archive.type !== 'tag') return [];

    const currentName = String(
      (context && context.name) ||
      archive.name ||
      ''
    ).trim();

    if (!currentName) return [];

    const crumbs = [
      { label: 'Films', href: '/films' }
    ];

    const type = context
      ? String(context.type || '').toLowerCase()
      : '';

    if (type === 'venue' || type === 'church') {
      const city = parentCityForTag(archive.name);

      if (city && normalize(city) !== normalize(currentName)) {
        crumbs.push({
          label: city,
          href: tagURL(city)
        });
      }
    }

    crumbs.push({
      label: currentName,
      current: true
    });

    return crumbs;
  }

  MTF.filmBreadcrumbs = {
    normalize: normalize,
    trimPath: trimPath,
    tagURL: tagURL,
    classifyTags: classifyTags,
    findCurrentFilm: findCurrentFilm,
    filmItems: filmItems,
    archiveItems: archiveItems
  };

})();
