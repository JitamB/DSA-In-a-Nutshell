import{r as P,j as e}from"./index-D9jkHkZY.js";import{S as D,N as M,d as L,H as x,P as j,a as w,Q as $,T as A,V as C}from"./SectionNav-BHzhBu3R.js";const y={0:10,1:-5,2:3,3:4,4:6},S={0:[300,42],1:[175,122],2:[425,122],3:[90,202],4:[260,202]},R=[[0,1],[0,2],[1,3],[1,4]],I={0:[1,2],1:[3,4],2:[],3:[],4:[]},b=[3,4,1,2,0];function z(){const r=[],n={},a=[0];r.push({H:{},maxDia:0,cur:null,action:"init",desc:"DP on Trees: process children BEFORE parent (post-order). At each node, return its height to the parent. Update the global diameter on the way."});for(const i of b){const u=I[i];if(u.length===0)n[i]=1,r.push({H:{...n},maxDia:a[0],cur:i,lh:0,rh:0,h:1,dia:0,action:"leaf",desc:`Node ${y[i]}: LEAF. Height = 1. Diameter contribution = 0 (need two sides). Return h=1 to parent.`});else{const p=n[u[0]]??0,t=n[u[1]]??0,c=Math.max(p,t)+1,l=p+t;n[i]=c;const d=l>a[0];d&&(a[0]=l),r.push({H:{...n},maxDia:a[0],cur:i,lh:p,rh:t,h:c,dia:l,action:d?"newMax":"update",desc:`Node ${y[i]}: left_h=${p}, right_h=${t}. Height=${c}. Diameter through here = ${p}+${t}=${l}.${d?" ★ New max diameter!":""} Return h=${c} to parent.`})}}return r.push({H:{...n},maxDia:a[0],cur:null,action:"done",desc:`Done! Diameter = ${a[0]} edges. Path: 4→(−5)→10→3 or 6→(−5)→10→3.`}),r}const E=z();function O(){const r=[],n={},a=[y[b[0]]];r.push({G:{},maxPath:-1/0,cur:null,action:"init",desc:"At each node: GAIN = max single-path sum starting from this node, going into one subtree. Path through a node = left_gain + node + right_gain. Negative subtrees are discarded (gain clamped to 0)."});for(const i of b){const u=I[i],o=y[i];if(u.length===0){n[i]=o;const t=o>a[0];t&&(a[0]=o),r.push({G:{...n},maxPath:a[0],cur:i,lhg:0,rhg:0,pathThrough:o,gain:o,action:"leaf",desc:`Node ${o}: LEAF. Gain = ${o}. Path "through" = ${o} (single node). ${t?"★ New max path!":""} Return gain=${o} to parent.`})}else{const t=n[u[0]]??0,c=n[u[1]]??0,l=Math.max(0,t),d=Math.max(0,c),h=o+l+d,f=o+Math.max(l,d),m=h>a[0];m&&(a[0]=h),n[i]=f,r.push({G:{...n},maxPath:a[0],cur:i,lhRaw:t,rhRaw:c,lhg:l,rhg:d,pathThrough:h,gain:f,action:m?"newMax":"update",desc:`Node ${o}: left_gain=${t}→clamped=${l}, right_gain=${c}→clamped=${d}. Path through = ${o}+${l}+${d}=${h}.${m?" ★ New max!":""} Return gain=${f} to parent.`})}}return r.push({G:{...n},maxPath:a[0],cur:null,action:"done",desc:`Done! Max path sum = ${a[0]}. Path: 6→(−5)→10→3 = 6+(−5)+10+3=${a[0]}.`}),r}const F=O();function W(){const r=[],n={},a=[-1/0];r.push({BL:{},maxL2L:-1/0,cur:null,action:"init",desc:"Leaf-to-leaf: path must start AND end at leaves. At each node with two children: record candidate = bestLeaf(left) + node + bestLeaf(right). bestLeaf(v) = max sum path from any leaf in subtree(v) going UP to v."});for(const i of b){const u=I[i],o=y[i];if(u.length===0)n[i]=o,r.push({BL:{...n},maxL2L:a[0],cur:i,action:"leaf",desc:`Node ${o}: LEAF. bestLeaf = ${o} (only path = the leaf itself). Cannot form leaf-to-leaf path alone — need TWO leaf endpoints.`});else{const t=n[u[0]],c=n[u[1]],l=t+o+c,d=l>a[0];d&&(a[0]=l);const h=Math.max(t,c)+o;n[i]=h,r.push({BL:{...n},maxL2L:a[0],cur:i,lbl:t,rbl:c,l2l:l,bl:h,action:d?"newMax":"update",desc:`Node ${o}: bestLeaf(left)=${t}, bestLeaf(right)=${c}. L2L through here = ${t}+${o}+${c}=${l}.${d?" ★ New max L2L!":""} bestLeaf(this) = max(${t},${c})+${o}=${h}. Return ${h} to parent.`})}}return r.push({BL:{...n},maxL2L:a[0],cur:null,action:"done",desc:`Done! Max leaf-to-leaf sum = ${a[0]}. Path: 6→(−5)→10→3 = 6+(−5)+10+3=${a[0]}.`}),r}const G=W();function B({hl:r={},labels:n={},W:a=600,H:i=270}){const u={cur:"#3A2A1A",done:"#1A3A2A",newMax:"#2A1A3A",leaf:"#1A2A3A",none:"#131722"},o={cur:"#CE9178",done:"#4EC9B0",newMax:"#C586C0",leaf:"#81B4EA",none:"#1E2233"},p={cur:"#CE9178",done:"#4EC9B0",newMax:"#C586C0",leaf:"#9CDCFE",none:"#6A7490"};return e.jsxs("svg",{width:a,height:i,viewBox:`0 0 ${a} ${i}`,children:[R.map(([t,c],l)=>{const d=S[t],h=S[c];return e.jsx("line",{x1:d[0],y1:d[1],x2:h[0],y2:h[1],stroke:"#2A3050",strokeWidth:"1.5"},l)}),Object.keys(S).map(t=>{const c=+t,[l,d]=S[c],h=r[c]||"none",f=n[c];return e.jsxs("g",{children:[e.jsx("circle",{cx:l,cy:d,r:"24",fill:u[h],stroke:o[h],strokeWidth:h!=="none"?2:1}),e.jsx("text",{x:l,y:d+1,textAnchor:"middle",dominantBaseline:"middle",fill:p[h],fontSize:"13",fontFamily:"monospace",fontWeight:h!=="none"?700:500,children:y[c]}),f&&e.jsx("text",{x:l,y:d+34,textAnchor:"middle",fill:o[h],fontSize:"10",fontFamily:"monospace",fontWeight:"700",children:f})]},t)})]})}function H(){const[r,n]=P.useState("diam"),[a,i]=P.useState(0),u={diam:{label:"Diameter",steps:E,color:"info"},path:{label:"Max Path Sum",steps:F,color:"success"},leaf:{label:"Leaf-to-Leaf",steps:G,color:"warning"}},o=u[r],p=o.steps,t=p[Math.min(a,p.length-1)],c=s=>{n(s),i(0)},l={},d={};t.cur!=null&&(l[t.cur]=t.action==="newMax"?"newMax":t.action==="leaf"?"leaf":"cur");const h=b.indexOf(t.cur);for(let s=0;s<h;s++){const g=b[s];l[g]||(l[g]="done")}r==="diam"?Object.entries(t.H||{}).forEach(([s,g])=>{d[+s]=`h=${g}`}):r==="path"?Object.entries(t.G||{}).forEach(([s,g])=>{d[+s]=`g=${g}`}):Object.entries(t.BL||{}).forEach(([s,g])=>{d[+s]=`bl=${g}`});const f=r==="diam"?t.maxDia:r==="path"?t.maxPath:t.maxL2L,m=r==="diam"?"Max Diameter":r==="path"?"Max Path Sum":"Max L2L",T=f!==void 0&&f!==-1/0,_={newMax:"purple",leaf:"info",update:o.color,cur:"warning",done:"success",init:null}[t.action]||o.color;return e.jsxs(C,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"},children:Object.entries(u).map(([s,g])=>e.jsx("button",{onClick:()=>c(s),style:{padding:"4px 12px",border:"1px solid",borderColor:r===s?`var(--color-border-${g.color})`:"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:r===s?`var(--color-background-${g.color})`:"transparent",color:r===s?`var(--color-text-${g.color})`:"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:g.label},s))}),e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[_&&t.action!=="init"&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${_})`,color:`var(--color-text-${_})`,border:`1px solid var(--color-border-${_})`,whiteSpace:"nowrap"},children:t.action==="newMax"?"★ New Max!":t.action==="leaf"?"Leaf":t.action==="done"?"Done ✓":"Compute"}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc})]}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap",marginBottom:12},children:[e.jsx("div",{style:{flex:1,minWidth:260,overflowX:"auto"},children:e.jsx(B,{hl:l,labels:d})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,minWidth:130},children:[e.jsxs("div",{style:{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:T&&t.action!=="init"?`var(--color-background-${o.color})`:"var(--color-background-secondary)",border:`1px solid ${T&&t.action!=="init"?`var(--color-border-${o.color})`:"var(--color-border-secondary)"}`,textAlign:"center",transition:"all 0.2s"},children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:4},children:m}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:22,fontWeight:700,color:T&&t.action!=="init"?`var(--color-text-${o.color})`:"var(--color-text-secondary)"},children:T&&t.action!=="init"?f:"—"})]}),t.cur!=null&&e.jsxs("div",{style:{padding:"8px 10px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",fontFamily:"var(--font-mono)",fontSize:11,lineHeight:1.9},children:[e.jsx("div",{style:{color:"var(--color-text-tertiary)",marginBottom:2},children:"Current node:"}),e.jsxs("div",{style:{color:"var(--color-text-warning)",fontWeight:700},children:["val = ",y[t.cur]]}),r==="diam"&&t.h&&e.jsxs("div",{style:{color:"var(--color-text-info)"},children:["return h=",t.h]}),r==="path"&&t.gain!=null&&e.jsxs("div",{style:{color:"var(--color-text-success)"},children:["return gain=",t.gain]}),r==="leaf"&&t.bl!=null&&e.jsxs("div",{style:{color:"var(--color-text-warning)"},children:["return bl=",t.bl]}),t.action==="leaf"&&e.jsx("div",{style:{color:"var(--color-text-info)",fontSize:10},children:"(leaf node)"})]})]})]}),e.jsxs("div",{style:{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",alignSelf:"center",marginRight:4},children:"Post-order:"}),b.map((s,g)=>{const v=t.cur!=null?g<b.indexOf(t.cur):t.action==="done",N=s===t.cur&&t.action!=="done";return e.jsx("div",{style:{padding:"3px 9px",borderRadius:20,border:`1px solid ${N?"var(--color-border-warning)":v?`var(--color-border-${o.color})`:"var(--color-border-tertiary)"}`,background:N?"var(--color-background-warning)":v?`var(--color-background-${o.color})`:"transparent",fontFamily:"var(--font-mono)",fontSize:11.5,fontWeight:N||v?700:400,color:N?"var(--color-text-warning)":v?`var(--color-text-${o.color})`:"var(--color-text-tertiary)",transition:"all 0.15s"},children:y[s]},s)})]}),e.jsx("div",{style:{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"},children:[{c:"leaf",l:"Leaf node"},{c:"cur",l:"Current"},{c:"done",l:"Processed"},{c:"newMax",l:"New max!"}].map(({c:s,l:g})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:11},children:[e.jsx("div",{style:{width:9,height:9,borderRadius:"50%",background:`var(--color-background-${s==="cur"?"warning":s==="done"?o.color:s==="newMax"?"purple":"info"})`,border:`1px solid var(--color-border-${s==="cur"?"warning":s==="done"?o.color:s==="newMax"?"purple":"info"})`}}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:g})]},s))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>i(Math.max(0,a-1)),a===0],["Next →",()=>i(Math.min(p.length-1,a+1)),a===p.length-1]].map(([s,g,v])=>e.jsx("button",{onClick:g,disabled:v,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:v?"not-allowed":"pointer",fontSize:12,opacity:v?.4:1},children:s},s)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[a+1,"/",p.length]}),e.jsx("button",{onClick:()=>i(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>i(p.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}const U={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function k({num:r,title:n,difficulty:a,tags:i=[],statement:u,constraints:o=[],examples:p=[],approach:t,code:c}){const[l,d]=P.useState(!1),h=U[a]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",r]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:n})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[i.map(f=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:f},f)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${h})`,color:`var(--color-text-${h})`,border:`1px solid var(--color-border-${h})`},children:a})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:u}}),o.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:o.map((f,m)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:f},m))})]}),p.length>0&&e.jsx("div",{style:{marginBottom:14},children:p.map((f,m)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",m+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f.output})]}),f.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:f.note})]},m))}),e.jsxs("button",{onClick:()=>d(!l),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:l?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${l?"eye-off":"bulb"}`}),l?"Hide Solution":"Show Approach & Solution"]}),l&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),t]}),e.jsx(w,{children:c})]})]})]})}function V(){return e.jsxs("div",{children:[e.jsxs(L,{color:"info",icon:"ti-binary-tree",children:["Trees are ",e.jsx("strong",{children:"recursively defined"}),": a tree is a root node whose children are also trees. This makes them the most natural structure for DP. Every subtree is an independent subproblem. Post-order traversal (children before parent) gives us the correct dependency order — automatically."]}),e.jsx(x,{children:"The Universal DP on Trees Pattern"}),e.jsx("div",{style:{background:"#0D0F18",border:"1px solid #1E2233",borderRadius:10,padding:"18px 20px",marginBottom:16},children:[["1. Define state","info","What does the recursive function return for a subtree rooted at v?","height(v), gain(v), best_leaf(v)..."],["2. Leaf base case","success","What is the answer for a leaf node? (trivial)","height=1, gain=val, best_leaf=val"],["3. Combine children","warning","How do you compute the answer for v from its children's answers?","max(lh,rh)+1 for height; val+max(lg,rg) for gain"],["4. Local vs global","purple",'Do you need a global "max so far"? Update it at each node before returning to parent.',"maxDia = max(maxDia, lh+rh)"],["5. Return what parent needs","secondary","The return value may differ from the global update — return only what the parent uses.","Return height (not diameter) to parent"]].map(([r,n,a,i],u)=>e.jsxs("div",{style:{display:"flex",gap:12,marginBottom:u<4?12:0,alignItems:"flex-start"},children:[e.jsx("div",{style:{flexShrink:0,width:26,height:26,borderRadius:"50%",background:`var(--color-background-${n})`,border:`1px solid var(--color-border-${n})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-mono)",fontSize:12,fontWeight:700,color:`var(--color-text-${n})`,marginTop:2},children:u+1}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:`var(--color-text-${n})`,marginBottom:3},children:r}),e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",marginBottom:3},children:a}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:11.5,color:"var(--color-text-tertiary)",padding:"3px 8px",borderRadius:4,background:"rgba(255,255,255,0.04)",display:"inline-block"},children:["e.g. ",i]})]})]},u))}),e.jsx(x,{children:"The Local-Global Split — The Core Insight"}),e.jsxs(j,{children:["Every tree DP problem has two values at each node: what you ",e.jsx("strong",{children:"return"})," to the parent (local), and what you ",e.jsx("strong",{children:"update"})," globally. These are almost never the same thing. Confusing them is the most common mistake."]}),e.jsx(A,{heads:["Problem","What to RETURN to parent","What to UPDATE globally"],rows:[["Diameter","height(v) — single downward arm length","maxDia = max(maxDia, lh+rh) — the two-arm path"],["Max path sum","gain(v) = val + max(0, left_gain, right_gain)","maxPath = max(maxPath, val+lhg+rhg)"],["Leaf-to-leaf","bestLeaf(v) = val + max(left_BL, right_BL)","maxL2L = max(maxL2L, lBL+val+rBL) when 2 children"],["Max subtree size","size(v) = 1 + left_size + right_size","maxSize = max(maxSize, size(v))"],["Height-balanced?","-1 if unbalanced, else height","(using -1 as error sentinel)"]]}),e.jsxs(L,{color:"warning",icon:"ti-bulb",children:[e.jsx("strong",{children:"Template code pattern:"})," The function signature always looks like ",e.jsx("code",{children:"int solve(Node* v, int& global)"}),". The return value is what the parent needs. The ",e.jsx("code",{children:"global"})," reference is updated in-place. Never return the global value directly."]}),e.jsx(w,{children:{cpp:`// UNIVERSAL TREE DP TEMPLATE
// Return: what the PARENT needs to compute its own value
// Update: the GLOBAL best answer
int solve(TreeNode* node, int& globalAnswer) {
    if (!node) return BASE_CASE;                  // null = 0 height / 0 gain / etc.

    int left  = solve(node->left,  globalAnswer); // get left child's return value
    int right = solve(node->right, globalAnswer); // get right child's return value

    // Update the global answer using BOTH children (the "two-armed" path)
    globalAnswer = max(globalAnswer, COMBINE_FOR_GLOBAL(left, right, node->val));

    // Return only what the PARENT needs (the "one-armed" path from this node upward)
    return RETURN_FOR_PARENT(left, right, node->val);
}`,python:`def solve(node, global_ans):          # global_ans passed as list for mutability
    if not node: return BASE_CASE

    left  = solve(node.left,  global_ans)
    right = solve(node.right, global_ans)

    # Update global: two-arm path through this node
    global_ans[0] = max(global_ans[0], combine_for_global(left, right, node.val))

    # Return: one-arm value for parent
    return return_for_parent(left, right, node.val)`}}),e.jsx(x,{children:"In-Out DP (Rerooting Technique)"}),e.jsxs(j,{children:["Standard tree DP computes each subtree's answer. But what if you need the answer treating ",e.jsx("em",{children:"every node as a potential root"}),"? In-out DP adds a second DFS pass (top-down) to propagate parent information downward."]}),e.jsx("div",{style:{background:"var(--color-background-secondary)",border:"1px solid var(--color-border-secondary)",borderRadius:10,padding:"14px 16px",marginBottom:14},children:e.jsxs("div",{style:{fontSize:12.5,lineHeight:1.9,color:"var(--color-text-secondary)"},children:[e.jsx("strong",{style:{color:"var(--color-text-info)"},children:"Pass 1 (post-order, bottom-up):"})," Compute dp_down[v] = answer considering only the subtree rooted at v.",e.jsx("br",{}),e.jsx("strong",{style:{color:"var(--color-text-success)"},children:"Pass 2 (pre-order, top-down):"}),` Compute dp_up[v] = best answer from the "rest of the tree" above v (the tree if you removed v's subtree).`,e.jsx("br",{}),e.jsx("strong",{style:{color:"var(--color-text-warning)"},children:"Final answer at v:"})," Combine dp_down[v] and dp_up[v] to get the global answer when v is treated as the root.",e.jsx("br",{}),e.jsx("strong",{style:{color:"var(--color-text-purple)"},children:"Classic application:"}),' "Sum of distances in tree" (LC 834) — compute total path length from each node to all others in O(n).']})}),e.jsx(x,{children:"Knapsack on Trees"}),e.jsx(j,{children:`When you need to select exactly k nodes from a subtree to maximize some value, use the "tree knapsack" pattern. Each child's subtree is a "group" of items. Merge children's DP tables one by one.`}),e.jsx(w,{children:{cpp:`// Tree knapsack: dp[v][k] = max value using exactly k nodes in subtree(v)
void treeKnapsack(int v, int parent, int budget) {
    dp[v][1] = val[v];                     // just this node
    for (int u : adj[v]) {
        if (u == parent) continue;
        treeKnapsack(u, v, budget);
        // Merge child u's DP into v's DP (right to left to avoid reuse)
        for (int j=min(budget,sz[v]+sz[u]); j>=1; j--) {
            for (int k=1; k<=min(j-1,sz[u]); k++) {
                dp[v][j] = max(dp[v][j], dp[v][j-k] + dp[u][k]);
            }
        }
        sz[v] += sz[u];
    }
}
// Time: O(n^2) total — each pair of nodes merged exactly once`,python:`def tree_knapsack(v, parent, dp, adj, val):
    dp[v][1] = val[v]; sz = 1
    for u in adj[v]:
        if u == parent: continue
        tree_knapsack(u, v, dp, adj, val)
        # Merge right-to-left
        for j in range(budget, 0, -1):
            for k in range(1, min(j, sz)+1):
                dp[v][j] = max(dp[v][j], dp[v][j-k] + dp[u][k])
        sz += subtree_size[u]`}}),e.jsx($,{q:"Why must we always process children before the parent in tree DP? Can we ever go top-down first?",a:"Post-order (children before parent) ensures that when we compute dp[v], all dp[children] values are already available. Going top-down first means dp[v] would try to use dp[children] before they're computed. The only exception: in-out DP, where we do a first post-order pass, then a second pre-order (top-down) pass. But even there, the second pass uses values computed in the first pass — they're never interleaved."})]})}function K(){return e.jsxs("div",{children:[e.jsxs(L,{color:"success",icon:"ti-bolt",children:["Three problems on the same tree — watch how the ",e.jsx("strong",{children:"local return value"})," and ",e.jsx("strong",{children:"global update"})," change across all three. The structure of the recursion is identical; only what you compute at each step differs."]}),e.jsx(x,{children:"Tree: same for all three modes"}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:8},children:e.jsx(B,{})}),e.jsx("div",{style:{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",fontFamily:"var(--font-mono)",fontSize:12,marginBottom:16},children:[["Diameter","3 edges (6→-5→10→3)"],["Max Path Sum","14 (6→-5→10→3)"],["Leaf-to-Leaf","14 (6→-5→10→3)"]].map(([r,n])=>e.jsxs("div",{style:{padding:"4px 12px",borderRadius:6,background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-secondary)",color:"var(--color-text-secondary)"},children:[e.jsxs("span",{style:{color:"var(--color-text-info)",fontWeight:700},children:[r,": "]}),n]},r))}),e.jsx(H,{}),e.jsx(x,{children:"Side-by-Side: What Each Mode Returns"}),e.jsx(A,{heads:["Node","Diameter (return h)","Path Sum (return gain)","Leaf-to-Leaf (return bestLeaf)"],rows:[["4 (leaf)","h=1","gain=4","bestLeaf=4"],["6 (leaf)","h=1","gain=6","bestLeaf=6"],["-5","h=2, global: dia=2","gain=1, global: path=5","bestLeaf=1, global: l2l=5"],["3 (leaf)","h=1","gain=3","bestLeaf=3"],["10 (root)","h=3, global: dia=3","gain=13, global: path=14","bestLeaf=13, global: l2l=14"]]})]})}function q(){return e.jsxs("div",{children:[e.jsx(x,{children:"Diameter of a Binary Tree"}),e.jsx(j,{children:'The longest path between any two nodes. Crucially, this path may not pass through the root. The "diameter through a node" = left_height + right_height. We track the global max across all nodes during a post-order traversal that returns heights.'}),e.jsx(w,{children:{cpp:`int diameterOfBinaryTree(TreeNode* root) {
    int maxDiameter = 0;

    function<int(TreeNode*)> height = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int lh = height(node->left);
        int rh = height(node->right);

        // GLOBAL update: diameter through this node = lh + rh
        maxDiameter = max(maxDiameter, lh + rh);

        // LOCAL return: height for parent's use
        return max(lh, rh) + 1;
    };

    height(root);
    return maxDiameter;
}
// O(n) time, O(h) space (call stack)
// Key insight: return height (single arm), update diameter (both arms)`,python:`def diameter_of_binary_tree(root):
    max_dia = [0]
    def height(node):
        if not node: return 0
        lh = height(node.left)
        rh = height(node.right)
        max_dia[0] = max(max_dia[0], lh + rh)  # global update
        return max(lh, rh) + 1                  # local return
    height(root)
    return max_dia[0]`}}),e.jsx(x,{children:"Maximum Path Sum — Any Node to Any Node (LC 124)"}),e.jsx(j,{children:'The path can start and end anywhere (not just leaves). At each node, the "gain" going toward the parent = val + max(0, left_gain, right_gain). We discard negative sub-paths (clamp to 0). The global max is the best two-armed path through any node.'}),e.jsx(w,{children:{cpp:`int maxPathSum(TreeNode* root) {
    int maxPath = INT_MIN;

    function<int(TreeNode*)> gain = [&](TreeNode* node) -> int {
        if (!node) return 0;

        // Clamp to 0: don't extend through a net-negative subtree
        int lGain = max(0, gain(node->left));
        int rGain = max(0, gain(node->right));

        // GLOBAL update: best path through this node (can use both arms)
        maxPath = max(maxPath, node->val + lGain + rGain);

        // LOCAL return: best single-arm path going UP to parent
        return node->val + max(lGain, rGain);
    };

    gain(root);
    return maxPath;
}
// [-10, 9, 20, null, null, 15, 7]: 15+20+7=42
// Why clamp to 0? Including a negative-gain subtree only hurts the sum.`,python:`def max_path_sum(root):
    max_path=[float('-inf')]
    def gain(node):
        if not node:return 0
        lg=max(0,gain(node.left))
        rg=max(0,gain(node.right))
        max_path[0]=max(max_path[0],node.val+lg+rg)  # global: both arms
        return node.val+max(lg,rg)                    # local: one arm upward
    gain(root)
    return max_path[0]`}}),e.jsxs(L,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"Why clamp gain to 0?"}),` If the left subtree's best path sum is negative, it's better to start fresh at the current node rather than extending through that subtree. clamping = "I choose to start the path here instead of continuing from a bad subtree."`]}),e.jsx(x,{children:"Maximum Leaf-to-Leaf Path Sum"}),e.jsxs(j,{children:["The path must start and end at ",e.jsx("em",{children:"leaf"})," nodes. This adds a constraint: we can only update the global max when a node has ",e.jsx("strong",{children:"both"})," left and right children (otherwise we can't have two leaf endpoints). The return value is the best sum from any leaf in the subtree going up to this node."]}),e.jsx(w,{children:{cpp:`int maxLeafToLeafSum(TreeNode* root) {
    int maxL2L = INT_MIN;

    function<int(TreeNode*)> bestLeaf = [&](TreeNode* node) -> int {
        if (!node) return INT_MIN; // signal: "I'm null, no leaf here"
        if (!node->left && !node->right) return node->val; // LEAF: path = just itself

        // Only update global if BOTH children exist (two valid leaf endpoints)
        if (node->left && node->right) {
            int lBest = bestLeaf(node->left);
            int rBest = bestLeaf(node->right);
            if (lBest != INT_MIN && rBest != INT_MIN)
                maxL2L = max(maxL2L, lBest + node->val + rBest);
            return node->val + max(lBest, rBest);
        }

        // Only one child — no leaf-to-leaf possible through this node
        TreeNode* child = node->left ? node->left : node->right;
        int cBest = bestLeaf(child);
        return cBest == INT_MIN ? INT_MIN : node->val + cBest;
    };

    bestLeaf(root);
    return maxL2L;
}`,python:`def max_leaf_to_leaf(root):
    max_l2l=[float('-inf')]
    def best_leaf(node):
        if not node:return float('-inf')
        if not node.left and not node.right:return node.val  # leaf
        if node.left and node.right:
            lb=best_leaf(node.left); rb=best_leaf(node.right)
            if lb!=float('-inf') and rb!=float('-inf'):
                max_l2l[0]=max(max_l2l[0],lb+node.val+rb)
            return node.val+max(lb,rb)
        child=node.left or node.right
        cb=best_leaf(child)
        return float('-inf') if cb==float('-inf') else node.val+cb
    best_leaf(root); return max_l2l[0]`}}),e.jsxs(L,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:'Why the "only one child" case uses INT_MIN as a flag:'}),' If a node has only one child, the "path through this node" cannot be a valid leaf-to-leaf path (one side has no leaf endpoint). We return INT_MIN as a sentinel to prevent the parent from accidentally using this as a valid leaf endpoint. The parent checks for INT_MIN before updating the global max.']}),e.jsx($,{q:"What's the difference between max path sum (any-to-any) and leaf-to-leaf? When would the answers differ?",a:"Any-to-any can stop at any node — even a single internal node. Leaf-to-leaf must reach actual leaf nodes on both ends. They differ when: (1) all leaves have very negative values but some internal node is large — any-to-any picks the internal node, leaf-to-leaf is forced through the bad leaves. (2) A node has only one child — any-to-any can use the one-child path; leaf-to-leaf cannot use this node as a 'fork point' since it has only one leaf side. (3) The tree is a straight chain — any-to-any = max single node; leaf-to-leaf = sum of all nodes (root-to-leaf is the only leaf-to-leaf path)."})]})}function Q(){return e.jsxs("div",{children:[e.jsx(L,{color:"purple",icon:"ti-tournament",children:'3 problems — the canonical DP on trees triad. Notice how the code structure is almost identical across all three; only what you "return" and "update globally" changes.'}),e.jsx(k,{num:1,title:"Diameter of Binary Tree",difficulty:"LC Medium",tags:["LC 543","Tree DP"],statement:"Given the root of a binary tree, return the length of the <strong>diameter</strong> — the longest path between any two nodes (measured in edges). The path may or may not pass through the root.",constraints:["1 ≤ nodes ≤ 10⁴","-100 ≤ val ≤ 100"],examples:[{input:"[1,2,3,4,5]",output:"3",note:"Path 4→2→1→3 or 5→2→1→3"},{input:"[1,2]",output:"1"}],approach:"Post-order tree DP. Return height to parent. Update global diameter at each node: dia_through = lh+rh. The path that maximizes lh+rh may be anywhere in the tree — not necessarily through the root. O(n) single DFS pass.",code:{cpp:`int diameterOfBinaryTree(TreeNode* root){
    int ans=0;
    function<int(TreeNode*)>h=[&](TreeNode* n)->int{
        if(!n)return 0;
        int l=h(n->left),r=h(n->right);
        ans=max(ans,l+r);      // global: two-arm path
        return max(l,r)+1;    // local: one-arm height for parent
    };
    h(root);return ans;
}`,python:`def diameter(root):
    ans=[0]
    def h(n):
        if not n:return 0
        l,r=h(n.left),h(n.right)
        ans[0]=max(ans[0],l+r)
        return max(l,r)+1
    h(root);return ans[0]`}}),e.jsx(k,{num:2,title:"Binary Tree Maximum Path Sum",difficulty:"LC Hard",tags:["LC 124","Tree DP"],statement:"Given a binary tree, find the maximum <strong>path sum</strong>. A path is a sequence of connected nodes where each node appears at most once. The path does not need to pass through the root. Values can be negative.",constraints:["1 ≤ nodes ≤ 3×10⁴","-1000 ≤ val ≤ 1000"],examples:[{input:"[-10,9,20,null,null,15,7]",output:"42",note:"15→20→7 = 42"},{input:"[1,2,3]",output:"6",note:"2+1+3"}],approach:"Post-order DP. Gain(v) = val + max(0, left_gain, right_gain). Clamp subtree gains to 0 to discard net-negative paths. Update global: path_through = val+left_clamped+right_clamped. Return: val+max(left_clamped,right_clamped). O(n) single pass.",code:{cpp:`int maxPathSum(TreeNode* root){
    int ans=INT_MIN;
    function<int(TreeNode*)>g=[&](TreeNode* n)->int{
        if(!n)return 0;
        int l=max(0,g(n->left)),r=max(0,g(n->right));
        ans=max(ans,n->val+l+r);     // global: two-arm
        return n->val+max(l,r);      // local: one-arm
    };
    g(root);return ans;
}`,python:`def max_path_sum(root):
    ans=[float('-inf')]
    def g(n):
        if not n:return 0
        l,r=max(0,g(n.left)),max(0,g(n.right))
        ans[0]=max(ans[0],n.val+l+r)
        return n.val+max(l,r)
    g(root);return ans[0]`}}),e.jsx(k,{num:3,title:"Maximum Path Sum: Leaf to Leaf",difficulty:"OA Hard",tags:["Tree DP","Leaf Constraint"],statement:"Given a binary tree where every node has a value (possibly negative), find the maximum sum path that begins at one <strong>leaf node</strong> and ends at another <strong>leaf node</strong>.",constraints:["At least 2 leaves","−10⁵ ≤ val ≤ 10⁵","Not necessarily a BST"],examples:[{input:"10, -5, 3, 4, 6 (as in visualization)",output:"14",note:"Path: 6→-5→10→3"},{input:"[-1, -2, -3]",output:"-6",note:"Only path: -2→-1→-3"}],approach:"Post-order DP. bestLeaf(v) = max sum path from any leaf in subtree going UP to v. For node with two children: update global = lBest+val+rBest (leaf-to-leaf through this node), return val+max(lBest,rBest). For leaf: return val. For one-child nodes: no global update (can't fork). Handle null with INT_MIN sentinel.",code:{cpp:`int maxLeafToLeafPath(TreeNode* root){
    int ans=INT_MIN;
    function<int(TreeNode*)>bl=[&](TreeNode* n)->int{
        if(!n)return INT_MIN;
        if(!n->left&&!n->right)return n->val;
        if(n->left&&n->right){
            int l=bl(n->left),r=bl(n->right);
            if(l!=INT_MIN&&r!=INT_MIN)
                ans=max(ans,l+n->val+r);  // global: leaf-to-leaf fork
            return n->val+max(l,r);
        }
        // one child only — can't be a leaf-to-leaf fork
        TreeNode* ch=n->left?n->left:n->right;
        int c=bl(ch);
        return c==INT_MIN?INT_MIN:n->val+c;
    };
    bl(root);return ans;
}`,python:`def max_leaf_to_leaf(root):
    INF=float('-inf'); ans=[INF]
    def bl(n):
        if not n:return INF
        if not n.left and not n.right:return n.val
        if n.left and n.right:
            l,r=bl(n.left),bl(n.right)
            if l!=INF and r!=INF:ans[0]=max(ans[0],l+n.val+r)
            return n.val+max(l,r)
        c=n.left or n.right
        cb=bl(c)
        return INF if cb==INF else n.val+cb
    bl(root);return ans[0]`}})]})}const X=[{id:"framework",label:"DP on Trees Framework"},{id:"interactive",label:"3 Problems — Interactive"},{id:"solutions",label:"Full Solutions"},{id:"practice",label:"Problems"}];function ee(){const[r,n]=P.useState("framework"),a={framework:e.jsx(V,{}),interactive:e.jsx(K,{}),solutions:e.jsx(q,{}),practice:e.jsx(Q,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 25"}),e.jsx("h1",{className:"page-header-title",children:"Dynamic Programming on Trees"}),e.jsx("p",{className:"page-header-subtitle",children:"Post-Order DP · Local vs Global Split · In-Out DP · Tree Knapsack · Diameter · Max Path Sum · Leaf-to-Leaf"})]}),e.jsx(D,{tabs:X,active:r,onChange:n}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:a[r]}),e.jsx(M,{moduleId:25})]})}export{ee as default};
