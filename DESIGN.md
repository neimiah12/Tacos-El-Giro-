---
name: Tacos El Giro
description: A night-lit food truck page — the truck's own cobalt as the ground, one gold aperture, and a service board that resolves as you pick a meat.
colors:
  ink: "#080E28"
  surf-1: "#0D1538"
  surf-2: "#121D4A"
  surf-3: "#1B2B68"
  cream: "#F5EDE0"
  cream-2: "#D6CABA"
  mute: "#B1A695"
  gold: "#F0B008"
  red: "#C81818"
  white: "#FFFFFF"
  on-red: "#F5EDE0"
  on-gold: "#080E28"
  on-gold-2: "#4E3D0A"
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
    fontFamily: "Anton, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.01em"
  control:
    fontFamily: "Anton, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.005em"
  quote:
    fontFamily: "Anton, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.34
    letterSpacing: "0.005em"
  lead:
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
  chip: "1.2rem 1.2rem 1.25rem"
  gutter: "clamp(1.25rem, 5vw, 3.5rem)"
  board: "clamp(1.75rem, 4vw, 3rem)"
  bay: "clamp(4.5rem, 10vw, 9rem)"
components:
  button-fill:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1.05rem 2rem"
  button-fill-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
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
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "{spacing.chip}"
  chip-hover:
    backgroundColor: "{colors.surf-3}"
    textColor: "{colors.white}"
  chip-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "{spacing.chip}"
  chip-sublabel:
    textColor: "{colors.mute}"
    typography: "{typography.label}"
  chip-selected-sublabel:
    textColor: "{colors.on-gold-2}"
    typography: "{typography.label}"
  format-cell:
    backgroundColor: "{colors.surf-1}"
    textColor: "{colors.white}"
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

**Creative North Star: "The Truck After Dark"**

The page is the truck itself at night. The ground is not a neutral black chosen from a
palette generator: it is the truck's own body colour, sampled from the owner's photographs
and darkened until it holds type. Everything on that cobalt is either food, light, or an
action. Nothing is boxed. Sections do not end at a rule or a card edge; they end where the
light falls off.

The density is generous and the composition is a single column. There is one accent that
behaves like a lamp (gold) and one that behaves like a verb (red), and both come off the
owner's own logo rather than a brand kit. The type is signage first — condensed Anton at the
sizes a hand-painted menu board would use, caps everywhere it is writing and sentence case
inside the board where it is a control — with Archivo doing all the reading work underneath
it.

Its anti-reference is the restaurant template: bordered tiles, an icon-heading-text row of
"features", a metric strip under the hero, a fade-up on every section. This build refuses
all four. Where the direction contract named provisional hex values for gold (`#F9C22E`)
and red (`#D8202A`), the shipped build supersedes them with values measured off the owner's
materials; the contract's *intent* held, its placeholder numbers did not.

**Key Characteristics:**
- A cobalt ground sampled from the truck body, in four darkened steps, never a neutral grey
- One gold aperture as the only light source, plus red reserved for actions
- Zero radius everywhere; edges are hairline gaps and fading gradients, never boxes
- Signage-scale condensed caps over a small, tightly-tracked label voice
- Exactly one authored motion moment: the service light coming up on load
- No per-item price renders anywhere, because none is sourced

## Colors

A single cobalt family lifted off the truck's own paint, lit by two accents lifted off the
owner's logo — the palette is photographic in origin, not chosen.

### Primary
- **Aperture Gold** (`gold`): the light, and only the light. It is a surface, an edge or a
  glow — never a letterform. The board's top hairline, the claim dividers, the note rule, the
  nav underline, the `.bay` light pools, `::selection`, the focus ring, the fill button and
  social button on hover, and the field a meat chip floods to when it is selected. It carried
  type in an earlier revision — the hero's second line, heading emphasis, the format answers,
  the Visit and footer labels — and all of that is white now. Ink on gold measures 9.89:1.
- **Signage White** (`white`): the emphasis voice, and the only thing that outranks cream.
  The hero's second line, the `em` inside every section heading, the wordmark's second word,
  every named format answer on the board, the claim figures, the section labels in Visit and
  the footer, the dish links, and hover for every link and chip name. 13.19:1 at its worst
  surface (`surf-3`), 19.03:1 on the ground. It is not an invention: the display type and the
  logo outline in `img/promo-nortenos.jpg` are white, the same file gold and red came off.

### Secondary
- **Signage Red** (`red`): the verb. Filled buttons (Call, the skip link), and nothing else.
  It never carries type on a dark ground and it never decorates. Cream on red measures
  5.02:1 — the tightest pairing that ships.

### Neutral
- **Truck Shadow** (`ink`): the page ground, the `.ask` format cell, the scrollbar track, and
  the text colour that sits on gold. This is the truck body read in shadow.
- **Slab** (`surf-1`): the resting chip, the format cell, the map's own backing, and the
  bottom of the board gradient's upper reach.
- **Board** (`surf-2`): the top of the board gradient — the only place it appears alone.
- **Lit Slab** (`surf-3`): the chip on hover, the scrollbar thumb, and the top of the `.shot`
  panel gradient. The lightest surface any text lands on, so it is the surface every ratio
  below was swept against.
- **Fresh Tortilla** (`cream`): headings, the hero paragraph's emphasis, chip names, dish
  names, quotes, gallery captions, and the address block. 11.35:1.
- **Warm Paper** (`cream-2`): body copy, ledes, nav links at rest, footer links. 8.18:1.
- **Comal Ash** (`mute`): subordinate text — descriptors, captions, legends, the disclaimer,
  and the `.ask` answer. 5.50:1, the floor of the neutral ramp.
- **On-Gold Second Line** (`on-gold-2`): the only colour that exists solely to survive an
  inversion — a chip's sublabel once its field has flipped to gold. 5.47:1 on gold.

Cream and white measure only 1.16:1 against each other, so the step between them is a shift
in warmth, not a jump in contrast. That is the intended reading: a heading is one continuous
statement in which the emphasised words are cooler and brighter, not a heading with a
highlighter through it. Never rely on that step to carry meaning a screen reader would need.

### Named Rules
**The Measured Against The Worst Surface Rule.** Every ratio in this system is swept against
the lightest surface the colour can actually land on (`surf-3`), not against the page ground.
The recorded minima are white 13.19, cream 11.35, cream-2 8.18, mute 5.50, gold 6.86 (as a
surface only), cream-on-red 5.02, ink-on-gold 9.89, on-gold-2-on-gold 5.47. A new colour joins the palette only with its worst-
surface number recorded here.

**The Two Forbidden Pairings Rule.** Gold on red is 3.03:1 and red on ink is 3.32:1. Neither
ships as text anywhere and neither may be reintroduced. Red's job is to be a ground under
cream, never a foreground. A "red text" token was carried in an earlier revision and removed
unused; it would have failed at 4.45:1 on `surf-3`.

**The Channel Token Rule.** Any translucent use of a palette colour composes it from the
channel tokens — `--ink-rgb`, `--cream-rgb`, `--gold-rgb`, `--red-rgb` — inside `rgba()`.
Never hand-write the channels. This file has twice shipped an `rgba()` literal that drifted
from the token it was cut from; the channel tokens exist specifically so that cannot happen
a third time. The only permitted bare literals are neutral black in shadows.

**The Gold Is Light, Never Type Rule.** Gold may glow, edge, underline, highlight or flood a
field — the selected chip is the one large fill it is allowed. It sets no type at all, not a
heading, not a label, not a link, not a hover. Anywhere emphasis used to be gold it is now
`white`. This is the tightening of the older One Aperture Rule, which allowed gold to label:
that allowance is withdrawn, and gold type is not to be reintroduced.

**The No Light Section Rule.** No section inverts to a light background. Contrast comes from
the tonal ramp and from photography, never from flipping the ground.

## Typography

**Display Font:** Anton (with Haettenschweiler, Arial Narrow Bold, sans-serif)
**Body Font:** Archivo (with the system UI stack)

**Character:** A hand-painted menu board over a clean utilitarian sign shop. Anton is
condensed and heavy — shouting in caps as the page's voice, dropping to sentence case the
moment it is labelling something the visitor has to choose between; Archivo is neutral,
legible at small sizes, and does every job that involves reading a sentence.

### Hierarchy
- **Display** (Anton 400, `clamp(2.75rem, 0.9rem + 7.4vw, 6rem)` → 96px, 0.88, -0.02em caps):
  the hero headline only. One per page.
- **Headline** (Anton 400, `clamp(2rem, 1.3rem + 2.4vw, 2.75rem)` → 44px, -0.005em): section
  headings in caps at 0.96; the board's own title in sentence case at 1.02.
- **Stat** (Anton 400, `clamp(1.75rem, 1.2rem + 1.7vw, 2rem)` → 32px, 1.0, -0.01em caps): the
  three claim figures in About.
- **Title** (Anton 400, 22px step): dish names and the wordmark in caps at 1.05/0.015em; the
  meat names on the chips in sentence case at 1.1/-0.005em.
- **Lead** (Archivo 400, 22px step, 1.55): the hero paragraph, section ledes, review quotes'
  scale, and the Visit rows.
- **Body** (Archivo 400, 16px, 1.65): all paragraph copy, capped at 34–68ch depending on
  context.
- **Label** (Archivo 700, 12px, 0.12–0.18em caps): nav links, button labels, hero meta, chip
  sublabels, format-cell labels, gallery captions, footer headings, legends.

### Named Rules
**The Six Steps Rule.** The ramp is 12 / 16 / 22 / 32 / 44 / 96 at 1280 and nothing else
renders. Every size is one of `--t-label`, `--t-body`, `--t-lead`, `--t-stat`, `--t-head`,
`--t-display`; new type picks a step rather than adding one.

**The Anton Is Caps Except In The Board Rule.** Anton is set uppercase everywhere it carries
the page's editorial voice — hero, section headings, claim figures, dish names, the wordmark —
at 0.88–1.34 line-height with letter-spacing between -0.02em and 0. Inside the board it is set
in **sentence case**: the title, the five meat names, and the format answers. That is the one
exception and it is deliberate — the board is a control, not writing, and sentence case returns
the word shapes that make a control scan faster than the prose around it. Caps tracking
(+0.015em) does not travel with it; sentence-case Anton sits at -0.005em to 0. Anton never sets
a paragraph.

**The Readable Control Rule.** The meat names are the entire point of the pick-a-meat control,
so they are set at the lead step (22px desktop, 19px mobile), not at body. Condensed caps at
16px were the one thing on this page a person had to lean in to read; a control's primary
label does not sit below the lead step.

**The Tabular Numerals Rule.** Any rendered figure — rating, review count, price range — carries
`.num` for `font-variant-numeric: tabular-nums`.

## Layout

A single centred column: `--wrap` 1180px max, inline padding `--gutter`
(`clamp(1.25rem, 5vw, 3.5rem)`). Every section is a `.bay` with vertical padding `--bay`
(`clamp(4.5rem, 10vw, 9rem)`) — that generous block padding is the separator, since nothing is
boxed.

Breakpoints in use: 380px (hide the phone-button label), 480px (buttons go full width), 520px
(gallery to 2 columns), 620px (format cells to 2 columns; dish photos switch from 3:2 to 4:5),
900px (the burger/desktop-nav switch, the about and visit splits, format cells to 4 columns),
960px (gallery to the 4-column mosaic), 1020px (the meat chips go from 2 columns to 5).

Grids are `auto-fit, minmax(min(100%, Npx), 1fr)` wherever the count can genuinely vary
(dishes 230px, reviews 260px, footer 190px). Where the count is fixed the columns are
declared. The gallery is an explicit 4-column mosaic on a `clamp(150px, 15vw, 200px)` row
that repeats every six tiles so each group fills 4×3 exactly.

Every grid item carries `min-width: 0` and every grid container declares `minmax(0, 1fr)`;
no `0fr → 1fr` accordion exists anywhere, and there is no CSS multi-column.

### Named Rules
**The Light Pool Rule.** Sections separate by falloff. Each `.bay` paints a radial gradient
(gold at 10%, red at 7%, transparent by 68%) positioned per-section with `--lx` / `--ly`, so
the light source moves down the page: 16%/6%, 84%/14%, 50%/2%, 24%/10%, 78%/8%. Never
reintroduce a section divider rule or a bordered card to do this job.

**The Shared Cell Rule.** All five meat panes occupy the same grid cell (`grid-row: 1;
grid-column: 1`) and cross-fade. Switching meats must never change page height.

**The Declared Columns Rule.** A grid with a fixed, known item count declares its columns;
`auto-fit` is for counts that vary. Five chips under `auto-fit` left a dead cell at every
width where the row count did not divide five, so the chips are 2 columns with the fifth
spanning the row, and 5 columns from 1020px.

## Elevation & Depth

There is no elevation ladder. Depth is tonal: `ink` → `surf-1` → `surf-2` → `surf-3`, plus
gradients and 1px hairline gaps. The only shadows in the system are cast by photography and by
the filled button, and both are neutral black — never a coloured glow.

### Shadow Vocabulary
- **Photo drop** (`box-shadow: 0 24px 58px -30px rgba(0,0,0,.95)`): under every `.shot`. Lifts
  the picture off the ground. Removed when the shot is a full-bleed background (`.shot--fill`).
- **Action lift** (`0 12px 28px -16px rgba(0,0,0,.9)`, hover `0 18px 36px -16px rgba(0,0,0,.95)`):
  the filled button only, paired with a `-2px` translate.
- **Inset hairline** (`inset 0 0 0 1px rgba(var(--cream-rgb),.28)`): the ghost button; the
  social icons at `.2`. A one-pixel edge of light, not a border.

### Named Rules
**The Neutral Shadow Rule.** Shadows are black and diffuse, and every shadow offset is soft
and vertical. A coloured glow, or a hard offset with no blur, is the tell of a template; the
warm light in this system comes from the gradients, never from a tinted or stamped shadow.

**The Hairline-Not-Border Rule.** Where an edge is genuinely needed it is a 1px grid gap
(`rgba(var(--cream-rgb),.12)` between chips, `.08` between format cells) or a gradient
hairline that fades out — the board's gold top edge, the claim separators, the footer rule.
Never a full-perimeter 1px box.

## Shapes

Zero radius, everywhere. Buttons, chips, cells, photos, panels and the map are all hard
rectangles; the only rounded things in the build are the scrollbar thumb, the 1px softening on
the focus ring, and the favicon's 10px plate. The recurring silhouette is the rectangular cell
in a 1px-gapped grid — the chips row and the format grid are the same object at two scales,
which is what makes the board read as a service board.

Photo aspect ratios are fixed and few: 4:5 for portrait dishes and the about shot, 3:2 for
dishes on narrow screens, 4:3 for gallery and visit tiles.

## Components

### Buttons
- **Shape:** hard rectangle (0 radius), inline-flex with a 0.6rem gap for its inline SVG icon
  (17×17, `currentColor`, 2px stroke).
- **Primary (fill):** red ground, cream label (5.02:1), 12px/700 caps at 0.08em, padding
  1.05rem 2rem, with the action-lift shadow.
- **Ghost:** transparent with an inset cream hairline; inverts to solid cream on `ink` on hover.
- **Hover / Focus:** every button rises 2px over 0.35s on `cubic-bezier(0.16, 1, 0.3, 1)` and
  the fill variant crosses from red to gold with ink type. Focus is the global gold ring at
  4px offset.
- **Mobile:** buttons stretch to full width below 480px; a compact red Call button lives in the
  bar below 900px so the highest-value action is never hidden behind the burger.

### Chips (meat selector)
- **Style:** `surf-1` cells in a 1px-gapped grid, padding 1.2rem, Anton name at the 22px lead
  step in cream, sentence case, over a 12px/700 tracked-caps sublabel in `mute`.
- **State:** hover steps to `surf-3` with a white name; selected floods the whole cell to gold
  with ink type (9.89:1) and the sublabel in `on-gold-2` (5.47:1). Selection is driven by radio
  inputs and `:checked` — no JavaScript.
- **Focus:** cream ring inset by 3px so it stays inside the cell grid.
- **Grid:** 2 columns with the fifth chip spanning the row; 5 columns from 1020px.

### Cards / Containers
There are no cards. The board (`.board`) is the only panel: a lit slab with a gold gradient
hairline along its top edge, `surf-2 → surf-1 → ink` gradient body, `clamp(1.75rem, 4vw, 3rem)`
padding, and no border or radius. Everything else sits directly on the ground.

### Navigation
Sticky bar over an ink-to-transparent gradient that goes solid (`rgba(var(--ink-rgb),.96)`)
past 30px of scroll. Links are 12px/700 caps at 0.13em in `cream-2` with a gold underline that
scales in from the left on hover and stays on for the section in view. Below 900px the nav
becomes a full-width panel under the bar, opened by a burger that morphs to an X, with body
scroll locked and Escape to close.

### Photography (signature)
Every image sits inside `.shot`: a panel painted with a gold radial from the top-left, a red
radial from the bottom-right, and a `surf-3 → surf-1 → ink` diagonal, with the neutral photo
drop shadow. The image is `object-fit: cover` and scales to 1.05 over 0.9s on card hover.
When an image fails to load, script.js adds `.is-missing` and hides the `<img>`, so the lit
panel becomes the picture instead of a broken-image icon.

### Embedded Map
The map iframe carries `background: var(--surf-1)` and `filter: saturate(.8) contrast(1.06)`.
The embed paints its own white tile, and until it loads — or wherever it is blocked — that
white would otherwise be the ground.

### The Board (signature)
The centrepiece. Five meat chips across the top; below them one shared grid cell holding five
panes of eight format cells each. A format cell is a 12px muted caps label over the availability
answer set in white sentence-case Anton, keyed by a white swatch in the legend; cells whose answer is unconfirmed use the `.ask` variant
— `ink` ground, Archivo sentence case in `mute` — and a legend keys the two states. Only the
12px labels are caps inside the board; everything a person reads to make the choice is sentence
case.

### Named Rules
**The No Price Rule.** No per-item price renders anywhere inside `#menu`. No per-item price is
confirmed in any source, and inventing one is the failure mode this architecture exists to
prevent. `verify.mjs` asserts this on the rendered page; the hero's `$10–20 per person` range
is a sourced, non-item figure and lives outside the board.

**The Honest Cell Rule.** An unknown answer renders as the `.ask` cell, visibly different from a
confirmed one and keyed to the legend. Unknowns are never blanked, guessed, or dashed out.

**The Inversion Is The State Rule.** A selected cell states its selection by inverting its whole
field, not by growing an edge marker. A 3px gold stripe was built along the selected chip's top
edge and removed: a thin coloured rule on one edge of a panel is the side-tab tell, and the
field inversion already carries the state unambiguously. Do not rebuild it.

## Do's and Don'ts

### Do:
- **Do** sample any new colour from the owner's own photographs, opaque pixels only, and record
  its ratio against `surf-3` before adding it to the palette.
- **Do** compose every translucent colour from `--ink-rgb` / `--cream-rgb` / `--gold-rgb` /
  `--red-rgb` rather than writing channel numbers by hand.
- **Do** separate sections with a `.bay` light pool, positioned with its own `--lx` / `--ly`.
- **Do** keep every corner square (0 radius) and every edge a hairline gap or a fading gradient.
- **Do** send every type hover to white — nav link, chip name, footer link, Visit link — and
  keep gold for the hovers that are a surface: the nav underline, the fill button, the social
  button.
- **Do** put photography inside `.shot` so a failed load degrades to a lit panel, and give any
  third-party embed a `surf-1` backing so its own white never shows through.
- **Do** carry `.num` on every rendered figure so digits stay tabular.
- **Do** theme the browser's own surfaces from the palette: gold `::selection` on `ink`, a
  `surf-3`-on-`ink` scrollbar, a 2px gold focus ring at 4px offset, and 0.22em underline offset
  on non-button links. Keep the favicon and `<meta name="theme-color">` on the same three
  sampled values (`ink`, `gold`, `red`).
- **Do** hold new type to the six-step ramp (12 / 16 / 22 / 32 / 44 / 96 at 1280), and set a
  control's primary label at the lead step or above.
- **Do** declare grid columns whenever the item count is fixed and known.
- **Do** honour `prefers-reduced-motion`, which flattens every animation and transition to
  0.001ms and disables smooth scroll.

### Don't:
- **Don't** render a per-item price inside `#menu`. Nothing sources one.
- **Don't** set gold type anywhere at all — it is light and surface only, and the pairing
  that used to tempt this, gold on red, is 3.03:1. Don't set red type on ink either (3.32:1).
  Red is a ground, not a foreground.
- **Don't** wrap a section in a bordered card or lay a divider rule between sections; the light
  falloff is the separator and re-adding boxes undoes the whole architecture.
- **Don't** mark a selected state with an edge stripe or accent tab. Invert the field.
- **Don't** put a coloured glow under a photo or a panel, and don't use a hard offset shadow.
  Shadows are neutral black, blurred, and vertical.
- **Don't** add a scroll-reveal observer or a per-section fade-up. There is one authored moment
  — the hero light coming up on load (`lightUp`, 1900ms) with the hero text rising behind it on
  a 420–860ms stagger — and its value is that it is the only one.
- **Don't** set Anton in sentence case outside the board, and never use it for a paragraph.
  The board is the one place it goes sentence case, because it is a control.
- **Don't** put a tracked-caps kicker or eyebrow above a heading.
- **Don't** invert a section to a light ground.
- **Don't** reintroduce Fraunces — it was swapped out of this build as the obvious warm serif
  and the previous version of this site used it.
- **Don't** reintroduce the placeholder palette (`#100D0C` ground, `#F9C22E` gold, `#D8202A`
  red) or the `red-text` token. The shipped palette is measured off the owner's materials and
  supersedes the direction contract's provisional values.

<!--
Gate state, this pass. Both gates green, verified after this file was rewritten against the
shipped palette:

  node .claude/skills/impeccable/scripts/detect.mjs --json index.html   -> [] (not degraded)
  CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
    node verify.mjs http://localhost:8000                              -> PASSED, tightest
                                                                          contrast pair 5.02:1

The seven design-system-color advisories that preceded this rewrite were all the same class
of finding: the palette had been replaced in styles.css and this file still documented the
retired warm-charcoal values. They were cleared by documenting the shipped colours, not by
dismissing them.

The second command needs CHROME_PATH pointing at the chromium that ships in this
environment; without it Playwright looks for a headless shell that is not installed and the
run aborts. verify.mjs reads CHROME_PATH and passes it as executablePath. The same gate
passes against the packaged folder on port 8001.
-->
