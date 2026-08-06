import { useState } from 'react'

const SIZES = {
  sm: { padding: 'var(--pad-btn-sm)', fontSize: 'var(--fs-xs)' },
  md: { padding: 'var(--pad-btn-md)', fontSize: 'var(--fs-base)' },
  lg: { padding: 'var(--pad-btn-lg)', fontSize: 'var(--fs-md)' },
}

/**
 * Button — the pill CTA. Gradient-teal primary, outline secondary, text ghost.
 * Self-contained hover (lift + glow); optional pulseGlow for hero moments.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  glow = true,
  pulse = false,
  full = false,
  href,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = useState(false)
  const sz = SIZES[size] || SIZES.md
  const lifted = hover && !disabled
  const variants = {
    primary: {
      background: 'var(--grad-teal)',
      color: 'var(--teal-ink)',
      border: 'none',
      fontWeight: 'var(--fw-bold)',
      boxShadow: pulse ? undefined : glow ? (lifted ? 'var(--glow-lg)' : 'var(--glow-md)') : 'none',
    },
    secondary: {
      background: 'transparent',
      color: lifted ? 'var(--ink-100)' : 'var(--ink-300)',
      border: `1px solid ${lifted ? 'var(--teal)' : 'var(--line-teal)'}`,
      fontWeight: 'var(--fw-semibold)',
    },
    ghost: {
      background: 'transparent',
      color: lifted ? 'var(--teal-light)' : 'var(--teal)',
      border: 'none',
      fontWeight: 'var(--fw-semibold)',
    },
  }
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-4)',
    fontFamily: 'var(--font-display)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: full ? '100%' : 'auto',
    padding: sz.padding,
    fontSize: sz.fontSize,
    opacity: disabled ? 0.45 : 1,
    transform: lifted ? 'translateY(-2px)' : 'none',
    transition:
      'transform var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft)',
    animation: pulse ? 'pulseGlow 3s ease-in-out infinite' : undefined,
    ...variants[variant],
    ...style,
  }
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  }
  const Tag = href ? 'a' : 'button'
  const extra = href ? { href } : { disabled }
  return (
    <Tag style={base} {...handlers} {...extra} {...rest}>
      {children}
    </Tag>
  )
}

export default Button
