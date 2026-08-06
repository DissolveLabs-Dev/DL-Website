import { useState } from 'react'
import { Eyebrow, SectionHeading } from '../ds/index.js'

// H.264 on purpose. AV1 measured 28% smaller here at equal VMAF, but AV1
// hardware decode is still far from universal, and software-decoding one of
// four simultaneous background loops is a real stutter risk on older GPUs.
// Smoothness wins over 121 KB. See
// https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/co-founding-*.webm
// if revisiting. (Ported from a comment inside the first svc-card <video> in
// legacy/index.legacy.html.)
const SERVICES = [
  {
    label: 'Software',
    number: '01',
    title: 'Co-Founding & Software Engineering',
    desc: 'We co-own and engineer tailored software that scales alongside your vision — from core infrastructure to market-defining SaaS platforms.',
    poster:
      'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/co-founding-software-engineering-poster.webp',
    src: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/co-founding-software-engineering.mp4?v=main-original',
    videoStyle: {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      pointerEvents: 'none',
    },
  },
  {
    label: 'Robotics',
    number: '02',
    title: 'Autonomous Systems & Robotics',
    desc: 'We build intelligent robotic systems with you, extending physical capability and co-owning operational scale.',
    poster: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/autonomous-systems-robotics-poster.webp',
    src: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/autonomous-systems-robotics.mp4?v=main-original',
    videoStyle: {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      pointerEvents: 'none',
    },
  },
  {
    label: 'AI',
    number: '03',
    title: 'Applied AI Systems',
    desc: 'From RAG pipelines to multimodal agents — we co-deploy AI systems with real skin in the game for long-term growth.',
    poster: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/applied-ai-systems-poster.webp',
    src: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/applied-ai-systems.mp4?v=main-original',
    videoStyle: {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      pointerEvents: 'none',
    },
  },
  {
    label: 'Product',
    number: '04',
    title: 'Co-Product Incubation & Growth',
    desc: 'Concept to market leadership. We co-design, prototype, and iterate with real investment in your long-term product success.',
    poster:
      'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/co-product-incubation-growth-poster.webp',
    src: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Videos/co-product-incubation-growth.mp4?v=smooth-30fps',
    videoStyle: {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: 'scale(1.08)',
      transformOrigin: 'center',
      pointerEvents: 'none',
    },
  },
]

export function Services() {
  const [activeCard, setActiveCard] = useState(null)

  return (
    <section id="services" style={{ position: 'relative', zIndex: 1, padding: '80px 6vw 80px' }}>
      <div className="reveal" style={{ maxWidth: '720px', margin: '0 auto 60px', textAlign: 'center' }}>
        <Eyebrow>Mid-water — how we build together</Eyebrow>
        <SectionHeading size="lg" align="center" style={{ marginTop: '16px' }}>
          End-to-end design &amp; product partnership
        </SectionHeading>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: 'var(--fs-md)',
            lineHeight: '1.6',
            color: 'var(--ink-400)',
            margin: '18px auto 0',
            maxWidth: '560px',
          }}
        >
          Four co-founding disciplines, one dedicated partner team. Hover a card to explore.
        </p>
      </div>

      <div className="svc-pair" style={{ display: 'flex', gap: '20px', height: 'auto', marginBottom: '22px' }}>
        {SERVICES.slice(0, 2).map((svc, i) => (
          <div
            key={svc.number}
            className={`svc-card${activeCard === i ? ' active' : ''}`}
            style={{
              flex: '1 1 50%',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(38,208,206,.4)',
              background: '#050e18',
            }}
            onClick={() => setActiveCard((c) => (c === i ? null : i))}
          >
            <video
              className="svc-video"
              poster={svc.poster}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              preload="auto"
              style={svc.videoStyle}
            >
              <source src={svc.src} type="video/mp4" />
            </video>
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: 'linear-gradient(to top,#03090f 18%,rgba(3,9,15,.2) 55%,transparent 80%)',
              }}
            ></div>
            <div
              className="svc-header-meta"
              style={{
                position: 'absolute',
                top: '26px',
                left: '28px',
                right: '28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontFamily: 'Sora',
                  fontWeight: '600',
                  fontSize: 'var(--fs-eyebrow)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#5CC6C4',
                }}
              >
                {svc.label}
              </span>
              <span style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: 'var(--fs-xs)', color: 'rgba(139,166,173,.5)' }}>
                {svc.number}
              </span>
            </div>
            <div className="svc-bottom" style={{ position: 'absolute', left: '28px', right: '28px', bottom: '28px' }}>
              <h3
                style={{
                  fontFamily: 'Sora',
                  fontWeight: '700',
                  fontSize: 'clamp(16px,2.5vw,40px)',
                  color: '#F2F7F8',
                  letterSpacing: '-1px',
                }}
              >
                {svc.title}{' '}
                <span className="svc-arrow" style={{ display: 'inline-block', opacity: '.4', color: '#33E0DE' }}>
                  →
                </span>
              </h3>
              <p
                className="svc-desc"
                style={{
                  fontFamily: 'Manrope',
                  fontSize: 'var(--fs-lg)',
                  lineHeight: '1.6',
                  color: '#9BA8B4',
                  marginTop: '14px',
                  maxWidth: '440px',
                }}
              >
                {svc.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="svc-pair" style={{ display: 'flex', gap: '20px', height: 'auto' }}>
        {SERVICES.slice(2, 4).map((svc, idx) => {
          const i = idx + 2
          return (
            <div
              key={svc.number}
              className={`svc-card${activeCard === i ? ' active' : ''}`}
              style={{
                flex: '1 1 50%',
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(38,208,206,.4)',
                background: '#050e18',
              }}
              onClick={() => setActiveCard((c) => (c === i ? null : i))}
            >
              <video
                className="svc-video"
                poster={svc.poster}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                preload="auto"
                style={svc.videoStyle}
              >
                <source src={svc.src} type="video/mp4" />
              </video>
              <div
                style={{
                  position: 'absolute',
                  inset: '0',
                  background: 'linear-gradient(to top,#03090f 18%,rgba(3,9,15,.2) 55%,transparent 80%)',
                }}
              ></div>
              <div
                className="svc-header-meta"
                style={{
                  position: 'absolute',
                  top: '26px',
                  left: '28px',
                  right: '28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Sora',
                    fontWeight: '600',
                    fontSize: 'var(--fs-eyebrow)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#5CC6C4',
                  }}
                >
                  {svc.label}
                </span>
                <span
                  style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: 'var(--fs-xs)', color: 'rgba(139,166,173,.5)' }}
                >
                  {svc.number}
                </span>
              </div>
              <div
                className="svc-bottom"
                style={{ position: 'absolute', left: '28px', right: '28px', bottom: '28px' }}
              >
                <h3
                  style={{
                    fontFamily: 'Sora',
                    fontWeight: '700',
                    fontSize: 'clamp(16px,2.5vw,40px)',
                    color: '#F2F7F8',
                    letterSpacing: '-1px',
                  }}
                >
                  {svc.title}{' '}
                  <span className="svc-arrow" style={{ display: 'inline-block', opacity: '.4', color: '#33E0DE' }}>
                    →
                  </span>
                </h3>
                <p
                  className="svc-desc"
                  style={{
                    fontFamily: 'Manrope',
                    fontSize: 'var(--fs-lg)',
                    lineHeight: '1.6',
                    color: '#9BA8B4',
                    marginTop: '14px',
                    maxWidth: '440px',
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Services
