# Tacos El Giro

A one-page site for **Tacos El Giro**, a Mexican food truck in Kennewick, Washington.
Static: no framework, no CMS, no build step.

**Tier: Verified Launch ($799)** — assigned on record, not derived. See `CLAUDE.md`.

---

## Run it

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

Keep the port stable for a whole working session so a refresh always works.

## Verify it

Five checks across two pages, and all of them have to pass.

`verify.mjs` implements §7 of the tier process. It walks **every** leaf element that has text
(672 of them, across all five meat states), composites translucent ancestors rather than
reading one background-colour, checks `:hover` separately, emulates a real mobile viewport,
and asserts the architecture's invariant.

`verify:hours` stubs the clock and reads the rendered *Open now / Closed* badge back at the
states that actually break — the minute before close, the minute of close, a closed Monday, a
Sunday night with Monday dark behind it, midnight. The page makes a live claim, so the claim is
tested rather than trusted; change the hours in `script.js` and re-run it.

`verify:prices` runs the same §7 gate against `prices.html`. The gate adapts: a page with no
meat board walks once instead of five times, and reports that the board invariant is out of
scope there rather than silently skipping it.

`verify:design` is the vendored **impeccable** detector, run over both pages. If it prints
`DEGRADED`, stop and install its dependencies — degraded mode returns `[]` and reads exactly
like a clean pass.

```bash
npm install
cd .claude/skills/impeccable && npm install && cd -   # once per machine
npm run verify:all
```

## Package it

```bash
./package.sh
```

Writes `deploy/`, which **excludes** every internal file — `PRODUCT.md`, `DESIGN.md`,
`CLAUDE.md`, `verify.mjs`, `preview.mjs`, `package.json`, `package.sh`, `scripts/` and
`.claude/` — and ships only the `.webp` web copies from `img/`, never the originals. Then
re-verify against the package, not the source:

```bash
(cd deploy && python3 -m http.server 8001 &) && node verify.mjs http://localhost:8001
```

---

## What is in here

```
index.html  prices.html                          the two pages
styles.css  script.js  favicon.svg              shared by both
fonts/                                           Anton + Archivo, self-hosted woff2, 124 KB
img/                                             the owner's photographs, .jpg source + .webp
verify.mjs  package.sh  preview.mjs              the gate, the packager, the flattener
netlify.toml                                     builds with package.sh, publishes deploy/
DESIGN.md                                        architecture, palette, type — regenerate on change
CLAUDE.md                                        the non-negotiables for this repo
scripts/                                         the image manifest and the palette sampler
.claude/skills/client-site-build/                the build process, vendored so it travels
.claude/skills/impeccable/                       the design detector, vendored (Apache-2.0)
PRODUCT.md                                       INTERNAL, gitignored — sources and open questions
```

The direction contract lives in `.impeccable/surfaces/index-html.md` and **never** ships in a
browser-delivered file. **Read it before changing the layout** — it records what not to change
back, and why. `styles.css` carries a pointer to it, not a copy.

---

## The architecture

The menu is a matrix: **five meats crossed with eight formats.** So the page *is* the order
window — pick a meat, the formats resolve. It runs on radio inputs and `:checked`, so it
works with JavaScript off.

**No prices render in the board**, and `verify.mjs` fails the build if one appears. That used
to hold because no per-item price was confirmed. It now holds because the board is a chooser and
not a shop: prices are confirmed, and they live on `prices.html`. If that should change it is a
decision to take deliberately, not something to let erode one price at a time.

## The palette

Sampled from the owner's own materials, opaque pixels only, per §4 — it is no longer the
placeholder this repo started with. The ground is the truck body from `img/truck.jpg`; the
gold and red are lifted off the logo in `img/promo-nortenos.jpg`. `scripts/sample-palette.py`
records the exact crops and `scripts/contrast.py` is the sweep. Every pairing is measured
against the **worst surface it lands on**, not against the page ground; the table is in
`DESIGN.md`.

## Before this goes live

`PRODUCT.md` carries the full list. The short version:

1. **Barbacoa or chorizo?** The client's price list carries barbacoa and no chorizo; this
   site's board carries chorizo and no barbacoa. Both are sourced, from different places, so
   the page states both rather than picking. Only the owner can settle it. Same for the
   price list's *salad* against the board's *plate*.
2. **The second address.** The owner's own Tacos Norteños graphic advertises two locations.
   Only one is on record, so only one is on the page — and the published hours are stated for
   that one address. Nothing says the two keep the same day.
3. **A second source for the phone number.** It is wired at the client's request on a single
   source; §1 wants two independent confirmations.
4. ~~**Hours**~~ — closed 2026-09-04. Mon closed, Tue–Sun 11 AM – 7:30 PM, supplied by the
   client. Sourced in `PRODUCT.md`, published, in the JSON-LD, and covered by `verify:hours`.
5. **`noindex, nofollow` is set** — in `index.html` and again as an `X-Robots-Tag` header in
   `deploy/_headers`. Both come off together, and not before the owner confirms the phone,
   the second address and delivery. Deploy only on an explicit go-ahead.
