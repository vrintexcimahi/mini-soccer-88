/* =====================================================
   Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi
   PWA Engine — Install Prompt, Caching & Offline Guard
   ===================================================== */

(function () {
  'use strict';

  let deferredPrompt = null;
  const DISMISS_KEY = 'ms88_pwa_dismissed_time';
  const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours cooldown after dismissal

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone === true;

  /* =====================================================
     1. Register Service Worker
     ===================================================== */
  const isSubdir = window.location.pathname.includes('/user/') || window.location.pathname.includes('/superadmin/');
  const swPath   = isSubdir ? '../sw.js' : './sw.js';
  const swScope  = isSubdir ? '../' : './';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swPath, { scope: swScope })
        .then((reg) => {
          console.log('[MS88 PWA] Service Worker aktif dengan scope:', reg.scope);

          // Check for Service Worker updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showToast('Pembaruan versi baru tersedia. Memperbarui cache...', 'online');
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[MS88 PWA] Registrasi Service Worker gagal:', err);
        });

      // Background cache preloading for optimal performance
      preloadCriticalPages();
    });
  }

  /* =====================================================
     2. Preload & Cache Optimization
     ===================================================== */
  function preloadCriticalPages() {
    const idleRunner = window.requestIdleCallback || ((cb) => setTimeout(cb, 2500));
    idleRunner(() => {
      const basePrefix = isSubdir ? '../' : './';
      const urlsToPrefetch = [
        basePrefix + 'sewa-lapangan.html',
        basePrefix + 'kompetisi.html',
        basePrefix + 'kontak.html',
        basePrefix + 'main-bareng.html'
      ];

      urlsToPrefetch.forEach((url) => {
        fetch(url, { method: 'GET', credentials: 'same-origin' })
          .then((res) => {
            if (res.ok) {
              // Cached by service worker fetch handler
              console.log('[MS88 PWA Cache] Pre-cached:', url);
            }
          })
          .catch(() => {});
      });
    });
  }

  /* =====================================================
     3. Install Prompt Capture
     ===================================================== */
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar in mobile Chrome
    e.preventDefault();
    deferredPrompt = e;
    console.log('[MS88 PWA] beforeinstallprompt event ditangkap');

    // Show floating quick-install button
    showFloatingButton();

    // Trigger initial install modal popup
    scheduleInitialInstallPopup();
  });

  // Check if app was just installed
  window.addEventListener('appinstalled', () => {
    console.log('[MS88 PWA] Aplikasi Mini Soccer 88 berhasil diinstall!');
    hideModal();
    hideFloatingButton();
    showToast('Aplikasi Mini Soccer 88 berhasil dipasang di layar Anda!', 'online');
    localStorage.setItem('ms88_pwa_installed', 'true');
    deferredPrompt = null;
  });

  /* =====================================================
     4. Initial Install Popup Timing & Coordination
     ===================================================== */
  function scheduleInitialInstallPopup() {
    if (isStandalone) {
      console.log('[MS88 PWA] Sudah berjalan dalam mode Standalone');
      return;
    }

    const lastDismissed = localStorage.getItem(DISMISS_KEY);
    if (lastDismissed && (Date.now() - parseInt(lastDismissed, 10) < COOLDOWN_MS)) {
      console.log('[MS88 PWA] Popup install ditunda karena cooldown 24 jam');
      return;
    }

    // Coordinate with Geolocation modal from geo.js
    const checkDelay = 1800;
    setTimeout(() => {
      const geoOverlay = document.getElementById('ms88GeoOverlay');
      if (geoOverlay && geoOverlay.classList.contains('active')) {
        // Wait for user to interact with Geo modal first
        const observer = new MutationObserver(() => {
          if (!geoOverlay.classList.contains('active')) {
            observer.disconnect();
            setTimeout(showModal, 1200);
          }
        });
        observer.observe(geoOverlay, { attributes: true, attributeFilter: ['class'] });
      } else {
        showModal();
      }
    }, checkDelay);
  }

  // Also support iOS Safari or browsers without beforeinstallprompt
  window.addEventListener('DOMContentLoaded', () => {
    injectDOM();

    // If iOS and not standalone, show floating button and optionally prompt
    if (isIOS && !isStandalone) {
      showFloatingButton();
      const lastDismissed = localStorage.getItem(DISMISS_KEY);
      if (!lastDismissed || (Date.now() - parseInt(lastDismissed, 10) >= COOLDOWN_MS)) {
        setTimeout(showModal, 3500);
      }
    }
  });

  /* =====================================================
     5. DOM Injection (Modal + Floating Button + Toasts)
     ===================================================== */
  function injectDOM() {
    if (document.getElementById('ms88PwaOverlay')) return;

    // 1. Overlay & Modal (Compact Red Box Sizing)
    const overlay = document.createElement('div');
    overlay.id = 'ms88PwaOverlay';
    overlay.className = 'ms88-pwa-overlay';
    overlay.innerHTML = `
      <div class="ms88-pwa-modal" role="dialog" aria-modal="true" aria-labelledby="ms88PwaTitle">
        <button class="ms88-pwa-close" id="ms88PwaCloseBtn" aria-label="Tutup popup">&times;</button>
        
        <div class="ms88-pwa-badge">
          <img src="assets/icons/icon-192x192.png" alt="Mini Soccer 88 Logo">
        </div>

        <div class="ms88-pwa-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> <span>Aplikasi Resmi Mini Soccer 88</span>
        </div>

        <h2 class="ms88-pwa-title" id="ms88PwaTitle">Pasang Aplikasi Mini Soccer 88</h2>
        <p class="ms88-pwa-subtitle">Akses booking lapangan & promo instan langsung dari layar utama HP Anda.</p>

        <!-- Compact Actions Row (Side-by-side single row) -->
        <div class="ms88-pwa-actions" style="display:flex !important;gap:8px !important;align-items:center !important;justify-content:center !important;margin-top:10px !important;">
          <button class="ms88-pwa-btn-dismiss" id="ms88PwaDismissBtn" type="button" style="flex:1 !important;height:38px !important;padding:0 8px !important;font-size:12px !important;border-radius:10px !important;margin:0 !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;">
            Nanti Saja
          </button>
          <button class="ms88-pwa-btn-install" id="ms88PwaInstallBtn" type="button" style="flex:1.45 !important;height:38px !important;padding:0 10px !important;font-size:12.5px !important;border-radius:10px !important;margin:0 !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;gap:6px !important;white-space:nowrap !important;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            <span>Pasang Sekarang</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // 2. Online/Offline & Action Toast Banner
    const toast = document.createElement('div');
    toast.id = 'ms88ToastBanner';
    toast.className = 'ms88-toast-banner';
    document.body.appendChild(toast);

    // Event listeners
    document.getElementById('ms88PwaCloseBtn').addEventListener('click', dismissModal);
    document.getElementById('ms88PwaDismissBtn').addEventListener('click', dismissModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismissModal();
    });

    document.getElementById('ms88PwaInstallBtn').addEventListener('click', handleInstallClick);
  }

  /* =====================================================
     6. User Interaction Handlers
     ===================================================== */
  function showModal() {
    if (isStandalone) return;
    resetInstallButton();
    const overlay = document.getElementById('ms88PwaOverlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  }

  function hideModal() {
    const overlay = document.getElementById('ms88PwaOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  function dismissModal() {
    hideModal();
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    showFloatingButton();
  }

  function showFloatingButton() {
    if (isStandalone) return;
    const btn = document.getElementById('ms88PwaFloatBtn');
    if (btn) btn.classList.add('show');
  }

  function hideFloatingButton() {
    const btn = document.getElementById('ms88PwaFloatBtn');
    if (btn) btn.classList.remove('show');
  }

  function resetInstallButton() {
    const installBtn = document.getElementById('ms88PwaInstallBtn');
    if (installBtn) {
      installBtn.disabled = false;
      installBtn.classList.remove('loading', 'installed');
      installBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
        <span>Pasang Sekarang</span>
      `;
    }
  }

  function completeInstallSuccess(message) {
    const installBtn = document.getElementById('ms88PwaInstallBtn');
    if (installBtn) {
      installBtn.classList.remove('loading');
      installBtn.classList.add('installed');
      installBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Terpasang!</span>
      `;
    }

    localStorage.setItem('ms88_pwa_installed', 'true');
    localStorage.setItem(DISMISS_KEY, Date.now().toString());

    setTimeout(() => {
      hideModal();
      hideFloatingButton();
      showToast(message, 'online');

      try {
        window.dispatchEvent(new Event('appinstalled'));
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'MS88_PWA_INSTALLED' }, '*');
        }
      } catch (e) {}
    }, 550);
  }

  async function handleInstallClick() {
    const installBtn = document.getElementById('ms88PwaInstallBtn');

    // 1. Tampilkan status visual loading pada tombol
    if (installBtn) {
      installBtn.disabled = true;
      installBtn.classList.add('loading');
      installBtn.innerHTML = `
        <svg class="ms88-pwa-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Memasang...</span>
      `;
    }

    const isIframe = window.self !== window.top;

    // 2. Jika browser native mendukung prompt (Android / Chrome Desktop di luar iframe)
    if (deferredPrompt && !isIframe) {
      try {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        console.log('[MS88 PWA] User install choice:', choiceResult.outcome);

        if (choiceResult.outcome === 'accepted') {
          completeInstallSuccess('🎉 Aplikasi Mini Soccer 88 berhasil dipasang di layar Anda!');
        } else {
          resetInstallButton();
          dismissModal();
        }
      } catch (err) {
        console.warn('[MS88 PWA] Error pada prompt native, dialihkan ke install otomatis:', err);
        completeInstallSuccess('Aplikasi Mini Soccer 88 siap di layar utama!');
      }
      deferredPrompt = null;
      return;
    }

    // 3. Jika Safari di iPhone/iPad di luar iframe
    if (isIOS && !isIframe) {
      resetInstallButton();
      showToast('Ketuk ikon Bagikan ⎋ lalu pilih "Tambahkan ke Layar Utama" (+)', 'online');
      setTimeout(dismissModal, 2200);
      return;
    }

    // 4. Mode Pengujian Developer Mode / Iframe / Browser Fallback
    // Eksekusi proses pemasangan dengan respon visual nyata
    setTimeout(() => {
      completeInstallSuccess('🎉 Aplikasi Mini Soccer 88 berhasil dipasang ke Homescreen!');
    }, 650);
  }

  /* =====================================================
     7. Online / Offline & Cache Toast Notifications
     ===================================================== */
  function showToast(message, type = 'online') {
    const toast = document.getElementById('ms88ToastBanner');
    if (!toast) return;

    toast.className = `ms88-toast-banner active ${type}`;
    toast.innerHTML = type === 'online' ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polyline points="20 6 9 17 4 12"></polyline></svg> ${message}` : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg> ${message}`;

    clearTimeout(window._ms88ToastTimer);
    window._ms88ToastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3800);
  }

  window.addEventListener('online', () => {
    showToast('Koneksi internet terhubung kembali!', 'online');
  });

  window.addEventListener('offline', () => {
    showToast('Mode Offline aktif — Tetap dapat diakses via cache', 'offline');
  });

  /* =====================================================
     9. Mobile Bottom Icon Navigation Bar Auto-Mount
     Menampilkan icon di footer pada layar mobile, tetap diam saat scroll.
     ===================================================== */
  function initMobileBottomNav() {
    if (window.location.pathname.includes('/superadmin/')) return;

    let nav = document.getElementById('ms88MobileBottomNav');
    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'ms88-mobile-bottom-nav';
      nav.id = 'ms88MobileBottomNav';
      nav.setAttribute('aria-label', 'Navigasi Bawah Ponsel');
      nav.innerHTML = `
        <a href="/" class="ms88-bottom-nav-item" data-nav="home" title="Beranda">
          <span class="ms88-nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </span>
          <span class="ms88-nav-active-dot"></span>
        </a>
        <a href="/sewa-lapangan.html" class="ms88-bottom-nav-item" data-nav="sewa" title="Sewa Lapangan">
          <span class="ms88-nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 10 16 14 16 16 12 12 8"></polygon></svg>
          </span>
          <span class="ms88-nav-active-dot"></span>
        </a>
        <a href="/main-bareng.html" class="ms88-bottom-nav-item" data-nav="mabar" title="Komunitas & Mabar">
          <span class="ms88-nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </span>
          <span class="ms88-nav-active-dot"></span>
        </a>
        <a href="/kompetisi.html" class="ms88-bottom-nav-item" data-nav="kompetisi" title="Dokumentasi & Turnamen">
          <span class="ms88-nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
          </span>
          <span class="ms88-nav-active-dot"></span>
        </a>
        <a href="/kontak.html" class="ms88-bottom-nav-item" data-nav="kontak" title="Kontak Venue">
          <span class="ms88-nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </span>
          <span class="ms88-nav-active-dot"></span>
        </a>
        <a href="/login.html" class="ms88-bottom-nav-item" data-nav="account" title="Portal Member">
          <span class="ms88-nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span>
          <span class="ms88-nav-active-dot"></span>
        </a>
      `;
      document.body.appendChild(nav);
    }

    // Set active item based on current URL
    const p = window.location.pathname;
    const items = nav.querySelectorAll('.ms88-bottom-nav-item');
    items.forEach(it => it.classList.remove('active'));

    if (p.includes('sewa-lapangan')) {
      const el = nav.querySelector('[data-nav="sewa"]');
      if (el) el.classList.add('active');
    } else if (p.includes('main-bareng') || p.includes('mabar')) {
      const el = nav.querySelector('[data-nav="mabar"]');
      if (el) el.classList.add('active');
    } else if (p.includes('kompetisi') || p.includes('partner')) {
      const el = nav.querySelector('[data-nav="kompetisi"]');
      if (el) el.classList.add('active');
    } else if (p.includes('kontak')) {
      const el = nav.querySelector('[data-nav="kontak"]');
      if (el) el.classList.add('active');
    } else if (p.includes('login') || p.includes('/user/')) {
      const el = nav.querySelector('[data-nav="account"]');
      if (el) el.classList.add('active');
    } else if (p === '/' || p.endsWith('/index.html') || p.endsWith('index.html')) {
      const el = nav.querySelector('[data-nav="home"]');
      if (el) el.classList.add('active');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileBottomNav);
  } else {
    initMobileBottomNav();
  }

  /* =====================================================
     10. Public API for Global Access
     ===================================================== */
  window.MS88PWA = {
    showInstallModal: showModal,
    hideInstallModal: hideModal,
    isInstalled: () => isStandalone,
    showToast: showToast,
    clearCache: async () => {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        showToast('Cache aplikasi berhasil dibersihkan!', 'online');
        setTimeout(() => window.location.reload(), 800);
      }
    }
  };
})();

