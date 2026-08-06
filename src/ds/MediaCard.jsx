import { Card } from './Card.jsx'

/**
 * MediaCard — a portrait media tile with a legibility scrim and bottom-anchored
 * title + description. Drop a canvas, <img>, or <image-slot> in `media`.
 */
export function MediaCard({
  title,
  description,
  media,
  children,
  ratio = '2/3',
  width,
  tone = 'neutral',
  surface = 1,
  interactive = true,
  scrim = true,
  style = {},
  ...rest
}) {
  return (
    <Card
      tone={tone}
      surface={surface}
      radius="lg"
      interactive={interactive}
      padding="0"
      overflow="hidden"
      style={{ width, aspectRatio: ratio, ...style }}
      {...rest}
    >
      <div style={{ position: 'absolute', inset: 0 }}>{media || children}</div>
      {scrim && (
        <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-scrim)', pointerEvents: 'none' }} />
      )}
      {(title || description) && (
        <div style={{ position: 'absolute', left: 'var(--space-8)', right: 'var(--space-8)', bottom: 'var(--space-8)' }}>
          {title && (
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--fw-bold)',
                fontSize: 'var(--fs-card-title)',
                letterSpacing: '-.3px',
                color: 'var(--ink-100)',
              }}
            >
              {title}
            </div>
          )}
          {description && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-xs)',
                color: 'var(--ink-500)',
                marginTop: 'var(--space-2)',
              }}
            >
              {description}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default MediaCard
