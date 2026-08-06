import { Eyebrow } from '../ds/Eyebrow.jsx'
import { SectionHeading } from '../ds/SectionHeading.jsx'
import { useSubmarine } from '../hooks/useSubmarine.js'

// legacy L1771-2031. Fully imperative below the JSX: submarine-engine.js
// drives every compartment reveal, card expand/collapse, and connection
// arrow purely from scroll position (and arrow keys) via getElementById /
// querySelector lookups against the ids/classes rendered here — there are
// no click handlers or React-owned bindings in this section. The two scoped
// <style> keyframe blocks that lived inline here (spinPropellerSmooth,
// flowDash) were already lifted into src/styles/04-delivery.css.
//
// Known pre-existing bug, intentionally preserved (see MIGRATION_PLAN.md
// §11): the scroll-up lock on this section that was fixed in commit
// bdc8756 and then reverted in 2ef2aea (the source-of-truth commit) is
// still live in submarine-engine.js. Do not fix it here.
function BlueprintHeading({ className }) {
  return (
    <div
      className={className}
      style={{ textAlign: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto 15px', flexShrink: 0 }}
    >
      <Eyebrow>The Co-Building Blueprint</Eyebrow>
      <SectionHeading size="lg" align="center" style={{ marginTop: '16px' }}>
        How{' '}We{' '}Deliver{' '}a{' '}Product
      </SectionHeading>
      <p
        style={{
          fontFamily: 'Manrope',
          fontSize: 'var(--fs-md)',
          lineHeight: 1.6,
          color: 'var(--ink-400)',
          margin: '18px auto 0',
          maxWidth: '600px',
          whiteSpace: 'normal',
        }}
      >
        An agile, iterative delivery engine. Our 4-phase co-founding roadmap from strategic immersion to market
        leadership.
      </p>
    </div>
  )
}

const COMPARTMENTS = [
  {
    n: '01',
    label: 'Alignment',
    icon: (
      <g transform="translate(55, 45)" stroke="#33E0DE" strokeWidth="1.5" fill="none">
        <rect x="0" y="0" width="60" height="40" rx="3" />
        <line x1="0" y1="10" x2="60" y2="10" />
        <rect x="5" y="4" width="4" height="2" rx="1" fill="#33E0DE" />
        <rect x="12" y="4" width="4" height="2" rx="1" fill="#33E0DE" />
        <rect x="15" y="18" width="15" height="15" rx="2" />
        <rect x="40" y="18" width="10" height="15" rx="2" />
      </g>
    ),
  },
  {
    n: '02',
    label: 'Velocity',
    icon: (
      <g transform="translate(60, 45)" stroke="#33E0DE" strokeWidth="1.5" fill="none">
        <rect x="0" y="0" width="50" height="12" rx="2" />
        <circle cx="8" cy="6" r="1.5" fill="#33E0DE" />
        <rect x="0" y="16" width="50" height="12" rx="2" />
        <circle cx="8" cy="22" r="1.5" fill="#33E0DE" />
        <rect x="0" y="32" width="50" height="12" rx="2" />
        <circle cx="8" cy="38" r="1.5" fill="#33E0DE" />
      </g>
    ),
  },
  {
    n: '03',
    label: 'Execution',
    icon: (
      <g transform="translate(50, 40)" stroke="#33E0DE" strokeWidth="1.5" fill="none">
        <line x1="15" y1="15" x2="35" y2="25" />
        <line x1="35" y1="25" x2="55" y2="15" />
        <line x1="35" y1="25" x2="35" y2="45" />
        <circle cx="15" cy="15" r="4" />
        <circle cx="55" cy="15" r="4" />
        <circle cx="35" cy="25" r="6" />
        <circle cx="35" cy="45" r="4" />
      </g>
    ),
  },
  {
    n: '04',
    label: 'Stewardship',
    icon: (
      <g transform="translate(55, 45)" stroke="#33E0DE" strokeWidth="1.5" fill="none">
        <circle cx="30" cy="25" r="12" />
        <circle cx="30" cy="25" r="4" />
        <line x1="30" y1="5" x2="30" y2="9" />
        <line x1="30" y1="41" x2="30" y2="45" />
        <line x1="10" y1="25" x2="14" y2="25" />
        <line x1="46" y1="25" x2="50" y2="25" />
        <line x1="16" y1="11" x2="19" y2="14" />
        <line x1="44" y1="39" x2="41" y2="36" />
        <line x1="44" y1="11" x2="41" y2="14" />
        <line x1="16" y1="39" x2="19" y2="36" />
      </g>
    ),
    coverStroke: '#111820',
  },
]

const COMP_X = [170, 340, 510, 680]

export function Delivery() {
  useSubmarine()

  return (
    <section id="delivery" style={{ position: 'relative', zIndex: 1, height: '400vh', padding: 0, paddingTop: '90px' }}>
      <BlueprintHeading className="reveal desktop-only-heading" />

      <div id="submarine-track" className="mobile-sub-track" style={{ position: 'relative', height: '350vh', width: '100%' }}>
        {/* height stays exactly 100vh: submarine-engine.js measures
            stickyElement.offsetHeight for both its pin threshold (endOffset)
            and its scroll-progress divisor (totalScrollableDistance), so the
            box height must not change. Only the *internal* alignment moves —
            justifyContent center instead of flex-start, plus a top pad that
            clears the fixed nav. The engine pins this element at top:0 on
            desktop, so with flex-start the submarine tucked under the navbar
            while ~500px of the viewport sat empty below the card. Centering
            inside the padded box splits that leftover space evenly at any
            viewport height. Mobile keeps the original padding: there the
            engine already offsets the pin by 80px for the nav, so adding the
            desktop clearance on top would double-count it. */}
        <div
          className="submarine-wrapper"
          style={{
            width: '100%',
            height: '100vh',
            maxWidth: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <BlueprintHeading className="reveal mobile-only-heading" />

          <svg
            className="submarine-svg"
            viewBox="0 0 1000 280"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', maxHeight: '45vh', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }}
          >
            <defs>
              <linearGradient id="sub-hull-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#122533" />
                <stop offset="100%" stopColor="#040c14" />
              </linearGradient>
              <linearGradient id="sub-panel-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#142838" />
                <stop offset="100%" stopColor="#08121a" />
              </linearGradient>
            </defs>

            <path className="sub-fin-top" d="M 880 120 L 930 40 L 950 40 L 900 120 Z" fill="#0c1822" stroke="#33E0DE" strokeWidth="1" strokeOpacity="0.3" />
            <path className="sub-fin-bottom" d="M 880 180 L 930 260 L 950 260 L 900 180 Z" fill="#0c1822" stroke="#33E0DE" strokeWidth="1" strokeOpacity="0.3" />
            <path className="sub-propeller-mount" d="M 940 135 L 975 145 L 975 155 L 940 165 Z" fill="#0c1822" />

            <ellipse cx="980" cy="150" rx="4" ry="45" fill="none" stroke="#33E0DE" strokeWidth="1" strokeOpacity="0.6" />
            <g style={{ transformOrigin: '975px 150px', animation: 'spinPropellerSmooth 1.2s linear infinite' }}>
              <path className="sub-propeller" d="M 970 150 C 985 90, 995 90, 985 150 C 995 210, 985 210, 970 150 Z" fill="#33E0DE" fillOpacity="0.25" stroke="#33E0DE" strokeWidth="2" />
              <path className="sub-propeller-blade2" d="M 970 150 C 955 90, 945 90, 955 150 C 945 210, 955 210, 970 150 Z" fill="#33E0DE" fillOpacity="0.15" stroke="#33E0DE" strokeWidth="1.5" />
            </g>

            <path
              className="sub-tower"
              d="M 430 110 L 440 40 C 445 30, 455 25, 465 25 L 535 25 C 545 25, 555 30, 560 40 L 570 110 Z"
              fill="url(#sub-hull-gradient)"
              stroke="#1a3344"
              strokeWidth="2"
            />
            <rect x="465" y="45" width="25" height="16" rx="4" fill="#02060a" stroke="#1a3344" strokeWidth="1" />
            <rect x="505" y="45" width="25" height="16" rx="4" fill="#02060a" stroke="#1a3344" strokeWidth="1" />

            <path className="periscope" d="M 480 25 L 480 5 L 490 5 L 490 15" fill="none" stroke="#33E0DE" strokeWidth="2.5" strokeOpacity="0.6" />
            <path className="antenna" d="M 505 25 L 505 0 M 505 0 L 505 -5" fill="none" stroke="#33E0DE" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="505" cy="0" r="1.5" fill="#33E0DE" fillOpacity="0.8" />

            <path
              className="sub-hull-base"
              d="M 60 150 C 60 90, 90 80, 130 80 L 890 80 C 935 80, 955 105, 955 150 C 955 195, 935 220, 890 220 L 130 220 C 90 220, 60 210, 60 150 Z"
              fill="url(#sub-hull-gradient)"
              stroke="#1a3344"
              strokeWidth="2"
            />

            <g className="sub-compartments">
              <line x1="170" y1="80" x2="170" y2="220" stroke="#1a3344" strokeWidth="2" />
              <line x1="340" y1="80" x2="340" y2="220" stroke="#1a3344" strokeWidth="2" />
              <line x1="510" y1="80" x2="510" y2="220" stroke="#1a3344" strokeWidth="2" />
              <line x1="680" y1="80" x2="680" y2="220" stroke="#1a3344" strokeWidth="2" />
              <line x1="850" y1="80" x2="850" y2="220" stroke="#1a3344" strokeWidth="2" />

              <line x1="130" y1="150" x2="890" y2="150" stroke="#1a3344" strokeWidth="1" strokeOpacity="0.5" />

              {COMPARTMENTS.map((c, i) => (
                <g key={c.n} className={`comp-${i + 1}`} transform={`translate(${COMP_X[i]}, 80)`}>
                  <g className="comp-content" opacity="0">
                    <rect x="0" y="0" width="170" height="140" fill="#080d14" />
                    <text x="85" y="34" fill="#33E0DE" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="12px" letterSpacing="1px" textAnchor="middle">
                      {c.n}
                    </text>
                    <text x="85" y="125" fill="#F2F7F8" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="12px" textAnchor="middle">
                      {c.label}
                    </text>
                    {c.icon}
                  </g>
                  <g className="comp-cover">
                    <rect x="0" y="0" width="170" height="140" fill="url(#sub-panel-gradient)" />
                    <line x1="170" y1="0" x2="170" y2="140" stroke={c.coverStroke || '#1a3344'} strokeWidth="2" />
                    <circle cx="10" cy="10" r="2" fill="#0a151d" />
                    <circle cx="160" cy="10" r="2" fill="#0a151d" />
                    <circle cx="10" cy="130" r="2" fill="#0a151d" />
                    <circle cx="160" cy="130" r="2" fill="#0a151d" />
                  </g>
                </g>
              ))}
            </g>

            <g id="connection-arrow-group" opacity="0" style={{ transition: 'opacity 0.6s ease' }}>
              <path id="connection-arrow-path" fill="none" stroke="#33E0DE" strokeWidth="2" strokeDasharray="6,6" style={{ animation: 'flowDash 0.5s linear infinite' }} />
              <circle id="connection-start-dot" r="4" fill="#33E0DE" filter="drop-shadow(0 0 4px #33E0DE)" />
              <polygon id="connection-end-arrow" points="-6,-6 6,-6 0,4" fill="#33E0DE" filter="drop-shadow(0 0 4px #33E0DE)" />
            </g>
          </svg>

          <div
            id="submarine-card-container"
            style={{
              width: '100%',
              // grows with the viewport instead of stranding an 800px card
              // under a submarine that spans most of a large display
              maxWidth: 'clamp(800px, 62vw, 1280px)',
              margin: '0 auto',
              background: 'var(--surface-panel)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              maxHeight: '0px',
              opacity: 0,
              overflow: 'hidden',
              transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, margin-top 0.6s ease',
              color: '#fff',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Delivery
