# Tacos El Giro — Restaurant Website

A fast, mobile-first marketing site for **Tacos El Giro**, an authentic Mexican
restaurant in Kennewick, Washington.

**Tacos El Giro** · 6481 W Skagit Ave, Kennewick, WA 99336 · (509) 282-0699
Dine-in · Takeout · Delivery · $10–20 per person · Rated 4.7 ★ (74 reviews)

---

## Running it

It's a static site — no build step, no dependencies.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploy by copying the repo to any static host (GitHub Pages, Netlify, Vercel,
Cloudflare Pages, or plain shared hosting).

## Project layout

```
index.html                    Single-page site, semantic sections + JSON-LD
assets/css/styles.css         Design tokens, layout, components, animations
assets/js/main.js             Sticky nav, hamburger menu, scroll reveal, scroll spy
assets/img/favicon.svg        Brand mark
scripts/images.tsv            The 18 site photos: name → source URL → target width
scripts/localize-images.sh    Downloads those photos into assets/img/ and repoints index.html
```

## Sections

Hero · About · Popular Menu (8 dishes) · Why Tacos El Giro (3 features) ·
Reviews · Gallery · Location + map · Final CTA · Footer

## Design system

All visual decisions live as CSS custom properties at the top of `styles.css`,
so the whole site can be re-themed from one block.

| Token | Value | Used for |
| --- | --- | --- |
| `--chile-700` | `#A31C10` | Primary brand red, buttons, accents |
| `--ember-500` | `#E9631B` | Warm orange, gradients, hover glow |
| `--amber-300` | `#F7B32B` | Stars, eyebrow text on dark |
| `--charcoal-900` | `#14100E` | Dark sections, header, footer |
| `--cream-50` | `#FFFBF4` | Page background, text on dark |

Type is **Fraunces** (display) + **Inter** (body), loaded from Google Fonts with
`display=swap`. Both have full local fallback stacks, so the layout is stable
even if the font request fails.

## Technical notes

- **Responsive** — fluid `clamp()` type scale and auto-fitting grids; verified
  with no horizontal overflow at 390px, 820px and 1440px.
- **Sticky nav** turns solid on scroll; a hamburger panel takes over at ≤960px
  and closes on link tap, Escape, or resize to desktop.
- **Mobile call bar** — a fixed Call / Directions bar slides up after the hero
  on phones, so the two conversion actions are always one tap away.
- **Animations** — entrance reveals via `IntersectionObserver`, CSS-only hover
  states, and a marquee strip. Everything collapses under
  `prefers-reduced-motion: reduce`, and content renders fully with JS disabled.
- **Accessibility** — skip link, labelled landmarks, `aria-expanded` on the menu
  toggle, visible focus rings, and descriptive `alt` text on every image.
- **Performance** — no frameworks and no JS dependencies (~4 KB of script).
  The hero image is preloaded with `fetchpriority="high"`; everything below the
  fold is `loading="lazy"` with `width`/`height` set to prevent layout shift.
- **SEO** — one `<h1>`, ordered headings, canonical URL, Open Graph and Twitter
  cards, and `Restaurant` JSON-LD carrying the address, phone, price range and
  the 4.7 / 74-review rating. Copy targets *Mexican restaurant Kennewick WA*,
  *best tacos in Kennewick*, *birria tacos Tri-Cities*, and
  *Mexican food Tri-Cities Washington*.

## Before you go live

1. **Localize the photography.** The images are currently hot-linked from the
   CDN they were produced on, because the environment this site was built in
   could not reach that host to download them. Serve them from your own domain:

   ```bash
   pip install Pillow
   ./scripts/localize-images.sh
   ```

   That downloads all 18, resizes and converts them to WebP in `assets/img/`,
   and rewrites `index.html` to point at the local copies.

   To use **real photos of the restaurant** instead — recommended — drop your
   own images into `assets/img/` using the names in `scripts/images.tsv`
   (`hero-birria-tacos.webp`, `menu-quesabirria.webp`, …) and run the same
   script, or just update the `src` attributes directly.

2. **Set the real domain.** `index.html` uses `https://tacoselgiro.com/` as a
   placeholder in the canonical link, `og:url` and the JSON-LD `url`. Replace it
   with the live domain. `og:image`, `twitter:image` and the JSON-LD `image`
   currently hold the CDN URL of the hero photo; after step 1 they need to become
   absolute URLs on your own domain, e.g.
   `https://your-domain.com/assets/img/hero-birria-tacos.webp` — social previews
   will not render from a relative path.

3. **Add opening hours.** No hours were available when this was built, so none
   are shown. When you have them, add an `openingHoursSpecification` block to
   the JSON-LD and a row to the info card in the Location section — hours are
   one of the most-searched details for a restaurant.

4. **Add prices if you want them.** Only the verified `$10–20 per person` range
   is shown. Each menu card has a commented-out
   `<span class="dish__price">` — uncomment it and fill in current prices.

5. **Confirm the map pin.** The Location section embeds Google Maps by address
   query. If the pin is off, replace the `iframe` `src` with the official embed
   code from the restaurant's Google Business Profile.

## Content accuracy

The three quotes in the Reviews section are **sample review highlights**, not
verbatim quotes from named reviewers — they're labelled as such on the page and
in a disclaimer beneath them. The 4.7-star / 74-review figure is the restaurant's
stated public rating. The food photography is illustrative and shows no people;
replace it with real photos of the restaurant's own dishes before launch.
