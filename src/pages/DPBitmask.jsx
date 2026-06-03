import { useState, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   TSP DATA — 4 cities, diamond layout
   City layout: 0=left, 1=top, 2=bottom, 3=right
   Edges: 0-1=10, 0-2=15, 0-3=20, 1-2=35, 1-3=25, 2-3=30
══════════════════════════════════════════════════════ */
const TSP_N    = 4;
const TSP_POS  = { 0:[90,155], 1:[270,55], 2:[270,255], 3:[450,155] };
const TSP_DIST = [[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]];
const TSP_EDGES = [[0,1,10],[0,2,15],[0,3,20],[1,2,35],[1,3,25],[2,3,30]];
const CITY_COLORS = ['#4EC9B0','#CE9178','#81B4EA','#C586C0'];
const toBin = n => n.toString(2).padStart(4,'0');

/* ── Precompute TSP dp steps ────────────────────────── */
function buildTSPSteps() {
  const INF = 9999;
  const dp = Array.from({length:16},()=>new Array(4).fill(INF));
  dp[1][0] = 0;
  const steps = [];
  steps.push({dp:dp.map(r=>[...r]),from:null,to:null,edge:null,action:'init',
    desc:'State: dp[mask][city] = min cost to visit exactly the cities in mask, starting from city 0 and ending at city. Init: dp[0001][0]=0.'});
  for (let mask=1; mask<16; mask++) {
    for (let i=0; i<4; i++) {
      if (!(mask&(1<<i))) continue;
      if (dp[mask][i]===INF) continue;
      for (let j=0; j<4; j++) {
        if (mask&(1<<j)) continue;
        const newMask=mask|(1<<j);
        const candidate=dp[mask][i]+TSP_DIST[i][j];
        const prev=dp[newMask][j];
        const improved=candidate<prev;
        if (improved) dp[newMask][j]=candidate;
        steps.push({dp:dp.map(r=>[...r]),
          from:{mask,city:i,cost:dp[mask][i]},
          to:{mask:newMask,city:j},
          edge:{i,j,w:TSP_DIST[i][j]},
          candidate,prev,improved,
          action:improved?'update':'noUpdate',
          desc:`dp[${toBin(mask)}][${i}]=${dp[mask][i]}: go to city ${j} (w=${TSP_DIST[i][j]}) → dp[${toBin(newMask)}][${j}]=min(${prev===INF?'∞':prev}, ${dp[mask][i]}+${TSP_DIST[i][j]})=${dp[newMask][j]}.${improved?' ✓':' (no improvement)'}`
        });
      }
    }
  }
  const full=15;
  const returns=[1,2,3].map(i=>({city:i,total:dp[full][i]+TSP_DIST[i][0]}));
  const minReturn=Math.min(...returns.map(r=>r.total));
  steps.push({dp:dp.map(r=>[...r]),from:null,to:null,returns,minReturn,action:'done',
    desc:`Return to city 0: ${returns.map(r=>`(city${r.city}→0)=${r.total}`).join(', ')}. Optimal tour = ${minReturn}.`});
  return steps;
}
const TSP_STEPS = buildTSPSteps();

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — BITMASK EXPLORER (toggle bits)
══════════════════════════════════════════════════════ */
function BitExplorer() {
  const N = 5;
  const ITEMS = ['A','B','C','D','E'];
  const [mask, setMask] = useState(0b01011); // {A, B, D}

  const toggle = (i) => setMask(m => m ^ (1<<i));
  const popcount = m => m.toString(2).split('').filter(b=>b==='1').length;
  const bits = Array.from({length:N}, (_,i) => !!(mask & (1<<i)));

  return (
    <VizBox>
      <div style={{marginBottom:14,fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>
        Click bits to toggle the set. Watch how all operations update instantly — a bitmask is just an integer where each bit represents set membership.
      </div>
      {/* Bit toggles */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:8,letterSpacing:'0.06em'}}>SET (click to toggle)</div>
        <div style={{display:'flex',gap:6}}>
          {ITEMS.map((item,i)=>{
            const isSet=bits[i];
            return (
              <button key={i} onClick={()=>toggle(i)} style={{width:52,height:52,borderRadius:8,border:`2px solid ${isSet?CITY_COLORS[i%4]:'var(--color-border-secondary)'}`,background:isSet?'rgba(255,255,255,0.08)':'#131722',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,transition:'all 0.15s'}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:14,fontWeight:700,color:isSet?CITY_COLORS[i%4]:'var(--color-text-tertiary)'}}>{item}</span>
                <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:isSet?CITY_COLORS[i%4]:'var(--color-text-tertiary)'}}>{isSet?'1':'0'}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Binary and decimal */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:14}}>
        {[['Decimal',mask.toString(),'info'],['Binary',mask.toString(2).padStart(N,'0'),'success'],['|S|',popcount(mask).toString(),'warning']].map(([l,v,c])=>(
          <div key={l} style={{padding:'8px 10px',borderRadius:'var(--border-radius-md)',background:`var(--color-background-${c})`,border:`0.5px solid var(--color-border-${c})`,textAlign:'center'}}>
            <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:`var(--color-text-${c})`,marginBottom:2}}>{l}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:18,fontWeight:700,color:`var(--color-text-${c})`}}>{v}</div>
          </div>
        ))}
      </div>
      {/* Operations */}
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:8,padding:'10px 14px',fontFamily:'var(--font-mono)',fontSize:12,lineHeight:2.2}}>
        <div style={{color:'#6A9955',marginBottom:2}}>{'// Key operations on current mask = '+mask}</div>
        {[
          [`has_bit(2) = mask & (1<<2) = ${mask} & ${1<<2}`,`= ${mask&(1<<2)} (${bits[2]?'C is in set':'C not in set'})`,'#9CDCFE'],
          [`set_bit(2) = mask | (1<<2) = ${mask} | ${1<<2}`,`= ${mask|(1<<2)} = ${(mask|(1<<2)).toString(2).padStart(N,'0')}`,'#4EC9B0'],
          [`clr_bit(2) = mask & ~(1<<2) = ${mask} & ${(~(1<<2))>>>0}&15`,`= ${mask&~(1<<2)} = ${(mask&~(1<<2)).toString(2).padStart(N,'0')}`,'#CE9178'],
          [`add item E: mask|(1<<4) = ${mask}|${1<<4}`,`= ${mask|(1<<4)} = ${(mask|(1<<4)).toString(2).padStart(N,'0')}`,'#C586C0'],
          [`del item A: mask&~(1<<0) = ${mask}&${~1&31}`,`= ${mask&~1&31} = ${(mask&~1&31).toString(2).padStart(N,'0')}`,'#CE9178'],
        ].map(([op,res,c])=>(
          <div key={op} style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <span style={{color:c}}>{op}</span>
            <span style={{color:'#7A8599'}}>{res}</span>
          </div>
        ))}
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — TSP STEP-THROUGH
   City graph SVG + dp state transitions
══════════════════════════════════════════════════════ */
function TSPViz() {
  const [step,setStep]=useState(0);
  const s=TSP_STEPS[Math.min(step,TSP_STEPS.length-1)];

  const activeEdge = s.edge;
  const fromCity   = s.from?.city;
  const toCity     = s.to?.city;
  const inFromMask = s.from?.mask;
  const inToMask   = s.to?.mask;

  // Non-INF dp entries
  const nonInf = [];
  (s.dp||[]).forEach((row,mask)=>{
    row.forEach((cost,city)=>{
      if (cost<9999 && (mask&(1<<city))) nonInf.push({mask,city,cost});
    });
  });

  return (
    <VizBox>
      <div style={{marginBottom:10,display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        {s.action!=='init'&&<span style={{padding:'2px 9px',borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${s.action==='update'?'success':s.action==='done'?'success':'secondary'})`,color:`var(--color-text-${s.action==='update'?'success':s.action==='done'?'success':'tertiary'})`,border:`1px solid var(--color-border-${s.action==='update'?'success':s.action==='done'?'success':'secondary'})`,whiteSpace:'nowrap'}}>
          {s.action==='update'?'Update ✓':s.action==='done'?'Done ✓':'No improvement'}
        </span>}
        <span style={{fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>{s.desc}</span>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
        {/* City graph SVG */}
        <div>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:4,letterSpacing:'0.06em'}}>GRAPH (4 cities, all pairs)</div>
          <svg width="350" height="220" viewBox="0 0 540 310">
            {TSP_EDGES.map(([a,b,w])=>{
              const pa=TSP_POS[a],pb=TSP_POS[b];
              const isActive=activeEdge&&((activeEdge.i===a&&activeEdge.j===b)||(activeEdge.i===b&&activeEdge.j===a));
              const mx=(pa[0]+pb[0])/2,my=(pa[1]+pb[1])/2;
              return (<g key={`${a}-${b}`}>
                <line x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} stroke={isActive?'#CE9178':'#2A3050'} strokeWidth={isActive?2.5:1.5}/>
                <rect x={mx-12} y={my-9} width={24} height={16} rx={3} fill="#0D0F18"/>
                <text x={mx} y={my+1} textAnchor="middle" dominantBaseline="middle" fill={isActive?'#CE9178':'#4A5170'} fontSize="11" fontFamily="monospace" fontWeight={isActive?700:400}>{w}</text>
              </g>);
            })}
            {Array.from({length:4},(_,i)=>{
              const [x,y]=TSP_POS[i];
              const isFr=i===fromCity, isTo=i===toCity;
              const c = isFr?'#CE9178':isTo?'#4EC9B0':CITY_COLORS[i];
              const wasVisited = inFromMask!=null && (inFromMask&(1<<i));
              return (<g key={i}>
                <circle cx={x} cy={y} r="26" fill={isFr||isTo?'rgba(255,255,255,0.08)':'#131722'} stroke={c} strokeWidth={isFr||isTo?2.5:1.5}/>
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={c} fontSize="13" fontFamily="monospace" fontWeight="700">{i}</text>
                {wasVisited&&<circle cx={x+18} cy={y-18} r="6" fill={c} opacity="0.8"/>}
              </g>);
            })}
          </svg>
        </div>

        {/* Current transition + non-INF dp table */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {/* Transition box */}
          {s.from&&(
            <div style={{padding:'10px 12px',borderRadius:'var(--border-radius-md)',background:'var(--color-background-secondary)',border:'0.5px solid var(--color-border-secondary)',fontFamily:'var(--font-mono)',fontSize:12,lineHeight:2}}>
              <div style={{color:'var(--color-text-tertiary)',marginBottom:2}}>TRANSITION</div>
              <div>
                <span style={{color:'var(--color-text-info)'}}>from: </span>
                <span style={{color:'var(--color-text-warning)',fontWeight:700}}>dp[{toBin(s.from.mask)}][{s.from.city}]={s.from.cost}</span>
              </div>
              <div>
                <span style={{color:'var(--color-text-info)'}}>edge: </span>
                <span style={{color:'#CE9178'}}>city{s.edge?.i}→city{s.edge?.j} (w={s.edge?.w})</span>
              </div>
              <div>
                <span style={{color:'var(--color-text-info)'}}>to:   </span>
                <span style={{color:s.improved?'var(--color-text-success)':'var(--color-text-tertiary)',fontWeight:700}}>dp[{toBin(s.to?.mask??0)}][{s.to?.city}]={s.candidate}</span>
                {s.improved&&<span style={{color:'var(--color-text-success)'}}> ✓</span>}
              </div>
            </div>
          )}
          {/* Non-INF dp entries */}
          <div>
            <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:5,letterSpacing:'0.06em'}}>COMPUTED dp[mask][city]</div>
            <div style={{display:'flex',flexDirection:'column',gap:3,maxHeight:160,overflowY:'auto'}}>
              {nonInf.map(({mask,city,cost})=>{
                const isCur=s.to&&s.to.mask===mask&&s.to.city===city&&s.action==='update';
                return (
                  <div key={`${mask}-${city}`} style={{display:'flex',gap:6,padding:'3px 8px',borderRadius:4,background:isCur?'var(--color-background-success)':'var(--color-background-secondary)',border:`0.5px solid ${isCur?'var(--color-border-success)':'var(--color-border-tertiary)'}`,fontFamily:'var(--font-mono)',fontSize:11.5,transition:'all 0.15s'}}>
                    <span style={{color:isCur?'var(--color-text-success)':'var(--color-text-tertiary)',minWidth:40}}>{toBin(mask)}</span>
                    <span style={{color:isCur?'var(--color-text-success)':'var(--color-text-secondary)'}}>city {city}</span>
                    <span style={{color:isCur?'var(--color-text-success)':'var(--color-text-info)',fontWeight:isCur?700:400,marginLeft:'auto'}}>{cost}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mask visualization — which cities are in current from_mask */}
      {s.from&&(
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:5,letterSpacing:'0.06em'}}>CURRENT MASK: {toBin(s.from.mask)}</div>
          <div style={{display:'flex',gap:6}}>
            {Array.from({length:4},(_,i)=>{
              const inMask=!!(s.from.mask&(1<<i));
              return (
                <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                  <div style={{width:36,height:36,borderRadius:6,border:`1.5px solid ${inMask?CITY_COLORS[i]:'var(--color-border-secondary)'}`,background:inMask?'rgba(255,255,255,0.06)':'#131722',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:inMask?CITY_COLORS[i]:'var(--color-text-tertiary)'}}>
                    {i}
                  </div>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:9.5,color:inMask?CITY_COLORS[i]:'var(--color-text-tertiary)'}}>{inMask?'✓':'—'}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {s.action==='done'&&(
        <div style={{padding:'8px 14px',background:'var(--color-background-success)',border:'1px solid var(--color-border-success)',borderRadius:'var(--border-radius-md)',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:'var(--color-text-success)',marginBottom:12}}>
          ✓ Optimal TSP tour = {s.minReturn}. Path: 0→2→3→1→0 or 0→1→3→2→0
        </div>
      )}

      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(TSP_STEPS.length-1,step+1)),step===TSP_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:64,textAlign:'center',alignSelf:'center'}}>{step+1}/{TSP_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(TSP_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
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
   SECTION 1 — BITMASK FUNDAMENTALS
══════════════════════════════════════════════════════ */
function SectionFundamentals() {
  return (
    <div>
      <Note color="info" icon="ti-binary">
        A <strong>bitmask</strong> is an integer where each bit represents membership in a set. For N items, an integer in range [0, 2ⁿ−1] encodes all 2ⁿ possible subsets. Bitmask DP solves problems where the state is "which subset of N items have we processed?" — feasible when N ≤ 20.
      </Note>

      <H2>When is Bitmask DP the Answer?</H2>
      <Grid cols={2}>
        <Card title="Problem Signals" color="info">
          N ≤ 20 elements. State = which subset has been chosen/visited. "Assign each item to a group." "Visit all nodes exactly once." "Cover all tasks." These are fundamentally exponential problems — 2ⁿ subsets is the correct complexity.
        </Card>
        <Card title="Complexity" color="warning">
          O(2ⁿ × N) time, O(2ⁿ × N) space. For N=20: 20 million states — feasible. For N=25: 800 million — borderline. For N=30: too slow. Always check N before choosing bitmask DP.
        </Card>
      </Grid>

      <H2>Core Bit Operations — Memorize These</H2>
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:8,padding:'14px 18px',fontFamily:'var(--font-mono)',fontSize:12.5,lineHeight:2.4,marginBottom:16}}>
        {[
          ['Check if item i is in mask',  'mask & (1<<i)',           '= 0 if absent, non-zero if present'],
          ['Add item i to mask',          'mask | (1<<i)',           '= new mask with bit i set'],
          ['Remove item i from mask',     'mask & ~(1<<i)',          '= new mask with bit i cleared'],
          ['Toggle item i in mask',       'mask ^ (1<<i)',           '= flips bit i'],
          ['Count items in mask',         '__builtin_popcount(mask)','= number of 1-bits (C++); bin(mask).count("1") Python'],
          ['All N items selected',        'mask == (1<<n)-1',        '= all n bits set'],
          ['Lowest set bit',              'mask & (-mask)',           '= isolates the least significant set bit'],
          ['Remove lowest set bit',       'mask & (mask-1)',         '= clears the rightmost set bit (LSB)'],
        ].map(([desc,op,note])=>(
          <div key={desc} style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <span style={{color:'#7A8599',minWidth:220,flexShrink:0}}>{desc}</span>
            <span style={{color:'#9CDCFE',fontWeight:700,minWidth:180}}>{op}</span>
            <span style={{color:'#6A9955'}}>{note}</span>
          </div>
        ))}
      </div>

      <H2>Interactive Bitmask Explorer</H2>
      <P>Toggle bits to see how operations transform the set. The binary representation IS the set — each bit is a membership flag.</P>
      <BitExplorer />

      <H2>Subset Enumeration Patterns</H2>
      <Code>{{cpp:`// Pattern 1: Iterate ALL 2^n subsets — O(2^n)
for (int mask = 0; mask < (1<<n); mask++) {
    // mask is a subset of {0,1,...,n-1}
}

// Pattern 2: Iterate all SUBMASKS of a given mask — O(3^n) total
// For each mask, this loop visits every subset of that mask (not 2^n per mask!)
for (int sub = mask; sub > 0; sub = (sub-1) & mask) {
    // sub is a submask of mask
    // The (sub-1) & mask trick removes the lowest set bit while staying within mask
}

// Pattern 3: Iterate by POPCOUNT (crucial for TSP and assignment DP)
// Process masks with k bits before masks with k+1 bits
for (int mask = 0; mask < (1<<n); mask++) {
    if (__builtin_popcount(mask) == k) { /* process */ }
}
// Or: process in order 0..2^n-1 (naturally processes smaller subsets first within same popcount)

// Pattern 4: Enumerate all PAIRS of disjoint subsets
for (int a = mask; a > 0; a = (a-1) & mask) {
    int b = mask ^ a;  // complement within mask
    // {a, b} is a partition of mask into two parts
}`, python:`# All subsets
for mask in range(1<<n):
    pass  # mask is a subset

# All submasks of a given mask
sub = mask
while sub:
    # process sub
    sub = (sub-1) & mask

# Iterate set bits of a mask
temp = mask
while temp:
    i = (temp & -temp).bit_length() - 1  # index of lowest set bit
    # process bit i
    temp &= temp - 1  # remove lowest set bit`}}</Code>

      <Note color="success" icon="ti-bulb">
        <strong>Why (sub-1) & mask works:</strong> Subtracting 1 from sub flips all bits from the lowest set bit down to bit 0. ANDing with mask restricts back to the original mask. This generates every submask exactly once, then terminates when sub becomes 0. Total iterations across all masks of size n: exactly 3ⁿ.
      </Note>

      <QA q="The submask iteration (sub-1)&mask looks like magic. What's the invariant that proves it visits every submask exactly once?" a="Claim: starting from mask and repeatedly applying sub = (sub-1)&mask visits every submask of mask in strictly decreasing order, ending at 0. Proof sketch: (sub-1) flips all trailing zeros to ones and flips the lowest 1 to 0 in sub. Then &mask restricts back. This is equivalent to counting down from mask to 0 but 'skipping' bits not in mask. Since it's strictly decreasing and bounded below by 0, it terminates and visits each value exactly once. Total: sum over all masks of 2^|mask| = 3^n." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — TSP CANONICAL PROBLEM
══════════════════════════════════════════════════════ */
function SectionTSP() {
  return (
    <div>
      <Note color="success" icon="ti-route">
        <strong>Traveling Salesman Problem (TSP):</strong> find the minimum-cost Hamiltonian cycle — a path that visits every city exactly once and returns to the start. Brute force: O(n!) permutations. Bitmask DP: O(2ⁿ × n²) — feasible for n ≤ 20.
      </Note>

      <H2>State Design — The Key Insight</H2>
      <div style={{background:'#0D0F18',border:'1px solid #1E2233',borderRadius:8,padding:'14px 18px',fontFamily:'var(--font-mono)',fontSize:12.5,lineHeight:2.4,marginBottom:14}}>
        {[
          ['State',    '#9CDCFE','dp[mask][i] = min cost to visit all cities in mask, starting from city 0, ending at city i'],
          ['Recur',    '#CE9178','dp[mask|(1<<j)][j] = min(dp[mask][i] + dist[i][j]) for all i in mask, j not in mask'],
          ['Base',     '#4EC9B0','dp[1<<0][0] = 0 (only city 0 visited, we\'re at city 0, cost=0)'],
          ['Answer',   '#DCDCAA','min(dp[(1<<n)-1][i] + dist[i][0]) for all i ≠ 0 (return to start)'],
          ['Time',     '#7A8599','O(2^n × n²) — 2^n masks × n endpoints × n transitions'],
        ].map(([l,c,t])=>(
          <div key={l} style={{display:'flex',gap:12}}>
            <span style={{color:'#3D4460',minWidth:52,fontWeight:700}}>{l}</span>
            <span style={{color:c}}>{t}</span>
          </div>
        ))}
      </div>

      <H2>Interactive Step-Through — 4 Cities</H2>
      <P>Graph: cities 0–3 with edge weights shown. The binary mask tracks which cities are visited. Each step tries one transition: extend the path to an unvisited city. Watch the dp table fill from smaller masks to larger ones.</P>
      <TSPViz />

      <H2>Full TSP Code</H2>
      <Code>{{cpp:`int tsp(int dist[][MAXN], int n) {
    int FULL = (1<<n)-1;
    vector<vector<int>> dp(1<<n, vector<int>(n, INT_MAX));
    dp[1][0] = 0;  // at city 0, only city 0 visited, cost 0

    for (int mask = 1; mask < (1<<n); mask++) {
        for (int i = 0; i < n; i++) {
            if (!(mask & (1<<i))) continue;        // i not in mask
            if (dp[mask][i] == INT_MAX) continue;  // unreachable
            for (int j = 0; j < n; j++) {
                if (mask & (1<<j)) continue;       // j already visited
                int newMask = mask | (1<<j);
                dp[newMask][j] = min(dp[newMask][j],
                                     dp[mask][i] + dist[i][j]);
            }
        }
    }

    // Return to city 0 from the last city
    int ans = INT_MAX;
    for (int i = 1; i < n; i++)
        if (dp[FULL][i] != INT_MAX)
            ans = min(ans, dp[FULL][i] + dist[i][0]);
    return ans;
}
// Time: O(2^n × n²)  Space: O(2^n × n)`, python:`def tsp(dist, n):
    INF=float('inf'); FULL=(1<<n)-1
    dp=[[INF]*n for _ in range(1<<n)]
    dp[1][0]=0          # start at city 0
    for mask in range(1,1<<n):
        for i in range(n):
            if not(mask&(1<<i)):continue
            if dp[mask][i]==INF:continue
            for j in range(n):
                if mask&(1<<j):continue
                new_mask=mask|(1<<j)
                dp[new_mask][j]=min(dp[new_mask][j],dp[mask][i]+dist[i][j])
    return min(dp[FULL][i]+dist[i][0] for i in range(1,n) if dp[FULL][i]<INF)`}}</Code>

      <H2>Path Reconstruction</H2>
      <Code>{{cpp:`// Store "from which state did we reach dp[mask][i]?"
vector<vector<int>> parent(1<<n, vector<int>(n, -1));
// In the transition: if improved, set parent[newMask][j] = i;

// Reconstruct path:
vector<int> reconstructPath(int dp[][], int parent[][], int n) {
    int mask = (1<<n)-1;
    int cur = 0;
    // Find ending city
    for (int i=1; i<n; i++)
        if (dp[mask][i]+dist[i][0] < dp[mask][cur]+dist[cur][0]) cur=i;
    vector<int> path;
    while (mask) {
        path.push_back(cur);
        int prev = parent[mask][cur];
        mask ^= (1<<cur);  // remove cur from mask
        cur = prev;
    }
    reverse(path.begin(), path.end());
    return path; // cities in visit order
}`, python:`# Reconstruct: after filling dp and parent arrays
def reconstruct_path(dp,parent,n):
    full=(1<<n)-1; mask=full
    # Find best last city
    last=min(range(1,n),key=lambda i:dp[full][i]+dist[i][0])
    path=[]; cur=last
    while mask:
        path.append(cur)
        prev=parent[mask][cur]
        mask^=(1<<cur); cur=prev
    path.append(0); path.reverse(); return path`}}</Code>

      <QA q="Why do we start the TSP DP from city 0 specifically? Can we start from any city?" a="For a cycle (return to start), the starting point doesn't matter — every Hamiltonian cycle passes through all cities regardless of where you 'start'. Fixing city 0 as the start avoids counting each cycle n times (once for each rotation). If you started from each city, you'd find the same optimal tours n times over. So we always set dp[1<<0][0]=0 and never 'start' from other cities." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — APPLICATIONS
══════════════════════════════════════════════════════ */
function SectionApplications() {
  return (
    <div>
      <H2>Assignment Problem — Students Happiness</H2>
      <P>Assign N students to N tasks such that each task is done by exactly one student. dp[mask] = max happiness when we've assigned the first popcount(mask) students to exactly the tasks in mask. The key: when we process student <code>k = popcount(mask)</code>, we try assigning them to every task in mask.</P>
      <Code>{{cpp:`// N students, N tasks. happiness[i][j] = happiness if student i does task j
// dp[mask] = max happiness when the FIRST popcount(mask) students
//            have been assigned to the tasks indicated by mask
int maxHappiness(int happy[][MAXN], int n) {
    vector<int> dp(1<<n, 0);
    for (int mask = 1; mask < (1<<n); mask++) {
        int student = __builtin_popcount(mask) - 1;  // 0-indexed student
        for (int task = 0; task < n; task++) {
            if (!(mask & (1<<task))) continue;       // task not in this subset
            // Assign 'student' to 'task'; previous students had mask^(1<<task)
            int prev = dp[mask ^ (1<<task)];
            dp[mask] = max(dp[mask], prev + happy[student][task]);
        }
    }
    return dp[(1<<n)-1];
}
// Time: O(2^n × n)  — much better than O(n!) brute force`, python:`def max_happiness(happy, n):
    dp=[0]*(1<<n)
    for mask in range(1,1<<n):
        student=bin(mask).count('1')-1  # which student is being assigned
        for task in range(n):
            if not(mask&(1<<task)):continue
            dp[mask]=max(dp[mask], dp[mask^(1<<task)]+happy[student][task])
    return dp[(1<<n)-1]`}}</Code>
      <Note color="info" icon="ti-bulb">
        <strong>Why does student = popcount(mask) - 1?</strong> We process students in order 0, 1, 2... When mask has k bits set, we're computing the assignment for student k-1 (0-indexed). The bitmask encodes "which tasks have been assigned so far." The previous state is mask with this task removed: mask ^ (1&lt;&lt;task).
      </Note>

      <H2>Counting Hamiltonian Paths / Cycles</H2>
      <Code>{{cpp:`// Count Hamiltonian paths starting at vertex 0
// dp[mask][v] = number of paths visiting exactly mask-cities, ending at v
long long countHamPaths(vector<vector<int>>& adj, int n) {
    vector<vector<long long>> dp(1<<n, vector<long long>(n, 0));
    dp[1][0] = 1;  // start at vertex 0

    for (int mask=1; mask<(1<<n); mask++) {
        for (int u=0; u<n; u++) {
            if (!(mask&(1<<u))||dp[mask][u]==0) continue;
            for (int v : adj[u]) {
                if (mask&(1<<v)) continue;  // already visited
                dp[mask|(1<<v)][v] += dp[mask][u];
            }
        }
    }
    long long ans = 0;
    int full = (1<<n)-1;
    for (int v=1; v<n; v++) ans += dp[full][v];  // paths ending at any non-0 vertex
    return ans;
}

// Count Hamiltonian CYCLES: also require an edge back to 0
long long countHamCycles(vector<vector<int>>& adj, int n) {
    // same DP, but at end check if adj[v][0] edge exists
    long long ans=0;
    for (int v=1; v<n; v++)
        if (adj[v][0]) ans += dp[(1<<n)-1][v];  // cycle: v→0
    return ans / 2;  // each cycle counted twice (clockwise + counter-clockwise)
}`, python:`def count_ham_paths(adj, n):
    dp=[[0]*n for _ in range(1<<n)]; dp[1][0]=1
    for mask in range(1,1<<n):
        for u in range(n):
            if not(mask&(1<<u)) or not dp[mask][u]:continue
            for v in adj[u]:
                if mask&(1<<v):continue
                dp[mask|(1<<v)][v]+=dp[mask][u]
    return sum(dp[(1<<n)-1][v] for v in range(1,n))`}}</Code>

      <H2>Tiling with Bitmask (Broken Profile DP)</H2>
      <P>Count ways to tile an M×N grid with 1×2 dominoes. For M ≤ 20, use profile DP: dp[col][profile] where profile is a bitmask of which cells in the current column boundary are "sticking out" (covered by a horizontal domino from the previous column).</P>
      <Code>{{cpp:`// Count tilings of M×N grid with 1×2 dominoes
// Process column by column. profile[bit i] = 1 means cell (i, cur_col)
// is already filled by a horizontal domino from the previous column.
long long countTilings(int M, int N) {
    vector<long long> dp(1<<M, 0);
    dp[0] = 1;  // empty grid, no cells pre-filled

    for (int col = 0; col < N; col++) {
        vector<long long> ndp(1<<M, 0);
        // Try all combinations of how current column is filled
        // given 'prev' profile (incoming pre-filled cells)
        function<void(int,int,long long)> fill = [&](int row, int curProfile, long long ways){
            if (row == M) { ndp[curProfile] += ways; return; }
            if (prev profile bit set) {
                // cell (row,col) already filled → just move to next row
                fill(row+1, curProfile, ways);
            } else {
                // Option 1: place vertical domino (fill this cell + next cell)
                if (row+1<M && !(prevProfile & (1<<(row+1)))) {
                    fill(row+2, curProfile, ways);  // both cells filled vertically
                }
                // Option 2: place horizontal domino (fill this cell, mark in next profile)
                fill(row+1, curProfile|(1<<row), ways);
            }
        };
        for (int prev=0; prev<(1<<M); prev++)
            if (dp[prev]) fill(0, 0, dp[prev]);  // simplified — see full impl
        dp = ndp;
    }
    return dp[0];  // no cells sticking out after last column
}`, python:`# Simpler: 2×N tiling with 1×2 dominoes
# (doesn't need bitmask — Fibonacci sequence)
def count_2xN_tiling(n):
    dp=[0]*(n+1); dp[0]=dp[1]=1
    for i in range(2,n+1): dp[i]=dp[i-1]+dp[i-2]
    return dp[n]

# For larger M, need proper broken profile DP
# See full implementation in competitive programming references`}}</Code>

      <H2>Minimum Edge Deletion to Make a DAG</H2>
      <P>Find the minimum edges to remove from a directed graph so no cycle remains. Key observation: a DAG has a topological ordering. Try all 2ⁿ possible orderings (represented as subsets) and find one with minimum backward edges.</P>
      <Code>{{cpp:`// Find optimal topological ordering to minimize backward edges
int minEdgesForDAG(vector<vector<int>>& adj, int n) {
    // dp[mask] = min edges from mask-nodes' induced subgraph going "backward"
    //           when we order nodes of mask optimally
    // Equivalently: max edges we can KEEP (forward edges in best ordering)
    vector<int> dp(1<<n, 0);
    // For each mask, try all possible "last node" to add
    for (int mask=1; mask<(1<<n); mask++) {
        dp[mask] = 0;
        for (int last=0; last<n; last++) {
            if (!(mask&(1<<last))) continue;
            int prev = mask ^ (1<<last);
            // Count edges FROM prev-nodes TO last (these are forward edges)
            int fwdEdges = 0;
            for (int from=0; from<n; from++)
                if ((prev&(1<<from)) && adj[from][last]) fwdEdges++;
            dp[mask] = max(dp[mask], dp[prev] + fwdEdges);
        }
    }
    // Total edges minus max forward edges = min deletions
    int totalEdges = 0;
    for (int u=0;u<n;u++) for (int v=0;v<n;v++) totalEdges += adj[u][v];
    return totalEdges - dp[(1<<n)-1];
}`, python:`def min_edges_for_dag(adj, n):
    dp=[0]*(1<<n)
    for mask in range(1,1<<n):
        for last in range(n):
            if not(mask&(1<<last)):continue
            prev=mask^(1<<last)
            fwd=sum(1 for fr in range(n) if(prev&(1<<fr)) and adj[fr][last])
            dp[mask]=max(dp[mask],dp[prev]+fwd)
    total=sum(adj[u][v] for u in range(n) for v in range(n))
    return total-dp[(1<<n)-1]`}}</Code>

      <QA q="For the assignment problem, why does iterating masks in order 1..2ⁿ-1 give the correct DP order?" a="When mask has k bits set, dp[mask] depends on dp[mask ^ (1<<task)] which has k-1 bits set. Any mask with k-1 bits set has a smaller integer value than the smallest mask with k bits set (not strictly, but all proper subsets have smaller values). So iterating masks in increasing order 1, 2, 3... naturally processes all proper subsets before the mask itself. This is the same 'fill order' we discussed in Module 24 for subset-sum, just now applied to assignment." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — PROBLEMS
══════════════════════════════════════════════════════ */
function SectionProblems() {
  return (
    <div>
      <Note color="purple" icon="ti-tournament">
        4 problems spanning the core bitmask DP patterns — assignment, subset feasibility, BFS+bitmask, and TSP on strings.
      </Note>

      <ProblemCard num={1} title="Beautiful Arrangement" difficulty="LC Medium" tags={["LC 526","Assignment DP"]}
        statement="Suppose you have <code>n</code> integers labeled 1 to n. A permutation is beautiful if for every position i, either perm[i] is divisible by i, or i is divisible by perm[i]. Count all beautiful arrangements."
        constraints={["1 ≤ n ≤ 15"]}
        examples={[{input:"n=2",output:"2",note:"[1,2]: 1/1 ✓, 2/2 ✓. [2,1]: 2/1 ✓, 1/2 no but 2/1 ✓"},{input:"n=1",output:"1"}]}
        approach="dp[mask] = number of ways to assign numbers to first popcount(mask) positions such that the selected numbers form 'mask'. For each mask, the current position = popcount(mask). Try each number in mask at that position. If compatible, add dp[mask ^ (1<<(num-1))] to dp[mask]."
        code={{cpp:`int countArrangement(int n){
    vector<int> dp(1<<n,0); dp[0]=1;
    for(int mask=1;mask<(1<<n);mask++){
        int pos=__builtin_popcount(mask);   // 1-indexed position
        for(int num=1;num<=n;num++){
            if(!(mask&(1<<(num-1))))continue;
            if(pos%num==0||num%pos==0)      // compatibility check
                dp[mask]+=dp[mask^(1<<(num-1))];
        }
    }
    return dp[(1<<n)-1];
}`,python:`def count_arrangement(n):
    dp=[0]*(1<<n); dp[0]=1
    for mask in range(1,1<<n):
        pos=bin(mask).count('1')     # 1-indexed
        for num in range(1,n+1):
            if not(mask&(1<<(num-1))):continue
            if pos%num==0 or num%pos==0:
                dp[mask]+=dp[mask^(1<<(num-1))]
    return dp[(1<<n)-1]`}}
      />

      <ProblemCard num={2} title="Partition to K Equal Sum Subsets" difficulty="LC Medium" tags={["LC 698","Subset Feasibility"]}
        statement="Given an integer array <code>nums</code> and integer <code>k</code>, return true if we can partition the array into k non-empty subsets whose sums are all equal."
        constraints={["1 ≤ k ≤ n ≤ 16","1 ≤ nums[i] ≤ 10⁴"]}
        examples={[{input:"nums=[4,3,2,3,5,2,1], k=4",output:"true",note:"(5),(1,4),(2,3),(2,3)"},{input:"nums=[1,2,3,4], k=3",output:"false"}]}
        approach="dp[mask] = current sum being accumulated in the 'in-progress' bucket when numbers in mask have been placed. If dp[mask] == target, the current bucket is complete — next state resets to 0. If total sum not divisible by k → false. State: dp[mask] = running sum of current partial bucket."
        code={{cpp:`bool canPartitionKSubsets(vector<int>& nums,int k){
    int sum=accumulate(nums.begin(),nums.end(),0);
    if(sum%k!=0)return false;
    int target=sum/k,n=nums.size();
    vector<int> dp(1<<n,-1); dp[0]=0;
    sort(nums.rbegin(),nums.rend());   // greedy: try large numbers first
    for(int mask=0;mask<(1<<n);mask++){
        if(dp[mask]==-1)continue;
        for(int i=0;i<n;i++){
            if(mask&(1<<i))continue;
            int next=mask|(1<<i);
            if(dp[mask]+nums[i]<=target)
                dp[next]=(dp[mask]+nums[i])%target;
        }
    }
    return dp[(1<<n)-1]==0;
}`,python:`def can_partition_k_subsets(nums,k):
    s=sum(nums)
    if s%k:return False
    target=s//k; n=len(nums)
    dp=[-1]*(1<<n); dp[0]=0
    nums.sort(reverse=True)
    for mask in range(1<<n):
        if dp[mask]==-1:continue
        for i in range(n):
            if mask&(1<<i):continue
            nxt=mask|(1<<i)
            if dp[mask]+nums[i]<=target:
                dp[nxt]=(dp[mask]+nums[i])%target
    return dp[(1<<n)-1]==0`}}
      />

      <ProblemCard num={3} title="Shortest Path Visiting All Nodes" difficulty="LC Hard" tags={["LC 847","BFS + Bitmask"]}
        statement="Given an undirected connected graph, return the length of the shortest path that visits every node. You can start and stop at any node and revisit nodes."
        constraints={["1 ≤ n ≤ 12","graph is connected"]}
        examples={[{input:"[[1,2,3],[0],[0],[0]]",output:"4",note:"Start at 0, visit 1,2,3"},{input:"[[1],[0,2,4],[1,3,4],[2],[1,2]]",output:"4"}]}
        approach="BFS on state (node, visited_mask). Since we can revisit nodes, BFS (not DP) finds shortest path. Start with all n nodes as sources with distance 0 (multi-source BFS). State visited when mask = all ones. O(2ⁿ × n) states. This is BFS + bitmask, not pure DP."
        code={{cpp:`int shortestPathLength(vector<vector<int>>& graph){
    int n=graph.size(),full=(1<<n)-1;
    queue<tuple<int,int,int>> q;      // {node, mask, steps}
    vector<vector<bool>> vis(n,vector<bool>(1<<n,false));
    for(int i=0;i<n;i++){q.push({i,1<<i,0});vis[i][1<<i]=true;}
    while(!q.empty()){
        auto[u,mask,d]=q.front();q.pop();
        if(mask==full)return d;
        for(int v:graph[u]){
            int nm=mask|(1<<v);
            if(!vis[v][nm]){vis[v][nm]=true;q.push({v,nm,d+1});}
        }
    }
    return -1;
}`,python:`from collections import deque
def shortest_path_length(graph):
    n=len(graph); full=(1<<n)-1
    q=deque([(i,1<<i,0) for i in range(n)])
    vis=[[False]*(1<<n) for _ in range(n)]
    for i in range(n):vis[i][1<<i]=True
    while q:
        u,mask,d=q.popleft()
        if mask==full:return d
        for v in graph[u]:
            nm=mask|(1<<v)
            if not vis[v][nm]:vis[v][nm]=True;q.append((v,nm,d+1))`}}
      />

      <ProblemCard num={4} title="Find the Shortest Superstring" difficulty="LC Hard" tags={["LC 943","TSP on Strings"]}
        statement="Given an array of strings <code>words</code>, return the shortest superstring such that every string in words is a substring of it. Optimize by finding maximum overlap between strings."
        constraints={["1 ≤ n ≤ 12","1 ≤ words[i].length ≤ 20"]}
        examples={[{input:'["alex","loves","leetcode"]',output:'"alexlovesleetcode"'},{input:'["catg","ctaagt","gcta","ttca","atgcatc"]',output:'"gctaagttcatgcatc"'}]}
        approach="TSP on strings. Precompute overlap[i][j] = max characters of words[j] that overlap with the suffix of words[i]. dp[mask][i] = max total overlap when words in mask are concatenated, ending with word i. Answer = sum of all word lengths - max total overlap. O(n² × 2ⁿ)."
        code={{cpp:`string shortestSuperstring(vector<string>& w){
    int n=w.size();
    // Precompute overlaps: how much of w[j]'s prefix matches w[i]'s suffix
    vector<vector<int>> ov(n,vector<int>(n,0));
    for(int i=0;i<n;i++) for(int j=0;j<n;j++) if(i!=j){
        int len=min(w[i].size(),w[j].size());
        for(int k=len;k>=1;k--)
            if(w[i].substr(w[i].size()-k)==w[j].substr(0,k)){ov[i][j]=k;break;}
    }
    // TSP: dp[mask][i] = max overlap when words in mask are used, ending with word i
    int full=(1<<n)-1;
    vector<vector<int>> dp(1<<n,vector<int>(n,0)), par(1<<n,vector<int>(n,-1));
    for(int mask=1;mask<(1<<n);mask++)
        for(int i=0;i<n;i++){if(!(mask&(1<<i)))continue;
            for(int j=0;j<n;j++){if(mask&(1<<j))continue;
                int nm=mask|(1<<j);
                if(dp[nm][j]<dp[mask][i]+ov[i][j])
                    {dp[nm][j]=dp[mask][i]+ov[i][j];par[nm][j]=i;}
            }
        }
    // Reconstruct
    int last=max_element(dp[full].begin(),dp[full].end())-dp[full].begin();
    string res; int mask=full,cur=last;
    while(mask){res=w[cur].substr(mask==(1<<cur)?0:ov[par[mask][cur]][cur])+res;int p=par[mask][cur];mask^=(1<<cur);cur=p;}
    return res;
}`,python:`def shortest_superstring(words):
    n=len(words)
    ov=[[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i==j:continue
            maxk=min(len(words[i]),len(words[j]))
            for k in range(maxk,0,-1):
                if words[i][-k:]==words[j][:k]:ov[i][j]=k;break
    full=(1<<n)-1; INF=float('-inf')
    dp=[[INF]*n for _ in range(1<<n)]; par=[[-1]*n for _ in range(1<<n)]
    for i in range(n):dp[1<<i][i]=0
    for mask in range(1,1<<n):
        for i in range(n):
            if dp[mask][i]==INF or not(mask&(1<<i)):continue
            for j in range(n):
                if mask&(1<<j):continue
                nm=mask|(1<<j)
                if dp[nm][j]<dp[mask][i]+ov[i][j]:
                    dp[nm][j]=dp[mask][i]+ov[i][j];par[nm][j]=i
    last=max(range(n),key=lambda i:dp[full][i])
    # reconstruct omitted for brevity
    return ""`}}
      />
    </div>
  );
}

/* ROOT */
const TABS = [
  { id:'fundamentals',  label:'Bitmask Fundamentals' },
  { id:'tsp',           label:'TSP — Canonical DP'  },
  { id:'applications',  label:'More Applications'   },
  { id:'problems',      label:'Problems'            },
];
export default function DPBitmask() {
  const [active,setActive]=useState('fundamentals');
  const map={
    fundamentals:<SectionFundamentals/>,
    tsp:         <SectionTSP/>,
    applications:<SectionApplications/>,
    problems:    <SectionProblems/>,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 26</div>
        <h1 className="page-header-title">Dynamic Programming — Bitmask</h1>
        <p className="page-header-subtitle">
          Set as Integer · Bit Operations · Subset Enumeration · TSP · Assignment · Hamiltonian Paths · Tiling · Min Edge Deletion · LC 526, 698, 847, 943
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={26}/>
    </div>
  );
}
