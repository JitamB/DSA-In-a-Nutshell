import{r as T,j as e}from"./index-D9jkHkZY.js";import{S as L,N as $,d as S,H as m,G as F,C as N,P as g,a as f,c as R,M as P,T as B,Q as b,V as E}from"./SectionNav-BHzhBu3R.js";function W(s){const l=[],r=[],o=[];function i(t){if(t===s.length){const n=[...r];o.push(n),l.push({cur:n,emitted:o.map(a=>[...a]),action:"emit",depth:t,desc:`✓  Emit: {${n.length?n.join(", "):"∅"}}  —  ${o.length} subset${o.length>1?"s":""} found`});return}r.push(s[t]),l.push({cur:[...r],emitted:o.map(n=>[...n]),action:"include",elem:s[t],depth:t,desc:`Include ${s[t]}  →  current = [${[...r].join(", ")}]`}),i(t+1),r.pop(),l.push({cur:[...r],emitted:o.map(n=>[...n]),action:"exclude",elem:s[t],depth:t,desc:`Backtrack: exclude ${s[t]}  →  current = [${r.join(", ")||"∅"}]`}),i(t+1)}return l.push({cur:[],emitted:[],action:"init",depth:0,desc:`Generate all subsets of [${s.join(", ")}]. At each index: choose INCLUDE or EXCLUDE.`}),i(0),l}const v=W([1,2,3]);function H(s){const l=[],r=[];let o=0;const i=(a,d)=>{for(let c=0;c<r.length;c++)if(r[c]===d||Math.abs(c-a)===Math.abs(r[c]-d))return!1;return!0},t=(a,d)=>{for(let c=0;c<r.length;c++){if(r[c]===d)return`same column as row ${c}`;if(Math.abs(c-a)===Math.abs(r[c]-d))return`diagonal from (${c},${r[c]})`}return"conflict"};function n(a){if(a===s){o++,l.push({queens:[...r],action:"solution",solCount:o,desc:`✓ Solution ${o}: queens at columns [${r.join(", ")}]`});return}for(let d=0;d<s;d++)i(a,d)?(r.push(d),l.push({queens:[...r],action:"place",row:a,col:d,solCount:o,desc:`Row ${a}: place queen at col ${d}`}),n(a+1),r.pop(),l.push({queens:[...r],action:"backtrack",row:a,col:d,solCount:o,desc:`Row ${a}: remove queen from col ${d} → backtrack`})):l.push({queens:[...r],action:"conflict",row:a,col:d,solCount:o,desc:`(${a},${d}): ${t(a,d)} → skip`})}return l.push({queens:[],action:"init",solCount:0,desc:`N-Queens (n=${s}): place one queen per row, no two queens share column or diagonal.`}),n(0),l}const y=H(4),D=[1,2,3],U=[4,5,6],k=10;function q(s){return Array.from({length:1<<s.length},(l,r)=>{const o=s.filter((i,t)=>r&1<<t);return{elems:o,sum:o.reduce((i,t)=>i+t,0),mask:r}})}const M=q(D),I=q(U),O=[...I].sort((s,l)=>s.sum-l.sum);function G(){const[s,l]=T.useState(0),r=v[Math.min(s,v.length-1)],i={init:null,include:"success",exclude:"warning",emit:"info"}[r.action];return e.jsxs(E,{children:[e.jsxs("div",{style:{marginBottom:14,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[i&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:600,background:`var(--color-background-${i})`,color:`var(--color-text-${i})`,border:`1px solid var(--color-border-${i})`,whiteSpace:"nowrap"},children:r.action==="include"?"Include ✓":r.action==="exclude"?"Backtrack ↩":r.action==="emit"?"Emit ★":""}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:r.desc})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"CURRENT SUBSET BEING BUILT"}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",minHeight:40,alignItems:"center"},children:r.cur.length===0?e.jsx("span",{style:{padding:"6px 14px",borderRadius:8,border:"1px dashed var(--color-border-tertiary)",fontFamily:"var(--font-mono)",fontSize:13,color:"var(--color-text-tertiary)"},children:"∅"}):r.cur.map((t,n)=>e.jsx("div",{style:{width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:7,border:"1px solid var(--color-border-success)",background:"var(--color-background-success)",fontFamily:"var(--font-mono)",fontSize:15,fontWeight:700,color:"var(--color-text-success)"},children:t},n))})]}),r.emitted.length>0&&e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:["SUBSETS FOUND SO FAR (",r.emitted.length," / 8)"]}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap"},children:r.emitted.map((t,n)=>{const a=r.action==="emit"&&n===r.emitted.length-1;return e.jsx("div",{style:{padding:"3px 10px",borderRadius:6,fontFamily:"var(--font-mono)",fontSize:12,background:a?"var(--color-background-info)":"var(--color-background-secondary)",border:`1px solid ${a?"var(--color-border-info)":"var(--color-border-secondary)"}`,color:a?"var(--color-text-info)":"var(--color-text-secondary)",fontWeight:a?700:400,transition:"all 0.15s"},children:"{"+(t.length?t.join(","):"∅")+"}"},n)})})]}),r.depth<3&&e.jsxs("div",{style:{display:"flex",gap:4,marginBottom:14,alignItems:"center",fontSize:11.5,fontFamily:"var(--font-mono)"},children:[e.jsx("span",{style:{color:"var(--color-text-tertiary)"},children:"Deciding on element:"}),[1,2,3].map((t,n)=>e.jsx("div",{style:{width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,border:"1px solid",borderColor:n===r.depth&&r.action!=="emit"&&r.action!=="init"?r.action==="include"?"var(--color-border-success)":"var(--color-border-warning)":"var(--color-border-secondary)",background:n===r.depth&&r.action!=="emit"&&r.action!=="init"?r.action==="include"?"var(--color-background-success)":"var(--color-background-warning)":"var(--color-background-secondary)",color:n===r.depth?r.action==="include"?"var(--color-text-success)":"var(--color-text-warning)":"var(--color-text-secondary)",fontWeight:n===r.depth?700:400,fontSize:13},children:t},n))]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>l(Math.max(0,s-1)),s===0],["Next →",()=>l(Math.min(v.length-1,s+1)),s===v.length-1]].map(([t,n,a])=>e.jsx("button",{onClick:n,disabled:a,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:a?"not-allowed":"pointer",fontSize:12,opacity:a?.4:1},children:t},t)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:72,textAlign:"center",alignSelf:"center"},children:[s+1," / ",v.length]}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>l(v.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function Q(){const[l,r]=T.useState(0),o=y[Math.min(l,y.length-1)],t={init:null,place:"success",conflict:"danger",backtrack:"warning",solution:"info"}[o.action],n=new Set;for(let c=0;c<o.queens.length;c++){const u=o.queens[c];for(let p=0;p<4;p++){n.add(`${p},${u}`);const h=p-c;u+h>=0&&u+h<4&&n.add(`${p},${u+h}`),u-h>=0&&u-h<4&&n.add(`${p},${u-h}`)}}const a=o.action==="solution",d=o.action==="conflict"?`${o.row},${o.col}`:null;return e.jsxs(E,{children:[e.jsxs("div",{style:{marginBottom:14,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[t&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:600,background:`var(--color-background-${t})`,color:`var(--color-text-${t})`,border:`1px solid var(--color-border-${t})`,whiteSpace:"nowrap"},children:o.action==="place"?"Place ✓":o.action==="conflict"?"Conflict ✗":o.action==="backtrack"?"Backtrack ↩":o.action==="solution"?`Solution ${o.solCount} ★`:""}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:o.desc})]}),e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"flex-start"},children:[e.jsx("div",{children:e.jsx("div",{style:{display:"inline-flex",flexDirection:"column",gap:3,border:"2px solid var(--color-border-secondary)",borderRadius:6,padding:6,background:"var(--color-background-secondary)"},children:Array.from({length:4},(c,u)=>e.jsx("div",{style:{display:"flex",gap:3},children:Array.from({length:4},(p,h)=>{const x=`${u},${h}`,C=u<o.queens.length&&o.queens[u]===h,z=x===d,A=n.has(x)&&!C&&!z;let w=(u+h)%2===0?"#1E2233":"#161A27",_="transparent";return C&&a?(w="var(--color-background-info)",_="var(--color-border-info)"):C?(w="var(--color-background-success)",_="var(--color-border-success)"):z?(w="var(--color-background-danger)",_="var(--color-border-danger)"):A&&(w=o.queens.length>0?"rgba(244,71,71,0.12)":"inherit"),e.jsx("div",{style:{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,background:w,border:`1.5px solid ${_}`,fontSize:22,transition:"all 0.15s"},children:C?"♛":z?"✗":""},h)})},u))})}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"QUEENS PLACED"}),o.queens.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,marginBottom:12},children:o.queens.map((c,u)=>e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",fontSize:12,fontFamily:"var(--font-mono)"},children:[e.jsxs("span",{style:{color:"var(--color-text-tertiary)",minWidth:40},children:["Row ",u,":"]}),e.jsxs("span",{style:{color:"var(--color-text-info)"},children:["col ",c]})]},u))}):e.jsx("div",{style:{fontSize:12,color:"var(--color-text-tertiary)",marginBottom:12},children:"Board is empty"}),e.jsxs("div",{style:{padding:"7px 10px",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",borderRadius:"var(--border-radius-md)",fontSize:11.5,fontFamily:"var(--font-mono)",color:"var(--color-text-secondary)"},children:["Solutions: ",e.jsx("strong",{style:{color:"var(--color-text-success)"},children:o.solCount})," / 2"]})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:14},children:[[["← Prev",()=>r(Math.max(0,l-1)),l===0],["Next →",()=>r(Math.min(y.length-1,l+1)),l===y.length-1]].map(([c,u,p])=>e.jsx("button",{onClick:u,disabled:p,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:p?"not-allowed":"pointer",fontSize:12,opacity:p?.4:1},children:c},c)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:80,textAlign:"center",alignSelf:"center"},children:[l+1," / ",y.length]}),e.jsx("button",{onClick:()=>r(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>r(y.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function V(){const[s,l]=T.useState(0),r=["Split","Enumerate Halves","Sort Right","Search & Match"],o=["Split [1,2,3,4,5,6] into LEFT=[1,2,3] and RIGHT=[4,5,6]. Brute force: O(2⁶)=64 combinations. MITM: O(2³+2³)=16 subset enumerations.","Enumerate all 2³=8 subset sums for each half independently. Total: 16 operations instead of 64.","Sort right-half sums: [0,4,5,6,9,10,11,15]. Now binary search is possible.","For each left sum L, binary search for (target−L)=(10−L) in sorted right. Matches highlighted."];return M.filter(i=>O.some(t=>t.sum===k-i.sum)),O.filter(i=>M.some(t=>t.sum===k-i.sum)),e.jsxs(E,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"},children:r.map((i,t)=>e.jsxs("button",{onClick:()=>l(t),style:{padding:"4px 10px",border:"1px solid",borderColor:s===t?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:s===t?"var(--color-background-info)":"transparent",color:s===t?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12,fontFamily:"var(--font-sans)"},children:[t+1,". ",i]},t))}),e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:o[s]}),s===0&&e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center",justifyContent:"center",flexWrap:"wrap"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6},children:"FULL ARRAY"}),e.jsx("div",{style:{display:"flex",gap:3},children:[1,2,3,4,5,6].map((i,t)=>e.jsx("div",{style:{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,border:"1px solid",borderColor:t<3?"var(--color-border-info)":"var(--color-border-warning)",background:t<3?"var(--color-background-info)":"var(--color-background-warning)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:t<3?"var(--color-text-info)":"var(--color-text-warning)"},children:i},t))})]}),e.jsx("div",{style:{fontSize:22,color:"var(--color-text-tertiary)"},children:"→"}),[{label:"LEFT HALF",arr:[1,2,3],color:"info"},{label:"RIGHT HALF",arr:[4,5,6],color:"warning"}].map(({label:i,arr:t,color:n})=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:`var(--color-text-${n})`,marginBottom:6},children:[i,"  (2³=8 subsets)"]}),e.jsx("div",{style:{display:"flex",gap:3},children:t.map((a,d)=>e.jsx("div",{style:{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,border:`1px solid var(--color-border-${n})`,background:`var(--color-background-${n})`,fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:`var(--color-text-${n})`},children:a},d))})]},i))]}),s===1&&e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[{label:"LEFT subset sums",sums:M,color:"info"},{label:"RIGHT subset sums",sums:I,color:"warning"}].map(({label:i,sums:t,color:n})=>e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:`var(--color-text-${n})`,marginBottom:8,letterSpacing:"0.06em"},children:i}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:t.map((a,d)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 10px",borderRadius:5,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",fontFamily:"var(--font-mono)",fontSize:11.5},children:[e.jsx("span",{style:{color:"var(--color-text-tertiary)"},children:"{"+(a.elems.length?a.elems.join(","):"∅")+"}"}),e.jsxs("span",{style:{color:`var(--color-text-${n})`,fontWeight:700},children:["= ",a.sum]})]},d))})]},i))}),s===2&&e.jsxs("div",{children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:12},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-warning)",marginBottom:8},children:"RIGHT sums (unsorted)"}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap"},children:I.map((i,t)=>e.jsx("div",{style:{padding:"3px 8px",borderRadius:4,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-secondary)"},children:i.sum},t))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-success)",marginBottom:8},children:"SORTED → binary search ready"}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap"},children:O.map((i,t)=>e.jsx("div",{style:{padding:"3px 8px",borderRadius:4,background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",fontFamily:"var(--font-mono)",fontSize:12,fontWeight:600,color:"var(--color-text-success)"},children:i.sum},t))})]})]}),e.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,padding:"9px 12px",fontFamily:"var(--font-mono)",fontSize:12,color:"#6A9955"},children:"// O(2^(n/2) × n/2) sort — far cheaper than O(2^n) brute force"})]}),s===3&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:4,letterSpacing:"0.06em"},children:["For each left sum L, search for (target=",k,"−L) in sorted right. Matches = valid subsets summing to ",k,"."]}),M.map((i,t)=>{const n=k-i.sum,a=O.find(c=>c.sum===n),d=!!a;return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:6,background:d?"var(--color-background-success)":"var(--color-background-secondary)",border:`0.5px solid ${d?"var(--color-border-success)":"var(--color-border-secondary)"}`,fontFamily:"var(--font-mono)",fontSize:12,transition:"all 0.15s"},children:[e.jsxs("span",{style:{color:"var(--color-text-info)",minWidth:50},children:["L=",i.sum]}),e.jsxs("span",{style:{color:"var(--color-text-secondary)",minWidth:30},children:["(","{"+(i.elems.join(",")||"∅")+"}",")"]}),e.jsxs("span",{style:{color:"var(--color-text-tertiary)"},children:["need ",n]}),d?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:"var(--color-text-success)",marginLeft:4},children:"→ found!"}),e.jsx("span",{style:{color:"var(--color-text-success)",marginLeft:8,fontWeight:700},children:"{"+[...i.elems,...a.elems].sort((c,u)=>c-u).join(",")+"} = "+k})]}):e.jsx("span",{style:{color:"var(--color-text-tertiary)",marginLeft:4},children:"→ not found"})]},t)})]})]})}const X={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function j({num:s,title:l,difficulty:r,tags:o=[],statement:i,constraints:t=[],examples:n=[],approach:a,code:d}){const[c,u]=T.useState(!1),p=X[r]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",s]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:l})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[o.map(h=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:h},h)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${p})`,color:`var(--color-text-${p})`,border:`1px solid var(--color-border-${p})`},children:r})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:i}}),t.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:t.map((h,x)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:h},x))})]}),n.length>0&&e.jsx("div",{style:{marginBottom:14},children:n.map((h,x)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",x+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:h.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:h.output})]}),h.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:h.note})]},x))}),e.jsxs("button",{onClick:()=>u(!c),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:c?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${c?"eye-off":"bulb"}`}),c?"Hide Solution":"Show Approach & Solution"]}),c&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),a]}),e.jsx(f,{children:d})]})]})]})}function Y(){return e.jsxs("div",{children:[e.jsxs(S,{color:"info",icon:"ti-git-branch",children:[e.jsx("strong",{children:"Backtracking:"})," A systematic algorithm that incrementally builds candidates to the solution, and ",e.jsx("em",{children:"abandons"}),' ("backtracks") a candidate as soon as it determines that it cannot lead to a valid solution — pruning the search tree.']}),e.jsx(m,{children:"Backtracking vs Pure Brute Force"}),e.jsxs(F,{cols:2,children:[e.jsxs(N,{title:"Brute Force",color:"danger",children:["Enumerate ",e.jsx("em",{children:"all"})," possible candidates, check validity after complete construction. O(k^n) — no early termination. E.g., generating all strings then filtering valid ones."]}),e.jsxs(N,{title:"Backtracking",color:"success",children:["Build candidates incrementally. ",e.jsx("strong",{children:"Prune immediately"})," when a partial candidate cannot lead to any valid solution. O(k^n) worst case but typically much faster due to pruning."]})]}),e.jsx(m,{children:"The Universal Template — Choose · Explore · Unchoose"}),e.jsx(f,{children:{cpp:`// Universal Backtracking Template
void backtrack(State& state, int depth, vector<Result>& results) {
    // ── Base case: reached a complete candidate ────────────
    if (isComplete(state)) {
        if (isValid(state)) results.push_back(state);
        return;
    }

    // ── Try all choices at current depth ──────────────────
    for (auto& choice : getChoices(state, depth)) {
        if (isPromising(state, choice)) {    // PRUNING: skip dead branches
            choose(state, choice);           // 1. CHOOSE
            backtrack(state, depth + 1, results); // 2. EXPLORE
            unchoose(state, choice);         // 3. UNCHOOSE (undo the choice)
        }
    }
}`,python:`def backtrack(state, depth, results):
    # Base case: complete candidate
    if is_complete(state):
        if is_valid(state): results.append(state[:])  # copy!
        return

    # Try all choices, prune early
    for choice in get_choices(state, depth):
        if is_promising(state, choice):   # PRUNE dead branches
            choose(state, choice)          # 1. CHOOSE
            backtrack(state, depth+1, results)  # 2. EXPLORE
            unchoose(state, choice)        # 3. UNCHOOSE`}}),e.jsxs(S,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"The most common bug:"})," forgetting the ",e.jsx("code",{children:"unchoose"})," step. If you don't undo your choice after exploring its subtree, subsequent branches inherit the previous branch's state — giving incorrect results. Always restore state after every recursive call."]}),e.jsx(m,{children:"Subset Generation — Step Through the Tree"}),e.jsxs(g,{children:["The include/exclude paradigm: at each index, make a binary choice — include the element in the current subset or exclude it. Step through the full decision tree for ",e.jsx(R,{children:"[1, 2, 3]"})," below. Notice how ",e.jsx("em",{children:"backtrack steps undo an include"}),", and the exploration is exactly depth-first left-to-right."]}),e.jsx(G,{}),e.jsx(f,{children:{cpp:`void generateSubsets(vector<int>& arr, int idx, vector<int>& cur, vector<vector<int>>& result) {
    if (idx == arr.size()) {
        result.push_back(cur);   // base case: emit current subset
        return;
    }
    // Choice 1: INCLUDE arr[idx]
    cur.push_back(arr[idx]);
    generateSubsets(arr, idx + 1, cur, result);
    cur.pop_back();              // UNCHOOSE: undo the include

    // Choice 2: EXCLUDE arr[idx]
    generateSubsets(arr, idx + 1, cur, result);
}`,python:`def generate_subsets(arr, idx=0, cur=None, result=None):
    if cur is None: cur = []
    if result is None: result = []
    if idx == len(arr):
        result.append(cur[:])   # copy! not reference
        return result
    cur.append(arr[idx])                         # CHOOSE include
    generate_subsets(arr, idx+1, cur, result)
    cur.pop()                                    # UNCHOOSE
    generate_subsets(arr, idx+1, cur, result)    # EXCLUDE branch
    return result`}}),e.jsx(m,{children:"Complexity — Analysing the Decision Tree"}),e.jsx(B,{heads:["Problem","Branching factor","Tree depth","Nodes","Time"],rows:[["Subsets","2 (include/exclude)","n","2ⁿ","O(n × 2ⁿ)  — copying each subset"],["Permutations","n, n-1, n-2, …","n","n!","O(n × n!)  — n! leaves, n time each"],["Combinations","≤ n-depth","r","nCr","O(r × nCr)"],["N-Queens","≤ n per row","n","≤n!","O(n! / pruning)  — much less with constraints"],["Sudoku","≤ 9 per cell","81","≤9^81","O(9^m) where m = empty cells"]]}),e.jsx(b,{q:"What is the key difference between backtracking and dynamic programming?",a:"Both avoid redundant computation but through different mechanisms. DP memoizes <em>overlapping subproblems</em> — the same sub-state is reached from multiple paths, so cache it. Backtracking prunes the search tree — it discards entire subtrees when a partial solution cannot possibly lead to a valid complete solution. DP builds bottom-up or top-down with subproblem reuse. Backtracking is inherently top-down and state-based with no reuse."}),e.jsx(b,{q:"Why must we copy the current state when adding to results (e.g., result.push_back(cur) vs result.push_back(cur[:]))?",a:"The same <code>cur</code> vector is mutated throughout the recursion. If you push a reference (or the C++ vector without the copy constructor), all results would point to the same vector — which ends up empty when the algorithm finishes. You must push a <em>snapshot</em>: C++ <code>result.push_back(cur)</code> copies the vector by value (safe). Python <code>result.append(cur)</code> pushes a reference — must use <code>cur[:]</code> or <code>list(cur)</code> to copy."})]})}function K(){return e.jsxs("div",{children:[e.jsx(m,{children:"Permutations — All n! Orderings"}),e.jsxs(g,{children:["Generate all permutations of a list. At each depth, try adding each unused element. The ",e.jsx("code",{children:"used[]"})," array (or a swap-based approach) tracks which elements are already in the current permutation."]}),e.jsx(f,{children:{cpp:`// Permutations — using a 'used' boolean array
void permute(vector<int>& nums, vector<bool>& used,
             vector<int>& cur, vector<vector<int>>& result) {
    if (cur.size() == nums.size()) { result.push_back(cur); return; }
    for (int i = 0; i < nums.size(); i++) {
        if (used[i]) continue;          // skip if already in current permutation
        used[i] = true;
        cur.push_back(nums[i]);
        permute(nums, used, cur, result);
        cur.pop_back();
        used[i] = false;                // backtrack
    }
}
// [1,2,3] → 6 permutations: [1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]`,python:`def permute(nums):
    result = []
    def bt(cur, remaining):
        if not remaining: result.append(cur[:]); return
        for i in range(len(remaining)):
            cur.append(remaining[i])
            bt(cur, remaining[:i] + remaining[i+1:])
            cur.pop()
    bt([], nums); return result`}}),e.jsx(m,{children:"Combination Sum — All Subsets Summing to Target"}),e.jsx(g,{children:"Find all combinations of candidates that sum to target. Elements can be reused (unbounded). Prune by checking if current sum exceeds target early — this is the key pruning that makes it efficient."}),e.jsx(f,{children:{cpp:`void combinationSum(vector<int>& candidates, int target, int start,
                     vector<int>& cur, vector<vector<int>>& result) {
    if (target == 0) { result.push_back(cur); return; }
    for (int i = start; i < candidates.size(); i++) {
        if (candidates[i] > target) break;   // PRUNE: sorted, so rest also too large
        cur.push_back(candidates[i]);
        combinationSum(candidates, target - candidates[i], i, cur, result); // i (not i+1): reuse allowed
        cur.pop_back();
    }
}
// Prerequisite: sort(candidates) to enable the break-prune above
// [2,3,6,7], target=7 → [[2,2,3],[7]]`,python:`def combination_sum(candidates, target):
    candidates.sort()
    result = []
    def bt(start, cur, remaining):
        if remaining == 0: result.append(cur[:]); return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining: break   # pruning
            cur.append(candidates[i])
            bt(i, cur, remaining - candidates[i])  # i (not i+1): reuse allowed
            cur.pop()
    bt(0, [], target); return result`}}),e.jsx(m,{children:"N-Queens — The Classic Constraint-Satisfaction Problem"}),e.jsx(g,{children:"Place N queens on an N×N board such that no two queens threaten each other (same row, column, or diagonal). Backtrack whenever placing a queen causes a conflict. The key pruning: check row, column, and both diagonals before placing."}),e.jsx(Q,{}),e.jsx(f,{children:{cpp:`vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> result;
    vector<int> queens;  // queens[row] = col

    // Fast O(1) conflict check using three sets
    unordered_set<int> cols, diag1, diag2;

    auto bt = [&](auto& self, int row) -> void {
        if (row == n) {
            // Build board from queens[]
            vector<string> board(n, string(n, '.'));
            for (int r = 0; r < n; r++) board[r][queens[r]] = 'Q';
            result.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row-col) || diag2.count(row+col)) continue;
            queens.push_back(col);
            cols.insert(col); diag1.insert(row-col); diag2.insert(row+col);
            self(self, row + 1);
            queens.pop_back();
            cols.erase(col); diag1.erase(row-col); diag2.erase(row+col);
        }
    };
    bt(bt, 0); return result;
}`,python:`def solve_n_queens(n):
    result, queens, cols, diag1, diag2 = [], [], set(), set(), set()
    def bt(row):
        if row == n:
            board = ['.'*q + 'Q' + '.'*(n-q-1) for q in queens]
            result.append(board); return
        for col in range(n):
            if col in cols or row-col in diag1 or row+col in diag2: continue
            queens.append(col); cols.add(col); diag1.add(row-col); diag2.add(row+col)
            bt(row + 1)
            queens.pop(); cols.discard(col); diag1.discard(row-col); diag2.discard(row+col)
    bt(0); return result`}}),e.jsxs(S,{color:"success",icon:"ti-bulb",children:[e.jsx("strong",{children:"O(1) conflict check:"})," Instead of scanning all placed queens on each attempt, maintain three hash sets: ",e.jsx("code",{children:"cols"}),", ",e.jsx("code",{children:"diag1"})," (row-col = constant on ↗ diagonals), and ",e.jsx("code",{children:"diag2"})," (row+col = constant on ↘ diagonals). This reduces per-placement check from O(n) to O(1), making the total O(n!) instead of O(n² × n!)."]}),e.jsx(b,{q:"Why does the Combination Sum solution sort candidates before backtracking?",a:"Sorting enables the <code>break</code> pruning: if <code>candidates[i] > remaining</code>, then all <code>candidates[j]</code> for j > i are also too large (since the array is sorted). Without sorting, we'd need <code>continue</code> instead of <code>break</code>, visiting all remaining candidates even when they're all too large. The sort makes this O(n log n + backtracking) vs O(n × backtracking) for the pruning cost."}),e.jsx(b,{q:"How many solutions does N-Queens have for different N, and why does N=2 have none?",a:"N=1: 1, N=2: 0, N=3: 0, N=4: 2, N=5: 10, N=6: 4, N=7: 40, N=8: 92. For N=2, any queen at (0,0) or (0,1) attacks all of row 1 — column + both diagonals cover all 4 squares. N=3 similarly has no solution. The non-trivial smallest solution is N=4."})]})}function J(){return e.jsxs("div",{children:[e.jsxs(S,{color:"warning",icon:"ti-scissors",children:["Pruning is what separates usable backtracking from theoretical exponential enumeration. Every constraint you can check early eliminates an entire subtree. The key: ",e.jsx("strong",{children:"prune as high in the tree as possible"}),"."]}),e.jsx(m,{children:"Sudoku Solver — Multi-Constraint Pruning"}),e.jsx(g,{children:"Fill a 9×9 grid with digits 1–9 such that each row, column, and 3×3 box contains each digit exactly once. The constraint density makes backtracking very effective — most branches are pruned within 1–3 moves."}),e.jsx(f,{children:{cpp:`bool solveSudoku(vector<vector<char>>& board) {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] != '.') continue;   // skip filled cells
            for (char d = '1'; d <= '9'; d++) {
                if (isValid(board, r, c, d)) {
                    board[r][c] = d;             // CHOOSE
                    if (solveSudoku(board)) return true;  // EXPLORE
                    board[r][c] = '.';           // UNCHOOSE
                }
            }
            return false;   // no digit worked → propagate failure
        }
    }
    return true;  // all cells filled
}

bool isValid(vector<vector<char>>& b, int row, int col, char d) {
    for (int i = 0; i < 9; i++) {
        if (b[row][i] == d) return false;    // row conflict
        if (b[i][col] == d) return false;    // col conflict
        int r = 3*(row/3) + i/3, c = 3*(col/3) + i%3;
        if (b[r][c] == d) return false;      // box conflict
    }
    return true;
}`,python:`def solve_sudoku(board):
    def is_valid(r, c, d):
        for i in range(9):
            if board[r][i]==d or board[i][c]==d: return False
            if board[3*(r//3)+i//3][3*(c//3)+i%3]==d: return False
        return True
    def bt():
        for r in range(9):
            for c in range(9):
                if board[r][c] != '.': continue
                for d in '123456789':
                    if is_valid(r, c, d):
                        board[r][c] = d
                        if bt(): return True
                        board[r][c] = '.'
                return False
        return True
    bt()`}}),e.jsx(m,{children:"Word Search — Backtracking on a Grid"}),e.jsx(g,{children:"Given a 2D grid and a word, find if the word exists as a connected path (4-directional) without reusing cells. Mark visited cells to avoid reuse — unmark on backtrack."}),e.jsx(f,{children:{cpp:`bool exist(vector<vector<char>>& board, string word) {
    int m = board.size(), n = board[0].size();
    function<bool(int,int,int)> bt = [&](int r, int c, int idx) -> bool {
        if (idx == word.size()) return true;        // all chars matched
        if (r<0||r>=m||c<0||c>=n||board[r][c]!=word[idx]) return false;
        char tmp = board[r][c];
        board[r][c] = '#';    // MARK visited
        bool found = bt(r+1,c,idx+1) || bt(r-1,c,idx+1) ||
                     bt(r,c+1,idx+1) || bt(r,c-1,idx+1);
        board[r][c] = tmp;    // UNMARK (backtrack)
        return found;
    };
    for (int r = 0; r < m; r++)
        for (int c = 0; c < n; c++)
            if (bt(r, c, 0)) return true;
    return false;
}`,python:`def exist(board, word):
    m, n = len(board), len(board[0])
    def bt(r, c, idx):
        if idx == len(word): return True
        if r<0 or r>=m or c<0 or c>=n or board[r][c]!=word[idx]: return False
        tmp, board[r][c] = board[r][c], '#'
        found = bt(r+1,c,idx+1) or bt(r-1,c,idx+1) or bt(r,c+1,idx+1) or bt(r,c-1,idx+1)
        board[r][c] = tmp
        return found
    return any(bt(r,c,0) for r in range(m) for c in range(n))`}}),e.jsx(m,{children:"Pruning Strategies — Taxonomy"}),e.jsx(B,{heads:["Strategy","Idea","Example"],rows:[["Constraint pruning","Skip choices that violate any constraint immediately","N-Queens: check col/diagonal before placing"],["Bound pruning","If current sum already exceeds target, stop","Combination Sum: break when candidates[i] > remaining"],["Symmetry pruning","Skip duplicate choices at the same depth level","Permutations with duplicates: skip if nums[i]==nums[i-1] and !used[i-1]"],["Forward checking","Proactively check if future constraints can be satisfied","Sudoku: if a row has no valid digit, prune now"],["Arc consistency","Propagate constraints to reduce domains before branching","Advanced Sudoku: constraint propagation"],["Early termination","Return immediately when the first valid solution is found","Sudoku: return true immediately after first board fill"]]}),e.jsx(m,{children:"Handling Duplicates — Sorted + Skip Pattern"}),e.jsx(f,{children:{cpp:`// Subsets II: array may have duplicates → skip duplicate choices at same depth
void subsetsWithDup(vector<int>& nums, int start, vector<int>& cur,
                    vector<vector<int>>& result) {
    result.push_back(cur);     // add at each node (not just leaves)
    for (int i = start; i < nums.size(); i++) {
        // Skip duplicate: if nums[i] == nums[i-1] and we're in the same depth level
        if (i > start && nums[i] == nums[i - 1]) continue;
        cur.push_back(nums[i]);
        subsetsWithDup(nums, i + 1, cur, result);
        cur.pop_back();
    }
}
// Prerequisite: sort(nums.begin(), nums.end())
// [1,2,2] → [[],[1],[1,2],[1,2,2],[2],[2,2]]  (no duplicates)`,python:`def subsets_with_dup(nums):
    nums.sort(); result = []
    def bt(start, cur):
        result.append(cur[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i-1]: continue  # skip dup
            cur.append(nums[i]); bt(i+1, cur); cur.pop()
    bt(0, []); return result`}}),e.jsx(b,{q:"In Sudoku, why does 'return false' when no digit fits (inside the inner for loop body) make the algorithm correct?",a:"When we find an empty cell and none of the 9 digits are valid, the current partial board cannot lead to a solution — we must backtrack. Returning false signals failure to the caller, which then tries a different digit for the previous empty cell. This 'failure propagation' is essential: without it, the outer loop would continue scanning cells even though the current partial board is already invalid."}),e.jsx(b,{q:"What is the 'i > start' condition doing in the duplicate-skipping backtracking?",a:"We skip <code>nums[i]</code> if it equals <code>nums[i-1]</code> AND <code>i > start</code>. The <code>i > start</code> check ensures we only skip duplicates at the <em>same recursive depth</em>, not across depths. If <code>i == start</code>, this is the first element we're considering at this depth — never skip the first choice. Only skip subsequent elements with the same value (they would generate identical subtrees)."})]})}function Z(){return e.jsxs("div",{children:[e.jsxs(S,{color:"purple",icon:"ti-arrows-join",children:[e.jsx("strong",{children:"Meet in the Middle (MITM):"})," For problems with O(2ⁿ) brute force, split the input into two equal halves, enumerate O(2^(n/2)) solutions for each half independently, then combine results. Reduces O(2ⁿ) to O(2^(n/2) × n/2) — a dramatic improvement for n ≥ 30."]}),e.jsx(m,{children:"The Core Idea — Why It Works"}),e.jsxs(F,{cols:2,children:[e.jsx(N,{title:"Brute Force Complexity",color:"danger",children:"n=40: 2⁴⁰ ≈ 10¹² — completely infeasible even at 10⁹ ops/sec. No amount of constant-factor optimization helps."}),e.jsx(N,{title:"MITM Complexity",color:"success",children:"n=40: 2²⁰ ≈ 10⁶ per half. Sort + binary search: O(2^(n/2) × n/2) ≈ 20×10⁶ — trivially fast. A 10⁶× speedup."})]}),e.jsx(m,{children:"Interactive — Subset Sum MITM for [1,2,3,4,5,6], target=10"}),e.jsx(g,{children:"Step through all 4 phases: split → enumerate each half's subset sums → sort right half → binary search for complements."}),e.jsx(V,{}),e.jsx(m,{children:"Subset Sum MITM — Full Implementation"}),e.jsx(f,{children:{cpp:`// Count subsets of arr summing to target (n up to 40)
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long target;
    cin >> n >> target;
    vector<long long> arr(n);
    for (auto& x : arr) cin >> x;

    int h1 = n / 2, h2 = n - h1;

    // Step 1: enumerate all 2^h1 subset sums of first half
    vector<long long> left;
    for (int mask = 0; mask < (1 << h1); mask++) {
        long long s = 0;
        for (int i = 0; i < h1; i++) if (mask & (1 << i)) s += arr[i];
        left.push_back(s);
    }

    // Step 2: enumerate all 2^h2 subset sums of second half
    vector<long long> right;
    for (int mask = 0; mask < (1 << h2); mask++) {
        long long s = 0;
        for (int i = 0; i < h2; i++) if (mask & (1 << i)) s += arr[h1 + i];
        right.push_back(s);
    }

    // Step 3: sort right half
    sort(right.begin(), right.end());

    // Step 4: for each left sum, binary search for complement
    long long count = 0;
    for (long long l : left) {
        long long need = target - l;
        count += upper_bound(right.begin(), right.end(), need)
               - lower_bound(right.begin(), right.end(), need);
    }
    cout << count << "
";
}
// Time: O(2^(n/2) × n/2)  Space: O(2^(n/2))`,python:`from bisect import bisect_left, bisect_right

def count_subsets_mitm(arr, target):
    n = len(arr)
    h = n // 2
    left_arr, right_arr = arr[:h], arr[h:]

    def all_sums(a):
        sums = []
        for mask in range(1 << len(a)):
            sums.append(sum(a[i] for i in range(len(a)) if mask & (1<<i)))
        return sums

    left  = all_sums(left_arr)
    right = sorted(all_sums(right_arr))

    count = 0
    for l in left:
        need = target - l
        count += bisect_right(right, need) - bisect_left(right, need)
    return count`}}),e.jsx(m,{children:"Classical Application — 4-Sum / 4-Number Sum"}),e.jsxs(g,{children:["Find all quadruples ",e.jsx(R,{children:"(a, b, c, d)"})," where ",e.jsx(P,{children:String.raw`a + b + c + d = \text{target}`}),". Brute force: O(n⁴). MITM: enumerate all O(n²) pair sums from the first two indices, sort them, then for each pair from the last two, binary search for the complement."]}),e.jsx(f,{children:{cpp:`// 4-Sum with Meet in the Middle: O(n² log n)
vector<array<int,4>> fourSum(vector<int>& nums, int target) {
    int n = nums.size();
    sort(nums.begin(), nums.end());

    // Build all pair sums (first two elements)
    map<int, vector<pair<int,int>>> pairSums;
    for (int i = 0; i < n - 1; i++)
        for (int j = i + 1; j < n; j++)
            pairSums[nums[i] + nums[j]].push_back({i, j});

    set<array<int,4>> seen;
    // For each pair from the last two elements, search for complement
    for (int k = 0; k < n - 1; k++) {
        for (int l = k + 1; l < n; l++) {
            int need = target - nums[k] - nums[l];
            if (!pairSums.count(need)) continue;
            for (auto [i, j] : pairSums[need]) {
                if (i == k || i == l || j == k || j == l) continue;
                array<int,4> quad = {nums[i], nums[j], nums[k], nums[l]};
                sort(quad.begin(), quad.end());
                seen.insert(quad);
            }
        }
    }
    return vector<array<int,4>>(seen.begin(), seen.end());
}`,python:`from collections import defaultdict
from itertools import combinations

def four_sum(nums, target):
    nums.sort()
    n = len(nums)
    pair_sums = defaultdict(list)
    for i in range(n-1):
        for j in range(i+1, n):
            pair_sums[nums[i]+nums[j]].append((i,j))

    results = set()
    for k in range(n-1):
        for l in range(k+1, n):
            need = target - nums[k] - nums[l]
            for i, j in pair_sums.get(need, []):
                if len({i, j, k, l}) == 4:   # all distinct indices
                    quad = tuple(sorted([nums[i],nums[j],nums[k],nums[l]]))
                    results.add(quad)
    return [list(q) for q in results]`}}),e.jsx(B,{heads:["Approach","Time","Space","Notes"],rows:[["4-pointer (n^4)","O(n⁴)","O(1)","Trivial brute force"],["Sort + two-pointer fix","O(n³)","O(1)","Fix first two with nested loops, two-pointer for last two"],["MITM (hash/map)","O(n²)","O(n²)","Hash map of pair sums: O(1) lookup per second pair"],["Subset Sum MITM (n=40)","O(2^(n/2)×n)","O(2^(n/2))","Only feasible approach for large n"]]}),e.jsx(b,{q:"Why is the Meet in the Middle speedup specifically O(√(2ⁿ)) = O(2^(n/2)) and not better?",a:"The combination step requires matching a left sum against all right sums. With binary search, this is O(log 2^(n/2)) = O(n/2) per left element, and there are 2^(n/2) left elements. Total combination: O(2^(n/2) × n/2). The enumeration of each half is O(2^(n/2) × n/2) too. So total: O(2^(n/2) × n). You can't do better than enumerate both halves — the information from both is required."}),e.jsx(b,{q:"Can Meet in the Middle be applied beyond subset sum? What other problems use it?",a:"Yes — MITM is a general technique. Applications: (1) Baby-step giant-step for discrete logarithm (cryptography). (2) 4-SUM and higher k-SUM problems. (3) Bidirectional BFS/DFS on graphs — explore from both ends and meet in the middle. (4) Breaking 2DES: each half-encryption is independently searchable. (5) Counting/finding subsets satisfying complex conditions in n=40-50 element arrays. The key requirement: the problem can be split so that solutions combine easily (e.g., sum to target)."})]})}function ee(){return e.jsxs("div",{children:[e.jsx(S,{color:"purple",icon:"ti-tournament",children:"6 problems: fundamentals → hard backtracking → meet in the middle. All are frequent in FAANG onsite rounds."}),e.jsx(j,{num:1,title:"Subsets",difficulty:"LC Medium",tags:["LC 78","Include/Exclude"],statement:"Given an integer array <code>nums</code> of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return in any order.",constraints:["1 ≤ n ≤ 10","All elements unique","O(n × 2ⁿ) time"],examples:[{input:"[1,2,3]",output:"[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"},{input:"[0]",output:"[[],[0]]"}],approach:"Include/exclude backtracking: at each index, recurse with the element included and without. Base case: idx == n → emit current subset. Alternatively, use iterative bit-mask: for mask in 0..2ⁿ-1, the set bits tell which elements to include.",code:{cpp:`void bt(vector<int>& nums, int idx, vector<int>& cur, vector<vector<int>>& res) {
    if (idx == nums.size()) { res.push_back(cur); return; }
    cur.push_back(nums[idx]); bt(nums, idx+1, cur, res); cur.pop_back();
    bt(nums, idx+1, cur, res);
}
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res; vector<int> cur;
    bt(nums, 0, cur, res); return res;
}`,python:`def subsets(nums):
    res = []
    def bt(idx, cur):
        if idx == len(nums): res.append(cur[:]); return
        cur.append(nums[idx]); bt(idx+1, cur); cur.pop()
        bt(idx+1, cur)
    bt(0, []); return res`}}),e.jsx(j,{num:2,title:"Permutations",difficulty:"LC Medium",tags:["LC 46","Backtracking"],statement:"Given an array <code>nums</code> of distinct integers, return all possible permutations in any order.",constraints:["1 ≤ n ≤ 6","All elements distinct","n! permutations total"],examples:[{input:"[1,2,3]",output:"[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"},{input:"[0,1]",output:"[[0,1],[1,0]]"}],approach:"At each level, pick any unused element to place next. Track used elements with a boolean array. When current permutation length == n → emit. The swap-based approach (swap nums[start] with nums[i], recurse, swap back) is O(n!) with O(1) extra space.",code:{cpp:`void bt(vector<int>& nums, int start, vector<vector<int>>& res) {
    if (start == nums.size()) { res.push_back(nums); return; }
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);
        bt(nums, start+1, res);
        swap(nums[start], nums[i]);
    }
}
vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res; bt(nums, 0, res); return res;
}`,python:`def permute(nums):
    res = []
    def bt(start):
        if start == len(nums): res.append(nums[:]); return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            bt(start+1)
            nums[start], nums[i] = nums[i], nums[start]
    bt(0); return res`}}),e.jsx(j,{num:3,title:"Combination Sum",difficulty:"LC Medium",tags:["LC 39","Pruning"],statement:"Given an array of distinct integers <code>candidates</code> and a target integer, return all unique combinations where the chosen numbers sum to target. The same number may be chosen an unlimited number of times.",constraints:["1 ≤ candidates.length ≤ 30","2 ≤ candidates[i] ≤ 40","All distinct","1 ≤ target ≤ 500"],examples:[{input:"candidates=[2,3,6,7], target=7",output:"[[2,2,3],[7]]"},{input:"candidates=[2,3,5], target=8",output:"[[2,2,2,2],[2,3,3],[3,5]]"}],approach:"Sort candidates. At each step, try candidates[start..n-1] (start prevents reverse duplicates). Pass i (not i+1) in the recursive call to allow reuse. Break when candidates[i] > remaining — pruning based on sorted order. This is the key optimization over checking remaining < 0 after adding.",code:{cpp:`void bt(vector<int>& c, int start, int rem, vector<int>& cur, vector<vector<int>>& res) {
    if (rem == 0) { res.push_back(cur); return; }
    for (int i = start; i < c.size(); i++) {
        if (c[i] > rem) break;
        cur.push_back(c[i]); bt(c, i, rem-c[i], cur, res); cur.pop_back();
    }
}
vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> res; vector<int> cur;
    bt(candidates, 0, target, cur, res); return res;
}`,python:`def combination_sum(candidates, target):
    candidates.sort(); res = []
    def bt(start, cur, rem):
        if rem == 0: res.append(cur[:]); return
        for i in range(start, len(candidates)):
            if candidates[i] > rem: break
            cur.append(candidates[i]); bt(i, cur, rem-candidates[i]); cur.pop()
    bt(0, [], target); return res`}}),e.jsx(j,{num:4,title:"N-Queens II",difficulty:"LC Hard",tags:["LC 52","N-Queens"],statement:"Given an integer <code>n</code>, return the number of distinct solutions to the N-Queens problem (not the board configurations themselves, just the count).",constraints:["1 ≤ n ≤ 9"],examples:[{input:"n=4",output:"2"},{input:"n=1",output:"1"}],approach:"Same backtracking as N-Queens but increment a count instead of building boards. Use three bitset variables (cols, diag1=row-col, diag2=row+col) for O(1) conflict check per placement. The bit manipulation version using bitwise-AND is the fastest implementation.",code:{cpp:`int totalNQueens(int n) {
    int count = 0;
    unordered_set<int> cols, d1, d2;
    function<void(int)> bt = [&](int row) {
        if (row == n) { count++; return; }
        for (int col = 0; col < n; col++) {
            if (cols.count(col)||d1.count(row-col)||d2.count(row+col)) continue;
            cols.insert(col); d1.insert(row-col); d2.insert(row+col);
            bt(row+1);
            cols.erase(col); d1.erase(row-col); d2.erase(row+col);
        }
    };
    bt(0); return count;
}`,python:`def total_n_queens(n):
    count = [0]
    cols, d1, d2 = set(), set(), set()
    def bt(row):
        if row == n: count[0] += 1; return
        for col in range(n):
            if col in cols or row-col in d1 or row+col in d2: continue
            cols.add(col); d1.add(row-col); d2.add(row+col)
            bt(row+1)
            cols.discard(col); d1.discard(row-col); d2.discard(row+col)
    bt(0); return count[0]`}}),e.jsx(j,{num:5,title:"Word Search",difficulty:"LC Medium",tags:["LC 79","Grid Backtracking"],statement:"Given an <code>m×n</code> grid of characters and a string <code>word</code>, return <code>true</code> if word exists in the grid as a connected path of adjacent (up/down/left/right) cells. The same cell may not be used more than once.",constraints:["1 ≤ m,n ≤ 6","1 ≤ word.length ≤ 15"],examples:[{input:'board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word="ABCCED"',output:"true"},{input:'word="SEE"',output:"true"},{input:'word="ABCB"',output:"false"}],approach:"DFS backtracking from each starting cell. At each step, check if board[r][c] matches word[idx]. Mark visited by overwriting with '#', recurse in 4 directions, restore on backtrack. Return true immediately on first match (no need to find all paths).",code:{cpp:`bool exist(vector<vector<char>>& b, string w) {
    int m=b.size(),n=b[0].size();
    function<bool(int,int,int)> bt=[&](int r,int c,int i)->bool{
        if(i==w.size()) return true;
        if(r<0||r>=m||c<0||c>=n||b[r][c]!=w[i]) return false;
        char t=b[r][c]; b[r][c]='#';
        bool f=bt(r+1,c,i+1)||bt(r-1,c,i+1)||bt(r,c+1,i+1)||bt(r,c-1,i+1);
        b[r][c]=t; return f;
    };
    for(int r=0;r<m;r++) for(int c=0;c<n;c++) if(bt(r,c,0)) return true;
    return false;
}`,python:`def exist(board, word):
    m,n=len(board),len(board[0])
    def bt(r,c,i):
        if i==len(word): return True
        if r<0 or r>=m or c<0 or c>=n or board[r][c]!=word[i]: return False
        tmp,board[r][c]=board[r][c],'#'
        found=bt(r+1,c,i+1) or bt(r-1,c,i+1) or bt(r,c+1,i+1) or bt(r,c-1,i+1)
        board[r][c]=tmp; return found
    return any(bt(r,c,0) for r in range(m) for c in range(n))`}}),e.jsx(j,{num:6,title:"Subset Sum — Meet in the Middle",difficulty:"LC Hard",tags:["MITM","n ≤ 40"],statement:"Given an array <code>arr</code> of <strong>n ≤ 40</strong> integers and a target sum <code>T</code>, count the number of non-empty subsets of <code>arr</code> that sum to exactly <code>T</code>. Values may be negative. Standard DP is infeasible for n=40.",constraints:["1 ≤ n ≤ 40","−10⁹ ≤ arr[i] ≤ 10⁹","The 2^n brute force is infeasible; use MITM"],examples:[{input:"arr=[1,2,3,4,5,6], target=10",output:"5",note:"{4,6}, {1,4,5}, {1,3,6}, {2,3,5}, {1,2,3,4}"},{input:"arr=[3,-1,2,4,-3,1], target=3",output:"8"}],approach:"Split arr into two halves. Enumerate all 2^(n/2) subset sums for each half. Sort right half. For each left sum L, binary search for (T-L) in sorted right — use upper_bound - lower_bound for count. Total: O(2^(n/2) × n/2). For counting: just accumulate; for listing: store elements alongside sums and reconstruct.",code:{cpp:`#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int countSubsetsTarget(vector<ll>& arr, ll T) {
    int n = arr.size(), h = n / 2;
    auto allSums = [](vector<ll> a) {
        int m = a.size(); vector<ll> sums;
        for (int mask = 0; mask < (1<<m); mask++) {
            ll s = 0;
            for (int i = 0; i < m; i++) if (mask&(1<<i)) s += a[i];
            sums.push_back(s);
        }
        return sums;
    };
    auto left  = allSums(vector<ll>(arr.begin(), arr.begin()+h));
    auto right = allSums(vector<ll>(arr.begin()+h, arr.end()));
    sort(right.begin(), right.end());
    ll count = 0;
    for (ll l : left) {
        ll need = T - l;
        count += upper_bound(right.begin(),right.end(),need)
               - lower_bound(right.begin(),right.end(),need);
    }
    return count - (T == 0 ? 1 : 0);  // subtract empty subset if T==0
}`,python:`from bisect import bisect_left, bisect_right

def count_subsets(arr, T):
    n = len(arr); h = n // 2
    def all_sums(a):
        s = []
        for mask in range(1<<len(a)):
            s.append(sum(a[i] for i in range(len(a)) if mask&(1<<i)))
        return s
    left  = all_sums(arr[:h])
    right = sorted(all_sums(arr[h:]))
    count = sum(bisect_right(right, T-l)-bisect_left(right, T-l) for l in left)
    return count - (1 if T == 0 else 0)  # remove empty+empty subset if T==0`}})]})}const re=[{id:"foundations",label:"Foundations"},{id:"classical",label:"Classical Problems"},{id:"pruning",label:"Pruning & Sudoku"},{id:"mitm",label:"Meet in the Middle"},{id:"problems",label:"Problems"}];function ie(){const[s,l]=T.useState("foundations"),r={foundations:e.jsx(Y,{}),classical:e.jsx(K,{}),pruning:e.jsx(J,{}),mitm:e.jsx(Z,{}),problems:e.jsx(ee,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 11"}),e.jsx("h1",{className:"page-header-title",children:"Backtracking & Meet in the Middle"}),e.jsx("p",{className:"page-header-subtitle",children:"Choose · Explore · Unchoose · Subsets · Permutations · N-Queens · Sudoku · MITM Subset Sum · 4-Sum"})]}),e.jsx(L,{tabs:re,active:s,onChange:l}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[s]}),e.jsx($,{moduleId:11})]})}export{ie as default};
