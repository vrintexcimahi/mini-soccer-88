import glob
import os

html_files = [
    'index.html',
    'sewa-lapangan.html',
    'main-bareng.html',
    'blog.html',
    'kompetisi.html',
    'kontak.html',
    'partner.html',
    'venue-management.html'
]

for filename in html_files:
    if not os.path.exists(filename):
        print(f"Skipping {filename} (not found)")
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'assets-sync.js' not in content:
        if '<script src="js/geo.js"></script>' in content:
            content = content.replace(
                '<script src="js/geo.js"></script>',
                '<script src="js/assets-sync.js"></script>\n<script src="js/geo.js"></script>'
            )
        elif '</body>' in content:
            content = content.replace('</body>', '<script src="js/assets-sync.js"></script>\n</body>')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected assets-sync.js into {filename}")
    else:
        print(f"Already present in {filename}")
