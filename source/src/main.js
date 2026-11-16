import { breath } from './breath.js';
import { initScene } from './scene.js';
import { initLanyard } from './lanyard.js';
import { initUI } from './ui.js';

window.__poa = true;
const html = document.documentElement;
const reduced = html.classList.contains('reduced');
const data = window.POA || { config: {}, bph: [], divisions: [], links: {} };

let scene = null;
try {
  scene = initScene({ reduced });
} catch (err) {
  html.classList.add('no-gl');
  console.warn('WebGL tidak tersedia, situs jalan tanpa 3D.', err);
}
const lanyard = initLanyard({ reduced });
const ui = initUI({ data, scene, lanyard, reduced });

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
  last = now;
  breath.update(dt, reduced);
  ui.frame(now, dt);
  if (scene) {
    try { scene.frame(now, dt); } catch (err) { console.error(err); scene = null; html.classList.add('no-gl'); }
  }
  lanyard.frame(now, dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
