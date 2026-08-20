import { useCallback, useMemo } from 'react'
import { useTheme } from './hooks/useTheme.js'
import { useDepthEngine } from './hooks/useDepthEngine.js'
import { useVideoManager } from './hooks/useVideoManager.js'
import { usePauseOffscreenAnimations } from './hooks/usePauseOffscreenAnimations.js'
import { useScrollMotion } from './hooks/useScrollMotion.js'
import { DepthBackdrop } from './components/DepthBackdrop.jsx'
import { MobileNav } from './components/MobileNav.jsx'
import { Hero } from './sections/Hero.jsx'
import { Events } from './sections/Events.jsx'
import { Services } from './sections/Services.jsx'
import { Delivery } from './sections/Delivery.jsx'
import { Contact } from './sections/Contact.jsx'
import { Footer } from './sections/Footer.jsx'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 12, behavior: 'smooth' })
  }
}

function App() {
  const [theme, toggleTheme] = useTheme()

  // Root-level: DepthEngine.attach() does a one-shot `.reveal` query, and
  // the video manager scans every <video> on the page — both must run only
  // after every section below has mounted. See MIGRATION_PLAN.md §6.2/§6.4.
  useDepthEngine(theme)
  useVideoManager()
  useScrollMotion()
  // Same "after every section has mounted" constraint as the two hooks
  // above — it looks up #hero/#events/#delivery by id.
  usePauseOffscreenAnimations()

  const goWork = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault()
    scrollToId('events')
  }, [])
  const goServices = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault()
    scrollToId('services')
  }, [])
  const goAbout = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault()
    scrollToId('descend')
  }, [])
  const goContact = useCallback(() => scrollToId('contact'), [])
  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  const navLinks = useMemo(
    () => [
      { label: 'Products', onClick: goWork },
      { label: 'Disciplines', onClick: goServices },
      { label: 'Partners', onClick: goAbout },
    ],
    [goWork, goServices, goAbout],
  )
  const navCta = useMemo(() => ({ label: 'Build With Us', onClick: goContact }), [goContact])

  return (
    <div className="dl-root">
      <DepthBackdrop navLinks={navLinks} navCta={navCta} onBrandClick={toTop} toggleTheme={toggleTheme} />
      <MobileNav
        toTop={toTop}
        goWork={goWork}
        goServices={goServices}
        goAbout={goAbout}
        goContact={goContact}
        toggleTheme={toggleTheme}
      />

      <main>
        <Hero goWork={goWork} goContact={goContact} />
        <Events />
        <Services />
        <Delivery />
        <Contact theme={theme} />
      </main>
      <Footer goServices={goServices} goWork={goWork} goAbout={goAbout} />
    </div>
  )
}

export default App
