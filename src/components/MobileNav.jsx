import { useState } from 'react'
import { Wordmark } from '../ds/Wordmark.jsx'
import { ThemeToggleKnob } from './ThemeToggleKnob.jsx'

// legacy L1016-1074. The setTimeout-bound hamburger/menu-close script
// (L1049-1074) is dropped in favour of real state — see migration plan §7.
export function MobileNav({ toTop, goWork, goServices, goAbout, goContact, toggleTheme }) {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <div className="custom-mobile-nav">
      <div className="cmn-bar">
        <Wordmark
          as="a"
          href="#"
          className="cmn-logo hit-slop-48"
          onClick={(e) => {
            e.preventDefault()
            toTop()
          }}
        />
        <button
          className="cmn-hamburger hit-slop-48"
          onClick={(e) => {
            e.preventDefault()
            setOpen((o) => !o)
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div id="cmn-menu" className={open ? 'cmn-menu open' : 'cmn-menu'}>
        <a
          href="#events"
          className="cmn-link hit-slop-48"
          onClick={(e) => {
            goWork(e)
            closeMenu()
          }}
        >
          Products
        </a>
        <a
          href="#services"
          className="cmn-link hit-slop-48"
          onClick={(e) => {
            goServices(e)
            closeMenu()
          }}
        >
          Disciplines
        </a>
        <a
          href="#descend"
          className="cmn-link hit-slop-48"
          onClick={(e) => {
            goAbout(e)
            closeMenu()
          }}
        >
          Partners
        </a>
        <a
          href="#contact"
          className="cmn-cta"
          onClick={() => {
            goContact()
            closeMenu()
          }}
        >
          Build With Us
        </a>

        <div style={{ marginTop: '10px' }}>
          <button
            className="theme-toggle cmn-theme-btn hit-slop-48"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
          >
            <ThemeToggleKnob />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
