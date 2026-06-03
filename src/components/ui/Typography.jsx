import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Mx — Pre-formatted math/text block (monospace, unchanged from original)
 *
 * Block:  <Mx block>{`z = W·a + b\n  ...`}</Mx>  → styled monospace block
 * Inline: <Mx>w·x + b</Mx>                        → inline monospace chip
 *
 * For proper LaTeX rendering, use the <Math> component instead.
 */
export function Mx({ block, children }) {
  if (block) {
    return <span className="math-block">{children}</span>;
  }
  return <code className="math-inline">{children}</code>;
}

/**
 * Math — KaTeX renderer for proper LaTeX math
 *
 * Inline: <Math>W^{(l)}_{jk}</Math>
 * Block:  <Math block>\frac{\partial L}{\partial z^{(l)}}</Math>
 *
 * Pass standard LaTeX syntax as children (no $ delimiters needed).
 */
export function Math({ block, children }) {
  const src = typeof children === 'string' ? children : String(children ?? '');
  try {
    const html = katex.renderToString(src, {
      throwOnError: true,
      displayMode: !!block,
      strict: false,
    });
    return (
      <span
        className={block ? 'math-block-katex' : 'math-inline-katex'}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (e) {
    // Render error in a visible red badge so it's easy to spot and fix
    return (
      <code className="math-inline" style={{ color: 'var(--color-text-danger)', background: 'var(--color-background-danger)' }}>
        [LaTeX error: {e.message}]
      </code>
    );
  }
}

/** H2 — Section heading */
export function H2({ c, children }) {
  return <h2 className="h2">{c ?? children}</h2>;
}

/** H3 — Sub-section heading */
export function H3({ c, children }) {
  return <h3 className="h3">{c ?? children}</h3>;
}

/** P — Body paragraph */
export function P({ c, s, children }) {
  return <p className="p" style={s}>{c ?? children}</p>;
}
