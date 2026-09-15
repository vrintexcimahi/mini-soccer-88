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
html = html.replace('href="//venues"', 'href="/sewa-lapangan.html"')
html = html.replace("href='//venues'", "href='/sewa-lapangan.html'")
html = html.replace('href="//main-bareng"', 'href="/main-bareng.html"')
html = html.replace("href='//main-bareng'", "href='/main-bareng.html'")
html = html.replace('href="//open-sparring"', 'href="/sparring.html"')
html = html.replace('href="//partner-with-us"', 'href="/partner.html"')
html = html.replace("href='//partner-with-us'", "href='/partner.html'")
html = html.replace('href="//blog"', 'href="/blog.html"')
html = html.replace("href='//blog'", "href='/blog.html'")
html = html.replace('href="//ayo-venue-management"', 'href="/venue-management.html"')
html = html.replace("href='//ayo-venue-management'", "href='/venue-management.html'")
html = html.replace('href="//competitions"', 'href="/kompetisi.html"')
html = html.replace("href='//competitions'", "href='/kompetisi.html'")
html = html.replace('href="//collaboration"', 'href="/kolaborasi.html"')
html = html.replace('href="//contact"', 'href="/kontak.html"')
html = html.replace('href="//search"', 'href="/cari.html"')
html = html.replace('href="//about-us"', 'href="/tentang.html"')
html = html.replace('href="//teams"', 'href="/tim.html"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Patched index.html OK')
