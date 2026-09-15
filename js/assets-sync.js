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

      // 1. Logo
      if (assets.logo) {
        document.querySelectorAll('img.ayo-logo, img.ms88-brand-logo, img[alt*="Ayo Indonesia Logo"], img[alt*="Mini Soccer 88"], img[alt="Logo"], .navbar-brand img, .nav-logo img').forEach(el => {
          el.src = assets.logo;
          el.style.setProperty('max-height', '50px', 'important');
          el.style.setProperty('max-width', '220px', 'important');
          el.style.setProperty('width', 'auto', 'important');
          el.style.setProperty('height', 'auto', 'important');
          el.style.setProperty('object-fit', 'contain', 'important');
        });
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
      if (assets.hero_desktop) {
        document.querySelectorAll('img.hero-img:not(.hero-img-mobile), img[src*="ayoindonesia-padel-1.jpg"]').forEach(el => {
          el.src = assets.hero_desktop;
        });
      }

      // 4. Hero Mobile
      if (assets.hero_mobile) {
        document.querySelectorAll('img.hero-img.hero-img-mobile, img[src*="ayoindonesia-padel-mobile-1.jpg"]').forEach(el => {
          el.src = assets.hero_mobile;
        });
      }

      // 5. Banner CTA
      if (assets.banner_cta) {
        document.querySelectorAll('img[src*="baner.png"]').forEach(el => {
          el.src = assets.banner_cta;
        });
      }

      // 6. Slider Banners
      if (assets.banner_1_desktop) {
        document.querySelectorAll('img[src*="1-desktop.png"]').forEach(el => {
          el.src = assets.banner_1_desktop;
        });
      }
      if (assets.banner_2_desktop) {
        document.querySelectorAll('img[src*="2-desktop.png"]').forEach(el => {
          el.src = assets.banner_2_desktop;
        });
      }

      // 7. Phone Mockups
      if (assets.phone_mockup1) {
        document.querySelectorAll('img[src*="hp-ayo.png"]').forEach(el => {
          el.src = assets.phone_mockup1;
        });
      }
      if (assets.phone_mockup2) {
        document.querySelectorAll('img[src*="hp-ayo2.png"]').forEach(el => {
          el.src = assets.phone_mockup2;
        });
      }

      // 8. Venue Preview
      if (assets.venue_prev) {
        document.querySelectorAll('img[src*="venue-preview"]').forEach(el => {
          el.src = assets.venue_prev;
        });
      }

      // 9. Kompetisi Cards
      if (assets.kompetisi1) {
        document.querySelectorAll('img[src*="new_kompetisi_home1"]').forEach(el => {
          el.src = assets.kompetisi1;
        });
      }
      if (assets.kompetisi2) {
        document.querySelectorAll('img[src*="new_kompetisi_home2"]').forEach(el => {
          el.src = assets.kompetisi2;
        });
      }
      if (assets.kompetisi3) {
        document.querySelectorAll('img[src*="new_kompetisi_home3"]').forEach(el => {
          el.src = assets.kompetisi3;
        });
      }
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
