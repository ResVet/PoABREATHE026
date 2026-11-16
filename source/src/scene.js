// Background scene. One fixed transparent canvas; every model is pinned to an empty
// "slot" element in the page, so layout stays in CSS and the 3D follows it on any screen.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createLungs, createGermGeometry, germMaterial, createMask, createStethoscope, PAL } from './models.js';
import { breath } from './breath.js';

const HERO_SPOTS = [[-0.8, 0.3], [0.82, 0.4], [-0.7, -0.42], [0.76, -0.3], [-0.42, 0.8], [0.46, -0.74], [0.97, 0.02]];
const FOOT_SPOTS = [[-0.62, 0.2], [0.18, 0.52], [0.66, -0.1], [-0.12, -0.46], [0.52, 0.66], [-0.78, -0.5]];
const rand = (a, b) => a + Math.random() * (b - a);

function createAir(n) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), size = new Float32Array(n), base = new Float32Array(n);
  const pal = [PAL.carrot, PAL.sun, PAL.kiwi, PAL.coral, PAL.forest].map((h) => new THREE.Color(h));
  const st = [];
  const spawn = (s, fresh) => {
    s.a = rand(0, Math.PI * 2); s.r = rand(1.6, 3.3); s.y = fresh ? rand(-1.9, 2.7) : rand(-2.1, -1.4);
    s.w = rand(0.08, 0.26) * (Math.random() < 0.5 ? -1 : 1); s.vy = rand(0.05, 0.16); s.f = 0; s.k = rand(0.6, 1); s.age = 0;
    return s;
  };
  for (let i = 0; i < n; i++) {
    st.push(spawn({}, true));
    const c = pal[i % pal.length];
    col.set([c.r, c.g, c.b], i * 3);
    base[i] = rand(2.5, 7);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uScale: { value: 1 } },
    vertexShader: `attribute float aSize; attribute vec3 aColor; varying vec3 vC; uniform float uScale;
      void main(){ vC = aColor; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = aSize * uScale; }`,
    fragmentShader: `varying vec3 vC;
      void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d); if (a < 0.02) discard; gl_FragColor = vec4(vC, a * 0.9);
      #include <colorspace_fragment>
      }`,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  const TOP = new THREE.Vector3(0, 2.25, 0);
  return {
    points, mat,
    update(dt, db) {
      for (let i = 0; i < n; i++) {
        const s = st[i];
        s.a += s.w * dt; s.y += s.vy * dt; s.age += dt;
        s.f = db > 0 ? Math.min(1, s.f + db * 2.4 * s.k) : Math.max(0, s.f + db * 1.7);
        const k = s.f * s.f;
        let x = Math.cos(s.a) * s.r, y = s.y, z = Math.sin(s.a) * s.r * 0.55;
        x += (TOP.x - x) * k; y += (TOP.y + 0.3 - y) * k; z += (TOP.z - z) * k;
        if (k > 0.9 || s.y > 2.9) spawn(s, false);
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
        size[i] = base[i] * (1 - k * 0.8) * Math.min(1, s.age * 2);
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aSize.needsUpdate = true;
    },
  };
}

function createBurst(n) {
  const mesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshStandardMaterial({ roughness: 0.4 }), n);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  const cols = [PAL.kiwi, PAL.sun, PAL.forest, PAL.carrot].map((c) => new THREE.Color(c));
  const parts = [];
  for (let i = 0; i < n; i++) { mesh.setColorAt(i, cols[i % cols.length]); parts.push({ life: 1, max: 1, p: new THREE.Vector3(), v: new THREE.Vector3(), s: 0 }); }
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
  let cur = 0, live = false;
  const hide = () => { for (let i = 0; i < n; i++) { m.makeScale(0, 0, 0); mesh.setMatrixAt(i, m); } mesh.instanceMatrix.needsUpdate = true; };
  hide();
  return {
    mesh,
    emit(at, scale) {
      for (let k = 0; k < 12; k++) {
        const pt = parts[(cur = (cur + 1) % n)];
        pt.p.copy(at);
        pt.v.set(rand(-1, 1), rand(-1, 1), rand(-0.5, 0.5)).normalize().multiplyScalar(rand(1.4, 3) * scale);
        pt.life = 0; pt.max = rand(0.45, 0.85); pt.s = rand(0.05, 0.12) * scale;
      }
      live = true;
    },
    update(dt) {
      if (!live) return false;
      let any = false;
      for (let i = 0; i < n; i++) {
        const pt = parts[i];
        if (pt.life < pt.max) {
          pt.life += dt;
          pt.p.addScaledVector(pt.v, dt);
          pt.v.multiplyScalar(Math.pow(0.05, dt));
          sc.setScalar(Math.max(0, pt.s * (1 - pt.life / pt.max)));
          any = true;
        } else sc.setScalar(0);
        m.compose(pt.p, q, sc);
        mesh.setMatrixAt(i, m);
      }
      mesh.instanceMatrix.needsUpdate = true;
      live = any;
      return any;
    },
  };
}

export function initScene({ reduced }) {
  const canvas = document.getElementById('gl');
  const coarse = matchMedia('(pointer: coarse)').matches;
  const lowEnd = coarse || Math.min(innerWidth, innerHeight) < 700;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  const dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1.5 : 1.75);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.85;
  pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 14);
  const key = new THREE.DirectionalLight(0xfff4e6, 1.5); key.position.set(4, 6, 8);
  const fill = new THREE.DirectionalLight(0xffd9c2, 0.5); fill.position.set(-6, -2, 4);
  const rim = new THREE.DirectionalLight(0xffffff, 0.9); rim.position.set(-3, 4, -6);
  scene.add(key, fill, rim);

  const lungs = createLungs({ detail: lowEnd ? 22 : 36 });
  scene.add(lungs.root);
  const air = createAir(lowEnd ? 120 : 180);
  lungs.root.add(air.points);

  const mask = createMask();
  const maskWrap = new THREE.Group(); maskWrap.add(mask.root); scene.add(maskWrap);
  const steth = createStethoscope();
  const stethWrap = new THREE.Group(); stethWrap.add(steth.root); scene.add(stethWrap);

  const germGeo = createGermGeometry(lowEnd ? 2 : 3);
  const germMat = germMaterial();
  const hitGeo = new THREE.SphereGeometry(0.62, 8, 6);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const germs = [];
  const addGerm = (slot, spot) => {
    const mesh = new THREE.Mesh(germGeo, germMat);
    const hit = new THREE.Mesh(hitGeo, hitMat);
    mesh.add(hit);
    scene.add(mesh);
    const g = { mesh, hit, slot, spot, phase: rand(0, 6.28), spin: new THREE.Vector3(rand(-0.6, 0.6), rand(-0.8, 0.8), rand(-0.4, 0.4)), alive: true, popT: -1, back: 0, born: 1, push: new THREE.Vector2() };
    hit.userData.germ = g;
    germs.push(g);
  };
  HERO_SPOTS.slice(0, lowEnd ? 5 : 7).forEach((s) => addGerm('hero', s));
  FOOT_SPOTS.slice(0, lowEnd ? 4 : 6).forEach((s) => addGerm('germs', s));
  const burst = createBurst(60);
  scene.add(burst.mesh);

  const slots = {};
  document.querySelectorAll('[data-slot]').forEach((el) => (slots[el.dataset.slot] = el));

  let W = 0, H = 0;
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h || (w === W && h === H)) return;
    W = w; H = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  window.addEventListener('resize', resize);
  resize();

  const halfH = () => Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
  const rects = {};
  const readRect = (name) => {
    const el = slots[name];
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || r.bottom < -160 || r.top > H + 160) return null;
    const hh = halfH(), upp = (2 * hh) / H;
    return { cx: (r.left + r.width / 2 - W / 2) * upp, cy: -(r.top + r.height / 2 - H / 2) * upp, hw: (r.width / 2) * upp, hh: (r.height / 2) * upp, upp };
  };
  const fit = (rc, nh, nw, f) => Math.min((rc.hh * 2 * f) / nh, (rc.hw * 2 * f) / nw);

  // pointer
  const ndc = new THREE.Vector2(0, 0), pw = new THREE.Vector2(9, 9), look = new THREE.Vector2();
  let pointerSeen = false;
  const setNDC = (e) => {
    ndc.set((e.clientX / W) * 2 - 1, -(e.clientY / H) * 2 + 1);
    const hh = halfH();
    pw.set(ndc.x * hh * camera.aspect, ndc.y * hh);
  };
  window.addEventListener('pointermove', (e) => { setNDC(e); if (e.pointerType === 'mouse') pointerSeen = true; }, { passive: true });

  const raycaster = new THREE.Raycaster();
  let count = 0, maskPoke = 0, stethPoke = 0;
  const targets = () => {
    const list = [];
    germs.forEach((g) => { if (g.alive && g.mesh.visible && g.born > 0.6) list.push(g.hit); });
    if (maskWrap.visible) list.push(mask.hit);
    if (stethWrap.visible) list.push(steth.hit);
    return list;
  };
  const pop = (g) => {
    g.alive = false; g.popT = 0; g.back = rand(2.6, 4.2);
    count++;
    window.dispatchEvent(new CustomEvent('poa:germ', { detail: count }));
    if (navigator.vibrate && coarse) navigator.vibrate(12);
  };
  window.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || document.documentElement.classList.contains('gated')) return;
    const t = e.target;
    if (t && t.closest && t.closest('a,button,input,textarea,select,label,.modal,.suggest')) return;
    setNDC(e);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(targets(), false)[0];
    if (!hit) return;
    const o = hit.object;
    if (o.userData.germ) { pop(o.userData.germ); e.__germ = true; }
    else if (o === mask.hit) maskPoke = 1;
    else if (o === steth.hit) stethPoke = 1;
  }, { capture: true, passive: true });

  // drag + long-press on the hero lungs
  let yaw = 0, yawVel = 0, drag = null;
  const stage = slots.hero;
  if (stage) {
    stage.addEventListener('pointerdown', (e) => {
      if (e.__germ) return;
      drag = { id: e.pointerId, x: e.clientX };
      try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      breath.holding = true;
    });
    stage.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      drag.x = e.clientX;
      yaw += dx * 0.011;
      yawVel = dx * 0.011;
    });
    const end = () => { if (!drag) return; drag = null; breath.holding = false; };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    stage.addEventListener('lostpointercapture', end);
    stage.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  let mode = document.documentElement.classList.contains('gated') ? 'gate' : 'hero';
  let trans = 0;
  const cur = { x: 0, y: 0, s: 1, ok: false };
  let xray = 0, xrayTarget = 0, rendered = false, hoverTick = 0;
  const tmp = new THREE.Vector3();

  function frame(now, dt) {
    resize();
    const t = now / 1000;
    const b = breath.value;
    if (pointerSeen) look.lerp(ndc, 1 - Math.exp(-dt * 3));
    const gated = mode === 'gate';
    let any = false;

    // lungs
    const lr = readRect(mode === 'gate' ? 'gate' : 'hero');
    if (lr) {
      const s = fit(lr, lungs.nh, lungs.nw, mode === 'gate' ? 0.86 : 0.92);
      if (!cur.ok || trans <= 0) { cur.x = lr.cx; cur.y = lr.cy; cur.s = s; cur.ok = true; }
      else {
        const k = 1 - Math.exp(-dt * 4.5);
        cur.x += (lr.cx - cur.x) * k; cur.y += (lr.cy - cur.y) * k; cur.s += (s - cur.s) * k;
        trans -= dt;
      }
      lungs.root.visible = true;
      lungs.root.position.set(cur.x, cur.y, 0);
      lungs.root.scale.setScalar(cur.s);
      if (!drag) { yaw += yawVel; yawVel *= Math.pow(0.04, dt); }
      const sway = reduced ? 0 : Math.sin(t * 0.35) * 0.28;
      lungs.root.rotation.set(0.05 - look.y * 0.12, yaw + sway + look.x * 0.22, 0);
      xray += (xrayTarget - xray) * (1 - Math.exp(-dt * 5));
      lungs.update(b, xray);
      air.mat.uniforms.uScale.value = renderer.getPixelRatio() * Math.min(1.6, cur.s * 1.25);
      air.update(reduced ? dt * 0.3 : dt, breath.delta);
      any = true;
    } else lungs.root.visible = false;

    // mask
    const mr = gated ? null : readRect('mask');
    if (mr) {
      maskWrap.visible = true;
      maskWrap.position.set(mr.cx, mr.cy, 0);
      maskWrap.scale.setScalar(fit(mr, mask.nh, mask.nw, 0.9));
      maskPoke *= Math.pow(0.02, dt);
      const sw = reduced ? 0 : 1;
      mask.root.rotation.set(0.16 + Math.sin(t * 0.7) * 0.06 * sw - look.y * 0.15, 0.5 + Math.sin(t * 0.5) * 0.32 * sw + look.x * 0.3, Math.sin(t * 9) * 0.12 * maskPoke);
      mask.root.position.y = Math.sin(t * 1.1) * 0.05 * sw;
      mask.body.scale.z = 1 + 0.16 * (0.55 - Math.min(1, b)) + maskPoke * 0.25;
      any = true;
    } else maskWrap.visible = false;

    // stethoscope
    const sr = gated ? null : readRect('steth');
    if (sr) {
      stethWrap.visible = true;
      stethWrap.position.set(sr.cx, sr.cy, 0);
      stethWrap.scale.setScalar(fit(sr, steth.nh, steth.nw, 0.92));
      stethPoke *= Math.pow(0.03, dt);
      const sw = reduced ? 0 : 1;
      steth.root.rotation.set(-look.y * 0.12 + Math.sin(t * 0.6) * 0.05 * sw, Math.sin(t * 0.42) * 0.6 * sw + look.x * 0.35 + Math.sin(t * 7) * 0.3 * stethPoke, Math.sin(t * 0.8) * 0.08 * sw);
      steth.root.position.y = Math.sin(t * 0.9) * 0.06 * sw;
      any = true;
    } else stethWrap.visible = false;

    // germs
    rects.hero = lr && !gated ? lr : null;
    rects.germs = gated ? null : readRect('germs');
    for (const g of germs) {
      const r = rects[g.slot];
      if (!r) { g.mesh.visible = false; continue; }
      const diam = (g.slot === 'hero' ? 0.2 : 0.24) * r.hh * 2 * (lowEnd ? 1.15 : 1);
      const baseS = diam / 0.86;
      let s = baseS;
      if (!g.alive) {
        if (g.popT >= 0) {
          g.popT += dt;
          const p = g.popT;
          s = p < 0.08 ? baseS * (1 + p * 5) : baseS * 1.4 * Math.max(0, 1 - (p - 0.08) / 0.14);
          if (p > 0.08 && !g.burst) { g.burst = true; burst.emit(g.mesh.position, baseS); }
          if (p > 0.22) { g.popT = -1; s = 0; }
        } else {
          s = 0;
          g.back -= dt;
          if (g.back <= 0) { g.alive = true; g.born = 0; g.burst = false; }
        }
      } else if (g.born < 1) { g.born = Math.min(1, g.born + dt * 1.8); s = baseS * (1 - Math.pow(1 - g.born, 3)); }
      const sw = reduced ? 0.2 : 1;
      const bx = r.cx + g.spot[0] * r.hw * 0.92 + Math.sin(t * 0.7 + g.phase) * diam * 0.5 * sw;
      const by = r.cy + g.spot[1] * r.hh * 0.86 + Math.cos(t * 0.9 + g.phase * 1.3) * diam * 0.5 * sw;
      const dx = bx + g.push.x - pw.x, dy = by + g.push.y - pw.y, d = Math.hypot(dx, dy), R = diam * 1.6;
      if (d < R && d > 0.0001 && pointerSeen) { const f = ((R - d) / R) * diam * 0.25; g.push.x += (dx / d) * f; g.push.y += (dy / d) * f; }
      g.push.multiplyScalar(Math.pow(0.15, dt));
      g.mesh.position.set(bx + g.push.x, by + g.push.y, 0.6);
      g.mesh.rotation.x += g.spin.x * dt * sw;
      g.mesh.rotation.y += g.spin.y * dt * sw;
      g.mesh.rotation.z += g.spin.z * dt * sw;
      g.mesh.scale.setScalar(Math.max(0.0001, s));
      g.mesh.visible = s > 0.001;
      if (g.mesh.visible) any = true;
    }
    if (burst.update(dt)) any = true;

    // hover cursor for mouse users
    if (pointerSeen && ++hoverTick % 4 === 0) {
      raycaster.setFromCamera(ndc, camera);
      const h = raycaster.intersectObjects(targets(), false).length > 0;
      document.documentElement.classList.toggle('hover-3d', h);
    }

    if (any || rendered) {
      renderer.render(scene, camera);
      rendered = any;
    }
  }

  return {
    frame,
    setXray(on) { xrayTarget = on ? 1 : 0; },
    leaveGate() { mode = 'hero'; trans = 1.4; },
  };
}
