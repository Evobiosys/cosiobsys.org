// cb-places.js — source of truth for the CB network places.
// To propagate: cp assets/js/cb-places.js ../../EvoBioSys/Projects/evobioSYS-sys/news/WorldNews/cb-places.js
// Schema: { id, name, location, lat, lng, category, url, description }
// Categories: 'default' = active node | 'conversation' = in conversation | 'partner' = deferred

window.CB_PLACES = [
  {
    id: 'liminal-village',
    name: 'Liminal Village',
    location: 'Italy',
    lat: 42.23,
    lng: 12.68,
    category: 'default',
    url: null,
    description: 'A living community and gathering space in central Italy.'
  },
  {
    id: 'terraescola',
    name: 'TerraEscola',
    location: 'Brazil',
    lat: -20.5,
    lng: -43.5,
    category: 'default',
    url: 'https://terraescola.org',
    description: 'Educational ecovillage project in Brazil.'
  },
  {
    id: 'embassy-network',
    name: 'Embassy Network',
    location: 'San Francisco, USA',
    lat: 37.7749,
    lng: -122.4194,
    category: 'default',
    url: 'https://embassynetwork.com',
    description: 'Hub of the Embassy Network — a global network of coliving communities anchored in San Francisco.'
  }
];
