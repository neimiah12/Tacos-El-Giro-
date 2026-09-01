# Hand-Built Tier — Build Process

Written 2026-08-29, from the Summer's Hub of Kennewick build (the second hand-built-tier
project, after Jose's Taco Truck). This is the repeatable process and the rules that came
out of real corrections — not theory. Read this before starting the next one.

> **Status:** canonical. This file is the source of truth for the process. The checklists in
> `docs/process/CHECKLISTS.md` and the automated checks in `scripts/hbt.mjs` implement it;
> when they disagree with this document, this document wins and the others get fixed.

---

## 0. Before any design work

**Audit the incumbent site page by page. All of it.** This is where the pitch comes from,
and it is worth more than any design decision made later.

What to look for specifically — every one of these was found on a real site:

- **Tense.** Copy written before opening and never updated ("The Hub *will* boast...").
  A business with hundreds of reviews still describing itself in future tense is the single
  most damning thing you'll find.
- **Self-contradictions.** Summer's Hub listed two different sets of hours on two pages, and
  an About section saying "open sun up to sun down" against a footer saying 11am–9pm. Check
  hours, phone numbers, and counts across every page.
- **Pages that don't do what they're named.** Their "Events Calendar" was a private-booking
  form with no public event listing anywhere on the site.
- **Buried real assets.** A useful landmark ("between Chuck E. Cheese and Sportsman's
  Warehouse") sitting in a footer. Real specs, real hiring copy, real application fields.
- **Dead-end journeys.** Vendor and careers pages barely linked, with no way to actually apply.

Also audit **local competitors**, not just the client. Finding that the only comparable venue
in the market had no website of its own — just a page on a government site — produced the
strongest line in the whole pitch.

Record findings in `PRODUCT.md` as you go, with the evidence trail. Never rely on memory.

**Deliverable of this phase:** `docs/AUDIT.md` (from `docs/templates/AUDIT.md`), one row per
finding, each with a page URL and a quote. No finding without evidence.

---

## 1. Product truth first, design second

`PRODUCT.md` before any visual decision. Audiences, real evidence, what's verified vs. assumed.

**Sourcing discipline — non-negotiable:**
- Everything traceable to the client's own site, their Google listing, their socials, or a
  real ordering platform. Nothing invented.
- Where data genuinely doesn't exist, **say so on the page** rather than filling it. A
  "Note —" panel saying "we don't have this published yet, call us" is better than silence
  and far better than a guess.
- Record *which* source each fact came from. When two sources disagree, note the conflict
  rather than silently picking one.
- **Real photo evidence beats typed listings.** Their site's text said "Burriam Bites" and
  "Angel Farms Hard Ice Cream"; their own official truck photography showed **Buriram Bites**
  and **Angel Brook Farm** painted on the trucks. Paint wins over a typo.

---

## 2. Visual world

Pick a world grounded in what the place actually is, then commit. Record it as a **direction
contract** — an HTML comment at the top of `<body>` with the thesis, the palette/type
rationale, and a revision log.

**Update the contract every time the world materially changes.** It's the only record of
*why*, and it stops a later pass from undoing a deliberate decision.

Hard-won lessons:
- **A formally "assigned" direction can still be wrong.** The first world here was a dark
  roadside-marquee treatment. It was internally coherent and got rejected outright once the
  full picture (family venue, farmers market, taproom) was clear. Client feedback beats
  process output — treat explicit creative direction as a pin, not a suggestion.
- **Avoid the AI-default look.** Warm cream + serif display + terracotta accent is the most
  overused generated combination there is. When the ground and display face already match
  half of it, pick the accent somewhere else entirely.
- **Ground the accent in something real.** The wine accent came from the venue's actual
  32-tap taproom, not from a palette generator.

Template: `docs/templates/direction-contract.html`. Paste it as the first thing inside
`<body>` on the home page and keep its revision log current.

---

## 3. Build order

1. Home
2. Sub-pages (nav links first so the structure is real, even if pages 404 briefly)
3. Real content passes — menus, specs, hours
4. Photography
5. Forms
6. Copy polish
7. Deploy

**Batch the deploys.** Each Netlify deploy costs credits. Test locally, deploy once a
meaningful batch is done — never per tweak.

---

## 4. Copy rules (all from real corrections)

- **Use the full legal business name** in brand positions — header wordmark, hero, footer.
  Not the shortened version.
- **Never write "Real photo —" in a caption.** That framing is internal sourcing discipline,
  not client-facing copy. On the client's own site it reads bizarre.
- **Captions should carry information, not labels.** "The Hub from above — free parking on
  all sides" beats "the whole Hub, from above." If the caption only names what's visible,
  rewrite it or cut it.
- **Say the category plainly at least once.** The site said "trucks" everywhere and never
  "food trucks." Shorthand is fine *after* the page establishes what it means.
- **Present tense, always.** The thing exists now.
- **Lead with what's stable when the detail rotates.** A 32-tap list goes stale in weeks, so
  the price tiers (which don't change) lead, and the specific pours sit behind a toggle with
  an honest "this rotates" note.
- **Don't attack the previous vendor.** "Your site hasn't kept up with how much you've grown"
  lands better than "you got ripped off," and doesn't make the owner defend a relationship
  they may still value.

`npm run check:copy` enforces the mechanical ones (future tense, "Real photo —", vendor
attacks, the plain-category mention). The judgment ones stay human.

---

## 5. Photography

**Check every image at full size before placing it. Every one.**

The Ann's Best photo shipped with a **video play-button overlay** baked in, from a social
screenshot. It was only caught because the client spotted it. Look for: play buttons, share
icons, search/profile bars, watermarks, platform chrome at top and bottom edges.

- **Crop out client logos** from photos when the whole pitch is a modernization — reusing
  their old badge undercuts it.
- **Verify resolution before reaching for an upscaler.** Most were already 2000×1500. And
  **never upscale images with dense small text** (menu boards, tap handles) — AI upscalers
  have invented fake text on this account before.
- **Pre-crop to the target aspect rather than letting `object-fit` guess.** A portrait photo
  dropped into a wide band gets cropped somewhere useless.
- **Match the photo to the claim.** For a "Game Day Hub," pick the interior shot with visible
  screens, not just the one with the most people.
- **A venue's landing page needs a photo of the venue in the first viewport.** This was the
  one place the incumbent site genuinely beat the rebuild. Stats build credibility; a photo
  builds desire. For a place people physically go, showing it *is* the invitation.

`npm run check:photos` reports every image's real pixel dimensions and aspect, and flags
candidates for the traps above. It cannot see platform chrome — that stays a human full-size
look, one image at a time.

---

## 6. Recurring CSS bugs — check these first

All three cost real debugging time on this build.

**Text overflowing / invisible in a grid card.** Three separate causes, stacked:
1. Grid items default to `min-width: auto` — one long unbroken line forces the whole column
   wider than the page. Fix: `min-width: 0` on the card.
2. A grid container with no `grid-template-columns` gets one implicit auto-sized column that
   grows past its parent. Fix: `grid-template-columns: minmax(0, 1fr)`.
3. **`span:last-child` also matches a lone span** (it's both first and last child), so a
   price rule with `white-space: nowrap` silently applied to plain text rows. Fix:
   `span:first-child + span`.

**The `0fr → 1fr` accordion silently opening to nothing.** `overflow: hidden` on the inner
wrapper zeroes its max-content contribution, so the `fr` track resolves to `0px`. The DOM is
correct and the content is present at zero height. It works inside a flex column card and
fails elsewhere — don't assume it's portable. Fall back to a fade reveal; no magic
`max-height` number to drift.

**CSS multi-column collapsing to zero.** `columns: 2` needs a definite height to balance
against. Inside an indefinite-height container it collapses. Use a grid instead.

**`aspect-ratio` losing to intrinsic size.** With `width`/`height` HTML attributes present,
an image rendered at its intrinsic height instead of the aspect ratio. Set an explicit
(clamped) height when it must be deterministic.

**Balance a card row.** If one card in a row has no image while its neighbors do, its text
sits at the top while theirs sits under photos — it looks *more* lopsided. Center the
text-only card vertically.

`assets/css/hand-built-baseline.css` ships the preventative fixes; `npm run check:css`
detects the patterns after the fact.

---

## 7. Verification

- **Hard-reload (Ctrl+Shift+R) before trusting any screenshot.** A stale cached stylesheet
  cost real time chasing a bug that didn't exist.
- **When the screenshot tool fights you, read the DOM instead.** Querying
  `getBoundingClientRect()` and computed styles diagnosed all three layout bugs faster than
  screenshots, and far cheaper. Retried screenshots stack image tokens into a context that
  then gets re-read on every later call.
- **Check mobile.** Emulate a real viewport, don't just narrow the window.
- **Run the design detector** and fix findings rather than suppressing them. When a value is
  flagged, first ask whether an existing documented step covers the same role — mapping a
  one-off `1.5rem` onto the documented `1.7rem` stat step tightened the ramp instead of
  adding a fourteenth exception.

---

## 8. Before calling it done

- [ ] Every count consistent sitewide (vendor counts drifted across three files here)
- [ ] Form submissions actually routed to a real inbox — wired ≠ working
- [ ] All nav links resolve
- [ ] No placeholder or unverified claims left unflagged
- [ ] Photos checked at full size for platform UI
- [ ] `DESIGN.md` regenerated (it goes stale every time a section is added)
- [ ] Assumptions listed for the owner to confirm before launch

---

## 9. Session cost

Split the work across sessions and `/clear` between them. One long session accumulates a
context that every later tool call pays to re-read; images make it worse. Stay on Sonnet for
build → screenshot → tweak loops. See `feedback-session-cost-control` in memory.
