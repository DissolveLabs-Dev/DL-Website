import { useEffect } from 'react'

// Sections that hold a CSS animation with infinite iterations and no other
// gate on it — #hero's logo marquee, #events' quote marquee, #delivery's
// submarine propeller + connection-arrow dash. Confirmed via
// document.getAnimations(): all four were still "running" while idling on
// #contact, scrolled fully out of view. #contact itself is deliberately not
// included — its own animations (ticker marquees, step-flow) are the ones
// actively being looked at while this fix matters, so they should keep
// running whenever Contact is the visible section.
const SECTION_IDS = ['hero', 'events', 'delivery']

/**
 * usePauseOffscreenAnimations — freezes decorative CSS animations in
 * SECTION_IDS while their section is scrolled out of view, via the
 * .dl-anim-paused utility (src/styles/index.css). Must run after every
 * section has mounted, same constraint as useDepthEngine — see there.
 */
export function usePauseOffscreenAnimations() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('dl-anim-paused', !entry.isIntersecting)
        }
      },
      // No buffer: #delivery's bottom edge sits flush against #contact's
      // top (zero gap between them — confirmed via getBoundingClientRect),
      // so any positive rootMargin here keeps the submarine's animations
      // "warm" for the entire time Contact is being viewed, which is
      // exactly the case this hook exists to avoid. IO's own async firing
      // already means resume lags actual entry by at most a frame or two —
      // imperceptible for ambient decoration, so no head-start is needed.
      { rootMargin: '0px' }
    )
    els.forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])
}
