/**
 * Wordmark — the Dissolve Labs text logo. There is no logo image; the mark
 * IS this type treatment. `nav` = compact Sora with a teal "Labs"; `serif` =
 * large single-colour Cormorant used in the footer / editorial contexts.
 */
export function Wordmark({
  variant = 'nav',
  size,
  color = 'var(--ink-100)',
  accent = 'var(--teal)',
  as: Tag = 'span',
  style = {},
  ...rest
}) {
  if (variant === 'serif') {
    return (
      <Tag
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 'var(--fw-semibold)',
          fontSize: size || 'var(--fs-wordmark-serif)',
          letterSpacing: 'var(--ls-tight-sm)',
          lineHeight: 'var(--lh-tight)',
          color,
          ...style,
        }}
        {...rest}
      >
        Dissolve Labs
      </Tag>
    )
  }
  return (
    <Tag
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-black)',
        fontSize: size || 'var(--fs-md)',
        letterSpacing: 'var(--ls-snug)',
        color,
        cursor: rest.onClick ? 'pointer' : 'inherit',
        ...style,
      }}
      {...rest}
    >
      Dissolve
      <span style={{ color: accent }}>Labs</span>
    </Tag>
  )
}

export default Wordmark
