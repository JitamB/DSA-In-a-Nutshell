import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SHARED DATA — used across multiple visualizers
══════════════════════════════════════════════════════ */
const PB_ARR  = [3, 1, 4, 1, 5, 9, 2, 6];
const PB_PREF = PB_ARR.reduce((acc, v, i) => [...acc, (acc[i - 1] ?? 0) + v], []);
// PB_PREF = [3, 4, 8, 9, 14, 23, 25, 31]

const MAT = [
  [3, 0, 1, 4],
  [5, 6, 3, 2],
  [1, 2, 0, 1],
  [4, 3, 2, 3],
];
const ROWS = 4, COLS = 4;
// Build 2D prefix — pref[i][j] covers mat[0..i-1][0..j-1] (1-indexed, extra zero row/col)
const PREF2D = Array.from({ length: ROWS + 1 }, () => Array(COLS + 1).fill(0));
for (let i = 1; i <= ROWS; i++)
  for (let j = 1; j <= COLS; j++)
    PREF2D[i][j] = MAT[i-1][j-1] + PREF2D[i-1][j] + PREF2D[i][j-1] - PREF2D[i-1][j-1];
// PREF2D[1..4][1..4]:
//  3   3   4   8
//  8  14  18  24
//  9  17  21  28
// 13  24  30  40

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — PREFIX ARRAY BUILD STEP-THROUGH
   Shows pref[i] = pref[i-1] + arr[i] being computed live
══════════════════════════════════════════════════════ */
function PrefixBuildViz() {
  const n = PB_ARR.length;
  const [step, setStep] = useState(0); // 0 = nothing built, n-1 = fully built

  const isBuilt = (i) => i <= step;
  const isCur   = (i) => i === step;

  return (
    <VizBox>
      {/* arr[] row */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.07em' }}>arr[]</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {PB_ARR.map((v, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: isCur(i) ? 'var(--color-border-warning)' : 'var(--color-border-secondary)', background: isCur(i) ? 'var(--color-background-warning)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: isCur(i) ? 700 : 400, color: isCur(i) ? 'var(--color-text-warning)' : 'var(--color-text-primary)', transition: 'all 0.15s' }}>
                {v}
              </div>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* pref[] row */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.07em' }}>pref[]</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {PB_ARR.map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: isCur(i) ? 'var(--color-border-success)' : isBuilt(i) ? 'var(--color-border-success)' : 'var(--color-border-tertiary)', background: isCur(i) ? 'var(--color-background-success)' : isBuilt(i) ? 'rgba(78,201,176,0.08)' : 'var(--color-background-tertiary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: isBuilt(i) ? 700 : 400, color: isBuilt(i) ? 'var(--color-text-success)' : 'var(--color-text-tertiary)', transition: 'all 0.15s' }}>
                {isBuilt(i) ? PB_PREF[i] : '?'}
              </div>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>p[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formula box */}
      <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.8, marginBottom: 14 }}>
        {step === 0
          ? <><span style={{ color: '#9CDCFE' }}>pref[0]</span><span style={{ color: '#7A8599' }}> = </span><span style={{ color: '#CE9178' }}>arr[0]</span><span style={{ color: '#7A8599' }}> = </span><span style={{ color: '#4EC9B0', fontWeight: 700 }}>{PB_PREF[0]}</span><span style={{ color: '#6A9955' }}>   // base case</span></>
          : <><span style={{ color: '#9CDCFE' }}>pref[{step}]</span><span style={{ color: '#7A8599' }}> = pref[{step - 1}] + arr[{step}] = </span><span style={{ color: '#4EC9B0' }}>{PB_PREF[step - 1]}</span><span style={{ color: '#7A8599' }}> + </span><span style={{ color: '#CE9178' }}>{PB_ARR[step]}</span><span style={{ color: '#7A8599' }}> = </span><span style={{ color: '#4EC9B0', fontWeight: 700 }}>{PB_PREF[step]}</span></>
        }
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 60, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {n}</span>
        <button onClick={() => setStep(Math.min(n - 1, step + 1))} disabled={step === n - 1} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === n - 1 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === n - 1 ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — RANGE QUERY DEMO
   L/R sliders → O(1) range sum computed from pref[]
══════════════════════════════════════════════════════ */
function RangeQueryViz() {
  const n = PB_ARR.length;
  const [qL, setQL] = useState(2);
  const [qR, setQR] = useState(5);
  const result = qL === 0 ? PB_PREF[qR] : PB_PREF[qR] - PB_PREF[qL - 1];

  return (
    <VizBox>
      {/* arr[] row */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.07em' }}>arr[]  —  query range [{qL} .. {qR}] highlighted</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {PB_ARR.map((v, i) => {
            const inRange = i >= qL && i <= qR;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: inRange ? 'var(--color-border-info)' : 'var(--color-border-secondary)', background: inRange ? 'var(--color-background-info)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: inRange ? 700 : 400, color: inRange ? 'var(--color-text-info)' : 'var(--color-text-secondary)', transition: 'all 0.15s' }}>
                  {v}
                </div>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* pref[] row */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.07em' }}>pref[]  —  green = pref[R]  ·  red = pref[L−1]</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {PB_PREF.map((v, i) => {
            const isR  = i === qR;
            const isLm = qL > 0 && i === qL - 1;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: isR ? 'var(--color-border-success)' : isLm ? 'var(--color-border-danger)' : 'var(--color-border-secondary)', background: isR ? 'var(--color-background-success)' : isLm ? 'var(--color-background-danger)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: isR || isLm ? 700 : 400, color: isR ? 'var(--color-text-success)' : isLm ? 'var(--color-text-danger)' : 'var(--color-text-secondary)', transition: 'all 0.15s' }}>
                  {v}
                </div>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>p[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 12 }}>
        {[['L', qL, setQL, 0, qR], ['R', qR, setQR, qL, n - 1]].map(([lbl, val, setter, mn, mx]) => (
          <div key={lbl}>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4 }}>L = {val}</div>
            <input type="range" min={mn} max={mx} value={val} onChange={e => setter(+e.target.value)} style={{ width: '100%' }} />
          </div>
        ))}
      </div>

      {/* Formula */}
      <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.9 }}>
        <div style={{ color: '#9CDCFE' }}>sum({qL}, {qR})</div>
        <div style={{ color: '#7A8599' }}>
          {qL === 0
            ? <>= pref[{qR}]  <span style={{ color: '#6A9955' }}>// L=0: no left term</span></>
            : <>= pref[{qR}] − pref[{qL - 1}]</>}
        </div>
        <div>
          <span style={{ color: '#4EC9B0', fontWeight: 700 }}>{PB_PREF[qR]}</span>
          {qL > 0 && <><span style={{ color: '#7A8599' }}> − </span><span style={{ color: '#F44747', fontWeight: 700 }}>{PB_PREF[qL - 1]}</span></>}
          <span style={{ color: '#7A8599' }}> = </span>
          <span style={{ color: '#4EC9B0', fontWeight: 800, fontSize: 14 }}>{result}</span>
          <span style={{ color: '#6A9955' }}>   // O(1)</span>
        </div>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — 2D RANGE QUERY VISUALIZER
   Select a sub-rectangle → see inclusion-exclusion formula
══════════════════════════════════════════════════════ */
function Grid2DViz() {
  const [r1, setR1] = useState(0);
  const [c1, setC1] = useState(0);
  const [r2, setR2] = useState(2);
  const [c2, setC2] = useState(2);

  const inRange = (i, j) => i >= r1 && i <= r2 && j >= c1 && j <= c2;

  // 4 corners of the inclusion-exclusion in pref (1-indexed)
  const A = PREF2D[r2 + 1][c2 + 1];  // + (bottom-right)
  const B = PREF2D[r1][c2 + 1];       // - (top-right)
  const C = PREF2D[r2 + 1][c1];       // - (bottom-left)
  const D = PREF2D[r1][c1];            // + (top-left, double-subtracted → add back)
  const result = A - B - C + D;

  const clampR1 = (v) => { setR1(v); if (v > r2) setR2(v); };
  const clampC1 = (v) => { setC1(v); if (v > c2) setC2(v); };
  const clampR2 = (v) => { setR2(v); if (v < r1) setR1(v); };
  const clampC2 = (v) => { setC2(v); if (v < c1) setC1(v); };

  return (
    <VizBox>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Original matrix */}
        <div>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.07em' }}>mat[][] — query ({r1},{c1}) to ({r2},{c2})</div>
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 3 }}>
            {MAT.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 3 }}>
                {row.map((v, j) => {
                  const on = inRange(i, j);
                  return (
                    <div key={j} style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, border: '1px solid', borderColor: on ? 'var(--color-border-info)' : 'var(--color-border-secondary)', background: on ? 'var(--color-background-info)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: on ? 700 : 400, color: on ? 'var(--color-text-info)' : 'var(--color-text-secondary)', transition: 'all 0.15s' }}>
                      {v}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Inclusion-exclusion formula panel */}
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.07em' }}>INCLUSION-EXCLUSION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: `pref[${r2+1}][${c2+1}]`, val: A, color: 'success', sign: '+', desc: 'bottom-right prefix (full rect)' },
              { label: `pref[${r1}][${c2+1}]`,   val: B, color: 'danger',  sign: '−', desc: 'subtract top strip' },
              { label: `pref[${r2+1}][${c1}]`,   val: C, color: 'danger',  sign: '−', desc: 'subtract left strip' },
              { label: `pref[${r1}][${c1}]`,     val: D, color: 'warning', sign: '+', desc: 'add back top-left (subtracted twice)' },
            ].map(({ label, val, color, sign, desc }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: `var(--color-background-${color})`, border: `0.5px solid var(--color-border-${color})`, borderRadius: 'var(--border-radius-md)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: `var(--color-text-${color})`, minWidth: 12 }}>{sign}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: `var(--color-text-${color})` }}>{label} = <strong>{val}</strong></div>
                  <div style={{ fontSize: 10.5, color: `var(--color-text-${color})`, opacity: 0.8 }}>{desc}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '8px 10px', background: 'var(--color-background-info)', border: '1px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--color-text-info)', marginBottom: 3 }}>= {A} − {B} − {C} + {D}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-info)' }}>{result}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
        {[
          ['r1 (row start)', r1, clampR1, 0, ROWS - 1],
          ['c1 (col start)', c1, clampC1, 0, COLS - 1],
          ['r2 (row end)',   r2, clampR2, 0, ROWS - 1],
          ['c2 (col end)',   c2, clampC2, 0, COLS - 1],
        ].map(([lbl, val, setter, mn, mx]) => (
          <div key={lbl}>
            <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', marginBottom: 3 }}>{lbl} = {val}</div>
            <input type="range" min={mn} max={mx} value={val} onChange={e => setter(+e.target.value)} style={{ width: '100%' }} />
          </div>
        ))}
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 4 — DIFFERENCE ARRAY STEP-THROUGH
   3 range-update queries applied step by step
══════════════════════════════════════════════════════ */
const DA_N = 7;
const DA_OPS = [
  { L: 0, R: 3, val: 3, desc: 'Add 3 to positions 0..3' },
  { L: 2, R: 5, val: 2, desc: 'Add 2 to positions 2..5' },
  { L: 4, R: 6, val: 1, desc: 'Add 1 to positions 4..6' },
];

function buildDiffSteps() {
  const diff = Array(DA_N).fill(0);
  const steps = [{ diff: [...diff], label: 'Initial — diff array all zeros. Each update will cost O(1).' }];
  for (const { L, R, val, desc } of DA_OPS) {
    diff[L] += val;
    if (R + 1 < DA_N) diff[R + 1] -= val;
    steps.push({ diff: [...diff], label: `${desc}  →  diff[${L}] += ${val}, diff[${R + 1 < DA_N ? R + 1 : 'n'}] -= ${val}` });
  }
  const final = diff.reduce((acc, v, i) => [...acc, (acc[i - 1] ?? 0) + v], []);
  steps.push({ diff: [...diff], final, label: 'Prefix sum of diff[] → final values after all updates. O(n) single pass.' });
  return steps;
}
const DA_STEPS = buildDiffSteps();

function DiffArrayViz() {
  const [step, setStep] = useState(0);
  const s = DA_STEPS[step];

  return (
    <VizBox>
      <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', lineHeight: 1.55 }}>
        {s.label}
      </div>

      {/* diff[] display */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.07em' }}>diff[]  (the difference array)</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {s.diff.map((v, i) => {
            const color = v > 0 ? 'success' : v < 0 ? 'danger' : null;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: color ? `var(--color-border-${color})` : 'var(--color-border-secondary)', background: color ? `var(--color-background-${color})` : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: v !== 0 ? 700 : 400, color: color ? `var(--color-text-${color})` : 'var(--color-text-tertiary)', transition: 'all 0.2s' }}>
                  {v > 0 ? `+${v}` : v}
                </div>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final values after prefix sum (only on last step) */}
      {s.final && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.07em' }}>final[] = prefix_sum(diff[])</div>
          <div style={{ display: 'flex', gap: 5 }}>
            {s.final.map((v, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid var(--color-border-info)', background: 'var(--color-background-info)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--color-text-info)' }}>
                  {v}
                </div>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 60, textAlign: 'center', alignSelf: 'center' }}>{step} / {DA_STEPS.length - 1}</span>
        <button onClick={() => setStep(Math.min(DA_STEPS.length - 1, step + 1))} disabled={step === DA_STEPS.length - 1} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === DA_STEPS.length - 1 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === DA_STEPS.length - 1 ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 5 — PREFIX + HASHMAP (SUBARRAY SUM = k)
   arr=[1,2,1,2,1] k=3 → traces 4 matches
══════════════════════════════════════════════════════ */
const PH_ARR = [1, 2, 1, 2, 1];
const PH_K   = 3;

function buildHashSteps(arr, k) {
  const steps = [{ i: -1, pref: 0, map: { 0: 1 }, res: 0, found: 0, desc: `Initialize: map = {0: 1}  — empty prefix (sum=0) seen once. This handles subarrays starting at index 0.` }];
  let pref = 0, res = 0;
  const map = { 0: 1 };
  for (let i = 0; i < arr.length; i++) {
    pref += arr[i];
    const need = pref - k;
    const found = map[need] ?? 0;
    res += found;
    const desc = found > 0
      ? `arr[${i}]=${arr[i]} → prefSum=${pref}. Need prefSum−k = ${pref}−${k} = ${need}. map[${need}]=${found} ✓ → ${found} new subarray${found > 1 ? 's' : ''} found! res=${res}`
      : `arr[${i}]=${arr[i]} → prefSum=${pref}. Need ${need}. map[${need}] = 0. No match. res=${res}`;
    map[pref] = (map[pref] ?? 0) + 1;
    steps.push({ i, pref, map: { ...map }, res, found, desc });
  }
  return steps;
}
const PH_STEPS = buildHashSteps(PH_ARR, PH_K);

function PrefixHashViz() {
  const [step, setStep] = useState(0);
  const s = PH_STEPS[step];

  return (
    <VizBox>
      <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', lineHeight: 1.55 }}>
        {s.desc}
      </div>

      {/* arr[] row */}
      <div style={{ marginBottom: 14, display: 'flex', gap: 5, alignItems: 'flex-end' }}>
        {PH_ARR.map((v, i) => {
          const isCur  = i === s.i;
          const isPast = s.i >= 0 && i <= s.i;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: isCur && s.found > 0 ? 'var(--color-border-success)' : isCur ? 'var(--color-border-warning)' : isPast ? 'var(--color-border-tertiary)' : 'var(--color-border-secondary)', background: isCur && s.found > 0 ? 'var(--color-background-success)' : isCur ? 'var(--color-background-warning)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: isCur ? 700 : 400, color: isCur && s.found > 0 ? 'var(--color-text-success)' : isCur ? 'var(--color-text-warning)' : isPast ? 'var(--color-text-tertiary)' : 'var(--color-text-secondary)', transition: 'all 0.15s' }}>
                {v}
              </div>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
        <div style={{ marginLeft: 12, paddingBottom: 14 }}>
          <div style={{ fontSize: 10.5, color: 'var(--color-text-tertiary)', marginBottom: 3 }}>k = {PH_K}</div>
          <div style={{ fontSize: 10.5, color: 'var(--color-text-tertiary)' }}>prefSum = <strong style={{ color: 'var(--color-text-info)' }}>{s.pref}</strong></div>
        </div>
      </div>

      {/* Hashmap state */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.07em' }}>map  {'{'}prefSum → count{'}'}</div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {Object.entries(s.map).map(([k, v]) => (
            <div key={k} style={{ padding: '4px 9px', borderRadius: 5, fontFamily: 'var(--font-mono)', fontSize: 11.5, background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', color: 'var(--color-text-secondary)' }}>
              {k}: <strong style={{ color: 'var(--color-text-info)' }}>{v}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Result counter */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div style={{ background: s.found > 0 ? 'var(--color-background-success)' : 'var(--color-background-secondary)', border: `0.5px solid ${s.found > 0 ? 'var(--color-border-success)' : 'var(--color-border-tertiary)'}`, borderRadius: 'var(--border-radius-md)', padding: '8px 12px', textAlign: 'center', transition: 'all 0.2s' }}>
          <div style={{ fontSize: 11, color: s.found > 0 ? 'var(--color-text-success)' : 'var(--color-text-tertiary)', marginBottom: 2 }}>Found this step</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: s.found > 0 ? 'var(--color-text-success)' : 'var(--color-text-tertiary)' }}>{s.found}</div>
        </div>
        <div style={{ background: 'var(--color-background-info)', border: '0.5px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', padding: '8px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-info)', marginBottom: 2 }}>Total subarrays (res)</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-info)' }}>{s.res}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 60, textAlign: 'center', alignSelf: 'center' }}>{step} / {PH_STEPS.length - 1}</span>
        <button onClick={() => setStep(Math.min(PH_STEPS.length - 1, step + 1))} disabled={step === PH_STEPS.length - 1} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === PH_STEPS.length - 1 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === PH_STEPS.length - 1 ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   PROBLEM CARD
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
   SECTION 1 — 1D PREFIX SUM FUNDAMENTALS
══════════════════════════════════════════════════════ */
function SectionFundamentals() {
  return (
    <div>
      <Note color="info" icon="ti-sum">
        <strong>Core idea:</strong> Spend O(n) time building a <em>prefix sum array</em> once. Then answer any range sum query in O(1) — no loop, no re-scan. The trade-off: O(n) extra space, and the array must be <em>static</em> (no element updates).
      </Note>

      <H2>Definition &amp; Construction</H2>
      <P><Mx>pref[i]</Mx> stores the sum of all elements from index 0 through index <Mx>i</Mx> inclusive. The recurrence is trivial: <Mx>pref[i] = pref[i-1] + arr[i]</Mx>, with <Mx>pref[0] = arr[0]</Mx> as the base case. Step through the build below.</P>
      <PrefixBuildViz />
      <Code>{{cpp: `// Build prefix sum array — O(n) time, O(n) space
vector<int> buildPrefix(vector<int>& arr) {
    int n = arr.size();
    vector<int> pref(n);
    pref[0] = arr[0];
    for (int i = 1; i < n; i++)
        pref[i] = pref[i - 1] + arr[i];
    return pref;
}

// O(1) range sum query
// sum of arr[l..r] inclusive
int query(vector<int>& pref, int l, int r) {
    return l == 0 ? pref[r] : pref[r] - pref[l - 1];
}`, python: `def build_prefix(arr):
    pref = [0] * len(arr)
    pref[0] = arr[0]
    for i in range(1, len(arr)):
        pref[i] = pref[i - 1] + arr[i]
    return pref

def query(pref, l, r):
    return pref[r] if l == 0 else pref[r] - pref[l - 1]`}}</Code>

      <H2>Range Sum Query — O(1) Lookup</H2>
      <P>The query formula follows directly from definition: <Mx>sum(l, r) = pref[r] − pref[l−1]</Mx>. It works because <Mx>pref[r]</Mx> includes everything from 0..r, and <Mx>pref[l−1]</Mx> includes everything from 0..l−1. Their difference isolates exactly the l..r segment. Adjust the sliders below.</P>
      <RangeQueryViz />
      <Note color="success" icon="ti-math">
        <strong>Edge case:</strong> When <Mx>l = 0</Mx>, there is no <Mx>pref[-1]</Mx> to subtract. Always guard: <code>l == 0 ? pref[r] : pref[r] - pref[l-1]</code>. Alternatively, use a <strong>1-indexed prefix array</strong> with a leading zero: <code>pref[0] = 0</code>, <code>pref[i] = pref[i-1] + arr[i-1]</code>. Then <code>sum(l, r) = pref[r+1] - pref[l]</code> with no edge-case guard needed.
      </Note>

      <H2>0-indexed vs 1-indexed — The Two Conventions</H2>
      <Table
        heads={["Convention", "Build", "Query sum(l, r)", "Edge case"]}
        rows={[
          ["0-indexed pref", "pref[i] = pref[i-1] + arr[i]", "pref[r] − pref[l-1]", "Must guard l == 0"],
          ["1-indexed pref (extra 0)", "pref[0]=0; pref[i] = pref[i-1] + arr[i-1]", "pref[r+1] − pref[l]", "No guard needed — pref[0]=0 always valid"],
        ]}
      />
      <Code>{{cpp: `// 1-indexed prefix — cleaner queries, preferred in competitive programming
vector<int> buildPrefix1(vector<int>& arr) {
    int n = arr.size();
    vector<int> pref(n + 1, 0);     // pref[0] = 0 (sentinel)
    for (int i = 1; i <= n; i++)
        pref[i] = pref[i - 1] + arr[i - 1];
    return pref;
}
// sum(l, r) 0-indexed in arr:
int query1(vector<int>& pref, int l, int r) {
    return pref[r + 1] - pref[l];   // always valid, no edge-case
}`, python: `def build_prefix_1indexed(arr):
    pref = [0] * (len(arr) + 1)    # pref[0] = 0 sentinel
    for i in range(1, len(pref)):
        pref[i] = pref[i-1] + arr[i-1]
    return pref

def query_1indexed(pref, l, r):
    return pref[r + 1] - pref[l]   # always valid`}}</Code>

      <H2>When NOT to Use Prefix Sum</H2>
      <Grid cols={2}>
        <Card title="✓ Use when:" color="success">
          Array is <strong>static</strong> (no updates). Multiple range queries on the same data. Binary search on prefix sums (next section). Memory O(n) is acceptable.
        </Card>
        <Card title="✗ Don't use when:" color="danger">
          Array elements are updated between queries — prefix must be rebuilt. Use a <strong>Fenwick Tree (BIT)</strong> for O(log n) both update and query. Or a <strong>Segment Tree</strong> for complex range operations.
        </Card>
      </Grid>
      <Table
        heads={["Structure", "Build", "Point Update", "Range Query", "Space"]}
        rows={[
          ["Prefix Sum Array", "O(n)", "O(n) rebuild", "O(1)", "O(n)"],
          ["Fenwick Tree (BIT)", "O(n log n)", "O(log n)", "O(log n)", "O(n)"],
          ["Segment Tree", "O(n)", "O(log n)", "O(log n)", "O(4n)"],
          ["Sparse Table", "O(n log n)", "N/A (static)", "O(1)", "O(n log n)"],
        ]}
      />

      <QA q="Why is the query formula pref[r] − pref[l−1] and not pref[r] − pref[l]?" a="pref[i] = arr[0] + arr[1] + … + arr[i]. The range sum from l to r includes arr[l]. To isolate it, we need to remove everything from arr[0] to arr[l-1] — which is pref[l-1]. Using pref[l] would also subtract arr[l] itself, giving arr[l+1] + … + arr[r], which is wrong. Mnemonic: subtract everything BEFORE position l." />
      <QA q="Can prefix sum handle floating-point arrays? What about potential precision issues?" a="Yes, the structure works identically for floats. However, summing many floating-point values accumulates rounding errors (catastrophic cancellation in pref[r] - pref[l-1] when both are large and close in value). For critical applications, use Kahan's summation algorithm during build, or use integer types with scaling (multiply by 10^6 if precision to 6 decimals is needed)." />
      <QA q="How do you use binary search on a prefix sum array?" a="Since arr[] has non-negative elements, pref[] is non-decreasing. Binary search on pref[] lets you find the index where the cumulative sum first reaches or exceeds a threshold — in O(log n). Classic use: given queries 'find leftmost position where prefix sum ≥ x', answer each in O(log n) using lower_bound on pref[]." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — 2D PREFIX SUM (PARTIAL SUM)
══════════════════════════════════════════════════════ */
function Section2D() {
  return (
    <div>
      <Note color="info" icon="ti-grid-dots">
        <strong>Partial Sum:</strong> The 2D generalization of prefix sum. <Mx>pref[i][j]</Mx> stores the sum of all elements in the sub-rectangle from <Mx>(0,0)</Mx> to <Mx>(i-1, j-1)</Mx>. Any sub-rectangle query is answered in O(1) using four pref values and the inclusion-exclusion principle.
      </Note>

      <H2>Building the 2D Prefix Array</H2>
      <P>The recurrence adds the row-above and column-left contributions, then subtracts the overlap (top-left rectangle counted twice), plus the current cell value:</P>
      <Note color="success" icon="ti-math">
        <Mx>pref[i][j] = mat[i-1][j-1] + pref[i-1][j] + pref[i][j-1] − pref[i-1][j-1]</Mx>
      </Note>
      <Code>{{cpp: `// Build 2D prefix sum (1-indexed with extra zero row and column)
// pref is (ROWS+1) × (COLS+1); pref[0][*] = 0, pref[*][0] = 0
vector<vector<int>> build2D(vector<vector<int>>& mat) {
    int R = mat.size(), C = mat[0].size();
    vector<vector<int>> pref(R + 1, vector<int>(C + 1, 0));
    for (int i = 1; i <= R; i++)
        for (int j = 1; j <= C; j++)
            pref[i][j] = mat[i-1][j-1]
                       + pref[i-1][j]
                       + pref[i][j-1]
                       - pref[i-1][j-1];
    return pref;
}`, python: `def build_2d(mat):
    R, C = len(mat), len(mat[0])
    pref = [[0] * (C + 1) for _ in range(R + 1)]
    for i in range(1, R + 1):
        for j in range(1, C + 1):
            pref[i][j] = (mat[i-1][j-1]
                         + pref[i-1][j]
                         + pref[i][j-1]
                         - pref[i-1][j-1])
    return pref`}}</Code>

      <H2>Sub-Rectangle Query — Inclusion-Exclusion</H2>
      <P>To query the sum of <Mx>mat[r1..r2][c1..c2]</Mx> (0-indexed), use four lookups in <Mx>pref</Mx> (1-indexed). The formula removes the left strip and top strip from the full bottom-right rectangle, then adds back the top-left corner that was subtracted twice.</P>
      <Note color="success" icon="ti-math">
        <Mx>sum(r1,c1,r2,c2) = pref[r2+1][c2+1] − pref[r1][c2+1] − pref[r2+1][c1] + pref[r1][c1]</Mx>
      </Note>
      <Grid2DViz />
      <Code>{{cpp: `// O(1) sub-rectangle query — r1,c1,r2,c2 are 0-indexed in mat
int query2D(vector<vector<int>>& pref, int r1, int c1, int r2, int c2) {
    return pref[r2+1][c2+1]
         - pref[r1][c2+1]
         - pref[r2+1][c1]
         + pref[r1][c1];
}

// Example: sum of mat[1..2][1..2] (0-indexed)
// = pref[3][3] - pref[1][3] - pref[3][1] + pref[1][1]
// = 21 - 4 - 9 + 3 = 11  (elements: 6+3+2+0 = 11 ✓)`, python: `def query_2d(pref, r1, c1, r2, c2):
    return (pref[r2+1][c2+1]
          - pref[r1][c2+1]
          - pref[r2+1][c1]
          + pref[r1][c1])
# O(1) lookup regardless of sub-rectangle size`}}</Code>

      <H2>Inclusion-Exclusion — Why Four Terms?</H2>
      <P>Visualize the four rectangles in the prefix matrix anchored at the top-left corner (0,0):</P>
      <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 2 }}>
        <div style={{ color: '#4EC9B0' }}>pref[r2+1][c2+1]  <span style={{ color: '#6A9955' }}>// + full bottom-right rect  (0,0)→(r2,c2)</span></div>
        <div style={{ color: '#F44747' }}>pref[r1][c2+1]    <span style={{ color: '#6A9955' }}>// − top strip             (0,0)→(r1-1,c2)</span></div>
        <div style={{ color: '#F44747' }}>pref[r2+1][c1]    <span style={{ color: '#6A9955' }}>// − left strip            (0,0)→(r2,c1-1)</span></div>
        <div style={{ color: '#CE9178' }}>pref[r1][c1]      <span style={{ color: '#6A9955' }}>// + top-left corner back  (0,0)→(r1-1,c1-1) — subtracted twice above</span></div>
      </div>

      <H2>Complexity Overview</H2>
      <Table
        heads={["Operation", "1D Prefix", "2D Prefix", "Notes"]}
        rows={[
          ["Build time", "O(n)", "O(n×m)", "Single pass over all elements"],
          ["Space", "O(n)", "O(n×m)", "Extra array of same size"],
          ["Range query", "O(1)", "O(1)", "Constant 4 lookups regardless of rect size"],
          ["Point update", "O(n) rebuild", "O(n×m) rebuild", "Use 2D BIT/Fenwick for dynamic updates"],
        ]}
      />

      <QA q="Why do we use a (ROWS+1)×(COLS+1) array with an extra zero row and column?" a="Same reason as 1D: a leading zero row/column acts as a sentinel. Any query touching the boundary (r1=0 or c1=0) would need a guard for pref[-1][j] or pref[i][-1]. With the extra row/col, these are simply pref[0][*] = 0 and pref[*][0] = 0, making the formula work uniformly without special cases." />
      <QA q="How do you handle 2D prefix sums when the matrix has updates?" a="A 2D Fenwick Tree (Binary Indexed Tree) supports both point updates and prefix sum queries in O(log n × log m) time. For range updates + range queries, a 2D Fenwick tree with the difference trick handles it. This is a significant jump in implementation complexity — usually only needed in competitive programming (ICPC/Codeforces Div 1 level)." />
      <QA q="What is the maximum size of a 2D prefix array that fits in typical memory?" a="An int (4 bytes) array of 1000×1000 uses 4 MB — fits within typical 256 MB limits. A 10000×10000 int array would use 400 MB — too large. For large sparse grids, use coordinate compression + hash maps instead of a full 2D array. For competitive programming, 3000×3000 = 9M ints ≈ 36 MB is usually safe." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — DIFFERENCE ARRAY & KEY APPLICATIONS
══════════════════════════════════════════════════════ */
function SectionDiffArray() {
  return (
    <div>
      <Note color="warning" icon="ti-bolt">
        <strong>Difference Array:</strong> The inverse of prefix sum. Where prefix sum enables O(1) <em>queries</em> on a static array, the difference array enables O(1) <em>range updates</em>, with a final O(n) prefix-sum pass to materialize the results.
      </Note>

      <H2>The Problem — Naive Range Updates Are O(n)</H2>
      <P>Given an array and <Mx>q</Mx> queries of the form "add <Mx>v</Mx> to every element in <Mx>[L, R]</Mx>", the naive approach updates each element individually — O(n) per query, O(nq) total. For q=10⁵ and n=10⁵, that's 10¹⁰ operations.</P>

      <H2>The Difference Array Trick — O(1) Per Update</H2>
      <P>For each range update <Mx>[L, R, val]</Mx>, do only <strong>two operations</strong>: <Mx>diff[L] += val</Mx> and <Mx>diff[R+1] -= val</Mx>. After all updates, a single prefix-sum pass on <Mx>diff[]</Mx> gives the final values.</P>
      <DiffArrayViz />
      <Code>{{cpp: `// Difference array for range-add queries
struct DiffArray {
    vector<int> diff;
    DiffArray(int n) : diff(n + 1, 0) {}

    // Add val to arr[l..r] — O(1)
    void update(int l, int r, int val) {
        diff[l]     += val;
        if (r + 1 < (int)diff.size()) diff[r + 1] -= val;
    }

    // Materialize: returns final array after all updates — O(n)
    vector<int> build() {
        vector<int> res(diff.size() - 1);
        res[0] = diff[0];
        for (int i = 1; i < (int)res.size(); i++)
            res[i] = res[i - 1] + diff[i];   // prefix sum of diff
        return res;
    }
};

// Usage:
// DiffArray da(7);
// da.update(0, 3, 3);  da.update(2, 5, 2);  da.update(4, 6, 1);
// auto final = da.build();
// final = [3, 3, 5, 5, 3, 3, 1]`, python: `class DiffArray:
    def __init__(self, n):
        self.diff = [0] * (n + 1)

    def update(self, l, r, val):
        self.diff[l] += val
        if r + 1 < len(self.diff):
            self.diff[r + 1] -= val

    def build(self):
        res = [0] * (len(self.diff) - 1)
        res[0] = self.diff[0]
        for i in range(1, len(res)):
            res[i] = res[i - 1] + self.diff[i]
        return res

# da = DiffArray(7)
# da.update(0,3,3); da.update(2,5,2); da.update(4,6,1)
# da.build() → [3, 3, 5, 5, 3, 3, 1]`}}</Code>
      <Table
        heads={["Approach", "Per-update cost", "Finalize cost", "Total for q updates"]}
        rows={[
          ["Naive (loop over range)", "O(n)", "—", "O(nq)"],
          ["Difference Array ✓", "O(1)", "O(n)", "O(q + n)"],
        ]}
      />

      <H2>Application — Range Frequency Map (Overlap Counting)</H2>
      <P>Given <Mx>q</Mx> ranges <Mx>[L_i, R_i]</Mx>, find the position covered by the most ranges. Classic use: scheduling conflicts, painting intervals, heatmap aggregation. The difference array solution is exactly the same pattern.</P>
      <Code>{{cpp: `// Find position with maximum overlap across q intervals
int maxOverlapPoint(vector<pair<int,int>>& intervals, int n) {
    vector<int> diff(n + 1, 0);
    for (auto [L, R] : intervals) {
        diff[L]++;
        if (R + 1 <= n) diff[R + 1]--;
    }
    int maxFreq = 0, pos = 0, curr = 0;
    for (int i = 0; i <= n; i++) {
        curr += diff[i];
        if (curr > maxFreq) { maxFreq = curr; pos = i; }
    }
    return pos;   // 0-indexed position with max coverage
}`, python: `def max_overlap_point(intervals, n):
    diff = [0] * (n + 2)
    for l, r in intervals:
        diff[l] += 1
        diff[r + 1] -= 1
    max_freq = curr = pos = 0
    for i in range(n + 1):
        curr += diff[i]
        if curr > max_freq:
            max_freq, pos = curr, i
    return pos`}}</Code>

      <H2>Application — Product Array Without Division (Prefix × Suffix)</H2>
      <P>Classic interview problem: given arr[], compute output[i] = product of all elements <em>except</em> arr[i]. The constraint: no division operator allowed. Solution: <Mx>output[i] = leftProduct[i] × rightProduct[i]</Mx>, where left/right products are built like prefix/suffix sums.</P>
      <Code>{{cpp: `vector<int> productExceptSelf(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, 1);

    // Forward pass: result[i] = product of arr[0..i-1]
    int left = 1;
    for (int i = 0; i < n; i++) {
        result[i] = left;
        left *= arr[i];
    }

    // Backward pass: multiply by product of arr[i+1..n-1]
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= right;
        right *= arr[i];
    }
    return result;
}
// [1,2,3,4] → [24,12,8,6]  (no division, O(n) time, O(1) extra space)`, python: `def product_except_self(arr):
    n = len(arr)
    result = [1] * n

    # Left pass
    left = 1
    for i in range(n):
        result[i] = left
        left *= arr[i]

    # Right pass
    right = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right
        right *= arr[i]

    return result
# [1,2,3,4] → [24,12,8,6]`}}</Code>

      <H2>Application — Equilibrium Index</H2>
      <P>Index <Mx>i</Mx> is an equilibrium point if the sum of elements before it equals the sum after it. One pass with a running left sum and derived right sum from the total — no prefix array allocation needed.</P>
      <Code>{{cpp: `int equilibriumIndex(vector<int>& arr) {
    int total = accumulate(arr.begin(), arr.end(), 0);
    int left = 0;
    for (int i = 0; i < (int)arr.size(); i++) {
        int right = total - left - arr[i];   // derived in O(1)
        if (left == right) return i;
        left += arr[i];
    }
    return -1;
}
// [1, 7, 3, 6, 5, 6] → index 3  (left=11, right=11)`, python: `def equilibrium_index(arr):
    total, left = sum(arr), 0
    for i, v in enumerate(arr):
        if left == total - left - v: return i
        left += v
    return -1`}}</Code>

      <QA q="In the difference array, why do we write diff[R+1] -= val rather than diff[R] -= val?" a="The increment at L means 'start contributing val here.' To stop contributing after position R (inclusive), we cancel at R+1 — meaning 'from R+1 onward, this range no longer applies.' Cancelling at R would also cancel the contribution at R itself, making position R miss its update." />
      <QA q="What happens if R+1 is out of bounds for diff[R+1]?" a="Allocate the diff array with size n+1 (one extra element beyond the valid range). The extra element at index n acts as a dummy — it gets the decrement but is never read in the final prefix-sum pass over [0..n-1]. This is why the DiffArray class above uses diff(n+1, 0)." />
      <QA q="Can the difference array handle range-multiply operations?" a="No — difference arrays only work for additive (commutative group) operations because prefix sum accumulates additions. For range-multiply, you'd need a logarithmic difference array (multiply, divide) or a segment tree with lazy propagation. The key requirement is that the operation has an inverse (subtraction is the inverse of addition)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — COUNTING PATTERNS WITH PREFIX + HASHMAP
══════════════════════════════════════════════════════ */
function SectionCount() {
  return (
    <div>
      <Note color="purple" icon="ti-hash">
        <strong>The Core Trick:</strong> Prefix sum + hash map lets you count subarrays satisfying some property in <em>O(n)</em>. The key identity: if <Mx>pref[j] − pref[i] = target</Mx>, the subarray <Mx>arr[i+1..j]</Mx> satisfies the property. Store prefix sum frequencies as you scan, and look up <Mx>pref[j] − target</Mx> at each step.
      </Note>

      <H2>Pattern 1 — Count Subarrays with Sum = k</H2>
      <P>Works for arrays with <strong>negative integers</strong> (unlike the sliding window approach). Step through the example: <Mx>arr=[1,2,1,2,1]</Mx>, <Mx>k=3</Mx> → 4 matching subarrays.</P>
      <PrefixHashViz />
      <Code>{{cpp: `#include <unordered_map>
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;     // empty prefix (sum=0) appears once
    int pref = 0, res = 0;
    for (int v : nums) {
        pref += v;
        res  += cnt[pref - k];    // how many prefixes differ by exactly k
        cnt[pref]++;
    }
    return res;
}
// Key: if pref[j] - pref[i] = k → subarray [i+1..j] sums to k
// Storing cnt[pref-k] counts all valid i's for this j — in O(1) per j.`, python: `from collections import defaultdict

def subarray_sum(nums, k):
    cnt = defaultdict(int)
    cnt[0] = 1       # empty prefix base case
    pref = res = 0
    for v in nums:
        pref += v
        res  += cnt[pref - k]    # O(1) lookup
        cnt[pref] += 1
    return res`}}</Code>

      <H2>Pattern 2 — Count Subarrays with Sum Divisible by K</H2>
      <P>Instead of storing the exact prefix sum, store <Mx>prefSum \% k</Mx>. Two positions with the same remainder have a subarray between them whose sum is divisible by <Mx>k</Mx>. Handle negative modulo in C++ explicitly.</P>
      <Code>{{cpp: `int subarraysDivByK(vector<int>& nums, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;
    int pref = 0, res = 0;
    for (int v : nums) {
        pref += v;
        int rem = ((pref % k) + k) % k;  // ensure non-negative mod (C++ % can be negative)
        res += cnt[rem];
        cnt[rem]++;
    }
    return res;
}
// [4, 5, 0, -2, -3, 1], k=5 → 7
// Any two indices with same (prefSum % k) define a valid subarray.`, python: `from collections import defaultdict

def subarrays_div_by_k(nums, k):
    cnt = defaultdict(int)
    cnt[0] = 1
    pref = res = 0
    for v in nums:
        pref += v
        rem = pref % k        # Python % is always non-negative for positive k
        res += cnt[rem]
        cnt[rem] += 1
    return res`}}</Code>
      <Note color="warning" icon="ti-alert-triangle">
        In C++, <code>-7 % 5 = -2</code> (implementation-defined sign in C++03, truncation in C++11+). Always normalize: <code>((pref % k) + k) % k</code> to ensure the remainder is in <code>[0, k-1]</code>. Python's <code>%</code> always returns a non-negative result for a positive divisor, so no fix needed there.
      </Note>

      <H2>Pattern 3 — XOR Prefix Sum</H2>
      <P>Just as addition has prefix sums and subtraction as inverse, XOR has prefix XOR and XOR-itself as inverse (since <Mx>a \oplus a = 0</Mx>). Range XOR query: <Mx>xor(l, r) = xorPref[r] \oplus xorPref[l-1]</Mx>. Count subarrays with XOR = k using the same hashmap pattern.</P>
      <Code>{{cpp: `// Build XOR prefix
vector<int> buildXorPrefix(vector<int>& arr) {
    int n = arr.size();
    vector<int> xp(n + 1, 0);    // xp[0] = 0
    for (int i = 0; i < n; i++) xp[i + 1] = xp[i] ^ arr[i];
    return xp;
}

// O(1) range XOR query
int xorQuery(vector<int>& xp, int l, int r) {
    return xp[r + 1] ^ xp[l];   // 0-indexed l,r in arr
}

// Count subarrays with XOR = k
int countXorK(vector<int>& arr, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;
    int xpref = 0, res = 0;
    for (int v : arr) {
        xpref ^= v;
        res   += cnt[xpref ^ k];  // xpref ^ prev = k  ↔  prev = xpref ^ k
        cnt[xpref]++;
    }
    return res;
}`, python: `def build_xor_prefix(arr):
    xp = [0] * (len(arr) + 1)
    for i, v in enumerate(arr): xp[i + 1] = xp[i] ^ v
    return xp

def xor_query(xp, l, r):
    return xp[r + 1] ^ xp[l]

from collections import defaultdict
def count_xor_k(arr, k):
    cnt = defaultdict(int)
    cnt[0] = 1; xpref = res = 0
    for v in arr:
        xpref ^= v
        res += cnt[xpref ^ k]   # XOR-subtraction: need ^ k
        cnt[xpref] += 1
    return res`}}</Code>

      <H2>Pattern 4 — Maximum Sum Subarray in a 2D Matrix</H2>
      <P>The classic 2D Kadane's: fix left and right column boundaries <Mx>l</Mx> and <Mx>r</Mx>. For each pair, compute row-wise compressed sums using column prefix sums, then run 1D Kadane's on that compressed array. Time <Mx>O(n^2 \cdot m)</Mx> where <Mx>n</Mx> = cols, <Mx>m</Mx> = rows.</P>
      <Code>{{cpp: `int maxSumSubmatrix(vector<vector<int>>& mat) {
    int R = mat.size(), C = mat[0].size();
    int maxSum = INT_MIN;

    for (int l = 0; l < C; l++) {
        vector<int> row(R, 0);     // row[i] = sum of mat[i][l..r]
        for (int r = l; r < C; r++) {
            for (int i = 0; i < R; i++) row[i] += mat[i][r];

            // 1D Kadane's on 'row' — O(R)
            int maxEnd = row[0], cur = row[0];
            for (int i = 1; i < R; i++) {
                cur    = max(cur + row[i], row[i]);
                maxEnd = max(maxEnd, cur);
            }
            maxSum = max(maxSum, maxEnd);
        }
    }
    return maxSum;
}
// Time: O(C² × R)  Space: O(R)`, python: `def max_sum_submatrix(mat):
    R, C = len(mat), len(mat[0])
    max_sum = float('-inf')
    for l in range(C):
        row = [0] * R
        for r in range(l, C):
            for i in range(R): row[i] += mat[i][r]
            # Kadane's on row
            cur = best = row[0]
            for v in row[1:]:
                cur = max(cur + v, v)
                best = max(best, cur)
            max_sum = max(max_sum, best)
    return max_sum`}}</Code>

      <H2>Pattern Summary</H2>
      <Table
        heads={["Problem", "Map Key", "Lookup Key", "Initialize"]}
        rows={[
          ["Subarray sum = k", "prefSum", "prefSum - k", "{0: 1}"],
          ["Subarray sum divisible by k", "prefSum % k", "same key", "{0: 1}"],
          ["Subarray XOR = k", "prefXOR", "prefXOR ^ k", "{0: 1}"],
          ["Subarray sum = 0", "prefSum", "prefSum (same)", "{0: 1}"],
          ["Longest subarray sum = k", "prefSum → index", "prefSum - k → earliest index", "{0: -1}"],
        ]}
      />

      <QA q="Why does the hashmap approach work for negative numbers but sliding window doesn't?" a="Sliding window shrinks from the left only when the current sum exceeds the target, assuming that shrinking always reduces the sum. With negative elements, shrinking might increase the sum (if arr[start] is negative). The hashmap approach has no such assumption — it stores exact prefix sum values and looks up the complement. It doesn't matter if elements are negative, positive, or zero." />
      <QA q="In the XOR prefix sum, why is the lookup key prefXOR ^ k rather than prefXOR - k?" a="XOR's 'subtraction' is XOR itself (since a ^ a = 0). To find the previous prefix XOR p such that xpref ^ p = k, solve: p = xpref ^ k (XOR both sides by xpref, using xpref ^ xpref = 0). The lookup key is derived by the same logic as the addition case (pref - k), just with ^ replacing -." />
      <QA q="What initializes the hashmap as {0: 1} and why is this necessary?" a="cnt[0] = 1 represents the 'empty prefix' — the state before seeing any element, with sum/XOR = 0. Without it, subarrays starting at index 0 would be missed. Example: if arr=[3,1] and k=4, at index 1 we have prefSum=4, look up prefSum-k=0, and cnt[0]=1 tells us there's one match — the entire subarray [3,1]. Without the initialization, this match would be missed." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — PROBLEMS
══════════════════════════════════════════════════════ */
function SectionProblems() {
  return (
    <div>
      <Note color="purple" icon="ti-tournament">
        6 problems across the full prefix sum spectrum — from O(1) range queries to 2D matrices and count patterns with hash maps. All appear in FAANG and product company interviews.
      </Note>

      <ProblemCard
        num={1}
        title="Range Sum Query — Immutable"
        difficulty="OA Easy"
        tags={["1D Prefix", "LC 303"]}
        statement="Design a data structure that takes an integer array <code>nums</code> and answers multiple queries: <code>sumRange(left, right)</code> returns the sum of elements from index <code>left</code> to <code>right</code> inclusive. The array is immutable — no updates."
        constraints={["1 ≤ n ≤ 10⁴", "Multiple queries (up to 10⁴)", "O(n) init, O(1) per query"]}
        examples={[
          { input: "nums=[-2,0,3,-5,2,-1]; sumRange(0,2), sumRange(2,5), sumRange(0,5)", output: "1, -1, -3" },
        ]}
        approach="Build a 1-indexed prefix array in the constructor: pref[0]=0, pref[i]=pref[i-1]+nums[i-1]. Each query: pref[right+1] - pref[left]. O(n) build once, O(1) per query, O(n) space. The classic application of prefix sums — wrap it in a class."
        code={{cpp: `class NumArray {
    vector<int> pref;
public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        pref.resize(n + 1, 0);
        for (int i = 1; i <= n; i++)
            pref[i] = pref[i - 1] + nums[i - 1];
    }

    int sumRange(int left, int right) {
        return pref[right + 1] - pref[left];
    }
};
// Init: O(n)  Query: O(1)  Space: O(n)`, python: `class NumArray:
    def __init__(self, nums):
        self.pref = [0] * (len(nums) + 1)
        for i, v in enumerate(nums):
            self.pref[i + 1] = self.pref[i] + v

    def sumRange(self, left, right):
        return self.pref[right + 1] - self.pref[left]`}}
      />

      <ProblemCard
        num={2}
        title="Range Sum Query 2D — Immutable"
        difficulty="OA Medium"
        tags={["2D Prefix", "LC 304"]}
        statement="Design a class that takes a 2D matrix and answers multiple sub-rectangle sum queries: <code>sumRegion(r1,c1,r2,c2)</code> returns the sum of elements inside the rectangle with corners <code>(r1,c1)</code> (top-left) and <code>(r2,c2)</code> (bottom-right)."
        constraints={["1 ≤ m,n ≤ 200", "Up to 10⁴ sumRegion calls", "O(m×n) init, O(1) per query"]}
        examples={[
          { input: "mat=[[3,0,1,4],[5,6,3,2],[1,2,0,1],[4,3,2,3]]; sumRegion(1,1,2,2)", output: "11", note: "6+3+2+0 = 11" },
          { input: "sumRegion(0,0,3,3)", output: "40", note: "Total sum of matrix" },
        ]}
        approach="Build a (R+1)×(C+1) prefix matrix with an extra zero row and column. Each pref[i][j] = mat[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1]. Query: pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1]. Direct application of the inclusion-exclusion formula."
        code={{cpp: `class NumMatrix {
    vector<vector<int>> pref;
public:
    NumMatrix(vector<vector<int>>& mat) {
        int R = mat.size(), C = mat[0].size();
        pref.assign(R + 1, vector<int>(C + 1, 0));
        for (int i = 1; i <= R; i++)
            for (int j = 1; j <= C; j++)
                pref[i][j] = mat[i-1][j-1]
                           + pref[i-1][j] + pref[i][j-1]
                           - pref[i-1][j-1];
    }

    int sumRegion(int r1, int c1, int r2, int c2) {
        return pref[r2+1][c2+1]
             - pref[r1][c2+1]
             - pref[r2+1][c1]
             + pref[r1][c1];
    }
};`, python: `class NumMatrix:
    def __init__(self, mat):
        R, C = len(mat), len(mat[0])
        self.pref = [[0]*(C+1) for _ in range(R+1)]
        for i in range(1, R+1):
            for j in range(1, C+1):
                self.pref[i][j] = (mat[i-1][j-1]
                    + self.pref[i-1][j] + self.pref[i][j-1]
                    - self.pref[i-1][j-1])

    def sumRegion(self, r1, c1, r2, c2):
        p = self.pref
        return p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]`}}
      />

      <ProblemCard
        num={3}
        title="Subarray Sum Equals K"
        difficulty="LC Medium"
        tags={["Prefix + HashMap", "LC 560"]}
        statement="Given an integer array <code>nums</code> and integer <code>k</code>, return the number of <strong>contiguous subarrays</strong> whose sum equals exactly <code>k</code>. The array may contain negative integers — sliding window does not work here."
        constraints={["1 ≤ n ≤ 2×10⁴", "-1000 ≤ nums[i] ≤ 1000", "-10⁷ ≤ k ≤ 10⁷"]}
        examples={[
          { input: "nums=[1,1,1], k=2",    output: "2" },
          { input: "nums=[1,-1,1], k=1",   output: "3", note: "[1], [1,-1,1], [1] (index 2)" },
        ]}
        approach="Prefix sum + hash map. Maintain running prefSum. At each index j, the number of valid subarrays ending here = count of previous prefix sums equal to prefSum - k. Initialize map with {0:1} for subarrays starting at index 0. One pass, O(n) time and space."
        code={{cpp: `int subarraySum(vector<int>& nums, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;         // empty prefix base case
    int pref = 0, res = 0;
    for (int v : nums) {
        pref += v;
        res  += cnt[pref - k];  // subarrays ending here with sum k
        cnt[pref]++;
    }
    return res;
}

// Dry-run for [1,-1,1], k=1:
// i=0: pref=1, cnt[0]=1 → res=1, cnt={0:1,1:1}
// i=1: pref=0, cnt[-1]=0 → res=1, cnt={0:2,1:1}
// i=2: pref=1, cnt[0]=2 → res=3, cnt={0:2,1:2}`, python: `from collections import defaultdict

def subarray_sum(nums, k):
    cnt = defaultdict(int)
    cnt[0] = 1
    pref = res = 0
    for v in nums:
        pref += v
        res += cnt[pref - k]
        cnt[pref] += 1
    return res`}}
      />

      <ProblemCard
        num={4}
        title="Product of Array Except Self"
        difficulty="LC Medium"
        tags={["Prefix × Suffix", "LC 238"]}
        statement="Given an integer array <code>nums</code>, return an array <code>output</code> such that <code>output[i]</code> equals the product of all elements of <code>nums</code> except <code>nums[i]</code>. <strong>Do not use division.</strong> Solve in O(n) time and O(1) extra space (output array doesn't count)."
        constraints={["2 ≤ n ≤ 10⁵", "-30 ≤ nums[i] ≤ 30", "Product guaranteed to fit in 32-bit int", "No division operator"]}
        examples={[
          { input: "[1,2,3,4]", output: "[24,12,8,6]" },
          { input: "[-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
        ]}
        approach="Two-pass prefix product. Forward pass: result[i] = product of nums[0..i-1] (left prefix, accumulated in-place). Backward pass: multiply result[i] by the running right product (product of nums[i+1..n-1]). Each element ends up with leftProduct × rightProduct. O(n) time, O(1) extra space."
        code={{cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);

    // Forward: res[i] = product of nums[0..i-1]
    int left = 1;
    for (int i = 0; i < n; i++) {
        res[i] = left;
        left *= nums[i];
    }

    // Backward: multiply by product of nums[i+1..n-1]
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right  *= nums[i];
    }
    return res;
}
// [1,2,3,4]:
// After forward: [1, 1, 2, 6]
// After backward: [24, 12, 8, 6]  ✓`, python: `def product_except_self(nums):
    n, res = len(nums), [1] * len(nums)

    left = 1
    for i in range(n):
        res[i] = left; left *= nums[i]

    right = 1
    for i in range(n - 1, -1, -1):
        res[i] *= right; right *= nums[i]

    return res`}}
      />

      <ProblemCard
        num={5}
        title="Subarray Sum Divisible by K"
        difficulty="LC Medium"
        tags={["Prefix Mod + HashMap", "LC 974"]}
        statement="Given an integer array <code>nums</code> and an integer <code>k</code>, return the number of non-empty subarrays that have a sum divisible by <code>k</code>."
        constraints={["1 ≤ n ≤ 3×10⁴", "-10⁴ ≤ nums[i] ≤ 10⁴", "2 ≤ k ≤ 10⁴"]}
        examples={[
          { input: "nums=[4,5,0,-2,-3,1], k=5", output: "7" },
          { input: "nums=[5],              k=9", output: "0" },
        ]}
        approach="Prefix sum modulo k. Two positions i and j have pref[j] - pref[i] divisible by k iff pref[j] % k == pref[i] % k. Count pairs of equal remainders using a frequency map. The total pairs from each remainder group of size f is f*(f-1)/2 — but in the hash map approach, adding to count as we scan is simpler. Normalize negative mod in C++: ((rem % k) + k) % k."
        code={{cpp: `int subarraysDivByK(vector<int>& nums, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;          // empty prefix (sum=0) remainder = 0
    int pref = 0, res = 0;
    for (int v : nums) {
        pref += v;
        int rem = ((pref % k) + k) % k;  // normalize negative modulo
        res    += cnt[rem];               // each prior equal-rem prefix forms a valid pair
        cnt[rem]++;
    }
    return res;
}
// [4,5,0,-2,-3,1], k=5:
// prefixes: 4,9,9,7,4,5  mods: 4,4,4,2,4,0
// 0 appears 2 times (base + 5) → contributes 1 pair
// 4 appears 4 times → contributes 6 pairs
// total = 7 ✓`, python: `from collections import defaultdict

def subarrays_div_by_k(nums, k):
    cnt = defaultdict(int)
    cnt[0] = 1
    pref = res = 0
    for v in nums:
        pref += v
        rem = pref % k   # Python % always non-negative for positive k
        res += cnt[rem]
        cnt[rem] += 1
    return res`}}
      />

      <ProblemCard
        num={6}
        title="Maximum Sum Rectangle in a 2D Matrix"
        difficulty="LC Hard"
        tags={["2D Prefix + Kadane's", "Classic"]}
        statement="Given an <code>m × n</code> integer matrix, find the sub-rectangle (contiguous rows and columns) with the <strong>maximum sum</strong> and return that sum. Elements can be negative."
        constraints={["1 ≤ m, n ≤ 150", "-100 ≤ matrix[i][j] ≤ 100"]}
        examples={[
          { input: "[[1,2,-1,-4,-20],[-8,-3,4,2,1],[3,8,10,1,3],[-4,-1,1,7,-6]]", output: "29", note: "Sub-rectangle rows 1-3, cols 1-3: 8+4+2+8+10+1 = 29? Actually: -3+4+2+8+10+1+(-1)+1+7=29" },
          { input: "[[2,1],[-3,-4]]", output: "3", note: "Single element or [2,1] row" },
        ]}
        approach="Fix left and right column bounds (O(n²) pairs). For each pair, compute a 1D 'row sums' array where row[i] = sum of mat[i][l..r] (using column prefix sums for O(1) each). Run 1D Kadane's on this row array. Total: O(n² × m). The O(n log m) version exists using sorted sets but is rarely needed in interviews."
        code={{cpp: `int maxSumSubmatrix(vector<vector<int>>& mat) {
    int R = mat.size(), C = mat[0].size();
    int ans = INT_MIN;
    for (int l = 0; l < C; l++) {
        vector<int> row(R, 0);
        for (int r = l; r < C; r++) {
            // Accumulate column r into row[] sums
            for (int i = 0; i < R; i++) row[i] += mat[i][r];

            // 1D Kadane's on compressed row array
            int maxEnd = row[0], best = row[0];
            for (int i = 1; i < R; i++) {
                maxEnd = max(maxEnd + row[i], row[i]);
                best   = max(best, maxEnd);
            }
            ans = max(ans, best);
        }
    }
    return ans;
}
// Time: O(C² × R)  Space: O(R)`, python: `def max_sum_submatrix(mat):
    R, C = len(mat), len(mat[0])
    ans = float('-inf')
    for l in range(C):
        row = [0] * R
        for r in range(l, C):
            for i in range(R): row[i] += mat[i][r]
            # Kadane's on row
            cur = best = row[0]
            for v in row[1:]:
                cur = max(cur + v, v)
                best = max(best, cur)
            ans = max(ans, best)
    return ans`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT — tabs + page header
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "fundamentals", label: "1D Prefix Sum" },
  { id: "partial2d",    label: "2D Partial Sum" },
  { id: "diffarray",    label: "Difference Array" },
  { id: "count",        label: "Counting Patterns" },
  { id: "problems",     label: "Problems" },
];

export default function PrefixSum() {
  const [active, setActive] = useState("fundamentals");
  const map = {
    fundamentals: <SectionFundamentals />,
    partial2d:    <Section2D />,
    diffarray:    <SectionDiffArray />,
    count:        <SectionCount />,
    problems:     <SectionProblems />,
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 04</div>
        <h1 className="page-header-title">Prefix Sum &amp; Partial Sum</h1>
        <p className="page-header-subtitle">
          1D &amp; 2D Prefix Arrays · Difference Array · Product Array · Subarray Count Patterns · Hash Map Techniques
        </p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={4} />
    </div>
  );
}
