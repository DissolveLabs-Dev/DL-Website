# Dissolve Labs — Design System

Dissolve Labs is a **premium software studio** — bespoke software engineering,
robotics & automation, applied AI systems, and product development. The brand
line is **"Ideas, dissolved into software."**

The identity runs on a single, committed metaphor: an **ocean descent**. The
website is one long scroll from the sunlit surface into the abyss — the
background darkens with scroll depth, light rays fade, bioluminescent particles
take over, a ship rides the hero waterline, a submarine dives at the midpoint,
and the footer rests on a living seabed. Every backdrop is generative `<canvas>`
art; the palette is near-black lit by a single teal accent.

> There is **no logo image** in the source. The brand mark is a **type
> treatment** ("Dissolve**Labs**" in Sora with a teal "Labs"; a large Cormorant
> serif "Dissolve Labs" in the footer). Do not draw or approximate a logo —
> render the `Wordmark` component wherever a mark is needed.

## Sources
- `uploads/Dissolve Labs New (standalone).html` — a self-contained bundle of the
  full marketing site, authored as a Design Component. The readable template and
  component logic were decoded to `scraps/decoded_template.html` (kept for
  reference). Webfonts (Sora, Manrope, Cormorant Garamond) were extracted from
  the bundle into `assets/fonts/`. No Figma, repo, or additional codebase was
  provided.

No live URL, repo, or Figma link was supplied — this system is reverse-derived
from that one artifact, which is the ground truth for all values below.

---

## Content fundamentals

**Voice.** Confident, premium, and spare — a senior studio that lets capability
speak. First-person plural for the studio (**"We build…", "We architect…"**),
second person for the client (**"…scales with your ambition"**). Concrete and
outcome-led ("AI that actually ships and delivers measurable business outcomes"),
never buzzword soup.

**The depth metaphor is the signature device.** Section eyebrows narrate the
dive and should always read as a descent, not generic labels:
- Hero — "Premium Software Studio"
- Work — **"Below the surface"**
- Services — **"Mid-water — what we do"**
- About — **"Descending deeper"** (reflective, serif)
- Contact — **"The deep — bioluminescence only"**

**Casing.**
- Headlines & body: **sentence case** ("Book time with our team").
- Eyebrows & small labels: **UPPERCASE**, wide-tracked (3px / 2px).
- Buttons & nav: **Title Case** ("Start a Project", "Explore Our Work", "Book a Consultation").

**Punctuation & style.** Em dashes (—) for asides, especially in eyebrows.
Curly apostrophes ("You're booked", "We'll walk you through your idea").
Headlines are short and declarative with **one gradient-emphasised word**
("Ideas, *dissolved* into software.").

**Emoji: never.** Iconography is limited to a few Unicode glyphs (→ ↓ ‹ › ✓).

**Copy specimens.**
- Hero: "We build bespoke software, AI systems, and digital products for companies that want to move faster than their competition."
- Services: "We shape raw ideas into refined, validated products through rigorous design, prototyping, and iteration."
- About (serif, poetic): "Beyond the surface, past the noise — into the depths where real engineering lives."
- Footer tagline (serif italic): "Ideas, dissolved into software."

---

## Visual foundations

**Color — a monochrome deep-ocean field lit by one teal.**
- **Depth scale** drives the scroll background, interpolated surface→abyss:
  `#0D2B45 → #0A2238 → #081A2C → #060F1C → #040A14 → #03060D → #020408`.
- **Teal accent (bioluminescence):** `#26D0CE` primary · `#33E0DE` bright ·
  `#6BEBE8` light/hover · `#5CC6C4` muted label · `#0E9AA7` deep. `#04121A` is
  the near-black ink used *on* teal fills.
- **Ink ladder** (cool gray-blues): `#F2F7F8` → `#DCEBEE` → `#C7D4DA` → `#9BA8B4`
  (body) → `#8EA6AD` → `#5B6B77` → `#3C4A55`.
- No warm hues anywhere. Avoid purple/blue SaaS gradients — the only gradient is
  the teal `#33E0DE → #0E9AA7` (135° on fills, 100° clipped onto text).

**Typography.**
- **Sora** — display & UI. Weights 600/700/800. Tight negative tracking (−1 to
  −3px on large sizes). Headings, buttons, eyebrows, labels, card titles.
- **Manrope** — body & data. Weights 400/500/600. Line-height 1.6.
- **Cormorant Garamond** — editorial serif, weights 500/600 (+ italic). Reserved
  for "depth" moments (the About heading, the footer wordmark & tagline). Not a
  general-purpose face.

**Backgrounds & imagery.** Full-bleed **generative `<canvas>`** — there are no
photographs, stock illustrations, or repeating patterns. Motifs: drifting light
rays near the surface, bioluminescent particle fields, an animated waterline with
a mouse-steered ship, a descending submarine, four per-service visualisations
(matrix rain, robot arm, neural network, animated blueprint), and a seabed of
corals, anemones, sea stars and an anchor. Imagery vibe: cool, dark, luminous
teal-on-black; glowing, underwater; no grain.

**Motion.** Continuous `requestAnimationFrame` canvas loops; **scroll position is
depth**. Content reveals on scroll (opacity + `translateY(40px)`, .7s ease-out).
The hero CTA breathes (`pulseGlow`, 3s). A custom cursor (teal ring + glowing
dot) lerps toward the pointer (factor .18) and leaves a ripple trail. Easing
vocabulary: `cubic-bezier(.4,0,.2,1)` for UI, `(.5,0,.2,1)` for the service-card
expand, `(.34,1.56,.64,1)` overshoot for panel entrances.

**Hover states.**
- Links lighten (`#C7D4DA → #F2F7F8`).
- Primary buttons lift `−2px` and intensify their glow.
- Event tiles: hovering one **dims + blurs its siblings** while it scales `1.06`
  and gains a teal glow.
- Service cards **expand** (flex 70/30) and fade their description in.
- Edge tiles un-blur, brighten, and scale `1.08`.

**Borders.** 1px hairlines only — white `.12` (neutral) or teal `.2 / .28 / .4`
(accent). No heavy rules.

**Shadows & glows.** Two systems, often combined on hover: **teal outer glows**
(`0 0 20–55px rgba(38,208,206,α)`) for bioluminescence, and **near-black ambient
elevation** (`0 24–40px … rgba(0,0,0,.55–.6)`). Cards carry *no* shadow at rest;
glow/elevation appear on hover.

**Transparency & blur.** Glassmorphism where UI floats over the busy canvas: the
nav pill (`backdrop-filter: blur(18px)`) and the booking panel (`blur(30px)`),
both with a translucent dark fill and a teal hairline. Media tiles use a
**bottom-fading scrim** (`linear-gradient` to the dark surface) for text
legibility.

**Corner radii.** `8px` chips/calendar cells · `12px` small cards · `16px` media
tiles · `20px` feature cards · `24px` panels/modals · `100px` pill (buttons, nav)
· `50%` round (cursor, confirm badge).

**Cards.** Dark fill (`#050E18`–`#081A2C`), a hairline border, a generous radius,
and *no* resting shadow. Portrait media tiles are `2/3` with a scrim and
bottom-anchored title + caption.

**Layout.** A fixed **floating nav pill**, top-centre. Viewport-relative side
gutters (5–8vw). Generous vertical section rhythm (110–150px). Centred heading
blocks (~640–720px). Content frame max 1240px. Sections are full-height
experiences (100–112vh).

---

## Iconography

Dissolve Labs has **no icon library, icon font, or SVG/PNG icon set**. The source
uses only a handful of **Unicode glyphs**, styled in the current text colour:
- `→` service-card affordance (slides right on hover)
- `↓` "Descend" scroll cue
- `‹` `›` calendar month navigation
- `✓` booking-confirmed badge

All other "imagery" is **generative `<canvas>`**, not iconography. **Emoji are
never used.**

If a build genuinely needs UI icons (source has none), substitute a **thin,
1.5px-stroke outline set** (e.g. Lucide / Feather) to match the hairline
aesthetic, colour them with the ink ladder or teal accent, and **flag the
substitution to the studio** — it is an addition, not part of the brand.

> **Font note:** Sora, Manrope, and Cormorant Garamond were extracted directly
> from the source bundle (Google Fonts webfonts) — these are the real faces, not
> substitutions.

---

## Components

Reusable primitives, compiled into `_ds_bundle.js` and exposed on
`window.DissolveLabsDesignSystem_0564f1`. Every family below is drawn from the
source site — nothing invented.

**Core** (`components/core/`)
- **Button** — gradient-teal `primary`, teal-outline `secondary`, text `ghost`; sizes sm/md/lg; optional glow & `pulse`.
- **Eyebrow** — the uppercase tracked section label.
- **SectionHeading** — display / section / serif headings (Sora black or Cormorant).
- **GradientText** — teal gradient clipped onto an emphasised word.
- **Wordmark** — the Dissolve Labs text logo (`nav` and `serif` variants). *No image mark exists.*

**Surfaces** (`components/surfaces/`)
- **GlassPanel** — frosted-glass surface (`nav` pill / `panel` modal).
- **Card** — base dark card; hairline border, optional hover glow.
- **MediaCard** — portrait media tile with scrim + caption (built on `Card`).

**Navigation** (`components/navigation/`)
- **NavBar** — the floating frosted pill nav (composes GlassPanel + Wordmark + Button).

*Intentional additions:* **GradientText** and **Wordmark** are extracted as named
components because both are recurring, load-bearing brand motifs in the source
(the gradient word; the type-only logo). No net-new UI patterns were introduced.

## UI kits
- **`ui_kits/marketing-site/`** — the full landing page, interactive: hero, work,
  services, about, a working booking flow, and footer, over the live
  `DepthEngine` canvas system. See its `README.md`.

---

## Repository index
- `styles.css` — global entry point (consumers link this one file); an `@import` manifest.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css` (`@font-face`), `base.css` (reset/body/links).
- `assets/fonts/` — Sora, Manrope, Cormorant Garamond webfonts (woff2).
- `components/` — `core/`, `surfaces/`, `navigation/`; each has `.jsx` + `.d.ts` + `.prompt.md` and one `@dsCard` HTML.
- `guidelines/` — foundation specimen cards (Type, Colors, Spacing, Effects, Brand) for the Design System tab.
- `ui_kits/marketing-site/` — the product recreation + its `DepthEngine.js`.
- `scraps/` — decoded source reference (`decoded_template.html`, `dissolve_standalone.html`); not part of the shipped system.
- `SKILL.md` — Agent-Skill front matter for use in Claude Code.
- `thumbnail.html` — the design system's homepage tile.
