// Procedural models. Everything is generated in code so the site ships no model files.
import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const PAL = {
  coral: 0xe05744, tomato: 0xd52518, carrot: 0xf96015, sun: 0xffc828,
  cream: 0xf3e8cc, forest: 0x18542a, kiwi: 0x9abc05, ink: 0x0e1b12,
};

const V = THREE.Vector3;
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function hash3(x, y, z) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1440662683);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
export function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const c = (a, b, d) => hash3(xi + a, yi + b, zi + d);
  const x00 = c(0, 0, 0) + (c(1, 0, 0) - c(0, 0, 0)) * u;
  const x10 = c(0, 1, 0) + (c(1, 1, 0) - c(0, 1, 0)) * u;
  const x01 = c(0, 0, 1) + (c(1, 0, 1) - c(0, 0, 1)) * u;
  const x11 = c(0, 1, 1) + (c(1, 1, 1) - c(0, 1, 1)) * u;
  const y0 = x00 + (x10 - x00) * v, y1 = x01 + (x11 - x01) * v;
  return (y0 + (y1 - y0) * w) * 2 - 1;
}
const fbm = (x, y, z) => noise3(x, y, z) * 0.6 + noise3(x * 2.1, y * 2.1, z * 2.1) * 0.28 + noise3(x * 4.3, y * 4.3, z * 4.3) * 0.12;

function paint(geo, hex) {
  const c = new THREE.Color(hex), n = geo.attributes.position.count, a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(a, 3));
  return geo;
}

/* ---------------- lungs ---------------- */
// Built in local space where +x is lateral. The viewer-left lung (anatomical right) gets a
// horizontal fissure, the viewer-right lung (anatomical left) gets the cardiac notch.
function lungGeometry(detail, opt) {
  let g = new THREE.IcosahedronGeometry(1, detail);
  g.deleteAttribute('normal');
  g.deleteAttribute('uv');
  g = mergeVertices(g, 1e-5);
  const pos = g.attributes.position, n = pos.count;
  const col = new Float32Array(n * 3);
  const cLight = new THREE.Color(0xf4a593), cBase = new THREE.Color(0xe8806c), cDeep = new THREE.Color(0xb3453b), cSpot = new THREE.Color(0xc65c66);
  const c = new THREE.Color();
  const seed = opt.notch ? 11.3 : 3.7;
  for (let i = 0; i < n; i++) {
    const ux = pos.getX(i), uy = pos.getY(i), uz = pos.getZ(i);
    let x = ux, y = uy, z = uz;
    const t = (uy + 1) / 2;
    const narrow = 1 - 0.44 * smooth(0.28, 1.0, t);
    x *= narrow; z *= narrow;
    if (x < 0) x *= 0.58;
    z *= z < 0 ? 0.9 : 0.72;
    if (uy < 0) {
      const dome = Math.max(0, 1 - (x * x + z * z) / 0.5);
      y += 0.55 * dome * smooth(-0.1, -1.0, uy);
    }
    let notch = 0;
    if (opt.notch) {
      notch = Math.exp(-(((ux + 0.62) / 0.34) ** 2 + ((uy + 0.18) / 0.36) ** 2 + ((uz - 0.6) / 0.42) ** 2));
      x += notch * 0.3;
    }
    const hil = Math.exp(-(((ux + 0.9) / 0.25) ** 2 + ((uy - 0.1) / 0.24) ** 2 + (uz / 0.28) ** 2));
    x += hil * 0.08;
    const dO = (1.8 * uy + 1.25 * uz + 0.135) / 2.19;
    const wO = smooth(-0.95, -0.45, ux);
    let groove = 0.05 * Math.exp(-((dO / 0.032) ** 2)) * wO;
    if (opt.horizontal) groove += 0.04 * Math.exp(-(((uy - 0.2) / 0.03) ** 2)) * smooth(0.0, 0.1, dO) * smooth(-0.3, 0.15, uz) * wO;
    const nz = fbm(ux * 2.4 + seed, uy * 2.4, uz * 2.4) * 0.03 + noise3(ux * 9 + seed, uy * 9, uz * 9) * 0.006;
    const k = 1 - groove + nz;
    pos.setXYZ(i, x * k, y * k * 1.42, z * k);
    const m = 0.5 + 0.5 * fbm(ux * 5 + seed, uy * 5, uz * 5);
    c.copy(cBase).lerp(cLight, smooth(0.0, 0.6, ux) * 0.55 + smooth(0.2, 0.9, uy) * 0.15);
    c.lerp(cSpot, Math.max(0, m - 0.55) * 0.9);
    c.lerp(cDeep, Math.min(1, Math.min(1, groove * 16) * 0.8 + smooth(-0.3, -0.9, ux) * 0.25 + notch * 0.2));
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.computeVertexNormals();
  return g;
}

function treeGeometry(seedIn) {
  const parts = [];
  let s = seedIn;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const up = new V(0, 1, 0);
  const inside = (p) => {
    const lx = p.x / (p.x > 0 ? 0.9 : 0.46), ly = p.y / 1.22, lz = p.z / 0.6;
    return lx * lx + ly * ly + lz * lz < 0.8;
  };
  const seg = (a, b, r0, r1) => {
    const d = new V().subVectors(b, a), len = d.length();
    const g = new THREE.CylinderGeometry(r1, r0, len, 8, 1, true);
    g.translate(0, len / 2, 0);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up, d.normalize()));
    g.translate(a.x, a.y, a.z);
    g.deleteAttribute('uv');
    parts.push(g);
    const j = new THREE.SphereGeometry(r1, 8, 6);
    j.translate(b.x, b.y, b.z);
    j.deleteAttribute('uv');
    parts.push(j);
  };
  const branch = (a, dir, len, r, depth) => {
    let b = a.clone().addScaledVector(dir, len);
    for (let k = 0; k < 3 && !inside(b); k++) { len *= 0.65; b = a.clone().addScaledVector(dir, len); }
    if (!inside(b)) return;
    seg(a, b, r, r * 0.78);
    if (depth <= 0) return;
    for (const sg of [-1, 1]) {
      const axis = new V(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).cross(dir).normalize();
      const nd = dir.clone().applyAxisAngle(axis, sg * (0.38 + rnd() * 0.3)).normalize();
      branch(b, nd, len * 0.74, r * 0.72, depth - 1);
    }
  };
  const hil = new V(-0.34, 0.12, 0);
  [[0.35, 1, 0.05], [1, -0.22, 0.5], [0.45, -1, -0.25]].forEach((d) => branch(hil, new V(...d).normalize(), 0.42, 0.06, 3));
  return mergeGeometries(parts);
}

function tracheaGeometry() {
  const parts = [];
  const curve = new THREE.CatmullRomCurve3([new V(0, 2.35, -0.02), new V(0, 1.7, 0.02), new V(0, 1.15, 0), new V(0, 0.82, -0.04)]);
  parts.push(new THREE.TubeGeometry(curve, 48, 0.118, 20, false));
  for (let i = 0; i < 15; i++) {
    const t = 0.04 + i * 0.062;
    if (t > 0.93) break;
    const p = curve.getPointAt(t);
    const ring = new THREE.TorusGeometry(0.127, 0.021, 8, 28);
    ring.rotateX(Math.PI / 2);
    ring.translate(p.x, p.y, p.z);
    parts.push(ring);
  }
  const right = new THREE.CatmullRomCurve3([new V(0, 0.84, -0.04), new V(-0.38, 0.5, 0), new V(-0.72, 0.15, 0)]);
  const left = new THREE.CatmullRomCurve3([new V(0, 0.84, -0.04), new V(0.44, 0.58, 0), new V(0.72, 0.17, 0)]);
  parts.push(new THREE.TubeGeometry(right, 24, 0.088, 16, false));
  parts.push(new THREE.TubeGeometry(left, 24, 0.078, 16, false));
  const carina = new THREE.SphereGeometry(0.105, 18, 12);
  carina.translate(0, 0.83, -0.04);
  parts.push(carina);
  return mergeGeometries(parts);
}

export function createLungs({ detail = 32 } = {}) {
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.position.y = -0.47;
  root.add(inner);
  const lungMat = new THREE.MeshPhysicalMaterial({
    vertexColors: true, roughness: 0.5, clearcoat: 0.35, clearcoatRoughness: 0.35,
    sheen: 1, sheenRoughness: 0.45, sheenColor: new THREE.Color(0xffc2a8), transparent: true,
  });
  const uniforms = { uBreath: { value: 0 }, uRim: { value: new THREE.Color(0xffa58c) } };
  lungMat.onBeforeCompile = (sh) => {
    sh.uniforms.uBreath = uniforms.uBreath;
    sh.uniforms.uRim = uniforms.uRim;
    sh.vertexShader = 'uniform float uBreath;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      float wB = (1.0 - smoothstep(-1.25, 1.45, position.y)) * (0.55 + 0.45 * smoothstep(-0.6, 0.9, position.x));
      transformed += objectNormal * (uBreath * 0.075 * wB);`);
    sh.fragmentShader = 'uniform vec3 uRim;\n' + sh.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      float fres = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      totalEmissiveRadiance += uRim * fres * 0.42;`);
  };
  const treeMat = new THREE.MeshStandardMaterial({ color: PAL.sun, roughness: 0.35, emissive: PAL.carrot, emissiveIntensity: 0.15 });
  const cartMat = new THREE.MeshPhysicalMaterial({ color: 0xf1e4d0, roughness: 0.45, clearcoat: 0.25, sheen: 0.5, sheenColor: new THREE.Color(0xffffff) });

  const lungA = new THREE.Group(); // viewer-left, anatomical right
  lungA.position.set(-1.05, 0, 0);
  const meshA = new THREE.Mesh(lungGeometry(detail, { horizontal: true }), lungMat);
  const treeA = new THREE.Mesh(treeGeometry(7), treeMat);
  lungA.add(meshA, treeA);
  const lungB = new THREE.Group(); // viewer-right, anatomical left
  lungB.position.set(1.05, 0, 0);
  const meshB = new THREE.Mesh(lungGeometry(detail, { notch: true }), lungMat);
  const treeB = new THREE.Mesh(treeGeometry(19), treeMat);
  lungB.add(meshB, treeB);
  const trachea = new THREE.Mesh(tracheaGeometry(), cartMat);
  inner.add(lungA, lungB, trachea);
  treeA.visible = treeB.visible = false;

  return {
    root, nh: 3.85, nw: 4.2,
    top: new V(0, 2.35 - 0.47, 0),
    update(b, xray) {
      uniforms.uBreath.value = b;
      const sx = 1 + 0.02 * b, sy = 1 + 0.012 * b, sz = 1 + 0.02 * b;
      lungA.scale.set(-sx, sy, sz);
      lungB.scale.set(sx, sy, sz);
      lungA.position.y = lungB.position.y = -0.035 * b;
      lungMat.opacity = 1 - 0.74 * xray;
      lungMat.depthWrite = xray < 0.02;
      treeA.visible = treeB.visible = xray > 0.02;
      treeMat.emissiveIntensity = 0.12 + 0.3 * xray;
    },
  };
}

/* ---------------- germ (ISPA virus) ---------------- */
export function createGermGeometry(detail = 3) {
  let body = new THREE.IcosahedronGeometry(0.26, detail);
  body.deleteAttribute('normal');
  body.deleteAttribute('uv');
  body = mergeVertices(body);
  const p = body.attributes.position, n = p.count, col = new Float32Array(n * 3);
  const cA = new THREE.Color(PAL.kiwi), cB = new THREE.Color(0x5f7f00), c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const nn = noise3(x * 9 + 5, y * 9, z * 9);
    const k = 1 + nn * 0.07;
    p.setXYZ(i, x * k, y * k, z * k);
    c.copy(cA).lerp(cB, Math.max(0, nn) * 1.1);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  body.setAttribute('color', new THREE.BufferAttribute(col, 3));
  body.computeVertexNormals();
  const parts = [body.toNonIndexed()];
  const up = new V(0, 1, 0), q = new THREE.Quaternion();
  const M = 18;
  for (let i = 0; i < M; i++) {
    const yy = 1 - ((i + 0.5) / M) * 2, rr = Math.sqrt(1 - yy * yy), th = i * 2.39996;
    q.setFromUnitVectors(up, new V(Math.cos(th) * rr, yy, Math.sin(th) * rr));
    const stalk = new THREE.CylinderGeometry(0.016, 0.026, 0.13, 6);
    stalk.translate(0, 0.31, 0);
    stalk.deleteAttribute('uv');
    paint(stalk, PAL.forest).applyQuaternion(q);
    const tip = new THREE.SphereGeometry(0.043, 10, 8);
    tip.translate(0, 0.385, 0);
    tip.deleteAttribute('uv');
    paint(tip, PAL.sun).applyQuaternion(q);
    parts.push(stalk.toNonIndexed(), tip.toNonIndexed());
  }
  return mergeGeometries(parts);
}
export const germMaterial = () =>
  new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.3, sheen: 0.6, sheenColor: new THREE.Color(0xeaf7b0) });

/* ---------------- surgical mask ---------------- */
function fabricTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  const img = x.createImageData(128, 128);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 90;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(6, 4);
  return t;
}

export function createMask() {
  const root = new THREE.Group();
  const W = 1.8, H = 1.02, WS = 90, HS = 50, R = 1.1;
  const g = new THREE.PlaneGeometry(W, H, WS, HS);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    const ex = Math.abs(x) / (W / 2), ey = Math.abs(y) / (H / 2);
    const ang = x / R;
    const X = Math.sin(ang) * R, Z = (Math.cos(ang) - 1) * R;
    const bulge = 0.26 * (1 - ey * ey) * (1 - 0.5 * ex * ex);
    const band = (y + 0.27) / 0.2;
    let pleat = 0;
    if (band > 0 && band < 3) {
      const f = band - Math.floor(band);
      pleat = 0.044 * smooth(0, 0.9, f) * (f > 0.9 ? (1 - f) / 0.1 : 1);
    }
    pleat *= smooth(0.96, 0.74, ex);
    pos.setXYZ(i, X, y * (1 - 0.07 * ex * ex), Z + bulge + pleat);
  }
  g.computeVertexNormals();
  const fabric = new THREE.MeshPhysicalMaterial({
    color: 0xf7f1e4, roughness: 0.92, sheen: 1, sheenRoughness: 0.7, sheenColor: new THREE.Color(0xffffff),
    side: THREE.DoubleSide, bumpMap: fabricTexture(), bumpScale: 0.9,
  });
  const body = new THREE.Mesh(g, fabric);
  root.add(body);

  const at = (ix, iy) => new V().fromBufferAttribute(pos, iy * (WS + 1) + ix);
  const perim = [];
  for (let ix = 0; ix <= WS; ix += 3) perim.push(at(ix, 0));
  for (let iy = 3; iy <= HS; iy += 3) perim.push(at(WS, iy));
  for (let ix = WS - 3; ix >= 0; ix -= 3) perim.push(at(ix, HS));
  for (let iy = HS - 3; iy > 0; iy -= 3) perim.push(at(0, iy));
  const edgeMat = new THREE.MeshPhysicalMaterial({ color: 0xece2cc, roughness: 0.8, sheen: 0.6 });
  root.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(perim, true), 260, 0.017, 6, true), edgeMat));

  const wire = [];
  for (let ix = 30; ix <= 60; ix += 3) { const v = at(ix, 1); v.z += 0.014; wire.push(v); }
  const wireG = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wire), 40, 0.011, 6);
  wireG.scale(1, 0.6, 1);
  root.add(new THREE.Mesh(wireG, new THREE.MeshStandardMaterial({ color: 0xe9e6de, metalness: 0.35, roughness: 0.45 })));
  const loopMat = new THREE.MeshPhysicalMaterial({ color: PAL.sun, roughness: 0.55, sheen: 0.4 });
  for (const sd of [-1, 1]) {
    const ix = sd > 0 ? WS : 0;
    const a = at(ix, 3), b = at(ix, HS - 3);
    const ax = Math.abs(a.x);
    const pts = [a, new V(sd * (ax + 0.2), a.y - 0.02, a.z - 0.26), new V(sd * (ax + 0.3), 0, a.z - 0.5), new V(sd * (ax + 0.2), b.y + 0.02, b.z - 0.26), b];
    root.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.013, 6), loopMat));
  }
  const hit = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.25, 0.8), new THREE.MeshBasicMaterial({ visible: false }));
  root.add(hit);
  return { root, body, hit, nh: 1.25, nw: 2.45 };
}

/* ---------------- stethoscope ---------------- */
export function createStethoscope() {
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.position.y = -0.445;
  root.add(inner);
  const chrome = new THREE.MeshStandardMaterial({ color: 0xe6e8ea, metalness: 1, roughness: 0.18 });
  const rimMat = new THREE.MeshPhysicalMaterial({ color: PAL.carrot, metalness: 0.35, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.1 });
  const diaMat = new THREE.MeshPhysicalMaterial({ color: PAL.sun, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.2 });
  const tubeMat = new THREE.MeshPhysicalMaterial({ color: PAL.tomato, roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.25 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x1c2420, roughness: 0.6 });

  const head = new THREE.Group();
  const rimG = new THREE.CylinderGeometry(0.46, 0.46, 0.14, 64);
  rimG.rotateX(Math.PI / 2);
  const diaG = new THREE.CylinderGeometry(0.37, 0.37, 0.02, 64);
  diaG.rotateX(Math.PI / 2);
  const dia = new THREE.Mesh(diaG, diaMat);
  dia.position.z = 0.075;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.035, 12, 64), chrome);
  ring.position.z = 0.075;
  const backG = new THREE.SphereGeometry(0.36, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2);
  backG.rotateX(-Math.PI / 2);
  backG.scale(1, 1, 0.45);
  const back = new THREE.Mesh(backG, chrome);
  back.position.z = -0.07;
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.5, 20), chrome);
  stem.position.set(0, 0.62, -0.1);
  stem.rotation.x = -0.15;
  head.add(new THREE.Mesh(rimG, rimMat), dia, ring, back, stem);
  head.position.set(0, -1.5, 0.05);
  head.rotation.x = -0.2;
  inner.add(head);

  const main = new THREE.CatmullRomCurve3([new V(0, -0.86, -0.1), new V(0.18, -0.45, -0.08), new V(0.42, 0, 0), new V(0.2, 0.45, 0.08), new V(-0.12, 0.8, 0.04), new V(0, 1.12, 0)]);
  inner.add(new THREE.Mesh(new THREE.TubeGeometry(main, 120, 0.068, 18), tubeMat));
  const yoke = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 14), chrome);
  yoke.position.set(0, 1.14, 0);
  inner.add(yoke);
  for (const sd of [-1, 1]) {
    const c1 = new THREE.CatmullRomCurve3([new V(0, 1.14, 0), new V(sd * 0.18, 1.36, 0.02), new V(sd * 0.36, 1.72, 0), new V(sd * 0.42, 2.0, -0.02)]);
    inner.add(new THREE.Mesh(new THREE.TubeGeometry(c1, 60, 0.058, 16), tubeMat));
    const c2 = new THREE.CatmullRomCurve3([new V(sd * 0.42, 2.0, -0.02), new V(sd * 0.46, 2.3, -0.02), new V(sd * 0.38, 2.58, 0.04), new V(sd * 0.22, 2.74, 0.1)]);
    inner.add(new THREE.Mesh(new THREE.TubeGeometry(c2, 50, 0.026, 12), chrome));
    const fer = new THREE.Mesh(new THREE.CylinderGeometry(0.066, 0.066, 0.1, 16), chrome);
    fer.position.set(sd * 0.42, 2.0, -0.02);
    inner.add(fer);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 14), rubber);
    tip.position.set(sd * 0.2, 2.76, 0.11);
    tip.scale.set(1, 1.15, 1);
    inner.add(tip);
  }
  const hit = new THREE.Mesh(new THREE.BoxGeometry(1.5, 4.8, 0.9), new THREE.MeshBasicMaterial({ visible: false }));
  root.add(hit);
  return { root, hit, nh: 4.85, nw: 1.35 };
}
