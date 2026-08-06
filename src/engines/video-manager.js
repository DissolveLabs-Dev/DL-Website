// video-manager.js — ported verbatim from legacy/index.legacy.html L3458-3714.
//
// Background video playback, in three stages:
//   1. markup ships preload="none" + a poster, so videos cost nothing
//      while the page's critical assets are still landing;
//   2. the moment `load` fires (all critical subresources done) every
//      video is buffered in the background, so they are ready long
//      before the reader scrolls down to them;
//   3. IntersectionObserver only decides play/pause, never loading, so
//      arriving at the section never waits on the network.
//
// Playback rules:
//   * the four cards start together, not staggered as each one happens
//     to finish buffering — staggered starts are what read as "janky";
//   * a video only starts once the browser says it can play through, so
//     it never stutters on a thin buffer. Until then the poster holds,
//     which looks deliberate rather than broken;
//   * offscreen and background-tab videos pause, so we never keep four
//     decoders running for content nobody is looking at.
//
// React's mount is stable (unlike the DC runtime, which re-rendered whole
// sections after first paint), so the MutationObserver re-adopt path below
// is belt-and-braces rather than load-bearing — kept anyway per the
// migration plan (StrictMode double-invoke makes it useful, and it's cheap).

export function initVideoManager() {
  var GROUP = '.svc-video';        // the 2x2 grid that must start in sync
  var SYNC_TIMEOUT = 1500;         // don't hold ready videos hostage forever

  var visible = new WeakSet();
  var wantPlay = new WeakSet();    // asked for playback and never revoked
  var released = false;            // has the synchronized start fired?
  var releaseTimer = null;

  // Don't burn a metered or 2g connection on decorative loops.
  var conn = navigator.connection || {};
  var thrifty = !!conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');

  function group() {
    return [].slice.call(document.querySelectorAll(GROUP));
  }

  function ready(v) {
    // readyState 4 is the browser's own "can play through to the end at
    // the current download rate" verdict.
    if (v.readyState < 4) return false;
    if (!v.duration || !isFinite(v.duration) || !v.buffered.length) return true;
    // Back it with a real head start: looping rewinds to 0, so a thin
    // buffer turns into a stall every time the clip wraps.
    var end = 0;
    for (var i = 0; i < v.buffered.length; i++) {
      if (v.buffered.start(i) <= 0.05) end = Math.max(end, v.buffered.end(i));
    }
    return end >= Math.min(v.duration, 3);
  }

  function warm(v) {
    if (v._warmed) return;
    v._warmed = true;
    try {
      v.preload = 'auto';
      v.setAttribute('preload', 'auto');
      v.load();
    } catch (e) { /* nothing useful to do */ }
  }

  function play(v) {
    if (!v.paused) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () { /* blocked; retried on gesture */ });
  }

  function releaseGroup() {
    if (released) return;
    released = true;
    if (releaseTimer) { clearTimeout(releaseTimer); releaseTimer = null; }
    group().forEach(function (v) {
      if (visible.has(v) && ready(v) && !document.hidden) {
        wantPlay.add(v);
        play(v);
      }
    });
  }

  // Fire the synchronized start once every card can play through — or once
  // the timeout expires, so one slow file can't hold the others back.
  function considerRelease() {
    if (released || document.hidden) return;
    var g = group();
    if (!g.length) return;
    if (!g.some(function (v) { return visible.has(v); })) return;
    if (g.every(ready)) { releaseGroup(); return; }
    if (!releaseTimer) {
      releaseTimer = setTimeout(function () {
        releaseTimer = null;
        releaseGroup();
      }, SYNC_TIMEOUT);
    }
  }

  function tryPlay(v) {
    if (!visible.has(v) || document.hidden) return;
    warm(v);
    var inGroup = v.matches && v.matches(GROUP);
    if (inGroup && !released) { considerRelease(); pump.start(); return; }
    if (!ready(v)) { pump.start(); return; }
    wantPlay.add(v);
    play(v);
  }

  // Readiness is checked by a short self-terminating poll rather than media
  // events: `progress` stops firing once a file finishes downloading, so an
  // event-driven watcher can wait forever if the last event landed just
  // before the buffer target was met. The timer clears itself as soon as
  // nothing is pending, so it costs nothing at rest.
  function pump() {
    var pending = false;
    document.querySelectorAll('video').forEach(function (v) {
      if (!visible.has(v) || document.hidden) return;
      if (v.matches && v.matches(GROUP) && !released) {
        pending = true;
        considerRelease();
        return;
      }
      if (!ready(v)) { pending = true; return; }
      if (v.paused) { wantPlay.add(v); play(v); }
    });
    if (!pending && pump.timer) {
      clearInterval(pump.timer);
      pump.timer = null;
    }
  }
  pump.timer = null;
  pump.start = function () {
    if (pump.timer) return;
    pump.timer = setInterval(pump, 250);
  };

  function halt(v) {
    wantPlay.delete(v);
    if (!v.paused) v.pause();
  }

  function prepare(v) {
    v.muted = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('loop', '');
    if (v._managed) return;
    v._managed = true;
    v.addEventListener('ended', function () {
      v.currentTime = 0;
      if (wantPlay.has(v) && visible.has(v)) play(v);
    });
    // A stall or an interrupted play() can park a visible video. Only
    // resume when we still want it playing, so this never fights halt().
    v.addEventListener('pause', function () {
      if (wantPlay.has(v) && visible.has(v) && !document.hidden) {
        setTimeout(function () { if (wantPlay.has(v)) play(v); }, 80);
      }
    });
  }

  // Keep main's original media files buffered, but only spend decoder/GPU
  // time on cards that are meaningfully visible in this motion-heavy branch.
  var observer = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          visible.add(e.target);
          tryPlay(e.target);
        } else {
          visible.delete(e.target);
          halt(e.target);
        }
      });
    }, { rootMargin: '0px', threshold: 0.5 })
    : null;

  // Buffer everything in parallel. The synchronized start means we want all
  // four ready at roughly the same moment, not the first one ready soonest.
  function warmAll() {
    warmAll.started = true;
    if (thrifty) return;
    document.querySelectorAll('video').forEach(warm);
  }

  function scanVideos() {
    document.querySelectorAll('video').forEach(function (v) {
      prepare(v);
      if (!observer) {
        visible.add(v);          // no IntersectionObserver: just play
        tryPlay(v);
      } else if (!v._observed) {
        v._observed = true;
        observer.observe(v);
      }
    });
    // A re-render hands back cold elements: re-warm them, and re-open the
    // sync gate so the fresh set starts together instead of dribbling in.
    if (warmAll.started) {
      released = false;
      if (releaseTimer) { clearTimeout(releaseTimer); releaseTimer = null; }
      warmAll();
      considerRelease();
    }
  }
  window.rescanVideos = scanVideos;

  // Re-adopt videos whenever the DOM changes, coalesced to one rescan/frame.
  var mutationObserver = null;
  if ('MutationObserver' in window) {
    var queued = false;
    mutationObserver = new MutationObserver(function (records) {
      if (queued) return;
      var touchesVideo = records.some(function (r) {
        return [].some.call(r.addedNodes, function (n) {
          return n.nodeType === 1 &&
            (n.tagName === 'VIDEO' || (n.querySelector && n.querySelector('video')));
        });
      });
      if (!touchesVideo) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; scanVideos(); });
    });
    mutationObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  // Autoplay can be refused until the user interacts; retry on first gesture.
  var gestureEvents = ['pointerdown', 'touchstart', 'keydown'];
  function onGesture() {
    document.querySelectorAll('video').forEach(tryPlay);
  }
  gestureEvents.forEach(function (evt) {
    document.addEventListener(evt, onGesture, { passive: true });
  });

  function onVisibilityChange() {
    document.querySelectorAll('video').forEach(function (v) {
      if (document.hidden) { if (!v.paused) v.pause(); }
      else if (wantPlay.has(v) && visible.has(v)) play(v);
    });
    if (!document.hidden) considerRelease();
  }
  document.addEventListener('visibilitychange', onVisibilityChange);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanVideos);
  } else {
    scanVideos();
  }

  // Start buffering as soon as `load` fires: that already means every
  // critical subresource is done, so videos stay off the critical path
  // without us adding any extra delay on top.
  function start() { scanVideos(); warmAll(); considerRelease(); }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);

  // Not present in the legacy IIFE (which never tore down — it ran once for
  // the page's lifetime). React's StrictMode double-invokes effects in dev,
  // so useVideoManager() needs a real cleanup to unregister listeners.
  return function cleanup() {
    if (pump.timer) clearInterval(pump.timer);
    if (releaseTimer) clearTimeout(releaseTimer);
    if (observer) observer.disconnect();
    if (mutationObserver) mutationObserver.disconnect();
    gestureEvents.forEach(function (evt) {
      document.removeEventListener(evt, onGesture);
    });
    document.removeEventListener('visibilitychange', onVisibilityChange);
    document.removeEventListener('DOMContentLoaded', scanVideos);
    window.removeEventListener('load', start);
    delete window.rescanVideos;
  };
}
