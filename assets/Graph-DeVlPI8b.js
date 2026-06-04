import{r as w,j as e}from"./index-D9jkHkZY.js";import{S as Q,N as X,d as C,H as g,P as x,a as y,G as W,C as B,Q as E,T as D,V as G}from"./SectionNav-BHzhBu3R.js";const J={0:[75,100],1:[245,100],2:[75,230],3:[415,100],4:[245,230],5:[415,230]},Z=[[0,1],[1,3],[0,2],[1,4],[3,5],[2,4],[4,5]],$={0:[1,2],1:[0,3,4],2:[0,4],3:[1,5],4:[1,2,5],5:[3,4]},ee={5:[70,130],4:[70,260],2:[230,70],0:[230,195],3:[390,70],1:[390,260]},re=[[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]],te={5:[2,0],4:[0,1],2:[3],3:[1],0:[],1:[]};function oe(){const s=$,a=[],t=new Set,n=[],i=[];for(t.add(0),n.push(0),a.push({visited:new Set(t),queue:[...n],output:[...i],cur:null,processing:[],action:"init",desc:"Initialize: enqueue source (0), mark visited. BFS processes all neighbors of a node before going deeper."});n.length;){const r=n.shift();i.push(r);const o=[];for(const d of s[r])t.has(d)||(t.add(d),n.push(d),o.push(d));a.push({visited:new Set(t),queue:[...n],output:[...i],cur:r,processing:s[r],newNeighbors:o,action:"dequeue",desc:`Dequeue ${r}. Output = [${i}]. Unvisited neighbors: [${o.join(",")||"none"}] → enqueue.`})}return a.push({visited:new Set(t),queue:[],output:[...i],cur:null,processing:[],action:"done",desc:`BFS complete! Order: [${i.join("→")}]. Every node visited exactly once. O(V+E) time.`}),a}const ne=oe();function ie(){const s=$,a=[],t=new Set,n=[],i=[];a.push({visited:new Set,callStack:[],output:[],cur:null,action:"init",desc:"DFS explores as FAR as possible before backtracking. Implemented via recursion (implicit call stack) or explicit stack."});function r(o,d){t.add(o),i.push(o),a.push({visited:new Set(t),callStack:[...i],output:[...n],cur:o,action:"visit",desc:`VISIT ${o}. Call stack depth = ${i.length}. Exploring neighbors: [${s[o].join(",")}]`}),n.push(o);for(const l of s[o])t.has(l)?a.push({visited:new Set(t),callStack:[...i],output:[...n],cur:o,skip:l,action:"skip",desc:`${o}: neighbor ${l} already visited — skip.`}):(a.push({visited:new Set(t),callStack:[...i],output:[...n],cur:o,next:l,action:"recurse",desc:`${o} → recurse into unvisited neighbor ${l}.`}),r(l),a.push({visited:new Set(t),callStack:[...i],output:[...n],cur:o,action:"back",desc:`Returned to ${o} from subtree. Continue checking remaining neighbors.`}));i.pop(),a.push({visited:new Set(t),callStack:[...i],output:[...n],cur:o,action:"backtrack",desc:`All neighbors of ${o} done. BACKTRACK. Pop from call stack.`})}return r(0),a.push({visited:new Set(t),callStack:[],output:[...n],cur:null,action:"done",desc:`DFS complete! Order: [${n.join("→")}]. O(V+E) time.`}),a}const se=ie();function ae(){const s=te,a=[],t={0:2,1:2,2:1,3:1,4:0,5:0},n=[4,5],i=[],r={...t};for(a.push({queue:[...n],curDeg:{...r},output:[],processed:new Set,action:"init",desc:"Kahn's Algorithm: start with all nodes having in-degree = 0. Edges: 5→2, 5→0, 4→0, 4→1, 2→3, 3→1."});n.length;){n.sort((l,h)=>l-h);const o=n.shift();i.push(o);const d=[];for(const l of s[o])r[l]--,d.push({nb:l,newDeg:r[l]}),r[l]===0&&n.push(l);a.push({queue:[...n],curDeg:{...r},output:[...i],processed:new Set(i),cur:o,reduced:d,action:"process",desc:`Dequeue ${o}. Remove its outgoing edges: ${d.map(l=>`in-deg(${l.nb})→${l.newDeg}`).join(", ")||"(no outgoing)"}. ${d.filter(l=>l.newDeg===0).map(l=>l.nb).length?"New zero-degree nodes added to queue.":""} Output=[${i}].`})}return a.push({queue:[],curDeg:{...r},output:[...i],processed:new Set(i),action:"done",desc:`Topological order: [${i.join("→")}]. If output.length < V → cycle detected!`}),a}const k=ae();function N({pos:s,edges:a,hl:t={},directed:n=!1,labels:i={},W:r=500,H:o=350,edgeHL:d={}}){const l={visited:"#1A3A2A",cur:"#3A2A1A",queue:"#1A2A3A",skip:"#2A1A1A",done:"#1A3A2A",topo:"#2A1A3A",none:"#131722"},h={visited:"#4EC9B0",cur:"#CE9178",queue:"#81B4EA",skip:"#F44747",done:"#4EC9B0",topo:"#C586C0",none:"#1E2233"},c={visited:"#4EC9B0",cur:"#CE9178",queue:"#9CDCFE",skip:"#F44747",done:"#4EC9B0",topo:"#C586C0",none:"#6A7490"},u=22;return e.jsxs("svg",{width:r,height:o,viewBox:`0 0 ${r} ${o}`,children:[a.map(([p,v],b)=>{const m=s[p],f=s[v],F=`${p}-${v}`,A=d[F]||d[`${v}-${p}`],T=A?h[A]:"#2A3050";if(n){const V=f[0]-m[0],R=f[1]-m[1],I=Math.sqrt(V*V+R*R),S=V/I,q=R/I,M=m[0]+S*u,P=m[1]+q*u,z=f[0]-S*u,L=f[1]-q*u,O=z-S*10,_=L-q*10,H=O+q*6,K=_-S*6,U=O-q*6,Y=_+S*6;return e.jsxs("g",{children:[e.jsx("line",{x1:M,y1:P,x2:z,y2:L,stroke:T,strokeWidth:A?2:1.5}),e.jsx("polygon",{points:`${z},${L} ${H},${K} ${U},${Y}`,fill:T})]},b)}return e.jsx("line",{x1:m[0],y1:m[1],x2:f[0],y2:f[1],stroke:T,strokeWidth:A?2:1.5},b)}),Object.keys(s).map(p=>{const v=+p,[b,m]=s[v],f=t[v]||"none",F=i[v];return e.jsxs("g",{children:[e.jsx("circle",{cx:b,cy:m,r:u,fill:l[f],stroke:h[f],strokeWidth:f!=="none"?2:1}),e.jsx("text",{x:b,y:m+1,textAnchor:"middle",dominantBaseline:"middle",fill:c[f],fontSize:"13",fontFamily:"monospace",fontWeight:f!=="none"?700:500,children:p}),F&&e.jsx("text",{x:b,y:m+u+14,textAnchor:"middle",fill:h[f],fontSize:"10",fontFamily:"monospace",fontWeight:"700",children:F})]},p)})]})}function de(){const[s,a]=w.useState("bfs"),[t,n]=w.useState(0),i=s==="bfs"?ne:se,r=i[Math.min(t,i.length-1)],o=c=>{a(c),n(0)},d={};(r.visited||new Set).forEach(c=>{d[c]||(d[c]="visited")}),r.cur!=null&&(d[r.cur]="cur"),s==="bfs"&&(r.queue||[]).forEach(c=>{d[c]||(d[c]="queue")}),s==="dfs"&&(r.callStack||[]).forEach(c=>{!d[c]&&c!==r.cur&&(d[c]="queue")}),r.skip!=null&&(d[r.skip]="skip");const h={visit:"success",dequeue:"info",recurse:"warning",back:"secondary",backtrack:"warning",skip:"danger",done:"success",init:null}[r.action];return e.jsxs(G,{children:[e.jsx("div",{style:{display:"flex",gap:8,marginBottom:14},children:[["bfs","BFS — Level by Level"],["dfs","DFS — Go Deep First"]].map(([c,u])=>e.jsx("button",{onClick:()=>o(c),style:{padding:"4px 12px",border:"1px solid",borderColor:s===c?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:s===c?"var(--color-background-info)":"transparent",color:s===c?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12},children:u},c))}),e.jsxs("div",{style:{marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[h&&e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:700,background:`var(--color-background-${h})`,color:`var(--color-text-${h})`,border:`1px solid var(--color-border-${h})`,whiteSpace:"nowrap"},children:r.action==="visit"?"Visit":r.action==="dequeue"?"Dequeue":r.action==="recurse"?"Recurse":r.action==="backtrack"?"Backtrack":r.action==="done"?"Done ✓":r.action}),e.jsx("span",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:r.desc})]}),e.jsx("div",{style:{overflowX:"auto",marginBottom:12},children:e.jsx(N,{pos:J,edges:Z,hl:d,W:500,H:350})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:s==="bfs"?"QUEUE (FIFO)":"CALL STACK"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:36,alignItems:"center"},children:(s==="bfs"?r.queue||[]:r.callStack||[]).length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",border:"1px dashed var(--color-border-tertiary)",padding:"4px 12px",borderRadius:6},children:"empty"}):(s==="bfs"?r.queue||[]:[...r.callStack||[]].reverse()).map((c,u)=>e.jsxs("div",{style:{padding:"4px 10px",borderRadius:5,border:"1px solid var(--color-border-info)",background:"var(--color-background-info)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--color-text-info)"},children:[c,s==="dfs"&&u===0&&e.jsx("span",{style:{fontSize:9,opacity:.6,marginLeft:3},children:"← top"})]},u))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"OUTPUT"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:36,alignItems:"center"},children:(r.output||[]).length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)"},children:"…"}):(r.output||[]).map((c,u)=>e.jsx("div",{style:{padding:"4px 10px",borderRadius:5,border:`1px solid ${u===r.output.length-1&&r.action!=="done"?"var(--color-border-success)":"var(--color-border-secondary)"}`,background:u===r.output.length-1&&r.action!=="done"?"var(--color-background-success)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:u===r.output.length-1&&r.action!=="done"?"var(--color-text-success)":"var(--color-text-secondary)",transition:"all 0.15s"},children:c},u))})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>n(Math.max(0,t-1)),t===0],["Next →",()=>n(Math.min(i.length-1,t+1)),t===i.length-1]].map(([c,u,p])=>e.jsx("button",{onClick:u,disabled:p,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:p?"not-allowed":"pointer",fontSize:12,opacity:p?.4:1},children:c},c)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:64,textAlign:"center",alignSelf:"center"},children:[t+1,"/",i.length]}),e.jsx("button",{onClick:()=>n(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"}),e.jsx("button",{onClick:()=>n(i.length-1),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"End ⇥"})]})]})}function ce(){const[s,a]=w.useState(0),t=k[Math.min(s,k.length-1)],n={};(t.processed||new Set).forEach(r=>{n[r]="visited"}),t.cur!=null&&(n[t.cur]="cur"),(t.queue||[]).forEach(r=>{n[r]||(n[r]="queue")});const i={};return Object.entries(t.curDeg||{}).forEach(([r,o])=>{i[+r]=`d=${o}`}),e.jsxs(G,{children:[e.jsx("div",{style:{marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:t.desc}),e.jsx("div",{style:{overflowX:"auto",marginBottom:12},children:e.jsx(N,{pos:ee,edges:re,hl:n,directed:!0,labels:i,W:490,H:350})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"QUEUE (in-degree = 0)"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:36,alignItems:"center"},children:(t.queue||[]).length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",border:"1px dashed var(--color-border-tertiary)",padding:"4px 12px",borderRadius:6},children:"empty"}):(t.queue||[]).map((r,o)=>e.jsx("div",{style:{padding:"4px 10px",borderRadius:5,border:"1px solid var(--color-border-info)",background:"var(--color-background-info)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:"var(--color-text-info)"},children:r},o))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)",marginBottom:5,letterSpacing:"0.06em"},children:"TOPOLOGICAL ORDER"}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",minHeight:36,alignItems:"center"},children:(t.output||[]).length===0?e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)"},children:"…"}):(t.output||[]).map((r,o)=>e.jsx("div",{style:{padding:"4px 10px",borderRadius:5,border:`1px solid ${o===t.output.length-1&&t.action!=="done"?"var(--color-border-success)":"var(--color-border-secondary)"}`,background:o===t.output.length-1&&t.action!=="done"?"var(--color-background-success)":"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:700,color:o===t.output.length-1&&t.action!=="done"?"var(--color-text-success)":"var(--color-text-secondary)"},children:r},o))})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>a(Math.max(0,s-1)),s===0],["Next →",()=>a(Math.min(k.length-1,s+1)),s===k.length-1]].map(([r,o,d])=>e.jsx("button",{onClick:o,disabled:d,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:d?"not-allowed":"pointer",fontSize:12,opacity:d?.4:1},children:r},r)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[s+1,"/",k.length]}),e.jsx("button",{onClick:()=>a(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const le={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function j({num:s,title:a,difficulty:t,tags:n=[],statement:i,constraints:r=[],examples:o=[],approach:d,code:l}){const[h,c]=w.useState(!1),u=le[t]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",s]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:a})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},children:[n.map(p=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:p},p)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${u})`,color:`var(--color-text-${u})`,border:`1px solid var(--color-border-${u})`},children:t})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:i}}),r.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:r.map((p,v)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:p},v))})]}),o.length>0&&e.jsx("div",{style:{marginBottom:14},children:o.map((p,v)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",v+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:p.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:p.output})]}),p.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:p.note})]},v))}),e.jsxs("button",{onClick:()=>c(!h),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:h?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${h?"eye-off":"bulb"}`}),h?"Hide Solution":"Show Approach & Solution"]}),h&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),d]}),e.jsx(y,{children:l})]})]})]})}function ue(){return e.jsxs("div",{children:[e.jsxs(C,{color:"info",icon:"ti-network",children:["A graph G = (V, E) consists of a set of ",e.jsx("strong",{children:"vertices"})," (nodes) and ",e.jsx("strong",{children:"edges"})," (connections). Unlike trees, graphs can have cycles, multiple paths between nodes, and disconnected components. They model virtually everything: social networks, maps, internet routing, dependency resolution."]}),e.jsx(g,{children:"Types of Graphs"}),e.jsx(D,{heads:["Type","Definition","Example"],rows:[["Undirected","Edges have no direction. A–B = B–A.","Social friendships, road networks"],["Directed (Digraph)","Edges have direction. A→B ≠ B→A.","Twitter follows, task dependencies"],["Weighted","Each edge carries a numeric weight.","Road distances, network bandwidth"],["Unweighted","All edges treated equally (weight=1).","Binary connectivity"],["DAG","Directed Acyclic Graph — no cycles.","Build systems, course prerequisites"],["Complete","Every pair of vertices has an edge.","K_n: n(n-1)/2 edges"],["Bipartite","Vertices split into 2 sets, edges only between sets.","Job matching, 2-colorable graphs"],["Tree","Connected undirected graph with no cycles. V-1 edges.","File system hierarchy"]]}),e.jsx(g,{children:"Graph Representation"}),e.jsxs(W,{cols:2,children:[e.jsx(B,{title:"Adjacency Matrix",color:"warning",children:"V×V boolean matrix. adj[i][j]=1 iff edge i→j. O(1) edge lookup. O(V²) space — bad for sparse graphs."}),e.jsx(B,{title:"Adjacency List",color:"success",children:"Each vertex stores list of neighbors. O(V+E) space. O(degree) edge lookup. Default choice for most algorithms."})]}),e.jsx(y,{children:{cpp:`// Adjacency List (most common)
#include <vector>
using namespace std;

// Undirected, unweighted
vector<vector<int>> adj(V);
adj[u].push_back(v);
adj[v].push_back(u);       // both directions

// Directed weighted
vector<vector<pair<int,int>>> adj(V);  // {neighbor, weight}
adj[u].push_back({v, w});  // only u→v

// Adjacency Matrix (for dense graphs / O(1) edge check)
vector<vector<int>> mat(V, vector<int>(V, 0));
mat[u][v] = 1;             // directed
mat[u][v] = mat[v][u] = 1; // undirected`,python:`# Adjacency list
from collections import defaultdict, deque
adj = defaultdict(list)
adj[u].append(v)           # directed
adj[u].append(v); adj[v].append(u)  # undirected

# Weighted: adj[u].append((v, weight))

# Build from edge list:
def build_graph(n, edges, directed=False):
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        if not directed: adj[v].append(u)
    return adj`}}),e.jsx(g,{children:"Key Terminologies"}),e.jsx(D,{heads:["Term","Definition"],rows:[["Degree","Number of edges at a vertex. In-degree/out-degree for directed graphs."],["Path","Sequence of vertices connected by edges. Length = number of edges."],["Cycle","Path that starts and ends at the same vertex."],["Connected","Undirected: every vertex reachable from any other. Directed: strongly/weakly connected."],["Component","Maximal connected subgraph."],["Bridge","Edge whose removal disconnects the graph."],["Articulation point","Vertex whose removal disconnects the graph."],["Strongly connected component (SCC)","Maximal subgraph where every vertex reaches every other (directed)."]]}),e.jsx(E,{q:"When should you use an adjacency matrix vs an adjacency list?",a:"Adjacency matrix: use when (1) the graph is dense (E ≈ V²), (2) you need O(1) edge existence checks frequently, (3) V is small (≤ 1000). Adjacency list: use when (1) the graph is sparse (E ≪ V²), (2) you iterate over neighbors frequently, (3) V is large. In competitive programming and interview problems, adjacency lists are almost always correct. Matrix uses O(V²) space — for V=10⁵ nodes, that's 10¹⁰ entries, infeasible."})]})}function pe(){return e.jsxs("div",{children:[e.jsxs(C,{color:"success",icon:"ti-wave-square",children:["BFS explores a graph level by level using a queue. It guarantees the ",e.jsx("strong",{children:"shortest path"})," (by edge count) from source to any reachable vertex in unweighted graphs. The key: mark nodes visited ",e.jsx("em",{children:"when enqueued"}),", not when dequeued — prevents duplicates in queue."]}),e.jsx(g,{children:"BFS Step-Through — Interactive"}),e.jsx(x,{children:"Watch BFS explore the 3×2 grid starting from node 0. Blue = in queue, orange = currently processing, green = visited and done."}),e.jsx(de,{}),e.jsx(y,{children:{cpp:`// BFS template — single source, unweighted shortest path
vector<int> bfs(vector<vector<int>>& adj, int src, int V) {
    vector<int> dist(V, -1);
    queue<int> q;
    dist[src] = 0;
    q.push(src);                         // mark WHEN ENQUEUED (not dequeued)
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {         // unvisited
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;                         // dist[v] = shortest path length, -1 = unreachable
}`,python:`from collections import deque

def bfs(adj, src, V):
    dist = [-1] * V
    dist[src] = 0
    q = deque([src])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist`}}),e.jsx(g,{children:"Multi-Source BFS"}),e.jsx(x,{children:"When you need BFS from multiple starting nodes simultaneously (e.g., LC 994 Rotting Oranges: all initially rotten cells spread at once), enqueue ALL sources before the first iteration. The BFS naturally computes the minimum distance from ANY source."}),e.jsx(y,{children:{cpp:`// Multi-source BFS: enqueue ALL sources with dist=0
void multiSourceBFS(vector<vector<int>>& grid) {
    int m=grid.size(),n=grid[0].size();
    queue<pair<int,int>> q;
    vector<vector<int>> dist(m,vector<int>(n,-1));
    // Enqueue all sources first
    for(int r=0;r<m;r++) for(int c=0;c<n;c++)
        if(grid[r][c]==SOURCE) { dist[r][c]=0; q.push({r,c}); }
    // Standard BFS propagation
    int dx[]={0,0,1,-1}, dy[]={1,-1,0,0};
    while(!q.empty()){
        auto[r,c]=q.front();q.pop();
        for(int d=0;d<4;d++){
            int nr=r+dx[d],nc=c+dy[d];
            if(nr>=0&&nr<m&&nc>=0&&nc<n&&dist[nr][nc]==-1&&grid[nr][nc]==PASSABLE){
                dist[nr][nc]=dist[r][c]+1;
                q.push({nr,nc});
            }
        }
    }
}`,python:`def multi_source_bfs(grid):
    m,n=len(grid),len(grid[0])
    dist=[[-1]*n for _ in range(m)]
    q=deque()
    for r in range(m):
        for c in range(n):
            if grid[r][c]==SOURCE: dist[r][c]=0; q.append((r,c))
    while q:
        r,c=q.popleft()
        for nr,nc in[(r+1,c),(r-1,c),(r,c+1),(r,c-1)]:
            if 0<=nr<m and 0<=nc<n and dist[nr][nc]==-1 and grid[nr][nc]==PASSABLE:
                dist[nr][nc]=dist[r][c]+1; q.append((nr,nc))`}}),e.jsx(g,{children:"BFS Applications Cheatsheet"}),e.jsx(D,{heads:["Problem Pattern","BFS Application","Example"],rows:[["Shortest path (unweighted)","BFS from source, dist[] array","LC 1091 shortest path in binary matrix"],["Connected components","BFS from each unvisited node","LC 200 number of islands"],["Multi-source shortest path","Enqueue all sources at dist=0","LC 994 rotting oranges"],["Level-order tree traversal","BFS with queue-size snapshot","LC 102 binary tree level order"],["Bipartite check","BFS 2-coloring","LC 785 is graph bipartite"],["Flood fill","BFS/DFS from source cell","LC 733 flood fill"]]}),e.jsx(E,{q:"Why is BFS guaranteed to find the shortest path in unweighted graphs?",a:"BFS explores nodes in strictly increasing order of distance from the source. Level 0 = source, level 1 = all distance-1 nodes, etc. When we first reach a node, it's via the shortest path — because any longer path would arrive later (at a deeper BFS level). This guarantee breaks for weighted graphs (use Dijkstra instead) and also breaks if you mark visited at dequeue instead of enqueue (a node might be queued multiple times via different paths)."})]})}function he(){return e.jsxs("div",{children:[e.jsx(g,{children:"DFS — Go Deep First"}),e.jsx(x,{children:'DFS explores as deep as possible before backtracking. Uses the call stack (recursive) or an explicit stack (iterative). The order of visiting depends on neighbor ordering — but all algorithms share the "explore fully before backtracking" property.'}),e.jsx(C,{color:"info",icon:"ti-arrow-right",children:"In BFS, switch tabs above. In DFS tab: watch the call stack grow as recursion deepens, and shrink as each node backtracks."}),e.jsx(y,{children:{cpp:`// Recursive DFS
void dfs(vector<vector<int>>& adj, vector<bool>& vis, int u) {
    vis[u] = true;
    process(u);                  // do whatever with this node
    for (int v : adj[u])
        if (!vis[v]) dfs(adj, vis, v);
}

// Iterative DFS (stack — note: neighbor order reversed vs recursive)
void dfsIter(vector<vector<int>>& adj, int src, int V) {
    vector<bool> vis(V, false);
    stack<int> st; st.push(src); vis[src] = true;
    while (!st.empty()) {
        int u = st.top(); st.pop();
        process(u);
        for (int v : adj[u])         // push in REVERSE for same order as recursive
            if (!vis[v]) { vis[v]=true; st.push(v); }
    }
}`,python:`def dfs(adj, u, visited):
    visited.add(u)
    process(u)
    for v in adj[u]:
        if v not in visited:
            dfs(adj, v, visited)

# Count connected components:
def count_components(adj, V):
    visited = set(); count = 0
    for u in range(V):
        if u not in visited:
            dfs(adj, u, visited)
            count += 1
    return count`}}),e.jsx(g,{children:"Cycle Detection — Undirected Graph"}),e.jsx(x,{children:"A cycle exists if during DFS we encounter an already-visited node that isn't our direct parent. The parent check avoids false positives from back-edges (undirected edges revisited in the opposite direction)."}),e.jsx(y,{children:{cpp:`bool hasCycleUndirected(vector<vector<int>>& adj, int V) {
    vector<bool> vis(V, false);

    function<bool(int, int)> dfs = [&](int u, int parent) -> bool {
        vis[u] = true;
        for (int v : adj[u]) {
            if (!vis[v]) {
                if (dfs(v, u)) return true;
            } else if (v != parent) {   // visited but not parent → cycle!
                return true;
            }
        }
        return false;
    };

    for (int u = 0; u < V; u++)
        if (!vis[u] && dfs(u, -1)) return true;
    return false;
}
// [0-1-2-0]: dfs(0,-1)→vis 0→dfs(1,0)→vis 1→dfs(2,1)→vis 2
// check neighbor 0: vis[0]=true, 0≠parent(1) → CYCLE!`,python:`def has_cycle_undirected(adj, V):
    vis = set()
    def dfs(u, parent):
        vis.add(u)
        for v in adj[u]:
            if v not in vis:
                if dfs(v, u): return True
            elif v != parent:   # visited but not parent → back edge → cycle
                return True
        return False
    for u in range(V):
        if u not in vis and dfs(u, -1): return True
    return False`}}),e.jsx(g,{children:"Cycle Detection — Directed Graph (3-Color DFS)"}),e.jsx(x,{children:'In directed graphs, "visited but not parent" is insufficient — edges can legitimately revisit nodes in different DFS trees. Instead, use 3 colors: WHITE (unvisited), GRAY (in current DFS path), BLACK (fully processed). A back edge to a GRAY node = cycle.'}),e.jsx(y,{children:{cpp:`enum Color { WHITE, GRAY, BLACK };
bool hasCycleDirected(vector<vector<int>>& adj, int V) {
    vector<Color> color(V, WHITE);

    function<bool(int)> dfs = [&](int u) -> bool {
        color[u] = GRAY;          // mark as "in current path"
        for (int v : adj[u]) {
            if      (color[v]==GRAY)  return true;   // back edge → cycle!
            else if (color[v]==WHITE && dfs(v)) return true;
        }
        color[u] = BLACK;         // fully explored, no cycle from u
        return false;
    };

    for (int u = 0; u < V; u++)
        if (color[u]==WHITE && dfs(u)) return true;
    return false;
}
// GRAY = "currently on DFS call stack". Back edge to GRAY node = cycle.`,python:`def has_cycle_directed(adj, V):
    WHITE,GRAY,BLACK=0,1,2
    color=[WHITE]*V
    def dfs(u):
        color[u]=GRAY
        for v in adj[u]:
            if color[v]==GRAY:return True      # back edge!
            if color[v]==WHITE and dfs(v):return True
        color[u]=BLACK; return False
    return any(color[u]==WHITE and dfs(u) for u in range(V))`}}),e.jsx(g,{children:"DFS Properties and Applications"}),e.jsx(D,{heads:["Application","DFS Mechanism","Complexity"],rows:[["Connected components","DFS from each unvisited vertex","O(V+E)"],["Cycle detection (undirected)","Parent check on revisited node","O(V+E)"],["Cycle detection (directed)","3-color (white/gray/black)","O(V+E)"],["Topological sort","Record nodes on DFS finish (post-order)","O(V+E)"],["Strongly Connected Components","Kosaraju's or Tarjan's","O(V+E)"],["Bridges and articulation points","DFS with discovery/low times","O(V+E)"],["Path finding (any path)","DFS with backtracking","O(V+E)"]]}),e.jsx(E,{q:"When does a 3-node DFS cause false cycle detection in undirected graphs without the parent check?",a:"Without parent check: if edge A-B exists and we DFS from A, we visit B, then B sees A (already visited). Without the parent check, B would think: 'A is visited and A≠parent — cycle!' But there's no cycle — it's just the same edge traversed from both ends. The fix: only flag a visited node as a cycle if it's not the node we came from (parent). This is specific to undirected graphs; directed graphs use the 3-color scheme instead."})]})}function fe(){return e.jsxs("div",{children:[e.jsxs(C,{color:"warning",icon:"ti-arrow-right",children:[e.jsx("strong",{children:"Topological sort"})," linearly orders vertices of a DAG such that for every directed edge u→v, u comes before v. Only possible if the graph has NO cycles. Used for: build systems, course scheduling, dependency resolution, compilation order."]}),e.jsx(g,{children:"Kahn's Algorithm (BFS-Based) — Interactive"}),e.jsx(x,{children:"Remove nodes with in-degree 0 iteratively. Each removal reduces in-degrees of neighbors. If all V nodes are output → valid topo order. If fewer → cycle exists."}),e.jsx(ce,{}),e.jsx(y,{children:{cpp:`vector<int> topoKahn(vector<vector<int>>& adj, int V) {
    vector<int> inDeg(V, 0);
    for (int u=0; u<V; u++)
        for (int v : adj[u]) inDeg[v]++;

    queue<int> q;
    for (int u=0; u<V; u++)
        if (inDeg[u]==0) q.push(u);

    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--inDeg[v] == 0) q.push(v);   // in-degree drops to 0 → add to queue
        }
    }
    if (order.size() != V) return {};  // cycle detected!
    return order;
}
// Time: O(V+E)  Space: O(V)`,python:`from collections import deque
def topo_kahn(adj, V):
    in_deg=[0]*V
    for u in range(V):
        for v in adj[u]: in_deg[v]+=1
    q=deque(u for u in range(V) if in_deg[u]==0)
    order=[]
    while q:
        u=q.popleft(); order.append(u)
        for v in adj[u]:
            in_deg[v]-=1
            if in_deg[v]==0: q.append(v)
    return order if len(order)==V else []  # empty = cycle`}}),e.jsx(g,{children:"DFS-Based Topological Sort"}),e.jsx(x,{children:"Complete DFS on all nodes. When a node is fully processed (all its successors visited), prepend it to the result. The reversal of DFS finish order = valid topological order."}),e.jsx(y,{children:{cpp:`vector<int> topoDFS(vector<vector<int>>& adj, int V) {
    vector<bool> vis(V, false);
    stack<int> stk;              // stores nodes in reverse finish order

    function<void(int)> dfs = [&](int u) {
        vis[u] = true;
        for (int v : adj[u])
            if (!vis[v]) dfs(v);
        stk.push(u);             // push AFTER all descendants done
    };

    for (int u=0; u<V; u++)
        if (!vis[u]) dfs(u);

    vector<int> order;
    while (!stk.empty()) { order.push_back(stk.top()); stk.pop(); }
    return order;               // pop order = topo order
}
// Equivalent: reverse of DFS post-order finish times`,python:`def topo_dfs(adj, V):
    vis=set(); order=[]
    def dfs(u):
        vis.add(u)
        for v in adj[u]:
            if v not in vis: dfs(v)
        order.append(u)    # append AFTER all descendants
    for u in range(V):
        if u not in vis: dfs(u)
    return order[::-1]     # reverse = topological order`}}),e.jsxs(W,{cols:2,children:[e.jsx(B,{title:"Kahn's (BFS)",color:"info",children:"Naturally detects cycles: if output.size() < V, a cycle prevents some nodes from ever reaching in-degree 0. Easier to reason about."}),e.jsx(B,{title:"DFS post-order",color:"success",children:"Works by noting that a node should come before all its descendants. Push to stack after all successors done. Reverse = topo order."})]}),e.jsx(g,{children:"Classic Interview Problems — Topological Sort"}),e.jsx(y,{children:{cpp:`// Course Schedule (LC 207): can all courses be taken?
// → Check if a DAG has no cycle → run Kahn's, check output.size()==numCourses

// Course Schedule II (LC 210): return a valid order
// → Return Kahn's output (or empty if cycle)

// Build order: package A depends on B,C; B depends on C
// → Build dependency graph (directed), run topo sort

// Alien Dictionary (LC 269): infer character order from sorted words
// → Build char-ordering graph from adjacent word comparisons, topo sort chars`,python:`# Course Schedule pattern:
def can_finish(numCourses, prerequisites):
    adj=[[] for _ in range(numCourses)]
    in_deg=[0]*numCourses
    for a,b in prerequisites:
        adj[b].append(a); in_deg[a]+=1
    q=deque(i for i in range(numCourses) if in_deg[i]==0)
    count=0
    while q:
        u=q.popleft(); count+=1
        for v in adj[u]:
            in_deg[v]-=1
            if in_deg[v]==0: q.append(v)
    return count==numCourses  # True = no cycle = can finish all courses`}}),e.jsx(E,{q:"Can a graph have multiple valid topological orderings? Which algorithm gives the lexicographically smallest?",a:"Yes — any DAG with vertices of in-degree 0 simultaneously can choose any of them first, giving multiple valid orderings. For lexicographically smallest: use Kahn's algorithm with a MIN-HEAP instead of a regular queue. This ensures that among all valid candidates at each step, the smallest vertex is chosen first. Time: O((V+E) log V) due to the heap."})]})}function ge(){return e.jsxs("div",{children:[e.jsx(C,{color:"purple",icon:"ti-tournament",children:"6 graph problems — LC 200, 994, 102, 133 (prescribed) plus 2 topology/cycle problems. All foundational patterns for any graph interview."}),e.jsx(j,{num:1,title:"Number of Islands",difficulty:"LC Medium",tags:["LC 200","Grid DFS/BFS"],statement:"Given an m×n grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent (4-directional) land cells.",constraints:["1 ≤ m,n ≤ 300","grid[i][j] is '0' or '1'"],examples:[{input:'[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',output:"3"}],approach:"For each unvisited '1', run BFS/DFS to mark the entire island as visited (sink it: flip to '0' in-place). Count how many BFS/DFS calls are made. Each call discovers one island. O(m×n) time and space.",code:{cpp:`int numIslands(vector<vector<char>>& grid){
    int m=grid.size(),n=grid[0].size(),count=0;
    auto bfs=[&](int r,int c){
        queue<pair<int,int>>q;q.push({r,c});grid[r][c]='0';
        while(!q.empty()){auto[x,y]=q.front();q.pop();
            for(auto[dx,dy]:vector<pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}})
                if(x+dx>=0&&x+dx<m&&y+dy>=0&&y+dy<n&&grid[x+dx][y+dy]=='1')
                    {grid[x+dx][y+dy]='0';q.push({x+dx,y+dy});}
        }
    };
    for(int r=0;r<m;r++) for(int c=0;c<n;c++)
        if(grid[r][c]=='1'){bfs(r,c);count++;}
    return count;
}`,python:`def num_islands(grid):
    m,n=len(grid),len(grid[0]); count=0
    def bfs(r,c):
        q=deque([(r,c)]); grid[r][c]='0'
        while q:
            x,y=q.popleft()
            for nx,ny in[(x+1,y),(x-1,y),(x,y+1),(x,y-1)]:
                if 0<=nx<m and 0<=ny<n and grid[nx][ny]=='1':
                    grid[nx][ny]='0'; q.append((nx,ny))
    for r in range(m):
        for c in range(n):
            if grid[r][c]=='1':bfs(r,c);count+=1
    return count`}}),e.jsx(j,{num:2,title:"Rotting Oranges",difficulty:"LC Medium",tags:["LC 994","Multi-Source BFS"],statement:"Grid with 0=empty, 1=fresh, 2=rotten oranges. Each minute, rotten oranges spread to adjacent fresh ones. Return the minimum minutes until no fresh orange remains, or -1 if impossible.",constraints:["1 ≤ m,n ≤ 10","grid[i][j] is 0,1, or 2"],examples:[{input:"[[2,1,1],[1,1,0],[0,1,1]]",output:"4"},{input:"[[2,1,1],[0,1,1],[1,0,1]]",output:"-1",note:"Bottom-left orange isolated"}],approach:"Multi-source BFS: enqueue ALL initially rotten oranges at time=0. BFS spreads rot simultaneously from all sources — naturally computes minimum time. After BFS, if any '1' remains → return -1. Time complexity O(m×n).",code:{cpp:`int orangesRotting(vector<vector<int>>& g){
    int m=g.size(),n=g[0].size(),fresh=0,time=0;
    queue<pair<int,int>>q;
    for(int r=0;r<m;r++) for(int c=0;c<n;c++){
        if(g[r][c]==2) q.push({r,c});
        if(g[r][c]==1) fresh++;
    }
    int dx[]={1,-1,0,0},dy[]={0,0,1,-1};
    while(!q.empty()&&fresh>0){
        int sz=q.size(); time++;
        while(sz--){auto[r,c]=q.front();q.pop();
            for(int d=0;d<4;d++){int nr=r+dx[d],nc=c+dy[d];
                if(nr>=0&&nr<m&&nc>=0&&nc<n&&g[nr][nc]==1)
                    {g[nr][nc]=2;fresh--;q.push({nr,nc});}
            }
        }
    }
    return fresh==0?time:-1;
}`,python:`def oranges_rotting(grid):
    m,n=len(grid),len(grid[0]); q=deque(); fresh=0
    for r in range(m):
        for c in range(n):
            if grid[r][c]==2:q.append((r,c,0))
            elif grid[r][c]==1:fresh+=1
    time=0
    while q:
        r,c,t=q.popleft()
        for nr,nc in[(r+1,c),(r-1,c),(r,c+1),(r,c-1)]:
            if 0<=nr<m and 0<=nc<n and grid[nr][nc]==1:
                grid[nr][nc]=2;fresh-=1;time=t+1;q.append((nr,nc,t+1))
    return time if fresh==0 else -1`}}),e.jsx(j,{num:3,title:"Binary Tree Level Order Traversal",difficulty:"LC Medium",tags:["LC 102","BFS Tree"],statement:"Given the root of a binary tree, return the level order traversal of its nodes' values as a list of lists (each level as a sublist).",constraints:["0 ≤ nodes ≤ 2000","-1000 ≤ val ≤ 1000"],examples:[{input:"[3,9,20,null,null,15,7]",output:"[[3],[9,20],[15,7]]"}],approach:"BFS with queue-size snapshot: at the start of each level, record queue.size() — that's exactly how many nodes belong to this level. Process exactly that many nodes, building the level array. Add children of processed nodes for the next level.",code:{cpp:`vector<vector<int>> levelOrder(TreeNode* root){
    if(!root)return{};
    vector<vector<int>> res; queue<TreeNode*> q; q.push(root);
    while(!q.empty()){int sz=q.size();vector<int>lv;
        while(sz--){auto n=q.front();q.pop();lv.push_back(n->val);
            if(n->left)q.push(n->left);if(n->right)q.push(n->right);}
        res.push_back(lv);}
    return res;
}`,python:`def level_order(root):
    if not root:return[]
    res=[];q=deque([root])
    while q:
        lv=[];sz=len(q)
        for _ in range(sz):
            n=q.popleft();lv.append(n.val)
            if n.left:q.append(n.left)
            if n.right:q.append(n.right)
        res.append(lv)
    return res`}}),e.jsx(j,{num:4,title:"Clone Graph",difficulty:"LC Medium",tags:["LC 133","DFS/BFS + HashMap"],statement:"Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a val and list of neighbors.",constraints:["1 ≤ nodes ≤ 100","All node values are unique","No repeated edges or self-loops"],examples:[{input:"adjList=[[2,4],[1,3],[2,4],[1,3]]",output:"deep copy with same structure"}],approach:"DFS/BFS with a hash map {original → clone}. When visiting a node: if already in map, return the clone. Otherwise, create new clone node, add to map, then recursively clone all neighbors and add them to clone's neighbor list. O(V+E) time and space.",code:{cpp:`unordered_map<Node*,Node*> mp;
Node* cloneGraph(Node* n){
    if(!n)return nullptr;
    if(mp.count(n))return mp[n];
    Node* clone=new Node(n->val);
    mp[n]=clone;
    for(Node* nb:n->neighbors) clone->neighbors.push_back(cloneGraph(nb));
    return clone;
}`,python:`def clone_graph(node):
    if not node:return None
    mp={}
    def dfs(n):
        if n in mp:return mp[n]
        clone=Node(n.val); mp[n]=clone
        clone.neighbors=[dfs(nb) for nb in n.neighbors]
        return clone
    return dfs(node)`}}),e.jsx(j,{num:5,title:"Course Schedule (Cycle Detection)",difficulty:"LC Medium",tags:["LC 207","Topological Sort"],statement:"There are <code>numCourses</code> courses labeled 0..numCourses-1. <code>prerequisites[i]=[ai,bi]</code> means you must take bi before ai. Return true if you can finish all courses.",constraints:["1 ≤ numCourses ≤ 2000","0 ≤ prerequisites.length ≤ 5000"],examples:[{input:"numCourses=2, prerequisites=[[1,0]]",output:"true",note:"Take 0 then 1"},{input:"numCourses=2, prerequisites=[[1,0],[0,1]]",output:"false",note:"Circular dependency"}],approach:"Build directed graph. Run Kahn's topological sort. If all V courses appear in output → no cycle → can finish. Else a cycle blocks some courses. Alternative: DFS 3-color cycle detection.",code:{cpp:`bool canFinish(int n,vector<vector<int>>& pre){
    vector<vector<int>> adj(n); vector<int> deg(n,0);
    for(auto& p:pre){adj[p[1]].push_back(p[0]);deg[p[0]]++;}
    queue<int> q; for(int i=0;i<n;i++) if(deg[i]==0) q.push(i);
    int done=0;
    while(!q.empty()){int u=q.front();q.pop();done++;
        for(int v:adj[u]) if(--deg[v]==0) q.push(v);}
    return done==n;
}`,python:`def can_finish(n,prerequisites):
    adj=[[] for _ in range(n)];deg=[0]*n
    for a,b in prerequisites:adj[b].append(a);deg[a]+=1
    q=deque(i for i in range(n) if deg[i]==0);done=0
    while q:
        u=q.popleft();done+=1
        for v in adj[u]:
            deg[v]-=1
            if deg[v]==0:q.append(v)
    return done==n`}}),e.jsx(j,{num:6,title:"Is Graph Bipartite?",difficulty:"LC Medium",tags:["LC 785","BFS 2-Coloring"],statement:"Given an undirected graph with n nodes, return true if the graph is bipartite — i.e., nodes can be split into two groups such that every edge connects a node from group 0 to a node from group 1.",constraints:["1 ≤ n ≤ 100","0 ≤ graph[i].length < n","No self-loops or repeated edges"],examples:[{input:"graph=[[1,3],[0,2],[1,3],[0,2]]",output:"true",note:"Group {0,2} and {1,3}"},{input:"graph=[[1,2,3],[0,2],[0,1,3],[0,2]]",output:"false"}],approach:"BFS 2-coloring: assign source color 0. Neighbors must get color 1 (opposite). If we encounter a neighbor with the same color as the current node → not bipartite. Process all components (not just one). A graph is bipartite iff it contains no odd-length cycle.",code:{cpp:`bool isBipartite(vector<vector<int>>& g){
    int n=g.size(); vector<int> col(n,-1);
    for(int s=0;s<n;s++){if(col[s]!=-1)continue;
        queue<int> q; q.push(s); col[s]=0;
        while(!q.empty()){int u=q.front();q.pop();
            for(int v:g[u]){if(col[v]==-1){col[v]=1-col[u];q.push(v);}
                else if(col[v]==col[u])return false;}
        }
    }
    return true;
}`,python:`def is_bipartite(graph):
    n=len(graph);col=[-1]*n
    for s in range(n):
        if col[s]!=-1:continue
        q=deque([s]);col[s]=0
        while q:
            u=q.popleft()
            for v in graph[u]:
                if col[v]==-1:col[v]=1-col[u];q.append(v)
                elif col[v]==col[u]:return False
    return True`}})]})}const ve=[{id:"fundamentals",label:"Fundamentals"},{id:"bfs",label:"BFS"},{id:"dfs",label:"DFS & Cycle Detection"},{id:"topo",label:"Topological Sort"},{id:"problems",label:"Problems"}];function xe(){const[s,a]=w.useState("fundamentals"),t={fundamentals:e.jsx(ue,{}),bfs:e.jsx(pe,{}),dfs:e.jsx(he,{}),topo:e.jsx(fe,{}),problems:e.jsx(ge,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 21"}),e.jsx("h1",{className:"page-header-title",children:"Graphs — Fundamentals"}),e.jsx("p",{className:"page-header-subtitle",children:"Types · Representation · BFS · DFS · Cycle Detection · Topological Sort (Kahn's + DFS) · LC 200, 994, 102, 133"})]}),e.jsx(Q,{tabs:ve,active:s,onChange:a}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:t[s]}),e.jsx(X,{moduleId:21})]})}export{xe as default};
