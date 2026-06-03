import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';
import Xarrow, { Xwrapper } from 'react-xarrows';

/* ══════════════════════════════════════════════════════
   SECTION 1 — VARIABLES & DATA TYPES
══════════════════════════════════════════════════════ */
function SectionVariables() {
  return (
    <div>
      <H2>What is a Variable?</H2>
      <P>A variable is a named memory location that stores a value. The key difference between C++ and Python at the foundational level is their <strong>type systems</strong> — C++ is statically typed (types declared at compile time), Python is dynamically typed (types inferred at runtime).</P>
      
      <Grid cols={2}>
        <Card title="C++ — Static Typing" color="info">
          Types are declared explicitly and checked at compile time.
          <div style={{ marginTop: '8px' }}>
            <Mx>int age = 25;</Mx>
          </div>
        </Card>
        <Card title="Python — Dynamic Typing" color="success">
          Types are inferred at runtime based on the value assigned.
          <div style={{ marginTop: '8px' }}>
            <Mx>age = 25</Mx>
          </div>
        </Card>
      </Grid>

      <H2>Primitive Data Types — Comparison Table</H2>
      <Table
        heads={["Type", "C++", "Python", "Notes"]}
        rows={[
          ["Integer", "int, long long, short", "int (unbounded)", "Python int has no overflow"],
          ["Float", "float, double", "float", "Python float = C++ double (64-bit)"],
          ["Character", "char", "str (length 1)", "No char type in Python"],
          ["Boolean", "bool (true/false)", "bool (True/False)", "Python booleans are capitalized"],
          ["String", "string (STL)", "str (built-in)", "C++ needs #include <string>"],
          ["Null/Empty", "nullptr, NULL", "None", "Different semantics"],
          ["Unsigned Int", "unsigned int, uint64_t", "N/A", "Python int is always signed & unbounded"]
        ]}
      />

      <H2>C++ — Variable Declaration & Initialization</H2>
      <Code lang="cpp">{`// ── Basic declarations ────────────────────────────
int age = 25;
double gpa = 8.35;
char grade = 'A';
bool isPassed = true;
string name = "Jitam";    // #include <string>

// ── Multiple declarations ─────────────────────────
int x = 1, y = 2, z = 3;

// ── Constants ─────────────────────────────────────
const int MAX_SIZE = 1000;
constexpr int MOD = 1e9 + 7;   // compile-time constant

// ── Auto (type inference, C++11) ──────────────────
auto count = 42;          // deduced as int
auto pi    = 3.14;        // deduced as double

// ── Common DSA types ──────────────────────────────
long long n = 1e18;       // for large numbers (up to ~9.2 × 10^18)
int arr[5] = {1, 2, 3, 4, 5};   // fixed-size array`}</Code>

      <H2>Python — Variable Declaration & Initialization</H2>
      <Code lang="python">{`# ── Basic declarations (no type keyword needed) ────
age     = 25
gpa     = 8.35
grade   = 'A'       # just a length-1 string
is_passed = True
name    = "Jitam"

# ── Multiple assignment ───────────────────────────
x, y, z = 1, 2, 3      # tuple unpacking
a = b = c = 0           # chained assignment

# ── Constants (convention only — Python has none) ─
MAX_SIZE = 1000         # UPPER_CASE = treat as constant
MOD = 10**9 + 7

# ── Type hints (Python 3.5+, not enforced) ────────
count: int   = 42
pi:    float = 3.14

# ── Python-specific large numbers ─────────────────
n = 10**18              # no overflow, ever
arr = [1, 2, 3, 4, 5]  # dynamic list, not fixed array`}</Code>

      <H2>Key Differences at a Glance</H2>
      <Note color="warning" icon="ti-alert-triangle">
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li><strong>Integer overflow:</strong> C++ <Mx>int</Mx> overflows silently at ~2.1 × 10⁹. Always use <Mx>long long</Mx> for DSA. Python int never overflows.</li>
          <li><strong>Type casting:</strong> C++ requires explicit casts <Mx>(double) x / y</Mx>. Python: <Mx>float(x) / y</Mx> or just <Mx>x / y</Mx> (true division by default in Python 3).</li>
          <li><strong>Integer division:</strong> C++ <Mx>5 / 2 = 2</Mx>. Python <Mx>5 // 2 = 2</Mx> (use <Mx>//</Mx> explicitly).</li>
          <li><strong><Mx>0.1 + 0.2 != 0.3</Mx></strong> in both languages — floating-point precision is a hardware issue, not a language issue.</li>
        </ul>
      </Note>

      <H2>Type Casting</H2>
      <Code>{{cpp: `// C++ — explicit casting
int   a = 7, b = 2;
double res = (double) a / b;   // → 3.5   (C-style cast)
double res2 = static_cast<double>(a) / b;  // preferred in modern C++

int x = (int) 3.99;    // → 3  (truncation, not rounding)
char c = 'A';
int ascii = (int) c;   // → 65`, python: `# Python — explicit casting with built-in functions
a, b = 7, 2
res   = float(a) / b    # → 3.5
res2  = a / b           # → 3.5  (Python 3: / is always true division)
x     = int(3.99)       # → 3   (truncation)
c     = 'A'
ascii_val = ord(c)      # → 65  (char to int equivalent)
back  = chr(65)         # → 'A' (int to char equivalent)`}}</Code>

      <H2>Interview Q&A</H2>
      <QA q="Why should you use long long instead of int by default in DSA problems?" a="<code>int</code> in C++ is 32-bit, storing values up to ~2.1 × 10⁹. Many DSA problems involve multiplications of array indices, coordinate values, or prefix sums that exceed this silently — producing wrong answers with no compile/runtime error. <code>long long</code> (64-bit) handles values up to ~9.2 × 10¹⁸, covering virtually all contest constraints. The cost is negligible." />
      <QA q="In Python, what is the difference between is and ==?" a="<code>==</code> compares <strong>values</strong> (equality). <code>is</code> compares <strong>identity</strong> (whether both variables point to the same object in memory). <code>5 == 5.0</code> is <code>True</code>, but <code>5 is 5.0</code> is <code>False</code>. In DSA, always use <code>==</code> for value comparison. Using <code>is</code> to compare integers works 'by accident' for small integers (CPython caches -5 to 256) but breaks for larger values." />
      <QA q="What is constexpr and when do you use it over const?" a="<code>const</code> means the value cannot be changed at runtime. <code>constexpr</code> means the value is evaluated at <strong>compile time</strong> and embedded directly in the binary. Use <code>constexpr</code> for fixed constants like <code>MOD = 1e9 + 7</code> — it gives the compiler more optimization opportunities and avoids runtime lookup." />
      <QA q="Does Python have a char type? How do you handle single characters?" a="No. Python has no <code>char</code> type — a 'character' is just a string of length 1. Use <code>ord('A')</code> to get its ASCII integer value (65) and <code>chr(65)</code> to convert back. In C++, <code>char</code> is essentially an 8-bit integer — arithmetic on <code>char</code> values (e.g., <code>'a' + 1 == 'b'</code>) is legal and commonly used in DSA for alphabet indexing." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — OPERATORS & EXPRESSIONS
══════════════════════════════════════════════════════ */
function BitwiseDemo() {
  const binaryCell = (bit, isZero) => (
    <div style={{
      width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isZero ? 'var(--color-background-secondary)' : 'var(--color-background-info)',
      color: isZero ? 'var(--color-text-secondary)' : 'var(--color-text-info)',
      border: '1px solid var(--color-border-tertiary)', borderRadius: '4px',
      fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600
    }}>
      {bit}
    </div>
  );

  const renderBits = (n) => {
    const bits = n.toString(2).padStart(4, '0').split('');
    return (
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {bits.map((b, i) => <div key={i}>{binaryCell(b, b === '0')}</div>)}
        <span style={{ marginLeft: '8px', fontSize: '13px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>= {n}</span>
      </div>
    );
  };

  return (
    <VizBox>
      <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '12px' }}>Bitwise Operations on 13 (1101)</div>
      <Table 
        heads={["Operation", "Expression", "Result (Binary & Decimal)"]}
        rows={[
          ["Base Value", "n = 13", renderBits(13)],
          ["AND with 1", "13 & 1", renderBits(1)],
          ["OR with 2", "13 | 2", renderBits(15)],
          ["XOR with 13", "13 ^ 13", renderBits(0)],
          ["Left Shift by 1", "13 << 1", renderBits(26)],
          ["Right Shift by 1", "13 >> 1", renderBits(6)],
        ]}
      />
    </VizBox>
  );
}

function SectionOperators() {
  const [activeCategory, setActiveCategory] = useState("Arithmetic");
  
  const cats = [
    { name: "Arithmetic", color: "info" },
    { name: "Comparison", color: "success" },
    { name: "Logical", color: "warning" },
    { name: "Bitwise", color: "purple" },
    { name: "Assignment", color: "danger" }
  ];

  return (
    <div>
      <H2>Operator Categories</H2>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {cats.map(c => (
          <button 
            key={c.name}
            onClick={() => setActiveCategory(c.name)}
            style={{
              padding: '6px 12px', fontSize: '13px', fontWeight: activeCategory === c.name ? 600 : 400,
              background: activeCategory === c.name ? `var(--color-background-${c.color})` : 'transparent',
              color: activeCategory === c.name ? `var(--color-text-${c.color})` : 'var(--color-text-secondary)',
              border: `1px solid var(--color-border-${activeCategory === c.name ? c.color : 'tertiary'})`,
              borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {activeCategory === "Arithmetic" && (
        <div>
          <Table
            heads={["Operator", "C++", "Python", "Example"]}
            rows={[
              ["Addition", "+", "+", "3 + 2 = 5"],
              ["Subtraction", "-", "-", "5 - 3 = 2"],
              ["Multiplication", "*", "*", "4 * 3 = 12"],
              ["True Division", "/ (int÷int = int)", "/ (always float)", "C++: 7/2=3, Py: 7/2=3.5"],
              ["Integer Division", "/ (on ints)", "//", "7 // 2 = 3"],
              ["Modulo", "%", "%", "7 % 3 = 1"],
              ["Power", "pow(x, n)", "**", "2 ** 10 = 1024"]
            ]}
          />
          <Note color="danger" icon="ti-alert-triangle">
            In C++, <code>7 / 2</code> gives <code>3</code>, not <code>3.5</code>. This silently causes wrong answers in problems involving averages or midpoints. Always cast: <code>(double) a / b</code> or compute mid as <code>l + (r - l) / 2</code> to avoid overflow.
          </Note>
        </div>
      )}

      {activeCategory === "Comparison" && (
        <Code>{{cpp: `// C++ — all return bool
int a = 5, b = 3;
bool eq  = (a == b);  // false
bool neq = (a != b);  // true
bool gt  = (a > b);   // true
bool lt  = (a < b);   // false
bool gte = (a >= b);  // true
bool lte = (a <= b);  // false`, python: `# Python — same operators, chaining is legal!
a, b = 5, 3
eq  = (a == b)   # False
neq = (a != b)   # True

# Python allows chained comparisons (NOT valid in C++)
x = 4
in_range = (1 < x < 10)   # True — reads naturally
# Equivalent in C++: (x > 1 && x < 10)`}}</Code>
      )}

      {activeCategory === "Logical" && (
        <div>
          <Table heads={["Operation", "C++", "Python"]} rows={[["AND", "&&", "and"], ["OR", "||", "or"], ["NOT", "!", "not"]]} />
          <Code>{{cpp: `// C++ — short-circuit evaluation
bool a = true, b = false;
if (a || expensive_fn()) { }   // expensive_fn() NOT called if a is true
if (b && expensive_fn()) { }   // expensive_fn() NOT called if b is false`, python: `# Python — same short-circuit behavior, but returns operand, not bool
print(0 or 42)       # → 42   (returns first truthy value)
print(5 and 0)       # → 0    (returns first falsy value)
print([] or "default")  # → "default"  (useful idiom)`}}</Code>
        </div>
      )}

      {activeCategory === "Bitwise" && (
        <div>
          <Table heads={["Operator", "C++", "Python", "Use Case"]} rows={[
            ["AND", "&", "&", "Masking bits, check even/odd"],
            ["OR", "|", "|", "Setting bits"],
            ["XOR", "^", "^", "Toggle bits, find unique element"],
            ["NOT", "~", "~", "Flip all bits"],
            ["Left shift", "<<", "<<", "Multiply by 2ⁿ"],
            ["Right shift", ">>", ">>", "Divide by 2ⁿ"]
          ]} />
          <Code>{{cpp: `// C++ — common bitwise tricks
int n = 13;               // binary: 1101

// Check if n is even
bool isEven = !(n & 1);   // last bit 0 → even

// Check if kth bit is set (0-indexed)
int k = 2;
bool isSet = (n >> k) & 1;  // → 1 (bit 2 of 13 is set)

// Multiply / divide by powers of 2
int x = 5;
int doubled  = x << 1;    // 10
int halved   = x >> 1;    // 2

// XOR trick: a ^ a = 0, a ^ 0 = a
int arr[] = {2, 3, 2, 5, 3};
int unique = 0;
for (int v : arr) unique ^= v;  // → 5`, python: `# Python — same operators
n = 13   # binary: 1101

is_even   = not (n & 1)       # True if even
k         = 2
is_set    = bool((n >> k) & 1) # True: bit 2 is set in 13

doubled   = 5 << 1    # 10
halved    = 5 >> 1    # 2

# XOR trick
from functools import reduce
import operator
nums   = [2, 3, 2, 5, 3]
unique = reduce(operator.xor, nums)   # → 5`}}</Code>
          <BitwiseDemo />
        </div>
      )}

      {activeCategory === "Assignment" && (
        <div>
          <Code>{{cpp: `// C++ — compound assignment
int x = 10;
x += 3;   // x = 13
x -= 2;   // x = 11
x *= 2;   // x = 22
x /= 4;   // x = 5
x %= 3;   // x = 2
x <<= 1;  // x = 4  (bit shift assign)
x &= 3;   // x = 0  (bitwise AND assign)`, python: `# Python — same compound operators
x = 10
x += 3    # 13
x -= 2    # 11
x *= 2    # 22
x //= 4   # 5  (use // for integer division)
x %= 3    # 2

# Python does NOT have ++ or --
# x++ is a SyntaxError
x += 1    # correct way to increment`}}</Code>
          <Note color="warning" icon="ti-alert-triangle">
            C++ has <code>++i</code> and <code>i++</code> (pre/post increment). Python has neither — always use <code>x += 1</code>. This trips up C++ programmers switching to Python in contests.
          </Note>
        </div>
      )}

      <H2>Operator Precedence (DSA-relevant)</H2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table className="dl-table">
          <thead>
            <tr><th>Priority</th><th>Operators</th><th>Associativity</th></tr>
          </thead>
          <tbody>
            <tr><td>1 (highest)</td><td><code>()</code> parentheses</td><td>Left → Right</td></tr>
            <tr><td>2</td><td><code>!</code>, <code>~</code>, unary <code>-</code></td><td>Right → Left</td></tr>
            <tr><td>3</td><td><code>*</code>, <code>/</code>, <code>%</code></td><td>Left → Right</td></tr>
            <tr><td>4</td><td><code>+</code>, <code>-</code></td><td>Left → Right</td></tr>
            <tr><td>5</td><td><code>&lt;&lt;</code>, <code>&gt;&gt;</code></td><td>Left → Right</td></tr>
            <tr><td>6</td><td><code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code></td><td>Left → Right</td></tr>
            <tr><td>7</td><td><code>==</code>, <code>!=</code></td><td>Left → Right</td></tr>
            <tr><td>8</td><td><code>&amp;</code></td><td>Left → Right</td></tr>
            <tr><td>9</td><td><code>^</code></td><td>Left → Right</td></tr>
            <tr><td>10</td><td><code>|</code></td><td>Left → Right</td></tr>
            <tr><td>11</td><td><code>&amp;&amp;</code> / <code>and</code></td><td>Left → Right</td></tr>
            <tr><td>12 (lowest)</td><td><code>||</code> / <code>or</code></td><td>Left → Right</td></tr>
          </tbody>
        </table>
      </div>

      <H2>Interview Q&A</H2>
      <QA q="What is the difference between =, ==, and ===? Does C++ or Python have ===?" a="Neither C++ nor Python has <code>===</code> (that's JavaScript). <code>=</code> is assignment. <code>==</code> is value equality in both languages. The confusion arises because Python's <code>is</code> partially mimics JavaScript's <code>===</code> (reference equality), but they're not the same concept. In competitive programming, mistakenly writing <code>=</code> inside a condition (<code>if (a = b)</code>) in C++ is a common silent bug — it assigns <code>b</code> to <code>a</code> and evaluates to <code>b</code>'s value." />
      <QA q="What does n & (n-1) compute? Why is it useful?" a="<code>n & (n-1)</code> clears the <strong>lowest set bit</strong> of <code>n</code>. If the result is <code>0</code>, then <code>n</code> had exactly one bit set — meaning <code>n</code> is a power of 2. This gives an O(1) power-of-2 check versus the O(log n) loop approach. It's also used in Fenwick Trees (Binary Indexed Trees) to traverse parent nodes efficiently." />
      <QA q="Explain short-circuit evaluation and why it matters in practice." a="In <code>A && B</code>, if <code>A</code> is false, <code>B</code> is never evaluated. In <code>A || B</code>, if <code>A</code> is true, <code>B</code> is never evaluated. This matters for: (1) <strong>performance</strong> — skip expensive function calls, (2) <strong>safety</strong> — guard null pointer dereferences: <code>if (ptr != nullptr && ptr->val > 0)</code> safely avoids dereferencing a null pointer since the right side is skipped if <code>ptr</code> is null." />
      <QA q="In Python, why does 0.1 + 0.2 == 0.3 return False?" a="Floating-point numbers are stored in binary (IEEE 754 standard). <code>0.1</code> and <code>0.2</code> cannot be represented exactly in binary — they have infinite repeating expansions. Their sum introduces rounding error, making it <code>0.30000000000000004</code>. The fix for comparisons is <code>abs(a - b) < 1e-9</code> (epsilon comparison) or Python's <code>math.isclose(a, b)</code>." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — CONTROL FLOW
══════════════════════════════════════════════════════ */
function GradeFlowchart() {
  return (
    <VizBox>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
        <div style={{ background: 'var(--color-background-primary)', border: '1px solid var(--color-border-tertiary)', padding: '6px 16px', borderRadius: '4px', fontSize: '13px' }}>Start</div>
        <div style={{ fontSize: '16px', color: 'var(--color-text-tertiary)' }}>↓</div>
        <div style={{ background: 'var(--color-background-success)', border: '1px solid var(--color-border-success)', color: 'var(--color-text-success)', padding: '8px 24px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', minWidth: '140px', textAlign: 'center' }}>score &gt;= 90 ?</div>
        <div style={{ display: 'flex', width: '260px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Yes → <span style={{ background: 'var(--color-background-success)', padding: '4px 8px', borderRadius: '4px', color: 'var(--color-text-success)', fontWeight: 600 }}>A</span></div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>No ↓</div>
        </div>
        <div style={{ background: 'var(--color-background-info)', border: '1px solid var(--color-border-info)', color: 'var(--color-text-info)', padding: '8px 24px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', minWidth: '140px', textAlign: 'center' }}>score &gt;= 75 ?</div>
        <div style={{ display: 'flex', width: '260px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Yes → <span style={{ background: 'var(--color-background-info)', padding: '4px 8px', borderRadius: '4px', color: 'var(--color-text-info)', fontWeight: 600 }}>B</span></div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>No ↓</div>
        </div>
        <div style={{ background: 'var(--color-background-warning)', border: '1px solid var(--color-border-warning)', color: 'var(--color-text-warning)', padding: '8px 24px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', minWidth: '140px', textAlign: 'center' }}>score &gt;= 60 ?</div>
        <div style={{ display: 'flex', width: '260px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Yes → <span style={{ background: 'var(--color-background-warning)', padding: '4px 8px', borderRadius: '4px', color: 'var(--color-text-warning)', fontWeight: 600 }}>C</span></div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>No ↓</div>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Else → <span style={{ background: 'var(--color-background-danger)', padding: '4px 8px', borderRadius: '4px', color: 'var(--color-text-danger)', fontWeight: 600 }}>F</span></div>
      </div>
    </VizBox>
  );
}

function SectionControlFlow() {
  return (
    <div>
      <H2>if / else if / else</H2>
      <Code>{{cpp: `// C++ — standard if-else chain
int score = 75;

if (score >= 90) {
    cout << "Grade: A";
} else if (score >= 75) {
    cout << "Grade: B";
} else if (score >= 60) {
    cout << "Grade: C";
} else {
    cout << "Grade: F";
}

// ── Ternary operator ──────────────────────────────
int a = 5, b = 3;
int maxVal = (a > b) ? a : b;   // → 5

// ── Nested ternary (avoid in practice) ───────────
string res = (a > 0) ? "positive" : (a < 0) ? "negative" : "zero";`, python: `# Python — if / elif / else  (no braces, colon + indent)
score = 75

if score >= 90:
    print("Grade: A")
elif score >= 75:
    print("Grade: B")
elif score >= 60:
    print("Grade: C")
else:
    print("Grade: F")

# ── Ternary (conditional expression) ─────────────
a, b = 5, 3
max_val = a if a > b else b   # → 5

# ── One-liner chaining ────────────────────────────
res = "positive" if a > 0 else "negative" if a < 0 else "zero"`}}</Code>
      <GradeFlowchart />

      <H2>switch / match</H2>
      <Code>{{cpp: `// C++ — switch statement (works on int, char, enum)
int day = 3;

switch (day) {
    case 1:  cout << "Monday";    break;
    case 2:  cout << "Tuesday";   break;
    case 3:  cout << "Wednesday"; break;
    case 4:
    case 5:  cout << "Thu or Fri"; break;  // fall-through
    default: cout << "Weekend";
}
// WARNING: forgetting \`break\` causes fall-through — a common bug`, python: `# Python 3.10+ — match statement (structural pattern matching)
day = 3

match day:
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case 4 | 5:         # OR pattern — equivalent to fall-through
        print("Thu or Fri")
    case _:             # default
        print("Weekend")

# For older Python (<3.10), use if-elif or dict dispatch:
day_map = {1: "Monday", 2: "Tuesday", 3: "Wednesday"}
print(day_map.get(day, "Unknown"))`}}</Code>
      <Note color="danger" icon="ti-alert-triangle">
        The <code>break</code> omission bug in C++ <code>switch</code> is one of the most common silent errors. Without <code>break</code>, execution falls through into the next case. Intentional fall-through (like <code>case 4: case 5:</code>) should always have a comment explaining it's deliberate.
      </Note>

      <H2>Nested Conditions & Guard Clauses</H2>
      <Code>{{cpp: `// C++ — deep nesting (hard to read)
void process(int* ptr, int val) {
    if (ptr != nullptr) {
        if (val > 0) {
            if (val < 100) {
                // do work
            }
        }
    }
}

// Better: guard clauses (early return)
void process(int* ptr, int val) {
    if (ptr == nullptr) return;
    if (val <= 0)       return;
    if (val >= 100)     return;
    // do work — clean, flat structure
}`, python: `# Python — guard clauses
def process(ptr, val):
    if ptr is None:  return
    if val <= 0:     return
    if val >= 100:   return
    # do work

# Python idiom: all() / any() for compound conditions
constraints = [ptr is not None, val > 0, val < 100]
if all(constraints):
    pass  # do work`}}</Code>

      <H2>Interview Q&A</H2>
      <QA q="What is the difference between if-else chaining and switch in C++? When would you prefer each?" a="<code>switch</code> is marginally faster than a long <code>if-else</code> chain because compilers often optimize it into a <strong>jump table</strong> — O(1) branch dispatch regardless of how many cases there are. <code>if-else</code> chains evaluate conditions sequentially — O(n) in the worst case. Use <code>switch</code> when branching on a single integral value across many discrete cases. Use <code>if-else</code> for range comparisons, complex conditions, or non-integer types (strings require <code>if-else</code> in C++)." />
      <QA q="Explain the 'dangling else' problem." a="In C++, an <code>else</code> always binds to the nearest preceding unmatched <code>if</code>, regardless of indentation. This causes subtle bugs when nesting: <br/><code>if (a) if (b) f(); else g();</code><br/>The <code>else</code> binds to <code>if (b)</code>, not <code>if (a)</code>, which may not match the programmer's intent. Always use braces <code>{}</code> — even for single-statement bodies — to eliminate ambiguity." />
      <QA q="What is a 'guard clause' and why is it preferred over deep nesting?" a="A guard clause is an early <code>return</code> (or <code>continue</code>/<code>throw</code>) that handles edge cases or invalid states at the top of a function, keeping the main logic at the minimum indentation level. Deep nesting creates 'arrow code' — code that drifts rightward, is hard to read, and obscures the happy path. Guard clauses invert the condition (check for failure, not success) and exit early, leaving the core logic clean and flat." />
      <QA q="Does Python have a switch statement? How do you replicate it?" a="Python added <code>match</code> in version 3.10. For older versions or simple key-based dispatch, use a <strong>dictionary as a dispatch table</strong>: <code>result = {1: 'one', 2: 'two'}.get(key, 'default')</code>. This is O(1) lookup and more Pythonic than long <code>elif</code> chains." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — LOOPS
══════════════════════════════════════════════════════ */
function ComplexityDemo() {
  const renderGrid = (size, type) => {
    let cells = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let isFilled = false;
        if (type === "n2") {
          isFilled = true;
        } else if (type === "nlogn") {
          isFilled = j < (size / Math.pow(2, i));
        }
        cells.push(
          <div key={`${i}-${j}`} style={{
            width: '16px', height: '16px', borderRadius: '50%',
            background: isFilled ? 'var(--accent)' : 'var(--color-border-tertiary)',
            opacity: isFilled ? 0.8 : 0.3
          }} />
        );
      }
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 16px)`, gap: '4px' }}>
        {cells}
      </div>
    );
  };

  return (
    <VizBox>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text-danger)' }}>O(n²)</div>
          {renderGrid(6, "n2")}
          <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>6 × 6 = 36 iterations</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text-success)' }}>O(n log n)</div>
          {renderGrid(6, "nlogn")}
          <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>6 + 3 + 1.5... ≈ 12 iterations</div>
        </div>
      </div>
    </VizBox>
  );
}

function SectionLoops() {
  return (
    <div>
      <H2>for Loop</H2>
      <Code>{{cpp: `// C++ — classic index-based for loop
for (int i = 0; i < 5; i++) {
    cout << i << " ";   // 0 1 2 3 4
}

// ── Range-based for (C++11) — preferred for containers ──
int arr[] = {10, 20, 30, 40, 50};
for (int x : arr) {
    cout << x << " ";   // 10 20 30 40 50
}

// ── With reference (avoids copy, allows modification) ───
vector<int> v = {1, 2, 3};
for (int& x : v) {
    x *= 2;   // modifies in place → {2, 4, 6}
}

// ── Reverse loop ─────────────────────────────────────────
for (int i = n - 1; i >= 0; i--) { ... }`, python: `# Python — for-in iterates over any iterable
for i in range(5):
    print(i, end=" ")   # 0 1 2 3 4

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)            # 0 2 4 6 8

# ── Iterate directly over a list ──────────────────
arr = [10, 20, 30, 40, 50]
for x in arr:
    print(x)

# ── enumerate: get index AND value ───────────────
for i, x in enumerate(arr):
    print(f"arr[{i}] = {x}")

# ── Reverse iteration ─────────────────────────────
for x in reversed(arr):
    print(x)

for i in range(len(arr) - 1, -1, -1):
    print(arr[i])`}}</Code>

      <H2>while Loop</H2>
      <Code>{{cpp: `// C++ — while loop
int i = 0;
while (i < 5) {
    cout << i << " ";
    i++;
}

// ── do-while (executes at least once) ────────────
int n;
do {
    cin >> n;
} while (n < 0);   // keep asking until non-negative

// ── Common DSA pattern: two pointers ─────────────
int left = 0, right = n - 1;
while (left < right) {
    // process pair
    left++;
    right--;
}`, python: `# Python — while loop (no do-while, but walrus operator helps)
i = 0
while i < 5:
    print(i, end=" ")
    i += 1

# ── Simulating do-while with walrus operator (Python 3.8+) ─
while (n := int(input("Enter positive: "))) < 0:
    pass   # re-prompt automatically

# ── Two-pointer pattern ───────────────────────────
left, right = 0, len(arr) - 1
while left < right:
    # process pair
    left  += 1
    right -= 1`}}</Code>

      <H2>Loop Control: break, continue, pass</H2>
      <Code>{{cpp: `// C++ — break exits the loop; continue skips to next iteration
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;   // skip 3
    if (i == 7) break;      // stop at 7
    cout << i << " ";       // 0 1 2 4 5 6
}`, python: `# Python — same semantics + pass (no-op placeholder)
for i in range(10):
    if i == 3: continue   # skip 3
    if i == 7: break      # stop at 7
    print(i, end=" ")     # 0 1 2 4 5 6

# ── for-else and while-else (Python only!) ────────
# else block runs ONLY if loop completed without break
for i in range(5):
    if arr[i] == target:
        print("Found")
        break
else:
    print("Not found")   # runs only if no break occurred`}}</Code>
      <Note color="info" icon="ti-bulb">
        Python's <code>for-else</code> / <code>while-else</code> is unique and widely misunderstood. The <code>else</code> block runs only if the loop exited naturally (no <code>break</code>). It's extremely clean for search patterns — no need for a <code>found</code> flag variable.
      </Note>

      <H2>Nested Loops & Complexity Intuition</H2>
      <Code>{{cpp: `// C++ — O(n²) nested loop
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // body executes n² times
    }
}

// O(n log n) — inner loop halves each time
for (int i = 0; i < n; i++) {
    for (int j = 1; j < n; j *= 2) {
        // body executes n·log₂(n) times
    }
}`, python: `# Python — same patterns
for i in range(n):
    for j in range(n):
        pass   # O(n²)

for i in range(n):
    j = 1
    while j < n:
        j *= 2   # O(n log n)`}}</Code>
      <ComplexityDemo />

      <H2>Interview Q&A</H2>
      <QA q="What is the time complexity of a loop like `for (int j = i; j < n; j++)` inside an outer `for i in range(n)` loop?" a="The inner loop runs <code>n − i</code> times for each <code>i</code>. Total iterations = (n−0) + (n−1) + ... + 1 = n(n+1)/2. This is <strong>O(n²)</strong> — the triangular sum. Despite the inner loop starting at <code>i</code> (not 0), it's still quadratic. This comes up in naive substring/subarray enumeration." />
      <QA q="What is an infinite loop? Give two common causes in C++." a="A loop that never terminates. Common causes: (1) <strong>Forgetting to increment</strong>: <code>while (i < n)</code> with no <code>i++</code> inside — <code>i</code> stays constant forever. (2) <strong>Unsigned integer underflow</strong>: <code>for (unsigned int i = n; i >= 0; i--)</code> — when <code>i</code> reaches 0 and decrements, it wraps to a huge positive number (unsigned underflow), so <code>i >= 0</code> is always true. Always use signed <code>int</code> for loop indices unless you have a specific reason not to." />
      <QA q="When would you choose a while loop over a for loop?" a="Use <code>while</code> when the number of iterations is not known in advance — e.g., reading input until EOF, processing nodes until a queue is empty, or iterating two pointers with complex advancement logic. Use <code>for</code> when the iteration count or range is known upfront. In practice, DSA two-pointer and BFS/DFS patterns heavily use <code>while</code>; fixed-range array traversals use <code>for</code>." />
      <QA q="What is the Python for-else construct and when is it useful?" a="The <code>else</code> block attached to a Python <code>for</code> or <code>while</code> loop executes only if the loop completed without hitting a <code>break</code>. It eliminates the need for a boolean 'found' flag in search operations. Instead of setting <code>found = True</code> and checking it afterward, you write the success logic inside the loop and the failure logic in <code>else</code>. It's cleaner but must be used carefully — the <code>else</code> runs even if the loop body never executed (empty iterable)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — FUNCTIONS
══════════════════════════════════════════════════════ */
function FibTree() {
  const node = (label, color, subText, id) => (
    <div id={id} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: `var(--color-background-${color})`,
      border: `1px solid var(--color-border-${color})`,
      color: `var(--color-text-${color})`,
      padding: '4px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: 500,
      zIndex: 2, position: 'relative'
    }}>
      {label}
      {subText && <span style={{ fontSize: '10px', opacity: 0.8 }}>{subText}</span>}
    </div>
  );

  const arrow = (start, end, color) => (
    <Xarrow 
      start={start} 
      end={end} 
      color={`var(--color-border-${color})`} 
      strokeWidth={1.5} 
      path="straight" 
      headSize={4} 
    />
  );

  return (
    <VizBox>
      <H3>Recursion Tree for fib(5)</H3>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', overflowX: 'auto', padding: '10px 0' }}>
        <Xwrapper>
          <div style={{ minWidth: '350px', position: 'relative' }}>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '30px', textAlign: 'center' }}>Without Memoization (O(2ⁿ))</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
              {node("fib(5)", "primary", "", "t1_5")}
              <div style={{ display: 'flex', gap: '60px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                  {node("fib(4)", "primary", "", "t1_4")}
                  <div style={{ display: 'flex', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                      {node("fib(3)", "primary", "", "t1_3_l")}
                      <div style={{ display: 'flex', gap: '15px' }}>
                        {node("fib(2)", "primary", "", "t1_2_ll")}
                        {node("fib(1)", "primary", "", "t1_1_lr")}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                      {node("fib(2)", "danger", "Recomputed!", "t1_2_r")}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                  {node("fib(3)", "danger", "Recomputed!", "t1_3_r")}
                  <div style={{ display: 'flex', gap: '15px' }}>
                    {node("fib(2)", "danger", "...", "t1_2_rl")}
                    {node("fib(1)", "danger", "...", "t1_1_rr")}
                  </div>
                </div>
              </div>
            </div>
            {/* Arrows for T1 */}
            {arrow("t1_5", "t1_4", "primary")}
            {arrow("t1_5", "t1_3_r", "primary")}
            {arrow("t1_4", "t1_3_l", "primary")}
            {arrow("t1_4", "t1_2_r", "primary")}
            {arrow("t1_3_l", "t1_2_ll", "primary")}
            {arrow("t1_3_l", "t1_1_lr", "primary")}
            {arrow("t1_3_r", "t1_2_rl", "danger")}
            {arrow("t1_3_r", "t1_1_rr", "danger")}
          </div>
          
          <div style={{ borderLeft: '1px dashed var(--color-border-tertiary)', paddingLeft: '30px', minWidth: '350px', position: 'relative' }}>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '30px', textAlign: 'center' }}>With Memoization (O(n))</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
              {node("fib(5)", "success", "", "t2_5")}
              <div style={{ display: 'flex', gap: '60px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                  {node("fib(4)", "success", "", "t2_4")}
                  <div style={{ display: 'flex', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                      {node("fib(3)", "success", "", "t2_3")}
                      <div style={{ display: 'flex', gap: '15px' }}>
                        {node("fib(2)", "success", "", "t2_2_l")}
                        {node("fib(1)", "success", "", "t2_1_r")}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                      {node("fib(2)", "info", "O(1) cache hit", "t2_2_hit")}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                  {node("fib(3)", "info", "O(1) cache hit", "t2_3_hit")}
                </div>
              </div>
            </div>
            {/* Arrows for T2 */}
            {arrow("t2_5", "t2_4", "success")}
            {arrow("t2_5", "t2_3_hit", "success")}
            {arrow("t2_4", "t2_3", "success")}
            {arrow("t2_4", "t2_2_hit", "success")}
            {arrow("t2_3", "t2_2_l", "success")}
            {arrow("t2_3", "t2_1_r", "success")}
          </div>
        </Xwrapper>
      </div>
    </VizBox>
  );
}

function SectionFunctions() {
  return (
    <div>
      <H2>Defining and Calling Functions</H2>
      <Code>{{cpp: `// C++ — function syntax
// return_type function_name(parameter_list) { body }

int add(int a, int b) {
    return a + b;
}

// ── Void function ─────────────────────────────────
void greet(string name) {
    cout << "Hello, " << name << endl;
}

// ── Function with default parameters ─────────────
int power(int base, int exp = 2) {    // default exp = 2
    int result = 1;
    for (int i = 0; i < exp; i++) result *= base;
    return result;
}
// power(3)     → 9  (uses default exp=2)
// power(3, 3)  → 27

// ── Multiple return values using pair/tuple ───────
#include <utility>
pair<int, int> minMax(vector<int>& arr) {
    int mn = *min_element(arr.begin(), arr.end());
    int mx = *max_element(arr.begin(), arr.end());
    return {mn, mx};
}
auto [mn, mx] = minMax(arr);   // structured binding (C++17)`, python: `# Python — def keyword, no return type annotation required
def add(a, b):
    return a + b

# ── Default parameters ────────────────────────────
def power(base, exp=2):
    return base ** exp
# power(3)    → 9
# power(3, 3) → 27

# ── Multiple return values (returns a tuple) ──────
def min_max(arr):
    return min(arr), max(arr)

mn, mx = min_max([3, 1, 4, 1, 5])   # tuple unpacking

# ── Keyword arguments ─────────────────────────────
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet(name="Jitam", greeting="Hi")
greet("Jitam")   # uses default`}}</Code>

      <H2>Pass by Value vs Pass by Reference</H2>
      <Code>{{cpp: `// C++ — pass by value (copy is made, original unchanged)
void increment_val(int x) {
    x++;   // modifies the copy only
}

// Pass by reference (modifies the original)
void increment_ref(int& x) {
    x++;   // modifies the original variable
}

// Pass by const reference (read-only, no copy overhead)
int sum(const vector<int>& arr) {
    int s = 0;
    for (int x : arr) s += x;
    return s;
}

int n = 5;
increment_val(n);   // n is still 5
increment_ref(n);   // n is now 6`, python: `# Python — passes object REFERENCE (but reassignment doesn't affect caller)
# Mutable objects (list, dict) ARE modified; immutable (int, str) are NOT

def try_change(x):
    x = 100    # rebinds local name, original unchanged

def append_item(lst):
    lst.append(99)   # mutates the original list!

n   = 5
arr = [1, 2, 3]

try_change(n)      # n is still 5
append_item(arr)   # arr is now [1, 2, 3, 99]`}}</Code>
      <Note color="warning" icon="ti-alert-triangle">
        Python's parameter passing is often called 'pass by object reference'. Integers, strings, and tuples are immutable — the function gets a reference but cannot mutate the original. Lists, dicts, and sets are mutable — the function can modify them in place. Reassignment inside a function (<code>x = something</code>) never affects the caller.
      </Note>

      <H2>Lambda / Anonymous Functions</H2>
      <Code>{{cpp: `// C++ — lambda syntax: [capture](params) { body }
auto square = [](int x) { return x * x; };
cout << square(5);   // 25

// ── With capture (access outer variables) ────────
int multiplier = 3;
auto multiply  = [multiplier](int x) { return x * multiplier; };

// ── Used with STL algorithms ──────────────────────
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;   // sort descending
});`, python: `# Python — lambda: compact single-expression function
square   = lambda x: x * x
print(square(5))    # 25

# ── Multi-arg lambda ─────────────────────────────
add = lambda a, b: a + b

# ── Common use: sorted() key function ────────────
pairs = [(1, 3), (2, 1), (3, 2)]
pairs.sort(key=lambda x: x[1])   # sort by second element
# → [(2, 1), (3, 2), (1, 3)]

# ── map / filter with lambda ─────────────────────
nums    = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, nums))      # [1, 4, 9, 16, 25]
evens   = list(filter(lambda x: x % 2 == 0, nums))  # [2, 4]`}}</Code>

      <H2>Recursion</H2>
      <Code>{{cpp: `// C++ — recursive function (classic factorial)
int factorial(int n) {
    if (n <= 1) return 1;       // base case
    return n * factorial(n - 1); // recursive case
}

// ── Recursive Fibonacci ───────────────────────────
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
// WARNING: O(2^n) — exponential without memoization

// ── With memoization (top-down DP) ───────────────
#include <unordered_map>
unordered_map<int, long long> memo;
long long fib_memo(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fib_memo(n-1) + fib_memo(n-2);
}`, python: `# Python — recursion has a default limit of 1000 calls
import sys
sys.setrecursionlimit(10**6)   # increase for DSA problems

def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

# ── Memoized Fibonacci using @cache ──────────────
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

print(fib(50))   # instant, even for large n`}}</Code>
      <FibTree />

      <H2>Function Complexity Cheatsheet</H2>
      <Table
        heads={["Pattern", "Time Complexity", "Example"]}
        rows={[
          ["Single loop in function", "O(n)", "sum(arr)"],
          ["Nested loop in function", "O(n²)", "naive search"],
          ["Recursive halving", "O(log n)", "binary search"],
          ["Recursive + all subproblems", "O(2ⁿ)", "fib without memo"],
          ["Recursive + memoization", "O(n)", "fib with memo"],
          ["Sorting before return", "O(n log n)", "sort-then-process"]
        ]}
      />

      <H2>Interview Q&A</H2>
      <QA q="What is the call stack and what happens when recursion is too deep?" a="Each function call pushes a <strong>stack frame</strong> (storing local variables, return address, parameters) onto the call stack. Each frame consumes memory — typically a few hundred bytes. For deep recursion (e.g., <code>fib(10000)</code> without memoization), the stack grows until it exceeds its allocated size, causing a <strong>stack overflow</strong> (C++: segmentation fault; Python: <code>RecursionError</code>). The fix is either memoization/DP to reduce call depth, or converting to an iterative approach using an explicit stack." />
      <QA q="What is the difference between passing a vector by value vs by reference in C++?" a="Passing by value (<code>void f(vector&lt;int&gt; v)</code>) creates a <strong>full copy</strong> of the vector — O(n) time and space overhead. Passing by reference (<code>void f(vector&lt;int&gt;&amp; v)</code>) passes only the pointer — O(1). For read-only access, use <code>const vector&lt;int&gt;&amp; v</code> to get the efficiency of a reference with the safety of preventing modification. In competitive programming, always pass containers by <code>const</code> reference unless you specifically need a copy." />
      <QA q="Why are Python lambda functions limited to a single expression?" a="Python's design philosophy (Guido van Rossum) intentionally restricts <code>lambda</code> to single expressions to discourage using anonymous functions as complex logic blocks. If you need multi-line logic, you should define a named function with <code>def</code> — this forces better code organization and readability. In C++, lambdas can contain full multi-statement bodies <code>{ ... }</code>." />
      <QA q="What is the difference between lru_cache and cache in Python's functools?" a="<code>lru_cache(maxsize=N)</code> keeps the N most recently used results and evicts older ones (Least Recently Used). <code>lru_cache(maxsize=None)</code> (or <code>cache</code> in Python 3.9+) keeps all results forever — equivalent to an unbounded memoization dictionary. For DSA, <code>@cache</code> (unbounded) is almost always what you want, since problem sizes are finite and you want every subproblem cached." />
      <QA q="What happens if you modify a list passed to a Python function — does the caller see the change?" a="Yes. Lists are mutable objects, and Python passes a reference to the same list object. Mutations (<code>append</code>, <code>pop</code>, <code>lst[i] = x</code>) directly modify the original. However, <strong>reassignment</strong> (<code>lst = [1, 2, 3]</code>) only rebinds the local name — the caller's variable still points to the original list. This asymmetry is a frequent source of bugs." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "vars", label: "Variables & Types" },
  { id: "ops", label: "Operators" },
  { id: "flow", label: "Control Flow" },
  { id: "loops", label: "Loops" },
  { id: "funcs", label: "Functions" },
];

export default function BasicSyntax() {
  const [active, setActive] = useState("vars");
  const map = {
    vars: <SectionVariables />,
    ops: <SectionOperators />,
    flow: <SectionControlFlow />,
    loops: <SectionLoops />,
    funcs: <SectionFunctions />
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 01</div>
        <h1 className="page-header-title">Basic C++ and Python Syntax</h1>
        <p className="page-header-subtitle">Variables · Operators · Control Flow · Loops · Functions</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={1} />
    </div>
  );
}
