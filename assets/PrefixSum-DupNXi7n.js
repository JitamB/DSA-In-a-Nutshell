import{r as g,j as e}from"./index-D9jkHkZY.js";import{S as Q,N as U,d as S,c as l,H as p,P as m,a as h,T,Q as y,G,C as E,V as B}from"./SectionNav-BHzhBu3R.js";const O=[3,1,4,1,5,9,2,6],b=O.reduce((r,t,o)=>[...r,(r[o-1]??0)+t],[]),W=[[3,0,1,4],[5,6,3,2],[1,2,0,1],[4,3,2,3]],P=4,_=4,R=Array.from({length:P+1},()=>Array(_+1).fill(0));for(let r=1;r<=P;r++)for(let t=1;t<=_;t++)R[r][t]=W[r-1][t-1]+R[r-1][t]+R[r][t-1]-R[r-1][t-1];function V(){const r=O.length,[t,o]=g.useState(0),i=s=>s<=t,a=s=>s===t;return e.jsxs(B,{children:[e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.07em"},children:"arr[]"}),e.jsx("div",{style:{display:"flex",gap:4},children:O.map((s,n)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:a(n)?"var(--color-border-warning)":"var(--color-border-secondary)",background:a(n)?"var(--color-background-warning)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:a(n)?700:400,color:a(n)?"var(--color-text-warning)":"var(--color-text-primary)",transition:"all 0.15s"},children:s}),e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",n,"]"]})]},n))})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.07em"},children:"pref[]"}),e.jsx("div",{style:{display:"flex",gap:4},children:O.map((s,n)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:a(n)||i(n)?"var(--color-border-success)":"var(--color-border-tertiary)",background:a(n)?"var(--color-background-success)":i(n)?"rgba(78,201,176,0.08)":"var(--color-background-tertiary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:i(n)?700:400,color:i(n)?"var(--color-text-success)":"var(--color-text-tertiary)",transition:"all 0.15s"},children:i(n)?b[n]:"?"}),e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["p[",n,"]"]})]},n))})]}),e.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"10px 14px",fontFamily:"var(--font-mono)",fontSize:12.5,lineHeight:1.8,marginBottom:14},children:t===0?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"pref[0]"}),e.jsx("span",{style:{color:"#7A8599"},children:" = "}),e.jsx("span",{style:{color:"#CE9178"},children:"arr[0]"}),e.jsx("span",{style:{color:"#7A8599"},children:" = "}),e.jsx("span",{style:{color:"#4EC9B0",fontWeight:700},children:b[0]}),e.jsx("span",{style:{color:"#6A9955"},children:"   // base case"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("span",{style:{color:"#9CDCFE"},children:["pref[",t,"]"]}),e.jsxs("span",{style:{color:"#7A8599"},children:[" = pref[",t-1,"] + arr[",t,"] = "]}),e.jsx("span",{style:{color:"#4EC9B0"},children:b[t-1]}),e.jsx("span",{style:{color:"#7A8599"},children:" + "}),e.jsx("span",{style:{color:"#CE9178"},children:O[t]}),e.jsx("span",{style:{color:"#7A8599"},children:" = "}),e.jsx("span",{style:{color:"#4EC9B0",fontWeight:700},children:b[t]})]})}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>o(Math.max(0,t-1)),disabled:t===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:t===0?"not-allowed":"pointer",fontSize:12,opacity:t===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[t+1," / ",r]}),e.jsx("button",{onClick:()=>o(Math.min(r-1,t+1)),disabled:t===r-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:t===r-1?"not-allowed":"pointer",fontSize:12,opacity:t===r-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>o(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function J(){const r=O.length,[t,o]=g.useState(2),[i,a]=g.useState(5),s=t===0?b[i]:b[i]-b[t-1];return e.jsxs(B,{children:[e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.07em"},children:["arr[]  —  query range [",t," .. ",i,"] highlighted"]}),e.jsx("div",{style:{display:"flex",gap:4},children:O.map((n,d)=>{const f=d>=t&&d<=i;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:f?"var(--color-border-info)":"var(--color-border-secondary)",background:f?"var(--color-background-info)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:f?700:400,color:f?"var(--color-text-info)":"var(--color-text-secondary)",transition:"all 0.15s"},children:n}),e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",d,"]"]})]},d)})})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.07em"},children:"pref[]  —  green = pref[R]  ·  red = pref[L−1]"}),e.jsx("div",{style:{display:"flex",gap:4},children:b.map((n,d)=>{const f=d===i,u=t>0&&d===t-1;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:f?"var(--color-border-success)":u?"var(--color-border-danger)":"var(--color-border-secondary)",background:f?"var(--color-background-success)":u?"var(--color-background-danger)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:f||u?700:400,color:f?"var(--color-text-success)":u?"var(--color-text-danger)":"var(--color-text-secondary)",transition:"all 0.15s"},children:n}),e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["p[",d,"]"]})]},d)})})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:12},children:[["L",t,o,0,i],["R",i,a,t,r-1]].map(([n,d,f,u,C])=>e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:12,color:"var(--color-text-secondary)",marginBottom:4},children:["L = ",d]}),e.jsx("input",{type:"range",min:u,max:C,value:d,onChange:j=>f(+j.target.value),style:{width:"100%"}})]},n))}),e.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"10px 14px",fontFamily:"var(--font-mono)",fontSize:12.5,lineHeight:1.9},children:[e.jsxs("div",{style:{color:"#9CDCFE"},children:["sum(",t,", ",i,")"]}),e.jsx("div",{style:{color:"#7A8599"},children:t===0?e.jsxs(e.Fragment,{children:["= pref[",i,"]  ",e.jsx("span",{style:{color:"#6A9955"},children:"// L=0: no left term"})]}):e.jsxs(e.Fragment,{children:["= pref[",i,"] − pref[",t-1,"]"]})}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#4EC9B0",fontWeight:700},children:b[i]}),t>0&&e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:"#7A8599"},children:" − "}),e.jsx("span",{style:{color:"#F44747",fontWeight:700},children:b[t-1]})]}),e.jsx("span",{style:{color:"#7A8599"},children:" = "}),e.jsx("span",{style:{color:"#4EC9B0",fontWeight:800,fontSize:14},children:s}),e.jsx("span",{style:{color:"#6A9955"},children:"   // O(1)"})]})]})]})}function Y(){const[r,t]=g.useState(0),[o,i]=g.useState(0),[a,s]=g.useState(2),[n,d]=g.useState(2),f=(c,v)=>c>=r&&c<=a&&v>=o&&v<=n,u=R[a+1][n+1],C=R[r][n+1],j=R[a+1][o],x=R[r][o],z=u-C-j+x,L=c=>{t(c),c>a&&s(c)},N=c=>{i(c),c>n&&d(c)},H=c=>{s(c),c<r&&t(c)},X=c=>{d(c),c<o&&i(c)};return e.jsxs(B,{children:[e.jsxs("div",{style:{display:"flex",gap:24,flexWrap:"wrap",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8,letterSpacing:"0.07em"},children:["mat[][] — query (",r,",",o,") to (",a,",",n,")"]}),e.jsx("div",{style:{display:"inline-flex",flexDirection:"column",gap:3},children:W.map((c,v)=>e.jsx("div",{style:{display:"flex",gap:3},children:c.map((w,A)=>{const k=f(v,A);return e.jsx("div",{style:{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,border:"1px solid",borderColor:k?"var(--color-border-info)":"var(--color-border-secondary)",background:k?"var(--color-background-info)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:k?700:400,color:k?"var(--color-text-info)":"var(--color-text-secondary)",transition:"all 0.15s"},children:w},A)})},v))})]}),e.jsxs("div",{style:{flex:1,minWidth:180},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8,letterSpacing:"0.07em"},children:"INCLUSION-EXCLUSION"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[[{label:`pref[${a+1}][${n+1}]`,val:u,color:"success",sign:"+",desc:"bottom-right prefix (full rect)"},{label:`pref[${r}][${n+1}]`,val:C,color:"danger",sign:"−",desc:"subtract top strip"},{label:`pref[${a+1}][${o}]`,val:j,color:"danger",sign:"−",desc:"subtract left strip"},{label:`pref[${r}][${o}]`,val:x,color:"warning",sign:"+",desc:"add back top-left (subtracted twice)"}].map(({label:c,val:v,color:w,sign:A,desc:k})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",background:`var(--color-background-${w})`,border:`0.5px solid var(--color-border-${w})`,borderRadius:"var(--border-radius-md)"},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,fontWeight:700,color:`var(--color-text-${w})`,minWidth:12},children:A}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:`var(--color-text-${w})`},children:[c," = ",e.jsx("strong",{children:v})]}),e.jsx("div",{style:{fontSize:10.5,color:`var(--color-text-${w})`,opacity:.8},children:k})]})]},c)),e.jsxs("div",{style:{padding:"8px 10px",background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",textAlign:"center"},children:[e.jsxs("div",{style:{fontSize:11,color:"var(--color-text-info)",marginBottom:3},children:["= ",u," − ",C," − ",j," + ",x]}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:18,fontWeight:700,color:"var(--color-text-info)"},children:z})]})]})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:16},children:[["r1 (row start)",r,L,0,P-1],["c1 (col start)",o,N,0,_-1],["r2 (row end)",a,H,0,P-1],["c2 (col end)",n,X,0,_-1]].map(([c,v,w,A,k])=>e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginBottom:3},children:[c," = ",v]}),e.jsx("input",{type:"range",min:A,max:k,value:v,onChange:K=>w(+K.target.value),style:{width:"100%"}})]},c))})]})}const I=7,Z=[{L:0,R:3,val:3,desc:"Add 3 to positions 0..3"},{L:2,R:5,val:2,desc:"Add 2 to positions 2..5"},{L:4,R:6,val:1,desc:"Add 1 to positions 4..6"}];function ee(){const r=Array(I).fill(0),t=[{diff:[...r],label:"Initial — diff array all zeros. Each update will cost O(1)."}];for(const{L:i,R:a,val:s,desc:n}of Z)r[i]+=s,a+1<I&&(r[a+1]-=s),t.push({diff:[...r],label:`${n}  →  diff[${i}] += ${s}, diff[${a+1<I?a+1:"n"}] -= ${s}`});const o=r.reduce((i,a,s)=>[...i,(i[s-1]??0)+a],[]);return t.push({diff:[...r],final:o,label:"Prefix sum of diff[] → final values after all updates. O(n) single pass."}),t}const F=ee();function re(){const[r,t]=g.useState(0),o=F[r];return e.jsxs(B,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:o.label}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.07em"},children:"diff[]  (the difference array)"}),e.jsx("div",{style:{display:"flex",gap:5},children:o.diff.map((i,a)=>{const s=i>0?"success":i<0?"danger":null;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:s?`var(--color-border-${s})`:"var(--color-border-secondary)",background:s?`var(--color-background-${s})`:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:i!==0?700:400,color:s?`var(--color-text-${s})`:"var(--color-text-tertiary)",transition:"all 0.2s"},children:i>0?`+${i}`:i}),e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",a,"]"]})]},a)})})]}),o.final&&e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.07em"},children:"final[] = prefix_sum(diff[])"}),e.jsx("div",{style:{display:"flex",gap:5},children:o.final.map((i,a)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid var(--color-border-info)",background:"var(--color-background-info)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:"var(--color-text-info)"},children:i}),e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",a,"]"]})]},a))})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>t(Math.max(0,r-1)),disabled:r===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===0?"not-allowed":"pointer",fontSize:12,opacity:r===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r," / ",F.length-1]}),e.jsx("button",{onClick:()=>t(Math.min(F.length-1,r+1)),disabled:r===F.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===F.length-1?"not-allowed":"pointer",fontSize:12,opacity:r===F.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>t(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const M=[1,2,1,2,1],$=3;function te(r,t){const o=[{i:-1,pref:0,map:{0:1},res:0,found:0,desc:"Initialize: map = {0: 1}  — empty prefix (sum=0) seen once. This handles subarrays starting at index 0."}];let i=0,a=0;const s={0:1};for(let n=0;n<r.length;n++){i+=r[n];const d=i-t,f=s[d]??0;a+=f;const u=f>0?`arr[${n}]=${r[n]} → prefSum=${i}. Need prefSum−k = ${i}−${t} = ${d}. map[${d}]=${f} ✓ → ${f} new subarray${f>1?"s":""} found! res=${a}`:`arr[${n}]=${r[n]} → prefSum=${i}. Need ${d}. map[${d}] = 0. No match. res=${a}`;s[i]=(s[i]??0)+1,o.push({i:n,pref:i,map:{...s},res:a,found:f,desc:u})}return o}const D=te(M,$);function ie(){const[r,t]=g.useState(0),o=D[r];return e.jsxs(B,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:o.desc}),e.jsxs("div",{style:{marginBottom:14,display:"flex",gap:5,alignItems:"flex-end"},children:[M.map((i,a)=>{const s=a===o.i,n=o.i>=0&&a<=o.i;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:s&&o.found>0?"var(--color-border-success)":s?"var(--color-border-warning)":n?"var(--color-border-tertiary)":"var(--color-border-secondary)",background:s&&o.found>0?"var(--color-background-success)":s?"var(--color-background-warning)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:s?700:400,color:s&&o.found>0?"var(--color-text-success)":s?"var(--color-text-warning)":n?"var(--color-text-tertiary)":"var(--color-text-secondary)",transition:"all 0.15s"},children:i}),e.jsxs("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",a,"]"]})]},a)}),e.jsxs("div",{style:{marginLeft:12,paddingBottom:14},children:[e.jsxs("div",{style:{fontSize:10.5,color:"var(--color-text-tertiary)",marginBottom:3},children:["k = ",$]}),e.jsxs("div",{style:{fontSize:10.5,color:"var(--color-text-tertiary)"},children:["prefSum = ",e.jsx("strong",{style:{color:"var(--color-text-info)"},children:o.pref})]})]})]}),e.jsxs("div",{style:{marginBottom:12},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.07em"},children:["map  ","{","prefSum → count","}"]}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap"},children:Object.entries(o.map).map(([i,a])=>e.jsxs("div",{style:{padding:"4px 9px",borderRadius:5,fontFamily:"var(--font-mono)",fontSize:11.5,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",color:"var(--color-text-secondary)"},children:[i,": ",e.jsx("strong",{style:{color:"var(--color-text-info)"},children:a})]},i))})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[e.jsxs("div",{style:{background:o.found>0?"var(--color-background-success)":"var(--color-background-secondary)",border:`0.5px solid ${o.found>0?"var(--color-border-success)":"var(--color-border-tertiary)"}`,borderRadius:"var(--border-radius-md)",padding:"8px 12px",textAlign:"center",transition:"all 0.2s"},children:[e.jsx("div",{style:{fontSize:11,color:o.found>0?"var(--color-text-success)":"var(--color-text-tertiary)",marginBottom:2},children:"Found this step"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:o.found>0?"var(--color-text-success)":"var(--color-text-tertiary)"},children:o.found})]}),e.jsxs("div",{style:{background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"8px 12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-info)",marginBottom:2},children:"Total subarrays (res)"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:"var(--color-text-info)"},children:o.res})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>t(Math.max(0,r-1)),disabled:r===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===0?"not-allowed":"pointer",fontSize:12,opacity:r===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r," / ",D.length-1]}),e.jsx("button",{onClick:()=>t(Math.min(D.length-1,r+1)),disabled:r===D.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===D.length-1?"not-allowed":"pointer",fontSize:12,opacity:r===D.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>t(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const ne={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function q({num:r,title:t,difficulty:o,tags:i=[],statement:a,constraints:s=[],examples:n=[],approach:d,code:f}){const[u,C]=g.useState(!1),j=ne[o]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",r]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:t})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[i.map(x=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:x},x)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${j})`,color:`var(--color-text-${j})`,border:`1px solid var(--color-border-${j})`},children:o})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:a}}),s.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:s.map((x,z)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:x},z))})]}),n.length>0&&e.jsx("div",{style:{marginBottom:14},children:n.map((x,z)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",z+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:x.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:x.output})]}),x.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:x.note})]},z))}),e.jsxs("button",{onClick:()=>C(!u),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:u?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${u?"eye-off":"bulb"}`}),u?"Hide Solution":"Show Approach & Solution"]}),u&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),d]}),e.jsx(h,{children:f})]})]})]})}function oe(){return e.jsxs("div",{children:[e.jsxs(S,{color:"info",icon:"ti-sum",children:[e.jsx("strong",{children:"Core idea:"})," Spend O(n) time building a ",e.jsx("em",{children:"prefix sum array"})," once. Then answer any range sum query in O(1) — no loop, no re-scan. The trade-off: O(n) extra space, and the array must be ",e.jsx("em",{children:"static"})," (no element updates)."]}),e.jsx(p,{children:"Definition & Construction"}),e.jsxs(m,{children:[e.jsx(l,{children:"pref[i]"})," stores the sum of all elements from index 0 through index ",e.jsx(l,{children:"i"})," inclusive. The recurrence is trivial: ",e.jsx(l,{children:"pref[i] = pref[i-1] + arr[i]"}),", with ",e.jsx(l,{children:"pref[0] = arr[0]"})," as the base case. Step through the build below."]}),e.jsx(V,{}),e.jsx(h,{children:{cpp:`// Build prefix sum array — O(n) time, O(n) space
vector<int> buildPrefix(vector<int>& arr) {
    int n = arr.size();
    vector<int> pref(n);
    pref[0] = arr[0];
    for (int i = 1; i < n; i++)
        pref[i] = pref[i - 1] + arr[i];
    return pref;
}

// O(1) range sum query
// sum of arr[l..r] inclusive
int query(vector<int>& pref, int l, int r) {
    return l == 0 ? pref[r] : pref[r] - pref[l - 1];
}`,python:`def build_prefix(arr):
    pref = [0] * len(arr)
    pref[0] = arr[0]
    for i in range(1, len(arr)):
        pref[i] = pref[i - 1] + arr[i]
    return pref

def query(pref, l, r):
    return pref[r] if l == 0 else pref[r] - pref[l - 1]`}}),e.jsx(p,{children:"Range Sum Query — O(1) Lookup"}),e.jsxs(m,{children:["The query formula follows directly from definition: ",e.jsx(l,{children:"sum(l, r) = pref[r] − pref[l−1]"}),". It works because ",e.jsx(l,{children:"pref[r]"})," includes everything from 0..r, and ",e.jsx(l,{children:"pref[l−1]"})," includes everything from 0..l−1. Their difference isolates exactly the l..r segment. Adjust the sliders below."]}),e.jsx(J,{}),e.jsxs(S,{color:"success",icon:"ti-math",children:[e.jsx("strong",{children:"Edge case:"})," When ",e.jsx(l,{children:"l = 0"}),", there is no ",e.jsx(l,{children:"pref[-1]"})," to subtract. Always guard: ",e.jsx("code",{children:"l == 0 ? pref[r] : pref[r] - pref[l-1]"}),". Alternatively, use a ",e.jsx("strong",{children:"1-indexed prefix array"})," with a leading zero: ",e.jsx("code",{children:"pref[0] = 0"}),", ",e.jsx("code",{children:"pref[i] = pref[i-1] + arr[i-1]"}),". Then ",e.jsx("code",{children:"sum(l, r) = pref[r+1] - pref[l]"})," with no edge-case guard needed."]}),e.jsx(p,{children:"0-indexed vs 1-indexed — The Two Conventions"}),e.jsx(T,{heads:["Convention","Build","Query sum(l, r)","Edge case"],rows:[["0-indexed pref","pref[i] = pref[i-1] + arr[i]","pref[r] − pref[l-1]","Must guard l == 0"],["1-indexed pref (extra 0)","pref[0]=0; pref[i] = pref[i-1] + arr[i-1]","pref[r+1] − pref[l]","No guard needed — pref[0]=0 always valid"]]}),e.jsx(h,{children:{cpp:`// 1-indexed prefix — cleaner queries, preferred in competitive programming
vector<int> buildPrefix1(vector<int>& arr) {
    int n = arr.size();
    vector<int> pref(n + 1, 0);     // pref[0] = 0 (sentinel)
    for (int i = 1; i <= n; i++)
        pref[i] = pref[i - 1] + arr[i - 1];
    return pref;
}
// sum(l, r) 0-indexed in arr:
int query1(vector<int>& pref, int l, int r) {
    return pref[r + 1] - pref[l];   // always valid, no edge-case
}`,python:`def build_prefix_1indexed(arr):
    pref = [0] * (len(arr) + 1)    # pref[0] = 0 sentinel
    for i in range(1, len(pref)):
        pref[i] = pref[i-1] + arr[i-1]
    return pref

def query_1indexed(pref, l, r):
    return pref[r + 1] - pref[l]   # always valid`}}),e.jsx(p,{children:"When NOT to Use Prefix Sum"}),e.jsxs(G,{cols:2,children:[e.jsxs(E,{title:"✓ Use when:",color:"success",children:["Array is ",e.jsx("strong",{children:"static"})," (no updates). Multiple range queries on the same data. Binary search on prefix sums (next section). Memory O(n) is acceptable."]}),e.jsxs(E,{title:"✗ Don't use when:",color:"danger",children:["Array elements are updated between queries — prefix must be rebuilt. Use a ",e.jsx("strong",{children:"Fenwick Tree (BIT)"})," for O(log n) both update and query. Or a ",e.jsx("strong",{children:"Segment Tree"})," for complex range operations."]})]}),e.jsx(T,{heads:["Structure","Build","Point Update","Range Query","Space"],rows:[["Prefix Sum Array","O(n)","O(n) rebuild","O(1)","O(n)"],["Fenwick Tree (BIT)","O(n log n)","O(log n)","O(log n)","O(n)"],["Segment Tree","O(n)","O(log n)","O(log n)","O(4n)"],["Sparse Table","O(n log n)","N/A (static)","O(1)","O(n log n)"]]}),e.jsx(y,{q:"Why is the query formula pref[r] − pref[l−1] and not pref[r] − pref[l]?",a:"pref[i] = arr[0] + arr[1] + … + arr[i]. The range sum from l to r includes arr[l]. To isolate it, we need to remove everything from arr[0] to arr[l-1] — which is pref[l-1]. Using pref[l] would also subtract arr[l] itself, giving arr[l+1] + … + arr[r], which is wrong. Mnemonic: subtract everything BEFORE position l."}),e.jsx(y,{q:"Can prefix sum handle floating-point arrays? What about potential precision issues?",a:"Yes, the structure works identically for floats. However, summing many floating-point values accumulates rounding errors (catastrophic cancellation in pref[r] - pref[l-1] when both are large and close in value). For critical applications, use Kahan's summation algorithm during build, or use integer types with scaling (multiply by 10^6 if precision to 6 decimals is needed)."}),e.jsx(y,{q:"How do you use binary search on a prefix sum array?",a:"Since arr[] has non-negative elements, pref[] is non-decreasing. Binary search on pref[] lets you find the index where the cumulative sum first reaches or exceeds a threshold — in O(log n). Classic use: given queries 'find leftmost position where prefix sum ≥ x', answer each in O(log n) using lower_bound on pref[]."})]})}function ae(){return e.jsxs("div",{children:[e.jsxs(S,{color:"info",icon:"ti-grid-dots",children:[e.jsx("strong",{children:"Partial Sum:"})," The 2D generalization of prefix sum. ",e.jsx(l,{children:"pref[i][j]"})," stores the sum of all elements in the sub-rectangle from ",e.jsx(l,{children:"(0,0)"})," to ",e.jsx(l,{children:"(i-1, j-1)"}),". Any sub-rectangle query is answered in O(1) using four pref values and the inclusion-exclusion principle."]}),e.jsx(p,{children:"Building the 2D Prefix Array"}),e.jsx(m,{children:"The recurrence adds the row-above and column-left contributions, then subtracts the overlap (top-left rectangle counted twice), plus the current cell value:"}),e.jsx(S,{color:"success",icon:"ti-math",children:e.jsx(l,{children:"pref[i][j] = mat[i-1][j-1] + pref[i-1][j] + pref[i][j-1] − pref[i-1][j-1]"})}),e.jsx(h,{children:{cpp:`// Build 2D prefix sum (1-indexed with extra zero row and column)
// pref is (ROWS+1) × (COLS+1); pref[0][*] = 0, pref[*][0] = 0
vector<vector<int>> build2D(vector<vector<int>>& mat) {
    int R = mat.size(), C = mat[0].size();
    vector<vector<int>> pref(R + 1, vector<int>(C + 1, 0));
    for (int i = 1; i <= R; i++)
        for (int j = 1; j <= C; j++)
            pref[i][j] = mat[i-1][j-1]
                       + pref[i-1][j]
                       + pref[i][j-1]
                       - pref[i-1][j-1];
    return pref;
}`,python:`def build_2d(mat):
    R, C = len(mat), len(mat[0])
    pref = [[0] * (C + 1) for _ in range(R + 1)]
    for i in range(1, R + 1):
        for j in range(1, C + 1):
            pref[i][j] = (mat[i-1][j-1]
                         + pref[i-1][j]
                         + pref[i][j-1]
                         - pref[i-1][j-1])
    return pref`}}),e.jsx(p,{children:"Sub-Rectangle Query — Inclusion-Exclusion"}),e.jsxs(m,{children:["To query the sum of ",e.jsx(l,{children:"mat[r1..r2][c1..c2]"})," (0-indexed), use four lookups in ",e.jsx(l,{children:"pref"})," (1-indexed). The formula removes the left strip and top strip from the full bottom-right rectangle, then adds back the top-left corner that was subtracted twice."]}),e.jsx(S,{color:"success",icon:"ti-math",children:e.jsx(l,{children:"sum(r1,c1,r2,c2) = pref[r2+1][c2+1] − pref[r1][c2+1] − pref[r2+1][c1] + pref[r1][c1]"})}),e.jsx(Y,{}),e.jsx(h,{children:{cpp:`// O(1) sub-rectangle query — r1,c1,r2,c2 are 0-indexed in mat
int query2D(vector<vector<int>>& pref, int r1, int c1, int r2, int c2) {
    return pref[r2+1][c2+1]
         - pref[r1][c2+1]
         - pref[r2+1][c1]
         + pref[r1][c1];
}

// Example: sum of mat[1..2][1..2] (0-indexed)
// = pref[3][3] - pref[1][3] - pref[3][1] + pref[1][1]
// = 21 - 4 - 9 + 3 = 11  (elements: 6+3+2+0 = 11 ✓)`,python:`def query_2d(pref, r1, c1, r2, c2):
    return (pref[r2+1][c2+1]
          - pref[r1][c2+1]
          - pref[r2+1][c1]
          + pref[r1][c1])
# O(1) lookup regardless of sub-rectangle size`}}),e.jsx(p,{children:"Inclusion-Exclusion — Why Four Terms?"}),e.jsx(m,{children:"Visualize the four rectangles in the prefix matrix anchored at the top-left corner (0,0):"}),e.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"14px 16px",fontFamily:"var(--font-mono)",fontSize:12.5,lineHeight:2},children:[e.jsxs("div",{style:{color:"#4EC9B0"},children:["pref[r2+1][c2+1]  ",e.jsx("span",{style:{color:"#6A9955"},children:"// + full bottom-right rect  (0,0)→(r2,c2)"})]}),e.jsxs("div",{style:{color:"#F44747"},children:["pref[r1][c2+1]    ",e.jsx("span",{style:{color:"#6A9955"},children:"// − top strip             (0,0)→(r1-1,c2)"})]}),e.jsxs("div",{style:{color:"#F44747"},children:["pref[r2+1][c1]    ",e.jsx("span",{style:{color:"#6A9955"},children:"// − left strip            (0,0)→(r2,c1-1)"})]}),e.jsxs("div",{style:{color:"#CE9178"},children:["pref[r1][c1]      ",e.jsx("span",{style:{color:"#6A9955"},children:"// + top-left corner back  (0,0)→(r1-1,c1-1) — subtracted twice above"})]})]}),e.jsx(p,{children:"Complexity Overview"}),e.jsx(T,{heads:["Operation","1D Prefix","2D Prefix","Notes"],rows:[["Build time","O(n)","O(n×m)","Single pass over all elements"],["Space","O(n)","O(n×m)","Extra array of same size"],["Range query","O(1)","O(1)","Constant 4 lookups regardless of rect size"],["Point update","O(n) rebuild","O(n×m) rebuild","Use 2D BIT/Fenwick for dynamic updates"]]}),e.jsx(y,{q:"Why do we use a (ROWS+1)×(COLS+1) array with an extra zero row and column?",a:"Same reason as 1D: a leading zero row/column acts as a sentinel. Any query touching the boundary (r1=0 or c1=0) would need a guard for pref[-1][j] or pref[i][-1]. With the extra row/col, these are simply pref[0][*] = 0 and pref[*][0] = 0, making the formula work uniformly without special cases."}),e.jsx(y,{q:"How do you handle 2D prefix sums when the matrix has updates?",a:"A 2D Fenwick Tree (Binary Indexed Tree) supports both point updates and prefix sum queries in O(log n × log m) time. For range updates + range queries, a 2D Fenwick tree with the difference trick handles it. This is a significant jump in implementation complexity — usually only needed in competitive programming (ICPC/Codeforces Div 1 level)."}),e.jsx(y,{q:"What is the maximum size of a 2D prefix array that fits in typical memory?",a:"An int (4 bytes) array of 1000×1000 uses 4 MB — fits within typical 256 MB limits. A 10000×10000 int array would use 400 MB — too large. For large sparse grids, use coordinate compression + hash maps instead of a full 2D array. For competitive programming, 3000×3000 = 9M ints ≈ 36 MB is usually safe."})]})}function se(){return e.jsxs("div",{children:[e.jsxs(S,{color:"warning",icon:"ti-bolt",children:[e.jsx("strong",{children:"Difference Array:"})," The inverse of prefix sum. Where prefix sum enables O(1) ",e.jsx("em",{children:"queries"})," on a static array, the difference array enables O(1) ",e.jsx("em",{children:"range updates"}),", with a final O(n) prefix-sum pass to materialize the results."]}),e.jsx(p,{children:"The Problem — Naive Range Updates Are O(n)"}),e.jsxs(m,{children:["Given an array and ",e.jsx(l,{children:"q"}),' queries of the form "add ',e.jsx(l,{children:"v"})," to every element in ",e.jsx(l,{children:"[L, R]"}),`", the naive approach updates each element individually — O(n) per query, O(nq) total. For q=10⁵ and n=10⁵, that's 10¹⁰ operations.`]}),e.jsx(p,{children:"The Difference Array Trick — O(1) Per Update"}),e.jsxs(m,{children:["For each range update ",e.jsx(l,{children:"[L, R, val]"}),", do only ",e.jsx("strong",{children:"two operations"}),": ",e.jsx(l,{children:"diff[L] += val"})," and ",e.jsx(l,{children:"diff[R+1] -= val"}),". After all updates, a single prefix-sum pass on ",e.jsx(l,{children:"diff[]"})," gives the final values."]}),e.jsx(re,{}),e.jsx(h,{children:{cpp:`// Difference array for range-add queries
struct DiffArray {
    vector<int> diff;
    DiffArray(int n) : diff(n + 1, 0) {}

    // Add val to arr[l..r] — O(1)
    void update(int l, int r, int val) {
        diff[l]     += val;
        if (r + 1 < (int)diff.size()) diff[r + 1] -= val;
    }

    // Materialize: returns final array after all updates — O(n)
    vector<int> build() {
        vector<int> res(diff.size() - 1);
        res[0] = diff[0];
        for (int i = 1; i < (int)res.size(); i++)
            res[i] = res[i - 1] + diff[i];   // prefix sum of diff
        return res;
    }
};

// Usage:
// DiffArray da(7);
// da.update(0, 3, 3);  da.update(2, 5, 2);  da.update(4, 6, 1);
// auto final = da.build();
// final = [3, 3, 5, 5, 3, 3, 1]`,python:`class DiffArray:
    def __init__(self, n):
        self.diff = [0] * (n + 1)

    def update(self, l, r, val):
        self.diff[l] += val
        if r + 1 < len(self.diff):
            self.diff[r + 1] -= val

    def build(self):
        res = [0] * (len(self.diff) - 1)
        res[0] = self.diff[0]
        for i in range(1, len(res)):
            res[i] = res[i - 1] + self.diff[i]
        return res

# da = DiffArray(7)
# da.update(0,3,3); da.update(2,5,2); da.update(4,6,1)
# da.build() → [3, 3, 5, 5, 3, 3, 1]`}}),e.jsx(T,{heads:["Approach","Per-update cost","Finalize cost","Total for q updates"],rows:[["Naive (loop over range)","O(n)","—","O(nq)"],["Difference Array ✓","O(1)","O(n)","O(q + n)"]]}),e.jsx(p,{children:"Application — Range Frequency Map (Overlap Counting)"}),e.jsxs(m,{children:["Given ",e.jsx(l,{children:"q"})," ranges ",e.jsx(l,{children:"[L_i, R_i]"}),", find the position covered by the most ranges. Classic use: scheduling conflicts, painting intervals, heatmap aggregation. The difference array solution is exactly the same pattern."]}),e.jsx(h,{children:{cpp:`// Find position with maximum overlap across q intervals
int maxOverlapPoint(vector<pair<int,int>>& intervals, int n) {
    vector<int> diff(n + 1, 0);
    for (auto [L, R] : intervals) {
        diff[L]++;
        if (R + 1 <= n) diff[R + 1]--;
    }
    int maxFreq = 0, pos = 0, curr = 0;
    for (int i = 0; i <= n; i++) {
        curr += diff[i];
        if (curr > maxFreq) { maxFreq = curr; pos = i; }
    }
    return pos;   // 0-indexed position with max coverage
}`,python:`def max_overlap_point(intervals, n):
    diff = [0] * (n + 2)
    for l, r in intervals:
        diff[l] += 1
        diff[r + 1] -= 1
    max_freq = curr = pos = 0
    for i in range(n + 1):
        curr += diff[i]
        if curr > max_freq:
            max_freq, pos = curr, i
    return pos`}}),e.jsx(p,{children:"Application — Product Array Without Division (Prefix × Suffix)"}),e.jsxs(m,{children:["Classic interview problem: given arr[], compute output[i] = product of all elements ",e.jsx("em",{children:"except"})," arr[i]. The constraint: no division operator allowed. Solution: ",e.jsx(l,{children:"output[i] = leftProduct[i] × rightProduct[i]"}),", where left/right products are built like prefix/suffix sums."]}),e.jsx(h,{children:{cpp:`vector<int> productExceptSelf(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, 1);

    // Forward pass: result[i] = product of arr[0..i-1]
    int left = 1;
    for (int i = 0; i < n; i++) {
        result[i] = left;
        left *= arr[i];
    }

    // Backward pass: multiply by product of arr[i+1..n-1]
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= right;
        right *= arr[i];
    }
    return result;
}
// [1,2,3,4] → [24,12,8,6]  (no division, O(n) time, O(1) extra space)`,python:`def product_except_self(arr):
    n = len(arr)
    result = [1] * n

    # Left pass
    left = 1
    for i in range(n):
        result[i] = left
        left *= arr[i]

    # Right pass
    right = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right
        right *= arr[i]

    return result
# [1,2,3,4] → [24,12,8,6]`}}),e.jsx(p,{children:"Application — Equilibrium Index"}),e.jsxs(m,{children:["Index ",e.jsx(l,{children:"i"})," is an equilibrium point if the sum of elements before it equals the sum after it. One pass with a running left sum and derived right sum from the total — no prefix array allocation needed."]}),e.jsx(h,{children:{cpp:`int equilibriumIndex(vector<int>& arr) {
    int total = accumulate(arr.begin(), arr.end(), 0);
    int left = 0;
    for (int i = 0; i < (int)arr.size(); i++) {
        int right = total - left - arr[i];   // derived in O(1)
        if (left == right) return i;
        left += arr[i];
    }
    return -1;
}
// [1, 7, 3, 6, 5, 6] → index 3  (left=11, right=11)`,python:`def equilibrium_index(arr):
    total, left = sum(arr), 0
    for i, v in enumerate(arr):
        if left == total - left - v: return i
        left += v
    return -1`}}),e.jsx(y,{q:"In the difference array, why do we write diff[R+1] -= val rather than diff[R] -= val?",a:"The increment at L means 'start contributing val here.' To stop contributing after position R (inclusive), we cancel at R+1 — meaning 'from R+1 onward, this range no longer applies.' Cancelling at R would also cancel the contribution at R itself, making position R miss its update."}),e.jsx(y,{q:"What happens if R+1 is out of bounds for diff[R+1]?",a:"Allocate the diff array with size n+1 (one extra element beyond the valid range). The extra element at index n acts as a dummy — it gets the decrement but is never read in the final prefix-sum pass over [0..n-1]. This is why the DiffArray class above uses diff(n+1, 0)."}),e.jsx(y,{q:"Can the difference array handle range-multiply operations?",a:"No — difference arrays only work for additive (commutative group) operations because prefix sum accumulates additions. For range-multiply, you'd need a logarithmic difference array (multiply, divide) or a segment tree with lazy propagation. The key requirement is that the operation has an inverse (subtraction is the inverse of addition)."})]})}function le(){return e.jsxs("div",{children:[e.jsxs(S,{color:"purple",icon:"ti-hash",children:[e.jsx("strong",{children:"The Core Trick:"})," Prefix sum + hash map lets you count subarrays satisfying some property in ",e.jsx("em",{children:"O(n)"}),". The key identity: if ",e.jsx(l,{children:"pref[j] − pref[i] = target"}),", the subarray ",e.jsx(l,{children:"arr[i+1..j]"})," satisfies the property. Store prefix sum frequencies as you scan, and look up ",e.jsx(l,{children:"pref[j] − target"})," at each step."]}),e.jsx(p,{children:"Pattern 1 — Count Subarrays with Sum = k"}),e.jsxs(m,{children:["Works for arrays with ",e.jsx("strong",{children:"negative integers"})," (unlike the sliding window approach). Step through the example: ",e.jsx(l,{children:"arr=[1,2,1,2,1]"}),", ",e.jsx(l,{children:"k=3"})," → 4 matching subarrays."]}),e.jsx(ie,{}),e.jsx(h,{children:{cpp:`#include <unordered_map>
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;     // empty prefix (sum=0) appears once
    int pref = 0, res = 0;
    for (int v : nums) {
        pref += v;
        res  += cnt[pref - k];    // how many prefixes differ by exactly k
        cnt[pref]++;
    }
    return res;
}
// Key: if pref[j] - pref[i] = k → subarray [i+1..j] sums to k
// Storing cnt[pref-k] counts all valid i's for this j — in O(1) per j.`,python:`from collections import defaultdict

def subarray_sum(nums, k):
    cnt = defaultdict(int)
    cnt[0] = 1       # empty prefix base case
    pref = res = 0
    for v in nums:
        pref += v
        res  += cnt[pref - k]    # O(1) lookup
        cnt[pref] += 1
    return res`}}),e.jsx(p,{children:"Pattern 2 — Count Subarrays with Sum Divisible by K"}),e.jsxs(m,{children:["Instead of storing the exact prefix sum, store ",e.jsx(l,{children:"prefSum \\% k"}),". Two positions with the same remainder have a subarray between them whose sum is divisible by ",e.jsx(l,{children:"k"}),". Handle negative modulo in C++ explicitly."]}),e.jsx(h,{children:{cpp:`int subarraysDivByK(vector<int>& nums, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;
    int pref = 0, res = 0;
    for (int v : nums) {
        pref += v;
        int rem = ((pref % k) + k) % k;  // ensure non-negative mod (C++ % can be negative)
        res += cnt[rem];
        cnt[rem]++;
    }
    return res;
}
// [4, 5, 0, -2, -3, 1], k=5 → 7
// Any two indices with same (prefSum % k) define a valid subarray.`,python:`from collections import defaultdict

def subarrays_div_by_k(nums, k):
    cnt = defaultdict(int)
    cnt[0] = 1
    pref = res = 0
    for v in nums:
        pref += v
        rem = pref % k        # Python % is always non-negative for positive k
        res += cnt[rem]
        cnt[rem] += 1
    return res`}}),e.jsxs(S,{color:"warning",icon:"ti-alert-triangle",children:["In C++, ",e.jsx("code",{children:"-7 % 5 = -2"})," (implementation-defined sign in C++03, truncation in C++11+). Always normalize: ",e.jsx("code",{children:"((pref % k) + k) % k"})," to ensure the remainder is in ",e.jsx("code",{children:"[0, k-1]"}),". Python's ",e.jsx("code",{children:"%"})," always returns a non-negative result for a positive divisor, so no fix needed there."]}),e.jsx(p,{children:"Pattern 3 — XOR Prefix Sum"}),e.jsxs(m,{children:["Just as addition has prefix sums and subtraction as inverse, XOR has prefix XOR and XOR-itself as inverse (since ",e.jsx(l,{children:"a \\oplus a = 0"}),"). Range XOR query: ",e.jsx(l,{children:"xor(l, r) = xorPref[r] \\oplus xorPref[l-1]"}),". Count subarrays with XOR = k using the same hashmap pattern."]}),e.jsx(h,{children:{cpp:`// Build XOR prefix
vector<int> buildXorPrefix(vector<int>& arr) {
    int n = arr.size();
    vector<int> xp(n + 1, 0);    // xp[0] = 0
    for (int i = 0; i < n; i++) xp[i + 1] = xp[i] ^ arr[i];
    return xp;
}

// O(1) range XOR query
int xorQuery(vector<int>& xp, int l, int r) {
    return xp[r + 1] ^ xp[l];   // 0-indexed l,r in arr
}

// Count subarrays with XOR = k
int countXorK(vector<int>& arr, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;
    int xpref = 0, res = 0;
    for (int v : arr) {
        xpref ^= v;
        res   += cnt[xpref ^ k];  // xpref ^ prev = k  ↔  prev = xpref ^ k
        cnt[xpref]++;
    }
    return res;
}`,python:`def build_xor_prefix(arr):
    xp = [0] * (len(arr) + 1)
    for i, v in enumerate(arr): xp[i + 1] = xp[i] ^ v
    return xp

def xor_query(xp, l, r):
    return xp[r + 1] ^ xp[l]

from collections import defaultdict
def count_xor_k(arr, k):
    cnt = defaultdict(int)
    cnt[0] = 1; xpref = res = 0
    for v in arr:
        xpref ^= v
        res += cnt[xpref ^ k]   # XOR-subtraction: need ^ k
        cnt[xpref] += 1
    return res`}}),e.jsx(p,{children:"Pattern 4 — Maximum Sum Subarray in a 2D Matrix"}),e.jsxs(m,{children:["The classic 2D Kadane's: fix left and right column boundaries ",e.jsx(l,{children:"l"})," and ",e.jsx(l,{children:"r"}),". For each pair, compute row-wise compressed sums using column prefix sums, then run 1D Kadane's on that compressed array. Time ",e.jsx(l,{children:"O(n^2 \\cdot m)"})," where ",e.jsx(l,{children:"n"})," = cols, ",e.jsx(l,{children:"m"})," = rows."]}),e.jsx(h,{children:{cpp:`int maxSumSubmatrix(vector<vector<int>>& mat) {
    int R = mat.size(), C = mat[0].size();
    int maxSum = INT_MIN;

    for (int l = 0; l < C; l++) {
        vector<int> row(R, 0);     // row[i] = sum of mat[i][l..r]
        for (int r = l; r < C; r++) {
            for (int i = 0; i < R; i++) row[i] += mat[i][r];

            // 1D Kadane's on 'row' — O(R)
            int maxEnd = row[0], cur = row[0];
            for (int i = 1; i < R; i++) {
                cur    = max(cur + row[i], row[i]);
                maxEnd = max(maxEnd, cur);
            }
            maxSum = max(maxSum, maxEnd);
        }
    }
    return maxSum;
}
// Time: O(C² × R)  Space: O(R)`,python:`def max_sum_submatrix(mat):
    R, C = len(mat), len(mat[0])
    max_sum = float('-inf')
    for l in range(C):
        row = [0] * R
        for r in range(l, C):
            for i in range(R): row[i] += mat[i][r]
            # Kadane's on row
            cur = best = row[0]
            for v in row[1:]:
                cur = max(cur + v, v)
                best = max(best, cur)
            max_sum = max(max_sum, best)
    return max_sum`}}),e.jsx(p,{children:"Pattern Summary"}),e.jsx(T,{heads:["Problem","Map Key","Lookup Key","Initialize"],rows:[["Subarray sum = k","prefSum","prefSum - k","{0: 1}"],["Subarray sum divisible by k","prefSum % k","same key","{0: 1}"],["Subarray XOR = k","prefXOR","prefXOR ^ k","{0: 1}"],["Subarray sum = 0","prefSum","prefSum (same)","{0: 1}"],["Longest subarray sum = k","prefSum → index","prefSum - k → earliest index","{0: -1}"]]}),e.jsx(y,{q:"Why does the hashmap approach work for negative numbers but sliding window doesn't?",a:"Sliding window shrinks from the left only when the current sum exceeds the target, assuming that shrinking always reduces the sum. With negative elements, shrinking might increase the sum (if arr[start] is negative). The hashmap approach has no such assumption — it stores exact prefix sum values and looks up the complement. It doesn't matter if elements are negative, positive, or zero."}),e.jsx(y,{q:"In the XOR prefix sum, why is the lookup key prefXOR ^ k rather than prefXOR - k?",a:"XOR's 'subtraction' is XOR itself (since a ^ a = 0). To find the previous prefix XOR p such that xpref ^ p = k, solve: p = xpref ^ k (XOR both sides by xpref, using xpref ^ xpref = 0). The lookup key is derived by the same logic as the addition case (pref - k), just with ^ replacing -."}),e.jsx(y,{q:"What initializes the hashmap as {0: 1} and why is this necessary?",a:"cnt[0] = 1 represents the 'empty prefix' — the state before seeing any element, with sum/XOR = 0. Without it, subarrays starting at index 0 would be missed. Example: if arr=[3,1] and k=4, at index 1 we have prefSum=4, look up prefSum-k=0, and cnt[0]=1 tells us there's one match — the entire subarray [3,1]. Without the initialization, this match would be missed."})]})}function ce(){return e.jsxs("div",{children:[e.jsx(S,{color:"purple",icon:"ti-tournament",children:"6 problems across the full prefix sum spectrum — from O(1) range queries to 2D matrices and count patterns with hash maps. All appear in FAANG and product company interviews."}),e.jsx(q,{num:1,title:"Range Sum Query — Immutable",difficulty:"OA Easy",tags:["1D Prefix","LC 303"],statement:"Design a data structure that takes an integer array <code>nums</code> and answers multiple queries: <code>sumRange(left, right)</code> returns the sum of elements from index <code>left</code> to <code>right</code> inclusive. The array is immutable — no updates.",constraints:["1 ≤ n ≤ 10⁴","Multiple queries (up to 10⁴)","O(n) init, O(1) per query"],examples:[{input:"nums=[-2,0,3,-5,2,-1]; sumRange(0,2), sumRange(2,5), sumRange(0,5)",output:"1, -1, -3"}],approach:"Build a 1-indexed prefix array in the constructor: pref[0]=0, pref[i]=pref[i-1]+nums[i-1]. Each query: pref[right+1] - pref[left]. O(n) build once, O(1) per query, O(n) space. The classic application of prefix sums — wrap it in a class.",code:{cpp:`class NumArray {
    vector<int> pref;
public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        pref.resize(n + 1, 0);
        for (int i = 1; i <= n; i++)
            pref[i] = pref[i - 1] + nums[i - 1];
    }

    int sumRange(int left, int right) {
        return pref[right + 1] - pref[left];
    }
};
// Init: O(n)  Query: O(1)  Space: O(n)`,python:`class NumArray:
    def __init__(self, nums):
        self.pref = [0] * (len(nums) + 1)
        for i, v in enumerate(nums):
            self.pref[i + 1] = self.pref[i] + v

    def sumRange(self, left, right):
        return self.pref[right + 1] - self.pref[left]`}}),e.jsx(q,{num:2,title:"Range Sum Query 2D — Immutable",difficulty:"OA Medium",tags:["2D Prefix","LC 304"],statement:"Design a class that takes a 2D matrix and answers multiple sub-rectangle sum queries: <code>sumRegion(r1,c1,r2,c2)</code> returns the sum of elements inside the rectangle with corners <code>(r1,c1)</code> (top-left) and <code>(r2,c2)</code> (bottom-right).",constraints:["1 ≤ m,n ≤ 200","Up to 10⁴ sumRegion calls","O(m×n) init, O(1) per query"],examples:[{input:"mat=[[3,0,1,4],[5,6,3,2],[1,2,0,1],[4,3,2,3]]; sumRegion(1,1,2,2)",output:"11",note:"6+3+2+0 = 11"},{input:"sumRegion(0,0,3,3)",output:"40",note:"Total sum of matrix"}],approach:"Build a (R+1)×(C+1) prefix matrix with an extra zero row and column. Each pref[i][j] = mat[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1]. Query: pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1]. Direct application of the inclusion-exclusion formula.",code:{cpp:`class NumMatrix {
    vector<vector<int>> pref;
public:
    NumMatrix(vector<vector<int>>& mat) {
        int R = mat.size(), C = mat[0].size();
        pref.assign(R + 1, vector<int>(C + 1, 0));
        for (int i = 1; i <= R; i++)
            for (int j = 1; j <= C; j++)
                pref[i][j] = mat[i-1][j-1]
                           + pref[i-1][j] + pref[i][j-1]
                           - pref[i-1][j-1];
    }

    int sumRegion(int r1, int c1, int r2, int c2) {
        return pref[r2+1][c2+1]
             - pref[r1][c2+1]
             - pref[r2+1][c1]
             + pref[r1][c1];
    }
};`,python:`class NumMatrix:
    def __init__(self, mat):
        R, C = len(mat), len(mat[0])
        self.pref = [[0]*(C+1) for _ in range(R+1)]
        for i in range(1, R+1):
            for j in range(1, C+1):
                self.pref[i][j] = (mat[i-1][j-1]
                    + self.pref[i-1][j] + self.pref[i][j-1]
                    - self.pref[i-1][j-1])

    def sumRegion(self, r1, c1, r2, c2):
        p = self.pref
        return p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]`}}),e.jsx(q,{num:3,title:"Subarray Sum Equals K",difficulty:"LC Medium",tags:["Prefix + HashMap","LC 560"],statement:"Given an integer array <code>nums</code> and integer <code>k</code>, return the number of <strong>contiguous subarrays</strong> whose sum equals exactly <code>k</code>. The array may contain negative integers — sliding window does not work here.",constraints:["1 ≤ n ≤ 2×10⁴","-1000 ≤ nums[i] ≤ 1000","-10⁷ ≤ k ≤ 10⁷"],examples:[{input:"nums=[1,1,1], k=2",output:"2"},{input:"nums=[1,-1,1], k=1",output:"3",note:"[1], [1,-1,1], [1] (index 2)"}],approach:"Prefix sum + hash map. Maintain running prefSum. At each index j, the number of valid subarrays ending here = count of previous prefix sums equal to prefSum - k. Initialize map with {0:1} for subarrays starting at index 0. One pass, O(n) time and space.",code:{cpp:`int subarraySum(vector<int>& nums, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;         // empty prefix base case
    int pref = 0, res = 0;
    for (int v : nums) {
        pref += v;
        res  += cnt[pref - k];  // subarrays ending here with sum k
        cnt[pref]++;
    }
    return res;
}

// Dry-run for [1,-1,1], k=1:
// i=0: pref=1, cnt[0]=1 → res=1, cnt={0:1,1:1}
// i=1: pref=0, cnt[-1]=0 → res=1, cnt={0:2,1:1}
// i=2: pref=1, cnt[0]=2 → res=3, cnt={0:2,1:2}`,python:`from collections import defaultdict

def subarray_sum(nums, k):
    cnt = defaultdict(int)
    cnt[0] = 1
    pref = res = 0
    for v in nums:
        pref += v
        res += cnt[pref - k]
        cnt[pref] += 1
    return res`}}),e.jsx(q,{num:4,title:"Product of Array Except Self",difficulty:"LC Medium",tags:["Prefix × Suffix","LC 238"],statement:"Given an integer array <code>nums</code>, return an array <code>output</code> such that <code>output[i]</code> equals the product of all elements of <code>nums</code> except <code>nums[i]</code>. <strong>Do not use division.</strong> Solve in O(n) time and O(1) extra space (output array doesn't count).",constraints:["2 ≤ n ≤ 10⁵","-30 ≤ nums[i] ≤ 30","Product guaranteed to fit in 32-bit int","No division operator"],examples:[{input:"[1,2,3,4]",output:"[24,12,8,6]"},{input:"[-1,1,0,-3,3]",output:"[0,0,9,0,0]"}],approach:"Two-pass prefix product. Forward pass: result[i] = product of nums[0..i-1] (left prefix, accumulated in-place). Backward pass: multiply result[i] by the running right product (product of nums[i+1..n-1]). Each element ends up with leftProduct × rightProduct. O(n) time, O(1) extra space.",code:{cpp:`vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);

    // Forward: res[i] = product of nums[0..i-1]
    int left = 1;
    for (int i = 0; i < n; i++) {
        res[i] = left;
        left *= nums[i];
    }

    // Backward: multiply by product of nums[i+1..n-1]
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right  *= nums[i];
    }
    return res;
}
// [1,2,3,4]:
// After forward: [1, 1, 2, 6]
// After backward: [24, 12, 8, 6]  ✓`,python:`def product_except_self(nums):
    n, res = len(nums), [1] * len(nums)

    left = 1
    for i in range(n):
        res[i] = left; left *= nums[i]

    right = 1
    for i in range(n - 1, -1, -1):
        res[i] *= right; right *= nums[i]

    return res`}}),e.jsx(q,{num:5,title:"Subarray Sum Divisible by K",difficulty:"LC Medium",tags:["Prefix Mod + HashMap","LC 974"],statement:"Given an integer array <code>nums</code> and an integer <code>k</code>, return the number of non-empty subarrays that have a sum divisible by <code>k</code>.",constraints:["1 ≤ n ≤ 3×10⁴","-10⁴ ≤ nums[i] ≤ 10⁴","2 ≤ k ≤ 10⁴"],examples:[{input:"nums=[4,5,0,-2,-3,1], k=5",output:"7"},{input:"nums=[5],              k=9",output:"0"}],approach:"Prefix sum modulo k. Two positions i and j have pref[j] - pref[i] divisible by k iff pref[j] % k == pref[i] % k. Count pairs of equal remainders using a frequency map. The total pairs from each remainder group of size f is f*(f-1)/2 — but in the hash map approach, adding to count as we scan is simpler. Normalize negative mod in C++: ((rem % k) + k) % k.",code:{cpp:`int subarraysDivByK(vector<int>& nums, int k) {
    unordered_map<int,int> cnt;
    cnt[0] = 1;          // empty prefix (sum=0) remainder = 0
    int pref = 0, res = 0;
    for (int v : nums) {
        pref += v;
        int rem = ((pref % k) + k) % k;  // normalize negative modulo
        res    += cnt[rem];               // each prior equal-rem prefix forms a valid pair
        cnt[rem]++;
    }
    return res;
}
// [4,5,0,-2,-3,1], k=5:
// prefixes: 4,9,9,7,4,5  mods: 4,4,4,2,4,0
// 0 appears 2 times (base + 5) → contributes 1 pair
// 4 appears 4 times → contributes 6 pairs
// total = 7 ✓`,python:`from collections import defaultdict

def subarrays_div_by_k(nums, k):
    cnt = defaultdict(int)
    cnt[0] = 1
    pref = res = 0
    for v in nums:
        pref += v
        rem = pref % k   # Python % always non-negative for positive k
        res += cnt[rem]
        cnt[rem] += 1
    return res`}}),e.jsx(q,{num:6,title:"Maximum Sum Rectangle in a 2D Matrix",difficulty:"LC Hard",tags:["2D Prefix + Kadane's","Classic"],statement:"Given an <code>m × n</code> integer matrix, find the sub-rectangle (contiguous rows and columns) with the <strong>maximum sum</strong> and return that sum. Elements can be negative.",constraints:["1 ≤ m, n ≤ 150","-100 ≤ matrix[i][j] ≤ 100"],examples:[{input:"[[1,2,-1,-4,-20],[-8,-3,4,2,1],[3,8,10,1,3],[-4,-1,1,7,-6]]",output:"29",note:"Sub-rectangle rows 1-3, cols 1-3: 8+4+2+8+10+1 = 29? Actually: -3+4+2+8+10+1+(-1)+1+7=29"},{input:"[[2,1],[-3,-4]]",output:"3",note:"Single element or [2,1] row"}],approach:"Fix left and right column bounds (O(n²) pairs). For each pair, compute a 1D 'row sums' array where row[i] = sum of mat[i][l..r] (using column prefix sums for O(1) each). Run 1D Kadane's on this row array. Total: O(n² × m). The O(n log m) version exists using sorted sets but is rarely needed in interviews.",code:{cpp:`int maxSumSubmatrix(vector<vector<int>>& mat) {
    int R = mat.size(), C = mat[0].size();
    int ans = INT_MIN;
    for (int l = 0; l < C; l++) {
        vector<int> row(R, 0);
        for (int r = l; r < C; r++) {
            // Accumulate column r into row[] sums
            for (int i = 0; i < R; i++) row[i] += mat[i][r];

            // 1D Kadane's on compressed row array
            int maxEnd = row[0], best = row[0];
            for (int i = 1; i < R; i++) {
                maxEnd = max(maxEnd + row[i], row[i]);
                best   = max(best, maxEnd);
            }
            ans = max(ans, best);
        }
    }
    return ans;
}
// Time: O(C² × R)  Space: O(R)`,python:`def max_sum_submatrix(mat):
    R, C = len(mat), len(mat[0])
    ans = float('-inf')
    for l in range(C):
        row = [0] * R
        for r in range(l, C):
            for i in range(R): row[i] += mat[i][r]
            # Kadane's on row
            cur = best = row[0]
            for v in row[1:]:
                cur = max(cur + v, v)
                best = max(best, cur)
            ans = max(ans, best)
    return ans`}})]})}const de=[{id:"fundamentals",label:"1D Prefix Sum"},{id:"partial2d",label:"2D Partial Sum"},{id:"diffarray",label:"Difference Array"},{id:"count",label:"Counting Patterns"},{id:"problems",label:"Problems"}];function pe(){const[r,t]=g.useState("fundamentals"),o={fundamentals:e.jsx(oe,{}),partial2d:e.jsx(ae,{}),diffarray:e.jsx(se,{}),count:e.jsx(le,{}),problems:e.jsx(ce,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 04"}),e.jsx("h1",{className:"page-header-title",children:"Prefix Sum & Partial Sum"}),e.jsx("p",{className:"page-header-subtitle",children:"1D & 2D Prefix Arrays · Difference Array · Product Array · Subarray Count Patterns · Hash Map Techniques"})]}),e.jsx(Q,{tabs:de,active:r,onChange:t}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:o[r]}),e.jsx(U,{moduleId:4})]})}export{pe as default};
