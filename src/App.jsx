import { useCallback, useMemo } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import { useTheme } from './hooks/useTheme.js'
import { useDepthEngine } from './hooks/useDepthEngine.js'
import { useVideoManager } from './hooks/useVideoManager.js'
import { usePauseOffscreenAnimations } from './hooks/usePauseOffscreenAnimations.js'
import { DepthBackdrop } from './components/DepthBackdrop.jsx'
import { MobileNav } from './components/MobileNav.jsx'
import { Hero } from './sections/Hero.jsx'
import { Services } from './sections/Services.jsx'
import { Delivery } from './sections/Delivery.jsx'
import { Contact } from './sections/Contact.jsx'
import { Footer } from './sections/Footer.jsx'

// The `heroVariant` DC prop always resolved to its schema default at
// runtime (support.js fed every prop its default) — see MIGRATION_PLAN.md §9
// phase 7. Hardcoded rather than threaded through as a configurable prop.
const HERO_VARIANT = 'Anchored'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 10, behavior: 'smooth' })
  }
}

function App() {
  // Must run before useDepthEngine(): every scrollToId() call below depends
  // on the window.scrollTo patch this hook installs. See MIGRATION_PLAN.md
  // §6.1 / §10 risk register.
  useSmoothScroll()

  const [theme, toggleTheme] = useTheme()

  // Root-level: DepthEngine.attach() does a one-shot `.reveal` query, and
  // the video manager scans every <video> on the page — both must run only
  // after every section below has mounted. See MIGRATION_PLAN.md §6.2/§6.4.
  useDepthEngine(theme)
  useVideoManager()
  // Same "after every section has mounted" constraint as the two hooks
  // above — it looks up #hero/#delivery by id.
  usePauseOffscreenAnimations()

  const goWork = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault()
    scrollToId('services')
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
      { label: 'Contact', onClick: goContact },
    ],
    [goWork, goServices, goAbout, goContact],
  )
  const navCta = useMemo(() => ({ label: 'Build With Us', onClick: goContact }), [goContact])

  const heroA = HERO_VARIANT === 'Anchored'
  const heroB = HERO_VARIANT === 'Submerged'
  const heroC = HERO_VARIANT === 'Manifest'

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      <DepthBackdrop navLinks={navLinks} navCta={navCta} onBrandClick={toTop} toggleTheme={toggleTheme} />
      <MobileNav
        toTop={toTop}
        goWork={goWork}
        goServices={goServices}
        goAbout={goAbout}
        goContact={goContact}
        toggleTheme={toggleTheme}
      />

      <Hero heroA={heroA} heroB={heroB} heroC={heroC} goWork={goWork} goContact={goContact} />
      <Services />
      <Delivery />
      <Contact theme={theme} />
      <Footer goServices={goServices} goWork={goWork} goAbout={goAbout} />
    </div>
  )
}

export default App
