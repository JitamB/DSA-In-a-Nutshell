import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar.jsx';
import { MODULES, getModule, getCategoryForModule } from './data/nav.js';
import { Helmet } from 'react-helmet-async';

/* ── Lazy page imports ──────────────────────────────────────── */
import { lazy, Suspense } from 'react';
import { P } from './components/ui/Typography.jsx';

const PAGE_MAP = {
  // ── Legacy mock/reference modules ─────────────────────────────
  // 101: lazy(() => import('./pages/Module1.jsx')),
  // 102: lazy(() => import('./pages/Module2.jsx')),
  // 103: lazy(() => import('./pages/MLPForward.jsx')),
  // 104: lazy(() => import('./pages/CNNFundamentals.jsx')),
  // 105: lazy(() => import('./pages/KerasFunctional.jsx')),
  // ── New DSA modules ────────────────────────
  1: lazy(() => import('./pages/BasicSyntax.jsx')),
  2: lazy(() => import('./pages/AsymptoticAnalysis.jsx')),
  3: lazy(() => import('./pages/Arrays.jsx')),
  4: lazy(() => import('./pages/PrefixSum.jsx')),
  5: lazy(() => import('./pages/SlidingWindowTwoPointers.jsx')),
  6: lazy(() => import('./pages/Strings.jsx')),
  7: lazy(() => import('./pages/Sorting.jsx')),
  8: lazy(() => import('./pages/BinarySearch.jsx')),
  9: lazy(() => import('./pages/BinarySearchApplications.jsx')),
  10: lazy(() => import('./pages/Recursion.jsx')),
  11: lazy(() => import('./pages/BacktrackingMITM.jsx')),
  12: lazy(() => import('./pages/Greedy.jsx')),
  13: lazy(() => import('./pages/DivideConquer.jsx')),
  14: lazy(() => import('./pages/LinkedList.jsx')),
  15: lazy(() => import('./pages/Stack.jsx')),
  16: lazy(() => import('./pages/Queue.jsx')),
  17: lazy(() => import('./pages/Trees.jsx')),
  18: lazy(() => import('./pages/BST.jsx')),
  19: lazy(() => import('./pages/BinaryHeap.jsx')),
  20: lazy(() => import('./pages/Hashing.jsx')),
  21: lazy(() => import('./pages/Graph.jsx')),
  22: lazy(() => import('./pages/GraphAlgorithms.jsx')),
  23: lazy(() => import('./pages/DPFundamentals.jsx')),
  24: lazy(() => import('./pages/DPAdvanced.jsx')),
  25: lazy(() => import('./pages/DPTrees.jsx')),
  26: lazy(() => import('./pages/DPBitmask.jsx')),

  //—— Core CS ————————————————————
  49: lazy(() => import('./pages/OOP.jsx')),
  50: lazy(() => import('./pages/OS.jsx')),
  51: lazy(() => import('./pages/DBMS.jsx')),


};

/* ── Loading fallback ───────────────────────────────────────── */
function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '60vh', gap: 10, color: 'var(--color-text-tertiary)', fontSize: 13,
    }}>
      <i className="ti ti-loader-2" style={{ fontSize: 20, animation: 'spin 1s linear infinite' }} />
      Loading module…
    </div>
  );
}

/* ── Module route wrapper ───────────────────────────────────── */
function ModulePage() {
  const { id } = useParams();
  const numId = Number(id);
  const PageComponent = PAGE_MAP[numId];
  const mod = getModule(numId);

  if (!PageComponent) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
        <i className="ti ti-mood-confused" style={{ fontSize: 40, display: 'block', marginBottom: 12 }} />
        Module {id} not found.
      </div>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      {mod && (
        <Helmet>
          <title>{mod.title} | DSA Guide</title>
          <meta name="description" content={`Learn about ${mod.title} in this comprehensive DSA module.`} />
          <meta property="og:title" content={`${mod.title} | DSA Guide`} />
          <meta property="twitter:title" content={`${mod.title} | DSA Guide`} />
        </Helmet>
      )}
      <PageComponent />
    </Suspense>
  );
}

/* ── Topbar ─────────────────────────────────────────────────── */
function TopBar({ onToggleSidebar, theme, onToggleTheme }) {
  const location = useLocation();
  const pathPart = location.pathname.split('/module/')[1];
  const numId = pathPart ? parseInt(pathPart, 10) : 1;
  const mod = getModule(numId);
  const category = getCategoryForModule(numId);

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button className="topbar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <i className="ti ti-layout-sidebar-left-expand" aria-hidden="true" />
        </button>
        <div className="topbar-breadcrumb">
          {category && (
            <>
              <span className="topbar-breadcrumb-category">{category}</span>
              <i className="ti ti-chevron-right topbar-breadcrumb-sep" aria-hidden="true" />
            </>
          )}
          <span className="topbar-breadcrumb-title">{mod?.title ?? 'DSA In a Nutshell'}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {mod && (
          <span className="topbar-progress" style={{ display: 'none', '@media(min-width:600px)': { display: 'inline' } }}>
            {numId} / {MODULES.length}
          </span>
        )}
        <button onClick={onToggleTheme} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center' }} aria-label="Toggle theme">
          {theme === 'dark' ? <i className="ti ti-sun" /> : <i className="ti ti-moon" />}
        </button>
      </div>
    </header>
  );
}

/* ── Content shell (topbar + scrollable page) ───────────────── */
function ContentShell({ onToggleSidebar, theme, onToggleTheme }) {
  return (
    <div className="content-shell">
      <TopBar onToggleSidebar={onToggleSidebar} theme={theme} onToggleTheme={onToggleTheme} />
      <div className="content-scroll">
        <div className="content-page">
          <Routes>
            <Route path="/" element={<Navigate to="/module/1" replace />} />
            <Route path="/module/:id" element={<ModulePage />} />
            <Route path="*" element={<Navigate to="/module/1" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

/* ── Root App ───────────────────────────────────────────────── */
export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') ||
      'light';
    //  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  // On mobile, collapse sidebar on route change
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarCollapsed(true);
    }
  }, [location.pathname]);

  // Initialise to collapsed on small screens
  useEffect(() => {
    setSidebarCollapsed(window.innerWidth <= 768);
  }, []);

  const toggle = () => setSidebarCollapsed(p => !p);
  const close = () => setSidebarCollapsed(true);

  return (
    <div className="app-shell">
      <Sidebar collapsed={sidebarCollapsed} onClose={close} />
      <ContentShell onToggleSidebar={toggle} theme={theme} onToggleTheme={toggleTheme} />

      {/* Spin keyframe for loading icon */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
