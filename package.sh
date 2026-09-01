#!/usr/bin/env bash
# Package the shippable site into deploy/ — tier doc §11.
# deploy/ EXCLUDES PRODUCT.md, work/ and photos_raw/: internal notes and the
# pitch must never ship.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

rm -rf deploy
mkdir -p deploy/fonts
cp index.html styles.css script.js favicon.svg deploy/
cp fonts/*.woff2 deploy/fonts/
# Only the optimised web copies ship. The .jpg originals and the three promo
# graphics stay in the repo as source and evidence, never in deploy/.
if compgen -G "img/*.webp" >/dev/null; then mkdir -p deploy/img && cp img/*.webp deploy/img/; fi

echo "deploy/ contents:"
find deploy -type f | sort | sed 's/^/  /'

for internal in PRODUCT.md DESIGN.md CLAUDE.md verify.mjs package.json package.sh preview.mjs preview.artifact.html scripts .claude; do
  if [ -e "deploy/$internal" ]; then
    echo "REFUSING: $internal must never ship" >&2; exit 1
  fi
done
echo
echo "OK — no internal files in deploy/. Now re-verify against deploy/, not the source:"
echo "  (cd deploy && python3 -m http.server 8001 &) && node verify.mjs http://localhost:8001"
