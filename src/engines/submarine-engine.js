// Dissolve Labs — submarine scroll narrative.
// GSAP ScrollTrigger owns pin + scrub. Anime.js owns compartment reveals.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, stagger } from 'animejs'

gsap.registerPlugin(ScrollTrigger)

if (!window.__submarineEngineLoaded) {
  window.__submarineEngineLoaded = true

  window.phaseData = [
    {
      phase: '01',
      label: 'Alignment',
      heading: 'Strategic Immersion & Skin in the Game',
      body: "We don't take briefs or bill hourly packages. We dissect product physics, unit economics, and target markets alongside you as equal co-architects before code is committed.",
      bullets: ['No vendor briefs', 'Co-ownership first', 'Sprint 0 Alignment'],
    },
    {
      phase: '02',
      label: 'Velocity',
      heading: 'High-Velocity Architecture & Prototyping',
      body: 'Zero deck theatre. We translate whiteboards into production-grade frontends, AI pipelines, and responsive design systems in days, validating core user loops with real software.',
      bullets: ['Days not quarters', 'Live software', 'Rapid Prototyping'],
    },
    {
      phase: '03',
      label: 'Execution',
      heading: 'Embedded Co-Building & Continuous Shipping',
      body: 'We plug senior design partners and engineers directly into your codebase. Continuous deployment, SOC 2 compliance readiness, and zero hand-off friction.',
      bullets: ['Senior team only', 'Direct repo commit', 'CI/CD Sprints'],
    },
    {
      phase: '04',
      label: 'Stewardship',
      heading: 'Market Launch, Scale & Ownership Stewardship',
      body: 'Launch is day zero. We monitor real user adoption, optimize cloud infrastructure, and iterate core feature sets with true co-founder commitment long after go-live.',
      bullets: ['Post-launch iteration', 'Long-term stewardship', 'Continuous Scale'],
    },
  ]

  let currentSubmarineState = -1
  window.revealedCompartments = {}
  let triggers = []
  let entryPath = 'right'

  function mobileOffset() {
    return window.innerWidth <= 768 ? 72 : 0
  }

  function iconNodes(content) {
    return content ? content.querySelectorAll('g[stroke="#33E0DE"] *') : []
  }

  function initSubmarineState() {
    document.querySelectorAll('.sub-compartments .comp-content').forEach((content) => {
      content.style.opacity = '0'
      content.setAttribute('opacity', '0')
      content.querySelectorAll('text, circle').forEach((el) => {
        el.setAttribute('opacity', '0')
        el.style.filter = 'none'
      })
      iconNodes(content).forEach((el) => {
        el.style.strokeDasharray = '250'
        el.style.strokeDashoffset = '250'
        el.style.filter = 'none'
        el.style.opacity = '1'
      })
    })
  }

  window.revealCompartment = function (index) {
    const comp = document.querySelector(`.sub-compartments .comp-${index}`)
    if (!comp || comp.getAttribute('data-revealed') === 'true') return
    comp.setAttribute('data-revealed', 'true')

    const cover = comp.querySelector('.comp-cover')
    const coverRect = cover?.querySelector('rect')
    const content = comp.querySelector('.comp-content')
    const texts = content ? content.querySelectorAll('text, circle') : []
    const iconEls = iconNodes(content)

    if (content) {
      content.setAttribute('opacity', '1')
      content.style.opacity = '1'
    }

    // Scanline highlight (original visual)
    let scanline = comp.querySelector('.scanline')
    if (!scanline) {
      scanline = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      scanline.setAttribute('class', 'scanline')
      scanline.setAttribute('opacity', '0')
      scanline.innerHTML = `
        <line x1="0" y1="-10" x2="0" y2="150" stroke="#33E0DE" stroke-width="2" filter="drop-shadow(0 0 6px #33E0DE)"/>
        <polygon points="-5,-10 5,-10 0,-2" fill="#33E0DE"/>
        <polygon points="-5,150 5,150 0,142" fill="#33E0DE"/>
      `
      comp.appendChild(scanline)
    }
    gsap.fromTo(scanline, { opacity: 0 }, { opacity: 0.5, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' })

    if (coverRect) {
      gsap.fromTo(
        coverRect,
        { attr: { width: 170 } },
        {
          attr: { width: 0 },
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            if (cover) {
              cover.setAttribute('opacity', '0')
              cover.style.pointerEvents = 'none'
            }
          },
        },
      )
    }

    if (texts.length) {
      animate(texts, {
        opacity: [0, 1],
        duration: 500,
        delay: stagger(40, { start: 160 }),
        ease: 'outQuad',
      })
    }

    if (iconEls.length) {
      gsap.to(iconEls, {
        strokeDashoffset: 0,
        duration: 0.75,
        delay: 0.12,
        stagger: 0.04,
        ease: 'power2.out',
      })
    }
  }

  window.coverCompartment = function (index) {
    const root = document.querySelector(`.comp-${index}`)
    if (!root) return

    const cover = root.querySelector('.comp-cover')
    const content = root.querySelector('.comp-content')
    if (!cover || !content) return

    const coverRect = cover.querySelector('rect')
    if (coverRect) coverRect.setAttribute('width', '170')
    cover.setAttribute('opacity', '1')
    cover.style.pointerEvents = 'auto'
    cover.style.transform = 'none'

    content.querySelectorAll('text, circle').forEach((el) => {
      el.setAttribute('opacity', '0')
      el.style.filter = 'none'
    })
    iconNodes(content).forEach((el) => {
      el.style.strokeDashoffset = '250'
      el.style.filter = 'none'
    })

    const scanline = root.querySelector('.scanline')
    if (scanline) scanline.setAttribute('opacity', '0')

    root.removeAttribute('data-revealed')
  }

  window.expandCard = function (index) {
    const data = window.phaseData[index - 1]
    if (!data) return

    const container = document.getElementById('submarine-card-container')
    if (!container) return

    const bulletsHtml = data.bullets
      .map(
        (b) =>
          `<div class="sub-bullet">
         <div class="sub-bullet-dot"></div>
         <span class="sub-bullet-text">${b}</span>
       </div>`,
      )
      .join('')

    container.innerHTML = `
      <div class="sub-card-container">
        <div class="sub-phase-badge">
          <span class="sub-phase-text">PHASE ${data.phase} — ${data.label.toUpperCase()}</span>
        </div>
        <h3 class="sub-card-heading">${data.heading}</h3>
        <p class="sub-card-body">${data.body}</p>
        <div class="sub-bullets-grid">${bulletsHtml}</div>
      </div>
    `

    container.classList.add('is-open')
    gsap.killTweensOf(container)
    gsap.fromTo(
      container,
      { opacity: 0, marginTop: 0 },
      { opacity: 1, marginTop: 8, duration: 0.45, ease: 'power2.out', overwrite: true },
    )

    const arrowGroup = document.getElementById('connection-arrow-group')
    if (arrowGroup) {
      const path = document.getElementById('connection-arrow-path')
      const startDot = document.getElementById('connection-start-dot')
      const endArrow = document.getElementById('connection-end-arrow')
      const startX = 255 + (index - 1) * 170
      const startY = 220
      const endX = 500
      const endY = 270
      const d = `M ${startX} ${startY} C ${startX} ${startY + 30}, ${endX} ${endY - 30}, ${endX} ${endY}`
      if (path) path.setAttribute('d', d)
      if (startDot) {
        startDot.setAttribute('cx', startX)
        startDot.setAttribute('cy', startY)
      }
      if (endArrow) endArrow.setAttribute('transform', `translate(${endX}, ${endY})`)
      gsap.to(arrowGroup, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    }
  }

  window.collapseCard = function () {
    const container = document.getElementById('submarine-card-container')
    if (!container) return
    container.classList.remove('is-open')
    gsap.killTweensOf(container)
    gsap.to(container, {
      opacity: 0,
      marginTop: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: true,
    })
    window.setConnectionArrowVisible(false)
  }

  window.setConnectionArrowVisible = function (visible) {
    const arrowGroup = document.getElementById('connection-arrow-group')
    if (!arrowGroup) return
    gsap.to(arrowGroup, { opacity: visible ? 1 : 0, duration: 0.3, ease: 'power2.out', overwrite: true })
  }

  window.updateSubmarineState = function (newStep) {
    if (newStep === currentSubmarineState) return
    const activeCompartment = newStep

    for (let i = 1; i <= 4; i++) {
      if (i <= activeCompartment) {
        if (!window.revealedCompartments[i]) {
          window.revealCompartment(i)
          window.revealedCompartments[i] = true
        }
      } else if (window.revealedCompartments[i]) {
        window.coverCompartment(i)
        window.revealedCompartments[i] = false
      }
    }

    if (activeCompartment > 0) window.expandCard(activeCompartment)
    else window.collapseCard()

    currentSubmarineState = newStep
  }

  function stepFromProgress(progress) {
    const maxStep = 4
    const p = Math.max(0, Math.min(1, progress))
    // Step 1 is active the moment the pin starts; steps 2–4 follow across the rest.
    return Math.min(maxStep, 1 + Math.floor(p * maxStep))
  }

  function progressFromStep(step) {
    const clamped = Math.max(1, Math.min(4, step))
    return (clamped - 0.5) / 4
  }

  const OFFSCREEN_X = 82

  function applySvgPose(svgEl, x, opacity) {
    if (!svgEl) return
    gsap.set(svgEl, {
      x: `${x}vw`,
      y: 0,
      rotation: 0,
      opacity,
      transformOrigin: '50% 50%',
      force3D: true,
      overwrite: 'auto',
    })
  }

  function killTriggers() {
    triggers.forEach((t) => t.kill())
    triggers = []
  }

  function setupScroll() {
    const track = document.getElementById('submarine-track')
    const wrapper = document.querySelector('.submarine-wrapper')
    const svgEl = document.querySelector('.submarine-svg')
    if (!track || !wrapper) return

    killTriggers()
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === track || t.vars?.id?.startsWith?.('sub-')) t.kill()
    })

    const offset = mobileOffset()
    const scrub = 0.35

    applySvgPose(svgEl, OFFSCREEN_X, 0)

    // Approach: sub glides in horizontally as the track nears the pin.
    triggers.push(
      ScrollTrigger.create({
        id: 'sub-enter',
        trigger: track,
        start: 'top bottom',
        end: () => `top top+=${offset}`,
        scrub,
        onUpdate: (self) => {
          const p = self.progress
          const inv = 1 - p
          const side = entryPath === 'right' ? OFFSCREEN_X : -OFFSCREEN_X
          applySvgPose(svgEl, inv * side, Math.min(1, p * 2.2))
          if (p < 0.08) window.updateSubmarineState(0)
        },
        onLeaveBack: () => {
          entryPath = 'right'
          applySvgPose(svgEl, OFFSCREEN_X, 0)
          window.setConnectionArrowVisible(false)
          window.updateSubmarineState(0)
        },
      }),
    )

    // Pinned narrative: five compartment steps scrubbed across the track.
    triggers.push(
      ScrollTrigger.create({
        id: 'sub-pin',
        trigger: track,
        start: () => `top top+=${offset}`,
        end: 'bottom bottom',
        pin: wrapper,
        pinSpacing: false,
        scrub,
        anticipatePin: 1,
        onEnter: () => {
          entryPath = 'left'
          applySvgPose(svgEl, 0, 1)
          window.updateSubmarineState(1)
          window.setConnectionArrowVisible(true)
        },
        onEnterBack: () => {
          entryPath = 'left'
          applySvgPose(svgEl, 0, 1)
          window.updateSubmarineState(1)
          window.setConnectionArrowVisible(true)
        },
        onUpdate: (self) => {
          applySvgPose(svgEl, 0, 1)
          const step = stepFromProgress(self.progress)
          window.updateSubmarineState(step)
          window.setConnectionArrowVisible(step >= 1)
        },
        onLeave: () => {
          applySvgPose(svgEl, 0, 1)
          window.setConnectionArrowVisible(false)
          window.updateSubmarineState(4)
        },
        onLeaveBack: () => {
          applySvgPose(svgEl, 0, 1)
          window.setConnectionArrowVisible(false)
          window.updateSubmarineState(0)
        },
      }),
    )

    // Exit: glide out horizontally after unpin.
    triggers.push(
      ScrollTrigger.create({
        id: 'sub-exit',
        trigger: track,
        start: 'bottom bottom',
        end: () => `bottom+=${window.innerHeight * 0.55} bottom`,
        scrub,
        onUpdate: (self) => {
          const p = self.progress
          applySvgPose(svgEl, p * -OFFSCREEN_X, Math.max(0, 1 - p * 1.35))
          window.setConnectionArrowVisible(false)
        },
      }),
    )
  }

  window.navigateToSubmarineStep = function (delta) {
    const track = document.getElementById('submarine-track')
    const wrapper = document.querySelector('.submarine-wrapper')
    if (!track || !wrapper) return

    let targetStep = currentSubmarineState + delta
    const offset = mobileOffset()
    const sectionTop = track.getBoundingClientRect().top + window.scrollY
    const pinStart = sectionTop - offset
    const pinDistance = Math.max(1, track.offsetHeight - wrapper.offsetHeight)

    if (targetStep <= 0) {
      window.scrollTo({ top: pinStart - window.innerHeight * 0.45, behavior: 'smooth' })
      return
    }
    if (targetStep > 4) {
      window.scrollTo({ top: sectionTop + track.offsetHeight, behavior: 'smooth' })
      return
    }

    const targetProgress = progressFromStep(targetStep)
    window.scrollTo({
      top: pinStart + targetProgress * pinDistance,
      behavior: 'smooth',
    })
  }

  function onKey(e) {
    const track = document.getElementById('submarine-track')
    const wrapper = document.querySelector('.submarine-wrapper')
    if (!track || !wrapper) return

    const pin = ScrollTrigger.getById('sub-pin')
    if (!pin || !pin.isActive) return

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      window.navigateToSubmarineStep(1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      window.navigateToSubmarineStep(-1)
    }
  }

  function boot() {
    initSubmarineState()
    setupScroll()
    window.updateSubmarineState(0)
    ScrollTrigger.refresh()
  }

  window.addEventListener('keydown', onKey)

  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      setupScroll()
      ScrollTrigger.refresh()
    }, 160)
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(boot))
  } else {
    // Delivery mounts just before this dynamic import resolves.
    requestAnimationFrame(() => requestAnimationFrame(boot))
  }
}
