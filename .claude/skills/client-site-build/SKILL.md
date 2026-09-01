---
name: client-site-build
description: The build process for every client website — local restaurants, trucks, venues and small businesses. Use whenever building, rebuilding, auditing or pitching a client site. Starts by determining which tier the build is in ($799 Verified Launch vs $3,000+ Hand-Built), then runs research-before-design, PRODUCT.md, the cluster rule for architecture, measured palette contrast, and the verification gate. Triggers on "build a site for", "remake the website", "client site", "pitch build", restaurant/truck/venue site work, or any mention of the tiers, PRODUCT.md, the direction contract, or the cluster rule.
---

# Client Site Build

Two tier documents govern every build. **Read the matching one in full before writing any
code** — they are the accumulated corrections from real builds, not theory.

- `references/verified-launch-tier.md` — the $799 tier. One page, no framework.
- `references/hand-built-tier.md` — the $3,000+ tier. Multi-page, deeper audit.

**The Hand-Built doc's copy (§4) and photography (§5) rules apply to BOTH tiers unchanged.**
The Verified Launch doc does not repeat them, so read §4 and §5 of the Hand-Built doc on every
build regardless of tier.

---

## Step 0 — Determine the tier. Always. Before anything else.

Do this before research, before design, before opening an editor. State the tier and the
evidence for it in the first reply, and record it at the top of `PRODUCT.md`. The tier decides
scope, page count, depth of audit, and what "done" means — getting it wrong wastes the build.

Work through these in order:

1. **Has the tier already been assigned?** Check `PRODUCT.md`, the reference-build list at the
   bottom of each tier doc, and anything the client has said. A build named in a tier doc's
   worked-examples table or reference-builds list **is** that tier — cite the line. Do not
   re-derive a tier that is already on record.
2. **Scope of the ask.** One page → Verified Launch. Multiple real pages with their own
   journeys (vendors, careers, events, menus per location) → Hand-Built.
3. **Is there an incumbent site to audit?** A page-by-page incumbent audit is the Hand-Built
   §0 workload and the thing the higher price buys. No incumbent, or a thin aggregator page
   only → Verified Launch.
4. **How many operations?** A single truck or counter → Verified Launch. A venue containing
   many vendors, or a business with several distinct audiences → Hand-Built.
5. **Forms, bookings, ordering.** Real routed forms or an order builder push toward Hand-Built.
   §10 of the Verified Launch doc still governs carts in either tier.

**When it is genuinely ambiguous, ask the client rather than guessing** — the tier is a price,
and picking it silently prices the job for them. Say which way you lean and why.

Then run §0 of the Verified Launch doc to **qualify** the prospect (modern site AND
multi-market = disqualify; an outdated site is a good prospect; under ~3.5 stars is a food
problem a website will not fix).

---

## The sequence, once the tier is set

1. **Qualify** — Verified Launch §0.
2. **Audit the incumbent** page by page if there is one — Hand-Built §0, Verified Launch §8.
   Count, don't estimate. Identify the platform from source. Never attack the previous vendor.
3. **Research** — Verified Launch §1. Sources in order of trust; their own printed menu beats
   everything. Never invent a price or an opening time. Expand every collapsed panel before
   writing "not published." Two independent confirmations before wiring click-to-call.
4. **`PRODUCT.md`** — Verified Launch §2. Every fact carries its source. Write **"what the site
   must NOT claim"** before building, not after. It never ships; gitignore it.
5. **Architecture** — Verified Launch §3, the cluster rule. The layout comes from something
   structurally true about *this* business. Re-skinning the last skeleton is the failure mode.
6. **Direction contract** — record it in **both** places: a comment block at the top of
   `styles.css` (Verified Launch §3) and an HTML comment at the top of `<body>` (Hand-Built §2).
   Carry the thesis, the palette with measured contrast numbers, what NOT to change back and
   why, and a revision log. Record mistakes in it.
7. **Palette** — Verified Launch §4. Sample programmatically from real materials, opaque pixels
   only. Expect the brand colour to fail contrast; solve by sweeping for the lightest passing
   value. **Measure the pairing that actually ships.** The ground is not cream.
8. **Type** — Verified Launch §5. Avoid the already-used and overused lists. Five sizes with
   real gaps. Nothing functional below 11px.
9. **Build** — Verified Launch §6 order. Watch the recurring CSS bugs in Hand-Built §6 *before*
   debugging: `min-width: 0`, `minmax(0, 1fr)`, `span:first-child + span`, the `0fr` accordion,
   multi-column collapse, `aspect-ratio` losing to width/height attributes.
10. **Copy** — Hand-Built §4 and Verified Launch §9. Full legal name in brand positions. Present
    tense. On their site there is no "they" — grep your own copy for it.
11. **Verify** — Verified Launch §7 and Hand-Built §7. Walk every leaf element for contrast, not
    a sample. Check hovers separately. Emulate a real mobile viewport. **Assert the
    architecture's invariant.** Trust the DOM over screenshots.
12. **Package** — Verified Launch §11. Re-verify against `deploy/`, not the source.
13. **Deploy** — Verified Launch §12. **Explicit go-ahead every time.** `noindex, nofollow` with
    a comment saying when to remove it. Batch deploys.
14. **Hand over the link** — Verified Launch §13. Unprompted, on its own line, near the top of
    the reply. Every build, every change.
15. **Confirm before launch** — Verified Launch §14. List the open questions for the owner.

---

## The rules most often broken

- **Never invent anything.** A guessed price or opening time sends a real customer to a closed
  door. Where a fact does not exist, the page says so.
- **The layout must come from this business.** Prospects in the same market compare sites.
- **Measure the pairing that ships**, not the colour against white.
- **An empty detector result and a broken detector look identical.** If it prints `DEGRADED`,
  stop and install.
- **Hand over the link.** Being asked "where's the link?" means the work was not finished.
