# Tacos El Giro

A one-page site for **Tacos El Giro**, a Mexican food counter at Summer's Hub of Kennewick,
Washington. Static: no framework, no CMS, no build step.

**Tier: Verified Launch ($799)** — assigned on record, not derived. See `CLAUDE.md`.

---

## Run it

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

Keep the port stable for a whole working session so a refresh always works.

## Verify it

The verification gate implements §7 of the tier process. It walks **every** leaf element
that has text (296 of them, across all five meat states), composites translucent ancestors
rather than reading one background-colour, checks `:hover` separately, emulates a real
mobile viewport, and asserts the architecture's invariant.

```bash
npm install
node verify.mjs http://localhost:8000
```

## Package it

```bash
./package.sh
```

Writes `deploy/`, which **excludes** `PRODUCT.md`, `DESIGN.md`, `CLAUDE.md`, `verify.mjs`
and `package.json`. Then re-verify against the package, not the source:

```bash
(cd deploy && python3 -m http.server 8001 &) && node verify.mjs http://localhost:8001
```

---

## What is in here

```
index.html  styles.css  script.js  favicon.svg   the site
fonts/                                           Anton + Archivo, self-hosted woff2, 124 KB
verify.mjs  package.sh                           the gate and the packager
DESIGN.md                                        architecture, palette, type — regenerate on change
CLAUDE.md                                        the non-negotiables for this repo
.claude/skills/client-site-build/                the build process, vendored so it travels
PRODUCT.md                                       INTERNAL, gitignored — sources and open questions
```

The direction contract lives in two places, as the process requires: a comment block at the
top of `styles.css`, and an HTML comment at the top of `<body>`. **Read it before changing
the layout** — it records what not to change back, and why.

---

## The architecture

The menu is a matrix: **five meats crossed with eight formats.** So the page *is* the order
counter — pick a meat, the formats resolve. It runs on radio inputs and `:checked`, so it
works with JavaScript off.

**No prices render in the counter.** No per-item price exists in any source; the range is
stated once in prose instead. `verify.mjs` fails the build if a price appears.

## Before this goes live

`PRODUCT.md` carries the full list. The short version:

1. **Hours** — nothing is published on the page, and nothing was verified. Highest priority.
2. **The phone number is not wired.** It is single-sourced, and §1 needs two independent
   confirmations before click-to-call. The one-line change is marked in `index.html`.
3. **`noindex, nofollow` is set** in `index.html` with a comment saying when to remove it.
   Leave it until the owner confirms hours, the phone and delivery.
4. **No photography.** No photo of this counter was obtainable; AI-generated and stock food
   images were both rejected as unsourceable. A photo of the counter is the highest-value
   asset to collect.
5. **The palette is a flagged placeholder** — no logo or signage was available to sample.
