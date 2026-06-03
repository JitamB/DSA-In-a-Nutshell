import { useState } from "react";
import Code from '../components/ui/Code.jsx';
import { H2, P } from '../components/ui/Typography.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

const SectionIntro = () => {
  return (
    <div>
      <P>A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers.</P>
      <H2>Node Structure</H2>
      <Code>
        {{
          cpp: `// C++ Linked List Node
struct Node {
    int data;
    Node* next;
};`,
          python: `# Python Linked List Node
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
`
        }}
      </Code>
    </div>
  );
};

const TABS = [
  { id: "intro", label: "Introduction" }
];

export default function Module2() {
  const [active, setActive] = useState("intro");
  const sectionMap = { intro: <SectionIntro /> };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 02</div>
        <h1 className="page-header-title">Linked Lists</h1>
        <p className="page-header-subtitle">Nodes · Pointers · Linear Data Structure</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {sectionMap[active]}
      </div>

      <NavButtons moduleId={102} />
    </div>
  );
}
