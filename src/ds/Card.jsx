import { useState } from 'react'

const RADII = {
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
}
const SURFACES = {
  1: 'var(--surface-1)',
  2: 'var(--surface-2)',
  3: 'var(--surface-3)',
  4: 'var(--surface-4)',
}

/**
 * Card — the base dark surface with a hairline border and a radius. Set
 * `interactive` for the signature hover: scale up, teal glow, brighter edge.
 */
export function Card({
  children,
  tone = 'neutral',
  surface = 2,
  radius = 'xl',
  interactive = false,
  padding = 'var(--pad-card)',
  overflow = 'visible',
  style = {},
  ...rest
}) {
  const [hover, setHover] = useState(false)
  const active = interactive && hover
  const baseBorder = tone === 'accent' ? 'var(--line-teal)' : 'var(--line-soft)'
  const handlers = interactive
    ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) }
    : {}
  return (
    <div
      style={{
        position: 'relative',
        background: SURFACES[surface] || SURFACES[2],
        border: `1px solid ${active ? 'var(--teal-light)' : baseBorder}`,
        borderRadius: RADII[radius] || RADII.xl,
        padding,
        overflow,
        boxShadow: active ? 'var(--glow-lg), var(--shadow-card)' : 'none',
        transform: active ? 'scale(1.06)' : 'none',
        transition:
          'transform var(--dur) var(--ease-soft), box-shadow var(--dur) var(--ease-soft), border-color var(--dur) var(--ease-soft)',
        ...style,
      }}
      {...handlers}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Card
