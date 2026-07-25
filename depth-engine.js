// Dissolve Labs — DepthEngine (optimized).
// Ocean-descent canvas + custom-cursor engine.
// Optimizations over the original port:
//   • Per-section VISIBILITY GATING — off-screen canvases are not redrawn.
//   • Particle/seabed glow via a cached radial SPRITE (drawImage) instead of
//     per-particle ctx.shadowBlur (the single biggest cost in the original).
//   • Cached node lists + reads batched at the top of the loop (no per-frame
//     querySelectorAll, no read/write layout thrash).
//   • DPR capped at 1.5; lighter cursor (ring + dot lerp, no ripple DOM churn).
//   • prefers-reduced-motion → no rAF loop; a static frame drawn on scroll.
(function () {
  'use strict';

  class DepthEngine {
    constructor() {
      this.stops = [[0, '#0D2B45'], [0.15, '#0A2238'], [0.30, '#081A2C'], [0.50, '#060F1C'], [0.70, '#040A14'], [0.85, '#03060D'], [1.0, '#020408']];
      this.depth = 0;
      this.mouse = { x: innerWidth / 2, y: innerHeight / 2 };
      this.cur = { x: innerWidth / 2, y: innerHeight / 2 };
      this.shipX = 0; this.big = false;
      this._sprites = {};
      this.speed = 1; this.simT = 0; this.lastNow = 0;
      this.light = false;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    setSpeed(v) { this.speed = Math.max(0.05, +v || 1); }
    setTheme(mode) {
      this.light = mode === 'light';
      this.stops = this.light
        ? [[0, '#E6F6F6'], [0.15, '#D3EEEE'], [0.30, '#BFE6E7'], [0.50, '#A6DADC'], [0.70, '#8FCFD2'], [0.85, '#7EC6CA'], [1.0, '#6FBDC2']]
        : [[0, '#0D2B45'], [0.15, '#0A2238'], [0.30, '#081A2C'], [0.50, '#060F1C'], [0.70, '#040A14'], [0.85, '#03060D'], [1.0, '#020408']];
      if (this.reduced) this.renderStatic();
    }

    // ---------- helpers ----------
    hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
    colorAt(d) {
      d = Math.max(0, Math.min(1, d)); const s = this.stops;
      for (let i = 0; i < s.length - 1; i++) { if (d <= s[i + 1][0]) { const a = this.hex(s[i][1]), b = this.hex(s[i + 1][1]); const t = (d - s[i][0]) / (s[i + 1][0] - s[i][0]); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; } }
      return this.hex(s[s.length - 1][1]);
    }
    rgb(c) { return 'rgb(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ')'; }
    size(c, w, h) { const dpr = Math.min(devicePixelRatio || 1, 1.5); c.width = Math.max(1, w * dpr); c.height = Math.max(1, h * dpr); c.cw = w; c.ch = h; const x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0); return x; }
    // cached radial glow sprite (white-cored, tinted) — replaces per-particle shadowBlur
    glow(rgb) {
      if (this._sprites[rgb]) return this._sprites[rgb];
      const s = 64, cv = document.createElement('canvas'); cv.width = cv.height = s;
      const g = cv.getContext('2d'); const rad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      rad.addColorStop(0, 'rgba(' + rgb + ',1)'); rad.addColorStop(0.28, 'rgba(' + rgb + ',.5)'); rad.addColorStop(1, 'rgba(' + rgb + ',0)');
      g.fillStyle = rad; g.fillRect(0, 0, s, s);
      this._sprites[rgb] = cv; return cv;
    }
    inView(el, m) { if (!el) return false; const r = el.getBoundingClientRect(); return r.bottom > -(m || 160) && r.top < innerHeight + (m || 160); }

    resize() {
      const p = this.parts, r = this.rays;
      if (p) this.size(p, innerWidth, innerHeight);
      if (r) this.size(r, innerWidth, innerHeight);
      [this.hero, this.sub, this.seabed].forEach(c => { if (c) this.size(c, c.clientWidth, c.clientHeight); });
      this.svcCanvases.forEach(c => this.size(c, c.clientWidth, c.clientHeight));
      this.evDrawn = false;
    }

    attach() {
      this.bg = document.getElementById('depth-bg');
      this.rays = document.getElementById('rays-canvas');
      this.parts = document.getElementById('particles-canvas');
      this.vig = document.getElementById('vignette');
      this.curEl = document.getElementById('cursor-ring');
      this.dotEl = document.getElementById('cursor-dot');
      this.hero = document.getElementById('hero-canvas');
      this.heroSec = document.getElementById('hero');
      this.sub = document.getElementById('sub-canvas');
      this.subZone = document.getElementById('descend');
      this.seabed = document.getElementById('seabed-canvas');
      this.footer = this.seabed ? this.seabed.closest('footer') : null;
      this.scrollInd = document.getElementById('scroll-ind');
      this.eventsSec = document.getElementById('events');
      this.servicesSec = document.getElementById('services');
      this.rows = Array.from(document.querySelectorAll('[data-ev-row]'));
      this.svcCanvases = Array.from(document.querySelectorAll('[data-svc]'));
      this.evCanvases = Array.from(document.querySelectorAll('[data-ev]'));
      this.evDrawn = false;

      const noHover = matchMedia('(hover:none)').matches;
      if (noHover || this.reduced) { if (this.curEl) this.curEl.style.display = 'none'; if (this.dotEl) this.dotEl.style.display = 'none'; }

      this.particles = Array.from({ length: 130 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0006, vy: -(Math.random() * .0012 + .0004), s: Math.random() * 2 + .6, ph: Math.random() * 6.28 }));
      this.seabedInit();

      window.addEventListener('resize', this.onResize, { passive: true });
      window.addEventListener('scroll', this.onScroll, { passive: true });
      if (!this.reduced && !noHover) window.addEventListener('mousemove', this.onMove, { passive: true });
      if (!this.reduced) window.addEventListener('mouseover', this.onOver, { passive: true });
      this.resize();

      this.io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: .15 });
      document.querySelectorAll('.reveal').forEach(el => this.io.observe(el));

      if (this.reduced) { this.renderStatic(); }
      else { this.raf = requestAnimationFrame(this.loop); }
    }
    detach() {
      cancelAnimationFrame(this.raf);
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('mousemove', this.onMove);
      window.removeEventListener('mouseover', this.onOver);
      if (this.io) this.io.disconnect();
    }
    pause() { if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; } this.renderStatic(); }
    resume() { this.lastNow = 0; if (!this.raf && !this.reduced) this.raf = requestAnimationFrame(this.loop); }

    onScroll = () => {
      if (this.scrollInd) this.scrollInd.style.opacity = scrollY > 80 ? '0' : '1';
      if (this.reduced) { if (this._st) return; this._st = requestAnimationFrame(() => { this._st = 0; this.renderStatic(); }); }
    };
    onResize = () => { this.resize(); if (this.reduced) this.renderStatic(); };
    onMove = (e) => { this.mouse = { x: e.clientX, y: e.clientY }; };
    onOver = (e) => { this.big = !!(e.target.closest && e.target.closest('[data-hov],a,button')); };

    updateDepth() {
      const doc = document.documentElement;
      const st = window.scrollY || doc.scrollTop || document.body.scrollTop || 0;
      const max = (doc.scrollHeight || document.body.scrollHeight) - innerHeight;
      this.depth = max > 0 ? Math.max(0, Math.min(1, st / max)) : 0;
      if (this.bg) { const top = this.colorAt(this.depth), bot = this.colorAt(Math.min(1, this.depth + 0.12)); this.bg.style.background = 'linear-gradient(to bottom,' + this.rgb(top) + ',' + this.rgb(bot) + ')'; }
      if (this.vig) this.vig.style.opacity = this.light ? '0' : String(Math.max(0, Math.min(1, (this.depth - 0.4) / 0.5)) * .95);
    }

    // ---------- reduced-motion static frame ----------
    renderStatic() {
      const t = 0.6; this.updateDepth();
      this.drawRays(t, this.depth); this.drawParticles(t, this.depth, true);
      if (this.inView(this.heroSec)) this.drawHero(t);
      if (!this.evDrawn) this.drawEventBgs();
      this.svcCanvases.forEach(c => { if (this.inView(c)) this.drawSvc(c, t); });
      if (this.inView(this.subZone)) this.drawSub(t);
      if (this.inView(this.footer)) this.drawSeabed(t);
    }

    // ---------- master loop ----------
    // Every draw is guarded so a single frame's error can never kill the whole
    // animation — the next frame is ALWAYS scheduled (in finally).
    loop = (now) => {
      try {
        const dt = this.lastNow ? Math.min(now - this.lastNow, 50) : 16;
        this.lastNow = now;
        this.simT += (dt / 1000) * this.speed;
        const t = this.simT;
        this.updateDepth();
        const d = this.depth;
        // cursor (cheap, always)
        this.cur.x += (this.mouse.x - this.cur.x) * .18; this.cur.y += (this.mouse.y - this.cur.y) * .18;
        if (this.curEl) { const exp = this.big ? 48 : 34; this.curEl.style.transform = 'translate(' + this.cur.x + 'px,' + this.cur.y + 'px)'; this.curEl.style.width = exp + 'px'; this.curEl.style.height = exp + 'px'; this.curEl.style.margin = (-exp / 2) + 'px 0 0 ' + (-exp / 2) + 'px'; }
        if (this.dotEl) this.dotEl.style.transform = 'translate(' + this.mouse.x + 'px,' + this.mouse.y + 'px)';
        // full-viewport layers (always visible)
        this.drawRays(t, d); this.drawParticles(t, d);
        // gated per-section work
        if (this.inView(this.heroSec)) this.drawHero(t);
        if (!this.evDrawn && this.inView(this.eventsSec, 400)) this.drawEventBgs();
        if (this.inView(this.servicesSec)) { this.svcCanvases.forEach(c => { if (this.inView(c)) this.drawSvc(c, t); }); }
        if (this.inView(this.eventsSec)) this.parallax();
        if (this.inView(this.subZone)) this.drawSub(t);
        if (this.inView(this.footer)) this.drawSeabed(t);
      } catch (err) {
        if (!this._warned) { this._warned = true; console.warn('[DepthEngine] frame error (loop continues):', err); }
      } finally {
        this.raf = requestAnimationFrame(this.loop);
      }
    };

    parallax() {
      const ev = this.eventsSec; if (!ev) return;
      const r = ev.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, 1 - (r.top + r.height / 2) / ((innerHeight + r.height) / 2)));
      if (this.rows[0]) this.rows[0].style.transform = 'translateX(' + (p * 140) + 'px)';
      if (this.rows[1]) this.rows[1].style.transform = 'translateX(' + (p * 16) + 'px)';
      if (this.rows[2]) this.rows[2].style.transform = 'translateX(' + (-p * 140) + 'px)';
    }

    // ---------- light rays ----------
    drawRays(t, d) { const c = this.rays; if (!c) return; const x = c.getContext('2d'), w = c.cw, h = c.ch; x.clearRect(0, 0, w, h); if (this.light) return; const op = Math.max(0, 1 - d / 0.5); if (op <= 0) return; x.globalCompositeOperation = 'screen'; for (let i = 0; i < 7; i++) { const bx = w * (i / 6) + Math.sin(t * .3 + i) * 40; const sw = 60 + i * 10; const g = x.createLinearGradient(bx, 0, bx - 140, h * .9); g.addColorStop(0, 'rgba(120,230,225,' + (.10 * op) + ')'); g.addColorStop(1, 'rgba(120,230,225,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(bx - sw, 0); x.lineTo(bx + sw, 0); x.lineTo(bx - 90, h); x.lineTo(bx - 90 - sw * 1.6, h); x.closePath(); x.fill(); } x.globalCompositeOperation = 'source-over'; }

    // ---------- particles (sprite glow) ----------
    drawParticles(t, d, stat) {
      const c = this.parts; if (!c) return; const x = c.getContext('2d'), w = c.cw, h = c.ch; x.clearRect(0, 0, w, h);
      let col, gR, dens, spd;
      if (d < 0.2) { col = [200, 245, 242]; gR = 3.4; dens = 1; spd = 1.6; }
      else if (d < 0.4) { col = [130, 200, 220]; gR = 2.8; dens = .8; spd = 1; }
      else if (d < 0.6) { col = [70, 160, 175]; gR = 2.4; dens = .55; spd = .6; }
      else if (d < 0.8) { col = [80, 255, 210]; gR = 4.6; dens = .5; spd = .35; }
      else { col = [100, 255, 230]; gR = 6; dens = .4; spd = .2; }
      if (this.light) col = [20, 140, 150];
      const sprite = this.glow(col.join(','));
      x.globalCompositeOperation = this.light ? 'multiply' : 'screen';
      const n = Math.floor(this.particles.length * dens);
      for (let i = 0; i < n; i++) {
        const p = this.particles[i];
        if (!stat) { p.x += p.vx * spd * 4 * this.speed; p.y += p.vy * spd * 4 * this.speed; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); } if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0; }
        const px = p.x * w, py = p.y * h;
        const tw = d > 0.6 ? (0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + p.ph))) : 1;
        const a = (d > 0.6 ? .9 : .5) * tw * (this.light ? 0.5 : 1);
        const r = p.s * (d > 0.6 ? 1.3 : 1) * gR;
        x.globalAlpha = a; x.drawImage(sprite, px - r, py - r, r * 2, r * 2);
      }
      x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
    }

    // ---------- hero water + ship ----------
    drawHero(t) { const c = this.hero; if (!c) return; const x = c.getContext('2d'), w = c.cw, h = c.ch; x.clearRect(0, 0, w, h); const base = h * 0.72;
      const waveY = (px) => base + Math.sin(px * .008 + t * 1.1) * 14 + Math.sin(px * .017 - t * 1.6) * 8 + Math.sin(px * .031 + t * .7) * 5 + Math.sin(px * .005 + t * .4) * 20;
      x.beginPath(); x.moveTo(0, h); for (let px = 0; px <= w; px += 6) x.lineTo(px, waveY(px)); x.lineTo(w, h); x.closePath(); const g = x.createLinearGradient(0, base - 30, 0, h); g.addColorStop(0, '#1ABFB8'); g.addColorStop(.5, '#12A29B'); g.addColorStop(1, '#0A5E60'); x.fillStyle = g; x.fill();
      x.lineWidth = 2; x.strokeStyle = 'rgba(220,255,252,.5)'; x.beginPath(); for (let px = 0; px <= w; px += 6) { const y = waveY(px); (px === 0 ? x.moveTo(px, y) : x.lineTo(px, y)); } x.stroke();
      for (let px = 0; px < w; px += 14) { const y = waveY(px); if (Math.sin(px * .017 - t * 1.6) > .7) { x.fillStyle = 'rgba(240,255,253,.7)'; x.beginPath(); x.arc(px, y, 1.6, 0, 6.28); x.fill(); } }
      const targetX = Math.max(w * .2, Math.min(w * .85, this.mouse.x - (c.getBoundingClientRect().left)));
      this.shipX += (targetX - this.shipX) * .04; if (!this.shipX) this.shipX = w * .62;
      const sx = this.shipX, sy = waveY(sx) - 2 + Math.sin(t * 1.05) * 4;
      this.drawShip(x, sx, sy, t); }
    drawShip(x, sx, sy, t) { x.save(); x.translate(sx, sy); const tilt = Math.sin(t * 1.05) * .03; x.rotate(tilt); this.shipBody(x); x.restore(); }
    shipBody(x) {
      // hull
      const hg = x.createLinearGradient(0, -4, 0, 22); hg.addColorStop(0, '#143544'); hg.addColorStop(1, '#071820');
      x.fillStyle = hg; x.strokeStyle = 'rgba(120,235,230,.55)'; x.lineWidth = 1.5; x.lineJoin = 'round';
      x.beginPath(); x.moveTo(-64, 2); x.quadraticCurveTo(-68, 15, -46, 23); x.lineTo(46, 23); x.quadraticCurveTo(66, 15, 64, 2); x.closePath(); x.fill(); x.stroke();
      // deck trim line
      x.strokeStyle = 'rgba(120,235,230,.28)'; x.lineWidth = 1; x.beginPath(); x.moveTo(-60, 5); x.lineTo(60, 5); x.stroke();
      // wheelhouse
      x.fillStyle = '#123846'; x.strokeStyle = 'rgba(120,235,230,.5)'; x.lineWidth = 1.4; x.beginPath(); x.moveTo(-26, 4); x.lineTo(20, 4); x.lineTo(13, -17); x.lineTo(-19, -17); x.closePath(); x.fill(); x.stroke();
      // upper bridge
      x.beginPath(); x.rect(-11, -30, 22, 13); x.fill(); x.stroke();
      // glowing windows
      x.fillStyle = 'rgba(130,240,235,.95)'; x.shadowBlur = 6; x.shadowColor = 'rgba(90,235,230,.9)'; [-15, -5, 6].forEach(px => { x.beginPath(); x.arc(px, -7, 2, 0, 6.28); x.fill(); }); x.beginPath(); x.arc(0, -24, 1.8, 0, 6.28); x.fill(); x.shadowBlur = 0;
      // mast + flag
      x.strokeStyle = 'rgba(150,235,230,.7)'; x.lineWidth = 2; x.beginPath(); x.moveTo(0, -30); x.lineTo(0, -54); x.stroke();
      x.fillStyle = 'rgba(51,224,222,.6)'; x.beginPath(); x.moveTo(0, -54); x.lineTo(23, -46); x.lineTo(0, -39); x.closePath(); x.fill();
    }

    // ---------- submarine ----------
    drawSub(t) { const c = this.sub; if (!c) return; const x = c.getContext('2d'), w = c.cw, h = c.ch; x.clearRect(0, 0, w, h);
      const z = this.subZone; if (!z) return; const r = z.getBoundingClientRect(); const prog = Math.max(0, Math.min(1, (innerHeight - r.top) / (r.height + innerHeight)));
      const cy = h * 1.15 - prog * h * 1.5; const cx = w * .5 + Math.sin(t * .4) * 30;
      x.globalCompositeOperation = 'screen'; for (let i = 0; i < 6; i++) { const by = cy + 80 + ((t * 40 + i * 60) % 300); const bx = cx - 90 - i * 8 + Math.sin(t + i) * 6; x.beginPath(); x.fillStyle = 'rgba(120,220,220,' + (.25 * (1 - i / 6)) + ')'; x.arc(bx, by, 6 + i * 2, 0, 6.28); x.fill(); } x.globalCompositeOperation = 'source-over';
      x.save(); x.translate(cx, cy);
      x.fillStyle = '#050f18'; x.strokeStyle = 'rgba(60,210,205,.55)'; x.lineWidth = 2;
      x.beginPath(); x.ellipse(0, 0, 110, 34, 0, 0, 6.28); x.fill(); x.stroke();
      x.beginPath(); x.moveTo(105, -14); x.lineTo(140, 0); x.lineTo(105, 14); x.closePath(); x.fillStyle = '#050f18'; x.fill(); x.stroke();
      x.strokeStyle = 'rgba(120,235,230,.7)'; x.lineWidth = 2; const pr = t * 4; for (let i = 0; i < 3; i++) { const a = pr + i * 2.09; x.beginPath(); x.moveTo(140, 0); x.lineTo(140 + Math.cos(a) * 4, Math.sin(a) * 16); x.stroke(); }
      x.fillStyle = '#07131d'; x.beginPath(); x.moveTo(-26, -30); x.lineTo(20, -30); x.lineTo(14, -62); x.lineTo(-20, -62); x.closePath(); x.fill(); x.stroke();
      x.beginPath(); x.moveTo(-4, -62); x.lineTo(-4, -80); x.lineTo(8, -80); x.stroke();
      x.fillStyle = '#07131d'; x.beginPath(); x.moveTo(-70, 30); x.lineTo(-98, 44); x.lineTo(-70, 40); x.closePath(); x.fill(); x.stroke();
      x.fillStyle = 'rgba(130,240,235,.95)'; x.shadowBlur = 12; x.shadowColor = 'rgba(90,235,230,.9)'; [-55, -30, -5, 25].forEach(px => { x.beginPath(); x.arc(px, 0, 5, 0, 6.28); x.fill(); }); x.shadowBlur = 0;
      x.restore(); }

    // ---------- service canvases ----------
    drawSvc(c, t) { const type = c.dataset.svc; const x = c.getContext('2d'), w = c.cw, h = c.ch; if (type === 'matrix') this.svcMatrix(c, x, w, h, t); else if (type === 'robot') this.svcRobot(c, x, w, h, t); else if (type === 'neural') this.svcNeural(c, x, w, h, t); else this.svcBlueprint(c, x, w, h, t); }
    svcMatrix(c, x, w, h, t) { const fs = 15; const cols = Math.floor(w / fs); if (c._cols !== cols) { c._cols = cols; c._d = Array.from({ length: cols }, () => Math.random() * -40); } x.fillStyle = 'rgba(5,14,24,.14)'; x.fillRect(0, 0, w, h); x.font = fs + 'px monospace'; for (let i = 0; i < cols; i++) { const ch = Math.random() < .5 ? '0' : '1'; const px = i * fs, py = c._d[i] * fs; x.fillStyle = 'rgba(51,224,222,.9)'; x.fillText(ch, px, py); x.fillStyle = 'rgba(140,240,236,.5)'; if (Math.random() < .1) x.fillText(Math.random() < .5 ? '0' : '1', px, py - fs); c._d[i] += 0.55 * this.speed; if (py > h && Math.random() > .975) c._d[i] = 0; } }
    svcRobot(c, x, w, h, t) { x.clearRect(0, 0, w, h);
      x.strokeStyle = 'rgba(38,208,206,.08)'; x.lineWidth = 1; for (let i = 0; i < 6; i++) { const gy = h * (i / 6); x.beginPath(); x.moveTo(0, gy); x.lineTo(w, gy); x.stroke(); }
      const bx = w * .5, by = h * .86; const a0 = -1.3 + Math.sin(t * .7) * .35, a1 = 0.7 + Math.sin(t * .7 + 1) * .5, a2 = 0.5 + Math.sin(t * .7 + 2) * .4;
      const L = [h * .22, h * .2, h * .13]; let px = bx, py = by, ang = a0; const pts = [[px, py]];
      [a0, a0 + a1, a0 + a1 + a2].forEach((_, i) => { px += Math.cos(ang) * L[i]; py += Math.sin(ang) * L[i]; pts.push([px, py]); ang += i === 0 ? a1 : a2; });
      x.fillStyle = '#0a1c26'; x.fillRect(bx - 26, by, 52, h * .12);
      x.lineCap = 'round'; for (let i = 0; i < pts.length - 1; i++) { x.strokeStyle = 'rgba(46,208,206,.85)'; x.lineWidth = 16 - i * 3; x.beginPath(); x.moveTo(pts[i][0], pts[i][1]); x.lineTo(pts[i + 1][0], pts[i + 1][1]); x.stroke(); x.strokeStyle = 'rgba(140,245,240,.5)'; x.lineWidth = 4 - i; x.beginPath(); x.moveTo(pts[i][0], pts[i][1]); x.lineTo(pts[i + 1][0], pts[i + 1][1]); x.stroke(); }
      pts.forEach((p, i) => { x.fillStyle = '#04121a'; x.beginPath(); x.arc(p[0], p[1], 9 - i, 0, 6.28); x.fill(); x.strokeStyle = 'rgba(120,240,235,.9)'; x.lineWidth = 2; x.stroke(); });
      const e = pts[pts.length - 1]; x.strokeStyle = 'rgba(140,245,240,.8)'; x.lineWidth = 3; x.beginPath(); x.moveTo(e[0] - 6, e[1]); x.lineTo(e[0] - 10, e[1] - 10); x.moveTo(e[0] + 6, e[1]); x.lineTo(e[0] + 10, e[1] - 10); x.stroke(); }
    svcNeural(c, x, w, h, t) { x.clearRect(0, 0, w, h); const layers = [5, 8, 8, 5]; const pad = w * .14; const gap = (w - pad * 2) / (layers.length - 1); const pos = layers.map((n, li) => { const cx = pad + li * gap; const vpad = h * .16; return Array.from({ length: n }, (_, i) => ({ x: cx, y: vpad + (h - 2 * vpad) * (n === 1 ? .5 : i / (n - 1)) })); });
      const front = ((t * .6) % 1) * (layers.length - 1);
      for (let li = 0; li < pos.length - 1; li++) { const act = Math.max(0, 1 - Math.abs(li + .5 - front) * 1.4); pos[li].forEach(a => pos[li + 1].forEach(b => { x.strokeStyle = 'rgba(38,208,206,' + (0.08 + act * .5) + ')'; x.lineWidth = act > .3 ? 1.4 : .7; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); })); }
      pos.forEach((layer, li) => { const act = Math.max(0, 1 - Math.abs(li - front) * 1.2); layer.forEach(nd => { x.beginPath(); x.fillStyle = 'rgba(' + (20 + act * 120) + ',' + (120 + act * 135) + ',' + (160 + act * 95) + ',1)'; x.shadowBlur = act * 16; x.shadowColor = 'rgba(80,240,235,.9)'; x.arc(nd.x, nd.y, 5 + act * 3, 0, 6.28); x.fill(); }); }); x.shadowBlur = 0; }
    svcBlueprint(c, x, w, h, t) { x.clearRect(0, 0, w, h);
      x.strokeStyle = 'rgba(38,208,206,.06)'; x.lineWidth = 1; for (let gx = 0; gx < w; gx += 26) { x.beginPath(); x.moveTo(gx, 0); x.lineTo(gx, h); x.stroke(); } for (let gy = 0; gy < h; gy += 26) { x.beginPath(); x.moveTo(0, gy); x.lineTo(w, gy); x.stroke(); }
      const m = w * .16; const els = [[m, h * .16, w - 2 * m, h * .09, 0], [m, h * .3, w - 2 * m, h * .22, .18], [m, h * .56, (w - 2 * m) * .55, h * .16, .42], [m + (w - 2 * m) * .6, h * .56, (w - 2 * m) * .4, h * .16, .42], [m, h * .76, (w - 2 * m) * .3, h * .08, .66], [m + (w - 2 * m) * .36, h * .76, (w - 2 * m) * .3, h * .08, .78]];
      const cyc = (t % 5) / 5; const fade = cyc > .82 ? 1 - (cyc - .82) / .18 : 1;
      x.strokeStyle = 'rgba(51,224,222,' + (.9 * fade) + ')'; x.lineWidth = 2;
      els.forEach(([ex, ey, ew, eh, st]) => { const p = Math.max(0, Math.min(1, (cyc - st) / .18)); if (p <= 0) return; const peri = 2 * (ew + eh); x.setLineDash([peri]); x.lineDashOffset = peri * (1 - p); x.strokeRect(ex, ey, ew, eh); }); x.setLineDash([]); }

    // ---------- event card backgrounds (static, drawn once when in view) ----------
    drawEventBgs() { let any = false; this.evCanvases.forEach(c => { const w = c.clientWidth, h = c.clientHeight; if (!w || !h) return; any = true; const x = this.size(c, w, h); this.evBg(x, w, h, parseInt(c.dataset.ev) || 1); }); if (any) this.evDrawn = true; }
    evBg(x, w, h, style) { x.clearRect(0, 0, w, h); const bg = x.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#0a2130'); bg.addColorStop(1, '#04101c'); x.fillStyle = bg; x.fillRect(0, 0, w, h);
      if (style === 1) { x.strokeStyle = 'rgba(46,208,206,.28)'; x.lineWidth = 1; const vx = w * .5, vy = h * .32; for (let i = -6; i <= 6; i++) { x.beginPath(); x.moveTo(vx, vy); x.lineTo(vx + i * w * .13, h); x.stroke(); } for (let j = 1; j < 7; j++) { const yy = vy + (h - vy) * Math.pow(j / 7, 1.6); x.beginPath(); x.moveTo(w * .5 - yy * .9, yy); x.lineTo(w * .5 + yy * .9, yy); x.stroke(); } }
      else if (style === 2) { for (let i = 0; i < 26; i++) { const px = Math.random() * w, ph = h * (.28 + Math.random() * .2), pw = w * .05; x.fillStyle = 'rgba(20,60,72,' + (.4 + Math.random() * .4) + ')'; x.beginPath(); x.arc(px, h - ph + pw, pw, Math.PI, 0); x.fillRect(px - pw, h - ph + pw, pw * 2, ph); x.fill(); x.fillStyle = 'rgba(46,208,206,.15)'; x.beginPath(); x.arc(px, h - ph, pw * .7, 0, 6.28); x.fill(); } }
      else { x.strokeStyle = 'rgba(46,208,206,.3)'; x.lineWidth = 1; x.fillStyle = 'rgba(51,224,222,.5)'; for (let i = 0; i < 10; i++) { const y = Math.random() * h, x0 = Math.random() * w; x.beginPath(); x.moveTo(x0, y); const len = w * .3; x.lineTo(x0 + len, y); x.lineTo(x0 + len + 12, y - 12); x.stroke(); x.beginPath(); x.arc(x0, y, 2, 0, 6.28); x.fill(); x.beginPath(); x.arc(x0 + len + 12, y - 12, 2, 0, 6.28); x.fill(); } } }

    // ---------- seabed ----------
    seabedInit() {
      const R = (a, b) => a + Math.random() * (b - a);
      const types = ['staghorn', 'staghorn', 'staghorn', 'fan', 'fan', 'sponge', 'brain', 'grass', 'grass'];
      this.reef = Array.from({ length: 24 }, () => {
        const dz = Math.random();
        return { x: Math.random(), dz, type: types[Math.floor(Math.random() * types.length)], scale: (0.55 + dz * 0.85) * R(0.85, 1.25), ph: R(0, 6.28) };
      }).sort((a, b) => a.dz - b.dz);
      this.anemones = Array.from({ length: 7 }, () => ({ x: Math.random(), dz: R(.3, 1), n: 10 + Math.floor(Math.random() * 5), ph: R(0, 6), scale: R(.55, 1.05) }));
      this.stars = Array.from({ length: 5 }, () => ({ x: Math.random(), y: R(.15, .85), rot: R(0, 6.28) }));
      this.sbP = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), s: Math.random() * 1.6 + .5, ph: Math.random() * 6 }));
      this.caustics = Array.from({ length: 5 }, () => ({ ph: R(0, 6), sp: R(.2, .5) }));
    }
    // recursive staghorn branch (deterministic shape; time-based sway only)
    _branch(x, ox, oy, ang, len, wt, hue, fade, t, ph) {
      if (len < 10 || wt < 0.8) {
        const sp = this.glow('170,255,235'), r = wt * 1.6 + 2.5;
        x.globalCompositeOperation = 'screen'; x.globalAlpha = 0.5 * fade; x.drawImage(sp, ox - r, oy - r, r * 2, r * 2);
        x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; return;
      }
      const sway = Math.sin(t * 0.8 + ph + oy * 0.012) * 0.06 * (len / 60);
      const a = ang + sway, ex = ox + Math.cos(a) * len, ey = oy + Math.sin(a) * len;
      x.lineCap = 'round';
      x.strokeStyle = 'rgba(' + hue + ',' + (0.6 * fade) + ')'; x.lineWidth = wt;
      x.beginPath(); x.moveTo(ox, oy); x.lineTo(ex, ey); x.stroke();
      x.strokeStyle = 'rgba(200,255,244,' + (0.16 * fade) + ')'; x.lineWidth = Math.max(0.6, wt * 0.34);
      x.beginPath(); x.moveTo(ox, oy); x.lineTo(ex, ey); x.stroke();
      this._branch(x, ex, ey, a - 0.5, len * 0.72, wt * 0.7, hue, fade, t, ph);
      this._branch(x, ex, ey, a + 0.5, len * 0.72, wt * 0.7, hue, fade, t, ph);
    }
    reefFan(x, bx, by, s, hue, ph, fade, t) {
      const H = 72 * s, ribs = 9, sway = Math.sin(t * 0.7 + ph) * 0.12; x.lineCap = 'round';
      for (let i = 0; i < ribs; i++) { const f = i / (ribs - 1) - 0.5, sp = f * 1.35 + sway; const tx = bx + Math.sin(sp) * H * 0.8, ty = by - Math.cos(sp) * H; x.strokeStyle = 'rgba(' + hue + ',' + (0.5 * fade) + ')'; x.lineWidth = 2.4 * s; x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(bx + Math.sin(sp) * H * 0.3, by - H * 0.55, tx, ty); x.stroke(); }
      x.strokeStyle = 'rgba(' + hue + ',' + (0.2 * fade) + ')'; x.lineWidth = 1 * s;
      for (let lvl = 0.32; lvl < 1; lvl += 0.22) { x.beginPath(); for (let i = 0; i < ribs; i++) { const f = i / (ribs - 1) - 0.5, sp = f * 1.35 + sway; const mx = bx + Math.sin(sp) * H * 0.8 * lvl, my = by - Math.cos(sp) * H * lvl; (i === 0 ? x.moveTo(mx, my) : x.lineTo(mx, my)); } x.stroke(); }
    }
    reefSponge(x, bx, by, s, hue, ph, fade, t) {
      const n = 4;
      for (let i = 0; i < n; i++) { const off = (i - (n - 1) / 2) * 11 * s, th = (44 + (i % 2) * 22) * s, tw = 8 * s, tx = bx + off, sway = Math.sin(t * 0.6 + ph + i) * 3; const g = x.createLinearGradient(tx, by - th, tx, by); g.addColorStop(0, 'rgba(' + hue + ',' + (0.5 * fade) + ')'); g.addColorStop(1, 'rgba(' + hue + ',' + (0.12 * fade) + ')'); x.fillStyle = g; x.beginPath(); x.moveTo(tx - tw, by); x.quadraticCurveTo(tx - tw + sway, by - th, tx + sway - tw * 0.4, by - th); x.lineTo(tx + sway + tw * 0.4, by - th); x.quadraticCurveTo(tx + tw + sway, by - th, tx + tw, by); x.closePath(); x.fill(); const sp = this.glow('150,255,235'), r = tw * 0.9; x.globalCompositeOperation = 'screen'; x.globalAlpha = 0.4 * fade; x.drawImage(sp, tx + sway - r, by - th - r * 0.6, r * 2, r * 1.2); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; }
    }
    reefBrain(x, bx, by, s, hue, fade) {
      const rw = 48 * s, rh = 28 * s; const g = x.createRadialGradient(bx, by - rh * 0.4, 2, bx, by, rw); g.addColorStop(0, 'rgba(' + hue + ',' + (0.5 * fade) + ')'); g.addColorStop(1, 'rgba(' + hue + ',' + (0.14 * fade) + ')'); x.fillStyle = g; x.beginPath(); x.ellipse(bx, by, rw, rh, 0, Math.PI, 0); x.fill();
      x.strokeStyle = 'rgba(8,26,26,' + (0.4 * fade) + ')'; x.lineWidth = 1.4 * s; for (let gy = 1; gy < 5; gy++) { const yy = by - gy * rh / 5, ww = Math.sqrt(Math.max(0, 1 - (gy / 5) * (gy / 5))) * rw; x.beginPath(); for (let px = -ww; px <= ww; px += 6) x.lineTo(bx + px, yy + Math.sin(px * 0.15 + gy) * 2); x.stroke(); }
    }
    reefGrass(x, bx, by, s, hue, ph, fade, t) {
      const n = 6; x.lineCap = 'round';
      for (let i = 0; i < n; i++) { const off = (i - (n - 1) / 2) * 5 * s, H = (48 + (i % 3) * 16) * s, sway = Math.sin(t * 1.1 + ph + i * 0.6) * 11 * s; x.strokeStyle = 'rgba(' + hue + ',' + (0.42 * fade) + ')'; x.lineWidth = 3 * s; x.beginPath(); x.moveTo(bx + off, by); x.quadraticCurveTo(bx + off + sway * 0.5, by - H * 0.6, bx + off + sway, by - H); x.stroke(); }
    }
    reefAnemone(x, bx, by, s, n, ph, fade, t) {
      const g = x.createRadialGradient(bx, by - 4 * s, 1, bx, by, 15 * s); g.addColorStop(0, 'rgba(150,255,235,' + (0.5 * fade) + ')'); g.addColorStop(1, 'rgba(70,200,180,' + (0.1 * fade) + ')'); x.fillStyle = g; x.beginPath(); x.ellipse(bx, by, 15 * s, 8 * s, 0, Math.PI, 0); x.fill();
      x.lineCap = 'round';
      for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i / (n - 1) - .5) * 1.9 + Math.sin(t * 1.6 + ph + i) * .18, l = 32 * s; const tx = bx + Math.cos(a) * l, ty = by + Math.sin(a) * l - l * 0.2; x.strokeStyle = 'rgba(120,235,215,' + (0.4 * fade) + ')'; x.lineWidth = 2.2 * s; x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(bx + Math.cos(a) * l * .5, by + Math.sin(a) * l * .5 - l * 0.1, tx, ty); x.stroke(); const sp = this.glow('150,255,235'), r = 3 * s + 2; x.globalCompositeOperation = 'screen'; x.globalAlpha = 0.5 * fade; x.drawImage(sp, tx - r, ty - r, r * 2, r * 2); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; }
    }
    drawSeabed(t) {
      const c = this.seabed; if (!c) return; const x = c.getContext('2d'), w = c.cw, h = c.ch; x.clearRect(0, 0, w, h); const floor = h * .7;
      const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(2,10,16,0)'); g.addColorStop(.55, 'rgba(2,12,18,.55)'); g.addColorStop(1, '#020a10'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      // caustic light shafts
      x.globalCompositeOperation = 'screen';
      this.caustics.forEach((cc, i) => { const a = 0.045 + 0.03 * Math.sin(t * cc.sp + cc.ph); const grd = x.createLinearGradient(0, 0, 0, floor); grd.addColorStop(0, 'rgba(90,220,215,' + a + ')'); grd.addColorStop(1, 'rgba(90,220,215,0)'); x.fillStyle = grd; const bx = ((i + 0.5) / this.caustics.length) * w + Math.sin(t * 0.3 + cc.ph) * 60; x.beginPath(); x.moveTo(bx - 70, 0); x.lineTo(bx + 70, 0); x.lineTo(bx + 20, floor); x.lineTo(bx - 120, floor); x.closePath(); x.fill(); });
      x.globalCompositeOperation = 'source-over';
      const baseY = (rx) => floor + Math.sin(rx * 0.006 + 1) * 14 + Math.sin(rx * 0.02) * 5;
      // sandy sloping floor
      const fg = x.createLinearGradient(0, floor - 20, 0, h); fg.addColorStop(0, '#0a1a1c'); fg.addColorStop(1, '#04100f'); x.fillStyle = fg;
      x.beginPath(); x.moveTo(0, h); x.lineTo(0, baseY(0)); for (let px = 0; px <= w; px += 24) x.lineTo(px, baseY(px)); x.lineTo(w, h); x.closePath(); x.fill();
      x.strokeStyle = 'rgba(120,200,190,.05)'; x.lineWidth = 1; for (let y = floor + 14; y < h; y += 9) { x.beginPath(); for (let px = 0; px <= w; px += 12) { const yy = y + Math.sin(px * .03 + y) * 2; (px === 0 ? x.moveTo(px, yy) : x.lineTo(px, yy)); } x.stroke(); }
      // sea stars resting on the sand (behind reef)
      this.stars.forEach(s => { const sx = s.x * w, sy = floor + 20 + s.y * (h - floor - 30); x.save(); x.translate(sx, sy); x.rotate(s.rot); x.fillStyle = 'rgba(48,150,140,.5)'; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 4 : 11; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill(); x.restore(); });
      // reef, back-to-front
      this.reef.forEach(r => { const bx = r.x * w, by = baseY(bx) + 4, fade = 0.35 + r.dz * 0.65;
        // Dynamically scale trees to ensure they never exceed the top of the canvas (with 10px gap)
        const maxTreeHeight = 220; // Approx max height for base scale
        const heightScale = Math.max(0.1, (floor - 10) / (maxTreeHeight * 1.75));
        const s = r.scale * Math.min(1, heightScale * 1.2);
        if (r.type === 'staghorn') this._branch(x, bx, by, -Math.PI / 2, 66 * s, 7 * s, '110,225,205', fade, t, r.ph);
        else if (r.type === 'fan') this.reefFan(x, bx, by, s, '60,205,200', r.ph, fade, t);
        else if (r.type === 'sponge') this.reefSponge(x, bx, by, s, '95,215,205', r.ph, fade, t);
        else if (r.type === 'brain') this.reefBrain(x, bx, by, s, '70,185,180', fade);
        else this.reefGrass(x, bx, by, s, '82,205,155', r.ph, fade, t);
      });
      this.anemones.forEach(an => { const bx = an.x * w, by = baseY(bx) + 4, fade = 0.35 + an.dz * 0.65; this.reefAnemone(x, bx, by, an.scale, an.n, an.ph, fade, t); });
      this.drawAnchor(x, w * .82, floor + 8, h);
      const sprite = this.glow('120,255,230'); x.globalCompositeOperation = 'screen'; this.sbP.forEach(p => { if (!this.reduced) { p.y -= .0006 * this.speed; if (p.y < 0) p.y = 1; } const px = p.x * w, py = p.y * h; const a = .35 + .4 * Math.sin(t * 2 + p.ph); const r = p.s * 3; x.globalAlpha = a; x.drawImage(sprite, px - r, py - r, r * 2, r * 2); }); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
    }
    drawAnchor(x, ax, ay, h) { x.save(); x.translate(ax, ay); x.rotate(.35); x.strokeStyle = 'rgba(60,200,196,.4)'; x.lineWidth = 6; x.fillStyle = '#060f16';
      x.beginPath(); x.arc(0, -h * .16, 12, 0, 6.28); x.stroke();
      x.beginPath(); x.moveTo(0, -h * .14); x.lineTo(0, h * .02); x.stroke();
      x.beginPath(); x.moveTo(-26, -h * .1); x.lineTo(26, -h * .1); x.stroke();
      x.beginPath(); x.moveTo(0, h * .02); x.quadraticCurveTo(-40, h * .02, -40, -h * .03); x.moveTo(0, h * .02); x.quadraticCurveTo(40, h * .02, 40, -h * .03); x.stroke();
      x.fillStyle = 'rgba(60,200,196,.3)'; x.beginPath(); x.moveTo(-40, -h * .03); x.lineTo(-52, -h * .02); x.lineTo(-38, h * .01); x.closePath(); x.fill(); x.beginPath(); x.moveTo(40, -h * .03); x.lineTo(52, -h * .02); x.lineTo(38, h * .01); x.closePath(); x.fill();
      x.fillStyle = 'rgba(60,200,196,.25)'; for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(Math.sin(i) * 4, -h * .16 - i * 16, 4, 0, 6.28); x.fill(); }
      x.restore(); }
  }

  window.DepthEngine = DepthEngine;
})();
