import { useState, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   STEP BUILDERS
══════════════════════════════════════════════════════ */

/* ── Sliding Window Max on [2,1,5,3,6,4,8,2], k=3 ─── */
const SW_ARR = [2, 1, 5, 3, 6, 4, 8, 2];
const SW_K   = 3;
function buildSWSteps(arr, k) {
  const n = arr.length;
  const steps = [];
  const dq = [];       // stores indices
  const result = [];

  steps.push({ i: -1, dq: [], result: [], winStart: 0, action: 'init',
    desc: `Sliding window of size k=${k}. Deque stores indices in DECREASING value order. Front = max of current window.` });

  for (let i = 0; i < n; i++) {
    // Remove out-of-window from front
    while (dq.length > 0 && dq[0] <= i - k) {
      const removed = dq.shift();
      steps.push({ i, dq: [...dq], result: [...result], winStart: Math.max(0, i - k + 1), action: 'evict',
        desc: `i=${i}: Front idx ${removed} is out of window [${Math.max(0,i-k+1)}..${i}]. Evict from deque front.` });
    }
    // Remove smaller from back
    while (dq.length > 0 && arr[dq[dq.length - 1]] <= arr[i]) {
      const removed = dq.pop();
      steps.push({ i, dq: [...dq], result: [...result], winStart: Math.max(0, i - k + 1), action: 'popBack',
        desc: `i=${i}: arr[${removed}]=${arr[removed]} ≤ arr[${i}]=${arr[i]} → useless (can never be max while ${arr[i]} is in window). Pop from back.` });
    }
    dq.push(i);
    const isReady = i >= k - 1;
    if (isReady) result.push(arr[dq[0]]);
    steps.push({ i, dq: [...dq], result: [...result], winStart: Math.max(0, i - k + 1), action: isReady ? 'record' : 'push',
      desc: isReady
        ? `Push ${i}. Window [${Math.max(0,i-k+1)}..${i}] complete. Max = arr[${dq[0]}] = ${arr[dq[0]]}. Record.`
        : `Push ${i}. Window not full yet (need ${k - i - 1} more).` });
  }
  steps.push({ i: n, dq: [], result: [...result], winStart: n - k, action: 'done',
    desc: `Done! Sliding window maximums: [${result.join(', ')}]` });
  return steps;
}
const SW_STEPS = buildSWSteps(SW_ARR, SW_K);

/* ── Petrol Pump / Circular Tour ────────────────────── */
// stations: [{petrol, cost}], valid start = 2
const PUMP_STATIONS = [
  { petrol: 6, cost: 4 },
  { petrol: 3, cost: 6 },
  { petrol: 7, cost: 3 },
  { petrol: 4, cost: 5 },
];
function buildPumpSteps(stations) {
  const n = stations.length;
  const steps = [];
  let start = 0, tank = 0, deficit = 0;
  steps.push({ start, tank, deficit, i: -1, action: 'init',
    desc: `n=${n} stations. Greedy: if tank < 0 at station i → shift start to i+1, accumulate deficit. If total net ≥ 0, the surviving start is valid.` });
  for (let i = 0; i < n; i++) {
    const net = stations[i].petrol - stations[i].cost;
    tank += net;
    steps.push({ start, tank, deficit, i, action: tank < 0 ? 'fail' : 'ok',
      net,
      desc: tank >= 0
        ? `Station ${i}: +${stations[i].petrol} − ${stations[i].cost} = ${net > 0 ? '+' : ''}${net}. Tank = ${tank}. Continue.`
        : `Station ${i}: ${net}. Tank = ${tank} < 0! Can't continue from start=${start}. deficit += ${-tank}. Start = ${i+1}.` });
    if (tank < 0) {
      deficit += -tank;
      start = i + 1;
      tank = 0;
      if (start < n) {
        steps.push({ start, tank, deficit, i, action: 'reset',
          desc: `Reset: tank = 0, start = ${start}. Continue testing from here.` });
      }
    }
  }
  const totalNet = stations.reduce((a, s) => a + s.petrol - s.cost, 0);
  const valid = totalNet >= 0;
  steps.push({ start: valid ? start : -1, tank, deficit, i: n, action: 'done',
    desc: valid
      ? `Total net = ${totalNet} ≥ 0 → circuit IS possible! Starting index = ${start}.`
      : `Total net = ${totalNet} < 0 → no valid starting point exists.` });
  return steps;
}
const PUMP_STEPS = buildPumpSteps(PUMP_STATIONS);

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — CIRCULAR QUEUE (button-driven)
══════════════════════════════════════════════════════ */
const CQ_SIZE = 7;
function CircularQueueViz() {
  const [arr, setArr]     = useState(Array(CQ_SIZE).fill(null));
  const [front, setFront] = useState(0);
  const [rear, setRear]   = useState(0);
  const [count, setCount] = useState(0);
  const [val, setVal]     = useState(1);
  const [log, setLog]     = useState('Queue initialized. Capacity = 7.');

  const enqueue = useCallback(() => {
    if (count === CQ_SIZE) { setLog('OVERFLOW: Queue is full!'); return; }
    const newArr = [...arr];
    newArr[rear] = val;
    const newRear = (rear + 1) % CQ_SIZE;
    setArr(newArr); setRear(newRear); setCount(count + 1);
    setLog(`Enqueue ${val} at index ${rear}. rear = (${rear}+1)%${CQ_SIZE} = ${newRear}. Count = ${count + 1}.`);
    setVal(v => v + 1);
  }, [arr, rear, count, val]);

  const dequeue = useCallback(() => {
    if (count === 0) { setLog('UNDERFLOW: Queue is empty!'); return; }
    const v = arr[front];
    const newArr = [...arr]; newArr[front] = null;
    const newFront = (front + 1) % CQ_SIZE;
    setArr(newArr); setFront(newFront); setCount(count - 1);
    setLog(`Dequeue ${v} from index ${front}. front = (${front}+1)%${CQ_SIZE} = ${newFront}. Count = ${count - 1}.`);
  }, [arr, front, count]);

  const reset = () => {
    setArr(Array(CQ_SIZE).fill(null)); setFront(0); setRear(0); setCount(0); setVal(1);
    setLog('Queue reset.');
  };

  // Circular positions: arrange 7 slots in a circle
  const RADIUS = 70;
  const cx = 100, cy = 100;
  const slotPos = (i) => {
    const angle = (i / CQ_SIZE) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + RADIUS * Math.cos(angle), y: cy + RADIUS * Math.sin(angle) };
  };

  return (
    <VizBox>
      {/* Log */}
      <div style={{ marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>{log}</div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Circular SVG */}
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ flexShrink: 0 }}>
          {/* Slot circles */}
          {arr.map((v, i) => {
            const { x, y } = slotPos(i);
            const isFront = i === front && count > 0;
            const isRear  = i === (rear - 1 + CQ_SIZE) % CQ_SIZE && count > 0;
            const hasVal  = v !== null;
            const bg      = isFront && isRear ? '#3A2A5A' : isFront ? '#1A3A2A' : isRear ? '#2A2A3A' : hasVal ? '#1A2A3A' : '#131722';
            const bd      = isFront && isRear ? '#C586C0' : isFront ? '#4EC9B0' : isRear ? '#81B4EA' : hasVal ? '#334155' : '#1E2233';
            const tc      = isFront && isRear ? '#C586C0' : isFront ? '#4EC9B0' : isRear ? '#9CDCFE' : hasVal ? '#DCDCAA' : '#4A5170';
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="18" fill={bg} stroke={bd} strokeWidth="1.5" />
                <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fill={tc} fontSize="11" fontFamily="monospace" fontWeight={hasVal?700:400}>{v ?? i}</text>
                {isFront && <text x={x} y={y+28} textAnchor="middle" fill="#4EC9B0" fontSize="9" fontFamily="monospace">F</text>}
                {isRear  && <text x={x} y={isFront?y+36:y+28} textAnchor="middle" fill="#9CDCFE" fontSize="9" fontFamily="monospace">R</text>}
              </g>
            );
          })}
          {/* Center info */}
          <text x={cx} y={cy-8} textAnchor="middle" fill="var(--color-text-tertiary)" fontSize="9" fontFamily="monospace">count</text>
          <text x={cx} y={cy+6} textAnchor="middle" fill="var(--color-text-secondary)" fontSize="16" fontFamily="monospace" fontWeight="700">{count}/{CQ_SIZE}</text>
        </svg>

        {/* Controls */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="number" value={val} onChange={e => setVal(+e.target.value)} style={{ width: 60, padding: '5px 8px', background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 'var(--border-radius-md)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none' }} />
            <button onClick={enqueue} style={{ padding: '6px 14px', border: '1px solid var(--color-border-success)', borderRadius: 'var(--border-radius-md)', background: 'var(--color-background-success)', color: 'var(--color-text-success)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Enqueue</button>
          </div>
          <button onClick={dequeue} style={{ padding: '6px 14px', border: '1px solid var(--color-border-danger)', borderRadius: 'var(--border-radius-md)', background: 'var(--color-background-danger)', color: 'var(--color-text-danger)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Dequeue</button>
          <button onClick={reset} style={{ padding: '6px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>Reset</button>
          <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.9 }}>
            <div><span style={{ color: '#4EC9B0' }}>front</span> = {front}  (dequeue from here)</div>
            <div><span style={{ color: '#9CDCFE' }}>rear</span>  = {rear}  (enqueue here)</div>
            <div><span style={{ color: '#6A9955' }}>rear = (rear+1) % {CQ_SIZE}</span>  ← no shifting!</div>
          </div>
        </div>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — SLIDING WINDOW MAX (MONOTONIC DEQUE)
══════════════════════════════════════════════════════ */
function SlidingWindowViz() {
  const [step, setStep] = useState(0);
  const s = SW_STEPS[Math.min(step, SW_STEPS.length - 1)];
  const n = SW_ARR.length;

  const ACTION_CLR = { init:null, evict:'danger', popBack:'warning', push:'info', record:'success', done:'success' };
  const ac = ACTION_CLR[s.action] || 'info';

  return (
    <VizBox>
      <div style={{ marginBottom: 14, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        {ac && s.action !== 'init' && <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:700, background:`var(--color-background-${ac})`, color:`var(--color-text-${ac})`, border:`1px solid var(--color-border-${ac})`, whiteSpace:'nowrap' }}>
          {s.action==='evict'?'Evict (expired)':s.action==='popBack'?'Pop back (useless)':s.action==='push'?'Push':s.action==='record'?'Record max ★':'Done ✓'}
        </span>}
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</span>
      </div>

      {/* Array + window highlight */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:5, letterSpacing:'0.06em' }}>
          ARRAY  (k={SW_K})
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {SW_ARR.map((v, i) => {
            const inWin  = s.i >= 0 && i >= s.winStart && i <= s.i;
            const isCur  = i === s.i;
            const inDq   = s.dq.includes(i);
            const isFront= s.dq.length > 0 && s.dq[0] === i;

            let c = null;
            if (s.action==='done') c = 'success';
            else if (isFront && inWin) c = 'success';
            else if (isCur) c = ac || 'info';
            else if (inDq && inWin) c = 'info';
            else if (inWin) c = 'secondary';

            return (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                {isFront && s.action !== 'done' && <div style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--color-text-success)', fontWeight:700 }}>max</div>}
                <div style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6, border:`1.5px solid ${c?`var(--color-border-${c})`:'var(--color-border-secondary)'}`, background:c?`var(--color-background-${c})`:'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:c?700:400, color:c?`var(--color-text-${c})`:'var(--color-text-secondary)', transition:'all 0.18s' }}>{v}</div>
                <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deque state */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:5, letterSpacing:'0.06em' }}>
          MONOTONIC DEQUE  (stores indices, decreasing values)
        </div>
        <div style={{ display:'flex', gap:0, alignItems:'stretch', minHeight:46 }}>
          <div style={{ padding:'6px 10px', background:'var(--color-background-tertiary)', border:'1px solid var(--color-border-tertiary)', borderRadius:'8px 0 0 8px', fontFamily:'var(--font-mono)', fontSize:10, color:'var(--color-text-tertiary)', display:'flex', alignItems:'center' }}>front</div>
          <div style={{ display:'flex', flex:1, gap:0, border:'1px solid var(--color-border-secondary)', borderLeft:'none', borderRight:'none', minHeight:46 }}>
            {s.dq.length === 0
              ? <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--color-text-tertiary)' }}>empty</div>
              : s.dq.map((idx, di) => (
                <div key={di} style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'4px 14px', background:di===0?'var(--color-background-success)':'var(--color-background-info)', borderRight:di<s.dq.length-1?'1px solid var(--color-border-secondary)':'none', gap:2 }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:14, fontWeight:700, color:di===0?'var(--color-text-success)':'var(--color-text-info)' }}>{SW_ARR[idx]}</span>
                  <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>[{idx}]</span>
                </div>
              ))
            }
          </div>
          <div style={{ padding:'6px 10px', background:'var(--color-background-tertiary)', border:'1px solid var(--color-border-tertiary)', borderRadius:'0 8px 8px 0', fontFamily:'var(--font-mono)', fontSize:10, color:'var(--color-text-tertiary)', display:'flex', alignItems:'center' }}>back</div>
        </div>
      </div>

      {/* Result */}
      {s.result.length > 0 && (
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:5, letterSpacing:'0.06em' }}>WINDOW MAXIMA</div>
          <div style={{ display:'flex', gap:4 }}>
            {s.result.map((v, i) => (
              <div key={i} style={{ padding:'5px 12px', borderRadius:6, border:'1px solid var(--color-border-success)', background:i===s.result.length-1&&s.action!=='done'?'var(--color-background-success)':'rgba(78,201,176,0.15)', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:'var(--color-text-success)' }}>{v}</div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(SW_STEPS.length-1,step+1)),step===SW_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{SW_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
        <button onClick={()=>setStep(SW_STEPS.length-1)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>End ⇥</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — PETROL PUMP CIRCULAR TOUR
══════════════════════════════════════════════════════ */
function PetrolPumpViz() {
  const [step, setStep] = useState(0);
  const s = PUMP_STEPS[Math.min(step, PUMP_STEPS.length - 1)];
  const n = PUMP_STATIONS.length;
  const R = 65, cx = 90, cy = 90;

  const pos = (i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  };

  return (
    <VizBox>
      <div style={{ marginBottom: 14, padding:'6px 10px', background:'var(--color-background-secondary)', borderRadius:'var(--border-radius-md)', fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</div>

      <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
        {/* Circular map */}
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ flexShrink:0 }}>
          {/* Direction arrows between stations */}
          {PUMP_STATIONS.map((_, i) => {
            const next = (i + 1) % n;
            const p1 = pos(i), p2 = pos(next);
            const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
            return (
              <g key={i}>
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#1E2233" strokeWidth="1.5" />
                <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle" fill="#4A5170" fontSize="8" fontFamily="monospace">{PUMP_STATIONS[i].cost}→</text>
              </g>
            );
          })}
          {/* Station circles */}
          {PUMP_STATIONS.map((st, i) => {
            const { x, y } = pos(i);
            const isStart  = i === s.start && s.action !== 'done';
            const isCur    = i === s.i;
            const isDone   = s.action === 'done' && i === s.start;
            let bg='#131722', bd='#1E2233', tc='#4A5170';
            if (isDone)    { bg='#1A3A2A'; bd='#4EC9B0'; tc='#4EC9B0'; }
            else if (isStart && isCur) { bg='#1A2A3A'; bd='#C586C0'; tc='#C586C0'; }
            else if (isStart) { bg='#1A3A2A'; bd='#4EC9B0'; tc='#4EC9B0'; }
            else if (isCur)   { bg = s.action==='fail'?'#3A1A1A':'#1A2A3A'; bd=s.action==='fail'?'#F44747':'#81B4EA'; tc=s.action==='fail'?'#F44747':'#9CDCFE'; }
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="17" fill={bg} stroke={bd} strokeWidth="1.5" />
                <text x={x} y={y-4} textAnchor="middle" dominantBaseline="middle" fill={tc} fontSize="9" fontFamily="monospace" fontWeight="700">P{i}</text>
                <text x={x} y={y+6} textAnchor="middle" dominantBaseline="middle" fill={tc} fontSize="8" fontFamily="monospace">+{st.petrol}</text>
              </g>
            );
          })}
        </svg>

        {/* State panel */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11.5, lineHeight:2, background:'#0D0F18', border:'1px solid #1E2233', borderRadius:8, padding:'10px 12px' }}>
            {[['start candidate','start',s.start,'info'],['current tank','tank',s.tank, s.tank<0?'danger':s.tank>0?'success':'secondary'],['accumulated deficit','deficit',s.deficit,'warning']].map(([label, key, val, c])=>(
              <div key={key}><span style={{ color:'var(--color-text-tertiary)', display:'inline-block', width:150 }}>{label}:</span><span style={{ color:`var(--color-text-${c})`, fontWeight:700 }}>{val}</span></div>
            ))}
          </div>
          {/* Net per station */}
          <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
            {PUMP_STATIONS.map((st, i) => {
              const net = st.petrol - st.cost;
              return (
                <div key={i} style={{ padding:'4px 8px', borderRadius:5, border:'0.5px solid var(--color-border-secondary)', background:'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:11 }}>
                  <span style={{ color:'var(--color-text-tertiary)' }}>P{i}: </span>
                  <span style={{ color:net>=0?'var(--color-text-success)':'var(--color-text-danger)', fontWeight:700 }}>{net>=0?'+':''}{net}</span>
                </div>
              );
            })}
            <div style={{ padding:'4px 8px', borderRadius:5, border:'0.5px solid var(--color-border-info)', background:'var(--color-background-info)', fontFamily:'var(--font-mono)', fontSize:11 }}>
              <span style={{ color:'var(--color-text-info)' }}>total: </span>
              <span style={{ color:'var(--color-text-info)', fontWeight:700 }}>{PUMP_STATIONS.reduce((a,s)=>a+s.petrol-s.cost,0)}</span>
            </div>
          </div>
          {s.action === 'done' && s.start >= 0 && (
            <div style={{ padding:'8px 12px', background:'var(--color-background-success)', border:'1px solid var(--color-border-success)', borderRadius:'var(--border-radius-md)', fontFamily:'var(--font-mono)', fontSize:12.5, fontWeight:700, color:'var(--color-text-success)' }}>
              ✓ Start from pump {s.start}!
            </div>
          )}
        </div>
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:14 }}>
        {[['← Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next →',()=>setStep(Math.min(PUMP_STEPS.length-1,step+1)),step===PUMP_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{padding:'5px 14px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-secondary)',cursor:d?'not-allowed':'pointer',fontSize:12,opacity:d?0.4:1}}>{l}</button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--color-text-tertiary)',minWidth:60,textAlign:'center',alignSelf:'center'}}>{step+1}/{PUMP_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{padding:'5px 9px',border:'1px solid var(--color-border-tertiary)',borderRadius:'var(--border-radius-md)',background:'transparent',color:'var(--color-text-tertiary)',cursor:'pointer',fontSize:12}}>↺</button>
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
   SECTION 1 — QUEUE FUNDAMENTALS
══════════════════════════════════════════════════════ */
function SectionFoundations() {
  return (
    <div>
      <Note color="info" icon="ti-arrow-right">
        A queue is a <strong>FIFO</strong> (First In, First Out) structure. Elements join at the <em>rear</em> (enqueue) and leave from the <em>front</em> (dequeue). Think of a ticket line — whoever arrives first gets served first.
      </Note>

      <H2>Circular Array Queue — Why Circular?</H2>
      <P>A naive array queue wastes space: after dequeuing, slots at the front are abandoned. Resizing to reclaim them costs O(n). The circular approach keeps front and rear as modular indices — they wrap around using <code>(index + 1) % capacity</code>. No shifting. No wasted space. All O(1).</P>
      <CircularQueueViz />
      <Code>{{cpp:`class Queue {
    vector<int> arr;
    int front, rear, cnt, cap;
public:
    Queue(int c) : arr(c), front(0), rear(0), cnt(0), cap(c) {}

    void enqueue(int x) {
        if (cnt == cap) return;          // overflow check
        arr[rear] = x;
        rear = (rear + 1) % cap;        // wrap around — no shifting!
        cnt++;
    }
    int dequeue() {
        if (cnt == 0) return -1;         // underflow check
        int v = arr[front];
        front = (front + 1) % cap;      // advance front circularly
        cnt--;
        return v;
    }
    int getFront() { return arr[front]; }
    int getRear()  { return arr[(rear - 1 + cap) % cap]; }
    bool isEmpty() { return cnt == 0; }
    bool isFull()  { return cnt == cap; }
};`, python:`class Queue:
    def __init__(self, cap):
        self.arr=[None]*cap; self.front=0; self.rear=0; self.cnt=0; self.cap=cap
    def enqueue(self,x):
        if self.cnt==self.cap: return
        self.arr[self.rear]=x
        self.rear=(self.rear+1)%self.cap; self.cnt+=1
    def dequeue(self):
        if self.cnt==0: return -1
        v=self.arr[self.front]
        self.front=(self.front+1)%self.cap; self.cnt-=1; return v
    def is_empty(self): return self.cnt==0`}}</Code>

      <H2>Linked List Queue — O(1) Both Ends</H2>
      <P>Maintain both a head (front) and tail (rear) pointer. Enqueue appends a new node at the tail in O(1). Dequeue removes the head node in O(1). No modular arithmetic needed.</P>
      <Code>{{cpp:`struct Node { int val; Node* next; };
class LLQueue {
    Node* head=nullptr; Node* tail=nullptr; int sz=0;
public:
    void enqueue(int x) {
        Node* n = new Node{x, nullptr};
        if (!tail) head = tail = n;
        else { tail->next = n; tail = n; }  // append at TAIL — O(1)
        sz++;
    }
    int dequeue() {
        int v = head->val;
        Node* t = head; head = head->next;
        if (!head) tail = nullptr;
        delete t; sz--; return v;           // remove from HEAD — O(1)
    }
};`, python:`from collections import deque
# Python deque is a doubly-linked list internally — O(1) both ends
q = deque()
q.append(1)        # enqueue  (right end)
q.appendleft(0)    # enqueue front
q.pop()            # dequeue from right
q.popleft()        # dequeue from left (FIFO queue behavior)`}}</Code>

      <H2>Deque — Double-Ended Queue</H2>
      <P>A deque (pronounced "deck") supports O(1) insertions and deletions at BOTH ends. Implemented as a circular array or doubly linked list. Used as a sliding window max data structure (monotonic deque) and as the basis for bidirectional algorithms.</P>
      <Table
        heads={["Operation", "Array-based", "DLL-based", "Notes"]}
        rows={[
          ["insertFront(x)", "O(1) amortized","O(1)","Circular array: decrement front pointer with wrap"],
          ["insertRear(x)",  "O(1) amortized","O(1)","Circular array: increment rear pointer with wrap"],
          ["deleteFront()",  "O(1)","O(1)","Increment front"],
          ["deleteRear()",   "O(1)","O(1)","DLL: use prev pointer. Circular array: decrement rear"],
          ["getFront()",     "O(1)","O(1)","Just read arr[front] or head->val"],
          ["getRear()",      "O(1)","O(1)","Just read arr[(rear-1+n)%n] or tail->val"],
        ]}
      />

      <QA q="How does the circular array detect overflow vs empty when front == rear?" a="The ambiguity is the classic circular buffer problem. Two common solutions: (1) Maintain an explicit count variable — the approach above. (2) Leave one slot permanently empty: full = (rear+1)%cap == front; empty = front == rear. The count approach is simpler and avoids the wasted slot." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — CLASSIC QUEUE PROBLEMS
══════════════════════════════════════════════════════ */
function SectionClassic() {
  return (
    <div>
      <H2>Reverse a Queue</H2>
      <P>Using a stack: dequeue all elements into a stack, then push all back into the queue. The stack's LIFO reverses the FIFO order. O(n) time, O(n) space.</P>
      <Code>{{cpp:`queue<int> reverseQueue(queue<int> q) {
    stack<int> st;
    while (!q.empty()) { st.push(q.front()); q.pop(); }
    while (!st.empty()) { q.push(st.top()); st.pop(); }
    return q;
}
// {10,5,15,20} → {20,15,5,10}

// Recursive version (uses call stack — O(n) implicit space):
void reverseRec(queue<int>& q) {
    if (q.empty()) return;
    int front = q.front(); q.pop();
    reverseRec(q);
    q.push(front);
}`,python:`from collections import deque
def reverse_queue(q):
    st=list(q); q.clear()
    while st: q.append(st.pop())
    return q

# Recursive:
def reverse_rec(q):
    if not q: return
    front=q.popleft()
    reverse_rec(q)
    q.append(front)`}}</Code>

      <H2>Generate Numbers with Given Digits (BFS via Queue)</H2>
      <P>Generate numbers in sorted order using only a given digit set {5, 6}. Classic BFS pattern: start with single-digit numbers, generate children by appending each digit. Since BFS processes level by level, output is automatically sorted.</P>
      <Code>{{cpp:`void generateNumbers(vector<int>& digits, int n) {
    queue<string> q;
    for (int d : digits) q.push(to_string(d));  // seed with single digits
    while (n--) {
        string front = q.front(); q.pop();
        cout << front << " ";
        for (int d : digits)
            q.push(front + to_string(d));        // append each digit — BFS level order
    }
}
// digits={5,6}, n=8 → 5 6 55 56 65 66 555 556`,python:`from collections import deque
def generate_numbers(digits, n):
    q=deque(str(d) for d in digits)
    for _ in range(n):
        front=q.popleft(); print(front,end=' ')
        for d in digits: q.append(front+str(d))`}}</Code>

      <H2>BFS Template — Queue is the Core</H2>
      <P>Every breadth-first search is fundamentally a queue problem: enqueue the source, repeatedly dequeue + enqueue unvisited neighbors. The queue ensures level-by-level exploration — the structural foundation of shortest-path algorithms on unweighted graphs.</P>
      <Code>{{cpp:`// Generic BFS template — queue is the engine
void bfs(Graph& g, int src) {
    queue<int> q; vector<bool> visited(g.V, false);
    q.push(src); visited[src] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        process(u);                      // do whatever with this node
        for (int v : g.adj[u]) {
            if (!visited[v]) { q.push(v); visited[v] = true; }
        }
    }
}`,python:`from collections import deque
def bfs(graph, src):
    q=deque([src]); visited={src}
    while q:
        u=q.popleft(); process(u)
        for v in graph[u]:
            if v not in visited: q.append(v); visited.add(v)`}}</Code>

      <QA q="Why is a queue better than a stack for BFS, and what happens if you swap them?" a="A queue gives FIFO order — first node in, first node explored. This guarantees level-by-level exploration: all distance-1 nodes before distance-2 nodes, etc. If you swap in a stack, you get DFS (depth-first): you'd dive as deep as possible before backtracking. For shortest-path algorithms on unweighted graphs, only BFS (queue) is correct — DFS would give arbitrary path lengths, not minimum ones." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — SLIDING WINDOW MAX & PETROL PUMP
══════════════════════════════════════════════════════ */
function SectionAdvanced() {
  return (
    <div>
      <H2>Sliding Window Maximum — Monotonic Deque</H2>
      <P>Find the maximum element in every window of size k. Brute force: O(nk). Monotonic deque: O(n) by maintaining a deque of indices in <em>decreasing value order</em>. The front is always the maximum of the current window. Pop from back when a larger element comes in (those smaller elements can never be maximum while this larger one is in the window). Pop from front when an index falls out of the window.</P>
      <SlidingWindowViz />
      <Code>{{cpp:`vector<int> maxSlidingWindow(vector<int>& arr, int k) {
    deque<int> dq;   // stores indices, values are DECREASING
    vector<int> res;
    for (int i = 0; i < arr.size(); i++) {
        // Remove expired indices (out of window)
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        // Maintain decreasing order: remove smaller elements from back
        while (!dq.empty() && arr[dq.back()] <= arr[i]) dq.pop_back();
        dq.push_back(i);
        // Window is full: record maximum (always at front)
        if (i >= k - 1) res.push_back(arr[dq.front()]);
    }
    return res;
}
// [2,1,5,3,6,4,8,2], k=3 → [5,5,6,6,8,8]   O(n) — each element pushed & popped once`,python:`from collections import deque
def max_sliding_window(arr, k):
    dq=deque(); res=[]
    for i,v in enumerate(arr):
        while dq and dq[0]<=i-k: dq.popleft()   # evict expired
        while dq and arr[dq[-1]]<=v: dq.pop()    # remove useless
        dq.append(i)
        if i>=k-1: res.append(arr[dq[0]])
    return res`}}</Code>
      <Note color="info" icon="ti-math">
        <strong>Why is each element processed O(1) amortized?</strong> Each index is pushed to the deque exactly once and popped at most once (either from the back during the "remove smaller" step, or from the front during the "expired" step). Total: O(2n) operations for n elements → O(n).
      </Note>

      <H2>Petrol Pump — Circular Tour (Greedy O(n))</H2>
      <P>Given N pumps on a circle, each with (petrol, cost): find the start index that completes the full loop. Key theorem: if total(petrol) ≥ total(cost), exactly one valid start exists. Greedy: simulate from index 0; whenever tank goes negative, the current start is invalid — shift start to the next pump and reset. The accumulated deficit is checked at the end.</P>
      <PetrolPumpViz />
      <Code>{{cpp:`int circularTour(vector<pair<int,int>>& pumps) {
    int n=pumps.size(), start=0, tank=0, deficit=0;
    for (int i=0; i<n; i++) {
        tank += pumps[i].first - pumps[i].second;  // net fuel at pump i
        if (tank < 0) {
            deficit += tank;  // accumulate debt — will be repaid by earlier stations
            start = i + 1;    // give up on current candidate
            tank  = 0;
        }
    }
    return (tank + deficit >= 0) ? start : -1;
}
// [{6,4},{3,6},{7,3},{4,5}] → start=2   O(n) time, O(1) space`,python:`def circular_tour(pumps):
    start=tank=deficit=0
    for i,(p,c) in enumerate(pumps):
        tank+=p-c
        if tank<0:
            deficit+=tank; start=i+1; tank=0
    return start if tank+deficit>=0 else -1`}}</Code>
      <Note color="success" icon="ti-math">
        <strong>Why does this greedy work?</strong> When a simulation from start fails at station i (tank &lt; 0), any station between start and i also fails — because starting later means missing the positive contributions from stations start..i-1. So we can skip all of them and try i+1. The accumulated deficit tracks how much total "help" the skipped stations would have needed — if total net fuel ≥ 0, the surviving start can supply this deficit from the "front" of the tour.
      </Note>

      <QA q="What if multiple starting positions are valid in the petrol pump problem?" a="The theorem guarantees at most one valid starting position when total(petrol) = total(cost). In general, if total petrol > total cost, the 'last surviving start' from the greedy is correct. The algorithm always returns the smallest valid starting index (the first one that doesn't fail). For competitive programming purposes, the problem is typically posed with exactly one valid start or no valid start." />
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
        5 queue problems — circular array design, BFS patterns, monotonic deque, and the circular tour.
      </Note>

      <ProblemCard num={1} title="Implement Queue Using Stacks" difficulty="LC Medium" tags={["LC 232","Two Stacks"]}
        statement="Implement a queue using only two stacks. The queue should support push (enqueue), pop (dequeue), peek (getFront), and empty operations."
        constraints={["1 ≤ x ≤ 9","At most 100 operations","pop/peek on non-empty queue"]}
        examples={[{input:"push(1),push(2),peek→1,pop→1,empty→false",output:"[1,2] front=1"}]}
        approach="Two stacks: inbox and outbox. Push always goes to inbox. Pop/peek: if outbox is empty, move all inbox items to outbox (reversal gives FIFO order). Amortized O(1) per operation — each element moves between stacks at most once."
        code={{cpp:`class MyQueue{
    stack<int> in,out;
    void transfer(){while(!in.empty()){out.push(in.top());in.pop();}}
public:
    void push(int x){in.push(x);}
    int pop(){if(out.empty())transfer();int v=out.top();out.pop();return v;}
    int peek(){if(out.empty())transfer();return out.top();}
    bool empty(){return in.empty()&&out.empty();}
};`,python:`class MyQueue:
    def __init__(self):self.inbox=[];self.outbox=[]
    def push(self,x):self.inbox.append(x)
    def _transfer(self):
        if not self.outbox:
            while self.inbox:self.outbox.append(self.inbox.pop())
    def pop(self):self._transfer();return self.outbox.pop()
    def peek(self):self._transfer();return self.outbox[-1]
    def empty(self):return not self.inbox and not self.outbox`}}
      />

      <ProblemCard num={2} title="Reverse a Queue" difficulty="OA Easy" tags={["Stack","Recursion"]}
        statement="Given a queue, reverse its elements. Do not use any extra data structure other than a stack (iterative approach) or the call stack (recursive approach)."
        constraints={["1 ≤ n ≤ 10⁵","Each element fits in 32-bit int"]}
        examples={[{input:"{10,5,15,20}",output:"{20,15,5,10}"}]}
        approach="Iterative: dequeue all into a stack (O(n)), then pop all back into queue (LIFO reversal gives FIFO-reversed order). Recursive: dequeue front, recurse on smaller queue, then enqueue dequeued element — this enqueues elements in reverse during stack unwinding."
        code={{cpp:`void reverseQueue(queue<int>& q){
    stack<int> st;
    while(!q.empty()){st.push(q.front());q.pop();}
    while(!st.empty()){q.push(st.top());st.pop();}
}
// Recursive:
void reverseRec(queue<int>& q){
    if(q.empty())return;
    int f=q.front();q.pop();
    reverseRec(q);q.push(f);
}`,python:`from collections import deque
def reverse_queue(q):
    s=list(q);q.clear()
    while s:q.append(s.pop())
def reverse_rec(q):
    if not q:return
    f=q.popleft();reverse_rec(q);q.append(f)`}}
      />

      <ProblemCard num={3} title="Sliding Window Maximum" difficulty="LC Hard" tags={["LC 239","Monotonic Deque"]}
        statement="Given array <code>nums</code> and integer <code>k</code>, return the maximum value in each sliding window of size k. Total n−k+1 windows."
        constraints={["1 ≤ k ≤ n ≤ 10⁵","−10⁴ ≤ nums[i] ≤ 10⁴"]}
        examples={[{input:"nums=[1,3,-1,-3,5,3,6,7], k=3",output:"[3,3,5,5,6,7]"}]}
        approach="Monotonic deque of indices maintaining decreasing values. For each index i: (1) evict front if expired (index ≤ i−k). (2) Pop from back while arr[back] ≤ arr[i] — those indices are permanently useless. (3) Push i. (4) When i ≥ k−1, record arr[deque.front()]. O(n) total — each element pushed and popped at most once."
        code={{cpp:`vector<int> maxSlidingWindow(vector<int>& nums,int k){
    deque<int> dq;vector<int> res;
    for(int i=0;i<nums.size();i++){
        while(!dq.empty()&&dq.front()<=i-k)dq.pop_front();
        while(!dq.empty()&&nums[dq.back()]<=nums[i])dq.pop_back();
        dq.push_back(i);
        if(i>=k-1)res.push_back(nums[dq.front()]);
    }
    return res;
}`,python:`from collections import deque
def max_sliding_window(nums,k):
    dq=deque();res=[]
    for i,v in enumerate(nums):
        while dq and dq[0]<=i-k:dq.popleft()
        while dq and nums[dq[-1]]<=v:dq.pop()
        dq.append(i)
        if i>=k-1:res.append(nums[dq[0]])
    return res`}}
      />

      <ProblemCard num={4} title="Implement Stack Using Queues" difficulty="LC Medium" tags={["LC 225","Two Queues"]}
        statement="Implement a LIFO stack using only queues. Support push, pop, top, and empty operations."
        constraints={["1 ≤ x ≤ 9","At most 100 operations"]}
        examples={[{input:"push(1),push(2),top→2,pop→2,empty→false",output:""}]}
        approach="One queue, expensive push: when pushing x, enqueue x, then rotate the queue (n-1) times — x ends up at the front. Pop/top are O(1). OR: two queues, rotate on pop. The single-queue approach: push x to q1, then move all existing elements from q1 back after x so x is at front."
        code={{cpp:`class MyStack{
    queue<int> q;
public:
    void push(int x){
        q.push(x);
        for(int i=0;i<q.size()-1;i++){q.push(q.front());q.pop();}
    }
    int pop(){int v=q.front();q.pop();return v;}
    int top(){return q.front();}
    bool empty(){return q.empty();}
};`,python:`from collections import deque
class MyStack:
    def __init__(self):self.q=deque()
    def push(self,x):
        self.q.append(x)
        for _ in range(len(self.q)-1):self.q.append(self.q.popleft())
    def pop(self):return self.q.popleft()
    def top(self):return self.q[0]
    def empty(self):return not self.q`}}
      />

      <ProblemCard num={5} title="Gas Station (Circular Tour)" difficulty="LC Hard" tags={["LC 134","Petrol Pump"]}
        statement="N gas stations in a circle. Station i has gas[i] and costs cost[i] to travel to the next. Find the starting index to complete the circuit, or return <code>-1</code>."
        constraints={["1 ≤ n ≤ 10⁵","0 ≤ gas[i], cost[i] ≤ 10⁴"]}
        examples={[{input:"gas=[1,2,3,4,5], cost=[3,4,5,1,2]",output:"3"},{input:"gas=[2,3,4], cost=[3,4,3]",output:"-1"}]}
        approach="Greedy O(n): track running tank. When tank < 0 → current start is invalid, shift to i+1, accumulate deficit. After full scan, if total net ≥ 0 → the last surviving start is valid. The deficit accumulator serves as the 'total feasibility' check in O(1) extra space."
        code={{cpp:`int canCompleteCircuit(vector<int>& gas,vector<int>& cost){
    int start=0,tank=0,deficit=0;
    for(int i=0;i<gas.size();i++){
        tank+=gas[i]-cost[i];
        if(tank<0){deficit+=tank;start=i+1;tank=0;}
    }
    return tank+deficit>=0?start:-1;
}`,python:`def can_complete_circuit(gas,cost):
    start=tank=deficit=0
    for i,(g,c) in enumerate(zip(gas,cost)):
        tank+=g-c
        if tank<0:deficit+=tank;start=i+1;tank=0
    return start if tank+deficit>=0 else -1`}}
      />
    </div>
  );
}

/* ROOT */
const TABS = [
  {id:'foundations', label:'Queue Fundamentals'},
  {id:'classic',     label:'Classic Problems'},
  {id:'advanced',    label:'Sliding Window & Tour'},
  {id:'problems',    label:'Problems'},
];
export default function Queue() {
  const [active,setActive]=useState('foundations');
  const map={foundations:<SectionFoundations/>,classic:<SectionClassic/>,advanced:<SectionAdvanced/>,problems:<SectionProblems/>};
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 16</div>
        <h1 className="page-header-title">Queues &amp; Deques</h1>
        <p className="page-header-subtitle">FIFO · Circular Array · Linked List Queue · Deque · Reverse Queue · Sliding Window Max · Circular Tour</p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive}/>
      <div style={{padding:'0.5rem 0 2rem'}}>{map[active]}</div>
      <NavButtons moduleId={16}/>
    </div>
  );
}
