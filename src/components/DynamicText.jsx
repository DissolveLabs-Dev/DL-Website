import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * @author: @dorianbaffier
 * @description: Dynamic Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 *
 * After the greeting cycle lands on Hello, the label tracks each section's
 * eyebrow as the page scrolls.
 */

const greetings = [
  { text: 'こんにちは', language: 'Japanese' },
  { text: 'Bonjour', language: 'French' },
  { text: 'Hola', language: 'Spanish' },
  { text: '안녕하세요', language: 'Korean' },
  { text: 'Ciao', language: 'Italian' },
  { text: 'Hallo', language: 'German' },
  { text: 'Hello', language: 'English' },
]

const SECTION_EYEBROWS = [
  { id: 'hero', label: 'Hello' },
  { id: 'events', label: 'Below the surface' },
  { id: 'services', label: 'how we build together' },
  { id: 'delivery', label: 'Co-Building Blueprint' },
  { id: 'contact', label: 'Partner with us' },
]

const textVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
  fontFamily: 'var(--font-display)',
  fontWeight: 'var(--fw-semibold)',
  fontSize: 'var(--fs-eyebrow)',
  letterSpacing: 'var(--ls-eyebrow)',
  // letter-spacing adds trailing space — pull it back so centered text looks true-center
  marginRight: 'calc(var(--ls-eyebrow) * -1)',
  textTransform: 'uppercase',
  color: 'var(--teal-bright)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

function activeSectionLabel() {
  const marker = Math.min(160, window.innerHeight * 0.22)
  let label = SECTION_EYEBROWS[0].label
  for (const section of SECTION_EYEBROWS) {
    const el = document.getElementById(section.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) label = section.label
  }
  return label
}

export function DynamicText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGreeting, setIsGreeting] = useState(true)
  const [scrollLabel, setScrollLabel] = useState('Hello')

  useEffect(() => {
    if (!isGreeting) return undefined

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        if (nextIndex >= greetings.length) {
          clearInterval(interval)
          setIsGreeting(false)
          return prevIndex
        }
        return nextIndex
      })
    }, 900)

    const onFirstScroll = () => {
      // Ignore tiny / programmatic scroll jolts at mount.
      if (window.scrollY < 24) return
      setIsGreeting(false)
      setScrollLabel(activeSectionLabel())
    }
    window.addEventListener('scroll', onFirstScroll, { passive: true })

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', onFirstScroll)
    }
  }, [isGreeting])

  useEffect(() => {
    if (isGreeting) return undefined

    let ticking = false
    const update = () => {
      ticking = false
      setScrollLabel((prev) => {
        const next = activeSectionLabel()
        return next === prev ? prev : next
      })
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isGreeting])

  // Key on the visible string so landing on Hello doesn't remount / replay.
  const displayText = isGreeting ? greetings[currentIndex].text : scrollLabel

  return (
    <div
      aria-label={isGreeting ? 'Rapid greetings in different languages' : 'Current section'}
      style={{
        position: 'relative',
        width: '240px',
        height: '28px',
        overflow: 'hidden',
        pointerEvents: 'none',
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={displayText}
          aria-live="off"
          initial={textVariants.hidden}
          animate={textVariants.visible}
          exit={textVariants.exit}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            ...labelStyle,
            position: 'absolute',
            inset: 0,
          }}
        >
          {displayText}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default DynamicText
