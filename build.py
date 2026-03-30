#!/usr/bin/env python3
"""Bundle index.html + style.css + app.js into a single standalone bundle.html"""

import os, re

base = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(base, 'style.css'), encoding='utf-8') as f:
    css = f.read()

with open(os.path.join(base, 'app.js'), encoding='utf-8') as f:
    js = f.read()

with open(os.path.join(base, 'index.html'), encoding='utf-8') as f:
    html = f.read()

# Inline CSS
html = html.replace(
    '<link rel="stylesheet" href="style.css" />',
    f'<style>\n{css}\n</style>'
)

# Inline JS (replace closing script tag carefully)
html = html.replace(
    '<script src="app.js"></script>',
    f'<script>\n{js}\n</script>'
)

# Remove manifest link (not useful for file:// usage)
html = re.sub(r'\s*<link rel="manifest"[^>]*/>\s*', '\n  ', html)

out = os.path.join(base, 'bundle.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)

size_kb = os.path.getsize(out) // 1024
print(f'OK — bundle.html créé ({size_kb} KB). Copiez ce seul fichier sur votre téléphone.')
