# Hand-Built Tier — Checklists

Operational companion to `HAND-BUILT-TIER.md`. Copy the relevant list into the working notes
for the build and tick it there. A gate is not passed until every box in it is ticked.

---

## Gate 0 — Audit (before any design work)

- [ ] Every page of the incumbent site listed in `docs/AUDIT.md` and marked audited
- [ ] Hunted specifically for: stale tense, self-contradictions, misnamed pages, buried real
      assets, dead-end journeys
- [ ] Cross-page consistency table filled — hours, phone, address, counts, on every page and
      in the footer
- [ ] Local competitors audited, not just the client
- [ ] Every finding carries a page URL and a quote or screenshot — nothing from memory
- [ ] Pitch lines drafted, framed around growth rather than blame

## Gate 1 — Product truth (before any visual decision)

- [ ] `PRODUCT.md` exists and is filled, not stubbed
- [ ] Every fact has a named source; nothing invented
- [ ] Conflicts between sources recorded as conflicts, not silently resolved
- [ ] Photo evidence checked against typed listings — paint beats a typo
- [ ] Genuinely missing data listed, each with the "Note —" panel copy that will ship
- [ ] Assumed-not-verified list exists for the owner to confirm
- [ ] Rotating vs. stable decided for anything that goes stale

## Gate 2 — Visual world

- [ ] Direction contract pasted at the top of `<body>` on the home page
- [ ] Thesis grounded in what the place actually is
- [ ] Accent grounded in something real about the business
- [ ] Not the AI-default warm cream + serif display + terracotta
- [ ] Any explicit client creative direction recorded as a pin
- [ ] Revision log started

## Gate 3 — Build order

- [ ] Home
- [ ] Sub-pages — nav links first, so the structure is real even if pages 404 briefly
- [ ] Real content passes — menus, specs, hours
- [ ] Photography
- [ ] Forms
- [ ] Copy polish
- [ ] Deploy — batched, never per tweak

## Gate 4 — Verification

- [ ] `npm run check` clean, findings fixed rather than suppressed
- [ ] Flagged values mapped onto an existing documented step where one covers the same role
- [ ] Hard-reloaded (Ctrl+Shift+R) before trusting any screenshot
- [ ] Layout questions answered from the DOM (`getBoundingClientRect()`, computed styles)
      rather than by retrying screenshots
- [ ] Mobile checked on an emulated real viewport, not a narrowed window

---

## Gate 5 — Before calling it done

From section 8 of the process document.

- [ ] Every count consistent sitewide
- [ ] Form submissions actually routed to a real inbox — **wired ≠ working**; send a real test
      submission and confirm it arrived
- [ ] All nav links resolve (`npm run check:links`)
- [ ] No placeholder or unverified claims left unflagged
- [ ] Photos checked at full size for platform UI — play buttons, share icons, profile bars,
      watermarks, chrome at the top and bottom edges
- [ ] Client's old logo cropped out of photos
- [ ] Venue photo in the first viewport of the landing page
- [ ] `DESIGN.md` regenerated
- [ ] Assumptions listed for the owner to confirm before launch

---

## Per-image checklist

Run this on **every** image, at full size, one at a time. The play-button overlay that shipped
on the last build was caught by the client, not by us.

- [ ] Opened at full size — not judged from a thumbnail or a page screenshot
- [ ] No platform chrome: play button, share icon, search or profile bar, watermark, top or
      bottom edge UI
- [ ] Client's old logo cropped out
- [ ] Real resolution checked before reaching for an upscaler (`npm run check:photos`)
- [ ] No upscaling of dense small text — menu boards, tap handles, signage
- [ ] Pre-cropped to the target aspect rather than left to `object-fit`
- [ ] Photo matches the claim it sits under
- [ ] Caption carries information, not a label — and never says "Real photo —"
