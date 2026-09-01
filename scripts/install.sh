#!/usr/bin/env bash
#
# install.sh — copy the hand-built tier process kit into another website repo.
#
#   scripts/install.sh /path/to/other-site-repo
#
# Run this at the start of every new build. Existing files are never overwritten
# unless --force is passed; anything skipped is reported so you can diff by hand.

set -euo pipefail

FORCE=0
TARGET=""
for arg in "$@"; do
  case "$arg" in
    --force) FORCE=1 ;;
    -h|--help)
      sed -n '3,9p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) TARGET="$arg" ;;
  esac
done

if [ -z "$TARGET" ]; then
  echo "usage: scripts/install.sh /path/to/site-repo [--force]" >&2
  exit 1
fi
if [ ! -d "$TARGET" ]; then
  echo "not a directory: $TARGET" >&2
  exit 1
fi

SRC="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$(cd "$TARGET" && pwd)"

if [ "$SRC" = "$TARGET" ]; then
  echo "source and target are the same repo; nothing to do." >&2
  exit 1
fi

FILES=(
  "CLAUDE.md"
  "docs/process/HAND-BUILT-TIER.md"
  "docs/process/CHECKLISTS.md"
  "docs/templates/AUDIT.md"
  "docs/templates/PRODUCT.md"
  "docs/templates/DESIGN.md"
  "docs/templates/direction-contract.html"
  "assets/css/hand-built-baseline.css"
  "scripts/hbt.mjs"
  "scripts/install.sh"
  ".claude/skills/hand-built-tier/SKILL.md"
  ".hbtrc.example.json"
)

copied=0; skipped=0
for f in "${FILES[@]}"; do
  dest="$TARGET/$f"
  if [ -e "$dest" ] && [ "$FORCE" -eq 0 ]; then
    echo "  skip     $f (exists — pass --force to overwrite)"
    skipped=$((skipped + 1))
    continue
  fi
  mkdir -p "$(dirname "$dest")"
  cp "$SRC/$f" "$dest"
  echo "  copied   $f"
  copied=$((copied + 1))
done
chmod +x "$TARGET/scripts/hbt.mjs" "$TARGET/scripts/install.sh" 2>/dev/null || true

# A blank config so the checks run; the values come from PRODUCT.md at gate 1.
if [ ! -e "$TARGET/.hbtrc.json" ]; then
  cat > "$TARGET/.hbtrc.json" <<'JSON'
{
  "legalName": "",
  "category": "",
  "shorthand": [],
  "counts": {},
  "minPhotoWidth": 1200,
  "maxPhotoBytes": 1500000,
  "ignore": []
}
JSON
  echo "  created  .hbtrc.json (fill it in from PRODUCT.md at gate 1)"
  copied=$((copied + 1))
fi

# Wire up the check scripts if there is a package.json and node is available.
if [ -f "$TARGET/package.json" ] && command -v node >/dev/null 2>&1; then
  node - "$TARGET/package.json" <<'NODE'
import { readFileSync, writeFileSync } from 'node:fs';
const path = process.argv[2];
const pkg = JSON.parse(readFileSync(path, 'utf8'));
pkg.scripts ??= {};
const want = {
  check: 'node scripts/hbt.mjs all',
  'check:css': 'node scripts/hbt.mjs css',
  'check:copy': 'node scripts/hbt.mjs copy',
  'check:links': 'node scripts/hbt.mjs links',
  'check:photos': 'node scripts/hbt.mjs photos',
  'check:counts': 'node scripts/hbt.mjs counts',
};
let added = 0;
for (const [k, v] of Object.entries(want)) {
  if (!pkg.scripts[k]) { pkg.scripts[k] = v; added++; }
}
if (added) {
  writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`  wired    ${added} check script(s) into package.json`);
} else {
  console.log('  skip     package.json (check scripts already present)');
}
NODE
elif [ ! -f "$TARGET/package.json" ]; then
  cat > "$TARGET/package.json" <<'JSON'
{
  "private": true,
  "type": "module",
  "scripts": {
    "check": "node scripts/hbt.mjs all",
    "check:css": "node scripts/hbt.mjs css",
    "check:copy": "node scripts/hbt.mjs copy",
    "check:links": "node scripts/hbt.mjs links",
    "check:photos": "node scripts/hbt.mjs photos",
    "check:counts": "node scripts/hbt.mjs counts"
  }
}
JSON
  echo "  created  package.json with the check scripts"
fi

echo
echo "Installed into $TARGET — $copied copied, $skipped skipped."
echo
echo "Next, in that repo:"
echo "  1. Gate 0 — cp docs/templates/AUDIT.md docs/AUDIT.md, then audit every page of the"
echo "     incumbent site and the local competitors. No design work before this is done."
echo "  2. Gate 1 — cp docs/templates/PRODUCT.md PRODUCT.md and fill it in. No visual"
echo "     decision before this is done."
echo "  3. Fill in .hbtrc.json from PRODUCT.md, then run: npm run check"
