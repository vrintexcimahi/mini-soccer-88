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
  wa:       '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.101-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.176-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.201-.3.301-.502.101-.201.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.244-.588-.493-.508-.678-.518-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.511 1.079 2.913 1.23 3.114c.15.201 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.378.198 1.901.12.583-.087 1.78-.727 2.032-1.43.252-.703.252-1.305.176-1.43-.076-.126-.277-.201-.578-.352zM12 21.848a9.81 9.81 0 0 1-5.004-1.373l-.359-.213-3.722.976.993-3.627-.234-.372A9.82 9.82 0 1 1 12 21.848zM12 2C6.477 2 2 6.477 2 12c0 1.767.46 3.427 1.265 4.873L2 22l5.247-1.236A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>',
  download: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
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
  { key: 'banner_1_desktop', label: 'Slider Banner 1',           def: '/assets/promo/poster-ekskul-sekolah.png',      hint: 'Poster program sekolah & ekskul • 1254×1254 px',       targetW: 1254, targetH: 1254, fit: 'contain' },
  { key: 'banner_2_desktop', label: 'Slider Banner 2',           def: '/assets/promo/poster-fotografer.png',          hint: 'Poster dokumentasi fotografer GERAK • 1254×1254 px',   targetW: 1254, targetH: 1254, fit: 'contain' },
  { key: 'kompetisi1',       label: 'Poster Kommoto 7-8',        def: '/assets/promo/poster-kommoto.png',             hint: 'Program komunitas pagi jam 7-8',                      targetW: 1254, targetH: 1254, fit: 'contain' },
  { key: 'kompetisi2',       label: 'Poster Creator Collab',     def: '/assets/promo/poster-content-creator.jpg',     hint: 'Kerjasama content creator @88alphasport',             targetW: 640,  targetH: 480,  fit: 'cover'   },
  { key: 'kompetisi3',       label: 'Poster Pricelist Resmi',    def: '/assets/promo/poster-pricelist.png',           hint: 'Tabel harga sewa per jam September 2026',             targetW: 1254, targetH: 1254, fit: 'contain' },
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
  renderPayments();
  loadPaymentSettings();
  renderMabar();
  renderBlogs();
  renderAssets();
  renderContact();
  renderPricing();
  loadSettings();
  loadWaGatewaySettings();
  renderUsers();
  renderStaff();
  applyRoleRestrictions();
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
    payments:'Transaksi & Nota', mabar:'Sesi Mabar', users:'Manajemen User',
    roles:'Manajemen Role & Staff',
    blog:'Blog & Artikel', assets:'Pengaturan Aset',
    pricing:'Tarif Lapangan', contact:'Kontak & Sosmed', settings:'Pengaturan Sistem'
  };
  const titleEl = document.getElementById('topbarTitle');
  if (titleEl) titleEl.textContent = titles[tab] || 'Dashboard';
  currentTab = tab;
  if (tab === 'payments') renderPayments();
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
        <button class="btn-icon btn-wa" onclick="sendOrderWaConfirmation('${o.id}')" title="Kirim Konfirmasi / Chat WhatsApp">${ICON.wa}</button>
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

  // Notifikasi WhatsApp otomatis jika diaktifkan
  const waSettings = getLS('ms88_wa_gateway', { autoPrompt: true });
  if (waSettings.autoPrompt !== false) {
    setTimeout(() => {
      sendOrderWaConfirmation(id);
    }, 450);
  }
}

// --- Ekspor Rekap Booking ke CSV (Excel) ---
function exportOrdersToCSV() {
  const orders = getLS('ms88_orders', []);
  const filter = document.getElementById('filterStatus')?.value || '';
  const filtered = filter ? orders.filter(o => o.status === filter) : orders;

  if (filtered.length === 0) {
    toast('Tidak ada data booking untuk diekspor', 'warning');
    return;
  }

  const csvRows = [];
  csvRows.push([
    'No',
    'ID Booking',
    'Nama Pelanggan / Tim',
    'Nomor WhatsApp',
    'Lapangan / Sesi',
    'Tanggal Main',
    'Jam Main',
    'Total Biaya (Rp)',
    'Status',
    'Metode Transaksi',
    'Waktu Pencatatan'
  ]);

  filtered.forEach((o, i) => {
    csvRows.push([
      i + 1,
      o.id || '',
      o.name || '',
      o.phone || '',
      o.court || o.field || 'Lapangan Utama Pusdikif',
      o.date || '',
      o.time || '',
      o.total || 0,
      (o.status || '').toUpperCase(),
      o.payment || 'manual',
      o.timestamp || o.paid_at || '-'
    ]);
  });

  const csvString = csvRows.map(row => 
    row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
  ).join('\r\n');

  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const now = new Date();
  const timeStr = now.toISOString().slice(0,10).replace(/-/g,'') + '_' + String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `Rekap_Booking_MS88_${timeStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast(`Berhasil mengekspor ${filtered.length} data booking ✓`);
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

// =========================================================
//  TRANSAKSI & NOTA PEMBAYARAN (MIDTRANS QRIS)
// =========================================================
function renderPayments() {
  const orders   = getLS('ms88_orders', []);
  const search   = (document.getElementById('filterPaySearch')?.value || '').toLowerCase().trim();
  const stFilter = document.getElementById('filterPayStatus')?.value || '';

  // KPI Calculations
  let totalCount = 0;
  let paidCount  = 0;
  let pendCount  = 0;
  let revenue    = 0;

  orders.forEach(o => {
    totalCount++;
    const isPaid = (o.status === 'paid' || o.status === 'confirmed');
    if (isPaid) {
      paidCount++;
      revenue += (o.total || 0);
    } else if (o.status === 'pending') {
      pendCount++;
    }
  });

  const kpiRev = document.getElementById('kpiPayRevenue');
  const kpiPaid = document.getElementById('kpiPayPaid');
  const kpiPend = document.getElementById('kpiPayPending');
  const kpiTot  = document.getElementById('kpiPayTotal');
  if (kpiRev)  kpiRev.textContent  = fmtRp(revenue);
  if (kpiPaid) kpiPaid.textContent = paidCount;
  if (kpiPend) kpiPend.textContent = pendCount;
  if (kpiTot)  kpiTot.textContent  = totalCount;

  // Filter list
  const filtered = orders.filter(o => {
    if (stFilter) {
      if (stFilter === 'paid' && o.status !== 'paid' && o.status !== 'confirmed') return false;
      if (stFilter !== 'paid' && o.status !== stFilter) return false;
    }
    if (search) {
      const matchId   = (o.id || '').toLowerCase().includes(search);
      const matchName = (o.name || '').toLowerCase().includes(search);
      const matchPhone= (o.phone || '').toLowerCase().includes(search);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  const tbody = document.getElementById('paymentsBody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state" style="text-align:center;padding:32px;color:#6b7280;">Tidak ada riwayat pembayaran yang cocok.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map((o, i) => {
    const isPaid = (o.status === 'paid' || o.status === 'confirmed');
    const methodBadge = (o.payment === 'midtrans' || o.id?.startsWith('MS88-'))
      ? '<span style="background:rgba(215,25,38,0.08);color:#D71926;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;">⚡ QRIS Midtrans</span>'
      : (o.payment === 'whatsapp'
          ? '<span style="background:rgba(37,211,102,0.1);color:#15803d;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;">💬 WhatsApp</span>'
          : '<span style="background:#f3f4f6;color:#4b5563;font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;">Manual</span>');

    return `
      <tr>
        <td>${i + 1}</td>
        <td><code style="font-size:12px;color:#D71926;background:rgba(215,25,38,0.05);padding:2px 6px;border-radius:4px;font-weight:600;">${o.id || '-'}</code></td>
        <td><strong>${o.name || 'Pelanggan'}</strong><br><small style="color:#6b7280;">${o.phone || '-'}</small></td>
        <td>${o.court || o.field || 'Lapangan Utama'}<br><small style="color:#6b7280;">${o.date || '-'} · ${o.time || '-'}</small></td>
        <td><strong>${fmtRp(o.total || 0)}</strong></td>
        <td>${methodBadge}</td>
        <td><span class="badge-status ${o.status}">${isPaid ? 'paid' : o.status}</span></td>
        <td class="action-cell">
          ${o.status === 'pending' ? `<button class="btn-icon btn-outline" onclick="checkPaymentStatusAdmin('${o.id}')" title="Cek Status Midtrans">${ICON.rotate || '🔄'}</button>` : ''}
          <button class="btn-icon btn-outline" onclick="openReceiptAdmin('${o.id}')" title="Buka & Cetak Nota" style="color:#08090B;">🧾</button>
          <button class="btn-icon btn-wa" onclick="sendPaymentWaReceipt('${o.id}')" title="Kirim Nota via WhatsApp ke Pemesan">${ICON.wa}</button>
          ${!isPaid ? `<button class="btn-icon btn-green" onclick="markPaymentPaid('${o.id}')" title="Tandai Lunas Manual">${ICON.check}</button>` : ''}
          <button class="btn-icon btn-red" onclick="deletePayment('${o.id}')" title="Hapus Transaksi">${ICON.trash}</button>
        </td>
      </tr>
    `;
  }).join('');
}

async function openReceiptAdmin(orderId) {
  const secret = 'ms88-receipt-secret-key-2026';
  let token = '';
  try {
    if (window.crypto && window.crypto.subtle) {
      const enc = new TextEncoder();
      const key = await window.crypto.subtle.importKey(
        'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
      );
      const sig = await window.crypto.subtle.sign('HMAC', key, enc.encode(orderId));
      token = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch(e) {
    console.warn('[openReceiptAdmin] SubtleCrypto warning:', e);
  }

  const receiptPath = window.location.pathname.includes('/superadmin') ? '../receipt.html' : 'receipt.html';
  const url = token ? `${receiptPath}?order_id=${encodeURIComponent(orderId)}&token=${token}` : `${receiptPath}?order_id=${encodeURIComponent(orderId)}`;
  window.open(url, '_blank');
}

async function checkPaymentStatusAdmin(orderId) {
  toast('Mengecek status pembayaran ke Midtrans...');
  try {
    const resp = await fetch(`/api/payment-status?order_id=${encodeURIComponent(orderId)}`);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();

    const orders = getLS('ms88_orders', []);
    const idx = orders.findIndex(o => String(o.id) === String(orderId));
    if (idx >= 0) {
      orders[idx].status = data.status;
      if (data.paid_at) orders[idx].paid_at = data.paid_at;
      setLS('ms88_orders', orders);
    }
    renderPayments();
    renderOrders();
    renderOverview();
    toast(`Status transaksi ${orderId}: ${data.status.toUpperCase()} ✓`);
  } catch (err) {
    console.warn('[checkPaymentStatusAdmin] Error:', err.message);
    toast('Gagal menghubungi API Midtrans: ' + err.message, 'warning');
  }
}

function markPaymentPaid(orderId) {
  if (!confirm(`Tandai transaksi ${orderId} sebagai LUNAS?`)) return;
  const orders = getLS('ms88_orders', []);
  const idx = orders.findIndex(o => String(o.id) === String(orderId));
  if (idx >= 0) {
    orders[idx].status = 'paid';
    orders[idx].paid_at = new Date().toISOString();
    setLS('ms88_orders', orders);
  }
  renderPayments();
  renderOrders();
  renderOverview();
  toast(`Transaksi ${orderId} ditandai LUNAS ✓`);
}

function deletePayment(orderId) {
  if (!confirm(`Hapus transaksi ${orderId}?`)) return;
  const orders = getLS('ms88_orders', []).filter(o => String(o.id) !== String(orderId));
  setLS('ms88_orders', orders);
  renderPayments();
  renderOrders();
  renderOverview();
  toast('Transaksi berhasil dihapus', 'warning');
}

function addDummyPayment() {
  const orders = getLS('ms88_orders', []);
  const now = new Date();
  const dateStr = now.toISOString().slice(0,10);
  const orderId = 'MS88-' + dateStr.replace(/-/g,'') + '-' + Math.random().toString(36).substring(2,8).toUpperCase();
  const clubs = ['Sparta FC Cimahi', 'Alpha Warrior FC', 'Pusdikif United', 'Sang Mantan FC', 'Kirari Space'];
  const sessions = [
    { name: 'Happy Hours (10:00–15:00)', total: 225000, time: '10:00 (1 Jam)' },
    { name: 'Prime Time (15:00–18:00)', total: 300000, time: '16:00 (1 Jam)' },
    { name: 'Premium Night (18:00–22:00)', total: 700000, time: '19:00 (2 Jam)' }
  ];
  const randSession = sessions[Math.floor(Math.random() * sessions.length)];

  orders.unshift({
    id: orderId,
    name: clubs[Math.floor(Math.random() * clubs.length)],
    phone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
    field: randSession.name,
    court: 'Lapangan 1 (FIFA Synth)',
    date: dateStr,
    time: randSession.time,
    total: randSession.total,
    status: 'paid',
    payment: 'midtrans',
    paid_at: new Date().toISOString(),
    timestamp: new Date().toLocaleDateString('id-ID', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })
  });

  setLS('ms88_orders', orders);
  renderPayments();
  renderOrders();
  renderOverview();
  toast('Simulasi transaksi QRIS berhasil dibuat ✓');
}

async function syncPaymentsFromAPI() {
  const orders = getLS('ms88_orders', []);
  const pendings = orders.filter(o => o.status === 'pending');
  if (pendings.length === 0) {
    toast('Semua transaksi sudah up-to-date.');
    return;
  }
  toast(`Menyinkronkan ${pendings.length} transaksi pending...`);
  let updated = 0;
  for (const o of pendings) {
    try {
      const resp = await fetch(`/api/payment-status?order_id=${encodeURIComponent(o.id)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.status && data.status !== o.status) {
          o.status = data.status;
          if (data.paid_at) o.paid_at = data.paid_at;
          updated++;
        }
      }
    } catch(e) {}
  }
  setLS('ms88_orders', orders);
  renderPayments();
  renderOrders();
  renderOverview();
  toast(`Sinkronisasi selesai: ${updated} transaksi diperbarui ✓`);
}

// --- Ekspor Laporan Omset & Transaksi ke CSV (Excel) ---
function exportPaymentsToCSV() {
  const orders   = getLS('ms88_orders', []);
  const search   = (document.getElementById('filterPaySearch')?.value || '').toLowerCase().trim();
  const stFilter = document.getElementById('filterPayStatus')?.value || '';

  const filtered = orders.filter(o => {
    if (stFilter) {
      if (stFilter === 'paid' && o.status !== 'paid' && o.status !== 'confirmed') return false;
      if (stFilter !== 'paid' && o.status !== stFilter) return false;
    }
    if (search) {
      const matchId   = (o.id || '').toLowerCase().includes(search);
      const matchName = (o.name || '').toLowerCase().includes(search);
      const matchPhone= (o.phone || '').toLowerCase().includes(search);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    toast('Tidak ada riwayat pembayaran untuk diekspor', 'warning');
    return;
  }

  const csvRows = [];
  csvRows.push([
    'No',
    'Order ID',
    'Nomor Nota Resmi',
    'Nama Pelanggan / Tim',
    'Nomor WhatsApp',
    'Layanan / Sesi',
    'Lapangan',
    'Tanggal Booking',
    'Jam Main',
    'Metode Transaksi',
    'Nominal (Rp)',
    'Status Pembayaran',
    'Waktu Lunas / Terverifikasi'
  ]);

  filtered.forEach((o, i) => {
    const isPaid = (o.status === 'paid' || o.status === 'confirmed');
    const receiptNo = 'NOTA-' + (String(o.id).replace(/\D/g,'').slice(-6) || '260901');
    csvRows.push([
      i + 1,
      o.id || '',
      receiptNo,
      o.name || 'Pelanggan',
      o.phone || '',
      o.field || 'Sewa Lapangan Mini Soccer',
      o.court || 'Lapangan Pusdikif Cimahi',
      o.date || '',
      o.time || '',
      o.payment === 'midtrans' ? 'QRIS Midtrans' : (o.payment === 'whatsapp' ? 'WhatsApp' : 'Manual'),
      o.total || 0,
      isPaid ? 'LUNAS' : (o.status || '').toUpperCase(),
      o.paid_at ? new Date(o.paid_at).toLocaleString('id-ID') : (o.timestamp || '-')
    ]);
  });

  const csvString = csvRows.map(row => 
    row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
  ).join('\r\n');

  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const now = new Date();
  const timeStr = now.toISOString().slice(0,10).replace(/-/g,'') + '_' + String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `Laporan_Omset_MS88_${timeStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast(`Berhasil mengekspor ${filtered.length} riwayat transaksi & omset ✓`);
}

// --- Kirim Konfirmasi Booking via WhatsApp ---
function sendOrderWaConfirmation(id) {
  const orders = getLS('ms88_orders', []);
  const o = orders.find(item => String(item.id) === String(id));
  if (!o) {
    toast('Data booking tidak ditemukan', 'warning');
    return;
  }

  const waSettings = getLS('ms88_wa_gateway', {
    provider: 'direct',
    senderPhone: '081295679799',
    templateType: 'full'
  });

  const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
  const receiptUrl = `${origin}/receipt.html?order_id=${encodeURIComponent(o.id)}`;
  const statusStr = (o.status === 'paid' || o.status === 'confirmed') ? 'DIKONFIRMASI / LUNAS' : 'MENUNGGU PEMBAYARAN';

  let msg = '';
  if (waSettings.templateType === 'compact') {
    msg = 
`*KONFIRMASI BOOKING — MINI SOCCER 88 ALPHA SPORT*
Halo kak *${o.name}*, jadwal booking mini soccer Anda telah kami catat:
🏟️ ${o.court || o.field || 'Lapangan Pusdikif'}
📅 ${o.date || '-'} | ⏰ ${o.time || '-'}
💰 Total: ${fmtRp(o.total || 0)} [${statusStr}]
🔗 Cek Nota & Tiket: ${receiptUrl}
Sampai jumpa di lapangan!`;
  } else {
    msg = 
`*KONFIRMASI BOOKING — MINI SOCCER 88 ALPHA SPORT*
--------------------------------------------------
Halo kak *${o.name}*, terima kasih telah memesan jadwal di Mini Soccer 88 Alpha Sport Pusdikif Cimahi.

📋 *Rincian Jadwal Booking:*
• *ID Booking:* ${o.id}
• *Lapangan:* ${o.court || o.field || 'Lapangan Utama Pusdikif Cimahi'}
• *Tanggal:* ${o.date || '-'}
• *Jam Main:* ${o.time || '-'}
• *Total Biaya:* ${fmtRp(o.total || 0)}
• *Status:* ✅ ${statusStr}

🔗 *Bukti Nota & Tiket Masuk Digital:*
${receiptUrl}

📍 *Lokasi Venue:*
Jl. Gatot Subroto, Pusdikif Kota Cimahi.
_Mohon hadir 15 menit sebelum jam bermain dimulai. Terima kasih & selamat berolahraga!_
--------------------------------------------------
Mini Soccer 88 Alpha Sport Official (WA: ${waSettings.senderPhone || '081295679799'})`;
  }

  let cleanPhone = (o.phone || '').replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);
  else if (cleanPhone.startsWith('8')) cleanPhone = '62' + cleanPhone;

  let waUrl = '';
  if (cleanPhone.length >= 9) {
    waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  } else {
    waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  }

  window.open(waUrl, '_blank');
  toast(`Membuka WhatsApp untuk ${o.name} (${o.phone || '-'}) ✓`);
}

// --- Kirim Nota Transaksi via WhatsApp ---
function sendPaymentWaReceipt(orderId) {
  const orders = getLS('ms88_orders', []);
  const o = orders.find(item => String(item.id) === String(orderId));
  if (!o) {
    toast('Data transaksi tidak ditemukan', 'warning');
    return;
  }

  const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
  const receiptUrl = `${origin}/receipt.html?order_id=${encodeURIComponent(o.id)}`;
  const isPaid = (o.status === 'paid' || o.status === 'confirmed');
  const receiptNo = 'NOTA-' + (String(o.id).replace(/\D/g,'').slice(-6) || '260901');

  const msg = 
`*NOTA DIGITAL RESMI — MINI SOCCER 88 ALPHA SPORT*
--------------------------------------------------
Halo kak *${o.name || 'Pelanggan'}*, berikut bukti nota transaksi resmi Anda:

📄 *No. Nota:* ${receiptNo}
🔖 *Order ID:* ${o.id}
🏟️ *Layanan:* ${o.field || 'Sewa Lapangan Mini Soccer Pusdikif'}
📅 *Jadwal:* ${o.date || '-'} (${o.time || '-'})
💰 *Nominal:* ${fmtRp(o.total || 0)}
💳 *Metode:* ${o.payment === 'midtrans' ? 'QRIS Midtrans' : (o.payment === 'whatsapp' ? 'WhatsApp' : 'Manual')}
✅ *Status Transaksi:* ${isPaid ? 'LUNAS (PAID)' : 'MENUNGGU PEMBAYARAN'}

🔗 *Link Nota Pembayaran Digital:*
${receiptUrl}

Simpan tautan di atas sebagai bukti resmi saat tiba di venue. Terima kasih!
--------------------------------------------------
Mini Soccer 88 Alpha Sport Pusdikif Cimahi`;

  let cleanPhone = (o.phone || '').replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);
  else if (cleanPhone.startsWith('8')) cleanPhone = '62' + cleanPhone;

  let waUrl = '';
  if (cleanPhone.length >= 9) {
    waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  } else {
    waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  }

  window.open(waUrl, '_blank');
  toast(`Membuka nota WhatsApp untuk ${o.name || o.id} ✓`);
}

// =========================================================
//  WHATSAPP GATEWAY & NOTIFIKASI
// =========================================================
function loadWaGatewaySettings() {
  const def = {
    provider: 'direct',
    apiToken: '',
    senderPhone: '081295679799',
    templateType: 'full',
    autoPrompt: true
  };
  const cfg = getLS('ms88_wa_gateway', def);

  const provEl = document.getElementById('waProvider');
  const tokenEl = document.getElementById('waApiToken');
  const phoneEl = document.getElementById('waSenderPhone');
  const tmplEl = document.getElementById('waTemplateType');
  const autoEl = document.getElementById('waAutoPromptCheck');

  if (provEl) provEl.value = cfg.provider || 'direct';
  if (tokenEl) tokenEl.value = cfg.apiToken || '';
  if (phoneEl) phoneEl.value = cfg.senderPhone || '081295679799';
  if (tmplEl) tmplEl.value = cfg.templateType || 'full';
  if (autoEl) autoEl.checked = cfg.autoPrompt !== false;

  updateWaProviderUI();
}

function updateWaProviderUI() {
  const prov = document.getElementById('waProvider')?.value || 'direct';
  const tokenGroup = document.getElementById('waTokenGroup');
  const badge = document.getElementById('waGatewayBadge');

  if (tokenGroup) {
    tokenGroup.style.display = (prov === 'direct') ? 'none' : 'block';
  }

  if (badge) {
    if (prov === 'direct') {
      badge.textContent = 'Mode: Direct 1-Klik WA (Gratis)';
      badge.style.background = '#EBFDF2';
      badge.style.color = '#15803D';
      badge.style.borderColor = '#BBF7D0';
    } else if (prov === 'fonnte') {
      badge.textContent = 'Mode: Fonnte API Gateway';
      badge.style.background = '#EFF6FF';
      badge.style.color = '#1D4ED8';
      badge.style.borderColor = '#BFDBFE';
    } else if (prov === 'wablas') {
      badge.textContent = 'Mode: Wablas API Gateway';
      badge.style.background = '#F5F3FF';
      badge.style.color = '#6D28D9';
      badge.style.borderColor = '#DDD6FE';
    } else {
      badge.textContent = 'Mode: Custom Webhook API';
      badge.style.background = '#FEF3C7';
      badge.style.color = '#92400E';
      badge.style.borderColor = '#FDE68A';
    }
  }
}

function saveWaGatewaySettings() {
  const cfg = {
    provider: document.getElementById('waProvider')?.value || 'direct',
    apiToken: document.getElementById('waApiToken')?.value || '',
    senderPhone: document.getElementById('waSenderPhone')?.value || '081295679799',
    templateType: document.getElementById('waTemplateType')?.value || 'full',
    autoPrompt: document.getElementById('waAutoPromptCheck')?.checked !== false
  };
  setLS('ms88_wa_gateway', cfg);
  updateWaProviderUI();
  toast('Konfigurasi WhatsApp Gateway berhasil disimpan ✓');
}

function testWaConfirmationModal() {
  const phone = document.getElementById('waSenderPhone')?.value || '081295679799';
  let cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);
  else if (cleanPhone.startsWith('8')) cleanPhone = '62' + cleanPhone;

  const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
  const testMsg = 
`*TES INTEGRASI WHATSAPP — MINI SOCCER 88 ALPHA SPORT*
--------------------------------------------------
Format pesan notifikasi konfirmasi booking berhasil teruji.
• Sender: Official Venue (${phone})
• Waktu Tes: ${new Date().toLocaleString('id-ID')}
• Akses Portal: ${origin}/superadmin/
--------------------------------------------------
Status: AKTIF & SIAP DIGUNAKAN ✓`;

  const waUrl = cleanPhone.length >= 9 ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(testMsg)}` : `https://api.whatsapp.com/send?text=${encodeURIComponent(testMsg)}`;
  window.open(waUrl, '_blank');
  const resEl = document.getElementById('waTestResult');
  if (resEl) {
    resEl.textContent = '✓ Jendela WhatsApp tes berhasil dibuka!';
    setTimeout(() => { if (resEl) resEl.textContent = ''; }, 5000);
  }
}

// Payment Settings (Midtrans)
function loadPaymentSettings() {
  const s = getLS('ms88_payment_settings', {
    env: 'sandbox',
    clientKey: '',
    serverKey: ''
  });
  const envEl = document.getElementById('midtransEnv');
  const cKeyEl = document.getElementById('midtransClientKey');
  const sKeyEl = document.getElementById('midtransServerKey');
  if (envEl)  envEl.value  = s.env || 'sandbox';
  if (cKeyEl) cKeyEl.value = s.clientKey || '';
  if (sKeyEl) sKeyEl.value = s.serverKey || '';
  updateMidtransBadge();
}

function updateMidtransBadge() {
  const env = document.getElementById('midtransEnv')?.value || 'sandbox';
  const cKey = document.getElementById('midtransClientKey')?.value?.trim() || '';
  const sKey = document.getElementById('midtransServerKey')?.value?.trim() || '';
  const badge = document.getElementById('midtransBadge');
  if (!badge) return;

  if (!cKey || !sKey) {
    badge.textContent = 'Mode Demo Sandbox (Tanpa API Key)';
    badge.style.background = '#F4F5F7';
    badge.style.color = '#5A606A';
    badge.style.border = '1px solid #D9DCE1';
  } else if (env === 'production') {
    badge.textContent = '● Live Production Terhubung';
    badge.style.background = 'rgba(217, 162, 27, 0.15)';
    badge.style.color = '#8C680E';
    badge.style.border = '1px solid #D9A21B';
  } else {
    badge.textContent = '● Sandbox Testing Aktif';
    badge.style.background = '#F4F5F7';
    badge.style.color = '#08090B';
    badge.style.border = '1px solid #D9DCE1';
  }
}

function savePaymentSettings() {
  const env       = document.getElementById('midtransEnv')?.value || 'sandbox';
  const clientKey = document.getElementById('midtransClientKey')?.value.trim() || '';
  const serverKey = document.getElementById('midtransServerKey')?.value.trim() || '';

  setLS('ms88_payment_settings', { env, clientKey, serverKey });
  updateMidtransBadge();
  toast('Konfigurasi Midtrans berhasil disimpan ✓');
}

function togglePaymentConfig() {
  const body = document.getElementById('paymentConfigBody');
  if (!body) return;
  body.style.display = (body.style.display === 'none') ? 'block' : 'none';
}

function toggleServerKeyVisibility() {
  const el = document.getElementById('midtransServerKey');
  if (!el) return;
  el.type = (el.type === 'password') ? 'text' : 'password';
}

async function testMidtransConnection() {
  const resultEl = document.getElementById('midtransTestResult');
  if (!resultEl) return;
  resultEl.textContent = 'Menguji sambungan API...';
  resultEl.style.color = '#6b7280';

  const clientKey = document.getElementById('midtransClientKey')?.value.trim();
  const serverKey = document.getElementById('midtransServerKey')?.value.trim();

  if (!clientKey && !serverKey) {
    resultEl.innerHTML = '<span style="color:#92400e;">ℹ Mode Demo aktif. Simulasi pembayaran QRIS berjalan normal tanpa kredensial Midtrans.</span>';
    return;
  }

  try {
    const resp = await fetch('/api/payment-status?order_id=MS88-20260916-000000');
    if (resp.status === 404 || resp.status === 200 || resp.status === 400) {
      resultEl.innerHTML = '<span style="color:#08090B;font-weight:600;">✓ Endpoint API Gateway terhubung & responsif.</span>';
    } else {
      resultEl.innerHTML = `<span style="color:#8C680E;">Respons server: HTTP ${resp.status}</span>`;
    }
  } catch(err) {
    resultEl.innerHTML = '<span style="color:#D71926;">⚠ Endpoint API belum aktif di server lokal. Mode offline/demo tetap berjalan.</span>';
  }
}

function initDefaultOrdersIfEmpty() {
  const existing = getLS('ms88_orders', null);
  if (existing && Array.isArray(existing) && existing.length > 0) return;
  const jsonPath = window.location.pathname.includes('/superadmin') ? '../assets/data/bookings_september_2026.json' : 'assets/data/bookings_september_2026.json';
  fetch(jsonPath)
    .then(r => {
      if (!r.ok) return fetch('/assets/data/bookings_september_2026.json');
      return r;
    })
    .then(r => {
      if (!r || !r.ok) throw new Error('Data jadwal tidak dapat diakses');
      return r.json();
    })
    .then(data => {
      if (!data || typeof data !== 'object') return;
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
        if (!Array.isArray(data[week])) return;
        data[week].forEach(item => {
          const hourKey = (item.time || '').slice(0, 2);
          const price = pricingMap[hourKey] || 250000;
          orders.push({
            id: 'BKG-2609' + String(counter++).padStart(3, '0'),
            name: item.team || 'Tim Komunitas',
            phone: '08' + (8120000000 + counter * 7919).toString().slice(0, 10),
            court: 'Lapangan Utama (30×50m Pusdikif)',
            date: '2026-09-' + String(item.date).padStart(2, '0'),
            time: item.time || '18.00-20.00',
            total: price,
            status: 'confirmed'
          });
        });
      });
      if (orders.length > 0) {
        setLS('ms88_orders', orders);
        renderOrders();
        renderOverview();
      }
    })
    .catch(err => {
      console.warn('[initDefaultOrdersIfEmpty] Data initialization note:', err.message);
    });
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

  // Load Geo Popup auto-display setting (Default: '0' / OFF)
  const geoVal = localStorage.getItem('ms88_geo_popup_enabled') || '0';
  if (el('setGeoAutoPopup')) {
    el('setGeoAutoPopup').value = geoVal;
  }
  updateGeoPopupBadge();
}

function updateGeoPopupBadge() {
  const select = document.getElementById('setGeoAutoPopup');
  const badge = document.getElementById('geoPopupStatusBadge');
  if (!select || !badge) return;
  const isEnabled = select.value === '1';
  if (isEnabled) {
    badge.textContent = 'Status: Aktif (ON)';
    badge.style.background = 'rgba(217, 162, 27, 0.15)';
    badge.style.color = '#8C680E';
    badge.style.border = '1px solid #D9A21B';
  } else {
    badge.textContent = 'Status: Nonaktif (OFF - Default)';
    badge.style.background = '#F4F5F7';
    badge.style.color = '#5A606A';
    badge.style.border = '1px solid #D9DCE1';
  }
}

function saveGeoSetting() {
  const select = document.getElementById('setGeoAutoPopup');
  if (!select) return;
  const val = select.value;
  localStorage.setItem('ms88_geo_popup_enabled', val);
  updateGeoPopupBadge();
  toast('Opsi popup lokasi berhasil disimpan: ' + (val === '1' ? 'Aktif (ON)' : 'Nonaktif (OFF - Default)') + ' ✓');
}

function previewGeoModal() {
  if (window.GeoMS88 && typeof window.GeoMS88.showModal === 'function') {
    window.GeoMS88.showModal();
  } else {
    alert('Pengaturan Popup Izin Lokasi saat ini: ' + (localStorage.getItem('ms88_geo_popup_enabled') === '1' ? 'AKTIF (ON)' : 'NONAKTIF (OFF - Default)') + '\n\nBuka halaman utama (Beranda) untuk melihat pengalaman pengunjung.');
  }
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

  // Also save geo setting if element exists
  const geoSelect = document.getElementById('setGeoAutoPopup');
  if (geoSelect) {
    localStorage.setItem('ms88_geo_popup_enabled', geoSelect.value);
    updateGeoPopupBadge();
  }
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

// =========================================================
//  USER MANAGEMENT MODULE
// =========================================================

const USER_LEVEL_THRESHOLDS = { Bronze: 0, Silver: 6, Gold: 16, VIP: 31 };
const USER_LEVEL_BADGES = {
  Bronze: { emoji: '🥉', color: '#92400e', bg: '#fef3c7' },
  Silver: { emoji: '🥈', color: '#374151', bg: '#f3f4f6' },
  Gold:   { emoji: '🥇', color: '#78350f', bg: '#fde68a' },
  VIP:    { emoji: '⭐', color: '#5b21b6', bg: '#ede9fe' },
};

function computeLevel(bookingCount) {
  const n = parseInt(bookingCount) || 0;
  if (n >= 31) return 'VIP';
  if (n >= 16) return 'Gold';
  if (n >= 6)  return 'Silver';
  return 'Bronze';
}

function getUserStatusColor(status) {
  if (status === 'active')    return { color: '#15803d', bg: '#dcfce7' };
  if (status === 'suspended') return { color: '#b91c1c', bg: '#fee2e2' };
  return { color: '#6b7280', bg: '#f3f4f6' };
}

function getLS_users() {
  try {
    const raw = localStorage.getItem('ms88_users');
    if (raw) return JSON.parse(raw);
  } catch(_) {}
  // Seed sample members on first load
  const today = new Date();
  const fmt = d => d.toISOString().slice(0,10);
  const daysAgo = n => { const d = new Date(); d.setDate(d.getDate()-n); return fmt(d); };
  const samples = [
    { id:'USR-001', name:'Rifqi Pratama',  phone:'081234567890', email:'rifqi@mail.com',  team:'Tim Garuda',    level:'Gold',   bookings:18, status:'active',    joinDate: daysAgo(90),  notes:'' },
    { id:'USR-002', name:'Coach Dani',     phone:'082198765432', email:'dani@coach.id',   team:'Akademi 88',    level:'VIP',    bookings:45, status:'active',    joinDate: daysAgo(180), notes:'Pelatih resmi' },
    { id:'USR-003', name:'Kapten Dimas',   phone:'085312345678', email:'',                team:'Spartan FC',    level:'Silver', bookings:9,  status:'active',    joinDate: daysAgo(60),  notes:'' },
    { id:'USR-004', name:'Budi Santoso',   phone:'087812345678', email:'budi@gmail.com',  team:'',              level:'Bronze', bookings:3,  status:'active',    joinDate: daysAgo(20),  notes:'' },
    { id:'USR-005', name:'Ade Saputra',    phone:'089623456789', email:'',                team:'Komunitas Pagi',level:'Silver', bookings:12, status:'inactive',  joinDate: daysAgo(120), notes:'' },
    { id:'USR-006', name:'Yoga Pratama',   phone:'081387654321', email:'yoga@mail.com',   team:'Yoga Warriors', level:'Gold',   bookings:22, status:'active',    joinDate: daysAgo(150), notes:'' },
    { id:'USR-007', name:'Rendi Kusuma',   phone:'087834567890', email:'',                team:'',              level:'Bronze', bookings:1,  status:'suspended', joinDate: daysAgo(10),  notes:'Pelanggaran aturan' },
  ];
  localStorage.setItem('ms88_users', JSON.stringify(samples));
  return samples;
}

function saveLS_users(users) {
  localStorage.setItem('ms88_users', JSON.stringify(users));
}

function renderUsers() {
  const users = getLS_users();
  const search   = (document.getElementById('filterUserSearch')  || {}).value || '';
  const levelF   = (document.getElementById('filterUserLevel')   || {}).value || '';
  const statusF  = (document.getElementById('filterUserStatus')  || {}).value || '';
  const body     = document.getElementById('usersBody');
  if (!body) return;

  // KPI
  const thisMonth = new Date().toISOString().slice(0,7);
  const active = users.filter(u => u.status === 'active').length;
  const vipGold = users.filter(u => u.level === 'VIP' || u.level === 'Gold').length;
  const newM    = users.filter(u => (u.joinDate||'').startsWith(thisMonth)).length;
  const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setTxt('kpiUserTotal',  users.length);
  setTxt('kpiUserVip',    vipGold);
  setTxt('kpiUserActive', active);
  setTxt('kpiUserNew',    newM);

  // Filter
  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchQ = !q || u.name.toLowerCase().includes(q) || (u.phone||'').includes(q) || (u.team||'').toLowerCase().includes(q);
    const matchL = !levelF  || u.level  === levelF;
    const matchS = !statusF || u.status === statusF;
    return matchQ && matchL && matchS;
  });

  if (filtered.length === 0) {
    body.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:24px;color:#888;">Tidak ada member ditemukan.</td></tr>';
    return;
  }

  body.innerHTML = filtered.map((u, i) => {
    const lvl = USER_LEVEL_BADGES[u.level] || USER_LEVEL_BADGES.Bronze;
    const st  = getUserStatusColor(u.status);
    const statusLabel = u.status === 'active' ? 'Aktif' : u.status === 'inactive' ? 'Nonaktif' : 'Ditangguhkan';
    return `
      <tr>
        <td><small style="color:#888;">${i+1}</small></td>
        <td>
          <strong>${u.name}</strong>
          ${u.team ? `<br><small style="color:#888;">${u.team}</small>` : ''}
        </td>
        <td>
          <a href="tel:${u.phone}" style="color:inherit;text-decoration:none;">${u.phone||'-'}</a>
          <button class="btn-icon" title="WA" onclick="window.open('https://wa.me/${(u.phone||'').replace(/^0/,'62')}','_blank')" style="margin-left:4px;">${ICON.wa}</button>
        </td>
        <td><small>${u.email||'—'}</small></td>
        <td>
          <span style="background:${lvl.bg};color:${lvl.color};font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:100px;white-space:nowrap;">
            ${lvl.emoji} ${u.level}
          </span>
        </td>
        <td style="text-align:center;font-weight:600;">${u.bookings||0}</td>
        <td><small>${u.joinDate||'—'}</small></td>
        <td>
          <span style="background:${st.bg};color:${st.color};font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:100px;">
            ${statusLabel}
          </span>
        </td>
        <td style="white-space:nowrap;">
          <button class="btn-icon" title="Edit" onclick="openUserModal('${u.id}')">${ICON.edit}</button>
          <button class="btn-icon btn-red" title="Hapus" onclick="deleteUser('${u.id}')">${ICON.trash}</button>
        </td>
      </tr>`;
  }).join('');
}

function openUserModal(userId) {
  const modal = document.getElementById('userModal');
  if (!modal) return;
  modal.style.display = 'flex';

  document.getElementById('userEditId').value   = userId || '';
  document.getElementById('uName').value        = '';
  document.getElementById('uPhone').value       = '';
  document.getElementById('uEmail').value       = '';
  document.getElementById('uTeam').value        = '';
  document.getElementById('uLevel').value       = 'Bronze';
  document.getElementById('uStatus').value      = 'active';
  document.getElementById('uBookings').value    = '0';
  document.getElementById('uJoinDate').value    = new Date().toISOString().slice(0,10);
  document.getElementById('uNotes').value       = '';
  document.getElementById('userModalTitle').textContent = userId ? 'Edit Data Member' : 'Tambah Member Baru';

  if (userId) {
    const users = getLS_users();
    const u = users.find(x => String(x.id) === String(userId));
    if (u) {
      document.getElementById('uName').value     = u.name     || '';
      document.getElementById('uPhone').value    = u.phone    || '';
      document.getElementById('uEmail').value    = u.email    || '';
      document.getElementById('uTeam').value     = u.team     || '';
      document.getElementById('uLevel').value    = u.level    || 'Bronze';
      document.getElementById('uStatus').value   = u.status   || 'active';
      document.getElementById('uBookings').value = u.bookings || 0;
      document.getElementById('uJoinDate').value = u.joinDate || '';
      document.getElementById('uNotes').value    = u.notes    || '';
    }
  }
}

function closeUserModal(e) {
  if (e && e.target !== document.getElementById('userModal')) return;
  const modal = document.getElementById('userModal');
  if (modal) modal.style.display = 'none';
}

// Override: allow direct close call without event
const _origCloseUser = closeUserModal;
window.closeUserModal = function(e) {
  if (!e || e.type !== 'click') {
    const modal = document.getElementById('userModal');
    if (modal) modal.style.display = 'none';
    return;
  }
  _origCloseUser(e);
};

function saveUser() {
  const name  = (document.getElementById('uName').value||'').trim();
  const phone = (document.getElementById('uPhone').value||'').trim();
  if (!name || !phone) { toast('Nama dan nomor telepon wajib diisi', 'error'); return; }

  const bookings = parseInt(document.getElementById('uBookings').value) || 0;
  // Auto-compute level based on booking count (can be overridden by admin)
  const chosenLevel = document.getElementById('uLevel').value;
  const autoLevel   = computeLevel(bookings);
  // Admin-set level takes priority; but if bookings changed significantly, auto-upgrade
  const finalLevel = bookings >= USER_LEVEL_THRESHOLDS[chosenLevel] ? chosenLevel : autoLevel;

  const users  = getLS_users();
  const editId = document.getElementById('userEditId').value;

  if (editId) {
    const idx = users.findIndex(x => String(x.id) === String(editId));
    if (idx !== -1) {
      users[idx] = {
        ...users[idx],
        name, phone,
        email:    document.getElementById('uEmail').value.trim(),
        team:     document.getElementById('uTeam').value.trim(),
        level:    finalLevel,
        status:   document.getElementById('uStatus').value,
        bookings,
        joinDate: document.getElementById('uJoinDate').value,
        notes:    document.getElementById('uNotes').value.trim(),
      };
      toast(`Member "${name}" berhasil diperbarui (Level: ${finalLevel})`, 'success');
    }
  } else {
    const newId = 'USR-' + Date.now().toString().slice(-6);
    users.push({
      id: newId, name, phone,
      email:    document.getElementById('uEmail').value.trim(),
      team:     document.getElementById('uTeam').value.trim(),
      level:    finalLevel,
      status:   document.getElementById('uStatus').value,
      bookings,
      joinDate: document.getElementById('uJoinDate').value || new Date().toISOString().slice(0,10),
      notes:    document.getElementById('uNotes').value.trim(),
      createdAt: new Date().toISOString(),
    });
    toast(`Member baru "${name}" ditambahkan (Level: ${finalLevel})`, 'success');
  }

  saveLS_users(users);
  window.closeUserModal();
  renderUsers();
}

function deleteUser(userId) {
  const users = getLS_users();
  const u = users.find(x => String(x.id) === String(userId));
  if (!u) return;
  if (!confirm(`Hapus member "${u.name}"? Aksi tidak dapat dibatalkan.`)) return;
  saveLS_users(users.filter(x => String(x.id) !== String(userId)));
  renderUsers();
  toast(`Member "${u.name}" telah dihapus`, 'warning');
}

function exportUsersToCSV() {
  const users = getLS_users();
  if (!users.length) { toast('Tidak ada data member untuk diekspor', 'error'); return; }
  const BOM = '\uFEFF';
  const headers = ['ID','Nama','Telepon','Email','Tim','Level','Total Booking','Tanggal Bergabung','Status','Catatan'];
  const rows = users.map(u => [
    u.id, u.name, u.phone||'', u.email||'', u.team||'',
    u.level, u.bookings||0, u.joinDate||'', u.status, u.notes||''
  ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
  const csv = BOM + [headers.join(','), ...rows].join('\r\n');
  const now = new Date();
  const ts  = now.getFullYear().toString() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0') + '_' + String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0');
  const a   = document.createElement('a');
  a.href    = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download= `Daftar_Member_MS88_${ts}.csv`;
  a.click();
  toast(`Ekspor ${users.length} member ke CSV berhasil`, 'success');
}

// =========================================================
//  ROLE MANAGEMENT MODULE
// =========================================================

const ROLE_CONFIG = {
  superadmin: {
    label: 'Superadmin', emoji: '👑',
    color: '#e9d5ff', bg: 'rgba(139,92,246,0.18)', border: 'rgba(139,92,246,0.4)',
    sidebarLabel: 'Super Administrator',
    allowedTabs: ['overview','slots','orders','payments','mabar','users','roles','blog','assets','pricing','contact','settings'],
  },
  admin: {
    label: 'Admin', emoji: '🛡️',
    color: '#bfdbfe', bg: 'rgba(59,130,246,0.18)', border: 'rgba(59,130,246,0.4)',
    sidebarLabel: 'Administrator',
    allowedTabs: ['overview','slots','orders','payments','mabar','users','blog','assets','pricing','contact'],
  },
  cashier: {
    label: 'Cashier', emoji: '🧾',
    color: '#bbf7d0', bg: 'rgba(34,197,94,0.18)', border: 'rgba(34,197,94,0.4)',
    sidebarLabel: 'Kasir / Operator',
    allowedTabs: ['overview','orders','payments'],
  },
};

const ROLE_HINTS = {
  superadmin: '👑 Superadmin — Akses PENUH termasuk hapus data, kelola role, dan semua pengaturan sistem. Berikan hanya kepada pemilik/manajer.',
  admin:      '🛡️ Admin — Akses operasional lengkap: booking, konten, member, tarif. Tidak bisa kelola role atau reset sistem.',
  cashier:    '🧾 Cashier — Hanya akses transaksi dan booking. Tidak bisa ubah konten, pengaturan, atau melihat tab lainnya.',
};

function getLS_staff() {
  try {
    const raw = localStorage.getItem('ms88_staff');
    if (raw) return JSON.parse(raw);
  } catch(_) {}
  // Seed default staff
  const today = new Date().toISOString().slice(0,10);
  const defaults = [
    {
      id: 'STF-001', name: 'Super Administrator', username: 'admin',
      passwordHash: btoa('admin88alpha'), // base64 simple hash (not production-safe)
      role: 'superadmin', phone: '081295679799', status: 'active',
      lastLogin: new Date().toISOString(), createdBy: 'System', notes: 'Akun utama sistem', joinDate: '2026-01-01',
    },
    {
      id: 'STF-002', name: 'Bima Operator', username: 'bima_admin',
      passwordHash: btoa('bima2026'),
      role: 'admin', phone: '082211223344', status: 'active',
      lastLogin: '', createdBy: 'admin', notes: 'Admin shift pagi', joinDate: today,
    },
    {
      id: 'STF-003', name: 'Kasir Sore', username: 'kasir1',
      passwordHash: btoa('kasir2026'),
      role: 'cashier', phone: '087812345678', status: 'active',
      lastLogin: '', createdBy: 'admin', notes: 'Shift sore 15:00–22:00', joinDate: today,
    },
  ];
  localStorage.setItem('ms88_staff', JSON.stringify(defaults));
  return defaults;
}

function saveLS_staff(staff) {
  localStorage.setItem('ms88_staff', JSON.stringify(staff));
}

function renderStaff() {
  const staff   = getLS_staff();
  const search  = (document.getElementById('filterStaffSearch') || {}).value || '';
  const roleF   = (document.getElementById('filterStaffRole')   || {}).value || '';
  const body    = document.getElementById('staffBody');
  if (!body) return;

  const filtered = staff.filter(s => {
    const q = search.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || (s.username||'').toLowerCase().includes(q);
    const matchR = !roleF || s.role === roleF;
    return matchQ && matchR;
  });

  if (filtered.length === 0) {
    body.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:24px;color:#888;">Tidak ada staff ditemukan.</td></tr>';
    return;
  }

  const loggedUser = sessionStorage.getItem('ms88_admin_user') || 'admin';

  body.innerHTML = filtered.map((s, i) => {
    const rc = ROLE_CONFIG[s.role] || ROLE_CONFIG.cashier;
    const stColor = s.status === 'active' ? { c:'#15803d', bg:'#dcfce7' } : { c:'#6b7280', bg:'#f3f4f6' };
    const lastLogin = s.lastLogin ? new Date(s.lastLogin).toLocaleDateString('id-ID', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';
    const isSelf = (s.username === loggedUser);
    const isOnlySuperadmin = s.role === 'superadmin' && staff.filter(x => x.role === 'superadmin').length === 1;
    const canDelete = !isSelf && !isOnlySuperadmin;
    return `
      <tr${isSelf ? ' style="background:rgba(215,25,38,0.05);"' : ''}>
        <td><small style="color:#888;">${i+1}</small></td>
        <td>
          <strong>${s.name}</strong>${isSelf ? ' <span style="font-size:10px;background:#D71926;color:#fff;padding:1px 6px;border-radius:100px;font-weight:700;">Anda</span>' : ''}
          ${s.notes ? `<br><small style="color:#888;">${s.notes}</small>` : ''}
        </td>
        <td><code style="font-size:12.5px;color:#e2e8f0;">${s.username}</code></td>
        <td>
          <span style="background:${rc.bg};color:${rc.color};border:1px solid ${rc.border};font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:100px;white-space:nowrap;">
            ${rc.emoji} ${rc.label}
          </span>
        </td>
        <td>
          <span style="background:${stColor.bg};color:${stColor.c};font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:100px;">
            ${s.status === 'active' ? 'Aktif' : 'Nonaktif'}
          </span>
        </td>
        <td><small>${lastLogin}</small></td>
        <td><small>${s.createdBy||'—'}</small></td>
        <td style="white-space:nowrap;">
          <button class="btn-icon" title="Edit" onclick="openStaffModal('${s.id}')">${ICON.edit}</button>
          ${canDelete ? `<button class="btn-icon btn-red" title="Hapus" onclick="deleteStaff('${s.id}')">${ICON.trash}</button>` : `<button class="btn-icon" style="opacity:0.3;cursor:not-allowed;" title="Tidak bisa dihapus" disabled>${ICON.trash}</button>`}
        </td>
      </tr>`;
  }).join('');

  // Update sidebar role badge
  updateSidebarRoleBadge();
}

function openStaffModal(staffId) {
  const modal = document.getElementById('staffModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('staffEditId').value  = staffId || '';
  document.getElementById('sName').value        = '';
  document.getElementById('sUsername').value    = '';
  document.getElementById('sPassword').value    = '';
  document.getElementById('sRole').value        = 'cashier';
  document.getElementById('sPhone').value       = '';
  document.getElementById('sStatus').value      = 'active';
  document.getElementById('sNotes').value       = '';
  document.getElementById('staffModalTitle').textContent = staffId ? 'Edit Data Staff' : 'Tambah Staff Baru';
  updateRoleHint();

  if (staffId) {
    const staff = getLS_staff();
    const s = staff.find(x => String(x.id) === String(staffId));
    if (s) {
      document.getElementById('sName').value     = s.name     || '';
      document.getElementById('sUsername').value = s.username || '';
      document.getElementById('sRole').value     = s.role     || 'cashier';
      document.getElementById('sPhone').value    = s.phone    || '';
      document.getElementById('sStatus').value   = s.status   || 'active';
      document.getElementById('sNotes').value    = s.notes    || '';
      document.getElementById('sPassword').placeholder = '(kosongkan jika tidak diganti)';
      updateRoleHint();
    }
  }
}

function closeStaffModal(e) {
  if (e && e.target !== document.getElementById('staffModal')) return;
  const modal = document.getElementById('staffModal');
  if (modal) modal.style.display = 'none';
}
window.closeStaffModal = function(e) {
  if (!e || e.type !== 'click') {
    const modal = document.getElementById('staffModal');
    if (modal) modal.style.display = 'none';
    return;
  }
  // only close if clicking the backdrop directly
  if (e.currentTarget === document.getElementById('staffModal')) closeStaffModal(e);
};

function updateRoleHint() {
  const role = (document.getElementById('sRole') || {}).value || 'cashier';
  const box  = document.getElementById('roleHintBox');
  if (!box) return;
  const hints = {
    superadmin: { text: ROLE_HINTS.superadmin, bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', color: '#c4b5fd' },
    admin:      { text: ROLE_HINTS.admin,      bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.35)',  color: '#93c5fd' },
    cashier:    { text: ROLE_HINTS.cashier,    bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.35)',   color: '#86efac' },
  };
  const h = hints[role] || hints.cashier;
  box.style.background = h.bg;
  box.style.border     = `1px solid ${h.border}`;
  box.style.color      = h.color;
  box.textContent      = h.text;
}

function saveStaff() {
  const name     = (document.getElementById('sName').value     || '').trim();
  const username = (document.getElementById('sUsername').value || '').trim().toLowerCase().replace(/\s+/g,'_');
  const password = (document.getElementById('sPassword').value || '').trim();
  const role     = document.getElementById('sRole').value;
  const editId   = document.getElementById('staffEditId').value;

  if (!name || !username) { toast('Nama dan username wajib diisi', 'error'); return; }
  if (!editId && !password) { toast('Password wajib diisi untuk staff baru', 'error'); return; }
  if (password && password.length < 6) { toast('Password minimal 6 karakter', 'error'); return; }

  const staff = getLS_staff();

  // Duplicate username check
  const duplicate = staff.find(s => s.username === username && String(s.id) !== String(editId));
  if (duplicate) { toast(`Username "${username}" sudah digunakan oleh ${duplicate.name}`, 'error'); return; }

  const loggedUser = sessionStorage.getItem('ms88_admin_user') || 'admin';

  if (editId) {
    const idx = staff.findIndex(s => String(s.id) === String(editId));
    if (idx !== -1) {
      staff[idx] = {
        ...staff[idx],
        name, username, role,
        phone:  document.getElementById('sPhone').value.trim(),
        status: document.getElementById('sStatus').value,
        notes:  document.getElementById('sNotes').value.trim(),
        updatedAt: new Date().toISOString(),
        ...(password ? { passwordHash: btoa(password) } : {}),
      };
      toast(`Staff "${name}" berhasil diperbarui (Role: ${ROLE_CONFIG[role]?.label})`, 'success');
    }
  } else {
    staff.push({
      id: 'STF-' + Date.now().toString().slice(-6),
      name, username, role,
      passwordHash: btoa(password),
      phone:    document.getElementById('sPhone').value.trim(),
      status:   document.getElementById('sStatus').value,
      notes:    document.getElementById('sNotes').value.trim(),
      lastLogin: '',
      createdBy: loggedUser,
      joinDate:  new Date().toISOString().slice(0,10),
      createdAt: new Date().toISOString(),
    });
    toast(`Staff baru "${name}" ditambahkan sebagai ${ROLE_CONFIG[role]?.label}`, 'success');
  }

  saveLS_staff(staff);
  window.closeStaffModal();
  renderStaff();
}

function deleteStaff(staffId) {
  const staff = getLS_staff();
  const s = staff.find(x => String(x.id) === String(staffId));
  if (!s) return;

  // Safety: can't delete the only superadmin
  if (s.role === 'superadmin' && staff.filter(x => x.role === 'superadmin').length <= 1) {
    toast('Tidak bisa menghapus satu-satunya Superadmin!', 'error'); return;
  }
  // Can't delete self
  const loggedUser = sessionStorage.getItem('ms88_admin_user') || 'admin';
  if (s.username === loggedUser) {
    toast('Tidak bisa menghapus akun yang sedang digunakan!', 'error'); return;
  }
  if (!confirm(`Hapus staff "${s.name}" (${ROLE_CONFIG[s.role]?.label})?\n\nAksi tidak dapat dibatalkan.`)) return;
  saveLS_staff(staff.filter(x => String(x.id) !== String(staffId)));
  renderStaff();
  toast(`Staff "${s.name}" telah dihapus`, 'warning');
}

function updateSidebarRoleBadge() {
  const loggedUser = sessionStorage.getItem('ms88_admin_user') || 'admin';
  const staff      = getLS_staff();
  const me         = staff.find(s => s.username === loggedUser);
  const role       = me ? (me.role || 'superadmin') : 'superadmin';
  const rc         = ROLE_CONFIG[role] || ROLE_CONFIG.superadmin;

  const roleEl = document.getElementById('userRoleDisplay');
  if (roleEl) {
    roleEl.innerHTML = `<span style="display:inline-flex;align-items:center;gap:5px;">${rc.emoji} <span style="background:${rc.bg};color:${rc.color};border:1px solid ${rc.border};font-size:10px;font-weight:700;padding:1px 7px;border-radius:100px;letter-spacing:0.04em;">${rc.label}</span></span>`;
  }
}

/**
 * applyRoleRestrictions — hide nav buttons not allowed for the logged-in role.
 * Superadmin sees everything; Admin hides roles/settings; Cashier sees only overview/orders/payments.
 */
function applyRoleRestrictions() {
  const loggedUser = sessionStorage.getItem('ms88_admin_user') || 'admin';
  const staff      = getLS_staff();
  const me         = staff.find(s => s.username === loggedUser);
  const role       = me ? (me.role || 'superadmin') : 'superadmin';
  const allowed    = new Set(ROLE_CONFIG[role]?.allowedTabs || ROLE_CONFIG.superadmin.allowedTabs);

  const allTabs = ['overview','slots','orders','payments','mabar','users','roles','blog','assets','pricing','contact','settings'];
  allTabs.forEach(tab => {
    const btn = document.getElementById('tabBtn' + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (!btn) return;
    if (!allowed.has(tab)) {
      btn.style.display    = 'none';
      btn.style.pointerEvents = 'none';
    } else {
      btn.style.display    = '';
      btn.style.pointerEvents = '';
    }
  });

  // If current tab is restricted, redirect to overview
  if (!allowed.has(currentTab)) {
    switchTab('overview');
    toast(`Role ${ROLE_CONFIG[role]?.label} tidak memiliki akses ke tab ini`, 'warning');
  }

  updateSidebarRoleBadge();
}
