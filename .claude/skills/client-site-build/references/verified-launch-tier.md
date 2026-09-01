# Verified Launch Tier ($799) — Build Process

Written 2026-08-31, from eight real builds in one building (Summer's Hub of Kennewick):
Golden Roll Sushi, Casa Rosita, La Casita, Tacos El Giro, Trejo's, Buriram Bites,
El Punto del Sabor and Lucky Bao. This is the repeatable process and the rules that came
out of real corrections — not theory. Read this before starting the next one.

The sibling document for the $3,000+ tier is `hand-built-tier.md`. Its copy and
photography rules apply here unchanged; this file does not repeat them.

Two skills are vendored into this repo at `.claude/skills/` and load automatically:
**`client-site-build`** (this process, as an operational sequence) and **`impeccable`**
(the design detector used in section 7). Neither needs installing; the detector needs
`npm install` once — see `.claude/skills/impeccable/NOTICE`.

**What ships:** one page — `index.html`, `styles.css`, sometimes `script.js` — plus images
and a favicon. No framework, no CMS, no build step. If you are reaching for a framework you
have misunderstood the tier.

---

## 0. Qualify before any research

Two minutes here saves an hour. Search the business name and check three things:

- Do they already have a **modern, current** site — not a thin aggregator page?
- Is there a `/franchise` or "open a location" page on it?
- Do they have locations in **other towns**?

**Disqualify only when a modern site AND multi-market are both true.** That combination
means there is nothing to sell and the buying decision is not local.

**An outdated site is a GOOD prospect, not a disqualifier.** They have already proven they
will pay for a website, and there is a concrete before/after to pitch. **A second local
location is not a disqualifier either** — a truck plus a storefront is still one local
operator.

Check the rating. Under ~3.5 stars is a food or service problem a website will not fix. Say
so plainly rather than selling into it.

---

## 1. Research — never invent anything

**A guessed price or a guessed opening time sends a real customer to a closed door.** This
is the rule the whole tier rests on.

### Sources, in order of trust

1. **Their own printed menu** — the board on the truck, a PDF behind their QR code, a photo
   on their listing. This beats everything. El Punto del Sabor's own menu was **~10%
   cheaper** than DoorDash and carried three dishes DoorDash did not list at all.
2. Their own website, Google Business Profile, Instagram, Facebook.
3. A delivery listing's JSON-LD — the full menu with merchant-set prices in one call.
4. **Directories — lowest trust.** Yelp, Yahoo and Roadtrippers syndicate one record, so
   three "sources" can be one source with one error. Yelp had Lucky Bao's street as
   "Sagitario Ave" instead of W Skagit, on an **unclaimed** listing.

### Delivery-platform JSON-LD

```js
[...document.querySelectorAll('script[type="application/ld+json"]')]
  .map(s => JSON.parse(s.textContent))
  .find(d => d['@type'] === 'Restaurant')
```

**`hasMenu.hasMenuSection` is sometimes an array wrapped in an array.** A normal recursive
walk returns zero items and looks like an empty menu. Flatten arrays as you recurse.

**Always check whether the store is switched on.** La Casita, Tacos El Giro and El Punto del
Sabor all had *inactive* DoorDash stores. If it is off, do not put an "Order online" button
on the site — "your ordering is switched off" is a better pitch line than a broken button.

### Rules that each cost a real mistake

- **A phone number needs two genuinely independent confirmations** before wiring
  click-to-call. Painted on the truck plus their Google listing is solid. Three directories
  syndicating Yelp is one source. If single-sourced, say so in `PRODUCT.md` and do not wire it.
- **An absence is a claim — prove it like one.** Buriram Bites shipped with no hours and a
  paragraph explaining why, because Google's *collapsed* panel showed only "Opens 11 AM."
  **The full week was one click away behind the disclosure arrow.** Expand every collapsed
  panel, every "see more", every truncated section before writing "not published."
- **Check whether an inherited note is about this vendor or the venue.** A Hub-level "hours
  not listed" says nothing about the truck parked inside it.
- **Check every photo against "People also search for."** Google's photo panel bleeds in
  images from neighbouring businesses. This has hit **every build** — one set was 5 of 13
  wrong, another 10 of 13. Download all, build a contact sheet, look at it.
- **Never upscale an image with dense small text.** AI upscalers have invented fake menu text
  on this account. Plain resampling is also suspect: if a menu-board crop is 150px wide
  natively, ship it at 150px and let CSS size it down, never up.
- **Check a PNG's alpha channel before sampling colours from it.** Lucky Bao's logo is **72%
  transparent**; flattening it to RGB made the palette's index-0 colour — a green — look like
  a brand colour, and a whole page section got built on it before the client said "they are
  orange and red, why is there green?" **Sample opaque pixels only.**
- **When two sources disagree, record the conflict and say which won and why.** Never
  silently pick one.

---

## 2. `PRODUCT.md` before any design

One file per build, in the site folder. It **never ships** — gitignore it with `work/` and
`photos_raw/`. Every fact carries its source.

Sections, in this order: identity · incumbent audit (redesign only) · hours (with an explicit
conflict resolution) · menu with prices and their source · reviews with the reviewer's name ·
brand colours with measured numbers · photography **including what was rejected and why** ·
**what the site must NOT claim** · the pitch (for the call, never the site) · confirm before
launch.

**Where a fact does not exist, the page says so.** "Ask at the window" beats a guess. A page
that is 30% honest gaps still beats five pages of nothing.

Write **"what the site must NOT claim" before building**, not after. Typical entries: no
hours beyond what is published, no gluten-free claim where there is a shared fryer, no
founding year or family story that is not published, nobody in a photo named or called the
owner.

---

## 3. Architecture — the cluster rule

**Every site gets a layout that comes from something structurally true about THAT business.**
Re-skinning one skeleton in new colours is not a bespoke site, and prospects in the same
market will compare. This rule exists because a build was caught doing exactly that:
*"this is exactly the same as the last one."*

Worked examples — read these before designing a new one:

| Build | The structural fact | The layout it produced |
|---|---|---|
| **La Casita** | A printed combo board | Numbered combo cards |
| **Tacos El Giro** | The menu is a matrix — 5 meats × 8 formats | An order counter: pick a meat, formats resolve |
| **Trejo's** | A long carta scattered across 5 pages | One long menu with a sticky section index |
| **Buriram Bites** | 11 of 12 entrées are $17.49 | **No price column at all** — price stated once, menu is a pure chooser |
| **El Punto del Sabor** | Their menu exists only behind a QR code | The page *is* the menu, dark ground mirroring their own sheet |
| **Lucky Bao** | Truck board = 8 clean dishes; online menu = 46 duplicated entries | Publish **the board** |
| **Golden Roll** | Three locations inside one venue | Tabbed locations |

**How to find it:** read the menu and the reviews and ask what is odd or specific about how
this business actually works. One price for everything. A free-toppings list. A dish nobody
else carries. 159 reviews when the neighbours have 11. That is the layout.

Record it as a **direction contract** — a comment block at the top of `styles.css` carrying
the architecture and where it came from, the palette with measured contrast numbers, and
**what NOT to change back, and why**. Update it whenever the direction changes, and **record
mistakes in it** — Lucky Bao's contract states in as many words that there is no green in the
brand and why someone might think there was.

---

## 4. Palette — sample it, then measure the pairing that ships

Sample **programmatically** from their real materials — logo, truck, signage. Not a palette
generator. Ignore greys and near-blacks when counting:

```python
h, s, v = colorsys.rgb_to_hsv(r/255, g/255, b/255)
if s < 0.35 or v < 0.2: continue
```

**Expect the brand colour to fail contrast.** It has on three of four builds:

| Build | Brand colour | White on it | Fix |
|---|---|---|---|
| Trejo's | orange `#D9601F` | **3.77:1** | darker cut |
| Buriram | chilli `#D9542B` | **4.00:1** | split into a fill cut and a text cut |
| El Punto | red `#E43030` | **4.41:1** | `#CD2B2B` at 5.28:1 |
| Lucky Bao | board red `#961E28` | 8.36 | none needed |

Solve it by sweeping a scale factor and taking the **lightest** value that clears the bar.
Do not eyeball it. Do not fix it by making everything near-black — one scrim "passed" at
14:1 by obliterating the photograph underneath it.

**Measure the pairing that actually ships.** Lucky Bao's gold was checked against white
(fine) and against ink (fine) and never against the **green field it was sitting on** —
eleven failures shipped. The number that matters is the one on screen.

**The ground is not cream.** Four builds were flagged for a cream/beige page background; it
is the most overused generated look there is. Pale lilac, near-neutral grey and dark grounds
have all worked. If you warm the ground, re-run the detector.

---

## 5. Type

Already used, so pick something else: **Fraunces, Petrona, Gabarito, Hanken Grotesk, Familjen
Grotesk, Karla, Chivo, Figtree, Bricolage, Zilla.**

Flagged as overused, avoid: **Instrument Sans, Playfair, Lora, Cormorant.** Fraunces was
swapped out of a shipped build for this reason — two separate design passes named it as the
obvious warm serif.

Five type sizes with **real gaps** between them. Six steps 1.09× apart reads as flat and the
detector will say so. Nothing functional below **11px** — an 11.2px label and a 9.28px
masthead line have both been caught.

---

## 6. Build order

1. `PRODUCT.md`
2. Architecture decision + direction contract
3. Images prepared at final size (never upscaled)
4. HTML structure
5. CSS
6. JS only if the architecture needs it
7. Verify (§7)
8. Package (§11)
9. Deploy — **only with an explicit go-ahead** (§12)

Serve locally with `python -m http.server PORT` and **keep the port stable for the whole
session** so a refresh always works.

---

## 7. Verification — the part that separates done from shipped

### Contrast, done properly

Three ways a hand-rolled checker lies:

1. **`querySelector` tests one instance.** A class used on two backgrounds gets checked once.
   **Walk every leaf element that has text** — 100–170 elements on these builds, not 20.
2. **It never sees `:hover`.** Three hover states once sat at 2.6:1 while every resting state
   passed. Check hovers separately.
3. **Alpha and gradients.** Composite every translucent ancestor. For text over a photograph,
   sample the actual image pixels under the text and composite the scrim — a
   background-colour check reports a meaningless number.

### The mechanical detector

The `impeccable` skill is vendored into this repo at `.claude/skills/impeccable/`, so it
travels with a clone. **Run `npm install` in that folder once per machine** — see
`.claude/skills/impeccable/NOTICE`.

```bash
node .claude/skills/impeccable/scripts/detect.mjs --json index.html
```

**If it prints `DEGRADED`, stop and run the install.** Degraded mode is not a warning you
can work around — it returns `[]`, and an empty result reads exactly like a clean pass.
Measured on a real build: **0 findings degraded, 5 findings with dependencies installed.**
On a larger file it was 7 versus 68.

**Verify its findings before fixing or dismissing them.** Two classes are consistent false
positives here — `cramped-padding` on full-bleed sections whose inner `.wrap` carries the
padding (measure it: 54–63px), and `clipped-overflow-container` from `body { overflow-x:
hidden }`. But it has caught real ones: an 11.2px label, an overused font, a cream ground, a
flat type ramp.

### Traps that produced false failures — do not be fooled twice

- **Lazy images report `naturalWidth === 0`** until scrolled into view. An "is it upscaled?"
  check fires on every lazy image on the page.
- **`aspect-ratio` is silently ignored** when `width`/`height` **attributes** are on the
  `<img>` — they map to CSS presentational hints so height stays definite. Every plate in a
  three-up row rendered at its natural height with ragged captions. Fix globally with
  `img { max-width: 100%; height: auto; display: block; }` and keep the attributes for layout
  reservation.
- **`scroll-behavior: smooth`** means a short `setTimeout` measures mid-animation.
- **Anchor offsets stack.** `scroll-padding-top` on `html` *and* `scroll-margin-top` on the
  target gives you both. Use one, sized to the sticky header.
- **`link.click()` on an anchor does not navigate** in this automation context; use
  `location.hash`.
- **Browser-pane screenshots lie.** Images that are loaded and correctly sized in the DOM
  render as white boxes; scroll positions do not hold. **Trust the DOM measurement**, and do
  the real visual check in a normal browser window.

### Every build, before calling it done

- Zero console errors
- No horizontal overflow at **1280 and 375** — emulate mobile, do not just narrow the window
- Every image resolves, none orphaned, **none upscaled** past its natural width
- Every in-page anchor resolves
- **Assert the architecture's invariant.** If the concept is "no price column," count the
  prices rendered and assert zero. If it is "no hours table," assert no `<table>`.

---

## 8. Redesign tier — audit the incumbent page by page

When they already have a site, **this is where the pitch comes from.** Fetch every page,
strip tags, and **count, don't estimate**.

```bash
curl -s -L "https://SITE/" -o raw_home.html
grep -oi "menufy\|secucred\|wix\|weebly\|squarespace\|toast" raw_home.html | sort | uniq -c
```

Look for: price symbols (a menu with zero prices is a finding), `©20xx` staleness, leaked
HTML entities, typos, self-contradictions across pages, and **what the site fails to
mention** — a second location, a truck, an award. Identify the platform from source: a
**rented storefront is a far stronger pitch than "your site is old."**

Real findings from real audits:

- **Lucky Bao's Google-listed website renders a blank white page** — 0 characters of text
  after 14 seconds, `<title>` reading "SecuCred", and `:store_seq` still in the URL as an
  unreplaced template placeholder.
- **Ann's Best has the identical bug on the same platform.** Two vendors, one broken setup.
- **Lucky Bao pays for two rented storefronts** on two domains, and Google points at the
  broken one.
- **Trejo's site never mentions their Hub truck** — the only address on it is the other location.
- **A menu of 46 items in one category called "MENU"**, zero descriptions, seven duplicate
  names at conflicting prices, and an item called "Soup Soup."

**Never attack the previous vendor.** "Your site hasn't kept up with how much you've grown"
lands; "you got ripped off" makes the owner defend a relationship they may still value.

---

## 9. Copy — write in the client's voice, not the agency's

**The trap:** `PRODUCT.md` is written *about* the business, and that register leaks onto the
page. El Punto del Sabor shipped a section reading *"Their words, not ours"* — meaningless on
their own site. Five lines were in agency voice, two in the client's, and the page could not
decide who was speaking.

Before shipping, grep your own copy for `their`, `they`, and any sentence describing the
business from outside. **On their site there is no "they."**

- **Check every "from $X" claim against the full price list.** A hero read "Everything from
  $7" when empanadas were $4.99 and drinks $1.00 — it made them look *more* expensive than
  they are, on a page whose whole argument was that a platform was inflating their prices.
- Present tense. The thing exists now.
- Say the category plainly at least once before using shorthand.
- Captions carry information, not labels.

---

## 10. Ordering and carts

**Never build card fields.** Payment is a processor's job — PCI, a merchant account, real
liability. The product is a **branded cart handing off to the client's own processor**: a
one-time fee, never a percentage of sales.

If you build an order builder:

- **The Add control BECOMES the quantity stepper, in the row.** Tap Add → it turns into
  `− 1 +` in place; the row marks itself; a running bar slides up. You never open a panel to
  change a quantity. This is how DoorDash, Chipotle, Toast and Deliveroo all work. A
  drawer-based first attempt was rejected on sight — three taps for a one-tap job, and no
  sign on the menu of what had already been chosen.
- **Do not animate the total.** An odometer count-up left overlapping `requestAnimationFrame`
  loops on rapid adds; the bar showed **$41.00** while the order was **$50.99**, then
  **$0.00** after a first attempt to fix it by cancelling frames. **A total that is wrong for
  one frame is worse than one that snaps.** Write the number directly; pulse the container in
  CSS if you want feedback.
- **Only items with a confirmed price are addable.** Where sources conflict, the row links to
  the phone. Never resolve a price conflict by picking one.
- Persist in `localStorage` wrapped in try/catch — private mode throws.
- Before promising to replace a rented ordering system, ask: **"When an online order comes in,
  how do you find out about it?"** If it routes to their hardware, that is the real switching
  cost — not the website.

---

## 11. Package

```bash
mkdir -p deploy && cp index.html styles.css script.js favicon.svg img-*.jpg deploy/
```

`deploy/` **excludes** `PRODUCT.md`, `work/` and `photos_raw/` — internal notes and the pitch
must never ship. Add a `.gitignore` for them.

**Re-verify against the packaged folder, not the source.** Serve `deploy/` on its own port and
confirm every asset returns 200.

---

## 12. Deploy — confirm before publishing

Publishing is outward-facing. **Get an explicit go-ahead**, every time.

1. **Add `noindex, nofollow`** with a comment saying when to remove it. These are pitch builds
   carrying unconfirmed hours and prices; a page ranking for a real business with wrong hours
   sends customers to a closed truck. It works perfectly as a link sent directly.
2. Upload the zip at `app.netlify.com/drop`. **The upload often succeeds even when the tool
   reports a timeout** — check the projects list before retrying.
3. **Rename** to the real slug. **Verify from the projects list, not the page title** — the
   title shows the slug you navigated to, so a failed rename looks successful.
4. **Set visibility to Public.** Netlify Drop sites are **Private by default and 401.** You
   will see the site fine while logged in; a customer gets an error page.
5. **Verify from the command line against the live URL** — every asset 200, plus grep the
   served HTML for something only the current build contains.

Steps 3 and 4 can be done in the same "Make public" dialog.

**Batch the deploys.** Each one costs credits. Test locally; deploy once.

---

## 13. Hand over the link — every time, unprompted

After **every** build and every change: confirm the local server is actually up (`curl` it —
they get killed by stray process kills), open it in a real browser, and **put the URL in the
reply on its own line, near the top.**

Nobody can review work they cannot see. Being asked "where's the link?" means the work was not
finished.

---

## 14. Confirm before launch — what the owner gets

Every build ships with open questions. That is fine and honest; hiding them is not. Typical:

- **Hours.** The most common gap by far and the most damaging to guess.
- Any price where the sources disagreed.
- Permission to use their photos.
- Anything a review implied that is not published — a second location, a dietary claim.
- Whether a broken listing (blank site, wrong name, wrong address) should be fixed while you
  are in there. Usually free and takes ten minutes.

Nothing is a real launch until the owner confirms these and the `noindex` comes off.

---

## 15. Session cost

Research and image work are the expensive parts. Split builds across sessions rather than
running one enormous one, and use `/clear` between phases — it keeps the files and drops the
conversation.

---

## Reference builds

Read the `PRODUCT.md` and the `styles.css` direction contract in each before starting:

```
demo-sites/generated/buriram-bites/       one-price chooser; contrast solved by sweep
demo-sites/generated/el-punto-del-sabor/  dark ground; menu-behind-a-QR-code
demo-sites/generated/lucky-bao/           redesign audit; order builder
demo-sites/generated/trejos/              long menu; sticky section index
demo-sites/generated/tacos-el-giro/       matrix menu as an order counter
```
