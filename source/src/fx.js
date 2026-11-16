// Motion layer: split-text reveals, hero intro and scroll scrub, tickers, cursor follower,
// magnetic buttons, card tilt, photo strip drag/parallax, footer letters, header and progress.
import { breath } from './breath.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const LUNG_ICON = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6v13m0 0-5 5m5-5 5 5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 13C13 14 8.5 22.5 7.5 31c-.7 6 1.3 10 6 10 4 0 6.5-2.5 6.5-7V17.5c0-2.7-.4-4.5-1.5-4.5Z" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linejoin="round"/><path d="M29.5 13C35 14 39.5 22.5 40.5 31c.7 6-1.3 10-6 10-4 0-6.5-2.5-6.5-7V17.5c0-2.7.4-4.5 1.5-4.5Z" fill="currentColor"/></svg>';

export function splitText(el, { chars = false, lines = false } = {}) {
  if (!el || el.dataset.split) return;
  el.dataset.split = '1';
  const parts = lines
    ? el.innerHTML.split(/<br\s*\/?>/i).map((h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean)
    : [el.textContent.replace(/\s+/g, ' ').trim()];
  let i = 0, j = 0;
  const word = (w) => {
    const inner = chars ? Array.from(w).map((c) => `<span class="ch" style="--j:${j++}">${esc(c)}</span>`).join('') : esc(w);
    return `<span class="w"><span class="wi" style="--i:${i++}">${inner}</span></span>`;
  };
  el.innerHTML = `<span class="sr-only">${esc(parts.join(' '))}</span><span aria-hidden="true">${parts.map((ln) => ln.split(' ').map(word).join(' ')).join('<br>')}</span>`;
}

export function initFx({ reduced, fine, scene }) {
  const html = document.documentElement;
  const motion = !reduced;

  /* split headings */
  $$('.h2').forEach((el) => splitText(el));
  splitText($('.gate__title'));
  splitText($('.foot__big'), { lines: true, chars: true });
  splitText($('.modal__yay'), { chars: true });
  requestAnimationFrame(() => { const g = $('.gate__title'); if (g) g.classList.add('split-in'); });
  $$('.wm-in span').forEach((s, i) => s.style.setProperty('--i', i));

  /* intro */
  let introDone = false;
  const runIntro = () => {
    if (introDone) return;
    introDone = true;
    requestAnimationFrame(() => {
      html.classList.remove('intro');
      if (scene) scene.intro();
    });
  };
  if (!html.classList.contains('gated')) {
    const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([ready, new Promise((r) => setTimeout(r, 1400))]).then(runIntro);
  }

  /* cursor follower (mouse only) */
  let cursor = null, cLabel = null, baseState = '', baseLabel = '', px = -200, py = -200, cx = -200, cy = -200;
  if (fine && motion) {
    cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__label"></span>';
    document.body.appendChild(cursor);
    cLabel = cursor.firstChild;
    html.classList.add('has-cursor');
    document.addEventListener('pointerover', (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      if (t.closest('input,textarea')) { baseState = 'text'; baseLabel = ''; }
      else if (t.closest('#lanyard')) { baseState = 'drag'; baseLabel = 'seret'; }
      else if (t.closest('.hero__stage')) { baseState = 'drag'; baseLabel = 'tahan'; }
      else if (t.closest('.strip')) { baseState = 'drag'; baseLabel = 'geser'; }
      else if (t.closest('a,button,[role="tab"],label')) { baseState = 'link'; baseLabel = ''; }
      else { baseState = ''; baseLabel = ''; }
    });
    html.addEventListener('mouseleave', () => { px = py = -200; });
  }

  /* magnetic buttons + card tilt (mouse only) */
  const MAG = '.btn, .chip, .lookup__go, .menu-btn, .tabs button, .gate__skip, .modal__x';
  const TILT = '.div, a.tile';
  let magEl = null, tiltEl = null;
  const resetTilt = (el) => { el.style.transition = 'transform .8s cubic-bezier(.22,.8,.2,1)'; el.style.transform = ''; };
  if (fine && motion) {
    $$(MAG).forEach((el) => el.classList.add('mag'));
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX; py = e.clientY;
      const t = e.target && e.target.closest ? e.target : null;
      const m = t ? t.closest(MAG) : null;
      if (magEl && magEl !== m) { magEl.style.translate = ''; magEl = null; }
      if (m) {
        if (!m.classList.contains('mag')) m.classList.add('mag');
        const r = m.getBoundingClientRect();
        m.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1)}px`;
        magEl = m;
      }
      const c = t ? t.closest(TILT) : null;
      if (tiltEl && tiltEl !== c) { resetTilt(tiltEl); tiltEl = null; }
      if (c) {
        const r = c.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        c.style.transition = 'transform .16s ease-out';
        c.style.transform = `perspective(900px) rotateX(${(-ny * 7).toFixed(2)}deg) rotateY(${(nx * 9).toFixed(2)}deg) translateY(-4px)`;
        c.style.setProperty('--gx', ((nx + 0.5) * 100).toFixed(1) + '%');
        c.style.setProperty('--gy', ((ny + 0.5) * 100).toFixed(1) + '%');
        tiltEl = c;
      }
    }, { passive: true });
  }

  /* photo strip: drag with momentum (mouse) + parallax */
  const strip = $('.strip');
  const photos = strip ? $$('.ph img', strip) : [];
  let drag = null, vel = 0;
  if (strip) {
    strip.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, sl: strip.scrollLeft, last: e.clientX, moved: 0 };
      vel = 0;
      strip.classList.add('is-drag');
      try { strip.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    });
    strip.addEventListener('pointermove', (e) => {
      if (!drag) return;
      strip.scrollLeft = drag.sl - (e.clientX - drag.x);
      vel = e.clientX - drag.last;
      drag.moved += Math.abs(vel);
      drag.last = e.clientX;
    });
    const end = () => { if (!drag) return; drag = null; };
    strip.addEventListener('pointerup', end);
    strip.addEventListener('pointercancel', end);
    strip.addEventListener('lostpointercapture', end);
    strip.addEventListener('dragstart', (e) => e.preventDefault());
  }

  /* footer letters */
  const footChars = $$('.foot__big .ch');
  const foot = $('.foot__big');

  /* header + progress */
  const top = $('#topbar');
  const bar = $('.progress i');
  let lastY = window.scrollY, vSmooth = 0, dirSign = 1;

  return {
    runIntro,
    replay(el) {
      if (!el) return;
      el.classList.remove('split-in');
      void el.offsetWidth;
      el.classList.add('split-in');
    },
    frame(now, dt) {
      const t = now / 1000;
      const y = window.scrollY, vh = window.innerHeight;
      const dy = y - lastY;
      lastY = y;
      if (dt > 0) vSmooth += (dy / dt - vSmooth) * Math.min(1, dt * 8);
      if (Math.abs(dy) > 0.5) dirSign = dy > 0 ? 1 : -1;

      // hero scroll scrub
      html.style.setProperty('--hp', clamp(y / (vh * 0.9), 0, 1).toFixed(4));

      // header hide on scroll down, progress bar
      if (top && !html.classList.contains('gated')) {
        const hide = y > 160 && dy > 2 && !top.classList.contains('is-open');
        if (hide) top.classList.add('is-hidden');
        else if (dy < -2 || y < 160) top.classList.remove('is-hidden');
      }
      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1).toFixed(4) : 0})`;
      }

      // cursor
      if (cursor) {
        const k = 1 - Math.exp(-dt * 18);
        cx += (px - cx) * k; cy += (py - cy) * k;
        const tap = html.classList.contains('hover-3d');
        const st = tap ? 'tap' : baseState, lb = tap ? 'ketuk' : baseLabel;
        if (cursor.dataset.state !== st) cursor.dataset.state = st;
        if (cLabel.textContent !== lb) cLabel.textContent = lb;
        cursor.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
      }

      // strip momentum + parallax
      if (strip) {
        if (!drag && Math.abs(vel) > 0.4) { strip.scrollLeft -= vel; vel *= Math.pow(0.02, dt); }
        else if (!drag && strip.classList.contains('is-drag')) { vel = 0; strip.classList.remove('is-drag'); }
        const sr = strip.getBoundingClientRect();
        if (sr.bottom > 0 && sr.top < vh && motion) {
          const mid = window.innerWidth / 2;
          const rects = photos.map((im) => im.parentNode.getBoundingClientRect());
          photos.forEach((im, i) => {
            const r = rects[i];
            const off = (r.left + r.width / 2 - mid) / window.innerWidth;
            im.style.transform = `translate3d(${(-off * 9).toFixed(2)}%,0,0) scale(1.16)`;
          });
        }
      }

      // footer letters stretch toward the cursor, or breathe on touch screens
      if (foot && footChars.length && motion) {
        const fr = foot.getBoundingClientRect();
        if (fr.bottom > 0 && fr.top < vh) {
          if (fine && px > -100) {
            const rects = footChars.map((c) => c.getBoundingClientRect());
            footChars.forEach((c, i) => {
              const r = rects[i];
              const d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
              c.style.setProperty('--cw', (62 + 46 * Math.exp(-((d / 170) ** 2))).toFixed(1));
            });
          } else {
            const b = Math.min(1, breath.value);
            footChars.forEach((c, i) => c.style.setProperty('--cw', (62 + 22 * b * (0.5 + 0.5 * Math.sin(t * 1.4 - i * 0.32))).toFixed(1)));
          }
        }
      }
    },
  };
}
