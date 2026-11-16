// One breathing clock drives the wordmark, the header meter and the 3D lungs.
// Inhale 4 s, exhale 6 s. Holding (gate button, long-press on the lungs) pushes it to a deep breath.
const IN = 4, OUT = 6, CYCLE = IN + OUT;
const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);

export const breath = {
  value: 0.3,
  delta: 0,
  hold: 0,
  holding: false,
  label: 'tarik',
  t: 0,
  update(dt, reduced) {
    this.t += dt;
    const p = this.t % CYCLE;
    const auto = reduced ? 0.35 : p < IN ? ease(p / IN) : 1 - ease((p - IN) / OUT);
    const target = this.holding ? 1 : 0;
    this.hold += (target - this.hold) * (1 - Math.exp(-dt * (this.holding ? 1.5 : 2.4)));
    const v = auto + (1.3 - auto) * this.hold;
    this.delta = v - this.value;
    this.value = v;
    this.label = this.holding ? 'tahan' : reduced ? 'napas' : p < IN ? 'tarik' : 'hembus';
  },
};
