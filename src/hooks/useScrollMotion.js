import { useEffect } from 'react'

/**
 * GSAP section reveals + soft parallax for depth canvases.
 * Replaces the flat IntersectionObserver `.reveal.in` snap with a scrubbed
 * rise, while keeping the same class hooks depth-engine already paints.
 * GSAP loads async so it stays out of the critical path bundle.
 */
export function useScrollMotion() {
  useEffect(() => {
    let cancelled = false
    const tweens = []
    let onRefresh = null

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const reveals = gsap.utils.toArray('.reveal')

      if (!reduced) {
        reveals.forEach((el) => {
          const tween = gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28, filter: 'blur(6px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
                once: true,
                onEnter: () => el.classList.add('in'),
              },
            },
          )
          tweens.push(tween)
        })

        const hero = document.getElementById('hero-canvas')
        if (hero) {
          tweens.push(
            gsap.to(hero, {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            }),
          )
        }
      } else {
        reveals.forEach((el) => {
          el.classList.add('in')
          gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'filter' })
        })
      }

      onRefresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', onRefresh)
      requestAnimationFrame(onRefresh)
    }

    setup()

    return () => {
      cancelled = true
      if (onRefresh) window.removeEventListener('load', onRefresh)
      tweens.forEach((t) => t.scrollTrigger?.kill())
      tweens.forEach((t) => t.kill())
    }
  }, [])
}
