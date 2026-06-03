# DSA In a Nutshell

A comprehensive, interactive web-based study guide for Data Structures and Algorithms (DSA). This platform is designed to provide clear explanations, math formulas, and code implementations in both **C++** and **Python**.

## Features

*   **Interactive Multi-Language Code Blocks:** Seamlessly toggle between C++ and Python syntax highlighting for code snippets.
*   **Beautiful Typography & Math:** Clean, readable typography with KaTeX integration for rendering complex mathematical formulas and algorithm complexities perfectly.
*   **Structured Learning Paths:** Modules organized by category (e.g., Data Structures, Algorithms), making it easy to navigate through topics like Arrays, Linked Lists, Trees, Graphs, Sorting, and Dynamic Programming.
*   **Responsive Design:** Fully responsive layout that works great on desktop, tablet, and mobile devices.

## Technology Stack

*   **Framework:** React (v18)
*   **Build Tool:** Vite
*   **Routing:** React Router (v6)
*   **Styling:** Custom Vanilla CSS (Design Tokens, CSS Variables)
*   **Math Rendering:** KaTeX
*   **Icons:** Tabler Icons

## Project Structure

```
DSA-In-a-Nutshell/
├── index.html
├── public/
├── src/
│   ├── App.jsx          # Root component and routing logic
│   ├── main.jsx
│   ├── components/
│   │   ├── layout/      # Sidebar, TopBar, SectionNav, NavButtons
│   │   └── ui/          # Code (multi-language), Math, Typography, QA, Primitives
│   ├── data/
│   │   └── nav.js       # Navigation configuration (Categories and Modules)
│   ├── pages/
│   └── styles/
```

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JitamB/DSA-In-a-Nutshell.git
    cd DSA-In-a-Nutshell
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5174/DSA-In-a-Nutshell/` (or `5173` depending on port availability).

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Contributing

Contributions are welcome! If you'd like to add a new DSA module, fix a typo, or improve an explanation:

1.  Fork the repository.
2.  Create a new branch for your feature or fix.
3.  Add your module in \`src/pages/\`.
4.  Register your module in \`src/data/nav.js\` and \`src/App.jsx\`.
5.  Submit a pull request.

When adding new content, please utilize the existing UI components (like \`<Math>\`, \`<Code>\`, \`<QA>\`, \`<Note>\`) to maintain consistency across the platform.

## Topics Covered

The site is organized into numbered modules. Key topics included on the site:

- **01 Basic C++ & Python Syntax** — Variables, operators, control flow, loops
- **02 Asymptotic Analysis & Recurrences** — Big-O, Master Theorem, recursion trees
- **03 Arrays** — Array operations and common algorithmic patterns
- **04 Prefix Sum** — Prefix-sum techniques and problem patterns
- **05 Sliding Window & Two Pointers** — Windowed algorithms and two-pointer strategies
- **06 Strings** — String handling and string-algorithm patterns
- **07 Sorting** — Classic sorting algorithms and trade-offs
- **08 Binary Search** — Binary search fundamentals and variants
- **09 Applications of Binary Search** — Search-on-answer and parametric search problems
- **10 Recursion** — Recursion fundamentals and examples
- **11 Brute Force & Backtracking** — Exhaustive search and pruning techniques
- **12 Greedy Techniques** — Greedy algorithm patterns and proofs
- **13 Divide & Conquer** — Divide-and-conquer strategies and examples
- **14 Linked Lists** — List operations, pointers, and examples
- **15 Stacks** — Stack usage, expression evaluation, MinStack
- **16 Queues** — Queue behaviors and examples
- **17 Trees** — Traversals, metrics, and tree algorithms
- **18 Binary Search Trees** — BST operations and properties
- **19 Binary Heaps** — Heap operations and priority queues
- **20 Hash Tables** — Division, multiplication, chaining, open addressing, prefix-hash pattern
- **21 Graphs 1** — Graph basics, BFS, DFS
- **22 Graphs 2** — Advanced graph topics and algorithms
- **23 DP Basics** — Dynamic programming fundamentals
- **24 Advanced DP** — Advanced DP patterns and case studies
- **25 DP on Trees** — Tree DP techniques
- **26 DP on Graphs** — DP applied to graph problems

There are also a few reference/mock modules and core CS topic pages (OOPs, DBMS, OS) that can be extended.

## Known issues & troubleshooting

- When writing KaTeX math containing braces (e.g. `2^{n}` or `\text{min}`), avoid using raw JSX braces inside `<Mx>` or `<Math>` components which can be interpreted as JavaScript expressions. Use string literals for KaTeX content when necessary.
- Avoid import name collisions with global identifiers (for example, rename imported `Math` or `H2` components when the file also uses variables named `Math` or `H2`).
- If you encounter a 500 / parse error during development, the Vite overlay will show the file and location; fix the syntax and save to trigger a rebuild.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for the full text.