import { useCallback, useEffect, useState } from 'react'

/**
 * useTheme — ported from the DC Component's componentDidMount/toggleTheme.
 * Precedence: localStorage['dl-theme'] > OS prefers-color-scheme > authored
 * default ('dark'). Tracks the OS scheme live for as long as the visitor has
 * not made an explicit choice (matchMedia change listener).
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    let saved = null
    try {
      saved = localStorage.getItem('dl-theme')
    } catch {
      /* private browsing / storage disabled */
    }
    const canMatch = typeof matchMedia === 'function'
    const prefersLight = canMatch && matchMedia('(prefers-color-scheme: light)').matches
    return saved || (canMatch ? (prefersLight ? 'light' : 'dark') : 'dark')
  })

  useEffect(() => {
    let saved = null
    try {
      saved = localStorage.getItem('dl-theme')
    } catch {
      /* ignore */
    }
    if (saved || typeof matchMedia !== 'function') return
    const mq = matchMedia('(prefers-color-scheme: light)')
    const onSchemeChange = (e) => {
      let chosen = null
      try {
        chosen = localStorage.getItem('dl-theme')
      } catch {
        /* ignore */
      }
      if (!chosen) setTheme(e.matches ? 'light' : 'dark')
    }
    if (mq.addEventListener) mq.addEventListener('change', onSchemeChange)
    else if (mq.addListener) mq.addListener(onSchemeChange)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onSchemeChange)
      else if (mq.removeListener) mq.removeListener(onSchemeChange)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light')
    return () => document.body.classList.remove('theme-light')
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light'
      try {
        localStorage.setItem('dl-theme', next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  return [theme, toggleTheme]
}
