import{r as m,j as e}from"./index-D9jkHkZY.js";import{S as Q,N as H,d as B,H as w,P as S,a as F,Q as E,T as G,V as T}from"./SectionNav-BHzhBu3R.js";const _=[2,1,5,3,6,4,8,2],M=3;function U(s,l){const t=s.length,c=[],o=[],d=[];c.push({i:-1,dq:[],result:[],winStart:0,action:"init",desc:`Sliding window of size k=${l}. Deque stores indices in DECREASING value order. Front = max of current window.`});for(let r=0;r<t;r++){for(;o.length>0&&o[0]<=r-l;){const i=o.shift();c.push({i:r,dq:[...o],result:[...d],winStart:Math.max(0,r-l+1),action:"evict",desc:`i=${r}: Front idx ${i} is out of window [${Math.max(0,r-l+1)}..${r}]. Evict from deque front.`})}for(;o.length>0&&s[o[o.length-1]]<=s[r];){const i=o.pop();c.push({i:r,dq:[...o],result:[...d],winStart:Math.max(0,r-l+1),action:"popBack",desc:`i=${r}: arr[${i}]=${s[i]} ≤ arr[${r}]=${s[r]} → useless (can never be max while ${s[r]} is in window). Pop from back.`})}o.push(r);const u=r>=l-1;u&&d.push(s[o[0]]),c.push({i:r,dq:[...o],result:[...d],winStart:Math.max(0,r-l+1),action:u?"record":"push",desc:u?`Push ${r}. Window [${Math.max(0,r-l+1)}..${r}] complete. Max = arr[${o[0]}] = ${s[o[0]]}. Record.`:`Push ${r}. Window not full yet (need ${l-r-1} more).`})}return c.push({i:t,dq:[],result:[...d],winStart:t-l,action:"done",desc:`Done! Sliding window maximums: [${d.join(", ")}]`}),c}const z=U(_,M),A=[{petrol:6,cost:4},{petrol:3,cost:6},{petrol:7,cost:3},{petrol:4,cost:5}];function V(s){const l=s.length,t=[];let c=0,o=0,d=0;t.push({start:c,tank:o,deficit:d,i:-1,action:"init",desc:`n=${l} stations. Greedy: if tank < 0 at station i → shift start to i+1, accumulate deficit. If total net ≥ 0, the surviving start is valid.`});for(let i=0;i<l;i++){const n=s[i].petrol-s[i].cost;o+=n,t.push({start:c,tank:o,deficit:d,i,action:o<0?"fail":"ok",net:n,desc:o>=0?`Station ${i}: +${s[i].petrol} − ${s[i].cost} = ${n>0?"+":""}${n}. Tank = ${o}. Continue.`:`Station ${i}: ${n}. Tank = ${o} < 0! Can't continue from start=${c}. deficit += ${-o}. Start = ${i+1}.`}),o<0&&(d+=-o,c=i+1,o=0,c<l&&t.push({start:c,tank:o,deficit:d,i,action:"reset",desc:`Reset: tank = 0, start = ${c}. Continue testing from here.`}))}const r=s.reduce((i,n)=>i+n.petrol-n.cost,0),u=r>=0;return t.push({start:u?c:-1,tank:o,deficit:d,i:l,action:"done",desc:u?`Total net = ${r} ≥ 0 → circuit IS possible! Starting index = ${c}.`:`Total net = ${r} < 0 → no valid starting point exists.`}),t}const $=V(A),x=7;function J(){const[s,l]=m.useState(Array(x).fill(null)),[t,c]=m.useState(0),[o,d]=m.useState(0),[r,u]=m.useState(0),[i,n]=m.useState(1),[p,a]=m.useState("Queue initialized. Capacity = 7."),f=m.useCallback(()=>{if(r===x){a("OVERFLOW: Queue is full!");return}const g=[...s];g[o]=i;const h=(o+1)%x;l(g),d(h),u(r+1),a(`Enqueue ${i} at index ${o}. rear = (${o}+1)%${x} = ${h}. Count = ${r+1}.`),n(q=>q+1)},[s,o,r,i]),v=m.useCallback(()=>{if(r===0){a("UNDERFLOW: Queue is empty!");return}const g=s[t],h=[...s];h[t]=null;const q=(t+1)%x;l(h),c(q),u(r-1),a(`Dequeue ${g} from index ${t}. front = (${t}+1)%${x} = ${q}. Count = ${r-1}.`)},[s,t,r]),R=()=>{l(Array(x).fill(null)),c(0),d(0),u(0),n(1),a("Queue reset.")},k=70,b=100,y=100,D=g=>{const h=g/x*2*Math.PI-Math.PI/2;return{x:b+k*Math.cos(h),y:y+k*Math.sin(h)}};return e.jsxs(T,{children:[e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:p}),e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("svg",{width:"200",height:"200",viewBox:"0 0 200 200",style:{flexShrink:0},children:[s.map((g,h)=>{const{x:q,y:O}=D(h),j=h===t&&r>0,C=h===(o-1+x)%x&&r>0,W=g!==null,P=j&&C?"#3A2A5A":j?"#1A3A2A":C?"#2A2A3A":W?"#1A2A3A":"#131722",N=j&&C?"#C586C0":j?"#4EC9B0":C?"#81B4EA":W?"#334155":"#1E2233",L=j&&C?"#C586C0":j?"#4EC9B0":C?"#9CDCFE":W?"#DCDCAA":"#4A5170";return e.jsxs("g",{children:[e.jsx("circle",{cx:q,cy:O,r:"18",fill:P,stroke:N,strokeWidth:"1.5"}),e.jsx("text",{x:q,y:O+1,textAnchor:"middle",dominantBaseline:"middle",fill:L,fontSize:"11",fontFamily:"monospace",fontWeight:W?700:400,children:g??h}),j&&e.jsx("text",{x:q,y:O+28,textAnchor:"middle",fill:"#4EC9B0",fontSize:"9",fontFamily:"monospace",children:"F"}),C&&e.jsx("text",{x:q,y:j?O+36:O+28,textAnchor:"middle",fill:"#9CDCFE",fontSize:"9",fontFamily:"monospace",children:"R"})]},h)}),e.jsx("text",{x:b,y:y-8,textAnchor:"middle",fill:"var(--color-text-tertiary)",fontSize:"9",fontFamily:"monospace",children:"count"}),e.jsxs("text",{x:b,y:y+6,textAnchor:"middle",fill:"var(--color-text-secondary)",fontSize:"16",fontFamily:"monospace",fontWeight:"700",children:[r,"/",x]})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:10},children:[e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("input",{type:"number",value:i,onChange:g=>n(+g.target.value),style:{width:60,padding:"5px 8px",background:"#0D0F18",border:"1px solid #1E2233",borderRadius:"var(--border-radius-md)",color:"var(--color-text-primary)",fontFamily:"var(--font-mono)",fontSize:13,outline:"none"}}),e.jsx("button",{onClick:f,style:{padding:"6px 14px",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",background:"var(--color-background-success)",color:"var(--color-text-success)",cursor:"pointer",fontSize:12,fontWeight:600},children:"Enqueue"})]}),e.jsx("button",{onClick:v,style:{padding:"6px 14px",border:"1px solid var(--color-border-danger)",borderRadius:"var(--border-radius-md)",background:"var(--color-background-danger)",color:"var(--color-text-danger)",cursor:"pointer",fontSize:12,fontWeight:600},children:"Dequeue"}),e.jsx("button",{onClick:R,style:{padding:"6px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"Reset"}),e.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"8px 10px",fontFamily:"var(--font-mono)",fontSize:11,lineHeight:1.9},children:[e.jsxs("div",{children:[e.jsx("span",{style:{color:"#4EC9B0"},children:"front"})," = ",t,"  (dequeue from here)"]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"rear"}),"  = ",o,"  (enqueue here)"]}),e.jsxs("div",{children:[e.jsxs("span",{style:{color:"#6A9955"},children:["rear = (rear+1) % ",x]}),"  ← no shifting!"]})]})]})]})]})}function K(){const[s,l]=m.useState(0),t=z[Math.min(s,z.length-1)];_.length;const o={init:null,evict:"danger",popBack:"warning",push:"info",record:"success",done:"success"}[t.action]||"info";return e.jsxs(T,{children:[e.jsxs("div",{style:{marginBottom:14,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[t.action!=="init"&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${o})`,color:`var(--color-text-${o})`,border:`1px solid var(--color-border-${o})`,whiteSpace:"nowrap"},children:t.action==="evict"?"Evict (expired)":t.action==="popBack"?"Pop back (useless)":t.action==="push"?"Push":t.action==="record"?"Record max ★":"Done ✓"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:["ARRAY  (k=",M,")"]}),e.jsx("div",{style:{display:"flex",gap:4},children:_.map((d,r)=>{const u=t.i>=0&&r>=t.winStart&&r<=t.i,i=r===t.i,n=t.dq.includes(r),p=t.dq.length>0&&t.dq[0]===r;let a=null;return t.action==="done"||p&&u?a="success":i?a=o:n&&u?a="info":u&&(a="secondary"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[p&&t.action!=="done"&&e.jsx("div",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-success)",fontWeight:700},children:"max"}),e.jsx("div",{style:{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:`1.5px solid ${a?`var(--color-border-${a})`:"var(--color-border-secondary)"}`,background:a?`var(--color-background-${a})`:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:a?700:400,color:a?`var(--color-text-${a})`:"var(--color-text-secondary)",transition:"all 0.18s"},children:d}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",r,"]"]})]},r)})})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"MONOTONIC DEQUE  (stores indices, decreasing values)"}),e.jsxs("div",{style:{display:"flex",gap:0,alignItems:"stretch",minHeight:46},children:[e.jsx("div",{style:{padding:"6px 10px",background:"var(--color-background-tertiary)",border:"1px solid var(--color-border-tertiary)",borderRadius:"8px 0 0 8px",fontFamily:"var(--font-mono)",fontSize:10,color:"var(--color-text-tertiary)",display:"flex",alignItems:"center"},children:"front"}),e.jsx("div",{style:{display:"flex",flex:1,gap:0,border:"1px solid var(--color-border-secondary)",borderLeft:"none",borderRight:"none",minHeight:46},children:t.dq.length===0?e.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-tertiary)"},children:"empty"}):t.dq.map((d,r)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"4px 14px",background:r===0?"var(--color-background-success)":"var(--color-background-info)",borderRight:r<t.dq.length-1?"1px solid var(--color-border-secondary)":"none",gap:2},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:r===0?"var(--color-text-success)":"var(--color-text-info)"},children:_[d]}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",d,"]"]})]},r))}),e.jsx("div",{style:{padding:"6px 10px",background:"var(--color-background-tertiary)",border:"1px solid var(--color-border-tertiary)",borderRadius:"0 8px 8px 0",fontFamily:"var(--font-mono)",fontSize:10,color:"var(--color-text-tertiary)",display:"flex",alignItems:"center"},children:"back"})]})]}),t.result.length>0&&e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"WINDOW MAXIMA"}),e.jsx("div",{style:{display:"flex",gap:4},children:t.result.map((d,r)=>e.jsx("div",{style:{padding:"5px 12px",borderRadius:6,border:"1px solid var(--color-border-success)",background:r===t.result.length-1&&t.action!=="done"?"var(--color-background-success)":"rgba(78,201,176,0.15)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--color-text-success)"},children:d},r))})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,s-1)),s===0],["Next →",()=>l(Math.min(z.length-1,s+1)),s===z.length-1]].map(([d,r,u])=>e.jsx("button",{onClick:r,disabled:u,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:u?"not-allowed":"pointer",fontSize:12,opacity:u?.4:1},children:d},d)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[s+1,"/",z.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>l(z.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function X(){const[s,l]=m.useState(0),t=$[Math.min(s,$.length-1)],c=A.length,o=65,d=90,r=90,u=i=>{const n=i/c*2*Math.PI-Math.PI/2;return{x:d+o*Math.cos(n),y:r+o*Math.sin(n)}};return e.jsxs(T,{children:[e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc}),e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("svg",{width:"180",height:"180",viewBox:"0 0 180 180",style:{flexShrink:0},children:[A.map((i,n)=>{const p=(n+1)%c,a=u(n),f=u(p),v=(a.x+f.x)/2,R=(a.y+f.y)/2;return e.jsxs("g",{children:[e.jsx("line",{x1:a.x,y1:a.y,x2:f.x,y2:f.y,stroke:"#1E2233",strokeWidth:"1.5"}),e.jsxs("text",{x:v,y:R,textAnchor:"middle",dominantBaseline:"middle",fill:"#4A5170",fontSize:"8",fontFamily:"monospace",children:[A[n].cost,"→"]})]},n)}),A.map((i,n)=>{const{x:p,y:a}=u(n),f=n===t.start&&t.action!=="done",v=n===t.i,R=t.action==="done"&&n===t.start;let k="#131722",b="#1E2233",y="#4A5170";return R?(k="#1A3A2A",b="#4EC9B0",y="#4EC9B0"):f&&v?(k="#1A2A3A",b="#C586C0",y="#C586C0"):f?(k="#1A3A2A",b="#4EC9B0",y="#4EC9B0"):v&&(k=t.action==="fail"?"#3A1A1A":"#1A2A3A",b=t.action==="fail"?"#F44747":"#81B4EA",y=t.action==="fail"?"#F44747":"#9CDCFE"),e.jsxs("g",{children:[e.jsx("circle",{cx:p,cy:a,r:"17",fill:k,stroke:b,strokeWidth:"1.5"}),e.jsxs("text",{x:p,y:a-4,textAnchor:"middle",dominantBaseline:"middle",fill:y,fontSize:"9",fontFamily:"monospace",fontWeight:"700",children:["P",n]}),e.jsxs("text",{x:p,y:a+6,textAnchor:"middle",dominantBaseline:"middle",fill:y,fontSize:"8",fontFamily:"monospace",children:["+",i.petrol]})]},n)})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:8},children:[e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:11.5,lineHeight:2,background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"10px 12px"},children:[["start candidate","start",t.start,"info"],["current tank","tank",t.tank,t.tank<0?"danger":t.tank>0?"success":"secondary"],["accumulated deficit","deficit",t.deficit,"warning"]].map(([i,n,p,a])=>e.jsxs("div",{children:[e.jsxs("span",{style:{color:"var(--color-text-tertiary)",display:"inline-block",width:150},children:[i,":"]}),e.jsx("span",{style:{color:`var(--color-text-${a})`,fontWeight:700},children:p})]},n))}),e.jsxs("div",{style:{display:"flex",gap:4,flexWrap:"wrap"},children:[A.map((i,n)=>{const p=i.petrol-i.cost;return e.jsxs("div",{style:{padding:"4px 8px",borderRadius:5,border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:11},children:[e.jsxs("span",{style:{color:"var(--color-text-tertiary)"},children:["P",n,": "]}),e.jsxs("span",{style:{color:p>=0?"var(--color-text-success)":"var(--color-text-danger)",fontWeight:700},children:[p>=0?"+":"",p]})]},n)}),e.jsxs("div",{style:{padding:"4px 8px",borderRadius:5,border:"0.5px solid var(--color-border-info)",background:"var(--color-background-info)",fontFamily:"var(--font-mono)",fontSize:11},children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"total: "}),e.jsx("span",{style:{color:"var(--color-text-info)",fontWeight:700},children:A.reduce((i,n)=>i+n.petrol-n.cost,0)})]})]}),t.action==="done"&&t.start>=0&&e.jsxs("div",{style:{padding:"8px 12px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:12.5,fontWeight:700,color:"var(--color-text-success)"},children:["✓ Start from pump ",t.start,"!"]})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:14},children:[[["← Prev",()=>l(Math.max(0,s-1)),s===0],["Next →",()=>l(Math.min($.length-1,s+1)),s===$.length-1]].map(([i,n,p])=>e.jsx("button",{onClick:n,disabled:p,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:p?"not-allowed":"pointer",fontSize:12,opacity:p?.4:1},children:i},i)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[s+1,"/",$.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const Y={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function I({num:s,title:l,difficulty:t,tags:c=[],statement:o,constraints:d=[],examples:r=[],approach:u,code:i}){const[n,p]=m.useState(!1),a=Y[t]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",s]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:l})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[c.map(f=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:f},f)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${a})`,color:`var(--color-text-${a})`,border:`1px solid var(--color-border-${a})`},children:t})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:o}}),d.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:d.map((f,v)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:f},v))})]}),r.length>0&&e.jsx("div",{style:{marginBottom:14},children:r.map((f,v)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",v+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f.output})]}),f.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:f.note})]},v))}),e.jsxs("button",{onClick:()=>p(!n),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:n?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${n?"eye-off":"bulb"}`}),n?"Hide Solution":"Show Approach & Solution"]}),n&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),u]}),e.jsx(F,{children:i})]})]})]})}function Z(){return e.jsxs("div",{children:[e.jsxs(B,{color:"info",icon:"ti-arrow-right",children:["A queue is a ",e.jsx("strong",{children:"FIFO"})," (First In, First Out) structure. Elements join at the ",e.jsx("em",{children:"rear"})," (enqueue) and leave from the ",e.jsx("em",{children:"front"})," (dequeue). Think of a ticket line — whoever arrives first gets served first."]}),e.jsx(w,{children:"Circular Array Queue — Why Circular?"}),e.jsxs(S,{children:["A naive array queue wastes space: after dequeuing, slots at the front are abandoned. Resizing to reclaim them costs O(n). The circular approach keeps front and rear as modular indices — they wrap around using ",e.jsx("code",{children:"(index + 1) % capacity"}),". No shifting. No wasted space. All O(1)."]}),e.jsx(J,{}),e.jsx(F,{children:{cpp:`class Queue {
    vector<int> arr;
    int front, rear, cnt, cap;
public:
    Queue(int c) : arr(c), front(0), rear(0), cnt(0), cap(c) {}

    void enqueue(int x) {
        if (cnt == cap) return;          // overflow check
        arr[rear] = x;
        rear = (rear + 1) % cap;        // wrap around — no shifting!
        cnt++;
    }
    int dequeue() {
        if (cnt == 0) return -1;         // underflow check
        int v = arr[front];
        front = (front + 1) % cap;      // advance front circularly
        cnt--;
        return v;
    }
    int getFront() { return arr[front]; }
    int getRear()  { return arr[(rear - 1 + cap) % cap]; }
    bool isEmpty() { return cnt == 0; }
    bool isFull()  { return cnt == cap; }
};`,python:`class Queue:
    def __init__(self, cap):
        self.arr=[None]*cap; self.front=0; self.rear=0; self.cnt=0; self.cap=cap
    def enqueue(self,x):
        if self.cnt==self.cap: return
        self.arr[self.rear]=x
        self.rear=(self.rear+1)%self.cap; self.cnt+=1
    def dequeue(self):
        if self.cnt==0: return -1
        v=self.arr[self.front]
        self.front=(self.front+1)%self.cap; self.cnt-=1; return v
    def is_empty(self): return self.cnt==0`}}),e.jsx(w,{children:"Linked List Queue — O(1) Both Ends"}),e.jsx(S,{children:"Maintain both a head (front) and tail (rear) pointer. Enqueue appends a new node at the tail in O(1). Dequeue removes the head node in O(1). No modular arithmetic needed."}),e.jsx(F,{children:{cpp:`struct Node { int val; Node* next; };
class LLQueue {
    Node* head=nullptr; Node* tail=nullptr; int sz=0;
public:
    void enqueue(int x) {
        Node* n = new Node{x, nullptr};
        if (!tail) head = tail = n;
        else { tail->next = n; tail = n; }  // append at TAIL — O(1)
        sz++;
    }
    int dequeue() {
        int v = head->val;
        Node* t = head; head = head->next;
        if (!head) tail = nullptr;
        delete t; sz--; return v;           // remove from HEAD — O(1)
    }
};`,python:`from collections import deque
# Python deque is a doubly-linked list internally — O(1) both ends
q = deque()
q.append(1)        # enqueue  (right end)
q.appendleft(0)    # enqueue front
q.pop()            # dequeue from right
q.popleft()        # dequeue from left (FIFO queue behavior)`}}),e.jsx(w,{children:"Deque — Double-Ended Queue"}),e.jsx(S,{children:'A deque (pronounced "deck") supports O(1) insertions and deletions at BOTH ends. Implemented as a circular array or doubly linked list. Used as a sliding window max data structure (monotonic deque) and as the basis for bidirectional algorithms.'}),e.jsx(G,{heads:["Operation","Array-based","DLL-based","Notes"],rows:[["insertFront(x)","O(1) amortized","O(1)","Circular array: decrement front pointer with wrap"],["insertRear(x)","O(1) amortized","O(1)","Circular array: increment rear pointer with wrap"],["deleteFront()","O(1)","O(1)","Increment front"],["deleteRear()","O(1)","O(1)","DLL: use prev pointer. Circular array: decrement rear"],["getFront()","O(1)","O(1)","Just read arr[front] or head->val"],["getRear()","O(1)","O(1)","Just read arr[(rear-1+n)%n] or tail->val"]]}),e.jsx(E,{q:"How does the circular array detect overflow vs empty when front == rear?",a:"The ambiguity is the classic circular buffer problem. Two common solutions: (1) Maintain an explicit count variable — the approach above. (2) Leave one slot permanently empty: full = (rear+1)%cap == front; empty = front == rear. The count approach is simpler and avoids the wasted slot."})]})}function ee(){return e.jsxs("div",{children:[e.jsx(w,{children:"Reverse a Queue"}),e.jsx(S,{children:"Using a stack: dequeue all elements into a stack, then push all back into the queue. The stack's LIFO reverses the FIFO order. O(n) time, O(n) space."}),e.jsx(F,{children:{cpp:`queue<int> reverseQueue(queue<int> q) {
    stack<int> st;
    while (!q.empty()) { st.push(q.front()); q.pop(); }
    while (!st.empty()) { q.push(st.top()); st.pop(); }
    return q;
}
// {10,5,15,20} → {20,15,5,10}

// Recursive version (uses call stack — O(n) implicit space):
void reverseRec(queue<int>& q) {
    if (q.empty()) return;
    int front = q.front(); q.pop();
    reverseRec(q);
    q.push(front);
}`,python:`from collections import deque
def reverse_queue(q):
    st=list(q); q.clear()
    while st: q.append(st.pop())
    return q

# Recursive:
def reverse_rec(q):
    if not q: return
    front=q.popleft()
    reverse_rec(q)
    q.append(front)`}}),e.jsx(w,{children:"Generate Numbers with Given Digits (BFS via Queue)"}),e.jsxs(S,{children:["Generate numbers in sorted order using only a given digit set ",6,". Classic BFS pattern: start with single-digit numbers, generate children by appending each digit. Since BFS processes level by level, output is automatically sorted."]}),e.jsx(F,{children:{cpp:`void generateNumbers(vector<int>& digits, int n) {
    queue<string> q;
    for (int d : digits) q.push(to_string(d));  // seed with single digits
    while (n--) {
        string front = q.front(); q.pop();
        cout << front << " ";
        for (int d : digits)
            q.push(front + to_string(d));        // append each digit — BFS level order
    }
}
// digits={5,6}, n=8 → 5 6 55 56 65 66 555 556`,python:`from collections import deque
def generate_numbers(digits, n):
    q=deque(str(d) for d in digits)
    for _ in range(n):
        front=q.popleft(); print(front,end=' ')
        for d in digits: q.append(front+str(d))`}}),e.jsx(w,{children:"BFS Template — Queue is the Core"}),e.jsx(S,{children:"Every breadth-first search is fundamentally a queue problem: enqueue the source, repeatedly dequeue + enqueue unvisited neighbors. The queue ensures level-by-level exploration — the structural foundation of shortest-path algorithms on unweighted graphs."}),e.jsx(F,{children:{cpp:`// Generic BFS template — queue is the engine
void bfs(Graph& g, int src) {
    queue<int> q; vector<bool> visited(g.V, false);
    q.push(src); visited[src] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        process(u);                      // do whatever with this node
        for (int v : g.adj[u]) {
            if (!visited[v]) { q.push(v); visited[v] = true; }
        }
    }
}`,python:`from collections import deque
def bfs(graph, src):
    q=deque([src]); visited={src}
    while q:
        u=q.popleft(); process(u)
        for v in graph[u]:
            if v not in visited: q.append(v); visited.add(v)`}}),e.jsx(E,{q:"Why is a queue better than a stack for BFS, and what happens if you swap them?",a:"A queue gives FIFO order — first node in, first node explored. This guarantees level-by-level exploration: all distance-1 nodes before distance-2 nodes, etc. If you swap in a stack, you get DFS (depth-first): you'd dive as deep as possible before backtracking. For shortest-path algorithms on unweighted graphs, only BFS (queue) is correct — DFS would give arbitrary path lengths, not minimum ones."})]})}function te(){return e.jsxs("div",{children:[e.jsx(w,{children:"Sliding Window Maximum — Monotonic Deque"}),e.jsxs(S,{children:["Find the maximum element in every window of size k. Brute force: O(nk). Monotonic deque: O(n) by maintaining a deque of indices in ",e.jsx("em",{children:"decreasing value order"}),". The front is always the maximum of the current window. Pop from back when a larger element comes in (those smaller elements can never be maximum while this larger one is in the window). Pop from front when an index falls out of the window."]}),e.jsx(K,{}),e.jsx(F,{children:{cpp:`vector<int> maxSlidingWindow(vector<int>& arr, int k) {
    deque<int> dq;   // stores indices, values are DECREASING
    vector<int> res;
    for (int i = 0; i < arr.size(); i++) {
        // Remove expired indices (out of window)
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        // Maintain decreasing order: remove smaller elements from back
        while (!dq.empty() && arr[dq.back()] <= arr[i]) dq.pop_back();
        dq.push_back(i);
        // Window is full: record maximum (always at front)
        if (i >= k - 1) res.push_back(arr[dq.front()]);
    }
    return res;
}
// [2,1,5,3,6,4,8,2], k=3 → [5,5,6,6,8,8]   O(n) — each element pushed & popped once`,python:`from collections import deque
def max_sliding_window(arr, k):
    dq=deque(); res=[]
    for i,v in enumerate(arr):
        while dq and dq[0]<=i-k: dq.popleft()   # evict expired
        while dq and arr[dq[-1]]<=v: dq.pop()    # remove useless
        dq.append(i)
        if i>=k-1: res.append(arr[dq[0]])
    return res`}}),e.jsxs(B,{color:"info",icon:"ti-math",children:[e.jsx("strong",{children:"Why is each element processed O(1) amortized?"}),' Each index is pushed to the deque exactly once and popped at most once (either from the back during the "remove smaller" step, or from the front during the "expired" step). Total: O(2n) operations for n elements → O(n).']}),e.jsx(w,{children:"Petrol Pump — Circular Tour (Greedy O(n))"}),e.jsx(S,{children:"Given N pumps on a circle, each with (petrol, cost): find the start index that completes the full loop. Key theorem: if total(petrol) ≥ total(cost), exactly one valid start exists. Greedy: simulate from index 0; whenever tank goes negative, the current start is invalid — shift start to the next pump and reset. The accumulated deficit is checked at the end."}),e.jsx(X,{}),e.jsx(F,{children:{cpp:`int circularTour(vector<pair<int,int>>& pumps) {
    int n=pumps.size(), start=0, tank=0, deficit=0;
    for (int i=0; i<n; i++) {
        tank += pumps[i].first - pumps[i].second;  // net fuel at pump i
        if (tank < 0) {
            deficit += tank;  // accumulate debt — will be repaid by earlier stations
            start = i + 1;    // give up on current candidate
            tank  = 0;
        }
    }
    return (tank + deficit >= 0) ? start : -1;
}
// [{6,4},{3,6},{7,3},{4,5}] → start=2   O(n) time, O(1) space`,python:`def circular_tour(pumps):
    start=tank=deficit=0
    for i,(p,c) in enumerate(pumps):
        tank+=p-c
        if tank<0:
            deficit+=tank; start=i+1; tank=0
    return start if tank+deficit>=0 else -1`}}),e.jsxs(B,{color:"success",icon:"ti-math",children:[e.jsx("strong",{children:"Why does this greedy work?"}),' When a simulation from start fails at station i (tank < 0), any station between start and i also fails — because starting later means missing the positive contributions from stations start..i-1. So we can skip all of them and try i+1. The accumulated deficit tracks how much total "help" the skipped stations would have needed — if total net fuel ≥ 0, the surviving start can supply this deficit from the "front" of the tour.']}),e.jsx(E,{q:"What if multiple starting positions are valid in the petrol pump problem?",a:"The theorem guarantees at most one valid starting position when total(petrol) = total(cost). In general, if total petrol > total cost, the 'last surviving start' from the greedy is correct. The algorithm always returns the smallest valid starting index (the first one that doesn't fail). For competitive programming purposes, the problem is typically posed with exactly one valid start or no valid start."})]})}function re(){return e.jsxs("div",{children:[e.jsx(B,{color:"purple",icon:"ti-tournament",children:"5 queue problems — circular array design, BFS patterns, monotonic deque, and the circular tour."}),e.jsx(I,{num:1,title:"Implement Queue Using Stacks",difficulty:"LC Medium",tags:["LC 232","Two Stacks"],statement:"Implement a queue using only two stacks. The queue should support push (enqueue), pop (dequeue), peek (getFront), and empty operations.",constraints:["1 ≤ x ≤ 9","At most 100 operations","pop/peek on non-empty queue"],examples:[{input:"push(1),push(2),peek→1,pop→1,empty→false",output:"[1,2] front=1"}],approach:"Two stacks: inbox and outbox. Push always goes to inbox. Pop/peek: if outbox is empty, move all inbox items to outbox (reversal gives FIFO order). Amortized O(1) per operation — each element moves between stacks at most once.",code:{cpp:`class MyQueue{
    stack<int> in,out;
    void transfer(){while(!in.empty()){out.push(in.top());in.pop();}}
public:
    void push(int x){in.push(x);}
    int pop(){if(out.empty())transfer();int v=out.top();out.pop();return v;}
    int peek(){if(out.empty())transfer();return out.top();}
    bool empty(){return in.empty()&&out.empty();}
};`,python:`class MyQueue:
    def __init__(self):self.inbox=[];self.outbox=[]
    def push(self,x):self.inbox.append(x)
    def _transfer(self):
        if not self.outbox:
            while self.inbox:self.outbox.append(self.inbox.pop())
    def pop(self):self._transfer();return self.outbox.pop()
    def peek(self):self._transfer();return self.outbox[-1]
    def empty(self):return not self.inbox and not self.outbox`}}),e.jsx(I,{num:2,title:"Reverse a Queue",difficulty:"OA Easy",tags:["Stack","Recursion"],statement:"Given a queue, reverse its elements. Do not use any extra data structure other than a stack (iterative approach) or the call stack (recursive approach).",constraints:["1 ≤ n ≤ 10⁵","Each element fits in 32-bit int"],examples:[{input:"{10,5,15,20}",output:"{20,15,5,10}"}],approach:"Iterative: dequeue all into a stack (O(n)), then pop all back into queue (LIFO reversal gives FIFO-reversed order). Recursive: dequeue front, recurse on smaller queue, then enqueue dequeued element — this enqueues elements in reverse during stack unwinding.",code:{cpp:`void reverseQueue(queue<int>& q){
    stack<int> st;
    while(!q.empty()){st.push(q.front());q.pop();}
    while(!st.empty()){q.push(st.top());st.pop();}
}
// Recursive:
void reverseRec(queue<int>& q){
    if(q.empty())return;
    int f=q.front();q.pop();
    reverseRec(q);q.push(f);
}`,python:`from collections import deque
def reverse_queue(q):
    s=list(q);q.clear()
    while s:q.append(s.pop())
def reverse_rec(q):
    if not q:return
    f=q.popleft();reverse_rec(q);q.append(f)`}}),e.jsx(I,{num:3,title:"Sliding Window Maximum",difficulty:"LC Hard",tags:["LC 239","Monotonic Deque"],statement:"Given array <code>nums</code> and integer <code>k</code>, return the maximum value in each sliding window of size k. Total n−k+1 windows.",constraints:["1 ≤ k ≤ n ≤ 10⁵","−10⁴ ≤ nums[i] ≤ 10⁴"],examples:[{input:"nums=[1,3,-1,-3,5,3,6,7], k=3",output:"[3,3,5,5,6,7]"}],approach:"Monotonic deque of indices maintaining decreasing values. For each index i: (1) evict front if expired (index ≤ i−k). (2) Pop from back while arr[back] ≤ arr[i] — those indices are permanently useless. (3) Push i. (4) When i ≥ k−1, record arr[deque.front()]. O(n) total — each element pushed and popped at most once.",code:{cpp:`vector<int> maxSlidingWindow(vector<int>& nums,int k){
    deque<int> dq;vector<int> res;
    for(int i=0;i<nums.size();i++){
        while(!dq.empty()&&dq.front()<=i-k)dq.pop_front();
        while(!dq.empty()&&nums[dq.back()]<=nums[i])dq.pop_back();
        dq.push_back(i);
        if(i>=k-1)res.push_back(nums[dq.front()]);
    }
    return res;
}`,python:`from collections import deque
def max_sliding_window(nums,k):
    dq=deque();res=[]
    for i,v in enumerate(nums):
        while dq and dq[0]<=i-k:dq.popleft()
        while dq and nums[dq[-1]]<=v:dq.pop()
        dq.append(i)
        if i>=k-1:res.append(nums[dq[0]])
    return res`}}),e.jsx(I,{num:4,title:"Implement Stack Using Queues",difficulty:"LC Medium",tags:["LC 225","Two Queues"],statement:"Implement a LIFO stack using only queues. Support push, pop, top, and empty operations.",constraints:["1 ≤ x ≤ 9","At most 100 operations"],examples:[{input:"push(1),push(2),top→2,pop→2,empty→false",output:""}],approach:"One queue, expensive push: when pushing x, enqueue x, then rotate the queue (n-1) times — x ends up at the front. Pop/top are O(1). OR: two queues, rotate on pop. The single-queue approach: push x to q1, then move all existing elements from q1 back after x so x is at front.",code:{cpp:`class MyStack{
    queue<int> q;
public:
    void push(int x){
        q.push(x);
        for(int i=0;i<q.size()-1;i++){q.push(q.front());q.pop();}
    }
    int pop(){int v=q.front();q.pop();return v;}
    int top(){return q.front();}
    bool empty(){return q.empty();}
};`,python:`from collections import deque
class MyStack:
    def __init__(self):self.q=deque()
    def push(self,x):
        self.q.append(x)
        for _ in range(len(self.q)-1):self.q.append(self.q.popleft())
    def pop(self):return self.q.popleft()
    def top(self):return self.q[0]
    def empty(self):return not self.q`}}),e.jsx(I,{num:5,title:"Gas Station (Circular Tour)",difficulty:"LC Hard",tags:["LC 134","Petrol Pump"],statement:"N gas stations in a circle. Station i has gas[i] and costs cost[i] to travel to the next. Find the starting index to complete the circuit, or return <code>-1</code>.",constraints:["1 ≤ n ≤ 10⁵","0 ≤ gas[i], cost[i] ≤ 10⁴"],examples:[{input:"gas=[1,2,3,4,5], cost=[3,4,5,1,2]",output:"3"},{input:"gas=[2,3,4], cost=[3,4,3]",output:"-1"}],approach:"Greedy O(n): track running tank. When tank < 0 → current start is invalid, shift to i+1, accumulate deficit. After full scan, if total net ≥ 0 → the last surviving start is valid. The deficit accumulator serves as the 'total feasibility' check in O(1) extra space.",code:{cpp:`int canCompleteCircuit(vector<int>& gas,vector<int>& cost){
    int start=0,tank=0,deficit=0;
    for(int i=0;i<gas.size();i++){
        tank+=gas[i]-cost[i];
        if(tank<0){deficit+=tank;start=i+1;tank=0;}
    }
    return tank+deficit>=0?start:-1;
}`,python:`def can_complete_circuit(gas,cost):
    start=tank=deficit=0
    for i,(g,c) in enumerate(zip(gas,cost)):
        tank+=g-c
        if tank<0:deficit+=tank;start=i+1;tank=0
    return start if tank+deficit>=0 else -1`}})]})}const oe=[{id:"foundations",label:"Queue Fundamentals"},{id:"classic",label:"Classic Problems"},{id:"advanced",label:"Sliding Window & Tour"},{id:"problems",label:"Problems"}];function se(){const[s,l]=m.useState("foundations"),t={foundations:e.jsx(Z,{}),classic:e.jsx(ee,{}),advanced:e.jsx(te,{}),problems:e.jsx(re,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 16"}),e.jsx("h1",{className:"page-header-title",children:"Queues & Deques"}),e.jsx("p",{className:"page-header-subtitle",children:"FIFO · Circular Array · Linked List Queue · Deque · Reverse Queue · Sliding Window Max · Circular Tour"})]}),e.jsx(Q,{tabs:oe,active:s,onChange:l}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:t[s]}),e.jsx(H,{moduleId:16})]})}export{se as default};
