# CLAUDE.md — Hand-Built Tier

Every website in this account is built to the **hand-built tier** process. The canonical
process document is `docs/process/HAND-BUILT-TIER.md`. **Read it before starting work on
this site, not after.** This file is the short enforcement layer; that file is the reasoning.

## Gates — do not skip, do not reorder

| # | Gate | Deliverable | Blocked until it exists |
|---|------|-------------|-------------------------|
| 0 | Incumbent + competitor audit | `docs/AUDIT.md` | any design decision |
| 1 | Product truth | `PRODUCT.md` | any visual decision |
| 2 | Visual world | direction contract in `<body>` of the home page | any sub-page |
| 3 | Build | home → sub-pages → content → photos → forms → copy → deploy | — |
| 4 | Verification | `npm run check` clean, mobile checked | deploy |
| 5 | Launch review | `docs/process/CHECKLISTS.md` pre-launch list complete | handoff |

Gate 0 and gate 1 come **before** any visual decision. If asked to "just make the homepage,"
the audit still happens first — it is where the pitch comes from and it is cheap.

## Non-negotiables

**Sourcing.** Every fact on the page traces to the client's own site, their Google listing,
their socials, or a real ordering platform. Nothing invented. Record the source per fact in
`PRODUCT.md`. When two sources disagree, record the conflict — do not silently pick one.
Photo evidence beats typed listings (paint on the truck beats a typo on their site).

**Missing data is stated, not filled.** A visible "Note —" panel saying we don't have this
published yet, call us, beats silence and massively beats a guess.

**Copy.** Present tense. Full legal business name in brand positions. Never the string
"Real photo —" in client-facing copy. Captions carry information, not labels. Say the plain
category at least once before using shorthand. Never attack the previous vendor.

**Photos.** Look at every image at full size before placing it — play buttons, share icons,
profile bars, watermarks, platform chrome at the edges. Crop out the client's old logo.
Check real resolution before upscaling, and never upscale dense small text. Pre-crop to the
target aspect. A venue's landing page needs a photo of the venue in the first viewport.

**Deploys are batched.** Each deploy costs credits. Test locally; deploy once a meaningful
batch is done, never per tweak.

## Before writing CSS

Start from `assets/css/hand-built-baseline.css` — it carries the fixes for the bugs that
have already cost real debugging time (grid `min-width: 0`, `grid-template-columns:
minmax(0, 1fr)`, `span:first-child + span` instead of `span:last-child`, no `0fr → 1fr`
accordion, no `columns: 2` in an indefinite-height container). Section 6 of the process doc
explains why each one bites.

## Verification

```
npm run check          # css patterns + copy rules + links + photos
npm run check:css      # recurring layout-bug patterns
npm run check:copy     # copy rules from section 4
npm run check:links    # nav/internal links resolve
npm run check:photos   # real pixel dimensions, aspect, upscale traps
```

Hard-reload before trusting a screenshot. When the screenshot tool fights you, read the DOM
(`getBoundingClientRect()`, computed styles) instead — it diagnoses layout bugs faster and
far cheaper. Emulate a real mobile viewport; don't just narrow the window.

Fix what the checks find. Do not suppress a finding — and when a value is flagged, first ask
whether an existing documented step already covers that role before adding an exception.

## Session cost

Split work across sessions and `/clear` between them. Long sessions re-read an accumulating
context on every tool call, and images make it worse. Stay on Sonnet for
build → screenshot → tweak loops.

## Porting this to another site

`scripts/install.sh /path/to/other-site-repo` copies the process kit — this file, the process
doc, checklists, templates, the baseline CSS, the checks, and the skill — into any other
website repo. Run it at the start of every new build.
