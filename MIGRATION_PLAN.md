# Dissolve Labs → React: Fidelity-First Migration Plan

**Source of truth:** commit `2ef2aea`, file `index.html` (3,756 lines / 168 KB).
**Goal:** the React build renders pixel- and behaviour-identical to the legacy page. No redesign, no "while we're in here" cleanup.

---

## 0. What the legacy page actually is

This is not a plain HTML site. It is a **Design Composer (DC) document** rendered by a React runtime at load time:

| Piece | Role |
|---|---|
| `support.js` (66 KB) | `dc-runtime` — parses `<x-dc>`, compiles the template to `React.createElement`, evaluates `{{ }}` bindings. **Requires `window.React`.** |
| `_ds_bundle.js` (2,076 lines) | Design system — Babel-compiled React components under `window.DissolveLabsDesignSystem_0564f1` |
| `<script type="text/x-dc" data-dc-script>` (L3191–3457) | The `Component extends DCLogic` class: state, lifecycle, bindings |
| `<x-dc>` … `</x-dc>` (L143–3190) | The template |

**The page already runs on React.** The migration is not "rewrite in React" — it is **un-DC-ing** the template into real JSX and replacing the runtime with Vite + React 19.

The binding surface is tiny, which is the single best fact in this whole analysis:

```
goWork ×5   goContact ×5   toggleTheme ×2   toTop ×2   goServices ×2
goAbout ×2  navLinks ×1    navCta ×1        heroA/heroB/heroC ×1 each
```

**12 bindings across 3,756 lines.** Everything else is static markup. Nearly the entire page is a mechanical HTML→JSX transcription, not a logic port.

---

## 1. Immediate hazard — do this before anything else

The working tree has the entire original site staged as deleted, and `src/App.jsx` has a duplicate `export default App` (build-breaking).

```bash
# Restore originals into a frozen reference directory
git checkout HEAD -- .
mkdir legacy
git mv "index.html" legacy/index.legacy.html      # keep out of Vite's way
git mv "Dissolve Labs.dc.html" legacy/
git mv support.js image-slot.js legacy/
cp -r _ds legacy/_ds
```

`legacy/` is **read-only reference**, never imported by the app, and stays in the repo until sign-off. Every later phase diffs against it.

Also snapshot the live site before touching anything (§8 needs the baseline).

---

## 2. Structural map — the porting contract

Exact line ranges in `legacy/index.legacy.html`. Each row becomes one file.

| Lines | Content | Destination |
|---|---|---|
| 13–80 | `<style>` footer height overrides | `src/styles/00-overrides.css` |
| 81–139 | `<style>` head block 2 | `src/styles/01-head.css` |
| 144–164 | `<helmet>` — DS token CSS ×6, `styles.css`, 5 script tags | `index.html` + module imports |
| 165–837 | `<style>` main site CSS (673 lines) | `src/styles/02-site.css` |
| 840–967 | `<style>` block (128 lines) | `src/styles/03-site-b.css` |
| 970–1010 | `#depth-bg`, `#rays-canvas`, `#particles-canvas`, `#mobile-theme-toggle`, `#vignette`, `#cursor-ring`, `#cursor-dot` | `src/components/DepthBackdrop.jsx` |
| 1012–1019 | `<x-import ... NavBar>` | `src/ds/NavBar.jsx` |
| 1020–1048 | `.custom-mobile-nav` | `src/components/MobileNav.jsx` |
| 1049–1074 | `<script>` mobile menu toggle | → `useEffect` in `MobileNav` |
| 1076–1266 | `<section id="hero">` + `#hero-canvas` + 3× `<sc-if>` variants | `src/sections/Hero.jsx` |
| 1268–1627 | `<section id="events">` (31× `ev-card`) | `src/sections/Events.jsx` |
| 1629–1769 | `<section id="services">` (24× `svc-card`, 4 videos) | `src/sections/Services.jsx` |
| 1771–2031 | `<section id="delivery">` — submarine, `400vh` scroll track, inline SVG gradients | `src/sections/Delivery.jsx` |
| 1828–1833, 2008–2014 | scoped `<style>` blocks | `src/styles/04-delivery.css` |
| 2033–3135 | `<section id="contact">` | `src/sections/Contact.jsx` |
| 2046–2901 | `<style>` contact CSS (856 lines) | `src/styles/05-contact.css` |
| 2907–2952 | `#founder-deck`, `#logo-deck`, `#dl-booking-card`, `#dl-calendly-inline-host`, tickers | `src/components/` |
| 2955–3133 | `<script>` deck engine (`initDeck`, `initPartnershipDecks`) | `src/engines/deck-engine.js` |
| 3137–3187 | `<footer class="main-footer">` + `#seabed-canvas` | `src/sections/Footer.jsx` |
| 3154–3166 | `<style>` footer | `src/styles/06-footer.css` |
| 3191–3457 | DC `Component` class | `src/App.jsx` + `src/hooks/*` |
| 3458–3714 | `<script>` video playback manager (257 lines) | `src/engines/video-manager.js` |
| 3715–3754 | `<script>` `initSvcCardClicks`, `splitEventSubheadings` | → component-local state |

**CSS total: ~1,810 lines across 8 blocks.** Concatenate **in source order** into one `src/styles/index.css` barrel. Cascade order is load-bearing — the footer override at L13 wins because it is `!important`, but the L165 and L2046 blocks have overlapping selectors whose precedence depends purely on document order.

---

## 3. Target file tree

```
index.html                  ← Vite entry; Calendly <link>/<script>, favicon, #root
public/
  web-logo.png              ← from src/web-logo.png (favicon)
src/
  main.jsx
  App.jsx                   ← state: theme, bookingOpen, selDay, selTime, confirmed
  ds/                       ← lifted from _ds_bundle.js
    Button.jsx  Eyebrow.jsx  SectionHeading.jsx  Wordmark.jsx  NavBar.jsx
    GradientText.jsx  Card.jsx  GlassPanel.jsx  MediaCard.jsx   (unused-but-keep)
  sections/
    Hero.jsx  Events.jsx  Services.jsx  Delivery.jsx  Contact.jsx  Footer.jsx
  components/
    DepthBackdrop.jsx  MobileNav.jsx  CustomCursor.jsx  ThemeToggle.jsx
    FounderDeck.jsx  LogoDeck.jsx  BookingCard.jsx
  engines/                  ← imperative, ported verbatim
    lenis.min.js  depth-engine.js  submarine-engine.js  smooth-scroll.js
    deck-engine.js  video-manager.js
  hooks/
    useDepthEngine.js  useSmoothScroll.js  useTheme.js  useVideoManager.js
    useSubmarine.js  useDecks.js  useCustomCursor.js
  styles/
    index.css               ← imports 00–06 in source order
legacy/                     ← frozen reference, not imported
```

---

## 4. The transcription rules — this is where "every small thing" lives

The markup has **253 inline `style="…"` attributes**. Hand-converting those to JSX style objects is where a faithful migration dies by a thousand typos.

### 4.1 Do not hand-transcribe. Write a codemod.

Build `scripts/html-to-jsx.mjs` (one-time, throwaway, lives in the repo for auditability):

1. Parse the legacy HTML with `node-html-parser` (preserves attribute order and text nodes).
2. Emit JSX applying the rules in §4.2.
3. Run it per line-range from the §2 table, one section at a time.
4. **Hand-review the output** — the codemod does transcription, you do judgement.

This converts all 253 style attributes, 24 `x-import`s, and every SVG attribute mechanically. The alternative is a transcription-error hunt across 3,756 lines.

### 4.2 Conversion rules

| Legacy | JSX | Count / note |
|---|---|---|
| `style="a:b;c:d"` | `style={{a:'b', c:'d'}}` | 253× — camelCase keys; keep `px`/`vh`/`vw` as strings |
| `class=` | `className=` | throughout |
| `stroke-width`, `stroke-linecap`, `fill-rule`, `clip-path` | `strokeWidth`, `strokeLinecap`, `fillRule`, `clipPath` | inline SVGs in Delivery + theme toggle |
| `for=` | `htmlFor=` | contact form |
| `&nbsp;` | `{' '}` or literal U+00A0 | **`How&nbsp;We&nbsp;Deliver&nbsp;a&nbsp;Product`** — these prevent heading wrap; losing them changes layout |
| `<x-import ...DS.Foo prop="x">kids</x-import>` | `<Foo prop="x">kids</Foo>` | 24× |
| `hint-size`, `hint-placeholder-val` | **delete** | DC-editor-only, never rendered |
| `<sc-if value="{{ heroA }}">…</sc-if>` | `{heroA && (<>…</>)}` | 3× (hero variants) |
| `onClick="{{ goWork }}"` | `onClick={goWork}` | 11× |
| `id="…"` | **keep byte-identical** | 30 ids; the engines do `getElementById` |

### 4.3 Ids are an API, not decoration

`depth-engine.js`, `submarine-engine.js`, and `deck-engine.js` reach into the DOM by id. Renaming any of these breaks the animation silently:

```
depth-bg  rays-canvas  particles-canvas  vignette  cursor-ring  cursor-dot
hero-canvas  scroll-ind  submarine-track  sub-hull-gradient  sub-panel-gradient
connection-arrow-group  connection-arrow-path  connection-start-dot
connection-end-arrow  submarine-card-container  founder-deck  logo-deck
dl-booking-card  dl-calendly-inline-host  partnership-ticker  delivery-ticker
seabed-canvas  cmn-menu  mobile-theme-toggle
```

Class names are equally load-bearing: `.reveal` (observed by `depth-engine.js:102`), `.svc-video` (the video manager's sync group), `.svc-card`, `.ev-card`, `.deck-card`.

---

## 5. Design system: lift, don't load

`_ds_bundle.js` needs a global `React`, which fights Vite's module scope. Extract the 9 components into `src/ds/*.jsx`:

| Component | Bundle line | Used |
|---|---|---|
| `Button` | 36 | 6× |
| `Eyebrow` | 117 | 8× |
| `SectionHeading` | 198 | 8× |
| `Wordmark` | 232 | 1× |
| `NavBar` | 413 | 1× |
| `GradientText`, `Card`, `GlassPanel`, `MediaCard` | 147, 296, 356, 465 | 0× — port anyway, cheap |

They're already plain function components. The only edit per file: replace `const { useState } = React` with `import { useState } from 'react'`, add an export. Their `_extends` helper becomes JSX spread.

Ignore `window.Hero / WorkSection / ServicesSection / DescendSection / ContactSection / SiteFooter` in the bundle — the live page does not use them. Those are an earlier, abandoned section set. Porting them would produce a *different site*.

---

## 6. The imperative engines

Ported **verbatim** — do not rewrite these in React. They are canvas/scroll animation code where a rewrite guarantees behaviour drift. Wrap each in a hook that owns mount/unmount.

### 6.1 Load order is a hard constraint

```
lenis.min.js  →  smooth-scroll.js   (smooth-scroll monkey-patches window.scrollTo at :73)
```

Every `scrollToId()` nav handler depends on the patched `window.scrollTo`. If `smooth-scroll` initialises after the nav binds, in-page nav silently falls back to native jump-scroll. In `App.jsx`, `useSmoothScroll()` must run **before** `useDepthEngine()`.

### 6.2 `depth-engine.js` (383 lines)

`new window.DepthEngine()` → `.attach()`, `.setSpeed()`, `.detach()`. At `:102` it does `document.querySelectorAll('.reveal').forEach(el => this.io.observe(el))` — **a one-shot query at attach time.**

In the DC version this ran after the runtime painted everything. In React, `attach()` must run in a `useEffect` on the **root** component, after all sections have mounted — not in a section's own effect, or it observes a partial DOM and half the reveal animations never fire.

Convert the existing 40ms/60-attempt polling retry loop (L3205–3209) into a plain effect; with bundled modules the engine is guaranteed present.

### 6.3 `submarine-engine.js` (632 lines)

Exposes 12 globals: `phaseData`, `revealCompartment`, `coverCompartment`, `expandCard`, `collapseCard`, `setConnectionArrowVisible`, `revealedCompartments`, `updateSubmarineState`, `subEntryPath`, `navigateToSubmarineStep`. Keep them on `window` for now — the section's inline handlers call them by name. De-globalising is a *later* refactor, not part of this migration.

Note the git history: `bdc8756` "fix scroll UP lock on submarine section" was **reverted** by `2ef2aea`. The scroll-lock bug is live in the source of truth. Preserve the behaviour as-is; fixing it is a separate ticket.

### 6.4 `video-manager.js` (L3458–3714)

Three-stage loader with a `.svc-video` sync group and `SYNC_TIMEOUT = 1500`. It exposes `window.rescanVideos` and runs a `MutationObserver` **because the DC runtime remounted sections after first paint**. React's mount is stable, so the observer becomes belt-and-braces — keep it (harmless, and StrictMode double-invoke makes it useful).

Half of this is already pasted into `src/App.jsx`. Move it to `src/engines/video-manager.js` and call it from `useVideoManager()`.

### 6.5 `deck-engine.js` (L2955–3133)

`initDeck(containerId, items, isLogo)` — 30 founder images + 13 logos, `data-src` + `LOOKAHEAD = 4` manual lazy-loading (the cards are stacked in one 280px box, so native `loading="lazy"` can't work). Has a `container._deckCleanup` teardown path — wire that to the hook's cleanup return.

The image filename arrays stay verbatim; they include spaces, commas, and an apostrophe (`Y Combinator AI Startup School_s AWS After Party.webp`). Do not "tidy" them.

---

## 7. Things that become simpler in React (and the two that don't)

**Delete these scripts, author the result directly:**

- `splitEventSubheadings()` (L3733) rewrites `·` → `<br>` inside `.ev-card` subheadings. Just write the `<br>` in JSX.
- `initSvcCardClicks()` (L3716) toggles an `active` class. Becomes `const [activeCard, setActiveCard] = useState(null)` in `Services.jsx`.
- The `setTimeout(…, 800)` / `setTimeout(…, 2000)` retry pairs at L3748–3752 exist only because DC re-rendered late. Drop them.
- Mobile menu `setTimeout(…, 100)` (L1050) → `useState` + `className={open ? 'cmn-menu open' : 'cmn-menu'}`.

**Keep imperative:** `renderBookingUI()` and `renderVals()` (L3305–3417) build the booking day/time grid by hand and hand off to a Calendly inline embed at `#dl-calendly-inline-host`. Calendly's widget writes into DOM React doesn't own. Port as an uncontrolled component with an empty dep array — do **not** let React reconcile inside that host node.

---

## 8. Verification protocol

Fidelity claims need evidence, not eyeballing.

1. **Baseline before starting.** Serve `legacy/index.legacy.html`, capture full-page screenshots at 390 / 768 / 1280 / 1920 px, in **both themes**, at scroll positions 0 / 25 / 50 / 75 / 100 %. The `#delivery` section is `400vh` — sample it at 5 points inside its own track.
2. **Per-section gate.** After porting each section, re-capture and pixel-diff that section only. Nothing merges above a small diff threshold.
3. **Theme matrix.** `useTheme` has three-level precedence: `localStorage['dl-theme']` > OS `prefers-color-scheme` > authored default `'dark'`. Test all three paths, plus live OS-theme switching while no explicit choice is stored (the `matchMedia` change listener at L3221–3227).
4. **Interaction checklist.** Nav scroll targets ×5, mobile hamburger, theme toggle ×2 (desktop + mobile), 24 service cards, submarine scroll sequence + card expand/collapse, both decks, Calendly booking flow, 6 videos (sync-start, offscreen pause, tab-hidden pause).
5. **Console must be clean.** Any error means an engine didn't find its DOM.

---

## 9. Phase order

| # | Phase | Gate |
|---|---|---|
| 1 | Restore originals to `legacy/`, capture baseline, fix the duplicate `export default` | `npm run build` passes |
| 2 | Move assets: `src/web-logo.png` → `public/`; verify all 54 Vercel Blob URLs resolve | favicon renders |
| 3 | Concatenate all 8 CSS blocks into `src/styles/` **in source order** | CSS diff vs legacy = 0 |
| 4 | Lift 9 DS components into `src/ds/` | render in isolation |
| 5 | Write `scripts/html-to-jsx.mjs` | round-trips one section |
| 6 | Shell: `App.jsx`, `DepthBackdrop`, `NavBar`, `MobileNav`, `CustomCursor`, `useTheme`, `useSmoothScroll`, `useDepthEngine` | backdrop animates, theme toggles, nav scrolls |
| 7 | `Hero` (3 `sc-if` variants; default `heroVariant = 'Anchored'`) | pixel gate |
| 8 | `Events` (31 cards) | pixel gate |
| 9 | `Services` (24 cards, 4 videos, `useVideoManager`) | pixel gate + video sync |
| 10 | `Delivery` (submarine, 400vh, inline SVG) — **hardest section** | pixel gate ×5 scroll points |
| 11 | `Contact` (856 lines CSS, decks, Calendly) | pixel gate + booking flow |
| 12 | `Footer` + `#seabed-canvas` | pixel gate |
| 13 | Update `vercel.json`, full matrix from §8, delete `legacy/` | sign-off |

Phases 7–12 are independent — parallelisable if more than one person works on this.

---

## 10. Risk register

| Risk | Detail | Mitigation |
|---|---|---|
| **CSS cascade order** | 8 blocks, overlapping selectors, precedence from document order alone | Single concatenated barrel, source order, never reorder |
| **`.reveal` observed once at attach** | `depth-engine.js:102` queries the DOM once | `attach()` in root effect after all sections mount |
| **`window.scrollTo` patched** | `smooth-scroll.js:73`; all nav depends on it | `useSmoothScroll()` before every other hook |
| **StrictMode double-mount** | Engines will `attach()` twice in dev | Every hook returns a real cleanup; verify `detach()` is idempotent |
| **Inline style transcription** | 253 attributes | Codemod, not hands |
| **`&nbsp;` loss** | Heading wrap changes silently | Grep the JSX for U+00A0 after conversion |
| **Calendly DOM ownership** | Third-party writes into `#dl-calendly-inline-host` | Uncontrolled node, `useRef`, empty deps |
| **`vercel.json` cache rule** | `"source": "/src/(.*)"` — after Vite build, assets are `/assets/*` with content hashes | Update to `/assets/(.*)` with `immutable` |
| **Wrong section source** | `_ds_bundle.js` contains a *different*, unused set of section components | Port from `index.html` only |

---

## 11. Two pre-existing bugs — decide before, not during

1. **`#descend` does not exist.** The "Partners" nav link (L1026), the footer link (L3152), and `scrollToId('descend')` (L3428, L3437) all target an element with no matching `id` anywhere in the document. The link currently does nothing. → *Preserve the dead link, or add the anchor to `Contact`?* anchor to contact.
2. **Submarine scroll lock.** Fixed in `bdc8756`, then reverted in `2ef2aea`. The bug is live in the source of truth. → *Port as-is (recommended — one variable at a time), fix separately after sign-off.* port as is.

Both should be **preserved as-is** during migration. Mixing bug fixes into a fidelity port destroys your ability to tell a port regression from an intentional change.

---

## 12. Dependencies to add

```bash
npm i lenis                      # replaces vendored lenis.min.js — pin to the vendored version
npm i -D node-html-parser        # codemod only
```

Everything else is already in `package.json` (React 19.2, Vite 8.2, `@vitejs/plugin-react`, oxlint).

Keep `src/engines/lenis.min.js` vendored until you confirm the npm package version matches — Lenis's easing defaults have changed between releases, and the scroll feel is part of "every small thing".
