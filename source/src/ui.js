import { breath } from './breath.js';
import { HEX } from './lanyard.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const THEME_HEX = { paper: '#081C10' };
const LIGHT_TEXT_ON = new Set(['forest', 'tomato']);
const M_FORMS = new Set(['m', 'muh', 'moh', 'mhd', 'muhamad', 'mohammad', 'mohamad', 'muhammed', 'mochammad', 'moch', 'mochamad']);
const pad2 = (n) => String(n).padStart(2, '0');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/['’`.]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const toks = (s) => norm(s).split(' ').filter(Boolean).map((t) => (M_FORMS.has(t) ? 'muhammad' : t));

function dice(a, b) {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const m = new Map();
  for (let i = 0; i < a.length - 1; i++) { const g = a.substr(i, 2); m.set(g, (m.get(g) || 0) + 1); }
  let hit = 0;
  for (let i = 0; i < b.length - 1; i++) { const g = b.substr(i, 2), c = m.get(g); if (c) { m.set(g, c - 1); hit++; } }
  return (2 * hit) / (a.length + b.length - 2);
}

function buildPeople(data) {
  const out = [];
  (data.bph || []).forEach((b, i) => out.push({ name: b.name, role: b.role || 'BPH', group: 'Badan Pengurus Harian', color: 'forest', id: `BPH-${pad2(i + 1)}`, kind: 'bph' }));
  (data.divisions || []).forEach((d) => {
    let n = 1;
    const add = (name, role, kind) => { if (name && String(name).trim()) out.push({ name: String(name).trim(), role, group: `Divisi ${d.name}`, color: d.color, id: `${d.code}-${pad2(n++)}`, kind }); };
    add(d.koor, 'Koordinator', 'koor');
    add(d.wakoor, 'Wakil Koordinator', 'wakoor');
    (d.staf || []).forEach((s) => add(s, 'Staf', 'staf'));
  });
  const aliases = data.aliases || {};
  out.forEach((p) => {
    p.keys = [p.name, ...(aliases[p.name] || [])].map(toks);
    p.flat = p.keys.map((k) => k.join(' '));
  });
  return out;
}

function search(people, q) {
  const qt = toks(q);
  if (!qt.length || qt.join('').length < 2) return { type: 'none', list: [] };
  const qs = qt.join(' ');
  const exact = people.filter((p) => p.flat.includes(qs));
  if (exact.length) return { type: exact.length === 1 ? 'exact' : 'multi', list: exact };
  const pref = people.filter((p) => p.keys.some((k) => qt.every((t) => k.some((w) => w.startsWith(t)))));
  if (pref.length) {
    pref.sort((a, b) => a.name.length - b.name.length);
    return { type: pref.length === 1 && qt.length >= 2 ? 'exact' : 'multi', list: pref.slice(0, 8) };
  }
  const scored = people
    .map((p) => ({ p, s: Math.max(...p.flat.map((f) => dice(f, qs))) }))
    .filter((x) => x.s >= 0.6)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((x) => x.p);
  return scored.length ? { type: 'fuzzy', list: scored } : { type: 'none', list: [] };
}

function tracePath(w = 520, h = 44) {
  let d = '';
  const n = 260, mid = h * 0.78;
  for (let i = 0; i <= n; i++) {
    const u = i / n, x = u * w;
    const ph = (u * 5.2) % 1, big = u > 0.55 && u < 0.75 ? 1.75 : 1;
    const f = ph < 0.4 ? Math.sin((ph / 0.4) * Math.PI * 0.5) : Math.cos(((ph - 0.4) / 0.6) * Math.PI * 0.5);
    const y = mid - f * h * 0.36 * big;
    d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d;
}

export function initUI({ data, scene, lanyard, reduced, fx }) {
  const lenis = () => window.__lenis || null;
  const cfg = data.config || {};
  const html = document.documentElement;
  const people = buildPeople(data);
  const announceAt = cfg.announceAt ? new Date(cfg.announceAt).getTime() : NaN;
  const locked = () => !isNaN(announceAt) && Date.now() < announceAt;

  /* bindings */
  $$('[data-bind]').forEach((el) => {
    const v = cfg[el.dataset.bind];
    el.textContent = v && String(v).trim() ? v : el.dataset.bind === 'eventDate' ? 'Menyusul' : el.textContent;
  });
  $$('[data-bind-href]').forEach((el) => {
    const k = el.dataset.bindHref, v = cfg[k];
    if (!v) return;
    el.href = k === 'email' ? 'mailto:' + v : v;
    if (k === 'email') el.textContent = v;
  });
  $$('.trace path').forEach((p) => {
    p.setAttribute('d', tracePath());
    try { p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + 1); } catch (e) { /* ignore */ }
  });

  /* header */
  const top = $('#topbar'), menuBtn = $('#menu-btn'), nav = $('#nav');
  const onScroll = () => top.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const closeMenu = () => { top.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = 'Menu'; };
  menuBtn.addEventListener('click', () => {
    const open = !top.classList.contains('is-open');
    top.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Tutup' : 'Menu';
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* section themes + active nav */
  const meta = $('meta[name="theme-color"]');
  let theme = 'paper';
  const setTheme = (t) => {
    if (!t || t === theme) return;
    theme = t;
    html.dataset.theme = t;
    if (meta) meta.setAttribute('content', THEME_HEX[t] || THEME_HEX.paper);
  };
  const navLinks = $$('#nav a, .index a');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      setTheme(e.target.dataset.theme);
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  $$('main [data-theme]').forEach((s) => io.observe(s));

  const rio = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal]').forEach((el) => rio.observe(el));

  /* hero */
  const xray = $('#xray');
  if (scene) {
    xray.addEventListener('click', () => {
      const on = xray.getAttribute('aria-pressed') !== 'true';
      xray.setAttribute('aria-pressed', String(on));
      xray.textContent = on ? 'Tampilan: jaringan' : 'Tampilan: kaca';
      scene.setXray(on);
    });
  } else {
    xray.hidden = true;
    $('#hero-hint').hidden = true;
  }
  if (matchMedia('(pointer: coarse)').matches) $('#hero-hint').textContent = 'Tahan paru-parunya, geser untuk memutar. Kumannya bisa diketuk.';
  const heroStage = $('#hero-stage');
  $$('[data-focus]').forEach((a) => a.addEventListener('click', () => {
    const el = document.getElementById(a.dataset.focus);
    if (el && !el.disabled) setTimeout(() => el.focus({ preventScroll: true }), reduced ? 0 : 650);
  }));

  /* wordmark */
  const wm = $('#wordmark'), wmIn = $('.wm-in'), letters = $$('.wm-in span'), layer = $('.wordlayer');
  const hero = $('.hero'), stageEl = $('.hero__stage');
  const WMIN = 86, WMAX = 126;
  let wmSize = 100;
  const fitWordmark = () => {
    letters.forEach((s) => s.style.setProperty('--w', WMAX + 6));
    wm.style.fontSize = '100px';
    const w = wmIn.getBoundingClientRect().width || 1;
    const avail = html.clientWidth * 0.95;
    wmSize = Math.max(48, (100 * avail) / w);
    wm.style.fontSize = wmSize.toFixed(1) + 'px';
    placeWordmark();
  };
  const placeWordmark = () => {
    layer.style.setProperty('--hero-h', hero.offsetHeight + 'px');
    const sr = stageEl.getBoundingClientRect();
    const bottom = sr.bottom + window.scrollY;
    wm.style.setProperty('--wm-top', Math.max(0, bottom - wmSize * 0.8 * 0.95) + 'px');
  };
  let rt = 0;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fitWordmark, 120); });
  fitWordmark();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWordmark);

  const meter = $('#meter'), meterLabel = $('#meter span');
  let lastLabel = '';

  /* gate */
  const gate = initGate();

  /* stage note + lock */
  const stageNote = $('#stage-note');
  stageNote.textContent = `Tahap ini: ${cfg.stage || 'penempatan panitia'}.${cfg.staffPending ? ' Penempatan staf menyusul.' : ''}`;
  const q = $('#q'), go = $('.lookup__go'), msg = $('#lookup-msg'), sug = $('#suggest'), cd = $('#countdown');
  const fmtDate = (ms) => new Date(ms).toLocaleString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }) + ' WIB';
  if (heroStage) heroStage.textContent = locked() ? 'Dibuka ' + fmtDate(announceAt) : 'Pengumuman sudah dibuka';
  if (locked()) {
    q.disabled = go.disabled = true;
    q.placeholder = 'Belum dibuka';
    cd.hidden = false;
    const tick = () => {
      const left = announceAt - Date.now();
      if (left <= 0) { location.reload(); return; }
      const d = Math.floor(left / 864e5), h = Math.floor((left % 864e5) / 36e5), m = Math.floor((left % 36e5) / 6e4), s = Math.floor((left % 6e4) / 1e3);
      cd.innerHTML = `<p>Pengumuman dibuka ${esc(fmtDate(announceAt))}.</p>` + [[d, 'hari'], [h, 'jam'], [m, 'menit'], [s, 'detik']].map(([v, l]) => `<div><b>${pad2(v)}</b><span>${l}</span></div>`).join('');
    };
    tick();
    setInterval(tick, 1000);
  }

  /* roster */
  const rosterQ = $('#roster-q'), rosterCount = $('#roster-count'), rosterEmpty = $('#roster-empty');
  const nameHTML = (name) => (locked() ? '<span class="locked">• • • • •</span>' : `<span class="nm">${esc(name)}</span>`);
  const bphEl = $('#bph');
  bphEl.innerHTML = '<p class="bph__title">Badan Pengurus Harian</p>' + (data.bph || []).map((b) => `<div class="person" data-names="${esc(norm(b.name))}"><b>${nameHTML(b.name)}</b><span>${esc(b.role || 'BPH')}</span></div>`).join('');
  const divsEl = $('#divs');
  divsEl.innerHTML = (data.divisions || []).map((d, i) => {
    const c = HEX[d.color] || HEX.sun, cfg2 = LIGHT_TEXT_ON.has(d.color) ? HEX.cream : HEX.ink;
    const row = (label, name) => `<div><dt>${label}</dt>${name ? `<dd>${nameHTML(name)}</dd>` : '<dd class="tba">Menyusul</dd>'}</div>`;
    const staf = d.staf || [];
    const all = [d.koor, d.wakoor, ...staf].filter(Boolean).map(norm).join('|');
    const staffBlock = staf.length
      ? `<button class="staff-toggle" type="button" aria-expanded="false">Lihat ${staf.length} staf</button><ul class="staff" hidden>${staf.map((s) => `<li>${nameHTML(s)}</li>`).join('')}</ul>`
      : `<p class="staff-note">${cfg.staffPending ? 'Staf diumumkan menyusul' : 'Belum ada staf'}</p>`;
    return `<article class="div glass" data-reveal data-names="${esc(all)}" style="--c:${c};--cfg:${cfg2}">
      <div class="div__top"><span class="div__no">${pad2(i + 1)}</span><span class="div__code">${esc(d.code)}</span></div>
      <h3 class="div__name">${esc(d.name)}${d.nick ? `<small>atau ${esc(d.nick)}</small>` : ''}</h3>
      <p class="div__blurb">${esc(d.blurb || '')}</p>
      <dl class="people">${row('Koordinator', d.koor)}${row('Wakil', d.wakoor)}</dl>
      ${staffBlock}
    </article>`;
  }).join('');
  $$('.div[data-reveal]', divsEl).forEach((el) => rio.observe(el));
  divsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.staff-toggle');
    if (!b) return;
    const list = b.nextElementSibling, open = list.hidden;
    list.hidden = !open;
    b.setAttribute('aria-expanded', String(open));
    b.textContent = open ? 'Sembunyikan staf' : `Lihat ${list.children.length} staf`;
  });
  const total = people.length;
  rosterCount.textContent = locked() ? 'Nama tampil saat pengumuman dibuka' : `${total} nama terdaftar`;
  const highlight = (root, nq) => {
    $$('.nm', root).forEach((el) => {
      const raw = el.textContent;
      if (!nq) { el.textContent = raw; return; }
      const i = raw.toLowerCase().indexOf(rosterQ.value.trim().toLowerCase());
      if (i < 0) { el.textContent = raw; return; }
      const l = rosterQ.value.trim().length;
      el.innerHTML = esc(raw.slice(0, i)) + '<mark>' + esc(raw.slice(i, i + l)) + '</mark>' + esc(raw.slice(i + l));
    });
  };
  rosterQ.addEventListener('input', () => {
    if (locked()) return;
    const nq = norm(rosterQ.value);
    let shown = 0;
    $$('.person', bphEl).forEach((p) => { const ok = !nq || p.dataset.names.includes(nq); p.hidden = !ok; if (ok && nq) shown++; });
    $$('.div', divsEl).forEach((d) => {
      const ok = !nq || d.dataset.names.includes(nq);
      d.hidden = !ok;
      if (ok && nq) {
        shown += d.dataset.names.split('|').filter((n) => n.includes(nq)).length;
        const list = $('.staff', d), btn = $('.staff-toggle', d);
        if (list && list.hidden && Array.from(list.children).some((li) => norm(li.textContent).includes(nq))) btn.click();
      }
    });
    highlight(document, nq);
    bphEl.hidden = !!nq && !$$('.person', bphEl).some((p) => !p.hidden);
    rosterEmpty.hidden = !nq || shown > 0;
    rosterCount.textContent = nq ? `${shown} cocok` : `${total} nama terdaftar`;
  });

  /* workspace links */
  const links = data.links || {};
  const tile = (l, i) => {
    const k = pad2(i + 1), href = (l.href || '').trim();
    if (!href) return `<div class="tile glass is-soon" aria-disabled="true"><span class="tile__k">${k}</span><span class="tile__t">${esc(l.title)}</span><span class="tile__d">${esc(l.desc || '')}</span><span class="tile__go">Menyusul</span></div>`;
    const ext = /^https?:/i.test(href), mail = /^mailto:/i.test(href);
    return `<a class="tile glass" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}><span class="tile__k">${k}</span><span class="tile__t">${esc(l.title)}</span><span class="tile__d">${esc(l.desc || '')}</span><span class="tile__go">${mail ? 'Tulis email' : ext ? 'Buka ↗' : 'Lihat'}</span></a>`;
  };
  $('#tp-divisi').innerHTML = (links.divisi || []).map(tile).join('');
  $('#tp-bph').innerHTML = (links.bph || []).map(tile).join('');
  $('#tp-sekretariat').innerHTML = (links.sekretariatNote ? `<p class="note">${esc(links.sekretariatNote)}</p>` : '') + (links.sekretariat || []).map(tile).join('');
  const tabs = $$('[role="tab"]');
  const selectTab = (t, focus) => {
    tabs.forEach((b) => {
      const on = b === t;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
  };
  tabs.forEach((b, i) => {
    b.addEventListener('click', () => selectTab(b));
    b.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      selectTab(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
    });
  });

  /* lookup */
  let sel = -1, current = [];
  const closeSug = () => { sug.hidden = true; sug.innerHTML = ''; q.setAttribute('aria-expanded', 'false'); sel = -1; };
  const renderSug = () => {
    if (locked()) return;
    const v = q.value.trim();
    if (norm(v).length < 3) { closeSug(); return; }
    const r = search(people, v);
    current = r.type === 'none' ? [] : r.list.slice(0, 6);
    if (!current.length) { closeSug(); return; }
    sel = -1;
    sug.innerHTML = current.map((p, i) => `<li role="option" id="sg-${i}" aria-selected="false" data-i="${i}"><b>${esc(p.name)}</b><small>${esc(p.kind === 'bph' ? 'BPH' : p.group.replace('Divisi ', ''))}</small></li>`).join('');
    sug.hidden = false;
    q.setAttribute('aria-expanded', 'true');
  };
  q.addEventListener('input', () => { msg.textContent = ''; renderSug(); });
  q.addEventListener('keydown', (e) => {
    if (sug.hidden) return;
    const items = $$('li', sug);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      sel = (sel + (e.key === 'ArrowDown' ? 1 : items.length - 1) + (sel < 0 && e.key === 'ArrowUp' ? 1 : 0)) % items.length;
      items.forEach((li, i) => li.setAttribute('aria-selected', String(i === sel)));
      q.setAttribute('aria-activedescendant', 'sg-' + sel);
    } else if (e.key === 'Enter' && sel >= 0) {
      e.preventDefault();
      const p = current[sel];
      closeSug();
      q.value = p.name;
      showResult(p);
    } else if (e.key === 'Escape') closeSug();
  });
  sug.addEventListener('pointerdown', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    e.preventDefault();
    const p = current[+li.dataset.i];
    closeSug();
    q.value = p.name;
    showResult(p);
  });
  document.addEventListener('pointerdown', (e) => { if (!e.target.closest('.lookup')) closeSug(); });

  const pickList = (list) => `<div class="pick">${list.map((p) => `<button type="button" data-pid="${esc(p.id)}"><b>${esc(p.name)}</b><small>${esc(p.kind === 'bph' ? 'BPH' : p.group)}</small></button>`).join('')}</div>`;
  msg.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pid]');
    if (!b) return;
    const p = people.find((x) => x.id === b.dataset.pid);
    if (p) { q.value = p.name; showResult(p); }
  });
  $('#lookup').addEventListener('submit', (e) => {
    e.preventDefault();
    closeSug();
    if (locked()) return;
    const v = q.value.trim();
    if (!v) { msg.textContent = 'Tulis namamu dulu.'; q.focus(); return; }
    const r = search(people, v);
    if (r.type === 'exact') { msg.textContent = ''; showResult(r.list[0]); return; }
    if (r.type === 'multi') { msg.innerHTML = `<strong>Ada ${r.list.length > 1 ? 'beberapa nama' : 'nama'} yang cocok.</strong> Kamu yang mana?${pickList(r.list)}`; return; }
    if (r.type === 'fuzzy') { msg.innerHTML = `<strong>Belum ketemu yang persis.</strong> Mungkin maksudmu:${pickList(r.list)}`; return; }
    msg.textContent = cfg.staffPending
      ? `Nama ini belum ada di daftar tahap ini (${String(cfg.stage || '').toLowerCase()}). Kalau kamu daftar sebagai staf, tunggu pengumuman berikutnya di grup LINE.`
      : 'Nama ini belum ketemu. Coba tulis nama lengkap sesuai form, atau tanya BPH di grup LINE.';
  });

  /* result modal */
  const modal = $('#result');
  let lastFocus = null, currentP = null;
  const note = (p) => (p.kind === 'bph' ? 'Terima kasih sudah jaga PoA dari awal.' : p.kind === 'staf' ? 'Info selanjutnya dari koordinator divisimu lewat grup LINE.' : 'Info rapat koordinasi pertama akan dikabarkan BPH lewat grup LINE.');
  function showResult(p) {
    currentP = p;
    $('#r-role').textContent = p.role;
    const dv = $('#r-div');
    dv.textContent = p.group;
    const chipC = p.color === 'coral' ? 'paper' : p.color;
    dv.style.background = HEX[chipC] || HEX.paper;
    dv.style.color = LIGHT_TEXT_ON.has(chipC) ? HEX.cream : HEX.ink;
    $('#r-name').textContent = p.name;
    $('#r-note').textContent = note(p);
    if (cfg.lineGroup) $('#r-line').href = cfg.lineGroup;
    const save = $('#r-save');
    save.textContent = 'Simpan kartu';
    save.disabled = false;
    lastFocus = document.activeElement;
    modal.hidden = false;
    html.classList.add('modal-open');
    if (lenis()) lenis().stop();
    requestAnimationFrame(() => { modal.classList.add('is-open'); if (fx) fx.replay($('.modal__yay')); });
    lanyard.open(p);
    setTimeout(() => $('.modal__x', modal).focus({ preventScroll: true }), 30);
  }
  function closeResult() {
    if (modal.hidden) return;
    modal.hidden = true;
    modal.classList.remove('is-open');
    html.classList.remove('modal-open');
    if (lenis()) lenis().start();
    lanyard.close();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeResult(); });
  $('#r-all').addEventListener('click', () => closeResult());
  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') { closeResult(); return; }
    if (e.key === 'Tab') {
      const f = $$('button:not([disabled]), a[href]', modal).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  $('#r-save').addEventListener('click', async () => {
    const b = $('#r-save');
    if (!currentP) return;
    b.disabled = true;
    b.textContent = 'Menyiapkan...';
    try {
      const r = await lanyard.save(currentP);
      b.textContent = r === 'shared' ? 'Terkirim' : r === 'cancel' ? 'Simpan kartu' : 'Tersimpan';
    } catch (err) {
      b.textContent = 'Gagal, coba lagi';
    }
    b.disabled = false;
  });

  /* germ counter */
  const chip = $('#germchip'), footGerms = $('#foot-germs');
  let chipTimer = 0;
  window.addEventListener('poa:germ', (e) => {
    const n = e.detail;
    chip.hidden = false;
    chip.textContent = n === 10 ? 'Refleks bagus. Divisi Games butuh yang kayak gini.' : `Kuman ditangkis: ${n}`;
    footGerms.textContent = `Kuman yang kamu tangkis hari ini: ${n}.`;
    clearTimeout(chipTimer);
    chipTimer = setTimeout(() => { chip.hidden = true; }, n === 10 ? 4200 : 2600);
  });

  return {
    frame(now, dt) {
      gate.frame(dt);
      const b = breath.value, bb = Math.min(1, b);
      if (breath.label !== lastLabel) { lastLabel = breath.label; meterLabel.textContent = lastLabel; }
      meter.style.setProperty('--b', (0.45 + 0.55 * bb).toFixed(3));
      if (html.classList.contains('no-gl') && window.scrollY < hero.offsetHeight + 40) {
        const t = now / 1000;
        letters.forEach((s, i) => {
          const w = WMIN + (WMAX - WMIN) * bb + (reduced ? 0 : Math.sin(t * 1.1 + i * 0.75) * 3);
          s.style.setProperty('--w', w.toFixed(1));
        });
      }
    },
  };

  function initGate() {
    const idle = { frame() {} };
    if (!html.classList.contains('gated')) return idle;
    if (lenis()) lenis().stop();
    const hold = $('#hold'), fill = $('#hold-fill'), label = $('#hold-label'), hint = $('#gate-hint'), gateEl = $('#gate');
    const C = 289.03;
    let holding = false, prog = 0, full = false, done = false, lastT = 0, holdStart = 0;
    const start = (e) => {
      if (done || holding) return;
      if (e && e.cancelable) e.preventDefault();
      holding = true;
      holdStart = performance.now() - prog * 2200;
      breath.holding = true;
      hold.classList.add('is-holding');
      if (!full) label.textContent = 'Terus...';
    };
    const end = () => {
      if (!holding || done) return;
      holding = false;
      breath.holding = false;
      hold.classList.remove('is-holding');
      if (full) enter(true);
      else { label.textContent = 'Tahan'; hint.textContent = 'Belum penuh. Coba sekali lagi, tahan lebih lama.'; }
    };
    hold.addEventListener('pointerdown', (e) => { try { hold.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } start(e); });
    hold.addEventListener('pointerup', end);
    hold.addEventListener('pointercancel', end);
    hold.addEventListener('lostpointercapture', end);
    hold.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) start(e); });
    hold.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); end(); } });
    hold.addEventListener('contextmenu', (e) => e.preventDefault());
    hold.addEventListener('click', (e) => e.preventDefault());
    $('#gate-skip').addEventListener('click', () => enter(false));
    function enter(animated) {
      done = true;
      breath.holding = false;
      try { localStorage.setItem('poa26-gate', '1'); } catch (e) { /* private mode */ }
      label.textContent = 'Hembuskan';
      const finish = () => {
        html.classList.remove('gated');
        window.scrollTo(0, 0);
        fitWordmark();
        if (lenis()) lenis().start();
        if (fx) fx.runIntro();
      };
      const wipe = $('#wipe');
      if (!animated || reduced || !wipe) {
        gateEl.classList.add('is-leaving');
        if (scene) scene.leaveGate(false);
        setTimeout(finish, animated ? 600 : 0);
        return;
      }
      const r = hold.getBoundingClientRect();
      wipe.style.setProperty('--wx', (r.left + r.width / 2).toFixed(0) + 'px');
      wipe.style.setProperty('--wy', (r.top + r.height / 2).toFixed(0) + 'px');
      gateEl.classList.add('is-exhale');
      wipe.classList.add('is-on');
      setTimeout(() => {
        gateEl.classList.add('is-leaving');
        if (scene) scene.leaveGate(true);
        finish();
        requestAnimationFrame(() => wipe.classList.add('is-out'));
      }, 900);
      setTimeout(() => wipe.classList.remove('is-on', 'is-out'), 2100);
    }
    return {
      frame() {
        const now = performance.now(), dt = Math.min(0.25, (now - (lastT || now)) / 1000);
        lastT = now;
        if (done) return;
        if (holding) prog = Math.min(1, (now - holdStart) / 2200);
        else if (!full) prog = Math.max(0, prog - dt * 1.6);
        if (prog >= 1 && !full) {
          full = true;
          hold.classList.add('is-full');
          label.textContent = 'Lepas';
          if (navigator.vibrate) navigator.vibrate(18);
        }
        fill.style.strokeDashoffset = (C * (1 - prog)).toFixed(1);
      },
    };
  }
}
