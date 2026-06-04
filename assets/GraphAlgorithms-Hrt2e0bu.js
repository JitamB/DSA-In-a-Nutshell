import{r as V,j as e}from"./index-D9jkHkZY.js";import{S as Z,N as ee,d as I,H as y,P as q,a as j,T as te,Q as R,G as ie,C as U,V as N}from"./SectionNav-BHzhBu3R.js";const re={0:[75,155],1:[245,75],2:[245,235],3:[415,75],4:[415,235]},G=[{u:0,v:1,w:2},{u:1,v:2,w:3},{u:1,v:4,w:5},{u:0,v:3,w:6},{u:2,v:4,w:7},{u:1,v:3,w:10},{u:3,v:4,w:9}];function ne(){const i=[0,1,2,3,4],l=[0,0,0,0,0];function t(o){return i[o]===o?o:i[o]=t(i[o])}function s(o,c){const p=t(o),u=t(c);return p===u?!1:(l[p]<l[u]?i[p]=u:l[p]>l[u]?i[u]=p:(i[u]=p,l[p]++),!0)}const d=[],r=[],n=[0];d.push({mstEdges:[],rejected:[],cur:null,parent:[...i],totalW:0,action:"init",desc:"Kruskal's: sort all edges by weight. Greedily add lightest edge if it doesn't form a cycle (union-find check)."});const a=[];for(const o of G)if(t(o.u)===t(o.v))a.push(o),d.push({mstEdges:[...r],rejected:[...a],cur:o,parent:[...i],totalW:n[0],action:"skip",desc:`Edge ${o.u}-${o.v} (w=${o.w}): find(${o.u})=find(${o.v})=${t(o.u)} → SAME component → would form cycle → SKIP.`});else if(s(o.u,o.v),r.push(o),n[0]+=o.w,d.push({mstEdges:[...r],rejected:[...a],cur:o,parent:[...i],totalW:n[0],action:"add",desc:`Edge ${o.u}-${o.v} (w=${o.w}): different components → ADD to MST. Total weight = ${n[0]}. ${r.length===4?"MST COMPLETE (n-1=4 edges)!":""}`}),r.length===4)break;return d.push({mstEdges:[...r],rejected:[...a],cur:null,parent:[...i],totalW:n[0],action:"done",desc:`MST complete! Edges: ${r.map(o=>`${o.u}-${o.v}(${o.w})`).join(", ")}. Total weight = ${n[0]}.`}),d}const b=ne(),oe={0:[75,155],1:[245,75],2:[245,235],3:[415,75],4:[415,235]},se={0:[[1,4],[2,2]],1:[[0,4],[2,1],[3,5]],2:[[0,2],[1,1],[3,8],[4,10]],3:[[1,5],[2,8],[4,2]],4:[[2,10],[3,2]]},ae=[[0,1,4],[0,2,2],[1,2,1],[1,3,5],[2,3,8],[2,4,10],[3,4,2]],m=999;function de(){const i=[0,m,m,m,m],l=new Array(5).fill(!1),t=[];t.push({dist:[...i],vis:[...l],cur:null,pq:[[0,0]],action:"init",desc:"Initialize: dist[0]=0, all others=∞. Priority queue: {(0,0)}. At each step, extract min-dist unvisited node."});const s=[[0,0]];let d=0;for(;s.length&&d<10;){s.sort((a,o)=>a[0]-o[0]);const[r,n]=s.shift();if(l[n]){t.push({dist:[...i],vis:[...l],cur:n,pq:[...s],action:"stale",desc:`Extract (${r},${n}): dist[${n}]=${i[n]} < ${r} → STALE entry. Skip.`}),d++;continue}l[n]=!0,t.push({dist:[...i],vis:[...l],cur:n,pq:[...s],action:"extract",desc:`Extract min: node ${n} (dist=${i[n]}). Mark visited. Relax all edges from ${n}.`});for(const[a,o]of se[n])if(!l[a]&&i[n]+o<i[a]){const c=i[a];i[a]=i[n]+o,s.push([i[a],a]),t.push({dist:[...i],vis:[...l],cur:n,relax:{u:n,v:a,w:o,old:c,newD:i[a]},pq:[...s],action:"relax",desc:`Relax edge ${n}→${a} (w=${o}): dist[${a}] = min(${c===m?"∞":c}, ${i[n]}+${o}) = ${i[a]} ✓ Update!`})}else l[a]||t.push({dist:[...i],vis:[...l],cur:n,pq:[...s],action:"norelax",desc:`Edge ${n}→${a} (w=${o}): dist[${a}]=${i[a]===m?"∞":i[a]} ≤ ${i[n]}+${o} = ${i[n]+o}. No improvement.`});d++}return t.push({dist:[...i],vis:[...l],cur:null,pq:[],action:"done",desc:`Done! Shortest distances from 0: [${i.map(r=>r===m?"∞":r).join(", ")}]`}),t}const k=de(),w=4,M=[[0,3,m,7],[8,0,2,m],[m,m,0,1],[2,m,m,0]];function le(){const i=M.map(s=>[...s]),l=[],t=s=>s>=m?"∞":s;l.push({dist:i.map(s=>[...s]),k:-1,i:-1,j:-1,action:"init",desc:"Initial distance matrix. Entry [i][j] = direct edge weight, or ∞ if no direct edge."});for(let s=0;s<w;s++){l.push({dist:i.map(d=>[...d]),k:s,i:-1,j:-1,action:"newk",desc:`Iteration k=${s}: try routing ALL pairs through intermediate vertex ${s}.`});for(let d=0;d<w;d++)for(let r=0;r<w;r++){if(d===r)continue;const n=i[d][s]+i[s][r];if(n<i[d][r]){const a=i[d][r];i[d][r]=n,l.push({dist:i.map(o=>[...o]),k:s,i:d,j:r,via:n,old:a,action:"update",desc:`Update dist[${d}][${r}]: ${t(a)} → ${n} (via ${s}: ${t(M[d][s])}…${t(M[s][r])} route)`})}}}return l.push({dist:i.map(s=>[...s]),k:w,i:-1,j:-1,action:"done",desc:`All-pairs shortest paths complete! ${w}³ = ${w**3} iterations total.`}),l}const S=le();function X({pos:i,edges:l,hl:t={},edgeHL:s={},directed:d=!1,W:r=500,H:n=320}){const a={cur:"#3A2A1A",vis:"#1A3A2A",pq:"#1A2A3A",mst:"#1A3A2A",rej:"#3A1A1A",none:"#131722"},o={cur:"#CE9178",vis:"#4EC9B0",pq:"#81B4EA",mst:"#4EC9B0",rej:"#F44747",none:"#1E2233"},c={cur:"#CE9178",vis:"#4EC9B0",pq:"#9CDCFE",mst:"#4EC9B0",rej:"#F44747",none:"#6A7490"},p=22;return e.jsxs("svg",{width:r,height:n,viewBox:`0 0 ${r} ${n}`,children:[l.map(([u,f,g],v)=>{const h=i[u],x=i[f],H=`${u}-${f}`,Y=`${f}-${u}`,F=s[H]||s[Y]||"none",$=F==="mst"?"#4EC9B0":F==="rej"?"#F44747":F==="cur"?"#CE9178":"#2A3050",P=F==="mst"||F==="cur"?2.5:1.5,W=(h[0]+x[0])/2,E=(h[1]+x[1])/2;if(d){const _=x[0]-h[0],D=x[1]-h[1],O=Math.sqrt(_*_+D*D),A=_/O,C=D/O,Q=h[0]+A*p,J=h[1]+C*p,z=x[0]-A*p,B=x[1]-C*p,K=z-A*10,L=B-C*10;return e.jsxs("g",{children:[e.jsx("line",{x1:Q,y1:J,x2:z,y2:B,stroke:$,strokeWidth:P}),e.jsx("polygon",{points:`${z},${B} ${K+C*5},${L-A*5} ${K-C*5},${L+A*5}`,fill:$}),e.jsx("rect",{x:W-9,y:E-9,width:18,height:14,rx:3,fill:"#0D0F18"}),e.jsx("text",{x:W,y:E+1,textAnchor:"middle",dominantBaseline:"middle",fill:$,fontSize:"10",fontFamily:"monospace",fontWeight:"700",children:g})]},v)}return e.jsxs("g",{children:[e.jsx("line",{x1:h[0],y1:h[1],x2:x[0],y2:x[1],stroke:$,strokeWidth:P}),e.jsx("rect",{x:W-9,y:E-9,width:18,height:14,rx:3,fill:"#0D0F18"}),e.jsx("text",{x:W,y:E+1,textAnchor:"middle",dominantBaseline:"middle",fill:$,fontSize:"10",fontFamily:"monospace",fontWeight:"700",children:g})]},v)}),Object.keys(i).map(u=>{const f=+u,[g,v]=i[f],h=t[f]||"none";return e.jsxs("g",{children:[e.jsx("circle",{cx:g,cy:v,r:p,fill:a[h],stroke:o[h],strokeWidth:h!=="none"?2:1}),e.jsx("text",{x:g,y:v+1,textAnchor:"middle",dominantBaseline:"middle",fill:c[h],fontSize:"13",fontFamily:"monospace",fontWeight:h!=="none"?700:500,children:u})]},u)})]})}function ce(){const[i,l]=V.useState(0),t=b[Math.min(i,b.length-1)],s={};(t.mstEdges||[]).forEach(r=>{s[`${r.u}-${r.v}`]="mst"}),(t.rejected||[]).forEach(r=>{s[`${r.u}-${r.v}`]="rej"}),t.cur&&t.action==="add"&&(s[`${t.cur.u}-${t.cur.v}`]="cur");const d={};return(t.mstEdges||[]).forEach(r=>{d[r.u]="vis",d[r.v]="vis"}),t.cur&&(d[t.cur.u]="cur",d[t.cur.v]="cur"),e.jsxs(N,{children:[e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[t.action!=="init"&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${t.action==="add"?"success":t.action==="skip"?"danger":"info"})`,color:`var(--color-text-${t.action==="add"?"success":t.action==="skip"?"danger":"info"})`,border:`1px solid var(--color-border-${t.action==="add"?"success":t.action==="skip"?"danger":"info"})`,whiteSpace:"nowrap"},children:t.action==="add"?"Add to MST ✓":t.action==="skip"?"Skip (cycle)":t.action==="done"?"Done ✓":"Start"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc})]}),e.jsx("div",{style:{overflowX:"auto",marginBottom:12},children:e.jsx(X,{pos:re,edges:G.map(r=>[r.u,r.v,r.w]),hl:d,edgeHL:s,W:500,H:320})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:10,marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"MST EDGES SO FAR"}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap"},children:(t.mstEdges||[]).length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)"},children:"none yet"}):(t.mstEdges||[]).map((r,n)=>e.jsxs("div",{style:{padding:"3px 9px",borderRadius:5,border:"1px solid var(--color-border-success)",background:"var(--color-background-success)",fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-success)",fontWeight:700},children:[r.u,"-",r.v,"(w=",r.w,")"]},n))})]}),e.jsxs("div",{style:{padding:"8px 14px",borderRadius:"var(--border-radius-md)",background:t.totalW>0?"var(--color-background-success)":"var(--color-background-secondary)",border:`0.5px solid ${t.totalW>0?"var(--color-border-success)":"var(--color-border-secondary)"}`,textAlign:"center",minWidth:80},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:2},children:"Total W"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:t.totalW>0?"var(--color-text-success)":"var(--color-text-secondary)"},children:t.totalW})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,i-1)),i===0],["Next →",()=>l(Math.min(b.length-1,i+1)),i===b.length-1]].map(([r,n,a])=>e.jsx("button",{onClick:n,disabled:a,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:a?"not-allowed":"pointer",fontSize:12,opacity:a?.4:1},children:r},r)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[i+1,"/",b.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>l(b.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function pe(){const[i,l]=V.useState(0),t=k[Math.min(i,k.length-1)],s={};(t.vis||[]).forEach((r,n)=>{r&&(s[n]="vis")}),t.cur!=null&&(s[t.cur]="cur");const d={};return t.relax&&(d[`${t.relax.u}-${t.relax.v}`]="cur"),e.jsxs(N,{children:[e.jsxs("div",{style:{marginBottom:10,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[t.action!=="init"&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${t.action==="relax"?"success":t.action==="extract"?"info":t.action==="stale"?"secondary":"success"})`,color:`var(--color-text-${t.action==="relax"?"success":t.action==="extract"?"info":t.action==="stale"?"tertiary":"success"})`,border:`1px solid var(--color-border-${t.action==="relax"?"success":t.action==="extract"?"info":t.action==="stale"?"secondary":"success"})`,whiteSpace:"nowrap"},children:t.action==="relax"?"Relax ✓":t.action==="extract"?"Extract min":t.action==="stale"?"Stale skip":t.action==="done"?"Done ✓":"No improvement"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:12,marginBottom:12},children:[e.jsx("div",{style:{overflowX:"auto"},children:e.jsx(X,{pos:oe,edges:ae.map(r=>[r[0],r[1],r[2]]),hl:s,edgeHL:d,W:500,H:320})}),e.jsxs("div",{style:{minWidth:110},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"DIST TABLE"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:(t.dist||[]).map((r,n)=>{const a=t.relax&&t.relax.v===n,o=t.cur===n,c=(t.vis||[])[n],p=a?"var(--color-text-success)":o?"var(--color-text-warning)":c?"var(--color-text-info)":"var(--color-text-secondary)";return e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",padding:"4px 8px",borderRadius:5,border:`1px solid ${a?"var(--color-border-success)":o?"var(--color-border-warning)":c?"var(--color-border-info)":"var(--color-border-secondary)"}`,background:a?"var(--color-background-success)":o?"var(--color-background-warning)":c?"rgba(129,180,234,0.1)":"var(--color-background-secondary)",transition:"all 0.15s"},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11.5,color:p,minWidth:12},children:n}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:p},children:r>=m?"∞":r})]},n)})})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,i-1)),i===0],["Next →",()=>l(Math.min(k.length-1,i+1)),i===k.length-1]].map(([r,n,a])=>e.jsx("button",{onClick:n,disabled:a,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:a?"not-allowed":"pointer",fontSize:12,opacity:a?.4:1},children:r},r)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[i+1,"/",k.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>l(k.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function ue(){const[i,l]=V.useState(0),t=S[Math.min(i,S.length-1)],s=d=>d>=m?"∞":d;return e.jsxs(N,{children:[e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[t.action!=="init"&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${t.action==="update"?"success":t.action==="newk"?"info":"success"})`,color:`var(--color-text-${t.action==="update"?"success":t.action==="newk"?"info":"success"})`,border:`1px solid var(--color-border-${t.action==="update"?"success":t.action==="newk"?"info":"success"})`,whiteSpace:"nowrap"},children:t.action==="update"?"Update ✓":t.action==="newk"?`k=${t.k}`:"Done ✓"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc})]}),e.jsx("div",{style:{overflowX:"auto",marginBottom:14},children:e.jsxs("div",{style:{display:"inline-block",padding:10,background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8},children:[e.jsxs("div",{style:{display:"flex",gap:4,marginBottom:4},children:[e.jsx("div",{style:{width:30,height:30}}),[0,1,2,3].map(d=>e.jsxs("div",{style:{width:42,height:30,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)"},children:["j=",d]},d))]}),(t.dist||M).map((d,r)=>e.jsxs("div",{style:{display:"flex",gap:4,marginBottom:4},children:[e.jsxs("div",{style:{width:30,height:42,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)"},children:["i=",r]}),d.map((n,a)=>{const o=t.action==="update"&&t.i===r&&t.j===a,c=t.action==="update"&&(t.i===r&&t.j===t.k||t.i===t.k&&t.j===a),p=t.k>=0&&r===t.k,u=t.k>=0&&a===t.k,f=r===a;let g="#131722",v="#1E2233",h="#6A7490";return f?(g="#141822",v="#1E2233",h="#3D4460"):o?(g="var(--color-background-success)",v="var(--color-border-success)",h="var(--color-text-success)"):c&&t.action==="update"?(g="rgba(129,180,234,0.15)",v="var(--color-border-info)",h="var(--color-text-info)"):(p||u)&&t.action==="newk"&&(g="rgba(206,145,120,0.15)",v="var(--color-border-warning)",h="var(--color-text-secondary)"),e.jsx("div",{style:{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,border:`1.5px solid ${v}`,background:g,fontFamily:"var(--font-mono)",fontSize:13,fontWeight:o?700:500,color:h,transition:"all 0.18s"},children:s(n)},a)})]},r))]})}),t.action==="update"&&e.jsxs("div",{style:{padding:"6px 12px",background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:12.5,color:"var(--color-text-success)",marginBottom:12},children:["dist[",t.i,"][",t.j,"]: ",s(t.old)," → ",t.via," (via k=",t.k,")"]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,i-1)),i===0],["Next →",()=>l(Math.min(S.length-1,i+1)),i===S.length-1]].map(([d,r,n])=>e.jsx("button",{onClick:r,disabled:n,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n?"not-allowed":"pointer",fontSize:12,opacity:n?.4:1},children:d},d)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[i+1,"/",S.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>l(S.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}const he={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function T({num:i,title:l,difficulty:t,tags:s=[],statement:d,constraints:r=[],examples:n=[],approach:a,code:o}){const[c,p]=V.useState(!1),u=he[t]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",i]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:l})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[s.map(f=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:f},f)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${u})`,color:`var(--color-text-${u})`,border:`1px solid var(--color-border-${u})`},children:t})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:d}}),r.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:r.map((f,g)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:f},g))})]}),n.length>0&&e.jsx("div",{style:{marginBottom:14},children:n.map((f,g)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",g+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f.output})]}),f.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:f.note})]},g))}),e.jsxs("button",{onClick:()=>p(!c),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:c?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${c?"eye-off":"bulb"}`}),c?"Hide Solution":"Show Approach & Solution"]}),c&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),a]}),e.jsx(j,{children:o})]})]})]})}function fe(){return e.jsxs("div",{children:[e.jsxs(I,{color:"info",icon:"ti-git-merge",children:["A ",e.jsx("strong",{children:"Minimum Spanning Tree"})," of a connected weighted undirected graph is a spanning tree (V-1 edges, no cycles, connects all vertices) with the minimum total edge weight. Applications: network design, cluster analysis, approximation algorithms for TSP."]}),e.jsx(y,{children:"Kruskal's Algorithm — Interactive"}),e.jsx(q,{children:"Sort all edges by weight. For each edge (lightest first): if the two endpoints are in different components (union-find check), add the edge to the MST. Repeat until V-1 edges added."}),e.jsx(ce,{}),e.jsx(j,{children:{cpp:`// Union-Find (path compression + union by rank) — O(α(n)) per op
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
// Time: O(E log E) dominated by sort. Union-Find ops ≈ O(1) amortized.`,python:`class DSU:
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
    return total`}}),e.jsx(y,{children:"Prim's Algorithm — Grow from One Source"}),e.jsx(q,{children:"Start with any vertex. Repeatedly add the minimum-weight edge that crosses from the visited set to the unvisited set. Uses a priority queue. O((V+E) log V) with binary heap — same complexity as Dijkstra, but grows the MST greedily from a root."}),e.jsx(j,{children:{cpp:`int primMST(vector<vector<pair<int,int>>>& adj, int V) {
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
}`,python:`def prim_mst(adj, V):
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
    return total`}}),e.jsxs(ie,{cols:2,children:[e.jsx(U,{title:"Kruskal vs Prim",color:"info",children:e.jsxs("div",{style:{fontSize:13,lineHeight:1.7},children:[e.jsx("strong",{children:"Kruskal:"})," edge-centric. Better for sparse graphs. Needs union-find.",e.jsx("br",{}),e.jsx("strong",{children:"Prim:"})," vertex-centric. Better for dense graphs. Similar structure to Dijkstra.",e.jsx("br",{}),"Both are O(E log E) with binary heap."]})}),e.jsx(U,{title:"MST Uniqueness",color:"warning",children:"If all edge weights are distinct, the MST is unique. If weights can repeat, multiple MSTs may exist with the same total weight. The MST property: adding any non-MST edge creates a cycle where that edge has the maximum weight."})]}),e.jsx(R,{q:"Why does Kruskal's algorithm work — why is greedily adding the cheapest safe edge always optimal?",a:"The cut property: for any cut (partition of vertices into two sets), the minimum-weight edge crossing the cut belongs to SOME MST. Kruskal's maintains a forest. Each time it adds the lightest edge not forming a cycle, that edge crosses some cut where it's the minimum-weight crossing edge — so it must be in the MST. This is the greedy matroid property of spanning trees."})]})}function ge(){return e.jsxs("div",{children:[e.jsxs(I,{color:"success",icon:"ti-route",children:[e.jsx("strong",{children:"Dijkstra's algorithm"})," finds shortest paths from a single source to all other vertices in a graph with non-negative edge weights. Uses a greedy strategy: always process the unvisited vertex with the smallest known distance. O((V+E) log V) with a binary heap."]}),e.jsx(y,{children:"Dijkstra Step-Through — Interactive"}),e.jsx(q,{children:"Watch the distance table update as the algorithm relaxes edges. Orange = currently processing, green = finalized (shortest path confirmed), blue = in priority queue."}),e.jsx(pe,{}),e.jsx(j,{children:{cpp:`#include <queue>
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
// CRITICAL: Dijkstra FAILS with negative edge weights!`,python:`import heapq
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
    return dist`}}),e.jsx(y,{children:"Dijkstra Applications — Common Interview Patterns"}),e.jsx(j,{children:{cpp:`// Pattern 1: Path reconstruction (add prev[] array)
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
// "Minimum bottleneck path" → Dijkstra variant / Kruskal MST`,python:`# Reconstruct shortest path:
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
    return path[::-1]`}}),e.jsx(R,{q:"Why does Dijkstra fail with negative edge weights? What's the counterexample?",a:"Dijkstra marks nodes as 'finalized' when extracted from the priority queue — assuming no shorter path exists. With negative edges, a longer path discovered later could become shorter via a negative edge. Example: A→B(1), A→C(3), B→C(-3). Dijkstra finalizes B first (dist=1), then might finalize C as 3 without seeing A→B→C = 1+(-3)=-2. Use Bellman-Ford for negative edges, or Johnson's algorithm for all-pairs with negatives."})]})}function me(){return e.jsxs("div",{children:[e.jsx(y,{children:"Bellman-Ford — Handles Negative Weights"}),e.jsx(q,{children:"Relax ALL edges V-1 times. After V-1 relaxations, shortest paths are found (in a graph with V vertices, any path has at most V-1 edges). A V-th relaxation that still improves a distance indicates a negative cycle."}),e.jsx(j,{children:{cpp:`vector<int> bellmanFord(vector<tuple<int,int,int>>& edges, int V, int src) {
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
// Works with negative edges. Detects negative cycles.`,python:`def bellman_ford(edges, V, src):
    dist=[float('inf')]*V; dist[src]=0
    for _ in range(V-1):
        for u,v,w in edges:
            if dist[u]!=float('inf') and dist[u]+w<dist[v]:
                dist[v]=dist[u]+w
    # Detect negative cycle
    for u,v,w in edges:
        if dist[u]!=float('inf') and dist[u]+w<dist[v]:
            return None   # negative cycle!
    return dist`}}),e.jsx(y,{children:"Dijkstra vs Bellman-Ford vs Floyd-Warshall"}),e.jsx(te,{heads:["Algorithm","Source","Negative edges?","Negative cycle detect?","Time","Space"],rows:[["Dijkstra","Single","No (fails)","No","O((V+E)logV)","O(V)"],["Bellman-Ford","Single","Yes","Yes (V-th pass)","O(V×E)","O(V)"],["Floyd-Warshall","All pairs","Yes","Yes (diagonal)","O(V³)","O(V²)"]]}),e.jsx(y,{children:"Floyd-Warshall — All-Pairs Shortest Paths (Interactive)"}),e.jsxs(q,{children:["Dynamic programming: dist[i][j][k] = shortest i→j path using only vertices ",0 .k," as intermediates. The recurrence: dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j]) for each intermediate vertex k, iterated over all k from 0 to V-1."]}),e.jsx(ue,{}),e.jsx(j,{children:{cpp:`void floydWarshall(vector<vector<int>>& dist, int V) {
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
// Time: O(V³)  Space: O(V²)`,python:`def floyd_warshall(dist, V):
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
    return reach`}}),e.jsx(y,{children:"Transitive Closure"}),e.jsx(q,{children:"Determine if there's any path from i to j — replace edge weights with booleans (T/F) and replace min with OR. Same Floyd-Warshall structure with boolean algebra."}),e.jsx(j,{lang:"cpp",children:`// Transitive closure via Floyd-Warshall
vector<vector<bool>> transitiveClosure(vector<vector<bool>>& reach, int V) {
    for (int k=0; k<V; k++)
        for (int i=0; i<V; i++)
            for (int j=0; j<V; j++)
                reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
    return reach;  // reach[i][j] = true iff path from i to j exists
}`}),e.jsx(R,{q:"Why does Floyd-Warshall consider intermediates in order k=0,1,...,V-1? Doesn't the order matter?",a:"Yes, the order matters conceptually, but the algorithm is correct for any order. The key insight: when computing dist[i][j] using intermediate k, dist[i][k] and dist[k][j] were already optimized using intermediates {0..k-1} (from previous outer loop iterations). So we're correctly building up: paths using {0}, then paths using {0,1}, etc. The in-place update is safe because dist[i][k] and dist[k][j] are NOT improved by the k-th iteration (any path through k again would add 0 cost since dist[k][k]=0)."})]})}function ve(){return e.jsxs("div",{children:[e.jsx(I,{color:"purple",icon:"ti-tournament",children:"6 graph algorithm problems — MST, Dijkstra, Bellman-Ford applications, and classic SP patterns."}),e.jsx(T,{num:1,title:"Min Cost to Connect All Points (Prim's MST)",difficulty:"LC Medium",tags:["LC 1584","Prim's MST"],statement:"Given n points on a 2D grid, connect all points with minimum total cost. Cost of connecting (x1,y1) and (x2,y2) = |x1-x2| + |y1-y2| (Manhattan distance). Return minimum cost.",constraints:["1 ≤ n ≤ 1000","−10⁶ ≤ xi,yi ≤ 10⁶"],examples:[{input:"points=[[0,0],[2,2],[3,10],[5,2],[7,0]]",output:"20"},{input:"[[3,12],[-2,5],[-4,1]]",output:"18"}],approach:"Complete graph (every pair of points has an edge). Prim's MST is more efficient than Kruskal's here (dense graph: O(n²) adj matrix Prim vs O(n² log n) Kruskal). Track min cost to add each unvisited point. O(n²) time with adj matrix Prim.",code:{cpp:`int minCostConnectPoints(vector<vector<int>>& pts){
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
    return total`}}),e.jsx(T,{num:2,title:"Network Delay Time (Dijkstra)",difficulty:"LC Medium",tags:["LC 743","Dijkstra"],statement:"Given n nodes, k directed weighted edges <code>times[i]=[u,v,w]</code>, and a source k. Find how long until all n nodes have received a signal. Return -1 if impossible.",constraints:["1 ≤ n ≤ 100","1 ≤ k ≤ edges ≤ 6000","1 ≤ u,v,w ≤ 100"],examples:[{input:"times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2",output:"2"},{input:"times=[[1,2,1]], n=2, k=1",output:"1"}],approach:"Single-source shortest path from k using Dijkstra. The answer = maximum distance in the dist[] array (last node to receive signal). If any dist[i] == ∞ → return -1 (unreachable node).",code:{cpp:`int networkDelayTime(vector<vector<int>>& times,int n,int k){
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
    return mx if mx!=float('inf') else -1`}}),e.jsx(T,{num:3,title:"Cheapest Flights Within K Stops",difficulty:"LC Medium",tags:["LC 787","Bellman-Ford K passes"],statement:"Given n cities, flights as [from,to,price], find the cheapest flight from src to dst with at most K stops. Return -1 if impossible.",constraints:["1 ≤ n ≤ 100","0 ≤ flights.length ≤ 6000","1 ≤ price ≤ 10⁴"],examples:[{input:"n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1",output:"200"},{input:"k=0",output:"500"}],approach:"Bellman-Ford with exactly K+1 relaxation rounds (K stops = K+1 edges max). Use a copy of distances at the START of each round to prevent using edges from the same round twice (critical: prevents using more than one edge per relaxation). O(K×E).",code:{cpp:`int findCheapestPrice(int n,vector<vector<int>>& f,int src,int dst,int k){
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
    return dist[dst] if dist[dst]!=float('inf') else -1`}}),e.jsx(T,{num:4,title:"Find the City With Smallest Number of Neighbors (Floyd-Warshall)",difficulty:"LC Medium",tags:["LC 1334","Floyd-Warshall"],statement:"Given n cities with weighted bidirectional roads and a threshold distance, return the city with the fewest number of cities reachable within the threshold. If tie, return the city with the greatest number.",constraints:["2 ≤ n ≤ 100","edges[i] = [from,to,weight]","1 ≤ distanceThreshold ≤ 10⁴"],examples:[{input:"n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distThreshold=4",output:"3"}],approach:"Floyd-Warshall for all-pairs shortest paths. For each city, count how many other cities are reachable within threshold. Return the city with fewest reachable (ties broken by largest city index — so iterate from n-1 downward).",code:{cpp:`int findTheCity(int n,vector<vector<int>>& edges,int thr){
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
    return ans`}}),e.jsx(T,{num:5,title:"Redundant Connection (Union-Find)",difficulty:"LC Medium",tags:["LC 684","Union-Find"],statement:"Given a tree with one extra edge added (making a cycle), find the redundant edge that can be removed to restore the tree. If multiple answers, return the last one in the input.",constraints:["3 ≤ n ≤ 1000","Edges form a tree with exactly one extra edge"],examples:[{input:"edges=[[1,2],[1,3],[2,3]]",output:"[2,3]"},{input:"edges=[[1,2],[2,3],[3,4],[1,4],[1,5]]",output:"[1,4]"}],approach:"Process edges one by one. Use Union-Find: if both endpoints of an edge are already in the same component → adding this edge creates a cycle → this is the redundant edge (last such edge = answer per problem statement).",code:{cpp:`class DSU{vector<int>p;public:DSU(int n):p(n){iota(p.begin(),p.end(),0);}
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
        if not union(u,v):return[u,v]`}}),e.jsx(T,{num:6,title:"Evaluate Division (Weighted Graph Paths)",difficulty:"LC Medium",tags:["LC 399","Weighted BFS/DFS"],statement:"Given equations like A/B=2.0 and queries like A/C, compute the results using the given ratios. Return -1.0 for variables not in the equations or self-contradictions.",constraints:["1 ≤ equations.length ≤ 20","All variable strings have length 1-5"],examples:[{input:'equations=[["a","b"],["b","c"]], values=[2.0,3.0], queries=[["a","c"],["b","a"],["a","e"]]',output:"[6.0,0.5,-1.0]"}],approach:"Build a weighted directed graph: A→B with weight 2.0, B→A with weight 0.5. For each query (X,Y), BFS/DFS from X to Y — multiply edge weights along the path. If no path or variables not in graph → return -1.0.",code:{cpp:`double bfsQuery(unordered_map<string,vector<pair<string,double>>>& adj,const string& s,const string& t){
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
    return[bfs(s,t) for s,t in queries]`}})]})}const xe=[{id:"mst",label:"MST (Kruskal + Prim)"},{id:"dijkstra",label:"Dijkstra"},{id:"bellman",label:"Bellman-Ford & Floyd-Warshall"},{id:"problems",label:"Problems"}];function be(){const[i,l]=V.useState("mst"),t={mst:e.jsx(fe,{}),dijkstra:e.jsx(ge,{}),bellman:e.jsx(me,{}),problems:e.jsx(ve,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 22"}),e.jsx("h1",{className:"page-header-title",children:"Graph Algorithms"}),e.jsx("p",{className:"page-header-subtitle",children:"MST · Kruskal · Prim · Dijkstra · Bellman-Ford · Floyd-Warshall · Transitive Closure · Union-Find"})]}),e.jsx(Z,{tabs:xe,active:i,onChange:l}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:t[i]}),e.jsx(ee,{moduleId:22})]})}export{be as default};
