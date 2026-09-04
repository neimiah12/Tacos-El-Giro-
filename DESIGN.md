---
name: Tacos El Giro
description: A night-lit food truck page — the truck's own cobalt as the ground, one gold aperture, and an order window that answers when you pick a meat.
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
  quote:
    fontFamily: "Anton, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.34
    letterSpacing: "0.005em"
  board-title:
    fontFamily: "'Archivo Black', 'Archivo', 'Arial Black', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  control:
    fontFamily: "'Archivo Black', 'Archivo', 'Arial Black', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  answer:
    fontFamily: "'Archivo Black', 'Archivo', 'Arial Black', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.015em"
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
  spanish:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  action:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.65
    letterSpacing: "0.08em"
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
  control-gap: "3px"
  chip: "1.15rem 1.2rem 1.25rem"
  gutter: "clamp(1.25rem, 5vw, 3.5rem)"
  board: "clamp(1.75rem, 4vw, 3rem)"
  bay: "clamp(4.5rem, 10vw, 9rem)"
components:
  button-fill:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "1.05rem 2rem"
  button-fill-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.action}"
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
  named-item:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.answer}"
    rounded: "{rounded.none}"
    width: "min(100%, 200px)"
  named-item-label:
    textColor: "{colors.mute}"
    typography: "{typography.label}"
  ask-line:
    backgroundColor: "transparent"
    textColor: "{colors.cream-2}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
  spanish-line:
    backgroundColor: "transparent"
    textColor: "{colors.cream-2}"
    typography: "{typography.spanish}"
    rounded: "{rounded.none}"
    width: "44ch"
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
owner's own logo rather than a brand kit. Type is signage first: condensed Anton in caps at
the sizes a hand-painted sign uses, Archivo doing all the reading work underneath it, and —
inside the order window only — a third face, wide and flat-sided, that makes the board read
as a painted object rather than as more page.

The page is bilingual in the owner's own shape, not localised: an English line with the Spanish
set in italic underneath it. Every marketing graphic the truck has made talks this way — COME
HUNGRY. LEAVE HAPPY. over VEN CON HAMBRE. VETE FELIZ. — so the page does too. There is no
language switcher and no second page; the second language is a voice, and italic is what marks
it.

Its anti-reference is the restaurant template: bordered tiles, an icon-heading-text row of
"features", a metric strip under the hero, a fade-up on every section. This build refuses
all four. It also refuses the spreadsheet: the menu was once a 5×8 matrix of forty identical
cells, thirty-one of which said the same thing, and that is now an exchange — pick a meat,
the window answers. Where the direction contract named provisional hex values for gold
(`#F9C22E`) and red (`#D8202A`), the shipped build supersedes them with values measured off
the owner's materials; the contract's *intent* held, its placeholder numbers did not.

**Key Characteristics:**
- A cobalt ground sampled from the truck body, in four darkened steps, never a neutral grey
- One gold aperture as the only light source, plus red reserved for actions
- Zero radius everywhere; edges are hairline gaps and fading gradients, never boxes
- Signage-scale condensed caps over a small, tightly-tracked label voice
- One extra face, confined to the order window, because the board is an object and not prose
- Exactly one authored motion moment: the service light coming up on load
- An English line with its Spanish set in italic underneath it, everywhere a heading lands
- Three ornaments, one technique — craft geometry as a CSS mask, painted only in palette tokens:
  papel picado on the board's edge, a cenefa on the footer's, an azulejo field under everything
- Cultural weight lives in the backgrounds only; nothing is added on top of anything a person reads
- No per-item price renders anywhere, because none is sourced

## Colors

A single cobalt family lifted off the truck's own paint, lit by two accents lifted off the
owner's logo — the palette is photographic in origin, not chosen.

### Primary
- **Aperture Gold** (`gold`): the light, and only the light. It is a surface, an edge or a
  glow — never a letterform. The board's top hairline, the hairline over every named format,
  the claim dividers, the note rule, the nav underline, the `.bay` light pools, `::selection`,
  the focus ring, the fill button and social button on hover, and the field a meat chip floods
  to when it is selected. It carried type in an earlier revision — the hero's second line,
  heading emphasis, the board's answers, the Visit and footer labels — and all of that is
  white now. Ink on gold measures 9.89:1. Its one surviving foreground use is the five review
  stars, which are filled SVG shapes, not letterforms; a gold star is a convention worth
  keeping and it is the recorded exception.
- **Signage White** (`white`): the emphasis voice, and the only thing that outranks cream.
  The hero's second line, the `em` inside every section heading, the wordmark's second word,
  every named product name on the board, the claim figures, the section labels in Visit and
  the footer, the dish links, and hover for every link and chip name. 13.19:1 at its worst
  surface (`surf-3`), 19.03:1 on the ground. It is not an invention: the display type and the
  logo outline in `img/promo-nortenos.jpg` are white, the same file gold and red came off.

### Secondary
- **Signage Red** (`red`): the verb. Filled buttons (Call, the skip link), and nothing else.
  It never carries type on a dark ground and it never decorates. Cream on red measures
  5.02:1 — the tightest pairing that ships.

### Neutral
- **Truck Shadow** (`ink`): the page ground, the bottom of the board gradient, the scrollbar
  track, and the text colour that sits on gold. This is the truck body read in shadow.
- **Slab** (`surf-1`): the resting meat chip, the map's own backing, and the middle of the
  board gradient.
- **Board** (`surf-2`): the top of the board gradient — the only place it appears alone.
- **Lit Slab** (`surf-3`): the chip on hover, the scrollbar thumb, and the top of the `.shot`
  panel gradient. The lightest surface any text lands on, so it is the surface every ratio
  below was swept against.
- **Fresh Tortilla** (`cream`): headings, the board's title, the hero paragraph's emphasis,
  chip names at rest, dish names, quotes, gallery captions, and the address block. 11.35:1.
- **Warm Paper** (`cream-2`): body copy, ledes, the board's "ask at the window" line, nav
  links at rest, footer links. 8.18:1.
- **Comal Ash** (`mute`): subordinate text — descriptors, captions, the board's 12px field
  labels, the disclaimer. 5.50:1, the floor of the neutral ramp.
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
surface only), cream-on-red 5.02, ink-on-gold 9.89, on-gold-2-on-gold 5.47. White also
measures 19.03:1 on `ink`; where a stylesheet comment and this file disagree, this file is
the authority. A new colour joins the palette only with its worst-surface number recorded here.

Since the azulejo field went in, the surfaces are not the only ground. Where a tile stroke lands
behind text the true ground is the field's cream overlay composited onto `ink`, which measures
`rgb(21,26,50)`. The recorded minima on that tiled ground are cream 14.74, cream-2 10.62, mute
7.15, white 17.13 — mute is the floor, and it is the number `verify.mjs` reports on every run.
Both sets of numbers are the standing record; a change to the field's opacity changes the second
set and has to be re-measured, not estimated.

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
field — the selected chip is the one large fill it is allowed, and the hairline over each
named format is the one edge it draws inside the board. It sets no type at all, not a
heading, not a label, not a link, not a hover. Anywhere emphasis used to be gold it is now
`white`. The only gold foreground that ships is the review stars, which are icons rather than
letters. This is the tightening of the older One Aperture Rule, which allowed gold to label:
that allowance is withdrawn, and gold type is not to be reintroduced.

**The No Light Section Rule.** No section inverts to a light background. Contrast comes from
the tonal ramp and from photography, never from flipping the ground.

## Typography

**Display Font:** Anton (with Haettenschweiler, Arial Narrow Bold, sans-serif)
**Body Font:** Archivo (with the system UI stack)
**Board Font:** Archivo Black (with Archivo, Arial Black, Helvetica Neue, sans-serif)

**Character:** A hand-painted menu board over a clean utilitarian sign shop. Anton is
condensed and heavy and always in caps — it is the page talking. Archivo is neutral, legible
at small sizes, and does every job that involves reading a sentence. Archivo Black is the
board's own voice: wide, flat-sided, sentence case, the shape of paint on a panel, and the
same superfamily as the body copy, so the order window reads as a distinct object rather than
as a bolted-on display font.

All three faces are self-hosted woff2 with `font-display: swap`, split latin / latin-ext by
`unicode-range`. Anton and Archivo are preloaded; Archivo Black (18.6 KB + 14.3 KB) is
deliberately **not**, because the board sits below the fold and its own first fallback,
Archivo, is already loaded — the swap is nearly invisible.

### Hierarchy
- **Display** (Anton 400, `clamp(2.75rem, 0.9rem + 7.4vw, 6rem)` → 96px, 0.88, -0.02em caps):
  the hero headline only. One per page.
- **Headline** (Anton 400, `clamp(2rem, 1.3rem + 2.4vw, 2.75rem)` → 44px, 0.96, -0.005em
  caps): section headings.
- **Board Title** (Archivo Black 400, same 44px head step, 1.05, -0.02em, sentence case, in
  cream): the order window's own heading. The only 44px type on the page that is not Anton.
- **Stat** (Anton 400, `clamp(1.75rem, 1.2rem + 1.7vw, 2rem)` → 32px, 1.0, -0.01em caps): the
  three claim figures in About.
- **Title** (Anton 400, 22px lead step, 1.05, 0.01em caps): dish names; the wordmark at
  1/0.005em.
- **Control** (Archivo Black 400, 22px lead step, 1.15, -0.015em, sentence case): the five
  meat names on the chips.
- **Answer** (Archivo Black 400, 22px lead step, 1.2, -0.015em, sentence case, in white): the
  product names the truck can put on the board.
- **Quote** (Anton 400, 22px lead step, 1.34, 0.005em, sentence case): the three review
  pull-quotes. Anton at reading rhythm — quoted speech is not set in caps.
- **Lead** (Archivo 400, 22px lead step, 1.55): the hero paragraph, section ledes, the board's
  answer headline (in cream, capped at 44ch), and the Visit rows.
- **Body** (Archivo 400, 16px, 1.65): all paragraph copy and the board's "ask at the window"
  line at 1.8, capped at 34–68ch depending on context.
- **Spanish** (Archivo 400 italic, 16px, 1.6, in `cream-2`, capped at 44ch): the Spanish line
  that sits under a heading. Under a section `h2` it takes a 0.9rem top margin; under the
  board's title it tightens to 0.6rem and drops its measure cap so it stays with the control.
- **Action** (Archivo 700, 16px, 0.08em caps): button labels. A button's label is body-sized,
  not label-sized.
- **Label** (Archivo 700, 12px, 0.10–0.18em caps): nav links, hero meta, chip sublabels, the
  board's format labels, gallery captions, Visit row labels, footer headings.

### Named Rules
**The Six Steps Rule.** The ramp is 12 / 16 / 22 / 32 / 44 / 96 at 1280 and nothing else
renders. Every size is one of `--t-label`, `--t-body`, `--t-lead`, `--t-stat`, `--t-head`,
`--t-display`; new type picks a step rather than adding one. A third typeface did not add a
step — Archivo Black entered at 44 and 22, both already on the ramp.

**The Board Has Its Own Face Rule.** `--board` (Archivo Black) is allowed inside the order
window and nowhere else on the page. It sets exactly three things: the board title at the
44px head step, the meat names on the chips, and the named product answers — both at the 22px
lead step. It is not a fourth voice, it is the board's material: Anton is condensed and
editorial and is the page talking, where a painted board is wide and flat-sided. Introducing
`--board` on a heading, a paragraph, a button or a nav link would turn a material into a
decoration, and is not permitted.

**The Anton Is The Page's Caps Voice Rule.** Anton is set uppercase everywhere it carries the
page's editorial voice — hero, section headings, claim figures, dish names, the wordmark — at
0.88–1.05 line-height with letter-spacing between -0.02em and +0.01em. The one place it is not
caps is the review pull-quotes, which are transcribed speech at 1.34; caps would shout them.
Anton never sets a paragraph, and Anton no longer appears anywhere inside the board. The
sentence-case decision the board won still holds under its new face: nothing in the board is
uppercase except the 12px Archivo 700 field labels. A control is not writing, and sentence
case returns the word shapes that make it scan faster than the prose around it.

**The Readable Control Rule.** The meat names and the named answers are the entire point of
the order window, so both sit at the lead step (22px desktop, 19px mobile), never at body.
A control's primary label does not sit below the lead step.

**The Bilingual Voice Rule.** English leads, Spanish follows, and Spanish is always italic.
Under a heading it is the `.es` line — body size, `cream-2`, 44ch, sitting *under* the heading
it belongs to, never above it, because a line above a heading is a kicker and this system does
not ship kickers. Inside a 12px tracked-caps label the Spanish half drops out of caps into the
same italic at weight 400 and 85% opacity, so a Visit row reads "ADDRESS · dirección" rather
than as one long shout. And where the Spanish would push a tracked-caps label past readable
length it moves outside the label entirely: the board's ask line sets "Ask at the window" in
caps and lets an italic `mute` "Pregunta en la ventana:" lead the format list beneath it,
because "ASK AT THE WINDOW · PREGUNTA EN LA VENTANA" is a 42-character all-caps run — a
detector finding, and a readability problem before it is a style one. Two languages never both
sit inside one tracked-caps label. Inside a sentence the same italic works as an inline gloss —
the Visit price row runs "Per-item prices are up at the window · *los precios están en la
ventana*" through `.row p i`, `mute` against the row's cream, so the gloss reads as the second
language rather than as a second sentence. Every Spanish fragment carries `lang="es"`.

**The Tabular Numerals Rule.** Any rendered figure — rating, review count, price range —
carries `.num` for `font-variant-numeric: tabular-nums`.

## Layout

A single centred column: `--wrap` 1180px max, inline padding `--gutter`
(`clamp(1.25rem, 5vw, 3.5rem)`). Every section is a `.bay` with vertical padding `--bay`
(`clamp(4.5rem, 10vw, 9rem)`) — that generous block padding is the separator, since nothing is
boxed.

Breakpoints in use: 380px (hide the phone-button label), 480px (buttons go full width), 520px
(gallery to 2 columns), 620px (dish photos switch from 3:2 to 4:5), 900px (the burger/desktop-nav
switch, the about and visit splits), 960px (gallery to the 4-column mosaic), 1020px (the meat
chips go from 2 columns to 5).

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
grid-column: 1`) and cross-fade on opacity plus visibility. Switching meats must never change
page height.

**The Declared Columns Rule.** A grid with a fixed, known item count declares its columns;
`auto-fit` is for counts that vary. Five chips under `auto-fit` left a dead cell at every
width where the row count did not divide five, so `.chips` is 2 columns with the fifth
spanning the row, and 5 columns from 1020px. The named-answer list is the one recorded
exception and is not a grid at all: its count changes per meat (4 / 1 / 1 / 1 / 2), and any
fixed column count orphans one of them — four items in three tracks leaves a widow, four
tracks cut "Carne Asada Tacos" (234px, the widest name) in half. It is a wrapping flex row
whose items are sized to their own words at `min-width: min(100%, 200px)`, so the rule
lengths come out ragged and read as tags rather than as a table. Content sizing is licensed
here by a measured failure, not by preference; anywhere the count is known, declare.

## Elevation & Depth

There is no elevation ladder. Depth is tonal: `ink` → `surf-1` → `surf-2` → `surf-3`, plus
gradients and 1px hairlines. The only shadows in the system are cast by photography and by
the filled button, and both are neutral black — never a coloured glow.

### Shadow Vocabulary
- **Photo drop** (`box-shadow: 0 24px 58px -30px rgba(0,0,0,.95)`): under every `.shot`. Lifts
  the picture off the ground. Removed when the shot is a full-bleed background (`.shot--fill`).
- **Action lift** (`0 12px 28px -16px rgba(0,0,0,.9)`, hover `0 18px 36px -16px rgba(0,0,0,.95)`):
  the filled button only, paired with a `-2px` translate.
- **Inset hairline** (`inset 0 0 0 1px rgba(var(--cream-rgb),.28)`): the ghost button; the
  social icons at `.2`. A one-pixel edge of light, not a border.

### Named Rules
**The Masked Ornament Rule.** Ornament in this system is one technique used a small number of
times, not a quota. Three instances ship: a 30px papel picado band across the board's top edge
(`.board::before`, repeating every 96px), a 20px cenefa — the tiled border strip — across the
footer's top edge (`.foot::before`, repeating every 44px, carrying the same eight-point estrella
as the field), and the azulejo field itself (see below). An earlier revision of this file capped
the page at exactly one ornament; that ceiling is superseded deliberately, and the replacement is
a principle rather than a number, because a count says nothing about whether a fourth would be
right.

Four conditions define the technique, and all four are load-bearing. The shape is craft geometry
expressed as an inline SVG `mask-image`, never a picture or an image asset — the drawing is the
mask, so nothing about it can be a foreign object dropped onto the page. The colour is supplied
by a palette token (`--gold` / `--cream`, via the channel tokens where translucent), so an
ornament can never introduce a colour and can never drift out of the palette. The placement is
either a structural edge the layout already had — the board's top edge, the footer's top edge —
or a ground field beneath everything; ornament is never free-floating and never sits on top of
content, which is why this pass added cultural weight to the backgrounds only and restyled
nothing a person reads. And the shape must be geometry the world itself owns: papel picado,
cenefa and azulejo are the taqueria's own materials, not applied ethnic decoration.

A fourth ornament is permitted only if it meets all four conditions and there is a structural
edge or ground already waiting for it. Wanting more texture is not one of the conditions. If no
such edge exists, the correct outcome is to decline, not to invent an edge to hang something on.

**The Azulejo Field Rule.** One fixed, full-viewport layer at `z-index: -1` (`body::before`)
paints `--cream` at 5.5% opacity through a repeating 80×80 talavera lattice — a diamond grid with
an eight-point estrella at each node and dots at the edge midpoints. It runs under the entire
page including the hero, where it emerges out of the photograph's own falloff rather than being
laid over it.

It is not an applied theme. Talavera Poblana is cobalt on white, and the cobalt this whole site is
built from was sampled off the truck's own paint; the motif belongs to this palette by ancestry,
which is why it can be drawn in the palette's own cream and read as native. At 5.5% it is texture
before it is pattern — the ground feels tiled well before a star is legible as a star. That
opacity is a ceiling, not a preference: raise it and the field starts competing with the
photography and with the light pools that separate the sections.

It is one fixed layer rather than a per-section background for a structural reason. A pattern
attached per section restarts its own phase at every section boundary, so every seam between two
sections shows a visible break in the lattice. One fixed layer has no seams to break, and it also
means scrolling moves the content across a stationary ground rather than dragging the pattern
along with it.

**The Overlay Is A Ground Rule.** A fixed decorative layer under the page is invisible to a
contrast walk: `body::before` is an ancestor of nothing, so a compositing check that climbs the
DOM composites straight past it and measures text against `--ink` that actually sits on a lighter
ground. `verify.mjs` closes this by reading the overlay's own computed background colour and
opacity, compositing them onto the body ground, and measuring `--cream`, `--cream-2`, `--mute`
and `--white` against the result, failing the run if any falls below 4.5:1. It currently reports
the field lifting the ground to `rgb(21,26,50)` with `--mute` tightest at 7.15:1. The failure
path was exercised rather than assumed — at 0.55 the same check fails `--mute` at 1.45:1. Any
future full-page overlay is measured this way before it ships; a layer that does not compose into
some element's background still composes into what the reader sees.

**The Neutral Shadow Rule.** Shadows are black and diffuse, and every shadow offset is soft
and vertical. A coloured glow, or a hard offset with no blur, is the tell of a template; the
warm light in this system comes from the gradients, never from a tinted or stamped shadow.

**The Hairline-Not-Border Rule.** Where an edge is genuinely needed it is a single 1px line
that means something: gold at 50% over each named format, cream at 14% above the "ask at the
window" line, and the claim separators. Two edges that were hairlines are now masked ornament
bands on the same structural line — the board's top edge and the footer's — and that is the only
sanctioned way a hairline grows. Never a full-perimeter 1px box, and never a grid of hairline gridlines standing
in for a table — the board shed forty cells' worth of those and separates by space instead.

## Shapes

Zero radius, everywhere. Buttons, chips, photos, panels and the map are all hard rectangles;
the only rounded things in the build are the scrollbar thumb, the 1px softening on the focus
ring, and the favicon's 10px plate. The recurring silhouette is a block of type with a
hairline above it, left-aligned and flush: that is the named answer, the ask line, the claim
figure and the footer column, all the same object at different scales.

Photo aspect ratios are fixed and few: 4:5 for portrait dishes and the about shot, 3:2 for
dishes on narrow screens, 4:3 for gallery and visit tiles.

## Components

### Buttons
- **Shape:** hard rectangle (0 radius), inline-flex with a 0.6rem gap for its inline SVG icon
  (17×17, `currentColor`, 2.4px stroke).
- **Primary (fill):** red ground, cream label (5.02:1), 16px/700 caps at 0.08em, padding
  1.05rem 2rem, with the action-lift shadow.
- **Ghost:** transparent with an inset cream hairline; inverts to solid cream on `ink` on hover.
- **Hover / Focus:** every button rises 2px over 0.35s on `cubic-bezier(0.16, 1, 0.3, 1)` and
  the fill variant crosses from red to gold with ink type. Focus is the global gold ring at
  4px offset.
- **Mobile:** buttons stretch to full width below 480px; a compact red Call button lives in the
  bar below 900px so the highest-value action is never hidden behind the burger.

### Chips (meat selector)
- **Style:** five `surf-1` fields separated by real 3px gaps — buttons, not a table row —
  padding 1.15rem 1.2rem 1.25rem, an Archivo Black name at the 22px lead step in cream,
  sentence case, over a 12px/700 tracked-caps sublabel in `mute`.
- **State:** hover steps to `surf-3` with a white name; selected floods the whole field to gold
  with ink type (9.89:1) and the sublabel in `on-gold-2` (5.47:1). Selection is driven by radio
  inputs and `:checked` — no JavaScript.
- **Focus:** cream ring inset by 3px so it stays inside the field.
- **Grid:** 2 declared columns with the fifth chip spanning the row; 5 columns from 1020px.

### Cards / Containers
There are no cards. The board (`.board`) is the only panel: a lit slab with the gold papel
picado band along its top edge (see The Masked Ornament Rule), a `surf-2 → surf-1 → ink` gradient body under a gold radial from
above, `clamp(1.75rem, 4vw, 3rem)` padding, and no border or radius. Everything else sits
directly on the ground.

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

### The Order Window (signature)
The centrepiece, and the thing the whole page is built around. Five meat chips across the top;
below them one shared cell holding five panes, each pane the truck's answer to one meat:

1. **The answer headline** (`.pane__n`) — lead-step Archivo in cream, 1.5, capped at 44ch,
   at the top of the pane, saying in a sentence how far this meat goes ("Birria goes four ways
   we can name.").
2. **What can be named** (`.named`) — a wrapping row of content-sized items, each a gold
   hairline over a 12px tracked-caps format label in `mute` over the product name in white
   Archivo Black at the lead step. Counts run 4 / 1 / 1 / 1 / 2 across the five meats.
3. **What to ask about** (`.pane__a`) — said once, not repeated: a cream hairline, a 12px
   tracked-caps "Ask at the window" label, an italic `mute` "Pregunta en la ventana:" outside
   that label, and the remaining formats on a single middot-separated line in `cream-2`.

All eight formats are accounted for on every pane; they are grouped by answer rather than
laid out as a spreadsheet. Only the 12px Archivo labels are uppercase inside the board.

### Named Rules
**The No Price Rule.** No per-item price renders anywhere inside `#menu`. No per-item price is
confirmed in any source, and inventing one is the failure mode this architecture exists to
prevent. `verify.mjs` asserts this on the rendered page; the hero's `$10–20 per person` range
is a sourced, non-item figure and lives outside the board.

**The Say The Unknown Once Rule.** What the truck cannot confirm is stated plainly, exactly
once per meat, under its own "Ask at the window" label — never blanked, never guessed, never
dashed out, and never repeated cell by cell. The previous board said "Ask at the window"
thirty-one times in forty cells; repeating an unknown does not make it more honest, it makes
the honest part of the page look like the whole page. Any future unknown joins that one line.

**The Grouped By Answer Rule.** The board's job is to model the exchange at the window: one
question (which meat), then what can be named and what to ask about. New information joins one
of those two groups. Do not re-render the meat × format matrix as a grid of cells; the matrix
is the data model, not the layout.

**The Inversion Is The State Rule.** A selected field states its selection by inverting
entirely, not by growing an edge marker. A 3px gold stripe was built along the selected chip's
top edge and removed: a thin coloured rule on one edge of a panel is the side-tab tell, and the
field inversion already carries the state unambiguously. Do not rebuild it.

## Do's and Don'ts

### Do:
- **Do** sample any new colour from the owner's own photographs, opaque pixels only, and record
  its ratio against `surf-3` before adding it to the palette.
- **Do** compose every translucent colour from `--ink-rgb` / `--cream-rgb` / `--gold-rgb` /
  `--red-rgb` rather than writing channel numbers by hand.
- **Do** separate sections with a `.bay` light pool, positioned with its own `--lx` / `--ly`.
- **Do** keep every corner square (0 radius) and every edge a single meaningful hairline or a
  fading gradient.
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
- **Do** keep `--board` inside the order window, on the three things it already sets, and
  self-host any new face as woff2 with `font-display: swap` and a `unicode-range` split.
- **Do** declare grid columns whenever the item count is fixed and known.
- **Do** set every Spanish line in italic and place it under the English it follows — `.es`
  under a heading, an italic non-caps `<i>` inside a tracked-caps label, and outside the label
  where the pair would otherwise run past ~40 characters of caps. Mark it `lang="es"`.
- **Do** write food words in Mexican Spanish as the truck says them: "consomé", not the French
  "consommé"; "Pollo" as the chip name with "Chicken" as its 12px gloss, matching the four meat
  names that were already Spanish.
- **Do** scope a label's `display: block` with the child combinator (`.row > span`,
  `.pane__a > span`) so it cannot reach a nested element inside the label.
- **Do** honour `prefers-reduced-motion`, which flattens every animation and transition to
  0.001ms and disables smooth scroll.

### Don't:
- **Don't** render a per-item price inside `#menu`. Nothing sources one.
- **Don't** set gold type anywhere at all — it is light and surface only, and the pairing
  that used to tempt this, gold on red, is 3.03:1. Don't set red type on ink either (3.32:1).
  Red is a ground, not a foreground.
- **Don't** wrap a section in a bordered card or lay a divider rule between sections; the light
  falloff is the separator and re-adding boxes undoes the whole architecture.
- **Don't** rebuild the board as a cell grid, and don't let 1px gridlines stand in for gaps
  anywhere. Space separates; a hairline only appears where it labels something.
- **Don't** mark a selected state with an edge stripe or accent tab. Invert the field.
- **Don't** put a coloured glow under a photo or a panel, and don't use a hard offset shadow.
  Shadows are neutral black, blurred, and vertical.
- **Don't** add a scroll-reveal observer or a per-section fade-up. There is one authored moment
  — the hero light coming up on load (`lightUp`, 1900ms) with the hero text rising behind it on
  a 420–860ms stagger — and its value is that it is the only one.
- **Don't** set Anton in sentence case for an editorial heading, never use it for a paragraph,
  and don't put it back inside the board. Its one sentence-case use is the review pull-quotes,
  because they are transcribed speech.
- **Don't** use `--board` outside the order window, and don't preload it — it is below the
  fold and swaps to its own superfamily.
- **Don't** put a tracked-caps kicker or eyebrow above a heading. The 12px tracked-caps label
  is permitted only as the key half of a key/value pair inside a control or a data row (the
  board's format labels, the Visit rows, chip sublabels), where it names the value beneath it.
- **Don't** add an ornament that fails any of the four conditions: masked craft geometry the
  world itself owns, coloured only from a palette token, hung on a structural edge the layout
  already has or laid as a ground beneath everything, and never on top of content. Three ship;
  the right answer to a fourth is often to decline. A picture, a garland, an image asset, or a
  new colour arriving with an ornament is a rebuild, not an addition.
- **Don't** raise the azulejo field above 0.055 opacity, and don't reattach it per section. The
  opacity is a measured ceiling and the single fixed layer is what keeps the lattice in phase
  across every section seam.
- **Don't** ship a fixed decorative overlay without running it through the gate's overlay
  compositing check. The contrast walk cannot see a layer that is nobody's ancestor.
- **Don't** put the Spanish half inside a tracked-caps label when the pair would exceed roughly
  forty characters of caps; move it outside the label as the board's ask line does.
- **Don't** style a label with a descendant selector. `.row span` and `.pane__a span` each hit
  the nested Spanish `<i>`/`<span>` and broke every label onto two lines the moment the label
  gained a child.
- **Don't** borrow a layout class for prose. The footer tagline used `.foot__l`, which is
  `display: grid`; the moment it held an element rather than bare text the grid split it into
  rows. It has its own `.foot__p` now. A label or prose class earns its own selector.
- **Don't** invert a section to a light ground.
- **Don't** reintroduce Fraunces — it was swapped out of this build as the obvious warm serif
  and the previous version of this site used it.
- **Don't** reintroduce the placeholder palette (`#100D0C` ground, `#F9C22E` gold, `#D8202A`
  red) or the `red-text` token. The shipped palette is measured off the owner's materials and
  supersedes the direction contract's provisional values.

<!--
Gate state, this pass. Both gates green, verified after this file and the sidecar were brought
back in sync with the azulejo field and the cenefa band:

  npm run verify:design                                                 -> 0 findings (not degraded)
  CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
    node verify.mjs http://localhost:8000                              -> PASSED, tightest
                                                                          contrast pair 5.02:1,
                                                                          ramp 12/16/22/32/44/96,
                                                                          azulejo field at 0.055
                                                                          lifts the ground to
                                                                          rgb(21,26,50), tightest
                                                                          text on it --mute 7.15:1

What this pass changed and why. Cultural weight was added to the BACKGROUNDS only: an azulejo
field under the whole page (`body::before`, fixed, z-index -1, --cream at 5.5% through an 80x80
talavera lattice) and a cenefa band replacing the footer's 1px cream hairline (`.foot::before`,
20px, a 44x20 strip carrying the field's own estrella, painted gold->cream->transparent). No
content moved, no section was restyled, and nothing was laid on top of anything a person reads;
that restraint is recorded in The Masked Ornament Rule as a placement condition, not as a note.

The Masked Ornament Rule was rewritten from a count into a family rule. The previous version said
"exactly one ornament"; that ceiling is superseded deliberately at the client's direction, and the
replacement fixes the four conditions (masked craft geometry the world owns, palette-token colour,
structural edge or ground field, never over content) so a future pass can add a fourth correctly
or decline to. The specific SVG path data and tile geometry are deliberately NOT in the token
layer: the durable things are the technique, the placement rule and the measured opacity ceiling,
not that particular lattice drawing.

verify.mjs gained a real check and it is recorded as The Overlay Is A Ground Rule. `body::before`
is fixed and an ancestor of nothing, so the §7 contrast walk composites straight past it; the gate
now reads the overlay's own computed background colour and opacity, composites them onto the body
ground, and measures --cream, --cream-2, --mute and --white against the result, failing below
4.5:1. The failure path was exercised, not assumed: raised to 0.55 the same check fails --mute at
1.45:1. Measured minima on the tiled ground rgb(21,26,50) are cream 14.74, cream-2 10.62, mute
7.15, white 17.13, and they now sit beside the surface minima in The Measured Against The Worst
Surface Rule.

Contrast numbers are swept against `surf-3`, the worst surface, plus the tiled ground above.
Where a stylesheet comment and this file ever disagree, this file is the authority.

The verify.mjs command needs CHROME_PATH pointing at the chromium that ships in this
environment; without it Playwright looks for a headless shell that is not installed and the
run aborts. verify.mjs reads CHROME_PATH and passes it as executablePath. The same gate
passes against the packaged folder on port 8001.
-->
