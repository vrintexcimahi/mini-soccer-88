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

    // 1. Overlay & Modal
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
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> <span>Aplikasi Resmi Mini Soccer 88</span>
        </div>

        <h2 class="ms88-pwa-title" id="ms88PwaTitle">Pasang Aplikasi Mini Soccer 88</h2>
        <p class="ms88-pwa-subtitle">Akses booking lapangan, jadwal, sparring & promo instan langsung dari homescreen HP Anda.</p>

        <div class="ms88-pwa-features">
          <div class="ms88-pwa-feature-item">
            <div class="ms88-pwa-feature-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>
            <div class="ms88-pwa-feature-text"><strong>Performa Cepat:</strong> Didukung cache offline hemat kuota</div>
          </div>
          <div class="ms88-pwa-feature-item">
            <div class="ms88-pwa-feature-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 10 16 14 16 16 12 12 8"></polygon></svg></div>
            <div class="ms88-pwa-feature-text"><strong>Booking 1-Klik:</strong> Tanpa perlu buka browser manual</div>
          </div>
          <div class="ms88-pwa-feature-item">
            <div class="ms88-pwa-feature-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div>
            <div class="ms88-pwa-feature-text"><strong>Jadwal & Sparring:</strong> Update slot kosong & info event Pusdikif</div>
          </div>
        </div>

        <!-- iOS Safari step instructions -->
        <div class="ms88-pwa-ios-instructions" id="ms88PwaIosBox">
          <strong><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> Petunjuk Pasang di iPhone / iPad:</strong>
          <ol>
            <li>Ketuk tombol <strong>Bagikan (Share)</strong> <span style="font-size:16px;">⎋</span> di browser Safari</li>
            <li>Geser ke bawah dan pilih <strong>"Tambahkan ke Layar Utama" (Add to Home Screen (+))</strong></li>
          </ol>
        </div>

        <button class="ms88-pwa-btn-install" id="ms88PwaInstallBtn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> <span>Pasang Aplikasi Sekarang</span>
        </button>

        <button class="ms88-pwa-btn-dismiss" id="ms88PwaDismissBtn">
          Nanti Saja
        </button>
      </div>
    `;
    document.body.appendChild(overlay);

    // 3. Online/Offline Toast Banner
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

    // Setup iOS UI if detected
    if (isIOS) {
      const iosBox = document.getElementById('ms88PwaIosBox');
      const installBtn = document.getElementById('ms88PwaInstallBtn');
      if (iosBox) iosBox.style.display = 'block';
      if (installBtn) {
        installBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> <span>Lihat Cara Pasang di Layar</span>`;
      }
    }
  }

  /* =====================================================
     6. User Interaction Handlers
     ===================================================== */
  function showModal() {
    if (isStandalone) return;
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

  async function handleInstallClick() {
    if (deferredPrompt) {
      // Trigger native browser install prompt
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log('[MS88 PWA] User install choice:', choiceResult.outcome);

      if (choiceResult.outcome === 'accepted') {
        hideModal();
        hideFloatingButton();
        showToast('Terima kasih! Aplikasi Mini Soccer 88 sedang dipasang...', 'online');
      } else {
        dismissModal();
      }
      deferredPrompt = null;
    } else if (isIOS) {
      // Highlight iOS instructions
      const iosBox = document.getElementById('ms88PwaIosBox');
      if (iosBox) {
        iosBox.style.background = 'rgba(245, 158, 11, 0.25)';
        iosBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // Manual desktop / mobile fallback
      showToast('Tekan ikon Install (+ atau komputer) di bilah alamat browser Anda', 'online');
    }
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

