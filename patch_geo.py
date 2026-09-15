import re

# ---- Patch index.html ----
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add geo.js before closing </body>
if 'geo.js' not in html:
    html = html.replace('</body>', '<script src="js/geo.js"></script>\n<script>GeoMS88.init();</script>\n</body>')

# 2. Add location bar + distance badge into the hero search area
# Find the Quick Finder / search section and inject location widget
# We'll inject right before </body> as a sticky location widget in topbar
# Actually inject into the fixed header area by adding after the existing topbar script

# Add a location indicator after the AYO logo in the nav
logo_pattern = r'(<img class="mr-3 ayo-logo"[^>]*>)'
replacement = r'''\1
        <div id="ms88LocationBar" class="ms88-location-bar" onclick="GeoMS88.showModal()" style="margin-left:16px;cursor:pointer;">
          <span class="geo-pin">📍</span><span class="geo-placeholder">Deteksi Lokasi</span>
        </div>'''
if 'ms88LocationBar' not in html:
    html = re.sub(logo_pattern, replacement, html, count=1)

# 3. Add venue distance badge near the venue management section
# Insert near "Kelola venue" heading
venue_badge_target = 'class="pb-1 venue-link"'
if 'ms88VenueDistance' not in html and venue_badge_target in html:
    html = html.replace(
        'class="pb-1 venue-link"',
        'class="pb-1 venue-link"',
        1
    )
    # Insert distance badge after the first occurrence of the venue section title
    html = html.replace(
        'Kelola venue lebih praktis dan menguntungkan.',
        'Kelola venue lebih praktis dan menguntungkan.\n                    <span id="ms88VenueDistance" style="margin-left:12px;vertical-align:middle;">📍 Mendeteksi jarak...</span>',
        1
    )

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('index.html patched OK')

# ---- Patch all local pages ----
pages = [
    'sewa-lapangan.html',
    'main-bareng.html',
    'blog.html',
    'partner.html',
    'venue-management.html',
    'kompetisi.html',
    'kontak.html',
]

for page in pages:
    try:
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'geo.js' not in content:
            content = content.replace(
                '</body>',
                '<script src="/js/geo.js"></script>\n<script>GeoMS88.init();</script>\n</body>'
            )

        # Add location bar in nav if not already there
        if 'ms88LocationBar' not in content:
            content = content.replace(
                '<a href="/" class="nav-back">',
                '<div id="ms88LocationBar" class="ms88-location-bar" onclick="GeoMS88.showModal()" style="cursor:pointer;">'
                '<span class="geo-pin">📍</span><span class="geo-placeholder">Deteksi Lokasi</span></div>'
                '\n      <a href="/" class="nav-back">',
                1
            )

        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Patched: {page}')
    except FileNotFoundError:
        print(f'Not found: {page}')

print('Done!')
