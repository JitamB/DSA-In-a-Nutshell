import{r as k,j as e}from"./index-D9jkHkZY.js";import{S as _,N as H,d as q,H as g,P as z,a as S,T as A,Q as M,V as O}from"./SectionNav-BHzhBu3R.js";function C(r,l=600){const t=Math.floor(Math.log2(r+1)),o=r-((1<<t)-1),i=1<<t;return{x:l/i*(o+.5),y:t*72+38}}function T(r){return Math.max(115,Math.ceil(Math.log2(r+1))*72+50)}function K({arr:r,hl:l={},W:t=600,showArr:o=!0,dimmed:i=new Set}){const n=r.length,p=T(n),u={success:"#1A3A2A",info:"#1A2A3A",warning:"#3A2A1A",danger:"#3A1A1A",purple:"#2A1A3A"},m={success:"#4EC9B0",info:"#81B4EA",warning:"#CE9178",danger:"#F44747",purple:"#C586C0"},a={success:"#4EC9B0",info:"#9CDCFE",warning:"#CE9178",danger:"#F44747",purple:"#C586C0"},x=o?62:0,f=x+8;return e.jsxs("svg",{width:t,height:p+x,viewBox:`0 0 ${t} ${p+x}`,children:[o&&r.map((c,s)=>{const h=l[s],v=i.has(s),d=Math.min(52,(t-20)/Math.max(n,1)),b=(t-n*d)/2+s*d;return e.jsxs("g",{style:{opacity:v?.2:1},children:[e.jsx("rect",{x:b+1,y:4,width:d-2,height:34,rx:"4",fill:h?u[h]:"#131722",stroke:h?m[h]:"#1E2233",strokeWidth:h?1.5:1}),e.jsx("text",{x:b+d/2,y:22,textAnchor:"middle",dominantBaseline:"middle",fill:h?a[h]:"#6A7490",fontSize:d<34?10:12,fontFamily:"monospace",fontWeight:h?700:500,children:c}),e.jsxs("text",{x:b+d/2,y:48,textAnchor:"middle",fill:"#3D4460",fontSize:"9",fontFamily:"monospace",children:["[",s,"]"]})]},`a${s}`)}),r.map((c,s)=>{if(s===0)return null;const h=Math.floor((s-1)/2),v=C(h,t),d=C(s,t),b=i.has(s)||i.has(h);return e.jsx("line",{x1:v.x,y1:v.y+f,x2:d.x,y2:d.y+f,stroke:b?"#141822":"#2A3050",strokeWidth:"1.5"},`e${s}`)}),r.map((c,s)=>{const{x:h,y:v}=C(s,t),d=l[s],b=i.has(s);return e.jsxs("g",{style:{opacity:b?.2:1},children:[e.jsx("circle",{cx:h,cy:v+f,r:"22",fill:d?u[d]:"#131722",stroke:d?m[d]:"#1E2233",strokeWidth:d?2:1}),e.jsx("text",{x:h,y:v+f+1,textAnchor:"middle",dominantBaseline:"middle",fill:d?a[d]:"#6A7490",fontSize:"13",fontFamily:"monospace",fontWeight:d?700:500,children:c})]},`n${s}`)})]})}const L=[{arr:[100,80,70,60,50,40,30],hl:{},action:"init",desc:"Max-heap [100,80,70,60,50,40,30]. Insert new key = 90."},{arr:[100,80,70,60,50,40,30,90],hl:{7:"warning"},action:"place",desc:"Place 90 at index 7 (end). Parent[3] = 60. 90 > 60 → SWAP ↑."},{arr:[100,80,70,90,50,40,30,60],hl:{3:"success",7:"info"},action:"swap1",desc:"Swapped with idx 3 (was 60). Now at i=3. Parent[1]=80. 90 > 80 → SWAP ↑."},{arr:[100,90,70,80,50,40,30,60],hl:{1:"success",3:"info"},action:"swap2",desc:"Swapped with idx 1 (was 80). Now at i=1. Parent[0]=100. 90 < 100 → STOP."},{arr:[100,90,70,80,50,40,30,60],hl:{1:"info",0:"success"},action:"stop",desc:"90 ≤ parent(100). Sift-up complete! Height preserved: O(log n) comparisons."}],P=[{arr:[100,80,70,60,50,40,30],hl:{0:"success"},action:"init",desc:"Extract max = arr[0] = 100. Move last element (30) to root."},{arr:[30,80,70,60,50,40],hl:{0:"warning"},action:"place",desc:"Placed 30 at root. n=6 now. Sift-down: i=0(30), left[1]=80, right[2]=70."},{arr:[80,30,70,60,50,40],hl:{0:"success",1:"warning"},action:"swap1",desc:"Max child = idx 1 (80). 30 < 80 → SWAP ↓. Now at i=1. Left[3]=60, right[4]=50."},{arr:[80,60,70,30,50,40],hl:{1:"success",3:"warning"},action:"swap2",desc:"Max child = idx 3 (60). 30 < 60 → SWAP ↓. Now at i=3. Left[7] OOB → leaf. STOP."},{arr:[80,60,70,30,50,40],hl:{3:"info"},action:"stop",desc:"i=3 is a leaf. Sift-down complete! Extracted 100. New root = 80 ✓"}],y=[{arr:[1,8,3,10,6,5,2],hl:{},phase:-1,desc:"Input: [1,8,3,10,6,5,2]. n=7, last non-leaf = ⌊n/2⌋−1 = 2. Heapify from i=2 down to i=0."},{arr:[1,8,3,10,6,5,2],hl:{2:"warning",5:"info",6:"info"},phase:2,desc:"i=2(val=3): left[5]=5, right[6]=2. Max child=5(5). 3 < 5 → SWAP."},{arr:[1,8,5,10,6,3,2],hl:{2:"success",5:"success"},phase:2,desc:"Swapped idx 2↔5. i=5 is leaf — sift done. i=2 heapified ✓"},{arr:[1,8,5,10,6,3,2],hl:{1:"warning",3:"info",4:"info"},phase:1,desc:"i=1(val=8): left[3]=10, right[4]=6. Max child=3(10). 8 < 10 → SWAP."},{arr:[1,10,5,8,6,3,2],hl:{1:"success",3:"success"},phase:1,desc:"Swapped idx 1↔3. i=3 is leaf — sift done. i=1 heapified ✓"},{arr:[1,10,5,8,6,3,2],hl:{0:"warning",1:"info",2:"info"},phase:0,desc:"i=0(val=1): left[1]=10, right[2]=5. Max child=1(10). 1 < 10 → SWAP."},{arr:[10,1,5,8,6,3,2],hl:{0:"success",1:"warning",3:"info",4:"info"},phase:0,desc:"Swapped idx 0↔1. Continue sift from i=1(val=1): left[3]=8, right[4]=6. Max=3(8). SWAP."},{arr:[10,8,5,1,6,3,2],hl:{0:"success",1:"success",3:"success"},phase:0,desc:"Swapped idx 1↔3. i=3 is leaf. BUILD HEAP COMPLETE! O(n) total — far better than n inserts O(n log n)."}],j=[{heap:[],cur:null,dropped:null,action:"init",stream:[3,2,1,5,6,4],desc:"Find top 3 from [3,2,1,5,6,4]. Use a MIN-HEAP of size K=3. Why min? Root = Kth largest = threshold. New element > root → replace root with new element."},{heap:[3],cur:3,dropped:null,action:"add",stream:[2,1,5,6,4],desc:"3: heap size (1) < K(3) → add directly. heap=[3]."},{heap:[2,3],cur:2,dropped:null,action:"add",stream:[1,5,6,4],desc:"2: heap size (2) < K(3) → add. Min-heap re-orders: [2,3]. Root=2."},{heap:[1,3,2],cur:1,dropped:null,action:"add",stream:[5,6,4],desc:"1: heap size (3) = K → heap FULL. heap=[1,3,2]. Root=1 (smallest of top-3 so far)."},{heap:[2,3,5],cur:5,dropped:1,action:"replace",stream:[6,4],desc:"5 > root(1) → POP 1, PUSH 5. heap=[2,3,5]. Dropped 1 — not in top-3."},{heap:[3,5,6],cur:6,dropped:2,action:"replace",stream:[4],desc:"6 > root(2) → POP 2, PUSH 6. heap=[3,5,6]. Dropped 2."},{heap:[4,5,6],cur:4,dropped:3,action:"replace",stream:[],desc:"4 > root(3) → POP 3, PUSH 4. heap=[4,5,6]. Dropped 3. Stream exhausted."},{heap:[4,5,6],cur:null,dropped:null,action:"done",stream:[],desc:"Top-3 = {4,5,6}. Heap root (4) = 3rd largest. This pattern solves LC 215, 347, 973, 703 in O(n log K) — optimal for large n."}];function F(){const[r,l]=k.useState("siftup"),[t,o]=k.useState(0),i=r==="siftup"?L:P,n=i[Math.min(t,i.length-1)],p=a=>{l(a),o(0)},m={init:null,place:"warning",swap1:"success",swap2:"success",stop:"info",done:"success"}[n.action];return e.jsxs(O,{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:14},children:[[["siftup","Sift-Up (Insert 90)"],["siftdown","Sift-Down (Extract Max)"]].map(([a,x])=>e.jsx("button",{onClick:()=>p(a),style:{padding:"4px 12px",border:"1px solid",borderColor:r===a?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:r===a?"var(--color-background-info)":"transparent",color:r===a?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:x},a)),e.jsx("div",{style:{marginLeft:"auto",fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",alignSelf:"center"},children:r==="siftup"?"O(log n) sift-up":"O(log n) sift-down"})]}),e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center"},children:[m&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${m})`,color:`var(--color-text-${m})`,border:`1px solid var(--color-border-${m})`,whiteSpace:"nowrap"},children:n.action==="place"?"Place":n.action.startsWith("swap")?"Swap ↕":n.action==="stop"?"Stop ✓":"Done ✓"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:n.desc})]}),r==="siftdown"&&n.action==="init"&&e.jsx("div",{style:{marginBottom:8,padding:"5px 10px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:12.5,color:"var(--color-text-success)"},children:"Extracted: 100"}),e.jsx("div",{style:{overflowX:"auto",marginBottom:12},children:e.jsx(K,{arr:n.arr,hl:n.hl})}),e.jsx("div",{style:{display:"flex",gap:8},children:[{c:"info",l:"Swapped from here"},{c:"success",l:"Just swapped / current position"},{c:"warning",l:"Comparing"}].map(({c:a,l:x})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:11},children:[e.jsx("div",{style:{width:9,height:9,borderRadius:"50%",background:`var(--color-background-${a})`,border:`1px solid var(--color-border-${a})`}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:x})]},a))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:14},children:[[["← Prev",()=>o(Math.max(0,t-1)),t===0],["Next →",()=>o(Math.min(i.length-1,t+1)),t===i.length-1]].map(([a,x,f])=>e.jsx("button",{onClick:x,disabled:f,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:f?"not-allowed":"pointer",fontSize:12,opacity:f?.4:1},children:a},a)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[t+1,"/",i.length]}),e.jsx("button",{onClick:()=>o(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>o(i.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function E(){const[r,l]=k.useState(0),t=y[Math.min(r,y.length-1)];return t.phase>=0&&new Set(y.slice(0,r+1).filter(o=>o.phase>=0&&o.action!=="init").flatMap(o=>Object.keys(o.hl).map(Number))),e.jsxs(O,{children:[e.jsx("div",{style:{marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:t.desc}),t.phase>=0&&e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},children:[2,1,0].map(o=>e.jsxs("div",{style:{padding:"4px 12px",borderRadius:20,fontFamily:"var(--font-mono)",fontSize:12,border:`1px solid ${o===t.phase?"var(--color-border-warning)":o>t.phase?"var(--color-border-tertiary)":"var(--color-border-success)"}`,background:o===t.phase?"var(--color-background-warning)":o>t.phase?"transparent":"var(--color-background-success)",color:o===t.phase?"var(--color-text-warning)":o>t.phase?"var(--color-text-tertiary)":"var(--color-text-success)"},children:["i=",o," ",o>t.phase?"":"✓"]},o))}),e.jsx("div",{style:{overflowX:"auto",marginBottom:12},children:e.jsx(K,{arr:t.arr,hl:t.hl})}),r===y.length-1&&e.jsx("div",{style:{padding:"8px 12px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-success)"},children:"Floyd's: sum of heights = O(n). Half the nodes do 0 work (leaves). Quarter do 1 comparison. Eighth do 2... Sum ≤ n. Vs n×O(log n) for n inserts."}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:12},children:[[["← Prev",()=>l(Math.max(0,r-1)),r===0],["Next →",()=>l(Math.min(y.length-1,r+1)),r===y.length-1]].map(([o,i,n])=>e.jsx("button",{onClick:i,disabled:n,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n?"not-allowed":"pointer",fontSize:12,opacity:n?.4:1},children:o},o)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r+1,"/",y.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>l(y.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function B(){const[r,l]=k.useState(0),t=j[Math.min(r,j.length-1)],i={add:"success",replace:"warning",done:"success",init:null}[t.action],n={};return t.action==="add"&&(n[t.heap.length-1]="success"),t.action==="replace"&&(n[0]="warning"),t.action==="done"&&t.heap.forEach((p,u)=>{n[u]="success"}),e.jsxs(O,{children:[e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[i&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${i})`,color:`var(--color-text-${i})`,border:`1px solid var(--color-border-${i})`,whiteSpace:"nowrap"},children:t.action==="add"?"Add to heap":t.action==="replace"?"Replace root ↕":"Done ✓"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"STREAM (remaining)"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:40,alignItems:"center"},children:t.stream.length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-tertiary)",border:"1px dashed var(--color-border-tertiary)",padding:"6px 12px",borderRadius:6},children:"exhausted"}):t.stream.map((p,u)=>e.jsx("div",{style:{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,color:"var(--color-text-secondary)"},children:p},u))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"PROCESSING"}),t.cur!==null?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8,border:`2px solid ${t.dropped!==null?"var(--color-border-warning)":"var(--color-border-success)"}`,background:t.dropped!==null?"var(--color-background-warning)":"var(--color-background-success)",fontFamily:"var(--font-mono)",fontSize:18,fontWeight:700,color:t.dropped!==null?"var(--color-text-warning)":"var(--color-text-success)"},children:t.cur}),t.dropped!==null&&e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-danger)"},children:["dropped: ",e.jsx("strong",{style:{fontSize:15},children:t.dropped})]})]}):e.jsx("span",{style:{fontSize:12,color:"var(--color-text-tertiary)",fontFamily:"var(--font-mono)"},children:"—"})]})]}),e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"MIN-HEAP of size K=3  (root = smallest of top-K = threshold)"}),t.heap.length>0?e.jsx("div",{style:{overflowX:"auto"},children:e.jsx(K,{arr:t.heap,hl:n,W:400,showArr:!0})}):e.jsx("div",{style:{padding:"12px",border:"1px dashed var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-tertiary)",textAlign:"center"},children:"empty"})]}),t.action==="done"&&e.jsxs("div",{style:{padding:"8px 14px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--color-text-success)",textAlign:"center",marginBottom:12},children:["✓ Top-3 = ","{"+t.heap.sort((p,u)=>u-p).join(", ")+"}","  |  Heap root (",Math.min(...t.heap),") = 3rd largest overall"]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,r-1)),r===0],["Next →",()=>l(Math.min(j.length-1,r+1)),r===j.length-1]].map(([p,u,m])=>e.jsx("button",{onClick:u,disabled:m,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:m?"not-allowed":"pointer",fontSize:12,opacity:m?.4:1},children:p},p)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r+1,"/",j.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>l(j.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}const R={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function w({num:r,title:l,difficulty:t,tags:o=[],statement:i,constraints:n=[],examples:p=[],approach:u,code:m}){const[a,x]=k.useState(!1),f=R[t]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",r]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:l})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[o.map(c=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:c},c)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${f})`,color:`var(--color-text-${f})`,border:`1px solid var(--color-border-${f})`},children:t})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:i}}),n.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:n.map((c,s)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:c},s))})]}),p.length>0&&e.jsx("div",{style:{marginBottom:14},children:p.map((c,s)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",s+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:c.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:c.output})]}),c.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:c.note})]},s))}),e.jsxs("button",{onClick:()=>x(!a),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:a?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${a?"eye-off":"bulb"}`}),a?"Hide Solution":"Show Approach & Solution"]}),a&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),u]}),e.jsx(S,{children:m})]})]})]})}function N(){return e.jsxs("div",{children:[e.jsxs(q,{color:"info",icon:"ti-chart-bar",children:["A ",e.jsx("strong",{children:"binary heap"})," is a complete binary tree that satisfies the heap property. In a ",e.jsx("em",{children:"max-heap"}),", every parent ≥ its children. In a ",e.jsx("em",{children:"min-heap"}),", every parent ≤ its children. The key insight: the tree is always complete, enabling a compact array representation with no wasted space."]}),e.jsx(g,{children:"The Array Representation — No Pointers Needed"}),e.jsx(z,{children:"A complete binary tree with n nodes maps perfectly to indices 0..n-1 of an array. No left/right pointer fields needed. The parent-child relationship is purely arithmetic:"}),e.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"12px 16px",fontFamily:"var(--font-mono)",fontSize:13,lineHeight:2,marginBottom:16},children:[e.jsxs("div",{children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"parent(i)"}),"  ",e.jsx("span",{style:{color:"#7A8599"},children:"= "}),e.jsx("span",{style:{color:"#CE9178"},children:"(i−1) / 2"}),"  ",e.jsx("span",{style:{color:"#6A9955"},children:"// integer division"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"left(i)  "}),"  ",e.jsx("span",{style:{color:"#7A8599"},children:"= "}),e.jsx("span",{style:{color:"#4EC9B0"},children:"2×i + 1"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"right(i) "}),"  ",e.jsx("span",{style:{color:"#7A8599"},children:"= "}),e.jsx("span",{style:{color:"#4EC9B0"},children:"2×i + 2"})]}),e.jsx("div",{style:{marginTop:4,color:"#6A9955"},children:"// For 1-indexed: parent=i/2, left=2i, right=2i+1"})]}),e.jsx(K,{arr:[100,80,70,60,50,40,30],hl:{0:"success"}}),e.jsx(g,{children:"Operations Complexity"}),e.jsx(A,{heads:["Operation","Time","Notes"],rows:[["Peek max/min","O(1)","Always at index 0"],["Insert","O(log n)","Add at end + sift-up"],["Extract max/min","O(log n)","Remove root + sift-down"],["Build heap","O(n)","Floyd's algorithm — NOT O(n log n)!"],["Heap sort","O(n log n)","Build + n extractions"],["Delete arbitrary","O(log n)","Increase to ∞ or −∞, then extract"]]}),e.jsx(g,{children:"Insert and Extract Max — Interactive"}),e.jsx(F,{}),e.jsx(S,{children:{cpp:`// Max-Heap using a vector (0-indexed)
class MaxHeap {
    vector<int> h;
    void siftUp(int i) {
        while (i > 0) {
            int p = (i - 1) / 2;
            if (h[p] < h[i]) { swap(h[p], h[i]); i = p; }
            else break;
        }
    }
    void siftDown(int i) {
        int n = h.size();
        while (2*i + 1 < n) {
            int j = 2*i + 1;                             // left child
            if (j+1 < n && h[j+1] > h[j]) j++;          // pick larger child
            if (h[i] >= h[j]) break;
            swap(h[i], h[j]); i = j;
        }
    }
public:
    void push(int x)  { h.push_back(x); siftUp(h.size()-1); }
    int  top()        { return h[0]; }
    void pop()        { h[0]=h.back(); h.pop_back(); siftDown(0); }
    bool empty()      { return h.empty(); }
    int  size()       { return h.size(); }
};`,python:`import heapq  # Python only has min-heap

# Min-heap:
h = []
heapq.heappush(h, 5)        # O(log n)
heapq.heappush(h, 2)
x = heapq.heappop(h)        # O(log n) → returns 2 (min)

# Max-heap trick: negate values
heapq.heappush(h, -10)
heapq.heappush(h, -3)
x = -heapq.heappop(h)       # returns 10 (max)

# Build heap from list: O(n)
lst = [3,1,4,1,5,9,2,6]
heapq.heapify(lst)           # in-place, O(n)`}}),e.jsx(M,{q:"Why is the array representation more cache-friendly than a pointer-based tree for heaps?",a:"Array elements are stored contiguously in memory. When sift-down accesses a node and its children (indices i, 2i+1, 2i+2), all three values are within a few cache lines of each other. A pointer-based binary tree allocates each node separately on the heap — accessing children requires pointer dereferences to potentially random memory locations, causing cache misses. For the complete binary tree structure of a heap, the array representation always wins on cache performance."})]})}function W(){return e.jsxs("div",{children:[e.jsx(g,{children:"Floyd's Build Heap — O(n)"}),e.jsx(z,{children:"Instead of n insertions (O(n log n)), call heapify on every non-leaf node from right to left. About half the nodes are leaves doing 0 work. The work is dominated by the top levels where nodes have fewer elements below them. Sum of heights = O(n)."}),e.jsx(E,{}),e.jsx(S,{children:{cpp:`void buildHeap(vector<int>& arr) {
    int n = arr.size();
    // Heapify from last non-leaf down to root
    for (int i = n/2 - 1; i >= 0; i--) {
        siftDown(arr, i, n);
    }
}
// O(n) proof: sum_{k=0}^{log n} (height_k × nodes_at_k)
//           = sum (h × n/2^(h+1)) = n × sum(h/2^h) = O(n)`,python:`def build_heap(arr):
    n=len(arr)
    for i in range(n//2-1,-1,-1):
        sift_down(arr,i,n)
    return arr

# Or just use heapq.heapify(arr) — O(n) in-place`}}),e.jsx(g,{children:"Heap Sort — O(n log n) In-Place"}),e.jsx(z,{children:"Build max-heap in O(n). Repeatedly extract max: swap root with last element, reduce heap size by 1, sift-down. After n extractions, array is sorted ascending. Not stable, but O(1) extra space."}),e.jsx(S,{children:{cpp:`void heapSort(vector<int>& arr) {
    int n = arr.size();
    // Step 1: build max-heap O(n)
    for (int i = n/2-1; i >= 0; i--) siftDown(arr, i, n);
    // Step 2: n-1 extractions O(n log n)
    for (int i = n-1; i > 0; i--) {
        swap(arr[0], arr[i]);   // move max to sorted position
        siftDown(arr, 0, i);    // restore heap of size i
    }
}
// Time: O(n log n)  Space: O(1)  Not stable.`,python:`def heap_sort(arr):
    n=len(arr)
    for i in range(n//2-1,-1,-1):sift_down(arr,i,n)
    for i in range(n-1,0,-1):
        arr[0],arr[i]=arr[i],arr[0]
        sift_down(arr,0,i)
    return arr`}}),e.jsx(M,{q:"Why is building a heap O(n) while n insertions is O(n log n)? Isn't each heapify call O(log n)?",a:"The key is that nodes at different levels do different amounts of work. Leaves (n/2 nodes) do 0 work. Level h-1 nodes (n/4 nodes) do at most 1 comparison. Level h-2 nodes (n/8) do at most 2. Total work = Σ (nodes_at_depth × max_sift_distance) = Σ (n/2^(d+1) × d) for d from 0 to h. This geometric series sums to O(n). Most of the nodes are near the bottom and do very little work."})]})}function I(){return e.jsxs("div",{children:[e.jsxs(q,{color:"success",icon:"ti-trophy",children:["The ",e.jsx("strong",{children:"Top-K pattern"})," is the single most useful heap application in interviews. Maintain a min-heap of size K while processing a stream. The root = Kth largest (threshold). New element > root → replace root. O(n log K) total — far better than O(n log n) sort when K ≪ n."]}),e.jsx(g,{children:"Top-K Min-Heap — Interactive"}),e.jsx(z,{children:"Watch a min-heap of size K=3 process the stream [3,2,1,5,6,4]. When the heap is full and a new element exceeds the root (current Kth largest), the root is evicted and the new element takes its place."}),e.jsx(B,{}),e.jsx(g,{children:"C++ Priority Queue — Max and Min"}),e.jsx(S,{children:{cpp:`#include <queue>

priority_queue<int> maxPQ;                              // max-heap (default)
priority_queue<int, vector<int>, greater<int>> minPQ;  // min-heap

// Custom comparator: min-heap of pairs by first element
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;

// Top-K pattern template (K largest elements):
vector<int> topK(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minH;  // min-heap of size k
    for (int x : nums) {
        minH.push(x);
        if ((int)minH.size() > k) minH.pop();   // evict smallest
    }
    vector<int> res;
    while (!minH.empty()) { res.push_back(minH.top()); minH.pop(); }
    return res;
}
// Time: O(n log k)  Space: O(k)`,python:`import heapq

# Top-K largest using min-heap of size k
def top_k_largest(nums, k):
    return heapq.nlargest(k, nums)   # built-in, O(n log k)

# Manual implementation:
def top_k(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)         # evict smallest, keep top-k
    return sorted(h)                  # h contains the k largest`}}),e.jsx(g,{children:"Pattern Variants"}),e.jsx(A,{heads:["Problem Type","Heap Type","Key","Size"],rows:[["K largest elements","Min-Heap","value","K"],["K smallest elements","Max-Heap","value","K"],["K closest points to origin","Max-Heap","squared distance","K"],["K most frequent","Min-Heap","(freq, element)","K"],["Kth largest in stream","Min-Heap","value","K"],["Kth largest element","Min-Heap","value","K — root = answer"]]}),e.jsx(g,{children:"Median from Data Stream (Two Heaps)"}),e.jsx(z,{children:"Maintain two heaps: a max-heap for the lower half and a min-heap for the upper half. Balance them so their sizes differ by at most 1. Median = max_heap.top() (odd total) or average of both tops (even total)."}),e.jsx(S,{children:{cpp:`class MedianFinder {
    priority_queue<int> lo;                              // max-heap: lower half
    priority_queue<int, vector<int>, greater<int>> hi;   // min-heap: upper half
public:
    void addNum(int num) {
        lo.push(num);                    // always add to lower half first
        hi.push(lo.top()); lo.pop();     // balance: push lo's max to upper half
        if (hi.size() > lo.size()) {     // keep lo.size() >= hi.size()
            lo.push(hi.top()); hi.pop();
        }
    }
    double findMedian() {
        if (lo.size() > hi.size()) return lo.top();
        return (lo.top() + hi.top()) / 2.0;
    }
};
// Each addNum: O(log n)  findMedian: O(1)`,python:`class MedianFinder:
    def __init__(self):
        self.lo=[]  # max-heap (negate)
        self.hi=[]  # min-heap
    def add_num(self,num):
        heapq.heappush(self.lo,-num)         # push to lower
        heapq.heappush(self.hi,-heapq.heappop(self.lo))  # balance
        if len(self.hi)>len(self.lo):
            heapq.heappush(self.lo,-heapq.heappop(self.hi))
    def find_median(self):
        if len(self.lo)>len(self.hi): return -self.lo[0]
        return(-self.lo[0]+self.hi[0])/2.0`}}),e.jsx(M,{q:"Why use a min-heap of size K for the 'K largest' problem, not a max-heap?",a:"A min-heap of size K stores the K largest seen so far, with the root being the SMALLEST of those K — the exact threshold we need. When processing a new element: if it's larger than the root (currently Kth largest), it belongs in the top-K, so evict the root and add the new element. A max-heap can't efficiently do this — its root is the maximum, which tells you nothing useful for this threshold comparison. The min-heap root IS the decision boundary."}),e.jsx(M,{q:"In the two-heap median approach, why does lo (lower half) always have size ≥ hi (upper half)?",a:"When the total count is odd, the exact median is a single element. We store it in lo and return lo.top() directly. When even, both halves have equal size and median = (lo.top() + hi.top()) / 2. This invariant also lets us avoid branching in addNum — we always add to lo first, then rebalance once to ensure all lo elements ≤ all hi elements."})]})}function D(){return e.jsxs("div",{children:[e.jsx(q,{color:"purple",icon:"ti-tournament",children:"6 heap problems — the four prescribed LCs (215, 347, 973, 703) plus two advanced patterns (merge K lists, median stream)."}),e.jsx(w,{num:1,title:"Kth Largest Element in an Array",difficulty:"LC Medium",tags:["LC 215","Min-Heap Size K"],statement:"Given an integer array <code>nums</code> and integer <code>k</code>, return the <strong>kth largest</strong> element in the array (not kth distinct).",constraints:["1 ≤ k ≤ n ≤ 10⁴","−10⁴ ≤ nums[i] ≤ 10⁴"],examples:[{input:"nums=[3,2,1,5,6,4], k=2",output:"5"},{input:"nums=[3,2,3,1,2,4,5,5,6], k=4",output:"4"}],approach:"Min-heap of size K: process all elements. When heap size exceeds K, pop the minimum. The final heap contains the K largest, and its root (minimum of those K) is the Kth largest. O(n log K). Alternative: QuickSelect O(n) average.",code:{cpp:`int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int,vector<int>,greater<int>> h;  // min-heap
    for(int x:nums){h.push(x);if((int)h.size()>k)h.pop();}
    return h.top();
}`,python:`import heapq
def find_kth_largest(nums,k):
    return heapq.nlargest(k,nums)[-1]  # O(n log k)
    # Or: heapq.nlargest(k,nums)[k-1]`}}),e.jsx(w,{num:2,title:"Top K Frequent Elements",difficulty:"LC Medium",tags:["LC 347","Frequency + Min-Heap"],statement:"Given an integer array <code>nums</code> and integer <code>k</code>, return the <strong>k most frequent</strong> elements. Answer is guaranteed to be unique.",constraints:["1 ≤ k ≤ |unique elements|","n ≤ 10⁵","O(n log n) or better"],examples:[{input:"nums=[1,1,1,2,2,3], k=2",output:"[1,2]"},{input:"nums=[1], k=1",output:"[1]"}],approach:"(1) Count frequencies with a hash map O(n). (2) Use a min-heap of size K on (freq, element) pairs. Process each unique element: push to heap, if size > K pop the minimum-frequency element. Final heap has K most frequent. O(n + u log K) where u = unique elements.",code:{cpp:`vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int,int> freq;
    for(int x:nums) freq[x]++;
    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> h;
    for(auto [v,f]:freq){h.push({f,v});if((int)h.size()>k)h.pop();}
    vector<int> res;
    while(!h.empty()){res.push_back(h.top().second);h.pop();}
    return res;
}`,python:`from collections import Counter; import heapq
def top_k_frequent(nums,k):
    cnt=Counter(nums)
    return [v for v,_ in Counter(nums).most_common(k)]
    # O(n log k) heap approach:
    # return heapq.nlargest(k, cnt, key=cnt.get)`}}),e.jsx(w,{num:3,title:"K Closest Points to Origin",difficulty:"LC Medium",tags:["LC 973","Max-Heap"],statement:"Given an array of <code>points</code> where <code>points[i] = [x, y]</code>, return the <strong>K closest points to the origin</strong> (0,0). Distance = √(x²+y²). Return in any order.",constraints:["1 ≤ k ≤ n ≤ 10⁴","−10⁴ ≤ x, y ≤ 10⁴"],examples:[{input:"points=[[1,3],[-2,2]], k=1",output:"[[-2,2]]",note:"√5 < √10, so [-2,2] is closer"},{input:"points=[[3,3],[5,-1],[-2,4]], k=2",output:"[[3,3],[-2,4]]"}],approach:"Max-heap of size K on squared distance. When heap size > K, pop the farthest point. Final heap = K closest. Use squared distance to avoid sqrt. O(n log K). Alternative: QuickSelect O(n) average.",code:{cpp:`vector<vector<int>> kClosest(vector<vector<int>>& pts, int k) {
    auto dist=[](auto& p){return p[0]*p[0]+p[1]*p[1];};
    priority_queue<pair<int,int>> h;  // max-heap: {dist, index}
    for(int i=0;i<pts.size();i++){
        h.push({dist(pts[i]),i});
        if((int)h.size()>k) h.pop();
    }
    vector<vector<int>> res;
    while(!h.empty()){res.push_back(pts[h.top().second]);h.pop();}
    return res;
}`,python:`import heapq
def k_closest(points,k):
    return heapq.nsmallest(k,points,key=lambda p:p[0]**2+p[1]**2)`}}),e.jsx(w,{num:4,title:"Kth Largest Element in a Stream",difficulty:"LC Medium",tags:["LC 703","Design + Min-Heap"],statement:"Design a class that finds the <strong>kth largest element</strong> in a stream. Implement <code>KthLargest(k, nums)</code> and <code>add(val)</code> which returns the kth largest after each insertion.",constraints:["1 ≤ k ≤ 10⁴","0 ≤ nums.length ≤ 10⁴","−10⁴ ≤ nums[i], val ≤ 10⁴","add() called at most 10⁴ times","It's guaranteed the answer always exists"],examples:[{input:"k=3, nums=[4,5,8,2]. add(3)→4, add(5)→5, add(10)→8, add(9)→8, add(4)→8",output:"[4,5,8,8,8]"}],approach:"Maintain a min-heap of size K. Initialization: insert all nums, trim to K. add(val): push val, if size > K pop min. Return heap.top() = Kth largest. add() is O(log K). The heap always contains exactly the K largest seen, root = Kth largest.",code:{cpp:`class KthLargest {
    priority_queue<int,vector<int>,greater<int>> h;
    int k;
public:
    KthLargest(int k,vector<int>& nums):k(k){
        for(int x:nums){h.push(x);if((int)h.size()>k)h.pop();}
    }
    int add(int val){
        h.push(val);if((int)h.size()>k)h.pop();return h.top();
    }
};`,python:`import heapq
class KthLargest:
    def __init__(self,k,nums):
        self.k=k;self.h=[]
        for x in nums:heapq.heappush(self.h,x)
        while len(self.h)>k:heapq.heappop(self.h)
    def add(self,val):
        heapq.heappush(self.h,val)
        if len(self.h)>self.k:heapq.heappop(self.h)
        return self.h[0]`}}),e.jsx(w,{num:5,title:"Merge K Sorted Lists",difficulty:"LC Hard",tags:["LC 23","K-Way Merge"],statement:"Given an array of <code>k</code> linked-lists, each sorted in ascending order, merge all the linked-lists into one sorted linked-list and return it.",constraints:["k = lists.length","0 ≤ k ≤ 10⁴","0 ≤ list.length ≤ 500","−10⁴ ≤ val ≤ 10⁴"],examples:[{input:"lists=[[1,4,5],[1,3,4],[2,6]]",output:"[1,1,2,3,4,4,5,6]"}],approach:"Use a min-heap of size K. Initialize with the head of each non-empty list. Each step: pop the minimum node, add it to result, push its next node (if exists). O(n log K) where n = total nodes. This generalizes to merging K sorted arrays.",code:{cpp:`ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp=[](ListNode* a,ListNode* b){return a->val>b->val;};
    priority_queue<ListNode*,vector<ListNode*>,decltype(cmp)> h(cmp);
    for(auto l:lists) if(l) h.push(l);
    ListNode dummy(0); auto t=&dummy;
    while(!h.empty()){
        t->next=h.top();h.pop();t=t->next;
        if(t->next) h.push(t->next);
    }
    return dummy.next;
}`,python:`import heapq
def merge_k_lists(lists):
    h=[(l.val,i,l) for i,l in enumerate(lists) if l]
    heapq.heapify(h)
    dummy=tail=ListNode(0)
    while h:
        v,i,n=heapq.heappop(h)
        tail.next=n;tail=tail.next
        if n.next:heapq.heappush(h,(n.next.val,i,n.next))
    return dummy.next`}}),e.jsx(w,{num:6,title:"Find Median from Data Stream",difficulty:"LC Hard",tags:["LC 295","Two Heaps"],statement:"Design a data structure that supports adding integers from a data stream and returning the median at any time.",constraints:["−10⁵ ≤ num ≤ 10⁵","At most 5×10⁴ operations","At least one element before findMedian()"],examples:[{input:"addNum(1), addNum(2), findMedian→1.5, addNum(3), findMedian→2.0",output:"[1.5, 2.0]"}],approach:"Two heaps: max-heap (lo) for lower half, min-heap (hi) for upper half. Invariant: lo.size() ≥ hi.size() and lo.size() - hi.size() ≤ 1. Every addNum balances both heaps. findMedian: lo.size() > hi.size() → return lo.top(); else → (lo.top() + hi.top()) / 2. O(log n) add, O(1) median.",code:{cpp:`class MedianFinder {
    priority_queue<int> lo;
    priority_queue<int,vector<int>,greater<int>> hi;
public:
    void addNum(int n){
        lo.push(n);hi.push(lo.top());lo.pop();
        if(hi.size()>lo.size()){lo.push(hi.top());hi.pop();}
    }
    double findMedian(){
        return lo.size()>hi.size()?lo.top():(lo.top()+hi.top())/2.0;
    }
};`,python:`class MedianFinder:
    def __init__(self):self.lo=[];self.hi=[]
    def add_num(self,n):
        heapq.heappush(self.lo,-n)
        heapq.heappush(self.hi,-heapq.heappop(self.lo))
        if len(self.hi)>len(self.lo):
            heapq.heappush(self.lo,-heapq.heappop(self.hi))
    def find_median(self):
        if len(self.lo)>len(self.hi):return -self.lo[0]
        return(-self.lo[0]+self.hi[0])/2.0`}})]})}const $=[{id:"fundamentals",label:"Heap Fundamentals"},{id:"build",label:"Build Heap & Heap Sort"},{id:"topk",label:"Top-K Patterns"},{id:"problems",label:"Problems"}];function V(){const[r,l]=k.useState("fundamentals"),t={fundamentals:e.jsx(N,{}),build:e.jsx(W,{}),topk:e.jsx(I,{}),problems:e.jsx(D,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 19"}),e.jsx("h1",{className:"page-header-title",children:"Binary Heaps"}),e.jsx("p",{className:"page-header-subtitle",children:"Array Representation · Heapify · Build O(n) · Heap Sort · Priority Queue · Top-K · Median Stream · LC 215, 347, 973, 703"})]}),e.jsx(_,{tabs:$,active:r,onChange:l}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:t[r]}),e.jsx(H,{moduleId:19})]})}export{V as default};
