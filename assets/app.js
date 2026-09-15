/* ==========================================================================
   MINI SOCCER 88 ALPHA SPORT PUSDIKIF - CLIENT APPLICATION LOGIC
   Features: Interactive Schedule Grid, Real-time Cart Drawer, WhatsApp Checkout,
   Admin Venue Management Portal, Block/Unblock Slots, Persistent Order Store,
   User Profile Session, Toast Notification Engine
   ========================================================================== */

// --- Initial Mock Orders if None Exist ---
const defaultInitialOrders = [
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
    status: "paid", // paid, pending, cancelled
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

// --- Initial Mabar Sessions ---
const defaultMabarSessions = [
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

// --- Application State ---
const state = {
  activeDateIndex: 0,
  activeField: 1,
  adminSelectedField: 1,
  cart: [],
  addons: {
    referee: false,
    bibs: false,
    photo: false
  },
  addonPrices: {
    referee: 100000,
    bibs: 35000,
    photo: 150000
  },
  currentUser: JSON.parse(localStorage.getItem('ms88_user') || 'null') || {
    name: 'Vikro Irwan',
    email: 'vikroirwan@gmail.com',
    role: 'admin'
  },
  blockedSlots: JSON.parse(localStorage.getItem('ms88_blocked_slots') || '[]'),
  orders: JSON.parse(localStorage.getItem('ms88_orders') || 'null') || defaultInitialOrders,
  mabarSessions: JSON.parse(localStorage.getItem('ms88_mabar_sessions') || 'null') || defaultMabarSessions,
  authMode: 'login',
  currentTestiIndex: 0
};

// --- Testimonials Data ---
const testimonials = [
  {
    name: "Rifqi Pratama",
    team: "Kapten Barudak Cimahi FC",
    avatar: "R",
    quote: "Rumput sintetis di Mini Soccer 88 Pusdikif ini salah satu yang paling empuk di Cimahi. Lapangan luas, pencahayaan malamnya terang benderang tidak silau. Booking jadwal lewat web juga sangat praktis dan fast respon!"
  },
  {
    name: "Kapten Dimas",
    team: "Pusdikif Young Boys",
    avatar: "D",
    quote: "Fasilitas parkirnya sangat luas, ruang gantinya ber-AC dan bersih. Komunitas sparring-nya juga ramah dan kompetitif. Recommended banget buat tim yang cari tempat sparing rutin mingguan."
  },
  {
    name: "Coach Dani",
    team: "Alpha Academy Cimahi",
    avatar: "C",
    quote: "Kami rutin latihan akademi usia muda di sini setiap Sabtu dan Minggu. Standar lapangannya aman untuk pergelangan kaki anak-anak, infill karetnya berkualitas. Top markotop!"
  }
];

// --- 7-Day Date Generator ---
function getDaysList() {
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const list = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = i === 0 ? 'Hari Ini' : (i === 1 ? 'Besok' : days[d.getDay()]);
    const formattedDate = `${d.getDate()} ${months[d.getMonth()]}`;
    const fullDateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    list.push({ dayName, formattedDate, fullDateKey });
  }
  return list;
}

const scheduleDays = getDaysList();

// --- Slot Schedule Data Template ---
const slotTemplates = {
  morning: [
    { time: '06:00 - 08:00', price: 300000 },
    { time: '08:00 - 10:00', price: 350000 },
    { time: '10:00 - 12:00', price: 350000 },
    { time: '12:00 - 14:00', price: 300000 }
  ],
  afternoon: [
    { time: '14:00 - 16:00', price: 400000 },
    { time: '16:00 - 18:00', price: 450000 }
  ],
  night: [
    { time: '18:00 - 20:00', price: 500000 },
    { time: '20:00 - 22:00', price: 500000 },
    { time: '22:00 - 24:00', price: 450000 }
  ]
};

const allSlotTimes = [
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

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Save initial states to localStorage if needed
  localStorage.setItem('ms88_user', JSON.stringify(state.currentUser));
  localStorage.setItem('ms88_orders', JSON.stringify(state.orders));

  renderHeaderUser();
  renderDateSelector();
  renderScheduleSlots();
  renderMabarCards();
  initEventListeners();
  updateCartUI();

  // Show welcome toast for logged-in user
  if (state.currentUser) {
    setTimeout(() => {
      showToast('Selamat Datang!', `Halo ${state.currentUser.name}, Anda login sebagai Pengelola Venue MS88.`, 'info');
    }, 600);
  }
});

// --- Toast Notification Engine ---
function showToast(title, message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✅' : (type === 'warning' ? '⚠️' : 'ℹ️');

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// --- Render Header User State ---
function renderHeaderUser() {
  const guestWrap = document.getElementById('guestAuthWrap');
  const userNav = document.getElementById('userProfileNav');
  const nameDisplay = document.getElementById('userNameDisplay');
  const avatarCircle = document.getElementById('userAvatarCircle');
  const dropName = document.getElementById('dropdownUserName');
  const dropEmail = document.getElementById('dropdownUserEmail');

  if (state.currentUser) {
    if (guestWrap) guestWrap.style.display = 'none';
    if (userNav) userNav.style.display = 'flex';

    const initials = state.currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    if (avatarCircle) avatarCircle.textContent = initials;
    if (nameDisplay) nameDisplay.textContent = state.currentUser.name;
    if (dropName) dropName.textContent = state.currentUser.name;
    if (dropEmail) dropEmail.textContent = state.currentUser.email;
  } else {
    if (guestWrap) guestWrap.style.display = 'flex';
    if (userNav) userNav.style.display = 'none';
  }
}

function toggleUserDropdown() {
  const menu = document.getElementById('userDropdownMenu');
  if (menu) menu.classList.toggle('show');
}

// Close dropdown on click outside
document.addEventListener('click', (e) => {
  const userNav = document.getElementById('userProfileNav');
  const menu = document.getElementById('userDropdownMenu');
  if (userNav && !userNav.contains(e.target) && menu) {
    menu.classList.remove('show');
  }
});

function logoutUser() {
  state.currentUser = null;
  localStorage.removeItem('ms88_user');
  toggleUserDropdown();
  renderHeaderUser();
  showToast('Logout Berhasil', 'Anda telah keluar dari akun.', 'info');
}

// --- Render Date Selector Bar ---
function renderDateSelector() {
  const bar = document.getElementById('dateSelectorBar');
  if (!bar) return;
  bar.innerHTML = '';

  scheduleDays.forEach((item, index) => {
    const pill = document.createElement('div');
    pill.className = `date-pill ${index === state.activeDateIndex ? 'active' : ''}`;
    pill.onclick = () => selectDate(index);
    pill.innerHTML = `
      <div class="day-name">${item.dayName}</div>
      <div class="day-num">${item.formattedDate}</div>
    `;
    bar.appendChild(pill);
  });
}

function selectDate(index) {
  state.activeDateIndex = index;
  renderDateSelector();
  renderScheduleSlots();
}

// --- Switch Field Tabs ---
function switchField(fieldNum) {
  state.activeField = fieldNum;
  document.getElementById('tabField1')?.classList.toggle('active', fieldNum === 1);
  document.getElementById('tabField2')?.classList.toggle('active', fieldNum === 2);
  renderScheduleSlots();
}

// --- Render Slots for Selected Date and Field ---
function renderScheduleSlots() {
  const currentDateKey = scheduleDays[state.activeDateIndex].fullDateKey;
  const currentFieldName = state.activeField === 1 ? 'Lapangan 1 (FIFA Synth)' : 'Lapangan 2 (Alpha Turf)';

  renderSlotCategory('gridMorning', slotTemplates.morning, currentDateKey, currentFieldName);
  renderSlotCategory('gridAfternoon', slotTemplates.afternoon, currentDateKey, currentFieldName);
  renderSlotCategory('gridNight', slotTemplates.night, currentDateKey, currentFieldName);
}

function renderSlotCategory(containerId, slots, dateKey, fieldName) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  slots.forEach((slot) => {
    const slotId = `${dateKey}_F${state.activeField}_${slot.time.replace(/[: ]/g, '')}`;

    // Check if slot is blocked by admin or order exists
    const isExplicitlyBlocked = state.blockedSlots.includes(slotId);
    const hasPaidOrder = state.orders.some(o => (o.status === 'paid' || o.status === 'pending') && o.date.includes(scheduleDays[state.activeDateIndex].dayName) && o.time === slot.time && o.field.includes(`Lapangan ${state.activeField}`));

    const isBooked = isExplicitlyBlocked || hasPaidOrder;
    const isSelected = state.cart.some(item => item.id === slotId);

    const card = document.createElement('div');
    card.className = `slot-card ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`;

    let statusText = 'Tersedia';
    let statusClass = 'status-avail';

    if (isBooked) {
      statusText = isExplicitlyBlocked ? 'Terkunci (Admin)' : 'Terisi (Booked)';
      statusClass = 'status-booked';
    } else if (isSelected) {
      statusText = '✓ Dipilih';
      statusClass = 'status-avail';
    }

    card.innerHTML = `
      <div class="slot-time">${slot.time}</div>
      <div class="slot-price">${formatRupiah(slot.price)}</div>
      <span class="slot-status-badge ${statusClass}">${statusText}</span>
    `;

    if (!isBooked) {
      card.onclick = () => toggleSlotSelection(slotId, slot.time, slot.price, dateKey, fieldName);
    }

    container.appendChild(card);
  });
}

// --- Toggle Slot Selection in Cart ---
function toggleSlotSelection(id, time, price, dateKey, fieldName) {
  const existingIndex = state.cart.findIndex(item => item.id === id);

  if (existingIndex > -1) {
    state.cart.splice(existingIndex, 1);
    showToast('Jadwal Dihapus', `Slot ${time} dihapus dari keranjang.`, 'info');
  } else {
    const dateObj = scheduleDays.find(d => d.fullDateKey === dateKey);
    const dateLabel = dateObj ? `${dateObj.dayName}, ${dateObj.formattedDate}` : dateKey;

    state.cart.push({
      id,
      time,
      price,
      dateLabel,
      fieldName
    });

    showToast('Jadwal Ditambahkan!', `Slot ${time} berhasil masuk keranjang.`, 'success');
    toggleCartDrawer(true);
  }

  renderScheduleSlots();
  updateCartUI();
}

// --- Cart Drawer UI Updates ---
function updateCartUI() {
  const countBadge = document.getElementById('cartBadgeCount');
  const countText = document.getElementById('cartItemCountText');
  const itemsList = document.getElementById('cartItemsList');
  const emptyState = document.getElementById('cartEmptyState');
  const addonsWrap = document.getElementById('cartAddonsWrap');
  const cartFooter = document.getElementById('cartFooter');
  const subtotalEl = document.getElementById('cartSubtotalText');
  const addonsEl = document.getElementById('cartAddonsText');
  const totalEl = document.getElementById('cartTotalText');

  const count = state.cart.length;
  if (countBadge) countBadge.textContent = count;
  if (countText) countText.textContent = count;

  if (count === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (addonsWrap) addonsWrap.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'none';
    if (itemsList) {
      itemsList.querySelectorAll('.cart-item-card').forEach(el => el.remove());
    }
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (addonsWrap) addonsWrap.style.display = 'block';
  if (cartFooter) cartFooter.style.display = 'block';

  if (itemsList) {
    itemsList.querySelectorAll('.cart-item-card').forEach(el => el.remove());

    state.cart.forEach(item => {
      const card = document.createElement('div');
      card.className = 'cart-item-card';
      card.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.fieldName}</h4>
          <p>📅 ${item.dateLabel} · ⏰ ${item.time}</p>
          <div class="cart-item-price">${formatRupiah(item.price)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeSlotFromCart('${item.id}')" title="Hapus jadwal" aria-label="Hapus jadwal">🗑️</button>
      `;
      itemsList.appendChild(card);
    });
  }

  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  let addonsTotal = 0;
  if (state.addons.referee) addonsTotal += state.addonPrices.referee;
  if (state.addons.bibs) addonsTotal += state.addonPrices.bibs;
  if (state.addons.photo) addonsTotal += state.addonPrices.photo;

  const total = subtotal + addonsTotal;

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (addonsEl) addonsEl.textContent = formatRupiah(addonsTotal);
  if (totalEl) totalEl.textContent = formatRupiah(total);
}

function removeSlotFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  renderScheduleSlots();
  updateCartUI();
}

function updateAddons() {
  state.addons.referee = document.getElementById('addonReferee')?.checked || false;
  state.addons.bibs = document.getElementById('addonBibs')?.checked || false;
  state.addons.photo = document.getElementById('addonPhoto')?.checked || false;
  updateCartUI();
}

// --- Cart Drawer Open / Close ---
function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (!drawer || !backdrop) return;

  if (open) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// --- Checkout Modal & WhatsApp Integration ---
function openCheckoutModal() {
  if (state.cart.length === 0) return;
  toggleCartDrawer(false);

  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  let addonsTotal = 0;
  if (state.addons.referee) addonsTotal += state.addonPrices.referee;
  if (state.addons.bibs) addonsTotal += state.addonPrices.bibs;
  if (state.addons.photo) addonsTotal += state.addonPrices.photo;
  const total = subtotal + addonsTotal;

  const displayEl = document.getElementById('checkoutTotalDisplay');
  if (displayEl) displayEl.textContent = formatRupiah(total);

  // Pre-fill name if logged in
  const nameInput = document.getElementById('bookName');
  if (nameInput && state.currentUser && !nameInput.value) {
    nameInput.value = state.currentUser.name;
  }

  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.add('open');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('open');
}

function submitBookingToWhatsApp() {
  const name = document.getElementById('bookName')?.value.trim();
  const phone = document.getElementById('bookPhone')?.value.trim();
  const team = document.getElementById('bookTeam')?.value.trim() || '-';
  const notes = document.getElementById('bookNotes')?.value.trim() || '-';

  if (!name || !phone) {
    showToast('Data Belum Lengkap', 'Mohon isi nama dan nomor WhatsApp Anda.', 'warning');
    return;
  }

  // Calculate totals
  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  let addonsTotal = 0;
  const addonsList = [];
  if (state.addons.referee) {
    addonsTotal += state.addonPrices.referee;
    addonsList.push('Wasit Resmi PSSI');
  }
  if (state.addons.bibs) {
    addonsTotal += state.addonPrices.bibs;
    addonsList.push('Sewa Rompi 2 Set');
  }
  if (state.addons.photo) {
    addonsTotal += state.addonPrices.photo;
    addonsList.push('Fotografer Match');
  }
  const grandTotal = subtotal + addonsTotal;

  // Create real order object and save to persistent store
  const newOrder = {
    id: `MS88-${Date.now().toString().slice(-6)}`,
    name,
    phone,
    team,
    field: state.cart[0].fieldName,
    date: state.cart[0].dateLabel,
    time: state.cart.map(c => c.time).join(', '),
    addons: addonsList,
    total: grandTotal,
    status: 'pending',
    timestamp: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  };

  state.orders.unshift(newOrder);
  localStorage.setItem('ms88_orders', JSON.stringify(state.orders));

  // Build WhatsApp message
  let message = `*HALO ADMIN MINI SOCCER 88 ALPHA SPORT PUSDIKIF*\n`;
  message += `Saya ingin melakukan konfirmasi pemesanan lapangan (Order #${newOrder.id}):\n\n`;
  message += `👤 *Nama Pemesan:* ${name}\n`;
  message += `📱 *No. WhatsApp:* ${phone}\n`;
  message += `⚽ *Nama Tim:* ${team}\n\n`;
  message += `📋 *RINCIAN JADWAL:*\n`;

  state.cart.forEach((item, idx) => {
    message += `${idx + 1}. ${item.fieldName}\n`;
    message += `   📅 ${item.dateLabel}\n`;
    message += `   ⏰ ${item.time}\n`;
    message += `   💵 ${formatRupiah(item.price)}\n`;
  });

  if (addonsList.length > 0) {
    message += `\n➕ *PRODUK TAMBAHAN:*\n`;
    addonsList.forEach(add => message += `• ${add}\n`);
  }

  message += `\n💰 *TOTAL BIAYA:* ${formatRupiah(grandTotal)}\n`;
  message += `📝 *Catatan:* ${notes}\n\n`;
  message += `Mohon konfirmasi ketersediaan & nomor rekening pembayaran. Terima kasih!`;

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');

  closeCheckoutModal();
  state.cart = [];
  renderScheduleSlots();
  updateCartUI();

  showToast('Booking Berhasil Disimpan!', `Pesanan #${newOrder.id} masuk ke sistem pengelola.`, 'success');
}

// --- RSVP for Main Bareng & Sparring ---
function openRsvpModal(sessionTitle, price) {
  const name = prompt(`Gabung Sesi: ${sessionTitle}\nBiaya: ${formatRupiah(price)}\n\nMasukkan Nama Lengkap Anda:`, state.currentUser?.name || '');
  if (!name) return;

  const phone = prompt('Masukkan Nomor WhatsApp Anda:');
  if (!phone) return;

  let msg = `*HALO ADMIN MINI SOCCER 88 PUSDIKIF*\n`;
  msg += `Saya ingin bergabung ke sesi:\n*${sessionTitle}*\n\n`;
  msg += `👤 *Nama:* ${name}\n`;
  msg += `📱 *WhatsApp:* ${phone}\n`;
  msg += `💰 *Biaya:* ${formatRupiah(price)}\n\n`;
  msg += `Mohon konfirmasi slot sisa dan instruksi kedatangannya. Terima kasih!`;

  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('RSVP Terkirim', 'Silakan lanjutkan chat WhatsApp dengan admin venue.', 'success');
}

// --- Render Mabar Cards from Store ---
function renderMabarCards() {
  const grid = document.getElementById('mabarGrid');
  if (!grid) return;
  grid.innerHTML = '';

  state.mabarSessions.forEach(session => {
    const isFull = session.filled >= session.quota;
    const percent = Math.min(100, Math.round((session.filled / session.quota) * 100));

    const card = document.createElement('div');
    card.className = 'mabar-card';
    card.innerHTML = `
      <div class="mabar-card-header">
        <span class="mabar-badge-type" style="${session.type.includes('SPARRING') ? 'background: #E8F0FE; color: #1967D2; border-color: #D2E3FC;' : ''}">${session.type}</span>
        <span class="mabar-level-badge">${session.level}</span>
      </div>
      <div class="mabar-card-body">
        <h3 class="mabar-session-title">${session.title}</h3>
        <div class="mabar-detail-row">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>${session.time}</span>
        </div>
        <div class="mabar-detail-row">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>${session.field}</span>
        </div>
        <div class="mabar-detail-row">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Host: ${session.host}</span>
        </div>

        <div class="mabar-quota-box">
          <div class="mabar-quota-labels">
            <span>Kuota: ${session.filled} / ${session.quota}</span>
            <span style="color: ${isFull ? '#DC3545' : 'var(--primary)'}; font-weight: 700;">
              ${isFull ? 'Slot Penuh' : `Sisa ${session.quota - session.filled} Slot!`}
            </span>
          </div>
          <div class="mabar-progress-bar">
            <div class="mabar-progress-fill" style="width: ${percent}%;"></div>
          </div>
        </div>
      </div>
      <div class="mabar-card-footer">
        <div class="mabar-price-tag">
          <span class="small">Biaya per Orang</span>
          <span class="cost">${formatRupiah(session.price)}</span>
        </div>
        <button class="btn-join-mabar" ${isFull ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} onclick="openRsvpModal('${session.title}', ${session.price})">
          ${isFull ? 'Penuh' : 'Gabung Sesi'}
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// --- Quick Finder Handler ---
function handleFinderSearch() {
  const activity = document.getElementById('finderActivity')?.value;

  if (activity === 'sewa') {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  } else if (activity === 'mabar' || activity === 'sparring') {
    document.getElementById('mabar')?.scrollIntoView({ behavior: 'smooth' });
  } else if (activity === 'turnamen') {
    document.getElementById('turnamen')?.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- Venue Management Tab Switcher ---
function switchMgmtTab(type) {
  const btnPenyewa = document.getElementById('btnTabPenyewa');
  const btnPengelola = document.getElementById('btnTabPengelola');
  const heading = document.getElementById('mgmtHeading');
  const desc = document.getElementById('mgmtDesc');
  const list = document.getElementById('mgmtFeatures');

  if (type === 'penyewa') {
    btnPenyewa?.classList.add('active');
    btnPengelola?.classList.remove('active');
    if (heading) heading.textContent = 'Main Nyaman Tanpa Khawatir Cedera';
    if (desc) desc.textContent = 'Mini Soccer 88 didesain khusus dengan standar rumput sintetis lembut dan drainase modern agar tetap optimal di cuaca panas maupun hujan lebat.';
    if (list) {
      list.innerHTML = `
        <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Rumput Sintetis Monofilament 50mm dengan infill karet silica empuk</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Pencahayaan LED Floodlight 500 Lux untuk pertandingan malam tanpa silau</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Ketersediaan rompi bersih, wasit bersertifikasi, dan bola resmi match standard</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Sistem booking transparan langsung terkonfirmasi otomatis</span></li>
      `;
    }
  } else {
    btnPengelola?.classList.add('active');
    btnPenyewa?.classList.remove('active');
    if (heading) heading.textContent = 'Solusi Lengkap Selenggarakan Event & Turnamen';
    if (desc) desc.textContent = 'Punya rencana kompetisi perusahaan, gathering komunitas, atau turnamen tahunan? Fasilitas kami siap mendukung suksesnya acara Anda.';
    if (list) {
      list.innerHTML = `
        <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Paket sewa harian (Full Day) dengan harga paket turnamen kompetitif</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Dukungan meja panitia, sound system pengeras suara, dan tenda tim</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Tribun penonton beratap dan toilet bersih yang siap menampung ratusan suporter</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Bantuan penugasan wasit PSSI Kota Cimahi dan tenaga medis P3K</span></li>
      `;
    }
  }
}

// --- Testimonials Carousel ---
function navigateTestimonial(direction) {
  state.currentTestiIndex = (state.currentTestiIndex + direction + testimonials.length) % testimonials.length;
  const current = testimonials[state.currentTestiIndex];

  const nameEl = document.getElementById('testiName');
  const teamEl = document.getElementById('testiTeam');
  const quoteEl = document.getElementById('testiQuote');
  const avatarEl = document.getElementById('testiAvatar');
  const counterEl = document.getElementById('testiCounter');

  if (nameEl) nameEl.textContent = current.name;
  if (teamEl) teamEl.textContent = current.team;
  if (quoteEl) quoteEl.textContent = `“${current.quote}”`;
  if (avatarEl) avatarEl.textContent = current.avatar;
  if (counterEl) counterEl.textContent = `0${state.currentTestiIndex + 1} / 0${testimonials.length}`;
}

// --- Auth Modal Logic ---
function openAuthModal(mode = 'login') {
  state.authMode = mode;
  updateAuthModalView();
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('open');
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('open');
}

function toggleAuthMode() {
  state.authMode = state.authMode === 'login' ? 'register' : 'login';
  updateAuthModalView();
}

function updateAuthModalView() {
  const title = document.getElementById('authModalTitle');
  const subtitle = document.getElementById('authModalSubtitle');
  const btnSubmit = document.getElementById('btnAuthSubmit');
  const question = document.getElementById('authToggleQuestion');
  const link = document.getElementById('authToggleLink');

  if (state.authMode === 'login') {
    if (title) title.textContent = 'Masuk ke Akun';
    if (subtitle) subtitle.textContent = 'Masuk untuk melihat riwayat booking & jadwal sparring timmu.';
    if (btnSubmit) btnSubmit.textContent = 'Masuk Sekarang';
    if (question) question.textContent = 'Belum punya akun?';
    if (link) link.textContent = 'Daftar di sini';
  } else {
    if (title) title.textContent = 'Daftar Akun Baru';
    if (subtitle) subtitle.textContent = 'Gabung ribuan pemain dan daftarkan tim sepak bolamu hari ini.';
    if (btnSubmit) btnSubmit.textContent = 'Daftar Akun';
    if (question) question.textContent = 'Sudah punya akun?';
    if (link) link.textContent = 'Masuk di sini';
  }
}

function handleAuthSubmit() {
  const input = document.getElementById('authIdentifier')?.value.trim();
  if (!input) return;

  const isVikro = input.toLowerCase().includes('vikro') || input.toLowerCase() === 'vikroirwan@gmail.com';

  state.currentUser = {
    name: isVikro ? 'Vikro Irwan' : (input.includes('@') ? input.split('@')[0] : 'Member MS88'),
    email: input,
    role: isVikro ? 'admin' : 'member'
  };

  localStorage.setItem('ms88_user', JSON.stringify(state.currentUser));
  renderHeaderUser();
  closeAuthModal();

  showToast('Berhasil Masuk!', `Selamat datang, ${state.currentUser.name}.`, 'success');
}

function handleGoogleAuth() {
  state.currentUser = {
    name: 'Vikro Irwan',
    email: 'vikroirwan@gmail.com',
    role: 'admin'
  };
  localStorage.setItem('ms88_user', JSON.stringify(state.currentUser));
  renderHeaderUser();
  closeAuthModal();
  showToast('Login Google Berhasil', 'Akun vikroirwan@gmail.com aktif sebagai Admin.', 'success');
}

// ==========================================================================
// ADMIN PORTAL & VENUE MANAGEMENT LOGIC
// ==========================================================================

function toggleAdminModal(open) {
  const modal = document.getElementById('adminModal');
  if (!modal) return;

  if (open) {
    renderAdminDashboard();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function switchAdminTab(tabId) {
  const tabs = ['overview', 'slots', 'orders', 'mabar'];

  tabs.forEach(t => {
    const btn = document.getElementById(`btnAdminTab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const content = document.getElementById(`adminTabContent${t.charAt(0).toUpperCase() + t.slice(1)}`);

    if (btn) btn.classList.toggle('active', t === tabId);
    if (content) content.style.display = t === tabId ? 'block' : 'none';
  });

  const titleEl = document.getElementById('adminPanelTitle');
  if (titleEl) {
    if (tabId === 'overview') titleEl.textContent = 'Dashboard Ringkasan & Omset Venue';
    if (tabId === 'slots') titleEl.textContent = 'Kelola Slot Lapangan (Kunci / Buka)';
    if (tabId === 'orders') titleEl.textContent = 'Manajemen Reservasi & Pesanan Masuk';
    if (tabId === 'mabar') titleEl.textContent = 'Publikasi Sesi Main Bareng (Mabar)';
  }

  if (tabId === 'slots') renderAdminSlotsMatrix();
  if (tabId === 'orders') renderAdminOrdersTable();
}

function renderAdminDashboard() {
  // Update KPI cards
  const totalRev = state.orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.total, 0);
  const pendingCount = state.orders.filter(o => o.status === 'pending').length;

  const revEl = document.getElementById('metricRevenue');
  const pendingEl = document.getElementById('metricPendingOrders');
  const recentTable = document.getElementById('adminRecentOrdersTable');

  if (revEl) revEl.textContent = formatRupiah(totalRev + 24850000); // base + dynamic
  if (pendingEl) pendingEl.textContent = `${pendingCount} Pesanan`;

  if (recentTable) {
    recentTable.innerHTML = '';
    state.orders.slice(0, 4).forEach(order => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>#${order.id}</strong></td>
        <td>${order.name} <br><small style="color:var(--text-muted);">${order.phone}</small></td>
        <td>${order.field}<br><small>${order.date} (${order.time})</small></td>
        <td><strong>${formatRupiah(order.total)}</strong></td>
        <td><span class="badge-status ${order.status}">${order.status.toUpperCase()}</span></td>
        <td>
          ${order.status === 'pending' ? `<button class="btn-action-sm approve" onclick="updateOrderStatus('${order.id}', 'paid')">Tandai Lunas</button>` : ''}
          <button class="btn-action-sm" onclick="sendOrderWhatsAppConfirmation('${order.id}')">WA 💬</button>
        </td>
      `;
      recentTable.appendChild(tr);
    });
  }

  renderAdminSlotsMatrix();
  renderAdminOrdersTable();
}

function setAdminSlotField(fieldNum) {
  state.adminSelectedField = fieldNum;
  document.getElementById('adminSlotField1Btn')?.style.setProperty('background', fieldNum === 1 ? 'var(--dark)' : '#fff');
  document.getElementById('adminSlotField1Btn')?.style.setProperty('color', fieldNum === 1 ? '#fff' : 'var(--text-main)');
  document.getElementById('adminSlotField2Btn')?.style.setProperty('background', fieldNum === 2 ? 'var(--dark)' : '#fff');
  document.getElementById('adminSlotField2Btn')?.style.setProperty('color', fieldNum === 2 ? '#fff' : 'var(--text-main)');
  renderAdminSlotsMatrix();
}

function renderAdminSlotsMatrix() {
  const container = document.getElementById('adminSlotMatrixContainer');
  if (!container) return;
  container.innerHTML = '';

  const currentDateKey = scheduleDays[state.activeDateIndex].fullDateKey;

  allSlotTimes.forEach(time => {
    const slotId = `${currentDateKey}_F${state.adminSelectedField}_${time.replace(/[: ]/g, '')}`;
    const isBlocked = state.blockedSlots.includes(slotId);

    const box = document.createElement('div');
    box.className = `admin-slot-box ${isBlocked ? 'blocked' : ''}`;
    box.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>${time}</strong>
        <span class="badge-status ${isBlocked ? 'cancelled' : 'paid'}">${isBlocked ? 'Terkunci' : 'Aktif Buka'}</span>
      </div>
      <div style="font-size: 12px; color: var(--text-muted);">
        ${isBlocked ? 'Slot tidak dapat dibooking publik.' : 'Tersedia untuk disewa tim.'}
      </div>
      <button class="btn-toggle-slot ${isBlocked ? 'unblock' : 'block'}" onclick="toggleBlockSlot('${slotId}', '${time}')">
        ${isBlocked ? '🔓 Buka Slot Publik' : '🔒 Kunci / Blokir Slot'}
      </button>
    `;
    container.appendChild(box);
  });
}

function toggleBlockSlot(slotId, time) {
  if (state.blockedSlots.includes(slotId)) {
    state.blockedSlots = state.blockedSlots.filter(id => id !== slotId);
    showToast('Slot Dibuka', `Slot ${time} kini tersedia untuk disewa publik.`, 'success');
  } else {
    state.blockedSlots.push(slotId);
    showToast('Slot Dikunci', `Slot ${time} berhasil dikunci oleh admin.`, 'warning');
  }

  localStorage.setItem('ms88_blocked_slots', JSON.stringify(state.blockedSlots));
  renderAdminSlotsMatrix();
  renderScheduleSlots();
}

function renderAdminOrdersTable() {
  const table = document.getElementById('adminAllOrdersTable');
  if (!table) return;
  table.innerHTML = '';

  state.orders.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${order.id}</strong></td>
      <td><strong>${order.name}</strong><br><small>${order.team}</small></td>
      <td><a href="https://wa.me/${order.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color:var(--blue);">${order.phone}</a></td>
      <td>${order.field}<br><small>${order.date} · ${order.time}</small></td>
      <td>${order.addons.length > 0 ? order.addons.join(', ') : '-'}</td>
      <td><strong>${formatRupiah(order.total)}</strong></td>
      <td><span class="badge-status ${order.status}">${order.status.toUpperCase()}</span></td>
      <td>
        ${order.status === 'pending' ? `<button class="btn-action-sm approve" onclick="updateOrderStatus('${order.id}', 'paid')">Set Lunas</button>` : ''}
        ${order.status !== 'cancelled' ? `<button class="btn-action-sm cancel" onclick="updateOrderStatus('${order.id}', 'cancelled')">Batalkan</button>` : ''}
        <button class="btn-action-sm" onclick="sendOrderWhatsAppConfirmation('${order.id}')">Kirim WA</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

function updateOrderStatus(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem('ms88_orders', JSON.stringify(state.orders));
    renderAdminDashboard();
    renderScheduleSlots();
    showToast('Status Pesanan Diperbarui', `Order #${orderId} kini berstatus ${newStatus.toUpperCase()}.`, 'success');
  }
}

function sendOrderWhatsAppConfirmation(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  const msg = `*PEMBERITAHUAN DARI MINI SOCCER 88 PUSDIKIF CIMAHI*\nHalo Kak ${order.name},\nPesanan #${order.id} untuk ${order.field} (${order.date} ${order.time}) telah kami verifikasi dengan status: *${order.status.toUpperCase()}*.\nTotal: ${formatRupiah(order.total)}.\nSampai jumpa di lapangan Pusdikif! Terima kasih.`;

  window.open(`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
}

function simulateNewIncomingOrder() {
  const randomSlot = allSlotTimes[Math.floor(Math.random() * allSlotTimes.length)];
  const dummyOrder = {
    id: `MS88-${Date.now().toString().slice(-6)}`,
    name: "Asep Sunandar",
    phone: "081299881122",
    team: "Cimahi United",
    field: "Lapangan 1 (FIFA Synth)",
    date: "Besok, 16 Sep",
    time: randomSlot,
    addons: ["Wasit Resmi PSSI"],
    total: 550000,
    status: "pending",
    timestamp: "Baru Saja"
  };

  state.orders.unshift(dummyOrder);
  localStorage.setItem('ms88_orders', JSON.stringify(state.orders));
  renderAdminDashboard();
  renderScheduleSlots();
  showToast('Booking Masuk Baru!', `Pesanan baru dari Asep Sunandar (#${dummyOrder.id})`, 'info');
}

function submitAdminNewMabar() {
  const title = document.getElementById('mabarTitleInput')?.value.trim();
  const time = document.getElementById('mabarTimeInput')?.value.trim();
  const field = document.getElementById('mabarFieldSelect')?.value;
  const quota = parseInt(document.getElementById('mabarQuotaInput')?.value || '14', 10);
  const price = parseInt(document.getElementById('mabarPriceInput')?.value || '45000', 10);

  if (!title || !time) return;

  const newSession = {
    id: `mabar-${Date.now()}`,
    title,
    time,
    field,
    host: "Admin Mini Soccer 88",
    quota,
    filled: 1,
    price,
    type: "MAIN BARENG",
    level: "Level: All Community Welcome"
  };

  state.mabarSessions.unshift(newSession);
  localStorage.setItem('ms88_mabar_sessions', JSON.stringify(state.mabarSessions));
  renderMabarCards();
  switchAdminTab('overview');
  showToast('Sesi Mabar Berhasil Diterbitkan!', `"${title}" kini tampil di halaman depan website.`, 'success');
}

// --- User Booking History Modal ---
function openHistoryModal() {
  const modal = document.getElementById('historyModal');
  const container = document.getElementById('userTicketsContainer');
  toggleUserDropdown();
  if (!modal || !container) return;

  container.innerHTML = '';

  if (state.orders.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:30px;">Belum ada riwayat booking.</p>';
  } else {
    state.orders.forEach(order => {
      const ticket = document.createElement('div');
      ticket.className = 'ticket-card';
      ticket.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="font-size: 15px;">#${order.id}</strong>
          <span class="badge-status ${order.status}">${order.status.toUpperCase()}</span>
        </div>
        <div style="font-weight: 700; color: var(--primary); font-size: 16px;">${order.field}</div>
        <div style="font-size: 13.5px; color: var(--text-muted); margin: 4px 0;">📅 ${order.date} · ⏰ ${order.time}</div>
        <div style="font-size: 13px; color: var(--text-light);">Atas Nama: ${order.name} (${order.team})</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px dashed var(--border-color); padding-top: 8px;">
          <span>Total: <strong>${formatRupiah(order.total)}</strong></span>
          <button class="btn-action-sm" onclick="sendOrderWhatsAppConfirmation('${order.id}')">Bukti Chat WA 💬</button>
        </div>
      `;
      container.appendChild(ticket);
    });
  }

  modal.classList.add('open');
}

function closeHistoryModal() {
  const modal = document.getElementById('historyModal');
  if (modal) modal.classList.remove('open');
}

// --- Event Listeners Setup ---
function initEventListeners() {
  document.getElementById('openCartBtn')?.addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('openLoginModalBtn')?.addEventListener('click', () => openAuthModal('login'));
  document.getElementById('openRegisterModalBtn')?.addEventListener('click', () => openAuthModal('register'));

  // Mobile hamburger menu toggle
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
      const isVisible = window.getComputedStyle(nav).display !== 'none';
      nav.style.display = isVisible ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '74px';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.background = '#fff';
      nav.style.padding = '20px';
      nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    }
  });
}

// --- Currency Helper ---
function formatRupiah(number) {
  return 'Rp ' + number.toLocaleString('id-ID');
}
