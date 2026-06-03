// Get the thermify icon names here: https://themify.me/themify-icons

export const CATEGORIES = [
  { label: "Fundamentals", icon: "ti-layers-intersect", moduleIds: [1] },
  { label: "Time Complexity", icon: "ti-clock", moduleIds: [2] },
  // { label: "Basic Algorithms", icon: "ti-code", moduleIds: [3] },
  { label: "Arrays and Strings", icon: "ti-box", moduleIds: [3, 4, 5, 6] },
  { label: "Sorting and Searching", icon: "ti-arrows-sort", moduleIds: [7, 8, 9] },
  { label: "Algorithmic Paradigm", icon: "ti-reload", moduleIds: [10, 11, 12, 13] },
  { label: "Basic Data structures", icon: "ti-container", moduleIds: [14, 15, 16] },
  { label: "Advanced Data structures", icon: "ti-briefcase", moduleIds: [17, 18, 19, 20] },
  { label: "Play with Graphs", icon: "ti-chart-dots-3", moduleIds: [21, 22] },
  { label: "Dynamic Programming", icon: "ti-crown", moduleIds: [23, 24, 25, 26] },
  { label: "Advanced DSA Topics", icon: "", moduleIds: [] },

  { label: "Core CS Topics", icon: "ti-tablet", moduleIds: [49, 50, 51] }

  // { label: "Reference / Mock", icon: "ti-flask", moduleIds: [101, 102, 103, 104, 105] }
];

export const MODULES = [
  // ── New DSA modules will be inserted here starting from id: 1 ──
  { id: 1, title: "Basic C++ & Python Syntax", subtitle: "Variables · Operators · Control Flow · Loops" },
  { id: 2, title: "Asymptotic Analysis & Recurrences", subtitle: "Big-O · Master Theorem · Recursion Trees" },
  { id: 3, title: "Arrays", Subtitle: "Basics of Arrays" },
  { id: 4, title: "Prefix Sum", subtitle: "..." },
  { id: 5, title: "Sliding Window and Two Pointers", subtitle: "..." },
  { id: 6, title: "Strings", subtitle: "..." },
  { id: 7, title: "Sorting", subtitle: "..." },
  { id: 8, title: "Binary Search", subtitle: "Basics of Binary Search" },
  { id: 9, title: "Applications of BS", subtitle: "BS on Ans · " },
  { id: 10, title: "Recursion", subtitle: "Fundamentals · Exmples · Practices" },
  { id: 11, title: "Brute Force and Backtracking", subtitle: "..." },
  { id: 12, title: "Greedy Techniques", subtitle: "..." },
  { id: 13, title: "Divide and Conquer", subtitle: "..." },
  { id: 14, title: "Linked Lists", subtitle: "..." },
  { id: 15, title: "Stacks", subtitle: "..." },
  { id: 16, title: "Queues", subtitle: "..." },
  { id: 17, title: "Trees", subtitle: "..." },
  { id: 18, title: "Binary Search Trees", subtitle: "..." },
  { id: 19, title: "Binary Heaps", subtitle: "..." },
  { id: 20, title: "Hash Tables", subtitle: "..." },
  { id: 21, title: "Graphs Fundamentals", subtitle: "..." },
  { id: 22, title: "Graphs Algorithms", subtitle: "..." },
  { id: 23, title: "DP Basics", subtitle: "..." },
  { id: 24, title: "Advanced DP", subtitle: "..." },
  { id: 25, title: "DP on Trees", subtitle: "..." },
  { id: 26, title: "DP Bitmask", subtitle: "..." },


  // —— Core CS Topics ——————
  { id: 49, title: "OOPs", subtitle: "..." },
  { id: 50, title: "OS", subtitle: "..." },
  { id: 51, title: "DBMS", subtitle: "..." },

  // ── Legacy mock/reference modules ─────────────────────────────
  { id: 101, title: "Arrays 101 (Mock)", subtitle: "Contiguous Memory · Traversal · Fixed vs Dynamic" },
  { id: 102, title: "Linked Lists (Mock)", subtitle: "Nodes · Pointers · Linear Data Structure" },
  { id: 103, title: "Example MLP (Ref)", subtitle: "Forward pass and backward pass of a simple MLP" },
  { id: 104, title: "CNN Fundamentals (Ref)", subtitle: "Convolution · Pooling · Translation Invariance" },
  { id: 105, title: "Keras Functionals", subtitle: "..." },
];

export function getModule(id) {
  return MODULES.find((m) => m.id === id);
}

export function getAdjacentModules(id) {
  const index = MODULES.findIndex((m) => m.id === id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? MODULES[index - 1] : null,
    next: index < MODULES.length - 1 ? MODULES[index + 1] : null
  };
}

export function getCategoryForModule(moduleId) {
  return CATEGORIES.find((cat) => cat.moduleIds.includes(moduleId))?.label || "Uncategorized";
}
