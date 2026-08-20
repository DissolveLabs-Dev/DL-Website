import { Button, Eyebrow, SectionHeading } from '../ds/index.js'

export function Hero({ goWork, goContact }) {
  return (
    <section id="hero"
      style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'var(--section-y-lg) var(--gutter) var(--section-y)', overflow: 'hidden' }}>
      <canvas id="hero-canvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}></canvas>

      <div className="hero-inner-container hero-layout-anchored" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-copy" style={{ maxWidth: '820px' }}>
          <Eyebrow>End-to-End Design &amp; Product Partner</Eyebrow>
          <SectionHeading size="display" as="h1" style={{ marginTop: '22px' }}>
            Ideas, <span className="brand-accent">dissolved</span> into products.
          </SectionHeading>
        </div>
        <div className="hero-action-buttons">
          <Button variant="primary" size="md" onClick={goContact}>Partner With Us</Button>
          <Button variant="secondary" size="md" onClick={goWork}>Co-Build With Us</Button>
        </div>
      </div>

      <div className="logo-strip-container" aria-label="Trusted by leading organizations">
        <div className="logo-track">
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/y-combinator-seeklogo.webp"
            alt="Y Combinator" decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/harvard-university-seeklogo.svg"
            alt="Harvard University" decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/harvard-innovation-lab.webp"
            alt="Harvard Innovation Lab" decoding="async" />
          <img className="logo-item"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/World-bank-logo.svg"
            alt="World Bank" decoding="async" />
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
            alt="Y Combinator" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/harvard-university-seeklogo.svg"
            alt="Harvard University" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/harvard-innovation-lab.webp"
            alt="Harvard Innovation Lab" decoding="async" loading="lazy" fetchPriority="low" />
          <img className="logo-item" aria-hidden="true"
            src="https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/World-bank-logo.svg"
            alt="World Bank" decoding="async" loading="lazy" fetchPriority="low" />
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
