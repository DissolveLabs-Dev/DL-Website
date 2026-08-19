import { Wordmark } from '../ds/Wordmark.jsx'

export function Footer({ goServices, goWork, goAbout }) {
  return (
    <footer
      className="main-footer"
      style={{
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <canvas
        id="seabed-canvas"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}
      ></canvas>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background:
            'linear-gradient(90deg,transparent,#26D0CE 25%,#6BEBE8 50%,#26D0CE 75%,transparent)',
          boxShadow: '0 0 30px rgba(38,208,206,.8)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom,transparent 0%,rgba(2,4,8,.6) 62%,rgba(2,4,8,.85) 100%)',
        }}
      ></div>
      <div style={{ position: 'relative', padding: '0 7vw 60px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          <a
            className="foot-link hit-slop-48"
            style={{ padding: 0 }}
            href="#services"
            onClick={goServices}
          >
            Disciplines
          </a>
          <a
            className="foot-link hit-slop-48"
            style={{ padding: 0 }}
            href="#services"
            onClick={goWork}
          >
            Co-Built Products
          </a>
          <a
            className="foot-link hit-slop-48"
            style={{ padding: 0 }}
            href="#descend"
            onClick={goAbout}
          >
            Partners
          </a>
        </div>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '20px',
            marginTop: '48px',
            paddingTop: '26px',
            borderTop: '1px solid rgba(255,255,255,.08)',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <Wordmark
              variant="serif"
              size="clamp(24px,3.2vw,38px)"
              color="#26D0CE"
              style={{ lineHeight: '.9' }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'Sora,sans-serif',
                fontWeight: 700,
                fontSize: 'var(--fs-lg)',
                letterSpacing: '-0.2px',
                color: '#8EA6AD',
              }}
            >
              Ideas,
              <span style={{ color: '#26D0CE' }}>dissolved</span> into products.
            </div>
            <div
              style={{
                fontFamily: 'Manrope',
                fontSize: 'var(--fs-xs)',
                color: '#3C4A55',
                marginTop: '12px',
              }}
            >
              © 2026 Dissolve Labs
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <a
              href="mailto:team@dissolvelabs.studio"
              className="hit-slop-48"
              style={{ fontFamily: 'Manrope', fontSize: 'var(--fs-base)', color: '#26D0CE' }}
            >
              team@dissolvelabs.studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
