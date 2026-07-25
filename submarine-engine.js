// submarine-engine.js

console.log("Submarine engine script loading... (Using RequestAnimationFrame Wipe)");

// Phase Content Data (attached to window to prevent redeclaration errors in hot-reload)
window.phaseData = [
  {
    phase: '01',
    label: 'Alignment',
    heading: 'Strategic Immersion & Skin in the Game',
    body: 'We don\'t take briefs or bill hourly packages. We dissect product physics, unit economics, and target markets alongside you as equal co-architects before code is committed.',
    bullets: ['No vendor briefs', 'Co-ownership first', 'Sprint 0 Alignment']
  },
  {
    phase: '02',
    label: 'Velocity',
    heading: 'High-Velocity Architecture & Prototyping',
    body: 'Zero deck theatre. We translate whiteboards into production-grade frontends, AI pipelines, and responsive design systems in days, validating core user loops with real software.',
    bullets: ['Days not quarters', 'Live software', 'Rapid Prototyping']
  },
  {
    phase: '03',
    label: 'Execution',
    heading: 'Embedded Co-Building & Continuous Shipping',
    body: 'We plug senior design partners and engineers directly into your codebase. Continuous deployment, SOC 2 compliance readiness, and zero hand-off friction.',
    bullets: ['Senior team only', 'Direct repo commit', 'CI/CD Sprints']
  },
  {
    phase: '04',
    label: 'Stewardship',
    heading: 'Market Launch, Scale & Ownership Stewardship',
    body: 'Launch is day zero. We monitor real user adoption, optimize cloud infrastructure, and iterate core feature sets with true co-founder commitment long after go-live.',
    bullets: ['Post-launch iteration', 'Long-term stewardship', 'Continuous Scale']
  }
];

// Initialize all compartments to their hidden state on load
function initSubmarineState() {
    const contents = document.querySelectorAll('.sub-compartments .comp-content');
    contents.forEach(content => {
        // Ensure content is hidden
        content.style.opacity = '0';
        content.setAttribute('opacity', '0');
        
        const textAndCircles = content.querySelectorAll('text, circle');
        textAndCircles.forEach(el => {
            el.setAttribute('opacity', '0');
            el.style.filter = 'none';
        });
        
        // Ensure icons are prepped for drawing
        const iconGroup = content.querySelector('g[stroke="#33E0DE"]');
        if (iconGroup) {
            iconGroup.querySelectorAll('*').forEach(el => {
                el.style.strokeDasharray = '250';
                el.style.strokeDashoffset = '250';
                el.style.filter = 'none';
            });
        }
    });
}

// Reusable function to trigger the reveal animation
window.revealCompartment = function(index) {
    const comp = document.querySelector(`.sub-compartments .comp-${index}`);
    console.log(`[Submarine Engine] Revealing compartment ${index}`, comp);
    if (!comp) {
        console.warn(`[Submarine Engine] Compartment ${index} not found.`);
        return;
    }
    
    // Toggle state based on data attribute
    const isRevealed = comp.getAttribute('data-revealed') === 'true';
    if (isRevealed) return; // Prevent double trigger
    
    comp.setAttribute('data-revealed', 'true');
    
    const cover = comp.querySelector('.comp-cover');
    const coverRect = cover ? cover.querySelector('rect') : null;
    const content = comp.querySelector('.comp-content');
    
    // Create the scanline effect dynamically
    let scanline = comp.querySelector('.scanline');
    if (!scanline) {
        scanline = document.createElementNS("http://www.w3.org/2000/svg", "g");
        scanline.setAttribute('class', 'scanline');
        scanline.setAttribute('opacity', '0');
        scanline.innerHTML = `
            <line x1="0" y1="-10" x2="0" y2="150" stroke="#33E0DE" stroke-width="2" filter="drop-shadow(0 0 6px #33E0DE)"/>
            <polygon points="-5,-10 5,-10 0,-2" fill="#33E0DE"/>
            <polygon points="-5,150 5,150 0,142" fill="#33E0DE"/>
        `;
        comp.appendChild(scanline);
    }
    
    // Pre-show the content group so its children can animate
    if (content) {
        content.setAttribute('opacity', '1');
        content.style.opacity = '1';
    }
    
    const textAndCircles = content ? content.querySelectorAll('text, circle') : [];
    const iconPaths = content ? content.querySelectorAll('g[stroke="#33E0DE"] *') : [];
    
    const duration = 800; // 800ms
    const start = performance.now();
    
    function tick(now) {
        if (comp.getAttribute('data-revealed') !== 'true') return;
        
        const elapsed = Math.max(0, now - start);
        const progress = Math.min(1, elapsed / duration);
        // Easing: easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        
        // 1. Animate Peel Off (Wipe to the left by shrinking width from the right)
        if (coverRect) {
            const currentWidth = Math.max(0, 170 - (ease * 170));
            coverRect.setAttribute('width', currentWidth);
        }
        
        if (cover) {
            cover.setAttribute('opacity', 1); // Keep solid
            cover.style.transform = 'none'; // No translation
        }
        
        if (scanline) {
            // Scanline can just fade in and out to highlight the reveal
            if (progress < 0.1) scanline.setAttribute('opacity', progress * 10);
            else if (progress > 0.9) scanline.setAttribute('opacity', (1 - progress) * 10);
            else scanline.setAttribute('opacity', '0.5');
        }
        
        // 2. Animate Content (Glow and Opacity)
        textAndCircles.forEach(el => {
            const p = Math.max(0, Math.min(1, (progress - 0.2) * 2)); // Starts at 20%, ends at 70%
            el.setAttribute('opacity', p);
            el.style.filter = `drop-shadow(0 0 ${p * 8}px rgba(51,224,222,${p * 0.8}))`;
        });
        
        // 3. Animate Icons (Draw lines and Glow with unique styles per compartment)
        // Ensure index is an integer
        const idx = parseInt(index);
        
        if (idx === 1) {
            // Alignment -> lines converging inward (animate offset backwards)
            iconPaths.forEach(el => {
                const p = Math.max(0, Math.min(1, (progress - 0.1) * 1.5));
                const dashOffset = -250 + (p * 250); // From negative 250 to 0 (draws inwards)
                el.style.strokeDashoffset = dashOffset;
                el.style.filter = `drop-shadow(0 0 ${p * 5}px rgba(51,224,222,${p * 0.6}))`;
            });
        } else if (idx === 2) {
            // Velocity -> fast draw-in with a slight streak
            iconPaths.forEach(el => {
                // Starts later, draws very fast
                const p = Math.max(0, Math.min(1, (progress - 0.3) * 3));
                const dashOffset = 250 - (p * 250);
                el.style.strokeDashoffset = dashOffset;
                // High glow spike during draw, settling down slightly
                const glow = p < 1 ? p * 12 : 6;
                el.style.filter = `drop-shadow(0 0 ${glow}px rgba(51,224,222,${p}))`;
            });
        } else if (idx === 3) {
            // Execution -> parts assembling/snapping in sequentially
            iconPaths.forEach((el, i) => {
                // Stagger based on node index
                const stagger = i * 0.05;
                const p = Math.max(0, Math.min(1, ((progress - 0.1) - stagger) * 2.5));
                const dashOffset = 250 - (p * 250);
                el.style.strokeDashoffset = dashOffset;
                el.style.filter = `drop-shadow(0 0 ${p * 5}px rgba(51,224,222,${p * 0.6}))`;
            });
        } else if (idx === 4) {
            // Stewardship -> gentle pulse that settles into a steady glow
            iconPaths.forEach(el => {
                // Draw normally
                const p = Math.max(0, Math.min(1, (progress - 0.1) * 1.5));
                const dashOffset = 250 - (p * 250);
                el.style.strokeDashoffset = dashOffset;
                // Pulse effect: goes bright then settles
                const pulseP = Math.max(0, Math.min(1, (progress - 0.5) * 2));
                const glow = p * 6 + (Math.sin(pulseP * Math.PI) * 8); // Sine wave pulse
                el.style.filter = `drop-shadow(0 0 ${glow}px rgba(51,224,222,${p * 0.8}))`;
            });
        }
        
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            if (cover) {
                cover.setAttribute('opacity', '0');
                cover.style.pointerEvents = 'none';
            }
        }
    }
    
    requestAnimationFrame(tick);
};

// Cover Compartment Function (Reverse)
window.coverCompartment = function(index) {
    const root = document.querySelector(`.comp-${index}`);
    if (!root) return;
    
    const cover = root.querySelector('.comp-cover');
    const content = root.querySelector('.comp-content');
    if (!cover || !content) return;
    
    const iconPaths = content.querySelectorAll('rect, line, circle:not([r="1.5"]):not([r="4"])');
    const textAndCircles = content.querySelectorAll('text, circle[r="1.5"], circle[r="4"]');
    
    // Reverse cover scale/opacity
    cover.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    cover.setAttribute('opacity', '1');
    cover.style.transform = 'none'; 
    cover.style.pointerEvents = 'auto';
    
    const coverRect = cover.querySelector('rect');
    if (coverRect) {
        coverRect.setAttribute('width', '170');
    }
    
    // Reverse content glow/opacity
    textAndCircles.forEach(el => {
        el.setAttribute('opacity', '0');
        el.style.filter = 'none';
    });
    
    // Reverse icon lines
    iconPaths.forEach(el => {
        el.style.strokeDashoffset = "500";
        el.style.filter = 'none';
    });
    
    // Crucial fix: Clear the data-revealed attribute so it can be triggered again!
    root.removeAttribute('data-revealed');
};

// Update and Expand Card Function
window.expandCard = function(index) {
    const data = window.phaseData[index - 1];
    if (!data) return;
    
    const container = document.getElementById('submarine-card-container');
    if (!container) return;
    
    let bulletsHtml = data.bullets.map(b => 
      `<div class="sub-bullet">
         <div class="sub-bullet-dot"></div>
         <span class="sub-bullet-text">${b}</span>
       </div>`
    ).join('');
  
    container.innerHTML = `
      <style>
        .sub-card-container { padding: 32px; }
        .sub-phase-badge { display: inline-block; padding: 4px 12px; background: rgba(51,224,222,0.1); border: 1px solid rgba(51,224,222,0.3); border-radius: 20px; margin-bottom: 20px; }
        .sub-phase-text { font-family: Sora, sans-serif; font-weight: 700; font-size: 12px; color: var(--teal, #33E0DE); letter-spacing: 1px; }
        .sub-card-heading { font-family: Sora, sans-serif; font-weight: 700; font-size: 24px; color: var(--text-primary, #F2F7F8); margin: 0 0 16px 0; letter-spacing: -0.5px; }
        .sub-card-body { font-family: Manrope, sans-serif; font-size: 16px; line-height: 1.6; color: var(--text-body, #8EA6AD); margin: 0 0 24px 0; }
        .sub-bullets-grid { display: flex; gap: 24px; flex-wrap: wrap; }
        .sub-bullet { display: flex; align-items: center; gap: 8px; }
        .sub-bullet-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal, #33E0DE); box-shadow: 0 0 4px var(--teal, #33E0DE); flex-shrink: 0; }
        .sub-bullet-text { font-family: Manrope, sans-serif; font-size: 14px; color: var(--text-body, #8EA6AD); }
        
        @media (max-width: 768px) {
          .sub-card-container { padding: 20px; }
          .sub-card-heading { font-size: 20px; margin-bottom: 12px; }
          .sub-card-body { font-size: 15px; margin-bottom: 20px; }
          .sub-bullets-grid { gap: 12px; flex-direction: column; }
          .sub-phase-badge { margin-bottom: 16px; }
        }
      </style>
      <div class="sub-card-container">
        <div class="sub-phase-badge">
          <span class="sub-phase-text">PHASE ${data.phase} — ${data.label.toUpperCase()}</span>
        </div>
        <h3 class="sub-card-heading">${data.heading}</h3>
        <p class="sub-card-body">
          ${data.body}
        </p>
        <div class="sub-bullets-grid">
          ${bulletsHtml}
        </div>
      </div>
    `;
    
    // Animate open
    // We set max-height to a large enough value to accommodate the content.
    // 600px is safe for this card and prevents the scrollbar.
    container.style.maxHeight = '600px';
    container.style.opacity = '1';
    container.style.marginTop = '8px';
    
    // Update Connection Arrow
    const arrowGroup = document.getElementById('connection-arrow-group');
    if (arrowGroup) {
        const path = document.getElementById('connection-arrow-path');
        const startDot = document.getElementById('connection-start-dot');
        const endArrow = document.getElementById('connection-end-arrow');
        
        // Comp 1: 255, Comp 2: 425, Comp 3: 595, Comp 4: 765
        const startX = 255 + (index - 1) * 170;
        const startY = 220;
        
        const endX = 500;
        const endY = 270;
        
        const d = `M ${startX} ${startY} C ${startX} ${startY + 30}, ${endX} ${endY - 30}, ${endX} ${endY}`;
        if (path) path.setAttribute('d', d);
        
        if (startDot) {
            startDot.setAttribute('cx', startX);
            startDot.setAttribute('cy', startY);
        }
        if (endArrow) {
            endArrow.setAttribute('transform', `translate(${endX}, ${endY})`);
        }
        
        arrowGroup.style.opacity = '1';
    }
};

// Collapse Card Function
window.collapseCard = function() {
    const container = document.getElementById('submarine-card-container');
    if (!container) return;
    
    // Animate closed
    container.style.maxHeight = '0px';
    container.style.opacity = '0';
    container.style.marginTop = '0px';
    
    const arrowGroup = document.getElementById('connection-arrow-group');
    if (arrowGroup) arrowGroup.style.opacity = '0';
};

// Run init on any elements that are already present
initSubmarineState();

// --- SCROLL DRIVEN STATE MACHINE ---
let currentSubmarineState = -1;
window.revealedCompartments = {};

window.updateSubmarineState = function(newStep) {
    if (newStep === currentSubmarineState) return;
    
    // Step to active compartment mapping:
    // 0: All covered, card empty/closed
    // 1: Comp 1 revealed, card 1 open
    // 2: Comp 1, 2 revealed, card 2 open
    // 3: Comp 1, 2, 3 revealed, card 3 open
    // 4: Comp 1, 2, 3, 4 revealed, card 4 open
    const activeCompartment = newStep; 
    
    // Reveal up to active, cover beyond active
    for (let i = 1; i <= 4; i++) {
        if (i <= activeCompartment) {
            if (!window.revealedCompartments[i]) {
                window.revealCompartment(i);
                window.revealedCompartments[i] = true;
            }
        } else {
            if (window.revealedCompartments[i]) {
                window.coverCompartment(i);
                window.revealedCompartments[i] = false;
            }
        }
    }
    
    // Manage cards
    if (activeCompartment > 0) {
        window.expandCard(activeCompartment);
    } else {
        window.collapseCard();
    }
    
    currentSubmarineState = newStep;
};

// Scroll listener (JS Sticky Polyfill to bypass overflow restrictions)
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const trackSection = document.getElementById('submarine-track');
    if (!trackSection) return;
    
    const stickyElement = document.querySelector('.submarine-wrapper');
    if (!stickyElement) return;
    
    const rect = trackSection.getBoundingClientRect();
    const startOffset = window.innerWidth <= 768 ? 80 : 0; // Top offset for mobile nav bar vs desktop
    const endOffset = startOffset + stickyElement.offsetHeight;
    
    // 1. Manually control sticky positioning
    if (rect.top <= startOffset && rect.bottom >= endOffset) {
        // Pinned
        stickyElement.style.position = 'fixed';
        stickyElement.style.top = startOffset + 'px';
        stickyElement.style.bottom = 'auto';
        stickyElement.style.left = '0';
        stickyElement.style.transform = 'none';
        stickyElement.style.width = '100%';
        stickyElement.style.maxWidth = 'none';
        stickyElement.style.zIndex = '10';
    } else if (rect.bottom < endOffset) {
        // Past section (stuck to bottom of track container)
        stickyElement.style.position = 'absolute';
        stickyElement.style.top = 'auto';
        stickyElement.style.bottom = '0';
        stickyElement.style.left = '0';
        stickyElement.style.transform = 'none';
        stickyElement.style.width = '100%';
    } else {
        // Before section (normal flow)
        stickyElement.style.position = 'relative';
        stickyElement.style.top = '0';
        stickyElement.style.bottom = 'auto';
        stickyElement.style.left = '0';
        stickyElement.style.transform = 'none';
        stickyElement.style.margin = '0 auto';
        stickyElement.style.width = '100%';
    }
    
    // 2. Track scroll progress and state
    const scrolled = startOffset - rect.top;
    const totalScrollableDistance = trackSection.offsetHeight - stickyElement.offsetHeight;
    const svg = document.querySelector('.submarine-svg');
    
    // Determine scroll direction
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;
    
    if (typeof window.subEntryPath === 'undefined') window.subEntryPath = 'right';
    
    // Progress calculation for smooth entry/exit
    // 0 = completely offscreen, 1 = perfectly pinned in center
    
    if (scrolled < 0) {
        // Above the section
        // Switch path to left only if we are leaving from a pinned state (scrolled > -50)
        // Switch path to right if we are coming from far above (scrolled < -window.innerHeight)
        const enterDistance = Math.min(600, window.innerHeight * 0.75);
        
        if (scrolled < -enterDistance && isScrollingDown) {
            window.subEntryPath = 'right';
        }
        
        const enterProgress = Math.max(0, 1 - Math.abs(scrolled) / enterDistance);
        const inv = 1 - enterProgress;
        
        if (svg) {
            const opac = Math.min(1, enterProgress * 3); // Fade out completely before it swaps sides
            if (window.subEntryPath === 'right') {
                // Enters from top-right
                svg.style.transform = `translate(${inv * 100}vw, ${inv * -40}vh) rotate(${inv * 25}deg)`;
                svg.style.opacity = opac;
            } else {
                // Exits to top-left
                svg.style.transform = `translate(${inv * -100}vw, ${inv * -40}vh) rotate(${inv * -25}deg)`;
                svg.style.opacity = opac;
            }
        }
        window.updateSubmarineState(0);
        return;
    } else if (scrolled > totalScrollableDistance) {
        // Below the section
        const overScroll = scrolled - totalScrollableDistance;
        const exitProgress = Math.max(0, 1 - Math.abs(overScroll) / (window.innerHeight * 1.4));
        const inv = 1 - exitProgress;
        
        if (svg) {
            const opac = Math.min(1, exitProgress * 3);
            // Let's have it consistently dive out to the bottom-left
            svg.style.transform = `translate(${inv * -100}vw, ${inv * 40}vh) rotate(${inv * 15}deg)`;
            svg.style.opacity = opac;
        }
        window.updateSubmarineState(4);
        return;
    } else {
        // Pinned perfectly in the center
        window.subEntryPath = 'left'; // Prep for upward exit
        if (svg) {
            svg.style.transform = 'translate(0vw, 0vh) rotate(0deg)';
            svg.style.opacity = '1';
        }
    }
    
    let progress = scrolled / totalScrollableDistance;
    progress = Math.max(0, Math.min(1, progress));
    
    // Map progress to 5 discrete steps (0 to 4)
    // 0: Initial state (All covered, card closed)
    // 1-4: Sequence of revealing comp N and expanding card N
    const maxStep = 4;
    let currentStep = Math.floor(progress * (maxStep + 1));
    // Cap at maxStep in case progress is exactly 1.0
    currentStep = Math.min(maxStep, currentStep);
    
    window.updateSubmarineState(currentStep);
});

// Unified navigation function for arrows and scroll wheel
window.navigateToSubmarineStep = function(delta) {
    const trackSection = document.getElementById('submarine-track');
    const stickyElement = document.querySelector('.submarine-wrapper');
    if (!trackSection || !stickyElement) return;
    
    let targetStep = currentSubmarineState + delta;
    
    const startOffset = window.innerWidth <= 768 ? 80 : 0;
    const totalScrollableDistance = trackSection.offsetHeight - stickyElement.offsetHeight;
    const sectionTop = trackSection.getBoundingClientRect().top + window.scrollY;
    const pinStart = sectionTop - startOffset;
    
    if (targetStep < 0) {
        // Unpin upwards
        window.scrollTo({ top: pinStart - window.innerHeight / 2, behavior: 'smooth' });
        return;
    }
    if (targetStep > 4) {
        // Unpin downwards
        window.scrollTo({ top: sectionTop + trackSection.offsetHeight, behavior: 'smooth' });
        return;
    }
    
    // Progress for step N is (N + 0.5) / 5
    const targetProgress = (targetStep + 0.5) / 5;
    const targetScrollY = pinStart + (targetProgress * totalScrollableDistance);
    
    window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
    });
};

// Keyboard Support
window.addEventListener('keydown', (e) => {
    const trackSection = document.getElementById('submarine-track');
    const stickyElement = document.querySelector('.submarine-wrapper');
    if (!trackSection || !stickyElement) return;
    
    const rect = trackSection.getBoundingClientRect();
    const startOffset = window.innerWidth <= 768 ? 80 : 0;
    const endOffset = startOffset + stickyElement.offsetHeight;
    
    // Only intercept if we are actively pinned
    if (rect.top <= startOffset && rect.bottom >= endOffset) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            window.navigateToSubmarineStep(1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            window.navigateToSubmarineStep(-1);
        }
    }
});

// Wheel/Scroll Jacking Support
let isAnimatingWheel = false;
let wheelTimeout;
window.addEventListener('wheel', (e) => {
    const trackSection = document.getElementById('submarine-track');
    const stickyElement = document.querySelector('.submarine-wrapper');
    if (!trackSection || !stickyElement) return;
    
    const rect = trackSection.getBoundingClientRect();
    const startOffset = window.innerWidth <= 768 ? 80 : 0;
    const endOffset = startOffset + stickyElement.offsetHeight;
    
    // Only intercept if we are actively pinned
    if (rect.top <= startOffset && rect.bottom >= endOffset) {
        e.preventDefault();
        
        if (!isAnimatingWheel) {
            isAnimatingWheel = true;
            
            if (e.deltaY > 0) {
                window.navigateToSubmarineStep(1);
            } else if (e.deltaY < 0) {
                window.navigateToSubmarineStep(-1);
            }
            
            // Block further wheel events until smooth scroll completes
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                isAnimatingWheel = false;
            }, 800);
        }
    }
}, { passive: false });


// Initialize entry state
setTimeout(() => {
    window.updateSubmarineState(0);
}, 100);
