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

/* ── 0-1 Knapsack: wt=[1,3,4,5], val=[1,4,5,7], W=7 ── */
const KS_WT = [1,3,4,5], KS_VAL = [1,4,5,7], KS_N = 4, KS_W = 7;
function buildKSSteps() {
  const dp = Array.from({length:KS_N+1},()=>new Array(KS_W+1).fill(0));
  const steps = [];
  steps.push({dp:dp.map(r=>[...r]),cur:null,action:'init',
    desc:`Initialize: dp[i][0]=0 (zero capacity → zero value). dp[0][w]=0 (no items → zero value). Items: [wt=${KS_WT}, val=${KS_VAL}], W=${KS_W}.`});
  for(let i=1;i<=KS_N;i++){
    for(let w=0;w<=KS_W;w++){
      if(KS_WT[i-1]<=w){
        const excl=dp[i-1][w], incl=dp[i-1][w-KS_WT[i-1]]+KS_VAL[i-1];
        dp[i][w]=Math.max(excl,incl);
        steps.push({dp:dp.map(r=>[...r]),cur:{i,w},from:{excl:{i:i-1,w},incl:{i:i-1,w:w-KS_WT[i-1]}},
          action:incl>=excl?'include':'exclude',excl,incl,
          desc:`Item ${i}(wt=${KS_WT[i-1]},val=${KS_VAL[i-1]}), cap=${w}: EXCLUDE→dp[${i-1}][${w}]=${excl}, INCLUDE→dp[${i-1}][${w-KS_WT[i-1]}]+${KS_VAL[i-1]}=${incl}. Take ${incl>=excl?'INCLUDE':'EXCLUDE'}=`+dp[i][w]});
      } else {
        dp[i][w]=dp[i-1][w];
        steps.push({dp:dp.map(r=>[...r]),cur:{i,w},from:{excl:{i:i-1,w},incl:null},
          action:'tooHeavy',excl:dp[i-1][w],incl:null,
          desc:`Item ${i}(wt=${KS_WT[i-1]}) > cap=${w}. Too heavy — can only EXCLUDE. dp[${i}][${w}]=dp[${i-1}][${w}]=${dp[i][w]}`});
      }
    }
  }
  steps.push({dp:dp.map(r=>[...r]),cur:{i:KS_N,w:KS_W},action:'done',
    desc:`Done! dp[${KS_N}][${KS_W}]=${dp[KS_N][KS_W]}. Max value within capacity ${KS_W} = ${dp[KS_N][KS_W]}.`});
  return steps;
}
const KS_STEPS = buildKSSteps();

/* ── LCS: X="ABCD", Y="ACD" ─────────────────────────── */
const LCS_X = "ABCD", LCS_Y = "ACD";
function buildLCSSteps() {
  const n=LCS_X.length, m=LCS_Y.length;
  const dp=Array.from({length:n+1},()=>new Array(m+1).fill(0));
  const steps=[];
  steps.push({dp:dp.map(r=>[...r]),cur:null,match:null,action:'init',
    desc:`LCS of "${LCS_X}" and "${LCS_Y}". Base: first row/col all 0. Recurrence: match→dp[i-1][j-1]+1, no match→max(dp[i-1][j], dp[i][j-1]).`});
  for(let i=1;i<=n;i++){
    for(let j=1;j<=m;j++){
      const isMatch=LCS_X[i-1]===LCS_Y[j-1];
      if(isMatch){
        dp[i][j]=dp[i-1][j-1]+1;
        steps.push({dp:dp.map(r=>[...r]),cur:{i,j},match:true,action:'match',
          desc:`X[${i-1}]='${LCS_X[i-1]}' == Y[${j-1}]='${LCS_Y[j-1]}' ✓ → dp[${i}][${j}]=dp[${i-1}][${j-1}]+1=${dp[i][j]}`});
      } else {
        dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
        steps.push({dp:dp.map(r=>[...r]),cur:{i,j},match:false,action:'noMatch',
          desc:`X[${i-1}]='${LCS_X[i-1]}' ≠ Y[${j-1}]='${LCS_Y[j-1]}' → dp[${i}][${j}]=max(up=${dp[i-1][j]},left=${dp[i][j-1]})=${dp[i][j]}`});
      }
    }
  }
  steps.push({dp:dp.map(r=>[...r]),cur:{i:n,j:m},action:'done',
    desc:`LCS length=${dp[n][m]}. Backtrack from dp[${n}][${m}]: when match, take char and go diagonal; else go in direction of larger neighbor. LCS="ACD".`});
  return steps;
}
const LCS_STEPS = buildLCSSteps();

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — 0-1 KNAPSACK 2D TABLE
══════════════════════════════════════════════════════ */
function KnapsackViz() {
  const [step, setStep] = useState(0);
  const s = KS_STEPS[Math.min(step, KS_STEPS.length-1)];
  const { dp, cur, from, excl, incl, action } = s;

  const cellColor = (i, w) => {
    if (action==='done' && i===KS_N && w===KS_W) return 'success';
    if (cur && i===cur.i && w===cur.w) return action==='tooHeavy'?'secondary':action==='include'?'success':'info';
    if (from) {
      if (from.excl && i===from.excl.i && w===from.excl.w) return 'info';
      if (from.incl && i===from.incl.i && w===from.incl.w) return 'warning';
    }
    return null;
  };

  const ITEMS_DISPLAY = KS_WT.map((w,i)=>`${i+1}(w=${w},v=${KS_VAL[i]})`);

  return (
    <VizBox>
      <div style={{marginBottom:10,display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        {action!=='init'&&<span style={{padding:'2px 9px',borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${action==='include'?'success':action==='tooHeavy'?'secondary':action==='done'?'success':'info'})`,color:`var(--color-text-${action==='include'?'success':action==='tooHeavy'?'tertiary':action==='done'?'success':'info'})`,border:`1px solid var(--color-border-${action==='include'?'success':action==='tooHeavy'?'secondary':action==='done'?'success':'info'})`,whiteSpace:'nowrap'}}>
          {action==='include'?'Include ✓':action==='exclude'?'Exclude':action==='tooHeavy'?'Too Heavy':action==='done'?'Done ✓':'Init'}
        </span>}
        <span style={{fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>{s.desc}</span>
      </div>

      {/* Recurrence always visible */}
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:8,padding:'8px 14px',fontFamily:'var(--font-mono)',fontSize:12,lineHeight:2,marginBottom:12}}>
        <div style={{color:'#9CDCFE'}}>dp[i][w] = <span style={{color:'#CE9178'}}>max</span>(<span style={{color:'#81B4EA'}}>dp[i-1][w]</span>, <span style={{color:'#CE9178'}}>dp[i-1][w-wt[i]] + val[i]</span>)  <span style={{color:'#6A9955'}}>{'{/* if wt[i] ≤ w */'}</span></div>
        <div style={{color:'#9CDCFE'}}>dp[i][w] = <span style={{color:'#81B4EA'}}>dp[i-1][w]</span>  <span style={{color:'#6A9955'}}>{'{/* else: item too heavy */'}</span></div>
      </div>

      {/* 2D Table */}
      <div style={{overflowX:'auto',marginBottom:12}}>
        <table style={{borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{padding:'4px 8px',fontFamily:'var(--font-mono)',fontSize:10,color:'var(--color-text-tertiary)',borderBottom:'1px solid #1E2233',textAlign:'center'}}>i\w</th>
              {Array.from({length:KS_W+1},(_,w)=>(
                <th key={w} style={{padding:'4px 8px',fontFamily:'var(--font-mono)',fontSize:10.5,color:'var(--color-text-secondary)',borderBottom:'1px solid #1E2233',textAlign:'center',minWidth:36}}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dp.map((row,i)=>(
              <tr key={i}>
                <td style={{padding:'4px 8px',fontFamily:'var(--font-mono)',fontSize:10,color:cur&&i===cur.i?'var(--color-text-warning)':'var(--color-text-tertiary)',borderRight:'1px solid #1E2233',whiteSpace:'nowrap'}}>
                  {i===0?'∅':ITEMS_DISPLAY[i-1]}
                </td>
                {row.map((val,w)=>{
                  const c=cellColor(i,w);
                  return (
                    <td key={w} style={{padding:'4px 6px',textAlign:'center'}}>
                      <div style={{width:34,height:32,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5,border:`1.5px solid ${c?`var(--color-border-${c})`:'#1E2233'}`,background:c?`var(--color-background-${c})`:'#131722',fontFamily:'var(--font-mono)',fontSize:12,fontWeight:c?700:400,color:c?`var(--color-text-${c})`:'#4A5170',transition:'all 0.15s'}}>
                        {val}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{display:'flex',gap:10,marginBottom:12,flexWrap:'wrap'}}>
        {[{c:'success',l:'Include (or Done)'},{c:'info',l:'Exclude value dp[i-1][w]'},{c:'warning',l:'Include value dp[i-1][w-wt]'},{c:'secondary',l:'Too heavy'}].map(({c,l})=>(
          <div key={c} style={{display:'flex',alignItems:'center',gap:5,fontSize:11}}>
            <div style={{width:10,height:10,borderRadius:2,background:`var(--color-background-${c})`,border:`1px solid var(--color-border-${c})`}}/>
            <span style={{color:'var(--color-text-secondary)'}}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(KS_STEPS.length-1,step+1)),step===KS_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:64,textAlign:'center',alignSelf:'center'}}>{step+1}/{KS_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(KS_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — LCS 2D TABLE
══════════════════════════════════════════════════════ */
function LCSViz() {
  const [step, setStep] = useState(0);
  const s = LCS_STEPS[Math.min(step, LCS_STEPS.length-1)];
  const n = LCS_X.length, m = LCS_Y.length;

  const cellColor = (i, j) => {
    if (s.action==='done') return i===n&&j===m?'success':null;
    if (!s.cur) return null;
    if (i===s.cur.i&&j===s.cur.j) return s.action==='match'?'success':'warning';
    if (i===s.cur.i-1&&j===s.cur.j-1&&s.action==='match') return 'info';
    if (i===s.cur.i-1&&j===s.cur.j&&s.action==='noMatch') return 'info';
    if (i===s.cur.i&&j===s.cur.j-1&&s.action==='noMatch') return 'info';
    return null;
  };

  return (
    <VizBox>
      <div style={{marginBottom:10,display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        {s.action!=='init'&&<span style={{padding:'2px 9px',borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${s.action==='match'?'success':s.action==='done'?'success':'warning'})`,color:`var(--color-text-${s.action==='match'?'success':s.action==='done'?'success':'warning'})`,border:`1px solid var(--color-border-${s.action==='match'?'success':s.action==='done'?'success':'warning'})`,whiteSpace:'nowrap'}}>
          {s.action==='match'?'Match — go diagonal':s.action==='done'?'Done ✓':'No match — take max'}
        </span>}
        <span style={{fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>{s.desc}</span>
      </div>

      {/* Recurrence */}
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:8,padding:'8px 14px',fontFamily:'var(--font-mono)',fontSize:12,lineHeight:2,marginBottom:12}}>
        <div style={{color:'#9CDCFE'}}>if X[i-1]==Y[j-1]: dp[i][j] = <span style={{color:'#4EC9B0'}}>dp[i-1][j-1] + 1</span>  <span style={{color:'#6A9955'}}>{/* match → diagonal + 1 */}</span></div>
        <div style={{color:'#9CDCFE'}}>else:           dp[i][j] = <span style={{color:'#CE9178'}}>max(dp[i-1][j], dp[i][j-1])</span>  <span style={{color:'#6A9955'}}>{/* no match → best of skip */}</span></div>
      </div>

      {/* 2D Table */}
      <div style={{overflowX:'auto',marginBottom:12}}>
        <table style={{borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{padding:'4px 8px',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',borderBottom:'1px solid #1E2233'}}></th>
              <th style={{padding:'4px 8px',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',borderBottom:'1px solid #1E2233',textAlign:'center'}}>""</th>
              {LCS_Y.split('').map((c,j)=>(<th key={j} style={{padding:'4px 8px',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:'var(--color-text-info)',borderBottom:'1px solid #1E2233',textAlign:'center',minWidth:38}}>{c}</th>))}
            </tr>
          </thead>
          <tbody>
            {s.dp.map((row,i)=>(
              <tr key={i}>
                <td style={{padding:'4px 8px',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:s.cur&&i===s.cur.i?'var(--color-text-warning)':'var(--color-text-success)',borderRight:'1px solid #1E2233',textAlign:'center'}}>
                  {i===0?'""':LCS_X[i-1]}
                </td>
                {row.map((val,j)=>{
                  const c=cellColor(i,j);
                  return (
                    <td key={j} style={{padding:'4px 5px',textAlign:'center'}}>
                      <div style={{width:36,height:34,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5,border:`1.5px solid ${c?`var(--color-border-${c})`:'#1E2233'}`,background:c?`var(--color-background-${c})`:'#131722',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:c?700:400,color:c?`var(--color-text-${c})`:'#4A5170',transition:'all 0.15s'}}>
                        {val}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{display:'flex',gap:10,marginBottom:12,flexWrap:'wrap'}}>
        {[{c:'success',l:'Match — dp[i-1][j-1]+1'},{c:'warning',l:'Current cell'},{c:'info',l:'Source cells'}].map(({c,l})=>(
          <div key={c} style={{display:'flex',alignItems:'center',gap:5,fontSize:11}}>
            <div style={{width:10,height:10,borderRadius:2,background:`var(--color-background-${c})`,border:`1px solid var(--color-border-${c})`}}/>
            <span style={{color:'var(--color-text-secondary)'}}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(LCS_STEPS.length-1,step+1)),step===LCS_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{LCS_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(LCS_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
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
   SECTION 1 — 0-1 KNAPSACK (THE MOTHER TEMPLATE)
══════════════════════════════════════════════════════ */
function SectionKnapsack01() {
  return (
    <div>
      <Note color="info" icon="ti-box">
        <strong>0-1 Knapsack is the mother of all DP problems.</strong> Every subset selection problem — whether it asks for max value, subset sum, partition, or count — is a knapsack variant. Master this template and you have a framework for 30+ problems.
      </Note>

      <H2>The Template — Include or Exclude</H2>
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:10,padding:'16px 18px',marginBottom:16}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:12.5,lineHeight:2.3}}>
          <div style={{color:'#6A9955',marginBottom:4}}>{'// THE UNIVERSAL KNAPSACK QUESTION: at each item, do we include it or exclude it?'}</div>
          {[['State',  '#9CDCFE', 'dp[i][w] = best value using items 1..i with capacity w'],
            ['Recur',  '#CE9178', 'dp[i][w] = max(dp[i-1][w],  dp[i-1][w-wt[i]] + val[i])'],
            ['',       '#7A8599', '          ↑ exclude item i    ↑ include item i (if wt[i] ≤ w)'],
            ['Base',   '#4EC9B0', 'dp[0][w] = 0 (no items),  dp[i][0] = 0 (no capacity)'],
            ['Answer', '#DCDCAA', 'dp[n][W]'],
          ].map(([l,c,t],i)=>(
            <div key={i} style={{display:'flex',gap:12}}>
              <span style={{color:'#3D4460',minWidth:52,fontWeight:700}}>{l}</span>
              <span style={{color:c}}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <H2>Interactive 2D Table — Step Through Every Cell</H2>
      <P>Items: wt=[1,3,4,5], val=[1,4,5,7], capacity=7. Watch the include/exclude decision at each cell. The final answer is always at dp[n][W].</P>
      <KnapsackViz />

      <H2>The Code</H2>
      <Code>{{cpp:`int knapsack(int wt[], int val[], int W, int n) {
    // dp[i][w] = max value using items 0..i-1 with capacity w
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));

    for (int i=1; i<=n; i++) {
        for (int w=0; w<=W; w++) {
            // EXCLUDE item i (always available)
            dp[i][w] = dp[i-1][w];
            // INCLUDE item i (only if it fits)
            if (wt[i-1] <= w)
                dp[i][w] = max(dp[i][w], dp[i-1][w-wt[i-1]] + val[i-1]);
        }
    }
    return dp[n][W];
}
// Space optimization — 1D array (process w from HIGH to LOW to avoid using same item twice):
int knapsack1D(int wt[], int val[], int W, int n) {
    vector<int> dp(W+1, 0);
    for (int i=0; i<n; i++)
        for (int w=W; w>=wt[i]; w--)    // REVERSE: ensures item used at most once
            dp[w] = max(dp[w], dp[w-wt[i]] + val[i]);
    return dp[W];
}`,python:`def knapsack(wt, val, W, n):
    dp=[[0]*(W+1) for _ in range(n+1)]
    for i in range(1,n+1):
        for w in range(W+1):
            dp[i][w]=dp[i-1][w]  # exclude
            if wt[i-1]<=w:
                dp[i][w]=max(dp[i][w], dp[i-1][w-wt[i-1]]+val[i-1])
    return dp[n][W]

# 1D space-optimized (iterate w HIGH to LOW):
def knapsack_1d(wt, val, W, n):
    dp=[0]*(W+1)
    for i in range(n):
        for w in range(W, wt[i]-1, -1):  # reverse iteration
            dp[w]=max(dp[w], dp[w-wt[i]]+val[i])
    return dp[W]`}}</Code>

      <Note color="warning" icon="ti-arrow-right">
        <strong>The 1D space trick:</strong> Iterating w from HIGH to LOW ensures that when we compute dp[w], dp[w-wt[i]] still holds the value from the previous row (item i-1 not included yet). If we iterated LOW to HIGH, we'd accidentally allow item i to be included multiple times — that's Unbounded Knapsack!
      </Note>

      <QA q="How do I know when to use 0-1 knapsack vs unbounded knapsack?" a="The only difference: in 0-1, each item can be used AT MOST ONCE. In unbounded, each item can be used UNLIMITED times. In the code: 0-1 uses dp[i-1][w-wt[i]] (previous row — item not yet included). Unbounded uses dp[i][w-wt[i]] (SAME row — item can be included again). In the 1D optimization: 0-1 iterates w from HIGH to LOW. Unbounded iterates w from LOW to HIGH." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — KNAPSACK VARIATIONS (SUBSET SUM FAMILY)
══════════════════════════════════════════════════════ */
function SectionKnapsackVariations() {
  return (
    <div>
      <Note color="success" icon="ti-git-branch">
        All subset sum problems are <strong>0-1 Knapsack in disguise</strong>. The capacity = target sum. The "weight" of each item = the element's value. What changes between problems: the initial state, the recurrence operation (max/bool/count), and what you return.
      </Note>

      <H2>The Reduction Map — How All Variants Connect</H2>
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:10,padding:'16px 18px',marginBottom:16}}>
        <Table
          heads={["Problem","Init","Recurrence change","Return","Example"]}
          rows={[
            ["Subset Sum",       "dp[0]=T",  "dp[i][w] = dp[i-1][w] OR dp[i-1][w-arr[i]]","dp[n][target]","[2,3,7,8], target=11 → T"],
            ["Equal Partition",  "Same",     "Same as subset sum",                         "dp[n][sum/2] (sum must be even)","[1,5,11,5] → T"],
            ["Count Subsets",    "dp[0]=1",  "dp[i][w] += dp[i-1][w-arr[i]]",             "dp[n][target]","[2,3,5,6], k=10 → 2"],
            ["Min Subset Diff",  "Boolean",  "Same as subset sum — find all reachable sums","min|S-total| where dp[n][S]=T","[1,6,11,5] → 1"],
            ["Target Sum ±",     "Count",    "Reduce: S1-S2=diff, S1+S2=total → S1=(total+diff)/2","count_subsets((total+diff)/2)","[1,1,2,3], diff=1 → 3"],
          ]}
        />
      </div>

      <H2>Subset Sum — Boolean 2D Table</H2>
      <Code>{{cpp:`bool subsetSum(vector<int>& arr, int target) {
    int n=arr.size();
    // dp[i][w] = can we form sum w using arr[0..i-1]?
    vector<vector<bool>> dp(n+1, vector<bool>(target+1, false));
    for(int i=0; i<=n; i++) dp[i][0]=true; // empty subset sums to 0

    for(int i=1; i<=n; i++){
        for(int w=0; w<=target; w++){
            dp[i][w] = dp[i-1][w];                    // exclude arr[i-1]
            if(arr[i-1]<=w)
                dp[i][w] = dp[i][w] || dp[i-1][w-arr[i-1]]; // include
        }
    }
    return dp[n][target];
}
// arr[]={2,3,7,8}, target=11 → true (3+8 or 2+2+7... etc.)`, python:`def subset_sum(arr, target):
    n=len(arr)
    dp=[[False]*(target+1) for _ in range(n+1)]
    for i in range(n+1): dp[i][0]=True
    for i in range(1,n+1):
        for w in range(target+1):
            dp[i][w]=dp[i-1][w]
            if arr[i-1]<=w: dp[i][w]=dp[i][w] or dp[i-1][w-arr[i-1]]
    return dp[n][target]`}}</Code>

      <H2>Count Subsets — Change OR to +=</H2>
      <Code>{{cpp:`int countSubsets(vector<int>& arr, int target) {
    int n=arr.size();
    vector<vector<int>> dp(n+1, vector<int>(target+1, 0));
    for(int i=0; i<=n; i++) dp[i][0]=1; // 1 way to make sum 0: empty subset

    for(int i=1; i<=n; i++){
        for(int w=0; w<=target; w++){
            dp[i][w] = dp[i-1][w];                    // ways WITHOUT arr[i-1]
            if(arr[i-1]<=w) dp[i][w] += dp[i-1][w-arr[i-1]]; // ways WITH arr[i-1]
        }
    }
    return dp[n][target];
}`, python:`def count_subsets(arr, target):
    n=len(arr)
    dp=[[0]*(target+1) for _ in range(n+1)]
    for i in range(n+1): dp[i][0]=1
    for i in range(1,n+1):
        for w in range(target+1):
            dp[i][w]=dp[i-1][w]
            if arr[i-1]<=w: dp[i][w]+=dp[i-1][w-arr[i-1]]
    return dp[n][target]`}}</Code>

      <H2>Minimum Subset Difference — Two Passes</H2>
      <Code>{{cpp:`int minSubsetDiff(vector<int>& arr) {
    int n=arr.size(), total=accumulate(arr.begin(),arr.end(),0);
    // Find all achievable sums in [0..total/2] for the "first" subset
    vector<bool> dp(total+1, false); dp[0]=true;
    for(int x:arr) for(int w=total;w>=x;w--) dp[w]=dp[w]||dp[w-x];
    // Minimize: |total - 2*S1| where dp[S1]=true and S1≤total/2
    for(int s=total/2;s>=0;s--)
        if(dp[s]) return total-2*s;
    return 0;
}
// The possible "first subset sum" S1 closest to total/2
// gives minimum difference = total - 2*S1`, python:`def min_subset_diff(arr):
    total=sum(arr)
    dp=[False]*(total+1); dp[0]=True
    for x in arr:
        for w in range(total,x-1,-1): dp[w]=dp[w] or dp[w-x]
    for s in range(total//2,-1,-1):
        if dp[s]:return total-2*s`}}</Code>

      <H2>Target Sum (± Signs) — Reduction to Count Subsets</H2>
      <P>Assign + or − to each element. If S1 = elements with +, S2 = elements with −, then S1 − S2 = target and S1 + S2 = total. So S1 = (total + target) / 2. Count subsets summing to S1.</P>
      <Code>{{cpp:`int targetSum(vector<int>& arr, int target) {
    int total=accumulate(arr.begin(),arr.end(),0);
    // Must have (total+target) even and target ≤ total
    if((total+target)%2!=0 || abs(target)>total) return 0;
    int S1=(total+target)/2;
    return countSubsets(arr, S1);  // reuse count subsets function!
}
// arr=[1,1,2,3], target=1 → total=7, S1=(7+1)/2=4
// Count subsets summing to 4: {1,3},{1,3},{1,1,2} → 3`, python:`def target_sum(arr,target):
    total=sum(arr)
    if(total+target)%2!=0 or abs(target)>total:return 0
    return count_subsets(arr,(total+target)//2)`}}</Code>

      <QA q="Why does the 'equal partition' problem require the total sum to be even?" a="If we split array into S1 and S2 with S1=S2, then S1+S2=total and S1=S2=total/2. If total is odd, total/2 is not an integer — no integer subset can sum to a non-integer. So we immediately return false if total%2==1. This is a quick validity check before running the full DP." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — UNBOUNDED KNAPSACK
══════════════════════════════════════════════════════ */
function SectionUnbounded() {
  return (
    <div>
      <Note color="warning" icon="ti-refresh">
        <strong>Unbounded Knapsack</strong>: each item can be used unlimited times. The only change from 0-1: access dp[i][w-wt[i]] (same row = same item CAN be reused) instead of dp[i-1][w-wt[i]].
      </Note>

      <H2>The Single Change From 0-1</H2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
        {[['0-1 Knapsack','danger','dp[i-1][w-wt[i]] + val[i]','Previous row: item not yet considered again'],
          ['Unbounded Knapsack','success','dp[i][w-wt[i]] + val[i]','Same row: item can be reused immediately']].map(([label,c,code,desc])=>(
          <div key={label} style={{padding:'12px 14px',borderRadius:'var(--border-radius-md)',border:`1px solid var(--color-border-${c})`,background:`var(--color-background-${c})`}}>
            <div style={{fontSize:12.5,fontWeight:700,color:`var(--color-text-${c})`,marginBottom:6}}>{label}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:`var(--color-text-${c})`,marginBottom:4}}>{code}</div>
            <div style={{fontSize:11.5,color:`var(--color-text-${c})`,opacity:0.8}}>{desc}</div>
          </div>
        ))}
      </div>

      <H2>Rod Cutting Problem</H2>
      <P>Cut a rod of length n into pieces to maximize total value. Each length has a price. The rod can be cut into any number of pieces of any length — effectively unbounded knapsack where each "weight" = length and you can reuse each length.</P>
      <Code>{{cpp:`int rodCutting(int price[], int n) {
    // length[i] = i+1 (rod of length 1..n)
    // price[i] = value of rod of length i+1
    // This is unbounded knapsack: items are rod-length pieces, W=n
    vector<int> dp(n+1, 0);
    for(int i=1; i<=n; i++) {          // for each rod length i
        for(int w=i; w<=n; w++) {      // iterate LOW to HIGH (unbounded!)
            dp[w] = max(dp[w], dp[w-i]+price[i-1]);
        }
    }
    return dp[n];
}
// price=[1,5,8,9,10,17,17,20], n=8 → 22 (cut into {6,2} → 17+5)
// Contrast: if 0-1 (each length once), iterate w from HIGH to LOW`, python:`def rod_cutting(price, n):
    dp=[0]*(n+1)
    for i in range(1,n+1):         # each rod length i
        for w in range(i,n+1):     # LOW to HIGH = unbounded
            dp[w]=max(dp[w],dp[w-i]+price[i-1])
    return dp[n]`}}</Code>

      <H2>Coin Change — Number of Ways (LC 518)</H2>
      <P>Count combinations summing to target — coin reuse allowed. Unbounded knapsack where val=1 and we sum (+=) instead of maximize. The LOW-to-HIGH iteration allows reusing the same coin denomination.</P>
      <Code>{{cpp:`int coinChangeWays(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, 0);
    dp[0]=1;  // 1 way to make sum 0 (use no coins)
    for(int c:coins)
        for(int w=c; w<=amount; w++)  // LOW to HIGH = unbounded (coin reuse)
            dp[w] += dp[w-c];         // count += ways to make (w-c)
    return dp[amount];
}
// coins=[1,2,3], amount=5 → 5 ways ({1,1,1,1,1},{1,1,3},{1,2,2},{2,3},{1,1,1,2})`, python:`def coin_change_ways(coins, amount):
    dp=[0]*(amount+1); dp[0]=1
    for c in coins:
        for w in range(c,amount+1):   # unbounded: LOW to HIGH
            dp[w]+=dp[w-c]
    return dp[amount]`}}</Code>

      <Note color="info" icon="ti-bulb">
        <strong>Combinations vs Permutations:</strong> Outer loop over items → inner loop over amounts gives <em>combinations</em> (order doesn't matter). Outer loop over amounts → inner loop over items gives <em>permutations</em> (order matters, different orderings counted separately).
      </Note>

      <H2>Unbounded Knapsack Variations Map</H2>
      <Table
        heads={["Problem","Change","Key"]}
        rows={[
          ["Rod cutting","Items = rod lengths, val = price","Unbounded: LOW→HIGH inner loop"],
          ["Coin change (ways)","val=1, operation=+=","Combinations: items outer, amount inner"],
          ["Coin change (min coins)","operation=min instead of +=","Same as bounded min-coin (already done in Module 23)"],
          ["Perfect Squares (LC 279)","items = {1,4,9,16...}, min count","min(dp[w], dp[w-sq]+1) for each sq ≤ w"],
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — LCS FAMILY
══════════════════════════════════════════════════════ */
function SectionLCS() {
  return (
    <div>
      <Note color="success" icon="ti-letter-case">
        <strong>LCS is the mother template for all string DP.</strong> Every string transformation problem — SCS, min insert/delete, LPS, palindrome partition — reduces to computing LCS between two strings (often a string and its reverse).
      </Note>

      <H2>LCS Base Template — Interactive 2D Table</H2>
      <P>Strings X="ABCD" and Y="ACD". The 2D table grows by matching characters diagonally and propagating the maximum. The LCS is reconstructed by backtracking through the table.</P>
      <LCSViz />

      <H2>The LCS Template</H2>
      <Code>{{cpp:`int lcs(string X, string Y) {
    int n=X.size(), m=Y.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(X[i-1]==Y[j-1])
                dp[i][j] = dp[i-1][j-1]+1;    // MATCH → diagonal + 1
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]); // SKIP → take max
        }
    }
    return dp[n][m];
}
// Time: O(n×m)  Space: O(n×m)  reducible to O(m)`, python:`def lcs(X, Y):
    n,m=len(X),len(Y)
    dp=[[0]*(m+1) for _ in range(n+1)]
    for i in range(1,n+1):
        for j in range(1,m+1):
            if X[i-1]==Y[j-1]: dp[i][j]=dp[i-1][j-1]+1
            else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])
    return dp[n][m]`}}</Code>

      <H2>The LCS Reduction Map — Generalize Everything</H2>
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:10,padding:'16px 18px',marginBottom:16}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:11.5,lineHeight:2.5}}>
          {[
            ['Longest Common Substring',  'success', 'dp[i][j]=dp[i-1][j-1]+1 if match, ELSE 0 (reset!). Track max.',         'Contiguous run — reset on mismatch'],
            ['Print LCS',                 'info',    'Backtrack dp table: if match go diagonal, else go to larger neighbor.',  '"ABCD","ACD" → "ACD"'],
            ['Shortest Common Superseq',  'warning', '|X|+|Y|−LCS(X,Y)',                                                     '"geek","eke" → 4+3−3=4'],
            ['Min Insert+Delete A→B',     'warning', 'del=|A|−LCS(A,B), ins=|B|−LCS(A,B)',                                  '"heap","pea" → del=2,ins=1'],
            ['Longest Palindromic Subseq','purple',  'LCS(S, reverse(S))',                                                   '"agbcba" → LCS("agbcba","abcbga")=5'],
            ['Min Del for Palindrome',    'purple',  '|S|−LPS(S)',                                                           '"agbcba": 6−5=1'],
            ['Min Insert for Palindrome', 'purple',  '|S|−LPS(S)  (same formula!)',                                         '"aebcbda": 7−LPS=1'],
            ['Longest Repeating Subseq',  'danger',  'LCS(S,S) but forbid i==j: dp[i][j]=dp[i-1][j-1]+1 ONLY if i≠j',      '"AABEBCDD" → LCS forbid same-index → "ABD"'],
            ['Sequence Pattern Match',    'secondary','LCS(A,B)==|A|',                                                       '"AXY" in "ADXCPY"? LCS=3=|"AXY"| → True'],
          ].map(([name,c,rule,example])=>(
            <div key={name} style={{display:'flex',gap:12,marginBottom:4,flexWrap:'wrap'}}>
              <span style={{color:`var(--color-text-${c})`,fontWeight:700,minWidth:200,flexShrink:0}}>{name}</span>
              <span style={{color:'var(--color-text-secondary)',flex:1}}>{rule}</span>
              <span style={{color:'var(--color-text-tertiary)',fontSize:10.5,minWidth:140}}>{example}</span>
            </div>
          ))}
        </div>
      </div>

      <H2>Longest Common Substring (different from Subsequence)</H2>
      <Code>{{cpp:`int longestCommonSubstring(string X, string Y) {
    int n=X.size(), m=Y.size(), maxLen=0;
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(X[i-1]==Y[j-1]){
                dp[i][j]=dp[i-1][j-1]+1;  // extend the CONTIGUOUS run
                maxLen=max(maxLen,dp[i][j]);
            }
            // else dp[i][j]=0 (already initialized to 0 — RESET on mismatch!)
        }
    }
    return maxLen;
}
// "abcde","abfde" → max cell in table = 2 ("ab" or "de")
// KEY DIFFERENCE: substring resets to 0 on mismatch; subsequence takes max of neighbors`, python:`def longest_common_substring(X,Y):
    n,m=len(X),len(Y); dp=[[0]*(m+1) for _ in range(n+1)]; mx=0
    for i in range(1,n+1):
        for j in range(1,m+1):
            if X[i-1]==Y[j-1]:dp[i][j]=dp[i-1][j-1]+1;mx=max(mx,dp[i][j])
            # else: already 0
    return mx`}}</Code>

      <H2>Shortest Common Supersequence (SCS)</H2>
      <Code>{{cpp:`int scsLength(string X, string Y) {
    return X.size() + Y.size() - lcs(X,Y); // include all chars; shared LCS chars counted once
}
string scsPrint(string X, string Y) {
    // Backtrack dp table: if match, include once; else include the skip direction char
    int n=X.size(), m=Y.size();
    // ... compute dp table ...
    string res=""; int i=n, j=m;
    while(i>0 && j>0){
        if(X[i-1]==Y[j-1]){ res+=X[i-1]; i--;j--; }
        else if(dp[i-1][j]>dp[i][j-1]){ res+=X[i-1]; i--; }
        else { res+=Y[j-1]; j--; }
    }
    while(i>0){ res+=X[i-1]; i--; }
    while(j>0){ res+=Y[j-1]; j--; }
    reverse(res.begin(),res.end()); return res;
}`, python:`def scs_length(X,Y): return len(X)+len(Y)-lcs(X,Y)`}}</Code>

      <QA q="Why is LPS (Longest Palindromic Subsequence) equal to LCS(S, reverse(S))?" a="A palindrome reads the same forwards and backwards. So the longest palindromic subsequence of S is the longest sequence that appears in S reading forwards AND appears in S reading backwards — which is exactly LCS(S, reverse(S)). Example: S='agbcba', reverse='abcbga'. Their LCS='abcba' (length 5). The shared subsequence of S and its reverse is guaranteed to be a palindrome because it appears in order in S AND in the reversed S." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — MCM & INTERVAL DP PATTERN
══════════════════════════════════════════════════════ */
function SectionMCM() {
  return (
    <div>
      <Note color="purple" icon="ti-brackets">
        <strong>Matrix Chain Multiplication (MCM)</strong> introduces a new DP paradigm: <em>interval DP</em>. Instead of making a choice on a prefix, we make a choice on where to split an interval. The pattern: dp[i][j] = optimize over all splits k in range [i, j-1].
      </Note>

      <H2>The MCM Pattern Template</H2>
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:10,padding:'16px 18px',marginBottom:16}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:12.5,lineHeight:2.3}}>
          {[['State',  '#9CDCFE', 'dp[i][j] = optimal value for the subproblem on interval [i..j]'],
            ['Recur',  '#CE9178', 'dp[i][j] = min/max over all splits k: cost(i,k) + dp[i][k] + dp[k+1][j] + cost(k,j)'],
            ['',       '#7A8599', '                ↑ left sub-problem  ↑ right sub-problem  ↑ cost to combine'],
            ['Base',   '#4EC9B0', 'dp[i][i] = 0 (single element always costs nothing to "multiply")'],
            ['Order',  '#DCDCAA', 'Fill by increasing INTERVAL LENGTH (len=2,3,...,n)'],
          ].map(([l,c,t],i)=>(
            <div key={i} style={{display:'flex',gap:12}}>
              <span style={{color:'#3D4460',minWidth:52,fontWeight:700}}>{l}</span>
              <span style={{color:c}}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <H2>Matrix Chain Multiplication</H2>
      <P>Find the minimum number of scalar multiplications to multiply matrices M1×M2×...×Mn. Each split k means: multiply left group [i..k] and right group [k+1..j], then combine. The cost to combine is arr[i-1]×arr[k]×arr[j].</P>
      <Code>{{cpp:`int mcm(int arr[], int n) {
    // arr[i-1] × arr[i] = dimensions of matrix i
    vector<vector<int>> dp(n, vector<int>(n, 0));
    // dp[i][j] = min cost to multiply matrices i..j (1-indexed in arr)

    for(int len=2; len<n; len++){          // interval length
        for(int i=1; i<n-len+1; i++){
            int j=i+len-1;
            dp[i][j]=INT_MAX;
            for(int k=i; k<j; k++){        // try all split points
                int cost = dp[i][k] + dp[k+1][j] + arr[i-1]*arr[k]*arr[j];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[1][n-1];
}
// arr={40,20,30,10,30} → 4 matrices: 40×20, 20×30, 30×10, 10×30
// Answer: 26000`, python:`def mcm(arr):
    n=len(arr); dp=[[0]*n for _ in range(n)]
    for ln in range(2,n):            # interval length
        for i in range(1,n-ln+1):
            j=i+ln-1; dp[i][j]=float('inf')
            for k in range(i,j):    # split point
                cost=dp[i][k]+dp[k+1][j]+arr[i-1]*arr[k]*arr[j]
                dp[i][j]=min(dp[i][j],cost)
    return dp[1][n-1]`}}</Code>

      <H2>Palindrome Partitioning — MCM Pattern</H2>
      <P>Find minimum cuts to make every partition a palindrome. dp[i][j] = min cuts in substring s[i..j]. If s[i..j] is already a palindrome, dp[i][j]=0 (no cuts needed).</P>
      <Code>{{cpp:`int minCuts(string s) {
    int n=s.size();
    // Precompute: isPalin[i][j] = is s[i..j] a palindrome?
    vector<vector<bool>> isPalin(n, vector<bool>(n, false));
    for(int i=n-1;i>=0;i--) for(int j=i;j<n;j++)
        isPalin[i][j]=(s[i]==s[j])&&(j-i<2||isPalin[i+1][j-1]);

    vector<int> dp(n, INT_MAX); // dp[i] = min cuts in s[0..i]
    for(int j=0;j<n;j++){
        if(isPalin[0][j]){ dp[j]=0; continue; }
        for(int i=1;i<=j;i++)
            if(isPalin[i][j] && dp[i-1]+1<dp[j])
                dp[j]=dp[i-1]+1;
    }
    return dp[n-1];
}`, python:`def min_cuts(s):
    n=len(s)
    palin=[[False]*n for _ in range(n)]
    for i in range(n-1,-1,-1):
        for j in range(i,n):
            palin[i][j]=(s[i]==s[j]) and (j-i<2 or palin[i+1][j-1])
    dp=[0]*n
    for j in range(n):
        if palin[0][j]:continue
        dp[j]=float('inf')
        for i in range(1,j+1):
            if palin[i][j]:dp[j]=min(dp[j],dp[i-1]+1)
    return dp[-1]`}}</Code>

      <H2>Egg Drop Problem</H2>
      <P>Find the minimum trials to determine the critical floor with e eggs and f floors. Classic interval DP: dp[e][f] = min(1 + max(dp[e-1][k-1], dp[e][f-k])) over all k in [1,f]. The "worst case" is max because we don't know if the egg breaks or not.</P>
      <Code>{{cpp:`int eggDrop(int e, int f) {
    // dp[i][j] = min trials with i eggs and j floors
    vector<vector<int>> dp(e+1, vector<int>(f+1, 0));
    for(int i=1;i<=e;i++) dp[i][1]=1;    // 1 floor needs 1 trial
    for(int j=1;j<=f;j++) dp[1][j]=j;    // 1 egg needs j trials (linear scan)
    for(int i=2;i<=e;i++){
        for(int j=2;j<=f;j++){
            dp[i][j]=INT_MAX;
            // Binary search optimization for k (instead of linear scan)
            int lo=1,hi=j;
            while(lo<=hi){
                int k=(lo+hi)/2;
                int breakCase=dp[i-1][k-1];   // egg breaks: check below
                int surviveCase=dp[i][j-k];    // egg survives: check above
                int worst=1+max(breakCase,surviveCase);
                dp[i][j]=min(dp[i][j],worst);
                if(breakCase<surviveCase) lo=k+1; else hi=k-1;
            }
        }
    }
    return dp[e][f];
}
// e=2,f=10 → 4 (drop at floors 4,7,9,10)`, python:`def egg_drop(e,f):
    dp=[[0]*(f+1) for _ in range(e+1)]
    for i in range(1,e+1):dp[i][1]=1
    for j in range(1,f+1):dp[1][j]=j
    for i in range(2,e+1):
        for j in range(2,f+1):
            dp[i][j]=float('inf')
            for k in range(1,j+1):
                worst=1+max(dp[i-1][k-1],dp[i][j-k])
                dp[i][j]=min(dp[i][j],worst)
    return dp[e][f]`}}</Code>

      <H2>Interval DP Problems Map</H2>
      <Table
        heads={["Problem","State dp[i][j]","Split cost","Base"]}
        rows={[
          ["MCM","Min multiplications for matrices i..j","arr[i-1]×arr[k]×arr[j]","dp[i][i]=0"],
          ["Palindrome Partition","Min cuts in s[i..j]","0 if s[i..j] is palindrome","dp[i][i]=0"],
          ["Burst Balloons","Max coins bursting i..j","nums[i-1]×nums[k]×nums[j+1]","dp[i][i]=nums[i]"],
          ["Boolean Parenthesization","Ways to make expr[i..j] true","Split at each operator k","Base = T→1,F→0"],
        ]}
      />

      <QA q="Why does interval DP iterate by interval LENGTH instead of by index?" a="Because dp[i][j] depends on dp[i][k] and dp[k+1][j] — both are smaller intervals. To ensure smaller intervals are computed before larger ones, we process all intervals of length 2 before length 3, etc. If we iterated by i or j first, we'd try to access dp[k+1][j] or dp[i][k] before they're computed. The interval-length outer loop guarantees the dependency order." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6 — PROBLEMS
══════════════════════════════════════════════════════ */
function SectionProblems() {
  return (
    <div>
      <Note color="purple" icon="ti-tournament">
        6 problems covering all four DP families: Knapsack, Subset Sum, LCS variants, and Interval DP.
      </Note>

      <ProblemCard num={1} title="0-1 Knapsack" difficulty="OA Medium" tags={["Knapsack","2D DP"]}
        statement="Given N items each with a weight and value, and a knapsack of capacity W, find the maximum total value you can carry. Each item can be taken at most once."
        constraints={["1 ≤ N ≤ 1000","1 ≤ W ≤ 1000","1 ≤ wt[i], val[i] ≤ 1000"]}
        examples={[{input:"N=3, W=4, wt=[4,5,1], val=[1,2,3]",output:"3",note:"Only take item 3 (wt=1,val=3)"},{input:"N=3, W=3, wt=[1,2,3], val=[10,15,40]",output:"65",note:"Items 2+3: 15+40, wt=2+1=3"}]}
        approach="The template problem. State: dp[i][w] = max value from items 1..i with capacity w. For each item: max(exclude=dp[i-1][w], include=dp[i-1][w-wt[i]]+val[i] if wt[i]≤w). Iterate w HIGH to LOW for 1D space optimization."
        code={{cpp:`int knapSack(int W,int wt[],int val[],int n){
    vector<int> dp(W+1,0);
    for(int i=0;i<n;i++)
        for(int w=W;w>=wt[i];w--)   // HIGH to LOW = 0-1
            dp[w]=max(dp[w],dp[w-wt[i]]+val[i]);
    return dp[W];
}`,python:`def knapSack(W,wt,val,n):
    dp=[0]*(W+1)
    for i in range(n):
        for w in range(W,wt[i]-1,-1):
            dp[w]=max(dp[w],dp[w-wt[i]]+val[i])
    return dp[W]`}}
      />

      <ProblemCard num={2} title="Subset Sum" difficulty="OA Medium" tags={["Knapsack Variation","Boolean DP"]}
        statement="Given an array of non-negative integers and a target, determine if there exists a subset whose elements sum to the target."
        constraints={["1 ≤ N ≤ 200","1 ≤ target ≤ 10⁴"]}
        examples={[{input:"arr=[3,34,4,12,5,2], target=9",output:"true",note:"4+5=9"},{input:"arr=[3,34,4,12,5,2], target=30",output:"false"}]}
        approach="0-1 Knapsack with boolean dp. dp[w]=true if sum w is achievable. Iterate w HIGH to LOW to avoid reusing elements. dp[0]=true (empty subset). Tiny change from knapsack: dp[w] |= dp[w-arr[i]] instead of max."
        code={{cpp:`bool isSubsetSum(vector<int>& arr,int target){
    vector<bool> dp(target+1,false); dp[0]=true;
    for(int x:arr)
        for(int w=target;w>=x;w--)
            dp[w]=dp[w]||dp[w-x];
    return dp[target];
}`,python:`def is_subset_sum(arr,target):
    dp=[False]*(target+1);dp[0]=True
    for x in arr:
        for w in range(target,x-1,-1):dp[w]=dp[w] or dp[w-x]
    return dp[target]`}}
      />

      <ProblemCard num={3} title="Partition Equal Subset Sum" difficulty="LC Medium" tags={["LC 416","Subset Sum"]}
        statement="Given a non-empty array of positive integers, determine if the array can be partitioned into two subsets with equal sums."
        constraints={["1 ≤ n ≤ 200","1 ≤ nums[i] ≤ 100"]}
        examples={[{input:"[1,5,11,5]",output:"true",note:"{1,5,5} and {11}"},{input:"[1,2,3,5]",output:"false"}]}
        approach="If total is odd → false. Otherwise, find if any subset sums to total/2 → subset sum problem. The two subsets automatically have equal sums since S1 = total/2 implies S2 = total - S1 = total/2."
        code={{cpp:`bool canPartition(vector<int>& nums){
    int sum=accumulate(nums.begin(),nums.end(),0);
    if(sum%2!=0)return false;
    int target=sum/2;
    vector<bool> dp(target+1,false); dp[0]=true;
    for(int x:nums)
        for(int w=target;w>=x;w--)
            dp[w]=dp[w]||dp[w-x];
    return dp[target];
}`,python:`def can_partition(nums):
    s=sum(nums)
    if s%2:return False
    t=s//2; dp=[False]*(t+1); dp[0]=True
    for x in nums:
        for w in range(t,x-1,-1):dp[w]=dp[w] or dp[w-x]
    return dp[t]`}}
      />

      <ProblemCard num={4} title="Longest Common Subsequence" difficulty="LC Medium" tags={["LC 1143","LCS Base"]}
        statement="Given two strings, return the length of their longest common subsequence (LCS). A subsequence is a sequence that appears in the same relative order but not necessarily contiguous."
        constraints={["1 ≤ m,n ≤ 1000","strings consist of lowercase letters"]}
        examples={[{input:'text1="abcde", text2="ace"',output:"3",note:"LCS is ace"},{input:'text1="abc", text2="abc"',output:"3"},{input:'text1="abc", text2="def"',output:"0"}]}
        approach="2D DP. State: dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]. Match: dp[i][j]=dp[i-1][j-1]+1. No match: dp[i][j]=max(dp[i-1][j], dp[i][j-1]). This is the base template for all string DP variations."
        code={{cpp:`int longestCommonSubsequence(string X,string Y){
    int n=X.size(),m=Y.size();
    vector<vector<int>> dp(n+1,vector<int>(m+1,0));
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
            dp[i][j]=X[i-1]==Y[j-1]?dp[i-1][j-1]+1:max(dp[i-1][j],dp[i][j-1]);
    return dp[n][m];
}`,python:`def longest_common_subsequence(X,Y):
    n,m=len(X),len(Y)
    dp=[[0]*(m+1) for _ in range(n+1)]
    for i in range(1,n+1):
        for j in range(1,m+1):
            dp[i][j]=dp[i-1][j-1]+1 if X[i-1]==Y[j-1] else max(dp[i-1][j],dp[i][j-1])
    return dp[n][m]`}}
      />

      <ProblemCard num={5} title="Longest Palindromic Subsequence" difficulty="LC Medium" tags={["LC 516","LCS Reduction"]}
        statement="Given a string, find the length of its longest palindromic subsequence."
        constraints={["1 ≤ s.length ≤ 1000","s consists of lowercase letters"]}
        examples={[{input:'s="bbbab"',output:"4",note:"bbbb"},{input:'s="cbbd"',output:"2"}]}
        approach="LPS(S) = LCS(S, reverse(S)). The LCS of a string and its reverse is the longest subsequence that reads the same forwards and backwards. One line insight: any common subsequence of S and rev(S) must be a palindrome."
        code={{cpp:`int longestPalinSubseq(string s){
    string r=s; reverse(r.begin(),r.end());
    return longestCommonSubsequence(s,r);  // reuse LCS!
}
// Alternative: direct 2D DP
// dp[i][j]=dp[i+1][j-1]+2 if s[i]==s[j], else max(dp[i+1][j],dp[i][j-1])`,python:`def longest_palindrome_subseq(s):
    return longest_common_subsequence(s,s[::-1])  # LCS(S, rev(S))`}}
      />

      <ProblemCard num={6} title="Coin Change II — Ways" difficulty="LC Medium" tags={["LC 518","Unbounded Knapsack"]}
        statement="Given an array of coin denominations and an amount, return the number of combinations (not permutations) that sum to the amount. Coins can be reused."
        constraints={["1 ≤ coins.length ≤ 300","1 ≤ coins[i] ≤ 5000","0 ≤ amount ≤ 5000"]}
        examples={[{input:"amount=5, coins=[1,2,5]",output:"4",note:"{5},{1,2,2},{1,1,1,2},{1,1,1,1,1}"},{input:"amount=3, coins=[2]",output:"0"}]}
        approach="Unbounded knapsack where each coin can be used unlimited times. Key: outer loop over coins, inner loop over amount LOW to HIGH. This ordering ensures combinations (each coin 'variety' considered exactly once). dp[0]=1 (1 way to make 0: empty). dp[w]+=dp[w-coin] for each coin."
        code={{cpp:`int change(int amount,vector<int>& coins){
    vector<int> dp(amount+1,0); dp[0]=1;
    for(int c:coins)
        for(int w=c;w<=amount;w++)  // LOW to HIGH = unbounded
            dp[w]+=dp[w-c];
    return dp[amount];
}`,python:`def change(amount,coins):
    dp=[0]*(amount+1);dp[0]=1
    for c in coins:
        for w in range(c,amount+1):
            dp[w]+=dp[w-c]
    return dp[amount]`}}
      />
    </div>
  );
}

/* ROOT */
const TABS=[
  {id:'knapsack',     label:'0-1 Knapsack'},
  {id:'variations',   label:'Knapsack Variations'},
  {id:'unbounded',    label:'Unbounded Knapsack'},
  {id:'lcs',          label:'LCS & String DP'},
  {id:'mcm',          label:'MCM & Interval DP'},
  {id:'problems',     label:'Problems'},
];
export default function DPAdvanced() {
  const [active,setActive]=useState('knapsack');
  const map={knapsack:<SectionKnapsack01/>,variations:<SectionKnapsackVariations/>,unbounded:<SectionUnbounded/>,lcs:<SectionLCS/>,mcm:<SectionMCM/>,problems:<SectionProblems/>};
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 24</div>
        <h1 className="page-header-title">Dynamic Programming — Advanced</h1>
        <p className="page-header-subtitle">
          0-1 Knapsack · Subset Sum Family · Unbounded Knapsack · LCS Template · SCS · LPS · MCM · Palindrome Partitioning · Egg Drop
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={24}/>
    </div>
  );
}
