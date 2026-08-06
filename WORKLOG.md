# Dissolve Labs Website — Work Log

**Date:** 2026-08-05  
**Total time:** 2h 30m

---

## 1. Site Migration: Design Composer → Vite + React (1h 15m)

Migrated the marketing site from the legacy Design Composer template to Vite + React 19 with zero visual drift.

- Converted all sections to React components (Hero, Events, Services, Delivery, Contact, Footer).
- Lifted design-system components into standalone `.jsx` files.
- Ported vanilla-JS engines as React hooks (depth-engine, submarine-engine, deck-engine, video-manager, Lenis smooth-scroll).
- Preserved DOM ids/classes and CSS cascade order for engine compatibility.
- Fixed migration-only issues: corrupted engine files, stray CSS brace, strict-mode crash.
- Verified: no console errors, all sections render, nav works, theme toggle works.

## 2. Scroll Stutter Fix (15m)

Fixed slowdown when scrolling into the Partnership section.

- Added `requestAnimationFrame` throttling to submarine scroll handler to run once per frame instead of every scroll event.

## 3. Booking Launcher Feature (25m)

Added "Book a design partnership call" button that expands to full-page Calendly widget on click.

- Container centered on page, expands to `100vh` on click.
- Step cards hidden during expansion.
- Close button to collapse.

## 4. Calendly Widget Scrollbar Fix (10m)

Fixed internal Calendly scrollbar and wasted space.

- Removed legacy fixed-height CSS overrides forcing `520px` height.
- Widget now stretches to fill container.

## 5. Performance & Styling Passes (25m)

- **Scroll stutter (round 2):** Added off-screen early-exit to submarine engine to skip layout work when section is far outside viewport.
- **Booking container color:** Blended with sibling glass-panel containers for cohesive dark theme.
- **Event card hover crop:** Increased marquee wrapper padding to prevent scaled card from clipping on hover.
