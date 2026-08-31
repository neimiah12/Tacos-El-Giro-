#!/usr/bin/env bash
#
# localize-images.sh — download the site's food photography into assets/img/
# and repoint index.html at the local copies.
#
# Why this exists: the images are currently hot-linked from a CDN so the site
# renders correctly out of the box. For production you want them served from
# your own domain — smaller, faster, and not dependent on someone else's host.
#
# Usage:   ./scripts/localize-images.sh
# Needs:   bash, curl, python3 with Pillow  (pip install Pillow)
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$ROOT/scripts/images.tsv"
OUT="$ROOT/assets/img"
PAGE="$ROOT/index.html"

command -v curl >/dev/null || { echo "error: curl is required" >&2; exit 1; }
python3 -c 'import PIL' 2>/dev/null || {
  echo "error: Pillow is required — run: pip install Pillow" >&2; exit 1; }

mkdir -p "$OUT"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo "Downloading and converting 18 images..."
while IFS=$'\t' read -r name url width; do
  [ -n "${name:-}" ] || continue
  curl -fsSL --retry 3 --retry-delay 2 -o "$tmp/$name.src" "$url"
  python3 - "$tmp/$name.src" "$OUT/$name.webp" "$width" <<'PY'
import sys
from PIL import Image

src, dst, width = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = Image.open(src).convert("RGB")
if im.width > width:
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
im.save(dst, "WEBP", quality=82, method=6)
print(f"  {dst.rsplit('/', 1)[-1]}  {im.width}x{im.height}")
PY
done < "$MANIFEST"

echo "Repointing index.html at local files..."
python3 - "$PAGE" "$MANIFEST" <<'PY'
import sys

page, manifest = sys.argv[1], sys.argv[2]
html = open(page, encoding="utf-8").read()

replaced = 0
with open(manifest, encoding="utf-8") as fh:
    for line in fh:
        line = line.strip()
        if not line:
            continue
        name, url, _ = line.split("\t")
        if url in html:
            replaced += html.count(url)
            html = html.replace(url, f"assets/img/{name}.webp")

open(page, "w", encoding="utf-8").write(html)
print(f"  rewrote {replaced} image reference(s)")
PY

echo
echo "Done. Note: the og:image and twitter:image meta tags need absolute URLs —"
echo "update them to https://your-domain.com/assets/img/hero-birria-tacos.webp"
