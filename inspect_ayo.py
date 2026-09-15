from bs4 import BeautifulSoup

with open('ayo_live.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print('Title:', soup.title.string if soup.title else 'No title')

print('\n--- ALL IMAGES FOUND ---')
for img in soup.find_all('img'):
    print(img.get('src'), 'alt=', img.get('alt'))

print('\n--- ALL SECTION HEADINGS ---')
for h in soup.find_all(['h1', 'h2', 'h3', 'h4']):
    print(f'{h.name}: {h.get_text(strip=True)[:80]}')
