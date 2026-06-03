import { useState, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   STEP BUILDERS — computed once at module load
══════════════════════════════════════════════════════ */

/* ── Reversal on [1→2→3→4→5] ───────────────────────── */
// Each step: arrows[i] = 'right' | 'left' | 'none' (meaning 1→null)
function buildReverseSteps(vals) {
  const n = vals.length;
  const steps = [];
  // arrows[i] = index it points to, or -1 for null
  const arrows = vals.map((_, i) => i + 1 < n ? i + 1 : -1);

  steps.push({
    arrows: [...arrows], prev: -1, cur: 0, nxt: 1,
    action: 'init',
    desc: `Start: prev = NULL, cur = head (node ${vals[0]}). Save next = cur.next before overwriting.`,
  });

  let prev = -1, cur = 0;
  while (cur !== -1 && cur < n) {
    const nxt = cur + 1 < n ? cur + 1 : -1;
    const newArrows = [...arrows];
    newArrows[cur] = prev;          // flip cur's pointer to prev
    for (let i = 0; i < cur; i++) newArrows[i] = i - 1; // already flipped

    steps.push({
      arrows: newArrows.map((v, i) => i <= cur ? (i === 0 ? -1 : i - 1) : i + 1),
      prev: cur, cur: nxt !== -1 ? nxt : -1, nxt: nxt !== -1 ? (nxt + 1 < n ? nxt + 1 : -1) : -1,
      action: nxt === -1 ? 'done' : 'step',
      desc: nxt === -1
        ? `All arrows reversed! prev = ${vals[cur]} is the new head. cur = NULL → done.`
        : `Flip: node ${vals[cur]}.next = ${prev === -1 ? 'NULL' : vals[prev]}. Advance: prev = ${vals[cur]}, cur = ${vals[nxt]}.`,
    });
    prev = cur; cur = nxt;
  }
  return steps;
}
const REV_VALS  = [1, 2, 3, 4, 5];
const REV_STEPS = buildReverseSteps(REV_VALS);

/* ── Slow/Fast: find middle of [1→2→3→4→5] ─────────── */
function buildMiddleSteps(vals) {
  const n = vals.length;
  const steps = [];
  steps.push({ slow: 0, fast: 0, action: 'init', done: false,
    desc: `Find middle: slow moves 1 step at a time, fast moves 2. When fast reaches end, slow is at middle.` });
  let slow = 0, fast = 0;
  while (fast + 1 < n && fast + 2 < n) {
    slow += 1; fast += 2;
    const done = fast + 1 >= n || fast + 2 >= n;
    steps.push({ slow, fast, action: done ? 'done' : 'step', done,
      desc: done
        ? `fast(${vals[fast]}) can't move 2 more steps → STOP. Middle = node ${vals[slow]} (index ${slow}).`
        : `slow → ${vals[slow]},  fast → ${vals[fast]}` });
    if (done) break;
  }
  if (steps.length === 1) {
    steps.push({ slow: 0, fast: 0, action: 'done', done: true,
      desc: `Single element — middle is index 0 (${vals[0]}).` });
  }
  return steps;
}
const MID_VALS  = [1, 2, 3, 4, 5];
const MID_STEPS = buildMiddleSteps(MID_VALS);

/* ── Cycle detection on [3→1→2→4], cycle: 4→2 ─────── */
// Nodes at indices 0=3, 1=1, 2=2, 3=4, nextOf(3)=2
const CYC_VALS = [3, 1, 2, 4];
const CYC_NEXT = [1, 2, 3, 2]; // next index for each node
function buildCycleSteps(vals, nxt) {
  const steps = [];
  steps.push({ slow: 0, fast: 0, action: 'init',
    desc: `Cycle: 4 (idx 3) → 2 (idx 2). Slow moves 1 step; fast moves 2 steps per iteration.` });
  let slow = 0, fast = 0;
  for (let iter = 0; iter < 10; iter++) {
    slow = nxt[slow];
    fast = nxt[nxt[fast]];
    if (slow === fast) {
      steps.push({ slow, fast, action: 'meet',
        desc: `Slow(${vals[slow]}) = Fast(${vals[fast]}) → CYCLE DETECTED at node ${vals[slow]}!` });
      // Phase 2: find cycle start
      let p1 = 0, p2 = slow;
      steps.push({ slow: p1, fast: p2, action: 'phase2',
        desc: `Phase 2: reset one pointer to head. Move both 1 step at a time until they meet = cycle entry.` });
      while (p1 !== p2) {
        p1 = nxt[p1]; p2 = nxt[p2];
        steps.push({ slow: p1, fast: p2, action: p1 === p2 ? 'entry' : 'phase2',
          desc: p1 === p2
            ? `Both meet at node ${vals[p1]} → this is the CYCLE ENTRY POINT.`
            : `ptr1 → ${vals[p1]},  ptr2 → ${vals[p2]}` });
      }
      return steps;
    }
    steps.push({ slow, fast, action: 'step',
      desc: `slow → ${vals[slow]} (idx ${slow}),   fast → ${vals[fast]} (idx ${fast})` });
  }
  return steps;
}
const CYC_STEPS = buildCycleSteps(CYC_VALS, CYC_NEXT);

/* ── Nth from end on [1→2→3→4→5], n=2 ─────────────── */
function buildNthSteps(vals, n) {
  const len = vals.length;
  const steps = [];
  steps.push({ lead: 0, trail: -1, gap: 0, action: 'init',
    desc: `Nth from end (n=${n}): advance LEAD by n steps, then move both until LEAD reaches null.` });
  let lead = 0;
  for (let i = 0; i < n; i++) {
    lead++;
    steps.push({ lead: lead < len ? lead : len, trail: -1, gap: i + 1, action: 'advance',
      desc: `Advance lead ${i + 1}/${n}: lead now at index ${lead}.` });
  }
  let trail = 0;
  while (lead < len) {
    lead++; trail++;
    steps.push({ lead: lead < len ? lead : len, trail, gap: n, action: lead >= len ? 'done' : 'step',
      desc: lead >= len
        ? `Lead reached end. TRAIL at index ${trail} = node ${vals[trail]} ← answer (${n}th from end).`
        : `Both advance: lead=${lead < len ? vals[lead] : 'END'}, trail=${vals[trail]}` });
  }
  return steps;
}
const NTH_VALS  = [1, 2, 3, 4, 5];
const NTH_STEPS = buildNthSteps(NTH_VALS, 2);

/* ── Merge two sorted lists [1→3→5] and [2→4→6] ───── */
function buildMergeSteps(A, B) {
  const steps = [];
  let ai = 0, bi = 0;
  const merged = [];
  steps.push({ ai, bi, merged: [], action: 'init',
    desc: `Merge [${A.join('→')}] and [${B.join('→')}]. Compare heads, take smaller, advance that pointer.` });
  while (ai < A.length && bi < B.length) {
    const takingA = A[ai] <= B[bi];
    merged.push(takingA ? A[ai] : B[bi]);
    const prev_ai = ai, prev_bi = bi;
    if (takingA) ai++; else bi++;
    steps.push({ ai, bi, merged: [...merged], compareA: prev_ai, compareB: prev_bi, took: takingA ? 'A' : 'B', action: 'pick',
      desc: `A[${prev_ai}]=${A[prev_ai]} vs B[${prev_bi}]=${B[prev_bi]}: take ${takingA ? A[prev_ai] : B[prev_bi]} from ${takingA ? 'A' : 'B'}.` });
  }
  while (ai < A.length) { merged.push(A[ai]); ai++; }
  while (bi < B.length) { merged.push(B[bi]); bi++; }
  steps.push({ ai: A.length, bi: B.length, merged: [...merged], action: 'done',
    desc: `Merged: [${merged.join('→')}] ✓` });
  return steps;
}
const MERGE_A     = [1, 3, 5];
const MERGE_B     = [2, 4, 6];
const MERGE_STEPS = buildMergeSteps(MERGE_A, MERGE_B);

/* ══════════════════════════════════════════════════════
   SHARED NODE RENDERER
   Renders a linked list as boxes with arrows
══════════════════════════════════════════════════════ */
function ListRow({ vals, highlights = {}, cycleBack = null, showNull = true }) {
  // highlights: { index: 'success'|'info'|'warning'|'danger'|'purple' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'nowrap', overflowX: 'auto' }}>
      {vals.map((v, i) => {
        const c = highlights[i] || null;
        const isLast = i === vals.length - 1;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {/* Node box */}
            <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', border: `1.5px solid ${c ? `var(--color-border-${c})` : 'var(--color-border-secondary)'}`, transition: 'all 0.2s' }}>
              {/* Value cell */}
              <div style={{ padding: '7px 12px', background: c ? `var(--color-background-${c})` : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: c ? 700 : 500, color: c ? `var(--color-text-${c})` : 'var(--color-text-secondary)', minWidth: 32, textAlign: 'center', transition: 'all 0.2s' }}>
                {v}
              </div>
              {/* Next pointer cell */}
              <div style={{ padding: '7px 8px', background: c ? `${c === 'success' ? '#1A3A2A' : c === 'info' ? '#1A2A3A' : c === 'warning' ? '#3A2A1A' : '#2A1A1A'}` : '#0D0F18', borderLeft: `1px solid ${c ? `var(--color-border-${c})` : 'var(--color-border-tertiary)'}`, fontFamily: 'var(--font-mono)', fontSize: 11, color: c ? `var(--color-text-${c})` : 'var(--color-text-tertiary)', opacity: 0.85 }}>
                *
              </div>
            </div>
            {/* Arrow to next */}
            {!isLast && (
              <svg width="28" height="20" viewBox="0 0 28 20" style={{ flexShrink: 0 }}>
                <line x1="2" y1="10" x2="22" y2="10" stroke="var(--color-border-secondary)" strokeWidth="1.5" />
                <polygon points="22,6 28,10 22,14" fill="var(--color-border-secondary)" />
              </svg>
            )}
            {/* Cycle back arrow (for cycle viz) */}
            {isLast && cycleBack !== null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 2 }}>
                <svg width="28" height="20" viewBox="0 0 28 20" style={{ flexShrink: 0 }}>
                  <line x1="2" y1="10" x2="18" y2="10" stroke="var(--color-border-danger)" strokeWidth="1.5" strokeDasharray="3,2" />
                  <polygon points="18,6 24,10 18,14" fill="var(--color-border-danger)" />
                </svg>
                <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-danger)', whiteSpace: 'nowrap' }}>→ idx {cycleBack}</span>
              </div>
            )}
            {/* NULL tail */}
            {isLast && showNull && !cycleBack && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 2 }}>
                <svg width="28" height="20" viewBox="0 0 28 20" style={{ flexShrink: 0 }}>
                  <line x1="2" y1="10" x2="22" y2="10" stroke="var(--color-border-tertiary)" strokeWidth="1.5" />
                  <polygon points="22,6 28,10 22,14" fill="var(--color-border-tertiary)" />
                </svg>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-tertiary)' }}>NULL</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* Pointer label below a node */
function PtrLabel({ label, color }) {
  return (
    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: `var(--color-text-${color})`, fontWeight: 700, background: `var(--color-background-${color})`, padding: '1px 6px', borderRadius: 10, border: `1px solid var(--color-border-${color})` }}>
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — IN-PLACE REVERSAL
   Shows prev / cur / next pointers and arrow direction
══════════════════════════════════════════════════════ */
function ReverseViz() {
  const [step, setStep] = useState(0);
  const s = REV_STEPS[Math.min(step, REV_STEPS.length - 1)];
  const n = REV_VALS.length;

  // Build highlights for each node
  const highlights = {};
  if (s.prev >= 0 && s.prev < n) highlights[s.prev] = 'warning';
  if (s.cur  >= 0 && s.cur  < n) highlights[s.cur]  = 'info';
  if (s.nxt  >= 0 && s.nxt  < n) highlights[s.nxt]  = 'success';

  // Pointer labels — which node gets which labels
  const labels = {};
  if (s.prev >= 0) labels[s.prev] = [...(labels[s.prev] || []), { t: 'prev', c: 'warning' }];
  if (s.cur  >= 0 && s.cur < n) labels[s.cur]  = [...(labels[s.cur]  || []), { t: 'cur', c: 'info' }];
  if (s.nxt  >= 0 && s.nxt < n) labels[s.nxt]  = [...(labels[s.nxt]  || []), { t: 'next', c: 'success' }];

  const ACTION_CLR = { init: null, step: 'info', done: 'success' };
  const ac = ACTION_CLR[s.action] || 'info';

  // Reversed portion: indices 0..prev are already reversed
  const reversedUpto = s.prev >= 0 ? s.prev : -1;

  return (
    <VizBox>
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        {s.desc}
      </div>

      {/* Labels row */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 6 }}>
        {REV_VALS.map((_, i) => {
          const nodeW = 74; // approximate width of each node + arrow
          const lbs = labels[i] || [];
          return (
            <div key={i} style={{ width: nodeW, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              {lbs.map(({ t, c }) => <PtrLabel key={t} label={t} color={c} />)}
            </div>
          );
        })}
      </div>

      {/* Main list */}
      <div style={{ marginBottom: 14 }}>
        <ListRow vals={REV_VALS} highlights={highlights} />
      </div>

      {/* Reversed portion indicator */}
      {reversedUpto >= 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>
            REVERSED SO FAR:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-tertiary)' }}>NULL</span>
            {REV_VALS.slice(0, reversedUpto + 1).reverse().map((v, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <svg width="22" height="16" viewBox="0 0 22 16"><line x1="0" y1="8" x2="16" y2="8" stroke="var(--color-border-warning)" strokeWidth="1.5"/><polygon points="16,4 22,8 16,12" fill="var(--color-border-warning)"/></svg>
                <div style={{ padding: '4px 10px', borderRadius: 5, border: '1.5px solid var(--color-border-warning)', background: 'var(--color-background-warning)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--color-text-warning)' }}>{v}</div>
              </div>
            ))}
            {s.action !== 'done' && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-tertiary)', marginLeft: 4 }}>←— reversed</span>}
          </div>
        </div>
      )}

      {s.action === 'done' && (
        <div style={{ padding: '6px 12px', borderRadius: 'var(--border-radius-md)', background: 'var(--color-background-success)', border: '1px solid var(--color-border-success)', fontSize: 12.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-success)', fontWeight: 700, marginBottom: 14 }}>
          ✓ Reversed in O(n) time, O(1) space
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['← Prev', () => setStep(Math.max(0, step - 1)), step === 0], ['Next →', () => setStep(Math.min(REV_STEPS.length - 1, step + 1)), step === REV_STEPS.length - 1]].map(([l, a, d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: d ? 'not-allowed' : 'pointer', fontSize: 12, opacity: d ? 0.4 : 1 }}>{l}</button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 64, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {REV_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
        <button onClick={() => setStep(REV_STEPS.length - 1)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — SLOW / FAST POINTER (3 modes)
══════════════════════════════════════════════════════ */
function SlowFastViz() {
  const [mode, setMode] = useState('middle');
  const [step, setStep] = useState(0);

  const CONFIGS = {
    middle: { label: 'Find Middle', vals: MID_VALS, steps: MID_STEPS, cycleBack: null, showNull: true, slowColor: 'success', fastColor: 'warning' },
    cycle:  { label: 'Cycle Detection (Floyd)', vals: CYC_VALS, steps: CYC_STEPS, cycleBack: 2, showNull: false, slowColor: 'success', fastColor: 'warning' },
    nth:    { label: 'Nth From End (n=2)', vals: NTH_VALS, steps: NTH_STEPS, cycleBack: null, showNull: true, slowColor: 'info', fastColor: 'warning' },
  };
  const cfg = CONFIGS[mode];
  const s = cfg.steps[Math.min(step, cfg.steps.length - 1)];

  const changeMode = (m) => { setMode(m); setStep(0); };

  // Build highlights
  const highlights = {};
  const isNth = mode === 'nth';
  const slowIdx  = isNth ? s.trail : s.slow;
  const fastIdx  = isNth ? (s.lead < cfg.vals.length ? s.lead : -1) : s.fast;

  if (slowIdx  >= 0 && slowIdx  < cfg.vals.length) highlights[slowIdx]  = cfg.slowColor;
  if (fastIdx  >= 0 && fastIdx  < cfg.vals.length && fastIdx !== slowIdx) highlights[fastIdx] = cfg.fastColor;
  if (s.action === 'meet' || s.action === 'entry') {
    if (s.slow >= 0 && s.slow < cfg.vals.length) highlights[s.slow] = 'purple';
    if (s.fast >= 0 && s.fast < cfg.vals.length) highlights[s.fast] = 'purple';
  }

  // Labels
  const labels = {};
  const addLabel = (i, t, c) => {
    if (i < 0 || i >= cfg.vals.length) return;
    labels[i] = [...(labels[i] || []), { t, c }];
  };
  if (mode === 'nth') {
    if (s.trail >= 0) addLabel(s.trail, 'trail', 'info');
    if (s.lead >= 0 && s.lead < cfg.vals.length) addLabel(s.lead, 'lead', 'warning');
  } else {
    addLabel(s.slow, 'slow', cfg.slowColor);
    if (s.fast !== s.slow) addLabel(s.fast, 'fast', cfg.fastColor);
    if (s.action === 'phase2') { addLabel(s.slow, 'p1', 'success'); addLabel(s.fast, 'p2', 'warning'); }
  }

  return (
    <VizBox>
      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {Object.entries(CONFIGS).map(([k, v]) => (
          <button key={k} onClick={() => changeMode(k)} style={{ padding: '4px 10px', border: '1px solid', borderColor: mode === k ? 'var(--color-border-info)' : 'var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: mode === k ? 'var(--color-background-info)' : 'transparent', color: mode === k ? 'var(--color-text-info)' : 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12 }}>{v.label}</button>
        ))}
      </div>

      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        {s.desc}
      </div>

      {/* Label row */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 5 }}>
        {cfg.vals.map((_, i) => {
          const lbs = labels[i] || [];
          return (
            <div key={i} style={{ width: 74, display: 'flex', gap: 3, justifyContent: 'center' }}>
              {lbs.map(({ t, c }) => <PtrLabel key={t} label={t} color={c} />)}
            </div>
          );
        })}
        {mode === 'nth' && s.lead >= cfg.vals.length && (
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-warning)', fontWeight: 700, alignSelf: 'center', marginLeft: 4 }}>←lead (END)</span>
        )}
      </div>

      {/* List */}
      <div style={{ marginBottom: 14 }}>
        <ListRow vals={cfg.vals} highlights={highlights} cycleBack={cfg.cycleBack} showNull={cfg.showNull} />
      </div>

      {/* Result badge */}
      {(s.action === 'done' || s.action === 'meet' || s.action === 'entry') && (
        <div style={{ padding: '6px 12px', borderRadius: 'var(--border-radius-md)', background: 'var(--color-background-success)', border: '1px solid var(--color-border-success)', fontSize: 12.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-success)', fontWeight: 700, marginBottom: 14 }}>
          {mode === 'middle' && `✓ Middle = node ${cfg.vals[s.slow]} (index ${s.slow})`}
          {mode === 'cycle'  && s.action === 'entry' && `✓ Cycle entry = node ${cfg.vals[s.slow]}`}
          {mode === 'cycle'  && s.action === 'meet'  && `✓ Cycle detected at node ${cfg.vals[s.slow]}`}
          {mode === 'nth'    && `✓ 2nd from end = node ${cfg.vals[s.trail]} (index ${s.trail})`}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['← Prev', () => setStep(Math.max(0, step - 1)), step === 0], ['Next →', () => setStep(Math.min(cfg.steps.length - 1, step + 1)), step === cfg.steps.length - 1]].map(([l, a, d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: d ? 'not-allowed' : 'pointer', fontSize: 12, opacity: d ? 0.4 : 1 }}>{l}</button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 64, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {cfg.steps.length}</span>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — MERGE TWO SORTED LISTS
   [1→3→5] and [2→4→6] — pick-by-pick with dummy head
══════════════════════════════════════════════════════ */
function MergeListViz() {
  const [step, setStep] = useState(0);
  const s = MERGE_STEPS[Math.min(step, MERGE_STEPS.length - 1)];

  const hlA = {};
  const hlB = {};
  if (s.compareA !== undefined) hlA[s.compareA] = s.took === 'A' ? 'success' : 'info';
  if (s.compareB !== undefined) hlB[s.compareB] = s.took === 'B' ? 'success' : 'info';
  if (s.ai !== undefined) {
    for (let i = 0; i < s.ai; i++) hlA[i] = 'secondary'; // taken
  }
  if (s.bi !== undefined) {
    for (let i = 0; i < s.bi; i++) hlB[i] = 'secondary';
  }

  return (
    <VizBox>
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        {s.desc}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
        {/* List A */}
        <div>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-info)', marginBottom: 4, letterSpacing: '0.06em' }}>LIST A</div>
          <ListRow vals={MERGE_A} highlights={hlA} />
        </div>
        {/* List B */}
        <div>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-warning)', marginBottom: 4, letterSpacing: '0.06em' }}>LIST B</div>
          <ListRow vals={MERGE_B} highlights={hlB} />
        </div>
        {/* Merged result */}
        {s.merged.length > 0 && (
          <div>
            <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-success)', marginBottom: 4, letterSpacing: '0.06em' }}>MERGED</div>
            <ListRow vals={s.merged} highlights={s.merged.reduce((acc, _, i) => { acc[i] = i === s.merged.length - 1 ? 'success' : 'secondary'; return acc; }, {})} showNull={s.action === 'done'} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['← Prev', () => setStep(Math.max(0, step - 1)), step === 0], ['Next →', () => setStep(Math.min(MERGE_STEPS.length - 1, step + 1)), step === MERGE_STEPS.length - 1]].map(([l, a, d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: d ? 'not-allowed' : 'pointer', fontSize: 12, opacity: d ? 0.4 : 1 }}>{l}</button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 64, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {MERGE_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   PROBLEM CARD
══════════════════════════════════════════════════════ */
const DIFF_CLR = { 'IIT OA':'info','OA Easy':'success','OA Medium':'warning','OA Hard':'danger','LC Medium':'info','LC Hard':'purple' };
function ProblemCard({ num, title, difficulty, tags=[], statement, constraints=[], examples=[], approach, code }) {
  const [open, setOpen] = useState(false);
  const dc = DIFF_CLR[difficulty] || 'info';
  return (
    <div style={{ border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-lg)',overflow:'hidden',marginBottom:'1rem' }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 16px',background:'var(--color-background-secondary)',borderBottom:'1px solid var(--color-border-tertiary)' }}>
        <div style={{ display:'flex',alignItems:'center',gap:10 }}><span style={{ fontFamily:'var(--font-mono)',fontSize:10.5,fontWeight:700,color:'var(--color-text-tertiary)',minWidth:26 }}>Q{num}</span><span style={{ fontSize:13.5,fontWeight:600,color:'var(--color-text-primary)' }}>{title}</span></div>
        <div style={{ display:'flex',gap:6,alignItems:'center',flexWrap:'wrap',justifyContent:'flex-end' }}>{tags.map(t=><span key={t} style={{ padding:'1px 7px',borderRadius:12,fontSize:10.5,background:'var(--color-background-tertiary)',color:'var(--color-text-tertiary)',fontWeight:500 }}>{t}</span>)}<span style={{ padding:'2px 9px',borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${dc})`,color:`var(--color-text-${dc})`,border:`1px solid var(--color-border-${dc})` }}>{difficulty}</span></div>
      </div>
      <div style={{ padding:'14px 16px' }}>
        <p style={{ fontSize:13.5,color:'var(--color-text-secondary)',lineHeight:1.72,marginBottom:12 }} dangerouslySetInnerHTML={{ __html:statement }} />
        {constraints.length>0&&<div style={{ marginBottom:12 }}><div style={{ fontSize:10.5,fontWeight:600,color:'var(--color-text-tertiary)',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:5 }}>Constraints</div><div style={{ display:'flex',flexWrap:'wrap',gap:5 }}>{constraints.map((c,i)=><code key={i} style={{ padding:'2px 8px',borderRadius:4,fontSize:11.5,background:'var(--color-background-secondary)',color:'var(--color-text-secondary)',border:'0.5px solid var(--color-border-tertiary)',fontFamily:'var(--font-mono)' }}>{c}</code>)}</div></div>}
        {examples.length>0&&<div style={{ marginBottom:14 }}>{examples.map((ex,i)=><div key={i} style={{ background:'var(--color-background-secondary)',border:'0.5px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',padding:'9px 12px',marginBottom:6,fontFamily:'var(--font-mono)',fontSize:12 }}><div style={{ color:'var(--color-text-tertiary)',fontSize:10,marginBottom:4,letterSpacing:'0.06em' }}>EXAMPLE {i+1}</div><div><span style={{ color:'var(--color-text-success)' }}>Input: </span><span style={{ color:'var(--color-text-secondary)' }}>{ex.input}</span></div><div><span style={{ color:'var(--color-text-info)' }}>Output: </span><span style={{ color:'var(--color-text-secondary)' }}>{ex.output}</span></div>{ex.note&&<div style={{ color:'var(--color-text-tertiary)',fontSize:11,marginTop:3 }}>{ex.note}</div>}</div>)}</div>}
        <button onClick={()=>setOpen(!open)} style={{ display:'flex',alignItems:'center',gap:6,padding:'6px 14px',border:'1px solid var(--color-border-primary)',borderRadius:'var(--border-radius-md)',background:open?'var(--color-background-secondary)':'transparent',color:'var(--color-text-secondary)',cursor:'pointer',fontSize:12.5,fontFamily:'var(--font-sans)',transition:'all 0.15s' }}>
          <i className={`ti ti-${open?'eye-off':'bulb'}`} />{open?'Hide Solution':'Show Approach & Solution'}
        </button>
        {open&&<div style={{ marginTop:12 }}><div style={{ background:'var(--color-background-info)',border:'1px solid var(--color-border-info)',borderRadius:'var(--border-radius-md)',padding:'9px 13px',marginBottom:10,fontSize:13,color:'var(--color-text-info)',lineHeight:1.68 }}><strong>Approach: </strong>{approach}</div><Code>{code}</Code></div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — MEMORY & STRUCTURE
══════════════════════════════════════════════════════ */
function SectionMemory() {
  return (
    <div>
      <Note color="info" icon="ti-link">
        A linked list stores elements in nodes scattered across heap memory. Each node holds a <strong>value</strong> and a <strong>pointer</strong> to the next node. Unlike arrays, there is no random access — you must traverse from the head.
      </Note>

      <H2>Why Linked Lists Exist — The Core Trade-off</H2>
      <Table
        heads={["Operation", "Array", "Linked List", "Notes"]}
        rows={[
          ["Access by index", "O(1)", "O(n)", "Arrays win: direct offset arithmetic"],
          ["Insert at head",  "O(n)", "O(1)", "Arrays must shift everything right"],
          ["Insert at tail",  "O(1)*","O(n) or O(1)**","*amortized; **O(1) with tail pointer"],
          ["Insert at pos i", "O(n)", "O(n) traverse + O(1) link", "Both linear — LL avoids shifting"],
          ["Delete at head",  "O(n)", "O(1)", "Array shifts; LL just moves head pointer"],
          ["Delete at pos i", "O(n)", "O(n) traverse + O(1) unlink","LL wins on actual delete operation"],
          ["Search",          "O(n)", "O(n)", "Equal: both need linear scan"],
          ["Memory",          "Contiguous","Scattered + pointer overhead","Arrays: better cache locality"],
        ]}
      />

      <H2>Node Definition — Singly, Doubly, Circular</H2>
      <Code>{{cpp: `// Singly Linked List Node
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Doubly Linked List Node
struct DListNode {
    int val;
    DListNode* prev;
    DListNode* next;
    DListNode(int x) : val(x), prev(nullptr), next(nullptr) {}
};

// Circular: last node's next points back to head (not nullptr)
// Detected by: curr->next == head  (not curr->next == nullptr)

// Memory layout (singly, [1→2→3]):
// Node@0x100: { val=1, next=0x200 }
// Node@0x200: { val=2, next=0x300 }
// Node@0x300: { val=3, next=nullptr }
// Head pointer = 0x100`, python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val  = val
        self.next = next

# Create [1→2→3]:
head = ListNode(1, ListNode(2, ListNode(3)))

# Traverse:
cur = head
while cur:
    print(cur.val, end=' ')
    cur = cur.next          # O(n) total

# Build from list:
def build(vals):
    if not vals: return None
    head = ListNode(vals[0])
    cur  = head
    for v in vals[1:]:
        cur.next = ListNode(v); cur = cur.next
    return head`}}</Code>

      <H2>The Dummy Head Trick</H2>
      <P>A dummy (sentinel) head node simplifies insertion and deletion at the true head by eliminating the "is it the first node?" special case. You always work with the node <em>before</em> the target. After all operations, return <code>dummy.next</code>.</P>
      <Code>{{cpp: `// Without dummy head — messy special case for head insertion
ListNode* insertBefore(ListNode* head, ListNode* prev, int val) {
    if (prev == nullptr) {  // inserting at head
        ListNode* node = new ListNode(val);
        node->next = head; return node;
    }
    // insert after prev...
}

// With dummy head — uniform logic, no special cases
ListNode dummy(0);
dummy.next = head;
ListNode* prev = &dummy;
// ... traverse ... insert after prev ...
return dummy.next;  // new head`, python: `# Dummy head pattern — eliminates head special case
dummy = ListNode(0)
dummy.next = head
prev = dummy
# ... manipulate via prev.next ...
return dummy.next`}}</Code>

      <QA q="Why do linked lists have poor cache performance compared to arrays?" a="Modern CPUs fetch memory in cache lines (~64 bytes). Array elements sit contiguously — accessing arr[i+1] after arr[i] is often already in cache. Linked list nodes are allocated separately on the heap at arbitrary addresses. Accessing node.next requires a pointer dereference to a potentially different cache line — a cache miss. For sequential traversal on modern hardware, arrays can be 3–10× faster than linked lists due to prefetching and cache locality, even though the algorithmic complexity is identical O(n)." />
      <QA q="When would you actually prefer a linked list over an array in real-world code?" a="(1) Deque/queue with frequent head insertions/deletions where no random access is needed. (2) LRU Cache — constant-time node move to front requires O(1) delete + O(1) insert (doubly linked list + hash map). (3) Undo systems — each operation is a node; undo = pop head. (4) When the list size is unknown and memory reallocation (copying entire array) is expensive. (5) Implementing stacks or queues at the algorithmic level. In practice, std::deque or circular buffers often win over linked lists even for queue operations." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — CORE OPERATIONS
══════════════════════════════════════════════════════ */
function SectionOps() {
  return (
    <div>
      <H2>Insertion — Head, Tail, Middle</H2>
      <Code>{{cpp: `ListNode* insertAtHead(ListNode* head, int val) {
    ListNode* node = new ListNode(val);
    node->next = head;   // point new node to old head
    return node;          // new head
}

ListNode* insertAtTail(ListNode* head, int val) {
    ListNode* node = new ListNode(val);
    if (!head) return node;
    ListNode* cur = head;
    while (cur->next) cur = cur->next;  // O(n) traverse to tail
    cur->next = node;
    return head;
}

// Insert after a specific node — O(1) given the node
void insertAfter(ListNode* prev, int val) {
    ListNode* node = new ListNode(val);
    node->next  = prev->next;   // 1. new node points to prev's successor
    prev->next  = node;          // 2. prev now points to new node
    // ORDER MATTERS: step 1 before step 2 — else we lose the rest of the list
}`, python: `def insert_at_head(head, val):
    node = ListNode(val)
    node.next = head
    return node

def insert_at_tail(head, val):
    node = ListNode(val)
    if not head: return node
    cur = head
    while cur.next: cur = cur.next
    cur.next = node; return head

def insert_after(prev, val):
    node = ListNode(val)
    node.next = prev.next  # 1. link forward FIRST
    prev.next = node        # 2. then update prev`}}</Code>

      <H2>Deletion — Head, Tail, By Value</H2>
      <Code>{{cpp: `ListNode* deleteHead(ListNode* head) {
    if (!head) return nullptr;
    ListNode* tmp = head;
    head = head->next;
    delete tmp;          // free memory (C++ only)
    return head;
}

// Delete first node with value = target — O(n)
ListNode* deleteVal(ListNode* head, int target) {
    ListNode dummy(0); dummy.next = head;
    ListNode* prev = &dummy;
    while (prev->next) {
        if (prev->next->val == target) {
            ListNode* tmp = prev->next;
            prev->next = tmp->next;   // bypass the target node
            delete tmp;
            break;
        }
        prev = prev->next;
    }
    return dummy.next;
}`, python: `def delete_val(head, target):
    dummy = ListNode(0); dummy.next = head
    prev = dummy
    while prev.next:
        if prev.next.val == target:
            prev.next = prev.next.next   # bypass
            break
        prev = prev.next
    return dummy.next`}}</Code>

      <H2>Reversal — The Three-Pointer Technique (Interactive)</H2>
      <P>The most-asked linked list operation. Three pointers: <code>prev</code> (the reversed chain's current tail), <code>cur</code> (node being processed), <code>nxt</code> (saved before overwriting). At each step: save nxt, flip cur's pointer to prev, advance prev and cur.</P>
      <ReverseViz />
      <Code>{{cpp: `ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr, *cur = head;
    while (cur) {
        ListNode* nxt = cur->next;  // 1. save next BEFORE overwriting
        cur->next     = prev;       // 2. flip pointer
        prev          = cur;        // 3. advance prev
        cur           = nxt;        // 4. advance cur
    }
    return prev;  // prev is now the new head
}
// [1→2→3→4→5] → [5→4→3→2→1→null]   O(n) time, O(1) space`, python: `def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next    # save before overwrite
        cur.next = prev   # flip
        prev = cur        # advance
        cur  = nxt
    return prev           # prev = new head

# Recursive version (O(n) stack space):
def reverse_rec(head):
    if not head or not head.next: return head
    new_head = reverse_rec(head.next)
    head.next.next = head   # head.next points back to head
    head.next = None        # head is now the new tail
    return new_head`}}</Code>
      <Note color="warning" icon="ti-alert-triangle">
        <strong>The order matters:</strong> Always save <code>nxt = cur.next</code> before writing <code>cur.next = prev</code>. If you reverse the order, you lose the reference to the rest of the list — it becomes unreachable and leaked.
      </Note>

      <H2>Reverse in K-Groups (LC 25)</H2>
      <P>Reverse every K nodes as a group. The elegant approach: reverse a group using the three-pointer technique, reconnect to the next group, recurse. Check if K nodes remain before reversing.</P>
      <Code>{{cpp: `ListNode* reverseKGroup(ListNode* head, int k) {
    // Check if k nodes remain
    ListNode* check = head;
    for (int i = 0; i < k; i++) {
        if (!check) return head;   // < k nodes left — leave as-is
        check = check->next;
    }
    // Reverse k nodes starting from head
    ListNode* prev = nullptr, *cur = head;
    for (int i = 0; i < k; i++) {
        ListNode* nxt = cur->next; cur->next = prev; prev = cur; cur = nxt;
    }
    // head is now the tail of the reversed group
    head->next = reverseKGroup(cur, k);  // recurse on remaining
    return prev;  // prev is the new head of this group
}
// [1→2→3→4→5], k=2 → [2→1→4→3→5]`, python: `def reverse_k_group(head, k):
    cur = head
    for _ in range(k):
        if not cur: return head  # < k nodes left
        cur = cur.next
    prev = None; cur = head
    for _ in range(k):
        nxt = cur.next; cur.next = prev; prev = cur; cur = nxt
    head.next = reverse_k_group(cur, k)
    return prev`}}</Code>

      <QA q="What is the time and space complexity of recursive reversal?" a="Time O(n) — every node is visited exactly once. Space O(n) — each recursive call adds a frame to the call stack, and the recursion depth equals the list length. This contrasts with the iterative three-pointer reversal which uses O(1) extra space. For very long lists (millions of nodes), recursive reversal risks stack overflow — use iterative." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — TWO-POINTER PATTERNS
══════════════════════════════════════════════════════ */
function SectionTwoPointers() {
  return (
    <div>
      <Note color="success" icon="ti-bolt">
        The <strong>slow/fast pointer</strong> (Floyd's tortoise and hare) is the most versatile linked list technique. A pointer moving at 2× speed relative to another unlocks: cycle detection, middle finding, Nth from end, and palindrome checking — all in O(n) time, O(1) space.
      </Note>

      <H2>Three Classic Problems — Unified by Slow/Fast</H2>
      <SlowFastViz />

      <H2>Find Middle of Linked List (LC 876)</H2>
      <Code>{{cpp: `ListNode* findMiddle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;           // 1 step
        fast = fast->next->next;     // 2 steps
    }
    return slow;  // for even length, returns SECOND middle
}
// [1→2→3→4→5] → node(3)  |  [1→2→3→4] → node(3) — second middle`, python: `def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`}}</Code>

      <H2>Cycle Detection — Floyd's Algorithm (LC 141, 142)</H2>
      <P><strong>Phase 1</strong>: Detect cycle (slow and fast meet). <strong>Phase 2</strong>: Find cycle start (reset one pointer to head, move both at speed 1 until they meet).</P>
      <Code>{{cpp: `// Phase 1: detect cycle
bool hasCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;  // met inside the cycle
    }
    return false;
}

// Phase 2: find cycle start (LC 142)
ListNode* detectCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if (slow == fast) {
            slow = head;              // reset one to head
            while (slow != fast) {   // both move 1 step
                slow = slow->next; fast = fast->next;
            }
            return slow;  // cycle start
        }
    }
    return nullptr;
}`, python: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
        if slow is fast: return True
    return False

def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
        if slow is fast:
            slow = head
            while slow is not fast:
                slow = slow.next; fast = fast.next
            return slow   # cycle entry
    return None`}}</Code>
      <Note color="info" icon="ti-math">
        <strong>Why Phase 2 works:</strong> When slow and fast first meet, let the cycle length be C and the distance from head to cycle start be L. It can be shown that the meeting point is exactly C - (L % C) steps from the cycle start. After resetting one pointer to head and moving both at speed 1, they travel L more steps and meet precisely at the cycle entry.
      </Note>

      <H2>Remove Nth Node From End (LC 19)</H2>
      <P>Advance the lead pointer by N steps, then move both pointers together. When lead reaches NULL, the trail pointer is at the node just <em>before</em> the target — ready for deletion.</P>
      <Code>{{cpp: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0); dummy.next = head;
    ListNode* lead = &dummy, *trail = &dummy;

    for (int i = 0; i <= n; i++) lead = lead->next;  // advance lead n+1 steps

    while (lead) { lead = lead->next; trail = trail->next; }

    trail->next = trail->next->next;  // delete the nth-from-end node
    return dummy.next;
}
// [1→2→3→4→5], n=2 → remove 4 → [1→2→3→5]`, python: `def remove_nth_from_end(head, n):
    dummy = ListNode(0); dummy.next = head
    lead = trail = dummy
    for _ in range(n + 1): lead = lead.next  # n+1 steps ahead
    while lead:
        lead = lead.next; trail = trail.next
    trail.next = trail.next.next   # remove
    return dummy.next`}}</Code>

      <H2>Linked List Palindrome Check</H2>
      <P>Three steps: (1) Find middle with slow/fast. (2) Reverse the second half in-place. (3) Compare both halves. Optionally restore the list. O(n) time, O(1) space.</P>
      <Code>{{cpp: `bool isPalindrome(ListNode* head) {
    // 1. Find middle
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }

    // 2. Reverse second half (slow is now at middle/right-middle)
    ListNode* prev = nullptr, *cur = slow;
    while (cur) { ListNode* nxt = cur->next; cur->next = prev; prev = cur; cur = nxt; }

    // 3. Compare
    ListNode* left = head, *right = prev;
    while (right) {
        if (left->val != right->val) return false;
        left = left->next; right = right->next;
    }
    return true;
}
// [1→2→2→1] → true  |  [1→2→3→2→1] → true  |  [1→2] → false`, python: `def is_palindrome(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
    # Reverse from slow
    prev = None; cur = slow
    while cur: nxt=cur.next; cur.next=prev; prev=cur; cur=nxt
    # Compare
    left, right = head, prev
    while right:
        if left.val != right.val: return False
        left = left.next; right = right.next
    return True`}}</Code>

      <QA q="Why does advancing the lead pointer by n+1 steps (instead of n) in Remove Nth From End work?" a="We want to stop the trail pointer <em>before</em> the node to delete — so we can do <code>trail.next = trail.next.next</code>. If we advance by n, trail stops AT the node to delete. By starting both at a dummy node and advancing lead by n+1, trail stops at the predecessor of the target. The dummy head also handles the edge case of deleting the original head node uniformly." />
      <QA q="Why does Floyd's algorithm guarantee O(n) and not run forever?" a="Once fast enters the cycle, it gains 1 step on slow per iteration (fast moves 2, slow moves 1 — net gain of 1 within the cycle). Since the cycle has finite length C, after at most C iterations, fast laps slow and they meet. The meeting happens within the cycle, never taking more than O(L + C) = O(n) steps total, where L is the path to the cycle and C is the cycle length." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — MERGE, SORT, ADVANCED PATTERNS
══════════════════════════════════════════════════════ */
function SectionMergeSort() {
  return (
    <div>
      <H2>Merging Two Sorted Lists (LC 21)</H2>
      <P>Use a dummy head and a tail pointer. At each step compare the heads of both lists, attach the smaller one to tail, advance that list's pointer. Append the remaining non-empty list at the end.</P>
      <MergeListViz />
      <Code>{{cpp: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0); ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }
        else                    { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;   // attach remainder
    return dummy.next;
}`, python: `def merge_two_lists(l1, l2):
    dummy = tail = ListNode(0)
    while l1 and l2:
        if l1.val <= l2.val: tail.next = l1; l1 = l1.next
        else:                 tail.next = l2; l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next`}}</Code>

      <H2>Sort a Linked List — Merge Sort (LC 148)</H2>
      <P>Merge sort is the natural choice for linked lists: the <em>split</em> uses the slow/fast middle-finding technique, and the <em>merge</em> is O(n) without extra space (just relinking pointers). No random-access needed. O(n log n) time, O(log n) stack space.</P>
      <Code>{{cpp: `ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;  // base case

    // Find middle and split
    ListNode* slow = head, *fast = head->next;  // fast starts at next: avoids infinite loop
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    ListNode* mid  = slow->next;
    slow->next     = nullptr;   // cut the list in two

    ListNode* left  = sortList(head);
    ListNode* right = sortList(mid);
    return mergeTwoLists(left, right);
}
// T(n) = 2T(n/2) + O(n) → O(n log n) — Master Theorem Case 2`, python: `def sort_list(head):
    if not head or not head.next: return head
    slow, fast = head, head.next          # fast at head.next avoids equal split
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
    mid = slow.next; slow.next = None     # split
    return merge_two_lists(sort_list(head), sort_list(mid))`}}</Code>

      <H2>Add Two Numbers (LC 2)</H2>
      <P>Each list represents a number in reverse order (least significant digit first). Traverse both simultaneously, sum digits with carry. Create a new node per digit. If one list is longer, continue with remaining nodes + carry.</P>
      <Code>{{cpp: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0); ListNode* cur = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum  = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry    = sum / 10;
        cur->next = new ListNode(sum % 10);
        cur       = cur->next;
    }
    return dummy.next;
}
// l1=[2→4→3] (342), l2=[5→6→4] (465) → [7→0→8] (807)`, python: `def add_two_numbers(l1, l2):
    dummy = cur = ListNode(0)
    carry = 0
    while l1 or l2 or carry:
        s = carry
        if l1: s += l1.val; l1 = l1.next
        if l2: s += l2.val; l2 = l2.next
        carry, digit = divmod(s, 10)
        cur.next = ListNode(digit); cur = cur.next
    return dummy.next`}}</Code>

      <H2>LRU Cache — Doubly Linked List + HashMap (LC 146)</H2>
      <P>Least Recently Used cache: get and put both in O(1). The doubly linked list maintains recency order (most recent at head, least recent at tail). The HashMap provides O(1) key-to-node lookup. On access/update: move node to head. On eviction: remove the tail.</P>
      <Code>{{cpp: `class LRUCache {
    int capacity;
    list<pair<int,int>> dll;           // {key, val} — most recent at front
    unordered_map<int, list<pair<int,int>>::iterator> mp;  // key → iterator

public:
    LRUCache(int cap) : capacity(cap) {}

    int get(int key) {
        if (!mp.count(key)) return -1;
        dll.splice(dll.begin(), dll, mp[key]);  // move to front — O(1)
        return mp[key]->second;
    }

    void put(int key, int value) {
        if (mp.count(key)) {
            mp[key]->second = value;
            dll.splice(dll.begin(), dll, mp[key]);  // update & move to front
            return;
        }
        if (dll.size() == capacity) {
            mp.erase(dll.back().first);  // evict LRU (tail)
            dll.pop_back();
        }
        dll.emplace_front(key, value);
        mp[key] = dll.begin();
    }
};`, python: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()  # maintains insertion order + O(1) move_to_end

    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)  # mark as most recent
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)  # evict LRU (front)`}}</Code>

      <H2>Intersection of Two Linked Lists (LC 160)</H2>
      <P>Two lists that converge at a common node. The elegant two-pointer trick: after pointer A reaches the end of list A, redirect it to the head of list B. Do the same for B. They will meet at the intersection after traveling equal total distances.</P>
      <Code>{{cpp: `ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    ListNode* a = headA, *b = headB;
    while (a != b) {
        a = a ? a->next : headB;  // when a reaches end, jump to headB
        b = b ? b->next : headA;  // when b reaches end, jump to headA
    }
    return a;  // either intersection node or nullptr (no intersection)
}
// After lenA + lenB steps, both pointers have traveled the same distance
// and must meet at the intersection (or both reach nullptr if no intersection)`, python: `def get_intersection_node(headA, headB):
    a, b = headA, headB
    while a is not b:
        a = a.next if a else headB
        b = b.next if b else headA
    return a`}}</Code>

      <QA q="Why does the two-pointer intersection trick work? Is it just magic?" a="Let lenA = length of list A before intersection, lenB = length of list B before intersection, and C = length of common tail. Pointer A travels: lenA + C + lenB. Pointer B travels: lenB + C + lenA. Both travel the same total distance — so they meet at the intersection after exactly lenA + lenB + C steps. If there's no intersection, both pointers reach nullptr simultaneously (traveling lenA + lenB steps each)." />
      <QA q="Why is doubly linked list required for LRU Cache and not singly linked list?" a="When we evict or move a node, we need O(1) access to its predecessor to update the predecessor's next pointer. With a singly linked list, removing an arbitrary node requires O(n) traversal to find the predecessor. A doubly linked list's prev pointer makes predecessor access O(1) — enabling O(1) delete and O(1) move-to-front, which are the core LRU operations." />
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
        6 high-frequency linked list problems — every major interview pattern is covered. Slow/fast, in-place reversal, merge, cycle — all in O(1) space.
      </Note>

      <ProblemCard num={1} title="Reverse Linked List" difficulty="OA Easy" tags={["LC 206","In-place"]}
        statement="Given the head of a singly linked list, reverse the list and return the reversed list's head. Solve iteratively (O(1) space)."
        constraints={["0 ≤ n ≤ 5000","−5000 ≤ val ≤ 5000"]}
        examples={[{input:"1→2→3→4→5",output:"5→4→3→2→1"},{input:"1→2",output:"2→1"},{input:"[]",output:"[]"}]}
        approach="Three-pointer iterative: prev=null, cur=head. At each step: save nxt=cur.next, flip cur.next=prev, advance prev=cur, cur=nxt. When cur is null, prev is the new head. O(n) time, O(1) space."
        code={{cpp:`ListNode* reverseList(ListNode* head) {
    ListNode* prev=nullptr, *cur=head;
    while(cur){
        ListNode* nxt=cur->next;
        cur->next=prev; prev=cur; cur=nxt;
    }
    return prev;
}`,python:`def reverse_list(head):
    prev, cur = None, head
    while cur:
        nxt=cur.next; cur.next=prev; prev=cur; cur=nxt
    return prev`}}
      />

      <ProblemCard num={2} title="Linked List Cycle II" difficulty="LC Medium" tags={["LC 142","Floyd's Algorithm"]}
        statement="Given a linked list, return the node where the cycle begins. If there is no cycle, return <code>null</code>."
        constraints={["-10⁴ ≤ val ≤ 10⁴","0 ≤ pos (cycle index)","O(1) space"]}
        examples={[{input:"3→1→2→4, pos=2 (4→2)",output:"node 2",note:"Cycle starts at second node from head with val=2"},{input:"1→2, pos=-1",output:"null"}]}
        approach="Phase 1 (Floyd): slow and fast pointers meet inside cycle. Phase 2: reset one pointer to head, advance both at speed 1. They meet at the cycle entry. Mathematical proof: let L=dist to entry, C=cycle length. Meeting point is C-(L%C) from entry. Resetting and moving L more steps reaches entry from both directions simultaneously."
        code={{cpp:`ListNode* detectCycle(ListNode* head) {
    ListNode* s=head, *f=head;
    while(f&&f->next){
        s=s->next; f=f->next->next;
        if(s==f){
            s=head;
            while(s!=f){s=s->next;f=f->next;}
            return s;
        }
    }
    return nullptr;
}`,python:`def detect_cycle(head):
    s=f=head
    while f and f.next:
        s=s.next;f=f.next.next
        if s is f:
            s=head
            while s is not f:s=s.next;f=f.next
            return s
    return None`}}
      />

      <ProblemCard num={3} title="Merge Two Sorted Lists" difficulty="OA Easy" tags={["LC 21","Dummy Head"]}
        statement="Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists."
        constraints={["0 ≤ n, m ≤ 50","−100 ≤ val ≤ 100","Both lists sorted ascending"]}
        examples={[{input:"1→2→4  and  1→3→4",output:"1→1→2→3→4→4"},{input:"[] and []",output:"[]"}]}
        approach="Dummy head + tail pointer. At each step compare current heads, attach the smaller to tail, advance that list. After either list is exhausted, append the remaining list to tail. O(n+m) time, O(1) space (in-place relinking)."
        code={{cpp:`ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode d(0); ListNode* t=&d;
    while(l1&&l2){
        if(l1->val<=l2->val){t->next=l1;l1=l1->next;}
        else{t->next=l2;l2=l2->next;}
        t=t->next;
    }
    t->next=l1?l1:l2; return d.next;
}`,python:`def merge_two_lists(l1,l2):
    dummy=tail=ListNode(0)
    while l1 and l2:
        if l1.val<=l2.val:tail.next=l1;l1=l1.next
        else:tail.next=l2;l2=l2.next
        tail=tail.next
    tail.next=l1 or l2
    return dummy.next`}}
      />

      <ProblemCard num={4} title="Remove Nth Node From End of List" difficulty="LC Medium" tags={["LC 19","Slow/Fast"]}
        statement="Given the head of a linked list, remove the <strong>nth node from the end</strong> of the list and return its head. Solve in one pass."
        constraints={["1 ≤ n ≤ sz ≤ 30","0 ≤ val ≤ 100"]}
        examples={[{input:"1→2→3→4→5, n=2",output:"1→2→3→5"},{input:"[1], n=1",output:"[]"},{input:"1→2, n=1",output:"[1]"}]}
        approach="Dummy head + two pointers. Advance lead n+1 steps ahead (one extra so trail stops before target). Move both until lead is null. trail.next = trail.next.next removes the target. The n+1 offset handles deletion of the head node uniformly via the dummy."
        code={{cpp:`ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode d(0); d.next=head;
    ListNode* lead=&d, *trail=&d;
    for(int i=0;i<=n;i++) lead=lead->next;
    while(lead){lead=lead->next;trail=trail->next;}
    trail->next=trail->next->next;
    return d.next;
}`,python:`def remove_nth_from_end(head,n):
    dummy=ListNode(0);dummy.next=head
    lead=trail=dummy
    for _ in range(n+1):lead=lead.next
    while lead:lead=lead.next;trail=trail.next
    trail.next=trail.next.next
    return dummy.next`}}
      />

      <ProblemCard num={5} title="Sort List" difficulty="LC Medium" tags={["LC 148","Merge Sort on LL"]}
        statement="Sort a linked list in <strong>O(n log n)</strong> time using constant space complexity."
        constraints={["0 ≤ n ≤ 5×10⁴","−10⁵ ≤ val ≤ 10⁵"]}
        examples={[{input:"4→2→1→3",output:"1→2→3→4"},{input:"-1→5→3→4→0",output:"-1→0→3→4→5"}]}
        approach="Merge sort: find middle using slow/fast (fast starts at head.next to get left-biased split), cut the list, recursively sort both halves, merge. T(n) = 2T(n/2) + O(n) → O(n log n). Stack depth O(log n). Bottom-up merge sort achieves true O(1) extra space but is more complex to implement."
        code={{cpp:`ListNode* sortList(ListNode* head) {
    if(!head||!head->next) return head;
    ListNode* slow=head, *fast=head->next;
    while(fast&&fast->next){slow=slow->next;fast=fast->next->next;}
    ListNode* mid=slow->next; slow->next=nullptr;
    return mergeTwoLists(sortList(head),sortList(mid));
}`,python:`def sort_list(head):
    if not head or not head.next: return head
    slow,fast=head,head.next
    while fast and fast.next:slow=slow.next;fast=fast.next.next
    mid=slow.next;slow.next=None
    return merge_two_lists(sort_list(head),sort_list(mid))`}}
      />

      <ProblemCard num={6} title="Copy List with Random Pointer" difficulty="LC Medium" tags={["LC 138","HashMap Clone"]}
        statement="A linked list where each node has a <code>next</code> and a <code>random</code> pointer (may point to any node or null). Return a <strong>deep copy</strong> of the list."
        constraints={["0 ≤ n ≤ 1000","-10⁴ ≤ val ≤ 10⁴","random points to a node in the list or null"]}
        examples={[{input:"[[7,null],[13,0],[11,4],[10,2],[1,0]]",output:"Deep copy of same structure"}]}
        approach="HashMap approach: two passes. Pass 1 — create a copy of each node, store {original → copy} in a map. Pass 2 — set next and random pointers of each copy using the map. O(n) time, O(n) space. Alternative O(1) space: interleave copy nodes in original list, set randoms, then separate the two lists."
        code={{cpp:`Node* copyRandomList(Node* head) {
    unordered_map<Node*, Node*> mp;
    Node* cur=head;
    // Pass 1: create copies
    while(cur){mp[cur]=new Node(cur->val);cur=cur->next;}
    // Pass 2: set pointers
    cur=head;
    while(cur){
        mp[cur]->next  =mp[cur->next];
        mp[cur]->random=mp[cur->random];
        cur=cur->next;
    }
    return mp[head];
}`,python:`def copy_random_list(head):
    if not head: return None
    mp={}
    cur=head
    while cur:mp[cur]=ListNode(cur.val);cur=cur.next
    cur=head
    while cur:
        if cur.next:mp[cur].next=mp[cur.next]
        if cur.random:mp[cur].random=mp[cur.random]
        cur=cur.next
    return mp[head]`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: 'memory',      label: 'Memory & Structure' },
  { id: 'ops',         label: 'Core Operations' },
  { id: 'twopointer',  label: 'Two-Pointer Patterns' },
  { id: 'mergesort',   label: 'Merge, Sort & LRU' },
  { id: 'problems',    label: 'Problems' },
];

export default function LinkedList() {
  const [active, setActive] = useState('memory');
  const map = {
    memory:     <SectionMemory />,
    ops:        <SectionOps />,
    twopointer: <SectionTwoPointers />,
    mergesort:  <SectionMergeSort />,
    problems:   <SectionProblems />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 14</div>
        <h1 className="page-header-title">Linked Lists</h1>
        <p className="page-header-subtitle">
          Node Anatomy · Dummy Head · In-Place Reversal · Floyd's Cycle Detection · Merge Sort · LRU Cache · LC 19, 21, 142, 146, 148, 206
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{ padding: '0.5rem 0 2rem' }}>{map[active]}</div>
      <NavButtons moduleId={14} />
    </div>
  );
}
