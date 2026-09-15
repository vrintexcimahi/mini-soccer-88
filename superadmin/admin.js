// =========================================================
//  Mini Soccer 88 Alpha Sport — Superadmin Portal JS
// =========================================================

// --- State ---
let currentTab = 'overview';

// Default asset definitions
const DEFAULT_ASSETS = [
  { key: 'hero_desktop', label: 'Hero Background (Desktop)', def: '../assets/img/ayoindonesia-padel-1.jpg' },
  { key: 'hero_mobile',  label: 'Hero Background (Mobile)',  def: '../assets/img/ayoindonesia-padel-mobile-1.jpg' },
  { key: 'logo',         label: 'Logo Utama (SVG)',          def: '../assets/logo/new-new-logo.svg' },
  { key: 'favicon',      label: 'Favicon',                   def: '../assets/logos/new-Favicon.png' },
  { key: 'banner_cta',   label: 'Banner CTA (baner.png)',    def: '../assets/banner/baner.png' },
  { key: 'banner_1_desktop', label: 'Slider Banner 1 Desktop', def: '../assets/banner/1-desktop.png' },
  { key: 'banner_2_desktop', label: 'Slider Banner 2 Desktop', def: '../assets/banner/2-desktop.png' },
  { key: 'phone_mockup1',label: 'Phone Mockup 1 (hp-ayo)',   def: '../assets/img/hp-ayo.png' },
  { key: 'phone_mockup2',label: 'Phone Mockup 2 (hp-ayo2)',  def: '../assets/img/hp-ayo2.png' },
  { key: 'venue_prev',   label: 'Venue Preview',             def: '../assets/img/venue-preview.webp' },
  { key: 'kompetisi1',   label: 'Kompetisi Card 1',          def: '../assets/dummy/new_kompetisi_home1.png' },
  { key: 'kompetisi2',   label: 'Kompetisi Card 2',          def: '../assets/dummy/new_kompetisi_home2.png' },
  { key: 'kompetisi3',   label: 'Kompetisi Card 3',          def: '../assets/dummy/new_kompetisi_home3.png' },
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
  location.replace('./login.html');
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
  const omset  = todayOrders.filter(o => o.status === 'confirmed').reduce((s, o) => s + (o.total || 0), 0);
  const pending = orders.filter(o => o.status === 'pending').length;
  const done   = orders.filter(o => o.status === 'confirmed').length;

  const settings = getLS('ms88_settings', { numCourts: 6, openTime: '07:00', closeTime: '23:00', slotDuration: 60 });
  const slots  = getLS('ms88_blocked_slots', []);
  const totalSlots = settings.numCourts * 8;
  const bookedSlots = slots.filter(s => s.date === today).length;
  const occupancy = totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;

  document.getElementById('kpiOmset').textContent = fmtRp(omset);
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
          <div class="activity-dot ${o.status === 'confirmed' ? 'dot-green' : o.status === 'cancelled' ? 'dot-red' : 'dot-orange'}"></div>
          <div class="activity-text">
            <strong>${o.name}</strong> — ${o.court} ${o.time}<br>
            <small>${o.date} · ${fmtRp(o.total)} · <span class="badge-status ${o.status}">${o.status}</span></small>
          </div>
        </div>
      `).join('');
    }
  }

  // Mini slot grid for today
  const miniGrid = document.getElementById('slotMiniGrid');
  if (miniGrid) {
    const hours = ['07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'];
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

  const settings  = getLS('ms88_settings', { numCourts: 6, openTime: '07:00', closeTime: '23:00', slotDuration: 60 });
  const blocked   = getLS('ms88_blocked_slots', []);
  const orders    = getLS('ms88_orders', []);
  const numCourts = settings.numCourts || 6;
  const hours     = ['07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'];

  const grid = document.getElementById('slotGrid');
  if (!grid) return;

  let html = '<div class="slot-header-row"><div class="slot-corner">Jam</div>';
  for (let c = 1; c <= numCourts; c++) html += `<div class="slot-col-head">Lapangan ${c}</div>`;
  html += '</div>';

  hours.forEach(h => {
    html += `<div class="slot-row"><div class="slot-time">${h}:00</div>`;
    for (let c = 1; c <= numCourts; c++) {
      const isBlocked = blocked.some(s => s.date === date && s.hour === h && s.court == c);
      const isBooked  = orders.some(o => o.date === date && o.time && o.time.startsWith(h) && o.court === `Lapangan ${c}` && o.status === 'confirmed');
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
  const settings = getLS('ms88_settings', { numCourts: 6 });
  const blocked = getLS('ms88_blocked_slots', []);
  const hours = ['07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'];
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
      <td>${o.court || '-'}</td>
      <td>${o.date || '-'}</td>
      <td>${o.time || '-'}</td>
      <td>${fmtRp(o.total || 0)}</td>
      <td><span class="badge-status ${o.status}">${o.status}</span></td>
      <td class="action-cell">
        ${o.status === 'pending' ? `<button class="btn-icon btn-green" onclick="confirmOrder(${o.id})" title="Konfirmasi">✓</button>` : ''}
        <button class="btn-icon btn-red" onclick="deleteOrder(${o.id})" title="Hapus">🗑</button>
      </td>
    </tr>
  `).join('');
}

function confirmOrder(id) {
  const orders = getLS('ms88_orders', []);
  const idx = orders.findIndex(o => o.id === id);
  if (idx >= 0) { orders[idx].status = 'confirmed'; setLS('ms88_orders', orders); }
  renderOrders(); renderOverview();
  toast('Booking dikonfirmasi ✓');
}

function deleteOrder(id) {
  if (!confirm('Hapus booking ini?')) return;
  const orders = getLS('ms88_orders', []).filter(o => o.id !== id);
  setLS('ms88_orders', orders);
  renderOrders(); renderOverview();
  toast('Booking dihapus', 'warning');
}

function addDummyOrder() {
  const orders = getLS('ms88_orders', []);
  const names  = ['Budi Santoso','Andi Kurniawan','Rizki Pratama','Deni Setiawan','Hendra Wijaya'];
  const courts = ['Lapangan 1','Lapangan 2','Lapangan 3','Lapangan 4'];
  const times  = ['08:00','10:00','13:00','15:00','19:00','20:00'];
  const newOrder = {
    id:    Date.now(),
    name:  names[Math.floor(Math.random() * names.length)],
    phone: '08' + Math.floor(Math.random() * 9e9),
    court: courts[Math.floor(Math.random() * courts.length)],
    date:  getTodayStr(),
    time:  times[Math.floor(Math.random() * times.length)],
    total: (Math.floor(Math.random() * 5) + 1) * 100000,
    status:'pending'
  };
  orders.push(newOrder);
  setLS('ms88_orders', orders);
  renderOrders(); renderOverview();
  toast('Booking baru ditambahkan');
}

// =========================================================
//  MABAR
// =========================================================
function renderMabar() {
  const sessions = getLS('ms88_mabar_sessions', []);
  const listEl = document.getElementById('mabarList');
  if (!listEl) return;
  if (sessions.length === 0) { listEl.innerHTML = '<p class="empty-state">Belum ada sesi mabar.</p>'; return; }

  listEl.innerHTML = sessions.map(s => `
    <div class="mabar-card">
      <div class="mabar-head">
        <strong>${s.name}</strong>
        <button class="btn-icon btn-red" onclick="deleteMabar(${s.id})">🗑</button>
      </div>
      <div class="mabar-meta">
        📅 ${new Date(s.datetime).toLocaleString('id-ID')}<br>
        👥 Slot: ${s.slots} · 💰 ${fmtRp(s.fee)}<br>
        ${s.desc ? `📝 ${s.desc}` : ''}
      </div>
    </div>
  `).join('');
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
  const sessions = getLS('ms88_mabar_sessions', []).filter(s => s.id !== id);
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
        <button class="btn-icon" onclick="editBlog(${b.id})">✏️</button>
        <button class="btn-icon btn-red" onclick="deleteBlog(${b.id})">🗑</button>
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
  const blog = getLS('ms88_blogs', []).find(b => b.id === id);
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
  setLS('ms88_blogs', getLS('ms88_blogs', []).filter(b => b.id !== id));
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
//  ASSETS
// =========================================================
function renderAssets() {
  const saved = getLS('ms88_assets', {});
  const grid = document.getElementById('assetsGrid');
  if (!grid) return;

  grid.innerHTML = DEFAULT_ASSETS.map(a => `
    <div class="asset-item">
      <div class="asset-preview">
        <img src="${saved[a.key] || a.def}" alt="${a.label}" onerror="this.style.display='none'">
      </div>
      <div class="asset-info">
        <label class="form-label">${a.label}</label>
        <input type="text" class="form-input asset-input" id="asset_${a.key}"
               value="${saved[a.key] || ''}" placeholder="${a.def}">
        <small style="color:#888;font-size:11px;">Default: ${a.def}</small>
      </div>
    </div>
  `).join('');
}

function saveAssets() {
  const saved = {};
  DEFAULT_ASSETS.forEach(a => {
    const val = document.getElementById('asset_' + a.key)?.value.trim();
    if (val) saved[a.key] = val;
  });
  setLS('ms88_assets', saved);
  renderAssets();
  toast('Aset disimpan ✓');
}

function resetAssets() {
  if (!confirm('Reset semua aset ke default?')) return;
  localStorage.removeItem('ms88_assets');
  renderAssets();
  toast('Aset direset ke default');
}

// =========================================================
//  CONTACT & SOSMED
// =========================================================
function renderContact() {
  const d = getLS('ms88_contact', {});
  const sm = getLS('ms88_sosmed', {});
  const st = getLS('ms88_pubstats', {});

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
  const pricing = getLS('ms88_pricing', []);
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
            <td><button class="btn-icon btn-red" onclick="deletePricing(${i})">🗑</button></td>
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
  const s = getLS('ms88_settings', { venueName:'Mini Soccer 88 Alpha Sport Pusdikif', numCourts:6, openTime:'07:00', closeTime:'23:00', slotDuration:60 });
  const el = id => document.getElementById(id);
  if (el('setVenueName')) el('setVenueName').value = s.venueName || '';
  if (el('setNumCourts')) el('setNumCourts').value = s.numCourts || 6;
  if (el('setOpenTime'))  el('setOpenTime').value  = s.openTime  || '07:00';
  if (el('setCloseTime')) el('setCloseTime').value = s.closeTime || '23:00';
  if (el('setSlotDuration')) el('setSlotDuration').value = s.slotDuration || 60;
}

function saveGeneral() {
  const s = {
    venueName:    document.getElementById('setVenueName')?.value.trim(),
    numCourts:    +document.getElementById('setNumCourts')?.value || 6,
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
  renderOverview(); renderOrders(); renderSlots(); renderMabar(); renderBlogs(); renderAssets(); renderPricing(); renderContact();
  toast('Semua data telah dihapus', 'warning');
}
