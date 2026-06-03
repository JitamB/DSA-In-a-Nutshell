import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — CALL STACK STEP-THROUGH
   Models factorial(4): winding → base → unwinding
══════════════════════════════════════════════════════ */
const STACK_STEPS = [
  { frames: [{ call: 'main()', note: 'invokes factorial(4)', top: false }], desc: 'Program begins — main() calls factorial(4)' },
  { frames: [{ call: 'main()', note: 'suspended, waiting…', top: false }, { call: 'factorial(4)', note: 'n=4 → calls factorial(3)', top: true }], desc: 'Frame pushed: factorial(4) — cannot return yet, needs factorial(3)' },
  { frames: [{ call: 'main()', note: 'suspended, waiting…', top: false }, { call: 'factorial(4)', note: 'n=4 → suspended…', top: false }, { call: 'factorial(3)', note: 'n=3 → calls factorial(2)', top: true }], desc: 'Frame pushed: factorial(3)' },
  { frames: [{ call: 'main()', note: 'suspended, waiting…', top: false }, { call: 'factorial(4)', note: 'n=4 → suspended…', top: false }, { call: 'factorial(3)', note: 'n=3 → suspended…', top: false }, { call: 'factorial(2)', note: 'n=2 → calls factorial(1)', top: true }], desc: 'Frame pushed: factorial(2)' },
  { frames: [{ call: 'main()', note: 'suspended, waiting…', top: false }, { call: 'factorial(4)', note: 'n=4 → suspended…', top: false }, { call: 'factorial(3)', note: 'n=3 → suspended…', top: false }, { call: 'factorial(2)', note: 'n=2 → suspended…', top: false }, { call: 'factorial(1)', note: 'n=1 ≤ 1  →  BASE CASE!', top: true, isBase: true }], desc: 'Base case reached — stack is at maximum depth. Unwinding begins.' },
  { frames: [{ call: 'main()', note: 'suspended, waiting…', top: false }, { call: 'factorial(4)', note: 'n=4 → suspended…', top: false }, { call: 'factorial(3)', note: 'n=3 → suspended…', top: false }, { call: 'factorial(2)', note: 'returns 2 × 1 = 2', top: true, isRet: true }], desc: 'factorial(1) returns 1 → popped. factorial(2) computes 2 × 1 = 2' },
  { frames: [{ call: 'main()', note: 'suspended, waiting…', top: false }, { call: 'factorial(4)', note: 'n=4 → suspended…', top: false }, { call: 'factorial(3)', note: 'returns 3 × 2 = 6', top: true, isRet: true }], desc: 'factorial(2) returns 2 → popped. factorial(3) computes 3 × 2 = 6' },
  { frames: [{ call: 'main()', note: 'suspended, waiting…', top: false }, { call: 'factorial(4)', note: 'returns 4 × 6 = 24', top: true, isRet: true }], desc: 'factorial(3) returns 6 → popped. factorial(4) computes 4 × 6 = 24' },
  { frames: [{ call: 'main()', note: 'receives result: 24 ✓', top: true, isDone: true }], result: '24', desc: 'factorial(4) returns 24 → stack fully unwound. Program continues.' },
];

function CallStackDemo() {
  const [step, setStep] = useState(0);
  const s = STACK_STEPS[step];

  const frameColor = (f) =>
    f.isBase ? 'success' : f.isRet ? 'warning' : f.isDone ? 'success' : f.top ? 'info' : null;

  const frameBg  = (f) => f.isBase || f.isDone || f.isRet ? `var(--color-background-${frameColor(f)})` : f.top ? 'var(--color-background-info)' : 'var(--color-background-secondary)';
  const frameBdr = (f) => f.isBase || f.isDone || f.isRet ? `var(--color-border-${frameColor(f)})` : f.top ? 'var(--color-border-info)' : 'var(--color-border-tertiary)';
  const frameClr = (f) => f.isBase || f.isDone || f.isRet ? `var(--color-text-${frameColor(f)})` : f.top ? 'var(--color-text-info)' : 'var(--color-text-secondary)';

  return (
    <VizBox>
      <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 12, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', lineHeight: 1.55, fontStyle: 'italic' }}>
        {s.desc}
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.07em' }}>▲ STACK TOP — most recent call</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 180 }}>
            {[...s.frames].reverse().map((f, i) => (
              <div key={i} style={{ padding: '7px 12px', background: frameBg(f), border: `1px solid ${frameBdr(f)}`, borderRadius: 'var(--border-radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: frameClr(f) }}>{f.call}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: frameClr(f), opacity: 0.85 }}>{f.note}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginTop: 6, letterSpacing: '0.07em' }}>▼ STACK BOTTOM — program entry</div>
        </div>
        <div style={{ width: 120, display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 20 }}>
          {[{ c: 'info', l: 'Active frame' }, { c: 'success', l: 'Base / Done' }, { c: 'warning', l: 'Returning' }].map(({ c, l }) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: `var(--color-background-${c})`, border: `1px solid var(--color-border-${c})`, flexShrink: 0 }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>{l}</span>
            </div>
          ))}
          {s.result && (
            <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--color-background-success)', border: '1px solid var(--color-border-success)', borderRadius: 'var(--border-radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--color-text-success)', marginBottom: 3 }}>RESULT</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-success)' }}>{s.result}</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
        {[
          { label: '← Prev', action: () => setStep(Math.max(0, step - 1)), disabled: step === 0 },
          { label: 'Next →', action: () => setStep(Math.min(STACK_STEPS.length - 1, step + 1)), disabled: step === STACK_STEPS.length - 1 },
        ].map(({ label, action, disabled }) => (
          <button key={label} onClick={action} disabled={disabled} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: disabled ? 'not-allowed' : 'pointer', fontSize: 12, fontFamily: 'var(--font-sans)', opacity: disabled ? 0.4 : 1 }}>{label}</button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 60, textAlign: 'center' }}>{step + 1} / {STACK_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding: '5px 10px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — FIBONACCI CALL TREE
   Highlights duplicate sub-calls in warning color
══════════════════════════════════════════════════════ */
function buildFibTree(k, seen = new Set()) {
  const isDup = seen.has(k);
  seen.add(k);
  return { k, isBase: k <= 1, isDup, children: k > 1 ? [buildFibTree(k - 1, seen), buildFibTree(k - 2, seen)] : [] };
}
function countFibCalls(k, counts = {}) {
  counts[k] = (counts[k] || 0) + 1;
  if (k > 1) { countFibCalls(k - 1, counts); countFibCalls(k - 2, counts); }
  return counts;
}

function FibTreeLine({ node, prefix, isLast, callCounts }) {
  const conn  = prefix + (isLast ? '└── ' : '├── ');
  const child = prefix + (isLast ? '    ' : '│   ');
  const clr   = node.isBase ? '#4EC9B0' : node.isDup ? '#CE9178' : '#9CDCFE';
  return (
    <>
      <div style={{ lineHeight: 1.75, whiteSpace: 'pre' }}>
        <span style={{ color: '#3D4460' }}>{conn}</span>
        <span style={{ color: clr, fontWeight: 600 }}>fib({node.k})</span>
        {!node.isBase && node.isDup && <span style={{ color: '#CE9178', opacity: 0.75, fontSize: 11 }}>  ⚠ ×{callCounts[node.k]} total</span>}
        {node.isBase && <span style={{ color: '#4EC9B0', opacity: 0.65, fontSize: 11 }}>  → {node.k === 1 ? 'returns 1' : 'returns 0'}</span>}
      </div>
      {node.children.map((child_node, i) => (
        <FibTreeLine key={i} node={child_node} prefix={child} isLast={i === node.children.length - 1} callCounts={callCounts} />
      ))}
    </>
  );
}

function FibCallTree() {
  const [n, setN] = useState(5);
  const tree       = buildFibTree(n);
  const callCounts = countFibCalls(n);
  const totalCalls = Object.values(callCounts).reduce((a, b) => a + b, 0);
  const redundant  = Object.entries(callCounts).filter(([k]) => +k > 1).reduce((acc, [, v]) => acc + (v - 1), 0);

  return (
    <VizBox>
      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 36px', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>n =</span>
        <input type="range" min={2} max={6} value={n} onChange={e => setN(+e.target.value)} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'right' }}>{n}</span>
      </div>
      <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '12px 16px', overflowX: 'auto', marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
          <div style={{ color: '#9CDCFE', fontWeight: 700, marginBottom: 2 }}>
            fib({n}) <span style={{ color: '#6A9955', fontWeight: 400 }}>// O(2ⁿ) calls without memoization</span>
          </div>
          {tree.children.map((child, i) => (
            <FibTreeLine key={i} node={child} prefix="" isLast={i === tree.children.length - 1} callCounts={callCounts} />
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Total calls', val: totalCalls, color: 'info' },
          { label: 'Redundant calls', val: redundant, color: 'warning' },
          { label: 'Unique subproblems', val: Object.keys(callCounts).length, color: 'success' },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ background: `var(--color-background-${color})`, border: `0.5px solid var(--color-border-${color})`, borderRadius: 'var(--border-radius-md)', padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: `var(--color-text-${color})` }}>{val}</div>
            <div style={{ fontSize: 11, color: `var(--color-text-${color})`, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
        {[{ clr: '#9CDCFE', l: 'Unique evaluation' }, { clr: '#CE9178', l: 'Duplicate (wasted work)' }, { clr: '#4EC9B0', l: 'Base case' }].map(({ clr, l }) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11 }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: clr }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>{l}</span>
          </div>
        ))}
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — LOGARITHMIC RECURSION DEPTH
══════════════════════════════════════════════════════ */
function LogRecursionViz() {
  const [n, setN] = useState(64);
  const [m, setM] = useState(2);

  const steps = [];
  let val = n;
  while (val >= 1) {
    steps.push(val);
    if (val < m) break;
    val = Math.floor(val / m);
  }
  const depth = steps.length - 1;

  return (
    <VizBox>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 5 }}>n = {n}</div>
          <input type="range" min={1} max={256} value={n} onChange={e => setN(+e.target.value)} style={{ width: '100%' }} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 5 }}>m = {m}</div>
          <input type="range" min={2} max={10} value={m} onChange={e => setM(+e.target.value)} style={{ width: '100%' }} />
        </div>
      </div>
      <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '10px 14px', marginBottom: 12, overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          {steps.map((v, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ padding: '2px 7px', borderRadius: 4, background: i === 0 ? '#1E3A5F' : i === steps.length - 1 ? '#112408' : 'rgba(156,220,254,0.06)', color: i === 0 ? '#9CDCFE' : i === steps.length - 1 ? '#4EC9B0' : '#7A8599', border: `1px solid ${i === 0 ? '#2563EB33' : i === steps.length - 1 ? '#4EC9B033' : '#ffffff0D'}` }}>
                fun({v})
              </span>
              {i < steps.length - 1 && <span style={{ color: '#3D4460' }}>→</span>}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: 'var(--color-background-info)', border: '0.5px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', padding: '10px 12px' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-info)', marginBottom: 4 }}>Recursion depth</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-info)' }}>{depth}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-info)', opacity: 0.8, marginTop: 2 }}>= ⌊log{m}({n})⌋</div>
        </div>
        <div style={{ background: 'var(--color-background-success)', border: '0.5px solid var(--color-border-success)', borderRadius: 'var(--border-radius-md)', padding: '10px 12px' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-success)', marginBottom: 4 }}>Formula check</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-success)' }}>{Math.floor(Math.log(n) / Math.log(m))}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-success)', opacity: 0.8, marginTop: 2 }}>Math.floor(log{m}({n}))</div>
        </div>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 4 — TOWER OF HANOI STEP-THROUGH
══════════════════════════════════════════════════════ */
function genTOHMoves(n, from = 0, to = 2, aux = 1) {
  if (n === 0) return [];
  return [...genTOHMoves(n - 1, from, aux, to), [from, to], ...genTOHMoves(n - 1, aux, to, from)];
}
function getPegs(diskCount, step, moves) {
  const pegs = [Array.from({ length: diskCount }, (_, i) => diskCount - i), [], []];
  for (let i = 0; i < step; i++) { const [f, t] = moves[i]; pegs[t].push(pegs[f].pop()); }
  return pegs;
}
const DISK_COLORS = ['#4EC9B0', '#81B4EA', '#DCDCAA', '#CE9178', '#C586C0'];
const PEG_NAMES   = ['A', 'B', 'C'];

function TOHVisualizer() {
  const [disks, setDisks] = useState(3);
  const [step,  setStep]  = useState(0);
  const moves = genTOHMoves(disks);
  const total = moves.length;
  const pegs  = getPegs(disks, step, moves);
  const curMove = step > 0 ? moves[step - 1] : null;
  const maxW = 20 + disks * 16;

  const changeDisks = (n) => { setDisks(n); setStep(0); };

  return (
    <VizBox>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Disks:</span>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => changeDisks(n)} style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid', borderColor: disks === n ? 'var(--color-border-info)' : 'var(--color-border-tertiary)', background: disks === n ? 'var(--color-background-info)' : 'transparent', color: disks === n ? 'var(--color-text-info)' : 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{n}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)' }}>
          2^{disks} − 1 = {total} moves
        </div>
      </div>

      <div style={{ minHeight: 28, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {curMove
          ? <span style={{ fontSize: 12.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-info)', padding: '3px 12px', background: 'var(--color-background-info)', border: '1px solid var(--color-border-info)', borderRadius: 20 }}>Move disk from peg {PEG_NAMES[curMove[0]]} → peg {PEG_NAMES[curMove[1]]}</span>
          : <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Initial state — all {disks} disk{disks > 1 ? 's' : ''} on peg A</span>
        }
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
        {pegs.map((peg, pi) => (
          <div key={pi} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>Peg {PEG_NAMES[pi]}</div>
            <div style={{ position: 'relative', width: maxW + 24, height: disks * 19 + 14, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 8, left: '50%', width: 3, transform: 'translateX(-50%)', background: 'var(--color-border-secondary)', borderRadius: 2, zIndex: 0 }} />
              {[...peg].reverse().map((ds, i) => (
                <div key={i} style={{ width: 20 + ds * 16, height: 15, borderRadius: 4, zIndex: 1, background: DISK_COLORS[(ds - 1) % DISK_COLORS.length], marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(0,0,0,0.55)', fontWeight: 700, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>{ds}</div>
              ))}
              <div style={{ width: maxW + 14, height: 5, background: 'var(--color-border-secondary)', borderRadius: 2, zIndex: 1 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, fontFamily: 'var(--font-sans)', opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 72, textAlign: 'center' }}>{step} / {total}</span>
        <button onClick={() => setStep(Math.min(total, step + 1))} disabled={step === total} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === total ? 'not-allowed' : 'pointer', fontSize: 12, fontFamily: 'var(--font-sans)', opacity: step === total ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
        <button onClick={() => setStep(total)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 5 — JOSEPHUS CIRCLE VISUALIZER
   SVG circular layout with step-through elimination
══════════════════════════════════════════════════════ */
function computeJosephus(n, k) {
  const people = Array.from({ length: n }, (_, i) => i);
  const order = [];
  let cur = 0;
  while (people.length > 1) {
    cur = (cur + k - 1) % people.length;
    order.push(people[cur]);
    people.splice(cur, 1);
    if (cur >= people.length) cur = 0;
  }
  order.push(people[0]); // survivor is last element
  return order;
}

function JosephusViz() {
  const [n,    setN]    = useState(7);
  const [k,    setK]    = useState(3);
  const [step, setStep] = useState(0);

  const order          = computeJosephus(n, k);
  const survivor       = order[n - 1];
  const isFinal        = step === n;
  const eliminatedSet  = new Set(step > 0 ? order.slice(0, Math.min(step, n - 1)) : []);
  const justElim       = (step > 0 && step < n) ? order[step - 1] : null;

  const reset = (newN, newK) => { setN(newN); setK(newK); setStep(0); };

  const cx = 120, cy = 120, r = 80, nr = 14;

  return (
    <VizBox>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>People (n):</span>
          {[4,5,6,7,8,9].map(v => (
            <button key={v} onClick={() => reset(v, k)} style={{ width: 26, height: 26, borderRadius: 4, border: '1px solid', borderColor: n === v ? 'var(--color-border-info)' : 'var(--color-border-tertiary)', background: n === v ? 'var(--color-background-info)' : 'transparent', color: n === v ? 'var(--color-text-info)' : 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{v}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Step (k):</span>
          {[1,2,3,4,5].map(v => (
            <button key={v} onClick={() => reset(n, v)} style={{ width: 26, height: 26, borderRadius: 4, border: '1px solid', borderColor: k === v ? 'var(--color-border-warning)' : 'var(--color-border-tertiary)', background: k === v ? 'var(--color-background-warning)' : 'transparent', color: k === v ? 'var(--color-text-warning)' : 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{v}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <svg width={240} height={240} viewBox="0 0 240 240">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border-tertiary)" strokeWidth={1} strokeDasharray="4 3" />
          {Array.from({ length: n }, (_, i) => {
            const angle = (2 * Math.PI * i / n) - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            const isElim   = eliminatedSet.has(i);
            const isJust   = i === justElim;
            const isSurv   = isFinal && i === survivor;

            let nodeFill   = 'var(--color-background-info)';
            let nodeStroke = 'var(--color-border-info)';
            let nodeText   = 'var(--color-text-info)';
            if (isJust)  { nodeFill = 'var(--color-background-danger)'; nodeStroke = 'var(--color-border-danger)'; nodeText = 'var(--color-text-danger)'; }
            else if (isElim) { nodeFill = 'var(--color-background-tertiary)'; nodeStroke = 'var(--color-border-tertiary)'; nodeText = 'var(--color-text-tertiary)'; }
            else if (isSurv) { nodeFill = 'var(--color-background-success)'; nodeStroke = 'var(--color-border-success)'; nodeText = 'var(--color-text-success)'; }

            return (
              <g key={i}>
                <circle cx={x} cy={y} r={nr} style={{ fill: nodeFill, stroke: nodeStroke }} strokeWidth={1.5} />
                {isElim && !isJust && (
                  <>
                    <line x1={x-7} y1={y-7} x2={x+7} y2={y+7} stroke="var(--color-text-tertiary)" strokeWidth={1.5} opacity={0.6} />
                    <line x1={x+7} y1={y-7} x2={x-7} y2={y+7} stroke="var(--color-text-tertiary)" strokeWidth={1.5} opacity={0.6} />
                  </>
                )}
                <text x={x} y={y + 4} textAnchor="middle" style={{ fill: nodeText }} fontSize={11} fontFamily="var(--font-mono)" fontWeight={600}>{i}</text>
              </g>
            );
          })}
          <text x={cx} y={cy - 6} textAnchor="middle" style={{ fill: 'var(--color-text-tertiary)' }} fontSize={10} fontFamily="var(--font-mono)">{isFinal ? 'SURVIVOR' : `n=${n}, k=${k}`}</text>
          <text x={cx} y={cy + 10} textAnchor="middle" style={{ fill: isFinal ? 'var(--color-text-success)' : justElim !== null ? 'var(--color-text-danger)' : 'var(--color-text-tertiary)' }} fontSize={isFinal ? 15 : 11} fontFamily="var(--font-mono)" fontWeight={isFinal ? 700 : 400}>
            {isFinal ? `P${survivor} ★` : justElim !== null ? `✕ P${justElim}` : ''}
          </text>
        </svg>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: 7, letterSpacing: '0.06em' }}>ELIMINATION LOG</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, maxHeight: 190, overflowY: 'auto' }}>
            {Array.from({ length: Math.min(step, n - 1) }, (_, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 8px', background: i === step - 1 ? 'var(--color-background-danger)' : 'var(--color-background-secondary)', border: `0.5px solid ${i === step - 1 ? 'var(--color-border-danger)' : 'var(--color-border-tertiary)'}`, borderRadius: 4, fontSize: 11.5 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-tertiary)', minWidth: 26 }}>R{i+1}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: i === step - 1 ? 'var(--color-text-danger)' : 'var(--color-text-secondary)' }}>P{order[i]} eliminated</span>
              </div>
            ))}
            {isFinal && (
              <div style={{ padding: '6px 8px', background: 'var(--color-background-success)', border: '1px solid var(--color-border-success)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--color-text-success)' }}>
                ★ P{survivor} survives — jos({n},{k}) = {survivor}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 52, textAlign: 'center' }}>{step} / {n}</span>
        <button onClick={() => setStep(Math.min(n, step + 1))} disabled={step === n} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === n ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === n ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   PROBLEM CARD — reusable card for the Problems tab
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
   SECTION 1 — INTUITION & CALL STACK
══════════════════════════════════════════════════════ */
function SectionIntuition() {
  return (
    <div>
      <Note color="info" icon="ti-refresh">
        <strong>One-sentence definition:</strong> Recursion is a technique where a function solves a problem by calling itself on a strictly smaller version of the same problem, until reaching a base case that can be answered directly — no further calls needed.
      </Note>

      <H2>Direct vs Indirect Recursion</H2>
      <P>A function is <strong>directly recursive</strong> if it calls itself within its own body. It is <strong>indirectly recursive</strong> if it calls a chain of other functions that eventually call it back — forming a cycle.</P>
      <Grid cols={2}>
        <Card title="Direct Recursion" color="info">
          The function references itself. Straightforward call graph: one node with a self-loop. The overwhelming majority of DSA problems use this form.
        </Card>
        <Card title="Indirect Recursion" color="warning">
          A → B → C → A forms a multi-node cycle. Used to model interleaved state machines (e.g., tokenizers, mutually recursive grammars). Requires forward declarations in C++.
        </Card>
      </Grid>
      <Code>{{cpp: `// ── Direct Recursion ─────────────────────────────
int factorial(int n) {
    if (n == 0) return 1;          // base case
    return n * factorial(n - 1);   // calls itself
}

// ── Indirect Recursion (A calls B, B calls A) ──────
void funcA(int n);   // forward declaration required in C++

void funcB(int n) {
    if (n <= 0) return;
    cout << "B(" << n << ") ";
    funcA(n - 1);    // B calls A
}
void funcA(int n) {
    if (n <= 0) return;
    cout << "A(" << n << ") ";
    funcB(n - 1);    // A calls B  ← indirect cycle
}
// funcA(3) → "A(3) B(2) A(1)"`, python: `# ── Direct Recursion ──────────────────────────────
def factorial(n):
    if n == 0: return 1
    return n * factorial(n - 1)

# ── Indirect Recursion ────────────────────────────
# Python does NOT need forward declarations
def func_a(n):
    if n <= 0: return
    print(f"A({n})", end=' ')
    func_b(n - 1)

def func_b(n):
    if n <= 0: return
    print(f"B({n})", end=' ')
    func_a(n - 1)

# func_a(3) → "A(3) B(2) A(1)"`}}</Code>

      <H2>The Three Pillars of Every Recursive Function</H2>
      <Grid cols={3}>
        {[
          { n: '1', title: 'Base Case', color: 'success', icon: 'ti-anchor', body: 'The condition under which the function stops and returns a direct answer. Without a base case, recursion is infinite → stack overflow. Every possible input path must eventually reach it.' },
          { n: '2', title: 'Recursive Case', color: 'info', icon: 'ti-arrows-split-2', body: 'The part where the function calls itself on a smaller/simpler input. This is the "leap of faith" — write it assuming the sub-call returns the correct answer for the smaller problem.' },
          { n: '3', title: 'Progress Toward Base', color: 'warning', icon: 'ti-trending-down', body: 'Each call must move the problem strictly closer to the base case (e.g., n-1, n/2). If the argument does not shrink, the recursion never terminates.' },
        ].map(({ n, title, color, icon, body }) => (
          <div key={n} style={{ background: `var(--color-background-${color})`, border: `0.5px solid var(--color-border-${color})`, borderRadius: 'var(--border-radius-md)', padding: '12px 13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <i className={`ti ${icon}`} style={{ fontSize: 16, color: `var(--color-text-${color})` }} />
              <span style={{ fontWeight: 600, fontSize: 13, color: `var(--color-text-${color})` }}>{title}</span>
            </div>
            <div style={{ fontSize: 12.5, color: `var(--color-text-${color})`, lineHeight: 1.65 }}>{body}</div>
          </div>
        ))}
      </Grid>
      <Note color="warning" icon="ti-alert-triangle">
        <strong>The "Leap of Faith" principle:</strong> When writing the recursive case, do <em>not</em> mentally trace the entire call tree — trust the function's own specification. If <code>factorial(n)</code> is defined as "returns n!", then write <code>n * factorial(n-1)</code> by assuming <code>factorial(n-1)</code> returns <code>(n-1)!</code> correctly. The base case + inductive step take care of correctness automatically.
      </Note>

      <H2>The Call Stack — How Recursion Actually Executes</H2>
      <P>Every function call pushes a new <strong>stack frame</strong> onto the call stack — containing the function's local variables, parameters, and the return address. Recursion builds a tower of frames during <em>winding</em>, then destroys them during <em>unwinding</em>. Step through the example below.</P>
      <CallStackDemo />
      <Note color="danger" icon="ti-alert-circle">
        <strong>Stack overflow:</strong> The OS allocates a fixed stack size (typically 1–8 MB). For a recursion depth of <code>n = 10⁵</code>, with each frame using ~100 bytes, that's 10 MB — exceeding the limit. C++ crashes with a segfault; Python raises <code>RecursionError</code>. Solution: increase <code>sys.setrecursionlimit</code>, or convert to iteration.
      </Note>

      <H2>Visualizing Redundant Work — The Fibonacci Call Tree</H2>
      <P>A <strong>call tree</strong> maps every function invocation as a node, with sub-calls as children. The total number of nodes = total work performed. For naive Fibonacci, the tree exposes a critical flaw: the same subproblem is solved exponentially many times — the root cause of O(2ⁿ) complexity. Memoization (covered in DP module) collapses this to O(n).</P>
      <FibCallTree />

      <H2>Recursion vs Iteration — At a Glance</H2>
      <Table
        heads={["Criterion", "Recursion", "Iteration"]}
        rows={[
          ["Code clarity", "High for divide & conquer, trees, graphs", "Clearer for linear traversals"],
          ["Stack usage", "O(depth) — implicit call stack", "O(1) — no extra stack"],
          ["Overflow risk", "Yes — deep recursion can crash", "None"],
          ["Tracing / debugging", "Harder — must follow call tree", "Straightforward sequential steps"],
          ["Converting to iteration", "Always possible — use explicit stack", "Already iterative"],
          ["Best for", "Trees, DFS, backtracking, D&C", "Array scanning, BFS (with queue)"],
        ]}
      />

      <QA q="What happens if a recursive function has no base case?" a="It calls itself indefinitely, pushing stack frames until the call stack overflows. C++ raises a segmentation fault; Python raises <code>RecursionError: maximum recursion depth exceeded</code> (default limit: 1000). The program terminates abnormally. Always verify that every execution path reaches the base case." />
      <QA q="What is the difference between winding and unwinding in recursion?" a="<strong>Winding</strong> is the forward phase — the function keeps calling itself, pushing stack frames. Each frame waits for its sub-call to return. <strong>Unwinding</strong> begins once the base case is reached — frames are popped in LIFO order, each completing its pending work. For <code>factorial(4)</code>: winding pushes (4)→(3)→(2)→(1). Unwinding returns 1→2→6→24 back up the chain." />
      <QA q="Why does recursion have O(n) space complexity even without allocating any data structures?" a="Each stack frame stores local variables, function parameters, and the return address. For depth-n recursion, n frames are alive simultaneously at maximum depth. This implicit O(n) memory is consumed by the <em>call stack</em> itself — you don't declare it, but the OS allocates it. This is why recursion with large n can cause stack overflow even when the algorithm itself seems memory-light." />
      <QA q="Is all recursion expressible as iteration?" a="Yes — any recursive algorithm can be converted to an iterative one using an explicit stack data structure. DFS written recursively is equivalent to DFS written with an explicit stack. The trade-off is code readability: recursive DFS/backtracking is typically far cleaner. In practice, convert to iteration when you hit recursion depth limits or need O(1) stack space." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — TAIL RECURSION & COMPLEXITY ANALYSIS
══════════════════════════════════════════════════════ */
function SectionMechanics() {
  return (
    <div>
      <H2>Tail Recursion — Definition</H2>
      <Note color="info" icon="ti-bulb">
        A function is <strong>tail recursive</strong> if the recursive call is the <em>absolute last operation</em> performed — no computation happens after it returns. The result of the recursive call is returned directly without modification.
      </Note>
      <Grid cols={2}>
        <Card title="NOT Tail Recursive" color="danger">
          The multiplication <Mx>n * ...</Mx> is pending after the call returns. A frame must be kept alive to hold <Mx>n</Mx> for this deferred work.
          <Code lang="cpp">{`int fact(int n) {
    if (n == 0) return 1;
    // PENDING: n × (result)
    return n * fact(n - 1);
}`}</Code>
        </Card>
        <Card title="Tail Recursive" color="success">
          The accumulator <Mx>acc</Mx> carries the running product. Nothing is pending after the recursive call — the frame can be discarded.
          <Code lang="cpp">{`int fact(int n, int acc = 1) {
    if (n == 0) return acc;
    // LAST OP — pure tail call
    return fact(n - 1, n * acc);
}`}</Code>
        </Card>
      </Grid>

      <H2>Tail Call Elimination (TCE)</H2>
      <P>With TCE, the compiler <strong>reuses the current stack frame</strong> for the tail call instead of pushing a new one — converting O(n) stack space to O(1). This turns tail recursion into a loop at the machine level.</P>
      <Table
        heads={["Language / Compiler", "TCE Support", "Notes"]}
        rows={[
          ["C++ (GCC/Clang -O2)", "✓ Yes", "Compiler automatically eliminates tail calls with optimizations on"],
          ["Python (CPython)", "✗ No", "Guido's deliberate design choice — use iteration instead of deep recursion"],
          ["Python (PyPy)", "Partial", "JIT may optimize some patterns, not guaranteed"],
          ["Java (JVM)", "✗ No (standard)", "JVM spec doesn't mandate TCE; Kotlin/Scala have workarounds"],
          ["Haskell / Scheme / Erlang", "✓ Guaranteed", "Functional languages mandate TCE by specification"],
        ]}
      />

      <H2>Print N to 1 and 1 to N — The Pre/Post-Order Trick</H2>
      <P>The <em>position</em> of the print statement relative to the recursive call completely controls output order — no extra data structure needed.</P>
      <Code>{{cpp: `// Print N → 1  (PRE-ORDER: print before recursing)
void printNTo1(int n) {
    if (n == 0) return;
    cout << n << " ";         // print FIRST → during winding → N,N-1,...,1
    printNTo1(n - 1);
}

// Print 1 → N  (POST-ORDER: print after recursing)
void print1ToN(int n) {
    if (n == 0) return;
    print1ToN(n - 1);         // recurse to base FIRST
    cout << n << " ";         // print AFTER → during unwinding → 1,2,...,N
}`, python: `def print_n_to_1(n):
    if n == 0: return
    print(n, end=' ')         # print first → N, N-1, ..., 1
    print_n_to_1(n - 1)

def print_1_to_n(n):
    if n == 0: return
    print_1_to_n(n - 1)       # recurse first
    print(n, end=' ')         # print after → 1, 2, ..., N`}}</Code>

      <H2>Tail-Recursive Form of Print 1 to N</H2>
      <P>The post-order version above is NOT tail recursive (work happens after the call returns). Using an <strong>accumulator parameter</strong> <Mx>k</Mx> that tracks the current value to print, we restructure into a true tail call:</P>
      <Code>{{cpp: `// Tail-Recursive Print 1 to N
// k = accumulator, starts at 1, increments each call
// n = remaining count, decrements each call
void print1ToN(int n, int k = 1) {
    if (n == 0) return;          // printed all n numbers
    cout << k << " ";            // print current number (ascending)
    print1ToN(n - 1, k + 1);    // ← TRUE TAIL CALL (last op, O(1) stack with -O2)
}
// Trace: print1ToN(5) → print 1 → print1ToN(4,2) → print 2 → ...
// Output: 1 2 3 4 5`, python: `import sys
sys.setrecursionlimit(10**6)   # Python has no TCE — raise limit for large n

def print_1_to_n(n, k=1):
    if n == 0: return
    print(k, end=' ')
    print_1_to_n(n - 1, k + 1)   # conceptually tail-recursive (TCE NOT applied)
# Output: 1 2 3 4 5`}}</Code>

      <H2>Logarithmic Recursion Patterns</H2>
      <P>When each call <em>divides</em> its input (rather than subtracting 1), the call depth is logarithmic — O(log n) stack frames, O(log n) time. This is the fingerprint of binary search, fast exponentiation, and balanced tree traversals.</P>
      <Code>{{cpp: `// Returns ⌊log₂(n)⌋  — how many times can n be halved?
int logDepth(int n) {
    if (n == 1) return 0;           // base: can't halve 1
    return 1 + logDepth(n / 2);    // integer division
}
// logDepth(64) = 6  (64→32→16→8→4→2→1)

// Generalized: Returns ⌊logₘ(n)⌋
int logDepthM(int n, int m) {
    if (n < m) return 0;
    return 1 + logDepthM(n / m, m);
}
// logDepthM(81, 3) = 4  (81→27→9→3 — stops at 3 < 3? no, 1 < 3 yes)
// Actually: 81 → 27 → 9 → 3 → 1  = 4 divisions`, python: `def log_depth(n):
    if n == 1: return 0
    return 1 + log_depth(n // 2)

def log_depth_m(n, m):
    if n < m: return 0
    return 1 + log_depth_m(n // m, m)

import math
# Verify: log_depth_m(81, 3) == math.floor(math.log(81, 3)) == 4 ✓`}}</Code>
      <LogRecursionViz />

      <H2>Recursion Complexity Classification</H2>
      <Table
        heads={["Pattern", "Recurrence", "Complexity", "Canonical Example"]}
        rows={[
          ["Single call, O(1) work", "T(n) = T(n−1) + O(1)", "O(n)", "factorial, print 1..N"],
          ["Single call, O(n) work", "T(n) = T(n−1) + O(n)", "O(n²)", "insertion sort"],
          ["Halving, O(1) work", "T(n) = T(n/2) + O(1)", "O(log n)", "binary search, logDepth"],
          ["Halving, O(n) work", "T(n) = T(n/2) + O(n)", "O(n)", "quickselect expected"],
          ["Two calls, O(1) work", "T(n) = 2T(n−1) + O(1)", "O(2ⁿ)", "naive fib, subset enumeration"],
          ["Two calls, halving", "T(n) = 2T(n/2) + O(n)", "O(n log n)", "merge sort"],
          ["Two calls, halving O(1)", "T(n) = 2T(n/2) + O(1)", "O(n)", "binary tree traversal"],
        ]}
      />

      <QA q="What is the key insight that makes tail recursion convertible to a loop?" a="In tail recursion, the current stack frame's local variables are no longer needed after the recursive call — the only 'return' is to forward the sub-call's result unchanged. Since no state needs to be preserved, the compiler (with TCE) rewrites this as <em>goto top</em> — overwriting the current frame's parameters with the new values and jumping to the function's start. This is exactly what a while loop does." />
      <QA q="Why does the pre-order trick print N→1 and post-order print 1→N?" a="In pre-order, the print executes <em>before</em> the recursive call, so it runs during the <em>winding</em> phase (before the base case). Calls execute in the order: print(N), recurse → print(N-1), recurse → ... → print(1). In post-order, the print executes <em>after</em> the recursive call returns, so it runs during <em>unwinding</em>. The deepest frame (n=1) returns first, printing 1, then 2, ..., then N." />
      <QA q="For logDepth(n, m), what is the recurrence and its closed form?" a="The recurrence is T(n) = T(⌊n/m⌋) + 1 with T(k) = 0 for k &lt; m. Unrolling: after k divisions, we have T(n/mᵏ) + k. We stop when n/mᵏ &lt; m, i.e., k ≈ ⌊logₘ(n)⌋. Closed form: T(n) = ⌊logₘ(n)⌋ = O(log n). This same T(n) = T(n/2) + O(1) pattern governs binary search, and its O(log n) solution is a direct application of the Master Theorem (Case 2)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — CLASSIC RECURSIVE PROBLEMS
   Rope Cutting · Tower of Hanoi · Josephus
══════════════════════════════════════════════════════ */
function SectionClassics() {
  return (
    <div>

      {/* ─── Rope Cutting ─── */}
      <H2>Rope Cutting — Maximum Pieces</H2>
      <Note color="info" icon="ti-scissors">
        <strong>Problem:</strong> Given a rope of length <Mx>n</Mx> and three allowed cut lengths <Mx>a</Mx>, <Mx>b</Mx>, <Mx>c</Mx>, find the <strong>maximum number of pieces</strong> the rope can be cut into such that every piece has exactly one of those lengths. If no valid cutting exists, return <Mx>-1</Mx>.
      </Note>
      <P>At each step, try subtracting <Mx>a</Mx>, <Mx>b</Mx>, or <Mx>c</Mx> from the remaining length. Take the maximum result across the three choices. The <Mx>-1</Mx> sentinel propagates failure back up — any path that ends at negative <Mx>n</Mx> is invalid.</P>
      <Code>{{cpp: `// maxCuts(n, a, b, c) → maximum pieces, or -1 if impossible
int maxCuts(int n, int a, int b, int c) {
    if (n == 0) return 0;    // rope perfectly used — valid endpoint
    if (n <  0) return -1;   // overcut — this path is invalid

    int res = max({ maxCuts(n - a, a, b, c),
                    maxCuts(n - b, a, b, c),
                    maxCuts(n - c, a, b, c) });

    // If ALL three branches returned -1, propagate failure
    return res == -1 ? -1 : res + 1;
}

// maxCuts(5, 1, 2, 3) → 5   (five 1-unit cuts)
// maxCuts(5, 2, 2, 3) → 2   (2 + 3)
// maxCuts(7, 3, 5, 2) → 3   (2 + 2 + 3)
// maxCuts(4, 3, 5, 2) → 2   (2 + 2)`, python: `def max_cuts(n, a, b, c):
    if n == 0: return 0
    if n < 0:  return -1

    res = max(max_cuts(n - a, a, b, c),
              max_cuts(n - b, a, b, c),
              max_cuts(n - c, a, b, c))

    return -1 if res == -1 else res + 1`}}</Code>
      <Table
        heads={["Return condition", "Value returned", "Meaning"]}
        rows={[
          ["n == 0", "0", "Rope used up perfectly — valid terminal state"],
          ["n < 0", "-1", "Overcut — this branch of choices is invalid"],
          ["All sub-results == -1", "-1", "No valid combination from current n — propagate failure"],
          ["At least one sub-result ≥ 0", "max + 1", "Take the best valid branch, count this cut"],
        ]}
      />
      <Note color="warning" icon="ti-alert-triangle">
        <strong>The -1 propagation trap:</strong> A naive <code>return max(...) + 1</code> would compute <code>-1 + 1 = 0</code> for a failed branch, falsely treating it as a 0-piece valid solution. Always guard: <em>if the best valid sub-result is -1, the current state also returns -1</em>.
      </Note>

      {/* ─── Tower of Hanoi ─── */}
      <H2>Tower of Hanoi</H2>
      <Note color="info" icon="ti-stack-2">
        <strong>Problem:</strong> Move <Mx>n</Mx> disks from peg A to peg C using peg B as auxiliary. Rules: only one disk may be moved at a time, and a larger disk may never be placed on a smaller one. Find the minimum number of moves and print all moves.
      </Note>
      <P>The recursive decomposition is a textbook example of <em>trust-the-sub-call</em> reasoning: to move <Mx>n</Mx> disks from A to C, first move <Mx>n-1</Mx> disks from A to B (out of the way), then move the largest disk from A to C, then move the <Mx>n-1</Mx> disks from B to C.</P>
      <TOHVisualizer />
      <Code>{{cpp: `void TOH(int n, char A, char B, char C) {
    if (n == 1) {
        cout << "Move disk 1: " << A << " → " << C << "\\n";
        return;
    }
    TOH(n - 1, A, C, B);   // Step 1: move n-1 disks  A → B  (using C as aux)
    cout << "Move disk " << n << ": " << A << " → " << C << "\\n";
    TOH(n - 1, B, A, C);   // Step 3: move n-1 disks  B → C  (using A as aux)
}

// Recurrence:  T(n) = 2·T(n−1) + 1,  T(1) = 1
// Closed form: T(n) = 2ⁿ − 1   ← proven to be optimal (lower bound matches)`, python: `def toh(n, a='A', b='B', c='C'):
    if n == 1:
        print(f"Move disk 1: {a} → {c}")
        return
    toh(n - 1, a, c, b)    # A → B using C
    print(f"Move disk {n}: {a} → {c}")
    toh(n - 1, b, a, c)    # B → C using A

# toh(3) prints 7 moves (2³ − 1 = 7)`}}</Code>
      <Table
        heads={["n (disks)", "T(n) = 2ⁿ − 1", "Recurrence derivation"]}
        rows={[
          ["1", "1", "T(1) = 1 (base case)"],
          ["2", "3", "2·1 + 1 = 3"],
          ["3", "7", "2·3 + 1 = 7"],
          ["4", "15", "2·7 + 1 = 15"],
          ["n", "2ⁿ − 1", "T(n) = 2·T(n−1) + 1"],
        ]}
      />
      <Note color="success" icon="ti-math">
        <strong>Proof of optimality:</strong> The largest disk must move exactly once (A → C). Before that move, all n−1 smaller disks must be on B — requiring at least T(n−1) moves. After the largest disk moves, the n−1 disks must go from B to C — another T(n−1) moves. So T(n) ≥ 2·T(n−1) + 1. Our algorithm achieves exactly this bound, proving it optimal.
      </Note>

      {/* ─── Josephus ─── */}
      <H2>Josephus Problem</H2>
      <Note color="purple" icon="ti-circle-dot">
        <strong>Problem:</strong> <Mx>n</Mx> people stand in a circle numbered 0 to n−1. Starting from person 0, every <Mx>k</Mx>-th person is eliminated. Counting restarts from the next survivor after each elimination. Find the 0-indexed position of the last person remaining.
      </Note>
      <P>The elegant recursive solution uses a <strong>coordinate remapping</strong>: after the first elimination, renumber the remaining n−1 people starting from the person immediately after the eliminated one. The survivor's position in the smaller sub-problem maps back to the original circle by shifting and wrapping modulo n.</P>
      <JosephusViz />
      <Code>{{cpp: `// Recursive — O(n) time, O(n) stack
// Returns 0-indexed safe position for n people, step k
int jos(int n, int k) {
    if (n == 1) return 0;            // base: 1 person always survives at position 0
    return (jos(n - 1, k) + k) % n; // remap sub-problem position back to n-circle
}

// Derivation of (jos(n-1,k) + k) % n:
//   After eliminating person at index (k-1)%n, the next person becomes index 0
//   in the new n-1 circle. If the sub-problem survivor is at position p (in 0..n-2),
//   its original position = (p + k) % n  ← shift by k, wrap around n.

// Iterative equivalent — O(1) stack, safe for large n:
int josIter(int n, int k) {
    int pos = 0;                     // survivor position in 1-person circle = 0
    for (int i = 2; i <= n; i++) {
        pos = (pos + k) % i;         // extend from i-1 circle to i-circle
    }
    return pos;
}
// jos(7, 3) = josIter(7, 3) = 3`, python: `import sys
sys.setrecursionlimit(10**5)

def jos(n, k):
    if n == 1: return 0
    return (jos(n - 1, k) + k) % n

# Iterative (preferred — avoids RecursionError for large n)
def jos_iter(n, k):
    pos = 0
    for i in range(2, n + 1):
        pos = (pos + k) % i
    return pos

# jos(7, 3) == jos_iter(7, 3) == 3`}}</Code>
      <Note color="warning" icon="ti-info-circle">
        <strong>The mapping explained step by step:</strong> jos(1,k)=0. For jos(2,k): eliminate position (k−1)%2; the survivor maps to 0 in the sub-problem, shifted back by +k mod 2. For each n, we add one layer of position "un-shifting". The formula <Mx>(jos(n−1,k) + k) % n</Mx> is an exact coordinate transformation — not an approximation.
      </Note>

      <QA q="In Rope Cutting, why can't we just write return max(...) + 1 without the -1 guard?" a="Because -1 is our sentinel for 'this path leads to no valid cutting.' Without the guard, <code>-1 + 1 = 0</code> would be returned, which looks like a valid 0-piece solution — but it actually means failure. The guard ensures that if every sub-call returns -1 (all three lengths are invalid from current n), we propagate -1 rather than 0." />
      <QA q="Why is Tower of Hanoi considered provably optimal — can any algorithm do it in fewer than 2ⁿ-1 moves?" a="No. The proof is by induction on the lower bound: moving n disks requires at least 2T(n−1)+1 moves (shown above). Since our recursive algorithm achieves exactly this bound, no algorithm can do better. 2ⁿ−1 is both an upper bound (our algorithm) and a lower bound (the proof), making it the exact minimum." />
      <QA q="What does the Josephus formula jos(n,k) = (jos(n-1,k) + k) % n actually compute geometrically?" a="It performs a position translation in a circular coordinate system. After eliminating person at index (k−1)%n, the remaining people are renumbered 0 to n−2 starting from the next person. Position p in this new numbering corresponds to position (p + k) % n in the original numbering. The recursion builds up this translation layer by layer from n=1 to n=target." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — SUBSET SUM (INCLUDE / EXCLUDE PARADIGM)
══════════════════════════════════════════════════════ */
function SectionSubset() {
  return (
    <div>
      <Note color="info" icon="ti-math-symbols">
        <strong>Problem (Count Subsets):</strong> Given array <Mx>arr[0..n−1]</Mx> and target sum <Mx>S</Mx>, count the number of subsets whose elements sum to exactly <Mx>S</Mx>. Each element may be included at most once.
      </Note>

      <H2>The Include / Exclude Paradigm</H2>
      <P>Every element faces a binary decision at each recursive step: <strong>include</strong> it (subtract from remaining target, advance index) or <strong>exclude</strong> it (keep target unchanged, advance index). This generates a <em>binary decision tree</em> of depth n, with up to 2ⁿ leaf nodes — one for each possible subset.</P>
      <Grid cols={2}>
        <Card title="Include arr[i]" color="success">
          Add <Mx>arr[i]</Mx> to the current subset. Recurse with <Mx>target − arr[i]</Mx> and index <Mx>i+1</Mx>. If target reaches 0 at a leaf — count this subset.
        </Card>
        <Card title="Exclude arr[i]" color="warning">
          Skip <Mx>arr[i]</Mx>. Recurse with the same target and index <Mx>i+1</Mx>. The element is simply not part of this subset.
        </Card>
      </Grid>

      <H2>Recursion Tree — arr = [2, 3, 1], target = 3</H2>
      <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '12px 16px', overflowX: 'auto', marginBottom: '0.75rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8 }}>
          <div style={{ color: '#9CDCFE' }}>subsetCount([2,3,1], target=3, i=0)</div>
          <div>
            <span style={{ color: '#3D4460' }}>├── </span><span style={{ color: '#4EC9B0' }}>include 2</span><span style={{ color: '#7A8599' }}> → target=1, i=1</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>│   ├── </span><span style={{ color: '#4EC9B0' }}>include 3</span><span style={{ color: '#7A8599' }}> → target=−2, i=2  </span><span style={{ color: '#F44747' }}>✗ target &lt; 0</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>│   └── </span><span style={{ color: '#CE9178' }}>exclude 3</span><span style={{ color: '#7A8599' }}> → target=1, i=2</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>│       ├── </span><span style={{ color: '#4EC9B0' }}>include 1</span><span style={{ color: '#7A8599' }}> → target=0, i=3  </span><span style={{ color: '#4EC9B0' }}>✓ subset {'{'}{`2,1`}{'}'} counts!</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>│       └── </span><span style={{ color: '#CE9178' }}>exclude 1</span><span style={{ color: '#7A8599' }}> → target=1, i=3  </span><span style={{ color: '#7A8599' }}>✗ i=n, target≠0</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>└── </span><span style={{ color: '#CE9178' }}>exclude 2</span><span style={{ color: '#7A8599' }}> → target=3, i=1</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>    ├── </span><span style={{ color: '#4EC9B0' }}>include 3</span><span style={{ color: '#7A8599' }}> → target=0, i=2  </span><span style={{ color: '#4EC9B0' }}>✓ subset {'{'}{`3`}{'}'} counts!</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>    └── </span><span style={{ color: '#CE9178' }}>exclude 3</span><span style={{ color: '#7A8599' }}> → target=3, i=2</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>        ├── </span><span style={{ color: '#4EC9B0' }}>include 1</span><span style={{ color: '#7A8599' }}> → target=2, i=3  </span><span style={{ color: '#7A8599' }}>✗</span>
          </div>
          <div>
            <span style={{ color: '#3D4460' }}>        └── </span><span style={{ color: '#CE9178' }}>exclude 1</span><span style={{ color: '#7A8599' }}> → target=3, i=3  </span><span style={{ color: '#7A8599' }}>✗</span>
          </div>
          <div style={{ color: '#6A9955', marginTop: 6 }}>{'// Result: 2 subsets  →  {2,1} and {3}'}</div>
        </div>
      </div>

      <H2>Implementation</H2>
      <Code>{{cpp: `// subsetCount(arr, n, target, i)
// Returns: number of subsets of arr[i..n-1] that sum to target
int subsetCount(int arr[], int n, int target, int i = 0) {
    // Base 1: reached target — valid subset found
    if (target == 0) return 1;
    // Base 2: exhausted array OR target went negative (invalid)
    if (i == n || target < 0) return 0;

    int include = subsetCount(arr, n, target - arr[i], i + 1);
    int exclude = subsetCount(arr, n, target,           i + 1);

    return include + exclude;
}

// int arr[] = {2, 3, 1};  subsetCount(arr, 3, 3) → 2`, python: `def subset_count(arr, target, i=0):
    n = len(arr)
    if target == 0: return 1
    if i == n or target < 0: return 0

    include = subset_count(arr, target - arr[i], i + 1)
    exclude = subset_count(arr, target,           i + 1)

    return include + exclude

# subset_count([2, 3, 1], 3) → 2`}}</Code>

      <H2>Complexity Analysis</H2>
      <Table
        heads={["Metric", "Naive Recursion", "With Memoization"]}
        rows={[
          ["Time complexity", "O(2ⁿ) — explore all subsets", "O(n × S) — each (i, target) pair computed once"],
          ["Space (stack)", "O(n) — recursion depth", "O(n × S) — memo table + O(n) stack"],
          ["Overlapping subproblems?", "Yes — (i=2, target=1) may be reached from multiple paths", "Memoize on (i, remaining_target)"],
          ["When is memoization worth it?", "When n > ~20 and many repeated sub-states", "Always for n > 20 and integer elements"],
        ]}
      />
      <Note color="success" icon="ti-trending-up">
        The naive recursive solution here is the <em>foundation</em> of all subset-sum variants. Once you internalize the include/exclude tree, converting to <strong>top-down DP</strong> (<code>@lru_cache</code>) or <strong>bottom-up DP table</strong> is a mechanical transformation — covered fully in the Dynamic Programming module.
      </Note>

      <QA q="Why must we check target == 0 BEFORE i == n?" a="If an element has value 0 and target is already 0, we want to count it as a valid subset immediately and return 1. If we checked <code>i == n</code> first, we'd only count it at the leaves — missing the early return. More importantly, checking target first ensures correctness regardless of element values, including zeros." />
      <QA q="What changes if elements can be reused — the unbounded subset sum variant?" a="In the include branch, pass <code>i</code> instead of <code>i + 1</code>: <code>subsetCount(arr, n, target - arr[i], i)</code>. This allows the same element to be used multiple times. Now the base cases matter more: <code>target &lt; 0</code> terminates since the include branch never advances <code>i</code>. This variant is equivalent to the Coin Change problem." />
      <QA q="How does this generalize to 'find one valid subset' (exists) vs 'count all' vs 'find all subsets'?" a="<strong>Exists:</strong> return <code>include || exclude</code> (short-circuit on first match). <strong>Count:</strong> return <code>include + exclude</code> (our current version). <strong>Find all:</strong> pass a current-subset list, append arr[i] in the include branch, add the full list to results when target=0. The tree structure is identical; only what you <em>do</em> at each node changes." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — PROBLEMS (6 curated problems)
══════════════════════════════════════════════════════ */
function SectionProblems() {
  return (
    <div>
      <Note color="purple" icon="ti-tournament">
        6 curated problems — IIT OA screening style (Q1–Q4) and LeetCode Hard/Medium equivalents (Q5–Q6). Each isolates a specific recursion pattern. <strong>Attempt independently before revealing the solution.</strong>
      </Note>

      <ProblemCard
        num={1}
        title="Print 1 to N — Three Recursive Approaches"
        difficulty="IIT OA"
        tags={["Warm-up", "Pre/Post Order"]}
        statement="Given integer N, implement <strong>three</strong> recursive functions: (a) print N down to 1, (b) print 1 up to N using post-order trick, (c) print 1 up to N using a tail-recursive accumulator — no loops in any version."
        constraints={["1 ≤ N ≤ 10⁴", "No loops (for/while/do-while) permitted", "C++: tail-recursive version should be O(1) stack with -O2"]}
        examples={[
          { input: "N = 5", output: "N→1: 5 4 3 2 1\n1→N: 1 2 3 4 5\nTail-rec: 1 2 3 4 5" },
        ]}
        approach="(a) Pre-order: print before recursing → prints N, N-1, ..., 1 during winding. (b) Post-order: recurse first, print after → prints 1, 2, ..., N during unwinding. (c) Tail-recursive: add accumulator k=1, decrement n, increment k — the call is the final operation enabling TCE in C++."
        code={{cpp: `// (a) Print N → 1  — pre-order
void printNTo1(int n) {
    if (n == 0) return;
    cout << n << " ";         // print BEFORE recursing
    printNTo1(n - 1);
}

// (b) Print 1 → N  — post-order (NOT tail-recursive)
void print1ToN_v1(int n) {
    if (n == 0) return;
    print1ToN_v1(n - 1);      // recurse FIRST
    cout << n << " ";         // print AFTER (during unwinding)
}

// (c) Print 1 → N  — tail-recursive accumulator
// k = current value to print, n = remaining count
void print1ToN_v2(int n, int k = 1) {
    if (n == 0) return;
    cout << k << " ";
    print1ToN_v2(n - 1, k + 1);  // ← TAIL CALL (O(1) stack with TCE)
}`, python: `import sys
sys.setrecursionlimit(10**6)

# (a) Print N → 1
def print_n_to_1(n):
    if n == 0: return
    print(n, end=' ')
    print_n_to_1(n - 1)

# (b) Print 1 → N — post-order
def print_1_to_n_v1(n):
    if n == 0: return
    print_1_to_n_v1(n - 1)
    print(n, end=' ')

# (c) Print 1 → N — tail-recursive form
def print_1_to_n_v2(n, k=1):
    if n == 0: return
    print(k, end=' ')
    print_1_to_n_v2(n - 1, k + 1)`}}
      />

      <ProblemCard
        num={2}
        title="Binary Representation Without Built-ins"
        difficulty="OA Medium"
        tags={["Logarithmic Recursion", "Bit Math"]}
        statement="Given a non-negative integer N, print its binary representation using <strong>recursion only</strong>. Do not use <code>bin()</code>, <code>bitset</code>, loops, or string reversal of any kind. The output must have no leading zeros (except when N = 0)."
        constraints={["0 ≤ N ≤ 10⁹", "Recursion depth: O(log₂ N)", "No loops or built-in converters"]}
        examples={[
          { input: "N = 13", output: "1101", note: "13 = 8+4+1 = 1101₂" },
          { input: "N = 8",  output: "1000" },
          { input: "N = 0",  output: "0" },
        ]}
        approach="Key insight: N % 2 gives the current (least significant) bit; N / 2 moves to the next higher bit. To print MSB first, use post-order: recurse on N/2 first, then print N%2 on the way back. Recursion depth = ⌊log₂ N⌋. Handle N=0 separately to avoid empty output."
        code={{cpp: `void printBinary(int n) {
    if (n == 0) return;
    printBinary(n / 2);    // recurse on higher bits FIRST (post-order)
    cout << (n % 2);       // print current bit AFTER → MSB appears first ✓
}

void solve(int n) {
    if (n == 0) { cout << 0; return; }   // edge case: N=0 → output "0"
    printBinary(n);
}

// Trace for n=13 (binary 1101):
// printBinary(13) → printBinary(6) → printBinary(3) → printBinary(1) → printBinary(0)
// Unwind: print 1 → print 1 → print 0 → print 1  ⟹  "1101" ✓`, python: `def print_binary(n):
    if n == 0: return
    print_binary(n // 2)   # recurse on higher bits first
    print(n % 2, end='')   # print current bit on unwind → MSB first

def solve(n):
    if n == 0: print(0, end=''); return
    print_binary(n)

# solve(13) → "1101"  |  solve(0) → "0"  |  solve(8) → "1000"`}}
      />

      <ProblemCard
        num={3}
        title="Palindrome Check Using Recursion"
        difficulty="OA Medium"
        tags={["Two-Pointer Recursion", "String"]}
        statement="Given a string S, determine whether it is a palindrome using <strong>only recursion</strong>. No built-in <code>reverse()</code>, slicing tricks (<code>[::-1]</code>), or explicit loops. Return <code>true</code> if palindrome, <code>false</code> otherwise."
        constraints={["1 ≤ |S| ≤ 10⁵", "S contains only lowercase letters", "O(n) time, O(n) stack space"]}
        examples={[
          { input: 'S = "racecar"', output: "true" },
          { input: 'S = "abcba"',   output: "true" },
          { input: 'S = "hello"',   output: "false", note: 'Mismatch: "h" ≠ "o"' },
          { input: 'S = "a"',       output: "true",  note: "Single character is always palindrome" },
        ]}
        approach="Maintain two indices: start (left) and end (right). At each step check if S[start] == S[end]. If not, immediately return false. If yes, recurse inward: start+1, end-1. Base case: start >= end — all characters matched. The recursion mirrors the two-pointer iterative approach."
        code={{cpp: `bool isPalindrome(const string& s, int start, int end) {
    if (start >= end) return true;           // base: pointers crossed → palindrome
    if (s[start] != s[end]) return false;    // mismatch — stop immediately
    return isPalindrome(s, start + 1, end - 1);  // check inner substring
}

// Wrapper (called externally)
bool check(const string& s) {
    return isPalindrome(s, 0, (int)s.size() - 1);
}

// Trace: "racecar" (s[0]='r', s[6]='r' → match)
//                  (s[1]='a', s[5]='a' → match)
//                  (s[2]='c', s[4]='c' → match)
//                  (s[3]='e' → start=end=3 → base case → true)`, python: `def is_palindrome(s, start=0, end=None):
    if end is None: end = len(s) - 1

    if start >= end: return True
    if s[start] != s[end]: return False
    return is_palindrome(s, start + 1, end - 1)

# is_palindrome("racecar") → True
# is_palindrome("hello")   → False
# Time: O(n/2) = O(n)  |  Stack: O(n/2) frames`}}
      />

      <ProblemCard
        num={4}
        title="Rope Cutting — Maximum Pieces"
        difficulty="OA Hard"
        tags={["Recursive Enumeration", "Memoization"]}
        statement="Given a rope of length <strong>N</strong> and three allowed cut lengths <strong>a</strong>, <strong>b</strong>, <strong>c</strong>, return the <strong>maximum number of pieces</strong> it can be cut into such that every piece has length exactly a, b, or c and there is <strong>no remainder</strong>. Return <code>-1</code> if no valid cutting is possible."
        constraints={["1 ≤ N ≤ 10⁵", "1 ≤ a, b, c ≤ N", "For N > 10³: add memoization (O(N) time)"]}
        examples={[
          { input: "N=5, a=1, b=2, c=3", output: "5",  note: "5 cuts of length 1" },
          { input: "N=5, a=2, b=2, c=3", output: "2",  note: "2 + 3 = 5" },
          { input: "N=7, a=3, b=5, c=2", output: "3",  note: "2+2+3 = 7 → 3 pieces" },
          { input: "N=4, a=3, b=5, c=7", output: "-1", note: "No valid combination sums to 4" },
        ]}
        approach="Greedy fails (can't always pick the largest). Recursive enumeration: at each n, try subtracting a, b, c and take max. Return -1 for negative n (overcut). The -1 guard: only add +1 if at least one branch ≥ 0. Add a hash map memo for n > 10³."
        code={{cpp: `#include <unordered_map>
unordered_map<int, int> memo;

int maxCuts(int n, int a, int b, int c) {
    if (n == 0) return 0;
    if (n < 0)  return -1;
    if (memo.count(n)) return memo[n];

    int res = max({ maxCuts(n - a, a, b, c),
                    maxCuts(n - b, a, b, c),
                    maxCuts(n - c, a, b, c) });

    return memo[n] = (res == -1 ? -1 : res + 1);
}

// Reset memo before each test case: memo.clear();
// Time: O(N)  |  Space: O(N)`, python: `from functools import lru_cache

def max_cuts(n, a, b, c):
    @lru_cache(maxsize=None)
    def helper(rem):
        if rem == 0: return 0
        if rem < 0:  return -1
        res = max(helper(rem-a), helper(rem-b), helper(rem-c))
        return -1 if res == -1 else res + 1
    return helper(n)

# max_cuts(7, 3, 5, 2) → 3
# max_cuts(4, 3, 5, 7) → -1`}}
      />

      <ProblemCard
        num={5}
        title="Josephus Problem — Find the Safe Position"
        difficulty="LC Hard"
        tags={["Circular", "Mathematical Recursion"]}
        statement="<strong>n</strong> people stand in a circle numbered <strong>0 to n−1</strong>. Starting from person 0, every <strong>k-th</strong> person is eliminated. Counting restarts from the next person after each elimination. Return the <strong>0-indexed position</strong> of the last survivor."
        constraints={["1 ≤ n ≤ 10⁴", "1 ≤ k ≤ 10⁴", "Return 0-indexed position"]}
        examples={[
          { input: "n=5, k=2", output: "2", note: "Elimination order: 1→3→0→4, survivor: P2" },
          { input: "n=7, k=3", output: "3", note: "See Josephus visualizer above" },
          { input: "n=1, k=1", output: "0" },
        ]}
        approach="Recursive formula: jos(1,k)=0; jos(n,k)=(jos(n-1,k)+k)%n. After eliminating the k-th person, renumber remaining 0..n-2 from the next person. Sub-problem survivor at position p maps back via (p+k)%n. For large n, convert to the iterative form to avoid stack overflow."
        code={{cpp: `// Recursive  — O(n) time, O(n) stack
int jos(int n, int k) {
    if (n == 1) return 0;
    return (jos(n - 1, k) + k) % n;
}

// Iterative  — O(n) time, O(1) stack  ← use this for large n
int josIter(int n, int k) {
    int pos = 0;
    for (int i = 2; i <= n; i++)
        pos = (pos + k) % i;
    return pos;
}

// jos(7, 3)     = josIter(7, 3) = 3
// jos(5, 2)     = josIter(5, 2) = 2
// josIter(10000, 7) = safe, josRec(10000, 7) may stack overflow in C++`, python: `import sys
sys.setrecursionlimit(15000)

def jos(n, k):
    if n == 1: return 0
    return (jos(n - 1, k) + k) % n

# Iterative (preferred in Python — no TCE)
def jos_iter(n, k):
    pos = 0
    for i in range(2, n + 1):
        pos = (pos + k) % i
    return pos

# jos(7, 3) → 3  |  jos_iter(10000, 7) → safe`}}
      />

      <ProblemCard
        num={6}
        title="Count Subsets with Given Sum"
        difficulty="LC Medium"
        tags={["Include/Exclude", "DP Precursor"]}
        statement="Given an integer array <code>arr</code> of length <strong>n</strong> and a non-negative integer <strong>target</strong>, return the <strong>count of distinct subsets</strong> of <code>arr</code> that sum to exactly <code>target</code>. Each element may appear in a subset at most once. Two subsets are distinct if they differ in at least one element's index."
        constraints={["1 ≤ n ≤ 20 (pure recursion)", "0 ≤ arr[i] ≤ 100", "0 ≤ target ≤ 10⁴", "Add @lru_cache for n up to 10³"]}
        examples={[
          { input: "arr=[2,3,1], target=3",      output: "2", note: "Subsets: {2,1} and {3}" },
          { input: "arr=[1,2,3,3], target=6",    output: "3", note: "Subsets: {1,2,3₁}, {1,2,3₂}, {3,3}" },
          { input: "arr=[0,0,0], target=0",       output: "8", note: "All 2³=8 subsets sum to 0" },
        ]}
        approach="Pure include/exclude: at index i, either include arr[i] (reduce target) or skip it. Base: target==0 → count 1; i==n or target<0 → count 0. For n≤20 pure recursion is O(2ⁿ)=O(10⁶). For larger n, add memoization on (i, target) for O(n×target) time — this is the exact structure of the 2D DP table in the DP module."
        code={{cpp: `// Pure recursion — O(2ⁿ), suitable for n ≤ 20
int subsetCount(vector<int>& arr, int n, int target, int i = 0) {
    if (target == 0) return 1;
    if (i == n || target < 0) return 0;
    return subsetCount(arr, n, target - arr[i], i + 1)   // include arr[i]
         + subsetCount(arr, n, target,           i + 1);  // exclude arr[i]
}

// With memoization — O(n × target) time, O(n × target) space
#include <map>
map<pair<int,int>, int> dp;

int subsetMemo(vector<int>& arr, int n, int target, int i = 0) {
    if (target == 0) return 1;
    if (i == n || target < 0) return 0;
    auto key = pair<int,int>{i, target};
    if (dp.count(key)) return dp[key];
    return dp[key] = subsetMemo(arr, n, target - arr[i], i + 1)
                   + subsetMemo(arr, n, target,           i + 1);
}`, python: `from functools import lru_cache

def count_subsets(arr, target):
    n = len(arr)

    @lru_cache(maxsize=None)
    def dp(i, rem):
        if rem == 0: return 1
        if i == n or rem < 0: return 0
        return dp(i + 1, rem - arr[i]) + dp(i + 1, rem)

    return dp(0, target)

# count_subsets([2, 3, 1], 3) → 2
# count_subsets([1, 2, 3, 3], 6) → 3
# count_subsets([0, 0, 0], 0) → 8`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT — tab structure + page header
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "intuition", label: "Intuition & Call Stack" },
  { id: "mechanics", label: "Tail Recursion" },
  { id: "classics",  label: "Classic Problems" },
  { id: "subset",    label: "Subset Sum" },
  { id: "problems",  label: "Problems" },
];

export default function Recursion() {
  const [active, setActive] = useState("intuition");
  const map = {
    intuition: <SectionIntuition />,
    mechanics: <SectionMechanics />,
    classics:  <SectionClassics />,
    subset:    <SectionSubset />,
    problems:  <SectionProblems />,
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 10</div>
        <h1 className="page-header-title">Recursion</h1>
        <p className="page-header-subtitle">
          Direct &amp; Indirect · Tail Recursion &amp; TCE · Rope Cutting · Tower of Hanoi · Josephus · Subset Sum
        </p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={3} />
    </div>
  );
}
