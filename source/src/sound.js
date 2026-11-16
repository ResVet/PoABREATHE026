// Optional breath sound, built live with Web Audio. Filtered noise follows the airflow of the
// breathing clock (louder while air moves, brighter on the way in), over a very quiet pad.
export function createSound() {
  let ctx = null, master = null, air = null, hiss = null, band = null, pad = null, on = false;

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    const len = ctx.sampleRate * 2;
    const brown = ctx.createBuffer(1, len, ctx.sampleRate), bd = brown.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; bd[i] = last * 3.5; }
    const white = ctx.createBuffer(1, len, ctx.sampleRate), wd = white.getChannelData(0);
    for (let i = 0; i < len; i++) wd[i] = Math.random() * 2 - 1;

    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const src = ctx.createBufferSource();
    src.buffer = brown; src.loop = true;
    band = ctx.createBiquadFilter();
    band.type = 'bandpass'; band.frequency.value = 650; band.Q.value = 0.7;
    air = ctx.createGain(); air.gain.value = 0;
    src.connect(band); band.connect(air); air.connect(master);

    const hs = ctx.createBufferSource();
    hs.buffer = white; hs.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 2600;
    hiss = ctx.createGain(); hiss.gain.value = 0;
    hs.connect(hp); hp.connect(hiss); hiss.connect(master);

    pad = ctx.createGain(); pad.gain.value = 0;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 820;
    pad.connect(lp); lp.connect(master);
    [110, 164.81, 220, 277.18].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? 'sine' : 'triangle';
      o.frequency.value = f;
      o.detune.value = (i - 1.5) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.22 / (i + 1);
      o.connect(g); g.connect(pad);
      o.start();
    });
    src.start(); hs.start();
    return true;
  }

  return {
    get on() { return on; },
    async toggle(want) {
      const next = typeof want === 'boolean' ? want : !on;
      if (next && !ctx && !build()) return false;
      if (!ctx) return false;
      if (ctx.state === 'suspended') { try { await ctx.resume(); } catch (e) { return false; } }
      on = next;
      master.gain.setTargetAtTime(on ? 0.55 : 0, ctx.currentTime, 0.35);
      return on;
    },
    update(flow, value) {
      if (!ctx || !on) return;
      const t = ctx.currentTime, f = Math.min(1, Math.abs(flow) * 1.6);
      air.gain.setTargetAtTime(0.015 + 0.32 * f, t, 0.08);
      hiss.gain.setTargetAtTime(0.003 + 0.035 * f, t, 0.08);
      band.frequency.setTargetAtTime(flow > 0 ? 880 : 520, t, 0.25);
      pad.gain.setTargetAtTime(0.045 + 0.035 * Math.min(1, value), t, 0.6);
    },
  };
}
