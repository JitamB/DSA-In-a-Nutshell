import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Math as KaTeXMath } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   TREE STRUCTURE & POSITIONS — shared across all vizzes
         1
       /   \
      2     3
     / \   / \
    4   5 6   7
══════════════════════════════════════════════════════ */
const NP = { // Node screen positions [x, y]
  1:[300,35], 2:[170,115], 3:[430,115],
  4:[90,195],  5:[250,195], 6:[370,195], 7:[510,195],
};
const EDGES = [[1,2],[1,3],[2,4],[2,5],[3,6],[3,7]];
const TREE = { // children arrays
  1:{val:1,left:2,right:3}, 2:{val:2,left:4,right:5},
  3:{val:3,left:6,right:7}, 4:{val:4,left:null,right:null},
  5:{val:5,left:null,right:null}, 6:{val:6,left:null,right:null},
  7:{val:7,left:null,right:null},
};

/* ── Traversal step builder ─────────────────────────── */
function buildTraversalSteps(order) {
  const steps = [];
  const output = [];
  const stack = [];
  const pushStep = (cur, act, desc) =>
    steps.push({ cur, stack: [...stack], output: [...output], act, desc });

  pushStep(null,'init',`${order.charAt(0).toUpperCase()+order.slice(1)} traversal on the tree below. Follow arrows as the recursion unfolds.`);

  function go(id) {
    if (!id) return;
    const n = TREE[id];
    stack.push(id);
    const isLeaf = !n.left && !n.right;

    if (order === 'preorder') {
      output.push(n.val);
      pushStep(id,'visit',`preorder(${n.val}): VISIT ${n.val} first → output=[${output}]. ${isLeaf?'Leaf — no children.':'Go LEFT.'}`);
      if (!isLeaf) { go(n.left); pushStep(id,'goRight',`Back at ${n.val}. LEFT done. Go RIGHT.`); go(n.right); }
    } else if (order === 'inorder') {
      pushStep(id,'arrive',`inorder(${n.val}): ${isLeaf?'Leaf — VISIT immediately.':'Go LEFT first.'}`);
      if (!isLeaf) { go(n.left); }
      output.push(n.val);
      pushStep(id,'visit',`VISIT ${n.val} → output=[${output}].${isLeaf?'':' Go RIGHT.'}`);
      if (!isLeaf) { go(n.right); }
    } else {
      pushStep(id,'arrive',`postorder(${n.val}): ${isLeaf?'Leaf — VISIT immediately.':'Go LEFT first.'}`);
      if (!isLeaf) { go(n.left); pushStep(id,'goRight',`Back at ${n.val}. LEFT done. Go RIGHT.`); go(n.right); }
      output.push(n.val);
      pushStep(id,'visit',`Both subtrees done. VISIT ${n.val} → output=[${output}].`);
    }
    stack.pop();
  }
  go(1);
  pushStep(null,'done',`Complete!  ${order[0].toUpperCase()+order.slice(1)} = [${output.join(' → ')}]`);
  return steps;
}
const TRAV = {
  inorder:   buildTraversalSteps('inorder'),
  preorder:  buildTraversalSteps('preorder'),
  postorder: buildTraversalSteps('postorder'),
};

/* ── Height + Diameter step builder (post-order) ────── */
function buildHeightSteps() {
  const steps = [];
  const H = {}; // node → height (node count)
  let maxDia = 0;
  const order = [4,5,2,6,7,3,1];
  steps.push({ H:{}, maxDia:0, cur:null, action:'init',
    desc:'Compute height bottom-up (post-order). Height = max(lh,rh)+1. Diameter through node = lh + rh.' });
  for (const id of order) {
    const lh = TREE[id].left  ? H[TREE[id].left]  : 0;
    const rh = TREE[id].right ? H[TREE[id].right] : 0;
    const h  = Math.max(lh,rh)+1;
    const dia = lh + rh;
    H[id] = h;
    const newMax = dia > maxDia;
    if (newMax) maxDia = dia;
    steps.push({ H:{...H}, maxDia, cur:id, lh, rh, h, dia, action: newMax&&dia>0?'newMax':dia>0?'update':'leaf',
      desc: TREE[id].left
        ? `Node ${TREE[id].val}: lh=${lh} rh=${rh}. Height=${h}. Diameter through here = ${lh}+${rh}=${dia}.${newMax?' ★ New max diameter!':''}`
        : `Node ${TREE[id].val}: leaf. Height=1, diameter contribution=0.` });
  }
  steps.push({ H:{...H}, maxDia, cur:null, action:'done',
    desc:`Done! Tree height = ${H[1]}. Diameter = ${maxDia} (path: 4→2→1→3→7, total ${maxDia} edges).` });
  return steps;
}
const HD_STEPS = buildHeightSteps();

/* ── LCA step builder ─────────────────────────────────  */
function buildLCASteps(n1, n2) {
  const steps = [];
  const returns = {}; // nodeId → return value (nodeId or null)
  const active  = [];

  steps.push({ n1,n2, active:[], returns:{}, lca:null, cur:null, action:'init',
    desc:`Find LCA of node ${n1} and node ${n2}. At each node: if found target → return it. If both subtrees return non-null → this node is the LCA.` });

  function go(id) {
    if (!id) return null;
    const n = TREE[id];
    active.push(id);

    if (n.val === n1 || n.val === n2) {
      returns[id] = id;
      steps.push({ n1,n2, active:[...active], returns:{...returns}, lca:null, cur:id, action:'found',
        desc:`Node ${n.val} is one of the targets! Return node ${n.val} to parent.` });
      active.pop(); return id;
    }
    steps.push({ n1,n2, active:[...active], returns:{...returns}, lca:null, cur:id, action:'explore',
      desc:`Node ${n.val}: not a target. Explore left subtree first.` });

    const L = go(n.left);
    steps.push({ n1,n2, active:[...active], returns:{...returns}, lca:null, cur:id, action:'midpoint',
      desc:`Back at ${n.val}. Left returned: ${L?TREE[L].val:'null'}. Explore right subtree.` });
    const R = go(n.right);

    let ret;
    if (L && R) {
      ret = id; returns[id] = id;
      steps.push({ n1,n2, active:[...active], returns:{...returns}, lca:id, cur:id, action:'lca',
        desc:`Node ${n.val}: left=${TREE[L].val} AND right=${TREE[R].val} both non-null → node ${n.val} IS the LCA!` });
    } else {
      ret = L ?? R;
      returns[id] = ret;
      steps.push({ n1,n2, active:[...active], returns:{...returns}, lca:null, cur:id, action:'propagate',
        desc:`Node ${n.val}: one subtree has a target (${ret?TREE[ret].val:'none'}). Propagate upward.` });
    }
    active.pop(); return ret;
  }

  const result = go(1);
  const lcaId = Object.entries(returns).find(([,v])=>v&&steps.some(s=>s.lca===+Object.keys(returns).find(k=>returns[k]===v&&TREE[k]?.left&&TREE[k]?.right)))?.[0];
  steps.push({ n1,n2, active:[], returns:{...returns}, lca: result, cur:null, action:'done',
    desc:`LCA(${n1}, ${n2}) = node ${TREE[result]?.val ?? result}` });
  return steps;
}
const LCA_DATA = {
  '4,5': buildLCASteps(4,5),
  '4,6': buildLCASteps(4,6),
  '2,7': buildLCASteps(2,7),
};

/* ══════════════════════════════════════════════════════
   SHARED TREE SVG COMPONENT
══════════════════════════════════════════════════════ */
function TreeSVG({ highlights = {}, labels = {}, dimmed = new Set(), width = 620, height = 235, showNull = false }) {
  // highlights: { nodeId: 'success'|'info'|'warning'|'danger'|'purple'|'secondary' }
  const COLOR_MAP = {
    success: { fill:'#1A3A2A', stroke:'#4EC9B0', text:'#4EC9B0' },
    info:    { fill:'#1A2A3A', stroke:'#81B4EA', text:'#9CDCFE' },
    warning: { fill:'#3A2A1A', stroke:'#CE9178', text:'#CE9178' },
    danger:  { fill:'#3A1A1A', stroke:'#F44747', text:'#F44747' },
    purple:  { fill:'#2A1A3A', stroke:'#C586C0', text:'#C586C0' },
    secondary:{ fill:'#1A1E2E', stroke:'#3D4460', text:'#7A8599' },
    default: { fill:'#131722', stroke:'#1E2233', text:'#6A7490' },
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow:'visible' }}>
      {/* Edges */}
      {EDGES.map(([a,b]) => {
        const [ax,ay] = NP[a], [bx,by] = NP[b];
        const isDim = dimmed.has(a) || dimmed.has(b);
        return (
          <line key={`${a}-${b}`} x1={ax} y1={ay} x2={bx} y2={by}
            stroke={isDim ? '#1A1E2E' : '#2A3050'} strokeWidth="1.5" />
        );
      })}
      {/* Nodes */}
      {Object.keys(NP).map(id => {
        const nid = +id;
        const [x,y] = NP[nid];
        const c = COLOR_MAP[highlights[nid]] || COLOR_MAP.default;
        const dim = dimmed.has(nid);
        const lbl = labels[nid];
        return (
          <g key={id} style={{ opacity: dim ? 0.3 : 1 }}>
            <circle cx={x} cy={y} r="22" fill={c.fill} stroke={c.stroke} strokeWidth={highlights[nid] ? 2 : 1} />
            <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fill={c.text}
              fontSize="13" fontFamily="monospace" fontWeight={highlights[nid]?700:500}>
              {TREE[nid].val}
            </text>
            {lbl !== undefined && (
              <text x={x} y={y+34} textAnchor="middle" fill={c.stroke} fontSize="10" fontFamily="monospace" fontWeight="700">
                {lbl}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — DFS TRAVERSAL STEP-THROUGH
   Three modes: Inorder / Preorder / Postorder
══════════════════════════════════════════════════════ */
function TraversalViz() {
  const [mode, setMode] = useState('inorder');
  const [step, setStep] = useState(0);
  const steps = TRAV[mode];
  const s = steps[Math.min(step, steps.length - 1)];

  const changeMode = (m) => { setMode(m); setStep(0); };

  const highlights = {};
  if (s.cur) highlights[s.cur] = s.act === 'visit' ? 'success' : 'info';
  (s.stack || []).forEach(id => { if (!highlights[id]) highlights[id] = 'secondary'; });

  const ACT_CLR = { visit:'success', arrive:'info', goRight:'warning', done:'success', init:null };

  return (
    <VizBox>
      <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
        {[['inorder','Inorder (L→R→Root→Right)'],['preorder','Preorder (Root→L→R)'],['postorder','Postorder (L→R→Root)']].map(([m,l]) => (
          <button key={m} onClick={()=>changeMode(m)} style={{ padding:'4px 11px', border:'1px solid', borderColor:mode===m?'var(--color-border-info)':'var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:mode===m?'var(--color-background-info)':'transparent', color:mode===m?'var(--color-text-info)':'var(--color-text-secondary)', cursor:'pointer', fontSize:12 }}>{l}</button>
        ))}
      </div>

      <div style={{ marginBottom:12, padding:'6px 10px', background:'var(--color-background-secondary)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.6 }}>
        {s.desc}
      </div>

      <div style={{ display:'flex', gap:16, alignItems:'flex-start', flexWrap:'wrap' }}>
        {/* Tree */}
        <div style={{ flex:1, minWidth:260 }}>
          <TreeSVG highlights={highlights} width={620} height={235} />
        </div>
      </div>

      {/* Call stack + output */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14, marginTop:8 }}>
        <div>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:5, letterSpacing:'0.06em' }}>CALL STACK</div>
          <div style={{ display:'flex', gap:4, flexWrap:'wrap', minHeight:36 }}>
            {(s.stack||[]).length === 0
              ? <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', border:'1px dashed var(--color-border-tertiary)', padding:'4px 12px', borderRadius:6 }}>empty</span>
              : [...(s.stack||[])].reverse().map((id,i) => (
                <div key={id} style={{ padding:'4px 10px', borderRadius:5, border:`1px solid ${i===0?'var(--color-border-info)':'var(--color-border-secondary)'}`, background:i===0?'var(--color-background-info)':'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:12, fontWeight:i===0?700:400, color:i===0?'var(--color-text-info)':'var(--color-text-secondary)' }}>
                  {TREE[id].val}{i===0&&<span style={{opacity:0.6,fontSize:9,marginLeft:3}}>← top</span>}
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:5, letterSpacing:'0.06em' }}>OUTPUT</div>
          <div style={{ display:'flex', gap:4, flexWrap:'wrap', minHeight:36 }}>
            {(s.output||[]).length === 0
              ? <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)' }}>…</span>
              : (s.output||[]).map((v,i) => (
                <div key={i} style={{ padding:'4px 10px', borderRadius:5, border:`1px solid ${i===(s.output||[]).length-1&&s.act==='visit'?'var(--color-border-success)':'var(--color-border-secondary)'}`, background:i===(s.output||[]).length-1&&s.act==='visit'?'var(--color-background-success)':'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:i===(s.output||[]).length-1&&s.act==='visit'?'var(--color-text-success)':'var(--color-text-secondary)', transition:'all 0.15s' }}>
                  {v}
                </div>
              ))
            }
          </div>
        </div>
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

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — HEIGHT + DIAMETER (post-order bottom-up)
   Shows height value appearing at each node, diameter tracked
══════════════════════════════════════════════════════ */
function HeightDiameterViz() {
  const [step, setStep] = useState(0);
  const s = HD_STEPS[Math.min(step, HD_STEPS.length - 1)];

  const highlights = {};
  if (s.cur) highlights[s.cur] = s.action === 'newMax' ? 'warning' : s.action === 'leaf' ? 'secondary' : 'info';
  if (s.action === 'done') Object.keys(TREE).forEach(id => { highlights[+id] = 'success'; });

  // Height labels at each computed node
  const labels = {};
  Object.entries(s.H).forEach(([id, h]) => { labels[+id] = `h=${h}`; });

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'6px 10px', background:'var(--color-background-secondary)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.6 }}>
        {s.desc}
      </div>

      <div style={{ display:'flex', gap:12, alignItems:'flex-start', flexWrap:'wrap', marginBottom:12 }}>
        <div style={{ flex:1, minWidth:260 }}>
          <TreeSVG highlights={highlights} labels={labels} width={620} height={260} />
        </div>
      </div>

      {/* Diameter tracker */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
        <div style={{ padding:'10px 14px', borderRadius:'var(--border-radius-md)', background:s.action==='newMax'?'var(--color-background-warning)':'var(--color-background-secondary)', border:`1px solid ${s.action==='newMax'?'var(--color-border-warning)':'var(--color-border-secondary)'}`, transition:'all 0.2s' }}>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:s.action==='newMax'?'var(--color-text-warning)':'var(--color-text-tertiary)', marginBottom:3 }}>Diameter at current node</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:22, fontWeight:700, color:s.action==='newMax'?'var(--color-text-warning)':'var(--color-text-secondary)' }}>
            {s.dia !== undefined ? `${s.lh} + ${s.rh} = ${s.dia}` : '—'}
          </div>
        </div>
        <div style={{ padding:'10px 14px', borderRadius:'var(--border-radius-md)', background:s.maxDia>0?'var(--color-background-success)':'var(--color-background-secondary)', border:`1px solid ${s.maxDia>0?'var(--color-border-success)':'var(--color-border-secondary)'}` }}>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:s.maxDia>0?'var(--color-text-success)':'var(--color-text-tertiary)', marginBottom:3 }}>Max Diameter (so far)</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:22, fontWeight:700, color:s.maxDia>0?'var(--color-text-success)':'var(--color-text-secondary)' }}>{s.maxDia}</div>
        </div>
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(HD_STEPS.length-1,step+1)),step===HD_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{HD_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — LCA ALGORITHM STEP-THROUGH
   Pick node pair → watch recursive search find LCA
══════════════════════════════════════════════════════ */
function LCAViz() {
  const [pair, setPair] = useState('4,5');
  const [step, setStep] = useState(0);
  const steps = LCA_DATA[pair];
  const s = steps[Math.min(step, steps.length - 1)];

  const changePair = (p) => { setPair(p); setStep(0); };

  const highlights = {};
  // Mark the two target nodes
  const [na, nb] = pair.split(',').map(Number);
  highlights[na] = 'info';
  highlights[nb] = 'info';
  // Active call chain
  (s.active||[]).forEach(id => { if (!highlights[id]) highlights[id] = 'secondary'; });
  // Current node
  if (s.cur && !highlights[s.cur]) highlights[s.cur] = 'warning';
  // LCA found
  if (s.lca) highlights[s.lca] = 'purple';
  if (s.action === 'found') highlights[s.cur] = 'success';

  const PAIRS = [
    ['4,5','LCA(4,5) = ?'],
    ['4,6','LCA(4,6) = ?'],
    ['2,7','LCA(2,7) = ?'],
  ];

  return (
    <VizBox>
      <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
        {PAIRS.map(([p,l]) => (
          <button key={p} onClick={()=>changePair(p)} style={{ padding:'4px 11px', border:'1px solid', borderColor:pair===p?'var(--color-border-info)':'var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:pair===p?'var(--color-background-info)':'transparent', color:pair===p?'var(--color-text-info)':'var(--color-text-secondary)', cursor:'pointer', fontSize:12 }}>{l}</button>
        ))}
      </div>

      <div style={{ marginBottom:12, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        {s.action !== 'init' && <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:700, background:`var(--color-background-${s.action==='found'?'success':s.action==='lca'?'purple':s.action==='done'?'success':'info'})`, color:`var(--color-text-${s.action==='found'?'success':s.action==='lca'?'purple':s.action==='done'?'success':'info'})`, border:`1px solid var(--color-border-${s.action==='found'?'success':s.action==='lca'?'purple':s.action==='done'?'success':'info'})` }}>
          {s.action==='found'?'Target found!':s.action==='lca'?'LCA Identified!':s.action==='done'?'Complete':s.action==='explore'?'Explore':'Propagate'}
        </span>}
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.6 }}>{s.desc}</span>
      </div>

      <div style={{ marginBottom:12 }}>
        <TreeSVG highlights={highlights} width={620} height={235} />
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:14, fontSize:11 }}>
        {[{c:'info',l:`Targets (${na}, ${nb})`},{c:'warning',l:'Current call'},{c:'secondary',l:'On call stack'},{c:'success',l:'Target found'},{c:'purple',l:'LCA result'}].map(({c,l})=>(
          <div key={c} style={{display:'flex',alignItems:'center',gap:5}}>
            <div style={{width:9,height:9,borderRadius:'50%',background:`var(--color-background-${c})`,border:`1px solid var(--color-border-${c})`}}/>
            <span style={{color:'var(--color-text-secondary)'}}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(steps.length-1,step+1)),step===steps.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{steps.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(steps.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* PROBLEM CARD */
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
   SECTION 1 — FUNDAMENTALS
══════════════════════════════════════════════════════ */
function SectionFundamentals() {
  return (
    <div>
      <Note color="info" icon="ti-binary-tree">
        Trees are <strong>non-linear, hierarchical</strong> data structures. Unlike arrays and linked lists (linear), a tree node can have multiple successors — enabling O(log n) operations on organized data and natural expression of hierarchical relationships.
      </Note>

      <H2>Core Terminology</H2>
      <Grid cols={2}>
        <Card title="Structural Terms" color="info">
          <div style={{ fontFamily:'var(--font-mono)', fontSize:12, lineHeight:2 }}>
            <div><strong style={{color:'var(--color-text-info)'}}>Root:</strong> top node, no parent</div>
            <div><strong style={{color:'var(--color-text-info)'}}>Leaf:</strong> node with 0 children (degree=0)</div>
            <div><strong style={{color:'var(--color-text-info)'}}>Edge:</strong> link between parent and child</div>
            <div><strong style={{color:'var(--color-text-info)'}}>Siblings:</strong> nodes sharing the same parent</div>
            <div><strong style={{color:'var(--color-text-info)'}}>Subtree:</strong> node + all its descendants</div>
          </div>
        </Card>
        <Card title="Measurement Terms" color="success">
          <div style={{ fontFamily:'var(--font-mono)', fontSize:12, lineHeight:2 }}>
            <div><strong style={{color:'var(--color-text-success)'}}>Height:</strong> edges from node to deepest leaf</div>
            <div><strong style={{color:'var(--color-text-success)'}}>Depth:</strong> edges from root to this node</div>
            <div><strong style={{color:'var(--color-text-success)'}}>Degree:</strong> number of direct children</div>
            <div><strong style={{color:'var(--color-text-success)'}}>Level:</strong> depth + 1 (root = level 1)</div>
            <div><strong style={{color:'var(--color-text-success)'}}>Width:</strong> max nodes at any single level</div>
          </div>
        </Card>
      </Grid>

      <H2>The Sample Tree Used in All Visualizations</H2>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:8 }}>
        <TreeSVG width={620} height={235} />
      </div>
      <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', fontFamily:'var(--font-mono)', fontSize:12, marginBottom:16 }}>
        {[['Inorder','4→2→5→1→6→3→7'],['Preorder','1→2→4→5→3→6→7'],['Postorder','4→5→2→6→7→3→1'],['BFS','1→2→3→4→5→6→7']].map(([l,v])=>(
          <div key={l} style={{ padding:'4px 12px', borderRadius:6, background:'var(--color-background-secondary)', border:'0.5px solid var(--color-border-secondary)', color:'var(--color-text-secondary)' }}>
            <span style={{ color:'var(--color-text-info)', fontWeight:700 }}>{l}: </span>{v}
          </div>
        ))}
      </div>

      <H2>Node Definition & Input Methods</H2>
      <Code>{{cpp:`// Binary Tree Node
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// ── Level-Order Input (BFS) — queue-based ─────────────
// Input format: 1 2 3 4 5 N N (N = NULL)
TreeNode* buildTree(vector<string>& vals) {
    if (vals.empty() || vals[0] == "N") return nullptr;
    TreeNode* root = new TreeNode(stoi(vals[0]));
    queue<TreeNode*> q; q.push(root);
    int i = 1;
    while (!q.empty() && i < vals.size()) {
        TreeNode* cur = q.front(); q.pop();
        if (vals[i] != "N") { cur->left  = new TreeNode(stoi(vals[i])); q.push(cur->left); }  i++;
        if (i<vals.size()&&vals[i]!="N"){ cur->right = new TreeNode(stoi(vals[i])); q.push(cur->right); } i++;
    }
    return root;
}`, python:`class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val=val; self.left=left; self.right=right

# Level-order build from list (None = null)
def build_tree(vals):
    if not vals or vals[0] is None: return None
    root = TreeNode(vals[0])
    from collections import deque
    q = deque([root]); i = 1
    while q and i < len(vals):
        cur = q.popleft()
        if i < len(vals) and vals[i] is not None:
            cur.left = TreeNode(vals[i]); q.append(cur.left)
        i += 1
        if i < len(vals) and vals[i] is not None:
            cur.right = TreeNode(vals[i]); q.append(cur.right)
        i += 1
    return root`}}</Code>

      <QA q="Why can't a unique binary tree be reconstructed from just inorder + preorder lists alone (without a second traversal)?" a="Actually, inorder + preorder IS sufficient to uniquely reconstruct any binary tree with distinct values. What cannot work with just ONE traversal type: preorder alone or postorder alone — these are ambiguous (e.g., preorder [1,2] could be root=1,left=2 OR root=1,right=2). Also, preorder + postorder of a FULL binary tree is insufficient — knowing root + what's left vs right requires inorder to identify the split point." />
      <QA q="What is the difference between height and depth of a node?" a="Depth is measured from the root DOWN to the node (root depth = 0). Height is measured from the node DOWN to the farthest leaf (leaf height = 0, or 1 if counting the node itself). The height of the TREE = height of the root. A node's level = its depth + 1. Many problems mix these — always confirm the definition: is height counting edges or nodes?" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — TRAVERSALS
══════════════════════════════════════════════════════ */
function SectionTraversals() {
  return (
    <div>
      <Note color="success" icon="ti-git-branch">
        Every tree algorithm is built on traversal. The four fundamental orders: Inorder (L→Root→R), Preorder (Root→L→R), Postorder (L→R→Root), and Level-order (BFS). Inorder of a BST gives sorted output — this property drives BST algorithms.
      </Note>

      <H2>DFS Traversal — Interactive Step-Through</H2>
      <P>Watch exactly how the recursive call stack builds up and unwinds. Switch between all three orders. The call stack panel shows which ancestor calls are active at each moment.</P>
      <TraversalViz />

      <H2>All Three DFS Traversals</H2>
      <Code>{{cpp:`// Recursive — all three
void inorder  (TreeNode* r){ if(!r)return; inorder(r->left);  cout<<r->val<<" "; inorder(r->right); }
void preorder (TreeNode* r){ if(!r)return; cout<<r->val<<" "; preorder(r->left);  preorder(r->right); }
void postorder(TreeNode* r){ if(!r)return; postorder(r->left); postorder(r->right); cout<<r->val<<" "; }

// Iterative Inorder (LC 94) — explicit stack
vector<int> inorderIter(TreeNode* root) {
    stack<TreeNode*> st; TreeNode* cur = root; vector<int> res;
    while (cur || !st.empty()) {
        while (cur) { st.push(cur); cur = cur->left; }  // go as left as possible
        cur = st.top(); st.pop();
        res.push_back(cur->val);          // VISIT on the way back up
        cur = cur->right;                  // then go right
    }
    return res;
}`, python:`def inorder  (r,res=None): res=res or[]; (inorder(r.left,res),res.append(r.val),inorder(r.right,res)) if r else None; return res
def preorder (r,res=None): res=res or[]; (res.append(r.val),preorder(r.left,res),preorder(r.right,res)) if r else None; return res
def postorder(r,res=None): res=res or[]; (postorder(r.left,res),postorder(r.right,res),res.append(r.val)) if r else None; return res

# Iterative inorder:
def inorder_iter(root):
    stack=[]; cur=root; res=[]
    while cur or stack:
        while cur: stack.append(cur); cur=cur.left
        cur=stack.pop(); res.append(cur.val); cur=cur.right
    return res`}}</Code>

      <H2>BFS Level-Order Traversal (LC 102)</H2>
      <P>Use a queue. Two clean approaches: (1) Null marker — append null after each level to detect level boundaries. (2) Queue size snapshot — record queue size at start of each level, process exactly that many nodes.</P>
      <Code>{{cpp:`// Method 2: Queue size snapshot — cleaner, no sentinel needed
vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    vector<vector<int>> res;
    queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        int levelSize = q.size();       // snapshot: how many nodes in this level
        vector<int> level;
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}
// [[1],[2,3],[4,5,6,7]]`, python:`from collections import deque
def level_order(root):
    if not root: return []
    res=[]; q=deque([root])
    while q:
        level=[]; size=len(q)   # snapshot
        for _ in range(size):
            node=q.popleft(); level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`}}</Code>

      <H2>Print Nodes at Distance K from Root</H2>
      <Code>{{cpp:`void printAtDistance(TreeNode* root, int k) {
    if (!root) return;
    if (k == 0) { cout << root->val << " "; return; }
    printAtDistance(root->left,  k - 1);
    printAtDistance(root->right, k - 1);
}
// k=2 on sample tree → prints: 4 5 6 7`, python:`def print_at_distance(root, k):
    if not root: return
    if k == 0: print(root.val, end=' '); return
    print_at_distance(root.left,  k-1)
    print_at_distance(root.right, k-1)`}}</Code>

      <QA q="What is the space complexity of DFS recursive traversal and why?" a="O(h) where h = height of the tree. Each recursive call adds one frame to the call stack, and the maximum depth of recursion equals the height. For a balanced tree h = O(log n); for a degenerate (chain) tree h = O(n). The iterative inorder uses an explicit stack of the same size, so the space complexity is the same — O(h)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — PROPERTIES & METRICS
══════════════════════════════════════════════════════ */
function SectionProperties() {
  return (
    <div>
      <H2>Height, Size, Diameter — One-Pass Computation</H2>
      <HeightDiameterViz />
      <Code>{{cpp:`// Height — O(n)
int height(TreeNode* r) {
    if (!r) return 0;
    return max(height(r->left), height(r->right)) + 1;
}

// Size — O(n)
int size(TreeNode* r) {
    if (!r) return 0;
    return 1 + size(r->left) + size(r->right);
}

// Diameter — O(n) using modified height
int maxDia = 0;
int diameterHelper(TreeNode* r) {
    if (!r) return 0;
    int lh = diameterHelper(r->left);
    int rh = diameterHelper(r->right);
    maxDia  = max(maxDia, lh + rh);   // diameter through this node
    return max(lh, rh) + 1;           // height for parent's use
}
// Call: diameterHelper(root); then use maxDia`, python:`def height(r): return 0 if not r else max(height(r.left),height(r.right))+1

def size(r): return 0 if not r else 1+size(r.left)+size(r.right)

def diameter(root):
    max_d=[0]
    def h(r):
        if not r: return 0
        lh,rh=h(r.left),h(r.right)
        max_d[0]=max(max_d[0],lh+rh)
        return max(lh,rh)+1
    h(root); return max_d[0]`}}</Code>

      <H2>Balanced Binary Tree Check (LC 110)</H2>
      <P>Naive O(n²): call height() at every node. Optimized O(n): return -1 from height when subtree is unbalanced — this propagates failure upward without re-checking.</P>
      <Code>{{cpp:`// O(n) — single DFS pass, returns -1 on imbalance
int checkBalanced(TreeNode* r) {
    if (!r) return 0;
    int lh = checkBalanced(r->left);
    if (lh == -1) return -1;            // propagate failure
    int rh = checkBalanced(r->right);
    if (rh == -1) return -1;
    if (abs(lh - rh) > 1) return -1;   // this node is unbalanced
    return max(lh, rh) + 1;            // return valid height
}
bool isBalanced(TreeNode* root) { return checkBalanced(root) != -1; }`, python:`def is_balanced(root):
    def check(r):
        if not r: return 0
        lh=check(r.left)
        if lh==-1: return -1
        rh=check(r.right)
        if rh==-1 or abs(lh-rh)>1: return -1
        return max(lh,rh)+1
    return check(root) != -1`}}</Code>

      <H2>Left View &amp; Right View</H2>
      <Code>{{cpp:`// Left view: first node of each level
void leftView(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        int sz = q.size(); bool first = true;
        for (int i = 0; i < sz; i++) {
            TreeNode* n = q.front(); q.pop();
            if (first) { cout << n->val << " "; first = false; }  // first in level
            if (n->left)  q.push(n->left);
            if (n->right) q.push(n->right);
        }
    }
}
// Right view: print the LAST node per level (check i == sz-1)`, python:`from collections import deque
def left_view(root):
    if not root: return
    q=deque([root])
    while q:
        sz=len(q)
        for i in range(sz):
            n=q.popleft()
            if i==0: print(n.val,end=' ')  # first of level
            if n.left: q.append(n.left)
            if n.right: q.append(n.right)`}}</Code>

      <H2>Binary Tree to Doubly Linked List (Inorder)</H2>
      <P>Convert the tree in-place: left pointer becomes prev, right pointer becomes next. Inorder traversal — when visiting a node, connect it to the previously visited node (tail of the partial DLL).</P>
      <Code>{{cpp:`// In-place conversion using inorder traversal
TreeNode* prev = nullptr, *head = nullptr;
void convertToDLL(TreeNode* root) {
    if (!root) return;
    convertToDLL(root->left);          // process left subtree
    // current root connects to prev
    root->left = prev;                  // left = prev pointer
    if (prev) prev->right = root;       // prev's right = current
    else head = root;                   // first visited = head of DLL
    prev = root;                        // advance prev
    convertToDLL(root->right);          // process right subtree
}
// Inorder of tree [4,2,5,1,6,3,7] → DLL: 4↔2↔5↔1↔6↔3↔7`, python:`def convert_to_dll(root):
    prev=[None]; head=[None]
    def inorder(node):
        if not node: return
        inorder(node.left)
        node.left=prev[0]
        if prev[0]: prev[0].right=node
        else: head[0]=node
        prev[0]=node
        inorder(node.right)
    inorder(root); return head[0]`}}</Code>

      <QA q="Why does the O(n) balanced tree check return the height on success and -1 on failure, instead of a boolean?" a="Returning the height on success lets the parent node compute ITS OWN balance check in O(1) — it compares the two returned heights and checks if they differ by more than 1. If we returned only true/false, the parent would need to re-call height() separately (O(n) each), giving O(n²) total. The -1 sentinel encodes 'failure' in the same return type, letting the failure propagate up the recursion tree without extra overhead." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — RECONSTRUCTION & LCA
══════════════════════════════════════════════════════ */
function SectionReconstruction() {
  return (
    <div>
      <H2>Lowest Common Ancestor — Interactive</H2>
      <P>The elegant O(n) DFS: if a node is one of the targets, return it immediately. Otherwise, search both subtrees. If both return non-null, the current node is the LCA. If only one returns non-null, propagate it up.</P>
      <LCAViz />
      <Code>{{cpp:`TreeNode* lca(TreeNode* root, int n1, int n2) {
    if (!root) return nullptr;
    if (root->val == n1 || root->val == n2) return root;  // found a target

    TreeNode* left  = lca(root->left,  n1, n2);
    TreeNode* right = lca(root->right, n1, n2);

    if (left && right) return root;   // n1 in left subtree, n2 in right → root IS LCA
    return left ? left : right;        // one subtree has both targets → propagate
}
// lca(root, 4, 5) → node(2)  |  lca(root, 4, 6) → node(1)`, python:`def lca(root, n1, n2):
    if not root: return None
    if root.val in (n1, n2): return root
    L = lca(root.left,  n1, n2)
    R = lca(root.right, n1, n2)
    if L and R: return root   # split point — root is LCA
    return L or R`}}</Code>
      <Note color="info" icon="ti-math">
        <strong>When is this algorithm correct?</strong> It assumes both n1 and n2 <em>exist</em> in the tree. If a node is returned after searching only one subtree, it means either: (a) both targets are in that subtree (one will be an ancestor of the other), or (b) only that target was found (the other is absent). For the "both must exist" guarantee, the algorithm is always correct.
      </Note>

      <H2>Reconstruct from Inorder + Preorder (LC 105)</H2>
      <P>Preorder gives the root first. Find the root in Inorder — everything left is the left subtree, everything right is the right subtree. Recurse. Use a hash map for O(1) lookups instead of O(n) linear search → total O(n).</P>
      <Code>{{cpp:`// O(n) with hash map
TreeNode* buildTree(vector<int>& pre, vector<int>& ino) {
    unordered_map<int,int> mp;
    for (int i=0; i<ino.size(); i++) mp[ino[i]] = i;  // value → index in inorder

    function<TreeNode*(int,int,int,int)> build = [&](int ps,int pe,int is,int ie) -> TreeNode* {
        if (ps > pe) return nullptr;
        int rootVal = pre[ps];
        int rootIdx = mp[rootVal];              // where root sits in inorder
        int leftSize = rootIdx - is;             // size of left subtree
        TreeNode* r  = new TreeNode(rootVal);
        r->left  = build(ps+1, ps+leftSize, is, rootIdx-1);
        r->right = build(ps+leftSize+1, pe, rootIdx+1, ie);
        return r;
    };
    return build(0, pre.size()-1, 0, ino.size()-1);
}
// pre=[3,9,20,15,7], ino=[9,3,15,20,7] → builds the tree uniquely`, python:`def build_from_pre_ino(preorder, inorder):
    idx={v:i for i,v in enumerate(inorder)}
    def build(ps,pe,is_,ie):
        if ps>pe: return None
        root=TreeNode(preorder[ps])
        ri=idx[preorder[ps]]; ls=ri-is_
        root.left =build(ps+1,ps+ls,is_,ri-1)
        root.right=build(ps+ls+1,pe,ri+1,ie)
        return root
    return build(0,len(preorder)-1,0,len(inorder)-1)`}}</Code>

      <H2>Reconstruct from Inorder + Postorder (LC 106)</H2>
      <P>Postorder gives the root <em>last</em>. Process postorder from right to left — and recurse into RIGHT subtree first (since we're scanning postorder backwards).</P>
      <Code>{{cpp:`TreeNode* buildFromPost(vector<int>& ino, vector<int>& post) {
    unordered_map<int,int> mp;
    for (int i=0; i<ino.size(); i++) mp[ino[i]]=i;
    int pi = post.size()-1;  // pointer scans post[] from right
    function<TreeNode*(int,int)> build=[&](int lo,int hi)->TreeNode*{
        if (lo>hi) return nullptr;
        int val=post[pi--];  // pick from end
        TreeNode* r=new TreeNode(val);
        int mid=mp[val];
        r->right=build(mid+1,hi);  // RIGHT FIRST (post scanned backwards)
        r->left =build(lo,mid-1);
        return r;
    };
    return build(0,ino.size()-1);
}`, python:`def build_from_post_ino(inorder, postorder):
    idx={v:i for i,v in enumerate(inorder)}
    pi=[len(postorder)-1]
    def build(lo,hi):
        if lo>hi: return None
        val=postorder[pi[0]]; pi[0]-=1
        r=TreeNode(val); mid=idx[val]
        r.right=build(mid+1,hi)  # right first!
        r.left =build(lo,mid-1)
        return r
    return build(0,len(inorder)-1)`}}</Code>

      <QA q="Why must we recurse into the right subtree first when using inorder + postorder?" a="In postorder, elements are arranged [left-subtree | right-subtree | root]. Reading postorder backwards gives [root | right-subtree | left-subtree]. After picking the root (rightmost element), the next rightmost elements belong to the RIGHT subtree. So when scanning postorder backwards, we must recurse into the right subtree first to consume its elements in the correct order before processing the left subtree." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — ADVANCED ALGORITHMS
══════════════════════════════════════════════════════ */
function SectionAdvanced() {
  return (
    <div>
      <H2>Spiral / Zigzag Level-Order Traversal (LC 103)</H2>
      <P>Two-stack approach: S1 processes left-to-right levels (push children right then left); S2 processes right-to-left levels (push children left then right). Alternate between stacks each level.</P>
      <Code>{{cpp:`vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    if (!root) return {};
    vector<vector<int>> res;
    stack<TreeNode*> s1, s2; s1.push(root); bool ltr = true;
    while (!s1.empty() || !s2.empty()) {
        vector<int> level;
        if (ltr) {
            while (!s1.empty()) {
                TreeNode* n = s1.top(); s1.pop(); level.push_back(n->val);
                if (n->left)  s2.push(n->left);   // push left first for R-to-L next level
                if (n->right) s2.push(n->right);
            }
        } else {
            while (!s2.empty()) {
                TreeNode* n = s2.top(); s2.pop(); level.push_back(n->val);
                if (n->right) s1.push(n->right);  // push right first for L-to-R next level
                if (n->left)  s1.push(n->left);
            }
        }
        res.push_back(level); ltr = !ltr;
    }
    return res;
}
// [[1],[3,2],[4,5,6,7]]  (level 1: L-to-R, level 2: R-to-L, level 3: L-to-R)`, python:`from collections import deque
def zigzag_level_order(root):
    if not root: return []
    res=[]; q=deque([root]); ltr=True
    while q:
        level=[]; size=len(q)
        for _ in range(size):
            n=q.popleft(); level.append(n.val)
            if n.left: q.append(n.left)
            if n.right: q.append(n.right)
        res.append(level if ltr else level[::-1]); ltr=not ltr
    return res`}}</Code>

      <H2>Count Nodes in a Complete Binary Tree — O(log² n)</H2>
      <P>In a complete binary tree, if left height == right height, the left subtree is a perfect binary tree: count = <KaTeXMath>{'2^{lh} - 1 + 1 + \\text{rightCount}'}</KaTeXMath>. Otherwise, the right subtree at the second-to-last level is a perfect tree. Recursion only on one side per level.</P>
      <Code>{{cpp:`int countNodes(TreeNode* root) {
    if (!root) return 0;
    int lh=0, rh=0;
    TreeNode* l=root, *r=root;
    while (l) { lh++; l=l->left; }   // leftmost height
    while (r) { rh++; r=r->right; }  // rightmost height
    if (lh == rh) return (1<<lh)-1;  // perfect binary tree: 2^h - 1 nodes
    return 1 + countNodes(root->left) + countNodes(root->right);
}
// T(n) = T(n/2) + O(log n) → O(log² n)`, python:`def count_nodes(root):
    if not root: return 0
    lh=rh=0; l=r=root
    while l: lh+=1; l=l.left
    while r: rh+=1; r=r.right
    if lh==rh: return (1<<lh)-1   # perfect BT
    return 1+count_nodes(root.left)+count_nodes(root.right)`}}</Code>

      <H2>Serialize and Deserialize a Binary Tree (LC 297)</H2>
      <P>Convert the tree to a string for storage/transmission using preorder traversal. NULL pointers are encoded as a sentinel (e.g., "N"). Deserialize by reading the string back in the same preorder sequence.</P>
      <Code>{{cpp:`// Serialize: preorder with "N" for null
string serialize(TreeNode* root) {
    if (!root) return "N,";
    return to_string(root->val)+","+serialize(root->left)+serialize(root->right);
}

// Deserialize: reconstruct from serialized string
TreeNode* deserialize(string data) {
    queue<string> q;
    stringstream ss(data); string token;
    while (getline(ss, token, ',')) q.push(token);

    function<TreeNode*()> build = [&]() -> TreeNode* {
        string val = q.front(); q.pop();
        if (val == "N") return nullptr;
        TreeNode* r = new TreeNode(stoi(val));
        r->left  = build();
        r->right = build();
        return r;
    };
    return build();
}
// Tree [1,2,3,N,N,4,5] → "1,2,N,N,3,4,N,N,5,N,N,"`, python:`class Codec:
    def serialize(self, root):
        if not root: return 'N,'
        return str(root.val)+','+self.serialize(root.left)+self.serialize(root.right)
    def deserialize(self, data):
        tokens=iter(data.split(','))
        def build():
            v=next(tokens)
            if v=='N': return None
            r=TreeNode(int(v)); r.left=build(); r.right=build(); return r
        return build()`}}</Code>

      <QA q="Why does the O(log² n) algorithm work for counting nodes in a complete binary tree?" a="A complete binary tree has all levels full except possibly the last, which is filled left-to-right. The key insight: if the leftmost path and rightmost path have the same height, the tree is PERFECT (all nodes present) and count = 2^h - 1. Otherwise, exactly one subtree (left or right) is a perfect tree and can be counted in O(1). We recurse only on the non-perfect subtree. At each level we do O(log n) work (measuring heights). Depth = O(log n) levels → T(n) = O(log² n)." />
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
        6 tree problems spanning traversal, construction, and path algorithms — all high-frequency in FAANG and IIT OAs.
      </Note>

      <ProblemCard num={1} title="Binary Tree Level Order Traversal" difficulty="LC Medium" tags={["LC 102","BFS"]}
        statement="Given the root of a binary tree, return the level order traversal of its values — each level as a separate subarray."
        constraints={["0 ≤ nodes ≤ 2000","-1000 ≤ val ≤ 1000"]}
        examples={[{input:"[3,9,20,null,null,15,7]",output:"[[3],[9,20],[15,7]]"},{input:"[1]",output:"[[1]]"}]}
        approach="BFS with queue. At each iteration, take a 'snapshot' of the current queue size — that's exactly how many nodes are in the current level. Process exactly that many nodes, then start a new level array. O(n) time, O(n) space (queue holds at most n/2 nodes at the last level)."
        code={{cpp:`vector<vector<int>> levelOrder(TreeNode* root){
    if(!root)return{};
    vector<vector<int>> res; queue<TreeNode*> q; q.push(root);
    while(!q.empty()){
        int sz=q.size(); vector<int> lv;
        for(int i=0;i<sz;i++){
            auto n=q.front();q.pop(); lv.push_back(n->val);
            if(n->left)q.push(n->left); if(n->right)q.push(n->right);
        }
        res.push_back(lv);
    }
    return res;
}`,python:`from collections import deque
def level_order(root):
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

      <ProblemCard num={2} title="Maximum Depth of Binary Tree" difficulty="OA Easy" tags={["LC 104","DFS"]}
        statement="Given the root of a binary tree, return its maximum depth — the number of nodes on the longest path from root to leaf."
        constraints={["0 ≤ nodes ≤ 10⁴","-100 ≤ val ≤ 100"]}
        examples={[{input:"[3,9,20,null,null,15,7]",output:"3"},{input:"[1,null,2]",output:"2"}]}
        approach="Recursive: height(node) = 0 if null, else max(height(left), height(right)) + 1. The +1 counts this node itself. Iterative BFS: count the number of levels (level-order traversal). O(n) time, O(h) space."
        code={{cpp:`int maxDepth(TreeNode* r){return !r?0:max(maxDepth(r->left),maxDepth(r->right))+1;}`,python:`def max_depth(r): return 0 if not r else max(max_depth(r.left),max_depth(r.right))+1`}}
      />

      <ProblemCard num={3} title="Diameter of Binary Tree" difficulty="LC Medium" tags={["LC 543","Modified Height"]}
        statement="Given a binary tree, return the <strong>diameter</strong> — the length (in edges) of the longest path between any two nodes. The path may not pass through the root."
        constraints={["1 ≤ nodes ≤ 10⁴","-100 ≤ val ≤ 100"]}
        examples={[{input:"[1,2,3,4,5]",output:"3",note:"Path: 4→2→1→3 or 5→2→1→3"},{input:"[1,2]",output:"1"}]}
        approach="Modify the height function to track diameter. At each node: diameter through here = left_height + right_height. Update global max. Return max(lh,rh)+1 as height for parent. Single O(n) DFS — no separate height calls."
        code={{cpp:`int diameterOfBinaryTree(TreeNode* root){
    int mx=0;
    function<int(TreeNode*)> h=[&](TreeNode* r)->int{
        if(!r)return 0;
        int l=h(r->left),ri=h(r->right);
        mx=max(mx,l+ri); return max(l,ri)+1;
    };
    h(root); return mx;
}`,python:`def diameter(root):
    mx=[0]
    def h(r):
        if not r:return 0
        l,ri=h(r.left),h(r.right)
        mx[0]=max(mx[0],l+ri); return max(l,ri)+1
    h(root); return mx[0]`}}
      />

      <ProblemCard num={4} title="Lowest Common Ancestor of Binary Tree" difficulty="LC Medium" tags={["LC 236","DFS"]}
        statement="Given a binary tree and two nodes <code>p</code> and <code>q</code>, return their <strong>lowest common ancestor</strong> — the deepest node that is an ancestor of both."
        constraints={["2 ≤ nodes ≤ 10⁵","All values unique","p ≠ q","Both p and q exist in tree"]}
        examples={[{input:"p=5, q=1",output:"3",note:"LCA of 5 and 1 is the root 3"},{input:"p=5, q=4",output:"5",note:"5 is ancestor of 4, so LCA=5"}]}
        approach="Single DFS: return a node if it's p or q. After exploring both subtrees, if both return non-null → current node is LCA. Otherwise propagate whichever subtree returned non-null. O(n) time, O(h) space."
        code={{cpp:`TreeNode* lowestCommonAncestor(TreeNode* r,TreeNode* p,TreeNode* q){
    if(!r||r==p||r==q)return r;
    auto L=lowestCommonAncestor(r->left,p,q);
    auto R=lowestCommonAncestor(r->right,p,q);
    return(L&&R)?r:(L?L:R);
}`,python:`def lca(root,p,q):
    if not root or root is p or root is q:return root
    L=lca(root.left,p,q); R=lca(root.right,p,q)
    return root if(L and R)else(L or R)`}}
      />

      <ProblemCard num={5} title="Construct Binary Tree from Preorder and Inorder" difficulty="LC Medium" tags={["LC 105","Tree Construction"]}
        statement="Given two integer arrays <code>preorder</code> and <code>inorder</code>, construct and return the binary tree. All values are unique."
        constraints={["1 ≤ n ≤ 3000","-3000 ≤ values ≤ 3000","preorder and inorder are permutations of the same values"]}
        examples={[{input:"preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]",output:"Tree: [3,9,20,null,null,15,7]"}]}
        approach="preorder[0] = root. Find root in inorder → left subtree has (rootIdx - inStart) nodes. Recurse: left = build(preorder[1..leftSize], inorder[inStart..rootIdx-1]), right = build(preorder[leftSize+1..], inorder[rootIdx+1..inEnd]). Use hash map for O(1) inorder lookup → O(n) total vs O(n²) without it."
        code={{cpp:`TreeNode* buildTree(vector<int>& pre,vector<int>& ino){
    unordered_map<int,int> mp;
    for(int i=0;i<ino.size();i++)mp[ino[i]]=i;
    function<TreeNode*(int,int,int,int)> b=[&](int ps,int pe,int is,int ie)->TreeNode*{
        if(ps>pe)return nullptr;
        int rv=pre[ps],ri=mp[rv],ls=ri-is;
        auto r=new TreeNode(rv);
        r->left=b(ps+1,ps+ls,is,ri-1);
        r->right=b(ps+ls+1,pe,ri+1,ie);
        return r;
    };
    return b(0,pre.size()-1,0,ino.size()-1);
}`,python:`def build_tree(preorder,inorder):
    idx={v:i for i,v in enumerate(inorder)}
    def b(ps,pe,is_,ie):
        if ps>pe:return None
        rv=preorder[ps];ri=idx[rv];ls=ri-is_
        r=TreeNode(rv)
        r.left=b(ps+1,ps+ls,is_,ri-1)
        r.right=b(ps+ls+1,pe,ri+1,ie)
        return r
    return b(0,len(preorder)-1,0,len(inorder)-1)`}}
      />

      <ProblemCard num={6} title="Path Sum II" difficulty="LC Medium" tags={["LC 113","DFS + Backtracking"]}
        statement="Given the root of a binary tree and an integer <code>targetSum</code>, return all root-to-leaf paths where the sum of node values equals targetSum."
        constraints={["0 ≤ nodes ≤ 5000","-1000 ≤ val ≤ 1000","-1000 ≤ targetSum ≤ 1000"]}
        examples={[{input:"root=[5,4,8,11,null,13,4,7,2,null,null,5,1], target=22",output:"[[5,4,11,2],[5,8,4,5]]"}]}
        approach="DFS backtracking: at each node, add to current path and subtract from remaining. At a leaf, if remaining == 0, emit current path copy. On return, pop from path (backtrack). O(n×h) time where h = height (copying each valid path takes O(h))."
        code={{cpp:`void dfs(TreeNode* r,int rem,vector<int>& path,vector<vector<int>>& res){
    if(!r)return;
    path.push_back(r->val);
    if(!r->left&&!r->right&&rem==r->val){res.push_back(path);}
    else{dfs(r->left,rem-r->val,path,res);dfs(r->right,rem-r->val,path,res);}
    path.pop_back();
}
vector<vector<int>> pathSum(TreeNode* r,int t){
    vector<vector<int>>res;vector<int>path;dfs(r,t,path,res);return res;
}`,python:`def path_sum(root,target):
    res=[];path=[]
    def dfs(r,rem):
        if not r:return
        path.append(r.val)
        if not r.left and not r.right and rem==r.val:res.append(path[:])
        else:dfs(r.left,rem-r.val);dfs(r.right,rem-r.val)
        path.pop()
    dfs(root,target);return res`}}
      />
    </div>
  );
}

/* ROOT */
const TABS = [
  {id:'fundamentals',    label:'Fundamentals'},
  {id:'traversals',      label:'Traversals'},
  {id:'properties',      label:'Properties & Metrics'},
  {id:'reconstruction',  label:'LCA & Reconstruction'},
  {id:'advanced',        label:'Advanced Algorithms'},
  {id:'problems',        label:'Problems'},
];
export default function Trees() {
  const [active,setActive]=useState('fundamentals');
  const map={
    fundamentals:   <SectionFundamentals/>,
    traversals:     <SectionTraversals/>,
    properties:     <SectionProperties/>,
    reconstruction: <SectionReconstruction/>,
    advanced:       <SectionAdvanced/>,
    problems:       <SectionProblems/>,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 17</div>
        <h1 className="page-header-title">Trees</h1>
        <p className="page-header-subtitle">
          BFS/DFS Traversals · Height · Diameter · Balanced Check · LCA · Tree Reconstruction · BT to DLL · Zigzag · Serialization
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={17}/>
    </div>
  );
}
