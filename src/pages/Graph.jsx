import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   GRAPH DATA — 3×2 grid for BFS/DFS, DAG for Topo
   0-1-3
   | | |
   2-4-5
══════════════════════════════════════════════════════ */
const GPOS = { 0:[75,100], 1:[245,100], 2:[75,230], 3:[415,100], 4:[245,230], 5:[415,230] };
const GEDGES = [[0,1],[1,3],[0,2],[1,4],[3,5],[2,4],[4,5]];
const GADJ   = { 0:[1,2], 1:[0,3,4], 2:[0,4], 3:[1,5], 4:[1,2,5], 5:[3,4] };

/* ── DAG for topological sort ──────────────────────── */
// 5→2, 5→0, 4→0, 4→1, 2→3, 3→1
const DPOS   = { 5:[70,130], 4:[70,260], 2:[230,70], 0:[230,195], 3:[390,70], 1:[390,260] };
const DEDGES = [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]; // directed
const DADJ   = { 5:[2,0], 4:[0,1], 2:[3], 3:[1], 0:[], 1:[] };

/* ══════════════════════════════════════════════════════
   BFS STEPS from node 0
══════════════════════════════════════════════════════ */
function buildBFSSteps() {
  const adj = GADJ, steps = [];
  const visited = new Set(), queue = [], output = [];
  visited.add(0); queue.push(0);
  steps.push({ visited:new Set(visited), queue:[...queue], output:[...output], cur:null, processing:[], action:'init',
    desc:'Initialize: enqueue source (0), mark visited. BFS processes all neighbors of a node before going deeper.' });
  while (queue.length) {
    const cur = queue.shift();
    output.push(cur);
    const newNeighbors = [];
    for (const nb of adj[cur]) {
      if (!visited.has(nb)) { visited.add(nb); queue.push(nb); newNeighbors.push(nb); }
    }
    steps.push({ visited:new Set(visited), queue:[...queue], output:[...output], cur, processing: adj[cur], newNeighbors, action:'dequeue',
      desc: `Dequeue ${cur}. Output = [${output}]. Unvisited neighbors: [${newNeighbors.join(',')||'none'}] → enqueue.` });
  }
  steps.push({ visited:new Set(visited), queue:[], output:[...output], cur:null, processing:[], action:'done',
    desc:`BFS complete! Order: [${output.join('→')}]. Every node visited exactly once. O(V+E) time.` });
  return steps;
}
const BFS_STEPS = buildBFSSteps();

/* ══════════════════════════════════════════════════════
   DFS STEPS from node 0
══════════════════════════════════════════════════════ */
function buildDFSSteps() {
  const adj = GADJ, steps = [];
  const visited = new Set(), output = [], callStack = [];
  steps.push({ visited:new Set(), callStack:[], output:[], cur:null, action:'init',
    desc:'DFS explores as FAR as possible before backtracking. Implemented via recursion (implicit call stack) or explicit stack.' });
  function dfs(node, parent) {
    visited.add(node); callStack.push(node);
    steps.push({ visited:new Set(visited), callStack:[...callStack], output:[...output], cur:node, action:'visit',
      desc:`VISIT ${node}. Call stack depth = ${callStack.length}. Exploring neighbors: [${adj[node].join(',')}]` });
    output.push(node);
    for (const nb of adj[node]) {
      if (!visited.has(nb)) {
        steps.push({ visited:new Set(visited), callStack:[...callStack], output:[...output], cur:node, next:nb, action:'recurse',
          desc:`${node} → recurse into unvisited neighbor ${nb}.` });
        dfs(nb, node);
        steps.push({ visited:new Set(visited), callStack:[...callStack], output:[...output], cur:node, action:'back',
          desc:`Returned to ${node} from subtree. Continue checking remaining neighbors.` });
      } else {
        steps.push({ visited:new Set(visited), callStack:[...callStack], output:[...output], cur:node, skip:nb, action:'skip',
          desc:`${node}: neighbor ${nb} already visited — skip.` });
      }
    }
    callStack.pop();
    steps.push({ visited:new Set(visited), callStack:[...callStack], output:[...output], cur:node, action:'backtrack',
      desc:`All neighbors of ${node} done. BACKTRACK. Pop from call stack.` });
  }
  dfs(0, -1);
  steps.push({ visited:new Set(visited), callStack:[], output:[...output], cur:null, action:'done',
    desc:`DFS complete! Order: [${output.join('→')}]. O(V+E) time.` });
  return steps;
}
const DFS_STEPS = buildDFSSteps();

/* ══════════════════════════════════════════════════════
   KAHN'S TOPOLOGICAL SORT STEPS
   DAG: 5→2, 5→0, 4→0, 4→1, 2→3, 3→1
   In-degrees: 0:2, 1:2, 2:1, 3:1, 4:0, 5:0
══════════════════════════════════════════════════════ */
function buildTopoSteps() {
  const adj = DADJ, steps = [];
  const inDeg = {0:2,1:2,2:1,3:1,4:0,5:0};
  const queue = [4,5], output = [];
  const curDeg = {...inDeg};
  steps.push({ queue:[...queue], curDeg:{...curDeg}, output:[], processed:new Set(), action:'init',
    desc:'Kahn\'s Algorithm: start with all nodes having in-degree = 0. Edges: 5→2, 5→0, 4→0, 4→1, 2→3, 3→1.' });
  while (queue.length) {
    queue.sort((a,b)=>a-b);
    const cur = queue.shift();
    output.push(cur);
    const reduced = [];
    for (const nb of adj[cur]) {
      curDeg[nb]--;
      reduced.push({nb, newDeg:curDeg[nb]});
      if (curDeg[nb]===0) queue.push(nb);
    }
    steps.push({ queue:[...queue], curDeg:{...curDeg}, output:[...output], processed:new Set(output), cur, reduced, action:'process',
      desc: `Dequeue ${cur}. Remove its outgoing edges: ${reduced.map(r=>`in-deg(${r.nb})→${r.newDeg}`).join(', ')||'(no outgoing)'}. ${reduced.filter(r=>r.newDeg===0).map(r=>r.nb).length?'New zero-degree nodes added to queue.':''} Output=[${output}].` });
  }
  steps.push({ queue:[], curDeg:{...curDeg}, output:[...output], processed:new Set(output), action:'done',
    desc:`Topological order: [${output.join('→')}]. If output.length < V → cycle detected!` });
  return steps;
}
const TOPO_STEPS = buildTopoSteps();

/* ══════════════════════════════════════════════════════
   SHARED GRAPH SVG — used across all 3 visualizers
══════════════════════════════════════════════════════ */
function GraphSVG({ pos, edges, hl={}, directed=false, labels={}, W=500, H=350, edgeHL={} }) {
  const CLR = { visited:'#1A3A2A', cur:'#3A2A1A', queue:'#1A2A3A', skip:'#2A1A1A', done:'#1A3A2A', topo:'#2A1A3A', none:'#131722' };
  const STR = { visited:'#4EC9B0', cur:'#CE9178', queue:'#81B4EA', skip:'#F44747', done:'#4EC9B0', topo:'#C586C0', none:'#1E2233' };
  const TXT = { visited:'#4EC9B0', cur:'#CE9178', queue:'#9CDCFE', skip:'#F44747', done:'#4EC9B0', topo:'#C586C0', none:'#6A7490' };
  const R = 22;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {edges.map(([a,b],i)=>{
        const pa=pos[a], pb=pos[b];
        const key=`${a}-${b}`;
        const eh=edgeHL[key]||edgeHL[`${b}-${a}`];
        const col=eh?STR[eh]:'#2A3050';
        if (directed) {
          const dx=pb[0]-pa[0],dy=pb[1]-pa[1],len=Math.sqrt(dx*dx+dy*dy);
          const ux=dx/len,uy=dy/len;
          const sx=pa[0]+ux*R,sy=pa[1]+uy*R;
          const ex=pb[0]-ux*R,ey=pb[1]-uy*R;
          const hx=ex-ux*10,hy=ey-uy*10;
          const px1=hx+uy*6,py1=hy-ux*6,px2=hx-uy*6,py2=hy+ux*6;
          return (<g key={i}><line x1={sx} y1={sy} x2={ex} y2={ey} stroke={col} strokeWidth={eh?2:1.5}/><polygon points={`${ex},${ey} ${px1},${py1} ${px2},${py2}`} fill={col}/></g>);
        }
        return <line key={i} x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} stroke={col} strokeWidth={eh?2:1.5}/>;
      })}
      {Object.keys(pos).map(v=>{
        const nv=+v,[x,y]=pos[nv], c=hl[nv]||'none';
        const lbl=labels[nv];
        return (<g key={v}>
          <circle cx={x} cy={y} r={R} fill={CLR[c]} stroke={STR[c]} strokeWidth={c!=='none'?2:1}/>
          <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fill={TXT[c]} fontSize="13" fontFamily="monospace" fontWeight={c!=='none'?700:500}>{v}</text>
          {lbl&&<text x={x} y={y+R+14} textAnchor="middle" fill={STR[c]} fontSize="10" fontFamily="monospace" fontWeight="700">{lbl}</text>}
        </g>);
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — BFS / DFS STEP-THROUGH (tab switch)
══════════════════════════════════════════════════════ */
function TraversalViz() {
  const [mode, setMode] = useState('bfs');
  const [step, setStep] = useState(0);
  const steps = mode==='bfs' ? BFS_STEPS : DFS_STEPS;
  const s = steps[Math.min(step, steps.length-1)];
  const changeMode = m => { setMode(m); setStep(0); };

  const hl = {};
  (s.visited||new Set()).forEach(v => { if (!hl[v]) hl[v]='visited'; });
  if (s.cur!=null) hl[s.cur]='cur';
  if (mode==='bfs') (s.queue||[]).forEach(v=>{ if (!hl[v]) hl[v]='queue'; });
  if (mode==='dfs') (s.callStack||[]).forEach(v=>{ if (!hl[v]&&v!==s.cur) hl[v]='queue'; });
  if (s.skip!=null) hl[s.skip]='skip';

  const ACT_CLR = { visit:'success', dequeue:'info', recurse:'warning', back:'secondary', backtrack:'warning', skip:'danger', done:'success', init:null };
  const ac = ACT_CLR[s.action];

  return (
    <VizBox>
      <div style={{display:'flex',gap:8,marginBottom:14}}>
        {[['bfs','BFS — Level by Level'],['dfs','DFS — Go Deep First']].map(([m,l])=>(
          <button key={m} onClick={()=>changeMode(m)} style={{padding:'4px 12px',border:'1px solid',borderColor:mode===m?'var(--color-border-info)':'var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:mode===m?'var(--color-background-info)':'transparent',color:mode===m?'var(--color-text-info)':'var(--color-text-secondary)',cursor:'pointer',fontSize:12}}>{l}</button>
        ))}
      </div>
      <div style={{marginBottom:12,display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        {ac&&<span style={{padding:'2px 9px',borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${ac})`,color:`var(--color-text-${ac})`,border:`1px solid var(--color-border-${ac})`,whiteSpace:'nowrap'}}>{s.action==='visit'?'Visit':s.action==='dequeue'?'Dequeue':s.action==='recurse'?'Recurse':s.action==='backtrack'?'Backtrack':s.action==='done'?'Done ✓':s.action}</span>}
        <span style={{fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>{s.desc}</span>
      </div>
      <div style={{overflowX:'auto',marginBottom:12}}>
        <GraphSVG pos={GPOS} edges={GEDGES} hl={hl} W={500} H={350}/>
      </div>
      {/* Queue / Call stack + Output */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        <div>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:5,letterSpacing:'0.06em'}}>{mode==='bfs'?'QUEUE (FIFO)':'CALL STACK'}</div>
          <div style={{display:'flex',gap:4,flexWrap:'wrap',minHeight:36,alignItems:'center'}}>
            {(mode==='bfs'?(s.queue||[]):(s.callStack||[])).length===0
              ?<span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',border:'1px dashed var(--color-border-tertiary)',padding:'4px 12px',borderRadius:6}}>empty</span>
              :(mode==='bfs'?(s.queue||[]):[...(s.callStack||[])].reverse()).map((v,i)=>(
                <div key={i} style={{padding:'4px 10px',borderRadius:5,border:'1px solid var(--color-border-info)',background:'var(--color-background-info)',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:'var(--color-text-info)'}}>{v}{mode==='dfs'&&i===0&&<span style={{fontSize:9,opacity:0.6,marginLeft:3}}>← top</span>}</div>
              ))
            }
          </div>
        </div>
        <div>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:5,letterSpacing:'0.06em'}}>OUTPUT</div>
          <div style={{display:'flex',gap:4,flexWrap:'wrap',minHeight:36,alignItems:'center'}}>
            {(s.output||[]).length===0
              ?<span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)'}}>…</span>
              :(s.output||[]).map((v,i)=>(
                <div key={i} style={{padding:'4px 10px',borderRadius:5,border:`1px solid ${i===(s.output.length-1)&&s.action!=='done'?'var(--color-border-success)':'var(--color-border-secondary)'}`,background:i===(s.output.length-1)&&s.action!=='done'?'var(--color-background-success)':'var(--color-background-secondary)',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:i===(s.output.length-1)&&s.action!=='done'?'var(--color-text-success)':'var(--color-text-secondary)',transition:'all 0.15s'}}>{v}</div>
              ))
            }
          </div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(steps.length-1,step+1)),step===steps.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:64,textAlign:'center',alignSelf:'center'}}>{step+1}/{steps.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(steps.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — KAHN'S TOPOLOGICAL SORT
   Shows in-degree countdown + queue state
══════════════════════════════════════════════════════ */
function TopoViz() {
  const [step, setStep] = useState(0);
  const s = TOPO_STEPS[Math.min(step, TOPO_STEPS.length-1)];

  const hl = {};
  (s.processed||new Set()).forEach(v=>{ hl[v]='visited'; });
  if (s.cur!=null) hl[s.cur]='cur';
  (s.queue||[]).forEach(v=>{ if(!hl[v]) hl[v]='queue'; });

  const labels = {};
  Object.entries(s.curDeg||{}).forEach(([v,d])=>{ labels[+v]=`d=${d}`; });

  return (
    <VizBox>
      <div style={{marginBottom:12,padding:'6px 10px',background:'var(--color-background-secondary)',borderRadius:'var(--border-radius-md)',fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>{s.desc}</div>
      <div style={{overflowX:'auto',marginBottom:12}}>
        <GraphSVG pos={DPOS} edges={DEDGES} hl={hl} directed={true} labels={labels} W={490} H={350}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        <div>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:5,letterSpacing:'0.06em'}}>QUEUE (in-degree = 0)</div>
          <div style={{display:'flex',gap:4,flexWrap:'wrap',minHeight:36,alignItems:'center'}}>
            {(s.queue||[]).length===0
              ?<span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',border:'1px dashed var(--color-border-tertiary)',padding:'4px 12px',borderRadius:6}}>empty</span>
              :(s.queue||[]).map((v,i)=>(
                <div key={i} style={{padding:'4px 10px',borderRadius:5,border:'1px solid var(--color-border-info)',background:'var(--color-background-info)',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:'var(--color-text-info)'}}>{v}</div>
              ))
            }
          </div>
        </div>
        <div>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:5,letterSpacing:'0.06em'}}>TOPOLOGICAL ORDER</div>
          <div style={{display:'flex',gap:4,flexWrap:'wrap',minHeight:36,alignItems:'center'}}>
            {(s.output||[]).length===0
              ?<span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)'}}>…</span>
              :(s.output||[]).map((v,i)=>(
                <div key={i} style={{padding:'4px 10px',borderRadius:5,border:`1px solid ${i===(s.output.length-1)&&s.action!=='done'?'var(--color-border-success)':'var(--color-border-secondary)'}`,background:i===(s.output.length-1)&&s.action!=='done'?'var(--color-background-success)':'var(--color-background-secondary)',fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:i===(s.output.length-1)&&s.action!=='done'?'var(--color-text-success)':'var(--color-text-secondary)'}}>{v}</div>
              ))
            }
          </div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(TOPO_STEPS.length-1,step+1)),step===TOPO_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{TOPO_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
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
   SECTION 1 — GRAPH FUNDAMENTALS
══════════════════════════════════════════════════════ */
function SectionFundamentals() {
  return (
    <div>
      <Note color="info" icon="ti-network">
        A graph G = (V, E) consists of a set of <strong>vertices</strong> (nodes) and <strong>edges</strong> (connections). Unlike trees, graphs can have cycles, multiple paths between nodes, and disconnected components. They model virtually everything: social networks, maps, internet routing, dependency resolution.
      </Note>

      <H2>Types of Graphs</H2>
      <Table
        heads={["Type","Definition","Example"]}
        rows={[
          ["Undirected","Edges have no direction. A–B = B–A.","Social friendships, road networks"],
          ["Directed (Digraph)","Edges have direction. A→B ≠ B→A.","Twitter follows, task dependencies"],
          ["Weighted","Each edge carries a numeric weight.","Road distances, network bandwidth"],
          ["Unweighted","All edges treated equally (weight=1).","Binary connectivity"],
          ["DAG","Directed Acyclic Graph — no cycles.","Build systems, course prerequisites"],
          ["Complete","Every pair of vertices has an edge.","K_n: n(n-1)/2 edges"],
          ["Bipartite","Vertices split into 2 sets, edges only between sets.","Job matching, 2-colorable graphs"],
          ["Tree","Connected undirected graph with no cycles. V-1 edges.","File system hierarchy"],
        ]}
      />

      <H2>Graph Representation</H2>
      <Grid cols={2}>
        <Card title="Adjacency Matrix" color="warning">
          V×V boolean matrix. adj[i][j]=1 iff edge i→j. O(1) edge lookup. O(V²) space — bad for sparse graphs.
        </Card>
        <Card title="Adjacency List" color="success">
          Each vertex stores list of neighbors. O(V+E) space. O(degree) edge lookup. Default choice for most algorithms.
        </Card>
      </Grid>
      <Code>{{cpp:`// Adjacency List (most common)
#include <vector>
using namespace std;

// Undirected, unweighted
vector<vector<int>> adj(V);
adj[u].push_back(v);
adj[v].push_back(u);       // both directions

// Directed weighted
vector<vector<pair<int,int>>> adj(V);  // {neighbor, weight}
adj[u].push_back({v, w});  // only u→v

// Adjacency Matrix (for dense graphs / O(1) edge check)
vector<vector<int>> mat(V, vector<int>(V, 0));
mat[u][v] = 1;             // directed
mat[u][v] = mat[v][u] = 1; // undirected`, python:`# Adjacency list
from collections import defaultdict, deque
adj = defaultdict(list)
adj[u].append(v)           # directed
adj[u].append(v); adj[v].append(u)  # undirected

# Weighted: adj[u].append((v, weight))

# Build from edge list:
def build_graph(n, edges, directed=False):
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        if not directed: adj[v].append(u)
    return adj`}}</Code>

      <H2>Key Terminologies</H2>
      <Table
        heads={["Term","Definition"]}
        rows={[
          ["Degree","Number of edges at a vertex. In-degree/out-degree for directed graphs."],
          ["Path","Sequence of vertices connected by edges. Length = number of edges."],
          ["Cycle","Path that starts and ends at the same vertex."],
          ["Connected","Undirected: every vertex reachable from any other. Directed: strongly/weakly connected."],
          ["Component","Maximal connected subgraph."],
          ["Bridge","Edge whose removal disconnects the graph."],
          ["Articulation point","Vertex whose removal disconnects the graph."],
          ["Strongly connected component (SCC)","Maximal subgraph where every vertex reaches every other (directed)."],
        ]}
      />

      <QA q="When should you use an adjacency matrix vs an adjacency list?" a="Adjacency matrix: use when (1) the graph is dense (E ≈ V²), (2) you need O(1) edge existence checks frequently, (3) V is small (≤ 1000). Adjacency list: use when (1) the graph is sparse (E ≪ V²), (2) you iterate over neighbors frequently, (3) V is large. In competitive programming and interview problems, adjacency lists are almost always correct. Matrix uses O(V²) space — for V=10⁵ nodes, that's 10¹⁰ entries, infeasible." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — BFS
══════════════════════════════════════════════════════ */
function SectionBFS() {
  return (
    <div>
      <Note color="success" icon="ti-wave-square">
        BFS explores a graph level by level using a queue. It guarantees the <strong>shortest path</strong> (by edge count) from source to any reachable vertex in unweighted graphs. The key: mark nodes visited <em>when enqueued</em>, not when dequeued — prevents duplicates in queue.
      </Note>

      <H2>BFS Step-Through — Interactive</H2>
      <P>Watch BFS explore the 3×2 grid starting from node 0. Blue = in queue, orange = currently processing, green = visited and done.</P>
      <TraversalViz />
      <Code>{{cpp:`// BFS template — single source, unweighted shortest path
vector<int> bfs(vector<vector<int>>& adj, int src, int V) {
    vector<int> dist(V, -1);
    queue<int> q;
    dist[src] = 0;
    q.push(src);                         // mark WHEN ENQUEUED (not dequeued)
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {         // unvisited
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;                         // dist[v] = shortest path length, -1 = unreachable
}`, python:`from collections import deque

def bfs(adj, src, V):
    dist = [-1] * V
    dist[src] = 0
    q = deque([src])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist`}}</Code>

      <H2>Multi-Source BFS</H2>
      <P>When you need BFS from multiple starting nodes simultaneously (e.g., LC 994 Rotting Oranges: all initially rotten cells spread at once), enqueue ALL sources before the first iteration. The BFS naturally computes the minimum distance from ANY source.</P>
      <Code>{{cpp:`// Multi-source BFS: enqueue ALL sources with dist=0
void multiSourceBFS(vector<vector<int>>& grid) {
    int m=grid.size(),n=grid[0].size();
    queue<pair<int,int>> q;
    vector<vector<int>> dist(m,vector<int>(n,-1));
    // Enqueue all sources first
    for(int r=0;r<m;r++) for(int c=0;c<n;c++)
        if(grid[r][c]==SOURCE) { dist[r][c]=0; q.push({r,c}); }
    // Standard BFS propagation
    int dx[]={0,0,1,-1}, dy[]={1,-1,0,0};
    while(!q.empty()){
        auto[r,c]=q.front();q.pop();
        for(int d=0;d<4;d++){
            int nr=r+dx[d],nc=c+dy[d];
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&dist[nr][nc]==-1&&grid[nr][nc]==PASSABLE){
                dist[nr][nc]=dist[r][c]+1;
                q.push({nr,nc});
            }
        }
    }
}`, python:`def multi_source_bfs(grid):
    m,n=len(grid),len(grid[0])
    dist=[[-1]*n for _ in range(m)]
    q=deque()
    for r in range(m):
        for c in range(n):
            if grid[r][c]==SOURCE: dist[r][c]=0; q.append((r,c))
    while q:
        r,c=q.popleft()
        for nr,nc in[(r+1,c),(r-1,c),(r,c+1),(r,c-1)]:
            if 0<=nr<m and 0<=nc<n and dist[nr][nc]==-1 and grid[nr][nc]==PASSABLE:
                dist[nr][nc]=dist[r][c]+1; q.append((nr,nc))`}}</Code>

      <H2>BFS Applications Cheatsheet</H2>
      <Table
        heads={["Problem Pattern","BFS Application","Example"]}
        rows={[
          ["Shortest path (unweighted)","BFS from source, dist[] array","LC 1091 shortest path in binary matrix"],
          ["Connected components","BFS from each unvisited node","LC 200 number of islands"],
          ["Multi-source shortest path","Enqueue all sources at dist=0","LC 994 rotting oranges"],
          ["Level-order tree traversal","BFS with queue-size snapshot","LC 102 binary tree level order"],
          ["Bipartite check","BFS 2-coloring","LC 785 is graph bipartite"],
          ["Flood fill","BFS/DFS from source cell","LC 733 flood fill"],
        ]}
      />

      <QA q="Why is BFS guaranteed to find the shortest path in unweighted graphs?" a="BFS explores nodes in strictly increasing order of distance from the source. Level 0 = source, level 1 = all distance-1 nodes, etc. When we first reach a node, it's via the shortest path — because any longer path would arrive later (at a deeper BFS level). This guarantee breaks for weighted graphs (use Dijkstra instead) and also breaks if you mark visited at dequeue instead of enqueue (a node might be queued multiple times via different paths)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — DFS & CYCLE DETECTION
══════════════════════════════════════════════════════ */
function SectionDFS() {
  return (
    <div>
      <H2>DFS — Go Deep First</H2>
      <P>DFS explores as deep as possible before backtracking. Uses the call stack (recursive) or an explicit stack (iterative). The order of visiting depends on neighbor ordering — but all algorithms share the "explore fully before backtracking" property.</P>
      <Note color="info" icon="ti-arrow-right">
        In BFS, switch tabs above. In DFS tab: watch the call stack grow as recursion deepens, and shrink as each node backtracks.
      </Note>
      <Code>{{cpp:`// Recursive DFS
void dfs(vector<vector<int>>& adj, vector<bool>& vis, int u) {
    vis[u] = true;
    process(u);                  // do whatever with this node
    for (int v : adj[u])
        if (!vis[v]) dfs(adj, vis, v);
}

// Iterative DFS (stack — note: neighbor order reversed vs recursive)
void dfsIter(vector<vector<int>>& adj, int src, int V) {
    vector<bool> vis(V, false);
    stack<int> st; st.push(src); vis[src] = true;
    while (!st.empty()) {
        int u = st.top(); st.pop();
        process(u);
        for (int v : adj[u])         // push in REVERSE for same order as recursive
            if (!vis[v]) { vis[v]=true; st.push(v); }
    }
}`, python:`def dfs(adj, u, visited):
    visited.add(u)
    process(u)
    for v in adj[u]:
        if v not in visited:
            dfs(adj, v, visited)

# Count connected components:
def count_components(adj, V):
    visited = set(); count = 0
    for u in range(V):
        if u not in visited:
            dfs(adj, u, visited)
            count += 1
    return count`}}</Code>

      <H2>Cycle Detection — Undirected Graph</H2>
      <P>A cycle exists if during DFS we encounter an already-visited node that isn't our direct parent. The parent check avoids false positives from back-edges (undirected edges revisited in the opposite direction).</P>
      <Code>{{cpp:`bool hasCycleUndirected(vector<vector<int>>& adj, int V) {
    vector<bool> vis(V, false);

    function<bool(int, int)> dfs = [&](int u, int parent) -> bool {
        vis[u] = true;
        for (int v : adj[u]) {
            if (!vis[v]) {
                if (dfs(v, u)) return true;
            } else if (v != parent) {   // visited but not parent → cycle!
                return true;
            }
        }
        return false;
    };

    for (int u = 0; u < V; u++)
        if (!vis[u] && dfs(u, -1)) return true;
    return false;
}
// [0-1-2-0]: dfs(0,-1)→vis 0→dfs(1,0)→vis 1→dfs(2,1)→vis 2
// check neighbor 0: vis[0]=true, 0≠parent(1) → CYCLE!`, python:`def has_cycle_undirected(adj, V):
    vis = set()
    def dfs(u, parent):
        vis.add(u)
        for v in adj[u]:
            if v not in vis:
                if dfs(v, u): return True
            elif v != parent:   # visited but not parent → back edge → cycle
                return True
        return False
    for u in range(V):
        if u not in vis and dfs(u, -1): return True
    return False`}}</Code>

      <H2>Cycle Detection — Directed Graph (3-Color DFS)</H2>
      <P>In directed graphs, "visited but not parent" is insufficient — edges can legitimately revisit nodes in different DFS trees. Instead, use 3 colors: WHITE (unvisited), GRAY (in current DFS path), BLACK (fully processed). A back edge to a GRAY node = cycle.</P>
      <Code>{{cpp:`enum Color { WHITE, GRAY, BLACK };
bool hasCycleDirected(vector<vector<int>>& adj, int V) {
    vector<Color> color(V, WHITE);

    function<bool(int)> dfs = [&](int u) -> bool {
        color[u] = GRAY;          // mark as "in current path"
        for (int v : adj[u]) {
            if      (color[v]==GRAY)  return true;   // back edge → cycle!
            else if (color[v]==WHITE && dfs(v)) return true;
        }
        color[u] = BLACK;         // fully explored, no cycle from u
        return false;
    };

    for (int u = 0; u < V; u++)
        if (color[u]==WHITE && dfs(u)) return true;
    return false;
}
// GRAY = "currently on DFS call stack". Back edge to GRAY node = cycle.`, python:`def has_cycle_directed(adj, V):
    WHITE,GRAY,BLACK=0,1,2
    color=[WHITE]*V
    def dfs(u):
        color[u]=GRAY
        for v in adj[u]:
            if color[v]==GRAY:return True      # back edge!
            if color[v]==WHITE and dfs(v):return True
        color[u]=BLACK; return False
    return any(color[u]==WHITE and dfs(u) for u in range(V))`}}</Code>

      <H2>DFS Properties and Applications</H2>
      <Table
        heads={["Application","DFS Mechanism","Complexity"]}
        rows={[
          ["Connected components","DFS from each unvisited vertex","O(V+E)"],
          ["Cycle detection (undirected)","Parent check on revisited node","O(V+E)"],
          ["Cycle detection (directed)","3-color (white/gray/black)","O(V+E)"],
          ["Topological sort","Record nodes on DFS finish (post-order)","O(V+E)"],
          ["Strongly Connected Components","Kosaraju's or Tarjan's","O(V+E)"],
          ["Bridges and articulation points","DFS with discovery/low times","O(V+E)"],
          ["Path finding (any path)","DFS with backtracking","O(V+E)"],
        ]}
      />

      <QA q="When does a 3-node DFS cause false cycle detection in undirected graphs without the parent check?" a="Without parent check: if edge A-B exists and we DFS from A, we visit B, then B sees A (already visited). Without the parent check, B would think: 'A is visited and A≠parent — cycle!' But there's no cycle — it's just the same edge traversed from both ends. The fix: only flag a visited node as a cycle if it's not the node we came from (parent). This is specific to undirected graphs; directed graphs use the 3-color scheme instead." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — TOPOLOGICAL SORT
══════════════════════════════════════════════════════ */
function SectionTopoSort() {
  return (
    <div>
      <Note color="warning" icon="ti-arrow-right">
        <strong>Topological sort</strong> linearly orders vertices of a DAG such that for every directed edge u→v, u comes before v. Only possible if the graph has NO cycles. Used for: build systems, course scheduling, dependency resolution, compilation order.
      </Note>

      <H2>Kahn's Algorithm (BFS-Based) — Interactive</H2>
      <P>Remove nodes with in-degree 0 iteratively. Each removal reduces in-degrees of neighbors. If all V nodes are output → valid topo order. If fewer → cycle exists.</P>
      <TopoViz />
      <Code>{{cpp:`vector<int> topoKahn(vector<vector<int>>& adj, int V) {
    vector<int> inDeg(V, 0);
    for (int u=0; u<V; u++)
        for (int v : adj[u]) inDeg[v]++;

    queue<int> q;
    for (int u=0; u<V; u++)
        if (inDeg[u]==0) q.push(u);

    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--inDeg[v] == 0) q.push(v);   // in-degree drops to 0 → add to queue
        }
    }
    if (order.size() != V) return {};  // cycle detected!
    return order;
}
// Time: O(V+E)  Space: O(V)`, python:`from collections import deque
def topo_kahn(adj, V):
    in_deg=[0]*V
    for u in range(V):
        for v in adj[u]: in_deg[v]+=1
    q=deque(u for u in range(V) if in_deg[u]==0)
    order=[]
    while q:
        u=q.popleft(); order.append(u)
        for v in adj[u]:
            in_deg[v]-=1
            if in_deg[v]==0: q.append(v)
    return order if len(order)==V else []  # empty = cycle`}}</Code>

      <H2>DFS-Based Topological Sort</H2>
      <P>Complete DFS on all nodes. When a node is fully processed (all its successors visited), prepend it to the result. The reversal of DFS finish order = valid topological order.</P>
      <Code>{{cpp:`vector<int> topoDFS(vector<vector<int>>& adj, int V) {
    vector<bool> vis(V, false);
    stack<int> stk;              // stores nodes in reverse finish order

    function<void(int)> dfs = [&](int u) {
        vis[u] = true;
        for (int v : adj[u])
            if (!vis[v]) dfs(v);
        stk.push(u);             // push AFTER all descendants done
    };

    for (int u=0; u<V; u++)
        if (!vis[u]) dfs(u);

    vector<int> order;
    while (!stk.empty()) { order.push_back(stk.top()); stk.pop(); }
    return order;               // pop order = topo order
}
// Equivalent: reverse of DFS post-order finish times`, python:`def topo_dfs(adj, V):
    vis=set(); order=[]
    def dfs(u):
        vis.add(u)
        for v in adj[u]:
            if v not in vis: dfs(v)
        order.append(u)    # append AFTER all descendants
    for u in range(V):
        if u not in vis: dfs(u)
    return order[::-1]     # reverse = topological order`}}</Code>

      <Grid cols={2}>
        <Card title="Kahn's (BFS)" color="info">
          Naturally detects cycles: if output.size() &lt; V, a cycle prevents some nodes from ever reaching in-degree 0. Easier to reason about.
        </Card>
        <Card title="DFS post-order" color="success">
          Works by noting that a node should come before all its descendants. Push to stack after all successors done. Reverse = topo order.
        </Card>
      </Grid>

      <H2>Classic Interview Problems — Topological Sort</H2>
      <Code>{{cpp:`// Course Schedule (LC 207): can all courses be taken?
// → Check if a DAG has no cycle → run Kahn's, check output.size()==numCourses

// Course Schedule II (LC 210): return a valid order
// → Return Kahn's output (or empty if cycle)

// Build order: package A depends on B,C; B depends on C
// → Build dependency graph (directed), run topo sort

// Alien Dictionary (LC 269): infer character order from sorted words
// → Build char-ordering graph from adjacent word comparisons, topo sort chars`, python:`# Course Schedule pattern:
def can_finish(numCourses, prerequisites):
    adj=[[] for _ in range(numCourses)]
    in_deg=[0]*numCourses
    for a,b in prerequisites:
        adj[b].append(a); in_deg[a]+=1
    q=deque(i for i in range(numCourses) if in_deg[i]==0)
    count=0
    while q:
        u=q.popleft(); count+=1
        for v in adj[u]:
            in_deg[v]-=1
            if in_deg[v]==0: q.append(v)
    return count==numCourses  # True = no cycle = can finish all courses`}}</Code>

      <QA q="Can a graph have multiple valid topological orderings? Which algorithm gives the lexicographically smallest?" a="Yes — any DAG with vertices of in-degree 0 simultaneously can choose any of them first, giving multiple valid orderings. For lexicographically smallest: use Kahn's algorithm with a MIN-HEAP instead of a regular queue. This ensures that among all valid candidates at each step, the smallest vertex is chosen first. Time: O((V+E) log V) due to the heap." />
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
        6 graph problems — LC 200, 994, 102, 133 (prescribed) plus 2 topology/cycle problems. All foundational patterns for any graph interview.
      </Note>

      <ProblemCard num={1} title="Number of Islands" difficulty="LC Medium" tags={["LC 200","Grid DFS/BFS"]}
        statement="Given an m×n grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent (4-directional) land cells."
        constraints={["1 ≤ m,n ≤ 300","grid[i][j] is '0' or '1'"]}
        examples={[{input:`[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]`,output:"3"}]}
        approach="For each unvisited '1', run BFS/DFS to mark the entire island as visited (sink it: flip to '0' in-place). Count how many BFS/DFS calls are made. Each call discovers one island. O(m×n) time and space."
        code={{cpp:`int numIslands(vector<vector<char>>& grid){
    int m=grid.size(),n=grid[0].size(),count=0;
    auto bfs=[&](int r,int c){
        queue<pair<int,int>>q;q.push({r,c});grid[r][c]='0';
        while(!q.empty()){auto[x,y]=q.front();q.pop();
            for(auto[dx,dy]:vector<pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}})
                if(x+dx>=0&&x+dx<m&&y+dy>=0&&y+dy<n&&grid[x+dx][y+dy]=='1')
                    {grid[x+dx][y+dy]='0';q.push({x+dx,y+dy});}
        }
    };
    for(int r=0;r<m;r++) for(int c=0;c<n;c++)
        if(grid[r][c]=='1'){bfs(r,c);count++;}
    return count;
}`,python:`def num_islands(grid):
    m,n=len(grid),len(grid[0]); count=0
    def bfs(r,c):
        q=deque([(r,c)]); grid[r][c]='0'
        while q:
            x,y=q.popleft()
            for nx,ny in[(x+1,y),(x-1,y),(x,y+1),(x,y-1)]:
                if 0<=nx<m and 0<=ny<n and grid[nx][ny]=='1':
                    grid[nx][ny]='0'; q.append((nx,ny))
    for r in range(m):
        for c in range(n):
            if grid[r][c]=='1':bfs(r,c);count+=1
    return count`}}
      />

      <ProblemCard num={2} title="Rotting Oranges" difficulty="LC Medium" tags={["LC 994","Multi-Source BFS"]}
        statement="Grid with 0=empty, 1=fresh, 2=rotten oranges. Each minute, rotten oranges spread to adjacent fresh ones. Return the minimum minutes until no fresh orange remains, or -1 if impossible."
        constraints={["1 ≤ m,n ≤ 10","grid[i][j] is 0,1, or 2"]}
        examples={[{input:"[[2,1,1],[1,1,0],[0,1,1]]",output:"4"},{input:"[[2,1,1],[0,1,1],[1,0,1]]",output:"-1",note:"Bottom-left orange isolated"}]}
        approach="Multi-source BFS: enqueue ALL initially rotten oranges at time=0. BFS spreads rot simultaneously from all sources — naturally computes minimum time. After BFS, if any '1' remains → return -1. Time complexity O(m×n)."
        code={{cpp:`int orangesRotting(vector<vector<int>>& g){
    int m=g.size(),n=g[0].size(),fresh=0,time=0;
    queue<pair<int,int>>q;
    for(int r=0;r<m;r++) for(int c=0;c<n;c++){
        if(g[r][c]==2) q.push({r,c});
        if(g[r][c]==1) fresh++;
    }
    int dx[]={1,-1,0,0},dy[]={0,0,1,-1};
    while(!q.empty()&&fresh>0){
        int sz=q.size(); time++;
        while(sz--){auto[r,c]=q.front();q.pop();
            for(int d=0;d<4;d++){int nr=r+dx[d],nc=c+dy[d];
                if(nr>=0&&nr<m&&nc>=0&&nc<n&&g[nr][nc]==1)
                    {g[nr][nc]=2;fresh--;q.push({nr,nc});}
            }
        }
    }
    return fresh==0?time:-1;
}`,python:`def oranges_rotting(grid):
    m,n=len(grid),len(grid[0]); q=deque(); fresh=0
    for r in range(m):
        for c in range(n):
            if grid[r][c]==2:q.append((r,c,0))
            elif grid[r][c]==1:fresh+=1
    time=0
    while q:
        r,c,t=q.popleft()
        for nr,nc in[(r+1,c),(r-1,c),(r,c+1),(r,c-1)]:
            if 0<=nr<m and 0<=nc<n and grid[nr][nc]==1:
                grid[nr][nc]=2;fresh-=1;time=t+1;q.append((nr,nc,t+1))
    return time if fresh==0 else -1`}}
      />

      <ProblemCard num={3} title="Binary Tree Level Order Traversal" difficulty="LC Medium" tags={["LC 102","BFS Tree"]}
        statement="Given the root of a binary tree, return the level order traversal of its nodes' values as a list of lists (each level as a sublist)."
        constraints={["0 ≤ nodes ≤ 2000","-1000 ≤ val ≤ 1000"]}
        examples={[{input:"[3,9,20,null,null,15,7]",output:"[[3],[9,20],[15,7]]"}]}
        approach="BFS with queue-size snapshot: at the start of each level, record queue.size() — that's exactly how many nodes belong to this level. Process exactly that many nodes, building the level array. Add children of processed nodes for the next level."
        code={{cpp:`vector<vector<int>> levelOrder(TreeNode* root){
    if(!root)return{};
    vector<vector<int>> res; queue<TreeNode*> q; q.push(root);
    while(!q.empty()){int sz=q.size();vector<int>lv;
        while(sz--){auto n=q.front();q.pop();lv.push_back(n->val);
            if(n->left)q.push(n->left);if(n->right)q.push(n->right);}
        res.push_back(lv);}
    return res;
}`,python:`def level_order(root):
    if not root:return[]
    res=[];q=deque([root])
    while q:
        lv=[];sz=len(q)
        for _ in range(sz):
            n=q.popleft();lv.append(n.val)
            if n.left:q.append(n.left)
            if n.right:q.append(n.right)
        res.append(lv)
    return res`}}
      />

      <ProblemCard num={4} title="Clone Graph" difficulty="LC Medium" tags={["LC 133","DFS/BFS + HashMap"]}
        statement="Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a val and list of neighbors."
        constraints={["1 ≤ nodes ≤ 100","All node values are unique","No repeated edges or self-loops"]}
        examples={[{input:"adjList=[[2,4],[1,3],[2,4],[1,3]]",output:"deep copy with same structure"}]}
        approach="DFS/BFS with a hash map {original → clone}. When visiting a node: if already in map, return the clone. Otherwise, create new clone node, add to map, then recursively clone all neighbors and add them to clone's neighbor list. O(V+E) time and space."
        code={{cpp:`unordered_map<Node*,Node*> mp;
Node* cloneGraph(Node* n){
    if(!n)return nullptr;
    if(mp.count(n))return mp[n];
    Node* clone=new Node(n->val);
    mp[n]=clone;
    for(Node* nb:n->neighbors) clone->neighbors.push_back(cloneGraph(nb));
    return clone;
}`,python:`def clone_graph(node):
    if not node:return None
    mp={}
    def dfs(n):
        if n in mp:return mp[n]
        clone=Node(n.val); mp[n]=clone
        clone.neighbors=[dfs(nb) for nb in n.neighbors]
        return clone
    return dfs(node)`}}
      />

      <ProblemCard num={5} title="Course Schedule (Cycle Detection)" difficulty="LC Medium" tags={["LC 207","Topological Sort"]}
        statement="There are <code>numCourses</code> courses labeled 0..numCourses-1. <code>prerequisites[i]=[ai,bi]</code> means you must take bi before ai. Return true if you can finish all courses."
        constraints={["1 ≤ numCourses ≤ 2000","0 ≤ prerequisites.length ≤ 5000"]}
        examples={[{input:"numCourses=2, prerequisites=[[1,0]]",output:"true",note:"Take 0 then 1"},{input:"numCourses=2, prerequisites=[[1,0],[0,1]]",output:"false",note:"Circular dependency"}]}
        approach="Build directed graph. Run Kahn's topological sort. If all V courses appear in output → no cycle → can finish. Else a cycle blocks some courses. Alternative: DFS 3-color cycle detection."
        code={{cpp:`bool canFinish(int n,vector<vector<int>>& pre){
    vector<vector<int>> adj(n); vector<int> deg(n,0);
    for(auto& p:pre){adj[p[1]].push_back(p[0]);deg[p[0]]++;}
    queue<int> q; for(int i=0;i<n;i++) if(deg[i]==0) q.push(i);
    int done=0;
    while(!q.empty()){int u=q.front();q.pop();done++;
        for(int v:adj[u]) if(--deg[v]==0) q.push(v);}
    return done==n;
}`,python:`def can_finish(n,prerequisites):
    adj=[[] for _ in range(n)];deg=[0]*n
    for a,b in prerequisites:adj[b].append(a);deg[a]+=1
    q=deque(i for i in range(n) if deg[i]==0);done=0
    while q:
        u=q.popleft();done+=1
        for v in adj[u]:
            deg[v]-=1
            if deg[v]==0:q.append(v)
    return done==n`}}
      />

      <ProblemCard num={6} title="Is Graph Bipartite?" difficulty="LC Medium" tags={["LC 785","BFS 2-Coloring"]}
        statement="Given an undirected graph with n nodes, return true if the graph is bipartite — i.e., nodes can be split into two groups such that every edge connects a node from group 0 to a node from group 1."
        constraints={["1 ≤ n ≤ 100","0 ≤ graph[i].length < n","No self-loops or repeated edges"]}
        examples={[{input:"graph=[[1,3],[0,2],[1,3],[0,2]]",output:"true",note:"Group {0,2} and {1,3}"},{input:"graph=[[1,2,3],[0,2],[0,1,3],[0,2]]",output:"false"}]}
        approach="BFS 2-coloring: assign source color 0. Neighbors must get color 1 (opposite). If we encounter a neighbor with the same color as the current node → not bipartite. Process all components (not just one). A graph is bipartite iff it contains no odd-length cycle."
        code={{cpp:`bool isBipartite(vector<vector<int>>& g){
    int n=g.size(); vector<int> col(n,-1);
    for(int s=0;s<n;s++){if(col[s]!=-1)continue;
        queue<int> q; q.push(s); col[s]=0;
        while(!q.empty()){int u=q.front();q.pop();
            for(int v:g[u]){if(col[v]==-1){col[v]=1-col[u];q.push(v);}
                else if(col[v]==col[u])return false;}
        }
    }
    return true;
}`,python:`def is_bipartite(graph):
    n=len(graph);col=[-1]*n
    for s in range(n):
        if col[s]!=-1:continue
        q=deque([s]);col[s]=0
        while q:
            u=q.popleft()
            for v in graph[u]:
                if col[v]==-1:col[v]=1-col[u];q.append(v)
                elif col[v]==col[u]:return False
    return True`}}
      />
    </div>
  );
}

/* ROOT */
const TABS = [
  {id:'fundamentals', label:'Fundamentals'},
  {id:'bfs',          label:'BFS'},
  {id:'dfs',          label:'DFS & Cycle Detection'},
  {id:'topo',         label:'Topological Sort'},
  {id:'problems',     label:'Problems'},
];
export default function Graph() {
  const [active,setActive]=useState('fundamentals');
  const map={fundamentals:<SectionFundamentals/>,bfs:<SectionBFS/>,dfs:<SectionDFS/>,topo:<SectionTopoSort/>,problems:<SectionProblems/>};
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 21</div>
        <h1 className="page-header-title">Graphs — Fundamentals</h1>
        <p className="page-header-subtitle">Types · Representation · BFS · DFS · Cycle Detection · Topological Sort (Kahn's + DFS) · LC 200, 994, 102, 133</p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={21}/>
    </div>
  );
}
