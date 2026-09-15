import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix vendor paths
html = html.replace('href="//vendor/', 'href="vendor/')
html = html.replace("href='//vendor/", "href='vendor/")
html = html.replace('href="//css/skeleton-loading.css"', 'href="css/skeleton-loading.css"')
html = html.replace("href='//css/skeleton-loading.css'", "href='css/skeleton-loading.css'")

# Fix JS src references
html = html.replace('src="//js/', 'src="js/')
html = html.replace("src='//js/", "src='js/")
html = html.replace('src="//vendor/', 'src="vendor/')
html = html.replace("src='//vendor/", "src='vendor/")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Fixed!')
print('Remaining local refs:')
refs = re.findall(r'https://ayo\.co\.id/[^\s"\'<>]+', html)
unique = sorted(set(refs))
for r in unique[:30]:
    print(r)
print(f'Total remaining: {len(unique)}')
