// Load order is a hard constraint (legacy <helmet> script order):
//   lenis.min.js  →  smooth-scroll.js
// smooth-scroll.js monkey-patches window.scrollTo at import time and checks
// `typeof window.Lenis === 'function'` synchronously, so these two static
// imports MUST stay in this order — module evaluation order guarantees
// lenis.min.js has already run (and attached window.Lenis) before
// smooth-scroll.js's own top-level IIFE executes.
import '../engines/lenis.min.js'
import '../engines/smooth-scroll.js'

/**
 * useSmoothScroll — installs Lenis + the window.scrollTo patch once per page
 * load. Every nav handler (scrollToId, "back to top", submarine step jumps)
 * depends on that patch, so this hook must be called before useDepthEngine()
 * in the root component: the import above already ran by the time either
 * hook's effect fires, but calling it first keeps the dependency explicit.
 */
export function useSmoothScroll() {
  // Side effects are installed by the module imports above; nothing to do
  // per-render. No cleanup: Lenis owns the page for the app's lifetime.
}
