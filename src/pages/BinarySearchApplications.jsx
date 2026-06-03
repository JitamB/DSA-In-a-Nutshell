import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx, Math as KaTeX } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SHARED DATA
══════════════════════════════════════════════════════ */
// Painter Partition: boards=[2,1,5,3,4], K=2
// sum=15, max=5, answer=8
const PP_BOARDS = [2, 1, 5, 3, 4];
const PP_K = 2;
const PP_SUM = PP_BOARDS.reduce((a, b) => a + b, 0);
const PP_MAX = Math.max(...PP_BOARDS);

function assignBoards(boards, maxTime) {
  if (boards.some(b => b > maxTime)) return { feasible: false, groups: [] };
  const groups = [];
  let current = [], currentSum = 0;
  for (const b of boards) {
    if (currentSum + b <= maxTime) {
      current.push(b); currentSum += b;
    } else {
      groups.push({ boards: current, sum: currentSum });
      current = [b]; currentSum = b;
    }
  }
  if (current.length) groups.push({ boards: current, sum: currentSum });
  return { feasible: groups.length <= PP_K, groups };
}

// Build BS steps for painter partition
function buildPPSteps() {
  const steps = [];
  let lo = PP_MAX, hi = PP_SUM, ans = PP_SUM;
  steps.push({ lo, hi, mid: -1, ans, maxTime: null, action: 'init',
    desc: `lo=${PP_MAX} (max single board), hi=${PP_SUM} (all boards one painter). Binary search on answer.` });
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const { feasible, groups } = assignBoards(PP_BOARDS, mid);
    if (feasible) {
      ans = mid;
      steps.push({ lo, hi, mid, ans, maxTime: mid, groups, action: 'true',
        desc: `mid=${mid}: ${groups.length} painter${groups.length>1?'s':''} ≤ K=${PP_K}  ✓ feasible → candidate ans=${mid}. Search left: hi=${mid-1}` });
      hi = mid - 1;
    } else {
      const { groups: g2 } = assignBoards(PP_BOARDS, mid);
      steps.push({ lo, hi, mid, ans, maxTime: mid, groups: g2, action: 'false',
        desc: `mid=${mid}: ${assignBoards(PP_BOARDS,mid).groups.length + (mid<PP_MAX?0:0)} painters > K=${PP_K}  ✗ not feasible → search right: lo=${mid+1}` });
      lo = mid + 1;
    }
  }
  steps.push({ lo, hi, mid: -1, ans, maxTime: ans, action: 'done',
    desc: `Done! Minimum max-time = ${ans}. Boards allocated across ${PP_K} painters with no painter exceeding ${ans} units.` });
  return steps;
}
const PP_STEPS = buildPPSteps();

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — PAINTER PARTITION VIZ
   Show boards as blocks, painters as colored groups
   Step through binary search steps
══════════════════════════════════════════════════════ */
const PAINTER_COLORS = ['#81B4EA', '#CE9178', '#4EC9B0', '#C586C0', '#DCDCAA'];

function PainterViz() {
  const [step, setStep] = useState(0);
  const s = PP_STEPS[Math.min(step, PP_STEPS.length - 1)];
  const maxW = 5; // max board value

  const { feasible, groups } = s.maxTime !== null
    ? assignBoards(PP_BOARDS, s.maxTime)
    : { feasible: null, groups: [] };

  // Map each board to a painter index based on current assignment
  const boardToPainter = [];
  if (groups.length) {
    let bi = 0;
    groups.forEach((g, pi) => {
      g.boards.forEach(() => { boardToPainter[bi++] = pi; });
    });
  }

  return (
    <VizBox>
      {/* Step description */}
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
        {s.desc}
      </div>

      {/* Board visualization */}
      {s.maxTime !== null && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>
            BOARD ASSIGNMENT  (max_time = {s.maxTime})
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', marginBottom: 8 }}>
            {PP_BOARDS.map((b, i) => {
              const pi = boardToPainter[i] ?? -1;
              const color = pi >= 0 ? PAINTER_COLORS[pi % PAINTER_COLORS.length] : '#3D4460';
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: 36, height: (b / maxW) * 68 + 10, borderRadius: '4px 4px 0 0', background: color, border: `1px solid ${color}CC`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 3, transition: 'all 0.2s' }}>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'rgba(0,0,0,0.7)' }}>{b}</span>
                  </div>
                  <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
                </div>
              );
            })}
          </div>
          {/* Painter summary */}
          {groups.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {groups.map((g, pi) => {
                const color = PAINTER_COLORS[pi % PAINTER_COLORS.length];
                const isOver = g.sum > s.maxTime;
                return (
                  <div key={pi} style={{ padding: '5px 10px', borderRadius: 6, background: 'var(--color-background-secondary)', border: `1.5px solid ${color}`, fontSize: 11.5, fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: color, fontWeight: 700 }}>P{pi + 1}</span>
                    <span style={{ color: 'var(--color-text-secondary)', marginLeft: 5 }}>
                      [{g.boards.join(',')}] = <span style={{ fontWeight: 700, color: isOver ? 'var(--color-text-danger)' : color }}>{g.sum}</span>
                    </span>
                  </div>
                );
              })}
              <div style={{ padding: '5px 10px', borderRadius: 6, background: feasible ? 'var(--color-background-success)' : 'var(--color-background-danger)', border: `1px solid ${feasible ? 'var(--color-border-success)' : 'var(--color-border-danger)'}`, fontSize: 11.5, fontFamily: 'var(--font-mono)', color: feasible ? 'var(--color-text-success)' : 'var(--color-text-danger)', fontWeight: 700 }}>
                {groups.length}P {feasible ? `≤ K=${PP_K} ✓` : `> K=${PP_K} ✗`}
              </div>
            </div>
          )}
        </div>
      )}

      {/* lo / hi / mid */}
      {s.mid !== -1 && (
        <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 14 }}>
          <span style={{ color: 'var(--color-text-success)' }}>lo={s.lo}</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>·</span>
          <span style={{ color: 'var(--color-text-warning)' }}>mid={s.mid}</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>·</span>
          <span style={{ color: 'var(--color-text-danger)' }}>hi={s.hi}</span>
          {s.ans !== PP_SUM && s.action !== 'init' && (
            <span style={{ marginLeft: 8, color: 'var(--color-text-info)' }}>ans={s.ans}</span>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(PP_STEPS.length-1,step+1)),step===PP_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{PP_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — LIVE FEASIBILITY CHECKER
   Slider for max_time → see how boards split dynamically
   Complements the step-through with free exploration
══════════════════════════════════════════════════════ */
function FeasibilitySliderViz() {
  const [maxTime, setMaxTime] = useState(8);
  const { feasible, groups } = assignBoards(PP_BOARDS, maxTime);

  const boardToPainter = [];
  if (groups.length) {
    let bi = 0;
    groups.forEach((g, pi) => g.boards.forEach(() => { boardToPainter[bi++] = pi; }));
  }
  const maxW = 5;

  return (
    <VizBox>
      <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 50px', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>max_time</span>
        <input type="range" min={PP_MAX} max={PP_SUM} value={maxTime} onChange={e => setMaxTime(+e.target.value)} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{maxTime}</span>
      </div>

      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', marginBottom: 10 }}>
        {PP_BOARDS.map((b, i) => {
          const pi = boardToPainter[i] ?? -1;
          const color = pi >= 0 ? PAINTER_COLORS[pi % PAINTER_COLORS.length] : '#3D4460';
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 36, height: (b/maxW)*68+10, borderRadius:'4px 4px 0 0', background: color, border:`1px solid ${color}BB`, display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:3 }}>
                <span style={{ fontSize:11,fontFamily:'var(--font-mono)',fontWeight:700,color:'rgba(0,0,0,0.65)' }}>{b}</span>
              </div>
              <span style={{ fontSize:9,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {groups.map((g, pi) => (
          <div key={pi} style={{ padding:'5px 10px',borderRadius:6,background:'var(--color-background-secondary)',border:`1.5px solid ${PAINTER_COLORS[pi%PAINTER_COLORS.length]}`,fontSize:11.5,fontFamily:'var(--font-mono)' }}>
            <span style={{ color:PAINTER_COLORS[pi%PAINTER_COLORS.length],fontWeight:700 }}>P{pi+1}</span>
            <span style={{ color:'var(--color-text-secondary)',marginLeft:5 }}>[{g.boards.join(',')}] = {g.sum}</span>
          </div>
        ))}
      </div>

      <div style={{ padding:'8px 14px',borderRadius:'var(--border-radius-md)',background:feasible?'var(--color-background-success)':'var(--color-background-danger)',border:`1px solid ${feasible?'var(--color-border-success)':'var(--color-border-danger)'}`,fontSize:12.5,fontFamily:'var(--font-mono)',color:feasible?'var(--color-text-success)':'var(--color-text-danger)',fontWeight:700,textAlign:'center' }}>
        {feasible
          ? `✓ FEASIBLE — ${groups.length} painter${groups.length>1?'s':''} ≤ K=${PP_K}. max_time=${maxTime} is a valid answer.`
          : `✗ INFEASIBLE — ${groups.length} painters > K=${PP_K}. Need larger max_time.`
        }
      </div>
      <div style={{ fontSize:11,color:'var(--color-text-tertiary)',textAlign:'center',marginTop:8,fontFamily:'var(--font-mono)' }}>
        The answer is the MINIMUM max_time that is feasible.  Optimal = {PP_STEPS[PP_STEPS.length-1].ans}
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — REAL DOMAIN CONVERGENCE
   Shows lo/hi converging over 40 iterations
   Example: find x such that x² = target (√target)
══════════════════════════════════════════════════════ */
function RealDomainViz() {
  const [target, setTarget] = useState(2);
  const [iter,   setIter]   = useState(20);

  const expected = Math.sqrt(target);
  const iterations = [];
  let lo = 0, hi = target + 1;
  for (let i = 0; i < iter; i++) {
    const mid = (lo + hi) / 2;
    iterations.push({ i: i+1, lo, hi, mid, width: hi - lo });
    if (mid * mid <= target) lo = mid;
    else hi = mid;
  }
  const ans = (lo + hi) / 2;
  const err = Math.abs(ans - expected);

  return (
    <VizBox>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Target = {target}</div>
          <input type="range" min={2} max={100} value={target} onChange={e => setTarget(+e.target.value)} style={{ width: '100%' }} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Iterations = {iter}</div>
          <input type="range" min={1} max={60} value={iter} onChange={e => setIter(+e.target.value)} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Convergence viz — show interval shrinking */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>
          INTERVAL WIDTH OVER ITERATIONS  (solving x² = {target}, so x = √{target} ≈ {expected.toFixed(6)})
        </div>
        <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '10px 14px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 50 }}>
            {iterations.map((it, i) => {
              const maxW = iterations[0].width;
              const h = Math.max(2, (it.width / maxW) * 46);
              const progress = i / (iterations.length - 1);
              const color = `hsl(${130 + progress * 90}, 65%, 45%)`;
              return (
                <div key={i} title={`iter ${it.i}: width=${it.width.toFixed(6)}`}
                  style={{ flex: 1, height: h, background: color, borderRadius: '2px 2px 0 0', minWidth: 2, maxWidth: 10 }} />
              );
            })}
          </div>
        </div>
      </div>

      {/* Final stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <div style={{ background: 'var(--color-background-info)', border: '0.5px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-info)', marginBottom: 2 }}>Computed √{target}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--color-text-info)' }}>{ans.toFixed(8)}</div>
        </div>
        <div style={{ background: 'var(--color-background-success)', border: '0.5px solid var(--color-border-success)', borderRadius: 'var(--border-radius-md)', padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-success)', marginBottom: 2 }}>True √{target}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--color-text-success)' }}>{expected.toFixed(8)}</div>
        </div>
        <div style={{ background: err < 1e-6 ? 'var(--color-background-success)' : 'var(--color-background-warning)', border: `0.5px solid ${err<1e-6?'var(--color-border-success)':'var(--color-border-warning)'}`, borderRadius: 'var(--border-radius-md)', padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: err<1e-6?'var(--color-text-success)':'var(--color-text-warning)', marginBottom: 2 }}>Error</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: err<1e-6?'var(--color-text-success)':'var(--color-text-warning)' }}>~{err.toExponential(2)}</div>
        </div>
      </div>
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
        <div style={{display:'flex',gap:6,alignItems:'center'}}>{tags.map(t=><span key={t} style={{padding:'1px 7px',borderRadius:12,fontSize:10.5,background:'var(--color-background-tertiary)',color:'var(--color-text-tertiary)',fontWeight:500}}>{t}</span>)}<span style={{padding:'2px 9px',borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${dc})`,color:`var(--color-text-${dc})`,border:`1px solid var(--color-border-${dc})`}}>{difficulty}</span></div>
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
   SECTION 1 — BINARY SEARCH ON ANSWER
══════════════════════════════════════════════════════ */
function SectionOnAnswer() {
  return (
    <div>
      <Note color="info" icon="ti-target">
        <strong>The "Binary Search on Answer" paradigm:</strong> When the answer itself lies in a sorted/monotonic domain, binary search <em>directly on the answer value</em>. The key insight: if answer = x is feasible, then any x' &gt; x is also feasible (or vice versa) — creating the monotonic predicate needed for binary search.
      </Note>

      <H2>Recognizing the Pattern</H2>
      <Grid cols={2}>
        <Card title="How to identify it" color="info">
          The question asks for a minimum/maximum value. You can define a <code>check(x)</code>: "Is x a feasible answer?" check is <em>monotone</em>: all-false then all-true (or vice versa). You can evaluate check in O(n) or O(n log n).
        </Card>
        <Card title="The template" color="success">
          <KaTeX>{String.raw`lo = \text{minimum possible answer}`}</KaTeX><br/>
          <KaTeX>{String.raw`hi = \text{maximum possible answer}`}</KaTeX><br/>
          Binary search for the first true value of check in [lo, hi].
        </Card>
      </Grid>

      <H2>Painter Partition Problem</H2>
      <P>Given boards of lengths <KaTeX>{String.raw`[b_1, b_2, \ldots, b_n]`}</KaTeX> and <KaTeX>{String.raw`K`}</KaTeX> painters (each paints a contiguous section), minimize the <strong>maximum time</strong> any painter takes. Each painter's time = sum of boards they paint.</P>
      <Note color="success" icon="ti-bulb">
        <strong>Monotone structure:</strong> if max_time = x allows K painters to cover all boards, then max_time = x+1 is also feasible. If x is infeasible, all values &lt; x are also infeasible. Perfect monotone predicate.
      </Note>

      <H2>Step-through: boards=[2,1,5,3,4], K=2</H2>
      <P>Binary search between lo=5 (max single board) and hi=15 (sum). The interactive below steps through each binary search iteration — see how the painter assignment changes at each mid value.</P>
      <PainterViz />

      <H2>Explore Feasibility Freely</H2>
      <P>Use the slider to understand exactly how the <code>check()</code> function works — and why the answer is the minimum feasible max_time.</P>
      <FeasibilitySliderViz />

      <Code>{{cpp: `#include <iostream>
#include <vector>
using namespace std;
#define int long long

// check: can K painters finish all boards within 'maxTime' each?
bool check(vector<int>& arr, int maxTime, int k) {
    int needed = 1, left = maxTime;
    for (int i = 0; i < arr.size(); i++) {
        if (left >= arr[i]) {
            left -= arr[i];
        } else {
            left = maxTime - arr[i];  // new painter starts here
            needed++;
        }
        if (needed > k) return false;  // early exit: too many painters
    }
    return true;  // needed <= k
}

signed main() {
    int t; cin >> t;
    while (t--) {
        int n, k; cin >> n >> k;
        vector<int> arr(n);
        int mx = 0, sum = 0;
        for (int i = 0; i < n; i++) { cin >> arr[i]; mx = max(mx, arr[i]); sum += arr[i]; }

        int lo = mx, hi = sum, ans = sum;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (check(arr, mid, k)) { ans = mid; hi = mid - 1; }   // feasible → try smaller
            else                    { lo  = mid + 1; }              // infeasible → need larger
        }
        cout << ans << "\n";
    }
}`, python: `def check(arr, max_time, k):
    needed, left = 1, max_time
    for b in arr:
        if left >= b: left -= b
        else: left = max_time - b; needed += 1
        if needed > k: return False
    return True

def painter_partition(arr, k):
    lo, hi = max(arr), sum(arr)
    ans = hi
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if check(arr, mid, k): ans = mid; hi = mid - 1
        else: lo = mid + 1
    return ans`}}</Code>

      <QA q="Why is lo = max(arr) and hi = sum(arr) the correct search range?" a="lo = max(arr): even with infinite painters, each painter must take at least the longest board — so max_time ≥ max(arr). Any smaller value is trivially infeasible. hi = sum(arr): with one painter, max_time = sum of all boards. Any larger value is trivially feasible but never optimal. The answer lies in [max, sum], so this is the tightest valid search range." />
      <QA q="Why is the check() function O(n), and what makes the total complexity O(n log(sum-max))?" a="check(mid) simulates the greedy painter assignment in one linear scan — O(n). Binary search runs O(log(hi-lo)) = O(log(sum-max)) iterations (the range of possible answers). Total: O(n × log(sum-max)). For typical inputs sum ≤ n×max, so log(sum-max) ≈ log(n×max) = log n + log max ≈ log(n × 10⁹) ≈ 50 iterations, giving an effective O(50n) solution." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — MINIMIZE MAXIMUM / MAXIMIZE MINIMUM
══════════════════════════════════════════════════════ */
function SectionMinMax() {
  return (
    <div>
      <Note color="warning" icon="ti-arrows-left-right">
        Two canonical problem archetypes: <strong>minimize the maximum</strong> (Painter Partition, Ship Packages) and <strong>maximize the minimum</strong> (Aggressive Cows, Magnetic Force). Both reduce to BS on answer with a greedy feasibility check.
      </Note>

      <H2>Minimize Maximum Separation — Given Points</H2>
      <P>Given N distinct points and K additional points to insert, minimize the maximum gap between any two consecutive points. The search space is [1, max_gap]. check(x): "can we achieve max_gap ≤ x using at most K extra points?"</P>
      <Note color="success" icon="ti-math">
        For a gap of size g with max allowed gap x: the number of extra points needed = <KaTeX>{String.raw`\lceil g/x \rceil - 1`}</KaTeX>. This is computed with integer arithmetic as <KaTeX>{String.raw`(g + x - 1) / x - 1`}</KaTeX> (no floating point needed).
      </Note>
      <Code>{{cpp: `// Minimize maximum gap: N points, K additional points allowed
bool check(int arr[], int n, int k, int maxDiff) {
    int pointsRequired = 0;
    for (int i = 1; i < n; i++) {
        int gap = arr[i] - arr[i - 1];
        // Additional points needed in this gap to keep max ≤ maxDiff
        pointsRequired += (gap + maxDiff - 1) / maxDiff - 1;   // = ceil(gap/maxDiff) - 1
    }
    return pointsRequired <= k;
}

int minimizeMaxGap(int arr[], int n, int k) {
    int lo = 1, hi = arr[n-1] - arr[0], ans = hi;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(arr, n, k, mid)) { ans = mid; hi = mid - 1; }
        else                       { lo  = mid + 1; }
    }
    return ans;
}`, python: `def check(arr, k, max_diff):
    needed = sum((arr[i]-arr[i-1]+max_diff-1)//max_diff - 1 for i in range(1,len(arr)))
    return needed <= k

def minimize_max_gap(arr, k):
    lo, hi, ans = 1, arr[-1]-arr[0], arr[-1]-arr[0]
    while lo <= hi:
        mid = lo+(hi-lo)//2
        if check(arr, k, mid): ans=mid; hi=mid-1
        else: lo=mid+1
    return ans`}}</Code>

      <H2>Maximize Minimum — Aggressive Cows (Classic)</H2>
      <P>Place K cows in N stalls to <strong>maximize the minimum distance</strong> between any two cows. check(d): "can we place K cows with each pair at least d apart?" Greedily place cows starting from the first stall, always placing the next cow at the first stall ≥ d away from the last placed.</P>
      <Code>{{cpp: `// Aggressive cows: maximize minimum distance
bool check(vector<int>& stalls, int k, int minDist) {
    int count = 1, last = stalls[0];
    for (int i = 1; i < stalls.size(); i++) {
        if (stalls[i] - last >= minDist) {
            count++;
            last = stalls[i];
            if (count == k) return true;
        }
    }
    return false;
}

int aggressiveCows(vector<int>& stalls, int k) {
    sort(stalls.begin(), stalls.end());
    int lo = 1, hi = stalls.back() - stalls.front(), ans = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(stalls, k, mid)) { ans = mid; lo = mid + 1; }  // maximize → go right
        else                       { hi  = mid - 1; }
    }
    return ans;
}
// [1,2,8,4,9], k=3 → sort:[1,2,4,8,9] → answer = 3 (place at 1,4,9: gaps=3,5)`, python: `def check(stalls, k, min_dist):
    count, last = 1, stalls[0]
    for s in stalls[1:]:
        if s - last >= min_dist:
            count += 1; last = s
            if count == k: return True
    return False

def aggressive_cows(stalls, k):
    stalls.sort()
    lo, hi, ans = 1, stalls[-1]-stalls[0], 0
    while lo <= hi:
        mid = lo+(hi-lo)//2
        if check(stalls, k, mid): ans=mid; lo=mid+1
        else: hi=mid-1
    return ans`}}</Code>

      <H2>The Two Template Directions</H2>
      <Table
        heads={["Problem Type", "Monotone Structure", "Template", "Example"]}
        rows={[
          ["Minimize the maximum", "[F,F,…,T,T]", "First true → hi=mid-1", "Painter Partition, Ship Packages"],
          ["Maximize the minimum", "[T,T,…,F,F]", "Last true → lo=mid+1", "Aggressive Cows, Magnetic Force"],
          ["Find exact threshold", "[F,F,T,T]", "First true → hi=mid-1", "Koko eating bananas"],
        ]}
      />

      <QA q="How do you determine the search range [lo, hi] for arbitrary 'binary search on answer' problems?" a="lo = the smallest value that's trivially feasible or the minimum possible answer (e.g., max single element for Painter, 1 for distances). hi = the largest value needed (e.g., sum of all elements for Painter, max stall gap for Cows). A helpful heuristic: think about 1 'unit' (K=1 painter, 1 cow) and n 'units' (n painters, n cows) — what are the corresponding answer values? Those are your lo and hi." />
      <QA q="What is the difference between 'minimize the maximum' and 'maximize the minimum' in terms of the binary search direction?" a="Both find a threshold value. 'Minimize the maximum' looks for the smallest feasible value — the feasibility predicate is [F,F,T,T], so we search for the first true (hi = mid-1 when feasible). 'Maximize the minimum' looks for the largest feasible value — feasibility is [T,T,F,F], so we search for the last true (lo = mid+1 when feasible). The check function changes, but the binary search skeleton is symmetric." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — KTH ELEMENT VIA COUNTING
══════════════════════════════════════════════════════ */
function SectionKth() {
  return (
    <div>
      <Note color="purple" icon="ti-hash">
        <strong>Counting-based binary search:</strong> To find the Kth smallest element in a structured set, binary search on the answer value x. Define check(x) = "how many elements are ≤ x?" If this count ≥ K, the Kth smallest is ≤ x. This converts an O(nm) sorting problem to O((n+m) log(max_val)).
      </Note>

      <H2>Kth Smallest in A[i]+B[j] Matrix</H2>
      <P>Arrays A (size n) and B (size m) are sorted. The virtual matrix C[i][j] = A[i]+B[j] has n×m elements. Find the Kth smallest without building C explicitly. Binary search on the answer x: count pairs (i,j) where A[i]+B[j] ≤ x. For each A[i], the valid B[j] values are those with B[j] ≤ x-A[i] — found with upper_bound in O(log m). Total check: O(n log m).</P>
      <Code>{{cpp: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

// Count pairs (i,j) where A[i] + B[j] <= mid
ll countPairs(vector<int>& a, vector<int>& b, int mid) {
    ll count = 0;
    for (int x : a)
        count += upper_bound(b.begin(), b.end(), mid - x) - b.begin();
    return count;
}

int kthSmallestSum(vector<int>& a, vector<int>& b, int k) {
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());

    int lo = a[0] + b[0];            // minimum possible sum
    int hi = a.back() + b.back();    // maximum possible sum
    int ans = lo;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (countPairs(a, b, mid) >= k) {  // k-th smallest is <= mid
            ans = mid;
            hi  = mid - 1;
        } else {
            lo  = mid + 1;
        }
    }
    return ans;
}
// a=[1,7,11], b=[2,4,6], k=3 → pairs sorted: [3,5,7,9,13,15,13,15,17] → 3rd smallest = 7`, python: `from bisect import bisect_right

def count_pairs(a, b, mid):
    count = 0
    for x in a:
        count += bisect_right(b, mid - x)
    return count

def kth_smallest_sum(a, b, k):
    a.sort(); b.sort()
    lo, hi = a[0]+b[0], a[-1]+b[-1]
    ans = lo
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if count_pairs(a, b, mid) >= k: ans=mid; hi=mid-1
        else: lo=mid+1
    return ans`}}</Code>
      <Note color="warning" icon="ti-info-circle">
        <strong>Subtlety:</strong> The counted value (mid) might not itself be a valid sum in C. The final answer is the smallest x such that count(x) ≥ k, which is guaranteed to be an actual sum in C (since count jumps at actual sums). The binary search correctly finds this first-jump point.
      </Note>

      <H2>Kth Smallest in a Sorted Matrix (LC 378)</H2>
      <P>Binary search on value range [min, max] of the matrix. count(x) = number of elements ≤ x, counted in O(n) using the sorted property (walk from bottom-left).</P>
      <Code>{{cpp: `int kthSmallest(vector<vector<int>>& matrix, int k) {
    int n = matrix.size();
    int lo = matrix[0][0], hi = matrix[n-1][n-1];

    auto countLE = [&](int mid) {
        int count = 0, row = n - 1, col = 0;
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= mid) { count += row + 1; col++; }
            else                         { row--; }
        }
        return count;
    };

    int ans = lo;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (countLE(mid) >= k) { ans = mid; hi = mid - 1; }
        else                   { lo  = mid + 1; }
    }
    return ans;
}`, python: `def kth_smallest(matrix, k):
    n = len(matrix)
    lo, hi = matrix[0][0], matrix[-1][-1]
    def count_le(mid):
        count, row, col = 0, n-1, 0
        while row >= 0 and col < n:
            if matrix[row][col] <= mid: count += row+1; col+=1
            else: row -= 1
        return count
    ans = lo
    while lo <= hi:
        mid = lo+(hi-lo)//2
        if count_le(mid)>=k: ans=mid; hi=mid-1
        else: lo=mid+1
    return ans`}}</Code>

      <QA q="In the A[i]+B[j] problem, why does upper_bound work for counting feasible B values?" a="After sorting B, for a given A[i], we want the count of B[j] such that A[i]+B[j] ≤ mid, i.e., B[j] ≤ mid-A[i]. upper_bound(B, mid-A[i]) gives the first index where B[j] > mid-A[i] — the count of valid B[j] values is exactly this index (all elements before it satisfy B[j] ≤ mid-A[i]). This reduces each A[i] loop iteration from O(m) to O(log m)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — PREFIX SUM + BINARY SEARCH ON SCORE
══════════════════════════════════════════════════════ */
function SectionPrefixBS() {
  return (
    <div>
      <Note color="info" icon="ti-wave-square">
        <strong>Binary search on every step:</strong> When the answer is a length/score/count and the feasibility function requires a sliding window check that itself uses prefix sums, combine them for O(n log n) total.
      </Note>

      <H2>Longest 1s Subarray with K Flips</H2>
      <P>Given a binary array of length N and integer K, find the maximum length of a contiguous subarray of 1s you can achieve by flipping at most K zeros. Binary search on the answer (the length), check feasibility using a prefix sum of 1s in a sliding window.</P>
      <Code>{{cpp: `// check(mid): is there a window of size 'mid' with at most k zeros?
// Using prefix sum p[] where p[i] = count of 1s in arr[0..i-1]
bool check(ll mid, ll p[], ll n, ll k) {
    for (ll i = 0; i <= n - mid; i++) {
        // Ones in window [i, i+mid-1] = p[i+mid-1+1] - p[i] = p[i+mid] - p[i]
        // Zeros in window = mid - ones
        ll onesInWindow;
        if (i == 0) onesInWindow = p[i + mid - 1];       // prefix p[0..mid-1]
        else        onesInWindow = p[i + mid - 1] - p[i - 1];
        if (mid - onesInWindow <= k) return true;   // zeros ≤ k → achievable
    }
    return false;
}

int maxOnesWithKFlips(int arr[], int n, int k) {
    ll p[n];    // prefix sum of 1s
    p[0] = arr[0];
    for (int i = 1; i < n; i++) p[i] = arr[i] + p[i - 1];

    ll lo = 0, hi = n, ans = 0;
    while (lo <= hi) {
        ll mid = lo + (hi - lo) / 2;
        if (check(mid, p, n, k)) { ans = mid; lo = mid + 1; }  // maximize → go right
        else                     { hi  = mid - 1; }
    }
    return ans;
}
// [1,0,0,1,1,0,1], k=2 → answer = 5  (flip positions 1,2 or 2,5)`, python: `def max_ones_with_k_flips(arr, k):
    n = len(arr)
    p = [0] * n
    p[0] = arr[0]
    for i in range(1, n): p[i] = arr[i] + p[i-1]

    def check(mid):
        for i in range(n - mid + 1):
            ones = p[i+mid-1] if i == 0 else p[i+mid-1] - p[i-1]
            if mid - ones <= k: return True
        return False

    lo, hi, ans = 0, n, 0
    while lo <= hi:
        mid = lo+(hi-lo)//2
        if check(mid): ans=mid; lo=mid+1
        else: hi=mid-1
    return ans`}}</Code>

      <Note color="success" icon="ti-bulb">
        <strong>Monotone structure explained:</strong> If a window of size mid has ≤ k zeros, any smaller window also has ≤ k zeros (it's a subset). So check(mid) has the structure [T,T,T,…,F,F] — all small lengths are achievable, some large length is first infeasible. We want the <em>last true</em> (maximize) → use lo = mid+1 when feasible.
      </Note>

      <H2>Why Combine Prefix Sum with Binary Search?</H2>
      <P>The sliding window without binary search can also solve this in O(n) — but the binary search + prefix sum approach demonstrates a generalizable pattern: when the "length" is monotone but the feasibility check requires summing elements in a window, precompute prefix sums to make each check O(1) per window position (O(n) total per check × O(log n) checks = O(n log n)).</P>
      <Table
        heads={["Approach", "Time", "Space", "When to use"]}
        rows={[
          ["Sliding window (LC 1004)", "O(n)", "O(1)", "Simpler, optimal for this exact problem"],
          ["BS + prefix sum", "O(n log n)", "O(n)", "When the 'window condition' is more complex (e.g., count of specific patterns, not just zeros)"],
          ["BS + binary search inside", "O(n log² n)", "O(n)", "Complex conditions requiring inner search per window"],
        ]}
      />

      <QA q="When is 'binary search on the score' necessary versus just using a sliding window?" a="Sliding window is sufficient when: (1) you can incrementally update the window state in O(1) per step, and (2) the monotone property holds for the target metric. Binary search on score is better when: (1) incrementally maintaining the window state is complex, or (2) the feasibility check needs a precomputed data structure (like a sorted structure or prefix sum) that makes the O(n) check cleaner to implement from scratch per mid." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — REAL DOMAIN & PROBLEMS
══════════════════════════════════════════════════════ */
function SectionRealDomain() {
  return (
    <div>
      <H2>Binary Search on Real Numbers</H2>
      <P>When the answer is a real/float value, the discrete <code>lo+1</code>/<code>hi-1</code> updates don't work. Two approaches: (1) stop when the interval width is below a tolerance ε; (2) run a fixed number of iterations (typically 100) — the interval halves each time, so after 100 iterations the width is <KaTeX>{String.raw`2^{-100} \approx 10^{-30}`}</KaTeX> of the original, well beyond any required precision.</P>
      <Code>{{cpp: `// Approach 1: tolerance-based stopping
long double realBinarySearch_eps(long double lo, long double hi,
                                  auto check, long double eps = 1e-9) {
    while (hi - lo > eps) {
        long double mid = (lo + hi) / 2;
        if (check(mid)) hi = mid;
        else            lo = mid;
    }
    return (lo + hi) / 2;
}

// Approach 2: fixed iterations (preferred in competitive programming)
long double realBinarySearch_iter(long double lo, long double hi, auto check) {
    for (int iter = 0; iter < 100; iter++) {   // 100 iterations → precision ~1e-30
        long double mid = (lo + hi) / 2;
        if (check(mid)) hi = mid;   // or lo = mid; depending on direction
        else            lo = mid;
    }
    return (lo + hi) / 2;
}

// Example: find square root of N
long double sqrtBinarySearch(long double N) {
    auto check = [&](long double x) { return x * x >= N; };
    return realBinarySearch_iter(0, N + 1, check);
}`, python: `def real_binary_search(lo, hi, check, iters=100):
    """Fixed-iteration real-domain binary search."""
    for _ in range(iters):
        mid = (lo + hi) / 2
        if check(mid): hi = mid
        else:          lo = mid
    return (lo + hi) / 2

# Example: cube root of N
def cube_root(N):
    check = lambda x: x**3 >= N
    lo = 0 if N >= 0 else -abs(N)
    hi = abs(N) + 1
    return real_binary_search(lo, hi, check)`}}</Code>

      <H2>Real Domain Convergence — Interactive</H2>
      <P>See how fast the interval [lo, hi] collapses to a point over iterations. After 50 iterations, the error is typically below 10⁻¹⁵ — beyond the precision of 64-bit floats.</P>
      <RealDomainViz />

      <H2>When to Use 100 Iterations vs Epsilon Stopping</H2>
      <Grid cols={2}>
        <Card title="100 iterations (preferred)" color="success">
          Simple and safe. No risk of infinite loop from precision errors. After 100 halvings on a [0, 10⁹] range: precision ≈ 10⁹ / 2¹⁰⁰ ≈ 10⁻²¹. Exceeds any realistic requirement.
        </Card>
        <Card title="Epsilon stopping (use carefully)" color="warning">
          Can loop forever if check is ill-conditioned. Safe when the interval is guaranteed to converge. Use eps ≈ 10⁻⁷ for float, 10⁻¹² for double, 10⁻¹⁸ for long double.
        </Card>
      </Grid>

      <QA q="Why not just use 100 iterations always, even for integer binary search?" a="For integers, lo and hi converge to adjacent values (lo+1 = hi), and using (lo+hi)/2 with integer division will cycle. The discrete template with lo &lt;= hi and lo = mid+1 / hi = mid-1 correctly handles this. The 'fixed iterations' approach works for reals because the midpoint can always be divided (no integer rounding). For integers, the explicit pointer-update template is correct and preferred." />

      {/* PROBLEMS */}
      <H2 style={{ marginTop: '2rem' }}>Problems</H2>
      <Note color="purple" icon="ti-tournament">
        6 hard binary-search-on-answer problems. All require defining a clean check() function. Attempt independently before revealing solutions.
      </Note>

      <ProblemCard num={1} title="Painter Partition Problem" difficulty="OA Hard" tags={["BS on Answer","Greedy Check"]}
        statement="There are N boards of lengths stored in <code>arr[]</code> and K painters. Each painter paints only contiguous boards. The time taken by a painter is the sum of lengths painted. Find the <strong>minimum possible time</strong> for all boards to be painted."
        constraints={["1 ≤ K ≤ N ≤ 10⁵","1 ≤ arr[i] ≤ 10⁶","O(n log sum) required"]}
        examples={[
          {input:"arr=[5,5,5,5], K=2",output:"10",note:"Each painter takes [5,5] = 10"},
          {input:"arr=[2,1,5,3,4], K=2",output:"8",note:"Painter 1: [2,1,5]=8, Painter 2: [3,4]=7"},
        ]}
        approach="Binary search on max_time in [max(arr), sum(arr)]. check(t): greedily assign boards to painters — when adding next board exceeds t, assign a new painter. If painters needed ≤ K → feasible. Search for minimum feasible t (first-true pattern)."
        code={{cpp:`bool check(vector<int>& a, int t, int k) {
    int needed=1,left=t;
    for(int b:a){ if(left>=b)left-=b; else{left=t-b;needed++;} if(needed>k)return 0; }
    return 1;
}
int painterPartition(vector<int>& a, int k) {
    int lo=*max_element(a.begin(),a.end()),hi=accumulate(a.begin(),a.end(),0),ans=hi;
    while(lo<=hi){int mid=lo+(hi-lo)/2;if(check(a,mid,k)){ans=mid;hi=mid-1;}else lo=mid+1;}
    return ans;
}`,python:`def painter_partition(arr, k):
    def check(t):
        n=1;left=t
        for b in arr:
            if left>=b:left-=b
            else:left=t-b;n+=1
            if n>k:return False
        return True
    lo,hi=max(arr),sum(arr);ans=hi
    while lo<=hi:
        mid=lo+(hi-lo)//2
        if check(mid):ans=mid;hi=mid-1
        else:lo=mid+1
    return ans`}}
      />

      <ProblemCard num={2} title="Aggressive Cows (Maximize Minimum Distance)" difficulty="OA Hard" tags={["LC 2812 variant","Maximize Minimum"]}
        statement="Given N stall positions and K cows, place cows in stalls so that the <strong>minimum distance</strong> between any two cows is <strong>maximized</strong>."
        constraints={["2 ≤ K ≤ N ≤ 10⁵","0 ≤ stalls[i] ≤ 10⁹"]}
        examples={[
          {input:"stalls=[1,2,4,8,9], K=3",output:"3",note:"Place at 1,4,9: gaps=3,5 → min=3"},
          {input:"stalls=[0,3,4,7,10,9], K=4",output:"3"},
        ]}
        approach="Sort stalls. Binary search on minimum distance d in [1, stalls[n-1]-stalls[0]]. check(d): greedily place cows — place next cow at first stall ≥ d away from last placed. If count ≥ K → feasible. Maximize (last-true pattern): lo=mid+1 when feasible."
        code={{cpp:`bool check(vector<int>& s, int k, int d) {
    int cnt=1, last=s[0];
    for(int i=1;i<s.size();i++) if(s[i]-last>=d){cnt++;last=s[i];if(cnt==k)return 1;}
    return 0;
}
int aggressiveCows(vector<int>& s, int k) {
    sort(s.begin(),s.end());
    int lo=1,hi=s.back()-s[0],ans=0;
    while(lo<=hi){int mid=lo+(hi-lo)/2;if(check(s,k,mid)){ans=mid;lo=mid+1;}else hi=mid-1;}
    return ans;
}`,python:`def aggressive_cows(stalls, k):
    stalls.sort()
    def check(d):
        cnt,last=1,stalls[0]
        for s in stalls[1:]:
            if s-last>=d: cnt+=1;last=s
            if cnt==k: return True
        return False
    lo,hi,ans=1,stalls[-1]-stalls[0],0
    while lo<=hi:
        mid=lo+(hi-lo)//2
        if check(mid):ans=mid;lo=mid+1
        else:hi=mid-1
    return ans`}}
      />

      <ProblemCard num={3} title="Minimize Maximum Distance to Gas Station" difficulty="LC Hard" tags={["LC 774","Real Domain"]}
        statement="Given K gas stations on a number line at positions <code>stations[i]</code> (sorted), add at most K new gas stations to minimize the maximum distance between any two adjacent gas stations."
        constraints={["1 ≤ n ≤ 500","0 ≤ stations[i] ≤ 10⁸","1 ≤ K ≤ 10⁶","Answer within 10⁻⁶"]}
        examples={[
          {input:"stations=[1,2,3,4,5,6,7,8,9,10], K=9",output:"0.500000"},
          {input:"stations=[23,24,36,39,46,56,57,65,84,98], K=1",output:"14.000000"},
        ]}
        approach="Binary search on real-valued answer D. check(D): for each gap g, need ceil(g/D)-1 extra stations. If total ≤ K → feasible. Real domain: use 100 iterations. Integer arithmetic: (gap + D - ε) / D - 1."
        code={{cpp:`double minmaxGasDist(vector<int>& s, int k) {
    auto check = [&](double d) {
        int needed = 0;
        for (int i = 1; i < s.size(); i++)
            needed += (int)((s[i]-s[i-1])/d);
        return needed <= k;
    };
    double lo = 0, hi = 1e8;
    for (int i = 0; i < 100; i++) {
        double mid = (lo+hi)/2;
        if (check(mid)) hi = mid; else lo = mid;
    }
    return (lo+hi)/2;
}`,python:`def min_max_gas_dist(stations, k):
    def check(d):
        return sum(int((stations[i]-stations[i-1])/d) for i in range(1,len(stations))) <= k
    lo, hi = 0, 1e8
    for _ in range(100):
        mid = (lo+hi)/2
        if check(mid): hi = mid
        else: lo = mid
    return (lo+hi)/2`}}
      />

      <ProblemCard num={4} title="Kth Smallest Element in a Sorted Matrix" difficulty="LC Medium" tags={["LC 378","Counting BS"]}
        statement="Given an N×N matrix where each row and column is sorted in non-decreasing order, return the <strong>K-th smallest</strong> element in the matrix."
        constraints={["1 ≤ N ≤ 300","−10⁹ ≤ matrix[i][j] ≤ 10⁹","Each row and column sorted","1 ≤ k ≤ N²"]}
        examples={[
          {input:"[[1,5,9],[10,11,13],[12,13,15]], k=8",output:"13"},
          {input:"[[-5]], k=1",output:"-5"},
        ]}
        approach="Binary search on value in [min, max]. count(x) = number of elements ≤ x, computed in O(n) by walking from bottom-left: if matrix[row][col] ≤ x, count all row+1 elements in this column and move right; otherwise move up. Find first x where count(x) ≥ k."
        code={{cpp:`int kthSmallest(vector<vector<int>>& m, int k) {
    int n=m.size(),lo=m[0][0],hi=m[n-1][n-1],ans=lo;
    auto cnt=[&](int x){
        int c=0,r=n-1,col=0;
        while(r>=0&&col<n){if(m[r][col]<=x){c+=r+1;col++;}else r--;}
        return c;};
    while(lo<=hi){int mid=lo+(hi-lo)/2;if(cnt(mid)>=k){ans=mid;hi=mid-1;}else lo=mid+1;}
    return ans;
}`,python:`def kth_smallest(matrix, k):
    n=len(matrix);lo,hi=matrix[0][0],matrix[-1][-1];ans=lo
    def cnt(x):
        c,r,col=0,n-1,0
        while r>=0 and col<n:
            if matrix[r][col]<=x: c+=r+1;col+=1
            else: r-=1
        return c
    while lo<=hi:
        mid=lo+(hi-lo)//2
        if cnt(mid)>=k:ans=mid;hi=mid-1
        else:lo=mid+1
    return ans`}}
      />

      <ProblemCard num={5} title="Split Array Largest Sum" difficulty="LC Hard" tags={["LC 410","BS on Answer"]}
        statement="Given an integer array <code>nums</code> and integer <code>k</code>, split nums into k non-empty subarrays to <strong>minimize</strong> the largest sum among the subarrays."
        constraints={["1 ≤ k ≤ n ≤ 1000","0 ≤ nums[i] ≤ 10⁶"]}
        examples={[
          {input:"nums=[7,2,5,10,8], k=2",output:"18",note:"Split: [7,2,5] and [10,8] → max is 18"},
          {input:"nums=[1,2,3,4,5], k=2",output:"9"},
        ]}
        approach="This is structurally identical to Painter Partition. Binary search on max_subarray_sum in [max, sum]. check(cap): greedily form subarrays, start a new one when next element would exceed cap. If subarrays ≤ k → feasible. Minimum feasible cap is the answer."
        code={{cpp:`int splitArray(vector<int>& nums, int k) {
    auto check=[&](long long cap){
        int parts=1;long long s=0;
        for(int x:nums){if(s+x>cap){parts++;s=x;}else s+=x;}
        return parts<=k;};
    long long lo=*max_element(nums.begin(),nums.end()),hi=accumulate(nums.begin(),nums.end(),0LL),ans=hi;
    while(lo<=hi){long long mid=lo+(hi-lo)/2;if(check(mid)){ans=mid;hi=mid-1;}else lo=mid+1;}
    return ans;
}`,python:`def split_array(nums, k):
    def check(cap):
        parts=s=0
        for x in nums:
            if s+x>cap: parts+=1;s=x
            else: s+=x
        return parts+1<=k
    lo,hi=max(nums),sum(nums);ans=hi
    while lo<=hi:
        mid=lo+(hi-lo)//2
        if check(mid):ans=mid;hi=mid-1
        else:lo=mid+1
    return ans`}}
      />

      <ProblemCard num={6} title="Magnetic Force Between Two Balls" difficulty="LC Medium" tags={["LC 1552","Maximize Minimum"]}
        statement="Given <code>position[]</code> of N baskets and M balls, place M balls into baskets to <strong>maximize the minimum magnetic force</strong> (minimum distance between any two balls)."
        constraints={["2 ≤ M ≤ N ≤ 10⁵","1 ≤ position[i] ≤ 10⁹"]}
        examples={[
          {input:"position=[1,2,3,4,7], m=3",output:"3",note:"Place at 1,4,7: min dist = 3"},
          {input:"position=[5,4,3,2,1,1000000000], m=2",output:"999999999"},
        ]}
        approach="Sort positions. Binary search on minimum force d in [1, (max-min)/(m-1)]. check(d): greedily place balls — next ball at first position ≥ d from last placed. If placed ≥ m balls → feasible. Maximize minimum (last-true): lo=mid+1 when feasible."
        code={{cpp:`int maxDistance(vector<int>& pos, int m) {
    sort(pos.begin(),pos.end());
    auto check=[&](int d){
        int cnt=1,last=pos[0];
        for(int i=1;i<pos.size();i++) if(pos[i]-last>=d){cnt++;last=pos[i];if(cnt==m)return 1;}
        return 0;};
    int lo=1,hi=pos.back()-pos[0],ans=0;
    while(lo<=hi){int mid=lo+(hi-lo)/2;if(check(mid)){ans=mid;lo=mid+1;}else hi=mid-1;}
    return ans;
}`,python:`def max_distance(position, m):
    position.sort()
    def check(d):
        cnt,last=1,position[0]
        for p in position[1:]:
            if p-last>=d: cnt+=1;last=p
            if cnt==m: return True
        return False
    lo,hi,ans=1,position[-1]-position[0],0
    while lo<=hi:
        mid=lo+(hi-lo)//2
        if check(mid):ans=mid;lo=mid+1
        else:hi=mid-1
    return ans`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "onanswer",  label: "BS on Answer" },
  { id: "minmax",    label: "Min-Max Patterns" },
  { id: "kth",       label: "Kth Element" },
  { id: "prefixbs",  label: "Prefix Sum + BS" },
  { id: "real",      label: "Real Domain & Problems" },
];

export default function BinarySearchApplications() {
  const [active, setActive] = useState("onanswer");
  const map = {
    onanswer: <SectionOnAnswer />,
    minmax:   <SectionMinMax />,
    kth:      <SectionKth />,
    prefixbs: <SectionPrefixBS />,
    real:     <SectionRealDomain />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 09</div>
        <h1 className="page-header-title">Binary Search — Applications</h1>
        <p className="page-header-subtitle">
          BS on Answer · Painter Partition · Min-Max / Max-Min · Kth Element via Counting · Prefix Sum + BS · Real Domain
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{ padding: "0.5rem 0 2rem" }}>{map[active]}</div>
      <NavButtons moduleId={9} />
    </div>
  );
}
