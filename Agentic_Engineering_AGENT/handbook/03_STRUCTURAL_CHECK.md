# 🩺 Structural check

The one executable check this package has. Read-only: parses every JSON template and asserts every internal Markdown link resolves inside the folder. Run it from the package root after any move, rename or split -- that is exactly when links break silently.

```bash
python3 - <<'EOF'
from pathlib import Path
import json, re
root = Path('.').resolve()
files = sorted(p for p in root.rglob('*')
               if p.is_file() and p.suffix in {'.md', '.json'} and '.memory' not in p.parts)
links = 0
for f in files:
    text = f.read_text()
    if f.suffix == '.json':
        json.loads(text)
    else:
        for dest in re.findall(r'\]\(([^)#\s]+)', text):
            if dest.startswith(('http', 'mailto')):
                continue
            target = (f.parent / dest).resolve()
            assert target.is_relative_to(root) and target.exists(), (str(f), dest)
            links += 1
print('PASS:', len(files), 'files; JSON parses;', links, 'internal links resolve')
EOF
```

It validates structure only -- nothing about schemas, runtime safety, prompt quality or real delivery. A pass here is not evidence the package is correct, only that it is not broken in the one way a refactor reliably breaks it.
