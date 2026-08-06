import { Button, Eyebrow, SectionHeading } from '../ds/index.js'

export function Hero({ heroA, heroB, heroC, goWork, goContact }) {
  return (
    <section id="hero"
      style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'flex-start', padding: '150px 8vw 140px', overflow: 'hidden' }}>
      <canvas id="hero-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}></canvas>

      {heroA && (
        <div className="hero-inner-container" style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
          <Eyebrow>End-to-End Design &amp; Product Partner</Eyebrow>
          <SectionHeading size="display" as="h1" style={{ marginTop: '22px' }}>
            Ideas, <span style={{ background: 'linear-gradient(100deg,#33E0DE,#0E9AA7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>dissolved</span> into products.
          </SectionHeading>
          <p style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.6, color: 'var(--ink-400)', marginTop: '28px', maxWidth: '560px' }}>
            We embed as design co-founders to build bespoke software, AI systems, and digital products alongside ambitious teams.</p>
          <div className="hero-action-buttons">
            <Button variant="primary" size="md" onClick={goContact}>Partner With Us</Button>
            <Button variant="secondary" size="md" onClick={goWork}>Co-Build With Us</Button>
          </div>
          <div className="hero-partner-text"
            style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '34px', fontFamily: 'Manrope', fontSize: 'var(--fs-xs)', letterSpacing: '.3px', color: 'var(--ink-100)' }}>
            <span style={{ width: '34px', height: '1px', background: 'rgba(107,235,232,.5)' }}></span>
            Embedded as design partners across fintech, robotics, health &amp; applied AI
          </div>
        </div>
      )}

      {heroB && (
        <div className="hero-inner-container"
          style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Eyebrow>End-to-End Design &amp; Product Partner</Eyebrow>
          <SectionHeading size="display" as="h1" align="center" style={{ marginTop: '24px' }}>
            Ideas, <span style={{ background: 'linear-gradient(100deg,#33E0DE,#0E9AA7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>dissolved</span><br />into products.
          </SectionHeading>
          <p style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.6, color: 'var(--ink-400)', margin: '28px auto 0', maxWidth: '600px' }}>
            Co-founding and engineering bespoke software, AI systems, and digital products alongside teams driven to lead.</p>
          <div className="hero-action-buttons" style={{ justifyContent: 'center' }}>
            <Button variant="primary" size="lg" pulse={true} onClick={goContact}>Partner With Us</Button>
            <Button variant="ghost" size="lg" onClick={goWork}>Co-Build With Us</Button>
          </div>
        </div>
      )}

      {heroC && (
        <div className="hero-inner-container"
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '60px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            <Eyebrow>End-to-End Design &amp; Product Partner</Eyebrow>
            <SectionHeading size="display" as="h1" style={{ marginTop: '22px' }}>
              Ideas, <span style={{ background: 'linear-gradient(100deg,#33E0DE,#0E9AA7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>dissolved</span> into products.
            </SectionHeading>
            <p style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.6, color: 'var(--ink-400)', marginTop: '26px', maxWidth: '520px' }}>
              We embed as design co-founders to architect software, robotics, and applied-AI systems with teams that refuse to move slowly.</p>
            <div className="hero-action-buttons">
              <Button variant="primary" size="md" onClick={goContact}>Partner With Us</Button>
              <Button variant="secondary" size="md" onClick={goWork}>Co-Build With Us</Button>
            </div>
          </div>
          <div className="hero-c-rail" style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '270px' }}>
            <div
              style={{ border: '1px solid rgba(38,208,206,.28)', borderRadius: '16px', background: 'rgba(6,15,24,.55)', backdropFilter: 'blur(14px)', padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '32px', color: '#F2F7F8', letterSpacing: '-1px' }}>42<span
                style={{ color: '#33E0DE' }}>+</span></div>
              <div style={{ fontFamily: 'Manrope', fontSize: 'var(--fs-xs)', color: '#8EA6AD', marginTop: '4px' }}>products co-built &amp; scaled end-to-end</div>
            </div>
            <div
              style={{ border: '1px solid rgba(38,208,206,.28)', borderRadius: '16px', background: 'rgba(6,15,24,.55)', backdropFilter: 'blur(14px)', padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '32px', color: '#F2F7F8', letterSpacing: '-1px' }}>~6<span
                style={{ color: '#33E0DE' }}>{' wk'}</span></div>
              <div style={{ fontFamily: 'Manrope', fontSize: 'var(--fs-xs)', color: '#8EA6AD', marginTop: '4px' }}>to a live co-owned release</div>
            </div>
            <div
              style={{ border: '1px solid rgba(38,208,206,.28)', borderRadius: '16px', background: 'rgba(6,15,24,.55)', backdropFilter: 'blur(14px)', padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '32px', color: '#F2F7F8', letterSpacing: '-1px' }}>9</div>
              <div style={{ fontFamily: 'Manrope', fontSize: 'var(--fs-xs)', color: '#8EA6AD', marginTop: '4px' }}>industries, one dedicated partner team</div>
            </div>
          </div>
        </div>
      )}

      <div id="scroll-ind"
        style={{ position: 'absolute', bottom: '96px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', transition: 'opacity .4s', zIndex: 1 }}>
        <div
          style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: 'var(--fs-eyebrow)', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--ink-100)' }}>
          Descend ↓</div>
        <div
          style={{ width: '1px', height: '46px', margin: '14px auto 0', background: 'linear-gradient(to bottom,#33E0DE,transparent)', animation: 'scrollLine 2.4s ease-in-out infinite', transformOrigin: 'top' }}>
        </div>
      </div>

      <div className="logo-strip-container" aria-label="Trusted by leading organizations">
        <div className="logo-track">
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/y-combinator-seeklogo.webp"
            alt="Y Combinator" style={{ height: '80px' }} decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/harvard-university-seeklogo.svg"
            alt="Harvard University" style={{ height: '65px' }} decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/harvard-innovation-lab.webp"
            alt="Harvard Innovation Lab" decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/World-bank-logo.svg"
            alt="World Bank" style={{ height: '110px' }} decoding="async" />
          <img className="logo-item" src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/mit.png"
            alt="MIT" decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/mit-delta-v.webp" alt="MIT Delta V"
            decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/northeastern-university.png"
            alt="Northeastern University" decoding="async" />
          <img className="logo-item logo-lg"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/international-monetary-fund-seeklogo.svg"
            alt="International Monetary Fund" decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/TechCrunch-Logo.wine.svg"
            alt="TechCrunch" decoding="async" />
          {/* "cambridge" renders in solid white in the source asset, invisible
              on this strip's light-teal background. A light-theme copy with
              that wordmark recoloured dark (public/cambridge-innovation-
              center-light.png) swaps in via .theme-swap-light/-dark — see
              02-site.css. */}
          <img className="logo-item theme-swap-dark"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/cambridge-innovation-center.png"
            alt="Cambridge Innovation Center" decoding="async" />
          <img className="logo-item theme-swap-light"
            src="/cambridge-innovation-center-light.png"
            alt="Cambridge Innovation Center" decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/world-summit-ai.webp"
            alt="World Summit AI" decoding="async" />
          <img className="logo-item" src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/mtc-hex.png"
            alt="Maryland Tech Council" decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/aws-gen-ai.webp" alt="AWS Gen AI"
            decoding="async" />

          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/y-combinator-seeklogo.webp"
            alt="Y Combinator" style={{ height: '80px' }} decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/harvard-university-seeklogo.svg"
            alt="Harvard University" style={{ height: '65px' }} decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/harvard-innovation-lab.webp"
            alt="Harvard Innovation Lab" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/World-bank-logo.svg"
            alt="World Bank" style={{ height: '110px' }} decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/mit.png" alt="MIT" decoding="async"
            loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/mit-delta-v.webp" alt="MIT Delta V"
            decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/northeastern-university.png"
            alt="Northeastern University" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item logo-lg" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/international-monetary-fund-seeklogo.svg"
            alt="International Monetary Fund" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/TechCrunch-Logo.wine.svg"
            alt="TechCrunch" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item theme-swap-dark" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/cambridge-innovation-center.png"
            alt="Cambridge Innovation Center" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item theme-swap-light" aria-hidden="true"
            src="/cambridge-innovation-center-light.png"
            alt="Cambridge Innovation Center" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/world-summit-ai.webp"
            alt="World Summit AI" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/mtc-hex.png"
            alt="Maryland Tech Council" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/aws-gen-ai.webp" alt="AWS Gen AI"
            decoding="async" loading="lazy" fetchPriority="low" />
        </div>
      </div>
    </section>
  )
}

export default Hero
