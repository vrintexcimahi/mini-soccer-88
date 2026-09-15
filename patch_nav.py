import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the floating Super Admin button (the whole <a ...> block we added)
html = re.sub(
    r'\n<a href="http://localhost:8888/superadmin"[^>]*>[\s\S]*?Super Admin[\s\S]*?</a>\s*',
    '\n',
    html
)

# 2. Fix nav links to point to local pages
html = html.replace('href="https://ayo.co.id/venues"', 'href="/sewa-lapangan.html"')
html = html.replace("href='https://ayo.co.id/venues'", "href='/sewa-lapangan.html'")
html = html.replace('href="https://ayo.co.id/main-bareng"', 'href="/main-bareng.html"')
html = html.replace("href='https://ayo.co.id/main-bareng'", "href='/main-bareng.html'")
html = html.replace('href="https://ayo.co.id/open-sparring"', 'href="/sparring.html"')
html = html.replace('href="https://ayo.co.id/partner-with-us"', 'href="/partner.html"')
html = html.replace("href='https://ayo.co.id/partner-with-us'", "href='/partner.html'")
html = html.replace('href="https://ayo.co.id/blog"', 'href="/blog.html"')
html = html.replace("href='https://ayo.co.id/blog'", "href='/blog.html'")
html = html.replace('href="https://ayo.co.id/ayo-venue-management"', 'href="/venue-management.html"')
html = html.replace("href='https://ayo.co.id/ayo-venue-management'", "href='/venue-management.html'")
html = html.replace('href="https://ayo.co.id/competitions"', 'href="/kompetisi.html"')
html = html.replace("href='https://ayo.co.id/competitions'", "href='/kompetisi.html'")
html = html.replace('href="https://ayo.co.id/collaboration"', 'href="/kolaborasi.html"')
html = html.replace('href="https://ayo.co.id/contact"', 'href="/kontak.html"')
html = html.replace('href="https://ayo.co.id/search"', 'href="/cari.html"')
html = html.replace('href="https://ayo.co.id/about-us"', 'href="/tentang.html"')
html = html.replace('href="https://ayo.co.id/teams"', 'href="/tim.html"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Patched index.html OK')
