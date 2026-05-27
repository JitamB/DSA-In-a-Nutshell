export const CATEGORIES = [
  {
    label: "Data Structures",
    icon: "ti-layers-intersect",
    moduleIds: [1, 2]
  }
];

export const MODULES = [
  { id: 1, title: "Arrays 101", subtitle: "Contiguous Memory · Traversal · Fixed vs Dynamic" },
  { id: 2, title: "Linked Lists", subtitle: "Nodes · Pointers · Linear Data Structure" }
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
