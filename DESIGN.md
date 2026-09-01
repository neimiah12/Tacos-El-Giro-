# DESIGN.md — Tacos El Giro

Regenerate this whenever a section is added or the direction changes; it goes stale
every time (Hand-Built §8). Last regenerated 2026-09-01.

**Tier:** Verified Launch ($799). One page, no framework, no build step.

---

## Architecture — the order counter

The menu is a matrix: **five meats crossed with eight formats.** That is the one
structurally true thing about this counter, and no Google listing can show it. So the page
*is* the counter — pick a meat, the formats resolve underneath.

Assigned by the tier doc's §3 worked-examples table, then corroborated independently: the
five meats fall straight out of the eight named popular items (birria, adobada, chorizo,
chicken, carne asada).

Built on **radio inputs and `:checked`**, not JavaScript. The whole interaction works with
scripting off. `script.js` does one thing — keep the footer year current.

### The invariant

**No prices render inside `#counter`.** No per-item price exists in any source, and
following Buriram Bites the range is stated once in prose instead. `verify.mjs` counts
price strings in the counter and fails the build if any appear.

Two further build decisions are asserted the same way:

- **No `tel:` link.** The phone is single-sourced (§1 requires two independent confirmations).
- **No order-online affordance.** The DoorDash store is switched off (§1).

---

## Sections

| Section | Job |
|---|---|
| Sticky bar | Wordmark, venue, two anchors |
| Masthead | What this is, in one line; rating, typical spend, how to order |
| The counter | The signature element — meat picker, resolving board, legend |
| Street tacos | The one named item with no meat attached |
| Note | The honest gap: hours and prices, in the counter's voice |
| Visit | Address inside Summer's Hub; phone as text |
| Footer | Name, address, year |

---

## Palette — measured, not eyeballed

Placeholder, and flagged as such: no logo, signage or truck photo was obtainable, so §4's
programmatic sampling never ran. Grounded in two real things rather than a generator — the
**steel of a service counter** for the ground, and the **consommé** for the accent.

Every value was found by sweeping for the lightest cut clearing the bar against the **worst**
background it sits on.

| Token | Hex | Role |
|---|---|---|
| `--ground` | `#E9ECEE` | Page ground — cool steel, hue 204°, blue > red |
| `--ground-sunk` | `#DDE1E4` | Chips, the note panel |
| `--rule` | `#C4CBD0` | Hairlines |
| `--board` | `#1A1E22` | The board, bar, strip, footer |
| `--board-2` | `#242A30` | Raised cells on the board |
| `--ink` | `#1A1E22` | Headings |
| `--ink-body` | `#3A4148` | Body |
| `--ink-mute` | `#5D656B` | Secondary |
| `--accent-text` | `#B03D1C` | Accent text on light |
| `--accent-fill` | `#C4441F` | Selected chip, rules, skip link |
| `--accent-board` | `#D4765A` | Accent on the board |
| `--masa-board` | `#E8B93C` | "On the menu" marker |
| `--masa-ground` | `#79611F` | Same marker on light |
| `--on-board` | `#AFB5BB` | Body on the board |
| `--on-board-mute` | `#889197` | Secondary on the board |

### Measured pairings — all 19 pass

| Pairing | fg | bg | Ratio | Target |
|---|---|---|---|---|
| Headings | `#1A1E22` | `#E9ECEE` | 14.13 | 7.0 |
| Headings on sunk | `#1A1E22` | `#DDE1E4` | 12.74 | 7.0 |
| Body | `#3A4148` | `#E9ECEE` | 8.72 | 7.0 |
| Body on sunk | `#3A4148` | `#DDE1E4` | 7.87 | 7.0 |
| Secondary | `#5D656B` | `#E9ECEE` | 5.00 | 4.5 |
| Secondary on sunk | `#5D656B` | `#DDE1E4` | 4.51 | 4.5 |
| Accent text | `#B03D1C` | `#E9ECEE` | 5.01 | 4.5 |
| Accent on sunk | `#B03D1C` | `#DDE1E4` | 4.52 | 4.5 |
| Marker on ground | `#79611F` | `#E9ECEE` | 5.00 | 4.5 |
| Marker on sunk | `#79611F` | `#DDE1E4` | 4.51 | 4.5 |
| White on accent fill | `#FFFFFF` | `#C4441F` | 5.01 | 4.5 |
| Body on board | `#AFB5BB` | `#1A1E22` | 8.10 | 7.0 |
| Body on raised cell | `#AFB5BB` | `#242A30` | 7.01 | 7.0 |
| Secondary on board | `#889197` | `#1A1E22` | 5.22 | 4.5 |
| Secondary on raised cell | `#889197` | `#242A30` | 4.52 | 4.5 |
| Accent on board | `#D4765A` | `#1A1E22` | 5.22 | 4.5 |
| Accent on raised cell | `#D4765A` | `#242A30` | 4.51 | 4.5 |
| Marker on board | `#E8B93C` | `#1A1E22` | 9.13 | 4.5 |
| Marker on raised cell | `#E8B93C` | `#242A30` | 7.89 | 4.5 |

`verify.mjs` re-derives these live across 296 leaf elements in all five meat states, plus
hover states separately. Tightest measured pair in the running page: **4.51:1**.

---

## Type

**Anton** (display) and **Archivo** (text), self-hosted as woff2 — 124 KB, latin and
latin-ext, no third-party request at runtime.

Fraunces is banned on this build: swapped out of a shipped build as the obvious warm serif,
and the previous version of this site used it. Petrona, Gabarito, Hanken Grotesk, Familjen
Grotesk, Karla, Chivo, Figtree, Bricolage and Zilla are already used on other builds.
Instrument Sans, Playfair, Lora and Cormorant are flagged overused.

### Five steps, real gaps

| Token | Size at 1280 | Gap | Role |
|---|---|---|---|
| `--t-label` | 12px | — | Eyebrows, format labels, legend |
| `--t-body` | 16px | 1.33× | Body |
| `--t-lead` | 22px | 1.375× | Lead, wordmark, chip and cell names, address |
| `--t-head` | 34px | 1.55× | Section heads, phone |
| `--t-display` | 68px | 2.0× | Masthead |

`--t-lead` and `--t-display` are fluid; both resolve to the figures above at 1280.
Nothing functional renders below 11px.

**Do not add a sixth step a fraction away from an existing one.** Four one-off sizes
(1.3125rem, 1.25rem) were caught rendering a 20/21/22px cluster 1.05× apart — a flat ramp —
and were mapped onto `--t-lead` rather than added as exceptions.

---

## Photography

**None.** No photo of this counter was obtainable, and neither AI-generated nor stock food
photography survives §1's sourcing discipline — see `PRODUCT.md`. The design is therefore led
by type, structure and the matrix so the absence reads as a deliberate order-counter
treatment rather than holes in the page.

This is still a gap. Hand-Built §5: a venue's landing page needs a photo of the venue in the
first viewport. **The counter photo is the highest-value asset to collect.**

---

## Recurring CSS bugs — guarded, not discovered

Hand-Built §6 traps, handled up front:

- `min-width: 0` on every grid item.
- `grid-template-columns: minmax(0, 1fr)` on every grid container.
- **No `0fr → 1fr` accordion.** Panels share one grid row and cross-fade, so no track can
  resolve to `0px` and switching meats never changes page height.
- **No CSS multi-column** anywhere.
- `img, svg { max-width: 100%; height: auto; display: block; }` globally.
- `span:last-child` avoided entirely — it also matches a lone span.
- **One** anchor-offset mechanism: `scroll-padding-top` on `html`, never stacked with
  `scroll-margin-top`.
