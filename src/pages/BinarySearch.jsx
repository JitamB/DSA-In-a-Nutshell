import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   STEP BUILDERS — run once at module load
══════════════════════════════════════════════════════ */
const BS_ARR = [1, 3, 5, 7, 9, 11, 13, 15];

function buildBSSteps(arr, target) {
  const steps = [];
  let lo = 0, hi = arr.length - 1;
  steps.push({ lo, hi, mid: -1, action: 'init',
    desc: `Search for target = ${target}.  lo=${lo}, hi=${hi}.` });
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) {
      steps.push({ lo, hi, mid, action: 'found',
        desc: `mid=${mid}: arr[${mid}]=${arr[mid]} = ${target}  ✓  Found at index ${mid}!` });
      return steps;
    } else if (arr[mid] < target) {
      steps.push({ lo, hi, mid, action: 'right',
        desc: `mid=${mid}: arr[${mid}]=${arr[mid]} < ${target}  →  discard left half. lo = ${mid+1}` });
      lo = mid + 1;
    } else {
      steps.push({ lo, hi, mid, action: 'left',
        desc: `mid=${mid}: arr[${mid}]=${arr[mid]} > ${target}  →  discard right half. hi = ${mid-1}` });
      hi = mid - 1;
    }
  }
  steps.push({ lo, hi, mid: -1, action: 'not-found',
    desc: `lo(${lo}) > hi(${hi}) — search space exhausted. ${target} not in array.` });
  return steps;
}

/* first occurrence of 1 in [0,0,0,1,1,1,1] */
const FO_ARR = [0, 0, 0, 1, 1, 1, 1];
function buildFirstOneSteps(arr) {
  const steps = [];
  let lo = 0, hi = arr.length - 1, ans = -1;
  steps.push({ lo, hi, mid: -1, ans, action: 'init',
    desc: `Find FIRST 1. check(mid) = arr[mid]==1. When true → record ans, keep searching LEFT for earlier occurrence.` });
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === 1) {
      ans = mid;
      steps.push({ lo, hi, mid, ans, action: 'true',
        desc: `mid=${mid}: arr[${mid}]=1  ✓ check true → candidate ans=${mid}. Search left for earlier: hi=${mid-1}` });
      hi = mid - 1;
    } else {
      steps.push({ lo, hi, mid, ans, action: 'false',
        desc: `mid=${mid}: arr[${mid}]=0  ✗ check false → go right: lo=${mid+1}` });
      lo = mid + 1;
    }
  }
  steps.push({ lo, hi, mid: -1, ans, action: 'done',
    desc: `Complete!  First 1 at index ${ans} (value: arr[${ans}] = ${arr[ans]}).` });
  return steps;
}

/* find min in rotated [4,5,6,7,0,1,2], check: arr[mid]<=arr[n-1] */
const ROT_ARR = [4, 5, 6, 7, 0, 1, 2];
function buildRotMinSteps(arr) {
  const steps = [];
  const n = arr.length;
  let lo = 0, hi = n - 1, ans = -1;
  steps.push({ lo, hi, mid: -1, ans, action: 'init',
    desc: `Find minimum in rotated array. check(mid) = arr[mid] ≤ arr[${n-1}]=${arr[n-1]} (is mid in the lower/right half?)` });
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] <= arr[n - 1]) {
      ans = mid;
      steps.push({ lo, hi, mid, ans, action: 'true',
        desc: `mid=${mid}: arr[${mid}]=${arr[mid]} ≤ arr[${n-1}]=${arr[n-1]}  ✓ → candidate ans=${mid}, search LEFT: hi=${mid-1}` });
      hi = mid - 1;
    } else {
      steps.push({ lo, hi, mid, ans, action: 'false',
        desc: `mid=${mid}: arr[${mid}]=${arr[mid]} > arr[${n-1}]=${arr[n-1]}  ✗ → in upper portion, go RIGHT: lo=${mid+1}` });
      lo = mid + 1;
    }
  }
  steps.push({ lo, hi, mid: -1, ans, action: 'done',
    desc: `Done!  Minimum element: arr[${ans}] = ${arr[ans]} at index ${ans}.` });
  return steps;
}

/* find peak in bitonic [1,3,8,12,4,2], check: arr[mid]>arr[mid-1] */
const BITO_ARR = [1, 3, 8, 12, 4, 2];
function buildBitonicSteps(arr) {
  const steps = [];
  let lo = 1, hi = arr.length - 1, peak = 0;
  steps.push({ lo, hi, mid: -1, peak, action: 'init',
    desc: `Find PEAK (maximum) in bitonic array. check(mid) = arr[mid]>arr[mid-1] (still ascending → peak is to the right or here)` });
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] > arr[mid - 1]) {
      peak = mid;
      steps.push({ lo, hi, mid, peak, action: 'true',
        desc: `mid=${mid}: arr[${mid}]=${arr[mid]} > arr[${mid-1}]=${arr[mid-1]}  ✓ ascending → peak=mid or further right. lo=${mid+1}` });
      lo = mid + 1;
    } else {
      steps.push({ lo, hi, mid, peak, action: 'false',
        desc: `mid=${mid}: arr[${mid}]=${arr[mid]} ≤ arr[${mid-1}]=${arr[mid-1]}  ✗ descending → peak is to the left. hi=${mid-1}` });
      hi = mid - 1;
    }
  }
  steps.push({ lo, hi, mid: -1, peak, action: 'done',
    desc: `Done!  Peak element: arr[${peak}]=${arr[peak]} at index ${peak}.` });
  return steps;
}

const BS_STEPS = {
  9:  buildBSSteps(BS_ARR, 9),
  1:  buildBSSteps(BS_ARR, 1),
  13: buildBSSteps(BS_ARR, 13),
  6:  buildBSSteps(BS_ARR, 6),
};
const FO_STEPS  = buildFirstOneSteps(FO_ARR);
const ROT_STEPS = buildRotMinSteps(ROT_ARR);
const BITO_STEPS = buildBitonicSteps(BITO_ARR);

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — BINARY SEARCH CORE VIZ
   Target picker, step through with lo/hi/mid pointers
══════════════════════════════════════════════════════ */
function BinarySearchViz() {
  const [target, setTarget] = useState(9);
  const [step, setStep]     = useState(0);
  const steps = BS_STEPS[target];
  const s = steps[Math.min(step, steps.length - 1)];

  const changeTarget = (t) => { setTarget(t); setStep(0); };
  const ACTION_CLR = { right: 'warning', left: 'warning', found: 'success', 'not-found': 'danger', init: null, true: 'success', false: 'danger' };

  return (
    <VizBox>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Target:</span>
        {[9, 1, 13, 6].map(t => (
          <button key={t} onClick={() => changeTarget(t)} style={{ padding: '4px 12px', border: '1px solid', borderColor: target === t ? 'var(--color-border-info)' : 'var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: target === t ? 'var(--color-background-info)' : 'transparent', color: target === t ? 'var(--color-text-info)' : 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12.5, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            {t}{t === 6 ? ' (not found)' : ''}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)' }}>
          {steps.length} steps total
        </div>
      </div>

      {/* Status bar */}
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
        {s.desc}
      </div>

      {/* Array cells */}
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 14 }}>
        {BS_ARR.map((v, i) => {
          const isMid = i === s.mid;
          const isLo  = i === s.lo && s.action !== 'found' && s.action !== 'not-found' && s.action !== 'done';
          const isHi  = i === s.hi && s.action !== 'found' && s.action !== 'not-found' && s.action !== 'done';
          const inRange = s.lo >= 0 && i >= s.lo && i <= s.hi && s.mid !== -1;
          const eliminated = s.action !== 'init' && !inRange && s.mid === -1 ? true : false;

          const color = isMid && s.action === 'found' ? 'success'
            : isMid && (s.action === 'right' || s.action === 'left') ? 'warning'
            : inRange && !isMid ? 'info'
            : null;

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
                color: isLo ? 'var(--color-text-success)' : isHi ? 'var(--color-text-danger)' : isMid ? 'var(--color-text-warning)' : 'transparent', minHeight: 12 }}>
                {isLo && isHi ? 'l=h' : isLo ? 'lo' : isHi ? 'hi' : isMid ? 'mid' : ''}
              </span>
              <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: color ? `var(--color-border-${color})` : 'var(--color-border-secondary)', background: color ? `var(--color-background-${color})` : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: color ? 700 : 400, color: color ? `var(--color-text-${color})` : 'var(--color-text-secondary)', opacity: eliminated ? 0.35 : 1, transition: 'all 0.18s' }}>
                {v}
              </div>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
      </div>

      {/* lo / hi / mid values */}
      {s.mid !== -1 && (
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 14, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          <span style={{ color: 'var(--color-text-success)' }}>lo={s.lo}</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>·</span>
          <span style={{ color: 'var(--color-text-warning)' }}>mid={s.mid}</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>·</span>
          <span style={{ color: 'var(--color-text-danger)' }}>hi={s.hi}</span>
          <span style={{ color: 'var(--color-text-tertiary)', marginLeft: 8 }}>range={s.hi - s.lo + 1}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['← Prev', () => setStep(Math.max(0,step-1)), step===0],
          ['Next →', () => setStep(Math.min(steps.length-1,step+1)), step===steps.length-1],
        ].map(([l,a,d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center' }}>{step+1}/{steps.length}</span>
        <button onClick={()=>setStep(0)} style={{ padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — FIRST OCCURRENCE / ROTATED / BITONIC
   Tab switcher inside one VizBox
══════════════════════════════════════════════════════ */
function CheckPatternViz() {
  const [mode, setMode] = useState('first');
  const [step, setStep] = useState(0);

  const configs = {
    first: { arr: FO_ARR, steps: FO_STEPS, label: 'First 1 in [0,0,0,1,1,1,1]', pivotLabel: null },
    rot:   { arr: ROT_ARR, steps: ROT_STEPS, label: 'Min in Rotated [4,5,6,7,0,1,2]', pivotLabel: 'min' },
    bito:  { arr: BITO_ARR, steps: BITO_STEPS, label: 'Peak in Bitonic [1,3,8,12,4,2]', pivotLabel: 'peak' },
  };
  const cfg = configs[mode];
  const s = cfg.steps[Math.min(step, cfg.steps.length - 1)];

  const setModeReset = (m) => { setMode(m); setStep(0); };

  const cellColor = (i) => {
    if (s.action === 'done' && (s.ans === i || s.peak === i)) return 'success';
    if (i === s.mid && s.action === 'true')  return 'success';
    if (i === s.mid && s.action === 'false') return 'danger';
    if (i === s.mid && s.action === 'init')  return null;
    if (s.mid >= 0 && i >= (s.lo??0) && i <= (s.hi??cfg.arr.length-1)) return 'info';
    return null;
  };

  const specialIdx = s.ans ?? s.peak ?? -1;

  return (
    <VizBox>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {[['first','First Occurrence'],['rot','Rotated Min'],['bito','Bitonic Peak']].map(([m,l]) => (
          <button key={m} onClick={() => setModeReset(m)} style={{ padding:'4px 10px',border:'1px solid',borderColor:mode===m?'var(--color-border-info)':'var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:mode===m?'var(--color-background-info)':'transparent',color:mode===m?'var(--color-text-info)':'var(--color-text-secondary)',cursor:'pointer',fontSize:12,fontFamily:'var(--font-sans)' }}>{l}</button>
        ))}
      </div>

      <div style={{ marginBottom: 12, padding:'6px 10px',background:'var(--color-background-secondary)',borderRadius:'var(--border-radius-md)',fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55 }}>
        {s.desc}
      </div>

      {/* Array */}
      <div style={{ display:'flex',gap:4,justifyContent:'center',marginBottom:12 }}>
        {cfg.arr.map((v, i) => {
          const c = cellColor(i);
          const isSpec = i === specialIdx && s.action === 'done';
          return (
            <div key={i} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:3 }}>
              <span style={{ fontSize:9,fontFamily:'var(--font-mono)',color:i===s.mid&&s.action!=='done'?'var(--color-text-warning)':'transparent',minHeight:12,fontWeight:700 }}>
                {i===s.mid&&s.action!=='done'?'mid':''}
              </span>
              <div style={{ width:38,height:38,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:6,border:'1px solid',borderColor:isSpec?'var(--color-border-success)':c?`var(--color-border-${c})`:'var(--color-border-secondary)',background:isSpec?'var(--color-background-success)':c?`var(--color-background-${c})`:'var(--color-background-secondary)',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:(c||isSpec)?700:400,color:isSpec?'var(--color-text-success)':c?`var(--color-text-${c})`:'var(--color-text-secondary)',transition:'all 0.18s' }}>
                {v}
              </div>
              <span style={{ fontSize:9,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
      </div>

      {/* Answer badge */}
      {s.action === 'done' && specialIdx >= 0 && (
        <div style={{ textAlign:'center',marginBottom:12,fontFamily:'var(--font-mono)',fontSize:12 }}>
          <span style={{ padding:'3px 12px',background:'var(--color-background-success)',border:'1px solid var(--color-border-success)',borderRadius:20,color:'var(--color-text-success)',fontWeight:700 }}>
            ans = index {specialIdx}  (value: {cfg.arr[specialIdx]})
          </span>
        </div>
      )}

      <div style={{ display:'flex',gap:8,justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(cfg.steps.length-1,step+1)),step===cfg.steps.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{cfg.steps.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   PROBLEM CARD
══════════════════════════════════════════════════════ */
const DIFF_CLR = {'IIT OA':'info','OA Easy':'success','OA Medium':'warning','OA Hard':'danger','LC Medium':'info','LC Hard':'purple'};
function ProblemCard({num,title,difficulty,tags=[],statement,constraints=[],examples=[],approach,code}) {
  const [open,setOpen]=useState(false);const dc=DIFF_CLR[difficulty]||'info';
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
   SECTION 1 — FUNDAMENTALS & UNIVERSAL TEMPLATE
══════════════════════════════════════════════════════ */
function SectionFundamentals() {
  return (
    <div>
      <Note color="info" icon="ti-zoom-in">
        <strong>Core idea:</strong> Binary search works on any <em>monotonic predicate</em> — a condition that is all-false for some prefix and all-true for the rest (or vice versa). Each step eliminates exactly <em>half</em> the remaining search space, giving O(log n) total steps regardless of input size.
      </Note>

      <H2>The Monotonic Predicate — Why Binary Search Works</H2>
      <P>The key insight is not "sorted array" — it's <strong>monotonicity</strong>. If a predicate <Mx>f(x)</Mx> satisfies <Mx>f(false, false, …, false, true, true, …, true)</Mx>, binary search finds the boundary in O(log n). Any "is <Mx>x</Mx> enough?" question on a sorted or structured domain fits this pattern.</P>
      <Grid cols={2}>
        <Card title="Search Space Monotonicity" color="info">
          Before the answer: <Mx>f(x) = false</Mx> (condition not satisfied). After and at the answer: <Mx>f(x) = true</Mx>. Binary search finds the exact transition point.
        </Card>
        <Card title="The check() Abstraction" color="success">
          Encode the condition as a <code>check(mid)</code> function. The outer loop never changes — only <code>check()</code> changes per problem. This is the most powerful pattern in competitive programming.
        </Card>
      </Grid>

      <H2>Interactive — Core Binary Search</H2>
      <P>Step through binary search on array <Mx>[1,3,5,7,9,11,13,15]</Mx>. Each step the search space halves. Eliminated elements fade. Try all four targets including a not-found case.</P>
      <BinarySearchViz />

      <H2>The Universal Template</H2>
      <P>This single template handles all binary search variants — only the <code>check()</code> function and the direction of narrowing change.</P>
      <Code>{{cpp: `// Universal Binary Search Template
// Search for the FIRST index where check(mid) == true
// Precondition: check is monotone [false, false, ..., true, true, ...]
int lo = 0, hi = n - 1, ans = -1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;   // avoids overflow vs (lo+hi)/2
    if (check(mid)) {
        ans = mid;       // candidate answer — might find a better (smaller) one
        hi  = mid - 1;   // search LEFT for first occurrence
    } else {
        lo  = mid + 1;   // go RIGHT — this mid doesn't satisfy the condition
    }
}
// ans = leftmost index where check is true, or -1 if never true

// Variant: LAST index where check(mid) == true
// (or equivalently: maximize the answer)
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid)) { ans = mid; lo = mid + 1; }  // go RIGHT
    else            { hi  = mid - 1; }
}`, python: `# Universal template — find FIRST index where check(mid) is True
def binary_search(lo, hi, check):
    ans = -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if check(mid):
            ans = mid
            hi  = mid - 1   # search left for earlier true
        else:
            lo  = mid + 1   # go right
    return ans

# Variant: find LAST / maximize
def binary_search_last(lo, hi, check):
    ans = -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if check(mid): ans = mid; lo = mid + 1
        else: hi = mid - 1
    return ans`}}</Code>

      <Note color="warning" icon="ti-alert-triangle">
        <strong>Mid overflow:</strong> <code>mid = lo + (hi - lo) / 2</code> not <code>(lo + hi) / 2</code>. For large values (e.g., lo = 2×10⁹, hi = 3×10⁹), the sum overflows 32-bit int. The subtraction form is always safe.
      </Note>

      <H2>STL / Standard Library — lower_bound and upper_bound</H2>
      <Code>{{cpp: `// lower_bound: first position where arr[i] >= target  (first NOT less than)
// upper_bound: first position where arr[i] >  target  (first greater than)
#include <algorithm>
vector<int> v = {1, 3, 5, 5, 5, 7, 9};

auto it1 = lower_bound(v.begin(), v.end(), 5);   // points to index 2 (first 5)
auto it2 = upper_bound(v.begin(), v.end(), 5);   // points to index 5 (first after 5)

int idx1 = it1 - v.begin();   // = 2
int idx2 = it2 - v.begin();   // = 5
int count = idx2 - idx1;      // = 3  (number of 5s)

// Check if target exists:
if (lower_bound(v.begin(), v.end(), 5) != v.end() && *it1 == 5)
    cout << "Found";`, python: `import bisect
v = [1, 3, 5, 5, 5, 7, 9]

# bisect_left  = lower_bound: leftmost position to insert target
# bisect_right = upper_bound: rightmost position to insert target
left  = bisect.bisect_left(v, 5)   # = 2 (first 5)
right = bisect.bisect_right(v, 5)  # = 5 (after last 5)
count = right - left                # = 3

# Check existence:
if left < len(v) and v[left] == 5: print("Found")`}}</Code>

      <QA q="Why does the template use lo <= hi (not lo < hi) as the termination condition?" a="With <code>lo &lt;= hi</code>, the search terminates when the window is empty (lo > hi), meaning every position has been considered exactly once as a mid-point candidate. If we used <code>lo &lt; hi</code>, we'd exit when lo == hi without checking that last element — potentially missing the answer. The <code>lo &lt;= hi</code> formulation is safer and more universal." />
      <QA q="How is binary search O(log n) — why exactly half each time?" a="At each step, mid divides the search space [lo, hi] into three parts: left [lo..mid-1], mid, right [mid+1..hi]. We discard either left (lo = mid+1) or right (hi = mid-1). Each discard removes ⌊(hi-lo)/2⌋ elements, so the window size halves at every step. Starting with n elements, after k steps we have n/2ᵏ elements. When n/2ᵏ = 1, k = log₂n. Total work: O(log n)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — FIRST/LAST OCCURRENCE & CHECK PATTERN
══════════════════════════════════════════════════════ */
function SectionOccurrence() {
  return (
    <div>
      <Note color="success" icon="ti-bulb">
        <strong>The check() paradigm:</strong> Every binary search variant can be written as: define a monotonic <code>check(mid)</code> function, then run the universal template. The inner loop never changes. Only <code>check()</code> changes. This unifies: first occurrence, lower bound, rotated array minimum, painter partition, and all "binary search on answer" problems.
      </Note>

      <H2>First Occurrence of 1 in a 0/1 Array</H2>
      <P>From the code given: <code>check(mid) = arr[mid] == 1</code>. When true, record as candidate answer and search LEFT (earlier index might also be 1). When false (arr[mid]=0), search RIGHT. The leftmost <em>true</em> is the answer.</P>
      <CheckPatternViz />
      <Code>{{cpp: `// First occurrence of 1 in sorted 0/1 array
// Generalizes to: first index satisfying any monotone condition
int firstOne(int arr[], int n) {
    int lo = 0, hi = n - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == 1) {        // check(mid) = arr[mid] == 1
            ans = mid;              // candidate — keep searching left
            hi  = mid - 1;
        } else {
            lo  = mid + 1;
        }
    }
    return ans;
}`, python: `def first_one(arr):
    lo, hi, ans = 0, len(arr) - 1, -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == 1:
            ans = mid
            hi  = mid - 1
        else:
            lo  = mid + 1
    return ans`}}</Code>

      <H2>First and Last Occurrence of a Target</H2>
      <Code>{{cpp: `// First occurrence: first index where arr[i] >= target AND arr[i] == target
// Last occurrence: last index where arr[i] == target
pair<int,int> firstAndLast(vector<int>& arr, int target) {
    // First occurrence: leftmost mid where arr[mid] == target
    int lo = 0, hi = arr.size() - 1, first = -1, last = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) { first = mid; hi = mid - 1; }  // go left
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    // Last occurrence: rightmost mid where arr[mid] == target
    lo = 0; hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) { last = mid; lo = mid + 1; }   // go right
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return {first, last};
}
// [1,2,2,2,3,4] target=2 → {1, 3}`, python: `def first_and_last(arr, target):
    def first():
        lo, hi, ans = 0, len(arr)-1, -1
        while lo <= hi:
            mid = lo + (hi-lo)//2
            if arr[mid] == target: ans = mid; hi = mid - 1
            elif arr[mid] < target: lo = mid + 1
            else: hi = mid - 1
        return ans
    def last():
        lo, hi, ans = 0, len(arr)-1, -1
        while lo <= hi:
            mid = lo + (hi-lo)//2
            if arr[mid] == target: ans = mid; lo = mid + 1
            elif arr[mid] < target: lo = mid + 1
            else: hi = mid - 1
        return ans
    return first(), last()`}}</Code>

      <H2>Check Function Gallery</H2>
      <Table
        heads={["Problem", "check(mid) =", "Monotone structure", "Template direction"]}
        rows={[
          ["First occurrence of target",      "arr[mid] == target",             "[F,F,T,T,T]",       "First true → hi=mid-1"],
          ["Minimum in rotated array",         "arr[mid] ≤ arr[n-1]",           "[F,F,T,T,T]",       "First true → hi=mid-1"],
          ["Search in rotated array",          "arr[mid] ≥ target",             "[F,F,T,T,T]",       "First true + verify"],
          ["Peak in bitonic",                  "arr[mid] > arr[mid-1]",         "[T,T,T,F,F]",       "Last true → lo=mid+1"],
          ["Painter partition (mod 09)",       "feasible(mid, k painters)",     "[F,F,T,T,T]",       "First true → hi=mid-1"],
          ["Koko eating bananas (mod 08)",     "canEat(mid speed, h hours)",    "[F,F,T,T,T]",       "First true → hi=mid-1"],
        ]}
      />

      <QA q="What is the difference between lower_bound and first occurrence search?" a="<code>lower_bound</code> finds the first index where <code>arr[i] &gt;= target</code> — it doesn't require target to exist. First occurrence search additionally checks that <code>arr[ans] == target</code> — if the target isn't in the array, lower_bound returns the insertion position while first occurrence returns -1. First occurrence: <code>check(mid) = (arr[mid] == target)</code>. Lower bound: <code>check(mid) = (arr[mid] &gt;= target)</code>." />
      <QA q="Can binary search find multiple occurrences efficiently?" a="Yes. Use <code>lower_bound</code> to find the first occurrence and <code>upper_bound</code> to find one past the last. Their difference is the count. Time: O(log n) per bound lookup. For all indices, binary search gives you the range [first, last] in O(log n) — you can then iterate the range in O(count). This is faster than O(n) linear scan when count ≪ n." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — ROTATED ARRAYS
══════════════════════════════════════════════════════ */
function SectionRotated() {
  return (
    <div>
      <H2>What Is a Rotated Sorted Array?</H2>
      <P>A sorted array <Mx>[0,1,2,4,5,6,7]</Mx> rotated by k positions becomes <Mx>[4,5,6,7,0,1,2]</Mx>. The key property: the array consists of <strong>two sorted subarrays</strong>. The transition point (minimum element) divides them. All elements in the right half are ≤ the last element; all in the left half are &gt; the last element.</P>
      <Grid cols={2}>
        <Card title="Which half is sorted?" color="info">
          Compare arr[mid] with arr[hi]. If <code>arr[mid] &lt;= arr[hi]</code>, the right half [mid..hi] is sorted. Otherwise the left half [lo..mid] is sorted.
        </Card>
        <Card title="Why compare to arr[n-1]?" color="success">
          arr[n-1] is always in the "lower" portion of the rotated array (the part with small values). <code>arr[mid] &lt;= arr[n-1]</code> tells us whether mid is in this lower portion — i.e., past the rotation point.
        </Card>
      </Grid>

      <H2>LC 153 — Find Minimum in Rotated Sorted Array</H2>
      <P>check(mid) = <code>arr[mid] &lt;= arr[n-1]</code>. True means mid is in the lower (right) portion — minimum is at mid or to the left. False means mid is in the upper (left) portion — minimum is strictly to the right.</P>
      <Code>{{cpp: `int findMin(vector<int>& arr) {
    int lo = 0, hi = arr.size() - 1, ans = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] <= arr[arr.size() - 1]) {  // check: in lower portion
            ans = mid;
            hi  = mid - 1;   // search left for earlier transition
        } else {
            lo  = mid + 1;   // in upper portion, minimum is to the right
        }
    }
    return arr[ans];
}
// [4,5,6,7,0,1,2] → 0 at index 4`, python: `def find_min(arr):
    lo, hi, ans = 0, len(arr) - 1, 0
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] <= arr[-1]:   # in lower portion
            ans = mid; hi = mid - 1
        else:
            lo = mid + 1
    return arr[ans]`}}</Code>

      <H2>LC 33 — Search in Rotated Sorted Array</H2>
      <P>Two-phase approach: first find which half is sorted (compare arr[mid] with arr[lo] or arr[hi]). Then check if target falls within the sorted half — if yes, discard the other half; otherwise discard the sorted half.</P>
      <Code>{{cpp: `int search(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;

        // Which half is sorted?
        if (arr[lo] <= arr[mid]) {                          // LEFT half is sorted
            if (arr[lo] <= target && target < arr[mid])
                hi = mid - 1;   // target in left sorted half
            else
                lo = mid + 1;   // target in right (rotated) half
        } else {                                            // RIGHT half is sorted
            if (arr[mid] < target && target <= arr[hi])
                lo = mid + 1;   // target in right sorted half
            else
                hi = mid - 1;   // target in left (rotated) half
        }
    }
    return -1;
}
// [4,5,6,7,0,1,2], target=0 → 4`, python: `def search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target: return mid
        if arr[lo] <= arr[mid]:          # left half sorted
            if arr[lo] <= target < arr[mid]: hi = mid - 1
            else: lo = mid + 1
        else:                            # right half sorted
            if arr[mid] < target <= arr[hi]: lo = mid + 1
            else: hi = mid - 1
    return -1`}}</Code>

      <QA q="Why use arr[lo] <= arr[mid] to determine which half is sorted, not arr[mid] <= arr[hi]?" a="Both work, but the condition must handle the case where lo == mid (single element — always 'sorted'). With <code>arr[lo] &lt;= arr[mid]</code>: if lo == mid, this is trivially true (same element), correctly treating the left half as sorted. The right condition <code>arr[mid] &lt;= arr[hi]</code> also works but the target-in-range checks must be adjusted accordingly. Consistency with whichever condition you choose matters most — don't mix them." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — BITONIC ARRAYS
══════════════════════════════════════════════════════ */
function SectionBitonic() {
  return (
    <div>
      <Note color="info" icon="ti-trending-up">
        A <strong>bitonic array</strong> increases to a peak then decreases. It can be searched in O(log n) by first finding the peak, then running two independent binary searches on each monotone half.
      </Note>

      <H2>Finding the Peak — check(mid) = arr[mid] &gt; arr[mid-1]</H2>
      <P>The peak is in the ascending portion: <code>check(mid) = arr[mid] &gt; arr[mid-1]</code>. True means we're still ascending — peak is at mid or further right (last true). False means we've started descending — peak is to the left. Search for the <em>last true</em>.</P>
      <Code>{{cpp: `int findPeak(vector<int>& arr) {
    int n = arr.size();
    if (n == 1) return 0;
    if (arr[0] > arr[1]) return 0;
    if (arr[n-1] > arr[n-2]) return n - 1;

    int lo = 1, hi = n - 2, peak = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] > arr[mid - 1]) {  // ascending → peak is here or right
            peak = mid;
            lo   = mid + 1;             // search RIGHT for last-true (maximize)
        } else {
            hi   = mid - 1;             // descending → peak is left
        }
    }
    return peak;
}`, python: `def find_peak(arr):
    n = len(arr)
    if n == 1 or arr[0] > arr[1]: return 0
    if arr[-1] > arr[-2]: return n - 1
    lo, hi, peak = 1, n - 2, 0
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] > arr[mid - 1]:
            peak = mid; lo = mid + 1   # search right (last true)
        else:
            hi = mid - 1
    return peak`}}</Code>

      <H2>Bitonic Search — Full Solution (Given Code)</H2>
      <P>After finding the peak, the left half [0..peak] is sorted ascending (run standard BS), and the right half [peak..n-1] is sorted descending (run BS with reversed comparisons).</P>
      <Code>{{cpp: `// Bitonic array: find all positions of K
// [1..n-1] 1-indexed positions as per problem statement
vector<int> bitonicSearch(vector<int>& arr, int k) {
    int n = arr.size();

    // Step 1: find peak
    int lo = 1, hi = n - 1, peak = 0;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] > arr[mid - 1]) { peak = mid; lo = mid + 1; }
        else { hi = mid - 1; }
    }

    // Step 2: search ascending half [0..peak]
    vector<int> res;
    lo = 0; hi = peak;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == k)         { res.push_back(mid + 1); break; }
        else if (arr[mid] < k)     { lo = mid + 1; }
        else                       { hi = mid - 1; }
    }

    // Step 3: search descending half [peak..n-1]
    lo = peak; hi = n - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == k)         { res.push_back(mid + 1); break; }
        else if (arr[mid] > k)     { lo = mid + 1; }  // descending: go right for smaller
        else                       { hi = mid - 1; }  // descending: go left for larger
    }
    return res;
}`, python: `def bitonic_search(arr, k):
    n = len(arr)
    lo, hi, peak = 1, n-1, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] > arr[mid-1]: peak = mid; lo = mid + 1
        else: hi = mid - 1

    res = []
    lo, hi = 0, peak
    while lo <= hi:
        mid = (lo+hi)//2
        if arr[mid]==k: res.append(mid+1); break
        elif arr[mid]<k: lo=mid+1
        else: hi=mid-1

    lo, hi = peak, n-1
    while lo <= hi:
        mid=(lo+hi)//2
        if arr[mid]==k: res.append(mid+1); break
        elif arr[mid]>k: lo=mid+1   # descending: larger values to the left
        else: hi=mid-1
    return res`}}</Code>

      <QA q="Why does the descending half binary search flip its comparisons?" a="In a descending array, larger values appear at smaller indices. So <code>arr[mid] &gt; k</code> means target is SMALLER than mid's value — we must go RIGHT (lo = mid+1) to find smaller values. This is the opposite of an ascending search. Alternatively: reverse the array mentally (or physically) and use standard ascending binary search — the logic is identical." />
      <QA q="What is LC 162 (Find Peak Element) and how does it relate to bitonic search?" a="LC 162 guarantees any peak (arr[i] > arr[i±1]) is valid — the array isn't necessarily globally bitonic. The same check(mid) = arr[mid] &gt; arr[mid+1] works: if true, there's a peak at mid or to its left; if false, there's a peak to its right. This is the 'last true' pattern. Multiple peaks may exist in LC 162, but any one of them is a valid answer." />
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
        6 high-frequency binary search problems — all with the unified check() template. Problems 5–6 are "binary search on answer" (covered fully in Module 09 but listed here per the problem set).
      </Note>

      <ProblemCard num={1} title="Binary Search" difficulty="OA Easy" tags={["LC 704","Template"]}
        statement="Given a sorted array of distinct integers <code>nums</code> and a target value, return the index of <code>target</code> if found, or <code>-1</code> if not present. O(log n) required."
        constraints={["1 ≤ n ≤ 10⁴","-10⁴ ≤ nums[i] ≤ 10⁴","nums sorted ascending","All elements distinct"]}
        examples={[
          {input:"nums=[-1,0,3,5,9,12], target=9",output:"4"},
          {input:"nums=[-1,0,3,5,9,12], target=2",output:"-1"},
        ]}
        approach="Direct application of the universal template. check(mid) = nums[mid] == target. Since we're looking for an exact match, we also check left/right to eliminate halves when no match. The template naturally handles not-found by returning -1."
        code={{cpp:`int search(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if      (nums[mid] == target) return mid;
        else if (nums[mid] <  target) lo = mid + 1;
        else                          hi = mid - 1;
    }
    return -1;
}`,python:`def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if   nums[mid] == target: return mid
        elif nums[mid] <  target: lo = mid + 1
        else:                     hi = mid - 1
    return -1`}}
      />

      <ProblemCard num={2} title="Find Minimum in Rotated Sorted Array" difficulty="LC Medium" tags={["LC 153","Rotated Array"]}
        statement="Given a sorted array of distinct integers rotated at some pivot, find the minimum element. O(log n) required."
        constraints={["1 ≤ n ≤ 5000","−5000 ≤ nums[i] ≤ 5000","All values distinct","Originally sorted, rotated 1..n times"]}
        examples={[
          {input:"[3,4,5,1,2]",output:"1",note:"Rotated at pivot 3 → minimum is 1"},
          {input:"[4,5,6,7,0,1,2]",output:"0"},
        ]}
        approach="check(mid) = arr[mid] ≤ arr[n-1]. True means mid is in the lower (right) sorted portion — minimum is at mid or left. False means mid is in the upper (left) portion — minimum is strictly right. Search for first-true. This is exactly the code from the module."
        code={{cpp:`int findMin(vector<int>& arr) {
    int lo = 0, hi = arr.size() - 1, ans = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] <= arr.back()) { ans = mid; hi = mid - 1; }
        else                        { lo  = mid + 1; }
    }
    return arr[ans];
}`,python:`def find_min(arr):
    lo, hi, ans = 0, len(arr)-1, 0
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if arr[mid] <= arr[-1]: ans=mid; hi=mid-1
        else: lo=mid+1
    return arr[ans]`}}
      />

      <ProblemCard num={3} title="Search in Rotated Sorted Array" difficulty="LC Medium" tags={["LC 33","Rotated Array"]}
        statement="Given a rotated sorted array of distinct integers and a target, return the index of target or <code>-1</code>. O(log n) required."
        constraints={["1 ≤ n ≤ 5000","All values distinct","-10⁴ ≤ nums[i] ≤ 10⁴"]}
        examples={[
          {input:"[4,5,6,7,0,1,2], target=0",output:"4"},
          {input:"[4,5,6,7,0,1,2], target=3",output:"-1"},
        ]}
        approach="Determine which half is sorted by comparing arr[lo] with arr[mid]. Then check if target lies within the sorted half — if yes, binary search there; otherwise search the other half. Always one half is guaranteed to be sorted in a once-rotated array."
        code={{cpp:`int search(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[lo] <= arr[mid]) {    // left half sorted
            if (arr[lo] <= target && target < arr[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {                      // right half sorted
            if (arr[mid] < target && target <= arr[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}`,python:`def search(arr, target):
    lo, hi = 0, len(arr)-1
    while lo <= hi:
        mid = lo+(hi-lo)//2
        if arr[mid]==target: return mid
        if arr[lo]<=arr[mid]:
            if arr[lo]<=target<arr[mid]: hi=mid-1
            else: lo=mid+1
        else:
            if arr[mid]<target<=arr[hi]: lo=mid+1
            else: hi=mid-1
    return -1`}}
      />

      <ProblemCard num={4} title="Find First and Last Position of Element" difficulty="LC Medium" tags={["LC 34","Two Binary Searches"]}
        statement="Given a sorted array <code>nums</code> and a target value, find the starting and ending position of target. Return <code>[-1,-1]</code> if not present."
        constraints={["0 ≤ n ≤ 10⁵","-10⁹ ≤ nums[i] ≤ 10⁹","O(log n) required"]}
        examples={[
          {input:"[5,7,7,8,8,10], target=8",output:"[3,4]"},
          {input:"[5,7,7,8,8,10], target=6",output:"[-1,-1]"},
        ]}
        approach="Run two binary searches: (1) find first occurrence — when match, go left; (2) find last occurrence — when match, go right. Both run in O(log n). This is two independent applications of the first/last template."
        code={{cpp:`vector<int> searchRange(vector<int>& nums, int target) {
    auto first = [&]() {
        int lo=0,hi=(int)nums.size()-1,ans=-1;
        while(lo<=hi){ int mid=lo+(hi-lo)/2;
          if(nums[mid]==target){ans=mid;hi=mid-1;}
          else if(nums[mid]<target)lo=mid+1; else hi=mid-1;}
        return ans;};
    auto last = [&]() {
        int lo=0,hi=(int)nums.size()-1,ans=-1;
        while(lo<=hi){ int mid=lo+(hi-lo)/2;
          if(nums[mid]==target){ans=mid;lo=mid+1;}
          else if(nums[mid]<target)lo=mid+1; else hi=mid-1;}
        return ans;};
    return {first(), last()};
}`,python:`def search_range(nums, target):
    def first():
        lo,hi,ans=0,len(nums)-1,-1
        while lo<=hi:
            mid=lo+(hi-lo)//2
            if nums[mid]==target: ans=mid;hi=mid-1
            elif nums[mid]<target: lo=mid+1
            else: hi=mid-1
        return ans
    def last():
        lo,hi,ans=0,len(nums)-1,-1
        while lo<=hi:
            mid=lo+(hi-lo)//2
            if nums[mid]==target: ans=mid;lo=mid+1
            elif nums[mid]<target: lo=mid+1
            else: hi=mid-1
        return ans
    return [first(), last()]`}}
      />

      <ProblemCard num={5} title="Koko Eating Bananas" difficulty="LC Medium" tags={["LC 875","BS on Answer"]}
        statement="Koko has <code>n</code> piles of bananas. She has <code>h</code> hours to eat all bananas. Each hour she eats at most <code>k</code> bananas from one pile. Find the minimum integer <code>k</code> such that she can finish all bananas within <code>h</code> hours."
        constraints={["1 ≤ n ≤ 10⁴","n ≤ h ≤ 10⁹","1 ≤ piles[i] ≤ 10⁹"]}
        examples={[
          {input:"piles=[3,6,7,11], h=8",output:"4",note:"Speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4)=1+2+2+3=8 ≤ 8 ✓"},
          {input:"piles=[30,11,23,4,20], h=5",output:"30"},
        ]}
        approach="Binary search on answer k in [1, max(piles)]. check(k): can Koko eat all piles at speed k within h hours? Hours needed = sum(ceil(pile/k)) for each pile. If ≤ h, feasible → search left (smaller k). Else infeasible → search right. First-true pattern: find minimum k where check is true."
        code={{cpp:`int minEatingSpeed(vector<int>& piles, int h) {
    auto check = [&](long long k) {
        long long hours = 0;
        for (int p : piles) hours += (p + k - 1) / k;  // ceil(p/k)
        return hours <= h;
    };
    int lo = 1, hi = *max_element(piles.begin(), piles.end()), ans = hi;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(mid)) { ans = mid; hi = mid - 1; }
        else            { lo  = mid + 1; }
    }
    return ans;
}`,python:`import math
def min_eating_speed(piles, h):
    def check(k):
        return sum(math.ceil(p/k) for p in piles) <= h
    lo, hi, ans = 1, max(piles), max(piles)
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if check(mid): ans=mid; hi=mid-1
        else: lo=mid+1
    return ans`}}
      />

      <ProblemCard num={6} title="Capacity to Ship Packages Within D Days" difficulty="LC Hard" tags={["LC 1011","BS on Answer"]}
        statement="A conveyor belt has packages with weights <code>weights[i]</code>. Each day the ship carries packages in order (not rearranged). Find the minimum ship weight capacity to ship all packages within <code>d</code> days."
        constraints={["1 ≤ d ≤ n ≤ 5×10⁴","1 ≤ weights[i] ≤ 500"]}
        examples={[
          {input:"weights=[1,2,3,4,5,6,7,8,9,10], d=5",output:"15"},
          {input:"weights=[3,2,2,4,1,4], d=3",output:"6"},
        ]}
        approach="Binary search on capacity in [max(weights), sum(weights)]. check(cap): simulate loading packages greedily. Start a new day when adding a package exceeds cap. If days ≤ d → feasible. First-true pattern. This is structurally identical to the Painter Partition problem (Module 09)."
        code={{cpp:`int shipWithinDays(vector<int>& weights, int d) {
    auto check = [&](int cap) {
        int days = 1, load = 0;
        for (int w : weights) {
            if (load + w > cap) { days++; load = 0; }
            load += w;
        }
        return days <= d;
    };
    int lo = *max_element(weights.begin(), weights.end());
    int hi = accumulate(weights.begin(), weights.end(), 0);
    int ans = hi;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(mid)) { ans = mid; hi = mid - 1; }
        else            { lo  = mid + 1; }
    }
    return ans;
}`,python:`def ship_within_days(weights, d):
    def check(cap):
        days = load = 0
        for w in weights:
            if load + w > cap: days += 1; load = 0
            load += w
        return days + 1 <= d
    lo, hi = max(weights), sum(weights)
    ans = hi
    while lo <= hi:
        mid = lo+(hi-lo)//2
        if check(mid): ans=mid; hi=mid-1
        else: lo=mid+1
    return ans`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "fundamentals", label: "Core Template" },
  { id: "occurrence",   label: "First/Last Occurrence" },
  { id: "rotated",      label: "Rotated Arrays" },
  { id: "bitonic",      label: "Bitonic Arrays" },
  { id: "problems",     label: "Problems" },
];

export default function BinarySearch() {
  const [active, setActive] = useState("fundamentals");
  const map = {
    fundamentals: <SectionFundamentals />,
    occurrence:   <SectionOccurrence />,
    rotated:      <SectionRotated />,
    bitonic:      <SectionBitonic />,
    problems:     <SectionProblems />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 08</div>
        <h1 className="page-header-title">Binary Search</h1>
        <p className="page-header-subtitle">
          Universal Template · check() Pattern · First/Last Occurrence · Rotated Arrays · Bitonic Arrays · LC 33, 153, 875, 1011
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{ padding: "0.5rem 0 2rem" }}>{map[active]}</div>
      <NavButtons moduleId={8} />
    </div>
  );
}
