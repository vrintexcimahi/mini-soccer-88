// =========================================================
//  Mini Soccer 88 Alpha Sport — Superadmin Portal JS
// =========================================================

// --- State ---
let currentTab = 'overview';

// --- SVG Icon Library (monochrome, matches sidebar style) ---
const ICON = {
  calendar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
  users:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
  money:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
  trash:    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>',
  check:    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  edit:     '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
  pin:      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
  clock:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  image:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
  upload:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
  rotate:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',
  settings: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
};

// Default asset definitions with lay-user friendly labels, guidance & TARGET DIMENSIONS
// targetW / targetH = exact output resolution after auto-compress. null = aspect-ratio clamp only.
const DEFAULT_ASSETS = [
  { key: 'hero_desktop',     label: 'Hero Banner (Desktop)',     def: '/assets/img/venue/field-night-floodlight.jpg', hint: 'Foto latar utama desktop • Disarankan 1920×1080 px',  targetW: 1920, targetH: 1080, fit: 'cover'   },
  { key: 'hero_mobile',      label: 'Hero Banner (HP / Mobile)', def: '/assets/img/venue/field-day-center.jpg',      hint: 'Foto latar utama ponsel • Disarankan 1080×1920 px',   targetW: 1080, targetH: 1920, fit: 'cover'   },
  { key: 'logo',             label: 'Logo Utama Website (3D)',   def: '/assets/logo/ms88-logo-transparent.png',      hint: 'Format PNG 3D transparan resmi 88 Alpha Sport', targetW: 240,  targetH: 90,   fit: 'contain' },
  { key: 'favicon',          label: 'Favicon Tab Browser',       def: '/assets/logo/favicon.png',                     hint: 'Ikon kecil tab browser (PNG 64×64 px)',               targetW: 64,   targetH: 64,   fit: 'contain' },
  { key: 'mascot',           label: 'Maskot Alpha Commando',     def: '/assets/logo/ms88-mascot-transparent.png',     hint: 'Maskot resmi anime loreng komando 88 Alpha Sport',    targetW: 400,  targetH: 600,  fit: 'contain' },
  { key: 'qris',             label: 'Barcode QRIS Pembayaran',   def: '/assets/payment/qris-alpha-sport.jpg',         hint: 'QRIS resmi 88 Alpha Mini Soccer NMID ID1026529171542',targetW: 600, targetH: 800,  fit: 'contain' },
  { key: 'venue_prev',       label: 'Foto Preview Lapangan',     def: '/assets/img/venue/field-night-ball-fifa.jpg',  hint: 'Foto fasilitas lapangan mini soccer • 960×640 px',    targetW: 960,  targetH: 640,  fit: 'cover'   },
  { key: 'banner_cta',       label: 'Banner Promo CTA',          def: '/assets/payment/qris-banner-mascot.jpg',       hint: 'Banner ajakan bermain • Disarankan 1200×400 px',       targetW: 1200, targetH: 400,  fit: 'cover'   },
  { key: 'banner_1_desktop', label: 'Slider Banner 1',           def: '/assets/promo/poster-ekskul-sekolah.jpg',      hint: 'Poster program sekolah & ekskul • 1440×560 px',       targetW: 1440, targetH: 560,  fit: 'cover'   },
  { key: 'banner_2_desktop', label: 'Slider Banner 2',           def: '/assets/promo/poster-fotografer.jpg',          hint: 'Poster dokumentasi fotografer GERAK • 1440×560 px',   targetW: 1440, targetH: 560,  fit: 'cover'   },
  { key: 'kompetisi1',       label: 'Poster Kommoto 7-8',        def: '/assets/promo/poster-kommoto.jpg',             hint: 'Program komunitas pagi jam 7-8',                      targetW: 640,  targetH: 480,  fit: 'cover'   },
  { key: 'kompetisi2',       label: 'Poster Creator Collab',     def: '/assets/promo/poster-content-creator.jpg',     hint: 'Kerjasama content creator @88alphasport',             targetW: 640,  targetH: 480,  fit: 'cover'   },
  { key: 'kompetisi3',       label: 'Poster Pricelist Resmi',    def: '/assets/promo/poster-pricelist.jpg',           hint: 'Tabel harga sewa per jam September 2026',             targetW: 640,  targetH: 480,  fit: 'cover'   },
];

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  // Set user display
  const user = sessionStorage.getItem('ms88_admin_user') || 'Admin';
  const nameEl = document.getElementById('userNameDisplay');
  const avatarEl = document.getElementById('userAvatar');
  if (nameEl) nameEl.textContent = user;
  if (avatarEl) avatarEl.textContent = user.charAt(0).toUpperCase();

  // Set today's date for slot picker
  const slotDate = document.getElementById('slotDate');
  if (slotDate) {
    slotDate.value = getTodayStr();
  }

  // Load all panels
  initDefaultOrdersIfEmpty();
  renderOverview();
  renderSlots();
  renderOrders();
  renderMabar();
  renderBlogs();
  renderAssets();
  renderContact();
  renderPricing();
  loadSettings();
});

// --- Tab Switching ---
function switchTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link-btn').forEach(b => b.classList.remove('active'));

  const panel = document.getElementById('tab' + cap(tab));
  const btn   = document.getElementById('tabBtn' + cap(tab));
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');

  const titles = {
    overview:'Dashboard', slots:'Kelola Slot', orders:'Manajemen Booking',
    mabar:'Sesi Mabar', blog:'Blog & Artikel', assets:'Pengaturan Aset',
    pricing:'Tarif Lapangan', contact:'Kontak & Sosmed', settings:'Pengaturan Sistem'
  };
  const titleEl = document.getElementById('topbarTitle');
  if (titleEl) titleEl.textContent = titles[tab] || 'Dashboard';
  currentTab = tab;
}

function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

// --- Sidebar toggle ---
function toggleSidebar() {
  document.getElementById('adminSidebar').classList.toggle('collapsed');
  document.getElementById('adminMain').classList.toggle('expanded');
}

// --- Logout ---
function doLogout() {
  if (!confirm('Keluar dari dashboard admin?')) return;
  sessionStorage.removeItem('ms88_admin_logged_in');
  sessionStorage.removeItem('ms88_admin_user');
  location.replace('/superadmin/login.html');
}

// --- Toast ---
function toast(msg, type = 'success') {
  const c = document.getElementById('toastContainer');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.classList.add('show'), 50);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
}

// --- Helpers ---
function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}
function fmtRp(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}
function getLS(key, def) {
  try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; }
}
function setLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// =========================================================
//  OVERVIEW
// =========================================================
function renderOverview() {
  const orders = getLS('ms88_orders', []);
  const today  = getTodayStr();
  const todayOrders = orders.filter(o => o.date === today);
  const kpiOmset = orders.filter(o => o.status === 'confirmed' || o.status === 'paid').reduce((s, o) => s + (o.total || 0), 0);
  const pending = orders.filter(o => o.status === 'pending').length;
  const done   = orders.filter(o => o.status === 'confirmed' || o.status === 'paid').length;

  const settings = getLS('ms88_settings', { numCourts: 1, openTime: '06:00', closeTime: '23:00', slotDuration: 60 });
  const slots  = getLS('ms88_blocked_slots', []);
  const totalSlots = settings.numCourts * 8;
  const bookedSlots = slots.filter(s => s.date === today).length;
  const occupancy = totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;

  document.getElementById('kpiOmset').textContent = fmtRp(kpiOmset);
  document.getElementById('kpiOccupancy').textContent = occupancy + '%';
  document.getElementById('kpiPending').textContent = pending;
  document.getElementById('kpiDone').textContent = done;

  // Recent activity
  const actEl = document.getElementById('recentActivity');
  if (actEl) {
    const recent = [...orders].reverse().slice(0, 5);
    if (recent.length === 0) {
      actEl.innerHTML = '<p class="empty-state">Belum ada aktivitas.</p>';
    } else {
      actEl.innerHTML = recent.map(o => `
        <div class="activity-item">
          <div class="activity-dot ${(o.status === 'confirmed' || o.status === 'paid') ? 'dot-green' : o.status === 'cancelled' ? 'dot-red' : 'dot-orange'}"></div>
          <div class="activity-text">
            <strong>${o.name}</strong> — ${o.court ? o.court + ' · ' : (o.field ? o.field + ' · ' : '')}${o.time}<br>
            <small>${o.date} · ${fmtRp(o.total)} · <span class="badge-status ${o.status}">${o.status}</span></small>
          </div>
        </div>
      `).join('');
    }
  }

  // Mini slot grid for today
  const miniGrid = document.getElementById('slotMiniGrid');
  if (miniGrid) {
    const hours = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'];
    miniGrid.innerHTML = hours.map(h => {
      const isBlocked = slots.some(s => s.date === today && s.hour === h);
      return `<div class="slot-mini ${isBlocked ? 'slot-mini-blocked' : 'slot-mini-free'}" title="${h}:00">${h}</div>`;
    }).join('');
  }
}

// =========================================================
//  SLOTS
// =========================================================
function renderSlots() {
  const dateEl = document.getElementById('slotDate');
  if (!dateEl) return;
  const date = dateEl.value || getTodayStr();

  const dateLabel = document.getElementById('slotDateLabel');
  if (dateLabel) {
    const d = new Date(date + 'T00:00:00');
    dateLabel.textContent = d.toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  }

  const settings  = getLS('ms88_settings', { numCourts: 1, openTime: '06:00', closeTime: '23:00', slotDuration: 60 });
  const blocked   = getLS('ms88_blocked_slots', []);
  const orders    = getLS('ms88_orders', []);
  const numCourts = settings.numCourts || 1;
  const hours     = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'];

  const grid = document.getElementById('slotGrid');
  if (!grid) return;

  let html = '<div class="slot-header-row"><div class="slot-corner">Jam</div>';
  for (let c = 1; c <= numCourts; c++) html += `<div class="slot-col-head">Lapangan ${c}</div>`;
  html += '</div>';

  hours.forEach(h => {
    html += `<div class="slot-row"><div class="slot-time">${h}:00</div>`;
    for (let c = 1; c <= numCourts; c++) {
      const isBlocked = blocked.some(s => s.date === date && s.hour === h && s.court == c);
      const isBooked  = orders.some(o => o.date === date && o.time && o.time.startsWith(h) && (o.court === `Lapangan ${c}` || (o.field && o.field.includes(`Lapangan ${c}`))) && (o.status === 'confirmed' || o.status === 'paid'));
      let cls = 'slot-cell-free', label = 'Tersedia';
      if (isBooked)  { cls = 'slot-cell-booked';  label = 'Dipesan'; }
      if (isBlocked) { cls = 'slot-cell-locked';  label = 'Dikunci'; }
      html += `<div class="slot-cell ${cls}" onclick="toggleSlot('${date}','${h}',${c})" title="${h}:00 - Lapangan ${c}">${label}</div>`;
    }
    html += '</div>';
  });

  grid.innerHTML = html;
}

function toggleSlot(date, hour, court) {
  const blocked = getLS('ms88_blocked_slots', []);
  const idx = blocked.findIndex(s => s.date === date && s.hour === hour && s.court == court);
  if (idx >= 0) blocked.splice(idx, 1);
  else blocked.push({ date, hour, court });
  setLS('ms88_blocked_slots', blocked);
  renderSlots();
  toast(idx >= 0 ? 'Slot dibuka' : 'Slot dikunci');
}

function lockAllSlots() {
  if (!confirm('Kunci semua slot hari ini?')) return;
  const date = document.getElementById('slotDate').value || getTodayStr();
  const settings = getLS('ms88_settings', { numCourts: 1 });
  const blocked = getLS('ms88_blocked_slots', []);
  const hours = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'];
  hours.forEach(h => {
    for (let c = 1; c <= settings.numCourts; c++) {
      if (!blocked.some(s => s.date === date && s.hour === h && s.court == c)) {
        blocked.push({ date, hour: h, court: c });
      }
    }
  });
  setLS('ms88_blocked_slots', blocked);
  renderSlots();
  toast('Semua slot dikunci');
}

function unlockAllSlots() {
  if (!confirm('Buka semua slot hari ini?')) return;
  const date = document.getElementById('slotDate').value || getTodayStr();
  const blocked = getLS('ms88_blocked_slots', []).filter(s => s.date !== date);
  setLS('ms88_blocked_slots', blocked);
  renderSlots();
  toast('Semua slot dibuka');
}

// =========================================================
//  ORDERS
// =========================================================
function renderOrders() {
  const orders  = getLS('ms88_orders', []);
  const filter  = document.getElementById('filterStatus')?.value || '';
  const filtered = filter ? orders.filter(o => o.status === filter) : orders;
  const tbody   = document.getElementById('ordersBody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">Belum ada data booking.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map((o, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${o.name}</strong><br><small>${o.phone || '-'}</small></td>
      <td>${o.court || o.field || '-'}</td>
      <td>${o.date || '-'}</td>
      <td>${o.time || '-'}</td>
      <td>${fmtRp(o.total || 0)}</td>
      <td><span class="badge-status ${o.status}">${o.status}</span></td>
      <td class="action-cell">
        ${o.status === 'pending' ? `<button class="btn-icon btn-green" onclick="confirmOrder('${o.id}')" title="Konfirmasi">${ICON.check}</button>` : ''}
        <button class="btn-icon btn-red" onclick="deleteOrder('${o.id}')" title="Hapus">${ICON.trash}</button>
      </td>
    </tr>
  `).join('');
}

function confirmOrder(id) {
  const orders = getLS('ms88_orders', []);
  const idx = orders.findIndex(o => String(o.id) === String(id));
  if (idx >= 0) { orders[idx].status = 'confirmed'; setLS('ms88_orders', orders); }
  renderOrders(); initDefaultOrdersIfEmpty();
  renderOverview();
  toast('Booking dikonfirmasi ✓');
}

function deleteOrder(id) {
  if (!confirm('Hapus booking ini?')) return;
  const orders = getLS('ms88_orders', []).filter(o => String(o.id) !== String(id));
  setLS('ms88_orders', orders);
  renderOrders(); initDefaultOrdersIfEmpty();
  renderOverview();
  toast('Booking dihapus', 'warning');
}

function addDummyOrder() {
  const orders = getLS('ms88_orders', []);
  const names  = ['Sparta FC', 'Sang Mantan FC', 'Kirari Space Yoga', 'Kommoto 7-8', 'Cimahi United', 'Alpha Warrior FC', 'Pusdikif FC'];
  const courts = ['Lapangan Utama (30×50m Pusdikif)'];
  const times  = ['06.00-07.00', '07.00-08.00', '15.00-16.00', '16.00-17.00', '18.00-19.00', '19.00-20.00', '20.00-21.00'];
  const prices = [250000, 250000, 300000, 300000, 350000, 350000, 350000];
  const randIdx = Math.floor(Math.random() * times.length);
  const newOrder = {
    id:    'BKG-' + Date.now().toString().slice(-6),
    name:  names[Math.floor(Math.random() * names.length)],
    phone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
    court: courts[0],
    date:  getTodayStr(),
    time:  times[randIdx],
    total: prices[randIdx],
    status:'pending'
  };
  orders.push(newOrder);
  setLS('ms88_orders', orders);
  renderOrders(); initDefaultOrdersIfEmpty();
  renderOverview();
  toast('Booking baru ditambahkan');
}

function initDefaultOrdersIfEmpty() {
  const existing = getLS('ms88_orders', null);
  if (existing && Array.isArray(existing) && existing.length > 0) return;
  const jsonPath = window.location.pathname.includes('/superadmin') ? '../assets/data/bookings_september_2026.json' : 'assets/data/bookings_september_2026.json';
  fetch(jsonPath)
    .catch(() => fetch('/assets/data/bookings_september_2026.json'))
    .then(r => r.json())
    .then(data => {
      const orders = [];
      let counter = 1;
      const pricingMap = {
        '06': 250000, '07': 250000,
        '08': 275000, '09': 275000,
        '10': 225000, '11': 225000, '12': 225000, '13': 225000, '14': 225000,
        '15': 300000, '16': 300000, '17': 300000,
        '18': 350000, '19': 350000, '20': 350000, '21': 350000
      };
      Object.keys(data).forEach(week => {
        data[week].forEach(item => {
          const hourKey = item.time.slice(0, 2);
          const price = pricingMap[hourKey] || 250000;
          orders.push({
            id: 'BKG-2609' + String(counter++).padStart(3, '0'),
            name: item.team,
            phone: '08' + (8120000000 + counter * 7919).toString().slice(0, 10),
            court: 'Lapangan Utama (30×50m Pusdikif)',
            date: '2026-09-' + String(item.date).padStart(2, '0'),
            time: item.time,
            total: price,
            status: 'confirmed'
          });
        });
      });
      if (orders.length > 0) {
        setLS('ms88_orders', orders);
        renderOrders();
        initDefaultOrdersIfEmpty();
  renderOverview();
      }
    })
    .catch(() => {});
}

// =========================================================
//  MABAR
// =========================================================
function renderMabar() {
  const sessions = getLS('ms88_mabar_sessions', []);
  const listEl = document.getElementById('mabarList');
  if (!listEl) return;
  if (sessions.length === 0) { listEl.innerHTML = '<p class="empty-state">Belum ada sesi mabar.</p>'; return; }

  listEl.innerHTML = sessions.map(s => {
    // Safe date formatting
    let dtStr = s.time || '-';
    if (s.datetime) {
      const d = new Date(s.datetime);
      if (!isNaN(d.getTime())) {
        dtStr = d.toLocaleString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' });
      }
    }
    const slots = (s.slots !== undefined ? s.slots : (s.quota !== undefined ? `${s.filled || 0}/${s.quota}` : '-'));
    const feeVal = s.fee !== undefined ? s.fee : s.price;
    const fee = !isNaN(Number(feeVal)) ? fmtRp(Number(feeVal)) : 'Gratis';
    const title = s.name || s.title || 'Sesi Mabar';
    return `
    <div class="mabar-card">
      <div class="mabar-head">
        <strong>${title}</strong>
        <button class="btn-icon btn-red" onclick="deleteMabar('${s.id}')" title="Hapus">${ICON.trash}</button>
      </div>
      <div class="mabar-meta">
        <span class="meta-row">${ICON.calendar} ${dtStr}</span><br>
        <span class="meta-row">${ICON.users} Slot: ${slots}</span>
        &nbsp;&nbsp;
        <span class="meta-row">${ICON.money} ${fee}</span>
        ${s.desc ? `<br><span class="meta-row" style="color:#6b7280;font-size:12px;">${s.desc}</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

function createMabar() {
  const name = document.getElementById('mabarName').value.trim();
  const datetime = document.getElementById('mabarDatetime').value;
  const slots = document.getElementById('mabarSlots').value;
  const fee = document.getElementById('mabarFee').value;
  const desc = document.getElementById('mabarDesc').value.trim();

  if (!name || !datetime || !slots) { toast('Isi nama, waktu, dan slot!', 'error'); return; }

  const sessions = getLS('ms88_mabar_sessions', []);
  sessions.push({ id: Date.now(), name, datetime, slots: +slots, fee: +fee || 0, desc });
  setLS('ms88_mabar_sessions', sessions);
  renderMabar();
  toast('Sesi mabar dibuat ✓');
  ['mabarName','mabarDatetime','mabarSlots','mabarFee','mabarDesc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function deleteMabar(id) {
  if (!confirm('Hapus sesi mabar ini?')) return;
  const sessions = getLS('ms88_mabar_sessions', []).filter(s => String(s.id) !== String(id));
  setLS('ms88_mabar_sessions', sessions);
  renderMabar();
  toast('Sesi dihapus', 'warning');
}

// =========================================================
//  BLOG
// =========================================================
function renderBlogs() {
  const blogs = getLS('ms88_blogs', []);
  const filter = document.getElementById('filterBlogStatus')?.value || '';
  const filtered = filter ? blogs.filter(b => b.status === filter) : blogs;
  const listEl = document.getElementById('blogList');
  if (!listEl) return;

  if (filtered.length === 0) { listEl.innerHTML = '<p class="empty-state">Belum ada artikel.</p>'; return; }

  listEl.innerHTML = [...filtered].reverse().map(b => `
    <div class="blog-item">
      <div class="blog-thumb" style="background-image:url('${b.thumb || ''}');background-size:cover;background-color:#eee;"></div>
      <div class="blog-info">
        <div class="blog-cat">${b.category}</div>
        <strong>${b.title}</strong>
        <p>${b.summary || ''}</p>
        <div class="blog-meta">
          <span class="badge-status ${b.status}">${b.status}</span>
          <small>${b.createdAt || ''}</small>
        </div>
      </div>
      <div class="blog-actions">
        <button class="btn-icon" onclick="editBlog('${b.id}')" title="Edit">${ICON.edit}</button>
        <button class="btn-icon btn-red" onclick="deleteBlog('${b.id}')" title="Hapus">${ICON.trash}</button>
      </div>
    </div>
  `).join('');
}

function saveBlog() {
  const id    = document.getElementById('blogEditId').value;
  const title = document.getElementById('blogTitle').value.trim();
  const cat   = document.getElementById('blogCategory').value;
  const thumb = document.getElementById('blogThumb').value.trim();
  const summary = document.getElementById('blogSummary').value.trim();
  const content = document.getElementById('blogContent').value.trim();
  const status  = document.getElementById('blogStatus').value;

  if (!title || !content) { toast('Judul dan konten wajib diisi!', 'error'); return; }

  let blogs = getLS('ms88_blogs', []);
  if (id) {
    const idx = blogs.findIndex(b => b.id == id);
    if (idx >= 0) blogs[idx] = { ...blogs[idx], title, category:cat, thumb, summary, content, status };
    toast('Artikel diperbarui ✓');
  } else {
    blogs.push({ id: Date.now(), title, category:cat, thumb, summary, content, status,
                 createdAt: new Date().toLocaleDateString('id-ID') });
    toast('Artikel disimpan ✓');
  }
  setLS('ms88_blogs', blogs);
  renderBlogs();
  clearBlogForm();
}

function editBlog(id) {
  const blog = getLS('ms88_blogs', []).find(b => String(b.id) === String(id));
  if (!blog) return;
  document.getElementById('blogEditId').value = id;
  document.getElementById('blogTitle').value = blog.title;
  document.getElementById('blogCategory').value = blog.category;
  document.getElementById('blogThumb').value = blog.thumb || '';
  document.getElementById('blogSummary').value = blog.summary || '';
  document.getElementById('blogContent').value = blog.content;
  document.getElementById('blogStatus').value = blog.status;
  document.getElementById('blogFormTitle').textContent = 'Edit Artikel';
  switchTab('blog');
  document.querySelector('.tab-panel.active .card-head')?.scrollIntoView({ behavior:'smooth' });
}

function deleteBlog(id) {
  if (!confirm('Hapus artikel ini?')) return;
  setLS('ms88_blogs', getLS('ms88_blogs', []).filter(b => String(b.id) !== String(id)));
  renderBlogs();
  toast('Artikel dihapus', 'warning');
}

function clearBlogForm() {
  ['blogTitle','blogThumb','blogSummary','blogContent','blogEditId'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('blogStatus').value = 'published';
  document.getElementById('blogCategory').value = 'Berita';
  document.getElementById('blogFormTitle').textContent = 'Tulis Artikel Baru';
}

// =========================================================
//  ASSETS (LAYMAN-FRIENDLY & INSTANT UPLOAD)
// =========================================================
function renderAssets() {
  const saved = getLS('ms88_assets', {});
  const grid = document.getElementById('assetsGrid');
  if (!grid) return;

  grid.innerHTML = DEFAULT_ASSETS.map(a => {
    const isCustom = Boolean(saved[a.key]);
    const imgSrc = saved[a.key] || a.def;
    return `
      <div class="asset-card ${isCustom ? 'is-custom' : ''}" id="assetCard_${a.key}" data-key="${a.key}"
           ondragover="handleAssetDragOver(event, this)"
           ondragleave="handleAssetDragLeave(event, this)"
           ondrop="handleAssetDrop(event, '${a.key}', this)">
        
        <div class="asset-preview-wrap" onclick="triggerAssetUpload('${a.key}')" title="Klik untuk upload gambar baru">
          <img src="${imgSrc}" alt="${a.label}" class="asset-img" id="imgPrev_${a.key}" onerror="this.src='/assets/dummy/bola.png'">
          <div class="asset-badge ${isCustom ? 'badge-custom' : 'badge-default'}">
            ${isCustom ? (ICON.check + ' Gambar Kustom') : 'Bawaan'}
          </div>
          <div class="asset-overlay">
            <div class="overlay-content">
              ${ICON.upload}
              <span>Klik / Drag Gambar ke Sini</span>
            </div>
          </div>
        </div>

        <div class="asset-details">
          <div class="asset-title-row">
            <span class="asset-name">${a.label}</span>
            <span style="font-size:10.5px;padding:2px 7px;border-radius:4px;background:#f3f4f6;color:#6b7280;font-weight:600;margin-left:auto;">${a.targetW ? (a.targetW + (a.targetH ? '×' + a.targetH : '') + ' px') : 'Auto'}</span>
          </div>
          <p class="asset-hint">${a.hint}</p>

          <div class="asset-actions">
            <button type="button" class="btn-upload-direct" onclick="triggerAssetUpload('${a.key}')">
              ${ICON.upload} Upload Gambar
            </button>
            <input type="file" id="assetFile_${a.key}" accept="image/*" style="display:none;" onchange="uploadAssetFile('${a.key}', this)">
            ${isCustom ? `
              <button type="button" class="btn-reset-direct" onclick="resetSingleAsset('${a.key}')" title="Kembalikan ke gambar asli bawaan">
                ${ICON.rotate} Reset
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function triggerAssetUpload(key) {
  const input = document.getElementById('assetFile_' + key);
  if (input) {
    input.value = '';
    input.click();
  }
}

// =========================================================
//  AUTO-COMPRESS HELPER
//  Resizes an image to the target dimensions for each asset.
//  - If targetW & targetH are set: cover-fit (fill exact box, crop center)
//  - If only targetW: proportional width clamp
//  - If no target: proportional clamp to MAX_SAFE
//  Always downscales oversized images; upscales undersized images to target.
// =========================================================
function autoCompressImage(img, assetMeta, mimeType, onDone) {
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;
  const tW = assetMeta && assetMeta.targetW ? assetMeta.targetW : null;
  const tH = assetMeta && assetMeta.targetH ? assetMeta.targetH : null;
  const fitMode = (assetMeta && assetMeta.fit) ? assetMeta.fit : 'cover';
  const isLogo = assetMeta && assetMeta.key === 'logo';
  const isFavicon = assetMeta && assetMeta.key === 'favicon';
  const isContain = fitMode === 'contain' || isLogo || isFavicon;

  let canvasW, canvasH;
  let sx = 0, sy = 0, sw = origW, sh = origH;
  let dx = 0, dy = 0, dw, dh;

  if (isContain) {
    // Proportional fit: never crop, maintain exact original aspect ratio inside bounding box
    const maxW = tW || (isLogo ? 240 : 400);
    const maxH = tH || (isLogo ? 60 : 400);
    const scale = Math.min(maxW / origW, maxH / origH, 1);
    canvasW = Math.max(1, Math.round(origW * scale));
    canvasH = Math.max(1, Math.round(origH * scale));
    dw = canvasW;
    dh = canvasH;
  } else if (tW && tH) {
    // Cover-fit: scale source to fill exact target box, center-crop excess
    canvasW = tW;
    canvasH = tH;
    const scaleX = tW / origW;
    const scaleY = tH / origH;
    const scale  = Math.max(scaleX, scaleY);
    sw = Math.round(tW / scale);
    sh = Math.round(tH / scale);
    sx = Math.round((origW - sw) / 2);
    sy = Math.round((origH - sh) / 2);
    dw = canvasW;
    dh = canvasH;
  } else if (tW) {
    // Proportional clamp to width target
    const scale = tW / origW;
    canvasW = tW;
    canvasH = Math.round(origH * scale);
    dw = canvasW;
    dh = canvasH;
  } else {
    // Fallback safe clamp
    const MAX_SAFE = 1600;
    let scale = 1;
    if (origW > MAX_SAFE || origH > MAX_SAFE) {
      scale = Math.min(MAX_SAFE / origW, MAX_SAFE / origH);
    }
    canvasW = Math.round(origW * scale);
    canvasH = Math.round(origH * scale);
    dw = canvasW;
    dh = canvasH;
  }

  const canvas = document.createElement('canvas');
  canvas.width  = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const isTransparent = isLogo || isFavicon || mimeType === 'image/png' || mimeType === 'image/webp';
  if (!isTransparent) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  // Multi-step downsampling for sharpness
  if (origW / canvasW > 2 || origH / canvasH > 2) {
    let tmpW = sw, tmpH = sh;
    let tmpCanvas = document.createElement('canvas');
    let tmpCtx = tmpCanvas.getContext('2d');
    tmpCanvas.width  = sw;
    tmpCanvas.height = sh;
    tmpCtx.imageSmoothingEnabled = true;
    tmpCtx.imageSmoothingQuality = 'high';
    tmpCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    while (tmpW / canvasW > 2 || tmpH / canvasH > 2) {
      const nw = Math.max(Math.round(tmpW / 2), canvasW);
      const nh = Math.max(Math.round(tmpH / 2), canvasH);
      const step = document.createElement('canvas');
      step.width = nw; step.height = nh;
      const sCtx = step.getContext('2d');
      sCtx.imageSmoothingEnabled = true;
      sCtx.imageSmoothingQuality = 'high';
      sCtx.drawImage(tmpCanvas, 0, 0, nw, nh);
      tmpCanvas = step;
      tmpW = nw; tmpH = nh;
    }
    ctx.drawImage(tmpCanvas, 0, 0, canvasW, canvasH);
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  const outType = isTransparent ? 'image/png' : 'image/jpeg';
  const quality = isTransparent ? undefined : (canvasW >= 1200 ? 0.84 : 0.80);
  let dataUrl = canvas.toDataURL(outType, quality);

  // If PNG is over 500KB and not a logo/favicon, convert to JPEG to protect LocalStorage quota
  if (outType === 'image/png' && dataUrl.length > 550000 && !isLogo && !isFavicon) {
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = canvasW;
    bgCanvas.height = canvasH;
    const bgCtx = bgCanvas.getContext('2d');
    bgCtx.fillStyle = '#FFFFFF';
    bgCtx.fillRect(0, 0, canvasW, canvasH);
    bgCtx.drawImage(canvas, 0, 0);
    dataUrl = bgCanvas.toDataURL('image/jpeg', 0.82);
  }

  onDone(dataUrl, { origW, origH, outW: canvasW, outH: canvasH });
}

function uploadAssetFile(key, input) {
  const file = input.files && input.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    toast('Harap pilih file gambar (JPG, PNG, WebP, SVG)', 'error');
    return;
  }

  const assetMeta = DEFAULT_ASSETS.find(a => a.key === key);
  const label = assetMeta ? assetMeta.label : 'Gambar';

  // SVG → save as-is (vector, no canvas needed)
  if (file.type === 'image/svg+xml') {
    const reader = new FileReader();
    reader.onload = function(e) { saveSingleAsset(key, e.target.result, label); };
    reader.readAsDataURL(file);
    return;
  }

  // All raster images → auto-compress via canvas
  const fileSizeKB = Math.round(file.size / 1024);
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      autoCompressImage(img, assetMeta, file.type, function(dataUrl, info) {
        // Estimate output size from base64
        const outBytes   = Math.round((dataUrl.length * 3) / 4);
        const outKB      = Math.round(outBytes / 1024);
        const changed    = info.origW !== info.outW || info.origH !== info.outH;
        const sizeChange = fileSizeKB !== outKB;

        // Show progress popup then save
        const msg = changed || sizeChange
          ? `✅ ${label} dikompres otomatis — ${info.origW}×${info.origH} → ${info.outW}×${info.outH} | ${fileSizeKB} KB → ${outKB} KB`
          : `✅ ${label} berhasil diunggah (${outKB} KB)`;

        saveSingleAsset(key, dataUrl, label, msg);
      });
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function saveSingleAsset(key, dataUrl, label, customMsg) {
  try {
    const saved = getLS('ms88_assets', {});
    saved[key] = dataUrl;
    setLS('ms88_assets', saved);
    renderAssets();
    toast(customMsg || (label + ' berhasil diunggah & tersimpan! ✓'));
  } catch (err) {
    console.error(err);
    toast('Gagal menyimpan: kapasitas penyimpanan penuh. Coba pilih foto dengan ukuran lebih ringkas.', 'error');
  }
}

function resetSingleAsset(key) {
  const assetMeta = DEFAULT_ASSETS.find(a => a.key === key);
  const label = assetMeta ? assetMeta.label : 'gambar';
  if (!confirm('Kembalikan "' + label + '" ke gambar bawaan asli?')) return;
  const saved = getLS('ms88_assets', {});
  delete saved[key];
  setLS('ms88_assets', saved);
  renderAssets();
  toast(label + ' dikembalikan ke bawaan ✓');
}

function resetAssets() {
  if (!confirm('Kembalikan SEMUA gambar aset ke gambar bawaan default?')) return;
  localStorage.removeItem('ms88_assets');
  renderAssets();
  toast('Semua gambar aset dikembalikan ke default ✓');
}

function saveAssets() {
  toast('Semua gambar aset sudah otomatis tersimpan! ✓');
}

function handleAssetDragOver(e, card) {
  e.preventDefault();
  card.classList.add('drag-over');
}

function handleAssetDragLeave(e, card) {
  e.preventDefault();
  card.classList.remove('drag-over');
}

function handleAssetDrop(e, key, card) {
  e.preventDefault();
  card.classList.remove('drag-over');
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    uploadAssetFile(key, { files: e.dataTransfer.files });
  }
}

// =========================================================
//  CONTACT & SOSMED
// =========================================================
function renderContact() {
  const defaultContact = {
    nama: 'Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi',
    alamat: 'Lapangan Pusdikif, Jalan Gatot Subroto, Kota Cimahi, Jawa Barat',
    telp: '081295679799',
    wa: '081295679799',
    email: 'alphasport88cimahi@gmail.com',
    maps: 'https://maps.google.com/?q=Pusdikif+Cimahi',
    jam: 'Setiap Hari 06.00 – 23.00 WIB'
  };
  const defaultSosmed = {
    instagram: '88alphasport',
    tiktok: '88alphasport',
    facebook: '88alphasport',
    youtube: '88 Alpha Sport Pusdikif',
    twitter: '88alphasport'
  };
  const defaultStats = { lapangan: '1 (30x50m)', member: '250+', kota: 'Cimahi & Bandung' };

  const d = Object.assign({}, defaultContact, getLS('ms88_contact', {}));
  const sm = Object.assign({}, defaultSosmed, getLS('ms88_sosmed', {}));
  const st = Object.assign({}, defaultStats, getLS('ms88_pubstats', {}));

  const fields = { cNama:'nama', cAlamat:'alamat', cTelp:'telp', cWa:'wa', cEmail:'email', cMaps:'maps', cJam:'jam' };
  Object.entries(fields).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && d[key]) el.value = d[key];
  });

  const smFields = { smInstagram:'instagram', smTiktok:'tiktok', smFacebook:'facebook', smYoutube:'youtube', smTwitter:'twitter' };
  Object.entries(smFields).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && sm[key]) el.value = sm[key];
  });

  const stFields = { statLapangan:'lapangan', statMember:'member', statKota:'kota' };
  Object.entries(stFields).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && st[key]) el.value = st[key];
  });
}

function saveContact() {
  const data = {
    nama:   document.getElementById('cNama')?.value.trim(),
    alamat: document.getElementById('cAlamat')?.value.trim(),
    telp:   document.getElementById('cTelp')?.value.trim(),
    wa:     document.getElementById('cWa')?.value.trim(),
    email:  document.getElementById('cEmail')?.value.trim(),
    maps:   document.getElementById('cMaps')?.value.trim(),
    jam:    document.getElementById('cJam')?.value.trim(),
  };
  setLS('ms88_contact', data);
  toast('Kontak disimpan ✓');
}

function saveSosmed() {
  const data = {
    instagram: document.getElementById('smInstagram')?.value.trim(),
    tiktok:    document.getElementById('smTiktok')?.value.trim(),
    facebook:  document.getElementById('smFacebook')?.value.trim(),
    youtube:   document.getElementById('smYoutube')?.value.trim(),
    twitter:   document.getElementById('smTwitter')?.value.trim(),
  };
  setLS('ms88_sosmed', data);
  toast('Sosial media disimpan ✓');
}

function saveStats() {
  const data = {
    lapangan: document.getElementById('statLapangan')?.value.trim(),
    member:   document.getElementById('statMember')?.value.trim(),
    kota:     document.getElementById('statKota')?.value.trim(),
  };
  setLS('ms88_pubstats', data);
  toast('Statistik publik disimpan ✓');
}

// =========================================================
//  PRICING
// =========================================================
function renderPricing() {
  let pricing = getLS('ms88_pricing', null);
  if (!pricing || pricing.length === 0) {
    pricing = [
      { lapangan: 'Lapangan Pusdikif 30x50m', sesi: 'Prime Morning (06.00 - 08.00)', harga: 250000 },
      { lapangan: 'Lapangan Pusdikif 30x50m', sesi: 'Morning (08.00 - 10.00)', harga: 275000 },
      { lapangan: 'Lapangan Pusdikif 30x50m', sesi: 'Happy Hours (10.00 - 15.00)', harga: 225000 },
      { lapangan: 'Lapangan Pusdikif 30x50m', sesi: 'Prime Time (15.00 - 18.00)', harga: 300000 },
      { lapangan: 'Lapangan Pusdikif 30x50m', sesi: 'Premium Night (18.00 - 22.00)', harga: 350000 },
    ];
    setLS('ms88_pricing', pricing);
  }

  const el = document.getElementById('pricingBody');
  if (!el) return;
  if (pricing.length === 0) { el.innerHTML = '<p class="empty-state">Belum ada tarif.</p>'; return; }

  el.innerHTML = `
    <table class="data-table">
      <thead><tr><th>Lapangan</th><th>Sesi</th><th>Harga / Jam</th><th>Aksi</th></tr></thead>
      <tbody>
        ${pricing.map((p,i) => `
          <tr>
            <td>${p.lapangan}</td>
            <td>${p.sesi}</td>
            <td>${fmtRp(p.harga)}</td>
            <td><button class="btn-icon btn-red" onclick="deletePricing(${i})">${ICON.trash}</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function addPricing() {
  const lapangan = document.getElementById('pLapangan')?.value.trim();
  const sesi = document.getElementById('pSesi')?.value;
  const harga = +document.getElementById('pHarga')?.value;
  if (!lapangan || !harga) { toast('Isi lapangan dan harga!', 'error'); return; }
  const pricing = getLS('ms88_pricing', []);
  pricing.push({ lapangan, sesi, harga });
  setLS('ms88_pricing', pricing);
  renderPricing();
  toast('Tarif ditambahkan ✓');
  document.getElementById('pLapangan').value = '';
  document.getElementById('pHarga').value = '';
}

function deletePricing(idx) {
  const pricing = getLS('ms88_pricing', []);
  pricing.splice(idx, 1);
  setLS('ms88_pricing', pricing);
  renderPricing();
  toast('Tarif dihapus', 'warning');
}

// =========================================================
//  SETTINGS
// =========================================================
function loadSettings() {
  const s = getLS('ms88_settings', { venueName:'Mini Soccer 88 Alpha Sport Pusdikif', numCourts:1, openTime:'06:00', closeTime:'23:00', slotDuration:60 });
  const el = id => document.getElementById(id);
  if (el('setVenueName')) el('setVenueName').value = s.venueName || '';
  if (el('setNumCourts')) el('setNumCourts').value = s.numCourts || 1;
  if (el('setOpenTime'))  el('setOpenTime').value  = s.openTime  || '07:00';
  if (el('setCloseTime')) el('setCloseTime').value = s.closeTime || '23:00';
  if (el('setSlotDuration')) el('setSlotDuration').value = s.slotDuration || 60;
}

function saveGeneral() {
  const s = {
    venueName:    document.getElementById('setVenueName')?.value.trim(),
    numCourts:    +document.getElementById('setNumCourts')?.value || 1,
    openTime:     document.getElementById('setOpenTime')?.value || '07:00',
    closeTime:    document.getElementById('setCloseTime')?.value || '23:00',
    slotDuration: +document.getElementById('setSlotDuration')?.value || 60,
  };
  setLS('ms88_settings', s);
  toast('Pengaturan disimpan ✓');
}

function changeCreds() {
  const newUser = document.getElementById('newUsername')?.value.trim();
  const oldPass = document.getElementById('oldPassword')?.value;
  const newPass = document.getElementById('newPassword')?.value;
  const confirm = document.getElementById('confirmPassword')?.value;

  const creds = getLS('ms88_admin_creds', { username:'admin', password:'ms88admin2024' });
  if (oldPass !== creds.password) { toast('Password lama salah!', 'error'); return; }
  if (newPass.length < 8) { toast('Password baru minimal 8 karakter!', 'error'); return; }
  if (newPass !== confirm) { toast('Konfirmasi password tidak cocok!', 'error'); return; }

  const updated = {
    username: newUser || creds.username,
    password: newPass
  };
  setLS('ms88_admin_creds', updated);
  sessionStorage.setItem('ms88_admin_user', updated.username);
  toast('Kredensial berhasil diperbarui ✓');
  ['newUsername','oldPassword','newPassword','confirmPassword'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function clearAllData() {
  if (!confirm('PERINGATAN: Hapus semua data booking, slot, mabar, blog, dan aset?\n\nAksi ini tidak dapat dibatalkan!')) return;
  ['ms88_orders','ms88_blocked_slots','ms88_mabar_sessions','ms88_blogs','ms88_assets','ms88_pricing','ms88_contact','ms88_sosmed','ms88_pubstats'].forEach(k => localStorage.removeItem(k));
  initDefaultOrdersIfEmpty();
  renderOverview(); renderOrders(); renderSlots(); renderMabar(); renderBlogs(); renderAssets(); renderPricing(); renderContact();
  toast('Semua data telah dihapus', 'warning');
}
