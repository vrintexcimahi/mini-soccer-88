import os

# --- Monochrome SVG Icon Library ---
SVG = {
    'pin': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="geo-pin-svg"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    'stadium': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="12" y1="5" x2="12" y2="19"></line><circle cx="12" cy="12" r="3"></circle></svg>',
    'soccer': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="12 7 15 10 14 14 10 14 9 10 12 7"></polygon><line x1="12" y1="2" x2="12" y2="7"></line><line x1="12" y1="14" x2="12" y2="22"></line><line x1="15" y1="10" x2="21.5" y2="8"></line><line x1="14" y1="14" x2="19.5" y2="18"></line><line x1="9" y1="10" x2="2.5" y2="8"></line><line x1="10" y1="14" x2="4.5" y2="18"></line></svg>',
    'goal': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="8" y1="4" x2="8" y2="20"></line><line x1="16" y1="4" x2="16" y2="20"></line></svg>',
    'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    'trophy': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>',
    'newspaper': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>',
    'document': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    'handshake': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2"></path><path d="m18 10 3.3-3.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L14 6"></path><path d="m2 14 6 6"></path><path d="M7 8 2 13"></path><path d="m20 17 2 2"></path><path d="m11 7-7 7 4 4 7-7-4-4Z"></path></svg>',
    'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>',
    'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    'mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    'chat': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    'calendar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    'money': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    'camera': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>',
    'bullhorn': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',
    'instagram': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    'tiktok': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>',
    'download': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
}

PAGES = {
    'sewa-lapangan.html': {
        'title': 'Sewa Lapangan — Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi',
        'heading': 'Sewa Lapangan Mini Soccer',
        'sub': 'Rumput sintetis premium 30 x 50 Meter di kawasan Pusdikif Kota Cimahi. 5 pilihan paket sesi sewa September 2026.',
        'icon': SVG['stadium'],
        'color': '#B91C1C',
        'content': '''
        <div class="row g-4 mb-5">
          <div class="col-lg-6">
            <div class="court-card h-100">
              <div class="court-img position-relative" style="height:280px; overflow:hidden;">
                <img src="assets/img/venue/field-night-floodlight.jpg" alt="Lapangan Pusdikif Malam Hari" style="width:100%; height:100%; object-fit:cover;">
                <span class="badge bg-danger position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill fw-bold">Ukuran 30 x 50 Meter</span>
              </div>
              <div class="p-3 bg-light d-flex gap-2 overflow-auto" style="border-bottom: 1px solid #e5e7eb;">
                <img src="assets/img/venue/field-day-center.jpg" alt="Siang Hari" style="height:64px; width:96px; object-fit:cover; border-radius:8px; flex-shrink:0; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                <img src="assets/img/venue/field-tribun-dugout.jpg" alt="Dugout Pemain" style="height:64px; width:96px; object-fit:cover; border-radius:8px; flex-shrink:0; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                <img src="assets/img/venue/field-night-ball-fifa.jpg" alt="Bola FIFA" style="height:64px; width:96px; object-fit:cover; border-radius:8px; flex-shrink:0; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                <img src="assets/img/venue/field-panorama-mosque.jpg" alt="Musholla Pusdikif" style="height:64px; width:96px; object-fit:cover; border-radius:8px; flex-shrink:0; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
              </div>
              <div class="court-info">
                <h3>Lapangan Utama Pusdikif (30 × 50 M)</h3>
                <p>Rumput sintetis monofilament tebal standar FIFA dengan bantalan silika & rubber infill empuk. Dilengkapi pencahayaan LED stadion 800+ Lux untuk match malam hari.</p>
                <div class="court-tags">
                  <span>Rumput Sintetis FIFA Quality</span>
                  <span>Floodlight LED 800 Lux</span>
                  <span>Bench & Tribun Mini Teduh</span>
                  <span>Dekat Musholla & Kantin Sekar</span>
                  <span>Bola FIFA & Rompi Gratis</span>
                  <span>Parkir Militer Aman 24 Jam</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6">
            <div class="booking-form-section h-100">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 style="margin:0;">Pricelist Resmi September 2026</h2>
                <a href="assets/promo/poster-pricelist.jpg" target="_blank" class="badge bg-warning text-dark text-decoration-none px-3 py-2 rounded-pill fw-bold">
                  Lihat Poster Brosur ↗
                </a>
              </div>
              <div class="table-responsive mb-4">
                <table class="table table-sm table-bordered mb-0">
                  <thead class="table-dark">
                    <tr><th>Jam Bermain</th><th>Nama Paket</th><th>Tarif / Jam</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>06.00 – 08.00</td><td><strong>Prime Morning</strong></td><td>Rp 250.000</td></tr>
                    <tr><td>08.00 – 10.00</td><td><strong>Morning</strong></td><td>Rp 275.000</td></tr>
                    <tr class="table-danger"><td>10.00 – 15.00</td><td><strong>Happy Hours (Best Deal)</strong></td><td>Rp 225.000</td></tr>
                    <tr><td>15.00 – 18.00</td><td><strong>Prime Time</strong></td><td>Rp 300.000</td></tr>
                    <tr class="table-warning"><td>18.00 – 22.00</td><td><strong>Premium Night (Full LED)</strong></td><td>Rp 350.000</td></tr>
                  </tbody>
                </table>
              </div>

              <!-- Member Benefit Notice -->
              <div class="p-3 bg-light rounded-3 border mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <strong class="text-dark d-block">Paket Hemat Member 4x Match</strong>
                    <small class="text-muted">Dapatkan Diskon 10% untuk paket booking rutin 4 sesi (Contoh: Tim Loyor FC).</small>
                  </div>
                  <a href="assets/promo/sample-invoice-member.jpg" target="_blank" class="btn btn-sm btn-outline-secondary rounded-pill fw-bold">
                    Lihat Bukti Diskon ↗
                  </a>
                </div>
              </div>

              <a href="#booking" class="btn-book w-100 text-center py-3 fw-bold">Isi Form Booking Lapangan ↓</a>
            </div>
          </div>
        </div>

        <div id="booking" class="booking-form-section mb-5">
          <h2>Form Booking Lapangan Online</h2>
          <p>Isi formulir di bawah ini. Permintaan Anda langsung tersimpan ke sistem Superadmin dan diteruskan ke WhatsApp Admin 88 Alpha Sport untuk konfirmasi jadwal.</p>
          <form class="booking-form" onsubmit="handleBookingSubmit(event)">
            <div class="form-row">
              <div class="form-group"><label>Nama Lengkap / Nama Tim</label><input type="text" id="bNama" placeholder="Contoh: Reza - Cimahi United FC" required></div>
              <div class="form-group"><label>No. WhatsApp</label><input type="tel" id="bWa" placeholder="0812xxxxxxxx" required></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Pilih Paket Sesi Tarif</label>
                <select id="bSesi" required>
                  <option value="Happy Hours (10.00 - 15.00) - Rp 225.000/jam">Happy Hours (10.00 – 15.00) — Rp 225.000 / jam</option>
                  <option value="Prime Morning (06.00 - 08.00) - Rp 250.000/jam">Prime Morning (06.00 – 08.00) — Rp 250.000 / jam</option>
                  <option value="Morning (08.00 - 10.00) - Rp 275.000/jam">Morning (08.00 – 10.00) — Rp 275.000 / jam</option>
                  <option value="Prime Time (15.00 - 18.00) - Rp 300.000/jam">Prime Time (15.00 – 18.00) — Rp 300.000 / jam</option>
                  <option value="Premium Night (18.00 - 22.00) - Rp 350.000/jam" selected>Premium Night (18.00 – 22.00) — Rp 350.000 / jam</option>
                </select>
              </div>
              <div class="form-group"><label>Tanggal Main</label><input type="date" id="bTgl" value="2026-09-16" required></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Jam Mulai</label>
                <select id="bJam" required>
                  <option>06:00</option><option>07:00</option><option>08:00</option><option>09:00</option>
                  <option>10:00</option><option>13:00</option><option>15:00</option><option>16:00</option>
                  <option>17:00</option><option>18:00</option><option>19:00</option><option selected>20:00</option><option>21:00</option>
                </select>
              </div>
              <div class="form-group"><label>Durasi Main</label>
                <select id="bDurasi" required><option value="1 Jam">1 Jam</option><option value="2 Jam" selected>2 Jam</option><option value="3 Jam">3 Jam</option></select>
              </div>
            </div>
            <button type="submit" class="btn-submit">Kirim Booking via WhatsApp</button>
          </form>
        </div>

        <!-- QRIS Checkout Preview -->
        <div class="p-4 rounded-4 bg-white border shadow-sm">
          <div class="row align-items-center">
            <div class="col-md-3 text-center mb-3 mb-md-0">
              <img src="assets/payment/qris-alpha-sport.jpg" alt="QRIS 88 Alpha Sport" style="max-height:160px; border-radius:8px; border:1px solid #e5e7eb;">
            </div>
            <div class="col-md-9">
              <span class="badge bg-danger px-3 py-1 rounded-pill mb-2">PEMBAYARAN RESMI</span>
              <h4 class="fw-bold mb-1">QRIS Nasional 88 ALPHA MINI SOCCER</h4>
              <p class="small text-muted mb-2">NMID: <strong>ID1026529171542 (A01)</strong> • Rek Mandiri: <strong>13000-23009007</strong> a.n PT Sarana Digital Retail / dRetail POS.</p>
              <div class="small text-secondary">
                Konfirmasi pembayaran otomatis diproses melalui WhatsApp admin setelah struk/screenshot transfer dikirimkan.
              </div>
            </div>
          </div>
        </div>

        <script>
        function handleBookingSubmit(e) {
          e.preventDefault();
          const nama = document.getElementById('bNama').value.trim();
          const wa = document.getElementById('bWa').value.trim();
          const sesi = document.getElementById('bSesi').value;
          const tgl = document.getElementById('bTgl').value;
          const jam = document.getElementById('bJam').value;
          const durasi = document.getElementById('bDurasi').value;

          const hours = parseInt(durasi, 10) || 1;
          let rate = 350000;
          if (sesi.includes('225.000')) rate = 225000;
          else if (sesi.includes('250.000')) rate = 250000;
          else if (sesi.includes('275.000')) rate = 275000;
          else if (sesi.includes('300.000')) rate = 300000;
          else if (sesi.includes('350.000')) rate = 350000;

          try {
            const orders = JSON.parse(localStorage.getItem('ms88_orders') || '[]');
            const newOrder = {
              id: 'MS88-' + Date.now().toString().slice(-6),
              name: nama,
              phone: wa,
              field: 'Lapangan 1 (FIFA Synth)',
              court: 'Lapangan 1',
              date: tgl,
              time: jam + ' (' + durasi + ')',
              total: hours * rate,
              status: 'pending',
              timestamp: new Date().toLocaleDateString('id-ID', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })
            };
            orders.unshift(newOrder);
            localStorage.setItem('ms88_orders', JSON.stringify(orders));
          } catch(err) {
            console.warn('LocalStorage error:', err);
          }

          const msg = `Halo Admin 88 Alpha Sport Pusdikif,%0A%0ASaya ingin booking lapangan:%0A• Nama/Tim: ${encodeURIComponent(nama)}%0A• No WA: ${encodeURIComponent(wa)}%0A• Paket: ${encodeURIComponent(sesi)}%0A• Tanggal: ${tgl}%0A• Jam: ${jam} WIB (${durasi})%0A• Estimasi Total: Rp ${(hours * rate).toLocaleString('id-ID')}%0A%0AMohon konfirmasi ketersediaan slotnya. Terima kasih!`;
          window.open('https://wa.me/6281295679799?text=' + msg, '_blank');
        }
        </script>
        '''
    },
    'main-bareng.html': {
        'title': 'Main Bareng (Mabar) & Komunitas — Mini Soccer 88 Alpha Sport',
        'heading': 'Main Bareng (Mabar) & Komunitas',
        'sub': 'Gak ada tim lengkap? Gabung sesi mabar santai atau ikuti program senam pagi KOMMOTO 7-8 di Lapangan Pusdikif.',
        'icon': SVG['users'],
        'color': '#B91C1C',
        'content': f'''
        <!-- Featured Program: KOMMOTO 7-8 Poster Section -->
        <div class="row g-4 mb-5 align-items-center">
          <div class="col-lg-5 text-center">
            <a href="assets/promo/poster-kommoto.jpg" target="_blank" title="Klik untuk memperbesar poster">
              <img src="assets/promo/poster-kommoto.jpg" alt="Poster KOMMOTO 7-8" class="img-fluid rounded-4 shadow" style="max-height:480px; object-fit:contain; border:2px solid #E5E7EB; transition:transform 0.2s;">
            </a>
            <small class="text-muted d-block mt-2">🔍 Klik poster untuk melihat resolusi penuh</small>
          </div>
          <div class="col-lg-7">
            <span class="badge bg-success text-white px-3 py-2 rounded-pill fw-bold mb-3">PROGRAM KESEHATAN TERBUKA</span>
            <h2 class="fw-bold mb-3" style="color:#065f46;">KOMMOTO 7-8: Komunitas Moe Tonggong</h2>
            <p class="text-secondary mb-3" style="line-height:1.7;">
              <strong>"Jemur Sehat Badan Nikmat — Tonggong Bareng Bahagia Terus!"</strong><br>
              Program rutin jalan pagi, senam ringan, dan peregangan sendi di rumput sintetis hijau Pusdikif Kota Cimahi setiap pukul <strong>07.00 – 08.00 WIB</strong>.
            </p>
            <div class="p-3 bg-light rounded-4 mb-4 border">
              <div class="d-flex align-items-center gap-3">
                <div style="font-size:32px;">☕</div>
                <div>
                  <strong class="text-success fs-5 d-block">HTM Hanya Rp 15.000 / Sesi</strong>
                  <span class="text-muted small">Sudah termasuk <strong>FREE TEH HANGAT</strong> segar dari Kantin Sekar Pusdikif!</span>
                </div>
              </div>
            </div>
            <div class="d-flex flex-wrap gap-3">
              <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20gabung%20sesi%20Kommoto%207-8%20Jemur%20Pagi" target="_blank" class="btn-book" style="background:#059669;">
                Daftar Sesi KOMMOTO 7-8 via WhatsApp
              </a>
              <a href="kontak.html" class="btn-book" style="background:#111827;">
                Cek Lokasi Lapangan
              </a>
            </div>
          </div>
        </div>

        <div class="mabar-intro mb-5">
          <h2 class="text-center mb-4">3 Langkah Mudah Ikut Mabar</h2>
          <div class="mabar-steps">
            <div class="step"><div class="step-num">1</div><div><strong>Pilih Sesi Mabar</strong><p>Tentukan sesi Mabar reguler weekend, mabar prime LED malam, atau sesi KOMMOTO pagi.</p></div></div>
            <div class="step"><div class="step-num">2</div><div><strong>Daftar via WhatsApp</strong><p>Kirim nama kamu langsung ke admin 88 Alpha Sport untuk mengamankan slot bermain.</p></div></div>
            <div class="step"><div class="step-num">3</div><div><strong>Datang & Main Santai</strong><p>Bawa sepatu futsal/turf. Rompi, wasit, dan bola FIFA resmi sudah kami siapkan!</p></div></div>
          </div>
        </div>

        <div class="sessions-section">
          <h2>Pilihan Sesi Komunitas Terbuka</h2>
          <div class="sessions-grid">
            
            <div class="session-card" style="border-top: 4px solid #059669;">
              <div class="session-time">Setiap Pagi, 07:00 – 08:00 WIB</div>
              <h3>KOMMOTO 7-8: Jemur Pagi Sehat</h3>
              <p>Jemur sehat, senam sendi, jalan santai di rumput hijau. HTM Rp 15.000 Free Teh Hangat Kantin Sekar!</p>
              <div class="session-slots">Terbuka Untuk Umum & Senior</div>
              <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20gabung%20sesi%20Kommoto%207-8%20Jemur%20Pagi" target="_blank" class="btn-book" style="background:#059669;">Daftar KOMMOTO</a>
            </div>

            <div class="session-card" style="border-top: 4px solid #B91C1C;">
              <div class="session-time">Sabtu & Minggu, 16:00 – 18:00 WIB</div>
              <h3>Mabar Weekend Fun Football</h3>
              <p>Match santai 7v7 / 8v8. Free rompi tim 2 warna, bola FIFA, wasit, dan dokumentasi foto pertandingan.</p>
              <div class="session-slots">Slot Terbatas 24 Pemain</div>
              <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20daftar%20Mabar%20Weekend" target="_blank" class="btn-book">Daftar Mabar Weekend</a>
            </div>

            <div class="session-card" style="border-top: 4px solid #D97706;">
              <div class="session-time">Rabu & Jumat Malam, 19:00 – 21:00 WIB</div>
              <h3>Mabar Night Prime LED</h3>
              <p>Sensasi tanding malam hari di bawah lampu sorot LED stadion 800+ Lux yang benderang tanpa silau.</p>
              <div class="session-slots">Slot Terbatas 22 Pemain</div>
              <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20daftar%20Mabar%20Night%20Prime" target="_blank" class="btn-book" style="background:#D97706;">Daftar Mabar Malam</a>
            </div>

          </div>
        </div>
        '''
    },
    'partner.html': {
        'title': 'Kemitraan Sekolah & Content Creator — Mini Soccer 88 Alpha Sport',
        'heading': 'Program Kemitraan & Proposal Fasilitas',
        'sub': 'Partner terbaik sekolah SD, SMP, SMA/SMK, instansi, dan kolaborasi bersama content creator di Kota Cimahi.',
        'icon': SVG['handshake'],
        'color': '#B91C1C',
        'content': f'''
        <!-- Official Posters Grid -->
        <div class="row g-4 mb-5">
          <div class="col-md-6 col-lg-4 text-center">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <a href="assets/promo/poster-ekskul-sekolah.jpg" target="_blank">
                <img src="assets/promo/poster-ekskul-sekolah.jpg" alt="Partner Terbaik Sekolah" class="img-fluid" style="height:360px; width:100%; object-fit:cover;">
              </a>
              <div class="p-3 bg-white">
                <h6 class="fw-bold mb-1">Partner Terbaik Sekolahmu</h6>
                <small class="text-muted d-block mb-2">Ekskul PJOK, Beladiri, Senam & Wisuda Outdoor</small>
                <a href="assets/promo/poster-ekskul-sekolah.jpg" target="_blank" class="btn btn-sm btn-outline-danger rounded-pill fw-bold">Lihat Poster Penuh ↗</a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 text-center">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <a href="assets/promo/poster-proposal-sekolah.jpg" target="_blank">
                <img src="assets/promo/poster-proposal-sekolah.jpg" alt="Proposal Pemanfaatan Fasilitas" class="img-fluid" style="height:360px; width:100%; object-fit:cover;">
              </a>
              <div class="p-3 bg-white">
                <h6 class="fw-bold mb-1">Proposal Pemanfaatan Fasilitas</h6>
                <small class="text-muted d-block mb-2">Profil fasilitas, sasaran, jam pemanfaatan & tata tertib</small>
                <a href="assets/promo/poster-proposal-sekolah.jpg" target="_blank" class="btn btn-sm btn-outline-danger rounded-pill fw-bold">Lihat Brosur Infografis ↗</a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 text-center">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <a href="assets/promo/poster-content-creator.jpg" target="_blank">
                <img src="assets/promo/poster-content-creator.jpg" alt="Kerjasama Content Creator" class="img-fluid" style="height:360px; width:100%; object-fit:cover;">
              </a>
              <div class="p-3 bg-white">
                <h6 class="fw-bold mb-1">Kerjasama Content Creator</h6>
                <small class="text-muted d-block mb-2">Akses lapangan gratis untuk video reels/TikTok/YouTube</small>
                <a href="assets/promo/poster-content-creator.jpg" target="_blank" class="btn btn-sm btn-outline-danger rounded-pill fw-bold">Lihat Ketentuan ↗</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Download Proposal PDF Card -->
        <div class="p-4 p-md-5 rounded-4 mb-5 text-white" style="background: linear-gradient(135deg, #111827 0%, #1F2937 50%, #991B1B 100%);">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <span class="badge bg-warning text-dark px-3 py-1 rounded-pill fw-bold mb-2">DOKUMEN RESMI</span>
              <h3 class="fw-bold text-white mb-2">Download Surat Penawaran & Proposal Pusdikif</h3>
              <p class="text-white-50 mb-0" style="line-height:1.6;">
                Dapatkan berkas PDF resmi penawaran kerjasama sewa lapangan, rincian fasilitas, dan ketentuan kerjasama pemanfaatan venue di kawasan Pusdikif Cimahi.
              </p>
            </div>
            <div class="col-lg-4 mt-3 mt-lg-0 text-lg-end">
              <a href="assets/docs/Quotation_Alpha_Sport_Pusdikif.pdf" download class="btn btn-warning text-dark fw-bold px-4 py-3 rounded-pill d-inline-flex align-items-center gap-2">
                {SVG['download']} Unduh Proposal PDF (Resmi)
              </a>
            </div>
          </div>
        </div>

        <div class="partner-benefits">
          <h2>Pemanfaatan Fasilitas Lapangan Mini Soccer 88</h2>
          <div class="benefit-grid">
            <div class="benefit-card">
              <div class="benefit-icon">{SVG['stadium']}</div>
              <h3>Ekstrakurikuler Sekolah</h3>
              <p>Pemanfaatan Senin – Jumat (07.00 – 15.00 WIB) untuk Mini Soccer, PJOK, Senam, Atletik Ringan, Silat, Karate & Taekwondo.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">{SVG['trophy']}</div>
              <h3>Wisuda & Event Sekolah</h3>
              <p>Tempat ideal untuk Wisuda Outdoor Play Group, PAUD, TK, Acara Ulang Tahun, dan Gathering Komunitas di alam terbuka.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">{SVG['camera']}</div>
              <h3>Fotografer GERAK</h3>
              <p>Paket dokumentasi foto profesional dari partner resmi GERAK Content Creator untuk mengabadikan performa tim.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">{SVG['bullhorn']}</div>
              <h3>Kolaborasi Kreator</h3>
              <p>Akses lapangan gratis bagi content creator, youtuber, tiktoker, dan influencer untuk pembuatan konten kreatif.</p>
            </div>
          </div>
        </div>

        <div class="booking-form-section">
          <h2>Ajukan Minat Kerjasama Sekolah / Brand</h2>
          <p>Hubungi admin kemitraan kami untuk proposal resmi dan konsultasi jadwal pemanfaatan lapangan.</p>
          <div class="d-flex flex-wrap gap-3">
            <a href="https://wa.me/6281295679799?text=Halo%20Admin%2088%20Alpha%20Sport,%20saya%20ingin%20mengajukan%20Proposal%20Kemitraan%20Sekolah" target="_blank" class="btn-book" style="font-size:16px; padding:14px 28px;">
              Hubungi Admin Kemitraan (0812-9567-9799)
            </a>
            <a href="https://wa.me/628882133345?text=Halo%20Admin%20Giefran,%20saya%20ingin%20tanya%20skema%20kerjasama%20lapangan" target="_blank" class="btn-book" style="background:#111827; font-size:16px; padding:14px 28px;">
              Admin Giefran (0888-2133-345)
            </a>
          </div>
        </div>
        '''
    },
    'kompetisi.html': {
        'title': 'Dokumentasi GERAK & Jadwal Kompetisi — Mini Soccer 88 Alpha Sport',
        'heading': 'Dokumentasi Fotografer & Kompetisi',
        'sub': 'Jasa fotografer resmi GERAK Content Creator dan agenda liga pertandingan di Mini Soccer 88 Alpha Sport Pusdikif.',
        'icon': SVG['trophy'],
        'color': '#B91C1C',
        'content': f'''
        <!-- Photographer Section with Official Poster -->
        <div class="row g-4 mb-5 align-items-center">
          <div class="col-lg-5 text-center">
            <a href="assets/promo/poster-fotografer.jpg" target="_blank" title="Klik untuk memperbesar poster fotografer">
              <img src="assets/promo/poster-fotografer.jpg" alt="Poster GERAK Fotografer" class="img-fluid rounded-4 shadow" style="max-height:480px; object-fit:contain; border:2px solid #E5E7EB; transition:transform 0.2s;">
            </a>
            <small class="text-muted d-block mt-2">🔍 Klik poster fotografer untuk resolusi penuh</small>
          </div>
          
          <div class="col-lg-7">
            <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3">OFFICIAL DOCUMENTATION PARTNER</span>
            <h2 class="fw-bold mb-2">GERAK Present: Jasa Fotografer Pertandingan</h2>
            <p class="text-secondary mb-3" style="line-height:1.7;">
              Abadikan setiap momen aksi terbaik tim kamu bersama partner resmi kami <strong>GERAK Content Creator</strong> (@gerak.tangkap.abadikan). Foto jernih, tajam, penuh warna, dan dikirim cepat via link Google Drive.
            </p>
            
            <div class="p-3 bg-light rounded-4 border mb-4">
              <div class="row g-2 text-center">
                <div class="col-4">
                  <div class="p-2 border rounded-3 bg-white">
                    <strong class="d-block text-dark">Paket Basic</strong>
                    <span class="text-danger fw-bold fs-6">Rp 300.000</span>
                    <small class="text-muted d-block" style="font-size:11px;">100+ Foto Match</small>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-2 border rounded-3 bg-warning bg-opacity-25 border-warning">
                    <strong class="d-block text-dark">Best Choice ⭐</strong>
                    <span class="text-danger fw-bold fs-6">Rp 450.000</span>
                    <small class="text-muted d-block" style="font-size:11px;">150+ Foto + Tim</small>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-2 border rounded-3 bg-white">
                    <strong class="d-block text-dark">Paket Premium</strong>
                    <span class="text-danger fw-bold fs-6">Rp 600.000</span>
                    <small class="text-muted d-block" style="font-size:11px;">200+ & Highlight</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-wrap gap-3">
              <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20pesan%20Paket%20Dokumentasi%20Fotografer%20GERAK" target="_blank" class="btn-book" style="background:#D97706;">
                Pesan Fotografer GERAK via WhatsApp
              </a>
              <a href="https://instagram.com/gerak.tangkap.abadikan" target="_blank" class="btn-book" style="background:#111827;">
                Instagram: @gerak.tangkap.abadikan
              </a>
            </div>
          </div>
        </div>

        <!-- Weekly Schedule & Tournament Section -->
        <div class="row g-4 mb-5">
          <div class="col-lg-6">
            <div class="comp-card h-100">
              <div class="court-img position-relative" style="height:260px; overflow:hidden;">
                <img src="assets/promo/poster-jadwal-week2.jpg" alt="Weekly Schedule Poster" style="width:100%; height:100%; object-fit:cover; object-position:top;">
                <span class="badge bg-danger position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill fw-bold">Jadwal September 2026</span>
              </div>
              <div class="comp-info">
                <h3>Jadwal Mingguan & Friendly Match</h3>
                <p>Lihat tim-tim aktif yang bertanding setiap minggu: Sparta FC, CFA, Loyor FC, Bianda FC, Woules FC, Sang Mantan FC, dan puluhan klub lainnya.</p>
                <div class="d-flex gap-2">
                  <a href="/#scheduleTableBody" class="btn-book btn-sm">Lihat Tabel Jadwal Live</a>
                  <a href="assets/promo/poster-jadwal-week2.jpg" target="_blank" class="btn btn-sm btn-outline-secondary rounded-pill fw-bold">Buka Poster ↗</a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="comp-card h-100">
              <div class="court-img position-relative" style="height:260px; overflow:hidden;">
                <img src="assets/promo/sample-invoice-member.jpg" alt="Member Booking Transparency" style="width:100%; height:100%; object-fit:cover;">
                <span class="badge bg-success position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill fw-bold">Diskon Member 10%</span>
              </div>
              <div class="comp-info">
                <h3>Sistem Booking & Diskon Klub Anggota</h3>
                <p>Transparansi perhitungan sewa untuk klub yang mengambil paket 4 pekan rutin. Potongan langsung 10% dan slot jadwal prioritas.</p>
                <div class="d-flex gap-2">
                  <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20daftar%20Paket%20Member%20Klub%204x%20Match" target="_blank" class="btn-book btn-sm" style="background:#059669;">Daftar Paket Member</a>
                  <a href="assets/promo/sample-invoice-member.jpg" target="_blank" class="btn btn-sm btn-outline-secondary rounded-pill fw-bold">Lihat Contoh Invoice ↗</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        '''
    },
    'venue-management.html': {
        'title': 'Fasilitas Venue — Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi',
        'heading': 'Fasilitas Venue Lapangan Pusdikif',
        'sub': 'Spesifikasi teknis lapangan rumput sintetis 30x50m standar internasional dan fasilitas terpadu di kawasan militer Pusdikif.',
        'icon': SVG['building'],
        'color': '#B91C1C',
        'content': f'''
        <div class="vm-features">
          <div class="vm-list">
            <h2>Spesifikasi Teknis & Standar Fasilitas</h2>
            <div class="vm-item"><div class="vm-icon">{SVG['stadium']}</div><div><strong>Dimensi Lapangan 30 x 50 Meter</strong><p>Ukuran ideal untuk match 7 vs 7 atau 8 vs 8 dengan sirkulasi udara sejuk pegunungan Cimahi.</p></div></div>
            <div class="vm-item"><div class="vm-icon">{SVG['soccer']}</div><div><strong>Rumput Sintetis Monofilament 50mm</strong><p>Bantalan karet lentur & pasir silika merata standar FIFA, minim risiko cedera dan lecet pemain.</p></div></div>
            <div class="vm-item"><div class="vm-icon">{SVG['clock']}</div><div><strong>Pencahayaan LED Stadium 800+ Lux</strong><p>Lampu sorot malam super benderang tanpa sudut silau, siap untuk pertandingan malam berstandar tinggi.</p></div></div>
            <div class="vm-item"><div class="vm-icon">{SVG['building']}</div><div><strong>Fasilitas Terpadu Pusdikif</strong><p>Musholla tepat di sisi lapangan (Masjid A.H. Nasution), Kantin Sekar, ruang ganti, toilet bersih, dan keamanan militer 24 jam.</p></div></div>
          </div>
          <div>
            <img src="assets/img/venue/field-night-floodlight.jpg" alt="Venue Pusdikif Malam Hari" style="width:100%; border-radius:16px; box-shadow:0 8px 24px rgba(0,0,0,0.12);">
          </div>
        </div>

        <h2 class="mb-4">Galeri Lengkap Dokumentasi Foto Lapangan</h2>
        <div class="row g-4 mb-5">
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img src="assets/img/venue/field-night-ball-fifa.jpg" alt="Rumput & Bola FIFA" style="height:220px; width:100%; object-fit:cover;">
              <div class="p-3 bg-white">
                <strong class="d-block mb-1">Rumput Monofilament & Bola FIFA</strong>
                <small class="text-muted">Serat rumput berkualitas tinggi dengan bola resmi standar FIFA.</small>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img src="assets/img/venue/field-day-center.jpg" alt="Lingkaran Tengah Siang Hari" style="height:220px; width:100%; object-fit:cover;">
              <div class="p-3 bg-white">
                <strong class="d-block mb-1">Lingkaran Tengah & Tiang Gawang</strong>
                <small class="text-muted">Garis lapangan presisi dengan latar belakang Aula A.H. Nasution.</small>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img src="assets/img/venue/field-tribun-dugout.jpg" alt="Tribun & Dugout" style="height:220px; width:100%; object-fit:cover;">
              <div class="p-3 bg-white">
                <strong class="d-block mb-1">Dugout Pemain & Tribun Mini</strong>
                <small class="text-muted">Tempat duduk teduh beratap untuk pemain cadangan dan official tim.</small>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img src="assets/img/venue/field-panorama-mosque.jpg" alt="Musholla Lapangan" style="height:220px; width:100%; object-fit:cover;">
              <div class="p-3 bg-white">
                <strong class="d-block mb-1">Musholla di Sisi Lapangan</strong>
                <small class="text-muted">Memudahkan sholat tepat waktu tanpa perlu keluar area venue.</small>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img src="assets/img/venue/field-day-wide.jpg" alt="Ukuran 30x50m" style="height:220px; width:100%; object-fit:cover;">
              <div class="p-3 bg-white">
                <strong class="d-block mb-1">Sudut Lebar Lapangan 30 × 50 M</strong>
                <small class="text-muted">Dikelilingi jaring pengaman tinggi dan suasana kompleks militer aman.</small>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img src="assets/img/venue/field-day-perspective.jpg" alt="Perspektif Gawang" style="height:220px; width:100%; object-fit:cover;">
              <div class="p-3 bg-white">
                <strong class="d-block mb-1">Perspektif Gawang & Garis Samping</strong>
                <small class="text-muted">Kerapian jaring dan pembatas lapangan terjaga prima setiap hari.</small>
              </div>
            </div>
          </div>
        </div>
        '''
    },
    'kontak.html': {
        'title': 'Kontak & Lokasi — Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi',
        'heading': 'Kontak & Lokasi Venue',
        'sub': 'Hubungi admin resmi Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi via WhatsApp atau kunjungi langsung venue kami.',
        'icon': SVG['phone'],
        'color': '#B91C1C',
        'content': f'''
        <div class="contact-grid">
          <div class="contact-info-col">
            <h2>Informasi Kontak Resmi</h2>
            <div id="contactData">
              <div class="contact-item"><div class="contact-icon">{SVG['pin']}</div><div><strong>Alamat Resmi Venue</strong><p id="cAlamatDisplay">Kompleks Militer Lapangan Pusdikif Kodiklatad, Jalan Gatot Subroto, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40523</p></div></div>
              <div class="contact-item"><div class="contact-icon">{SVG['chat']}</div><div><strong>WhatsApp Admin Utama</strong><p id="cWaDisplay"><a href="https://wa.me/6281295679799" target="_blank" style="color:#B91C1C;font-weight:bold;">0812-9567-9799 (Admin 88 Alpha Sport)</a></p></div></div>
              <div class="contact-item"><div class="contact-icon">{SVG['chat']}</div><div><strong>WhatsApp Admin Cadangan</strong><p><a href="https://wa.me/628882133345" target="_blank" style="color:#B91C1C;font-weight:bold;">0888-2133-345 (Admin Giefran)</a></p></div></div>
              <div class="contact-item"><div class="contact-icon">{SVG['mail']}</div><div><strong>Email Kemitraan & Event</strong><p id="cEmailDisplay">alphasport88cimahi@gmail.com</p></div></div>
              <div class="contact-item"><div class="contact-icon">{SVG['clock']}</div><div><strong>Jam Operasional Lapangan</strong><p id="cJamDisplay">Setiap Hari 06:00 – 23:00 WIB</p></div></div>
            </div>
            
            <div class="sosmed-row mt-4">
              <a href="https://instagram.com/88alphasport" target="_blank" class="sm-badge"><span class="sm-icon">{SVG['instagram']}</span> Instagram: @88alphasport</a>
              <a href="https://tiktok.com/@88alphasport" target="_blank" class="sm-badge"><span class="sm-icon">{SVG['tiktok']}</span> TikTok: @88alphasport</a>
            </div>
          </div>

          <div class="contact-form-col">
            <h2>Lokasi Lapangan di Pusdikif</h2>
            <div class="p-3 bg-white rounded-3 shadow-sm border mb-3">
              <div class="mb-3" style="border-radius:10px; overflow:hidden;">
                <img src="assets/img/venue/field-day-wide.jpg" alt="Gerbang Masuk Lapangan Pusdikif" style="width:100%; height:140px; object-fit:cover;">
              </div>
              <p class="small text-muted mb-2">Terletak di area Pusat Pendidikan Infanteri (Pusdikif) Kodiklatad, Jl. Gatot Subroto Kota Cimahi. Akses jalan lebar, pos jaga militer aman, dan parkiran luas.</p>
              <div style="height:240px; background:#e5e7eb; border-radius:12px; overflow:hidden;">
                <iframe src="https://maps.google.com/maps?q=Pusdikif+Cimahi&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
              </div>
            </div>
            <a href="https://maps.google.com/?q=Pusdikif+Cimahi" target="_blank" class="btn-submit w-100 text-center text-decoration-none">
              Buka Rute di Google Maps
            </a>
          </div>
        </div>
        '''
    },
    'blog.html': {
        'title': 'Blog & Artikel — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Berita & Seputar Mini Soccer 88',
        'sub': 'Informasi terbaru seputar jadwal, tips olahraga, dan event di Mini Soccer 88 Alpha Sport Pusdikif.',
        'icon': SVG['newspaper'],
        'color': '#B91C1C',
        'content': f'''
        <div class="page-grid" id="dynamicBlogGrid"></div>
        <div class="page-grid">
          <div class="court-card">
            <div class="court-img" style="height:180px; overflow:hidden;">
              <img src="assets/promo/poster-ekskul-sekolah.jpg" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="court-info">
              <h3>Program Kemitraan Sekolah Dibuka!</h3>
              <p>Mini Soccer 88 membuka kesempatan bagi sekolah-sekolah di Kota Cimahi untuk memanfaatkan fasilitas lapangan.</p>
              <a href="partner.html" class="btn-book btn-sm">Baca Selengkapnya</a>
            </div>
          </div>
          <div class="court-card">
            <div class="court-img" style="height:180px; overflow:hidden;">
              <img src="assets/promo/poster-kommoto.jpg" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="court-info">
              <h3>KOMMOTO 7-8: Jemur Sehat Tiap Pagi</h3>
              <p>Komunitas Moe Tonggong hadir setiap pagi pukul 07.00 - 08.00 WIB. Badan bugar dan free teh hangat Kantin Sekar!</p>
              <a href="main-bareng.html" class="btn-book btn-sm">Baca Selengkapnya</a>
            </div>
          </div>
          <div class="court-card">
            <div class="court-img" style="height:180px; overflow:hidden;">
              <img src="assets/promo/poster-fotografer.jpg" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="court-info">
              <h3>Jasa Fotografer Pertandingan GERAK</h3>
              <p>Abadikan setiap momen aksi pertandingan tim kamu dengan foto jernih dan penuh warna bersama partner resmi kami.</p>
              <a href="kompetisi.html" class="btn-book btn-sm">Baca Selengkapnya</a>
            </div>
          </div>
        </div>
        '''
    }
}

SHARED_CSS = """
  body { font-family: 'Rubik', sans-serif; background: #f8f9fa; color: #1a1d23; margin: 0; }
  *,*::before,*::after{box-sizing:border-box;}
  header { background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.08); position: sticky; top:0; z-index:100; }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display:flex; align-items:center; justify-content:space-between; height:70px; }
  .nav-logo { display:flex; align-items:center; gap:10px; text-decoration:none; }
  .nav-logo img { height:48px; width:auto; object-fit:contain; }
  .nav-links { display:flex; gap:20px; align-items:center; }
  .nav-links a { text-decoration:none; color:#374151; font-size:14px; font-weight:600; transition:color 0.18s; }
  .nav-links a:hover { color:#B91C1C; }
  .nav-back { font-size:13.5px; color:#B91C1C; font-weight:700; text-decoration:none; display:flex; align-items:center; gap:6px; background:rgba(185,28,28,0.08); padding:6px 14px; border-radius:100px; }
  
  /* Location Bar */
  .ms88-location-bar {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1.5px solid #e5e7eb;
    border-radius: 100px; padding: 6px 14px;
    font-size: 13.5px; color: #374151; font-weight: 500;
    cursor: pointer; transition: border-color 0.18s, box-shadow 0.18s;
  }
  .ms88-location-bar:hover { border-color: #B91C1C; box-shadow: 0 0 0 3px rgba(185,28,28,0.08); }
  .geo-pin { display: inline-flex; align-items: center; color: #B91C1C; }
  .geo-pin svg { width: 15px; height: 15px; }

  /* Hero Section */
  .page-hero { background: linear-gradient(135deg, #111827 0%, #1F2937 60%, #991B1B 100%); color:#fff; padding:60px 24px; text-align:center; }
  .page-hero .icon {
    width: 60px; height: 60px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    color: #F59E0B;
  }
  .page-hero .icon svg { width: 30px; height: 30px; }
  .page-hero h1 { font-size:32px; font-weight:800; margin:0 0 10px; }
  .page-hero p { font-size:15px; color:rgba(255,255,255,0.85); max-width:620px; margin:0 auto; }
  .page-content { max-width:1200px; margin:0 auto; padding:48px 24px; }

  /* Cards / Grid */
  .page-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:24px; margin-bottom:48px; }
  .court-card,.comp-card { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.07); border:1px solid #E5E7EB; }
  .court-info,.comp-info { padding:22px; }
  .court-info h3,.comp-info h3 { font-size:19px; font-weight:700; margin:0 0 8px; color:#111827; }
  .court-info p,.comp-info p { font-size:13.5px; color:#6b7280; margin:0 0 14px; line-height:1.6; }
  .court-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px; }
  .court-tags span { background:rgba(185,28,28,0.08); color:#B91C1C; padding:4px 10px; border-radius:100px; font-size:12px; font-weight:600; }
  .comp-badge { display:inline-block; background:rgba(185,28,28,0.08); color:#B91C1C; padding:4px 10px; border-radius:100px; font-size:11px; font-weight:700; margin-bottom:8px; }
  .comp-badge-open { background:#d1fae5; color:#065f46; }
  .comp-detail { font-size:13px; color:#4b5563; margin-bottom:16px; line-height:1.7; }
  .btn-book { display:inline-block; background:#B91C1C; color:#fff; padding:10px 20px; border-radius:8px; font-size:14px; font-weight:700; text-decoration:none; transition:all 0.18s; }
  .btn-book:hover { background:#991B1B; color:#fff; transform:translateY(-1px); }

  /* Forms */
  .booking-form-section { background:#fff; border-radius:16px; padding:36px; box-shadow:0 2px 12px rgba(0,0,0,0.07); border:1px solid #E5E7EB; }
  .booking-form-section h2 { font-size:22px; font-weight:700; margin:0 0 8px; color:#111827; }
  .booking-form-section > p { font-size:14px; color:#6b7280; margin:0 0 24px; }
  .booking-form { display:flex; flex-direction:column; gap:16px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .form-group { display:flex; flex-direction:column; gap:6px; }
  .form-group label { font-size:13px; font-weight:600; color:#374151; }
  .form-group input,.form-group select,.form-group textarea { padding:10px 12px; border:1px solid #d1d5db; border-radius:8px; font-family:inherit; font-size:14px; outline:none; transition:border-color 0.18s; }
  .form-group input:focus,.form-group select:focus,.form-group textarea:focus { border-color:#B91C1C; box-shadow:0 0 0 3px rgba(185,28,28,0.1); }
  .btn-submit { background:#B91C1C; color:#fff; border:none; padding:13px 26px; border-radius:10px; font-family:inherit; font-size:15px; font-weight:700; cursor:pointer; transition:all 0.18s; box-shadow:0 4px 14px rgba(185,28,28,0.3); align-self:flex-start; }
  .btn-submit:hover { background:#991B1B; transform:translateY(-2px); }

  /* Mabar */
  .mabar-steps { display:flex; flex-direction:column; gap:18px; margin-bottom:36px; }
  .step { display:flex; gap:14px; align-items:flex-start; }
  .step-num { width:34px; height:34px; border-radius:50%; background:#B91C1C; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:15px; flex-shrink:0; }
  .step strong { display:block; font-size:15px; margin-bottom:2px; color:#111827; }
  .step p { font-size:13.5px; color:#6b7280; margin:0; }
  .sessions-section { margin-bottom:40px; }
  .sessions-section h2 { font-size:22px; font-weight:700; margin:0 0 20px; }
  .sessions-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
  .session-card { background:#fff; border-radius:14px; padding:22px; box-shadow:0 2px 10px rgba(0,0,0,0.07); border:1px solid #E5E7EB; }
  .session-time { font-size:12.5px; color:#B91C1C; margin-bottom:6px; font-weight:700; }
  .session-card h3 { font-size:17px; font-weight:700; margin:0 0 8px; color:#111827; }
  .session-card p { font-size:13.5px; color:#6b7280; margin:0 0 12px; line-height:1.5; }
  .session-slots { font-size:12px; color:#065f46; background:#d1fae5; padding:4px 10px; border-radius:100px; display:inline-block; margin-bottom:14px; font-weight:700; }

  /* Partner */
  .partner-benefits { margin-bottom:40px; }
  .partner-benefits h2 { font-size:22px; font-weight:700; margin:0 0 20px; }
  .benefit-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
  .benefit-card { background:#fff; border-radius:14px; padding:22px; box-shadow:0 2px 10px rgba(0,0,0,0.07); border:1px solid #E5E7EB; }
  .benefit-icon { width: 44px; height: 44px; background: rgba(185,28,28,0.08); border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; color: #B91C1C; margin-bottom: 12px; }
  .benefit-icon svg { width: 22px; height: 22px; }
  .benefit-card h3 { font-size:16px; font-weight:700; margin:0 0 8px; color:#111827; }
  .benefit-card p { font-size:13px; color:#6b7280; margin:0; line-height:1.5; }

  /* Venue Mgmt */
  .vm-features { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; margin-bottom:40px; }
  .vm-list h2 { font-size:22px; font-weight:700; margin:0 0 20px; color:#111827; }
  .vm-item { display:flex; gap:14px; margin-bottom:20px; align-items:flex-start; }
  .vm-icon { width: 40px; height: 40px; background: rgba(185,28,28,0.08); border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; color: #B91C1C; flex-shrink: 0; }
  .vm-icon svg { width: 20px; height: 20px; }
  .vm-item strong { display:block; font-size:15px; font-weight:700; margin-bottom:4px; color:#111827; }
  .vm-item p { font-size:13.5px; color:#6b7280; margin:0; }

  /* Contact */
  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
  .contact-info-col h2,.contact-form-col h2 { font-size:22px; font-weight:700; margin:0 0 20px; color:#111827; }
  .contact-item { display:flex; gap:14px; margin-bottom:18px; align-items:flex-start; }
  .contact-icon { width: 36px; height: 36px; background: rgba(185,28,28,0.08); border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; color: #B91C1C; flex-shrink: 0; }
  .contact-icon svg { width: 18px; height: 18px; }
  .contact-item strong { display:block; font-size:14px; font-weight:700; margin-bottom:2px; color:#111827; }
  .contact-item p { font-size:13.5px; color:#4b5563; margin:0; }
  .sosmed-row { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
  .sm-badge { padding:8px 16px; background:#f3f4f6; border-radius:8px; font-size:13px; text-decoration:none; color:#374151; font-weight:600; transition:all 0.18s; display:inline-flex; align-items:center; gap:8px; }
  .sm-badge:hover { background:rgba(185,28,28,0.1); color:#B91C1C; }

  @media(max-width:768px){.page-hero h1{font-size:24px;}.form-row{grid-template-columns:1fr;}.vm-features,.contact-grid{grid-template-columns:1fr;}.nav-links{display:none;}}
"""

SHARED_SCRIPT = """
  function submitBooking(e) {
    e.preventDefault();
    alert('Permintaan terkirim! Admin 88 Alpha Sport akan menghubungi Anda via WhatsApp.');
    e.target.reset();
  }
"""

NAV_HTML = f"""
  <header>
    <nav class="nav-inner">
      <a href="/" class="nav-logo">
        <img src="assets/logo/ms88-logo-transparent.png" alt="Mini Soccer 88 Alpha Sport Logo">
        <div id="ms88LocationBar" class="ms88-location-bar" onclick="GeoMS88.showModal()" style="margin-left:14px;">
          <span class="geo-pin">{SVG['pin']}</span><span class="geo-placeholder">Pusdikif Kota Cimahi</span>
        </div>
      </a>
      <div class="nav-links">
        <a href="sewa-lapangan.html">Sewa Lapangan</a>
        <a href="/#pricelist">Tarif Resmi</a>
        <a href="partner.html">Kemitraan Sekolah</a>
        <a href="main-bareng.html">Komunitas & Mabar</a>
        <a href="kompetisi.html">Dokumentasi GERAK</a>
        <a href="kontak.html">Kontak</a>
      </div>
      <a href="/" class="nav-back">← Kembali ke Beranda</a>
    </nav>
  </header>
"""

BLOG_DYNAMIC_SCRIPT = """
<script>
(function() {
  try {
    const raw = localStorage.getItem('ms88_blogs');
    if (!raw) return;
    const blogs = JSON.parse(raw);
    const pub = blogs.filter(b => b.status === 'published');
    if (pub.length === 0) return;
    const grid = document.getElementById('dynamicBlogGrid');
    if (!grid) return;
    grid.innerHTML = pub.map(b => `
      <div class="court-card">
        ${b.thumb ? `<div class="court-img" style="height:180px; overflow:hidden;"><img src="${b.thumb}" style="width:100%; height:100%; object-fit:cover;"></div>` : ''}
        <div class="court-info">
          <div style="font-size:11px; font-weight:700; color:#B91C1C; text-transform:uppercase; margin-bottom:4px;">${b.category || 'Berita'}</div>
          <h3>${b.title}</h3>
          <p>${b.summary || (b.content ? b.content.slice(0, 120) + '...' : '')}</p>
          <small style="color:#6b7280; font-size:12px; display:block; margin-bottom:12px;">${b.createdAt || ''}</small>
        </div>
      </div>
    `).join('');
  } catch(e) {
    console.warn('Blog dynamic load error:', e);
  }
})();
</script>
"""

for filename, data in PAGES.items():
    extra_script = BLOG_DYNAMIC_SCRIPT if filename == 'blog.html' else ''
    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{data['title']}</title>
<meta name="description" content="{data['sub']}">
<link rel="icon" type="image/png" href="assets/logo/favicon.png">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
{SHARED_CSS}
</style>
</head>
<body>
{NAV_HTML}
<section class="page-hero">
  <div class="icon">{data['icon']}</div>
  <h1>{data['heading']}</h1>
  <p>{data['sub']}</p>
</section>
<main class="page-content">
{data['content']}
</main>
{extra_script}
<script>{SHARED_SCRIPT}</script>
<script src="js/assets-sync.js"></script>
<script src="js/geo.js"></script>
<script>GeoMS88.init();</script>
</body>
</html>"""

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Generated: {filename}')

print('All subpages successfully updated with full ASSET RIQUEST assets!')
