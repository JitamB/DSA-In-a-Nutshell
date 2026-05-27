import { useState } from "react";
import Code from '../components/ui/Code.jsx';
import { H2, P } from '../components/ui/Typography.jsx';
import { Note } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

const SectionIntro = () => {
  return (
    <div>
      <P>An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.</P>
      <H2>Declaration and Initialization</H2>
      <Code>
        {{
          cpp: `// C++ Array Example
#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`,
          python: `# Python List Example (Arrays)
arr = [10, 20, 30, 40, 50]
for item in arr:
    print(item, end=" ")
`
        }}
      </Code>
      <Note color="info" icon="ti-info-circle">
        In C++, arrays have a fixed size. In Python, lists act as dynamic arrays.
      </Note>
    </div>
  );
};

const SectionOperations = () => {
  return (
    <div>
      <P>Common operations on arrays include Traversal, Insertion, Deletion, and Searching.</P>
      <H2>Array Traversal</H2>
      <Code lang="cpp">
        {`// Only C++ is shown here
for(int i = 0; i < n; i++) {
    cout << arr[i] << endl;
}`}
      </Code>
    </div>
  );
};

const TABS = [
  { id: "intro", label: "Introduction" },
  { id: "ops", label: "Operations" }
];

export default function Module1() {
  const [active, setActive] = useState("intro");
  const sectionMap = { intro: <SectionIntro />, ops: <SectionOperations /> };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 01</div>
        <h1 className="page-header-title">Arrays 101</h1>
        <p className="page-header-subtitle">Contiguous Memory · Traversal · Fixed vs Dynamic</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {sectionMap[active]}
      </div>

      <NavButtons moduleId={1} />
    </div>
  );
}
