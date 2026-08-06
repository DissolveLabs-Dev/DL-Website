import { NavBar } from '../ds/NavBar.jsx'
import { ThemeToggleKnob } from './ThemeToggleKnob.jsx'

// legacy L968-1019. The `#__bundler_thumbnail` <template> (L970-979) is
// DC-editor-only chrome — inert markup that never renders — and is dropped,
// same as the hint-* attributes elsewhere.
export function DepthBackdrop({ navLinks, navCta, onBrandClick, toggleTheme }) {
  return (
    <>
      <div id="depth-bg" style={{ position: 'fixed', inset: 0, zIndex: -3, background: '#0D2B45' }} />
      <canvas
        id="rays-canvas"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: -2, pointerEvents: 'none' }}
      />
      <canvas
        id="particles-canvas"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />
      <div className="desktop-nav-wrapper">
        <button
          id="mobile-theme-toggle"
          className="theme-toggle hit-slop-48"
          onClick={toggleTheme}
          aria-label="Toggle light and dark theme"
        >
          <ThemeToggleKnob />
        </button>
        <div
          id="vignette"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3,
            pointerEvents: 'none',
            opacity: 0,
            background:
              'radial-gradient(ellipse 120% 90% at 50% 50%,transparent 40%,rgba(0,0,0,.55) 78%,rgba(0,0,0,.9) 100%)',
            top: '-1px',
          }}
        />
        <div
          id="cursor-ring"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '34px',
            height: '34px',
            margin: '-17px 0 0 -17px',
            border: '1.5px solid rgba(107,235,232,.7)',
            borderRadius: '50%',
            zIndex: 9998,
            pointerEvents: 'none',
            display: 'none',
          }}
        />
        <div
          id="cursor-dot"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '5px',
            height: '5px',
            margin: '-2.5px 0 0 -2.5px',
            background: '#33E0DE',
            borderRadius: '50%',
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: '0 0 8px #33E0DE',
            display: 'none',
          }}
        />
        <NavBar links={navLinks} cta={navCta} onBrandClick={onBrandClick} />
      </div>
    </>
  )
}

export default DepthBackdrop
