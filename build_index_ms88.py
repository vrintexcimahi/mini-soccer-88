import re
import json

def build_homepage():
    with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 1. Update Title, Meta, and SEO Tags
    html = re.sub(
        r'<title>.*?</title>',
        r'<title>Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi | Lapangan Mini Soccer Standar FIFA</title>',
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
        r'<meta name="description" content="Booking lapangan Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi online. Rumput sintetis premium 30x50m standar FIFA, lampu sorot LED kompetisi, mabar, sparring, kemitraan sekolah & event.">',
        html
    )

    html = re.sub(
        r'<meta name="keywords" content=".*?">',
        r'<meta name="keywords" content="mini soccer 88 alpha sport, mini soccer 88 pusdikif, mini soccer cimahi, sewa lapangan mini soccer cimahi, alpha sport cimahi, booking mini soccer pusdikif, mabar mini soccer cimahi, sparring mini soccer bandung">',
        html
    )

    # 2. Update Favicon in Head
    if '<link rel="icon"' in html:
        html = re.sub(r'<link rel="(?:shortcut )?icon"[^>]*>', '<link rel="icon" type="image/png" href="assets/logo/favicon.png">', html)
    else:
        html = html.replace('</head>', '<link rel="icon" type="image/png" href="assets/logo/favicon.png">\n</head>')

    # 3. Update Schema JSON-LD
    schema_pattern = r'<script type="application/ld\+json">.*?</script>'
    new_schema = '''<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["SportsActivityLocation", "StadiumOrArena"],
            "@id": "#venue",
            "name": "Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi",
            "alternateName": ["88 Alpha Sport", "Mini Soccer 88 Pusdikif"],
            "url": "/",
            "logo": "assets/logo/ms88-logo-transparent.png",
            "image": "assets/img/venue/field-night-floodlight.jpg",
            "description": "Venue Mini Soccer Rumput Sintetis Standar FIFA Terbaik di Kota Cimahi dengan Pencahayaan Malam LED Terang, Fasilitas Lengkap, Mabar, Kemitraan Sekolah dan Turnamen.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Lapangan Pusdikif Kodiklatad, Jalan Gatot Subroto",
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
            "telephone": "+6281295679799",
            "openingHours": "Mo-Su 06:00-23:00",
            "priceRange": "Rp 225.000 - Rp 350.000"
        }
    ]
}
</script>'''
    html = re.sub(schema_pattern, new_schema, html, count=1, flags=re.DOTALL)

    # 4. Custom CSS for 88 Alpha Sport Brand
    custom_css = '''
<style id="alpha-sport-88-theme">
  :root {
    --as88-red: #B91C1C;
    --as88-red-dark: #991B1B;
    --as88-gold: #D97706;
    --as88-gold-light: #F59E0B;
    --as88-pitch: #047857;
    --as88-pitch-dark: #064E3B;
    --as88-dark: #111827;
    --as88-card-bg: #FFFFFF;
    --as88-border: #E5E7EB;
  }
  .ms88-brand-logo {
    height: 52px;
    width: auto;
    max-width: 220px;
    object-fit: contain;
    transition: transform 0.2s ease;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15));
  }
  .ms88-brand-logo:hover {
    transform: scale(1.03);
  }
  .hero-as88 {
    position: relative;
    min-height: 740px;
    background: #0b1320;
    overflow: hidden;
  }
  .hero-as88-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(6, 78, 59, 0.85) 55%, rgba(185, 28, 28, 0.65) 100%);
    z-index: 1;
  }
  .gold-gradient {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #FBBF24 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .badge-as88-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid #F59E0B;
    color: #FDE68A;
    padding: 6px 18px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    backdrop-filter: blur(4px);
  }
  .btn-as88-gold {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #111827 !important;
    font-weight: 800;
    padding: 13px 26px;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.35);
    border: none;
  }
  .btn-as88-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(217, 119, 6, 0.5);
    color: #000 !important;
  }
  .btn-as88-red {
    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
    color: #FFFFFF !important;
    font-weight: 800;
    padding: 13px 26px;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35);
    border: none;
  }
  .btn-as88-red:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
  }
  .btn-as88-wa {
    background: #25D366;
    color: #FFFFFF !important;
    font-weight: 700;
    padding: 13px 24px;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
  }
  .btn-as88-wa:hover {
    transform: translateY(-2px);
    background: #1EBE5D;
    color: #FFFFFF !important;
  }
  .as88-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 1px solid #E5E7EB;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    overflow: hidden;
  }
  .as88-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.1);
    border-color: #F59E0B;
  }
  .pricing-tier-card {
    border-radius: 18px;
    padding: 24px 20px;
    background: #FFFFFF;
    border: 2px solid #E5E7EB;
    text-align: center;
    transition: all 0.25s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .pricing-tier-card:hover {
    transform: translateY(-5px);
    border-color: #D97706;
    box-shadow: 0 10px 25px rgba(217,119,6,0.15);
  }
  .pricing-tier-card.featured {
    border-color: #DC2626;
    background: linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 100%);
    box-shadow: 0 8px 24px rgba(220,38,38,0.12);
  }
  .pricing-tier-card.night-prime {
    border-color: #D97706;
    background: linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 100%);
    box-shadow: 0 8px 24px rgba(217,119,6,0.12);
  }
  .mascot-hero-badge {
    animation: floatMascot 4s ease-in-out infinite;
    max-height: 480px;
    filter: drop-shadow(0 15px 25px rgba(0,0,0,0.4));
  }
  @keyframes floatMascot {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .gallery-img-wrap {
    height: 220px;
    overflow: hidden;
    border-radius: 16px;
    position: relative;
  }
  .gallery-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }
  .gallery-img-wrap:hover img {
    transform: scale(1.06);
  }
  .schedule-table-wrap {
    overflow-x: auto;
    border-radius: 16px;
    border: 1px solid #E5E7EB;
  }
  .schedule-table th {
    background: #111827;
    color: #F3F4F6;
    padding: 12px 14px;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .schedule-table td {
    padding: 10px 14px;
    font-size: 13px;
    border-bottom: 1px solid #F3F4F6;
    white-space: nowrap;
  }
  .schedule-table tr:hover td {
    background: #F9FAFB;
  }
  .tag-booked {
    background: #DC2626;
    color: #FFF;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 11px;
    display: inline-block;
  }
  .tag-available {
    background: #059669;
    color: #FFF;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 11px;
    display: inline-block;
  }
</style>
'''
    if 'alpha-sport-88-theme' in html:
        html = re.sub(r'<style id="alpha-sport-88-theme">.*?</style>', custom_css, html, flags=re.DOTALL)
    elif 'ms88-custom-styles' in html:
        html = re.sub(r'<style id="ms88-custom-styles">.*?</style>', custom_css, html, flags=re.DOTALL)
    else:
        html = html.replace('</head>', custom_css + '\n</head>')

    # 5. Navbar Rebuild: Brand logo 3D, menus, and verified WA
    navbar_pattern = r'<div class="navbar-top-row d-flex align-items-center justify-content-between">.*?</div>\s*<div class="col-auto px-0 mx-xl-3" id="auth-action">.*?</div>'
    new_navbar_top = '''<div class="navbar-top-row d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <a class="p-0 d-flex align-items-center text-decoration-none" href="/" aria-label="Mini Soccer 88 Homepage">
                    <img class="mr-3 ms88-brand-logo" src="assets/logo/ms88-logo-transparent.png" alt="Mini Soccer 88 Alpha Sport Pusdikif Logo">
                </a>
                <div id="ms88LocationBar" class="ms88-location-bar d-none d-md-flex align-items-center" onclick="GeoMS88.showModal()" style="margin-left:14px;cursor:pointer;background:#F9FAFB;padding:6px 14px;border-radius:20px;font-size:13px;color:#374151;border:1px solid #E5E7EB;">
                  <span class="geo-pin me-1" style="color:#DC2626;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                  <span class="geo-placeholder" style="font-weight:600;">Lapangan Pusdikif Cimahi</span>
                </div>
            </div>
            <div class="col-auto px-0 mx-xl-3 d-flex align-items-center" id="auth-action">
                <a href="https://wa.me/6281295679799?text=Halo%20Admin%20Mini%20Soccer%2088%20Alpha%20Sport,%20saya%20mau%20booking%20jadwal%20lapangan" target="_blank" class="btn btn-sm text-white font-weight-bold px-3 py-2 rounded-pill me-2 d-none d-lg-inline-flex align-items-center" style="background:#25D366;box-shadow:0 2px 8px rgba(37,211,102,0.35);">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Booking WA: 0812-9567-9799
                </a>
                <a href="/superadmin/index.html" class="btn btn-sm btn-outline-dark px-3 py-2 rounded-pill font-weight-bold">
                    Superadmin
                </a>
            </div>'''
    html = re.sub(navbar_pattern, new_navbar_top, html, count=1, flags=re.DOTALL)

    # Replace Nav items
    nav_items_pattern = r'<ul class="navbar-nav me-auto mb-2 mb-lg-0.*?">.*?</ul>'
    new_nav_items = '''<ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
        <li class="nav-item left-menu-item" style="white-space: nowrap;">
            <a class="nav-link s16-400" href="/sewa-lapangan.html" style="color:#111827;font-weight:700;">
                Sewa Lapangan
            </a>
        </li>
        <li class="nav-item left-menu-item" style="white-space: nowrap;">
            <a class="nav-link s16-400" href="/#pricelist" style="color:#374151;font-weight:600;">
                Tarif Resmi
            </a>
        </li>
        <li class="nav-item left-menu-item" style="white-space: nowrap;">
            <a class="nav-link s16-400" href="/partner.html" style="color:#374151;font-weight:600;">
                Kemitraan Sekolah & Event
            </a>
        </li>
        <li class="nav-item left-menu-item" style="white-space: nowrap;">
            <a class="nav-link s16-400" href="/main-bareng.html" style="color:#374151;font-weight:600;">
                Komunitas & Mabar
            </a>
        </li>
        <li class="nav-item left-menu-item" style="white-space: nowrap;">
            <a class="nav-link s16-400" href="/kompetisi.html" style="color:#374151;font-weight:600;">
                Dokumentasi & Turnamen
            </a>
        </li>
        <li class="nav-item left-menu-item" style="white-space: nowrap;">
            <a class="nav-link s16-400" href="/kontak.html" style="color:#374151;font-weight:600;">
                Kontak & Lokasi
            </a>
        </li>
    </ul>'''
    html = re.sub(nav_items_pattern, new_nav_items, html, count=1, flags=re.DOTALL)

    # 6. Rebuild Main Body Content (<main> ... </main>)
    main_start = html.find('<main>')
    main_end = html.find('</main>')
    if main_start != -1 and main_end != -1:
        new_main = '''<main>
    <div class="contents overflow-hidden" id="app" style="position:relative;">
        
        <!-- HERO SECTION -->
        <section class="hero-as88 position-relative">
            <!-- Background Images: Real Pusdikif Night Floodlight & Daylight -->
            <img src="assets/img/venue/field-night-floodlight.jpg" alt="Mini Soccer 88 Alpha Sport Pusdikif Night Floodlight" class="w-100 h-100 position-absolute d-none d-md-block" style="object-fit:cover; object-position: center 40%; filter: brightness(0.65) contrast(1.15);" fetchpriority="high">
            <img src="assets/img/venue/field-day-center.jpg" alt="Mini Soccer 88 Alpha Sport Pusdikif Daylight" class="w-100 h-100 position-absolute d-block d-md-none" style="object-fit:cover; object-position: center center; filter: brightness(0.6);" fetchpriority="high">
            
            <div class="hero-as88-overlay"></div>

            <div class="container position-relative" style="z-index: 2; padding-top: 130px; padding-bottom: 110px;">
                <div class="row align-items-center">
                    
                    <!-- Left: Brand Text & CTAs -->
                    <div class="col-lg-7 text-white">
                        
                        <!-- Top Tag Badge -->
                        <div class="badge-as88-pill mb-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            STANDAR FIFA • PUSDIKIF KOTA CIMAHI
                        </div>

                        <!-- Main Headline -->
                        <h1 class="mb-3" style="font-size: clamp(34px, 4.4vw, 56px); font-weight: 900; line-height: 1.15; letter-spacing: -0.5px;">
                            MINI SOCCER 88 <br>
                            <span class="gold-gradient">ALPHA SPORT</span>
                        </h1>

                        <!-- Slogans -->
                        <p class="lead fw-bold mb-2" style="color: #FDE68A; font-size: clamp(17px, 2vw, 22px); letter-spacing: 0.5px;">
                            "Play Hard, Play Together, Win Together!"
                        </p>

                        <!-- Subtitle -->
                        <p class="mb-4" style="color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.7; max-width: 580px;">
                            Rasakan pengalaman bermain mini soccer berstandar tinggi di kawasan militer Pusdikif Kota Cimahi. Rumput sintetis berkualitas <strong>30 x 50 Meter</strong>, lampu stadion LED malam super terang, fasilitas komprehensif, dan tarif bersahabat.
                        </p>

                        <!-- Action Buttons -->
                        <div class="d-flex flex-wrap gap-3 mt-4">
                            <a href="/sewa-lapangan.html" class="btn-as88-gold">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                Booking Sekarang
                            </a>
                            <a href="#pricelist" class="btn btn-outline-light rounded-pill px-4 py-3 fw-bold" style="border-width:2px;">
                                Lihat Tarif Resmi
                            </a>
                            <a href="https://wa.me/6281295679799?text=Halo%20Admin%2088%20Alpha%20Sport,%20saya%20mau%20tanya%20jadwal%20booking" target="_blank" class="btn-as88-wa">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                WhatsApp Admin
                            </a>
                        </div>

                        <!-- Venue Highlights Pills -->
                        <div class="d-flex flex-wrap gap-3 mt-4 pt-3 text-white-50" style="font-size: 13px;">
                            <span class="d-inline-flex align-items-center text-white"><span style="color:#10B981;margin-right:6px;">✔</span> Buka 06.00 – 23.00 WIB</span>
                            <span class="d-inline-flex align-items-center text-white"><span style="color:#10B981;margin-right:6px;">✔</span> Free Bola FIFA & Rompi Tim</span>
                            <span class="d-inline-flex align-items-center text-white"><span style="color:#10B981;margin-right:6px;">✔</span> Kantin Sekar & Musholla</span>
                            <span class="d-inline-flex align-items-center text-white"><span style="color:#10B981;margin-right:6px;">✔</span> Keamanan Militer 24 Jam</span>
                        </div>

                    </div>

                    <!-- Right: Official 3D Logo & Mascot Showcase -->
                    <div class="col-lg-5 text-center mt-5 mt-lg-0 d-none d-lg-block position-relative">
                        <div style="background: radial-gradient(circle, rgba(217,119,6,0.2) 0%, transparent 70%); padding: 30px; border-radius: 50%;">
                            <img src="assets/logo/ms88-mascot-transparent.png" alt="Maskot Resmi Alpha Commando 88" class="img-fluid mascot-hero-badge ms88-mascot-img">
                        </div>
                        <div class="mt-2 text-center">
                            <span class="badge bg-dark bg-opacity-75 text-warning border border-warning px-3 py-2 rounded-pill fw-bold">
                                Official Mascot: Alpha Commando Player 88
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- QUICK BOOKING & FILTER BAR -->
        <div class="container col-xl-10 col-11 px-0" style="position: relative; margin-top: -50px; z-index: 10;">
            <div class="card p-4 p-md-4 shadow-lg border-0" style="border-radius: 20px; background: #FFFFFF; box-shadow: 0 16px 36px rgba(0,0,0,0.12) !important;">
                <form action="/sewa-lapangan.html" method="GET">
                    <div class="row g-3 align-items-center">
                        <div class="col-md-4">
                            <label class="form-label mb-1 text-muted small fw-bold">PILIHAN SESI TARIF</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light border-end-0 text-danger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                                <select class="form-select border-start-0 bg-light" name="sesi" style="font-weight: 600;">
                                    <option value="happy_hours">Happy Hours (10:00 - 15:00) — Rp 225.000 / jam</option>
                                    <option value="prime_morning">Prime Morning (06:00 - 08:00) — Rp 250.000 / jam</option>
                                    <option value="morning">Morning (08:00 - 10:00) — Rp 275.000 / jam</option>
                                    <option value="prime_time">Prime Time (15:00 - 18:00) — Rp 300.000 / jam</option>
                                    <option value="premium_night" selected>Premium Night (18:00 - 22:00) — Rp 350.000 / jam</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <label class="form-label mb-1 text-muted small fw-bold">TANGGAL MAIN</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light border-end-0 text-danger"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                <input type="date" class="form-control border-start-0 bg-light" name="tanggal" value="2026-09-16" style="font-weight: 600;">
                            </div>
                        </div>

                        <div class="col-md-2">
                            <label class="form-label mb-1 text-muted small fw-bold">DURASI</label>
                            <select class="form-select bg-light" name="durasi" style="font-weight: 600;">
                                <option value="1">1 Jam</option>
                                <option value="2" selected>2 Jam</option>
                                <option value="3">3 Jam</option>
                            </select>
                        </div>

                        <div class="col-md-3 d-grid pt-md-4">
                            <button type="submit" class="btn btn-as88-red w-100 justify-content-center" style="padding: 12px 16px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                Cek & Pesan Lapangan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- STATS / SPECS HIGHLIGHT -->
        <section class="container col-xl-10 col-11 my-5 pt-3">
            <div class="row g-4 text-center">
                <div class="col-6 col-lg-3">
                    <div class="as88-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div class="display-6 fw-bold mb-1" style="color:#B91C1C;">30 x 50 M</div>
                        <div class="fw-bold text-dark mb-1">Ukuran Lapangan Resmi</div>
                        <small class="text-muted">Rumput Sintetis Monofilament Premium</small>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="as88-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div class="display-6 fw-bold mb-1" style="color:#D97706;">800+ Lux</div>
                        <div class="fw-bold text-dark mb-1">LED Stadium Lights</div>
                        <small class="text-muted">Pencahayaan Malam Hari Terang & Merata</small>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="as88-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div class="display-6 fw-bold mb-1" style="color:#047857;">Mulai 225k</div>
                        <div class="fw-bold text-dark mb-1">Tarif Sangat Terjangkau</div>
                        <small class="text-muted">5 Pilihan Sesi Waktu Fleksibel</small>
                    </div>
                </div>
                <div class="col-6 col-lg-3">
                    <div class="as88-card p-4 h-100 d-flex flex-column justify-content-center">
                        <div class="display-6 fw-bold mb-1" style="color:#111827;">24 Jam</div>
                        <div class="fw-bold text-dark mb-1">Keamanan Kompleks Militer</div>
                        <small class="text-muted">Parkir Aman & Nyaman di Pusdikif</small>
                    </div>
                </div>
            </div>
        </section>

        <!-- PRICELIST SECTION (BULAN SEPTEMBER 2026) -->
        <section id="pricelist" class="container col-xl-10 col-11 my-5 py-4">
            <div class="text-center mb-5">
                <span class="badge bg-danger text-white px-3 py-2 rounded-pill fw-bold mb-2">HARGA SEWA PER JAM</span>
                <h2 class="display-6 fw-bold" style="color:#111827;">Tarif Resmi Mini Soccer 88 Alpha Sport</h2>
                <p class="text-secondary mx-auto" style="max-width: 650px;">
                    Jadwal fleksibel, harga bersahabat, fasilitas kelas satu. Main seru, harga pas, kualitas kelas!
                </p>
            </div>

            <div class="row g-3">
                
                <!-- 1. Prime Morning -->
                <div class="col-md-6 col-lg">
                    <div class="pricing-tier-card">
                        <div>
                            <span class="badge bg-light text-dark border mb-2">06.00 – 08.00 WIB</span>
                            <h5 class="fw-bold text-dark mb-1">Prime Morning</h5>
                            <div class="my-3">
                                <span class="fs-4 fw-bold" style="color:#B91C1C;">Rp 250.000</span>
                                <small class="text-muted d-block">/ jam</small>
                            </div>
                            <p class="small text-muted mb-3">Udara sejuk pagi hari Cimahi, ideal untuk latihan fisik & komunitas sehat.</p>
                        </div>
                        <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20booking%20sesi%20Prime%20Morning%20(06.00-08.00)" target="_blank" class="btn btn-outline-danger w-100 rounded-pill fw-bold btn-sm py-2">Pesan Pagi</a>
                    </div>
                </div>

                <!-- 2. Morning -->
                <div class="col-md-6 col-lg">
                    <div class="pricing-tier-card">
                        <div>
                            <span class="badge bg-light text-dark border mb-2">08.00 – 10.00 WIB</span>
                            <h5 class="fw-bold text-dark mb-1">Morning</h5>
                            <div class="my-3">
                                <span class="fs-4 fw-bold" style="color:#B91C1C;">Rp 275.000</span>
                                <small class="text-muted d-block">/ jam</small>
                            </div>
                            <p class="small text-muted mb-3">Sinar matahari pagi optimal, pas untuk match akhir pekan & sparring santai.</p>
                        </div>
                        <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20booking%20sesi%20Morning%20(08.00-10.00)" target="_blank" class="btn btn-outline-danger w-100 rounded-pill fw-bold btn-sm py-2">Pesan Morning</a>
                    </div>
                </div>

                <!-- 3. Happy Hours (Featured Best Value) -->
                <div class="col-md-6 col-lg">
                    <div class="pricing-tier-card featured">
                        <span class="badge bg-danger text-white position-absolute top-0 start-50 translate-middle px-3 py-1 rounded-pill fw-bold" style="font-size:11px;">PROMO TERBAIK</span>
                        <div>
                            <span class="badge bg-light text-dark border mb-2 mt-2">10.00 – 15.00 WIB</span>
                            <h5 class="fw-bold text-danger mb-1">Happy Hours</h5>
                            <div class="my-3">
                                <span class="fs-3 fw-bold" style="color:#DC2626;">Rp 225.000</span>
                                <small class="text-muted d-block">/ jam</small>
                            </div>
                            <p class="small text-muted mb-3">Tarif paling hemat! Spesial untuk pelajar, mahasiswa, dan ekskul sekolah.</p>
                        </div>
                        <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20booking%20sesi%20Happy%20Hours%20(10.00-15.00)" target="_blank" class="btn btn-danger w-100 rounded-pill fw-bold btn-sm py-2">Pesan Happy Hour</a>
                    </div>
                </div>

                <!-- 4. Prime Time -->
                <div class="col-md-6 col-lg">
                    <div class="pricing-tier-card">
                        <div>
                            <span class="badge bg-light text-dark border mb-2">15.00 – 18.00 WIB</span>
                            <h5 class="fw-bold text-dark mb-1">Prime Time</h5>
                            <div class="my-3">
                                <span class="fs-4 fw-bold" style="color:#B91C1C;">Rp 300.000</span>
                                <small class="text-muted d-block">/ jam</small>
                            </div>
                            <p class="small text-muted mb-3">Sore hari favorit pulang sekolah & kantor dengan angin sejuk Cimahi.</p>
                        </div>
                        <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20booking%20sesi%20Prime%20Time%20(15.00-18.00)" target="_blank" class="btn btn-outline-danger w-100 rounded-pill fw-bold btn-sm py-2">Pesan Sore</a>
                    </div>
                </div>

                <!-- 5. Premium Night -->
                <div class="col-md-6 col-lg">
                    <div class="pricing-tier-card night-prime">
                        <span class="badge bg-warning text-dark position-absolute top-0 start-50 translate-middle px-3 py-1 rounded-pill fw-bold" style="font-size:11px;">FULL LED NIGHT</span>
                        <div>
                            <span class="badge bg-light text-dark border mb-2 mt-2">18.00 – 22.00 WIB</span>
                            <h5 class="fw-bold text-dark mb-1">Premium Night</h5>
                            <div class="my-3">
                                <span class="fs-4 fw-bold" style="color:#D97706;">Rp 350.000</span>
                                <small class="text-muted d-block">/ jam</small>
                            </div>
                            <p class="small text-muted mb-3">Atmosfer stadion profesional di bawah lampu sorot LED benderang.</p>
                        </div>
                        <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20booking%20sesi%20Premium%20Night%20(18.00-22.00)" target="_blank" class="btn btn-warning text-dark w-100 rounded-pill fw-bold btn-sm py-2">Pesan Malam</a>
                    </div>
                </div>

            </div>

            <!-- Free Facilities Note -->
            <div class="mt-4 p-3 bg-light rounded-4 text-center text-muted small d-flex flex-wrap justify-content-center gap-4">
                <span><strong class="text-dark">Sudah Termasuk:</strong></span>
                <span>⚽ Bola Resmi Standar FIFA</span>
                <span>🎽 Rompi Tim 2 Warna</span>
                <span>🚿 Ruang Ganti & Toilet Bersih</span>
                <span>🕌 Akses Musholla Pusdikif</span>
                <span>🅿 Parkir Militer Terjaga</span>
            </div>
        </section>

        <!-- REAL VENUE PHOTOGRAPHY & FACILITIES GALLERY -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="text-center mb-5">
                <span class="badge bg-success text-white px-3 py-2 rounded-pill fw-bold mb-2">DOKUMENTASI ASLI VENUE</span>
                <h2 class="display-6 fw-bold" style="color:#111827;">Galeri Fasilitas Lapangan Pusdikif</h2>
                <p class="text-secondary mx-auto" style="max-width: 650px;">
                    Lihat langsung kondisi nyata lapangan rumput sintetis premium, pencahayaan LED malam hari, dan lingkungan Pusdikif yang tertata rapi.
                </p>
            </div>

            <div class="row g-4">
                
                <div class="col-md-4">
                    <div class="as88-card h-100">
                        <div class="gallery-img-wrap">
                            <img src="assets/img/venue/field-night-floodlight.jpg" alt="Penerangan Lampu LED Stadion Malam Hari">
                        </div>
                        <div class="p-3">
                            <h6 class="fw-bold mb-1 text-dark">Penerangan LED Stadion Malam Hari</h6>
                            <small class="text-muted">Lampu sorot LED berdaya tinggi terang merata ke seluruh sudut lapangan tanpa titik gelap.</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="as88-card h-100">
                        <div class="gallery-img-wrap">
                            <img src="assets/img/venue/field-night-ball-fifa.jpg" alt="Rumput Sintetis Berkualitas & Bola FIFA">
                        </div>
                        <div class="p-3">
                            <h6 class="fw-bold mb-1 text-dark">Rumput Sintetis Monofilament & Bola FIFA</h6>
                            <small class="text-muted">Serat rumput monofilament empuk dengan rubber infill aman untuk sprint dan sliding.</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="as88-card h-100">
                        <div class="gallery-img-wrap">
                            <img src="assets/img/venue/field-day-center.jpg" alt="Lingkaran Tengah & Gawang Berstandar">
                        </div>
                        <div class="p-3">
                            <h6 class="fw-bold mb-1 text-dark">Lingkaran Tengah & Gawang Standar</h6>
                            <small class="text-muted">Garis lapangan presisi, jaring gawang tebal, dengan latar Aula A.H. Nasution Pusdikif.</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="as88-card h-100">
                        <div class="gallery-img-wrap">
                            <img src="assets/img/venue/field-tribun-dugout.jpg" alt="Dugout Pemain & Tribun Mini Beratap">
                        </div>
                        <div class="p-3">
                            <h6 class="fw-bold mb-1 text-dark">Dugout Pemain & Tribun Mini</h6>
                            <small class="text-muted">Bench pemain teduh berkanopi nyaman untuk istirahat tim, pelatih, dan penonton.</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="as88-card h-100">
                        <div class="gallery-img-wrap">
                            <img src="assets/img/venue/field-panorama-mosque.jpg" alt="Musholla & Masjid Pusdikif Berdampingan">
                        </div>
                        <div class="p-3">
                            <h6 class="fw-bold mb-1 text-dark">Musholla Pusdikif Berdampingan</h6>
                            <small class="text-muted">Ibadah sholat tepat waktu sangat mudah karena musholla/masjid berada persis di sisi lapangan.</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="as88-card h-100">
                        <div class="gallery-img-wrap">
                            <img src="assets/img/venue/field-day-wide.jpg" alt="Ukuran Lapangan 30 x 50 Meter">
                        </div>
                        <div class="p-3">
                            <h6 class="fw-bold mb-1 text-dark">Ukuran Lapangan 30 x 50 Meter</h6>
                            <small class="text-muted">Dikelilingi jaring pengaman tinggi dan pepohonan asri di dalam kompleks militer Pusdikif.</small>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- SPECIAL PROGRAMS: SEKOLAH, FOTOGRAFER, KOMMOTO, CREATOR -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="text-center mb-5">
                <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-2">PROGRAM & LAYANAN KHUSUS</span>
                <h2 class="display-6 fw-bold" style="color:#111827;">Lebih Dari Sekadar Lapangan</h2>
                <p class="text-secondary mx-auto" style="max-width: 650px;">
                    "Menjadi ruang tumbuh untuk prestasi, karakter, dan kebersamaan."
                </p>
            </div>

            <div class="row g-4">
                
                <!-- 1. Proposal Kerjasama Sekolah -->
                <div class="col-lg-6">
                    <div class="as88-card p-4 p-md-5 h-100" style="border-left: 6px solid #DC2626;">
                        <span class="badge bg-danger px-3 py-1 rounded-pill mb-3">PARTNER TERBAIK SEKOLAH</span>
                        <h3 class="fw-bold text-dark mb-3">Kerjasama Sekolah & Ekstrakurikuler</h3>
                        <p class="text-secondary mb-3" style="line-height:1.7;">
                            Mini Soccer 88 Alpha Sport menyediakan lapangan rumput sintetis <strong>30 x 50 meter</strong> untuk kegiatan siswa SD, SMP, SMA/SMK, dan Madrasah di Kota Cimahi:
                        </p>
                        <ul class="list-unstyled small text-muted mb-4">
                            <li class="mb-2">⚽ <strong>Ekstrakurikuler:</strong> Mini Soccer, PJOK, Senam, Dance, Atletik Ringan.</li>
                            <li class="mb-2">🥋 <strong>Bela Diri:</strong> Silat, Karate, Taekwondo (tersedia area dengan matras).</li>
                            <li class="mb-2">🎓 <strong>Event Spesial:</strong> Wisuda Outdoor Play Group, PAUD, TK, Acara Ulang Tahun & Gathering.</li>
                            <li class="mb-2">⏰ <strong>Waktu Pemanfaatan:</strong> Senin – Jumat: 07.00 – 15.00 WIB (Fleksibel).</li>
                            <li class="mb-2">📅 <strong>Skema Kerjasama:</strong> Harian, Mingguan, Paket Semester, dan Paket Tahunan.</li>
                        </ul>
                        <div class="d-flex flex-wrap gap-2">
                            <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20ingin%20mengajukan%20Proposal%20Kerjasama%20Sekolah%20Mini%20Soccer%2088" target="_blank" class="btn btn-danger rounded-pill px-4 fw-bold">
                                Ajukan Kerjasama Sekolah
                            </a>
                            <a href="/partner.html" class="btn btn-outline-secondary rounded-pill px-3 fw-bold">
                                Detail Proposal
                            </a>
                        </div>
                    </div>
                </div>

                <!-- 2. Jasa Fotografer GERAK -->
                <div class="col-lg-6">
                    <div class="as88-card p-4 p-md-5 h-100" style="border-left: 6px solid #F59E0B;">
                        <span class="badge bg-warning text-dark px-3 py-1 rounded-pill mb-3">DOKUMENTASI PERTANDINGAN</span>
                        <h3 class="fw-bold text-dark mb-3">Jasa Fotografer — GERAK Content Creator</h3>
                        <p class="text-secondary mb-3" style="line-height:1.7;">
                            Abadikan momen aksi terbaik tim kamu bersama partner resmi kami <strong>GERAK</strong> (@gerak.tangkap.abadikan). Foto jernih, tajam, penuh warna, dan dikirim cepat via Google Drive:
                        </p>
                        <div class="row g-2 mb-4 text-center">
                            <div class="col-4">
                                <div class="p-2 border rounded-3 bg-light">
                                    <small class="text-muted d-block">Paket Basic</small>
                                    <strong class="text-dark">Rp 300.000</strong>
                                    <small class="d-block text-muted" style="font-size:10px;">100+ Foto Match</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="p-2 border rounded-3 bg-warning bg-opacity-25 border-warning">
                                    <small class="text-dark fw-bold d-block">Best Choice</small>
                                    <strong class="text-dark">Rp 450.000</strong>
                                    <small class="d-block text-muted" style="font-size:10px;">150+ Foto + Team</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="p-2 border rounded-3 bg-light">
                                    <small class="text-muted d-block">Paket Premium</small>
                                    <strong class="text-dark">Rp 600.000</strong>
                                    <small class="d-block text-muted" style="font-size:10px;">200+ Foto + Highlight</small>
                                </div>
                            </div>
                        </div>
                        <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20booking%20Paket%20Fotografer%20GERAK%20untuk%20pertandingan" target="_blank" class="btn btn-warning text-dark rounded-pill px-4 fw-bold">
                            Pesan Fotografer GERAK
                        </a>
                    </div>
                </div>

                <!-- 3. Komunitas Moe Tonggong (KOMMOTO 7-8) -->
                <div class="col-lg-6">
                    <div class="as88-card p-4 p-md-5 h-100" style="border-left: 6px solid #059669;">
                        <span class="badge bg-success px-3 py-1 rounded-pill mb-3">KOMUNITAS SEHAT SENIOR</span>
                        <h3 class="fw-bold text-dark mb-3">KOMMOTO 7-8: Komunitas Moe Tonggong</h3>
                        <p class="text-secondary mb-3" style="line-height:1.7;">
                            <em>"Jemur Sehat Badan Nikmat — Tonggong Bareng Bahagia Terus!"</em><br>
                            Sesi jalan pagi, peregangan sendi, dan jemur matahari pagi di rumput hijau Pusdikif setiap pukul <strong>07.00 – 08.00 WIB</strong>.
                        </p>
                        <div class="d-flex align-items-center gap-3 p-3 bg-light rounded-4 mb-4">
                            <div class="fs-2">☕</div>
                            <div>
                                <strong class="text-success d-block">HTM Hanya Rp 15.000</strong>
                                <small class="text-muted">Sudah termasuk <strong>FREE TEH HANGAT</strong> dari Kantin Sekar Pusdikif!</small>
                            </div>
                        </div>
                        <a href="https://wa.me/6281295679799?text=Halo%20Admin,%20saya%20mau%20gabung%20sesi%20Kommoto%207-8%20Jemur%20Pagi" target="_blank" class="btn btn-success rounded-pill px-4 fw-bold">
                            Gabung Komunitas KOMMOTO
                        </a>
                    </div>
                </div>

                <!-- 4. Content Creator Collaboration -->
                <div class="col-lg-6">
                    <div class="as88-card p-4 p-md-5 h-100" style="border-left: 6px solid #111827;">
                        <span class="badge bg-dark text-white px-3 py-1 rounded-pill mb-3">KOLABORASI DIGITAL</span>
                        <h3 class="fw-bold text-dark mb-3">Kolaborasi Content Creator & Tim</h3>
                        <p class="text-secondary mb-3" style="line-height:1.7;">
                            Terbuka untuk semua konten kreator, selebgram, youtuber, tiktoker, dan komunitas sepak bola untuk membuat konten kreatif, gameplay challenge, tutorial, maupun review venue di 88 Alpha Sport.
                        </p>
                        <p class="small text-muted mb-4">
                            ✔ Gratis penggunaan lapangan sesuai kesepakatan<br>
                            ✔ Akses lighting, ruang ganti, dan area tunggu<br>
                            ✔ Tag resmi @88alphasport
                        </p>
                        <a href="https://wa.me/6281295679799?text=Halo%20Admin%2088%20Alpha%20Sport,%20saya%20kreator%20mau%20kolaborasi%20konten" target="_blank" class="btn btn-dark rounded-pill px-4 fw-bold">
                            Hubungi Admin Kreator (@88alphasport)
                        </a>
                    </div>
                </div>

            </div>
        </section>

        <!-- LIVE SCHEDULE & REAL BOOKINGS SEPTEMBER 2026 -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="text-center mb-5">
                <span class="badge bg-secondary text-white px-3 py-2 rounded-pill fw-bold mb-2">STATUS LAPANGAN REAL-TIME</span>
                <h2 class="display-6 fw-bold" style="color:#111827;">Jadwal Pertandingan September 2026</h2>
                <p class="text-secondary mx-auto" style="max-width: 650px;">
                    Jadwal resmi klub dan akademi yang telah terkonfirmasi bermain di Lapangan Pusdikif Kota Cimahi.
                </p>
            </div>

            <!-- Schedule Tabs -->
            <ul class="nav nav-pills justify-content-center mb-4 gap-2" id="schedTabs" role="tablist">
                <li class="nav-item">
                    <button class="nav-link active rounded-pill fw-bold px-4" id="tab-w2-btn" type="button" onclick="switchSchedTab('07-13_SEP_2026')">Minggu II (07 - 13 Sep)</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link rounded-pill fw-bold px-4" id="tab-w3-btn" type="button" onclick="switchSchedTab('14-20_SEP_2026')">Minggu III (14 - 20 Sep)</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link rounded-pill fw-bold px-4" id="tab-w4-btn" type="button" onclick="switchSchedTab('21-27_SEP_2026')">Minggu IV (21 - 27 Sep)</button>
                </li>
            </ul>

            <div class="schedule-table-wrap bg-white shadow-sm p-2">
                <table class="table schedule-table mb-0 text-center align-middle">
                    <thead>
                        <tr>
                            <th>Waktu (WIB)</th>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Nama Klub / Sesi</th>
                            <th>Status Slot</th>
                        </tr>
                    </thead>
                    <tbody id="scheduleTableBody">
                        <!-- Populated by JavaScript -->
                    </tbody>
                </table>
            </div>

            <div class="text-center mt-4">
                <a href="https://wa.me/6281295679799?text=Halo%20Admin%2088%20Alpha%20Sport,%20saya%20mau%20tanya%20slot%20kosong%20minggu%20ini" target="_blank" class="btn btn-as88-red">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Booking Slot Kosong Sekarang
                </a>
            </div>
        </section>

        <!-- OFFICIAL QRIS PAYMENT SECTION -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="as88-card p-4 p-md-5" style="background: linear-gradient(135deg, #111827 0%, #1F2937 100%); color:white;">
                <div class="row align-items-center">
                    
                    <div class="col-lg-7">
                        <span class="badge bg-danger text-white px-3 py-1 rounded-pill fw-bold mb-3">SATU QRIS UNTUK SEMUA</span>
                        <h2 class="fw-bold mb-3 text-white">Pembayaran Mudah & Terverifikasi Otomatis</h2>
                        <p class="text-white-50 mb-4" style="line-height:1.7;">
                            Mini Soccer 88 Alpha Sport mendukung pembayaran instan QRIS Nasional standar Bank Indonesia dan GPN. Terima seluruh aplikasi m-banking dan e-wallet di Indonesia.
                        </p>
                        
                        <div class="p-3 bg-dark bg-opacity-50 rounded-4 border border-secondary mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted small">Merchant Name:</span>
                                <strong class="text-warning">88 ALPHA MINI SOCCER</strong>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted small">NMID:</span>
                                <strong class="text-light">ID1026529171542 (A01)</strong>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted small">Bank Mandiri Rekening:</span>
                                <strong class="text-light">13000-23009007</strong>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="text-muted small">Atas Nama:</span>
                                <strong class="text-light">PT. Sarana Digital Retail (dRetail POS)</strong>
                            </div>
                        </div>

                        <div class="d-flex flex-wrap gap-2 text-white-50 small">
                            <span>✔ BCA Mobile</span>
                            <span>✔ Livin' Mandiri</span>
                            <span>✔ BRImo</span>
                            <span>✔ BNI Mobile</span>
                            <span>✔ GoPay</span>
                            <span>✔ OVO</span>
                            <span>✔ DANA</span>
                            <span>✔ ShopeePay</span>
                        </div>
                    </div>

                    <div class="col-lg-5 mt-4 mt-lg-0 text-center">
                        <div class="bg-white p-3 rounded-4 d-inline-block shadow-lg">
                            <img src="assets/payment/qris-alpha-sport.jpg" alt="QRIS 88 Alpha Mini Soccer" class="img-fluid ms88-qris-img" style="max-height: 320px; object-fit: contain;">
                            <div class="mt-2 text-dark small fw-bold">Scan untuk Pembayaran Booking</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- TATA TERTIB LAPANGAN -->
        <section class="container col-xl-10 col-11 my-5 py-4">
            <div class="card border-0 bg-light p-4 p-md-5 rounded-4 border">
                <h4 class="fw-bold mb-3 text-dark text-center">Tata Tertib Pemanfaatan Fasilitas Mini Soccer 88</h4>
                <div class="row g-3 small text-secondary mt-2">
                    <div class="col-md-6">
                        <div class="p-2">✔ Gunakan sepatu khusus futsal / turf training (non-stud).</div>
                        <div class="p-2">❌ Dilarang menggunakan sepatu pul besi.</div>
                        <div class="p-2">❌ Dilarang membawa kendaraan, api, rokok, dan benda tajam ke lapangan.</div>
                        <div class="p-2">❌ Dilarang menyeret meja, kursi, atau alat berat di atas rumput.</div>
                        <div class="p-2">❌ Dilarang menumpahkan bahan kimia atau cairan perusak rumput.</div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-2">❌ Dilarang memaku tenda di area lapangan sintetis.</div>
                        <div class="p-2">❌ Dilarang membawa makanan berat dan permen karet ke lapangan.</div>
                        <div class="p-2">❌ Dilarang membawa hewan peliharaan ke dalam venue.</div>
                        <div class="p-2">🥋 Kegiatan olahraga bela diri wajib menggunakan matras pelindung.</div>
                        <div class="p-2">⚠ Kerusakan akibat kelalaian menjadi tanggung jawab penyewa.</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FINAL CTA BANNER -->
        <section class="container col-xl-10 col-11 my-5">
            <div class="as88-card p-5 text-center text-white" style="background: linear-gradient(135deg, #991B1B 0%, #B91C1C 60%, #D97706 100%); border:none; box-shadow: 0 16px 36px rgba(185,28,28,0.35);">
                <h2 class="display-6 fw-bold mb-3">Siap Menguasai Lapangan Hijau?</h2>
                <p class="lead mb-4 mx-auto" style="max-width: 680px; opacity: 0.95;">
                    Pesan slot main tim kamu sekarang sebelum kehabisan jam favorit! Booking online mudah dan konfirmasi instan via WhatsApp Admin kami.
                </p>
                <div class="d-flex flex-wrap justify-content-center gap-3">
                    <a href="/sewa-lapangan.html" class="btn btn-light rounded-pill px-4 py-3 fw-bold text-danger">
                        Pilih Jam & Lapangan
                    </a>
                    <a href="https://wa.me/6281295679799?text=Halo%20Admin%20Mini%20Soccer%2088,%20saya%20mau%20booking%20lapangan" target="_blank" class="btn-as88-wa">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        WhatsApp Admin: 0812-9567-9799
                    </a>
                </div>
            </div>
        </section>

    </div>
</main>'''
        html = html[:main_start] + new_main + html[main_end + len('</main>'):]

    # 7. Rebuild Footer
    footer_start = html.find('<footer>')
    footer_end = html.find('</footer>')
    if footer_start != -1 and footer_end != -1:
        new_footer = '''<footer>
    <div class="col-xl-10 col-11 mx-auto py-5 px-0">
        <div class="row g-4 justify-content-between">
            
            <!-- Col 1: Brand Info -->
            <div class="col-lg-4 col-md-6">
                <a class="d-inline-block mb-3" href="/" aria-label="Mini Soccer 88 Homepage">
                    <img src="assets/logo/ms88-logo-transparent.png" alt="Mini Soccer 88 Alpha Sport Logo" style="height:54px; width:auto;">
                </a>
                <p class="text-secondary small mb-3" style="line-height:24px;">
                    Venue mini soccer rumput sintetis standar FIFA terbaik di Kota Cimahi. Memberikan pengalaman bertanding berstandar tinggi dengan fasilitas lengkap di kawasan militer Pusdikif Kodiklatad.
                </p>
                <div class="small text-secondary mb-3">
                    <strong>Alamat Resmi:</strong><br>
                    Lapangan Pusdikif (Pusat Pendidikan Infanteri) Kodiklatad<br>
                    Jalan Gatot Subroto, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40523
                </div>
                <div class="d-flex gap-2 text-secondary">
                    <a href="https://instagram.com/88alphasport" target="_blank" class="btn btn-sm btn-light rounded-circle p-2 text-danger" title="Instagram @88alphasport">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://tiktok.com/@88alphasport" target="_blank" class="btn btn-sm btn-light rounded-circle p-2 text-dark" title="TikTok @88alphasport">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                    </a>
                    <a href="https://wa.me/6281295679799" target="_blank" class="btn btn-sm btn-light rounded-circle p-2 text-success" title="WhatsApp Admin">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </a>
                </div>
            </div>

            <!-- Col 2: Navigasi Layanan -->
            <div class="col-lg-2 col-6">
                <h6 class="fw-bold text-dark mb-3">Layanan Kami</h6>
                <ul class="list-unstyled small">
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/sewa-lapangan.html">Sewa Lapangan</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="#pricelist">Pricelist Resmi</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/partner.html">Kerjasama Sekolah</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/kompetisi.html">Dokumentasi GERAK</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/main-bareng.html">Komunitas KOMMOTO</a></li>
                </ul>
            </div>

            <!-- Col 3: Pusat Informasi -->
            <div class="col-lg-3 col-6">
                <h6 class="fw-bold text-dark mb-3">Pusat Informasi</h6>
                <ul class="list-unstyled small">
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/kontak.html">Kontak Kami</a></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/blog.html">Berita & Informasi</a></li>
                    <li class="py-1"><span class="text-secondary">Jam Operasional:</span></li>
                    <li class="py-1"><span class="text-danger fw-bold">Setiap Hari 06:00 – 23:00 WIB</span></li>
                    <li class="py-1"><a class="text-secondary text-decoration-none" href="/superadmin/index.html">Superadmin Portal</a></li>
                </ul>
            </div>

            <!-- Col 4: Kontak Admin Cepat -->
            <div class="col-lg-3 col-md-6">
                <h6 class="fw-bold text-dark mb-3">Kontak Reservasi</h6>
                <p class="small text-secondary mb-2">Booking cepat via WhatsApp resmi kami:</p>
                <a href="https://wa.me/6281295679799?text=Halo%20Admin%2088%20Alpha%20Sport,%20saya%20mau%20booking%20jadwal" target="_blank" class="btn btn-sm btn-success w-100 rounded-pill py-2 font-weight-bold mb-2">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Admin 1: 0812-9567-9799
                </a>
                <a href="https://wa.me/628882133345?text=Halo%20Admin%20Giefran,%20saya%20mau%20booking%20jadwal" target="_blank" class="btn btn-sm btn-outline-dark w-100 rounded-pill py-2 font-weight-bold mb-2">
                    Admin 2 (Giefran): 0888-2133-345
                </a>
                <small class="text-muted d-block text-center mt-1">Instagram: @88alphasport</small>
            </div>

        </div>

        <hr class="my-4" style="border-color:#E5E7EB;">

        <div class="row align-items-center">
            <div class="col-md-8 text-center text-md-start">
                <small class="text-muted">© 2026 Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi. Hak Cipta Dilindungi.</small>
            </div>
            <div class="col-md-4 text-center text-md-end mt-2 mt-md-0">
                <small class="text-muted">Kawasan Pusdikif Kodiklatad Kota Cimahi</small>
            </div>
        </div>
    </div>
</footer>'''
        html = html[:footer_start] + new_footer + html[footer_end + len('</footer>'):]

    # 8. Add Schedule Viewer Script before </body>
    sched_script = '''
<script>
(function() {
    let allSchedule = null;
    let currentWeek = '07-13_SEP_2026';

    fetch('assets/data/bookings_september_2026.json')
        .then(res => res.json())
        .then(data => {
            allSchedule = data;
            renderSchedule(currentWeek);
        })
        .catch(err => {
            console.log('Schedule fetch:', err);
        });

    window.switchSchedTab = function(weekKey) {
        currentWeek = weekKey;
        document.querySelectorAll('#schedTabs button').forEach(b => b.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        renderSchedule(weekKey);
    };

    function renderSchedule(weekKey) {
        const tbody = document.getElementById('scheduleTableBody');
        if (!tbody || !allSchedule) return;
        const list = allSchedule[weekKey] || [];
        if (list.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="py-4 text-muted">Belum ada data jadwal untuk minggu ini.</td></tr>';
            return;
        }
        tbody.innerHTML = list.slice(0, 18).map(item => `
            <tr>
                <td class="fw-bold text-dark">${item.time}</td>
                <td>${item.day}</td>
                <td>${item.date ? item.date + ' Sep' : '-'}</td>
                <td class="fw-bold" style="color:#B91C1C;">${item.team}</td>
                <td><span class="tag-booked">BOOKED</span></td>
            </tr>
        `).join('');
    }
})();
</script>
'''
    if 'switchSchedTab' not in html:
        html = html.replace('</body>', sched_script + '\n</body>')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print('Successfully rebuilt index.html with official 88 Alpha Sport Pusdikif brand & assets!')

if __name__ == '__main__':
    build_homepage()
