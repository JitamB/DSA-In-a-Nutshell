import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   STEP BUILDERS
══════════════════════════════════════════════════════ */

/* Activity Selection — sort by end time, pick non-overlapping */
const AS_ACTS = [
  {l:'A',s:1,e:4},{l:'B',s:3,e:5},{l:'C',s:0,e:6},
  {l:'D',s:5,e:7},{l:'E',s:3,e:9},{l:'F',s:5,e:9},
  {l:'G',s:6,e:10},{l:'H',s:8,e:11},
];
const AS_MAX_T = 12;
const AS_COLORS = ['#81B4EA','#4EC9B0','#CE9178','#C586C0','#DCDCAA','#F44747','#9CDCFE','#6A9955'];

function buildASSteps(acts) {
  const steps = [];
  const selected = [];
  let lastEnd = -Infinity;
  steps.push({ selected: [], lastEnd: -Infinity, cur: -1, action: 'init',
    desc: 'Activities sorted by FINISH TIME. Greedy rule: always pick the activity with the earliest finish time that doesn\'t conflict.' });
  for (let i = 0; i < acts.length; i++) {
    const a = acts[i], prevEnd = lastEnd;
    if (a.s >= lastEnd) {
      selected.push(i); lastEnd = a.e;
      steps.push({ selected: [...selected], lastEnd, cur: i, action: 'select',
        desc: `${a.l} [${a.s}–${a.e}]: start(${a.s}) ≥ lastEnd(${prevEnd === -Infinity ? '–∞' : prevEnd})  ✓  →  SELECT.  New lastEnd = ${a.e}` });
    } else {
      steps.push({ selected: [...selected], lastEnd, cur: i, action: 'skip',
        desc: `${a.l} [${a.s}–${a.e}]: start(${a.s}) < lastEnd(${lastEnd})  ✗  →  SKIP — overlaps with last selected activity` });
    }
  }
  steps.push({ selected: [...selected], lastEnd, cur: -1, action: 'done',
    desc: `Optimal selection: ${selected.length} activities  [${selected.map(i => acts[i].l).join(', ')}].  No larger compatible set exists.` });
  return steps;
}
const AS_STEPS = buildASSteps(AS_ACTS);

/* Fractional Knapsack */
const FK_RAW = [
  {name:'Apple',  weight:10, value:60},
  {name:'Banana', weight:20, value:100},
  {name:'Cherry', weight:30, value:120},
];
const FK_CAP = 50;
const FK_ITEMS = FK_RAW.map(x => ({...x, ratio: x.value / x.weight}))
                        .sort((a, b) => b.ratio - a.ratio);

function buildFKSteps(items, cap) {
  const steps = [];
  let rem = cap, total = 0;
  const taken = [];
  steps.push({ taken: [], rem: cap, total: 0, cur: -1, action: 'init',
    desc: `Sort by value/weight ratio: ${items.map(x => `${x.name}(${x.ratio.toFixed(1)})`).join(' → ')}. Capacity = ${cap}.` });
  for (let i = 0; i < items.length; i++) {
    if (rem <= 0) break;
    const item = items[i];
    if (item.weight <= rem) {
      total += item.value; rem -= item.weight;
      taken.push({...item, frac: 1});
      steps.push({ taken: [...taken], rem, total, cur: i, action: 'full',
        desc: `Take ${item.name} FULLY  (w=${item.weight} ≤ ${rem + item.weight} rem, ratio=${item.ratio.toFixed(1)}).  Value += ${item.value}.  Total = ${total}.` });
    } else {
      const frac = rem / item.weight;
      const v = +(item.value * frac).toFixed(2);
      total = +(total + v).toFixed(2);
      taken.push({...item, frac});
      steps.push({ taken: [...taken], rem: 0, total, cur: i, action: 'partial',
        desc: `Take ${item.name} PARTIALLY: ${rem}/${item.weight} = ${(frac*100).toFixed(0)}% (ratio=${item.ratio.toFixed(1)}).  Value += ${v}.  Knapsack FULL. Total = ${total}.` });
      rem = 0; break;
    }
  }
  steps.push({ taken: [...taken], rem, total, cur: -1, action: 'done',
    desc: `Optimal fractional value = ${total}.  Fractional knapsack is always solvable by greedy — proven by exchange argument.` });
  return steps;
}
const FK_STEPS = buildFKSteps(FK_ITEMS, FK_CAP);

/* Jump Game II  — [2,3,1,1,4], min jumps = 2 */
const JG_ARR = [2, 3, 1, 1, 4];

function buildJGSteps(arr) {
  const n = arr.length;
  const steps = [];
  let jumps = 0, curEnd = 0, farthest = 0;
  steps.push({ i: -1, jumps, curEnd, farthest, action: 'init',
    desc: 'Track farthest reachable index. When i reaches the current jump\'s boundary → must take another jump, extend boundary to farthest.' });
  for (let i = 0; i < n - 1; i++) {
    const prev = farthest;
    farthest = Math.max(farthest, i + arr[i]);
    if (i === curEnd) {
      jumps++;
      steps.push({ i, jumps, curEnd, farthest, action: 'jump',
        desc: `i=${i}: reached boundary (${curEnd}). farthest updated to ${farthest}. Take jump #${jumps}  →  new boundary = ${farthest}.` });
      curEnd = farthest;
    } else {
      steps.push({ i, jumps, curEnd, farthest, action: 'scan',
        desc: `i=${i}: arr[${i}]=${arr[i]}, reach = i+arr[i] = ${i+arr[i]}. farthest = max(${prev}, ${i+arr[i]}) = ${farthest}. Boundary still ${curEnd}.` });
    }
  }
  steps.push({ i: n-1, jumps, curEnd, farthest, action: 'done',
    desc: `Reached index ${n-1}!  Minimum jumps = ${jumps}.` });
  return steps;
}
const JG_STEPS = buildJGSteps(JG_ARR);

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — ACTIVITY SELECTION TIMELINE
══════════════════════════════════════════════════════ */
function ActivitySelectionViz() {
  const [step, setStep] = useState(0);
  const s = AS_STEPS[Math.min(step, AS_STEPS.length - 1)];
  const UNIT = 21; // px per time unit

  const rowColor = (i) => {
    if (s.selected.includes(i)) return 'success';
    if (s.cur === i) return s.action === 'select' ? 'success' : s.action === 'skip' ? 'danger' : 'info';
    return null;
  };

  return (
    <VizBox>
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
        {s.desc}
      </div>

      {/* Timeline */}
      <div style={{ overflowX: 'auto', marginBottom: 14 }}>
        <div style={{ position: 'relative', minWidth: AS_MAX_T * UNIT + 40 }}>
          {/* Time axis */}
          <div style={{ display: 'flex', marginBottom: 8, marginLeft: 24 }}>
            {Array.from({ length: AS_MAX_T + 1 }, (_, t) => (
              <div key={t} style={{ width: UNIT, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', textAlign: 'left' }}>{t}</div>
            ))}
          </div>
          {/* Activity bars */}
          {AS_ACTS.map((a, i) => {
            const c = rowColor(i);
            const bg = c ? `var(--color-background-${c})` : 'var(--color-background-secondary)';
            const bd = c ? `var(--color-border-${c})` : 'var(--color-border-secondary)';
            const tc = c ? `var(--color-text-${c})` : 'var(--color-text-tertiary)';
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 3, height: 22 }}>
                <span style={{ width: 22, fontSize: 10, fontFamily: 'var(--font-mono)', color: tc, fontWeight: s.selected.includes(i) || s.cur === i ? 700 : 400 }}>{a.l}</span>
                <div style={{ position: 'relative', flex: 1 }}>
                  <div style={{ position: 'absolute', left: a.s * UNIT, width: (a.e - a.s) * UNIT - 2, height: 18, borderRadius: 4, background: bg, border: `1px solid ${bd}`, display: 'flex', alignItems: 'center', paddingLeft: 5, transition: 'all 0.18s' }}>
                    <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: tc, fontWeight: 600 }}>{a.s}–{a.e}</span>
                    {s.selected.includes(i) && <span style={{ marginLeft: 4, fontSize: 9 }}>✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
          {/* lastEnd marker */}
          {s.lastEnd !== -Infinity && s.lastEnd >= 0 && (
            <div style={{ position: 'absolute', top: 20, left: 24 + s.lastEnd * UNIT, bottom: 0, width: 2, background: 'var(--color-border-info)', borderRadius: 1, opacity: 0.8 }} />
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ padding: '5px 10px', borderRadius: 'var(--border-radius-md)', background: 'var(--color-background-success)', border: '0.5px solid var(--color-border-success)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          Selected: <strong style={{ color: 'var(--color-text-success)' }}>{s.selected.length}</strong> [{s.selected.map(i => AS_ACTS[i].l).join(', ')}]
        </div>
        {s.lastEnd !== -Infinity && (
          <div style={{ padding: '5px 10px', borderRadius: 'var(--border-radius-md)', background: 'var(--color-background-info)', border: '0.5px solid var(--color-border-info)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            lastEnd: <strong style={{ color: 'var(--color-text-info)' }}>{s.lastEnd}</strong>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(AS_STEPS.length-1,step+1)),step===AS_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:64,textAlign:'center',alignSelf:'center'}}>{step+1}/{AS_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(AS_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — FRACTIONAL KNAPSACK
   Items as ratio-sorted bars, capacity meter filling live
══════════════════════════════════════════════════════ */
function FractionalKnapsackViz() {
  const [step, setStep] = useState(0);
  const s = FK_STEPS[Math.min(step, FK_STEPS.length - 1)];
  const maxVal = Math.max(...FK_ITEMS.map(x => x.value));
  const ITEM_COLORS = ['#4EC9B0', '#81B4EA', '#CE9178'];

  return (
    <VizBox>
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
        {s.desc}
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Item bars */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.06em' }}>ITEMS (sorted by ratio ↓)</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 110 }}>
            {FK_ITEMS.map((item, i) => {
              const taken = s.taken.find(t => t.name === item.name);
              const isCur = s.cur === i;
              const color = ITEM_COLORS[i];
              const h = (item.value / maxVal) * 90 + 10;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, opacity: taken && taken.frac < 1 ? 0.9 : 1 }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: isCur ? 'var(--color-text-warning)' : 'var(--color-text-tertiary)' }}>
                    ratio {item.ratio.toFixed(1)}
                  </div>
                  <div style={{ position: 'relative', width: 48, height: h, borderRadius: '4px 4px 0 0', background: color, border: `2px solid ${isCur ? 'white' : 'transparent'}`, transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 3 }}>
                    {taken && taken.frac < 1 && (
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: (1 - taken.frac) * h, background: 'rgba(0,0,0,0.45)', borderRadius: '0 0 2px 2px' }} />
                    )}
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'rgba(0,0,0,0.65)' }}>v={item.value}</span>
                    <span style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: 'rgba(0,0,0,0.55)' }}>w={item.weight}</span>
                  </div>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: taken ? color : 'var(--color-text-tertiary)', fontWeight: taken ? 700 : 400 }}>
                    {item.name}{taken ? (taken.frac === 1 ? ' ✓' : ` ${(taken.frac*100).toFixed(0)}%`) : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capacity meter */}
        <div style={{ width: 80 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.06em', textAlign: 'center' }}>KNAPSACK</div>
          <div style={{ position: 'relative', height: 110, border: '1px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', background: 'var(--color-background-tertiary)' }}>
            {s.taken.map((item, i) => {
              const filledSoFar = s.taken.slice(0, i).reduce((a, x) => a + x.weight * x.frac, 0);
              const bottom = (filledSoFar / FK_CAP) * 100;
              const height = (item.weight * item.frac / FK_CAP) * 100;
              const color = ITEM_COLORS[FK_ITEMS.findIndex(fi => fi.name === item.name)];
              return (
                <div key={i} style={{ position: 'absolute', left: 0, right: 0, bottom: `${bottom}%`, height: `${height}%`, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: 'rgba(0,0,0,0.65)', fontWeight: 700 }}>{item.name[0]}</span>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-secondary)', marginTop: 4 }}>
            {(FK_CAP - s.rem)}/{FK_CAP}
          </div>
        </div>

        {/* Total value */}
        <div style={{ width: 80 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.06em', textAlign: 'center' }}>TOTAL VALUE</div>
          <div style={{ background: 'var(--color-background-success)', border: '1px solid var(--color-border-success)', borderRadius: 'var(--border-radius-md)', padding: '12px 8px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-success)' }}>{s.total}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(FK_STEPS.length-1,step+1)),step===FK_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{FK_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — JUMP GAME II  [2,3,1,1,4]
   Shows: current index, jump boundaries, farthest reach
══════════════════════════════════════════════════════ */
function JumpGameViz() {
  const [step, setStep] = useState(0);
  const s = JG_STEPS[Math.min(step, JG_STEPS.length - 1)];
  const n = JG_ARR.length;

  return (
    <VizBox>
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
        {s.desc}
      </div>

      {/* Array cells */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
        {JG_ARR.map((v, i) => {
          const isCur    = i === s.i;
          const isFar    = i === s.farthest && s.action !== 'done';
          const isEnd    = i === s.curEnd && s.action !== 'done';
          const isPast   = s.i >= 0 && i < s.i;
          const isDone   = s.action === 'done' && i === n - 1;

          let bg = 'var(--color-background-secondary)', bd = 'var(--color-border-secondary)', cl = 'var(--color-text-secondary)';
          if (isDone)   { bg='var(--color-background-success)';  bd='var(--color-border-success)';  cl='var(--color-text-success)'; }
          else if (isCur && s.action === 'jump') { bg='var(--color-background-warning)'; bd='var(--color-border-warning)'; cl='var(--color-text-warning)'; }
          else if (isCur) { bg='var(--color-background-info)';  bd='var(--color-border-info)';  cl='var(--color-text-info)'; }
          else if (isPast) { bg='var(--color-background-tertiary)'; bd='var(--color-border-tertiary)'; cl='var(--color-text-tertiary)'; }

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <span style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: isEnd ? 'var(--color-text-warning)' : isFar ? 'var(--color-text-success)' : 'transparent', fontWeight: 700, minHeight: 12 }}>
                {isEnd && isFar ? 'end=far' : isEnd ? 'end' : isFar ? 'far' : ''}
              </span>
              <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: `1px solid ${bd}`, background: bg, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: cl, transition: 'all 0.18s' }}>{v}</div>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
      </div>

      {/* Stats panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[{l:'Jumps taken',v:s.jumps,c:'success'},{l:'Boundary (curEnd)',v:s.curEnd,c:'warning'},{l:'Farthest reach',v:s.farthest,c:'info'}].map(({l,v,c})=>(
          <div key={l} style={{background:`var(--color-background-${c})`,border:`0.5px solid var(--color-border-${c})`,borderRadius:'var(--border-radius-md)',padding:'7px 10px',textAlign:'center'}}>
            <div style={{fontSize:11,color:`var(--color-text-${c})`,marginBottom:2}}>{l}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:17,fontWeight:700,color:`var(--color-text-${c})`}}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(JG_STEPS.length-1,step+1)),step===JG_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{JG_STEPS.length}</span>
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
   SECTION 1 — GREEDY FOUNDATIONS
══════════════════════════════════════════════════════ */
function SectionFoundations() {
  return (
    <div>
      <Note color="info" icon="ti-bolt">
        <strong>Greedy algorithms</strong> build a solution piece by piece — always choosing the locally optimal option at each step, never reconsidering past choices. When the problem has the right structure, local optimality leads to global optimality. No DP table, no backtracking.
      </Note>

      <H2>Two Required Properties</H2>
      <Grid cols={2}>
        <Card title="Greedy Choice Property" color="success">
          A globally optimal solution can be reached by making locally optimal (greedy) choices. The choice made doesn't depend on future sub-problem solutions — you commit without looking ahead.
        </Card>
        <Card title="Optimal Substructure" color="info">
          An optimal solution to the whole problem contains optimal solutions to its sub-problems. (Shared with DP — but greedy also needs the greedy choice property, which DP does not require.)
        </Card>
      </Grid>

      <H2>Proving Correctness — The Exchange Argument</H2>
      <P>The standard proof technique: assume the optimal solution differs from the greedy solution at some point. Show that <em>swapping</em> the optimal's choice with the greedy choice produces a solution that is at least as good. By induction, the greedy solution is optimal.</P>
      <Note color="success" icon="ti-math">
        <strong>Exchange argument template:</strong> Let OPT be any optimal solution and GREEDY be our greedy solution. Find the first position where they differ. Swap OPT's choice with GREEDY's choice. Show the new solution is at least as good as OPT. Therefore OPT and GREEDY are equally optimal.
      </Note>

      <H2>Greedy vs Dynamic Programming</H2>
      <Table
        heads={["Criterion", "Greedy", "Dynamic Programming"]}
        rows={[
          ["Decision",           "Irrevocable — commit immediately",              "Optimal sub-problem solutions reused"],
          ["Sub-problem dependency", "None — choice doesn't depend on sub-problems","Yes — combine sub-problem results"],
          ["Complexity",         "Usually O(n log n) or O(n)",                    "Usually O(n²) or O(n × states)"],
          ["Correctness guarantee","Requires exchange argument proof",             "Correctness by induction on sub-problem size"],
          ["Classic examples",   "Activity selection, Dijkstra, Prim's",          "0/1 Knapsack, LCS, Floyd-Warshall"],
          ["When greedy fails",  "0/1 Knapsack — must take whole items",         "Fractional Knapsack — greedy IS optimal"],
        ]}
      />

      <H2>Recognizing Greedy Problems</H2>
      <P>Ask three questions: (1) Can I make a locally best choice and never regret it? (2) Does taking the locally best item/interval/option not block better options later? (3) Does sorting the input expose a natural greedy order? If all three say yes, greedy likely works.</P>

      <QA q="Why does greedy fail for 0/1 Knapsack but succeed for Fractional Knapsack?" a="In 0/1 Knapsack, each item must be taken entirely or not at all. Taking the highest-ratio item might leave capacity that fits poorly with remaining items. Example: cap=10, items [(v=60,w=10),(v=100,w=6),(v=120,w=7)]. Greedy by ratio takes item 1 only (ratio=6), value=60. Optimal: items 2+3 (ratio 16.7,17.1), value=220. Fractional Knapsack avoids this because you can always take the exact remaining fraction — no 'wasted' capacity." />
      <QA q="What is the key insight that makes Activity Selection greedy-correct?" a="The exchange argument: suppose OPT chooses activity X first and GREEDY chooses activity Y (with Y finishing first). Swap X for Y in OPT. Since Y finishes ≤ X finishes, everything compatible with X afterward is also compatible with Y — the swap doesn't reduce the count. Repeating this argument transforms OPT into GREEDY without losing activities, proving GREEDY is optimal." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — INTERVAL SCHEDULING
══════════════════════════════════════════════════════ */
function SectionIntervals() {
  return (
    <div>
      <H2>Activity Selection — Maximum Non-Overlapping Intervals</H2>
      <P>Select the maximum number of non-overlapping activities from a set. Greedy strategy: <strong>always pick the activity with the earliest finish time</strong> that doesn't conflict with the last selected. Sorting by finish time is the key pre-processing step.</P>
      <ActivitySelectionViz />
      <Code>{{cpp: `// Activity Selection — O(n log n)
int activitySelection(vector<pair<int,int>>& acts) {
    // Sort by finish time
    sort(acts.begin(), acts.end(), [](auto& a, auto& b){ return a.second < b.second; });
    int count = 1, lastEnd = acts[0].second;
    for (int i = 1; i < acts.size(); i++) {
        if (acts[i].first >= lastEnd) {    // no conflict: start >= lastEnd
            count++;
            lastEnd = acts[i].second;
        }
    }
    return count;
}`, python: `def activity_selection(acts):
    acts.sort(key=lambda x: x[1])   # sort by finish time
    count, last_end = 1, acts[0][1]
    for s, e in acts[1:]:
        if s >= last_end:
            count += 1; last_end = e
    return count`}}</Code>
      <Note color="success" icon="ti-bulb">
        <strong>Why finish time and not start time?</strong> Sorting by start time is incorrect. Counter-example: [(1,100),(2,3),(4,5)]. Start-time sort picks (1,100) first, blocking everything. Finish-time sort picks (2,3) then (4,5) = 2 activities. The key intuition: earliest-finishing activity leaves the most room for future activities.
      </Note>

      <H2>Job Scheduling to Maximize Profit (with Deadlines)</H2>
      <P>Given jobs with (profit, deadline) pairs, schedule at most one job per unit time slot (1..max_deadline) to maximize profit. Greedy: sort by profit descending, greedily assign each job to the latest available slot before its deadline.</P>
      <Code>{{cpp: `int jobScheduling(vector<pair<int,int>>& jobs) {  // {profit, deadline}
    sort(jobs.begin(), jobs.end(), [](auto& a, auto& b){ return a.first > b.first; });
    int maxD = 0;
    for (auto& j : jobs) maxD = max(maxD, j.second);
    vector<bool> slot(maxD + 1, false);
    int profit = 0;
    for (auto& [p, d] : jobs) {
        // Find latest available slot <= deadline
        for (int t = min(d, maxD); t >= 1; t--) {
            if (!slot[t]) { slot[t] = true; profit += p; break; }
        }
    }
    return profit;
}
// [(100,2),(27,1),(15,2),(10,1),(20,3)] → profit = 100+20+15 = 135`, python: `def job_scheduling(jobs):  # [(profit, deadline)]
    jobs.sort(reverse=True)   # sort by profit desc
    max_d = max(d for _, d in jobs)
    slot = [False] * (max_d + 1)
    profit = 0
    for p, d in jobs:
        for t in range(min(d, max_d), 0, -1):
            if not slot[t]: slot[t] = True; profit += p; break
    return profit`}}</Code>

      <H2>Meeting Rooms — Minimum Rooms Required</H2>
      <P>Find peak concurrent meetings: sort start and end times separately, use two pointers to sweep through events. When a meeting starts before any ends → need another room.</P>
      <Code>{{cpp: `int minMeetingRooms(vector<pair<int,int>>& meetings) {
    vector<int> starts, ends;
    for (auto [s, e] : meetings) { starts.push_back(s); ends.push_back(e); }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());
    int rooms = 0, maxRooms = 0, j = 0;
    for (int s : starts) {
        if (s < ends[j]) rooms++;          // meeting starts before any ends: new room
        else             { j++; }          // reuse a freed room
        maxRooms = max(maxRooms, rooms);
    }
    return maxRooms;
}`, python: `def min_meeting_rooms(meetings):
    starts = sorted(s for s, e in meetings)
    ends   = sorted(e for s, e in meetings)
    rooms = max_rooms = j = 0
    for s in starts:
        if s < ends[j]: rooms += 1
        else: j += 1
        max_rooms = max(max_rooms, rooms)
    return max_rooms`}}</Code>

      <QA q="Why is the Activity Selection greedy algorithm optimal — is there a more formal proof?" a="By the exchange argument: let G = [g₁, g₂, ...] be the greedy solution and O = [o₁, o₂, ...] be any optimal solution, both sorted by finish time. We show |G| ≥ |O| by induction. Claim: after picking k activities, the greedy solution's k-th activity ends no later than the optimal's k-th activity. Base: g₁ ends ≤ o₁ ends (greedy picks earliest-finishing). Inductive step: if g_k ends ≤ o_k ends, then g_{k+1} starts from a point ≤ when o_{k+1} could start, and greedy picks the earliest-finishing from that point — so g_{k+1} ends ≤ o_{k+1} ends. Therefore |G| ≥ |O|." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — CLASSIC GREEDY
══════════════════════════════════════════════════════ */
function SectionClassic() {
  return (
    <div>
      <H2>Fractional Knapsack — Value / Weight Ratio</H2>
      <P>Items can be taken in any fraction. Greedy: sort by value/weight ratio, take items in order — full item if capacity permits, else take the exact remaining fraction. Correctness: any other order would leave capacity holding lower-ratio items when higher-ratio items were available.</P>
      <FractionalKnapsackViz />
      <Code>{{cpp: `double fractionalKnapsack(vector<pair<int,int>>& items, int W) {
    // items = {value, weight}
    sort(items.begin(), items.end(), [](auto& a, auto& b){
        return (double)a.first/a.second > (double)b.first/b.second;
    });
    double totalValue = 0;
    for (auto [v, w] : items) {
        if (W <= 0) break;
        if (w <= W) { totalValue += v; W -= w; }
        else        { totalValue += v * ((double)W / w); W = 0; }
    }
    return totalValue;
}
// [(60,10),(100,20),(120,30)], W=50 → 240.0`, python: `def fractional_knapsack(items, W):
    items.sort(key=lambda x: x[0]/x[1], reverse=True)  # sort by ratio desc
    total = 0
    for v, w in items:
        if W <= 0: break
        if w <= W: total += v; W -= w
        else:      total += v * (W/w); W = 0
    return total`}}</Code>

      <H2>Collecting Apples — Minimum Distance on a Number Line</H2>
      <P>You start at position 0. Apples are at various positions (some negative, some positive). Find the minimum total distance to collect all apples and return to 0 — or stop at either end.</P>
      <Note color="success" icon="ti-math">
        <strong>Greedy insight:</strong> Let L = |leftmost apple position| and R = rightmost apple position. You must go both left and right. The only choice is <em>which direction to go first</em>. Going left first: cost = 2L + R. Going right first: cost = L + 2R. Take the minimum: <Mx>ans = min(2L + R,\ L + 2R)</Mx>.
      </Note>
      <Code>{{cpp: `int collectApples(vector<int>& positions) {
    int L = 0, R = 0;
    for (int p : positions) {
        if (p < 0) L = max(L, -p);    // leftmost extent
        else       R = max(R, p);      // rightmost extent
    }
    // Go left first then right, or right first then left
    return min(2 * L + R, L + 2 * R);
}
// positions = [-3,-1,2,4,5]: L=3, R=5
// min(2*3+5, 3+2*5) = min(11, 13) = 11`, python: `def collect_apples(positions):
    L = max((-p for p in positions if p < 0), default=0)
    R = max((p  for p in positions if p > 0), default=0)
    return min(2*L + R, L + 2*R)`}}</Code>

      <H2>Huffman Coding — Minimum Prefix Code</H2>
      <P>Given character frequencies, build a prefix-free binary tree minimizing total encoding length. Greedy: always merge the two least-frequent nodes. A min-heap makes each merge O(log n), total O(n log n).</P>
      <Code>{{cpp: `#include <queue>
int huffmanCost(vector<int>& freq) {
    priority_queue<int, vector<int>, greater<int>> minH(freq.begin(), freq.end());
    int totalCost = 0;
    while (minH.size() > 1) {
        int a = minH.top(); minH.pop();
        int b = minH.top(); minH.pop();
        int merged = a + b;            // cost to transmit this merged node = a + b
        totalCost += merged;
        minH.push(merged);             // push merged node back
    }
    return totalCost;
}
// freq=[5,9,12,13,16,45] → cost=224 (optimal Huffman tree)`, python: `import heapq

def huffman_cost(freq):
    h = freq[:]
    heapq.heapify(h)
    total = 0
    while len(h) > 1:
        a, b = heapq.heappop(h), heapq.heappop(h)
        merged = a + b
        total += merged
        heapq.heappush(h, merged)
    return total`}}</Code>

      <H2>Path Tiling — Minimum Tiles to Cover All Marked Cells</H2>
      <P>Given a binary array where 1 = "dirty cell", cover all dirty cells with tiles of width ≤ W. Greedy: scan left to right; when you find a dirty cell, place the largest tile (rightmost endpoint) starting here — then skip to the next uncovered position.</P>
      <Code>{{cpp: `int minTiles(vector<int>& arr, int W) {
    int n = arr.size(), i = 0, tiles = 0;
    while (i < n) {
        if (arr[i] == 1) {
            tiles++;
            i += W;        // place a tile of width W starting at i — skip W cells
        } else {
            i++;           // clean cell — no tile needed
        }
    }
    return tiles;
}
// [1,0,0,1,1,0,1], W=2 → tile at 0 (covers 0-1), tile at 3 (covers 3-4), tile at 6 (covers 6-7) → 3 tiles`, python: `def min_tiles(arr, W):
    n, i, tiles = len(arr), 0, 0
    while i < n:
        if arr[i] == 1: tiles += 1; i += W  # place tile, skip W cells
        else: i += 1                          # clean cell, advance
    return tiles`}}</Code>

      <QA q="Why does the Collecting Apples formula work — isn't it greedy on which direction to start?" a="Yes — but here the greedy choice is binary (go left first or right first) and we can directly compute both options. The formula min(2L+R, L+2R) covers all possible routes: the factor of 2 accounts for the round trip in the first direction. Any other strategy (e.g., zigzagging) would be strictly worse because it combines the total left travel + total right travel, always totaling at least the minimum of the two formulas." />
      <QA q="In Huffman Coding, why does always merging the two smallest frequencies produce the optimal code?" a="By the exchange argument: in any optimal tree, the two least frequent characters must be siblings at the maximum depth (they contribute least to the total cost if they are deepest). If they were not at the maximum depth, swapping them with the deepest pair would produce a lower or equal total cost. This is the basis for the greedy merge step." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — JUMP GAMES & ADVANCED
══════════════════════════════════════════════════════ */
function SectionJumpGames() {
  return (
    <div>
      <H2>Jump Game I — Can You Reach the End?</H2>
      <P>At each index i, you can jump up to arr[i] steps forward. Determine if index n-1 is reachable from index 0. Greedy: track the <strong>maximum reachable index</strong> as you scan. If at any point i &gt; maxReach, you're stuck.</P>
      <Code>{{cpp: `bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;          // stranded — can't reach here
        maxReach = max(maxReach, i + nums[i]);   // extend reach
    }
    return true;
}
// [2,3,1,1,4] → true  |  [3,2,1,0,4] → false (stuck at index 3)`, python: `def can_jump(nums):
    max_reach = 0
    for i, v in enumerate(nums):
        if i > max_reach: return False
        max_reach = max(max_reach, i + v)
    return True`}}</Code>

      <H2>Jump Game II — Minimum Jumps (Interactive)</H2>
      <P>Find the minimum number of jumps to reach the end. Greedy: maintain current jump's boundary (<code>curEnd</code>) and the farthest index reachable from within the current jump (<code>farthest</code>). When the scan reaches <code>curEnd</code>, we must jump — the next boundary is <code>farthest</code>.</P>
      <JumpGameViz />
      <Code>{{cpp: `int jump(vector<int>& nums) {
    int n = nums.size(), jumps = 0, curEnd = 0, farthest = 0;
    for (int i = 0; i < n - 1; i++) {
        farthest = max(farthest, i + nums[i]);  // extend reach from this position
        if (i == curEnd) {                       // reached current jump boundary
            jumps++;                             // must take one more jump
            curEnd = farthest;                   // next boundary = farthest reached so far
        }
    }
    return jumps;
}
// [2,3,1,1,4] → 2  |  [2,3,0,1,4] → 2`, python: `def jump(nums):
    n, jumps, cur_end, farthest = len(nums), 0, 0, 0
    for i in range(n - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end: jumps += 1; cur_end = farthest
    return jumps`}}</Code>
      <Note color="success" icon="ti-bulb">
        <strong>Why not check i == farthest as the condition?</strong> We check <code>i == curEnd</code> — the <em>current</em> jump's boundary, not the maximum reachable. We take a jump exactly when forced (we've consumed all positions in the current jump). The farthest variable tracks the best possible next boundary across all positions within the current jump.
      </Note>

      <H2>Gas Station — Can You Complete the Circuit?</H2>
      <P>N gas stations in a circle. You start with 0 gas. At station i, gain <code>gas[i]</code>, spend <code>cost[i]</code> to reach the next. Find the starting station to complete the circuit, or -1 if impossible.</P>
      <Note color="info" icon="ti-math">
        <strong>Key theorem:</strong> If total(gas) ≥ total(cost), a valid starting station always exists. Greedy: scan from left, tracking running surplus. When surplus goes negative, reset — the starting station must be after here (any start before the deficit point would also fail at this point).
      </Note>
      <Code>{{cpp: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total = 0, tank = 0, start = 0;
    for (int i = 0; i < gas.size(); i++) {
        int net = gas[i] - cost[i];
        total += net;
        tank  += net;
        if (tank < 0) {       // cannot reach i+1 from 'start'
            start = i + 1;    // try starting from next station
            tank  = 0;        // reset tank
        }
    }
    return total >= 0 ? start : -1;
}
// gas=[1,2,3,4,5], cost=[3,4,5,1,2] → start at station 3`, python: `def can_complete_circuit(gas, cost):
    total = tank = start = 0
    for i, (g, c) in enumerate(zip(gas, cost)):
        net = g - c; total += net; tank += net
        if tank < 0: start = i + 1; tank = 0
    return start if total >= 0 else -1`}}</Code>

      <QA q="In Jump Game II, why is the greedy approach optimal — couldn't taking a smaller jump sometimes help?" a="The greedy extends to the maximum possible reachable index at each jump. Taking a shorter jump is never beneficial: from any position within the current jump's range, you can reach at most as far as farthest. Taking a smaller jump doesn't expand the set of reachable positions — it only delays reaching them. The greedy always maximizes the range covered per jump, which minimizes the number of jumps needed." />
      <QA q="In the Gas Station problem, why is it safe to set start = i+1 whenever the tank goes negative?" a="If the tank goes negative at station i when starting from 'start', then any station between start and i is also invalid as a starting point — because the partial trip from that station to i would also run out of gas (it would have an even smaller surplus since it missed the earlier positive contributions). So we can safely skip all starts up to i, and try i+1 next." />
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
        6 greedy problems spanning intervals, sequences, and optimization — all high-frequency in FAANG interviews and IIT OAs.
      </Note>

      <ProblemCard num={1} title="N Meetings in One Room" difficulty="OA Easy" tags={["Activity Selection","Sort by End"]}
        statement="Given N meetings with start and finish times, find the <strong>maximum number of meetings</strong> that can be held in a single room (no two meetings can overlap)."
        constraints={["1 ≤ N ≤ 10⁵","1 ≤ start[i] &lt; finish[i] ≤ 10⁵"]}
        examples={[{input:"start=[1,3,0,5,8,5], finish=[2,4,6,7,9,9]",output:"4",note:"Meetings 1,2,4,5 (1-indexed)"}]}
        approach="Sort meetings by finish time. Greedily select each meeting if it starts after the last selected meeting ended. The exchange argument proves this gives the maximum count."
        code={{cpp:`int maxMeetings(vector<int>& s, vector<int>& f, int n) {
    vector<pair<int,int>> meets;
    for(int i=0;i<n;i++) meets.push_back({f[i],s[i]});
    sort(meets.begin(),meets.end());
    int cnt=1, lastEnd=meets[0].first;
    for(int i=1;i<n;i++)
        if(meets[i].second>lastEnd){cnt++;lastEnd=meets[i].first;}
    return cnt;
}`,python:`def max_meetings(s, f):
    meets = sorted(zip(f, s))
    cnt, last = 1, meets[0][0]
    for end, start in meets[1:]:
        if start > last: cnt += 1; last = end
    return cnt`}}
      />

      <ProblemCard num={2} title="Fractional Knapsack" difficulty="OA Medium" tags={["Value/Weight Ratio","Sorting"]}
        statement="Given N items with weights and values, and a knapsack of capacity W, maximize the total value. Items can be taken in fractions."
        constraints={["1 ≤ N ≤ 10⁵","1 ≤ W ≤ 10⁹","1 ≤ weight[i], value[i] ≤ 10⁹"]}
        examples={[{input:"items=[(v=60,w=10),(v=100,w=20),(v=120,w=30)], W=50",output:"240.0",note:"Take Apple+Banana fully, Cherry 20/30"}]}
        approach="Sort items by value/weight ratio descending. Take each item fully until capacity runs out. Take the last item fractionally to fill remaining capacity. Total O(n log n). Exchange argument: any other ordering would leave higher-ratio items partially unused while lower-ratio items fill capacity — strictly suboptimal."
        code={{cpp:`double fracKnapsack(vector<pair<int,int>>& items, int W) {
    sort(items.begin(),items.end(),[](auto&a,auto&b){return(double)a.first/a.second>(double)b.first/b.second;});
    double total=0;
    for(auto[v,w]:items){
        if(W<=0)break;
        if(w<=W){total+=v;W-=w;}
        else{total+=v*(double)W/w;W=0;}
    }
    return total;
}`,python:`def frac_knapsack(items, W):
    items.sort(key=lambda x: x[0]/x[1], reverse=True)
    total = 0
    for v, w in items:
        if W <= 0: break
        if w <= W: total += v; W -= w
        else: total += v*W/w; W = 0
    return total`}}
      />

      <ProblemCard num={3} title="Jump Game II" difficulty="LC Medium" tags={["LC 45","Greedy"]}
        statement="Given array <code>nums</code> where <code>nums[i]</code> is the max jump from index <code>i</code>, return the <strong>minimum number of jumps</strong> to reach the last index. It's always possible to reach the end."
        constraints={["1 ≤ n ≤ 10⁴","0 ≤ nums[i] ≤ 1000"]}
        examples={[{input:"[2,3,1,1,4]",output:"2",note:"Jump 2→3→end"},{input:"[2,3,0,1,4]",output:"2"}]}
        approach="Track farthest reachable index and current jump boundary (curEnd). When i reaches curEnd → must take a jump, set curEnd = farthest. Count jumps. This greedy works because each 'jump' always extends to the maximum possible reachable index."
        code={{cpp:`int jump(vector<int>& nums) {
    int n=nums.size(),jumps=0,curEnd=0,farthest=0;
    for(int i=0;i<n-1;i++){
        farthest=max(farthest,i+nums[i]);
        if(i==curEnd){jumps++;curEnd=farthest;}
    }
    return jumps;
}`,python:`def jump(nums):
    n,jumps,cur_end,farthest=len(nums),0,0,0
    for i in range(n-1):
        farthest=max(farthest,i+nums[i])
        if i==cur_end:jumps+=1;cur_end=farthest
    return jumps`}}
      />

      <ProblemCard num={4} title="Gas Station" difficulty="LC Hard" tags={["LC 134","Circular Greedy"]}
        statement="N gas stations in a circle. At station i, gain <code>gas[i]</code>, spend <code>cost[i]</code> to reach the next station. Find the starting station to complete the full circuit, or return <code>-1</code>."
        constraints={["1 ≤ N ≤ 10⁵","0 ≤ gas[i], cost[i] ≤ 10⁴"]}
        examples={[{input:"gas=[1,2,3,4,5], cost=[3,4,5,1,2]",output:"3",note:"Start at station 3"},{input:"gas=[2,3,4], cost=[3,4,3]",output:"-1"}]}
        approach="O(n) greedy: track running tank surplus and total surplus. When tank < 0 → reset start to i+1, tank = 0. Key theorem: if total(gas) ≥ total(cost), the last surviving start is always valid. The greedy correctly finds it by eliminating impossible starting points."
        code={{cpp:`int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total=0,tank=0,start=0;
    for(int i=0;i<gas.size();i++){
        int net=gas[i]-cost[i]; total+=net; tank+=net;
        if(tank<0){start=i+1;tank=0;}
    }
    return total>=0?start:-1;
}`,python:`def can_complete_circuit(gas, cost):
    total=tank=start=0
    for i,(g,c) in enumerate(zip(gas,cost)):
        net=g-c;total+=net;tank+=net
        if tank<0:start=i+1;tank=0
    return start if total>=0 else -1`}}
      />

      <ProblemCard num={5} title="Assign Cookies" difficulty="OA Easy" tags={["LC 455","Two Pointer Greedy"]}
        statement="Give cookies to children. Each child <code>i</code> has greed factor <code>g[i]</code> (minimum cookie size). Each cookie has size <code>s[j]</code>. Assign at most one cookie per child to maximize the number of <strong>content children</strong> (cookie size ≥ greed factor)."
        constraints={["1 ≤ g.length, s.length ≤ 3×10⁴","1 ≤ g[i], s[j] ≤ 2^31 − 1"]}
        examples={[{input:"g=[1,2,3], s=[1,1]",output:"1"},{input:"g=[1,2], s=[1,2,3]",output:"2"}]}
        approach="Sort both arrays. Use two pointers: try to assign the smallest sufficient cookie to the least greedy child. If the current cookie satisfies the current child, assign it and advance both pointers; else only advance the cookie pointer. Greedy correctness: using the smallest sufficient cookie never wastes a cookie that could satisfy a greedier child."
        code={{cpp:`int findContentChildren(vector<int>& g, vector<int>& s) {
    sort(g.begin(),g.end()); sort(s.begin(),s.end());
    int ci=0,si=0;
    while(ci<g.size()&&si<s.size()){
        if(s[si]>=g[ci])ci++;   // cookie satisfies child
        si++;                   // always advance cookie pointer
    }
    return ci;
}`,python:`def find_content_children(g, s):
    g.sort(); s.sort(); ci = si = 0
    while ci < len(g) and si < len(s):
        if s[si] >= g[ci]: ci += 1
        si += 1
    return ci`}}
      />

      <ProblemCard num={6} title="Candy Distribution" difficulty="LC Hard" tags={["LC 135","Two-Pass Greedy"]}
        statement="N children in a line, each with a rating. Give each child at least one candy such that children with a <strong>higher rating than an adjacent neighbor get more candy</strong>. Return the minimum total candies."
        constraints={["1 ≤ n ≤ 2×10⁴","0 ≤ ratings[i] ≤ 2×10⁴"]}
        examples={[{input:"[1,0,2]",output:"5",note:"Distribute [2,1,2]"},{input:"[1,2,2]",output:"4",note:"Distribute [1,2,1]"}]}
        approach="Two-pass greedy: (1) Forward pass — give each child 1 more candy than the left neighbor if ratings[i] > ratings[i-1]. (2) Backward pass — if ratings[i] > ratings[i+1], ensure child i has more than child i+1 (take max of current and right+1). Sum up. Each pass independently handles one direction of the constraint."
        code={{cpp:`int candy(vector<int>& r) {
    int n=r.size();
    vector<int> c(n,1);
    // Forward: satisfy left neighbor constraint
    for(int i=1;i<n;i++) if(r[i]>r[i-1]) c[i]=c[i-1]+1;
    // Backward: satisfy right neighbor constraint
    for(int i=n-2;i>=0;i--) if(r[i]>r[i+1]) c[i]=max(c[i],c[i+1]+1);
    return accumulate(c.begin(),c.end(),0);
}`,python:`def candy(ratings):
    n = len(ratings); c = [1]*n
    for i in range(1, n):
        if ratings[i] > ratings[i-1]: c[i] = c[i-1]+1
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]: c[i] = max(c[i], c[i+1]+1)
    return sum(c)`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  {id:'foundations',label:'Greedy Foundations'},
  {id:'intervals',  label:'Interval Scheduling'},
  {id:'classic',    label:'Classic Greedy'},
  {id:'jumpgames',  label:'Jump Games & Gas Station'},
  {id:'problems',   label:'Problems'},
];
export default function Greedy() {
  const [active, setActive] = useState('foundations');
  const map = { foundations:<SectionFoundations/>, intervals:<SectionIntervals/>, classic:<SectionClassic/>, jumpgames:<SectionJumpGames/>, problems:<SectionProblems/> };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 12</div>
        <h1 className="page-header-title">Greedy Techniques</h1>
        <p className="page-header-subtitle">Exchange Argument · Activity Selection · Fractional Knapsack · Collecting Apples · Path Tiling · Jump Games · Gas Station</p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={12} />
    </div>
  );
}
