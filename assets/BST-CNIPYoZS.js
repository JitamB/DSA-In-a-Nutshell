import{r as x,j as e}from"./index-D9jkHkZY.js";import{S as re,N as te,d as O,H as g,P as S,T as Z,a as m,G as J,C as I,Q as E,V as $}from"./SectionNav-BHzhBu3R.js";function N(r,n){return r?n<r.val?{...r,left:N(r.left,n)}:n>r.val?{...r,right:N(r.right,n)}:r:{val:n,left:null,right:null}}function D(r,n,d=[]){if(!r)return{found:!1,path:d};const a=[...d,r.val];return r.val===n?{found:!0,path:a}:n<r.val?D(r.left,n,a):D(r.right,n,a)}function H(r,n=0,d=600,a=0,p={}){if(!r)return p;const v=(n+d)/2;return p[r.val]={x:v,y:a*68+35},H(r.left,n,v,a+1,p),H(r.right,v,d,a+1,p),p}function z(r,n=[]){return r&&(r.left&&(n.push([r.val,r.left.val]),z(r.left,n)),r.right&&(n.push([r.val,r.right.val]),z(r.right,n))),n}function W(r,n=[]){return r&&(n.push(r.val),W(r.left,n),W(r.right,n)),n}const X=[50,30,70,10,40,60,80].reduce(N,null),q={50:[300,35],30:[165,110],70:[435,110],10:[85,190],40:[245,190],60:[370,190],80:[500,190],35:[185,270]},b=[[50,30],[50,70],[30,10],[30,40],[70,60],[70,80],[40,35]],oe={leaf:[{hl:{35:"info"},edges:b,dim:new Set,desc:"Target = 35. Search: 50→30→40→35. Found: node 35 is a LEAF (no children)."},{hl:{35:"warning"},edges:b,dim:new Set,desc:"Leaf deletion: simply remove the node. No pointer updates needed except parent (40.left = null)."},{hl:{40:"success"},edges:b.filter(r=>!(r[0]===40&&r[1]===35)),dim:new Set([35]),desc:"Done! 35 removed. 40's left pointer set to null. All BST properties preserved. O(h) total."}],oneChild:[{hl:{40:"info"},edges:b,dim:new Set,desc:"Target = 40. Search: 50→30→40. Found: node 40 has exactly ONE child (left child: 35)."},{hl:{40:"warning",35:"success",30:"info"},edges:b,dim:new Set,desc:"Single-child deletion: bypass 40 by linking parent (30) directly to 40's only child (35)."},{hl:{35:"success",30:"success"},edges:[...b.filter(r=>r[0]!==30||r[1]!==40),[30,35]],dim:new Set([40]),desc:"Done! 30→right now points to 35. Node 40 removed. BST property: 35 < 50 ✓"}],twoChildren:[{hl:{30:"info"},edges:b,dim:new Set,desc:"Target = 30. Found: node 30 has TWO children (10 and 40-with-35). Need inorder successor."},{hl:{30:"info",40:"warning",35:"warning"},edges:b,dim:new Set,desc:"Find successor: go RIGHT to 40, then go LEFT as far as possible. 40→left = 35, 35→left = null. Successor = 35."},{hl:{30:"warning",35:"purple"},edges:b,dim:new Set,desc:"Copy successor value (35) into target node (30). Node position unchanged — only the VALUE is overwritten."},{hl:{35:"danger"},edges:b,dim:new Set,desc:"Now delete the ORIGINAL successor node (35) from its location. It's a leaf — simple removal."},{hl:{10:"success",40:"success"},edges:b.filter(r=>!(r[0]===40&&r[1]===35)),dim:new Set([35]),desc:'Done! The "30" node now holds value 35. Original 35 leaf removed. BST order verified: 10 < 35 < 40 ✓'}]},_={50:[300,35],30:[175,110],70:[425,110],10:[90,190],40:[260,190],60:[370,190],80:[510,190]},ne=[[50,30],[50,70],[30,10],[30,40],[70,60],[70,80]],U={50:0,30:-1,70:1,10:-2,40:0,60:0,80:2},Q={hd:{label:"Assign HD",title:"Horizontal Distance Assignment",desc:"Root = 0. Left child: parent HD − 1. Right child: parent HD + 1. Same HD = same vertical column."},top:{label:"Top View",title:"Top View",desc:"Top view: first BFS-visible node at each HD. Looking from above, higher nodes block lower ones. Result: 10, 30, 50, 70, 80."},bottom:{label:"Bottom View",title:"Bottom View",desc:"Bottom view: last BFS node at each HD. HD=0 has 50 (level 0), 40 (level 2), 60 (level 2). BFS order makes 60 the last → bottom view at HD=0 is 60. Result: 10, 30, 60, 70, 80."},vsum:{label:"Vertical Sum",title:"Vertical Sum",desc:"Sum of all nodes at each HD. HD=0: 50+40+60=150. Useful in interval problems."},left:{label:"Left View",title:"Left View",desc:"First node at each LEVEL (BFS snapshot). Level 0:50, Level 1:30, Level 2:10. Result: 50, 30, 10."},right:{label:"Right View",title:"Right View",desc:"Last node at each LEVEL. Level 0:50, Level 1:70, Level 2:80. Result: 50, 70, 80."}};function ie(){const[r,n]=x.useState(X),[d,a]=x.useState(""),[p,v]=x.useState(""),[j,y]=x.useState([]),[c,t]=x.useState(null),[s,i]=x.useState(null),[l,f]=x.useState("BST initialized with [50,30,70,10,40,60,80]. Height = 3. All O(log n) operations."),u=H(r),B=z(r),T=W(r),L=o=>o?Math.max(L(o.left),L(o.right))+1:0,M=L(r),G=x.useCallback(()=>{const o=parseInt(d);if(!isNaN(o)){if(T.includes(o)){f(`${o} already exists in BST.`),a("");return}if(T.length>=12){f("Demo limited to 12 nodes for clarity."),a("");return}n(h=>N(h,o)),i(o),y([]),t(null),f(`Inserted ${o}. New height = ${L(N(r,o))}. ${o<(r==null?void 0:r.val)?`${o} < root(${r==null?void 0:r.val}) → went LEFT`:`${o} > root(${r==null?void 0:r.val}) → went RIGHT`}`),a("")}},[d,r,T]),P=x.useCallback(()=>{const o=parseInt(p);if(isNaN(o))return;const h=D(r,o);y(h.path),t(h.found?o:null),i(null),f(h.found?`Found ${o}! Path: ${h.path.join(" → ")} (${h.path.length} comparisons)`:`${o} not in BST. Searched: ${h.path.join(" → ")} → null`),v("")},[p,r]),Y=()=>{const o=[10,20,30,40,50];let h=null;o.forEach(w=>{h=N(h,w)}),n(h),y([]),t(null),i(null),f("Inserted [10,20,30,40,50] in sorted order → degenerate tree! Height = 5 = n. O(n) operations — worst case!")},ee=()=>{n(X),y([]),t(null),i(null),f("Reset to balanced BST [50,30,70,10,40,60,80]. Height = 3.")},K=Math.max(240,M*68+50);return e.jsxs($,{children:[e.jsx("div",{style:{marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:l}),e.jsx("div",{style:{overflowX:"auto",marginBottom:12},children:e.jsxs("svg",{width:"600",height:K,viewBox:`0 0 600 ${K}`,children:[B.map(([o,h])=>{const w=u[o],k=u[h];return w&&k?e.jsx("line",{x1:w.x,y1:w.y,x2:k.x,y2:k.y,stroke:"#2A3050",strokeWidth:"1.5"},`${o}-${h}`):null}),T.map(o=>{const h=u[o];if(!h)return null;const w=j.includes(o),k=c===o,V=s===o;let R="#131722",C="#1E2233",F="#6A7490";return k?(R="#1A3A2A",C="#4EC9B0",F="#4EC9B0"):V?(R="#1A2A3A",C="#81B4EA",F="#9CDCFE"):w&&(R="#3A2A1A",C="#CE9178",F="#CE9178"),e.jsxs("g",{children:[e.jsx("circle",{cx:h.x,cy:h.y,r:"21",fill:R,stroke:C,strokeWidth:w||k||V?2:1}),e.jsx("text",{x:h.x,y:h.y+1,textAnchor:"middle",dominantBaseline:"middle",fill:F,fontSize:"13",fontFamily:"monospace",fontWeight:w||k||V?700:500,children:o})]},o)})]})}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10},children:[e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("input",{type:"number",value:d,onChange:o=>a(o.target.value),placeholder:"value",onKeyDown:o=>o.key==="Enter"&&G(),style:{width:72,padding:"5px 8px",background:"#0D0F18",border:"1px solid #1E2233",borderRadius:"var(--border-radius-md)",color:"var(--color-text-primary)",fontFamily:"var(--font-mono)",fontSize:13,outline:"none"}}),e.jsx("button",{onClick:G,style:{padding:"6px 12px",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",background:"var(--color-background-success)",color:"var(--color-text-success)",cursor:"pointer",fontSize:12,fontWeight:600},children:"Insert"})]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("input",{type:"number",value:p,onChange:o=>v(o.target.value),placeholder:"search",onKeyDown:o=>o.key==="Enter"&&P(),style:{width:72,padding:"5px 8px",background:"#0D0F18",border:"1px solid #1E2233",borderRadius:"var(--border-radius-md)",color:"var(--color-text-primary)",fontFamily:"var(--font-mono)",fontSize:13,outline:"none"}}),e.jsx("button",{onClick:P,style:{padding:"6px 12px",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",background:"var(--color-background-info)",color:"var(--color-text-info)",cursor:"pointer",fontSize:12,fontWeight:600},children:"Search"})]}),e.jsx("button",{onClick:Y,style:{padding:"6px 12px",border:"1px solid var(--color-border-warning)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-warning)",cursor:"pointer",fontSize:12},children:"⚠ Insert Sorted [10..50]"}),e.jsx("button",{onClick:ee,style:{padding:"6px 12px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺ Reset"})]}),e.jsxs("div",{style:{display:"flex",gap:12,fontSize:11,fontFamily:"var(--font-mono)"},children:[[{c:"info",l:"Inserted"},{c:"warning",l:"Search path"},{c:"success",l:"Found"}].map(({c:o,l:h})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("div",{style:{width:9,height:9,borderRadius:"50%",background:`var(--color-background-${o})`,border:`1px solid var(--color-border-${o})`}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:h})]},o)),e.jsxs("span",{style:{color:"var(--color-text-tertiary)",marginLeft:8},children:["n=",T.length,"  h=",M]})]})]})}function se(){const[r,n]=x.useState("leaf"),[d,a]=x.useState(0),p=oe[r],v=p[Math.min(d,p.length-1)],j=c=>{n(c),a(0)},y={info:"info",warning:"warning",success:"success",danger:"danger",purple:"purple"};return e.jsxs($,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:14},children:[["leaf","Delete Leaf (35)"],["oneChild","One Child (40)"],["twoChildren","Two Children (30)"]].map(([c,t])=>e.jsx("button",{onClick:()=>j(c),style:{padding:"4px 11px",border:"1px solid",borderColor:r===c?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:r===c?"var(--color-background-info)":"transparent",color:r===c?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:t},c))}),e.jsx("div",{style:{marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:v.desc}),e.jsx("div",{style:{marginBottom:14,overflowX:"auto"},children:e.jsxs("svg",{width:"600",height:"310",viewBox:"0 0 600 310",children:[v.edges.map(([c,t])=>{const s=q[c],i=q[t];return!s||!i?null:e.jsx("line",{x1:s[0],y1:s[1],x2:i[0],y2:i[1],stroke:"#2A3050",strokeWidth:"1.5"},`${c}-${t}`)}),Object.keys(q).map(c=>{const t=+c,[s,i]=q[t],l=v.hl[t],f=v.dim.has(t),u=y[l]||null,B=u?`var(--color-background-${u})`:"#131722",T=u?`var(--color-border-${u})`:"#1E2233",L=u?`var(--color-text-${u})`:"#6A7490";return e.jsxs("g",{style:{opacity:f?.15:1,transition:"opacity 0.3s"},children:[e.jsx("circle",{cx:s,cy:i,r:"22",fill:B,stroke:T,strokeWidth:u?2:1}),e.jsx("text",{x:s,y:i+1,textAnchor:"middle",dominantBaseline:"middle",fill:L,fontSize:"13",fontFamily:"monospace",fontWeight:u?700:500,children:c})]},c)})]})}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,d-1)),d===0],["Next →",()=>a(Math.min(p.length-1,d+1)),d===p.length-1]].map(([c,t,s])=>e.jsx("button",{onClick:t,disabled:s,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:s?"not-allowed":"pointer",fontSize:12,opacity:s?.4:1},children:c},c)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[d+1,"/",p.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function le(){const[r,n]=x.useState("hd"),d=Q[r],a={"-2":"info","-1":"warning",0:"success",1:"purple",2:"danger"},p=t=>{const s=U[t],i=String(s);return r==="hd"?a[i]||"secondary":r==="top"?[10,30,50,70,80].includes(t)?a[i]:"secondary":r==="bottom"?[10,30,60,70,80].includes(t)?a[i]:"secondary":r==="vsum"?a[i]||"secondary":r==="left"?[50,30,10].includes(t)?"success":"secondary":r==="right"&&[50,70,80].includes(t)?"success":"secondary"},v=r==="hd"?Object.fromEntries(Object.entries(U).map(([t,s])=>[t,`hd=${s}`])):{},j=[-2,-1,0,1,2],y={"-2":[10],"-1":[30],0:[50,40,60],1:[70],2:[80]},c=Object.fromEntries(Object.entries(y).map(([t,s])=>[t,s.reduce((i,l)=>i+l,0)]));return e.jsxs($,{children:[e.jsx("div",{style:{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"},children:Object.entries(Q).map(([t,s])=>e.jsx("button",{onClick:()=>n(t),style:{padding:"4px 10px",border:"1px solid",borderColor:r===t?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:r===t?"var(--color-background-info)":"transparent",color:r===t?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:s.label},t))}),e.jsxs("div",{style:{marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:[e.jsxs("strong",{style:{color:"var(--color-text-primary)"},children:[d.title,":"]})," ",d.desc]}),e.jsxs("svg",{width:"600",height:"230",viewBox:"0 0 600 230",style:{marginBottom:12},children:[ne.map(([t,s])=>{const i=_[t],l=_[s];return e.jsx("line",{x1:i[0],y1:i[1],x2:l[0],y2:l[1],stroke:"#2A3050",strokeWidth:"1.5"},`${t}-${s}`)}),Object.keys(_).map(t=>{const s=+t,[i,l]=_[s],f=p(s),u=f==="secondary",B=v[t];return e.jsxs("g",{children:[e.jsx("circle",{cx:i,cy:l,r:"22",fill:u?"#131722":`var(--color-background-${f})`,stroke:u?"#1E2233":`var(--color-border-${f})`,strokeWidth:u?1:2}),e.jsx("text",{x:i,y:l+1,textAnchor:"middle",dominantBaseline:"middle",fill:u?"#4A5170":`var(--color-text-${f})`,fontSize:"13",fontFamily:"monospace",fontWeight:u?400:700,children:t}),B&&e.jsx("text",{x:i,y:l+32,textAnchor:"middle",fill:`var(--color-text-${f})`,fontSize:"10",fontFamily:"monospace",fontWeight:"700",children:B})]},t)})]}),(r==="hd"||r==="top"||r==="bottom"||r==="vsum")&&e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap"},children:j.map(t=>{const s=String(t),i=a[s]||"secondary",l=y[s]||[],f=r==="top"?l.slice(0,1):r==="bottom"?t===0?[60]:l.slice(-1):l;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"8px 12px",borderRadius:"var(--border-radius-md)",background:`var(--color-background-${i})`,border:`1px solid var(--color-border-${i})`,minWidth:80},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:`var(--color-text-${i})`,fontWeight:700},children:["HD = ",t]}),e.jsx("div",{style:{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"center"},children:l.map(u=>e.jsx("span",{style:{padding:"2px 7px",borderRadius:4,background:r==="vsum"?"transparent":f.includes(u)?`var(--color-border-${i})`:"transparent",border:`1px solid var(--color-border-${i})`,fontFamily:"var(--font-mono)",fontSize:12,fontWeight:700,color:`var(--color-text-${i})`},children:u},u))}),r==="vsum"&&e.jsxs("div",{style:{fontSize:13,fontFamily:"var(--font-mono)",fontWeight:700,color:`var(--color-text-${i})`,borderTop:`1px solid var(--color-border-${i})`,paddingTop:4,width:"100%",textAlign:"center"},children:["Σ=",c[s]]})]},t)})})]})}const ae={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function A({num:r,title:n,difficulty:d,tags:a=[],statement:p,constraints:v=[],examples:j=[],approach:y,code:c}){const[t,s]=x.useState(!1),i=ae[d]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",r]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:n})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[a.map(l=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:l},l)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${i})`,color:`var(--color-text-${i})`,border:`1px solid var(--color-border-${i})`},children:d})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:p}}),v.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:v.map((l,f)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:l},f))})]}),j.length>0&&e.jsx("div",{style:{marginBottom:14},children:j.map((l,f)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",f+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:l.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:l.output})]}),l.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:l.note})]},f))}),e.jsxs("button",{onClick:()=>s(!t),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:t?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${t?"eye-off":"bulb"}`}),t?"Hide Solution":"Show Approach & Solution"]}),t&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),y]}),e.jsx(m,{children:c})]})]})]})}function de(){return e.jsxs("div",{children:[e.jsxs(O,{color:"info",icon:"ti-binary-tree-2",children:["A BST is a binary tree where ",e.jsx("strong",{children:"every left descendant < node < every right descendant"}),". This property — maintained through insertions — makes searching, insertion, and deletion all O(log n) on a balanced tree, matching a sorted array's search speed while beating its insert/delete cost."]}),e.jsx(g,{children:"Performance Spectrum — Why BST?"}),e.jsx(Z,{heads:["Operation","Unsorted Array/LL","Sorted Array","Balanced BST","Hash Table"],rows:[["Search","O(n)","O(log n)","O(log n)","O(1)"],["Insert","O(1)","O(n)","O(log n)","O(1)"],["Delete","O(n)","O(n)","O(log n)","O(1)"],["Find Closest","O(n)","O(log n)","O(log n)","O(n)"],["Sorted Traversal","O(n log n)","O(n)","O(n)","O(n log n)"]]}),e.jsxs(O,{color:"warning",icon:"ti-bulb",children:[e.jsx("strong",{children:"When to use BST over hash table:"})," When you need ordered operations — finding floor/ceil, kth smallest, range queries, or sorted traversal. Hash tables win for pure lookup/insert but offer no ordering guarantee."]}),e.jsx(g,{children:"Interactive BST — Insert, Search, Observe"}),e.jsx(S,{children:'Insert values and watch the BST grow. Click "⚠ Insert Sorted" to see how inserting sorted data degenerates the tree to a linked list — height O(n) instead of O(log n). This is why balanced BSTs (AVL, Red-Black) exist.'}),e.jsx(ie,{}),e.jsx(g,{children:"Search and Insertion"}),e.jsx(m,{children:{cpp:`// Search — O(h): follow BST property at each node
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
}`,python:`def search(r, key):
    if not r or r.val == key: return r
    return search(r.left,key) if key<r.val else search(r.right,key)

def insert(r, val):
    if not r: return TreeNode(val)
    if val<r.val: r.left=insert(r.left,val)
    elif val>r.val: r.right=insert(r.right,val)
    return r`}}),e.jsx(g,{children:"Floor and Ceil of a BST"}),e.jsxs(S,{children:[e.jsx("strong",{children:"Floor(x):"})," largest value ≤ x in the BST. ",e.jsx("strong",{children:"Ceil(x):"})," smallest value ≥ x. At each node: if node.val matches, return it. Otherwise, navigate left/right based on comparison and track candidates."]}),e.jsx(m,{children:{cpp:`// Floor: largest value ≤ x
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
// ceil(root, 35)  = 40  |  ceil(root, 80)  = 80`,python:`def floor_bst(r, x):
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
    return r.val if lc == -1 else lc`}}),e.jsx(g,{children:"Ceiling on Left Side — BST as Running Index"}),e.jsx(S,{children:"For each element in a stream, find the ceiling of the set of all previous elements. Maintain a BST of seen elements. For each new element, find its ceiling in the current BST, then insert it."}),e.jsx(m,{children:{cpp:`// O(n log n) — BST maintains elements seen so far
vector<int> ceilOnLeft(vector<int>& arr) {
    vector<int> res; TreeNode* root = nullptr;
    for (int x : arr) {
        int c = ceil(root, x);   // O(log n) ceiling query
        res.push_back(c);        // -1 if no ceiling exists yet
        root = insert(root, x);  // O(log n) insertion
    }
    return res;
}
// [2,8,30,15,25,12] → [-1,-1,-1,30,30,15]`,python:`def ceil_on_left(arr):
    res=[]; root=None
    for x in arr:
        res.append(ceil_bst(root,x))
        root=insert(root,x)
    return res`}}),e.jsx(E,{q:"What makes a BST degenerate, and what's the actual worst-case height?",a:"A BST degenerates when insertions are monotonically increasing or decreasing — e.g., inserting [1,2,3,4,5] in order creates a right-skewed 'vine' of height n-1. Every operation becomes O(n). This is exactly the performance of a linked list. Balanced BSTs (AVL, Red-Black) prevent this by enforcing height bounds after each insertion/deletion."})]})}function ce(){return e.jsxs("div",{children:[e.jsx(g,{children:"BST Deletion — Three Cases"}),e.jsxs(S,{children:["Deletion is the hardest BST operation. The two-children case requires finding the ",e.jsx("em",{children:"inorder successor"})," (leftmost node of right subtree) or ",e.jsx("em",{children:"inorder predecessor"})," (rightmost node of left subtree), copying its value, then deleting that simpler node (which has at most one child)."]}),e.jsx(se,{}),e.jsx(m,{children:{cpp:`TreeNode* deleteNode(TreeNode* r, int key) {
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
}`,python:`def delete_bst(r, key):
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
    return r`}}),e.jsx(O,{color:"info",icon:"ti-bulb",children:"Both successor and predecessor work for the two-children case. The successor keeps the BST property: succ > all left subtree nodes and succ ≤ all right subtree nodes (except former successors). Either choice produces a valid BST."}),e.jsx(g,{children:"Validate BST — Two Clean Approaches"}),e.jsxs(J,{cols:2,children:[e.jsx(I,{title:"Range Bounding — O(n)",color:"success",children:"Pass (min, max) bounds to each node. Every node must satisfy min < node.val < max. Left child inherits max = node.val; right child inherits min = node.val."}),e.jsx(I,{title:"Inorder + prev — O(n)",color:"info",children:"Inorder traversal of a valid BST gives strictly increasing values. Track the previous value; if current ≤ prev, it's not a valid BST."})]}),e.jsx(m,{children:{cpp:`// Method 1: Range bounding
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
}`,python:`def is_bst(r, mn=float('-inf'), mx=float('inf')):
    if not r: return True
    if not (mn < r.val < mx): return False
    return is_bst(r.left,mn,r.val) and is_bst(r.right,r.val,mx)

# Inorder method:
def is_bst_inorder(r, prev=[float('-inf')]):
    if not r: return True
    if not is_bst_inorder(r.left,prev): return False
    if r.val <= prev[0]: return False
    prev[0]=r.val
    return is_bst_inorder(r.right,prev)`}}),e.jsx(g,{children:"Fix BST with Two Swapped Nodes (LC 99)"}),e.jsx(S,{children:"Two nodes have been swapped, breaking the BST. During inorder traversal (which should be increasing), the two swapped nodes produce anomalies: either two inversions (non-adjacent swap) or one (adjacent swap). Track prev, first violation, second violation, then swap their keys back."}),e.jsx(m,{children:{cpp:`TreeNode *first=nullptr, *second=nullptr, *prev=nullptr;
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
// [3,1,2] (3↔2 swapped) → inorder gives 1,3,2 → first=3,second=2 → swap → [2,1,3]`,python:`def recover_tree(root):
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
    first[0].val,second[0].val=second[0].val,first[0].val`}}),e.jsx(g,{children:"Kth Smallest with Augmented BST"}),e.jsxs(S,{children:["Standard approach: inorder traversal gives sorted order → pick kth element. O(n). With augmented BST (store left-subtree size ",e.jsx("code",{children:"lcount"})," per node): find kth in O(h) = O(log n) by comparing k with the rank of each node."]}),e.jsx(m,{children:{cpp:`// Node augmented with lcount = size of left subtree
int kthSmallest(AugNode* r, int k) {
    int rank = r->lcount + 1;    // this node's rank (1-indexed)
    if (k == rank) return r->val;
    if (k < rank)  return kthSmallest(r->left,  k);
    return kthSmallest(r->right, k - rank);  // subtract left subtree + root
}
// Without augmentation: do inorder, pick kth. O(n).
// With augmentation:    O(h) = O(log n) for balanced BST.`,python:`# Inorder approach — simple O(n)
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
        cur=cur.right`}}),e.jsx(E,{q:"Why does the inorder 'prev' approach work for validating BST but fail for the 'fix two swapped nodes' problem in some cases?",a:"For validation, a single violation terminates the check. For fixing, we need to find BOTH swapped nodes across the entire traversal. For non-adjacent swaps (e.g., 1,5,3,4,2 — 5 and 2 swapped), inorder gives two violation points: first at (5,3) and second at (4,2). For adjacent swaps (e.g., 1,3,2,4 — 3 and 2 swapped), there's only ONE violation: (3,2). In both cases, first points to the larger violating node and second points to the smaller. Setting first at the first violation's prev (the larger value) and second to the current at each violation correctly handles both cases."})]})}function he(){return e.jsxs("div",{children:[e.jsxs(O,{color:"success",icon:"ti-columns",children:[e.jsx("strong",{children:"Horizontal distance (HD)"}),' assigns each node a column index: root = 0, left child = parent HD − 1, right child = parent HD + 1. All nodes with the same HD form a "vertical column." This enables top view, bottom view, vertical sum, and vertical order traversal.']}),e.jsx(g,{children:"Horizontal Distance — Toggle All Views"}),e.jsx(le,{}),e.jsx(g,{children:"Top View — First BFS Node at Each HD"}),e.jsx(m,{children:{cpp:`void topView(TreeNode* root) {
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
// BST [50,30,70,10,40,60,80] → 10 30 50 70 80`,python:`from collections import deque
def top_view(root):
    mp={}; q=deque([(root,0)])
    while q:
        node,hd=q.popleft()
        if hd not in mp: mp[hd]=node.val   # first seen wins
        if node.left:  q.append((node.left,  hd-1))
        if node.right: q.append((node.right, hd+1))
    return [mp[k] for k in sorted(mp)]`}}),e.jsx(g,{children:"Bottom View — Last BFS Node at Each HD"}),e.jsx(S,{children:"Identical to top view except we unconditionally overwrite instead of checking existence. The last BFS node at each HD (deepest, rightmost within a level) wins."}),e.jsx(m,{children:{cpp:`void bottomView(TreeNode* root) {
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
// → 10 30 60 70 80  (HD=0: 50,40,60 in BFS order — 60 overwrites last)`,python:`def bottom_view(root):
    mp={}; q=deque([(root,0)])
    while q:
        node,hd=q.popleft()
        mp[hd]=node.val             # last wins
        if node.left:  q.append((node.left,  hd-1))
        if node.right: q.append((node.right, hd+1))
    return [mp[k] for k in sorted(mp)]`}}),e.jsx(g,{children:"Vertical Order Traversal (LC 987)"}),e.jsx(m,{children:{cpp:`vector<vector<int>> verticalTraversal(TreeNode* root) {
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
}`,python:`from collections import defaultdict, deque
def vertical_traversal(root):
    mp=defaultdict(list); q=deque([(root,0,0)])
    while q:
        n,hd,d=q.popleft()
        mp[hd].append((d,n.val))
        if n.left:  q.append((n.left, hd-1,d+1))
        if n.right: q.append((n.right,hd+1,d+1))
    return [[v for _,v in sorted(mp[k])] for k in sorted(mp)]`}}),e.jsx(E,{q:"What is the difference between Top View and Left View?",a:"Top View groups nodes by HORIZONTAL DISTANCE — it shows what's visible when looking down from above (first node at each HD column). Left View groups nodes by LEVEL — it shows what's visible from the left side (first node at each tree level). For a balanced BST, these are different: left view is always the leftmost path from root, while top view includes every distinct HD column even if blocked by a higher node."})]})}function ue(){return e.jsxs("div",{children:[e.jsxs(O,{color:"warning",icon:"ti-arrows-left-right",children:["Self-balancing BSTs maintain O(log n) height through ",e.jsx("em",{children:"rotations"})," after insertions/deletions. C++ ",e.jsx("code",{children:"std::set"}),", ",e.jsx("code",{children:"std::map"}),", and Python's ",e.jsx("code",{children:"SortedList"})," (from sortedcontainers) use Red-Black trees internally."]}),e.jsx(g,{children:"AVL Tree — Strict Balance Factor"}),e.jsx(S,{children:"Balance Factor (BF) = |left_height − right_height| ≤ 1 for every node. When BF exceeds 1, apply one of four rotation cases to restore balance."}),e.jsx(Z,{heads:["Violation","Detection","Fix","Example unbalanced"],rows:[["LL (Left-Left)","BF(root)>1, BF(left)≥0","Right rotation on root","100←200←300 inserted 300,200,100"],["RR (Right-Right)","BF(root)<-1, BF(right)≤0","Left rotation on root","100→200→300 inserted 100,200,300"],["LR (Left-Right)","BF(root)>1, BF(left)<0","Left rot on left, then Right rot","100←300→200 inserted 300,100,200"],["RL (Right-Left)","BF(root)<-1, BF(right)>0","Right rot on right, then Left rot","100→300←200 inserted 100,300,200"]]}),e.jsx(m,{children:{cpp:`// AVL right rotation (fixes LL imbalance)
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
if (bf < -1 && val <  node->right->val) { node->right=rightRotate(node->right); return leftRotate(node);} // RL`,python:`def right_rotate(y):
    x=y.left; T2=x.right
    x.right=y; y.left=T2
    y.height=1+max(h(y.left),h(y.right))
    x.height=1+max(h(x.left),h(x.right))
    return x`}}),e.jsx(g,{children:"Red-Black Tree — Relaxed Balance"}),e.jsx(S,{children:"Red-Black trees use color (red/black) instead of strict height balancing. Fewer rotations per insertion/deletion than AVL — preferred for workloads with frequent updates."}),e.jsxs(J,{cols:2,children:[e.jsx(I,{title:"Red-Black Properties",color:"danger",children:e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,lineHeight:2},children:["1. Every node is RED or BLACK",e.jsx("br",{}),"2. Root is always BLACK",e.jsx("br",{}),"3. No two consecutive RED nodes",e.jsx("br",{}),"4. Every root-to-null path has equal BLACK nodes"]})}),e.jsx(I,{title:"AVL vs Red-Black",color:"warning",children:e.jsx("div",{style:{fontSize:13,lineHeight:1.7},children:"AVL: stricter balance → faster search (smaller height). Red-Black: fewer rotations on insert/delete → faster modifications. C++ STL uses Red-Black for std::map/set."})})]}),e.jsx(g,{children:"C++ STL — map and set"}),e.jsx(m,{lang:"cpp",children:`#include <set>
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

// multiset allows duplicates; multimap allows duplicate keys`}),e.jsx(E,{q:"Why do C++ STL containers use Red-Black trees instead of AVL trees?",a:"For general-purpose containers with mixed operations (frequent inserts and deletes interspersed with searches), Red-Black trees require fewer rotations per insert/delete — at most 2 rotations per insertion, 3 per deletion, vs potentially O(log n) rebalancing passes in AVL. AVL trees maintain a stricter balance invariant (height difference ≤ 1 everywhere) which gives a slightly shorter tree height, but the rebalancing cost is higher. For databases and search-heavy workloads, AVL is preferred; for general STL-style usage, Red-Black wins."})]})}function fe(){return e.jsxs("div",{children:[e.jsx(O,{color:"purple",icon:"ti-tournament",children:"6 BST problems spanning search, reconstruction, and path algorithms — all high-frequency in FAANG and IIT OAs."}),e.jsx(A,{num:1,title:"Kth Smallest Element in BST",difficulty:"LC Medium",tags:["LC 230","Inorder"],statement:"Given the root of a BST and an integer <code>k</code>, return the <strong>k-th smallest</strong> value among all the values of the nodes in the tree.",constraints:["1 ≤ k ≤ n ≤ 10⁴","0 ≤ val ≤ 10⁴"],examples:[{input:"root=[3,1,4,null,2], k=1",output:"1"},{input:"root=[5,3,6,2,4,null,null,1], k=3",output:"3"}],approach:"Inorder traversal of BST gives sorted ascending order. Stop at the kth element. Iterative with a stack allows early termination — no need to traverse the full tree. O(h+k) time where h = tree height.",code:{cpp:`int kthSmallest(TreeNode* root, int k) {
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
        cur=cur.right`}}),e.jsx(A,{num:2,title:"Validate Binary Search Tree",difficulty:"LC Medium",tags:["LC 98","Range Bounds"],statement:"Given a binary tree, determine if it is a valid BST (every node's value is in the valid range defined by its ancestors).",constraints:["1 ≤ n ≤ 10⁴","-2³¹ ≤ val ≤ 2³¹-1","Must handle duplicate values: BST requires strict inequality"],examples:[{input:"[2,1,3]",output:"true"},{input:"[5,1,4,null,null,3,6]",output:"false",note:"Root is 5 but right child is 4 < 5"}],approach:"Range bounding: pass (min, max) constraints to each recursive call. Root: (-∞, +∞). Left child: (min, node.val). Right child: (node.val, max). Every node must satisfy min < val < max strictly. Use long long to handle INT_MIN/INT_MAX boundary nodes.",code:{cpp:`bool isValidBST(TreeNode* r,long mn=LLONG_MIN,long mx=LLONG_MAX){
    if(!r)return true;
    if(r->val<=mn||r->val>=mx)return false;
    return isValidBST(r->left,mn,r->val)&&isValidBST(r->right,r->val,mx);
}`,python:`def is_valid_bst(r,mn=float('-inf'),mx=float('inf')):
    if not r:return True
    if not(mn<r.val<mx):return False
    return is_valid_bst(r.left,mn,r.val) and is_valid_bst(r.right,r.val,mx)`}}),e.jsx(A,{num:3,title:"Lowest Common Ancestor of BST",difficulty:"LC Medium",tags:["LC 235","BST Property"],statement:"Given a BST and two nodes <code>p</code> and <code>q</code>, return their lowest common ancestor. The LCA is defined as the deepest node that is an ancestor of both p and q.",constraints:["2 ≤ n ≤ 10⁵","All values unique","p ≠ q, both exist in tree"],examples:[{input:"p=2, q=8",output:"6",note:"LCA of nodes 2 and 8 is 6"},{input:"p=2, q=4",output:"2",note:"2 is ancestor of 4"}],approach:"Use the BST property: if both p and q are less than root → LCA is in left subtree. If both greater → right subtree. Otherwise the root splits them → root IS the LCA. No extra space needed. O(h) iteratively.",code:{cpp:`TreeNode* lowestCommonAncestor(TreeNode* r,TreeNode* p,TreeNode* q){
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
        else:return r`}}),e.jsx(A,{num:4,title:"Recover BST (Two Nodes Swapped)",difficulty:"LC Hard",tags:["LC 99","Morris Traversal"],statement:"Two nodes of a BST have been swapped. Recover the tree without changing its structure.",constraints:["2 ≤ n ≤ 1000","O(1) space bonus challenge"],examples:[{input:"[1,3,null,null,2]",output:"[3,1,null,null,2]",note:"3 and 1 were swapped"},{input:"[3,1,4,null,null,2]",output:"[2,1,4,null,null,3]"}],approach:"Inorder traversal tracks prev. Two violations signal the swapped nodes: first violation's prev = first node (larger), second violation's current = second node (smaller). Handles both adjacent and non-adjacent swaps. Swap only the VALUES at the end. O(h) space (recursion stack).",code:{cpp:`class Solution {
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
    dfs(root); first[0].val,second[0].val=second[0].val,first[0].val`}}),e.jsx(A,{num:5,title:"Binary Search Tree to Greater Sum Tree",difficulty:"LC Medium",tags:["LC 1038","Reverse Inorder"],statement:"Given a BST, transform it into a Greater Sum Tree where every key is replaced by the sum of all keys greater than or equal to it.",constraints:["1 ≤ n ≤ 100","0 ≤ val ≤ 100","All values unique"],examples:[{input:"[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]",output:"[30,36,21,36,35,26,15,...]"}],approach:"Reverse inorder traversal (Right → Root → Left) visits nodes in DECREASING order. Maintain a running sum — each node's new value = old value + running sum. Update running sum after each visit. O(n) time, O(h) space.",code:{cpp:`int runSum=0;
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
    rev_inorder(root); return root`}}),e.jsx(A,{num:6,title:"Pair Sum in BST",difficulty:"OA Medium",tags:["Two-Pointer","Hash Set"],statement:"Given a BST and a target sum <code>X</code>, determine if there exist two distinct nodes in the BST whose values sum to <code>X</code>.",constraints:["1 ≤ n ≤ 10⁵","1 ≤ X ≤ 10⁹"],examples:[{input:"BST=[5,3,6,2,4,null,7], target=9",output:"true",note:"2+7=9"},{input:"BST=[5,3,6,2,4,null,7], target=28",output:"false"}],approach:"Method 1: Inorder traversal → sorted array → two-pointer from both ends. O(n) time, O(n) space. Method 2: traverse BST, for each node check if (X - node.val) exists in a hash set, then insert node.val. O(n) average with hash set.",code:{cpp:`bool findTarget(TreeNode* r,int k){
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
    return False`}})]})}const pe=[{id:"fundamentals",label:"Fundamentals"},{id:"deletion",label:"Deletion & BST Algorithms"},{id:"views",label:"Views & Vertical Traversal"},{id:"balanced",label:"AVL & Red-Black"},{id:"problems",label:"Problems"}];function xe(){const[r,n]=x.useState("fundamentals"),d={fundamentals:e.jsx(de,{}),deletion:e.jsx(ce,{}),views:e.jsx(he,{}),balanced:e.jsx(ue,{}),problems:e.jsx(fe,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 18"}),e.jsx("h1",{className:"page-header-title",children:"Binary Search Trees"}),e.jsx("p",{className:"page-header-subtitle",children:"Search · Insert · Delete (3 Cases) · Floor/Ceil · Validate · Fix Swapped · Kth Smallest · Top/Bottom View · AVL · Red-Black"})]}),e.jsx(re,{tabs:pe,active:r,onChange:n}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:d[r]}),e.jsx(te,{moduleId:18})]})}export{xe as default};
