import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   STEP BUILDERS - computed once at module load
══════════════════════════════════════════════════════ */

/* SRTF Gantt chart steps */
function buildSRTFSteps() {
  // P0:arr=0,burst=5  P1:arr=1,burst=4  P2:arr=2,burst=3  P3:arr=3,burst=8
  const procs = [
    { id:'P0', arr:0, burst:5, color:'info'    },
    { id:'P1', arr:1, burst:4, color:'success'  },
    { id:'P2', arr:2, burst:3, color:'warning'  },
    { id:'P3', arr:3, burst:8, color:'purple'   },
  ];
  return [
    { t:0,  running:'P0', gantt:[{id:'P0',start:0,end:1}],  remaining:{P0:5,P1:'-',P2:'-',P3:'-'}, desc:"t=0: Only P0 has arrived. P0 runs. Remaining P0=5." },
    { t:1,  running:'P0', gantt:[{id:'P0',start:0,end:2}],  remaining:{P0:4,P1:4,P2:'-',P3:'-'}, desc:"t=1: P1 arrives (burst=4). Remaining P0=4, P1=4. Tie: continue P0 (or P1 - implementation-defined). P0 continues." },
    { t:2,  running:'P2', gantt:[{id:'P0',start:0,end:2},{id:'P2',start:2,end:3}], remaining:{P0:3,P1:4,P2:3,P3:'-'}, desc:"t=2: P2 arrives (burst=3). Remaining: P0=3, P1=4, P2=3. P2 ties P0. P2 preempts (smaller id tie-break). P2 runs." },
    { t:3,  running:'P2', gantt:[{id:'P0',start:0,end:2},{id:'P2',start:2,end:4}], remaining:{P0:3,P1:4,P2:2,P3:8}, desc:"t=3: P3 arrives (burst=8). Current shortest: P2 (rem=2). P2 continues." },
    { t:5,  running:'P0', gantt:[{id:'P0',start:0,end:2},{id:'P2',start:2,end:5},{id:'P0',start:5,end:6}], remaining:{P0:3,P1:4,P2:0,P3:8}, desc:"t=5: P2 finishes (CT=5, TAT=3, WT=0). Ready: P0=3, P1=4, P3=8. P0 (rem=3) is shortest. P0 runs." },
    { t:8,  running:'P1', gantt:[{id:'P0',start:0,end:2},{id:'P2',start:2,end:5},{id:'P0',start:5,end:8},{id:'P1',start:8,end:9}], remaining:{P0:0,P1:4,P2:0,P3:8}, desc:"t=8: P0 finishes (CT=8, TAT=8, WT=3). Ready: P1=4, P3=8. P1 is shortest. P1 runs." },
    { t:12, running:'P3', gantt:[{id:'P0',start:0,end:2},{id:'P2',start:2,end:5},{id:'P0',start:5,end:8},{id:'P1',start:8,end:12},{id:'P3',start:12,end:13}], remaining:{P0:0,P1:0,P2:0,P3:8}, desc:"t=12: P1 finishes (CT=12, TAT=11, WT=7). Only P3 left. P3 runs." },
    { t:20, running:null, gantt:[{id:'P0',start:0,end:2},{id:'P2',start:2,end:5},{id:'P0',start:5,end:8},{id:'P1',start:8,end:12},{id:'P3',start:12,end:20}], remaining:{P0:0,P1:0,P2:0,P3:0}, desc:"t=20: P3 finishes (CT=20, TAT=17, WT=9). All done! Avg WT = (3+7+0+9)/4 = 4.75" },
  ];
}
const SRTF_STEPS = buildSRTFSteps();

/* Process state machine steps */
function buildProcStateSteps() {
  return [
    { active:'new',      desc:"NEW: The OS has just created the process. PCB is allocated. Resources not yet assigned. Process waiting for OS admission.", arrow:null },
    { active:'ready',    desc:"READY: Process is loaded into RAM and waiting in the ready queue for CPU time. All needed resources (except CPU) are available.", arrow:'new->ready' },
    { active:'running',  desc:"RUNNING: Short-term scheduler selected this process. CPU is actively executing its instructions. Only ONE process can be in this state per CPU core.", arrow:'ready->running' },
    { active:'waiting',  desc:"WAITING (BLOCKED): Process issued an I/O request (disk read, network) and cannot proceed until it completes. CPU is released. Process waits in the blocked queue.", arrow:'running->waiting' },
    { active:'ready',    desc:"READY (from wait): I/O completed. Interrupt fires. OS moves process back to Ready queue. It must wait for CPU again.", arrow:'waiting->ready' },
    { active:'terminated', desc:"TERMINATED: Process has completed execution or was killed. OS deallocates its PCB, memory, and resources. Parent notified via wait().", arrow:'running->terminated' },
  ];
}
const PROC_STATE_STEPS = buildProcStateSteps();

/* Banker's algorithm safe sequence steps */
function buildBankersSteps() {
  // 3 processes, 3 resources: A=10, B=5, C=7
  // Allocation:  P0=[0,1,0] P1=[2,0,0] P2=[3,0,2] P3=[2,1,1] P4=[0,0,2]
  // Max:         P0=[7,5,3] P1=[3,2,2] P2=[9,0,2] P3=[2,2,2] P4=[4,3,3]
  // Need = Max-Alloc
  const avail0 = [3,3,2];
  return [
    { avail:[3,3,2], finished:[], desc:"Initial Available = [3,3,2]. Check which process's Need <= Available.", seq:[] },
    { avail:[3,3,2], finished:[], highlight:'P1', desc:"P1 Need=[1,2,2]. Check: 1<=3, 2<=3, 2<=2. YES. P1 can run. Simulate: give P1 its allocation [2,0,0]. On finish, release. Available = [3,3,2]+[2,0,0] = [5,3,2].", seq:[] },
    { avail:[5,3,2], finished:['P1'], highlight:'P3', desc:"Available=[5,3,2]. P3 Need=[0,1,1]. Check: 0<=5, 1<=3, 1<=2. YES. P3 runs. On finish releases [2,1,1]. Available=[7,4,3].", seq:['P1'] },
    { avail:[7,4,3], finished:['P1','P3'], highlight:'P4', desc:"Available=[7,4,3]. P4 Need=[4,3,1]. Check: 4<=7, 3<=4, 1<=3. YES. P4 runs. On finish releases [0,0,2]. Available=[7,4,5].", seq:['P1','P3'] },
    { avail:[7,4,5], finished:['P1','P3','P4'], highlight:'P0', desc:"Available=[7,4,5]. P0 Need=[7,4,3]. Check: 7<=7, 4<=4, 3<=5. YES. P0 runs. On finish releases [0,1,0]. Available=[7,5,5].", seq:['P1','P3','P4'] },
    { avail:[7,5,5], finished:['P1','P3','P4','P0'], highlight:'P2', desc:"Available=[7,5,5]. P2 Need=[6,0,0]. Check: 6<=7, 0<=5, 0<=5. YES. P2 runs. Safe sequence found!", seq:['P1','P3','P4','P0'] },
    { avail:[10,5,7], finished:['P1','P3','P4','P0','P2'], highlight:null, desc:"Safe Sequence: P1 -> P3 -> P4 -> P0 -> P2. System is in a SAFE STATE. This allocation will not lead to deadlock.", seq:['P1','P3','P4','P0','P2'] },
  ];
}
const BANKERS_STEPS = buildBankersSteps();

/* Page replacement steps - FIFO on reference string 7,0,1,2,0,3,0,4 with 3 frames */
function buildFIFOSteps() {
  const ref = [7,0,1,2,0,3,0,4];
  const frames = 3;
  let queue = [];
  let faults = 0;
  const steps = ref.map((page, i) => {
    const hit = queue.includes(page);
    let evicted = null;
    if (!hit) {
      faults++;
      if (queue.length >= frames) { evicted = queue.shift(); }
      queue = [...queue, page];
    }
    return {
      ref: page,
      frames: [...queue],
      fault: !hit,
      evicted,
      faults,
      desc: !hit
        ? (evicted != null
            ? `Page ${page}: FAULT. Evict oldest (${evicted}). Load ${page}. Faults so far: ${faults}`
            : `Page ${page}: FAULT. Empty frame available. Load ${page}. Faults so far: ${faults}`)
        : `Page ${page}: HIT. Already in frame ${queue.indexOf(page)+1}. No eviction.`,
    };
  });
  return steps;
}
const FIFO_STEPS = buildFIFOSteps();

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 - SRTF GANTT CHART
══════════════════════════════════════════════════════ */
function SRTFViz() {
  const [step, setStep] = useState(0);
  const s = SRTF_STEPS[Math.min(step, SRTF_STEPS.length - 1)];
  const CLR = { P0:'info', P1:'success', P2:'warning', P3:'purple' };
  const maxT = 20;

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'7px 12px', background:'var(--color-background-info)', border:'1px solid var(--color-border-info)', borderRadius:'var(--border-radius-md)', fontSize:13, color:'var(--color-text-info)', lineHeight:1.6 }}>{s.desc}</div>

      {/* Gantt bar */}
      <div style={{ overflowX:'auto', paddingBottom:4 }}>
        <div style={{ position:'relative', height:38, minWidth:360, background:'var(--color-background-secondary)', borderRadius:6, border:'1px solid var(--color-border-secondary)', marginBottom:6 }}>
          {s.gantt.map((seg, i) => {
            const c = CLR[seg.id] || 'secondary';
            const left = (seg.start / maxT) * 100;
            const width = ((seg.end - seg.start) / maxT) * 100;
            return (
              <div key={i} style={{ position:'absolute', left:`${left}%`, width:`${width}%`, top:3, bottom:3, background:`var(--color-background-${c})`, border:`1px solid var(--color-border-${c})`, borderRadius:3, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:10.5, fontWeight:700, color:`var(--color-text-${c})` }}>
                {seg.end - seg.start > 0.5 ? seg.id : ''}
              </div>
            );
          })}
        </div>
        {/* Time axis */}
        <div style={{ position:'relative', height:16, minWidth:360 }}>
          {[0,2,5,8,12,20].map(t => (
            <div key={t} style={{ position:'absolute', left:`${(t/maxT)*100}%`, transform:'translateX(-50%)', fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)' }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Remaining time table */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:8 }}>
        {['P0','P1','P2','P3'].map(p => {
          const rem = s.remaining[p];
          const c = CLR[p];
          return (
            <div key={p} style={{ padding:'4px 12px', borderRadius:6, border:`1px solid var(--color-border-${c})`, background: s.running===p ? `var(--color-background-${c})` : 'var(--color-background-tertiary)', fontFamily:'var(--font-mono)', fontSize:11.5 }}>
              <span style={{ color:`var(--color-text-${c})`, fontWeight:700 }}>{p}</span>
              <span style={{ color:'var(--color-text-secondary)', marginLeft:6 }}>rem: {rem}</span>
            </div>
          );
        })}
      </div>

      {/* Results table at final step */}
      {step === SRTF_STEPS.length - 1 && (
        <div style={{ marginTop:12, border:'0.5px solid var(--color-border-secondary)', borderRadius:6, overflow:'hidden', fontSize:11.5, fontFamily:'var(--font-mono)' }}>
          <div style={{ display:'flex', background:'var(--color-background-tertiary)', borderBottom:'0.5px solid var(--color-border-secondary)' }}>
            {['Process','Arr','Burst','CT','TAT','WT'].map(h => (
              <div key={h} style={{ flex:1, padding:'4px 8px', color:'var(--color-text-secondary)', fontWeight:700, fontSize:10.5 }}>{h}</div>
            ))}
          </div>
          {[['P0',0,5,8,8,3],['P1',1,4,12,11,7],['P2',2,3,5,3,0],['P3',3,8,20,17,9]].map(([p,...vals], i) => (
            <div key={i} style={{ display:'flex', borderBottom: i<3 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
              <div style={{ flex:1, padding:'4px 8px', color:`var(--color-text-${CLR[p]})`, fontWeight:700 }}>{p}</div>
              {vals.map((v, vi) => (
                <div key={vi} style={{ flex:1, padding:'4px 8px', color:'var(--color-text-primary)' }}>{v}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:12 }}>
        {[['Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next',()=>setStep(Math.min(SRTF_STEPS.length-1,step+1)),step===SRTF_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:72, textAlign:'center', alignSelf:'center' }}>{step+1} / {SRTF_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
        <button onClick={()=>setStep(SRTF_STEPS.length-1)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>End</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 - PROCESS STATE MACHINE
══════════════════════════════════════════════════════ */
function ProcStateViz() {
  const [step, setStep] = useState(0);
  const s = PROC_STATE_STEPS[Math.min(step, PROC_STATE_STEPS.length - 1)];
  const states = ['new','ready','running','waiting','terminated'];
  const clrs = { new:'secondary', ready:'info', running:'success', waiting:'warning', terminated:'danger' };

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'7px 12px', background:'var(--color-background-success)', border:'1px solid var(--color-border-success)', borderRadius:'var(--border-radius-md)', fontSize:13, color:'var(--color-text-success)', lineHeight:1.6 }}>{s.desc}</div>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', padding:'8px 0' }}>
        {states.map(st => {
          const c = clrs[st];
          const isActive = s.active === st;
          return (
            <div key={st} style={{ padding:'8px 18px', borderRadius:8, border:`2px solid ${isActive ? `var(--color-border-${c})` : 'var(--color-border-tertiary)'}`, background: isActive ? `var(--color-background-${c})` : 'var(--color-background-secondary)', fontFamily:'var(--font-mono)', fontSize:12.5, fontWeight:700, color: isActive ? `var(--color-text-${c})` : 'var(--color-text-tertiary)', transition:'all 0.2s', textTransform:'uppercase', letterSpacing:'0.04em' }}>
              {st}
            </div>
          );
        })}
      </div>
      {s.arrow && (
        <div style={{ textAlign:'center', fontSize:12, color:'var(--color-text-tertiary)', fontFamily:'var(--font-mono)', marginBottom:4 }}>
          {s.arrow.replace('->','  -->  ')}
        </div>
      )}
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:10 }}>
        {[['Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next',()=>setStep(Math.min(PROC_STATE_STEPS.length-1,step+1)),step===PROC_STATE_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:60, textAlign:'center', alignSelf:'center' }}>{step+1} / {PROC_STATE_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 - BANKER'S ALGORITHM
══════════════════════════════════════════════════════ */
function BankersViz() {
  const [step, setStep] = useState(0);
  const s = BANKERS_STEPS[Math.min(step, BANKERS_STEPS.length - 1)];
  const allProcs = ['P0','P1','P2','P3','P4'];
  const alloc  = { P0:[0,1,0], P1:[2,0,0], P2:[3,0,2], P3:[2,1,1], P4:[0,0,2] };
  const maxReq = { P0:[7,5,3], P1:[3,2,2], P2:[9,0,2], P3:[2,2,2], P4:[4,3,3] };
  const need   = { P0:[7,4,3], P1:[1,2,2], P2:[6,0,0], P3:[0,1,1], P4:[4,3,1] };

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'7px 12px', background: s.highlight ? 'var(--color-background-success)' : 'var(--color-background-info)', border:`1px solid ${s.highlight ? 'var(--color-border-success)' : 'var(--color-border-info)'}`, borderRadius:'var(--border-radius-md)', fontSize:13, color: s.highlight ? 'var(--color-text-success)' : 'var(--color-text-info)', lineHeight:1.6 }}>{s.desc}</div>

      {/* Resource table */}
      <div style={{ overflowX:'auto', marginBottom:10 }}>
        <div style={{ border:'0.5px solid var(--color-border-secondary)', borderRadius:6, overflow:'hidden', fontSize:11, fontFamily:'var(--font-mono)', minWidth:420 }}>
          <div style={{ display:'flex', background:'var(--color-background-tertiary)', borderBottom:'0.5px solid var(--color-border-secondary)' }}>
            {['Proc','Alloc(A,B,C)','Max(A,B,C)','Need(A,B,C)','Status'].map(h => (
              <div key={h} style={{ flex:1, padding:'4px 8px', color:'var(--color-text-secondary)', fontWeight:700, fontSize:10 }}>{h}</div>
            ))}
          </div>
          {allProcs.map((p, i) => {
            const done = s.finished.includes(p);
            const active = s.highlight === p;
            const c = active ? 'success' : done ? 'secondary' : 'info';
            return (
              <div key={p} style={{ display:'flex', borderBottom: i<4 ? '0.5px solid var(--color-border-tertiary)' : 'none', background: active ? 'var(--color-background-success)' : done ? 'var(--color-background-secondary)' : 'transparent', opacity: done && !active ? 0.5 : 1 }}>
                <div style={{ flex:1, padding:'4px 8px', color:`var(--color-text-${c})`, fontWeight:700 }}>{p}{done?' (done)':''}</div>
                <div style={{ flex:1, padding:'4px 8px', color:'var(--color-text-primary)' }}>{alloc[p].join(',')}</div>
                <div style={{ flex:1, padding:'4px 8px', color:'var(--color-text-primary)' }}>{maxReq[p].join(',')}</div>
                <div style={{ flex:1, padding:'4px 8px', color: active ? 'var(--color-text-success)' : 'var(--color-text-primary)', fontWeight: active ? 700 : 400 }}>{need[p].join(',')}</div>
                <div style={{ flex:1, padding:'4px 8px', color: done ? 'var(--color-text-success)' : 'var(--color-text-tertiary)' }}>{done ? 'DONE' : '-'}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available + safe sequence */}
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ padding:'5px 14px', borderRadius:6, border:'1px solid var(--color-border-info)', background:'var(--color-background-info)', fontFamily:'var(--font-mono)', fontSize:12 }}>
          <span style={{ color:'var(--color-text-tertiary)', fontSize:10 }}>AVAILABLE </span>
          <span style={{ color:'var(--color-text-info)', fontWeight:700 }}>{s.avail.join(',')}</span>
        </div>
        {s.seq.length > 0 && (
          <div style={{ display:'flex', gap:4, flexWrap:'wrap', alignItems:'center' }}>
            <span style={{ fontSize:10.5, color:'var(--color-text-tertiary)', fontFamily:'var(--font-mono)' }}>SEQ:</span>
            {s.seq.map((p, i) => (
              <div key={p} style={{ display:'flex', alignItems:'center', gap:3 }}>
                <span style={{ padding:'3px 9px', borderRadius:4, background:'var(--color-background-success)', border:'1px solid var(--color-border-success)', fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700, color:'var(--color-text-success)' }}>{p}</span>
                {i < s.seq.length-1 && <span style={{ color:'var(--color-text-tertiary)', fontSize:12 }}>-{'>'}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:12 }}>
        {[['Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next',()=>setStep(Math.min(BANKERS_STEPS.length-1,step+1)),step===BANKERS_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:60, textAlign:'center', alignSelf:'center' }}>{step+1} / {BANKERS_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
        <button onClick={()=>setStep(BANKERS_STEPS.length-1)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>End</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 4 - FIFO PAGE REPLACEMENT
══════════════════════════════════════════════════════ */
function FIFOViz() {
  const [step, setStep] = useState(0);
  const s = FIFO_STEPS[Math.min(step, FIFO_STEPS.length - 1)];
  const refStr = [7,0,1,2,0,3,0,4];

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'7px 12px', background: s.fault ? 'var(--color-background-danger)' : 'var(--color-background-success)', border:`1px solid ${s.fault ? 'var(--color-border-danger)' : 'var(--color-border-success)'}`, borderRadius:'var(--border-radius-md)', fontSize:13, color: s.fault ? 'var(--color-text-danger)' : 'var(--color-text-success)', lineHeight:1.6, fontWeight:s.fault ? 700 : 400 }}>
        {s.desc}
      </div>

      {/* Reference string with current highlighted */}
      <div style={{ display:'flex', gap:4, marginBottom:12, flexWrap:'wrap' }}>
        {refStr.map((p, i) => {
          const isCurrent = i === Math.min(step, FIFO_STEPS.length-1);
          const isPast = i < Math.min(step, FIFO_STEPS.length-1);
          return (
            <div key={i} style={{ width:30, height:30, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, background: isCurrent ? 'var(--color-background-warning)' : isPast ? 'var(--color-background-secondary)' : 'transparent', border: `1px solid ${isCurrent ? 'var(--color-border-warning)' : isPast ? 'var(--color-border-secondary)' : 'var(--color-border-tertiary)'}`, color: isCurrent ? 'var(--color-text-warning)' : isPast ? 'var(--color-text-secondary)' : 'var(--color-text-tertiary)' }}>{p}</div>
          );
        })}
        <div style={{ marginLeft:8, fontSize:11.5, color:'var(--color-text-tertiary)', alignSelf:'center', fontFamily:'var(--font-mono)' }}>Reference String</div>
      </div>

      {/* Frames */}
      <div style={{ display:'flex', gap:8, marginBottom:8 }}>
        {[0,1,2].map(fi => {
          const val = s.frames[fi];
          const filled = val !== undefined;
          return (
            <div key={fi} style={{ width:44, height:44, borderRadius:6, border:`1.5px solid ${filled ? 'var(--color-border-info)' : 'var(--color-border-tertiary)'}`, background: filled ? 'var(--color-background-info)' : 'var(--color-background-secondary)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:15, fontWeight:700, color: filled ? 'var(--color-text-info)' : 'var(--color-text-tertiary)' }}>
              {filled ? val : '-'}
            </div>
          );
        })}
        <div style={{ marginLeft:12, fontSize:12, color:'var(--color-text-tertiary)', alignSelf:'center' }}>Frames (FIFO order: leftmost = oldest)</div>
      </div>

      {/* Fault counter */}
      <div style={{ display:'flex', gap:12 }}>
        <div style={{ padding:'4px 12px', borderRadius:6, border:'1px solid var(--color-border-danger)', background:'var(--color-background-danger)', fontFamily:'var(--font-mono)', fontSize:12 }}>
          <span style={{ color:'var(--color-text-tertiary)' }}>Faults: </span>
          <span style={{ color:'var(--color-text-danger)', fontWeight:700 }}>{s.faults}</span>
        </div>
        <div style={{ padding:'4px 12px', borderRadius:6, border:'1px solid var(--color-border-success)', background:'var(--color-background-success)', fontFamily:'var(--font-mono)', fontSize:12 }}>
          <span style={{ color:'var(--color-text-tertiary)' }}>Hits: </span>
          <span style={{ color:'var(--color-text-success)', fontWeight:700 }}>{step+1 - s.faults}</span>
        </div>
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:12 }}>
        {[['Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next',()=>setStep(Math.min(FIFO_STEPS.length-1,step+1)),step===FIFO_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:60, textAlign:'center', alignSelf:'center' }}>{step+1} / {FIFO_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
        <button onClick={()=>setStep(FIFO_STEPS.length-1)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>End</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 - OS FOUNDATIONS
══════════════════════════════════════════════════════ */
function SectionFoundations() {
  return (
    <div>
      <Note color="info" icon="ti-cpu">
        Think of the Operating System as a <strong>government</strong> for your computer. Just as a government does not do the actual work of citizens (it does not build houses or grow food), the OS does not run your applications directly. Instead, it creates the <em>environment</em> in which applications can run safely, fairly, and efficiently. Without it, every application would have to manage hardware directly, and running two applications at the same time would be chaos.
      </Note>

      <H2>What Problem Does an OS Solve?</H2>
      <P>Imagine you write a C program that reads a file and prints output. Without an OS, your program would need to know the exact hardware address of your specific hard disk model, manage the display driver pixel-by-pixel, and ensure no other running program corrupts your memory. That is completely impractical. The OS steps in as a <strong>resource manager and hardware abstractor</strong> so your program only needs to call read() and printf() - the OS handles everything underneath.</P>
      <Grid cols={3}>
        <Card title="Resource Management" color="info">
          The OS decides which process gets the CPU, how much RAM each gets, and which process can access the disk at any moment. Without this arbiter, processes would starve or fight over resources.
        </Card>
        <Card title="Hardware Abstraction" color="success">
          Instead of your program knowing about a specific disk model or GPU, it calls OS-provided system calls (read, write, malloc). The OS translates these into hardware-specific commands. Programs become hardware-independent.
        </Card>
        <Card title="Protection and Isolation" color="warning">
          One misbehaving program cannot read another program's memory, crash the CPU, or lock up a device. The OS enforces boundaries via hardware mechanisms (memory protection, privilege rings).
        </Card>
      </Grid>

      <H2>System Call: The Only Legal Entry Point into the OS</H2>
      <P>A <strong>system call</strong> is the interface between user programs and the OS kernel. When your program calls fopen() in C, it eventually triggers a system call (open()) that crosses the user-kernel boundary. This is a controlled, secure handover -- your program cannot just jump into kernel code arbitrarily.</P>
      <Table
        heads={["Layer", "What Runs Here", "Example"]}
        rows={[
          ["User Mode (Ring 3)", "Application code; libraries; no direct hardware access", "Your C program, Python script, Chrome browser"],
          ["System Call Interface", "The gateway: software interrupt (e.g., int 0x80 on x86) that switches to kernel mode", "open(), read(), write(), fork(), exec(), malloc() (via brk/mmap)"],
          ["Kernel Mode (Ring 0)", "OS kernel code; full hardware access; manages all resources", "Linux kernel, Windows NT kernel"],
          ["Hardware Abstraction Layer", "Device drivers that translate OS commands to hardware signals", "Disk driver, GPU driver, NIC driver"],
          ["Hardware", "Physical CPU, RAM, Disk, NIC, GPU", "Intel CPU, NVMe SSD, NVIDIA GPU"],
        ]}
      />
      <Note color="warning" icon="ti-shield">
        <strong>Why two modes?</strong> If user programs could execute privileged instructions directly (like disabling interrupts or writing to any memory address), a malicious or buggy program could destroy the entire system. The CPU hardware enforces this: privileged instructions in user mode trigger a fault. The OS kernel, running in privileged mode, is the only entity trusted to execute them.
      </Note>

      <H2>Types of Operating Systems</H2>
      <Table
        heads={["Type", "How It Works", "Limitation", "Example"]}
        rows={[
          ["Batch OS", "Jobs collected into batches; processed without user interaction; no multitasking", "No interactivity; long turnaround time", "Early IBM mainframes"],
          ["Single-Tasking", "One process in memory and CPU at a time", "Terrible utilization; CPU idle during I/O", "MS-DOS"],
          ["Multiprogramming", "Multiple processes in RAM; when one waits for I/O, another runs on CPU", "No preemption; a long-running process can hog CPU", "Early UNIX"],
          ["Multitasking / Time-Sharing", "CPU rapidly switches between processes using time slices (quanta); creates illusion of simultaneous execution", "Context switch overhead", "Linux, Windows, macOS"],
          ["Real-Time OS (RTOS)", "Guarantees a response within a strict time deadline (hard or soft real-time)", "Complex scheduling; limited multiprogramming", "VxWorks, FreeRTOS, car ECU software"],
          ["Distributed OS", "Multiple networked computers appear as a single unified system", "Network dependency; complex fault tolerance", "Amoeba, Plan 9"],
          ["Embedded OS", "Minimal OS built into hardware; extremely small footprint", "Limited features; application-specific", "Android (phones), Raspberry Pi OS, RTOS in IoT"],
        ]}
      />

      <H2>Kernel Types</H2>
      <Grid cols={2}>
        <Card title="Monolithic Kernel" color="info">
          The entire OS (scheduler, memory manager, file system, device drivers) runs in a single large kernel-space program. Very fast because components call each other directly. A bug in any driver can crash the whole kernel. Example: Linux (technically monolithic with loadable modules).
        </Card>
        <Card title="Microkernel" color="success">
          Only the most essential services (IPC, basic scheduling, memory mapping) run in kernel mode. Everything else (file systems, drivers) runs as user-space servers. More stable: a crashed driver does not take down the kernel. Slower due to message-passing overhead. Example: Mach, MINIX, QNX.
        </Card>
      </Grid>
      <Grid cols={2}>
        <Card title="Hybrid Kernel" color="warning">
          Combines monolithic and microkernel approaches. Core services in kernel mode, but some services (like device drivers) can run in user space. Example: Windows NT kernel, macOS XNU kernel.
        </Card>
        <Card title="Exokernel" color="secondary">
          Extremely minimal: the kernel only multiplexes hardware access. Applications implement their own abstractions. Maximum flexibility and performance; very complex to program. Example: MIT Exokernel (research).
        </Card>
      </Grid>

      <H2>Privileged vs Non-Privileged Instructions</H2>
      <Table
        heads={["Category", "Examples", "Who Can Execute"]}
        rows={[
          ["Privileged (kernel mode only)", "Disable/enable interrupts, modify page tables, access I/O ports, HALT instruction, load base/limit registers", "Kernel only"],
          ["Non-privileged (any mode)", "ADD, MOV, arithmetic, most ALU operations, calling functions, stack push/pop", "Any program"],
          ["Trap / System Call", "int 0x80, syscall instruction, software interrupt", "User programs -- causes mode switch to kernel"],
        ]}
      />

      <QA q="What is the difference between multiprogramming and multitasking? They sound the same." a="Multiprogramming: multiple processes reside in RAM simultaneously. The goal is CPU utilization -- when process A blocks for I/O, process B runs. There is NO preemption; a process runs until it voluntarily gives up the CPU (by blocking). Multitasking (time-sharing) adds preemption: the OS forcibly kicks a process off the CPU after its time slice expires, even if it is not blocking. This gives each user the feeling of having the CPU to themselves. Multitasking is a superset of multiprogramming -- all multitasking systems are multiprogrammed, but not all multiprogrammed systems are multitasking." />
      <QA q="Why can't a user program directly call OS functions like a normal function call?" a="A normal function call (CALL instruction) simply jumps to an address in the same memory space. If user programs could jump into OS kernel code directly, they could jump to any address -- including privileged memory management code -- and corrupt or bypass security checks. Instead, the system call mechanism uses a software interrupt or syscall instruction that causes the CPU to (1) switch to kernel mode (Ring 0), (2) save the user process's state, and (3) jump to a fixed OS-controlled handler address in an interrupt descriptor table. The OS, not the user program, controls where execution goes. This is the enforced, hardware-backed security boundary." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 - PROCESSES
══════════════════════════════════════════════════════ */
function SectionProcesses() {
  return (
    <div>
      <Note color="success" icon="ti-activity">
        A process is the fundamental unit of work in an OS. Everything the OS manages -- CPU time, memory, file handles, I/O -- is managed on a per-process basis. Understanding process internals is foundational to understanding scheduling, memory management, and concurrency.
      </Note>

      <H2>Program vs Process</H2>
      <Table
        heads={["Aspect", "Program", "Process"]}
        rows={[
          ["Nature", "Passive: a static file of compiled instructions on disk (.exe, ELF binary)", "Active: a program loaded into RAM and currently executing"],
          ["Existence", "Exists even when not running; permanent until deleted", "Exists only during execution; created by OS, destroyed on completion"],
          ["Resources", "Occupies disk space only", "Occupies RAM, CPU registers, file handles, network sockets"],
          ["Count", "One copy of a program on disk", "Multiple processes can run from the same program (e.g., 3 Chrome windows = 3 processes)"],
          ["State", "No state; a file", "Has state: register values, stack, heap contents, program counter"],
        ]}
      />

      <H2>Process Memory Layout</H2>
      <P>When the OS loads a program, it creates a virtual address space for the process divided into four segments:</P>
      <Grid cols={2}>
        <Card title="Text / Code Segment" color="info">
          Contains the compiled machine instructions of the program. This region is READ-ONLY (attempting to write to it causes a segmentation fault). It is also typically shareable: if 10 users run the same program, only one copy of the text segment needs to exist in physical RAM.
        </Card>
        <Card title="Data Segment" color="success">
          Holds global and static variables. Divided into two parts: initialized data (variables with initial values: int x = 5) and BSS (Block Started by Symbol) for uninitialized data (int y; -- zeroed by the OS at load time). Exists for the entire lifetime of the process.
        </Card>
      </Grid>
      <Grid cols={2}>
        <Card title="Heap" color="warning">
          Dynamically grows upward as the program requests memory at runtime (malloc in C, new in C++, object creation in Python/Java). The OS provides more heap via the brk() or mmap() system call. Memory must be explicitly freed (in C/C++) or garbage collected (Java/Python). Fragmentation and leaks occur here.
        </Card>
        <Card title="Stack" color="danger">
          Grows downward. Automatically manages function call frames: each call pushes a frame containing local variables, return address, and saved registers. Each return pops the frame. Stack is fast (just a pointer increment), automatically managed (no free needed), but limited in size. Stack overflow = recursive calls exceed the limit.
        </Card>
      </Grid>
      <Note color="info" icon="ti-arrows-up-down">
        <strong>Heap and stack grow toward each other</strong> in the address space. The OS places a guard page between them. If the stack grows into the heap region, a stack overflow fault is raised. This is why deep recursion and very large local arrays on the stack are dangerous.
      </Note>

      <H2>Process Control Block (PCB)</H2>
      <P>The PCB is the OS's complete record of a process -- everything the OS needs to pause a process and resume it later, as if it never stopped. Think of it as the process's "passport" -- the OS stamps it at every checkpoint.</P>
      <Table
        heads={["PCB Field", "What It Stores", "Why It's Needed"]}
        rows={[
          ["Process ID (PID)", "Unique integer identifier for this process", "Distinguish between processes; used by kill(), wait(), etc."],
          ["Process State", "New / Ready / Running / Waiting / Terminated", "OS knows which queue to place this process in"],
          ["Program Counter (PC)", "Address of the NEXT instruction to execute", "Resume execution at the exact right instruction after preemption"],
          ["CPU Registers", "Snapshot of ALL register values (RAX, RBX, RSP, RIP, flags, etc.)", "Restore CPU state exactly -- process must not know it was suspended"],
          ["Memory Management Info", "Page table base address, segment table, base/limit registers", "Map this process's virtual addresses to physical RAM"],
          ["I/O Status Info", "List of open files, sockets, devices; I/O requests in progress", "File descriptors don't get lost when process is preempted"],
          ["Scheduling Info", "Priority, time used so far, arrival time, wait time", "Scheduler needs this to make fair decisions"],
          ["Accounting Info", "CPU time used, wall clock time, user/owner info", "Billing, auditing, resource limits (ulimit)"],
          ["Parent PID (PPID)", "PID of the process that created this one", "Process hierarchy; parent waits for child via wait()"],
        ]}
      />

      <H2>Process State Machine</H2>
      <ProcStateViz />
      <Table
        heads={["Transition", "Trigger", "Who Causes It"]}
        rows={[
          ["New -> Ready", "OS admits the process into memory (passes long-term scheduler admission)", "Long-term scheduler"],
          ["Ready -> Running", "Short-term scheduler picks this process off the ready queue", "Short-term scheduler / dispatcher"],
          ["Running -> Waiting", "Process issues a blocking system call: read(), sleep(), wait() for child", "The process itself (voluntary)"],
          ["Waiting -> Ready", "I/O completes; interrupt fires; timer expires; child terminates", "Interrupt handler / OS"],
          ["Running -> Ready", "Time slice expired (preemption); higher-priority process arrives", "Short-term scheduler (involuntary)"],
          ["Running -> Terminated", "Process calls exit(); main() returns; signal kills it (SIGKILL)", "Process itself or OS/another process"],
        ]}
      />

      <H2>Three Types of Schedulers</H2>
      <Table
        heads={["Scheduler", "Also Called", "Job", "Frequency"]}
        rows={[
          ["Long-Term Scheduler", "Job Scheduler", "Decides which programs from the job pool (disk) get loaded into RAM and enter the Ready state. Controls the degree of multiprogramming (how many processes are in RAM).", "Infrequent: runs when a process terminates or is created"],
          ["Short-Term Scheduler", "CPU Scheduler", "Selects which READY process gets the CPU right now. Must be very fast -- runs constantly.", "Very frequent: every few milliseconds (time slice expiry, I/O completion)"],
          ["Medium-Term Scheduler", "Swapper", "When RAM is full, swaps a process OUT to disk (suspend state) to free memory for other processes. Brings it back when memory is available.", "As needed: when memory pressure is high"],
        ]}
      />
      <Note color="warning" icon="ti-arrows-transfer-up">
        <strong>Swapping and Suspend States:</strong> The medium-term scheduler introduces two extra process states: Suspend-Ready (process swapped out but would be ready if in RAM) and Suspend-Wait (process swapped out and still waiting for I/O). Modern systems with large RAM use swapping less, but it is still critical for understanding virtual memory and thrashing.
      </Note>

      <H2>Context Switch</H2>
      <P>A context switch is the act of saving the state of one process and restoring the state of another so the CPU can switch between them. It is performed by the <strong>dispatcher</strong> (a kernel routine, not the scheduler itself).</P>
      <Table
        heads={["Step", "Action", "Cost"]}
        rows={[
          ["1. Save state of P1", "Kernel saves all CPU registers, PC, stack pointer into P1's PCB", "CPU time + memory writes"],
          ["2. Update P1's PCB", "Mark P1's state as Ready or Waiting depending on why it was preempted", "Negligible"],
          ["3. Load P2's PCB", "Kernel reads P2's saved registers, PC, memory maps from P2's PCB", "Memory reads + TLB flush"],
          ["4. Switch address space", "Update MMU with P2's page table; flush TLB (expensive!)", "TLB flush = hundreds to thousands of wasted cycles"],
          ["5. Resume P2", "Restore all registers, jump to P2's saved PC", "CPU now executes P2"],
        ]}
      />
      <Note color="danger" icon="ti-alert-triangle">
        <strong>Context switches are pure overhead</strong> -- no useful work happens during a context switch. This is why the time quantum in Round Robin scheduling must be large enough. If you have 100-microsecond time quanta and 10-microsecond context switches, you waste 10% of CPU time on overhead. Too-large quanta reduce responsiveness. The sweet spot in practice is 1-10ms.
      </Note>

      <H2>Process Creation: fork() and exec()</H2>
      <Code>{`// fork(): creates an exact copy of the current process
pid_t pid = fork();
if (pid == 0) {
    // This code runs in the CHILD process
    // Child gets a copy of parent's address space (copy-on-write)
    printf("I am the child, PID=%d\\n", getpid());
    exec("/bin/ls", args);   // replace child's image with /bin/ls
} else if (pid > 0) {
    // This code runs in the PARENT process
    // pid = child's PID
    printf("I am the parent, child PID=%d\\n", pid);
    wait(NULL);  // wait for child to finish; prevents zombie processes
} else {
    // pid == -1: fork failed (out of resources)
    perror("fork failed");
}
// Key facts:
// - After fork(), both parent and child run the SAME code from this point
// - Child gets its OWN copy of all variables (copy-on-write = lazy copy)
// - exec() replaces the process image entirely; never returns on success
// - fork() + exec() is the standard UNIX way to launch new programs
// - Windows equivalent: CreateProcess() (does fork+exec in one call)`}</Code>

      <QA q="What is a zombie process and how does it occur?" a="When a child process finishes (calls exit()), its PCB is not immediately destroyed. The OS keeps a minimal entry in the process table recording the exit status, waiting for the parent to call wait(). During this interval, the child is a zombie process -- dead but not yet reaped. If the parent never calls wait(), the zombie persists indefinitely, consuming a process table slot. If the parent itself dies before calling wait(), the OS reassigns the zombie to PID 1 (init/systemd), which periodically calls wait() for orphaned children. Too many zombies can exhaust the process table and prevent new processes from being created." />
      <QA q="What is the difference between the short-term scheduler and the dispatcher?" a="These are frequently confused. The short-term scheduler (CPU scheduler) is the DECISION-MAKING component: it runs a scheduling algorithm and DECIDES which process should run next. The dispatcher is the EXECUTION component: it actually performs the context switch, restores the chosen process's CPU state, and hands control to that process. The dispatcher runs every time a scheduling decision is made, and its latency (dispatch latency) is pure overhead. The scheduler can be lazy (defer decisions), but once a decision is made, the dispatcher must act immediately." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 - CPU SCHEDULING
══════════════════════════════════════════════════════ */
function SectionScheduling() {
  return (
    <div>
      <Note color="warning" icon="ti-calendar">
        CPU scheduling decides the ORDER in which ready processes get CPU time. The goal is to maximize efficiency and fairness while minimizing delay. Every algorithm is a tradeoff -- there is no universally optimal one. Understanding the metrics, the algorithms, and their failure modes is crucial for interviews.
      </Note>

      <H2>Scheduling Criteria</H2>
      <Table
        heads={["Metric", "Formula", "Goal"]}
        rows={[
          ["CPU Utilization", "(CPU busy time / total time) * 100%", "Maximize (ideally 40-90%; >90% = overloaded)"],
          ["Throughput", "Processes completed per unit time", "Maximize"],
          ["Turnaround Time (TAT)", "Completion Time - Arrival Time", "Minimize (total time from birth to death)"],
          ["Waiting Time (WT)", "TAT - Burst Time", "Minimize (time spent in ready queue doing nothing)"],
          ["Response Time (RT)", "First CPU allocation time - Arrival Time", "Minimize (especially important for interactive systems)"],
        ]}
      />
      <Note color="info" icon="ti-math">
        <strong>Key formulas to memorize:</strong> TAT = CT - AT. WT = TAT - BT = CT - AT - BT. RT = time of first CPU run - AT. Average WT = sum of all WT / number of processes.
      </Note>

      <H2>FCFS (First Come First Served)</H2>
      <P>The simplest scheduling algorithm: processes are served in arrival order, like a queue at a bank counter. Non-preemptive -- once started, a process runs until it finishes or blocks.</P>
      <Table
        heads={["Aspect", "Detail"]}
        rows={[
          ["Type", "Non-preemptive"],
          ["Implementation", "Simple FIFO queue of ready processes"],
          ["Major problem", "Convoy Effect: one long CPU-bound process causes all short processes behind it to wait. Example: P1 (burst=100ms) arrives before P2,P3 (burst=1ms each). P2 and P3 wait 100ms even though they need only 1ms."],
          ["Average WT", "Can be very high with diverse burst times"],
          ["Best for", "Batch systems where all jobs are similar in length; simple to implement"],
          ["Not suitable for", "Interactive or time-sharing systems; real-time systems"],
        ]}
      />

      <H2>SJF / SRTF (Shortest Job First / Shortest Remaining Time First)</H2>
      <P>SJF serves the process with the smallest burst time next (non-preemptive). SRTF is the preemptive version: if a new process arrives with a shorter remaining burst than the current process, it preempts.</P>
      <Table
        heads={["Aspect", "SJF (Non-Preemptive)", "SRTF (Preemptive)"]}
        rows={[
          ["When preemption occurs", "Never -- runs to completion once started", "On each new process arrival; compare remaining times"],
          ["Optimality", "Optimal for average WT among non-preemptive algorithms", "Optimal for average WT among all algorithms (theoretical minimum)"],
          ["Problem", "Starvation of long processes if short jobs keep arriving", "More severe starvation; long processes may NEVER run"],
          ["Practical difficulty", "Must know burst time in advance -- impossible in practice", "Same issue; estimated using exponential averaging of past bursts"],
          ["Starvation fix", "Aging: gradually increase priority of waiting processes", "Aging or aging-based priority boost"],
        ]}
      />

      <H2>SRTF Step-Through (with Gantt Chart)</H2>
      <SRTFViz />

      <H2>Priority Scheduling</H2>
      <P>Each process is assigned a priority number. Lower number = higher priority (or the reverse -- convention varies). CPU always goes to the highest-priority ready process.</P>
      <Table
        heads={["Aspect", "Detail"]}
        rows={[
          ["Type", "Can be preemptive (new higher-priority process preempts running) or non-preemptive"],
          ["Priority assignment", "Static (set at creation, never changes) or Dynamic (can change based on behavior or aging)"],
          ["Critical problem", "Starvation: a low-priority process may wait FOREVER if high-priority processes keep arriving"],
          ["Solution to starvation", "Aging: every T time units, increase the priority of every waiting process by 1. Eventually, even the lowest-priority process becomes the highest."],
          ["Real-world use", "Linux: nice values (-20 to +19); Windows: 32 priority levels; Real-time processes have highest priority"],
          ["Internal priority", "OS may use it to distinguish I/O-bound (prefer higher priority) vs CPU-bound (lower priority)"],
        ]}
      />

      <H2>Round Robin (RR)</H2>
      <P>The backbone of all modern time-sharing OSes. The ready queue is treated as a circular queue. Each process gets a fixed <strong>time quantum (q)</strong>. When the quantum expires, the process is preempted and moves to the back of the queue.</P>
      <Table
        heads={["Aspect", "Detail"]}
        rows={[
          ["Type", "Preemptive"],
          ["Key parameter", "Time quantum q (typically 10-100ms in modern systems)"],
          ["Response time", "Excellent: a process of n processes will wait at most (n-1)*q time before its first CPU slice"],
          ["Fairness", "Perfect fairness: every process gets equal CPU share"],
          ["If q too small", "Context switch overhead dominates; effective CPU time approaches 0"],
          ["If q too large", "Degenerates into FCFS; long response times for short processes"],
          ["Optimal q rule", "q should be larger than 80% of CPU bursts (empirical guideline)"],
          ["Average WT", "Generally higher than SJF for the same workload; better than FCFS for mixed bursts"],
          ["No starvation", "Every process is guaranteed a turn; starvation is impossible"],
        ]}
      />

      <H2>Multilevel Queue and Multilevel Feedback Queue</H2>
      <Grid cols={2}>
        <Card title="Multilevel Queue" color="info">
          Ready queue split into multiple separate queues (e.g., System processes, Interactive, Batch). Each queue has its own scheduling algorithm. CPU divided among queues by fixed percentages. A process is permanently assigned to one queue. Problem: processes in lower queues starve if upper queues are always busy.
        </Card>
        <Card title="Multilevel Feedback Queue (MLFQ)" color="success">
          Like MLQ but processes can MOVE between queues based on their behavior. New process starts in highest-priority queue (short quantum). If it uses its full quantum repeatedly, it is demoted to lower-priority queue (longer quantum). I/O-bound (short-burst) processes naturally stay at high priority. Aging moves starved low-priority processes back up. Used in most real OSes.
        </Card>
      </Grid>

      <H2>Scheduling Algorithm Comparison</H2>
      <Table
        heads={["Algorithm", "Preemptive?", "Optimal?", "Starvation?", "Best For"]}
        rows={[
          ["FCFS", "No", "No (Convoy Effect)", "No", "Simple batch; similar-length jobs"],
          ["SJF", "No", "Yes (non-preemptive)", "Yes (long jobs)", "Batch when burst times known"],
          ["SRTF", "Yes", "Yes (globally)", "Yes (long jobs)", "Minimizing avg WT; theoretical"],
          ["Priority", "Both variants", "No", "Yes (low priority)", "Systems with importance levels"],
          ["Round Robin", "Yes", "No", "No", "Interactive/time-sharing; fairness required"],
          ["MLFQ", "Yes", "Approximates optimality", "Fixed by aging", "General-purpose OS (Linux CFS, Windows)"],
        ]}
      />

      <QA q="Why is SJF/SRTF said to give optimal average waiting time, and why can't it be implemented in practice?" a="Proof sketch: if we have two processes P1 (long) and P2 (short), serving P2 first reduces P2's wait by P2's burst time and increases P1's wait by P2's burst time. Net effect on sum of waiting times: zero change from P1's perspective, minus P2_burst from P2's perspective. So serving shorter jobs first always reduces the total sum of waiting times. The optimality is mathematically provable. The practical problem: burst time is not known in advance. Estimating it requires past history (exponential moving average: next_burst = alpha * actual_burst + (1-alpha) * previous_estimate), which introduces error and lag." />
      <QA q="What is the Convoy Effect in FCFS and why is it specifically bad for system throughput?" a="The Convoy Effect occurs when one long CPU-bound process monopolizes the CPU, forcing a large convoy of I/O-bound processes to queue behind it. I/O-bound processes are typically short and quick; they use the CPU briefly then go off to do I/O. If they are blocked behind a long CPU-bound process, their I/O devices (disk, network) sit idle -- wasting I/O bandwidth. When the long process finally finishes and the short I/O-bound processes run, they immediately go off to I/O again, leaving the CPU idle momentarily. This causes both CPU and I/O utilization to drop. RR and priority scheduling solve this by preempting the long process." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 - THREADS
══════════════════════════════════════════════════════ */
function SectionThreads() {
  return (
    <div>
      <Note color="purple" icon="ti-git-branch">
        A thread is a lightweight unit of execution within a process. While a process is an isolated program with its own memory space, threads within a process share memory and resources -- enabling efficient communication but requiring careful synchronization.
      </Note>

      <H2>Process vs Thread</H2>
      <Table
        heads={["Aspect", "Process", "Thread"]}
        rows={[
          ["Definition", "Independent program in execution with its own address space", "A unit of execution within a process; shares address space with siblings"],
          ["Memory", "Own code, data, heap, and stack", "Own stack only; shares code, data, heap with other threads of the same process"],
          ["Creation cost", "Expensive: OS must allocate new address space, copy page tables, initialize PCB", "Cheap: only a new stack and register set needed; shares everything else"],
          ["Context switch cost", "Expensive: must flush TLB, switch page tables, save full PCB", "Cheaper: only save/restore stack pointer and registers; no TLB flush if same process"],
          ["Communication", "Inter-Process Communication (IPC): pipes, sockets, shared memory, message queues -- complex and slow", "Direct: just read/write shared variables (fast but requires synchronization)"],
          ["Failure isolation", "A crash in one process does not affect others", "A crash in one thread (e.g., null pointer dereference) can kill the entire process"],
          ["Use case", "Isolated tasks: each tab in Chrome is a process for isolation", "Parallel sub-tasks within one program: a web server thread per request"],
        ]}
      />

      <H2>What Threads Share and What They Don't</H2>
      <Grid cols={2}>
        <Card title="Shared Among All Threads in a Process" color="info">
          Code segment (text), global and static data segment, heap memory (malloc'd data), file descriptors (open files, sockets), process ID, signal handlers, working directory, environment variables.
        </Card>
        <Card title="Private to Each Thread" color="warning">
          Stack (local variables, function call frames), stack pointer, program counter (instruction pointer), registers (all CPU register values), thread ID, thread-local storage (TLS).
        </Card>
      </Grid>
      <Note color="success" icon="ti-bulb">
        <strong>Why this matters:</strong> Because threads share the heap, one thread can pass a pointer to another thread and both can access the same dynamically allocated data. This is far cheaper than IPC. But because both threads can modify that data simultaneously, you need synchronization (mutexes, semaphores) to avoid race conditions.
      </Note>

      <H2>User-Level Threads vs Kernel-Level Threads</H2>
      <Table
        heads={["Property", "User-Level Threads (ULT)", "Kernel-Level Threads (KLT)"]}
        rows={[
          ["Where managed", "In user space by a thread library (no kernel involvement)", "Directly by the OS kernel; kernel maintains thread table"],
          ["Syscall required", "No: thread switch is a library call; very fast", "Yes: context switch requires kernel involvement; slower"],
          ["Creation speed", "Very fast: no system call", "Slower: requires a syscall to create kernel thread entry"],
          ["Blocking behavior", "If one ULT makes a blocking syscall, ALL threads in the process block (kernel only sees the process, not individual threads)", "If one KLT blocks, other KLTs in the process continue running freely"],
          ["Multicore utilization", "Cannot run truly in parallel -- kernel schedules the process as one unit", "Can run on multiple cores simultaneously -- kernel schedules individual threads"],
          ["Examples", "Python's threading (GIL-limited), older Java Green Threads, GNU Pth", "Linux pthreads (POSIX threads), modern Java threads, C++ std::thread"],
          ["Best use case", "I/O-bound tasks where you want cooperative multitasking without kernel overhead", "CPU-bound parallel computation; true parallelism on multicore"],
        ]}
      />

      <H2>Thread-to-Kernel Mapping Models</H2>
      <Table
        heads={["Model", "Mapping", "Pros", "Cons", "Example"]}
        rows={[
          ["Many-to-One", "Many ULTs map to ONE kernel thread", "Very fast thread switching; no kernel overhead", "One blocking call blocks ALL threads; no parallelism on multicore", "GNU Pth, early Java"],
          ["One-to-One", "Each ULT maps to its OWN kernel thread", "True parallelism; one blocking call does not affect others", "High overhead: creating many ULTs creates many KLTs; limited by OS thread limit", "Linux pthreads, Windows threads"],
          ["Many-to-Many", "Many ULTs mapped to MANY (but fewer) KLTs", "Parallelism possible; OS controls actual KLT count; bounded overhead", "Complex to implement correctly", "Solaris, IRIX (historical)"],
          ["Two-Level (hybrid)", "Like M:M but also allows One-to-One for specific threads needing direct mapping", "Maximum flexibility", "Most complex", "Solaris 9+"],
        ]}
      />

      <H2>Benefits and Risks of Multithreading</H2>
      <Grid cols={2}>
        <Card title="Benefits" color="success">
          Responsiveness: one thread handles UI while another does background work. Resource sharing: cheaper than multi-process. Economy: faster creation/deletion than processes. Scalability: CPU-bound tasks split across cores give near-linear speedup (Amdahl's Law bounded). Example: a web server with 1000 threads serving 1000 clients simultaneously.
        </Card>
        <Card title="Risks" color="danger">
          Race conditions: two threads modify shared data simultaneously -- result depends on scheduling order. Deadlocks: threads waiting on each other's locks. Debugging difficulty: non-deterministic bugs; Heisenbugs (disappear when you add debug prints). Increased complexity. Thread crashes kill the whole process (unlike separate processes).
        </Card>
      </Grid>

      <H2>Python GIL (Global Interpreter Lock)</H2>
      <P>Python has a unique constraint worth understanding for interviews: the <strong>Global Interpreter Lock (GIL)</strong>. The GIL is a mutex in CPython that ensures only ONE Python thread executes Python bytecode at a time, even on multi-core systems.</P>
      <Table
        heads={["Scenario", "Python Threads", "Implication"]}
        rows={[
          ["I/O-bound tasks (file, network, DB)", "GIL is RELEASED during I/O wait", "Multiple threads can overlap I/O waiting -- genuine speedup"],
          ["CPU-bound tasks (computation)", "GIL is HELD during computation", "Multiple threads take turns on ONE core -- no parallelism benefit"],
          ["True CPU parallelism in Python", "Use multiprocessing module instead", "Each process has its own GIL; genuine multi-core utilization"],
          ["C extensions", "Can release GIL: NumPy, pandas do this for computation", "NumPy operations can run truly parallel even in Python threads"],
          ["Python 3.13+", "GIL made optional (PEP 703 -- free-threaded Python)", "Experimental; programs can opt out; requires thread-safe extensions"],
        ]}
      />

      <QA q="If threads are cheaper than processes, why does Chrome use multiple processes instead of threads for each tab?" a="The primary reason is fault isolation and security. If Chrome used one process with one thread per tab, a crash in any tab (due to a buggy plugin or malicious JavaScript) would bring down the entire browser -- all tabs lose their state. With separate processes, each tab has its own address space; a crash in tab A cannot corrupt tab B's memory or the browser UI. The security sandbox is also per-process: each renderer process has severely restricted OS privileges. The cost (higher memory usage, slower IPC) is the deliberate tradeoff Chrome makes for stability and security." />
      <QA q="What is the difference between concurrency and parallelism?" a="Concurrency is about STRUCTURE: a program designed to handle multiple tasks that can overlap in time -- they may not run simultaneously, but they make progress in an interleaved fashion (like a single chef preparing multiple dishes by switching between them). Parallelism is about EXECUTION: tasks literally running SIMULTANEOUSLY on multiple CPU cores. You can have concurrency without parallelism (single-core multithreading), parallelism without concurrency (embarrassingly parallel batch jobs with no interaction), or both (multi-threaded web server on multi-core CPU). Python's threading gives concurrency (interleaving) but not CPU parallelism (due to GIL) for CPU-bound tasks." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 - SYNCHRONIZATION
══════════════════════════════════════════════════════ */
function SectionSync() {
  return (
    <div>
      <Note color="danger" icon="ti-refresh-alert">
        When multiple processes or threads share data, their execution can interleave in any order. Without synchronization, the final result depends on which thread runs when -- a <strong>race condition</strong>. This section is one of the most heavily tested areas in OS and systems engineering interviews.
      </Note>

      <H2>The Race Condition Problem</H2>
      <P>Imagine two threads both executing <code>counter++</code>. At the machine code level, this is three instructions: LOAD counter into register, ADD 1 to register, STORE register back to counter. If the OS preempts between any of these, the result is wrong.</P>
      <Code>{`// Thread 1:             Thread 2:
LOAD  reg, counter   // both load counter = 5
ADD   reg, 1
                     LOAD  reg2, counter  // also loads 5!
                     ADD   reg2, 1
                     STORE counter, reg2  // counter = 6
STORE counter, reg   // counter = 6 again!

// Expected: counter = 7. Actual: counter = 6. ONE UPDATE WAS LOST.
// This is called a Lost Update -- a classic race condition.

// The outcome depends on the EXACT scheduling order.
// Some runs give 7 (correct), some give 6 (wrong) -- non-deterministic!`}</Code>

      <H2>Critical Section Problem</H2>
      <P>The <strong>critical section</strong> is the code region that accesses shared resources and must not execute concurrently. Any correct solution must satisfy THREE properties simultaneously:</P>
      <Grid cols={3}>
        <Card title="Mutual Exclusion" color="danger">
          If process Pi is in its critical section, no other process Pj can be in its critical section at the same time. This is the core safety property.
        </Card>
        <Card title="Progress" color="warning">
          If no process is currently in its critical section and some processes want to enter, the decision of who enters next must be made in finite time. The system cannot stall indefinitely (livelock prevention).
        </Card>
        <Card title="Bounded Waiting" color="success">
          After a process requests entry to its critical section, there is a bound on how many times OTHER processes can enter before this process gets its turn. Prevents starvation.
        </Card>
      </Grid>

      <H2>Peterson's Solution (Software Lock)</H2>
      <P>A classical software-only solution for mutual exclusion between exactly TWO processes, using only shared variables. No hardware support required. Satisfies all three critical section properties.</P>
      <Code>{`// Shared variables (in shared memory, visible to both processes)
int turn;           // whose turn it is to enter CS
bool flag[2];       // flag[i] = true means "process i wants to enter CS"

// Process i's structure (process j uses symmetric code with i and j swapped)
void process_i() {
    flag[i] = true;         // "I want to enter the critical section"
    turn = j;               // "But I'll be polite and let j go first"

    while (flag[j] && turn == j) {
        // Busy-wait (spin): if j also wants to enter AND it's j's turn, wait
        // If j is not interested (flag[j] = false), we can proceed
        // If it's our turn (turn == i), we can proceed
    }

    // === CRITICAL SECTION ===
    // ... shared resource access ...
    // === END CRITICAL SECTION ===

    flag[i] = false;        // "I'm done; others may enter"
}

// Why it works:
// Mutual Exclusion: If both enter the while-loop, turn can only be i OR j.
//   One of them will see (turn != their turn) and exit the loop. The other waits.
// Progress: If only one process wants to enter, it enters immediately (other flag=false).
// Bounded Waiting: After i sets flag[i]=true and turn=j, j can enter at most ONCE
//   before i gets its turn (because j will set turn=i when it tries again).

// LIMITATION: Works for 2 processes only.
//             Requires busy-waiting (wastes CPU).
//             May not work on modern CPUs with instruction reordering
//             (needs memory barriers in practice).`}</Code>

      <H2>Hardware Solutions: TestAndSet</H2>
      <Code>{`// TestAndSet is an ATOMIC hardware instruction:
// It atomically reads the current value of a lock variable AND sets it to true.
// "Atomic" means: this read-modify-write happens as one uninterruptible unit.

bool TestAndSet(bool* lock) {  // This entire function is ONE atomic CPU instruction
    bool old = *lock;
    *lock = true;
    return old;   // returns old value
}

// Using TestAndSet as a mutex:
bool lock = false;  // shared: false = unlocked, true = locked

void enter_critical_section() {
    while (TestAndSet(&lock)) {  // spin until we get the lock
        // If lock was false (unlocked): TestAndSet returns false (we exit loop, lock is now true)
        // If lock was true (already locked): TestAndSet returns true (we keep spinning)
    }
    // We now hold the lock
}

void exit_critical_section() {
    lock = false;   // release the lock
}

// Problem: still busy-waits (spins). Wastes CPU if waiting is long.
// Solution: use an OS-level blocking mechanism -- Semaphores.`}</Code>

      <H2>Semaphores</H2>
      <P>A semaphore is an integer variable accessed only through two <strong>atomic</strong> operations: wait() (P, down) and signal() (V, up). When a process cannot proceed, it sleeps (blocks) instead of spinning, freeing the CPU for other work.</P>
      <Code>{`// Semaphore operations (atomic -- never interrupted mid-execution)
wait(S):           signal(S):
    S--;               S++;
    if (S < 0):        if (S <= 0):
        block()            wake one blocked process

// Binary Semaphore (Mutex): S initialized to 1
// Acts like a mutex: only one process in CS at a time
semaphore mutex = 1;
// Process:
wait(mutex);     // decrement S: 1->0; if 0, enter CS; if already 0, block
  // CRITICAL SECTION
signal(mutex);   // increment S: 0->1; wake any blocked process

// Counting Semaphore: S initialized to N (number of available resources)
semaphore resource = N;   // e.g., 5 database connections available
wait(resource);           // decrement; if S<0, block (all connections busy)
  // use one resource
signal(resource);         // increment; wake one blocked process

// S < 0 means: |S| processes are currently blocked waiting for this semaphore
// S >= 0 means: S resources are currently available`}</Code>

      <H2>Classic Synchronization Problems</H2>
      <H3>Producer-Consumer (Bounded Buffer)</H3>
      <Code>{`// Shared: buffer[N], in=0, out=0
semaphore mutex = 1;    // mutual exclusion on buffer
semaphore empty = N;    // N slots are empty initially (producer waits when 0)
semaphore full  = 0;    // 0 full slots initially (consumer waits when 0)

// Producer:
while (true) {
    produce_item();
    wait(empty);          // wait for an empty slot (decrements empty count)
    wait(mutex);          // lock buffer
    buffer[in] = item;
    in = (in + 1) % N;
    signal(mutex);        // unlock
    signal(full);         // signal one more full slot (consumer can wake up)
}
// Consumer:
while (true) {
    wait(full);           // wait for a full slot
    wait(mutex);          // lock
    item = buffer[out];
    out = (out + 1) % N;
    signal(mutex);        // unlock
    signal(empty);        // signal one more empty slot (producer can wake up)
    consume_item(item);
}
// CRITICAL: wait(empty) BEFORE wait(mutex) in producer, and
//           wait(full) BEFORE wait(mutex) in consumer.
// Reversing these causes DEADLOCK (can you prove why?)`}</Code>

      <H3>Readers-Writers Problem</H3>
      <Code>{`// Multiple readers can read simultaneously -- reads don't conflict.
// A writer needs exclusive access -- no readers or writers while writing.
// First Readers-Writers: no reader waits unless a writer holds the lock.
// (Problem: writers can starve if readers keep arriving)

int read_count = 0;         // number of active readers
semaphore mutex = 1;        // protects read_count
semaphore rw_mutex = 1;     // exclusive access for writers; first/last reader acquires

// Writer:
wait(rw_mutex);    // exclusive: blocks ALL readers and writers
  // WRITE
signal(rw_mutex);

// Reader:
wait(mutex);             // protect read_count modification
read_count++;
if (read_count == 1) wait(rw_mutex);  // FIRST reader blocks writers
signal(mutex);

  // READ (multiple readers can be here simultaneously!)

wait(mutex);
read_count--;
if (read_count == 0) signal(rw_mutex);  // LAST reader releases writers
signal(mutex);`}</Code>

      <H3>Dining Philosophers</H3>
      <Code>{`// 5 philosophers at a round table; 5 forks between them.
// Each needs 2 forks (left and right) to eat.
// Naive solution causes deadlock: everyone picks up left fork simultaneously.

// Solution using semaphores with asymmetry:
semaphore fork[5] = {1,1,1,1,1};  // each fork is a semaphore (1 = available)

// Philosopher i (0-4):
void philosopher(int i) {
    while (true) {
        think();
        // Break symmetry: even philosophers pick left-then-right,
        // odd philosophers pick right-then-left (prevents circular wait)
        if (i % 2 == 0) {
            wait(fork[i]);           // left fork
            wait(fork[(i+1)%5]);     // right fork
        } else {
            wait(fork[(i+1)%5]);     // right fork first
            wait(fork[i]);           // left fork
        }
        eat();
        signal(fork[i]);
        signal(fork[(i+1)%5]);
    }
}
// Another solution: allow at most 4 philosophers to sit simultaneously
// (guarantees at least one can eat, preventing deadlock)`}</Code>

      <H2>Monitors</H2>
      <P>A monitor is a high-level synchronization construct (a language or library feature) that bundles shared data with the procedures that access it, and guarantees that only ONE procedure can execute at a time within the monitor.</P>
      <Table
        heads={["Feature", "Semaphore", "Monitor"]}
        rows={[
          ["Level", "Low-level OS primitive", "High-level language construct"],
          ["Complexity", "Error-prone: forget one wait/signal = deadlock or race", "Automatically enforces mutual exclusion"],
          ["Condition variables", "No (must simulate with counting)", "Yes: condition.wait(), condition.notify(), condition.notifyAll()"],
          ["Language support", "Explicit API calls", "Java: synchronized keyword; Python: threading.Condition; Go: sync.Mutex"],
          ["Error risk", "High: reversed wait order causes deadlock", "Lower: compiler/runtime handles locking"],
        ]}
      />

      <QA q="What is the difference between a mutex and a semaphore? Can they be used interchangeably?" a="A mutex (binary semaphore = 1) has OWNERSHIP: the thread that locks it must be the one to unlock it. It is specifically for mutual exclusion. A semaphore has no ownership: one thread can signal it and a different thread can wait on it. This makes semaphores useful for signaling (producer signals consumer) and for counting resources (counting semaphore). A binary semaphore can simulate a mutex in terms of mutual exclusion, but lacks the ownership constraint, which means a different thread could accidentally release a lock it doesn't hold. In practice: use mutexes for protecting shared data (mutual exclusion) and semaphores for signaling and resource counting." />
      <QA q="If Peterson's solution is correct, why isn't it used in practice?" a="Two reasons. (1) It only works for TWO processes. Generalizing to N processes requires the Bakery Algorithm, which is complex and still has issues. (2) Modern CPUs use out-of-order execution and store buffers, which means the processor or compiler can reorder instructions for performance. Peterson's algorithm requires that flag[i]=true is visible to thread j before checking flag[j]. Without explicit memory barriers (fence instructions), the CPU may reorder these reads/writes and violate the algorithm's correctness assumptions. Modern synchronization primitives (hardware atomic operations, memory-ordering guarantees) handle this correctly at the hardware level." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6 - DEADLOCKS
══════════════════════════════════════════════════════ */
function SectionDeadlocks() {
  return (
    <div>
      <Note color="danger" icon="ti-circle-x">
        A deadlock is a situation where a set of processes are permanently blocked, each waiting for a resource held by another. No process can make progress. Unlike starvation (which is probabilistic), a deadlock is permanent -- nothing resolves without external intervention.
      </Note>

      <H2>The Four Coffman Conditions (All Required for Deadlock)</H2>
      <P>A deadlock can ONLY occur if ALL FOUR conditions hold simultaneously. Preventing any one of them prevents deadlock.</P>
      <Grid cols={2}>
        <Card title="1. Mutual Exclusion" color="danger">
          Resources are non-shareable: only ONE process can use a resource at a time. If process P1 holds printer, P2 must wait. (Sharable resources like read-only files cannot cause deadlock.)
        </Card>
        <Card title="2. Hold and Wait" color="warning">
          A process is holding at least one resource AND simultaneously waiting to acquire additional resources held by other processes. The key: it holds what it has while asking for more.
        </Card>
      </Grid>
      <Grid cols={2}>
        <Card title="3. No Preemption" color="warning">
          Resources cannot be forcibly taken away from a process. The process must voluntarily release them. If we could preempt resources (forcibly take the printer from P1), deadlock would resolve.
        </Card>
        <Card title="4. Circular Wait" color="danger">
          A set of processes {'{'}P0, P1, ..., Pn{'}'} exists where P0 waits for a resource held by P1, P1 waits for a resource held by P2, ..., Pn waits for a resource held by P0. A closed cycle of dependencies.
        </Card>
      </Grid>
      <Note color="info" icon="ti-info-circle">
        <strong>Memory trick:</strong> MH-NP-CW -- Mutual exclusion, Hold-and-wait, No-preemption, Circular wait. Or: "Must Have No Circular Waits."
      </Note>

      <H2>Resource Allocation Graph (RAG)</H2>
      <P>A RAG is a directed graph used to represent and detect deadlocks. Circles = processes, squares = resource types, dots inside squares = resource instances.</P>
      <Table
        heads={["Edge Type", "Direction", "Meaning"]}
        rows={[
          ["Request edge", "Process -> Resource", "Process P is requesting (waiting for) resource R"],
          ["Assignment edge", "Resource -> Process", "An instance of resource R is assigned to process P"],
        ]}
      />
      <Note color="warning" icon="ti-graph">
        <strong>Cycle detection rules:</strong> If each resource type has exactly one instance: a CYCLE in the RAG means DEADLOCK (necessary and sufficient). If resource types have multiple instances: a cycle is NECESSARY but NOT SUFFICIENT for deadlock. Use the Banker's algorithm to determine if deadlock actually exists.
      </Note>

      <H2>Deadlock Handling Strategies</H2>
      <Table
        heads={["Strategy", "When Used", "Cost"]}
        rows={[
          ["Prevention", "Systematically break one of the four conditions at design time", "Reduced resource utilization and throughput (conservative)"],
          ["Avoidance", "Dynamically check each allocation request to ensure system stays in a safe state", "Runtime overhead; requires advance knowledge of max resource needs"],
          ["Detection + Recovery", "Allow deadlocks to occur; periodically detect and break them", "Deadlock periods degrade performance; recovery disrupts processes"],
          ["Ignore (Ostrich Algorithm)", "Pretend deadlocks don't happen; let user reboot", "No overhead; cheap; only valid if deadlocks are extremely rare"],
        ]}
      />

      <H2>Deadlock Prevention -- Breaking Each Condition</H2>
      <Table
        heads={["Condition to Break", "Method", "Disadvantage"]}
        rows={[
          ["Mutual Exclusion", "Use spooling: don't give direct resource access; queue requests. (E.g., print spooler owns the printer; processes send to queue.)", "Not always possible for resources like RAM or CPU"],
          ["Hold and Wait", "(a) Request all resources at once before starting. (b) Release all held resources before requesting new ones.", "Low resource utilization; possible starvation if hard-to-get resources"],
          ["No Preemption", "If a process requests a resource that cannot be immediately allocated, preempt (steal) some of its currently held resources.", "Practical only for resources whose state can be saved/restored (CPU, memory). Not printers or tape drives."],
          ["Circular Wait", "Impose a total ordering on all resource types. Processes can only request resources in increasing numerical order.", "May not match natural program structure; reduces concurrency"],
        ]}
      />

      <H2>Deadlock Avoidance: Banker's Algorithm</H2>
      <P>The Banker's Algorithm, by Dijkstra, determines at each resource request whether granting it would leave the system in a <strong>safe state</strong>. A safe state is one in which there exists a safe sequence -- an ordering of all processes such that each process can be given all its needed resources using current available resources plus resources released by earlier processes in the sequence.</P>
      <Note color="success" icon="ti-shield-check">
        <strong>Safe State:</strong> A state is safe if there exists at least one safe sequence. A safe sequence is an ordering P1, P2, ..., Pn such that for each Pi, Pi's remaining resource needs can be satisfied by the currently available resources PLUS resources held by all Pj where j {'<'} i (i.e., processes earlier in the sequence that have already finished and released their resources).
      </Note>
      <BankersViz />
      <Table
        heads={["Data Structures for Banker's Algorithm", "Description"]}
        rows={[
          ["Available[m]", "Number of available instances of each resource type (m = number of resource types)"],
          ["Max[n][m]", "Maximum demand of each process (n = number of processes). Max[i][j] = max instances of resource j that process i may need."],
          ["Allocation[n][m]", "Number of each resource type currently allocated to each process"],
          ["Need[n][m]", "Remaining resources each process may still need. Need = Max - Allocation"],
        ]}
      />
      <Code>{`// Banker's Algorithm: Resource Request Algorithm
// Process Pi requests Request[i] additional resources
1. If Request[i] <= Need[i]:  proceed. Else: error (exceeded declared max).
2. If Request[i] <= Available: proceed. Else: Pi must wait (resources unavailable).
3. TENTATIVELY allocate:
      Available = Available - Request[i]
      Allocation[i] = Allocation[i] + Request[i]
      Need[i] = Need[i] - Request[i]
4. Run Safety Algorithm on the resulting state.
5. If SAFE: grant the allocation (make it permanent).
   If UNSAFE: Pi must wait; revert the tentative allocation.

// Safety Algorithm (checks if current state is safe):
1. Work = Available;  Finish[i] = false for all i
2. Find an i such that: Finish[i] == false AND Need[i] <= Work
   If found: Work = Work + Allocation[i]; Finish[i] = true; go to step 2
   If not found: go to step 3
3. If Finish[i] == true for all i: system is in SAFE STATE.
   Else: UNSAFE STATE.`}</Code>

      <H2>Deadlock Detection</H2>
      <P>Instead of preventing or avoiding deadlock, some systems simply detect it after the fact and recover. The detection algorithm for multiple resource instances is similar to the Banker's safety algorithm but checks the current state only (no Max required).</P>
      <Table
        heads={["Recovery Method", "Mechanism", "Cost"]}
        rows={[
          ["Process Termination (Abort All)", "Kill all deadlocked processes immediately", "Drastic; all work lost; expensive to restart"],
          ["Process Termination (Abort One)", "Kill processes one at a time and re-run detection until deadlock breaks", "Less drastic; choice of victim: pick lowest-cost process"],
          ["Resource Preemption", "Forcibly take resources from some processes (victims) and give to others", "Must choose victim carefully; risk of starvation; need rollback mechanism"],
          ["Rollback", "Roll back the victim process to a safe state (checkpoint) from before it acquired the deadlocking resources", "Requires checkpointing system; complex but clean"],
        ]}
      />

      <QA q="Can we always prevent deadlock by just using the Banker's Algorithm?" a="The Banker's Algorithm prevents deadlock with guaranteed correctness, but has significant practical limitations: (1) Each process must declare its MAXIMUM resource needs in advance -- in most real systems, this is unknown (you don't know how much memory a program will allocate). (2) The number of processes and resource types must be fixed -- not true for dynamic systems. (3) The algorithm itself has O(n^2 * m) time complexity per request -- for systems with thousands of processes, this is a significant overhead. (4) Processes can be conservative (declare max = everything), defeating the purpose. In practice, most OSes use the Ostrich Algorithm for rare deadlocks and apply prevention/avoidance only in specialized systems (databases, real-time OS)." />
      <QA q="What is livelock and how is it different from deadlock?" a="In a deadlock, processes are blocked and make NO progress -- they simply wait. In a livelock, processes are actively running and responding to each other, but STILL make no overall progress -- they keep changing state in response to each other's actions without ever completing their actual work. Classic example: two people in a corridor trying to pass each other -- both step left, then both step right, indefinitely. No one is stuck (both are actively moving), but neither gets past the other. In computing: two processes that both detect a deadlock risk and back off (release resources), only to immediately re-request them and back off again. Fix: use randomized back-off or priority to break the symmetry." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 7 - MEMORY MANAGEMENT
══════════════════════════════════════════════════════ */
function SectionMemory() {
  return (
    <div>
      <Note color="info" icon="ti-server">
        Memory management is the OS's job of dividing RAM among all running processes. This is not just about raw allocation -- it is about isolation (process A cannot read B's memory), efficiency (no wasted RAM), and the illusion of infinite memory (virtual memory). Every modern program runs in a virtual address space.
      </Note>

      <H2>Memory Hierarchy</H2>
      <Table
        heads={["Level", "Technology", "Access Time", "Typical Size", "Managed By"]}
        rows={[
          ["Registers", "Flip-flops in CPU", "< 1 nanosecond", "32-256 bytes (CPU dependent)", "Compiler + CPU"],
          ["L1 Cache", "SRAM on CPU die", "1-4 nanoseconds", "32-128 KB per core", "CPU hardware"],
          ["L2 Cache", "SRAM on CPU die", "4-12 nanoseconds", "256 KB - 1 MB per core", "CPU hardware"],
          ["L3 Cache", "SRAM (shared)", "20-40 nanoseconds", "4-64 MB shared", "CPU hardware"],
          ["Main Memory (RAM)", "DRAM", "60-100 nanoseconds", "4 GB - 1 TB", "OS + MMU hardware"],
          ["NVMe SSD", "Flash storage", "50-100 microseconds", "256 GB - 8 TB", "OS + storage driver"],
          ["HDD", "Spinning magnetic disk", "5-15 milliseconds", "512 GB - 20 TB", "OS + storage driver"],
        ]}
      />
      <Note color="warning" icon="ti-clock">
        <strong>Why the hierarchy matters:</strong> RAM is ~1000x slower than registers. The disk is ~100,000x slower than RAM. A page fault (fetching data from disk) incurs a 10ms disk access -- time during which the CPU can execute ~10 million instructions. This is why thrashing is catastrophic and why the OS works extremely hard to keep frequently-used pages in RAM.
      </Note>

      <H2>Address Binding: When Does a Program Know Its Physical Address?</H2>
      <Table
        heads={["Binding Type", "When It Happens", "Can Process Move in RAM?", "Detail"]}
        rows={[
          ["Compile-Time", "At compilation", "No: addresses are hardcoded", "Compiler generates absolute physical addresses. Works only if the process always loads at the same physical location. Used in embedded systems with fixed memory maps."],
          ["Load-Time", "When OS loads the program into RAM", "No: after loading, addresses are fixed", "Compiler generates relocatable code with relative addresses. Linker/loader resolves them to physical addresses at load time. Cannot be moved after loading."],
          ["Run-Time (Execution-Time)", "During execution, on every memory access", "Yes: process can be relocated mid-execution", "CPU generates logical (virtual) addresses. MMU translates to physical on every access using a base register or page table. Enables virtual memory, swapping, and relocatable processes. Required for modern OS."],
        ]}
      />

      <H2>Logical vs Physical Address</H2>
      <P>With run-time binding, the CPU works entirely in <strong>logical (virtual) addresses</strong>. The MMU hardware translates these to physical RAM addresses transparently on every memory access.</P>
      <Table
        heads={["Concept", "Definition"]}
        rows={[
          ["Logical Address (Virtual Address)", "The address generated by the CPU / seen by the program. The program believes it has a contiguous address space from 0 to some max."],
          ["Physical Address", "The actual hardware address in RAM where the data resides."],
          ["Memory Management Unit (MMU)", "Hardware chip between CPU and RAM. Given a logical address, it outputs the corresponding physical address using the current process's page table or segment table."],
          ["Address Space", "The set of all logical addresses a process can generate. Modern 64-bit systems have 2^64 = 16 exabytes of logical address space -- far more than physical RAM."],
        ]}
      />

      <H2>Contiguous Memory Allocation</H2>
      <P>The simplest allocation strategy: give each process a single contiguous block of physical RAM. The OS tracks free and allocated regions.</P>
      <Grid cols={2}>
        <Card title="Fixed Partitioning (Static)" color="warning">
          RAM is divided into fixed-size partitions at boot time. Each process gets one partition. Simple to implement. Causes INTERNAL FRAGMENTATION: a 50KB process in a 100KB partition wastes 50KB that cannot be used by anyone else. The maximum number of processes = number of partitions.
        </Card>
        <Card title="Dynamic Partitioning" color="info">
          Partitions are created to exactly match the process size. Eliminates internal fragmentation. As processes come and go, holes (free gaps) of varying sizes appear between allocated blocks. This is EXTERNAL FRAGMENTATION: total free memory is sufficient, but it is not contiguous, so a large process cannot fit.
        </Card>
      </Grid>

      <H2>Fragmentation Types</H2>
      <Table
        heads={["Type", "Occurs In", "Description", "Solution"]}
        rows={[
          ["Internal Fragmentation", "Fixed partitioning, paging (last page)", "Wasted space INSIDE an allocated block (block is larger than needed)", "Use smaller partition sizes or paging with smaller page sizes"],
          ["External Fragmentation", "Dynamic partitioning, segmentation", "Total free memory is enough, but it is scattered in small non-contiguous pieces", "Compaction (expensive!) or switch to paging/segmentation"],
        ]}
      />

      <H2>Compaction</H2>
      <P>Compaction is the process of moving all occupied memory blocks to one end of RAM, consolidating all free space into one large block. This eliminates external fragmentation but is extremely expensive: it requires moving potentially hundreds of megabytes of data and updating all address translations. Only feasible with run-time address binding (logical addresses). Most modern OSes avoid compaction by using paging instead.</P>

      <H2>Allocation Strategies for Dynamic Partitioning</H2>
      <Table
        heads={["Strategy", "How It Selects a Free Block", "Speed", "Fragmentation Effect"]}
        rows={[
          ["First Fit", "Scan from the start; allocate the FIRST free block that is large enough", "Fast (stops early)", "Tends to leave large holes at the end; small holes at the start"],
          ["Best Fit", "Scan ALL free blocks; allocate the SMALLEST block that fits", "Slow (scans all)", "Minimizes immediate waste but leaves many tiny unusable holes"],
          ["Worst Fit", "Scan ALL free blocks; allocate the LARGEST free block", "Slow (scans all)", "Leaves larger remaining holes (more reusable); generally worse than Best Fit"],
          ["Next Fit", "Like First Fit but starts scanning from where the previous allocation ended (circular scan)", "Fast", "More uniform distribution; similar fragmentation to First Fit"],
        ]}
      />
      <Note color="success" icon="ti-trophy">
        <strong>Empirical finding:</strong> First Fit and Next Fit generally outperform Best Fit in practice because Best Fit's tiny leftover holes are essentially unusable, while First Fit's larger holes can accommodate future requests. The theoretical advantage of Best Fit rarely materializes in real workloads.
      </Note>

      <QA q="Why can't the OS just compact memory whenever external fragmentation becomes a problem?" a="Compaction involves physically moving process data from one RAM location to another. This requires: (1) pausing the affected process (it cannot run while its memory is being moved), (2) copying potentially large amounts of data, (3) updating all pointers and page table entries to reflect new addresses. For a process using 1GB of RAM, compaction means copying 1GB of data -- taking potentially hundreds of milliseconds. During this time, the process is frozen. Additionally, compaction requires run-time address binding (the process must be designed to support relocation). Modern OSes simply use paging instead, which eliminates external fragmentation without compaction." />
      <QA q="What is the difference between internal and external fragmentation? Which does paging cause?" a="Internal fragmentation: wasted space INSIDE an allocated block (the block is bigger than needed). External fragmentation: total free space is sufficient, but scattered in disconnected pieces too small to serve a large request. Paging ELIMINATES external fragmentation (because any set of physical frames can form a virtual page set -- no need for contiguity) but can cause INTERNAL fragmentation in the last page of a process (if the process size is not a multiple of the page size, the last page is partially filled). Example: 4KB pages, process needs 9KB: needs 3 pages = 12KB allocated, 3KB wasted internally." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 8 - PAGING & VIRTUAL MEMORY
══════════════════════════════════════════════════════ */
function SectionPaging() {
  return (
    <div>
      <Note color="success" icon="ti-layers">
        Paging is the cornerstone of modern memory management. It solves external fragmentation, enables virtual memory (running programs larger than physical RAM), and provides the isolation boundary between processes. Understanding paging mechanics deeply is critical for OS interviews.
      </Note>

      <H2>Paging Fundamentals</H2>
      <P>The key insight of paging: <strong>logical addresses need not be contiguous in physical memory</strong>. Break both the logical address space and physical RAM into equal-sized blocks. Map logical blocks (pages) to physical blocks (frames) through a table.</P>
      <Table
        heads={["Term", "Definition", "Typical Size"]}
        rows={[
          ["Page", "Fixed-size block of the process's LOGICAL address space", "4 KB (2^12 bytes) -- the universal standard"],
          ["Frame", "Fixed-size block of PHYSICAL RAM (same size as a page)", "4 KB -- matches page size exactly"],
          ["Page Table", "Per-process array: page_table[page_number] = frame_number", "One entry per page; can be large for big address spaces"],
          ["Page Number (p)", "Upper bits of logical address: index into page table", "e.g., bits [31:12] for 32-bit address with 4KB pages"],
          ["Page Offset (d)", "Lower bits of logical address: position within the page/frame", "12 bits for 4KB pages (2^12 = 4096)"],
          ["Physical Address", "frame_number * page_size + offset = physical location in RAM", "Computed by MMU hardware"],
        ]}
      />
      <Code>{`// Address translation mechanics:
// Logical address = 32-bit = [page_number (20 bits) | offset (12 bits)]
// (for 4GB address space with 4KB pages: 2^20 pages * 2^12 bytes/page = 4GB)

// Translation steps:
1. CPU generates logical address: e.g., 0x00003045
   page_number = 0x00003045 >> 12 = 3    (upper 20 bits)
   offset      = 0x00003045 & 0xFFF = 0x045  (lower 12 bits)

2. Look up page_table[3]:  // OS has loaded this process's page table into MMU
   page_table[3] = frame 8   // page 3 is in physical frame 8

3. Physical address = frame 8 * 4096 + 0x045
                    = 8 * 4096 + 69
                    = 32768 + 69
                    = 32837 = 0x8045

// Each memory access requires TWO memory accesses:
//   1. Access page table in RAM to find frame number
//   2. Access actual data at computed physical address
// TLB caches the most recent page-to-frame translations to avoid the first access.`}</Code>

      <H2>Translation Lookaside Buffer (TLB)</H2>
      <P>Without the TLB, every memory access would require TWO memory accesses (one for the page table, one for the actual data) -- halving effective memory bandwidth. The TLB is a small, fast associative cache in the MMU that caches recently-used page-to-frame mappings.</P>
      <Table
        heads={["TLB Scenario", "Steps", "Performance"]}
        rows={[
          ["TLB Hit", "CPU -> TLB lookup: FOUND frame_number. Compute physical address. Access data.", "~1 extra cycle overhead (TLB access ~1-4ns)"],
          ["TLB Miss", "CPU -> TLB lookup: NOT FOUND. Must access page table in RAM. Update TLB with new entry. Then access data.", "~100+ extra cycles (RAM access ~100ns)"],
          ["Context Switch", "TLB must be flushed (old process's entries are invalid) OR tagged with process IDs (ASID -- Address Space Identifier)", "TLB flush on every context switch is expensive; ASID avoids full flush"],
        ]}
      />
      <Note color="info" icon="ti-math">
        <strong>Effective Access Time (EAT) with TLB:</strong> EAT = hit_rate * (TLB_time + memory_time) + miss_rate * (TLB_time + 2 * memory_time). With 99% hit rate, 5ns TLB, 100ns RAM: EAT = 0.99*(5+100) + 0.01*(5+200) = 103.95 + 2.05 = 106ns -- only 6% overhead vs bare RAM access.
      </Note>

      <H2>Multi-Level Page Tables</H2>
      <P>For a 32-bit address space with 4KB pages, the page table needs 2^20 = 1 million entries * 4 bytes = 4MB per process. For 64-bit: astronomical. Multi-level page tables solve this by only allocating page table pages that are actually needed (sparse allocation).</P>
      <Code>{`// 2-Level paging (32-bit address, 4KB pages):
// Logical address: [10 bits outer | 10 bits inner | 12 bits offset]
// Outer page table: 1024 entries (each points to an inner page table)
// Inner page table: 1024 entries (each gives a frame number)
// Only allocate inner tables for address ranges actually used!

// If process uses only 8MB of its 4GB space:
//   Without 2-level: 4MB page table regardless
//   With 2-level: ~2 inner page tables (2 * 4KB = 8KB) + 1 outer (4KB) = 12KB!

// 4-Level paging (64-bit, used by x86-64):
// [9 bits PML4 | 9 bits PDP | 9 bits PD | 9 bits PT | 12 bits offset]
// Addresses only 48 bits (256 TB) of virtual space in practice
// Linux uses all 4 levels for kernel and user space`}</Code>

      <H2>Virtual Memory and Demand Paging</H2>
      <P>Virtual memory separates the programmer's view of memory from physical RAM. A process's entire logical address space does not need to be in RAM simultaneously. Pages not currently needed stay on disk (swap space or the original executable file).</P>
      <Table
        heads={["Concept", "Explanation"]}
        rows={[
          ["Virtual Address Space", "The full logical address space of a process, potentially much larger than physical RAM. 64-bit processes can address 128 TB of virtual space even if the machine only has 16 GB RAM."],
          ["Demand Paging", "Pages are loaded into RAM only when NEEDED (on demand). The OS initially marks all pages as not-present. When the process accesses one, a page fault loads it from disk."],
          ["Valid/Invalid bit", "Each page table entry has a valid bit. Valid=1: page is in RAM. Valid=0: page is on disk or not yet used. MMU triggers a page fault trap when it sees Valid=0."],
          ["Page Fault Handling", "(1) CPU traps to OS page fault handler. (2) OS checks if the access is legal (valid address?). (3) If legal: OS finds the page on disk. (4) OS finds a free frame (evicting another if needed). (5) Reads page into frame. (6) Updates page table. (7) Restarts the faulting instruction."],
          ["Copy-on-Write (CoW)", "After fork(), parent and child share all physical pages (marked read-only). Only when a process writes to a page is a private copy made. Avoids copying the full process on fork when exec() immediately follows."],
        ]}
      />

      <H2>Page Replacement Algorithms</H2>
      <P>When a page fault occurs and no free frame exists, the OS must evict (replace) a page. The goal: evict the page least likely to be needed soon.</P>
      <FIFOViz />
      <Table
        heads={["Algorithm", "Policy", "Optimal?", "Implementable?", "Belady's Anomaly?"]}
        rows={[
          ["FIFO", "Evict the page loaded into RAM longest ago (oldest page)", "No", "Yes (easy)", "YES -- more frames can increase faults"],
          ["Optimal (OPT)", "Evict the page that will NOT be used for the longest future time", "YES (provably optimal)", "NO (requires future knowledge)", "No"],
          ["LRU", "Evict the page NOT USED for the longest past time (least recently used)", "Close to optimal", "Expensive (hardware counters needed)", "No"],
          ["LRU Approximation: Clock/Second-Chance", "FIFO with a use bit; give pages a second chance before eviction", "Good approximation", "Yes (use bits, hardware support)", "No"],
          ["NFU / LFU", "Evict least frequently used page (counters)", "Varies", "Yes", "No"],
        ]}
      />
      <Note color="danger" icon="ti-alert-triangle">
        <strong>Belady's Anomaly:</strong> Counterintuitively, for FIFO replacement, adding MORE physical frames can INCREASE the number of page faults. This makes FIFO theoretically undesirable. LRU, OPT, and their approximations are stack algorithms -- they provably CANNOT suffer Belady's anomaly. Belady's anomaly occurs specifically because FIFO's eviction choice (oldest) does not correlate with future usage.
      </Note>

      <H2>Thrashing</H2>
      <P>Thrashing occurs when the OS spends more time swapping pages in and out of disk than executing actual process instructions. It is caused by having too many processes competing for too few physical frames.</P>
      <Table
        heads={["Stage", "What Happens"]}
        rows={[
          ["1. High multiprogramming", "OS increases number of processes in RAM to maximize CPU utilization"],
          ["2. Each process gets few frames", "Each process has fewer frames than its working set (actively-used pages)"],
          ["3. Page faults skyrocket", "Every few instructions, a process faults and waits for disk I/O"],
          ["4. CPU utilization drops", "CPU is idle while processes wait for I/O; OS adds MORE processes to boost CPU util"],
          ["5. Positive feedback loop", "More processes -> even fewer frames each -> even more faults -> CPU util approaches 0"],
          ["6. System grinds to halt", "All processes are paging; nothing makes progress; disk I/O at 100%"],
        ]}
      />
      <Note color="success" icon="ti-chart-line">
        <strong>Working Set Model (Denning):</strong> The working set W(t, delta) of a process at time t is the set of pages accessed in the last delta time units. If the total working set sizes of all processes exceeds physical RAM, thrashing will occur. Fix: reduce the degree of multiprogramming (suspend some processes) until total working sets fit in RAM.
      </Note>

      <QA q="Explain why LRU is considered a good approximation of the optimal page replacement algorithm." a="The Optimal algorithm evicts the page with the FURTHEST next use. LRU evicts the page with the MOST DISTANT PAST use. The key assumption (called the principle of temporal locality) is that if a page was recently used, it is likely to be used again soon, and vice versa. Real programs exhibit strong temporal locality (loops, data structures accessed repeatedly in a working set). This makes recent past use a good predictor of near future use, making LRU a close practical approximation of OPT. Studies show LRU within 10-20% of optimal on real workloads." />
      <QA q="What is the difference between a page fault and a segmentation fault?" a="A PAGE FAULT is triggered when a process accesses a valid virtual address whose page is not currently in RAM (it is on disk or not yet allocated). The OS handles it by loading the page from disk and resuming the process -- the process never even knows it happened. It is a normal, expected OS event. A SEGMENTATION FAULT (or access violation) occurs when a process tries to access an address that is NOT part of its valid virtual address space -- an address it has no right to access (null pointer dereference, array out of bounds beyond virtual space, accessing freed memory). The OS cannot satisfy this request; it kills the process with a SIGSEGV signal. Page fault: fixable. Segfault: fatal (program error)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 9 - SEGMENTATION & HYBRID
══════════════════════════════════════════════════════ */
function SectionSegmentation() {
  return (
    <div>
      <Note color="warning" icon="ti-topology-star">
        Segmentation is an alternative memory management scheme that aligns with how programmers think about programs: as distinct logical sections (code, data, stack). Unlike paging (uniform fixed-size blocks), segments are variable-size logical units.
      </Note>

      <H2>Segmentation Concept</H2>
      <P>A programmer naturally thinks of a program as: the main procedure, subroutines, local variables, a stack, a symbol table, global variables, etc. Each of these is a <strong>segment</strong> -- a logically distinct region with a name and a length. Segmentation maps this logical view to physical memory.</P>
      <Table
        heads={["Aspect", "Paging", "Segmentation"]}
        rows={[
          ["Division unit", "Fixed-size pages (e.g., 4KB) -- user is unaware", "Variable-size logical segments (code, data, stack) -- user-visible"],
          ["External fragmentation", "None (any frame fits any page)", "Yes (variable-size holes between segments)"],
          ["Internal fragmentation", "Yes (last page may be partially filled)", "No (segment is exactly as big as needed)"],
          ["Addressing", "1D: single linear address space", "2D: (segment_number, offset) pair"],
          ["Sharing", "Can share pages, but segments map better to logical sharing (share code segment)", "Segments designed for sharing: multiple processes can map the same code segment"],
          ["Protection", "Uniform protection per page (R/W/X bits)", "Different segments can have different permissions (code=RX, data=RW, stack=RW)"],
        ]}
      />

      <H2>Segmentation Hardware and Address Translation</H2>
      <Code>{`// Logical address in segmented system: (segment_number s, offset d)
// Segment Table: indexed by s, gives (base, limit) for each segment
//   base  = starting physical address of the segment
//   limit = maximum length of the segment

// Translation:
if (d >= limit[s]) {
    trap(SEGMENTATION_FAULT);   // offset exceeds segment size -- illegal access!
}
physical_address = base[s] + d;  // valid: compute physical address

// Example:
// Segment 0 (code): base=1000, limit=400
// Segment 1 (data): base=2300, limit=800
// Logical address (0, 100) -> physical: 1000 + 100 = 1100 (valid: 100 < 400)
// Logical address (0, 500) -> FAULT: 500 >= 400 (limit exceeded)
// Logical address (1, 100) -> physical: 2300 + 100 = 2400 (valid: 100 < 800)`}</Code>

      <H2>Segmentation Fault Explained</H2>
      <P>A segmentation fault (SIGSEGV on Linux) can occur in two ways in a segmented system: the offset exceeds the segment limit (out-of-bounds access), or the process tries to access a segment it has no permission for (e.g., writing to the read-only code segment). In modern systems using paging without hardware segmentation, segfault means accessing an unmapped virtual address.</P>

      <H2>Hybrid: Paged Segmentation</H2>
      <P>Real OSes often combine both schemes to get the benefits of each: segmentation for logical organization and protection, paging within each segment to eliminate external fragmentation.</P>
      <Table
        heads={["Step", "Action"]}
        rows={[
          ["1. Logical address", "CPU generates (segment_number s, page_number p, offset d)"],
          ["2. Segment table lookup", "Use s to find the base address of segment s's page table"],
          ["3. Page table lookup", "Use p to index into that segment's page table; get frame number f"],
          ["4. Physical address", "Physical address = frame f * page_size + offset d"],
        ]}
      />
      <Note color="warning" icon="ti-alert-triangle">
        <strong>Cost of hybrid addressing:</strong> Each memory access now requires TWO table lookups (segment table + page table) before the actual data access -- three total memory accesses without a TLB. The TLB becomes even more critical in paged segmentation to avoid this triple overhead.
      </Note>

      <H2>x86 Segmentation in Practice</H2>
      <P>Intel x86 architecture originally used hardware segmentation (CS, DS, SS, ES segment registers). In 64-bit (x86-64) mode, hardware segmentation is largely disabled -- all segments have base 0 and limit = full address space. The OS uses paging exclusively for memory protection and virtualization. The segment registers CS and SS are still technically present but treated as flat.</P>

      <H2>Shared Memory via Segmentation</H2>
      <P>One major advantage of segmentation: the code segment can be shared efficiently between multiple processes. Instead of each process having its own physical copy of the code, all processes running the same program can point their code segment table entry to the same physical memory location. Read-only code sharing is safe and saves significant RAM.</P>

      <QA q="If paging is so good, why was segmentation ever used? What does paging fail to provide that segmentation does?" a="Paging divides the address space into equal fixed-size chunks with no semantic meaning. The OS sees page 0, page 1, page 2 -- it has no idea that pages 0-3 are code (should be read-only), pages 4-7 are data (read-write), and page 8 is the stack. Segmentation preserves the logical STRUCTURE of the program and allows different PROTECTION and SHARING policies per logical unit. You can mark the code segment read-execute (prevent accidental overwrite), the data segment read-write, and share the code segment between multiple processes running the same program. Paging can approximate this with careful page permission bits, but segmentation makes it natural. Modern x86-64 Linux combines both: logical segmentation via memory-mapped regions (mmap, sections) with physical management via paging." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 10 - INTERVIEW PATTERNS
══════════════════════════════════════════════════════ */
function SectionInterview() {
  return (
    <div>
      <Note color="danger" icon="ti-checklist">
        These are the most commonly asked OS interview questions -- covering both conceptual and numerical topics. Expect 5-10 of these in any backend, systems, or SDE interview.
      </Note>

      <H2>Classic Conceptual Questions</H2>
      <Table
        heads={["Question", "Key Answer Points"]}
        rows={[
          ["What is the difference between process and thread?", "Process: own address space, expensive creation, isolated. Thread: shares address space, cheap, communicates via shared memory, one crash kills all threads. IPC for processes, shared variables for threads."],
          ["What is a context switch and what causes overhead?", "Saving PCB of current process, loading PCB of next. Overhead: PCB save/restore, TLB flush (most expensive), pipeline flush, cache cold-start. Every context switch = pure overhead."],
          ["What is thrashing? How is it detected/fixed?", "CPU spending more time paging than executing. Detected: CPU util drops while disk I/O spikes. Fix: reduce multiprogramming degree, suspend some processes, use working set model to ensure each process has enough frames."],
          ["Explain virtual memory. How does it help?", "Abstraction: program sees contiguous logical address space; OS/MMU maps to physical. Benefits: run programs larger than RAM (demand paging), process isolation, efficient sharing (CoW), simplified programming model."],
          ["What causes a segmentation fault vs a page fault?", "Page fault: valid virtual address, page just not in RAM -- OS loads it (transparent). Segfault: invalid virtual address (null dereference, out-of-bounds) -- OS kills process with SIGSEGV."],
          ["Why does FIFO suffer Belady's anomaly but LRU doesn't?", "FIFO is not a stack algorithm. Stack algorithms have the subset property: the set of pages in memory with n+1 frames is always a superset of the set with n frames. LRU is a stack algorithm; FIFO is not."],
          ["How does fork() work and what is copy-on-write?", "fork() creates a child with the same virtual address space. With CoW: parent and child initially SHARE physical pages (marked read-only). A copy is made only when either process WRITES to a page. Fast if exec() follows immediately."],
          ["What is the difference between preemptive and non-preemptive scheduling?", "Preemptive: OS can forcibly remove CPU from a running process (time slice, higher priority arrival). Non-preemptive: process runs until it voluntarily gives up CPU (blocks or terminates). Preemptive provides better response time but adds context switch overhead."],
          ["What is a deadlock? How do you prevent it?", "Permanent block: each process holds a resource and waits for one held by another. Prevent by breaking one Coffman condition: eliminate circular wait (resource ordering), eliminate hold-and-wait (request all upfront), allow preemption, or allow sharing."],
          ["Explain the difference between semaphore and mutex.", "Mutex has ownership (locker must unlock), binary (0/1), for mutual exclusion. Semaphore can be signaled by any thread, can count > 1, for signaling and resource counting. Binary semaphore approximates mutex but lacks ownership semantics."],
        ]}
      />

      <H2>Numerical / Calculation Questions</H2>
      <Table
        heads={["Topic", "Formula / Approach"]}
        rows={[
          ["Scheduling metrics", "TAT = CT - AT. WT = TAT - BT. RT = first CPU time - AT. Avg WT = sum(WT) / n"],
          ["Effective Access Time (TLB)", "EAT = h*(t_tlb + t_mem) + (1-h)*(t_tlb + 2*t_mem). h = TLB hit rate"],
          ["Page table size", "Number of pages = address space / page size. Table size = num_pages * entry_size"],
          ["Number of pages for a process", "ceil(process_size / page_size). Last page may have internal fragmentation."],
          ["Page fault rate impact on EAT", "EAT = (1-p)*mem_access_time + p*(page_fault_time). p = page fault rate"],
          ["Physical address from logical", "(1) Extract page number p = logical >> offset_bits. (2) frame = page_table[p]. (3) physical = frame * page_size + (logical & offset_mask)"],
          ["Banker's algorithm steps", "For each process: check if Need <= Available. If yes, simulate running it: add its Allocation to Available. Mark done. Repeat until all done (safe) or stuck (unsafe)."],
          ["Number of frames for a process", "To avoid thrashing: frames >= size of working set (distinct pages accessed in recent delta time)"],
        ]}
      />

      <H2>Design and Tradeoff Questions</H2>
      <Table
        heads={["Question", "Key Points"]}
        rows={[
          ["Why is the OS kernel separated from user space?", "Security: user code cannot execute privileged instructions. Stability: kernel bugs do not mix with application bugs. Portability: well-defined system call interface. Fault isolation: one misbehaving process cannot corrupt OS state."],
          ["If you had to choose one scheduling algorithm for a web server, which and why?", "MLFQ or CFS (Linux). Reasons: web requests are short and I/O-bound (need responsiveness = short quantum), some requests are long-running, need fairness. FCFS/SJF are inappropriate for interactive workloads. RR works but does not distinguish request types."],
          ["Why is LRU hard to implement in hardware?", "Exact LRU requires a timestamp or ordering maintained for every page on every memory access. With millions of accesses per second, this requires hardware support (counters in page table entries) that is expensive. Most hardware provides approximate LRU via use bits (clock algorithm)."],
          ["How does copy-on-write improve fork() performance?", "Without CoW: fork() must copy the entire parent address space (potentially gigabytes). With CoW: fork() only copies page table entries (kilobytes). Physical pages are shared until written. If exec() follows fork(), no pages are ever copied -- the exec() discards everything anyway."],
          ["What happens during a context switch in terms of cache behavior?", "When switching from process A to B: A's data may be in L1/L2/L3 cache. Switching to B means B's data is cold (not in cache). B will experience many cache misses until its working set loads into cache. This is called cache pollution / cache thrashing. Minimizing context switches preserves cache locality."],
        ]}
      />

      <H2>Common Trick Questions</H2>
      <Table
        heads={["Trick Question", "Correct Answer"]}
        rows={[
          ["Can a program run without an OS?", "Yes -- embedded systems, bootloaders, and bare-metal programs run directly on hardware. The OS is software convenience, not a hardware requirement."],
          ["If we add more RAM, does page fault rate always drop?", "Usually yes, but FIFO has Belady's Anomaly: more frames can increase faults. LRU/OPT do not have this problem."],
          ["Can there be a deadlock with a single process?", "No -- deadlock requires a CYCLE of processes waiting on each other. A single process can starve (wait indefinitely) but not deadlock by itself."],
          ["Are semaphores and monitors equivalent in power?", "Yes -- both can implement the other. Semaphores can simulate condition variables; monitors can simulate counting semaphores. They are equally expressive but differ in ease of use and error risk."],
          ["What is the difference between swapping and virtual memory?", "Swapping: the entire process is moved to/from disk (medium-term scheduler). Virtual memory / demand paging: individual PAGES are moved to/from disk on demand. Virtual memory is far more granular and efficient."],
          ["Can two processes have the same virtual address?", "Yes -- and this is normal! Each process has its OWN page table mapping its virtual addresses to DIFFERENT physical frames. Both may have a variable at virtual address 0x0000400000, but they map to entirely different physical RAM locations."],
        ]}
      />

      <QA q="A common interview scenario: describe what happens from the moment you type a key until a character appears on screen." a="This question tests your breadth of OS knowledge. Key sequence: (1) Keyboard generates a hardware interrupt. (2) CPU suspends current process, saves state (context switch to interrupt handler). (3) OS keyboard interrupt handler reads the scancode from I/O port. (4) Converts scancode to character; places it in a kernel buffer. (5) If a process is waiting for keyboard input (e.g., read() system call blocked), OS moves it from waiting queue to ready queue. (6) Short-term scheduler eventually selects that process. (7) Process receives the character from the kernel buffer. (8) Process decides to echo it -- calls write() system call. (9) OS writes character to display driver buffer. (10) Display driver (GPU driver) updates framebuffer memory. (11) GPU reads framebuffer and sends signal to monitor. (12) Monitor displays the pixel." />
      <QA q="What is the relationship between the kernel, device drivers, and system calls?" a="System calls are the API between user programs and the kernel: read(), write(), fork(), mmap() etc. These are software interrupts that cause a controlled switch to kernel mode. The kernel is the OS core that handles these calls: it manages scheduling, memory allocation, file system access, and IPC. Device drivers are kernel-mode modules that translate abstract OS commands into hardware-specific operations: when the kernel wants to write to disk, it calls the disk driver's write function, which knows the exact register sequences for that hardware. The driver is the abstraction layer between the generic OS and specific hardware. User programs -> system calls -> kernel -> device drivers -> hardware." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: 'foundations',    label: 'Foundations'           },
  { id: 'processes',      label: 'Processes'             },
  { id: 'scheduling',     label: 'CPU Scheduling'        },
  { id: 'threads',        label: 'Threads'               },
  { id: 'sync',           label: 'Synchronization'       },
  { id: 'deadlocks',      label: 'Deadlocks'             },
  { id: 'memory',         label: 'Memory Management'     },
  { id: 'paging',         label: 'Paging & Virtual Mem'  },
  { id: 'segmentation',   label: 'Segmentation'          },
  { id: 'interview',      label: 'Interview Patterns'    },
];

export default function OS() {
  const [active, setActive] = useState('foundations');
  const map = {
    foundations:  <SectionFoundations />,
    processes:    <SectionProcesses />,
    scheduling:   <SectionScheduling />,
    threads:      <SectionThreads />,
    sync:         <SectionSync />,
    deadlocks:    <SectionDeadlocks />,
    memory:       <SectionMemory />,
    paging:       <SectionPaging />,
    segmentation: <SectionSegmentation />,
    interview:    <SectionInterview />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Core CS -- Module 50</div>
        <h1 className="page-header-title">Operating Systems</h1>
        <p className="page-header-subtitle">
          Processes · Scheduling · Threads · Synchronization · Deadlocks · Memory Management · Paging · Virtual Memory · Segmentation · Banker's Algorithm
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{ padding: '0.5rem 0 2rem' }}>{map[active]}</div>
      <NavButtons moduleId={50} />
    </div>
  );
}
