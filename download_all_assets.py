import urllib.request
import os
import re

with open('ayo.co.id_header_string_1789459377528.txt', 'r', encoding='utf-8') as f:
    cookie = f.read().strip()

headers = {
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

with open('ayo_live.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Also check linked CSS files
css_files = re.findall(r'https://ayo\.co\.id/([a-zA-Z0-9_\-/\.]+\.css)', html)
for css_rel in css_files:
    if os.path.exists(css_rel):
        with open(css_rel, 'r', encoding='utf-8', errors='ignore') as cf:
            html += '\n' + cf.read()

file_matches = set(re.findall(r'(?:https://ayo\.co\.id/|[\"\'\(])((?:assets|fonts|css|js|images)/[a-zA-Z0-9_\-/\.]+\.(?:png|jpg|jpeg|svg|webp|woff2|woff|ttf|css|js))', html))

print(f'Total candidates to download: {len(file_matches)}')
for rel in sorted(file_matches):
    url = f'https://ayo.co.id/{rel}'
    dest = os.path.join(os.getcwd(), rel.replace('/', os.sep))
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            with open(dest, 'wb') as f_out:
                f_out.write(content)
        print(f'Downloaded: {rel} ({len(content)} bytes)')
    except Exception as e:
        print(f'Failed {rel}: {e}')
