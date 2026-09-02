---
name: Tacos El Giro
description: A night-lit food truck page — one warm aperture on asphalt black, signage caps, and a service board that resolves as you pick a meat.
colors:
  ink: "#100D0C"
  surf-1: "#191413"
  surf-2: "#241C1A"
  surf-3: "#2E2321"
  cream: "#F2E7D9"
  cream-2: "#CFC2B4"
  mute: "#A2968C"
  gold: "#F9C22E"
  red: "#D8202A"
  red-text: "#E36269"
  on-red: "#FFFFFF"
typography:
  display:
    fontFamily: "Anton, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(2.75rem, 0.9rem + 7.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Anton, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.005em"
  stat:
    fontFamily: "Anton, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 1.7vw, 2rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.65
    letterSpacing: "0.14em"
  numeric:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "'tnum' 1"
rounded:
  none: "0px"
spacing:
  hairline: "1px"
  cell: "0.9rem 1.05rem"
  gutter: "clamp(1.25rem, 5vw, 3.5rem)"
  board: "clamp(1.75rem, 4vw, 3rem)"
  bay: "clamp(4.5rem, 10vw, 9rem)"
components:
  button-fill:
    backgroundColor: "{colors.red}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1.05rem 2rem"
  button-fill-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1.05rem 2rem"
  button-ghost-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "{colors.surf-1}"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.05rem"
  chip-hover:
    backgroundColor: "{colors.surf-3}"
    textColor: "{colors.gold}"
  chip-selected:
    backgroundColor: "{colors.red}"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.05rem"
  format-cell:
    backgroundColor: "{colors.surf-1}"
    textColor: "{colors.gold}"
    rounded: "{rounded.none}"
    padding: "{spacing.cell}"
  format-cell-ask:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mute}"
    rounded: "{rounded.none}"
    padding: "{spacing.cell}"
---

# Design System: Tacos El Giro

## Overview

**Creative North Star: "The Service Window After Dark"**

The page is a truck at night lit by its own aperture. The ground is asphalt black and never
lightens; everything you can read sits inside a pool of warm light thrown across it. That
single idea does all the structural work that a restaurant template would hand to boxes:
sections are separated because the light falls off between them, not because a card has a
border. There is exactly one accent temperature — brand gold — and one action colour —
brand red — and neither is ever used decoratively.

Density is high inside the lit areas and generous between them. The centrepiece is the menu
board: five meats across the top, and the eight formats resolve underneath when you pick one.
It is a service board, not a price list, and it is the reason the page exists. Photography is
the second light source; images sit on a lit gradient panel so that a failed load degrades to
a glow rather than a broken tile.

The page deliberately refuses the restaurant-template reflexes: no bordered tile grid, no
icon-heading-text feature row, no hero metric strip, and no fade-up on every section as you
scroll. Motion is spent once, on load, and then the page holds still.

**Key Characteristics:**
- Asphalt-black ground (`ink`) that never inverts to a light section.
- One warm aperture (`gold`) as the only light; `red` reserved for action.
- Anton signage caps over Archivo text; six real steps, no in-between sizes.
- Zero radius everywhere. Separation is light, hairlines, and 1px grid gaps.
- One authored motion moment: the hero light coming up on load.

## Colors

A near-black asphalt ground carrying a warm cream text family, with one gold aperture and one
red action colour; there is no cool hue anywhere in the palette.

### Primary
- **Aperture Gold** (`gold`): the light itself. Section glow, board top-edge, format names on
  the board, section-head emphasis (`.h2 em`), footer/row labels, active nav underline, focus
  ring, `::selection`, and every hover destination. This is the only warm light in the system.

### Secondary
- **Truck Red** (`red`): action alone — the filled Call button, the selected meat chip, the
  skip link. It never appears as a background for reading text or as decoration.
- **Lit Red** (`red-text`): the legible red for red-on-dark text situations. Use this, never
  `red`, when red has to be read as type against a dark surface.

### Neutral
- **Asphalt** (`ink`): page ground, scrollbar track, and the "ask at the counter" cell.
- **Surface 1 / 2 / 3** (`surf-1`, `surf-2`, `surf-3`): the three lit steps. `surf-1` is the
  resting cell (chips, format cells), `surf-2` the top of the board gradient, `surf-3` the
  hover step and the scrollbar thumb. Nothing steps higher.
- **Cream** (`cream`): headings, display type, quotes, and anything that must read as lit.
- **Cream 2** (`cream-2`): body copy and default page text.
- **Mute** (`mute`): secondary copy, captions, legends, format labels, and the trading name
  under the wordmark.

### Named Rules
**The One Aperture Rule.** Gold is light, not decoration. It may glow, edge, label, or mark
the hover destination — it may not fill a large surface or become a second brand colour.

**The Red Is A Verb Rule.** `red` fills only things a person can do: call, choose a meat, skip
to content. Red as type on dark uses `red-text`; `red` at body size on `ink` is not legible.

**The No Light Section Rule.** No section inverts to a light background. Contrast comes from
how far up the `ink` → `surf-3` ladder a surface sits, never from flipping the ground.

## Typography

**Display Font:** Anton (with Haettenschweiler, Arial Narrow Bold)
**Body Font:** Archivo (with the system sans stack)

Both are self-hosted woff2, latin and latin-ext, `font-display: swap`, with no runtime
third-party request. Anton is condensed signage caps and does the shouting; Archivo is the
plain, slightly technical voice that does all the reading. The pairing reads as painted truck
lettering over a printed order card.

### Hierarchy
Rendered sizes at a 1280px viewport:

- **Display** (Anton 400, 96px, 0.88, -0.02em, uppercase): the masthead h1 only.
- **Headline** (Anton 400, 44px, 0.96, -0.005em, uppercase): section heads and the board title.
- **Stat** (Anton 400, 32px, 1.0, -0.01em, uppercase, gold): the three claims in the about
  block, set as statements.
- **Title** (22px, 1.55 as lede / 1.05–1.34 as Anton names): ledes and hero paragraph in
  Archivo; wordmark, dish names and pull-quotes in Anton at the same step.
- **Body** (Archivo 400, 16px, 1.65): all reading copy. Measures are capped per context —
  34ch for a lede, 40ch for a dish description, 46ch for a centred lede, 64ch for a board
  note, 66–68ch for the disclaimer and the visit note.
- **Label** (Archivo 700, 12px, 0.13–0.18em, uppercase): nav, buttons, format labels, legend,
  captions, footer headings, hero meta.

### Named Rules
**The Six Steps Rule.** The ramp is 12 / 16 / 22 / 32 / 44 / 96 at 1280 and nothing else
renders. A previous pass shipped a 20/21/22px cluster 1.05× apart, which reads as a flat ramp;
those were mapped onto the 22px step. Never add a seventh step a fraction from an existing one.

**The Anton Is Caps Rule.** Anton is only ever set uppercase, at 0.88–1.34 line-height, with
slightly negative tracking at headline scale and up. It is never used for a paragraph.

**The Tabular Numerals Rule.** Any rendered figure — rating, review count, price range, year,
phone — carries `.num` (`font-variant-numeric: tabular-nums`). Digits do not shift width.

**No kickers.** No tracked-caps eyebrow sits above any heading. A kicker was removed from this
build once; the lede states the category in a sentence instead.

## Layout

A single centred column: `--wrap` 1180px max, inline padding `--gutter`
(`clamp(1.25rem, 5vw, 3.5rem)`). Every section is a `.bay` with vertical padding `--bay`
(`clamp(4.5rem, 10vw, 9rem)`) — that generous block padding is the separator, since nothing is
boxed.

Breakpoints in use: 380px (hide the phone-button label), 480px (buttons go full width), 520px
(gallery to 2 columns), 620px (format cells to 2 columns; dish photos switch from 3:2 to 4:5),
900px (the burger/desktop-nav switch, the about and visit splits, format cells to 4 columns),
960px (gallery to the 4-column mosaic).

Grids are `auto-fit, minmax(min(100%, Npx), 1fr)` wherever the count can vary (dishes 230px,
reviews 260px, chips 150px, footer 190px). The gallery is an explicit 4-column mosaic on a
`clamp(150px, 15vw, 200px)` row that repeats every six tiles so each group fills 4×3 exactly.

Every grid item carries `min-width: 0` and every grid container declares `minmax(0, 1fr)`;
no `0fr → 1fr` accordion exists anywhere, and there is no CSS multi-column.

### Named Rules
**The Light Pool Rule.** Sections separate by falloff. Each `.bay` paints a radial gradient
(gold at 8.5%, red at 5%, transparent by 68%) positioned per-section with `--lx` / `--ly`, so
the light source moves down the page: 16%/6%, 84%/14%, 50%/2%, 24%/10%, 78%/8%. Never
reintroduce a section divider rule or a bordered card to do this job.

**The Shared Cell Rule.** All five meat panes occupy the same grid cell (`grid-row: 1;
grid-column: 1`) and cross-fade. Switching meats must never change page height.

## Elevation & Depth

There is no elevation ladder. Depth is tonal: `ink` → `surf-1` → `surf-2` → `surf-3`, plus
gradients and 1px hairline gaps. The only shadows in the system are cast by photography and by
the filled button, and both are neutral black — never a coloured glow.

### Shadow Vocabulary
- **Photo drop** (`box-shadow: 0 24px 58px -30px rgba(0,0,0,.95)`): under every `.shot`. Lifts
  the picture off the asphalt. Removed when the shot is a full-bleed background (`.shot--fill`).
- **Action lift** (`0 12px 28px -16px rgba(0,0,0,.9)`, hover `0 18px 36px -16px rgba(0,0,0,.95)`):
  the filled button only, paired with a `-2px` translate.
- **Inset hairline** (`inset 0 0 0 1px rgba(242,231,217,.28)`): the ghost button and the social
  icons. A one-pixel edge of light, not a border.

### Named Rules
**The Neutral Shadow Rule.** Shadows are black and diffuse. A coloured glow under a photo or a
card is the tell of a template; the warm light in this system comes from the gradients, never
from a tinted shadow.

**The Hairline-Not-Border Rule.** Where an edge is genuinely needed it is a 1px grid gap
(`background: rgba(242,231,217,.08)` showing between cells) or a gradient hairline that fades
out — the board's gold top edge, the claim separators, the footer rule. Never a full-perimeter
1px box.

## Shapes

Zero radius, everywhere. Buttons, chips, cells, photos, panels and the map are all hard
rectangles; the only rounded things in the build are the scrollbar thumb and the 1px softening
on the focus ring. The recurring silhouette is the rectangular cell in a 1px-gapped grid — the
chips row and the format grid are the same object at two scales, which is what makes the board
read as a service board.

Photo aspect ratios are fixed and few: 4:5 for portrait dishes and the about shot, 3:2 for
dishes on narrow screens, 4:3 for gallery and visit tiles.

## Components

### Buttons
- **Shape:** hard rectangle (0 radius), inline-flex with a 0.6rem gap for its inline SVG icon
  (17×17, `currentColor`, 2px stroke).
- **Primary (fill):** red ground, white label, 12px/700 caps at 0.08em, padding 1.05rem 2rem,
  with the action-lift shadow.
- **Ghost:** transparent with an inset cream hairline; inverts to solid cream on `ink` on hover.
- **Hover / Focus:** every button rises 2px over 0.35s on `cubic-bezier(0.16, 1, 0.3, 1)` and
  the fill variant crosses from red to gold. Focus is the global gold ring at 4px offset.
- **Mobile:** buttons stretch to full width below 480px; a compact red Call button lives in the
  bar below 900px so the highest-value action is never hidden behind the burger.

### Chips (meat selector)
- **Style:** `surf-1` cells in a 1px-gapped grid, Anton name at 16px caps in cream over a 12px
  muted descriptor.
- **State:** hover steps to `surf-3` with a gold name; selected fills red with white name and
  descriptor. Selection is driven by radio inputs and `:checked` — no JavaScript.
- **Focus:** gold ring inset by 2px so it stays inside the cell grid.

### Cards / Containers
There are no cards. The board (`.board`) is the only panel: a lit slab with a gold gradient
hairline along its top edge, `surf-2 → surf-1 → ink` gradient body, `clamp(1.75rem, 4vw, 3rem)`
padding, and no border or radius. Everything else sits directly on the ground.

### Navigation
Sticky bar over a black-to-transparent gradient that goes solid (`rgba(16,13,12,.96)`) past
30px of scroll. Links are 12px/700 caps at 0.13em in `cream-2` with a gold underline that
scales in from the left on hover and stays on for the section in view. Below 900px the nav
becomes a full-width panel under the bar, opened by a burger that morphs to an X, with body
scroll locked and Escape to close.

### Photography (signature)
Every image sits inside `.shot`: a panel painted with a gold radial from the top-left, a red
radial from the bottom-right, and a `surf-3 → surf-1 → ink` diagonal, with the neutral photo
drop shadow. The image is `object-fit: cover` and scales to 1.05 over 0.9s on card hover.
When an image fails to load, script.js adds `.is-missing` and hides the `<img>`, so the lit
panel becomes the picture instead of a broken-image icon.

### The Board (signature)
The centrepiece. Five meat chips across the top; below them one shared grid cell holding five
panes of eight format cells each. A format cell is a 12px muted caps label over the availability
answer set in gold Anton caps; cells whose answer is unconfirmed use the `.ask` variant — `ink`
ground, Archivo sentence case in `mute` — and a legend keys the two states.

### Named Rules
**The No Price Rule.** No per-item price renders anywhere inside `#menu`. No per-item price is
confirmed in any source, and inventing one is the failure mode this architecture exists to
prevent. `verify.mjs` asserts this on the rendered page; the hero's `$10–20 per person` range
is a sourced, non-item figure and lives outside the board.

**The Honest Cell Rule.** An unknown answer renders as the `.ask` cell, visibly different from a
confirmed one and keyed to the legend. Unknowns are never blanked, guessed, or dashed out.

## Do's and Don'ts

### Do:
- **Do** separate sections with a `.bay` light pool, positioned with its own `--lx` / `--ly`.
- **Do** keep every corner square (0 radius) and every edge a hairline gap or a fading gradient.
- **Do** send every hover to gold — nav underline, chip name, dish link, footer link, social fill.
- **Do** put photography inside `.shot` so a failed load degrades to a lit panel.
- **Do** carry `.num` on every rendered figure so digits stay tabular.
- **Do** theme the browser's own surfaces from the palette: gold `::selection` on `ink`, a
  `surf-3`-on-`ink` scrollbar, a 2px gold focus ring at 4px offset, and 0.22em underline offset
  on non-button links.
- **Do** hold new type to the six-step ramp (12 / 16 / 22 / 32 / 44 / 96 at 1280).
- **Do** honour `prefers-reduced-motion`, which flattens every animation and transition to
  0.001ms and disables smooth scroll.

### Don't:
- **Don't** render a per-item price inside `#menu`. Nothing sources one.
- **Don't** wrap a section in a bordered card or lay a divider rule between sections; the light
  falloff is the separator and re-adding boxes undoes the whole architecture.
- **Don't** put a coloured glow under a photo or a panel. Shadows are neutral black.
- **Don't** add a scroll-reveal observer or a per-section fade-up. There is one authored moment
  — the hero light coming up on load (`lightUp`, 1900ms) with the hero text rising behind it on
  a 420–860ms stagger — and its value is that it is the only one.
- **Don't** set Anton in sentence case or use it for a paragraph.
- **Don't** put a tracked-caps kicker or eyebrow above a heading.
- **Don't** use `red` as type on a dark surface; that is what `red-text` is for.
- **Don't** invert a section to a light ground.
- **Don't** reintroduce Fraunces — it was swapped out of this build as the obvious warm serif
  and the previous version of this site used it.

<!--
Gate state, this pass. Both gates green, verified after this file was drafted:

  node .claude/skills/impeccable/scripts/detect.mjs --json index.html   -> [] (not degraded)
  CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
    node verify.mjs http://localhost:8000                              -> PASSED

The second command needs CHROME_PATH pointing at the chromium that ships in this
environment; without it Playwright looks for a headless shell that is not installed and the
run aborts. verify.mjs reads CHROME_PATH and passes it as executablePath. The same gate
passes against the packaged folder on port 8001.
-->
