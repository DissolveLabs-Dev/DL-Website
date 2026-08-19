import { useEffect } from 'react'
import { initPartnershipDecks, initTickers } from '../engines/deck-engine.js'

/**
 * useDecks — process-phase/logo decks + the two quote tickers on Contact.
 * Original called these from Component.componentDidMount's setState
 * callback (after the design-system runtime committed the render) with a
 * setTimeout(100) safety net for the tickers. React's effect already runs
 * after Contact's DOM commits, so the artificial delay is dropped (per
 * migration plan §7 — that delay existed only to outlast the old runtime's
 * late re-render).
 */
export function useDecks() {
  useEffect(() => {
    initPartnershipDecks()
    initTickers()
  }, [])
}
