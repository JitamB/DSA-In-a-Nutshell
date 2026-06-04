import{r as A,j as e}from"./index-D9jkHkZY.js";import{S as $,N as C,d as S,H as d,T as N,P as x,a as u,M as P,Q as O,G as M,C as T,V as R}from"./SectionNav-BHzhBu3R.js";const _=[15,10,6,12,9,18];function F(s){const a=s.length,t=[],n=new Array(a).fill(-1),i=[];t.push({i:-1,stack:[],nge:[...n],popped:-1,action:"init",desc:"Process left to right. Maintain a stack of indices with DECREASING values. When arr[i] > stack top → pop: stack top's NGE = arr[i]."});for(let r=0;r<a;r++){for(;i.length>0&&s[i[i.length-1]]<s[r];){const o=i.pop();n[o]=s[r],t.push({i:r,stack:[...i],nge:[...n],popped:o,action:"pop",desc:`i=${r}(${s[r]}): arr[${r}]=${s[r]} > arr[${o}]=${s[o]} → NGE[${o}]=${s[r]}. Pop ${o} from stack.`})}i.push(r),t.push({i:r,stack:[...i],nge:[...n],popped:-1,action:"push",desc:`Push idx ${r} (val=${s[r]}). Stack top(${s[i[i.length-2]]??"∅"}) ≥ ${s[r]} (or stack was empty). Pause.`})}for(;i.length>0;){const r=i.pop();t.push({i:a,stack:[...i],nge:[...n],popped:r,action:"remainder",desc:`Array exhausted. idx ${r} (val=${s[r]}) has NO greater element to its right → NGE[${r}] = −1.`})}return t.push({i:a,stack:[],nge:[...n],popped:-1,action:"done",desc:`Done! NGE = [${n.map(r=>r===-1?"−1":r).join(", ")}]`}),t}const b=F(_),E=[6,2,5,4,1,5,6];function I(s){const a=s.length,t=[],n=[];let i=0;t.push({i:-1,stack:[],maxArea:0,rect:null,action:"init",desc:"Monotonic (increasing) stack of bar indices. Pop when current bar is shorter: compute area of the popped bar spanning from stack-new-top+1 to current i−1."});for(let r=0;r<=a;r++){const o=r<a?s[r]:0;for(;n.length>0&&(r===a||s[n[n.length-1]]>=o);){const c=n.pop(),l=s[c],h=n.length===0?r:r-n[n.length-1]-1,g=n.length===0?0:n[n.length-1]+1,f=l*h;i=Math.max(i,f),t.push({i:r,stack:[...n],maxArea:i,popped:c,rect:{left:g,right:r-1,height:l,area:f},action:"pop",desc:`Pop idx ${c} (h=${l}). Width = ${r} − (${n.length>0?n[n.length-1]:"−1"}) − 1 = ${h}. Area = ${l}×${h} = ${f}.${f>=i?"  ★ NEW MAX!":""}`})}r<a&&(n.push(r),t.push({i:r,stack:[...n],maxArea:i,rect:null,popped:-1,action:"push",desc:`i=${r}: h=${o}. Push — height is ≥ stack top (or stack empty). Stack = [${n.map(c=>s[c]).join(",")}]`}))}return t.push({i:a,stack:[],maxArea:i,rect:null,popped:-1,action:"done",desc:`Done! Maximum rectangular area = ${i}.`}),t}const k=I(E),z=["(","a","+","b",")","*","c","-","d"],w={"+":1,"-":1,"*":2,"/":2,"^":3};function W(s){return s in w}function G(s){const a=[],t=[],n=[];a.push({token:null,stack:[],output:[],action:"init",desc:'Convert "(a+b)*c−d" → Postfix. Operands go straight to output. Operators: pop higher/equal precedence ops first, then push. "(" pushed immediately. ")" triggers pop until "(".'});for(const i of s)if(i==="(")t.push(i),a.push({token:i,stack:[...t],output:[...n],action:"pushLParen",desc:"Token '(': push to stack immediately."});else if(i===")"){for(;t[t.length-1]!=="(";)n.push(t.pop()),a.push({token:i,stack:[...t],output:[...n],action:"popTillParen",desc:`Token ')': pop '${n[n.length-1]}' → output until we hit '('.`});t.pop(),a.push({token:i,stack:[...t],output:[...n],action:"discardParen",desc:"Discard '(' from stack (it cancels with ')')."})}else if(W(i)){for(;t.length>0&&t[t.length-1]!=="("&&w[t[t.length-1]]>=w[i];)n.push(t.pop()),a.push({token:i,stack:[...t],output:[...n],action:"popOp",desc:`Op '${i}' (prec=${w[i]}): top '${n[n.length-1]}' (prec=${w[n[n.length-1]]}) ≥ ${w[i]} → pop to output.`});t.push(i),a.push({token:i,stack:[...t],output:[...n],action:"pushOp",desc:`Push operator '${i}' onto stack.`})}else n.push(i),a.push({token:i,stack:[...t],output:[...n],action:"operand",desc:`Operand '${i}' → output directly.`});for(;t.length>0;)n.push(t.pop()),a.push({token:null,stack:[...t],output:[...n],action:"drain",desc:`End of tokens. Pop remaining op '${n[n.length-1]}' → output.`});return a.push({token:null,stack:[],output:[...n],action:"done",desc:`Done! Postfix = "${n.join(" ")}"`}),a}const v=G(z);function L(){const[s,a]=A.useState(0),t=b[Math.min(s,b.length-1)],n=o=>t.action==="done"?t.nge[o]!==-1?"success":"danger":o===t.i?t.action==="push"?"info":"warning":o===t.popped?"warning":t.stack.includes(o)?"info":t.nge[o]!==-1?"success":null,r={pop:"warning",push:"info",remainder:"danger",done:"success",init:null}[t.action]||"info";return e.jsxs(R,{children:[e.jsxs("div",{style:{marginBottom:14,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${r})`,color:`var(--color-text-${r})`,border:`1px solid var(--color-border-${r})`,whiteSpace:"nowrap"},children:t.action==="pop"?"Pop ←":t.action==="push"?"Push →":t.action==="done"?"Done ✓":"Remainder"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:t.desc})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"ARRAY"}),e.jsx("div",{style:{display:"flex",gap:4},children:_.map((o,c)=>{const l=n(c);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:7,border:`1.5px solid ${l?`var(--color-border-${l})`:"var(--color-border-secondary)"}`,background:l?`var(--color-background-${l})`:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:l?700:400,color:l?`var(--color-text-${l})`:"var(--color-text-secondary)",transition:"all 0.18s"},children:o}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",c,"]"]}),e.jsx("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:t.nge[c]!==-1?"var(--color-text-success)":"var(--color-text-tertiary)",fontWeight:t.nge[c]!==-1?700:400},children:t.nge[c]!==-1?t.nge[c]:t.action==="done"?"−1":"?"})]},c)})}),e.jsx("div",{style:{fontSize:9.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginTop:2},children:"↑ NGE values (filling in as we go)"})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:"STACK (decreasing values, bottom → top)"}),e.jsxs("div",{style:{display:"flex",gap:4,alignItems:"center",minHeight:42},children:[t.stack.length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-tertiary)",border:"1px dashed var(--color-border-tertiary)",padding:"6px 14px",borderRadius:6},children:"empty"}):t.stack.map((o,c)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx("div",{style:{padding:"6px 12px",borderRadius:6,border:"1px solid var(--color-border-info)",background:"var(--color-background-info)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--color-text-info)"},children:_[o]}),e.jsxs("span",{style:{fontSize:8.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",o,"]"]}),c<t.stack.length-1&&e.jsx("span",{style:{position:"absolute",marginLeft:48,fontSize:14,color:"var(--color-text-tertiary)"},children:"→"})]},o)),t.stack.length>0&&e.jsx("span",{style:{fontSize:12,fontFamily:"var(--font-mono)",color:"var(--color-text-info)",marginLeft:2},children:"← top"})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,s-1)),s===0],["Next →",()=>a(Math.min(b.length-1,s+1)),s===b.length-1]].map(([o,c,l])=>e.jsx("button",{onClick:c,disabled:l,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:l?"not-allowed":"pointer",fontSize:12,opacity:l?.4:1},children:o},o)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[s+1,"/",b.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>a(b.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function B(){const[s,a]=A.useState(0),t=k[Math.min(s,k.length-1)],n=Math.max(...E),i=46;return e.jsxs(R,{children:[e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.6},children:t.desc}),e.jsx("div",{style:{marginBottom:14},children:e.jsxs("div",{style:{display:"flex",gap:3,alignItems:"flex-end",height:110,position:"relative"},children:[E.map((r,o)=>{const c=r/n*90,l=t.stack.includes(o),h=o===t.popped,g=o===t.i&&t.action!=="done",f=t.rect&&o>=t.rect.left&&o<=t.rect.right;let p="#1E2233",m="var(--color-border-secondary)",y="var(--color-text-secondary)";return t.action==="done"?(p="#1A3A2A",m="var(--color-border-success)",y="var(--color-text-success)"):f?(p="rgba(206,145,120,0.35)",m="var(--color-border-warning)",y="var(--color-text-warning)"):h?(p="var(--color-background-warning)",m="var(--color-border-warning)",y="var(--color-text-warning)"):g?(p="var(--color-background-info)",m="var(--color-border-info)",y="var(--color-text-info)"):l&&(p="rgba(129,180,234,0.2)",m="var(--color-border-info)",y="var(--color-text-info)"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsxs("div",{style:{width:i,height:c+8,borderRadius:"4px 4px 0 0",background:p,border:`1.5px solid ${m}`,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:3,transition:"all 0.18s",position:"relative"},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,fontWeight:700,color:y},children:r}),l&&!f&&e.jsx("div",{style:{position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",width:6,height:6,borderRadius:"50%",background:"var(--color-border-info)"}})]}),e.jsxs("span",{style:{fontSize:9.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",o,"]"]})]},o)}),t.rect&&e.jsx("div",{style:{position:"absolute",bottom:22,left:t.rect.left*(i+3),width:(t.rect.right-t.rect.left+1)*(i+3)-3,height:t.rect.height/n*90+8,border:"2px solid var(--color-border-warning)",borderRadius:4,background:"rgba(206,145,120,0.12)",pointerEvents:"none",boxShadow:"0 0 12px rgba(206,145,120,0.3)",transition:"all 0.2s"},children:e.jsxs("div",{style:{position:"absolute",top:-18,left:"50%",transform:"translateX(-50%)",background:"var(--color-background-warning)",border:"1px solid var(--color-border-warning)",borderRadius:12,padding:"1px 8px",fontFamily:"var(--font-mono)",fontSize:11,fontWeight:700,color:"var(--color-text-warning)",whiteSpace:"nowrap"},children:["area = ",t.rect.area]})})]})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:10,marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:4},children:"STACK (indices, increasing heights)"}),e.jsx("div",{style:{display:"flex",gap:4,minHeight:36,flexWrap:"wrap"},children:t.stack.length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-tertiary)",border:"1px dashed var(--color-border-tertiary)",padding:"5px 12px",borderRadius:6},children:"empty"}):t.stack.map(r=>e.jsxs("div",{style:{padding:"5px 10px",borderRadius:6,border:"1px solid var(--color-border-info)",background:"var(--color-background-info)",fontFamily:"var(--font-mono)",fontSize:12,fontWeight:600,color:"var(--color-text-info)"},children:[r,e.jsxs("span",{style:{opacity:.6,marginLeft:3,fontSize:10},children:["h=",E[r]]})]},r))})]}),e.jsxs("div",{style:{padding:"10px 16px",background:t.maxArea>0?"var(--color-background-success)":"var(--color-background-secondary)",border:`1px solid ${t.maxArea>0?"var(--color-border-success)":"var(--color-border-secondary)"}`,borderRadius:"var(--border-radius-md)",textAlign:"center",minWidth:90,transition:"all 0.2s"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:t.maxArea>0?"var(--color-text-success)":"var(--color-text-tertiary)"},children:"maxArea"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:22,fontWeight:700,color:t.maxArea>0?"var(--color-text-success)":"var(--color-text-tertiary)"},children:t.maxArea})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,s-1)),s===0],["Next →",()=>a(Math.min(k.length-1,s+1)),s===k.length-1]].map(([r,o,c])=>e.jsx("button",{onClick:o,disabled:c,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:c?"not-allowed":"pointer",fontSize:12,opacity:c?.4:1},children:r},r)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[s+1,"/",k.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>a(k.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function H(){const[s,a]=A.useState(0),t=v[Math.min(s,v.length-1)],i={operand:"success",pushOp:"info",pushLParen:"warning",popOp:"warning",popTillParen:"warning",discardParen:"danger",drain:"info",done:"success",init:null}[t.action]||"info";return e.jsxs(R,{children:[e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[t.action!=="init"&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${i})`,color:`var(--color-text-${i})`,border:`1px solid var(--color-border-${i})`,whiteSpace:"nowrap"},children:t.action==="operand"?"Operand →":t.action.includes("push")?"Push →":t.action.includes("pop")?"Pop →":t.action==="drain"?"Drain →":"Done ✓"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc})]}),e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"EXPRESSION TOKENS"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap"},children:z.map((r,o)=>{const c=s>0&&v[s-1]&&z.slice(0,o+1).every(h=>v.slice(1,s+1).some(g=>g.token===h)),l=r===t.token&&!c;return e.jsx("div",{style:{padding:"5px 10px",borderRadius:6,border:`1px solid ${l?"var(--color-border-warning)":"var(--color-border-secondary)"}`,background:l?"var(--color-background-warning)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:15,fontWeight:l?700:400,color:l?"var(--color-text-warning)":"var(--color-text-secondary)",transition:"all 0.15s"},children:r},o)})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"OPERATOR STACK"}),e.jsx("div",{style:{display:"flex",flexDirection:"column-reverse",gap:3,minHeight:80,padding:"8px",background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8},children:t.stack.length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",textAlign:"center",alignSelf:"center"},children:"empty"}):t.stack.map((r,o)=>e.jsxs("div",{style:{padding:"4px 10px",borderRadius:5,border:`1px solid ${o===t.stack.length-1?"var(--color-border-info)":"var(--color-border-secondary)"}`,background:o===t.stack.length-1?"var(--color-background-info)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:o===t.stack.length-1?"var(--color-text-info)":"var(--color-text-secondary)",textAlign:"center"},children:[r," ",o===t.stack.length-1&&e.jsx("span",{style:{fontSize:9,opacity:.6},children:"← top"})]},o))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"POSTFIX OUTPUT"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:80,padding:8,background:"#0D0F18",border:"1px solid #1E2233",borderRadius:8,alignContent:"flex-start"},children:t.output.length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",alignSelf:"center"},children:"…"}):t.output.map((r,o)=>e.jsx("div",{style:{padding:"4px 10px",borderRadius:5,border:`1px solid ${o===t.output.length-1?"var(--color-border-success)":"var(--color-border-secondary)"}`,background:o===t.output.length-1?"var(--color-background-success)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:o===t.output.length-1?"var(--color-text-success)":"var(--color-text-secondary)"},children:r},o))})]})]}),t.action==="done"&&e.jsxs("div",{style:{padding:"8px 14px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:700,color:"var(--color-text-success)",textAlign:"center",marginBottom:14},children:["(a+b)*c−d  →  ",t.output.join(" ")]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,s-1)),s===0],["Next →",()=>a(Math.min(v.length-1,s+1)),s===v.length-1]].map(([r,o,c])=>e.jsx("button",{onClick:o,disabled:c,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:c?"not-allowed":"pointer",fontSize:12,opacity:c?.4:1},children:r},r)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[s+1,"/",v.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const D={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function j({num:s,title:a,difficulty:t,tags:n=[],statement:i,constraints:r=[],examples:o=[],approach:c,code:l}){const[h,g]=A.useState(!1),f=D[t]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",s]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:a})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[n.map(p=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:p},p)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${f})`,color:`var(--color-text-${f})`,border:`1px solid var(--color-border-${f})`},children:t})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:i}}),r.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:r.map((p,m)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:p},m))})]}),o.length>0&&e.jsx("div",{style:{marginBottom:14},children:o.map((p,m)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",m+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:p.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:p.output})]}),p.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:p.note})]},m))}),e.jsxs("button",{onClick:()=>g(!h),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:h?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${h?"eye-off":"bulb"}`}),h?"Hide Solution":"Show Approach & Solution"]}),h&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),c]}),e.jsx(u,{children:l})]})]})]})}function V(){return e.jsxs("div",{children:[e.jsxs(S,{color:"info",icon:"ti-stack",children:["A stack is a ",e.jsx("strong",{children:"LIFO"})," (Last In, First Out) abstract data type. The only accessible element is always the most recently pushed one. Think of a stack of plates — you can only add or remove from the top."]}),e.jsx(d,{children:"Core Operations"}),e.jsx(N,{heads:["Operation","Time","Description"],rows:[["push(x)","O(1)","Insert x at the top"],["pop()","O(1)","Remove and return the top element — error if empty"],["top()","O(1)","Peek at the top element without removing — error if empty"],["isEmpty()","O(1)","Return true if no elements"],["size()","O(1)","Return element count"]]}),e.jsxs(S,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"Underflow:"})," calling pop() or top() on an empty stack. ",e.jsx("strong",{children:"Overflow:"})," calling push() when a fixed-size stack is full. Always check isEmpty() before pop/top in production code."]}),e.jsx(d,{children:"Three Implementations"}),e.jsx(u,{children:{cpp:`// ── 1. Static Array Stack ─────────────────────────────
struct Stack {
    int arr[1000], top = -1;
    void push(int x)  { arr[++top] = x; }
    int  pop()        { return arr[top--]; }
    int  peek()       { return arr[top]; }
    bool isEmpty()    { return top == -1; }
    int  size()       { return top + 1; }
};

// ── 2. Dynamic Array (amortized O(1)) ─────────────────
struct DynStack {
    int *arr, top=-1, cap=1;
    DynStack() { arr = new int[cap]; }
    void push(int x) {
        if (top == cap - 1) {          // resize: O(n) occasionally
            int *tmp = new int[cap*2];
            for (int i=0; i<cap; i++) tmp[i]=arr[i];
            delete[] arr; arr=tmp; cap*=2;
        }
        arr[++top] = x;               // O(1) amortized
    }
    // pop/peek same as above
};

// ── 3. Linked List Stack — O(1) everything ─────────────
struct Node { int val; Node* next; };
struct LLStack {
    Node* head = nullptr;
    void push(int x) {                // insert at HEAD — O(1)
        Node* n = new Node{x, head}; head = n;
    }
    int pop() {
        int v = head->val; Node* t = head;
        head = head->next; delete t; return v;
    }
    int  peek()    { return head->val; }
    bool isEmpty() { return head==nullptr; }
};`,python:`# Python list as stack — O(1) amortized for all ops
class Stack:
    def __init__(self):     self._data = []
    def push(self, x):      self._data.append(x)
    def pop(self):          return self._data.pop()
    def peek(self):         return self._data[-1]
    def is_empty(self):     return len(self._data) == 0
    def size(self):         return len(self._data)`}}),e.jsx(d,{children:"Why Insert at HEAD for Linked List Stack?"}),e.jsx(x,{children:"In a singly linked list, inserting and deleting at the HEAD is O(1). Inserting at the TAIL is O(1) too, but deleting from the tail is O(n) because you must traverse to find the second-to-last node. Since pop() needs O(1) deletion, always use the head as the top of the stack."}),e.jsx(d,{children:"Two Stacks in One Array — O(1) Push/Pop, No Wasted Space"}),e.jsx(x,{children:"Stack 1 grows left-to-right from index 0. Stack 2 grows right-to-left from index n-1. Overflow occurs only when they collide (top1 + 1 == top2), using every cell of the array."}),e.jsx(u,{children:{cpp:`struct TwoStacks {
    int arr[100], top1=-1, top2=100;
    void push1(int x) {
        if (top1 < top2-1) arr[++top1] = x;
    }
    void push2(int x) {
        if (top1 < top2-1) arr[--top2] = x;
    }
    int pop1() { return (top1>=0)? arr[top1--] : -1; }
    int pop2() { return (top2<100)? arr[top2++] : -1; }
};
// Overflow only when top1 + 1 == top2 — every slot used optimally`,python:`class TwoStacks:
    def __init__(self, n):
        self.arr=[0]*n; self.n=n; self.top1=-1; self.top2=n
    def push1(self,x):
        if self.top1<self.top2-1: self.top1+=1; self.arr[self.top1]=x
    def push2(self,x):
        if self.top1<self.top2-1: self.top2-=1; self.arr[self.top2]=x
    def pop1(self): r=self.arr[self.top1]; self.top1-=1; return r
    def pop2(self): r=self.arr[self.top2]; self.top2+=1; return r`}}),e.jsx(d,{children:"K Stacks in One Array — O(1) All Operations"}),e.jsxs(x,{children:["The elegant trick: maintain a ",e.jsx("code",{children:"next[]"})," array encoding the free-list and per-stack chains, plus a ",e.jsx("code",{children:"top[]"})," array for each stack's current top. All operations are O(1)."]}),e.jsx(u,{lang:"cpp",children:`struct KStacks {
    vector<int> arr, next, top;
    int k, n, freeTop;
    KStacks(int k, int n) : k(k), n(n), arr(n), next(n), top(k, -1), freeTop(0) {
        for (int i=0; i<n-1; i++) next[i] = i+1;
        next[n-1] = -1;              // free list: 0→1→2→...→n-1→-1
    }
    void push(int x, int si) {       // push x onto stack si
        int i = freeTop;             // grab free index
        freeTop = next[i];           // advance free list
        arr[i] = x;
        next[i] = top[si];          // link into stack si's chain
        top[si] = i;                 // update stack si's top
    }
    int pop(int si) {               // pop from stack si
        int i = top[si];
        top[si] = next[i];          // unlink from stack si
        next[i] = freeTop;          // return to free list
        freeTop = i;
        return arr[i];
    }
};
// Time: O(1) per push/pop  Space: O(n) total`}),e.jsx(O,{q:"Why is the dynamic array stack O(1) amortized and not O(n)?",a:"Doubling the array capacity on overflow costs O(n) that one time, but each element has already contributed O(1) push operations between resizes. Formally: n pushes cost O(n) total (the copies on resize sum to n+n/2+n/4+... = 2n), so O(2n)/n = O(1) amortized per push. The occasional expensive operation is spread across many cheap ones."}),e.jsx(O,{q:"What happens if you use a linked list stack with the tail as the top?",a:"pop() becomes O(n): to delete the tail, you need to find the second-to-last node, which requires traversing the entire list (no back-pointer in a singly linked list). Always use the HEAD as top. Alternatively, use a doubly linked list where prev pointers enable O(1) tail removal — but that doubles memory per node."})]})}function q(){return e.jsxs("div",{children:[e.jsxs(S,{color:"success",icon:"ti-trending-up",children:["A ",e.jsx("strong",{children:"monotonic stack"})," is a stack that maintains elements in either strictly increasing or strictly decreasing order. When an element violates the monotonic property, we pop until the property is restored. This solves NGE, PGE, stock span, and histogram problems in O(n)."]}),e.jsx(d,{children:"Next Greater Element — Interactive"}),e.jsx(x,{children:"For each element, find the first greater element to its right. Naive O(n²): nested loops. Monotonic stack O(n): maintain a decreasing stack of indices. When arr[i] breaks the decreasing property, arr[i] IS the NGE for all popped elements."}),e.jsx(L,{}),e.jsx(u,{children:{cpp:`// Next Greater Element — O(n)
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> nge(n, -1);
    stack<int> st;  // stores indices, values are DECREASING
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            nge[st.top()] = arr[i];  // arr[i] is the NGE for the popped index
            st.pop();
        }
        st.push(i);
    }
    // remaining in stack have no NGE → already -1
    return nge;
}
// [15,10,6,12,9,18] → [18,12,12,18,18,-1]`,python:`def next_greater(arr):
    n = len(arr); nge = [-1]*n; st = []  # stores indices
    for i in range(n):
        while st and arr[st[-1]] < arr[i]:
            nge[st.pop()] = arr[i]
        st.append(i)
    return nge`}}),e.jsx(d,{children:"Previous Greater Element"}),e.jsx(x,{children:'Find the nearest greater element to the LEFT. Same logic but process right to left — or equivalently, the stack serves as the "seen-so-far" decreasing sequence from the left.'}),e.jsx(u,{children:{cpp:`vector<int> prevGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> pge(n, -1);
    stack<int> st;  // decreasing, same principle
    for (int i = 0; i < n; i++) {
        while (!st.empty() && st.top() <= arr[i])
            st.pop();                        // smaller elements can never be PGE
        pge[i] = st.empty() ? -1 : st.top(); // top is now first greater to left
        st.push(arr[i]);
    }
    return pge;
}
// [15,10,18,12,4,6,2,8] → [-1,15,-1,18,12,12,6,12]`,python:`def prev_greater(arr):
    pge=[]; st=[]  # stores values (not indices needed here)
    for v in arr:
        while st and st[-1]<=v: st.pop()
        pge.append(-1 if not st else st[-1])
        st.append(v)
    return pge`}}),e.jsx(d,{children:"Stock Span Problem"}),e.jsxs(x,{children:["Span of price[i] = maximum consecutive days (including today) where every prior day's price ≤ price[i]. Equivalent to: distance from i to the ",e.jsx("em",{children:"previous greater element"}),"'s index. O(n) with monotonic stack."]}),e.jsx(u,{children:{cpp:`vector<int> stockSpan(vector<int>& price) {
    int n = price.size();
    vector<int> span(n);
    stack<int> st;  // indices with DECREASING prices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && price[st.top()] <= price[i])
            st.pop();
        span[i] = st.empty() ? i + 1 : i - st.top();  // distance to PGE
        st.push(i);
    }
    return span;
}
// [13,15,12,14,16,8,6,4,10,30] → [1,2,1,2,5,1,1,1,4,10]`,python:`def stock_span(prices):
    span=[]; st=[]
    for i,p in enumerate(prices):
        while st and prices[st[-1]]<=p: st.pop()
        span.append(i+1 if not st else i-st[-1])
        st.append(i)
    return span`}}),e.jsxs(M,{cols:2,children:[e.jsx(T,{title:"Decreasing Stack → NGE / Stock Span",color:"info",children:"Maintains elements in decreasing order. Pop when current > top → current IS the NGE for all popped. Stack always holds candidates for future PGEs."}),e.jsx(T,{title:"Increasing Stack → Histogram",color:"success",children:"Maintains bars in increasing height. Pop when current is shorter → can compute the widest rectangle using the popped bar's height. Stack holds potential rectangle left boundaries."})]}),e.jsx(O,{q:"What is the key invariant of a monotonic decreasing stack, and why does it give O(n) total?",a:"Invariant: every element in the stack is greater than all elements below it. Each element is pushed exactly once and popped at most once. So over the entire array, total pushes = n, total pops ≤ n. The while loop doesn't add extra O(n) per iteration — it 'borrows' future pops. Total work: O(2n) = O(n)."})]})}function K(){return e.jsxs("div",{children:[e.jsx(d,{children:"Largest Rectangle in Histogram — Classic Hard"}),e.jsx(x,{children:"For each bar, find the widest rectangle of that bar's height. A bar at index i can extend left until it hits a shorter bar, and right until it hits a shorter bar. Use a monotonic increasing stack: pop when the current bar is shorter — the popped bar is the height of a rectangle bounded between the new top and current index."}),e.jsx(B,{}),e.jsx(u,{children:{cpp:`int largestRectangle(vector<int>& hist) {
    int n = hist.size(), maxArea = 0;
    stack<int> st;  // indices, increasing heights

    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : hist[i];  // sentinel 0 flushes remaining stack
        while (!st.empty() && hist[st.top()] >= h) {
            int height = hist[st.top()]; st.pop();
            int width  = st.empty() ? i : i - st.top() - 1;
            maxArea    = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}
// [6,2,5,4,1,5,6] → 10  (bars at idx 5,6, height=5, width=2)`,python:`def largest_rectangle(hist):
    n=len(hist); st=[]; max_area=0
    for i in range(n+1):
        h = 0 if i==n else hist[i]
        while st and hist[st[-1]]>=h:
            height=hist[st.pop()]
            width=i if not st else i-st[-1]-1
            max_area=max(max_area,height*width)
        st.append(i)
    return max_area`}}),e.jsxs(S,{color:"success",icon:"ti-bulb",children:[e.jsx("strong",{children:"The sentinel:"})," appending a 0-height bar at the end forces all remaining bars in the stack to be popped and processed. Without it, you'd need a second loop to drain the stack — the sentinel unifies both cases."]}),e.jsx(d,{children:"Largest Rectangle of 1s in a Binary Matrix"}),e.jsx(x,{children:`Extend the histogram idea row by row. For each row, compute the "height" of consecutive 1s ending at that row in each column. Then run the largest-rectangle-in-histogram algorithm on each row's height array. O(rows × cols).`}),e.jsx(u,{children:{cpp:`int maximalRectangle(vector<vector<char>>& matrix) {
    if (matrix.empty()) return 0;
    int rows=matrix.size(), cols=matrix[0].size(), maxArea=0;
    vector<int> hist(cols, 0);
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++)
            hist[c] = (matrix[r][c]=='0') ? 0 : hist[c]+1;  // build heights
        maxArea = max(maxArea, largestRectangle(hist));        // reuse histogram algo
    }
    return maxArea;
}
// Each row turns into a histogram — largestRectangle runs on it
// Total: O(rows × cols)`,python:`def maximal_rectangle(matrix):
    if not matrix: return 0
    cols=len(matrix[0]); hist=[0]*cols; max_area=0
    for row in matrix:
        for c in range(cols):
            hist[c]=0 if row[c]=='0' else hist[c]+1
        max_area=max(max_area,largest_rectangle(hist))
    return max_area`}}),e.jsx(d,{children:"Balanced Parentheses"}),e.jsx(u,{children:{cpp:`bool isBalanced(string s) {
    stack<char> st;
    for (char c : s) {
        if (c=='('||c=='{'||c=='[') st.push(c);
        else if (!st.empty() &&
                ((c==')'&&st.top()=='(')||(c=='}'&&st.top()=='{')||(c==']'&&st.top()=='[')))
            st.pop();
        else return false;  // mismatch or empty stack on close bracket
    }
    return st.empty();     // unmatched open brackets left?
}
// "{a+(b-c)*d}"     → true
// "{a+(b-c+[e-f)]}" → false`,python:`def is_balanced(s):
    st=[]; mp={')':'(','}':'{',']':'['}
    for c in s:
        if c in '({[': st.append(c)
        elif c in ')]}':
            if not st or st[-1]!=mp[c]: return False
            st.pop()
    return not st`}}),e.jsx(O,{q:"In the histogram problem, why does width = i when the stack is empty after popping, and not i − 0?",a:"When the stack is empty after popping bar at index top, it means all bars to the LEFT of the current position i are also ≥ the popped height. So the rectangle extends from index 0 all the way to i−1. Width = i − (−1) − 1 = i, where −1 represents a conceptual 'left sentinel' index (the left boundary if the stack were empty). This is why the formula gives width = i when the stack is empty."})]})}function X(){return e.jsxs("div",{children:[e.jsx(d,{children:"Infix, Prefix, Postfix — Why They Matter"}),e.jsx(N,{heads:["Notation","Form","Example","Needs Parentheses?"],rows:[["Infix","operand OP operand","a + b * c","Yes — precedence ambiguous"],["Postfix","operand operand OP","a b c * +","No — order is unambiguous"],["Prefix","OP operand operand","+ a * b c","No — order is unambiguous"]]}),e.jsx(x,{children:"Postfix and Prefix eliminate the need for precedence rules and parentheses during evaluation — they fully encode operation order in their structure. Compilers and stack machines use postfix internally."}),e.jsx(d,{children:"Infix to Postfix — Interactive"}),e.jsx(x,{children:"Shunting-Yard algorithm (Dijkstra): operands go directly to output; operators go to the stack after popping higher/equal-precedence operators; parentheses control grouping."}),e.jsx(H,{}),e.jsx(u,{children:{cpp:`string infixToPostfix(string s) {
    stack<char> st; string out;
    auto prec = [](char c) -> int {
        if (c=='+'||c=='-') return 1;
        if (c=='*'||c=='/') return 2;
        if (c=='^')         return 3;
        return 0;
    };
    for (char c : s) {
        if (isalnum(c)) { out+=c; continue; }
        if (c=='(') { st.push(c); continue; }
        if (c==')') {
            while (st.top()!='(') { out+=st.top(); st.pop(); }
            st.pop(); continue;  // discard '('
        }
        while (!st.empty() && st.top()!='(' && prec(st.top())>=prec(c))
            { out+=st.top(); st.pop(); }
        st.push(c);
    }
    while (!st.empty()) { out+=st.top(); st.pop(); }
    return out;
}
// "(a+b)*c-d" → "ab+c*d-"`,python:`def infix_to_postfix(s):
    prec={'+':1,'-':1,'*':2,'/':2,'^':3}; st=[]; out=[]
    for c in s:
        if c.isalnum(): out.append(c)
        elif c=='(': st.append(c)
        elif c==')':
            while st[-1]!='(': out.append(st.pop())
            st.pop()
        else:
            while st and st[-1]!='(' and prec.get(st[-1],0)>=prec[c]:
                out.append(st.pop())
            st.append(c)
    return ''.join(out+st[::-1])`}}),e.jsx(d,{children:"Evaluate Postfix Expression"}),e.jsx(u,{children:{cpp:`int evalPostfix(string expr) {
    stack<int> st;
    istringstream iss(expr);
    string token;
    while (iss >> token) {
        if (isdigit(token[0]) || (token.size()>1&&token[0]=='-')) {
            st.push(stoi(token));
        } else {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if      (token=="+") st.push(a+b);
            else if (token=="-") st.push(a-b);
            else if (token=="*") st.push(a*b);
            else                 st.push(a/b);
        }
    }
    return st.top();
}
// "10 2 * 3 +" → 23   |  "10 2 + 3 *" → 36`,python:`def eval_postfix(expr):
    st=[]
    for tok in expr.split():
        if tok.lstrip('-').isdigit(): st.append(int(tok))
        else:
            b,a=st.pop(),st.pop()
            if tok=='+':st.append(a+b)
            elif tok=='-':st.append(a-b)
            elif tok=='*':st.append(a*b)
            else:st.append(int(a/b))
    return st[0]`}}),e.jsx(d,{children:"Min Stack — O(1) Space Trick (No Auxiliary Array)"}),e.jsxs(x,{children:["The clever encoding: when pushing x that is less than the current min, store ",e.jsx(P,{children:"2x - \\text{min}"})," instead of x, and update min = x. On popping a value t ≤ min, the previous min = ",e.jsx(P,{children:"2 \\cdot \\text{min} - t"}),". This works because encoded values are always strictly less than min — distinguishable at pop time."]}),e.jsxs(S,{color:"purple",icon:"ti-math",children:[e.jsx("strong",{children:"Why does 2x − min work?"})," When x < min: encoded = 2x − min < x (because x − min < 0). So any encoded value is always strictly less than the current min — we detect it on pop by checking if t ≤ min, and decode the previous min as 2·min − t."]}),e.jsx(u,{children:{cpp:`class MinStack {
    stack<long long> st;
    long long minVal = LLONG_MAX;
public:
    void push(long long x) {
        if (st.empty()) { st.push(x); minVal = x; return; }
        if (x < minVal) {
            st.push(2*x - minVal);  // encode: value < current min (detectable later)
            minVal = x;              // update global min
        } else {
            st.push(x);
        }
    }
    void pop() {
        long long t = st.top(); st.pop();
        if (t < minVal) {            // was encoded — contains hidden prev_min info
            minVal = 2*minVal - t;   // decode previous min
        }
    }
    int top()    { long long t=st.top(); return (t<minVal)?minVal:t; }
    int getMin() { return minVal; }
};
// All operations O(1) time and O(1) extra space — no secondary min stack needed`,python:`class MinStack:
    def __init__(self): self.st=[]; self.min_val=float('inf')
    def push(self,x):
        if not self.st: self.st.append(x);self.min_val=x;return
        if x<self.min_val:
            self.st.append(2*x-self.min_val)  # encode
            self.min_val=x
        else: self.st.append(x)
    def pop(self):
        t=self.st.pop()
        if t<self.min_val: self.min_val=2*self.min_val-t  # decode prev min
    def top(self):    t=self.st[-1]; return self.min_val if t<self.min_val else t
    def get_min(self):return self.min_val`}}),e.jsx(O,{q:"Does the 2x − min encoding have any limitations or failure cases?",a:"Yes — integer overflow. If x and min are large 32-bit integers, 2x can overflow. The standard fix: use long long (64-bit) for the stack values and minVal. Another limitation: this trick only works for the minimum, not arbitrary order statistics. The auxiliary stack approach (maintaining a parallel stack of minimums) is simpler, equally O(1) per op, and avoids overflow concerns."})]})}function U(){return e.jsxs("div",{children:[e.jsx(S,{color:"purple",icon:"ti-tournament",children:"6 problems — balanced parentheses, monotonic stack patterns, histogram, and the iconic 84/85 pairing."}),e.jsx(j,{num:1,title:"Balanced Brackets",difficulty:"OA Easy",tags:["Stack","Classic"],statement:"Given a string of brackets <code>()[]{}</code> and other characters, return <code>true</code> if every opening bracket has a matching closing bracket in the correct order.",constraints:["1 ≤ |s| ≤ 10⁴","s contains letters, digits, and bracket characters"],examples:[{input:"{a+(b-c)*d}",output:"true"},{input:"{a+(b-c+[e-f)]}",output:"false",note:"')' closes '[' — mismatch"}],approach:"Push open brackets. On close bracket: if stack is empty or top doesn't match → false. On close bracket that matches → pop. After full scan, return stack.empty() (unmatched opens).",code:{cpp:`bool isBalanced(string s){
    stack<char> st;
    for(char c:s){
        if(c=='('||c=='{'||c=='[') st.push(c);
        else if(c==')'||c=='}'||c==']'){
            if(st.empty()) return false;
            char t=st.top();st.pop();
            if((c==')'&&t!='(')||(c=='}'&&t!='{')||(c==']'&&t!='[')) return false;
        }
    }
    return st.empty();
}`,python:`def is_balanced(s):
    st=[]; mp={')':'(','}':'{',']':'['}
    for c in s:
        if c in '({[':st.append(c)
        elif c in ')]}':
            if not st or st[-1]!=mp[c]:return False
            st.pop()
    return not st`}}),e.jsx(j,{num:2,title:"Previous Greater Element",difficulty:"OA Medium",tags:["Monotonic Stack","PGE"],statement:"Given an array, find for each element the first element to its <strong>left</strong> that is strictly greater. Return <code>-1</code> if no such element exists.",constraints:["1 ≤ n ≤ 10⁵","0 ≤ arr[i] ≤ 10⁹"],examples:[{input:"[15,10,18,12,4,6,2,8]",output:"[-1,15,-1,18,12,12,6,12]"}],approach:"Scan left to right. Maintain a decreasing stack (values). For each element, pop elements ≤ current (they can never be PGE for anything to the right). Stack top is the PGE. Push current.",code:{cpp:`vector<int> prevGreater(vector<int>& arr){
    vector<int> pge; stack<int> st;
    for(int v:arr){
        while(!st.empty()&&st.top()<=v) st.pop();
        pge.push_back(st.empty()?-1:st.top());
        st.push(v);
    }
    return pge;
}`,python:`def prev_greater(arr):
    pge=[]; st=[]
    for v in arr:
        while st and st[-1]<=v:st.pop()
        pge.append(-1 if not st else st[-1])
        st.append(v)
    return pge`}}),e.jsx(j,{num:3,title:"Next Greater Element I",difficulty:"LC Medium",tags:["LC 496","NGE"],statement:"Given <code>nums1</code> (subset of <code>nums2</code>), for each element in nums1 find the next greater element in nums2. Return <code>-1</code> if none.",constraints:["1 ≤ nums1.length ≤ nums2.length ≤ 1000","All values unique"],examples:[{input:"nums1=[4,1,2], nums2=[1,3,4,2]",output:"[-1,3,-1]"},{input:"nums1=[2,4], nums2=[1,2,3,4]",output:"[3,-1]"}],approach:"Build an NGE map for nums2 using a monotonic decreasing stack: process nums2 left to right, when arr[i] > stack top → pop and record NGE in a hash map. Then answer each nums1 query in O(1). Total O(n+m).",code:{cpp:`vector<int> nextGreaterElement(vector<int>& n1, vector<int>& n2){
    unordered_map<int,int> mp; stack<int> st;
    for(int v:n2){
        while(!st.empty()&&st.top()<v){mp[st.top()]=v;st.pop();}
        st.push(v);
    }
    vector<int> res;
    for(int v:n1) res.push_back(mp.count(v)?mp[v]:-1);
    return res;
}`,python:`def next_greater_element(nums1,nums2):
    mp={}; st=[]
    for v in nums2:
        while st and st[-1]<v:mp[st.pop()]=v
        st.append(v)
    return [mp.get(v,-1) for v in nums1]`}}),e.jsx(j,{num:4,title:"Largest Rectangle in Histogram",difficulty:"LC Hard",tags:["LC 84","Monotonic Stack"],statement:"Given heights of histogram bars, find the area of the <strong>largest rectangle</strong> that fits entirely within the histogram.",constraints:["1 ≤ n ≤ 10⁵","0 ≤ heights[i] ≤ 10⁴"],examples:[{input:"[6,2,5,4,1,5,6]",output:"10"},{input:"[2,5,1]",output:"5"}],approach:"Monotonic increasing stack: push indices. When heights[i] < stack top → pop and compute area: height = popped bar, width = i − new_top − 1 (or i if stack empty). Append sentinel 0 to flush all bars at the end. O(n) — each bar pushed and popped exactly once.",code:{cpp:`int largestRectangleArea(vector<int>& h){
    h.push_back(0); stack<int> st; int mx=0;
    for(int i=0;i<h.size();i++){
        while(!st.empty()&&h[st.top()]>=h[i]){
            int ht=h[st.top()];st.pop();
            int w=st.empty()?i:i-st.top()-1;
            mx=max(mx,ht*w);
        }
        st.push(i);
    }
    return mx;
}`,python:`def largest_rect(heights):
    heights.append(0);st=[];mx=0
    for i,h in enumerate(heights):
        while st and heights[st[-1]]>=h:
            ht=heights[st.pop()]
            w=i if not st else i-st[-1]-1
            mx=max(mx,ht*w)
        st.append(i)
    return mx`}}),e.jsx(j,{num:5,title:"Min Stack",difficulty:"LC Medium",tags:["LC 155","O(1) Space Trick"],statement:"Design a stack that supports push, pop, top, and <strong>getMin()</strong> in O(1) time. getMin() returns the minimum element in the stack.",constraints:["0 ≤ val ≤ 2³¹−1","At most 3×10⁴ operations","pop/top/getMin on non-empty stack"],examples:[{input:"push(-2),push(0),push(-3),getMin,pop,top,getMin",output:"[null,null,null,-3,null,0,-2]"}],approach:"O(1) space: use the encoding trick. When x < min: push 2x−min (encoded) and update min=x. On pop: if top ≤ min, it's encoded — recover prev_min = 2·min − top. Or simpler: use a parallel stack of minimums (min_stack) that only pushes when new value ≤ current min.",code:{cpp:`class MinStack{
    stack<long long> st; long long mn=LLONG_MAX;
public:
    void push(long long x){
        if(x<=mn){st.push(mn);mn=x;}
        st.push(x);
    }
    void pop(){
        long long t=st.top();st.pop();
        if(t==mn){mn=st.top();st.pop();}
    }
    int top()   {return st.top();}
    int getMin(){return mn;}
};`,python:`class MinStack:
    def __init__(self): self.st=[];self.mn=float('inf')
    def push(self,x):
        if x<=self.mn:self.st.append(self.mn);self.mn=x
        self.st.append(x)
    def pop(self):
        t=self.st.pop()
        if t==self.mn:self.mn=self.st.pop()
    def top(self):    return self.st[-1]
    def get_min(self):return self.mn`}}),e.jsx(j,{num:6,title:"Maximal Rectangle (Binary Matrix)",difficulty:"LC Hard",tags:["LC 85","Histogram on Matrix"],statement:"Given an <code>m × n</code> binary matrix, find the <strong>largest rectangle</strong> containing only 1s and return its area.",constraints:["1 ≤ m, n ≤ 200","matrix[i][j] is '0' or '1'"],examples:[{input:'[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]',output:"6"}],approach:"Build histogram row by row: for each cell, height[c] = 0 if '0', else height[c]+1 (consecutive 1s above). Run largestRectangleArea on each row's height array. Total O(m×n) — the histogram runs in O(n) per row.",code:{cpp:`int maximalRectangle(vector<vector<char>>& m){
    int r=m.size(),c=m[0].size(),ans=0;
    vector<int> h(c,0);
    for(int i=0;i<r;i++){
        for(int j=0;j<c;j++) h[j]=m[i][j]=='0'?0:h[j]+1;
        ans=max(ans,largestRectangleArea(vector<int>(h)));
    }
    return ans;
}`,python:`def maximal_rectangle(matrix):
    c=len(matrix[0]);h=[0]*c;ans=0
    for row in matrix:
        for j in range(c):h[j]=0 if row[j]=='0' else h[j]+1
        ans=max(ans,largest_rect(h[:]))
    return ans`}})]})}const Y=[{id:"foundations",label:"Foundations & Implementations"},{id:"monotonic",label:"Monotonic Stack"},{id:"histogram",label:"Histogram & Brackets"},{id:"expressions",label:"Expressions & MinStack"},{id:"problems",label:"Problems"}];function Z(){const[s,a]=A.useState("foundations"),t={foundations:e.jsx(V,{}),monotonic:e.jsx(q,{}),histogram:e.jsx(K,{}),expressions:e.jsx(X,{}),problems:e.jsx(U,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 15"}),e.jsx("h1",{className:"page-header-title",children:"Stacks"}),e.jsx("p",{className:"page-header-subtitle",children:"LIFO · Array/LL Implementations · Two Stacks · K Stacks · NGE/PGE · Stock Span · Histogram · Expressions · Min Stack O(1)"})]}),e.jsx($,{tabs:Y,active:s,onChange:a}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:t[s]}),e.jsx(C,{moduleId:15})]})}export{Z as default};
