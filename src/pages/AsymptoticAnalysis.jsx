import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx, Math as KaTeX } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ═══════════════════════════════════════════════════════
   SHARED SVG ARROW MARKER (use unique id per tree)
═══════════════════════════════════════════════════════ */
const TreeArrow = ({ id }) => (
  <defs>
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5"
      markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 1 L 9 5 L 0 9 Z" fill="context-stroke" />
    </marker>
  </defs>
);

/* ═══════════════════════════════════════════════════════
   BIG-O VISUALIZER (interactive bound explorer)
═══════════════════════════════════════════════════════ */
function BigOVisualizer() {
  const [c, setC] = useState(4);

  const W = 390, H = 172;
  const pad = { t: 12, r: 28, b: 36, l: 44 };
  const maxN = 12;
  const chartH = H - pad.t - pad.b;
  const chartW = W - pad.l - pad.r;

  const f = n => 3 * n * n + 5 * n;
  const cg = n => c * n * n;

  let n0 = -1;
  for (let n = 1; n <= maxN; n++) {
    if (cg(n) >= f(n)) { n0 = n; break; }
  }

  const maxVal = Math.max(f(maxN), cg(maxN)) * 1.06;
  const sx = n => pad.l + (n - 1) / (maxN - 1) * chartW;
  const sy = v => H - pad.b - Math.min(v / maxVal, 1.02) * chartH;

  const mkPath = fn => Array.from({ length: maxN }, (_, i) => {
    const n = i + 1;
    return `${i === 0 ? 'M' : 'L'} ${sx(n).toFixed(1)} ${Math.max(pad.t, sy(fn(n))).toFixed(1)}`;
  }).join(' ');

  const hasN0 = n0 >= 1 && n0 <= maxN;
  const verdict = hasN0
    ? `3n² + 5n ≤ ${c}·n²  for all  n ≥ ${n0}   ✓  c = ${c}, n₀ = ${n0}`
    : `c·n² never exceeds f(n) on this range — try a larger c`;

  return (
    <div style={{ maxWidth: 460, margin: '0 auto', width: '100%' }}>
      <VizBox>
        <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-primary)', marginBottom: 8 }}>
          Big-O Visualizer — f(n) = 3n² + 5n &nbsp;vs&nbsp; c·g(n) = c·n²
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 28px', gap: 8, alignItems: 'center', fontSize: 12.5, marginBottom: 10 }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>c =</span>
          <input type="range" min={3} max={8} step={0.5} value={c} onChange={e => setC(+e.target.value)} />
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-primary)' }}>{c}</code>
        </div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
          <defs>
            <clipPath id="bov-clip"><rect x={pad.l} y={pad.t} width={chartW} height={chartH} /></clipPath>
          </defs>
          {/* Axes */}
          <line x1={pad.l} y1={H - pad.b} x2={W - pad.r + 12} y2={H - pad.b} stroke="var(--color-border-secondary)" strokeWidth={1} />
          <line x1={pad.l} y1={H - pad.b} x2={pad.l} y2={pad.t - 5} stroke="var(--color-border-secondary)" strokeWidth={1} />
          <text x={W - pad.r + 14} y={H - pad.b + 4} fill="var(--color-text-tertiary)" fontSize={10} fontFamily="var(--font-mono)">n</text>
          {[3, 6, 9, 12].map(n => (
            <text key={n} x={sx(n)} y={H - pad.b + 13} textAnchor="middle" fill="var(--color-text-tertiary)" fontSize={9} fontFamily="var(--font-mono)">{n}</text>
          ))}
          {/* n₀ marker */}
          {hasN0 && <>
            <line x1={sx(n0)} y1={H - pad.b} x2={sx(n0)} y2={pad.t} stroke="var(--color-border-success)" strokeWidth={1.2} strokeDasharray="3,3" />
            <text x={sx(n0)} y={H - pad.b + 24} textAnchor="middle" fill="var(--color-text-success)" fontSize={9} fontFamily="var(--font-mono)">n₀={n0}</text>
          </>}
          {/* Curves */}
          <g clipPath="url(#bov-clip)">
            <path d={mkPath(cg)} fill="none" stroke="var(--color-border-info)" strokeWidth={2} strokeDasharray="6,4" />
            <path d={mkPath(f)} fill="none" stroke="var(--color-text-danger)" strokeWidth={2.5} />
          </g>
          {/* Legend */}
          <line x1={W - pad.r - 78} y1={15} x2={W - pad.r - 62} y2={15} stroke="var(--color-text-danger)" strokeWidth={2.5} />
          <text x={W - pad.r - 59} y={19} fill="var(--color-text-danger)" fontSize={10} fontFamily="var(--font-mono)">f(n)</text>
          <line x1={W - pad.r - 78} y1={29} x2={W - pad.r - 62} y2={29} stroke="var(--color-border-info)" strokeWidth={2} strokeDasharray="5,3" />
          <text x={W - pad.r - 59} y={33} fill="var(--color-text-info)" fontSize={10} fontFamily="var(--font-mono)">c·n²</text>
        </svg>
        <div style={{
          textAlign: 'center', fontSize: 11.5, fontFamily: 'var(--font-mono)', marginTop: 5, padding: '4px 10px',
          color: hasN0 ? 'var(--color-text-success)' : 'var(--color-text-danger)',
          background: hasN0 ? 'var(--color-background-success)' : 'var(--color-background-danger)',
          border: `1px solid ${hasN0 ? 'var(--color-border-success)' : 'var(--color-border-danger)'}`,
          borderRadius: 4,
        }}>
          {verdict}
        </div>
      </VizBox>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   GROWTH RATE COMPARISON CHART
═══════════════════════════════════════════════════════ */
function GrowthRateViz() {
  const [hovered, setHovered] = useState(null);
  const [useLog, setUseLog] = useState(true);

  const W = 460, H = 195;
  const pad = { t: 15, r: 10, b: 30, l: 42 };
  const maxN = 20;
  const chartH = H - pad.t - pad.b;
  const chartW = W - pad.l - pad.r;

  const curves = [
    { name: 'O(1)', fn: () => 1, color: '#818cf8' },
    { name: 'O(log n)', fn: n => Math.log2(n), color: '#22d3ee' },
    { name: 'O(n)', fn: n => n, color: '#4ade80' },
    { name: 'O(n log n)', fn: n => n * Math.log2(n), color: '#fbbf24' },
    { name: 'O(n²)', fn: n => n * n, color: '#f87171' },
    { name: 'O(2ⁿ)', fn: n => Math.pow(2, n), color: '#ef4444' },
  ];

  const refMax = useLog ? Math.pow(2, maxN) : curves[4].fn(maxN);
  const scaleY = v => useLog ? Math.log1p(v) / Math.log1p(refMax) : v / refMax;

  const sx = n => pad.l + (n - 1) / (maxN - 1) * chartW;
  const sy = v => H - pad.b - Math.min(scaleY(v), 1.0) * chartH;

  const mkPath = c => {
    const pts = [];
    for (let i = 0; i < maxN; i++) {
      const n = i + 1, v = c.fn(n), y = sy(v);
      if (y < pad.t - 8) { pts.push(`L ${sx(n).toFixed(1)} ${(pad.t - 4).toFixed(1)}`); break; }
      pts.push(`${i === 0 ? 'M' : 'L'} ${sx(n).toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', width: '100%' }}>
      <VizBox>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>
            Growth Rate Comparison — hover a curve
          </div>
          <button onClick={() => setUseLog(l => !l)} style={{
            padding: '3px 10px', fontSize: 11, fontFamily: 'var(--font-mono)', cursor: 'pointer',
            background: useLog ? 'var(--color-background-info)' : 'var(--color-background-secondary)',
            color: useLog ? 'var(--color-text-info)' : 'var(--color-text-secondary)',
            border: `1px solid ${useLog ? 'var(--color-border-info)' : 'var(--color-border-tertiary)'}`,
            borderRadius: 4, transition: 'all 0.15s',
          }}>
            {useLog ? 'Log scale' : 'Linear'}
          </button>
        </div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
          <defs>
            <clipPath id="grc-clip"><rect x={pad.l} y={pad.t} width={chartW} height={chartH} /></clipPath>
          </defs>
          {/* Grid */}
          {[0.25, 0.5, 0.75].map(t => {
            const y = H - pad.b - t * chartH;
            return <line key={t} x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="var(--color-border-tertiary)" strokeWidth={0.5} strokeDasharray="3,3" />;
          })}
          {/* Axes */}
          <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="var(--color-border-secondary)" strokeWidth={1} />
          <line x1={pad.l} y1={H - pad.b} x2={pad.l} y2={pad.t - 5} stroke="var(--color-border-secondary)" strokeWidth={1} />
          {[5, 10, 15, 20].map(n => (
            <g key={n}>
              <line x1={sx(n)} y1={H - pad.b} x2={sx(n)} y2={H - pad.b + 3} stroke="var(--color-border-secondary)" strokeWidth={1} />
              <text x={sx(n)} y={H - pad.b + 12} textAnchor="middle" fill="var(--color-text-tertiary)" fontSize={9} fontFamily="var(--font-mono)">{n}</text>
            </g>
          ))}
          <text x={W - pad.r + 2} y={H - pad.b + 4} fill="var(--color-text-tertiary)" fontSize={10} fontFamily="var(--font-mono)">n</text>
          {/* Curves */}
          <g clipPath="url(#grc-clip)">
            {curves.map(c => (
              <path key={c.name} d={mkPath(c)} fill="none"
                stroke={c.color}
                strokeWidth={hovered === c.name ? 3 : 1.5}
                opacity={hovered && hovered !== c.name ? 0.18 : 1}
                onMouseEnter={() => setHovered(c.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer', transition: 'stroke-width 0.12s, opacity 0.12s' }}
              />
            ))}
          </g>
        </svg>
        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 8, justifyContent: 'center' }}>
          {curves.map(c => (
            <div key={c.name} style={{
              display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
              opacity: hovered && hovered !== c.name ? 0.3 : 1, transition: 'opacity 0.12s'
            }}
              onMouseEnter={() => setHovered(c.name)} onMouseLeave={() => setHovered(null)}>
              <div style={{ width: 18, height: 2.5, background: c.color, borderRadius: 2 }} />
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: c.color }}>{c.name}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
          {useLog ? '* Log scale — separates all curves clearly' : '* Linear — O(2ⁿ) goes far off the chart boundary'}
        </div>
      </VizBox>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RECURSION TREE — MERGE SORT T(n) = 2T(n/2) + n
═══════════════════════════════════════════════════════ */
function RecTreeMergeSort() {
  const W = 510, H = 205;
  const R = 23;
  const colors = ['#185FA5', '#0F6E56', '#854F0B'];

  const nodes = [
    { id: 'r', x: 255, y: 32, label: 'n', lv: 0 },
    { id: 'l1', x: 140, y: 103, label: 'n/2', lv: 1 },
    { id: 'r1', x: 370, y: 103, label: 'n/2', lv: 1 },
    { id: 'll', x: 75, y: 175, label: 'n/4', lv: 2 },
    { id: 'lm', x: 200, y: 175, label: 'n/4', lv: 2 },
    { id: 'rm', x: 305, y: 175, label: 'n/4', lv: 2 },
    { id: 'rr', x: 430, y: 175, label: 'n/4', lv: 2 },
  ];
  const edges = [['r', 'l1'], ['r', 'r1'], ['l1', 'll'], ['l1', 'lm'], ['r1', 'rm'], ['r1', 'rr']];

  const arc = (fId, tId) => {
    const f = nodes.find(n => n.id === fId), t = nodes.find(n => n.id === tId);
    const dx = t.x - f.x, dy = t.y - f.y, len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    return { x1: f.x + ux * (R + 2), y1: f.y + uy * (R + 2), x2: t.x - ux * (R + 6), y2: t.y - uy * (R + 6) };
  };

  return (
    <VizBox>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <TreeArrow id="mst-arr" />
        {edges.map(([f, t]) => {
          const p = arc(f, t);
          return <line key={`${f}-${t}`} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
            stroke="var(--color-border-secondary)" strokeWidth={1.5} markerEnd="url(#mst-arr)" />;
        })}
        {nodes.map(n => {
          const col = colors[n.lv];
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={R} fill={`${col}18`} stroke={col} strokeWidth={1.8} />
              <text x={n.x} y={n.y + 4} textAnchor="middle"
                style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fill: col, fontWeight: 600 }}>
                {n.label}
              </text>
            </g>
          );
        })}
        {/* Level cost annotations */}
        {[{ y: 36, cost: '= n' }, { y: 107, cost: '= n' }, { y: 179, cost: '= n' }].map(({ y, cost }) => (
          <text key={y} x={470} y={y} style={{ fontSize: 11, fill: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>{cost}</text>
        ))}
        <line x1={463} y1={14} x2={463} y2={H - 10} stroke="var(--color-border-tertiary)" strokeWidth={1} />
        <text x={467} y={H - 1} style={{ fontSize: 9, fill: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>log₂n levels</text>
        {/* Total */}
        <rect x={4} y={H - 20} width={218} height={16} rx={3}
          fill="var(--color-background-success)" stroke="var(--color-border-success)" strokeWidth={0.8} />
        <text x={11} y={H - 8} style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', fill: 'var(--color-text-success)', fontWeight: 500 }}>
          Total: n × log₂n = Θ(n log n)
        </text>
      </svg>
    </VizBox>
  );
}

/* ═══════════════════════════════════════════════════════
   RECURSION TREE — UNBALANCED T(n) = T(n/3) + T(2n/3) + n
═══════════════════════════════════════════════════════ */
function RecTreeUnbalanced() {
  const W = 480, H = 190;
  const R = 26;
  const colors = ['#185FA5', '#0F6E56'];

  const nodes = [
    { id: 'r', x: 240, y: 32, label: 'n', lv: 0 },
    { id: 'l1', x: 120, y: 108, label: 'n/3', lv: 1 },
    { id: 'r1', x: 320, y: 108, label: '2n/3', lv: 1 },
    { id: 'sh', x: 65, y: H - 25, label: '…1', lv: 0 },
    { id: 'lo', x: 380, y: H - 25, label: '…1', lv: 1 },
  ];
  const edges = [['r', 'l1'], ['r', 'r1'], ['l1', 'sh'], ['r1', 'lo']];

  const arc = (fId, tId) => {
    const f = nodes.find(n => n.id === fId), t = nodes.find(n => n.id === tId);
    const dx = t.x - f.x, dy = t.y - f.y, len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    return { x1: f.x + ux * (R + 2), y1: f.y + uy * (R + 2), x2: t.x - ux * (R + 4), y2: t.y - uy * (R + 4) };
  };

  return (
    <VizBox>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <TreeArrow id="unb-arr" />
        {edges.map(([f, t]) => {
          const p = arc(f, t);
          return <line key={`${f}-${t}`} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
            stroke="var(--color-border-secondary)" strokeWidth={1.5} markerEnd="url(#unb-arr)" />;
        })}
        {nodes.map(n => {
          const col = colors[n.lv % 2];
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={R} fill={`${col}18`} stroke={col} strokeWidth={1.8} />
              <text x={n.x} y={n.y + 4} textAnchor="middle"
                style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', fill: col, fontWeight: 600 }}>
                {n.label}
              </text>
            </g>
          );
        })}
        {/* Depth labels */}
        <text x={65} y={H - 5} textAnchor="middle" style={{ fontSize: 10, fill: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>depth log₃n</text>
        <text x={380} y={H - 5} textAnchor="middle" style={{ fontSize: 10, fill: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>depth log₃₋₂n</text>
        {/* Level sum annotation */}
        <rect x={155} y={H - 20} width={175} height={16} rx={3}
          fill="var(--color-background-info)" stroke="var(--color-border-info)" strokeWidth={0.8} />
        <text x={162} y={H - 8} style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', fill: 'var(--color-text-info)', fontWeight: 500 }}>
          Each level sums to n → Θ(n log n)
        </text>
      </svg>
    </VizBox>
  );
}

/* ═══════════════════════════════════════════════════════
   MASTER THEOREM INTERACTIVE CALCULATOR
═══════════════════════════════════════════════════════ */
function MasterTheoremCalc() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(2);
  const [d, setD] = useState(1);

  const cStar = Math.log(a) / Math.log(b);
  const eps = 0.05;

  let caseNum;
  if (d < cStar - eps) caseNum = 1;
  else if (Math.abs(d - cStar) < eps) caseNum = 2;
  else caseNum = 3;

  const resultStr = caseNum === 1
    ? `Θ(n^${cStar.toFixed(2)})`
    : caseNum === 2
      ? d === 0 ? 'Θ(log n)' : `Θ(n^${d} · log n)`
      : d === 0 ? 'Θ(1)' : d === 1 ? 'Θ(n)' : `Θ(n^${d})`;

  const caseColor = ['', 'danger', 'success', 'info'][caseNum];
  const caseLabel = caseNum === 1
    ? 'Leaves dominate — cost driven by number of subproblems'
    : caseNum === 2
      ? 'Balanced — root and leaves cost the same order'
      : 'Root dominates — top-level work drives cost';

  return (
    <VizBox>
      <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 12, color: 'var(--color-text-primary)' }}>
        T(n) = a·T(n/b) + n<sup>d</sup> &nbsp;—&nbsp; drag sliders to explore cases
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 32px', gap: 8, alignItems: 'center', fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
        <span>a (subproblems)</span>
        <input type="range" min={1} max={8} step={1} value={a} onChange={e => setA(+e.target.value)} />
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-primary)' }}>{a}</code>
        <span>b (shrink factor)</span>
        <input type="range" min={2} max={8} step={1} value={b} onChange={e => setB(+e.target.value)} />
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-primary)' }}>{b}</code>
        <span>d (f exponent)</span>
        <input type="range" min={0} max={3} step={0.5} value={d} onChange={e => setD(+e.target.value)} />
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-primary)' }}>{d}</code>
      </div>

      {/* Zone bar */}
      <div style={{ position: 'relative', height: 32, marginBottom: 12, borderRadius: 6, overflow: 'hidden', display: 'flex' }}>
        {[
          { label: 'Case 1 (Leaves)', flex: 1, bg: 'var(--color-background-danger)', tc: 'var(--color-text-danger)' },
          { label: 'Case 2 (Balanced)', flex: 0.3, bg: 'var(--color-background-success)', tc: 'var(--color-text-success)' },
          { label: 'Case 3 (Root)', flex: 1, bg: 'var(--color-background-info)', tc: 'var(--color-text-info)' },
        ].map(z => (
          <div key={z.label} style={{ flex: z.flex, background: z.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: z.tc, fontWeight: 500 }}>{z.label}</span>
          </div>
        ))}
      </div>

      {/* Result card */}
      <div style={{
        background: `var(--color-background-${caseColor})`,
        border: `1px solid var(--color-border-${caseColor})`,
        borderRadius: 6, padding: '10px 14px',
      }}>
        <div style={{ fontSize: 11, color: `var(--color-text-${caseColor})`, marginBottom: 4, fontFamily: 'var(--font-mono)', opacity: 0.75 }}>
          c* = log_{b}(a) = log_{`${b}`}({a}) = {cStar.toFixed(3)}&nbsp;&nbsp;|&nbsp;&nbsp;d = {d}
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, color: `var(--color-text-${caseColor})` }}>
          Case {caseNum} → {resultStr}
        </div>
        <div style={{ fontSize: 11.5, color: `var(--color-text-${caseColor})`, marginTop: 5 }}>
          {caseLabel}
        </div>
      </div>

      {/* Quick examples */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
        {[
          { label: 'Binary Search', a: 1, b: 2, d: 0 },
          { label: 'Merge Sort', a: 2, b: 2, d: 1 },
          { label: 'Strassen', a: 7, b: 2, d: 2 },
          { label: 'Karatsuba', a: 3, b: 2, d: 1 },
        ].map(ex => (
          <button key={ex.label} onClick={() => { setA(ex.a); setB(ex.b); setD(ex.d); }} style={{
            padding: '3px 10px', fontSize: 11, fontFamily: 'var(--font-mono)', cursor: 'pointer',
            background: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border-tertiary)', borderRadius: 20,
          }}>
            {ex.label}
          </button>
        ))}
      </div>
    </VizBox>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB 1 — DEFINITIONS & PROPERTIES
═══════════════════════════════════════════════════════ */
function TabDefinitions() {
  return (
    <div>
      <H2>Why Asymptotic Analysis?</H2>
      <P>We don't measure algorithm speed in seconds — hardware varies. Instead, we count <strong>how the number of elementary operations scales with input size n</strong>. Asymptotic analysis discards constant factors and lower-order terms, giving a machine-independent characterization of growth rate.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: '0.75rem 0' }}>
        {[
          { title: 'We ignore constants', body: <><KaTeX>{String.raw`3n^2 + 100n + 7 \to \Theta(n^2)`}</KaTeX></> },
          { title: 'We care about large n', body: <>Behavior as <KaTeX>{String.raw`n \to \infty`}</KaTeX></> },
          { title: 'We compare growth rates', body: <><KaTeX>{String.raw`n^2 \gg n \gg \log n`}</KaTeX></> },
        ].map(({ title, body }) => (
          <div key={title} style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', padding: '12px 13px', background: 'var(--color-background-primary)' }}>
            <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-primary)', marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <H3>The Five Asymptotic Notations</H3>
      <VizBox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { not: String.raw`f(n) = O(g(n))`, badge: 'Big-O', anal: String.raw`f \leq g`, intu: 'f grows at most as fast as g (upper bound)', c: 'info' },
            { not: String.raw`f(n) = \Omega(g(n))`, badge: 'Big-Omega', anal: String.raw`f \geq g`, intu: 'f grows at least as fast as g (lower bound)', c: 'danger' },
            { not: String.raw`f(n) = \Theta(g(n))`, badge: 'Big-Theta', anal: String.raw`f = g`, intu: 'f grows at exactly the same rate as g (tight bound)', c: 'success' },
            { not: String.raw`f(n) = o(g(n))`, badge: 'Little-o', anal: String.raw`f \ll g`, intu: 'f grows strictly slower than g (strict upper)', c: 'warning' },
            { not: String.raw`f(n) = \omega(g(n))`, badge: 'Little-omega', anal: String.raw`f \gg g`, intu: 'f grows strictly faster than g (strict lower)', c: 'purple' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '100px 160px 60px 1fr',
              gap: 12, alignItems: 'center', padding: '8px 12px',
              background: 'var(--color-background-primary)', borderRadius: 6,
              border: '1px solid var(--color-border-tertiary)',
            }}>
              <Badge color={item.c}>{item.badge}</Badge>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <KaTeX>{item.not}</KaTeX>
              </div>
              <div style={{ color: 'var(--color-text-tertiary)', fontSize: 12 }}>
                <KaTeX>{item.anal}</KaTeX>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)' }}>{item.intu}</div>
            </div>
          ))}
        </div>
      </VizBox>

      <H3>Formal Definitions</H3>
      <P>The formal ε–n₀ definitions underpin all five notations. Drag the slider to see how <KaTeX>{String.raw`c`}</KaTeX> and <KaTeX>{String.raw`n_0`}</KaTeX> work in practice:</P>

      <BigOVisualizer />

      <VizBox>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            {
              color: 'info', border: 'var(--color-border-info)', text: 'var(--color-text-info)', title: 'Big-O — Upper Bound',
              body: <><P><KaTeX>{String.raw`f(n) = O(g(n))`}</KaTeX> if there exist constants <KaTeX>{String.raw`c > 0`}</KaTeX> and <KaTeX>{String.raw`n_0 > 0`}</KaTeX> such that:</P><KaTeX block>{String.raw`0 \le f(n) \le c \cdot g(n) \quad \text{for all } n \ge n_0`}</KaTeX><P style={{ fontSize: 12, marginBottom: 0 }}><em>Example:</em> <KaTeX>{String.raw`3n^2 + 5n = O(n^2)`}</KaTeX> — choose <KaTeX>{String.raw`c = 4, n_0 = 5`}</KaTeX>.</P></>
            },
            {
              color: 'danger', border: 'var(--color-border-danger)', text: 'var(--color-text-danger)', title: 'Big-Omega — Lower Bound',
              body: <><P><KaTeX>{String.raw`f(n) = \Omega(g(n))`}</KaTeX> if there exist constants <KaTeX>{String.raw`c > 0`}</KaTeX> and <KaTeX>{String.raw`n_0 > 0`}</KaTeX> such that:</P><KaTeX block>{String.raw`0 \le c \cdot g(n) \le f(n) \quad \text{for all } n \ge n_0`}</KaTeX><P style={{ fontSize: 12, marginBottom: 0 }}><em>Example:</em> <KaTeX>{String.raw`3n^2 + 5n = \Omega(n^2)`}</KaTeX> — choose <KaTeX>{String.raw`c = 3, n_0 = 1`}</KaTeX>.</P></>
            },
            {
              color: 'success', border: 'var(--color-border-success)', text: 'var(--color-text-success)', title: 'Big-Theta — Tight Bound',
              body: <><P><KaTeX>{String.raw`f(n) = \Theta(g(n))`}</KaTeX> iff <strong>both</strong> O and Ω hold. Equivalently:</P><KaTeX block>{String.raw`c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n) \quad \text{for all } n \ge n_0`}</KaTeX><P style={{ fontSize: 12, marginBottom: 0 }}><em>Example:</em> <KaTeX>{String.raw`3n^2 + 5n = \Theta(n^2)`}</KaTeX>. But <KaTeX>{String.raw`n^2 \neq \Theta(n^3)`}</KaTeX> — upper bound holds, lower doesn't.</P></>
            },
            {
              color: 'warning', border: 'var(--color-border-warning)', text: 'var(--color-text-warning)', title: 'Little-o — Strict Upper Bound',
              body: <><P><KaTeX>{String.raw`f(n) = o(g(n))`}</KaTeX> if for <strong>every</strong> <KaTeX>{String.raw`c > 0`}</KaTeX> there exists <KaTeX>{String.raw`n_0`}</KaTeX> such that <KaTeX>{String.raw`f(n) < c \cdot g(n)`}</KaTeX> for all <KaTeX>{String.raw`n \ge n_0`}</KaTeX>. Limit form:</P><KaTeX block>{String.raw`\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0`}</KaTeX><P style={{ fontSize: 12, marginBottom: 0 }}><em>Example:</em> <KaTeX>{String.raw`n = o(n^2)`}</KaTeX> since <KaTeX>{String.raw`n/n^2 = 1/n \to 0`}</KaTeX>. But <KaTeX>{String.raw`n^2 \neq o(n^2)`}</KaTeX>.</P></>
            },
            {
              color: 'purple', border: 'var(--color-border-purple)', text: 'var(--color-text-purple)', title: 'Little-omega — Strict Lower Bound',
              body: <><P><KaTeX>{String.raw`f(n) = \omega(g(n))`}</KaTeX> if for <strong>every</strong> <KaTeX>{String.raw`c > 0`}</KaTeX>: <KaTeX>{String.raw`f(n) > c \cdot g(n)`}</KaTeX> for all large <KaTeX>{String.raw`n`}</KaTeX>. Limit form:</P><KaTeX block>{String.raw`\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty`}</KaTeX><P style={{ fontSize: 12, marginBottom: 0 }}><em>Example:</em> <KaTeX>{String.raw`n^2 = \omega(n)`}</KaTeX> since <KaTeX>{String.raw`n^2/n = n \to \infty`}</KaTeX>.</P></>
            },
          ].map(item => (
            <div key={item.title} style={{
              padding: '12px 14px',
              border: `0.5px solid ${item.border}`,
              background: 'var(--color-background-primary)',
              borderRadius: 'var(--border-radius-md)',
            }}>
              <div style={{ fontWeight: 600, fontSize: 12.5, color: item.text, marginBottom: 4 }}>{item.title}</div>
              {item.body}
            </div>
          ))}
        </div>
      </VizBox>

      <H3>Properties of Asymptotic Notations</H3>
      <Table
        heads={['Property', 'Rule', 'Example']}
        rows={[
          ['Transitivity', 'f=O(g) & g=O(h) → f=O(h)', 'Applies to all five notations'],
          ['Reflexivity', 'f=O(f), f=Ω(f), f=Θ(f)', 'Only O, Ω, Θ — not the strict variants'],
          ['Symmetry', 'f=Θ(g) ↔ g=Θ(f)', 'Only Θ'],
          ['Transpose Symmetry', 'f=O(g) ↔ g=Ω(f)', 'f=o(g) ↔ g=ω(f)'],
          ['Sum Rule', 'O(f)+O(g) = O(max(f,g))', 'O(n²)+O(n) = O(n²)'],
          ['Product Rule', 'O(f)·O(g) = O(f·g)', 'O(n)·O(log n) = O(n log n)'],
          ['Constant Factor Rule', 'O(c·f) = O(f) for c>0', 'O(100n²) = O(n²)'],
          ['Log Base Rule', 'log_a n = Θ(log_b n)', 'O(log₂ n) = O(log₁₀ n) = O(ln n)'],
        ]}
      />

      <Note title="Logarithm Base Rule" color="success">
        The base is just a constant factor: <KaTeX>{String.raw`\log_a(n) = \frac{\log_b(n)}{\log_b(a)}`}</KaTeX>. Since constants disappear in Big-O, all logarithms are equivalent. Always write <KaTeX>{String.raw`O(\log n)`}</KaTeX> without a base.
      </Note>

      <H3>Practical Examples — Identifying Complexity from Code</H3>
      <Code>{{
        cpp: `// O(1) — constant time
int getFirst(vector<int>& arr) {
    return arr[0];
}

// O(log n) — input is halved each step
int binarySearch(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target)  l = mid + 1;
        else                    r = mid - 1;
    }
    return -1;
}

// O(n) — single pass
int linearSum(vector<int>& arr) {
    int sum = 0;
    for (int x : arr) sum += x;
    return sum;
}

// O(n²) — nested loops
bool hasDuplicate(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (arr[i] == arr[j]) return true;
    return false;
}

// O(2^n) — subset enumeration
for (int mask = 0; mask < (1 << n); mask++) {
    // 2^n iterations
}`,
        python: `# O(1) — constant time
def get_first(arr):
    return arr[0]

# O(log n) — input is halved each step
from bisect import bisect_left
def binary_search(arr, target):
    i = bisect_left(arr, target)
    return i if i < len(arr) and arr[i] == target else -1

# O(n) — single pass
def linear_sum(arr):
    return sum(arr)

# O(n²) — nested loops
def has_duplicate(arr):
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] == arr[j]:
                return True
    return False

# O(2^n) — subset enumeration
for mask in range(1 << n):
    pass    # 2^n iterations`
      }}</Code>

      <H3>Interview Q&A</H3>
      <QA q="What is the precise difference between O and Θ? Why does it matter?">
        <P>O(g) is an <strong>upper bound</strong> — it says f grows no faster than g, but may be much slower. Θ(g) is a <strong>tight bound</strong> — f grows at exactly the same rate. Saying "merge sort is O(n³)" is technically correct but useless. <KaTeX>{String.raw`\Theta(n \log n)`}</KaTeX> is the precise characterization. In analysis, always aim for Θ if you can prove it — O alone is too loose for meaningful comparison.</P>
      </QA>
      <QA q="Is 2^(2n) = O(2^n)?">
        <P>No. <KaTeX>{String.raw`2^{2n} = 4^n`}</KaTeX>. For <KaTeX>{String.raw`4^n = O(2^n)`}</KaTeX> we would need <KaTeX>{String.raw`4^n \le c \cdot 2^n`}</KaTeX>, i.e., <KaTeX>{String.raw`(4/2)^n = 2^n \le c`}</KaTeX> for all large n. But <KaTeX>{String.raw`2^n`}</KaTeX> is unbounded — no constant c satisfies this. In general, <KaTeX>{String.raw`2^{cn} \neq O(2^n)`}</KaTeX> for any constant c &gt; 1. The exponent's coefficient is NOT a constant factor — it fundamentally changes the growth class.</P>
      </QA>
      <QA q="Is f(n) = O(g(n)) the same as f(n) ≤ g(n)?">
        <P>No — Big-O involves a <strong>constant multiplier and a starting threshold</strong>, not a pointwise inequality. <KaTeX>{String.raw`f(n) = O(g(n))`}</KaTeX> means <KaTeX>{String.raw`f(n) \le c \cdot g(n)`}</KaTeX> for all sufficiently large n. For example, <KaTeX>{String.raw`1000n = O(n)`}</KaTeX> — even though <KaTeX>{String.raw`1000n > n`}</KaTeX> pointwise, they're in the same asymptotic class. The constant c absorbs any finite multiplicative gap.</P>
      </QA>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB 2 — ASYMPTOTIC COMPARISON
═══════════════════════════════════════════════════════ */
function TabCompare() {
  return (
    <div>
      <H2>Asymptotic Comparison</H2>

      <H3>The Complexity Hierarchy</H3>
      <P>From slowest-growing to fastest-growing (each class is strictly dominated by the next):</P>
      <VizBox>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px', justifyContent: 'center', padding: '4px 0' }}>
          {[
            { label: 'O(1)', color: '#818cf8' },
            { label: 'O(log log n)', color: '#8b5cf6' },
            { label: 'O(log n)', color: '#06b6d4' },
            { label: 'O(log^k n)', color: '#0ea5e9' },
            { label: 'O(n^ε)', color: '#22c55e' },
            { label: 'O(√n)', color: '#84cc16' },
            { label: 'O(n)', color: '#eab308' },
            { label: 'O(n log n)', color: '#f97316' },
            { label: 'O(n log² n)', color: '#fb923c' },
            { label: 'O(n^(3/2))', color: '#f87171' },
            { label: 'O(n²)', color: '#ef4444' },
            { label: 'O(n² log n)', color: '#dc2626' },
            { label: 'O(n³)', color: '#c02020' },
            { label: 'O(n^k)', color: '#b91c1c' },
            { label: 'O(2^n)', color: '#991b1b' },
            { label: 'O(3^n)', color: '#7f1d1d' },
            { label: 'O(n!)', color: '#6b1a1a' },
            { label: 'O(n^n)', color: '#450a0a' },
          ].map((c, i, arr) => (
            <span key={c.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{
                background: `${c.color}20`, border: `1px solid ${c.color}60`,
                color: c.color, padding: '3px 10px', borderRadius: 20,
                fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 500,
              }}>{c.label}</span>
              {i < arr.length - 1 && <span style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>≺</span>}
            </span>
          ))}
        </div>
      </VizBox>

      <GrowthRateViz />

      <H3>Key Dominance Rules</H3>
      <Table
        heads={['Fact', 'Rule', 'Example']}
        rows={[
          ['Polynomial beats log', String.raw`n^ε = ω(log^k n)`, 'n^0.001 grows faster than (log n)^1000'],
          ['Exponential beats poly', String.raw`b^n = ω(n^k)`, '1.001^n grows faster than n^1000'],
          ['Factorial beats exponential', 'n! = ω(c^n)', 'n! grows faster than 3^n'],
          ['Log base is irrelevant', 'log_a n = Θ(log_b n)', 'All log bases are equivalent in Big-O'],
          ['Log power vs root', '(log n)^k = o(n^ε)', 'Any polynomial root beats any log power'],
        ]}
      />

      <H3>Comparing Functions — The Limit Method</H3>
      <P>To compare <KaTeX>{String.raw`f(n)`}</KaTeX> and <KaTeX>{String.raw`g(n)`}</KaTeX>, compute:</P>
      <KaTeX block>{String.raw`L = \lim_{n \to \infty} \frac{f(n)}{g(n)}`}</KaTeX>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: '0.75rem 0' }}>
        {[
          { title: 'L = 0', math: String.raw`f(n) = o(g(n))`, label: 'f loses.', sub: 'f grows strictly slower than g.', color: 'danger' },
          { title: '0 < L < ∞', math: String.raw`f(n) = \Theta(g(n))`, label: 'Tied.', sub: 'Same asymptotic growth rate.', color: 'success' },
          { title: 'L = ∞', math: String.raw`f(n) = \omega(g(n))`, label: 'f wins.', sub: 'f grows strictly faster than g.', color: 'info' },
        ].map(({ title, math, label, sub, color }) => (
          <div key={title} style={{ background: 'var(--color-background-primary)', border: `0.5px solid var(--color-border-${color})`, borderRadius: 'var(--border-radius-md)', padding: '12px 13px' }}>
            <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-primary)', marginBottom: 6 }}>{title}</div>
            <div style={{ marginBottom: 6 }}><KaTeX>{math}</KaTeX></div>
            <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}><strong>{label}</strong> {sub}</div>
          </div>
        ))}
      </div>

      <H3>Worked Comparisons</H3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ border: '0.5px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', background: 'var(--color-background-primary)' }}>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-info)', marginBottom: 4 }}>Example 1: n² vs n log n</div>
          <KaTeX block>{String.raw`\lim_{n \to \infty} \frac{n^2}{n \log n} = \lim_{n \to \infty} \frac{n}{\log n} = \infty`}</KaTeX>
          <P style={{ marginBottom: 0 }}>→ <KaTeX>{String.raw`n^2 = \omega(n \log n)`}</KaTeX>. Quadratic algorithms are strictly worse than linearithmic.</P>
        </div>

        <div style={{ border: '0.5px solid var(--color-border-success)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', background: 'var(--color-background-primary)' }}>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-success)', marginBottom: 4 }}>Example 2: log(n!) vs n log n  [Stirling]</div>
          <P>Using Stirling: <KaTeX>{String.raw`n! \approx (n/e)^n \cdot \sqrt{2\pi n}`}</KaTeX></P>
          <KaTeX block>{String.raw`\log(n!) = n\log n - n\log e + \tfrac{1}{2}\log(2\pi n) = \Theta(n \log n)`}</KaTeX>
          <P style={{ marginBottom: 0 }}>→ <KaTeX>{String.raw`\log(n!) = \Theta(n \log n)`}</KaTeX>. This is the basis for the comparison-sort lower bound.</P>
        </div>

        <div style={{ border: '0.5px solid var(--color-border-warning)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', background: 'var(--color-background-primary)' }}>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-warning)', marginBottom: 4 }}>Example 3: 2^(log n) vs n</div>
          <KaTeX block>{String.raw`2^{\log_2 n} = n \quad \text{(by definition of log)}`}</KaTeX>
          <P style={{ marginBottom: 0 }}>→ <KaTeX>{String.raw`2^{\log n} = \Theta(n)`}</KaTeX>. This surprises many people — they're exactly equal.</P>
        </div>

        <div style={{ border: '0.5px solid var(--color-border-purple)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', background: 'var(--color-background-primary)' }}>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-purple)', marginBottom: 4 }}>Example 4: n^(log log n) vs 2^(√n)</div>
          <P>Take logarithms of both sides (log is monotone, preserves comparison):</P>
          <KaTeX block>{String.raw`\log\!\left(n^{\log \log n}\right) = (\log \log n)^2 \qquad \log\!\left(2^{\sqrt{n}}\right) = \sqrt{n}`}</KaTeX>
          <KaTeX block>{String.raw`\lim_{n \to \infty} \frac{(\log \log n)^2}{\sqrt{n}} = 0`}</KaTeX>
          <P style={{ marginBottom: 0 }}>→ <KaTeX>{String.raw`n^{\log \log n} = o\!\left(2^{\sqrt{n}}\right)`}</KaTeX>.</P>
          <Note title="Strategy: take logs" color="info" icon="ti-bulb">
            When comparing functions with exponents or nested exponents, take log of both sides. Log is monotone, so <KaTeX>{String.raw`f < g \iff \log f < \log g`}</KaTeX>. This converts exponential comparisons to simpler polynomial or log comparisons.
          </Note>
        </div>
      </div>

      <H3>L'Hôpital's Rule for Asymptotic Limits</H3>
      <P>When <KaTeX>{String.raw`\lim f/g`}</KaTeX> yields <KaTeX>{String.raw`0/0`}</KaTeX> or <KaTeX>{String.raw`\infty/\infty`}</KaTeX>, apply:</P>
      <KaTeX block>{String.raw`\lim \frac{f(n)}{g(n)} = \lim \frac{f'(n)}{g'(n)}`}</KaTeX>

      <H3>Empirical Growth Table</H3>
      <Code>{{
        cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> ns = {10, 100, 1000, 10000};
    cout << setw(8) << "n" << setw(10) << "log2(n)"
         << setw(10) << "sqrt(n)" << setw(10) << "n"
         << setw(14) << "n*log2(n)" << setw(12) << "n^2\\n";

    for (int n : ns) {
        cout << setw(8)  << n
             << setw(10) << fixed << setprecision(1) << log2(n)
             << setw(10) << sqrt(n)
             << setw(10) << n
             << setw(14) << n * log2(n)
             << setw(12) << (long long)n * n << "\\n";
    }
}`,
        python: `import math

ns = [10, 100, 1000, 10000]
print(f"{'n':>8}{'log2(n)':>10}{'sqrt(n)':>10}{'n':>10}{'n*log2(n)':>14}{'n^2':>12}")

for n in ns:
    print(f"{n:>8}{math.log2(n):>10.1f}{math.sqrt(n):>10.1f}"
          f"{n:>10}{n * math.log2(n):>14.1f}{n * n:>12}")`
      }}</Code>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   FIBONACCI IMPLEMENTATIONS — tabbed pill switcher
═══════════════════════════════════════════════════════ */
const FIB_IMPL = [
  {
    name: 'Naive Recursion', color: 'danger', time: 'O(2ⁿ)', space: 'O(n)',
    desc: 'Exponential — every call branches into two sub-calls, causing massive redundant computation.',
    code: {
      cpp: `long long fib_naive(int n) {\n    if (n <= 1) return n;\n    return fib_naive(n-1) + fib_naive(n-2);\n}`,
      python: `def fib_naive(n):\n    if n <= 1: return n\n    return fib_naive(n - 1) + fib_naive(n - 2)`
    }
  },
  {
    name: 'Memoization', color: 'success', time: 'O(n)', space: 'O(n)',
    desc: 'Cache results to avoid recomputation. Each fib(k) is computed exactly once.',
    code: {
      cpp: `unordered_map<int, long long> memo;\nlong long fib_memo(int n) {\n    if (n <= 1) return n;\n    if (memo.count(n)) return memo[n];\n    return memo[n] = fib_memo(n-1) + fib_memo(n-2);\n}`,
      python: `from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib_memo(n):\n    if n <= 1: return n\n    return fib_memo(n - 1) + fib_memo(n - 2)`
    }
  },
  {
    name: 'Iterative (DP)', color: 'success', time: 'O(n)', space: 'O(1)',
    desc: 'Bottom-up — track only the previous two values. Optimal space.',
    code: {
      cpp: `long long fib_iter(int n) {\n    if (n <= 1) return n;\n    long long a = 0, b = 1;\n    for (int i = 2; i <= n; i++) {\n        long long c = a + b;\n        a = b; b = c;\n    }\n    return b;\n}`,
      python: `def fib_iter(n):\n    if n <= 1: return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b`
    }
  },
  {
    name: 'Matrix Expo', color: 'info', time: 'O(log n)', space: 'O(log n)',
    desc: 'Fastest for large n — uses matrix exponentiation by squaring.',
    extra: String.raw`\begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n`,
    code: {
      cpp: `typedef vector<vector<long long>> Mat;\nMat mat_mul(const Mat& A, const Mat& B) {\n    Mat C(2, vector<long long>(2, 0));\n    for (int i = 0; i < 2; i++)\n        for (int j = 0; j < 2; j++)\n            for (int k = 0; k < 2; k++)\n                C[i][j] += A[i][k] * B[k][j];\n    return C;\n}\nMat mat_pow(Mat A, int n) {\n    Mat R = {{1,0},{0,1}};\n    for (; n; n >>= 1) {\n        if (n & 1) R = mat_mul(R, A);\n        A = mat_mul(A, A);\n    }\n    return R;\n}\nlong long fib_matrix(int n) {\n    if (n == 0) return 0;\n    return mat_pow({{1,1},{1,0}}, n)[0][1];\n}`,
      python: `def mat_mul(A, B):\n    return [[sum(A[i][k] * B[k][j] for k in range(2))\n             for j in range(2)] for i in range(2)]\n\ndef mat_pow(A, n):\n    R = [[1, 0], [0, 1]]\n    while n:\n        if n & 1: R = mat_mul(R, A)\n        A = mat_mul(A, A)\n        n >>= 1\n    return R\n\ndef fib_matrix(n):\n    if n == 0: return 0\n    return mat_pow([[1, 1], [1, 0]], n)[0][1]`
    }
  },
];

function FibImplementations() {
  const [activeFib, setActiveFib] = useState('Naive Recursion');
  const impl = FIB_IMPL.find(f => f.name === activeFib);

  return (
    <div style={{ margin: '0.75rem 0' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {FIB_IMPL.map(f => (
          <button key={f.name} onClick={() => setActiveFib(f.name)} style={{
            padding: '6px 12px', fontSize: 13, fontWeight: activeFib === f.name ? 600 : 400,
            background: activeFib === f.name ? `var(--color-background-${f.color})` : 'transparent',
            color: activeFib === f.name ? `var(--color-text-${f.color})` : 'var(--color-text-secondary)',
            border: `1px solid var(--color-border-${activeFib === f.name ? f.color : 'tertiary'})`,
            borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s',
          }}>{f.name}</button>
        ))}
      </div>
      {impl && (
        <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, background: `var(--color-background-${impl.color})`, color: `var(--color-text-${impl.color})`, padding: '2px 8px', borderRadius: 20, border: `0.5px solid var(--color-border-${impl.color})` }}>Time: {impl.time}</span>
            <span style={{ fontSize: 11, background: 'var(--color-background-info)', color: 'var(--color-text-info)', padding: '2px 8px', borderRadius: 20, border: '0.5px solid var(--color-border-info)' }}>Space: {impl.space}</span>
          </div>
          <P style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 10 }}>{impl.desc}</P>
          {impl.extra && <P style={{ fontSize: 12 }}><KaTeX>{impl.extra}</KaTeX></P>}
          <Code>{impl.code}</Code>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB 3 — SERIES, EXPONENTIATION & FIBONACCI
═══════════════════════════════════════════════════════ */
function TabSeries() {
  return (
    <div>
      <H2>Series, Exponentiation & Fibonacci</H2>

      <H3>Arithmetic Series</H3>
      <KaTeX block>{String.raw`1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2} = \Theta(n^2)`}</KaTeX>
      <P>This appears whenever a nested loop runs from i to n in the inner step — the "triangular sum" pattern.</P>

      <H3>Geometric Series</H3>
      <P>For ratio <KaTeX>{String.raw`r \neq 1`}</KaTeX>:</P>
      <KaTeX block>{String.raw`1 + r + r^2 + \cdots + r^n = \frac{r^{n+1} - 1}{r - 1}`}</KaTeX>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: '0.75rem 0' }}>
        {[
          { title: 'r < 1 (converges)', color: 'success', body: <>Sum <KaTeX>{String.raw`\to \Theta(1)`}</KaTeX> as <KaTeX>{String.raw`n \to \infty`}</KaTeX>. E.g. <KaTeX>{String.raw`1 + \tfrac{1}{2} + \tfrac{1}{4} + \cdots = 2`}</KaTeX></> },
          { title: 'r = 1 (linear)', color: 'info', body: <>Sum = n + 1 = <KaTeX>{String.raw`\Theta(n)`}</KaTeX></> },
          { title: 'r > 1 (exponential)', color: 'danger', body: <>Dominated by last term. <KaTeX>{String.raw`1 + 2 + 4 + \cdots + 2^n = \Theta(2^n)`}</KaTeX></> },
        ].map(({ title, color, body }) => (
          <div key={title} style={{ border: '0.5px solid var(--color-border-tertiary)', borderLeft: `3px solid var(--color-border-${color})`, borderRadius: '0 6px 6px 0', padding: '10px 14px' }}>
            <div style={{ fontWeight: 500, fontSize: 12.5, color: `var(--color-text-${color})`, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <H3>Harmonic Series</H3>
      <KaTeX block>{String.raw`H(n) = 1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{n} = \Theta(\ln n) = \Theta(\log n)`}</KaTeX>
      <P>Proof via integral bounds:</P>
      <KaTeX block>{String.raw`\ln(n+1) \le H(n) \le 1 + \ln n`}</KaTeX>

      <H3>Summation of Powers</H3>
      <VizBox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
          {[
            [String.raw`\sum_{i=1}^n i = \frac{n(n+1)}{2}`, String.raw`\to \Theta(n^2)`],
            [String.raw`\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}`, String.raw`\to \Theta(n^3)`],
            [String.raw`\sum_{i=1}^n i^3 = \left[\frac{n(n+1)}{2}\right]^2`, String.raw`\to \Theta(n^4)`],
            [String.raw`\sum_{i=1}^n i^k`, String.raw`\to \Theta(n^{k+1}) \text{ (general)}`],
          ].map(([lhs, rhs], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'var(--color-background-primary)', borderRadius: 4, border: '1px solid var(--color-border-tertiary)' }}>
              <span><KaTeX>{lhs}</KaTeX></span>
              <span style={{ color: 'var(--color-text-tertiary)' }}><KaTeX>{rhs}</KaTeX></span>
            </div>
          ))}
        </div>
      </VizBox>

      <H3>Exponentiation Properties</H3>
      <Grid cols={2}>
        <div>
          <KaTeX block>{String.raw`a^{m+n} = a^m \cdot a^n`}</KaTeX>
          <KaTeX block>{String.raw`(a^m)^n = a^{m \cdot n}`}</KaTeX>
        </div>
        <div>
          <KaTeX block>{String.raw`\log_a(xy) = \log_a(x) + \log_a(y)`}</KaTeX>
          <KaTeX block>{String.raw`\log_a(x) = \frac{\log_b(x)}{\log_b(a)}`}</KaTeX>
        </div>
      </Grid>

      <Note title="Crucial Identity" color="warning" icon="ti-alert-circle">
        <KaTeX block>{String.raw`n^{\log_a b} = b^{\log_a n}`}</KaTeX>
        Non-obvious but critical for Master Theorem analysis. Proof: take <KaTeX>{String.raw`\log_a`}</KaTeX> of both sides — both equal <KaTeX>{String.raw`\log_a(n) \cdot \log_a(b)`}</KaTeX>.
      </Note>

      <H3>Fibonacci — 4 Implementations</H3>
      <P>Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …</P>

      <FibImplementations />

      <H3>Fibonacci Bounds & True Bit Complexity</H3>
      <P><strong>Binet's Formula:</strong></P>
      <KaTeX block>{String.raw`F(n) = \frac{\phi^n - \psi^n}{\sqrt{5}} \implies F(n) = \Theta(\phi^n), \quad \phi \approx 1.618`}</KaTeX>

      <Note title="Golden Ratio Identity" color="warning" icon="ti-alert-circle">
        <KaTeX block>{String.raw`\phi^2 = \phi + 1`}</KaTeX>
        The defining property of <KaTeX>{String.raw`\phi`}</KaTeX>. All inductive Fibonacci proofs use this identity.
      </Note>

      <P>Since <KaTeX>{String.raw`F(n) = \Theta(\phi^n)`}</KaTeX>, <KaTeX>{String.raw`F(n)`}</KaTeX> requires <KaTeX>{String.raw`\Theta(n)`}</KaTeX> bits to store. The <em>true</em> complexity accounting for large-integer arithmetic:</P>
      <Table
        heads={['Method', 'Naive Complexity', 'True Bit Complexity']}
        rows={[
          ['Naive recursion', 'O(2ⁿ)', 'Ω(n · 2ⁿ)'],
          ['Iterative', 'O(n)', 'O(n²)'],
          ['Matrix expo (schoolbook)', 'O(log n)', 'O(n² log n)'],
          ['Matrix expo (FFT mul)', 'O(log n)', 'O(n log² n · log log n)'],
        ]}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB 4 — SPECIAL QUESTIONS: ASYMPTOTIC BOUNDS
═══════════════════════════════════════════════════════ */
function TabSpecialBounds() {
  return (
    <div>
      <H2>Special Questions: Asymptotic Bounds</H2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Badge color="warning">IIT OA Style</Badge>
        <Badge color="info">Interview Classic</Badge>
      </div>

      <QA q="Rank these five functions by asymptotic growth (slowest to fastest):  f₁ = n^(log log n),  f₂ = 2^(√log n),  f₃ = (log n)^(log n),  f₄ = n / log n,  f₅ = 2^(log² n)">
        <P><strong>Strategy:</strong> Take log of each function to convert to a comparable form:</P>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '8px 0' }}>
          {[
            [String.raw`\log f_1 = (\log \log n)(\log n)`, ''],
            [String.raw`\log f_2 = \Theta(\sqrt{\log n})`, '← smallest'],
            [String.raw`\log f_3 = (\log n)(\log \log n)`, '= log f₁'],
            [String.raw`\log f_4 \approx \log n`, ''],
            [String.raw`\log f_5 = (\log n)^2`, ''],
          ].map(([expr, note], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px', background: 'var(--color-background-secondary)', borderRadius: 4, fontSize: 13 }}>
              <KaTeX>{expr}</KaTeX>
              <span style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>{note}</span>
            </div>
          ))}
        </div>
        <P>Compare logs: <KaTeX>{String.raw`\sqrt{\log n} \ll \log n \ll (\log n)^2 \ll (\log n)(\log \log n)`}</KaTeX></P>
        <P>Since <KaTeX>{String.raw`\log f_1 = \log f_3`}</KaTeX>, we get <KaTeX>{String.raw`f_1 = \Theta(f_3)`}</KaTeX>.</P>
        <Note color="success">
          <strong>Final order:</strong> <KaTeX>{String.raw`f_2 \prec f_4 \prec f_5 \prec f_1 = f_3`}</KaTeX>
        </Note>
      </QA>

      <QA q="Prove or disprove: if f(n) = O(g(n)) then 2^f(n) = O(2^g(n)).">
        <P><strong>Disproof by counterexample:</strong></P>
        <P>Let <KaTeX>{String.raw`f(n) = n`}</KaTeX> and <KaTeX>{String.raw`g(n) = n/2`}</KaTeX>. Here <KaTeX>{String.raw`f(n) = O(g(n))`}</KaTeX> (constant c ≥ 2).</P>
        <KaTeX block>{String.raw`\lim_{n \to \infty} \frac{2^n}{2^{n/2}} = \lim_{n \to \infty} 2^{n/2} = \infty`}</KaTeX>
        <P>So <KaTeX>{String.raw`2^n \neq O(2^{n/2})`}</KaTeX>. The statement is <strong>false</strong>. Exponentiation does NOT preserve O-relationships.</P>
      </QA>

      <QA q="Find Θ for: T(n) = Σ(i=1..n) i · 2^i">
        <P>Differentiate the geometric series <KaTeX>{String.raw`S = \sum_{i=0}^n x^i`}</KaTeX> with respect to x, then evaluate at x = 2:</P>
        <KaTeX block>{String.raw`\sum_{i=1}^n i \cdot x^i = x \cdot \frac{d}{dx}\!\left[\frac{x^{n+1}-x}{x-1}\right]`}</KaTeX>
        <P>At x = 2 this yields <KaTeX>{String.raw`(n-1) \cdot 2^{n+1} + 2`}</KaTeX>.</P>
        <Note color="success"><strong>Answer:</strong> <KaTeX>{String.raw`T(n) = \Theta(n \cdot 2^n)`}</KaTeX></Note>
      </QA>

      <QA q="What is the exact complexity of: outer i=1..n, inner j=1..n stepping j += i?">
        <Code>{{
          cpp: `for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j += i)
        // O(1) work`,
          python: `for i in range(1, n + 1):
    j = 1
    while j <= n:
        # O(1) work
        j += i`
        }}</Code>
        <P>For outer value <KaTeX>{String.raw`i`}</KaTeX>, inner loop runs <KaTeX>{String.raw`\lfloor n/i \rfloor`}</KaTeX> times:</P>
        <KaTeX block>{String.raw`\text{Total} = \sum_{i=1}^n \left\lfloor \frac{n}{i} \right\rfloor \approx n \sum_{i=1}^n \frac{1}{i} = n \cdot H(n) = \Theta(n \log n)`}</KaTeX>
        <Note color="info"><strong>Answer: Θ(n log n)</strong> — this exact pattern appears in the Sieve of Eratosthenes.</Note>
      </QA>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB 5 — SUBSTITUTION METHOD
═══════════════════════════════════════════════════════ */
function TabSubst() {
  return (
    <div>
      <H2>Solving Recurrences: Substitution Method</H2>
      <P>A two-phase technique: <strong>guess</strong> the closed form, then <strong>verify</strong> by induction. The method doesn't derive the answer — it confirms a candidate you already suspect.</P>

      {/* Step pipeline */}
      <VizBox>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: 'ti-bulb', step: '1', text: 'Guess T(n) ≤ c·f(n)' },
            { icon: 'ti-arrow-right', step: '→', text: '' },
            { icon: 'ti-replace', step: '2', text: 'Substitute T(k) for k < n' },
            { icon: 'ti-arrow-right', step: '→', text: '' },
            { icon: 'ti-math', step: '3', text: 'Simplify & solve for c' },
            { icon: 'ti-arrow-right', step: '→', text: '' },
            { icon: 'ti-check', step: '4', text: 'Verify base case' },
          ].map((s, i) => s.icon === 'ti-arrow-right'
            ? <i key={i} className="ti ti-arrow-right" style={{ fontSize: 16, color: 'var(--color-text-tertiary)' }} />
            : (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 100 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-background-info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`ti ${s.icon}`} style={{ fontSize: 18, color: 'var(--color-text-info)' }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, textAlign: 'center', color: 'var(--color-text-primary)' }}>{s.text}</div>
              </div>
            )
          )}
        </div>
      </VizBox>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '0.75rem 0' }}>
        <div style={{ border: '0.5px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', background: 'var(--color-background-primary)' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-text-info)', marginBottom: 8 }}>Example 1: Merge Sort — T(n) = 2T(n/2) + n</div>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-primary)', marginBottom: 4 }}>Proof: T(n) = O(n log n)</div>
          <P><strong>Guess:</strong> <KaTeX>{String.raw`T(n) \le cn\log n`}</KaTeX> for some <KaTeX>{String.raw`c > 0`}</KaTeX>.</P>
          <P><strong>Inductive step:</strong> Assume <KaTeX>{String.raw`T(k) \le ck\log k`}</KaTeX> for all <KaTeX>{String.raw`k < n`}</KaTeX>.</P>
          <KaTeX block>{String.raw`T(n) \le 2\!\left(c\tfrac{n}{2}\log\tfrac{n}{2}\right) + n = cn(\log n - \log 2) + n = cn\log n - (c-1)n`}</KaTeX>
          <P>This is <KaTeX>{String.raw`\le cn\log n`}</KaTeX> provided <KaTeX>{String.raw`c \ge 1`}</KaTeX>. ✓</P>
        </div>

        <div style={{ border: '0.5px solid var(--color-border-success)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', background: 'var(--color-background-primary)' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-text-success)', marginBottom: 8 }}>Example 2: Selection Sort — T(n) = T(n−1) + n</div>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-primary)', marginBottom: 4 }}>Proof: T(n) = O(n²)</div>
          <P><strong>Guess:</strong> <KaTeX>{String.raw`T(n) \le cn^2`}</KaTeX>.</P>
          <KaTeX block>{String.raw`T(n) \le c(n-1)^2 + n = cn^2 - n(2c-1) + c`}</KaTeX>
          <P>This is <KaTeX>{String.raw`\le cn^2`}</KaTeX> when <KaTeX>{String.raw`2c - 1 > 0 \implies c > \tfrac{1}{2}`}</KaTeX>. ✓</P>
        </div>

        <div style={{ border: '0.5px solid var(--color-border-warning)', borderRadius: 'var(--border-radius-md)', padding: '12px 14px', background: 'var(--color-background-primary)' }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-text-warning)', marginBottom: 8 }}>Example 3: Change of Variables — T(n) = 2T(√n) + log n</div>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--color-text-primary)', marginBottom: 4 }}>Substitution Trick</div>
          <P>Let <KaTeX>{String.raw`m = \log n`}</KaTeX>, so <KaTeX>{String.raw`n = 2^m`}</KaTeX> and <KaTeX>{String.raw`\sqrt{n} = 2^{m/2}`}</KaTeX>.</P>
          <KaTeX block>{String.raw`T(2^m) = 2T(2^{m/2}) + m`}</KaTeX>
          <P>Define <KaTeX>{String.raw`S(m) = T(2^m)`}</KaTeX>. The recurrence becomes:</P>
          <KaTeX block>{String.raw`S(m) = 2S(m/2) + m`}</KaTeX>
          <P>This is the Merge Sort recurrence! So <KaTeX>{String.raw`S(m) = \Theta(m\log m)`}</KaTeX>.</P>
          <P>Substituting back: <KaTeX>{String.raw`T(n) = S(\log n) = \Theta(\log n \cdot \log \log n)`}</KaTeX>.</P>
        </div>
      </div>

      <Note title="Strengthening the Hypothesis" color="danger" icon="ti-alert-triangle">
        For <KaTeX>{String.raw`T(n) = 2T(n/2) + 1`}</KaTeX>, guessing <KaTeX>{String.raw`T(n) \le cn`}</KaTeX> fails — it leaves a residual +1. Fix: guess <KaTeX>{String.raw`T(n) \le cn - d`}</KaTeX>. Then <KaTeX>{String.raw`2(c(n/2) - d) + 1 = cn - 2d + 1 \le cn - d`}</KaTeX> holds for <KaTeX>{String.raw`d \ge 1`}</KaTeX>.
      </Note>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB 6 — RECURSION TREE METHOD
═══════════════════════════════════════════════════════ */
function TabTree() {
  return (
    <div>
      <H2>Recursion Tree Method</H2>
      <P>Build the tree explicitly: each node is the <strong>non-recursive work</strong> at that call. Sum across all levels. The tree reveals the recurrence's structure geometrically.</P>

      <Grid cols={2}>
        <div>
          <H3>Example 1: Balanced Split — T(n) = 2T(n/2) + n</H3>
          <RecTreeMergeSort />
          <P>Depth: <KaTeX>{String.raw`\log_2 n`}</KaTeX>. Cost per level: <KaTeX>{String.raw`n`}</KaTeX>. Total: <KaTeX>{String.raw`\Theta(n \log n)`}</KaTeX>.</P>
        </div>
        <div>
          <H3>Example 2: Unbalanced Split — T(n) = T(n/3) + T(2n/3) + n</H3>
          <RecTreeUnbalanced />
          <P>Shortest branch depth: <KaTeX>{String.raw`\log_3 n`}</KaTeX>. Longest branch depth: <KaTeX>{String.raw`\log_{3/2} n`}</KaTeX>.</P>
          <Note color="success">
            Even though the tree is unbalanced, the per-level sum is exactly <KaTeX>{String.raw`n`}</KaTeX> (since <KaTeX>{String.raw`n/3 + 2n/3 = n`}</KaTeX>). The depth is <KaTeX>{String.raw`\Theta(\log n)`}</KaTeX>, so total cost is <KaTeX>{String.raw`\Theta(n \log n)`}</KaTeX>.
          </Note>
        </div>
      </Grid>

      <H3>Example 3: Root-Dominated — T(n) = T(n/2) + n</H3>
      <P>Level costs: n, n/2, n/4, … — a geometric series with r = 1/2:</P>
      <KaTeX block>{String.raw`n + \frac{n}{2} + \frac{n}{4} + \cdots \approx 2n = \Theta(n)`}</KaTeX>
      <Note color="info" icon="ti-bulb">The root does most of the work. Each subsequent level does half as much — the series converges to a finite multiple of n.</Note>

      <H3>Example 4: Leaf-Dominated — T(n) = 4T(n/2) + n</H3>
      <P>At each level, total cost is multiplied by 2 (4 subproblems, each half the size):</P>
      <KaTeX block>{String.raw`n + 2n + 4n + \cdots + n \cdot 2^{\log_2 n} = n \cdot \Theta(n) = \Theta(n^2)`}</KaTeX>
      <Note color="warning" icon="ti-alert-triangle">The leaves dominate. The final level contributes <KaTeX>{String.raw`n \cdot 2^{\log_2 n} = n^2`}</KaTeX> of the total work.</Note>

      <H3>Summary: Three Regime Types</H3>
      <Table
        heads={['Type', 'Recurrence', 'Dominant part', 'Result']}
        rows={[
          ['Root-dominated', 'T = T(n/2) + n', 'Top level', 'Θ(n)'],
          ['Balanced', 'T = 2T(n/2) + n', 'All levels equal', 'Θ(n log n)'],
          ['Leaf-dominated', 'T = 4T(n/2) + n', 'Leaf level', 'Θ(n²)'],
        ]}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB 7 — MASTER METHOD
═══════════════════════════════════════════════════════ */
function TabMaster() {
  return (
    <div>
      <H2>Master Method</H2>
      <P>For recurrences of the form <KaTeX>{String.raw`T(n) = aT(n/b) + f(n)`}</KaTeX> where:</P>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: '0.75rem 0' }}>
        {[
          { title: 'a ≥ 1', body: 'Number of subproblems' },
          { title: 'b > 1', body: 'Factor by which input shrinks' },
          { title: 'f(n) ≥ 0', body: 'Non-recursive (root) work' },
        ].map(({ title, body }) => (
          <div key={title} style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', padding: '12px 13px', background: 'var(--color-background-primary)' }}>
            <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--color-text-primary)', marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <P>Define the <strong>critical exponent</strong>: <KaTeX>{String.raw`c^* = \log_b a`}</KaTeX>. Compare <KaTeX>{String.raw`f(n)`}</KaTeX> to <KaTeX>{String.raw`n^{c^*}`}</KaTeX>:</P>

      <Table
        heads={['Case', 'Condition on f(n)', 'Result']}
        rows={[
          ['Case 1 — Leaves dominate', String.raw`f(n) = O(n^{c^* - \varepsilon})`, String.raw`T(n) = \Theta(n^{c^*})`],
          ['Case 2 — Balanced', String.raw`f(n) = \Theta(n^{c^*})`, String.raw`T(n) = \Theta(n^{c^*} \log n)`],
          ['Case 3 — Root dominates', String.raw`f(n) = \Omega(n^{c^* + \varepsilon})`, String.raw`T(n) = \Theta(f(n))`],
        ].map(([c, cond, res]) => [c, <KaTeX key={c}>{cond}</KaTeX>, <KaTeX key={res}>{res}</KaTeX>])}
      />

      <H3>Interactive Calculator</H3>
      <MasterTheoremCalc />

      <H3>Classic Examples</H3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '0.75rem 0' }}>
        {[
          { title: 'Binary Search', color: 'info', recurrence: String.raw`T(n) = T(n/2) + O(1)`, params: 'a=1, b=2, c*=0. f(n)=1=n⁰ → Case 2.', result: 'Θ(log n)' },
          { title: 'Merge Sort', color: 'success', recurrence: String.raw`T(n) = 2T(n/2) + n`, params: 'a=2, b=2, c*=1. f(n)=n=n¹ → Case 2.', result: 'Θ(n log n)' },
          { title: 'Strassen', color: 'warning', recurrence: String.raw`T(n) = 7T(n/2) + n^2`, params: 'a=7, b=2, c*=log₂7≈2.81. f(n)=n²<n^2.81 → Case 1.', result: 'Θ(n^2.807)' },
          { title: 'Extended Case 2', color: 'purple', recurrence: String.raw`T(n) = 4T(n/2) + n^2\log n`, params: 'a=4, b=2, c*=2. f(n)=n²log n → Case 2 extended.', result: 'Θ(n² log² n)' },
        ].map(({ title, color, recurrence, params, result }) => (
          <div key={title} style={{ border: '0.5px solid var(--color-border-tertiary)', borderLeft: `3px solid var(--color-border-${color})`, borderRadius: '0 6px 6px 0', padding: '10px 14px' }}>
            <div style={{ fontWeight: 500, fontSize: 12.5, color: `var(--color-text-${color})`, marginBottom: 6 }}>{title}</div>
            <KaTeX block>{recurrence}</KaTeX>
            <P style={{ fontSize: 12 }}>{params}</P>
            <P style={{ fontSize: 13, fontWeight: 600, marginBottom: 0 }}>{result}</P>
          </div>
        ))}
      </div>

      <Note title="When Master Theorem Doesn't Apply" color="danger" icon="ti-alert-triangle">
        The theorem requires <KaTeX>{String.raw`f(n)`}</KaTeX> to be polynomially larger/smaller than <KaTeX>{String.raw`n^{c^*}`}</KaTeX> (by factor <KaTeX>{String.raw`n^\varepsilon`}</KaTeX>). It fails for <KaTeX>{String.raw`f(n) = n^{c^*} / \log n`}</KaTeX> (barely below Case 2) — use Akra-Bazzi or recursion tree instead.
      </Note>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB 8 — SPECIAL QUESTIONS: RECURRENCES
═══════════════════════════════════════════════════════ */
function TabRecurQA() {
  return (
    <div>
      <H2>Special Questions: Recurrences</H2>

      <QA q="Determine T(n) for: T(n) = T(n−1) + T(n−2) + 1">
        <P>Let <KaTeX>{String.raw`U(n) = T(n) + 1`}</KaTeX>.</P>
        <KaTeX block>{String.raw`U(n) = T(n-1)+T(n-2)+2 = (U(n-1)-1)+(U(n-2)-1)+2 = U(n-1)+U(n-2)`}</KaTeX>
        <P>This is the Fibonacci recurrence. So <KaTeX>{String.raw`U(n) = \Theta(\phi^n)`}</KaTeX>.</P>
        <Note color="success"><strong>Answer: <KaTeX>{String.raw`T(n) = \Theta(\phi^n)`}</KaTeX></strong></Note>
      </QA>

      <QA q="Akra-Bazzi: Solve T(n) = T(n/2) + T(n/3) + n">
        <P>Find p such that <KaTeX>{String.raw`(1/2)^p + (1/3)^p = 1`}</KaTeX>. Since <KaTeX>{String.raw`1/2 + 1/3 = 5/6 < 1`}</KaTeX>, we know p &lt; 1.</P>
        <P>Akra-Bazzi gives:</P>
        <KaTeX block>{String.raw`T(n) = \Theta\!\left(n^p\!\left(1 + \int_1^n \frac{u}{u^{p+1}}\,du\right)\right) = \Theta(n)`}</KaTeX>
        <Note color="success"><strong>Answer: Θ(n)</strong> — even though the tree is unbalanced.</Note>
      </QA>

      <QA q="Binary Search on Binary Search: find smallest x where f(x)=true, where f costs O(log n).">
        <P>Binary search takes <KaTeX>{String.raw`O(\log n)`}</KaTeX> steps. Each step evaluates f(x) in <KaTeX>{String.raw`O(\log n)`}</KaTeX>.</P>
        <Note color="success"><strong>Answer: <KaTeX>{String.raw`O(\log^2 n)`}</KaTeX></strong></Note>
      </QA>

      <QA q="What is the complexity of Karatsuba multiplication?">
        <P>The recurrence is <KaTeX>{String.raw`T(n) = 3T(n/2) + O(n)`}</KaTeX>.</P>
        <P>Master Theorem Case 1: <KaTeX>{String.raw`a=3, b=2, c^* = \log_2 3 \approx 1.585`}</KaTeX>. Since <KaTeX>{String.raw`d=1 < c^*`}</KaTeX>, leaves dominate.</P>
        <Note color="success"><strong>Answer: <KaTeX>{String.raw`\Theta(n^{\log_2 3}) \approx \Theta(n^{1.585})`}</KaTeX></strong> — significantly better than the naive <KaTeX>{String.raw`O(n^2)`}</KaTeX> algorithm.</Note>
      </QA>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT COMPONENT
═══════════════════════════════════════════════════════ */
const TABS = [
  { id: 'defs', label: 'Definitions & Properties' },
  { id: 'compare', label: 'Asymptotic Comparison' },
  { id: 'series', label: 'Series & Fibonacci' },
  { id: 'bounds_qa', label: 'Special Qs (Bounds)' },
  { id: 'subst', label: 'Substitution Method' },
  { id: 'tree', label: 'Recursion Tree' },
  { id: 'master', label: 'Master Method' },
  { id: 'recur_qa', label: 'Special Qs (Recurrences)' },
];

export default function AsymptoticAnalysis() {
  const [active, setActive] = useState('defs');

  const map = {
    defs: <TabDefinitions />,
    compare: <TabCompare />,
    series: <TabSeries />,
    bounds_qa: <TabSpecialBounds />,
    subst: <TabSubst />,
    tree: <TabTree />,
    master: <TabMaster />,
    recur_qa: <TabRecurQA />,
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 02</div>
        <h1 className="page-header-title">Asymptotic Analysis & Recurrences</h1>
        <p className="page-header-subtitle">Big-O · Master Theorem · Recursion Trees · Series & Exponentiation</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: '0.5rem 0 2rem' }}>
        {map[active]}
      </div>

      <NavButtons moduleId={2} />
    </div>
  );
}
