import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — MEMORY LAYOUT VISUALIZER
   Hover a cell to compute its address = Base + i × size
══════════════════════════════════════════════════════ */
function MemoryLayoutViz() {
  const [base, setBase] = useState(1000);
  const [sz,   setSz]   = useState(4);
  const [hov,  setHov]  = useState(null);
  const ARR = [10, 25, 13, 40, 7];

  return (
    <VizBox>
      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 64px', gap: 8, marginBottom: 14, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Base address</span>
        <input type="range" min={100} max={2000} step={100} value={base} onChange={e => setBase(+e.target.value)} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'right' }}>{base}</span>

        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>sizeof(type)</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {[1, 2, 4, 8].map(s => (
            <button key={s} onClick={() => setSz(s)} style={{ padding: '2px 10px', border: '1px solid', borderColor: sz === s ? 'var(--color-border-info)' : 'var(--color-border-tertiary)', background: sz === s ? 'var(--color-background-info)' : 'transparent', color: sz === s ? 'var(--color-text-info)' : 'var(--color-text-secondary)', borderRadius: 4, cursor: 'pointer', fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>{s}B</button>
          ))}
        </div>
        <span />
      </div>

      <div style={{ display: 'flex', gap: 0, justifyContent: 'center', marginBottom: 14, overflowX: 'auto' }}>
        {ARR.map((val, i) => {
          const addr = base + i * sz;
          const on   = hov === i;
          return (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 72, cursor: 'default' }}>
              <div style={{ width: 70, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? 'var(--color-background-info)' : 'var(--color-background-secondary)', border: `1px solid ${on ? 'var(--color-border-info)' : 'var(--color-border-secondary)'}`, borderRight: i < ARR.length - 1 ? 'none' : undefined, fontSize: 18, fontFamily: 'var(--font-mono)', fontWeight: 700, color: on ? 'var(--color-text-info)' : 'var(--color-text-primary)', transition: 'all 0.12s' }}>
                {val}
              </div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: on ? 'var(--color-text-info)' : 'var(--color-text-tertiary)', marginTop: 5 }}>arr[{i}]</div>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: on ? 'var(--color-text-info)' : 'var(--color-text-tertiary)', opacity: 0.75 }}>{addr}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.9 }}>
        {hov !== null ? (
          <div>
            <span style={{ color: '#9CDCFE' }}>Address[{hov}]</span>
            <span style={{ color: '#7A8599' }}> = </span>
            <span style={{ color: '#CE9178' }}>{base}</span>
            <span style={{ color: '#7A8599' }}> + </span>
            <span style={{ color: '#4EC9B0' }}>{hov}</span>
            <span style={{ color: '#7A8599' }}> × </span>
            <span style={{ color: '#DCDCAA' }}>{sz}</span>
            <span style={{ color: '#7A8599' }}> = </span>
            <span style={{ color: '#4EC9B0', fontWeight: 700 }}>{base + hov * sz}</span>
          </div>
        ) : (
          <span style={{ color: '#6A9955' }}>{'// Hover any cell above to compute its address'}</span>
        )}
        <div style={{ color: '#6A9955', marginTop: 2 }}>{'// General: Address[i] = BaseAddress + i × sizeof(element_type)'}</div>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — ROTATION REVERSAL ALGORITHM
   3-phase step-through: rev[0..d-1], rev[d..n-1], rev[all]
══════════════════════════════════════════════════════ */
function RotationViz() {
  const ORIG = [1, 2, 3, 4, 5, 6, 7];
  const [d,     setD]     = useState(3);
  const [phase, setPhase] = useState(0);
  const n = ORIG.length;

  const revSlice = (a, lo, hi) => {
    const b = [...a]; let l = lo, h = hi;
    while (l < h) { [b[l], b[h]] = [b[h], b[l]]; l++; h--; }
    return b;
  };

  const p0 = [...ORIG];
  const p1 = revSlice(p0, 0, d - 1);
  const p2 = revSlice(p1, d, n - 1);
  const p3 = revSlice(p2, 0, n - 1);
  const phases = [p0, p1, p2, p3];
  const cur = phases[phase];

  const hlColor = (i) => {
    if (phase === 1 && i < d)       return 'warning';
    if (phase === 2 && i >= d)      return 'warning';
    if (phase === 3)                 return 'success';
    return null;
  };

  const LABELS = [
    `Original  [1..${n}]  →  left rotate by d = ${d}`,
    `Phase 1: reverse arr[0 .. ${d - 1}]`,
    `Phase 2: reverse arr[${d} .. ${n - 1}]`,
    `Phase 3: reverse arr[0 .. ${n - 1}]  →  done! ✓`,
  ];

  return (
    <VizBox>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Rotate left by d =</span>
        <input type="range" min={1} max={n - 1} value={d} onChange={e => { setD(+e.target.value); setPhase(0); }} style={{ width: 100 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }}>{d}</span>
      </div>

      <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontWeight: 500 }}>
        {LABELS[phase]}
      </div>

      <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginBottom: 16 }}>
        {cur.map((val, i) => {
          const hl = hlColor(i);
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid', borderColor: hl ? `var(--color-border-${hl})` : 'var(--color-border-secondary)', background: hl ? `var(--color-background-${hl})` : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: hl ? `var(--color-text-${hl})` : 'var(--color-text-primary)', transition: 'all 0.2s' }}>
                {val}
              </div>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setPhase(Math.max(0, phase - 1))} disabled={phase === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: phase === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: phase === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 48, textAlign: 'center', alignSelf: 'center' }}>Phase {phase} / 3</span>
        <button onClick={() => setPhase(Math.min(3, phase + 1))} disabled={phase === 3} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: phase === 3 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: phase === 3 ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => { setPhase(0); }} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — KADANE'S ALGORITHM STEP-THROUGH
   Array: [-2,1,-3,4,-1,2,1,-5,4]  →  maxSum = 6
══════════════════════════════════════════════════════ */
const K_ARR = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

function buildKadaneSteps(arr) {
  const steps = [{ i: 0, maxEnding: arr[0], res: arr[0], action: 'init', desc: `Initialize: maxEnding = arr[0] = ${arr[0]},  res = ${arr[0]}` }];
  let me = arr[0], res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const ext = me + arr[i];
    const action = ext >= arr[i] ? 'extend' : 'reset';
    me  = Math.max(ext, arr[i]);
    res = Math.max(res, me);
    steps.push({ i, maxEnding: me, res, action,
      desc: action === 'extend'
        ? `maxEnding(${ext > 0 ? '+' : ''}${arr[i]}) = ${ext} ≥ arr[${i}] = ${arr[i]}  →  extend. maxEnding = ${me},  res = ${res}`
        : `maxEnding(${ext}) < arr[${i}] = ${arr[i]}  →  reset (start fresh). maxEnding = ${me},  res = ${res}` });
  }
  return steps;
}

const KADANE_STEPS = buildKadaneSteps(K_ARR);
const K_MAX_ABS    = Math.max(...K_ARR.map(Math.abs));

function KadaneStepper() {
  const [step, setStep] = useState(0);
  const s = KADANE_STEPS[step];

  return (
    <VizBox>
      <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', lineHeight: 1.55 }}>
        {s.desc}
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', justifyContent: 'center', height: 95, marginBottom: 14 }}>
        {K_ARR.map((val, i) => {
          const isCur  = i === s.i;
          const isPast = i < s.i;
          const h = Math.abs(val) / K_MAX_ABS * 68 + 10;
          const color = isCur ? 'info' : isPast ? (val >= 0 ? 'success' : 'danger') : null;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: isCur ? 'var(--color-text-info)' : 'var(--color-text-tertiary)', fontWeight: isCur ? 700 : 400 }}>{val}</div>
              <div style={{ width: 30, height: h, borderRadius: '3px 3px 0 0', background: color ? `var(--color-background-${color})` : 'var(--color-background-tertiary)', border: `1px solid ${color ? `var(--color-border-${color})` : 'var(--color-border-tertiary)'}`, transition: 'all 0.18s' }} />
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: isCur ? 'var(--color-text-info)' : 'var(--color-text-tertiary)' }}>[{i}]</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div style={{ background: s.action === 'reset' ? 'var(--color-background-warning)' : 'var(--color-background-info)', border: `0.5px solid ${s.action === 'reset' ? 'var(--color-border-warning)' : 'var(--color-border-info)'}`, borderRadius: 'var(--border-radius-md)', padding: '8px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: s.action === 'reset' ? 'var(--color-text-warning)' : 'var(--color-text-info)', marginBottom: 2 }}>maxEnding  {s.action === 'reset' ? '⟵ reset' : '⟵ extend'}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: s.action === 'reset' ? 'var(--color-text-warning)' : 'var(--color-text-info)' }}>{s.maxEnding}</div>
        </div>
        <div style={{ background: 'var(--color-background-success)', border: '0.5px solid var(--color-border-success)', borderRadius: 'var(--border-radius-md)', padding: '8px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-success)', marginBottom: 2 }}>Global maximum (res)</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-success)' }}>{s.res}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 64, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {KADANE_STEPS.length}</span>
        <button onClick={() => setStep(Math.min(KADANE_STEPS.length - 1, step + 1))} disabled={step === KADANE_STEPS.length - 1} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === KADANE_STEPS.length - 1 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === KADANE_STEPS.length - 1 ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 4 — MOORE'S VOTING DEMO
   Array: [3,3,4,2,4,4,2,4,4]  candidate = 4
══════════════════════════════════════════════════════ */
const MV_ARR = [3, 3, 4, 2, 4, 4, 2, 4, 4];

function buildMooreSteps(arr) {
  const steps = [];
  let cand = arr[0], cnt = 1;
  steps.push({ i: 0, cand, cnt, action: 'init', desc: `Initialize: candidate = ${arr[0]}, count = 1` });
  for (let i = 1; i < arr.length; i++) {
    if (cnt === 0) {
      cand = arr[i]; cnt = 1;
      steps.push({ i, cand, cnt, action: 'new', desc: `count = 0 → new candidate = arr[${i}] = ${arr[i]},  count = 1` });
    } else if (arr[i] === cand) {
      cnt++;
      steps.push({ i, cand, cnt, action: 'match', desc: `arr[${i}] = ${arr[i]} matches candidate ${cand} → count++  = ${cnt}` });
    } else {
      cnt--;
      steps.push({ i, cand, cnt, action: 'cancel', desc: `arr[${i}] = ${arr[i]} ≠ candidate ${cand} → count--  = ${cnt}` });
    }
  }
  return steps;
}

const MOORE_STEPS = buildMooreSteps(MV_ARR);

function MooreVotingDemo() {
  const [step, setStep] = useState(0);
  const s = MOORE_STEPS[step];

  const actionColor = { init: 'info', new: 'warning', match: 'success', cancel: 'danger' };

  return (
    <VizBox>
      <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', lineHeight: 1.55 }}>
        Phase 1 — {s.desc}
      </div>

      <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginBottom: 16 }}>
        {MV_ARR.map((val, i) => {
          const isCur  = i === s.i;
          const isPast = i < s.i;
          const color  = isCur ? actionColor[s.action] : isPast ? 'default' : null;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid', borderColor: color && color !== 'default' ? `var(--color-border-${color})` : isCur ? 'var(--color-border-info)' : isPast ? 'var(--color-border-tertiary)' : 'var(--color-border-secondary)', background: color && color !== 'default' ? `var(--color-background-${color})` : isPast ? 'var(--color-background-tertiary)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: isCur ? 700 : 400, color: color && color !== 'default' ? `var(--color-text-${color})` : isPast ? 'var(--color-text-tertiary)' : 'var(--color-text-secondary)', transition: 'all 0.15s' }}>
                {val}
              </div>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div style={{ background: 'var(--color-background-info)', border: '0.5px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', padding: '8px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-info)', marginBottom: 2 }}>Current candidate</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--color-text-info)' }}>{s.cand}</div>
        </div>
        <div style={{ background: s.cnt === 0 ? 'var(--color-background-warning)' : 'var(--color-background-success)', border: `0.5px solid ${s.cnt === 0 ? 'var(--color-border-warning)' : 'var(--color-border-success)'}`, borderRadius: 'var(--border-radius-md)', padding: '8px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: s.cnt === 0 ? 'var(--color-text-warning)' : 'var(--color-text-success)', marginBottom: 2 }}>Count {s.cnt === 0 ? '⚠ next resets' : ''}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: s.cnt === 0 ? 'var(--color-text-warning)' : 'var(--color-text-success)' }}>{s.cnt}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 64, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {MOORE_STEPS.length}</span>
        <button onClick={() => setStep(Math.min(MOORE_STEPS.length - 1, step + 1))} disabled={step === MOORE_STEPS.length - 1} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === MOORE_STEPS.length - 1 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === MOORE_STEPS.length - 1 ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 5 — PREFIX SUM BUILDER + RANGE QUERY
══════════════════════════════════════════════════════ */
function PrefixSumViz() {
  const ARR  = [2, 4, 1, 3, 5, 2, 7];
  const n    = ARR.length;
  const pref = ARR.reduce((acc, v, i) => [...acc, (acc[i - 1] || 0) + v], []);
  const [qL, setQL] = useState(1);
  const [qR, setQR] = useState(4);
  const [show, setShow] = useState(false);

  const result = qL === 0 ? pref[qR] : pref[qR] - pref[qL - 1];
  const inRange = (i) => i >= qL && i <= qR;

  return (
    <VizBox>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>ORIGINAL ARRAY arr[]</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {ARR.map((v, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: show && inRange(i) ? 'var(--color-border-info)' : 'var(--color-border-secondary)', background: show && inRange(i) ? 'var(--color-background-info)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: show && inRange(i) ? 700 : 400, color: show && inRange(i) ? 'var(--color-text-info)' : 'var(--color-text-primary)', transition: 'all 0.15s' }}>
                {v}
              </div>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>PREFIX SUM pref[i] = arr[0] + … + arr[i]</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {pref.map((v, i) => {
            const isR  = show && i === qR;
            const isLm = show && qL > 0 && i === qL - 1;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: isR ? 'var(--color-border-success)' : isLm ? 'var(--color-border-danger)' : 'var(--color-border-secondary)', background: isR ? 'var(--color-background-success)' : isLm ? 'var(--color-background-danger)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: isR || isLm ? 700 : 400, color: isR ? 'var(--color-text-success)' : isLm ? 'var(--color-text-danger)' : 'var(--color-text-secondary)', transition: 'all 0.15s' }}>
                  {v}
                </div>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>p[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {[['L', qL, setQL, 0, qR], ['R', qR, setQR, qL, n - 1]].map(([lbl, val, setter, mn, mx]) => (
          <div key={lbl}>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Query {lbl} = {val}</div>
            <input type="range" min={mn} max={mx} value={val} onChange={e => { setter(+e.target.value); setShow(false); }} style={{ width: '100%' }} />
          </div>
        ))}
      </div>

      <button onClick={() => setShow(!show)} style={{ width: '100%', padding: '7px', border: '1px solid var(--color-border-primary)', borderRadius: 'var(--border-radius-md)', background: show ? 'var(--color-background-secondary)' : 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12.5, fontFamily: 'var(--font-sans)', marginBottom: show ? 10 : 0 }}>
        {show ? 'Hide Computation' : `Compute  sum(${qL}, ${qR})  →  O(1) query`}
      </button>

      {show && (
        <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.9 }}>
          <div style={{ color: '#9CDCFE' }}>sum({qL}, {qR})</div>
          <div style={{ color: '#7A8599' }}>
            {qL === 0
              ? <>= pref[{qR}]  <span style={{ color: '#6A9955' }}>// L=0: no left subtraction needed</span></>
              : <>= pref[{qR}] − pref[{qL - 1}]</>}
          </div>
          <div>
            <span style={{ color: '#4EC9B0', fontWeight: 700 }}>{pref[qR]}</span>
            {qL > 0 && <><span style={{ color: '#7A8599' }}> − </span><span style={{ color: '#F44747', fontWeight: 700 }}>{pref[qL - 1]}</span></>}
            <span style={{ color: '#7A8599' }}> = </span>
            <span style={{ color: '#4EC9B0', fontWeight: 700, fontSize: 14 }}>{result}</span>
          </div>
          <div style={{ color: '#6A9955', marginTop: 2 }}>// O(1) lookup — no loop needed!</div>
        </div>
      )}
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   PROBLEM CARD — reused across the Problems tab
══════════════════════════════════════════════════════ */
const DIFF_CLR = { 'IIT OA': 'info', 'OA Easy': 'success', 'OA Medium': 'warning', 'OA Hard': 'danger', 'LC Medium': 'info', 'LC Hard': 'purple' };

function ProblemCard({ num, title, difficulty, tags = [], statement, constraints = [], examples = [], approach, code }) {
  const [open, setOpen] = useState(false);
  const dc = DIFF_CLR[difficulty] || 'info';
  return (
    <div style={{ border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', background: 'var(--color-background-secondary)', borderBottom: '1px solid var(--color-border-tertiary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--color-text-tertiary)', minWidth: 26 }}>Q{num}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text-primary)' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {tags.map(t => <span key={t} style={{ padding: '1px 7px', borderRadius: 12, fontSize: 10.5, background: 'var(--color-background-tertiary)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{t}</span>)}
          <span style={{ padding: '2px 9px', borderRadius: 12, fontSize: 10.5, fontWeight: 600, background: `var(--color-background-${dc})`, color: `var(--color-text-${dc})`, border: `1px solid var(--color-border-${dc})` }}>{difficulty}</span>
        </div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.72, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: statement }} />
        {constraints.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>Constraints</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {constraints.map((c, i) => <code key={i} style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11.5, background: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)', border: '0.5px solid var(--color-border-tertiary)', fontFamily: 'var(--font-mono)' }}>{c}</code>)}
            </div>
          </div>
        )}
        {examples.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            {examples.map((ex, i) => (
              <div key={i} style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', padding: '9px 12px', marginBottom: 6, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <div style={{ color: 'var(--color-text-tertiary)', fontSize: 10, marginBottom: 4, letterSpacing: '0.06em' }}>EXAMPLE {i + 1}</div>
                <div><span style={{ color: 'var(--color-text-success)' }}>Input: </span><span style={{ color: 'var(--color-text-secondary)' }}>{ex.input}</span></div>
                <div><span style={{ color: 'var(--color-text-info)' }}>Output: </span><span style={{ color: 'var(--color-text-secondary)' }}>{ex.output}</span></div>
                {ex.note && <div style={{ color: 'var(--color-text-tertiary)', fontSize: 11, marginTop: 3 }}>{ex.note}</div>}
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1px solid var(--color-border-primary)', borderRadius: 'var(--border-radius-md)', background: open ? 'var(--color-background-secondary)' : 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12.5, fontFamily: 'var(--font-sans)', transition: 'all 0.15s' }}>
          <i className={`ti ti-${open ? 'eye-off' : 'bulb'}`} />
          {open ? 'Hide Solution' : 'Show Approach & Solution'}
        </button>
        {open && (
          <div style={{ marginTop: 12 }}>
            <div style={{ background: 'var(--color-background-info)', border: '1px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', padding: '9px 13px', marginBottom: 10, fontSize: 13, color: 'var(--color-text-info)', lineHeight: 1.68 }}>
              <strong>Approach: </strong>{approach}
            </div>
            <Code>{code}</Code>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — FUNDAMENTALS & MEMORY MODEL
══════════════════════════════════════════════════════ */
function SectionFundamentals() {
  return (
    <div>
      <Note color="info" icon="ti-database">
        <strong>One-sentence definition:</strong> An array is a collection of elements of the <em>same data type</em> stored at <em>contiguous memory locations</em>, enabling O(1) random access via index arithmetic.
      </Note>

      <H2>Why Arrays? The Two Killer Properties</H2>
      <Grid cols={2}>
        <Card title="O(1) Random Access" color="success">
          Any element's address is computable in constant time from index alone — no traversal. This is the single most important property of arrays.
        </Card>
        <Card title="Cache Friendliness" color="info">
          Contiguous layout means the CPU pre-fetches adjacent elements into cache automatically. Accessing arr[i] often brings arr[i+1], arr[i+2], … into cache for free.
        </Card>
      </Grid>

      <H2>Memory Layout — Address Formula</H2>
      <P>Every array element's address is a direct arithmetic computation from the base address. This is why random access is O(1) — the CPU needs no search, just one multiply-and-add.</P>
      <MemoryLayoutViz />
      <Note color="success" icon="ti-math">
        <strong>Address[i] = BaseAddress + i × sizeof(element_type)</strong>. For a 32-bit int array at base 1000: arr[0]=1000, arr[1]=1004, arr[2]=1008, … Each step is exactly 4 bytes.
      </Note>

      <H2>Fixed-Size vs Dynamic-Size Arrays</H2>
      <Grid cols={2}>
        <Card title="Fixed-Size Array" color="warning">
          Size is set at declaration and cannot change. Allocated on the stack (small arrays) or heap (<code>new int[n]</code>). Fastest — no reallocation overhead.
        </Card>
        <Card title="Dynamic-Size Array" color="info">
          Automatically doubles its capacity when full (<em>amortized growth</em>). Standard in production: C++ <code>vector</code>, Java <code>ArrayList</code>, Python <code>list</code>. Amortized O(1) append.
        </Card>
      </Grid>
      <Table
        heads={["Language", "Type", "Resizable?", "Declaration"]}
        rows={[
          ["C++", "int arr[n]", "No (stack / heap)", "int arr[5] = {1,2,3,4,5}"],
          ["C++", "std::vector<int>", "Yes — doubles on overflow", "vector<int> v = {1,2,3}"],
          ["Java", "int[]", "No — fixed once created", "int[] arr = new int[5]"],
          ["Java", "ArrayList<Integer>", "Yes", "ArrayList<Integer> v = new ArrayList<>()"],
          ["Python", "list", "Yes — always dynamic", "arr = [1, 2, 3, 4, 5]"],
          ["Python", "array module", "No (typed, fixed)", "array.array('i', [1,2,3])"],
        ]}
      />
      <Note color="warning" icon="ti-alert-triangle">
        <strong>C++ VLA (Variable Length Arrays)</strong> like <code>int arr[n]</code> are a GCC extension — not standard C++. They're stack-allocated and cannot be returned from functions. Prefer <code>std::vector</code> for any production code requiring a dynamic size.
      </Note>

      <H2>Amortized O(1) Append — Why Doubling Works</H2>
      <P>When a dynamic array is full and needs to grow, it allocates a new array of <em>double</em> the current capacity and copies all elements. This sounds like O(n) per append — but amortized over n appends, the total copy cost is 1+2+4+…+n/2+n = 2n, giving <strong>O(1) amortized per append</strong>.</P>
      <Table
        heads={["Operation", "Best Case", "Worst Case", "Amortized"]}
        rows={[
          ["Access arr[i]", "O(1)", "O(1)", "O(1)"],
          ["Search (unsorted)", "O(1)", "O(n)", "O(n)"],
          ["Insert at end (dynamic)", "O(1)", "O(n) [realloc]", "O(1) amortized"],
          ["Insert at position p", "O(1) [at end]", "O(n) [at front]", "O(n)"],
          ["Delete at position p", "O(1) [at end]", "O(n) [at front]", "O(n)"],
          ["Append n elements total", "—", "—", "O(n) total"],
        ]}
      />

      <QA q="Why is random access O(1) but linked list access O(n)?" a="Arrays store elements contiguously — the CPU computes the exact byte address of any element in one step: <code>Base + i × size</code>. A linked list stores elements as nodes scattered in memory, each holding a pointer to the next. To reach node i, you must follow i pointers from the head — O(i) = O(n) in the worst case." />
      <QA q="What happens to array cache performance when elements are large structs?" a="Cache lines are typically 64 bytes. For small types (int = 4B), 16 elements fit per cache line — great spatial locality. For large structs (256B), each element spans 4 cache lines. Accessing elements sequentially still benefits from prefetching, but the benefit diminishes as struct size grows. Arrays of pointers (pointer chasing) are worst — each access may miss cache since the pointed-to data is scattered." />
      <QA q="In C++, when should you choose std::array over std::vector?" a="Use <code>std::array&lt;T, N&gt;</code> when the size is known at compile time and will never change (e.g., a 3D vector, a chess board). It's stack-allocated (faster), has zero overhead, and its size is part of the type. Use <code>std::vector</code> for any runtime-determined or variable-size data." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — STANDARD ARRAY OPERATIONS
══════════════════════════════════════════════════════ */
function SectionOperations() {
  return (
    <div>
      <H2>Linear Search &amp; Sorted Check</H2>
      <P>Two fundamental scans: linear search traverses until a match (O(n) worst), sorted check verifies the non-decreasing invariant in one pass.</P>
      <Code>{{cpp: `// Linear Search — returns index or -1
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++)
        if (arr[i] == key) return i;   // hit — early exit
    return -1;                          // miss
}

// Check Sorted — non-decreasing order
bool isSorted(int arr[], int n) {
    for (int i = 1; i < n; i++)
        if (arr[i] < arr[i - 1]) return false;
    return true;
}`, python: `def linear_search(arr, key):
    for i, v in enumerate(arr):
        if v == key: return i
    return -1

def is_sorted(arr):
    return all(arr[i] <= arr[i+1] for i in range(len(arr)-1))`}}</Code>

      <H2>Insert &amp; Delete at a Position</H2>
      <P>Both require <strong>shifting</strong> elements — the defining cost of array mutations in the middle. Insert at index <Mx>p</Mx>: shift elements rightward from <Mx>n-1</Mx> down to <Mx>p</Mx>, then place. Delete at index <Mx>p</Mx>: shift elements leftward from <Mx>p+1</Mx> onward.</P>
      <Code>{{cpp: `// Insert x at position p (0-indexed); arr has capacity >= n+1
void insert(int arr[], int &n, int x, int p) {
    for (int i = n - 1; i >= p; i--)
        arr[i + 1] = arr[i];    // shift right
    arr[p] = x;
    n++;
}

// Delete element at position p
void deleteAt(int arr[], int &n, int p) {
    for (int i = p; i < n - 1; i++)
        arr[i] = arr[i + 1];    // shift left (close gap)
    n--;
}`, python: `# Python list has built-in insert/pop — both O(n) for middle positions
def insert_at(arr, x, p):
    arr.insert(p, x)    # O(n) — shifts elements internally

def delete_at(arr, p):
    arr.pop(p)          # O(n) — shifts elements internally`}}</Code>
      <Table
        heads={["Insertion position", "Shift cost", "Complexity"]}
        rows={[
          ["At end (append)", "0 shifts", "O(1) — best case"],
          ["At middle", "n/2 shifts (avg)", "O(n) — average case"],
          ["At front (index 0)", "n shifts", "Θ(n) — worst case"],
        ]}
      />

      <H2>In-Place Reversal — Θ(n) Time, O(1) Space</H2>
      <P>Two-pointer swap from boundaries inward. Both pointers advance simultaneously — <Mx>n/2</Mx> swaps total.</P>
      <Code>{{cpp: `void reverse(int arr[], int n) {
    int low = 0, high = n - 1;
    while (low < high) {
        swap(arr[low], arr[high]);   // std::swap or manual temp
        low++;
        high--;
    }
}

// Subarray reversal: same logic on [lo..hi]
void reverseRange(int arr[], int lo, int hi) {
    while (lo < hi) { swap(arr[lo++], arr[hi--]); }
}`, python: `def reverse_inplace(arr):
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        arr[lo], arr[hi] = arr[hi], arr[lo]
        lo += 1; hi -= 1

# Pythonic one-liner (creates new list — not truly in-place):
arr[:] = arr[::-1]   # O(n) time and O(n) space`}}</Code>

      <H2>Remove Duplicates from a Sorted Array — O(n), O(1)</H2>
      <P>The <strong>slow-fast pointer</strong> technique: <Mx>res</Mx> tracks the write position (slow pointer). <Mx>i</Mx> scans forward (fast pointer). Only copy when a new distinct value is found.</P>
      <Code>{{cpp: `// Overwrites arr in-place; returns count of distinct elements
int removeDuplicates(int arr[], int n) {
    if (n == 0) return 0;
    int res = 1;                          // first element always kept
    for (int i = 1; i < n; i++) {
        if (arr[i] != arr[res - 1]) {    // found new distinct value
            arr[res] = arr[i];
            res++;
        }
    }
    return res;                           // new logical size
}
// [1,1,2,3,3,4] → [1,2,3,4]  returns 4`, python: `def remove_duplicates(arr):
    # In-place for sorted array
    if not arr: return 0
    res = 1
    for i in range(1, len(arr)):
        if arr[i] != arr[res - 1]:
            arr[res] = arr[i]
            res += 1
    return res

# Or Pythonic (creates new list): arr = list(dict.fromkeys(arr))`}}</Code>

      <H2>Left Rotation — The Reversal Algorithm</H2>
      <P>To left rotate by <Mx>d</Mx> positions, apply three partial reversals. This avoids the naive O(d × n) approach or the O(n) space temporary-array approach.</P>
      <RotationViz />
      <Code>{{cpp: `void reverseRange(int arr[], int lo, int hi) {
    while (lo < hi) swap(arr[lo++], arr[hi--]);
}

// Left rotate arr[0..n-1] by d positions — O(n) time, O(1) space
void leftRotate(int arr[], int n, int d) {
    d = d % n;                   // handle d >= n
    reverseRange(arr, 0, d - 1); // Phase 1: reverse the first chunk
    reverseRange(arr, d, n - 1); // Phase 2: reverse the rest
    reverseRange(arr, 0, n - 1); // Phase 3: reverse entire array
}
// [1,2,3,4,5,6,7], d=3 → [4,5,6,7,1,2,3]`, python: `def left_rotate(arr, d):
    n = len(arr)
    d %= n

    def rev(lo, hi):
        while lo < hi:
            arr[lo], arr[hi] = arr[hi], arr[lo]
            lo += 1; hi -= 1

    rev(0, d - 1)   # reverse first chunk
    rev(d, n - 1)   # reverse rest
    rev(0, n - 1)   # reverse all  → rotated

# Pythonic: arr = arr[d:] + arr[:d]  — O(n) time but O(n) space`}}</Code>
      <Table
        heads={["Approach", "Time", "Space", "Notes"]}
        rows={[
          ["One-by-one (d passes)", "O(d × n)", "O(1)", "Simple but slow for large d"],
          ["Temporary array", "O(n)", "O(n)", "Easy to code, wastes memory"],
          ["Juggling algorithm", "O(n)", "O(1)", "Complex; requires GCD of d and n"],
          ["Reversal algorithm ✓", "O(n)", "O(1)", "Optimal — 3 simple passes, easiest to remember"],
        ]}
      />

      <QA q="Why is insert at the front of an array O(n) while push_front on a deque is O(1)?" a="Arrays are contiguous — inserting at index 0 requires shifting all n existing elements one position right, taking O(n). A deque (double-ended queue) maintains two separate buffer halves or a segmented array, so front insertions can be placed in pre-allocated space without shifting. The deque trades some memory overhead and cache efficiency for O(1) front operations." />
      <QA q="The reversal algorithm does 3 reversal passes — why is it O(n) and not O(3n)?" a="Each pass reverses a different segment, and the total elements touched across all three passes = d + (n−d) + n = 2n. Since O(2n) = O(n) by constant-factor rules, the algorithm is linear. This is a common pattern: multiple passes with bounded total work per element." />
      <QA q="Why does removeDuplicates work correctly on sorted (but not unsorted) arrays?" a="In a sorted array, all duplicate occurrences of any value are adjacent. The slow-fast pointer skips consecutive duplicates by comparing <code>arr[i]</code> against <code>arr[res-1]</code> (the last written distinct value). In an unsorted array, a value might appear at non-adjacent positions — this comparison wouldn't catch them. For unsorted arrays, use a hash set: O(n) time, O(n) space." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — OPTIMIZATION PATTERNS
══════════════════════════════════════════════════════ */
function SectionPatterns() {
  return (
    <div>
      <H2>Leaders in an Array</H2>
      <P>Element <Mx>arr[i]</Mx> is a <strong>leader</strong> if it is strictly greater than all elements to its right. The last element is always a leader. Key insight: scan right-to-left, maintaining a running maximum.</P>
      <Code>{{cpp: `vector<int> leaders(int arr[], int n) {
    vector<int> res;
    int maxRight = arr[n - 1];
    res.push_back(maxRight);              // last element is always a leader
    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] > maxRight) {
            maxRight = arr[i];
            res.push_back(arr[i]);
        }
    }
    reverse(res.begin(), res.end());      // restore left-to-right order
    return res;
}
// [16, 17, 4, 3, 5, 2] → leaders: [17, 5, 2]  (right-to-left: 2, 5, 17)`, python: `def leaders(arr):
    res, max_right = [], arr[-1]
    res.append(max_right)
    for v in reversed(arr[:-1]):
        if v > max_right:
            max_right = v
            res.append(v)
    return list(reversed(res))
# [16,17,4,3,5,2] → [17, 5, 2]`}}</Code>

      <H2>Maximum Difference — Track Minimum From the Left</H2>
      <P>Maximize <Mx>arr[j] − arr[i]</Mx> subject to <Mx>j &gt; i</Mx>. The brute-force O(n²) tries all pairs. The O(n) insight: for each <Mx>j</Mx>, the best <Mx>i</Mx> is the minimum seen so far to the left.</P>
      <Code>{{cpp: `int maxDiff(int arr[], int n) {
    int res    = arr[1] - arr[0];    // smallest valid diff (may be negative)
    int minVal = arr[0];             // minimum element seen so far
    for (int j = 1; j < n; j++) {
        res    = max(res, arr[j] - minVal);
        minVal = min(minVal, arr[j]);
    }
    return res;
}
// [2, 3, 10, 6, 4, 8, 1] → 8  (arr[2]=10, arr[0]=2 → diff 8)`, python: `def max_diff(arr):
    res = arr[1] - arr[0]
    min_val = arr[0]
    for v in arr[1:]:
        res = max(res, v - min_val)
        min_val = min(min_val, v)
    return res`}}</Code>
      <Note color="warning" icon="ti-alert-triangle">
        Update <code>res</code> BEFORE updating <code>minVal</code>. If you update <code>minVal</code> first with <code>arr[j]</code> and then compute <code>arr[j] - minVal</code>, you get 0 (same element) rather than the best left-minimum difference.
      </Note>

      <H2>Stock Buy &amp; Sell — Maximum Single Transaction Profit</H2>
      <P>The same min-tracking idea as max difference: scan left to right, tracking the lowest buying price seen. At each day, compute profit if you sold today. Equivalent to the maximum difference problem.</P>
      <Code>{{cpp: `int maxProfit(vector<int>& prices) {
    int minPrice = prices[0], maxP = 0;
    for (int p : prices) {
        maxP     = max(maxP, p - minPrice);   // profit if sell today
        minPrice = min(minPrice, p);           // update cheapest buy
    }
    return maxP;
}`, python: `def max_profit(prices):
    min_price, max_p = prices[0], 0
    for p in prices:
        max_p = max(max_p, p - min_price)
        min_price = min(min_price, p)
    return max_p`}}</Code>

      <H2>Trapping Rain Water — O(n) Prefix/Suffix Max</H2>
      <P>Water above bar <Mx>i</Mx> = <Mx>min(lmax[i], rmax[i]) − arr[i]</Mx>. Precompute both max arrays in O(n) to avoid the O(n²) nested scan. The naïve approach for each bar asks "what's the tallest bar to my left? right?" — answering that in O(1) per bar requires precomputation.</P>
      <Code>{{cpp: `int trapWater(int arr[], int n) {
    vector<int> lmax(n), rmax(n);
    lmax[0] = arr[0];
    for (int i = 1; i < n; i++)
        lmax[i] = max(lmax[i - 1], arr[i]);   // tallest so far from left
    rmax[n - 1] = arr[n - 1];
    for (int i = n - 2; i >= 0; i--)
        rmax[i] = max(rmax[i + 1], arr[i]);   // tallest so far from right

    int water = 0;
    for (int i = 1; i < n - 1; i++)           // first and last bars hold no water
        water += min(lmax[i], rmax[i]) - arr[i];
    return water;
}
// [3,0,2,0,4] → water=7  |  [0,1,0,2,1,0,1,3,2,1,2,1] → water=6`, python: `def trap_water(arr):
    n = len(arr)
    lmax = [0] * n; rmax = [0] * n
    lmax[0] = arr[0]
    for i in range(1, n): lmax[i] = max(lmax[i-1], arr[i])
    rmax[-1] = arr[-1]
    for i in range(n-2, -1, -1): rmax[i] = max(rmax[i+1], arr[i])
    return sum(min(lmax[i], rmax[i]) - arr[i] for i in range(1, n-1))`}}</Code>

      <H2>Maximum Consecutive 1s</H2>
      <P>Single-pass with a running counter. Reset to 0 on encountering 0. Track the global maximum. Classic warm-up for sliding window thinking.</P>
      <Code>{{cpp: `int maxConsecutiveOnes(int arr[], int n) {
    int res = 0, count = 0;
    for (int i = 0; i < n; i++) {
        count = arr[i] == 1 ? count + 1 : 0;
        res   = max(res, count);
    }
    return res;
}`, python: `def max_consecutive_ones(arr):
    res = count = 0
    for v in arr:
        count = count + 1 if v == 1 else 0
        res = max(res, count)
    return res`}}</Code>

      <H2>Kadane's Algorithm — Maximum Subarray Sum</H2>
      <P>Track two quantities: <Mx>maxEnding</Mx> (best sum ending at current index) and <Mx>res</Mx> (global best). At each element: either <strong>extend</strong> the previous subarray (if it helps) or <strong>reset</strong> and start fresh from the current element.</P>
      <KadaneStepper />
      <Code>{{cpp: `int maxSubarraySum(int arr[], int n) {
    int maxEnding = arr[0];
    int res       = arr[0];
    for (int i = 1; i < n; i++) {
        // Extend previous subarray OR start fresh from arr[i]
        maxEnding = max(maxEnding + arr[i], arr[i]);
        res       = max(res, maxEnding);
    }
    return res;
}
// [-2,1,-3,4,-1,2,1,-5,4] → 6  (subarray [4,-1,2,1])`, python: `def max_subarray_sum(arr):
    max_ending = res = arr[0]
    for v in arr[1:]:
        max_ending = max(max_ending + v, v)
        res = max(res, max_ending)
    return res`}}</Code>
      <Note color="success" icon="ti-bulb">
        <strong>Key insight:</strong> <code>max(maxEnding + arr[i], arr[i])</code> is equivalent to: "if the previous running sum is negative, discard it — a negative prefix only hurts. Start fresh." If <code>maxEnding</code> was positive, extending helps; if negative, reset.
      </Note>

      <H2>Maximum Circular Subarray Sum</H2>
      <P>The maximum subarray in a circular array wraps around either: (Case 1) it's a normal non-wrapping subarray → use Kadane's. (Case 2) it wraps around → it's everything <em>except</em> the minimum subarray in the middle → <Mx>totalSum − minSubarraySum</Mx>.</P>
      <Code>{{cpp: `int maxCircularSum(int arr[], int n) {
    // Case 1: normal max subarray (Kadane's)
    int maxSum = arr[0], maxEnd = arr[0];
    // Case 2: total_sum - min_subarray_sum
    int minSum = arr[0], minEnd = arr[0];
    int totalSum = arr[0];

    for (int i = 1; i < n; i++) {
        maxEnd   = max(maxEnd + arr[i], arr[i]);
        maxSum   = max(maxSum, maxEnd);
        minEnd   = min(minEnd + arr[i], arr[i]);
        minSum   = min(minSum, minEnd);
        totalSum += arr[i];
    }
    // Edge case: if all elements are negative, circular wrapping = 0 (empty), skip
    if (maxSum < 0) return maxSum;          // all negatives → Case 1 only
    return max(maxSum, totalSum - minSum);  // pick the better of both cases
}
// [8,-8,9,-9,10,-11,12] → 22  (wrapping: 12+8=20? no… see trace)`, python: `def max_circular_sum(arr):
    max_sum = max_end = arr[0]
    min_sum = min_end = arr[0]
    total = arr[0]
    for v in arr[1:]:
        max_end = max(max_end + v, v)
        max_sum = max(max_sum, max_end)
        min_end = min(min_end + v, v)
        min_sum = min(min_sum, min_end)
        total += v
    return max_sum if max_sum < 0 else max(max_sum, total - min_sum)`}}</Code>

      <H2>Majority Element — Moore's Voting Algorithm</H2>
      <P>Find the element appearing more than ⌊n/2⌋ times. The algorithm works in two O(n) phases. Phase 1 finds a <em>candidate</em> through cancellation; Phase 2 verifies it. Interactive demo below uses arr = [3,3,4,2,4,4,2,4,4], majority = 4.</P>
      <MooreVotingDemo />
      <Code>{{cpp: `int majorityElement(int arr[], int n) {
    // ── Phase 1: Find candidate via cancellation ──
    int candidate = arr[0], count = 1;
    for (int i = 1; i < n; i++) {
        if (count == 0) { candidate = arr[i]; count = 1; }
        else if (arr[i] == candidate) count++;
        else count--;
    }
    // ── Phase 2: Verify candidate (mandatory if majority not guaranteed) ──
    count = 0;
    for (int x : vector<int>(arr, arr + n))
        if (x == candidate) count++;
    return count > n / 2 ? candidate : -1;  // -1 if no majority exists
}`, python: `def majority_element(arr):
    n = len(arr)
    # Phase 1: find candidate
    cand, cnt = arr[0], 1
    for v in arr[1:]:
        if cnt == 0: cand, cnt = v, 1
        elif v == cand: cnt += 1
        else: cnt -= 1
    # Phase 2: verify
    return cand if arr.count(cand) > n // 2 else -1`}}</Code>
      <Note color="warning" icon="ti-info-circle">
        <strong>Phase 2 is mandatory</strong> when a majority element is not guaranteed to exist. Phase 1 always produces <em>a</em> candidate but that candidate may not be the majority. Example: [1,2,3] — candidate could be 3, but no majority exists.
      </Note>

      <H2>Minimum Group Flips to Unify an Array</H2>
      <P>Given a binary array, find the minimum number of contiguous groups that need to be flipped to make all elements identical. The answer is min(count of 0→1 transitions, count of 1→0 transitions), which equals the minimum of the number of 0-runs or 1-runs.</P>
      <Code>{{cpp: `int minFlips(int arr[], int n) {
    int zeroGroups = 0, oneGroups = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == 0 && (i == 0 || arr[i-1] == 1)) zeroGroups++;
        if (arr[i] == 1 && (i == 0 || arr[i-1] == 0)) oneGroups++;
    }
    return min(zeroGroups, oneGroups);
}
// [1,1,0,0,0,1,0,1,1] → 2 flips (flip the 0-groups)`, python: `def min_flips(arr):
    zero_g = sum(1 for i in range(len(arr)) if arr[i] == 0 and (i == 0 or arr[i-1] == 1))
    one_g  = sum(1 for i in range(len(arr)) if arr[i] == 1 and (i == 0 or arr[i-1] == 0))
    return min(zero_g, one_g)`}}</Code>

      <QA q="Why can Kadane's algorithm handle all-negative arrays correctly?" a="Because it initializes <code>maxEnding = res = arr[0]</code> rather than 0. If all elements are negative, the 'reset' branch (<code>max(maxEnding + arr[i], arr[i])</code>) keeps picking the least-negative single element. The result is the maximum (least negative) element, not 0. Initializing with 0 would incorrectly imply the empty subarray is valid when the problem requires at least one element." />
      <QA q="In Moore's Voting, why does the cancellation produce the majority candidate?" a="Imagine every pair of distinct elements cancels out. If element x has count > n/2, it outnumbers all other elements combined. So even after cancelling every non-x element with one x, at least one x remains. The candidate after Phase 1 is the element that 'survived' cancellation. This doesn't prove it IS the majority — Phase 2 confirms this." />
      <QA q="When does the circular subarray case reduce to exactly the non-circular Kadane's result?" a="When the all-negative edge case applies: if maxSum &lt; 0, it means all elements are negative. The circular wrapping formula <code>total - minSum</code> would give 0 (since minSum = total in that case), but an empty subarray violates the 'at least one element' constraint. So we fall back to Kadane's result (the single least-negative element)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — SLIDING WINDOW & PREFIX SUM
══════════════════════════════════════════════════════ */
function SectionWindows() {
  return (
    <div>
      <H2>Fixed Sliding Window — Max Sum of k Consecutive Elements</H2>
      <P>Instead of recomputing the sum of each window from scratch (O(n × k)), slide the window by <strong>subtracting the element leaving the left</strong> and <strong>adding the element entering the right</strong> — O(1) per slide.</P>
      <Code>{{cpp: `int maxSumWindow(int arr[], int n, int k) {
    // Initialize first window
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];

    int maxSum = windowSum;
    // Slide: subtract left element, add right element
    for (int i = k; i < n; i++) {
        windowSum += arr[i] - arr[i - k];   // O(1) update per slide
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}
// [2,3,1,2,4,3], k=3 → 9  (window [2,4,3])`, python: `def max_sum_window(arr, k):
    win_sum = sum(arr[:k])
    max_sum = win_sum
    for i in range(k, len(arr)):
        win_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, win_sum)
    return max_sum`}}</Code>
      <Note color="success" icon="ti-bulb">
        <strong>Pattern:</strong> Fixed window slides by removing <code>arr[i - k]</code> and adding <code>arr[i]</code>. For variable-size windows (target sum), the window expands from the right and contracts from the left — see below.
      </Note>

      <H2>Variable Sliding Window — Subarray with Given Sum (Non-negative)</H2>
      <P>For non-negative arrays, maintain two pointers <Mx>start</Mx> and <Mx>e</Mx>. Expand right to increase sum; shrink left when sum exceeds target. This works because all values are non-negative — shrinking left never accidentally increases the sum.</P>
      <Code>{{cpp: `bool subarrayWithSum(int arr[], int n, int target) {
    int currSum = arr[0], start = 0;
    for (int e = 1; e < n; e++) {
        // Shrink from left while sum exceeds target
        while (currSum > target && start < e - 1) {
            currSum -= arr[start];
            start++;
        }
        if (currSum == target) return true;
        currSum += arr[e];   // expand right
    }
    return (currSum == target);
}
// Time: O(n) — each element added/removed at most once`, python: `def subarray_with_sum(arr, target):
    curr, start = arr[0], 0
    for e in range(1, len(arr)):
        while curr > target and start < e - 1:
            curr -= arr[start]; start += 1
        if curr == target: return True
        curr += arr[e]
    return curr == target`}}</Code>
      <Note color="warning" icon="ti-alert-triangle">
        The variable-window approach only works when array elements are <strong>non-negative</strong>. For arrays with negative numbers (e.g., "count subarrays summing to k"), you must use the <strong>prefix sum + hash map</strong> approach, which runs in O(n) time and O(n) space.
      </Note>

      <H2>Prefix Sum Array — O(1) Range Sum Queries</H2>
      <P>Precompute <Mx>pref[i] = arr[0] + arr[1] + … + arr[i]</Mx> in O(n). Any range sum query <Mx>sum(l, r)</Mx> is then answered in O(1) without re-scanning the array.</P>
      <PrefixSumViz />
      <Code>{{cpp: `// Build prefix sum
vector<int> buildPrefix(int arr[], int n) {
    vector<int> pref(n);
    pref[0] = arr[0];
    for (int i = 1; i < n; i++)
        pref[i] = pref[i - 1] + arr[i];
    return pref;
}

// O(1) range query
int rangeSum(vector<int>& pref, int l, int r) {
    return l == 0 ? pref[r] : pref[r] - pref[l - 1];
}
// sum(2, 5) = pref[5] - pref[1]  (O(1) lookup)`, python: `def build_prefix(arr):
    pref = [0] * len(arr)
    pref[0] = arr[0]
    for i in range(1, len(arr)):
        pref[i] = pref[i-1] + arr[i]
    return pref

def range_sum(pref, l, r):
    return pref[r] if l == 0 else pref[r] - pref[l-1]`}}</Code>

      <H2>Equilibrium Point</H2>
      <P>Index <Mx>i</Mx> is an equilibrium point if the sum of elements before it equals the sum of elements after it. Precompute total sum, then scan: <Mx>leftSum + arr[i] + rightSum = total</Mx>, so at each step check <Mx>leftSum == total − leftSum − arr[i]</Mx>.</P>
      <Code>{{cpp: `int equilibriumIndex(int arr[], int n) {
    int total = 0;
    for (int i = 0; i < n; i++) total += arr[i];
    int leftSum = 0;
    for (int i = 0; i < n; i++) {
        // right sum = total - leftSum - arr[i]
        if (leftSum == total - leftSum - arr[i]) return i;
        leftSum += arr[i];
    }
    return -1;
}
// [1,7,3,6,5,6] → index 3 (leftSum=11, rightSum=11)`, python: `def equilibrium_index(arr):
    total = sum(arr); left = 0
    for i, v in enumerate(arr):
        if left == total - left - v: return i
        left += v
    return -1`}}</Code>

      <H2>Range Frequency Mapping (Difference Array)</H2>
      <P>Given <Mx>q</Mx> range updates <Mx>[L_i, R_i]</Mx> (increment everything in that range by 1), compute the value at every position after all updates. The naive approach is O(q × n); the <strong>difference array</strong> trick solves it in O(q + n).</P>
      <Note color="info" icon="ti-bulb">
        <strong>The trick:</strong> For each range [L, R], set <code>arr[L]++</code> and <code>arr[R+1]--</code>. Then compute the prefix sum — each position's prefix sum equals its final frequency. This defers all work to one final O(n) pass.
      </Note>
      <Code>{{cpp: `// Apply q range increments, find max frequency position
int maxFrequencyPoint(vector<pair<int,int>>& ranges, int n) {
    vector<int> diff(n + 1, 0);
    for (auto [L, R] : ranges) {
        diff[L]++;            // range start: increment
        diff[R + 1]--;        // range end+1: decrement
    }
    // Prefix sum gives the frequency at each position
    int maxFreq = 0, maxPos = 0, curr = 0;
    for (int i = 0; i < n; i++) {
        curr += diff[i];
        if (curr > maxFreq) { maxFreq = curr; maxPos = i; }
    }
    return maxPos;
}`, python: `def max_frequency_point(ranges, n):
    diff = [0] * (n + 1)
    for l, r in ranges:
        diff[l] += 1
        diff[r + 1] -= 1
    max_freq = curr = max_pos = 0
    for i in range(n):
        curr += diff[i]
        if curr > max_freq: max_freq, max_pos = curr, i
    return max_pos`}}</Code>

      <QA q="Why does the variable sliding window require non-negative elements? What breaks for negatives?" a="The variable window contract-left step assumes that shrinking the window always reduces the sum. This is only true when all elements ≥ 0. With negatives: removing arr[start] might increase the sum (if arr[start] is negative). So we'd never know when to stop shrinking. For arrays with negatives, prefix sum + hashmap gives O(n) sum = k counting: store <code>prefSum → count</code> and lookup <code>prefSum - k</code> at each step." />
      <QA q="What is the space trade-off of prefix sum arrays?" a="Prefix sum uses O(n) extra space to enable O(1) per query. For m queries on a static array, total work is O(n + m) vs O(nm) without preprocessing. If queries are online (interleaved with updates), prefix sums must be rebuilt after each update — O(n) per update. For dynamic arrays with updates, Fenwick trees (BIT) give O(log n) both update and query in O(n) space." />
      <QA q="In the difference array technique, why do we decrement at R+1 rather than R?" a="The increment at L means 'this range starts contributing here.' Decrementing at R+1 means 'this range stops contributing after position R.' When we compute the prefix sum, positions 0..L-1 see 0 contribution from this range; positions L..R see +1; positions R+1..n-1 see 0 again. Decrementing at R would cause position R itself to cancel its own increment." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — PROBLEMS (6 interview problems)
══════════════════════════════════════════════════════ */
function SectionProblems() {
  return (
    <div>
      <Note color="purple" icon="ti-tournament">
        6 high-frequency interview problems covering every core array pattern. All appear in FAANG/product company OAs and onsite rounds. Attempt independently before revealing solutions.
      </Note>

      <ProblemCard
        num={1}
        title="Maximum Subarray Sum (Kadane's)"
        difficulty="OA Medium"
        tags={["Kadane's", "LC 53"]}
        statement="Given an integer array <code>nums</code>, find the contiguous subarray with the largest sum and return that sum. The subarray must contain <strong>at least one element</strong>."
        constraints={["1 ≤ n ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴", "Must work for all-negative arrays"]}
        examples={[
          { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6", note: "Subarray [4,-1,2,1] = 6" },
          { input: "[-1,-2,-3]",               output: "-1", note: "All negative → best single element" },
        ]}
        approach="Kadane's: track maxEnding (best sum ending here) and res (global best). At each element, either extend the previous subarray or restart fresh. Key: initialize both to arr[0] (not 0) to correctly handle all-negative arrays. Time O(n), Space O(1)."
        code={{cpp: `int maxSubArray(vector<int>& nums) {
    int maxEnd = nums[0], res = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        maxEnd = max(maxEnd + nums[i], nums[i]);
        res    = max(res, maxEnd);
    }
    return res;
}

// Follow-up: also return the subarray indices
pair<int,int> maxSubarrayIndices(vector<int>& nums) {
    int maxEnd = nums[0], res = nums[0];
    int start = 0, end = 0, tempStart = 0;
    for (int i = 1; i < (int)nums.size(); i++) {
        if (maxEnd + nums[i] < nums[i]) {
            maxEnd = nums[i]; tempStart = i;
        } else maxEnd += nums[i];
        if (maxEnd > res) { res = maxEnd; start = tempStart; end = i; }
    }
    return {start, end};
}`, python: `def max_subarray(nums):
    max_end = res = nums[0]
    for v in nums[1:]:
        max_end = max(max_end + v, v)
        res = max(res, max_end)
    return res

# With indices
def max_subarray_with_indices(nums):
    max_end = res = nums[0]
    start = end = temp_start = 0
    for i in range(1, len(nums)):
        if max_end + nums[i] < nums[i]:
            max_end, temp_start = nums[i], i
        else:
            max_end += nums[i]
        if max_end > res:
            res, start, end = max_end, temp_start, i
    return res, start, end`}}
      />

      <ProblemCard
        num={2}
        title="Best Time to Buy and Sell Stock"
        difficulty="OA Easy"
        tags={["Min Tracking", "LC 121"]}
        statement="Given an array <code>prices</code> where <code>prices[i]</code> is the stock price on day <code>i</code>, find the <strong>maximum profit</strong> from a single buy-then-sell transaction. You must buy before you sell. Return 0 if no profit is possible."
        constraints={["1 ≤ n ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴", "Single transaction only"]}
        examples={[
          { input: "[7,1,5,3,6,4]", output: "5", note: "Buy day 2 (price=1), sell day 5 (price=6)" },
          { input: "[7,6,4,3,1]",   output: "0", note: "Strictly decreasing — no profitable trade" },
        ]}
        approach="Track the minimum price seen so far. At each day, compute profit if selling today (price - minPrice). Track the maximum such profit. This is equivalent to maxDiff(j>i). One pass, O(n) time, O(1) space. The key: never sell before buying (j > i is enforced by updating minPrice AFTER the profit check)."
        code={{cpp: `int maxProfit(vector<int>& prices) {
    int minPrice = prices[0], maxP = 0;
    for (int p : prices) {
        maxP     = max(maxP, p - minPrice);  // best profit if sell today
        minPrice = min(minPrice, p);          // cheapest buy seen so far
    }
    return maxP;
}
// [7,1,5,3,6,4] → 5  (buy 1, sell 6)
// Note: update minPrice AFTER profit check so we never "sell before buy"`, python: `def max_profit(prices):
    min_p, max_p = prices[0], 0
    for p in prices:
        max_p = max(max_p, p - min_p)
        min_p = min(min_p, p)
    return max_p`}}
      />

      <ProblemCard
        num={3}
        title="Trapping Rain Water"
        difficulty="LC Hard"
        tags={["Two Arrays", "LC 42"]}
        statement="Given <code>n</code> non-negative integers representing bar heights, compute how much water can be trapped after it rains. Water fills every depression to the level of its surrounding tallest bars."
        constraints={["1 ≤ n ≤ 3×10⁴", "0 ≤ height[i] ≤ 10⁵"]}
        examples={[
          { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
          { input: "[4,2,0,3,2,5]",               output: "9" },
        ]}
        approach="Water above bar i = min(lmax[i], rmax[i]) - height[i]. Precompute lmax[] (running max from left) and rmax[] (running max from right) in two O(n) passes. Then sum water per bar in a third pass. Total: O(n) time, O(n) space. For O(1) space, use the two-pointer approach (shown below)."
        code={{cpp: `// O(n) space — prefix/suffix max arrays
int trap(vector<int>& h) {
    int n = h.size();
    vector<int> lmax(n), rmax(n);
    lmax[0] = h[0];
    for (int i = 1; i < n; i++)     lmax[i] = max(lmax[i-1], h[i]);
    rmax[n-1] = h[n-1];
    for (int i = n-2; i >= 0; i--)  rmax[i] = max(rmax[i+1], h[i]);

    int water = 0;
    for (int i = 1; i < n-1; i++)
        water += min(lmax[i], rmax[i]) - h[i];
    return water;
}

// O(1) space — two-pointer (no precomputed arrays needed)
int trapTwoPointer(vector<int>& h) {
    int lo = 0, hi = h.size()-1, lmax = 0, rmax = 0, water = 0;
    while (lo < hi) {
        if (h[lo] <= h[hi]) {
            if (h[lo] >= lmax) lmax = h[lo];
            else water += lmax - h[lo];
            lo++;
        } else {
            if (h[hi] >= rmax) rmax = h[hi];
            else water += rmax - h[hi];
            hi--;
        }
    }
    return water;
}`, python: `def trap(h):
    n = len(h)
    lmax = [0]*n; rmax = [0]*n
    lmax[0] = h[0]
    for i in range(1, n): lmax[i] = max(lmax[i-1], h[i])
    rmax[-1] = h[-1]
    for i in range(n-2, -1, -1): rmax[i] = max(rmax[i+1], h[i])
    return sum(min(lmax[i], rmax[i]) - h[i] for i in range(1, n-1))

def trap_two_pointer(h):
    lo, hi, lmax, rmax, water = 0, len(h)-1, 0, 0, 0
    while lo < hi:
        if h[lo] <= h[hi]:
            lmax = max(lmax, h[lo]); water += lmax - h[lo]; lo += 1
        else:
            rmax = max(rmax, h[hi]); water += rmax - h[hi]; hi -= 1
    return water`}}
      />

      <ProblemCard
        num={4}
        title="Majority Element (Moore's Voting)"
        difficulty="OA Medium"
        tags={["Moore's Voting", "LC 169"]}
        statement="Given an array of size <code>n</code>, return the <strong>majority element</strong> — the element that appears more than ⌊n/2⌋ times. You may assume the majority element always exists."
        constraints={["1 ≤ n ≤ 5×10⁴", "Majority element guaranteed to exist", "Expected: O(n) time, O(1) space"]}
        examples={[
          { input: "[3,2,3]",               output: "3" },
          { input: "[2,2,1,1,1,2,2]",       output: "2", note: "2 appears 4 times > 7/2 = 3.5" },
        ]}
        approach="Moore's Voting: Phase 1 — scan with a candidate and count. Match: count++. Mismatch: count--. Count hits 0: reset candidate. Phase 2 — verify (may be skipped if majority is guaranteed). Core insight: every mismatch 'cancels' one vote. The majority element has enough votes to survive all cancellations. O(n) time, O(1) space."
        code={{cpp: `int majorityElement(vector<int>& nums) {
    // Phase 1: find candidate via vote cancellation
    int cand = nums[0], cnt = 1;
    for (int i = 1; i < (int)nums.size(); i++) {
        if (cnt == 0)         { cand = nums[i]; cnt = 1; }
        else if (nums[i] == cand) cnt++;
        else                   cnt--;
    }
    return cand;   // Phase 2 omitted (majority guaranteed by problem)
}

// If majority not guaranteed, verify:
// int freq = count(nums.begin(), nums.end(), cand);
// return freq > nums.size()/2 ? cand : -1;`, python: `def majority_element(nums):
    cand, cnt = nums[0], 1
    for v in nums[1:]:
        if cnt == 0: cand, cnt = v, 1
        elif v == cand: cnt += 1
        else: cnt -= 1
    return cand  # majority guaranteed; else verify below

# If not guaranteed:
# return cand if nums.count(cand) > len(nums)//2 else -1`}}
      />

      <ProblemCard
        num={5}
        title="Maximum Sum Circular Subarray"
        difficulty="LC Medium"
        tags={["Kadane's + Inversion", "LC 918"]}
        statement="Given a <strong>circular integer array</strong> <code>nums</code> (the last element connects back to the first), return the maximum possible sum of a non-empty subarray. The subarray may wrap around from the end back to the beginning."
        constraints={["1 ≤ n ≤ 3×10⁴", "-3×10⁴ ≤ nums[i] ≤ 3×10⁴"]}
        examples={[
          { input: "[1,-2,3,-2]",   output: "3",  note: "Non-wrapping: [3]" },
          { input: "[5,-3,5]",      output: "10", note: "Wrapping: [5,5] (indices 0 and 2)" },
          { input: "[-3,-2,-3]",    output: "-2", note: "All negative — best single element" },
        ]}
        approach="Two cases: (1) non-wrapping → normal Kadane's. (2) wrapping → totalSum minus the minimum subarray in the middle (what's left = the wrapping part). Answer = max(case1, case2). Edge case: if all elements are negative, case2 = totalSum - totalSum = 0 which is invalid (empty subarray) — return case1 only."
        code={{cpp: `int maxSubarraySumCircular(vector<int>& nums) {
    int maxSum = nums[0], maxEnd = nums[0];
    int minSum = nums[0], minEnd = nums[0];
    int total  = nums[0];

    for (int i = 1; i < (int)nums.size(); i++) {
        maxEnd = max(maxEnd + nums[i], nums[i]);
        maxSum = max(maxSum, maxEnd);            // Case 1: Kadane's max
        minEnd = min(minEnd + nums[i], nums[i]);
        minSum = min(minSum, minEnd);            // for Case 2
        total += nums[i];
    }
    // All-negative guard: if maxSum<0, total-minSum=0 (invalid), skip Case 2
    return maxSum < 0 ? maxSum : max(maxSum, total - minSum);
}`, python: `def max_subarray_circular(nums):
    max_sum = max_end = nums[0]
    min_sum = min_end = nums[0]
    total = nums[0]
    for v in nums[1:]:
        max_end = max(max_end + v, v); max_sum = max(max_sum, max_end)
        min_end = min(min_end + v, v); min_sum = min(min_sum, min_end)
        total += v
    return max_sum if max_sum < 0 else max(max_sum, total - min_sum)`}}
      />

      <ProblemCard
        num={6}
        title="Subarray Sum Equals K"
        difficulty="LC Medium"
        tags={["Prefix Sum + HashMap", "LC 560"]}
        statement="Given an integer array <code>nums</code> and an integer <code>k</code>, return the <strong>number of subarrays</strong> whose sum equals <code>k</code>. The array may contain negative integers."
        constraints={["1 ≤ n ≤ 2×10⁴", "-1000 ≤ nums[i] ≤ 1000", "-10⁷ ≤ k ≤ 10⁷", "Sliding window does NOT work here (negatives)"]}
        examples={[
          { input: "nums=[1,1,1], k=2",  output: "2", note: "Subarrays: [1,1] at [0,1] and [1,1] at [1,2]" },
          { input: "nums=[1,-1,1], k=1", output: "3", note: "Subarrays: [1], [1,-1,1], [1] at index 2" },
        ]}
        approach="Prefix sum + hash map. Keep a running prefix sum. If prefSum - k appeared before (stored in map), there's a subarray from that earlier index to here that sums to k. Initialize map with {0: 1} to handle subarrays starting at index 0. O(n) time, O(n) space. This handles negatives because we're tracking exact prefix sums, not window bounds."
        code={{cpp: `#include <unordered_map>
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefCount;
    prefCount[0] = 1;   // empty prefix (sum=0) seen once
    int prefSum = 0, res = 0;
    for (int v : nums) {
        prefSum += v;
        // If (prefSum - k) was seen before → a subarray ending here sums to k
        res     += prefCount[prefSum - k];
        prefCount[prefSum]++;
    }
    return res;
}
// [1,1,1], k=2 → 2
// [1,-1,1], k=1 → 3`, python: `from collections import defaultdict

def subarray_sum(nums, k):
    pref_count = defaultdict(int)
    pref_count[0] = 1   # empty prefix base case
    pref, res = 0, 0
    for v in nums:
        pref += v
        res += pref_count[pref - k]    # how many prev prefixes differ by k
        pref_count[pref] += 1
    return res`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT — tab navigation + page header
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "fundamentals", label: "Fundamentals & Memory" },
  { id: "operations",   label: "Array Operations" },
  { id: "patterns",     label: "Optimization Patterns" },
  { id: "windows",      label: "Sliding Window & Prefix Sum" },
  { id: "problems",     label: "Problems" },
];

export default function Arrays() {
  const [active, setActive] = useState("fundamentals");
  const map = {
    fundamentals: <SectionFundamentals />,
    operations:   <SectionOperations />,
    patterns:     <SectionPatterns />,
    windows:      <SectionWindows />,
    problems:     <SectionProblems />,
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 03</div>
        <h1 className="page-header-title">Arrays</h1>
        <p className="page-header-subtitle">
          Memory Model · Rotation · Kadane's Algorithm · Moore's Voting · Sliding Window · Prefix Sum
        </p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={2} />
    </div>
  );
}
