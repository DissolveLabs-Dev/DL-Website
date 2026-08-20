import { useCallback, useEffect, useRef } from 'react'

const LOOP_MS = 45000
const COAST_FRICTION = 0.9
const BLEND_MS = 900
const SCROLL_IDLE_MS = 120
const HORIZONTAL_INTENT_PX = 8
const MIN_COAST_VELOCITY = 0.06

/**
 * Auto-scrolling marquee with touch swipe and mouse drag.
 * Duplicate track content once so scroll position can loop at 50%.
 */
export function useAutoMarquee() {
  const ref = useRef(null)
  const state = useRef({
    mode: 'auto',
    velocity: 0,
    blendStart: 0,
    blendFromVelocity: 0,
    dragging: false,
    moved: false,
    offscreen: false,
    programmaticLock: 0,
    startX: 0,
    scrollLeft: 0,
    pointerId: null,
    lastScrollLeft: 0,
    lastSampleTime: 0,
    touchTracking: false,
    touchStartX: 0,
    touchStartY: 0,
    scrollEndTimer: null,
  })

  const withProgrammaticScroll = useCallback((el, fn) => {
    const s = state.current
    s.programmaticLock += 1
    try {
      fn()
    } finally {
      s.programmaticLock -= 1
    }
    s.lastScrollLeft = el.scrollLeft
  }, [])

  const normalizeScroll = useCallback((el) => {
    const half = el.scrollWidth / 2
    if (half <= 0) return
    if (el.scrollLeft >= half) {
      el.scrollLeft -= half
    } else if (el.scrollLeft < 0) {
      el.scrollLeft += half
    }
  }, [])

  const getAutoSpeed = useCallback((el) => {
    const half = el.scrollWidth / 2
    return half > 0 ? half / LOOP_MS : 0
  }, [])

  const sampleVelocity = useCallback((el, now) => {
    const s = state.current
    const dt = now - s.lastSampleTime
    if (dt > 0 && dt < 120) {
      const nextVelocity = (el.scrollLeft - s.lastScrollLeft) / dt
      if (Math.abs(nextVelocity) > 0.001) {
        s.velocity = nextVelocity
      }
    }
    s.lastScrollLeft = el.scrollLeft
    s.lastSampleTime = now
  }, [])

  const clearScrollEndTimer = useCallback(() => {
    const timer = state.current.scrollEndTimer
    if (timer) {
      clearTimeout(timer)
      state.current.scrollEndTimer = null
    }
  }, [])

  const beginUserInteraction = useCallback(
    (el, now) => {
      const s = state.current
      if (s.mode !== 'user') {
        s.mode = 'user'
        s.velocity = 0
      }
      s.lastScrollLeft = el.scrollLeft
      s.lastSampleTime = now
      clearScrollEndTimer()
    },
    [clearScrollEndTimer],
  )

  const endUserInteraction = useCallback(
    (el, now) => {
      const s = state.current
      if (s.dragging) return

      sampleVelocity(el, now)
      clearScrollEndTimer()

      if (Math.abs(s.velocity) >= MIN_COAST_VELOCITY) {
        s.mode = 'coast'
        return
      }

      if (Math.abs(s.velocity) > 0.01) {
        s.mode = 'blend'
        s.blendStart = now
        s.blendFromVelocity = s.velocity
        s.velocity = 0
        return
      }

      s.mode = 'auto'
      s.velocity = 0
      s.blendFromVelocity = 0
    },
    [clearScrollEndTimer, sampleVelocity],
  )

  const scheduleScrollEnd = useCallback(
    (el) => {
      clearScrollEndTimer()
      state.current.scrollEndTimer = setTimeout(() => {
        state.current.scrollEndTimer = null
        endUserInteraction(el, performance.now())
      }, SCROLL_IDLE_MS)
    },
    [clearScrollEndTimer, endUserInteraction],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let lastTime = performance.now()

    const tick = (now) => {
      const s = state.current
      const dt = Math.min(now - lastTime, 48)

      if (!reduced && !s.offscreen && !s.dragging && s.mode !== 'user') {
        withProgrammaticScroll(el, () => {
          if (s.mode === 'auto') {
            el.scrollLeft += getAutoSpeed(el) * dt
          } else if (s.mode === 'coast') {
            el.scrollLeft += s.velocity * dt
            s.velocity *= COAST_FRICTION ** (dt / 16.67)
            if (Math.abs(s.velocity) < 0.03) {
              s.mode = 'blend'
              s.blendStart = now
              s.blendFromVelocity = s.velocity
              s.velocity = 0
            }
          } else if (s.mode === 'blend') {
            const autoSpeed = getAutoSpeed(el)
            const t = Math.min(1, (now - s.blendStart) / BLEND_MS)
            const eased = 1 - (1 - t) ** 3
            el.scrollLeft += (s.blendFromVelocity * (1 - eased) + autoSpeed * eased) * dt
            if (t >= 1) {
              s.mode = 'auto'
              s.blendFromVelocity = 0
            }
          }

          normalizeScroll(el)
        })
      }

      lastTime = now
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    const onScroll = () => {
      const s = state.current
      if (s.programmaticLock > 0 || s.dragging || s.mode !== 'user') return

      normalizeScroll(el)
      const now = performance.now()
      sampleVelocity(el, now)
      scheduleScrollEnd(el)
    }

    const onTouchStart = (event) => {
      const touch = event.touches[0]
      if (!touch) return

      const s = state.current
      s.touchTracking = true
      s.touchStartX = touch.clientX
      s.touchStartY = touch.clientY
      s.lastScrollLeft = el.scrollLeft
      s.lastSampleTime = performance.now()
    }

    const onTouchMove = (event) => {
      const s = state.current
      if (!s.touchTracking) return

      const touch = event.touches[0]
      if (!touch) return

      const dx = Math.abs(touch.clientX - s.touchStartX)
      const dy = Math.abs(touch.clientY - s.touchStartY)
      if (dx > HORIZONTAL_INTENT_PX && dx > dy) {
        beginUserInteraction(el, performance.now())
      }
    }

    const onTouchEnd = () => {
      const s = state.current
      s.touchTracking = false
      if (s.mode === 'user' && !s.dragging) {
        scheduleScrollEnd(el)
      }
    }

    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      beginUserInteraction(el, performance.now())
      scheduleScrollEnd(el)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: true })

    const section = document.getElementById('events')
    let io
    if (section && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([entry]) => {
        state.current.offscreen = !entry.isIntersecting
      })
      io.observe(section)
    }

    return () => {
      cancelAnimationFrame(raf)
      clearScrollEndTimer()
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('wheel', onWheel)
      io?.disconnect()
    }
  }, [
    beginUserInteraction,
    clearScrollEndTimer,
    endUserInteraction,
    getAutoSpeed,
    normalizeScroll,
    sampleVelocity,
    scheduleScrollEnd,
    withProgrammaticScroll,
  ])

  const endDrag = useCallback(() => {
    const el = ref.current
    const s = state.current
    if (!s.dragging) return

    s.dragging = false
    el?.classList.remove('is-dragging')
    if (el) {
      withProgrammaticScroll(el, () => normalizeScroll(el))
      endUserInteraction(el, performance.now())
    }

    if (el && s.pointerId != null) {
      try {
        el.releasePointerCapture(s.pointerId)
      } catch {
        // pointer may already be released
      }
    }

    s.pointerId = null
  }, [endUserInteraction, normalizeScroll, withProgrammaticScroll])

  const onPointerDown = useCallback(
    (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return

      const el = ref.current
      if (!el) return

      const s = state.current
      const now = performance.now()
      beginUserInteraction(el, now)
      s.dragging = true
      s.moved = false
      s.startX = event.clientX
      s.scrollLeft = el.scrollLeft
      s.pointerId = event.pointerId
      el.setPointerCapture(event.pointerId)
      el.classList.add('is-dragging')
    },
    [beginUserInteraction],
  )

  const onPointerMove = useCallback(
    (event) => {
      const el = ref.current
      const s = state.current
      if (!el || !s.dragging) return

      const delta = event.clientX - s.startX
      if (Math.abs(delta) > 3) s.moved = true

      withProgrammaticScroll(el, () => {
        el.scrollLeft = s.scrollLeft - delta
        normalizeScroll(el)
      })
      sampleVelocity(el, performance.now())
    },
    [normalizeScroll, sampleVelocity, withProgrammaticScroll],
  )

  const onClickCapture = useCallback((event) => {
    if (!state.current.moved) return
    event.preventDefault()
    event.stopPropagation()
    state.current.moved = false
  }, [])

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
    },
  }
}
