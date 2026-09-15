import os

PAGES = {
    'sewa-lapangan.html': {
        'title': 'Sewa Lapangan — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Sewa Lapangan',
        'sub': 'Lapangan mini soccer berkualitas di Pusdikif Kota Cimahi. Tersedia berbagai pilihan sesi booking harian.',
        'icon': '🏟️',
        'color': '#9E0620',
        'content': '''
        <div class="page-grid">
          <div class="court-card">
            <div class="court-img" style="background:#f0f4ff;display:flex;align-items:center;justify-content:center;font-size:64px;">⚽</div>
            <div class="court-info">
              <h3>Lapangan A</h3>
              <p>Lapangan mini soccer rumput sintetis standar kompetisi</p>
              <div class="court-tags"><span>Rumput Sintetis</span><span>Lampu LED</span><span>4v4 – 7v7</span></div>
              <a href="#booking" class="btn-book">Booking Sekarang</a>
            </div>
          </div>
          <div class="court-card">
            <div class="court-img" style="background:#fff4f0;display:flex;align-items:center;justify-content:center;font-size:64px;">🥅</div>
            <div class="court-info">
              <h3>Lapangan B</h3>
              <p>Lapangan mini soccer indoor dengan permukaan vinyl premium</p>
              <div class="court-tags"><span>Indoor</span><span>Vinyl Premium</span><span>5v5</span></div>
              <a href="#booking" class="btn-book">Booking Sekarang</a>
            </div>
          </div>
        </div>
        <div id="booking" class="booking-form-section">
          <h2>Form Booking Lapangan</h2>
          <p>Isi form berikut untuk memesan lapangan. Tim kami akan menghubungi Anda via WhatsApp.</p>
          <form class="booking-form" onsubmit="submitBooking(event)">
            <div class="form-row">
              <div class="form-group"><label>Nama Lengkap</label><input type="text" placeholder="Nama Anda" required></div>
              <div class="form-group"><label>No. WhatsApp</label><input type="tel" placeholder="+62 8xx-xxxx-xxxx" required></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Pilih Lapangan</label>
                <select required><option value="">-- Pilih --</option><option>Lapangan A</option><option>Lapangan B</option></select>
              </div>
              <div class="form-group"><label>Tanggal</label><input type="date" required></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Jam Mulai</label>
                <select required><option value="">-- Pilih --</option><option>07:00</option><option>08:00</option><option>09:00</option><option>10:00</option><option>13:00</option><option>15:00</option><option>17:00</option><option>19:00</option><option>20:00</option><option>21:00</option></select>
              </div>
              <div class="form-group"><label>Durasi</label>
                <select required><option>1 jam</option><option>2 jam</option><option>3 jam</option></select>
              </div>
            </div>
            <button type="submit" class="btn-submit">Kirim Permintaan Booking</button>
          </form>
        </div>
        '''
    },
    'main-bareng.html': {
        'title': 'Main Bareng — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Main Bareng (Mabar)',
        'sub': 'Cari teman main atau ikuti sesi mabar yang sudah tersedia. Tidak perlu tim penuh!',
        'icon': '👥',
        'color': '#0ea5e9',
        'content': '''
        <div class="mabar-intro">
          <div class="mabar-steps">
            <div class="step"><div class="step-num">1</div><div><strong>Pilih Sesi</strong><p>Lihat jadwal mabar yang tersedia hari ini atau minggu ini.</p></div></div>
            <div class="step"><div class="step-num">2</div><div><strong>Daftar</strong><p>Masukkan nama dan nomor WhatsApp Anda untuk bergabung.</p></div></div>
            <div class="step"><div class="step-num">3</div><div><strong>Datang & Main</strong><p>Datang tepat waktu, pakai sepatu olahraga, dan nikmati permainan!</p></div></div>
          </div>
        </div>
        <div class="sessions-section">
          <h2>Sesi Mabar Tersedia</h2>
          <div id="mabarSessions" class="sessions-grid">
            <div class="session-card">
              <div class="session-time">Sabtu, 07:00 – 09:00</div>
              <h3>Mabar Pagi Santai</h3>
              <p>Lapangan A · 5v5 · Biaya Rp 50.000/orang</p>
              <div class="session-slots">6 slot tersisa</div>
              <a href="#daftar" class="btn-book">Daftar Sekarang</a>
            </div>
            <div class="session-card">
              <div class="session-time">Minggu, 19:00 – 21:00</div>
              <h3>Mabar Malam Kompetitif</h3>
              <p>Lapangan B · 7v7 · Biaya Rp 75.000/orang</p>
              <div class="session-slots">4 slot tersisa</div>
              <a href="#daftar" class="btn-book">Daftar Sekarang</a>
            </div>
          </div>
        </div>
        <div id="daftar" class="booking-form-section">
          <h2>Daftar Sesi Mabar</h2>
          <form class="booking-form" onsubmit="submitBooking(event)">
            <div class="form-row">
              <div class="form-group"><label>Nama Lengkap</label><input type="text" placeholder="Nama Anda" required></div>
              <div class="form-group"><label>No. WhatsApp</label><input type="tel" placeholder="+62 8xx-xxxx-xxxx" required></div>
            </div>
            <div class="form-group"><label>Pilih Sesi</label>
              <select required><option value="">-- Pilih Sesi --</option><option>Mabar Pagi Santai (Sabtu 07:00)</option><option>Mabar Malam Kompetitif (Minggu 19:00)</option></select>
            </div>
            <button type="submit" class="btn-submit">Daftar Sekarang</button>
          </form>
        </div>
        '''
    },
    'blog.html': {
        'title': 'Blog & Artikel — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Blog & Artikel',
        'sub': 'Berita terbaru, tips bermain, dan informasi seputar Mini Soccer 88 Alpha Sport Pusdikif.',
        'icon': '📰',
        'color': '#7c3aed',
        'content': '''
        <div id="blogContainer" class="blog-grid"></div>
        <div id="emptyBlog" class="empty-page">
          <div class="empty-icon">📝</div>
          <h3>Belum ada artikel</h3>
          <p>Admin belum mempublikasikan artikel. Kembali lagi nanti!</p>
        </div>
        <script>
          (function(){
            const blogs = JSON.parse(localStorage.getItem('ms88_blogs') || '[]');
            const pub = blogs.filter(b => b.status === 'published');
            const container = document.getElementById('blogContainer');
            const empty = document.getElementById('emptyBlog');
            if (pub.length === 0) { empty.style.display = 'block'; return; }
            empty.style.display = 'none';
            container.innerHTML = pub.reverse().map(b => `
              <div class="blog-card" onclick="openBlog(${b.id})">
                <div class="blog-card-thumb" style="background-image:url('${b.thumb || ''}');background-color:#f0f0f0;background-size:cover;background-position:center;"></div>
                <div class="blog-card-body">
                  <div class="blog-card-cat">${b.category}</div>
                  <h3>${b.title}</h3>
                  <p>${b.summary || b.content.substring(0,100) + '...'}</p>
                  <div class="blog-card-meta">${b.createdAt}</div>
                </div>
              </div>
            `).join('');
          })();
          function openBlog(id) {
            const blogs = JSON.parse(localStorage.getItem('ms88_blogs') || '[]');
            const b = blogs.find(x => x.id === id);
            if (!b) return;
            document.getElementById('blogContainer').innerHTML = `
              <div class="blog-full">
                ${b.thumb ? '<img src="'+b.thumb+'" style="width:100%;border-radius:12px;margin-bottom:24px;">' : ''}
                <div class="blog-full-cat">${b.category}</div>
                <h1>${b.title}</h1>
                <div class="blog-full-meta">${b.createdAt}</div>
                <div class="blog-full-content">${b.content.replace(/\\n/g,'<br>')}</div>
                <button onclick="location.reload()" style="margin-top:32px;padding:10px 20px;background:#9E0620;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:14px;">← Kembali ke Blog</button>
              </div>
            `;
          }
        </script>
        '''
    },
    'partner.html': {
        'title': 'Partner With Us — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Partner With Us',
        'sub': 'Kolaborasi dengan Mini Soccer 88 Alpha Sport Pusdikif untuk memperluas jangkauan brand Anda ke komunitas olahraga.',
        'icon': '🤝',
        'color': '#059669',
        'content': '''
        <div class="partner-benefits">
          <h2>Keuntungan Bermitra</h2>
          <div class="benefit-grid">
            <div class="benefit-card"><div class="benefit-icon">📣</div><h3>Brand Awareness</h3><p>Ekspos brand Anda kepada ratusan member aktif komunitas olahraga Cimahi.</p></div>
            <div class="benefit-card"><div class="benefit-icon">🎯</div><h3>Target Tepat</h3><p>Jangkau komunitas pecinta olahraga yang aktif dan engaged.</p></div>
            <div class="benefit-card"><div class="benefit-icon">📱</div><h3>Promosi Digital</h3><p>Logo dan info brand Anda tampil di website dan media sosial kami.</p></div>
            <div class="benefit-card"><div class="benefit-icon">🏆</div><h3>Event Sponsor</h3><p>Jadilah sponsor turnamen dan event olahraga komunitas kami.</p></div>
          </div>
        </div>
        <div class="booking-form-section">
          <h2>Hubungi Kami untuk Bermitra</h2>
          <form class="booking-form" onsubmit="submitBooking(event)">
            <div class="form-row">
              <div class="form-group"><label>Nama Penanggung Jawab</label><input type="text" placeholder="Nama Anda" required></div>
              <div class="form-group"><label>Nama Perusahaan / Brand</label><input type="text" placeholder="PT. Nama Perusahaan" required></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Email</label><input type="email" placeholder="email@company.com" required></div>
              <div class="form-group"><label>No. WhatsApp</label><input type="tel" placeholder="+62 8xx-xxxx-xxxx" required></div>
            </div>
            <div class="form-group"><label>Jenis Kerjasama yang Diinginkan</label>
              <select><option>Sponsor Event/Turnamen</option><option>Iklan di Website</option><option>Co-Branding</option><option>Lainnya</option></select>
            </div>
            <div class="form-group"><label>Pesan / Proposal Singkat</label><textarea placeholder="Ceritakan ide kerjasama Anda..." rows="4"></textarea></div>
            <button type="submit" class="btn-submit">Kirim Proposal</button>
          </form>
        </div>
        '''
    },
    'venue-management.html': {
        'title': 'Venue Management — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Kelola Venue Lebih Praktis',
        'sub': 'Sistem manajemen venue terintegrasi untuk memaksimalkan pendapatan lapangan Anda.',
        'icon': '🏢',
        'color': '#d97706',
        'content': '''
        <div class="vm-features">
          <div class="vm-feature">
            <img src="/assets/img/venue-preview.webp" alt="Venue Preview" style="width:100%;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.1);">
          </div>
          <div class="vm-list">
            <h2>Fitur Unggulan</h2>
            <div class="vm-item"><div class="vm-icon">📅</div><div><strong>Jadwal Booking Online</strong><p>Pelanggan bisa booking kapan saja via website tanpa perlu telepon.</p></div></div>
            <div class="vm-item"><div class="vm-icon">💰</div><div><strong>Laporan Omset Real-time</strong><p>Pantau pendapatan harian, mingguan, dan bulanan secara langsung.</p></div></div>
            <div class="vm-item"><div class="vm-icon">🔒</div><div><strong>Kelola Slot Fleksibel</strong><p>Kunci slot untuk maintenance atau event khusus dengan mudah.</p></div></div>
            <div class="vm-item"><div class="vm-icon">📊</div><div><strong>Analitik Hunian</strong><p>Lihat tingkat hunian lapangan dan optimalkan jadwal operasional.</p></div></div>
          </div>
        </div>
        <div class="booking-form-section" style="max-width:600px;margin:48px auto 0;">
          <h2>Daftarkan Venue Anda</h2>
          <form class="booking-form" onsubmit="submitBooking(event)">
            <div class="form-group"><label>Nama Venue</label><input type="text" placeholder="Nama lapangan Anda" required></div>
            <div class="form-group"><label>Alamat</label><textarea placeholder="Alamat lengkap venue" rows="2"></textarea></div>
            <div class="form-row">
              <div class="form-group"><label>Nama PIC</label><input type="text" placeholder="Nama penanggung jawab" required></div>
              <div class="form-group"><label>No. WhatsApp</label><input type="tel" placeholder="+62 8xx-xxxx-xxxx" required></div>
            </div>
            <button type="submit" class="btn-submit">Daftar Sekarang</button>
          </form>
        </div>
        '''
    },
    'kompetisi.html': {
        'title': 'Kompetisi — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Kompetisi & Turnamen',
        'sub': 'Ikuti turnamen mini soccer bergengsi dan adu kemampuan tim Anda bersama komunitas olahraga Cimahi.',
        'icon': '🏆',
        'color': '#f59e0b',
        'content': '''
        <div class="page-grid">
          <div class="comp-card">
            <img src="/assets/dummy/new_kompetisi_home1.png" alt="Kompetisi 1" onerror="this.style.display='none'">
            <div class="comp-info">
              <div class="comp-badge">Segera Hadir</div>
              <h3>Mini Soccer Cup 2024</h3>
              <p>Turnamen tahunan antar komunitas se-Kota Cimahi. Format 5v5, hadiah total jutaan rupiah!</p>
              <div class="comp-detail">📅 November 2024 &nbsp;|&nbsp; 🏟 Lapangan A & B</div>
              <a href="#daftar-tim" class="btn-book">Daftarkan Tim</a>
            </div>
          </div>
          <div class="comp-card">
            <img src="/assets/dummy/new_kompetisi_home2.png" alt="Kompetisi 2" onerror="this.style.display='none'">
            <div class="comp-info">
              <div class="comp-badge comp-badge-open">Pendaftaran Buka</div>
              <h3>Alpha Sport League</h3>
              <p>Liga internal bulanan khusus member Mini Soccer 88. Berlangsung setiap akhir bulan.</p>
              <div class="comp-detail">📅 Setiap Bulan &nbsp;|&nbsp; 🏟 Semua Lapangan</div>
              <a href="#daftar-tim" class="btn-book">Daftarkan Tim</a>
            </div>
          </div>
        </div>
        <div id="daftar-tim" class="booking-form-section">
          <h2>Daftarkan Tim Anda</h2>
          <form class="booking-form" onsubmit="submitBooking(event)">
            <div class="form-row">
              <div class="form-group"><label>Nama Tim</label><input type="text" placeholder="Nama tim Anda" required></div>
              <div class="form-group"><label>Pilih Kompetisi</label>
                <select required><option value="">-- Pilih --</option><option>Mini Soccer Cup 2024</option><option>Alpha Sport League</option></select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Nama Kapten</label><input type="text" placeholder="Nama kapten" required></div>
              <div class="form-group"><label>No. WhatsApp Kapten</label><input type="tel" placeholder="+62 8xx-xxxx-xxxx" required></div>
            </div>
            <div class="form-group"><label>Jumlah Pemain</label><input type="number" placeholder="Minimal 7 pemain" min="7" max="15"></div>
            <button type="submit" class="btn-submit">Daftarkan Tim</button>
          </form>
        </div>
        '''
    },
    'kontak.html': {
        'title': 'Kontak — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Hubungi Kami',
        'sub': 'Punya pertanyaan? Kami siap membantu Anda.',
        'icon': '📞',
        'color': '#0ea5e9',
        'content': '''
        <div class="contact-grid">
          <div class="contact-info-col">
            <h2>Informasi Kontak</h2>
            <div id="contactData">
              <div class="contact-item"><div class="contact-icon">📍</div><div><strong>Alamat</strong><p id="cAlamatDisplay">Pusdikif, Kota Cimahi, Jawa Barat</p></div></div>
              <div class="contact-item"><div class="contact-icon">📞</div><div><strong>Telepon</strong><p id="cTelpDisplay">Hubungi via WhatsApp</p></div></div>
              <div class="contact-item"><div class="contact-icon">💬</div><div><strong>WhatsApp</strong><p id="cWaDisplay">-</p></div></div>
              <div class="contact-item"><div class="contact-icon">📧</div><div><strong>Email</strong><p id="cEmailDisplay">-</p></div></div>
              <div class="contact-item"><div class="contact-icon">🕐</div><div><strong>Jam Operasional</strong><p id="cJamDisplay">07:00 – 23:00 WIB (Setiap Hari)</p></div></div>
            </div>
            <div class="sosmed-row" id="sosmedRow"></div>
          </div>
          <div class="contact-form-col">
            <h2>Kirim Pesan</h2>
            <form class="booking-form" onsubmit="submitBooking(event)">
              <div class="form-group"><label>Nama</label><input type="text" placeholder="Nama Anda" required></div>
              <div class="form-group"><label>No. WhatsApp / Email</label><input type="text" placeholder="Kontak Anda" required></div>
              <div class="form-group"><label>Subjek</label><input type="text" placeholder="Subjek pesan" required></div>
              <div class="form-group"><label>Pesan</label><textarea placeholder="Tulis pesan Anda..." rows="5" required></textarea></div>
              <button type="submit" class="btn-submit">Kirim Pesan</button>
            </form>
          </div>
        </div>
        <script>
          (function(){
            const c = JSON.parse(localStorage.getItem('ms88_contact') || '{}');
            const sm = JSON.parse(localStorage.getItem('ms88_sosmed') || '{}');
            if (c.alamat) document.getElementById('cAlamatDisplay').textContent = c.alamat;
            if (c.telp)   document.getElementById('cTelpDisplay').textContent   = c.telp;
            if (c.wa)     document.getElementById('cWaDisplay').textContent     = c.wa;
            if (c.email)  document.getElementById('cEmailDisplay').textContent  = c.email;
            if (c.jam)    document.getElementById('cJamDisplay').textContent    = c.jam;
            const links = [];
            if (sm.instagram) links.push('<a href="https://instagram.com/'+sm.instagram+'" target="_blank" class="sm-badge">📸 Instagram</a>');
            if (sm.tiktok)    links.push('<a href="https://tiktok.com/@'+sm.tiktok+'" target="_blank" class="sm-badge">🎵 TikTok</a>');
            if (sm.facebook)  links.push('<a href="https://facebook.com/'+sm.facebook+'" target="_blank" class="sm-badge">📘 Facebook</a>');
            if (sm.youtube)   links.push('<a href="'+sm.youtube+'" target="_blank" class="sm-badge">▶️ YouTube</a>');
            document.getElementById('sosmedRow').innerHTML = links.join('');
          })();
        </script>
        '''
    },
}

SHARED_CSS = """
  body { font-family: 'Rubik', sans-serif; background: #f8f9fa; color: #1a1d23; margin: 0; }
  *,*::before,*::after{box-sizing:border-box;}
  header { background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.08); position: sticky; top:0; z-index:100; }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display:flex; align-items:center; justify-content:space-between; height:64px; }
  .nav-logo { display:flex; align-items:center; gap:10px; text-decoration:none; }
  .nav-logo img { height:36px; }
  .nav-links { display:flex; gap:24px; }
  .nav-links a { text-decoration:none; color:#52575c; font-size:14px; font-weight:500; transition:color 0.18s; }
  .nav-links a:hover { color:#9E0620; }
  .nav-back { font-size:14px; color:#9E0620; font-weight:600; text-decoration:none; display:flex; align-items:center; gap:6px; }
  .page-hero { background: linear-gradient(135deg, #1a0008 0%, #2d0010 100%); color:#fff; padding:64px 24px; text-align:center; }
  .page-hero .icon { font-size:48px; margin-bottom:16px; }
  .page-hero h1 { font-size:36px; font-weight:700; margin:0 0 12px; }
  .page-hero p { font-size:16px; color:rgba(255,255,255,0.7); max-width:600px; margin:0 auto; }
  .page-content { max-width:1200px; margin:0 auto; padding:48px 24px; }
  /* Cards / Grid */
  .page-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:24px; margin-bottom:48px; }
  .court-card,.comp-card { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.07); }
  .court-img { height:180px; }
  .court-info,.comp-info { padding:20px; }
  .court-info h3,.comp-info h3 { font-size:18px; font-weight:700; margin:0 0 8px; }
  .court-info p,.comp-info p { font-size:13.5px; color:#6b7280; margin:0 0 12px; }
  .court-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px; }
  .court-tags span { background:#fce7e7; color:#9E0620; padding:4px 10px; border-radius:100px; font-size:12px; font-weight:500; }
  .comp-badge { display:inline-block; background:#fce7e7; color:#9E0620; padding:4px 10px; border-radius:100px; font-size:11px; font-weight:700; margin-bottom:8px; }
  .comp-badge-open { background:#d1fae5; color:#065f46; }
  .comp-detail { font-size:12.5px; color:#6b7280; margin-bottom:12px; }
  .btn-book { display:inline-block; background:#9E0620; color:#fff; padding:10px 20px; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none; transition:all 0.18s; }
  .btn-book:hover { background:#7a0419; transform:translateY(-1px); }
  /* Forms */
  .booking-form-section { background:#fff; border-radius:16px; padding:40px; box-shadow:0 2px 12px rgba(0,0,0,0.07); }
  .booking-form-section h2 { font-size:22px; font-weight:700; margin:0 0 8px; }
  .booking-form-section > p { font-size:14px; color:#6b7280; margin:0 0 24px; }
  .booking-form { display:flex; flex-direction:column; gap:16px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .form-group { display:flex; flex-direction:column; gap:6px; }
  .form-group label { font-size:13px; font-weight:500; color:#4b5563; }
  .form-group input,.form-group select,.form-group textarea { padding:10px 12px; border:1px solid #e5e7eb; border-radius:8px; font-family:inherit; font-size:14px; outline:none; transition:border-color 0.18s; }
  .form-group input:focus,.form-group select:focus,.form-group textarea:focus { border-color:#9E0620; box-shadow:0 0 0 3px rgba(158,6,32,0.1); }
  .form-group textarea { resize:vertical; min-height:80px; }
  .btn-submit { background:linear-gradient(135deg,#9E0620,#dc2643); color:#fff; border:none; padding:14px 28px; border-radius:10px; font-family:inherit; font-size:15px; font-weight:600; cursor:pointer; transition:all 0.18s; box-shadow:0 4px 14px rgba(158,6,32,0.3); align-self:flex-start; }
  .btn-submit:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(158,6,32,0.4); }
  /* Mabar */
  .mabar-steps { display:flex; flex-direction:column; gap:20px; margin-bottom:40px; }
  .step { display:flex; gap:16px; align-items:flex-start; }
  .step-num { width:36px; height:36px; border-radius:50%; background:#9E0620; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px; flex-shrink:0; }
  .step strong { display:block; font-size:16px; margin-bottom:4px; }
  .step p { font-size:14px; color:#6b7280; margin:0; }
  .sessions-section { margin-bottom:40px; }
  .sessions-section h2 { font-size:22px; font-weight:700; margin:0 0 20px; }
  .sessions-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
  .session-card { background:#fff; border-radius:12px; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.07); border-top:4px solid #9E0620; }
  .session-time { font-size:12.5px; color:#6b7280; margin-bottom:6px; font-weight:500; }
  .session-card h3 { font-size:16px; font-weight:700; margin:0 0 8px; }
  .session-card p { font-size:13.5px; color:#6b7280; margin:0 0 10px; }
  .session-slots { font-size:12.5px; color:#065f46; background:#d1fae5; padding:4px 10px; border-radius:100px; display:inline-block; margin-bottom:14px; font-weight:600; }
  /* Blog */
  .blog-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:24px; }
  .blog-card { background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.07); cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
  .blog-card:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,0.12); }
  .blog-card-thumb { height:160px; background:#f0f0f0; }
  .blog-card-body { padding:16px; }
  .blog-card-cat { font-size:11px; font-weight:700; color:#9E0620; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:6px; }
  .blog-card-body h3 { font-size:16px; font-weight:700; margin:0 0 8px; }
  .blog-card-body p { font-size:13px; color:#6b7280; margin:0 0 10px; }
  .blog-card-meta { font-size:12px; color:#9ca3af; }
  .blog-full { background:#fff; border-radius:16px; padding:40px; box-shadow:0 2px 12px rgba(0,0,0,0.07); max-width:800px; margin:0 auto; }
  .blog-full h1 { font-size:28px; font-weight:700; margin:12px 0; }
  .blog-full-cat { font-size:12px; font-weight:700; color:#9E0620; letter-spacing:0.08em; text-transform:uppercase; }
  .blog-full-meta { font-size:13px; color:#9ca3af; margin-bottom:24px; }
  .blog-full-content { font-size:15px; line-height:1.8; color:#374151; }
  /* Partner */
  .benefit-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:20px; margin:24px 0 40px; }
  .benefit-card { background:#fff; border-radius:12px; padding:24px; box-shadow:0 2px 10px rgba(0,0,0,0.07); text-align:center; }
  .benefit-icon { font-size:36px; margin-bottom:12px; }
  .benefit-card h3 { font-size:16px; font-weight:700; margin:0 0 8px; }
  .benefit-card p { font-size:13.5px; color:#6b7280; margin:0; }
  /* Venue Mgmt */
  .vm-features { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; margin-bottom:40px; }
  .vm-list h2 { font-size:22px; font-weight:700; margin:0 0 20px; }
  .vm-item { display:flex; gap:14px; margin-bottom:20px; }
  .vm-icon { font-size:28px; flex-shrink:0; }
  .vm-item strong { display:block; font-size:15px; font-weight:600; margin-bottom:4px; }
  .vm-item p { font-size:13.5px; color:#6b7280; margin:0; }
  /* Contact */
  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
  .contact-info-col h2,.contact-form-col h2 { font-size:22px; font-weight:700; margin:0 0 20px; }
  .contact-item { display:flex; gap:14px; margin-bottom:18px; }
  .contact-icon { font-size:22px; flex-shrink:0; }
  .contact-item strong { display:block; font-size:14px; font-weight:600; margin-bottom:2px; }
  .contact-item p { font-size:14px; color:#6b7280; margin:0; }
  .sosmed-row { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
  .sm-badge { padding:8px 16px; background:#f3f4f6; border-radius:8px; font-size:13.5px; text-decoration:none; color:#374151; font-weight:500; transition:background 0.18s; }
  .sm-badge:hover { background:#e5e7eb; }
  /* Empty */
  .empty-page { text-align:center; padding:80px 20px; display:none; }
  .empty-icon { font-size:64px; margin-bottom:16px; }
  .empty-page h3 { font-size:20px; font-weight:700; margin:0 0 8px; }
  .empty-page p { color:#6b7280; font-size:14px; }
  /* Toast */
  .toast-overlay{position:fixed;bottom:24px;right:24px;z-index:9999;}
  .toast-msg{background:#1f2937;color:#fff;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:500;border-left:4px solid #16a34a;box-shadow:0 8px 24px rgba(0,0,0,0.25);transform:translateX(120%);transition:transform 0.35s cubic-bezier(.34,1.56,.64,1);}
  .toast-msg.show{transform:translateX(0);}
  @media(max-width:768px){.page-hero h1{font-size:26px;}.form-row{grid-template-columns:1fr;}.two-col-contact,.vm-features,.contact-grid{grid-template-columns:1fr;}.nav-links{display:none;}}
"""

SHARED_SCRIPT = """
  function submitBooking(e) {
    e.preventDefault();
    const t = document.createElement('div');
    t.className = 'toast-msg';
    t.textContent = '✓ Permintaan terkirim! Kami akan menghubungi Anda via WhatsApp.';
    let c = document.querySelector('.toast-overlay');
    if (!c) { c = document.createElement('div'); c.className = 'toast-overlay'; document.body.appendChild(c); }
    c.appendChild(t);
    setTimeout(() => t.classList.add('show'), 50);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 4000);
    e.target.reset();
  }
"""

NAV_HTML = """
  <header>
    <nav class="nav-inner">
      <a href="/" class="nav-logo">
        <img src="/assets/logo/new-new-logo.svg" alt="Logo" onerror="this.style.display='none'">
      </a>
      <div class="nav-links">
        <a href="/sewa-lapangan.html">Sewa Lapangan</a>
        <a href="/main-bareng.html">Main Bareng</a>
        <a href="/kompetisi.html">Kompetisi</a>
        <a href="/blog.html">Blog</a>
        <a href="/kontak.html">Kontak</a>
        <a href="/partner.html">Partner</a>
      </div>
      <a href="/" class="nav-back">← Kembali ke Beranda</a>
    </nav>
  </header>
"""

for filename, data in PAGES.items():
    color = data.get('color', '#9E0620')
    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{data['title']}</title>
<meta name="description" content="{data['sub']}">
<link rel="icon" href="/assets/logos/new-Favicon.png">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
{SHARED_CSS}
.page-hero {{ background: linear-gradient(135deg, #1a0008 0%, {color}88 100%); }}
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
<script>{SHARED_SCRIPT}</script>
</body>
</html>"""

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Created: {filename}')

print('All pages created!')
