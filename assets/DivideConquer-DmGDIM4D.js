import{r as v,j as e}from"./index-D9jkHkZY.js";import{S as D,N as I,d as C,H as c,P as u,a as p,M as g,Q as w,c as z,T as O,V as T}from"./SectionNav-BHzhBu3R.js";const q=[38,27,43,3,9,82,10];function _(r){if(r.length<=1)return{arr:r,left:null,right:null,merged:r};const a=Math.floor(r.length/2),n=_(r.slice(0,a)),l=_(r.slice(a)),i=[];let t=0,o=0;for(;t<n.merged.length&&o<l.merged.length;)i.push(n.merged[t]<=l.merged[o]?n.merged[t++]:l.merged[o++]);for(;t<n.merged.length;)i.push(n.merged[t++]);for(;o<l.merged.length;)i.push(l.merged[o++]);return{arr:r,left:n,right:l,merged:i}}const P=_(q),A=[{phase:"split",desc:"Split: x=1234 → high_x=12, low_x=34.  y=5678 → high_y=56, low_y=78.  base=10², n/2=2.",highlight:"split"},{phase:"z2",desc:"z2 = high_x × high_y = 12 × 56. Recurse. Result = 672.",highlight:"z2"},{phase:"z0",desc:"z0 = low_x × low_y = 34 × 78. Recurse. Result = 2652.",highlight:"z0"},{phase:"z1",desc:"z1 = (high_x+low_x)×(high_y+low_y) − z2 − z0 = (46×134) − 672 − 2652 = 6164 − 3324 = 2840. ONE recursive multiply!",highlight:"z1"},{phase:"combine",desc:"Result = z2×base² + z1×base + z0 = 672×10000 + 2840×100 + 2652 = 6720000 + 284000 + 2652 = 7006652.",highlight:"combine"},{phase:"verify",desc:"Verify: 1234 × 5678 = 7006652 ✓. Naive needs 4 multiplies; Karatsuba needs 3. Savings compound: T(n) = 3T(n/2) → O(n^1.585).",highlight:"done"}],F=[{rec:"T(n) = 2T(n/2) + O(n)",a:2,b:2,f:"n",case:2,result:"O(n log n)",example:"Merge Sort"},{rec:"T(n) = T(n/2) + O(1)",a:1,b:2,f:"1",case:2,result:"O(log n)",example:"Binary Search"},{rec:"T(n) = 2T(n/2) + O(1)",a:2,b:2,f:"1",case:1,result:"O(n)",example:"BST traversal"},{rec:"T(n) = 4T(n/2) + O(n²)",a:4,b:2,f:"n²",case:2,result:"O(n² log n)",example:"(contrived)"},{rec:"T(n) = 4T(n/2) + O(n)",a:4,b:2,f:"n",case:1,result:"O(n²)",example:"(contrived)"},{rec:"T(n) = 8T(n/2) + O(n²)",a:8,b:2,f:"n²",case:1,result:"O(n³)",example:"Naive matmul"},{rec:"T(n) = 3T(n/2) + O(n)",a:3,b:2,f:"n",case:1,result:"O(n^1.585)",example:"Karatsuba"},{rec:"T(n) = 2T(n/2) + O(n log n)",a:2,b:2,f:"n log n",case:3,result:"O(n log² n)",example:"(rare)"}];function $(){const[r,a]=v.useState(2),[n,l]=v.useState(2),[i,t]=v.useState("n"),o={1:"O(1)",n:"O(n)",nlogn:"O(n log n)",n2:"O(n²)",n3:"O(n³)"},m={1:0,n:1,nlogn:1.001,n2:2,n3:3},s=Math.log(r)/Math.log(n),h=m[i];let y=0,x="",d="";const j=.01;h<s-j?(y=1,x=`O(n^${s.toFixed(3)})`,d=`f(n) = ${o[i]} is polynomially SMALLER than n^log_${n}(${r}) ≈ n^${s.toFixed(3)} → dominated by n^log_b(a)`):h>s+j?(y=3,x=`O(${o[i].replace("O(","").replace(")","")})`,d=`f(n) = ${o[i]} is polynomially LARGER than n^log_${n}(${r}) ≈ n^${s.toFixed(3)} → dominated by f(n) (check regularity condition)`):(y=2,x=`O(${o[i].replace("O(","").replace(")","")} × log n)`,d=`f(n) = ${o[i]} is EQUAL to n^log_${n}(${r}) ≈ n^${s.toFixed(3)} → multiply by log n`);const b={1:"info",2:"success",3:"warning"}[y]||"info";return e.jsxs(T,{children:[e.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"10px 14px",fontFamily:"var(--font-mono)",fontSize:14,lineHeight:2,marginBottom:14},children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"T(n)"}),e.jsx("span",{style:{color:"#7A8599"},children:" = "}),e.jsx("span",{style:{color:"#CE9178",fontWeight:700},children:r}),e.jsx("span",{style:{color:"#9CDCFE"},children:"·T(n/"}),e.jsx("span",{style:{color:"#4EC9B0",fontWeight:700},children:n}),e.jsx("span",{style:{color:"#9CDCFE"},children:")"}),e.jsx("span",{style:{color:"#7A8599"},children:" + "}),e.jsx("span",{style:{color:"#DCDCAA",fontWeight:700},children:o[i]}),e.jsxs("span",{style:{color:"#6A9955",fontSize:12,marginLeft:12},children:["  // log_",n,"(a) = log_",n,"(",r,") ≈ ",s.toFixed(3)]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14},children:[[["a (# sub-problems)",r,a,1,16,1],["b (split factor)",n,l,2,8,1]].map(([f,S,R,B,L,M])=>e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginBottom:4},children:[f," = ",e.jsx("strong",{style:{fontFamily:"var(--font-mono)"},children:S})]}),e.jsx("input",{type:"range",min:B,max:L,step:M,value:S,onChange:E=>R(+E.target.value),style:{width:"100%"}})]},f)),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginBottom:4},children:"f(n) — work per level"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:3},children:Object.entries(o).map(([f,S])=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:12},children:[e.jsx("input",{type:"radio",value:f,checked:i===f,onChange:()=>t(f)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:i===f?"var(--color-text-info)":"var(--color-text-secondary)"},children:S})]},f))})]})]}),e.jsxs("div",{style:{padding:"12px 14px",background:`var(--color-background-${b})`,border:`1px solid var(--color-border-${b})`,borderRadius:"var(--border-radius-md)"},children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center",marginBottom:6},children:[e.jsxs("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-border-${b})22`,color:`var(--color-text-${b})`,border:`1px solid var(--color-border-${b})`},children:["Case ",y]}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:15,fontWeight:700,color:`var(--color-text-${b})`},children:["T(n) = ",x]})]}),e.jsx("div",{style:{fontSize:12.5,color:`var(--color-text-${b})`,lineHeight:1.6},children:d})]})]})}function N(){const[r,a]=v.useState(!1),n=({arr:i,color:t="secondary",small:o=!1})=>e.jsx("div",{style:{display:"flex",gap:2,flexWrap:"wrap",justifyContent:"center"},children:i.map((m,s)=>e.jsx("div",{style:{minWidth:o?22:26,height:o?22:26,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,border:`1px solid var(--color-border-${t})`,background:`var(--color-background-${t})`,fontFamily:"var(--font-mono)",fontSize:o?10:12,fontWeight:600,color:`var(--color-text-${t})`},children:m},s))}),l=({node:i,level:t=0})=>{if(!i)return null;const o=!i.left&&!i.right;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:0,margin:"0 4px"},children:[e.jsx("div",{style:{padding:"6px 8px",borderRadius:6,border:`1px solid ${o?"var(--color-border-success)":"var(--color-border-secondary)"}`,background:o?"var(--color-background-success)":"var(--color-background-secondary)",marginBottom:3},children:e.jsx(n,{arr:r&&!o?i.merged:i.arr,color:o?"success":r?"info":"secondary",small:t>1})}),(i.left||i.right)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:1,height:10,background:"var(--color-border-tertiary)"}}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"flex-start"},children:[i.left&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("div",{style:{width:1,height:8,background:"var(--color-border-tertiary)"}}),e.jsx(l,{node:i.left,level:t+1})]}),i.right&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("div",{style:{width:1,height:8,background:"var(--color-border-tertiary)"}}),e.jsx(l,{node:i.right,level:t+1})]})]})]})]})};return e.jsxs(T,{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)"},children:"View:"}),[["Divide (original)",!1],["Conquer (merged)",!0]].map(([i,t])=>e.jsx("button",{onClick:()=>a(t),style:{padding:"4px 12px",border:"1px solid",borderColor:r===t?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:r===t?"var(--color-background-info)":"transparent",color:r===t?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:i},i)),e.jsx("div",{style:{marginLeft:"auto",display:"flex",gap:12,fontSize:11},children:[{c:"success",l:"Leaf (base case)"},{c:"info",l:"Merged result"},{c:"secondary",l:"Sub-problem"}].map(({c:i,l:t})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("div",{style:{width:8,height:8,borderRadius:2,background:`var(--color-background-${i})`,border:`1px solid var(--color-border-${i})`}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:t})]},t))})]}),e.jsx("div",{style:{overflowX:"auto",paddingBottom:8},children:e.jsx("div",{style:{display:"flex",justifyContent:"center",minWidth:"fit-content"},children:e.jsx(l,{node:P})})}),e.jsxs(C,{color:"info",icon:"ti-math",children:["Each level does O(n) work (merging). There are O(log n) levels. Total: ",e.jsx("strong",{children:"O(n log n)"})," — the same recurrence T(n) = 2T(n/2) + O(n), solved by Master Theorem Case 2."]})]})}function W(){const[r,a]=v.useState(0),n=A[r],i={split:"warning",z2:"info",z0:"success",z1:"purple",combine:"success",done:"success"}[n.phase]||"info",t=({label:o,value:m,highlighted:s,color:h="info"})=>e.jsxs("div",{style:{padding:"8px 12px",borderRadius:"var(--border-radius-md)",border:`1px solid ${s?`var(--color-border-${h})`:"var(--color-border-secondary)"}`,background:s?`var(--color-background-${h})`:"var(--color-background-secondary)",transition:"all 0.2s",minWidth:90,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:s?`var(--color-text-${h})`:"var(--color-text-tertiary)",marginBottom:3},children:o}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:s?`var(--color-text-${h})`:"var(--color-text-secondary)"},children:m})]});return e.jsxs(T,{children:[e.jsxs("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:[e.jsx("span",{style:{padding:"1px 8px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${i})`,color:`var(--color-text-${i})`,border:`1px solid var(--color-border-${i})`,marginRight:8},children:n.phase}),n.desc]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,justifyContent:"center"},children:[e.jsx(t,{label:"1234 × 5678",value:"?",highlighted:!1}),e.jsx(t,{label:"high_x",value:"12",highlighted:n.phase==="split",color:"warning"}),e.jsx(t,{label:"low_x",value:"34",highlighted:n.phase==="split",color:"warning"}),e.jsx(t,{label:"high_y",value:"56",highlighted:n.phase==="split",color:"warning"}),e.jsx(t,{label:"low_y",value:"78",highlighted:n.phase==="split",color:"warning"})]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,justifyContent:"center"},children:[e.jsx(t,{label:"z2 = 12×56",value:["z2","combine","done","z1"].includes(n.phase)?"672":"?",highlighted:n.phase==="z2",color:"info"}),e.jsx(t,{label:"z0 = 34×78",value:["z0","combine","done","z1"].includes(n.phase)?"2652":"?",highlighted:n.phase==="z0",color:"success"}),e.jsx(t,{label:"z1 (key!)",value:["z1","combine","done"].includes(n.phase)?"2840":"?",highlighted:n.phase==="z1",color:"purple"}),e.jsx(t,{label:"RESULT",value:["combine","done"].includes(n.phase)?"7006652":"?",highlighted:n.phase==="combine"||n.phase==="done",color:"success"})]}),e.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"9px 14px",fontFamily:"var(--font-mono)",fontSize:11.5,lineHeight:1.85,marginBottom:14},children:[e.jsx("div",{style:{color:"#6A9955"},children:"// Karatsuba: 3 recursive multiplies instead of 4 (naive)"}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"z2"}),e.jsx("span",{style:{color:"#7A8599"},children:" = high_x × high_y"}),e.jsx("span",{style:{color:"#6A9955"},children:"   // 1 multiply"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#4EC9B0"},children:"z0"}),e.jsx("span",{style:{color:"#7A8599"},children:" = low_x  × low_y"}),e.jsx("span",{style:{color:"#6A9955"},children:"   // 1 multiply"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#C586C0"},children:"z1"}),e.jsx("span",{style:{color:"#7A8599"},children:" = (hx+lx)×(hy+ly) − z2 − z0"}),e.jsx("span",{style:{color:"#6A9955"},children:"   // 1 multiply (saves 1!)"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#DCDCAA"},children:"res"}),e.jsx("span",{style:{color:"#7A8599"},children:" = z2×base² + z1×base + z0"})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,r-1)),r===0],["Next →",()=>a(Math.min(A.length-1,r+1)),r===A.length-1]].map(([o,m,s])=>e.jsx("button",{onClick:m,disabled:s,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:s?"not-allowed":"pointer",fontSize:12,opacity:s?.4:1},children:o},o)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r+1,"/",A.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const H={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function k({num:r,title:a,difficulty:n,tags:l=[],statement:i,constraints:t=[],examples:o=[],approach:m,code:s}){const[h,y]=v.useState(!1),x=H[n]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",r]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:a})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[l.map(d=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:d},d)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${x})`,color:`var(--color-text-${x})`,border:`1px solid var(--color-border-${x})`},children:n})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:i}}),t.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:t.map((d,j)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:d},j))})]}),o.length>0&&e.jsx("div",{style:{marginBottom:14},children:o.map((d,j)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",j+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:d.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:d.output})]}),d.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:d.note})]},j))}),e.jsxs("button",{onClick:()=>y(!h),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:h?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${h?"eye-off":"bulb"}`}),h?"Hide Solution":"Show Approach & Solution"]}),h&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),m]}),e.jsx(p,{children:s})]})]})]})}function Q(){return e.jsxs("div",{children:[e.jsxs(C,{color:"info",icon:"ti-git-fork",children:[e.jsx("strong",{children:"Divide and Conquer:"})," Break a problem into ",e.jsx("em",{children:"independent"})," sub-problems of the same type, solve them recursively, then combine their solutions. The three-step blueprint: ",e.jsx("strong",{children:"Divide"})," (split into sub-problems) → ",e.jsx("strong",{children:"Conquer"})," (solve recursively) → ",e.jsx("strong",{children:"Combine"})," (merge solutions)."]}),e.jsx(c,{children:"The Template"}),e.jsx(p,{children:{cpp:`// Generic D&C template
T solve(Problem P) {
    // ── Base case: small enough to solve directly ──────
    if (P.size() <= THRESHOLD) return bruteForce(P);

    // ── Divide ──────────────────────────────────────────
    auto [P1, P2, ..., Pk] = divide(P);

    // ── Conquer: solve sub-problems recursively ─────────
    T s1 = solve(P1), s2 = solve(P2), ..., sk = solve(Pk);

    // ── Combine: merge sub-solutions ────────────────────
    return combine(s1, s2, ..., sk);
}`,python:`def solve(problem):
    # Base case
    if len(problem) <= THRESHOLD:
        return brute_force(problem)
    # Divide
    p1, p2 = divide(problem)
    # Conquer
    s1, s2 = solve(p1), solve(p2)
    # Combine
    return combine(s1, s2)`}}),e.jsx(c,{children:"Solving Recurrences — The Master Theorem"}),e.jsxs(u,{children:["The Master Theorem gives closed-form solutions for recurrences of the form ",e.jsx(g,{children:String.raw`T(n) = aT(n/b) + f(n)`}),", where ",e.jsx(g,{children:String.raw`a \geq 1`})," sub-problems of size ",e.jsx(g,{children:String.raw`n/b`})," are solved recursively and ",e.jsx(g,{children:String.raw`f(n)`})," is the work per level. The three cases compare ",e.jsx(g,{children:String.raw`f(n)`})," against ",e.jsx(g,{children:String.raw`n^{\log_b a}`}),"."]}),e.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"14px 16px",fontFamily:"var(--font-mono)",fontSize:12.5,lineHeight:2.1,marginBottom:12},children:[e.jsx("div",{style:{color:"#6A9955"},children:"// T(n) = a·T(n/b) + f(n)    where  a ≥ 1, b > 1"}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"Case 1:"}),e.jsx("span",{style:{color:"#7A8599"},children:"  f(n) = O(n^{log_b(a) - ε})  →  "}),e.jsx("span",{style:{color:"#4EC9B0",fontWeight:700},children:"T(n) = Θ(n^log_b(a))"}),e.jsx("span",{style:{color:"#6A9955"},children:"   // top-heavy: recursive calls dominate"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#DCDCAA"},children:"Case 2:"}),e.jsx("span",{style:{color:"#7A8599"},children:"  f(n) = Θ(n^log_b(a))       →  "}),e.jsx("span",{style:{color:"#DCDCAA",fontWeight:700},children:"T(n) = Θ(n^log_b(a) × log n)"}),e.jsx("span",{style:{color:"#6A9955"},children:"   // balanced: multiply by log n"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#CE9178"},children:"Case 3:"}),e.jsx("span",{style:{color:"#7A8599"},children:"  f(n) = Ω(n^{log_b(a) + ε})  →  "}),e.jsx("span",{style:{color:"#CE9178",fontWeight:700},children:"T(n) = Θ(f(n))"}),e.jsx("span",{style:{color:"#6A9955"},children:"   // bottom-heavy: combine step dominates"})]})]}),e.jsx(c,{children:"Master Theorem Interactive Calculator"}),e.jsxs(u,{children:["Adjust ",e.jsx(z,{children:"a"}),", ",e.jsx(z,{children:"b"}),", and ",e.jsx(z,{children:"f(n)"})," below. The calculator instantly applies all three cases and shows which dominates."]}),e.jsx($,{}),e.jsx(c,{children:"Master Theorem Reference"}),e.jsx(O,{heads:["Recurrence","a","b","Case","Result","Algorithm"],rows:F.map(r=>[r.rec,r.a,r.b,r.case,r.result,r.example])}),e.jsx(w,{q:"What does 'polynomially smaller/larger' mean in the Master Theorem cases?",a:"'Polynomially smaller' means f(n) = O(n^(log_b(a) − ε)) for some constant ε > 0 — not just smaller, but smaller by at least a polynomial factor. Similarly, 'polynomially larger' means Ω(n^(log_b(a) + ε)). This distinction matters because f(n) = n^log_b(a) / log n is technically smaller than n^log_b(a) but not polynomially smaller — it falls into Case 2. The Master Theorem doesn't cover all cases — e.g., T(n) = 2T(n/2) + n/log n falls in a gap between Cases 1 and 2."}),e.jsx(w,{q:"Why is the D&C paradigm typically more efficient than brute force?",a:"D&C reduces large problems to smaller independent sub-problems, which are solved recursively. The key gain: when sub-problems are truly independent (no shared state), the combine step is cheap (O(n) or O(1)). This leads to O(n log n) algorithms instead of O(n²). The recursive structure also naturally exposes optimal substructure. However, D&C requires O(log n) extra space for the call stack, and the combine step must be efficient for the gains to materialize."})]})}function K(){return e.jsxs("div",{children:[e.jsx(c,{children:"Merge Sort — The Canonical D&C Algorithm"}),e.jsx(u,{children:"Split the array in half, sort each half recursively, merge the two sorted halves in O(n). The D&C tree has O(log n) levels, each doing O(n) work total — giving the O(n log n) guarantee regardless of input."}),e.jsx(N,{}),e.jsx(p,{children:{cpp:`void mergeSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;                        // base case: single element
    int mid = lo + (hi - lo) / 2;
    mergeSort(arr, lo, mid);                     // DIVIDE & CONQUER left
    mergeSort(arr, mid + 1, hi);                 // DIVIDE & CONQUER right
    merge(arr, lo, mid, hi);                     // COMBINE: merge sorted halves
}

void merge(vector<int>& arr, int lo, int mid, int hi) {
    vector<int> tmp;
    int i = lo, j = mid + 1;
    while (i <= mid && j <= hi)
        tmp.push_back(arr[i] <= arr[j] ? arr[i++] : arr[j++]);
    while (i <= mid)  tmp.push_back(arr[i++]);
    while (j <= hi)   tmp.push_back(arr[j++]);
    for (int k = 0; k < tmp.size(); k++) arr[lo + k] = tmp[k];
}`,python:`def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    L = merge_sort(arr[:mid])
    R = merge_sort(arr[mid:])
    i = j = 0; result = []
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: result.append(L[i]); i += 1
        else:             result.append(R[j]); j += 1
    return result + L[i:] + R[j:]`}}),e.jsx(c,{children:"Counting Inversions — Augmented Merge Sort"}),e.jsx(u,{children:"An inversion is a pair (i,j) where i < j but arr[i] > arr[j]. Count all inversions in O(n log n) by augmenting the merge step: when a right-half element is placed before left-half elements, all remaining left-half elements form inversions with it."}),e.jsx(p,{children:{cpp:`long long mergeCount(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return 0;
    int mid = lo + (hi - lo) / 2;
    long long inv = mergeCount(arr, lo, mid) + mergeCount(arr, mid + 1, hi);

    vector<int> tmp; int i = lo, j = mid + 1;
    while (i <= mid && j <= hi) {
        if (arr[i] <= arr[j]) {
            tmp.push_back(arr[i++]);
        } else {
            inv += (mid - i + 1);    // ALL remaining left elements form inversions with arr[j]
            tmp.push_back(arr[j++]);
        }
    }
    while (i <= mid) tmp.push_back(arr[i++]);
    while (j <= hi)  tmp.push_back(arr[j++]);
    for (int k = 0; k < tmp.size(); k++) arr[lo + k] = tmp[k];
    return inv;
}
// [2,4,1,3,5] → 3 inversions: (2,1),(4,1),(4,3)`,python:`def merge_count(arr):
    if len(arr) <= 1: return arr, 0
    mid = len(arr) // 2
    L, lc = merge_count(arr[:mid])
    R, rc = merge_count(arr[mid:])
    inv, i, j, result = lc + rc, 0, 0, []
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: result.append(L[i]); i += 1
        else:
            inv += len(L) - i     # all L[i:] form inversions with R[j]
            result.append(R[j]); j += 1
    return result + L[i:] + R[j:], inv`}}),e.jsx(c,{children:"Merge Two Sorted Arrays — O(n+m)"}),e.jsx(p,{children:{cpp:`vector<int> mergeSorted(vector<int>& A, vector<int>& B) {
    vector<int> result;
    int i = 0, j = 0;
    while (i < A.size() && j < B.size())
        result.push_back(A[i] <= B[j] ? A[i++] : B[j++]);
    while (i < A.size()) result.push_back(A[i++]);
    while (j < B.size()) result.push_back(B[j++]);
    return result;
}`,python:`def merge_sorted(A, B):
    result = []; i = j = 0
    while i < len(A) and j < len(B):
        if A[i] <= B[j]: result.append(A[i]); i += 1
        else:             result.append(B[j]); j += 1
    return result + A[i:] + B[j:]`}}),e.jsx(c,{children:"Intersection & Union of Two Sorted Arrays"}),e.jsx(p,{children:{cpp:`vector<int> intersection(vector<int>& A, vector<int>& B) {
    vector<int> res; int i = 0, j = 0;
    while (i < A.size() && j < B.size()) {
        if      (A[i] == B[j]) { if (res.empty() || res.back() != A[i]) res.push_back(A[i]); i++; j++; }
        else if (A[i] <  B[j]) i++;
        else                   j++;
    }
    return res;
}

vector<int> unionSorted(vector<int>& A, vector<int>& B) {
    vector<int> res; int i = 0, j = 0;
    while (i < A.size() && j < B.size()) {
        int val = (A[i] <= B[j]) ? A[i++] : B[j++];
        if (res.empty() || res.back() != val) res.push_back(val);
    }
    while (i < A.size()) { if (res.back() != A[i]) res.push_back(A[i]); i++; }
    while (j < B.size()) { if (res.back() != B[j]) res.push_back(B[j]); j++; }
    return res;
}`,python:`def intersection(A, B):
    res = []; i = j = 0
    while i < len(A) and j < len(B):
        if   A[i] == B[j]: 
            if not res or res[-1] != A[i]: res.append(A[i])
            i += 1; j += 1
        elif A[i] < B[j]: i += 1
        else: j += 1
    return res

def union_sorted(A, B):
    res = []; i = j = 0
    while i < len(A) and j < len(B):
        val = A[i] if A[i] <= B[j] else B[j]
        if A[i] <= B[j]: i += 1
        else: j += 1
        if not res or res[-1] != val: res.append(val)
    for arr in (A[i:], B[j:]):
        for v in arr:
            if not res or res[-1] != v: res.append(v)
    return res`}}),e.jsx(w,{q:"Why does Merge Sort use O(n) extra space while Quick Sort uses O(1)?",a:"The merge step requires a temporary buffer to hold the merged sequence — you cannot merge in-place with O(1) space without destroying one of the sorted halves. This is fundamental: to merge A[lo..mid] and A[mid+1..hi], you need to read from both halves simultaneously while writing the result. In-place merge algorithms exist but run in O(n log n) instead of O(n). Quick Sort partitions in-place using only two pointers."})]})}function U(){return e.jsxs("div",{children:[e.jsx(c,{children:"Quick Sort — D&C via Partitioning"}),e.jsx(u,{children:"Choose a pivot, partition all elements into ≤ pivot (left) and ≥ pivot (right), then recursively sort both halves. Unlike Merge Sort, no combine step — partitioning is the work. Average O(n log n) with random pivots; worst case O(n²) with bad pivots (fixed by randomization)."}),e.jsx(p,{children:{cpp:`void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    // Randomize pivot to avoid worst case
    int pivIdx = lo + rand() % (hi - lo + 1);
    swap(arr[pivIdx], arr[hi]);

    // Lomuto partition
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++)
        if (arr[j] <= pivot) swap(arr[++i], arr[j]);
    swap(arr[++i], arr[hi]);          // place pivot at i

    quickSort(arr, lo, i - 1);        // CONQUER left
    quickSort(arr, i + 1, hi);        // CONQUER right
}`,python:`import random

def quick_sort(arr, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo >= hi: return
    # Randomize pivot
    pi = random.randint(lo, hi); arr[pi], arr[hi] = arr[hi], arr[pi]
    pivot, i = arr[hi], lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot: i += 1; arr[i], arr[j] = arr[j], arr[i]
    i += 1; arr[i], arr[hi] = arr[hi], arr[i]
    quick_sort(arr, lo, i - 1)
    quick_sort(arr, i + 1, hi)`}}),e.jsx(c,{children:"QuickSelect — Kth Smallest in Expected O(n)"}),e.jsx(u,{children:"Like Quick Sort but only recurse into the half containing rank k. After partition, if the pivot's rank equals k, return it. Expected O(n) — each partition discards expected half the elements. Median-of-medians guarantees worst-case O(n) but with large constants."}),e.jsx(p,{children:{cpp:`int quickSelect(vector<int>& arr, int lo, int hi, int k) {
    if (lo == hi) return arr[lo];
    // Randomized partition
    int pivIdx = lo + rand() % (hi - lo + 1);
    swap(arr[pivIdx], arr[hi]);
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++)
        if (arr[j] <= pivot) swap(arr[++i], arr[j]);
    swap(arr[++i], arr[hi]);    // pivot at index i

    int rank = i - lo + 1;     // rank of pivot within [lo..hi]
    if      (k == rank) return arr[i];
    else if (k <  rank) return quickSelect(arr, lo, i - 1, k);
    else                return quickSelect(arr, i + 1, hi, k - rank);
}
// quickSelect(arr, 0, n-1, 3) → 3rd smallest element`,python:`def quick_select(arr, lo, hi, k):
    if lo == hi: return arr[lo]
    pi = random.randint(lo, hi); arr[pi], arr[hi] = arr[hi], arr[pi]
    pivot, i = arr[hi], lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot: i += 1; arr[i], arr[j] = arr[j], arr[i]
    i += 1; arr[i], arr[hi] = arr[hi], arr[i]
    rank = i - lo + 1
    if   k == rank: return arr[i]
    elif k <  rank: return quick_select(arr, lo, i-1, k)
    else:           return quick_select(arr, i+1, hi, k-rank)`}}),e.jsx(c,{children:"Karatsuba Multiplication — O(n^1.585)"}),e.jsxs(u,{children:["Multiply two n-digit numbers. Naive long multiplication: O(n²). Karatsuba saves one recursive multiplication by computing z1 as ",e.jsx(z,{children:"(hi_x + lo_x)(hi_y + lo_y) - z2 - z0"})," instead of directly. Recurrence: T(n) = 3T(n/2) + O(n) → O(n^log₂3) ≈ O(n^1.585)."]}),e.jsx(W,{}),e.jsx(p,{children:{cpp:`// Karatsuba for large integer strings — simplified version
// For production use big-integer libraries; this shows the D&C structure
long long karatsuba(long long x, long long y) {
    if (x < 10 || y < 10) return x * y;        // base case
    int n = max(to_string(x).size(), to_string(y).size());
    int half = n / 2;
    long long base = pow(10, half);

    long long hx = x / base, lx = x % base;    // DIVIDE x
    long long hy = y / base, ly = y % base;    // DIVIDE y

    long long z2 = karatsuba(hx, hy);          // CONQUER: 1 recursive call
    long long z0 = karatsuba(lx, ly);          // CONQUER: 2nd recursive call
    long long z1 = karatsuba(hx+lx, hy+ly) - z2 - z0;  // CONQUER: 3rd call (key saving!)

    return z2 * base * base + z1 * base + z0;  // COMBINE
}`,python:`def karatsuba(x, y):
    if x < 10 or y < 10: return x * y
    n = max(len(str(x)), len(str(y)))
    half = n // 2; base = 10 ** half
    hx, lx = x // base, x % base
    hy, ly = y // base, y % base
    z2 = karatsuba(hx, hy)
    z0 = karatsuba(lx, ly)
    z1 = karatsuba(hx+lx, hy+ly) - z2 - z0
    return z2 * base*base + z1 * base + z0`}}),e.jsx(O,{heads:["Algorithm","Recurrence","Complexity","vs Naive"],rows:[["Naive multiplication","T(n) = 4T(n/2) + O(n)","O(n²)","Baseline"],["Karatsuba","T(n) = 3T(n/2) + O(n)","O(n^1.585)","~25% faster for n=1000"],["Toom-Cook 3-way","T(n) = 5T(n/3) + O(n)","O(n^1.465)","Even fewer multiplications"],["FFT-based (Schönhage–Strassen)","O(n log n log log n)","O(n log n log log n)","Optimal for large n"]]}),e.jsx(w,{q:"Why is QuickSelect O(n) on average but O(n²) worst case?",a:"Each partition places the pivot in its final sorted position. With a random pivot, the expected rank of the pivot is somewhere in the middle, discarding expected half the remaining elements. Summing: n + n/2 + n/4 + ... = 2n → O(n). Worst case: pivot is always the minimum or maximum, keeping n-1 elements for the next call — T(n) = T(n-1) + O(n) = O(n²). Randomizing the pivot reduces worst-case probability to near zero."}),e.jsx(w,{q:"Why does Karatsuba use exactly 3 recursive multiplications and not fewer?",a:"Naive grade-school multiplication of two n/2-digit numbers requires 4 multiplications: hx×hy, hx×ly, lx×hy, lx×ly. Karatsuba observes that hx×ly + lx×hy = (hx+lx)(hy+ly) - hx×hy - lx×ly = z1. So instead of computing the two 'cross' terms separately (2 multiplications), compute their sum via ONE multiplication and subtract the already-computed z2 and z0. This reduces 4 multiplications to 3, and T(n) = 4T(n/2) → T(n) = 3T(n/2) — a dramatic asymptotic improvement."})]})}function V(){return e.jsxs("div",{children:[e.jsx(c,{children:"Closest Pair of Points — O(n log n)"}),e.jsx(u,{children:"Given n points in 2D, find the pair with minimum Euclidean distance. Brute force: O(n²). D&C: divide by median x-coordinate, solve each half recursively, then check the strip of width 2δ around the dividing line. Crucially: at most 7 points fall within any δ×2δ strip on each side — so the strip check is O(n)."}),e.jsx(p,{children:{cpp:`struct Point { double x, y; };
double dist(Point& a, Point& b) { return sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)); }

double closestPairRec(vector<Point>& pts, int lo, int hi) {
    if (hi - lo <= 2) {
        double d = DBL_MAX;
        for (int i = lo; i < hi; i++)
            for (int j = i+1; j <= hi; j++) d = min(d, dist(pts[i], pts[j]));
        sort(pts.begin()+lo, pts.begin()+hi+1, [](auto&a,auto&b){return a.y<b.y;});
        return d;
    }
    int mid = (lo + hi) / 2;
    double midX = pts[mid].x;
    double delta = min(closestPairRec(pts, lo, mid), closestPairRec(pts, mid+1, hi));

    // Merge by y (for strip check)
    inplace_merge(pts.begin()+lo, pts.begin()+mid+1, pts.begin()+hi+1,
                  [](auto&a,auto&b){return a.y<b.y;});

    // Check strip — at most 7 points per 2δ window (geometric packing argument)
    vector<Point> strip;
    for (int i = lo; i <= hi; i++)
        if (abs(pts[i].x - midX) < delta) strip.push_back(pts[i]);
    for (int i = 0; i < strip.size(); i++)
        for (int j = i+1; j < strip.size() && strip[j].y - strip[i].y < delta; j++)
            delta = min(delta, dist(strip[i], strip[j]));
    return delta;
}`,python:`import math, copy

def closest_pair(pts):
    def dist(a, b): return math.hypot(a[0]-b[0], a[1]-b[1])

    def rec(sorted_x):
        n = len(sorted_x)
        if n <= 3:
            mn = min(dist(sorted_x[i], sorted_x[j]) for i in range(n) for j in range(i+1,n))
            return mn, sorted(sorted_x, key=lambda p: p[1])
        mid = n // 2; mid_x = sorted_x[mid][0]
        dl, left_y  = rec(sorted_x[:mid])
        dr, right_y = rec(sorted_x[mid:])
        delta = min(dl, dr)
        merged = sorted(left_y + right_y, key=lambda p: p[1])
        strip = [p for p in merged if abs(p[0]-mid_x) < delta]
        for i in range(len(strip)):
            for j in range(i+1, len(strip)):
                if strip[j][1] - strip[i][1] >= delta: break
                delta = min(delta, dist(strip[i], strip[j]))
        return delta, merged

    pts_x = sorted(pts)
    return rec(pts_x)[0]`}}),e.jsx(c,{children:"Fast Power (Exponentiation by Squaring)"}),e.jsxs(u,{children:["Compute ",e.jsx(g,{children:String.raw`x^n`})," in O(log n) multiplications using D&C: ",e.jsx(g,{children:String.raw`x^n = (x^{n/2})^2`})," if n is even, or ",e.jsx(g,{children:String.raw`x \cdot (x^{(n-1)/2})^2`})," if n is odd. This halves the problem at each step."]}),e.jsx(p,{children:{cpp:`long long fastPow(long long x, long long n, long long mod) {
    long long result = 1; x %= mod;
    while (n > 0) {
        if (n & 1) result = result * x % mod;   // n is odd: multiply current x
        x = x * x % mod;                         // square x
        n >>= 1;                                  // n /= 2
    }
    return result;
}
// fastPow(2, 10, 1e9+7) = 1024  in O(log 10) = 4 squarings`,python:`def fast_pow(x, n, mod):
    result = 1; x %= mod
    while n > 0:
        if n & 1: result = result * x % mod
        x = x * x % mod
        n >>= 1
    return result
# fast_pow(2, 10, 10**9+7) == 1024`}}),e.jsx(c,{children:"Skyline Problem"}),e.jsx(u,{children:'Given a list of buildings [left, right, height], compute the "skyline" — the contour outline viewed from a distance. D&C: split buildings into two halves, get skylines for each half recursively, then merge two skylines in O(n) using a two-pointer approach.'}),e.jsx(p,{children:{cpp:`using Skyline = vector<pair<int,int>>;   // {x, height}

Skyline merge(Skyline& L, Skyline& R) {
    Skyline result; int i=0,j=0,lh=0,rh=0;
    while (i < L.size() && j < R.size()) {
        int x, h;
        if (L[i].first < R[j].first) { x=L[i].first; lh=L[i].second; i++; }
        else if (L[i].first > R[j].first){ x=R[j].first; rh=R[j].second; j++; }
        else { x=L[i].first; lh=L[i].second; rh=R[j].second; i++; j++; }
        h = max(lh, rh);
        if (result.empty() || result.back().second != h)
            result.push_back({x, h});
    }
    while (i < L.size()) { result.push_back(L[i++]); }
    while (j < R.size()) { result.push_back(R[j++]); }
    return result;
}`,python:`def merge_skylines(L, R):
    result = []; i = j = lh = rh = 0
    while i < len(L) and j < len(R):
        if   L[i][0] < R[j][0]: x = L[i][0]; lh = L[i][1]; i += 1
        elif L[i][0] > R[j][0]: x = R[j][0]; rh = R[j][1]; j += 1
        else: x = L[i][0]; lh = L[i][1]; rh = R[j][1]; i += 1; j += 1
        h = max(lh, rh)
        if not result or result[-1][1] != h: result.append((x, h))
    return result + L[i:] + R[j:]`}}),e.jsx(w,{q:"In the closest pair algorithm, why can there be at most 7 points in the 2δ×δ strip on each side?",a:"Within the δ-half-strip (δ wide on one side), any two points must be at least δ apart (by definition — δ is the current minimum distance). This means points cannot be closer than δ in either direction. A δ×2δ rectangle can contain at most 8 grid-aligned non-overlapping δ/2-radius circles. By a packing argument, at most 7 points from the same side fit in the 2δ×δ region. This bounds the inner loop of the strip check to at most 7 comparisons per point, making the strip check O(n) total."})]})}function G(){return e.jsxs("div",{children:[e.jsx(C,{color:"purple",icon:"ti-tournament",children:"6 D&C problems — from classic merge applications to combinatorial and matrix problems."}),e.jsx(k,{num:1,title:"Sort an Array (Merge Sort)",difficulty:"LC Medium",tags:["LC 912","Merge Sort"],statement:"Given an array of integers, sort it using <strong>merge sort</strong> and return the sorted array. Implement the D&C approach explicitly — not std::sort.",constraints:["1 ≤ n ≤ 5×10⁴","−5×10⁴ ≤ nums[i] ≤ 5×10⁴","O(n log n) required"],examples:[{input:"[5,2,3,1]",output:"[1,2,3,5]"},{input:"[5,1,1,2,0,0]",output:"[0,0,1,1,2,5]"}],approach:"Divide array at midpoint, recursively sort both halves, merge in O(n). The merge step uses a temporary array and two-pointer approach. Base case: array of size ≤ 1 is already sorted. T(n) = 2T(n/2) + O(n) → O(n log n) by Master Theorem Case 2.",code:{cpp:`vector<int> sortArray(vector<int>& nums) {
    function<void(int,int)> ms=[&](int lo,int hi){
        if(lo>=hi)return;
        int mid=lo+(hi-lo)/2;
        ms(lo,mid); ms(mid+1,hi);
        vector<int> tmp; int i=lo,j=mid+1;
        while(i<=mid&&j<=hi) tmp.push_back(nums[i]<=nums[j]?nums[i++]:nums[j++]);
        while(i<=mid) tmp.push_back(nums[i++]);
        while(j<=hi)  tmp.push_back(nums[j++]);
        for(int k=0;k<tmp.size();k++) nums[lo+k]=tmp[k];
    };
    ms(0,nums.size()-1);
    return nums;
}`,python:`def sort_array(nums):
    def ms(a):
        if len(a)<=1: return a
        m=len(a)//2; L,R=ms(a[:m]),ms(a[m:])
        i=j=0; res=[]
        while i<len(L) and j<len(R):
            if L[i]<=R[j]: res.append(L[i]);i+=1
            else: res.append(R[j]);j+=1
        return res+L[i:]+R[j:]
    nums[:]=ms(nums); return nums`}}),e.jsx(k,{num:2,title:"Count Inversions",difficulty:"OA Hard",tags:["Augmented Merge Sort","Classic D&C"],statement:"Given an array, count the number of pairs (i, j) where i < j and arr[i] > arr[j]. These are called <strong>inversions</strong> — each represents an adjacent swap needed to sort the array.",constraints:["1 ≤ n ≤ 10⁵","0 ≤ arr[i] ≤ 10⁵","O(n log n) required"],examples:[{input:"[2,4,1,3,5]",output:"3",note:"Pairs: (2,1),(4,1),(4,3)"},{input:"[5,4,3,2,1]",output:"10",note:"n(n-1)/2 = 10"}],approach:"Augment merge sort: when merging left and right halves, whenever a right-half element is placed before left-half elements, add (mid - i + 1) to the inversion count — all remaining left-half elements form inversions with this right-half element. T(n) = 2T(n/2) + O(n) → O(n log n).",code:{cpp:`long long countInversions(vector<int>& arr) {
    long long inv=0;
    function<void(int,int)> ms=[&](int lo,int hi){
        if(lo>=hi)return;
        int mid=lo+(hi-lo)/2;
        ms(lo,mid); ms(mid+1,hi);
        vector<int> tmp; int i=lo,j=mid+1;
        while(i<=mid&&j<=hi){
            if(arr[i]<=arr[j]) tmp.push_back(arr[i++]);
            else{inv+=mid-i+1;tmp.push_back(arr[j++]);}
        }
        while(i<=mid) tmp.push_back(arr[i++]);
        while(j<=hi)  tmp.push_back(arr[j++]);
        for(int k=0;k<tmp.size();k++) arr[lo+k]=tmp[k];
    };
    ms(0,arr.size()-1); return inv;
}`,python:`def count_inversions(arr):
    inv=[0]
    def ms(a):
        if len(a)<=1: return a
        m=len(a)//2; L,R=ms(a[:m]),ms(a[m:])
        i=j=0; res=[]
        while i<len(L) and j<len(R):
            if L[i]<=R[j]: res.append(L[i]);i+=1
            else: inv[0]+=len(L)-i;res.append(R[j]);j+=1
        return res+L[i:]+R[j:]
    ms(arr); return inv[0]`}}),e.jsx(k,{num:3,title:"Find Kth Largest Element in Unsorted Array",difficulty:"LC Medium",tags:["LC 215","QuickSelect"],statement:"Given an integer array and integer k, return the <strong>kth largest</strong> element. Note: kth largest in sorted order, not kth distinct.",constraints:["1 ≤ k ≤ n ≤ 10⁴","−10⁴ ≤ nums[i] ≤ 10⁴","Expected O(n) average"],examples:[{input:"[3,2,1,5,6,4], k=2",output:"5"},{input:"[3,2,3,1,2,4,5,5,6], k=4",output:"4"}],approach:"QuickSelect: convert to kth-smallest (= (n-k+1)th smallest). Partition with random pivot. If pivot rank == target → return. If < target → search right half; else left half. Expected O(n) as each partition discards ~half the elements. Worst case O(n²) with unlucky pivots (rare with randomization).",code:{cpp:`int findKthLargest(vector<int>& nums, int k) {
    int target=nums.size()-k;
    int lo=0,hi=nums.size()-1;
    while(lo<hi){
        int pi=lo+rand()%(hi-lo+1);
        swap(nums[pi],nums[hi]);
        int piv=nums[hi],i=lo-1;
        for(int j=lo;j<hi;j++) if(nums[j]<=piv) swap(nums[++i],nums[j]);
        swap(nums[++i],nums[hi]);
        if(i==target)return nums[i];
        else if(i<target)lo=i+1; else hi=i-1;
    }
    return nums[lo];
}`,python:`import random
def find_kth_largest(nums, k):
    target = len(nums) - k
    def qs(lo, hi):
        if lo==hi: return nums[lo]
        pi=random.randint(lo,hi); nums[pi],nums[hi]=nums[hi],nums[pi]
        piv,i=nums[hi],lo-1
        for j in range(lo,hi):
            if nums[j]<=piv: i+=1;nums[i],nums[j]=nums[j],nums[i]
        i+=1;nums[i],nums[hi]=nums[hi],nums[i]
        if i==target: return nums[i]
        elif i<target: return qs(i+1,hi)
        else: return qs(lo,i-1)
    return qs(0,len(nums)-1)`}}),e.jsx(k,{num:4,title:"Median of Two Sorted Arrays",difficulty:"LC Hard",tags:["LC 4","Binary Search D&C"],statement:"Given two sorted arrays <code>nums1</code> of size m and <code>nums2</code> of size n, return the <strong>median</strong> of the combined sorted array. O(log(m+n)) time required.",constraints:["0 ≤ m, n ≤ 1000","−10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶","O(log(m+n)) required"],examples:[{input:"nums1=[1,3], nums2=[2]",output:"2.0",note:"Merged: [1,2,3] → median 2"},{input:"nums1=[1,2], nums2=[3,4]",output:"2.5",note:"Merged: [1,2,3,4] → (2+3)/2"}],approach:"Binary search on the smaller array. Find a partition point i in nums1 and derive j = (m+n+1)/2 - i in nums2. Check if partition is valid: max_left ≤ min_right on both sides. Adjust binary search based on which side violates the condition. O(log(min(m,n))) time.",code:{cpp:`double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
    if(A.size()>B.size()) swap(A,B);
    int m=A.size(),n=B.size(),half=(m+n+1)/2;
    int lo=0,hi=m;
    while(lo<=hi){
        int i=lo+(hi-lo)/2,j=half-i;
        int Al=i>0?A[i-1]:INT_MIN, Ar=i<m?A[i]:INT_MAX;
        int Bl=j>0?B[j-1]:INT_MIN, Br=j<n?B[j]:INT_MAX;
        if(Al<=Br&&Bl<=Ar){
            int left=max(Al,Bl);
            if((m+n)%2==1) return left;
            return (left+min(Ar,Br))/2.0;
        }else if(Al>Br) hi=i-1;
        else lo=i+1;
    }
    return -1;
}`,python:`def find_median_sorted_arrays(A, B):
    if len(A) > len(B): A, B = B, A
    m, n = len(A), len(B); half = (m+n+1)//2
    lo, hi = 0, m
    while lo <= hi:
        i = lo + (hi-lo)//2; j = half - i
        Al = A[i-1] if i>0 else float('-inf'); Ar = A[i] if i<m else float('inf')
        Bl = B[j-1] if j>0 else float('-inf'); Br = B[j] if j<n else float('inf')
        if Al<=Br and Bl<=Ar:
            left = max(Al,Bl)
            return left if (m+n)%2 else (left+min(Ar,Br))/2
        elif Al>Br: hi=i-1
        else: lo=i+1`}}),e.jsx(k,{num:5,title:"Power(x, n) — Fast Exponentiation",difficulty:"LC Medium",tags:["LC 50","Exponentiation by Squaring"],statement:"Implement <code>pow(x, n)</code> which calculates <code>x</code> raised to the power <code>n</code>. Handle negative exponents.",constraints:["-100 ≤ x ≤ 100","−2³¹ ≤ n ≤ 2³¹−1","O(log n) required"],examples:[{input:"x=2.0, n=10",output:"1024.0"},{input:"x=2.1, n=3",output:"9.26100..."},{input:"x=2.0, n=-2",output:"0.25"}],approach:"Exponentiation by squaring: x^n = (x²)^(n/2) for even n; x × (x²)^((n-1)/2) for odd n. Each step halves n → O(log n) total. Handle n < 0 by returning 1/pow(x, -n). Use long long for n to handle INT_MIN.",code:{cpp:`double myPow(double x, long long n) {
    if(n<0){x=1/x;n=-n;}
    double res=1;
    while(n>0){
        if(n&1) res*=x;
        x*=x; n>>=1;
    }
    return res;
}`,python:`def my_pow(x, n):
    if n < 0: x, n = 1/x, -n
    res = 1
    while n:
        if n & 1: res *= x
        x *= x; n >>= 1
    return res`}}),e.jsx(k,{num:6,title:"The Skyline Problem",difficulty:"LC Hard",tags:["LC 218","D&C Merge"],statement:"Given the positions and heights of buildings as <code>[left, right, height]</code>, return the <strong>skyline</strong> — a list of critical points [x, height] forming the silhouette outline.",constraints:["1 ≤ n ≤ 10⁴","0 ≤ left < right ≤ 2³¹","0 < height ≤ 2³¹"],examples:[{input:"[[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]",output:"[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]"}],approach:"D&C: split buildings in half, get skylines for each half recursively. Merge two skylines using a two-pointer approach: sweep x-coordinates from both, maintaining current height from each half, always taking max. Add to result when height changes. T(n) = 2T(n/2) + O(n) → O(n log n). Alternatively: use a max-heap with priority queue processing events left to right.",code:{cpp:`using Sky = vector<pair<int,int>>;
Sky merge(Sky L, Sky R) {
    Sky res; int i=0,j=0,lh=0,rh=0;
    while(i<L.size()&&j<R.size()){
        int x,h;
        if(L[i].first<R[j].first){x=L[i].first;lh=L[i].second;i++;}
        else if(L[i].first>R[j].first){x=R[j].first;rh=R[j].second;j++;}
        else{x=L[i].first;lh=L[i].second;rh=R[j].second;i++;j++;}
        h=max(lh,rh);
        if(res.empty()||res.back().second!=h) res.push_back({x,h});
    }
    while(i<L.size()) res.push_back(L[i++]);
    while(j<R.size()) res.push_back(R[j++]);
    return res;
}
vector<vector<int>> getSkyline(vector<vector<int>>& b) {
    function<Sky(int,int)> dc=[&](int lo,int hi)->Sky{
        if(lo==hi) return {{b[lo][0],b[lo][2]},{b[lo][1],0}};
        int mid=(lo+hi)/2;
        return merge(dc(lo,mid),dc(mid+1,hi));
    };
    auto s=dc(0,b.size()-1);
    vector<vector<int>> res;
    for(auto[x,h]:s) res.push_back({x,h});
    return res;
}`,python:`def get_skyline(buildings):
    def merge(L, R):
        res = []; i = j = lh = rh = 0
        while i < len(L) and j < len(R):
            if   L[i][0] < R[j][0]: x=L[i][0];lh=L[i][1];i+=1
            elif L[i][0] > R[j][0]: x=R[j][0];rh=R[j][1];j+=1
            else: x=L[i][0];lh=L[i][1];rh=R[j][1];i+=1;j+=1
            h=max(lh,rh)
            if not res or res[-1][1]!=h: res.append([x,h])
        return res+L[i:]+R[j:]
    def dc(lo, hi):
        if lo==hi: b=buildings[lo]; return [[b[0],b[2]],[b[1],0]]
        mid=(lo+hi)//2
        return merge(dc(lo,mid),dc(mid+1,hi))
    return dc(0,len(buildings)-1)`}})]})}const X=[{id:"foundations",label:"Foundations & Recurrences"},{id:"mergesort",label:"Merge Sort & Applications"},{id:"quick",label:"QuickSelect & Karatsuba"},{id:"advanced",label:"Closest Pair & Skyline"},{id:"problems",label:"Problems"}];function ee(){const[r,a]=v.useState("foundations"),n={foundations:e.jsx(Q,{}),mergesort:e.jsx(K,{}),quick:e.jsx(U,{}),advanced:e.jsx(V,{}),problems:e.jsx(G,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 13"}),e.jsx("h1",{className:"page-header-title",children:"Divide & Conquer"}),e.jsx("p",{className:"page-header-subtitle",children:"Master Theorem · Merge Sort · Inversions · QuickSelect · Karatsuba · Closest Pair · Fast Power · Skyline"})]}),e.jsx(D,{tabs:X,active:r,onChange:a}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:n[r]}),e.jsx(I,{moduleId:13})]})}export{ee as default};
