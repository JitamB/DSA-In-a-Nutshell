import{r as O,j as e}from"./index-D9jkHkZY.js";import{S as q,N as I,d as _,H as k,P as w,a as j,Q as T,T as B,G as W,C as R,c as H,V as D}from"./SectionNav-BHzhBu3R.js";const h=7;function N(o){return o%h}const b=(()=>{const o=[70,50,85,93,76,54,21,14],i=[],r=Array.from({length:h},()=>[]);i.push({table:r.map(n=>[...n]),cur:null,h:null,action:"init",desc:`Empty hash table with m=${h} buckets. Hash function: h(k) = k mod ${h}.`});for(const n of o){const t=N(n),s=r[t].length>0;r[t]=[n,...r[t]],i.push({table:r.map(c=>[...c]),cur:n,h:t,action:s?"chain":"place",desc:s?`h(${n}) = ${n}%${h} = ${t}. Bucket ${t} occupied → prepend ${n} to chain. Chain length = ${r[t].length}.`:`h(${n}) = ${n}%${h} = ${t}. Bucket ${t} empty → place ${n} directly.`})}const l=o.length;return i.push({table:r.map(n=>[...n]),cur:null,h:null,action:"done",desc:`Done! α = n/m = ${l}/${h} ≈ ${(l/h).toFixed(2)}. Expected search time: O(1+α) ≈ O(${(1+l/h).toFixed(2)}).`}),i})(),y=11,L=new Set([3,4,5]),m=25,v=m%y,P=1+m%10;function M(o){const i=[],r=new Set(L);let l=-1;i.push({occ:new Set(r),probe:-1,placed:-1,action:"init",desc:`Insert key=${m} into m=${y} table. h1(${m})=${v}. ${o==="double"?`h2(${m})=${P}.`:""} Pre-occupied: {3,4,5}.`});for(let n=0;n<=6;n++){let t;o==="linear"?t=(v+n)%y:o==="quad"?t=(v+n+n*n)%y:t=(v+n*P)%y;const s=r.has(t),c=o==="linear"?`(${v}+${n})%${y}`:o==="quad"?`(${v}+${n}+${n*n})%${y}`:`(${v}+${n}×${P})%${y}`;if(i.push({occ:new Set(r),probe:t,placed:-1,action:s?"occupied":"found",desc:s?`Probe ${n}: slot ${c} = ${t} → OCCUPIED. Try next.`:`Probe ${n}: slot ${c} = ${t} → EMPTY. Insert ${m} here! (${n+1} probe${n>0?"s":""} total)`}),!s){l=t,r.add(t);break}}return l>=0&&i.push({occ:new Set(r),probe:l,placed:l,action:"done",desc:`${m} successfully placed at slot ${l}.`}),i}const F={linear:M("linear"),quad:M("quad"),double:M("double")},g=[1,1,1,2,-1,2],S=3,C=(()=>{const o=[],i=new Map([[0,1]]);let r=0,l=0;o.push({arr:g,idx:-1,ps:0,map:new Map(i),needle:null,found:!1,count:0,action:"init",desc:`Subarray sum = ${S}. Initialize map = {0:1} (empty prefix sum seen once, enables subarrays starting at index 0). Running prefix sum = 0.`});for(let n=0;n<g.length;n++){r+=g[n];const t=r-S,s=i.get(t)||0;l+=s,o.push({arr:g,idx:n,ps:r,map:new Map(i),needle:t,found:s>0,foundCount:s,count:l,action:s>0?"found":"miss",desc:s>0?`i=${n}: arr[${n}]=${g[n]}, ps=${r}. Needle = ps−k = ${r}−${S} = ${t}. FOUND in map (×${s})! count += ${s} → count=${l}.`:`i=${n}: arr[${n}]=${g[n]}, ps=${r}. Needle = ${r}−${S} = ${t}. Not in map. count stays ${l}.`}),i.set(r,(i.get(r)||0)+1),o.push({arr:g,idx:n,ps:r,map:new Map(i),needle:null,found:!1,foundCount:0,count:l,action:"insert",desc:`Insert ps=${r} into map → map[${r}] = ${i.get(r)}. ${r===S?`(This will help find subarrays ending here that sum to ${S} via later ps=0.)`:""}`})}return o.push({arr:g,idx:g.length,ps:r,map:new Map(i),needle:null,found:!1,foundCount:0,count:l,action:"done",desc:`Done! Total subarrays summing to ${S} = ${l}. Subarrays: [1,1,1], [1,1,2,−1], [1,2], [2,−1,2].`}),o})();function U(){const[o,i]=O.useState(0),r=b[Math.min(o,b.length-1)],n={place:"success",chain:"warning",done:"info",init:null}[r.action];return e.jsxs(D,{children:[e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[n&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${n})`,color:`var(--color-text-${n})`,border:`1px solid var(--color-border-${n})`,whiteSpace:"nowrap"},children:r.action==="place"?"New bucket":r.action==="chain"?"Collision → chain":r.action==="done"?"Done ✓":""}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:r.desc})]}),r.cur!==null&&e.jsxs("div",{style:{marginBottom:12,background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"8px 14px",fontFamily:"var(--font-mono)",fontSize:13},children:[e.jsxs("span",{style:{color:"#9CDCFE"},children:["h(",r.cur,")"]}),e.jsx("span",{style:{color:"#7A8599"},children:" = "}),e.jsx("span",{style:{color:"#CE9178"},children:r.cur}),e.jsx("span",{style:{color:"#7A8599"},children:" % "}),e.jsx("span",{style:{color:"#CE9178"},children:h}),e.jsx("span",{style:{color:"#7A8599"},children:" = "}),e.jsx("span",{style:{color:"#4EC9B0",fontWeight:700},children:r.h})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:5,marginBottom:14},children:r.table.map((t,s)=>{const c=s===r.h&&r.cur!==null;return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsxs("div",{style:{width:56,height:36,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:`1.5px solid ${c?"var(--color-border-warning)":"var(--color-border-secondary)"}`,background:c?"var(--color-background-warning)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:12,fontWeight:c?700:400,color:c?"var(--color-text-warning)":"var(--color-text-secondary)",flexShrink:0},children:["[",s,"]"]}),t.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{width:"20",height:"14",viewBox:"0 0 20 14",style:{flexShrink:0},children:[e.jsx("line",{x1:"2",y1:"7",x2:"16",y2:"7",stroke:"#2A3050",strokeWidth:"1.5"}),e.jsx("polygon",{points:"16,3 20,7 16,11",fill:"#2A3050"})]}),e.jsxs("div",{style:{display:"flex",gap:3,alignItems:"center"},children:[t.map((u,a)=>{const d=a===0&&r.cur===u&&r.action!=="done";return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:3},children:[e.jsx("div",{style:{padding:"5px 10px",borderRadius:5,border:`1.5px solid ${d?"var(--color-border-warning)":c&&a===0?"var(--color-border-success)":"var(--color-border-secondary)"}`,background:d?"var(--color-background-warning)":c&&a===0?"var(--color-background-success)":"var(--color-background-tertiary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:d?"var(--color-text-warning)":c&&a===0?"var(--color-text-success)":"var(--color-text-secondary)"},children:u}),a<t.length-1&&e.jsx("span",{style:{fontSize:14,color:"#3D4460"},children:"→"})]},a)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"#3D4460"},children:"→ null"})]})]}):e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"#3D4460",marginLeft:4},children:"null"})]},s)})}),r.action==="done"&&e.jsxs("div",{style:{padding:"7px 12px",background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:12.5,color:"var(--color-text-info)",marginBottom:12},children:["α = ",b[b.length-2].table.flat().length,"/",h," ≈ ",(b[b.length-2].table.flat().length/h).toFixed(2),"   |   Expected O(1 + α) per lookup"]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>i(Math.max(0,o-1)),o===0],["Next →",()=>i(Math.min(b.length-1,o+1)),o===b.length-1]].map(([t,s,c])=>e.jsx("button",{onClick:s,disabled:c,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:c?"not-allowed":"pointer",fontSize:12,opacity:c?.4:1},children:t},t)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[o+1,"/",b.length]}),e.jsx("button",{onClick:()=>i(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>i(b.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function G(){const[o,i]=O.useState("linear"),[r,l]=O.useState(0),n=F[o],t=n[Math.min(r,n.length-1)],s=a=>{i(a),l(0)},c={linear:"h(k,i) = (h₁(k) + i) mod m",quad:"h(k,i) = (h₁(k) + i + i²) mod m",double:"h(k,i) = (h₁(k) + i·h₂(k)) mod m"},u={linear:`h₁(${m})=${v}, step=1. Simple but causes PRIMARY clustering — consecutive occupied slots grow.`,quad:`h₁(${m})=${v}, step=i². Avoids primary clustering but still has SECONDARY clustering (same h₁ → same probe sequence).`,double:`h₁(${m})=${v}, h₂(${m})=${P}. Each key has a UNIQUE probe sequence → minimal clustering.`};return e.jsxs(D,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},children:[["linear","Linear Probing"],["quad","Quadratic Probing"],["double","Double Hashing"]].map(([a,d])=>e.jsx("button",{onClick:()=>s(a),style:{padding:"4px 11px",border:"1px solid",borderColor:o===a?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:o===a?"var(--color-background-info)":"transparent",color:o===a?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:d},a))}),e.jsx("div",{style:{marginBottom:10,background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"8px 12px",fontFamily:"var(--font-mono)",fontSize:12,color:"#9CDCFE"},children:c[o]}),e.jsxs("div",{style:{marginBottom:12,padding:"5px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.55},children:[e.jsxs("strong",{children:[["linear","quad","double"][["linear","quad","double"].indexOf(o)].charAt(0).toUpperCase()+o.slice(1),":"]})," ",u[o]]}),e.jsx("div",{style:{marginBottom:12,padding:"5px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:["TABLE (m=",y,")  — gray = pre-occupied"]}),e.jsx("div",{style:{display:"flex",gap:3},children:Array.from({length:y},(a,d)=>{const f=L.has(d),p=d===t.probe&&t.action!=="done",x=d===t.placed&&t.action==="done";let A="#131722",E="#1E2233",z="#4A5170";return f&&!x&&(A="#1A1E2E",E="#3D4460",z="#7A8599"),p&&t.action==="occupied"&&(A="var(--color-background-danger)",E="var(--color-border-danger)",z="var(--color-text-danger)"),p&&t.action==="found"&&(A="var(--color-background-success)",E="var(--color-border-success)",z="var(--color-text-success)"),x&&(A="var(--color-background-success)",E="var(--color-border-success)",z="var(--color-text-success)"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx("div",{style:{width:46,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:`1.5px solid ${E}`,background:A,fontFamily:"var(--font-mono)",fontSize:12,fontWeight:p||x?700:400,color:z,transition:"all 0.18s"},children:f&&!x?"×":x?m:p?"?":""}),e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:d})]},d)})})]}),t.action==="done"&&e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12},children:Object.entries({linear:F.linear.length-2,quad:F.quad.length-2,double:F.double.length-2}).map(([a,d])=>e.jsxs("div",{style:{padding:"5px 12px",borderRadius:6,border:`1px solid ${a===o?"var(--color-border-success)":"var(--color-border-secondary)"}`,background:a===o?"var(--color-background-success)":"transparent",fontFamily:"var(--font-mono)",fontSize:12,color:a===o?"var(--color-text-success)":"var(--color-text-secondary)"},children:[a,": ",d," probe",d!==1?"s":""]},a))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,r-1)),r===0],["Next →",()=>l(Math.min(n.length-1,r+1)),r===n.length-1]].map(([a,d,f])=>e.jsx("button",{onClick:d,disabled:f,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:f?"not-allowed":"pointer",fontSize:12,opacity:f?.4:1},children:a},a)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r+1,"/",n.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function K(){const[o,i]=O.useState(0),r=C[Math.min(o,C.length-1)],l=[...r.map.entries()].sort((n,t)=>n[0]-t[0]);return e.jsxs(D,{children:[e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[(r.action==="found"||r.action==="miss")&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${r.found?"success":"secondary"})`,color:`var(--color-text-${r.found?"success":"tertiary"})`,border:`1px solid var(--color-border-${r.found?"success":"tertiary"})`,whiteSpace:"nowrap"},children:r.found?"MATCH FOUND ✓":"No match"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:r.desc})]}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:12},children:g.map((n,t)=>{const s=t===r.idx,c=r.idx>=0&&t<r.idx,u=s?r.action==="found"?"success":r.action==="insert"?"info":"warning":c?"secondary":null;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx("div",{style:{width:44,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:7,border:`1.5px solid ${u?`var(--color-border-${u})`:"var(--color-border-secondary)"}`,background:u?`var(--color-background-${u})`:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:15,fontWeight:u?700:500,color:u?`var(--color-text-${u})`:"var(--color-text-secondary)",transition:"all 0.15s"},children:(n>=0,n)}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",t,"]"]})]},t)})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14},children:[e.jsxs("div",{style:{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-info)",marginBottom:2},children:"Prefix Sum"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:"var(--color-text-info)"},children:r.ps})]}),e.jsxs("div",{style:{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:r.needle!=null?r.found?"var(--color-background-success)":"var(--color-background-secondary)":"var(--color-background-tertiary)",border:`0.5px solid ${r.needle!=null?r.found?"var(--color-border-success)":"var(--color-border-secondary)":"var(--color-border-tertiary)"}`,textAlign:"center",transition:"all 0.2s"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:r.found?"var(--color-text-success)":"var(--color-text-tertiary)",marginBottom:2},children:"ps − k = needle"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:r.needle!=null?r.found?"var(--color-text-success)":"var(--color-text-secondary)":"var(--color-text-tertiary)"},children:r.needle??"—"})]}),e.jsxs("div",{style:{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:r.count>0?"var(--color-background-success)":"var(--color-background-secondary)",border:`0.5px solid ${r.count>0?"var(--color-border-success)":"var(--color-border-secondary)"}`,textAlign:"center",transition:"all 0.2s"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:r.count>0?"var(--color-text-success)":"var(--color-text-tertiary)",marginBottom:2},children:"Subarrays found"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:r.count>0?"var(--color-text-success)":"var(--color-text-secondary)"},children:r.count})]})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:["HASH MAP  ","{","prefix_sum → count","}"]}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:l.map(([n,t])=>{const s=n===r.needle&&r.found;return e.jsxs("div",{style:{padding:"4px 10px",borderRadius:5,border:`1px solid ${s?"var(--color-border-success)":"var(--color-border-secondary)"}`,background:s?"var(--color-background-success)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:12,color:s?"var(--color-text-success)":"var(--color-text-secondary)",fontWeight:s?700:400,transition:"all 0.15s"},children:[n,":",t]},n)})})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>i(Math.max(0,o-1)),o===0],["Next →",()=>i(Math.min(C.length-1,o+1)),o===C.length-1]].map(([n,t,s])=>e.jsx("button",{onClick:t,disabled:s,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:s?"not-allowed":"pointer",fontSize:12,opacity:s?.4:1},children:n},n)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[o+1,"/",C.length]}),e.jsx("button",{onClick:()=>i(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>i(C.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}const Y={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function $({num:o,title:i,difficulty:r,tags:l=[],statement:n,constraints:t=[],examples:s=[],approach:c,code:u}){const[a,d]=O.useState(!1),f=Y[r]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",o]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:i})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[l.map(p=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:p},p)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${f})`,color:`var(--color-text-${f})`,border:`1px solid var(--color-border-${f})`},children:r})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:n}}),t.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:t.map((p,x)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:p},x))})]}),s.length>0&&e.jsx("div",{style:{marginBottom:14},children:s.map((p,x)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",x+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:p.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:p.output})]}),p.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:p.note})]},x))}),e.jsxs("button",{onClick:()=>d(!a),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:a?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${a?"eye-off":"bulb"}`}),a?"Hide Solution":"Show Approach & Solution"]}),a&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),c]}),e.jsx(j,{children:u})]})]})]})}function Q(){return e.jsxs("div",{children:[e.jsxs(_,{color:"info",icon:"ti-database",children:["A hash table maps keys to values in O(1) expected time by transforming a key into an array index via a ",e.jsx("strong",{children:"hash function"}),". The core idea: trade memory for speed. The challenge: two keys may hash to the same index — a ",e.jsx("strong",{children:"collision"})," — which must be resolved gracefully."]}),e.jsx(k,{children:"Direct-Address Tables"}),e.jsx(w,{children:"When the key universe is small (e.g., values 0..999), allocate an array of that size. Direct-address tables are O(1) for all operations with zero collisions — but space is O(|universe|), which is infeasible when the universe is large (e.g., all possible strings, 64-bit integers)."}),e.jsx(j,{children:{cpp:`// Direct-address table: universe = {0..UMAX-1}
int table[UMAX];        // pre-allocated for every possible key
table[key] = value;     // O(1) insert
int v = table[key];     // O(1) search
table[key] = -1;        // O(1) delete (sentinel for "empty")
// Space: O(|U|) — infeasible if U = all 32-bit ints (4GB)`,python:`# Works fine for small universes (e.g., counting character frequencies)
table = [0] * 256          # ASCII character frequencies
for c in s: table[ord(c)] += 1`}}),e.jsx(k,{children:"Hash Functions"}),e.jsx(w,{children:"A good hash function distributes keys uniformly across m buckets, minimizing collisions. Three standard methods:"}),e.jsxs(W,{cols:3,children:[e.jsxs(R,{title:"Division Method",color:"info",children:[e.jsx(H,{children:"h(k) = k \\mod m"}),e.jsx("br",{}),"Choose m = prime, not near a power of 2. Simple, fast."]}),e.jsxs(R,{title:"Multiplication Method",color:"success",children:[e.jsx(H,{children:"h(k) = \\lfloor m \\cdot (kA \\mod 1) \\rfloor"}),e.jsx("br",{}),"A = (√5−1)/2 ≈ 0.618. Works for any m."]}),e.jsx(R,{title:"Universal Hashing",color:"warning",children:"Randomly pick h from a family at table creation. No adversarial input can consistently cause collisions."})]}),e.jsx(j,{children:{cpp:`// Division method: m should be prime, not near 2^k
int divisionHash(int k, int m) { return k % m; }

// Multiplication method (Knuth): A = (sqrt(5)-1)/2 ≈ 0.618
int multHash(int k, int m) {
    double A = 0.6180339887;
    return (int)(m * fmod(k * A, 1.0));
}

// String hash (polynomial rolling hash)
int strHash(const string& s, int m) {
    long long h = 0;
    for (char c : s) h = (h * 31 + c) % m;
    return h;
}`,python:`def division_hash(k, m): return k % m

def mult_hash(k, m):
    A = 0.6180339887
    return int(m * ((k * A) % 1))

def str_hash(s, m):
    h = 0
    for c in s: h = (h * 31 + ord(c)) % m
    return h`}}),e.jsx(k,{children:"Collision Resolution — Chaining (Interactive)"}),e.jsx(w,{children:"Chaining stores collisions as a linked list in each bucket. Load factor α = n/m. Expected search time = O(1 + α). Works well for α ≤ 3. Step through inserting 8 keys into an m=7 table:"}),e.jsx(U,{}),e.jsx(j,{children:{cpp:`// Hash table with chaining — O(1) average, O(n) worst case
class ChainHash {
    vector<list<pair<int,int>>> table;
    int m;
    int h(int k) { return k % m; }
public:
    ChainHash(int m) : table(m), m(m) {}
    void insert(int key, int val) {
        auto& chain = table[h(key)];
        for (auto& [k,v] : chain) if (k==key) { v=val; return; }  // update
        chain.emplace_front(key, val);   // prepend — O(1)
    }
    int* search(int key) {
        for (auto& [k,v] : table[h(key)])
            if (k==key) return &v;
        return nullptr;
    }
};`,python:`class ChainHash:
    def __init__(self, m):
        self.m=m; self.table=[[] for _ in range(m)]
    def h(self, k): return k % self.m
    def insert(self, key, val):
        for pair in self.table[self.h(key)]:
            if pair[0]==key: pair[1]=val; return
        self.table[self.h(key)].insert(0,[key,val])
    def search(self, key):
        for k,v in self.table[self.h(key)]:
            if k==key: return v
        return None`}}),e.jsx(T,{q:"Why should m (table size) be a prime number for the division method?",a:"For h(k)=k%m, if m has small factors, keys sharing those factors cluster into the same buckets. For example, if m=10 and all keys are multiples of 5, only buckets 0 and 5 are ever used — catastrophic distribution. A prime m ensures no key subgroup 'aligns' with the table structure. Also, m should not be near a power of 2, as bit patterns in keys could concentrate into fewer buckets."})]})}function V(){return e.jsxs("div",{children:[e.jsxs(_,{color:"warning",icon:"ti-arrows-exchange",children:[e.jsx("strong",{children:"Open addressing"})," stores all elements directly in the hash table array — no separate chains. On collision, probe a sequence of slots until an empty one is found. Critical: load factor α must stay below 1 (table never full); performance degrades rapidly as α → 1. Keep α < 0.7."]}),e.jsx(k,{children:"Three Probing Strategies — Side-by-Side Comparison"}),e.jsx(w,{children:"Same table state (slots 3, 4, 5 occupied), same key 25 (h₁=3). See how many probes each method needs and where the key ends up:"}),e.jsx(G,{}),e.jsx(k,{children:"All Three Formulas"}),e.jsx(j,{children:{cpp:`// h'(k) = primary hash, i = probe number
// Linear probing — simple, but causes PRIMARY CLUSTERING
int linearProbe(int k, int i, int m) {
    return (hashFn(k) + i) % m;
}

// Quadratic probing — avoids primary, but SECONDARY CLUSTERING
int quadraticProbe(int k, int i, int m) {
    return (hashFn(k) + i + i*i) % m;
    // Note: only half the slots guaranteed reachable unless m is prime
}

// Double hashing — best distribution, NO clustering
int doubleHash(int k, int i, int m) {
    int h1 = k % m;
    int h2 = 1 + (k % (m - 1));  // h2 must never be 0, coprime with m
    return (h1 + i * h2) % m;
}

// Generic search with open addressing:
int search(int table[], int k, int m) {
    for (int i = 0; i < m; i++) {
        int slot = probeFunction(k, i, m);
        if (table[slot] == EMPTY) return -1;    // key not in table
        if (table[slot] == k)     return slot;  // found
        // if DELETED: continue probing (tombstone)
    }
    return -1;
}`,python:`def linear_probe(k, i, m):    return (k%m + i) % m
def quad_probe(k, i, m):      return (k%m + i + i*i) % m
def double_hash(k, i, m):
    h1=k%m; h2=1+(k%(m-1)); return (h1+i*h2)%m`}}),e.jsx(k,{children:"The Tombstone Problem — Deletion in Open Addressing"}),e.jsxs(w,{children:["You cannot simply mark a slot as empty on deletion — that would break the probe chain for keys inserted after a collision. Instead, mark deleted slots with a ",e.jsx("strong",{children:"tombstone"})," sentinel. Insertions can overwrite tombstones; searches skip them."]}),e.jsx(j,{children:{cpp:`// EMPTY=0, DELETED=-1 (tombstone), positive = occupied
enum { EMPTY=0, DELETED=-1 };
void deleteKey(int table[], int k, int m) {
    for (int i = 0; i < m; i++) {
        int slot = probeFunction(k, i, m);
        if (table[slot] == EMPTY) return;      // not found
        if (table[slot] == k) { table[slot] = DELETED; return; }
    }
}
// Without tombstones: a simple deletion breaks all probe chains
// built through the deleted slot → incorrect search results`,python:`EMPTY, DELETED = None, 'DEL'
def delete_key(table, k, m):
    for i in range(m):
        slot=double_hash(k,i,m)
        if table[slot] is EMPTY: return  # not found
        if table[slot]==k: table[slot]=DELETED; return`}}),e.jsx(k,{children:"Comparison"}),e.jsx(B,{heads:["Method","Clustering","Expected probes (α=0.5)","Notes"],rows:[["Chaining","None","O(1+α)=1.5","No max load constraint; pointers overhead"],["Linear Probing","Primary","~1.5 probes","Cache-friendly; bad with high α"],["Quadratic Probing","Secondary","~1.44 probes","Only half slots reachable if m not prime"],["Double Hashing","Minimal","~1.39 probes","Best distribution; requires good h₂"]]}),e.jsx(T,{q:"Why does linear probing cause 'primary clustering' and why is it so harmful?",a:"Primary clustering: once a run of consecutive occupied slots forms, every new key hashing into that run extends it further, creating a self-reinforcing growth effect. Long runs mean more probes for both insertions and lookups. For α=0.9, linear probing averages ~50 probes per unsuccessful search — catastrophically bad. Double hashing has no such effect because each key uses a unique step size determined by h₂."})]})}function X(){return e.jsxs("div",{children:[e.jsxs(_,{color:"success",icon:"ti-plus",children:["The ",e.jsx("strong",{children:"Prefix Sum + Hash Map"}),' pattern solves "subarray with property X" in O(n). Key insight: store prefix sums in a hash map. When you need to know if a subarray [i..j] satisfies a condition, express it as a relationship between two prefix sums and look up the complement in O(1).']}),e.jsx(k,{children:"Subarray Sum = K (LC 560) — Interactive"}),e.jsxs(w,{children:["Count subarrays of [1,1,1,2,−1,2] summing to k=3. For each prefix sum ps, check if (ps−k) was seen before — meaning a subarray ending here sums to k. ",e.jsxs("strong",{children:["The initial ","{0:1}"," handles subarrays starting at index 0."]})]}),e.jsx(K,{}),e.jsx(j,{children:{cpp:`int subarraySum(vector<int>& nums, int k) {
    unordered_map<int,int> count;
    count[0] = 1;          // CRITICAL: empty prefix sum seen once
    int ps = 0, ans = 0;
    for (int x : nums) {
        ps += x;
        ans += count[ps - k];  // subarrays ending here summing to k
        count[ps]++;            // record this prefix sum
    }
    return ans;
}
// Time: O(n)  Space: O(n)
// [1,1,1,2,-1,2], k=3 → 4 subarrays`,python:`def subarray_sum(nums, k):
    count={0:1}; ps=ans=0
    for x in nums:
        ps+=x
        ans+=count.get(ps-k,0)   # check if complement exists
        count[ps]=count.get(ps,0)+1
    return ans`}}),e.jsxs(_,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"Why check count[ps−k] and not count[k−ps]?"})," We want subarrays [i..j] where sum(i..j)=k. This equals ps[j+1]−ps[i]=k, so ps[i]=ps[j+1]−k. We look back for past prefix sums equal to (current_ps − k). The direction matters — the complement we're looking for is always in the past (already in the map)."]}),e.jsx(k,{children:"Longest Consecutive Sequence (LC 128)"}),e.jsx(w,{children:"Put all numbers in a hash set. For each number that has no left neighbor (n-1 not in set), it's the start of a sequence — count how far it extends. O(n) total because each number is visited at most twice."}),e.jsx(j,{children:{cpp:`int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int ans = 0;
    for (int n : s) {
        if (s.count(n - 1)) continue;   // not the start of a sequence
        int len = 0, cur = n;
        while (s.count(cur)) { cur++; len++; }
        ans = max(ans, len);
    }
    return ans;
}
// [100,4,200,1,3,2] → 4 (sequence: 1,2,3,4)`,python:`def longest_consecutive(nums):
    s=set(nums); ans=0
    for n in s:
        if n-1 in s: continue    # not the sequence start
        cur,length=n,0
        while cur in s:cur+=1;length+=1
        ans=max(ans,length)
    return ans`}}),e.jsx(k,{children:"C++ STL Unordered Containers"}),e.jsx(j,{children:{cpp:`#include <unordered_map>
#include <unordered_set>

unordered_map<string,int> freq;
freq["apple"]++;
bool exists = freq.count("apple");    // O(1) average
freq.erase("apple");                   // O(1) average
for (auto& [k,v] : freq) { /* traverse */ }

unordered_set<int> s = {1,2,3,4,5};
s.insert(6);                           // O(1) average
s.erase(3);                            // O(1) average
bool has = s.count(4);                 // O(1)

// Pitfall: worst case O(n) per operation (all keys hash to one bucket)
// Fix: use a custom hasher or reserve expected size:
unordered_map<int,int> m; m.reserve(1024); m.max_load_factor(0.25);`,python:`# Python dict/set are hash tables (open addressing + probing)
d = {}
d['key'] = 1           # O(1) average
'key' in d             # O(1)
del d['key']           # O(1)
d.get('key', 0)        # O(1) with default

s = set()
s.add(1); s.discard(1); 1 in s  # all O(1)

from collections import defaultdict, Counter
freq = Counter("mississippi")    # O(n)
groups = defaultdict(list)       # default value is an empty list`}}),e.jsx(T,{q:"Why is the initial count[0]=1 in the subarray sum algorithm critical? What happens without it?",a:"Without count[0]=1, we miss subarrays that START at index 0. For example, if nums=[3,1] and k=3, the prefix sums are [0,3,4]. When ps=3, we look for count[3-3]=count[0]. Without the initial entry, count[0]=0 and we miss the subarray [3]. The initial {0:1} represents the 'empty prefix' (no elements yet taken) — an imaginary prefix sum of 0 that occurred once before the array started."})]})}function J(){return e.jsxs("div",{children:[e.jsx(_,{color:"purple",icon:"ti-tournament",children:"6 hash table problems — LC 1, 49, 560, 128 (the four prescribed) plus two important complementary patterns."}),e.jsx($,{num:1,title:"Two Sum",difficulty:"OA Easy",tags:["LC 1","Hash Map"],statement:"Given an integer array <code>nums</code> and an integer <code>target</code>, return indices of the two numbers that add up to target. Each input has exactly one solution. Do not use the same element twice.",constraints:["2 ≤ n ≤ 10⁴","-10⁹ ≤ nums[i] ≤ 10⁹","Exactly one solution"],examples:[{input:"nums=[2,7,11,15], target=9",output:"[0,1]",note:"2+7=9"},{input:"nums=[3,2,4], target=6",output:"[1,2]"}],approach:"Single pass hash map: for each nums[i], check if complement = target - nums[i] is already in the map. If yes, return [map[complement], i]. If no, store nums[i] → i. O(n) time, O(n) space. No need for the two-pointer approach (requires sorting which loses original indices).",code:{cpp:`vector<int> twoSum(vector<int>& nums,int target){
    unordered_map<int,int> mp;
    for(int i=0;i<nums.size();i++){
        auto it=mp.find(target-nums[i]);
        if(it!=mp.end()) return{it->second,i};
        mp[nums[i]]=i;
    }
    return{};
}`,python:`def two_sum(nums,target):
    mp={}
    for i,v in enumerate(nums):
        if target-v in mp:return[mp[target-v],i]
        mp[v]=i
    return[]`}}),e.jsx($,{num:2,title:"Group Anagrams",difficulty:"LC Medium",tags:["LC 49","Sorted Key Hashing"],statement:"Given an array of strings, group the anagrams together. Return in any order.",constraints:["1 ≤ strs.length ≤ 10⁴","0 ≤ strs[i].length ≤ 100","strs[i] consists of lowercase letters"],examples:[{input:'strs=["eat","tea","tan","ate","nat","bat"]',output:'[["bat"],["nat","tan"],["ate","eat","tea"]]'}],approach:"Canonical key: sort each string's characters to produce its anagram signature. All anagrams produce the same sorted key. Group strings by this key using a hash map. O(n × L log L) where L = max string length. Alternative O(n × L): use a 26-char frequency tuple as key.",code:{cpp:`vector<vector<string>> groupAnagrams(vector<string>& strs){
    unordered_map<string,vector<string>> mp;
    for(auto& s:strs){string key=s;sort(key.begin(),key.end());mp[key].push_back(s);}
    vector<vector<string>> res;
    for(auto&[k,v]:mp)res.push_back(v);
    return res;
}`,python:`from collections import defaultdict
def group_anagrams(strs):
    mp=defaultdict(list)
    for s in strs:mp[tuple(sorted(s))].append(s)
    return list(mp.values())`}}),e.jsx($,{num:3,title:"Subarray Sum Equals K",difficulty:"LC Medium",tags:["LC 560","Prefix+Hash"],statement:"Given an integer array <code>nums</code> and integer <code>k</code>, return the total number of subarrays whose sum equals <code>k</code>. Subarrays are contiguous. Negative numbers allowed.",constraints:["1 ≤ n ≤ 2×10⁴","-1000 ≤ nums[i] ≤ 1000","-10⁷ ≤ k ≤ 10⁷"],examples:[{input:"nums=[1,1,1], k=2",output:"2"},{input:"nums=[1,2,3], k=3",output:"2",note:"[1,2] and [3]"}],approach:"Prefix sum + hash map. Initialize count[0]=1. For each element, update prefix_sum. Check if (prefix_sum−k) was seen before → those past prefix sums form valid subarray ends. Add count[ps−k] to answer, then increment count[ps]. O(n) time, O(n) space. Sliding window fails with negatives — hash map is required.",code:{cpp:`int subarraySum(vector<int>& nums,int k){
    unordered_map<int,int> cnt; cnt[0]=1;
    int ps=0,ans=0;
    for(int x:nums){ps+=x;ans+=cnt.count(ps-k)?cnt[ps-k]:0;cnt[ps]++;}
    return ans;
}`,python:`def subarray_sum(nums,k):
    cnt={0:1};ps=ans=0
    for x in nums:ps+=x;ans+=cnt.get(ps-k,0);cnt[ps]=cnt.get(ps,0)+1
    return ans`}}),e.jsx($,{num:4,title:"Longest Consecutive Sequence",difficulty:"LC Medium",tags:["LC 128","Hash Set O(n)"],statement:"Given an unsorted array of integers, return the length of the longest consecutive elements sequence. Solve in O(n) time.",constraints:["0 ≤ n ≤ 10⁵","−10⁹ ≤ nums[i] ≤ 10⁹"],examples:[{input:"nums=[100,4,200,1,3,2]",output:"4",note:"Sequence: 1,2,3,4"},{input:"nums=[0,3,7,2,5,8,4,6,0,1]",output:"9"}],approach:"Hash set of all numbers. For each number that has no left neighbor (n-1 not in set), it starts a sequence — count forward until the sequence breaks. Only start counting at sequence beginnings → each number visited at most twice → O(n). Key: set lookup is O(1), enabling the O(n) guarantee.",code:{cpp:`int longestConsecutive(vector<int>& nums){
    unordered_set<int> s(nums.begin(),nums.end());
    int ans=0;
    for(int n:s){
        if(s.count(n-1))continue;
        int len=0,cur=n;
        while(s.count(cur++))len++;
        ans=max(ans,len);
    }
    return ans;
}`,python:`def longest_consecutive(nums):
    s=set(nums);ans=0
    for n in s:
        if n-1 in s:continue
        cur=n;length=0
        while cur in s:cur+=1;length+=1
        ans=max(ans,length)
    return ans`}}),e.jsx($,{num:5,title:"Longest Subarray with Sum Divisible by K",difficulty:"LC Medium",tags:["LC 974","Prefix Mod"],statement:"Given an integer array <code>nums</code> and integer <code>k</code>, return the number of non-empty subarrays with sum divisible by <code>k</code>.",constraints:["1 ≤ n ≤ 3×10⁴","1 ≤ k ≤ 10⁴","-10⁴ ≤ nums[i] ≤ 10⁴"],examples:[{input:"nums=[4,5,0,-2,-3,1], k=5",output:"7",note:"7 subarrays have sum divisible by 5"}],approach:"Prefix sum modulo k. sum(i..j) divisible by k iff prefix[j] % k == prefix[i-1] % k. Store remainders in a hash map. Handle negative remainders by adding k: rem = ((ps%k)+k)%k. For each new remainder, add count[rem] to answer (same remainder seen before = valid subarray). Initialize map[0]=1.",code:{cpp:`int subarraysDivByK(vector<int>& nums,int k){
    unordered_map<int,int> cnt; cnt[0]=1;
    int ps=0,ans=0;
    for(int x:nums){
        ps+=x; int rem=((ps%k)+k)%k;
        ans+=cnt.count(rem)?cnt[rem]:0; cnt[rem]++;
    }
    return ans;
}`,python:`def subarrays_div_by_k(nums,k):
    cnt={0:1};ps=ans=0
    for x in nums:
        ps+=x;rem=(ps%k+k)%k
        ans+=cnt.get(rem,0);cnt[rem]=cnt.get(rem,0)+1
    return ans`}}),e.jsx($,{num:6,title:"Four Sum II (All pairs from 4 arrays)",difficulty:"LC Medium",tags:["LC 454","2-Sum MITM"],statement:"Given four integer arrays each of size <code>n</code>, count the number of tuples (i,j,k,l) such that <code>nums1[i]+nums2[j]+nums3[k]+nums4[l]==0</code>.",constraints:["1 ≤ n ≤ 200","-2²⁸ ≤ nums[i] ≤ 2²⁸"],examples:[{input:"nums1=[1,2], nums2=[-2,-1], nums3=[-1,2], nums4=[0,2]",output:"2"},{input:"nums1=[0], nums2=[0], nums3=[0], nums4=[0]",output:"1"}],approach:"Meet in the middle via hash map. Compute all n² sums of nums1[i]+nums2[j] and store in map[sum]→count. Then for all n² pairs nums3[k]+nums4[l], check if -(nums3[k]+nums4[l]) is in the map. O(n²) time and space — compared to O(n⁴) brute force or O(n³) with sort+binary search.",code:{cpp:`int fourSumCount(vector<int>& a,vector<int>& b,vector<int>& c,vector<int>& d){
    unordered_map<int,int> mp;
    for(int x:a) for(int y:b) mp[x+y]++;
    int ans=0;
    for(int x:c) for(int y:d) ans+=mp.count(-(x+y))?mp[-(x+y)]:0;
    return ans;
}`,python:`from collections import Counter
def four_sum_count(A,B,C,D):
    ab=Counter(a+b for a in A for b in B)
    return sum(ab[-(c+d)] for c in C for d in D)`}})]})}const Z=[{id:"foundations",label:"Foundations & Chaining"},{id:"openaddr",label:"Open Addressing"},{id:"prefixhash",label:"Prefix + Hash Pattern"},{id:"problems",label:"Problems"}];function ne(){const[o,i]=O.useState("foundations"),r={foundations:e.jsx(Q,{}),openaddr:e.jsx(V,{}),prefixhash:e.jsx(X,{}),problems:e.jsx(J,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 20"}),e.jsx("h1",{className:"page-header-title",children:"Hashing & Hash Tables"}),e.jsx("p",{className:"page-header-subtitle",children:"Direct Address · Division · Multiplication · Chaining · Linear · Quadratic · Double Hashing · Prefix+Hash Pattern · LC 1, 49, 560, 128"})]}),e.jsx(q,{tabs:Z,active:o,onChange:i}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[o]}),e.jsx(I,{moduleId:20})]})}export{ne as default};
