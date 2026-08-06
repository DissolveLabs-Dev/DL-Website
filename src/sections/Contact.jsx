import { useEffect, useState } from 'react'
import { Eyebrow } from '../ds/Eyebrow.jsx'
import { SectionHeading } from '../ds/SectionHeading.jsx'
import { Button } from '../ds/Button.jsx'
import { useDecks } from '../hooks/useDecks.js'

// legacy L2033-2954 (the 856-line scoped <style> block at L2046-2900 was
// already lifted into src/styles/05-contact.css). The custom day/time
// booking picker defined in the DC Component class (renderBookingUI /
// renderVals' dayCells/timeCells/openBooking/confirmBooking, L3307-3455) was
// dead code in the legacy source — never wired to any binding, and its
// target ids never existed in the template. #dl-booking-card was one of
// those unused ids (only ever read by the also-dead openBooking()). It's
// repurposed here for a real click-to-open booking launcher, replacing the
// previous always-visible inline Calendly embed.
// Infographic step flow: four tangent rings, each with its number on the ring's
// left edge, joined by dashed arcs that alternate over the top and under the
// bottom of the ring they hug.
//
// Geometry is authored once, in the SVG's 1000x260 user space, and everything
// else is expressed as a percentage of that box. .step-flow locks itself to the
// same 1000/260 aspect ratio, so the absolutely-positioned HTML rings and the
// SVG arcs stay registered with each other at every width without JS.
//
//   ring centres  cx = 155, 385, 615, 845   cy = 130   r = 115
//   tangent, because the 230px spacing is exactly 2r — matching the reference
//   where each circle just touches the next.
//   number badge sits at (cx - r, cy), i.e. on the ring's left edge.
const STEP_R = 115

// One icon per step, each animated to act out its own word (see the sf-* CSS
// keyframes): Alignment's brackets converge on the centre, Velocity's speed
// lines streak past, Execution's chevrons advance, Stewardship's rings pulse
// outward from a fixed point. Shapes echo the submarine compartment icons in
// Delivery.jsx so the same four phases read the same way in both sections.
const STEP_ICONS = {
  '01': (
    <svg className="sf-icon sf-icon--align" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle className="sf-align-ring" cx="12" cy="12" r="4.5" />
      <path className="sf-align-b sf-align-b--l" d="M3 8.5 V6 h2.5 M3 15.5 V18 h2.5" />
      <path className="sf-align-b sf-align-b--r" d="M21 8.5 V6 h-2.5 M21 15.5 V18 h-2.5" />
    </svg>
  ),
  '02': (
    <svg className="sf-icon sf-icon--velocity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path className="sf-vel-l sf-vel-l--1" d="M3 7 h11" />
      <path className="sf-vel-l sf-vel-l--2" d="M3 12 h15" />
      <path className="sf-vel-l sf-vel-l--3" d="M3 17 h9" />
    </svg>
  ),
  '03': (
    <svg className="sf-icon sf-icon--exec" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path className="sf-exec-c sf-exec-c--1" d="M4 6 l6 6 l-6 6" />
      <path className="sf-exec-c sf-exec-c--2" d="M12 6 l6 6 l-6 6" />
    </svg>
  ),
  '04': (
    <svg className="sf-icon sf-icon--steward" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle className="sf-stew-core" cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <circle className="sf-stew-w sf-stew-w--1" cx="12" cy="12" r="6" />
      <circle className="sf-stew-w sf-stew-w--2" cx="12" cy="12" r="6" />
    </svg>
  ),
}

const STEPS = [
  { n: '01', label: 'Alignment', cx: 155 },
  { n: '02', label: 'Velocity', cx: 385 },
  { n: '03', label: 'Execution', cx: 615 },
  { n: '04', label: 'Stewardship', cx: 845 },
]

// Arc k hugs ring k and lands on ring k+1's badge. Endpoints are pulled ~10-15°
// short of the badge centres so the arrowhead reads as arriving at the badge
// rather than being buried under it. Sweep alternates: 1 = over the top
// (clockwise, since SVG y grows downward), 0 = under the bottom.
const STEP_ARCS = STEPS.slice(0, -1).map((s, i) => {
  const top = i % 2 === 0
  const a0 = top ? 190 : 170
  const a1 = top ? 345 : 15
  const rad = (d) => (d * Math.PI) / 180
  const pt = (a) => `${(s.cx + STEP_R * Math.cos(rad(a))).toFixed(1)} ${(130 + STEP_R * Math.sin(rad(a))).toFixed(1)}`
  return `M ${pt(a0)} A ${STEP_R} ${STEP_R} 0 0 ${top ? 1 : 0} ${pt(a1)}`
})

function StepFlow() {
  return (
    <div className="step-flow">
      <svg className="step-flow-arcs" viewBox="0 0 1000 260" fill="none" aria-hidden="true">
        <defs>
          <marker id="sf-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
          </marker>
        </defs>
        {STEP_ARCS.map((d) => (
          <path key={d} d={d} stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 14" markerEnd="url(#sf-arrow)" />
        ))}
      </svg>

      {STEPS.map((s) => (
        <div
          key={s.n}
          className="step-node"
          style={{ '--sf-ring-left': `${((s.cx - STEP_R) / 1000) * 100}%` }}
        >
          <div className="step-ring">
            {STEP_ICONS[s.n]}
            <span className="step-ring-label">{s.label}</span>
          </div>
          <span className="step-node-num">{s.n}</span>
        </div>
      ))}
    </div>
  )
}

// Theme-conditional colours: dark widget in dark mode, light in light mode.
//
// Module-level (not a closure inside Contact) so both the preload observer
// and the button's click fallback call the exact same init path — the
// hasChildNodes() guard is what makes calling it twice harmless.
function initCalendlyWidget(inlineHost, theme, { force = false } = {}) {
  if (!inlineHost) return
  // force = a theme toggle: the widget's colours are baked into its iframe URL
  // and Calendly gives us no way to recolour a mounted one, so following the
  // site theme means tearing it down and re-embedding with new params.
  if (inlineHost.hasChildNodes()) {
    if (!force) return
    inlineHost.replaceChildren()
  }
  const light = theme === 'light'
  const bgColor = light ? 'ffffff' : '071019'
  // Dark mode uses a mid-slate rather than white. Calendly applies text_color
  // to BOTH its labels (on the dark #071019 card) and the text you type into
  // its form fields — and those fields have a hard white background that no
  // embed param changes. White text_color therefore rendered input text at
  // rgb(222,222,222) on rgb(255,255,255): invisible.
  //
  // No single colour clears 4.5:1 on both surfaces; solving for equal contrast
  // gives a ceiling of ~4.35:1 either way, at a RENDERED luminance of ~0.19.
  //
  // Note the value below is lighter than that target on purpose: Calendly does
  // not use text_color verbatim, it darkens it (measured — 'ffffff' came back
  // as rgb(222,222,222), '6B7882' as rgb(79,91,101)). Passing the computed
  // optimum directly overshot and left labels at 2.75:1. '8A97A1' renders as
  // rgb(109,121,131), measured at 4.46:1 against the white input and 4.30:1
  // against the dark card — i.e. essentially the balanced ceiling.
  // Deliberately dimmer labels in exchange for a form you can actually read
  // what you're typing into.
  const textColor = light ? '0d1f29' : '8A97A1'
  const primaryColor = '0E9AA7'
  // These three params drop the event-type header, the landing-page blurb
  // and the GDPR banner — the bulk of the height above the calendar.
  const params = new URLSearchParams({
    background_color: bgColor,
    text_color: textColor,
    primary_color: primaryColor,
    hide_gdpr_banner: '1',
    hide_event_type_details: '1',
    hide_landing_page_details: '1',
  })
  const url = `https://calendly.com/developer-dissolvelabs/new-meeting?${params}`
  // Calendly's document paints nothing on <html>/<body> (both rgba(0,0,0,0)),
  // so wherever their card does not reach, the browser's opaque white iframe
  // base shows through. Paint the iframe itself with the colour we just
  // handed Calendly to kill that surround.
  inlineHost.style.setProperty('--dl-cal-bg', `#${bgColor}`)
  if (typeof window.Calendly !== 'undefined' && window.Calendly.initInlineWidget) {
    window.Calendly.initInlineWidget({ url, parentElement: inlineHost })
  } else {
    inlineHost.innerHTML = `<iframe src="${url}" frameborder="0" style="border: none; width: 100%; height: 100%; display: block;"></iframe>`
  }
}

export function Contact({ theme }) {
  useDecks()
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const inlineHost = document.getElementById('dl-calendly-inline-host')
    if (!inlineHost) return

    // Calendly announces the height its content needs via postMessage
    // ('calendly.page_height') and re-announces it on every step — the
    // calendar view asks for ~602px, then more once you pick a date and the
    // time list appears, more again on the details form. The iframe is sized
    // to that number exactly: pinning it to height:100% ignores the request,
    // so whenever the panel is shorter than the step needs, the overflow
    // becomes a scrollbar inside Calendly's own cross-origin document, where
    // no CSS of ours can reach it. --dl-cal-h lets the panel (05-contact.css)
    // wrap the widget instead of sitting at a flat 100vh with dead space
    // under it on any screen shorter than that.
    const onCalendlyMessage = (e) => {
      let hostname
      try {
        hostname = new URL(e.origin).hostname
      } catch {
        return
      }
      if (hostname !== 'calendly.com' && !hostname.endsWith('.calendly.com')) return
      if (e.data?.event !== 'calendly.page_height') return
      const iframe = inlineHost.querySelector('iframe')
      const needed = parseInt(e.data.payload?.height, 10)
      // Calendly emits a couple of junk heights (26px, 2px) while booting;
      // honouring those collapses the panel to a sliver mid-open.
      if (!iframe || !Number.isFinite(needed) || needed < 200) return
      // inline !important — the stylesheet rule is itself !important
      iframe.style.setProperty('height', `${needed}px`, 'important')
      const card = document.getElementById('dl-booking-card')
      if (card) card.style.setProperty('--dl-cal-h', `${needed}px`)
    }
    window.addEventListener('message', onCalendlyMessage)

    // A theme toggle re-runs this effect. If the widget is already embedded it
    // was built with the old palette, so rebuild it (see initCalendlyWidget's
    // `force`). Nothing to schedule in that case.
    if (inlineHost.hasChildNodes()) {
      initCalendlyWidget(inlineHost, theme, { force: true })
      return () => window.removeEventListener('message', onCalendlyMessage)
    }

    // Preload in the background shortly after the page loads, so clicking the
    // button reveals a ready calendar instead of a spinner.
    //
    // Two competing pressures, hence the shape of this:
    //  - Booting Calendly is expensive (~1100ms of cross-origin long tasks), so
    //    doing it mid-scroll is what used to make this section feel stuck.
    //  - But an earlier version waited for a 500ms gap in scrolling, which a
    //    visitor who scrolls continuously never produces — so it hadn't loaded
    //    by the time they clicked, which is the spinner you saw.
    //
    // So: prefer a quiet moment (short 200ms gap is enough), but never let that
    // preference postpone the load indefinitely — a hard deadline fires it
    // regardless. The widget renders display:none until opened, so this costs
    // nothing per frame once booted; only the one-off boot needs placing well.
    let quietTimer
    let idleId
    let deadline
    let done = false
    const start = (now = false) => {
      if (done) return
      done = true
      clearTimeout(quietTimer)
      clearTimeout(deadline)
      const go = () => initCalendlyWidget(inlineHost, theme)
      // The deadline path runs straight away. Handing it to requestIdleCallback
      // there defeats the point: under continuous scrolling the thread never
      // goes idle, and even rIC's own timeout gets pushed out — measured the
      // load slipping to 5.8s that way.
      if (now || !('requestIdleCallback' in window)) idleId = setTimeout(go, 0)
      else idleId = requestIdleCallback(go, { timeout: 1000 })
    }
    const startWhenQuiet = () => {
      if (done) return
      clearTimeout(quietTimer)
      quietTimer = setTimeout(() => start(), 200)
    }
    window.addEventListener('scroll', startWhenQuiet, { passive: true })
    startWhenQuiet()
    // Backstop: load by ~1.2s after mount even under continuous scrolling.
    deadline = setTimeout(() => start(true), 1200)

    return () => {
      window.removeEventListener('message', onCalendlyMessage)
      window.removeEventListener('scroll', startWhenQuiet)
      clearTimeout(quietTimer)
      clearTimeout(deadline)
      if (idleId != null) {
        if ('cancelIdleCallback' in window) cancelIdleCallback(idleId)
        else clearTimeout(idleId)
      }
    }
  }, [theme])

  // item 2: the collapsed launcher's left/right gap is whatever centring the
  // button leaves over — 89px at 1920, 88px at 1440, 42px at 1200 — so it is
  // neither a fixed px value nor a fixed percentage of width, and no static
  // CSS can mirror it vertically. Measure it and feed it back as padding.
  // Runs while collapsed only; open, the panel is sized by --dl-cal-h.
  useEffect(() => {
    if (bookingOpen) return
    const launcher = document.getElementById('dl-booking-card')
    const btn = launcher?.querySelector('button')
    if (!launcher || !btn) return
    let applied = null
    const sync = () => {
      const gap = (launcher.clientWidth - btn.getBoundingClientRect().width) / 2
      // clientWidth is the padding box, so this is the true inner gap. Floor
      // at the base 10px so a narrow column never collapses the panel onto
      // the button.
      const next = Math.max(10, Math.round(gap))
      // Writing the padding resizes the launcher, which re-fires the observer.
      // Bailing when the value is unchanged stops that becoming a loop.
      if (next === applied) return
      applied = next
      launcher.style.setProperty('--dl-btn-gap', `${next}px`)
    }
    sync()
    // Observing the launcher (not window) also catches the column resizing
    // for reasons other than viewport width.
    const ro = new ResizeObserver(sync)
    ro.observe(launcher)
    ro.observe(btn)
    return () => ro.disconnect()
  }, [bookingOpen])

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 1, padding: '60px 5vw 90px' }}>
      {/* Pre-existing bug fix decided in MIGRATION_PLAN.md §11: the "Partners"
          nav/footer link targets #descend, which never existed in the legacy
          markup. Resolved by anchoring it to Contact. */}
      <span id="descend" style={{ position: 'absolute', top: '-1px' }} />

      <div className="reveal" style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto 54px' }}>
        <Eyebrow>The deep — bioluminescence only</Eyebrow>
        <SectionHeading
          size="md"
          align="center"
          style={{ marginTop: '16px', fontSize: 'clamp(22px,4vw,84px)', whiteSpace: 'nowrap' }}
        >
          Initiate{' '}a{' '}Design{' '}Partnership
        </SectionHeading>
        <p style={{ fontFamily: 'Manrope', fontSize: 'var(--fs-md)', lineHeight: 1.6, color: 'var(--ink-400)', margin: '16px auto 0' }}>
          Pick a time to align. We’ll break down your product roadmap and evaluate how we can co-build it together —
          no vendor pitches, no sales theatre.
        </p>
      </div>

      <div className="partnership-grid">
        <div className="partnership-left-col">
          <div className="partnership-deck-container" id="founder-deck" />
          <div className="partnership-deck-container" id="logo-deck" />
        </div>

        <div
          className="partnership-center-col"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            id="dl-booking-card"
            className={bookingOpen ? 'dl-booking-launcher dl-booking-launcher--open' : 'dl-booking-launcher'}
          >
            {!bookingOpen && (
              <Button
                size="lg"
                onClick={() => {
                  setBookingOpen(true)
                  // Fallback for a visitor who clicks before the section ever
                  // neared the viewport (e.g. jumped straight here from the nav
                  // link) — the IntersectionObserver preload above wouldn't
                  // have fired yet. No-op if it already has.
                  initCalendlyWidget(document.getElementById('dl-calendly-inline-host'), theme)
                }}
              >
                Book a design partnership call
              </Button>
            )}
            {bookingOpen && (
              <button
                type="button"
                className="dl-booking-close"
                aria-label="Close booking"
                onClick={() => setBookingOpen(false)}
              >
                ×
              </button>
            )}
            {/* Always mounted (not gated on bookingOpen) so the preload effect
                can load Calendly into it before the click — see initCalendlyWidget.
                CSS hides it via opacity while collapsed rather than unmounting it,
                so the widget is never re-created.
                data-lenis-prevent: let the Calendly widget own wheel/touch
                scrolling inside itself. */}
            <div id="dl-calendly-inline-host" data-lenis-prevent="" aria-hidden={!bookingOpen} />
          </div>

          {!bookingOpen && <StepFlow />}
        </div>

        <div className="partnership-right-col">
          <div className="ticker-container">
            <div className="ticker-track" id="partnership-ticker" />
          </div>
          <div className="ticker-container">
            <div className="ticker-track" id="delivery-ticker" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
