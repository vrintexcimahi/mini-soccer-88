/* =====================================================
   Geolocation Detection Module — Mini Soccer 88
   ===================================================== */

(function () {
  'use strict';

  const LS_KEY  = 'ms88_location';
  const LS_DENY = 'ms88_location_denied';
  const LS_AUTO_POPUP = 'ms88_geo_popup_enabled';

  // Venue coordinates (Pusdikif Cimahi)
  const VENUE_LAT = -6.8854;
  const VENUE_LNG = 107.5367;

  /* ---- Public API ---- */
  window.GeoMS88 = {
    init,
    getLocation,
    getDistance,
    showModal,
    clearLocation,
    isAutoPopupEnabled,
    setAutoPopup,
  };

  function isAutoPopupEnabled() {
    return localStorage.getItem(LS_AUTO_POPUP) === '1';
  }

  function setAutoPopup(enabled) {
    localStorage.setItem(LS_AUTO_POPUP, enabled ? '1' : '0');
  }

  /* ---- Init: inject modal + run auto-detect if already granted ---- */
  function init(opts) {
    opts = opts || {};
    injectStyles();
    injectModal();

    const saved = getSaved();
    if (saved) {
      updateAllLocationDisplays(saved);
      if (opts.onLocation) opts.onLocation(saved);
      return;
    }

    // Auto-show modal: DEFAULT IS OFF (0).
    // Only auto-show if explicitly enabled via admin setting or opts.autoPopup === true
    const autoPopupEnabled = (opts.autoPopup !== undefined)
      ? !!opts.autoPopup
      : (localStorage.getItem(LS_AUTO_POPUP) === '1');

    if (autoPopupEnabled && !localStorage.getItem(LS_DENY)) {
      setTimeout(() => showModal(opts), 1200);
    }
  }

  /* ---- Show the permission modal ---- */
  function showModal(opts) {
    opts = opts || {};
    const overlay = document.getElementById('ms88GeoOverlay');
    if (overlay) {
      overlay.classList.add('active');

      const allowBtn = document.getElementById('ms88GeoBtnAllow');
      if (allowBtn) {
        allowBtn.textContent = 'Izinkan Lokasi';
        allowBtn.disabled = false;
      }

      document.getElementById('ms88GeoBtnAllow').onclick = () => {
        requestLocation(opts, overlay);
      };
      document.getElementById('ms88GeoBtnSkip').onclick = () => {
        localStorage.setItem(LS_DENY, '1');
        overlay.classList.remove('active');
        if (opts.onDenied) opts.onDenied();
      };
      document.getElementById('ms88GeoClose').onclick = () => {
        overlay.classList.remove('active');
      };
      // Close on backdrop click
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    }
  }

  /* ---- Request browser geolocation ---- */
  function requestLocation(opts, overlay) {
    const btn = document.getElementById('ms88GeoBtnAllow');
    btn.textContent = 'Mendeteksi lokasi...';
    btn.disabled = true;

    if (!navigator.geolocation) {
      showError(overlay, 'Browser tidak mendukung geolokasi.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        reverseGeocode(lat, lng, (cityName) => {
          const data = {
            lat, lng,
            city: cityName,
            timestamp: Date.now(),
          };
          localStorage.setItem(LS_KEY, JSON.stringify(data));
          localStorage.removeItem(LS_DENY);
          if (overlay) overlay.classList.remove('active');
          updateAllLocationDisplays(data);
          showToast('Lokasi terdeteksi: ' + cityName);
          if (opts && opts.onLocation) opts.onLocation(data);
        });
      },
      (err) => {
        if (btn) {
          btn.textContent = 'Izinkan Lokasi';
          btn.disabled = false;
        }
        localStorage.setItem(LS_DENY, '1');
        if (overlay) overlay.classList.remove('active');
        showToast('Izin lokasi ditolak. Anda bisa aktifkan kapan saja.', 'warning');
        if (opts && opts.onDenied) opts.onDenied(err);
      },
      { timeout: 10000, maximumAge: 300000, enableHighAccuracy: false }
    );
  }

  /* ---- Reverse geocode using OpenStreetMap Nominatim (free, no key) ---- */
  function reverseGeocode(lat, lng, callback) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`;
    fetch(url, { signal: controller.signal, headers: { 'Accept-Language': 'id' } })
      .then(r => r.json())
      .then(data => {
        clearTimeout(timer);
        const addr = data.address || {};
        const city = addr.city || addr.town || addr.county || addr.state || 'Lokasi Anda';
        callback(city);
      })
      .catch(() => {
        clearTimeout(timer);
        // Fallback: calculate approximate city from coordinates
        callback(approxCity(lat, lng));
      });
  }

  /* ---- Approximate city name from coords (fallback) ---- */
  function approxCity(lat, lng) {
    const cities = [
      { name: 'Kota Cimahi', lat: -6.8854, lng: 107.5367 },
      { name: 'Kota Bandung', lat: -6.9175, lng: 107.6191 },
      { name: 'Kota Jakarta', lat: -6.2088, lng: 106.8456 },
      { name: 'Kota Bekasi', lat: -6.2383, lng: 106.9756 },
      { name: 'Kota Bogor', lat: -6.5971, lng: 106.8060 },
      { name: 'Kota Depok', lat: -6.4025, lng: 106.7942 },
      { name: 'Kota Surabaya', lat: -7.2575, lng: 112.7521 },
    ];
    let best = 'Lokasi Anda', minDist = Infinity;
    cities.forEach(c => {
      const d = haversine(lat, lng, c.lat, c.lng);
      if (d < minDist) { minDist = d; best = c.name; }
    });
    return best;
  }

  /* ---- Haversine distance in km ---- */
  function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /* ---- Get distance from user to venue ---- */
  function getDistance() {
    const saved = getSaved();
    if (!saved) return null;
    return haversine(saved.lat, saved.lng, VENUE_LAT, VENUE_LNG);
  }

  /* ---- Get saved location ---- */
  function getLocation() { return getSaved(); }

  function getSaved() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)); } catch { return null; }
  }

  /* ---- Clear location ---- */
  function clearLocation() {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_DENY);
    updateAllLocationDisplays(null);
  }

  /* ---- Update all location display elements in the page ---- */
  function updateAllLocationDisplays(data) {
    // Update any element with [data-geo-city]
    document.querySelectorAll('[data-geo-city]').forEach(el => {
      el.textContent = data ? data.city : 'Pilih Lokasi';
    });

    // Update location bar if present
    const locBar = document.getElementById('ms88LocationBar');
    const pinSvg = '<svg class="geo-pin-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
    if (locBar) {
      locBar.innerHTML = data
        ? `<span class="geo-pin">${pinSvg}</span><span class="geo-city">${data.city}</span><button class="geo-clear" onclick="GeoMS88.clearLocation()" title="Hapus Lokasi"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`
        : `<span class="geo-pin">${pinSvg}</span><span class="geo-placeholder">Pilih Lokasi</span><button class="geo-detect-btn" onclick="GeoMS88.showModal()">Deteksi Otomatis</button>`;
    }

    // Update distance badge if venue distance element exists
    const distEl = document.getElementById('ms88VenueDistance');
    if (distEl && data) {
      const dist = getDistance();
      if (dist !== null) {
        distEl.innerHTML = `${pinSvg} <span>${dist < 1 ? Math.round(dist * 1000) + ' m dari lokasi Anda' : dist.toFixed(1) + ' km dari lokasi Anda'}</span>`;
        distEl.style.display = 'inline-flex';
      }
    }
  }

  /* ---- Inject the modal HTML ---- */
  function injectModal() {
    if (document.getElementById('ms88GeoOverlay')) return;
    const el = document.createElement('div');
    el.id = 'ms88GeoOverlay';
    el.className = 'ms88-geo-overlay';
    el.innerHTML = `
      <div class="ms88-geo-modal" role="dialog" aria-modal="true" aria-labelledby="ms88GeoTitle">
        <button class="ms88-geo-close" id="ms88GeoClose" aria-label="Tutup"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        <div class="ms88-geo-icon-wrap">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <h2 id="ms88GeoTitle" class="ms88-geo-title">Aktifkan lokasi kamu?</h2>
        <p class="ms88-geo-desc">
          Mini Soccer 88 akan menampilkan jarak dari venue ke lokasi kamu.
          Lokasi hanya dipakai untuk informasi jarak dan bisa dimatikan kapan saja.
        </p>
        <button class="ms88-geo-btn-primary" id="ms88GeoBtnAllow">Izinkan Lokasi</button>
        <button class="ms88-geo-btn-secondary" id="ms88GeoBtnSkip">Nanti Saja</button>
        <p class="ms88-geo-hint">Browser kamu akan meminta izin setelah kamu menekan Izinkan Lokasi.</p>
      </div>
    `;
    document.body.appendChild(el);
  }

  /* ---- Show error inside modal ---- */
  function showError(overlay, msg) {
    const btn = document.getElementById('ms88GeoBtnAllow');
    if (btn) { btn.textContent = 'Izinkan Lokasi'; btn.disabled = false; }
    const desc = overlay && overlay.querySelector('.ms88-geo-desc');
    if (desc) desc.textContent = msg;
  }

  /* ---- Toast notification ---- */
  function showToast(msg, type) {
    let c = document.getElementById('ms88GeoToast');
    if (!c) {
      c = document.createElement('div');
      c.id = 'ms88GeoToast';
      c.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);z-index:99999;transition:transform 0.4s cubic-bezier(.34,1.56,.64,1);';
      document.body.appendChild(c);
    }
    c.innerHTML = `<div style="background:#08090B;color:#fff;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:500;border-left:4px solid ${type === 'warning' ? '#D9A21B' : '#D71926'};box-shadow:0 8px 24px rgba(0,0,0,0.25);white-space:nowrap;">${msg}</div>`;
    c.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => { c.style.transform = 'translateX(-50%) translateY(80px)'; }, 3500);
  }

  /* ---- Inject CSS styles ---- */
  function injectStyles() {
    if (document.getElementById('ms88GeoStyles')) return;
    const style = document.createElement('style');
    style.id = 'ms88GeoStyles';
    style.textContent = `
      .ms88-geo-overlay {
        position: fixed; inset: 0; z-index: 99998;
        background: rgba(8,9,11,0.6);
        display: flex; align-items: center; justify-content: center;
        padding: 20px;
        opacity: 0; pointer-events: none;
        transition: opacity 0.25s ease;
        backdrop-filter: blur(6px);
      }
      .ms88-geo-overlay.active { opacity: 1; pointer-events: all; }
      .ms88-geo-modal {
        background: #FFFFFF;
        border: 1.5px solid #D9DCE1;
        border-radius: 20px;
        padding: 36px 32px 28px;
        max-width: 400px;
        width: 100%;
        text-align: center;
        position: relative;
        box-shadow: 0 24px 80px rgba(8,9,11,0.2);
        transform: scale(0.9) translateY(20px);
        transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
      }
      .ms88-geo-overlay.active .ms88-geo-modal { transform: scale(1) translateY(0); }
      .ms88-geo-close {
        position: absolute; top: 16px; right: 16px;
        background: #F4F5F7; border: 1px solid #D9DCE1; border-radius: 50%;
        width: 32px; height: 32px; font-size: 14px;
        cursor: pointer; color: #5A606A;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.18s;
      }
      .ms88-geo-close:hover { background: rgba(215,25,38,0.08); color: #D71926; }
      .ms88-geo-icon-wrap {
        width: 64px; height: 64px;
        background: rgba(215, 25, 38, 0.08);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 20px;
        color: #D71926;
      }
      .ms88-geo-icon-wrap svg {
        width: 32px; height: 32px;
      }
      .ms88-geo-title {
        font-size: 20px; font-weight: 700;
        color: #08090B; margin: 0 0 12px;
        font-family: 'Rubik', sans-serif;
      }
      .ms88-geo-desc {
        font-size: 14px; color: #5A606A;
        line-height: 1.6; margin: 0 0 24px;
        font-family: 'Rubik', sans-serif;
      }
      .ms88-geo-btn-primary {
        display: block; width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #D71926, #B5141F);
        color: #fff; border: none; border-radius: 12px;
        font-family: 'Rubik', sans-serif; font-size: 15px; font-weight: 600;
        cursor: pointer; margin-bottom: 10px;
        transition: background 0.18s, transform 0.18s;
        box-shadow: 0 4px 14px rgba(215,25,38,0.35);
      }
      .ms88-geo-btn-primary:hover { background: #B5141F; transform: translateY(-1px); }
      .ms88-geo-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
      .ms88-geo-btn-secondary {
        display: block; width: 100%;
        padding: 13px;
        background: #FFFFFF; color: #08090B;
        border: 1.5px solid #D9DCE1; border-radius: 12px;
        font-family: 'Rubik', sans-serif; font-size: 15px; font-weight: 500;
        cursor: pointer; margin-bottom: 16px;
        transition: background 0.18s;
      }
      .ms88-geo-btn-secondary:hover { background: #F4F5F7; border-color: #D71926; }
      .ms88-geo-hint {
        font-size: 12px; color: #5A606A;
        margin: 0; line-height: 1.5;
        font-family: 'Rubik', sans-serif;
      }

      /* Location bar widget */
      .ms88-location-bar {
        display: inline-flex; align-items: center; gap: 8px;
        background: #F4F5F7; border: 1.5px solid #D9DCE1;
        border-radius: 100px; padding: 7px 14px;
        font-size: 13.5px; color: #08090B; font-weight: 500;
        cursor: pointer; transition: border-color 0.18s, box-shadow 0.18s;
        font-family: 'Rubik', sans-serif;
      }
      .ms88-location-bar:hover { border-color: #D71926; box-shadow: 0 0 0 3px rgba(215,25,38,0.1); }
      .geo-pin { display: inline-flex; align-items: center; color: #D71926; }
      .geo-pin-svg { flex-shrink: 0; color: #D71926; }
      .geo-city { font-weight: 600; color: #D71926; }
      .geo-placeholder { color: #5A606A; font-size: 13px; }
      .geo-clear {
        background: none; border: none; cursor: pointer;
        color: #5A606A; font-size: 13px; padding: 0 0 0 4px;
        transition: color 0.18s;
        display: inline-flex; align-items: center;
      }
      .geo-clear:hover { color: #D71926; }
      .geo-detect-btn {
        background: rgba(215, 25, 38, 0.08); color: #D71926; border: none;
        border-radius: 100px; padding: 4px 10px; font-size: 12px;
        font-weight: 600; cursor: pointer; font-family: 'Rubik', sans-serif;
        transition: background 0.18s;
      }
      .geo-detect-btn:hover { background: rgba(215, 25, 38, 0.15); }

      /* Venue distance badge */
      #ms88VenueDistance {
        display: none;
        align-items: center; gap: 6px;
        background: rgba(215, 25, 38, 0.08); color: #D71926;
        border-radius: 100px; padding: 6px 14px;
        font-size: 13px; font-weight: 600;
        font-family: 'Rubik', sans-serif;
      }
    `;
    document.head.appendChild(style);
  }

})();
