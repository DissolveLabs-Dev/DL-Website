import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react'
import { GlassPanel } from './GlassPanel.jsx'
import { Wordmark } from './Wordmark.jsx'
import { Button } from './Button.jsx'

const DynamicText = lazy(() =>
  import('../components/DynamicText.jsx').then((mod) => ({ default: mod.DynamicText })),
)

function MenuItem({ children, onClick }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        border: 'none',
        background: 'transparent',
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--fw-medium)',
        fontSize: 'var(--fs-sm)',
        color: 'var(--ink-300)',
        cursor: 'pointer',
        padding: '10px 14px',
        borderRadius: '12px',
        transition: 'color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--nav-hover-bg, rgba(38, 208, 206, 0.12))'
        e.currentTarget.style.color = 'var(--ink-100)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--ink-300)'
      }}
    >
      {children}
    </button>
  )
}

/**
 * NavBar — the floating frosted pill nav: wordmark, dynamic greeting, dropdown.
 * Composes GlassPanel + Wordmark + Button. Fixed & centred by default.
 */
export function NavBar({ links = [], cta, onBrandClick, fixed = true, style = {}, ...rest }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const menuId = useId()
  const items = [...links, ...(cta ? [cta] : [])]
  const fixedStyle = fixed
    ? { position: 'fixed', top: 'var(--space-9)', left: '50%', transform: 'translateX(-50%)', zIndex: 200 }
    : {}

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} style={{ ...fixedStyle, ...style }}>
      <GlassPanel
        variant="nav"
        as="nav"
        padding="11px 20px"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          width: 'min(560px, calc(100vw - 48px))',
          position: 'relative',
        }}
        {...rest}
      >
        <Wordmark onClick={onBrandClick} />

        <Suspense fallback={<span aria-hidden="true" style={{ width: '240px', flexShrink: 0 }} />}>
          <DynamicText />
        </Suspense>

        {items.length > 0 ? (
          <button
            type="button"
            className="hit-slop-48"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '5px',
              border: 'none',
              background: open ? 'var(--nav-hover-bg, rgba(38, 208, 206, 0.12))' : 'transparent',
              cursor: 'pointer',
              padding: '10px 12px',
              borderRadius: '20px',
              transition: 'background var(--dur-fast) var(--ease-soft)',
              flexShrink: 0,
            }}
          >
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--ink-400)',
                  borderRadius: '1px',
                  transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
                  transition: 'transform 180ms cubic-bezier(.2,.8,.2,1), background 180ms ease',
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--ink-400)',
                  borderRadius: '1px',
                  opacity: open ? 0 : 1,
                  transition: 'opacity 140ms ease, background 180ms ease',
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--ink-400)',
                  borderRadius: '1px',
                  transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
                  transition: 'transform 180ms cubic-bezier(.2,.8,.2,1), background 180ms ease',
                }}
              />
            </button>
          ) : (
          <div style={{ width: '48px', flexShrink: 0 }} aria-hidden="true" />
        )}

        {open && items.length > 0 && (
          <div
            id={menuId}
            role="menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              right: 0,
              width: '100%',
              padding: '10px',
              borderRadius: '18px',
              background: 'var(--surface-nav)',
              border: '1px solid var(--line-teal-soft)',
              boxShadow: 'var(--shadow-nav)',
              backdropFilter: 'var(--blur-nav)',
              WebkitBackdropFilter: 'var(--blur-nav)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxSizing: 'border-box',
            }}
          >
            {links.map((l, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  setOpen(false)
                  l.onClick?.()
                }}
              >
                {l.label}
              </MenuItem>
            ))}
            {cta && (
              <div style={{ padding: '6px 4px 2px' }}>
                <Button
                  size="sm"
                  full
                  onClick={() => {
                    setOpen(false)
                    cta.onClick?.()
                  }}
                  href={cta.href}
                >
                  {cta.label}
                </Button>
              </div>
            )}
          </div>
        )}
      </GlassPanel>
    </div>
  )
}

export default NavBar
