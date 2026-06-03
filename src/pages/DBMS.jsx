import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   STEP BUILDERS — computed once at module load
══════════════════════════════════════════════════════ */

function buildBPlusSteps() {
  return [
    { leaf: [[10]], internal: [], desc: "Insert 10 into empty tree. Single leaf node: [10]." },
    { leaf: [[10,20]], internal: [], desc: "Insert 20. Leaf [10,20] — within capacity (max 2 keys for order 3)." },
    { leaf: [[10],[20,30]], internal: [[20]], desc: "Insert 30. Leaf overflows. Split: left=[10], right=[20,30]. Push 20 up to new root." },
    { leaf: [[10],[20,30,40]], internal: [[20]], desc: "Insert 40. Goes to right leaf [20,30,40] — now overflowing." },
    { leaf: [[10],[20,30],[40]], internal: [[20,30]], desc: "Split [20,30,40]: left=[20,30], right=[40]. Push 30 up. Root now [20,30]." },
    { leaf: [[10],[20,30],[40,50]], internal: [[20,30]], desc: "Insert 50. Goes to rightmost leaf [40,50] — no overflow." },
    { leaf: [[10],[20,30],[40,50,60]], internal: [[20,30]], desc: "Insert 60. Rightmost leaf [40,50,60] overflows. Splitting..." },
    { leaf: [[10],[20,30],[40,50],[60]], internal: [[20,30,50]], desc: "Split: left=[40,50], right=[60]. Push 50 up. Root overflows with [20,30,50]." },
    { leaf: [[10],[20],[30,40],[50],[60]], internal: [[20,30],[50]], rootKey: 30, desc: "Root split. New root=30. Left subtree=[20,30], right subtree=[50]. All data in leaves, linked left-to-right." },
  ];
}
const BPLUS_STEPS = buildBPlusSteps();

function build2PLSteps() {
  return [
    { tx:1, op:'Lock-S(A)', phase:'grow',   status:'ok',   desc:"T1 acquires Shared lock on A. Growing phase begins." },
    { tx:2, op:'Lock-S(A)', phase:'grow',   status:'ok',   desc:"T2 acquires Shared lock on A. S-S locks are compatible — both can hold simultaneously." },
    { tx:1, op:'R(A)',      phase:'grow',   status:'ok',   desc:"T1 reads A. Proceeds normally under shared lock." },
    { tx:2, op:'R(A)',      phase:'grow',   status:'ok',   desc:"T2 reads A. Both T1 and T2 can read concurrently with no conflict." },
    { tx:1, op:'Upgrade X(A)', phase:'grow', status:'wait', desc:"T1 wants to write A: upgrade S->X lock. Blocked — T2 still holds S-lock. T1 waits." },
    { tx:2, op:'Unlock(A)', phase:'shrink', status:'ok',   desc:"T2 releases S-lock (shrinking phase starts for T2)." },
    { tx:1, op:'Lock-X(A)', phase:'grow',   status:'ok',   desc:"T1 now acquires Exclusive lock on A. No other lock holders remain." },
    { tx:1, op:'W(A)',      phase:'grow',   status:'ok',   desc:"T1 writes A under exclusive lock." },
    { tx:2, op:'Lock-X(A)', phase:'grow',   status:'wait', desc:"T2 wants to write A. Blocked — T1 holds X-lock. T2 waits." },
    { tx:1, op:'Unlock(A)', phase:'shrink', status:'ok',   desc:"T1 commits and releases all locks. Shrinking phase complete." },
    { tx:2, op:'Lock-X(A)', phase:'grow',   status:'ok',   desc:"T2 acquires X-lock now that T1 released." },
    { tx:2, op:'W(A)',      phase:'grow',   status:'ok',   desc:"T2 writes A. Schedule is conflict-serializable: T1 then T2." },
    { tx:2, op:'Unlock(A)', phase:'shrink', status:'ok',   desc:"T2 commits. Both transactions complete. 2PL guarantees conflict serializability." },
  ];
}
const LOCK_STEPS = build2PLSteps();

function buildNormSteps() {
  return [
    { form:'UNF',  color:'danger',
      table:{ cols:['StudentID','Name','Courses'], rows:[['S1','Alice','Math, Physics'],['S2','Bob','Chemistry']] },
      issue:"Non-atomic value in Courses column (comma-separated list). Violates 1NF." },
    { form:'1NF',  color:'warning',
      table:{ cols:['StudentID','Name','Course'], rows:[['S1','Alice','Math'],['S1','Alice','Physics'],['S2','Bob','Chemistry']] },
      issue:"Atomic values achieved. But Name depends only on StudentID, not the full key (StudentID, Course). Partial dependency." },
    { form:'2NF',  color:'warning',
      t1:{ title:'Student', cols:['StudentID','Name'], rows:[['S1','Alice'],['S2','Bob']] },
      t2:{ title:'Enrollment', cols:['StudentID','Course'], rows:[['S1','Math'],['S1','Physics'],['S2','Chemistry']] },
      issue:"Partial dependency removed. But if Course -> Instructor and Instructor -> Dept, transitive dependency still exists." },
    { form:'3NF',  color:'success',
      t1:{ title:'Student', cols:['StudentID','Name'], rows:[['S1','Alice'],['S2','Bob']] },
      t2:{ title:'Enrollment', cols:['StudentID','Course'], rows:[['S1','Math'],['S1','Physics'],['S2','Chemistry']] },
      t3:{ title:'Course', cols:['Course','Instructor'], rows:[['Math','Dr. A'],['Physics','Dr. B'],['Chemistry','Dr. C']] },
      issue:"All transitive dependencies removed. Non-prime attributes depend ONLY on candidate keys. No anomalies remain." },
  ];
}
const NORM_STEPS = buildNormSteps();

function buildPrecSteps() {
  return [
    { desc:"Schedule: T1:R(A), T2:W(A), T2:R(B), T1:W(B). Build precedence graph to check conflict serializability.", edges:[], cycle:false },
    { desc:"T1:R(A) vs T2:W(A): different TXs, same item, one is write. T1 reads BEFORE T2 writes => edge T1->T2 (conflict on A).", edges:[{from:1,to:2,item:'A'}], cycle:false },
    { desc:"T2:R(B) vs T1:W(B): different TXs, same item, one is write. T2 reads BEFORE T1 writes => edge T2->T1 (conflict on B).", edges:[{from:1,to:2,item:'A'},{from:2,to:1,item:'B'}], cycle:false },
    { desc:"Graph has cycle: T1->T2->T1. CYCLE DETECTED. This schedule is NOT conflict-serializable.", edges:[{from:1,to:2,item:'A'},{from:2,to:1,item:'B'}], cycle:true },
  ];
}
const PREC_STEPS = buildPrecSteps();

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — B+ TREE INSERTION VIZ
══════════════════════════════════════════════════════ */
function BPlusViz() {
  const [step, setStep] = useState(0);
  const s = BPLUS_STEPS[Math.min(step, BPLUS_STEPS.length - 1)];
  const LEAF_CLR = '#4EC9B0'; const INT_CLR = '#CE9178'; const ROOT_CLR = '#C586C0';

  const LeafRow = ({ nodes }) => (
    <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
      {nodes.map((node, ni) => (
        <div key={ni} style={{ display:'flex', alignItems:'center' }}>
          <div style={{ display:'flex', borderRadius:5, overflow:'hidden', border:`1.5px solid ${LEAF_CLR}` }}>
            {node.map((k, ki) => (
              <div key={ki} style={{ padding:'5px 14px', background:'#0D1F1E', fontFamily:'var(--font-mono)', fontSize:13, color:LEAF_CLR, borderRight: ki < node.length-1 ? `1px solid ${LEAF_CLR}` : 'none' }}>{k}</div>
            ))}
          </div>
          {ni < nodes.length-1 && <span style={{ color:'var(--color-text-tertiary)', fontSize:13, margin:'0 4px' }}>--{'>'}</span>}
        </div>
      ))}
    </div>
  );

  const IntRow = ({ nodes, clr }) => (
    <div style={{ display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap' }}>
      {nodes.map((node, ni) => (
        <div key={ni} style={{ display:'flex', borderRadius:5, overflow:'hidden', border:`1.5px solid ${clr}` }}>
          {node.map((k, ki) => (
            <div key={ki} style={{ padding:'5px 16px', background:'#1A1200', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:clr, borderRight: ki < node.length-1 ? `1px solid ${clr}` : 'none' }}>{k}</div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <VizBox>
      <div style={{ marginBottom:14, padding:'7px 12px', background:'var(--color-background-info)', border:'1px solid var(--color-border-info)', borderRadius:'var(--border-radius-md)', fontSize:13, color:'var(--color-text-info)', lineHeight:1.6 }}>{s.desc}</div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'10px 0' }}>
        {s.rootKey != null && (
          <div style={{ padding:'6px 20px', borderRadius:6, background:'#2D1F3D', border:`2px solid ${ROOT_CLR}`, fontFamily:'var(--font-mono)', fontSize:14, fontWeight:700, color:ROOT_CLR }}>
            {s.rootKey}
          </div>
        )}
        {s.internal && s.internal.length > 0 && <IntRow nodes={s.internal} clr={INT_CLR} />}
        {s.leaf && s.leaf.length > 0 && <LeafRow nodes={s.leaf} />}
      </div>
      <div style={{ display:'flex', gap:8, marginTop:4, justifyContent:'center', flexWrap:'wrap' }}>
        {[['Leaf (data)', LEAF_CLR], ['Internal (index)', INT_CLR], ['Root', ROOT_CLR]].map(([l,c]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'var(--color-text-tertiary)' }}>
            <div style={{ width:9, height:9, background:c, borderRadius:2 }}/>{l}
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:12 }}>
        {[['Prev', () => setStep(Math.max(0, step-1)), step===0], ['Next', () => setStep(Math.min(BPLUS_STEPS.length-1, step+1)), step===BPLUS_STEPS.length-1]].map(([l,a,d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:72, textAlign:'center', alignSelf:'center' }}>{step+1} / {BPLUS_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
        <button onClick={() => setStep(BPLUS_STEPS.length-1)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>End</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — 2PL LOCK SCHEDULE VIZ
══════════════════════════════════════════════════════ */
function LockViz() {
  const [step, setStep] = useState(0);
  const s = LOCK_STEPS[Math.min(step, LOCK_STEPS.length-1)];
  const t1ops = LOCK_STEPS.slice(0, step+1).filter(o => o.tx===1);
  const t2ops = LOCK_STEPS.slice(0, step+1).filter(o => o.tx===2);
  const oc = o => o.status==='wait' ? 'warning' : o.phase==='shrink' ? 'danger' : 'success';

  return (
    <VizBox>
      <div style={{ marginBottom:14, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
        <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:600, background:`var(--color-background-${s.tx===1?'info':'purple'})`, color:`var(--color-text-${s.tx===1?'info':'purple'})`, border:`1px solid var(--color-border-${s.tx===1?'info':'purple'})`, whiteSpace:'nowrap' }}>T{s.tx}: {s.op}</span>
        <span style={{ padding:'2px 9px', borderRadius:12, fontSize:11, fontWeight:600, background:`var(--color-background-${s.status==='wait'?'warning':'success'})`, color:`var(--color-text-${s.status==='wait'?'warning':'success'})`, border:`1px solid var(--color-border-${s.status==='wait'?'warning':'success'})`, whiteSpace:'nowrap' }}>{s.status==='wait'?'Blocked':s.phase==='shrink'?'Shrinking':'Growing'}</span>
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.desc}</span>
      </div>
      <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
        {[{tx:1, ops:t1ops, clr:'info'},{tx:2, ops:t2ops, clr:'purple'}].map(({tx, ops, clr}) => (
          <div key={tx} style={{ flex:1, minWidth:160 }}>
            <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:`var(--color-text-${clr})`, marginBottom:6, letterSpacing:'0.06em' }}>TRANSACTION T{tx}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              {ops.map((o,i) => { const c=oc(o); return (
                <div key={i} style={{ padding:'4px 10px', borderRadius:5, border:`1px solid var(--color-border-${c})`, background:`var(--color-background-${c})`, fontFamily:'var(--font-mono)', fontSize:11.5, color:`var(--color-text-${c})` }}>
                  {o.op}{o.status==='wait'?' (WAIT)':''}
                </div>
              );})}
            </div>
          </div>
        ))}
        <div style={{ flex:1, minWidth:140 }}>
          <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:6, letterSpacing:'0.06em' }}>LOCK COMPATIBILITY</div>
          <div style={{ border:'0.5px solid var(--color-border-secondary)', borderRadius:6, overflow:'hidden', fontSize:11.5, fontFamily:'var(--font-mono)' }}>
            {[['','S','X'],['S','YES','NO'],['X','NO','NO']].map((row,ri) => (
              <div key={ri} style={{ display:'flex' }}>
                {row.map((cell,ci) => (
                  <div key={ci} style={{ flex:1, padding:'5px 8px', background: ri===0||ci===0 ? 'var(--color-background-tertiary)' : cell==='YES' ? 'var(--color-background-success)' : cell==='NO' ? 'var(--color-background-danger)' : 'transparent', color: ri===0||ci===0 ? 'var(--color-text-tertiary)' : cell==='YES' ? 'var(--color-text-success)' : cell==='NO' ? 'var(--color-text-danger)' : 'var(--color-text-primary)', borderRight: ci<2 ? '0.5px solid var(--color-border-secondary)' : 'none', borderBottom: ri<2 ? '0.5px solid var(--color-border-secondary)' : 'none', textAlign:'center', fontWeight: ri===0||ci===0 ? 700 : 400 }}>{cell}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:14 }}>
        {[['Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next',()=>setStep(Math.min(LOCK_STEPS.length-1,step+1)),step===LOCK_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:72, textAlign:'center', alignSelf:'center' }}>{step+1} / {LOCK_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
        <button onClick={()=>setStep(LOCK_STEPS.length-1)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>End</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — NORMALIZATION STEPPER
══════════════════════════════════════════════════════ */
function NormViz() {
  const [step, setStep] = useState(0);
  const s = NORM_STEPS[Math.min(step, NORM_STEPS.length-1)];

  const MiniTable = ({ title, cols, rows }) => (
    <div style={{ marginBottom:10 }}>
      {title && <div style={{ fontSize:10.5, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:4, letterSpacing:'0.06em' }}>{title.toUpperCase()}</div>}
      <div style={{ border:'0.5px solid var(--color-border-secondary)', borderRadius:6, overflow:'hidden', fontSize:11.5, fontFamily:'var(--font-mono)' }}>
        <div style={{ display:'flex', background:'var(--color-background-tertiary)', borderBottom:'0.5px solid var(--color-border-secondary)' }}>
          {cols.map((c,i) => <div key={i} style={{ flex:1, padding:'4px 10px', color:'var(--color-text-secondary)', fontWeight:600, fontSize:11, borderRight: i<cols.length-1 ? '0.5px solid var(--color-border-secondary)' : 'none' }}>{c}</div>)}
        </div>
        {rows.map((row,ri) => (
          <div key={ri} style={{ display:'flex', borderBottom: ri<rows.length-1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
            {row.map((cell,ci) => <div key={ci} style={{ flex:1, padding:'4px 10px', color:'var(--color-text-primary)', fontSize:11.5, borderRight: ci<row.length-1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>{cell}</div>)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <VizBox>
      <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12, flexWrap:'wrap' }}>
        <span style={{ padding:'3px 12px', borderRadius:12, fontSize:12, fontWeight:700, background:`var(--color-background-${s.color})`, color:`var(--color-text-${s.color})`, border:`1px solid var(--color-border-${s.color})` }}>{s.form}</span>
        <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.55 }}>{s.issue}</span>
      </div>
      {s.table && <MiniTable cols={s.table.cols} rows={s.table.rows} />}
      {s.t1 && <MiniTable title={s.t1.title} cols={s.t1.cols} rows={s.t1.rows} />}
      {s.t2 && <MiniTable title={s.t2.title} cols={s.t2.cols} rows={s.t2.rows} />}
      {s.t3 && <MiniTable title={s.t3.title} cols={s.t3.cols} rows={s.t3.rows} />}
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:8 }}>
        {[['Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next',()=>setStep(Math.min(NORM_STEPS.length-1,step+1)),step===NORM_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:60, textAlign:'center', alignSelf:'center' }}>{step+1} / {NORM_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 4 — PRECEDENCE GRAPH VIZ
══════════════════════════════════════════════════════ */
function PrecGraphViz() {
  const [step, setStep] = useState(0);
  const s = PREC_STEPS[Math.min(step, PREC_STEPS.length-1)];

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'7px 12px', background: s.cycle ? 'var(--color-background-danger)' : 'var(--color-background-secondary)', border:`1px solid ${s.cycle ? 'var(--color-border-danger)' : 'var(--color-border-secondary)'}`, borderRadius:'var(--border-radius-md)', fontSize:13, color: s.cycle ? 'var(--color-text-danger)' : 'var(--color-text-secondary)', lineHeight:1.6 }}>{s.desc}</div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:70, padding:'16px 0' }}>
        {[1,2].map(tx => (
          <div key={tx} style={{ width:54, height:54, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:15, fontWeight:700, border:`2px solid ${tx===1?'var(--color-border-info)':'var(--color-border-purple)'}`, background: tx===1 ? 'var(--color-background-info)' : 'var(--color-background-purple)', color: tx===1 ? 'var(--color-text-info)' : 'var(--color-text-purple)' }}>T{tx}</div>
        ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'center' }}>
        {s.edges.map((e,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:20, border:`1px solid ${s.cycle?'var(--color-border-danger)':'var(--color-border-info)'}`, background: s.cycle ? 'var(--color-background-danger)' : 'var(--color-background-info)', fontSize:12.5, fontFamily:'var(--font-mono)', color: s.cycle ? 'var(--color-text-danger)' : 'var(--color-text-info)' }}>
            <span>T{e.from}</span><span style={{ fontSize:16 }}>-{'>'}</span><span>T{e.to}</span>
            <span style={{ color:'var(--color-text-tertiary)', fontSize:11 }}>conflict on {e.item}</span>
          </div>
        ))}
        {s.cycle && (
          <div style={{ marginTop:6, padding:'6px 16px', borderRadius:8, background:'var(--color-background-danger)', border:'1px solid var(--color-border-danger)', fontFamily:'var(--font-mono)', fontSize:12.5, fontWeight:700, color:'var(--color-text-danger)' }}>
            CYCLE DETECTED - Not Conflict-Serializable
          </div>
        )}
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:14 }}>
        {[['Prev',()=>setStep(Math.max(0,step-1)),step===0],['Next',()=>setStep(Math.min(PREC_STEPS.length-1,step+1)),step===PREC_STEPS.length-1]].map(([l,a,d])=>(
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:60, textAlign:'center', alignSelf:'center' }}>{step+1} / {PREC_STEPS.length}</span>
        <button onClick={()=>setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — INTRODUCTION
══════════════════════════════════════════════════════ */
function SectionIntro() {
  return (
    <div>
      <Note color="info" icon="ti-database">
        A <strong>DBMS</strong> is software that provides a systematic way to store, retrieve, and manage data. It abstracts away physical storage details, enforces integrity constraints, handles concurrent access, and provides recovery mechanisms. The core goal: <strong>data independence</strong> — changing storage structure should not break application code.
      </Note>

      <H2>File System vs. RDBMS</H2>
      <Table
        heads={["Problem in File Systems", "How RDBMS Solves It"]}
        rows={[
          ["Data redundancy: same data duplicated across files", "Normalization and foreign keys eliminate duplication"],
          ["Data inconsistency: multiple copies go out of sync", "Single source of truth; updates propagate via constraints"],
          ["No concurrent access control — race conditions", "ACID transactions and locking protocols"],
          ["No security model beyond coarse OS file permissions", "Row-level and column-level control via GRANT/REVOKE"],
          ["No standard query language; logic tied to each program", "SQL: declarative, portable, optimized by the engine"],
          ["No integrity enforcement — app must validate everything", "CHECK, UNIQUE, NOT NULL, FK constraints enforced by DB"],
          ["No recovery from partial failure", "WAL + REDO/UNDO logs guarantee durability"],
        ]}
      />

      <H2>Three-Level ANSI/SPARC Architecture</H2>
      <Grid cols={3}>
        <Card title="External / View Level" color="info">
          What individual users or applications see. Each user gets a customized virtual table (view). Hides irrelevant data and implementation complexity.
        </Card>
        <Card title="Conceptual / Logical Level" color="success">
          The complete logical structure: all tables, relationships, constraints, and FDs. This is what database designers and DBAs work with.
        </Card>
        <Card title="Internal / Physical Level" color="warning">
          How data is physically stored: file organization, index structures, block size, compression. Managed by the storage engine.
        </Card>
      </Grid>
      <Note color="success" icon="ti-bulb">
        <strong>Data Independence:</strong> Logical independence means changing the conceptual schema (adding a column) does not break external views. Physical independence means changing storage (adding an index) does not change the logical schema. RDBMS provides both.
      </Note>

      <H2>Schema vs. Instance</H2>
      <Table
        heads={["Concept", "Definition", "Analogy"]}
        rows={[
          ["Schema (Intension)", "Structural blueprint: table names, column names, data types, constraints. Changes rarely.", "Class definition in OOP"],
          ["Instance (Extension)", "The actual data at a particular point in time. Changes with every DML operation.", "Object instance at runtime"],
          ["Metadata", "Data about data: schema info stored in the data dictionary / system catalog", "The catalog describing all tables"],
        ]}
      />

      <H2>Data Models Comparison</H2>
      <Table
        heads={["Model", "Storage", "Query Style", "Examples", "Best For"]}
        rows={[
          ["Relational", "Tables (relations)", "SQL (declarative)", "MySQL, PostgreSQL, Oracle", "Structured data, complex joins, ACID needed"],
          ["Document", "JSON/BSON documents", "Field-based queries", "MongoDB, CouchDB", "Semi-structured, nested, schema-flexible data"],
          ["Key-Value", "Hash map", "GET/PUT by key", "Redis, DynamoDB", "Cache, session store, high-throughput simple ops"],
          ["Wide-Column", "Column families", "CQL", "Cassandra, HBase", "Time-series data, massive write throughput"],
          ["Graph", "Nodes + edges", "Traversal queries", "Neo4j, Amazon Neptune", "Social networks, recommendation engines"],
        ]}
      />

      <QA q="Why does the relational model dominate despite NoSQL alternatives being faster for specific workloads?" a="The relational model provides the most general combination of expressiveness (any query writable in relational algebra), integrity (constraints enforced at the DB level), ACID guarantees (critical for financial/medical data), and portability (SQL is standardized by ANSI/ISO). NoSQL trades some of these for specific performance characteristics. Most production systems use both: a relational DB for core transactional data and a NoSQL store for caching, analytics, or flexible-schema needs." />
      <QA q="What is the difference between physical and logical data independence, and which is harder to achieve?" a="Physical data independence: changing physical storage (adding an index, changing block size) without altering the logical schema or application queries. Logical data independence: changing the logical schema (splitting a table, adding columns) without breaking external views or application code. Logical independence is harder because views must be rewritten to reflect structural changes, whereas physical changes are transparent to the query optimizer." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — ER MODEL
══════════════════════════════════════════════════════ */
function SectionER() {
  return (
    <div>
      <Note color="purple" icon="ti-vector">
        The <strong>ER Model</strong> is a conceptual design tool used before schema implementation. It captures real-world structure in terms of entities, attributes, and relationships. ER diagrams map directly to relational schemas via a standard set of conversion rules.
      </Note>

      <H2>Core ER Components</H2>
      <Table
        heads={["Component", "ER Symbol", "Meaning", "Example"]}
        rows={[
          ["Entity Set", "Rectangle", "A collection of similar objects (corresponds to a table)", "Student, Employee, Product"],
          ["Relationship Set", "Diamond", "An association between two or more entity sets", "enrolls, manages, supplies"],
          ["Simple Attribute", "Oval", "An atomic property of an entity", "name, age, salary"],
          ["Key Attribute", "Underlined oval", "Uniquely identifies an entity within its set", "roll_no, emp_id"],
          ["Multivalued Attribute", "Double oval", "Can hold multiple values for one entity", "phone_numbers, skills"],
          ["Derived Attribute", "Dashed oval", "Computed from another attribute; not stored", "age derived from dob"],
          ["Composite Attribute", "Oval with sub-ovals", "Composed of sub-attributes", "name = {first, last}"],
          ["Weak Entity Set", "Double rectangle", "No own primary key; depends on owner entity", "Order_Item depends on Order"],
          ["Identifying Relationship", "Double diamond", "Links weak entity to its owner", "'has' between Order and Item"],
        ]}
      />

      <H2>Degree of a Relationship</H2>
      <Grid cols={3}>
        <Card title="Unary (Degree 1)" color="info">
          An entity participates in a relationship with itself. Example: <code>Employee manages Employee</code>. Represents recursive/hierarchical structures.
        </Card>
        <Card title="Binary (Degree 2)" color="success">
          Two entity sets. The most common. Example: <code>Student enrolls Course</code>. Nearly all real-world relationships are binary.
        </Card>
        <Card title="n-ary (Degree n)" color="warning">
          n entity sets participate. Example: <code>Professor supervises Student in Project</code>. Ternary relationships are the most common beyond binary.
        </Card>
      </Grid>

      <H2>Cardinality Constraints</H2>
      <Table
        heads={["Cardinality", "Meaning", "Example", "Relational Conversion Rule"]}
        rows={[
          ["1 : 1", "One A relates to exactly one B and vice versa", "Person holds one Aadhaar card", "FK on either side, or merge tables"],
          ["1 : M", "One A relates to many B", "Professor teaches many Courses", "FK (PK of '1-side') goes into 'many-side' table"],
          ["M : 1", "Many A relate to one B (reverse of 1:M)", "Many Employees work in one Department", "FK (PK of Dept) goes into Employee table"],
          ["M : M", "Many A relate to many B", "Student registers for many Subjects", "Create junction table with both PKs as composite PK"],
        ]}
      />

      <H2>Participation Constraints</H2>
      <Grid cols={2}>
        <Card title="Total Participation (Double Line)" color="danger">
          Every entity in the set MUST participate in at least one relationship instance. Example: every Order_Item MUST belong to an Order. Translates to NOT NULL on the FK.
        </Card>
        <Card title="Partial Participation (Single Line)" color="secondary">
          Some entities may not participate in any relationship. Example: some Employees may not manage anyone. FK can be NULL in the relational schema.
        </Card>
      </Grid>

      <H2>Weak Entity Sets</H2>
      <Table
        heads={["Property", "Strong Entity", "Weak Entity"]}
        rows={[
          ["Primary Key", "Has its own (e.g., order_id)", "No own PK; uses discriminator + owner PK as composite"],
          ["Participation", "Can be partial in any relationship", "ALWAYS total in its identifying relationship"],
          ["Existence", "Independent; can exist alone", "Cannot exist without its owner entity"],
          ["ER Symbol", "Single rectangle", "Double rectangle + double diamond for identifying relationship"],
          ["Example", "Order (order_id)", "Order_Item: identified by (order_id, item_no)"],
        ]}
      />

      <H2>ER to Relational Mapping Rules</H2>
      <Table
        heads={["ER Construct", "Relational Mapping"]}
        rows={[
          ["Strong entity set E with simple attrs", "Table E with all simple attrs; choose candidate key as PK"],
          ["Weak entity set W", "Table W with discriminator + owner PK as composite PK; FK to owner with ON DELETE CASCADE"],
          ["1:1 relationship R", "Merge tables OR add FK + relationship attrs to either side (prefer total-participation side)"],
          ["1:N relationship R", "Add FK (PK of '1-side') into the 'N-side' table; add relationship attrs there too"],
          ["M:N relationship R", "Create junction table R(PK_A, PK_B, relationship_attrs); composite PK = (PK_A, PK_B)"],
          ["Multivalued attribute A of entity E", "Create table (E.PK, A_value); composite PK = (E.PK, A_value); FK to E"],
          ["Composite attribute", "Expand into individual simple sub-attribute columns"],
          ["Derived attribute", "Usually omit; compute in queries using expressions or stored computed columns"],
        ]}
      />

      <QA q="Why are M:N relationships always converted to a separate junction table rather than embedding FKs?" a="In a M:N relationship, each entity on either side can relate to multiple entities on the other. If you embed FK_A in table B, a single B row can only reference one A row, violating the 'many' side. The only relational way to represent arbitrary (A_id, B_id) pairs is a separate table where each row represents one link. This junction table can also hold relationship attributes such as enrollment_date in a Student-Course relationship." />
      <QA q="Why must a weak entity always have total participation in its identifying relationship?" a="A weak entity's identification depends entirely on its owner. If a weak entity instance existed without participating in the identifying relationship, it would have no way to be uniquely identified since it has no independent primary key. Total participation enforces that every weak entity instance is associated with exactly one owner, making the composite key (owner_PK + discriminator) always well-defined and non-null." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — RELATIONAL MODEL & ALGEBRA
══════════════════════════════════════════════════════ */
function SectionRelational() {
  return (
    <div>
      <Note color="info" icon="ti-table">
        The <strong>Relational Model</strong> (E.F. Codd, 1970) stores data in <em>relations</em> (tables). Relational Algebra is the procedural query language that SQL compiles to. Every SQL query has an equivalent relational algebra expression evaluated by the query optimizer.
      </Note>

      <H2>Formal Terminology</H2>
      <Table
        heads={["Formal Term", "Common Term", "Definition"]}
        rows={[
          ["Relation", "Table", "A set of tuples all sharing the same schema"],
          ["Tuple", "Row / Record", "One data entry; an ordered sequence of values"],
          ["Attribute", "Column / Field", "A named property with a domain (allowed value set)"],
          ["Domain", "Data type", "The set of atomic values allowed for an attribute"],
          ["Degree / Arity", "Number of columns", "Count of attributes in the relation schema"],
          ["Cardinality", "Number of rows", "Count of tuples in the current relation instance"],
          ["NULL", "Unknown / missing", "Not zero, not empty string — a special absence-of-value marker"],
        ]}
      />

      <H2>Relational Algebra — Unary Operations</H2>
      <Table
        heads={["Operation", "Symbol", "SQL Equivalent", "Description"]}
        rows={[
          ["Selection", "sigma", "WHERE clause", "Filters rows satisfying a predicate. sigma_cond(R) keeps rows where cond is true."],
          ["Projection", "pi", "SELECT cols", "Keeps only specified columns; removes duplicate rows. pi_A,B(R)"],
          ["Rename", "rho", "AS alias", "Renames a relation or its attributes. rho_S(A,B)(R)"],
        ]}
      />

      <H2>Relational Algebra — Binary Operations</H2>
      <Table
        heads={["Operation", "SQL Equivalent", "Requirements", "Notes"]}
        rows={[
          ["Union (R U S)", "UNION", "R and S must be union-compatible (same degree, compatible domains)", "Eliminates duplicates"],
          ["Set Difference (R - S)", "EXCEPT / MINUS", "Union-compatible", "Tuples in R but not in S"],
          ["Cartesian Product (R x S)", "CROSS JOIN", "None", "All pairs; |R|*|S| rows; rarely used alone"],
          ["Natural Join (R |x| S)", "NATURAL JOIN", "Common attribute names", "Equi-join on all matching names; keeps one copy"],
          ["Theta Join (R |x|_theta S)", "JOIN ... ON condition", "None", "Cartesian product filtered by theta"],
          ["Intersection (R INTERSECT S)", "INTERSECT", "Union-compatible", "Derived: R INTERSECT S = R - (R - S)"],
          ["Division (R / S)", "No direct SQL", "S attrs subset of R attrs", "'For all': find R tuples matching ALL S tuples"],
        ]}
      />

      <H2>SQL Joins Compared</H2>
      <Table
        heads={["Join Type", "Returns", "Non-Match Behavior"]}
        rows={[
          ["INNER JOIN", "Only rows where condition matches in BOTH tables", "Non-matching rows excluded entirely"],
          ["LEFT OUTER JOIN", "All rows from left + matched rows from right", "NULL for right-side cols on non-match"],
          ["RIGHT OUTER JOIN", "All rows from right + matched rows from left", "NULL for left-side cols on non-match"],
          ["FULL OUTER JOIN", "All rows from both tables", "NULL for whichever side has no match"],
          ["CROSS JOIN", "Cartesian product of both tables", "N/A — all combinations always included"],
          ["SELF JOIN", "Table joined with itself (must use aliases)", "Used for hierarchical/recursive data"],
          ["NATURAL JOIN", "Equi-join on ALL identically-named columns", "Dangerous if unexpected name collisions exist"],
        ]}
      />

      <H2>Integrity Constraints</H2>
      <Table
        heads={["Constraint", "Rule", "SQL Declaration"]}
        rows={[
          ["Domain Constraint", "Every attribute value must belong to its declared domain", "Data types + CHECK constraints"],
          ["Key Constraint", "No two tuples can share the same primary key value", "PRIMARY KEY declaration"],
          ["Entity Integrity", "No primary key attribute can be NULL", "Automatic on PRIMARY KEY columns"],
          ["Referential Integrity", "FK value must exist as a PK in the referenced table, or be NULL", "FOREIGN KEY ... REFERENCES ..."],
          ["Check Constraint", "Custom condition every row must satisfy", "CHECK (salary >= 0)"],
          ["Unique Constraint", "No two rows can share the same value for this column (NULLs may repeat)", "UNIQUE keyword"],
        ]}
      />

      <Note color="warning" icon="ti-alert-triangle">
        <strong>SQL uses bag (multiset) semantics, not set semantics.</strong> Duplicate rows CAN exist unless you have UNIQUE or PRIMARY KEY constraints. <code>SELECT DISTINCT</code> restores set semantics. Relational algebra theoretically operates on sets, but SQL defaults to bags for performance.
      </Note>

      <H2>Division Operation — "For All" Queries</H2>
      <P>Division answers queries like "find all students who have taken ALL courses in a given set." No direct SQL equivalent; implemented using double NOT EXISTS:</P>
      <Code lang="cpp">{`-- Find students who have enrolled in ALL courses offered by dept 'CS'
SELECT DISTINCT e.student_id
FROM Enrollment e
WHERE NOT EXISTS (
    SELECT c.course_id
    FROM Course c
    WHERE c.dept = 'CS'
    AND NOT EXISTS (
        SELECT 1 FROM Enrollment e2
        WHERE e2.student_id = e.student_id
          AND e2.course_id = c.course_id
    )
);
-- Reads as: "there is no CS course that student X has NOT taken"`}</Code>

      <QA q="Why is the Cartesian product rarely used directly, and how does the optimizer handle joins?" a="A Cartesian product of tables with m and n rows produces m*n rows — all meaningless without a join condition. In practice you always add a filter (making it a theta or equi-join). The optimizer never materializes a full Cartesian product; it uses nested loop join, hash join, or merge join algorithms that apply the join condition during row production, not after. The query planner chooses the algorithm based on table sizes and available indexes." />
      <QA q="What is the difference between a Natural Join and an Equi-Join, and when is Natural Join dangerous?" a="An equi-join specifies explicit column equality: JOIN ON R.dept_id = S.dept_id. A natural join automatically joins on ALL columns with the same name in both tables. Natural join is dangerous because if two tables accidentally share a column name that wasn't intended as a join key (e.g., both have a 'name' column for different things), the join silently filters on that column too, producing incorrect results with no error. Always use explicit join conditions in production code." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — KEYS & FUNCTIONAL DEPENDENCIES
══════════════════════════════════════════════════════ */
function SectionKeys() {
  return (
    <div>
      <Note color="warning" icon="ti-key">
        <strong>Keys</strong> enforce uniqueness and enable cross-table references. <strong>Functional Dependencies (FDs)</strong> are the mathematical foundation of normalization theory. FD closure and minimal cover let you systematically derive candidate keys and verify normal forms.
      </Note>

      <H2>Key Hierarchy</H2>
      <Table
        heads={["Key Type", "Definition", "Properties"]}
        rows={[
          ["Super Key", "Any set of attributes that uniquely identifies a tuple", "May have redundant attributes; every table has at least one (the full attribute set)"],
          ["Candidate Key", "A minimal super key — no proper subset is also a super key", "Multiple candidate keys can exist; none can shed an attribute without losing uniqueness"],
          ["Primary Key", "The candidate key chosen as the main identifier", "Exactly one per table; cannot be NULL; used as the target for FKs"],
          ["Alternate Key", "Candidate keys not chosen as primary key", "Enforced via UNIQUE constraint; still guarantee uniqueness"],
          ["Foreign Key", "Attribute(s) referencing the PK of another table", "Enforces referential integrity; can be NULL for optional relationships"],
          ["Composite Key", "A key made of two or more attributes", "Neither attribute alone provides uniqueness"],
          ["Surrogate Key", "Artificial system-generated key (auto-increment id)", "No business meaning; immune to real-world attribute changes; preferred in practice"],
        ]}
      />

      <H2>Finding Candidate Keys from FDs</H2>
      <Note color="info" icon="ti-math">
        <strong>Closure of X (written X+):</strong> Start with X+ = X. Repeatedly apply: for each FD A->B in F, if A is subset of X+, add B to X+. Stop when no change. X is a super key iff X+ = all attributes of R.
      </Note>
      <Table
        heads={["Example", "FDs Given", "Closure Computation", "Candidate Key(s)"]}
        rows={[
          ["R(A,B,C,D)", "A->B, A->C", "A+ = {A,B,C}. D never appears on any RHS. Try AD: AD+ = {A,B,C,D} = R. Is A+ = R? No. Is D+ = R? No.", "AD"],
          ["R(A,B,C,D)", "AB->CD", "AB+ = {A,B,C,D} = R. Is A+ = R? No. Is B+ = R? No. So AB is minimal.", "AB"],
          ["R(A,B,C,D)", "B->C, C->D", "B+ = {B,C,D}. AB+ = {A,B,C,D} = R. A+ = {A} (no FDs). So AB is minimal super key.", "AB"],
          ["R(A,B,C)", "A->B, B->C, C->A", "A+ = {A,B,C} = R. B+ = {A,B,C} = R. C+ = {A,B,C} = R. All three are CKs.", "A, B, C (three CKs)"],
        ]}
      />

      <H2>Armstrong's Axioms</H2>
      <Table
        heads={["Axiom", "Rule", "Formal Notation"]}
        rows={[
          ["Reflexivity", "A set of attributes determines any subset of itself (trivial FDs)", "If Y subset of X, then X -> Y"],
          ["Augmentation", "Adding the same attributes to both sides preserves the FD", "If X -> Y, then XZ -> YZ for any Z"],
          ["Transitivity", "FDs chain: X determines Y and Y determines Z implies X determines Z", "If X->Y and Y->Z, then X->Z"],
        ]}
      />
      <P>These three are <strong>sound and complete</strong> — they derive exactly all valid FDs, nothing more. Three useful derived rules:</P>
      <Table
        heads={["Derived Rule", "Statement", "Example"]}
        rows={[
          ["Union", "If X->Y and X->Z, then X->YZ", "A->B, A->C => A->BC"],
          ["Decomposition", "If X->YZ, then X->Y and X->Z", "A->BC => A->B and A->C"],
          ["Pseudo-transitivity", "If X->Y and WY->Z, then WX->Z", "A->B, CB->D => CA->D"],
        ]}
      />

      <H2>Minimal Cover (Canonical Cover)</H2>
      <P>A minimal cover <Mx>F_c</Mx> is an equivalent FD set with no redundancy. Used in 3NF synthesis algorithm.</P>
      <Note color="success" icon="ti-list-check">
        <strong>Algorithm to find minimal cover:</strong> (1) Right-side singleton: split all FDs to have exactly one attribute on the RHS. (2) Remove extraneous LHS attributes: for A->B where A is composite, check if removing any attr from A still yields the same closure. (3) Remove redundant FDs: check if each FD is derivable from the remaining FDs.
      </Note>

      <H2>Referential Integrity Violation Actions</H2>
      <Table
        heads={["Action", "ON DELETE behavior", "ON UPDATE behavior", "Typical Use Case"]}
        rows={[
          ["CASCADE", "Auto-delete child rows", "Auto-update FK in child rows", "Tightly coupled parent-child data"],
          ["SET NULL", "Set child FK to NULL", "Set child FK to NULL", "Optional relationship; child can exist without parent"],
          ["SET DEFAULT", "Set child FK to default value", "Set child FK to default", "Child must reference something; use a placeholder row"],
          ["RESTRICT", "Reject delete if child rows exist", "Reject update if FK is referenced", "Strict integrity; manual cleanup required first"],
          ["NO ACTION", "Like RESTRICT, checked at end of TX", "Same as RESTRICT", "Default in most DBs; allows deferred constraint checking"],
        ]}
      />

      <QA q="What makes a set of attributes a candidate key rather than just a super key?" a="A super key is any attribute set that uniquely identifies tuples. A candidate key is a MINIMAL super key: no proper subset of it is also a super key. For example, if {A, B} is unique AND A alone is also unique, then {A, B} is a super key but NOT a candidate key because {A} is a smaller super key. Candidate keys are the tightest possible identifiers — removing even one attribute breaks uniqueness." />
      <QA q="Can a foreign key reference a non-primary-key column? Can it be NULL?" a="Yes on both counts. A FK can reference any column (or set of columns) covered by a UNIQUE constraint, not just the PK (though the PK is the most common target). A FK can be NULL, representing an optional relationship where the referencing entity is not associated with any parent entity (e.g., an Employee.manager_id can be NULL for the CEO). NULL FK values do not violate referential integrity." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — NORMALIZATION
══════════════════════════════════════════════════════ */
function SectionNorm() {
  return (
    <div>
      <Note color="danger" icon="ti-alert-hexagon">
        <strong>Anomalies</strong> are the problems caused by poor schema design. Normalization eliminates them by ensuring every non-key attribute depends on the WHOLE key and NOTHING BUT the key.
      </Note>

      <H2>Database Anomalies</H2>
      <Table
        heads={["Anomaly", "What Happens", "Concrete Example"]}
        rows={[
          ["Update Anomaly", "Same data stored redundantly; updating one copy leaves others stale", "Prof. Smith's dept changes: must update every course row where Smith teaches, missing one causes inconsistency"],
          ["Insertion Anomaly", "Cannot insert valid data without providing unrelated required fields", "Cannot add a new department until at least one professor is assigned to it"],
          ["Deletion Anomaly", "Deleting a row destroys unintentionally important separate facts", "Deleting the last course a professor teaches removes the professor's own record entirely"],
        ]}
      />

      <H2>Step-Through: UNF to 3NF</H2>
      <NormViz />

      <H2>Functional Dependency Taxonomy</H2>
      <Table
        heads={["FD Type", "Definition", "Example", "Problem Caused"]}
        rows={[
          ["Trivial FD", "RHS is a subset of LHS", "AB -> A", "None; always valid by reflexivity"],
          ["Partial Dependency", "Non-prime attr depends on PART of a composite candidate key", "AB is CK; A->C where C is non-prime", "2NF violation: update/insert anomalies"],
          ["Transitive Dependency", "Non-prime X -> non-prime Y -> non-prime Z (X doesn't determine Z via key)", "student_id -> dept_id -> dept_name", "3NF violation"],
          ["Full FD", "Non-prime attr depends on the WHOLE candidate key; no smaller subset determines it", "AB->C, but neither A->C nor B->C", "Required for 2NF satisfaction"],
        ]}
      />

      <H2>Normal Forms Reference Card</H2>
      <Table
        heads={["Normal Form", "Requirement", "Eliminates", "Decomposition Guarantee"]}
        rows={[
          ["1NF", "All attribute values are atomic; no repeating groups or multi-valued cells", "Multi-valued cells, repeating columns", "No decomposition needed; enforce atomicity"],
          ["2NF", "1NF + No partial FDs (every non-prime attr fully depends on every candidate key)", "Partial FDs in tables with composite keys", "Separate partially-dependent attrs into new tables"],
          ["3NF", "2NF + No transitive FDs (no non-prime->non-prime->non-prime chains)", "Transitive FDs among non-prime attributes", "Lossless + dependency-preserving always achievable"],
          ["BCNF", "For every non-trivial FD X->Y, X must be a superkey", "ALL FD anomalies; no exceptions", "Lossless always; may sacrifice dependency preservation"],
          ["4NF", "BCNF + No non-trivial multi-valued dependencies", "Multi-valued dependency (MVD) anomalies", "Rare in practice; advanced schema design"],
          ["5NF / PJNF", "4NF + No non-trivial join dependencies", "Join dependency anomalies", "Mostly theoretical"],
        ]}
      />

      <Note color="warning" icon="ti-git-branch">
        <strong>3NF vs BCNF:</strong> BCNF is strictly stronger. Every BCNF schema is in 3NF but not vice versa. The key exception: in 3NF, X->Y is allowed even when X is not a superkey IF Y is a prime attribute (part of some candidate key). BCNF forbids this entirely. However, BCNF decomposition may lose dependency preservation, which 3NF always guarantees.
      </Note>

      <H2>The 3NF Exception — When It Differs from BCNF</H2>
      <P>Consider R(A, B, C) with FDs: AB-&gt;C and C-&gt;B. Both AB and AC are candidate keys.</P>
      <Table
        heads={["FD", "Is LHS a Superkey?", "Is RHS prime?", "3NF?", "BCNF?"]}
        rows={[
          ["AB -> C", "Yes (AB is CK)", "No", "OK", "OK"],
          ["C -> B", "No (C is not a superkey)", "Yes (B is in CK=AB)", "OK (prime attr exception)", "VIOLATION"],
        ]}
      />
      <P>R is in 3NF but NOT in BCNF. Decomposing to BCNF yields R1(B,C) and R2(A,C). The FD AB-&gt;C is lost — dependency preservation fails. This is the fundamental 3NF vs BCNF tradeoff.</P>

      <H2>Decomposition Properties</H2>
      <Table
        heads={["Property", "Test", "3NF?", "BCNF?"]}
        rows={[
          ["Lossless Join", "R1 INTERSECT R2 -> R1 OR R1 INTERSECT R2 -> R2 (common attrs form a superkey in one part)", "Always", "Always"],
          ["Dependency Preservation", "Every original FD is enforceable in some decomposed table without a join", "Always", "Not always"],
        ]}
      />

      <QA q="Can a relation be in 3NF but still have anomalies?" a="Yes, but only anomalies caused by overlapping candidate keys — a rare situation. When multiple candidate keys share attributes, a transitive-like dependency through a prime attribute can satisfy 3NF's definition (because the right-hand side is prime). BCNF eliminates this edge case entirely. In practice, overlapping candidate keys are uncommon, so most 3NF schemas behave anomaly-free." />
      <QA q="Why is lossless decomposition non-negotiable but dependency preservation is desirable-but-not-always-achievable?" a="Lossless decomposition is non-negotiable because if you can't reconstruct the original relation from the parts, you've permanently lost information and can't distinguish valid data from spurious tuples created by joins. Dependency preservation is desirable because it means every FD can be enforced in a single table without expensive joins. When BCNF forces you to sacrifice it, you either accept that some constraints must be checked via triggers or application code, or you stay at 3NF to retain full enforceability." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6 — SQL
══════════════════════════════════════════════════════ */
function SectionSQL() {
  return (
    <div>
      <Note color="success" icon="ti-terminal">
        SQL is <strong>declarative</strong>: you specify WHAT data you want, not HOW to retrieve it. The query optimizer builds the execution plan. SQL has four sub-languages covering schema definition, data manipulation, access control, and transaction management.
      </Note>

      <H2>SQL Sub-Languages</H2>
      <Table
        heads={["Sub-Language", "Full Name", "Commands", "Purpose"]}
        rows={[
          ["DDL", "Data Definition Language", "CREATE, ALTER, DROP, TRUNCATE, RENAME", "Define and modify schema structure"],
          ["DML", "Data Manipulation Language", "SELECT, INSERT, UPDATE, DELETE, MERGE", "Manipulate actual data in tables"],
          ["DCL", "Data Control Language", "GRANT, REVOKE", "Control user access permissions"],
          ["TCL", "Transaction Control Language", "COMMIT, ROLLBACK, SAVEPOINT, SET TRANSACTION", "Manage transaction boundaries"],
        ]}
      />

      <H2>DDL — Creating and Modifying Schema</H2>
      <Code lang="cpp">{`-- CREATE TABLE with all constraint types
CREATE TABLE Employee (
    emp_id      INT           PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    salary      DECIMAL(10,2) DEFAULT 0.00 CHECK (salary >= 0),
    dept_id     INT           REFERENCES Department(dept_id) ON DELETE SET NULL,
    email       VARCHAR(150)  UNIQUE,
    hire_date   DATE          NOT NULL DEFAULT CURRENT_DATE
);

-- ALTER: add/drop/modify columns and constraints
ALTER TABLE Employee ADD COLUMN phone VARCHAR(15);
ALTER TABLE Employee DROP COLUMN phone;
ALTER TABLE Employee ADD CONSTRAINT chk_salary CHECK (salary < 10000000);
ALTER TABLE Employee DROP CONSTRAINT chk_salary;

-- DROP vs TRUNCATE vs DELETE compared
DROP TABLE Employee;         -- removes table structure + all data permanently; non-recoverable
TRUNCATE TABLE Employee;     -- removes all data; keeps structure; DDL (no WHERE); very fast
DELETE FROM Employee;        -- removes all data; keeps structure; DML; transactional; can use WHERE`}</Code>

      <H2>SELECT Clause Order and Execution Order</H2>
      <Note color="warning" icon="ti-sort-ascending">
        <strong>Writing order vs execution order differ.</strong> You write: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT. The engine executes: FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT. Consequence: a SELECT alias cannot be used in WHERE (WHERE runs before SELECT), but CAN be used in ORDER BY.
      </Note>
      <Code lang="cpp">{`-- Full SELECT syntax in writing order
SELECT   [DISTINCT] columns / expressions / aggregates      -- 6
FROM     table [JOIN other ON condition]                     -- 1
WHERE    row-level filter (no aggregates here)              -- 2
GROUP BY grouping columns                                    -- 3
HAVING   group-level filter (aggregates allowed here)       -- 4
ORDER BY column [ASC | DESC]                                 -- 7
LIMIT    n [OFFSET m];                                       -- 8

-- Complete example: top-5 depts by avg salary, excluding depts with < 3 employees
SELECT   d.dept_name, AVG(e.salary) AS avg_sal, COUNT(*) AS emp_count
FROM     Employee e
JOIN     Department d ON e.dept_id = d.dept_id
WHERE    e.salary > 0
GROUP BY d.dept_name
HAVING   COUNT(*) >= 3
ORDER BY avg_sal DESC
LIMIT    5;`}</Code>

      <H2>Aggregate Functions and NULL Behavior</H2>
      <Table
        heads={["Function", "Description", "NULL Behavior"]}
        rows={[
          ["COUNT(*)", "Count all rows including NULLs", "Counts NULLs (counts rows, not values)"],
          ["COUNT(col)", "Count non-NULL values in a column", "Ignores NULLs entirely"],
          ["SUM(col)", "Sum of non-NULL values", "Ignores NULLs; returns NULL if ALL values are NULL"],
          ["AVG(col)", "Average of non-NULL values", "AVG = SUM/COUNT(col), NOT SUM/COUNT(*); ignores NULLs"],
          ["MAX(col)", "Maximum non-NULL value", "Ignores NULLs"],
          ["MIN(col)", "Minimum non-NULL value", "Ignores NULLs"],
        ]}
      />

      <H2>Subqueries</H2>
      <Code lang="cpp">{`-- Scalar subquery: returns exactly one value
SELECT name FROM Employee
WHERE salary = (SELECT MAX(salary) FROM Employee);

-- Correlated subquery: references outer query; re-executed per outer row (slow)
SELECT name, salary FROM Employee e1
WHERE salary > (SELECT AVG(salary) FROM Employee e2 WHERE e2.dept_id = e1.dept_id);

-- Derived table (inline view): subquery in FROM clause
SELECT dept_name, avg_sal
FROM (
    SELECT dept_id, AVG(salary) AS avg_sal FROM Employee GROUP BY dept_id
) AS DeptAvg
JOIN Department d ON d.dept_id = DeptAvg.dept_id;

-- EXISTS: stops at first match; faster than IN for large subquery results
SELECT * FROM Department d
WHERE EXISTS (SELECT 1 FROM Employee e WHERE e.dept_id = d.dept_id);

-- NOT EXISTS: find departments with no employees
SELECT * FROM Department d
WHERE NOT EXISTS (SELECT 1 FROM Employee e WHERE e.dept_id = d.dept_id);

-- IN vs EXISTS: functionally equivalent but EXISTS is better for large sets
-- IN evaluates entire subquery; EXISTS short-circuits on first match`}</Code>

      <H2>Window Functions</H2>
      <P>Window functions compute values over a set of rows related to the current row WITHOUT collapsing them (unlike GROUP BY). Critical for ranking, running totals, and within-group comparisons.</P>
      <Code lang="cpp">{`-- Syntax: function() OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE ...)
SELECT
    emp_id, name, salary, dept_id,
    RANK()         OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank,
    DENSE_RANK()   OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dense_rank,
    ROW_NUMBER()   OVER (PARTITION BY dept_id ORDER BY salary DESC) AS row_num,
    SUM(salary)    OVER (PARTITION BY dept_id)                       AS dept_total,
    LAG(salary,1)  OVER (PARTITION BY dept_id ORDER BY salary)      AS prev_salary,
    LEAD(salary,1) OVER (PARTITION BY dept_id ORDER BY salary)      AS next_salary,
    SUM(salary)    OVER (ORDER BY hire_date ROWS UNBOUNDED PRECEDING) AS running_total
FROM Employee;

-- RANK vs DENSE_RANK vs ROW_NUMBER on salaries [100, 100, 90]:
-- RANK:       1, 1, 3   -- skips 2 (no 2nd place)
-- DENSE_RANK: 1, 1, 2   -- no skipping
-- ROW_NUMBER: 1, 2, 3   -- always unique; tie-breaking arbitrary`}</Code>

      <H2>CTEs and Recursive Queries</H2>
      <Code lang="cpp">{`-- CTE: named temporary result reusable within one query
WITH DeptStats AS (
    SELECT dept_id, AVG(salary) AS avg_sal, COUNT(*) AS cnt
    FROM Employee GROUP BY dept_id
)
SELECT e.name, e.salary, ds.avg_sal
FROM Employee e
JOIN DeptStats ds ON e.dept_id = ds.dept_id
WHERE e.salary > ds.avg_sal;

-- Recursive CTE: traverse employee hierarchy
WITH RECURSIVE Hierarchy AS (
    SELECT emp_id, name, manager_id, 0 AS level    -- anchor member
    FROM Employee WHERE manager_id IS NULL
    UNION ALL
    SELECT e.emp_id, e.name, e.manager_id, h.level + 1  -- recursive member
    FROM Employee e
    JOIN Hierarchy h ON e.manager_id = h.emp_id
)
SELECT * FROM Hierarchy ORDER BY level, name;`}</Code>

      <H2>Views and Materialized Views</H2>
      <Table
        heads={["Concept", "Data Stored?", "When Updated?", "Use Case"]}
        rows={[
          ["View", "No — virtual; SELECT stored only", "Every access re-executes the query", "Simplify complex queries; restrict column access"],
          ["Materialized View", "Yes — results physically stored", "On REFRESH (manual or scheduled)", "Expensive aggregations; analytics dashboards"],
          ["Updatable View", "No", "DML flows through to base table", "Requires 1:1 row mapping; no GROUP BY/DISTINCT/JOIN"],
          ["WITH CHECK OPTION", "No", "Enforces view's WHERE on INSERT/UPDATE", "Prevents inserting rows invisible to the view"],
        ]}
      />

      <H2>Indexes from SQL</H2>
      <Code lang="cpp">{`CREATE INDEX idx_sal ON Employee(salary);            -- B-tree; good for range queries
CREATE UNIQUE INDEX idx_email ON Employee(email);   -- also enforces uniqueness
CREATE INDEX idx_comp ON Employee(dept_id, salary); -- composite; leftmost-prefix rule

-- Composite index (dept_id, salary) helps:
-- WHERE dept_id = 5                        YES (leftmost prefix)
-- WHERE dept_id = 5 AND salary > 50000     YES
-- WHERE salary > 50000                     NO  (not the leftmost column)
-- ORDER BY dept_id, salary                 YES (can satisfy sort without filesort)`}</Code>

      <QA q="Why can't you use a SELECT column alias in the WHERE clause?" a="SQL clauses execute in a fixed logical order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. WHERE runs BEFORE SELECT, so aliases defined in the SELECT list don't exist when WHERE is evaluated. Solution: either repeat the expression in WHERE, or wrap in a subquery/CTE where the alias becomes a real column name in an outer query." />
      <QA q="What is the difference between WHERE and HAVING, and when must you use one over the other?" a="WHERE filters individual rows BEFORE grouping — it cannot reference aggregates because aggregation hasn't happened yet. HAVING filters groups AFTER GROUP BY — it CAN reference aggregates. Rule: if the filter is on a raw column value, use WHERE (it's more efficient, reducing rows before grouping). If the filter is on an aggregate (COUNT, SUM, AVG), you MUST use HAVING. Using HAVING to filter non-aggregates is syntactically legal but wasteful." />
      <QA q="What is the difference between RANK, DENSE_RANK, and ROW_NUMBER?" a="All three assign ordinal positions within a window partition. ROW_NUMBER always generates unique consecutive integers regardless of ties (tie-breaking is non-deterministic without a fully deterministic ORDER BY). RANK assigns the same rank to tied rows but skips subsequent positions (1, 1, 3 — no 2nd place). DENSE_RANK assigns the same rank to tied rows but never skips positions (1, 1, 2). Use RANK to indicate 'no one earned 2nd place.' Use DENSE_RANK for contiguous ranks. Use ROW_NUMBER for pagination or when uniqueness is required." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 7 — INDEXING & STORAGE
══════════════════════════════════════════════════════ */
function SectionIndexing() {
  return (
    <div>
      <Note color="info" icon="ti-search">
        An <strong>index</strong> is an auxiliary data structure enabling fast lookup without full table scans. Every index trades write overhead and extra storage for faster reads. Choosing which columns to index is one of the highest-impact performance decisions in database tuning.
      </Note>

      <H2>Clustered vs Non-Clustered Index</H2>
      <Table
        heads={["Property", "Clustered Index", "Non-Clustered Index"]}
        rows={[
          ["Data ordering", "Physical rows stored on disk in index key order", "Data in heap order; index is a separate structure with row pointers"],
          ["Count per table", "At most ONE (data can only be sorted one way on disk)", "Many (up to ~999 in most systems)"],
          ["Range query speed", "Fast: rows are contiguous on disk; few I/Os", "Slower: may require random I/O for each matching row"],
          ["Write overhead", "High: INSERTs may cause page splits and physical reorganization", "Lower: only the index structure is updated"],
          ["InnoDB (MySQL)", "Primary key is always the clustered index", "Secondary indexes store the PK value, not a direct row pointer; requires two B-tree lookups"],
          ["Best use case", "Primary key; columns used in range scans (date, sequential id)", "Columns in WHERE/JOIN/ORDER BY that are not the PK"],
        ]}
      />

      <H2>Dense vs Sparse Index</H2>
      <Grid cols={2}>
        <Card title="Dense Index" color="info">
          An index entry exists for EVERY data record. Enables direct lookup with no sequential scan after finding the entry. Uses more space. Used for non-clustered indexes (since data is unsorted, you need an entry per record to locate it).
        </Card>
        <Card title="Sparse Index" color="success">
          Index entries exist only for SOME records (typically one per disk block). Smaller size, but requires a short sequential scan within the target block. Only correct for clustered (physically sorted) files — if data isn't sorted, you can't scan forward linearly.
        </Card>
      </Grid>

      <H2>B-Tree vs B+ Tree</H2>
      <Table
        heads={["Property", "B-Tree", "B+ Tree"]}
        rows={[
          ["Data location", "Data pointers in both internal AND leaf nodes", "Data pointers ONLY in leaf nodes; internals hold routing keys only"],
          ["Leaf linking", "No sibling links between leaves", "All leaves linked in a sorted doubly-linked list"],
          ["Range queries", "Inefficient: may need to traverse up and down the tree", "Efficient: find start leaf, then scan the linked list"],
          ["Node capacity", "Fewer keys per node (must store data pointers in internals)", "More keys per node: shorter tree, fewer I/Os per lookup"],
          ["Deletion", "Complex: data may be in an internal node", "Simpler: data always in a leaf"],
          ["Used by", "Some file systems (e.g., old HFS+)", "All major RDBMS: MySQL InnoDB, PostgreSQL, Oracle, SQL Server"],
        ]}
      />

      <H2>B+ Tree Insertion Step-Through</H2>
      <BPlusViz />
      <Note color="success" icon="ti-math">
        <strong>Height formula:</strong> For n records and order b (max children per node), height = ceil(log_b(n)). With b=100 and n=1,000,000, height is at most 3. Three disk I/Os to find any record, regardless of table size.
      </Note>

      <H2>Hash-Based Indexing</H2>
      <Table
        heads={["Property", "Static Hashing", "Extendible Hashing", "Linear Hashing"]}
        rows={[
          ["Bucket count", "Fixed at creation", "Doubles (directory grows) when needed", "Grows one bucket at a time"],
          ["Point query", "O(1) average", "O(1) average", "O(1) average"],
          ["Range query", "Terrible: no ordering preserved", "Terrible", "Terrible"],
          ["Overflow handling", "Overflow chains: degrade over time", "Split overflowed bucket; double directory", "Split the 'next' bucket in linear order"],
          ["Use case", "Equality lookups ONLY", "Same", "Same"],
        ]}
      />

      <H2>Index Selection Guidelines</H2>
      <Table
        heads={["Query Pattern", "Index Useful?", "Recommended Index"]}
        rows={[
          ["WHERE id = 5", "Yes", "Any index on id (hash fastest for equality)"],
          ["WHERE salary BETWEEN 50000 AND 80000", "Yes", "B+ tree (range scan)"],
          ["WHERE last_name LIKE 'Sm%'", "Yes", "B+ tree (prefix match works)"],
          ["WHERE last_name LIKE '%ith'", "No", "Full scan; leading wildcard defeats B-tree traversal"],
          ["WHERE UPPER(name) = 'ALICE'", "No (without func index)", "Create function-based index on UPPER(name)"],
          ["ORDER BY col (no WHERE filter)", "Yes, if clustered", "Avoids a filesort step entirely"],
          ["JOIN a.id = b.fk_id", "Yes, on fk_id in b", "Index the FK column on the larger table"],
          ["Low-cardinality col (e.g., boolean)", "Usually no", "Bitmap index in Oracle/PostgreSQL; B-tree not selective enough"],
        ]}
      />

      <QA q="Why does InnoDB cluster data on the primary key, and what are the consequences of not defining one?" a="InnoDB stores all rows in a B+ tree ordered by PK, so PK range scans are sequential disk reads. Secondary indexes store the PK value as their row pointer, requiring two B-tree traversals (double dip). If you don't define a PK, InnoDB looks for a NOT NULL UNIQUE column to use as the clustered index. If none exists, it creates a hidden 6-byte row_id. Consequence: always define an explicit PK. Also, a very wide PK makes all secondary indexes larger (they each store a copy of the PK value)." />
      <QA q="What is a covering index and why is it faster?" a="A covering index contains every column the query needs (in SELECT, WHERE, and ORDER BY). The query engine never touches the actual data rows — it satisfies the entire query from the index structure alone, avoiding the double-dip. For example, for query SELECT name, salary FROM Employee WHERE dept_id = 5, an index on (dept_id, name, salary) is covering. The wider the index, the more queries it covers, but the higher the write overhead." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 8 — TRANSACTIONS
══════════════════════════════════════════════════════ */
function SectionTransactions() {
  return (
    <div>
      <Note color="purple" icon="ti-arrows-exchange">
        A <strong>transaction</strong> is a sequence of operations treated as a single logical unit of work. Either ALL operations succeed (commit) or NONE take effect (rollback). Transactions protect the database from partial failures and concurrent interference.
      </Note>

      <H2>ACID Properties</H2>
      <Table
        heads={["Property", "Definition", "Enforced By", "Broken Without It"]}
        rows={[
          ["Atomicity", "All operations succeed or all are rolled back; no partial execution", "Undo logs, rollback mechanism", "Money deducted but not credited"],
          ["Consistency", "Transaction takes DB from one valid state to another; all constraints hold", "Constraints, triggers, application logic", "Referential integrity broken, CHECK violated"],
          ["Isolation", "Concurrent transactions behave as if they run sequentially; intermediate states invisible to others", "Locking protocols, MVCC, isolation levels", "Dirty reads, lost updates, phantom reads"],
          ["Durability", "Once committed, changes survive system crashes and power failures", "Write-Ahead Logging (WAL), REDO logs, fsync", "Committed data lost after crash"],
        ]}
      />

      <H2>Transaction States</H2>
      <Table
        heads={["State", "Description", "Transitions To"]}
        rows={[
          ["Active", "Transaction is currently executing operations", "Partially Committed, Failed"],
          ["Partially Committed", "Final operation executed; changes not yet persisted to disk", "Committed (if flush succeeds), Failed (if flush fails)"],
          ["Committed", "All changes permanently written to stable storage", "Terminal — no further transitions"],
          ["Failed", "Normal execution cannot continue; error or rollback requested", "Aborted"],
          ["Aborted", "Rolled back; DB restored to pre-transaction state", "Restarted (new TX) or Killed"],
        ]}
      />

      <H2>Schedules and Serializability</H2>
      <P>A <strong>schedule</strong> is the interleaved ordering of operations from multiple concurrent transactions. A schedule is <strong>serializable</strong> if its outcome is identical to some serial (one-at-a-time) execution of those transactions.</P>
      <Table
        heads={["Schedule Type", "Definition", "Relationship"]}
        rows={[
          ["Serial", "Transactions execute one after another with no interleaving", "The baseline correctness standard"],
          ["Serializable", "Outcome equivalent to some serial schedule", "Superset of serial; what we aim for in concurrent execution"],
          ["Conflict Serializable", "Can be transformed to a serial schedule by swapping non-conflicting ops", "Subset of serializable; efficiently testable via precedence graph"],
          ["View Serializable", "Initial reads, reads-from, and final writes match some serial schedule", "Superset of conflict serializable; NP-complete to test"],
        ]}
      />

      <H2>Conflict Operations</H2>
      <Note color="danger" icon="ti-git-compare">
        Two operations <strong>conflict</strong> if ALL three hold: (1) they belong to <strong>different transactions</strong>, (2) they access the <strong>same data item</strong>, (3) <strong>at least one is a WRITE</strong>. The three conflicting pairs: Read-Write, Write-Read, Write-Write. Read-Read is NEVER a conflict.
      </Note>
      <Table
        heads={["Operation Pair", "Conflict?", "Why"]}
        rows={[
          ["T1:R(A), T2:R(A)", "No", "Two readers never interfere; swapping them changes nothing"],
          ["T1:R(A), T2:W(A)", "Yes", "T1 may read stale or updated value depending on ordering"],
          ["T1:W(A), T2:R(A)", "Yes", "T2 reads T1's written value or the original depending on order"],
          ["T1:W(A), T2:W(A)", "Yes", "One write overwrites the other; order determines final value"],
        ]}
      />

      <H2>Precedence Graph</H2>
      <P>Build a directed graph: one node per transaction. Add edge Ti -&gt; Tj if Ti has an operation that conflicts with a later operation of Tj in the schedule. A <strong>cycle</strong> means NOT conflict-serializable.</P>
      <PrecGraphViz />

      <H2>Recoverability Hierarchy</H2>
      <Table
        heads={["Class", "Definition", "Example"]}
        rows={[
          ["Irrecoverable", "T2 reads T1's uncommitted write and commits before T1. If T1 aborts, T2 has permanently committed dirty data — cannot undo.", "T1:W(A), T2:R(A), T2:COMMIT, T1:ABORT -- irrecoverable"],
          ["Recoverable", "T2 reads T1's uncommitted write (dirty read), but T2 does NOT commit before T1 commits or aborts.", "T1:W(A), T2:R(A), T1:COMMIT, T2:COMMIT -- recoverable"],
          ["Cascadeless (ACA)", "No dirty reads: T2 can only read data written by already-committed transactions. Avoids cascading rollbacks.", "T1:W(A), T1:COMMIT, T2:R(A) -- ACA"],
          ["Strict", "No dirty reads AND no dirty writes: can't read or overwrite uncommitted data. Simplest undo (just overwrite with old value).", "Only read/write after source TX commits -- strictest"],
        ]}
      />
      <Note color="info" icon="ti-filter">
        Containment (most to least restrictive): Strict subset of Cascadeless subset of Recoverable. Every strict schedule is cascadeless; every cascadeless schedule is recoverable.
      </Note>

      <QA q="What is the difference between conflict serializability and view serializability?" a="Conflict serializability is tested via the precedence graph (cycle detection) — efficient O(n^2) test. View serializability requires that initial reads, reads-from relationships, and final writes all match some serial schedule. Every conflict-serializable schedule is view-serializable, but not vice versa. Blind writes (T writes X without reading it first) can make a schedule view-serializable but not conflict-serializable. Testing view serializability is NP-complete, so it's not used practically." />
      <QA q="Why is an irrecoverable schedule catastrophic and how do databases prevent it?" a="Once T2 commits after reading T1's uncommitted value, and T1 later aborts, the database has permanently committed data derived from a transaction that never happened. There is no way to undo a committed transaction (committed = permanent). This violates T1's atomicity and corrupts the database. Databases prevent this by enforcing recoverability as a minimum: at any practical isolation level, a transaction that performed a dirty read cannot commit until its source transaction commits or aborts first." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 9 — CONCURRENCY CONTROL
══════════════════════════════════════════════════════ */
function SectionConcurrency() {
  return (
    <div>
      <Note color="warning" icon="ti-lock">
        <strong>Concurrency control</strong> prevents transactions from interfering while maximizing parallelism. The major protocols: Two-Phase Locking (2PL) for pessimistic control, Timestamp Ordering for lock-free ordering, and MVCC for high-read-concurrency systems.
      </Note>

      <H2>Read Phenomena (Isolation Problems)</H2>
      <Table
        heads={["Phenomenon", "Description", "Example"]}
        rows={[
          ["Dirty Read", "T2 reads a value written by uncommitted T1. If T1 aborts, T2 used invalid data.", "T1: UPDATE bal=500 (no commit); T2: SELECT bal (reads 500); T1: ROLLBACK"],
          ["Non-Repeatable Read", "T2 reads the same row twice and gets different values because T1 committed an update between T2's reads.", "T2: SELECT sal=50k; T1: UPDATE sal=60k; COMMIT; T2: SELECT sal=60k (different!)"],
          ["Phantom Read", "T2 re-runs a range query and gets a different set of rows because T1 inserted/deleted matching rows and committed.", "T2: SELECT WHERE age>30 => 3 rows; T1: INSERT age=35; COMMIT; T2: SELECT WHERE age>30 => 4 rows"],
          ["Lost Update", "T1 and T2 both read value x, both update based on it, and T2's write overwrites T1's update.", "T1: read x=10, T2: read x=10; T1: x=11; T2: x=12 -- T1's update lost"],
        ]}
      />

      <H2>SQL Isolation Levels</H2>
      <Table
        heads={["Isolation Level", "Dirty Read", "Non-Rep. Read", "Phantom Read", "Common Default"]}
        rows={[
          ["READ UNCOMMITTED", "Possible", "Possible", "Possible", "Highest concurrency; almost never used"],
          ["READ COMMITTED", "Prevented", "Possible", "Possible", "Oracle, SQL Server, PostgreSQL default"],
          ["REPEATABLE READ", "Prevented", "Prevented", "Possible (SQL std)", "MySQL InnoDB default (also prevents phantoms via gap locks)"],
          ["SERIALIZABLE", "Prevented", "Prevented", "Prevented", "Highest safety; lowest concurrency; uses range locks or SSI"],
        ]}
      />

      <H2>Two-Phase Locking (2PL)</H2>
      <LockViz />
      <Table
        heads={["2PL Variant", "Additional Rule", "Guarantees"]}
        rows={[
          ["Basic 2PL", "Growing phase: acquire locks only. Shrinking phase: release locks only. Never acquire after first release.", "Conflict serializability"],
          ["Strict 2PL", "Hold ALL exclusive (write) locks until COMMIT or ABORT.", "Conflict serializability + Strict schedules (no cascading rollbacks)"],
          ["Rigorous 2PL", "Hold ALL locks (shared and exclusive) until COMMIT or ABORT.", "Strictest guarantees; used in practice in most commercial DBs"],
          ["Conservative 2PL", "Pre-declare and acquire ALL locks before transaction begins.", "Deadlock-free; but hard to predeclare all data items"],
        ]}
      />

      <H2>Deadlock</H2>
      <P>Deadlock occurs when each transaction in a set waits for another in the set to release a lock. No transaction can proceed without the others releasing first.</P>
      <Grid cols={2}>
        <Card title="Deadlock Prevention" color="success">
          Use timestamps. Wait-Die: older waits, younger aborts. Wound-Wait: older aborts younger, younger waits for older. Both prevent cycles by ensuring transactions never wait in a cycle.
        </Card>
        <Card title="Deadlock Detection and Recovery" color="warning">
          Build a wait-for graph periodically. A cycle = deadlock. Choose a victim (least work done, fewest locks, youngest), roll it back, and restart it.
        </Card>
      </Grid>
      <Table
        heads={["Strategy", "Ti older requests lock held by Tj younger", "Ti younger requests lock held by Tj older"]}
        rows={[
          ["Wait-Die", "Ti (older) WAITS", "Ti (younger) DIES (rolls back)"],
          ["Wound-Wait", "Ti (older) WOUNDS Tj (Tj aborts)", "Ti (younger) WAITS"],
          ["Who is rolled back", "Always the younger transaction (the requester in Die, the holder in Wound)", "Same principle: younger loses"],
        ]}
      />

      <H2>Timestamp-Based Concurrency Control</H2>
      <P>No locks. Each transaction gets a timestamp TS(Ti) at start. Each data item X maintains read_TS(X) and write_TS(X).</P>
      <Table
        heads={["Operation", "Condition", "Action"]}
        rows={[
          ["Ti reads X", "TS(Ti) < write_TS(X)", "Ti is too late; a younger TX already wrote. ABORT and restart Ti with new timestamp."],
          ["Ti reads X", "TS(Ti) >= write_TS(X)", "OK. Set read_TS(X) = max(read_TS(X), TS(Ti))."],
          ["Ti writes X", "TS(Ti) < read_TS(X)", "A younger TX already read the old value; this write would invalidate it. ABORT Ti."],
          ["Ti writes X", "TS(Ti) < write_TS(X)", "Thomas Write Rule: younger TX already wrote a newer value. Skip this write (don't abort)."],
          ["Ti writes X", "TS(Ti) >= read_TS(X) and >= write_TS(X)", "OK. Write X; set write_TS(X) = TS(Ti)."],
        ]}
      />

      <H2>MVCC (Multiversion Concurrency Control)</H2>
      <P>MVCC keeps multiple timestamped versions of each data item. Readers access an old version matching their snapshot without blocking on writers. Used in PostgreSQL, Oracle, MySQL InnoDB.</P>
      <Table
        heads={["Property", "Behavior"]}
        rows={[
          ["Reads never block", "Readers access a consistent snapshot from their transaction start time"],
          ["Writers don't block readers", "A write creates a new version; readers still see the older version"],
          ["Readers don't block writers", "Writers create new versions regardless of concurrent readers"],
          ["Writers may block writers", "Two concurrent writers to the same row still conflict; one waits or aborts"],
          ["Snapshot Isolation", "Each transaction sees a consistent DB snapshot from its start; no dirty reads"],
          ["Garbage collection", "Old versions no longer visible to any active transaction are periodically cleaned (VACUUM in PostgreSQL)"],
        ]}
      />

      <QA q="Why does basic 2PL guarantee conflict serializability?" a="The lock point of a transaction (where it has acquired all its locks before releasing any) acts as the serialization point. Because no transaction can acquire a new lock after releasing one, the lock points impose a strict linear order on transactions. Any 2PL schedule can be shown to produce a cycle-free precedence graph: the edge ordering follows lock-point ordering, giving a valid topological sort equivalent to a serial schedule." />
      <QA q="Why does the younger transaction always get rolled back in both Wait-Die and Wound-Wait?" a="In Wait-Die, if Ti (younger) requests a lock held by Tj (older), Ti dies. In Wound-Wait, if Ti (older) requests a lock held by Tj (younger), Tj is wounded (aborted). In both cases, the younger transaction is rolled back. This is intentional: younger transactions have done less work, so rollback is cheaper. It also prevents starvation of older transactions: they always eventually complete, while the younger transaction restarts with a new timestamp, eventually becoming old enough to survive." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 10 — RECOVERY
══════════════════════════════════════════════════════ */
function SectionRecovery() {
  return (
    <div>
      <Note color="danger" icon="ti-restore">
        <strong>Recovery</strong> enforces Durability and Atomicity across failures. Committed transactions must survive crashes; incomplete transactions must have zero effect. The foundation is <strong>Write-Ahead Logging (WAL)</strong>.
      </Note>

      <H2>Types of Failures</H2>
      <Table
        heads={["Failure Type", "What is Lost", "Recovery Mechanism"]}
        rows={[
          ["Transaction Failure", "One transaction fails (logic error, deadlock)", "ROLLBACK: undo that transaction's changes using the undo log"],
          ["System Crash", "Volatile memory (buffer pool) lost; disk intact", "Log-based recovery: REDO committed TXs, UNDO uncommitted TXs"],
          ["Media / Disk Failure", "Data on disk corrupted or destroyed", "Restore from archive backup, then replay logs since backup"],
          ["Network Partition", "Distributed nodes disconnected", "2PC or Paxos/Raft distributed consensus protocols"],
        ]}
      />

      <H2>Write-Ahead Logging (WAL)</H2>
      <Note color="warning" icon="ti-pencil">
        <strong>WAL Rule (STEAL + NO-FORCE):</strong> The log record for an operation must reach stable storage BEFORE the modified data page can be written to disk (enables UNDO). All log records for a transaction must be flushed before the COMMIT record is written (enables REDO). This gives maximum buffer flexibility while guaranteeing recoverability.
      </Note>

      <H2>STEAL / NO-STEAL and FORCE / NO-FORCE</H2>
      <Table
        heads={["Policy", "Definition", "Recovery Needed"]}
        rows={[
          ["STEAL", "Dirty (uncommitted) pages CAN be written to disk before commit", "Needs UNDO: disk may have dirty data if TX aborts"],
          ["NO-STEAL", "Dirty pages CANNOT be written to disk before commit", "No UNDO needed; but buffer pool may fill up and stall"],
          ["FORCE", "All dirty pages MUST be flushed to disk at commit", "No REDO needed; but slow commits (many synchronous writes)"],
          ["NO-FORCE", "Dirty pages need NOT be flushed at commit (lazy write)", "Needs REDO: crash may lose committed pages still in buffer"],
        ]}
      />
      <Note color="success" icon="ti-checkup-list">
        Production databases use <strong>STEAL + NO-FORCE</strong>: buffer management is flexible (dirty pages evictable), commits are fast (no forced flush). Both UNDO (for aborts) and REDO (for crashes) are needed. This is why WAL must support both.
      </Note>

      <H2>Log Record Types</H2>
      <Table
        heads={["Record", "Key Fields", "Purpose"]}
        rows={[
          ["Update", "TxID, LSN, prevLSN, item, old_value, new_value", "Enables both UNDO (use old_value) and REDO (use new_value)"],
          ["Commit", "TxID, LSN", "Marks TX as committed; all prior log records must already be on disk"],
          ["Abort", "TxID, LSN", "Marks TX as being rolled back"],
          ["CLR (Compensation Log Record)", "TxID, LSN, undoNextLSN", "Written during UNDO; describes what was undone; CLRs are never undone themselves"],
          ["Checkpoint", "active_txns, dirty_pages", "Snapshot of current state; reduces how far back recovery must scan"],
          ["End", "TxID, LSN", "TX fully complete (all undo CLRs written for aborted TXs)"],
        ]}
      />

      <H2>ARIES Recovery Algorithm</H2>
      <P>ARIES (Algorithm for Recovery and Isolation Exploiting Semantics) is the standard used in IBM DB2, SQL Server, PostgreSQL, and others. Three phases:</P>
      <Table
        heads={["Phase", "Direction", "Purpose", "Output"]}
        rows={[
          ["Analysis", "Forward from last checkpoint", "Identify which TXs were active/committed at crash; which pages were dirty in the buffer pool", "Winner set (committed), Loser set (active/uncommitted), Dirty Page Table"],
          ["REDO", "Forward from earliest dirty page LSN", "Replay ALL logged ops (both committed and uncommitted) to restore DB to exact crash state", "Buffer pool state = exactly as it was at crash moment"],
          ["UNDO", "Backward from end of log", "Roll back all loser (uncommitted) TXs using CLRs; only committed TXs' effects remain", "Final consistent DB state"],
        ]}
      />
      <Note color="info" icon="ti-refresh">
        <strong>Why redo uncommitted work in the REDO phase?</strong> The UNDO phase writes CLRs that themselves need to be redoable (in case of crash during recovery). By redoing everything first, UNDO can safely proceed with crash resilience: if a crash happens mid-UNDO, the REDO phase on restart will re-apply all CLRs, and UNDO picks up exactly where it left off.
      </Note>

      <H2>Two-Phase Commit (2PC) for Distributed Transactions</H2>
      <Table
        heads={["Phase", "Coordinator Action", "Participant Response"]}
        rows={[
          ["Phase 1: Prepare", "Send PREPARE to all participants; wait for votes", "Flush own log; respond VOTE-COMMIT or VOTE-ABORT"],
          ["Phase 2: Commit/Abort", "If all VOTE-COMMIT: send COMMIT. If any VOTE-ABORT: send ABORT.", "On COMMIT: apply and release locks. On ABORT: undo and release locks."],
          ["Coordinator crash after PREPARE", "Participants that voted COMMIT are stuck — cannot commit (no COMMIT received), cannot abort (promised to commit)", "Must hold all locks and wait; coordinator must recover and re-send decision"],
        ]}
      />
      <Note color="danger" icon="ti-alert-triangle">
        <strong>2PC's blocking problem:</strong> if the coordinator crashes after receiving all votes but before sending the decision, participants are in a blocking state — holding locks indefinitely. This is why distributed systems upgrade to 3PC (non-blocking under certain failure models) or consensus protocols like Paxos and Raft.
      </Note>

      <QA q="Why does ARIES redo even uncommitted transactions in the REDO phase, only to undo them in the UNDO phase?" a="The REDO phase restores the DB to its exact crash-time state, including dirty (uncommitted) pages that happened to be in the buffer. This is necessary because the UNDO phase writes CLRs that themselves need to survive further crashes. Redoing everything first makes UNDO idempotent and crash-resumable. If a second crash occurs during recovery, REDO on restart will re-apply all CLRs written so far, and UNDO resumes where it left off. Without this, multi-crash recovery would be incorrect." />
      <QA q="What happens in a NO-STEAL / FORCE system, and why don't production databases use it?" a="In NO-STEAL/FORCE: dirty pages are never written to disk before commit (NO-STEAL), and all dirty pages are forced to disk at commit (FORCE). This means: no UNDO needed (no uncommitted data ever on disk), and no REDO needed (committed data always on disk). Recovery is trivial. However, NO-STEAL can fill the buffer pool with unflushable dirty pages, causing stalls. FORCE means every commit does many synchronous disk writes — extremely expensive at high transaction rates. STEAL+NO-FORCE with WAL is the universal production choice: maximum buffer flexibility and fast commits, at the cost of a more complex recovery algorithm." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 11 — STORED PROGRAMS & TRIGGERS
══════════════════════════════════════════════════════ */
function SectionStoredPrograms() {
  return (
    <div>
      <Note color="info" icon="ti-code">
        <strong>Stored programs</strong> — procedures, functions, triggers, and events — move business logic into the database itself. They reduce network round-trips, enforce data rules centrally, and can dramatically simplify application code. Understanding their semantics is a common interview and OA topic.
      </Note>

      <H2>Stored Procedures vs Functions</H2>
      <Table
        heads={["Property", "Stored Procedure", "Stored Function"]}
        rows={[
          ["Return value", "Zero or more result sets; uses OUT/INOUT parameters", "Always returns exactly one value via RETURN"],
          ["Called with", "CALL proc_name(args)", "Used in SQL expressions: SELECT func_name(args)"],
          ["DML inside", "Can contain INSERT/UPDATE/DELETE/COMMIT/ROLLBACK", "Usually SELECT only; DML restricted in most DBs"],
          ["Use in SELECT", "No", "Yes — can be used in SELECT, WHERE, JOIN"],
          ["Transaction control", "Can manage transactions (COMMIT/ROLLBACK)", "Generally cannot"],
          ["Use case", "Complex multi-step workflows, batch processing", "Reusable calculations: tax, discount, formatting"],
        ]}
      />

      <Code lang="cpp">{`-- Stored Procedure: give all employees in a dept a raise
DELIMITER $$
CREATE PROCEDURE give_raise(IN dept_id_param INT, IN pct DECIMAL(5,2))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    START TRANSACTION;
    UPDATE Employee
    SET salary = salary * (1 + pct/100)
    WHERE dept_id = dept_id_param;
    COMMIT;
END$$
DELIMITER ;

CALL give_raise(3, 10.0);   -- give dept 3 a 10% raise

-- Stored Function: compute years of service
CREATE FUNCTION years_of_service(hire_date DATE) RETURNS INT DETERMINISTIC
RETURN TIMESTAMPDIFF(YEAR, hire_date, CURDATE());

-- Use it like a column
SELECT name, years_of_service(hire_date) AS tenure FROM Employee;`}</Code>

      <H2>Triggers</H2>
      <P>A trigger is a stored program that fires automatically when a specified DML event (INSERT, UPDATE, DELETE) occurs on a table.</P>
      <Table
        heads={["Property", "Options"]}
        rows={[
          ["Timing", "BEFORE (fires before the DML operation executes) or AFTER (fires after)"],
          ["Event", "INSERT, UPDATE, DELETE — one event per trigger"],
          ["Row vs Statement", "FOR EACH ROW (row-level trigger) or FOR EACH STATEMENT (statement-level; less common)"],
          ["Access to data", "OLD.column = value before change; NEW.column = value being written"],
          ["INSTEAD OF", "Supported on views in some DBs (Oracle, PostgreSQL) to redirect DML on non-updatable views"],
          ["Cascade risk", "Triggers can fire other triggers (cascading). Most DBs limit cascade depth."],
        ]}
      />
      <Code lang="cpp">{`-- BEFORE INSERT: auto-set created_at, validate salary
CREATE TRIGGER trg_before_insert_employee
BEFORE INSERT ON Employee FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
    IF NEW.salary < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Salary cannot be negative';
    END IF;
END;

-- AFTER UPDATE: audit log for salary changes
CREATE TRIGGER trg_after_update_salary
AFTER UPDATE ON Employee FOR EACH ROW
BEGIN
    IF OLD.salary != NEW.salary THEN
        INSERT INTO SalaryAudit(emp_id, old_sal, new_sal, changed_at)
        VALUES (OLD.emp_id, OLD.salary, NEW.salary, NOW());
    END IF;
END;

-- BEFORE DELETE: prevent deleting active employees
CREATE TRIGGER trg_before_delete_employee
BEFORE DELETE ON Employee FOR EACH ROW
BEGIN
    IF OLD.status = 'ACTIVE' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete active employee';
    END IF;
END;`}</Code>

      <H2>Cursors</H2>
      <P>A cursor enables row-by-row processing of a result set inside a stored procedure. Generally much slower than set-based SQL — use only when row-by-row logic is genuinely unavoidable.</P>
      <Code lang="cpp">{`-- Cursor pattern: process employees one by one
CREATE PROCEDURE process_bonuses()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_emp_id INT;
    DECLARE v_salary DECIMAL(10,2);
    DECLARE cur CURSOR FOR SELECT emp_id, salary FROM Employee WHERE status='ACTIVE';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO v_emp_id, v_salary;
        IF done THEN LEAVE read_loop; END IF;
        -- row-by-row logic here
        UPDATE Bonus SET amount = v_salary * 0.1 WHERE emp_id = v_emp_id;
    END LOOP;
    CLOSE cur;
END;`}</Code>

      <H2>NULL Handling Functions</H2>
      <Table
        heads={["Function", "Behavior", "Example"]}
        rows={[
          ["IS NULL / IS NOT NULL", "Test for NULL; never use = NULL (always false)", "WHERE manager_id IS NULL"],
          ["COALESCE(a, b, c)", "Returns first non-NULL value from the list", "COALESCE(phone, email, 'no contact')"],
          ["NULLIF(a, b)", "Returns NULL if a = b, else returns a. Avoids division by zero.", "total / NULLIF(count, 0)"],
          ["IFNULL(a, b)", "MySQL shorthand for COALESCE with 2 args", "IFNULL(manager_id, 0)"],
          ["NVL(a, b)", "Oracle equivalent of IFNULL", "NVL(salary, 0)"],
        ]}
      />
      <Note color="warning" icon="ti-alert-triangle">
        <strong>NULL propagation rules:</strong> Any arithmetic with NULL yields NULL. Any comparison with NULL yields UNKNOWN (not TRUE or FALSE). UNKNOWN in WHERE acts like FALSE — the row is excluded. This is why <code>WHERE col != 5</code> does NOT return rows where col is NULL; you need <code>WHERE col != 5 OR col IS NULL</code>.
      </Note>

      <H2>CASE Expression</H2>
      <Code lang="cpp">{`-- Simple CASE (like switch): compare one value
SELECT name,
    CASE dept_id
        WHEN 1 THEN 'Engineering'
        WHEN 2 THEN 'Marketing'
        WHEN 3 THEN 'Finance'
        ELSE 'Other'
    END AS dept_name
FROM Employee;

-- Searched CASE (like if-elseif): arbitrary conditions
SELECT name, salary,
    CASE
        WHEN salary < 40000 THEN 'Junior'
        WHEN salary < 80000 THEN 'Mid-Level'
        WHEN salary < 120000 THEN 'Senior'
        ELSE 'Principal'
    END AS grade
FROM Employee;

-- CASE in aggregates: conditional counting
SELECT
    COUNT(CASE WHEN salary > 80000 THEN 1 END) AS high_earners,
    COUNT(CASE WHEN dept_id = 1    THEN 1 END) AS engineering_count
FROM Employee;`}</Code>

      <H2>TCL in Detail</H2>
      <Table
        heads={["Command", "Syntax", "Behavior"]}
        rows={[
          ["COMMIT", "COMMIT [WORK]", "Makes all changes in current transaction permanent and releases all locks"],
          ["ROLLBACK", "ROLLBACK [TO SAVEPOINT name]", "Undoes all changes since last COMMIT (or to named savepoint)"],
          ["SAVEPOINT", "SAVEPOINT sp_name", "Creates a named point within a transaction to roll back to partially"],
          ["RELEASE SAVEPOINT", "RELEASE SAVEPOINT sp_name", "Removes the savepoint; cannot roll back to it anymore"],
          ["SET TRANSACTION", "SET TRANSACTION ISOLATION LEVEL ...", "Sets isolation level for the next transaction"],
          ["AUTOCOMMIT", "SET AUTOCOMMIT = 0 / 1", "When ON (default in MySQL), each DML is its own auto-committed TX"],
        ]}
      />
      <Code lang="cpp">{`-- SAVEPOINT example: partial rollback
START TRANSACTION;
INSERT INTO Order(id, customer) VALUES (1001, 'Alice');
SAVEPOINT after_order;              -- mark a save point

INSERT INTO OrderItem(order_id, item, qty) VALUES (1001, 'Laptop', 1);
SAVEPOINT after_items;

-- Something goes wrong with payment
ROLLBACK TO SAVEPOINT after_order; -- undo items but KEEP the order row

-- Retry payment logic here...
COMMIT;                              -- commit only the order`}</Code>

      <QA q="When should you use a trigger instead of application-level validation?" a="Triggers enforce rules at the database level regardless of which application, tool, or user touches the data. Use triggers when: (1) the rule must be enforced even for DML run directly via a DB client or batch script, (2) you need audit trails that can't be bypassed, (3) the logic derives from the database schema itself (e.g., updating a denormalized summary column). Avoid triggers for complex business logic that requires external services or HTTP calls — keep those in the application layer where they're testable and debuggable." />
      <QA q="What is the danger of cascading triggers and how do databases handle it?" a="A trigger on table A may perform a DML operation on table B, which fires a trigger on B that DMLs on table C, and so on. This cascade can be hard to reason about, cause unexpected performance problems, and in the worst case create infinite loops (A triggers B, B triggers A). Most databases limit the cascade depth (e.g., SQL Server allows up to 32 levels). PostgreSQL and MySQL allow per-trigger control. Best practice: keep triggers simple, single-purpose, and document all trigger chains clearly." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 12 — QUERY OPTIMIZATION
══════════════════════════════════════════════════════ */
function SectionQueryOpt() {
  return (
    <div>
      <Note color="success" icon="ti-cpu">
        The <strong>query optimizer</strong> transforms your declarative SQL into the most efficient execution plan. Understanding how it works lets you write queries that optimize well and diagnose slow queries effectively — a heavily tested area in DB interviews.
      </Note>

      <H2>Query Processing Pipeline</H2>
      <Table
        heads={["Stage", "Input", "Output", "Key Work Done"]}
        rows={[
          ["Parsing", "SQL string", "Parse tree", "Syntax checking, tokenization"],
          ["Semantic Analysis", "Parse tree", "Logical query tree", "Check table/column names, resolve types, validate permissions"],
          ["Query Rewrite", "Logical tree", "Equivalent logical tree", "Flatten subqueries, push predicates down, unnest views"],
          ["Plan Generation", "Logical tree", "Candidate physical plans", "Enumerate join orderings and access methods"],
          ["Cost Estimation", "Candidate plans", "Cost-annotated plans", "Use statistics (row counts, cardinality, histograms) to estimate I/Os"],
          ["Plan Selection", "Cost-annotated plans", "Best physical plan", "Choose minimum-cost plan"],
          ["Execution", "Physical plan", "Result set", "Execute operators: scan, sort, join, aggregate"],
        ]}
      />

      <H2>Join Algorithms</H2>
      <Table
        heads={["Algorithm", "Best When", "Time Complexity", "Memory"]}
        rows={[
          ["Nested Loop Join", "One table is small (fits in memory); or index on the inner table's join key", "O(|R| * |S|) without index; O(|R| * log|S|) with index", "O(1) extra (streaming)"],
          ["Block Nested Loop Join", "No index on inner; minimizes I/Os by loading outer in blocks", "Depends on block size; better than simple nested loop", "O(buffer_pages)"],
          ["Sort-Merge Join", "Both inputs already sorted on the join key; or large inputs with no useful index", "O(|R| log|R| + |S| log|S|) for sort; O(|R|+|S|) for merge", "O(|R|+|S|) for external sort"],
          ["Hash Join", "Large unsorted inputs; equi-join only (hash on equality)", "O(|R|+|S|) average; O(|R|*|S|) worst case (skewed data)", "O(min(|R|,|S|)) for hash table"],
        ]}
      />
      <Note color="info" icon="ti-bulb">
        <strong>Rule of thumb:</strong> Hash join is fastest for large equi-joins with no useful indexes. Sort-merge join is best when inputs are already sorted (e.g., sorted on the same index). Nested loop with index is best when the outer relation is small and the inner has an index.
      </Note>

      <H2>Reading EXPLAIN / Query Plans</H2>
      <Code lang="cpp">{`-- MySQL / PostgreSQL: prefix query with EXPLAIN
EXPLAIN SELECT e.name, d.dept_name
FROM Employee e JOIN Department d ON e.dept_id = d.dept_id
WHERE e.salary > 80000;

-- Key columns in EXPLAIN output to examine:
-- type (MySQL): system > const > eq_ref > ref > range > index > ALL
--   ALL = full table scan (often bad for large tables)
--   ref = index lookup on a non-unique key
--   eq_ref = index lookup on unique/PK key (one row per probe)
--   const/system = single row constant (best case)

-- rows: estimated rows examined per step (product across joins = total work)
-- key: which index was used (NULL = no index = full scan)
-- Extra: "Using filesort" (extra sort pass needed), "Using temporary" (temp table)

-- PostgreSQL EXPLAIN ANALYZE: shows estimated vs actual row counts
EXPLAIN ANALYZE SELECT ...;
-- Seq Scan = full table scan
-- Index Scan = B-tree index traversal with heap lookup
-- Index Only Scan = covering index (no heap access)
-- Hash Join / Merge Join / Nested Loop

-- Bad patterns to look for:
-- Seq Scan on large table in a nested loop inner
-- "Using filesort" on large result sets
-- rows estimate wildly off actual (stale statistics -> run ANALYZE)
-- Nested Loop with large estimated row counts on inner side`}</Code>

      <H2>Statistics and the Cost Model</H2>
      <Table
        heads={["Statistic", "Used For", "How Updated"]}
        rows={[
          ["Row count per table", "Base cardinality estimate", "ANALYZE TABLE (MySQL) / ANALYZE (PostgreSQL)"],
          ["Column cardinality (distinct values)", "Selectivity estimation: 1/cardinality per equality predicate", "Part of ANALYZE"],
          ["Histograms (value distributions)", "Better estimates for range predicates and skewed data", "ANALYZE with histogram_generation_threshold"],
          ["Index statistics (depth, density)", "Estimating index scan cost in pages", "Updated on CREATE INDEX and ANALYZE"],
          ["Buffer pool hit rate", "Distinguishes disk I/Os from memory reads in cost model", "Runtime; affects whether optimizer prefers index or seq scan"],
        ]}
      />

      <H2>Predicate Pushdown and Other Rewrites</H2>
      <Table
        heads={["Optimization", "What It Does", "Example"]}
        rows={[
          ["Predicate Pushdown", "Move WHERE filters as early as possible (into subqueries / before joins)", "Filter rows before joining to reduce join input size"],
          ["Projection Pushdown", "Select only needed columns early to reduce row width", "Avoid carrying unused columns through sort/join stages"],
          ["Subquery Unnesting", "Transform correlated subqueries into joins", "Correlated EXISTS -> semi-join; often much faster"],
          ["Join Reordering", "Choose the join order that minimizes intermediate result size", "Join smallest-result tables first (left-deep vs bushy plan)"],
          ["Index Selection", "Choose best index for each table access based on selectivity", "Use the most selective index (fewest matching rows)"],
          ["Constant Folding", "Evaluate constant expressions at plan time", "WHERE salary > 50000 + 10000 -> WHERE salary > 60000"],
        ]}
      />

      <H2>Common Performance Pitfalls</H2>
      <Table
        heads={["Anti-Pattern", "Problem", "Fix"]}
        rows={[
          ["SELECT *", "Fetches all columns; defeats covering indexes; wide rows in sort/join", "Select only needed columns explicitly"],
          ["Function on indexed column in WHERE", "Defeats index: WHERE YEAR(hire_date)=2023 does full scan", "Rewrite: WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31'"],
          ["Leading wildcard LIKE '%abc'", "Cannot use B-tree prefix scan; full scan", "Use full-text search (MATCH...AGAINST) or reverse index trick"],
          ["OR between different columns", "Often prevents index use; each OR branch needs separate index", "Rewrite as UNION of two queries, each with its own index"],
          ["N+1 query problem", "Loop in app: 1 query to fetch N rows, then N queries for related data", "Use JOIN or eager loading in one query"],
          ["Missing index on FK", "Every FK violation check and JOIN on FK does full scan of child table", "Always index FK columns on the child table"],
          ["Implicit type conversion", "WHERE int_col = '123': string coercion may disable index", "Match literal type to column type"],
        ]}
      />

      <QA q="Why does the query optimizer sometimes choose a full table scan over an index scan even when an index exists?" a="The optimizer compares costs (in estimated I/Os) for each plan. For a full table scan, pages are read sequentially (cheap). For an index scan on a non-clustered index, each matching row may require a separate random page read (expensive). If the query returns a large fraction of rows (e.g., low-selectivity predicate like salary > 0), the random I/O cost of index lookups exceeds sequential scan cost. Rule of thumb: if a query returns more than 5-20% of rows, the optimizer may correctly prefer a full scan. You can override with hints, but the optimizer is usually right." />
      <QA q="What are stale statistics and why are they dangerous?" a="The optimizer uses statistics (row counts, cardinality, histograms) to estimate the cost of each plan. If statistics are stale (table has grown significantly since last ANALYZE), the optimizer may massively underestimate or overestimate row counts. An underestimate on a join's inner side can lead to choosing a nested loop join (catastrophic for large inputs). Fix: run ANALYZE TABLE regularly, enable auto-analyze, or check statistics age in the system catalog. In PostgreSQL, pg_stat_user_tables shows last_autoanalyze." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 13 — PARTITIONING, SHARDING & REPLICATION
══════════════════════════════════════════════════════ */
function SectionScaling() {
  return (
    <div>
      <Note color="warning" icon="ti-server">
        As data volumes and traffic grow beyond what a single DB node can handle, you need <strong>partitioning</strong> (splitting one table's data across storage units) and <strong>sharding</strong> (splitting across multiple machines). <strong>Replication</strong> adds fault tolerance and read scaling.
      </Note>

      <H2>Horizontal vs Vertical Partitioning</H2>
      <Grid cols={2}>
        <Card title="Horizontal Partitioning (Row-based)" color="info">
          Split rows of one table into multiple partitions. Each partition holds a subset of rows. All partitions have the same schema. Common partition strategies: range, hash, list, composite. The table appears unified to queries via partition pruning.
        </Card>
        <Card title="Vertical Partitioning (Column-based)" color="success">
          Split columns of one table into multiple tables (each with the same PK). Hot columns (frequently accessed) go in one partition; cold/wide columns go in another. Reduces row width for common queries. Related to columnar storage in analytical DBs.
        </Card>
      </Grid>

      <H2>Partition Strategies</H2>
      <Table
        heads={["Strategy", "How It Works", "Best For", "Weakness"]}
        rows={[
          ["Range Partitioning", "Partition by value ranges on a key column (e.g., date ranges)", "Time-series data: logs, orders by date", "Hotspot: recent partition gets all new writes"],
          ["Hash Partitioning", "Apply hash function to partition key; route row to hash(key) % n partition", "Even write distribution; no natural ordering needed", "Range queries span all partitions; can't prune by range"],
          ["List Partitioning", "Explicitly map specific values to partitions (e.g., country='IN' -> partition 1)", "Categorical data: region, product category", "New values require adding partitions; uneven if distribution is skewed"],
          ["Composite Partitioning", "Combine two strategies (e.g., range by year, then hash by user_id within year)", "Balance time locality with write distribution", "More complex management and query routing"],
        ]}
      />
      <Code lang="cpp">{`-- Range partitioning by hire date (MySQL)
CREATE TABLE Employee (
    emp_id INT, name VARCHAR(100), hire_date DATE, salary DECIMAL(10,2)
) PARTITION BY RANGE (YEAR(hire_date)) (
    PARTITION p_before_2010 VALUES LESS THAN (2010),
    PARTITION p_2010_2015   VALUES LESS THAN (2015),
    PARTITION p_2015_2020   VALUES LESS THAN (2020),
    PARTITION p_2020_plus   VALUES LESS THAN MAXVALUE
);

-- Partition pruning: this query only scans p_2015_2020 and p_2020_plus
SELECT * FROM Employee WHERE hire_date >= '2015-01-01';`}</Code>

      <H2>Sharding (Horizontal Scaling Across Machines)</H2>
      <P>Sharding splits data across multiple independent database nodes (shards). Unlike partitioning within one DB server, each shard is a separate database server with its own storage and compute.</P>
      <Table
        heads={["Concept", "Description"]}
        rows={[
          ["Shard key", "The attribute used to route a row to its shard. Choice is critical: low-cardinality or skewed keys cause hotspots."],
          ["Shard routing", "Application or a proxy layer maps shard key -> shard node. Often uses consistent hashing to minimize remapping when shards are added."],
          ["Cross-shard queries", "Queries spanning multiple shards are expensive: require scatter-gather (query all shards, merge results). Avoid in hot paths."],
          ["Cross-shard transactions", "Require distributed transaction protocols (2PC). Usually avoided by designing schemas so related data shares a shard key."],
          ["Resharding", "Adding new shards requires redistributing data. Consistent hashing minimizes movement (only 1/n keys move when adding nth shard)."],
          ["Hotspot problem", "If shard key is skewed (e.g., one user has 90% of data), one shard overloads. Choose high-cardinality, uniform-distribution shard keys."],
        ]}
      />

      <H2>Replication</H2>
      <Table
        heads={["Type", "Architecture", "Pros", "Cons"]}
        rows={[
          ["Single-Leader (Master-Slave)", "One primary (write); one or more replicas (read-only)", "Simple; consistent writes; good read scaling", "Primary is single write bottleneck; failover needed on crash"],
          ["Multi-Leader (Multi-Master)", "Multiple nodes accept writes; sync changes to each other", "Write scaling; geo-distributed writes possible", "Conflict resolution required; complex; risk of write conflicts"],
          ["Leaderless (Dynamo-style)", "Any node accepts read/write; quorum-based consistency", "No SPOF; high availability", "Eventual consistency; complex quorum tuning (R + W > N)"],
        ]}
      />
      <Table
        heads={["Replication Mode", "How It Works", "Consistency", "Use Case"]}
        rows={[
          ["Synchronous", "Primary waits for at least one replica to confirm before acknowledging commit", "Strong: replica always has latest data", "Critical data; higher write latency"],
          ["Asynchronous", "Primary commits immediately; replica catches up later via log shipping", "Eventual: replica may lag behind", "High write throughput; tolerable lag (analytics replicas)"],
          ["Semi-synchronous", "Wait for at least one replica (not all) to confirm", "Compromise: at least one replica is consistent", "Balance of durability and latency"],
        ]}
      />

      <H2>Replication Lag and Read-Your-Writes Consistency</H2>
      <Note color="danger" icon="ti-clock">
        With asynchronous replication, a user who just wrote data and immediately reads from a replica may see stale data (replication lag). <strong>Read-your-writes consistency</strong> guarantees a user always sees their own writes. Solutions: (1) always read from primary for a user's own data, (2) track write timestamp and only read from replicas that have caught up past that timestamp, (3) session-based routing.
      </Note>

      <QA q="What is the difference between partitioning and sharding, and when do you use each?" a="Partitioning splits one table's data into multiple storage units on the SAME database server. It improves query performance via partition pruning and makes maintenance (archival, statistics) easier, but it does not increase overall server capacity. Sharding splits data across MULTIPLE independent database servers, each with their own CPU, memory, and disk. Sharding provides true horizontal scale for both storage and compute. Use partitioning first when a single server can handle the load but query performance suffers. Graduate to sharding when you need more write throughput or storage than a single machine can provide." />
      <QA q="What is consistent hashing and why is it used in sharding?" a="Consistent hashing maps both shard keys and shard nodes onto a ring (circular space). A key is routed to the first node clockwise from its position on the ring. When you add a new shard, only the keys between the new node and its predecessor need to move — approximately 1/n of all keys. With simple modular hashing (key % n), adding one shard requires remapping nearly all keys. Consistent hashing minimizes data movement during resharding, which is critical for large live systems." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 14 — NoSQL, CAP THEOREM & SYSTEM DESIGN
══════════════════════════════════════════════════════ */
function SectionNoSQL() {
  return (
    <div>
      <Note color="purple" icon="ti-topology-star">
        <strong>NoSQL databases</strong> trade some of the relational model's guarantees for specific performance, scalability, or flexibility benefits. Understanding the CAP theorem, consistency models, and when to use which NoSQL type is essential for system design interviews.
      </Note>

      <H2>CAP Theorem</H2>
      <P>In any distributed data store, you can guarantee at most two of the following three properties simultaneously:</P>
      <Grid cols={3}>
        <Card title="Consistency (C)" color="info">
          Every read receives the most recent write or an error. All nodes see the same data at the same time. (Note: CAP's Consistency is different from ACID's Consistency.)
        </Card>
        <Card title="Availability (A)" color="success">
          Every request receives a non-error response — but not necessarily the most recent data. The system is always operational.
        </Card>
        <Card title="Partition Tolerance (P)" color="warning">
          The system continues operating even if messages between nodes are lost or delayed (network partition). In a real distributed system, P is non-negotiable.
        </Card>
      </Grid>
      <Note color="danger" icon="ti-info-circle">
        Since network partitions are inevitable in any distributed system, you must always choose P. The real choice is <strong>CP</strong> (sacrifice availability during partition: return error rather than stale data) or <strong>AP</strong> (sacrifice consistency during partition: return possibly-stale data rather than an error). Example CP: HBase, Zookeeper. Example AP: Cassandra, DynamoDB, CouchDB.
      </Note>

      <H2>ACID vs BASE</H2>
      <Table
        heads={["Property", "ACID (RDBMS)", "BASE (NoSQL)"]}
        rows={[
          ["Full form", "Atomicity, Consistency, Isolation, Durability", "Basically Available, Soft state, Eventually consistent"],
          ["Consistency model", "Strong consistency: all reads return latest write", "Eventual consistency: reads may see stale data temporarily"],
          ["Availability", "May reject requests to maintain consistency", "Always responds, even if data is stale"],
          ["Isolation", "Strict isolation levels; concurrent TXs don't interfere", "Limited or no transaction isolation across items"],
          ["Transactions", "Full multi-row ACID transactions", "Single-item atomicity; multi-item transactions limited or absent"],
          ["Use case", "Financial systems, inventory, anything requiring correctness", "Social feeds, product catalogs, caches, analytics"],
        ]}
      />

      <H2>Consistency Models (Spectrum)</H2>
      <Table
        heads={["Model", "Guarantee", "Example Systems"]}
        rows={[
          ["Linearizability (Strong)", "Operations appear instantaneous; reads always see latest write globally", "Zookeeper, etcd, single-node DBs"],
          ["Sequential Consistency", "All nodes see operations in the same order; not necessarily real-time", "Some distributed queues"],
          ["Causal Consistency", "Causally related operations seen in order; concurrent ops may differ", "MongoDB causal sessions"],
          ["Read-Your-Writes", "You always see your own writes; others may not yet", "Sticky sessions on primary"],
          ["Monotonic Read", "Once you read a value, you never read an older one", "Session tokens tracking replica progress"],
          ["Eventual Consistency", "Given no new writes, all replicas will converge to the same value eventually", "Cassandra, DynamoDB, S3"],
        ]}
      />

      <H2>NoSQL Data Models Deep Dive</H2>
      <Table
        heads={["Model", "Data Structure", "Query Pattern", "Real Examples", "When to Choose"]}
        rows={[
          ["Key-Value", "Hash map: key -> opaque value blob", "Get/Set/Delete by exact key only", "Redis, DynamoDB, Memcached", "Session store, cache, real-time leaderboards, feature flags"],
          ["Document", "Nested JSON/BSON documents; schema-flexible", "Query any field including nested; rich secondary indexes", "MongoDB, CouchDB, Firestore", "Content management, user profiles, catalogs with varied schemas"],
          ["Wide-Column", "Tables with dynamic columns; rows partitioned by partition key, sorted by cluster key", "Point and range queries on partition+cluster keys; no joins", "Cassandra, HBase, DynamoDB tables", "Time-series (sensor data, events), write-heavy workloads, IoT"],
          ["Graph", "Nodes (entities) + edges (relationships) with properties", "Traversal queries: shortest path, connected components, neighbors", "Neo4j, Amazon Neptune, JanusGraph", "Social networks, fraud detection, knowledge graphs, recommendation"],
          ["Search Engine", "Inverted index on tokenized text fields", "Full-text search, faceted search, fuzzy match", "Elasticsearch, Apache Solr, OpenSearch", "Log analytics, e-commerce search, autocomplete"],
          ["Time-Series", "Append-only rows timestamped; compressed sequential storage", "Range queries on time; aggregations (avg/min/max) over windows", "InfluxDB, TimescaleDB, Prometheus", "Metrics, monitoring, financial tick data, IoT telemetry"],
        ]}
      />

      <H2>When to Use RDBMS vs NoSQL</H2>
      <Table
        heads={["Factor", "Favor RDBMS", "Favor NoSQL"]}
        rows={[
          ["Data structure", "Fixed, well-defined schema; highly relational data", "Schema evolves frequently; nested/hierarchical; sparse attributes"],
          ["Query complexity", "Complex multi-table joins; ad-hoc analytics; aggregations", "Simple key-value access; single entity reads; no joins needed"],
          ["Consistency requirement", "Financial accuracy; inventory; anything requiring ACID guarantees", "Eventual consistency acceptable; availability prioritized over staleness"],
          ["Scale pattern", "Moderate scale; vertical scaling sufficient; strong consistency needed", "Massive horizontal scale; millions of writes/sec; geo-distribution"],
          ["Flexibility", "Schema validation is a feature (enforces data quality)", "Rapid iteration; schema unknown upfront; different shapes per record"],
        ]}
      />

      <H2>Quorum in Distributed Systems</H2>
      <P>In a leaderless replication system with N total replicas, W write replicas needed for success, and R read replicas needed for success:</P>
      <Note color="info" icon="ti-math">
        <strong>Quorum condition for strong consistency:</strong> W + R &gt; N. If this holds, at least one node in the read quorum has seen the latest write. Example: N=3, W=2, R=2 — any two nodes must agree on a write; any two nodes read from must include one that saw the write.
      </Note>
      <Table
        heads={["Configuration (N=3)", "W", "R", "Property"]}
        rows={[
          ["W=3, R=1", "3", "1", "Write to all; any one read is consistent. High write latency, fast reads."],
          ["W=1, R=3", "1", "3", "Fast writes; read from all to find latest. Low write latency, slow reads."],
          ["W=2, R=2", "2", "2", "Balanced; W+R=4>3: strong consistency. Common production choice."],
          ["W=1, R=1", "1", "1", "W+R=2 not > N=3: eventual consistency only. Maximum performance, minimum guarantees."],
        ]}
      />

      <QA q="Why is the CAP theorem often described as a simplification, and what does the PACELC model add?" a="CAP only considers behavior during network partitions. PACELC extends it: in normal operation (no partition), there is also a tradeoff between latency (L) and consistency (C). Even when the network is healthy, strong consistency requires coordination (waiting for quorum), adding latency. So the full spectrum is: during Partition choose AP or CP; else (normal) choose lower latency (LC) or stronger consistency (EC). Systems like DynamoDB are AP/EL (available during partition; low latency in normal operation), while Spanner is CP/HC (consistent always; higher latency always)." />
      <QA q="What is the difference between eventual consistency and strong consistency in practical terms?" a="With strong consistency (linearizability), after a write completes, any subsequent read from any node will see that write. The system behaves like a single, instantaneous data store. With eventual consistency, after a write, different nodes may temporarily return different values. If writes stop, all nodes will eventually converge to the same value. Practical implication: in an eventually consistent system, you might post a comment, refresh, and temporarily not see it (if routed to a replica that hasn't received it yet). For social feeds this is fine. For bank balances this is not." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 15 — ADVANCED SQL & SCHEMA DESIGN
══════════════════════════════════════════════════════ */
function SectionAdvancedSQL() {
  return (
    <div>
      <Note color="info" icon="ti-sparkles">
        This section covers advanced SQL features and schema design patterns that appear in senior engineering interviews and system design rounds: temporal queries, JSON in SQL, MERGE/UPSERT, schema design patterns, and common table design tradeoffs.
      </Note>

      <H2>MERGE / UPSERT</H2>
      <P>MERGE performs INSERT-or-UPDATE in a single atomic statement based on whether a matching row exists. Avoids race conditions in check-then-insert patterns.</P>
      <Code lang="cpp">{`-- Standard SQL MERGE (supported in Oracle, SQL Server, PostgreSQL 15+)
MERGE INTO Employee AS target
USING (SELECT 42 AS emp_id, 'Alice' AS name, 75000 AS salary) AS source
ON target.emp_id = source.emp_id
WHEN MATCHED THEN
    UPDATE SET target.salary = source.salary, target.name = source.name
WHEN NOT MATCHED THEN
    INSERT (emp_id, name, salary) VALUES (source.emp_id, source.name, source.salary);

-- MySQL: INSERT ... ON DUPLICATE KEY UPDATE (upsert)
INSERT INTO Employee(emp_id, name, salary) VALUES (42, 'Alice', 75000)
ON DUPLICATE KEY UPDATE salary = VALUES(salary), name = VALUES(name);

-- PostgreSQL: INSERT ... ON CONFLICT
INSERT INTO Employee(emp_id, name, salary) VALUES (42, 'Alice', 75000)
ON CONFLICT (emp_id) DO UPDATE
SET salary = EXCLUDED.salary, name = EXCLUDED.name;

-- ON CONFLICT DO NOTHING: insert only if not exists (no error on duplicate)
INSERT INTO Tag(name) VALUES ('python') ON CONFLICT (name) DO NOTHING;`}</Code>

      <H2>JSON in SQL</H2>
      <P>Modern RDBMSs support JSON columns for semi-structured data within relational tables. This bridges the relational and document models.</P>
      <Code lang="cpp">{`-- PostgreSQL JSON support
CREATE TABLE Product (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100),
    attrs JSONB   -- JSONB = binary JSON; indexable, faster than JSON text type
);

INSERT INTO Product(name, attrs) VALUES
('Laptop', '{"brand":"Dell","ram_gb":16,"tags":["electronics","computing"]}');

-- Query JSON fields
SELECT name, attrs->>'brand' AS brand          -- ->> extracts as text
FROM Product WHERE attrs->>'brand' = 'Dell';

SELECT name FROM Product
WHERE attrs @> '{"ram_gb": 16}';               -- @> containment operator

-- Index a JSON field for fast lookups
CREATE INDEX idx_brand ON Product((attrs->>'brand'));
CREATE INDEX idx_attrs ON Product USING GIN(attrs); -- GIN for containment queries

-- Aggregate JSON values
SELECT attrs->>'brand', COUNT(*) FROM Product GROUP BY attrs->>'brand';`}</Code>

      <H2>Temporal Tables (System-Versioned)</H2>
      <P>Temporal tables automatically track the history of row changes with valid-time or transaction-time periods. Supported in SQL Server (SYSTEM_VERSIONED), PostgreSQL (manual via triggers), Oracle (Flashback).</P>
      <Code lang="cpp">{`-- SQL Server: system-versioned temporal table
CREATE TABLE Employee (
    emp_id      INT          PRIMARY KEY,
    name        VARCHAR(100),
    salary      DECIMAL(10,2),
    dept_id     INT,
    SysStartTime DATETIME2 GENERATED ALWAYS AS ROW START,
    SysEndTime   DATETIME2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)
) WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.Employee_History));

-- Query the current state (normal query)
SELECT * FROM Employee WHERE emp_id = 42;

-- Query the state as of a past point in time
SELECT * FROM Employee FOR SYSTEM_TIME AS OF '2024-01-01'
WHERE emp_id = 42;

-- Query the full history of changes for a row
SELECT * FROM Employee FOR SYSTEM_TIME ALL WHERE emp_id = 42
ORDER BY SysStartTime;`}</Code>

      <H2>Common Schema Design Patterns</H2>
      <Table
        heads={["Pattern", "Problem Solved", "Tradeoff"]}
        rows={[
          ["Surrogate Key", "Natural keys can change (email, username). Surrogate int/UUID never changes.", "Extra column; no semantic meaning; joins on meaningless key"],
          ["Soft Delete", "Mark rows deleted (deleted_at IS NOT NULL) instead of removing them. Preserves audit trail.", "Must filter deleted rows everywhere; index bloat; FK semantics break"],
          ["Polymorphic Association", "One FK references multiple different tables (e.g., comment on Post OR Video)", "Cannot enforce FK constraint; complex queries; considered an anti-pattern"],
          ["Single Table Inheritance (STI)", "Multiple entity types in one table; a 'type' discriminator column; unused columns are NULL.", "Simple queries; wastes space; NULL-heavy; violates 2NF"],
          ["Class Table Inheritance", "One table per type; subtype tables FK to parent table. Fully normalized.", "JOINs required for every subtype query; more complex schema"],
          ["EAV (Entity-Attribute-Value)", "Store arbitrary attribute sets as rows (entity_id, attr_name, attr_value). Schema-flexible.", "Terrible query performance; no type safety; basically fighting the relational model"],
          ["Lookup Table", "Normalize status codes, categories into a separate table. FK ensures valid values.", "Extra JOIN; can use CHECK constraint instead for simple enumerations"],
        ]}
      />

      <H2>Denormalization Strategies</H2>
      <P>Deliberately introducing redundancy to improve read performance, at the cost of more complex writes and risk of inconsistency:</P>
      <Table
        heads={["Strategy", "What You Duplicate", "When Justified"]}
        rows={[
          ["Precomputed aggregates", "Store SUM/COUNT in a denormalized column, updated by trigger", "Dashboard queries that aggregate millions of rows on every page load"],
          ["Materialized view", "Physically store the result of a complex JOIN+aggregate query", "OLAP queries; refresh on a schedule; DB-managed consistency"],
          ["Redundant column in child", "Copy parent's column into child table to avoid JOIN", "Hot read path where JOIN is a bottleneck; column rarely changes"],
          ["Summary table", "Keep a separate table with aggregated statistics", "Reporting and analytics that don't need live data"],
          ["JSON blob for denormalized attributes", "Store related entity's data as JSON alongside FK", "Read-heavy; entity rarely changes; need to minimize JOIN latency"],
        ]}
      />

      <H2>Built-in Functions Reference</H2>
      <Code lang="cpp">{`-- String functions
SELECT UPPER(name), LOWER(name), LENGTH(name) FROM Employee;
SELECT SUBSTRING(name, 1, 3) FROM Employee;   -- first 3 chars
SELECT TRIM('  hello  ');                      -- remove whitespace
SELECT REPLACE(name, 'Jr', 'Senior') FROM Employee;
SELECT CONCAT(first, ' ', last) AS full_name FROM Person;  -- or: first || ' ' || last (PostgreSQL)
SELECT LEFT(name, 5), RIGHT(name, 3) FROM Employee;

-- Date/Time functions
SELECT NOW(), CURRENT_DATE, CURRENT_TIMESTAMP;
SELECT DATE_ADD(hire_date, INTERVAL 1 YEAR) AS anniversary FROM Employee;  -- MySQL
SELECT DATEDIFF(NOW(), hire_date) AS days_employed FROM Employee;          -- MySQL
SELECT EXTRACT(YEAR FROM hire_date) AS year FROM Employee;                 -- Standard SQL
SELECT DATE_TRUNC('month', hire_date) AS hire_month FROM Employee;         -- PostgreSQL
SELECT TIMESTAMPDIFF(YEAR, hire_date, NOW()) AS tenure FROM Employee;     -- MySQL

-- Numeric functions
SELECT ROUND(salary, 2), CEIL(salary), FLOOR(salary) FROM Employee;
SELECT MOD(emp_id, 10) AS last_digit FROM Employee;
SELECT ABS(salary - 50000) AS deviation FROM Employee;
SELECT POWER(2, 10), SQRT(256);`}</Code>

      <QA q="When should you use a JSONB column in PostgreSQL instead of normalizing into separate tables?" a="Use JSONB when the attribute set is genuinely variable across rows (different products have different specs), or when schema evolves rapidly and you don't want migrations for every new attribute. JSONB supports GIN indexing for containment queries and expression indexes on specific fields, making it reasonably queryable. However, if you consistently query the same fields, JOIN on them, or need referential integrity, normalize them into proper columns. A hybrid approach is common: fixed columns for attributes always queried, JSONB for the long tail of optional attributes." />
      <QA q="What is the soft delete pattern and what problems does it create?" a="Soft delete marks rows as deleted (e.g., deleted_at TIMESTAMP, or is_deleted BOOLEAN) instead of removing them, preserving audit history. Problems: (1) every query must add WHERE deleted_at IS NULL — easy to forget, causing 'ghost data' bugs; (2) UNIQUE constraints are broken (can't insert a 'new' row with the same unique key as a soft-deleted one without special handling); (3) FK constraints referencing soft-deleted rows behave unexpectedly; (4) indexes grow over time with dead rows. Mitigations: use row-level security or views to always filter; use partial unique indexes; consider archive tables for true deletion with history." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: 'intro',         label: 'Introduction'        },
  { id: 'er',            label: 'ER Model'            },
  { id: 'relational',    label: 'Relational Model'    },
  { id: 'keys',          label: 'Keys & FDs'          },
  { id: 'normalization', label: 'Normalization'       },
  { id: 'sql',           label: 'SQL'                 },
  { id: 'indexing',      label: 'Indexing & Storage'  },
  { id: 'transactions',  label: 'Transactions'        },
  { id: 'concurrency',   label: 'Concurrency Control' },
  { id: 'recovery',      label: 'Recovery'            },
  { id: 'stored',        label: 'Stored Programs'     },
  { id: 'queryopt',      label: 'Query Optimization'  },
  { id: 'scaling',       label: 'Scaling & Replication'},
  { id: 'nosql',         label: 'NoSQL & CAP'         },
  { id: 'advanced',      label: 'Advanced SQL & Design'},
];

export default function DBMS() {
  const [active, setActive] = useState('intro');
  const map = {
    intro:         <SectionIntro />,
    er:            <SectionER />,
    relational:    <SectionRelational />,
    keys:          <SectionKeys />,
    normalization: <SectionNorm />,
    sql:           <SectionSQL />,
    indexing:      <SectionIndexing />,
    transactions:  <SectionTransactions />,
    concurrency:   <SectionConcurrency />,
    recovery:      <SectionRecovery />,
    stored:        <SectionStoredPrograms />,
    queryopt:      <SectionQueryOpt />,
    scaling:       <SectionScaling />,
    nosql:         <SectionNoSQL />,
    advanced:      <SectionAdvancedSQL />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Core CS -- Module 51</div>
        <h1 className="page-header-title">Database Management Systems</h1>
        <p className="page-header-subtitle">
          ER Model · Relational Algebra · Keys · FDs · Normalization · SQL · Stored Programs · Query Optimization · B+ Trees · ACID · 2PL · MVCC · WAL · ARIES · Sharding · CAP Theorem · NoSQL
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{ padding: '0.5rem 0 2rem' }}>{map[active]}</div>
      <NavButtons moduleId={51} />
    </div>
  );
}
