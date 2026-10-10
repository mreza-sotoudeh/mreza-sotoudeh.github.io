// A three-link planar arm (FABRIK inverse kinematics) that follows the pointer.
(() => {
  const canvas = document.getElementById("robot-canvas");
  const ctx = canvas.getContext("2d");
  const toggle = document.querySelector(".robot-motion");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let paused = reduced, W, H, base, lens, pts, target = { x: 0, y: 0 }, pointer = null, t = 0;

  function resize() {
    const d = devicePixelRatio || 1;
    W = innerWidth; H = innerHeight;
    canvas.width = W * d; canvas.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    const s = Math.min(W, 900) / 900 * 0.95 + 0.25;
    lens = [190, 160, 110].map((l) => l * s);
    base = { x: W > 700 ? W * 0.82 : W * 0.5, y: H + 6 };
    pts = [base, ...lens.map((_, i) => ({ x: base.x - 10 * (i + 1), y: base.y - lens.slice(0, i + 1).reduce((a, b) => a + b) }))];
    draw();
  }
  function solve() {
    const reach = lens.reduce((a, b) => a + b);
    let dx = target.x - base.x, dy = target.y - base.y, d = Math.hypot(dx, dy);
    if (d > reach) { target = { x: base.x + dx / d * reach, y: base.y + dy / d * reach }; }
    for (let k = 0; k < 8; k++) {
      pts[3] = { ...target };
      for (let i = 2; i >= 0; i--) { const v = sub(pts[i], pts[i + 1]); pts[i] = add(pts[i + 1], scale(v, lens[i])); }
      pts[0] = { ...base };
      for (let i = 0; i < 3; i++) { const v = sub(pts[i + 1], pts[i]); pts[i + 1] = add(pts[i], scale(v, lens[i])); }
    }
  }
  const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
  const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
  const scale = (v, l) => { const n = Math.hypot(v.x, v.y) || 1; return { x: v.x / n * l, y: v.y / n * l }; };

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(255,180,84,.55)"; ctx.lineWidth = 14;
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke();
    ctx.strokeStyle = "#0b1f3a"; ctx.lineWidth = 8; ctx.stroke();
    pts.forEach((p, i) => {
      ctx.beginPath(); ctx.arc(p.x, p.y, i === 3 ? 6 : 10, 0, 7);
      ctx.fillStyle = i === 3 ? "#ffb454" : "#0b1f3a"; ctx.fill();
      ctx.strokeStyle = "#ffb454"; ctx.lineWidth = 2; ctx.stroke();
    });
  }
  function frame() {
    if (!paused) {
      t += 0.012;
      target = pointer || { x: base.x - 150 + Math.sin(t) * 190, y: base.y - 280 + Math.cos(t * 1.3) * 70 };
      solve(); draw();
    }
    requestAnimationFrame(frame);
  }
  addEventListener("resize", resize);
  addEventListener("pointermove", (e) => { pointer = { x: e.clientX, y: e.clientY }; });
  addEventListener("pointerleave", () => { pointer = null; });
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.textContent = paused ? "Play arm" : "Pause arm";
    toggle.addEventListener("click", () => {
      paused = !paused;
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.textContent = paused ? "Play arm" : "Pause arm";
    });
  }
  resize(); requestAnimationFrame(frame);
})();
