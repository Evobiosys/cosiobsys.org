# Plan: CosBioSys hero integration + footer refinements

## Context

Three archived draft hero designs for CosBioSys exist at
`/Users/personal/Documents/agents/4claude/DEVLOG/evobiosys-ai-org-2026-08-02/viz/COS-A.html`,
`COS-B.html`, `COS-C.html` (each footer-labelled "Option A/B/C · draft for
CosBioSys · 2026-08-02", never shipped). The user wants elements from all
three combined and integrated into the live `cosbiosys.org` homepage:

- **Text** from COS-B: the eyebrow "CosBioSys · sister holon of EvoBioSys",
  h1 "Rooted here. Reaching everywhere.", the essence paragraph, the
  Local/Global section copy, and the closing line "Local roots, global
  reach: one living guild."
- **Visual and subtext** from COS-A: the animated sprout/roots SVG (stem,
  leaves, roots below a soil line, glowing distant nodes reached by
  mycelial threads), and the two-panel "Rooted locally / Connected
  globally" duo section with its glyph icons and captions.
- **Visual** from COS-C: the circular "stage" SVG (branching pattern that
  blends a root-system look with a starfield look) — but **only the static
  center visual**, not the interactive slider control. Render it frozen at
  the slider's default midpoint (t=0.5: the blended state, half root-brown,
  half star-blue, both local and cosmic labels partially visible) — no
  `<input type="range">`, no JS blending logic.

**Ruling (made by controller, not the user — flag for correction):** the
request also says "show me the two versions side by side" nested under the
COS-B text bullet. Read as: build TWO candidate composite hero sections
(sharing COS-B's text and COS-A's duo-panel subtext throughout) that differ
in which visual leads —
  - **Version 1**: COS-A's animated sprout/roots SVG as the primary hero
    visual.
  - **Version 2**: COS-C's static center-stage SVG (frozen mid-blend) as
    the primary hero visual.
Present both, side by side, as a **local preview page only** —
`_preview/hero-comparison.html` in the cosbiosys.org repo, NOT wired into
the live `index.html`. This is a decision-support deliverable: the user
picks a version (or a merge) before anything goes live. Do not touch the
live homepage hero in this task.

If this ruling is wrong, the controller will explain the alternative
reading to the user rather than silently redo the work.

## Global Constraints

- Repo: this worktree, `cosbiosys.org` main branch's working tree, checked
  out on branch `cosbiosys-hero-integration`.
- Match the site's existing design language: CSS custom properties already
  defined in `assets/css/style.css` under `:root` (`--cb-deep`,
  `--cb-ocean`, `--cb-turquoise`, `--cb-turquoise-light`, `--cb-gold`,
  `--cb-parchment`, `--cb-cream`, `--cb-sand`, `--cb-soil`,
  `--cb-soil-muted`, `--cb-border`), the `.cb-section`/`.cb-container`/
  `.cb-section-label`/`.cb-section-title` primitives, and the `.cb-kind`/
  `.cb-kinds-grid` card pattern already used on the homepage and on
  `/scenarios/`. Do not invent a parallel palette — reuse or fall back to
  the `var(--cb-x, #hex)` pattern already used in `scenarios.html` and
  `community-hubs.html` for scoped `<style>` blocks.
- No em dashes in any new prose (site convention uses `&mdash;` heavily in
  existing copy — that's pre-existing and out of scope to change; new
  prose you write should use plain punctuation instead).
- Preserve the exact copy voice of COS-B's text (light edits only to fit
  cosbiosys.org's existing tone, e.g. matching "guild" language already
  used elsewhere on the site) — do not rewrite it wholesale.
- Respect motion: both versions should keep the source files' subtle
  animations (leaf sway / thread pulse for A; the static C freeze needs NO
  animation since the slider JS is removed — verify no dangling
  `@keyframes` reference an element that no longer exists).
- Accessibility: preserve the `role="img"` / `aria-label` / `<title>`/
  `<desc>` patterns already present in the source SVGs.
- Test by hand-rendering into `_preview/` (Jekyll is not installed
  locally — `bundle check` fails; this repo's established convention,
  see `_preview/scenarios.html` and `_preview/community-hubs.html`, is a
  manually assembled preview using the layout's head+nav+footer). Serve
  with `python3 -m http.server` on an unused port, verify with a headless
  browser (Playwright MCP tools, screenshot both versions), then **kill the
  http.server** before finishing.

## Task 1 — Build the two-version hero comparison preview

Create `_preview/hero-comparison.html` (plain static HTML, not a Jekyll
page — this is a working-tree preview artifact, not part of the built
site) containing:

1. A short heading at the top: "Hero integration — two candidates" with
   one sentence of context (COS-B text + COS-A subtext throughout; Version
   1 leads with COS-A's visual, Version 2 leads with COS-C's frozen visual).
2. **Version 1** section: full hero built from
   - eyebrow/h1/essence copy from COS-B's `#hero` section
   - COS-A's animated sprout/roots SVG as the primary visual (reuse its
     `viz-wrap` markup, `.stem`/`.leaf`/`.root`/`.thread`/`.node`/`.seed`
     classes and keyframes, scoped so they don't collide with Version 2's
     styles — prefix or scope selectors, e.g. `.v1 .stem`)
   - COS-B's Local/Global section copy (the two `<section>` blocks with
     their `<mark>` emphasis) placed below the hero
   - COS-A's duo panel (Rooted locally / Connected globally, with its two
     glyph SVGs) placed below the Local/Global copy
   - COS-B's closing line
3. **Version 2** section: identical structure to Version 1, except the
   primary hero visual is COS-C's circular stage SVG, frozen at t=0.5
   (hand-compute the mixed values COS-C's `render()` function would
   produce at slider value 50 — soil/void edge and mid colors, node fill,
   grain/star/glow opacities, local/cosmic label opacities — and bake them
   in as static CSS custom properties or inline styles; delete the
   `<input type="range">`, the `.control` block, the `.readout`, and the
   `<script>` block entirely).
4. Place the two versions in a two-column layout on wide viewports
   (stacked on narrow ones, matching the site's existing `@media
   (max-width: 720px)` convention), each clearly labelled "Version 1" /
   "Version 2" and each visually delimited (e.g. a bordered panel) so they
   read as a comparison, not a continuous page.
5. Reuse `assets/css/style.css` (link it) for the shared primitives, and
   add only the new scoped CSS this comparison needs in a `<style>` block.

Do not modify `index.html`, `_layouts/default.html`, or any other live
site file in this task.

## Task 2 — Sibling-to-child correction sitewide + footer merge (batch)

**Addendum (controller finding, added after Task 1 was dispatched):** the
user's literal request named one exact footer string, but "Sibling of
EvoBioSys" language turns out to appear in SIX places across this repo,
not one — grep confirms:

1. `_config.yml` `description:` — propagates via `jekyll-seo-tag` into
   `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card
   tags, and the JSON-LD `WebSite` schema on every page that doesn't
   override `description` in its own front matter.
2. `index.html` front matter `description:` (its own override of #1, homepage
   only) — same phrase, same propagation, just page-scoped instead of
   sitewide.
3. `index.html` — a stats row: `<dt>Sibling</dt><dd>EvoBioSys</dd>`.
4. `index.html` — the `<section class="cb-section cb-parent-link">` block:
   `<p class="cb-section-label">Siblings</p>`, heading "CosBioSys &
   EvoBioSys are one living mesh", and two sentences of body prose calling
   EvoBioSys and CosBioSys the "digital/infrastructure sibling" and
   "physical sibling" respectively. Note the CSS class is already
   `cb-parent-link`, not `cb-sibling-link` — the class name was already
   correct, only the prose drifted to "sibling" language at some point.
5. `_layouts/default.html` footer copyright line (the one the user quoted
   verbatim).

Fixing only #5 (the footer) would leave the other five saying something
different from the corrected footer, including the page's own SEO
metadata and social-share previews. **Ruling (controller): fix all six
occurrences for sitewide consistency**, not just the footer, since this is
the same substantive correction (CosBioSys is a child/holon of EvoBioSys,
not a sibling), just repeated in more places than the request explicitly
named. If this over-reaches what the user actually wanted changed, they
can revert individual spots — nothing here is destructive or hard to
undo (all local commits on this task's branch until reviewed and merged).

File: `_layouts/default.html` (the `<footer class="cb-footer">` block near
the bottom).

Current text (verify against the live file — it may have shifted since
this plan was written):
```html
<p class="cb-footer-copy">
  &copy; 2026 CosBioSys &middot; Sibling of EvoBioSys &middot;
  <span style="color: #aaa; font-size: 0.75rem;">v0.1</span>
</p>
<p class="cb-footer-signoff" style="font-size:0.8rem; opacity:0.7; margin-top:0.5rem;">Made with love in Europe</p>
```

Two changes:

1. **Sibling → child language.** "Sibling of EvoBioSys" is wrong: CosBioSys
   is a child of EvoBioSys, not a sibling. Change the copy line so it says
   CosBioSys is a holon/child of EvoBioSys (pick wording consistent with
   the site's own voice — e.g. "A holon of EvoBioSys" or "Part of
   EvoBioSys", matching the nav bar's existing "Part of EvoBioSys ↗" link
   text for consistency). The footer's `.cb-footer-links` list already
   contains `<a href="https://evobiosys.org" ...>EvoBioSys</a>` — that
   satisfies "linked in the footer"; do not add a second redundant link
   unless the new copy line itself needs to be the link (either is fine,
   just don't end up with a broken or duplicate link).
   Note for awareness only, not in scope to change: the homepage's
   `#parent-link` section ("CosBioSys & EvoBioSys are one living mesh")
   also uses sibling language ("EvoBioSys is the digital/infrastructure
   sibling... CosBioSys is the physical sibling... same mesh, two sides").
   Leave that section as-is — only the footer copy line is in scope for
   this task.
2. **Merge "Made with love in Europe" into one line, not its own
   paragraph.** Combine it into the `.cb-footer-copy` line (or wherever it
   reads naturally) so there is one footer line instead of two separate
   `<p>` elements. Keep the visual weight reasonable (don't make one line
   overly long/cramped) — use a `&middot;` separator consistent with the
   rest of the line's punctuation style.

Verify the result by re-generating `_preview/index.html` by hand (or
diffing the nav/footer markup by eye against the current
`_preview/index.html` if it already reflects the layout) and confirm no
other page's rendering broke (the footer lives in the shared layout, so
every page using it is affected — spot check via the existing
`_preview/scenarios.html` and `_preview/community-hubs.html`, which will
need their hand-rendered footers refreshed too — regenerate them the same
way `_preview/scenarios.html` was built in this repo's history, or note in
your report if you skip that and why).

## Report

Write a report to `hero-plan_result-report.md` in this plan's SDD workspace
(the implementer's dispatch will give the exact path). Include: what you
built, screenshots taken (paths), and — critically — the ruling above (two
side-by-side versions, not merged into the live site) restated as a
one-line reminder for the controller to relay to the user.
