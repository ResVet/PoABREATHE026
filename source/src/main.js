import Lenis from 'lenis';
import { breath } from './breath.js';
import { initScene } from './scene.js';
import { initLanyard } from './lanyard.js';
import { initUI } from './ui.js';
import { initFx } from './fx.js';
import { createSound } from './sound.js';

window.__poa = true;
const html = document.documentElement;
const reduced = html.classList.contains('reduced');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const data = window.POA || { config: {}, bph: [], divisions: [], links: {} };

let lenis = null;
if (fine && !reduced) {
  try {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
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
  lenis.scrollTo(target, { duration: 1.6 });
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

const sound = createSound();
const syncSound = (on) => {
  html.classList.toggle('sound-on', on);
  document.querySelectorAll('[data-sound]').forEach((b) => {
    b.setAttribute('aria-pressed', String(on));
    const l = b.querySelector('[data-sound-label]');
    if (l) l.textContent = on ? b.dataset.on : b.dataset.off;
  });
};
document.addEventListener('click', async (e) => {
  const b = e.target.closest && e.target.closest('[data-sound]');
  if (!b) return;
  e.preventDefault();
  syncSound(await sound.toggle());
});

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
  last = now;
  if (lenis) lenis.raf(now);
  breath.update(dt, reduced);
  sound.update(dt > 0 ? breath.delta / dt : 0, breath.value);
  ui.frame(now, dt);
  fx.frame(now, dt);
  if (scene) {
    try { scene.frame(now, dt); } catch (err) { console.error(err); scene = null; html.classList.add('no-gl'); }
  }
  lanyard.frame(now, dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
