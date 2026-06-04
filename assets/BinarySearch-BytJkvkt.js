import{r as w,j as e}from"./index-D9jkHkZY.js";import{S as B,N as L,d as S,H as p,P as g,a as x,Q as b,c as y,G as $,C as F,T as _,V as R}from"./SectionNav-BHzhBu3R.js";const j=[1,3,5,7,9,11,13,15];function T(o,s){const r=[];let t=0,n=o.length-1;for(r.push({lo:t,hi:n,mid:-1,action:"init",desc:`Search for target = ${s}.  lo=${t}, hi=${n}.`});t<=n;){const i=t+Math.floor((n-t)/2);if(o[i]===s)return r.push({lo:t,hi:n,mid:i,action:"found",desc:`mid=${i}: arr[${i}]=${o[i]} = ${s}  ✓  Found at index ${i}!`}),r;o[i]<s?(r.push({lo:t,hi:n,mid:i,action:"right",desc:`mid=${i}: arr[${i}]=${o[i]} < ${s}  →  discard left half. lo = ${i+1}`}),t=i+1):(r.push({lo:t,hi:n,mid:i,action:"left",desc:`mid=${i}: arr[${i}]=${o[i]} > ${s}  →  discard right half. hi = ${i-1}`}),n=i-1)}return r.push({lo:t,hi:n,mid:-1,action:"not-found",desc:`lo(${t}) > hi(${n}) — search space exhausted. ${s} not in array.`}),r}const C=[0,0,0,1,1,1,1];function M(o){const s=[];let r=0,t=o.length-1,n=-1;for(s.push({lo:r,hi:t,mid:-1,ans:n,action:"init",desc:"Find FIRST 1. check(mid) = arr[mid]==1. When true → record ans, keep searching LEFT for earlier occurrence."});r<=t;){const i=r+Math.floor((t-r)/2);o[i]===1?(n=i,s.push({lo:r,hi:t,mid:i,ans:n,action:"true",desc:`mid=${i}: arr[${i}]=1  ✓ check true → candidate ans=${i}. Search left for earlier: hi=${i-1}`}),t=i-1):(s.push({lo:r,hi:t,mid:i,ans:n,action:"false",desc:`mid=${i}: arr[${i}]=0  ✗ check false → go right: lo=${i+1}`}),r=i+1)}return s.push({lo:r,hi:t,mid:-1,ans:n,action:"done",desc:`Complete!  First 1 at index ${n} (value: arr[${n}] = ${o[n]}).`}),s}const z=[4,5,6,7,0,1,2];function O(o){const s=[],r=o.length;let t=0,n=r-1,i=-1;for(s.push({lo:t,hi:n,mid:-1,ans:i,action:"init",desc:`Find minimum in rotated array. check(mid) = arr[mid] ≤ arr[${r-1}]=${o[r-1]} (is mid in the lower/right half?)`});t<=n;){const a=t+Math.floor((n-t)/2);o[a]<=o[r-1]?(i=a,s.push({lo:t,hi:n,mid:a,ans:i,action:"true",desc:`mid=${a}: arr[${a}]=${o[a]} ≤ arr[${r-1}]=${o[r-1]}  ✓ → candidate ans=${a}, search LEFT: hi=${a-1}`}),n=a-1):(s.push({lo:t,hi:n,mid:a,ans:i,action:"false",desc:`mid=${a}: arr[${a}]=${o[a]} > arr[${r-1}]=${o[r-1]}  ✗ → in upper portion, go RIGHT: lo=${a+1}`}),t=a+1)}return s.push({lo:t,hi:n,mid:-1,ans:i,action:"done",desc:`Done!  Minimum element: arr[${i}] = ${o[i]} at index ${i}.`}),s}const A=[1,3,8,12,4,2];function I(o){const s=[];let r=1,t=o.length-1,n=0;for(s.push({lo:r,hi:t,mid:-1,peak:n,action:"init",desc:"Find PEAK (maximum) in bitonic array. check(mid) = arr[mid]>arr[mid-1] (still ascending → peak is to the right or here)"});r<=t;){const i=r+Math.floor((t-r)/2);o[i]>o[i-1]?(n=i,s.push({lo:r,hi:t,mid:i,peak:n,action:"true",desc:`mid=${i}: arr[${i}]=${o[i]} > arr[${i-1}]=${o[i-1]}  ✓ ascending → peak=mid or further right. lo=${i+1}`}),r=i+1):(s.push({lo:r,hi:t,mid:i,peak:n,action:"false",desc:`mid=${i}: arr[${i}]=${o[i]} ≤ arr[${i-1}]=${o[i-1]}  ✗ descending → peak is to the left. hi=${i-1}`}),t=i-1)}return s.push({lo:r,hi:t,mid:-1,peak:n,action:"done",desc:`Done!  Peak element: arr[${n}]=${o[n]} at index ${n}.`}),s}const W={9:T(j,9),1:T(j,1),13:T(j,13),6:T(j,6)},E=M(C),P=O(z),H=I(A);function G(){const[o,s]=w.useState(9),[r,t]=w.useState(0),n=W[o],i=n[Math.min(r,n.length-1)],a=h=>{s(h),t(0)};return e.jsxs(R,{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,color:"var(--color-text-secondary)"},children:"Target:"}),[9,1,13,6].map(h=>e.jsxs("button",{onClick:()=>a(h),style:{padding:"4px 12px",border:"1px solid",borderColor:o===h?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:o===h?"var(--color-background-info)":"transparent",color:o===h?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-mono)",fontWeight:600},children:[h,h===6?" (not found)":""]},h)),e.jsxs("div",{style:{marginLeft:"auto",fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)"},children:[n.length," steps total"]})]}),e.jsx("div",{style:{marginBottom:14,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:i.desc}),e.jsx("div",{style:{display:"flex",gap:4,justifyContent:"center",marginBottom:14},children:j.map((h,u)=>{const c=u===i.mid,d=u===i.lo&&i.action!=="found"&&i.action!=="not-found"&&i.action!=="done",m=u===i.hi&&i.action!=="found"&&i.action!=="not-found"&&i.action!=="done",l=i.lo>=0&&u>=i.lo&&u<=i.hi&&i.mid!==-1,f=i.action!=="init"&&!l&&i.mid===-1,v=c&&i.action==="found"?"success":c&&(i.action==="right"||i.action==="left")?"warning":l&&!c?"info":null;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",fontWeight:700,color:d?"var(--color-text-success)":m?"var(--color-text-danger)":c?"var(--color-text-warning)":"transparent",minHeight:12},children:d&&m?"l=h":d?"lo":m?"hi":c?"mid":""}),e.jsx("div",{style:{width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:v?`var(--color-border-${v})`:"var(--color-border-secondary)",background:v?`var(--color-background-${v})`:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:v?700:400,color:v?`var(--color-text-${v})`:"var(--color-text-secondary)",opacity:f?.35:1,transition:"all 0.18s"},children:h}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",u,"]"]})]},u)})}),i.mid!==-1&&e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",marginBottom:14,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("span",{style:{color:"var(--color-text-success)"},children:["lo=",i.lo]}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"·"}),e.jsxs("span",{style:{color:"var(--color-text-warning)"},children:["mid=",i.mid]}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"·"}),e.jsxs("span",{style:{color:"var(--color-text-danger)"},children:["hi=",i.hi]}),e.jsxs("span",{style:{color:"var(--color-text-tertiary)",marginLeft:8},children:["range=",i.hi-i.lo+1]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>t(Math.max(0,r-1)),r===0],["Next →",()=>t(Math.min(n.length-1,r+1)),r===n.length-1]].map(([h,u,c])=>e.jsx("button",{onClick:u,disabled:c,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:c?"not-allowed":"pointer",fontSize:12,opacity:c?.4:1},children:h},h)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r+1,"/",n.length]}),e.jsx("button",{onClick:()=>t(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}function q(){const[o,s]=w.useState("first"),[r,t]=w.useState(0),i={first:{arr:C,steps:E,label:"First 1 in [0,0,0,1,1,1,1]",pivotLabel:null},rot:{arr:z,steps:P,label:"Min in Rotated [4,5,6,7,0,1,2]",pivotLabel:"min"},bito:{arr:A,steps:H,label:"Peak in Bitonic [1,3,8,12,4,2]",pivotLabel:"peak"}}[o],a=i.steps[Math.min(r,i.steps.length-1)],h=d=>{s(d),t(0)},u=d=>a.action==="done"&&(a.ans===d||a.peak===d)||d===a.mid&&a.action==="true"?"success":d===a.mid&&a.action==="false"?"danger":d===a.mid&&a.action==="init"?null:a.mid>=0&&d>=(a.lo??0)&&d<=(a.hi??i.arr.length-1)?"info":null,c=a.ans??a.peak??-1;return e.jsxs(R,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:14},children:[["first","First Occurrence"],["rot","Rotated Min"],["bito","Bitonic Peak"]].map(([d,m])=>e.jsx("button",{onClick:()=>h(d),style:{padding:"4px 10px",border:"1px solid",borderColor:o===d?"var(--color-border-info)":"var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:o===d?"var(--color-background-info)":"transparent",color:o===d?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontSize:12,fontFamily:"var(--font-sans)"},children:m},d))}),e.jsx("div",{style:{marginBottom:12,padding:"6px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.55},children:a.desc}),e.jsx("div",{style:{display:"flex",gap:4,justifyContent:"center",marginBottom:12},children:i.arr.map((d,m)=>{const l=u(m),f=m===c&&a.action==="done";return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:m===a.mid&&a.action!=="done"?"var(--color-text-warning)":"transparent",minHeight:12,fontWeight:700},children:m===a.mid&&a.action!=="done"?"mid":""}),e.jsx("div",{style:{width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:6,border:"1px solid",borderColor:f?"var(--color-border-success)":l?`var(--color-border-${l})`:"var(--color-border-secondary)",background:f?"var(--color-background-success)":l?`var(--color-background-${l})`:"var(--color-background-secondary)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:l||f?700:400,color:f?"var(--color-text-success)":l?`var(--color-text-${l})`:"var(--color-text-secondary)",transition:"all 0.18s"},children:d}),e.jsxs("span",{style:{fontSize:9,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["[",m,"]"]})]},m)})}),a.action==="done"&&c>=0&&e.jsx("div",{style:{textAlign:"center",marginBottom:12,fontFamily:"var(--font-mono)",fontSize:12},children:e.jsxs("span",{style:{padding:"3px 12px",background:"var(--color-background-success)",border:"1px solid var(--color-border-success)",borderRadius:20,color:"var(--color-text-success)",fontWeight:700},children:["ans = index ",c,"  (value: ",i.arr[c],")"]})}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center"},children:[[["← Prev",()=>t(Math.max(0,r-1)),r===0],["Next →",()=>t(Math.min(i.steps.length-1,r+1)),r===i.steps.length-1]].map(([d,m,l])=>e.jsx("button",{onClick:m,disabled:l,style:{padding:"5px 14px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:l?"not-allowed":"pointer",fontSize:12,opacity:l?.4:1},children:d},d)),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--color-text-tertiary)",minWidth:60,textAlign:"center",alignSelf:"center"},children:[r+1,"/",i.steps.length]}),e.jsx("button",{onClick:()=>t(0),style:{padding:"5px 9px",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:12},children:"↺"})]})]})}const N={"IIT OA":"info","OA Easy":"success","OA Medium":"warning","OA Hard":"danger","LC Medium":"info","LC Hard":"purple"};function k({num:o,title:s,difficulty:r,tags:t=[],statement:n,constraints:i=[],examples:a=[],approach:h,code:u}){const[c,d]=w.useState(!1),m=N[r]||"info";return e.jsxs("div",{style:{border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:"var(--color-background-secondary)",borderBottom:"1px solid var(--color-border-tertiary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:10.5,fontWeight:700,color:"var(--color-text-tertiary)",minWidth:26},children:["Q",o]}),e.jsx("span",{style:{fontSize:13.5,fontWeight:600,color:"var(--color-text-primary)"},children:s})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[t.map(l=>e.jsx("span",{style:{padding:"1px 7px",borderRadius:12,fontSize:10.5,background:"var(--color-background-tertiary)",color:"var(--color-text-tertiary)",fontWeight:500},children:l},l)),e.jsx("span",{style:{padding:"2px 9px",borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${m})`,color:`var(--color-text-${m})`,border:`1px solid var(--color-border-${m})`},children:r})]})]}),e.jsxs("div",{style:{padding:"14px 16px"},children:[e.jsx("p",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.72,marginBottom:12},dangerouslySetInnerHTML:{__html:n}}),i.length>0&&e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:10.5,fontWeight:600,color:"var(--color-text-tertiary)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5},children:"Constraints"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5},children:i.map((l,f)=>e.jsx("code",{style:{padding:"2px 8px",borderRadius:4,fontSize:11.5,background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",border:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)"},children:l},f))})]}),a.length>0&&e.jsx("div",{style:{marginBottom:14},children:a.map((l,f)=>e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"9px 12px",marginBottom:6,fontFamily:"var(--font-mono)",fontSize:12},children:[e.jsxs("div",{style:{color:"var(--color-text-tertiary)",fontSize:10,marginBottom:4,letterSpacing:"0.06em"},children:["EXAMPLE ",f+1]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-success)"},children:"Input: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:l.input})]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:"var(--color-text-info)"},children:"Output: "}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:l.output})]}),l.note&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:11,marginTop:3},children:l.note})]},f))}),e.jsxs("button",{onClick:()=>d(!c),style:{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",border:"1px solid var(--color-border-primary)",borderRadius:"var(--border-radius-md)",background:c?"var(--color-background-secondary)":"transparent",color:"var(--color-text-secondary)",cursor:"pointer",fontSize:12.5,fontFamily:"var(--font-sans)",transition:"all 0.15s"},children:[e.jsx("i",{className:`ti ti-${c?"eye-off":"bulb"}`}),c?"Hide Solution":"Show Approach & Solution"]}),c&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"9px 13px",marginBottom:10,fontSize:13,color:"var(--color-text-info)",lineHeight:1.68},children:[e.jsx("strong",{children:"Approach: "}),h]}),e.jsx(x,{children:u})]})]})]})}function D(){return e.jsxs("div",{children:[e.jsxs(S,{color:"info",icon:"ti-zoom-in",children:[e.jsx("strong",{children:"Core idea:"})," Binary search works on any ",e.jsx("em",{children:"monotonic predicate"})," — a condition that is all-false for some prefix and all-true for the rest (or vice versa). Each step eliminates exactly ",e.jsx("em",{children:"half"})," the remaining search space, giving O(log n) total steps regardless of input size."]}),e.jsx(p,{children:"The Monotonic Predicate — Why Binary Search Works"}),e.jsxs(g,{children:[`The key insight is not "sorted array" — it's `,e.jsx("strong",{children:"monotonicity"}),". If a predicate ",e.jsx(y,{children:"f(x)"})," satisfies ",e.jsx(y,{children:"f(false, false, …, false, true, true, …, true)"}),', binary search finds the boundary in O(log n). Any "is ',e.jsx(y,{children:"x"}),' enough?" question on a sorted or structured domain fits this pattern.']}),e.jsxs($,{cols:2,children:[e.jsxs(F,{title:"Search Space Monotonicity",color:"info",children:["Before the answer: ",e.jsx(y,{children:"f(x) = false"})," (condition not satisfied). After and at the answer: ",e.jsx(y,{children:"f(x) = true"}),". Binary search finds the exact transition point."]}),e.jsxs(F,{title:"The check() Abstraction",color:"success",children:["Encode the condition as a ",e.jsx("code",{children:"check(mid)"})," function. The outer loop never changes — only ",e.jsx("code",{children:"check()"})," changes per problem. This is the most powerful pattern in competitive programming."]})]}),e.jsx(p,{children:"Interactive — Core Binary Search"}),e.jsxs(g,{children:["Step through binary search on array ",e.jsx(y,{children:"[1,3,5,7,9,11,13,15]"}),". Each step the search space halves. Eliminated elements fade. Try all four targets including a not-found case."]}),e.jsx(G,{}),e.jsx(p,{children:"The Universal Template"}),e.jsxs(g,{children:["This single template handles all binary search variants — only the ",e.jsx("code",{children:"check()"})," function and the direction of narrowing change."]}),e.jsx(x,{children:{cpp:`// Universal Binary Search Template
// Search for the FIRST index where check(mid) == true
// Precondition: check is monotone [false, false, ..., true, true, ...]
int lo = 0, hi = n - 1, ans = -1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;   // avoids overflow vs (lo+hi)/2
    if (check(mid)) {
        ans = mid;       // candidate answer — might find a better (smaller) one
        hi  = mid - 1;   // search LEFT for first occurrence
    } else {
        lo  = mid + 1;   // go RIGHT — this mid doesn't satisfy the condition
    }
}
// ans = leftmost index where check is true, or -1 if never true

// Variant: LAST index where check(mid) == true
// (or equivalently: maximize the answer)
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid)) { ans = mid; lo = mid + 1; }  // go RIGHT
    else            { hi  = mid - 1; }
}`,python:`# Universal template — find FIRST index where check(mid) is True
def binary_search(lo, hi, check):
    ans = -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if check(mid):
            ans = mid
            hi  = mid - 1   # search left for earlier true
        else:
            lo  = mid + 1   # go right
    return ans

# Variant: find LAST / maximize
def binary_search_last(lo, hi, check):
    ans = -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if check(mid): ans = mid; lo = mid + 1
        else: hi = mid - 1
    return ans`}}),e.jsxs(S,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"Mid overflow:"})," ",e.jsx("code",{children:"mid = lo + (hi - lo) / 2"})," not ",e.jsx("code",{children:"(lo + hi) / 2"}),". For large values (e.g., lo = 2×10⁹, hi = 3×10⁹), the sum overflows 32-bit int. The subtraction form is always safe."]}),e.jsx(p,{children:"STL / Standard Library — lower_bound and upper_bound"}),e.jsx(x,{children:{cpp:`// lower_bound: first position where arr[i] >= target  (first NOT less than)
// upper_bound: first position where arr[i] >  target  (first greater than)
#include <algorithm>
vector<int> v = {1, 3, 5, 5, 5, 7, 9};

auto it1 = lower_bound(v.begin(), v.end(), 5);   // points to index 2 (first 5)
auto it2 = upper_bound(v.begin(), v.end(), 5);   // points to index 5 (first after 5)

int idx1 = it1 - v.begin();   // = 2
int idx2 = it2 - v.begin();   // = 5
int count = idx2 - idx1;      // = 3  (number of 5s)

// Check if target exists:
if (lower_bound(v.begin(), v.end(), 5) != v.end() && *it1 == 5)
    cout << "Found";`,python:`import bisect
v = [1, 3, 5, 5, 5, 7, 9]

# bisect_left  = lower_bound: leftmost position to insert target
# bisect_right = upper_bound: rightmost position to insert target
left  = bisect.bisect_left(v, 5)   # = 2 (first 5)
right = bisect.bisect_right(v, 5)  # = 5 (after last 5)
count = right - left                # = 3

# Check existence:
if left < len(v) and v[left] == 5: print("Found")`}}),e.jsx(b,{q:"Why does the template use lo <= hi (not lo < hi) as the termination condition?",a:"With <code>lo <= hi</code>, the search terminates when the window is empty (lo > hi), meaning every position has been considered exactly once as a mid-point candidate. If we used <code>lo < hi</code>, we'd exit when lo == hi without checking that last element — potentially missing the answer. The <code>lo <= hi</code> formulation is safer and more universal."}),e.jsx(b,{q:"How is binary search O(log n) — why exactly half each time?",a:"At each step, mid divides the search space [lo, hi] into three parts: left [lo..mid-1], mid, right [mid+1..hi]. We discard either left (lo = mid+1) or right (hi = mid-1). Each discard removes ⌊(hi-lo)/2⌋ elements, so the window size halves at every step. Starting with n elements, after k steps we have n/2ᵏ elements. When n/2ᵏ = 1, k = log₂n. Total work: O(log n)."})]})}function K(){return e.jsxs("div",{children:[e.jsxs(S,{color:"success",icon:"ti-bulb",children:[e.jsx("strong",{children:"The check() paradigm:"})," Every binary search variant can be written as: define a monotonic ",e.jsx("code",{children:"check(mid)"})," function, then run the universal template. The inner loop never changes. Only ",e.jsx("code",{children:"check()"}),' changes. This unifies: first occurrence, lower bound, rotated array minimum, painter partition, and all "binary search on answer" problems.']}),e.jsx(p,{children:"First Occurrence of 1 in a 0/1 Array"}),e.jsxs(g,{children:["From the code given: ",e.jsx("code",{children:"check(mid) = arr[mid] == 1"}),". When true, record as candidate answer and search LEFT (earlier index might also be 1). When false (arr[mid]=0), search RIGHT. The leftmost ",e.jsx("em",{children:"true"})," is the answer."]}),e.jsx(q,{}),e.jsx(x,{children:{cpp:`// First occurrence of 1 in sorted 0/1 array
// Generalizes to: first index satisfying any monotone condition
int firstOne(int arr[], int n) {
    int lo = 0, hi = n - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == 1) {        // check(mid) = arr[mid] == 1
            ans = mid;              // candidate — keep searching left
            hi  = mid - 1;
        } else {
            lo  = mid + 1;
        }
    }
    return ans;
}`,python:`def first_one(arr):
    lo, hi, ans = 0, len(arr) - 1, -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == 1:
            ans = mid
            hi  = mid - 1
        else:
            lo  = mid + 1
    return ans`}}),e.jsx(p,{children:"First and Last Occurrence of a Target"}),e.jsx(x,{children:{cpp:`// First occurrence: first index where arr[i] >= target AND arr[i] == target
// Last occurrence: last index where arr[i] == target
pair<int,int> firstAndLast(vector<int>& arr, int target) {
    // First occurrence: leftmost mid where arr[mid] == target
    int lo = 0, hi = arr.size() - 1, first = -1, last = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) { first = mid; hi = mid - 1; }  // go left
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    // Last occurrence: rightmost mid where arr[mid] == target
    lo = 0; hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) { last = mid; lo = mid + 1; }   // go right
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return {first, last};
}
// [1,2,2,2,3,4] target=2 → {1, 3}`,python:`def first_and_last(arr, target):
    def first():
        lo, hi, ans = 0, len(arr)-1, -1
        while lo <= hi:
            mid = lo + (hi-lo)//2
            if arr[mid] == target: ans = mid; hi = mid - 1
            elif arr[mid] < target: lo = mid + 1
            else: hi = mid - 1
        return ans
    def last():
        lo, hi, ans = 0, len(arr)-1, -1
        while lo <= hi:
            mid = lo + (hi-lo)//2
            if arr[mid] == target: ans = mid; lo = mid + 1
            elif arr[mid] < target: lo = mid + 1
            else: hi = mid - 1
        return ans
    return first(), last()`}}),e.jsx(p,{children:"Check Function Gallery"}),e.jsx(_,{heads:["Problem","check(mid) =","Monotone structure","Template direction"],rows:[["First occurrence of target","arr[mid] == target","[F,F,T,T,T]","First true → hi=mid-1"],["Minimum in rotated array","arr[mid] ≤ arr[n-1]","[F,F,T,T,T]","First true → hi=mid-1"],["Search in rotated array","arr[mid] ≥ target","[F,F,T,T,T]","First true + verify"],["Peak in bitonic","arr[mid] > arr[mid-1]","[T,T,T,F,F]","Last true → lo=mid+1"],["Painter partition (mod 09)","feasible(mid, k painters)","[F,F,T,T,T]","First true → hi=mid-1"],["Koko eating bananas (mod 08)","canEat(mid speed, h hours)","[F,F,T,T,T]","First true → hi=mid-1"]]}),e.jsx(b,{q:"What is the difference between lower_bound and first occurrence search?",a:"<code>lower_bound</code> finds the first index where <code>arr[i] >= target</code> — it doesn't require target to exist. First occurrence search additionally checks that <code>arr[ans] == target</code> — if the target isn't in the array, lower_bound returns the insertion position while first occurrence returns -1. First occurrence: <code>check(mid) = (arr[mid] == target)</code>. Lower bound: <code>check(mid) = (arr[mid] >= target)</code>."}),e.jsx(b,{q:"Can binary search find multiple occurrences efficiently?",a:"Yes. Use <code>lower_bound</code> to find the first occurrence and <code>upper_bound</code> to find one past the last. Their difference is the count. Time: O(log n) per bound lookup. For all indices, binary search gives you the range [first, last] in O(log n) — you can then iterate the range in O(count). This is faster than O(n) linear scan when count ≪ n."})]})}function V(){return e.jsxs("div",{children:[e.jsx(p,{children:"What Is a Rotated Sorted Array?"}),e.jsxs(g,{children:["A sorted array ",e.jsx(y,{children:"[0,1,2,4,5,6,7]"})," rotated by k positions becomes ",e.jsx(y,{children:"[4,5,6,7,0,1,2]"}),". The key property: the array consists of ",e.jsx("strong",{children:"two sorted subarrays"}),". The transition point (minimum element) divides them. All elements in the right half are ≤ the last element; all in the left half are > the last element."]}),e.jsxs($,{cols:2,children:[e.jsxs(F,{title:"Which half is sorted?",color:"info",children:["Compare arr[mid] with arr[hi]. If ",e.jsx("code",{children:"arr[mid] <= arr[hi]"}),", the right half [mid..hi] is sorted. Otherwise the left half [lo..mid] is sorted."]}),e.jsxs(F,{title:"Why compare to arr[n-1]?",color:"success",children:['arr[n-1] is always in the "lower" portion of the rotated array (the part with small values). ',e.jsx("code",{children:"arr[mid] <= arr[n-1]"})," tells us whether mid is in this lower portion — i.e., past the rotation point."]})]}),e.jsx(p,{children:"LC 153 — Find Minimum in Rotated Sorted Array"}),e.jsxs(g,{children:["check(mid) = ",e.jsx("code",{children:"arr[mid] <= arr[n-1]"}),". True means mid is in the lower (right) portion — minimum is at mid or to the left. False means mid is in the upper (left) portion — minimum is strictly to the right."]}),e.jsx(x,{children:{cpp:`int findMin(vector<int>& arr) {
    int lo = 0, hi = arr.size() - 1, ans = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] <= arr[arr.size() - 1]) {  // check: in lower portion
            ans = mid;
            hi  = mid - 1;   // search left for earlier transition
        } else {
            lo  = mid + 1;   // in upper portion, minimum is to the right
        }
    }
    return arr[ans];
}
// [4,5,6,7,0,1,2] → 0 at index 4`,python:`def find_min(arr):
    lo, hi, ans = 0, len(arr) - 1, 0
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] <= arr[-1]:   # in lower portion
            ans = mid; hi = mid - 1
        else:
            lo = mid + 1
    return arr[ans]`}}),e.jsx(p,{children:"LC 33 — Search in Rotated Sorted Array"}),e.jsx(g,{children:"Two-phase approach: first find which half is sorted (compare arr[mid] with arr[lo] or arr[hi]). Then check if target falls within the sorted half — if yes, discard the other half; otherwise discard the sorted half."}),e.jsx(x,{children:{cpp:`int search(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;

        // Which half is sorted?
        if (arr[lo] <= arr[mid]) {                          // LEFT half is sorted
            if (arr[lo] <= target && target < arr[mid])
                hi = mid - 1;   // target in left sorted half
            else
                lo = mid + 1;   // target in right (rotated) half
        } else {                                            // RIGHT half is sorted
            if (arr[mid] < target && target <= arr[hi])
                lo = mid + 1;   // target in right sorted half
            else
                hi = mid - 1;   // target in left (rotated) half
        }
    }
    return -1;
}
// [4,5,6,7,0,1,2], target=0 → 4`,python:`def search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target: return mid
        if arr[lo] <= arr[mid]:          # left half sorted
            if arr[lo] <= target < arr[mid]: hi = mid - 1
            else: lo = mid + 1
        else:                            # right half sorted
            if arr[mid] < target <= arr[hi]: lo = mid + 1
            else: hi = mid - 1
    return -1`}}),e.jsx(b,{q:"Why use arr[lo] <= arr[mid] to determine which half is sorted, not arr[mid] <= arr[hi]?",a:"Both work, but the condition must handle the case where lo == mid (single element — always 'sorted'). With <code>arr[lo] <= arr[mid]</code>: if lo == mid, this is trivially true (same element), correctly treating the left half as sorted. The right condition <code>arr[mid] <= arr[hi]</code> also works but the target-in-range checks must be adjusted accordingly. Consistency with whichever condition you choose matters most — don't mix them."})]})}function U(){return e.jsxs("div",{children:[e.jsxs(S,{color:"info",icon:"ti-trending-up",children:["A ",e.jsx("strong",{children:"bitonic array"})," increases to a peak then decreases. It can be searched in O(log n) by first finding the peak, then running two independent binary searches on each monotone half."]}),e.jsx(p,{children:"Finding the Peak — check(mid) = arr[mid] > arr[mid-1]"}),e.jsxs(g,{children:["The peak is in the ascending portion: ",e.jsx("code",{children:"check(mid) = arr[mid] > arr[mid-1]"}),". True means we're still ascending — peak is at mid or further right (last true). False means we've started descending — peak is to the left. Search for the ",e.jsx("em",{children:"last true"}),"."]}),e.jsx(x,{children:{cpp:`int findPeak(vector<int>& arr) {
    int n = arr.size();
    if (n == 1) return 0;
    if (arr[0] > arr[1]) return 0;
    if (arr[n-1] > arr[n-2]) return n - 1;

    int lo = 1, hi = n - 2, peak = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] > arr[mid - 1]) {  // ascending → peak is here or right
            peak = mid;
            lo   = mid + 1;             // search RIGHT for last-true (maximize)
        } else {
            hi   = mid - 1;             // descending → peak is left
        }
    }
    return peak;
}`,python:`def find_peak(arr):
    n = len(arr)
    if n == 1 or arr[0] > arr[1]: return 0
    if arr[-1] > arr[-2]: return n - 1
    lo, hi, peak = 1, n - 2, 0
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] > arr[mid - 1]:
            peak = mid; lo = mid + 1   # search right (last true)
        else:
            hi = mid - 1
    return peak`}}),e.jsx(p,{children:"Bitonic Search — Full Solution (Given Code)"}),e.jsx(g,{children:"After finding the peak, the left half [0..peak] is sorted ascending (run standard BS), and the right half [peak..n-1] is sorted descending (run BS with reversed comparisons)."}),e.jsx(x,{children:{cpp:`// Bitonic array: find all positions of K
// [1..n-1] 1-indexed positions as per problem statement
vector<int> bitonicSearch(vector<int>& arr, int k) {
    int n = arr.size();

    // Step 1: find peak
    int lo = 1, hi = n - 1, peak = 0;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] > arr[mid - 1]) { peak = mid; lo = mid + 1; }
        else { hi = mid - 1; }
    }

    // Step 2: search ascending half [0..peak]
    vector<int> res;
    lo = 0; hi = peak;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == k)         { res.push_back(mid + 1); break; }
        else if (arr[mid] < k)     { lo = mid + 1; }
        else                       { hi = mid - 1; }
    }

    // Step 3: search descending half [peak..n-1]
    lo = peak; hi = n - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == k)         { res.push_back(mid + 1); break; }
        else if (arr[mid] > k)     { lo = mid + 1; }  // descending: go right for smaller
        else                       { hi = mid - 1; }  // descending: go left for larger
    }
    return res;
}`,python:`def bitonic_search(arr, k):
    n = len(arr)
    lo, hi, peak = 1, n-1, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] > arr[mid-1]: peak = mid; lo = mid + 1
        else: hi = mid - 1

    res = []
    lo, hi = 0, peak
    while lo <= hi:
        mid = (lo+hi)//2
        if arr[mid]==k: res.append(mid+1); break
        elif arr[mid]<k: lo=mid+1
        else: hi=mid-1

    lo, hi = peak, n-1
    while lo <= hi:
        mid=(lo+hi)//2
        if arr[mid]==k: res.append(mid+1); break
        elif arr[mid]>k: lo=mid+1   # descending: larger values to the left
        else: hi=mid-1
    return res`}}),e.jsx(b,{q:"Why does the descending half binary search flip its comparisons?",a:"In a descending array, larger values appear at smaller indices. So <code>arr[mid] > k</code> means target is SMALLER than mid's value — we must go RIGHT (lo = mid+1) to find smaller values. This is the opposite of an ascending search. Alternatively: reverse the array mentally (or physically) and use standard ascending binary search — the logic is identical."}),e.jsx(b,{q:"What is LC 162 (Find Peak Element) and how does it relate to bitonic search?",a:"LC 162 guarantees any peak (arr[i] > arr[i±1]) is valid — the array isn't necessarily globally bitonic. The same check(mid) = arr[mid] > arr[mid+1] works: if true, there's a peak at mid or to its left; if false, there's a peak to its right. This is the 'last true' pattern. Multiple peaks may exist in LC 162, but any one of them is a valid answer."})]})}function Q(){return e.jsxs("div",{children:[e.jsx(S,{color:"purple",icon:"ti-tournament",children:'6 high-frequency binary search problems — all with the unified check() template. Problems 5–6 are "binary search on answer" (covered fully in Module 09 but listed here per the problem set).'}),e.jsx(k,{num:1,title:"Binary Search",difficulty:"OA Easy",tags:["LC 704","Template"],statement:"Given a sorted array of distinct integers <code>nums</code> and a target value, return the index of <code>target</code> if found, or <code>-1</code> if not present. O(log n) required.",constraints:["1 ≤ n ≤ 10⁴","-10⁴ ≤ nums[i] ≤ 10⁴","nums sorted ascending","All elements distinct"],examples:[{input:"nums=[-1,0,3,5,9,12], target=9",output:"4"},{input:"nums=[-1,0,3,5,9,12], target=2",output:"-1"}],approach:"Direct application of the universal template. check(mid) = nums[mid] == target. Since we're looking for an exact match, we also check left/right to eliminate halves when no match. The template naturally handles not-found by returning -1.",code:{cpp:`int search(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if      (nums[mid] == target) return mid;
        else if (nums[mid] <  target) lo = mid + 1;
        else                          hi = mid - 1;
    }
    return -1;
}`,python:`def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if   nums[mid] == target: return mid
        elif nums[mid] <  target: lo = mid + 1
        else:                     hi = mid - 1
    return -1`}}),e.jsx(k,{num:2,title:"Find Minimum in Rotated Sorted Array",difficulty:"LC Medium",tags:["LC 153","Rotated Array"],statement:"Given a sorted array of distinct integers rotated at some pivot, find the minimum element. O(log n) required.",constraints:["1 ≤ n ≤ 5000","−5000 ≤ nums[i] ≤ 5000","All values distinct","Originally sorted, rotated 1..n times"],examples:[{input:"[3,4,5,1,2]",output:"1",note:"Rotated at pivot 3 → minimum is 1"},{input:"[4,5,6,7,0,1,2]",output:"0"}],approach:"check(mid) = arr[mid] ≤ arr[n-1]. True means mid is in the lower (right) sorted portion — minimum is at mid or left. False means mid is in the upper (left) portion — minimum is strictly right. Search for first-true. This is exactly the code from the module.",code:{cpp:`int findMin(vector<int>& arr) {
    int lo = 0, hi = arr.size() - 1, ans = 0;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] <= arr.back()) { ans = mid; hi = mid - 1; }
        else                        { lo  = mid + 1; }
    }
    return arr[ans];
}`,python:`def find_min(arr):
    lo, hi, ans = 0, len(arr)-1, 0
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if arr[mid] <= arr[-1]: ans=mid; hi=mid-1
        else: lo=mid+1
    return arr[ans]`}}),e.jsx(k,{num:3,title:"Search in Rotated Sorted Array",difficulty:"LC Medium",tags:["LC 33","Rotated Array"],statement:"Given a rotated sorted array of distinct integers and a target, return the index of target or <code>-1</code>. O(log n) required.",constraints:["1 ≤ n ≤ 5000","All values distinct","-10⁴ ≤ nums[i] ≤ 10⁴"],examples:[{input:"[4,5,6,7,0,1,2], target=0",output:"4"},{input:"[4,5,6,7,0,1,2], target=3",output:"-1"}],approach:"Determine which half is sorted by comparing arr[lo] with arr[mid]. Then check if target lies within the sorted half — if yes, binary search there; otherwise search the other half. Always one half is guaranteed to be sorted in a once-rotated array.",code:{cpp:`int search(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[lo] <= arr[mid]) {    // left half sorted
            if (arr[lo] <= target && target < arr[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {                      // right half sorted
            if (arr[mid] < target && target <= arr[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}`,python:`def search(arr, target):
    lo, hi = 0, len(arr)-1
    while lo <= hi:
        mid = lo+(hi-lo)//2
        if arr[mid]==target: return mid
        if arr[lo]<=arr[mid]:
            if arr[lo]<=target<arr[mid]: hi=mid-1
            else: lo=mid+1
        else:
            if arr[mid]<target<=arr[hi]: lo=mid+1
            else: hi=mid-1
    return -1`}}),e.jsx(k,{num:4,title:"Find First and Last Position of Element",difficulty:"LC Medium",tags:["LC 34","Two Binary Searches"],statement:"Given a sorted array <code>nums</code> and a target value, find the starting and ending position of target. Return <code>[-1,-1]</code> if not present.",constraints:["0 ≤ n ≤ 10⁵","-10⁹ ≤ nums[i] ≤ 10⁹","O(log n) required"],examples:[{input:"[5,7,7,8,8,10], target=8",output:"[3,4]"},{input:"[5,7,7,8,8,10], target=6",output:"[-1,-1]"}],approach:"Run two binary searches: (1) find first occurrence — when match, go left; (2) find last occurrence — when match, go right. Both run in O(log n). This is two independent applications of the first/last template.",code:{cpp:`vector<int> searchRange(vector<int>& nums, int target) {
    auto first = [&]() {
        int lo=0,hi=(int)nums.size()-1,ans=-1;
        while(lo<=hi){ int mid=lo+(hi-lo)/2;
          if(nums[mid]==target){ans=mid;hi=mid-1;}
          else if(nums[mid]<target)lo=mid+1; else hi=mid-1;}
        return ans;};
    auto last = [&]() {
        int lo=0,hi=(int)nums.size()-1,ans=-1;
        while(lo<=hi){ int mid=lo+(hi-lo)/2;
          if(nums[mid]==target){ans=mid;lo=mid+1;}
          else if(nums[mid]<target)lo=mid+1; else hi=mid-1;}
        return ans;};
    return {first(), last()};
}`,python:`def search_range(nums, target):
    def first():
        lo,hi,ans=0,len(nums)-1,-1
        while lo<=hi:
            mid=lo+(hi-lo)//2
            if nums[mid]==target: ans=mid;hi=mid-1
            elif nums[mid]<target: lo=mid+1
            else: hi=mid-1
        return ans
    def last():
        lo,hi,ans=0,len(nums)-1,-1
        while lo<=hi:
            mid=lo+(hi-lo)//2
            if nums[mid]==target: ans=mid;lo=mid+1
            elif nums[mid]<target: lo=mid+1
            else: hi=mid-1
        return ans
    return [first(), last()]`}}),e.jsx(k,{num:5,title:"Koko Eating Bananas",difficulty:"LC Medium",tags:["LC 875","BS on Answer"],statement:"Koko has <code>n</code> piles of bananas. She has <code>h</code> hours to eat all bananas. Each hour she eats at most <code>k</code> bananas from one pile. Find the minimum integer <code>k</code> such that she can finish all bananas within <code>h</code> hours.",constraints:["1 ≤ n ≤ 10⁴","n ≤ h ≤ 10⁹","1 ≤ piles[i] ≤ 10⁹"],examples:[{input:"piles=[3,6,7,11], h=8",output:"4",note:"Speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4)=1+2+2+3=8 ≤ 8 ✓"},{input:"piles=[30,11,23,4,20], h=5",output:"30"}],approach:"Binary search on answer k in [1, max(piles)]. check(k): can Koko eat all piles at speed k within h hours? Hours needed = sum(ceil(pile/k)) for each pile. If ≤ h, feasible → search left (smaller k). Else infeasible → search right. First-true pattern: find minimum k where check is true.",code:{cpp:`int minEatingSpeed(vector<int>& piles, int h) {
    auto check = [&](long long k) {
        long long hours = 0;
        for (int p : piles) hours += (p + k - 1) / k;  // ceil(p/k)
        return hours <= h;
    };
    int lo = 1, hi = *max_element(piles.begin(), piles.end()), ans = hi;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(mid)) { ans = mid; hi = mid - 1; }
        else            { lo  = mid + 1; }
    }
    return ans;
}`,python:`import math
def min_eating_speed(piles, h):
    def check(k):
        return sum(math.ceil(p/k) for p in piles) <= h
    lo, hi, ans = 1, max(piles), max(piles)
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if check(mid): ans=mid; hi=mid-1
        else: lo=mid+1
    return ans`}}),e.jsx(k,{num:6,title:"Capacity to Ship Packages Within D Days",difficulty:"LC Hard",tags:["LC 1011","BS on Answer"],statement:"A conveyor belt has packages with weights <code>weights[i]</code>. Each day the ship carries packages in order (not rearranged). Find the minimum ship weight capacity to ship all packages within <code>d</code> days.",constraints:["1 ≤ d ≤ n ≤ 5×10⁴","1 ≤ weights[i] ≤ 500"],examples:[{input:"weights=[1,2,3,4,5,6,7,8,9,10], d=5",output:"15"},{input:"weights=[3,2,2,4,1,4], d=3",output:"6"}],approach:"Binary search on capacity in [max(weights), sum(weights)]. check(cap): simulate loading packages greedily. Start a new day when adding a package exceeds cap. If days ≤ d → feasible. First-true pattern. This is structurally identical to the Painter Partition problem (Module 09).",code:{cpp:`int shipWithinDays(vector<int>& weights, int d) {
    auto check = [&](int cap) {
        int days = 1, load = 0;
        for (int w : weights) {
            if (load + w > cap) { days++; load = 0; }
            load += w;
        }
        return days <= d;
    };
    int lo = *max_element(weights.begin(), weights.end());
    int hi = accumulate(weights.begin(), weights.end(), 0);
    int ans = hi;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(mid)) { ans = mid; hi = mid - 1; }
        else            { lo  = mid + 1; }
    }
    return ans;
}`,python:`def ship_within_days(weights, d):
    def check(cap):
        days = load = 0
        for w in weights:
            if load + w > cap: days += 1; load = 0
            load += w
        return days + 1 <= d
    lo, hi = max(weights), sum(weights)
    ans = hi
    while lo <= hi:
        mid = lo+(hi-lo)//2
        if check(mid): ans=mid; hi=mid-1
        else: lo=mid+1
    return ans`}})]})}const X=[{id:"fundamentals",label:"Core Template"},{id:"occurrence",label:"First/Last Occurrence"},{id:"rotated",label:"Rotated Arrays"},{id:"bitonic",label:"Bitonic Arrays"},{id:"problems",label:"Problems"}];function Z(){const[o,s]=w.useState("fundamentals"),r={fundamentals:e.jsx(D,{}),occurrence:e.jsx(K,{}),rotated:e.jsx(V,{}),bitonic:e.jsx(U,{}),problems:e.jsx(Q,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"DSA — Module 08"}),e.jsx("h1",{className:"page-header-title",children:"Binary Search"}),e.jsx("p",{className:"page-header-subtitle",children:"Universal Template · check() Pattern · First/Last Occurrence · Rotated Arrays · Bitonic Arrays · LC 33, 153, 875, 1011"})]}),e.jsx(B,{tabs:X,active:o,onChange:s}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[o]}),e.jsx(L,{moduleId:8})]})}export{Z as default};
