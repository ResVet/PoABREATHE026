// Background scene. One full-screen canvas draws a living light field, a WebGL wordmark,
// glass lungs that refract both, and smaller models pinned to empty "slot" elements in the page.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createLungs, createGermGeometry, germMaterial, createMask, createStethoscope, PAL } from './models.js';
import { breath } from './breath.js';

const HERO_SPOTS = [[-0.78, 0.34], [0.8, 0.42], [-0.7, -0.38], [0.76, -0.26], [-0.44, 0.78], [0.5, -0.7], [0.96, 0.06]];
const FOOT_SPOTS = [[-0.62, 0.2], [0.18, 0.52], [0.66, -0.1], [-0.12, -0.46], [0.52, 0.66], [-0.78, -0.5]];
const WORLDS = {
  paper: [0xe05744, 0xd52518, 0xf96015],
  coral: [0xd52518, 0xe05744, 0xf96015],
  roster: [0x18542a, 0x9abc05, 0xe05744],
  forest: [0x18542a, 0x9abc05, 0xffc926],
  sun: [0xf96015, 0xe05744, 0xffc926],
  tomato: [0xd52518, 0xe05744, 0xf96015],
};
const rand = (a, b) => a + Math.random() * (b - a);

function createAura() {
  const u = {
    uTime: { value: 0 }, uAspect: { value: 1 }, uBreath: { value: 0 }, uFlash: { value: 0 },
    uBase: { value: new THREE.Color(0x081c10) }, uPtr: { value: new THREE.Vector2() },
    uC0: { value: new THREE.Color(0xe05744) }, uC1: { value: new THREE.Color(0xd52518) }, uC2: { value: new THREE.Color(0xf96015) },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms: u, depthTest: false, depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }',
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime, uAspect, uBreath, uFlash;
      uniform vec3 uBase, uC0, uC1, uC2;
      uniform vec2 uPtr;
      float blob(vec2 p, vec2 c, float r){ vec2 d = p - c; return exp(-dot(d, d) / (r * r)); }
      void main(){
        vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
        float t = uTime;
        p += 0.07 * vec2(sin(p.y * 3.1 + t * 0.31), cos(p.x * 2.6 - t * 0.27));
        float w = min(uAspect, 1.6);
        float br = 0.85 + 0.35 * uBreath;
        vec3 col = uBase * mix(0.8, 1.4, vUv.y);
        float b0 = blob(p, vec2(0.06 * sin(t * 0.21), 0.04 + 0.06 * cos(t * 0.17)), 0.42);
        col = mix(col, uC0, b0 * 0.44 * br);
        float b1 = blob(p, vec2(-0.46 * w + 0.08 * cos(t * 0.19), -0.36 + 0.08 * sin(t * 0.23)), 0.34);
        col = mix(col, uC1, b1 * 0.3 * br);
        float b2 = blob(p, vec2(0.46 * w + 0.06 * sin(t * 0.13), 0.38 + 0.05 * sin(t * 0.29)), 0.16);
        col = mix(col, uC2, b2 * 0.45);
        col += mix(uC0, uC2, 0.5) * blob(p, uPtr * vec2(0.5 * uAspect, 0.5), 0.2) * 0.07;
        col += uC0 * uFlash * 0.4 * blob(p, vec2(0.0, 0.05), 0.8);
        float v = smoothstep(1.35, 0.15, length((vUv - 0.5) * vec2(1.2, 1.0)));
        col *= mix(0.55, 1.0, v);
        float g = fract(sin(dot(vUv * vec2(1453.1, 913.7) + fract(t), vec2(12.9898, 78.233))) * 43758.5453);
        col += (g - 0.5) * 0.022;
        gl_FragColor = vec4(max(col, 0.0), 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -100;
  return { mesh, u };
}

function createWord() {
  const cv = document.createElement('canvas');
  cv.width = 2048; cv.height = 600;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const u = { uReveal: { value: -0.05 } };
  const mat = new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.5, alphaToCoverage: true, toneMapped: false });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uReveal = u.uReveal;
    sh.fragmentShader = 'uniform float uReveal;\n' + sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\n  if (vMapUv.y > uReveal) discard;');
  };
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, cv.height / cv.width), mat);
  mesh.visible = false;
  const draw = () => {
    const x = cv.getContext('2d');
    x.clearRect(0, 0, cv.width, cv.height);
    let size = 560;
    const setF = (s) => { x.font = `900 condensed ${Math.round(s)}px "Anybody", sans-serif`; if (x.font.indexOf(Math.round(s) + 'px') < 0) x.font = `900 ${Math.round(s)}px "Anybody", sans-serif`; };
    setF(size);
    const w = x.measureText('BREATHE').width;
    if (w > cv.width * 0.98) { size *= (cv.width * 0.98) / w; setF(size); }
    const g = x.createLinearGradient(0, 40, 0, cv.height - 40);
    g.addColorStop(0, '#F3E8CC');
    g.addColorStop(0.6, '#F3E8CC');
    g.addColorStop(1, '#F2B49C');
    x.fillStyle = g;
    x.textAlign = 'center';
    x.textBaseline = 'alphabetic';
    x.fillText('BREATHE', cv.width / 2, cv.height / 2 + size * 0.36);
    tex.needsUpdate = true;
    mesh.visible = true;
  };
  const fonts = document.fonts && document.fonts.load ? document.fonts.load('900 100px "Anybody"') : Promise.resolve();
  Promise.race([fonts, new Promise((r) => setTimeout(r, 1500))]).then(draw, draw);
  return { mesh, u, aspect: cv.height / cv.width };
}

function createAir(n) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), size = new Float32Array(n), base = new Float32Array(n);
  const pal = [0xffd27a, 0xfff2dc, 0xff8a5c, 0xffc926, 0xc6e05a].map((h) => new THREE.Color(h));
  const st = [];
  const spawn = (s, fresh) => {
    s.a = rand(0, Math.PI * 2); s.r = rand(1.5, 3.4); s.y = fresh ? rand(-1.9, 2.7) : rand(-2.1, -1.4);
    s.w = rand(0.08, 0.26) * (Math.random() < 0.5 ? -1 : 1); s.vy = rand(0.05, 0.16); s.f = 0; s.k = rand(0.6, 1); s.age = 0;
    return s;
  };
  for (let i = 0; i < n; i++) {
    st.push(spawn({}, true));
    const c = pal[i % pal.length];
    col.set([c.r, c.g, c.b], i * 3);
    base[i] = rand(2.2, 6.5);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uScale: { value: 1 } },
    vertexShader: `attribute float aSize; attribute vec3 aColor; varying vec3 vC; uniform float uScale;
      void main(){ vC = aColor; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = aSize * uScale; }`,
    fragmentShader: `varying vec3 vC;
      void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); a *= a; if (a < 0.01) discard; gl_FragColor = vec4(vC, a * 0.85);
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
        size[i] = base[i] * (1 - k * 0.7) * Math.min(1, s.age * 2);
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aSize.needsUpdate = true;
    },
  };
}

function createBurst(n) {
  const mesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshStandardMaterial({ roughness: 0.35, emissive: 0x222200 }), n);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  const cols = [PAL.kiwi, PAL.sun, PAL.carrot, 0xfff2dc].map((c) => new THREE.Color(c));
  const parts = [];
  for (let i = 0; i < n; i++) { mesh.setColorAt(i, cols[i % cols.length]); parts.push({ life: 1, max: 1, p: new THREE.Vector3(), v: new THREE.Vector3(), s: 0 }); }
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
  let cur = 0, live = false;
  for (let i = 0; i < n; i++) { m.makeScale(0, 0, 0); mesh.setMatrixAt(i, m); }
  return {
    mesh,
    emit(at, scale) {
      for (let k = 0; k < 14; k++) {
        const pt = parts[(cur = (cur + 1) % n)];
        pt.p.copy(at);
        pt.v.set(rand(-1, 1), rand(-1, 1), rand(-0.5, 0.5)).normalize().multiplyScalar(rand(1.4, 3.2) * scale);
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
  const html = document.documentElement;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const lowEnd = coarse || Math.min(innerWidth, innerHeight) < 700;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowEnd ? 1.35 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  if ('transmissionResolutionScale' in renderer) renderer.transmissionResolutionScale = lowEnd ? 0.5 : 0.85;
  html.classList.add('has-gl');

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 1.0;
  pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 14);
  const key = new THREE.DirectionalLight(0xfff1e2, 1.6); key.position.set(4, 6, 8);
  const rim = new THREE.DirectionalLight(0xffc6a8, 1.2); rim.position.set(-5, 3, -6);
  const fill = new THREE.DirectionalLight(0xc9e6ff, 0.35); fill.position.set(-6, -3, 5);
  scene.add(key, rim, fill);

  const aura = createAura();
  scene.add(aura.mesh);
  const word = createWord();
  scene.add(word.mesh);
  const lungs = createLungs({ detail: lowEnd ? 22 : 36, lowEnd });
  scene.add(lungs.root);
  const air = createAir(lowEnd ? 110 : 190);
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
    const g = { mesh, hit, slot, spot, phase: rand(0, 6.28), spin: new THREE.Vector3(rand(-0.6, 0.6), rand(-0.8, 0.8), rand(-0.4, 0.4)), alive: true, popT: -1, back: 0, born: 1, hv: 0, burst: false, push: new THREE.Vector2() };
    hit.userData.germ = g;
    germs.push(g);
  };
  HERO_SPOTS.slice(0, lowEnd ? 5 : 7).forEach((s) => addGerm('hero', s));
  FOOT_SPOTS.slice(0, lowEnd ? 4 : 6).forEach((s) => addGerm('germs', s));
  const burst = createBurst(64);
  scene.add(burst.mesh);

  const poolTex = (() => {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 128;
    const x = cv.getContext('2d');
    const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,0.9)');
    gr.addColorStop(0.5, 'rgba(255,255,255,0.22)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gr;
    x.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(cv);
  })();
  const mkPool = (hex) => {
    const pm = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: poolTex, color: hex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
    pm.visible = false;
    scene.add(pm);
    return pm;
  };
  const plLungs = mkPool(0xff7a52), plMask = mkPool(0xffc926), plSteth = mkPool(0x9abc05);
  const rings = Array.from({ length: 6 }, () => {
    const rm = new THREE.Mesh(new THREE.RingGeometry(0.44, 0.5, 48), new THREE.MeshBasicMaterial({ color: PAL.sun, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false }));
    rm.visible = false;
    scene.add(rm);
    return { m: rm, t: 1, s: 1 };
  });
  let ringCur = 0, hovered = null;
  const shock = (p, sc) => { const r = rings[(ringCur = (ringCur + 1) % rings.length)]; r.m.position.copy(p); r.t = 0; r.s = sc; r.m.visible = true; };

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
    aura.u.uAspect.value = w / h;
  };
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  window.addEventListener('resize', resize);
  resize();

  const halfAt = (z) => Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - z);
  const readRect = (name, z = 0) => {
    const el = slots[name];
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || r.bottom < -160 || r.top > H + 160) return null;
    const upp = (2 * halfAt(z)) / H;
    return { cx: (r.left + r.width / 2 - W / 2) * upp, cy: -(r.top + r.height / 2 - H / 2) * upp, hw: (r.width / 2) * upp, hh: (r.height / 2) * upp, upp };
  };
  const fit = (rc, nh, nw, f) => Math.min((rc.hh * 2 * f) / nh, (rc.hw * 2 * f) / nw);

  const ndc = new THREE.Vector2(0, 0), pw = new THREE.Vector2(99, 99), look = new THREE.Vector2();
  let pointerSeen = false;
  const setNDC = (e) => {
    ndc.set((e.clientX / W) * 2 - 1, -(e.clientY / H) * 2 + 1);
    const hh = halfAt(0);
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
    if (e.button > 0 || html.classList.contains('gated')) return;
    const tg = e.target;
    if (tg && tg.closest && tg.closest('a,button,input,textarea,select,label,.modal,.suggest,.glass')) return;
    setNDC(e);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(targets(), false)[0];
    if (!hit) return;
    const o = hit.object;
    if (o.userData.germ) { pop(o.userData.germ); e.__germ = true; }
    else if (o === mask.hit) maskPoke = 1;
    else if (o === steth.hit) stethPoke = 1;
  }, { capture: true, passive: true });

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

  let mode = html.classList.contains('gated') ? 'gate' : 'hero';
  let introT = mode === 'hero' && html.classList.contains('intro') ? -1 : 9;
  let trans = 0, flash = 0, hoverTick = 0, time = 0, introStart = 0, lastReal = performance.now();
  const cur = { x: 0, y: 0, s: 1, ok: false };
  const cols = [new THREE.Color(), new THREE.Color(), new THREE.Color()];
  const ease3 = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

  function frame(now, dt) {
    resize();
    time += dt * (reduced ? 0.25 : 1);
    const t = now / 1000;
    const b = breath.value;
    if (pointerSeen) look.lerp(ndc, 1 - Math.exp(-dt * 3));
    const gated = mode === 'gate';

    // light field follows the section in view
    const world = WORLDS[html.dataset.theme] || WORLDS.paper;
    const rdt = Math.min(0.6, Math.max(0, (now - lastReal) / 1000)); lastReal = now;
    const kc = 1 - Math.exp(-rdt * 1.8);
    world.forEach((hex, i) => { cols[i].setHex(hex); aura.u['uC' + i].value.lerp(cols[i], kc); });
    flash *= Math.pow(0.12, dt);
    aura.u.uTime.value = time;
    aura.u.uBreath.value = Math.min(1, b);
    aura.u.uFlash.value = flash;
    aura.u.uPtr.value.copy(look);

    const ik = introT < 0 ? 0 : ease3(introT / 1.7);
    if (introT >= 0 && introT < 9) introT = (now - introStart) / 1000;
    const hp = gated ? 0 : Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));

    // wordmark
    const wr = gated ? null : readRect('word', -2.6);
    if (wr && word.mesh.visible !== false) {
      const s = wr.hw * 2;
      word.mesh.position.set(wr.cx, wr.cy + hp * wr.hh * 0.6, -2.6);
      word.mesh.scale.set(s * (1 + 0.035 * Math.min(1, b)), s, 1);
      word.u.uReveal.value = introT < 0 ? -0.05 : -0.05 + 1.15 * ease3((introT - 0.15) / 1.1);
      word.mesh.renderOrder = -50;
    }
    word.mesh.userData.active = !!wr;
    if (!wr) word.mesh.position.set(0, 999, -2.6);

    // lungs
    const lr = readRect(gated ? 'gate' : 'hero');
    if (lr) {
      const s = fit(lr, lungs.nh, lungs.nw, gated ? 0.84 : 0.9);
      if (!cur.ok || trans <= 0) { cur.x = lr.cx; cur.y = lr.cy; cur.s = s; cur.ok = true; }
      else {
        const k = 1 - Math.exp(-dt * 4.5);
        cur.x += (lr.cx - cur.x) * k; cur.y += (lr.cy - cur.y) * k; cur.s += (s - cur.s) * k;
        trans -= dt;
      }
      const S = cur.s * (0.55 + 0.45 * ik) * (1 - hp * 0.14);
      lungs.root.visible = introT >= 0;
      lungs.root.position.set(cur.x, cur.y, 0);
      lungs.root.scale.setScalar(Math.max(0.0001, S));
      if (!drag) { yaw += yawVel; yawVel *= Math.pow(0.04, dt); }
      const sway = reduced ? 0 : Math.sin(t * 0.35) * 0.26;
      lungs.root.rotation.set(0.05 - look.y * 0.12 + hp * 0.35, yaw + sway + look.x * 0.22 + hp * 1.3 - (1 - ik) * 1.2, 0);
      lungs.update(b);
      air.mat.uniforms.uScale.value = renderer.getPixelRatio() * Math.min(1.6, S * 1.25);
      air.update(reduced ? dt * 0.3 : dt, breath.delta);
      plLungs.visible = lungs.root.visible;
      plLungs.position.set(cur.x, cur.y - S * 1.9, -1.2);
      plLungs.scale.set(S * 6.2, S * 1.6, 1);
      plLungs.material.opacity = (0.16 + 0.12 * Math.min(1, b)) * ik * (1 - hp);
    } else { lungs.root.visible = false; plLungs.visible = false; }

    // mask
    const mr = gated ? null : readRect('mask');
    if (mr) {
      const ms = fit(mr, mask.nh, mask.nw, 0.9);
      maskWrap.visible = true;
      maskWrap.position.set(mr.cx, mr.cy, 0);
      maskWrap.scale.setScalar(ms);
      maskPoke *= Math.pow(0.02, dt);
      const sw = reduced ? 0 : 1;
      mask.root.rotation.set(0.16 + Math.sin(t * 0.7) * 0.06 * sw - look.y * 0.15, 0.5 + Math.sin(t * 0.5) * 0.32 * sw + look.x * 0.3, Math.sin(t * 9) * 0.12 * maskPoke);
      mask.root.position.y = Math.sin(t * 1.1) * 0.05 * sw;
      mask.body.scale.z = 1 + 0.16 * (0.55 - Math.min(1, b)) + maskPoke * 0.25;
      plMask.visible = true;
      plMask.position.set(mr.cx, mr.cy - ms * 0.8, -1);
      plMask.scale.set(ms * 3.2, ms * 1.1, 1);
      plMask.material.opacity = 0.14;
    } else { maskWrap.visible = false; plMask.visible = false; }

    // stethoscope
    const sr = gated ? null : readRect('steth');
    if (sr) {
      const ss = fit(sr, steth.nh, steth.nw, 0.92);
      stethWrap.visible = true;
      stethWrap.position.set(sr.cx, sr.cy, 0);
      stethWrap.scale.setScalar(ss);
      stethPoke *= Math.pow(0.03, dt);
      const sw = reduced ? 0 : 1;
      steth.root.rotation.set(-look.y * 0.12 + Math.sin(t * 0.6) * 0.05 * sw, Math.sin(t * 0.42) * 0.6 * sw + look.x * 0.35 + Math.sin(t * 7) * 0.3 * stethPoke, Math.sin(t * 0.8) * 0.08 * sw);
      steth.root.position.y = Math.sin(t * 0.9) * 0.06 * sw;
      plSteth.visible = true;
      plSteth.position.set(sr.cx, sr.cy - ss * 2.4, -1);
      plSteth.scale.set(ss * 2.2, ss * 0.8, 1);
      plSteth.material.opacity = 0.16;
    } else { stethWrap.visible = false; plSteth.visible = false; }

    // germs
    const rects = { hero: lr && !gated && introT >= 0 ? lr : null, germs: gated ? null : readRect('germs') };
    for (const g of germs) {
      const r = rects[g.slot];
      if (!r) { g.mesh.visible = false; continue; }
      const diam = (g.slot === 'hero' ? 0.19 : 0.24) * r.hh * 2 * (lowEnd ? 1.15 : 1);
      const baseS = diam / 0.86;
      let s = baseS;
      if (!g.alive) {
        if (g.popT >= 0) {
          g.popT += dt;
          const p = g.popT;
          s = p < 0.08 ? baseS * (1 + p * 5) : baseS * 1.4 * Math.max(0, 1 - (p - 0.08) / 0.14);
          if (p > 0.08 && !g.burst) { g.burst = true; burst.emit(g.mesh.position, baseS); shock(g.mesh.position, baseS); }
          if (p > 0.22) { g.popT = -1; s = 0; }
        } else {
          s = 0;
          g.back -= dt;
          if (g.back <= 0) { g.alive = true; g.born = 0; g.burst = false; }
        }
      } else if (g.born < 1) { g.born = Math.min(1, g.born + dt * 1.8); s = g.born <= 0 ? 0 : baseS * (1 - Math.pow(1 - g.born, 3)); }
      g.hv += ((g === hovered ? 1 : 0) - g.hv) * (1 - Math.exp(-dt * 10));
      s *= 1 + 0.2 * g.hv;
      const sw = reduced ? 0.2 : 1;
      const bx = r.cx + g.spot[0] * r.hw * 0.92 + Math.sin(t * 0.7 + g.phase) * diam * 0.5 * sw;
      const by = r.cy + g.spot[1] * r.hh * 0.86 + Math.cos(t * 0.9 + g.phase * 1.3) * diam * 0.5 * sw;
      const dx = bx + g.push.x - pw.x, dy = by + g.push.y - pw.y, d = Math.hypot(dx, dy), R = diam * 1.6;
      if (d < R && d > 0.0001 && pointerSeen) { const f = ((R - d) / R) * diam * 0.25; g.push.x += (dx / d) * f; g.push.y += (dy / d) * f; }
      g.push.multiplyScalar(Math.pow(0.15, dt));
      g.mesh.position.set(bx + g.push.x, by + g.push.y, 0.6);
      const spinK = sw * (1 + 3 * g.hv);
      g.mesh.rotation.x += g.spin.x * dt * spinK;
      g.mesh.rotation.y += g.spin.y * dt * spinK;
      g.mesh.rotation.z += g.spin.z * dt * spinK;
      g.mesh.scale.setScalar(Math.max(0.0001, s));
      g.mesh.visible = s > 0.001;
    }
    burst.update(dt);
    for (const r of rings) {
      if (r.t >= 1) { if (r.m.visible) r.m.visible = false; continue; }
      r.t = Math.min(1, r.t + dt / 0.5);
      r.m.scale.setScalar(r.s * (0.6 + 2.6 * ease3(r.t)));
      r.m.material.opacity = 0.9 * (1 - r.t);
    }

    if (pointerSeen && ++hoverTick % 4 === 0) {
      raycaster.setFromCamera(ndc, camera);
      const hh = raycaster.intersectObjects(targets(), false)[0];
      hovered = hh && hh.object.userData.germ ? hh.object.userData.germ : null;
      html.classList.toggle('hover-3d', !!hh);
    }

    renderer.render(scene, camera);
  }

  return {
    frame,
    setXray(on) { lungs.setMode(on ? 'tissue' : 'glass'); },
    leaveGate() { mode = 'hero'; trans = 1.4; flash = 1; },
    intro() {
      introT = 0;
      introStart = performance.now();
      germs.forEach((g) => { if (g.slot === 'hero') g.born = -0.5 - Math.random() * 0.6; });
    },
  };
}
