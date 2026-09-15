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
    'chat': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    'calendar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    'money': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    'lock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    'chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
    'target': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    'bullhorn': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',
    'smartphone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>',
    'instagram': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    'tiktok': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>',
    'facebook': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    'youtube': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>',
}

PAGES = {
    'sewa-lapangan.html': {
        'title': 'Sewa Lapangan — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Sewa Lapangan',
        'sub': 'Lapangan mini soccer berkualitas di Pusdikif Kota Cimahi. Tersedia berbagai pilihan sesi booking harian.',
        'icon': SVG['stadium'],
        'color': '#9E0620',
        'content': f'''
        <div class="page-grid">
          <div class="court-card">
            <div class="court-img" style="background:#f9fafb;display:flex;align-items:center;justify-content:center;color:#9E0620;">
              <div style="width:72px;height:72px;display:flex;align-items:center;justify-content:center;">{SVG['soccer']}</div>
            </div>
            <div class="court-info">
              <h3>Lapangan A</h3>
              <p>Lapangan mini soccer rumput sintetis standar kompetisi</p>
              <div class="court-tags"><span>Rumput Sintetis</span><span>Lampu LED</span><span>4v4 – 7v7</span></div>
              <a href="#booking" class="btn-book">Booking Sekarang</a>
            </div>
          </div>
          <div class="court-card">
            <div class="court-img" style="background:#f9fafb;display:flex;align-items:center;justify-content:center;color:#9E0620;">
              <div style="width:72px;height:72px;display:flex;align-items:center;justify-content:center;">{SVG['goal']}</div>
            </div>
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
        'icon': SVG['users'],
        'color': '#9E0620',
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
        'icon': SVG['newspaper'],
        'color': '#9E0620',
        'content': f'''
        <div id="blogContainer" class="blog-grid"></div>
        <div id="emptyBlog" class="empty-page">
          <div class="empty-icon" style="width:48px;height:48px;margin:0 auto 16px;color:#9ca3af;">{SVG['document']}</div>
          <h3>Belum ada artikel</h3>
          <p>Admin belum mempublikasikan artikel. Kembali lagi nanti!</p>
        </div>
        <script>
          (function(){{
            const blogs = JSON.parse(localStorage.getItem('ms88_blogs') || '[]');
            const pub = blogs.filter(b => b.status === 'published');
            const container = document.getElementById('blogContainer');
            const empty = document.getElementById('emptyBlog');
            if (pub.length === 0) {{ empty.style.display = 'block'; return; }}
            empty.style.display = 'none';
            container.innerHTML = pub.reverse().map(b => `
              <div class="blog-card" onclick="openBlog(${{b.id}})">
                <div class="blog-card-thumb" style="background-image:url('${{b.thumb || ''}}');background-color:#f0f0f0;background-size:cover;background-position:center;"></div>
                <div class="blog-card-body">
                  <div class="blog-card-cat">${{b.category}}</div>
                  <h3>${{b.title}}</h3>
                  <p>${{b.summary || b.content.substring(0,100) + '...'}}</p>
                  <div class="blog-card-meta">${{b.createdAt}}</div>
                </div>
              </div>
            `).join('');
          }})();
          function openBlog(id) {{
            const blogs = JSON.parse(localStorage.getItem('ms88_blogs') || '[]');
            const b = blogs.find(x => x.id === id);
            if (!b) return;
            document.getElementById('blogContainer').innerHTML = `
              <div class="blog-full">
                ${{b.thumb ? '<img src="'+b.thumb+'" style="width:100%;border-radius:12px;margin-bottom:24px;">' : ''}}
                <div class="blog-full-cat">${{b.category}}</div>
                <h1>${{b.title}}</h1>
                <div class="blog-full-meta">${{b.createdAt}}</div>
                <div class="blog-full-content">${{b.content.replace(/\\n/g,'<br>')}}</div>
                <button onclick="location.reload()" style="margin-top:32px;padding:10px 20px;background:#9E0620;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:14px;">← Kembali ke Blog</button>
              </div>
            `;
          }}
        </script>
        '''
    },
    'partner.html': {
        'title': 'Partner With Us — Mini Soccer 88 Alpha Sport Pusdikif',
        'heading': 'Partner With Us',
        'sub': 'Kolaborasi dengan Mini Soccer 88 Alpha Sport Pusdikif untuk memperluas jangkauan brand Anda ke komunitas olahraga.',
        'icon': SVG['handshake'],
        'color': '#9E0620',
        'content': f'''
        <div class="partner-benefits">
          <h2>Keuntungan Bermitra</h2>
          <div class="benefit-grid">
            <div class="benefit-card"><div class="benefit-icon">{SVG['bullhorn']}</div><h3>Brand Awareness</h3><p>Ekspos brand Anda kepada ratusan member aktif komunitas olahraga Cimahi.</p></div>
            <div class="benefit-card"><div class="benefit-icon">{SVG['target']}</div><h3>Target Tepat</h3><p>Jangkau komunitas pecinta olahraga yang aktif dan engaged.</p></div>
            <div class="benefit-card"><div class="benefit-icon">{SVG['smartphone']}</div><h3>Promosi Digital</h3><p>Logo dan info brand Anda tampil di website dan media sosial kami.</p></div>
            <div class="benefit-card"><div class="benefit-icon">{SVG['trophy']}</div><h3>Event Sponsor</h3><p>Jadilah sponsor turnamen dan event olahraga komunitas kami.</p></div>
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
        'icon': SVG['building'],
        'color': '#9E0620',
        'content': f'''
        <div class="vm-features">
          <div class="vm-feature">
            <img src="/assets/img/venue-preview.webp" alt="Venue Preview" style="width:100%;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.1);">
          </div>
          <div class="vm-list">
            <h2>Fitur Unggulan</h2>
            <div class="vm-item"><div class="vm-icon">{SVG['calendar']}</div><div><strong>Jadwal Booking Online</strong><p>Pelanggan bisa booking kapan saja via website tanpa perlu telepon.</p></div></div>
            <div class="vm-item"><div class="vm-icon">{SVG['money']}</div><div><strong>Laporan Omset Real-time</strong><p>Pantau pendapatan harian, mingguan, dan bulanan secara langsung.</p></div></div>
            <div class="vm-item"><div class="vm-icon">{SVG['lock']}</div><div><strong>Kelola Slot Fleksibel</strong><p>Kunci slot untuk maintenance atau event khusus dengan mudah.</p></div></div>
            <div class="vm-item"><div class="vm-icon">{SVG['chart']}</div><div><strong>Analitik Hunian</strong><p>Lihat tingkat hunian lapangan dan optimalkan jadwal operasional.</p></div></div>
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
        'icon': SVG['trophy'],
        'color': '#9E0620',
        'content': f'''
        <div class="page-grid">
          <div class="comp-card">
            <img src="/assets/dummy/new_kompetisi_home1.png" alt="Kompetisi 1" onerror="this.style.display='none'">
            <div class="comp-info">
              <div class="comp-badge">Segera Hadir</div>
              <h3>Mini Soccer Cup 2024</h3>
              <p>Turnamen tahunan antar komunitas se-Kota Cimahi. Format 5v5, hadiah total jutaan rupiah!</p>
              <div class="comp-detail" style="display:flex;align-items:center;gap:14px;">
                <span style="display:inline-flex;align-items:center;gap:5px;">
                  <span style="width:14px;height:14px;display:inline-flex;">{SVG['calendar']}</span> November 2024
                </span>
                <span>|</span>
                <span style="display:inline-flex;align-items:center;gap:5px;">
                  <span style="width:14px;height:14px;display:inline-flex;">{SVG['stadium']}</span> Lapangan A & B
                </span>
              </div>
              <a href="#daftar-tim" class="btn-book">Daftarkan Tim</a>
            </div>
          </div>
          <div class="comp-card">
            <img src="/assets/dummy/new_kompetisi_home2.png" alt="Kompetisi 2" onerror="this.style.display='none'">
            <div class="comp-info">
              <div class="comp-badge comp-badge-open">Pendaftaran Buka</div>
              <h3>Alpha Sport League</h3>
              <p>Liga internal bulanan khusus member Mini Soccer 88. Berlangsung setiap akhir bulan.</p>
              <div class="comp-detail" style="display:flex;align-items:center;gap:14px;">
                <span style="display:inline-flex;align-items:center;gap:5px;">
                  <span style="width:14px;height:14px;display:inline-flex;">{SVG['calendar']}</span> Setiap Bulan
                </span>
                <span>|</span>
                <span style="display:inline-flex;align-items:center;gap:5px;">
                  <span style="width:14px;height:14px;display:inline-flex;">{SVG['stadium']}</span> Semua Lapangan
                </span>
              </div>
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
        'icon': SVG['phone'],
        'color': '#9E0620',
        'content': f'''
        <div class="contact-grid">
          <div class="contact-info-col">
            <h2>Informasi Kontak</h2>
            <div id="contactData">
              <div class="contact-item"><div class="contact-icon">{SVG['pin']}</div><div><strong>Alamat</strong><p id="cAlamatDisplay">Pusdikif, Kota Cimahi, Jawa Barat</p></div></div>
              <div class="contact-item"><div class="contact-icon">{SVG['phone']}</div><div><strong>Telepon</strong><p id="cTelpDisplay">Hubungi via WhatsApp</p></div></div>
              <div class="contact-item"><div class="contact-icon">{SVG['chat']}</div><div><strong>WhatsApp</strong><p id="cWaDisplay">-</p></div></div>
              <div class="contact-item"><div class="contact-icon">{SVG['mail']}</div><div><strong>Email</strong><p id="cEmailDisplay">-</p></div></div>
              <div class="contact-item"><div class="contact-icon">{SVG['clock']}</div><div><strong>Jam Operasional</strong><p id="cJamDisplay">07:00 – 23:00 WIB (Setiap Hari)</p></div></div>
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
          (function(){{
            const c = JSON.parse(localStorage.getItem('ms88_contact') || '{{}}');
            const sm = JSON.parse(localStorage.getItem('ms88_sosmed') || '{{}}');
            if (c.alamat) document.getElementById('cAlamatDisplay').textContent = c.alamat;
            if (c.telp)   document.getElementById('cTelpDisplay').textContent   = c.telp;
            if (c.wa)     document.getElementById('cWaDisplay').textContent     = c.wa;
            if (c.email)  document.getElementById('cEmailDisplay').textContent  = c.email;
            if (c.jam)    document.getElementById('cJamDisplay').textContent    = c.jam;
            const links = [];
            if (sm.instagram) links.push('<a href="https://instagram.com/'+sm.instagram+'" target="_blank" class="sm-badge"><span class="sm-icon">{SVG['instagram']}</span> Instagram</a>');
            if (sm.tiktok)    links.push('<a href="https://tiktok.com/@'+sm.tiktok+'" target="_blank" class="sm-badge"><span class="sm-icon">{SVG['tiktok']}</span> TikTok</a>');
            if (sm.facebook)  links.push('<a href="https://facebook.com/'+sm.facebook+'" target="_blank" class="sm-badge"><span class="sm-icon">{SVG['facebook']}</span> Facebook</a>');
            if (sm.youtube)   links.push('<a href="'+sm.youtube+'" target="_blank" class="sm-badge"><span class="sm-icon">{SVG['youtube']}</span> YouTube</a>');
            document.getElementById('sosmedRow').innerHTML = links.join('');
          }})();
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
  
  /* Location Bar */
  .ms88-location-bar {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1.5px solid #e5e7eb;
    border-radius: 100px; padding: 6px 14px;
    font-size: 13.5px; color: #374151; font-weight: 500;
    cursor: pointer; transition: border-color 0.18s, box-shadow 0.18s;
  }
  .ms88-location-bar:hover { border-color: #9E0620; box-shadow: 0 0 0 3px rgba(158,6,32,0.08); }
  .geo-pin { display: inline-flex; align-items: center; color: #9E0620; }
  .geo-pin svg { width: 15px; height: 15px; }
  .geo-city { font-weight: 600; color: #9E0620; }
  .geo-placeholder { color: #6b7280; }

  /* Hero Section */
  .page-hero { background: linear-gradient(135deg, #140005 0%, #29000d 100%); color:#fff; padding:64px 24px; text-align:center; }
  .page-hero .icon {
    width: 64px; height: 64px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    color: #ffffff;
  }
  .page-hero .icon svg { width: 32px; height: 32px; }
  .page-hero h1 { font-size:34px; font-weight:700; margin:0 0 12px; }
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
  .court-tags span { background:rgba(158,6,32,0.08); color:#9E0620; padding:4px 10px; border-radius:100px; font-size:12px; font-weight:500; }
  .comp-badge { display:inline-block; background:rgba(158,6,32,0.08); color:#9E0620; padding:4px 10px; border-radius:100px; font-size:11px; font-weight:700; margin-bottom:8px; }
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
  .btn-submit { background:#9E0620; color:#fff; border:none; padding:14px 28px; border-radius:10px; font-family:inherit; font-size:15px; font-weight:600; cursor:pointer; transition:all 0.18s; box-shadow:0 4px 14px rgba(158,6,32,0.3); align-self:flex-start; }
  .btn-submit:hover { background:#b70826; transform:translateY(-2px); box-shadow:0 6px 20px rgba(158,6,32,0.4); }

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

  /* Partner */
  .partner-benefits { margin-bottom:48px; }
  .partner-benefits h2 { font-size:22px; font-weight:700; margin:0 0 20px; }
  .benefit-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
  .benefit-card { background:#fff; border-radius:12px; padding:24px; box-shadow:0 2px 10px rgba(0,0,0,0.07); }
  .benefit-icon {
    width: 44px; height: 44px;
    background: rgba(158,6,32,0.08);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #9E0620;
    margin-bottom: 14px;
  }
  .benefit-icon svg { width: 22px; height: 22px; }
  .benefit-card h3 { font-size:16px; font-weight:700; margin:0 0 8px; }
  .benefit-card p { font-size:13.5px; color:#6b7280; margin:0; }

  /* Venue Mgmt */
  .vm-features { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; margin-bottom:40px; }
  .vm-list h2 { font-size:22px; font-weight:700; margin:0 0 20px; }
  .vm-item { display:flex; gap:14px; margin-bottom:20px; align-items:flex-start; }
  .vm-icon {
    width: 40px; height: 40px;
    background: rgba(158,6,32,0.08);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #9E0620;
    flex-shrink: 0;
  }
  .vm-icon svg { width: 20px; height: 20px; }
  .vm-item strong { display:block; font-size:15px; font-weight:600; margin-bottom:4px; }
  .vm-item p { font-size:13.5px; color:#6b7280; margin:0; }

  /* Contact */
  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
  .contact-info-col h2,.contact-form-col h2 { font-size:22px; font-weight:700; margin:0 0 20px; }
  .contact-item { display:flex; gap:14px; margin-bottom:18px; align-items:flex-start; }
  .contact-icon {
    width: 36px; height: 36px;
    background: rgba(158,6,32,0.08);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #9E0620;
    flex-shrink: 0;
  }
  .contact-icon svg { width: 18px; height: 18px; }
  .contact-item strong { display:block; font-size:14px; font-weight:600; margin-bottom:2px; }
  .contact-item p { font-size:14px; color:#6b7280; margin:0; }
  .sosmed-row { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
  .sm-badge {
    padding:8px 16px; background:#f3f4f6; border-radius:8px;
    font-size:13px; text-decoration:none; color:#374151; font-weight:500;
    transition:background 0.18s, color 0.18s;
    display:inline-flex; align-items:center; gap:8px;
  }
  .sm-badge:hover { background:rgba(158,6,32,0.08); color:#9E0620; }
  .sm-icon { display:inline-flex; align-items:center; }

  /* Empty */
  .empty-page { text-align:center; padding:80px 20px; display:none; }
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
    t.textContent = 'Permintaan terkirim! Kami akan menghubungi Anda via WhatsApp.';
    let c = document.querySelector('.toast-overlay');
    if (!c) { c = document.createElement('div'); c.className = 'toast-overlay'; document.body.appendChild(c); }
    c.appendChild(t);
    setTimeout(() => t.classList.add('show'), 50);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 4000);
    e.target.reset();
  }
"""

NAV_HTML = f"""
  <header>
    <nav class="nav-inner">
      <a href="/" class="nav-logo">
        <img src="/assets/logo/new-new-logo.svg" alt="Logo" onerror="this.style.display='none'">
        <div id="ms88LocationBar" class="ms88-location-bar" onclick="GeoMS88.showModal()" style="margin-left:16px;">
          <span class="geo-pin">{SVG['pin']}</span><span class="geo-placeholder">Deteksi Lokasi</span>
        </div>
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
<script src="js/assets-sync.js"></script>
<script src="js/geo.js"></script>
<script>GeoMS88.init();</script>
</body>
</html>"""

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Created: {filename}')

print('All pages generated with monochrome SVG icons!')
