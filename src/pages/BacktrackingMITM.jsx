import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx, Math as KaTeX } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   STEP BUILDERS — computed once at module load
══════════════════════════════════════════════════════ */

/* Subset generation for [1,2,3] — include/exclude tree */
function buildSubsetSteps(arr) {
  const steps = [];
  const cur = [];
  const emitted = [];

  function bt(idx) {
    if (idx === arr.length) {
      const snap = [...cur];
      emitted.push(snap);
      steps.push({ cur: snap, emitted: emitted.map(e => [...e]), action: 'emit', depth: idx,
        desc: `✓  Emit: {${snap.length ? snap.join(', ') : '∅'}}  —  ${emitted.length} subset${emitted.length > 1 ? 's' : ''} found` });
      return;
    }
    cur.push(arr[idx]);
    steps.push({ cur: [...cur], emitted: emitted.map(e => [...e]), action: 'include', elem: arr[idx], depth: idx,
      desc: `Include ${arr[idx]}  →  current = [${[...cur].join(', ')}]` });
    bt(idx + 1);
    cur.pop();
    steps.push({ cur: [...cur], emitted: emitted.map(e => [...e]), action: 'exclude', elem: arr[idx], depth: idx,
      desc: `Backtrack: exclude ${arr[idx]}  →  current = [${cur.join(', ') || '∅'}]` });
    bt(idx + 1);
  }

  steps.push({ cur: [], emitted: [], action: 'init', depth: 0,
    desc: `Generate all subsets of [${arr.join(', ')}]. At each index: choose INCLUDE or EXCLUDE.` });
  bt(0);
  return steps;
}
const SS_STEPS = buildSubsetSteps([1, 2, 3]);

/* N-Queens for N=4 */
function buildNQueensSteps(n) {
  const steps = [];
  const queens = [];
  let solCount = 0;

  const isValid = (row, col) => {
    for (let r = 0; r < queens.length; r++) {
      if (queens[r] === col || Math.abs(r - row) === Math.abs(queens[r] - col)) return false;
    }
    return true;
  };

  const conflictReason = (row, col) => {
    for (let r = 0; r < queens.length; r++) {
      if (queens[r] === col)                                  return `same column as row ${r}`;
      if (Math.abs(r - row) === Math.abs(queens[r] - col))   return `diagonal from (${r},${queens[r]})`;
    }
    return 'conflict';
  };

  function bt(row) {
    if (row === n) {
      solCount++;
      steps.push({ queens: [...queens], action: 'solution', solCount,
        desc: `✓ Solution ${solCount}: queens at columns [${queens.join(', ')}]` });
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        queens.push(col);
        steps.push({ queens: [...queens], action: 'place', row, col, solCount,
          desc: `Row ${row}: place queen at col ${col}` });
        bt(row + 1);
        queens.pop();
        steps.push({ queens: [...queens], action: 'backtrack', row, col, solCount,
          desc: `Row ${row}: remove queen from col ${col} → backtrack` });
      } else {
        steps.push({ queens: [...queens], action: 'conflict', row, col, solCount,
          desc: `(${row},${col}): ${conflictReason(row, col)} → skip` });
      }
    }
  }

  steps.push({ queens: [], action: 'init', solCount: 0,
    desc: `N-Queens (n=${n}): place one queen per row, no two queens share column or diagonal.` });
  bt(0);
  return steps;
}
const NQ_STEPS = buildNQueensSteps(4);

/* Meet in the Middle data — subset sum, arr=[1..6], target=10 */
const MITM_LEFT = [1, 2, 3], MITM_RIGHT = [4, 5, 6], MITM_TARGET = 10;
function allSubsetSums(arr) {
  return Array.from({ length: 1 << arr.length }, (_, mask) => {
    const elems = arr.filter((_, i) => mask & (1 << i));
    return { elems, sum: elems.reduce((a, b) => a + b, 0), mask };
  });
}
const MITM_L_SUMS  = allSubsetSums(MITM_LEFT);
const MITM_R_SUMS  = allSubsetSums(MITM_RIGHT);
const MITM_R_SORTED = [...MITM_R_SUMS].sort((a, b) => a.sum - b.sum);

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — SUBSET BACKTRACKING TREE
   [1,2,3] — include/exclude with emitted subsets
══════════════════════════════════════════════════════ */
function BacktrackingSubsetsViz() {
  const [step, setStep] = useState(0);
  const s = SS_STEPS[Math.min(step, SS_STEPS.length - 1)];

  const ACTION_CLR = { init: null, include: 'success', exclude: 'warning', emit: 'info' };
  const ac = ACTION_CLR[s.action];

  return (
    <VizBox>
      {/* Status */}
      <div style={{ marginBottom: 14, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {ac && <span style={{ padding: '2px 9px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: `var(--color-background-${ac})`, color: `var(--color-text-${ac})`, border: `1px solid var(--color-border-${ac})`, whiteSpace: 'nowrap' }}>
          {s.action === 'include' ? 'Include ✓' : s.action === 'exclude' ? 'Backtrack ↩' : s.action === 'emit' ? 'Emit ★' : ''}
        </span>}
        <span style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>{s.desc}</span>
      </div>

      {/* Current subset indicator */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>CURRENT SUBSET BEING BUILT</div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', minHeight: 40, alignItems: 'center' }}>
          {s.cur.length === 0
            ? <span style={{ padding: '6px 14px', borderRadius: 8, border: '1px dashed var(--color-border-tertiary)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-tertiary)' }}>∅</span>
            : s.cur.map((v, i) => (
              <div key={i} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid var(--color-border-success)', background: 'var(--color-background-success)', fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: 'var(--color-text-success)' }}>{v}</div>
            ))
          }
        </div>
      </div>

      {/* Emitted subsets */}
      {s.emitted.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>SUBSETS FOUND SO FAR ({s.emitted.length} / 8)</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {s.emitted.map((e, i) => {
              const isLatest = s.action === 'emit' && i === s.emitted.length - 1;
              return (
                <div key={i} style={{ padding: '3px 10px', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 12, background: isLatest ? 'var(--color-background-info)' : 'var(--color-background-secondary)', border: `1px solid ${isLatest ? 'var(--color-border-info)' : 'var(--color-border-secondary)'}`, color: isLatest ? 'var(--color-text-info)' : 'var(--color-text-secondary)', fontWeight: isLatest ? 700 : 400, transition: 'all 0.15s' }}>
                  {'{' + (e.length ? e.join(',') : '∅') + '}'}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Depth indicator */}
      {s.depth < 3 && (
        <div style={{ display: 'flex', gap: 4, marginBottom: 14, alignItems: 'center', fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--color-text-tertiary)' }}>Deciding on element:</span>
          {[1, 2, 3].map((v, i) => (
            <div key={i} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, border: '1px solid', borderColor: i === s.depth && s.action !== 'emit' && s.action !== 'init' ? (s.action === 'include' ? 'var(--color-border-success)' : 'var(--color-border-warning)') : 'var(--color-border-secondary)', background: i === s.depth && s.action !== 'emit' && s.action !== 'init' ? (s.action === 'include' ? 'var(--color-background-success)' : 'var(--color-background-warning)') : 'var(--color-background-secondary)', color: i === s.depth ? (s.action === 'include' ? 'var(--color-text-success)' : 'var(--color-text-warning)') : 'var(--color-text-secondary)', fontWeight: i === s.depth ? 700 : 400, fontSize: 13 }}>{v}</div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['← Prev', () => setStep(Math.max(0, step - 1)), step === 0], ['Next →', () => setStep(Math.min(SS_STEPS.length - 1, step + 1)), step === SS_STEPS.length - 1]].map(([l, a, d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: d ? 'not-allowed' : 'pointer', fontSize: 12, opacity: d ? 0.4 : 1 }}>{l}</button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 72, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {SS_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
        <button onClick={() => setStep(SS_STEPS.length - 1)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — N-QUEENS BOARD VISUALIZER  (N=4)
   Shows board state at each step: place/conflict/backtrack/solution
══════════════════════════════════════════════════════ */
function NQueensViz() {
  const N = 4;
  const [step, setStep] = useState(0);
  const s = NQ_STEPS[Math.min(step, NQ_STEPS.length - 1)];

  const ACTION_CLR = { init: null, place: 'success', conflict: 'danger', backtrack: 'warning', solution: 'info' };
  const ac = ACTION_CLR[s.action];

  // Compute attacked cells by current queens
  const attacked = new Set();
  for (let r = 0; r < s.queens.length; r++) {
    const c = s.queens[r];
    for (let row = 0; row < N; row++) {
      attacked.add(`${row},${c}`);
      const d = row - r;
      if (c + d >= 0 && c + d < N) attacked.add(`${row},${c + d}`);
      if (c - d >= 0 && c - d < N) attacked.add(`${row},${c - d}`);
    }
  }

  const isSolutionStep = s.action === 'solution';
  const conflictCell = s.action === 'conflict' ? `${s.row},${s.col}` : null;

  return (
    <VizBox>
      <div style={{ marginBottom: 14, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {ac && <span style={{ padding: '2px 9px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: `var(--color-background-${ac})`, color: `var(--color-text-${ac})`, border: `1px solid var(--color-border-${ac})`, whiteSpace: 'nowrap' }}>
          {s.action === 'place' ? 'Place ✓' : s.action === 'conflict' ? 'Conflict ✗' : s.action === 'backtrack' ? 'Backtrack ↩' : s.action === 'solution' ? `Solution ${s.solCount} ★` : ''}
        </span>}
        <span style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>{s.desc}</span>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Board */}
        <div>
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 3, border: '2px solid var(--color-border-secondary)', borderRadius: 6, padding: 6, background: 'var(--color-background-secondary)' }}>
            {Array.from({ length: N }, (_, row) => (
              <div key={row} style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: N }, (_, col) => {
                  const key = `${row},${col}`;
                  const hasQueen  = row < s.queens.length && s.queens[row] === col;
                  const isConflict = key === conflictCell;
                  const isAttack   = attacked.has(key) && !hasQueen && !isConflict;
                  const isChecker  = (row + col) % 2 === 0;

                  let bg = isChecker ? '#1E2233' : '#161A27';
                  let border = 'transparent';
                  if (hasQueen && isSolutionStep) { bg = 'var(--color-background-info)'; border = 'var(--color-border-info)'; }
                  else if (hasQueen)  { bg = 'var(--color-background-success)'; border = 'var(--color-border-success)'; }
                  else if (isConflict){ bg = 'var(--color-background-danger)';  border = 'var(--color-border-danger)'; }
                  else if (isAttack)  { bg = s.queens.length > 0 ? 'rgba(244,71,71,0.12)' : 'inherit'; }

                  return (
                    <div key={col} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, background: bg, border: `1.5px solid ${border}`, fontSize: 22, transition: 'all 0.15s' }}>
                      {hasQueen ? '♛' : isConflict ? '✗' : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>QUEENS PLACED</div>
          {s.queens.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
              {s.queens.map((col, row) => (
                <div key={row} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--color-text-tertiary)', minWidth: 40 }}>Row {row}:</span>
                  <span style={{ color: 'var(--color-text-info)' }}>col {col}</span>
                </div>
              ))}
            </div>
          ) : <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>Board is empty</div>}
          <div style={{ padding: '7px 10px', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 11.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
            Solutions: <strong style={{ color: 'var(--color-text-success)' }}>{s.solCount}</strong> / 2
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
        {[['← Prev', () => setStep(Math.max(0, step - 1)), step === 0], ['Next →', () => setStep(Math.min(NQ_STEPS.length - 1, step + 1)), step === NQ_STEPS.length - 1]].map(([l, a, d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: d ? 'not-allowed' : 'pointer', fontSize: 12, opacity: d ? 0.4 : 1 }}>{l}</button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 80, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {NQ_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
        <button onClick={() => setStep(NQ_STEPS.length - 1)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — MEET IN THE MIDDLE
   arr=[1..6], target=10. 4-phase visual:
   Split → Left sums → Sort right → Search
══════════════════════════════════════════════════════ */
function MeetInMiddleViz() {
  const [phase, setPhase] = useState(0);

  const PHASE_LABELS = ['Split', 'Enumerate Halves', 'Sort Right', 'Search & Match'];
  const PHASE_DESC = [
    `Split [1,2,3,4,5,6] into LEFT=[1,2,3] and RIGHT=[4,5,6]. Brute force: O(2⁶)=64 combinations. MITM: O(2³+2³)=16 subset enumerations.`,
    `Enumerate all 2³=8 subset sums for each half independently. Total: 16 operations instead of 64.`,
    `Sort right-half sums: [0,4,5,6,9,10,11,15]. Now binary search is possible.`,
    `For each left sum L, binary search for (target−L)=(10−L) in sorted right. Matches highlighted.`,
  ];

  const matchLeftSums = MITM_L_SUMS.filter(l =>
    MITM_R_SORTED.some(r => r.sum === MITM_TARGET - l.sum)
  );
  const matchRightSums = MITM_R_SORTED.filter(r =>
    MITM_L_SUMS.some(l => l.sum === MITM_TARGET - r.sum)
  );

  return (
    <VizBox>
      {/* Phase selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {PHASE_LABELS.map((l, i) => (
          <button key={i} onClick={() => setPhase(i)} style={{ padding: '4px 10px', border: '1px solid', borderColor: phase === i ? 'var(--color-border-info)' : 'var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: phase === i ? 'var(--color-background-info)' : 'transparent', color: phase === i ? 'var(--color-text-info)' : 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-sans)' }}>
            {i + 1}. {l}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
        {PHASE_DESC[phase]}
      </div>

      {/* Phase 0: Split */}
      {phase === 0 && (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6 }}>FULL ARRAY</div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1, 2, 3, 4, 5, 6].map((v, i) => (
                <div key={i} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, border: '1px solid', borderColor: i < 3 ? 'var(--color-border-info)' : 'var(--color-border-warning)', background: i < 3 ? 'var(--color-background-info)' : 'var(--color-background-warning)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: i < 3 ? 'var(--color-text-info)' : 'var(--color-text-warning)' }}>{v}</div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 22, color: 'var(--color-text-tertiary)' }}>→</div>
          {[{ label: 'LEFT HALF', arr: [1, 2, 3], color: 'info' }, { label: 'RIGHT HALF', arr: [4, 5, 6], color: 'warning' }].map(({ label, arr, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: `var(--color-text-${color})`, marginBottom: 6 }}>{label}  (2³=8 subsets)</div>
              <div style={{ display: 'flex', gap: 3 }}>
                {arr.map((v, i) => (
                  <div key={i} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, border: `1px solid var(--color-border-${color})`, background: `var(--color-background-${color})`, fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: `var(--color-text-${color})` }}>{v}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Phase 1: Enumerate both */}
      {phase === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[{ label: 'LEFT subset sums', sums: MITM_L_SUMS, color: 'info' }, { label: 'RIGHT subset sums', sums: MITM_R_SUMS, color: 'warning' }].map(({ label, sums, color }) => (
            <div key={label}>
              <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: `var(--color-text-${color})`, marginBottom: 8, letterSpacing: '0.06em' }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {sums.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px', borderRadius: 5, background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>{'{' + (s.elems.length ? s.elems.join(',') : '∅') + '}'}</span>
                    <span style={{ color: `var(--color-text-${color})`, fontWeight: 700 }}>= {s.sum}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Phase 2: Sort right */}
      {phase === 2 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-warning)', marginBottom: 8 }}>RIGHT sums (unsorted)</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {MITM_R_SUMS.map((s, i) => (
                  <div key={i} style={{ padding: '3px 8px', borderRadius: 4, background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-secondary)' }}>{s.sum}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-success)', marginBottom: 8 }}>SORTED → binary search ready</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {MITM_R_SORTED.map((s, i) => (
                  <div key={i} style={{ padding: '3px 8px', borderRadius: 4, background: 'var(--color-background-success)', border: '0.5px solid var(--color-border-success)', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--color-text-success)' }}>{s.sum}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '9px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6A9955' }}>
            {'// O(2^(n/2) × n/2) sort — far cheaper than O(2^n) brute force'}
          </div>
        </div>
      )}

      {/* Phase 3: Search */}
      {phase === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 4, letterSpacing: '0.06em' }}>
            For each left sum L, search for (target={MITM_TARGET}−L) in sorted right. Matches = valid subsets summing to {MITM_TARGET}.
          </div>
          {MITM_L_SUMS.map((l, i) => {
            const need    = MITM_TARGET - l.sum;
            const rightMatch = MITM_R_SORTED.find(r => r.sum === need);
            const isMatch = !!rightMatch;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, background: isMatch ? 'var(--color-background-success)' : 'var(--color-background-secondary)', border: `0.5px solid ${isMatch ? 'var(--color-border-success)' : 'var(--color-border-secondary)'}`, fontFamily: 'var(--font-mono)', fontSize: 12, transition: 'all 0.15s' }}>
                <span style={{ color: 'var(--color-text-info)', minWidth: 50 }}>L={l.sum}</span>
                <span style={{ color: 'var(--color-text-secondary)', minWidth: 30 }}>({'{' + (l.elems.join(',') || '∅') + '}'})</span>
                <span style={{ color: 'var(--color-text-tertiary)' }}>need {need}</span>
                {isMatch
                  ? <><span style={{ color: 'var(--color-text-success)', marginLeft: 4 }}>→ found!</span><span style={{ color: 'var(--color-text-success)', marginLeft: 8, fontWeight: 700 }}>
                    {'{' + [...l.elems, ...rightMatch.elems].sort((a,b)=>a-b).join(',') + '} = ' + MITM_TARGET}</span></>
                  : <span style={{ color: 'var(--color-text-tertiary)', marginLeft: 4 }}>→ not found</span>
                }
              </div>
            );
          })}
        </div>
      )}
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   PROBLEM CARD
══════════════════════════════════════════════════════ */
const DIFF_CLR = {'IIT OA':'info','OA Easy':'success','OA Medium':'warning','OA Hard':'danger','LC Medium':'info','LC Hard':'purple'};
function ProblemCard({num,title,difficulty,tags=[],statement,constraints=[],examples=[],approach,code}) {
  const [open,setOpen]=useState(false); const dc=DIFF_CLR[difficulty]||'info';
  return (
    <div style={{border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-lg)',overflow:'hidden',marginBottom:'1rem'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 16px',background:'var(--color-background-secondary)',borderBottom:'1px solid var(--color-border-tertiary)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontFamily:'var(--font-mono)',fontSize:10.5,fontWeight:700,color:'var(--color-text-tertiary)',minWidth:26}}>Q{num}</span><span style={{fontSize:13.5,fontWeight:600,color:'var(--color-text-primary)'}}>{title}</span></div>
        <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap',justifyContent:'flex-end'}}>{tags.map(t=><span key={t} style={{padding:'1px 7px',borderRadius:12,fontSize:10.5,background:'var(--color-background-tertiary)',color:'var(--color-text-tertiary)',fontWeight:500}}>{t}</span>)}<span style={{padding:'2px 9px',borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${dc})`,color:`var(--color-text-${dc})`,border:`1px solid var(--color-border-${dc})`}}>{difficulty}</span></div>
      </div>
      <div style={{padding:'14px 16px'}}>
        <p style={{fontSize:13.5,color:'var(--color-text-secondary)',lineHeight:1.72,marginBottom:12}} dangerouslySetInnerHTML={{__html:statement}}/>
        {constraints.length>0&&<div style={{marginBottom:12}}><div style={{fontSize:10.5,fontWeight:600,color:'var(--color-text-tertiary)',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:5}}>Constraints</div><div style={{display:'flex',flexWrap:'wrap',gap:5}}>{constraints.map((c,i)=><code key={i} style={{padding:'2px 8px',borderRadius:4,fontSize:11.5,background:'var(--color-background-secondary)',color:'var(--color-text-secondary)',border:'0.5px solid var(--color-border-tertiary)',fontFamily:'var(--font-mono)'}}>{c}</code>)}</div></div>}
        {examples.length>0&&<div style={{marginBottom:14}}>{examples.map((ex,i)=><div key={i} style={{background:'var(--color-background-secondary)',border:'0.5px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',padding:'9px 12px',marginBottom:6,fontFamily:'var(--font-mono)',fontSize:12}}><div style={{color:'var(--color-text-tertiary)',fontSize:10,marginBottom:4,letterSpacing:'0.06em'}}>EXAMPLE {i+1}</div><div><span style={{color:'var(--color-text-success)'}}>Input: </span><span style={{color:'var(--color-text-secondary)'}}>{ex.input}</span></div><div><span style={{color:'var(--color-text-info)'}}>Output: </span><span style={{color:'var(--color-text-secondary)'}}>{ex.output}</span></div>{ex.note&&<div style={{color:'var(--color-text-tertiary)',fontSize:11,marginTop:3}}>{ex.note}</div>}</div>)}</div>}
        <button onClick={()=>setOpen(!open)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 14px',border:'1px solid var(--color-border-primary)',borderRadius:'var(--border-radius-md)',background:open?'var(--color-background-secondary)':'transparent',color:'var(--color-text-secondary)',cursor:'pointer',fontSize:12.5,fontFamily:'var(--font-sans)',transition:'all 0.15s'}}>
          <i className={`ti ti-${open?'eye-off':'bulb'}`}/>{open?'Hide Solution':'Show Approach & Solution'}
        </button>
        {open&&<div style={{marginTop:12}}><div style={{background:'var(--color-background-info)',border:'1px solid var(--color-border-info)',borderRadius:'var(--border-radius-md)',padding:'9px 13px',marginBottom:10,fontSize:13,color:'var(--color-text-info)',lineHeight:1.68}}><strong>Approach: </strong>{approach}</div><Code>{code}</Code></div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — FOUNDATIONS & TEMPLATE
══════════════════════════════════════════════════════ */
function SectionFoundations() {
  return (
    <div>
      <Note color="info" icon="ti-git-branch">
        <strong>Backtracking:</strong> A systematic algorithm that incrementally builds candidates to the solution, and <em>abandons</em> ("backtracks") a candidate as soon as it determines that it cannot lead to a valid solution — pruning the search tree.
      </Note>

      <H2>Backtracking vs Pure Brute Force</H2>
      <Grid cols={2}>
        <Card title="Brute Force" color="danger">
          Enumerate <em>all</em> possible candidates, check validity after complete construction. O(k^n) — no early termination. E.g., generating all strings then filtering valid ones.
        </Card>
        <Card title="Backtracking" color="success">
          Build candidates incrementally. <strong>Prune immediately</strong> when a partial candidate cannot lead to any valid solution. O(k^n) worst case but typically much faster due to pruning.
        </Card>
      </Grid>

      <H2>The Universal Template — Choose · Explore · Unchoose</H2>
      <Code>{{cpp: `// Universal Backtracking Template
void backtrack(State& state, int depth, vector<Result>& results) {
    // ── Base case: reached a complete candidate ────────────
    if (isComplete(state)) {
        if (isValid(state)) results.push_back(state);
        return;
    }

    // ── Try all choices at current depth ──────────────────
    for (auto& choice : getChoices(state, depth)) {
        if (isPromising(state, choice)) {    // PRUNING: skip dead branches
            choose(state, choice);           // 1. CHOOSE
            backtrack(state, depth + 1, results); // 2. EXPLORE
            unchoose(state, choice);         // 3. UNCHOOSE (undo the choice)
        }
    }
}`, python: `def backtrack(state, depth, results):
    # Base case: complete candidate
    if is_complete(state):
        if is_valid(state): results.append(state[:])  # copy!
        return

    # Try all choices, prune early
    for choice in get_choices(state, depth):
        if is_promising(state, choice):   # PRUNE dead branches
            choose(state, choice)          # 1. CHOOSE
            backtrack(state, depth+1, results)  # 2. EXPLORE
            unchoose(state, choice)        # 3. UNCHOOSE`}}</Code>
      <Note color="warning" icon="ti-alert-triangle">
        <strong>The most common bug:</strong> forgetting the <code>unchoose</code> step. If you don't undo your choice after exploring its subtree, subsequent branches inherit the previous branch's state — giving incorrect results. Always restore state after every recursive call.
      </Note>

      <H2>Subset Generation — Step Through the Tree</H2>
      <P>The include/exclude paradigm: at each index, make a binary choice — include the element in the current subset or exclude it. Step through the full decision tree for <Mx>[1, 2, 3]</Mx> below. Notice how <em>backtrack steps undo an include</em>, and the exploration is exactly depth-first left-to-right.</P>
      <BacktrackingSubsetsViz />
      <Code>{{cpp: `void generateSubsets(vector<int>& arr, int idx, vector<int>& cur, vector<vector<int>>& result) {
    if (idx == arr.size()) {
        result.push_back(cur);   // base case: emit current subset
        return;
    }
    // Choice 1: INCLUDE arr[idx]
    cur.push_back(arr[idx]);
    generateSubsets(arr, idx + 1, cur, result);
    cur.pop_back();              // UNCHOOSE: undo the include

    // Choice 2: EXCLUDE arr[idx]
    generateSubsets(arr, idx + 1, cur, result);
}`, python: `def generate_subsets(arr, idx=0, cur=None, result=None):
    if cur is None: cur = []
    if result is None: result = []
    if idx == len(arr):
        result.append(cur[:])   # copy! not reference
        return result
    cur.append(arr[idx])                         # CHOOSE include
    generate_subsets(arr, idx+1, cur, result)
    cur.pop()                                    # UNCHOOSE
    generate_subsets(arr, idx+1, cur, result)    # EXCLUDE branch
    return result`}}</Code>

      <H2>Complexity — Analysing the Decision Tree</H2>
      <Table
        heads={["Problem", "Branching factor", "Tree depth", "Nodes", "Time"]}
        rows={[
          ["Subsets",       "2 (include/exclude)", "n", "2ⁿ",  "O(n × 2ⁿ)  — copying each subset"],
          ["Permutations",  "n, n-1, n-2, …",      "n", "n!",  "O(n × n!)  — n! leaves, n time each"],
          ["Combinations",  "≤ n-depth",            "r", "nCr", "O(r × nCr)"],
          ["N-Queens",      "≤ n per row",          "n", "≤n!", "O(n! / pruning)  — much less with constraints"],
          ["Sudoku",        "≤ 9 per cell",         "81","≤9^81","O(9^m) where m = empty cells"],
        ]}
      />

      <QA q="What is the key difference between backtracking and dynamic programming?" a="Both avoid redundant computation but through different mechanisms. DP memoizes <em>overlapping subproblems</em> — the same sub-state is reached from multiple paths, so cache it. Backtracking prunes the search tree — it discards entire subtrees when a partial solution cannot possibly lead to a valid complete solution. DP builds bottom-up or top-down with subproblem reuse. Backtracking is inherently top-down and state-based with no reuse." />
      <QA q="Why must we copy the current state when adding to results (e.g., result.push_back(cur) vs result.push_back(cur[:]))?" a="The same <code>cur</code> vector is mutated throughout the recursion. If you push a reference (or the C++ vector without the copy constructor), all results would point to the same vector — which ends up empty when the algorithm finishes. You must push a <em>snapshot</em>: C++ <code>result.push_back(cur)</code> copies the vector by value (safe). Python <code>result.append(cur)</code> pushes a reference — must use <code>cur[:]</code> or <code>list(cur)</code> to copy." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — CLASSICAL BACKTRACKING PROBLEMS
══════════════════════════════════════════════════════ */
function SectionClassical() {
  return (
    <div>
      <H2>Permutations — All n! Orderings</H2>
      <P>Generate all permutations of a list. At each depth, try adding each unused element. The <code>used[]</code> array (or a swap-based approach) tracks which elements are already in the current permutation.</P>
      <Code>{{cpp: `// Permutations — using a 'used' boolean array
void permute(vector<int>& nums, vector<bool>& used,
             vector<int>& cur, vector<vector<int>>& result) {
    if (cur.size() == nums.size()) { result.push_back(cur); return; }
    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;          // skip if already in current permutation
        used[i] = true;
        cur.push_back(nums[i]);
        permute(nums, used, cur, result);
        cur.pop_back();
        used[i] = false;                // backtrack
    }
}
// [1,2,3] → 6 permutations: [1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]`, python: `def permute(nums):
    result = []
    def bt(cur, remaining):
        if not remaining: result.append(cur[:]); return
        for i in range(len(remaining)):
            cur.append(remaining[i])
            bt(cur, remaining[:i] + remaining[i+1:])
            cur.pop()
    bt([], nums); return result`}}</Code>

      <H2>Combination Sum — All Subsets Summing to Target</H2>
      <P>Find all combinations of candidates that sum to target. Elements can be reused (unbounded). Prune by checking if current sum exceeds target early — this is the key pruning that makes it efficient.</P>
      <Code>{{cpp: `void combinationSum(vector<int>& candidates, int target, int start,
                     vector<int>& cur, vector<vector<int>>& result) {
    if (target == 0) { result.push_back(cur); return; }
    for (int i = start; i < candidates.size(); i++) {
        if (candidates[i] > target) break;   // PRUNE: sorted, so rest also too large
        cur.push_back(candidates[i]);
        combinationSum(candidates, target - candidates[i], i, cur, result); // i (not i+1): reuse allowed
        cur.pop_back();
    }
}
// Prerequisite: sort(candidates) to enable the break-prune above
// [2,3,6,7], target=7 → [[2,2,3],[7]]`, python: `def combination_sum(candidates, target):
    candidates.sort()
    result = []
    def bt(start, cur, remaining):
        if remaining == 0: result.append(cur[:]); return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining: break   # pruning
            cur.append(candidates[i])
            bt(i, cur, remaining - candidates[i])  # i (not i+1): reuse allowed
            cur.pop()
    bt(0, [], target); return result`}}</Code>

      <H2>N-Queens — The Classic Constraint-Satisfaction Problem</H2>
      <P>Place N queens on an N×N board such that no two queens threaten each other (same row, column, or diagonal). Backtrack whenever placing a queen causes a conflict. The key pruning: check row, column, and both diagonals before placing.</P>
      <NQueensViz />
      <Code>{{cpp: `vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> result;
    vector<int> queens;  // queens[row] = col

    // Fast O(1) conflict check using three sets
    unordered_set<int> cols, diag1, diag2;

    auto bt = [&](auto& self, int row) -> void {
        if (row == n) {
            // Build board from queens[]
            vector<string> board(n, string(n, '.'));
            for (int r = 0; r < n; r++) board[r][queens[r]] = 'Q';
            result.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row-col) || diag2.count(row+col)) continue;
            queens.push_back(col);
            cols.insert(col); diag1.insert(row-col); diag2.insert(row+col);
            self(self, row + 1);
            queens.pop_back();
            cols.erase(col); diag1.erase(row-col); diag2.erase(row+col);
        }
    };
    bt(bt, 0); return result;
}`, python: `def solve_n_queens(n):
    result, queens, cols, diag1, diag2 = [], [], set(), set(), set()
    def bt(row):
        if row == n:
            board = ['.'*q + 'Q' + '.'*(n-q-1) for q in queens]
            result.append(board); return
        for col in range(n):
            if col in cols or row-col in diag1 or row+col in diag2: continue
            queens.append(col); cols.add(col); diag1.add(row-col); diag2.add(row+col)
            bt(row + 1)
            queens.pop(); cols.discard(col); diag1.discard(row-col); diag2.discard(row+col)
    bt(0); return result`}}</Code>
      <Note color="success" icon="ti-bulb">
        <strong>O(1) conflict check:</strong> Instead of scanning all placed queens on each attempt, maintain three hash sets: <code>cols</code>, <code>diag1</code> (row-col = constant on ↗ diagonals), and <code>diag2</code> (row+col = constant on ↘ diagonals). This reduces per-placement check from O(n) to O(1), making the total O(n!) instead of O(n² × n!).
      </Note>

      <QA q="Why does the Combination Sum solution sort candidates before backtracking?" a="Sorting enables the <code>break</code> pruning: if <code>candidates[i] &gt; remaining</code>, then all <code>candidates[j]</code> for j &gt; i are also too large (since the array is sorted). Without sorting, we'd need <code>continue</code> instead of <code>break</code>, visiting all remaining candidates even when they're all too large. The sort makes this O(n log n + backtracking) vs O(n × backtracking) for the pruning cost." />
      <QA q="How many solutions does N-Queens have for different N, and why does N=2 have none?" a="N=1: 1, N=2: 0, N=3: 0, N=4: 2, N=5: 10, N=6: 4, N=7: 40, N=8: 92. For N=2, any queen at (0,0) or (0,1) attacks all of row 1 — column + both diagonals cover all 4 squares. N=3 similarly has no solution. The non-trivial smallest solution is N=4." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — ADVANCED BACKTRACKING & PRUNING
══════════════════════════════════════════════════════ */
function SectionPruning() {
  return (
    <div>
      <Note color="warning" icon="ti-scissors">
        Pruning is what separates usable backtracking from theoretical exponential enumeration. Every constraint you can check early eliminates an entire subtree. The key: <strong>prune as high in the tree as possible</strong>.
      </Note>

      <H2>Sudoku Solver — Multi-Constraint Pruning</H2>
      <P>Fill a 9×9 grid with digits 1–9 such that each row, column, and 3×3 box contains each digit exactly once. The constraint density makes backtracking very effective — most branches are pruned within 1–3 moves.</P>
      <Code>{{cpp: `bool solveSudoku(vector<vector<char>>& board) {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] != '.') continue;   // skip filled cells
            for (char d = '1'; d <= '9'; d++) {
                if (isValid(board, r, c, d)) {
                    board[r][c] = d;             // CHOOSE
                    if (solveSudoku(board)) return true;  // EXPLORE
                    board[r][c] = '.';           // UNCHOOSE
                }
            }
            return false;   // no digit worked → propagate failure
        }
    }
    return true;  // all cells filled
}

bool isValid(vector<vector<char>>& b, int row, int col, char d) {
    for (int i = 0; i < 9; i++) {
        if (b[row][i] == d) return false;    // row conflict
        if (b[i][col] == d) return false;    // col conflict
        int r = 3*(row/3) + i/3, c = 3*(col/3) + i%3;
        if (b[r][c] == d) return false;      // box conflict
    }
    return true;
}`, python: `def solve_sudoku(board):
    def is_valid(r, c, d):
        for i in range(9):
            if board[r][i]==d or board[i][c]==d: return False
            if board[3*(r//3)+i//3][3*(c//3)+i%3]==d: return False
        return True
    def bt():
        for r in range(9):
            for c in range(9):
                if board[r][c] != '.': continue
                for d in '123456789':
                    if is_valid(r, c, d):
                        board[r][c] = d
                        if bt(): return True
                        board[r][c] = '.'
                return False
        return True
    bt()`}}</Code>

      <H2>Word Search — Backtracking on a Grid</H2>
      <P>Given a 2D grid and a word, find if the word exists as a connected path (4-directional) without reusing cells. Mark visited cells to avoid reuse — unmark on backtrack.</P>
      <Code>{{cpp: `bool exist(vector<vector<char>>& board, string word) {
    int m = board.size(), n = board[0].size();
    function<bool(int,int,int)> bt = [&](int r, int c, int idx) -> bool {
        if (idx == word.size()) return true;        // all chars matched
        if (r<0||r>=m||c<0||c>=n||board[r][c]!=word[idx]) return false;
        char tmp = board[r][c];
        board[r][c] = '#';    // MARK visited
        bool found = bt(r+1,c,idx+1) || bt(r-1,c,idx+1) ||
                     bt(r,c+1,idx+1) || bt(r,c-1,idx+1);
        board[r][c] = tmp;    // UNMARK (backtrack)
        return found;
    };
    for (int r = 0; r < m; r++)
        for (int c = 0; c < n; c++)
            if (bt(r, c, 0)) return true;
    return false;
}`, python: `def exist(board, word):
    m, n = len(board), len(board[0])
    def bt(r, c, idx):
        if idx == len(word): return True
        if r<0 or r>=m or c<0 or c>=n or board[r][c]!=word[idx]: return False
        tmp, board[r][c] = board[r][c], '#'
        found = bt(r+1,c,idx+1) or bt(r-1,c,idx+1) or bt(r,c+1,idx+1) or bt(r,c-1,idx+1)
        board[r][c] = tmp
        return found
    return any(bt(r,c,0) for r in range(m) for c in range(n))`}}</Code>

      <H2>Pruning Strategies — Taxonomy</H2>
      <Table
        heads={["Strategy", "Idea", "Example"]}
        rows={[
          ["Constraint pruning", "Skip choices that violate any constraint immediately", "N-Queens: check col/diagonal before placing"],
          ["Bound pruning", "If current sum already exceeds target, stop", "Combination Sum: break when candidates[i] > remaining"],
          ["Symmetry pruning", "Skip duplicate choices at the same depth level", "Permutations with duplicates: skip if nums[i]==nums[i-1] and !used[i-1]"],
          ["Forward checking", "Proactively check if future constraints can be satisfied", "Sudoku: if a row has no valid digit, prune now"],
          ["Arc consistency", "Propagate constraints to reduce domains before branching", "Advanced Sudoku: constraint propagation"],
          ["Early termination", "Return immediately when the first valid solution is found", "Sudoku: return true immediately after first board fill"],
        ]}
      />

      <H2>Handling Duplicates — Sorted + Skip Pattern</H2>
      <Code>{{cpp: `// Subsets II: array may have duplicates → skip duplicate choices at same depth
void subsetsWithDup(vector<int>& nums, int start, vector<int>& cur,
                    vector<vector<int>>& result) {
    result.push_back(cur);     // add at each node (not just leaves)
    for (int i = start; i < nums.size(); i++) {
        // Skip duplicate: if nums[i] == nums[i-1] and we're in the same depth level
        if (i > start && nums[i] == nums[i - 1]) continue;
        cur.push_back(nums[i]);
        subsetsWithDup(nums, i + 1, cur, result);
        cur.pop_back();
    }
}
// Prerequisite: sort(nums.begin(), nums.end())
// [1,2,2] → [[],[1],[1,2],[1,2,2],[2],[2,2]]  (no duplicates)`, python: `def subsets_with_dup(nums):
    nums.sort(); result = []
    def bt(start, cur):
        result.append(cur[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i-1]: continue  # skip dup
            cur.append(nums[i]); bt(i+1, cur); cur.pop()
    bt(0, []); return result`}}</Code>

      <QA q="In Sudoku, why does 'return false' when no digit fits (inside the inner for loop body) make the algorithm correct?" a="When we find an empty cell and none of the 9 digits are valid, the current partial board cannot lead to a solution — we must backtrack. Returning false signals failure to the caller, which then tries a different digit for the previous empty cell. This 'failure propagation' is essential: without it, the outer loop would continue scanning cells even though the current partial board is already invalid." />
      <QA q="What is the 'i > start' condition doing in the duplicate-skipping backtracking?" a="We skip <code>nums[i]</code> if it equals <code>nums[i-1]</code> AND <code>i > start</code>. The <code>i > start</code> check ensures we only skip duplicates at the <em>same recursive depth</em>, not across depths. If <code>i == start</code>, this is the first element we're considering at this depth — never skip the first choice. Only skip subsequent elements with the same value (they would generate identical subtrees)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — MEET IN THE MIDDLE
══════════════════════════════════════════════════════ */
function SectionMITM() {
  return (
    <div>
      <Note color="purple" icon="ti-arrows-join">
        <strong>Meet in the Middle (MITM):</strong> For problems with O(2ⁿ) brute force, split the input into two equal halves, enumerate O(2^(n/2)) solutions for each half independently, then combine results. Reduces O(2ⁿ) to O(2^(n/2) × n/2) — a dramatic improvement for n ≥ 30.
      </Note>

      <H2>The Core Idea — Why It Works</H2>
      <Grid cols={2}>
        <Card title="Brute Force Complexity" color="danger">
          n=40: 2⁴⁰ ≈ 10¹² — completely infeasible even at 10⁹ ops/sec. No amount of constant-factor optimization helps.
        </Card>
        <Card title="MITM Complexity" color="success">
          n=40: 2²⁰ ≈ 10⁶ per half. Sort + binary search: O(2^(n/2) × n/2) ≈ 20×10⁶ — trivially fast. A 10⁶× speedup.
        </Card>
      </Grid>

      <H2>Interactive — Subset Sum MITM for [1,2,3,4,5,6], target=10</H2>
      <P>Step through all 4 phases: split → enumerate each half's subset sums → sort right half → binary search for complements.</P>
      <MeetInMiddleViz />

      <H2>Subset Sum MITM — Full Implementation</H2>
      <Code>{{cpp: `// Count subsets of arr summing to target (n up to 40)
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long target;
    cin >> n >> target;
    vector<long long> arr(n);
    for (auto& x : arr) cin >> x;

    int h1 = n / 2, h2 = n - h1;

    // Step 1: enumerate all 2^h1 subset sums of first half
    vector<long long> left;
    for (int mask = 0; mask < (1 << h1); mask++) {
        long long s = 0;
        for (int i = 0; i < h1; i++) if (mask & (1 << i)) s += arr[i];
        left.push_back(s);
    }

    // Step 2: enumerate all 2^h2 subset sums of second half
    vector<long long> right;
    for (int mask = 0; mask < (1 << h2); mask++) {
        long long s = 0;
        for (int i = 0; i < h2; i++) if (mask & (1 << i)) s += arr[h1 + i];
        right.push_back(s);
    }

    // Step 3: sort right half
    sort(right.begin(), right.end());

    // Step 4: for each left sum, binary search for complement
    long long count = 0;
    for (long long l : left) {
        long long need = target - l;
        count += upper_bound(right.begin(), right.end(), need)
               - lower_bound(right.begin(), right.end(), need);
    }
    cout << count << "\n";
}
// Time: O(2^(n/2) × n/2)  Space: O(2^(n/2))`, python: `from bisect import bisect_left, bisect_right

def count_subsets_mitm(arr, target):
    n = len(arr)
    h = n // 2
    left_arr, right_arr = arr[:h], arr[h:]

    def all_sums(a):
        sums = []
        for mask in range(1 << len(a)):
            sums.append(sum(a[i] for i in range(len(a)) if mask & (1<<i)))
        return sums

    left  = all_sums(left_arr)
    right = sorted(all_sums(right_arr))

    count = 0
    for l in left:
        need = target - l
        count += bisect_right(right, need) - bisect_left(right, need)
    return count`}}</Code>

      <H2>Classical Application — 4-Sum / 4-Number Sum</H2>
      <P>Find all quadruples <Mx>(a, b, c, d)</Mx> where <KaTeX>{String.raw`a + b + c + d = \text{target}`}</KaTeX>. Brute force: O(n⁴). MITM: enumerate all O(n²) pair sums from the first two indices, sort them, then for each pair from the last two, binary search for the complement.</P>
      <Code>{{cpp: `// 4-Sum with Meet in the Middle: O(n² log n)
vector<array<int,4>> fourSum(vector<int>& nums, int target) {
    int n = nums.size();
    sort(nums.begin(), nums.end());

    // Build all pair sums (first two elements)
    map<int, vector<pair<int,int>>> pairSums;
    for (int i = 0; i < n - 1; i++)
        for (int j = i + 1; j < n; j++)
            pairSums[nums[i] + nums[j]].push_back({i, j});

    set<array<int,4>> seen;
    // For each pair from the last two elements, search for complement
    for (int k = 0; k < n - 1; k++) {
        for (int l = k + 1; l < n; l++) {
            int need = target - nums[k] - nums[l];
            if (!pairSums.count(need)) continue;
            for (auto [i, j] : pairSums[need]) {
                if (i == k || i == l || j == k || j == l) continue;
                array<int,4> quad = {nums[i], nums[j], nums[k], nums[l]};
                sort(quad.begin(), quad.end());
                seen.insert(quad);
            }
        }
    }
    return vector<array<int,4>>(seen.begin(), seen.end());
}`, python: `from collections import defaultdict
from itertools import combinations

def four_sum(nums, target):
    nums.sort()
    n = len(nums)
    pair_sums = defaultdict(list)
    for i in range(n-1):
        for j in range(i+1, n):
            pair_sums[nums[i]+nums[j]].append((i,j))

    results = set()
    for k in range(n-1):
        for l in range(k+1, n):
            need = target - nums[k] - nums[l]
            for i, j in pair_sums.get(need, []):
                if len({i, j, k, l}) == 4:   # all distinct indices
                    quad = tuple(sorted([nums[i],nums[j],nums[k],nums[l]]))
                    results.add(quad)
    return [list(q) for q in results]`}}</Code>

      <Table
        heads={["Approach", "Time", "Space", "Notes"]}
        rows={[
          ["4-pointer (n^4)",        "O(n⁴)", "O(1)",   "Trivial brute force"],
          ["Sort + two-pointer fix", "O(n³)", "O(1)",   "Fix first two with nested loops, two-pointer for last two"],
          ["MITM (hash/map)",        "O(n²)", "O(n²)",  "Hash map of pair sums: O(1) lookup per second pair"],
          ["Subset Sum MITM (n=40)", "O(2^(n/2)×n)", "O(2^(n/2))", "Only feasible approach for large n"],
        ]}
      />

      <QA q="Why is the Meet in the Middle speedup specifically O(√(2ⁿ)) = O(2^(n/2)) and not better?" a="The combination step requires matching a left sum against all right sums. With binary search, this is O(log 2^(n/2)) = O(n/2) per left element, and there are 2^(n/2) left elements. Total combination: O(2^(n/2) × n/2). The enumeration of each half is O(2^(n/2) × n/2) too. So total: O(2^(n/2) × n). You can't do better than enumerate both halves — the information from both is required." />
      <QA q="Can Meet in the Middle be applied beyond subset sum? What other problems use it?" a="Yes — MITM is a general technique. Applications: (1) Baby-step giant-step for discrete logarithm (cryptography). (2) 4-SUM and higher k-SUM problems. (3) Bidirectional BFS/DFS on graphs — explore from both ends and meet in the middle. (4) Breaking 2DES: each half-encryption is independently searchable. (5) Counting/finding subsets satisfying complex conditions in n=40-50 element arrays. The key requirement: the problem can be split so that solutions combine easily (e.g., sum to target)." />
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
        6 problems: fundamentals → hard backtracking → meet in the middle. All are frequent in FAANG onsite rounds.
      </Note>

      <ProblemCard num={1} title="Subsets" difficulty="LC Medium" tags={["LC 78","Include/Exclude"]}
        statement="Given an integer array <code>nums</code> of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return in any order."
        constraints={["1 ≤ n ≤ 10","All elements unique","O(n × 2ⁿ) time"]}
        examples={[{input:"[1,2,3]",output:"[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"},{input:"[0]",output:"[[],[0]]"}]}
        approach="Include/exclude backtracking: at each index, recurse with the element included and without. Base case: idx == n → emit current subset. Alternatively, use iterative bit-mask: for mask in 0..2ⁿ-1, the set bits tell which elements to include."
        code={{cpp:`void bt(vector<int>& nums, int idx, vector<int>& cur, vector<vector<int>>& res) {
    if (idx == nums.size()) { res.push_back(cur); return; }
    cur.push_back(nums[idx]); bt(nums, idx+1, cur, res); cur.pop_back();
    bt(nums, idx+1, cur, res);
}
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res; vector<int> cur;
    bt(nums, 0, cur, res); return res;
}`,python:`def subsets(nums):
    res = []
    def bt(idx, cur):
        if idx == len(nums): res.append(cur[:]); return
        cur.append(nums[idx]); bt(idx+1, cur); cur.pop()
        bt(idx+1, cur)
    bt(0, []); return res`}}
      />

      <ProblemCard num={2} title="Permutations" difficulty="LC Medium" tags={["LC 46","Backtracking"]}
        statement="Given an array <code>nums</code> of distinct integers, return all possible permutations in any order."
        constraints={["1 ≤ n ≤ 6","All elements distinct","n! permutations total"]}
        examples={[{input:"[1,2,3]",output:"[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"},{input:"[0,1]",output:"[[0,1],[1,0]]"}]}
        approach="At each level, pick any unused element to place next. Track used elements with a boolean array. When current permutation length == n → emit. The swap-based approach (swap nums[start] with nums[i], recurse, swap back) is O(n!) with O(1) extra space."
        code={{cpp:`void bt(vector<int>& nums, int start, vector<vector<int>>& res) {
    if (start == nums.size()) { res.push_back(nums); return; }
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);
        bt(nums, start+1, res);
        swap(nums[start], nums[i]);
    }
}
vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res; bt(nums, 0, res); return res;
}`,python:`def permute(nums):
    res = []
    def bt(start):
        if start == len(nums): res.append(nums[:]); return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            bt(start+1)
            nums[start], nums[i] = nums[i], nums[start]
    bt(0); return res`}}
      />

      <ProblemCard num={3} title="Combination Sum" difficulty="LC Medium" tags={["LC 39","Pruning"]}
        statement="Given an array of distinct integers <code>candidates</code> and a target integer, return all unique combinations where the chosen numbers sum to target. The same number may be chosen an unlimited number of times."
        constraints={["1 ≤ candidates.length ≤ 30","2 ≤ candidates[i] ≤ 40","All distinct","1 ≤ target ≤ 500"]}
        examples={[{input:"candidates=[2,3,6,7], target=7",output:"[[2,2,3],[7]]"},{input:"candidates=[2,3,5], target=8",output:"[[2,2,2,2],[2,3,3],[3,5]]"}]}
        approach="Sort candidates. At each step, try candidates[start..n-1] (start prevents reverse duplicates). Pass i (not i+1) in the recursive call to allow reuse. Break when candidates[i] > remaining — pruning based on sorted order. This is the key optimization over checking remaining < 0 after adding."
        code={{cpp:`void bt(vector<int>& c, int start, int rem, vector<int>& cur, vector<vector<int>>& res) {
    if (rem == 0) { res.push_back(cur); return; }
    for (int i = start; i < c.size(); i++) {
        if (c[i] > rem) break;
        cur.push_back(c[i]); bt(c, i, rem-c[i], cur, res); cur.pop_back();
    }
}
vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> res; vector<int> cur;
    bt(candidates, 0, target, cur, res); return res;
}`,python:`def combination_sum(candidates, target):
    candidates.sort(); res = []
    def bt(start, cur, rem):
        if rem == 0: res.append(cur[:]); return
        for i in range(start, len(candidates)):
            if candidates[i] > rem: break
            cur.append(candidates[i]); bt(i, cur, rem-candidates[i]); cur.pop()
    bt(0, [], target); return res`}}
      />

      <ProblemCard num={4} title="N-Queens II" difficulty="LC Hard" tags={["LC 52","N-Queens"]}
        statement="Given an integer <code>n</code>, return the number of distinct solutions to the N-Queens problem (not the board configurations themselves, just the count)."
        constraints={["1 ≤ n ≤ 9"]}
        examples={[{input:"n=4",output:"2"},{input:"n=1",output:"1"}]}
        approach="Same backtracking as N-Queens but increment a count instead of building boards. Use three bitset variables (cols, diag1=row-col, diag2=row+col) for O(1) conflict check per placement. The bit manipulation version using bitwise-AND is the fastest implementation."
        code={{cpp:`int totalNQueens(int n) {
    int count = 0;
    unordered_set<int> cols, d1, d2;
    function<void(int)> bt = [&](int row) {
        if (row == n) { count++; return; }
        for (int col = 0; col < n; col++) {
            if (cols.count(col)||d1.count(row-col)||d2.count(row+col)) continue;
            cols.insert(col); d1.insert(row-col); d2.insert(row+col);
            bt(row+1);
            cols.erase(col); d1.erase(row-col); d2.erase(row+col);
        }
    };
    bt(0); return count;
}`,python:`def total_n_queens(n):
    count = [0]
    cols, d1, d2 = set(), set(), set()
    def bt(row):
        if row == n: count[0] += 1; return
        for col in range(n):
            if col in cols or row-col in d1 or row+col in d2: continue
            cols.add(col); d1.add(row-col); d2.add(row+col)
            bt(row+1)
            cols.discard(col); d1.discard(row-col); d2.discard(row+col)
    bt(0); return count[0]`}}
      />

      <ProblemCard num={5} title="Word Search" difficulty="LC Medium" tags={["LC 79","Grid Backtracking"]}
        statement="Given an <code>m×n</code> grid of characters and a string <code>word</code>, return <code>true</code> if word exists in the grid as a connected path of adjacent (up/down/left/right) cells. The same cell may not be used more than once."
        constraints={["1 ≤ m,n ≤ 6","1 ≤ word.length ≤ 15"]}
        examples={[{input:`board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word="ABCCED"`,output:"true"},{input:`word="SEE"`,output:"true"},{input:`word="ABCB"`,output:"false"}]}
        approach="DFS backtracking from each starting cell. At each step, check if board[r][c] matches word[idx]. Mark visited by overwriting with '#', recurse in 4 directions, restore on backtrack. Return true immediately on first match (no need to find all paths)."
        code={{cpp:`bool exist(vector<vector<char>>& b, string w) {
    int m=b.size(),n=b[0].size();
    function<bool(int,int,int)> bt=[&](int r,int c,int i)->bool{
        if(i==w.size()) return true;
        if(r<0||r>=m||c<0||c>=n||b[r][c]!=w[i]) return false;
        char t=b[r][c]; b[r][c]='#';
        bool f=bt(r+1,c,i+1)||bt(r-1,c,i+1)||bt(r,c+1,i+1)||bt(r,c-1,i+1);
        b[r][c]=t; return f;
    };
    for(int r=0;r<m;r++) for(int c=0;c<n;c++) if(bt(r,c,0)) return true;
    return false;
}`,python:`def exist(board, word):
    m,n=len(board),len(board[0])
    def bt(r,c,i):
        if i==len(word): return True
        if r<0 or r>=m or c<0 or c>=n or board[r][c]!=word[i]: return False
        tmp,board[r][c]=board[r][c],'#'
        found=bt(r+1,c,i+1) or bt(r-1,c,i+1) or bt(r,c+1,i+1) or bt(r,c-1,i+1)
        board[r][c]=tmp; return found
    return any(bt(r,c,0) for r in range(m) for c in range(n))`}}
      />

      <ProblemCard num={6} title="Subset Sum — Meet in the Middle" difficulty="LC Hard" tags={["MITM","n ≤ 40"]}
        statement="Given an array <code>arr</code> of <strong>n ≤ 40</strong> integers and a target sum <code>T</code>, count the number of non-empty subsets of <code>arr</code> that sum to exactly <code>T</code>. Values may be negative. Standard DP is infeasible for n=40."
        constraints={["1 ≤ n ≤ 40","−10⁹ ≤ arr[i] ≤ 10⁹","The 2^n brute force is infeasible; use MITM"]}
        examples={[{input:"arr=[1,2,3,4,5,6], target=10",output:"5",note:"{4,6}, {1,4,5}, {1,3,6}, {2,3,5}, {1,2,3,4}"},{input:"arr=[3,-1,2,4,-3,1], target=3",output:"8"}]}
        approach="Split arr into two halves. Enumerate all 2^(n/2) subset sums for each half. Sort right half. For each left sum L, binary search for (T-L) in sorted right — use upper_bound - lower_bound for count. Total: O(2^(n/2) × n/2). For counting: just accumulate; for listing: store elements alongside sums and reconstruct."
        code={{cpp:`#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int countSubsetsTarget(vector<ll>& arr, ll T) {
    int n = arr.size(), h = n / 2;
    auto allSums = [](vector<ll> a) {
        int m = a.size(); vector<ll> sums;
        for (int mask = 0; mask < (1<<m); mask++) {
            ll s = 0;
            for (int i = 0; i < m; i++) if (mask&(1<<i)) s += a[i];
            sums.push_back(s);
        }
        return sums;
    };
    auto left  = allSums(vector<ll>(arr.begin(), arr.begin()+h));
    auto right = allSums(vector<ll>(arr.begin()+h, arr.end()));
    sort(right.begin(), right.end());
    ll count = 0;
    for (ll l : left) {
        ll need = T - l;
        count += upper_bound(right.begin(),right.end(),need)
               - lower_bound(right.begin(),right.end(),need);
    }
    return count - (T == 0 ? 1 : 0);  // subtract empty subset if T==0
}`,python:`from bisect import bisect_left, bisect_right

def count_subsets(arr, T):
    n = len(arr); h = n // 2
    def all_sums(a):
        s = []
        for mask in range(1<<len(a)):
            s.append(sum(a[i] for i in range(len(a)) if mask&(1<<i)))
        return s
    left  = all_sums(arr[:h])
    right = sorted(all_sums(arr[h:]))
    count = sum(bisect_right(right, T-l)-bisect_left(right, T-l) for l in left)
    return count - (1 if T == 0 else 0)  # remove empty+empty subset if T==0`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'classical',   label: 'Classical Problems' },
  { id: 'pruning',     label: 'Pruning & Sudoku' },
  { id: 'mitm',        label: 'Meet in the Middle' },
  { id: 'problems',    label: 'Problems' },
];

export default function BacktrackingMITM() {
  const [active, setActive] = useState('foundations');
  const map = {
    foundations: <SectionFoundations />,
    classical:   <SectionClassical />,
    pruning:     <SectionPruning />,
    mitm:        <SectionMITM />,
    problems:    <SectionProblems />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 11</div>
        <h1 className="page-header-title">Backtracking &amp; Meet in the Middle</h1>
        <p className="page-header-subtitle">
          Choose · Explore · Unchoose · Subsets · Permutations · N-Queens · Sudoku · MITM Subset Sum · 4-Sum
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{ padding: '0.5rem 0 2rem' }}>{map[active]}</div>
      <NavButtons moduleId={11} />
    </div>
  );
}
