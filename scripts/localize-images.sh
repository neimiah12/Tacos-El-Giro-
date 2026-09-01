#!/usr/bin/env bash
#
# localize-images.sh — pull the site's photography into img/ and repoint
# index.html at the local copies.
#
# WHY THIS EXISTS
# The photographs are hot-linked from the CDN they were produced on, because the
# environment this build runs in cannot reach that host to download them. That
# also means they were never inspected at full size, which §5 requires. Run this
# on a machine with normal network access, THEN LOOK AT EVERY IMAGE before you
# show this page to anyone.
#
# Usage:  ./scripts/localize-images.sh
# Needs:  bash, curl, python3 with Pillow  (pip install Pillow)
#
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

command -v curl >/dev/null || { echo "error: curl required" >&2; exit 1; }
python3 -c 'import PIL' 2>/dev/null || { echo "error: pip install Pillow" >&2; exit 1; }

mkdir -p img
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

echo "Downloading and converting..."
while IFS=$'\t' read -r name url width; do
  [ -n "${name:-}" ] || continue
  curl -fsSL --retry 3 --retry-delay 2 -o "$tmp/$name.src" "$url"
  python3 - "$tmp/$name.src" "img/$name.webp" "$width" <<'PY'
import sys
from PIL import Image
src, dst, w = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = Image.open(src).convert("RGB")
if im.width > w:
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
im.save(dst, "WEBP", quality=82, method=6)
print(f"  {dst}  {im.width}x{im.height}")
PY
done < scripts/images.tsv

echo "Repointing index.html..."
python3 - <<'PY'
html = open('index.html', encoding='utf-8').read()
n = 0
for line in open('scripts/images.tsv', encoding='utf-8'):
    line = line.strip()
    if not line:
        continue
    name, url, _ = line.split('\t')
    n += html.count(url)
    html = html.replace(url, f'img/{name}.webp')
open('index.html', 'w', encoding='utf-8').write(html)
print(f'  rewrote {n} reference(s)')
PY

cat <<'EOS'

Done. Two things before this goes anywhere:
  1. OPEN EVERY IMAGE IN img/ AT FULL SIZE. They were never inspected — check for
     platform chrome, watermarks, garbled text, and anything that is not this
     counter's food.
  2. Update og:image and the JSON-LD "image" to an absolute URL on your domain.
EOS
