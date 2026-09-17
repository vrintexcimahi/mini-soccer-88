/* =========================================================
   Assets Sync Engine — Mini Soccer 88
   Automatically applies custom uploaded images from Superadmin
   ========================================================= */

(function () {
  'use strict';

  function applyCustomAssets() {
  // Inject global strict size constraints for logo so it NEVER overflows navbar
  if (!document.getElementById('ms88-logo-constraint-style')) {
    const s = document.createElement('style');
    s.id = 'ms88-logo-constraint-style';
    s.textContent = `
      img.ayo-logo, img.ms88-brand-logo, .nav-logo img, .navbar-brand img, header.navbar .navbar-top-row a img, header.navbar a.p-0 img {
        max-height: 50px !important;
        max-width: 220px !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        display: inline-block !important;
      }
    `;
    document.head.appendChild(s);
  }

    try {
      const raw = localStorage.getItem('ms88_assets');
      if (!raw) return;
      const assets = JSON.parse(raw);
      if (!assets || typeof assets !== 'object') return;

      function syncElements(selector, assetKey, val, applyStyles) {
        if (!val) return;
        document.querySelectorAll(selector).forEach(el => {
          el.setAttribute('data-ms88-asset', assetKey);
          el.src = val;
          if (applyStyles) applyStyles(el);
        });
      }

      // 1. Logo
      let activeLogo = assets.logo;
      if (activeLogo && (activeLogo.includes('.svg') || activeLogo.includes('new-new-logo'))) {
        activeLogo = 'assets/logo/ms88-logo-transparent.png';
      }
      if (activeLogo) {
        syncElements(
          '[data-ms88-asset="logo"], img.ayo-logo, img.ms88-brand-logo, img[alt*="Ayo Indonesia Logo"], img[alt*="Mini Soccer 88"], img[alt="Logo"], .navbar-brand img, .nav-logo img',
          'logo',
          activeLogo,
          el => {
            el.style.setProperty('max-height', '50px', 'important');
            el.style.setProperty('max-width', '220px', 'important');
            el.style.setProperty('width', 'auto', 'important');
            el.style.setProperty('height', 'auto', 'important');
            el.style.setProperty('object-fit', 'contain', 'important');
          }
        );
      }

      // 2. Favicon
      if (assets.favicon) {
        let fav = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        if (fav) {
          fav.href = assets.favicon;
        } else {
          fav = document.createElement('link');
          fav.rel = 'icon';
          fav.href = assets.favicon;
          document.head.appendChild(fav);
        }
      }

      // 3. Hero Desktop
      syncElements(
        '[data-ms88-asset="hero_desktop"], img.hero-img:not(.hero-img-mobile), img[src*="ayoindonesia-padel-1.jpg"], img[src*="field-night-floodlight"]',
        'hero_desktop',
        assets.hero_desktop
      );

      // 4. Hero Mobile
      syncElements(
        '[data-ms88-asset="hero_mobile"], img.hero-img.hero-img-mobile, img[src*="ayoindonesia-padel-mobile-1.jpg"], img[src*="field-day-center"]',
        'hero_mobile',
        assets.hero_mobile
      );

      // 5. Banner CTA
      syncElements(
        '[data-ms88-asset="banner_cta"], img[src*="baner.png"], img[src*="qris-banner-mascot"]',
        'banner_cta',
        assets.banner_cta
      );

      // 6. Slider Banners
      syncElements(
        '[data-ms88-asset="banner_1_desktop"], img[src*="1-desktop.png"], img[src*="poster-ekskul-sekolah"]',
        'banner_1_desktop',
        assets.banner_1_desktop
      );
      syncElements(
        '[data-ms88-asset="banner_2_desktop"], img[src*="2-desktop.png"], img[src*="poster-fotografer"]',
        'banner_2_desktop',
        assets.banner_2_desktop
      );

      // 7. Phone Mockups
      syncElements('[data-ms88-asset="phone_mockup1"], img[src*="hp-ayo.png"]', 'phone_mockup1', assets.phone_mockup1);
      syncElements('[data-ms88-asset="phone_mockup2"], img[src*="hp-ayo2.png"]', 'phone_mockup2', assets.phone_mockup2);

      // 8. Venue Preview
      syncElements(
        '[data-ms88-asset="venue_prev"], img[src*="venue-preview"], img[src*="field-night-ball-fifa"]',
        'venue_prev',
        assets.venue_prev
      );

      // 9. Kompetisi / Poster Cards
      syncElements(
        '[data-ms88-asset="kompetisi1"], img[src*="new_kompetisi_home1"], img[src*="poster-kommoto"]',
        'kompetisi1',
        assets.kompetisi1
      );
      syncElements(
        '[data-ms88-asset="kompetisi2"], img[src*="new_kompetisi_home2"], img[src*="poster-content-creator"]',
        'kompetisi2',
        assets.kompetisi2
      );
      syncElements(
        '[data-ms88-asset="kompetisi3"], img[src*="new_kompetisi_home3"], img[src*="poster-pricelist"]',
        'kompetisi3',
        assets.kompetisi3
      );

      // 10. Mascot
      syncElements(
        '[data-ms88-asset="mascot"], img.ms88-mascot-img, img[src*="ms88-mascot"]',
        'mascot',
        assets.mascot
      );

      // 11. QRIS
      syncElements(
        '[data-ms88-asset="qris"], img.ms88-qris-img, img[src*="qris-alpha-sport"]',
        'qris',
        assets.qris
      );
    } catch (e) {
      console.warn('Assets sync warning:', e);
    }
  }

  // Apply immediately if DOM is ready, or on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCustomAssets);
  } else {
    applyCustomAssets();
  }

  // Also listen for storage event so changes in superadmin tab sync live to other open tabs!
  window.addEventListener('storage', function(e) {
    if (e.key === 'ms88_assets') {
      applyCustomAssets();
    }
  });

  window.AssetsSyncMS88 = { apply: applyCustomAssets };
})();
