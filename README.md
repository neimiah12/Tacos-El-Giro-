# Tacos-El-Giro-

Tacos El Giro serves authentic Mexican street food in the Tri-Cities, featuring flavorful tacos, burritos, quesabirria, birria consommé, and fresh ingredients. A local favorite for delicious, satisfying Mexican food.

---

## Built to the hand-built tier process

This repo carries the hand-built tier build process — the repeatable one that came out of the
Jose's Taco Truck and Summer's Hub of Kennewick builds. Every rule in it exists because of a
real correction on a real build.

**Read `docs/process/HAND-BUILT-TIER.md` before starting work.** `CLAUDE.md` is the short
enforcement layer; `docs/process/CHECKLISTS.md` is what you tick as you go.

### The gates

| Gate | What | Deliverable | Nothing proceeds until |
|------|------|-------------|------------------------|
| 0 | Audit the incumbent site and local competitors, page by page | `docs/AUDIT.md` | every page audited |
| 1 | Product truth — verified facts, sources, conflicts, gaps | `PRODUCT.md` | it's filled, not stubbed |
| 2 | Visual world, committed | direction contract in `<body>` | thesis and accent grounded in something real |
| 3 | Build: home → sub-pages → content → photos → forms → copy → deploy | the site | deploys batched, not per tweak |
| 4 | Verification | `npm run check` clean | mobile checked, findings fixed not suppressed |
| 5 | Launch review | pre-launch checklist complete | assumptions listed for the owner |

Current state: **gate 0 not started.**

### Checks

```
npm run check          # everything below
npm run check:css      # the recurring layout bugs (section 6)
npm run check:copy     # the copy rules (section 4)
npm run check:links    # every nav link resolves
npm run check:photos   # real pixel dimensions, aspect, upscale traps
npm run check:counts   # counts consistent sitewide
```

No dependencies — Node 18+ only. Configure `legalName`, `category`, `shorthand` and `counts` in
`.hbtrc.json` (see `.hbtrc.example.json`); several checks stay inert until you do.

The checks cannot see what matters most in a photo — platform chrome, play buttons, watermarks,
the client's old logo. Those stay a human look at every image, at full size, one at a time.

### Starting the next site

```
scripts/install.sh /path/to/new-site-repo
```

Copies the whole kit — process doc, checklists, templates, baseline CSS, checks, `CLAUDE.md`,
and the `hand-built-tier` skill — into any other website repo, wires up the npm scripts, and
prints the gate-0 and gate-1 next steps. Run it at the start of every build.

### Layout

```
CLAUDE.md                              enforcement layer, loaded every session
PRODUCT.md                             gate 1 — product truth for this site
docs/AUDIT.md                          gate 0 — incumbent + competitor audit
docs/process/HAND-BUILT-TIER.md        canonical process (source of truth)
docs/process/CHECKLISTS.md             per-gate and per-image checklists
docs/templates/                        AUDIT, PRODUCT, DESIGN, direction contract
assets/css/hand-built-baseline.css     preventative fixes for the section 6 bugs
scripts/hbt.mjs                        the checks
scripts/install.sh                     port the kit to another repo
.claude/skills/hand-built-tier/         skill, so the process loads on any site build
```
