import { useState, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   BST HELPERS — pure functions for interactive viz
══════════════════════════════════════════════════════ */
function bstInsert(node, val) {
  if (!node) return { val, left: null, right: null };
  if (val < node.val) return { ...node, left:  bstInsert(node.left,  val) };
  if (val > node.val) return { ...node, right: bstInsert(node.right, val) };
  return node;
}
function bstSearch(node, val, path = []) {
  if (!node) return { found: false, path };
  const p = [...path, node.val];
  if (node.val === val) return { found: true, path: p };
  if (val < node.val)  return bstSearch(node.left,  val, p);
  return bstSearch(node.right, val, p);
}
function treeLayout(root, lo = 0, hi = 600, depth = 0, pos = {}) {
  if (!root) return pos;
  const mx = (lo + hi) / 2;
  pos[root.val] = { x: mx, y: depth * 68 + 35 };
  treeLayout(root.left,  lo,  mx, depth + 1, pos);
  treeLayout(root.right, mx,  hi, depth + 1, pos);
  return pos;
}
function getEdges(node, edges = []) {
  if (!node) return edges;
  if (node.left)  { edges.push([node.val, node.left.val]);  getEdges(node.left,  edges); }
  if (node.right) { edges.push([node.val, node.right.val]); getEdges(node.right, edges); }
  return edges;
}
function getAllVals(node, vals = []) {
  if (!node) return vals;
  vals.push(node.val);
  getAllVals(node.left, vals);
  getAllVals(node.right, vals);
  return vals;
}

/* Initial tree for demos: 50,30,70,10,40,60,80 */
const INIT_TREE = [50,30,70,10,40,60,80].reduce(bstInsert, null);

/* ══════════════════════════════════════════════════════
   DELETION VIZ DATA — [50,30,70,10,40,60,80,35]
         50
        /  \
      30    70
     / \   / \
    10  40 60  80
       /
      35
══════════════════════════════════════════════════════ */
const DEL_POS = {
  50:[300,35], 30:[165,110], 70:[435,110],
  10:[85,190], 40:[245,190], 60:[370,190], 80:[500,190], 35:[185,270],
};
const DEL_EDGES_FULL = [[50,30],[50,70],[30,10],[30,40],[70,60],[70,80],[40,35]];

const DEL_CASES = {
  leaf: [
    { hl:{35:'info'}, edges:DEL_EDGES_FULL, dim:new Set(), desc:'Target = 35. Search: 50→30→40→35. Found: node 35 is a LEAF (no children).' },
    { hl:{35:'warning'}, edges:DEL_EDGES_FULL, dim:new Set(), desc:'Leaf deletion: simply remove the node. No pointer updates needed except parent (40.left = null).' },
    { hl:{40:'success'}, edges:DEL_EDGES_FULL.filter(e=>!(e[0]===40&&e[1]===35)), dim:new Set([35]), desc:'Done! 35 removed. 40\'s left pointer set to null. All BST properties preserved. O(h) total.' },
  ],
  oneChild: [
    { hl:{40:'info'}, edges:DEL_EDGES_FULL, dim:new Set(), desc:'Target = 40. Search: 50→30→40. Found: node 40 has exactly ONE child (left child: 35).' },
    { hl:{40:'warning', 35:'success', 30:'info'}, edges:DEL_EDGES_FULL, dim:new Set(), desc:'Single-child deletion: bypass 40 by linking parent (30) directly to 40\'s only child (35).' },
    { hl:{35:'success',30:'success'}, edges:[...DEL_EDGES_FULL.filter(e=>e[0]!==30||e[1]!==40), [30,35]], dim:new Set([40]), desc:'Done! 30→right now points to 35. Node 40 removed. BST property: 35 < 50 ✓' },
  ],
  twoChildren: [
    { hl:{30:'info'}, edges:DEL_EDGES_FULL, dim:new Set(), desc:'Target = 30. Found: node 30 has TWO children (10 and 40-with-35). Need inorder successor.' },
    { hl:{30:'info', 40:'warning', 35:'warning'}, edges:DEL_EDGES_FULL, dim:new Set(), desc:'Find successor: go RIGHT to 40, then go LEFT as far as possible. 40→left = 35, 35→left = null. Successor = 35.' },
    { hl:{30:'warning', 35:'purple'}, edges:DEL_EDGES_FULL, dim:new Set(), desc:'Copy successor value (35) into target node (30). Node position unchanged — only the VALUE is overwritten.' },
    { hl:{35:'danger'}, edges:DEL_EDGES_FULL, dim:new Set(), desc:'Now delete the ORIGINAL successor node (35) from its location. It\'s a leaf — simple removal.' },
    { hl:{10:'success',40:'success'}, edges:DEL_EDGES_FULL.filter(e=>!(e[0]===40&&e[1]===35)), dim:new Set([35]),
      desc:'Done! The "30" node now holds value 35. Original 35 leaf removed. BST order verified: 10 < 35 < 40 ✓' },
  ],
};

/* ══════════════════════════════════════════════════════
   VIEWS VIZ DATA — BST [50,30,70,10,40,60,80]
   HD: 50=0, 30=-1, 70=+1, 10=-2, 40=0, 60=0, 80=+2
══════════════════════════════════════════════════════ */
const VIEWS_POS = {
  50:[300,35], 30:[175,110], 70:[425,110],
  10:[90,190], 40:[260,190], 60:[370,190], 80:[510,190],
};
const VIEWS_EDGES = [[50,30],[50,70],[30,10],[30,40],[70,60],[70,80]];
const HD_MAP = { 50:0, 30:-1, 70:1, 10:-2, 40:0, 60:0, 80:2 };
const VIEWS_MODES = {
  hd:     { label:'Assign HD', title:'Horizontal Distance Assignment', desc:'Root = 0. Left child: parent HD − 1. Right child: parent HD + 1. Same HD = same vertical column.' },
  top:    { label:'Top View',  title:'Top View',  desc:'Top view: first BFS-visible node at each HD. Looking from above, higher nodes block lower ones. Result: 10, 30, 50, 70, 80.' },
  bottom: { label:'Bottom View',title:'Bottom View',desc:'Bottom view: last BFS node at each HD. HD=0 has 50 (level 0), 40 (level 2), 60 (level 2). BFS order makes 60 the last → bottom view at HD=0 is 60. Result: 10, 30, 60, 70, 80.' },
  vsum:   { label:'Vertical Sum',title:'Vertical Sum',desc:'Sum of all nodes at each HD. HD=0: 50+40+60=150. Useful in interval problems.' },
  left:   { label:'Left View', title:'Left View',  desc:'First node at each LEVEL (BFS snapshot). Level 0:50, Level 1:30, Level 2:10. Result: 50, 30, 10.' },
  right:  { label:'Right View',title:'Right View', desc:'Last node at each LEVEL. Level 0:50, Level 1:70, Level 2:80. Result: 50, 70, 80.' },
};

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — LIVE BST (INSERT + SEARCH)
══════════════════════════════════════════════════════ */
function InteractiveBSTViz() {
  const [tree,   setTree]   = useState(INIT_TREE);
  const [input,  setInput]  = useState('');
  const [srch,   setSrch]   = useState('');
  const [path,   setPath]   = useState([]);
  const [found,  setFound]  = useState(null);
  const [lastIns,setLastIns]= useState(null);
  const [log,    setLog]    = useState('BST initialized with [50,30,70,10,40,60,80]. Height = 3. All O(log n) operations.');

  const pos    = treeLayout(tree);
  const edges  = getEdges(tree);
  const allVals= getAllVals(tree);
  const H = (n) => !n ? 0 : Math.max(H(n.left),H(n.right))+1;
  const h = H(tree);

  const insert = useCallback(() => {
    const v = parseInt(input);
    if (isNaN(v)) return;
    if (allVals.includes(v)) { setLog(`${v} already exists in BST.`); setInput(''); return; }
    if (allVals.length >= 12) { setLog('Demo limited to 12 nodes for clarity.'); setInput(''); return; }
    setTree(t => bstInsert(t, v));
    setLastIns(v); setPath([]); setFound(null);
    setLog(`Inserted ${v}. New height = ${H(bstInsert(tree,v))}. ${v < tree?.val ? `${v} < root(${tree?.val}) → went LEFT` : `${v} > root(${tree?.val}) → went RIGHT`}`);
    setInput('');
  }, [input, tree, allVals]);

  const search = useCallback(() => {
    const v = parseInt(srch);
    if (isNaN(v)) return;
    const r = bstSearch(tree, v);
    setPath(r.path); setFound(r.found ? v : null); setLastIns(null);
    setLog(r.found ? `Found ${v}! Path: ${r.path.join(' → ')} (${r.path.length} comparisons)` : `${v} not in BST. Searched: ${r.path.join(' → ')} → null`);
    setSrch('');
  }, [srch, tree]);

  const insertSorted = () => {
    const vals = [10,20,30,40,50];
    let t = null;
    vals.forEach(v => { t = bstInsert(t, v); });
    setTree(t); setPath([]); setFound(null); setLastIns(null);
    setLog(`Inserted [10,20,30,40,50] in sorted order → degenerate tree! Height = 5 = n. O(n) operations — worst case!`);
  };
  const reset = () => {
    setTree(INIT_TREE); setPath([]); setFound(null); setLastIns(null);
    setLog('Reset to balanced BST [50,30,70,10,40,60,80]. Height = 3.');
  };

  const SVG_H = Math.max(240, h * 68 + 50);

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'6px 10px', background:'var(--color-background-secondary)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{log}</div>

      {/* SVG tree */}
      <div style={{ overflowX:'auto', marginBottom:12 }}>
        <svg width="600" height={SVG_H} viewBox={`0 0 600 ${SVG_H}`}>
          {edges.map(([a,b]) => {
            const pa = pos[a], pb = pos[b];
            return pa && pb ? <line key={`${a}-${b}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="#2A3050" strokeWidth="1.5" /> : null;
          })}
          {allVals.map(v => {
            const p = pos[v];
            if (!p) return null;
            const isPath = path.includes(v);
            const isFnd  = found === v;
            const isIns  = lastIns === v;
            let fill='#131722',stroke='#1E2233',tc='#6A7490';
            if (isFnd)   { fill='#1A3A2A';stroke='#4EC9B0';tc='#4EC9B0'; }
            else if (isIns) { fill='#1A2A3A';stroke='#81B4EA';tc='#9CDCFE'; }
            else if (isPath){ fill='#3A2A1A';stroke='#CE9178';tc='#CE9178'; }
            return (
              <g key={v}>
                <circle cx={p.x} cy={p.y} r="21" fill={fill} stroke={stroke} strokeWidth={isPath||isFnd||isIns?2:1}/>
                <text x={p.x} y={p.y+1} textAnchor="middle" dominantBaseline="middle" fill={tc} fontSize="13" fontFamily="monospace" fontWeight={isPath||isFnd||isIns?700:500}>{v}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Controls */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
        <div style={{ display:'flex', gap:6 }}>
          <input type="number" value={input} onChange={e=>setInput(e.target.value)} placeholder="value" onKeyDown={e=>e.key==='Enter'&&insert()}
            style={{ width:72, padding:'5px 8px', background:'#0D0F18', border:'1px solid #1E2233', borderRadius:'var(--border-radius-md)', color:'var(--color-text-primary)', fontFamily:'var(--font-mono)', fontSize:13, outline:'none' }} />
          <button onClick={insert} style={{ padding:'6px 12px', border:'1px solid var(--color-border-success)', borderRadius:'var(--border-radius-md)', background:'var(--color-background-success)', color:'var(--color-text-success)', cursor:'pointer', fontSize:12, fontWeight:600 }}>Insert</button>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          <input type="number" value={srch} onChange={e=>setSrch(e.target.value)} placeholder="search" onKeyDown={e=>e.key==='Enter'&&search()}
            style={{ width:72, padding:'5px 8px', background:'#0D0F18', border:'1px solid #1E2233', borderRadius:'var(--border-radius-md)', color:'var(--color-text-primary)', fontFamily:'var(--font-mono)', fontSize:13, outline:'none' }} />
          <button onClick={search} style={{ padding:'6px 12px', border:'1px solid var(--color-border-info)', borderRadius:'var(--border-radius-md)', background:'var(--color-background-info)', color:'var(--color-text-info)', cursor:'pointer', fontSize:12, fontWeight:600 }}>Search</button>
        </div>
        <button onClick={insertSorted} style={{ padding:'6px 12px', border:'1px solid var(--color-border-warning)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-warning)', cursor:'pointer', fontSize:12 }}>⚠ Insert Sorted [10..50]</button>
        <button onClick={reset} style={{ padding:'6px 12px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>↺ Reset</button>
      </div>

      <div style={{ display:'flex', gap:12, fontSize:11, fontFamily:'var(--font-mono)' }}>
        {[{c:'info',l:'Inserted'},{c:'warning',l:'Search path'},{c:'success',l:'Found'}].map(({c,l})=>(
          <div key={c} style={{display:'flex',alignItems:'center',gap:4}}>
            <div style={{width:9,height:9,borderRadius:'50%',background:`var(--color-background-${c})`,border:`1px solid var(--color-border-${c})`}}/>
            <span style={{color:'var(--color-text-secondary)'}}>{l}</span>
          </div>
        ))}
        <span style={{color:'var(--color-text-tertiary)',marginLeft:8}}>n={allVals.length}  h={h}</span>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — DELETION 3 CASES STEP-THROUGH
══════════════════════════════════════════════════════ */
function DeletionViz() {
  const [caseKey, setCaseKey] = useState('leaf');
  const [step, setStep]       = useState(0);
  const steps = DEL_CASES[caseKey];
  const s = steps[Math.min(step, steps.length - 1)];

  const changeCase = (k) => { setCaseKey(k); setStep(0); };
  const C_MAP = { info:'info', warning:'warning', success:'success', danger:'danger', purple:'purple' };

  return (
    <VizBox>
      {/* Case tabs */}
      <div style={{ display:'flex', gap:6, marginBottom:14 }}>
        {[['leaf','Delete Leaf (35)'],['oneChild','One Child (40)'],['twoChildren','Two Children (30)']].map(([k,l])=>(
          <button key={k} onClick={()=>changeCase(k)} style={{ padding:'4px 11px', border:'1px solid', borderColor:caseKey===k?'var(--color-border-info)':'var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:caseKey===k?'var(--color-background-info)':'transparent', color:caseKey===k?'var(--color-text-info)':'var(--color-text-secondary)', cursor:'pointer', fontSize:12 }}>{l}</button>
        ))}
      </div>

      <div style={{ marginBottom:12, padding:'6px 10px', background:'var(--color-background-secondary)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.6 }}>{s.desc}</div>

      {/* SVG tree */}
      <div style={{ marginBottom:14, overflowX:'auto' }}>
        <svg width="600" height="310" viewBox="0 0 600 310">
          {/* Edges */}
          {s.edges.map(([a,b]) => {
            const pa=DEL_POS[a], pb=DEL_POS[b]; if(!pa||!pb)return null;
            return <line key={`${a}-${b}`} x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} stroke="#2A3050" strokeWidth="1.5"/>;
          })}
          {/* New edge highlight (e.g. 30→35 after oneChild case) */}
          {/* Nodes */}
          {Object.keys(DEL_POS).map(v => {
            const nv=+v, [x,y]=DEL_POS[nv];
            const c = s.hl[nv];
            const dim = s.dim.has(nv);
            const cm = C_MAP[c] || null;
            const fill = cm?`var(--color-background-${cm})`:'#131722';
            const stroke = cm?`var(--color-border-${cm})`:'#1E2233';
            const tc = cm?`var(--color-text-${cm})`:'#6A7490';
            return (
              <g key={v} style={{ opacity: dim ? 0.15 : 1, transition:'opacity 0.3s' }}>
                <circle cx={x} cy={y} r="22" fill={fill} stroke={stroke} strokeWidth={cm?2:1}/>
                <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fill={tc} fontSize="13" fontFamily="monospace" fontWeight={cm?700:500}>{v}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(steps.length-1,step+1)),step===steps.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{steps.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — VIEWS & VERTICAL TRAVERSAL
   Toggle: HD assign / Top / Bottom / VSum / Left / Right
══════════════════════════════════════════════════════ */
function ViewsViz() {
  const [mode, setMode] = useState('hd');
  const cfg = VIEWS_MODES[mode];

  const colMap = { '-2':'info','-1':'warning','0':'success','1':'purple','2':'danger' };

  const getNodeHL = (v) => {
    const hd = HD_MAP[v];
    const hdStr = String(hd);
    if (mode === 'hd') return colMap[hdStr] || 'secondary';
    if (mode === 'top')    return [10,30,50,70,80].includes(v) ? colMap[hdStr] : 'secondary';
    if (mode === 'bottom') return [10,30,60,70,80].includes(v) ? colMap[hdStr] : 'secondary';
    if (mode === 'vsum')   return colMap[hdStr] || 'secondary';
    if (mode === 'left')   return [50,30,10].includes(v) ? 'success' : 'secondary';
    if (mode === 'right')  return [50,70,80].includes(v) ? 'success' : 'secondary';
    return 'secondary';
  };

  const HD_LABELS = mode === 'hd' ? Object.fromEntries(Object.entries(HD_MAP).map(([v,hd])=>[v,`hd=${hd}`])) : {};

  // Column summary
  const columns = [-2,-1,0,1,2];
  const colNodes = {'-2':[10],'-1':[30],'0':[50,40,60],'1':[70],'2':[80]};
  const colSums = Object.fromEntries(Object.entries(colNodes).map(([k,vs])=>[k,vs.reduce((a,b)=>a+b,0)]));

  return (
    <VizBox>
      {/* Mode tabs */}
      <div style={{ display:'flex', gap:5, marginBottom:14, flexWrap:'wrap' }}>
        {Object.entries(VIEWS_MODES).map(([k,v])=>(
          <button key={k} onClick={()=>setMode(k)} style={{ padding:'4px 10px', border:'1px solid', borderColor:mode===k?'var(--color-border-info)':'var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:mode===k?'var(--color-background-info)':'transparent', color:mode===k?'var(--color-text-info)':'var(--color-text-secondary)', cursor:'pointer', fontSize:12 }}>{v.label}</button>
        ))}
      </div>

      <div style={{ marginBottom:12, padding:'6px 10px', background:'var(--color-background-secondary)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}><strong style={{ color:'var(--color-text-primary)' }}>{cfg.title}:</strong> {cfg.desc}</div>

      {/* Tree SVG */}
      <svg width="600" height="230" viewBox="0 0 600 230" style={{ marginBottom:12 }}>
        {VIEWS_EDGES.map(([a,b])=>{
          const pa=VIEWS_POS[a],pb=VIEWS_POS[b];
          return <line key={`${a}-${b}`} x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} stroke="#2A3050" strokeWidth="1.5"/>;
        })}
        {Object.keys(VIEWS_POS).map(v=>{
          const nv=+v, [x,y]=VIEWS_POS[nv], c=getNodeHL(nv);
          const dim = c==='secondary';
          const lbl = HD_LABELS[v];
          return (
            <g key={v}>
              <circle cx={x} cy={y} r="22" fill={dim?'#131722':`var(--color-background-${c})`} stroke={dim?'#1E2233':`var(--color-border-${c})`} strokeWidth={dim?1:2}/>
              <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fill={dim?'#4A5170':`var(--color-text-${c})`} fontSize="13" fontFamily="monospace" fontWeight={dim?400:700}>{v}</text>
              {lbl && <text x={x} y={y+32} textAnchor="middle" fill={`var(--color-text-${c})`} fontSize="10" fontFamily="monospace" fontWeight="700">{lbl}</text>}
            </g>
          );
        })}
      </svg>

      {/* Column strip */}
      {(mode==='hd'||mode==='top'||mode==='bottom'||mode==='vsum') && (
        <div style={{ display:'flex', justifyContent:'center', gap:6, flexWrap:'wrap' }}>
          {columns.map(hd=>{
            const k=String(hd), c=colMap[k]||'secondary';
            const nodes = colNodes[k]||[];
            const isActive = mode==='top'    ? nodes.slice(0,1) :
                             mode==='bottom' ? (hd===0?[60]:nodes.slice(-1)) : nodes;
            return (
              <div key={hd} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4,padding:'8px 12px',borderRadius:'var(--border-radius-md)',background:`var(--color-background-${c})`,border:`1px solid var(--color-border-${c})`,minWidth:80 }}>
                <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:`var(--color-text-${c})`, fontWeight:700 }}>HD = {hd}</div>
                <div style={{ display:'flex',gap:3,flexWrap:'wrap',justifyContent:'center' }}>
                  {nodes.map(v=><span key={v} style={{ padding:'2px 7px',borderRadius:4,background:mode==='vsum'?'transparent':(isActive.includes(v)?`var(--color-border-${c})`:'transparent'),border:`1px solid var(--color-border-${c})`,fontFamily:'var(--font-mono)',fontSize:12,fontWeight:700,color:`var(--color-text-${c})`}}>{v}</span>)}
                </div>
                {mode==='vsum' && <div style={{ fontSize:13,fontFamily:'var(--font-mono)',fontWeight:700,color:`var(--color-text-${c})`,borderTop:`1px solid var(--color-border-${c})`,paddingTop:4,width:'100%',textAlign:'center' }}>Σ={colSums[k]}</div>}
              </div>
            );
          })}
        </div>
      )}
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
   SECTION 1 — BST FUNDAMENTALS
══════════════════════════════════════════════════════ */
function SectionFundamentals() {
  return (
    <div>
      <Note color="info" icon="ti-binary-tree-2">
        A BST is a binary tree where <strong>every left descendant &lt; node &lt; every right descendant</strong>. This property — maintained through insertions — makes searching, insertion, and deletion all O(log n) on a balanced tree, matching a sorted array's search speed while beating its insert/delete cost.
      </Note>

      <H2>Performance Spectrum — Why BST?</H2>
      <Table
        heads={["Operation", "Unsorted Array/LL", "Sorted Array", "Balanced BST", "Hash Table"]}
        rows={[
          ["Search",          "O(n)",     "O(log n)", "O(log n)", "O(1)"],
          ["Insert",          "O(1)",     "O(n)",     "O(log n)", "O(1)"],
          ["Delete",          "O(n)",     "O(n)",     "O(log n)", "O(1)"],
          ["Find Closest",    "O(n)",     "O(log n)", "O(log n)", "O(n)"],
          ["Sorted Traversal","O(n log n)","O(n)",    "O(n)",     "O(n log n)"],
        ]}
      />
      <Note color="warning" icon="ti-bulb">
        <strong>When to use BST over hash table:</strong> When you need ordered operations — finding floor/ceil, kth smallest, range queries, or sorted traversal. Hash tables win for pure lookup/insert but offer no ordering guarantee.
      </Note>

      <H2>Interactive BST — Insert, Search, Observe</H2>
      <P>Insert values and watch the BST grow. Click "⚠ Insert Sorted" to see how inserting sorted data degenerates the tree to a linked list — height O(n) instead of O(log n). This is why balanced BSTs (AVL, Red-Black) exist.</P>
      <InteractiveBSTViz />

      <H2>Search and Insertion</H2>
      <Code>{{cpp:`// Search — O(h): follow BST property at each node
TreeNode* search(TreeNode* r, int key) {
    if (!r || r->val == key) return r;
    return key < r->val ? search(r->left, key) : search(r->right, key);
}

// Insertion — O(h): traverse to correct leaf position
TreeNode* insert(TreeNode* r, int val) {
    if (!r) return new TreeNode(val);
    if (val < r->val) r->left  = insert(r->left,  val);
    else if (val > r->val) r->right = insert(r->right, val);
    return r;   // duplicate: no change
}`, python:`def search(r, key):
    if not r or r.val == key: return r
    return search(r.left,key) if key<r.val else search(r.right,key)

def insert(r, val):
    if not r: return TreeNode(val)
    if val<r.val: r.left=insert(r.left,val)
    elif val>r.val: r.right=insert(r.right,val)
    return r`}}</Code>

      <H2>Floor and Ceil of a BST</H2>
      <P><strong>Floor(x):</strong> largest value ≤ x in the BST. <strong>Ceil(x):</strong> smallest value ≥ x. At each node: if node.val matches, return it. Otherwise, navigate left/right based on comparison and track candidates.</P>
      <Code>{{cpp:`// Floor: largest value ≤ x
int floor(TreeNode* r, int x) {
    if (!r) return -1;   // no floor exists
    if (r->val == x) return r->val;
    if (r->val > x) return floor(r->left, x);  // node too big, go left
    // r->val < x: node is a candidate, but right subtree might have a closer value
    int rightFloor = floor(r->right, x);
    return (rightFloor == -1) ? r->val : rightFloor;
}

// Ceil: smallest value ≥ x (symmetric)
int ceil(TreeNode* r, int x) {
    if (!r) return -1;
    if (r->val == x) return r->val;
    if (r->val < x) return ceil(r->right, x);
    // r->val > x: node is a candidate, but left subtree might have a closer value
    int leftCeil = ceil(r->left, x);
    return (leftCeil == -1) ? r->val : leftCeil;
}
// floor(root, 30) = 30  |  floor(root, 4) = -1 (nothing ≤ 4)
// ceil(root, 35)  = 40  |  ceil(root, 80)  = 80`, python:`def floor_bst(r, x):
    if not r: return -1
    if r.val == x: return x
    if r.val > x: return floor_bst(r.left, x)
    rf = floor_bst(r.right, x)
    return r.val if rf == -1 else rf

def ceil_bst(r, x):
    if not r: return -1
    if r.val == x: return x
    if r.val < x: return ceil_bst(r.right, x)
    lc = ceil_bst(r.left, x)
    return r.val if lc == -1 else lc`}}</Code>

      <H2>Ceiling on Left Side — BST as Running Index</H2>
      <P>For each element in a stream, find the ceiling of the set of all previous elements. Maintain a BST of seen elements. For each new element, find its ceiling in the current BST, then insert it.</P>
      <Code>{{cpp:`// O(n log n) — BST maintains elements seen so far
vector<int> ceilOnLeft(vector<int>& arr) {
    vector<int> res; TreeNode* root = nullptr;
    for (int x : arr) {
        int c = ceil(root, x);   // O(log n) ceiling query
        res.push_back(c);        // -1 if no ceiling exists yet
        root = insert(root, x);  // O(log n) insertion
    }
    return res;
}
// [2,8,30,15,25,12] → [-1,-1,-1,30,30,15]`, python:`def ceil_on_left(arr):
    res=[]; root=None
    for x in arr:
        res.append(ceil_bst(root,x))
        root=insert(root,x)
    return res`}}</Code>

      <QA q="What makes a BST degenerate, and what's the actual worst-case height?" a="A BST degenerates when insertions are monotonically increasing or decreasing — e.g., inserting [1,2,3,4,5] in order creates a right-skewed 'vine' of height n-1. Every operation becomes O(n). This is exactly the performance of a linked list. Balanced BSTs (AVL, Red-Black) prevent this by enforcing height bounds after each insertion/deletion." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — DELETION & BST ALGORITHMS
══════════════════════════════════════════════════════ */
function SectionDeletion() {
  return (
    <div>
      <H2>BST Deletion — Three Cases</H2>
      <P>Deletion is the hardest BST operation. The two-children case requires finding the <em>inorder successor</em> (leftmost node of right subtree) or <em>inorder predecessor</em> (rightmost node of left subtree), copying its value, then deleting that simpler node (which has at most one child).</P>
      <DeletionViz />
      <Code>{{cpp:`TreeNode* deleteNode(TreeNode* r, int key) {
    if (!r) return r;
    if      (key < r->val) r->left  = deleteNode(r->left,  key);
    else if (key > r->val) r->right = deleteNode(r->right, key);
    else {
        // CASE 1: Leaf or CASE 2: One child
        if (!r->left)  { auto t=r->right; delete r; return t; }
        if (!r->right) { auto t=r->left;  delete r; return t; }
        // CASE 3: Two children — find inorder successor (leftmost of right subtree)
        TreeNode* succ = r->right;
        while (succ->left) succ = succ->left;
        r->val = succ->val;                         // copy successor value
        r->right = deleteNode(r->right, succ->val); // delete successor from right subtree
    }
    return r;
}`, python:`def delete_bst(r, key):
    if not r: return r
    if key < r.val: r.left=delete_bst(r.left,key)
    elif key > r.val: r.right=delete_bst(r.right,key)
    else:
        if not r.left: return r.right  # leaf or one child
        if not r.right: return r.left
        # Two children: find inorder successor
        succ=r.right
        while succ.left: succ=succ.left
        r.val=succ.val
        r.right=delete_bst(r.right,succ.val)
    return r`}}</Code>
      <Note color="info" icon="ti-bulb">
        Both successor and predecessor work for the two-children case. The successor keeps the BST property: succ &gt; all left subtree nodes and succ ≤ all right subtree nodes (except former successors). Either choice produces a valid BST.
      </Note>

      <H2>Validate BST — Two Clean Approaches</H2>
      <Grid cols={2}>
        <Card title="Range Bounding — O(n)" color="success">
          Pass (min, max) bounds to each node. Every node must satisfy min &lt; node.val &lt; max. Left child inherits max = node.val; right child inherits min = node.val.
        </Card>
        <Card title="Inorder + prev — O(n)" color="info">
          Inorder traversal of a valid BST gives strictly increasing values. Track the previous value; if current ≤ prev, it's not a valid BST.
        </Card>
      </Grid>
      <Code>{{cpp:`// Method 1: Range bounding
bool isBST(TreeNode* r, long min=LLONG_MIN, long max=LLONG_MAX) {
    if (!r) return true;
    if (r->val <= min || r->val >= max) return false;
    return isBST(r->left,  min, r->val) && isBST(r->right, r->val, max);
}

// Method 2: Inorder correctness
long prev = LLONG_MIN;
bool isBSTInorder(TreeNode* r) {
    if (!r) return true;
    if (!isBSTInorder(r->left)) return false;
    if (r->val <= prev) return false;    // violation: not strictly increasing
    prev = r->val;
    return isBSTInorder(r->right);
}`, python:`def is_bst(r, mn=float('-inf'), mx=float('inf')):
    if not r: return True
    if not (mn < r.val < mx): return False
    return is_bst(r.left,mn,r.val) and is_bst(r.right,r.val,mx)

# Inorder method:
def is_bst_inorder(r, prev=[float('-inf')]):
    if not r: return True
    if not is_bst_inorder(r.left,prev): return False
    if r.val <= prev[0]: return False
    prev[0]=r.val
    return is_bst_inorder(r.right,prev)`}}</Code>

      <H2>Fix BST with Two Swapped Nodes (LC 99)</H2>
      <P>Two nodes have been swapped, breaking the BST. During inorder traversal (which should be increasing), the two swapped nodes produce anomalies: either two inversions (non-adjacent swap) or one (adjacent swap). Track prev, first violation, second violation, then swap their keys back.</P>
      <Code>{{cpp:`TreeNode *first=nullptr, *second=nullptr, *prev=nullptr;
void fix(TreeNode* r) {
    if (!r) return;
    fix(r->left);
    if (prev && r->val < prev->val) {
        if (!first) first = prev;   // first violation: larger element (prev)
        second = r;                  // second violation: smaller element (r)
    }
    prev = r;
    fix(r->right);
}
void recoverTree(TreeNode* root) {
    fix(root);
    swap(first->val, second->val);  // restore both
}
// [3,1,2] (3↔2 swapped) → inorder gives 1,3,2 → first=3,second=2 → swap → [2,1,3]`, python:`def recover_tree(root):
    first=second=prev=[None]
    def fix(r):
        if not r: return
        fix(r.left)
        if prev[0] and r.val<prev[0].val:
            if not first[0]:first[0]=prev[0]
            second[0]=r
        prev[0]=r
        fix(r.right)
    fix(root)
    first[0].val,second[0].val=second[0].val,first[0].val`}}</Code>

      <H2>Kth Smallest with Augmented BST</H2>
      <P>Standard approach: inorder traversal gives sorted order → pick kth element. O(n). With augmented BST (store left-subtree size <code>lcount</code> per node): find kth in O(h) = O(log n) by comparing k with the rank of each node.</P>
      <Code>{{cpp:`// Node augmented with lcount = size of left subtree
int kthSmallest(AugNode* r, int k) {
    int rank = r->lcount + 1;    // this node's rank (1-indexed)
    if (k == rank) return r->val;
    if (k < rank)  return kthSmallest(r->left,  k);
    return kthSmallest(r->right, k - rank);  // subtract left subtree + root
}
// Without augmentation: do inorder, pick kth. O(n).
// With augmentation:    O(h) = O(log n) for balanced BST.`, python:`# Inorder approach — simple O(n)
def kth_smallest(root, k):
    def inorder(r):
        if not r: return []
        return inorder(r.left)+[r.val]+inorder(r.right)
    return inorder(root)[k-1]

# O(n) iterative with early termination:
def kth_smallest_iter(root, k):
    stack=[]; cur=root; count=0
    while cur or stack:
        while cur:stack.append(cur);cur=cur.left
        cur=stack.pop();count+=1
        if count==k:return cur.val
        cur=cur.right`}}</Code>

      <QA q="Why does the inorder 'prev' approach work for validating BST but fail for the 'fix two swapped nodes' problem in some cases?" a="For validation, a single violation terminates the check. For fixing, we need to find BOTH swapped nodes across the entire traversal. For non-adjacent swaps (e.g., 1,5,3,4,2 — 5 and 2 swapped), inorder gives two violation points: first at (5,3) and second at (4,2). For adjacent swaps (e.g., 1,3,2,4 — 3 and 2 swapped), there's only ONE violation: (3,2). In both cases, first points to the larger violating node and second points to the smaller. Setting first at the first violation's prev (the larger value) and second to the current at each violation correctly handles both cases." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — VIEWS & VERTICAL TRAVERSAL
══════════════════════════════════════════════════════ */
function SectionViews() {
  return (
    <div>
      <Note color="success" icon="ti-columns">
        <strong>Horizontal distance (HD)</strong> assigns each node a column index: root = 0, left child = parent HD − 1, right child = parent HD + 1. All nodes with the same HD form a "vertical column." This enables top view, bottom view, vertical sum, and vertical order traversal.
      </Note>

      <H2>Horizontal Distance — Toggle All Views</H2>
      <ViewsViz />

      <H2>Top View — First BFS Node at Each HD</H2>
      <Code>{{cpp:`void topView(TreeNode* root) {
    map<int, int> mp;              // HD → node value (first seen)
    queue<pair<TreeNode*,int>> q;  // {node, HD}
    q.push({root, 0});
    while (!q.empty()) {
        auto [node, hd] = q.front(); q.pop();
        if (!mp.count(hd)) mp[hd] = node->val;  // only first seen at this HD
        if (node->left)  q.push({node->left,  hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    for (auto [hd, val] : mp) cout << val << " ";
}
// BST [50,30,70,10,40,60,80] → 10 30 50 70 80`, python:`from collections import deque
def top_view(root):
    mp={}; q=deque([(root,0)])
    while q:
        node,hd=q.popleft()
        if hd not in mp: mp[hd]=node.val   # first seen wins
        if node.left:  q.append((node.left,  hd-1))
        if node.right: q.append((node.right, hd+1))
    return [mp[k] for k in sorted(mp)]`}}</Code>

      <H2>Bottom View — Last BFS Node at Each HD</H2>
      <P>Identical to top view except we unconditionally overwrite instead of checking existence. The last BFS node at each HD (deepest, rightmost within a level) wins.</P>
      <Code>{{cpp:`void bottomView(TreeNode* root) {
    map<int, int> mp;
    queue<pair<TreeNode*,int>> q; q.push({root, 0});
    while (!q.empty()) {
        auto [node, hd] = q.front(); q.pop();
        mp[hd] = node->val;    // UNCONDITIONAL overwrite: last BFS node wins
        if (node->left)  q.push({node->left,  hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    for (auto [hd, val] : mp) cout << val << " ";
}
// → 10 30 60 70 80  (HD=0: 50,40,60 in BFS order — 60 overwrites last)`, python:`def bottom_view(root):
    mp={}; q=deque([(root,0)])
    while q:
        node,hd=q.popleft()
        mp[hd]=node.val             # last wins
        if node.left:  q.append((node.left,  hd-1))
        if node.right: q.append((node.right, hd+1))
    return [mp[k] for k in sorted(mp)]`}}</Code>

      <H2>Vertical Order Traversal (LC 987)</H2>
      <Code>{{cpp:`vector<vector<int>> verticalTraversal(TreeNode* root) {
    map<int, map<int, multiset<int>>> mp; // HD → depth → {values}
    queue<tuple<TreeNode*,int,int>> q;    // {node, HD, depth}
    q.push({root, 0, 0});
    while (!q.empty()) {
        auto [n, hd, d] = q.front(); q.pop();
        mp[hd][d].insert(n->val);
        if (n->left)  q.push({n->left,  hd-1, d+1});
        if (n->right) q.push({n->right, hd+1, d+1});
    }
    vector<vector<int>> res;
    for (auto& [hd, depths] : mp) {
        vector<int> col;
        for (auto& [d, vals] : depths)
            col.insert(col.end(), vals.begin(), vals.end());
        res.push_back(col);
    }
    return res;
}`, python:`from collections import defaultdict, deque
def vertical_traversal(root):
    mp=defaultdict(list); q=deque([(root,0,0)])
    while q:
        n,hd,d=q.popleft()
        mp[hd].append((d,n.val))
        if n.left:  q.append((n.left, hd-1,d+1))
        if n.right: q.append((n.right,hd+1,d+1))
    return [[v for _,v in sorted(mp[k])] for k in sorted(mp)]`}}</Code>

      <QA q="What is the difference between Top View and Left View?" a="Top View groups nodes by HORIZONTAL DISTANCE — it shows what's visible when looking down from above (first node at each HD column). Left View groups nodes by LEVEL — it shows what's visible from the left side (first node at each tree level). For a balanced BST, these are different: left view is always the leftmost path from root, while top view includes every distinct HD column even if blocked by a higher node." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — BALANCED BSTs
══════════════════════════════════════════════════════ */
function SectionBalanced() {
  return (
    <div>
      <Note color="warning" icon="ti-arrows-left-right">
        Self-balancing BSTs maintain O(log n) height through <em>rotations</em> after insertions/deletions. C++ <code>std::set</code>, <code>std::map</code>, and Python's <code>SortedList</code> (from sortedcontainers) use Red-Black trees internally.
      </Note>

      <H2>AVL Tree — Strict Balance Factor</H2>
      <P>Balance Factor (BF) = |left_height − right_height| ≤ 1 for every node. When BF exceeds 1, apply one of four rotation cases to restore balance.</P>
      <Table
        heads={["Violation", "Detection", "Fix", "Example unbalanced"]}
        rows={[
          ["LL (Left-Left)",   "BF(root)>1, BF(left)≥0",  "Right rotation on root",        "100←200←300 inserted 300,200,100"],
          ["RR (Right-Right)", "BF(root)<-1, BF(right)≤0", "Left rotation on root",         "100→200→300 inserted 100,200,300"],
          ["LR (Left-Right)",  "BF(root)>1, BF(left)<0",   "Left rot on left, then Right rot","100←300→200 inserted 300,100,200"],
          ["RL (Right-Left)",  "BF(root)<-1, BF(right)>0", "Right rot on right, then Left rot","100→300←200 inserted 100,300,200"],
        ]}
      />
      <Code>{{cpp:`// AVL right rotation (fixes LL imbalance)
AVLNode* rightRotate(AVLNode* y) {
    AVLNode* x  = y->left;
    AVLNode* T2 = x->right;
    x->right = y;    y->left = T2;
    y->height = max(height(y->left),  height(y->right))  + 1;
    x->height = max(height(x->left),  height(x->right))  + 1;
    return x;        // x is new root of this subtree
}
// Left rotation is symmetric: swap left/right, return x->left

// After insert, fix up the path back to root:
int bf = balance(node);
if (bf > 1  && val <  node->left->val)  return rightRotate(node);          // LL
if (bf < -1 && val >  node->right->val) return leftRotate(node);           // RR
if (bf > 1  && val >  node->left->val)  { node->left=leftRotate(node->left);  return rightRotate(node); } // LR
if (bf < -1 && val <  node->right->val) { node->right=rightRotate(node->right); return leftRotate(node);} // RL`, python:`def right_rotate(y):
    x=y.left; T2=x.right
    x.right=y; y.left=T2
    y.height=1+max(h(y.left),h(y.right))
    x.height=1+max(h(x.left),h(x.right))
    return x`}}</Code>

      <H2>Red-Black Tree — Relaxed Balance</H2>
      <P>Red-Black trees use color (red/black) instead of strict height balancing. Fewer rotations per insertion/deletion than AVL — preferred for workloads with frequent updates.</P>
      <Grid cols={2}>
        <Card title="Red-Black Properties" color="danger">
          <div style={{ fontFamily:'var(--font-mono)', fontSize:12, lineHeight:2 }}>
            1. Every node is RED or BLACK<br/>
            2. Root is always BLACK<br/>
            3. No two consecutive RED nodes<br/>
            4. Every root-to-null path has equal BLACK nodes
          </div>
        </Card>
        <Card title="AVL vs Red-Black" color="warning">
          <div style={{ fontSize:13, lineHeight:1.7 }}>
            AVL: stricter balance → faster search (smaller height). Red-Black: fewer rotations on insert/delete → faster modifications. C++ STL uses Red-Black for std::map/set.
          </div>
        </Card>
      </Grid>

      <H2>C++ STL — map and set</H2>
      <Code lang="cpp">{`#include <set>
#include <map>

set<int> s;
s.insert(50); s.insert(30); s.insert(70);
s.erase(30);
auto it = s.find(50);          // O(log n)
auto lb = s.lower_bound(35);   // first element ≥ 35 → points to 50
auto ub = s.upper_bound(50);   // first element >  50 → points to 70
bool exists = s.count(50);     // O(log n)

map<string, int> freq;
freq["hello"]++;
for (auto [key, val] : freq) cout << key << ": " << val; // sorted by key

// multiset allows duplicates; multimap allows duplicate keys`}</Code>

      <QA q="Why do C++ STL containers use Red-Black trees instead of AVL trees?" a="For general-purpose containers with mixed operations (frequent inserts and deletes interspersed with searches), Red-Black trees require fewer rotations per insert/delete — at most 2 rotations per insertion, 3 per deletion, vs potentially O(log n) rebalancing passes in AVL. AVL trees maintain a stricter balance invariant (height difference ≤ 1 everywhere) which gives a slightly shorter tree height, but the rebalancing cost is higher. For databases and search-heavy workloads, AVL is preferred; for general STL-style usage, Red-Black wins." />
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
        6 BST problems spanning search, reconstruction, and path algorithms — all high-frequency in FAANG and IIT OAs.
      </Note>

      <ProblemCard num={1} title="Kth Smallest Element in BST" difficulty="LC Medium" tags={["LC 230","Inorder"]}
        statement="Given the root of a BST and an integer <code>k</code>, return the <strong>k-th smallest</strong> value among all the values of the nodes in the tree."
        constraints={["1 ≤ k ≤ n ≤ 10⁴","0 ≤ val ≤ 10⁴"]}
        examples={[{input:"root=[3,1,4,null,2], k=1",output:"1"},{input:"root=[5,3,6,2,4,null,null,1], k=3",output:"3"}]}
        approach="Inorder traversal of BST gives sorted ascending order. Stop at the kth element. Iterative with a stack allows early termination — no need to traverse the full tree. O(h+k) time where h = tree height."
        code={{cpp:`int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> st; TreeNode* cur=root;
    while(cur||!st.empty()){
        while(cur){st.push(cur);cur=cur->left;}
        cur=st.top();st.pop();
        if(--k==0) return cur->val;
        cur=cur->right;
    }
    return -1;
}`,python:`def kth_smallest(root,k):
    stack=[]; cur=root; cnt=0
    while cur or stack:
        while cur:stack.append(cur);cur=cur.left
        cur=stack.pop();cnt+=1
        if cnt==k:return cur.val
        cur=cur.right`}}
      />

      <ProblemCard num={2} title="Validate Binary Search Tree" difficulty="LC Medium" tags={["LC 98","Range Bounds"]}
        statement="Given a binary tree, determine if it is a valid BST (every node's value is in the valid range defined by its ancestors)."
        constraints={["1 ≤ n ≤ 10⁴","-2³¹ ≤ val ≤ 2³¹-1","Must handle duplicate values: BST requires strict inequality"]}
        examples={[{input:"[2,1,3]",output:"true"},{input:"[5,1,4,null,null,3,6]",output:"false",note:"Root is 5 but right child is 4 < 5"}]}
        approach="Range bounding: pass (min, max) constraints to each recursive call. Root: (-∞, +∞). Left child: (min, node.val). Right child: (node.val, max). Every node must satisfy min < val < max strictly. Use long long to handle INT_MIN/INT_MAX boundary nodes."
        code={{cpp:`bool isValidBST(TreeNode* r,long mn=LLONG_MIN,long mx=LLONG_MAX){
    if(!r)return true;
    if(r->val<=mn||r->val>=mx)return false;
    return isValidBST(r->left,mn,r->val)&&isValidBST(r->right,r->val,mx);
}`,python:`def is_valid_bst(r,mn=float('-inf'),mx=float('inf')):
    if not r:return True
    if not(mn<r.val<mx):return False
    return is_valid_bst(r.left,mn,r.val) and is_valid_bst(r.right,r.val,mx)`}}
      />

      <ProblemCard num={3} title="Lowest Common Ancestor of BST" difficulty="LC Medium" tags={["LC 235","BST Property"]}
        statement="Given a BST and two nodes <code>p</code> and <code>q</code>, return their lowest common ancestor. The LCA is defined as the deepest node that is an ancestor of both p and q."
        constraints={["2 ≤ n ≤ 10⁵","All values unique","p ≠ q, both exist in tree"]}
        examples={[{input:"p=2, q=8",output:"6",note:"LCA of nodes 2 and 8 is 6"},{input:"p=2, q=4",output:"2",note:"2 is ancestor of 4"}]}
        approach="Use the BST property: if both p and q are less than root → LCA is in left subtree. If both greater → right subtree. Otherwise the root splits them → root IS the LCA. No extra space needed. O(h) iteratively."
        code={{cpp:`TreeNode* lowestCommonAncestor(TreeNode* r,TreeNode* p,TreeNode* q){
    while(r){
        if(p->val<r->val&&q->val<r->val) r=r->left;
        else if(p->val>r->val&&q->val>r->val) r=r->right;
        else return r;   // split point = LCA
    }
    return nullptr;
}`,python:`def lca_bst(r,p,q):
    while r:
        if p.val<r.val and q.val<r.val:r=r.left
        elif p.val>r.val and q.val>r.val:r=r.right
        else:return r`}}
      />

      <ProblemCard num={4} title="Recover BST (Two Nodes Swapped)" difficulty="LC Hard" tags={["LC 99","Morris Traversal"]}
        statement="Two nodes of a BST have been swapped. Recover the tree without changing its structure."
        constraints={["2 ≤ n ≤ 1000","O(1) space bonus challenge"]}
        examples={[{input:"[1,3,null,null,2]",output:"[3,1,null,null,2]",note:"3 and 1 were swapped"},{input:"[3,1,4,null,null,2]",output:"[2,1,4,null,null,3]"}]}
        approach="Inorder traversal tracks prev. Two violations signal the swapped nodes: first violation's prev = first node (larger), second violation's current = second node (smaller). Handles both adjacent and non-adjacent swaps. Swap only the VALUES at the end. O(h) space (recursion stack)."
        code={{cpp:`class Solution {
    TreeNode *first=nullptr,*second=nullptr,*prev=nullptr;
    void dfs(TreeNode* r){
        if(!r)return;
        dfs(r->left);
        if(prev&&r->val<prev->val){
            if(!first)first=prev;
            second=r;
        }
        prev=r;
        dfs(r->right);
    }
public:
    void recoverTree(TreeNode* root){dfs(root);swap(first->val,second->val);}
};`,python:`def recover_tree(root):
    first=second=prev=[None]
    def dfs(r):
        if not r:return
        dfs(r.left)
        if prev[0] and r.val<prev[0].val:
            if not first[0]:first[0]=prev[0]
            second[0]=r
        prev[0]=r; dfs(r.right)
    dfs(root); first[0].val,second[0].val=second[0].val,first[0].val`}}
      />

      <ProblemCard num={5} title="Binary Search Tree to Greater Sum Tree" difficulty="LC Medium" tags={["LC 1038","Reverse Inorder"]}
        statement="Given a BST, transform it into a Greater Sum Tree where every key is replaced by the sum of all keys greater than or equal to it."
        constraints={["1 ≤ n ≤ 100","0 ≤ val ≤ 100","All values unique"]}
        examples={[{input:"[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]",output:"[30,36,21,36,35,26,15,...]"}]}
        approach="Reverse inorder traversal (Right → Root → Left) visits nodes in DECREASING order. Maintain a running sum — each node's new value = old value + running sum. Update running sum after each visit. O(n) time, O(h) space."
        code={{cpp:`int runSum=0;
TreeNode* bstToGst(TreeNode* r){
    if(!r)return nullptr;
    bstToGst(r->right);     // process right first (larger values)
    runSum+=r->val;
    r->val=runSum;
    bstToGst(r->left);
    return r;
}`,python:`def bst_to_gst(root):
    total=[0]
    def rev_inorder(r):
        if not r:return
        rev_inorder(r.right)
        total[0]+=r.val; r.val=total[0]
        rev_inorder(r.left)
    rev_inorder(root); return root`}}
      />

      <ProblemCard num={6} title="Pair Sum in BST" difficulty="OA Medium" tags={["Two-Pointer","Hash Set"]}
        statement="Given a BST and a target sum <code>X</code>, determine if there exist two distinct nodes in the BST whose values sum to <code>X</code>."
        constraints={["1 ≤ n ≤ 10⁵","1 ≤ X ≤ 10⁹"]}
        examples={[{input:"BST=[5,3,6,2,4,null,7], target=9",output:"true",note:"2+7=9"},{input:"BST=[5,3,6,2,4,null,7], target=28",output:"false"}]}
        approach="Method 1: Inorder traversal → sorted array → two-pointer from both ends. O(n) time, O(n) space. Method 2: traverse BST, for each node check if (X - node.val) exists in a hash set, then insert node.val. O(n) average with hash set."
        code={{cpp:`bool findTarget(TreeNode* r,int k){
    unordered_set<int> seen;
    stack<TreeNode*> st; TreeNode* cur=r;
    while(cur||!st.empty()){
        while(cur){st.push(cur);cur=cur->left;}
        cur=st.top();st.pop();
        if(seen.count(k-cur->val))return true;
        seen.insert(cur->val);
        cur=cur->right;
    }
    return false;
}`,python:`def find_target(root,k):
    seen=set(); st=[]; cur=root
    while cur or st:
        while cur:st.append(cur);cur=cur.left
        cur=st.pop()
        if k-cur.val in seen:return True
        seen.add(cur.val); cur=cur.right
    return False`}}
      />
    </div>
  );
}

/* ROOT */
const TABS = [
  {id:'fundamentals', label:'Fundamentals'},
  {id:'deletion',     label:'Deletion & BST Algorithms'},
  {id:'views',        label:'Views & Vertical Traversal'},
  {id:'balanced',     label:'AVL & Red-Black'},
  {id:'problems',     label:'Problems'},
];
export default function BST() {
  const [active,setActive]=useState('fundamentals');
  const map={
    fundamentals:<SectionFundamentals/>,
    deletion:<SectionDeletion/>,
    views:<SectionViews/>,
    balanced:<SectionBalanced/>,
    problems:<SectionProblems/>,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 18</div>
        <h1 className="page-header-title">Binary Search Trees</h1>
        <p className="page-header-subtitle">
          Search · Insert · Delete (3 Cases) · Floor/Ceil · Validate · Fix Swapped · Kth Smallest · Top/Bottom View · AVL · Red-Black
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={18}/>
    </div>
  );
}
