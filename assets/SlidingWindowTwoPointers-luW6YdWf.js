import{r as S,j as e}from"./index-D9jkHkZY.js";import{S as W,N as O,d as p,H as c,P as m,c as s,a as h,T as A,Q as x,G as L,C as z,V as q}from"./SectionNav-BHzhBu3R.js";const C="abcabcbb";function F(r){const l=[],t={};let a=0,i=0;for(let n=0;n<r.length;n++){const o=r[n],d=t[o]!==void 0&&t[o]>=a;d&&(a=t[o]+1),t[o]=n;const u=n-a+1;i=Math.max(i,u),l.push({right:n,left:a,mapSnap:{...t},len:u,maxLen:i,jumped:d,desc:d?`'${o}' seen at [${t[o]-1<0?0:t[o]-1}] — jump left to ${a}. Window=[${a},${n}], len=${u}, max=${i}`:`'${o}' new — expand right. Window=[${a},${n}], len=${u}, max=${i}`})}return l}const b=F(C),k=[1,8,6,2,5,4,8,3,7];function B(r){const l=[];let t=0,a=r.length-1,i=0;for(;t<a;){const n=Math.min(r[t],r[a])*(a-t);i=Math.max(i,n);const o=r[t]<=r[a]?"lo":"hi";l.push({lo:t,hi:a,w:n,maxW:i,move:o,desc:`h[${t}]=${r[t]}, h[${a}]=${r[a]} → water=${r[t]<=r[a]?r[t]:r[a]}×${a-t}=${n}. Max=${i}. Move ${o==="lo"?"lo→":"←hi"} (smaller side limits water).`}),o==="lo"?t++:a--}return l.push({lo:t,hi:a,w:0,maxW:i,move:null,desc:`lo(${t}) = hi(${a}) — pointers met. Answer = ${i}.`}),l}const y=B(k),R=[-4,-1,-1,0,1,2],j=[{i:null,lo:null,hi:null,sum:null,action:"sort",found:[],desc:"Sort: [−1,0,1,2,−1,−4] → [−4,−1,−1,0,1,2]. Sorting enables the two-pointer scan."},{i:0,lo:1,hi:5,sum:-3,action:"too-small",found:[],desc:"Pivot=−4, lo=−1, hi=2 → sum=−3 < 0, need larger value → lo++"},{i:0,lo:2,hi:5,sum:-3,action:"too-small",found:[],desc:"Pivot=−4, lo=−1, hi=2 → sum=−3 < 0 → lo++"},{i:0,lo:3,hi:5,sum:-2,action:"too-small",found:[],desc:"Pivot=−4, lo=0, hi=2 → sum=−2 < 0 → lo++"},{i:0,lo:4,hi:5,sum:-1,action:"too-small",found:[],desc:"Pivot=−4, lo=1, hi=2 → sum=−1 < 0 → lo++. lo≥hi next, pivot exhausted."},{i:1,lo:2,hi:5,sum:0,action:"found",found:[[-1,-1,2]],desc:"Pivot=−1, lo=−1, hi=2 → sum=0 ✓  Triplet [−1,−1,2] added. lo++, hi−−."},{i:1,lo:3,hi:4,sum:0,action:"found",found:[[-1,-1,2],[-1,0,1]],desc:"Pivot=−1, lo=0, hi=1 → sum=0 ✓  Triplet [−1,0,1] added. lo++, hi−−."},{i:2,lo:null,hi:null,sum:null,action:"skip-dup",found:[[-1,-1,2],[-1,0,1]],desc:"i=2: sorted[2]=−1 equals sorted[1]=−1 → skip duplicate pivot."},{i:3,lo:4,hi:5,sum:3,action:"too-large",found:[[-1,-1,2],[-1,0,1]],desc:"Pivot=0, lo=1, hi=2 → sum=3 > 0, need smaller → hi−−. lo≥hi next, done."},{i:null,lo:null,hi:null,sum:null,action:"done",found:[[-1,-1,2],[-1,0,1]],desc:"Complete! 2 unique triplets: [−1,−1,2] and [−1,0,1]."}];function M(){const[r,l]=S.useState(0),t=b[r];return e.jsxs(q,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:t.desc}),e.jsx("div",{style:{display:"flex",gap:5,justifyContent:"center",marginBottom:16},children:C.split("").map((a,i)=>{const n=i>=t.left&&i<=t.right,o=i===t.right,d=i===t.left,u=i<t.left;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:7,border:"1px solid",borderColor:o&&t.jumped?"var(--color-border-warning)":o?"var(--color-border-info)":n?"var(--color-border-success)":u?"var(--color-border-tertiary)":"var(--color-border-secondary)",background:o&&t.jumped?"var(--color-background-warning)":o?"var(--color-background-info)":n?"rgba(78,201,176,0.1)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:15,fontWeight:n?700:400,color:o&&t.jumped?"var(--color-text-warning)":o?"var(--color-text-info)":n?"var(--color-text-success)":"var(--color-text-tertiary)",transition:"all 0.15s"},children:a}),e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:d?"var(--color-text-success)":o?"var(--color-text-info)":"var(--color-text-tertiary)"},children:d&&o?"L=R":d?"L":o?"R":i})]},i)})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"8px 12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-info)",marginBottom:2},children:"Window length"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:"var(--color-text-info)"},children:t.len})]}),e.jsxs("div",{style:{background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"8px 12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-success)",marginBottom:2},children:"Max so far"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:"var(--color-text-success)"},children:t.maxLen})]})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em"},children:["LAST-SEEN MAP  ","{","char → index","}"]}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap"},children:Object.entries(t.mapSnap).map(([a,i])=>e.jsxs("div",{style:{padding:"3px 9px",borderRadius:5,fontFamily:"var(--font-mono)",fontSize:11.5,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",color:"var(--color-text-secondary)"},children:["'",a,"': ",e.jsx("strong",{style:{color:i>=t.left?"var(--color-text-info)":"var(--color-text-tertiary)"},children:i})]},a))})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>l(Math.max(0,r-1)),disabled:r===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===0?"not-allowed":"pointer",fontSize:12,opacity:r===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[r+1," / ",b.length]}),e.jsx("button",{onClick:()=>l(Math.min(b.length-1,r+1)),disabled:r===b.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===b.length-1?"not-allowed":"pointer",fontSize:12,opacity:r===b.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function I(){const[r,l]=S.useState(0),t=y[r],a=Math.max(...k);return e.jsxs(q,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:t.desc}),e.jsx("div",{style:{display:"flex",gap:4,alignItems:"flex-end",justifyContent:"center",height:100,marginBottom:14},children:k.map((i,n)=>{const o=n===t.lo,d=n===t.hi,u=t.lo!==null&&n>t.lo&&n<t.hi,w=t.lo!==null&&n===t.lo?0:t.hi!==null&&n>=t.lo&&n<=t.hi?Math.min(k[t.lo],k[t.hi]):0,T=i/a*76,v=w/a*76;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx("div",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:o?"var(--color-text-info)":d?"var(--color-text-danger)":"var(--color-text-tertiary)"},children:i}),e.jsx("div",{style:{position:"relative",width:28,height:T,borderRadius:"3px 3px 0 0",background:o?"var(--color-background-info)":d?"var(--color-background-danger)":u?"var(--color-background-tertiary)":"var(--color-background-secondary)",border:`1px solid ${o?"var(--color-border-info)":d?"var(--color-border-danger)":u?"var(--color-border-tertiary)":"var(--color-border-secondary)"}`},children:u&&v>0&&e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:Math.min(v,T),background:"rgba(129,180,234,0.25)",borderTop:"1px dashed var(--color-border-info)"}})}),e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:o?"var(--color-text-info)":d?"var(--color-text-danger)":"var(--color-text-tertiary)"},children:o?"lo":d?"hi":n})]},n)})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"8px 12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-info)",marginBottom:2},children:"Current water"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:"var(--color-text-info)"},children:t.w})]}),e.jsxs("div",{style:{background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"8px 12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-success)",marginBottom:2},children:"Maximum (ans)"}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:20,fontWeight:700,color:"var(--color-text-success)"},children:t.maxW})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>l(Math.max(0,r-1)),disabled:r===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===0?"not-allowed":"pointer",fontSize:12,opacity:r===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[r+1," / ",y.length]}),e.jsx("button",{onClick:()=>l(Math.min(y.length-1,r+1)),disabled:r===y.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===y.length-1?"not-allowed":"pointer",fontSize:12,opacity:r===y.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function P(){const[r,l]=S.useState(0),t=j[r],a=i=>{const n=i===t.i,o=i===t.lo,d=i===t.hi;return t.action==="found"&&(i===t.i||i===t.lo||i===t.hi)?{bg:"var(--color-background-success)",bd:"var(--color-border-success)",cl:"var(--color-text-success)"}:n?{bg:"var(--color-background-warning)",bd:"var(--color-border-warning)",cl:"var(--color-text-warning)"}:o?{bg:"var(--color-background-info)",bd:"var(--color-border-info)",cl:"var(--color-text-info)"}:d?{bg:"var(--color-background-danger)",bd:"var(--color-border-danger)",cl:"var(--color-text-danger)"}:{bg:"var(--color-background-secondary)",bd:"var(--color-border-secondary)",cl:"var(--color-text-secondary)"}};return e.jsxs(q,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:t.desc}),e.jsx("div",{style:{display:"flex",gap:5,justifyContent:"center",marginBottom:14},children:R.map((i,n)=>{const o=a(n),d=n===t.i?"pivot":n===t.lo?"lo":n===t.hi?"hi":"";return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:7,border:`1px solid ${o.bd}`,background:o.bg,fontFamily:"var(--font-mono)",fontSize:14,fontWeight:d?700:400,color:o.cl,transition:"all 0.15s"},children:i}),e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:o.cl,minHeight:12},children:d})]},n)})}),t.sum!==null&&e.jsxs("div",{style:{textAlign:"center",marginBottom:12,fontFamily:"var(--font-mono)",fontSize:12.5},children:[e.jsx("span",{style:{color:"var(--color-text-tertiary)"},children:"sum = "}),e.jsx("span",{style:{color:t.action==="found"?"var(--color-text-success)":t.action==="too-small"?"var(--color-text-warning)":"var(--color-text-danger)",fontWeight:700,fontSize:15},children:t.sum}),e.jsx("span",{style:{color:"var(--color-text-tertiary)",marginLeft:8},children:t.action==="found"?"= 0 ✓":t.action==="too-small"?"< 0 → lo++":t.action==="too-large"?"> 0 → hi−−":""})]}),t.found.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"FOUND TRIPLETS"}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:t.found.map((i,n)=>e.jsxs("div",{style:{padding:"4px 10px",borderRadius:5,background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-success)",fontWeight:600},children:["[",i.join(", "),"]"]},n))})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>l(Math.max(0,r-1)),disabled:r===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===0?"not-allowed":"pointer",fontSize:12,opacity:r===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[r+1," / ",j.length]}),e.jsx("button",{onClick:()=>l(Math.min(j.length-1,r+1)),disabled:r===j.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===j.length-1?"not-allowed":"pointer",fontSize:12,opacity:r===j.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>l(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const N={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function g({num:r,title:l,difficulty:t,tags:a=[],statement:i,constraints:n=[],examples:o=[],approach:d,code:u}){const[w,T]=S.useState(!1),v=N[t]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",r]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:l})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[a.map(f=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:f},f)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${v})`,color:`var(--color-text-${v})`,border:`1px solid var(--color-border-${v})`},children:t})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:i}}),n.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:n.map((f,_)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:f},_))})]}),o.length>0&&e.jsx("div",{style:{marginBottom:14},children:o.map((f,_)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",_+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f.output})]}),f.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:f.note})]},_))}),e.jsxs("button",{onClick:()=>T(!w),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:w?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${w?"eye-off":"bulb"}`}),w?"Hide Solution":"Show Approach & Solution"]}),w&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),d]}),e.jsx(h,{children:u})]})]})]})}function E(){return e.jsxs("div",{children:[e.jsxs(p,{color:"info",icon:"ti-viewport-wide",children:[e.jsx("strong",{children:"The big picture:"})," Both patterns reduce O(n²) brute-force subarray/pair search to ",e.jsx("em",{children:"O(n)"})," by maintaining a ",e.jsx("strong",{children:"structured invariant"})," as pointers move — each element is visited at most twice (added once, removed once), giving amortized O(1) per element."]}),e.jsx(c,{children:"Sliding Window — What It Solves"}),e.jsxs(m,{children:["A ",e.jsx("strong",{children:"window"})," is a contiguous subarray or substring defined by two boundary indices ",e.jsx(s,{children:"[left, right]"}),". The window expands right to include new elements and contracts left to restore validity. Sliding window applies when the answer involves an optimal ",e.jsx("em",{children:"contiguous"})," segment and the validity predicate is ",e.jsx("em",{children:"monotonic"})," — once invalid, adding more elements stays invalid (or vice versa)."]}),e.jsxs(L,{cols:2,children:[e.jsx(z,{title:"Fixed Window",color:"info",children:"Window size is constant (k). Slide by removing the leftmost element and adding a new rightmost element — O(1) per step. Used for max/min/sum over k-consecutive elements."}),e.jsxs(z,{title:"Variable Window",color:"success",children:["Window expands (right++) freely and contracts (left++) to maintain a validity condition. Two variants: ",e.jsx("em",{children:"longest valid"})," (expand as much as possible) and ",e.jsx("em",{children:"shortest valid"})," (shrink after each valid window found)."]})]}),e.jsx(c,{children:"Two Pointers — What It Solves"}),e.jsxs(m,{children:[e.jsx("strong",{children:"Two pointers"})," maintains two indices that scan the array from different positions. The three configurations: (1) ",e.jsx("em",{children:"opposite ends"})," — lo from left, hi from right, meet in the middle; (2) ",e.jsx("em",{children:"same direction"})," — both move right (fast-slow, used for in-place operations); (3) ",e.jsx("em",{children:"cross-array"})," — one pointer per array (merge sort merge step)."]}),e.jsxs(L,{cols:2,children:[e.jsx(z,{title:"Use Sliding Window when…",color:"warning",children:"The problem asks about subarrays/substrings. You need the longest/shortest/count of contiguous segments. A character frequency or element count constraint is involved."}),e.jsx(z,{title:"Use Two Pointers when…",color:"info",children:"The array is sorted (or can be sorted first). You're searching for pairs/triplets summing to a target. You need to maximize area, distance, or some function of two endpoints."})]}),e.jsx(c,{children:"The Amortized O(n) Argument"}),e.jsxs(m,{children:["In both patterns, each pointer only moves ",e.jsx("em",{children:"forward"})," — never backward. For a sliding window: ",e.jsx(s,{children:"right"})," advances from 0 to n−1 (n steps), and ",e.jsx(s,{children:"left"})," advances from 0 to at most n−1 (n steps total across all iterations). Total pointer moves: at most 2n. For two pointers: lo starts at 0, hi starts at n−1, they move toward each other — at most n moves total. Both are ",e.jsx("strong",{children:"Θ(n)"})," regardless of inner-loop operations."]}),e.jsxs(p,{color:"success",icon:"ti-math",children:[e.jsx("strong",{children:"Invariant principle:"}),` The key to correctness is maintaining a valid invariant at the pointer boundary. For opposite-end two pointers on a sorted array: "moving the smaller pointer can only increase the sum — we'll never miss a better answer by skipping." Every step preserves this guarantee.`]}),e.jsx(c,{children:"Templates"}),e.jsx(h,{children:{cpp:`// ── Fixed Window ──────────────────────────────────────
int maxSumK(vector<int>& arr, int k) {
    int win = 0;
    for (int i = 0; i < k; i++) win += arr[i];          // seed first window
    int res = win;
    for (int i = k; i < arr.size(); i++) {
        win += arr[i] - arr[i - k];                      // O(1) slide
        res  = max(res, win);
    }
    return res;
}

// ── Variable Window — Longest Valid ─────────────────────
int longestValid(vector<int>& arr) {
    int left = 0, maxLen = 0;
    // window state (freq map, count, etc.)
    for (int right = 0; right < arr.size(); right++) {
        /* expand: add arr[right] to window */
        while (/* window INVALID */) {
            /* shrink: remove arr[left] from window */
            left++;
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

// ── Variable Window — Shortest Valid ────────────────────
int shortestValid(vector<int>& arr) {
    int left = 0, minLen = INT_MAX;
    /* expand window with arr[right] */
    for (int right = 0; right < arr.size(); right++) {
        /* add arr[right] to window */
        while (/* window VALID */) {
            minLen = min(minLen, right - left + 1);
            /* remove arr[left] from window */
            left++;
        }
    }
    return minLen == INT_MAX ? 0 : minLen;
}

// ── Two Pointers (Opposite Ends) ────────────────────────
void twoPointers(vector<int>& sorted) {
    int lo = 0, hi = sorted.size() - 1;
    while (lo < hi) {
        if (/* condition met */) { /* record result */ lo++; hi--; }
        else if (/* need larger */) lo++;
        else /* need smaller */     hi--;
    }
}`,python:`# ── Fixed Window ──────────────────────────────────────
def max_sum_k(arr, k):
    win = sum(arr[:k]); res = win
    for i in range(k, len(arr)):
        win += arr[i] - arr[i - k]
        res = max(res, win)
    return res

# ── Variable Window — Longest Valid ───────────────────
def longest_valid(arr):
    left = res = 0
    # window state: freq dict, count, etc.
    for right in range(len(arr)):
        # expand: add arr[right] to window
        while not_valid:          # shrink from left
            # remove arr[left]
            left += 1
        res = max(res, right - left + 1)
    return res

# ── Two Pointers (Opposite Ends) ──────────────────────
def two_pointers(arr):  # must be sorted
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        if condition_met:   lo += 1; hi -= 1
        elif need_larger:   lo += 1
        else:               hi -= 1`}}),e.jsx(c,{children:"Complexity Comparison"}),e.jsx(A,{heads:["Problem Type","Brute Force","With Pattern","Pattern"],rows:[["Max sum of k consecutive","O(nk)","O(n)","Fixed window"],["Longest no-repeat substring","O(n²)","O(n)","Variable window + hashmap"],["Min window covering t","O(n²m)","O(n+m)","Variable window + freq map"],["Two Sum (sorted)","O(n²)","O(n)","Two pointers (opposite ends)"],["3Sum","O(n³)","O(n²)","Sort + two pointers"],["Container with most water","O(n²)","O(n)","Two pointers (area invariant)"],["Trapping rain water","O(n²)","O(n)","Two pointers (lmax/rmax)"]]}),e.jsx(x,{q:"Why must two pointers on a sorted array never need to backtrack?",a:"On a sorted array: if nums[lo] + nums[hi] < target, every pair (lo, hi'), hi' < hi would also be too small (since nums is sorted and nums[hi'] ≤ nums[hi]). So we can safely increment lo without checking any of those smaller hi values — none can satisfy the constraint. Symmetrically for hi--. This 'safe to skip' guarantee is the invariant that makes the algorithm correct and O(n)."}),e.jsx(x,{q:"What makes a problem NOT suitable for sliding window?",a:"Sliding window requires a <em>monotonic validity</em>: if the window is valid, extending it stays valid (for 'longest' problems), or if invalid, shrinking from the left can restore validity. Problems with non-monotonic conditions (e.g., 'exactly k distinct AND at most 3 of one type') or non-contiguous selections do not fit. Also, sliding window with a hash map only works when 'removing arr[left] from the window state' is O(1)."})]})}function $(){return e.jsxs("div",{children:[e.jsx(c,{children:"Variable Window — Longest Substring Without Repeating Characters"}),e.jsx(m,{children:"Classic example of the variable window with a last-seen hash map. When the right pointer hits a character already in the window, we jump the left pointer past its last occurrence rather than slowly shrinking one step at a time — giving O(n) worst case."}),e.jsx(M,{}),e.jsx(h,{children:{cpp:`int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> last;  // char → last seen index
    int left = 0, maxLen = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        char c = s[right];
        // If c is in window [left..right-1], jump left past it
        if (last.count(c) && last[c] >= left)
            left = last[c] + 1;
        last[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
// "abcabcbb" → 3  |  "bbbbb" → 1  |  "pwwkew" → 3`,python:`def length_of_longest_substring(s):
    last = {}; left = 0; max_len = 0
    for right, c in enumerate(s):
        if c in last and last[c] >= left:
            left = last[c] + 1
        last[c] = right
        max_len = max(max_len, right - left + 1)
    return max_len`}}),e.jsx(c,{children:"Frequency Map Pattern — Character Counting Windows"}),e.jsxs(m,{children:["Many sliding window problems on strings require tracking character frequencies in the current window. The pattern: maintain a ",e.jsx(s,{children:"count[]"})," or ",e.jsx(s,{children:"unordered_map"}),", and use a ",e.jsx(s,{children:"formed"}),"/",e.jsx(s,{children:"satisfied"})," counter to know when all requirements are met — avoiding O(26) or O(|t|) re-checks per step."]}),e.jsx(h,{children:{cpp:`// General frequency-map window skeleton (used by LC 76, LC 567, etc.)
int freqWindow(string s, string pattern) {
    unordered_map<char,int> need, have;
    for (char c : pattern) need[c]++;
    int formed = 0, required = need.size(); // # distinct chars satisfied
    int left = 0;

    for (int right = 0; right < s.size(); right++) {
        char c = s[right];
        have[c]++;
        // Check if this char just became 'satisfied'
        if (need.count(c) && have[c] == need[c]) formed++;

        // Try to shrink window while all requirements met
        while (formed == required) {
            /* record answer: right - left + 1 */
            char lc = s[left];
            have[lc]--;
            if (need.count(lc) && have[lc] < need[lc]) formed--;
            left++;
        }
    }
    return /* answer */;
}`,python:`from collections import defaultdict

def freq_window(s, pattern):
    need = defaultdict(int)
    for c in pattern: need[c] += 1
    have = defaultdict(int)
    formed = required = len(need)   # distinct chars to satisfy

    left = 0
    for right, c in enumerate(s):
        have[c] += 1
        if c in need and have[c] == need[c]: formed -= 1

        while formed == 0:
            # record answer: right - left + 1
            lc = s[left]
            have[lc] -= 1
            if lc in need and have[lc] < need[lc]: formed += 1
            left += 1`}}),e.jsx(c,{children:'The "At Most K → Exactly K" Subtraction Trick'}),e.jsxs(m,{children:["Some problems ask for subarrays with ",e.jsx("em",{children:"exactly K"}),` of something (distinct elements, ones, etc.). Direct window for "exactly K" is hard because the window can't be cleanly shrunk to maintain exactness. Solution: define `,e.jsx(s,{children:"f(k)"})," = count of subarrays with ",e.jsx("em",{children:"at most k"})," (easy to compute with sliding window), then:"]}),e.jsx(p,{color:"success",icon:"ti-math",children:e.jsx(s,{children:"count(exactly\\;k) = f(k) − f(k-1)"})}),e.jsx(h,{children:{cpp:`// Count subarrays with AT MOST k distinct values — O(n)
int atMostK(vector<int>& arr, int k) {
    unordered_map<int,int> cnt;
    int left = 0, res = 0;
    for (int right = 0; right < arr.size(); right++) {
        cnt[arr[right]]++;
        while ((int)cnt.size() > k) {         // too many distinct
            if (--cnt[arr[left]] == 0)
                cnt.erase(arr[left]);
            left++;
        }
        res += right - left + 1;              // all windows ending at right
    }
    return res;
}

// Count subarrays with EXACTLY k distinct values
int exactlyK(vector<int>& arr, int k) {
    return atMostK(arr, k) - atMostK(arr, k - 1);
}
// [1,2,1,2,3], k=2 → 7  (subarrays: [1],[2],[1],[2],[1,2],[2,1],[1,2,1] and more)`,python:`from collections import defaultdict

def at_most_k(arr, k):
    cnt = defaultdict(int); left = res = 0
    for right, v in enumerate(arr):
        cnt[v] += 1
        while len(cnt) > k:
            cnt[arr[left]] -= 1
            if cnt[arr[left]] == 0: del cnt[arr[left]]
            left += 1
        res += right - left + 1
    return res

def exactly_k(arr, k):
    return at_most_k(arr, k) - at_most_k(arr, k - 1)`}}),e.jsx(c,{children:"LC 424 — The Monotonic maxFreq Trick"}),e.jsxs(m,{children:["Longest substring with at most ",e.jsx(s,{children:"k"})," replacements. A window ",e.jsx(s,{children:"[left, right]"})," is valid when: ",e.jsx(s,{children:"(right − left + 1) − maxFreq \\leq k"}),", i.e., we can replace all non-dominant characters. The subtlety: ",e.jsx(s,{children:"maxFreq"})," only ever ",e.jsx("em",{children:"increases"})," — we never shrink it when the window contracts. This is intentional: we're searching for the longest valid window, so we only care when ",e.jsx(s,{children:"maxFreq"})," grows."]}),e.jsx(h,{children:{cpp:`int characterReplacement(string s, int k) {
    unordered_map<char,int> cnt;
    int left = 0, maxFreq = 0, maxLen = 0;

    for (int right = 0; right < s.size(); right++) {
        cnt[s[right]]++;
        maxFreq = max(maxFreq, cnt[s[right]]);  // only ever increases

        // Window invalid: too many chars to replace
        // Instead of while-loop, a single if is enough:
        // The window size stays the same (slides) — we don't shrink,
        // because a shorter window can never beat the current best.
        if (right - left + 1 - maxFreq > k) {
            cnt[s[left]]--;
            left++;
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
// "AABABBA", k=1 → 4  |  "ABAB", k=2 → 4`,python:`def character_replacement(s, k):
    from collections import defaultdict
    cnt = defaultdict(int)
    left = max_freq = max_len = 0

    for right, c in enumerate(s):
        cnt[c] += 1
        max_freq = max(max_freq, cnt[c])   # only increases
        # Slide window if invalid (never shrink, just shift)
        if (right - left + 1) - max_freq > k:
            cnt[s[left]] -= 1
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len`}}),e.jsxs(p,{color:"warning",icon:"ti-info-circle",children:[e.jsxs("strong",{children:["Why ",e.jsx("code",{children:"if"})," and not ",e.jsx("code",{children:"while"}),"?"]})," We use a single ",e.jsx("code",{children:"if"})," because the window size never decreases — it either stays the same (invalid window, we slide it) or increases (valid window, we extend it). We never benefit from a smaller window than the current maximum, so shrinking past one step is unnecessary."]}),e.jsx(x,{q:"In LC 3, why jump left to last[c]+1 instead of shrinking one step at a time?",a:"Shrinking one step at a time would be O(n²) worst case (e.g., 'aaaaaa' — every new 'a' triggers n steps of shrinking). Jumping directly past the previous occurrence is safe because any window containing a duplicate is invalid. All characters between old_left and last[c] are also invalid starting positions for a window ending at right. The map stores the exact jump target, giving O(n) total."}),e.jsx(x,{q:"Why does the at-most-K approach correctly count exactly-K subarrays?",a:"atMostK(k) counts all subarrays with ≤ k distinct elements. atMostK(k-1) counts all subarrays with ≤ k-1 distinct elements. Their difference counts subarrays with exactly k distinct elements — subarrays present in the first count but not the second. This works because 'at most K' windows form a clean prefix of the count, allowing clean subtraction."})]})}function D(){return e.jsxs("div",{children:[e.jsx(c,{children:"Pattern 1 — Two Sum in a Sorted Array (Opposite Ends)"}),e.jsxs(m,{children:["The foundational two-pointer technique. On a sorted array, ",e.jsx(s,{children:"lo"})," starts at index 0, ",e.jsx(s,{children:"hi"})," at n−1. The current sum determines which pointer moves: too small → lo++; too large → hi--; exact → found. Every pointer move discards a row or column of the pair matrix, giving O(n)."]}),e.jsx(h,{children:{cpp:`// LC 167 — Two Sum II (1-indexed return)
vector<int> twoSum(vector<int>& numbers, int target) {
    int lo = 0, hi = numbers.size() - 1;
    while (lo < hi) {
        int sum = numbers[lo] + numbers[hi];
        if      (sum == target) return {lo + 1, hi + 1}; // 1-indexed
        else if (sum  < target) lo++;
        else                    hi--;
    }
    return {};  // guaranteed to exist per problem
}`,python:`def two_sum_sorted(numbers, target):
    lo, hi = 0, len(numbers) - 1
    while lo < hi:
        s = numbers[lo] + numbers[hi]
        if   s == target: return [lo + 1, hi + 1]
        elif s  < target: lo += 1
        else:             hi -= 1`}}),e.jsx(c,{children:"Pattern 2 — Maximize Area (Container With Most Water)"}),e.jsxs(m,{children:["Two pointers from opposite ends, maximizing ",e.jsx(s,{children:"min(h[lo], h[hi]) \\times (hi - lo)"}),". The key invariant: always move the ",e.jsx("em",{children:"shorter"})," boundary. If we moved the taller one, the width decreases and the limiting height stays the same or gets worse — we can never improve. Moving the shorter side at least gives the ",e.jsx("em",{children:"possibility"})," of a taller boundary increasing the area."]}),e.jsx(I,{}),e.jsx(h,{children:{cpp:`int maxArea(vector<int>& h) {
    int lo = 0, hi = h.size() - 1, maxW = 0;
    while (lo < hi) {
        maxW = max(maxW, min(h[lo], h[hi]) * (hi - lo));
        if (h[lo] <= h[hi]) lo++;   // move the shorter side
        else                hi--;
    }
    return maxW;
}
// [1,8,6,2,5,4,8,3,7] → 49  (h[1]=8, h[8]=7, width=7)`,python:`def max_area(h):
    lo, hi, max_w = 0, len(h) - 1, 0
    while lo < hi:
        max_w = max(max_w, min(h[lo], h[hi]) * (hi - lo))
        if h[lo] <= h[hi]: lo += 1
        else: hi -= 1
    return max_w`}}),e.jsx(c,{children:"Pattern 3 — Sort + Two Pointers (3Sum)"}),e.jsxs(m,{children:["Reduce k-sum to (k-1)-sum by fixing one element at a time and recursing (or iterating) with two pointers on the remainder. For 3Sum: sort, iterate pivot ",e.jsx(s,{children:"i"}),", then run two pointers on ",e.jsx(s,{children:"[i+1, n-1]"}),". Skip duplicates at both pivot and pointer levels to avoid duplicate triplets."]}),e.jsx(P,{}),e.jsx(h,{children:{cpp:`vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    int n = nums.size();

    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue; // skip dup pivot
        int lo = i + 1, hi = n - 1;
        while (lo < hi) {
            int sum = nums[i] + nums[lo] + nums[hi];
            if (sum == 0) {
                res.push_back({nums[i], nums[lo], nums[hi]});
                while (lo < hi && nums[lo] == nums[lo+1]) lo++; // skip dup lo
                while (lo < hi && nums[hi] == nums[hi-1]) hi--; // skip dup hi
                lo++; hi--;
            } else if (sum < 0) lo++;
            else                hi--;
        }
    }
    return res;
}
// [-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]`,python:`def three_sum(nums):
    nums.sort(); res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i-1]: continue   # skip dup pivot
        lo, hi = i + 1, n - 1
        while lo < hi:
            s = nums[i] + nums[lo] + nums[hi]
            if s == 0:
                res.append([nums[i], nums[lo], nums[hi]])
                while lo < hi and nums[lo] == nums[lo+1]: lo += 1
                while lo < hi and nums[hi] == nums[hi-1]: hi -= 1
                lo += 1; hi -= 1
            elif s < 0: lo += 1
            else:       hi -= 1
    return res`}}),e.jsx(c,{children:"Pattern 4 — Two Pointer Rain Water (O(1) Space)"}),e.jsxs(m,{children:["The classic O(n) space trapping rain water uses prefix/suffix max arrays (covered in the Arrays module). The O(1) space two-pointer version avoids precomputing them: maintain ",e.jsx(s,{children:"lmax"})," and ",e.jsx(s,{children:"rmax"})," on the fly. Process the side with the smaller current boundary — we know the limiting constraint comes from that side."]}),e.jsx(h,{children:{cpp:`int trap(vector<int>& h) {
    int lo = 0, hi = h.size() - 1;
    int lmax = 0, rmax = 0, water = 0;
    while (lo < hi) {
        if (h[lo] <= h[hi]) {
            // Right side is at least as tall — left side is the bottleneck
            lmax = max(lmax, h[lo]);
            water += lmax - h[lo];  // water above h[lo]
            lo++;
        } else {
            // Left side is taller — right side is the bottleneck
            rmax = max(rmax, h[hi]);
            water += rmax - h[hi];
            hi--;
        }
    }
    return water;
}
// [0,1,0,2,1,0,1,3,2,1,2,1] → 6
// [4,2,0,3,2,5] → 9`,python:`def trap(h):
    lo, hi = 0, len(h) - 1
    lmax = rmax = water = 0
    while lo < hi:
        if h[lo] <= h[hi]:
            lmax = max(lmax, h[lo])
            water += lmax - h[lo]; lo += 1
        else:
            rmax = max(rmax, h[hi])
            water += rmax - h[hi]; hi -= 1
    return water`}}),e.jsxs(p,{color:"success",icon:"ti-bulb",children:[e.jsx("strong",{children:"Why is it safe to process the smaller side?"})," When ",e.jsx(s,{children:"h[lo] \\leq h[hi]"}),", we know ",e.jsx(s,{children:"rmax \\geq h[hi] \\geq h[lo]"}),". So the water at ",e.jsx(s,{children:"lo"})," is determined by ",e.jsx(s,{children:"lmax"})," (the left boundary), not ",e.jsx(s,{children:"rmax"}),". We process it with certainty. Symmetrically when ",e.jsx(s,{children:"h[hi] < h[lo]"}),"."]}),e.jsx(c,{children:"Same-Direction Two Pointers (Fast-Slow)"}),e.jsx(h,{children:{cpp:`// Remove duplicates from sorted array in-place
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int slow = 1;                             // next write position
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow - 1]) {   // new distinct element
            nums[slow++] = nums[fast];
        }
    }
    return slow;
}

// Move zeros to end (maintaining relative order of non-zeros)
void moveZeroes(vector<int>& nums) {
    int slow = 0;
    for (int fast = 0; fast < nums.size(); fast++)
        if (nums[fast] != 0)
            nums[slow++] = nums[fast];
    while (slow < nums.size()) nums[slow++] = 0;
}`,python:`def remove_duplicates(nums):
    if not nums: return 0
    slow = 1
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow - 1]:
            nums[slow] = nums[fast]; slow += 1
    return slow

def move_zeroes(nums):
    slow = 0
    for v in nums:
        if v != 0: nums[slow] = v; slow += 1
    while slow < len(nums): nums[slow] = 0; slow += 1`}}),e.jsx(x,{q:"In the container problem, why does moving the taller pointer never give a better answer?",a:"Suppose h[lo] ≤ h[hi]. The current area = h[lo] × (hi - lo). If we move hi to hi-1: the new width = (hi-1) - lo, and the new height = min(h[lo], h[hi-1]) ≤ h[lo]. Both factors weakly decrease. The new area ≤ h[lo] × (hi - lo) = current area. So hi-- can never improve when h[hi] ≥ h[lo]. Moving lo++ at least gives a chance for h[lo+1] > h[lo] to increase the height."}),e.jsx(x,{q:"In 3Sum, why do we need to skip duplicates at both the pivot and the lo/hi pointer levels?",a:"Duplicate pivots would produce the same set of triplets — since the inner two-pointer scan is identical for equal pivot values. Skipping ensures each pivot value is processed only once. Similarly, after finding a valid triplet, duplicate values at lo or hi would produce the same triplet again. All three deduplication points are needed to guarantee a set of unique triplets."}),e.jsx(x,{q:"Can 3Sum be solved without sorting? What would the complexity be?",a:"Without sorting, you can't use two pointers and must use a hash set: fix one element (pivot), then solve two-sum for the remaining elements using a set — O(n) per pivot, O(n²) total with O(n) space. Deduplication requires careful bookkeeping (e.g., sorting triplets before adding to a result set). Sorting first gives the same O(n²) time but simpler deduplication and O(1) extra space (excluding output)."})]})}function H(){return e.jsxs("div",{children:[e.jsx(p,{color:"danger",icon:"ti-flame",children:"These three problems are the hardest and most frequently asked sliding window problems in FAANG interviews. Each introduces a non-trivial insight on top of the basic template."}),e.jsx(c,{children:"LC 76 — Minimum Window Substring"}),e.jsxs(m,{children:["Find the smallest window in ",e.jsx(s,{children:"s"})," that contains all characters of ",e.jsx(s,{children:"t"})," (including duplicates). The window expands right until all requirements are met (",e.jsx(s,{children:"formed == required"}),"), then shrinks left to find the minimum while still valid."]}),e.jsxs(p,{color:"info",icon:"ti-bulb",children:[e.jsxs("strong",{children:["Key insight — the ",e.jsx("code",{children:"formed"})," counter:"]})," Instead of re-scanning the entire ",e.jsx(s,{children:"need"})," map on every step (O(|t|)), maintain a single integer ",e.jsx(s,{children:"formed"})," that counts how many distinct required characters are currently satisfied. Increment when ",e.jsx(s,{children:"have[c] == need[c]"})," (just met the requirement), decrement when shrinking drops a character below its required count."]}),e.jsx(h,{children:{cpp:`string minWindow(string s, string t) {
    if (s.empty() || t.empty()) return "";
    unordered_map<char,int> need, have;
    for (char c : t) need[c]++;
    int formed = 0, required = need.size();
    int left = 0, minLen = INT_MAX, start = 0;

    for (int right = 0; right < s.size(); right++) {
        char c = s[right];
        have[c]++;
        // Did this char just reach its required count?
        if (need.count(c) && have[c] == need[c]) formed++;

        // Shrink from left while all requirements are met
        while (formed == required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                start  = left;
            }
            have[s[left]]--;
            if (need.count(s[left]) && have[s[left]] < need[s[left]])
                formed--;       // just lost a satisfied character
            left++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(start, minLen);
}
// "ADOBECODEBANC", "ABC" → "BANC"
// Time: O(|s| + |t|)  Space: O(|s| + |t|)`,python:`from collections import defaultdict

def min_window(s, t):
    if not s or not t: return ""
    need = defaultdict(int)
    for c in t: need[c] += 1
    have  = defaultdict(int)
    formed = required = len(need)   # using countdown style

    left = 0; min_len = float('inf'); start = 0

    for right, c in enumerate(s):
        have[c] += 1
        if c in need and have[c] == need[c]: formed -= 1

        while formed == 0:             # all requirements met
            if right - left + 1 < min_len:
                min_len, start = right - left + 1, left
            lc = s[left]; have[lc] -= 1
            if lc in need and have[lc] < need[lc]: formed += 1
            left += 1

    return s[start:start + min_len] if min_len != float('inf') else ""`}}),e.jsx(A,{heads:["Variable","Meaning","Updates when…"],rows:[["need[c]","How many of char c required","Built from t, never changes"],["have[c]","How many of char c in current window","right++ (add), left++ (remove)"],["formed","# distinct chars currently satisfied","have[c] hits need[c] (up) / drops below (down)"],["required","Total distinct chars needed","= len(need), constant"]]}),e.jsx(c,{children:"LC 904 — Fruit Into Baskets (At Most 2 Distinct)"}),e.jsx(m,{children:'Find the longest subarray with at most 2 distinct values. This is a direct application of the "at most K distinct" variable-window template with K=2. The basket map stores current fruit counts in the window.'}),e.jsx(h,{children:{cpp:`int totalFruit(vector<int>& fruits) {
    unordered_map<int,int> basket;
    int left = 0, maxLen = 0;
    for (int right = 0; right < fruits.size(); right++) {
        basket[fruits[right]]++;
        // More than 2 distinct fruit types — shrink from left
        while (basket.size() > 2) {
            basket[fruits[left]]--;
            if (basket[fruits[left]] == 0)
                basket.erase(fruits[left]);
            left++;
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
// [1,2,1]     → 3  (whole array, 2 types)
// [0,1,2,2]   → 3  (last 3: [1,2,2])
// [1,2,3,2,2] → 4  (last 4: [2,3,2,2])`,python:`from collections import defaultdict

def total_fruit(fruits):
    basket = defaultdict(int)
    left = max_len = 0
    for right, f in enumerate(fruits):
        basket[f] += 1
        while len(basket) > 2:
            basket[fruits[left]] -= 1
            if basket[fruits[left]] == 0: del basket[fruits[left]]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len`}}),e.jsxs(p,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"Generalization:"}),' Replace 2 with k for "at most k distinct fruit types." This same exact template solves LC 992 (subarrays with exactly k distinct) when combined with the f(k) − f(k-1) subtraction trick.']}),e.jsx(c,{children:"LC 424 — Longest Repeating Character Replacement (Revisited)"}),e.jsxs(m,{children:["The deepest insight in the module. The ",e.jsx(s,{children:"maxFreq"})," variable is intentionally ",e.jsx("em",{children:"never decremented"})," when the window slides. This is because we only care about windows ",e.jsx("em",{children:"longer"})," than the current max, and those require a higher ",e.jsx(s,{children:"maxFreq"}),". The window never shrinks — it always stays at the current maximum valid size or shifts by 1."]}),e.jsx(h,{children:{cpp:`int characterReplacement(string s, int k) {
    int cnt[26] = {}, left = 0, maxFreq = 0, maxLen = 0;
    for (int right = 0; right < s.size(); right++) {
        cnt[s[right] - 'A']++;
        maxFreq = max(maxFreq, cnt[s[right] - 'A']); // monotonically non-decreasing

        // (window_size - maxFreq) = chars to replace
        // If > k: slide window (not shrink — just shift by 1)
        if (right - left + 1 - maxFreq > k) {
            cnt[s[left] - 'A']--;
            left++;
        }
        // Window is either valid (growing) or same size (sliding)
        maxLen = right - left + 1;   // can also use max() here
    }
    return maxLen;
}
// "ABAB", k=2  → 4 (replace both A's or both B's)
// "AABABBA", k=1 → 4`,python:`def character_replacement(s, k):
    cnt = [0] * 26
    left = max_freq = max_len = 0
    for right, c in enumerate(s):
        cnt[ord(c) - ord('A')] += 1
        max_freq = max(max_freq, cnt[ord(c) - ord('A')])
        if (right - left + 1) - max_freq > k:
            cnt[ord(s[left]) - ord('A')] -= 1
            left += 1
        max_len = right - left + 1
    return max_len`}}),e.jsx(x,{q:"In LC 76, why use a 'formed' counter instead of checking need == have directly?",a:"Checking need == have requires iterating over all distinct characters in need — O(|t|/26) per step, making the total O(|s| × |t|). The 'formed' counter reduces this to O(1) per step: we only update it when a character's count exactly meets (or drops below) its requirement. The optimization turns O(|s|×|t|) into O(|s| + |t|)."}),e.jsx(x,{q:"In LC 424, why is maxFreq never decremented, and why does this still give the correct answer?",a:"We want the LONGEST valid window, so we only extend maxLen when the window grows. maxFreq only increases when a character count exceeds the previous maximum — this means we've found a potentially longer valid window. When the window slides (invalid), maxFreq might be 'stale' (slightly too high for the current window), but the window size stays constant. We'd only update maxLen if the window grows, which requires a new maxFreq anyway. The staleness means we slide (not shrink), never incorrectly extend."})]})}function V(){return e.jsxs("div",{children:[e.jsx(p,{color:"purple",icon:"ti-tournament",children:"8 problems — 4 sliding window, 4 two pointers. All are high-frequency FAANG interview questions. The hardest (LC 76, LC 42) have multiple approaches shown."}),e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",letterSpacing:"0.08em",marginBottom:10,marginTop:4},children:"SLIDING WINDOW"}),e.jsx(g,{num:1,title:"Longest Substring Without Repeating Characters",difficulty:"LC Medium",tags:["LC 3","Variable Window"],statement:"Given a string <code>s</code>, find the length of the <strong>longest substring without repeating characters</strong>.",constraints:["0 ≤ |s| ≤ 5×10⁴","s consists of English letters, digits, symbols, spaces"],examples:[{input:'s = "abcabcbb"',output:"3",note:'Substring "abc"'},{input:'s = "bbbbb"',output:"1",note:'Single "b"'},{input:'s = "pwwkew"',output:"3",note:'"wke"'}],approach:"Last-seen hashmap: store the last index of each character. When right encounters a duplicate that's inside the current window [left, right-1], jump left directly to last[c]+1. This avoids O(n) shrinking per step, keeping the total O(n). Update last[c] = right after each step.",code:{cpp:`int lengthOfLongestSubstring(string s) {
    unordered_map<char,int> last;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.size(); right++) {
        char c = s[right];
        if (last.count(c) && last[c] >= left)
            left = last[c] + 1;   // jump past duplicate
        last[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,python:`def length_of_longest_substring(s):
    last = {}; left = max_len = 0
    for right, c in enumerate(s):
        if c in last and last[c] >= left:
            left = last[c] + 1
        last[c] = right
        max_len = max(max_len, right - left + 1)
    return max_len`}}),e.jsx(g,{num:2,title:"Minimum Window Substring",difficulty:"LC Hard",tags:["LC 76","Freq Map Window"],statement:'Given strings <code>s</code> and <code>t</code>, return the <strong>minimum window substring</strong> of <code>s</code> such that every character in <code>t</code> (including duplicates) is included. Return <code>""</code> if no valid window exists.',constraints:["1 ≤ |s|, |t| ≤ 10⁵","s and t consist of uppercase/lowercase English letters"],examples:[{input:'s="ADOBECODEBANC", t="ABC"',output:'"BANC"'},{input:'s="a", t="a"',output:'"a"'},{input:'s="a", t="aa"',output:'""'}],approach:"Freq-map window with 'formed' counter. Expand right until all of t is covered (formed == required), then shrink left as much as possible while recording the minimum window. The 'formed' counter avoids re-scanning the need map on every step. O(|s|+|t|) time.",code:{cpp:`string minWindow(string s, string t) {
    unordered_map<char,int> need, have;
    for (char c : t) need[c]++;
    int formed = 0, required = need.size();
    int left = 0, minLen = INT_MAX, start = 0;
    for (int right = 0; right < s.size(); right++) {
        have[s[right]]++;
        if (need.count(s[right]) && have[s[right]] == need[s[right]]) formed++;
        while (formed == required) {
            if (right - left + 1 < minLen) { minLen = right-left+1; start = left; }
            have[s[left]]--;
            if (need.count(s[left]) && have[s[left]] < need[s[left]]) formed--;
            left++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(start, minLen);
}`,python:`from collections import defaultdict

def min_window(s, t):
  need = defaultdict(int)
  for c in t:
    need[c] += 1
  have = defaultdict(int)
  formed = 0
  required = len(need)
  left = 0
  min_len = float('inf')
  start = 0
  for right, c in enumerate(s):
    have[c] += 1
    if c in need and have[c] == need[c]:
      formed += 1
    while formed == required:
      if right - left + 1 < min_len:
        min_len, start = right - left + 1, left
      lc = s[left]
      have[lc] -= 1
      if lc in need and have[lc] < need[lc]:
        formed -= 1
      left += 1
  return s[start:start+min_len] if min_len != float('inf') else ""`}}),e.jsx(g,{num:3,title:"Longest Repeating Character Replacement",difficulty:"LC Medium",tags:["LC 424","Monotonic maxFreq"],statement:"Given a string <code>s</code> and integer <code>k</code>, you may replace any character at most <code>k</code> times. Return the length of the longest substring containing the same letter you can get after performing the replacements.",constraints:["1 ≤ |s| ≤ 10⁵","s consists of uppercase English letters","0 ≤ k ≤ |s|"],examples:[{input:'s="ABAB", k=2',output:"4",note:'Replace 2 A→B or 2 B→A → "AAAA" or "BBBB"'},{input:'s="AABABBA", k=1',output:"4",note:'"AABA" — replace one B'}],approach:"Window [left, right] is valid when (size - maxFreq) ≤ k. Use 'if' not 'while' to contract — we never shrink, we only slide. maxFreq is monotonically non-decreasing: we only care about windows larger than current best, which requires a higher maxFreq. This guarantees we never miss the optimal window.",code:{cpp:`int characterReplacement(string s, int k) {
    int cnt[26] = {}, left = 0, maxFreq = 0;
    for (int right = 0; right < s.size(); right++) {
        maxFreq = max(maxFreq, ++cnt[s[right]-'A']);
        if (right - left + 1 - maxFreq > k) cnt[s[left++]-'A']--;
    }
    return s.size() - left;  // final window size = n - left
}`,python:`def character_replacement(s, k):
    cnt = [0]*26; left = max_freq = 0
    for right, c in enumerate(s):
        cnt[ord(c)-65] += 1
        max_freq = max(max_freq, cnt[ord(c)-65])
        if right - left + 1 - max_freq > k:
            cnt[ord(s[left])-65] -= 1; left += 1
    return len(s) - left`}}),e.jsx(g,{num:4,title:"Fruit Into Baskets",difficulty:"LC Medium",tags:["LC 904","At Most 2 Distinct"],statement:"You have a row of fruit trees. <code>fruits[i]</code> is the type of fruit on tree <code>i</code>. You have two baskets, each holding only <strong>one type</strong> of fruit. Starting from any tree, pick fruits moving right. Each tree must go into one basket. Return the maximum number of fruits you can collect.",constraints:["1 ≤ n ≤ 10⁵","0 ≤ fruits[i] < n"],examples:[{input:"[1,2,1]",output:"3",note:"Entire array — 2 types"},{input:"[0,1,2,2]",output:"3",note:"[1,2,2]"},{input:"[1,2,3,2,2]",output:"4",note:"[2,3,2,2]"}],approach:"Longest subarray with at most 2 distinct values. Standard 'at most K distinct' variable window: maintain a frequency map (basket). When basket size > 2, shrink from left until valid. This is directly the atMostK(fruits, 2) problem.",code:{cpp:`int totalFruit(vector<int>& f) {
    unordered_map<int,int> b; int lo=0, res=0;
    for (int r = 0; r < f.size(); r++) {
        b[f[r]]++;
        while (b.size() > 2) {
            if (--b[f[lo]] == 0) b.erase(f[lo]); lo++;
        }
        res = max(res, r - lo + 1);
    }
    return res;
}`,python:`from collections import defaultdict
def total_fruit(f):
    b = defaultdict(int); lo = res = 0
    for r, v in enumerate(f):
        b[v] += 1
        while len(b) > 2:
            b[f[lo]] -= 1
            if b[f[lo]] == 0: del b[f[lo]]
            lo += 1
        res = max(res, r - lo + 1)
    return res`}}),e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",letterSpacing:"0.08em",marginBottom:10,marginTop:20},children:"TWO POINTERS"}),e.jsx(g,{num:5,title:"Container With Most Water",difficulty:"LC Medium",tags:["LC 11","Opposite Ends"],statement:"Given <code>n</code> non-negative integers <code>height</code> where each represents the height of a vertical line, find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water.",constraints:["2 ≤ n ≤ 10⁵","0 ≤ height[i] ≤ 10⁴"],examples:[{input:"[1,8,6,2,5,4,8,3,7]",output:"49",note:"Lines at index 1 (h=8) and 8 (h=7), width=7"},{input:"[1,1]",output:"1"}],approach:"Opposite-end two pointers. Water = min(h[lo],h[hi]) × (hi-lo). Always move the pointer with the smaller height — moving the taller one can only decrease both width and height. Each pointer move is provably discarding a dominated candidate. O(n) time, O(1) space.",code:{cpp:`int maxArea(vector<int>& h) {
    int lo = 0, hi = h.size()-1, res = 0;
    while (lo < hi) {
        res = max(res, min(h[lo], h[hi]) * (hi - lo));
        if (h[lo] <= h[hi]) lo++; else hi--;
    }
    return res;
}`,python:`def max_area(h):
    lo, hi, res = 0, len(h)-1, 0
    while lo < hi:
        res = max(res, min(h[lo],h[hi])*(hi-lo))
        if h[lo] <= h[hi]: lo += 1
        else: hi -= 1
    return res`}}),e.jsx(g,{num:6,title:"3Sum",difficulty:"LC Medium",tags:["LC 15","Sort + Two Pointers"],statement:"Given an integer array <code>nums</code>, return all unique triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i ≠ j ≠ k</code> and <code>nums[i] + nums[j] + nums[k] == 0</code>. The solution set must not contain duplicate triplets.",constraints:["3 ≤ n ≤ 3000","-10⁵ ≤ nums[i] ≤ 10⁵"],examples:[{input:"[-1,0,1,2,-1,-4]",output:"[[-1,-1,2],[-1,0,1]]"},{input:"[0,0,0]",output:"[[0,0,0]]"}],approach:"Sort the array. Fix pivot i (0..n-3), skip duplicate pivots. Run two pointers [i+1, n-1]: sum<0 → lo++, sum>0 → hi--, sum=0 → record + skip duplicate lo/hi values + lo++, hi--. O(n²) time, O(1) extra space (excluding output).",code:{cpp:`vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    int n = nums.size();
    for (int i = 0; i < n-2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int lo = i+1, hi = n-1;
        while (lo < hi) {
            int s = nums[i]+nums[lo]+nums[hi];
            if (s == 0) {
                res.push_back({nums[i],nums[lo],nums[hi]});
                while (lo<hi && nums[lo]==nums[lo+1]) lo++;
                while (lo<hi && nums[hi]==nums[hi-1]) hi--;
                lo++; hi--;
            } else if (s < 0) lo++;
            else hi--;
        }
    }
    return res;
}`,python:`def three_sum(nums):
    nums.sort(); res = []; n = len(nums)
    for i in range(n-2):
        if i > 0 and nums[i] == nums[i-1]: continue
        lo, hi = i+1, n-1
        while lo < hi:
            s = nums[i]+nums[lo]+nums[hi]
            if s == 0:
                res.append([nums[i],nums[lo],nums[hi]])
                while lo<hi and nums[lo]==nums[lo+1]: lo+=1
                while lo<hi and nums[hi]==nums[hi-1]: hi-=1
                lo+=1; hi-=1
            elif s < 0: lo+=1
            else: hi-=1
    return res`}}),e.jsx(g,{num:7,title:"Two Sum II — Input Array Is Sorted",difficulty:"OA Easy",tags:["LC 167","Sorted + Two Pointers"],statement:"Given a <strong>1-indexed</strong> sorted (non-decreasing) array <code>numbers</code> and target <code>target</code>, find two numbers that add to target. Return their 1-indexed positions. There is exactly one solution and you may not use the same element twice.",constraints:["2 ≤ n ≤ 3×10⁴","-1000 ≤ numbers[i] ≤ 1000","numbers sorted in non-decreasing order","O(1) extra space required"],examples:[{input:"numbers=[2,7,11,15], target=9",output:"[1,2]",note:"2+7=9"},{input:"numbers=[2,3,4], target=6",output:"[1,3]"},{input:"numbers=[-1,0], target=-1",output:"[1,2]"}],approach:"Classic two-pointer on sorted array. Lo starts at 0, hi at n-1. Sum < target: increment lo (need a larger value). Sum > target: decrement hi. Sum = target: return 1-indexed. Guaranteed O(n) worst case — at most n pointer moves total.",code:{cpp:`vector<int> twoSum(vector<int>& n, int t) {
    int lo = 0, hi = n.size()-1;
    while (lo < hi) {
        int s = n[lo]+n[hi];
        if      (s == t) return {lo+1, hi+1};
        else if (s  < t) lo++;
        else             hi--;
    }
    return {};
}`,python:`def two_sum_sorted(numbers, target):
    lo, hi = 0, len(numbers)-1
    while lo < hi:
        s = numbers[lo]+numbers[hi]
        if   s == target: return [lo+1, hi+1]
        elif s  < target: lo += 1
        else:             hi -= 1`}}),e.jsx(g,{num:8,title:"Trapping Rain Water",difficulty:"LC Hard",tags:["LC 42","Two Pointers O(1)"],statement:"Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",constraints:["1 ≤ n ≤ 2×10⁴","0 ≤ height[i] ≤ 10⁵"],examples:[{input:"[0,1,0,2,1,0,1,3,2,1,2,1]",output:"6"},{input:"[4,2,0,3,2,5]",output:"9"}],approach:"Two approaches shown. (1) O(n) space: precompute lmax[] and rmax[]; water[i] = min(lmax[i],rmax[i]) - h[i]. (2) O(1) space two-pointer: process whichever side has the smaller current boundary — we know that side's lmax/rmax is the true bottleneck. Move the smaller side inward.",code:{cpp:`// O(1) space — two pointer
int trap(vector<int>& h) {
    int lo=0, hi=h.size()-1, lmax=0, rmax=0, water=0;
    while (lo < hi) {
        if (h[lo] <= h[hi]) {
            lmax = max(lmax, h[lo]);
            water += lmax - h[lo]; lo++;
        } else {
            rmax = max(rmax, h[hi]);
            water += rmax - h[hi]; hi--;
        }
    }
    return water;
}

// O(n) space — prefix/suffix max (easier to understand)
int trapO_n(vector<int>& h) {
    int n = h.size();
    vector<int> lmax(n), rmax(n);
    lmax[0] = h[0];
    for (int i=1; i<n; i++) lmax[i] = max(lmax[i-1], h[i]);
    rmax[n-1] = h[n-1];
    for (int i=n-2; i>=0; i--) rmax[i] = max(rmax[i+1], h[i]);
    int water = 0;
    for (int i=1; i<n-1; i++) water += min(lmax[i],rmax[i]) - h[i];
    return water;
}`,python:`def trap(h):
    lo, hi = 0, len(h)-1
    lmax = rmax = water = 0
    while lo < hi:
        if h[lo] <= h[hi]:
            lmax = max(lmax, h[lo]); water += lmax - h[lo]; lo+=1
        else:
            rmax = max(rmax, h[hi]); water += rmax - h[hi]; hi-=1
    return water`}})]})}const K=[{id:"intuition",label:"Intuition & Templates"},{id:"sliding",label:"Sliding Window"},{id:"twopointers",label:"Two Pointers"},{id:"hard",label:"Hard Problems"},{id:"problems",label:"Problems"}];function U(){const[r,l]=S.useState("intuition"),t={intuition:e.jsx(E,{}),sliding:e.jsx($,{}),twopointers:e.jsx(D,{}),hard:e.jsx(H,{}),problems:e.jsx(V,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 05"}),e.jsx("h1",{className:"page-header-title",children:"Sliding Window & Two Pointers"}),e.jsx("p",{className:"page-header-subtitle",children:"Fixed & Variable Windows · Frequency Maps · Opposite-End Pointers · Sort + Two Pointers · LC 3 · 76 · 424 · 904 · 11 · 15 · 167 · 42"})]}),e.jsx(W,{tabs:K,active:r,onChange:l}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:t[r]}),e.jsx(O,{moduleId:5})]})}export{U as default};
