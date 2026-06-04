import{r as k,j as e}from"./index-D9jkHkZY.js";import{S as J,N as V,d as g,c as d,H as p,P as j,G as F,C as R,a as b,T as A,Q as v,V as O}from"./SectionNav-BHzhBu3R.js";const z=[{frames:[{call:"main()",note:"invokes factorial(4)",top:!1}],desc:"Program begins — main() calls factorial(4)"},{frames:[{call:"main()",note:"suspended, waiting…",top:!1},{call:"factorial(4)",note:"n=4 → calls factorial(3)",top:!0}],desc:"Frame pushed: factorial(4) — cannot return yet, needs factorial(3)"},{frames:[{call:"main()",note:"suspended, waiting…",top:!1},{call:"factorial(4)",note:"n=4 → suspended…",top:!1},{call:"factorial(3)",note:"n=3 → calls factorial(2)",top:!0}],desc:"Frame pushed: factorial(3)"},{frames:[{call:"main()",note:"suspended, waiting…",top:!1},{call:"factorial(4)",note:"n=4 → suspended…",top:!1},{call:"factorial(3)",note:"n=3 → suspended…",top:!1},{call:"factorial(2)",note:"n=2 → calls factorial(1)",top:!0}],desc:"Frame pushed: factorial(2)"},{frames:[{call:"main()",note:"suspended, waiting…",top:!1},{call:"factorial(4)",note:"n=4 → suspended…",top:!1},{call:"factorial(3)",note:"n=3 → suspended…",top:!1},{call:"factorial(2)",note:"n=2 → suspended…",top:!1},{call:"factorial(1)",note:"n=1 ≤ 1  →  BASE CASE!",top:!0,isBase:!0}],desc:"Base case reached — stack is at maximum depth. Unwinding begins."},{frames:[{call:"main()",note:"suspended, waiting…",top:!1},{call:"factorial(4)",note:"n=4 → suspended…",top:!1},{call:"factorial(3)",note:"n=3 → suspended…",top:!1},{call:"factorial(2)",note:"returns 2 × 1 = 2",top:!0,isRet:!0}],desc:"factorial(1) returns 1 → popped. factorial(2) computes 2 × 1 = 2"},{frames:[{call:"main()",note:"suspended, waiting…",top:!1},{call:"factorial(4)",note:"n=4 → suspended…",top:!1},{call:"factorial(3)",note:"returns 3 × 2 = 6",top:!0,isRet:!0}],desc:"factorial(2) returns 2 → popped. factorial(3) computes 3 × 2 = 6"},{frames:[{call:"main()",note:"suspended, waiting…",top:!1},{call:"factorial(4)",note:"returns 4 × 6 = 24",top:!0,isRet:!0}],desc:"factorial(3) returns 6 → popped. factorial(4) computes 4 × 6 = 24"},{frames:[{call:"main()",note:"receives result: 24 ✓",top:!0,isDone:!0}],result:"24",desc:"factorial(4) returns 24 → stack fully unwound. Program continues."}];function K(){const[r,i]=k.useState(0),n=z[r],s=t=>t.isBase?"success":t.isRet?"warning":t.isDone?"success":t.top?"info":null,o=t=>t.isBase||t.isDone||t.isRet?`var(--color-background-${s(t)})`:t.top?"var(--color-background-info)":"var(--color-background-secondary)",c=t=>t.isBase||t.isDone||t.isRet?`var(--color-border-${s(t)})`:t.top?"var(--color-border-info)":"var(--color-border-tertiary)",a=t=>t.isBase||t.isDone||t.isRet?`var(--color-text-${s(t)})`:t.top?"var(--color-text-info)":"var(--color-text-secondary)";return e.jsxs(O,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55,fontStyle:"italic"},children:n.desc}),e.jsxs("div",{style:{display:"flex",gap:14},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8,letterSpacing:"0.07em"},children:"▲ STACK TOP — most recent call"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,minHeight:180},children:[...n.frames].reverse().map((t,l)=>e.jsxs("div",{style:{padding:"7px 12px",background:o(t),border:`1px solid ${c(t)}`,borderRadius:"var(--border-radius-md)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,fontWeight:600,color:a(t)},children:t.call}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,color:a(t),opacity:.85},children:t.note})]},l))}),e.jsx("div",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginTop:6,letterSpacing:"0.07em"},children:"▼ STACK BOTTOM — program entry"})]}),e.jsxs("div",{style:{width:120,display:"flex",flexDirection:"column",gap:6,paddingTop:20},children:[[{c:"info",l:"Active frame"},{c:"success",l:"Base / Done"},{c:"warning",l:"Returning"}].map(({c:t,l})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:11},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:2,background:`var(--color-background-${t})`,border:`1px solid var(--color-border-${t})`,flexShrink:0}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:l})]},t)),n.result&&e.jsxs("div",{style:{marginTop:10,padding:"8px 10px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:10,color:"var(--color-text-success)",marginBottom:3},children:"RESULT"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:"var(--color-text-success)"},children:n.result})]})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",justifyContent:"center",marginTop:14},children:[[{label:"← Prev",action:()=>i(Math.max(0,r-1)),disabled:r===0},{label:"Next →",action:()=>i(Math.min(z.length-1,r+1)),disabled:r===z.length-1}].map(({label:t,action:l,disabled:x})=>e.jsx("button",{onClick:l,disabled:x,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:x?"not-allowed":"pointer",fontSize:12,fontFamily:"var(--font-sans)",opacity:x?.4:1},children:t},t)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center"},children:[r+1," / ",z.length]}),e.jsx("button",{onClick:()=>i(0),style:{padding:"5px 10px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function P(r,i=new Set){const n=i.has(r);return i.add(r),{k:r,isBase:r<=1,isDup:n,children:r>1?[P(r-1,i),P(r-2,i)]:[]}}function D(r,i={}){return i[r]=(i[r]||0)+1,r>1&&(D(r-1,i),D(r-2,i)),i}function $({node:r,prefix:i,isLast:n,callCounts:s}){const o=i+(n?"└── ":"├── "),c=i+(n?"    ":"│   "),a=r.isBase?"#4EC9B0":r.isDup?"#CE9178":"#9CDCFE";return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{lineHeight:1.75,whiteSpace:"pre"},children:[e.jsx("span",{style:{color:"#3D4460"},children:o}),e.jsxs("span",{style:{color:a,fontWeight:600},children:["fib(",r.k,")"]}),!r.isBase&&r.isDup&&e.jsxs("span",{style:{color:"#CE9178",opacity:.75,fontSize:11},children:["  ⚠ ×",s[r.k]," total"]}),r.isBase&&e.jsxs("span",{style:{color:"#4EC9B0",opacity:.65,fontSize:11},children:["  → ",r.k===1?"returns 1":"returns 0"]})]}),r.children.map((t,l)=>e.jsx($,{node:t,prefix:c,isLast:l===r.children.length-1,callCounts:s},l))]})}function Q(){const[r,i]=k.useState(5),n=P(r),s=D(r),o=Object.values(s).reduce((a,t)=>a+t,0),c=Object.entries(s).filter(([a])=>+a>1).reduce((a,[,t])=>a+(t-1),0);return e.jsxs(O,{children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"60px 1fr 36px",alignItems:"center",gap:8,marginBottom:14},children:[e.jsx("span",{style:{fontSize:13,color:"var(--color-text-secondary)"},children:"n ="}),e.jsx("input",{type:"range",min:2,max:6,value:r,onChange:a=>i(+a.target.value)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right"},children:r})]}),e.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"12px 16px",overflowX:"auto",marginBottom:12},children:e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12.5},children:[e.jsxs("div",{style:{color:"#9CDCFE",fontWeight:700,marginBottom:2},children:["fib(",r,") ",e.jsx("span",{style:{color:"#6A9955",fontWeight:400},children:"// O(2ⁿ) calls without memoization"})]}),n.children.map((a,t)=>e.jsx($,{node:a,prefix:"",isLast:t===n.children.length-1,callCounts:s},t))]})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8},children:[{label:"Total calls",val:o,color:"info"},{label:"Redundant calls",val:c,color:"warning"},{label:"Unique subproblems",val:Object.keys(s).length,color:"success"}].map(({label:a,val:t,color:l})=>e.jsxs("div",{style:{background:`var(--color-background-${l})`,border:`0.5px solid var(--color-border-${l})`,borderRadius:"var(--border-radius-md)",padding:"8px 10px",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:15,fontWeight:700,color:`var(--color-text-${l})`},children:t}),e.jsx("div",{style:{fontSize:11,color:`var(--color-text-${l})`,marginTop:2},children:a})]},a))}),e.jsx("div",{style:{display:"flex",gap:14,marginTop:10,flexWrap:"wrap"},children:[{clr:"#9CDCFE",l:"Unique evaluation"},{clr:"#CE9178",l:"Duplicate (wasted work)"},{clr:"#4EC9B0",l:"Base case"}].map(({clr:a,l:t})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:11},children:[e.jsx("div",{style:{width:9,height:9,borderRadius:2,background:a}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:t})]},t))})]})}function X(){const[r,i]=k.useState(64),[n,s]=k.useState(2),o=[];let c=r;for(;c>=1&&(o.push(c),!(c<n));)c=Math.floor(c/n);const a=o.length-1;return e.jsxs(O,{children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:12,color:"var(--color-text-secondary)",marginBottom:5},children:["n = ",r]}),e.jsx("input",{type:"range",min:1,max:256,value:r,onChange:t=>i(+t.target.value),style:{width:"100%"}})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:12,color:"var(--color-text-secondary)",marginBottom:5},children:["m = ",n]}),e.jsx("input",{type:"range",min:2,max:10,value:n,onChange:t=>s(+t.target.value),style:{width:"100%"}})]})]}),e.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"10px 14px",marginBottom:12,overflowX:"auto"},children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",fontFamily:"var(--font-mono)",fontSize:12},children:o.map((t,l)=>e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:5},children:[e.jsxs("span",{style:{padding:"2px 7px",borderRadius:4,background:l===0?"#1E3A5F":l===o.length-1?"#112408":"rgba(156,220,254,0.06)",color:l===0?"#9CDCFE":l===o.length-1?"#4EC9B0":"#7A8599",border:`1px solid ${l===0?"#2563EB33":l===o.length-1?"#4EC9B033":"#ffffff0D"}`},children:["fun(",t,")"]}),l<o.length-1&&e.jsx("span",{style:{color:"#3D4460"},children:"→"})]},l))})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"10px 12px"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-info)",marginBottom:4},children:"Recursion depth"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:18,fontWeight:700,color:"var(--color-text-info)"},children:a}),e.jsxs("div",{style:{fontSize:11,color:"var(--color-text-info)",opacity:.8,marginTop:2},children:["= ⌊log",n,"(",r,")⌋"]})]}),e.jsxs("div",{style:{background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"10px 12px"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-success)",marginBottom:4},children:"Formula check"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:18,fontWeight:700,color:"var(--color-text-success)"},children:Math.floor(Math.log(r)/Math.log(n))}),e.jsxs("div",{style:{fontSize:11,color:"var(--color-text-success)",opacity:.8,marginTop:2},children:["Math.floor(log",n,"(",r,"))"]})]})]})]})}function M(r,i=0,n=2,s=1){return r===0?[]:[...M(r-1,i,s,n),[i,n],...M(r-1,s,n,i)]}function Y(r,i,n){const s=[Array.from({length:r},(o,c)=>r-c),[],[]];for(let o=0;o<i;o++){const[c,a]=n[o];s[a].push(s[c].pop())}return s}const q=["#4EC9B0","#81B4EA","#DCDCAA","#CE9178","#C586C0"],E=["A","B","C"];function Z(){const[r,i]=k.useState(3),[n,s]=k.useState(0),o=M(r),c=o.length,a=Y(r,n,o),t=n>0?o[n-1]:null,l=20+r*16,x=h=>{i(h),s(0)};return e.jsxs(O,{children:[e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center",marginBottom:14,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,color:"var(--color-text-secondary)"},children:"Disks:"}),[1,2,3,4,5].map(h=>e.jsx("button",{onClick:()=>x(h),style:{width:28,height:28,borderRadius:4,border:"1px solid",borderColor:r===h?"var(--color-border-info)":"var(--color-border-tertiary)",background:r===h?"var(--color-background-info)":"transparent",color:r===h?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:13,fontFamily:"var(--font-mono)",fontWeight:600},children:h},h))]}),e.jsxs("div",{style:{marginLeft:"auto",fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)"},children:["2^",r," − 1 = ",c," moves"]})]}),e.jsx("div",{style:{minHeight:28,marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center"},children:t?e.jsxs("span",{style:{fontSize:12.5,fontFamily:"var(--font-mono)",color:"var(--color-text-info)",padding:"3px 12px",background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:20},children:["Move disk from peg ",E[t[0]]," → peg ",E[t[1]]]}):e.jsxs("span",{style:{fontSize:12,color:"var(--color-text-tertiary)"},children:["Initial state — all ",r," disk",r>1?"s":""," on peg A"]})}),e.jsx("div",{style:{display:"flex",justifyContent:"space-around",marginBottom:16},children:a.map((h,w)=>e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs("div",{style:{fontSize:11,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8},children:["Peg ",E[w]]}),e.jsxs("div",{style:{position:"relative",width:l+24,height:r*19+14,display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center"},children:[e.jsx("div",{style:{position:"absolute",top:0,bottom:8,left:"50%",width:3,transform:"translateX(-50%)",background:"var(--color-border-secondary)",borderRadius:2,zIndex:0}}),[...h].reverse().map((u,y)=>e.jsx("div",{style:{width:20+u*16,height:15,borderRadius:4,zIndex:1,background:q[(u-1)%q.length],marginBottom:2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontFamily:"var(--font-mono)",color:"rgba(0,0,0,0.55)",fontWeight:700,boxShadow:"inset 0 1px 0 rgba(255,255,255,0.2)"},children:u},y)),e.jsx("div",{style:{width:l+14,height:5,background:"var(--color-border-secondary)",borderRadius:2,zIndex:1}})]})]},w))}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>s(Math.max(0,n-1)),disabled:n===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n===0?"not-allowed":"pointer",fontSize:12,fontFamily:"var(--font-sans)",opacity:n===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:72,textAlign:"center"},children:[n," / ",c]}),e.jsx("button",{onClick:()=>s(Math.min(c,n+1)),disabled:n===c,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n===c?"not-allowed":"pointer",fontSize:12,fontFamily:"var(--font-sans)",opacity:n===c?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>s(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>s(c),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function ee(r,i){const n=Array.from({length:r},(c,a)=>a),s=[];let o=0;for(;n.length>1;)o=(o+i-1)%n.length,s.push(n[o]),n.splice(o,1),o>=n.length&&(o=0);return s.push(n[0]),s}function re(){const[r,i]=k.useState(7),[n,s]=k.useState(3),[o,c]=k.useState(0),a=ee(r,n),t=a[r-1],l=o===r,x=new Set(o>0?a.slice(0,Math.min(o,r-1)):[]),h=o>0&&o<r?a[o-1]:null,w=(m,f)=>{i(m),s(f),c(0)},u=120,y=120,I=80,G=14;return e.jsxs(O,{children:[e.jsxs("div",{style:{display:"flex",gap:16,flexWrap:"wrap",marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,color:"var(--color-text-secondary)"},children:"People (n):"}),[4,5,6,7,8,9].map(m=>e.jsx("button",{onClick:()=>w(m,n),style:{width:26,height:26,borderRadius:4,border:"1px solid",borderColor:r===m?"var(--color-border-info)":"var(--color-border-tertiary)",background:r===m?"var(--color-background-info)":"transparent",color:r===m?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12,fontFamily:"var(--font-mono)"},children:m},m))]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,color:"var(--color-text-secondary)"},children:"Step (k):"}),[1,2,3,4,5].map(m=>e.jsx("button",{onClick:()=>w(r,m),style:{width:26,height:26,borderRadius:4,border:"1px solid",borderColor:n===m?"var(--color-border-warning)":"var(--color-border-tertiary)",background:n===m?"var(--color-background-warning)":"transparent",color:n===m?"var(--color-text-warning)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12,fontFamily:"var(--font-mono)"},children:m},m))]})]}),e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"flex-start"},children:[e.jsxs("svg",{width:240,height:240,viewBox:"0 0 240 240",children:[e.jsx("circle",{cx:u,cy:y,r:I,fill:"none",stroke:"var(--color-border-tertiary)",strokeWidth:1,strokeDasharray:"4 3"}),Array.from({length:r},(m,f)=>{const W=2*Math.PI*f/r-Math.PI/2,T=u+I*Math.cos(W),S=y+I*Math.sin(W),H=x.has(f),L=f===h,U=l&&f===t;let B="var(--color-background-info)",N="var(--color-border-info)",_="var(--color-text-info)";return L?(B="var(--color-background-danger)",N="var(--color-border-danger)",_="var(--color-text-danger)"):H?(B="var(--color-background-tertiary)",N="var(--color-border-tertiary)",_="var(--color-text-tertiary)"):U&&(B="var(--color-background-success)",N="var(--color-border-success)",_="var(--color-text-success)"),e.jsxs("g",{children:[e.jsx("circle",{cx:T,cy:S,r:G,style:{fill:B,stroke:N},strokeWidth:1.5}),H&&!L&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:T-7,y1:S-7,x2:T+7,y2:S+7,stroke:"var(--color-text-tertiary)",strokeWidth:1.5,opacity:.6}),e.jsx("line",{x1:T+7,y1:S-7,x2:T-7,y2:S+7,stroke:"var(--color-text-tertiary)",strokeWidth:1.5,opacity:.6})]}),e.jsx("text",{x:T,y:S+4,textAnchor:"middle",style:{fill:_},fontSize:11,fontFamily:"var(--font-mono)",fontWeight:600,children:f})]},f)}),e.jsx("text",{x:u,y:y-6,textAnchor:"middle",style:{fill:"var(--color-text-tertiary)"},fontSize:10,fontFamily:"var(--font-mono)",children:l?"SURVIVOR":`n=${r}, k=${n}`}),e.jsx("text",{x:u,y:y+10,textAnchor:"middle",style:{fill:l?"var(--color-text-success)":h!==null?"var(--color-text-danger)":"var(--color-text-tertiary)"},fontSize:l?15:11,fontFamily:"var(--font-mono)",fontWeight:l?700:400,children:l?`P${t} ★`:h!==null?`✕ P${h}`:""})]}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:10,color:"var(--color-text-tertiary)",fontFamily:"var(--font-mono)",marginBottom:7,letterSpacing:"0.06em"},children:"ELIMINATION LOG"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3,maxHeight:190,overflowY:"auto"},children:[Array.from({length:Math.min(o,r-1)},(m,f)=>e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",padding:"4px 8px",background:f===o-1?"var(--color-background-danger)":"var(--color-background-secondary)",border:`0.5px solid ${f===o-1?"var(--color-border-danger)":"var(--color-border-tertiary)"}`,borderRadius:4,fontSize:11.5},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--color-text-tertiary)",minWidth:26},children:["R",f+1]}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:f===o-1?"var(--color-text-danger)":"var(--color-text-secondary)"},children:["P",a[f]," eliminated"]})]},f)),l&&e.jsxs("div",{style:{padding:"6px 8px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:4,fontFamily:"var(--font-mono)",fontSize:11.5,color:"var(--color-text-success)"},children:["★ P",t," survives — jos(",r,",",n,") = ",t]})]})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",justifyContent:"center",marginTop:14},children:[e.jsx("button",{onClick:()=>c(Math.max(0,o-1)),disabled:o===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:o===0?"not-allowed":"pointer",fontSize:12,opacity:o===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:52,textAlign:"center"},children:[o," / ",r]}),e.jsx("button",{onClick:()=>c(Math.min(r,o+1)),disabled:o===r,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:o===r?"not-allowed":"pointer",fontSize:12,opacity:o===r?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>c(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const te={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function C({num:r,title:i,difficulty:n,tags:s=[],statement:o,constraints:c=[],examples:a=[],approach:t,code:l}){const[x,h]=k.useState(!1),w=te[n]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",r]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:i})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[s.map(u=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:u},u)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${w})`,color:`var(--color-text-${w})`,border:`1px solid var(--color-border-${w})`},children:n})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:o}}),c.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:c.map((u,y)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:u},y))})]}),a.length>0&&e.jsx("div",{style:{marginBottom:14},children:a.map((u,y)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",y+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:u.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:u.output})]}),u.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:u.note})]},y))}),e.jsxs("button",{onClick:()=>h(!x),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:x?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${x?"eye-off":"bulb"}`}),x?"Hide Solution":"Show Approach & Solution"]}),x&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),t]}),e.jsx(b,{children:l})]})]})]})}function ne(){return e.jsxs("div",{children:[e.jsxs(g,{color:"info",icon:"ti-refresh",children:[e.jsx("strong",{children:"One-sentence definition:"})," Recursion is a technique where a function solves a problem by calling itself on a strictly smaller version of the same problem, until reaching a base case that can be answered directly — no further calls needed."]}),e.jsx(p,{children:"Direct vs Indirect Recursion"}),e.jsxs(j,{children:["A function is ",e.jsx("strong",{children:"directly recursive"})," if it calls itself within its own body. It is ",e.jsx("strong",{children:"indirectly recursive"})," if it calls a chain of other functions that eventually call it back — forming a cycle."]}),e.jsxs(F,{cols:2,children:[e.jsx(R,{title:"Direct Recursion",color:"info",children:"The function references itself. Straightforward call graph: one node with a self-loop. The overwhelming majority of DSA problems use this form."}),e.jsx(R,{title:"Indirect Recursion",color:"warning",children:"A → B → C → A forms a multi-node cycle. Used to model interleaved state machines (e.g., tokenizers, mutually recursive grammars). Requires forward declarations in C++."})]}),e.jsx(b,{children:{cpp:`// ── Direct Recursion ─────────────────────────────
int factorial(int n) {
    if (n == 0) return 1;          // base case
    return n * factorial(n - 1);   // calls itself
}

// ── Indirect Recursion (A calls B, B calls A) ──────
void funcA(int n);   // forward declaration required in C++

void funcB(int n) {
    if (n <= 0) return;
    cout << "B(" << n << ") ";
    funcA(n - 1);    // B calls A
}
void funcA(int n) {
    if (n <= 0) return;
    cout << "A(" << n << ") ";
    funcB(n - 1);    // A calls B  ← indirect cycle
}
// funcA(3) → "A(3) B(2) A(1)"`,python:`# ── Direct Recursion ──────────────────────────────
def factorial(n):
    if n == 0: return 1
    return n * factorial(n - 1)

# ── Indirect Recursion ────────────────────────────
# Python does NOT need forward declarations
def func_a(n):
    if n <= 0: return
    print(f"A({n})", end=' ')
    func_b(n - 1)

def func_b(n):
    if n <= 0: return
    print(f"B({n})", end=' ')
    func_a(n - 1)

# func_a(3) → "A(3) B(2) A(1)"`}}),e.jsx(p,{children:"The Three Pillars of Every Recursive Function"}),e.jsx(F,{cols:3,children:[{n:"1",title:"Base Case",color:"success",icon:"ti-anchor",body:"The condition under which the function stops and returns a direct answer. Without a base case, recursion is infinite → stack overflow. Every possible input path must eventually reach it."},{n:"2",title:"Recursive Case",color:"info",icon:"ti-arrows-split-2",body:'The part where the function calls itself on a smaller/simpler input. This is the "leap of faith" — write it assuming the sub-call returns the correct answer for the smaller problem.'},{n:"3",title:"Progress Toward Base",color:"warning",icon:"ti-trending-down",body:"Each call must move the problem strictly closer to the base case (e.g., n-1, n/2). If the argument does not shrink, the recursion never terminates."}].map(({n:r,title:i,color:n,icon:s,body:o})=>e.jsxs("div",{style:{background:`var(--color-background-${n})`,border:`0.5px solid var(--color-border-${n})`,borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:6},children:[e.jsx("i",{className:`ti ${s}`,style:{fontSize:16,color:`var(--color-text-${n})`}}),e.jsx("span",{style:{fontWeight:600,fontSize:13,color:`var(--color-text-${n})`},children:i})]}),e.jsx("div",{style:{fontSize:12.5,color:`var(--color-text-${n})`,lineHeight:1.65},children:o})]},r))}),e.jsxs(g,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:'The "Leap of Faith" principle:'})," When writing the recursive case, do ",e.jsx("em",{children:"not"})," mentally trace the entire call tree — trust the function's own specification. If ",e.jsx("code",{children:"factorial(n)"}),' is defined as "returns n!", then write ',e.jsx("code",{children:"n * factorial(n-1)"})," by assuming ",e.jsx("code",{children:"factorial(n-1)"})," returns ",e.jsx("code",{children:"(n-1)!"})," correctly. The base case + inductive step take care of correctness automatically."]}),e.jsx(p,{children:"The Call Stack — How Recursion Actually Executes"}),e.jsxs(j,{children:["Every function call pushes a new ",e.jsx("strong",{children:"stack frame"})," onto the call stack — containing the function's local variables, parameters, and the return address. Recursion builds a tower of frames during ",e.jsx("em",{children:"winding"}),", then destroys them during ",e.jsx("em",{children:"unwinding"}),". Step through the example below."]}),e.jsx(K,{}),e.jsxs(g,{color:"danger",icon:"ti-alert-circle",children:[e.jsx("strong",{children:"Stack overflow:"})," The OS allocates a fixed stack size (typically 1–8 MB). For a recursion depth of ",e.jsx("code",{children:"n = 10⁵"}),", with each frame using ~100 bytes, that's 10 MB — exceeding the limit. C++ crashes with a segfault; Python raises ",e.jsx("code",{children:"RecursionError"}),". Solution: increase ",e.jsx("code",{children:"sys.setrecursionlimit"}),", or convert to iteration."]}),e.jsx(p,{children:"Visualizing Redundant Work — The Fibonacci Call Tree"}),e.jsxs(j,{children:["A ",e.jsx("strong",{children:"call tree"})," maps every function invocation as a node, with sub-calls as children. The total number of nodes = total work performed. For naive Fibonacci, the tree exposes a critical flaw: the same subproblem is solved exponentially many times — the root cause of O(2ⁿ) complexity. Memoization (covered in DP module) collapses this to O(n)."]}),e.jsx(Q,{}),e.jsx(p,{children:"Recursion vs Iteration — At a Glance"}),e.jsx(A,{heads:["Criterion","Recursion","Iteration"],rows:[["Code clarity","High for divide & conquer, trees, graphs","Clearer for linear traversals"],["Stack usage","O(depth) — implicit call stack","O(1) — no extra stack"],["Overflow risk","Yes — deep recursion can crash","None"],["Tracing / debugging","Harder — must follow call tree","Straightforward sequential steps"],["Converting to iteration","Always possible — use explicit stack","Already iterative"],["Best for","Trees, DFS, backtracking, D&C","Array scanning, BFS (with queue)"]]}),e.jsx(v,{q:"What happens if a recursive function has no base case?",a:"It calls itself indefinitely, pushing stack frames until the call stack overflows. C++ raises a segmentation fault; Python raises <code>RecursionError: maximum recursion depth exceeded</code> (default limit: 1000). The program terminates abnormally. Always verify that every execution path reaches the base case."}),e.jsx(v,{q:"What is the difference between winding and unwinding in recursion?",a:"<strong>Winding</strong> is the forward phase — the function keeps calling itself, pushing stack frames. Each frame waits for its sub-call to return. <strong>Unwinding</strong> begins once the base case is reached — frames are popped in LIFO order, each completing its pending work. For <code>factorial(4)</code>: winding pushes (4)→(3)→(2)→(1). Unwinding returns 1→2→6→24 back up the chain."}),e.jsx(v,{q:"Why does recursion have O(n) space complexity even without allocating any data structures?",a:"Each stack frame stores local variables, function parameters, and the return address. For depth-n recursion, n frames are alive simultaneously at maximum depth. This implicit O(n) memory is consumed by the <em>call stack</em> itself — you don't declare it, but the OS allocates it. This is why recursion with large n can cause stack overflow even when the algorithm itself seems memory-light."}),e.jsx(v,{q:"Is all recursion expressible as iteration?",a:"Yes — any recursive algorithm can be converted to an iterative one using an explicit stack data structure. DFS written recursively is equivalent to DFS written with an explicit stack. The trade-off is code readability: recursive DFS/backtracking is typically far cleaner. In practice, convert to iteration when you hit recursion depth limits or need O(1) stack space."})]})}function oe(){return e.jsxs("div",{children:[e.jsx(p,{children:"Tail Recursion — Definition"}),e.jsxs(g,{color:"info",icon:"ti-bulb",children:["A function is ",e.jsx("strong",{children:"tail recursive"})," if the recursive call is the ",e.jsx("em",{children:"absolute last operation"})," performed — no computation happens after it returns. The result of the recursive call is returned directly without modification."]}),e.jsxs(F,{cols:2,children:[e.jsxs(R,{title:"NOT Tail Recursive",color:"danger",children:["The multiplication ",e.jsx(d,{children:"n * ..."})," is pending after the call returns. A frame must be kept alive to hold ",e.jsx(d,{children:"n"})," for this deferred work.",e.jsx(b,{lang:"cpp",children:`int fact(int n) {
    if (n == 0) return 1;
    // PENDING: n × (result)
    return n * fact(n - 1);
}`})]}),e.jsxs(R,{title:"Tail Recursive",color:"success",children:["The accumulator ",e.jsx(d,{children:"acc"})," carries the running product. Nothing is pending after the recursive call — the frame can be discarded.",e.jsx(b,{lang:"cpp",children:`int fact(int n, int acc = 1) {
    if (n == 0) return acc;
    // LAST OP — pure tail call
    return fact(n - 1, n * acc);
}`})]})]}),e.jsx(p,{children:"Tail Call Elimination (TCE)"}),e.jsxs(j,{children:["With TCE, the compiler ",e.jsx("strong",{children:"reuses the current stack frame"})," for the tail call instead of pushing a new one — converting O(n) stack space to O(1). This turns tail recursion into a loop at the machine level."]}),e.jsx(A,{heads:["Language / Compiler","TCE Support","Notes"],rows:[["C++ (GCC/Clang -O2)","✓ Yes","Compiler automatically eliminates tail calls with optimizations on"],["Python (CPython)","✗ No","Guido's deliberate design choice — use iteration instead of deep recursion"],["Python (PyPy)","Partial","JIT may optimize some patterns, not guaranteed"],["Java (JVM)","✗ No (standard)","JVM spec doesn't mandate TCE; Kotlin/Scala have workarounds"],["Haskell / Scheme / Erlang","✓ Guaranteed","Functional languages mandate TCE by specification"]]}),e.jsx(p,{children:"Print N to 1 and 1 to N — The Pre/Post-Order Trick"}),e.jsxs(j,{children:["The ",e.jsx("em",{children:"position"})," of the print statement relative to the recursive call completely controls output order — no extra data structure needed."]}),e.jsx(b,{children:{cpp:`// Print N → 1  (PRE-ORDER: print before recursing)
void printNTo1(int n) {
    if (n == 0) return;
    cout << n << " ";         // print FIRST → during winding → N,N-1,...,1
    printNTo1(n - 1);
}

// Print 1 → N  (POST-ORDER: print after recursing)
void print1ToN(int n) {
    if (n == 0) return;
    print1ToN(n - 1);         // recurse to base FIRST
    cout << n << " ";         // print AFTER → during unwinding → 1,2,...,N
}`,python:`def print_n_to_1(n):
    if n == 0: return
    print(n, end=' ')         # print first → N, N-1, ..., 1
    print_n_to_1(n - 1)

def print_1_to_n(n):
    if n == 0: return
    print_1_to_n(n - 1)       # recurse first
    print(n, end=' ')         # print after → 1, 2, ..., N`}}),e.jsx(p,{children:"Tail-Recursive Form of Print 1 to N"}),e.jsxs(j,{children:["The post-order version above is NOT tail recursive (work happens after the call returns). Using an ",e.jsx("strong",{children:"accumulator parameter"})," ",e.jsx(d,{children:"k"})," that tracks the current value to print, we restructure into a true tail call:"]}),e.jsx(b,{children:{cpp:`// Tail-Recursive Print 1 to N
// k = accumulator, starts at 1, increments each call
// n = remaining count, decrements each call
void print1ToN(int n, int k = 1) {
    if (n == 0) return;          // printed all n numbers
    cout << k << " ";            // print current number (ascending)
    print1ToN(n - 1, k + 1);    // ← TRUE TAIL CALL (last op, O(1) stack with -O2)
}
// Trace: print1ToN(5) → print 1 → print1ToN(4,2) → print 2 → ...
// Output: 1 2 3 4 5`,python:`import sys
sys.setrecursionlimit(10**6)   # Python has no TCE — raise limit for large n

def print_1_to_n(n, k=1):
    if n == 0: return
    print(k, end=' ')
    print_1_to_n(n - 1, k + 1)   # conceptually tail-recursive (TCE NOT applied)
# Output: 1 2 3 4 5`}}),e.jsx(p,{children:"Logarithmic Recursion Patterns"}),e.jsxs(j,{children:["When each call ",e.jsx("em",{children:"divides"})," its input (rather than subtracting 1), the call depth is logarithmic — O(log n) stack frames, O(log n) time. This is the fingerprint of binary search, fast exponentiation, and balanced tree traversals."]}),e.jsx(b,{children:{cpp:`// Returns ⌊log₂(n)⌋  — how many times can n be halved?
int logDepth(int n) {
    if (n == 1) return 0;           // base: can't halve 1
    return 1 + logDepth(n / 2);    // integer division
}
// logDepth(64) = 6  (64→32→16→8→4→2→1)

// Generalized: Returns ⌊logₘ(n)⌋
int logDepthM(int n, int m) {
    if (n < m) return 0;
    return 1 + logDepthM(n / m, m);
}
// logDepthM(81, 3) = 4  (81→27→9→3 — stops at 3 < 3? no, 1 < 3 yes)
// Actually: 81 → 27 → 9 → 3 → 1  = 4 divisions`,python:`def log_depth(n):
    if n == 1: return 0
    return 1 + log_depth(n // 2)

def log_depth_m(n, m):
    if n < m: return 0
    return 1 + log_depth_m(n // m, m)

import math
# Verify: log_depth_m(81, 3) == math.floor(math.log(81, 3)) == 4 ✓`}}),e.jsx(X,{}),e.jsx(p,{children:"Recursion Complexity Classification"}),e.jsx(A,{heads:["Pattern","Recurrence","Complexity","Canonical Example"],rows:[["Single call, O(1) work","T(n) = T(n−1) + O(1)","O(n)","factorial, print 1..N"],["Single call, O(n) work","T(n) = T(n−1) + O(n)","O(n²)","insertion sort"],["Halving, O(1) work","T(n) = T(n/2) + O(1)","O(log n)","binary search, logDepth"],["Halving, O(n) work","T(n) = T(n/2) + O(n)","O(n)","quickselect expected"],["Two calls, O(1) work","T(n) = 2T(n−1) + O(1)","O(2ⁿ)","naive fib, subset enumeration"],["Two calls, halving","T(n) = 2T(n/2) + O(n)","O(n log n)","merge sort"],["Two calls, halving O(1)","T(n) = 2T(n/2) + O(1)","O(n)","binary tree traversal"]]}),e.jsx(v,{q:"What is the key insight that makes tail recursion convertible to a loop?",a:"In tail recursion, the current stack frame's local variables are no longer needed after the recursive call — the only 'return' is to forward the sub-call's result unchanged. Since no state needs to be preserved, the compiler (with TCE) rewrites this as <em>goto top</em> — overwriting the current frame's parameters with the new values and jumping to the function's start. This is exactly what a while loop does."}),e.jsx(v,{q:"Why does the pre-order trick print N→1 and post-order print 1→N?",a:"In pre-order, the print executes <em>before</em> the recursive call, so it runs during the <em>winding</em> phase (before the base case). Calls execute in the order: print(N), recurse → print(N-1), recurse → ... → print(1). In post-order, the print executes <em>after</em> the recursive call returns, so it runs during <em>unwinding</em>. The deepest frame (n=1) returns first, printing 1, then 2, ..., then N."}),e.jsx(v,{q:"For logDepth(n, m), what is the recurrence and its closed form?",a:"The recurrence is T(n) = T(⌊n/m⌋) + 1 with T(k) = 0 for k < m. Unrolling: after k divisions, we have T(n/mᵏ) + k. We stop when n/mᵏ < m, i.e., k ≈ ⌊logₘ(n)⌋. Closed form: T(n) = ⌊logₘ(n)⌋ = O(log n). This same T(n) = T(n/2) + O(1) pattern governs binary search, and its O(log n) solution is a direct application of the Master Theorem (Case 2)."})]})}function ie(){return e.jsxs("div",{children:[e.jsx(p,{children:"Rope Cutting — Maximum Pieces"}),e.jsxs(g,{color:"info",icon:"ti-scissors",children:[e.jsx("strong",{children:"Problem:"})," Given a rope of length ",e.jsx(d,{children:"n"})," and three allowed cut lengths ",e.jsx(d,{children:"a"}),", ",e.jsx(d,{children:"b"}),", ",e.jsx(d,{children:"c"}),", find the ",e.jsx("strong",{children:"maximum number of pieces"})," the rope can be cut into such that every piece has exactly one of those lengths. If no valid cutting exists, return ",e.jsx(d,{children:"-1"}),"."]}),e.jsxs(j,{children:["At each step, try subtracting ",e.jsx(d,{children:"a"}),", ",e.jsx(d,{children:"b"}),", or ",e.jsx(d,{children:"c"})," from the remaining length. Take the maximum result across the three choices. The ",e.jsx(d,{children:"-1"})," sentinel propagates failure back up — any path that ends at negative ",e.jsx(d,{children:"n"})," is invalid."]}),e.jsx(b,{children:{cpp:`// maxCuts(n, a, b, c) → maximum pieces, or -1 if impossible
int maxCuts(int n, int a, int b, int c) {
    if (n == 0) return 0;    // rope perfectly used — valid endpoint
    if (n <  0) return -1;   // overcut — this path is invalid

    int res = max({ maxCuts(n - a, a, b, c),
                    maxCuts(n - b, a, b, c),
                    maxCuts(n - c, a, b, c) });

    // If ALL three branches returned -1, propagate failure
    return res == -1 ? -1 : res + 1;
}

// maxCuts(5, 1, 2, 3) → 5   (five 1-unit cuts)
// maxCuts(5, 2, 2, 3) → 2   (2 + 3)
// maxCuts(7, 3, 5, 2) → 3   (2 + 2 + 3)
// maxCuts(4, 3, 5, 2) → 2   (2 + 2)`,python:`def max_cuts(n, a, b, c):
    if n == 0: return 0
    if n < 0:  return -1

    res = max(max_cuts(n - a, a, b, c),
              max_cuts(n - b, a, b, c),
              max_cuts(n - c, a, b, c))

    return -1 if res == -1 else res + 1`}}),e.jsx(A,{heads:["Return condition","Value returned","Meaning"],rows:[["n == 0","0","Rope used up perfectly — valid terminal state"],["n < 0","-1","Overcut — this branch of choices is invalid"],["All sub-results == -1","-1","No valid combination from current n — propagate failure"],["At least one sub-result ≥ 0","max + 1","Take the best valid branch, count this cut"]]}),e.jsxs(g,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"The -1 propagation trap:"})," A naive ",e.jsx("code",{children:"return max(...) + 1"})," would compute ",e.jsx("code",{children:"-1 + 1 = 0"})," for a failed branch, falsely treating it as a 0-piece valid solution. Always guard: ",e.jsx("em",{children:"if the best valid sub-result is -1, the current state also returns -1"}),"."]}),e.jsx(p,{children:"Tower of Hanoi"}),e.jsxs(g,{color:"info",icon:"ti-stack-2",children:[e.jsx("strong",{children:"Problem:"})," Move ",e.jsx(d,{children:"n"})," disks from peg A to peg C using peg B as auxiliary. Rules: only one disk may be moved at a time, and a larger disk may never be placed on a smaller one. Find the minimum number of moves and print all moves."]}),e.jsxs(j,{children:["The recursive decomposition is a textbook example of ",e.jsx("em",{children:"trust-the-sub-call"})," reasoning: to move ",e.jsx(d,{children:"n"})," disks from A to C, first move ",e.jsx(d,{children:"n-1"})," disks from A to B (out of the way), then move the largest disk from A to C, then move the ",e.jsx(d,{children:"n-1"})," disks from B to C."]}),e.jsx(Z,{}),e.jsx(b,{children:{cpp:`void TOH(int n, char A, char B, char C) {
    if (n == 1) {
        cout << "Move disk 1: " << A << " → " << C << "\\n";
        return;
    }
    TOH(n - 1, A, C, B);   // Step 1: move n-1 disks  A → B  (using C as aux)
    cout << "Move disk " << n << ": " << A << " → " << C << "\\n";
    TOH(n - 1, B, A, C);   // Step 3: move n-1 disks  B → C  (using A as aux)
}

// Recurrence:  T(n) = 2·T(n−1) + 1,  T(1) = 1
// Closed form: T(n) = 2ⁿ − 1   ← proven to be optimal (lower bound matches)`,python:`def toh(n, a='A', b='B', c='C'):
    if n == 1:
        print(f"Move disk 1: {a} → {c}")
        return
    toh(n - 1, a, c, b)    # A → B using C
    print(f"Move disk {n}: {a} → {c}")
    toh(n - 1, b, a, c)    # B → C using A

# toh(3) prints 7 moves (2³ − 1 = 7)`}}),e.jsx(A,{heads:["n (disks)","T(n) = 2ⁿ − 1","Recurrence derivation"],rows:[["1","1","T(1) = 1 (base case)"],["2","3","2·1 + 1 = 3"],["3","7","2·3 + 1 = 7"],["4","15","2·7 + 1 = 15"],["n","2ⁿ − 1","T(n) = 2·T(n−1) + 1"]]}),e.jsxs(g,{color:"success",icon:"ti-math",children:[e.jsx("strong",{children:"Proof of optimality:"})," The largest disk must move exactly once (A → C). Before that move, all n−1 smaller disks must be on B — requiring at least T(n−1) moves. After the largest disk moves, the n−1 disks must go from B to C — another T(n−1) moves. So T(n) ≥ 2·T(n−1) + 1. Our algorithm achieves exactly this bound, proving it optimal."]}),e.jsx(p,{children:"Josephus Problem"}),e.jsxs(g,{color:"purple",icon:"ti-circle-dot",children:[e.jsx("strong",{children:"Problem:"})," ",e.jsx(d,{children:"n"})," people stand in a circle numbered 0 to n−1. Starting from person 0, every ",e.jsx(d,{children:"k"}),"-th person is eliminated. Counting restarts from the next survivor after each elimination. Find the 0-indexed position of the last person remaining."]}),e.jsxs(j,{children:["The elegant recursive solution uses a ",e.jsx("strong",{children:"coordinate remapping"}),": after the first elimination, renumber the remaining n−1 people starting from the person immediately after the eliminated one. The survivor's position in the smaller sub-problem maps back to the original circle by shifting and wrapping modulo n."]}),e.jsx(re,{}),e.jsx(b,{children:{cpp:`// Recursive — O(n) time, O(n) stack
// Returns 0-indexed safe position for n people, step k
int jos(int n, int k) {
    if (n == 1) return 0;            // base: 1 person always survives at position 0
    return (jos(n - 1, k) + k) % n; // remap sub-problem position back to n-circle
}

// Derivation of (jos(n-1,k) + k) % n:
//   After eliminating person at index (k-1)%n, the next person becomes index 0
//   in the new n-1 circle. If the sub-problem survivor is at position p (in 0..n-2),
//   its original position = (p + k) % n  ← shift by k, wrap around n.

// Iterative equivalent — O(1) stack, safe for large n:
int josIter(int n, int k) {
    int pos = 0;                     // survivor position in 1-person circle = 0
    for (int i = 2; i <= n; i++) {
        pos = (pos + k) % i;         // extend from i-1 circle to i-circle
    }
    return pos;
}
// jos(7, 3) = josIter(7, 3) = 3`,python:`import sys
sys.setrecursionlimit(10**5)

def jos(n, k):
    if n == 1: return 0
    return (jos(n - 1, k) + k) % n

# Iterative (preferred — avoids RecursionError for large n)
def jos_iter(n, k):
    pos = 0
    for i in range(2, n + 1):
        pos = (pos + k) % i
    return pos

# jos(7, 3) == jos_iter(7, 3) == 3`}}),e.jsxs(g,{color:"warning",icon:"ti-info-circle",children:[e.jsx("strong",{children:"The mapping explained step by step:"}),' jos(1,k)=0. For jos(2,k): eliminate position (k−1)%2; the survivor maps to 0 in the sub-problem, shifted back by +k mod 2. For each n, we add one layer of position "un-shifting". The formula ',e.jsx(d,{children:"(jos(n−1,k) + k) % n"})," is an exact coordinate transformation — not an approximation."]}),e.jsx(v,{q:"In Rope Cutting, why can't we just write return max(...) + 1 without the -1 guard?",a:"Because -1 is our sentinel for 'this path leads to no valid cutting.' Without the guard, <code>-1 + 1 = 0</code> would be returned, which looks like a valid 0-piece solution — but it actually means failure. The guard ensures that if every sub-call returns -1 (all three lengths are invalid from current n), we propagate -1 rather than 0."}),e.jsx(v,{q:"Why is Tower of Hanoi considered provably optimal — can any algorithm do it in fewer than 2ⁿ-1 moves?",a:"No. The proof is by induction on the lower bound: moving n disks requires at least 2T(n−1)+1 moves (shown above). Since our recursive algorithm achieves exactly this bound, no algorithm can do better. 2ⁿ−1 is both an upper bound (our algorithm) and a lower bound (the proof), making it the exact minimum."}),e.jsx(v,{q:"What does the Josephus formula jos(n,k) = (jos(n-1,k) + k) % n actually compute geometrically?",a:"It performs a position translation in a circular coordinate system. After eliminating person at index (k−1)%n, the remaining people are renumbered 0 to n−2 starting from the next person. Position p in this new numbering corresponds to position (p + k) % n in the original numbering. The recursion builds up this translation layer by layer from n=1 to n=target."})]})}function se(){return e.jsxs("div",{children:[e.jsxs(g,{color:"info",icon:"ti-math-symbols",children:[e.jsx("strong",{children:"Problem (Count Subsets):"})," Given array ",e.jsx(d,{children:"arr[0..n−1]"})," and target sum ",e.jsx(d,{children:"S"}),", count the number of subsets whose elements sum to exactly ",e.jsx(d,{children:"S"}),". Each element may be included at most once."]}),e.jsx(p,{children:"The Include / Exclude Paradigm"}),e.jsxs(j,{children:["Every element faces a binary decision at each recursive step: ",e.jsx("strong",{children:"include"})," it (subtract from remaining target, advance index) or ",e.jsx("strong",{children:"exclude"})," it (keep target unchanged, advance index). This generates a ",e.jsx("em",{children:"binary decision tree"})," of depth n, with up to 2ⁿ leaf nodes — one for each possible subset."]}),e.jsxs(F,{cols:2,children:[e.jsxs(R,{title:"Include arr[i]",color:"success",children:["Add ",e.jsx(d,{children:"arr[i]"})," to the current subset. Recurse with ",e.jsx(d,{children:"target − arr[i]"})," and index ",e.jsx(d,{children:"i+1"}),". If target reaches 0 at a leaf — count this subset."]}),e.jsxs(R,{title:"Exclude arr[i]",color:"warning",children:["Skip ",e.jsx(d,{children:"arr[i]"}),". Recurse with the same target and index ",e.jsx(d,{children:"i+1"}),". The element is simply not part of this subset."]})]}),e.jsx(p,{children:"Recursion Tree — arr = [2, 3, 1], target = 3"}),e.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"12px 16px",overflowX:"auto",marginBottom:"0.75rem"},children:e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,lineHeight:1.8},children:[e.jsx("div",{style:{color:"#9CDCFE"},children:"subsetCount([2,3,1], target=3, i=0)"}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"├── "}),e.jsx("span",{style:{color:"#4EC9B0"},children:"include 2"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=1, i=1"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"│   ├── "}),e.jsx("span",{style:{color:"#4EC9B0"},children:"include 3"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=−2, i=2  "}),e.jsx("span",{style:{color:"#F44747"},children:"✗ target < 0"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"│   └── "}),e.jsx("span",{style:{color:"#CE9178"},children:"exclude 3"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=1, i=2"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"│       ├── "}),e.jsx("span",{style:{color:"#4EC9B0"},children:"include 1"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=0, i=3  "}),e.jsxs("span",{style:{color:"#4EC9B0"},children:["✓ subset ","{","2,1","}"," counts!"]})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"│       └── "}),e.jsx("span",{style:{color:"#CE9178"},children:"exclude 1"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=1, i=3  "}),e.jsx("span",{style:{color:"#7A8599"},children:"✗ i=n, target≠0"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"└── "}),e.jsx("span",{style:{color:"#CE9178"},children:"exclude 2"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=3, i=1"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"    ├── "}),e.jsx("span",{style:{color:"#4EC9B0"},children:"include 3"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=0, i=2  "}),e.jsxs("span",{style:{color:"#4EC9B0"},children:["✓ subset ","{","3","}"," counts!"]})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"    └── "}),e.jsx("span",{style:{color:"#CE9178"},children:"exclude 3"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=3, i=2"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"        ├── "}),e.jsx("span",{style:{color:"#4EC9B0"},children:"include 1"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=2, i=3  "}),e.jsx("span",{style:{color:"#7A8599"},children:"✗"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#3D4460"},children:"        └── "}),e.jsx("span",{style:{color:"#CE9178"},children:"exclude 1"}),e.jsx("span",{style:{color:"#7A8599"},children:" → target=3, i=3  "}),e.jsx("span",{style:{color:"#7A8599"},children:"✗"})]}),e.jsx("div",{style:{color:"#6A9955",marginTop:6},children:"// Result: 2 subsets  →  {2,1} and {3}"})]})}),e.jsx(p,{children:"Implementation"}),e.jsx(b,{children:{cpp:`// subsetCount(arr, n, target, i)
// Returns: number of subsets of arr[i..n-1] that sum to target
int subsetCount(int arr[], int n, int target, int i = 0) {
    // Base 1: reached target — valid subset found
    if (target == 0) return 1;
    // Base 2: exhausted array OR target went negative (invalid)
    if (i == n || target < 0) return 0;

    int include = subsetCount(arr, n, target - arr[i], i + 1);
    int exclude = subsetCount(arr, n, target,           i + 1);

    return include + exclude;
}

// int arr[] = {2, 3, 1};  subsetCount(arr, 3, 3) → 2`,python:`def subset_count(arr, target, i=0):
    n = len(arr)
    if target == 0: return 1
    if i == n or target < 0: return 0

    include = subset_count(arr, target - arr[i], i + 1)
    exclude = subset_count(arr, target,           i + 1)

    return include + exclude

# subset_count([2, 3, 1], 3) → 2`}}),e.jsx(p,{children:"Complexity Analysis"}),e.jsx(A,{heads:["Metric","Naive Recursion","With Memoization"],rows:[["Time complexity","O(2ⁿ) — explore all subsets","O(n × S) — each (i, target) pair computed once"],["Space (stack)","O(n) — recursion depth","O(n × S) — memo table + O(n) stack"],["Overlapping subproblems?","Yes — (i=2, target=1) may be reached from multiple paths","Memoize on (i, remaining_target)"],["When is memoization worth it?","When n > ~20 and many repeated sub-states","Always for n > 20 and integer elements"]]}),e.jsxs(g,{color:"success",icon:"ti-trending-up",children:["The naive recursive solution here is the ",e.jsx("em",{children:"foundation"})," of all subset-sum variants. Once you internalize the include/exclude tree, converting to ",e.jsx("strong",{children:"top-down DP"})," (",e.jsx("code",{children:"@lru_cache"}),") or ",e.jsx("strong",{children:"bottom-up DP table"})," is a mechanical transformation — covered fully in the Dynamic Programming module."]}),e.jsx(v,{q:"Why must we check target == 0 BEFORE i == n?",a:"If an element has value 0 and target is already 0, we want to count it as a valid subset immediately and return 1. If we checked <code>i == n</code> first, we'd only count it at the leaves — missing the early return. More importantly, checking target first ensures correctness regardless of element values, including zeros."}),e.jsx(v,{q:"What changes if elements can be reused — the unbounded subset sum variant?",a:"In the include branch, pass <code>i</code> instead of <code>i + 1</code>: <code>subsetCount(arr, n, target - arr[i], i)</code>. This allows the same element to be used multiple times. Now the base cases matter more: <code>target < 0</code> terminates since the include branch never advances <code>i</code>. This variant is equivalent to the Coin Change problem."}),e.jsx(v,{q:"How does this generalize to 'find one valid subset' (exists) vs 'count all' vs 'find all subsets'?",a:"<strong>Exists:</strong> return <code>include || exclude</code> (short-circuit on first match). <strong>Count:</strong> return <code>include + exclude</code> (our current version). <strong>Find all:</strong> pass a current-subset list, append arr[i] in the include branch, add the full list to results when target=0. The tree structure is identical; only what you <em>do</em> at each node changes."})]})}function ae(){return e.jsxs("div",{children:[e.jsxs(g,{color:"purple",icon:"ti-tournament",children:["6 curated problems — IIT OA screening style (Q1–Q4) and LeetCode Hard/Medium equivalents (Q5–Q6). Each isolates a specific recursion pattern. ",e.jsx("strong",{children:"Attempt independently before revealing the solution."})]}),e.jsx(C,{num:1,title:"Print 1 to N — Three Recursive Approaches",difficulty:"IIT OA",tags:["Warm-up","Pre/Post Order"],statement:"Given integer N, implement <strong>three</strong> recursive functions: (a) print N down to 1, (b) print 1 up to N using post-order trick, (c) print 1 up to N using a tail-recursive accumulator — no loops in any version.",constraints:["1 ≤ N ≤ 10⁴","No loops (for/while/do-while) permitted","C++: tail-recursive version should be O(1) stack with -O2"],examples:[{input:"N = 5",output:`N→1: 5 4 3 2 1
1→N: 1 2 3 4 5
Tail-rec: 1 2 3 4 5`}],approach:"(a) Pre-order: print before recursing → prints N, N-1, ..., 1 during winding. (b) Post-order: recurse first, print after → prints 1, 2, ..., N during unwinding. (c) Tail-recursive: add accumulator k=1, decrement n, increment k — the call is the final operation enabling TCE in C++.",code:{cpp:`// (a) Print N → 1  — pre-order
void printNTo1(int n) {
    if (n == 0) return;
    cout << n << " ";         // print BEFORE recursing
    printNTo1(n - 1);
}

// (b) Print 1 → N  — post-order (NOT tail-recursive)
void print1ToN_v1(int n) {
    if (n == 0) return;
    print1ToN_v1(n - 1);      // recurse FIRST
    cout << n << " ";         // print AFTER (during unwinding)
}

// (c) Print 1 → N  — tail-recursive accumulator
// k = current value to print, n = remaining count
void print1ToN_v2(int n, int k = 1) {
    if (n == 0) return;
    cout << k << " ";
    print1ToN_v2(n - 1, k + 1);  // ← TAIL CALL (O(1) stack with TCE)
}`,python:`import sys
sys.setrecursionlimit(10**6)

# (a) Print N → 1
def print_n_to_1(n):
    if n == 0: return
    print(n, end=' ')
    print_n_to_1(n - 1)

# (b) Print 1 → N — post-order
def print_1_to_n_v1(n):
    if n == 0: return
    print_1_to_n_v1(n - 1)
    print(n, end=' ')

# (c) Print 1 → N — tail-recursive form
def print_1_to_n_v2(n, k=1):
    if n == 0: return
    print(k, end=' ')
    print_1_to_n_v2(n - 1, k + 1)`}}),e.jsx(C,{num:2,title:"Binary Representation Without Built-ins",difficulty:"OA Medium",tags:["Logarithmic Recursion","Bit Math"],statement:"Given a non-negative integer N, print its binary representation using <strong>recursion only</strong>. Do not use <code>bin()</code>, <code>bitset</code>, loops, or string reversal of any kind. The output must have no leading zeros (except when N = 0).",constraints:["0 ≤ N ≤ 10⁹","Recursion depth: O(log₂ N)","No loops or built-in converters"],examples:[{input:"N = 13",output:"1101",note:"13 = 8+4+1 = 1101₂"},{input:"N = 8",output:"1000"},{input:"N = 0",output:"0"}],approach:"Key insight: N % 2 gives the current (least significant) bit; N / 2 moves to the next higher bit. To print MSB first, use post-order: recurse on N/2 first, then print N%2 on the way back. Recursion depth = ⌊log₂ N⌋. Handle N=0 separately to avoid empty output.",code:{cpp:`void printBinary(int n) {
    if (n == 0) return;
    printBinary(n / 2);    // recurse on higher bits FIRST (post-order)
    cout << (n % 2);       // print current bit AFTER → MSB appears first ✓
}

void solve(int n) {
    if (n == 0) { cout << 0; return; }   // edge case: N=0 → output "0"
    printBinary(n);
}

// Trace for n=13 (binary 1101):
// printBinary(13) → printBinary(6) → printBinary(3) → printBinary(1) → printBinary(0)
// Unwind: print 1 → print 1 → print 0 → print 1  ⟹  "1101" ✓`,python:`def print_binary(n):
    if n == 0: return
    print_binary(n // 2)   # recurse on higher bits first
    print(n % 2, end='')   # print current bit on unwind → MSB first

def solve(n):
    if n == 0: print(0, end=''); return
    print_binary(n)

# solve(13) → "1101"  |  solve(0) → "0"  |  solve(8) → "1000"`}}),e.jsx(C,{num:3,title:"Palindrome Check Using Recursion",difficulty:"OA Medium",tags:["Two-Pointer Recursion","String"],statement:"Given a string S, determine whether it is a palindrome using <strong>only recursion</strong>. No built-in <code>reverse()</code>, slicing tricks (<code>[::-1]</code>), or explicit loops. Return <code>true</code> if palindrome, <code>false</code> otherwise.",constraints:["1 ≤ |S| ≤ 10⁵","S contains only lowercase letters","O(n) time, O(n) stack space"],examples:[{input:'S = "racecar"',output:"true"},{input:'S = "abcba"',output:"true"},{input:'S = "hello"',output:"false",note:'Mismatch: "h" ≠ "o"'},{input:'S = "a"',output:"true",note:"Single character is always palindrome"}],approach:"Maintain two indices: start (left) and end (right). At each step check if S[start] == S[end]. If not, immediately return false. If yes, recurse inward: start+1, end-1. Base case: start >= end — all characters matched. The recursion mirrors the two-pointer iterative approach.",code:{cpp:`bool isPalindrome(const string& s, int start, int end) {
    if (start >= end) return true;           // base: pointers crossed → palindrome
    if (s[start] != s[end]) return false;    // mismatch — stop immediately
    return isPalindrome(s, start + 1, end - 1);  // check inner substring
}

// Wrapper (called externally)
bool check(const string& s) {
    return isPalindrome(s, 0, (int)s.size() - 1);
}

// Trace: "racecar" (s[0]='r', s[6]='r' → match)
//                  (s[1]='a', s[5]='a' → match)
//                  (s[2]='c', s[4]='c' → match)
//                  (s[3]='e' → start=end=3 → base case → true)`,python:`def is_palindrome(s, start=0, end=None):
    if end is None: end = len(s) - 1

    if start >= end: return True
    if s[start] != s[end]: return False
    return is_palindrome(s, start + 1, end - 1)

# is_palindrome("racecar") → True
# is_palindrome("hello")   → False
# Time: O(n/2) = O(n)  |  Stack: O(n/2) frames`}}),e.jsx(C,{num:4,title:"Rope Cutting — Maximum Pieces",difficulty:"OA Hard",tags:["Recursive Enumeration","Memoization"],statement:"Given a rope of length <strong>N</strong> and three allowed cut lengths <strong>a</strong>, <strong>b</strong>, <strong>c</strong>, return the <strong>maximum number of pieces</strong> it can be cut into such that every piece has length exactly a, b, or c and there is <strong>no remainder</strong>. Return <code>-1</code> if no valid cutting is possible.",constraints:["1 ≤ N ≤ 10⁵","1 ≤ a, b, c ≤ N","For N > 10³: add memoization (O(N) time)"],examples:[{input:"N=5, a=1, b=2, c=3",output:"5",note:"5 cuts of length 1"},{input:"N=5, a=2, b=2, c=3",output:"2",note:"2 + 3 = 5"},{input:"N=7, a=3, b=5, c=2",output:"3",note:"2+2+3 = 7 → 3 pieces"},{input:"N=4, a=3, b=5, c=7",output:"-1",note:"No valid combination sums to 4"}],approach:"Greedy fails (can't always pick the largest). Recursive enumeration: at each n, try subtracting a, b, c and take max. Return -1 for negative n (overcut). The -1 guard: only add +1 if at least one branch ≥ 0. Add a hash map memo for n > 10³.",code:{cpp:`#include <unordered_map>
unordered_map<int, int> memo;

int maxCuts(int n, int a, int b, int c) {
    if (n == 0) return 0;
    if (n < 0)  return -1;
    if (memo.count(n)) return memo[n];

    int res = max({ maxCuts(n - a, a, b, c),
                    maxCuts(n - b, a, b, c),
                    maxCuts(n - c, a, b, c) });

    return memo[n] = (res == -1 ? -1 : res + 1);
}

// Reset memo before each test case: memo.clear();
// Time: O(N)  |  Space: O(N)`,python:`from functools import lru_cache

def max_cuts(n, a, b, c):
    @lru_cache(maxsize=None)
    def helper(rem):
        if rem == 0: return 0
        if rem < 0:  return -1
        res = max(helper(rem-a), helper(rem-b), helper(rem-c))
        return -1 if res == -1 else res + 1
    return helper(n)

# max_cuts(7, 3, 5, 2) → 3
# max_cuts(4, 3, 5, 7) → -1`}}),e.jsx(C,{num:5,title:"Josephus Problem — Find the Safe Position",difficulty:"LC Hard",tags:["Circular","Mathematical Recursion"],statement:"<strong>n</strong> people stand in a circle numbered <strong>0 to n−1</strong>. Starting from person 0, every <strong>k-th</strong> person is eliminated. Counting restarts from the next person after each elimination. Return the <strong>0-indexed position</strong> of the last survivor.",constraints:["1 ≤ n ≤ 10⁴","1 ≤ k ≤ 10⁴","Return 0-indexed position"],examples:[{input:"n=5, k=2",output:"2",note:"Elimination order: 1→3→0→4, survivor: P2"},{input:"n=7, k=3",output:"3",note:"See Josephus visualizer above"},{input:"n=1, k=1",output:"0"}],approach:"Recursive formula: jos(1,k)=0; jos(n,k)=(jos(n-1,k)+k)%n. After eliminating the k-th person, renumber remaining 0..n-2 from the next person. Sub-problem survivor at position p maps back via (p+k)%n. For large n, convert to the iterative form to avoid stack overflow.",code:{cpp:`// Recursive  — O(n) time, O(n) stack
int jos(int n, int k) {
    if (n == 1) return 0;
    return (jos(n - 1, k) + k) % n;
}

// Iterative  — O(n) time, O(1) stack  ← use this for large n
int josIter(int n, int k) {
    int pos = 0;
    for (int i = 2; i <= n; i++)
        pos = (pos + k) % i;
    return pos;
}

// jos(7, 3)     = josIter(7, 3) = 3
// jos(5, 2)     = josIter(5, 2) = 2
// josIter(10000, 7) = safe, josRec(10000, 7) may stack overflow in C++`,python:`import sys
sys.setrecursionlimit(15000)

def jos(n, k):
    if n == 1: return 0
    return (jos(n - 1, k) + k) % n

# Iterative (preferred in Python — no TCE)
def jos_iter(n, k):
    pos = 0
    for i in range(2, n + 1):
        pos = (pos + k) % i
    return pos

# jos(7, 3) → 3  |  jos_iter(10000, 7) → safe`}}),e.jsx(C,{num:6,title:"Count Subsets with Given Sum",difficulty:"LC Medium",tags:["Include/Exclude","DP Precursor"],statement:"Given an integer array <code>arr</code> of length <strong>n</strong> and a non-negative integer <strong>target</strong>, return the <strong>count of distinct subsets</strong> of <code>arr</code> that sum to exactly <code>target</code>. Each element may appear in a subset at most once. Two subsets are distinct if they differ in at least one element's index.",constraints:["1 ≤ n ≤ 20 (pure recursion)","0 ≤ arr[i] ≤ 100","0 ≤ target ≤ 10⁴","Add @lru_cache for n up to 10³"],examples:[{input:"arr=[2,3,1], target=3",output:"2",note:"Subsets: {2,1} and {3}"},{input:"arr=[1,2,3,3], target=6",output:"3",note:"Subsets: {1,2,3₁}, {1,2,3₂}, {3,3}"},{input:"arr=[0,0,0], target=0",output:"8",note:"All 2³=8 subsets sum to 0"}],approach:"Pure include/exclude: at index i, either include arr[i] (reduce target) or skip it. Base: target==0 → count 1; i==n or target<0 → count 0. For n≤20 pure recursion is O(2ⁿ)=O(10⁶). For larger n, add memoization on (i, target) for O(n×target) time — this is the exact structure of the 2D DP table in the DP module.",code:{cpp:`// Pure recursion — O(2ⁿ), suitable for n ≤ 20
int subsetCount(vector<int>& arr, int n, int target, int i = 0) {
    if (target == 0) return 1;
    if (i == n || target < 0) return 0;
    return subsetCount(arr, n, target - arr[i], i + 1)   // include arr[i]
         + subsetCount(arr, n, target,           i + 1);  // exclude arr[i]
}

// With memoization — O(n × target) time, O(n × target) space
#include <map>
map<pair<int,int>, int> dp;

int subsetMemo(vector<int>& arr, int n, int target, int i = 0) {
    if (target == 0) return 1;
    if (i == n || target < 0) return 0;
    auto key = pair<int,int>{i, target};
    if (dp.count(key)) return dp[key];
    return dp[key] = subsetMemo(arr, n, target - arr[i], i + 1)
                   + subsetMemo(arr, n, target,           i + 1);
}`,python:`from functools import lru_cache

def count_subsets(arr, target):
    n = len(arr)

    @lru_cache(maxsize=None)
    def dp(i, rem):
        if rem == 0: return 1
        if i == n or rem < 0: return 0
        return dp(i + 1, rem - arr[i]) + dp(i + 1, rem)

    return dp(0, target)

# count_subsets([2, 3, 1], 3) → 2
# count_subsets([1, 2, 3, 3], 6) → 3
# count_subsets([0, 0, 0], 0) → 8`}})]})}const le=[{id:"intuition",label:"Intuition & Call Stack"},{id:"mechanics",label:"Tail Recursion"},{id:"classics",label:"Classic Problems"},{id:"subset",label:"Subset Sum"},{id:"problems",label:"Problems"}];function ue(){const[r,i]=k.useState("intuition"),n={intuition:e.jsx(ne,{}),mechanics:e.jsx(oe,{}),classics:e.jsx(ie,{}),subset:e.jsx(se,{}),problems:e.jsx(ae,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 10"}),e.jsx("h1",{className:"page-header-title",children:"Recursion"}),e.jsx("p",{className:"page-header-subtitle",children:"Direct & Indirect · Tail Recursion & TCE · Rope Cutting · Tower of Hanoi · Josephus · Subset Sum"})]}),e.jsx(J,{tabs:le,active:r,onChange:i}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:n[r]}),e.jsx(V,{moduleId:3})]})}export{ue as default};
