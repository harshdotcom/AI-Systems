/* ================================================================
   THE CENTRAL LIBRARY — ambient network background
   ----------------------------------------------------------------
   A quiet, drifting network of nodes and links, drawn in the page's
   ink colour. Every page uses the same scene.

     <script src="book-bg.js?v=2"></script>

   Options (data attributes on the script tag):
     data-target     CSS selector: draw inside that element only
                     (the home and profile heroes); otherwise the
                     canvas is fixed behind the whole page
     data-color      CSS colour variable to draw with (default --ink)
     data-intensity  overall strength multiplier (default 0.75)

   The canvas never takes pointer events, pauses when the tab or
   the element is hidden, and renders a single still frame for
   people who prefer reduced motion.
================================================================ */
(() => {
  "use strict";

  const me = document.currentScript;
  const opt = (me && me.dataset) || {};
  const TARGET = opt.target ? document.querySelector(opt.target) : null;
  if (opt.target && !TARGET) return;
  const COLOR_VAR = opt.color || "--ink";
  const INTENSITY = parseFloat(opt.intensity) || 0.75;

  /* ---------- canvas ---------- */
  const cv = document.createElement("canvas");
  cv.className = "ambient-bg";
  cv.setAttribute("aria-hidden", "true");
  const base = "pointer-events:none;display:block;max-width:none;";
  if (TARGET) {
    if (getComputedStyle(TARGET).position === "static") TARGET.style.position = "relative";
    TARGET.style.isolation = "isolate";
    cv.style.cssText = base + "position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;";
    TARGET.prepend(cv);
  } else {
    cv.style.cssText = base + "position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:0;";
    document.body.prepend(cv);
  }
  const ctx = cv.getContext("2d");
  if (!ctx) return;

  /* ---------- state and drawing helpers ---------- */
  const TAU = Math.PI * 2;
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  let W = 0, H = 0, k = 1, rgb = [128, 128, 128];
  const mouse = { x: -1e4, y: -1e4 };
  // Inside a hero the scene sits behind headline text: keep the left and bottom calm.
  const fade = TARGET
    ? (x, y) => (0.28 + 0.72 * smooth(W * 0.05, W * 0.62, x)) * (1 - smooth(H * 0.6, H, y))
    : () => 1;
  const col = a => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${clamp(a * k, 0, 1).toFixed(3)})`;
  const line = (x1, y1, x2, y2, a, w) => {
    ctx.strokeStyle = col(a); ctx.lineWidth = w;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  };
  const dot = (x, y, r, a) => { ctx.fillStyle = col(a); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); };

  /* ---------- the network ---------- */
  const LINK = 165, MOUSE = 200;
  let nodes = [], links = [], pulses = [];

  function init() {
    const n = clamp(Math.round((W * H) / 25000), 12, 72);
    nodes = Array.from({ length: n }, () => ({
      x: rand(0, W), y: rand(0, H), vx: rand(-0.18, 0.18), vy: rand(-0.18, 0.18),
      r: rand(1.5, 3), ph: rand(0, TAU),
    }));
    pulses = [];
  }

  function update(f) {
    for (const n of nodes) {
      n.x += n.vx * f; n.y += n.vy * f;
      const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (md < 90 && md > 0) { n.x += ((n.x - mouse.x) / md) * 0.4 * f; n.y += ((n.y - mouse.y) / md) * 0.4 * f; }
      if (n.x < -20) n.x = W + 20; else if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20; else if (n.y > H + 20) n.y = -20;
    }
    links = [];
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < LINK) links.push([a, b, 1 - d / LINK]);
    }
    const strong = links.filter(l => l[2] > 0.35);
    if (strong.length && pulses.length < 9 && Math.random() < 0.05 * f) {
      const [a, b] = strong[(Math.random() * strong.length) | 0];
      pulses.push({ a, b, p: 0, s: rand(0.006, 0.014) });
    }
    pulses = pulses.filter(q => (q.p += q.s * f) < 1);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (const [a, b, o] of links) line(a.x, a.y, b.x, b.y, o * 0.5 * fade((a.x + b.x) / 2, (a.y + b.y) / 2), 0.9);
    for (const n of nodes) {
      const fd = fade(n.x, n.y);
      const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (md < MOUSE) line(n.x, n.y, mouse.x, mouse.y, (1 - md / MOUSE) * 0.5 * fd, 1);
      const tw = 0.55 + 0.45 * Math.sin(t / 900 + n.ph);
      dot(n.x, n.y, n.r, (0.6 + 0.4 * tw) * fd);
      if (n.r > 2.2) dot(n.x, n.y, n.r * 4, 0.12 * tw * fd);
    }
    for (const q of pulses) {
      const x = q.a.x + (q.b.x - q.a.x) * q.p, y = q.a.y + (q.b.y - q.a.y) * q.p, fd = fade(x, y);
      dot(x, y, 1.8 * 3.4, 0.15 * fd); dot(x, y, 1.8, 0.95 * fd);
    }
  }

  /* ---------- colour and theme ---------- */
  function readColors() {
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    probe.style.color = getComputedStyle(document.documentElement).getPropertyValue(COLOR_VAR).trim() || "#888";
    document.body.appendChild(probe);
    const m = getComputedStyle(probe).color.match(/[\d.]+/g);
    probe.remove();
    if (m) rgb = m.slice(0, 3).map(Number);
    const b = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g);
    if (b && (b.length < 4 || +b[3] > 0)) {
      const lum = b[0] * 0.299 + b[1] * 0.587 + b[2] * 0.114;
      k = (lum < 128 ? 1 : 0.8) * INTENSITY;
    }
  }

  /* ---------- sizing ---------- */
  let lastW = 0, lastH = 0, clock = 0;
  function resize(force) {
    const w = Math.round(TARGET ? TARGET.clientWidth : innerWidth);
    const h = Math.round(TARGET ? TARGET.clientHeight : innerHeight);
    if (!w || !h) return false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = w; H = h;
    // Rebuild only when the size really changes; ignore a mobile
    // address bar sliding in and out.
    if (force || w !== lastW || Math.abs(h - lastH) > 120) {
      lastW = w; lastH = h;
      init();
      for (let i = 0; i < 240; i++) { clock += 16.7; update(1); }
    }
    draw(clock);
    return true;
  }

  /* ---------- loop ---------- */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let raf = 0, last = 0, visible = true;
  function frame(now) {
    const dt = Math.min(48, now - (last || now)); last = now;
    clock += dt;
    update(dt / 16.67);
    draw(clock);
    raf = requestAnimationFrame(frame);
  }
  function start() {
    cancelAnimationFrame(raf); raf = 0; last = 0;
    if (!W && !resize(true)) return;
    if (reduce.matches || document.hidden || !visible) { draw(clock); return; }
    raf = requestAnimationFrame(frame);
  }

  let rt = 0;
  const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { resize(false); start(); }, 120); };
  addEventListener("resize", onResize);
  if (TARGET && "ResizeObserver" in window) new ResizeObserver(onResize).observe(TARGET);
  if (TARGET && "IntersectionObserver" in window) {
    new IntersectionObserver(es => { visible = es[0].isIntersecting; start(); }).observe(TARGET);
  }
  addEventListener("pointermove", e => {
    if (TARGET) { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }
    else { mouse.x = e.clientX; mouse.y = e.clientY; }
  }, { passive: true });
  document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -1e4; });
  document.addEventListener("visibilitychange", start);
  reduce.addEventListener ? reduce.addEventListener("change", start) : reduce.addListener(start);

  const recolor = () => { readColors(); if (!raf) draw(clock); };
  new MutationObserver(recolor).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
  const dark = matchMedia("(prefers-color-scheme: dark)");
  dark.addEventListener ? dark.addEventListener("change", recolor) : dark.addListener(recolor);

  readColors();
  resize(true);
  start();
})();
