import { useEffect, useRef } from 'react'
import '../engines/depth-engine.js'

// DC editor props for this component always resolved to their schema
// defaults at runtime (support.js fed every prop its default; see the
// original data-props default values) — so they are hardcoded here rather
// than threaded through as configurable props.
const ANIMATION_SPEED = 0.7
const CUSTOM_CURSOR = true
const AMBIENT_MOTION = true

/**
 * useDepthEngine — ocean-descent canvas + custom-cursor engine.
 *
 * Must run in the ROOT component's effect, after every section has mounted:
 * DepthEngine.attach() does `querySelectorAll('.reveal').forEach(el =>
 * this.io.observe(el))` once, at attach time. Attaching from a section's own
 * effect (or before children paint) would observe a partial DOM and silently
 * drop reveal animations from everything mounted after it.
 *
 * StrictMode double-invokes effects in dev — DepthEngine.detach() must be
 * (and is) idempotent.
 */
export function useDepthEngine(theme) {
  const engineRef = useRef(null)

  useEffect(() => {
    if (!window.DepthEngine) return
    const engine = new window.DepthEngine()
    engineRef.current = engine
    engine.attach()
    engine.setSpeed(ANIMATION_SPEED)
    engine.setTheme(theme === 'light' ? 'light' : 'dark')
    if (AMBIENT_MOTION) engine.resume()
    else engine.pause()

    const on = CUSTOM_CURSOR && !matchMedia('(hover:none)').matches
    document.body.classList.toggle('dl-cursor', on)
    const ring = document.getElementById('cursor-ring')
    const dot = document.getElementById('cursor-dot')
    ;[ring, dot].forEach((el) => {
      if (el) el.style.display = on ? 'block' : 'none'
    })

    return () => {
      engine.detach()
      engineRef.current = null
      document.body.classList.remove('dl-cursor')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // componentDidUpdate: theme changes after mount still need to reach the
  // running engine (it owns its own rAF loop; it isn't re-created).
  useEffect(() => {
    if (engineRef.current) engineRef.current.setTheme(theme === 'light' ? 'light' : 'dark')
  }, [theme])
}
