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

function buildVtableSteps() {
  return [
    { desc: "Define Base class B with virtual show(). Compiler creates a vtable for B with one slot pointing to B::show().", phase: 'base', active: null },
    { desc: "Define Derived class D inheriting B, overrides show(). Compiler creates D's vtable. D's slot is overwritten to point to D::show(). B's vtable is unchanged.", phase: 'derived', active: null },
    { desc: "Create object d of type D. Object d gets a hidden vptr (virtual pointer) as its first member, pointing to D's vtable.", phase: 'object', active: 'd' },
    { desc: "B* bptr = &d; bptr now holds the address of d. But bptr's static type is B*.", phase: 'assign', active: 'bptr' },
    { desc: "bptr->show() - compiler sees B*, checks if show() is virtual. YES. Follows bptr -> vptr -> D's vtable -> D::show(). Calls D::show(). Runtime polymorphism!", phase: 'call', active: 'call' },
  ];
}
const VTABLE_STEPS = buildVtableSteps();

function buildInheritanceSteps() {
  return [
    { desc: "Single Inheritance: D inherits from B. D gets all non-private members of B. One clean parent-child chain.", type: 'single',
      nodes: [{ id:'B', label:'Base B', x:50, y:10, color:'info' }, { id:'D', label:'Derived D', x:50, y:60, color:'success' }],
      edges: [{ from:'D', to:'B' }] },
    { desc: "Multiple Inheritance: D inherits from B1 and B2 simultaneously. D has all members of both. Risk: diamond problem if B1 and B2 share a common ancestor.", type: 'multiple',
      nodes: [{ id:'B1', label:'Base B1', x:20, y:10, color:'info' }, { id:'B2', label:'Base B2', x:80, y:10, color:'info' }, { id:'D', label:'Derived D', x:50, y:60, color:'success' }],
      edges: [{ from:'D', to:'B1' }, { from:'D', to:'B2' }] },
    { desc: "Multilevel Inheritance: A->B->C. C inherits from B which inherits from A. C gets transitively all members of A and B.", type: 'multilevel',
      nodes: [{ id:'A', label:'Class A', x:50, y:5, color:'warning' }, { id:'B', label:'Class B', x:50, y:40, color:'info' }, { id:'C', label:'Class C', x:50, y:75, color:'success' }],
      edges: [{ from:'B', to:'A' }, { from:'C', to:'B' }] },
    { desc: "Hierarchical Inheritance: One base, multiple derived classes. B1 and B2 both inherit from A independently. Common pattern for specialization.", type: 'hierarchical',
      nodes: [{ id:'A', label:'Base A', x:50, y:10, color:'warning' }, { id:'B1', label:'Derived B1', x:20, y:65, color:'info' }, { id:'B2', label:'Derived B2', x:80, y:65, color:'success' }],
      edges: [{ from:'B1', to:'A' }, { from:'B2', to:'A' }] },
    { desc: "Hybrid (Diamond) Problem: D inherits from B and C, both of which inherit from A. D gets TWO copies of A - ambiguity! C++ fix: virtual inheritance. Python fix: C3 MRO.", type: 'hybrid',
      nodes: [{ id:'A', label:'Class A', x:50, y:5, color:'danger' }, { id:'B', label:'Class B', x:20, y:40, color:'warning' }, { id:'C', label:'Class C', x:80, y:40, color:'warning' }, { id:'D', label:'Class D', x:50, y:75, color:'success' }],
      edges: [{ from:'B', to:'A' }, { from:'C', to:'A' }, { from:'D', to:'B' }, { from:'D', to:'C' }] },
  ];
}
const INHERIT_STEPS = buildInheritanceSteps();

function buildMROSteps() {
  return [
    { desc: "class D(B, C): Python must resolve show() - is it from D, B, or C? Apply C3 linearization: L[D] = D + merge(L[B], L[C], [B, C]).", order: ['D', 'B', 'C', 'A', 'object'], highlight: [] },
    { desc: "Step 1: D itself comes first. Check: D has no show(). Move to next in MRO.", order: ['D', 'B', 'C', 'A', 'object'], highlight: ['D'] },
    { desc: "Step 2: B is next in MRO. Check: B has show(). FOUND! Call B.show(). MRO guarantees consistent ordering regardless of call depth.", order: ['D', 'B', 'C', 'A', 'object'], highlight: ['D', 'B'] },
    { desc: "Full MRO for D(B,C) where B(A) and C(A): D -> B -> C -> A -> object. Each class appears exactly once. super() follows this chain.", order: ['D', 'B', 'C', 'A', 'object'], highlight: ['D', 'B', 'C', 'A', 'object'] },
  ];
}
const MRO_STEPS = buildMROSteps();

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 - VTABLE MECHANICS
══════════════════════════════════════════════════════ */
function VtableViz() {
  const [step, setStep] = useState(0);
  const s = VTABLE_STEPS[Math.min(step, VTABLE_STEPS.length - 1)];

  const showBase    = step >= 0;
  const showDerived = step >= 1;
  const showObject  = step >= 2;
  const showBptr    = step >= 3;
  const showCall    = step >= 4;

  const Box = ({ label, color, children, active }) => (
    <div style={{ border:`1.5px solid var(--color-border-${color})`, borderRadius:8, padding:'8px 12px', background: active ? `var(--color-background-${color})` : 'var(--color-background-tertiary)', minWidth:130 }}>
      <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:`var(--color-text-${color})`, fontWeight:700, marginBottom:4, letterSpacing:'0.06em' }}>{label}</div>
      {children}
    </div>
  );
  const Row = ({ label, value, color }) => (
    <div style={{ display:'flex', justifyContent:'space-between', gap:8, fontSize:11, fontFamily:'var(--font-mono)', color: color ? `var(--color-text-${color})` : 'var(--color-text-secondary)', margin:'2px 0' }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );

  return (
    <VizBox>
      <div style={{ marginBottom:14, padding:'7px 12px', background:'var(--color-background-info)', border:'1px solid var(--color-border-info)', borderRadius:'var(--border-radius-md)', fontSize:13, color:'var(--color-text-info)', lineHeight:1.6 }}>{s.desc}</div>
      <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', alignItems:'flex-start' }}>
        {/* vtables */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', letterSpacing:'0.06em', textAlign:'center' }}>VTABLES (ROM)</div>
          {showBase && (
            <Box label="B's vtable" color="info">
              <Row label="[0] show" value="-> B::show()" />
            </Box>
          )}
          {showDerived && (
            <Box label="D's vtable" color="success">
              <Row label="[0] show" value="-> D::show()" color="success" />
            </Box>
          )}
        </div>
        {/* objects */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', letterSpacing:'0.06em', textAlign:'center' }}>HEAP / STACK</div>
          {showObject && (
            <Box label="object d (type D)" color={s.active==='d'?'success':'secondary'} active={s.active==='d'}>
              <Row label="vptr" value="--> D's vtable" color="success" />
              <Row label="...data..." value="" />
            </Box>
          )}
          {showBptr && (
            <Box label="B* bptr" color={s.active==='bptr'?'warning':'secondary'} active={s.active==='bptr'}>
              <Row label="points to" value="&d" color="warning" />
            </Box>
          )}
        </div>
        {/* call resolution */}
        {showCall && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', letterSpacing:'0.06em', textAlign:'center' }}>DISPATCH</div>
            <Box label="bptr->show()" color="danger" active>
              <Row label="1. bptr->vptr" value="D's vtable" color="success" />
              <Row label="2. vtable[0]" value="D::show()" color="success" />
              <Row label="3. Calls" value="D::show()" color="danger" />
            </Box>
          </div>
        )}
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:14 }}>
        {[['Prev', () => setStep(Math.max(0, step-1)), step===0], ['Next', () => setStep(Math.min(VTABLE_STEPS.length-1, step+1)), step===VTABLE_STEPS.length-1]].map(([l,a,d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:72, textAlign:'center', alignSelf:'center' }}>{step+1} / {VTABLE_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
        <button onClick={() => setStep(VTABLE_STEPS.length-1)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>End</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 - INHERITANCE TYPES VIZ
══════════════════════════════════════════════════════ */
function InheritViz() {
  const [step, setStep] = useState(0);
  const s = INHERIT_STEPS[Math.min(step, INHERIT_STEPS.length - 1)];

  const clrMap = { info:'var(--color-text-info)', success:'var(--color-text-success)', warning:'var(--color-text-warning)', danger:'var(--color-text-danger)', secondary:'var(--color-text-secondary)' };
  const bgMap  = { info:'var(--color-background-info)', success:'var(--color-background-success)', warning:'var(--color-background-warning)', danger:'var(--color-background-danger)', secondary:'var(--color-background-tertiary)' };
  const bdMap  = { info:'var(--color-border-info)', success:'var(--color-border-success)', warning:'var(--color-border-warning)', danger:'var(--color-border-danger)', secondary:'var(--color-border-secondary)' };

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'7px 12px', background:'var(--color-background-secondary)', border:'1px solid var(--color-border-secondary)', borderRadius:'var(--border-radius-md)', fontSize:13, color:'var(--color-text-secondary)', lineHeight:1.6 }}>{s.desc}</div>
      <div style={{ position:'relative', height:180, marginBottom:8 }}>
        {/* Draw edges as simple text arrows since SVG not in scope */}
        {s.edges.map((e, i) => {
          const from = s.nodes.find(n => n.id === e.from);
          const to   = s.nodes.find(n => n.id === e.to);
          return (
            <div key={i} style={{ position:'absolute', left:`${(from.x + to.x)/2 - 2}%`, top:`${(from.y + to.y)/2 + 8}%`, fontFamily:'var(--font-mono)', fontSize:14, color:'var(--color-text-tertiary)' }}>^</div>
          );
        })}
        {s.nodes.map(n => (
          <div key={n.id} style={{ position:'absolute', left:`${n.x - 8}%`, top:`${n.y}%`, padding:'6px 14px', borderRadius:8, background:bgMap[n.color], border:`1.5px solid ${bdMap[n.color]}`, fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color:clrMap[n.color], whiteSpace:'nowrap' }}>
            {n.label}
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:6 }}>
        {[['Prev', () => setStep(Math.max(0, step-1)), step===0], ['Next', () => setStep(Math.min(INHERIT_STEPS.length-1, step+1)), step===INHERIT_STEPS.length-1]].map(([l,a,d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:72, textAlign:'center', alignSelf:'center' }}>{step+1} / {INHERIT_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
        <button onClick={() => setStep(INHERIT_STEPS.length-1)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>End</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 - MRO STEPPER
══════════════════════════════════════════════════════ */
function MROViz() {
  const [step, setStep] = useState(0);
  const s = MRO_STEPS[Math.min(step, MRO_STEPS.length - 1)];

  return (
    <VizBox>
      <div style={{ marginBottom:12, padding:'7px 12px', background:'var(--color-background-success)', border:'1px solid var(--color-border-success)', borderRadius:'var(--border-radius-md)', fontSize:13, color:'var(--color-text-success)', lineHeight:1.6 }}>{s.desc}</div>
      <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', padding:'8px 0' }}>
        {s.order.map((cls, i) => {
          const highlighted = s.highlight.includes(cls);
          return (
            <div key={cls} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ padding:'6px 16px', borderRadius:6, border:`1.5px solid ${highlighted ? 'var(--color-border-success)' : 'var(--color-border-secondary)'}`, background: highlighted ? 'var(--color-background-success)' : 'var(--color-background-tertiary)', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:700, color: highlighted ? 'var(--color-text-success)' : 'var(--color-text-tertiary)', transition:'all 0.2s' }}>
                {cls}
              </div>
              {i < s.order.length-1 && <span style={{ color:'var(--color-text-tertiary)', fontSize:14 }}>-{'>'}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:10 }}>
        {[['Prev', () => setStep(Math.max(0, step-1)), step===0], ['Next', () => setStep(Math.min(MRO_STEPS.length-1, step+1)), step===MRO_STEPS.length-1]].map(([l,a,d]) => (
          <button key={l} onClick={a} disabled={d} style={{ padding:'5px 14px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-secondary)', cursor:d?'not-allowed':'pointer', fontSize:12, opacity:d?0.4:1 }}>{l}</button>
        ))}
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-tertiary)', minWidth:60, textAlign:'center', alignSelf:'center' }}>{step+1} / {MRO_STEPS.length}</span>
        <button onClick={() => setStep(0)} style={{ padding:'5px 9px', border:'1px solid var(--color-border-tertiary)', borderRadius:'var(--border-radius-md)', background:'transparent', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:12 }}>Reset</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 - PARADIGMS & FOUNDATIONS
══════════════════════════════════════════════════════ */
function SectionParadigms() {
  return (
    <div>
      <Note color="info" icon="ti-code">
        Understanding <strong>why OOP exists</strong> is the foundation for every interview question on design. OOP emerged to solve the scaling problems of procedural code: global state, no data protection, and poor real-world modeling.
      </Note>

      <H2>Programming Paradigm Comparison</H2>
      <Table
        heads={["Property", "Structural / Procedural (POP)", "Object-Oriented (OOP)"]}
        rows={[
          ["Core unit", "Functions / Procedures", "Objects (data + behavior bundled)"],
          ["Approach", "Top-down: break problem into functions", "Bottom-up: model real-world entities, then compose"],
          ["Data access", "Global variables; any function can read/write", "Data hidden inside objects; accessed only through methods"],
          ["Code reuse", "Copy-paste functions; shared libraries", "Inheritance and composition"],
          ["Modeling", "Problem-centric; not aligned with real-world concepts", "Entity-centric; mirrors real-world structure"],
          ["Maintenance", "Hard: changing one function breaks callers everywhere", "Easier: objects are self-contained; changes localized"],
          ["Languages", "C, FORTRAN, COBOL, Pascal", "C++, Java, Python, C#"],
        ]}
      />

      <H2>The Four Pillars of OOP</H2>
      <Grid cols={2}>
        <Card title="Encapsulation" color="info">
          Wrapping data and the functions that operate on it into a single unit (class). Data is NOT directly accessible from outside; it must go through methods. Achieved via access specifiers: private, protected, public.
        </Card>
        <Card title="Abstraction" color="success">
          Hiding implementation details; exposing only what is necessary. A user of a class knows WHAT it does, not HOW. Achieved via abstract classes, interfaces, and access control.
        </Card>
        <Card title="Inheritance" color="warning">
          A class (derived) acquires properties and behaviors of another class (base). Enables reuse without rewriting. Builds IS-A relationships: a Dog IS-A Animal.
        </Card>
        <Card title="Polymorphism" color="purple">
          One interface, many implementations. The same function call behaves differently depending on the object. Compile-time: overloading. Runtime: virtual functions / method overriding.
        </Card>
      </Grid>

      <H2>C++ = C + OOP</H2>
      <P>Bjarne Stroustrup designed C++ as a superset of C, adding OOP constructs on top of C's efficiency and systems-programming power.</P>
      <Table
        heads={["Feature", "C", "C++"]}
        rows={[
          ["Paradigm", "Procedural only", "Procedural + Object-Oriented + Generic (templates)"],
          ["Data protection", "No: all data globally accessible", "Yes: private/protected access specifiers"],
          ["Memory management", "malloc/calloc/free (library functions)", "new/delete (operators; trigger constructors/destructors)"],
          ["Function overloading", "No", "Yes"],
          ["Default arguments", "No", "Yes"],
          ["References", "No (only pointers)", "Yes (safer alternative to pointers)"],
          ["Inline functions", "No (macros only)", "Yes"],
          ["Namespaces", "No", "Yes"],
          ["Exception handling", "No", "Yes (try/catch/throw)"],
          ["Templates", "No", "Yes (generic programming)"],
        ]}
      />

      <H2>Python OOP vs C++ OOP - High-Level Differences</H2>
      <Table
        heads={["Aspect", "C++", "Python"]}
        rows={[
          ["Typing", "Static: types declared at compile time", "Dynamic: types resolved at runtime"],
          ["Access control", "Enforced by compiler: private, protected, public", "Convention only: _ prefix = protected, __ = name-mangled (pseudo-private)"],
          ["Memory management", "Manual: new/delete + smart pointers (RAII)", "Automatic: garbage collector + reference counting"],
          ["Multiple inheritance", "Supported; diamond problem solved via virtual inheritance", "Supported; diamond problem solved via C3 MRO"],
          ["Interfaces", "Pure virtual functions / abstract base classes", "abc.ABC module; Protocol (duck typing)"],
          ["Operator overloading", "operator+ syntax", "__add__, __mul__ dunder methods"],
          ["Constructors", "Constructor name = class name; no return type", "__init__(self, ...) method"],
          ["Destructors", "~ClassName() called deterministically", "__del__(self) called by GC; timing not guaranteed"],
        ]}
      />

      <QA q="What is the difference between encapsulation and abstraction? They sound similar." a="Encapsulation is the MECHANISM: bundling data and methods together and restricting direct access via access specifiers. It's about HOW data is protected. Abstraction is the RESULT: hiding complexity and exposing only a clean interface. It's about WHAT the user sees. Analogy: a car's engine is encapsulated (you can't directly touch the pistons), and the steering wheel + pedals are the abstraction (you don't need to know how fuel injection works to drive). Encapsulation enables abstraction, but they are distinct concepts." />
      <QA q="Why does Python not truly enforce private access like C++ does?" a="Python's design philosophy ('consenting adults') prioritizes developer freedom over forced restriction. The __ prefix triggers name mangling: __attr becomes _ClassName__attr, making accidental access harder but not impossible. You can still access it via obj._ClassName__attr. C++ enforces access at compile time - any attempt to access a private member is a compiler error, with no workaround. For interviews: state that Python's 'private' is a convention, not enforcement, and name mangling is the closest mechanism to real access restriction." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 - CLASSES & OBJECTS
══════════════════════════════════════════════════════ */
function SectionClasses() {
  return (
    <div>
      <Note color="success" icon="ti-box">
        A <strong>class</strong> is a blueprint. An <strong>object</strong> is an instance of that blueprint with its own copy of data members. Understanding memory layout of objects is a frequent interview topic.
      </Note>

      <H2>Class Anatomy - C++ vs Python</H2>
      <Code>{`// ═══════════════ C++ ═══════════════
class BankAccount {
private:                        // data hidden from outside
    string owner;
    double balance;
    static int total_accounts;  // shared across ALL instances

public:
    // Constructor
    BankAccount(string o, double b) : owner(o), balance(b) {
        total_accounts++;
    }

    // Member function
    void deposit(double amt) {
        if (amt > 0) balance += amt;
    }

    double get_balance() const { return balance; }  // const: won't modify object

    // Static member function: can only access static members
    static int get_total() { return total_accounts; }

    // Destructor
    ~BankAccount() { total_accounts--; }
};

int BankAccount::total_accounts = 0;  // must define static outside class

BankAccount acc1("Alice", 1000.0);    // stack allocation
BankAccount* acc2 = new BankAccount("Bob", 500.0);  // heap allocation
acc2->deposit(200.0);
delete acc2;   // must manually free

// ═══════════════ Python ═══════════════
class BankAccount:
    total_accounts = 0     # class variable (shared)

    def __init__(self, owner: str, balance: float):
        self.owner = owner          # instance variable
        self._balance = balance     # convention: protected
        BankAccount.total_accounts += 1

    def deposit(self, amt: float):
        if amt > 0:
            self._balance += amt

    @property
    def balance(self):              # getter via property decorator
        return self._balance

    @balance.setter
    def balance(self, value):       # setter via property decorator
        if value >= 0:
            self._balance = value

    @classmethod
    def get_total(cls):             # classmethod: receives class, not instance
        return cls.total_accounts

    @staticmethod
    def validate_amount(amt):       # staticmethod: no class or instance arg
        return amt > 0

    def __del__(self):
        BankAccount.total_accounts -= 1

acc = BankAccount("Alice", 1000.0)
print(acc.balance)              # calls getter
acc.balance = 1500.0            # calls setter`}</Code>

      <H2>Access Specifiers</H2>
      <Table
        heads={["Specifier", "C++ Accessible From", "Python Equivalent", "Convention"]}
        rows={[
          ["public", "Anywhere: inside class, derived class, outside", "name (no prefix)", "Fully accessible"],
          ["protected", "Inside class + derived classes only; NOT outside", "_name (single underscore)", "Internal use; accessible but indicates 'don't touch'"],
          ["private", "Inside class only; NOT accessible in derived or outside", "__name (double underscore, name mangled)", "C++: compiler-enforced. Python: name mangling only"],
        ]}
      />

      <H2>Inheritance Access Table (C++)</H2>
      <Table
        heads={["Base Member", "public inheritance", "protected inheritance", "private inheritance"]}
        rows={[
          ["public", "public in derived", "protected in derived", "private in derived"],
          ["protected", "protected in derived", "protected in derived", "private in derived"],
          ["private", "INACCESSIBLE in derived", "INACCESSIBLE in derived", "INACCESSIBLE in derived"],
        ]}
      />
      <Note color="warning" icon="ti-info-circle">
        Private members of the base class are NEVER accessible in derived classes, regardless of inheritance type. They are inherited (take up memory) but inaccessible by name. This is a common trick question.
      </Note>

      <H2>Object Memory Layout</H2>
      <Table
        heads={["Component", "Location", "Notes"]}
        rows={[
          ["Data members (non-static)", "Per-object: each object has its own copy on stack or heap", "Laid out sequentially by order of declaration"],
          ["Static data members", "In static/global storage: ONE copy shared by all objects", "Exists even if no objects are created; must be defined outside class"],
          ["Member functions", "In code segment: ONE copy shared by all objects", "The this pointer differentiates which object is being operated on"],
          ["vptr (virtual pointer)", "Per-object: hidden first member if class has virtual functions", "Points to the class's vtable; added automatically by compiler"],
          ["vtable", "In read-only data: ONE per class (not per object)", "Array of function pointers for all virtual functions in that class"],
        ]}
      />

      <H2>The `this` Pointer</H2>
      <Code>{`// C++ - this is a const pointer to the current object
class Counter {
    int count;
public:
    Counter& increment() {
        this->count++;      // explicit this usage
        return *this;       // return reference to self (enables chaining)
    }
    bool equals(Counter& other) {
        return this == &other;  // compare object identity
    }
    void set(int count) {
        this->count = count;    // disambiguate: member vs parameter with same name
    }
};
Counter c; c.increment().increment().increment();  // method chaining via *this

# Python - self is explicit (just a convention for the first parameter)
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1
        return self         # return self for chaining

    def __eq__(self, other):
        return self is other   # identity check

c = Counter()
c.increment().increment()   # chaining works because increment() returns self`}</Code>

      <H2>Static vs Class Method vs Instance Method (Python)</H2>
      <Table
        heads={["Method Type", "First Parameter", "Can Access", "Use Case"]}
        rows={[
          ["Instance method (default)", "self (instance)", "Instance attrs + class attrs via self.__class__", "Operations on specific objects"],
          ["@classmethod", "cls (class itself)", "Class attrs only; cannot access instance attrs", "Alternative constructors, factory methods, class-level state"],
          ["@staticmethod", "None", "No access to class or instance; pure function in namespace", "Utility/helper functions logically grouped with the class"],
        ]}
      />

      <QA q="How much memory does an object take? Do member functions count?" a="Only non-static data members contribute to an object's size (plus the vptr if the class has virtual functions, plus alignment/padding bytes). Member functions are stored once in the code segment, shared across all objects. Use sizeof(obj) in C++ to verify - it will show data + vptr (if any) + padding, but no function overhead. In Python, objects are heap-allocated with a reference count header, __dict__ (attribute dictionary), and a pointer to the class." />
      <QA q="What is the `this` pointer and can you use it inside a static member function?" a="In C++, this is an implicit const pointer automatically passed to every non-static member function, pointing to the object that called the function. It's how the compiler knows which object's data to access. Static member functions have NO this pointer because they don't operate on a specific object instance - they're class-level operations. Attempting to use this inside a static function is a compile error. In Python, self is the equivalent, but it's always explicit in the parameter list." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 - CONSTRUCTORS & DESTRUCTORS
══════════════════════════════════════════════════════ */
function SectionConstructors() {
  return (
    <div>
      <Note color="warning" icon="ti-settings">
        Constructors and destructors are the lifecycle managers of objects. Deep vs shallow copy via the copy constructor is one of the most critical interview topics in C++.
      </Note>

      <H2>Constructor Types</H2>
      <Table
        heads={["Type", "C++ Signature", "Python Equivalent", "Called When"]}
        rows={[
          ["Default", "ClassName() {}", "__init__(self)", "No arguments provided; compiler auto-generates if none defined"],
          ["Parameterized", "ClassName(int x, string s)", "__init__(self, x, s)", "Arguments passed at object creation"],
          ["Copy", "ClassName(const ClassName& obj)", "__init__(self, other) manually", "C++: object initialized from another of same type. Python: copy.copy() / copy.deepcopy()"],
          ["Move (C++11)", "ClassName(ClassName&& obj)", "N/A (GC handles)", "Transferring resources from temporary (rvalue) objects; avoids deep copy"],
          ["Delegating (C++11)", "ClassName() : ClassName(0, '') {}", "__init__ calling another helper", "One constructor calls another to avoid code duplication"],
        ]}
      />

      <H2>All Constructor Types - Code</H2>
      <Code>{`// ═══════════════ C++ ═══════════════
class String {
    char* data;
    int len;
public:
    // Default constructor
    String() : data(nullptr), len(0) {}

    // Parameterized constructor - member initializer list (preferred over body assignment)
    String(const char* s) {
        len = strlen(s);
        data = new char[len + 1];   // heap allocation
        strcpy(data, s);
    }

    // Copy constructor - DEEP copy (copies actual data, not just pointer)
    String(const String& other) {
        len = other.len;
        data = new char[len + 1];   // allocate NEW memory
        strcpy(data, other.data);   // copy content
    }

    // Move constructor (C++11) - steal resources from temporary
    String(String&& other) noexcept {
        data = other.data;    // steal the pointer
        len  = other.len;
        other.data = nullptr; // leave the source in valid empty state
        other.len  = 0;
    }

    // Destructor
    ~String() {
        delete[] data;    // free heap memory
    }
};

// ═══════════════ Python ═══════════════
import copy

class StringWrapper:
    def __init__(self, s=""):
        self.data = list(s)   # store as list (mutable)

    # Python has no automatic copy constructor
    # Use copy module instead
    def clone_shallow(self):
        return copy.copy(self)          # copies object; nested objects SHARED

    def clone_deep(self):
        return copy.deepcopy(self)      # recursively copies everything

s1 = StringWrapper("hello")
s2 = copy.copy(s1)           # shallow: s2.data is the SAME list object
s3 = copy.deepcopy(s1)       # deep: s3.data is a NEW list

s2.data.append('!')          # also modifies s1.data! (shared reference)
s3.data.append('?')          # only modifies s3.data (independent copy)`}</Code>

      <H2>Shallow Copy vs Deep Copy</H2>
      <Table
        heads={["Aspect", "Shallow Copy", "Deep Copy"]}
        rows={[
          ["What is copied", "Top-level object fields; pointers/references themselves", "The entire object graph recursively; new allocations for every nested object"],
          ["Pointer members", "Both objects share the SAME heap memory", "Each object has its OWN heap copy"],
          ["Modification effect", "Modifying heap data through one object affects the other", "Each object is fully independent"],
          ["C++ default behavior", "Compiler-generated copy constructor does shallow copy (memberwise copy)", "Must write custom copy constructor to do deep copy"],
          ["Python default", "copy.copy() = shallow; copy.deepcopy() = deep", "Assignment (=) copies the REFERENCE, not the object at all"],
          ["Danger", "Double free: both destructor calls try to delete the same pointer", "Higher cost: O(n) time and space proportional to object graph"],
        ]}
      />
      <Note color="danger" icon="ti-alert-triangle">
        <strong>The Rule of Three / Five (C++):</strong> If you define any of: destructor, copy constructor, copy assignment operator - you should define ALL THREE (Rule of 3). In C++11, extend to Rule of 5 (add move constructor and move assignment). The compiler's auto-generated versions do shallow copy, which causes double-free bugs when the class owns heap memory.
      </Note>

      <H2>Constructor Rules and Restrictions</H2>
      <Table
        heads={["Rule", "C++", "Python"]}
        rows={[
          ["Return type", "NONE - not even void", "__init__ must return None implicitly"],
          ["Same name as class", "Yes, mandatory", "Always named __init__"],
          ["Can be virtual?", "No - vtable not set up at construction time yet", "N/A"],
          ["Can be inherited?", "No - but derived can call base via initializer list", "No - but super().__init__() chains them"],
          ["Can be overloaded?", "Yes - multiple with different signatures", "No - only one __init__; use default args or *args/**kwargs"],
          ["Address can be taken?", "No", "N/A"],
          ["Private constructor?", "Valid - restricts who can create objects (Singleton pattern)", "Convention only with __init__"],
        ]}
      />

      <H2>Initializer List vs Constructor Body (C++)</H2>
      <Code>{`class Person {
    const string name;  // const member: MUST use initializer list
    int& age_ref;       // reference member: MUST use initializer list
    int score;
public:
    // Initializer list: members initialized BEFORE constructor body runs
    // Order of initialization = order of DECLARATION in class, not list order
    Person(const string& n, int& a, int s)
        : name(n), age_ref(a), score(s) {}
    // Equivalent using body assignment (NOT valid for const/reference members):
    // Person(const string& n, int& a, int s) { name = n; ... }  // ERROR for const

    // Delegating constructor (C++11)
    Person() : Person("Unknown", some_age, 0) {}  // calls the above
};
// When MUST you use initializer list?
// 1. const data members       2. Reference data members
// 3. Base class constructors  4. Members without default constructors`}</Code>

      <H2>Python `__init__` Patterns</H2>
      <Code>{`# Multiple "constructors" via classmethods (factory pattern)
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    @classmethod
    def from_tuple(cls, tup):           # alternative constructor
        return cls(tup[0], tup[1])

    @classmethod
    def origin(cls):
        return cls(0, 0)

    @classmethod
    def from_polar(cls, r, theta):
        import math
        return cls(r * math.cos(theta), r * math.sin(theta))

p1 = Point(3, 4)
p2 = Point.from_tuple((3, 4))
p3 = Point.origin()

# __new__ vs __init__: __new__ creates the object; __init__ initializes it
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance   # always returns the same object

    def __init__(self):
        pass  # called every time, but object is the same

a = Singleton()
b = Singleton()
print(a is b)   # True - same object`}</Code>

      <H2>Destructor Behavior</H2>
      <Table
        heads={["Aspect", "C++ ~ClassName()", "Python __del__(self)"]}
        rows={[
          ["Timing", "Deterministic: called exactly when object goes out of scope or delete called", "Non-deterministic: called eventually by GC; order not guaranteed"],
          ["Purpose", "Free heap memory, close file handles, release locks", "Cleanup; but prefer context managers (__enter__/__exit__) in Python"],
          ["Can it be virtual?", "YES - and should be for polymorphic base classes", "N/A"],
          ["Called on delete[]", "For arrays: destructor called for each element in reverse order", "N/A"],
          ["Inheritance", "Derived destructor runs first, then base (reverse of construction)", "Same if __del__ defined"],
          ["Best practice Python", "N/A", "Use with statement / context managers; __del__ is unreliable"],
        ]}
      />
      <Note color="danger" icon="ti-alert-triangle">
        <strong>Always declare a virtual destructor in C++ base classes</strong> that have virtual functions. If you delete a derived object through a base pointer and the destructor is non-virtual, only the base destructor runs. The derived class's destructor (which frees its heap memory) is never called - a memory leak.
      </Note>

      <QA q="Why can a copy constructor parameter NOT be passed by value (e.g., A(A obj))?" a="Passing by value requires making a copy of the argument, which calls the copy constructor. That copy constructor call again needs to pass by value, which calls the copy constructor again - infinite recursion causing a stack overflow and compile error. The parameter MUST be a reference: A(const A& obj). The const ensures the source object isn't accidentally modified." />
      <QA q="What is the difference between copy constructor and assignment operator in C++?" a="The copy constructor (ClassName(const ClassName& other)) is called when a NEW object is initialized from an existing one: String s2 = s1; or String s2(s1); - both call the copy constructor. The assignment operator (operator=) is called when an EXISTING object is reassigned: s2 = s1; where s2 was already created. The assignment operator must handle self-assignment (s = s) and free old resources before copying new ones. If your class owns heap memory, you need both - this is part of the Rule of Three." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 - INHERITANCE
══════════════════════════════════════════════════════ */
function SectionInheritance() {
  return (
    <div>
      <Note color="purple" icon="ti-hierarchy">
        Inheritance builds IS-A relationships. The derived class inherits the interface AND implementation of the base (minus private members). Understanding access rules, constructor chaining, and the diamond problem is essential for interviews.
      </Note>

      <H2>Five Types of Inheritance</H2>
      <InheritViz />
      <Table
        heads={["Type", "Definition", "C++ Syntax", "Python Syntax"]}
        rows={[
          ["Single", "One base, one derived", "class D : public B {}", "class D(B):"],
          ["Multiple", "One derived, multiple bases", "class D : public B1, public B2 {}", "class D(B1, B2):"],
          ["Multilevel", "A -> B -> C (chain)", "class C : public B {}; class B : public A {}", "class C(B): ... class B(A):"],
          ["Hierarchical", "One base, many derived", "class D1 : public B {}; class D2 : public B {}", "class D1(B): ... class D2(B):"],
          ["Hybrid", "Combination; causes diamond problem if not handled", "Requires virtual inheritance", "Handled automatically by C3 MRO"],
        ]}
      />

      <H2>Constructor and Destructor Order in Inheritance</H2>
      <Table
        heads={["Event", "Order"]}
        rows={[
          ["Construction", "Base class constructor runs FIRST, then derived (outermost last). Grandparent -> Parent -> Child."],
          ["Destruction", "REVERSE of construction: Child destructor runs FIRST, then parent, then grandparent."],
          ["Reason", "Derived class setup may depend on base class being initialized first. Destruction in reverse ensures derived doesn't use invalidated base data."],
          ["C++ explicit", "Derived constructor must call base via initializer list: Derived() : Base(args) {}"],
          ["Python explicit", "super().__init__(args) in derived __init__"],
        ]}
      />
      <Code>{`// ═══════════════ C++ Inheritance ═══════════════
class Animal {
protected:
    string name;
    int age;
public:
    Animal(string n, int a) : name(n), age(a) {
        cout << "Animal constructor\\n";
    }
    virtual void speak() { cout << "...\\n"; }  // virtual for overriding
    virtual ~Animal() { cout << "Animal destructor\\n"; } // virtual destructor!
};

class Dog : public Animal {
    string breed;
public:
    Dog(string n, int a, string b)
        : Animal(n, a), breed(b) {       // calls base constructor in initializer list
        cout << "Dog constructor\\n";
    }
    void speak() override { cout << "Woof! I'm " << name << "\\n"; }
    ~Dog() override { cout << "Dog destructor\\n"; }
};

// Output when creating Dog d("Rex", 3, "Lab"):
// Animal constructor
// Dog constructor
// Output when d goes out of scope:
// Dog destructor
// Animal destructor

// ═══════════════ Python Inheritance ═══════════════
class Animal:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        print("Animal __init__")

    def speak(self):
        print("...")

class Dog(Animal):
    def __init__(self, name: str, age: int, breed: str):
        super().__init__(name, age)   # calls Animal.__init__
        self.breed = breed
        print("Dog __init__")

    def speak(self):                  # method override
        print(f"Woof! I'm {self.name}")

d = Dog("Rex", 3, "Labrador")
d.speak()                             # calls Dog.speak() (runtime polymorphism)
print(isinstance(d, Animal))         # True - IS-A relationship
print(isinstance(d, Dog))            # True`}</Code>

      <H2>The Diamond Problem</H2>
      <Code>{`// C++ Diamond Problem - ambiguity without virtual inheritance
class A { public: int x = 10; };
class B : public A {};   // B has its own copy of A
class C : public A {};   // C has its own copy of A
class D : public B, public C {};  // D has TWO copies of A!

D obj;
// obj.x;        // ERROR: ambiguous - which A::x? B's or C's?
obj.B::x;        // OK: explicitly pick B's copy
obj.C::x;        // OK: explicitly pick C's copy

// FIX: virtual inheritance - only ONE shared copy of A
class B : virtual public A {};
class C : virtual public A {};
class D : public B, public C {};  // Now D has exactly ONE copy of A
D obj2;
obj2.x;          // OK: unambiguous

// Python Diamond - handled automatically by C3 MRO
class A:
    def show(self): print("A")

class B(A):
    def show(self): print("B")

class C(A):
    def show(self): print("C")

class D(B, C):
    pass

d = D()
d.show()          # prints "B" - C3 MRO: D -> B -> C -> A -> object
print(D.__mro__)  # (<class D>, <class B>, <class C>, <class A>, <class object>)`}</Code>

      <H2>Python C3 MRO (Method Resolution Order)</H2>
      <MROViz />
      <P>Python resolves method lookup order using the <strong>C3 linearization algorithm</strong>. It guarantees: (1) a class always appears before its parents in the MRO, (2) the order of parents is preserved, (3) each class appears exactly once.</P>
      <Code>{`# Check MRO for any class
print(D.__mro__)         # tuple of classes in resolution order
print(D.mro())           # same, as a list

# super() follows MRO, not just "the parent class"
class A:
    def method(self): print("A"); super().method() if hasattr(super(), 'method') else None

class B(A):
    def method(self): print("B"); super().method()

class C(A):
    def method(self): print("C"); super().method()

class D(B, C):
    def method(self): print("D"); super().method()

D().method()   # D, B, C, A - each super() follows MRO, not just immediate parent`}</Code>

      <H2>`isinstance` vs `type` vs `issubclass`</H2>
      <Table
        heads={["Function", "What it checks", "Inheritance-aware?"]}
        rows={[
          ["type(obj) == ClassName", "Exact type match only", "No - returns False for subclasses"],
          ["isinstance(obj, ClassName)", "Is obj an instance of ClassName or any subclass?", "Yes - returns True for subclasses"],
          ["issubclass(Child, Parent)", "Is Child a subclass of Parent (direct or indirect)?", "Yes"],
          ["isinstance(obj, (A, B))", "Is obj an instance of A OR B?", "Yes - accepts tuple of types"],
        ]}
      />

      <QA q="What is the difference between method overriding and method hiding (function hiding) in C++?" a="Method overriding works with virtual functions: the derived class provides a new implementation, and calling via a base pointer invokes the derived version at runtime. Method hiding (without virtual): when a derived class defines a function with the same name as a base class non-virtual function, the derived version HIDES the base version - only for direct calls on derived objects. Calling via a base pointer still invokes the base version (early/static binding). In Python, all method resolution uses MRO and is always the most-derived version, so there is no distinction." />
      <QA q="In C++, can a derived class access private members of the base class? What about private with public inheritance?" a="No. Private members of the base class are NEVER directly accessible in derived classes, regardless of inheritance type (public/protected/private). They are inherited (they exist in the derived object's memory) but inaccessible by name. The derived class can only access them indirectly through public or protected member functions of the base class. This is a very common interview trick question." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 - POLYMORPHISM
══════════════════════════════════════════════════════ */
function SectionPolymorphism() {
  return (
    <div>
      <Note color="purple" icon="ti-shapes">
        Polymorphism is arguably the most interview-tested OOP concept. Be crystal clear on the <strong>compile-time vs runtime</strong> distinction, how Python achieves polymorphism via duck typing, and when to use each form.
      </Note>

      <H2>Compile-Time vs Runtime Polymorphism</H2>
      <Table
        heads={["Property", "Compile-Time (Static)", "Runtime (Dynamic)"]}
        rows={[
          ["Also called", "Early binding, static binding", "Late binding, dynamic binding"],
          ["Resolution time", "At compile time - compiler selects the function", "At runtime - decided based on actual object type"],
          ["Mechanism in C++", "Function overloading, operator overloading, templates", "Virtual functions + base class pointers/references"],
          ["Mechanism in Python", "No true compile-time OL; duck typing; __dunder__ overloading", "All method calls resolved at runtime via MRO"],
          ["Speed", "Faster - no lookup overhead", "Slight overhead due to vtable indirection"],
          ["Flexibility", "Less flexible - must know types at compile time", "More flexible - new derived classes work automatically"],
        ]}
      />

      <H2>Function Overloading (Compile-Time - C++)</H2>
      <Code>{`// C++ supports true function overloading
// Same name, different parameter types/count - compiler picks at compile time
class Calculator {
public:
    int    add(int a, int b)          { return a + b; }
    double add(double a, double b)    { return a + b; }
    int    add(int a, int b, int c)   { return a + b + c; }
    string add(string a, string b)    { return a + b; }
};

Calculator c;
c.add(1, 2);           // calls int version
c.add(1.5, 2.5);       // calls double version
c.add(1, 2, 3);        // calls three-arg version

// Python: NO true overloading - later definition overwrites earlier
# def add(a, b): return a + b
# def add(a, b, c): return a+b+c   # this replaces the first add!
# Workaround: default args or *args
def add(*args):
    return sum(args)  # handles any number of arguments`}</Code>

      <H2>Operator Overloading</H2>
      <Code>{`// ═══════════════ C++ ═══════════════
class Vector2D {
public:
    double x, y;
    Vector2D(double x, double y) : x(x), y(y) {}

    // Binary operator as member function (1 arg: right operand)
    Vector2D operator+(const Vector2D& other) const {
        return Vector2D(x + other.x, y + other.y);
    }
    // Unary operator as member function (0 args)
    Vector2D operator-() const { return Vector2D(-x, -y); }

    // Comparison operators
    bool operator==(const Vector2D& other) const {
        return x == other.x && y == other.y;
    }
    bool operator<(const Vector2D& other) const {
        return (x*x + y*y) < (other.x*other.x + other.y*other.y);
    }

    // Stream insertion as friend function (needs access to private data)
    friend ostream& operator<<(ostream& os, const Vector2D& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }
};
// Operators that CANNOT be overloaded: .  .*  ::  sizeof  ?:

// ═══════════════ Python - dunder methods ═══════════════
class Vector2D:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):          return Vector2D(self.x+other.x, self.y+other.y)
    def __sub__(self, other):          return Vector2D(self.x-other.x, self.y-other.y)
    def __mul__(self, scalar):         return Vector2D(self.x*scalar,  self.y*scalar)
    def __neg__(self):                 return Vector2D(-self.x, -self.y)
    def __eq__(self, other):           return self.x==other.x and self.y==other.y
    def __lt__(self, other):           return abs(self) < abs(other)
    def __abs__(self):
        import math
        return math.sqrt(self.x**2 + self.y**2)
    def __repr__(self):                return f"Vector2D({self.x}, {self.y})"
    def __str__(self):                 return f"({self.x}, {self.y})"
    def __len__(self):                 return 2       # "length" = 2D
    def __getitem__(self, idx):        return (self.x, self.y)[idx]

v1 = Vector2D(1, 2)
v2 = Vector2D(3, 4)
print(v1 + v2)      # calls __add__    -> (4, 6)
print(-v1)          # calls __neg__    -> (-1, -2)
print(v1 == v2)     # calls __eq__     -> False
print(len(v1))      # calls __len__    -> 2`}</Code>

      <H2>Operator Overloading Rules (C++)</H2>
      <Table
        heads={["Rule", "Detail"]}
        rows={[
          ["Cannot create new operators", "Only existing operators can be overloaded (+, -, *, [], (), etc.)"],
          ["Cannot change arity", "Unary stays unary; binary stays binary"],
          ["Cannot change precedence/associativity", "Overloaded + has same precedence as built-in +"],
          ["Non-overloadable", ". (dot), .* (ptr-to-member), :: (scope), sizeof, ?: (ternary)"],
          ["Member vs friend", "Unary: 0 args as member / 1 arg as friend. Binary: 1 arg as member / 2 args as friend"],
          ["= () [] -> must be member", "These four operators MUST be overloaded as non-static member functions"],
        ]}
      />

      <H2>Duck Typing in Python (Runtime Polymorphism)</H2>
      <Code>{`# Python's duck typing: "if it walks like a duck and quacks like a duck, it's a duck"
# No inheritance required - just implement the right interface

class Dog:
    def speak(self):  return "Woof!"
    def __str__(self): return "Dog"

class Cat:
    def speak(self):  return "Meow!"
    def __str__(self): return "Cat"

class Robot:
    def speak(self):  return "Beep boop."
    def __str__(self): return "Robot"

def make_noise(entity):    # no type annotation required; works for any object with speak()
    print(f"{entity}: {entity.speak()}")

animals = [Dog(), Cat(), Robot()]
for a in animals:
    make_noise(a)           # polymorphic call - resolved at runtime via MRO

# Typed duck typing with Protocol (Python 3.8+)
from typing import Protocol

class Speakable(Protocol):
    def speak(self) -> str: ...    # structural subtyping - no explicit inheritance needed

def greet(s: Speakable) -> None:
    print(s.speak())               # type checker accepts Dog, Cat, Robot`}</Code>

      <H2>Key Python Dunder Methods Reference</H2>
      <Table
        heads={["Category", "Method", "Triggered By"]}
        rows={[
          ["Construction", "__new__, __init__, __del__", "Object creation, initialization, destruction"],
          ["String representation", "__str__, __repr__", "str(obj), print(obj) / repr(obj), interactive shell"],
          ["Arithmetic", "__add__, __sub__, __mul__, __truediv__, __floordiv__, __mod__, __pow__", "obj + other, -, *, /, //, %, **"],
          ["Right-side arithmetic", "__radd__, __rsub__, etc.", "other + obj when other doesn't support the operation"],
          ["In-place arithmetic", "__iadd__, __isub__, etc.", "obj += other"],
          ["Comparison", "__eq__, __ne__, __lt__, __le__, __gt__, __ge__", "==, !=, <, <=, >, >="],
          ["Container", "__len__, __getitem__, __setitem__, __delitem__, __contains__, __iter__, __next__", "len(obj), obj[key], obj[key]=v, del obj[key], x in obj, iter/next"],
          ["Callable", "__call__", "obj(args) - makes an object callable like a function"],
          ["Context manager", "__enter__, __exit__", "with obj as x:"],
          ["Attribute access", "__getattr__, __setattr__, __delattr__, __getattribute__", "obj.attr, obj.attr=v, del obj.attr"],
          ["Boolean", "__bool__", "bool(obj), if obj:"],
          ["Hashing", "__hash__", "hash(obj), dict keys, set membership"],
        ]}
      />

      <QA q="Why can Python not truly overload functions, and how do you achieve similar behavior?" a="Python uses a single global namespace for function names - defining a second function with the same name simply overwrites the first. There is no compile-time signature resolution because Python is dynamically typed. Workarounds: (1) default arguments: def add(a, b, c=None), (2) *args/**kwargs for variable arguments, (3) functools.singledispatch for type-based dispatch, (4) manually inspect types inside the function. For method overloading specifically, Python 3.11+ adds @overload from typing for type hints (but still one actual implementation)." />
      <QA q="What is the difference between __str__ and __repr__ in Python?" a="__repr__ should return an unambiguous, developer-facing string that ideally can be used to recreate the object: eval(repr(obj)) == obj when possible. __str__ should return a human-friendly, readable string. When you call print(obj) or str(obj), Python calls __str__ first, then falls back to __repr__ if __str__ is not defined. In the interactive shell and for debugging, __repr__ is used. Rule of thumb: always implement __repr__; add __str__ when a different human-readable format is needed." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6 - VIRTUAL FUNCTIONS & ABSTRACT CLASSES
══════════════════════════════════════════════════════ */
function SectionVirtual() {
  return (
    <div>
      <Note color="danger" icon="ti-cpu">
        Virtual functions and the vtable mechanism are deep C++ internals that appear in system-level interviews. Python achieves similar behavior transparently via its attribute lookup system.
      </Note>

      <H2>Virtual Function Rules (C++)</H2>
      <Table
        heads={["Rule", "Detail"]}
        rows={[
          ["Must be class member", "Cannot be a standalone global function; must be declared inside a class"],
          ["Cannot be static", "Static functions have no this pointer; virtual dispatch requires an object"],
          ["Cannot be a constructor", "Vtable is set up during construction - virtual constructors are logically impossible"],
          ["CAN be a destructor", "Virtual destructor is essential for polymorphic base classes (prevents memory leaks)"],
          ["CAN be a friend", "A virtual function in class A can be a friend of class B"],
          ["override keyword (C++11)", "Use override in derived class to tell compiler 'I intend to override a virtual function'; catches typos"],
          ["final keyword (C++11)", "Use final to prevent further overriding in subclasses; or final on a class to prevent further inheritance"],
          ["Pure virtual = 0", "virtual void f() = 0; makes the class abstract; derived MUST implement it"],
        ]}
      />

      <H2>Vtable Mechanism Step-Through</H2>
      <VtableViz />

      <H2>Pure Virtual Functions and Abstract Classes</H2>
      <Code>{`// ═══════════════ C++ Abstract Base Class ═══════════════
class Shape {  // Abstract class: has at least one pure virtual function
public:
    virtual double area() = 0;         // pure virtual - no implementation here
    virtual double perimeter() = 0;    // derived classes MUST implement both
    virtual void draw() {              // regular virtual - has default, can override
        cout << "Drawing shape\\n";
    }
    virtual ~Shape() {}                // virtual destructor essential!

    // Non-virtual: common behavior for all shapes
    void print_info() {
        cout << "Area: " << area() << ", Perimeter: " << perimeter() << "\\n";
    }
};
// Shape s;  // ERROR: cannot instantiate abstract class

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override     { return 3.14159 * r * r; }
    double perimeter() override{ return 2 * 3.14159 * r; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() override     { return w * h; }
    double perimeter() override{ return 2 * (w + h); }
};

// Polymorphic container of base pointers - works for any Shape subclass
vector<Shape*> shapes = { new Circle(5), new Rectangle(3, 4) };
for (Shape* s : shapes) {
    s->print_info();   // runtime dispatch: correct area/perimeter for each shape
}

// ═══════════════ Python ABC Module ═══════════════
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...       # must be overridden in subclasses

    @abstractmethod
    def perimeter(self) -> float: ...

    def draw(self):                    # concrete method (can be overridden)
        print("Drawing shape")

    def print_info(self):              # non-abstract: shared behavior
        print(f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}")

# Shape()   # TypeError: Can't instantiate abstract class

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self):        return 3.14159 * self.r ** 2
    def perimeter(self):   return 2 * 3.14159 * self.r

class Rectangle(Shape):
    def __init__(self, w, h): self.w, self.h = w, h
    def area(self):        return self.w * self.h
    def perimeter(self):   return 2 * (self.w + self.h)

shapes: list[Shape] = [Circle(5), Rectangle(3, 4)]
for s in shapes:
    s.print_info()`}</Code>

      <H2>Virtual Destructor - Why It Matters</H2>
      <Code>{`// WITHOUT virtual destructor - memory leak!
class Base {
    int* data;
public:
    Base()  { data = new int[100]; }
    ~Base() { delete[] data; cout << "Base deleted\\n"; }  // non-virtual
};
class Derived : public Base {
    double* extra;
public:
    Derived()  { extra = new double[50]; }
    ~Derived() { delete[] extra; cout << "Derived deleted\\n"; }
};

Base* ptr = new Derived();
delete ptr;
// Calls only Base::~Base() - Derived::~Derived() NEVER called!
// extra is leaked - 400 bytes of memory gone forever.

// WITH virtual destructor - correct!
class Base {
public:
    virtual ~Base() { cout << "Base deleted\\n"; }  // virtual!
};
// Now delete ptr; calls Derived::~Derived() first, then Base::~Base()`}</Code>

      <H2>Interfaces: C++ vs Python</H2>
      <Table
        heads={["Concept", "C++", "Python"]}
        rows={[
          ["Interface definition", "Abstract class with all pure virtual functions; no data members", "ABC with all @abstractmethod; or Protocol class"],
          ["Enforce implementation", "Compiler error if derived doesn't implement all pure virtual", "TypeError at instantiation time"],
          ["Multiple interface inheritance", "class D : public IFlyable, public ISwimmable {}", "class D(IFlyable, ISwimmable):"],
          ["Protocol (structural)", "N/A (requires explicit inheritance)", "typing.Protocol: no inheritance needed; just implement the methods"],
          ["Concrete check", "static_assert or concept constraints (C++20)", "isinstance(obj, ABC), hasattr(obj, 'method')"],
        ]}
      />

      <H2>`override` and `final` Keywords (C++11)</H2>
      <Code>{`class Base {
    virtual void foo(int x);
    virtual void bar();
};

class Derived : public Base {
    void foo(int x) override;    // OK: correctly overrides Base::foo
    void foo(double x) override; // COMPILE ERROR: no Base::foo(double) to override
                                 // without override, this would silently create a new function!

    void bar() final override;   // overrides Base::bar AND prevents further overriding
};

class MostDerived : public Derived {
    void bar() override;  // COMPILE ERROR: bar() is final in Derived
};

class NoInherit final : public Base { /* ... */ };
// class Further : public NoInherit {};  // ERROR: NoInherit is final`}</Code>

      <QA q="What is the difference between a virtual function and a pure virtual function?" a="A virtual function has an implementation in the base class but allows derived classes to override it. Objects of both the base class and derived classes can be created. A pure virtual function (= 0) has NO implementation in the base class (just a declaration), makes the class abstract (cannot be instantiated), and forces every concrete derived class to provide an implementation. If a derived class doesn't implement a pure virtual function, it also becomes abstract. Pure virtual functions define an interface contract that all subclasses must fulfill." />
      <QA q="Can a class in C++ be abstract but have a non-pure virtual function? Can an abstract class have a constructor?" a="Yes on both. A class is abstract if it has AT LEAST ONE pure virtual function - the rest of its virtual functions can be regular virtual with implementations. An abstract class CAN have a constructor, and it WILL be called when a derived concrete class is instantiated (via derived's initializer list or super().__init__). The constructor is used to initialize the abstract class's own data members. The restriction is only that you cannot create an object of the abstract class directly." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 7 - ENCAPSULATION, ABSTRACTION & PROPERTIES
══════════════════════════════════════════════════════ */
function SectionEncapsulation() {
  return (
    <div>
      <Note color="info" icon="ti-lock">
        Encapsulation controls access. Abstraction controls exposure. Together they form the boundary between a class's public contract and its private implementation. This boundary is what makes code maintainable and testable.
      </Note>

      <H2>Encapsulation in Depth</H2>
      <Code>{`// ═══════════════ C++ Encapsulation ═══════════════
class Temperature {
private:
    double celsius;               // data hidden from outside world

public:
    Temperature(double c) : celsius(c) {}

    // Getter: read-only access
    double get_celsius() const { return celsius; }

    // Computed getters - expose different views of same data
    double get_fahrenheit() const { return celsius * 9.0/5.0 + 32; }
    double get_kelvin()     const { return celsius + 273.15; }

    // Setter with validation - not just a raw assignment
    void set_celsius(double c) {
        if (c < -273.15) throw invalid_argument("Below absolute zero");
        celsius = c;
    }
    // Const member function: guarantees it won't modify the object
    // Called on const objects or const references
    string to_string() const {
        return to_string(celsius) + " C";
    }
};
const Temperature t(100.0);
// t.celsius = 200;          // COMPILE ERROR: private
t.get_celsius();             // OK: public getter
t.to_string();               // OK: const method

# ═══════════════ Python Encapsulation ═══════════════
class Temperature:
    def __init__(self, celsius: float):
        self.__celsius = celsius      # name mangled to _Temperature__celsius

    @property
    def celsius(self) -> float:
        return self.__celsius

    @celsius.setter
    def celsius(self, value: float):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self.__celsius = value

    @property
    def fahrenheit(self) -> float:    # computed property - no setter (read-only)
        return self.__celsius * 9/5 + 32

    @property
    def kelvin(self) -> float:
        return self.__celsius + 273.15

t = Temperature(100)
print(t.fahrenheit)      # 212.0 - looks like attribute access, but calls getter
t.celsius = 200          # calls setter with validation
# t.fahrenheit = 300     # AttributeError: no setter defined (read-only property)`}</Code>

      <H2>Python Property Decorator Patterns</H2>
      <Table
        heads={["Pattern", "Code", "Effect"]}
        rows={[
          ["Read-only property", "@property def x(self): return self.__x", "Access via obj.x; no assignment allowed"],
          ["Read-write property", "@property + @x.setter", "Getter and setter with validation"],
          ["Deletable property", "@property + @x.setter + @x.deleter", "del obj.x triggers cleanup logic"],
          ["Cached property (3.8+)", "@functools.cached_property", "Computed once on first access; cached as instance attribute thereafter"],
          ["Class property (no built-in)", "@classmethod + @property combo", "Property on the class itself, not instance"],
        ]}
      />

      <H2>Friend Functions and Classes (C++)</H2>
      <Code>{`class Matrix;  // forward declaration needed

class Vector {
    double x, y;
public:
    Vector(double x, double y) : x(x), y(y) {}

    // dot product needs access to Matrix private members
    friend double dot_product(const Vector& v, const Matrix& m);  // friend function
    friend class Matrix;  // ALL Matrix member functions can access Vector's private members
};

class Matrix {
    double data[2][2];
public:
    Matrix(double a, double b, double c, double d) {
        data[0][0]=a; data[0][1]=b; data[1][0]=c; data[1][1]=d;
    }
    // Can access Vector's private members because Matrix is a friend of Vector
    Vector multiply(const Vector& v) const {
        return Vector(
            data[0][0]*v.x + data[0][1]*v.y,   // accesses v.x, v.y (private!)
            data[1][0]*v.x + data[1][1]*v.y
        );
    }
};
// Key facts about friend functions:
// 1. Declared inside the class but NOT a member function
// 2. Not inherited - friendship is not transitive
// 3. Must use object.member syntax; no direct variable access without object
// 4. Can be a member of another class
// 5. A class cannot make itself a friend of another class (only B can friend A)`}</Code>

      <H2>Const Correctness (C++)</H2>
      <Table
        heads={["Construct", "Meaning", "Example"]}
        rows={[
          ["const data member", "Cannot be changed after construction; MUST use initializer list", "const int id;"],
          ["const member function", "Function promises not to modify the object; can be called on const objects", "int get() const { return x; }"],
          ["const object", "All member functions must be const to be callable; data is read-only", "const MyClass obj(5);"],
          ["mutable", "Exception: a mutable member CAN be modified even inside a const function (for caching)", "mutable int cache;"],
          ["const reference parameter", "Pass large object without copy; prevent modification", "void f(const MyClass& obj)"],
        ]}
      />

      <H2>Static Members</H2>
      <Code>{`// ═══════════════ C++ Static Members ═══════════════
class Counter {
    static int count;        // declaration - ONE copy for entire class
    int id;
public:
    Counter() : id(++count) {}
    ~Counter() { --count; }

    static int get_count() { return count; }   // static function: no 'this'
    // static functions CANNOT access non-static members (no this pointer)
    // static int get_id() { return id; }  // ERROR: no 'this'
};
int Counter::count = 0;   // definition + initialization OUTSIDE class

Counter a, b, c;
cout << Counter::get_count();   // 3 - called via class name, no object needed
// cout << a.get_count();       // also valid but misleading style

# ═══════════════ Python Static Members ═══════════════
class Counter:
    count = 0           # class variable (equivalent to C++ static member)

    def __init__(self):
        Counter.count += 1
        self.id = Counter.count

    def __del__(self):
        Counter.count -= 1

    @staticmethod
    def get_count():           # no access to class or instance
        return Counter.count

    @classmethod
    def reset(cls):            # receives cls - can modify class state
        cls.count = 0

a = Counter()
print(Counter.get_count())     # 1
print(Counter.count)           # 1 - also directly accessible`}</Code>

      <QA q="What is const correctness in C++ and why does it matter?" a="Const correctness is the practice of declaring every variable, parameter, and member function as const wherever they should not be modified. Benefits: (1) The compiler catches accidental modifications - a safety net. (2) Const functions can be called on const objects and const references - without this, many read-only operations would fail to compile. (3) It communicates intent clearly to other developers. (4) The compiler may optimize const objects better. Rule: start everything as const and remove const only when mutation is genuinely needed." />
      <QA q="What are the rules for friend functions in C++, and is friendship transitive or inherited?" a="Friend functions have full access to all private and protected members of the class that declared them. Key rules: (1) Friendship is NOT transitive: if A friends B and B friends C, C is NOT a friend of A. (2) Friendship is NOT inherited: a derived class does not inherit its base class's friendships. (3) Friendship must be explicitly declared inside the class being opened - a class cannot unilaterally declare itself a friend of another. (4) Friend functions are not member functions - no this pointer, must use object.member syntax." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 8 - MEMORY MANAGEMENT
══════════════════════════════════════════════════════ */
function SectionMemory() {
  return (
    <div>
      <Note color="warning" icon="ti-server">
        Memory management is a crucial differentiator between C++ and Python. C++ gives you full control (and full responsibility). Python abstracts it away. Understanding both models is essential for systems and application engineering interviews.
      </Note>

      <H2>Memory Regions</H2>
      <Table
        heads={["Region", "Contents", "Lifetime", "Management"]}
        rows={[
          ["Stack", "Local variables, function parameters, return addresses", "Auto: freed when function returns (LIFO)", "Automatic - no programmer action needed"],
          ["Heap", "Dynamic allocations (new/malloc / Python objects)", "Manual in C++ (new/delete); GC in Python", "C++: programmer; Python: garbage collector"],
          ["Static / Global", "Static variables, global variables, static class members", "Program lifetime", "Automatic - freed at program exit"],
          ["Code Segment (Text)", "Compiled machine code, vtables, string literals", "Program lifetime", "Read-only; managed by OS loader"],
          ["BSS Segment", "Uninitialized global/static variables (auto-zeroed)", "Program lifetime", "OS zeroes at load time"],
        ]}
      />

      <H2>C++: new / delete vs malloc / free</H2>
      <Table
        heads={["Property", "malloc / free (C)", "new / delete (C++)"]}
        rows={[
          ["Type", "Standard library function (#include <cstdlib>)", "Operator built into the language"],
          ["Return type", "void* - requires explicit cast", "Typed pointer - no cast needed"],
          ["Constructor/Destructor", "Does NOT call them", "new calls constructor; delete calls destructor"],
          ["On failure", "Returns NULL (must check)", "Throws std::bad_alloc exception"],
          ["Size computation", "You compute: malloc(n * sizeof(T))", "Compiler computes: new T[n]"],
          ["Overloadable?", "No", "Yes - operator new can be overloaded per class"],
          ["Array version", "malloc(n * sizeof(T)) - no special syntax", "new T[n] and delete[] p - MUST use [] for arrays"],
          ["Mixing?", "NEVER mix: new with free or malloc with delete - undefined behavior", "Same - use matching alloc/dealloc"],
        ]}
      />
      <Code>{`// ═══════════════ C++ Dynamic Memory ═══════════════
// Single object
int* p = new int(42);          // allocates + initializes to 42
delete p;                      // releases memory + calls destructor

// Array
int* arr = new int[10];
arr[0] = 1;                    // use like normal array
delete[] arr;                  // MUST use delete[] for arrays, not delete

// 2D array (manual)
int** matrix = new int*[rows];
for (int i = 0; i < rows; i++)
    matrix[i] = new int[cols];
// Deallocation must mirror allocation (innermost first):
for (int i = 0; i < rows; i++) delete[] matrix[i];
delete[] matrix;

// Check for allocation failure
try {
    int* huge = new int[1000000000];
} catch (const bad_alloc& e) {
    cerr << "Allocation failed: " << e.what() << endl;
}

// Placement new: construct object at pre-allocated address
char buffer[sizeof(MyClass)];
MyClass* obj = new(buffer) MyClass(args);  // no heap allocation!
obj->~MyClass();  // must manually call destructor`}</Code>

      <H2>Smart Pointers (C++11) - RAII</H2>
      <P><strong>RAII (Resource Acquisition Is Initialization):</strong> Bind resource lifetime to object lifetime. Constructor acquires; destructor releases. Smart pointers implement RAII for heap memory - no manual delete ever needed.</P>
      <Code>{`#include <memory>

// unique_ptr: EXCLUSIVE ownership - only one pointer owns the object
// Automatically deleted when pointer goes out of scope
unique_ptr<Dog> d1 = make_unique<Dog>("Rex", 3, "Lab");
// unique_ptr<Dog> d2 = d1;     // ERROR: cannot copy (unique ownership)
unique_ptr<Dog> d2 = move(d1);  // OK: transfer ownership; d1 is now nullptr

// shared_ptr: SHARED ownership - reference counted
// Deleted when last shared_ptr to it goes out of scope
shared_ptr<Dog> s1 = make_shared<Dog>("Buddy", 2, "Poodle");
shared_ptr<Dog> s2 = s1;        // both point to same Dog; ref count = 2
cout << s1.use_count();         // 2
s1.reset();                     // decrement ref count; ref count = 1; dog NOT deleted yet
s2.reset();                     // ref count = 0; Dog IS deleted here

// weak_ptr: NON-OWNING reference to shared_ptr - breaks circular references
weak_ptr<Dog> w = s1;           // doesn't increment ref count
if (auto locked = w.lock()) {   // must lock() to get a shared_ptr back
    locked->speak();            // safe to use while object still alive
}

// prefer make_unique/make_shared over raw new:
// Bad:  shared_ptr<Dog> p(new Dog(...));  // two allocations; exception-unsafe
// Good: auto p = make_shared<Dog>(...);  // one allocation; exception-safe`}</Code>

      <H2>Python Memory Management</H2>
      <Table
        heads={["Mechanism", "Description"]}
        rows={[
          ["Reference counting", "Every object has a ref count. When it drops to 0, memory is freed immediately. Fast and deterministic for most cases."],
          ["Cyclic GC", "Reference counting can't handle cycles (A -> B -> A). Python's cyclic GC periodically detects and breaks cycles."],
          ["Memory pools", "CPython uses a custom allocator (pymalloc) with pools for small objects (<= 512 bytes). Reduces malloc overhead."],
          ["Interning", "Small integers (-5 to 256) and short strings are interned - reused from a pool. Explains why a is b for small ints."],
          ["__slots__", "Replaces __dict__ with a fixed-size array for attribute storage. Reduces memory per object by ~40-50%."],
          ["gc module", "import gc; gc.collect() - manually triggers cyclic GC. gc.get_count() shows pending objects."],
        ]}
      />
      <Code>{`import sys, gc

# Reference counting
x = [1, 2, 3]
print(sys.getrefcount(x))   # 2 (x + temporary arg to getrefcount)

y = x                       # refcount becomes 3
del x                       # refcount drops to 2 (y still holds reference)
del y                       # refcount drops to 0 - list freed

# Circular reference (requires cyclic GC, not just refcounting)
a = {}
b = {}
a['b'] = b    # a references b
b['a'] = a    # b references a - CYCLE!
del a, del b  # refcounts drop to 1 (not 0!) - cyclic GC needed to clean up

# __slots__ for memory efficiency
class NormalPoint:
    def __init__(self, x, y): self.x = x; self.y = y
    # has __dict__: flexible but ~200+ bytes overhead per instance

class SlottedPoint:
    __slots__ = ('x', 'y')   # fixed attrs; no __dict__; ~50-60 bytes per instance
    def __init__(self, x, y): self.x = x; self.y = y

p1 = NormalPoint(1, 2)
p2 = SlottedPoint(1, 2)
# p2.z = 3   # AttributeError: __slots__ forbids new attributes

# Context managers for deterministic resource cleanup
with open('file.txt', 'r') as f:   # __enter__ opens; __exit__ closes (even on exception)
    data = f.read()
# f is closed here regardless of exceptions`}</Code>

      <H2>Common Memory Errors (C++) and Their Causes</H2>
      <Table
        heads={["Error", "Cause", "Tool to Detect"]}
        rows={[
          ["Memory leak", "Allocated with new; never deleted; pointer lost", "Valgrind, AddressSanitizer (ASan)"],
          ["Dangling pointer", "delete called; pointer still used after deletion", "ASan, Valgrind"],
          ["Double free", "delete called twice on same pointer; usually from shallow copy", "ASan"],
          ["Buffer overflow", "Writing beyond array bounds into adjacent memory", "ASan, bounds-checking containers"],
          ["Use after free", "Accessing freed memory; may corrupt heap metadata", "ASan, smart pointers"],
          ["Stack overflow", "Deep/infinite recursion exhausts stack space", "Debugger stack trace"],
          ["Wild pointer", "Pointer used before being initialized", "Always initialize: int* p = nullptr"],
        ]}
      />

      <QA q="What is RAII and why is it the correct way to manage resources in C++?" a="RAII (Resource Acquisition Is Initialization) ties a resource's lifetime to the lifetime of a stack-allocated RAII object. The constructor acquires the resource; the destructor releases it. Because C++ guarantees destructors run when objects go out of scope (including during exception unwinding), RAII ensures resources are ALWAYS released - no matter how the scope is exited. smart pointers, file handles, mutexes (std::lock_guard) all use RAII. Without RAII, every early return and every exception path requires manual cleanup - which developers inevitably forget." />
      <QA q="In Python, when does an object's __del__ get called and why is it unreliable?" a="__del__ is called when an object's reference count drops to 0 AND the cyclic GC has processed it (if it's part of a cycle). For simple objects with no cycles, it's called promptly. But: (1) in CPython, cycles prevent immediate deletion; (2) the order of __del__ calls between objects in a cycle is undefined; (3) exceptions inside __del__ are printed but ignored; (4) in alternative Python implementations (PyPy, Jython), GC timing is entirely different. For reliable cleanup, use context managers (__enter__/__exit__) with the with statement instead." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 9 - ADVANCED OOP FEATURES
══════════════════════════════════════════════════════ */
function SectionAdvanced() {
  return (
    <div>
      <Note color="success" icon="ti-sparkles">
        These are the interview-differentiating topics: local classes, nested classes, pointers to members, function pointers, and Python metaclasses. They test depth of understanding beyond surface-level OOP.
      </Note>

      <H2>Nested and Local Classes</H2>
      <Code>{`// ═══════════════ C++ Nested Classes ═══════════════
class LinkedList {
private:
    struct Node {           // nested class - Node is scoped inside LinkedList
        int data;
        Node* next;
        Node(int d) : data(d), next(nullptr) {}
        // Node has full access to LinkedList's private members (in most compilers)
    };
    Node* head = nullptr;

public:
    void push(int val) { head = new Node(val); }  // can use Node directly
};
// Outside: LinkedList::Node (still accessible if not private)

// Local class: defined inside a function
void process() {
    class Helper {          // exists ONLY inside process()
        int x;
    public:
        Helper(int x) : x(x) {}
        int value() const { return x; }
        // RESTRICTIONS:
        // - Cannot have static data members
        // - All methods must be defined INSIDE the class body
        // - Enclosing function has NO access to Helper's private members
    };
    Helper h(42);
    cout << h.value();
    // Helper is undefined outside process()
}

# ═══════════════ Python Nested Classes ═══════════════
class LinkedList:
    class Node:          # nested class
        def __init__(self, data):
            self.data = data
            self.next = None

    def __init__(self):
        self.head = None

    def push(self, val):
        node = LinkedList.Node(val)   # access via outer class name
        node.next = self.head
        self.head = node

# Can also access via: ll = LinkedList(); ll.Node(val)  (but not idiomatic)`}</Code>

      <H2>Pointers to Members (C++)</H2>
      <Code>{`class MyClass {
public:
    int x = 10;
    int y = 20;
    void show() { cout << x << " " << y << endl; }
    int square() { return x * x; }
};

// Pointer to data member: stores OFFSET (not absolute address)
int MyClass::* p_x = &MyClass::x;    // type: int MyClass::*
int MyClass::* p_y = &MyClass::y;

MyClass obj;
cout << obj.*p_x;           // dereference with .* operator: prints 10
MyClass* ptr = &obj;
cout << ptr->*p_x;          // dereference through pointer: ->* operator

// Pointer to member function: stores entry point relative to class
void (MyClass::* p_show)() = &MyClass::show;
int  (MyClass::* p_sq)()   = &MyClass::square;

(obj.*p_show)();            // call via .* (parens required due to precedence)
(ptr->*p_show)();           // call via ->*

// Use case: strategy pattern, callbacks, dispatch tables
int MyClass::* fields[] = { &MyClass::x, &MyClass::y };
for (auto f : fields)
    cout << obj.*f << " ";   // iterate over member pointers`}</Code>

      <H2>Function Pointers and Callbacks (C++)</H2>
      <Code>{`// Function pointer declaration and use
void greet(string name) { cout << "Hello, " << name << "\\n"; }
int  add(int a, int b)  { return a + b; }

void (*greet_ptr)(string) = &greet;   // pointer to void(string) function
int (*op_ptr)(int, int)   = &add;

greet_ptr("Alice");    // calls greet
cout << op_ptr(3, 4);  // calls add -> 7

// Array of function pointers (dispatch table)
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int (*ops[])(int, int) = { add, sub, mul };
for (auto op : ops) cout << op(6, 2) << " ";   // 8 4 12

// std::function (C++11) - wraps any callable
#include <functional>
function<int(int,int)> f = add;
f = [](int a, int b) { return a * b; };  // reassign to lambda
f = bind(add, 10, placeholders::_1);     // partial application

# Python callables and function pointers
def greet(name): print(f"Hello, {name}")
def add(a, b):   return a + b

fn = greet           # functions are first-class objects
fn("Alice")          # calls greet

ops = [add, lambda a,b: a-b, lambda a,b: a*b]
for op in ops: print(op(6, 2))   # 8, 4, 12

# Callable objects: __call__ makes any object callable
class Multiplier:
    def __init__(self, factor): self.factor = factor
    def __call__(self, x): return x * self.factor

times3 = Multiplier(3)
print(times3(5))         # 15 - object called like a function`}</Code>

      <H2>Python Metaclasses</H2>
      <Code>{`# Every class in Python is an instance of a metaclass
# Default metaclass: type

# type is itself a class - the metaclass of all classes
print(type(int))    # <class 'type'>
print(type(str))    # <class 'type'>

# Creating a class dynamically with type(name, bases, dict)
Dog = type('Dog', (Animal,), {
    'breed': 'Unknown',
    'speak': lambda self: print(f"Woof! I'm {self.name}")
})

# Custom metaclass: controls how classes are CREATED
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class DatabaseConnection(metaclass=SingletonMeta):
    def __init__(self):
        self.connected = True

db1 = DatabaseConnection()
db2 = DatabaseConnection()
print(db1 is db2)     # True - same instance

# ABCMeta is another example: tracks @abstractmethod and raises TypeError
# type.__new__ is called when the class statement is executed
# Metaclass hooks: __new__, __init__, __prepare__, __instancecheck__, __subclasscheck__`}</Code>

      <H2>Python Descriptors</H2>
      <Code>{`# Descriptor protocol: __get__, __set__, __delete__
# Powers @property, classmethod, staticmethod under the hood

class ValidatedInt:
    """Descriptor that validates integer range."""
    def __init__(self, min_val, max_val):
        self.min_val = min_val
        self.max_val = max_val

    def __set_name__(self, owner, name):
        self.name = name           # automatically set by Python 3.6+

    def __get__(self, obj, objtype=None):
        if obj is None: return self   # accessed via class, not instance
        return getattr(obj, f'_{self.name}', None)

    def __set__(self, obj, value):
        if not (self.min_val <= value <= self.max_val):
            raise ValueError(f"{self.name} must be in [{self.min_val}, {self.max_val}]")
        setattr(obj, f'_{self.name}', value)

class Person:
    age    = ValidatedInt(0, 150)      # class-level descriptor
    height = ValidatedInt(0, 300)

p = Person()
p.age = 25           # calls ValidatedInt.__set__
print(p.age)         # calls ValidatedInt.__get__
# p.age = -1         # ValueError: age must be in [0, 150]`}</Code>

      <QA q="What is the difference between a function and a bound method in Python?" a="A function is an object defined with def or lambda - it has no associated instance. A bound method is created when you access a function via an instance: it wraps the function together with the instance. When you call obj.method(), Python internally calls type(obj).__dict__['method'].__get__(obj, type(obj)), which creates a bound method object where self is already filled in. This is the descriptor protocol at work. A classmethod binds the class instead of the instance; a staticmethod bypasses binding entirely." />
      <QA q="What is a metaclass and when would you actually use one in production?" a="A metaclass is the class of a class - it controls how classes are created and behave, the same way classes control how instances are created. Production uses: (1) Singleton pattern: override __call__ to return the same instance. (2) ORM frameworks (Django models, SQLAlchemy): metaclass scans class body for Field descriptors and registers them. (3) API validation: enforce that all subclasses implement certain methods at class-creation time (before any instance is made). (4) Plugin systems: auto-register subclasses in a registry. In most application code, ABCMeta and __init_subclass__ (Python 3.6) are cleaner alternatives." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 10 - INTERVIEW PATTERNS & DESIGN
══════════════════════════════════════════════════════ */
function SectionInterview() {
  return (
    <div>
      <Note color="danger" icon="ti-checklist">
        These are the most commonly asked OOP interview questions and patterns. Know them cold - expect at least 3-5 of these in any systems or backend engineering interview.
      </Note>

      <H2>SOLID Principles</H2>
      <Table
        heads={["Principle", "Full Name", "Core Idea", "Violation Example"]}
        rows={[
          ["S", "Single Responsibility", "A class should have ONE reason to change - one job only", "A UserService that handles auth, DB queries, AND email sending"],
          ["O", "Open/Closed", "Open for extension, closed for modification - add behavior without changing existing code", "Adding a new shape requires modifying a DrawShapes function's if-else chain"],
          ["L", "Liskov Substitution", "Derived class objects must be substitutable for base class objects without breaking the program", "Square extends Rectangle but breaks setWidth/setHeight independence"],
          ["I", "Interface Segregation", "Clients should not be forced to depend on interfaces they don't use - keep interfaces small and focused", "A single IAnimal interface with fly(), swim(), run() forces land animals to implement fly()"],
          ["D", "Dependency Inversion", "Depend on abstractions (interfaces), not concretions. High-level modules should not depend on low-level modules.", "OrderService directly instantiates MySQLDatabase instead of depending on an IDatabase interface"],
        ]}
      />

      <H2>Design Patterns - OOP Applied</H2>
      <Code>{`# ═══ SINGLETON PATTERN ═══ (one instance globally)
class Singleton:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

// C++ Thread-safe Singleton (C++11 local static - guaranteed thread-safe)
class Singleton {
public:
    static Singleton& instance() {
        static Singleton inst;   // constructed once on first call; thread-safe since C++11
        return inst;
    }
private:
    Singleton() = default;
    Singleton(const Singleton&) = delete;    // no copy
    Singleton& operator=(const Singleton&) = delete;  // no assignment
};

# ═══ FACTORY PATTERN ═══ (delegate object creation to subclasses)
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self): ...

class Dog(Animal):   def speak(self): return "Woof"
class Cat(Animal):   def speak(self): return "Meow"

class AnimalFactory:
    @staticmethod
    def create(animal_type: str) -> Animal:
        registry = {'dog': Dog, 'cat': Cat}
        cls = registry.get(animal_type.lower())
        if not cls: raise ValueError(f"Unknown animal: {animal_type}")
        return cls()

# ═══ OBSERVER PATTERN ═══ (publish/subscribe)
class EventEmitter:
    def __init__(self):
        self._listeners: dict[str, list] = {}

    def on(self, event: str, callback):
        self._listeners.setdefault(event, []).append(callback)

    def emit(self, event: str, *args, **kwargs):
        for cb in self._listeners.get(event, []):
            cb(*args, **kwargs)

emitter = EventEmitter()
emitter.on('data', lambda x: print(f"Handler 1: {x}"))
emitter.on('data', lambda x: print(f"Handler 2: {x}"))
emitter.emit('data', 42)   # both handlers called

# ═══ STRATEGY PATTERN ═══ (swap algorithms at runtime)
class Sorter:
    def __init__(self, strategy):
        self._strategy = strategy

    def sort(self, data):
        return self._strategy(data)

sorter = Sorter(sorted)                          # use built-in sorted
sorter = Sorter(lambda d: sorted(d, reverse=True)) # swap to reversed sort`}</Code>

      <H2>Classic OOP Interview Questions</H2>
      <Table
        heads={["Question", "Key Answer Points"]}
        rows={[
          ["Can we have virtual constructor in C++?", "No. The vtable is set up during construction - the virtual mechanism requires a vtable, which doesn't exist until after construction starts. Constructor dispatch must be static."],
          ["When is virtual destructor needed?", "Whenever you have a class with virtual functions (i.e., it's meant to be a base class with polymorphic deletion via base pointers). Always make base class destructors virtual."],
          ["Difference between struct and class in C++?", "Only default access: struct defaults to public, class defaults to private. All other features (inheritance, constructors, virtual functions) are identical."],
          ["Can abstract class have a constructor?", "Yes. It initializes the abstract class's own data members. Called via derived class's initializer list. Cannot be called directly to create an abstract class object."],
          ["What is object slicing?", "When a derived object is assigned to a base object BY VALUE (not pointer/reference), the derived-specific data is 'sliced off'. The copy contains only the base portion. This is why polymorphism requires pointers or references, not values."],
          ["Difference between IS-A and HAS-A?", "IS-A: inheritance - Dog IS-A Animal. HAS-A: composition - Car HAS-A Engine. Prefer HAS-A (composition) over IS-A when possible - tighter coupling, more flexibility."],
          ["What is multiple inheritance ambiguity?", "When a class inherits from two classes that both define the same function. Fix in C++: explicit scope resolution (d.B1::func()) or virtual inheritance. In Python: C3 MRO resolves automatically."],
          ["Shallow copy causes double free - explain", "Two objects share the same heap pointer. When both destructors run, they both delete the same memory - undefined behavior (usually crash). Fix: deep copy allocates new memory; Rule of Three."],
        ]}
      />

      <H2>Python-Specific Interview Questions</H2>
      <Table
        heads={["Question", "Answer"]}
        rows={[
          ["What is the difference between @classmethod and @staticmethod?", "@classmethod receives cls as first arg and can access/modify class state. @staticmethod receives no automatic arg and has no access to class or instance - it's a pure function in the class namespace."],
          ["What is MRO and how does Python compute it?", "Method Resolution Order: the order Python searches for a method in the inheritance chain. Computed via C3 linearization algorithm. Check with ClassName.__mro__. super() follows this chain."],
          ["What is __new__ vs __init__?", "__new__ creates the object (allocates memory, returns the instance). __init__ initializes the already-created object (sets attributes). To create immutable types (like int subclasses), override __new__."],
          ["Can you make a class immutable in Python?", "Override __setattr__ to raise AttributeError after __init__, or use __slots__ with only getters, or use a frozen dataclass (@dataclass(frozen=True)). None is truly compiler-enforced like C++ const."],
          ["What is duck typing?", "If an object has the required methods/attributes, it's accepted regardless of its type hierarchy. Python doesn't check IS-A relationships; it checks CAN-DO. Formalized with typing.Protocol for type hints."],
          ["How does Python multiple inheritance handle diamond?", "C3 MRO algorithm places each class exactly once in a consistent linearization. No ambiguity - the first class in the linearization with the method wins. virtual inheritance not needed."],
        ]}
      />

      <H2>Composition vs Inheritance</H2>
      <Grid cols={2}>
        <Card title="Inheritance (IS-A)" color="warning">
          Use when the relationship is genuinely IS-A: a Dog IS-A Animal. Enables polymorphism via base pointers/references. Tight coupling - derived class depends on base implementation. Changes to base can break derived.
        </Card>
        <Card title="Composition (HAS-A)" color="success">
          Use when the relationship is HAS-A: a Car HAS-A Engine. More flexible - swap components at runtime. Looser coupling - components are independent. Prefer composition over inheritance when both could work.
        </Card>
      </Grid>
      <Code>{`# INHERITANCE approach: tightly coupled
class FlyingBird(Bird):
    def fly(self): print("flap flap")

# COMPOSITION approach: flexible
class FlyBehavior:
    def fly(self): print("flap flap")

class NoFlyBehavior:
    def fly(self): raise NotImplementedError("Can't fly")

class Bird:
    def __init__(self, fly_behavior):
        self._fly = fly_behavior   # injected; can be swapped at runtime

    def fly(self):
        self._fly.fly()

eagle   = Bird(FlyBehavior())    # can fly
penguin = Bird(NoFlyBehavior())  # cannot fly - no need to override an exception-raising method`}</Code>

      <QA q="Explain the Liskov Substitution Principle with a classic violation example." a="LSP: if S is a subtype of T, any code using T must work correctly with S substituted in. Classic violation: Square extends Rectangle. Rectangle has setWidth(w) and setHeight(h) independently. Square requires width == height always, so Square overrides both setters to set both dimensions - violating the assumption that changing width doesn't change height. Code that does: r.setWidth(5); r.setHeight(3); assert r.area() == 15 breaks with a Square. Fix: don't inherit Square from Rectangle; use separate classes or a Shape abstract base." />
      <QA q="When should you use composition instead of inheritance?" a="Prefer composition when: (1) the relationship is HAS-A not IS-A (a Logger is not a File, but it HAS-A file handle), (2) you need to vary behavior at runtime (swap the fly behavior component on a bird), (3) the base class is in an external library you can't safely inherit from, (4) you need to compose behaviors from multiple sources without the complexity of multiple inheritance. Inheritance is appropriate when a true IS-A relationship exists AND you need polymorphic substitution. Rule of thumb: if you find yourself inheriting just to reuse code (not for substitutability), use composition." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: 'paradigms',      label: 'Paradigms'             },
  { id: 'classes',        label: 'Classes & Objects'     },
  { id: 'constructors',   label: 'Constructors'          },
  { id: 'inheritance',    label: 'Inheritance'           },
  { id: 'polymorphism',   label: 'Polymorphism'          },
  { id: 'virtual',        label: 'Virtual & Abstract'    },
  { id: 'encapsulation',  label: 'Encapsulation'         },
  { id: 'memory',         label: 'Memory Management'     },
  { id: 'advanced',       label: 'Advanced Features'     },
  { id: 'interview',      label: 'Interview Patterns'    },
];

export default function OOP() {
  const [active, setActive] = useState('paradigms');
  const map = {
    paradigms:     <SectionParadigms />,
    classes:       <SectionClasses />,
    constructors:  <SectionConstructors />,
    inheritance:   <SectionInheritance />,
    polymorphism:  <SectionPolymorphism />,
    virtual:       <SectionVirtual />,
    encapsulation: <SectionEncapsulation />,
    memory:        <SectionMemory />,
    advanced:      <SectionAdvanced />,
    interview:     <SectionInterview />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Core CS -- Module 49</div>
        <h1 className="page-header-title">Object-Oriented Programming</h1>
        <p className="page-header-subtitle">
          C++ &amp; Python -- Encapsulation · Inheritance · Polymorphism · Virtual Functions · Vtable · RAII · Smart Pointers · MRO · Metaclasses · SOLID · Design Patterns
        </p>
      </div>
      <SectionNav tabs={TABS} active={active} onChange={setActive} />
      <div style={{ padding: '0.5rem 0 2rem' }}>{map[active]}</div>
      <NavButtons moduleId={49} />
    </div>
  );
}
