/**
 * Eyebrow — the tracked, uppercase micro-label that opens every section
 * ("Below the surface", "Mid-water — what we do"). Sora, 3px tracking.
 */
export function Eyebrow({ children, tone = 'accent', as: Tag = 'div', style = {}, ...rest }) {
  const color = tone === 'muted' ? 'var(--ink-500)' : 'var(--teal-bright)'
  return (
    <Tag
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-semibold)',
        fontSize: 'var(--fs-eyebrow)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Eyebrow
