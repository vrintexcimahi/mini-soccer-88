import re

with open('ayo_live.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace all ayo.co.id absolute URLs with relative paths
# CSS/JS/Font/Image assets
html = html.replace('https://ayo.co.id/assets/', 'assets/')
html = html.replace('https://ayo.co.id/css/', 'css/')
html = html.replace('https://ayo.co.id/js/', 'js/')
html = html.replace('https://ayo.co.id/fonts/', 'fonts/')

# Fix inline JS BASE_URL and ASSET_URL
html = html.replace(
    "const BASE_URL = `https://ayo.co.id`;",
    "const BASE_URL = `http://localhost:8888`;"
)
html = html.replace(
    "const ASSET_URL = `https://asset.ayo.co.id/`;",
    "const ASSET_URL = `http://localhost:8888/assets/`;"
)

# Fix navigation links to keep ayo.co.id for external pages (sparring, venues, etc.)
# but homepage link -> localhost:8888
html = html.replace(
    'href="https://ayo.co.id"',
    'href="http://localhost:8888"'
)
html = html.replace(
    "href='https://ayo.co.id'",
    "href='http://localhost:8888'"
)

# Fix favicon
html = html.replace(
    'href="https://ayo.co.id/assets/logos/new-Favicon.png"',
    'href="assets/logos/new-Favicon.png"'
)

# Fix canonical/alternate hrefs (leave them pointing to original)
# These are SEO only, no need to fix

# Fix title to include Mini Soccer 88 branding
html = html.replace(
    '<title>AYO : Super Sport Community App</title>',
    '<title>Mini Soccer 88 Alpha Sport - Pusdikif Kota Cimahi | Powered by AYO</title>'
)

# Fix meta title
html = html.replace(
    'content="AYO Indonesia - Super Sport Community App"',
    'content="Mini Soccer 88 Alpha Sport Pusdikif Kota Cimahi"'
)

# Add admin link before closing </body> if not present
admin_btn = '''
<a href="http://localhost:8888/superadmin" 
   style="position:fixed;bottom:24px;right:24px;z-index:9999;background:#9E0620;color:#fff;
          padding:12px 20px;border-radius:50px;font-family:Rubik,sans-serif;font-size:14px;
          font-weight:600;text-decoration:none;box-shadow:0 4px 16px rgba(158,6,32,0.4);
          display:flex;align-items:center;gap:8px;">
  &#9881; Super Admin
</a>
'''
html = html.replace('</body>', admin_btn + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done! index.html written.")
print(f"Size: {len(html):,} bytes")
