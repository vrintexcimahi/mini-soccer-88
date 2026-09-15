import urllib.request
import os

with open('local_header_string_1789459377528.txt', 'r', encoding='utf-8') as f:
    cookie = f.read().strip()

headers = {
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Missing vendor & extra files
urls = [
    '//vendor/toastify/toastify.min.css',
    '//vendor/toastify/toastify.js',
    '//js/custom.js',
    '//fonts/rubik/rubik-v31-latin-300italic.woff2',
    '//fonts/rubik/rubik-v31-latin-500.woff2',
    '//fonts/rubik/rubik-v31-latin-500italic.woff2',
    '//fonts/rubik/rubik-v31-latin-600italic.woff2',
    '//fonts/rubik/rubik-v31-latin-700italic.woff2',
    '//fonts/rubik/rubik-v31-latin-800.woff2',
    '//fonts/rubik/rubik-v31-latin-800italic.woff2',
    '//fonts/rubik/rubik-v31-latin-900.woff2',
    '//fonts/rubik/rubik-v31-latin-900italic.woff2',
    '//fonts/nunito/nunito-v32-latin-regular.woff2',
    '//fonts/nunito/nunito-v32-latin-600.woff2',
    '//fonts/nunito/nunito-v32-latin-700.woff2',
]

for url in urls:
    rel = url.replace('//', '')
    dest = os.path.join(os.getcwd(), rel.replace('/', os.sep))
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        print(f'Skip (exists): {rel}')
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
        with open(dest, 'wb') as f_out:
            f_out.write(content)
        print(f'OK: {rel} ({len(content)} bytes)')
    except Exception as e:
        print(f'FAIL: {url} -> {e}')
