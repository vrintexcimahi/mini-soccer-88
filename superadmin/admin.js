/* ==========================================================================
   SUPERADMIN PORTAL APPLICATION LOGIC
   Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi
   Full Venue Management, Slot Locking/Unlocking, Live Storage Sync
   ========================================================================== */

const defaultOrders = [
  {
    id: "MS88-20260915-01",
    name: "Kapten Dimas",
    phone: "081234567890",
    team: "Pusdikif Young Boys",
    field: "Lapangan 1 (FIFA Synth)",
    date: "Hari Ini, 15 Sep",
    time: "16:00 - 18:00",
    addons: ["Wasit Resmi PSSI"],
    total: 550000,
    status: "paid",
    timestamp: "15 Sep 2026, 14:15"
  },
  {
    id: "MS88-20260915-02",
    name: "Rifqi Pratama",
    phone: "085712349999",
    team: "Barudak Cimahi FC",
    field: "Lapangan 1 (FIFA Synth)",
    date: "Hari Ini, 15 Sep",
    time: "18:00 - 20:00",
    addons: ["Sewa 2 Set Rompi"],
    total: 535000,
    status: "paid",
    timestamp: "15 Sep 2026, 11:30"
  },
  {
    id: "MS88-20260916-03",
    name: "Coach Dani",
    phone: "081399887766",
    team: "Garuda Muda Academy",
    field: "Lapangan 2 (Alpha Pro Turf)",
    date: "Besok, 16 Sep",
    time: "20:00 - 22:00",
    addons: ["Fotografer Match"],
    total: 650000,
    status: "pending",
    timestamp: "15 Sep 2026, 15:10"
  }
];

const defaultMabar = [
  {
    id: "mabar-1",
    title: "Mabar Seru Pekan Ini (7 vs 7)",
    time: "Rabu Malam, 19:00 - 21:00 WIB",
    field: "Lapangan 1 (Pusdikif Cimahi)",
    host: "Coach Dani (MS88 Academy)",
    quota: 14,
    filled: 11,
    price: 45000,
    type: "MAIN BARENG",
    level: "Level: Fun Game / All Level"
  },
  {
    id: "mabar-2",
    title: "Sparring: Pusdikif FC vs Open Team",
    time: "Jumat Sore, 16:00 - 18:00 WIB",
    field: "Lapangan 1 (FIFA Synthetic)",
    host: "Pusdikif All Stars",
    quota: 2,
    filled: 1,
    price: 225000,
    type: "OPEN SPARRING",
    level: "Level: Intermediate / Competitive"
  },
  {
    id: "mabar-3",
    title: "Minggu Sehat MS88 Community",
    time: "Minggu Pagi, 07:00 - 09:00 WIB",
    field: "Lapangan 2 (Alpha Pro Turf)",
    host: "Komunitas Bola Cimahi",
    quota: 14,
    filled: 8,
    price: 40000,
    type: "MAIN BARENG",
    level: "Level: Sunday Morning Football"
  }
];

// Admin State
const adminState = {
  currentTab: 'overview',
  selectedField: 1,
  orders: JSON.parse(localStorage.getItem('ms88_orders') || 'null') || defaultOrders,
  blockedSlots: JSON.parse(localStorage.getItem('ms88_blocked_slots') || '[]'),
  mabarSessions: JSON.parse(localStorage.getItem('ms88_mabar_sessions') || 'null') || defaultMabar
};

const allSlots = [
  '06:00 - 08:00',
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
  '18:00 - 20:00',
  '20:00 - 22:00',
  '22:00 - 24:00'
];

document.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('ms88_orders', JSON.stringify(adminState.orders));
  localStorage.setItem('ms88_blocked_slots', JSON.stringify(adminState.blockedSlots));
  localStorage.setItem('ms88_mabar_sessions', JSON.stringify(adminState.mabarSessions));

  renderKPIs();
  renderRecentOrders();
  renderAllOrders();
  renderSlotMatrix();
  renderMabarTable();

  showToast('Superadmin Aktif', 'Selamat datang di Portal Pengelola Venue MS88.', 'success');
});

// Toast Helper
function showToast(title, desc, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${desc}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:#8E959D;">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Tab Switcher
function switchTab(tabId) {
  adminState.currentTab = tabId;
  const tabs = ['overview', 'slots', 'orders', 'mabar', 'pricing', 'settings'];

  tabs.forEach(t => {
    const btn = document.getElementById(`tabBtn${capitalize(t)}`);
    const section = document.getElementById(`section${capitalize(t)}`);
    if (btn) btn.classList.toggle('active', t === tabId);
    if (section) section.style.display = t === tabId ? 'block' : 'none';
  });

  const heading = document.getElementById('currentTabHeading');
  if (heading) {
    if (tabId === 'overview') heading.textContent = 'Dashboard Ringkasan & Omset Venue';
    if (tabId === 'slots') heading.textContent = 'Kelola Slot Lapangan (Kunci / Buka)';
    if (tabId === 'orders') heading.textContent = 'Manajemen Reservasi & Pesanan Masuk';
    if (tabId === 'mabar') heading.textContent = 'Sesi Komunitas Main Bareng & Sparring';
    if (tabId === 'pricing') heading.textContent = 'Pengaturan Tarif Sewa Lapangan';
    if (tabId === 'settings') heading.textContent = 'Pengaturan Profil & Rekening Venue';
  }

  if (tabId === 'slots') renderSlotMatrix();
  if (tabId === 'orders') renderAllOrders();
  if (tabId === 'mabar') renderMabarTable();
  if (tabId === 'overview') {
    renderKPIs();
    renderRecentOrders();
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Render KPIs
function renderKPIs() {
  const totalPaid = adminState.orders.filter(o => o.status === 'paid').reduce((acc, cur) => acc + cur.total, 0);
  const pendingCount = adminState.orders.filter(o => o.status === 'pending').length;

  const kpiRev = document.getElementById('kpiRevenue');
  const kpiPending = document.getElementById('kpiPendingCount');

  if (kpiRev) kpiRev.textContent = formatRupiah(totalPaid + 24850000);
  if (kpiPending) kpiPending.textContent = `${pendingCount} Pesanan`;
}

// Render Recent Orders
function renderRecentOrders() {
  const tbody = document.getElementById('tableRecentOrders');
  if (!tbody) return;
  tbody.innerHTML = '';

  adminState.orders.slice(0, 5).forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${order.id}</strong></td>
      <td><strong>${order.name}</strong><br><small style="color:var(--text-muted);">${order.team}</small></td>
      <td><a href="https://wa.me/${order.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color:var(--blue);">${order.phone}</a></td>
      <td>${order.field}<br><small>${order.date} (${order.time})</small></td>
      <td><strong>${formatRupiah(order.total)}</strong></td>
      <td><span class="badge-status ${order.status}">${order.status}</span></td>
      <td>
        ${order.status === 'pending' ? `<button class="btn-table-action pay" onclick="setOrderStatus('${order.id}', 'paid')">Set Lunas</button>` : ''}
        <button class="btn-table-action wa" onclick="sendWhatsAppNotice('${order.id}')">Kirim WA</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Render All Orders
function renderAllOrders(filterText = '') {
  const tbody = document.getElementById('tableAllOrders');
  if (!tbody) return;
  tbody.innerHTML = '';

  let list = adminState.orders;
  if (filterText) {
    const q = filterText.toLowerCase();
    list = list.filter(o => o.name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.team.toLowerCase().includes(q));
  }

  list.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${order.id}</strong></td>
      <td><strong>${order.name}</strong></td>
      <td>${order.team}</td>
      <td><a href="https://wa.me/${order.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color:var(--blue); font-weight:600;">${order.phone}</a></td>
      <td>${order.field}<br><small>${order.date} · ${order.time}</small></td>
      <td>${order.addons.length > 0 ? order.addons.join(', ') : '-'}</td>
      <td><strong>${formatRupiah(order.total)}</strong></td>
      <td><span class="badge-status ${order.status}">${order.status}</span></td>
      <td>
        ${order.status === 'pending' ? `<button class="btn-table-action pay" onclick="setOrderStatus('${order.id}', 'paid')">Set Lunas</button>` : ''}
        ${order.status !== 'cancelled' ? `<button class="btn-table-action cancel" onclick="setOrderStatus('${order.id}', 'cancelled')">Batalkan</button>` : ''}
        <button class="btn-table-action wa" onclick="sendWhatsAppNotice('${order.id}')">WA 💬</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterOrders() {
  const val = document.getElementById('orderSearchInput')?.value || '';
  renderAllOrders(val);
}

function setOrderStatus(orderId, status) {
  const order = adminState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem('ms88_orders', JSON.stringify(adminState.orders));
    renderKPIs();
    renderRecentOrders();
    renderAllOrders();
    showToast('Status Pesanan Diperbarui', `Order #${orderId} kini berstatus ${status.toUpperCase()}.`, 'success');
  }
}

function sendWhatsAppNotice(orderId) {
  const order = adminState.orders.find(o => o.id === orderId);
  if (!order) return;

  const msg = `*KONFIRMASI DARI MINI SOCCER 88 PUSDIKIF CIMAHI*\nHalo Kak ${order.name},\nPesanan #${order.id} untuk ${order.field} (${order.date} ${order.time}) telah diverifikasi dengan status: *${order.status.toUpperCase()}*.\nTotal: ${formatRupiah(order.total)}.\nSampai bertemu di lapangan!`;

  window.open(`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
}

// Field Selector in Slots Tab
function selectField(fNum) {
  adminState.selectedField = fNum;
  document.getElementById('btnField1')?.classList.toggle('pay', fNum === 1);
  document.getElementById('btnField2')?.classList.toggle('pay', fNum === 2);
  renderSlotMatrix();
}

// Render Slot Matrix
function renderSlotMatrix() {
  const container = document.getElementById('slotMatrixContainer');
  if (!container) return;
  container.innerHTML = '';

  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  allSlots.forEach(time => {
    const slotId = `${dateKey}_F${adminState.selectedField}_${time.replace(/[: ]/g, '')}`;
    const isBlocked = adminState.blockedSlots.includes(slotId);

    const box = document.createElement('div');
    box.className = `slot-box ${isBlocked ? 'blocked' : ''}`;
    box.innerHTML = `
      <div class="slot-box-header">
        <span class="slot-box-time">${time}</span>
        <span class="badge-status ${isBlocked ? 'cancelled' : 'paid'}">${isBlocked ? 'Terkunci' : 'Tersedia'}</span>
      </div>
      <p style="font-size: 12px; color: var(--text-muted); margin: 4px 0;">
        ${isBlocked ? 'Slot ditutup untuk pemeliharaan/offline.' : 'Dapat dibooking oleh pemain publik.'}
      </p>
      <button class="btn-slot-lock ${isBlocked ? 'unlock' : 'lock'}" onclick="toggleLock('${slotId}', '${time}')">
        ${isBlocked ? '🔓 Buka Slot Kembali' : '🔒 Kunci / Blokir Slot'}
      </button>
    `;
    container.appendChild(box);
  });
}

function toggleLock(slotId, time) {
  if (adminState.blockedSlots.includes(slotId)) {
    adminState.blockedSlots = adminState.blockedSlots.filter(id => id !== slotId);
    showToast('Slot Dibuka', `Slot ${time} kini aktif dibuka untuk publik.`, 'success');
  } else {
    adminState.blockedSlots.push(slotId);
    showToast('Slot Dikunci', `Slot ${time} berhasil dikunci dan ditutup di website publik.`, 'warning');
  }

  localStorage.setItem('ms88_blocked_slots', JSON.stringify(adminState.blockedSlots));
  renderSlotMatrix();
}

// Render Mabar Table
function renderMabarTable() {
  const tbody = document.getElementById('tableMabarList');
  if (!tbody) return;
  tbody.innerHTML = '';

  adminState.mabarSessions.forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${s.title}</strong></td>
      <td>${s.time}</td>
      <td>${s.field}</td>
      <td><span class="badge-status paid">${s.type}</span></td>
      <td>${s.filled} / ${s.quota} Pemain</td>
      <td><strong>${formatRupiah(s.price)}</strong></td>
      <td>
        <button class="btn-table-action cancel" onclick="deleteMabarSession('${s.id}')">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleCreateMabar() {
  const title = document.getElementById('mabarTitle')?.value.trim();
  const time = document.getElementById('mabarTime')?.value.trim();
  const field = document.getElementById('mabarField')?.value;
  const type = document.getElementById('mabarType')?.value;
  const level = document.getElementById('mabarLevel')?.value.trim() || 'Level: All Level';
  const quota = parseInt(document.getElementById('mabarQuota')?.value || '14', 10);
  const price = parseInt(document.getElementById('mabarPrice')?.value || '45000', 10);

  if (!title || !time) return;

  const newS = {
    id: `mabar-${Date.now()}`,
    title,
    time,
    field,
    host: "Superadmin MS88",
    quota,
    filled: 1,
    price,
    type,
    level
  };

  adminState.mabarSessions.unshift(newS);
  localStorage.setItem('ms88_mabar_sessions', JSON.stringify(adminState.mabarSessions));
  renderMabarTable();
  showToast('Sesi Berhasil Diterbitkan!', `"${title}" sudah live di website utama.`, 'success');

  // Reset form
  document.getElementById('mabarTitle').value = '';
  document.getElementById('mabarTime').value = '';
}

function deleteMabarSession(id) {
  adminState.mabarSessions = adminState.mabarSessions.filter(s => s.id !== id);
  localStorage.setItem('ms88_mabar_sessions', JSON.stringify(adminState.mabarSessions));
  renderMabarTable();
  showToast('Sesi Dihapus', 'Sesi telah dihapus dari daftar publik.', 'info');
}

// Simulate New Booking Order
function simulateNewOrder() {
  const dummyNames = ['Hendra Wijaya', 'Bambang Pamungkas', 'Rian Hidayat', 'Fajar Maulana', 'Asep Saepudin'];
  const dummyTeams = ['Pusdikif FC', 'Cimahi Old Stars', 'Bandung United', 'Garuda Muda 88'];
  const name = dummyNames[Math.floor(Math.random() * dummyNames.length)];
  const team = dummyTeams[Math.floor(Math.random() * dummyTeams.length)];
  const time = allSlots[Math.floor(Math.random() * allSlots.length)];

  const newOrder = {
    id: `MS88-${Date.now().toString().slice(-6)}`,
    name,
    phone: "08129988" + Math.floor(1000 + Math.random() * 9000),
    team,
    field: "Lapangan 1 (FIFA Synth)",
    date: "Hari Ini, 15 Sep",
    time,
    addons: ["Wasit Resmi PSSI"],
    total: 550000,
    status: "pending",
    timestamp: "Baru Saja"
  };

  adminState.orders.unshift(newOrder);
  localStorage.setItem('ms88_orders', JSON.stringify(adminState.orders));
  renderKPIs();
  renderRecentOrders();
  renderAllOrders();
  showToast('Booking Baru Masuk!', `Pesanan baru dari ${name} (${team}) sebesar Rp 550.000.`, 'info');
}

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}
