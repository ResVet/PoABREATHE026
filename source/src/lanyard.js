// The committee ID card: a 2D canvas design used as the texture of a 3D card that hangs
// from a verlet-rope lanyard, plus the same design exported as a PNG for sharing.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const HEX = { coral: '#E05744', tomato: '#D52518', carrot: '#F96015', sun: '#FFC926', cream: '#F3E8CC', forest: '#18542A', kiwi: '#9ABC05', ink: '#0E1B12', paper: '#FBF4E4' };
const LIGHT_TEXT_ON = new Set(['forest', 'tomato']);
const TEX_W = 1024, TEX_H = 1620;
const CARD_W = 1.24, CARD_H = (1.24 * TEX_H) / TEX_W;

const LUNG_L = 'M18.5 13C13 14 8.5 22.5 7.5 31c-.7 6 1.3 10 6 10 4 0 6.5-2.5 6.5-7V17.5c0-2.7-.4-4.5-1.5-4.5Z';
const LUNG_R = 'M29.5 13C35 14 39.5 22.5 40.5 31c.7 6-1.3 10-6 10-4 0-6.5-2.5-6.5-7V17.5c0-2.7.4-4.5 1.5-4.5Z';
const TRACHEA = 'M24 6v13m0 0-5 5m5-5 5 5';

let fontsReady = null;
export function ensureFonts() {
  if (!fontsReady) {
    fontsReady = Promise.all([
      document.fonts.load('900 120px "Anybody"'),
      document.fonts.load('800 80px "Archivo"'),
      document.fonts.load('500 30px "Plex Mono"'),
    ]).catch(() => {});
  }
  return fontsReady;
}

function setFont(ctx, weight, stretch, size, family) {
  const px = Math.round(size);
  ctx.font = `${weight} ${stretch ? stretch + ' ' : ''}${px}px ${family}`;
  if (stretch && ctx.font.indexOf(px + 'px') < 0) ctx.font = `${weight} ${px}px ${family}`;
}
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function drawLungs(ctx, cx, cy, size, stroke, fill) {
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);
  ctx.scale(size / 48, size / 48);
  ctx.lineWidth = 3;
  ctx.lineCap = ctx.lineJoin = 'round';
  ctx.strokeStyle = stroke;
  ctx.stroke(new Path2D(TRACHEA));
  ctx.stroke(new Path2D(LUNG_L));
  ctx.fillStyle = fill;
  ctx.fill(new Path2D(LUNG_R));
  ctx.beginPath();
  ctx.arc(13, 32, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
function wave(ctx, x0, x1, y, amp, color, width) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = ctx.lineJoin = 'round';
  ctx.beginPath();
  const n = 220;
  for (let i = 0; i <= n; i++) {
    const u = i / n, x = x0 + (x1 - x0) * u;
    const ph = (u * 4.2) % 1, big = u > 0.47 && u < 0.72 ? 1.7 : 1;
    const f = ph < 0.4 ? Math.sin((ph / 0.4) * Math.PI * 0.5) : Math.cos(((ph - 0.4) / 0.6) * Math.PI * 0.5);
    const yy = y - f * amp * big;
    i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy);
  }
  ctx.stroke();
  ctx.restore();
}
function wrapFit(ctx, text, maxW, maxLines, big, small, weight, family) {
  const words = String(text).split(/\s+/);
  for (let size = big; size >= small; size -= 4) {
    setFont(ctx, weight, '', size, family);
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width <= maxW || !line) line = test;
      else { lines.push(line); line = w; }
    }
    lines.push(line);
    if (lines.length <= maxLines && lines.every((l) => ctx.measureText(l).width <= maxW)) return { size, lines };
  }
  setFont(ctx, weight, '', small, family);
  return { size: small, lines: [String(text)] };
}

export function drawCardFront(ctx, p, W = TEX_W, H = TEX_H) {
  const u = W / 1024;
  ctx.save();
  ctx.fillStyle = HEX.cream;
  ctx.fillRect(0, 0, W, H);
  const bandH = 560 * u;
  ctx.fillStyle = HEX.coral;
  ctx.fillRect(0, 0, W, bandH);
  ctx.strokeStyle = 'rgba(243,232,204,.2)';
  ctx.lineWidth = 3 * u;
  for (let i = 1; i <= 7; i++) { ctx.beginPath(); ctx.arc(W - 160 * u, 190 * u, i * 54 * u, 0, Math.PI * 2); ctx.stroke(); }
  rrect(ctx, W / 2 - 92 * u, 50 * u, 184 * u, 38 * u, 19 * u);
  ctx.fillStyle = 'rgba(14,27,18,.32)';
  ctx.fill();
  ctx.fillStyle = HEX.cream;
  ctx.textBaseline = 'alphabetic';
  setFont(ctx, 500, '', 30 * u, '"Plex Mono", monospace');
  ctx.fillText('POINT OF ACTION 2026', 64 * u, 182 * u);
  let ps = 236 * u;
  setFont(ctx, 900, 'condensed', ps, '"Anybody", sans-serif');
  const pw = ctx.measureText('PANITIA').width;
  if (pw > W - 128 * u) { ps *= (W - 128 * u) / pw; setFont(ctx, 900, 'condensed', ps, '"Anybody", sans-serif'); }
  ctx.fillText('PANITIA', 58 * u, 412 * u);
  setFont(ctx, 500, '', 27 * u, '"Plex Mono", monospace');
  ctx.fillText('TEMA  ·  BREATHE', 64 * u, 498 * u);
  drawLungs(ctx, W - 160 * u, 190 * u, 150 * u, HEX.cream, HEX.sun);

  const x0 = 64 * u, maxW = W - 128 * u;
  ctx.fillStyle = 'rgba(14,27,18,.55)';
  setFont(ctx, 500, '', 26 * u, '"Plex Mono", monospace');
  ctx.fillText('NAMA', x0, 652 * u);
  ctx.fillStyle = HEX.ink;
  const nm = wrapFit(ctx, p.name, maxW, 2, 100 * u, 52 * u, 800, '"Archivo", sans-serif');
  let y = 652 * u + 22 * u + nm.size * 0.92;
  nm.lines.forEach((l, i) => { ctx.fillText(l, x0, y); if (i < nm.lines.length - 1) y += nm.size * 1.04; });
  y += 92 * u;
  ctx.fillStyle = 'rgba(14,27,18,.55)';
  setFont(ctx, 500, '', 26 * u, '"Plex Mono", monospace');
  ctx.fillText('JABATAN', x0, y);
  y += 22 * u + 70 * u;
  ctx.fillStyle = HEX.ink;
  let rs = 78 * u;
  setFont(ctx, 800, 'condensed', rs, '"Anybody", sans-serif');
  const rw = ctx.measureText(p.role).width;
  if (rw > maxW) { rs *= maxW / rw; setFont(ctx, 800, 'condensed', rs, '"Anybody", sans-serif'); }
  ctx.fillText(p.role, x0, y);
  y += 40 * u;
  setFont(ctx, 700, '', 46 * u, '"Archivo", sans-serif');
  const chipText = p.group;
  const cw = Math.min(maxW, ctx.measureText(chipText).width + 64 * u);
  rrect(ctx, x0, y, cw, 88 * u, 44 * u);
  ctx.fillStyle = HEX[p.color] || HEX.sun;
  ctx.fill();
  ctx.fillStyle = LIGHT_TEXT_ON.has(p.color) ? HEX.cream : HEX.ink;
  ctx.fillText(chipText, x0 + 32 * u, y + 60 * u, maxW - 64 * u);

  const by = H - 330 * u;
  ctx.fillStyle = HEX.forest;
  ctx.fillRect(0, by, W, H - by);
  wave(ctx, 64 * u, W - 64 * u, by + 92 * u, 34 * u, HEX.sun, 5 * u);
  ctx.fillStyle = HEX.cream;
  setFont(ctx, 820, 'condensed', 64 * u, '"Anybody", sans-serif');
  ctx.fillText('ASTRAMEDICA', 64 * u, H - 120 * u);
  setFont(ctx, 500, '', 23 * u, '"Plex Mono", monospace');
  ctx.fillText('FK UNIVERSITAS SRIWIJAYA', 64 * u, H - 74 * u);
  ctx.textAlign = 'right';
  ctx.fillStyle = HEX.sun;
  setFont(ctx, 500, '', 30 * u, '"Plex Mono", monospace');
  ctx.fillText('PoA26 · ' + p.id, W - 64 * u, H - 120 * u);
  ctx.fillStyle = HEX.cream;
  setFont(ctx, 500, '', 23 * u, '"Plex Mono", monospace');
  ctx.fillText('PALEMBANG', W - 64 * u, H - 74 * u);
  ctx.restore();
}

function drawCardBack(ctx, W = TEX_W, H = TEX_H) {
  const u = W / 1024;
  ctx.fillStyle = HEX.coral;
  ctx.fillRect(0, 0, W, H);
  const cols = [HEX.cream, HEX.sun, HEX.carrot, 'rgba(14,27,18,.18)'];
  setFont(ctx, 900, 'condensed', 170 * u, '"Anybody", sans-serif');
  ctx.textBaseline = 'alphabetic';
  for (let r = 0, y = 150 * u; y < H + 160 * u; r++, y += 150 * u) {
    ctx.fillStyle = cols[r % cols.length];
    ctx.fillText('BREATHE BREATHE', (r % 2 ? -220 : -40) * u, y);
  }
  ctx.fillStyle = HEX.cream;
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 230 * u, 0, Math.PI * 2);
  ctx.fill();
  drawLungs(ctx, W / 2, H / 2 - 30 * u, 230 * u, HEX.ink, HEX.coral);
  ctx.fillStyle = HEX.ink;
  ctx.textAlign = 'center';
  setFont(ctx, 500, '', 28 * u, '"Plex Mono", monospace');
  ctx.fillText('POA BREATHE 2026', W / 2, H / 2 + 150 * u);
  ctx.textAlign = 'left';
}

function drawStrap(ctx, w, h) {
  ctx.fillStyle = HEX.carrot;
  ctx.fillRect(0, 0, w, h);
  ctx.save();
  ctx.translate(w / 2, 0);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = HEX.cream;
  setFont(ctx, 500, '', 46, '"Plex Mono", monospace');
  ctx.textBaseline = 'middle';
  ctx.fillText('POA BREATHE 2026  ·  ASTRAMEDICA  ·', 6, 0);
  ctx.restore();
}

const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function initLanyard({ reduced }) {
  const canvas = document.getElementById('lanyard');
  const fallback = document.getElementById('card-fallback');
  const front = document.createElement('canvas');
  front.width = TEX_W; front.height = TEX_H;
  let renderer = null, scene, camera, card, frontTex, strapGeo, ring, ok = true, active = false, W = 0, H = 0;
  const N = 8, SEG = 0.2, ANCHOR = new THREE.Vector3(0, 2.9, 0);
  const P = [], Q = [];
  for (let i = 0; i <= N; i++) { P.push(new THREE.Vector3()); Q.push(new THREE.Vector3()); }
  let spin = 0, spinVel = 0, dragging = false, touched = false, acc = 0, t = 0;
  const target = new THREE.Vector3(), grab = new THREE.Vector3();
  let confetti = null, confLive = false;
  const conf = [], cm = new THREE.Matrix4(), cq = new THREE.Quaternion(), cs = new THREE.Vector3();
  const raycaster = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), ndc = new THREE.Vector2(), hitP = new THREE.Vector3();

  function setup() {
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (e) {
      ok = false;
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.setClearColor(0, 0);
    scene = new THREE.Scene();
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.9;
    pm.dispose();
    camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    const key = new THREE.DirectionalLight(0xfff2e2, 1.4);
    key.position.set(3, 4, 6);
    scene.add(key);

    frontTex = new THREE.CanvasTexture(front);
    frontTex.colorSpace = THREE.SRGBColorSpace;
    frontTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const backC = document.createElement('canvas');
    backC.width = TEX_W; backC.height = TEX_H;
    drawCardBack(backC.getContext('2d'));
    const backTex = new THREE.CanvasTexture(backC);
    backTex.colorSpace = THREE.SRGBColorSpace;
    const face = (map) => new THREE.MeshPhysicalMaterial({ map, roughness: 0.38, clearcoat: 1, clearcoatRoughness: 0.12 });
    const side = new THREE.MeshPhysicalMaterial({ color: 0xefe6d2, roughness: 0.4, clearcoat: 0.6 });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xdfe3e6, metalness: 1, roughness: 0.2 });
    card = new THREE.Group();
    const body = new THREE.Mesh(new RoundedBoxGeometry(CARD_W, CARD_H, 0.03, 4, 0.06), [side, side, side, side, face(frontTex), face(backTex)]);
    body.position.y = -(0.17 + CARD_H / 2);
    const clasp = new THREE.Mesh(new RoundedBoxGeometry(0.17, 0.2, 0.06, 2, 0.025), chrome);
    clasp.position.y = -0.1;
    card.add(body, clasp);
    scene.add(card);
    ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.017, 10, 28), chrome);
    scene.add(ring);

    const sc = document.createElement('canvas');
    sc.width = 128; sc.height = 1024;
    drawStrap(sc.getContext('2d'), 128, 1024);
    const strapTex = new THREE.CanvasTexture(sc);
    strapTex.colorSpace = THREE.SRGBColorSpace;
    strapTex.wrapS = strapTex.wrapT = THREE.RepeatWrapping;
    strapTex.anisotropy = 4;
    const M = N + 2;
    strapGeo = new THREE.BufferGeometry();
    strapGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(M * 6), 3));
    strapGeo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(M * 4), 2));
    const nrm = new Float32Array(M * 6);
    for (let i = 0; i < M * 2; i++) nrm[i * 3 + 2] = 1;
    strapGeo.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    const idx = [];
    for (let i = 0; i < M - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    strapGeo.setIndex(idx);
    const strap = new THREE.Mesh(strapGeo, new THREE.MeshStandardMaterial({ map: strapTex, roughness: 0.62, side: THREE.DoubleSide }));
    strap.frustumCulled = false;
    scene.add(strap);

    const CN = reduced ? 0 : 90;
    if (CN) {
      confetti = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.075, 0.13), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.5, metalness: 0.1 }), CN);
      confetti.frustumCulled = false;
      confetti.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      const cols = ['#E05744', '#FFC926', '#F96015', '#9ABC05', '#18542A', '#F3E8CC'].map((h) => new THREE.Color(h));
      for (let i = 0; i < CN; i++) {
        confetti.setColorAt(i, cols[i % cols.length]);
        conf.push({ p: new THREE.Vector3(), v: new THREE.Vector3(), r: new THREE.Euler(), w: new THREE.Vector3(), ph: Math.random() * 6.28, live: false });
      }
      scene.add(confetti);
    }

    const toWorld = (e) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      return raycaster.ray.intersectPlane(plane, hitP) ? hitP : null;
    };
    canvas.addEventListener('pointerdown', (e) => {
      const w = toWorld(e);
      if (!w) return;
      dragging = true;
      touched = true;
      grab.subVectors(P[N], w);
      target.copy(P[N]);
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    });
    canvas.addEventListener('pointermove', (e) => { if (!dragging) return; const w = toWorld(e); if (w) target.copy(w).add(grab); });
    const end = () => { dragging = false; };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('lostpointercapture', end);
  }

  function spawnConfetti() {
    if (!confetti) return;
    conf.forEach((c) => {
      c.p.set((Math.random() - 0.5) * 4.6, 1.4 + Math.random() * 3.2, (Math.random() - 0.5) * 1.6);
      c.v.set((Math.random() - 0.5) * 0.6, -(0.75 + Math.random() * 1.1), 0);
      c.r.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      c.w.set((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6);
      c.live = true;
    });
    confLive = true;
  }
  function updConfetti(dt) {
    if (!confetti || !confLive) return;
    let any = false;
    for (let i = 0; i < conf.length; i++) {
      const c = conf[i];
      if (c.live) {
        c.p.x += (c.v.x + Math.sin(t * 2.2 + c.ph) * 0.35) * dt;
        c.p.y += c.v.y * dt;
        c.r.x += c.w.x * dt; c.r.y += c.w.y * dt; c.r.z += c.w.z * dt;
        if (c.p.y < -2.8) c.live = false; else any = true;
      }
      cq.setFromEuler(c.r);
      cs.setScalar(c.live ? 1 : 0);
      cm.compose(c.p, cq, cs);
      confetti.setMatrixAt(i, cm);
    }
    confetti.instanceMatrix.needsUpdate = true;
    confLive = any;
  }

  function resetRope() {
    const a = reduced ? 0.1 : 0.95;
    for (let i = 0; i <= N; i++) {
      P[i].set(ANCHOR.x + Math.sin(a) * i * SEG, ANCHOR.y - Math.cos(a) * i * SEG, 0);
      Q[i].copy(P[i]);
    }
    spin = 0; spinVel = 0; acc = 0; touched = false;
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h || (w === W && h === H)) return;
    W = w; H = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const d = Math.max(6.8, 4.6 / camera.aspect);
    camera.position.set(0, 0.35, d);
    camera.lookAt(0, 0.35, 0);
    camera.updateProjectionMatrix();
  }

  function step(dt) {
    const g = -16 * dt * dt;
    for (let i = 1; i <= N; i++) {
      if (i === N && dragging) continue;
      const p = P[i], q = Q[i];
      const vx = (p.x - q.x) * 0.981, vy = (p.y - q.y) * 0.981, vz = (p.z - q.z) * 0.9;
      q.copy(p);
      p.x += vx; p.y += vy + g; p.z += vz;
    }
    if (dragging) {
      const p = P[N];
      Q[N].copy(p);
      p.lerp(target, 0.35);
      p.z = 0;
    } else if (!reduced) {
      P[N].x += Math.sin(t * 0.9) * 0.00035;
    }
    for (let it = 0; it < 8; it++) {
      for (let i = 0; i < N; i++) {
        const a = P[i], b = P[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
        const diff = (len - SEG) / len;
        const wa = i === 0 ? 0 : 1;
        const wb = i + 1 === N ? (dragging ? 0 : 0.25) : 1;
        if (wa + wb === 0) continue;
        const s = diff / (wa + wb);
        a.x += dx * s * wa; a.y += dy * s * wa; a.z += dz * s * wa;
        b.x -= dx * s * wb; b.y -= dy * s * wb; b.z -= dz * s * wb;
      }
    }
    const vx = P[N].x - Q[N].x;
    spinVel += vx * (touched ? 1.3 : 0.15) - Math.sin(spin) * 0.03;
    spinVel *= 0.93;
    spin += spinVel;
  }

  const tmp = new THREE.Vector3(), side = new THREE.Vector3(), Z = new THREE.Vector3(0, 0, 1);
  function updateMeshes() {
    const tilt = Math.atan2(P[N].x - P[N - 1].x, -(P[N].y - P[N - 1].y));
    card.position.copy(P[N]);
    card.rotation.set(0, spin, tilt, 'ZYX');
    ring.position.copy(P[N]);
    const pts = [tmp.copy(ANCHOR).add(new THREE.Vector3(0, 1.6, 0)).clone(), ...P];
    const pos = strapGeo.attributes.position.array, uv = strapGeo.attributes.uv.array;
    let L = 0;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      side.subVectors(b, a).cross(Z).normalize().multiplyScalar(0.085);
      if (i > 0) L += pts[i].distanceTo(pts[i - 1]);
      const p = pts[i];
      pos.set([p.x - side.x, p.y - side.y, p.z - 0.01, p.x + side.x, p.y + side.y, p.z - 0.01], i * 6);
      const v = -L / 1.1;
      uv.set([0, v, 1, v], i * 4);
    }
    strapGeo.attributes.position.needsUpdate = true;
    strapGeo.attributes.uv.needsUpdate = true;
  }

  return {
    async open(p) {
      await ensureFonts();
      const ctx = front.getContext('2d');
      ctx.clearRect(0, 0, TEX_W, TEX_H);
      drawCardFront(ctx, p);
      if (!renderer && ok) setup();
      if (!ok) {
        canvas.hidden = true;
        fallback.src = front.toDataURL('image/png');
        fallback.hidden = false;
        return;
      }
      frontTex.needsUpdate = true;
      resetRope();
      spawnConfetti();
      W = H = 0;
      active = true;
    },
    close() { active = false; dragging = false; },
    frame(now, dt) {
      if (!active) return;
      resize();
      t += dt;
      acc = Math.min(acc + dt, 0.1);
      const h = 1 / 120;
      while (acc >= h) { step(h); acc -= h; }
      updConfetti(dt);
      updateMeshes();
      renderer.render(scene, camera);
    },
    async save(p) {
      await ensureFonts();
      const c = document.createElement('canvas');
      c.width = 1080;
      c.height = Math.round((1080 * TEX_H) / TEX_W);
      const ctx = c.getContext('2d');
      rrect(ctx, 0, 0, c.width, c.height, 58);
      ctx.clip();
      drawCardFront(ctx, p, c.width, c.height);
      const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
      if (!blob) throw new Error('blob');
      const name = `kartu-poa-breathe-2026-${slug(p.name)}.png`;
      const coarse = matchMedia('(pointer: coarse)').matches;
      if (coarse && navigator.canShare && typeof File === 'function') {
        const file = new File([blob], name, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          try { await navigator.share({ files: [file], title: 'Kartu panitia PoA BREATHE 2026' }); return 'shared'; }
          catch (e) { if (e && e.name === 'AbortError') return 'cancel'; }
        }
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      return 'downloaded';
    },
  };
}
