import { Fragment, memo } from 'react'
import { Eyebrow } from '../ds/Eyebrow.jsx'
import { SectionHeading } from '../ds/SectionHeading.jsx'
import { useAutoMarquee } from '../hooks/useAutoMarquee.js'

// legacy L1268-1627. All 16 `.ev-card` DOM nodes (8 real events + 8
// `aria-hidden` duplicates appended so the CSS marquee track loops
// seamlessly) share one identical structural shape and differ only in
// image/alt/tag/title/subheading — a data array + map produces byte-identical
// output to a literal transcription, per MIGRATION_PLAN.md conversion rules.
// Note: the migration plan's table (§2) labels this "31x ev-card", but the
// legacy source in this exact line range contains only 16 — 8 authored cards
// plus their 8 duplicates. Ported from what is actually present in the range.
//
// `dupAlt` on the TechCrunch entry preserves a real source quirk: the
// duplicate card's image alt (L1608) is "TechCrunch Disrupt Conference",
// while the original card's alt (L1445) is "TechCrunch Spotlight" — the two
// are NOT identical in the legacy markup, so it is not homogenised here.
//
// `splitDot()` reproduces splitEventSubheadings() (legacy L3733-3739): that
// script only rewrites the direct-child <div> of `.ev-card` whose inline
// style contains "top:18px" (the tag/label div, e.g. "Accelerators ·
// Cambridge") — replacing " · " with <br>. The bottom `.ev-more` caption
// (e.g. "MIT · Cambridge") is NOT matched by that selector (its style has
// `margin-top`, not `top:18px`) and is therefore left with a literal "·".
function splitDot(text) {
  const parts = text.split('·').map((part) => part.trim())
  if (parts.length === 1) return text
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ))
}

const CARD_HEIGHT = 'clamp(320px, 28vw, 440px)'

const CARD_SIZES = {
  narrow: { width: 'clamp(260px, 20vw, 320px)' },
  wide: { width: 'clamp(520px, 42vw, 680px)' },
}

const CARD_BASE = {
  flex: '0 0 auto',
  height: CARD_HEIGHT,
  position: 'relative',
  background: '#081A2C',
}

const IMG_STYLE = {
  position: 'absolute',
  inset: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  pointerEvents: 'none',
}

const GRADIENT_STYLE = {
  position: 'absolute',
  inset: '0',
  background: 'linear-gradient(to top,#04101c 18%,rgba(4,16,28,.2) 60%,transparent 82%)',
}

const TAG_STYLE = {
  position: 'absolute',
  left: '18px',
  top: '18px',
  fontFamily: 'Sora',
  fontWeight: '600',
  fontSize: 'var(--fs-2xs)',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#5CC6C4',
  background: 'rgba(4,16,28,.7)',
  padding: '4px 10px',
}

const CAPTION_WRAP_STYLE = {
  position: 'absolute',
  left: '18px',
  right: '18px',
  bottom: '18px',
}

const TITLE_STYLE = {
  fontFamily: 'Sora',
  fontWeight: '700',
  fontSize: '20px',
  color: '#F2F7F8',
  letterSpacing: '-.3px',
}

const SUBHEADING_STYLE = {
  fontFamily: 'Manrope',
  fontSize: 'var(--fs-eyebrow)',
  color: '#6BEBE8',
  marginTop: '6px',
}

const events = [
  {
    key: 'mit-delta-v',
    size: 'wide',
    img: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/MIT%20Delta%20V%20Team%20with%20Center%20of%20Entrepreneurship%20Head%20Bill%20Aulet_.webp',
    alt: 'MIT Delta V',
    tag: 'Accelerators · Cambridge',
    title: 'MIT Delta V',
    subheading: 'MIT · Cambridge',
  },
  {
    key: 'harvard-leadership-course',
    size: 'narrow',
    img: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/Harvard%20Leadership%20Course-%20Masters%20of%20Management.webp',
    alt: 'Harvard Leadership Course',
    tag: 'Incubators · Boston',
    title: 'Harvard Leadership Course',
    subheading: 'Harvard · Boston',
  },
  {
    key: 'yc-ai-startup-school',
    size: 'narrow',
    img: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/Y%20Combinator%20AI%20Startup%20School_s%20AWS%20After%20Party.webp',
    alt: 'AI Startup school',
    tag: 'Venture · Silicon Valley',
    title: 'Y Combinator AI Startup School',
    subheading: 'San Francisco · CA',
  },
  {
    key: 'us-tech-hubs',
    size: 'wide',
    img: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/Instacart%20Headquarter%20San%20Francisco.webp',
    alt: 'US Tech Hubs',
    tag: 'Ecosystem · US Hubs',
    title: 'US Tech Hubs - Instacart',
    subheading: 'Boston · NYC · SF',
  },
  {
    key: 'world-bank-spring-meeting',
    size: 'narrow',
    img: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/World%20Bank%20Group%20-%20Spring%20Meetings%202025.webp',
    alt: 'World Bank Spring Meeting',
    tag: 'Global · Enterprise',
    title: 'World Bank Spring Meeting',
    subheading: 'Washington · DC',
  },
  {
    key: 'cic-cambridge',
    size: 'wide',
    img: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/Cambridge%20Innovation%20Center%20Hackathon%20Win..%20picture%20from%20during%20presentation.webp',
    alt: 'CIC Cambridge',
    tag: 'Hubs · Cambridge',
    title: 'CIC Cambridge',
    subheading: 'Kendall Square · MA',
  },
  {
    key: 'aws-gen-ai-loft',
    size: 'narrow',
    img: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/AWS%20Gen%20AI%20Loft%20after%20winning%20a%20hackathon.webp',
    alt: 'AWS Gen AI Loft',
    tag: 'Frontier AI · Summits',
    title: 'AWS Gen AI Loft',
    subheading: 'San Francisco · CA',
  },
  {
    key: 'techcrunch-disrupt-conference',
    size: 'wide',
    img: 'https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/TechCrunch%20Disrupt%20Conference.webp',
    alt: 'TechCrunch Spotlight',
    dupAlt: 'TechCrunch Disrupt Conference',
    tag: 'Recognition · Media',
    title: 'TechCrunch Disrupt Conference',
    subheading: 'San Francisco · CA',
  },
]

const EvCard = memo(function EvCard({ size = 'wide', img, alt, tag, title, subheading, ariaHidden }) {
  return (
    <div
      className="ev-card"
      style={{ ...CARD_BASE, ...CARD_SIZES[size] }}
      aria-hidden={ariaHidden ? 'true' : undefined}
    >
      <img src={img} alt={alt} loading="lazy" style={IMG_STYLE} decoding="async" fetchPriority="low" />
      <div style={GRADIENT_STYLE}></div>
      <div style={TAG_STYLE}>{splitDot(tag)}</div>
      <div style={CAPTION_WRAP_STYLE}>
        <div style={TITLE_STYLE}>{title}</div>
        <div className="ev-more" style={SUBHEADING_STYLE}>
          {subheading}
        </div>
      </div>
    </div>
  )
})

export function Events() {
  const { ref: marqueeRef, handlers: marqueeHandlers } = useAutoMarquee()

  return (
    <section id="events" style={{ position: 'relative', zIndex: '1', padding: 'var(--section-y) 0 56px' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px', padding: '0 var(--gutter)' }}>
        <Eyebrow>Below the surface</Eyebrow>
        <SectionHeading size="lg" align="center" style={{ marginTop: '16px' }}>
          In{' '}the{' '}rooms{' '}where{' '}it’s{' '}built
        </SectionHeading>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: 'var(--fs-md)',
            lineHeight: '1.6',
            color: 'var(--ink-400)',
            margin: '18px auto 0',
            maxWidth: '600px',
          }}
        >
          The conferences, summits, and communities where Dissolve Labs shares our co-building insights — and
          connects with future product co-founders.
        </p>
      </div>
      <div
        ref={marqueeRef}
        className="ev-marquee"
        role="region"
        aria-label="Event highlights gallery"
        {...marqueeHandlers}
      >
        <div className="ev-track">
          {events.map((event) => (
            <EvCard
              key={event.key}
              size={event.size}
              img={event.img}
              alt={event.alt}
              tag={event.tag}
              title={event.title}
              subheading={event.subheading}
            />
          ))}

          {events.map((event) => (
            <EvCard
              key={`${event.key}-dup`}
              size={event.size}
              img={event.img}
              alt={event.dupAlt || event.alt}
              tag={event.tag}
              title={event.title}
              subheading={event.subheading}
              ariaHidden
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
