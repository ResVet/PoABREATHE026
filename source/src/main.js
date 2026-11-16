import Lenis from 'lenis';
import { breath } from './breath.js';
import { initScene } from './scene.js';
import { initLanyard } from './lanyard.js';
import { initUI } from './ui.js';
import { initFx } from './fx.js';

window.__poa = true;
const html = document.documentElement;
const reduced = html.classList.contains('reduced');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const data = window.POA || { config: {}, bph: [], divisions: [], links: {} };

let lenis = null;
if (fine && !reduced) {
  try {
    lenis = new Lenis({ lerp: 0.095, smoothWheel: true, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
  } catch (err) { lenis = null; }
}
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a || !lenis) return;
  const id = a.getAttribute('href');
  const target = id.length > 1 ? document.querySelector(id) : null;
  if (!target) return;
  e.preventDefault();
  lenis.scrollTo(target, { duration: 1.5 });
  if (history.replaceState) history.replaceState(null, '', id);
});

let scene = null;
try {
  scene = initScene({ reduced });
} catch (err) {
  html.classList.add('no-gl');
  console.warn('WebGL tidak tersedia, situs jalan tanpa 3D.', err);
}
const lanyard = initLanyard({ reduced });
const fx = initFx({ reduced, fine, scene });
const ui = initUI({ data, scene, lanyard, reduced, fx });

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
  last = now;
  if (lenis) lenis.raf(now);
  breath.update(dt, reduced);
  ui.frame(now, dt);
  fx.frame(now, dt);
  if (scene) {
    try { scene.frame(now, dt); } catch (err) { console.error(err); scene = null; html.classList.add('no-gl'); }
  }
  lanyard.frame(now, dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
