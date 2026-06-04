import{r as b,j as e}from"./index-D9jkHkZY.js";import{S as C,N as A,d as N,H as g,P as m,a as x,M as R,Q as j,G as I,C as L,V as q}from"./SectionNav-BHzhBu3R.js";const k={1:[300,35],2:[170,115],3:[430,115],4:[90,195],5:[250,195],6:[370,195],7:[510,195]},O=[[1,2],[1,3],[2,4],[2,5],[3,6],[3,7]],v={1:{val:1,left:2,right:3},2:{val:2,left:4,right:5},3:{val:3,left:6,right:7},4:{val:4,left:null,right:null},5:{val:5,left:null,right:null},6:{val:6,left:null,right:null},7:{val:7,left:null,right:null}};function w(s){const c=[],r=[],a=[],l=(h,o,n)=>c.push({cur:h,stack:[...a],output:[...r],act:o,desc:n});l(null,"init",`${s.charAt(0).toUpperCase()+s.slice(1)} traversal on the tree below. Follow arrows as the recursion unfolds.`);function t(h){if(!h)return;const o=v[h];a.push(h);const n=!o.left&&!o.right;s==="preorder"?(r.push(o.val),l(h,"visit",`preorder(${o.val}): VISIT ${o.val} first → output=[${r}]. ${n?"Leaf — no children.":"Go LEFT."}`),n||(t(o.left),l(h,"goRight",`Back at ${o.val}. LEFT done. Go RIGHT.`),t(o.right))):s==="inorder"?(l(h,"arrive",`inorder(${o.val}): ${n?"Leaf — VISIT immediately.":"Go LEFT first."}`),n||t(o.left),r.push(o.val),l(h,"visit",`VISIT ${o.val} → output=[${r}].${n?"":" Go RIGHT."}`),n||t(o.right)):(l(h,"arrive",`postorder(${o.val}): ${n?"Leaf — VISIT immediately.":"Go LEFT first."}`),n||(t(o.left),l(h,"goRight",`Back at ${o.val}. LEFT done. Go RIGHT.`),t(o.right)),r.push(o.val),l(h,"visit",`Both subtrees done. VISIT ${o.val} → output=[${r}].`)),a.pop()}return t(1),l(null,"done",`Complete!  ${s[0].toUpperCase()+s.slice(1)} = [${r.join(" → ")}]`),c}const _={inorder:w("inorder"),preorder:w("preorder"),postorder:w("postorder")};function $(){const s=[],c={};let r=0;const a=[4,5,2,6,7,3,1];s.push({H:{},maxDia:0,cur:null,action:"init",desc:"Compute height bottom-up (post-order). Height = max(lh,rh)+1. Diameter through node = lh + rh."});for(const l of a){const t=v[l].left?c[v[l].left]:0,h=v[l].right?c[v[l].right]:0,o=Math.max(t,h)+1,n=t+h;c[l]=o;const i=n>r;i&&(r=n),s.push({H:{...c},maxDia:r,cur:l,lh:t,rh:h,h:o,dia:n,action:i&&n>0?"newMax":n>0?"update":"leaf",desc:v[l].left?`Node ${v[l].val}: lh=${t} rh=${h}. Height=${o}. Diameter through here = ${t}+${h}=${n}.${i?" ★ New max diameter!":""}`:`Node ${v[l].val}: leaf. Height=1, diameter contribution=0.`})}return s.push({H:{...c},maxDia:r,cur:null,action:"done",desc:`Done! Tree height = ${c[1]}. Diameter = ${r} (path: 4→2→1→3→7, total ${r} edges).`}),s}const T=$();function z(s,c){var o,n;const r=[],a={},l=[];r.push({n1:s,n2:c,active:[],returns:{},lca:null,cur:null,action:"init",desc:`Find LCA of node ${s} and node ${c}. At each node: if found target → return it. If both subtrees return non-null → this node is the LCA.`});function t(i){if(!i)return null;const p=v[i];if(l.push(i),p.val===s||p.val===c)return a[i]=i,r.push({n1:s,n2:c,active:[...l],returns:{...a},lca:null,cur:i,action:"found",desc:`Node ${p.val} is one of the targets! Return node ${p.val} to parent.`}),l.pop(),i;r.push({n1:s,n2:c,active:[...l],returns:{...a},lca:null,cur:i,action:"explore",desc:`Node ${p.val}: not a target. Explore left subtree first.`});const d=t(p.left);r.push({n1:s,n2:c,active:[...l],returns:{...a},lca:null,cur:i,action:"midpoint",desc:`Back at ${p.val}. Left returned: ${d?v[d].val:"null"}. Explore right subtree.`});const u=t(p.right);let f;return d&&u?(f=i,a[i]=i,r.push({n1:s,n2:c,active:[...l],returns:{...a},lca:i,cur:i,action:"lca",desc:`Node ${p.val}: left=${v[d].val} AND right=${v[u].val} both non-null → node ${p.val} IS the LCA!`})):(f=d??u,a[i]=f,r.push({n1:s,n2:c,active:[...l],returns:{...a},lca:null,cur:i,action:"propagate",desc:`Node ${p.val}: one subtree has a target (${f?v[f].val:"none"}). Propagate upward.`})),l.pop(),f}const h=t(1);return(o=Object.entries(a).find(([,i])=>i&&r.some(p=>p.lca===+Object.keys(a).find(d=>{var u,f;return a[d]===i&&((u=v[d])==null?void 0:u.left)&&((f=v[d])==null?void 0:f.right)}))))==null||o[0],r.push({n1:s,n2:c,active:[],returns:{...a},lca:h,cur:null,action:"done",desc:`LCA(${s}, ${c}) = node ${((n=v[h])==null?void 0:n.val)??h}`}),r}const B={"4,5":z(4,5),"4,6":z(4,6),"2,7":z(2,7)};function S({highlights:s={},labels:c={},dimmed:r=new Set,width:a=620,height:l=235,showNull:t=!1}){const h={success:{fill:"#1A3A2A",stroke:"#4EC9B0",text:"#4EC9B0"},info:{fill:"#1A2A3A",stroke:"#81B4EA",text:"#9CDCFE"},warning:{fill:"#3A2A1A",stroke:"#CE9178",text:"#CE9178"},danger:{fill:"#3A1A1A",stroke:"#F44747",text:"#F44747"},purple:{fill:"#2A1A3A",stroke:"#C586C0",text:"#C586C0"},secondary:{fill:"#1A1E2E",stroke:"#3D4460",text:"#7A8599"},default:{fill:"#131722",stroke:"#1E2233",text:"#6A7490"}};return e.jsxs("svg",{width:a,height:l,viewBox:`0 0 ${a} ${l}`,style:{overflow:"visible"},children:[O.map(([o,n])=>{const[i,p]=k[o],[d,u]=k[n],f=r.has(o)||r.has(n);return e.jsx("line",{x1:i,y1:p,x2:d,y2:u,stroke:f?"#1A1E2E":"#2A3050",strokeWidth:"1.5"},`${o}-${n}`)}),Object.keys(k).map(o=>{const n=+o,[i,p]=k[n],d=h[s[n]]||h.default,u=r.has(n),f=c[n];return e.jsxs("g",{style:{opacity:u?.3:1},children:[e.jsx("circle",{cx:i,cy:p,r:"22",fill:d.fill,stroke:d.stroke,strokeWidth:s[n]?2:1}),e.jsx("text",{x:i,y:p+1,textAnchor:"middle",dominantBaseline:"middle",fill:d.text,fontSize:"13",fontFamily:"monospace",fontWeight:s[n]?700:500,children:v[n].val}),f!==void 0&&e.jsx("text",{x:i,y:p+34,textAnchor:"middle",fill:d.stroke,fontSize:"10",fontFamily:"monospace",fontWeight:"700",children:f})]},o)})]})}function D(){const[s,c]=b.useState("inorder"),[r,a]=b.useState(0),l=_[s],t=l[Math.min(r,l.length-1)],h=n=>{c(n),a(0)},o={};return t.cur&&(o[t.cur]=t.act==="visit"?"success":"info"),(t.stack||[]).forEach(n=>{o[n]||(o[n]="secondary")}),e.jsxs(q,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"},children:[["inorder","Inorder (L→R→Root→Right)"],["preorder","Preorder (Root→L→R)"],["postorder","Postorder (L→R→Root)"]].map(([n,i])=>e.jsx("button",{onClick:()=>h(n),style:{padding:"4px 11px",border:"1px solid",borderColor:s===n?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:s===n?"var(--color-background-info)":"transparent",color:s===n?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:i},n))}),e.jsx("div",{style:{marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:t.desc}),e.jsx("div",{style:{display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap"},children:e.jsx("div",{style:{flex:1,minWidth:260},children:e.jsx(S,{highlights:o,width:620,height:235})})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14,marginTop:8},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"CALL STACK"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:36},children:(t.stack||[]).length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",border:"1px dashed var(--color-border-tertiary)",padding:"4px 12px",borderRadius:6},children:"empty"}):[...t.stack||[]].reverse().map((n,i)=>e.jsxs("div",{style:{padding:"4px 10px",borderRadius:5,border:`1px solid ${i===0?"var(--color-border-info)":"var(--color-border-secondary)"}`,background:i===0?"var(--color-background-info)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:12,fontWeight:i===0?700:400,color:i===0?"var(--color-text-info)":"var(--color-text-secondary)"},children:[v[n].val,i===0&&e.jsx("span",{style:{opacity:.6,fontSize:9,marginLeft:3},children:"← top"})]},n))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"OUTPUT"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:36},children:(t.output||[]).length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)"},children:"…"}):(t.output||[]).map((n,i)=>e.jsx("div",{style:{padding:"4px 10px",borderRadius:5,border:`1px solid ${i===(t.output||[]).length-1&&t.act==="visit"?"var(--color-border-success)":"var(--color-border-secondary)"}`,background:i===(t.output||[]).length-1&&t.act==="visit"?"var(--color-background-success)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:i===(t.output||[]).length-1&&t.act==="visit"?"var(--color-text-success)":"var(--color-text-secondary)",transition:"all 0.15s"},children:n},i))})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,r-1)),r===0],["Next →",()=>a(Math.min(l.length-1,r+1)),r===l.length-1]].map(([n,i,p])=>e.jsx("button",{onClick:i,disabled:p,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:p?"not-allowed":"pointer",fontSize:12,opacity:p?.4:1},children:n},n)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[r+1,"/",l.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>a(l.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function F(){const[s,c]=b.useState(0),r=T[Math.min(s,T.length-1)],a={};r.cur&&(a[r.cur]=r.action==="newMax"?"warning":r.action==="leaf"?"secondary":"info"),r.action==="done"&&Object.keys(v).forEach(t=>{a[+t]="success"});const l={};return Object.entries(r.H).forEach(([t,h])=>{l[+t]=`h=${h}`}),e.jsxs(q,{children:[e.jsx("div",{style:{marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:r.desc}),e.jsx("div",{style:{display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap",marginBottom:12},children:e.jsx("div",{style:{flex:1,minWidth:260},children:e.jsx(S,{highlights:a,labels:l,width:620,height:260})})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[e.jsxs("div",{style:{padding:"10px 14px",borderRadius:"var(--border-radius-md)",background:r.action==="newMax"?"var(--color-background-warning)":"var(--color-background-secondary)",border:`1px solid ${r.action==="newMax"?"var(--color-border-warning)":"var(--color-border-secondary)"}`,transition:"all 0.2s"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:r.action==="newMax"?"var(--color-text-warning)":"var(--color-text-tertiary)",marginBottom:3},children:"Diameter at current node"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:22,fontWeight:700,color:r.action==="newMax"?"var(--color-text-warning)":"var(--color-text-secondary)"},children:r.dia!==void 0?`${r.lh} + ${r.rh} = ${r.dia}`:"—"})]}),e.jsxs("div",{style:{padding:"10px 14px",borderRadius:"var(--border-radius-md)",background:r.maxDia>0?"var(--color-background-success)":"var(--color-background-secondary)",border:`1px solid ${r.maxDia>0?"var(--color-border-success)":"var(--color-border-secondary)"}`},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:r.maxDia>0?"var(--color-text-success)":"var(--color-text-tertiary)",marginBottom:3},children:"Max Diameter (so far)"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:22,fontWeight:700,color:r.maxDia>0?"var(--color-text-success)":"var(--color-text-secondary)"},children:r.maxDia})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>c(Math.max(0,s-1)),s===0],["Next →",()=>c(Math.min(T.length-1,s+1)),s===T.length-1]].map(([t,h,o])=>e.jsx("button",{onClick:h,disabled:o,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:o?"not-allowed":"pointer",fontSize:12,opacity:o?.4:1},children:t},t)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[s+1,"/",T.length]}),e.jsx("button",{onClick:()=>c(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function W(){const[s,c]=b.useState("4,5"),[r,a]=b.useState(0),l=B[s],t=l[Math.min(r,l.length-1)],h=d=>{c(d),a(0)},o={},[n,i]=s.split(",").map(Number);o[n]="info",o[i]="info",(t.active||[]).forEach(d=>{o[d]||(o[d]="secondary")}),t.cur&&!o[t.cur]&&(o[t.cur]="warning"),t.lca&&(o[t.lca]="purple"),t.action==="found"&&(o[t.cur]="success");const p=[["4,5","LCA(4,5) = ?"],["4,6","LCA(4,6) = ?"],["2,7","LCA(2,7) = ?"]];return e.jsxs(q,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"},children:p.map(([d,u])=>e.jsx("button",{onClick:()=>h(d),style:{padding:"4px 11px",border:"1px solid",borderColor:s===d?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:s===d?"var(--color-background-info)":"transparent",color:s===d?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:u},d))}),e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[t.action!=="init"&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${t.action==="found"?"success":t.action==="lca"?"purple":t.action==="done"?"success":"info"})`,color:`var(--color-text-${t.action==="found"?"success":t.action==="lca"?"purple":t.action==="done"?"success":"info"})`,border:`1px solid var(--color-border-${t.action==="found"?"success":t.action==="lca"?"purple":t.action==="done"?"success":"info"})`},children:t.action==="found"?"Target found!":t.action==="lca"?"LCA Identified!":t.action==="done"?"Complete":t.action==="explore"?"Explore":"Propagate"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:t.desc})]}),e.jsx("div",{style:{marginBottom:12},children:e.jsx(S,{highlights:o,width:620,height:235})}),e.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14,fontSize:11},children:[{c:"info",l:`Targets (${n}, ${i})`},{c:"warning",l:"Current call"},{c:"secondary",l:"On call stack"},{c:"success",l:"Target found"},{c:"purple",l:"LCA result"}].map(({c:d,l:u})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[e.jsx("div",{style:{width:9,height:9,borderRadius:"50%",background:`var(--color-background-${d})`,border:`1px solid var(--color-border-${d})`}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:u})]},d))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,r-1)),r===0],["Next →",()=>a(Math.min(l.length-1,r+1)),r===l.length-1]].map(([d,u,f])=>e.jsx("button",{onClick:u,disabled:f,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:f?"not-allowed":"pointer",fontSize:12,opacity:f?.4:1},children:d},d)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r+1,"/",l.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>a(l.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}const E={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function y({num:s,title:c,difficulty:r,tags:a=[],statement:l,constraints:t=[],examples:h=[],approach:o,code:n}){const[i,p]=b.useState(!1),d=E[r]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",s]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:c})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[a.map(u=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:u},u)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${d})`,color:`var(--color-text-${d})`,border:`1px solid var(--color-border-${d})`},children:r})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:l}}),t.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:t.map((u,f)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:u},f))})]}),h.length>0&&e.jsx("div",{style:{marginBottom:14},children:h.map((u,f)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",f+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:u.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:u.output})]}),u.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:u.note})]},f))}),e.jsxs("button",{onClick:()=>p(!i),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:i?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${i?"eye-off":"bulb"}`}),i?"Hide Solution":"Show Approach & Solution"]}),i&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),o]}),e.jsx(x,{children:n})]})]})]})}function H(){return e.jsxs("div",{children:[e.jsxs(N,{color:"info",icon:"ti-binary-tree",children:["Trees are ",e.jsx("strong",{children:"non-linear, hierarchical"})," data structures. Unlike arrays and linked lists (linear), a tree node can have multiple successors — enabling O(log n) operations on organized data and natural expression of hierarchical relationships."]}),e.jsx(g,{children:"Core Terminology"}),e.jsxs(I,{cols:2,children:[e.jsx(L,{title:"Structural Terms",color:"info",children:e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,lineHeight:2},children:[e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-info)"},children:"Root:"})," top node, no parent"]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-info)"},children:"Leaf:"})," node with 0 children (degree=0)"]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-info)"},children:"Edge:"})," link between parent and child"]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-info)"},children:"Siblings:"})," nodes sharing the same parent"]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-info)"},children:"Subtree:"})," node + all its descendants"]})]})}),e.jsx(L,{title:"Measurement Terms",color:"success",children:e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,lineHeight:2},children:[e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-success)"},children:"Height:"})," edges from node to deepest leaf"]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-success)"},children:"Depth:"})," edges from root to this node"]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-success)"},children:"Degree:"})," number of direct children"]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-success)"},children:"Level:"})," depth + 1 (root = level 1)"]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"var(--color-text-success)"},children:"Width:"})," max nodes at any single level"]})]})})]}),e.jsx(g,{children:"The Sample Tree Used in All Visualizations"}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:8},children:e.jsx(S,{width:620,height:235})}),e.jsx("div",{style:{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",fontFamily:"var(--font-mono)",fontSize:12,marginBottom:16},children:[["Inorder","4→2→5→1→6→3→7"],["Preorder","1→2→4→5→3→6→7"],["Postorder","4→5→2→6→7→3→1"],["BFS","1→2→3→4→5→6→7"]].map(([s,c])=>e.jsxs("div",{style:{padding:"4px 12px",borderRadius:6,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",color:"var(--color-text-secondary)"},children:[e.jsxs("span",{style:{color:"var(--color-text-info)",fontWeight:700},children:[s,": "]}),c]},s))}),e.jsx(g,{children:"Node Definition & Input Methods"}),e.jsx(x,{children:{cpp:`// Binary Tree Node
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
}`,python:`class TreeNode:
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
    return root`}}),e.jsx(j,{q:"Why can't a unique binary tree be reconstructed from just inorder + preorder lists alone (without a second traversal)?",a:"Actually, inorder + preorder IS sufficient to uniquely reconstruct any binary tree with distinct values. What cannot work with just ONE traversal type: preorder alone or postorder alone — these are ambiguous (e.g., preorder [1,2] could be root=1,left=2 OR root=1,right=2). Also, preorder + postorder of a FULL binary tree is insufficient — knowing root + what's left vs right requires inorder to identify the split point."}),e.jsx(j,{q:"What is the difference between height and depth of a node?",a:"Depth is measured from the root DOWN to the node (root depth = 0). Height is measured from the node DOWN to the farthest leaf (leaf height = 0, or 1 if counting the node itself). The height of the TREE = height of the root. A node's level = its depth + 1. Many problems mix these — always confirm the definition: is height counting edges or nodes?"})]})}function M(){return e.jsxs("div",{children:[e.jsx(N,{color:"success",icon:"ti-git-branch",children:"Every tree algorithm is built on traversal. The four fundamental orders: Inorder (L→Root→R), Preorder (Root→L→R), Postorder (L→R→Root), and Level-order (BFS). Inorder of a BST gives sorted output — this property drives BST algorithms."}),e.jsx(g,{children:"DFS Traversal — Interactive Step-Through"}),e.jsx(m,{children:"Watch exactly how the recursive call stack builds up and unwinds. Switch between all three orders. The call stack panel shows which ancestor calls are active at each moment."}),e.jsx(D,{}),e.jsx(g,{children:"All Three DFS Traversals"}),e.jsx(x,{children:{cpp:`// Recursive — all three
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
}`,python:`def inorder  (r,res=None): res=res or[]; (inorder(r.left,res),res.append(r.val),inorder(r.right,res)) if r else None; return res
def preorder (r,res=None): res=res or[]; (res.append(r.val),preorder(r.left,res),preorder(r.right,res)) if r else None; return res
def postorder(r,res=None): res=res or[]; (postorder(r.left,res),postorder(r.right,res),res.append(r.val)) if r else None; return res

# Iterative inorder:
def inorder_iter(root):
    stack=[]; cur=root; res=[]
    while cur or stack:
        while cur: stack.append(cur); cur=cur.left
        cur=stack.pop(); res.append(cur.val); cur=cur.right
    return res`}}),e.jsx(g,{children:"BFS Level-Order Traversal (LC 102)"}),e.jsx(m,{children:"Use a queue. Two clean approaches: (1) Null marker — append null after each level to detect level boundaries. (2) Queue size snapshot — record queue size at start of each level, process exactly that many nodes."}),e.jsx(x,{children:{cpp:`// Method 2: Queue size snapshot — cleaner, no sentinel needed
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
// [[1],[2,3],[4,5,6,7]]`,python:`from collections import deque
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
    return res`}}),e.jsx(g,{children:"Print Nodes at Distance K from Root"}),e.jsx(x,{children:{cpp:`void printAtDistance(TreeNode* root, int k) {
    if (!root) return;
    if (k == 0) { cout << root->val << " "; return; }
    printAtDistance(root->left,  k - 1);
    printAtDistance(root->right, k - 1);
}
// k=2 on sample tree → prints: 4 5 6 7`,python:`def print_at_distance(root, k):
    if not root: return
    if k == 0: print(root.val, end=' '); return
    print_at_distance(root.left,  k-1)
    print_at_distance(root.right, k-1)`}}),e.jsx(j,{q:"What is the space complexity of DFS recursive traversal and why?",a:"O(h) where h = height of the tree. Each recursive call adds one frame to the call stack, and the maximum depth of recursion equals the height. For a balanced tree h = O(log n); for a degenerate (chain) tree h = O(n). The iterative inorder uses an explicit stack of the same size, so the space complexity is the same — O(h)."})]})}function P(){return e.jsxs("div",{children:[e.jsx(g,{children:"Height, Size, Diameter — One-Pass Computation"}),e.jsx(F,{}),e.jsx(x,{children:{cpp:`// Height — O(n)
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
// Call: diameterHelper(root); then use maxDia`,python:`def height(r): return 0 if not r else max(height(r.left),height(r.right))+1

def size(r): return 0 if not r else 1+size(r.left)+size(r.right)

def diameter(root):
    max_d=[0]
    def h(r):
        if not r: return 0
        lh,rh=h(r.left),h(r.right)
        max_d[0]=max(max_d[0],lh+rh)
        return max(lh,rh)+1
    h(root); return max_d[0]`}}),e.jsx(g,{children:"Balanced Binary Tree Check (LC 110)"}),e.jsx(m,{children:"Naive O(n²): call height() at every node. Optimized O(n): return -1 from height when subtree is unbalanced — this propagates failure upward without re-checking."}),e.jsx(x,{children:{cpp:`// O(n) — single DFS pass, returns -1 on imbalance
int checkBalanced(TreeNode* r) {
    if (!r) return 0;
    int lh = checkBalanced(r->left);
    if (lh == -1) return -1;            // propagate failure
    int rh = checkBalanced(r->right);
    if (rh == -1) return -1;
    if (abs(lh - rh) > 1) return -1;   // this node is unbalanced
    return max(lh, rh) + 1;            // return valid height
}
bool isBalanced(TreeNode* root) { return checkBalanced(root) != -1; }`,python:`def is_balanced(root):
    def check(r):
        if not r: return 0
        lh=check(r.left)
        if lh==-1: return -1
        rh=check(r.right)
        if rh==-1 or abs(lh-rh)>1: return -1
        return max(lh,rh)+1
    return check(root) != -1`}}),e.jsx(g,{children:"Left View & Right View"}),e.jsx(x,{children:{cpp:`// Left view: first node of each level
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
// Right view: print the LAST node per level (check i == sz-1)`,python:`from collections import deque
def left_view(root):
    if not root: return
    q=deque([root])
    while q:
        sz=len(q)
        for i in range(sz):
            n=q.popleft()
            if i==0: print(n.val,end=' ')  # first of level
            if n.left: q.append(n.left)
            if n.right: q.append(n.right)`}}),e.jsx(g,{children:"Binary Tree to Doubly Linked List (Inorder)"}),e.jsx(m,{children:"Convert the tree in-place: left pointer becomes prev, right pointer becomes next. Inorder traversal — when visiting a node, connect it to the previously visited node (tail of the partial DLL)."}),e.jsx(x,{children:{cpp:`// In-place conversion using inorder traversal
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
// Inorder of tree [4,2,5,1,6,3,7] → DLL: 4↔2↔5↔1↔6↔3↔7`,python:`def convert_to_dll(root):
    prev=[None]; head=[None]
    def inorder(node):
        if not node: return
        inorder(node.left)
        node.left=prev[0]
        if prev[0]: prev[0].right=node
        else: head[0]=node
        prev[0]=node
        inorder(node.right)
    inorder(root); return head[0]`}}),e.jsx(j,{q:"Why does the O(n) balanced tree check return the height on success and -1 on failure, instead of a boolean?",a:"Returning the height on success lets the parent node compute ITS OWN balance check in O(1) — it compares the two returned heights and checks if they differ by more than 1. If we returned only true/false, the parent would need to re-call height() separately (O(n) each), giving O(n²) total. The -1 sentinel encodes 'failure' in the same return type, letting the failure propagate up the recursion tree without extra overhead."})]})}function G(){return e.jsxs("div",{children:[e.jsx(g,{children:"Lowest Common Ancestor — Interactive"}),e.jsx(m,{children:"The elegant O(n) DFS: if a node is one of the targets, return it immediately. Otherwise, search both subtrees. If both return non-null, the current node is the LCA. If only one returns non-null, propagate it up."}),e.jsx(W,{}),e.jsx(x,{children:{cpp:`TreeNode* lca(TreeNode* root, int n1, int n2) {
    if (!root) return nullptr;
    if (root->val == n1 || root->val == n2) return root;  // found a target

    TreeNode* left  = lca(root->left,  n1, n2);
    TreeNode* right = lca(root->right, n1, n2);

    if (left && right) return root;   // n1 in left subtree, n2 in right → root IS LCA
    return left ? left : right;        // one subtree has both targets → propagate
}
// lca(root, 4, 5) → node(2)  |  lca(root, 4, 6) → node(1)`,python:`def lca(root, n1, n2):
    if not root: return None
    if root.val in (n1, n2): return root
    L = lca(root.left,  n1, n2)
    R = lca(root.right, n1, n2)
    if L and R: return root   # split point — root is LCA
    return L or R`}}),e.jsxs(N,{color:"info",icon:"ti-math",children:[e.jsx("strong",{children:"When is this algorithm correct?"})," It assumes both n1 and n2 ",e.jsx("em",{children:"exist"}),' in the tree. If a node is returned after searching only one subtree, it means either: (a) both targets are in that subtree (one will be an ancestor of the other), or (b) only that target was found (the other is absent). For the "both must exist" guarantee, the algorithm is always correct.']}),e.jsx(g,{children:"Reconstruct from Inorder + Preorder (LC 105)"}),e.jsx(m,{children:"Preorder gives the root first. Find the root in Inorder — everything left is the left subtree, everything right is the right subtree. Recurse. Use a hash map for O(1) lookups instead of O(n) linear search → total O(n)."}),e.jsx(x,{children:{cpp:`// O(n) with hash map
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
// pre=[3,9,20,15,7], ino=[9,3,15,20,7] → builds the tree uniquely`,python:`def build_from_pre_ino(preorder, inorder):
    idx={v:i for i,v in enumerate(inorder)}
    def build(ps,pe,is_,ie):
        if ps>pe: return None
        root=TreeNode(preorder[ps])
        ri=idx[preorder[ps]]; ls=ri-is_
        root.left =build(ps+1,ps+ls,is_,ri-1)
        root.right=build(ps+ls+1,pe,ri+1,ie)
        return root
    return build(0,len(preorder)-1,0,len(inorder)-1)`}}),e.jsx(g,{children:"Reconstruct from Inorder + Postorder (LC 106)"}),e.jsxs(m,{children:["Postorder gives the root ",e.jsx("em",{children:"last"}),". Process postorder from right to left — and recurse into RIGHT subtree first (since we're scanning postorder backwards)."]}),e.jsx(x,{children:{cpp:`TreeNode* buildFromPost(vector<int>& ino, vector<int>& post) {
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
}`,python:`def build_from_post_ino(inorder, postorder):
    idx={v:i for i,v in enumerate(inorder)}
    pi=[len(postorder)-1]
    def build(lo,hi):
        if lo>hi: return None
        val=postorder[pi[0]]; pi[0]-=1
        r=TreeNode(val); mid=idx[val]
        r.right=build(mid+1,hi)  # right first!
        r.left =build(lo,mid-1)
        return r
    return build(0,len(inorder)-1)`}}),e.jsx(j,{q:"Why must we recurse into the right subtree first when using inorder + postorder?",a:"In postorder, elements are arranged [left-subtree | right-subtree | root]. Reading postorder backwards gives [root | right-subtree | left-subtree]. After picking the root (rightmost element), the next rightmost elements belong to the RIGHT subtree. So when scanning postorder backwards, we must recurse into the right subtree first to consume its elements in the correct order before processing the left subtree."})]})}function V(){return e.jsxs("div",{children:[e.jsx(g,{children:"Spiral / Zigzag Level-Order Traversal (LC 103)"}),e.jsx(m,{children:"Two-stack approach: S1 processes left-to-right levels (push children right then left); S2 processes right-to-left levels (push children left then right). Alternate between stacks each level."}),e.jsx(x,{children:{cpp:`vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
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
// [[1],[3,2],[4,5,6,7]]  (level 1: L-to-R, level 2: R-to-L, level 3: L-to-R)`,python:`from collections import deque
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
    return res`}}),e.jsx(g,{children:"Count Nodes in a Complete Binary Tree — O(log² n)"}),e.jsxs(m,{children:["In a complete binary tree, if left height == right height, the left subtree is a perfect binary tree: count = ",e.jsx(R,{children:"2^{lh} - 1 + 1 + \\text{rightCount}"}),". Otherwise, the right subtree at the second-to-last level is a perfect tree. Recursion only on one side per level."]}),e.jsx(x,{children:{cpp:`int countNodes(TreeNode* root) {
    if (!root) return 0;
    int lh=0, rh=0;
    TreeNode* l=root, *r=root;
    while (l) { lh++; l=l->left; }   // leftmost height
    while (r) { rh++; r=r->right; }  // rightmost height
    if (lh == rh) return (1<<lh)-1;  // perfect binary tree: 2^h - 1 nodes
    return 1 + countNodes(root->left) + countNodes(root->right);
}
// T(n) = T(n/2) + O(log n) → O(log² n)`,python:`def count_nodes(root):
    if not root: return 0
    lh=rh=0; l=r=root
    while l: lh+=1; l=l.left
    while r: rh+=1; r=r.right
    if lh==rh: return (1<<lh)-1   # perfect BT
    return 1+count_nodes(root.left)+count_nodes(root.right)`}}),e.jsx(g,{children:"Serialize and Deserialize a Binary Tree (LC 297)"}),e.jsx(m,{children:'Convert the tree to a string for storage/transmission using preorder traversal. NULL pointers are encoded as a sentinel (e.g., "N"). Deserialize by reading the string back in the same preorder sequence.'}),e.jsx(x,{children:{cpp:`// Serialize: preorder with "N" for null
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
// Tree [1,2,3,N,N,4,5] → "1,2,N,N,3,4,N,N,5,N,N,"`,python:`class Codec:
    def serialize(self, root):
        if not root: return 'N,'
        return str(root.val)+','+self.serialize(root.left)+self.serialize(root.right)
    def deserialize(self, data):
        tokens=iter(data.split(','))
        def build():
            v=next(tokens)
            if v=='N': return None
            r=TreeNode(int(v)); r.left=build(); r.right=build(); return r
        return build()`}}),e.jsx(j,{q:"Why does the O(log² n) algorithm work for counting nodes in a complete binary tree?",a:"A complete binary tree has all levels full except possibly the last, which is filled left-to-right. The key insight: if the leftmost path and rightmost path have the same height, the tree is PERFECT (all nodes present) and count = 2^h - 1. Otherwise, exactly one subtree (left or right) is a perfect tree and can be counted in O(1). We recurse only on the non-perfect subtree. At each level we do O(log n) work (measuring heights). Depth = O(log n) levels → T(n) = O(log² n)."})]})}function U(){return e.jsxs("div",{children:[e.jsx(N,{color:"purple",icon:"ti-tournament",children:"6 tree problems spanning traversal, construction, and path algorithms — all high-frequency in FAANG and IIT OAs."}),e.jsx(y,{num:1,title:"Binary Tree Level Order Traversal",difficulty:"LC Medium",tags:["LC 102","BFS"],statement:"Given the root of a binary tree, return the level order traversal of its values — each level as a separate subarray.",constraints:["0 ≤ nodes ≤ 2000","-1000 ≤ val ≤ 1000"],examples:[{input:"[3,9,20,null,null,15,7]",output:"[[3],[9,20],[15,7]]"},{input:"[1]",output:"[[1]]"}],approach:"BFS with queue. At each iteration, take a 'snapshot' of the current queue size — that's exactly how many nodes are in the current level. Process exactly that many nodes, then start a new level array. O(n) time, O(n) space (queue holds at most n/2 nodes at the last level).",code:{cpp:`vector<vector<int>> levelOrder(TreeNode* root){
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
    return res`}}),e.jsx(y,{num:2,title:"Maximum Depth of Binary Tree",difficulty:"OA Easy",tags:["LC 104","DFS"],statement:"Given the root of a binary tree, return its maximum depth — the number of nodes on the longest path from root to leaf.",constraints:["0 ≤ nodes ≤ 10⁴","-100 ≤ val ≤ 100"],examples:[{input:"[3,9,20,null,null,15,7]",output:"3"},{input:"[1,null,2]",output:"2"}],approach:"Recursive: height(node) = 0 if null, else max(height(left), height(right)) + 1. The +1 counts this node itself. Iterative BFS: count the number of levels (level-order traversal). O(n) time, O(h) space.",code:{cpp:"int maxDepth(TreeNode* r){return !r?0:max(maxDepth(r->left),maxDepth(r->right))+1;}",python:"def max_depth(r): return 0 if not r else max(max_depth(r.left),max_depth(r.right))+1"}}),e.jsx(y,{num:3,title:"Diameter of Binary Tree",difficulty:"LC Medium",tags:["LC 543","Modified Height"],statement:"Given a binary tree, return the <strong>diameter</strong> — the length (in edges) of the longest path between any two nodes. The path may not pass through the root.",constraints:["1 ≤ nodes ≤ 10⁴","-100 ≤ val ≤ 100"],examples:[{input:"[1,2,3,4,5]",output:"3",note:"Path: 4→2→1→3 or 5→2→1→3"},{input:"[1,2]",output:"1"}],approach:"Modify the height function to track diameter. At each node: diameter through here = left_height + right_height. Update global max. Return max(lh,rh)+1 as height for parent. Single O(n) DFS — no separate height calls.",code:{cpp:`int diameterOfBinaryTree(TreeNode* root){
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
    h(root); return mx[0]`}}),e.jsx(y,{num:4,title:"Lowest Common Ancestor of Binary Tree",difficulty:"LC Medium",tags:["LC 236","DFS"],statement:"Given a binary tree and two nodes <code>p</code> and <code>q</code>, return their <strong>lowest common ancestor</strong> — the deepest node that is an ancestor of both.",constraints:["2 ≤ nodes ≤ 10⁵","All values unique","p ≠ q","Both p and q exist in tree"],examples:[{input:"p=5, q=1",output:"3",note:"LCA of 5 and 1 is the root 3"},{input:"p=5, q=4",output:"5",note:"5 is ancestor of 4, so LCA=5"}],approach:"Single DFS: return a node if it's p or q. After exploring both subtrees, if both return non-null → current node is LCA. Otherwise propagate whichever subtree returned non-null. O(n) time, O(h) space.",code:{cpp:`TreeNode* lowestCommonAncestor(TreeNode* r,TreeNode* p,TreeNode* q){
    if(!r||r==p||r==q)return r;
    auto L=lowestCommonAncestor(r->left,p,q);
    auto R=lowestCommonAncestor(r->right,p,q);
    return(L&&R)?r:(L?L:R);
}`,python:`def lca(root,p,q):
    if not root or root is p or root is q:return root
    L=lca(root.left,p,q); R=lca(root.right,p,q)
    return root if(L and R)else(L or R)`}}),e.jsx(y,{num:5,title:"Construct Binary Tree from Preorder and Inorder",difficulty:"LC Medium",tags:["LC 105","Tree Construction"],statement:"Given two integer arrays <code>preorder</code> and <code>inorder</code>, construct and return the binary tree. All values are unique.",constraints:["1 ≤ n ≤ 3000","-3000 ≤ values ≤ 3000","preorder and inorder are permutations of the same values"],examples:[{input:"preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]",output:"Tree: [3,9,20,null,null,15,7]"}],approach:"preorder[0] = root. Find root in inorder → left subtree has (rootIdx - inStart) nodes. Recurse: left = build(preorder[1..leftSize], inorder[inStart..rootIdx-1]), right = build(preorder[leftSize+1..], inorder[rootIdx+1..inEnd]). Use hash map for O(1) inorder lookup → O(n) total vs O(n²) without it.",code:{cpp:`TreeNode* buildTree(vector<int>& pre,vector<int>& ino){
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
    return b(0,len(preorder)-1,0,len(inorder)-1)`}}),e.jsx(y,{num:6,title:"Path Sum II",difficulty:"LC Medium",tags:["LC 113","DFS + Backtracking"],statement:"Given the root of a binary tree and an integer <code>targetSum</code>, return all root-to-leaf paths where the sum of node values equals targetSum.",constraints:["0 ≤ nodes ≤ 5000","-1000 ≤ val ≤ 1000","-1000 ≤ targetSum ≤ 1000"],examples:[{input:"root=[5,4,8,11,null,13,4,7,2,null,null,5,1], target=22",output:"[[5,4,11,2],[5,8,4,5]]"}],approach:"DFS backtracking: at each node, add to current path and subtract from remaining. At a leaf, if remaining == 0, emit current path copy. On return, pop from path (backtrack). O(n×h) time where h = height (copying each valid path takes O(h)).",code:{cpp:`void dfs(TreeNode* r,int rem,vector<int>& path,vector<vector<int>>& res){
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
    dfs(root,target);return res`}})]})}const Q=[{id:"fundamentals",label:"Fundamentals"},{id:"traversals",label:"Traversals"},{id:"properties",label:"Properties & Metrics"},{id:"reconstruction",label:"LCA & Reconstruction"},{id:"advanced",label:"Advanced Algorithms"},{id:"problems",label:"Problems"}];function X(){const[s,c]=b.useState("fundamentals"),r={fundamentals:e.jsx(H,{}),traversals:e.jsx(M,{}),properties:e.jsx(P,{}),reconstruction:e.jsx(G,{}),advanced:e.jsx(V,{}),problems:e.jsx(U,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 17"}),e.jsx("h1",{className:"page-header-title",children:"Trees"}),e.jsx("p",{className:"page-header-subtitle",children:"BFS/DFS Traversals · Height · Diameter · Balanced Check · LCA · Tree Reconstruction · BT to DLL · Zigzag · Serialization"})]}),e.jsx(C,{tabs:Q,active:s,onChange:c}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[s]}),e.jsx(A,{moduleId:17})]})}export{X as default};
