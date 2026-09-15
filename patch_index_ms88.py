import re

def build_ms88_homepage():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update Title and Meta Tags
    html = re.sub(
        r'<title>.*?</title>',
        r'<title>Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi | Lapangan Mini Soccer Terbaik</title>',
        html,
        flags=re.DOTALL
    )

    html = re.sub(
        r'<meta name="title" content=".*?">',
        r'<meta name="title" content="Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi">',
        html
    )

    html = re.sub(
        r'<meta name="description" content=".*?">',
        r'<meta name="description" content="Booking lapangan Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi online. Lapangan rumput sintetis standar FIFA, lampu sorot LED kompetisi, mabar, sparring & turnamen.">',
        html
    )

    html = re.sub(
        r'<meta name="keywords" content=".*?">',
        r'<meta name="keywords" content="mini soccer 88, mini soccer 88 pusdikif, mini soccer cimahi, sewa lapangan mini soccer cimahi, alpha sport pusdikif, booking lapangan mini soccer pusdikif, mabar mini soccer cimahi, sparring mini soccer bandung cimahi">',
        html
    )

    # 2. Update Schema JSON-LD
    schema_pattern = r'<script type="application/ld\+json">.*?</script>'
    new_schema = '''<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["SportsActivityLocation", "StadiumOrArena"],
            "@id": "#venue",
            "name": "Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi",
            "alternateName": "Mini Soccer 88 Pusdikif Cimahi",
            "url": "/",
            "logo": "assets/logo/ms88-logo.svg",
            "image": "assets/img/ayoindonesia-padel-1.jpg",
            "description": "Venue Mini Soccer Rumput Sintetis Standar FIFA Terbaik di Kota Cimahi dengan Pencahayaan Malam LED Terang, Fasilitas Lengkap, Mabar dan Sparring.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kompleks Pusdikif Kodiklatad, Jl. Cisangkan Hilir / Jl. Pasir Kumeli",
                "addressLocality": "Cimahi Tengah",
                "addressRegion": "Jawa Barat",
                "postalCode": "40523",
                "addressCountry": "ID"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": -6.8789,
                "longitude": 107.5385
            },
            "telephone": "+6281288880888",
            "openingHours": "Mo-Su 06:00-24:00",
            "priceRange": "Rp 250.000 - Rp 650.000"
        }
    ]
}
</script>'''
    html = re.sub(schema_pattern, new_schema, html, count=1, flags=re.DOTALL)

    # 3. Add Custom CSS for Mini Soccer 88 Brand in <head>
    ms88_styles = '''
<style id="ms88-custom-styles">
  :root {
    --ms88-primary: #064E3B;
    --ms88-primary-dark: #022C22;
    --ms88-accent: #10B981;
    --ms88-gold: #F59E0B;
    --ms88-gold-dark: #D97706;
    --ms88-dark: #111827;
    --ms88-gray: #6B7280;
    --ms88-light: #F9FAFB;
    --ms88-border: #E5E7EB;
  }
  .ms88-brand-logo {
    height: 42px;
    width: auto;
    max-width: 230px;
    object-fit: contain;
    transition: transform 0.2s ease;
  }
  .ms88-brand-logo:hover {
    transform: scale(1.02);
  }
  .hero-ms88-overlay {
    background: linear-gradient(135deg, rgba(2, 44, 34, 0.94) 0%, rgba(6, 78, 59, 0.88) 55%, rgba(15, 118, 110, 0.75) 100%);
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 1;
  }
  .hero-badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(16, 185, 129, 0.2);
    border: 1px solid #10B981;
    color: #A7F3D0;
    padding: 6px 18px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
    backdrop-filter: blur(4px);
  }
  .btn-ms88-gold {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #111827 !important;
    font-weight: 700;
    padding: 14px 28px;
    border-radius: 50px;
    border: none;
    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }
  .btn-ms88-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
    color: #000 !important;
  }
  .btn-ms88-outline {
    background: rgba(255,255,255,0.1);
    color: #FFFFFF !important;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 50px;
    border: 1.5px solid rgba(255,255,255,0.5);
    backdrop-filter: blur(4px);
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }
  .btn-ms88-outline:hover {
    background: rgba(255,255,255,0.25);
    border-color: #FFFFFF;
    transform: translateY(-2px);
    color: #FFFFFF !important;
  }
  .btn-ms88-wa {
    background: #25D366;
    color: #FFFFFF !important;
    font-weight: 700;
    padding: 14px 26px;
    border-radius: 50px;
    border: none;
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }
  .btn-ms88-wa:hover {
    background: #1EBE5D;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
    color: #FFFFFF !important;
  }
  .ms88-card {
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #E5E7EB;
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
  }
  .ms88-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(6, 78, 59, 0.12);
    border-color: #10B981;
  }
  .ms88-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }
  .ms88-badge-green {
    background: #ECFDF5;
    color: #065F46;
  }
  .ms88-badge-gold {
    background: #FEF3C7;
    color: #92400E;
  }
  .ms88-section-title {
    font-family: 'Rubik', sans-serif;
    font-weight: 800;
    color: #064E3B;
    font-size: 32px;
    letter-spacing: -0.5px;
  }
  .ms88-section-sub {
    color: #6B7280;
    font-size: 16px;
    line-height: 1.6;
    max-width: 680px;
    margin: 0 auto;
  }
  .facility-icon-circle {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: #ECFDF5;
    color: #059669;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    transition: all 0.25s ease;
  }
  .ms88-card:hover .facility-icon-circle {
    background: #059669;
    color: #FFFFFF;
    transform: scale(1.08);
  }
  .court-card-price {
    font-size: 26px;
    font-weight: 800;
    color: #064E3B;
  }
  .cta-banner-box {
    background: linear-gradient(135deg, #022C22 0%, #064E3B 60%, #0F766E 100%);
    border-radius: 24px;
    padding: 48px 36px;
    color: white;
    position: relative;
    overflow: hidden;
    box-shadow: 0 16px 36px rgba(6, 78, 59, 0.25);
  }
  .cta-banner-box::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
</style>
'''
    if 'ms88-custom-styles' not in html:
        html = html.replace('</head>', ms88_styles + '\n</head>')

    # 4. Clean navbar brand and menu items
    # Replace logo and link in header
    navbar_pattern = r'<div class="navbar-top-row d-flex align-items-center justify-content-between">.*?<a class="p-0" href="[^"]*">.*?<img class="mr-3 ayo-logo"[^>]*>.*?</div>\s*</a>'
    new_navbar_logo = '''<div class="navbar-top-row d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <a class="p-0 d-flex align-items-center text-decoration-none" href="/" aria-label="Mini Soccer 88 Homepage">
                    <img class="mr-3 ms88-brand-logo" src="assets/logo/ms88-logo.svg" alt="Mini Soccer 88 Alpha Sport Pusdikif Logo">
                </a>
                <div id="ms88LocationBar" class="ms88-location-bar d-none d-md-flex align-items-center" onclick="GeoMS88.showModal()" style="margin-left:16px;cursor:pointer;background:#F3F4F6;padding:6px 14px;border-radius:20px;font-size:13px;color:#374151;border:1px solid #E5E7EB;">
                  <span class="geo-pin me-1" style="color:#059669;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                  <span class="geo-placeholder" style="font-weight:500;">Pusdikif Kota Cimahi</span>
                </div>
            </div>'''
    
    html = re.sub(navbar_pattern, new_navbar_logo, html, count=1, flags=re.DOTALL)

    # Replace navigation menu items
    nav_items_pattern = r'<ul class="navbar-nav me-auto mb-2 mb-lg-0">.*?</ul>'
    new_nav_items = '''<ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
                 <li class="nav-item left-menu-item" style="white-space: nowrap;">
                    <a class="nav-link s16-400 font-weight-500" href="/sewa-lapangan.html" style="color:#111827;font-weight:600;">
                        Sewa Lapangan
                    </a>
                </li>
                <li class="nav-item left-menu-item" style="white-space: nowrap;">
                    <a class="nav-link s16-400" href="/main-bareng.html" style="color:#374151;">
                        Main Bareng (Mabar)
                    </a>
                </li>
                <li class="nav-item left-menu-item" style="white-space: nowrap;">
                    <a class="nav-link s16-400" href="/kompetisi.html" style="color:#374151;">
                        Turnamen & Liga
                    </a>
                </li>
                <li class="nav-item left-menu-item" style="white-space: nowrap;">
                    <a class="nav-link s16-400" href="/venue-management.html" style="color:#374151;">
                        Fasilitas Venue
                    </a>
                </li>
                <li class="nav-item left-menu-item" style="white-space: nowrap;">
                    <a class="nav-link s16-400" href="/blog.html" style="color:#374151;">
                        Berita & Event
                    </a>
                </li>
                <li class="nav-item left-menu-item" style="white-space: nowrap;">
                    <a class="nav-link s16-400" href="/kontak.html" style="color:#374151;">
                        Kontak & Lokasi
                    </a>
                </li>
            </ul>'''
    html = re.sub(nav_items_pattern, new_nav_items, html, count=1, flags=re.DOTALL)

    # Replace right-side CTA button in navbar
    auth_action_pattern = r'<div class="col-auto px-0 mx-xl-3" id="auth-action">.*?</div>'
    new_auth_action = '''<div class="col-auto px-0 mx-xl-3 d-flex align-items-center" id="auth-action">
                <a href="https://wa.me/6281288880888?text=Halo%20Admin%20Mini%20Soccer%2088%20Pusdikif,%20saya%20mau%20booking%20jadwal%20lapangan" target="_blank" class="btn btn-sm text-white font-weight-bold px-3 py-2 rounded-pill me-2 d-none d-lg-inline-flex align-items-center" style="background:#059669;box-shadow:0 2px 8px rgba(5,150,105,0.3);">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Booking WA
                </a>
                <a href="/superadmin/index.html" class="btn btn-sm btn-outline-secondary px-3 py-2 rounded-pill font-weight-500">
                    Admin
                </a>
            </div>'''
    html = re.sub(auth_action_pattern, new_auth_action, html, count=1, flags=re.DOTALL)

    # 5. Completely Rebuild the Main Content Area (<main> ... </main>)
    # Find start of <main> and end of </main>
    main_start = html.find('<main>')
    main_end = html.find('</main>')

    if main_start != -1 and main_end != -1:
        new_main_content = '''<main>
    <div class="contents overflow-hidden" id="app" style="position:relative;">
        
        <!-- HERO SECTION -->
        <section class="hero-section position-relative" style="min-height: 720px; overflow:hidden; background:#022C22;">
            <!-- Background Image with Overlay -->
            <img src="assets/img/ayoindonesia-padel-1.jpg" alt="Mini Soccer 88 Alpha Sport Pusdikif" class="w-100 h-100 position-absolute d-none d-md-block" style="object-fit:cover; object-position: center 30%; filter: brightness(0.7) contrast(1.1);" fetchpriority="high">
            <img src="assets/img/ayoindonesia-padel-mobile-1.jpg" alt="Mini Soccer 88 Alpha Sport Pusdikif" class="w-100 h-100 position-absolute d-block d-md-none" style="object-fit:cover; object-position: center center; filter: brightness(0.65);" fetchpriority="high">
            
            <div class="hero-ms88-overlay"></div>

            <div class="container position-relative" style="z-index: 2; padding-top: 140px; padding-bottom: 120px;">
                <div class="row align-items-center">
                    <div class="col-lg-8 col-xl-7 text-white">
                        
                        <!-- Top Tag Badge -->
                        <div class="hero-badge-pill">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            STANDAR FIFA • PUSDIKIF KODIKLATAD KOTA CIMAHI
                        </div>

                        <!-- Main Headline -->
                        <h1 class="text-homepage-baner mb-3" style="font-size: clamp(34px, 4.5vw, 54px); font-weight: 900; line-height: 1.18; letter-spacing: -0.5px;">
                            Mini Soccer 88 <br>
                            <span style="color: #F59E0B; text-shadow: 0 2px 10px rgba(245,158,11,0.3);">Alpha Sport Pusdikif</span>
                        </h1>

                        <!-- Subtitle -->
                        <p class="s18-400 mb-4" style="color: rgba(255,255,255,0.92); font-size: 18px; line-height: 32px; max-width: 620px;">
                            Rasakan atmosfer bermain mini soccer berkelas di Kota Cimahi. Rumput sintetis standar internasional, pencahayaan LED stadion malam hari super terang, tribun penonton teduh, dan parkir luas yang aman di kawasan militer Pusdikif.
                        </p>

                        <!-- Action Buttons -->
                        <div class="d-flex flex-wrap gap-3 mt-4 hero-buttons-container">
                            <a href="/sewa-lapangan.html" class="btn-ms88-gold">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                Booking Lapangan Sekarang
                            </a>
                            <a href="/main-bareng.html" class="btn-ms88-outline">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                Ikut Main Bareng (Mabar)
                            </a>
                            <a href="https://wa.me/6281288880888?text=Halo%20Admin%20Mini%20Soccer%2088%20Pusdikif,%20saya%20mau%20tanya%20jadwal%20booking" target="_blank" class="btn-ms88-wa">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                WhatsApp Admin
                            </a>
                        </div>

                        <!-- Venue Highlights Pills -->
                        <div class="d-flex flex-wrap gap-3 mt-4 pt-2 text-white-50" style="font-size: 13px;">
                            <span class="d-inline-flex align-items-center text-white"><span style="color:#10B981;margin-right:6px;">✔</span> Buka 06.00 – 24.00 WIB</span>
                            <span class="d-inline-flex align-items-center text-white"><span style="color:#10B981;margin-right:6px;">✔</span> Free Bola & Rompi Sesi</span>
                            <span class="d-inline-flex align-items-center text-white"><span style="color:#10B981;margin-right:6px;">✔</span> Ruang Ganti & Shower</span>
                            <span class="d-inline-flex align-items-center text-white"><span style="color:#10B981;margin-right:6px;">✔</span> Kafe & Kantin Santai</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- QUICK BOOKING / SCHEDULE CARD -->
        <div class="container col-xl-10 col-11 px-0" style="position: relative; margin-top: -60px; z-index: 10;">
            <div class="card p-4 p-md-4 shadow-lg border-0" style="border-radius: 20px; background: #FFFFFF; box-shadow: 0 18px 40px rgba(0,0,0,0.12) !important;">
                <form action="/sewa-lapangan.html" method="GET">
                    <div class="row g-3 align-items-center">
                        
                        <!-- Lapangan Selector -->
                        <div class="col-md-3">
                            <label class="form-label mb-1 text-muted small fw-bold">PILIH LAPANGAN</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light border-end-0 text-success"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="12" y1="5" x2="12" y2="19"></line><circle cx="12" cy="12" r="3"></circle></svg></span>
                                <select class="form-select border-start-0 bg-light" name="lapangan" style="font-weight: 500;">
                                    <option value="alpha">Lapangan 88 Alpha (Outdoor 7v7)</option>
                                    <option value="bravo">Lapangan 88 Bravo (Semi-Indoor 7v7)</option>
                                    <option value="all">Semua Lapangan</option>
                                </select>
                            </div>
                        </div>

                        <!-- Sesi Selector -->
                        <div class="col-md-3">
                            <label class="form-label mb-1 text-muted small fw-bold">WAKTU / SESI MAIN</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light border-end-0 text-success"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                                <select class="form-select border-start-0 bg-light" name="sesi" style="font-weight: 500;">
                                    <option value="pagi">Pagi (06:00 - 12:00)</option>
                                    <option value="siang">Siang (12:00 - 15:00)</option>
                                    <option value="sore">Sore (15:00 - 18:00)</option>
                                    <option value="malam" selected>Malam Prime (18:00 - 24:00)</option>
                                </select>
                            </div>
                        </div>

                        <!-- Tanggal Main -->
                        <div class="col-md-3">
                            <label class="form-label mb-1 text-muted small fw-bold">TANGGAL MAIN</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light border-end-0 text-success"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                <input type="date" class="form-control border-start-0 bg-light" name="tanggal" value="2026-09-16" style="font-weight: 500;">
                            </div>
                        </div>

                        <!-- Button Action -->
                        <div class="col-md-3 d-grid pt-md-4">
                            <button type="submit" class="btn btn-ms88-gold w-100 justify-content-center" style="padding: 12px 16px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                Cek Jadwal & Pesan
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>

        <!-- STATS & HIGHLIGHT BAR -->
        <section class="container col-xl-10 col-11 my-5 pt-4">
            <div class="row g-4 text-center">
                <div class="col-6 col-lg-3">
                    <div class="ms88-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div class="text-success display-6 fw-bold mb-1" style="color:#059669 !important;">2 Lapangan</div>
                        <div class="fw-bold text-dark mb-1">Standar FIFA Quality</div>
                        <small class="text-muted">Rumput Sintetis Monofilament 5cm</small>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="ms88-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div class="text-warning display-6 fw-bold mb-1" style="color:#D97706 !important;">800+ Lux</div>
                        <div class="fw-bold text-dark mb-1">LED Stadium Lights</div>
                        <small class="text-muted">Pencahayaan Terang Malam Hari</small>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="ms88-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div class="text-success display-6 fw-bold mb-1" style="color:#059669 !important;">5.000+</div>
                        <div class="fw-bold text-dark mb-1">Match & Mabar Sukses</div>
                        <small class="text-muted">Komunitas Bola Cimahi & Bandung</small>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="ms88-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div class="text-warning display-6 fw-bold mb-1" style="color:#D97706 !important;">4.9 / 5.0</div>
                        <div class="fw-bold text-dark mb-1">Kepuasan Pelanggan</div>
                        <small class="text-muted">Review Pemain & Tim Komunitas</small>
                    </div>
                </div>
            </div>
        </section>

        <!-- PILIHAN LAPANGAN (OUR COURTS) -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="text-center mb-5">
                <span class="ms88-badge ms88-badge-green mb-2">PILIHAN LAPANGAN</span>
                <h2 class="ms88-section-title">Lapangan Mini Soccer 88 Pusdikif</h2>
                <p class="ms88-section-sub">Dua lapangan berukuran ideal untuk pertandingan 7 vs 7 atau 8 vs 8 dengan perawatan rumput prima dan drainase anti-genangan.</p>
            </div>

            <div class="row g-4">
                
                <!-- Lapangan Alpha -->
                <div class="col-lg-6">
                    <div class="ms88-card h-100">
                        <div class="position-relative" style="height: 240px; overflow: hidden; background: #064E3B;">
                            <img src="assets/banner/1-desktop.png" class="w-100 h-100" style="object-fit: cover; filter: contrast(1.05);" alt="Lapangan 88 Alpha">
                            <span class="badge bg-success position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill font-weight-bold">Outdoor Turf 7v7</span>
                        </div>
                        <div class="p-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h3 class="h4 fw-bold mb-0" style="color:#064E3B;">Lapangan 88 Alpha</h3>
                                <span class="badge bg-light text-dark border">42m x 26m</span>
                            </div>
                            <p class="text-muted mb-3">Lapangan mini soccer outdoor dengan rumput sintetis monofilament tebal 50mm, pasir silika merata, dan rubber infill lentur aman untuk pergerakan cepat pemain.</p>
                            
                            <ul class="list-unstyled mb-4 small text-secondary">
                                <li class="mb-2 d-flex align-items-center"><svg class="text-success me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Rumput Sintetis Monofilament Standar FIFA</li>
                                <li class="mb-2 d-flex align-items-center"><svg class="text-success me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Floodlight LED 800 Lux Terang Merata Tanpa Silau</li>
                                <li class="mb-2 d-flex align-items-center"><svg class="text-success me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Bench Pemain Teduh & Papan Skor Digital</li>
                                <li class="d-flex align-items-center"><svg class="text-success me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Free Bola Match & 2 Set Rompi Tim</li>
                            </ul>

                            <div class="d-flex align-items-center justify-content-between pt-3 border-top">
                                <div>
                                    <small class="text-muted d-block">Mulai dari</small>
                                    <span class="court-card-price">Rp 300.000</span><small class="text-muted"> / jam</small>
                                </div>
                                <a href="/sewa-lapangan.html?court=alpha" class="btn btn-ms88-gold">Booking Alpha</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lapangan Bravo -->
                <div class="col-lg-6">
                    <div class="ms88-card h-100">
                        <div class="position-relative" style="height: 240px; overflow: hidden; background: #0F766E;">
                            <img src="assets/banner/2-desktop.png" class="w-100 h-100" style="object-fit: cover; filter: contrast(1.05);" alt="Lapangan 88 Bravo">
                            <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill font-weight-bold">Semi-Covered Turf 7v7</span>
                        </div>
                        <div class="p-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h3 class="h4 fw-bold mb-0" style="color:#064E3B;">Lapangan 88 Bravo</h3>
                                <span class="badge bg-light text-dark border">42m x 25m</span>
                            </div>
                            <p class="text-muted mb-3">Lapangan dengan kanopi pelindung samping dan sistem drainase cepat yang memastikan sesi bermain tetap berjalan lancar saat gerimis maupun panas terik.</p>
                            
                            <ul class="list-unstyled mb-4 small text-secondary">
                                <li class="mb-2 d-flex align-items-center"><svg class="text-success me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Sistem Drainase Bebas Genangan Air</li>
                                <li class="mb-2 d-flex align-items-center"><svg class="text-success me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Jaring Pengaman Keliling Tinggi & Aman</li>
                                <li class="mb-2 d-flex align-items-center"><svg class="text-success me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Dekat Akses Kafe & Musholla Pusdikif</li>
                                <li class="d-flex align-items-center"><svg class="text-success me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Free Bola Match & 2 Set Rompi Tim</li>
                            </ul>

                            <div class="d-flex align-items-center justify-content-between pt-3 border-top">
                                <div>
                                    <small class="text-muted d-block">Mulai dari</small>
                                    <span class="court-card-price">Rp 300.000</span><small class="text-muted"> / jam</small>
                                </div>
                                <a href="/sewa-lapangan.html?court=bravo" class="btn btn-ms88-gold">Booking Bravo</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- PRICELIST TRANSPARAN -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="text-center mb-5">
                <span class="ms88-badge ms88-badge-gold mb-2">TARIF RESMI SEWA</span>
                <h2 class="ms88-section-title">Pricelist Sewa Lapangan 88</h2>
                <p class="ms88-section-sub">Tarif sewa transparan, terjangkau, dan sudah termasuk seluruh fasilitas penunjang tanpa biaya tersembunyi.</p>
            </div>

            <div class="row g-4">
                <div class="col-md-6 col-lg-3">
                    <div class="ms88-card p-4 text-center h-100">
                        <span class="badge bg-light text-dark border mb-3">06:00 - 12:00 WIB</span>
                        <h4 class="fw-bold" style="color:#064E3B;">Sesi Pagi</h4>
                        <div class="display-6 fw-bold my-3" style="color:#059669; font-size:28px;">Rp 300.000</div>
                        <p class="small text-muted mb-4">Cocok untuk olahraga pagi, pemanasan tim, atau sesi latihan fisik sebelum terik.</p>
                        <a href="/sewa-lapangan.html?sesi=pagi" class="btn btn-outline-success w-100 rounded-pill font-weight-bold">Pesan Pagi</a>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="ms88-card p-4 text-center h-100 position-relative" style="border: 2px solid #10B981;">
                        <span class="badge bg-success text-white position-absolute top-0 start-50 translate-middle px-3 py-1 rounded-pill">HAPPY HOUR PROMO</span>
                        <span class="badge bg-light text-dark border mb-3 mt-2">12:00 - 15:00 WIB</span>
                        <h4 class="fw-bold" style="color:#064E3B;">Sesi Siang</h4>
                        <div class="display-6 fw-bold my-3" style="color:#059669; font-size:28px;">Rp 250.000</div>
                        <p class="small text-muted mb-4">Diskon pelajar & mahasiswa. Harga paling hemat untuk sparring & game santai.</p>
                        <a href="/sewa-lapangan.html?sesi=siang" class="btn btn-success w-100 rounded-pill font-weight-bold">Pesan Siang</a>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="ms88-card p-4 text-center h-100">
                        <span class="badge bg-light text-dark border mb-3">15:00 - 18:00 WIB</span>
                        <h4 class="fw-bold" style="color:#064E3B;">Sesi Sore</h4>
                        <div class="display-6 fw-bold my-3" style="color:#059669; font-size:28px;">Rp 400.000</div>
                        <p class="small text-muted mb-4">Jam favorit pulang kerja & sekolah. Cuaca teduh dengan angin sejuk Cimahi.</p>
                        <a href="/sewa-lapangan.html?sesi=sore" class="btn btn-outline-success w-100 rounded-pill font-weight-bold">Pesan Sore</a>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="ms88-card p-4 text-center h-100 position-relative" style="border: 2px solid #F59E0B; background:#FFFBEB;">
                        <span class="badge bg-warning text-dark position-absolute top-0 start-50 translate-middle px-3 py-1 rounded-pill">PRIME TIME NIGHT</span>
                        <span class="badge bg-light text-dark border mb-3 mt-2">18:00 - 24:00 WIB</span>
                        <h4 class="fw-bold" style="color:#064E3B;">Sesi Malam</h4>
                        <div class="display-6 fw-bold my-3" style="color:#D97706; font-size:28px;">Rp 550.000</div>
                        <p class="small text-muted mb-4">Full stadium LED floodlights! Sensasi bermain malam hari layaknya match profesional.</p>
                        <a href="/sewa-lapangan.html?sesi=malam" class="btn btn-warning text-dark w-100 rounded-pill font-weight-bold">Pesan Malam</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- FASILITAS UNGGULAN (FACILITIES) -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="text-center mb-5">
                <span class="ms88-badge ms88-badge-green mb-2">KENAPA PILIH KAMI</span>
                <h2 class="ms88-section-title">Fasilitas Lengkap di Kawasan Pusdikif</h2>
                <p class="ms88-section-sub">Kenyamanan dan keamanan pemain serta penonton adalah prioritas utama Mini Soccer 88 Alpha Sport Cimahi.</p>
            </div>

            <div class="row g-4">
                
                <div class="col-md-6 col-lg-4">
                    <div class="ms88-card p-4 h-100">
                        <div class="facility-icon-circle">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 7 15 10 14 14 10 14 9 10 12 7"></polygon></svg>
                        </div>
                        <h4 class="fw-bold mb-2" style="color:#064E3B;">Rumput Sintetis FIFA Quality</h4>
                        <p class="text-muted small mb-0">Serat monofilament tebal dengan bantalan rubber lentur yang meminimalisir risiko lecet dan cedera pada lutut pemain.</p>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4">
                    <div class="ms88-card p-4 h-100">
                        <div class="facility-icon-circle">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </div>
                        <h4 class="fw-bold mb-2" style="color:#064E3B;">Floodlights LED 800+ Lux</h4>
                        <p class="text-muted small mb-0">Lampu stadion berdaya tinggi dengan sudut penerangan presisi, terang merata di setiap sudut lapangan tanpa silau.</p>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4">
                    <div class="ms88-card p-4 h-100">
                        <div class="facility-icon-circle">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 3v18"></path><path d="M15 3v18"></path></svg>
                        </div>
                        <h4 class="fw-bold mb-2" style="color:#064E3B;">Tribun & VIP Lounge Teduh</h4>
                        <p class="text-muted small mb-0">Tribun penonton beratap dengan sirkulasi udara sejuk, dilengkapi ruang tunggu nyaman untuk keluarga dan suporter.</p>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4">
                    <div class="ms88-card p-4 h-100">
                        <div class="facility-icon-circle">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                        <h4 class="fw-bold mb-2" style="color:#064E3B;">Kamar Ganti & Shower Bersih</h4>
                        <p class="text-muted small mb-0">Toilet bersih, loker penyimpanan barang, serta shower air segar agar pemain dapat membersihkan diri dengan nyaman seusai tanding.</p>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4">
                    <div class="ms88-card p-4 h-100">
                        <div class="facility-icon-circle">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        </div>
                        <h4 class="fw-bold mb-2" style="color:#064E3B;">Area Militer Aman & Parkir Luas</h4>
                        <p class="text-muted small mb-0">Terletak di dalam kompleks Pusdikif Kodiklatad dengan penjagaan aman 24 jam dan kapasitas parkir puluhan mobil & motor.</p>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4">
                    <div class="ms88-card p-4 h-100">
                        <div class="facility-icon-circle">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
                        </div>
                        <h4 class="fw-bold mb-2" style="color:#064E3B;">Kafetaria & Kantin Segar</h4>
                        <p class="text-muted small mb-0">Tersedia minuman isotonik dingin, kopi hangat, air mineral, serta aneka cemilan lezat untuk melepas dahaga.</p>
                    </div>
                </div>

            </div>
        </section>

        <!-- MAIN BARENG (MABAR) & SPARRING -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="card border-0 p-4 p-md-5" style="border-radius:24px; background: #F0FDF4; border: 1.5px solid #BBF7D0 !important;">
                <div class="row align-items-center">
                    <div class="col-lg-7">
                        <span class="badge bg-success px-3 py-2 rounded-pill font-weight-bold mb-3">KOMUNITAS & MABAR</span>
                        <h2 class="fw-bold mb-3" style="color:#064E3B; font-size:32px;">Gak Ada Tim? Ikut Main Bareng di Lapangan 88!</h2>
                        <p class="text-secondary mb-4" style="line-height:28px;">
                            Gabung sesi <strong>Main Bareng (Mabar)</strong> rutin setiap minggu di Mini Soccer 88 Alpha Sport Pusdikif. Cukup bawa sepatu dan perlengkapan pribadi, tim akan diundi secara fair dan fun. Tersedia wasit lapangan dan dokumentasi foto/video match!
                        </p>
                        <div class="d-flex flex-wrap gap-3">
                            <a href="/main-bareng.html" class="btn btn-success px-4 py-3 rounded-pill fw-bold">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                Lihat Jadwal Mabar Minggu Ini
                            </a>
                            <a href="https://wa.me/6281288880888?text=Halo%20Admin,%20saya%20mau%20gabung%20grup%20WhatsApp%20Mabar%20Mini%20Soccer%2088" target="_blank" class="btn btn-outline-success px-4 py-3 rounded-pill fw-bold">
                                Gabung Grup WA Mabar
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-5 mt-4 mt-lg-0 text-center">
                        <img src="assets/banner/mas_jo.png" class="img-fluid rounded-3 shadow" style="max-height: 280px; object-fit: cover;" alt="Komunitas Mabar">
                    </div>
                </div>
            </div>
        </section>

        <!-- TESTIMONIALS -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="text-center mb-5">
                <span class="ms88-badge ms88-badge-gold mb-2">ULASAN PEMAIN</span>
                <h2 class="ms88-section-title">Apa Kata Mereka Tentang Mini Soccer 88</h2>
                <p class="ms88-section-sub">Kepuasan dan pengalaman nyata para pemain yang telah merasakan kualitas lapangan Pusdikif Cimahi.</p>
            </div>

            <div class="row g-4">
                <div class="col-md-4">
                    <div class="ms88-card p-4 h-100 d-flex flex-column justify-content-between">
                        <p class="text-secondary italic mb-4" style="line-height:26px;">
                            "Rumput sintetisnya paling empuk di Cimahi, gak gampang bikin lecet pas sliding. Lampu malamnya terang banget berasa tanding di stadion beneran!"
                        </p>
                        <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style="width:46px;height:46px;font-weight:bold;">RP</div>
                            <div>
                                <h6 class="fw-bold mb-0 text-dark">Reza Pratama</h6>
                                <small class="text-muted">Kapten Cimahi United FC</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="ms88-card p-4 h-100 d-flex flex-column justify-content-between">
                        <p class="text-secondary italic mb-4" style="line-height:26px;">
                            "Fasilitas parkir di dalam Pusdikif super aman, ruang gantinya bersih ada shower, dan stafnya sangat responsif pas booking via WhatsApp."
                        </p>
                        <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center me-3" style="width:46px;height:46px;font-weight:bold;">HG</div>
                            <div>
                                <h6 class="fw-bold mb-0 text-dark">Hendra Gunawan</h6>
                                <small class="text-muted">Komunitas Fun Football Bandung Raya</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="ms88-card p-4 h-100 d-flex flex-column justify-content-between">
                        <p class="text-secondary italic mb-4" style="line-height:26px;">
                            "Buat yang pengen main tapi gak punya tim lengkap, sesi Mabarnya seru banget! Banyak dapet temen baru dan wasitnya tegas tapi asik."
                        </p>
                        <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style="width:46px;height:46px;font-weight:bold;">IF</div>
                            <div>
                                <h6 class="fw-bold mb-0 text-dark">Ilham Fauzi</h6>
                                <small class="text-muted">Pemain Mabar Reguler</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA BANNER BOX -->
        <section class="container col-xl-10 col-11 my-5">
            <div class="cta-banner-box text-center">
                <h2 class="display-6 fw-bold mb-3">Siap Menguasai Lapangan Hijau?</h2>
                <p class="lead mb-4 mx-auto" style="max-width: 680px; opacity: 0.95;">
                    Pesan slot main tim kamu sekarang sebelum kehabisan jam favorit! Booking online mudah dan konfirmasi instan langsung via WhatsApp resmi kami.
                </p>
                <div class="d-flex flex-wrap justify-content-center gap-3">
                    <a href="/sewa-lapangan.html" class="btn-ms88-gold">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Pilih Tanggal & Lapangan
                    </a>
                    <a href="https://wa.me/6281288880888?text=Halo%20Admin%20Mini%20Soccer%2088%20Pusdikif,%20saya%20mau%20booking%20lapangan" target="_blank" class="btn-ms88-wa">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        WhatsApp Reservasi (+62 812-8888-0888)
                    </a>
                </div>
            </div>
        </section>

    </div>
</main>'''
        html = html[:main_start] + new_main_content + html[main_end + len('</main>'):]

    # 6. Completely Rebuild the Footer (<footer> ... </footer>)
    footer_start = html.find('<footer>')
    footer_end = html.find('</footer>')

    if footer_start != -1 and footer_end != -1:
        new_footer = '''<footer>
    <div class="col-xl-10 col-11 mx-auto py-5 px-0">
        <div class="row g-4 justify-content-between">
            
            <!-- Col 1: Brand Info -->
            <div class="col-lg-4 col-md-6">
                <a class="d-inline-block mb-3" href="/" aria-label="Mini Soccer 88 Homepage">
                    <img src="assets/logo/ms88-logo.svg" alt="Mini Soccer 88 Alpha Sport Logo" style="height:44px; width:auto;">
                </a>
                <p class="text-secondary small mb-3" style="line-height:24px;">
                    Venue mini soccer rumput sintetis standar FIFA terbaik di Kota Cimahi. Memberikan pengalaman bertanding berstandar tinggi dengan fasilitas lengkap di kawasan militer Pusdikif.
                </p>
                <div class="small text-secondary mb-3">
                    <strong>Alamat:</strong><br>
                    Kompleks Pusdikif (Pusat Pendidikan Infanteri) Kodiklatad<br>
                    Jl. Cisangkan Hilir / Jl. Pasir Kumeli, Padasuka<br>
                    Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40523
                </div>
                <div class="d-flex gap-2 text-secondary">
                    <a href="https://instagram.com" target="_blank" class="btn btn-sm btn-light rounded-circle p-2 text-success" title="Instagram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://tiktok.com" target="_blank" class="btn btn-sm btn-light rounded-circle p-2 text-success" title="TikTok">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                    </a>
                    <a href="https://wa.me/6281288880888" target="_blank" class="btn btn-sm btn-light rounded-circle p-2 text-success" title="WhatsApp">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </a>
                </div>
            </div>

            <!-- Col 2: Navigasi Layanan -->
            <div class="col-lg-2 col-6">
                <h6 class="fw-bold text-dark mb-3">Layanan Kami</h6>
                <ul class="list-unstyled small">
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/sewa-lapangan.html">Sewa Lapangan</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/main-bareng.html">Main Bareng (Mabar)</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/kompetisi.html">Turnamen & Event</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/venue-management.html">Fasilitas Venue</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/partner.html">Kerjasama Sponsor</a></li>
                </ul>
            </div>

            <!-- Col 3: Informasi & Bantuan -->
            <div class="col-lg-3 col-6">
                <h6 class="fw-bold text-dark mb-3">Pusat Informasi</h6>
                <ul class="list-unstyled small">
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/kontak.html">Hubungi Kami</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/blog.html">Berita & Informasi</a></li>
                    <li class="py-1"><span class="text-secondary">Buka: Setiap Hari</span></li>
                    <li class="py-1"><span class="text-success fw-bold">06:00 - 24:00 WIB</span></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/superadmin/index.html">Portal Admin</a></li>
                </ul>
            </div>

            <!-- Col 4: Reservasi & Kontak Cepat -->
            <div class="col-lg-3 col-md-6">
                <h6 class="fw-bold text-dark mb-3">Reservasi Cepat</h6>
                <p class="small text-secondary mb-3">Butuh konfirmasi jadwal segera atau rencana turnamen? Hubungi customer service kami:</p>
                <a href="https://wa.me/6281288880888?text=Halo%20Admin%20Mini%20Soccer%2088%20Pusdikif,%20saya%20mau%20reservasi" target="_blank" class="btn btn-sm btn-success w-100 rounded-pill py-2 font-weight-bold mb-2">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    WhatsApp +62 812-8888-0888
                </a>
                <small class="text-muted d-block text-center">Fast response dalam 5 menit</small>
            </div>

        </div>

        <hr class="my-4" style="border-color:#E5E7EB;">

        <div class="row align-items-center">
            <div class="col-md-8 text-center text-md-start">
                <small class="text-muted">© 2026 Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi. Hak Cipta Dilindungi Undang-Undang.</small>
            </div>
            <div class="col-md-4 text-center text-md-end mt-2 mt-md-0">
                <small class="text-muted">Kawasan Militer Pusdikif Kodiklatad Cimahi</small>
            </div>
        </div>
    </div>
</footer>'''
        html = html[:footer_start] + new_footer + html[footer_end + len('</footer>'):]

    # Clean any leftover localhost:8888 occurrences
    html = html.replace('http://localhost:8888', '')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print("Successfully refactored index.html to Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi!")

if __name__ == '__main__':
    build_ms88_homepage()
