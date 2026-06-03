import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   PRECOMPUTED STEP DATA
══════════════════════════════════════════════════════ */

/* ── Fibonacci n=6 — recursive call trace ───────────── */
const FIB_RECURSIVE_CALLS = [
  {n:6,type:'call',dup:false,depth:0},{n:5,type:'call',dup:false,depth:1},
  {n:4,type:'call',dup:false,depth:2},{n:3,type:'call',dup:false,depth:3},
  {n:2,type:'call',dup:false,depth:4},{n:1,type:'base',dup:false,depth:5},
  {n:0,type:'base',dup:false,depth:5},{n:1,type:'base',dup:true,depth:4},
  {n:2,type:'call',dup:true,depth:3},{n:1,type:'base',dup:true,depth:4},
  {n:0,type:'base',dup:true,depth:4},{n:3,type:'call',dup:true,depth:2},
  {n:2,type:'call',dup:true,depth:3},{n:1,type:'base',dup:true,depth:4},
  {n:0,type:'base',dup:true,depth:4},{n:1,type:'base',dup:true,depth:3},
  {n:4,type:'call',dup:true,depth:1},{n:3,type:'call',dup:true,depth:2},
  {n:2,type:'call',dup:true,depth:3},{n:1,type:'base',dup:true,depth:4},
  {n:0,type:'base',dup:true,depth:4},{n:1,type:'base',dup:true,depth:3},
  {n:2,type:'call',dup:true,depth:2},{n:1,type:'base',dup:true,depth:3},
  {n:0,type:'base',dup:true,depth:3},
];
// Memoized: only 9 unique calls (cache hits shown)
const FIB_MEMO_CALLS = [
  {n:6,type:'call',hit:false,cache:{}},
  {n:5,type:'call',hit:false,cache:{}},
  {n:4,type:'call',hit:false,cache:{}},
  {n:3,type:'call',hit:false,cache:{}},
  {n:2,type:'call',hit:false,cache:{}},
  {n:1,type:'base',hit:false,cache:{1:1}},
  {n:0,type:'base',hit:false,cache:{1:1,0:0}},
  {n:2,type:'complete',hit:false,cache:{1:1,0:0,2:1}},
  {n:1,type:'hit',hit:true,cache:{1:1,0:0,2:1}},
  {n:3,type:'complete',hit:false,cache:{1:1,0:0,2:1,3:2}},
  {n:2,type:'hit',hit:true,cache:{1:1,0:0,2:1,3:2}},
  {n:4,type:'complete',hit:false,cache:{1:1,0:0,2:1,3:2,4:3}},
  {n:3,type:'hit',hit:true,cache:{1:1,0:0,2:1,3:2,4:3}},
  {n:5,type:'complete',hit:false,cache:{1:1,0:0,2:1,3:2,4:3,5:5}},
  {n:4,type:'hit',hit:true,cache:{1:1,0:0,2:1,3:2,4:3,5:5}},
  {n:6,type:'complete',hit:false,cache:{0:0,1:1,2:1,3:2,4:3,5:5,6:8}},
];
// Tabulation: just fill dp[0..6]
const FIB_VALUES = [0,1,1,2,3,5,8];

/* ── Coin Change — coins=[1,2,5], amount=6 ───────────── */
const CC_COINS = [1, 2, 5], CC_AMT = 6;
function buildCCSteps() {
  const dp  = new Array(CC_AMT + 1).fill(Infinity);
  dp[0] = 0;
  const steps = [];
  steps.push({ dp: [...dp], cur: -1, tryCoin: -1, action: 'init',
    desc: 'Initialize: dp[0]=0 (0 coins for amount 0). dp[1..6]=∞. Recurrence: dp[i] = min(dp[i−coin]+1) for each coin ≤ i.' });
  for (let i = 1; i <= CC_AMT; i++) {
    let bestCoin = -1;
    for (const c of CC_COINS) {
      if (c <= i) {
        const candidate = dp[i - c] + 1;
        steps.push({ dp: [...dp], cur: i, tryCoin: c, candidate, prev: dp[i],
          action: candidate < dp[i] ? 'improve' : 'noImprove',
          desc: `dp[${i}]: try coin ${c}. dp[${i-c}]+1 = ${dp[i-c]===Infinity?'∞':dp[i-c]}+1 = ${dp[i-c]===Infinity?'∞':candidate}. ${candidate<dp[i]?`Improvement! ${dp[i]===Infinity?'∞':dp[i]} → ${candidate}`:dp[i]===Infinity?`Still ∞`:`No improvement (${dp[i]} ≤ ${candidate})`}.` });
        if (candidate < dp[i]) { dp[i] = candidate; bestCoin = c; }
      }
    }
    steps.push({ dp: [...dp], cur: i, tryCoin: -1, bestCoin, action: 'set',
      desc: `dp[${i}] = ${dp[i]===Infinity?'∞':dp[i]}. ${dp[i]===Infinity?'Cannot reach this amount.':bestCoin>0?`Best: use coin ${bestCoin} → dp[${i-bestCoin}]+1=${dp[i]}`:'Base case.'}` });
  }
  steps.push({ dp: [...dp], cur: CC_AMT, tryCoin: -1, action: 'done',
    desc: `Done! Minimum coins for amount ${CC_AMT} = dp[${CC_AMT}] = ${dp[CC_AMT]}. Read answer at dp[target].` });
  return steps;
}
const CC_STEPS = buildCCSteps();

/* ── LIS — arr=[10,9,2,5,3,7,101,18] ────────────────── */
const LIS_ARR = [10, 9, 2, 5, 3, 7, 101, 18];
function buildLISSteps() {
  const dp = new Array(LIS_ARR.length).fill(1);
  const steps = [], n = LIS_ARR.length;
  steps.push({ dp: [...dp], i: -1, j: -1, comparing: null, maxSoFar: 1, action: 'init',
    desc: 'Initialize: dp[i]=1 for all i (each element alone is a LIS of length 1). For each i, check all j<i where arr[j]<arr[i] — then dp[i] = max(dp[i], dp[j]+1).' });
  for (let i = 0; i < n; i++) {
    steps.push({ dp: [...dp], i, j: -1, comparing: null, maxSoFar: Math.max(...dp), action: 'newI',
      desc: `i=${i}: arr[${i}]=${LIS_ARR[i]}. Now check all j<${i} where arr[j]<${LIS_ARR[i]}.` });
    for (let j = 0; j < i; j++) {
      const canExtend = LIS_ARR[j] < LIS_ARR[i];
      if (canExtend && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        steps.push({ dp: [...dp], i, j, comparing: {ai: LIS_ARR[i], aj: LIS_ARR[j]}, maxSoFar: Math.max(...dp), action: 'extend',
          desc: `arr[${j}]=${LIS_ARR[j]} < arr[${i}]=${LIS_ARR[i]} ✓ → dp[${i}] = dp[${j}]+1 = ${dp[i]}. Extending LIS!` });
      } else {
        steps.push({ dp: [...dp], i, j, comparing: {ai: LIS_ARR[i], aj: LIS_ARR[j]}, maxSoFar: Math.max(...dp), action: canExtend ? 'noImproveLIS' : 'cannotExtend',
          desc: canExtend
            ? `arr[${j}]=${LIS_ARR[j]} < arr[${i}]=${LIS_ARR[i]} ✓ but dp[${j}]+1=${dp[j]+1} ≤ dp[${i}]=${dp[i]}. No improvement.`
            : `arr[${j}]=${LIS_ARR[j]} ≥ arr[${i}]=${LIS_ARR[i]} ✗ — can't extend (not increasing).` });
      }
    }
  }
  const lisLen = Math.max(...dp);
  steps.push({ dp: [...dp], i: -1, j: -1, comparing: null, maxSoFar: lisLen, action: 'done',
    desc: `Done! LIS length = max(dp) = ${lisLen}. One valid LIS: [2,3,7,18] or [2,5,7,101].` });
  return steps;
}
const LIS_STEPS = buildLISSteps();

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — FIBONACCI 3-WAY COMPARISON
══════════════════════════════════════════════════════ */
function FibViz() {
  const [mode, setMode] = useState('recursive');

  const totalCalls = FIB_RECURSIVE_CALLS.length;
  const dupCalls   = FIB_RECURSIVE_CALLS.filter(c=>c.dup).length;
  const memoCalls  = FIB_MEMO_CALLS.length;

  return (
    <VizBox>
      <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
        {[['recursive','Naive Recursion'],['memoized','Memoization'],['tabulated','Tabulation']].map(([m,l])=>(
          <button key={m} onClick={()=>setMode(m)} style={{ padding:'4px 12px', border:'1px solid', borderColor:mode===m?'var(--color-border-info)':'var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:mode===m?'var(--color-background-info)':'transparent', color:mode===m?'var(--color-text-info)':'var(--color-text-secondary)', cursor:'pointer', fontSize:12 }}>{l}</button>
        ))}
      </div>

      {mode === 'recursive' && (
        <div>
          <div style={{ marginBottom:12, padding:'6px 10px', background:'var(--color-background-danger)', border:'1px solid var(--color-border-danger)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-danger)', lineHeight:1.55 }}>
            <strong>Problem:</strong> fib(6) makes <strong>{totalCalls} calls</strong> — {dupCalls} of them ({Math.round(dupCalls/totalCalls*100)}%) are <strong>redundant recalculations</strong>. Time complexity: O(2ⁿ).
          </div>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:8, letterSpacing:'0.06em' }}>CALL TRACE — red = recomputed work</div>
          <div style={{ display:'flex', flexDirection:'column', gap:3, maxHeight:280, overflowY:'auto', background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:10 }}>
            {FIB_RECURSIVE_CALLS.map((c,i)=>{
              const indent = c.depth * 16;
              const bg = c.dup ? 'var(--color-background-danger)' : c.type==='base' ? 'var(--color-background-success)' : 'var(--color-background-secondary)';
              const tc = c.dup ? 'var(--color-text-danger)' : c.type==='base' ? 'var(--color-text-success)' : 'var(--color-text-secondary)';
              return (
                <div key={i} style={{ display:'flex', gap:6, alignItems:'center', paddingLeft:indent }}>
                  <div style={{ padding:'2px 8px', borderRadius:4, background:bg, fontFamily:'var(--font-mono)', fontSize:12, color:tc, flexShrink:0 }}>
                    fib({c.n}){c.dup?' ← REDO':c.type==='base'?' [base]':''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mode === 'memoized' && (
        <div>
          <div style={{ marginBottom:12, padding:'6px 10px', background:'var(--color-background-success)', border:'1px solid var(--color-border-success)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-success)', lineHeight:1.55 }}>
            <strong>Solution:</strong> Cache results in a dictionary. {memoCalls} calls total — cache hits instantly return without recursing. O(n) time, O(n) space.
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:6 }}>CALL TRACE — green = cache hit</div>
              <div style={{ display:'flex', flexDirection:'column', gap:3, maxHeight:240, overflowY:'auto', background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:10 }}>
                {FIB_MEMO_CALLS.map((c,i)=>{
                  const bg = c.hit ? 'var(--color-background-success)' : c.type==='base' ? 'var(--color-background-info)' : 'var(--color-background-secondary)';
                  const tc = c.hit ? 'var(--color-text-success)' : c.type==='base' ? 'var(--color-text-info)' : 'var(--color-text-secondary)';
                  return (
                    <div key={i} style={{ padding:'2px 8px', borderRadius:4, background:bg, fontFamily:'var(--font-mono)', fontSize:12, color:tc }}>
                      fib({c.n}){c.hit?' → HIT ✓':c.type==='complete'?' → computed':c.type==='base'?' [base]':''}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:6 }}>CACHE STATE (memo dict)</div>
              {[{0:0},{1:1,0:0},{1:1,0:0,2:1},{1:1,0:0,2:1,3:2},{1:1,0:0,2:1,3:2,4:3},{0:0,1:1,2:1,3:2,4:3,5:5},{0:0,1:1,2:1,3:2,4:3,5:5,6:8}].slice(-1).map((cache,idx)=>(
                <div key={idx} style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                  {Object.entries(cache).map(([k,v])=>(
                    <div key={k} style={{ padding:'4px 8px', borderRadius:5, border:'1px solid var(--color-border-success)', background:'var(--color-background-success)', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--color-text-success)' }}>
                      {k}:{v}
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ marginTop:12, padding:'8px 10px', background:'var(--color-background-secondary)', border:'0.5px solid var(--color-border-secondary)', borderRadius:'var(--border-radius-md)', fontFamily:'var(--font-mono)', fontSize:12, lineHeight:2, color:'var(--color-text-secondary)' }}>
                <div style={{ color:'#6A9955' }}>{'// Memoization template'}</div>
                <div><span style={{ color:'#9CDCFE' }}>memo</span> = {'{}'}</div>
                <div><span style={{ color:'#DCDCAA' }}>def</span> fib(n):</div>
                <div style={{ paddingLeft:14 }}><span style={{ color:'#CE9178' }}>if</span> n in memo: <span style={{ color:'#C586C0' }}>return</span> memo[n]</div>
                <div style={{ paddingLeft:14 }}><span style={{ color:'#CE9178' }}>if</span> n ≤ 1: <span style={{ color:'#C586C0' }}>return</span> n</div>
                <div style={{ paddingLeft:14 }}>memo[n] = fib(n-1)+fib(n-2)</div>
                <div style={{ paddingLeft:14 }}><span style={{ color:'#C586C0' }}>return</span> memo[n]</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'tabulated' && (
        <div>
          <div style={{ marginBottom:12, padding:'6px 10px', background:'var(--color-background-info)', border:'1px solid var(--color-border-info)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-info)', lineHeight:1.55 }}>
            <strong>Tabulation:</strong> Fill a table bottom-up. No recursion, no stack overhead. O(n) time, O(n) space (reducible to O(1) with two variables).
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:8, letterSpacing:'0.06em' }}>DP TABLE (each cell depends on the previous two)</div>
            <div style={{ display:'flex', gap:6 }}>
              {FIB_VALUES.map((v,i)=>(
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                  <div style={{ width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:7, border:'1.5px solid var(--color-border-info)', background:'var(--color-background-info)', fontFamily:'var(--font-mono)', fontSize:16, fontWeight:700, color:'var(--color-text-info)' }}>{v}</div>
                  <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>dp[{i}]</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:10, display:'flex', gap:4, flexWrap:'wrap', fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>
              {FIB_VALUES.map((v,i)=>i>=2&&(
                <span key={i} style={{ padding:'2px 8px', borderRadius:4, background:'var(--color-background-secondary)' }}>dp[{i}]=dp[{i-1}]+dp[{i-2}]={v}</span>
              ))}
            </div>
          </div>
          <Code lang="cpp">{`// O(1) space — only need last two values
int fib(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int cur = prev1 + prev2;
        prev2 = prev1; prev1 = cur;
    }
    return prev1;
}`}</Code>
        </div>
      )}
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — COIN CHANGE 1D DP TABLE
══════════════════════════════════════════════════════ */
function CoinChangeViz() {
  const [step, setStep] = useState(0);
  const s = CC_STEPS[Math.min(step, CC_STEPS.length - 1)];
  const maxCoins = Math.max(...s.dp.filter(v=>v!==Infinity), 0);

  const cellColor = (i) => {
    if (s.action === 'done' || (s.action === 'set' && i < (s.cur||0))) return 'success';
    if (i === s.cur && s.action === 'set') return 'success';
    if (i === s.cur) return 'warning';
    if (s.tryCoin > 0 && i === s.cur - s.tryCoin) return 'info';
    return null;
  };

  return (
    <VizBox>
      <div style={{ marginBottom:12, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:700, background:`var(--color-background-${s.action==='improve'?'success':s.action==='set'?'info':s.action==='done'?'success':'secondary'})`, color:`var(--color-text-${s.action==='improve'?'success':s.action==='set'?'info':s.action==='done'?'success':'tertiary'})`, border:`1px solid var(--color-border-${s.action==='improve'?'success':s.action==='set'?'info':s.action==='done'?'success':'tertiary'})`, whiteSpace:'nowrap' }}>
          {s.action==='improve'?'Update ✓':s.action==='set'?'Finalized':s.action==='done'?'Done ✓':s.action==='noImprove'?'No improvement':'Init'}
        </span>
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</span>
      </div>

      {/* Recurrence always visible */}
      <div style={{ background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:'8px 14px', fontFamily:'var(--font-mono)', fontSize:12.5, lineHeight:2, marginBottom:14 }}>
        <div style={{ color:'#9CDCFE' }}>dp[i] = <span style={{ color:'#CE9178' }}>min</span>(dp[i − coin] + 1)  for each coin ≤ i</div>
        <div style={{ color:'#6A9955' }}>{'// coins = ['}{CC_COINS.join(', ')}], target = {CC_AMT}</div>
      </div>

      {/* DP table */}
      <div style={{ marginBottom:14 }}>
        <div style={{ display:'flex', gap:4 }}>
          {s.dp.map((v, i) => {
            const c = cellColor(i);
            return (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                <div style={{ width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:7, border:`1.5px solid ${c?`var(--color-border-${c})`:'var(--color-border-secondary)'}`, background:c?`var(--color-background-${c})`:'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:14, fontWeight:c?700:500, color:c?`var(--color-text-${c})`:'var(--color-text-secondary)', transition:'all 0.18s' }}>
                  {v === Infinity ? '∞' : v}
                </div>
                <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>dp[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrow showing which prev cell is being accessed */}
      {s.tryCoin > 0 && s.cur > 0 && (
        <div style={{ marginBottom:12, fontFamily:'var(--font-mono)', fontSize:12, color:'var(--color-text-info)', display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ color:'var(--color-text-info)' }}>dp[{s.cur}]</span>
          <span style={{ color:'var(--color-text-tertiary)' }}>← try coin {s.tryCoin} → dp[{s.cur - s.tryCoin}]+1 = {s.dp[s.cur - s.tryCoin]===Infinity?'∞':s.dp[s.cur - s.tryCoin]+1}</span>
        </div>
      )}

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(CC_STEPS.length-1,step+1)),step===CC_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:64,textAlign:'center',alignSelf:'center'}}>{step+1}/{CC_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(CC_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — LIS STEP-THROUGH
══════════════════════════════════════════════════════ */
function LISViz() {
  const [step, setStep] = useState(0);
  const s = LIS_STEPS[Math.min(step, LIS_STEPS.length - 1)];
  const n = LIS_ARR.length;

  const cellColor = (idx) => {
    if (s.action === 'done') return 'success';
    if (idx === s.i) return 'warning';
    if (idx === s.j && s.action !== 'newI') return s.action === 'extend' ? 'success' : 'danger';
    if (idx < (s.i < 0 ? 0 : s.i)) return s.dp[idx] > 1 ? 'info' : 'secondary';
    return null;
  };

  return (
    <VizBox>
      <div style={{ marginBottom:12, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        {s.action !== 'init' && (
          <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:700, background:`var(--color-background-${s.action==='extend'?'success':s.action==='cannotExtend'?'danger':s.action==='done'?'success':'info'})`, color:`var(--color-text-${s.action==='extend'?'success':s.action==='cannotExtend'?'danger':s.action==='done'?'success':'info'})`, border:`1px solid var(--color-border-${s.action==='extend'?'success':s.action==='cannotExtend'?'danger':s.action==='done'?'success':'info'})` }}>
            {s.action==='extend'?'Extend LIS ✓':s.action==='cannotExtend'?'Cannot extend ✗':s.action==='newI'?'New outer index':s.action==='done'?'Done ✓':'No improvement'}
          </span>
        )}
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</span>
      </div>

      <div style={{ background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:'8px 14px', fontFamily:'var(--font-mono)', fontSize:12.5, lineHeight:2, marginBottom:14 }}>
        <div style={{ color:'#9CDCFE' }}>dp[i] = <span style={{ color:'#CE9178' }}>max</span>(dp[j] + 1)  for j &lt; i where arr[j] &lt; arr[i]</div>
        <div style={{ color:'#6A9955' }}>{'// arr = ['}{LIS_ARR.join(', ')}]</div>
      </div>

      {/* Array values */}
      <div style={{ marginBottom:6 }}>
        <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:6, letterSpacing:'0.06em' }}>ARRAY</div>
        <div style={{ display:'flex', gap:4 }}>
          {LIS_ARR.map((v, i) => {
            const c = cellColor(i);
            return (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:i===s.i?'var(--color-text-warning)':i===s.j&&s.action!=='newI'?'var(--color-text-info)':'transparent', fontWeight:700, minHeight:12 }}>
                  {i===s.i?'i':i===s.j&&s.action!=='newI'?'j':''}
                </span>
                <div style={{ width:42, height:42, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6, border:`1.5px solid ${c?`var(--color-border-${c})`:'var(--color-border-secondary)'}`, background:c?`var(--color-background-${c})`:'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:c?700:400, color:c?`var(--color-text-${c})`:'var(--color-text-secondary)', transition:'all 0.18s' }}>{v}</div>
                <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* dp[] values */}
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:6, letterSpacing:'0.06em' }}>dp[] (LIS length ending at each index)</div>
        <div style={{ display:'flex', gap:4 }}>
          {s.dp.map((v, i) => {
            const c = cellColor(i);
            return (
              <div key={i} style={{ width:42, height:36, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:5, border:`1px solid ${c?`var(--color-border-${c})`:'var(--color-border-tertiary)'}`, background:c?`var(--color-background-${c})`:'var(--color-background-tertiary)', fontFamily:'var(--font-mono)', fontSize:14, fontWeight:c?700:400, color:c?`var(--color-text-${c})`:'var(--color-text-tertiary)', transition:'all 0.15s' }}>{v}</div>
            );
          })}
        </div>
      </div>

      {/* Max so far */}
      <div style={{ display:'flex', gap:10, marginBottom:14 }}>
        <div style={{ padding:'6px 12px', borderRadius:'var(--border-radius-md)', background:'var(--color-background-success)', border:'0.5px solid var(--color-border-success)', fontFamily:'var(--font-mono)', fontSize:13, color:'var(--color-text-success)', fontWeight:700 }}>
          LIS so far = {s.maxSoFar}
        </div>
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(LIS_STEPS.length-1,step+1)),step===LIS_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:64,textAlign:'center',alignSelf:'center'}}>{step+1}/{LIS_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(LIS_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* PROBLEM CARD */
const DIFF_CLR={'IIT OA':'info','OA Easy':'success','OA Medium':'warning','OA Hard':'danger','LC Medium':'info','LC Hard':'purple'};
function ProblemCard({num,title,difficulty,tags=[],statement,constraints=[],examples=[],approach,code}) {
  const [open,setOpen]=useState(false);const dc=DIFF_CLR[difficulty]||'info';
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
   SECTION 1 — THE DP THINKING FRAMEWORK
══════════════════════════════════════════════════════ */
function SectionThinking() {
  return (
    <div>
      <Note color="info" icon="ti-brain">
        Dynamic Programming is <strong>recursion + memory</strong>. Every DP problem is solvable by: (1) finding the right recursive structure, (2) identifying overlapping subproblems, (3) storing results to avoid recomputation. If you can write the recursion, you can write the DP.
      </Note>

      <H2>How to Identify a DP Problem</H2>
      <Grid cols={2}>
        <Card title="Optimal Substructure" color="success">
          The optimal solution to the whole problem can be built from optimal solutions to sub-problems. <em>Example: shortest path from A→C = shortest(A→B) + shortest(B→C).</em>
        </Card>
        <Card title="Overlapping Subproblems" color="info">
          The same sub-problem is solved multiple times in the naive recursive solution. <em>Example: fib(3) is computed multiple times when computing fib(5).</em>
        </Card>
      </Grid>

      <Note color="warning" icon="ti-bulb">
        <strong>Quick test:</strong> Does the problem ask for maximum/minimum/count/true-false on a sequence/grid/set where choices affect later choices? If yes, likely DP. Keywords: "minimum cost", "maximum profit", "number of ways", "is it possible".
      </Note>

      <H2>The 5-Step DP Recipe — Apply This to Every Problem</H2>
      <div style={{ background:'#0D0F18', border:'1px solid #1E2233', borderRadius:10, padding:'18px 20px' }}>
        {[
          ['1. Define the State',  'info',    'dp[i] means ___. What does the index represent? What does the value represent?', 'dp[i] = minimum coins to make amount i'],
          ['2. Write the Recurrence', 'success', 'How does dp[i] relate to smaller subproblems? What choices do you have?', 'dp[i] = min(dp[i−coin]+1) for each coin'],
          ['3. Identify Base Cases', 'warning', 'What are the trivially known values? (empty input, zero amount, single element)', 'dp[0] = 0 (zero coins for zero amount)'],
          ['4. Fill Order',          'purple',  'Bottom-up: which direction to fill the table? Top-down: just add memoization.', 'Fill dp[0], dp[1], ..., dp[target] left to right'],
          ['5. Extract Answer',      'secondary','Where in the table/memo is the final answer?', 'return dp[target]'],
        ].map(([title, color, desc, example], i) => (
          <div key={i} style={{ display:'flex', gap:12, marginBottom:i<4?12:0, alignItems:'flex-start' }}>
            <div style={{ flexShrink:0, width:26, height:26, borderRadius:'50%', background:`var(--color-background-${color})`, border:`1px solid var(--color-border-${color})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, color:`var(--color-text-${color})`, marginTop:2 }}>{i+1}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:`var(--color-text-${color})`, marginBottom:3 }}>{title}</div>
              <div style={{ fontSize:12.5, color:'var(--color-text-secondary)', marginBottom:3 }}>{desc}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:11.5, color:'var(--color-text-tertiary)', padding:'3px 8px', borderRadius:4, background:'rgba(255,255,255,0.04)', display:'inline-block' }}>
                e.g. {example}
              </div>
            </div>
          </div>
        ))}
      </div>

      <H2>DP vs Greedy vs Divide & Conquer</H2>
      <Table
        heads={["Approach","Subproblem overlap","Choice dependency","Example"]}
        rows={[
          ["Greedy",         "None (or irrelevant)","No — local optimum = global","Activity selection, Dijkstra"],
          ["Divide & Conquer","None (independent)",  "No — subproblems independent","Merge sort, Binary search"],
          ["DP",             "Yes — overlapping",   "Yes — choice affects future","Knapsack, LCS, LIS"],
        ]}
      />

      <H2>Three Implementation Styles</H2>
      <Grid cols={3}>
        <Card title="Pure Recursion" color="danger">
          Natural to write. Exponential time due to recomputation. Use only to understand the subproblem structure. Then add memoization.
        </Card>
        <Card title="Memoization (Top-Down)" color="warning">
          Add a cache to recursion. Compute only what's needed. Easy to derive from recursive solution. O(n) space for memo + call stack.
        </Card>
        <Card title="Tabulation (Bottom-Up)" color="success">
          Fill a table iteratively from base cases. No recursion overhead. Often allows space optimization. Production-preferred approach.
        </Card>
      </Grid>

      <QA q="How do I always know what to put as the DP state?" a="The state must capture everything needed to determine the optimal outcome from that point forward — no more, no less. Start with the function parameters of your recursive solution. If you have rec(i, remaining), your DP table is dp[i][remaining]. Rule of thumb: if removing any parameter of the recursion makes the solution incorrect, that parameter must be in the state. Extra parameters that don't affect the recurrence can be dropped." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — THE THREE PARADIGMS (FIBONACCI)
══════════════════════════════════════════════════════ */
function SectionParadigms() {
  return (
    <div>
      <Note color="success" icon="ti-refresh">
        <strong>Fibonacci is the teaching vehicle for all DP.</strong> It has optimal substructure (fib(n) = fib(n-1) + fib(n-2)) and massively overlapping subproblems (fib(3) computed 5 times in fib(6)). Once you see this, you see DP.
      </Note>

      <H2>Fibonacci — The DP Origin Story</H2>
      <FibViz />

      <H2>The Conversion — Recursion → Memoization → Tabulation</H2>
      <Code>{{cpp:`// STEP 1: Pure recursion — correct but O(2^n)
int fib_rec(int n) {
    if (n <= 1) return n;
    return fib_rec(n-1) + fib_rec(n-2);   // recomputes same subproblems!
}

// STEP 2: Memoize — add cache, O(n) time O(n) space
unordered_map<int,int> memo;
int fib_memo(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];     // return cached result
    return memo[n] = fib_memo(n-1) + fib_memo(n-2);
}

// STEP 3: Tabulate — bottom-up, O(n) time O(n) space
int fib_tab(int n) {
    if (n <= 1) return n;
    vector<int> dp(n+1);
    dp[0]=0; dp[1]=1;
    for (int i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// STEP 4: Space optimize — only need last 2 values, O(1) space
int fib_opt(int n) {
    int a=0, b=1;
    for (int i=2; i<=n; i++) { int c=a+b; a=b; b=c; }
    return n==0?0:b;
}`, python:`# Same progression in Python:
import functools

# Step 1: Recursion O(2^n)
def fib(n): return n if n<=1 else fib(n-1)+fib(n-2)

# Step 2: Memoize using decorator O(n)
@functools.lru_cache(maxsize=None)
def fib_memo(n): return n if n<=1 else fib_memo(n-1)+fib_memo(n-2)

# Step 3: Tabulate O(n)
def fib_tab(n):
    dp = [0, 1] + [0]*(n-1)
    for i in range(2, n+1): dp[i]=dp[i-1]+dp[i-2]
    return dp[n]

# Step 4: Space-optimal O(1)
def fib_opt(n):
    a, b = 0, 1
    for _ in range(n): a, b = b, a+b
    return a`}}</Code>

      <QA q="When should I use top-down (memoization) vs bottom-up (tabulation) in an interview?" a="Both are correct. Memoization is easier to code from scratch — write the recursive solution, add a cache. Use it when: the subproblem space is sparse (not all subproblems are needed), the recursion is natural but the iterative order isn't obvious, or you want to code quickly. Tabulation is preferred when: you need to space-optimize (only need the last row), the iterative order is clear, or you want to avoid stack overflow on large inputs. In interviews, memoization is often faster to write and demonstrate thinking." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — 1D DP PATTERNS
══════════════════════════════════════════════════════ */
function Section1DPatterns() {
  return (
    <div>
      <Note color="info" icon="ti-template">
        <strong>1D DP pattern:</strong> dp[i] depends on dp[i-1], dp[i-2], ... dp[0]. Problems: Climbing Stairs, House Robber, Coin Change. Learn to spot: "at position i, I have a choice — what's the optimal?"
      </Note>

      <H2>Climbing Stairs (LC 70) — The Simplest DP</H2>
      <P>At each stair, you arrive from either 1 step below or 2 steps below. So: <Mx>dp[i] = dp[i-1] + dp[i-2]</Mx>. This is literally Fibonacci! The insight: any "ways to reach position i" problem using fixed steps reduces to this.</P>
      <div style={{ background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:12.5, lineHeight:2.2, marginBottom:14 }}>
        <div style={{ color:'#6A9955', fontSize:12 }}>{'// 5 steps: dp[1]=1, dp[2]=2, dp[3]=3, dp[4]=5, dp[5]=8'}</div>
        <div><span style={{ color:'#9CDCFE' }}>State:</span><span style={{ color:'#7A8599' }}> dp[i] = ways to reach stair i</span></div>
        <div><span style={{ color:'#9CDCFE' }}>Recurrence:</span><span style={{ color:'#CE9178' }}> dp[i] = dp[i-1] + dp[i-2]</span><span style={{ color:'#7A8599' }}>  // came from i-1 OR i-2</span></div>
        <div><span style={{ color:'#9CDCFE' }}>Base cases:</span><span style={{ color:'#4EC9B0' }}> dp[1] = 1, dp[2] = 2</span></div>
        <div><span style={{ color:'#9CDCFE' }}>Answer:</span><span style={{ color:'#DCDCAA' }}> dp[n]</span></div>
      </div>

      <H2>House Robber (LC 198) — Include/Exclude Choice</H2>
      <P>At house i, you choose to rob or skip. If you rob house i, you can't rob house i-1. This "include or exclude current element" pattern is the <strong>backbone of 0-1 Knapsack</strong>.</P>
      <div style={{ background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:12.5, lineHeight:2.2, marginBottom:14 }}>
        <div><span style={{ color:'#9CDCFE' }}>State:</span><span style={{ color:'#7A8599' }}> dp[i] = max money robbing houses 0..i</span></div>
        <div><span style={{ color:'#9CDCFE' }}>Recurrence:</span><span style={{ color:'#CE9178' }}> dp[i] = max(dp[i-1], dp[i-2] + nums[i])</span></div>
        <div style={{ color:'#7A8599', paddingLeft:16 }}>{'//            ↑ skip house i  ↑ rob house i (skip i-1)'}</div>
        <div><span style={{ color:'#9CDCFE' }}>Base cases:</span><span style={{ color:'#4EC9B0' }}> dp[0] = nums[0], dp[1] = max(nums[0], nums[1])</span></div>
        <div><span style={{ color:'#9CDCFE' }}>Answer:</span><span style={{ color:'#DCDCAA' }}> dp[n-1]</span></div>
      </div>
      <Code>{{cpp:`int rob(vector<int>& nums) {
    int n=nums.size();
    if(n==1) return nums[0];
    vector<int> dp(n);
    dp[0]=nums[0]; dp[1]=max(nums[0],nums[1]);
    for(int i=2;i<n;i++)
        dp[i]=max(dp[i-1], dp[i-2]+nums[i]);  // skip OR rob
    return dp[n-1];
}
// Space opt: only need last 2 values
int rob_opt(vector<int>& nums) {
    int prev2=0,prev1=0;
    for(int x:nums) { int cur=max(prev1,prev2+x); prev2=prev1; prev1=cur; }
    return prev1;
}`,python:`def rob(nums):
    if len(nums)==1:return nums[0]
    dp=[0]*len(nums)
    dp[0]=nums[0]; dp[1]=max(nums[0],nums[1])
    for i in range(2,len(nums)):
        dp[i]=max(dp[i-1],dp[i-2]+nums[i])
    return dp[-1]`}}</Code>

      <H2>Coin Change — Minimum Coins (Interactive)</H2>
      <P>For each amount i, try every coin denomination. The key: dp[i] = min over all valid coins of (dp[i−coin] + 1). Step through the table filling below to see every decision.</P>
      <CoinChangeViz />
      <Code>{{cpp:`int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, INT_MAX);
    dp[0]=0;
    for(int i=1;i<=amount;i++)
        for(int c:coins)
            if(c<=i && dp[i-c]!=INT_MAX)
                dp[i]=min(dp[i], dp[i-c]+1);
    return dp[amount]==INT_MAX?-1:dp[amount];
}`,python:`def coin_change(coins, amount):
    dp=[float('inf')]*(amount+1); dp[0]=0
    for i in range(1,amount+1):
        for c in coins:
            if c<=i and dp[i-c]!=float('inf'):
                dp[i]=min(dp[i],dp[i-c]+1)
    return dp[amount] if dp[amount]!=float('inf') else -1`}}</Code>

      <H2>Generalizing 1D DP — The Pattern Template</H2>
      <div style={{ background:'var(--color-background-secondary)', border:'1px solid var(--color-border-secondary)', borderRadius:10, padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:12.5, lineHeight:2 }}>
        {[
          ['Ways to reach target with steps',  'dp[i] = Σ dp[i − step] for each step ≤ i',        'Climb stairs, decode ways'],
          ['Max/min value with choices',       'dp[i] = max(dp[i-1], dp[i-2]+val[i])',            'House robber, max non-adj sum'],
          ['Fewest coins/steps to reach i',   'dp[i] = min(dp[i−coin]+1) for each coin ≤ i',     'Coin change, jump game II'],
          ['Sum of all ways',                  'dp[i] += dp[i−option] for each option',           'Coin change II, decode ways'],
        ].map(([name, rec, ex], i) => (
          <div key={i} style={{ marginBottom:8, display:'flex', gap:8, flexWrap:'wrap' }}>
            <span style={{ color:'var(--color-text-info)', fontWeight:700, minWidth:220 }}>{name}</span>
            <span style={{ color:'var(--color-text-secondary)' }}>→ {rec}</span>
            <span style={{ color:'var(--color-text-tertiary)', fontSize:11 }}>({ex})</span>
          </div>
        ))}
      </div>

      <QA q="How do I choose between 'ways' (addition) vs 'optimal' (min/max) recurrences?" a="'Ways' = count of distinct paths → sum all contributions: dp[i] += dp[i−option]. 'Optimal' = best value → take min/max: dp[i] = min(dp[i−option]+cost). The choice directly mirrors the English: 'how many ways' → sum, 'minimum cost' → min(), 'maximum profit' → max(). Never mix them up." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — LIS & KADANE'S
══════════════════════════════════════════════════════ */
function SectionLISKadane() {
  return (
    <div>
      <H2>Longest Increasing Subsequence (LC 300)</H2>
      <P>Classic O(n²) DP: for each index i, check all j &lt; i. If arr[j] &lt; arr[i], element i can extend the LIS ending at j. The dp[i] value = length of the longest increasing subsequence ending at index i.</P>
      <LISViz />
      <Code>{{cpp:`// O(n²) DP — understand this before the O(n log n) approach
int lengthOfLIS(vector<int>& nums) {
    int n=nums.size(), ans=1;
    vector<int> dp(n,1);
    for(int i=1;i<n;i++) {
        for(int j=0;j<i;j++) {
            if(nums[j]<nums[i])             // can extend
                dp[i]=max(dp[i], dp[j]+1); // extend or don't
        }
        ans=max(ans,dp[i]);
    }
    return ans;
}

// O(n log n) with patience sorting + binary search:
int lis_fast(vector<int>& nums) {
    vector<int> tails;  // tails[i] = smallest tail of all IS of length i+1
    for(int x:nums){
        auto it=lower_bound(tails.begin(),tails.end(),x);
        if(it==tails.end()) tails.push_back(x);   // extend longest IS
        else *it=x;  // replace — maintains smallest possible tail
    }
    return tails.size();
}`, python:`def length_of_lis(nums):
    n=len(nums); dp=[1]*n; ans=1
    for i in range(1,n):
        for j in range(i):
            if nums[j]<nums[i]: dp[i]=max(dp[i],dp[j]+1)
        ans=max(ans,dp[i])
    return ans

# O(n log n) via patience sorting:
import bisect
def lis_fast(nums):
    tails=[]
    for x in nums:
        i=bisect.bisect_left(tails,x)
        if i==len(tails): tails.append(x)
        else: tails[i]=x
    return len(tails)`}}</Code>

      <H2>LIS Variations — Generalizing the Pattern</H2>
      <Table
        heads={["Variant","Change","Recurrence"]}
        rows={[
          ["LIS (strictly increasing)","nums[j] < nums[i]","dp[i] = max(dp[j]+1) for j<i, nums[j]<nums[i]"],
          ["LNS (non-decreasing)","nums[j] ≤ nums[i]","Same but allow equal"],
          ["LDS (decreasing)","nums[j] > nums[i]","Reverse the comparison"],
          ["MSIS (max sum increasing)","Maximize sum not length","dp[i] = max(dp[j]+nums[i]) for j<i, nums[j]<nums[i]"],
          ["Number of LIS","Count all sequences of max length","Maintain len[] and cnt[] arrays"],
        ]}
      />

      <H2>Kadane's Algorithm — Maximum Subarray Sum</H2>
      <P>At each index, either extend the current subarray or start fresh. The "start fresh" choice is the key: if including the previous subarray makes things worse, drop it. O(n) time, O(1) space — DP reduced to two variables.</P>
      <div style={{ background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:'14px 16px', fontFamily:'var(--font-mono)', fontSize:12.5, lineHeight:2.2, marginBottom:14 }}>
        <div><span style={{ color:'#9CDCFE' }}>State:</span><span style={{ color:'#7A8599' }}> dp[i] = max subarray sum ENDING at index i</span></div>
        <div><span style={{ color:'#9CDCFE' }}>Recurrence:</span><span style={{ color:'#CE9178' }}> dp[i] = max(nums[i], dp[i-1] + nums[i])</span></div>
        <div style={{ color:'#7A8599', paddingLeft:16 }}>{'//            ↑ start fresh ↑ extend previous'}</div>
        <div><span style={{ color:'#9CDCFE' }}>Answer:</span><span style={{ color:'#DCDCAA' }}> max(dp[i]) for all i</span></div>
      </div>
      <Code>{{cpp:`int maxSubArray(vector<int>& nums) {
    int maxSum=nums[0], cur=nums[0];
    for(int i=1;i<nums.size();i++){
        cur = max(nums[i], cur+nums[i]);  // extend or restart
        maxSum = max(maxSum, cur);
    }
    return maxSum;
}
// [-2,1,-3,4,-1,2,1,-5,4] → 6 (subarray [4,-1,2,1])`, python:`def max_subarray(nums):
    cur=max_sum=nums[0]
    for x in nums[1:]:
        cur=max(x,cur+x)    # extend or restart
        max_sum=max(max_sum,cur)
    return max_sum`}}</Code>
      <Note color="success" icon="ti-bulb">
        <strong>The key insight:</strong> dp[i-1] &lt; 0 means the entire previous subarray is a liability — starting fresh at nums[i] is always better. This is the classic "include/exclude" choice condensed into a single max() call.
      </Note>

      <QA q="What's the difference between LIS and Longest Increasing Subarray? Can you use the same DP?" a="Subarray = contiguous elements. Subsequence = elements in order but not necessarily adjacent. Subarray LIS (longest increasing contiguous run) is O(n): scan and reset counter whenever nums[i] ≤ nums[i-1]. Subsequence LIS requires the O(n²) or O(n log n) DP because non-adjacent combinations must be considered. The DP here only applies to subsequences — for subarrays, a linear scan suffices." />
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
        4 foundational DP problems — the canonical examples for each 1D DP pattern. Master these and you've mastered the template.
      </Note>

      <ProblemCard num={1} title="Climbing Stairs" difficulty="LC Medium" tags={["LC 70","Fibonacci DP"]}
        statement="You can climb 1 or 2 steps at a time. Count distinct ways to reach the top of an <code>n</code>-step staircase."
        constraints={["1 ≤ n ≤ 45"]}
        examples={[{input:"n=2",output:"2",note:"1+1 or 2"},{input:"n=3",output:"3",note:"1+1+1, 1+2, 2+1"}]}
        approach="State: dp[i] = ways to reach stair i. Recurrence: dp[i] = dp[i-1] + dp[i-2] (came from i-1 OR i-2). Base: dp[1]=1, dp[2]=2. This is Fibonacci with n≥1. Space-optimize to O(1) using two variables."
        code={{cpp:`int climbStairs(int n){
    if(n<=2)return n;
    int a=1,b=2;
    for(int i=3;i<=n;i++){int c=a+b;a=b;b=c;}
    return b;
}`,python:`def climb_stairs(n):
    a,b=1,2
    for _ in range(n-2):a,b=b,a+b
    return b if n>=2 else 1`}}
      />

      <ProblemCard num={2} title="House Robber" difficulty="LC Medium" tags={["LC 198","Include/Exclude"]}
        statement="Given an array of non-negative integers representing house values, find the maximum money you can rob such that no two adjacent houses are robbed."
        constraints={["1 ≤ n ≤ 100","0 ≤ nums[i] ≤ 400"]}
        examples={[{input:"[1,2,3,1]",output:"4",note:"Rob house 0 (1) and house 2 (3)"},{input:"[2,7,9,3,1]",output:"12",note:"Rob house 0,2,4: 2+9+1=12"}]}
        approach="State: dp[i] = max money from first i+1 houses. Choice at each house: rob it (dp[i-2]+nums[i]) or skip it (dp[i-1]). Recurrence: dp[i] = max(dp[i-1], dp[i-2]+nums[i]). This is the TEMPLATE for all include/exclude DP."
        code={{cpp:`int rob(vector<int>& nums){
    if(nums.size()==1)return nums[0];
    int prev2=0,prev1=0;
    for(int x:nums){int cur=max(prev1,prev2+x);prev2=prev1;prev1=cur;}
    return prev1;
}`,python:`def rob(nums):
    prev2=prev1=0
    for x in nums:prev2,prev1=prev1,max(prev1,prev2+x)
    return prev1`}}
      />

      <ProblemCard num={3} title="Coin Change — Minimum Coins" difficulty="LC Medium" tags={["LC 322","1D DP Min"]}
        statement="Given coin denominations and a target amount, return the fewest number of coins to make up that amount, or -1 if impossible."
        constraints={["1 ≤ coins.length ≤ 12","1 ≤ coins[i] ≤ 2³¹-1","0 ≤ amount ≤ 10⁴"]}
        examples={[{input:"coins=[1,2,5], amount=11",output:"3",note:"5+5+1"},{input:"coins=[2], amount=3",output:"-1"}]}
        approach="State: dp[i] = minimum coins for amount i. Recurrence: dp[i] = min(dp[i−c]+1) for each coin c ≤ i. Base: dp[0]=0. Fill left-to-right. Initialize all others to ∞ — if dp[amount] is still ∞ after filling, return -1."
        code={{cpp:`int coinChange(vector<int>& coins,int amount){
    vector<int> dp(amount+1,INT_MAX); dp[0]=0;
    for(int i=1;i<=amount;i++)
        for(int c:coins)
            if(c<=i&&dp[i-c]!=INT_MAX)
                dp[i]=min(dp[i],dp[i-c]+1);
    return dp[amount]==INT_MAX?-1:dp[amount];
}`,python:`def coin_change(coins,amount):
    dp=[float('inf')]*(amount+1);dp[0]=0
    for i in range(1,amount+1):
        for c in coins:
            if c<=i and dp[i-c]!=float('inf'):
                dp[i]=min(dp[i],dp[i-c]+1)
    return dp[amount] if dp[amount]!=float('inf') else -1`}}
      />

      <ProblemCard num={4} title="Longest Increasing Subsequence" difficulty="LC Medium" tags={["LC 300","LIS DP"]}
        statement="Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence."
        constraints={["1 ≤ n ≤ 2500","-10⁴ ≤ nums[i] ≤ 10⁴"]}
        examples={[{input:"[10,9,2,5,3,7,101,18]",output:"4",note:"[2,3,7,101] or [2,5,7,101]"},{input:"[0,1,0,3,2,3]",output:"4"}]}
        approach="State: dp[i] = length of LIS ending at index i. Recurrence: dp[i] = max(dp[j]+1) for all j<i where nums[j]<nums[i]. Answer: max(dp). Time O(n²). For O(n log n): use patience sorting — maintain 'tails' array where tails[k] = smallest tail of all IS of length k+1. Binary search to place each element."
        code={{cpp:`// O(n²) DP
int lengthOfLIS(vector<int>& nums){
    int n=nums.size(),ans=1;
    vector<int> dp(n,1);
    for(int i=1;i<n;i++){
        for(int j=0;j<i;j++)
            if(nums[j]<nums[i]) dp[i]=max(dp[i],dp[j]+1);
        ans=max(ans,dp[i]);
    }
    return ans;
}
// O(n log n): patience sorting
int lis_fast(vector<int>& nums){
    vector<int> tails;
    for(int x:nums){
        auto it=lower_bound(tails.begin(),tails.end(),x);
        if(it==tails.end())tails.push_back(x);
        else *it=x;
    }
    return tails.size();
}`,python:`def length_of_lis(nums):
    dp=[1]*len(nums); ans=1
    for i in range(1,len(nums)):
        for j in range(i):
            if nums[j]<nums[i]:dp[i]=max(dp[i],dp[j]+1)
        ans=max(ans,dp[i])
    return ans`}}
      />
    </div>
  );
}

/* ROOT */
const TABS=[
  {id:'thinking',  label:'DP Thinking Framework'},
  {id:'paradigms', label:'3 Paradigms'},
  {id:'patterns1d',label:'1D DP Patterns'},
  {id:'lisKadane', label:'LIS & Kadane\'s'},
  {id:'problems',  label:'Problems'},
];
export default function DPFundamentals() {
  const [active,setActive]=useState('thinking');
  const map={thinking:<SectionThinking/>,paradigms:<SectionParadigms/>,patterns1d:<Section1DPatterns/>,lisKadane:<SectionLISKadane/>,problems:<SectionProblems/>};
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 23</div>
        <h1 className="page-header-title">Dynamic Programming — Fundamentals</h1>
        <p className="page-header-subtitle">DP Recipe · Fibonacci 3 Ways · 1D Patterns · Coin Change · LIS · Kadane's · LC 70, 198, 322, 300</p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={23}/>
    </div>
  );
}
