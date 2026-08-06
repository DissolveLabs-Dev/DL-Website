import { useEffect } from 'react'

/**
 * useSubmarine — loads submarine-engine.js once. The engine is not a
 * class with attach/detach: it runs its setup at module-evaluation time
 * (window.phaseData, window.revealCompartment, window.expandCard, the
 * scroll/keydown listeners, …) guarded by `window.__submarineEngineLoaded`
 * so a second import is a no-op. Every DOM query inside it is lazy (done
 * inside event handlers), except the final `setTimeout(() =>
 * window.updateSubmarineState(0), 100)` — 100ms is ample time after this
 * hook's effect (which only runs post-mount, once Delivery's markup exists).
 *
 * Kept fully imperative per the migration plan: this is scroll/DOM
 * animation code where a React rewrite would guarantee behaviour drift.
 * The 12 globals it exposes (revealCompartment, expandCard, collapseCard,
 * navigateToSubmarineStep, …) are called by name from inline handlers in
 * Delivery.jsx — de-globalising them is a later refactor.
 */
export function useSubmarine() {
  useEffect(() => {
    import('../engines/submarine-engine.js')
  }, [])
}
