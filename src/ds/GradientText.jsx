/**
 * GradientText — clips the signature teal gradient onto its text. Use to
 * emphasise a single word inside a heading ("dissolved", "AI").
 */
export function GradientText({ children, as: Tag = 'span', style = {}, ...rest }) {
  return (
    <Tag
      style={{
        background: 'var(--grad-teal-text)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default GradientText
