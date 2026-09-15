/* ==========================================================================
   MINI SOCCER 88 ALPHA SPORT PUSDIKIF - CLIENT APPLICATION LOGIC
   Features: Interactive Schedule Grid, Real-time Cart Drawer, WhatsApp Checkout,
   Main Bareng/Sparring Hub, Management Tabs, Testimonial Slider, Auth Modals
   ========================================================================== */

// --- Application State ---
const state = {
  activeDateIndex: 0,
  activeField: 1,
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
  authMode: 'login', // 'login' or 'register'
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

// --- Initialization on DOM Loaded ---
document.addEventListener('DOMContentLoaded', () => {
  renderDateSelector();
  renderScheduleSlots();
  initEventListeners();
  updateCartUI();
});

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
  document.getElementById('tabField1').classList.toggle('active', fieldNum === 1);
  document.getElementById('tabField2').classList.toggle('active', fieldNum === 2);
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

  slots.forEach((slot, i) => {
    const slotId = `${dateKey}_F${state.activeField}_${slot.time.replace(/[: ]/g, '')}`;

    // Deterministic booked slots for realistic simulation (e.g. some evening slots booked on weekdays)
    const isBooked = (state.activeDateIndex === 0 && (slot.time === '16:00 - 18:00' || slot.time === '18:00 - 20:00')) ||
                     (state.activeDateIndex === 1 && slot.time === '20:00 - 22:00');

    const isSelected = state.cart.some(item => item.id === slotId);

    const card = document.createElement('div');
    card.className = `slot-card ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`;

    let statusText = 'Tersedia';
    let statusClass = 'status-avail';

    if (isBooked) {
      statusText = 'Terisi (Booked)';
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

    // Automatically open the cart drawer on adding item to guide user
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
      // Keep only empty state element
      itemsList.querySelectorAll('.cart-item-card').forEach(el => el.remove());
    }
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (addonsWrap) addonsWrap.style.display = 'block';
  if (cartFooter) cartFooter.style.display = 'block';

  // Render items
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

  // Calculate totals
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
    alert('Mohon lengkapi nama dan nomor WhatsApp Anda.');
    return;
  }

  // Calculate totals
  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  let addonsTotal = 0;
  const addonsList = [];
  if (state.addons.referee) {
    addonsTotal += state.addonPrices.referee;
    addonsList.push('Wasit Resmi PSSI (Rp 100.000)');
  }
  if (state.addons.bibs) {
    addonsTotal += state.addonPrices.bibs;
    addonsList.push('Sewa Rompi 2 Set (Rp 35.000)');
  }
  if (state.addons.photo) {
    addonsTotal += state.addonPrices.photo;
    addonsList.push('Dokumentasi Foto Match (Rp 150.000)');
  }
  const grandTotal = subtotal + addonsTotal;

  // Build WhatsApp message
  let message = `*HALO ADMIN MINI SOCCER 88 ALPHA SPORT PUSDIKIF*\n`;
  message += `Saya ingin melakukan konfirmasi pemesanan lapangan:\n\n`;
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
  // Clear cart on successful submission
  state.cart = [];
  renderScheduleSlots();
  updateCartUI();
}

// --- RSVP for Main Bareng & Sparring ---
function openRsvpModal(sessionTitle, price) {
  const name = prompt(`Gabung Sesi: ${sessionTitle}\nBiaya: ${formatRupiah(price)}\n\nMasukkan Nama Lengkap Anda:`);
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
    btnPenyewa.classList.add('active');
    btnPengelola.classList.remove('active');
    heading.textContent = 'Main Nyaman Tanpa Khawatir Cedera';
    desc.textContent = 'Mini Soccer 88 didesain khusus dengan standar rumput sintetis lembut dan drainase modern agar tetap optimal di cuaca panas maupun hujan lebat.';
    list.innerHTML = `
      <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Rumput Sintetis Monofilament 50mm dengan infill karet silica empuk</span></li>
      <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Pencahayaan LED Floodlight 500 Lux untuk pertandingan malam tanpa silau</span></li>
      <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Ketersediaan rompi bersih, wasit bersertifikasi, dan bola resmi match standard</span></li>
      <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Sistem booking transparan langsung terkonfirmasi otomatis</span></li>
    `;
  } else {
    btnPengelola.classList.add('active');
    btnPenyewa.classList.remove('active');
    heading.textContent = 'Solusi Lengkap Selenggarakan Event & Turnamen';
    desc.textContent = 'Punya rencana kompetisi perusahaan, gathering komunitas, atau turnamen tahunan? Fasilitas kami siap mendukung suksesnya acara Anda.';
    list.innerHTML = `
      <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Paket sewa harian (Full Day) dengan harga paket turnamen kompetitif</span></li>
      <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Dukungan meja panitia, sound system pengeras suara, dan tenda tim</span></li>
      <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Tribun penonton beratap dan toilet bersih yang siap menampung ratusan suporter</span></li>
      <li><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><span>Bantuan penugasan wasit PSSI Kota Cimahi dan tenaga medis P3K</span></li>
    `;
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
    title.textContent = 'Masuk ke Akun';
    subtitle.textContent = 'Masuk untuk melihat riwayat booking & jadwal sparring timmu.';
    btnSubmit.textContent = 'Masuk Sekarang';
    question.textContent = 'Belum punya akun?';
    link.textContent = 'Daftar di sini';
  } else {
    title.textContent = 'Daftar Akun Baru';
    subtitle.textContent = 'Gabung ribuan pemain dan daftarkan tim sepak bolamu hari ini.';
    btnSubmit.textContent = 'Daftar Akun';
    question.textContent = 'Sudah punya akun?';
    link.textContent = 'Masuk di sini';
  }
}

function handleAuthSubmit() {
  const input = document.getElementById('authIdentifier')?.value;
  alert(`Berhasil ${state.authMode === 'login' ? 'masuk' : 'mendaftar'} sebagai: ${input}`);
  closeAuthModal();
}

function handleGoogleAuth() {
  alert('Simulasi integrasi Google Login AYO berhasil! Anda kini terhubung.');
  closeAuthModal();
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
