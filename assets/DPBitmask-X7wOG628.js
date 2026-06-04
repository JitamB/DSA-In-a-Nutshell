import{r as _,j as t}from"./index-D9jkHkZY.js";import{S as W,N as O,d as A,H as u,P as T,a as j,Q as z,G as L,C as M,V as R}from"./SectionNav-BHzhBu3R.js";const E={0:[90,155],1:[270,55],2:[270,255],3:[450,155]},P=[[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]],H=[[0,1,10],[0,2,15],[0,3,20],[1,2,35],[1,3,25],[2,3,30]],w=["#4EC9B0","#CE9178","#81B4EA","#C586C0"],F=l=>l.toString(2).padStart(4,"0");function q(){const r=Array.from({length:16},()=>new Array(4).fill(9999));r[1][0]=0;const e=[];e.push({dp:r.map(i=>[...i]),from:null,to:null,edge:null,action:"init",desc:"State: dp[mask][city] = min cost to visit exactly the cities in mask, starting from city 0 and ending at city. Init: dp[0001][0]=0."});for(let i=1;i<16;i++)for(let s=0;s<4;s++)if(i&1<<s&&r[i][s]!==9999)for(let n=0;n<4;n++){if(i&1<<n)continue;const a=i|1<<n,x=r[i][s]+P[s][n],h=r[a][n],m=x<h;m&&(r[a][n]=x),e.push({dp:r.map(v=>[...v]),from:{mask:i,city:s,cost:r[i][s]},to:{mask:a,city:n},edge:{i:s,j:n,w:P[s][n]},candidate:x,prev:h,improved:m,action:m?"update":"noUpdate",desc:`dp[${F(i)}][${s}]=${r[i][s]}: go to city ${n} (w=${P[s][n]}) → dp[${F(a)}][${n}]=min(${h===9999?"∞":h}, ${r[i][s]}+${P[s][n]})=${r[a][n]}.${m?" ✓":" (no improvement)"}`})}const f=15,g=[1,2,3].map(i=>({city:i,total:r[f][i]+P[i][0]})),k=Math.min(...g.map(i=>i.total));return e.push({dp:r.map(i=>[...i]),from:null,to:null,returns:g,minReturn:k,action:"done",desc:`Return to city 0: ${g.map(i=>`(city${i.city}→0)=${i.total}`).join(", ")}. Optimal tour = ${k}.`}),e}const C=q();function U(){const r=["A","B","C","D","E"],[e,f]=_.useState(11),g=s=>f(n=>n^1<<s),k=s=>s.toString(2).split("").filter(n=>n==="1").length,i=Array.from({length:5},(s,n)=>!!(e&1<<n));return t.jsxs(R,{children:[t.jsx("div",{style:{marginBottom:14,fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:"Click bits to toggle the set. Watch how all operations update instantly — a bitmask is just an integer where each bit represents set membership."}),t.jsxs("div",{style:{marginBottom:14},children:[t.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8,letterSpacing:"0.06em"},children:"SET (click to toggle)"}),t.jsx("div",{style:{display:"flex",gap:6},children:r.map((s,n)=>{const a=i[n];return t.jsxs("button",{onClick:()=>g(n),style:{width:52,height:52,borderRadius:8,border:`2px solid ${a?w[n%4]:"var(--color-border-secondary)"}`,background:a?"rgba(255,255,255,0.08)":"#131722",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,transition:"all 0.15s"},children:[t.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:a?w[n%4]:"var(--color-text-tertiary)"},children:s}),t.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:a?w[n%4]:"var(--color-text-tertiary)"},children:a?"1":"0"})]},n)})})]}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14},children:[["Decimal",e.toString(),"info"],["Binary",e.toString(2).padStart(5,"0"),"success"],["|S|",k(e).toString(),"warning"]].map(([s,n,a])=>t.jsxs("div",{style:{padding:"8px 10px",borderRadius:"var(--border-radius-md)",background:`var(--color-background-${a})`,border:`0.5px solid var(--color-border-${a})`,textAlign:"center"},children:[t.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:`var(--color-text-${a})`,marginBottom:2},children:s}),t.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:18,fontWeight:700,color:`var(--color-text-${a})`},children:n})]},s))}),t.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"10px 14px",fontFamily:"var(--font-mono)",fontSize:12,lineHeight:2.2},children:[t.jsx("div",{style:{color:"#6A9955",marginBottom:2},children:"// Key operations on current mask = "+e}),[[`has_bit(2) = mask & (1<<2) = ${e} & 4`,`= ${e&4} (${i[2]?"C is in set":"C not in set"})`,"#9CDCFE"],[`set_bit(2) = mask | (1<<2) = ${e} | 4`,`= ${e|4} = ${(e|4).toString(2).padStart(5,"0")}`,"#4EC9B0"],[`clr_bit(2) = mask & ~(1<<2) = ${e} & ${-5>>>0}&15`,`= ${e&-5} = ${(e&-5).toString(2).padStart(5,"0")}`,"#CE9178"],[`add item E: mask|(1<<4) = ${e}|16`,`= ${e|16} = ${(e|16).toString(2).padStart(5,"0")}`,"#C586C0"],[`del item A: mask&~(1<<0) = ${e}&30`,`= ${e&-2&31} = ${(e&-2&31).toString(2).padStart(5,"0")}`,"#CE9178"]].map(([s,n,a])=>t.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[t.jsx("span",{style:{color:a},children:s}),t.jsx("span",{style:{color:"#7A8599"},children:n})]},s))]})]})}function G(){var n,a,x,h,m,v,$,I,D;const[l,r]=_.useState(0),e=C[Math.min(l,C.length-1)],f=e.edge,g=(n=e.from)==null?void 0:n.city,k=(a=e.to)==null?void 0:a.city,i=(x=e.from)==null?void 0:x.mask;(h=e.to)==null||h.mask;const s=[];return(e.dp||[]).forEach((p,o)=>{p.forEach((d,c)=>{d<9999&&o&1<<c&&s.push({mask:o,city:c,cost:d})})}),t.jsxs(R,{children:[t.jsxs("div",{style:{marginBottom:10,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[e.action!=="init"&&t.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${e.action==="update"||e.action==="done"?"success":"secondary"})`,color:`var(--color-text-${e.action==="update"||e.action==="done"?"success":"tertiary"})`,border:`1px solid var(--color-border-${e.action==="update"||e.action==="done"?"success":"secondary"})`,whiteSpace:"nowrap"},children:e.action==="update"?"Update ✓":e.action==="done"?"Done ✓":"No improvement"}),t.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:e.desc})]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12},children:[t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:4,letterSpacing:"0.06em"},children:"GRAPH (4 cities, all pairs)"}),t.jsxs("svg",{width:"350",height:"220",viewBox:"0 0 540 310",children:[H.map(([p,o,d])=>{const c=E[p],y=E[o],b=f&&(f.i===p&&f.j===o||f.i===o&&f.j===p),S=(c[0]+y[0])/2,B=(c[1]+y[1])/2;return t.jsxs("g",{children:[t.jsx("line",{x1:c[0],y1:c[1],x2:y[0],y2:y[1],stroke:b?"#CE9178":"#2A3050",strokeWidth:b?2.5:1.5}),t.jsx("rect",{x:S-12,y:B-9,width:24,height:16,rx:3,fill:"#0D0F18"}),t.jsx("text",{x:S,y:B+1,textAnchor:"middle",dominantBaseline:"middle",fill:b?"#CE9178":"#4A5170",fontSize:"11",fontFamily:"monospace",fontWeight:b?700:400,children:d})]},`${p}-${o}`)}),Array.from({length:4},(p,o)=>{const[d,c]=E[o],y=o===g,b=o===k,S=y?"#CE9178":b?"#4EC9B0":w[o],B=i!=null&&i&1<<o;return t.jsxs("g",{children:[t.jsx("circle",{cx:d,cy:c,r:"26",fill:y||b?"rgba(255,255,255,0.08)":"#131722",stroke:S,strokeWidth:y||b?2.5:1.5}),t.jsx("text",{x:d,y:c,textAnchor:"middle",dominantBaseline:"middle",fill:S,fontSize:"13",fontFamily:"monospace",fontWeight:"700",children:o}),B&&t.jsx("circle",{cx:d+18,cy:c-18,r:"6",fill:S,opacity:"0.8"})]},o)})]})]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[e.from&&t.jsxs("div",{style:{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",fontFamily:"var(--font-mono)",fontSize:12,lineHeight:2},children:[t.jsx("div",{style:{color:"var(--color-text-tertiary)",marginBottom:2},children:"TRANSITION"}),t.jsxs("div",{children:[t.jsx("span",{style:{color:"var(--color-text-info)"},children:"from: "}),t.jsxs("span",{style:{color:"var(--color-text-warning)",fontWeight:700},children:["dp[",F(e.from.mask),"][",e.from.city,"]=",e.from.cost]})]}),t.jsxs("div",{children:[t.jsx("span",{style:{color:"var(--color-text-info)"},children:"edge: "}),t.jsxs("span",{style:{color:"#CE9178"},children:["city",(m=e.edge)==null?void 0:m.i,"→city",(v=e.edge)==null?void 0:v.j," (w=",($=e.edge)==null?void 0:$.w,")"]})]}),t.jsxs("div",{children:[t.jsx("span",{style:{color:"var(--color-text-info)"},children:"to:   "}),t.jsxs("span",{style:{color:e.improved?"var(--color-text-success)":"var(--color-text-tertiary)",fontWeight:700},children:["dp[",F(((I=e.to)==null?void 0:I.mask)??0),"][",(D=e.to)==null?void 0:D.city,"]=",e.candidate]}),e.improved&&t.jsx("span",{style:{color:"var(--color-text-success)"},children:" ✓"})]})]}),t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"COMPUTED dp[mask][city]"}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:3,maxHeight:160,overflowY:"auto"},children:s.map(({mask:p,city:o,cost:d})=>{const c=e.to&&e.to.mask===p&&e.to.city===o&&e.action==="update";return t.jsxs("div",{style:{display:"flex",gap:6,padding:"3px 8px",borderRadius:4,background:c?"var(--color-background-success)":"var(--color-background-secondary)",border:`0.5px solid ${c?"var(--color-border-success)":"var(--color-border-tertiary)"}`,fontFamily:"var(--font-mono)",fontSize:11.5,transition:"all 0.15s"},children:[t.jsx("span",{style:{color:c?"var(--color-text-success)":"var(--color-text-tertiary)",minWidth:40},children:F(p)}),t.jsxs("span",{style:{color:c?"var(--color-text-success)":"var(--color-text-secondary)"},children:["city ",o]}),t.jsx("span",{style:{color:c?"var(--color-text-success)":"var(--color-text-info)",fontWeight:c?700:400,marginLeft:"auto"},children:d})]},`${p}-${o}`)})})]})]})]}),e.from&&t.jsxs("div",{style:{marginBottom:12},children:[t.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:["CURRENT MASK: ",F(e.from.mask)]}),t.jsx("div",{style:{display:"flex",gap:6},children:Array.from({length:4},(p,o)=>{const d=!!(e.from.mask&1<<o);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[t.jsx("div",{style:{width:36,height:36,borderRadius:6,border:`1.5px solid ${d?w[o]:"var(--color-border-secondary)"}`,background:d?"rgba(255,255,255,0.06)":"#131722",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:d?w[o]:"var(--color-text-tertiary)"},children:o}),t.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:9.5,color:d?w[o]:"var(--color-text-tertiary)"},children:d?"✓":"—"})]},o)})})]}),e.action==="done"&&t.jsxs("div",{style:{padding:"8px 14px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--color-text-success)",marginBottom:12},children:["✓ Optimal TSP tour = ",e.minReturn,". Path: 0→2→3→1→0 or 0→1→3→2→0"]}),t.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>r(Math.max(0,l-1)),l===0],["Next →",()=>r(Math.min(C.length-1,l+1)),l===C.length-1]].map(([p,o,d])=>t.jsx("button",{onClick:o,disabled:d,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:d?"not-allowed":"pointer",fontSize:12,opacity:d?.4:1},children:p},p)),t.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[l+1,"/",C.length]}),t.jsx("button",{onClick:()=>r(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),t.jsx("button",{onClick:()=>r(C.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}const K={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function N({num:l,title:r,difficulty:e,tags:f=[],statement:g,constraints:k=[],examples:i=[],approach:s,code:n}){const[a,x]=_.useState(!1),h=K[e]||"info";return t.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[t.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",l]}),t.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:r})]}),t.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[f.map(m=>t.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:m},m)),t.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${h})`,color:`var(--color-text-${h})`,border:`1px solid var(--color-border-${h})`},children:e})]})]}),t.jsxs("div",{style:{padding:"14px 16px"},children:[t.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:g}}),k.length>0&&t.jsxs("div",{style:{marginBottom:12},children:[t.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:k.map((m,v)=>t.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:m},v))})]}),i.length>0&&t.jsx("div",{style:{marginBottom:14},children:i.map((m,v)=>t.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[t.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",v+1]}),t.jsxs("div",{children:[t.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),t.jsx("span",{style:{color:"var(--color-text-secondary)"},children:m.input})]}),t.jsxs("div",{children:[t.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),t.jsx("span",{style:{color:"var(--color-text-secondary)"},children:m.output})]}),m.note&&t.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:m.note})]},v))}),t.jsxs("button",{onClick:()=>x(!a),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:a?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[t.jsx("i",{className:`ti ti-${a?"eye-off":"bulb"}`}),a?"Hide Solution":"Show Approach & Solution"]}),a&&t.jsxs("div",{style:{marginTop:12},children:[t.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[t.jsx("strong",{children:"Approach: "}),s]}),t.jsx(j,{children:n})]})]})]})}function X(){return t.jsxs("div",{children:[t.jsxs(A,{color:"info",icon:"ti-binary",children:["A ",t.jsx("strong",{children:"bitmask"}),' is an integer where each bit represents membership in a set. For N items, an integer in range [0, 2ⁿ−1] encodes all 2ⁿ possible subsets. Bitmask DP solves problems where the state is "which subset of N items have we processed?" — feasible when N ≤ 20.']}),t.jsx(u,{children:"When is Bitmask DP the Answer?"}),t.jsxs(L,{cols:2,children:[t.jsx(M,{title:"Problem Signals",color:"info",children:'N ≤ 20 elements. State = which subset has been chosen/visited. "Assign each item to a group." "Visit all nodes exactly once." "Cover all tasks." These are fundamentally exponential problems — 2ⁿ subsets is the correct complexity.'}),t.jsx(M,{title:"Complexity",color:"warning",children:"O(2ⁿ × N) time, O(2ⁿ × N) space. For N=20: 20 million states — feasible. For N=25: 800 million — borderline. For N=30: too slow. Always check N before choosing bitmask DP."})]}),t.jsx(u,{children:"Core Bit Operations — Memorize These"}),t.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"14px 18px",fontFamily:"var(--font-mono)",fontSize:12.5,lineHeight:2.4,marginBottom:16},children:[["Check if item i is in mask","mask & (1<<i)","= 0 if absent, non-zero if present"],["Add item i to mask","mask | (1<<i)","= new mask with bit i set"],["Remove item i from mask","mask & ~(1<<i)","= new mask with bit i cleared"],["Toggle item i in mask","mask ^ (1<<i)","= flips bit i"],["Count items in mask","__builtin_popcount(mask)",'= number of 1-bits (C++); bin(mask).count("1") Python'],["All N items selected","mask == (1<<n)-1","= all n bits set"],["Lowest set bit","mask & (-mask)","= isolates the least significant set bit"],["Remove lowest set bit","mask & (mask-1)","= clears the rightmost set bit (LSB)"]].map(([l,r,e])=>t.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[t.jsx("span",{style:{color:"#7A8599",minWidth:220,flexShrink:0},children:l}),t.jsx("span",{style:{color:"#9CDCFE",fontWeight:700,minWidth:180},children:r}),t.jsx("span",{style:{color:"#6A9955"},children:e})]},l))}),t.jsx(u,{children:"Interactive Bitmask Explorer"}),t.jsx(T,{children:"Toggle bits to see how operations transform the set. The binary representation IS the set — each bit is a membership flag."}),t.jsx(U,{}),t.jsx(u,{children:"Subset Enumeration Patterns"}),t.jsx(j,{children:{cpp:`// Pattern 1: Iterate ALL 2^n subsets — O(2^n)
for (int mask = 0; mask < (1<<n); mask++) {
    // mask is a subset of {0,1,...,n-1}
}

// Pattern 2: Iterate all SUBMASKS of a given mask — O(3^n) total
// For each mask, this loop visits every subset of that mask (not 2^n per mask!)
for (int sub = mask; sub > 0; sub = (sub-1) & mask) {
    // sub is a submask of mask
    // The (sub-1) & mask trick removes the lowest set bit while staying within mask
}

// Pattern 3: Iterate by POPCOUNT (crucial for TSP and assignment DP)
// Process masks with k bits before masks with k+1 bits
for (int mask = 0; mask < (1<<n); mask++) {
    if (__builtin_popcount(mask) == k) { /* process */ }
}
// Or: process in order 0..2^n-1 (naturally processes smaller subsets first within same popcount)

// Pattern 4: Enumerate all PAIRS of disjoint subsets
for (int a = mask; a > 0; a = (a-1) & mask) {
    int b = mask ^ a;  // complement within mask
    // {a, b} is a partition of mask into two parts
}`,python:`# All subsets
for mask in range(1<<n):
    pass  # mask is a subset

# All submasks of a given mask
sub = mask
while sub:
    # process sub
    sub = (sub-1) & mask

# Iterate set bits of a mask
temp = mask
while temp:
    i = (temp & -temp).bit_length() - 1  # index of lowest set bit
    # process bit i
    temp &= temp - 1  # remove lowest set bit`}}),t.jsxs(A,{color:"success",icon:"ti-bulb",children:[t.jsx("strong",{children:"Why (sub-1) & mask works:"})," Subtracting 1 from sub flips all bits from the lowest set bit down to bit 0. ANDing with mask restricts back to the original mask. This generates every submask exactly once, then terminates when sub becomes 0. Total iterations across all masks of size n: exactly 3ⁿ."]}),t.jsx(z,{q:"The submask iteration (sub-1)&mask looks like magic. What's the invariant that proves it visits every submask exactly once?",a:"Claim: starting from mask and repeatedly applying sub = (sub-1)&mask visits every submask of mask in strictly decreasing order, ending at 0. Proof sketch: (sub-1) flips all trailing zeros to ones and flips the lowest 1 to 0 in sub. Then &mask restricts back. This is equivalent to counting down from mask to 0 but 'skipping' bits not in mask. Since it's strictly decreasing and bounded below by 0, it terminates and visits each value exactly once. Total: sum over all masks of 2^|mask| = 3^n."})]})}function V(){return t.jsxs("div",{children:[t.jsxs(A,{color:"success",icon:"ti-route",children:[t.jsx("strong",{children:"Traveling Salesman Problem (TSP):"})," find the minimum-cost Hamiltonian cycle — a path that visits every city exactly once and returns to the start. Brute force: O(n!) permutations. Bitmask DP: O(2ⁿ × n²) — feasible for n ≤ 20."]}),t.jsx(u,{children:"State Design — The Key Insight"}),t.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"14px 18px",fontFamily:"var(--font-mono)",fontSize:12.5,lineHeight:2.4,marginBottom:14},children:[["State","#9CDCFE","dp[mask][i] = min cost to visit all cities in mask, starting from city 0, ending at city i"],["Recur","#CE9178","dp[mask|(1<<j)][j] = min(dp[mask][i] + dist[i][j]) for all i in mask, j not in mask"],["Base","#4EC9B0","dp[1<<0][0] = 0 (only city 0 visited, we're at city 0, cost=0)"],["Answer","#DCDCAA","min(dp[(1<<n)-1][i] + dist[i][0]) for all i ≠ 0 (return to start)"],["Time","#7A8599","O(2^n × n²) — 2^n masks × n endpoints × n transitions"]].map(([l,r,e])=>t.jsxs("div",{style:{display:"flex",gap:12},children:[t.jsx("span",{style:{color:"#3D4460",minWidth:52,fontWeight:700},children:l}),t.jsx("span",{style:{color:r},children:e})]},l))}),t.jsx(u,{children:"Interactive Step-Through — 4 Cities"}),t.jsx(T,{children:"Graph: cities 0–3 with edge weights shown. The binary mask tracks which cities are visited. Each step tries one transition: extend the path to an unvisited city. Watch the dp table fill from smaller masks to larger ones."}),t.jsx(G,{}),t.jsx(u,{children:"Full TSP Code"}),t.jsx(j,{children:{cpp:`int tsp(int dist[][MAXN], int n) {
    int FULL = (1<<n)-1;
    vector<vector<int>> dp(1<<n, vector<int>(n, INT_MAX));
    dp[1][0] = 0;  // at city 0, only city 0 visited, cost 0

    for (int mask = 1; mask < (1<<n); mask++) {
        for (int i = 0; i < n; i++) {
            if (!(mask & (1<<i))) continue;        // i not in mask
            if (dp[mask][i] == INT_MAX) continue;  // unreachable
            for (int j = 0; j < n; j++) {
                if (mask & (1<<j)) continue;       // j already visited
                int newMask = mask | (1<<j);
                dp[newMask][j] = min(dp[newMask][j],
                                     dp[mask][i] + dist[i][j]);
            }
        }
    }

    // Return to city 0 from the last city
    int ans = INT_MAX;
    for (int i = 1; i < n; i++)
        if (dp[FULL][i] != INT_MAX)
            ans = min(ans, dp[FULL][i] + dist[i][0]);
    return ans;
}
// Time: O(2^n × n²)  Space: O(2^n × n)`,python:`def tsp(dist, n):
    INF=float('inf'); FULL=(1<<n)-1
    dp=[[INF]*n for _ in range(1<<n)]
    dp[1][0]=0          # start at city 0
    for mask in range(1,1<<n):
        for i in range(n):
            if not(mask&(1<<i)):continue
            if dp[mask][i]==INF:continue
            for j in range(n):
                if mask&(1<<j):continue
                new_mask=mask|(1<<j)
                dp[new_mask][j]=min(dp[new_mask][j],dp[mask][i]+dist[i][j])
    return min(dp[FULL][i]+dist[i][0] for i in range(1,n) if dp[FULL][i]<INF)`}}),t.jsx(u,{children:"Path Reconstruction"}),t.jsx(j,{children:{cpp:`// Store "from which state did we reach dp[mask][i]?"
vector<vector<int>> parent(1<<n, vector<int>(n, -1));
// In the transition: if improved, set parent[newMask][j] = i;

// Reconstruct path:
vector<int> reconstructPath(int dp[][], int parent[][], int n) {
    int mask = (1<<n)-1;
    int cur = 0;
    // Find ending city
    for (int i=1; i<n; i++)
        if (dp[mask][i]+dist[i][0] < dp[mask][cur]+dist[cur][0]) cur=i;
    vector<int> path;
    while (mask) {
        path.push_back(cur);
        int prev = parent[mask][cur];
        mask ^= (1<<cur);  // remove cur from mask
        cur = prev;
    }
    reverse(path.begin(), path.end());
    return path; // cities in visit order
}`,python:`# Reconstruct: after filling dp and parent arrays
def reconstruct_path(dp,parent,n):
    full=(1<<n)-1; mask=full
    # Find best last city
    last=min(range(1,n),key=lambda i:dp[full][i]+dist[i][0])
    path=[]; cur=last
    while mask:
        path.append(cur)
        prev=parent[mask][cur]
        mask^=(1<<cur); cur=prev
    path.append(0); path.reverse(); return path`}}),t.jsx(z,{q:"Why do we start the TSP DP from city 0 specifically? Can we start from any city?",a:"For a cycle (return to start), the starting point doesn't matter — every Hamiltonian cycle passes through all cities regardless of where you 'start'. Fixing city 0 as the start avoids counting each cycle n times (once for each rotation). If you started from each city, you'd find the same optimal tours n times over. So we always set dp[1<<0][0]=0 and never 'start' from other cities."})]})}function Y(){return t.jsxs("div",{children:[t.jsx(u,{children:"Assignment Problem — Students Happiness"}),t.jsxs(T,{children:["Assign N students to N tasks such that each task is done by exactly one student. dp[mask] = max happiness when we've assigned the first popcount(mask) students to exactly the tasks in mask. The key: when we process student ",t.jsx("code",{children:"k = popcount(mask)"}),", we try assigning them to every task in mask."]}),t.jsx(j,{children:{cpp:`// N students, N tasks. happiness[i][j] = happiness if student i does task j
// dp[mask] = max happiness when the FIRST popcount(mask) students
//            have been assigned to the tasks indicated by mask
int maxHappiness(int happy[][MAXN], int n) {
    vector<int> dp(1<<n, 0);
    for (int mask = 1; mask < (1<<n); mask++) {
        int student = __builtin_popcount(mask) - 1;  // 0-indexed student
        for (int task = 0; task < n; task++) {
            if (!(mask & (1<<task))) continue;       // task not in this subset
            // Assign 'student' to 'task'; previous students had mask^(1<<task)
            int prev = dp[mask ^ (1<<task)];
            dp[mask] = max(dp[mask], prev + happy[student][task]);
        }
    }
    return dp[(1<<n)-1];
}
// Time: O(2^n × n)  — much better than O(n!) brute force`,python:`def max_happiness(happy, n):
    dp=[0]*(1<<n)
    for mask in range(1,1<<n):
        student=bin(mask).count('1')-1  # which student is being assigned
        for task in range(n):
            if not(mask&(1<<task)):continue
            dp[mask]=max(dp[mask], dp[mask^(1<<task)]+happy[student][task])
    return dp[(1<<n)-1]`}}),t.jsxs(A,{color:"info",icon:"ti-bulb",children:[t.jsx("strong",{children:"Why does student = popcount(mask) - 1?"}),` We process students in order 0, 1, 2... When mask has k bits set, we're computing the assignment for student k-1 (0-indexed). The bitmask encodes "which tasks have been assigned so far." The previous state is mask with this task removed: mask ^ (1<<task).`]}),t.jsx(u,{children:"Counting Hamiltonian Paths / Cycles"}),t.jsx(j,{children:{cpp:`// Count Hamiltonian paths starting at vertex 0
// dp[mask][v] = number of paths visiting exactly mask-cities, ending at v
long long countHamPaths(vector<vector<int>>& adj, int n) {
    vector<vector<long long>> dp(1<<n, vector<long long>(n, 0));
    dp[1][0] = 1;  // start at vertex 0

    for (int mask=1; mask<(1<<n); mask++) {
        for (int u=0; u<n; u++) {
            if (!(mask&(1<<u))||dp[mask][u]==0) continue;
            for (int v : adj[u]) {
                if (mask&(1<<v)) continue;  // already visited
                dp[mask|(1<<v)][v] += dp[mask][u];
            }
        }
    }
    long long ans = 0;
    int full = (1<<n)-1;
    for (int v=1; v<n; v++) ans += dp[full][v];  // paths ending at any non-0 vertex
    return ans;
}

// Count Hamiltonian CYCLES: also require an edge back to 0
long long countHamCycles(vector<vector<int>>& adj, int n) {
    // same DP, but at end check if adj[v][0] edge exists
    long long ans=0;
    for (int v=1; v<n; v++)
        if (adj[v][0]) ans += dp[(1<<n)-1][v];  // cycle: v→0
    return ans / 2;  // each cycle counted twice (clockwise + counter-clockwise)
}`,python:`def count_ham_paths(adj, n):
    dp=[[0]*n for _ in range(1<<n)]; dp[1][0]=1
    for mask in range(1,1<<n):
        for u in range(n):
            if not(mask&(1<<u)) or not dp[mask][u]:continue
            for v in adj[u]:
                if mask&(1<<v):continue
                dp[mask|(1<<v)][v]+=dp[mask][u]
    return sum(dp[(1<<n)-1][v] for v in range(1,n))`}}),t.jsx(u,{children:"Tiling with Bitmask (Broken Profile DP)"}),t.jsx(T,{children:'Count ways to tile an M×N grid with 1×2 dominoes. For M ≤ 20, use profile DP: dp[col][profile] where profile is a bitmask of which cells in the current column boundary are "sticking out" (covered by a horizontal domino from the previous column).'}),t.jsx(j,{children:{cpp:`// Count tilings of M×N grid with 1×2 dominoes
// Process column by column. profile[bit i] = 1 means cell (i, cur_col)
// is already filled by a horizontal domino from the previous column.
long long countTilings(int M, int N) {
    vector<long long> dp(1<<M, 0);
    dp[0] = 1;  // empty grid, no cells pre-filled

    for (int col = 0; col < N; col++) {
        vector<long long> ndp(1<<M, 0);
        // Try all combinations of how current column is filled
        // given 'prev' profile (incoming pre-filled cells)
        function<void(int,int,long long)> fill = [&](int row, int curProfile, long long ways){
            if (row == M) { ndp[curProfile] += ways; return; }
            if (prev profile bit set) {
                // cell (row,col) already filled → just move to next row
                fill(row+1, curProfile, ways);
            } else {
                // Option 1: place vertical domino (fill this cell + next cell)
                if (row+1<M && !(prevProfile & (1<<(row+1)))) {
                    fill(row+2, curProfile, ways);  // both cells filled vertically
                }
                // Option 2: place horizontal domino (fill this cell, mark in next profile)
                fill(row+1, curProfile|(1<<row), ways);
            }
        };
        for (int prev=0; prev<(1<<M); prev++)
            if (dp[prev]) fill(0, 0, dp[prev]);  // simplified — see full impl
        dp = ndp;
    }
    return dp[0];  // no cells sticking out after last column
}`,python:`# Simpler: 2×N tiling with 1×2 dominoes
# (doesn't need bitmask — Fibonacci sequence)
def count_2xN_tiling(n):
    dp=[0]*(n+1); dp[0]=dp[1]=1
    for i in range(2,n+1): dp[i]=dp[i-1]+dp[i-2]
    return dp[n]

# For larger M, need proper broken profile DP
# See full implementation in competitive programming references`}}),t.jsx(u,{children:"Minimum Edge Deletion to Make a DAG"}),t.jsx(T,{children:"Find the minimum edges to remove from a directed graph so no cycle remains. Key observation: a DAG has a topological ordering. Try all 2ⁿ possible orderings (represented as subsets) and find one with minimum backward edges."}),t.jsx(j,{children:{cpp:`// Find optimal topological ordering to minimize backward edges
int minEdgesForDAG(vector<vector<int>>& adj, int n) {
    // dp[mask] = min edges from mask-nodes' induced subgraph going "backward"
    //           when we order nodes of mask optimally
    // Equivalently: max edges we can KEEP (forward edges in best ordering)
    vector<int> dp(1<<n, 0);
    // For each mask, try all possible "last node" to add
    for (int mask=1; mask<(1<<n); mask++) {
        dp[mask] = 0;
        for (int last=0; last<n; last++) {
            if (!(mask&(1<<last))) continue;
            int prev = mask ^ (1<<last);
            // Count edges FROM prev-nodes TO last (these are forward edges)
            int fwdEdges = 0;
            for (int from=0; from<n; from++)
                if ((prev&(1<<from)) && adj[from][last]) fwdEdges++;
            dp[mask] = max(dp[mask], dp[prev] + fwdEdges);
        }
    }
    // Total edges minus max forward edges = min deletions
    int totalEdges = 0;
    for (int u=0;u<n;u++) for (int v=0;v<n;v++) totalEdges += adj[u][v];
    return totalEdges - dp[(1<<n)-1];
}`,python:`def min_edges_for_dag(adj, n):
    dp=[0]*(1<<n)
    for mask in range(1,1<<n):
        for last in range(n):
            if not(mask&(1<<last)):continue
            prev=mask^(1<<last)
            fwd=sum(1 for fr in range(n) if(prev&(1<<fr)) and adj[fr][last])
            dp[mask]=max(dp[mask],dp[prev]+fwd)
    total=sum(adj[u][v] for u in range(n) for v in range(n))
    return total-dp[(1<<n)-1]`}}),t.jsx(z,{q:"For the assignment problem, why does iterating masks in order 1..2ⁿ-1 give the correct DP order?",a:"When mask has k bits set, dp[mask] depends on dp[mask ^ (1<<task)] which has k-1 bits set. Any mask with k-1 bits set has a smaller integer value than the smallest mask with k bits set (not strictly, but all proper subsets have smaller values). So iterating masks in increasing order 1, 2, 3... naturally processes all proper subsets before the mask itself. This is the same 'fill order' we discussed in Module 24 for subset-sum, just now applied to assignment."})]})}function Q(){return t.jsxs("div",{children:[t.jsx(A,{color:"purple",icon:"ti-tournament",children:"4 problems spanning the core bitmask DP patterns — assignment, subset feasibility, BFS+bitmask, and TSP on strings."}),t.jsx(N,{num:1,title:"Beautiful Arrangement",difficulty:"LC Medium",tags:["LC 526","Assignment DP"],statement:"Suppose you have <code>n</code> integers labeled 1 to n. A permutation is beautiful if for every position i, either perm[i] is divisible by i, or i is divisible by perm[i]. Count all beautiful arrangements.",constraints:["1 ≤ n ≤ 15"],examples:[{input:"n=2",output:"2",note:"[1,2]: 1/1 ✓, 2/2 ✓. [2,1]: 2/1 ✓, 1/2 no but 2/1 ✓"},{input:"n=1",output:"1"}],approach:"dp[mask] = number of ways to assign numbers to first popcount(mask) positions such that the selected numbers form 'mask'. For each mask, the current position = popcount(mask). Try each number in mask at that position. If compatible, add dp[mask ^ (1<<(num-1))] to dp[mask].",code:{cpp:`int countArrangement(int n){
    vector<int> dp(1<<n,0); dp[0]=1;
    for(int mask=1;mask<(1<<n);mask++){
        int pos=__builtin_popcount(mask);   // 1-indexed position
        for(int num=1;num<=n;num++){
            if(!(mask&(1<<(num-1))))continue;
            if(pos%num==0||num%pos==0)      // compatibility check
                dp[mask]+=dp[mask^(1<<(num-1))];
        }
    }
    return dp[(1<<n)-1];
}`,python:`def count_arrangement(n):
    dp=[0]*(1<<n); dp[0]=1
    for mask in range(1,1<<n):
        pos=bin(mask).count('1')     # 1-indexed
        for num in range(1,n+1):
            if not(mask&(1<<(num-1))):continue
            if pos%num==0 or num%pos==0:
                dp[mask]+=dp[mask^(1<<(num-1))]
    return dp[(1<<n)-1]`}}),t.jsx(N,{num:2,title:"Partition to K Equal Sum Subsets",difficulty:"LC Medium",tags:["LC 698","Subset Feasibility"],statement:"Given an integer array <code>nums</code> and integer <code>k</code>, return true if we can partition the array into k non-empty subsets whose sums are all equal.",constraints:["1 ≤ k ≤ n ≤ 16","1 ≤ nums[i] ≤ 10⁴"],examples:[{input:"nums=[4,3,2,3,5,2,1], k=4",output:"true",note:"(5),(1,4),(2,3),(2,3)"},{input:"nums=[1,2,3,4], k=3",output:"false"}],approach:"dp[mask] = current sum being accumulated in the 'in-progress' bucket when numbers in mask have been placed. If dp[mask] == target, the current bucket is complete — next state resets to 0. If total sum not divisible by k → false. State: dp[mask] = running sum of current partial bucket.",code:{cpp:`bool canPartitionKSubsets(vector<int>& nums,int k){
    int sum=accumulate(nums.begin(),nums.end(),0);
    if(sum%k!=0)return false;
    int target=sum/k,n=nums.size();
    vector<int> dp(1<<n,-1); dp[0]=0;
    sort(nums.rbegin(),nums.rend());   // greedy: try large numbers first
    for(int mask=0;mask<(1<<n);mask++){
        if(dp[mask]==-1)continue;
        for(int i=0;i<n;i++){
            if(mask&(1<<i))continue;
            int next=mask|(1<<i);
            if(dp[mask]+nums[i]<=target)
                dp[next]=(dp[mask]+nums[i])%target;
        }
    }
    return dp[(1<<n)-1]==0;
}`,python:`def can_partition_k_subsets(nums,k):
    s=sum(nums)
    if s%k:return False
    target=s//k; n=len(nums)
    dp=[-1]*(1<<n); dp[0]=0
    nums.sort(reverse=True)
    for mask in range(1<<n):
        if dp[mask]==-1:continue
        for i in range(n):
            if mask&(1<<i):continue
            nxt=mask|(1<<i)
            if dp[mask]+nums[i]<=target:
                dp[nxt]=(dp[mask]+nums[i])%target
    return dp[(1<<n)-1]==0`}}),t.jsx(N,{num:3,title:"Shortest Path Visiting All Nodes",difficulty:"LC Hard",tags:["LC 847","BFS + Bitmask"],statement:"Given an undirected connected graph, return the length of the shortest path that visits every node. You can start and stop at any node and revisit nodes.",constraints:["1 ≤ n ≤ 12","graph is connected"],examples:[{input:"[[1,2,3],[0],[0],[0]]",output:"4",note:"Start at 0, visit 1,2,3"},{input:"[[1],[0,2,4],[1,3,4],[2],[1,2]]",output:"4"}],approach:"BFS on state (node, visited_mask). Since we can revisit nodes, BFS (not DP) finds shortest path. Start with all n nodes as sources with distance 0 (multi-source BFS). State visited when mask = all ones. O(2ⁿ × n) states. This is BFS + bitmask, not pure DP.",code:{cpp:`int shortestPathLength(vector<vector<int>>& graph){
    int n=graph.size(),full=(1<<n)-1;
    queue<tuple<int,int,int>> q;      // {node, mask, steps}
    vector<vector<bool>> vis(n,vector<bool>(1<<n,false));
    for(int i=0;i<n;i++){q.push({i,1<<i,0});vis[i][1<<i]=true;}
    while(!q.empty()){
        auto[u,mask,d]=q.front();q.pop();
        if(mask==full)return d;
        for(int v:graph[u]){
            int nm=mask|(1<<v);
            if(!vis[v][nm]){vis[v][nm]=true;q.push({v,nm,d+1});}
        }
    }
    return -1;
}`,python:`from collections import deque
def shortest_path_length(graph):
    n=len(graph); full=(1<<n)-1
    q=deque([(i,1<<i,0) for i in range(n)])
    vis=[[False]*(1<<n) for _ in range(n)]
    for i in range(n):vis[i][1<<i]=True
    while q:
        u,mask,d=q.popleft()
        if mask==full:return d
        for v in graph[u]:
            nm=mask|(1<<v)
            if not vis[v][nm]:vis[v][nm]=True;q.append((v,nm,d+1))`}}),t.jsx(N,{num:4,title:"Find the Shortest Superstring",difficulty:"LC Hard",tags:["LC 943","TSP on Strings"],statement:"Given an array of strings <code>words</code>, return the shortest superstring such that every string in words is a substring of it. Optimize by finding maximum overlap between strings.",constraints:["1 ≤ n ≤ 12","1 ≤ words[i].length ≤ 20"],examples:[{input:'["alex","loves","leetcode"]',output:'"alexlovesleetcode"'},{input:'["catg","ctaagt","gcta","ttca","atgcatc"]',output:'"gctaagttcatgcatc"'}],approach:"TSP on strings. Precompute overlap[i][j] = max characters of words[j] that overlap with the suffix of words[i]. dp[mask][i] = max total overlap when words in mask are concatenated, ending with word i. Answer = sum of all word lengths - max total overlap. O(n² × 2ⁿ).",code:{cpp:`string shortestSuperstring(vector<string>& w){
    int n=w.size();
    // Precompute overlaps: how much of w[j]'s prefix matches w[i]'s suffix
    vector<vector<int>> ov(n,vector<int>(n,0));
    for(int i=0;i<n;i++) for(int j=0;j<n;j++) if(i!=j){
        int len=min(w[i].size(),w[j].size());
        for(int k=len;k>=1;k--)
            if(w[i].substr(w[i].size()-k)==w[j].substr(0,k)){ov[i][j]=k;break;}
    }
    // TSP: dp[mask][i] = max overlap when words in mask are used, ending with word i
    int full=(1<<n)-1;
    vector<vector<int>> dp(1<<n,vector<int>(n,0)), par(1<<n,vector<int>(n,-1));
    for(int mask=1;mask<(1<<n);mask++)
        for(int i=0;i<n;i++){if(!(mask&(1<<i)))continue;
            for(int j=0;j<n;j++){if(mask&(1<<j))continue;
                int nm=mask|(1<<j);
                if(dp[nm][j]<dp[mask][i]+ov[i][j])
                    {dp[nm][j]=dp[mask][i]+ov[i][j];par[nm][j]=i;}
            }
        }
    // Reconstruct
    int last=max_element(dp[full].begin(),dp[full].end())-dp[full].begin();
    string res; int mask=full,cur=last;
    while(mask){res=w[cur].substr(mask==(1<<cur)?0:ov[par[mask][cur]][cur])+res;int p=par[mask][cur];mask^=(1<<cur);cur=p;}
    return res;
}`,python:`def shortest_superstring(words):
    n=len(words)
    ov=[[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i==j:continue
            maxk=min(len(words[i]),len(words[j]))
            for k in range(maxk,0,-1):
                if words[i][-k:]==words[j][:k]:ov[i][j]=k;break
    full=(1<<n)-1; INF=float('-inf')
    dp=[[INF]*n for _ in range(1<<n)]; par=[[-1]*n for _ in range(1<<n)]
    for i in range(n):dp[1<<i][i]=0
    for mask in range(1,1<<n):
        for i in range(n):
            if dp[mask][i]==INF or not(mask&(1<<i)):continue
            for j in range(n):
                if mask&(1<<j):continue
                nm=mask|(1<<j)
                if dp[nm][j]<dp[mask][i]+ov[i][j]:
                    dp[nm][j]=dp[mask][i]+ov[i][j];par[nm][j]=i
    last=max(range(n),key=lambda i:dp[full][i])
    # reconstruct omitted for brevity
    return ""`}})]})}const J=[{id:"fundamentals",label:"Bitmask Fundamentals"},{id:"tsp",label:"TSP — Canonical DP"},{id:"applications",label:"More Applications"},{id:"problems",label:"Problems"}];function et(){const[l,r]=_.useState("fundamentals"),e={fundamentals:t.jsx(X,{}),tsp:t.jsx(V,{}),applications:t.jsx(Y,{}),problems:t.jsx(Q,{})};return t.jsxs("div",{children:[t.jsxs("div",{className:"page-header",children:[t.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 26"}),t.jsx("h1",{className:"page-header-title",children:"Dynamic Programming — Bitmask"}),t.jsx("p",{className:"page-header-subtitle",children:"Set as Integer · Bit Operations · Subset Enumeration · TSP · Assignment · Hamiltonian Paths · Tiling · Min Edge Deletion · LC 526, 698, 847, 943"})]}),t.jsx(W,{tabs:J,active:l,onChange:r}),t.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:e[l]}),t.jsx(O,{moduleId:26})]})}export{et as default};
