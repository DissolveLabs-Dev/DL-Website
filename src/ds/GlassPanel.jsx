const VARIANTS = {
  nav: {
    background: 'var(--surface-nav)',
    border: '1px solid var(--line-teal-soft)',
    borderRadius: 'var(--radius-pill)',
    boxShadow: 'var(--shadow-nav)',
    blur: 'var(--blur-nav)',
  },
  panel: {
    background: 'var(--surface-panel)',
    border: '1px solid var(--line-teal-faint)',
    borderRadius: 'var(--radius-2xl)',
    boxShadow: 'var(--shadow-panel)',
    blur: 'var(--blur-panel)',
  },
}

/**
 * GlassPanel — the frosted-glass surface. `nav` = the pill bar; `panel` =
 * the large booking / modal container. Real backdrop blur + teal hairline.
 */
export function GlassPanel({ variant = 'panel', padding, as: Tag = 'div', style = {}, children, ...rest }) {
  const v = VARIANTS[variant] || VARIANTS.panel
  return (
    <Tag
      style={{
        background: v.background,
        border: v.border,
        borderRadius: v.borderRadius,
        boxShadow: v.boxShadow,
        backdropFilter: v.blur,
        WebkitBackdropFilter: v.blur,
        padding: padding != null ? padding : variant === 'panel' ? 'var(--pad-card)' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default GlassPanel
