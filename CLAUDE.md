# Tacos El Giro — client site build

**Tier: Verified Launch ($799).** Named in the Verified Launch tier doc's own build list and
its §3 worked-examples table, so the tier is on record, not derived.

Before touching this site — or starting any other client build — read
`.claude/skills/client-site-build/SKILL.md` and the tier document it points to. The process is
the accumulated corrections from real builds; the rules in it each cost a real mistake.

## Non-negotiables for this repo

- **Never invent a fact.** No price, opening time, or claim goes on the page without a source
  recorded in `PRODUCT.md`. Where a fact does not exist, the page says so.
- `PRODUCT.md`, `work/` and `photos_raw/` **never ship** and are gitignored.
- The architecture is **the order counter** — pick a meat, formats resolve. It comes from the
  menu being a matrix. Read the direction contract at the top of `styles.css` before changing
  the layout; it records what not to change back, and why.
- **No prices render in the matrix.** No per-item price has been confirmed. This is asserted
  as the architecture's invariant in verification.
- Deploy only with an **explicit go-ahead**, and only with `noindex, nofollow` in place.

## Running the two gates

```bash
python3 -m http.server 8000 &        # keep the port stable for the session
npm install                          # playwright, for verify.mjs
cd .claude/skills/impeccable && npm install && cd -   # detector deps, once per machine
npm run verify:all
```

`verify.mjs` is the hand-rolled §7 gate. `verify:design` is the vendored
**impeccable** detector (v4.1.2, Apache-2.0). **If the detector prints `DEGRADED`,
stop and install** — degraded mode returns `[]` and reads exactly like a clean pass.
Verify every finding before fixing or dismissing it; `DESIGN.md` records the last
run, what was fixed, and the measurements behind each dismissal.

## Layout of the build

```
index.html  styles.css  script.js  favicon.svg   the site — flat, no build step
PRODUCT.md                                        internal; sources and open questions
DESIGN.md                                         regenerated whenever a section changes
verify.mjs                                        the hand-rolled verification gate (§7)
.claude/skills/impeccable/                        vendored design detector (Apache-2.0)
.claude/skills/client-site-build/                 the build process, vendored
deploy/                                           packaged output; excludes internal files
```

Serve locally with `python3 -m http.server 8000` and keep the port stable for the session.
