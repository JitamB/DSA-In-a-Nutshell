import{r as N,j as e}from"./index-D9jkHkZY.js";import{S as z,N as I,d as A,H as h,P as v,a as x,Q as b,T as W,V as O}from"./SectionNav-BHzhBu3R.js";function D(o){const a=o.length,r=[],i=o.map((t,l)=>l+1<a?l+1:-1);r.push({arrows:[...i],prev:-1,cur:0,nxt:1,action:"init",desc:`Start: prev = NULL, cur = head (node ${o[0]}). Save next = cur.next before overwriting.`});let s=-1,n=0;for(;n!==-1&&n<a;){const t=n+1<a?n+1:-1,l=[...i];l[n]=s;for(let d=0;d<n;d++)l[d]=d-1;r.push({arrows:l.map((d,c)=>c<=n?c===0?-1:c-1:c+1),prev:n,cur:t!==-1?t:-1,nxt:t!==-1&&t+1<a?t+1:-1,action:t===-1?"done":"step",desc:t===-1?`All arrows reversed! prev = ${o[n]} is the new head. cur = NULL → done.`:`Flip: node ${o[n]}.next = ${s===-1?"NULL":o[s]}. Advance: prev = ${o[n]}, cur = ${o[t]}.`}),s=n,n=t}return r}const S=[1,2,3,4,5],L=D(S);function P(o){const a=o.length,r=[];r.push({slow:0,fast:0,action:"init",done:!1,desc:"Find middle: slow moves 1 step at a time, fast moves 2. When fast reaches end, slow is at middle."});let i=0,s=0;for(;s+1<a&&s+2<a;){i+=1,s+=2;const n=s+1>=a||s+2>=a;if(r.push({slow:i,fast:s,action:n?"done":"step",done:n,desc:n?`fast(${o[s]}) can't move 2 more steps → STOP. Middle = node ${o[i]} (index ${i}).`:`slow → ${o[i]},  fast → ${o[s]}`}),n)break}return r.length===1&&r.push({slow:0,fast:0,action:"done",done:!0,desc:`Single element — middle is index 0 (${o[0]}).`}),r}const T=[1,2,3,4,5],q=P(T),R=[3,1,2,4],H=[1,2,3,2];function U(o,a){const r=[];r.push({slow:0,fast:0,action:"init",desc:"Cycle: 4 (idx 3) → 2 (idx 2). Slow moves 1 step; fast moves 2 steps per iteration."});let i=0,s=0;for(let n=0;n<10;n++){if(i=a[i],s=a[a[s]],i===s){r.push({slow:i,fast:s,action:"meet",desc:`Slow(${o[i]}) = Fast(${o[s]}) → CYCLE DETECTED at node ${o[i]}!`});let t=0,l=i;for(r.push({slow:t,fast:l,action:"phase2",desc:"Phase 2: reset one pointer to head. Move both 1 step at a time until they meet = cycle entry."});t!==l;)t=a[t],l=a[l],r.push({slow:t,fast:l,action:t===l?"entry":"phase2",desc:t===l?`Both meet at node ${o[t]} → this is the CYCLE ENTRY POINT.`:`ptr1 → ${o[t]},  ptr2 → ${o[l]}`});return r}r.push({slow:i,fast:s,action:"step",desc:`slow → ${o[i]} (idx ${i}),   fast → ${o[s]} (idx ${s})`})}return r}const V=U(R,H);function G(o,a){const r=o.length,i=[];i.push({lead:0,trail:-1,gap:0,action:"init",desc:`Nth from end (n=${a}): advance LEAD by n steps, then move both until LEAD reaches null.`});let s=0;for(let t=0;t<a;t++)s++,i.push({lead:s<r?s:r,trail:-1,gap:t+1,action:"advance",desc:`Advance lead ${t+1}/${a}: lead now at index ${s}.`});let n=0;for(;s<r;)s++,n++,i.push({lead:s<r?s:r,trail:n,gap:a,action:s>=r?"done":"step",desc:s>=r?`Lead reached end. TRAIL at index ${n} = node ${o[n]} ← answer (${a}th from end).`:`Both advance: lead=${s<r?o[s]:"END"}, trail=${o[n]}`});return i}const B=[1,2,3,4,5],Y=G(B,2);function K(o,a){const r=[];let i=0,s=0;const n=[];for(r.push({ai:i,bi:s,merged:[],action:"init",desc:`Merge [${o.join("→")}] and [${a.join("→")}]. Compare heads, take smaller, advance that pointer.`});i<o.length&&s<a.length;){const t=o[i]<=a[s];n.push(t?o[i]:a[s]);const l=i,d=s;t?i++:s++,r.push({ai:i,bi:s,merged:[...n],compareA:l,compareB:d,took:t?"A":"B",action:"pick",desc:`A[${l}]=${o[l]} vs B[${d}]=${a[d]}: take ${t?o[l]:a[d]} from ${t?"A":"B"}.`})}for(;i<o.length;)n.push(o[i]),i++;for(;s<a.length;)n.push(a[s]),s++;return r.push({ai:o.length,bi:a.length,merged:[...n],action:"done",desc:`Merged: [${n.join("→")}] ✓`}),r}const M=[1,3,5],$=[2,4,6],k=K(M,$);function C({vals:o,highlights:a={},cycleBack:r=null,showNull:i=!0}){return e.jsx("div",{style:{display:"flex",alignItems:"center",gap:0,flexWrap:"nowrap",overflowX:"auto"},children:o.map((s,n)=>{const t=a[n]||null,l=n===o.length-1;return e.jsxs("div",{style:{display:"flex",alignItems:"center",flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",borderRadius:6,overflow:"hidden",border:`1.5px solid ${t?`var(--color-border-${t})`:"var(--color-border-secondary)"}`,transition:"all 0.2s"},children:[e.jsx("div",{style:{padding:"7px 12px",background:t?`var(--color-background-${t})`:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:t?700:500,color:t?`var(--color-text-${t})`:"var(--color-text-secondary)",minWidth:32,textAlign:"center",transition:"all 0.2s"},children:s}),e.jsx("div",{style:{padding:"7px 8px",background:t?`${t==="success"?"#1A3A2A":t==="info"?"#1A2A3A":t==="warning"?"#3A2A1A":"#2A1A1A"}`:"#0D0F18",borderLeft:`1px solid ${t?`var(--color-border-${t})`:"var(--color-border-tertiary)"}`,fontFamily:"var(--font-mono)",fontSize:11,color:t?`var(--color-text-${t})`:"var(--color-text-tertiary)",opacity:.85},children:"*"})]}),!l&&e.jsxs("svg",{width:"28",height:"20",viewBox:"0 0 28 20",style:{flexShrink:0},children:[e.jsx("line",{x1:"2",y1:"10",x2:"22",y2:"10",stroke:"var(--color-border-secondary)",strokeWidth:"1.5"}),e.jsx("polygon",{points:"22,6 28,10 22,14",fill:"var(--color-border-secondary)"})]}),l&&r!==null&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,marginLeft:2},children:[e.jsxs("svg",{width:"28",height:"20",viewBox:"0 0 28 20",style:{flexShrink:0},children:[e.jsx("line",{x1:"2",y1:"10",x2:"18",y2:"10",stroke:"var(--color-border-danger)",strokeWidth:"1.5",strokeDasharray:"3,2"}),e.jsx("polygon",{points:"18,6 24,10 18,14",fill:"var(--color-border-danger)"})]}),e.jsxs("span",{style:{fontSize:9.5,fontFamily:"var(--font-mono)",color:"var(--color-text-danger)",whiteSpace:"nowrap"},children:["→ idx ",r]})]}),l&&i&&!r&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,marginLeft:2},children:[e.jsxs("svg",{width:"28",height:"20",viewBox:"0 0 28 20",style:{flexShrink:0},children:[e.jsx("line",{x1:"2",y1:"10",x2:"22",y2:"10",stroke:"var(--color-border-tertiary)",strokeWidth:"1.5"}),e.jsx("polygon",{points:"22,6 28,10 22,14",fill:"var(--color-border-tertiary)"})]}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-tertiary)"},children:"NULL"})]})]},n)})})}function F({label:o,color:a}){return e.jsx("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:`var(--color-text-${a})`,fontWeight:700,background:`var(--color-background-${a})`,padding:"1px 6px",borderRadius:10,border:`1px solid var(--color-border-${a})`},children:o})}function Q(){const[o,a]=N.useState(0),r=L[Math.min(o,L.length-1)],i=S.length,s={};r.prev>=0&&r.prev<i&&(s[r.prev]="warning"),r.cur>=0&&r.cur<i&&(s[r.cur]="info"),r.nxt>=0&&r.nxt<i&&(s[r.nxt]="success");const n={};r.prev>=0&&(n[r.prev]=[...n[r.prev]||[],{t:"prev",c:"warning"}]),r.cur>=0&&r.cur<i&&(n[r.cur]=[...n[r.cur]||[],{t:"cur",c:"info"}]),r.nxt>=0&&r.nxt<i&&(n[r.nxt]=[...n[r.nxt]||[],{t:"next",c:"success"}]),{init:null,step:"info",done:"success"}[r.action];const l=r.prev>=0?r.prev:-1;return e.jsxs(O,{children:[e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:r.desc}),e.jsx("div",{style:{display:"flex",gap:0,marginBottom:6},children:S.map((d,c)=>{const y=n[c]||[];return e.jsx("div",{style:{width:74,display:"flex",gap:3,justifyContent:"center",flexWrap:"wrap"},children:y.map(({t:p,c:m})=>e.jsx(F,{label:p,color:m},p))},c)})}),e.jsx("div",{style:{marginBottom:14},children:e.jsx(C,{vals:S,highlights:s})}),l>=0&&e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"REVERSED SO FAR:"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-tertiary)"},children:"NULL"}),S.slice(0,l+1).reverse().map((d,c,f)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:0},children:[e.jsxs("svg",{width:"22",height:"16",viewBox:"0 0 22 16",children:[e.jsx("line",{x1:"0",y1:"8",x2:"16",y2:"8",stroke:"var(--color-border-warning)",strokeWidth:"1.5"}),e.jsx("polygon",{points:"16,4 22,8 16,12",fill:"var(--color-border-warning)"})]}),e.jsx("div",{style:{padding:"4px 10px",borderRadius:5,border:"1.5px solid var(--color-border-warning)",background:"var(--color-background-warning)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--color-text-warning)"},children:d})]},c)),r.action!=="done"&&e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-tertiary)",marginLeft:4},children:"←— reversed"})]})]}),r.action==="done"&&e.jsx("div",{style:{padding:"6px 12px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",fontSize:12.5,fontFamily:"var(--font-mono)",color:"var(--color-text-success)",fontWeight:700,marginBottom:14},children:"✓ Reversed in O(n) time, O(1) space"}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,o-1)),o===0],["Next →",()=>a(Math.min(L.length-1,o+1)),o===L.length-1]].map(([d,c,f])=>e.jsx("button",{onClick:c,disabled:f,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:f?"not-allowed":"pointer",fontSize:12,opacity:f?.4:1},children:d},d)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[o+1," / ",L.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>a(L.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function X(){const[o,a]=N.useState("middle"),[r,i]=N.useState(0),s={middle:{label:"Find Middle",vals:T,steps:q,cycleBack:null,showNull:!0,slowColor:"success",fastColor:"warning"},cycle:{label:"Cycle Detection (Floyd)",vals:R,steps:V,cycleBack:2,showNull:!1,slowColor:"success",fastColor:"warning"},nth:{label:"Nth From End (n=2)",vals:B,steps:Y,cycleBack:null,showNull:!0,slowColor:"info",fastColor:"warning"}},n=s[o],t=n.steps[Math.min(r,n.steps.length-1)],l=u=>{a(u),i(0)},d={},c=o==="nth",f=c?t.trail:t.slow,y=c?t.lead<n.vals.length?t.lead:-1:t.fast;f>=0&&f<n.vals.length&&(d[f]=n.slowColor),y>=0&&y<n.vals.length&&y!==f&&(d[y]=n.fastColor),(t.action==="meet"||t.action==="entry")&&(t.slow>=0&&t.slow<n.vals.length&&(d[t.slow]="purple"),t.fast>=0&&t.fast<n.vals.length&&(d[t.fast]="purple"));const p={},m=(u,g,w)=>{u<0||u>=n.vals.length||(p[u]=[...p[u]||[],{t:g,c:w}])};return o==="nth"?(t.trail>=0&&m(t.trail,"trail","info"),t.lead>=0&&t.lead<n.vals.length&&m(t.lead,"lead","warning")):(m(t.slow,"slow",n.slowColor),t.fast!==t.slow&&m(t.fast,"fast",n.fastColor),t.action==="phase2"&&(m(t.slow,"p1","success"),m(t.fast,"p2","warning"))),e.jsxs(O,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"},children:Object.entries(s).map(([u,g])=>e.jsx("button",{onClick:()=>l(u),style:{padding:"4px 10px",border:"1px solid",borderColor:o===u?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:o===u?"var(--color-background-info)":"transparent",color:o===u?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:g.label},u))}),e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:t.desc}),e.jsxs("div",{style:{display:"flex",gap:0,marginBottom:5},children:[n.vals.map((u,g)=>{const w=p[g]||[];return e.jsx("div",{style:{width:74,display:"flex",gap:3,justifyContent:"center"},children:w.map(({t:_,c:E})=>e.jsx(F,{label:_,color:E},_))},g)}),o==="nth"&&t.lead>=n.vals.length&&e.jsx("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-warning)",fontWeight:700,alignSelf:"center",marginLeft:4},children:"←lead (END)"})]}),e.jsx("div",{style:{marginBottom:14},children:e.jsx(C,{vals:n.vals,highlights:d,cycleBack:n.cycleBack,showNull:n.showNull})}),(t.action==="done"||t.action==="meet"||t.action==="entry")&&e.jsxs("div",{style:{padding:"6px 12px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",fontSize:12.5,fontFamily:"var(--font-mono)",color:"var(--color-text-success)",fontWeight:700,marginBottom:14},children:[o==="middle"&&`✓ Middle = node ${n.vals[t.slow]} (index ${t.slow})`,o==="cycle"&&t.action==="entry"&&`✓ Cycle entry = node ${n.vals[t.slow]}`,o==="cycle"&&t.action==="meet"&&`✓ Cycle detected at node ${n.vals[t.slow]}`,o==="nth"&&`✓ 2nd from end = node ${n.vals[t.trail]} (index ${t.trail})`]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>i(Math.max(0,r-1)),r===0],["Next →",()=>i(Math.min(n.steps.length-1,r+1)),r===n.steps.length-1]].map(([u,g,w])=>e.jsx("button",{onClick:g,disabled:w,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:w?"not-allowed":"pointer",fontSize:12,opacity:w?.4:1},children:u},u)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[r+1," / ",n.steps.length]}),e.jsx("button",{onClick:()=>i(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function J(){const[o,a]=N.useState(0),r=k[Math.min(o,k.length-1)],i={},s={};if(r.compareA!==void 0&&(i[r.compareA]=r.took==="A"?"success":"info"),r.compareB!==void 0&&(s[r.compareB]=r.took==="B"?"success":"info"),r.ai!==void 0)for(let n=0;n<r.ai;n++)i[n]="secondary";if(r.bi!==void 0)for(let n=0;n<r.bi;n++)s[n]="secondary";return e.jsxs(O,{children:[e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:r.desc}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-info)",marginBottom:4,letterSpacing:"0.06em"},children:"LIST A"}),e.jsx(C,{vals:M,highlights:i})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-warning)",marginBottom:4,letterSpacing:"0.06em"},children:"LIST B"}),e.jsx(C,{vals:$,highlights:s})]}),r.merged.length>0&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-success)",marginBottom:4,letterSpacing:"0.06em"},children:"MERGED"}),e.jsx(C,{vals:r.merged,highlights:r.merged.reduce((n,t,l)=>(n[l]=l===r.merged.length-1?"success":"secondary",n),{}),showNull:r.action==="done"})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,o-1)),o===0],["Next →",()=>a(Math.min(k.length-1,o+1)),o===k.length-1]].map(([n,t,l])=>e.jsx("button",{onClick:t,disabled:l,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:l?"not-allowed":"pointer",fontSize:12,opacity:l?.4:1},children:n},n)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[o+1," / ",k.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const Z={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function j({num:o,title:a,difficulty:r,tags:i=[],statement:s,constraints:n=[],examples:t=[],approach:l,code:d}){const[c,f]=N.useState(!1),y=Z[r]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",o]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:a})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[i.map(p=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:p},p)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${y})`,color:`var(--color-text-${y})`,border:`1px solid var(--color-border-${y})`},children:r})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:s}}),n.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:n.map((p,m)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:p},m))})]}),t.length>0&&e.jsx("div",{style:{marginBottom:14},children:t.map((p,m)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",m+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:p.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:p.output})]}),p.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:p.note})]},m))}),e.jsxs("button",{onClick:()=>f(!c),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:c?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${c?"eye-off":"bulb"}`}),c?"Hide Solution":"Show Approach & Solution"]}),c&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),l]}),e.jsx(x,{children:d})]})]})]})}function ee(){return e.jsxs("div",{children:[e.jsxs(A,{color:"info",icon:"ti-link",children:["A linked list stores elements in nodes scattered across heap memory. Each node holds a ",e.jsx("strong",{children:"value"})," and a ",e.jsx("strong",{children:"pointer"})," to the next node. Unlike arrays, there is no random access — you must traverse from the head."]}),e.jsx(h,{children:"Why Linked Lists Exist — The Core Trade-off"}),e.jsx(W,{heads:["Operation","Array","Linked List","Notes"],rows:[["Access by index","O(1)","O(n)","Arrays win: direct offset arithmetic"],["Insert at head","O(n)","O(1)","Arrays must shift everything right"],["Insert at tail","O(1)*","O(n) or O(1)**","*amortized; **O(1) with tail pointer"],["Insert at pos i","O(n)","O(n) traverse + O(1) link","Both linear — LL avoids shifting"],["Delete at head","O(n)","O(1)","Array shifts; LL just moves head pointer"],["Delete at pos i","O(n)","O(n) traverse + O(1) unlink","LL wins on actual delete operation"],["Search","O(n)","O(n)","Equal: both need linear scan"],["Memory","Contiguous","Scattered + pointer overhead","Arrays: better cache locality"]]}),e.jsx(h,{children:"Node Definition — Singly, Doubly, Circular"}),e.jsx(x,{children:{cpp:`// Singly Linked List Node
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Doubly Linked List Node
struct DListNode {
    int val;
    DListNode* prev;
    DListNode* next;
    DListNode(int x) : val(x), prev(nullptr), next(nullptr) {}
};

// Circular: last node's next points back to head (not nullptr)
// Detected by: curr->next == head  (not curr->next == nullptr)

// Memory layout (singly, [1→2→3]):
// Node@0x100: { val=1, next=0x200 }
// Node@0x200: { val=2, next=0x300 }
// Node@0x300: { val=3, next=nullptr }
// Head pointer = 0x100`,python:`class ListNode:
    def __init__(self, val=0, next=None):
        self.val  = val
        self.next = next

# Create [1→2→3]:
head = ListNode(1, ListNode(2, ListNode(3)))

# Traverse:
cur = head
while cur:
    print(cur.val, end=' ')
    cur = cur.next          # O(n) total

# Build from list:
def build(vals):
    if not vals: return None
    head = ListNode(vals[0])
    cur  = head
    for v in vals[1:]:
        cur.next = ListNode(v); cur = cur.next
    return head`}}),e.jsx(h,{children:"The Dummy Head Trick"}),e.jsxs(v,{children:['A dummy (sentinel) head node simplifies insertion and deletion at the true head by eliminating the "is it the first node?" special case. You always work with the node ',e.jsx("em",{children:"before"})," the target. After all operations, return ",e.jsx("code",{children:"dummy.next"}),"."]}),e.jsx(x,{children:{cpp:`// Without dummy head — messy special case for head insertion
ListNode* insertBefore(ListNode* head, ListNode* prev, int val) {
    if (prev == nullptr) {  // inserting at head
        ListNode* node = new ListNode(val);
        node->next = head; return node;
    }
    // insert after prev...
}

// With dummy head — uniform logic, no special cases
ListNode dummy(0);
dummy.next = head;
ListNode* prev = &dummy;
// ... traverse ... insert after prev ...
return dummy.next;  // new head`,python:`# Dummy head pattern — eliminates head special case
dummy = ListNode(0)
dummy.next = head
prev = dummy
# ... manipulate via prev.next ...
return dummy.next`}}),e.jsx(b,{q:"Why do linked lists have poor cache performance compared to arrays?",a:"Modern CPUs fetch memory in cache lines (~64 bytes). Array elements sit contiguously — accessing arr[i+1] after arr[i] is often already in cache. Linked list nodes are allocated separately on the heap at arbitrary addresses. Accessing node.next requires a pointer dereference to a potentially different cache line — a cache miss. For sequential traversal on modern hardware, arrays can be 3–10× faster than linked lists due to prefetching and cache locality, even though the algorithmic complexity is identical O(n)."}),e.jsx(b,{q:"When would you actually prefer a linked list over an array in real-world code?",a:"(1) Deque/queue with frequent head insertions/deletions where no random access is needed. (2) LRU Cache — constant-time node move to front requires O(1) delete + O(1) insert (doubly linked list + hash map). (3) Undo systems — each operation is a node; undo = pop head. (4) When the list size is unknown and memory reallocation (copying entire array) is expensive. (5) Implementing stacks or queues at the algorithmic level. In practice, std::deque or circular buffers often win over linked lists even for queue operations."})]})}function te(){return e.jsxs("div",{children:[e.jsx(h,{children:"Insertion — Head, Tail, Middle"}),e.jsx(x,{children:{cpp:`ListNode* insertAtHead(ListNode* head, int val) {
    ListNode* node = new ListNode(val);
    node->next = head;   // point new node to old head
    return node;          // new head
}

ListNode* insertAtTail(ListNode* head, int val) {
    ListNode* node = new ListNode(val);
    if (!head) return node;
    ListNode* cur = head;
    while (cur->next) cur = cur->next;  // O(n) traverse to tail
    cur->next = node;
    return head;
}

// Insert after a specific node — O(1) given the node
void insertAfter(ListNode* prev, int val) {
    ListNode* node = new ListNode(val);
    node->next  = prev->next;   // 1. new node points to prev's successor
    prev->next  = node;          // 2. prev now points to new node
    // ORDER MATTERS: step 1 before step 2 — else we lose the rest of the list
}`,python:`def insert_at_head(head, val):
    node = ListNode(val)
    node.next = head
    return node

def insert_at_tail(head, val):
    node = ListNode(val)
    if not head: return node
    cur = head
    while cur.next: cur = cur.next
    cur.next = node; return head

def insert_after(prev, val):
    node = ListNode(val)
    node.next = prev.next  # 1. link forward FIRST
    prev.next = node        # 2. then update prev`}}),e.jsx(h,{children:"Deletion — Head, Tail, By Value"}),e.jsx(x,{children:{cpp:`ListNode* deleteHead(ListNode* head) {
    if (!head) return nullptr;
    ListNode* tmp = head;
    head = head->next;
    delete tmp;          // free memory (C++ only)
    return head;
}

// Delete first node with value = target — O(n)
ListNode* deleteVal(ListNode* head, int target) {
    ListNode dummy(0); dummy.next = head;
    ListNode* prev = &dummy;
    while (prev->next) {
        if (prev->next->val == target) {
            ListNode* tmp = prev->next;
            prev->next = tmp->next;   // bypass the target node
            delete tmp;
            break;
        }
        prev = prev->next;
    }
    return dummy.next;
}`,python:`def delete_val(head, target):
    dummy = ListNode(0); dummy.next = head
    prev = dummy
    while prev.next:
        if prev.next.val == target:
            prev.next = prev.next.next   # bypass
            break
        prev = prev.next
    return dummy.next`}}),e.jsx(h,{children:"Reversal — The Three-Pointer Technique (Interactive)"}),e.jsxs(v,{children:["The most-asked linked list operation. Three pointers: ",e.jsx("code",{children:"prev"})," (the reversed chain's current tail), ",e.jsx("code",{children:"cur"})," (node being processed), ",e.jsx("code",{children:"nxt"})," (saved before overwriting). At each step: save nxt, flip cur's pointer to prev, advance prev and cur."]}),e.jsx(Q,{}),e.jsx(x,{children:{cpp:`ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr, *cur = head;
    while (cur) {
        ListNode* nxt = cur->next;  // 1. save next BEFORE overwriting
        cur->next     = prev;       // 2. flip pointer
        prev          = cur;        // 3. advance prev
        cur           = nxt;        // 4. advance cur
    }
    return prev;  // prev is now the new head
}
// [1→2→3→4→5] → [5→4→3→2→1→null]   O(n) time, O(1) space`,python:`def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next    # save before overwrite
        cur.next = prev   # flip
        prev = cur        # advance
        cur  = nxt
    return prev           # prev = new head

# Recursive version (O(n) stack space):
def reverse_rec(head):
    if not head or not head.next: return head
    new_head = reverse_rec(head.next)
    head.next.next = head   # head.next points back to head
    head.next = None        # head is now the new tail
    return new_head`}}),e.jsxs(A,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"The order matters:"})," Always save ",e.jsx("code",{children:"nxt = cur.next"})," before writing ",e.jsx("code",{children:"cur.next = prev"}),". If you reverse the order, you lose the reference to the rest of the list — it becomes unreachable and leaked."]}),e.jsx(h,{children:"Reverse in K-Groups (LC 25)"}),e.jsx(v,{children:"Reverse every K nodes as a group. The elegant approach: reverse a group using the three-pointer technique, reconnect to the next group, recurse. Check if K nodes remain before reversing."}),e.jsx(x,{children:{cpp:`ListNode* reverseKGroup(ListNode* head, int k) {
    // Check if k nodes remain
    ListNode* check = head;
    for (int i = 0; i < k; i++) {
        if (!check) return head;   // < k nodes left — leave as-is
        check = check->next;
    }
    // Reverse k nodes starting from head
    ListNode* prev = nullptr, *cur = head;
    for (int i = 0; i < k; i++) {
        ListNode* nxt = cur->next; cur->next = prev; prev = cur; cur = nxt;
    }
    // head is now the tail of the reversed group
    head->next = reverseKGroup(cur, k);  // recurse on remaining
    return prev;  // prev is the new head of this group
}
// [1→2→3→4→5], k=2 → [2→1→4→3→5]`,python:`def reverse_k_group(head, k):
    cur = head
    for _ in range(k):
        if not cur: return head  # < k nodes left
        cur = cur.next
    prev = None; cur = head
    for _ in range(k):
        nxt = cur.next; cur.next = prev; prev = cur; cur = nxt
    head.next = reverse_k_group(cur, k)
    return prev`}}),e.jsx(b,{q:"What is the time and space complexity of recursive reversal?",a:"Time O(n) — every node is visited exactly once. Space O(n) — each recursive call adds a frame to the call stack, and the recursion depth equals the list length. This contrasts with the iterative three-pointer reversal which uses O(1) extra space. For very long lists (millions of nodes), recursive reversal risks stack overflow — use iterative."})]})}function re(){return e.jsxs("div",{children:[e.jsxs(A,{color:"success",icon:"ti-bolt",children:["The ",e.jsx("strong",{children:"slow/fast pointer"})," (Floyd's tortoise and hare) is the most versatile linked list technique. A pointer moving at 2× speed relative to another unlocks: cycle detection, middle finding, Nth from end, and palindrome checking — all in O(n) time, O(1) space."]}),e.jsx(h,{children:"Three Classic Problems — Unified by Slow/Fast"}),e.jsx(X,{}),e.jsx(h,{children:"Find Middle of Linked List (LC 876)"}),e.jsx(x,{children:{cpp:`ListNode* findMiddle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;           // 1 step
        fast = fast->next->next;     // 2 steps
    }
    return slow;  // for even length, returns SECOND middle
}
// [1→2→3→4→5] → node(3)  |  [1→2→3→4] → node(3) — second middle`,python:`def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`}}),e.jsx(h,{children:"Cycle Detection — Floyd's Algorithm (LC 141, 142)"}),e.jsxs(v,{children:[e.jsx("strong",{children:"Phase 1"}),": Detect cycle (slow and fast meet). ",e.jsx("strong",{children:"Phase 2"}),": Find cycle start (reset one pointer to head, move both at speed 1 until they meet)."]}),e.jsx(x,{children:{cpp:`// Phase 1: detect cycle
bool hasCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;  // met inside the cycle
    }
    return false;
}

// Phase 2: find cycle start (LC 142)
ListNode* detectCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if (slow == fast) {
            slow = head;              // reset one to head
            while (slow != fast) {   // both move 1 step
                slow = slow->next; fast = fast->next;
            }
            return slow;  // cycle start
        }
    }
    return nullptr;
}`,python:`def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
        if slow is fast: return True
    return False

def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
        if slow is fast:
            slow = head
            while slow is not fast:
                slow = slow.next; fast = fast.next
            return slow   # cycle entry
    return None`}}),e.jsxs(A,{color:"info",icon:"ti-math",children:[e.jsx("strong",{children:"Why Phase 2 works:"})," When slow and fast first meet, let the cycle length be C and the distance from head to cycle start be L. It can be shown that the meeting point is exactly C - (L % C) steps from the cycle start. After resetting one pointer to head and moving both at speed 1, they travel L more steps and meet precisely at the cycle entry."]}),e.jsx(h,{children:"Remove Nth Node From End (LC 19)"}),e.jsxs(v,{children:["Advance the lead pointer by N steps, then move both pointers together. When lead reaches NULL, the trail pointer is at the node just ",e.jsx("em",{children:"before"})," the target — ready for deletion."]}),e.jsx(x,{children:{cpp:`ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0); dummy.next = head;
    ListNode* lead = &dummy, *trail = &dummy;

    for (int i = 0; i <= n; i++) lead = lead->next;  // advance lead n+1 steps

    while (lead) { lead = lead->next; trail = trail->next; }

    trail->next = trail->next->next;  // delete the nth-from-end node
    return dummy.next;
}
// [1→2→3→4→5], n=2 → remove 4 → [1→2→3→5]`,python:`def remove_nth_from_end(head, n):
    dummy = ListNode(0); dummy.next = head
    lead = trail = dummy
    for _ in range(n + 1): lead = lead.next  # n+1 steps ahead
    while lead:
        lead = lead.next; trail = trail.next
    trail.next = trail.next.next   # remove
    return dummy.next`}}),e.jsx(h,{children:"Linked List Palindrome Check"}),e.jsx(v,{children:"Three steps: (1) Find middle with slow/fast. (2) Reverse the second half in-place. (3) Compare both halves. Optionally restore the list. O(n) time, O(1) space."}),e.jsx(x,{children:{cpp:`bool isPalindrome(ListNode* head) {
    // 1. Find middle
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }

    // 2. Reverse second half (slow is now at middle/right-middle)
    ListNode* prev = nullptr, *cur = slow;
    while (cur) { ListNode* nxt = cur->next; cur->next = prev; prev = cur; cur = nxt; }

    // 3. Compare
    ListNode* left = head, *right = prev;
    while (right) {
        if (left->val != right->val) return false;
        left = left->next; right = right->next;
    }
    return true;
}
// [1→2→2→1] → true  |  [1→2→3→2→1] → true  |  [1→2] → false`,python:`def is_palindrome(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
    # Reverse from slow
    prev = None; cur = slow
    while cur: nxt=cur.next; cur.next=prev; prev=cur; cur=nxt
    # Compare
    left, right = head, prev
    while right:
        if left.val != right.val: return False
        left = left.next; right = right.next
    return True`}}),e.jsx(b,{q:"Why does advancing the lead pointer by n+1 steps (instead of n) in Remove Nth From End work?",a:"We want to stop the trail pointer <em>before</em> the node to delete — so we can do <code>trail.next = trail.next.next</code>. If we advance by n, trail stops AT the node to delete. By starting both at a dummy node and advancing lead by n+1, trail stops at the predecessor of the target. The dummy head also handles the edge case of deleting the original head node uniformly."}),e.jsx(b,{q:"Why does Floyd's algorithm guarantee O(n) and not run forever?",a:"Once fast enters the cycle, it gains 1 step on slow per iteration (fast moves 2, slow moves 1 — net gain of 1 within the cycle). Since the cycle has finite length C, after at most C iterations, fast laps slow and they meet. The meeting happens within the cycle, never taking more than O(L + C) = O(n) steps total, where L is the path to the cycle and C is the cycle length."})]})}function ne(){return e.jsxs("div",{children:[e.jsx(h,{children:"Merging Two Sorted Lists (LC 21)"}),e.jsx(v,{children:"Use a dummy head and a tail pointer. At each step compare the heads of both lists, attach the smaller one to tail, advance that list's pointer. Append the remaining non-empty list at the end."}),e.jsx(J,{}),e.jsx(x,{children:{cpp:`ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0); ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }
        else                    { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;   // attach remainder
    return dummy.next;
}`,python:`def merge_two_lists(l1, l2):
    dummy = tail = ListNode(0)
    while l1 and l2:
        if l1.val <= l2.val: tail.next = l1; l1 = l1.next
        else:                 tail.next = l2; l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next`}}),e.jsx(h,{children:"Sort a Linked List — Merge Sort (LC 148)"}),e.jsxs(v,{children:["Merge sort is the natural choice for linked lists: the ",e.jsx("em",{children:"split"})," uses the slow/fast middle-finding technique, and the ",e.jsx("em",{children:"merge"})," is O(n) without extra space (just relinking pointers). No random-access needed. O(n log n) time, O(log n) stack space."]}),e.jsx(x,{children:{cpp:`ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;  // base case

    // Find middle and split
    ListNode* slow = head, *fast = head->next;  // fast starts at next: avoids infinite loop
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    ListNode* mid  = slow->next;
    slow->next     = nullptr;   // cut the list in two

    ListNode* left  = sortList(head);
    ListNode* right = sortList(mid);
    return mergeTwoLists(left, right);
}
// T(n) = 2T(n/2) + O(n) → O(n log n) — Master Theorem Case 2`,python:`def sort_list(head):
    if not head or not head.next: return head
    slow, fast = head, head.next          # fast at head.next avoids equal split
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
    mid = slow.next; slow.next = None     # split
    return merge_two_lists(sort_list(head), sort_list(mid))`}}),e.jsx(h,{children:"Add Two Numbers (LC 2)"}),e.jsx(v,{children:"Each list represents a number in reverse order (least significant digit first). Traverse both simultaneously, sum digits with carry. Create a new node per digit. If one list is longer, continue with remaining nodes + carry."}),e.jsx(x,{children:{cpp:`ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0); ListNode* cur = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum  = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry    = sum / 10;
        cur->next = new ListNode(sum % 10);
        cur       = cur->next;
    }
    return dummy.next;
}
// l1=[2→4→3] (342), l2=[5→6→4] (465) → [7→0→8] (807)`,python:`def add_two_numbers(l1, l2):
    dummy = cur = ListNode(0)
    carry = 0
    while l1 or l2 or carry:
        s = carry
        if l1: s += l1.val; l1 = l1.next
        if l2: s += l2.val; l2 = l2.next
        carry, digit = divmod(s, 10)
        cur.next = ListNode(digit); cur = cur.next
    return dummy.next`}}),e.jsx(h,{children:"LRU Cache — Doubly Linked List + HashMap (LC 146)"}),e.jsx(v,{children:"Least Recently Used cache: get and put both in O(1). The doubly linked list maintains recency order (most recent at head, least recent at tail). The HashMap provides O(1) key-to-node lookup. On access/update: move node to head. On eviction: remove the tail."}),e.jsx(x,{children:{cpp:`class LRUCache {
    int capacity;
    list<pair<int,int>> dll;           // {key, val} — most recent at front
    unordered_map<int, list<pair<int,int>>::iterator> mp;  // key → iterator

public:
    LRUCache(int cap) : capacity(cap) {}

    int get(int key) {
        if (!mp.count(key)) return -1;
        dll.splice(dll.begin(), dll, mp[key]);  // move to front — O(1)
        return mp[key]->second;
    }

    void put(int key, int value) {
        if (mp.count(key)) {
            mp[key]->second = value;
            dll.splice(dll.begin(), dll, mp[key]);  // update & move to front
            return;
        }
        if (dll.size() == capacity) {
            mp.erase(dll.back().first);  // evict LRU (tail)
            dll.pop_back();
        }
        dll.emplace_front(key, value);
        mp[key] = dll.begin();
    }
};`,python:`from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()  # maintains insertion order + O(1) move_to_end

    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)  # mark as most recent
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)  # evict LRU (front)`}}),e.jsx(h,{children:"Intersection of Two Linked Lists (LC 160)"}),e.jsx(v,{children:"Two lists that converge at a common node. The elegant two-pointer trick: after pointer A reaches the end of list A, redirect it to the head of list B. Do the same for B. They will meet at the intersection after traveling equal total distances."}),e.jsx(x,{children:{cpp:`ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    ListNode* a = headA, *b = headB;
    while (a != b) {
        a = a ? a->next : headB;  // when a reaches end, jump to headB
        b = b ? b->next : headA;  // when b reaches end, jump to headA
    }
    return a;  // either intersection node or nullptr (no intersection)
}
// After lenA + lenB steps, both pointers have traveled the same distance
// and must meet at the intersection (or both reach nullptr if no intersection)`,python:`def get_intersection_node(headA, headB):
    a, b = headA, headB
    while a is not b:
        a = a.next if a else headB
        b = b.next if b else headA
    return a`}}),e.jsx(b,{q:"Why does the two-pointer intersection trick work? Is it just magic?",a:"Let lenA = length of list A before intersection, lenB = length of list B before intersection, and C = length of common tail. Pointer A travels: lenA + C + lenB. Pointer B travels: lenB + C + lenA. Both travel the same total distance — so they meet at the intersection after exactly lenA + lenB + C steps. If there's no intersection, both pointers reach nullptr simultaneously (traveling lenA + lenB steps each)."}),e.jsx(b,{q:"Why is doubly linked list required for LRU Cache and not singly linked list?",a:"When we evict or move a node, we need O(1) access to its predecessor to update the predecessor's next pointer. With a singly linked list, removing an arbitrary node requires O(n) traversal to find the predecessor. A doubly linked list's prev pointer makes predecessor access O(1) — enabling O(1) delete and O(1) move-to-front, which are the core LRU operations."})]})}function oe(){return e.jsxs("div",{children:[e.jsx(A,{color:"purple",icon:"ti-tournament",children:"6 high-frequency linked list problems — every major interview pattern is covered. Slow/fast, in-place reversal, merge, cycle — all in O(1) space."}),e.jsx(j,{num:1,title:"Reverse Linked List",difficulty:"OA Easy",tags:["LC 206","In-place"],statement:"Given the head of a singly linked list, reverse the list and return the reversed list's head. Solve iteratively (O(1) space).",constraints:["0 ≤ n ≤ 5000","−5000 ≤ val ≤ 5000"],examples:[{input:"1→2→3→4→5",output:"5→4→3→2→1"},{input:"1→2",output:"2→1"},{input:"[]",output:"[]"}],approach:"Three-pointer iterative: prev=null, cur=head. At each step: save nxt=cur.next, flip cur.next=prev, advance prev=cur, cur=nxt. When cur is null, prev is the new head. O(n) time, O(1) space.",code:{cpp:`ListNode* reverseList(ListNode* head) {
    ListNode* prev=nullptr, *cur=head;
    while(cur){
        ListNode* nxt=cur->next;
        cur->next=prev; prev=cur; cur=nxt;
    }
    return prev;
}`,python:`def reverse_list(head):
    prev, cur = None, head
    while cur:
        nxt=cur.next; cur.next=prev; prev=cur; cur=nxt
    return prev`}}),e.jsx(j,{num:2,title:"Linked List Cycle II",difficulty:"LC Medium",tags:["LC 142","Floyd's Algorithm"],statement:"Given a linked list, return the node where the cycle begins. If there is no cycle, return <code>null</code>.",constraints:["-10⁴ ≤ val ≤ 10⁴","0 ≤ pos (cycle index)","O(1) space"],examples:[{input:"3→1→2→4, pos=2 (4→2)",output:"node 2",note:"Cycle starts at second node from head with val=2"},{input:"1→2, pos=-1",output:"null"}],approach:"Phase 1 (Floyd): slow and fast pointers meet inside cycle. Phase 2: reset one pointer to head, advance both at speed 1. They meet at the cycle entry. Mathematical proof: let L=dist to entry, C=cycle length. Meeting point is C-(L%C) from entry. Resetting and moving L more steps reaches entry from both directions simultaneously.",code:{cpp:`ListNode* detectCycle(ListNode* head) {
    ListNode* s=head, *f=head;
    while(f&&f->next){
        s=s->next; f=f->next->next;
        if(s==f){
            s=head;
            while(s!=f){s=s->next;f=f->next;}
            return s;
        }
    }
    return nullptr;
}`,python:`def detect_cycle(head):
    s=f=head
    while f and f.next:
        s=s.next;f=f.next.next
        if s is f:
            s=head
            while s is not f:s=s.next;f=f.next
            return s
    return None`}}),e.jsx(j,{num:3,title:"Merge Two Sorted Lists",difficulty:"OA Easy",tags:["LC 21","Dummy Head"],statement:"Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",constraints:["0 ≤ n, m ≤ 50","−100 ≤ val ≤ 100","Both lists sorted ascending"],examples:[{input:"1→2→4  and  1→3→4",output:"1→1→2→3→4→4"},{input:"[] and []",output:"[]"}],approach:"Dummy head + tail pointer. At each step compare current heads, attach the smaller to tail, advance that list. After either list is exhausted, append the remaining list to tail. O(n+m) time, O(1) space (in-place relinking).",code:{cpp:`ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode d(0); ListNode* t=&d;
    while(l1&&l2){
        if(l1->val<=l2->val){t->next=l1;l1=l1->next;}
        else{t->next=l2;l2=l2->next;}
        t=t->next;
    }
    t->next=l1?l1:l2; return d.next;
}`,python:`def merge_two_lists(l1,l2):
    dummy=tail=ListNode(0)
    while l1 and l2:
        if l1.val<=l2.val:tail.next=l1;l1=l1.next
        else:tail.next=l2;l2=l2.next
        tail=tail.next
    tail.next=l1 or l2
    return dummy.next`}}),e.jsx(j,{num:4,title:"Remove Nth Node From End of List",difficulty:"LC Medium",tags:["LC 19","Slow/Fast"],statement:"Given the head of a linked list, remove the <strong>nth node from the end</strong> of the list and return its head. Solve in one pass.",constraints:["1 ≤ n ≤ sz ≤ 30","0 ≤ val ≤ 100"],examples:[{input:"1→2→3→4→5, n=2",output:"1→2→3→5"},{input:"[1], n=1",output:"[]"},{input:"1→2, n=1",output:"[1]"}],approach:"Dummy head + two pointers. Advance lead n+1 steps ahead (one extra so trail stops before target). Move both until lead is null. trail.next = trail.next.next removes the target. The n+1 offset handles deletion of the head node uniformly via the dummy.",code:{cpp:`ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode d(0); d.next=head;
    ListNode* lead=&d, *trail=&d;
    for(int i=0;i<=n;i++) lead=lead->next;
    while(lead){lead=lead->next;trail=trail->next;}
    trail->next=trail->next->next;
    return d.next;
}`,python:`def remove_nth_from_end(head,n):
    dummy=ListNode(0);dummy.next=head
    lead=trail=dummy
    for _ in range(n+1):lead=lead.next
    while lead:lead=lead.next;trail=trail.next
    trail.next=trail.next.next
    return dummy.next`}}),e.jsx(j,{num:5,title:"Sort List",difficulty:"LC Medium",tags:["LC 148","Merge Sort on LL"],statement:"Sort a linked list in <strong>O(n log n)</strong> time using constant space complexity.",constraints:["0 ≤ n ≤ 5×10⁴","−10⁵ ≤ val ≤ 10⁵"],examples:[{input:"4→2→1→3",output:"1→2→3→4"},{input:"-1→5→3→4→0",output:"-1→0→3→4→5"}],approach:"Merge sort: find middle using slow/fast (fast starts at head.next to get left-biased split), cut the list, recursively sort both halves, merge. T(n) = 2T(n/2) + O(n) → O(n log n). Stack depth O(log n). Bottom-up merge sort achieves true O(1) extra space but is more complex to implement.",code:{cpp:`ListNode* sortList(ListNode* head) {
    if(!head||!head->next) return head;
    ListNode* slow=head, *fast=head->next;
    while(fast&&fast->next){slow=slow->next;fast=fast->next->next;}
    ListNode* mid=slow->next; slow->next=nullptr;
    return mergeTwoLists(sortList(head),sortList(mid));
}`,python:`def sort_list(head):
    if not head or not head.next: return head
    slow,fast=head,head.next
    while fast and fast.next:slow=slow.next;fast=fast.next.next
    mid=slow.next;slow.next=None
    return merge_two_lists(sort_list(head),sort_list(mid))`}}),e.jsx(j,{num:6,title:"Copy List with Random Pointer",difficulty:"LC Medium",tags:["LC 138","HashMap Clone"],statement:"A linked list where each node has a <code>next</code> and a <code>random</code> pointer (may point to any node or null). Return a <strong>deep copy</strong> of the list.",constraints:["0 ≤ n ≤ 1000","-10⁴ ≤ val ≤ 10⁴","random points to a node in the list or null"],examples:[{input:"[[7,null],[13,0],[11,4],[10,2],[1,0]]",output:"Deep copy of same structure"}],approach:"HashMap approach: two passes. Pass 1 — create a copy of each node, store {original → copy} in a map. Pass 2 — set next and random pointers of each copy using the map. O(n) time, O(n) space. Alternative O(1) space: interleave copy nodes in original list, set randoms, then separate the two lists.",code:{cpp:`Node* copyRandomList(Node* head) {
    unordered_map<Node*, Node*> mp;
    Node* cur=head;
    // Pass 1: create copies
    while(cur){mp[cur]=new Node(cur->val);cur=cur->next;}
    // Pass 2: set pointers
    cur=head;
    while(cur){
        mp[cur]->next  =mp[cur->next];
        mp[cur]->random=mp[cur->random];
        cur=cur->next;
    }
    return mp[head];
}`,python:`def copy_random_list(head):
    if not head: return None
    mp={}
    cur=head
    while cur:mp[cur]=ListNode(cur.val);cur=cur.next
    cur=head
    while cur:
        if cur.next:mp[cur].next=mp[cur.next]
        if cur.random:mp[cur].random=mp[cur.random]
        cur=cur.next
    return mp[head]`}})]})}const se=[{id:"memory",label:"Memory & Structure"},{id:"ops",label:"Core Operations"},{id:"twopointer",label:"Two-Pointer Patterns"},{id:"mergesort",label:"Merge, Sort & LRU"},{id:"problems",label:"Problems"}];function le(){const[o,a]=N.useState("memory"),r={memory:e.jsx(ee,{}),ops:e.jsx(te,{}),twopointer:e.jsx(re,{}),mergesort:e.jsx(ne,{}),problems:e.jsx(oe,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 14"}),e.jsx("h1",{className:"page-header-title",children:"Linked Lists"}),e.jsx("p",{className:"page-header-subtitle",children:"Node Anatomy · Dummy Head · In-Place Reversal · Floyd's Cycle Detection · Merge Sort · LRU Cache · LC 19, 21, 142, 146, 148, 206"})]}),e.jsx(z,{tabs:se,active:o,onChange:a}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[o]}),e.jsx(I,{moduleId:14})]})}export{le as default};
