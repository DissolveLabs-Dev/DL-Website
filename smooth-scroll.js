// Dissolve Labs — smooth scroll (Lenis integration).
//
// Why this file exists:
//   Native wheel/trackpad scrolling advances in discrete jumps. Both
//   depth-engine.js and submarine-engine.js drive their motion from scroll
//   position, so those jumps read as "choppy" — most visibly on the submarine,
//   whose sticky-pin polyfill writes styles straight from a scroll handler.
//   Lenis interpolates scroll position across frames, so those same handlers
//   receive smoothly-changing values instead of notch-sized steps.
//
// Lenis scrolls the REAL document (it does not transform a wrapper element),
// so window.scrollY, getBoundingClientRect() and IntersectionObserver all stay
// accurate. That is why depth-engine.js / submarine-engine.js need no changes.
//
// Load order: this file must come AFTER lenis.min.js.
(function () {
  'use strict';

  if (typeof window.Lenis !== 'function') {
    console.warn('[smooth-scroll] Lenis not loaded — falling back to native scrolling.');
    return;
  }

  // ---------------------------------------------------------------------
  // Stylesheet.
  // Deliberately NOT using the stock lenis.css: it ships a blanket
  //   .lenis.lenis-smooth iframe { pointer-events: none }
  // which would make the Calendly booking iframe permanently unclickable and
  // silently kill the booking flow. We drop that rule and instead suppress
  // iframe pointer events only WHILE a scroll is actually animating, so the
  // pointer can't get captured mid-scroll but the widget stays fully usable
  // at rest.
  // ---------------------------------------------------------------------
  var css = [
    'html.lenis, html.lenis body { height: auto; }',
    '.lenis:not(.lenis-autoToggle).lenis-stopped { overflow: clip; }',
    '.lenis [data-lenis-prevent],',
    '.lenis [data-lenis-prevent-wheel],',
    '.lenis [data-lenis-prevent-touch] { overscroll-behavior: contain; }',
    '.lenis.lenis-scrolling iframe { pointer-events: none; }'
  ].join('\n');
  var styleEl = document.createElement('style');
  styleEl.id = 'lenis-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var lenis = new Lenis({
    autoRaf: true,        // Lenis runs its own rAF; independent of DepthEngine's loop.
    lerp: 0.1,            // Lower = smoother//heavier. 0.1 is Lenis' default feel.
    smoothWheel: true,
    // Touch devices already scroll smoothly at the OS level; hijacking it there
    // tends to feel laggy and fights native overscroll behaviour.
    syncTouch: false
  });
  window.lenis = lenis;

  // ---------------------------------------------------------------------
  // Route existing native smooth-scroll calls through Lenis.
  //
  // index.html and submarine-engine.js contain ~8 window.scrollTo({behavior:
  // 'smooth'}) call sites (nav links, "back to top", submarine step jumps).
  // Native smooth scrolling and Lenis would fight each other for control of
  // the same scroll position, producing a visible stutter. Patching the entry
  // point rather than each call site also means index.html can be regenerated
  // by the design-system builder without silently reintroducing the conflict.
  //
  // Non-smooth calls (including Lenis' own internal behavior:'instant' writes)
  // pass straight through to the native implementation, so there is no
  // recursion.
  // ---------------------------------------------------------------------
  var nativeScrollTo = window.scrollTo.bind(window);

  window.scrollTo = function (optsOrX) {
    if (optsOrX && typeof optsOrX === 'object' && optsOrX.behavior === 'smooth') {
      lenis.scrollTo(typeof optsOrX.top === 'number' ? optsOrX.top : 0);
      return;
    }
    // Forward with the ORIGINAL argument count. scrollTo is an overloaded API:
    // passing a second argument — even `undefined` — makes the browser select
    // the scrollTo(x, y) numeric overload, which coerces an options object to
    // NaN and silently discards the scroll. Lenis writes every frame via
    // scrollTo({top, behavior:'instant'}), so widening the arity here breaks
    // ALL scrolling: Lenis moves its target, the document never follows, and
    // Lenis then re-syncs from the real position and snaps back to the top.
    return nativeScrollTo.apply(window, arguments);
  };
})();
