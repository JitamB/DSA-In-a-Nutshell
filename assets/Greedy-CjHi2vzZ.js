import{r as C,j as e}from"./index-D9jkHkZY.js";import{S as F,N as G,d as y,H as m,P as p,a as g,Q as b,c as I,G as _,C as T,T as $,V as R}from"./SectionNav-BHzhBu3R.js";const W=[{l:"A",s:1,e:4},{l:"B",s:3,e:5},{l:"C",s:0,e:6},{l:"D",s:5,e:7},{l:"E",s:3,e:9},{l:"F",s:5,e:9},{l:"G",s:6,e:10},{l:"H",s:8,e:11}],A=12;function L(n){const l=[],r=[];let a=-1/0;l.push({selected:[],lastEnd:-1/0,cur:-1,action:"init",desc:"Activities sorted by FINISH TIME. Greedy rule: always pick the activity with the earliest finish time that doesn't conflict."});for(let s=0;s<n.length;s++){const t=n[s],i=a;t.s>=a?(r.push(s),a=t.e,l.push({selected:[...r],lastEnd:a,cur:s,action:"select",desc:`${t.l} [${t.s}–${t.e}]: start(${t.s}) ≥ lastEnd(${i===-1/0?"–∞":i})  ✓  →  SELECT.  New lastEnd = ${t.e}`})):l.push({selected:[...r],lastEnd:a,cur:s,action:"skip",desc:`${t.l} [${t.s}–${t.e}]: start(${t.s}) < lastEnd(${a})  ✗  →  SKIP — overlaps with last selected activity`})}return l.push({selected:[...r],lastEnd:a,cur:-1,action:"done",desc:`Optimal selection: ${r.length} activities  [${r.map(s=>n[s].l).join(", ")}].  No larger compatible set exists.`}),l}const v=L(W),O=[{name:"Apple",weight:10,value:60},{name:"Banana",weight:20,value:100},{name:"Cherry",weight:30,value:120}],S=50,E=O.map(n=>({...n,ratio:n.value/n.weight})).sort((n,l)=>l.ratio-n.ratio);function P(n,l){const r=[];let a=l,s=0;const t=[];r.push({taken:[],rem:l,total:0,cur:-1,action:"init",desc:`Sort by value/weight ratio: ${n.map(i=>`${i.name}(${i.ratio.toFixed(1)})`).join(" → ")}. Capacity = ${l}.`});for(let i=0;i<n.length&&!(a<=0);i++){const o=n[i];if(o.weight<=a)s+=o.value,a-=o.weight,t.push({...o,frac:1}),r.push({taken:[...t],rem:a,total:s,cur:i,action:"full",desc:`Take ${o.name} FULLY  (w=${o.weight} ≤ ${a+o.weight} rem, ratio=${o.ratio.toFixed(1)}).  Value += ${o.value}.  Total = ${s}.`});else{const h=a/o.weight,d=+(o.value*h).toFixed(2);s=+(s+d).toFixed(2),t.push({...o,frac:h}),r.push({taken:[...t],rem:0,total:s,cur:i,action:"partial",desc:`Take ${o.name} PARTIALLY: ${a}/${o.weight} = ${(h*100).toFixed(0)}% (ratio=${o.ratio.toFixed(1)}).  Value += ${d}.  Knapsack FULL. Total = ${s}.`}),a=0;break}}return r.push({taken:[...t],rem:a,total:s,cur:-1,action:"done",desc:`Optimal fractional value = ${s}.  Fractional knapsack is always solvable by greedy — proven by exchange argument.`}),r}const k=P(E,S),z=[2,3,1,1,4];function B(n){const l=n.length,r=[];let a=0,s=0,t=0;r.push({i:-1,jumps:a,curEnd:s,farthest:t,action:"init",desc:"Track farthest reachable index. When i reaches the current jump's boundary → must take another jump, extend boundary to farthest."});for(let i=0;i<l-1;i++){const o=t;t=Math.max(t,i+n[i]),i===s?(a++,r.push({i,jumps:a,curEnd:s,farthest:t,action:"jump",desc:`i=${i}: reached boundary (${s}). farthest updated to ${t}. Take jump #${a}  →  new boundary = ${t}.`}),s=t):r.push({i,jumps:a,curEnd:s,farthest:t,action:"scan",desc:`i=${i}: arr[${i}]=${n[i]}, reach = i+arr[i] = ${i+n[i]}. farthest = max(${o}, ${i+n[i]}) = ${t}. Boundary still ${s}.`})}return r.push({i:l-1,jumps:a,curEnd:s,farthest:t,action:"done",desc:`Reached index ${l-1}!  Minimum jumps = ${a}.`}),r}const w=B(z);function M(){const[n,l]=C.useState(0),r=v[Math.min(n,v.length-1)],a=21,s=t=>r.selected.includes(t)?"success":r.cur===t?r.action==="select"?"success":r.action==="skip"?"danger":"info":null;return e.jsxs(R,{children:[e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:r.desc}),e.jsx("div",{style:{overflowX:"auto",marginBottom:14},children:e.jsxs("div",{style:{position:"relative",minWidth:A*a+40},children:[e.jsx("div",{style:{display:"flex",marginBottom:8,marginLeft:24},children:Array.from({length:A+1},(t,i)=>e.jsx("div",{style:{width:a,fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",textAlign:"left"},children:i},i))}),W.map((t,i)=>{const o=s(i),h=o?`var(--color-background-${o})`:"var(--color-background-secondary)",d=o?`var(--color-border-${o})`:"var(--color-border-secondary)",f=o?`var(--color-text-${o})`:"var(--color-text-tertiary)";return e.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:3,height:22},children:[e.jsx("span",{style:{width:22,fontSize:10,fontFamily:"var(--font-mono)",color:f,fontWeight:r.selected.includes(i)||r.cur===i?700:400},children:t.l}),e.jsx("div",{style:{position:"relative",flex:1},children:e.jsxs("div",{style:{position:"absolute",left:t.s*a,width:(t.e-t.s)*a-2,height:18,borderRadius:4,background:h,border:`1px solid ${d}`,display:"flex",alignItems:"center",paddingLeft:5,transition:"all 0.18s"},children:[e.jsxs("span",{style:{fontSize:9.5,fontFamily:"var(--font-mono)",color:f,fontWeight:600},children:[t.s,"–",t.e]}),r.selected.includes(i)&&e.jsx("span",{style:{marginLeft:4,fontSize:9},children:"✓"})]})})]},i)}),r.lastEnd!==-1/0&&r.lastEnd>=0&&e.jsx("div",{style:{position:"absolute",top:20,left:24+r.lastEnd*a,bottom:0,width:2,background:"var(--color-border-info)",borderRadius:1,opacity:.8}})]})}),e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"},children:[e.jsxs("div",{style:{padding:"5px 10px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",fontFamily:"var(--font-mono)",fontSize:12},children:["Selected: ",e.jsx("strong",{style:{color:"var(--color-text-success)"},children:r.selected.length})," [",r.selected.map(t=>W[t].l).join(", "),"]"]}),r.lastEnd!==-1/0&&e.jsxs("div",{style:{padding:"5px 10px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",fontFamily:"var(--font-mono)",fontSize:12},children:["lastEnd: ",e.jsx("strong",{style:{color:"var(--color-text-info)"},children:r.lastEnd})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,n-1)),n===0],["Next →",()=>l(Math.min(v.length-1,n+1)),n===v.length-1]].map(([t,i,o])=>e.jsx("button",{onClick:i,disabled:o,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:o?"not-allowed":"pointer",fontSize:12,opacity:o?.4:1},children:t},t)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[n+1,"/",v.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>l(v.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function q(){const[n,l]=C.useState(0),r=k[Math.min(n,k.length-1)],a=Math.max(...E.map(t=>t.value)),s=["#4EC9B0","#81B4EA","#CE9178"];return e.jsxs(R,{children:[e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:r.desc}),e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"flex-start"},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8,letterSpacing:"0.06em"},children:"ITEMS (sorted by ratio ↓)"}),e.jsx("div",{style:{display:"flex",gap:10,alignItems:"flex-end",height:110},children:E.map((t,i)=>{const o=r.taken.find(u=>u.name===t.name),h=r.cur===i,d=s[i],f=t.value/a*90+10;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3,opacity:o&&o.frac<1?.9:1},children:[e.jsxs("div",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:h?"var(--color-text-warning)":"var(--color-text-tertiary)"},children:["ratio ",t.ratio.toFixed(1)]}),e.jsxs("div",{style:{position:"relative",width:48,height:f,borderRadius:"4px 4px 0 0",background:d,border:`2px solid ${h?"white":"transparent"}`,transition:"all 0.2s",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",paddingTop:3},children:[o&&o.frac<1&&e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:(1-o.frac)*f,background:"rgba(0,0,0,0.45)",borderRadius:"0 0 2px 2px"}}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",fontWeight:700,color:"rgba(0,0,0,0.65)"},children:["v=",t.value]}),e.jsxs("span",{style:{fontSize:8.5,fontFamily:"var(--font-mono)",color:"rgba(0,0,0,0.55)"},children:["w=",t.weight]})]}),e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:o?d:"var(--color-text-tertiary)",fontWeight:o?700:400},children:[t.name,o?o.frac===1?" ✓":` ${(o.frac*100).toFixed(0)}%`:""]})]},i)})})]}),e.jsxs("div",{style:{width:80},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8,letterSpacing:"0.06em",textAlign:"center"},children:"KNAPSACK"}),e.jsx("div",{style:{position:"relative",height:110,border:"1px solid var(--color-border-secondary)",borderRadius:"var(--border-radius-md)",overflow:"hidden",background:"var(--color-background-tertiary)"},children:r.taken.map((t,i)=>{const h=r.taken.slice(0,i).reduce((u,c)=>u+c.weight*c.frac,0)/S*100,d=t.weight*t.frac/S*100,f=s[E.findIndex(u=>u.name===t.name)];return e.jsx("div",{style:{position:"absolute",left:0,right:0,bottom:`${h}%`,height:`${d}%`,background:f,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"},children:e.jsx("span",{style:{fontSize:8.5,fontFamily:"var(--font-mono)",color:"rgba(0,0,0,0.65)",fontWeight:700},children:t.name[0]})},i)})}),e.jsxs("div",{style:{textAlign:"center",fontFamily:"var(--font-mono)",fontSize:10,color:"var(--color-text-secondary)",marginTop:4},children:[S-r.rem,"/",S]})]}),e.jsxs("div",{style:{width:80},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8,letterSpacing:"0.06em",textAlign:"center"},children:"TOTAL VALUE"}),e.jsx("div",{style:{background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"12px 8px",textAlign:"center"},children:e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:"var(--color-text-success)"},children:r.total})})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:14},children:[[["← Prev",()=>l(Math.max(0,n-1)),n===0],["Next →",()=>l(Math.min(k.length-1,n+1)),n===k.length-1]].map(([t,i,o])=>e.jsx("button",{onClick:i,disabled:o,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:o?"not-allowed":"pointer",fontSize:12,opacity:o?.4:1},children:t},t)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[n+1,"/",k.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function D(){const[n,l]=C.useState(0),r=w[Math.min(n,w.length-1)],a=z.length;return e.jsxs(R,{children:[e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:r.desc}),e.jsx("div",{style:{display:"flex",gap:6,justifyContent:"center",marginBottom:16},children:z.map((s,t)=>{const i=t===r.i,o=t===r.farthest&&r.action!=="done",h=t===r.curEnd&&r.action!=="done",d=r.i>=0&&t<r.i,f=r.action==="done"&&t===a-1;let u="var(--color-background-secondary)",c="var(--color-border-secondary)",x="var(--color-text-secondary)";return f?(u="var(--color-background-success)",c="var(--color-border-success)",x="var(--color-text-success)"):i&&r.action==="jump"?(u="var(--color-background-warning)",c="var(--color-border-warning)",x="var(--color-text-warning)"):i?(u="var(--color-background-info)",c="var(--color-border-info)",x="var(--color-text-info)"):d&&(u="var(--color-background-tertiary)",c="var(--color-border-tertiary)",x="var(--color-text-tertiary)"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("span",{style:{fontSize:8.5,fontFamily:"var(--font-mono)",color:h?"var(--color-text-warning)":o?"var(--color-text-success)":"transparent",fontWeight:700,minHeight:12},children:h&&o?"end=far":h?"end":o?"far":""}),e.jsx("div",{style:{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:7,border:`1px solid ${c}`,background:u,fontFamily:"var(--font-mono)",fontSize:15,fontWeight:700,color:x,transition:"all 0.18s"},children:s}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",t,"]"]})]},t)})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14},children:[{l:"Jumps taken",v:r.jumps,c:"success"},{l:"Boundary (curEnd)",v:r.curEnd,c:"warning"},{l:"Farthest reach",v:r.farthest,c:"info"}].map(({l:s,v:t,c:i})=>e.jsxs("div",{style:{background:`var(--color-background-${i})`,border:`0.5px solid var(--color-border-${i})`,borderRadius:"var(--border-radius-md)",padding:"7px 10px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:`var(--color-text-${i})`,marginBottom:2},children:s}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:17,fontWeight:700,color:`var(--color-text-${i})`},children:t})]},s))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,n-1)),n===0],["Next →",()=>l(Math.min(w.length-1,n+1)),n===w.length-1]].map(([s,t,i])=>e.jsx("button",{onClick:t,disabled:i,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:i?"not-allowed":"pointer",fontSize:12,opacity:i?.4:1},children:s},s)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[n+1,"/",w.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const N={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function j({num:n,title:l,difficulty:r,tags:a=[],statement:s,constraints:t=[],examples:i=[],approach:o,code:h}){const[d,f]=C.useState(!1),u=N[r]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",n]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:l})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[a.map(c=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:c},c)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${u})`,color:`var(--color-text-${u})`,border:`1px solid var(--color-border-${u})`},children:r})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:s}}),t.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:t.map((c,x)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:c},x))})]}),i.length>0&&e.jsx("div",{style:{marginBottom:14},children:i.map((c,x)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",x+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:c.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:c.output})]}),c.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:c.note})]},x))}),e.jsxs("button",{onClick:()=>f(!d),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:d?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${d?"eye-off":"bulb"}`}),d?"Hide Solution":"Show Approach & Solution"]}),d&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),o]}),e.jsx(g,{children:h})]})]})]})}function H(){return e.jsxs("div",{children:[e.jsxs(y,{color:"info",icon:"ti-bolt",children:[e.jsx("strong",{children:"Greedy algorithms"})," build a solution piece by piece — always choosing the locally optimal option at each step, never reconsidering past choices. When the problem has the right structure, local optimality leads to global optimality. No DP table, no backtracking."]}),e.jsx(m,{children:"Two Required Properties"}),e.jsxs(_,{cols:2,children:[e.jsx(T,{title:"Greedy Choice Property",color:"success",children:"A globally optimal solution can be reached by making locally optimal (greedy) choices. The choice made doesn't depend on future sub-problem solutions — you commit without looking ahead."}),e.jsx(T,{title:"Optimal Substructure",color:"info",children:"An optimal solution to the whole problem contains optimal solutions to its sub-problems. (Shared with DP — but greedy also needs the greedy choice property, which DP does not require.)"})]}),e.jsx(m,{children:"Proving Correctness — The Exchange Argument"}),e.jsxs(p,{children:["The standard proof technique: assume the optimal solution differs from the greedy solution at some point. Show that ",e.jsx("em",{children:"swapping"})," the optimal's choice with the greedy choice produces a solution that is at least as good. By induction, the greedy solution is optimal."]}),e.jsxs(y,{color:"success",icon:"ti-math",children:[e.jsx("strong",{children:"Exchange argument template:"})," Let OPT be any optimal solution and GREEDY be our greedy solution. Find the first position where they differ. Swap OPT's choice with GREEDY's choice. Show the new solution is at least as good as OPT. Therefore OPT and GREEDY are equally optimal."]}),e.jsx(m,{children:"Greedy vs Dynamic Programming"}),e.jsx($,{heads:["Criterion","Greedy","Dynamic Programming"],rows:[["Decision","Irrevocable — commit immediately","Optimal sub-problem solutions reused"],["Sub-problem dependency","None — choice doesn't depend on sub-problems","Yes — combine sub-problem results"],["Complexity","Usually O(n log n) or O(n)","Usually O(n²) or O(n × states)"],["Correctness guarantee","Requires exchange argument proof","Correctness by induction on sub-problem size"],["Classic examples","Activity selection, Dijkstra, Prim's","0/1 Knapsack, LCS, Floyd-Warshall"],["When greedy fails","0/1 Knapsack — must take whole items","Fractional Knapsack — greedy IS optimal"]]}),e.jsx(m,{children:"Recognizing Greedy Problems"}),e.jsx(p,{children:"Ask three questions: (1) Can I make a locally best choice and never regret it? (2) Does taking the locally best item/interval/option not block better options later? (3) Does sorting the input expose a natural greedy order? If all three say yes, greedy likely works."}),e.jsx(b,{q:"Why does greedy fail for 0/1 Knapsack but succeed for Fractional Knapsack?",a:"In 0/1 Knapsack, each item must be taken entirely or not at all. Taking the highest-ratio item might leave capacity that fits poorly with remaining items. Example: cap=10, items [(v=60,w=10),(v=100,w=6),(v=120,w=7)]. Greedy by ratio takes item 1 only (ratio=6), value=60. Optimal: items 2+3 (ratio 16.7,17.1), value=220. Fractional Knapsack avoids this because you can always take the exact remaining fraction — no 'wasted' capacity."}),e.jsx(b,{q:"What is the key insight that makes Activity Selection greedy-correct?",a:"The exchange argument: suppose OPT chooses activity X first and GREEDY chooses activity Y (with Y finishing first). Swap X for Y in OPT. Since Y finishes ≤ X finishes, everything compatible with X afterward is also compatible with Y — the swap doesn't reduce the count. Repeating this argument transforms OPT into GREEDY without losing activities, proving GREEDY is optimal."})]})}function K(){return e.jsxs("div",{children:[e.jsx(m,{children:"Activity Selection — Maximum Non-Overlapping Intervals"}),e.jsxs(p,{children:["Select the maximum number of non-overlapping activities from a set. Greedy strategy: ",e.jsx("strong",{children:"always pick the activity with the earliest finish time"})," that doesn't conflict with the last selected. Sorting by finish time is the key pre-processing step."]}),e.jsx(M,{}),e.jsx(g,{children:{cpp:`// Activity Selection — O(n log n)
int activitySelection(vector<pair<int,int>>& acts) {
    // Sort by finish time
    sort(acts.begin(), acts.end(), [](auto& a, auto& b){ return a.second < b.second; });
    int count = 1, lastEnd = acts[0].second;
    for (int i = 1; i < acts.size(); i++) {
        if (acts[i].first >= lastEnd) {    // no conflict: start >= lastEnd
            count++;
            lastEnd = acts[i].second;
        }
    }
    return count;
}`,python:`def activity_selection(acts):
    acts.sort(key=lambda x: x[1])   # sort by finish time
    count, last_end = 1, acts[0][1]
    for s, e in acts[1:]:
        if s >= last_end:
            count += 1; last_end = e
    return count`}}),e.jsxs(y,{color:"success",icon:"ti-bulb",children:[e.jsx("strong",{children:"Why finish time and not start time?"})," Sorting by start time is incorrect. Counter-example: [(1,100),(2,3),(4,5)]. Start-time sort picks (1,100) first, blocking everything. Finish-time sort picks (2,3) then (4,5) = 2 activities. The key intuition: earliest-finishing activity leaves the most room for future activities."]}),e.jsx(m,{children:"Job Scheduling to Maximize Profit (with Deadlines)"}),e.jsx(p,{children:"Given jobs with (profit, deadline) pairs, schedule at most one job per unit time slot (1..max_deadline) to maximize profit. Greedy: sort by profit descending, greedily assign each job to the latest available slot before its deadline."}),e.jsx(g,{children:{cpp:`int jobScheduling(vector<pair<int,int>>& jobs) {  // {profit, deadline}
    sort(jobs.begin(), jobs.end(), [](auto& a, auto& b){ return a.first > b.first; });
    int maxD = 0;
    for (auto& j : jobs) maxD = max(maxD, j.second);
    vector<bool> slot(maxD + 1, false);
    int profit = 0;
    for (auto& [p, d] : jobs) {
        // Find latest available slot <= deadline
        for (int t = min(d, maxD); t >= 1; t--) {
            if (!slot[t]) { slot[t] = true; profit += p; break; }
        }
    }
    return profit;
}
// [(100,2),(27,1),(15,2),(10,1),(20,3)] → profit = 100+20+15 = 135`,python:`def job_scheduling(jobs):  # [(profit, deadline)]
    jobs.sort(reverse=True)   # sort by profit desc
    max_d = max(d for _, d in jobs)
    slot = [False] * (max_d + 1)
    profit = 0
    for p, d in jobs:
        for t in range(min(d, max_d), 0, -1):
            if not slot[t]: slot[t] = True; profit += p; break
    return profit`}}),e.jsx(m,{children:"Meeting Rooms — Minimum Rooms Required"}),e.jsx(p,{children:"Find peak concurrent meetings: sort start and end times separately, use two pointers to sweep through events. When a meeting starts before any ends → need another room."}),e.jsx(g,{children:{cpp:`int minMeetingRooms(vector<pair<int,int>>& meetings) {
    vector<int> starts, ends;
    for (auto [s, e] : meetings) { starts.push_back(s); ends.push_back(e); }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());
    int rooms = 0, maxRooms = 0, j = 0;
    for (int s : starts) {
        if (s < ends[j]) rooms++;          // meeting starts before any ends: new room
        else             { j++; }          // reuse a freed room
        maxRooms = max(maxRooms, rooms);
    }
    return maxRooms;
}`,python:`def min_meeting_rooms(meetings):
    starts = sorted(s for s, e in meetings)
    ends   = sorted(e for s, e in meetings)
    rooms = max_rooms = j = 0
    for s in starts:
        if s < ends[j]: rooms += 1
        else: j += 1
        max_rooms = max(max_rooms, rooms)
    return max_rooms`}}),e.jsx(b,{q:"Why is the Activity Selection greedy algorithm optimal — is there a more formal proof?",a:"By the exchange argument: let G = [g₁, g₂, ...] be the greedy solution and O = [o₁, o₂, ...] be any optimal solution, both sorted by finish time. We show |G| ≥ |O| by induction. Claim: after picking k activities, the greedy solution's k-th activity ends no later than the optimal's k-th activity. Base: g₁ ends ≤ o₁ ends (greedy picks earliest-finishing). Inductive step: if g_k ends ≤ o_k ends, then g_{k+1} starts from a point ≤ when o_{k+1} could start, and greedy picks the earliest-finishing from that point — so g_{k+1} ends ≤ o_{k+1} ends. Therefore |G| ≥ |O|."})]})}function Y(){return e.jsxs("div",{children:[e.jsx(m,{children:"Fractional Knapsack — Value / Weight Ratio"}),e.jsx(p,{children:"Items can be taken in any fraction. Greedy: sort by value/weight ratio, take items in order — full item if capacity permits, else take the exact remaining fraction. Correctness: any other order would leave capacity holding lower-ratio items when higher-ratio items were available."}),e.jsx(q,{}),e.jsx(g,{children:{cpp:`double fractionalKnapsack(vector<pair<int,int>>& items, int W) {
    // items = {value, weight}
    sort(items.begin(), items.end(), [](auto& a, auto& b){
        return (double)a.first/a.second > (double)b.first/b.second;
    });
    double totalValue = 0;
    for (auto [v, w] : items) {
        if (W <= 0) break;
        if (w <= W) { totalValue += v; W -= w; }
        else        { totalValue += v * ((double)W / w); W = 0; }
    }
    return totalValue;
}
// [(60,10),(100,20),(120,30)], W=50 → 240.0`,python:`def fractional_knapsack(items, W):
    items.sort(key=lambda x: x[0]/x[1], reverse=True)  # sort by ratio desc
    total = 0
    for v, w in items:
        if W <= 0: break
        if w <= W: total += v; W -= w
        else:      total += v * (W/w); W = 0
    return total`}}),e.jsx(m,{children:"Collecting Apples — Minimum Distance on a Number Line"}),e.jsx(p,{children:"You start at position 0. Apples are at various positions (some negative, some positive). Find the minimum total distance to collect all apples and return to 0 — or stop at either end."}),e.jsxs(y,{color:"success",icon:"ti-math",children:[e.jsx("strong",{children:"Greedy insight:"})," Let L = |leftmost apple position| and R = rightmost apple position. You must go both left and right. The only choice is ",e.jsx("em",{children:"which direction to go first"}),". Going left first: cost = 2L + R. Going right first: cost = L + 2R. Take the minimum: ",e.jsx(I,{children:"ans = min(2L + R,\\ L + 2R)"}),"."]}),e.jsx(g,{children:{cpp:`int collectApples(vector<int>& positions) {
    int L = 0, R = 0;
    for (int p : positions) {
        if (p < 0) L = max(L, -p);    // leftmost extent
        else       R = max(R, p);      // rightmost extent
    }
    // Go left first then right, or right first then left
    return min(2 * L + R, L + 2 * R);
}
// positions = [-3,-1,2,4,5]: L=3, R=5
// min(2*3+5, 3+2*5) = min(11, 13) = 11`,python:`def collect_apples(positions):
    L = max((-p for p in positions if p < 0), default=0)
    R = max((p  for p in positions if p > 0), default=0)
    return min(2*L + R, L + 2*R)`}}),e.jsx(m,{children:"Huffman Coding — Minimum Prefix Code"}),e.jsx(p,{children:"Given character frequencies, build a prefix-free binary tree minimizing total encoding length. Greedy: always merge the two least-frequent nodes. A min-heap makes each merge O(log n), total O(n log n)."}),e.jsx(g,{children:{cpp:`#include <queue>
int huffmanCost(vector<int>& freq) {
    priority_queue<int, vector<int>, greater<int>> minH(freq.begin(), freq.end());
    int totalCost = 0;
    while (minH.size() > 1) {
        int a = minH.top(); minH.pop();
        int b = minH.top(); minH.pop();
        int merged = a + b;            // cost to transmit this merged node = a + b
        totalCost += merged;
        minH.push(merged);             // push merged node back
    }
    return totalCost;
}
// freq=[5,9,12,13,16,45] → cost=224 (optimal Huffman tree)`,python:`import heapq

def huffman_cost(freq):
    h = freq[:]
    heapq.heapify(h)
    total = 0
    while len(h) > 1:
        a, b = heapq.heappop(h), heapq.heappop(h)
        merged = a + b
        total += merged
        heapq.heappush(h, merged)
    return total`}}),e.jsx(m,{children:"Path Tiling — Minimum Tiles to Cover All Marked Cells"}),e.jsx(p,{children:'Given a binary array where 1 = "dirty cell", cover all dirty cells with tiles of width ≤ W. Greedy: scan left to right; when you find a dirty cell, place the largest tile (rightmost endpoint) starting here — then skip to the next uncovered position.'}),e.jsx(g,{children:{cpp:`int minTiles(vector<int>& arr, int W) {
    int n = arr.size(), i = 0, tiles = 0;
    while (i < n) {
        if (arr[i] == 1) {
            tiles++;
            i += W;        // place a tile of width W starting at i — skip W cells
        } else {
            i++;           // clean cell — no tile needed
        }
    }
    return tiles;
}
// [1,0,0,1,1,0,1], W=2 → tile at 0 (covers 0-1), tile at 3 (covers 3-4), tile at 6 (covers 6-7) → 3 tiles`,python:`def min_tiles(arr, W):
    n, i, tiles = len(arr), 0, 0
    while i < n:
        if arr[i] == 1: tiles += 1; i += W  # place tile, skip W cells
        else: i += 1                          # clean cell, advance
    return tiles`}}),e.jsx(b,{q:"Why does the Collecting Apples formula work — isn't it greedy on which direction to start?",a:"Yes — but here the greedy choice is binary (go left first or right first) and we can directly compute both options. The formula min(2L+R, L+2R) covers all possible routes: the factor of 2 accounts for the round trip in the first direction. Any other strategy (e.g., zigzagging) would be strictly worse because it combines the total left travel + total right travel, always totaling at least the minimum of the two formulas."}),e.jsx(b,{q:"In Huffman Coding, why does always merging the two smallest frequencies produce the optimal code?",a:"By the exchange argument: in any optimal tree, the two least frequent characters must be siblings at the maximum depth (they contribute least to the total cost if they are deepest). If they were not at the maximum depth, swapping them with the deepest pair would produce a lower or equal total cost. This is the basis for the greedy merge step."})]})}function J(){return e.jsxs("div",{children:[e.jsx(m,{children:"Jump Game I — Can You Reach the End?"}),e.jsxs(p,{children:["At each index i, you can jump up to arr[i] steps forward. Determine if index n-1 is reachable from index 0. Greedy: track the ",e.jsx("strong",{children:"maximum reachable index"})," as you scan. If at any point i > maxReach, you're stuck."]}),e.jsx(g,{children:{cpp:`bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;          // stranded — can't reach here
        maxReach = max(maxReach, i + nums[i]);   // extend reach
    }
    return true;
}
// [2,3,1,1,4] → true  |  [3,2,1,0,4] → false (stuck at index 3)`,python:`def can_jump(nums):
    max_reach = 0
    for i, v in enumerate(nums):
        if i > max_reach: return False
        max_reach = max(max_reach, i + v)
    return True`}}),e.jsx(m,{children:"Jump Game II — Minimum Jumps (Interactive)"}),e.jsxs(p,{children:["Find the minimum number of jumps to reach the end. Greedy: maintain current jump's boundary (",e.jsx("code",{children:"curEnd"}),") and the farthest index reachable from within the current jump (",e.jsx("code",{children:"farthest"}),"). When the scan reaches ",e.jsx("code",{children:"curEnd"}),", we must jump — the next boundary is ",e.jsx("code",{children:"farthest"}),"."]}),e.jsx(D,{}),e.jsx(g,{children:{cpp:`int jump(vector<int>& nums) {
    int n = nums.size(), jumps = 0, curEnd = 0, farthest = 0;
    for (int i = 0; i < n - 1; i++) {
        farthest = max(farthest, i + nums[i]);  // extend reach from this position
        if (i == curEnd) {                       // reached current jump boundary
            jumps++;                             // must take one more jump
            curEnd = farthest;                   // next boundary = farthest reached so far
        }
    }
    return jumps;
}
// [2,3,1,1,4] → 2  |  [2,3,0,1,4] → 2`,python:`def jump(nums):
    n, jumps, cur_end, farthest = len(nums), 0, 0, 0
    for i in range(n - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end: jumps += 1; cur_end = farthest
    return jumps`}}),e.jsxs(y,{color:"success",icon:"ti-bulb",children:[e.jsx("strong",{children:"Why not check i == farthest as the condition?"})," We check ",e.jsx("code",{children:"i == curEnd"})," — the ",e.jsx("em",{children:"current"})," jump's boundary, not the maximum reachable. We take a jump exactly when forced (we've consumed all positions in the current jump). The farthest variable tracks the best possible next boundary across all positions within the current jump."]}),e.jsx(m,{children:"Gas Station — Can You Complete the Circuit?"}),e.jsxs(p,{children:["N gas stations in a circle. You start with 0 gas. At station i, gain ",e.jsx("code",{children:"gas[i]"}),", spend ",e.jsx("code",{children:"cost[i]"})," to reach the next. Find the starting station to complete the circuit, or -1 if impossible."]}),e.jsxs(y,{color:"info",icon:"ti-math",children:[e.jsx("strong",{children:"Key theorem:"})," If total(gas) ≥ total(cost), a valid starting station always exists. Greedy: scan from left, tracking running surplus. When surplus goes negative, reset — the starting station must be after here (any start before the deficit point would also fail at this point)."]}),e.jsx(g,{children:{cpp:`int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total = 0, tank = 0, start = 0;
    for (int i = 0; i < gas.size(); i++) {
        int net = gas[i] - cost[i];
        total += net;
        tank  += net;
        if (tank < 0) {       // cannot reach i+1 from 'start'
            start = i + 1;    // try starting from next station
            tank  = 0;        // reset tank
        }
    }
    return total >= 0 ? start : -1;
}
// gas=[1,2,3,4,5], cost=[3,4,5,1,2] → start at station 3`,python:`def can_complete_circuit(gas, cost):
    total = tank = start = 0
    for i, (g, c) in enumerate(zip(gas, cost)):
        net = g - c; total += net; tank += net
        if tank < 0: start = i + 1; tank = 0
    return start if total >= 0 else -1`}}),e.jsx(b,{q:"In Jump Game II, why is the greedy approach optimal — couldn't taking a smaller jump sometimes help?",a:"The greedy extends to the maximum possible reachable index at each jump. Taking a shorter jump is never beneficial: from any position within the current jump's range, you can reach at most as far as farthest. Taking a smaller jump doesn't expand the set of reachable positions — it only delays reaching them. The greedy always maximizes the range covered per jump, which minimizes the number of jumps needed."}),e.jsx(b,{q:"In the Gas Station problem, why is it safe to set start = i+1 whenever the tank goes negative?",a:"If the tank goes negative at station i when starting from 'start', then any station between start and i is also invalid as a starting point — because the partial trip from that station to i would also run out of gas (it would have an even smaller surplus since it missed the earlier positive contributions). So we can safely skip all starts up to i, and try i+1 next."})]})}function V(){return e.jsxs("div",{children:[e.jsx(y,{color:"purple",icon:"ti-tournament",children:"6 greedy problems spanning intervals, sequences, and optimization — all high-frequency in FAANG interviews and IIT OAs."}),e.jsx(j,{num:1,title:"N Meetings in One Room",difficulty:"OA Easy",tags:["Activity Selection","Sort by End"],statement:"Given N meetings with start and finish times, find the <strong>maximum number of meetings</strong> that can be held in a single room (no two meetings can overlap).",constraints:["1 ≤ N ≤ 10⁵","1 ≤ start[i] &lt; finish[i] ≤ 10⁵"],examples:[{input:"start=[1,3,0,5,8,5], finish=[2,4,6,7,9,9]",output:"4",note:"Meetings 1,2,4,5 (1-indexed)"}],approach:"Sort meetings by finish time. Greedily select each meeting if it starts after the last selected meeting ended. The exchange argument proves this gives the maximum count.",code:{cpp:`int maxMeetings(vector<int>& s, vector<int>& f, int n) {
    vector<pair<int,int>> meets;
    for(int i=0;i<n;i++) meets.push_back({f[i],s[i]});
    sort(meets.begin(),meets.end());
    int cnt=1, lastEnd=meets[0].first;
    for(int i=1;i<n;i++)
        if(meets[i].second>lastEnd){cnt++;lastEnd=meets[i].first;}
    return cnt;
}`,python:`def max_meetings(s, f):
    meets = sorted(zip(f, s))
    cnt, last = 1, meets[0][0]
    for end, start in meets[1:]:
        if start > last: cnt += 1; last = end
    return cnt`}}),e.jsx(j,{num:2,title:"Fractional Knapsack",difficulty:"OA Medium",tags:["Value/Weight Ratio","Sorting"],statement:"Given N items with weights and values, and a knapsack of capacity W, maximize the total value. Items can be taken in fractions.",constraints:["1 ≤ N ≤ 10⁵","1 ≤ W ≤ 10⁹","1 ≤ weight[i], value[i] ≤ 10⁹"],examples:[{input:"items=[(v=60,w=10),(v=100,w=20),(v=120,w=30)], W=50",output:"240.0",note:"Take Apple+Banana fully, Cherry 20/30"}],approach:"Sort items by value/weight ratio descending. Take each item fully until capacity runs out. Take the last item fractionally to fill remaining capacity. Total O(n log n). Exchange argument: any other ordering would leave higher-ratio items partially unused while lower-ratio items fill capacity — strictly suboptimal.",code:{cpp:`double fracKnapsack(vector<pair<int,int>>& items, int W) {
    sort(items.begin(),items.end(),[](auto&a,auto&b){return(double)a.first/a.second>(double)b.first/b.second;});
    double total=0;
    for(auto[v,w]:items){
        if(W<=0)break;
        if(w<=W){total+=v;W-=w;}
        else{total+=v*(double)W/w;W=0;}
    }
    return total;
}`,python:`def frac_knapsack(items, W):
    items.sort(key=lambda x: x[0]/x[1], reverse=True)
    total = 0
    for v, w in items:
        if W <= 0: break
        if w <= W: total += v; W -= w
        else: total += v*W/w; W = 0
    return total`}}),e.jsx(j,{num:3,title:"Jump Game II",difficulty:"LC Medium",tags:["LC 45","Greedy"],statement:"Given array <code>nums</code> where <code>nums[i]</code> is the max jump from index <code>i</code>, return the <strong>minimum number of jumps</strong> to reach the last index. It's always possible to reach the end.",constraints:["1 ≤ n ≤ 10⁴","0 ≤ nums[i] ≤ 1000"],examples:[{input:"[2,3,1,1,4]",output:"2",note:"Jump 2→3→end"},{input:"[2,3,0,1,4]",output:"2"}],approach:"Track farthest reachable index and current jump boundary (curEnd). When i reaches curEnd → must take a jump, set curEnd = farthest. Count jumps. This greedy works because each 'jump' always extends to the maximum possible reachable index.",code:{cpp:`int jump(vector<int>& nums) {
    int n=nums.size(),jumps=0,curEnd=0,farthest=0;
    for(int i=0;i<n-1;i++){
        farthest=max(farthest,i+nums[i]);
        if(i==curEnd){jumps++;curEnd=farthest;}
    }
    return jumps;
}`,python:`def jump(nums):
    n,jumps,cur_end,farthest=len(nums),0,0,0
    for i in range(n-1):
        farthest=max(farthest,i+nums[i])
        if i==cur_end:jumps+=1;cur_end=farthest
    return jumps`}}),e.jsx(j,{num:4,title:"Gas Station",difficulty:"LC Hard",tags:["LC 134","Circular Greedy"],statement:"N gas stations in a circle. At station i, gain <code>gas[i]</code>, spend <code>cost[i]</code> to reach the next station. Find the starting station to complete the full circuit, or return <code>-1</code>.",constraints:["1 ≤ N ≤ 10⁵","0 ≤ gas[i], cost[i] ≤ 10⁴"],examples:[{input:"gas=[1,2,3,4,5], cost=[3,4,5,1,2]",output:"3",note:"Start at station 3"},{input:"gas=[2,3,4], cost=[3,4,3]",output:"-1"}],approach:"O(n) greedy: track running tank surplus and total surplus. When tank < 0 → reset start to i+1, tank = 0. Key theorem: if total(gas) ≥ total(cost), the last surviving start is always valid. The greedy correctly finds it by eliminating impossible starting points.",code:{cpp:`int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total=0,tank=0,start=0;
    for(int i=0;i<gas.size();i++){
        int net=gas[i]-cost[i]; total+=net; tank+=net;
        if(tank<0){start=i+1;tank=0;}
    }
    return total>=0?start:-1;
}`,python:`def can_complete_circuit(gas, cost):
    total=tank=start=0
    for i,(g,c) in enumerate(zip(gas,cost)):
        net=g-c;total+=net;tank+=net
        if tank<0:start=i+1;tank=0
    return start if total>=0 else -1`}}),e.jsx(j,{num:5,title:"Assign Cookies",difficulty:"OA Easy",tags:["LC 455","Two Pointer Greedy"],statement:"Give cookies to children. Each child <code>i</code> has greed factor <code>g[i]</code> (minimum cookie size). Each cookie has size <code>s[j]</code>. Assign at most one cookie per child to maximize the number of <strong>content children</strong> (cookie size ≥ greed factor).",constraints:["1 ≤ g.length, s.length ≤ 3×10⁴","1 ≤ g[i], s[j] ≤ 2^31 − 1"],examples:[{input:"g=[1,2,3], s=[1,1]",output:"1"},{input:"g=[1,2], s=[1,2,3]",output:"2"}],approach:"Sort both arrays. Use two pointers: try to assign the smallest sufficient cookie to the least greedy child. If the current cookie satisfies the current child, assign it and advance both pointers; else only advance the cookie pointer. Greedy correctness: using the smallest sufficient cookie never wastes a cookie that could satisfy a greedier child.",code:{cpp:`int findContentChildren(vector<int>& g, vector<int>& s) {
    sort(g.begin(),g.end()); sort(s.begin(),s.end());
    int ci=0,si=0;
    while(ci<g.size()&&si<s.size()){
        if(s[si]>=g[ci])ci++;   // cookie satisfies child
        si++;                   // always advance cookie pointer
    }
    return ci;
}`,python:`def find_content_children(g, s):
    g.sort(); s.sort(); ci = si = 0
    while ci < len(g) and si < len(s):
        if s[si] >= g[ci]: ci += 1
        si += 1
    return ci`}}),e.jsx(j,{num:6,title:"Candy Distribution",difficulty:"LC Hard",tags:["LC 135","Two-Pass Greedy"],statement:"N children in a line, each with a rating. Give each child at least one candy such that children with a <strong>higher rating than an adjacent neighbor get more candy</strong>. Return the minimum total candies.",constraints:["1 ≤ n ≤ 2×10⁴","0 ≤ ratings[i] ≤ 2×10⁴"],examples:[{input:"[1,0,2]",output:"5",note:"Distribute [2,1,2]"},{input:"[1,2,2]",output:"4",note:"Distribute [1,2,1]"}],approach:"Two-pass greedy: (1) Forward pass — give each child 1 more candy than the left neighbor if ratings[i] > ratings[i-1]. (2) Backward pass — if ratings[i] > ratings[i+1], ensure child i has more than child i+1 (take max of current and right+1). Sum up. Each pass independently handles one direction of the constraint.",code:{cpp:`int candy(vector<int>& r) {
    int n=r.size();
    vector<int> c(n,1);
    // Forward: satisfy left neighbor constraint
    for(int i=1;i<n;i++) if(r[i]>r[i-1]) c[i]=c[i-1]+1;
    // Backward: satisfy right neighbor constraint
    for(int i=n-2;i>=0;i--) if(r[i]>r[i+1]) c[i]=max(c[i],c[i+1]+1);
    return accumulate(c.begin(),c.end(),0);
}`,python:`def candy(ratings):
    n = len(ratings); c = [1]*n
    for i in range(1, n):
        if ratings[i] > ratings[i-1]: c[i] = c[i-1]+1
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]: c[i] = max(c[i], c[i+1]+1)
    return sum(c)`}})]})}const U=[{id:"foundations",label:"Greedy Foundations"},{id:"intervals",label:"Interval Scheduling"},{id:"classic",label:"Classic Greedy"},{id:"jumpgames",label:"Jump Games & Gas Station"},{id:"problems",label:"Problems"}];function Z(){const[n,l]=C.useState("foundations"),r={foundations:e.jsx(H,{}),intervals:e.jsx(K,{}),classic:e.jsx(Y,{}),jumpgames:e.jsx(J,{}),problems:e.jsx(V,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 12"}),e.jsx("h1",{className:"page-header-title",children:"Greedy Techniques"}),e.jsx("p",{className:"page-header-subtitle",children:"Exchange Argument · Activity Selection · Fractional Knapsack · Collecting Apples · Path Tiling · Jump Games · Gas Station"})]}),e.jsx(F,{tabs:U,active:n,onChange:l}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[n]}),e.jsx(G,{moduleId:12})]})}export{Z as default};
