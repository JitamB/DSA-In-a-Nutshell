import{r as j,j as e}from"./index-D9jkHkZY.js";import{S as q,N as W,d as A,c as a,H as x,P as v,G as F,C as O,a as y,T,Q as b,V as C}from"./SectionNav-BHzhBu3R.js";const R="ababcd";function _(t){const p=t.length,r=[],d=Array(p).fill(-1);d[0]=0,r.push({lps:[...d],i:0,len:0,compare:null,action:"base",desc:"lps[0] = 0 always. A single character has no proper prefix that is also a suffix."});let l=1,o=0;for(;l<p;){const i=l,n=o;if(t[l]===t[o])o++,d[l]=o,r.push({lps:[...d],i:l,len:o,compare:[i,n],action:"match",desc:`i=${i}: '${t[i]}'[i] = '${t[n]}'[len=${n}]  ✓  →  len=${o}, lps[${i}]=${o}, advance i`}),l++;else if(o>0){const s=d[o-1];r.push({lps:[...d],i:l,len:s,compare:[i,n],action:"fallback",desc:`i=${i}: '${t[i]}'[i] ≠ '${t[n]}'[len=${n}].  len>0 → FALLBACK: len = lps[${n-1}] = ${s}  (try shorter prefix)`}),o=s}else d[l]=0,r.push({lps:[...d],i:l,len:0,compare:[i,0],action:"zero",desc:`i=${i}: '${t[i]}'[i] ≠ '${t[0]}'[len=0].  len=0, can't fall back  →  lps[${i}]=0, advance i`}),l++}return r.push({lps:[...d],i:p,len:null,compare:null,action:"done",desc:`Complete!  LPS = [${d.join(", ")}]`}),r}const w=_(R),P="ABCABCABC",I="CAB",B=19,S=[{win:0,hash:28,match:!1,desc:"Window 'ABC': hash=28 ≠ 19 (pat_hash). No match — slide."},{win:1,hash:3,match:!1,desc:"Window 'BCA': rolling update: (26×(28−0×9)+0)%29 = 3 ≠ 19. Slide."},{win:2,hash:19,match:!0,desc:"Window 'CAB': rolling: (26×(3−1×9)+1)%29 = 19 = pat_hash  ✓  Verify chars → MATCH at index 2!"},{win:3,hash:28,match:!1,desc:"Window 'ABC': rolling: (26×(19−2×9)+2)%29 = 28 ≠ 19. Slide."},{win:4,hash:3,match:!1,desc:"Window 'BCA': rolling: hash = 3 ≠ 19. Slide."},{win:5,hash:19,match:!0,desc:"Window 'CAB': rolling: hash = 19 = pat_hash  ✓  Verify chars → MATCH at index 5!"},{win:6,hash:28,match:!1,desc:"Window 'ABC': hash=28 ≠ 19. Done! Matches found at indices: [2, 5]."}];function M(){const[t,p]=j.useState("Hello, DSA!"),[r,d]=j.useState(null),l=n=>n>="a"&&n<="z"?"lowercase":n>="A"&&n<="Z"?"uppercase":n>="0"&&n<="9"?"digit":n===" "?"space":"special",o={lowercase:{bg:"var(--color-background-info)",bd:"var(--color-border-info)",tx:"var(--color-text-info)"},uppercase:{bg:"var(--color-background-success)",bd:"var(--color-border-success)",tx:"var(--color-text-success)"},digit:{bg:"var(--color-background-warning)",bd:"var(--color-border-warning)",tx:"var(--color-text-warning)"},space:{bg:"var(--color-background-secondary)",bd:"var(--color-border-secondary)",tx:"var(--color-text-tertiary)"},special:{bg:"var(--color-background-danger)",bd:"var(--color-border-danger)",tx:"var(--color-text-danger)"}},i=t.slice(0,18).split("");return e.jsxs(C,{children:[e.jsx("input",{value:t,onChange:n=>p(n.target.value.slice(0,18)),placeholder:"Type any string (max 18 chars)…",style:{width:"100%",padding:"8px 12px",background:"#0D0F18",border:"1px solid #1E2233",borderRadius:"var(--border-radius-md)",color:"var(--color-background-tertiary)",fontFamily:"var(--font-mono)",fontSize:14,marginBottom:14,outline:"none",boxSizing:"border-box"}}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",marginBottom:14},children:i.map((n,s)=>{const u=l(n),h=o[u],f=r===s;return e.jsxs("div",{onMouseEnter:()=>d(s),onMouseLeave:()=>d(null),style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"default"},children:[e.jsxs("div",{style:{width:46,height:54,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,borderRadius:8,border:`1px solid ${h.bd}`,background:h.bg,transform:f?"translateY(-5px) scale(1.06)":"none",transition:"transform 0.15s, box-shadow 0.15s",boxShadow:f?"0 8px 20px rgba(0,0,0,0.4)":"none"},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:17,fontWeight:700,color:h.tx},children:n===" "?"⎵":n}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:8.5,color:h.tx,opacity:.75},children:n.charCodeAt(0)})]}),e.jsxs("span",{style:{fontSize:8.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",s,"]"]})]},s)})}),r!==null&&r<i.length?e.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"10px 14px",fontFamily:"var(--font-mono)",fontSize:12,lineHeight:2,marginBottom:12},children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0 18px"},children:[e.jsxs("span",{children:[e.jsx("span",{style:{color:"#7A8599"},children:"char: "}),e.jsxs("span",{style:{color:"#9CDCFE",fontWeight:700},children:["'",i[r]===" "?"SP":i[r],"'"]})]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:"#7A8599"},children:"decimal: "}),e.jsx("span",{style:{color:"#4EC9B0"},children:i[r].charCodeAt(0)})]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:"#7A8599"},children:"hex: "}),e.jsxs("span",{style:{color:"#CE9178"},children:["0x",i[r].charCodeAt(0).toString(16).toUpperCase().padStart(2,"0")]})]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:"#7A8599"},children:"binary: "}),e.jsx("span",{style:{color:"#DCDCAA",fontSize:11},children:i[r].charCodeAt(0).toString(2).padStart(8,"0")})]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:"#7A8599"},children:"type: "}),e.jsx("span",{style:{color:o[l(i[r])].tx},children:l(i[r])})]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:"#7A8599"},children:"-'a': "}),e.jsx("span",{style:{color:"#C586C0"},children:i[r].toLowerCase()>="a"&&i[r].toLowerCase()<="z"?i[r].toLowerCase().charCodeAt(0)-97:"N/A"})]})]})}):e.jsx("div",{style:{padding:"8px 12px",background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,fontFamily:"var(--font-mono)",fontSize:11.5,color:"#6f7ba7",marginBottom:12},children:"// Hover any character card to inspect its ASCII properties"}),e.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:Object.entries(o).map(([n,s])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:11},children:[e.jsx("div",{style:{width:9,height:9,borderRadius:2,background:s.bg,border:`1px solid ${s.bd}`}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:n})]},n))})]})}function L(){const[t,p]=j.useState("listen"),[r,d]=j.useState("silent"),l=h=>{const f=Array(26).fill(0);return h.toLowerCase().split("").forEach(c=>{c>="a"&&c<="z"&&f[c.charCodeAt(0)-97]++}),f},o=l(t),i=l(r),n=Math.max(...o,...i,1),s=t.length===r.length&&o.every((h,f)=>h===i[f]),u="abcdefghijklmnopqrstuvwxyz".split("").filter((h,f)=>o[f]>0||i[f]>0);return e.jsxs(C,{children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[["String 1",t,p],["String 2",r,d]].map(([h,f,c])=>e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-tertiary)",marginBottom:4},children:h}),e.jsx("input",{type:"text",value:f,onChange:g=>c(g.target.value.toLowerCase()),style:{width:"100%",padding:"7px 10px",background:"var(--color-background-tertiary)",border:"1px solid #1E2233",borderRadius:"var(--border-radius-md)",color:"var(--color-text-primary)",fontFamily:"var(--font-mono)",fontSize:14,outline:"none",boxSizing:"border-box"}})]},h))}),u.length>0&&e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:8,letterSpacing:"0.06em"},children:"FREQUENCY COMPARISON — solid = s1 · faded = s2"}),e.jsx("div",{style:{display:"flex",gap:5,alignItems:"flex-end",flexWrap:"wrap"},children:u.map(h=>{const f=h.charCodeAt(0)-97,c=o[f],g=i[f],m=c===g,z=52;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsxs("div",{style:{display:"flex",gap:2,alignItems:"flex-end",height:z+4},children:[e.jsx("div",{style:{width:11,height:Math.max(3,c/n*z),borderRadius:"2px 2px 0 0",background:m?"var(--color-background-success)":"var(--color-background-danger)",border:`0.5px solid ${m?"var(--color-border-success)":"var(--color-border-danger)"}`,transition:"height 0.25s, background 0.2s",alignSelf:"flex-end"}}),e.jsx("div",{style:{width:11,height:Math.max(3,g/n*z),borderRadius:"2px 2px 0 0",background:m?"rgba(78,201,176,0.35)":"rgba(244,71,71,0.35)",border:`0.5px solid ${m?"var(--color-border-success)":"var(--color-border-danger)"}`,transition:"height 0.25s, background 0.2s",alignSelf:"flex-end"}})]}),e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:m?"var(--color-text-success)":"var(--color-text-danger)"},children:h}),e.jsxs("span",{style:{fontSize:8,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:[c,"/",g]})]},h)})})]}),e.jsxs("div",{style:{padding:"10px 16px",borderRadius:"var(--border-radius-md)",background:s?"var(--color-background-success)":"var(--color-background-danger)",border:`1px solid ${s?"var(--color-border-success)":"var(--color-border-danger)"}`,display:"flex",alignItems:"center",justifyContent:"center",gap:12,transition:"all 0.2s"},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:s?"var(--color-text-success)":"var(--color-text-danger)"},children:s?"✓  ANAGRAM":"✗  NOT AN ANAGRAM"}),!s&&t.length!==r.length&&e.jsxs("span",{style:{fontSize:11.5,color:"var(--color-text-danger)",fontFamily:"var(--font-mono)"},children:["lengths: ",t.length," ≠ ",r.length]})]})]})}function H(){const[t,p]=j.useState(0),r=S[t],d=I.length,l=S.filter(o=>o.match).map(o=>o.win);return e.jsxs(C,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:r.desc}),e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"TEXT   d=26, q=29, h=d^(m-1)%q=9"}),e.jsx("div",{style:{display:"flex",gap:3},children:P.split("").map((o,i)=>{const n=i>=r.win&&i<r.win+d;return l.includes(i)&&i<r.win,e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx("div",{style:{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:r.match&&n?"var(--color-border-success)":n?"var(--color-border-info)":"var(--color-border-secondary)",background:r.match&&n?"var(--color-background-success)":n?"var(--color-background-info)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:n?700:400,color:r.match&&n?"var(--color-text-success)":n?"var(--color-text-info)":"var(--color-text-secondary)",transition:"all 0.15s"},children:o}),e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:i})]},i)})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:4},children:"PATTERN HASH (precomputed once)"}),e.jsx("div",{style:{display:"flex",gap:5,marginBottom:6},children:I.split("").map((o,i)=>e.jsx("div",{style:{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--color-text-info)"},children:o},i))}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsx("span",{style:{color:"var(--color-text-tertiary)"},children:"hash_pat = "}),e.jsx("span",{style:{color:"var(--color-text-info)",fontWeight:700,fontSize:14},children:B})]})]}),e.jsxs("div",{style:{background:r.match?"var(--color-background-success)":"var(--color-background-secondary)",border:`0.5px solid ${r.match?"var(--color-border-success)":"var(--color-border-secondary)"}`,borderRadius:"var(--border-radius-md)",padding:"9px 12px",transition:"all 0.2s"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:r.match?"var(--color-text-success)":"var(--color-text-tertiary)",marginBottom:4},children:"WINDOW HASH (rolling O(1))"}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,marginBottom:4},children:[e.jsx("span",{style:{color:"var(--color-text-tertiary)"},children:"window: "}),e.jsxs("span",{style:{color:r.match?"var(--color-text-success)":"var(--color-text-info)",fontWeight:700},children:['"',P.slice(r.win,r.win+d),'"']})]}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsx("span",{style:{color:"var(--color-text-tertiary)"},children:"hash_win = "}),e.jsx("span",{style:{fontWeight:700,fontSize:14,color:r.hash===B?"var(--color-text-success)":"var(--color-text-danger)"},children:r.hash}),e.jsx("span",{style:{marginLeft:8,fontSize:11,color:r.match?"var(--color-text-success)":"var(--color-text-danger)"},children:r.hash===B?"= pat_hash ✓":"≠ pat_hash ✗"})]})]})]}),t>0&&e.jsxs("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"8px 12px",fontFamily:"var(--font-mono)",fontSize:11.5,lineHeight:1.8,marginBottom:14},children:[e.jsx("span",{style:{color:"#6A9955"},children:"// Rolling update formula: O(1) per slide"}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"#9CDCFE"},children:"hash_new"}),e.jsx("span",{style:{color:"#7A8599"},children:" = (d × (hash_old − txt[i] × h) + txt[i+m]) % q"})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>p(Math.max(0,t-1)),disabled:t===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:t===0?"not-allowed":"pointer",fontSize:12,opacity:t===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[t+1," / ",S.length]}),e.jsx("button",{onClick:()=>p(Math.min(S.length-1,t+1)),disabled:t===S.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:t===S.length-1?"not-allowed":"pointer",fontSize:12,opacity:t===S.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>p(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function N(){const[t,p]=j.useState("ABCD"),[r,d]=j.useState("CDAB"),l=t+t,o=t.length>0&&r.length>0&&t.length===r.length?l.indexOf(r):-1,i=o!==-1;return e.jsxs(C,{children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[["S1",t,p],["S2 (possible rotation?)",r,d]].map(([n,s,u])=>e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-tertiary)",marginBottom:4},children:n}),e.jsx("input",{type:"text",value:s,onChange:h=>u(h.target.value.toUpperCase()),style:{width:"100%",padding:"7px 10px",background:"var(--color-background-tertiary)",border:"1px solid #1E2233",borderRadius:"var(--border-radius-md)",color:"var(--color-text-primary)",fontFamily:"var(--font-mono)",fontSize:14,outline:"none",boxSizing:"border-box"}})]},n))}),t.length>0&&e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:['S1 + S1 = "',l,'" — scanning for S2']}),e.jsx("div",{style:{display:"flex",gap:3,flexWrap:"wrap"},children:l.split("").map((n,s)=>{const u=o!==-1&&s>=o&&s<o+r.length,h=s===t.length;return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:2},children:[h&&e.jsx("div",{style:{width:2,height:36,background:"var(--color-border-info)",borderRadius:1,opacity:.6}}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx("div",{style:{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,border:"1px solid",borderColor:u?"var(--color-border-success)":s>=t.length?"var(--color-border-info)":"var(--color-border-secondary)",background:u?"var(--color-background-success)":s>=t.length?"rgba(129,180,234,0.1)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:u?700:400,color:u?"var(--color-text-success)":s>=t.length?"var(--color-text-info)":"var(--color-text-secondary)",transition:"all 0.15s"},children:n}),e.jsx("span",{style:{fontSize:8.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:s})]})]},s)})})]}),e.jsx("div",{style:{padding:"10px 16px",borderRadius:"var(--border-radius-md)",background:i?"var(--color-background-success)":t.length!==r.length?"var(--color-background-warning)":"var(--color-background-danger)",border:`1px solid ${i?"var(--color-border-success)":t.length!==r.length?"var(--color-border-warning)":"var(--color-border-danger)"}`,textAlign:"center",transition:"all 0.2s"},children:e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:i?"var(--color-text-success)":t.length!==r.length?"var(--color-text-warning)":"var(--color-text-danger)"},children:t.length!==r.length?"⚠ Different lengths — cannot be rotations":i?`✓ YES — S2 found at index ${o} in S1+S1`:"✗ NOT a rotation"})})]})}function E(){const[t,p]=j.useState(0),r=w[t],d={base:{badge:"Base case",color:"info"},match:{badge:"Match ✓",color:"success"},fallback:{badge:"Fallback ↩",color:"warning"},zero:{badge:"No match",color:"danger"},done:{badge:"Complete ✓",color:"success"}},l=d[r.action]||d.base;return e.jsxs(C,{children:[e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",marginBottom:12},children:[e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:600,background:`var(--color-background-${l.color})`,color:`var(--color-text-${l.color})`,border:`1px solid var(--color-border-${l.color})`,whiteSpace:"nowrap"},children:l.badge}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:r.desc})]}),e.jsxs("div",{style:{marginBottom:6},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:['STRING "',R,'" — ',e.jsx("span",{style:{color:"var(--color-text-info)"},children:"blue = i (scan)"})," · ",e.jsx("span",{style:{color:"var(--color-text-success)"},children:"green = len (prefix match)"})]}),e.jsx("div",{style:{display:"flex",gap:4},children:R.split("").map((o,i)=>{const n=r.compare&&r.compare[0]===i,s=r.compare&&r.compare[1]===i&&!n,u=r.compare&&r.compare[0]===i&&r.compare[1]===i,h=r.action==="done",f=r.action==="match"&&(n||s);let c="var(--color-background-secondary)",g="var(--color-border-secondary)",m="var(--color-text-secondary)";return h?(c="var(--color-background-success)",g="var(--color-border-success)",m="var(--color-text-success)"):u?(c="var(--color-background-info)",g="var(--color-border-info)",m="var(--color-text-info)"):f?(c="var(--color-background-success)",g="var(--color-border-success)",m="var(--color-text-success)"):n&&(r.action==="fallback"||r.action==="zero")?(c="var(--color-background-danger)",g="var(--color-border-danger)",m="var(--color-text-danger)"):n?(c="var(--color-background-info)",g="var(--color-border-info)",m="var(--color-text-info)"):s&&(c="var(--color-background-success)",g="var(--color-border-success)",m="var(--color-text-success)"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:7,border:`1px solid ${g}`,background:c,fontFamily:"var(--font-mono)",fontSize:15,fontWeight:n||s||h?700:400,color:m,transition:"all 0.18s"},children:o}),e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:n?"var(--color-text-info)":s?"var(--color-text-success)":"var(--color-text-tertiary)"},children:n&&s?"i=l":n?"i":s?"len":i})]},i)})})]}),e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"LPS[] — filling in as we go"}),e.jsx("div",{style:{display:"flex",gap:4},children:r.lps.map((o,i)=>{const n=o!==-1,s=r.action!=="done"&&r.compare&&r.compare[0]===i&&r.action!=="fallback";return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:7,border:"1px solid",borderColor:s?"var(--color-border-success)":n?"var(--color-border-info)":"var(--color-border-tertiary)",background:s?"var(--color-background-success)":n?"rgba(129,180,234,0.1)":"var(--color-background-tertiary)",fontFamily:"var(--font-mono)",fontSize:15,fontWeight:n?700:400,color:s?"var(--color-text-success)":n?"var(--color-text-info)":"var(--color-text-tertiary)",transition:"all 0.2s"},children:n?o:"?"}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",i,"]"]})]},i)})})]}),r.action==="fallback"&&e.jsxs("div",{style:{background:"var(--color-background-warning)",border:"1px solid var(--color-border-warning)",borderRadius:"var(--border-radius-md)",padding:"8px 12px",marginBottom:14,fontSize:12.5,color:"var(--color-text-warning)",lineHeight:1.65},children:[e.jsx("strong",{children:"Fallback:"})," Instead of resetting to 0 (as in naive search), we fall back to ",e.jsx("code",{children:"len = lps[len−1]"})," — trying the next-shorter prefix that could still extend. This is the KMP optimization: we reuse previously computed prefix info."]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>p(Math.max(0,t-1)),disabled:t===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:t===0?"not-allowed":"pointer",fontSize:12,opacity:t===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[t+1," / ",w.length]}),e.jsx("button",{onClick:()=>p(Math.min(w.length-1,t+1)),disabled:t===w.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:t===w.length-1?"not-allowed":"pointer",fontSize:12,opacity:t===w.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>p(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const K={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function k({num:t,title:p,difficulty:r,tags:d=[],statement:l,constraints:o=[],examples:i=[],approach:n,code:s}){const[u,h]=j.useState(!1),f=K[r]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",t]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:p})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[d.map(c=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:c},c)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${f})`,color:`var(--color-text-${f})`,border:`1px solid var(--color-border-${f})`},children:r})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:l}}),o.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:o.map((c,g)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:c},g))})]}),i.length>0&&e.jsx("div",{style:{marginBottom:14},children:i.map((c,g)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",g+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:c.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:c.output})]}),c.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:c.note})]},g))}),e.jsxs("button",{onClick:()=>h(!u),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:u?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${u?"eye-off":"bulb"}`}),u?"Hide Solution":"Show Approach & Solution"]}),u&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),n]}),e.jsx(y,{children:s})]})]})]})}function D(){return e.jsxs("div",{children:[e.jsxs(A,{color:"info",icon:"ti-letter-case",children:[e.jsx("strong",{children:"String definition:"})," A sequence of characters stored in contiguous memory. The character encoding determines how many bytes each character occupies — ASCII uses 8 bits (1 byte) for the 128 standard characters; UTF-16 uses 16 bits (2 bytes) to support Unicode's 65,536 characters."]}),e.jsx(x,{children:"Character Explorer — ASCII Under the Hood"}),e.jsxs(v,{children:["Every string algorithm that operates on characters depends on their integer representation. The ",e.jsx(a,{children:"count[str[i] - 'a']"})," trick that powers anagram checkers and frequency maps only works because characters ",e.jsx("em",{children:"are"})," integers. Hover any character below to see its complete numeric identity."]}),e.jsx(M,{}),e.jsxs(A,{color:"success",icon:"ti-math",children:["The key trick: ",e.jsx("code",{children:"str[i] - 'a'"})," maps any lowercase letter to 0–25. This turns a character into a perfect array index — no hash function needed. Uppercase: ",e.jsx("code",{children:"str[i] - 'A'"}),". Any ASCII: use ",e.jsx("code",{children:"count[256]"})," directly indexed by ASCII value."]}),e.jsx(x,{children:"Memory Model — C / C++ / Java"}),e.jsx(T,{heads:["Language","Type","Char Set","Size","Null Terminated?"],rows:[["C","char[]","ASCII","8-bit","Yes — \\0 at end, strlen() counts until \\0"],["C++","char[]","ASCII","8-bit","Yes — same as C; pointer to literal is read-only"],["C++","std::string","ASCII","dynamic","No — length stored explicitly, O(1) .length()"],["Java","char","UTF-16","16-bit","No — String is an immutable object, not an array"],["Python","str","Unicode","4 bytes/char (CPython)","No — len() is O(1)"]]}),e.jsx(y,{children:{cpp:`// ── C-style strings — manual, dangerous ──────────────
char s1[] = "hello";          // array on stack, mutable
char *s2  = "hello";          // pointer to read-only literal (undefined if modified)
printf("%zu", strlen(s1));    // O(n): scans until \\0
// s2 = "world" is valid (pointer reassignment)
// s2[0] = 'H' is UNDEFINED BEHAVIOR (modifying literal)

// ── C++ string — safe, full-featured ──────────────────
#include <string>
string s = "hello";
s += " world";                // O(n) amortized append
cout << s.length();           // O(1) — stored separately
cout << s.substr(0, 5);       // O(k) — copies k chars
cout << s.find("world");      // O(n) naive; returns string::npos if absent
if (s.find("xyz") == string::npos) cout << "not found";`,python:`# Python — strings are immutable Unicode sequences
s = "hello"
print(len(s))            # O(1)
print(s[1:4])            # O(k) — slicing copies
print(s.find("ell"))     # O(n·m) — returns -1 if absent (not npos)
print(s.upper())         # O(n)
print(s.split(" "))      # O(n)

# String is IMMUTABLE — every "modification" creates a new object
# Use list for in-place char manipulation, then ''.join() at end`}}),e.jsx(x,{children:"Reading Strings — cin vs getline"}),e.jsxs(F,{cols:2,children:[e.jsxs(O,{title:"cin >> str",color:"warning",children:["Reads until whitespace. Input ",e.jsx("code",{children:'"Hello World"'})," puts only ",e.jsx("code",{children:'"Hello"'})," in str. Fast, but cannot capture spaces. Use for single-word tokens."]}),e.jsxs(O,{title:"getline(cin, str)",color:"success",children:["Reads the entire line including spaces, until newline (or custom delimiter). Use when input may contain spaces. Call after ",e.jsx("code",{children:"cin"})," reads: need ",e.jsx("code",{children:"cin.ignore()"})," to flush leftover ",e.jsx("code",{children:"\\n"}),"."]})]}),e.jsx(y,{lang:"cpp",children:`// After reading an int with cin, there's a leftover \\n
int n; cin >> n;
cin.ignore();               // discard the \\n before getline
string line;
getline(cin, line);         // now reads full line correctly

// Custom delimiter: stop at 'g'
getline(cin, line, 'g');    // reads until 'g' is encountered`}),e.jsx(x,{children:"Character Frequency — The Hash Bucket Pattern"}),e.jsxs(v,{children:["A fixed 26-element array indexed by ",e.jsx(a,{children:"c - 'a'"})," acts as a perfect hash for lowercase letters. Filling this array in one pass and iterating in index order gives a ",e.jsx("strong",{children:"sorted frequency count"})," in O(n + 26) = O(n) — no sorting step needed."]}),e.jsx(y,{children:{cpp:`// Print frequencies in sorted lexicographic order — O(n)
void charFrequency(string& str) {
    int count[26] = {0};
    for (char c : str)
        count[c - 'a']++;           // hash: 'a'→0, 'b'→1, …, 'z'→25
    for (int i = 0; i < 26; i++)
        if (count[i] > 0)
            cout << (char)('a' + i) << ": " << count[i] << "\\n";
}
// "geeksforgeeks" → e:4, f:1, g:2, k:2, o:1, r:1, s:2  (sorted)`,python:`from collections import Counter

def char_frequency(s):
    count = [0] * 26
    for c in s: count[ord(c) - ord('a')] += 1
    for i in range(26):
        if count[i]: print(f"{chr(ord('a')+i)}: {count[i]}")

# Alternatively, use Counter (not sorted):
# Counter("geeksforgeeks") → {'e':4,'k':2,'g':2,'s':2,'f':1,'o':1,'r':1}`}}),e.jsx(b,{q:"Why do C-style string literals throw errors when you try to modify them?",a:"String literals like <code>'hello'</code> are stored in the read-only data segment of the program's memory. The compiler places them there at compile time, and the OS marks that segment as non-writable. A pointer <code>char* p = 'hello'</code> points into this read-only region. Writing <code>p[0] = 'H'</code> triggers a segmentation fault on modern systems. Using <code>char arr[] = 'hello'</code> copies the literal onto the stack, making it mutable."}),e.jsx(b,{q:"In C++, why is string::npos returned for a failed .find() rather than -1?",a:"<code>std::string::find()</code> returns a value of type <code>size_t</code>, which is an unsigned integer. The value -1 for an unsigned integer wraps around to the maximum value for that type (e.g., 2^64−1 on 64-bit systems). <code>string::npos</code> is defined as <code>(size_t)-1</code> — i.e., all bits set. Always compare with <code>== string::npos</code>, never with <code>!= -1</code>, since the signed/unsigned comparison can produce unexpected results."}),e.jsx(b,{q:"What is the time complexity of string concatenation s1 + s2 in C++ vs Python?",a:"C++: <code>operator+</code> on std::string copies both strings into a new string — O(|s1| + |s2|). Using <code>+=</code> is O(|s2|) amortized (like vector append). Python: <code>s1 + s2</code> creates a new str object — O(n+m). Concatenating in a loop is O(n²) total. Use <code>''.join(list)</code> for O(n) multi-string concatenation in Python — it pre-calculates the total length and allocates once."})]})}function $(){return e.jsxs("div",{children:[e.jsx(x,{children:"Anagram Check — Live Frequency Comparison"}),e.jsx(v,{children:"Two strings are anagrams iff they have identical character frequencies. The O(n log n) sort approach is intuitive but unnecessary — a single-pass frequency build-and-compare is O(n) with O(1) extra space (26 or 256 buckets)."}),e.jsx(L,{}),e.jsx(y,{children:{cpp:`bool areAnagram(string& s1, string& s2) {
    if (s1.length() != s2.length()) return false;
    int count[256] = {};             // universal ASCII bucket — O(1) extra space
    for (int i = 0; i < (int)s1.length(); i++) {
        count[(unsigned char)s1[i]]++;
        count[(unsigned char)s2[i]]--;
    }
    for (int i = 0; i < 256; i++)
        if (count[i]) return false;  // any nonzero → mismatch
    return true;
}
// "listen" / "silent" → true  |  "aab" / "bab" → false`,python:`def are_anagram(s1, s2):
    if len(s1) != len(s2): return False
    count = [0] * 256
    for c1, c2 in zip(s1, s2):
        count[ord(c1)] += 1; count[ord(c2)] -= 1
    return all(x == 0 for x in count)

# Pythonic:
from collections import Counter
def are_anagram_py(s1, s2): return Counter(s1) == Counter(s2)`}}),e.jsx(x,{children:"Leftmost Repeating Character — Right-to-Left Trick"}),e.jsxs(v,{children:["Naive O(n²): for each character, scan the rest. O(n) trick: scan ",e.jsx("em",{children:"right to left"}),", maintaining a visited array. When you see a character you've seen before, update ",e.jsx(a,{children:"res = i"}),". After the full scan, ",e.jsx(a,{children:"res"})," holds the leftmost duplicate — because each update overwrites to a smaller index."]}),e.jsx(y,{children:{cpp:`int leftmostRepeating(string str) {
    bool visited[256] = {};
    int res = -1;
    for (int i = str.length() - 1; i >= 0; i--) {
        if (visited[(unsigned char)str[i]]) res = i;   // overwrite → keeps smallest i
        else visited[(unsigned char)str[i]] = true;
    }
    return res;
}
// "geeksforgeeks" → 0 ('g')  |  "abbce" → 1 ('b')  |  "abcd" → -1`,python:`def leftmost_repeating(s):
    visited = [False] * 256
    res = -1
    for i in range(len(s) - 1, -1, -1):
        if visited[ord(s[i])]: res = i
        else: visited[ord(s[i])] = True
    return res`}}),e.jsx(x,{children:"Leftmost Non-Repeating Character — Index Tracking Map"}),e.jsxs(v,{children:["Store the ",e.jsx("em",{children:"index"})," of first occurrence for each character: ",e.jsx(a,{children:"-1"})," = unseen, ",e.jsx(a,{children:"i"})," = seen once at index ",e.jsx(a,{children:"i"}),", ",e.jsx(a,{children:"-2"})," = duplicate. After one pass, scan the index array for the smallest non-negative value."]}),e.jsx(y,{children:{cpp:`int leftmostNonRepeating(string str) {
    int fIndex[256];
    fill(fIndex, fIndex + 256, -1);        // -1 = not seen

    for (int i = 0; i < (int)str.length(); i++) {
        unsigned char c = str[i];
        if      (fIndex[c] == -1) fIndex[c] = i;   // first occurrence
        else if (fIndex[c] >= 0)  fIndex[c] = -2;   // duplicate — mark invalid
    }

    int res = INT_MAX;
    for (int i = 0; i < 256; i++)
        if (fIndex[i] >= 0) res = min(res, fIndex[i]);
    return res == INT_MAX ? -1 : res;
}
// "geeksforgeeks" → 5 ('f')  |  "aabb" → -1`,python:`def leftmost_non_repeating(s):
    f_index = [-1] * 256
    for i, c in enumerate(s):
        oc = ord(c)
        if   f_index[oc] == -1: f_index[oc] = i
        elif f_index[oc] >= 0:  f_index[oc] = -2
    valid = [x for x in f_index if x >= 0]
    return min(valid) if valid else -1`}}),e.jsx(x,{children:"Reverse Words in a Sentence — O(n), O(1)"}),e.jsx(v,{children:"Two-step reversal: (1) reverse each individual word in place; (2) reverse the entire string. The effect: word order is reversed, but each word's characters remain in correct order."}),e.jsx(y,{children:{cpp:`// Reverses characters in str[lo..hi] in-place
void rev(string& str, int lo, int hi) {
    while (lo < hi) { swap(str[lo++], str[hi--]); }
}

string reverseWords(string str) {
    int n = str.size(), start = 0;
    // Step 1: reverse each word individually
    for (int i = 0; i <= n; i++) {
        if (i == n || str[i] == ' ') {
            rev(str, start, i - 1);
            start = i + 1;
        }
    }
    // Step 2: reverse the entire string
    rev(str, 0, n - 1);
    return str;
}
// "Welcome to gfg" → "gfg to Welcome"`,python:`def reverse_words(s):
    # Pythonic O(n):
    return ' '.join(s.split()[::-1])

# O(1) auxiliary space equivalent:
def reverse_words_inplace(s):
    chars = list(s); n = len(chars); start = 0
    def rev(lo, hi):
        while lo < hi: chars[lo], chars[hi] = chars[hi], chars[lo]; lo+=1; hi-=1
    for i in range(n+1):
        if i == n or chars[i] == ' ':
            rev(start, i-1); start = i+1
    rev(0, n-1)
    return ''.join(chars)`}}),e.jsx(b,{q:"Why does the right-to-left scan find the leftmost repeating character?",a:"When scanning right-to-left, every time we encounter a character already in the visited set (a duplicate), we update res = i. Since we're moving from right to left, each update replaces the previous candidate with a smaller index. After the full scan, res holds the minimum index among all characters that appear more than once — i.e., the leftmost repeating character. Scanning left-to-right would require a second pass to verify if the first occurrence is a duplicate."}),e.jsx(b,{q:"What's the difference between leftmost repeating and leftmost non-repeating? Can both return -1?",a:"Leftmost repeating: the first character (by position) that appears at least twice. Returns -1 if all characters are distinct (e.g., 'abcd'). Leftmost non-repeating: the first character that appears exactly once. Returns -1 if all characters are duplicated (e.g., 'aabb'). A string of all identical chars (e.g., 'aaaa') returns index 0 for repeating and -1 for non-repeating."})]})}function U(){return e.jsxs("div",{children:[e.jsx(x,{children:"Pattern Searching Algorithms — Overview"}),e.jsx(T,{heads:["Algorithm","Time (worst)","Space","Key Idea"],rows:[["Naive","O((n−m+1)×m)","O(1)","Try each position, compare all m chars"],["Naive (distinct pat)","O(n)","O(1)","On mismatch at j, skip j positions (all unique)"],["Rabin-Karp","O((n−m+1)×m)","O(1)","Hash comparison; O(1) rolling hash update"],["KMP","O(n)","O(m)","LPS array enables smart pattern backtracking"],["Suffix Tree","O(m) query","O(n)","Preprocess text; all queries in O(m)"]]}),e.jsx(x,{children:"Naive Search & the Distinct-Pattern Optimization"}),e.jsxs(v,{children:["Standard naive: try every position, compare all ",e.jsx(a,{children:"m"})," characters — O(nm). Optimization: if all pattern characters are ",e.jsx("em",{children:"distinct"}),", a mismatch at position ",e.jsx(a,{children:"j"})," means txt[i..i+j-1] matched pat[0..j-1], and since all pattern chars are distinct, none of them can be a prefix of the pattern when shifted less than ",e.jsx(a,{children:"j"})," positions. Safe to advance by ",e.jsx(a,{children:"j"}),"."]}),e.jsx(y,{children:{cpp:`// Standard naive search
void naiveSearch(string txt, string pat) {
    int n = txt.length(), m = pat.length();
    for (int i = 0; i <= n - m; i++) {
        int j;
        for (j = 0; j < m; j++)
            if (txt[i + j] != pat[j]) break;
        if (j == m) cout << "Match at " << i << "\\n";
    }
}

// Optimized: pattern has all distinct characters
void distinctPatternSearch(string txt, string pat) {
    int n = txt.length(), m = pat.length(), i = 0;
    while (i <= n - m) {
        int j;
        for (j = 0; j < m; j++)
            if (pat[j] != txt[i + j]) break;
        if (j == m) cout << i << " ";   // full match
        i += (j == 0) ? 1 : j;          // skip j positions if j>0
    }
}`,python:`def naive_search(txt, pat):
    n, m = len(txt), len(pat)
    for i in range(n - m + 1):
        if txt[i:i+m] == pat: print(i, end=' ')

def distinct_pattern_search(txt, pat):
    n, m = len(txt), len(pat); i = 0
    while i <= n - m:
        j = 0
        while j < m and pat[j] == txt[i+j]: j += 1
        if j == m: print(i, end=' ')
        i += max(1, j)   # skip j if j > 0, else 1`}}),e.jsx(x,{children:"Rabin-Karp — Rolling Hash"}),e.jsxs(v,{children:["Instead of character-by-character comparison at each position, Rabin-Karp computes a ",e.jsx("strong",{children:"hash"})," of the current text window and compares it to the pattern hash. The key: the next window's hash can be computed from the current window's hash in ",e.jsx("em",{children:"O(1)"})," using the rolling formula — no recomputation from scratch."]}),e.jsx(H,{}),e.jsx(y,{children:{cpp:`void rabinKarp(string txt, string pat, int d = 256, int q = 101) {
    int n = txt.size(), m = pat.size();
    int h = 1, p = 0, t = 0;
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;  // h = d^(m-1) % q

    // Initial hash for pattern and first window
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;    // Horner's method
        t = (d * t + txt[i]) % q;
    }

    for (int i = 0; i <= n - m; i++) {
        if (p == t) {                 // hash match — verify (may be spurious)
            int j;
            for (j = 0; j < m; j++)
                if (txt[i + j] != pat[j]) break;
            if (j == m) cout << i << " ";
        }
        // Rolling update: O(1) per step
        if (i < n - m) {
            t = (d * (t - txt[i] * h) + txt[i + m]) % q;
            if (t < 0) t += q;        // normalize negative modulo
        }
    }
}`,python:`def rabin_karp(txt, pat, d=256, q=101):
    n, m = len(txt), len(pat)
    h = pow(d, m-1, q)    # d^(m-1) % q
    p = t = 0
    for i in range(m):
        p = (d*p + ord(pat[i])) % q
        t = (d*t + ord(txt[i])) % q
    for i in range(n - m + 1):
        if p == t:
            if txt[i:i+m] == pat: print(i, end=' ')  # verify
        if i < n - m:
            t = (d*(t - ord(txt[i])*h) + ord(txt[i+m])) % q
            if t < 0: t += q`}}),e.jsxs(A,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"Spurious hits:"})," Two different strings can have the same hash (collision). When hash_window == hash_pattern, always verify character-by-character. A well-chosen prime ",e.jsx(a,{children:"q"})," minimizes collisions. Average case: O(n+m). Worst case with many spurious hits: O(nm) — same as naive."]}),e.jsx(x,{children:"String Rotation Check — The Elegant O(n) Trick"}),e.jsxs(v,{children:["S2 is a rotation of S1 iff S2 is a ",e.jsx("em",{children:"substring"})," of S1+S1. Why? Concatenating S1 with itself creates all possible rotations as substrings. Use any O(n) substring search (KMP, built-in) on the concatenated string."]}),e.jsx(N,{}),e.jsx(y,{children:{cpp:`bool areRotations(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    return (s1 + s1).find(s2) != string::npos;
    // Or use KMP for guaranteed O(n) instead of std::find's O(n²) worst case
}
// "ABCD" / "CDAB" → true  (found at index 2 in "ABCDABCD")
// "ABAB" / "ABBA" → false (not a substring of "ABABABAB")`,python:`def are_rotations(s1, s2):
    if len(s1) != len(s2): return False
    return s2 in (s1 + s1)   # Python's 'in' operator uses Boyer-Moore-Horspool`}}),e.jsx(b,{q:"What causes spurious hits in Rabin-Karp and how does the choice of q help?",a:"A spurious hit occurs when two different strings produce the same hash — a collision. With a larger prime q, hash values are spread over a wider range, reducing collision probability to approximately 1/q. For q = 101, spurious hit probability per window ≈ 1%. For q = 10^9+7 (common in competitive programming), spurious hits are extremely rare. The tradeoff: larger q means we need 64-bit integers to avoid overflow during computation."}),e.jsx(b,{q:"Why does the rotation trick work? Doesn't S1+S1 contain false rotations?",a:"Every rotation of S1 by k positions produces a string that appears exactly once as a substring of S1+S1 starting at position n-k. There are no false rotations: a string of the same length that is NOT a rotation cannot appear as a length-n substring of S1+S1 because all length-n substrings of S1+S1 are exactly the n rotations of S1. This bijection is the proof of correctness."})]})}function G(){return e.jsxs("div",{children:[e.jsxs(A,{color:"purple",icon:"ti-bolt",children:[e.jsx("strong",{children:"KMP's superpower:"})," When a mismatch occurs at pattern position ",e.jsx(a,{children:"j"}),', naive search restarts from pattern[0]. KMP uses the LPS array to say: "the first ',e.jsx(a,{children:"lps[j-1]"}),' characters of the pattern still match — jump there instead." The text index ',e.jsx(a,{children:"i"})," ",e.jsx("em",{children:"never moves backward"}),", giving guaranteed O(n) regardless of input."]}),e.jsx(x,{children:"The LPS Array — Definition"}),e.jsxs(v,{children:[e.jsx(a,{children:"lps[i]"})," = length of the ",e.jsx("strong",{children:"longest proper prefix"})," of ",e.jsx(a,{children:"str[0..i]"})," that is also a suffix of ",e.jsx(a,{children:"str[0..i]"}),'. "Proper" means the prefix cannot be the string itself (length < i+1). This tells us: at any mismatch position, how far we can slide the pattern without missing a valid match.']}),e.jsxs(F,{cols:2,children:[e.jsx(O,{title:"Examples",color:"info",children:e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,lineHeight:2},children:['"ababcd" → [0, 0, ',e.jsx("strong",{children:"1, 2"}),", 0, 0]",e.jsx("br",{}),'"aaaa"   → [0, 1, 2, 3]',e.jsx("br",{}),'"abcabc" → [0, 0, 0, 1, 2, 3]',e.jsx("br",{}),'"abacabad" → [0, 0, 1, 0, 1, 2, 3, 0]']})}),e.jsx(O,{title:"Interpreting lps[i] = k",color:"success",children:e.jsx("div",{style:{fontSize:13,lineHeight:1.7},children:"str[0..k-1] is a prefix that equals str[i-k+1..i] (a suffix). On mismatch at pattern[i+1], jump pattern to position k — we know pattern[0..k-1] still matches the text."})})]}),e.jsx(x,{children:"Building the LPS Array — Interactive Step-Through"}),e.jsxs(v,{children:["Two pointers: ",e.jsx(a,{children:"len"})," (green) tracks the current matching prefix length; ",e.jsx(a,{children:"i"})," (blue) scans the string. The key — on mismatch with ",e.jsx(a,{children:"len > 0"}),", we don't reset ",e.jsx(a,{children:"len"})," to 0. We fall back to ",e.jsx(a,{children:"lps[len-1]"}),", reusing previously computed prefix info. This is what makes the build O(n)."]}),e.jsx(E,{}),e.jsx(y,{children:{cpp:`// Build LPS array — O(n) time, O(n) space
void buildLPS(string pat, vector<int>& lps) {
    int m = pat.size(), len = 0;
    lps.resize(m, 0);
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            lps[i++] = ++len;      // match: extend prefix
        } else if (len > 0) {
            len = lps[len - 1];    // fallback: try shorter prefix
            // i stays — we re-compare pat[i] with pat[new len]
        } else {
            lps[i++] = 0;          // no prefix possible
        }
    }
}`,python:`def build_lps(pat):
    m, lps, len_, i = len(pat), [0]*len(pat), 0, 1
    while i < m:
        if pat[i] == pat[len_]:
            len_ += 1; lps[i] = len_; i += 1
        elif len_ > 0:
            len_ = lps[len_ - 1]   # fallback — i unchanged
        else:
            lps[i] = 0; i += 1
    return lps`}}),e.jsx(x,{children:"KMP Search — Using the LPS to Skip"}),e.jsxs(v,{children:["After building the LPS array in O(m), scan the text in O(n). On mismatch: if ",e.jsx(a,{children:"j > 0"}),", set ",e.jsx(a,{children:"j = lps[j-1]"})," and retry (text index ",e.jsx(a,{children:"i"})," unchanged). If ",e.jsx(a,{children:"j = 0"}),", advance ",e.jsx(a,{children:"i"}),". On match: advance both. When ",e.jsx(a,{children:"j = m"}),", a full match is found at ",e.jsx(a,{children:"i - m"}),"; reset ",e.jsx(a,{children:"j = lps[j-1]"})," to find overlapping matches."]}),e.jsx(y,{children:{cpp:`void KMPsearch(string txt, string pat) {
    int n = txt.size(), m = pat.size();
    vector<int> lps;
    buildLPS(pat, lps);

    int i = 0, j = 0;  // i: text pointer, j: pattern pointer
    while (i < n) {
        if (txt[i] == pat[j]) { i++; j++; }

        if (j == m) {
            cout << "Match at " << i - m << "\\n";
            j = lps[j - 1];   // reset to continue searching (finds overlapping)
        } else if (i < n && txt[i] != pat[j]) {
            if (j > 0) j = lps[j - 1];  // skip using LPS — i stays
            else       i++;              // no prefix to reuse, move text
        }
    }
}
// Time: O(n + m)  |  "AAAAA", "AAA" → matches at 0, 1, 2  (overlapping)`,python:`def kmp_search(txt, pat):
    lps = build_lps(pat)
    n, m = len(txt), len(pat); i = j = 0
    while i < n:
        if txt[i] == pat[j]: i += 1; j += 1
        if j == m:
            print(f"Match at {i - m}")
            j = lps[j - 1]
        elif i < n and txt[i] != pat[j]:
            if j > 0: j = lps[j - 1]
            else: i += 1`}}),e.jsx(x,{children:"Why KMP is O(n) — The Amortized Argument"}),e.jsxs(v,{children:[e.jsx(a,{children:"i"})," only ever moves ",e.jsx("em",{children:"forward"})," (never decremented). ",e.jsx(a,{children:"j"})," can decrease via fallbacks, but the total number of decreases is bounded by the total number of increases — and ",e.jsx(a,{children:"j"})," increases at most n times (once per ",e.jsx(a,{children:"i"})," advance). So total operations ≤ 2n. Combined with the O(m) LPS build: total O(n + m)."]}),e.jsx(T,{heads:["Algorithm","Preprocessing","Search","Total","Space"],rows:[["Naive","—","O((n−m+1)m)","O(nm)","O(1)"],["KMP","O(m)","O(n)","O(n+m)","O(m)"],["Rabin-Karp","O(m)","O(n) avg","O(n+m)","O(1)"]]}),e.jsx(b,{q:"Why does the LPS fallback use lps[len-1] and not lps[i-1]?",a:"When a mismatch occurs between pat[i] and pat[len], we know pat[0..len-1] matches the previous i-1 characters. We want the next-longest prefix of pat[0..len-1] that is also a suffix — which is exactly lps[len-1] (the LPS value for the substring ending at len-1). Using lps[i-1] would be wrong because i is the position of the mismatch, not the end of the matching portion."}),e.jsx(b,{q:"Does KMP find overlapping occurrences? How?",a:"Yes. After finding a match (j reaches m), instead of resetting j to 0 (which would skip potential overlapping matches), we set j = lps[m-1]. This positions the pattern so its longest prefix-suffix is aligned with the end of the found match — exactly where an overlapping match could start. Example: txt='AAAAA', pat='AAA' — KMP finds matches at 0, 1, 2 correctly."}),e.jsx(b,{q:"When would you choose Rabin-Karp over KMP?",a:"KMP is strictly better for single-pattern search in most cases. Rabin-Karp excels at <em>multi-pattern search</em>: you can use a rolling hash and maintain a set of pattern hashes, matching any pattern in O(1) per text position after a hash match check. KMP would need to run k separate searches for k patterns (O(k×n)). Rabin-Karp's average case with good hashing is O(n + sum(m_i)) for all k patterns simultaneously."})]})}function V(){return e.jsxs("div",{children:[e.jsx(A,{color:"purple",icon:"ti-tournament",children:"6 problems from fundamentals to KMP. All are asked in IIT OAs and FAANG phone screens. Attempt independently before revealing solutions."}),e.jsx(k,{num:1,title:"Character Frequency in Sorted Order",difficulty:"OA Easy",tags:["Hash Bucket","Warm-up"],statement:"Given a string <code>s</code> consisting of lowercase English letters, print each character that appears in <code>s</code> along with its frequency in <strong>sorted lexicographic order</strong>.",constraints:["1 ≤ |s| ≤ 10⁵","s contains only lowercase letters","O(n) time, O(1) space"],examples:[{input:'s = "geeksforgeeks"',output:"e:4 f:1 g:2 k:2 o:1 r:1 s:2"},{input:'s = "aab"',output:"a:2 b:1"}],approach:"Build a fixed 26-element frequency array indexed by (char - 'a'). Iterate the string once to fill counts. Then iterate the 26 buckets in order (already sorted) and print non-zero entries. The index order gives lexicographic order automatically — no sorting step needed.",code:{cpp:`void charFreq(string& s) {
    int cnt[26] = {};
    for (char c : s) cnt[c - 'a']++;
    for (int i = 0; i < 26; i++)
        if (cnt[i]) cout << (char)('a'+i) << ":" << cnt[i] << " ";
}`,python:`def char_freq(s):
    cnt = [0] * 26
    for c in s: cnt[ord(c)-97] += 1
    for i in range(26):
        if cnt[i]: print(f"{chr(97+i)}:{cnt[i]}", end=' ')`}}),e.jsx(k,{num:2,title:"Leftmost Non-Repeating Character",difficulty:"OA Medium",tags:["Index Map","Single Pass"],statement:"Given a string, find the index of the <strong>first character that does not repeat</strong> anywhere else in the string. If all characters repeat, return <code>-1</code>.",constraints:["1 ≤ |s| ≤ 10⁵","s contains only lowercase letters"],examples:[{input:'"geeksforgeeks"',output:"5",note:"'f' at index 5 is the first non-repeating char"},{input:'"aabb"',output:"-1"},{input:'"zxvzxv"',output:"-1"}],approach:"Two-pass approach: (1) count frequency of each character; (2) scan string left to right and return the first index where frequency == 1. Alternatively, one-pass with an index map: store -1 (unseen), i (first index), -2 (duplicate). Then find minimum non-negative value in the map.",code:{cpp:`int leftmostNonRepeating(string s) {
    int cnt[26] = {};
    for (char c : s) cnt[c-'a']++;
    for (int i = 0; i < (int)s.size(); i++)
        if (cnt[s[i]-'a'] == 1) return i;
    return -1;
}`,python:`def leftmost_non_repeating(s):
    cnt = [0]*26
    for c in s: cnt[ord(c)-97] += 1
    for i, c in enumerate(s):
        if cnt[ord(c)-97] == 1: return i
    return -1`}}),e.jsx(k,{num:3,title:"Reverse Words in a String",difficulty:"OA Medium",tags:["Two-Phase Reversal","In-place"],statement:"Given a string <code>s</code>, reverse the order of the <strong>words</strong>. Words are separated by single spaces. The individual characters of each word must remain in the same order.",constraints:["1 ≤ |s| ≤ 10⁴","s contains letters and single spaces","No leading/trailing spaces"],examples:[{input:'"Welcome to gfg"',output:'"gfg to Welcome"'},{input:'"the sky is blue"',output:'"blue is sky the"'}],approach:"Two-phase reversal: (1) reverse each individual word in-place (use a start pointer, advance until space); (2) reverse the entire string. Phase 1 un-reverses each word's characters; phase 2 reverses word order. Total: O(n) time, O(1) space.",code:{cpp:`string reverseWords(string s) {
    int n = s.size(), start = 0;
    auto rev = [&](int lo, int hi) {
        while (lo < hi) swap(s[lo++], s[hi--]);
    };
    for (int i = 0; i <= n; i++) {
        if (i == n || s[i] == ' ') { rev(start, i-1); start = i+1; }
    }
    rev(0, n-1);
    return s;
}`,python:`def reverse_words(s):
    return ' '.join(s.split()[::-1])

# O(1) auxiliary space (in-place list):
def reverse_words_inplace(s):
    chars = list(s); n = len(chars); start = 0
    def rev(lo, hi):
        while lo < hi: chars[lo],chars[hi]=chars[hi],chars[lo]; lo+=1; hi-=1
    for i in range(n+1):
        if i==n or chars[i]==' ': rev(start,i-1); start=i+1
    rev(0,n-1); return ''.join(chars)`}}),e.jsx(k,{num:4,title:"Check If One String Is a Rotation of Another",difficulty:"OA Medium",tags:["S1+S1 Trick","Substring Search"],statement:"Given two strings <code>s1</code> and <code>s2</code> of equal length, determine whether <code>s2</code> is a <strong>rotation</strong> of <code>s1</code>. A rotation shifts all characters by some amount and wraps the end around to the beginning.",constraints:["1 ≤ |s1|, |s2| ≤ 10⁵","Strings consist of lowercase letters"],examples:[{input:'s1="ABCD", s2="CDAB"',output:"true",note:"Rotate left by 2: ABCD → CDAB"},{input:'s1="ABAB", s2="ABBA"',output:"false"},{input:'s1="abc",  s2="cab"',output:"true",note:"Rotate left by 1: abc → cab"}],approach:"S2 is a rotation of S1 iff S2 is a substring of S1+S1. Proof: all n rotations of S1 appear as length-n substrings of S1+S1. First check lengths are equal (necessary condition), then use any O(n) substring search. KMP gives guaranteed O(n).",code:{cpp:`bool isRotation(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    return (s1 + s1).find(s2) != string::npos;
    // For guaranteed O(n): use KMP search instead of find()
}`,python:`def is_rotation(s1, s2):
    return len(s1) == len(s2) and s2 in (s1 + s1)`}}),e.jsx(k,{num:5,title:"Permutation in String (Anagram Substring Search)",difficulty:"LC Medium",tags:["Sliding Window","LC 567"],statement:"Given strings <code>s1</code> and <code>s2</code>, return <code>true</code> if <code>s2</code> contains any <strong>permutation</strong> (anagram) of <code>s1</code> as a contiguous substring.",constraints:["1 ≤ |s1|, |s2| ≤ 10⁴","Both strings consist of lowercase letters"],examples:[{input:'s1="ab", s2="eidbaooo"',output:"true",note:'"ba" is an anagram of "ab" at index 3'},{input:'s1="ab", s2="eidboaoo"',output:"false"}],approach:"Fixed sliding window of size m=|s1| over s2. Maintain frequency arrays need[] (from s1) and have[] (from current window). Track a 'satisfied' counter — increment when have[c] first equals need[c], decrement on over-removal. Window is valid when satisfied == required. Slide by adding new right char and removing old left char.",code:{cpp:`bool checkInclusion(string s1, string s2) {
    if (s1.size() > s2.size()) return false;
    int need[26]={}, have[26]={}, satisfied=0, required=0;
    for (char c : s1) { if (++need[c-'a'] == 1) required++; }

    int m = s1.size();
    for (int i = 0; i < (int)s2.size(); i++) {
        // Add right char
        int r = s2[i] - 'a';
        if (++have[r] == need[r]) satisfied++;
        // Remove left char (once window > m)
        if (i >= m) {
            int l = s2[i-m] - 'a';
            if (have[l]-- == need[l]) satisfied--;
        }
        if (i >= m-1 && satisfied == required) return true;
    }
    return false;
}`,python:`def check_inclusion(s1, s2):
    if len(s1) > len(s2): return False
    need, have = [0]*26, [0]*26
    for c in s1: need[ord(c)-97] += 1
    satisfied = required = sum(1 for x in need if x > 0)
    m = len(s1)
    for i, c in enumerate(s2):
        r = ord(c)-97; have[r] += 1
        if have[r] == need[r]: satisfied -= 1  # countdown style
        if i >= m:
            l = ord(s2[i-m])-97; have[l] -= 1
            if have[l] == need[l]-1: satisfied += 1
        if i >= m-1 and satisfied == 0: return True
    return False`}}),e.jsx(k,{num:6,title:"KMP — Count All Pattern Occurrences",difficulty:"OA Hard",tags:["LPS Array","KMP Search"],statement:"Given a text string <code>txt</code> and pattern string <code>pat</code>, find <strong>all starting indices</strong> where <code>pat</code> occurs in <code>txt</code>. The occurrences may overlap.",constraints:["1 ≤ |txt| ≤ 10⁵","1 ≤ |pat| ≤ |txt|","O(n+m) time required"],examples:[{input:'txt="AAAAA", pat="AAA"',output:"[0, 1, 2]",note:"Overlapping matches"},{input:'txt="GEEKSFORGEEKS", pat="GEEKS"',output:"[0, 8]"},{input:'txt="AABCCAABC", pat="AABC"',output:"[0, 5]"}],approach:"KMP: (1) Build LPS array for pat in O(m). (2) Two-pointer scan over txt with pattern pointer j: on match advance both; on full match (j==m) record index and reset j=lps[m-1] (enables overlapping detection); on mismatch j=lps[j-1] if j>0 else advance i. Total: O(n+m), O(m) space.",code:{cpp:`vector<int> KMPsearch(string txt, string pat) {
    int n = txt.size(), m = pat.size();
    // Build LPS
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) { lps[i++] = ++len; }
        else if (len)            { len = lps[len-1]; }
        else                     { lps[i++] = 0; }
    }
    // Search
    vector<int> res;
    i = 0; int j = 0;
    while (i < n) {
        if (txt[i] == pat[j]) { i++; j++; }
        if (j == m) { res.push_back(i-m); j = lps[j-1]; }
        else if (i < n && txt[i] != pat[j]) {
            if (j) j = lps[j-1]; else i++;
        }
    }
    return res;
}`,python:`def kmp_search(txt, pat):
    n, m = len(txt), len(pat)
    lps = [0]*m; l = 0; i = 1
    while i < m:
        if pat[i] == pat[l]: l+=1; lps[i]=l; i+=1
        elif l: l = lps[l-1]
        else: lps[i]=0; i+=1
    res = []; i = j = 0
    while i < n:
        if txt[i] == pat[j]: i+=1; j+=1
        if j == m: res.append(i-m); j = lps[j-1]
        elif i < n and txt[i] != pat[j]:
            if j: j = lps[j-1]
            else: i+=1
    return res`}})]})}const Y=[{id:"memory",label:"Memory & Fundamentals"},{id:"patterns",label:"Classic Patterns"},{id:"search",label:"Pattern Searching"},{id:"kmp",label:"KMP Algorithm"},{id:"problems",label:"Problems"}];function J(){const[t,p]=j.useState("memory"),r={memory:e.jsx(D,{}),patterns:e.jsx($,{}),search:e.jsx(U,{}),kmp:e.jsx(G,{}),problems:e.jsx(V,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 06"}),e.jsx("h1",{className:"page-header-title",children:"Strings"}),e.jsx("p",{className:"page-header-subtitle",children:"ASCII · Character Hashing · Anagrams · Pattern Search · Rabin-Karp Rolling Hash · KMP & LPS Array"})]}),e.jsx(q,{tabs:Y,active:t,onChange:p}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[t]}),e.jsx(W,{moduleId:6})]})}export{J as default};
