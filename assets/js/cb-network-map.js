(function () {
  'use strict';

  function injectStyles() {
    var css = ''
      + '.cb-map-marker{display:flex;align-items:center;gap:5px;cursor:pointer;font-family:inherit;}'
      + '.cbm-dot{width:10px;height:10px;border-radius:50%;background:#2b8c8f;display:inline-block;}'
      + '.cbm-ring{width:12px;height:12px;border-radius:50%;border:2px dashed #2b8c8f;display:inline-block;background:transparent;}'
      + '.cbm-label{font-size:0.75rem;color:#1a6b70;font-weight:500;white-space:nowrap;}'
      + '.maplibregl-popup-content{background:#fdf8f0;border:1px solid #e2d8c8;color:#2a1f15;border-radius:6px;padding:0.8rem;max-width:220px;font-family:inherit;}'
      + '.cbp-name{font-weight:600;color:#0e3e42;margin-bottom:0.2rem;}'
      + '.cbp-loc{font-size:0.8rem;color:#6d5d4a;margin-bottom:0.4rem;}'
      + '.cbp-desc{font-size:0.85rem;color:#2a1f15;line-height:1.4;}'
      + '.cbp-link{margin-top:0.5rem;font-size:0.8rem;}'
      + '.cbp-link a{color:#2b8c8f;}';
    var el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  function initCBMap() {
    if (!window.maplibregl || !window.CB_PLACES) return;
    var container = document.getElementById('cb-map');
    if (!container) return;
    var map = new maplibregl.Map({
      container: 'cb-map',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [10, 25],
      zoom: 1.7,
      attributionControl: false,
      renderWorldCopies: false
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('load', function () {
      CB_PLACES.forEach(function (place) {
        if (place.category === 'partner') return; // deferred
        addCBMarker(map, place);
      });
    });
  }

  function addCBMarker(map, place) {
    var el = document.createElement('div');
    el.className = 'cb-map-marker cb-marker-' + place.category;
    var dot = place.category === 'conversation'
      ? '<span class="cbm-ring"></span>'
      : '<span class="cbm-dot"></span>';
    el.innerHTML = dot + '<span class="cbm-label">' + escHtml(place.name) + '</span>';
    el.addEventListener('click', function (ev) {
      ev.stopPropagation();
      new maplibregl.Popup({ offset: 14, closeButton: true })
        .setLngLat([place.lng, place.lat])
        .setHTML(popupHTML(place))
        .addTo(map);
    });
    new maplibregl.Marker({ element: el, anchor: 'left' })
      .setLngLat([place.lng, place.lat])
      .addTo(map);
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function popupHTML(p) {
    var link = p.url ? '<div class="cbp-link"><a href="' + escHtml(p.url) + '" target="_blank" rel="noopener">' + escHtml(p.url) + '</a></div>' : '';
    return '<div class="cbp-name">' + escHtml(p.name) + '</div>'
      + '<div class="cbp-loc">' + escHtml(p.location) + '</div>'
      + (p.description ? '<div class="cbp-desc">' + escHtml(p.description) + '</div>' : '')
      + link;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { injectStyles(); initCBMap(); });
  } else {
    injectStyles();
    initCBMap();
  }
})();
