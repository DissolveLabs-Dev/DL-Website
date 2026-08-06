import { useState } from 'react'
import { GlassPanel } from './GlassPanel.jsx'
import { Wordmark } from './Wordmark.jsx'
import { Button } from './Button.jsx'

function NavLink({ children, ...rest }) {
  const [hover, setHover] = useState(false)
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--fw-medium)',
        fontSize: 'var(--fs-sm)',
        color: hover ? 'var(--ink-100)' : 'var(--ink-300)',
        cursor: 'pointer',
        padding: '6px 12px',
        borderRadius: '20px',
        background: hover ? 'var(--nav-hover-bg, rgba(38, 208, 206, 0.12))' : 'transparent',
        transition: 'color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft)',
      }}
      {...rest}
    >
      {children}
    </span>
  )
}

/**
 * NavBar — the floating frosted pill nav: wordmark, links, and a primary CTA.
 * Composes GlassPanel + Wordmark + Button. Fixed & centred by default.
 */
export function NavBar({ links = [], cta, onBrandClick, fixed = true, style = {}, ...rest }) {
  const fixedStyle = fixed
    ? { position: 'fixed', top: 'var(--space-9)', left: '50%', transform: 'translateX(-50%)', zIndex: 200 }
    : {}
  return (
    <GlassPanel
      variant="nav"
      as="nav"
      padding="11px 12px 11px 26px"
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', ...fixedStyle, ...style }}
      {...rest}
    >
      <Wordmark onClick={onBrandClick} />
      {links.length > 0 && (
        <div style={{ display: 'flex', gap: '0px' }}>
          {links.map((l, i) => (
            <NavLink key={i} onClick={l.onClick}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
      {cta && (
        <Button size="sm" onClick={cta.onClick} href={cta.href}>
          {cta.label}
        </Button>
      )}
    </GlassPanel>
  )
}

export default NavBar
