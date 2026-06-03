import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

/**
 * Polished code block with:
 * - macOS-style header (coloured dots + language pill + copy button)
 * - Dark gradient background
 * - Monospace body with horizontal scroll
 * - Optional multi-language tabs (e.g. C++ and Python)
 * - Syntax highlighting via prism-react-renderer
 */
export function Code({ children, lang = 'python' }) {
  const [copied, setCopied] = useState(false);
  
  // Check if children is an object with language keys (like { cpp: "...", python: "..." })
  // ignoring React elements which have $$typeof
  const isMulti = typeof children === 'object' && children !== null && !Array.isArray(children) && !children.$$typeof;
  
  const defaultTab = isMulti ? (children.cpp ? 'cpp' : (children.python ? 'python' : Object.keys(children)[0])) : lang;
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleCopy = () => {
    const text = isMulti ? children[activeTab] : (typeof children === 'string' ? children : String(children));
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const renderTabs = () => {
    if (!isMulti) return <span className="code-block-lang">{lang}</span>;
    return (
      <div className="code-block-tabs" style={{ display: 'flex', gap: '8px' }}>
        {Object.keys(children).map(key => (
          <button 
            key={key} 
            onClick={() => setActiveTab(key)}
            style={{
              background: activeTab === key ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: 'none',
              color: activeTab === key ? '#fff' : 'rgba(255,255,255,0.6)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease'
            }}
          >
            {key}
          </button>
        ))}
      </div>
    );
  };

  const content = isMulti ? children[activeTab] : children;
  const displayLang = isMulti ? activeTab : lang;

  return (
    <div className="code-block">
      <div className="code-block-header">
        <div className="code-block-dots">
          <span className="code-block-dot red" />
          <span className="code-block-dot yellow" />
          <span className="code-block-dot green" />
        </div>
        {renderTabs()}
        <button className={`code-block-copy${copied ? ' copied' : ''}`} onClick={handleCopy}>
          <i className={`ti ${copied ? 'ti-check' : 'ti-copy'}`} style={{ fontSize: 11 }} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="code-block-body">
        <Highlight theme={themes.vsDark} code={content || ''} language={displayLang === 'c++' ? 'cpp' : displayLang}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, backgroundColor: 'transparent', margin: 0 }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

export default Code;
