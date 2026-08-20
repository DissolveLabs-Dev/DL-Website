const SIZES = {
  display: { fontSize: 'var(--fs-display)', letterSpacing: 'var(--ls-display)', lineHeight: 'var(--lh-display)' },
  lg: { fontSize: 'var(--fs-h2)', letterSpacing: 'var(--ls-tight)', lineHeight: 'var(--lh-heading)' },
  md: { fontSize: 'var(--fs-h2-sm)', letterSpacing: 'var(--ls-tight)', lineHeight: 'var(--lh-heading)' },
  serif: { fontSize: 'var(--fs-serif-lg)', letterSpacing: 'var(--ls-tight-sm)', lineHeight: 'var(--lh-tight)' },
}

/**
 * SectionHeading — the big display heading. Sora black for structural
 * headings (`display`/`lg`/`md`); Cormorant serif for reflective "depth"
 * moments (`serif`). Use `.brand-accent` to emphasise a word.
 */
export function SectionHeading({ children, size = 'lg', as: Tag = 'h2', align = 'left', style = {}, ...rest }) {
  const isSerif = size === 'serif'
  const sz = SIZES[size] || SIZES.lg
  return (
    <Tag
      style={{
        fontFamily: isSerif ? 'var(--font-serif)' : 'var(--font-display)',
        fontWeight: isSerif ? 'var(--fw-semibold)' : 'var(--fw-black)',
        color: isSerif ? 'var(--ink-200)' : 'var(--ink-100)',
        textAlign: align,
        margin: 0,
        textWrap: 'balance',
        ...sz,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default SectionHeading
