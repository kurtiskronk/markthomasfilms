/* =========================================================
   MARK THOMAS FILMS — INDIVIDUAL FILM HEADER + BREADCRUMBS

   Uses the published film index rather than guessing a
   venue or city from a film's URL. Enhances Squarespace's
   existing film H1; does not add a second H1 or affect the
   film player, archive pages, or native SEO-title settings.

   Load AFTER films-related-index.js, films-tag-context.js,
   and films-cities-list.js. Self-initializes on DOM ready.
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

  // Published location tags not yet represented by films-cities-list.js.
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
      return new URL(value, window.location.origin).pathname.replace(/\/+$/, '');
    } catch (error) {
      return '';
    }
  }

  function isIndividualFilmPage() {
    return /^\/films\/(?!tag\/|category\/)[^/]+$/i.test(
      trimPath(window.location.pathname)
    );
  }

  function findCurrentFilm() {
    const list = MTF.filmIndex && MTF.filmIndex.films;
    if (!Array.isArray(list)) return null;
    const here = trimPath(window.location.pathname);
    return list.find(function (film) {
      return trimPath(film.url) === here;
    }) || null;
  }

  function tagURL(name) {
    // Squarespace uses + for spaces in tag URLs, not %20.
    return '/films/tag/' + encodeURIComponent(name).replace(/%20/g, '+');
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

  function tagContext(name) {
    const map = MTF.filmTagContext || {};
    const key = normalize(name);
    return Object.keys(map).reduce(function (found, entry) {
      return found || (normalize(entry) === key ? map[entry] : null);
    }, null);
  }

  function isKnownCity(name) {
    const key = normalize(name);
    if (ADDITIONAL_CITIES.has(key)) return true;
    const cityList = MTF.filmCities;
    if (cityList && typeof cityList.has === 'function' && cityList.has(key)) {
      return true;
    }
    const context = tagContext(name);
    return Boolean(context && context.type === 'location' && !REGIONS.has(key));
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
      return !expandedState(item.name) &&
        !Object.prototype.hasOwnProperty.call(COUNTRIES, item.key) &&
        !REGIONS.has(item.key) &&
        !isAdminTag(item.name);
    });

    const cities = eligible.filter(function (item) {
      return isKnownCity(item.name);
    });

    if (!cities.length && eligible.length) {
      // Standard tag order is venue(s), city, state. If a
      // town is missing from the location registry, the
      // untyped tag immediately before the state is its city.
      const priorToState = stateTag
        ? eligible.filter(function (item) {
            return tags.indexOf(item) < tags.indexOf(stateTag);
          })
        : eligible;
      const untyped = priorToState.filter(function (item) {
        const context = tagContext(item.name);
        return !context || (context.type !== 'venue' && context.type !== 'church');
      });

      if (untyped.length && (state || country)) {
        cities.push(untyped[untyped.length - 1]);
      }
    }

    const cityKeys = new Set(cities.map(function (item) { return item.key; }));
    const venues = eligible.filter(function (item) {
      return !cityKeys.has(item.key);
    });

    // Never claim a region or a state is a wedding venue.
    return {
      city: cities.length ? cities[0].name : '',
      cities: cities.map(function (item) { return item.name; }),
      venues: venues.map(function (item) { return item.name; }),
      state: state,
      country: country
    };
  }

  function locationText(location) {
    const names = location.cities && location.cities.length
      ? location.cities.join(' / ') : location.city;
    const destination = [names, location.state].filter(Boolean).join(', ');
    const suffix = location.country && location.country !== 'United States'
      ? [destination, location.country].filter(Boolean).join(', ')
      : destination;
    return location.venues.concat(suffix ? [suffix] : []).join('  ·  ');
  }

  function primaryDestination(film, location) {
    const choices = location.venues.map(function (venue, index) {
      const key = normalize(venue);
      const others = MTF.filmIndex && Array.isArray(MTF.filmIndex.films)
        ? MTF.filmIndex.films : [];
      const count = others.filter(function (candidate) {
        return trimPath(candidate.url) !== trimPath(film.url) &&
          Array.isArray(candidate.tags) &&
          candidate.tags.some(function (tag) { return normalize(tag) === key; });
      }).length;
      return { venue: venue, index: index, count: count };
    }).sort(function (a, b) {
      return b.count - a.count || a.index - b.index;
    });

    const primary = choices[0] || null;
    // When venue and city tags are paired in the same order,
    // retain the city that actually belongs to the chosen venue.
    const matchedCity = primary && location.cities.length === location.venues.length
      ? location.cities[primary.index] : location.city;

    return { venue: primary ? primary.venue : '', city: matchedCity };
  }

  function breadcrumbItems(film, location) {
    const crumbs = [{ name: 'Films', href: '/films' }];
    const primary = primaryDestination(film, location);

    if (primary.city) {
      crumbs.push({ name: primary.city, href: tagURL(primary.city) });
    }

    if (primary.venue && normalize(primary.venue) !== normalize(primary.city)) {
      crumbs.push({ name: primary.venue, href: tagURL(primary.venue) });
    }

    crumbs.push({ name: film.title, href: trimPath(film.url), current: true });
    return crumbs;
  }

  function makeBreadcrumbNav(crumbs) {
    const nav = document.createElement('nav');
    nav.className = 'mtf-film-detail__breadcrumbs';
    nav.setAttribute('aria-label', 'Wedding film breadcrumbs');

    const label = document.createElement('span');
    label.className = 'mtf-film-detail__crumb-label';
    label.textContent = 'Navigate to:';
    nav.appendChild(label);

    const list = document.createElement('ol');
    list.className = 'mtf-film-detail__crumb-list';
    list.setAttribute('role', 'list');

    crumbs.forEach(function (crumb, index) {
      const li = document.createElement('li');
      li.className = 'mtf-film-detail__crumb';

      if (index > 0) {
        const separator = document.createElement('span');
        separator.className = 'mtf-film-detail__crumb-separator';
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '›';
        li.appendChild(separator);
      }

      if (crumb.current) {
        const current = document.createElement('span');
        current.className = 'mtf-film-detail__crumb-current';
        current.setAttribute('aria-current', 'page');
        current.textContent = crumb.name;
        li.appendChild(current);
      } else {
        const link = document.createElement('a');
        link.className = 'mtf-film-detail__crumb-link';
        link.href = crumb.href;
        link.textContent = crumb.name;
        li.appendChild(link);
      }

      list.appendChild(li);
    });

    nav.appendChild(list);
    return nav;
  }

  function hasExistingBreadcrumbSchema() {
    return Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    ).some(function (node) {
      return /["']BreadcrumbList["']/.test(node.textContent || '');
    });
  }

  function addBreadcrumbSchema(crumbs) {
    if (hasExistingBreadcrumbSchema()) return;

    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(function (crumb, index) {
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: new URL(crumb.href, window.location.origin).href
        };
      })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-mtf-film-breadcrumb-schema', '');
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    document.head.appendChild(script);
  }

  function findNativeTitle(header) {
    return header.querySelector(
      'h1.entry-title, h1.blog-item-title, ' +
      'h2.entry-title, h2.blog-item-title, ' +
      'h1, h2'
    );
  }

  function init() {
    if (!isIndividualFilmPage()) return null;

    const existing = document.querySelector('.mtf-film-detail__breadcrumbs');
    if (existing) return existing;

    const film = findCurrentFilm();
    if (!film || !film.title) return null;

    const header = document.querySelector('.blog-item-top-wrapper');
    if (!header) return null;

    const title = findNativeTitle(header);
    if (!title) return null;

    const location = classifyTags(film.tags);
    const crumbs = breadcrumbItems(film, location);

    const nav = makeBreadcrumbNav(crumbs);
    header.insertBefore(nav, header.firstChild);

    // Preserve Squarespace's native H1 and native meta/SEO tags.
    title.textContent = film.title;
    title.classList.add('mtf-film-detail__couple-title');
    header.classList.add('mtf-film-detail-header');

    const subtitleText = locationText(location);
    if (subtitleText) {
      const subtitle = document.createElement('p');
      subtitle.className = 'mtf-film-detail__subtitle';
      subtitle.textContent = subtitleText;
      title.insertAdjacentElement('afterend', subtitle);
    }

    addBreadcrumbSchema(crumbs);
    return nav;
  }

  MTF.filmDetailHeader = {
    init: init,
    // Expose pure helpers to simplify regression testing.
    classifyTags: classifyTags,
    breadcrumbItems: breadcrumbItems
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
