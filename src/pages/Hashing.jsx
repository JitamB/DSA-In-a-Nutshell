import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   STEP DATA — precomputed at module load
══════════════════════════════════════════════════════ */

/* ── Chaining: insert [70,50,85,93,76,54,21,14] into m=7 ─ */
const CHAIN_M = 7;
function ch(k) { return k % CHAIN_M; }

const CHAIN_STEPS = (() => {
  const keys   = [70, 50, 85, 93, 76, 54, 21, 14];
  const steps  = [];
  const table  = Array.from({ length: CHAIN_M }, () => []);
  steps.push({ table: table.map(b=>[...b]), cur:null, h:null, action:'init',
    desc:`Empty hash table with m=${CHAIN_M} buckets. Hash function: h(k) = k mod ${CHAIN_M}.` });
  for (const k of keys) {
    const h = ch(k);
    const isChain = table[h].length > 0;
    table[h] = [k, ...table[h]];
    steps.push({ table: table.map(b=>[...b]), cur:k, h, action: isChain ? 'chain' : 'place',
      desc: isChain
        ? `h(${k}) = ${k}%${CHAIN_M} = ${h}. Bucket ${h} occupied → prepend ${k} to chain. Chain length = ${table[h].length}.`
        : `h(${k}) = ${k}%${CHAIN_M} = ${h}. Bucket ${h} empty → place ${k} directly.` });
  }
  const totalKeys = keys.length;
  steps.push({ table: table.map(b=>[...b]), cur:null, h:null, action:'done',
    desc:`Done! α = n/m = ${totalKeys}/${CHAIN_M} ≈ ${(totalKeys/CHAIN_M).toFixed(2)}. Expected search time: O(1+α) ≈ O(${(1+totalKeys/CHAIN_M).toFixed(2)}).` });
  return steps;
})();

/* ── Open Addressing: m=11, pre-occupied {3,4,5}, insert k=25 ─ */
const PROBE_M = 11;
const PROBE_OCC = new Set([3, 4, 5]);
const PROBE_KEY = 25;
const H1 = PROBE_KEY % PROBE_M;    // = 3
const PROBE_H2 = 1 + (PROBE_KEY % 10);   // = 6

function buildProbeSteps(method) {
  const steps = [];
  const occ = new Set(PROBE_OCC);
  let placed = -1;
  steps.push({ occ:new Set(occ), probe:-1, placed:-1, action:'init',
    desc:`Insert key=${PROBE_KEY} into m=${PROBE_M} table. h1(${PROBE_KEY})=${H1}. ${method==='double'?`h2(${PROBE_KEY})=${PROBE_H2}.`:''} Pre-occupied: {3,4,5}.` });
  for (let i = 0; i <= 6; i++) {
    let slot;
    if (method === 'linear')    slot = (H1 + i) % PROBE_M;
    else if (method === 'quad') slot = (H1 + i + i*i) % PROBE_M;
    else                        slot = (H1 + i * PROBE_H2) % PROBE_M;
    const isOcc = occ.has(slot);
    const formula = method==='linear'
      ? `(${H1}+${i})%${PROBE_M}`
      : method==='quad'
      ? `(${H1}+${i}+${i*i})%${PROBE_M}`
      : `(${H1}+${i}×${PROBE_H2})%${PROBE_M}`;
    steps.push({ occ:new Set(occ), probe:slot, placed:-1, action: isOcc?'occupied':'found',
      desc: isOcc
        ? `Probe ${i}: slot ${formula} = ${slot} → OCCUPIED. Try next.`
        : `Probe ${i}: slot ${formula} = ${slot} → EMPTY. Insert ${PROBE_KEY} here! (${i+1} probe${i>0?'s':''} total)` });
    if (!isOcc) { placed = slot; occ.add(slot); break; }
  }
  if (placed >= 0) {
    steps.push({ occ:new Set(occ), probe:placed, placed, action:'done',
      desc:`${PROBE_KEY} successfully placed at slot ${placed}.` });
  }
  return steps;
}
const PROBE = {
  linear: buildProbeSteps('linear'),
  quad:   buildProbeSteps('quad'),
  double: buildProbeSteps('double'),
};

/* ── Prefix-Hash: LC 560 — subarray sum = k on [1,1,1,2,-1,2], k=3 ─ */
const PH_ARR = [1, 1, 1, 2, -1, 2];
const PH_K   = 3;
const PH_STEPS = (() => {
  const steps = [];
  const map   = new Map([[0, 1]]);
  let ps = 0, count = 0;
  steps.push({ arr:PH_ARR, idx:-1, ps:0, map:new Map(map), needle:null, found:false, count:0, action:'init',
    desc:`Subarray sum = ${PH_K}. Initialize map = {0:1} (empty prefix sum seen once, enables subarrays starting at index 0). Running prefix sum = 0.` });
  for (let i = 0; i < PH_ARR.length; i++) {
    ps += PH_ARR[i];
    const needle = ps - PH_K;
    const foundCount = map.get(needle) || 0;
    count += foundCount;
    steps.push({ arr:PH_ARR, idx:i, ps, map:new Map(map), needle, found:foundCount>0, foundCount, count, action: foundCount>0?'found':'miss',
      desc: foundCount > 0
        ? `i=${i}: arr[${i}]=${PH_ARR[i]}, ps=${ps}. Needle = ps−k = ${ps}−${PH_K} = ${needle}. FOUND in map (×${foundCount})! count += ${foundCount} → count=${count}.`
        : `i=${i}: arr[${i}]=${PH_ARR[i]}, ps=${ps}. Needle = ${ps}−${PH_K} = ${needle}. Not in map. count stays ${count}.` });
    map.set(ps, (map.get(ps) || 0) + 1);
    steps.push({ arr:PH_ARR, idx:i, ps, map:new Map(map), needle:null, found:false, foundCount:0, count, action:'insert',
      desc:`Insert ps=${ps} into map → map[${ps}] = ${map.get(ps)}. ${ps===PH_K?`(This will help find subarrays ending here that sum to ${PH_K} via later ps=0.)`:``}` });
  }
  steps.push({ arr:PH_ARR, idx:PH_ARR.length, ps, map:new Map(map), needle:null, found:false, foundCount:0, count, action:'done',
    desc:`Done! Total subarrays summing to ${PH_K} = ${count}. Subarrays: [1,1,1], [1,1,2,−1], [1,2], [2,−1,2].` });
  return steps;
})();

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — CHAINING HASH TABLE
══════════════════════════════════════════════════════ */
function ChainingViz() {
  const [step, setStep] = useState(0);
  const s = CHAIN_STEPS[Math.min(step, CHAIN_STEPS.length - 1)];
  const ACT_CLR = { place:'success', chain:'warning', done:'info', init:null };
  const ac = ACT_CLR[s.action];

  return (
    <VizBox>
      <div style={{ marginBottom:12, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        {ac && <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:700, background:`var(--color-background-${ac})`, color:`var(--color-text-${ac})`, border:`1px solid var(--color-border-${ac})`, whiteSpace:'nowrap' }}>
          {s.action==='place'?'New bucket':s.action==='chain'?'Collision → chain':s.action==='done'?'Done ✓':''}
        </span>}
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</span>
      </div>

      {/* Hash computation display */}
      {s.cur !== null && (
        <div style={{ marginBottom:12, background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:'8px 14px', fontFamily:'var(--font-mono)', fontSize:13 }}>
          <span style={{ color:'#9CDCFE' }}>h({s.cur})</span>
          <span style={{ color:'#7A8599' }}> = </span>
          <span style={{ color:'#CE9178' }}>{s.cur}</span>
          <span style={{ color:'#7A8599' }}> % </span>
          <span style={{ color:'#CE9178' }}>{CHAIN_M}</span>
          <span style={{ color:'#7A8599' }}> = </span>
          <span style={{ color:'#4EC9B0', fontWeight:700 }}>{s.h}</span>
        </div>
      )}

      {/* Hash table buckets */}
      <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:14 }}>
        {s.table.map((chain, i) => {
          const isActive = i === s.h && s.cur !== null;
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
              {/* Bucket header */}
              <div style={{ width:56, height:36, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6, border:`1.5px solid ${isActive?'var(--color-border-warning)':'var(--color-border-secondary)'}`, background:isActive?'var(--color-background-warning)':'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:12, fontWeight:isActive?700:400, color:isActive?'var(--color-text-warning)':'var(--color-text-secondary)', flexShrink:0 }}>
                [{i}]
              </div>
              {/* Arrow to chain */}
              {chain.length > 0
                ? <>
                    <svg width="20" height="14" viewBox="0 0 20 14" style={{ flexShrink:0 }}>
                      <line x1="2" y1="7" x2="16" y2="7" stroke="#2A3050" strokeWidth="1.5"/>
                      <polygon points="16,3 20,7 16,11" fill="#2A3050"/>
                    </svg>
                    <div style={{ display:'flex', gap:3, alignItems:'center' }}>
                      {chain.map((v, ci) => {
                        const isNew = ci === 0 && s.cur === v && s.action !== 'done';
                        return (
                          <div key={ci} style={{ display:'flex', alignItems:'center', gap:3 }}>
                            <div style={{ padding:'5px 10px', borderRadius:5, border:`1.5px solid ${isNew?'var(--color-border-warning)':isActive&&ci===0?'var(--color-border-success)':'var(--color-border-secondary)'}`, background:isNew?'var(--color-background-warning)':isActive&&ci===0?'var(--color-background-success)':'var(--color-background-tertiary)', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:isNew?'var(--color-text-warning)':isActive&&ci===0?'var(--color-text-success)':'var(--color-text-secondary)' }}>{v}</div>
                            {ci < chain.length-1 && <span style={{ fontSize:14, color:'#3D4460' }}>→</span>}
                          </div>
                        );
                      })}
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#3D4460' }}>→ null</span>
                    </div>
                  </>
                : <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#3D4460', marginLeft:4 }}>null</span>
              }
            </div>
          );
        })}
      </div>

      {/* Load factor */}
      {s.action === 'done' && (
        <div style={{ padding:'7px 12px', background:'var(--color-background-info)', border:'1px solid var(--color-border-info)', borderRadius:'var(--border-radius-md)', fontFamily:'var(--font-mono)', fontSize:12.5, color:'var(--color-text-info)', marginBottom:12 }}>
          α = {CHAIN_STEPS[CHAIN_STEPS.length-2].table.flat().length}/{CHAIN_M} ≈ {(CHAIN_STEPS[CHAIN_STEPS.length-2].table.flat().length/CHAIN_M).toFixed(2)}   |   Expected O(1 + α) per lookup
        </div>
      )}

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(CHAIN_STEPS.length-1,step+1)),step===CHAIN_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{CHAIN_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(CHAIN_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — OPEN ADDRESSING PROBE COMPARISON
   Linear / Quadratic / Double Hashing — same table state
══════════════════════════════════════════════════════ */
function ProbingViz() {
  const [method, setMethod] = useState('linear');
  const [step, setStep]     = useState(0);
  const steps = PROBE[method];
  const s = steps[Math.min(step, steps.length - 1)];

  const changeMethod = (m) => { setMethod(m); setStep(0); };

  const FORMULAS = {
    linear: `h(k,i) = (h₁(k) + i) mod m`,
    quad:   `h(k,i) = (h₁(k) + i + i²) mod m`,
    double: `h(k,i) = (h₁(k) + i·h₂(k)) mod m`,
  };
  const METHOD_INFO = {
    linear: `h₁(${PROBE_KEY})=${H1}, step=1. Simple but causes PRIMARY clustering — consecutive occupied slots grow.`,
    quad:   `h₁(${PROBE_KEY})=${H1}, step=i². Avoids primary clustering but still has SECONDARY clustering (same h₁ → same probe sequence).`,
    double: `h₁(${PROBE_KEY})=${H1}, h₂(${PROBE_KEY})=${PROBE_H2}. Each key has a UNIQUE probe sequence → minimal clustering.`,
  };

  return (
    <VizBox>
      <div style={{ display:'flex', gap:6, marginBottom:12, flexWrap:'wrap' }}>
        {[['linear','Linear Probing'],['quad','Quadratic Probing'],['double','Double Hashing']].map(([m,l])=>(
          <button key={m} onClick={()=>changeMethod(m)} style={{ padding:'4px 11px', border:'1px solid', borderColor:method===m?'var(--color-border-info)':'var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:method===m?'var(--color-background-info)':'transparent', color:method===m?'var(--color-text-info)':'var(--color-text-secondary)', cursor:'pointer', fontSize:12 }}>{l}</button>
        ))}
      </div>

      <div style={{ marginBottom:10, background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:'8px 12px', fontFamily:'var(--font-mono)', fontSize:12, color:'#9CDCFE' }}>
        {FORMULAS[method]}
      </div>
      <div style={{ marginBottom:12, padding:'5px 10px', background:'var(--color-background-secondary)', borderRadius:'var(--border-radius-md)', fontSize:12, color:'var(--color-text-secondary)', lineHeight:1.55 }}>
        <strong>{['linear','quad','double'][['linear','quad','double'].indexOf(method)].charAt(0).toUpperCase() + method.slice(1)}:</strong> {METHOD_INFO[method]}
      </div>
      <div style={{ marginBottom:12, padding:'5px 10px', background:'var(--color-background-secondary)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</div>

      {/* Table cells */}
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:6, letterSpacing:'0.06em' }}>TABLE (m={PROBE_M})  — gray = pre-occupied</div>
        <div style={{ display:'flex', gap:3 }}>
          {Array.from({ length: PROBE_M }, (_, i) => {
            const preOcc  = PROBE_OCC.has(i);
            const isProbe = i === s.probe && s.action !== 'done';
            const isDone  = i === s.placed && s.action === 'done';
            let bg = '#131722', bd = '#1E2233', tc = '#4A5170';
            if (preOcc && !isDone) { bg='#1A1E2E'; bd='#3D4460'; tc='#7A8599'; }
            if (isProbe && s.action==='occupied') { bg='var(--color-background-danger)'; bd='var(--color-border-danger)'; tc='var(--color-text-danger)'; }
            if (isProbe && s.action==='found')    { bg='var(--color-background-success)'; bd='var(--color-border-success)'; tc='var(--color-text-success)'; }
            if (isDone) { bg='var(--color-background-success)'; bd='var(--color-border-success)'; tc='var(--color-text-success)'; }
            return (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                <div style={{ width:46, height:42, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6, border:`1.5px solid ${bd}`, background:bg, fontFamily:'var(--font-mono)', fontSize:12, fontWeight:(isProbe||isDone)?700:400, color:tc, transition:'all 0.18s' }}>
                  {preOcc && !isDone ? '×' : isDone ? PROBE_KEY : isProbe ? '?' : ''}
                </div>
                <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Probe count summary at done step */}
      {s.action === 'done' && (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
          {Object.entries({ linear: PROBE.linear.length-2, quad: PROBE.quad.length-2, double: PROBE.double.length-2 }).map(([m,probes])=>(
            <div key={m} style={{ padding:'5px 12px', borderRadius:6, border:`1px solid ${m===method?'var(--color-border-success)':'var(--color-border-secondary)'}`, background:m===method?'var(--color-background-success)':'transparent', fontFamily:'var(--font-mono)', fontSize:12, color:m===method?'var(--color-text-success)':'var(--color-text-secondary)' }}>
              {m}: {probes} probe{probes!==1?'s':''}
            </div>
          ))}
        </div>
      )}

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(steps.length-1,step+1)),step===steps.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{steps.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — PREFIX SUM + HASH MAP (LC 560)
   [1,1,1,2,-1,2], k=3 → count=4 subarrays
══════════════════════════════════════════════════════ */
function PrefixHashViz() {
  const [step, setStep] = useState(0);
  const s = PH_STEPS[Math.min(step, PH_STEPS.length - 1)];

  const mapEntries = [...s.map.entries()].sort((a,b)=>a[0]-b[0]);

  return (
    <VizBox>
      <div style={{ marginBottom:12, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        {(s.action==='found'||s.action==='miss') && <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:700, background:`var(--color-background-${s.found?'success':'secondary'})`, color:`var(--color-text-${s.found?'success':'tertiary'})`, border:`1px solid var(--color-border-${s.found?'success':'tertiary'})`, whiteSpace:'nowrap' }}>
          {s.found?'MATCH FOUND ✓':'No match'}
        </span>}
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</span>
      </div>

      {/* Array cells */}
      <div style={{ display:'flex', gap:4, marginBottom:12 }}>
        {PH_ARR.map((v, i) => {
          const isCur = i === s.idx;
          const isPast = s.idx >= 0 && i < s.idx;
          const c = isCur?(s.action==='found'?'success':s.action==='insert'?'info':'warning'):isPast?'secondary':null;
          return (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
              <div style={{ width:44, height:42, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:7, border:`1.5px solid ${c?`var(--color-border-${c})`:'var(--color-border-secondary)'}`, background:c?`var(--color-background-${c})`:'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:15, fontWeight:c?700:500, color:c?`var(--color-text-${c})`:'var(--color-text-secondary)', transition:'all 0.15s' }}>
                {v >= 0 ? v : v}
              </div>
              <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:14 }}>
        {/* Prefix sum */}
        <div style={{ padding:'10px 12px', borderRadius:'var(--border-radius-md)', background:'var(--color-background-info)', border:'0.5px solid var(--color-border-info)', textAlign:'center' }}>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-info)', marginBottom:2 }}>Prefix Sum</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:20, fontWeight:700, color:'var(--color-text-info)' }}>{s.ps}</div>
        </div>
        {/* Needle */}
        <div style={{ padding:'10px 12px', borderRadius:'var(--border-radius-md)', background:s.needle!=null?(s.found?'var(--color-background-success)':'var(--color-background-secondary)'):'var(--color-background-tertiary)', border:`0.5px solid ${s.needle!=null?(s.found?'var(--color-border-success)':'var(--color-border-secondary)'):'var(--color-border-tertiary)'}`, textAlign:'center', transition:'all 0.2s' }}>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:s.found?'var(--color-text-success)':'var(--color-text-tertiary)', marginBottom:2 }}>ps − k = needle</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:20, fontWeight:700, color:s.needle!=null?(s.found?'var(--color-text-success)':'var(--color-text-secondary)'):'var(--color-text-tertiary)' }}>{s.needle ?? '—'}</div>
        </div>
        {/* Count */}
        <div style={{ padding:'10px 12px', borderRadius:'var(--border-radius-md)', background:s.count>0?'var(--color-background-success)':'var(--color-background-secondary)', border:`0.5px solid ${s.count>0?'var(--color-border-success)':'var(--color-border-secondary)'}`, textAlign:'center', transition:'all 0.2s' }}>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:s.count>0?'var(--color-text-success)':'var(--color-text-tertiary)', marginBottom:2 }}>Subarrays found</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:20, fontWeight:700, color:s.count>0?'var(--color-text-success)':'var(--color-text-secondary)' }}>{s.count}</div>
        </div>
      </div>

      {/* Hash map */}
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:6, letterSpacing:'0.06em' }}>
          HASH MAP  {'{'}prefix_sum → count{'}'}
        </div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {mapEntries.map(([k,v])=>{
            const isNeedle = k === s.needle && s.found;
            return (
              <div key={k} style={{ padding:'4px 10px', borderRadius:5, border:`1px solid ${isNeedle?'var(--color-border-success)':'var(--color-border-secondary)'}`, background:isNeedle?'var(--color-background-success)':'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:12, color:isNeedle?'var(--color-text-success)':'var(--color-text-secondary)', fontWeight:isNeedle?700:400, transition:'all 0.15s' }}>
                {k}:{v}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(PH_STEPS.length-1,step+1)),step===PH_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{PH_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(PH_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* PROBLEM CARD */
const DIFF_CLR = {'IIT OA':'info','OA Easy':'success','OA Medium':'warning','OA Hard':'danger','LC Medium':'info','LC Hard':'purple'};
function ProblemCard({num,title,difficulty,tags=[],statement,constraints=[],examples=[],approach,code}) {
  const [open,setOpen]=useState(false); const dc=DIFF_CLR[difficulty]||'info';
  return (
    <div style={{border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-lg)',overflow:'hidden',marginBottom:'1rem'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 16px',background:'var(--color-background-secondary)',borderBottom:'1px solid var(--color-border-tertiary)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontFamily:'var(--font-mono)',fontSize:10.5,fontWeight:700,color:'var(--color-text-tertiary)',minWidth:26}}>Q{num}</span><span style={{fontSize:13.5,fontWeight:600,color:'var(--color-text-primary)'}}>{title}</span></div>
        <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap',justifyContent:'flex-end'}}>{tags.map(t=><span key={t} style={{padding:'1px 7px',borderRadius:12,fontSize:10.5,background:'var(--color-background-tertiary)',color:'var(--color-text-tertiary)',fontWeight:500}}>{t}</span>)}<span style={{padding:'2px 9px',borderRadius:12,fontSize:10.5,fontWeight:600,background:`var(--color-background-${dc})`,color:`var(--color-text-${dc})`,border:`1px solid var(--color-border-${dc})`}}>{difficulty}</span></div>
      </div>
      <div style={{padding:'14px 16px'}}>
        <p style={{fontSize:13.5,color:'var(--color-text-secondary)',lineHeight:1.72,marginBottom:12}} dangerouslySetInnerHTML={{__html:statement}}/>
        {constraints.length>0&&<div style={{marginBottom:12}}><div style={{fontSize:10.5,fontWeight:600,color:'var(--color-text-tertiary)',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:5}}>Constraints</div><div style={{display:'flex',flexWrap:'wrap',gap:5}}>{constraints.map((c,i)=><code key={i} style={{padding:'2px 8px',borderRadius:4,fontSize:11.5,background:'var(--color-background-secondary)',color:'var(--color-text-secondary)',border:'0.5px solid var(--color-border-tertiary)',fontFamily:'var(--font-mono)'}}>{c}</code>)}</div></div>}
        {examples.length>0&&<div style={{marginBottom:14}}>{examples.map((ex,i)=><div key={i} style={{background:'var(--color-background-secondary)',border:'0.5px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',padding:'9px 12px',marginBottom:6,fontFamily:'var(--font-mono)',fontSize:12}}><div style={{color:'var(--color-text-tertiary)',fontSize:10,marginBottom:4,letterSpacing:'0.06em'}}>EXAMPLE {i+1}</div><div><span style={{color:'var(--color-text-success)'}}>Input: </span><span style={{color:'var(--color-text-secondary)'}}>{ex.input}</span></div><div><span style={{color:'var(--color-text-info)'}}>Output: </span><span style={{color:'var(--color-text-secondary)'}}>{ex.output}</span></div>{ex.note&&<div style={{color:'var(--color-text-tertiary)',fontSize:11,marginTop:3}}>{ex.note}</div>}</div>)}</div>}
        <button onClick={()=>setOpen(!open)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 14px',border:'1px solid var(--color-border-primary)',borderRadius:'var(--border-radius-md)',background:open?'var(--color-background-secondary)':'transparent',color:'var(--color-text-secondary)',cursor:'pointer',fontSize:12.5,fontFamily:'var(--font-sans)',transition:'all 0.15s'}}>
          <i className={`ti ti-${open?'eye-off':'bulb'}`}/>{open?'Hide Solution':'Show Approach & Solution'}
        </button>
        {open&&<div style={{marginTop:12}}><div style={{background:'var(--color-background-info)',border:'1px solid var(--color-border-info)',borderRadius:'var(--border-radius-md)',padding:'9px 13px',marginBottom:10,fontSize:13,color:'var(--color-text-info)',lineHeight:1.68}}><strong>Approach: </strong>{approach}</div><Code>{code}</Code></div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — HASH TABLE FOUNDATIONS
══════════════════════════════════════════════════════ */
function SectionFoundations() {
  return (
    <div>
      <Note color="info" icon="ti-database">
        A hash table maps keys to values in O(1) expected time by transforming a key into an array index via a <strong>hash function</strong>. The core idea: trade memory for speed. The challenge: two keys may hash to the same index — a <strong>collision</strong> — which must be resolved gracefully.
      </Note>

      <H2>Direct-Address Tables</H2>
      <P>When the key universe is small (e.g., values 0..999), allocate an array of that size. Direct-address tables are O(1) for all operations with zero collisions — but space is O(|universe|), which is infeasible when the universe is large (e.g., all possible strings, 64-bit integers).</P>
      <Code>{{cpp:`// Direct-address table: universe = {0..UMAX-1}
int table[UMAX];        // pre-allocated for every possible key
table[key] = value;     // O(1) insert
int v = table[key];     // O(1) search
table[key] = -1;        // O(1) delete (sentinel for "empty")
// Space: O(|U|) — infeasible if U = all 32-bit ints (4GB)`, python:`# Works fine for small universes (e.g., counting character frequencies)
table = [0] * 256          # ASCII character frequencies
for c in s: table[ord(c)] += 1`}}</Code>

      <H2>Hash Functions</H2>
      <P>A good hash function distributes keys uniformly across m buckets, minimizing collisions. Three standard methods:</P>
      <Grid cols={3}>
        <Card title="Division Method" color="info">
          <Mx>h(k) = k \mod m</Mx><br/>
          Choose m = prime, not near a power of 2. Simple, fast.
        </Card>
        <Card title="Multiplication Method" color="success">
          <Mx>h(k) = \lfloor m \cdot (kA \mod 1) \rfloor</Mx><br/>
          A = (√5−1)/2 ≈ 0.618. Works for any m.
        </Card>
        <Card title="Universal Hashing" color="warning">
          Randomly pick h from a family at table creation. No adversarial input can consistently cause collisions.
        </Card>
      </Grid>
      <Code>{{cpp:`// Division method: m should be prime, not near 2^k
int divisionHash(int k, int m) { return k % m; }

// Multiplication method (Knuth): A = (sqrt(5)-1)/2 ≈ 0.618
int multHash(int k, int m) {
    double A = 0.6180339887;
    return (int)(m * fmod(k * A, 1.0));
}

// String hash (polynomial rolling hash)
int strHash(const string& s, int m) {
    long long h = 0;
    for (char c : s) h = (h * 31 + c) % m;
    return h;
}`, python:`def division_hash(k, m): return k % m

def mult_hash(k, m):
    A = 0.6180339887
    return int(m * ((k * A) % 1))

def str_hash(s, m):
    h = 0
    for c in s: h = (h * 31 + ord(c)) % m
    return h`}}</Code>

      <H2>Collision Resolution — Chaining (Interactive)</H2>
      <P>Chaining stores collisions as a linked list in each bucket. Load factor α = n/m. Expected search time = O(1 + α). Works well for α ≤ 3. Step through inserting 8 keys into an m=7 table:</P>
      <ChainingViz />
      <Code>{{cpp:`// Hash table with chaining — O(1) average, O(n) worst case
class ChainHash {
    vector<list<pair<int,int>>> table;
    int m;
    int h(int k) { return k % m; }
public:
    ChainHash(int m) : table(m), m(m) {}
    void insert(int key, int val) {
        auto& chain = table[h(key)];
        for (auto& [k,v] : chain) if (k==key) { v=val; return; }  // update
        chain.emplace_front(key, val);   // prepend — O(1)
    }
    int* search(int key) {
        for (auto& [k,v] : table[h(key)])
            if (k==key) return &v;
        return nullptr;
    }
};`, python:`class ChainHash:
    def __init__(self, m):
        self.m=m; self.table=[[] for _ in range(m)]
    def h(self, k): return k % self.m
    def insert(self, key, val):
        for pair in self.table[self.h(key)]:
            if pair[0]==key: pair[1]=val; return
        self.table[self.h(key)].insert(0,[key,val])
    def search(self, key):
        for k,v in self.table[self.h(key)]:
            if k==key: return v
        return None`}}</Code>

      <QA q="Why should m (table size) be a prime number for the division method?" a="For h(k)=k%m, if m has small factors, keys sharing those factors cluster into the same buckets. For example, if m=10 and all keys are multiples of 5, only buckets 0 and 5 are ever used — catastrophic distribution. A prime m ensures no key subgroup 'aligns' with the table structure. Also, m should not be near a power of 2, as bit patterns in keys could concentrate into fewer buckets." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — OPEN ADDRESSING
══════════════════════════════════════════════════════ */
function SectionOpenAddressing() {
  return (
    <div>
      <Note color="warning" icon="ti-arrows-exchange">
        <strong>Open addressing</strong> stores all elements directly in the hash table array — no separate chains. On collision, probe a sequence of slots until an empty one is found. Critical: load factor α must stay below 1 (table never full); performance degrades rapidly as α → 1. Keep α &lt; 0.7.
      </Note>

      <H2>Three Probing Strategies — Side-by-Side Comparison</H2>
      <P>Same table state (slots 3, 4, 5 occupied), same key 25 (h₁=3). See how many probes each method needs and where the key ends up:</P>
      <ProbingViz />

      <H2>All Three Formulas</H2>
      <Code>{{cpp:`// h'(k) = primary hash, i = probe number
// Linear probing — simple, but causes PRIMARY CLUSTERING
int linearProbe(int k, int i, int m) {
    return (hashFn(k) + i) % m;
}

// Quadratic probing — avoids primary, but SECONDARY CLUSTERING
int quadraticProbe(int k, int i, int m) {
    return (hashFn(k) + i + i*i) % m;
    // Note: only half the slots guaranteed reachable unless m is prime
}

// Double hashing — best distribution, NO clustering
int doubleHash(int k, int i, int m) {
    int h1 = k % m;
    int h2 = 1 + (k % (m - 1));  // h2 must never be 0, coprime with m
    return (h1 + i * h2) % m;
}

// Generic search with open addressing:
int search(int table[], int k, int m) {
    for (int i = 0; i < m; i++) {
        int slot = probeFunction(k, i, m);
        if (table[slot] == EMPTY) return -1;    // key not in table
        if (table[slot] == k)     return slot;  // found
        // if DELETED: continue probing (tombstone)
    }
    return -1;
}`, python:`def linear_probe(k, i, m):    return (k%m + i) % m
def quad_probe(k, i, m):      return (k%m + i + i*i) % m
def double_hash(k, i, m):
    h1=k%m; h2=1+(k%(m-1)); return (h1+i*h2)%m`}}</Code>

      <H2>The Tombstone Problem — Deletion in Open Addressing</H2>
      <P>You cannot simply mark a slot as empty on deletion — that would break the probe chain for keys inserted after a collision. Instead, mark deleted slots with a <strong>tombstone</strong> sentinel. Insertions can overwrite tombstones; searches skip them.</P>
      <Code>{{cpp:`// EMPTY=0, DELETED=-1 (tombstone), positive = occupied
enum { EMPTY=0, DELETED=-1 };
void deleteKey(int table[], int k, int m) {
    for (int i = 0; i < m; i++) {
        int slot = probeFunction(k, i, m);
        if (table[slot] == EMPTY) return;      // not found
        if (table[slot] == k) { table[slot] = DELETED; return; }
    }
}
// Without tombstones: a simple deletion breaks all probe chains
// built through the deleted slot → incorrect search results`, python:`EMPTY, DELETED = None, 'DEL'
def delete_key(table, k, m):
    for i in range(m):
        slot=double_hash(k,i,m)
        if table[slot] is EMPTY: return  # not found
        if table[slot]==k: table[slot]=DELETED; return`}}</Code>

      <H2>Comparison</H2>
      <Table
        heads={["Method", "Clustering", "Expected probes (α=0.5)", "Notes"]}
        rows={[
          ["Chaining",         "None",        "O(1+α)=1.5",    "No max load constraint; pointers overhead"],
          ["Linear Probing",   "Primary",     "~1.5 probes",   "Cache-friendly; bad with high α"],
          ["Quadratic Probing","Secondary",   "~1.44 probes",  "Only half slots reachable if m not prime"],
          ["Double Hashing",   "Minimal",     "~1.39 probes",  "Best distribution; requires good h₂"],
        ]}
      />

      <QA q="Why does linear probing cause 'primary clustering' and why is it so harmful?" a="Primary clustering: once a run of consecutive occupied slots forms, every new key hashing into that run extends it further, creating a self-reinforcing growth effect. Long runs mean more probes for both insertions and lookups. For α=0.9, linear probing averages ~50 probes per unsuccessful search — catastrophically bad. Double hashing has no such effect because each key uses a unique step size determined by h₂." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — PREFIX SUM + HASHING PATTERN
══════════════════════════════════════════════════════ */
function SectionPrefixHash() {
  return (
    <div>
      <Note color="success" icon="ti-plus">
        The <strong>Prefix Sum + Hash Map</strong> pattern solves "subarray with property X" in O(n). Key insight: store prefix sums in a hash map. When you need to know if a subarray [i..j] satisfies a condition, express it as a relationship between two prefix sums and look up the complement in O(1).
      </Note>

      <H2>Subarray Sum = K (LC 560) — Interactive</H2>
      <P>Count subarrays of [1,1,1,2,−1,2] summing to k=3. For each prefix sum ps, check if (ps−k) was seen before — meaning a subarray ending here sums to k. <strong>The initial {'{0:1}'} handles subarrays starting at index 0.</strong></P>
      <PrefixHashViz />
      <Code>{{cpp:`int subarraySum(vector<int>& nums, int k) {
    unordered_map<int,int> count;
    count[0] = 1;          // CRITICAL: empty prefix sum seen once
    int ps = 0, ans = 0;
    for (int x : nums) {
        ps += x;
        ans += count[ps - k];  // subarrays ending here summing to k
        count[ps]++;            // record this prefix sum
    }
    return ans;
}
// Time: O(n)  Space: O(n)
// [1,1,1,2,-1,2], k=3 → 4 subarrays`, python:`def subarray_sum(nums, k):
    count={0:1}; ps=ans=0
    for x in nums:
        ps+=x
        ans+=count.get(ps-k,0)   # check if complement exists
        count[ps]=count.get(ps,0)+1
    return ans`}}</Code>

      <Note color="info" icon="ti-bulb">
        <strong>Why check count[ps−k] and not count[k−ps]?</strong> We want subarrays [i..j] where sum(i..j)=k. This equals ps[j+1]−ps[i]=k, so ps[i]=ps[j+1]−k. We look back for past prefix sums equal to (current_ps − k). The direction matters — the complement we're looking for is always in the past (already in the map).
      </Note>

      <H2>Longest Consecutive Sequence (LC 128)</H2>
      <P>Put all numbers in a hash set. For each number that has no left neighbor (n-1 not in set), it's the start of a sequence — count how far it extends. O(n) total because each number is visited at most twice.</P>
      <Code>{{cpp:`int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int ans = 0;
    for (int n : s) {
        if (s.count(n - 1)) continue;   // not the start of a sequence
        int len = 0, cur = n;
        while (s.count(cur)) { cur++; len++; }
        ans = max(ans, len);
    }
    return ans;
}
// [100,4,200,1,3,2] → 4 (sequence: 1,2,3,4)`, python:`def longest_consecutive(nums):
    s=set(nums); ans=0
    for n in s:
        if n-1 in s: continue    # not the sequence start
        cur,length=n,0
        while cur in s:cur+=1;length+=1
        ans=max(ans,length)
    return ans`}}</Code>

      <H2>C++ STL Unordered Containers</H2>
      <Code>{{cpp:`#include <unordered_map>
#include <unordered_set>

unordered_map<string,int> freq;
freq["apple"]++;
bool exists = freq.count("apple");    // O(1) average
freq.erase("apple");                   // O(1) average
for (auto& [k,v] : freq) { /* traverse */ }

unordered_set<int> s = {1,2,3,4,5};
s.insert(6);                           // O(1) average
s.erase(3);                            // O(1) average
bool has = s.count(4);                 // O(1)

// Pitfall: worst case O(n) per operation (all keys hash to one bucket)
// Fix: use a custom hasher or reserve expected size:
unordered_map<int,int> m; m.reserve(1024); m.max_load_factor(0.25);`, python:`# Python dict/set are hash tables (open addressing + probing)
d = {}
d['key'] = 1           # O(1) average
'key' in d             # O(1)
del d['key']           # O(1)
d.get('key', 0)        # O(1) with default

s = set()
s.add(1); s.discard(1); 1 in s  # all O(1)

from collections import defaultdict, Counter
freq = Counter("mississippi")    # O(n)
groups = defaultdict(list)       # default value is an empty list`}}</Code>

      <QA q="Why is the initial count[0]=1 in the subarray sum algorithm critical? What happens without it?" a="Without count[0]=1, we miss subarrays that START at index 0. For example, if nums=[3,1] and k=3, the prefix sums are [0,3,4]. When ps=3, we look for count[3-3]=count[0]. Without the initial entry, count[0]=0 and we miss the subarray [3]. The initial {0:1} represents the 'empty prefix' (no elements yet taken) — an imaginary prefix sum of 0 that occurred once before the array started." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — PROBLEMS
══════════════════════════════════════════════════════ */
function SectionProblems() {
  return (
    <div>
      <Note color="purple" icon="ti-tournament">
        6 hash table problems — LC 1, 49, 560, 128 (the four prescribed) plus two important complementary patterns.
      </Note>

      <ProblemCard num={1} title="Two Sum" difficulty="OA Easy" tags={["LC 1","Hash Map"]}
        statement="Given an integer array <code>nums</code> and an integer <code>target</code>, return indices of the two numbers that add up to target. Each input has exactly one solution. Do not use the same element twice."
        constraints={["2 ≤ n ≤ 10⁴","-10⁹ ≤ nums[i] ≤ 10⁹","Exactly one solution"]}
        examples={[{input:"nums=[2,7,11,15], target=9",output:"[0,1]",note:"2+7=9"},{input:"nums=[3,2,4], target=6",output:"[1,2]"}]}
        approach="Single pass hash map: for each nums[i], check if complement = target - nums[i] is already in the map. If yes, return [map[complement], i]. If no, store nums[i] → i. O(n) time, O(n) space. No need for the two-pointer approach (requires sorting which loses original indices)."
        code={{cpp:`vector<int> twoSum(vector<int>& nums,int target){
    unordered_map<int,int> mp;
    for(int i=0;i<nums.size();i++){
        auto it=mp.find(target-nums[i]);
        if(it!=mp.end()) return{it->second,i};
        mp[nums[i]]=i;
    }
    return{};
}`,python:`def two_sum(nums,target):
    mp={}
    for i,v in enumerate(nums):
        if target-v in mp:return[mp[target-v],i]
        mp[v]=i
    return[]`}}
      />

      <ProblemCard num={2} title="Group Anagrams" difficulty="LC Medium" tags={["LC 49","Sorted Key Hashing"]}
        statement="Given an array of strings, group the anagrams together. Return in any order."
        constraints={["1 ≤ strs.length ≤ 10⁴","0 ≤ strs[i].length ≤ 100","strs[i] consists of lowercase letters"]}
        examples={[{input:`strs=["eat","tea","tan","ate","nat","bat"]`,output:`[["bat"],["nat","tan"],["ate","eat","tea"]]`}]}
        approach="Canonical key: sort each string's characters to produce its anagram signature. All anagrams produce the same sorted key. Group strings by this key using a hash map. O(n × L log L) where L = max string length. Alternative O(n × L): use a 26-char frequency tuple as key."
        code={{cpp:`vector<vector<string>> groupAnagrams(vector<string>& strs){
    unordered_map<string,vector<string>> mp;
    for(auto& s:strs){string key=s;sort(key.begin(),key.end());mp[key].push_back(s);}
    vector<vector<string>> res;
    for(auto&[k,v]:mp)res.push_back(v);
    return res;
}`,python:`from collections import defaultdict
def group_anagrams(strs):
    mp=defaultdict(list)
    for s in strs:mp[tuple(sorted(s))].append(s)
    return list(mp.values())`}}
      />

      <ProblemCard num={3} title="Subarray Sum Equals K" difficulty="LC Medium" tags={["LC 560","Prefix+Hash"]}
        statement="Given an integer array <code>nums</code> and integer <code>k</code>, return the total number of subarrays whose sum equals <code>k</code>. Subarrays are contiguous. Negative numbers allowed."
        constraints={["1 ≤ n ≤ 2×10⁴","-1000 ≤ nums[i] ≤ 1000","-10⁷ ≤ k ≤ 10⁷"]}
        examples={[{input:"nums=[1,1,1], k=2",output:"2"},{input:"nums=[1,2,3], k=3",output:"2",note:"[1,2] and [3]"}]}
        approach="Prefix sum + hash map. Initialize count[0]=1. For each element, update prefix_sum. Check if (prefix_sum−k) was seen before → those past prefix sums form valid subarray ends. Add count[ps−k] to answer, then increment count[ps]. O(n) time, O(n) space. Sliding window fails with negatives — hash map is required."
        code={{cpp:`int subarraySum(vector<int>& nums,int k){
    unordered_map<int,int> cnt; cnt[0]=1;
    int ps=0,ans=0;
    for(int x:nums){ps+=x;ans+=cnt.count(ps-k)?cnt[ps-k]:0;cnt[ps]++;}
    return ans;
}`,python:`def subarray_sum(nums,k):
    cnt={0:1};ps=ans=0
    for x in nums:ps+=x;ans+=cnt.get(ps-k,0);cnt[ps]=cnt.get(ps,0)+1
    return ans`}}
      />

      <ProblemCard num={4} title="Longest Consecutive Sequence" difficulty="LC Medium" tags={["LC 128","Hash Set O(n)"]}
        statement="Given an unsorted array of integers, return the length of the longest consecutive elements sequence. Solve in O(n) time."
        constraints={["0 ≤ n ≤ 10⁵","−10⁹ ≤ nums[i] ≤ 10⁹"]}
        examples={[{input:"nums=[100,4,200,1,3,2]",output:"4",note:"Sequence: 1,2,3,4"},{input:"nums=[0,3,7,2,5,8,4,6,0,1]",output:"9"}]}
        approach="Hash set of all numbers. For each number that has no left neighbor (n-1 not in set), it starts a sequence — count forward until the sequence breaks. Only start counting at sequence beginnings → each number visited at most twice → O(n). Key: set lookup is O(1), enabling the O(n) guarantee."
        code={{cpp:`int longestConsecutive(vector<int>& nums){
    unordered_set<int> s(nums.begin(),nums.end());
    int ans=0;
    for(int n:s){
        if(s.count(n-1))continue;
        int len=0,cur=n;
        while(s.count(cur++))len++;
        ans=max(ans,len);
    }
    return ans;
}`,python:`def longest_consecutive(nums):
    s=set(nums);ans=0
    for n in s:
        if n-1 in s:continue
        cur=n;length=0
        while cur in s:cur+=1;length+=1
        ans=max(ans,length)
    return ans`}}
      />

      <ProblemCard num={5} title="Longest Subarray with Sum Divisible by K" difficulty="LC Medium" tags={["LC 974","Prefix Mod"]}
        statement="Given an integer array <code>nums</code> and integer <code>k</code>, return the number of non-empty subarrays with sum divisible by <code>k</code>."
        constraints={["1 ≤ n ≤ 3×10⁴","1 ≤ k ≤ 10⁴","-10⁴ ≤ nums[i] ≤ 10⁴"]}
        examples={[{input:"nums=[4,5,0,-2,-3,1], k=5",output:"7",note:"7 subarrays have sum divisible by 5"}]}
        approach="Prefix sum modulo k. sum(i..j) divisible by k iff prefix[j] % k == prefix[i-1] % k. Store remainders in a hash map. Handle negative remainders by adding k: rem = ((ps%k)+k)%k. For each new remainder, add count[rem] to answer (same remainder seen before = valid subarray). Initialize map[0]=1."
        code={{cpp:`int subarraysDivByK(vector<int>& nums,int k){
    unordered_map<int,int> cnt; cnt[0]=1;
    int ps=0,ans=0;
    for(int x:nums){
        ps+=x; int rem=((ps%k)+k)%k;
        ans+=cnt.count(rem)?cnt[rem]:0; cnt[rem]++;
    }
    return ans;
}`,python:`def subarrays_div_by_k(nums,k):
    cnt={0:1};ps=ans=0
    for x in nums:
        ps+=x;rem=(ps%k+k)%k
        ans+=cnt.get(rem,0);cnt[rem]=cnt.get(rem,0)+1
    return ans`}}
      />

      <ProblemCard num={6} title="Four Sum II (All pairs from 4 arrays)" difficulty="LC Medium" tags={["LC 454","2-Sum MITM"]}
        statement="Given four integer arrays each of size <code>n</code>, count the number of tuples (i,j,k,l) such that <code>nums1[i]+nums2[j]+nums3[k]+nums4[l]==0</code>."
        constraints={["1 ≤ n ≤ 200","-2²⁸ ≤ nums[i] ≤ 2²⁸"]}
        examples={[{input:"nums1=[1,2], nums2=[-2,-1], nums3=[-1,2], nums4=[0,2]",output:"2"},{input:"nums1=[0], nums2=[0], nums3=[0], nums4=[0]",output:"1"}]}
        approach="Meet in the middle via hash map. Compute all n² sums of nums1[i]+nums2[j] and store in map[sum]→count. Then for all n² pairs nums3[k]+nums4[l], check if -(nums3[k]+nums4[l]) is in the map. O(n²) time and space — compared to O(n⁴) brute force or O(n³) with sort+binary search."
        code={{cpp:`int fourSumCount(vector<int>& a,vector<int>& b,vector<int>& c,vector<int>& d){
    unordered_map<int,int> mp;
    for(int x:a) for(int y:b) mp[x+y]++;
    int ans=0;
    for(int x:c) for(int y:d) ans+=mp.count(-(x+y))?mp[-(x+y)]:0;
    return ans;
}`,python:`from collections import Counter
def four_sum_count(A,B,C,D):
    ab=Counter(a+b for a in A for b in B)
    return sum(ab[-(c+d)] for c in C for d in D)`}}
      />
    </div>
  );
}

/* ROOT */
const TABS = [
  {id:'foundations',   label:'Foundations & Chaining'},
  {id:'openaddr',      label:'Open Addressing'},
  {id:'prefixhash',    label:'Prefix + Hash Pattern'},
  {id:'problems',      label:'Problems'},
];
export default function Hashing() {
  const [active,setActive]=useState('foundations');
  const map={
    foundations:<SectionFoundations/>,
    openaddr:   <SectionOpenAddressing/>,
    prefixhash: <SectionPrefixHash/>,
    problems:   <SectionProblems/>,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 20</div>
        <h1 className="page-header-title">Hashing &amp; Hash Tables</h1>
        <p className="page-header-subtitle">
          Direct Address · Division · Multiplication · Chaining · Linear · Quadratic · Double Hashing · Prefix+Hash Pattern · LC 1, 49, 560, 128
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={20}/>
    </div>
  );
}
