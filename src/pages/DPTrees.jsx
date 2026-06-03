import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SHARED TREE — used in every visualizer
        10
       /  \
     -5    3
     / \
    4   6
   Values: 10, -5, 3, 4, 6
══════════════════════════════════════════════════════ */
const T_VALS  = { 0:10, 1:-5, 2:3, 3:4, 4:6 };
const T_POS   = { 0:[300,42], 1:[175,122], 2:[425,122], 3:[90,202], 4:[260,202] };
const T_EDGES = [[0,1],[0,2],[1,3],[1,4]];
const T_CHILDREN = { 0:[1,2], 1:[3,4], 2:[], 3:[], 4:[] };
const POST_ORDER = [3, 4, 1, 2, 0]; // post-order traversal

/* ══════════════════════════════════════════════════════
   STEP BUILDERS — precomputed at module load
══════════════════════════════════════════════════════ */

/* ── Mode 1: Diameter ───────────────────────────────── */
function buildDiamSteps() {
  const steps = [], H = {}, maxDia = [0];
  steps.push({ H:{}, maxDia:0, cur:null, action:'init',
    desc:'DP on Trees: process children BEFORE parent (post-order). At each node, return its height to the parent. Update the global diameter on the way.' });
  for (const id of POST_ORDER) {
    const ch = T_CHILDREN[id];
    const isLeaf = ch.length === 0;
    if (isLeaf) {
      H[id] = 1;
      steps.push({ H:{...H}, maxDia:maxDia[0], cur:id, lh:0, rh:0, h:1, dia:0, action:'leaf',
        desc:`Node ${T_VALS[id]}: LEAF. Height = 1. Diameter contribution = 0 (need two sides). Return h=1 to parent.` });
    } else {
      const lh = H[ch[0]] ?? 0;
      const rh = H[ch[1]] ?? 0;
      const h  = Math.max(lh, rh) + 1;
      const dia = lh + rh;
      H[id] = h;
      const isNew = dia > maxDia[0];
      if (isNew) maxDia[0] = dia;
      steps.push({ H:{...H}, maxDia:maxDia[0], cur:id, lh, rh, h, dia, action: isNew?'newMax':'update',
        desc:`Node ${T_VALS[id]}: left_h=${lh}, right_h=${rh}. Height=${h}. Diameter through here = ${lh}+${rh}=${dia}.${isNew?' ★ New max diameter!':''} Return h=${h} to parent.` });
    }
  }
  steps.push({ H:{...H}, maxDia:maxDia[0], cur:null, action:'done',
    desc:`Done! Diameter = ${maxDia[0]} edges. Path: 4→(−5)→10→3 or 6→(−5)→10→3.` });
  return steps;
}
const DIAM_STEPS = buildDiamSteps();

/* ── Mode 2: Max Path Sum (any-to-any) ─────────────── */
function buildPathSteps() {
  const steps = [], G = {}, maxPath = [T_VALS[POST_ORDER[0]]];
  steps.push({ G:{}, maxPath:-Infinity, cur:null, action:'init',
    desc:`At each node: GAIN = max single-path sum starting from this node, going into one subtree. Path through a node = left_gain + node + right_gain. Negative subtrees are discarded (gain clamped to 0).` });
  for (const id of POST_ORDER) {
    const ch = T_CHILDREN[id];
    const val = T_VALS[id];
    const isLeaf = ch.length === 0;
    if (isLeaf) {
      G[id] = val;
      const isNew = val > maxPath[0];
      if (isNew) maxPath[0] = val;
      steps.push({ G:{...G}, maxPath:maxPath[0], cur:id, lhg:0, rhg:0, pathThrough:val, gain:val, action:'leaf',
        desc:`Node ${val}: LEAF. Gain = ${val}. Path "through" = ${val} (single node). ${isNew?'★ New max path!':''} Return gain=${val} to parent.` });
    } else {
      const lhRaw = G[ch[0]] ?? 0;
      const rhRaw = G[ch[1]] ?? 0;
      const lhg = Math.max(0, lhRaw);  // discard negative subtrees
      const rhg = Math.max(0, rhRaw);
      const pathThrough = val + lhg + rhg;
      const gain = val + Math.max(lhg, rhg);
      const isNew = pathThrough > maxPath[0];
      if (isNew) maxPath[0] = pathThrough;
      G[id] = gain;
      steps.push({ G:{...G}, maxPath:maxPath[0], cur:id, lhRaw, rhRaw, lhg, rhg, pathThrough, gain, action: isNew?'newMax':'update',
        desc:`Node ${val}: left_gain=${lhRaw}→clamped=${lhg}, right_gain=${rhRaw}→clamped=${rhg}. Path through = ${val}+${lhg}+${rhg}=${pathThrough}.${isNew?' ★ New max!':''} Return gain=${gain} to parent.` });
    }
  }
  steps.push({ G:{...G}, maxPath:maxPath[0], cur:null, action:'done',
    desc:`Done! Max path sum = ${maxPath[0]}. Path: 6→(−5)→10→3 = 6+(−5)+10+3=${maxPath[0]}.` });
  return steps;
}
const PATH_STEPS = buildPathSteps();

/* ── Mode 3: Leaf-to-Leaf Max Path Sum ─────────────── */
function buildLeafSteps() {
  const steps = [], BL = {}, maxL2L = [-Infinity];
  steps.push({ BL:{}, maxL2L:-Infinity, cur:null, action:'init',
    desc:`Leaf-to-leaf: path must start AND end at leaves. At each node with two children: record candidate = bestLeaf(left) + node + bestLeaf(right). bestLeaf(v) = max sum path from any leaf in subtree(v) going UP to v.` });
  for (const id of POST_ORDER) {
    const ch = T_CHILDREN[id];
    const val = T_VALS[id];
    const isLeaf = ch.length === 0;
    if (isLeaf) {
      BL[id] = val;
      steps.push({ BL:{...BL}, maxL2L:maxL2L[0], cur:id, action:'leaf',
        desc:`Node ${val}: LEAF. bestLeaf = ${val} (only path = the leaf itself). Cannot form leaf-to-leaf path alone — need TWO leaf endpoints.` });
    } else {
      const lbl = BL[ch[0]];
      const rbl = BL[ch[1]];
      const l2l = lbl + val + rbl;
      const isNew = l2l > maxL2L[0];
      if (isNew) maxL2L[0] = l2l;
      const bl = Math.max(lbl, rbl) + val;
      BL[id] = bl;
      steps.push({ BL:{...BL}, maxL2L:maxL2L[0], cur:id, lbl, rbl, l2l, bl, action: isNew?'newMax':'update',
        desc:`Node ${val}: bestLeaf(left)=${lbl}, bestLeaf(right)=${rbl}. L2L through here = ${lbl}+${val}+${rbl}=${l2l}.${isNew?' ★ New max L2L!':''} bestLeaf(this) = max(${lbl},${rbl})+${val}=${bl}. Return ${bl} to parent.` });
    }
  }
  steps.push({ BL:{...BL}, maxL2L:maxL2L[0], cur:null, action:'done',
    desc:`Done! Max leaf-to-leaf sum = ${maxL2L[0]}. Path: 6→(−5)→10→3 = 6+(−5)+10+3=${maxL2L[0]}.` });
  return steps;
}
const LEAF_STEPS = buildLeafSteps();

/* ══════════════════════════════════════════════════════
   SHARED TREE SVG COMPONENT
══════════════════════════════════════════════════════ */
function TreeSVG({ hl={}, labels={}, W=600, H=270 }) {
  const CLR  = { cur:'#3A2A1A', done:'#1A3A2A', newMax:'#2A1A3A', leaf:'#1A2A3A', none:'#131722' };
  const STR  = { cur:'#CE9178', done:'#4EC9B0', newMax:'#C586C0', leaf:'#81B4EA', none:'#1E2233' };
  const TXT  = { cur:'#CE9178', done:'#4EC9B0', newMax:'#C586C0', leaf:'#9CDCFE', none:'#6A7490' };
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {T_EDGES.map(([a,b],i) => {
        const pa=T_POS[a], pb=T_POS[b];
        return <line key={i} x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} stroke="#2A3050" strokeWidth="1.5"/>;
      })}
      {Object.keys(T_POS).map(v => {
        const nv=+v, [x,y]=T_POS[nv], c=hl[nv]||'none', lbl=labels[nv];
        return (
          <g key={v}>
            <circle cx={x} cy={y} r="24" fill={CLR[c]} stroke={STR[c]} strokeWidth={c!=='none'?2:1}/>
            <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fill={TXT[c]}
              fontSize="13" fontFamily="monospace" fontWeight={c!=='none'?700:500}>{T_VALS[nv]}</text>
            {lbl && (
              <text x={x} y={y+34} textAnchor="middle" fill={STR[c]}
                fontSize="10" fontFamily="monospace" fontWeight="700">{lbl}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — 3-MODE TREE DP STEP-THROUGH
   Diameter / Max Path Sum / Leaf-to-Leaf
══════════════════════════════════════════════════════ */
function TreeDPViz() {
  const [mode, setMode] = useState('diam');
  const [step, setStep] = useState(0);

  const CONFIGS = {
    diam: { label:'Diameter',        steps:DIAM_STEPS, color:'info'    },
    path: { label:'Max Path Sum',    steps:PATH_STEPS, color:'success' },
    leaf: { label:'Leaf-to-Leaf',    steps:LEAF_STEPS, color:'warning' },
  };
  const cfg   = CONFIGS[mode];
  const steps = cfg.steps;
  const s     = steps[Math.min(step, steps.length-1)];

  const changeMode = (m) => { setMode(m); setStep(0); };

  // Build highlight map + label map from step data
  const hl = {}, labels = {};
  if (s.cur != null) hl[s.cur] = s.action === 'newMax' ? 'newMax' : s.action === 'leaf' ? 'leaf' : 'cur';

  // Previous nodes (fully processed)
  const curIdx = POST_ORDER.indexOf(s.cur);
  for (let i = 0; i < curIdx; i++) {
    const id = POST_ORDER[i];
    if (!hl[id]) hl[id] = 'done';
  }

  // Labels: show computed values below each node
  if (mode === 'diam') {
    Object.entries(s.H || {}).forEach(([v, h]) => { labels[+v] = `h=${h}`; });
  } else if (mode === 'path') {
    Object.entries(s.G || {}).forEach(([v, g]) => { labels[+v] = `g=${g}`; });
  } else {
    Object.entries(s.BL || {}).forEach(([v, bl]) => { labels[+v] = `bl=${bl}`; });
  }

  // Global metric
  const globalVal = mode==='diam' ? s.maxDia : mode==='path' ? s.maxPath : s.maxL2L;
  const globalLabel = mode==='diam' ? 'Max Diameter' : mode==='path' ? 'Max Path Sum' : 'Max L2L';
  const globalIsValid = globalVal !== undefined && globalVal !== -Infinity;

  const ACT_COLORS = { newMax: 'purple', leaf: 'info', update: cfg.color, cur: 'warning', done: 'success', init: null };
  const ac = ACT_COLORS[s.action] || cfg.color;

  return (
    <VizBox>
      {/* Mode tabs */}
      <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
        {Object.entries(CONFIGS).map(([k,v]) => (
          <button key={k} onClick={()=>changeMode(k)} style={{ padding:'4px 12px', border:'1px solid', borderColor:mode===k?`var(--color-border-${v.color})`:'var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:mode===k?`var(--color-background-${v.color})`:'transparent', color:mode===k?`var(--color-text-${v.color})`:'var(--color-text-secondary)', cursor:'pointer', fontSize:12 }}>{v.label}</button>
        ))}
      </div>

      {/* Step description */}
      <div style={{ marginBottom:12, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        {ac && s.action !== 'init' && (
          <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:700, background:`var(--color-background-${ac})`, color:`var(--color-text-${ac})`, border:`1px solid var(--color-border-${ac})`, whiteSpace:'nowrap' }}>
            {s.action==='newMax'?'★ New Max!':s.action==='leaf'?'Leaf':s.action==='done'?'Done ✓':'Compute'}
          </span>
        )}
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</span>
      </div>

      {/* Tree + global counter side by side */}
      <div style={{ display:'flex', gap:12, alignItems:'flex-start', flexWrap:'wrap', marginBottom:12 }}>
        <div style={{ flex:1, minWidth:260, overflowX:'auto' }}>
          <TreeSVG hl={hl} labels={labels} />
        </div>
        {/* Global counter */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, minWidth:130 }}>
          <div style={{ padding:'12px 14px', borderRadius:'var(--border-radius-md)', background:globalIsValid&&s.action!=='init'?`var(--color-background-${cfg.color})`:'var(--color-background-secondary)', border:`1px solid ${globalIsValid&&s.action!=='init'?`var(--color-border-${cfg.color})`:'var(--color-border-secondary)'}`, textAlign:'center', transition:'all 0.2s' }}>
            <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:4 }}>{globalLabel}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:22, fontWeight:700, color:globalIsValid&&s.action!=='init'?`var(--color-text-${cfg.color})`:'var(--color-text-secondary)' }}>
              {globalIsValid && s.action !== 'init' ? globalVal : '—'}
            </div>
          </div>
          {/* Return value annotation */}
          {s.cur != null && (
            <div style={{ padding:'8px 10px', borderRadius:'var(--border-radius-md)', background:'var(--color-background-secondary)', border:'0.5px solid var(--color-border-secondary)', fontFamily:'var(--font-mono)', fontSize:11, lineHeight:1.9 }}>
              <div style={{ color:'var(--color-text-tertiary)', marginBottom:2 }}>Current node:</div>
              <div style={{ color:'var(--color-text-warning)', fontWeight:700 }}>val = {T_VALS[s.cur]}</div>
              {mode==='diam' && s.h && <div style={{ color:'var(--color-text-info)' }}>return h={s.h}</div>}
              {mode==='path' && s.gain!=null && <div style={{ color:'var(--color-text-success)' }}>return gain={s.gain}</div>}
              {mode==='leaf' && s.bl!=null && <div style={{ color:'var(--color-text-warning)' }}>return bl={s.bl}</div>}
              {s.action==='leaf' && <div style={{ color:'var(--color-text-info)', fontSize:10 }}>(leaf node)</div>}
            </div>
          )}
        </div>
      </div>

      {/* Post-order progress indicator */}
      <div style={{ display:'flex', gap:5, marginBottom:12, flexWrap:'wrap' }}>
        <span style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', alignSelf:'center', marginRight:4 }}>Post-order:</span>
        {POST_ORDER.map((id, i) => {
          const done  = s.cur != null ? i < POST_ORDER.indexOf(s.cur) : s.action==='done';
          const cur   = id === s.cur && s.action !== 'done';
          return (
            <div key={id} style={{ padding:'3px 9px', borderRadius:20, border:`1px solid ${cur?'var(--color-border-warning)':done?`var(--color-border-${cfg.color})`:'var(--color-border-tertiary)'}`, background:cur?'var(--color-background-warning)':done?`var(--color-background-${cfg.color})`:'transparent', fontFamily:'var(--font-mono)', fontSize:11.5, fontWeight:cur||done?700:400, color:cur?'var(--color-text-warning)':done?`var(--color-text-${cfg.color})`:'var(--color-text-tertiary)', transition:'all 0.15s' }}>
              {T_VALS[id]}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:10, marginBottom:12, flexWrap:'wrap' }}>
        {[{c:'leaf',l:'Leaf node'},{c:'cur',l:'Current'},{c:'done',l:'Processed'},{c:'newMax',l:'New max!'}].map(({c,l})=>(
          <div key={c} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11 }}>
            <div style={{ width:9, height:9, borderRadius:'50%', background:`var(--color-background-${c==='cur'?'warning':c==='done'?cfg.color:c==='newMax'?'purple':'info'})`, border:`1px solid var(--color-border-${c==='cur'?'warning':c==='done'?cfg.color:c==='newMax'?'purple':'info'})` }}/>
            <span style={{ color:'var(--color-text-secondary)' }}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(steps.length-1,step+1)),step===steps.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:64,textAlign:'center',alignSelf:'center'}}>{step+1}/{steps.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(steps.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
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
   SECTION 1 — DP ON TREES FRAMEWORK
══════════════════════════════════════════════════════ */
function SectionFramework() {
  return (
    <div>
      <Note color="info" icon="ti-binary-tree">
        Trees are <strong>recursively defined</strong>: a tree is a root node whose children are also trees. This makes them the most natural structure for DP. Every subtree is an independent subproblem. Post-order traversal (children before parent) gives us the correct dependency order — automatically.
      </Note>

      <H2>The Universal DP on Trees Pattern</H2>
      <div style={{ background:'#0D0F18', border:'1px solid #1E2233', borderRadius:10, padding:'18px 20px', marginBottom:16 }}>
        {[
          ['1. Define state',     'info',    'What does the recursive function return for a subtree rooted at v?',                         'height(v), gain(v), best_leaf(v)...'],
          ['2. Leaf base case',   'success', 'What is the answer for a leaf node? (trivial)',                                             'height=1, gain=val, best_leaf=val'],
          ['3. Combine children', 'warning', 'How do you compute the answer for v from its children\'s answers?',                        'max(lh,rh)+1 for height; val+max(lg,rg) for gain'],
          ['4. Local vs global',  'purple',  'Do you need a global "max so far"? Update it at each node before returning to parent.',    'maxDia = max(maxDia, lh+rh)'],
          ['5. Return what parent needs','secondary','The return value may differ from the global update — return only what the parent uses.','Return height (not diameter) to parent'],
        ].map(([title, color, desc, example], i) => (
          <div key={i} style={{ display:'flex', gap:12, marginBottom:i<4?12:0, alignItems:'flex-start' }}>
            <div style={{ flexShrink:0, width:26, height:26, borderRadius:'50%', background:`var(--color-background-${color})`, border:`1px solid var(--color-border-${color})`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:12, fontWeight:700, color:`var(--color-text-${color})`, marginTop:2 }}>{i+1}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:`var(--color-text-${color})`, marginBottom:3 }}>{title}</div>
              <div style={{ fontSize:12.5, color:'var(--color-text-secondary)', marginBottom:3 }}>{desc}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:11.5, color:'var(--color-text-tertiary)', padding:'3px 8px', borderRadius:4, background:'rgba(255,255,255,0.04)', display:'inline-block' }}>e.g. {example}</div>
            </div>
          </div>
        ))}
      </div>

      <H2>The Local-Global Split — The Core Insight</H2>
      <P>Every tree DP problem has two values at each node: what you <strong>return</strong> to the parent (local), and what you <strong>update</strong> globally. These are almost never the same thing. Confusing them is the most common mistake.</P>
      <Table
        heads={["Problem","What to RETURN to parent","What to UPDATE globally"]}
        rows={[
          ["Diameter",        "height(v) — single downward arm length",           "maxDia = max(maxDia, lh+rh) — the two-arm path"],
          ["Max path sum",    "gain(v) = val + max(0, left_gain, right_gain)",    "maxPath = max(maxPath, val+lhg+rhg)"],
          ["Leaf-to-leaf",    "bestLeaf(v) = val + max(left_BL, right_BL)",      "maxL2L = max(maxL2L, lBL+val+rBL) when 2 children"],
          ["Max subtree size","size(v) = 1 + left_size + right_size",             "maxSize = max(maxSize, size(v))"],
          ["Height-balanced?","-1 if unbalanced, else height",                   "(using -1 as error sentinel)"],
        ]}
      />

      <Note color="warning" icon="ti-bulb">
        <strong>Template code pattern:</strong> The function signature always looks like <code>int solve(Node* v, int& global)</code>. The return value is what the parent needs. The <code>global</code> reference is updated in-place. Never return the global value directly.
      </Note>

      <Code>{{cpp:`// UNIVERSAL TREE DP TEMPLATE
// Return: what the PARENT needs to compute its own value
// Update: the GLOBAL best answer
int solve(TreeNode* node, int& globalAnswer) {
    if (!node) return BASE_CASE;                  // null = 0 height / 0 gain / etc.

    int left  = solve(node->left,  globalAnswer); // get left child's return value
    int right = solve(node->right, globalAnswer); // get right child's return value

    // Update the global answer using BOTH children (the "two-armed" path)
    globalAnswer = max(globalAnswer, COMBINE_FOR_GLOBAL(left, right, node->val));

    // Return only what the PARENT needs (the "one-armed" path from this node upward)
    return RETURN_FOR_PARENT(left, right, node->val);
}`, python:`def solve(node, global_ans):          # global_ans passed as list for mutability
    if not node: return BASE_CASE

    left  = solve(node.left,  global_ans)
    right = solve(node.right, global_ans)

    # Update global: two-arm path through this node
    global_ans[0] = max(global_ans[0], combine_for_global(left, right, node.val))

    # Return: one-arm value for parent
    return return_for_parent(left, right, node.val)`}}</Code>

      <H2>In-Out DP (Rerooting Technique)</H2>
      <P>Standard tree DP computes each subtree's answer. But what if you need the answer treating <em>every node as a potential root</em>? In-out DP adds a second DFS pass (top-down) to propagate parent information downward.</P>
      <div style={{ background:'var(--color-background-secondary)', border:'1px solid var(--color-border-secondary)', borderRadius:10, padding:'14px 16px', marginBottom:14 }}>
        <div style={{ fontSize:12.5, lineHeight:1.9, color:'var(--color-text-secondary)' }}>
          <strong style={{ color:'var(--color-text-info)' }}>Pass 1 (post-order, bottom-up):</strong> Compute dp_down[v] = answer considering only the subtree rooted at v.<br/>
          <strong style={{ color:'var(--color-text-success)' }}>Pass 2 (pre-order, top-down):</strong> Compute dp_up[v] = best answer from the "rest of the tree" above v (the tree if you removed v's subtree).<br/>
          <strong style={{ color:'var(--color-text-warning)' }}>Final answer at v:</strong> Combine dp_down[v] and dp_up[v] to get the global answer when v is treated as the root.<br/>
          <strong style={{ color:'var(--color-text-purple)' }}>Classic application:</strong> "Sum of distances in tree" (LC 834) — compute total path length from each node to all others in O(n).
        </div>
      </div>

      <H2>Knapsack on Trees</H2>
      <P>When you need to select exactly k nodes from a subtree to maximize some value, use the "tree knapsack" pattern. Each child's subtree is a "group" of items. Merge children's DP tables one by one.</P>
      <Code>{{cpp:`// Tree knapsack: dp[v][k] = max value using exactly k nodes in subtree(v)
void treeKnapsack(int v, int parent, int budget) {
    dp[v][1] = val[v];                     // just this node
    for (int u : adj[v]) {
        if (u == parent) continue;
        treeKnapsack(u, v, budget);
        // Merge child u's DP into v's DP (right to left to avoid reuse)
        for (int j=min(budget,sz[v]+sz[u]); j>=1; j--) {
            for (int k=1; k<=min(j-1,sz[u]); k++) {
                dp[v][j] = max(dp[v][j], dp[v][j-k] + dp[u][k]);
            }
        }
        sz[v] += sz[u];
    }
}
// Time: O(n^2) total — each pair of nodes merged exactly once`, python:`def tree_knapsack(v, parent, dp, adj, val):
    dp[v][1] = val[v]; sz = 1
    for u in adj[v]:
        if u == parent: continue
        tree_knapsack(u, v, dp, adj, val)
        # Merge right-to-left
        for j in range(budget, 0, -1):
            for k in range(1, min(j, sz)+1):
                dp[v][j] = max(dp[v][j], dp[v][j-k] + dp[u][k])
        sz += subtree_size[u]`}}</Code>

      <QA q="Why must we always process children before the parent in tree DP? Can we ever go top-down first?" a="Post-order (children before parent) ensures that when we compute dp[v], all dp[children] values are already available. Going top-down first means dp[v] would try to use dp[children] before they're computed. The only exception: in-out DP, where we do a first post-order pass, then a second pre-order (top-down) pass. But even there, the second pass uses values computed in the first pass — they're never interleaved." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — THREE INTERACTIVE PROBLEMS
══════════════════════════════════════════════════════ */
function SectionInteractive() {
  return (
    <div>
      <Note color="success" icon="ti-bolt">
        Three problems on the same tree — watch how the <strong>local return value</strong> and <strong>global update</strong> change across all three. The structure of the recursion is identical; only what you compute at each step differs.
      </Note>

      <H2>Tree: same for all three modes</H2>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:8 }}>
        <TreeSVG />
      </div>
      <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', fontFamily:'var(--font-mono)', fontSize:12, marginBottom:16 }}>
        {[['Diameter','3 edges (6→-5→10→3)'],['Max Path Sum','14 (6→-5→10→3)'],['Leaf-to-Leaf','14 (6→-5→10→3)']].map(([l,v])=>(
          <div key={l} style={{ padding:'4px 12px', borderRadius:6, background:'var(--color-background-secondary)', border:'0.5px solid var(--color-border-secondary)', color:'var(--color-text-secondary)' }}>
            <span style={{ color:'var(--color-text-info)', fontWeight:700 }}>{l}: </span>{v}
          </div>
        ))}
      </div>

      <TreeDPViz />

      <H2>Side-by-Side: What Each Mode Returns</H2>
      <Table
        heads={["Node","Diameter (return h)","Path Sum (return gain)","Leaf-to-Leaf (return bestLeaf)"]}
        rows={[
          ["4 (leaf)",  "h=1",  "gain=4",  "bestLeaf=4"],
          ["6 (leaf)",  "h=1",  "gain=6",  "bestLeaf=6"],
          ["-5",        "h=2, global: dia=2","gain=1, global: path=5","bestLeaf=1, global: l2l=5"],
          ["3 (leaf)",  "h=1",  "gain=3",  "bestLeaf=3"],
          ["10 (root)", "h=3, global: dia=3","gain=13, global: path=14","bestLeaf=13, global: l2l=14"],
        ]}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — THE THREE PROBLEMS IN FULL
══════════════════════════════════════════════════════ */
function SectionProblems() {
  return (
    <div>
      <H2>Diameter of a Binary Tree</H2>
      <P>The longest path between any two nodes. Crucially, this path may not pass through the root. The "diameter through a node" = left_height + right_height. We track the global max across all nodes during a post-order traversal that returns heights.</P>
      <Code>{{cpp:`int diameterOfBinaryTree(TreeNode* root) {
    int maxDiameter = 0;

    function<int(TreeNode*)> height = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int lh = height(node->left);
        int rh = height(node->right);

        // GLOBAL update: diameter through this node = lh + rh
        maxDiameter = max(maxDiameter, lh + rh);

        // LOCAL return: height for parent's use
        return max(lh, rh) + 1;
    };

    height(root);
    return maxDiameter;
}
// O(n) time, O(h) space (call stack)
// Key insight: return height (single arm), update diameter (both arms)`,python:`def diameter_of_binary_tree(root):
    max_dia = [0]
    def height(node):
        if not node: return 0
        lh = height(node.left)
        rh = height(node.right)
        max_dia[0] = max(max_dia[0], lh + rh)  # global update
        return max(lh, rh) + 1                  # local return
    height(root)
    return max_dia[0]`}}</Code>

      <H2>Maximum Path Sum — Any Node to Any Node (LC 124)</H2>
      <P>The path can start and end anywhere (not just leaves). At each node, the "gain" going toward the parent = val + max(0, left_gain, right_gain). We discard negative sub-paths (clamp to 0). The global max is the best two-armed path through any node.</P>
      <Code>{{cpp:`int maxPathSum(TreeNode* root) {
    int maxPath = INT_MIN;

    function<int(TreeNode*)> gain = [&](TreeNode* node) -> int {
        if (!node) return 0;

        // Clamp to 0: don't extend through a net-negative subtree
        int lGain = max(0, gain(node->left));
        int rGain = max(0, gain(node->right));

        // GLOBAL update: best path through this node (can use both arms)
        maxPath = max(maxPath, node->val + lGain + rGain);

        // LOCAL return: best single-arm path going UP to parent
        return node->val + max(lGain, rGain);
    };

    gain(root);
    return maxPath;
}
// [-10, 9, 20, null, null, 15, 7]: 15+20+7=42
// Why clamp to 0? Including a negative-gain subtree only hurts the sum.`,python:`def max_path_sum(root):
    max_path=[float('-inf')]
    def gain(node):
        if not node:return 0
        lg=max(0,gain(node.left))
        rg=max(0,gain(node.right))
        max_path[0]=max(max_path[0],node.val+lg+rg)  # global: both arms
        return node.val+max(lg,rg)                    # local: one arm upward
    gain(root)
    return max_path[0]`}}</Code>

      <Note color="info" icon="ti-bulb">
        <strong>Why clamp gain to 0?</strong> If the left subtree's best path sum is negative, it's better to start fresh at the current node rather than extending through that subtree. clamping = "I choose to start the path here instead of continuing from a bad subtree."
      </Note>

      <H2>Maximum Leaf-to-Leaf Path Sum</H2>
      <P>The path must start and end at <em>leaf</em> nodes. This adds a constraint: we can only update the global max when a node has <strong>both</strong> left and right children (otherwise we can't have two leaf endpoints). The return value is the best sum from any leaf in the subtree going up to this node.</P>
      <Code>{{cpp:`int maxLeafToLeafSum(TreeNode* root) {
    int maxL2L = INT_MIN;

    function<int(TreeNode*)> bestLeaf = [&](TreeNode* node) -> int {
        if (!node) return INT_MIN; // signal: "I'm null, no leaf here"
        if (!node->left && !node->right) return node->val; // LEAF: path = just itself

        // Only update global if BOTH children exist (two valid leaf endpoints)
        if (node->left && node->right) {
            int lBest = bestLeaf(node->left);
            int rBest = bestLeaf(node->right);
            if (lBest != INT_MIN && rBest != INT_MIN)
                maxL2L = max(maxL2L, lBest + node->val + rBest);
            return node->val + max(lBest, rBest);
        }

        // Only one child — no leaf-to-leaf possible through this node
        TreeNode* child = node->left ? node->left : node->right;
        int cBest = bestLeaf(child);
        return cBest == INT_MIN ? INT_MIN : node->val + cBest;
    };

    bestLeaf(root);
    return maxL2L;
}`,python:`def max_leaf_to_leaf(root):
    max_l2l=[float('-inf')]
    def best_leaf(node):
        if not node:return float('-inf')
        if not node.left and not node.right:return node.val  # leaf
        if node.left and node.right:
            lb=best_leaf(node.left); rb=best_leaf(node.right)
            if lb!=float('-inf') and rb!=float('-inf'):
                max_l2l[0]=max(max_l2l[0],lb+node.val+rb)
            return node.val+max(lb,rb)
        child=node.left or node.right
        cb=best_leaf(child)
        return float('-inf') if cb==float('-inf') else node.val+cb
    best_leaf(root); return max_l2l[0]`}}</Code>

      <Note color="warning" icon="ti-alert-triangle">
        <strong>Why the "only one child" case uses INT_MIN as a flag:</strong> If a node has only one child, the "path through this node" cannot be a valid leaf-to-leaf path (one side has no leaf endpoint). We return INT_MIN as a sentinel to prevent the parent from accidentally using this as a valid leaf endpoint. The parent checks for INT_MIN before updating the global max.
      </Note>

      <QA q="What's the difference between max path sum (any-to-any) and leaf-to-leaf? When would the answers differ?" a="Any-to-any can stop at any node — even a single internal node. Leaf-to-leaf must reach actual leaf nodes on both ends. They differ when: (1) all leaves have very negative values but some internal node is large — any-to-any picks the internal node, leaf-to-leaf is forced through the bad leaves. (2) A node has only one child — any-to-any can use the one-child path; leaf-to-leaf cannot use this node as a 'fork point' since it has only one leaf side. (3) The tree is a straight chain — any-to-any = max single node; leaf-to-leaf = sum of all nodes (root-to-leaf is the only leaf-to-leaf path)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — PRACTICE PROBLEMS
══════════════════════════════════════════════════════ */
function SectionPractice() {
  return (
    <div>
      <Note color="purple" icon="ti-tournament">
        3 problems — the canonical DP on trees triad. Notice how the code structure is almost identical across all three; only what you "return" and "update globally" changes.
      </Note>

      <ProblemCard num={1} title="Diameter of Binary Tree" difficulty="LC Medium" tags={["LC 543","Tree DP"]}
        statement="Given the root of a binary tree, return the length of the <strong>diameter</strong> — the longest path between any two nodes (measured in edges). The path may or may not pass through the root."
        constraints={["1 ≤ nodes ≤ 10⁴","-100 ≤ val ≤ 100"]}
        examples={[{input:"[1,2,3,4,5]",output:"3",note:"Path 4→2→1→3 or 5→2→1→3"},{input:"[1,2]",output:"1"}]}
        approach="Post-order tree DP. Return height to parent. Update global diameter at each node: dia_through = lh+rh. The path that maximizes lh+rh may be anywhere in the tree — not necessarily through the root. O(n) single DFS pass."
        code={{cpp:`int diameterOfBinaryTree(TreeNode* root){
    int ans=0;
    function<int(TreeNode*)>h=[&](TreeNode* n)->int{
        if(!n)return 0;
        int l=h(n->left),r=h(n->right);
        ans=max(ans,l+r);      // global: two-arm path
        return max(l,r)+1;    // local: one-arm height for parent
    };
    h(root);return ans;
}`,python:`def diameter(root):
    ans=[0]
    def h(n):
        if not n:return 0
        l,r=h(n.left),h(n.right)
        ans[0]=max(ans[0],l+r)
        return max(l,r)+1
    h(root);return ans[0]`}}
      />

      <ProblemCard num={2} title="Binary Tree Maximum Path Sum" difficulty="LC Hard" tags={["LC 124","Tree DP"]}
        statement="Given a binary tree, find the maximum <strong>path sum</strong>. A path is a sequence of connected nodes where each node appears at most once. The path does not need to pass through the root. Values can be negative."
        constraints={["1 ≤ nodes ≤ 3×10⁴","-1000 ≤ val ≤ 1000"]}
        examples={[{input:"[-10,9,20,null,null,15,7]",output:"42",note:"15→20→7 = 42"},{input:"[1,2,3]",output:"6",note:"2+1+3"}]}
        approach="Post-order DP. Gain(v) = val + max(0, left_gain, right_gain). Clamp subtree gains to 0 to discard net-negative paths. Update global: path_through = val+left_clamped+right_clamped. Return: val+max(left_clamped,right_clamped). O(n) single pass."
        code={{cpp:`int maxPathSum(TreeNode* root){
    int ans=INT_MIN;
    function<int(TreeNode*)>g=[&](TreeNode* n)->int{
        if(!n)return 0;
        int l=max(0,g(n->left)),r=max(0,g(n->right));
        ans=max(ans,n->val+l+r);     // global: two-arm
        return n->val+max(l,r);      // local: one-arm
    };
    g(root);return ans;
}`,python:`def max_path_sum(root):
    ans=[float('-inf')]
    def g(n):
        if not n:return 0
        l,r=max(0,g(n.left)),max(0,g(n.right))
        ans[0]=max(ans[0],n.val+l+r)
        return n.val+max(l,r)
    g(root);return ans[0]`}}
      />

      <ProblemCard num={3} title="Maximum Path Sum: Leaf to Leaf" difficulty="OA Hard" tags={["Tree DP","Leaf Constraint"]}
        statement="Given a binary tree where every node has a value (possibly negative), find the maximum sum path that begins at one <strong>leaf node</strong> and ends at another <strong>leaf node</strong>."
        constraints={["At least 2 leaves","−10⁵ ≤ val ≤ 10⁵","Not necessarily a BST"]}
        examples={[{input:"10, -5, 3, 4, 6 (as in visualization)",output:"14",note:"Path: 6→-5→10→3"},{input:"[-1, -2, -3]",output:"-6",note:"Only path: -2→-1→-3"}]}
        approach="Post-order DP. bestLeaf(v) = max sum path from any leaf in subtree going UP to v. For node with two children: update global = lBest+val+rBest (leaf-to-leaf through this node), return val+max(lBest,rBest). For leaf: return val. For one-child nodes: no global update (can't fork). Handle null with INT_MIN sentinel."
        code={{cpp:`int maxLeafToLeafPath(TreeNode* root){
    int ans=INT_MIN;
    function<int(TreeNode*)>bl=[&](TreeNode* n)->int{
        if(!n)return INT_MIN;
        if(!n->left&&!n->right)return n->val;
        if(n->left&&n->right){
            int l=bl(n->left),r=bl(n->right);
            if(l!=INT_MIN&&r!=INT_MIN)
                ans=max(ans,l+n->val+r);  // global: leaf-to-leaf fork
            return n->val+max(l,r);
        }
        // one child only — can't be a leaf-to-leaf fork
        TreeNode* ch=n->left?n->left:n->right;
        int c=bl(ch);
        return c==INT_MIN?INT_MIN:n->val+c;
    };
    bl(root);return ans;
}`,python:`def max_leaf_to_leaf(root):
    INF=float('-inf'); ans=[INF]
    def bl(n):
        if not n:return INF
        if not n.left and not n.right:return n.val
        if n.left and n.right:
            l,r=bl(n.left),bl(n.right)
            if l!=INF and r!=INF:ans[0]=max(ans[0],l+n.val+r)
            return n.val+max(l,r)
        c=n.left or n.right
        cb=bl(c)
        return INF if cb==INF else n.val+cb
    bl(root);return ans[0]`}}
      />
    </div>
  );
}

/* ROOT */
const TABS = [
  { id:'framework',    label:'DP on Trees Framework' },
  { id:'interactive',  label:'3 Problems — Interactive' },
  { id:'solutions',    label:'Full Solutions' },
  { id:'practice',     label:'Problems' },
];
export default function DPTrees() {
  const [active, setActive] = useState('framework');
  const map = {
    framework:   <SectionFramework />,
    interactive: <SectionInteractive />,
    solutions:   <SectionProblems />,
    practice:    <SectionPractice />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 25</div>
        <h1 className="page-header-title">Dynamic Programming on Trees</h1>
        <p className="page-header-subtitle">
          Post-Order DP · Local vs Global Split · In-Out DP · Tree Knapsack · Diameter · Max Path Sum · Leaf-to-Leaf
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{ padding:'0.5rem 0 2rem' }}>{map[active]}</div>
      <NavButtons moduleId={25} />
    </div>
  );
}
