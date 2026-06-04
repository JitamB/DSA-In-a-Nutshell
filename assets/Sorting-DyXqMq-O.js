import{r as j,j as e}from"./index-D9jkHkZY.js";import{S as I,N as A,d as z,H as p,P as m,c as l,a as u,Q as y,T as R,V as O}from"./SectionNav-BHzhBu3R.js";const C=[5,3,8,1,4,2];function _(n,d){const r=[...n],g=[],s=(i=null,t=!1,o=0,h=null,x=null)=>g.push({arr:[...r],compare:i,swap:t,sortedEnd:o,minAt:h,keyAt:x});if(s(null,!1,0),d==="bubble")for(let i=0;i<r.length-1;i++)for(let t=0;t<r.length-1-i;t++)r[t]>r[t+1]?([r[t],r[t+1]]=[r[t+1],r[t]],s([t,t+1],!0,r.length-i)):s([t,t+1],!1,r.length-i);else if(d==="selection")for(let i=0;i<r.length-1;i++){let t=i;for(let o=i+1;o<r.length;o++)s([t,o],!1,i,t),r[o]<r[t]&&(t=o);[r[i],r[t]]=[r[t],r[i]],s(null,t!==i,i+1,null)}else if(d==="insertion")for(let i=1;i<r.length;i++){let t=i;for(;t>0&&r[t-1]>r[t];)[r[t-1],r[t]]=[r[t],r[t-1]],s([t-1,t],!0,i+1,null,t-1),t--;s(t>0?[t-1,t]:null,!1,i+1,null,t)}return s(null,!1,r.length),g}const M=_(C,"bubble"),L=_(C,"selection"),B=_(C,"insertion"),T=[10,80,30,90,40,50,70],w=[{arr:[10,80,30,90,40,50,70],i:-1,j:-1,action:"init",desc:"pivot = arr[n-1] = 70, i = −1 (boundary pointer), j scans left to right"},{arr:[10,80,30,90,40,50,70],i:0,j:0,action:"lte",desc:"arr[0]=10 ≤ 70 → i=0, swap(arr[0],arr[0]) — no visible change"},{arr:[10,80,30,90,40,50,70],i:0,j:1,action:"gt",desc:"arr[1]=80 > 70 → skip"},{arr:[10,30,80,90,40,50,70],i:1,j:2,action:"lte",desc:"arr[2]=30 ≤ 70 → i=1, swap(arr[1],arr[2])"},{arr:[10,30,80,90,40,50,70],i:1,j:3,action:"gt",desc:"arr[3]=90 > 70 → skip"},{arr:[10,30,40,90,80,50,70],i:2,j:4,action:"lte",desc:"arr[4]=40 ≤ 70 → i=2, swap(arr[2],arr[4])"},{arr:[10,30,40,50,80,90,70],i:3,j:5,action:"lte",desc:"arr[5]=50 ≤ 70 → i=3, swap(arr[3],arr[5])"},{arr:[10,30,40,50,70,90,80],i:4,j:6,action:"place",desc:"Loop done. Place pivot: swap(arr[i+1]=arr[4], arr[n-1]=arr[6])"},{arr:[10,30,40,50,70,90,80],i:4,j:6,action:"done",desc:"Pivot 70 at index 4. Left [10,30,40,50] ≤ 70 ✓  Right [90,80] ≥ 70 ✓"}],k=[{arr:[2,0,2,1,1,0],lo:0,mid:0,hi:5,action:"init",desc:"lo=0, mid=0, hi=5. Invariant: [0..lo-1]=0s, [lo..mid-1]=1s, [hi+1..n-1]=2s"},{arr:[0,0,2,1,1,2],lo:0,mid:0,hi:4,action:"two",desc:"arr[mid]=2 → swap(arr[0],arr[5]) → hi--"},{arr:[0,0,2,1,1,2],lo:1,mid:1,hi:4,action:"zero",desc:"arr[mid]=0 → swap(arr[lo],arr[mid]) → lo++, mid++"},{arr:[0,0,2,1,1,2],lo:2,mid:2,hi:4,action:"zero",desc:"arr[mid]=0 → swap(arr[lo],arr[mid]) → lo++, mid++"},{arr:[0,0,1,1,2,2],lo:2,mid:2,hi:3,action:"two",desc:"arr[mid]=2 → swap(arr[2],arr[4]) → hi--"},{arr:[0,0,1,1,2,2],lo:2,mid:3,hi:3,action:"one",desc:"arr[mid]=1 → mid++"},{arr:[0,0,1,1,2,2],lo:2,mid:4,hi:3,action:"done",desc:"mid(4) > hi(3) → complete!  [0,0,1,1,2,2] ✓"}],b=[{stage:"orig",active:[[5,3,8,4]],highlight:null,desc:"Input: [5,3,8,4]"},{stage:"split1",active:[[5,3],[8,4]],highlight:"split",desc:"Divide: [5,3] | [8,4]  ← split at midpoint"},{stage:"split2l",active:[[5],[3]],highlight:"split",desc:"Divide left: [5] | [3]"},{stage:"merge2l",active:[[5],[3]],result:[3,5],highlight:"merge",desc:"Merge [5]+[3] → compare 5 vs 3 → [3,5]"},{stage:"split2r",active:[[8],[4]],highlight:"split",desc:"Divide right: [8] | [4]"},{stage:"merge2r",active:[[8],[4]],result:[4,8],highlight:"merge",desc:"Merge [8]+[4] → compare 8 vs 4 → [4,8]"},{stage:"mergef",active:[[3,5],[4,8]],result:[3,4,5,8],highlight:"merge",desc:"Final merge: [3,5]+[4,8] → step through min comparisons → [3,4,5,8]"},{stage:"done",active:[[3,4,5,8]],highlight:"done",desc:"Sorted! [3,4,5,8]  ← O(n log n) regardless of input"}];function N(){const[n,d]=j.useState("bubble"),[r,g]=j.useState(0),i={bubble:M,selection:L,insertion:B}[n],t=i[Math.min(r,i.length-1)],o=Math.max(...C);i[i.length-1].swap===!1&&i.filter(a=>a.swap).length;const h=a=>{d(a),g(0)},x=a=>{var f,c,v;return t.sortedEnd>0&&a<t.sortedEnd&&!((f=t.compare)!=null&&f.includes(a))?"success":t.swap&&((c=t.compare)!=null&&c.includes(a))?"warning":!t.swap&&((v=t.compare)!=null&&v.includes(a))?"info":t.minAt===a?"warning":null};return e.jsxs(O,{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:14},children:[[["bubble","Bubble Sort"],["selection","Selection Sort"],["insertion","Insertion Sort"]].map(([a,f])=>e.jsx("button",{onClick:()=>h(a),style:{padding:"5px 12px",border:"1px solid",borderColor:n===a?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:n===a?"var(--color-background-info)":"transparent",color:n===a?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)"},children:f},a)),e.jsx("div",{style:{marginLeft:"auto",display:"flex",gap:16,alignItems:"center",fontSize:11,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:e.jsxs("span",{children:["steps: ",e.jsx("strong",{style:{color:"var(--color-text-secondary)"},children:i.length})]})})]}),e.jsx("div",{style:{display:"flex",gap:6,alignItems:"flex-end",height:88,marginBottom:14,justifyContent:"center"},children:t.arr.map((a,f)=>{const c=x(f),v=Math.max(8,a/o*72);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("span",{style:{fontSize:10,fontFamily:"var(--font-mono)",color:c?`var(--color-text-${c})`:"var(--color-text-tertiary)",fontWeight:c?700:400,minWidth:14,textAlign:"center"},children:a}),e.jsx("div",{style:{width:34,height:v,borderRadius:"4px 4px 0 0",border:"1px solid",borderColor:c?`var(--color-border-${c})`:"var(--color-border-secondary)",background:c?`var(--color-background-${c})`:"var(--color-background-secondary)",transition:"all 0.15s"}}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",f,"]"]})]},f)})}),e.jsx("div",{style:{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"},children:[{c:"info",l:"Comparing"},{c:"warning",l:t.minAt!==null?"Current min / swap":"Swapped / shifting"},{c:"success",l:"Sorted"}].map(({c:a,l:f})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:11},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:2,background:`var(--color-background-${a})`,border:`1px solid var(--color-border-${a})`}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f})]},a))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>g(Math.max(0,r-1)),disabled:r===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===0?"not-allowed":"pointer",fontSize:12,opacity:r===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:72,textAlign:"center",alignSelf:"center"},children:[r+1," / ",i.length]}),e.jsx("button",{onClick:()=>g(Math.min(i.length-1,r+1)),disabled:r===i.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:r===i.length-1?"not-allowed":"pointer",fontSize:12,opacity:r===i.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>g(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>g(i.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function F(){const[n,d]=j.useState(0),r=w[n],s=T.length-1,i=t=>t===s?"warning":r.action==="done"&&t===r.i?"success":r.compare&&(t===r.compare[0]||t===r.compare[1])&&r.swap?"warning":r.j>=0&&t===r.j&&r.action!=="place"&&r.action!=="done"?"info":r.i>=0&&t<=r.i&&t!==s?"success":r.j>0&&t>r.i&&t<r.j?"danger":null;return e.jsxs(O,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:r.desc}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:14,justifyContent:"center"},children:r.arr.map((t,o)=>{const h=i(o);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:h?`var(--color-border-${h})`:"var(--color-border-secondary)",background:h?`var(--color-background-${h})`:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:h?700:400,color:h?`var(--color-text-${h})`:"var(--color-text-secondary)",transition:"all 0.18s"},children:t}),e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:o===r.j?"var(--color-text-info)":o===r.i?"var(--color-text-success)":o===s?"var(--color-text-warning)":"var(--color-text-tertiary)"},children:o===s?"pvt":o===r.j&&r.action!=="done"?"j":o===r.i&&r.action!=="done"?"i":o})]},o)})}),e.jsx("div",{style:{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",fontSize:11},children:[{c:"success",l:"≤ pivot region (i boundary)"},{c:"info",l:"j (scanning)"},{c:"danger",l:"> pivot region"},{c:"warning",l:"pivot / swap"}].map(({c:t,l:o})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[e.jsx("div",{style:{width:9,height:9,borderRadius:2,background:`var(--color-background-${t})`,border:`1px solid var(--color-border-${t})`}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:o})]},t))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>d(Math.max(0,n-1)),disabled:n===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n===0?"not-allowed":"pointer",fontSize:12,opacity:n===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[n+1,"/",w.length]}),e.jsx("button",{onClick:()=>d(Math.min(w.length-1,n+1)),disabled:n===w.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n===w.length-1?"not-allowed":"pointer",fontSize:12,opacity:n===w.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>d(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function P(){const[n,d]=j.useState(0),r=b[n],g=({arr:s,color:i="secondary"})=>e.jsx("div",{style:{display:"flex",gap:3},children:s.map((t,o)=>e.jsx("div",{style:{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,border:"1px solid",borderColor:`var(--color-border-${i})`,background:`var(--color-background-${i})`,fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:`var(--color-text-${i})`},children:t},o))});return e.jsxs(O,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:r.desc}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:12,marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em",textAlign:"center"},children:r.highlight==="split"?"SPLIT":r.highlight==="merge"?"MERGING":r.highlight==="done"?"SORTED":"INPUT"}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[r.active.map((s,i)=>e.jsx(g,{arr:s,color:r.highlight==="split"?i===0?"info":"warning":r.highlight==="done"?"success":"secondary"},i)),r.active.length>1&&e.jsx("span",{style:{fontSize:12,color:"var(--color-text-tertiary)",fontFamily:"var(--font-mono)"},children:r.highlight==="split"?"← divide":"← merge"})]})]}),r.result&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{fontSize:16,color:"var(--color-text-tertiary)"},children:"↓"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:6,letterSpacing:"0.06em",textAlign:"center"},children:"MERGED OUTPUT"}),e.jsx(g,{arr:r.result,color:"success"})]})]})]}),e.jsx("div",{style:{display:"flex",gap:4,justifyContent:"center",marginBottom:14},children:b.map((s,i)=>e.jsx("div",{onClick:()=>d(i),style:{width:8,height:8,borderRadius:"50%",background:i===n?"var(--color-text-info)":i<n?"var(--color-border-success)":"var(--color-border-tertiary)",cursor:"pointer",transition:"all 0.15s"}},i))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>d(Math.max(0,n-1)),disabled:n===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n===0?"not-allowed":"pointer",fontSize:12,opacity:n===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[n+1,"/",b.length]}),e.jsx("button",{onClick:()=>d(Math.min(b.length-1,n+1)),disabled:n===b.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n===b.length-1?"not-allowed":"pointer",fontSize:12,opacity:n===b.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>d(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function q(){const[n,d]=j.useState(0),r=k[n],g={0:"success",1:"info",2:"warning"},s=i=>(r.action,g[r.arr[i]]||"secondary");return e.jsxs(O,{children:[e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",lineHeight:1.55},children:r.desc}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:2,justifyContent:"center"},children:r.arr.map((i,t)=>{const o=t===r.lo&&r.action!=="done",h=t===r.mid&&r.action!=="done",x=t===r.hi&&r.action!=="done";return e.jsx("div",{style:{width:40,height:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8.5,fontFamily:"var(--font-mono)",color:o?"var(--color-text-success)":h?"var(--color-text-info)":x?"var(--color-text-warning)":"transparent",fontWeight:700},children:o&&h?"lo=mid":o?"lo":h?"mid":x?"hi":""},t)})}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:14,justifyContent:"center"},children:r.arr.map((i,t)=>{const o=s(t),h=t===r.lo&&r.action!=="done",x=t===r.mid&&r.action!=="done",a=t===r.hi&&r.action!=="done",f=h||x||a;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx("div",{style:{width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:`${f?2:1}px solid`,borderColor:`var(--color-border-${o})`,background:`var(--color-background-${o})`,fontFamily:"var(--font-mono)",fontSize:15,fontWeight:700,color:`var(--color-text-${o})`,transition:"all 0.18s"},children:i}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",t,"]"]})]},t)})}),r.action!=="done"&&e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",textAlign:"center",marginBottom:12},children:[e.jsxs("span",{style:{color:"var(--color-text-success)"},children:["0..",r.lo-1]})," = 0s sorted  ·",e.jsxs("span",{style:{color:"var(--color-text-info)"},children:[" ",r.lo,"..",r.mid-1]})," = 1s sorted  ·",e.jsxs("span",{style:{color:"var(--color-text-tertiary)"},children:[" ",r.mid,"..",r.hi]})," = unknown  ·",e.jsxs("span",{style:{color:"var(--color-text-warning)"},children:[" ",r.hi+1,"..",r.arr.length-1]})," = 2s sorted"]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[e.jsx("button",{onClick:()=>d(Math.max(0,n-1)),disabled:n===0,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n===0?"not-allowed":"pointer",fontSize:12,opacity:n===0?.4:1},children:"← Prev"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[n+1,"/",k.length]}),e.jsx("button",{onClick:()=>d(Math.min(k.length-1,n+1)),disabled:n===k.length-1,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:n===k.length-1?"not-allowed":"pointer",fontSize:12,opacity:n===k.length-1?.4:1},children:"Next →"}),e.jsx("button",{onClick:()=>d(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const W={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function S({num:n,title:d,difficulty:r,tags:g=[],statement:s,constraints:i=[],examples:t=[],approach:o,code:h}){const[x,a]=j.useState(!1),f=W[r]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",n]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:d})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[g.map(c=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:c},c)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${f})`,color:`var(--color-text-${f})`,border:`1px solid var(--color-border-${f})`},children:r})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:s}}),i.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:i.map((c,v)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:c},v))})]}),t.length>0&&e.jsx("div",{style:{marginBottom:14},children:t.map((c,v)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",v+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:c.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:c.output})]}),c.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:c.note})]},v))}),e.jsxs("button",{onClick:()=>a(!x),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:x?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${x?"eye-off":"bulb"}`}),x?"Hide Solution":"Show Approach & Solution"]}),x&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),o]}),e.jsx(u,{children:h})]})]})]})}function D(){return e.jsxs("div",{children:[e.jsxs(z,{color:"info",icon:"ti-arrows-sort",children:["Comparison-based sorts determine order by comparing element pairs. They cannot beat ",e.jsx(l,{children:"O(n \\log n)"})," in the worst case — proven via the decision tree lower bound (at least ",e.jsx(l,{children:"\\log_2(n!)"})," comparisons required). Step through each algorithm below on ",e.jsx(l,{children:"[5,3,8,1,4,2]"}),"."]}),e.jsx(N,{}),e.jsx(p,{children:"Bubble Sort — Sinking the Heaviest"}),e.jsxs(m,{children:['Repeatedly scan the array, swapping adjacent elements when out of order. Each pass "bubbles" the largest unsorted element to its final position. The ',e.jsx("strong",{children:"early exit optimization"})," (if no swap occurred in a pass, array is sorted) gives O(n) best case on already-sorted input."]}),e.jsx(u,{children:{cpp:`void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;    // early exit: already sorted
    }
}
// Stable ✓  |  Best O(n) with early exit  |  Worst/Average O(n²)`,python:`def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]; swapped = True
        if not swapped: break   # early exit`}}),e.jsx(p,{children:"Selection Sort — Finding the Minimum"}),e.jsxs(m,{children:["Divide the array into sorted (left) and unsorted (right) halves. Find the minimum element in the unsorted half and swap it to the boundary. Always makes exactly ",e.jsx(l,{children:"n-1"})," swaps — useful when writes are expensive. ",e.jsx("strong",{children:"Not stable"})," — can swap equal elements past each other."]}),e.jsx(u,{children:{cpp:`void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        if (minIdx != i) swap(arr[i], arr[minIdx]);
    }
}
// Not stable ✗  |  Always O(n²)  |  Exactly n-1 swaps`,python:`def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]: min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`}}),e.jsx(p,{children:"Insertion Sort — Building the Sorted Sublist"}),e.jsx(m,{children:"Maintain a sorted prefix. For each new element, find its correct position in the prefix by shifting larger elements rightward. Naturally adaptive — O(n) on nearly-sorted data. Online — can sort elements as they arrive. Preferred for small arrays (n < 30) or as the base case in hybrid sorts (TimSort, IntroSort)."}),e.jsx(u,{children:{cpp:`void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];  // shift right (no swap — fewer writes)
            j--;
        }
        arr[j + 1] = key;         // place key in correct position
    }
}
// Stable ✓  |  Best O(n) on sorted input  |  Worst O(n²)`,python:`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key, j = arr[i], i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]; j -= 1
        arr[j + 1] = key`}}),e.jsx(p,{children:"Sorting Algorithm Master Table"}),e.jsx(R,{heads:["Algorithm","Best","Average","Worst","Space","Stable?"],rows:[["Bubble Sort","O(n)","O(n²)","O(n²)","O(1)","✓ Yes"],["Selection Sort","O(n²)","O(n²)","O(n²)","O(1)","✗ No"],["Insertion Sort","O(n)","O(n²)","O(n²)","O(1)","✓ Yes"],["Quick Sort","O(n log n)","O(n log n)","O(n²)","O(log n)","✗ No"],["Merge Sort","O(n log n)","O(n log n)","O(n log n)","O(n)","✓ Yes"],["Heap Sort","O(n log n)","O(n log n)","O(n log n)","O(1)","✗ No"],["Counting Sort","O(n+k)","O(n+k)","O(n+k)","O(n+k)","✓ Yes"],["Radix Sort","O(d·(n+k))","O(d·(n+k))","O(d·(n+k))","O(n+k)","✓ Yes"],["Bucket Sort","O(n+k)","O(n+k)","O(n²)","O(n)","✓ Yes"],["Shell Sort","O(n log n)","O(n^1.3)","O(n²)","O(1)","✗ No"]]}),e.jsx(y,{q:"What is the difference between Bubble Sort and Insertion Sort — they both have O(n²) average. Why is Insertion better in practice?",a:"Both are O(n²) average, but Insertion Sort's constant factors are significantly smaller. (1) Insertion Sort uses <em>shifts</em> (one write per displaced element), while Bubble Sort uses <em>swaps</em> (three writes per swap). (2) Insertion Sort stops early per element once the correct position is found, while Bubble Sort always completes a full inner pass. (3) On nearly-sorted data, Insertion Sort adapts to O(n) while Bubble Sort (without optimization) remains O(n²). In benchmarks, Insertion Sort is typically 2–4× faster than Bubble Sort."}),e.jsx(y,{q:"What does 'stable' mean in sorting, and why does it matter?",a:"A sort is stable if elements with equal keys appear in the same relative order in the output as in the input. Example: sorting [{name:'Alice', age:30}, {name:'Bob', age:25}, {name:'Carol', age:30}] by age: a stable sort produces Bob, Alice, Carol (Alice before Carol, preserving original order). An unstable sort might produce Bob, Carol, Alice. Stability matters when sorting by multiple criteria (sort by department, then by salary — you need stable sort for the second key to preserve the first key's order)."})]})}function E(){return e.jsxs("div",{children:[e.jsx(p,{children:"Quick Sort — Partition-Based"}),e.jsx(m,{children:"Choose a pivot, partition elements into ≤ pivot and ≥ pivot halves, then recursively sort each half. The partition step is O(n) and in-place — no extra array needed. Worst case O(n²) on already-sorted input with a bad pivot (fixed by random pivot or median-of-three)."}),e.jsx(p,{children:"Lomuto Partition — Step Through"}),e.jsxs(m,{children:["One pointer ",e.jsx(l,{children:"i"})," marks the boundary of the ≤ region; pointer ",e.jsx(l,{children:"j"})," scans forward. When ",e.jsx(l,{children:"arr[j] \\leq pivot"}),", expand the ≤ region by swapping with the boundary. After the scan, place pivot at ",e.jsx(l,{children:"i+1"}),". Simple to implement but slightly less efficient than Hoare's."]}),e.jsx(F,{}),e.jsx(u,{children:{cpp:`int lomutoPartition(vector<int>& arr, int lo, int hi) {
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[hi]);   // place pivot
    return i + 1;                // pivot's final index
}

void quickSort(vector<int>& arr, int lo = 0, int hi = -1) {
    if (hi == -1) hi = arr.size() - 1;
    if (lo >= hi) return;
    int pi = lomutoPartition(arr, lo, hi);
    quickSort(arr, lo, pi - 1);
    quickSort(arr, pi + 1, hi);
}`,python:`import random

def lomuto_partition(arr, lo, hi):
    pivot, i = arr[hi], lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1; arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[hi] = arr[hi], arr[i + 1]
    return i + 1

def quick_sort(arr, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo >= hi: return
    pi = lomuto_partition(arr, lo, hi)
    quick_sort(arr, lo, pi - 1); quick_sort(arr, pi + 1, hi)`}}),e.jsx(p,{children:"Hoare Partition — Two Converging Pointers"}),e.jsx(m,{children:"Two pointers start at opposite ends and move inward, swapping misplaced elements. Generally makes 3× fewer swaps than Lomuto. Pivot ends up somewhere inside the partition (not necessarily at the returned index), so recursion calls must be adjusted."}),e.jsx(u,{children:{cpp:`int hoarePartition(vector<int>& arr, int lo, int hi) {
    int pivot = arr[lo];  // or median-of-three
    int i = lo - 1, j = hi + 1;
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        swap(arr[i], arr[j]);
    }
}
// Note: recurse on [lo, p] and [p+1, hi] — pivot NOT at p necessarily`,python:`def hoare_partition(arr, lo, hi):
    pivot, i, j = arr[lo], lo - 1, hi + 1
    while True:
        i += 1
        while arr[i] < pivot: i += 1
        j -= 1
        while arr[j] > pivot: j -= 1
        if i >= j: return j
        arr[i], arr[j] = arr[j], arr[i]`}}),e.jsx(p,{children:"QuickSelect — Kth Smallest in O(n) Average"}),e.jsxs(m,{children:["Like Quick Sort but only recurse into the half containing the ",e.jsx(l,{children:"k"}),"-th smallest element. Expected O(n) time because the partition discards half the remaining elements on average. Worst case O(n²) with bad pivots — randomize to avoid."]}),e.jsx(u,{children:{cpp:`// Returns k-th smallest (1-indexed) in average O(n), O(n²) worst
int quickSelect(vector<int>& arr, int lo, int hi, int k) {
    if (lo == hi) return arr[lo];
    int pi = lomutoPartition(arr, lo, hi);
    int rank = pi - lo + 1;       // rank of pivot within [lo..hi]
    if      (k == rank) return arr[pi];
    else if (k <  rank) return quickSelect(arr, lo, pi - 1, k);
    else                return quickSelect(arr, pi + 1, hi, k - rank);
}
// kthSmallest(arr, 1, n-1, 3) → 3rd smallest element`,python:`def quick_select(arr, lo, hi, k):
    if lo == hi: return arr[lo]
    pi = lomuto_partition(arr, lo, hi)
    rank = pi - lo + 1
    if   k == rank: return arr[pi]
    elif k <  rank: return quick_select(arr, lo, pi - 1, k)
    else:           return quick_select(arr, pi + 1, hi, k - rank)`}}),e.jsx(p,{children:"Merge Sort — Guaranteed O(n log n)"}),e.jsx(m,{children:"Recursively divide the array in half, sort each half, then merge the two sorted halves in O(n). No worst case — always O(n log n). Preferred when stability is required or for linked lists (no random access needed for merge). The cost: O(n) auxiliary space."}),e.jsx(P,{}),e.jsx(u,{children:{cpp:`void merge(vector<int>& arr, int lo, int mid, int hi) {
    vector<int> tmp(hi - lo + 1);
    int i = lo, j = mid + 1, k = 0;
    while (i <= mid && j <= hi)
        tmp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];  // ≤ preserves stability
    while (i <= mid) tmp[k++] = arr[i++];
    while (j <= hi)  tmp[k++] = arr[j++];
    for (int x = 0; x < k; x++) arr[lo + x] = tmp[x];
}

void mergeSort(vector<int>& arr, int lo = 0, int hi = -1) {
    if (hi == -1) hi = arr.size() - 1;
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}`,python:`def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    L, R = merge_sort(arr[:mid]), merge_sort(arr[mid:])
    result = []; i = j = 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: result.append(L[i]); i += 1   # ≤ preserves stability
        else: result.append(R[j]); j += 1
    return result + L[i:] + R[j:]`}}),e.jsx(p,{children:"Counting Inversions — Merge Sort Application"}),e.jsxs(m,{children:["An ",e.jsx("em",{children:"inversion"})," is a pair ",e.jsx(l,{children:"(i, j)"})," where ",e.jsx(l,{children:"i < j"})," but ",e.jsx(l,{children:"arr[i] > arr[j]"}),". Count all inversions during the merge step: when a right-half element is placed before left-half elements, it forms inversions with all remaining left-half elements."]}),e.jsx(u,{children:{cpp:`long long mergeCount(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return 0;
    int mid = lo + (hi - lo) / 2;
    long long inv = mergeCount(arr, lo, mid) + mergeCount(arr, mid + 1, hi);
    vector<int> tmp; int i = lo, j = mid + 1;
    while (i <= mid && j <= hi) {
        if (arr[i] <= arr[j]) { tmp.push_back(arr[i++]); }
        else {
            inv += (mid - i + 1);   // all remaining left elements form inversions with arr[j]
            tmp.push_back(arr[j++]);
        }
    }
    while (i <= mid) tmp.push_back(arr[i++]);
    while (j <= hi)  tmp.push_back(arr[j++]);
    for (int k = 0; k < tmp.size(); k++) arr[lo + k] = tmp[k];
    return inv;
}
// [2,4,1,3,5] → inversions: (2,1),(4,1),(4,3) → 3`,python:`def merge_count(arr):
    if len(arr) <= 1: return arr, 0
    mid = len(arr) // 2
    L, lc = merge_count(arr[:mid])
    R, rc = merge_count(arr[mid:])
    merged, inv, i, j = [], lc + rc, 0, 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: merged.append(L[i]); i += 1
        else:
            inv += len(L) - i   # all of L[i:] form inversions with R[j]
            merged.append(R[j]); j += 1
    return merged + L[i:] + R[j:], inv`}}),e.jsx(y,{q:"Why is Quick Sort faster than Merge Sort in practice despite the same O(n log n) average?",a:"(1) <strong>Cache efficiency:</strong> Quick Sort works in-place — good cache locality as it accesses contiguous memory. Merge Sort's temporary array causes cache misses. (2) <strong>No extra allocation:</strong> Quick Sort needs O(log n) stack; Merge Sort needs O(n) heap allocation per merge. (3) <strong>Constant factors:</strong> Quick Sort's inner loop is tight. (4) Quick Sort is typically 2–3× faster empirically for arrays that fit in cache. The choice: Quick Sort for arrays, Merge Sort when stability is required or for linked lists."}),e.jsx(y,{q:"What causes Quick Sort's O(n²) worst case and how do we prevent it?",a:"The worst case occurs when every partition is maximally unbalanced — e.g., always choosing the smallest or largest element as pivot on an already-sorted array. Fixes: (1) <strong>Random pivot:</strong> pick a random element as pivot, reducing worst-case probability to astronomically small. (2) <strong>Median-of-three:</strong> take the median of arr[lo], arr[mid], arr[hi] — eliminates the sorted-array worst case. (3) <strong>Intro Sort</strong> (C++ std::sort): uses Quick Sort but falls back to Heap Sort if recursion depth exceeds 2 log n, guaranteeing O(n log n) worst case."})]})}function G(){return e.jsxs("div",{children:[e.jsxs(z,{color:"success",icon:"ti-trending-down",children:[e.jsx("strong",{children:"Lower bound for comparison sorting:"})," Any comparison-based sort requires at least ",e.jsx(l,{children:"\\lceil \\log_2(n!) \\rceil \\approx n \\log_2 n - 1.44n"})," comparisons in the worst case (by decision tree argument). To beat this bound, we must use information beyond comparisons — e.g., the value or digit structure of elements."]}),e.jsx(p,{children:"Counting Sort — O(n + k)"}),e.jsxs(m,{children:["Works on integers in a known range ",e.jsx(l,{children:"[0, k-1]"}),". Count element frequencies, compute prefix sums to find final positions, then place elements in a stable O(n) output scan. ",e.jsx("strong",{children:"Stable and exact"})," — no comparisons. Not suitable when k is large relative to n."]}),e.jsx(u,{children:{cpp:`vector<int> countingSort(vector<int>& arr, int k) {
    vector<int> count(k, 0);
    for (int x : arr) count[x]++;

    // Prefix sum: count[i] = number of elements ≤ i
    for (int i = 1; i < k; i++) count[i] += count[i - 1];

    // Build output in reverse (stable: preserves original order of equal elements)
    vector<int> out(arr.size());
    for (int i = arr.size() - 1; i >= 0; i--) {
        out[--count[arr[i]]] = arr[i];
    }
    return out;
}
// [4,2,2,8,3,3,1] with k=9 → [1,2,2,3,3,4,8]  — O(n+k) time, O(n+k) space`,python:`def counting_sort(arr, k):
    count = [0] * k
    for x in arr: count[x] += 1
    for i in range(1, k): count[i] += count[i-1]
    out = [0] * len(arr)
    for x in reversed(arr):   # reverse for stability
        count[x] -= 1; out[count[x]] = x
    return out`}}),e.jsx(p,{children:"Radix Sort — Sort by Digits, LSD to MSD"}),e.jsxs(m,{children:["Sort integers digit by digit from ",e.jsx("em",{children:"least significant"})," to ",e.jsx("em",{children:"most significant"}),". Use a stable sort (counting sort) for each digit pass. After d passes (d = number of digits), the array is fully sorted. O(d × (n + k)) where k is the radix (typically 10 or 256)."]}),e.jsx(u,{children:{cpp:`void radixSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    // Process each digit position (1s, 10s, 100s, …)
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        vector<int> count(10, 0), out(arr.size());
        for (int x : arr) count[(x / exp) % 10]++;
        for (int i = 1; i < 10; i++) count[i] += count[i - 1];
        for (int i = arr.size() - 1; i >= 0; i--) {   // reverse for stability
            out[--count[(arr[i] / exp) % 10]] = arr[i];
        }
        arr = out;
    }
}
// [170,45,75,90,802,24,2,66] → one pass per digit position → [2,24,45,66,75,90,170,802]`,python:`def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        buckets = [[] for _ in range(10)]
        for x in arr: buckets[(x // exp) % 10].append(x)
        arr = [x for b in buckets for x in b]
        exp *= 10
    return arr`}}),e.jsx(p,{children:"Bucket Sort — O(n) for Uniform Data"}),e.jsxs(m,{children:["Distribute elements into ",e.jsx(l,{children:"n"})," equal-width buckets. Sort each bucket (typically with insertion sort — small size). Concatenate. Works best when input is uniformly distributed over a known range. Expected O(n) when elements are uniform — each bucket gets O(1) elements on average."]}),e.jsx(u,{children:{cpp:`void bucketSort(vector<float>& arr) {
    int n = arr.size();
    vector<vector<float>> buckets(n);

    for (float x : arr)
        buckets[(int)(n * x)].push_back(x);    // assumes x in [0, 1)

    for (auto& b : buckets)
        sort(b.begin(), b.end());               // insertion sort preferred for small b

    int idx = 0;
    for (auto& b : buckets)
        for (float x : b) arr[idx++] = x;
}
// [0.78, 0.17, 0.39, 0.26, 0.72, 0.94] → expected O(n)`,python:`def bucket_sort(arr):
    n = len(arr); buckets = [[] for _ in range(n)]
    for x in arr: buckets[int(n * x)].append(x)  # assumes [0, 1)
    return [x for b in buckets for x in sorted(b)]`}}),e.jsx(p,{children:"Shell Sort — Insertion Sort with Shrinking Gaps"}),e.jsx(m,{children:"Apply insertion sort with decreasing gap sequences. Large gaps quickly bring elements close to their final positions; small gaps then do fine-tuning. With Hibbard's gap sequence (1, 3, 7, 15, …), worst case is O(n^1.5). In practice, a simple [n/2, n/4, …, 1] sequence still outperforms O(n²) algorithms."}),e.jsx(u,{children:{cpp:`void shellSort(vector<int>& arr) {
    int n = arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Gapped insertion sort
        for (int i = gap; i < n; i++) {
            int tmp = arr[i], j = i;
            while (j >= gap && arr[j - gap] > tmp) {
                arr[j] = arr[j - gap]; j -= gap;
            }
            arr[j] = tmp;
        }
    }
}
// Gap sequence n/2, n/4, … , 1 — worst case O(n²), typical O(n^1.3)`,python:`def shell_sort(arr):
    n = len(arr); gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            tmp, j = arr[i], i
            while j >= gap and arr[j - gap] > tmp:
                arr[j] = arr[j - gap]; j -= gap
            arr[j] = tmp
        gap //= 2`}}),e.jsx(p,{children:"When to Use Each"}),e.jsx(R,{heads:["Algorithm","Best Use Case","Avoid When"],rows:[["Counting Sort","Small integer range [0..k], k ≪ n × log n","k is huge (e.g., 10⁹ key space)"],["Radix Sort","Large integers with bounded digits; fixed-length strings","Variable-length data, large d×k overhead"],["Bucket Sort","Floats uniformly distributed in [0, 1)","Skewed input — one bucket gets all elements"],["Shell Sort","Medium n (~10⁴), simple O(1) space requirement","Large n where O(n log n) is needed reliably"]]}),e.jsx(y,{q:"Why must the inner sort in Radix Sort be stable?",a:"Radix Sort processes digits from least significant to most significant. The correctness depends on a key invariant: after sorting on digit d, elements with the same digit d are in the order determined by all previous (less significant) digits. This order can only be preserved if the sort on digit d is stable — if unstable, it would destroy the relative ordering established by earlier passes, giving incorrect results."}),e.jsx(y,{q:"What is the decision tree lower bound proof for comparison-based sorting?",a:"A comparison-based sorting algorithm can be modeled as a binary decision tree where each internal node is a comparison (arr[i] < arr[j]?) and each leaf is a permutation. For n elements, there are n! possible permutations (outcomes). A binary tree with n! leaves has height at least ⌈log₂(n!)⌉ ≈ n log₂n - n/ln(2). Since each comparison adds one level, any comparison-based sort needs at least Ω(n log n) comparisons in the worst case. This proves no comparison-based sort can beat O(n log n)."})]})}function H(){return e.jsxs("div",{children:[e.jsx(p,{children:"Dutch National Flag — Three-Way Partition"}),e.jsxs(m,{children:["Sort an array containing only ",e.jsx(l,{children:"{0, 1, 2}"})," in a single pass using three pointers: ",e.jsx(l,{children:"lo"})," (right boundary of 0-region), ",e.jsx(l,{children:"mid"})," (current element), ",e.jsx(l,{children:"hi"})," (left boundary of 2-region). O(n) time, O(1) space — the foundational 3-way partition used in 3-way Quick Sort."]}),e.jsx(q,{}),e.jsx(u,{children:{cpp:`void sortColors(vector<int>& arr) {
    int lo = 0, mid = 0, hi = arr.size() - 1;
    while (mid <= hi) {
        if      (arr[mid] == 0) { swap(arr[lo++], arr[mid++]); }
        else if (arr[mid] == 1) { mid++; }
        else                    { swap(arr[mid], arr[hi--]); }
        // Don't mid++ when swapping with hi: the swapped-in value isn't inspected yet
    }
}
// [2,0,2,1,1,0] → [0,0,1,1,2,2]  single pass, no extra space`,python:`def sort_colors(arr):
    lo = mid = 0; hi = len(arr) - 1
    while mid <= hi:
        if   arr[mid] == 0: arr[lo],arr[mid]=arr[mid],arr[lo]; lo+=1; mid+=1
        elif arr[mid] == 1: mid += 1
        else:               arr[mid],arr[hi]=arr[hi],arr[mid]; hi -= 1`}}),e.jsx(p,{children:"Two-Way Segregation — Negatives and Positives"}),e.jsx(m,{children:"Rearrange an array so all negatives come before positives (or any two-class partition). Apply a Lomuto-style scan or a simple Dutch National Flag with two zones. O(n) time, O(1) space."}),e.jsx(u,{children:{cpp:`void segregate(vector<int>& arr) {
    int lo = 0, hi = arr.size() - 1;
    while (lo < hi) {
        while (lo < hi && arr[lo] < 0) lo++;   // find non-negative from left
        while (lo < hi && arr[hi] >= 0) hi--;  // find negative from right
        if (lo < hi) swap(arr[lo], arr[hi]);
    }
}
// [-1,2,-3,4,-5] → [-1,-3,-5,4,2] (relative order not preserved — unstable)`,python:`def segregate(arr):
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        while lo < hi and arr[lo] < 0: lo += 1
        while lo < hi and arr[hi] >= 0: hi -= 1
        if lo < hi: arr[lo], arr[hi] = arr[hi], arr[lo]`}}),e.jsx(p,{children:"Merge Overlapping Intervals"}),e.jsxs(m,{children:["Sort intervals by start time. Merge the current interval into the last merged interval if they overlap (",e.jsx(l,{children:"start \\leq lastEnd"}),"). O(n log n) dominated by sorting."]}),e.jsx(u,{children:{cpp:`vector<pair<int,int>> mergeIntervals(vector<pair<int,int>>& intervals) {
    sort(intervals.begin(), intervals.end());   // sort by start
    vector<pair<int,int>> res;
    for (auto [s, e] : intervals) {
        if (!res.empty() && s <= res.back().second)
            res.back().second = max(res.back().second, e);  // extend
        else
            res.push_back({s, e});   // new non-overlapping interval
    }
    return res;
}
// [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]`,python:`def merge_intervals(intervals):
    intervals.sort()   # sort by start
    res = []
    for s, e in intervals:
        if res and s <= res[-1][1]: res[-1][1] = max(res[-1][1], e)
        else: res.append([s, e])
    return res`}}),e.jsx(p,{children:"Maximum Guests at Any Point (Peak Overlap)"}),e.jsxs(m,{children:["Given arrival and departure times, find the maximum number of guests simultaneously present. ",e.jsx("strong",{children:"Event sweep:"})," create +1 events for arrivals and -1 for departures, sort all events (ties: process arrivals before departures), scan to find peak."]}),e.jsx(u,{children:{cpp:`int maxGuests(vector<int>& arr, vector<int>& dep, int n) {
    // Sort arrivals and departures separately
    sort(arr.begin(), arr.end());
    sort(dep.begin(), dep.end());
    int guests = 0, maxG = 0, i = 0, j = 0;
    while (i < n) {
        if (arr[i] <= dep[j]) { guests++; maxG = max(maxG, guests); i++; }
        else                  { guests--; j++; }
    }
    return maxG;
}
// arr=[1,2,9,5,5], dep=[4,7,12,11,11] → 3 (at time 5)`,python:`def max_guests(arr, dep):
    arr, dep, n = sorted(arr), sorted(dep), len(arr)
    guests = max_g = i = j = 0
    while i < n:
        if arr[i] <= dep[j]: guests += 1; max_g = max(max_g, guests); i += 1
        else: guests -= 1; j += 1
    return max_g`}}),e.jsx(p,{children:"Chocolate Distribution Problem"}),e.jsxs(m,{children:["Given ",e.jsx(l,{children:"n"})," packets with different numbers of chocolates and ",e.jsx(l,{children:"m"})," students, choose ",e.jsx(l,{children:"m"})," consecutive packets (after sorting) that minimizes the difference between the maximum and minimum packets distributed."]}),e.jsx(u,{children:{cpp:`int chocolateDist(vector<int>& arr, int m) {
    sort(arr.begin(), arr.end());     // sort to make consecutive windows meaningful
    int minDiff = INT_MAX;
    for (int i = 0; i + m - 1 < arr.size(); i++)
        minDiff = min(minDiff, arr[i + m - 1] - arr[i]);   // window [i, i+m-1]
    return minDiff;
}
// arr=[7,3,2,4,9,12,56], m=3 → sort:[2,3,4,7,9,12,56] → min diff = 4-2 = 2`,python:`def chocolate_dist(arr, m):
    arr.sort()
    return min(arr[i+m-1] - arr[i] for i in range(len(arr)-m+1))`}}),e.jsx(y,{q:"Why does Dutch National Flag not increment mid after swapping with hi?",a:"When we swap arr[mid] with arr[hi], the element placed at arr[mid] is the one that was at arr[hi] — it hasn't been inspected yet. It could be 0, 1, or 2. So we must inspect it next (keep mid pointing to it). If we incremented mid, we'd skip inspecting the newly placed element and could leave a 0 or 2 in the middle region. When we swap with lo, both arr[lo] and arr[mid] were already inspected (lo is always ≤ mid), so we can safely advance both lo and mid."}),e.jsx(y,{q:"In the Maximum Guests problem, why do we process arrivals before departures on ties?",a:"If a guest arrives and another departs at the same time, they briefly overlap (or we consider the arriving guest to have entered before the departing one leaves). Processing arrival before departure at the same timestamp correctly counts the peak: both are present simultaneously at that instant. If we processed departures first, we'd miss the brief overlap and report a lower peak."})]})}function Q(){return e.jsxs("div",{children:[e.jsx(z,{color:"purple",icon:"ti-tournament",children:"6 sorting-based interview problems — from classic inversions to interval scheduling. All appear in FAANG OAs and onsite rounds."}),e.jsx(S,{num:1,title:"Count Inversions in Array",difficulty:"OA Hard",tags:["Modified Merge Sort","Divide & Conquer"],statement:"Given an array <code>arr</code> of n distinct integers, count the number of <strong>inversions</strong>: pairs <code>(i, j)</code> where <code>i < j</code> and <code>arr[i] > arr[j]</code>. This equals the minimum number of adjacent swaps needed to sort the array.",constraints:["1 ≤ n ≤ 10⁵","Values fit in 32-bit int","O(n log n) required"],examples:[{input:"[2,4,1,3,5]",output:"3",note:"Pairs: (2,1),(4,1),(4,3)"},{input:"[5,4,3,2,1]",output:"10",note:"Completely reversed = n(n-1)/2 = 10"}],approach:"Modify merge sort: during the merge step, when a right-half element arr[j] is placed before left-half elements arr[i..mid], it forms (mid - i + 1) inversions with ALL remaining left-half elements. Accumulate this count. Total inversions = left inversions + right inversions + cross inversions found during merge. O(n log n) time, O(n) space.",code:{cpp:`long long mergeCount(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return 0;
    int mid = lo + (hi - lo) / 2;
    long long inv = mergeCount(arr, lo, mid) + mergeCount(arr, mid + 1, hi);
    vector<int> tmp; int i = lo, j = mid + 1;
    while (i <= mid && j <= hi) {
        if (arr[i] <= arr[j]) tmp.push_back(arr[i++]);
        else { inv += (mid - i + 1); tmp.push_back(arr[j++]); }
    }
    while (i <= mid) tmp.push_back(arr[i++]);
    while (j <= hi)  tmp.push_back(arr[j++]);
    for (int k = 0; k < (int)tmp.size(); k++) arr[lo+k] = tmp[k];
    return inv;
}
long long countInversions(vector<int>& arr) {
    return mergeCount(arr, 0, arr.size() - 1);
}`,python:`def merge_count(arr):
    if len(arr) <= 1: return arr, 0
    mid = len(arr) // 2
    L, lc = merge_count(arr[:mid])
    R, rc = merge_count(arr[mid:])
    merged, inv, i, j = [], lc + rc, 0, 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: merged.append(L[i]); i += 1
        else: inv += len(L) - i; merged.append(R[j]); j += 1
    return merged + L[i:] + R[j:], inv`}}),e.jsx(S,{num:2,title:"Sort Colors (Dutch National Flag)",difficulty:"LC Medium",tags:["DNF","LC 75"],statement:"Given an array <code>nums</code> containing only <code>0</code>, <code>1</code>, and <code>2</code>, sort it in-place so all 0s come first, then 1s, then 2s. You must solve it in a <strong>single pass</strong> using constant extra space.",constraints:["1 ≤ n ≤ 300","nums[i] ∈ {0,1,2}","One pass, O(1) space"],examples:[{input:"[2,0,2,1,1,0]",output:"[0,0,1,1,2,2]"},{input:"[2,0,1]",output:"[0,1,2]"}],approach:"Dutch National Flag with three pointers: lo (end of 0s region), mid (current inspection), hi (start of 2s region). Invariant at all times: arr[0..lo-1]=0, arr[lo..mid-1]=1, arr[hi+1..n-1]=2. Move mid forward for 1s, swap with lo for 0s, swap with hi for 2s (don't advance mid in this case).",code:{cpp:`void sortColors(vector<int>& nums) {
    int lo = 0, mid = 0, hi = nums.size() - 1;
    while (mid <= hi) {
        if      (nums[mid] == 0) swap(nums[lo++], nums[mid++]);
        else if (nums[mid] == 1) mid++;
        else                     swap(nums[mid], nums[hi--]);
    }
}`,python:`def sort_colors(nums):
    lo = mid = 0; hi = len(nums) - 1
    while mid <= hi:
        if   nums[mid] == 0: nums[lo],nums[mid]=nums[mid],nums[lo]; lo+=1; mid+=1
        elif nums[mid] == 1: mid += 1
        else:                nums[mid],nums[hi]=nums[hi],nums[mid]; hi -= 1`}}),e.jsx(S,{num:3,title:"Merge Intervals",difficulty:"LC Medium",tags:["Sort + Merge","LC 56"],statement:"Given a list of <code>intervals</code> where <code>intervals[i] = [start, end]</code>, merge all overlapping intervals and return the result as a list of non-overlapping intervals.",constraints:["1 ≤ n ≤ 10⁴","0 ≤ start ≤ end ≤ 10⁴"],examples:[{input:"[[1,3],[2,6],[8,10],[15,18]]",output:"[[1,6],[8,10],[15,18]]"},{input:"[[1,4],[4,5]]",output:"[[1,5]]",note:"Touching intervals merge"}],approach:"Sort by start time. Maintain a result list. For each interval: if result is empty or current start > last result's end, append. Otherwise, merge by extending the last result's end to max(last.end, current.end). The sort ensures we only need to check the last interval. O(n log n) dominated by sorting.",code:{cpp:`vector<vector<int>> merge(vector<vector<int>>& iv) {
    sort(iv.begin(), iv.end());
    vector<vector<int>> res;
    for (auto& cur : iv) {
        if (!res.empty() && cur[0] <= res.back()[1])
            res.back()[1] = max(res.back()[1], cur[1]);
        else
            res.push_back(cur);
    }
    return res;
}`,python:`def merge_intervals(intervals):
    intervals.sort()
    res = []
    for s, e in intervals:
        if res and s <= res[-1][1]: res[-1][1] = max(res[-1][1], e)
        else: res.append([s, e])
    return res`}}),e.jsx(S,{num:4,title:"Kth Largest Element (QuickSelect)",difficulty:"LC Medium",tags:["QuickSelect","LC 215"],statement:"Given an integer array <code>nums</code> and integer <code>k</code>, return the <strong>kth largest</strong> element in the array. Note: it is the kth largest in sorted order, not the kth distinct element.",constraints:["1 ≤ k ≤ n ≤ 10⁴","-10⁴ ≤ nums[i] ≤ 10⁴"],examples:[{input:"[3,2,1,5,6,4], k=2",output:"5"},{input:"[3,2,3,1,2,4,5,5,6], k=4",output:"4"}],approach:"Convert to kth smallest: find (n-k+1)th smallest. Use QuickSelect (partition-based): after partition, if pivot rank == k, return it. If k < rank, recurse left; else recurse right (with adjusted k). Expected O(n) average, O(n²) worst (randomize pivot to avoid). Heap approach: maintain a min-heap of size k for guaranteed O(n log k).",code:{cpp:`// QuickSelect — O(n) average
int findKthLargest(vector<int>& nums, int k) {
    // k-th largest = (n-k+1)-th smallest
    int target = nums.size() - k;
    int lo = 0, hi = nums.size() - 1;
    while (lo < hi) {
        // Random pivot for better average performance
        int pivIdx = lo + rand() % (hi - lo + 1);
        swap(nums[pivIdx], nums[hi]);
        int pi = lo - 1;
        for (int j = lo; j < hi; j++)
            if (nums[j] <= nums[hi]) swap(nums[++pi], nums[j]);
        swap(nums[++pi], nums[hi]);
        if      (pi == target) return nums[pi];
        else if (pi <  target) lo = pi + 1;
        else                   hi = pi - 1;
    }
    return nums[lo];
}`,python:`import random

def find_kth_largest(nums, k):
    target = len(nums) - k   # k-th largest = (n-k)-th 0-indexed smallest
    def select(lo, hi):
        if lo == hi: return nums[lo]
        pi = random.randint(lo, hi); nums[pi], nums[hi] = nums[hi], nums[pi]
        i = lo - 1
        for j in range(lo, hi):
            if nums[j] <= nums[hi]: i += 1; nums[i], nums[j] = nums[j], nums[i]
        i += 1; nums[i], nums[hi] = nums[hi], nums[i]
        if   i == target: return nums[i]
        elif i <  target: return select(i + 1, hi)
        else:             return select(lo, i - 1)
    return select(0, len(nums) - 1)`}}),e.jsx(S,{num:5,title:"Chocolate Distribution Problem",difficulty:"OA Medium",tags:["Sort + Sliding Window"],statement:"Given <code>n</code> chocolate packets with different numbers of chocolates and <code>m</code> students, distribute exactly <code>m</code> packets (one per student) such that the <strong>difference between the maximum and minimum</strong> chocolates given to any student is minimized.",constraints:["m ≤ n ≤ 10⁵","1 ≤ chocolates[i] ≤ 10⁹"],examples:[{input:"arr=[7,3,2,4,9,12,56], m=3",output:"2",note:"Best 3 consecutive after sort: [2,3,4] → diff=2"},{input:"arr=[3,4,1,9,56,7,9,12], m=5",output:"6",note:"Best window: [3,4,7,9,9] → diff=6"}],approach:"Key insight: after sorting, the optimal m packets are always consecutive in the sorted array (separating any two would increase the range). Sort the array, then slide a window of size m and track the minimum (window[i+m-1] - window[i]). O(n log n) for sort + O(n) scan.",code:{cpp:`int chocolateDist(vector<int>& arr, int m) {
    sort(arr.begin(), arr.end());
    int minDiff = INT_MAX;
    for (int i = 0; i + m - 1 < (int)arr.size(); i++)
        minDiff = min(minDiff, arr[i + m - 1] - arr[i]);
    return minDiff;
}`,python:`def chocolate_dist(arr, m):
    arr.sort()
    return min(arr[i+m-1]-arr[i] for i in range(len(arr)-m+1))`}}),e.jsx(S,{num:6,title:"Meeting Rooms II — Minimum Rooms Required",difficulty:"LC Hard",tags:["Interval Scheduling","LC 253"],statement:"Given intervals representing the start and end times of meetings, find the <strong>minimum number of conference rooms</strong> required to hold all meetings simultaneously. This equals the maximum number of meetings occurring at the same time.",constraints:["0 ≤ n ≤ 10⁴","0 ≤ start < end ≤ 10⁶"],examples:[{input:"[[0,30],[5,10],[15,20]]",output:"2",note:"Meeting 1 overlaps with both 2 and 3, but 2 and 3 don't overlap"},{input:"[[7,10],[2,4]]",output:"1",note:"No overlap"}],approach:"Event sweep (two sorted arrays): separate starts and ends into sorted arrays. Use two pointers i (next start) and j (next end). Greedily: if next start < next end → a new meeting starts before any ends, rooms++; else a meeting just ended, rooms-- (reuse room). Track maximum rooms. O(n log n) for sorting.",code:{cpp:`int minMeetingRooms(vector<vector<int>>& intervals) {
    int n = intervals.size();
    vector<int> starts(n), ends(n);
    for (int i = 0; i < n; i++) { starts[i]=intervals[i][0]; ends[i]=intervals[i][1]; }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());

    int rooms = 0, maxRooms = 0, j = 0;
    for (int i = 0; i < n; i++) {
        if (starts[i] < ends[j]) rooms++;      // new meeting starts before any ends
        else                     j++;           // reuse a freed room
        maxRooms = max(maxRooms, rooms);
    }
    return maxRooms;
}`,python:`def min_meeting_rooms(intervals):
    starts = sorted(i[0] for i in intervals)
    ends   = sorted(i[1] for i in intervals)
    rooms = max_rooms = j = 0
    for s in starts:
        if s < ends[j]: rooms += 1
        else: j += 1
        max_rooms = max(max_rooms, rooms)
    return max_rooms`}})]})}const $=[{id:"comparison",label:"Comparison Sorts"},{id:"divide",label:"Quick & Merge Sort"},{id:"linear",label:"Linear-Time Sorting"},{id:"applications",label:"Applications"},{id:"problems",label:"Problems"}];function Y(){const[n,d]=j.useState("comparison"),r={comparison:e.jsx(D,{}),divide:e.jsx(E,{}),linear:e.jsx(G,{}),applications:e.jsx(H,{}),problems:e.jsx(Q,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 07"}),e.jsx("h1",{className:"page-header-title",children:"Sorting"}),e.jsx("p",{className:"page-header-subtitle",children:"Bubble · Selection · Insertion · Quick Sort · Merge Sort · Counting · Radix · Bucket · Dutch National Flag · Inversions · Intervals"})]}),e.jsx(I,{tabs:$,active:n,onChange:d}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[n]}),e.jsx(A,{moduleId:7})]})}export{Y as default};
