import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   GRAPHS
   Kruskal: 5 nodes, edges sorted by weight
   Dijkstra: 5 nodes, weighted directed/undirected
   Floyd-Warshall: 4 nodes, full distance matrix
══════════════════════════════════════════════════════ */

/* ── Kruskal MST ─────────────────────────────────────
   Nodes 0-4, Positions for SVG
   0(70,150) 1(240,70) 2(240,230) 3(410,70) 4(410,230)
   All edges sorted by weight
══════════════════════════════════════════════════════ */
const K_POS = { 0:[75,155], 1:[245,75], 2:[245,235], 3:[415,75], 4:[415,235] };
const K_ALL_EDGES = [
  {u:0,v:1,w:2},{u:1,v:2,w:3},{u:1,v:4,w:5},{u:0,v:3,w:6},{u:2,v:4,w:7},
  {u:1,v:3,w:10},{u:3,v:4,w:9}
]; // sorted by weight

function buildKruskalSteps() {
  const parent = [0,1,2,3,4];
  const rank   = [0,0,0,0,0];
  function find(x) { return parent[x]===x?x:parent[x]=find(parent[x]); }
  function union(x,y) {
    const px=find(x),py=find(y); if(px===py)return false;
    if(rank[px]<rank[py]) parent[px]=py;
    else if(rank[px]>rank[py]) parent[py]=px;
    else { parent[py]=px; rank[px]++; }
    return true;
  }
  const steps=[], mstEdges=[], totalW=[0];
  steps.push({mstEdges:[],rejected:[],cur:null,parent:[...parent],totalW:0,action:'init',
    desc:'Kruskal\'s: sort all edges by weight. Greedily add lightest edge if it doesn\'t form a cycle (union-find check).'});
  const rejected=[];
  for(const e of K_ALL_EDGES){
    const cyc=find(e.u)===find(e.v);
    if(cyc){
      rejected.push(e);
      steps.push({mstEdges:[...mstEdges],rejected:[...rejected],cur:e,parent:[...parent],totalW:totalW[0],action:'skip',
        desc:`Edge ${e.u}-${e.v} (w=${e.w}): find(${e.u})=find(${e.v})=${find(e.u)} → SAME component → would form cycle → SKIP.`});
    } else {
      union(e.u,e.v); mstEdges.push(e); totalW[0]+=e.w;
      steps.push({mstEdges:[...mstEdges],rejected:[...rejected],cur:e,parent:[...parent],totalW:totalW[0],action:'add',
        desc:`Edge ${e.u}-${e.v} (w=${e.w}): different components → ADD to MST. Total weight = ${totalW[0]}. ${mstEdges.length===4?'MST COMPLETE (n-1=4 edges)!':''}`});
      if(mstEdges.length===4) break;
    }
  }
  steps.push({mstEdges:[...mstEdges],rejected:[...rejected],cur:null,parent:[...parent],totalW:totalW[0],action:'done',
    desc:`MST complete! Edges: ${mstEdges.map(e=>`${e.u}-${e.v}(${e.w})`).join(', ')}. Total weight = ${totalW[0]}.`});
  return steps;
}
const KRUSKAL_STEPS = buildKruskalSteps();

/* ── Dijkstra ────────────────────────────────────────
   0(70,155) 1(245,75) 2(245,235) 3(415,75) 4(415,235)
   Edges: 0-1:4, 0-2:2, 1-2:1, 1-3:5, 2-3:8, 2-4:10, 3-4:2
══════════════════════════════════════════════════════ */
const D_POS = { 0:[75,155], 1:[245,75], 2:[245,235], 3:[415,75], 4:[415,235] };
const D_ADJ = { 0:[[1,4],[2,2]], 1:[[0,4],[2,1],[3,5]], 2:[[0,2],[1,1],[3,8],[4,10]], 3:[[1,5],[2,8],[4,2]], 4:[[2,10],[3,2]] };
const D_EDGES = [[0,1,4],[0,2,2],[1,2,1],[1,3,5],[2,3,8],[2,4,10],[3,4,2]];
const INF = 999;

function buildDijkstraSteps() {
  const dist=[0,INF,INF,INF,INF], vis=new Array(5).fill(false);
  const steps=[], prev=[-1,-1,-1,-1,-1];
  steps.push({dist:[...dist],vis:[...vis],cur:null,pq:[[0,0]],action:'init',
    desc:'Initialize: dist[0]=0, all others=∞. Priority queue: {(0,0)}. At each step, extract min-dist unvisited node.'});
  const pq=[[0,0]]; // [dist, node]
  let iter=0;
  while(pq.length && iter<10){
    pq.sort((a,b)=>a[0]-b[0]);
    const [d,u]=pq.shift();
    if(vis[u]){
      steps.push({dist:[...dist],vis:[...vis],cur:u,pq:[...pq],action:'stale',
        desc:`Extract (${d},${u}): dist[${u}]=${dist[u]} < ${d} → STALE entry. Skip.`});
      iter++; continue;
    }
    vis[u]=true;
    steps.push({dist:[...dist],vis:[...vis],cur:u,pq:[...pq],action:'extract',
      desc:`Extract min: node ${u} (dist=${dist[u]}). Mark visited. Relax all edges from ${u}.`});
    for(const [v,w] of D_ADJ[u]){
      if(!vis[v]&&dist[u]+w<dist[v]){
        const old=dist[v]; dist[v]=dist[u]+w; prev[v]=u;
        pq.push([dist[v],v]);
        steps.push({dist:[...dist],vis:[...vis],cur:u,relax:{u,v,w,old,newD:dist[v]},pq:[...pq],action:'relax',
          desc:`Relax edge ${u}→${v} (w=${w}): dist[${v}] = min(${old===INF?'∞':old}, ${dist[u]}+${w}) = ${dist[v]} ✓ Update!`});
      } else if(!vis[v]){
        steps.push({dist:[...dist],vis:[...vis],cur:u,pq:[...pq],action:'norelax',
          desc:`Edge ${u}→${v} (w=${w}): dist[${v}]=${dist[v]===INF?'∞':dist[v]} ≤ ${dist[u]}+${w} = ${dist[u]+w}. No improvement.`});
      }
    }
    iter++;
  }
  steps.push({dist:[...dist],vis:[...vis],cur:null,pq:[],action:'done',
    desc:`Done! Shortest distances from 0: [${dist.map(d=>d===INF?'∞':d).join(', ')}]`});
  return steps;
}
const DIJKSTRA_STEPS = buildDijkstraSteps();

/* ── Floyd-Warshall — 4 nodes ────────────────────────
   Initial adjacency matrix (0-indexed, INF=999):
   Edge 0→1:3, 0→3:7, 1→0:8, 1→2:2, 2→3:1, 3→0:2
══════════════════════════════════════════════════════ */
const FW_N = 4;
const FW_INIT = [
  [0,   3, INF, 7  ],
  [8,   0,   2, INF],
  [INF,INF,  0,   1],
  [2,  INF,INF,  0 ]
];
function buildFWSteps() {
  const dist = FW_INIT.map(r=>[...r]);
  const steps = [];
  const fmt = v => v>=INF?'∞':v;
  steps.push({dist:dist.map(r=>[...r]),k:-1,i:-1,j:-1,action:'init',
    desc:`Initial distance matrix. Entry [i][j] = direct edge weight, or ∞ if no direct edge.`});
  for(let k=0;k<FW_N;k++){
    steps.push({dist:dist.map(r=>[...r]),k,i:-1,j:-1,action:'newk',
      desc:`Iteration k=${k}: try routing ALL pairs through intermediate vertex ${k}.`});
    for(let i=0;i<FW_N;i++){
      for(let j=0;j<FW_N;j++){
        if(i===j) continue;
        const via=dist[i][k]+dist[k][j];
        if(via<dist[i][j]){
          const old=dist[i][j]; dist[i][j]=via;
          steps.push({dist:dist.map(r=>[...r]),k,i,j,via,old,action:'update',
            desc:`Update dist[${i}][${j}]: ${fmt(old)} → ${via} (via ${k}: ${fmt(FW_INIT[i][k])}…${fmt(FW_INIT[k][j])} route)`});
        }
      }
    }
  }
  steps.push({dist:dist.map(r=>[...r]),k:FW_N,i:-1,j:-1,action:'done',
    desc:`All-pairs shortest paths complete! ${FW_N}³ = ${FW_N**3} iterations total.`});
  return steps;
}
const FW_STEPS = buildFWSteps();

/* ══════════════════════════════════════════════════════
   SHARED: mini graph SVG (weighted edges)
══════════════════════════════════════════════════════ */
function WGraphSVG({ pos, edges, hl={}, edgeHL={}, directed=false, W=500, H=320 }) {
  const CLR = { cur:'#3A2A1A', vis:'#1A3A2A', pq:'#1A2A3A', mst:'#1A3A2A', rej:'#3A1A1A', none:'#131722' };
  const STR = { cur:'#CE9178', vis:'#4EC9B0', pq:'#81B4EA', mst:'#4EC9B0', rej:'#F44747', none:'#1E2233' };
  const TXT = { cur:'#CE9178', vis:'#4EC9B0', pq:'#9CDCFE', mst:'#4EC9B0', rej:'#F44747', none:'#6A7490' };
  const R = 22;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {edges.map(([a,b,w],i)=>{
        const pa=pos[a],pb=pos[b];
        const key=`${a}-${b}`, keyR=`${b}-${a}`;
        const eh=edgeHL[key]||edgeHL[keyR]||'none';
        const col = eh==='mst'?'#4EC9B0':eh==='rej'?'#F44747':eh==='cur'?'#CE9178':'#2A3050';
        const sw = (eh==='mst'||eh==='cur')?2.5:1.5;
        const mx=(pa[0]+pb[0])/2, my=(pa[1]+pb[1])/2;
        if(directed){
          const dx=pb[0]-pa[0],dy=pb[1]-pa[1],len=Math.sqrt(dx*dx+dy*dy);
          const ux=dx/len,uy=dy/len;
          const sx=pa[0]+ux*R,sy=pa[1]+uy*R,ex=pb[0]-ux*R,ey=pb[1]-uy*R;
          const hx=ex-ux*10,hy=ey-uy*10;
          return (<g key={i}><line x1={sx} y1={sy} x2={ex} y2={ey} stroke={col} strokeWidth={sw}/>
            <polygon points={`${ex},${ey} ${hx+uy*5},${hy-ux*5} ${hx-uy*5},${hy+ux*5}`} fill={col}/>
            <rect x={mx-9} y={my-9} width={18} height={14} rx={3} fill="#0D0F18"/>
            <text x={mx} y={my+1} textAnchor="middle" dominantBaseline="middle" fill={col} fontSize="10" fontFamily="monospace" fontWeight="700">{w}</text>
          </g>);
        }
        return (<g key={i}><line x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} stroke={col} strokeWidth={sw}/>
          <rect x={mx-9} y={my-9} width={18} height={14} rx={3} fill="#0D0F18"/>
          <text x={mx} y={my+1} textAnchor="middle" dominantBaseline="middle" fill={col} fontSize="10" fontFamily="monospace" fontWeight="700">{w}</text>
        </g>);
      })}
      {Object.keys(pos).map(v=>{
        const nv=+v,[x,y]=pos[nv],c=hl[nv]||'none';
        return (<g key={v}><circle cx={x} cy={y} r={R} fill={CLR[c]} stroke={STR[c]} strokeWidth={c!=='none'?2:1}/>
          <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fill={TXT[c]} fontSize="13" fontFamily="monospace" fontWeight={c!=='none'?700:500}>{v}</text>
        </g>);
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — KRUSKAL'S MST
══════════════════════════════════════════════════════ */
function KruskalViz() {
  const [step,setStep] = useState(0);
  const s = KRUSKAL_STEPS[Math.min(step,KRUSKAL_STEPS.length-1)];
  const edgeHL = {};
  (s.mstEdges||[]).forEach(e=>{ edgeHL[`${e.u}-${e.v}`]='mst'; });
  (s.rejected||[]).forEach(e=>{ edgeHL[`${e.u}-${e.v}`]='rej'; });
  if(s.cur&&s.action==='add')   edgeHL[`${s.cur.u}-${s.cur.v}`]='cur';
  const hl={};
  (s.mstEdges||[]).forEach(e=>{ hl[e.u]='vis'; hl[e.v]='vis'; });
  if(s.cur) { hl[s.cur.u]='cur'; hl[s.cur.v]='cur'; }

  return (
    <VizBox>
      <div style={{marginBottom:12,display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        {s.action!=='init'&&<span style={{padding:'2px 9px',borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${s.action==='add'?'success':s.action==='skip'?'danger':'info'})`,color:`var(--color-text-${s.action==='add'?'success':s.action==='skip'?'danger':'info'})`,border:`1px solid var(--color-border-${s.action==='add'?'success':s.action==='skip'?'danger':'info'})`,whiteSpace:'nowrap'}}>{s.action==='add'?'Add to MST ✓':s.action==='skip'?'Skip (cycle)':s.action==='done'?'Done ✓':'Start'}</span>}
        <span style={{fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>{s.desc}</span>
      </div>
      <div style={{overflowX:'auto',marginBottom:12}}>
        <WGraphSVG pos={K_POS} edges={K_ALL_EDGES.map(e=>[e.u,e.v,e.w])} hl={hl} edgeHL={edgeHL} W={500} H={320}/>
      </div>
      {/* MST weight + edge list */}
      <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:10,marginBottom:14}}>
        <div>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:5,letterSpacing:'0.06em'}}>MST EDGES SO FAR</div>
          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
            {(s.mstEdges||[]).length===0
              ?<span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)'}}>none yet</span>
              :(s.mstEdges||[]).map((e,i)=><div key={i} style={{padding:'3px 9px',borderRadius:5,border:'1px solid var(--color-border-success)',background:'var(--color-background-success)',fontFamily:'var(--font-mono)',fontSize:12,color:'var(--color-text-success)',fontWeight:700}}>{e.u}-{e.v}(w={e.w})</div>)
            }
          </div>
        </div>
        <div style={{padding:'8px 14px',borderRadius:'var(--border-radius-md)',background:s.totalW>0?'var(--color-background-success)':'var(--color-background-secondary)',border:`0.5px solid ${s.totalW>0?'var(--color-border-success)':'var(--color-border-secondary)'}`,textAlign:'center',minWidth:80}}>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:2}}>Total W</div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:20,fontWeight:700,color:s.totalW>0?'var(--color-text-success)':'var(--color-text-secondary)'}}>{s.totalW}</div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(KRUSKAL_STEPS.length-1,step+1)),step===KRUSKAL_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{KRUSKAL_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(KRUSKAL_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — DIJKSTRA'S ALGORITHM
   Distance table + graph + PQ state
══════════════════════════════════════════════════════ */
function DijkstraViz() {
  const [step,setStep] = useState(0);
  const s = DIJKSTRA_STEPS[Math.min(step,DIJKSTRA_STEPS.length-1)];
  const hl = {};
  (s.vis||[]).forEach((v,i)=>{ if(v) hl[i]='vis'; });
  if(s.cur!=null) hl[s.cur]='cur';
  const edgeHL = {};
  if(s.relax) edgeHL[`${s.relax.u}-${s.relax.v}`]='cur';

  return (
    <VizBox>
      <div style={{marginBottom:10,display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        {s.action!=='init'&&<span style={{padding:'2px 9px',borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${s.action==='relax'?'success':s.action==='extract'?'info':s.action==='stale'?'secondary':'success'})`,color:`var(--color-text-${s.action==='relax'?'success':s.action==='extract'?'info':s.action==='stale'?'tertiary':'success'})`,border:`1px solid var(--color-border-${s.action==='relax'?'success':s.action==='extract'?'info':s.action==='stale'?'secondary':'success'})`,whiteSpace:'nowrap'}}>{s.action==='relax'?'Relax ✓':s.action==='extract'?'Extract min':s.action==='stale'?'Stale skip':s.action==='done'?'Done ✓':'No improvement'}</span>}
        <span style={{fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>{s.desc}</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:12,marginBottom:12}}>
        <div style={{overflowX:'auto'}}>
          <WGraphSVG pos={D_POS} edges={D_EDGES.map(e=>[e[0],e[1],e[2]])} hl={hl} edgeHL={edgeHL} W={500} H={320}/>
        </div>
        {/* Distance table */}
        <div style={{minWidth:110}}>
          <div style={{fontSize:10.5,fontFamily:'var(--font-mono)',color:'var(--color-text-tertiary)',marginBottom:6,letterSpacing:'0.06em'}}>DIST TABLE</div>
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {(s.dist||[]).map((d,i)=>{
              const isRel=s.relax&&s.relax.v===i;
              const isCur=s.cur===i;
              const isVis=(s.vis||[])[i];
              const c=isRel?'success':isCur?'warning':isVis?'vis':'none';
              const col = isRel?'var(--color-text-success)':isCur?'var(--color-text-warning)':isVis?'var(--color-text-info)':'var(--color-text-secondary)';
              return (<div key={i} style={{display:'flex',gap:6,alignItems:'center',padding:'4px 8px',borderRadius:5,border:`1px solid ${isRel?'var(--color-border-success)':isCur?'var(--color-border-warning)':isVis?'var(--color-border-info)':'var(--color-border-secondary)'}`,background:isRel?'var(--color-background-success)':isCur?'var(--color-background-warning)':isVis?'rgba(129,180,234,0.1)':'var(--color-background-secondary)',transition:'all 0.15s'}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:11.5,color:col,minWidth:12}}>{i}</span>
                <span style={{fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:col}}>{d>=INF?'∞':d}</span>
              </div>);
            })}
          </div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(DIJKSTRA_STEPS.length-1,step+1)),step===DIJKSTRA_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{DIJKSTRA_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(DIJKSTRA_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — FLOYD-WARSHALL MATRIX
   4×4 distance matrix updates live
══════════════════════════════════════════════════════ */
function FloydViz() {
  const [step,setStep] = useState(0);
  const s = FW_STEPS[Math.min(step,FW_STEPS.length-1)];
  const fmt = v => v>=INF?'∞':v;

  return (
    <VizBox>
      <div style={{marginBottom:12,display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        {s.action!=='init'&&<span style={{padding:'2px 9px',borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${s.action==='update'?'success':s.action==='newk'?'info':'success'})`,color:`var(--color-text-${s.action==='update'?'success':s.action==='newk'?'info':'success'})`,border:`1px solid var(--color-border-${s.action==='update'?'success':s.action==='newk'?'info':'success'})`,whiteSpace:'nowrap'}}>{s.action==='update'?'Update ✓':s.action==='newk'?`k=${s.k}`:'Done ✓'}</span>}
        <span style={{fontSize:12.5,color:'var(--color-text-secondary)',lineHeight:1.55}}>{s.desc}</span>
      </div>
      <div style={{overflowX:'auto',marginBottom:14}}>
        <div style={{display:'inline-block',padding:10,background:'#0D0F18',border:'1px solid #1E2233',borderRadius:8}}>
          {/* Header row */}
          <div style={{display:'flex',gap:4,marginBottom:4}}>
            <div style={{width:30,height:30}}/>
            {[0,1,2,3].map(j=><div key={j} style={{width:42,height:30,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)'}}>j={j}</div>)}
          </div>
          {(s.dist||FW_INIT).map((row,i)=>(
            <div key={i} style={{display:'flex',gap:4,marginBottom:4}}>
              <div style={{width:30,height:42,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)'}}>i={i}</div>
              {row.map((val,j)=>{
                const isUpdated=s.action==='update'&&s.i===i&&s.j===j;
                const isVia=s.action==='update'&&(s.i===i&&s.j===s.k || s.i===s.k&&s.j===j);
                const isKrow=s.k>=0&&i===s.k;
                const isKcol=s.k>=0&&j===s.k;
                const isDiag=i===j;
                let bg='#131722',bd='#1E2233',tc='#6A7490';
                if(isDiag){bg='#141822';bd='#1E2233';tc='#3D4460';}
                else if(isUpdated){bg='var(--color-background-success)';bd='var(--color-border-success)';tc='var(--color-text-success)';}
                else if(isVia&&s.action==='update'){bg='rgba(129,180,234,0.15)';bd='var(--color-border-info)';tc='var(--color-text-info)';}
                else if((isKrow||isKcol)&&s.action==='newk'){bg='rgba(206,145,120,0.15)';bd='var(--color-border-warning)';tc='var(--color-text-secondary)';}
                return (<div key={j} style={{width:42,height:42,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5,border:`1.5px solid ${bd}`,background:bg,fontFamily:'var(--font-mono)',fontSize:13,fontWeight:isUpdated?700:500,color:tc,transition:'all 0.18s'}}>{fmt(val)}</div>);
              })}
            </div>
          ))}
        </div>
      </div>
      {s.action==='update'&&<div style={{padding:'6px 12px',background:'var(--color-background-success)',border:'0.5px solid var(--color-border-success)',borderRadius:'var(--border-radius-md)',fontFamily:'var(--font-mono)',fontSize:12.5,color:'var(--color-text-success)',marginBottom:12}}>dist[{s.i}][{s.j}]: {fmt(s.old)} → {s.via} (via k={s.k})</div>}
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(FW_STEPS.length-1,step+1)),step===FW_STEPS.length-1]].map(([l,a,d])=>(<button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{FW_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(FW_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
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
   SECTION 1 — MINIMUM SPANNING TREE
══════════════════════════════════════════════════════ */
function SectionMST() {
  return (
    <div>
      <Note color="info" icon="ti-git-merge">
        A <strong>Minimum Spanning Tree</strong> of a connected weighted undirected graph is a spanning tree (V-1 edges, no cycles, connects all vertices) with the minimum total edge weight. Applications: network design, cluster analysis, approximation algorithms for TSP.
      </Note>

      <H2>Kruskal's Algorithm — Interactive</H2>
      <P>Sort all edges by weight. For each edge (lightest first): if the two endpoints are in different components (union-find check), add the edge to the MST. Repeat until V-1 edges added.</P>
      <KruskalViz />
      <Code>{{cpp:`// Union-Find (path compression + union by rank) — O(α(n)) per op
struct DSU {
    vector<int> par, rank_;
    DSU(int n) : par(n), rank_(n,0) { iota(par.begin(),par.end(),0); }
    int find(int x) { return par[x]==x?x:par[x]=find(par[x]); }
    bool unite(int x,int y) {
        x=find(x);y=find(y);if(x==y)return false;
        if(rank_[x]<rank_[y])swap(x,y);
        par[y]=x;if(rank_[x]==rank_[y])rank_[x]++;
        return true;
    }
};

int kruskalMST(int V, vector<tuple<int,int,int>>& edges) { // {w,u,v}
    sort(edges.begin(),edges.end());  // sort by weight
    DSU dsu(V); int totalW=0;
    for(auto [w,u,v]:edges)
        if(dsu.unite(u,v)) totalW+=w;   // add if no cycle
    return totalW;
}
// Time: O(E log E) dominated by sort. Union-Find ops ≈ O(1) amortized.`, python:`class DSU:
    def __init__(self,n):self.par=list(range(n));self.rank=[0]*n
    def find(self,x):
        if self.par[x]!=x:self.par[x]=self.find(self.par[x])
        return self.par[x]
    def union(self,x,y):
        x,y=self.find(x),self.find(y)
        if x==y:return False
        if self.rank[x]<self.rank[y]:x,y=y,x
        self.par[y]=x
        if self.rank[x]==self.rank[y]:self.rank[x]+=1
        return True

def kruskal_mst(V,edges):  # edges = [(w,u,v)]
    edges.sort(); dsu=DSU(V); total=0
    for w,u,v in edges:
        if dsu.union(u,v): total+=w
    return total`}}</Code>

      <H2>Prim's Algorithm — Grow from One Source</H2>
      <P>Start with any vertex. Repeatedly add the minimum-weight edge that crosses from the visited set to the unvisited set. Uses a priority queue. O((V+E) log V) with binary heap — same complexity as Dijkstra, but grows the MST greedily from a root.</P>
      <Code>{{cpp:`int primMST(vector<vector<pair<int,int>>>& adj, int V) {
    vector<int> key(V, INT_MAX);   // min edge weight to add this vertex to MST
    vector<bool> inMST(V, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    key[0]=0; pq.push({0,0});     // {weight, vertex}
    int totalW=0;
    while(!pq.empty()){
        auto[w,u]=pq.top();pq.pop();
        if(inMST[u]) continue;    // skip if already in MST
        inMST[u]=true; totalW+=w;
        for(auto[v,wt]:adj[u])
            if(!inMST[v]&&wt<key[v]){key[v]=wt;pq.push({wt,v});}
    }
    return totalW;
}`, python:`def prim_mst(adj, V):
    import heapq
    key=[float('inf')]*V; in_mst=[False]*V
    key[0]=0; pq=[(0,0)]; total=0  # (weight, vertex)
    while pq:
        w,u=heapq.heappop(pq)
        if in_mst[u]:continue
        in_mst[u]=True; total+=w
        for v,wt in adj[u]:
            if not in_mst[v] and wt<key[v]:
                key[v]=wt; heapq.heappush(pq,(wt,v))
    return total`}}</Code>

      <Grid cols={2}>
        <Card title="Kruskal vs Prim" color="info">
          <div style={{fontSize:13,lineHeight:1.7}}>
            <strong>Kruskal:</strong> edge-centric. Better for sparse graphs. Needs union-find.<br/>
            <strong>Prim:</strong> vertex-centric. Better for dense graphs. Similar structure to Dijkstra.<br/>
            Both are O(E log E) with binary heap.
          </div>
        </Card>
        <Card title="MST Uniqueness" color="warning">
          If all edge weights are distinct, the MST is unique. If weights can repeat, multiple MSTs may exist with the same total weight. The MST property: adding any non-MST edge creates a cycle where that edge has the maximum weight.
        </Card>
      </Grid>

      <QA q="Why does Kruskal's algorithm work — why is greedily adding the cheapest safe edge always optimal?" a="The cut property: for any cut (partition of vertices into two sets), the minimum-weight edge crossing the cut belongs to SOME MST. Kruskal's maintains a forest. Each time it adds the lightest edge not forming a cycle, that edge crosses some cut where it's the minimum-weight crossing edge — so it must be in the MST. This is the greedy matroid property of spanning trees." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — DIJKSTRA
══════════════════════════════════════════════════════ */
function SectionDijkstra() {
  return (
    <div>
      <Note color="success" icon="ti-route">
        <strong>Dijkstra's algorithm</strong> finds shortest paths from a single source to all other vertices in a graph with non-negative edge weights. Uses a greedy strategy: always process the unvisited vertex with the smallest known distance. O((V+E) log V) with a binary heap.
      </Note>

      <H2>Dijkstra Step-Through — Interactive</H2>
      <P>Watch the distance table update as the algorithm relaxes edges. Orange = currently processing, green = finalized (shortest path confirmed), blue = in priority queue.</P>
      <DijkstraViz />
      <Code>{{cpp:`#include <queue>
vector<int> dijkstra(vector<vector<pair<int,int>>>& adj, int src, int V) {
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src]=0; pq.push({0,src});
    while(!pq.empty()){
        auto[d,u]=pq.top(); pq.pop();
        if(d>dist[u]) continue;    // stale entry — skip!
        for(auto[v,w]:adj[u]){
            if(dist[u]+w<dist[v]){
                dist[v]=dist[u]+w;
                pq.push({dist[v],v});
            }
        }
    }
    return dist;
}
// Time: O((V+E)logV)  Space: O(V)
// CRITICAL: Dijkstra FAILS with negative edge weights!`, python:`import heapq
def dijkstra(adj, src, V):
    dist=[float('inf')]*V; dist[src]=0
    pq=[(0,src)]
    while pq:
        d,u=heapq.heappop(pq)
        if d>dist[u]:continue      # stale — skip
        for v,w in adj[u]:
            if dist[u]+w<dist[v]:
                dist[v]=dist[u]+w
                heapq.heappush(pq,(dist[v],v))
    return dist`}}</Code>

      <H2>Dijkstra Applications — Common Interview Patterns</H2>
      <Code>{{cpp:`// Pattern 1: Path reconstruction (add prev[] array)
vector<int> prev(V, -1);
// In relax step: prev[v] = u;
// Reconstruct: trace back from target through prev[]

// Pattern 2: Stop early when target is popped from PQ
if(u == target) return dist[target];

// Pattern 3: K stops limit (LC 787 Cheapest Flights K Stops)
// Augment state: (dist, node, stops_used)
// Use Bellman-Ford instead when K is small: O(K*E)

// Pattern 4: Grid Dijkstra (moving on a weighted grid)
// State = (cost, row, col), 4-directional movement

// Pattern 5: Modified edge weights
// "Maximize minimum edge weight on path" → binary search on answer
// "Minimum bottleneck path" → Dijkstra variant / Kruskal MST`, python:`# Reconstruct shortest path:
def dijkstra_path(adj, src, tgt, V):
    dist=[float('inf')]*V; prev=[-1]*V; dist[src]=0
    pq=[(0,src)]
    while pq:
        d,u=heapq.heappop(pq)
        if u==tgt:break
        if d>dist[u]:continue
        for v,w in adj[u]:
            if dist[u]+w<dist[v]:
                dist[v]=dist[u]+w; prev[v]=u
                heapq.heappush(pq,(dist[v],v))
    # Trace back
    path=[]; cur=tgt
    while cur!=-1:path.append(cur);cur=prev[cur]
    return path[::-1]`}}</Code>

      <QA q="Why does Dijkstra fail with negative edge weights? What's the counterexample?" a="Dijkstra marks nodes as 'finalized' when extracted from the priority queue — assuming no shorter path exists. With negative edges, a longer path discovered later could become shorter via a negative edge. Example: A→B(1), A→C(3), B→C(-3). Dijkstra finalizes B first (dist=1), then might finalize C as 3 without seeing A→B→C = 1+(-3)=-2. Use Bellman-Ford for negative edges, or Johnson's algorithm for all-pairs with negatives." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — BELLMAN-FORD & FLOYD-WARSHALL
══════════════════════════════════════════════════════ */
function SectionBellmanFloyd() {
  return (
    <div>
      <H2>Bellman-Ford — Handles Negative Weights</H2>
      <P>Relax ALL edges V-1 times. After V-1 relaxations, shortest paths are found (in a graph with V vertices, any path has at most V-1 edges). A V-th relaxation that still improves a distance indicates a negative cycle.</P>
      <Code>{{cpp:`vector<int> bellmanFord(vector<tuple<int,int,int>>& edges, int V, int src) {
    // edges = {u, v, w}
    vector<int> dist(V, INT_MAX);
    dist[src] = 0;

    // Relax all edges V-1 times
    for (int i = 0; i < V-1; i++) {
        for (auto [u,v,w] : edges) {
            if (dist[u]!=INT_MAX && dist[u]+w < dist[v])
                dist[v] = dist[u]+w;
        }
    }

    // V-th pass: detect negative cycles
    for (auto [u,v,w] : edges)
        if (dist[u]!=INT_MAX && dist[u]+w < dist[v])
            return {};  // negative cycle exists!

    return dist;
}
// Time: O(V×E)  Space: O(V)
// Works with negative edges. Detects negative cycles.`, python:`def bellman_ford(edges, V, src):
    dist=[float('inf')]*V; dist[src]=0
    for _ in range(V-1):
        for u,v,w in edges:
            if dist[u]!=float('inf') and dist[u]+w<dist[v]:
                dist[v]=dist[u]+w
    # Detect negative cycle
    for u,v,w in edges:
        if dist[u]!=float('inf') and dist[u]+w<dist[v]:
            return None   # negative cycle!
    return dist`}}</Code>

      <H2>Dijkstra vs Bellman-Ford vs Floyd-Warshall</H2>
      <Table
        heads={["Algorithm","Source","Negative edges?","Negative cycle detect?","Time","Space"]}
        rows={[
          ["Dijkstra","Single","No (fails)","No","O((V+E)logV)","O(V)"],
          ["Bellman-Ford","Single","Yes","Yes (V-th pass)","O(V×E)","O(V)"],
          ["Floyd-Warshall","All pairs","Yes","Yes (diagonal)","O(V³)","O(V²)"],
        ]}
      />

      <H2>Floyd-Warshall — All-Pairs Shortest Paths (Interactive)</H2>
      <P>Dynamic programming: dist[i][j][k] = shortest i→j path using only vertices {0..k} as intermediates. The recurrence: dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j]) for each intermediate vertex k, iterated over all k from 0 to V-1.</P>
      <FloydViz />
      <Code>{{cpp:`void floydWarshall(vector<vector<int>>& dist, int V) {
    // Initialize: dist[i][j] = edge weight if edge exists, else INF; dist[i][i]=0
    for (int k=0; k<V; k++) {          // for each intermediate vertex k
        for (int i=0; i<V; i++) {
            for (int j=0; j<V; j++) {
                if (dist[i][k]<INF && dist[k][j]<INF)
                    dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j]);
            }
        }
    }
    // Negative cycle detection: if dist[i][i] < 0 for any i
}
// Time: O(V³)  Space: O(V²)`, python:`def floyd_warshall(dist, V):
    INF=float('inf')
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][k]+dist[k][j]<dist[i][j]:
                    dist[i][j]=dist[i][k]+dist[k][j]
    # dist[i][i]<0 → negative cycle

# Transitive closure variant (reachability):
def transitive_closure(adj, V):
    reach=[[adj[i][j] for j in range(V)] for i in range(V)]
    for k in range(V):
        for i in range(V):
            for j in range(V):
                reach[i][j]=reach[i][j] or (reach[i][k] and reach[k][j])
    return reach`}}</Code>

      <H2>Transitive Closure</H2>
      <P>Determine if there's any path from i to j — replace edge weights with booleans (T/F) and replace min with OR. Same Floyd-Warshall structure with boolean algebra.</P>
      <Code lang="cpp">{`// Transitive closure via Floyd-Warshall
vector<vector<bool>> transitiveClosure(vector<vector<bool>>& reach, int V) {
    for (int k=0; k<V; k++)
        for (int i=0; i<V; i++)
            for (int j=0; j<V; j++)
                reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
    return reach;  // reach[i][j] = true iff path from i to j exists
}`}</Code>

      <QA q="Why does Floyd-Warshall consider intermediates in order k=0,1,...,V-1? Doesn't the order matter?" a="Yes, the order matters conceptually, but the algorithm is correct for any order. The key insight: when computing dist[i][j] using intermediate k, dist[i][k] and dist[k][j] were already optimized using intermediates {0..k-1} (from previous outer loop iterations). So we're correctly building up: paths using {0}, then paths using {0,1}, etc. The in-place update is safe because dist[i][k] and dist[k][j] are NOT improved by the k-th iteration (any path through k again would add 0 cost since dist[k][k]=0)." />
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
        6 graph algorithm problems — MST, Dijkstra, Bellman-Ford applications, and classic SP patterns.
      </Note>

      <ProblemCard num={1} title="Min Cost to Connect All Points (Prim's MST)" difficulty="LC Medium" tags={["LC 1584","Prim's MST"]}
        statement="Given n points on a 2D grid, connect all points with minimum total cost. Cost of connecting (x1,y1) and (x2,y2) = |x1-x2| + |y1-y2| (Manhattan distance). Return minimum cost."
        constraints={["1 ≤ n ≤ 1000","−10⁶ ≤ xi,yi ≤ 10⁶"]}
        examples={[{input:"points=[[0,0],[2,2],[3,10],[5,2],[7,0]]",output:"20"},{input:"[[3,12],[-2,5],[-4,1]]",output:"18"}]}
        approach="Complete graph (every pair of points has an edge). Prim's MST is more efficient than Kruskal's here (dense graph: O(n²) adj matrix Prim vs O(n² log n) Kruskal). Track min cost to add each unvisited point. O(n²) time with adj matrix Prim."
        code={{cpp:`int minCostConnectPoints(vector<vector<int>>& pts){
    int n=pts.size(); vector<int> key(n,INT_MAX); vector<bool>inMST(n,false);
    key[0]=0; int total=0;
    for(int iter=0;iter<n;iter++){
        int u=-1;
        for(int i=0;i<n;i++) if(!inMST[i]&&(u==-1||key[i]<key[u]))u=i;
        inMST[u]=true;total+=key[u];
        for(int v=0;v<n;v++) if(!inMST[v]){
            int d=abs(pts[u][0]-pts[v][0])+abs(pts[u][1]-pts[v][1]);
            key[v]=min(key[v],d);
        }
    }
    return total;
}`,python:`def min_cost_connect_points(pts):
    n=len(pts); key=[float('inf')]*n; in_mst=[False]*n; key[0]=0; total=0
    for _ in range(n):
        u=min((i for i in range(n) if not in_mst[i]),key=lambda x:key[x])
        in_mst[u]=True; total+=key[u]
        for v in range(n):
            if not in_mst[v]:
                d=abs(pts[u][0]-pts[v][0])+abs(pts[u][1]-pts[v][1])
                key[v]=min(key[v],d)
    return total`}}
      />

      <ProblemCard num={2} title="Network Delay Time (Dijkstra)" difficulty="LC Medium" tags={["LC 743","Dijkstra"]}
        statement="Given n nodes, k directed weighted edges <code>times[i]=[u,v,w]</code>, and a source k. Find how long until all n nodes have received a signal. Return -1 if impossible."
        constraints={["1 ≤ n ≤ 100","1 ≤ k ≤ edges ≤ 6000","1 ≤ u,v,w ≤ 100"]}
        examples={[{input:"times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2",output:"2"},{input:"times=[[1,2,1]], n=2, k=1",output:"1"}]}
        approach="Single-source shortest path from k using Dijkstra. The answer = maximum distance in the dist[] array (last node to receive signal). If any dist[i] == ∞ → return -1 (unreachable node)."
        code={{cpp:`int networkDelayTime(vector<vector<int>>& times,int n,int k){
    vector<vector<pair<int,int>>> adj(n+1);
    for(auto& t:times) adj[t[0]].push_back({t[1],t[2]});
    vector<int> dist(n+1,INT_MAX); dist[k]=0;
    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq;
    pq.push({0,k});
    while(!pq.empty()){auto[d,u]=pq.top();pq.pop();
        if(d>dist[u])continue;
        for(auto[v,w]:adj[u]) if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;pq.push({dist[v],v});}}
    int mx=*max_element(dist.begin()+1,dist.end());
    return mx==INT_MAX?-1:mx;
}`,python:`def network_delay_time(times,n,k):
    adj=defaultdict(list)
    for u,v,w in times:adj[u].append((v,w))
    dist={i:float('inf') for i in range(1,n+1)};dist[k]=0
    pq=[(0,k)]
    while pq:
        d,u=heapq.heappop(pq)
        if d>dist[u]:continue
        for v,w in adj[u]:
            if dist[u]+w<dist[v]:dist[v]=dist[u]+w;heapq.heappush(pq,(dist[v],v))
    mx=max(dist.values())
    return mx if mx!=float('inf') else -1`}}
      />

      <ProblemCard num={3} title="Cheapest Flights Within K Stops" difficulty="LC Medium" tags={["LC 787","Bellman-Ford K passes"]}
        statement="Given n cities, flights as [from,to,price], find the cheapest flight from src to dst with at most K stops. Return -1 if impossible."
        constraints={["1 ≤ n ≤ 100","0 ≤ flights.length ≤ 6000","1 ≤ price ≤ 10⁴"]}
        examples={[{input:"n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1",output:"200"},{input:"k=0",output:"500"}]}
        approach="Bellman-Ford with exactly K+1 relaxation rounds (K stops = K+1 edges max). Use a copy of distances at the START of each round to prevent using edges from the same round twice (critical: prevents using more than one edge per relaxation). O(K×E)."
        code={{cpp:`int findCheapestPrice(int n,vector<vector<int>>& f,int src,int dst,int k){
    vector<int> dist(n,INT_MAX); dist[src]=0;
    for(int i=0;i<=k;i++){
        vector<int> tmp=dist;   // copy BEFORE this round's relaxations!
        for(auto& e:f)
            if(dist[e[0]]!=INT_MAX&&dist[e[0]]+e[2]<tmp[e[1]])
                tmp[e[1]]=dist[e[0]]+e[2];
        dist=tmp;
    }
    return dist[dst]==INT_MAX?-1:dist[dst];
}`,python:`def find_cheapest_price(n,flights,src,dst,k):
    dist=[float('inf')]*n; dist[src]=0
    for _ in range(k+1):
        tmp=dist[:]             # copy before round!
        for u,v,w in flights:
            if dist[u]!=float('inf') and dist[u]+w<tmp[v]:
                tmp[v]=dist[u]+w
        dist=tmp
    return dist[dst] if dist[dst]!=float('inf') else -1`}}
      />

      <ProblemCard num={4} title="Find the City With Smallest Number of Neighbors (Floyd-Warshall)" difficulty="LC Medium" tags={["LC 1334","Floyd-Warshall"]}
        statement="Given n cities with weighted bidirectional roads and a threshold distance, return the city with the fewest number of cities reachable within the threshold. If tie, return the city with the greatest number."
        constraints={["2 ≤ n ≤ 100","edges[i] = [from,to,weight]","1 ≤ distanceThreshold ≤ 10⁴"]}
        examples={[{input:"n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distThreshold=4",output:"3"}]}
        approach="Floyd-Warshall for all-pairs shortest paths. For each city, count how many other cities are reachable within threshold. Return the city with fewest reachable (ties broken by largest city index — so iterate from n-1 downward)."
        code={{cpp:`int findTheCity(int n,vector<vector<int>>& edges,int thr){
    vector<vector<int>> d(n,vector<int>(n,1e9));
    for(int i=0;i<n;i++)d[i][i]=0;
    for(auto& e:edges){d[e[0]][e[1]]=d[e[1]][e[0]]=e[2];}
    for(int k=0;k<n;k++) for(int i=0;i<n;i++) for(int j=0;j<n;j++)
        d[i][j]=min(d[i][j],d[i][k]+d[k][j]);
    int ans=-1,minCnt=n;
    for(int i=n-1;i>=0;i--){
        int cnt=0;for(int j=0;j<n;j++) if(i!=j&&d[i][j]<=thr)cnt++;
        if(cnt<=minCnt){minCnt=cnt;ans=i;}
    }
    return ans;
}`,python:`def find_the_city(n,edges,thr):
    INF=float('inf'); d=[[INF]*n for _ in range(n)]
    for i in range(n):d[i][i]=0
    for u,v,w in edges:d[u][v]=d[v][u]=w
    for k in range(n):
        for i in range(n):
            for j in range(n):d[i][j]=min(d[i][j],d[i][k]+d[k][j])
    ans,best=0,n
    for i in range(n-1,-1,-1):
        cnt=sum(1 for j in range(n) if i!=j and d[i][j]<=thr)
        if cnt<=best:best=cnt;ans=i
    return ans`}}
      />

      <ProblemCard num={5} title="Redundant Connection (Union-Find)" difficulty="LC Medium" tags={["LC 684","Union-Find"]}
        statement="Given a tree with one extra edge added (making a cycle), find the redundant edge that can be removed to restore the tree. If multiple answers, return the last one in the input."
        constraints={["3 ≤ n ≤ 1000","Edges form a tree with exactly one extra edge"]}
        examples={[{input:"edges=[[1,2],[1,3],[2,3]]",output:"[2,3]"},{input:"edges=[[1,2],[2,3],[3,4],[1,4],[1,5]]",output:"[1,4]"}]}
        approach="Process edges one by one. Use Union-Find: if both endpoints of an edge are already in the same component → adding this edge creates a cycle → this is the redundant edge (last such edge = answer per problem statement)."
        code={{cpp:`class DSU{vector<int>p;public:DSU(int n):p(n){iota(p.begin(),p.end(),0);}
    int find(int x){return p[x]==x?x:p[x]=find(p[x]);}
    bool unite(int x,int y){x=find(x);y=find(y);if(x==y)return false;p[y]=x;return true;}};
vector<int> findRedundantConnection(vector<vector<int>>& edges){
    DSU dsu(edges.size()+1);
    for(auto& e:edges) if(!dsu.unite(e[0],e[1]))return e;
    return{};
}`,python:`def find_redundant_connection(edges):
    par=list(range(len(edges)+1))
    def find(x):
        while par[x]!=x:par[x]=par[par[x]];x=par[x]
        return x
    def union(x,y):
        x,y=find(x),find(y)
        if x==y:return False
        par[y]=x;return True
    for u,v in edges:
        if not union(u,v):return[u,v]`}}
      />

      <ProblemCard num={6} title="Evaluate Division (Weighted Graph Paths)" difficulty="LC Medium" tags={["LC 399","Weighted BFS/DFS"]}
        statement="Given equations like A/B=2.0 and queries like A/C, compute the results using the given ratios. Return -1.0 for variables not in the equations or self-contradictions."
        constraints={["1 ≤ equations.length ≤ 20","All variable strings have length 1-5"]}
        examples={[{input:'equations=[["a","b"],["b","c"]], values=[2.0,3.0], queries=[["a","c"],["b","a"],["a","e"]]',output:"[6.0,0.5,-1.0]"}]}
        approach="Build a weighted directed graph: A→B with weight 2.0, B→A with weight 0.5. For each query (X,Y), BFS/DFS from X to Y — multiply edge weights along the path. If no path or variables not in graph → return -1.0."
        code={{cpp:`double bfsQuery(unordered_map<string,vector<pair<string,double>>>& adj,const string& s,const string& t){
    if(!adj.count(s)||!adj.count(t))return -1;
    unordered_map<string,double>vis;queue<pair<string,double>>q;
    q.push({s,1.0});vis[s]=1.0;
    while(!q.empty()){auto[u,w]=q.front();q.pop();
        if(u==t)return w;
        for(auto[v,wv]:adj[u]) if(!vis.count(v)){vis[v]=w*wv;q.push({v,w*wv});}
    }
    return -1;
}`,python:`def calc_equation(equations,values,queries):
    adj=defaultdict(dict)
    for (a,b),v in zip(equations,values):
        adj[a][b]=v;adj[b][a]=1/v
    def bfs(s,t):
        if s not in adj or t not in adj:return -1
        vis={s};q=deque([(s,1.0)])
        while q:
            u,w=q.popleft()
            if u==t:return w
            for v,wv in adj[u].items():
                if v not in vis:vis.add(v);q.append((v,w*wv))
        return -1
    return[bfs(s,t) for s,t in queries]`}}
      />
    </div>
  );
}

/* ROOT */
const TABS = [
  {id:'mst',      label:'MST (Kruskal + Prim)'},
  {id:'dijkstra', label:'Dijkstra'},
  {id:'bellman',  label:'Bellman-Ford & Floyd-Warshall'},
  {id:'problems', label:'Problems'},
];
export default function GraphAlgorithms() {
  const [active,setActive]=useState('mst');
  const map={mst:<SectionMST/>,dijkstra:<SectionDijkstra/>,bellman:<SectionBellmanFloyd/>,problems:<SectionProblems/>};
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 22</div>
        <h1 className="page-header-title">Graph Algorithms</h1>
        <p className="page-header-subtitle">MST · Kruskal · Prim · Dijkstra · Bellman-Ford · Floyd-Warshall · Transitive Closure · Union-Find</p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={22}/>
    </div>
  );
}
