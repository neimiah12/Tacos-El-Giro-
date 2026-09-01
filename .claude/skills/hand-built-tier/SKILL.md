---
name: hand-built-tier
description: The hand-built tier website build process — audit the incumbent site, establish product truth, commit to a visual world, build in order, verify, launch. Use for any client website build, redesign, or rebuild pitch; when starting a new site repo; when writing PRODUCT.md, DESIGN.md, or a direction contract; when auditing an incumbent site or local competitors; when placing photography or writing client-facing copy on a site; and when debugging grid, accordion, multi-column, or aspect-ratio layout bugs on one.
---

# Hand-Built Tier

The repeatable process for every website in this account. Every rule here came out of a real
correction on a real build — none of it is theory.

Full process: `docs/process/HAND-BUILT-TIER.md`. Checklists: `docs/process/CHECKLISTS.md`.
Read the process document before starting, not after.

## The order is the process

**0 → Audit before any design work.** `docs/AUDIT.md` from `docs/templates/AUDIT.md`. Every
page of the incumbent site, plus local competitors. Hunt specifically for stale tense,
self-contradictions across pages, pages that don't do what they're named, buried real assets,
and dead-end journeys. Every finding needs a URL and a quote — never rely on memory. This is
where the pitch comes from and it is worth more than any later design decision.

**1 → Product truth before any visual decision.** `PRODUCT.md` from the template. Every fact
traces to the client's own site, their Google listing, their socials, or a real ordering
platform. Nothing invented. Record the source per fact; record conflicts as conflicts. Photo
evidence beats typed listings — paint on the truck beats a typo on their site. Where data
genuinely doesn't exist, ship a visible "Note —" panel saying so, rather than a guess.

**2 → Visual world, then commit.** Direction contract as an HTML comment at the top of
`<body>` (`docs/templates/direction-contract.html`): thesis, palette and type rationale,
revision log. Update it whenever the world materially changes. Ground the accent in something
real about the business. Avoid the AI-default warm cream + serif display + terracotta. Treat
explicit client creative direction as a pin, not a suggestion — an internally coherent
direction can still be the wrong one.

**3 → Build order.** Home → sub-pages (nav links first, so the structure is real even if pages
404 briefly) → real content passes → photography → forms → copy polish → deploy. **Batch the
deploys** — each one costs credits.

**4 → Verify.** `npm run check`. Hard-reload before trusting a screenshot. When the screenshot
tool fights you, read the DOM instead — `getBoundingClientRect()` and computed styles diagnose
layout bugs faster and far cheaper than stacking image tokens into the context. Check mobile
on an emulated viewport.

**5 → Launch review.** The pre-launch list in `docs/process/CHECKLISTS.md`.

## Copy rules

Full legal business name in brand positions. Present tense, always. Never the string
"Real photo —" in client-facing copy. Captions carry information, not labels. Say the plain
category at least once before using shorthand. Lead with what's stable when the detail
rotates. Never attack the previous vendor — "your site hasn't kept up with how much you've
grown," not "you got ripped off."

## Photography

Open every image at full size before placing it. Look for play buttons, share icons, search
and profile bars, watermarks, platform chrome at the top and bottom edges — a play-button
overlay shipped on the last build and only the client caught it. Crop out the client's old
logo. Check real resolution before upscaling, and never upscale dense small text. Pre-crop to
the target aspect. Match the photo to the claim. A venue's landing page needs a photo of the
venue in the first viewport.

## Before writing CSS

Start from `assets/css/hand-built-baseline.css`. It carries the fixes for bugs that have
already cost real debugging time — see section 6 of the process doc for why each one bites:

- Grid items default to `min-width: auto`; one long line forces the column wider than the page.
- A grid container with no `grid-template-columns` grows past its parent — use `minmax(0, 1fr)`.
- `span:last-child` also matches a lone span; use `span:first-child + span`.
- The `0fr → 1fr` accordion opens to nothing when the inner wrapper has `overflow: hidden`.
- `columns: 2` collapses inside an indefinite-height container — use a grid.
- `aspect-ratio` loses to intrinsic size when width/height attributes are present.
- A text-only card next to photo cards needs its text centred vertically.

## Checks

```
npm run check          # all of the below
npm run check:css      # section 6 layout-bug patterns
npm run check:copy     # section 4 copy rules
npm run check:links    # every nav link resolves
npm run check:photos   # real dimensions, aspect, upscale traps
npm run check:counts   # counts consistent sitewide
```

Configure `legalName`, `category`, `shorthand` and `counts` in `.hbtrc.json` — several checks
are inert until you do. Fix findings rather than suppressing them; when a value is flagged,
first ask whether an existing documented step already covers the same role.

## Session cost

Split the work across sessions and `/clear` between them. Long sessions re-read an
accumulating context on every tool call, and images make it worse. Stay on Sonnet for
build → screenshot → tweak loops.

## Starting a new site

`scripts/install.sh /path/to/new-site-repo` copies this whole kit into it.
