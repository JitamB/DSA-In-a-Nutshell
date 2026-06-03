import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { H2, H3, P, Mx } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox, Badge } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   PRE-BUILT DATA — computed at module load
══════════════════════════════════════════════════════ */

// LPS steps for "ababcd" → [0,0,1,2,0,0]
const LPS_STR = "ababcd";
function buildLPSSteps(str) {
  const n = str.length;
  const steps = [];
  const lps = Array(n).fill(-1);
  lps[0] = 0;
  steps.push({ lps: [...lps], i: 0, len: 0, compare: null, action: 'base',
    desc: 'lps[0] = 0 always. A single character has no proper prefix that is also a suffix.' });
  let i = 1, len = 0;
  while (i < n) {
    const ci = i, clen = len;
    if (str[i] === str[len]) {
      len++; lps[i] = len;
      steps.push({ lps: [...lps], i, len, compare: [ci, clen], action: 'match',
        desc: `i=${ci}: '${str[ci]}'[i] = '${str[clen]}'[len=${clen}]  ✓  →  len=${len}, lps[${ci}]=${len}, advance i` });
      i++;
    } else if (len > 0) {
      const newLen = lps[len - 1];
      steps.push({ lps: [...lps], i, len: newLen, compare: [ci, clen], action: 'fallback',
        desc: `i=${ci}: '${str[ci]}'[i] ≠ '${str[clen]}'[len=${clen}].  len>0 → FALLBACK: len = lps[${clen - 1}] = ${newLen}  (try shorter prefix)` });
      len = newLen;
    } else {
      lps[i] = 0;
      steps.push({ lps: [...lps], i, len: 0, compare: [ci, 0], action: 'zero',
        desc: `i=${ci}: '${str[ci]}'[i] ≠ '${str[0]}'[len=0].  len=0, can't fall back  →  lps[${ci}]=0, advance i` });
      i++;
    }
  }
  steps.push({ lps: [...lps], i: n, len: null, compare: null, action: 'done',
    desc: `Complete!  LPS = [${lps.join(', ')}]` });
  return steps;
}
const LPS_STEPS = buildLPSSteps(LPS_STR);

// Rabin-Karp steps: txt="ABCABCABC", pat="CAB"
// d=26, q=29, h=d^(m-1)%q=9, pat_hash=19
const RH_TXT = "ABCABCABC", RH_PAT = "CAB";
const RH_PAT_HASH = 19, RH_Q = 29;
const RH_STEPS = [
  { win: 0, hash: 28, match: false, desc: "Window 'ABC': hash=28 ≠ 19 (pat_hash). No match — slide." },
  { win: 1, hash: 3,  match: false, desc: "Window 'BCA': rolling update: (26×(28−0×9)+0)%29 = 3 ≠ 19. Slide." },
  { win: 2, hash: 19, match: true,  desc: "Window 'CAB': rolling: (26×(3−1×9)+1)%29 = 19 = pat_hash  ✓  Verify chars → MATCH at index 2!" },
  { win: 3, hash: 28, match: false, desc: "Window 'ABC': rolling: (26×(19−2×9)+2)%29 = 28 ≠ 19. Slide." },
  { win: 4, hash: 3,  match: false, desc: "Window 'BCA': rolling: hash = 3 ≠ 19. Slide." },
  { win: 5, hash: 19, match: true,  desc: "Window 'CAB': rolling: hash = 19 = pat_hash  ✓  Verify chars → MATCH at index 5!" },
  { win: 6, hash: 28, match: false, desc: "Window 'ABC': hash=28 ≠ 19. Done! Matches found at indices: [2, 5]." },
];

/* ══════════════════════════════════════════════════════
   INTERACTIVE 1 — ASCII CHARACTER EXPLORER
   Type any string → each char shown as a card with
   decimal, hex, binary, type, and arr[i]-'a' offset
══════════════════════════════════════════════════════ */
function AsciiViz() {
  const [str, setStr] = useState("Hello, DSA!");
  const [hov, setHov] = useState(null);

  const typeOf = (c) => {
    if (c >= 'a' && c <= 'z') return 'lowercase';
    if (c >= 'A' && c <= 'Z') return 'uppercase';
    if (c >= '0' && c <= '9') return 'digit';
    if (c === ' ') return 'space';
    return 'special';
  };
  const TYPE_CLR = {
    lowercase: { bg: 'var(--color-background-info)',    bd: 'var(--color-border-info)',    tx: 'var(--color-text-info)'    },
    uppercase: { bg: 'var(--color-background-success)', bd: 'var(--color-border-success)', tx: 'var(--color-text-success)' },
    digit:     { bg: 'var(--color-background-warning)', bd: 'var(--color-border-warning)', tx: 'var(--color-text-warning)' },
    space:     { bg: 'var(--color-background-secondary)',bd:'var(--color-border-secondary)',tx: 'var(--color-text-tertiary)' },
    special:   { bg: 'var(--color-background-danger)',  bd: 'var(--color-border-danger)',  tx: 'var(--color-text-danger)'  },
  };

  const chars = str.slice(0, 18).split('');

  return (
    <VizBox>
      <input
        value={str} onChange={e => setStr(e.target.value.slice(0, 18))}
        placeholder="Type any string (max 18 chars)…"
        style={{ width: '100%', padding: '8px 12px', background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 'var(--border-radius-md)', color: 'var(--color-background-tertiary)', fontFamily: 'var(--font-mono)', fontSize: 14, marginBottom: 14, outline: 'none', boxSizing: 'border-box' }}
      />

      {/* Character cards */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 14 }}>
        {chars.map((c, i) => {
          const t = typeOf(c), col = TYPE_CLR[t], on = hov === i;
          return (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'default' }}>
              <div style={{ width: 46, height: 54, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, borderRadius: 8, border: `1px solid ${col.bd}`, background: col.bg, transform: on ? 'translateY(-5px) scale(1.06)' : 'none', transition: 'transform 0.15s, box-shadow 0.15s', boxShadow: on ? '0 8px 20px rgba(0,0,0,0.4)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 700, color: col.tx }}>{c === ' ' ? '⎵' : c}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: col.tx, opacity: 0.75 }}>{c.charCodeAt(0)}</span>
              </div>
              <span style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{i}]</span>
            </div>
          );
        })}
      </div>

      {/* Hover detail panel */}
      {hov !== null && hov < chars.length ? (
        <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2, marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 18px' }}>
            <span><span style={{ color: '#7A8599' }}>char: </span><span style={{ color: '#9CDCFE', fontWeight: 700 }}>'{chars[hov] === ' ' ? 'SP' : chars[hov]}'</span></span>
            <span><span style={{ color: '#7A8599' }}>decimal: </span><span style={{ color: '#4EC9B0' }}>{chars[hov].charCodeAt(0)}</span></span>
            <span><span style={{ color: '#7A8599' }}>hex: </span><span style={{ color: '#CE9178' }}>0x{chars[hov].charCodeAt(0).toString(16).toUpperCase().padStart(2,'0')}</span></span>
            <span><span style={{ color: '#7A8599' }}>binary: </span><span style={{ color: '#DCDCAA', fontSize: 11 }}>{chars[hov].charCodeAt(0).toString(2).padStart(8,'0')}</span></span>
            <span><span style={{ color: '#7A8599' }}>type: </span><span style={{ color: TYPE_CLR[typeOf(chars[hov])].tx }}>{typeOf(chars[hov])}</span></span>
            <span><span style={{ color: '#7A8599' }}>-'a': </span><span style={{ color: '#C586C0' }}>
              {chars[hov].toLowerCase() >= 'a' && chars[hov].toLowerCase() <= 'z'
                ? chars[hov].toLowerCase().charCodeAt(0) - 97 : 'N/A'}
            </span></span>
          </div>
        </div>
      ) : (
        <div style={{ padding: '8px 12px', background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#6f7ba7', marginBottom: 12 }}>
          {'// Hover any character card to inspect its ASCII properties'}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {Object.entries(TYPE_CLR).map(([t, col]) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11 }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: col.bg, border: `1px solid ${col.bd}` }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>{t}</span>
          </div>
        ))}
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 2 — LIVE ANAGRAM CHECKER
   Two text inputs → real-time frequency bar comparison
══════════════════════════════════════════════════════ */
function AnagramViz() {
  const [s1, setS1] = useState("listen");
  const [s2, setS2] = useState("silent");

  const freq = (s) => {
    const f = Array(26).fill(0);
    s.toLowerCase().split('').forEach(c => {
      if (c >= 'a' && c <= 'z') f[c.charCodeAt(0) - 97]++;
    });
    return f;
  };
  const f1 = freq(s1), f2 = freq(s2);
  const maxF = Math.max(...f1, ...f2, 1);
  const isAnagram = s1.length === s2.length && f1.every((v, i) => v === f2[i]);
  const activeLetters = 'abcdefghijklmnopqrstuvwxyz'.split('').filter((_, i) => f1[i] > 0 || f2[i] > 0);

  return (
    <VizBox>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[['String 1', s1, setS1], ['String 2', s2, setS2]].map(([lbl, val, setter]) => (
          <div key={lbl}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>{lbl}</div>
            <input type="text" value={val} onChange={e => setter(e.target.value.toLowerCase())}
              style={{ width: '100%', padding: '7px 10px', background: 'var(--color-background-tertiary)', border: '1px solid #1E2233', borderRadius: 'var(--border-radius-md)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>

      {activeLetters.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.06em' }}>
            FREQUENCY COMPARISON — solid = s1 · faded = s2
          </div>
          <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {activeLetters.map(c => {
              const idx = c.charCodeAt(0) - 97;
              const v1 = f1[idx], v2 = f2[idx];
              const ok = v1 === v2;
              const barH = 52;
              return (
                <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: barH + 4 }}>
                    <div style={{ width: 11, height: Math.max(3, (v1 / maxF) * barH), borderRadius: '2px 2px 0 0', background: ok ? 'var(--color-background-success)' : 'var(--color-background-danger)', border: `0.5px solid ${ok ? 'var(--color-border-success)' : 'var(--color-border-danger)'}`, transition: 'height 0.25s, background 0.2s', alignSelf: 'flex-end' }} />
                    <div style={{ width: 11, height: Math.max(3, (v2 / maxF) * barH), borderRadius: '2px 2px 0 0', background: ok ? 'rgba(78,201,176,0.35)' : 'rgba(244,71,71,0.35)', border: `0.5px solid ${ok ? 'var(--color-border-success)' : 'var(--color-border-danger)'}`, transition: 'height 0.25s, background 0.2s', alignSelf: 'flex-end' }} />
                  </div>
                  <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: ok ? 'var(--color-text-success)' : 'var(--color-text-danger)' }}>{c}</span>
                  <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>{v1}/{v2}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ padding: '10px 16px', borderRadius: 'var(--border-radius-md)', background: isAnagram ? 'var(--color-background-success)' : 'var(--color-background-danger)', border: `1px solid ${isAnagram ? 'var(--color-border-success)' : 'var(--color-border-danger)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, transition: 'all 0.2s' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: isAnagram ? 'var(--color-text-success)' : 'var(--color-text-danger)' }}>
          {isAnagram ? '✓  ANAGRAM' : '✗  NOT AN ANAGRAM'}
        </span>
        {!isAnagram && s1.length !== s2.length && (
          <span style={{ fontSize: 11.5, color: 'var(--color-text-danger)', fontFamily: 'var(--font-mono)' }}>
            lengths: {s1.length} ≠ {s2.length}
          </span>
        )}
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 3 — RABIN-KARP ROLLING HASH
   txt="ABCABCABC" pat="CAB" — window slides step by step
══════════════════════════════════════════════════════ */
function RollingHashViz() {
  const [step, setStep] = useState(0);
  const s = RH_STEPS[step];
  const m = RH_PAT.length;
  const matchedIndices = RH_STEPS.filter(x => x.match).map(x => x.win);

  return (
    <VizBox>
      <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 14, padding: '6px 10px', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', lineHeight: 1.55 }}>
        {s.desc}
      </div>

      {/* Text cells */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>TEXT   d=26, q=29, h=d^(m-1)%q=9</div>
        <div style={{ display: 'flex', gap: 3 }}>
          {RH_TXT.split('').map((c, i) => {
            const inWin  = i >= s.win && i < s.win + m;
            const isMark = matchedIndices.includes(i) && i < s.win;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid', borderColor: s.match && inWin ? 'var(--color-border-success)' : inWin ? 'var(--color-border-info)' : 'var(--color-border-secondary)', background: s.match && inWin ? 'var(--color-background-success)' : inWin ? 'var(--color-background-info)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: inWin ? 700 : 400, color: s.match && inWin ? 'var(--color-text-success)' : inWin ? 'var(--color-text-info)' : 'var(--color-text-secondary)', transition: 'all 0.15s' }}>
                  {c}
                </div>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern + hashes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-md)', padding: '9px 12px' }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 4 }}>PATTERN HASH (precomputed once)</div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
            {RH_PAT.split('').map((c, i) => (
              <div key={i} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, background: 'var(--color-background-info)', border: '0.5px solid var(--color-border-info)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--color-text-info)' }}>{c}</div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            <span style={{ color: 'var(--color-text-tertiary)' }}>hash_pat = </span>
            <span style={{ color: 'var(--color-text-info)', fontWeight: 700, fontSize: 14 }}>{RH_PAT_HASH}</span>
          </div>
        </div>
        <div style={{ background: s.match ? 'var(--color-background-success)' : 'var(--color-background-secondary)', border: `0.5px solid ${s.match ? 'var(--color-border-success)' : 'var(--color-border-secondary)'}`, borderRadius: 'var(--border-radius-md)', padding: '9px 12px', transition: 'all 0.2s' }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: s.match ? 'var(--color-text-success)' : 'var(--color-text-tertiary)', marginBottom: 4 }}>WINDOW HASH (rolling O(1))</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 4 }}>
            <span style={{ color: 'var(--color-text-tertiary)' }}>window: </span>
            <span style={{ color: s.match ? 'var(--color-text-success)' : 'var(--color-text-info)', fontWeight: 700 }}>
              "{RH_TXT.slice(s.win, s.win + m)}"
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            <span style={{ color: 'var(--color-text-tertiary)' }}>hash_win = </span>
            <span style={{ fontWeight: 700, fontSize: 14, color: s.hash === RH_PAT_HASH ? 'var(--color-text-success)' : 'var(--color-text-danger)' }}>{s.hash}</span>
            <span style={{ marginLeft: 8, fontSize: 11, color: s.match ? 'var(--color-text-success)' : 'var(--color-text-danger)' }}>
              {s.hash === RH_PAT_HASH ? '= pat_hash ✓' : '≠ pat_hash ✗'}
            </span>
          </div>
        </div>
      </div>

      {/* Rolling formula (shown from step 1 onwards) */}
      {step > 0 && (
        <div style={{ background: '#0D0F18', border: '1px solid #1E2233', borderRadius: 8, padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.8, marginBottom: 14 }}>
          <span style={{ color: '#6A9955' }}>{'// Rolling update formula: O(1) per slide'}</span>
          <div><span style={{ color: '#9CDCFE' }}>hash_new</span><span style={{ color: '#7A8599' }}> = (d × (hash_old − txt[i] × h) + txt[i+m]) % q</span></div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 64, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {RH_STEPS.length}</span>
        <button onClick={() => setStep(Math.min(RH_STEPS.length - 1, step + 1))} disabled={step === RH_STEPS.length - 1} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === RH_STEPS.length - 1 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === RH_STEPS.length - 1 ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 4 — ROTATION CHECK (S1 + S1 TRICK)
   Live: type S1 and S2, see S2 highlighted inside S1+S1
══════════════════════════════════════════════════════ */
function RotationViz() {
  const [s1, setS1] = useState("ABCD");
  const [s2, setS2] = useState("CDAB");

  const concat = s1 + s1;
  const matchIdx = s1.length > 0 && s2.length > 0 && s1.length === s2.length
    ? concat.indexOf(s2) : -1;
  const isRotation = matchIdx !== -1;

  return (
    <VizBox>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[['S1', s1, setS1], ['S2 (possible rotation?)', s2, setS2]].map(([lbl, val, setter]) => (
          <div key={lbl}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>{lbl}</div>
            <input type="text" value={val} onChange={e => setter(e.target.value.toUpperCase())}
              style={{ width: '100%', padding: '7px 10px', background: 'var(--color-background-tertiary)', border: '1px solid #1E2233', borderRadius: 'var(--border-radius-md)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>

      {/* S1 + S1 concatenated display */}
      {s1.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>
            S1 + S1 = "{concat}" — scanning for S2
          </div>
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {concat.split('').map((c, i) => {
              const inS2  = matchIdx !== -1 && i >= matchIdx && i < matchIdx + s2.length;
              const isDiv = i === s1.length; // division between two S1 copies
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {isDiv && <div style={{ width: 2, height: 36, background: 'var(--color-border-info)', borderRadius: 1, opacity: 0.6 }} />}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, border: '1px solid', borderColor: inS2 ? 'var(--color-border-success)' : i >= s1.length ? 'var(--color-border-info)' : 'var(--color-border-secondary)', background: inS2 ? 'var(--color-background-success)' : i >= s1.length ? 'rgba(129,180,234,0.1)' : 'var(--color-background-secondary)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: inS2 ? 700 : 400, color: inS2 ? 'var(--color-text-success)' : i >= s1.length ? 'var(--color-text-info)' : 'var(--color-text-secondary)', transition: 'all 0.15s' }}>
                      {c}
                    </div>
                    <span style={{ fontSize: 8.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>{i}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verdict */}
      <div style={{ padding: '10px 16px', borderRadius: 'var(--border-radius-md)', background: isRotation ? 'var(--color-background-success)' : s1.length !== s2.length ? 'var(--color-background-warning)' : 'var(--color-background-danger)', border: `1px solid ${isRotation ? 'var(--color-border-success)' : s1.length !== s2.length ? 'var(--color-border-warning)' : 'var(--color-border-danger)'}`, textAlign: 'center', transition: 'all 0.2s' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: isRotation ? 'var(--color-text-success)' : s1.length !== s2.length ? 'var(--color-text-warning)' : 'var(--color-text-danger)' }}>
          {s1.length !== s2.length ? '⚠ Different lengths — cannot be rotations' : isRotation ? `✓ YES — S2 found at index ${matchIdx} in S1+S1` : '✗ NOT a rotation'}
        </span>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE 5 — KMP LPS ARRAY BUILDER
   Step-through for "ababcd" → [0,0,1,2,0,0]
   Shows len pointer, i pointer, fallback arrows
══════════════════════════════════════════════════════ */
function LPSBuilderViz() {
  const [step, setStep] = useState(0);
  const s = LPS_STEPS[step];
  const n = LPS_STR.length;

  const ACTION_STYLE = {
    base:     { badge: 'Base case',    color: 'info'    },
    match:    { badge: 'Match ✓',      color: 'success' },
    fallback: { badge: 'Fallback ↩',   color: 'warning' },
    zero:     { badge: 'No match',     color: 'danger'  },
    done:     { badge: 'Complete ✓',   color: 'success' },
  };
  const as = ACTION_STYLE[s.action] || ACTION_STYLE.base;

  return (
    <VizBox>
      {/* Action badge + description */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <span style={{ padding: '2px 9px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: `var(--color-background-${as.color})`, color: `var(--color-text-${as.color})`, border: `1px solid var(--color-border-${as.color})`, whiteSpace: 'nowrap' }}>{as.badge}</span>
        <span style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>{s.desc}</span>
      </div>

      {/* String cells with i and len pointer markers */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>
          STRING "{LPS_STR}" — <span style={{ color: 'var(--color-text-info)' }}>blue = i (scan)</span> · <span style={{ color: 'var(--color-text-success)' }}>green = len (prefix match)</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {LPS_STR.split('').map((c, idx) => {
            const isI    = s.compare && s.compare[0] === idx;
            const isLen  = s.compare && s.compare[1] === idx && !isI;
            const isBoth = s.compare && s.compare[0] === idx && s.compare[1] === idx;
            const isDone = s.action === 'done';
            const matched = s.action === 'match' && (isI || isLen);

            let bg = 'var(--color-background-secondary)', bd = 'var(--color-border-secondary)', cl = 'var(--color-text-secondary)';
            if (isDone)         { bg = 'var(--color-background-success)'; bd = 'var(--color-border-success)'; cl = 'var(--color-text-success)'; }
            else if (isBoth)    { bg = 'var(--color-background-info)';    bd = 'var(--color-border-info)';    cl = 'var(--color-text-info)'; }
            else if (matched)   { bg = 'var(--color-background-success)'; bd = 'var(--color-border-success)'; cl = 'var(--color-text-success)'; }
            else if (isI && (s.action === 'fallback' || s.action === 'zero'))
                                { bg = 'var(--color-background-danger)';  bd = 'var(--color-border-danger)';  cl = 'var(--color-text-danger)'; }
            else if (isI)       { bg = 'var(--color-background-info)';    bd = 'var(--color-border-info)';    cl = 'var(--color-text-info)'; }
            else if (isLen)     { bg = 'var(--color-background-success)'; bd = 'var(--color-border-success)'; cl = 'var(--color-text-success)'; }

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: `1px solid ${bd}`, background: bg, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: (isI || isLen || isDone) ? 700 : 400, color: cl, transition: 'all 0.18s' }}>
                  {c}
                </div>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: isI ? 'var(--color-text-info)' : isLen ? 'var(--color-text-success)' : 'var(--color-text-tertiary)' }}>
                  {isI && isLen ? 'i=l' : isI ? 'i' : isLen ? 'len' : idx}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* LPS array cells */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', marginBottom: 6, letterSpacing: '0.06em' }}>
          LPS[] — filling in as we go
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {s.lps.map((v, idx) => {
            const computed = v !== -1;
            const isJust   = s.action !== 'done' && s.compare && s.compare[0] === idx && s.action !== 'fallback';
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid', borderColor: isJust ? 'var(--color-border-success)' : computed ? 'var(--color-border-info)' : 'var(--color-border-tertiary)', background: isJust ? 'var(--color-background-success)' : computed ? 'rgba(129,180,234,0.1)' : 'var(--color-background-tertiary)', fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: computed ? 700 : 400, color: isJust ? 'var(--color-text-success)' : computed ? 'var(--color-text-info)' : 'var(--color-text-tertiary)', transition: 'all 0.2s' }}>
                  {computed ? v : '?'}
                </div>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Special fallback callout */}
      {s.action === 'fallback' && (
        <div style={{ background: 'var(--color-background-warning)', border: '1px solid var(--color-border-warning)', borderRadius: 'var(--border-radius-md)', padding: '8px 12px', marginBottom: 14, fontSize: 12.5, color: 'var(--color-text-warning)', lineHeight: 1.65 }}>
          <strong>Fallback:</strong> Instead of resetting to 0 (as in naive search), we fall back to <code>len = lps[len−1]</code> — trying the next-shorter prefix that could still extend. This is the KMP optimization: we reuse previously computed prefix info.
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === 0 ? 0.4 : 1 }}>← Prev</button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-tertiary)', minWidth: 64, textAlign: 'center', alignSelf: 'center' }}>{step + 1} / {LPS_STEPS.length}</span>
        <button onClick={() => setStep(Math.min(LPS_STEPS.length - 1, step + 1))} disabled={step === LPS_STEPS.length - 1} style={{ padding: '5px 14px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: step === LPS_STEPS.length - 1 ? 'not-allowed' : 'pointer', fontSize: 12, opacity: step === LPS_STEPS.length - 1 ? 0.4 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: '5px 9px', border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 12 }}>↺</button>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   PROBLEM CARD
══════════════════════════════════════════════════════ */
const DIFF_CLR = { 'IIT OA': 'info', 'OA Easy': 'success', 'OA Medium': 'warning', 'OA Hard': 'danger', 'LC Medium': 'info', 'LC Hard': 'purple' };
function ProblemCard({ num, title, difficulty, tags = [], statement, constraints = [], examples = [], approach, code }) {
  const [open, setOpen] = useState(false);
  const dc = DIFF_CLR[difficulty] || 'info';
  return (
    <div style={{ border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', background: 'var(--color-background-secondary)', borderBottom: '1px solid var(--color-border-tertiary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--color-text-tertiary)', minWidth: 26 }}>Q{num}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text-primary)' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {tags.map(t => <span key={t} style={{ padding: '1px 7px', borderRadius: 12, fontSize: 10.5, background: 'var(--color-background-tertiary)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{t}</span>)}
          <span style={{ padding: '2px 9px', borderRadius: 12, fontSize: 10.5, fontWeight: 600, background: `var(--color-background-${dc})`, color: `var(--color-text-${dc})`, border: `1px solid var(--color-border-${dc})` }}>{difficulty}</span>
        </div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.72, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: statement }} />
        {constraints.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>Constraints</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{constraints.map((c, i) => <code key={i} style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11.5, background: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)', border: '0.5px solid var(--color-border-tertiary)', fontFamily: 'var(--font-mono)' }}>{c}</code>)}</div>
          </div>
        )}
        {examples.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            {examples.map((ex, i) => (
              <div key={i} style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', padding: '9px 12px', marginBottom: 6, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <div style={{ color: 'var(--color-text-tertiary)', fontSize: 10, marginBottom: 4, letterSpacing: '0.06em' }}>EXAMPLE {i + 1}</div>
                <div><span style={{ color: 'var(--color-text-success)' }}>Input: </span><span style={{ color: 'var(--color-text-secondary)' }}>{ex.input}</span></div>
                <div><span style={{ color: 'var(--color-text-info)' }}>Output: </span><span style={{ color: 'var(--color-text-secondary)' }}>{ex.output}</span></div>
                {ex.note && <div style={{ color: 'var(--color-text-tertiary)', fontSize: 11, marginTop: 3 }}>{ex.note}</div>}
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1px solid var(--color-border-primary)', borderRadius: 'var(--border-radius-md)', background: open ? 'var(--color-background-secondary)' : 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12.5, fontFamily: 'var(--font-sans)', transition: 'all 0.15s' }}>
          <i className={`ti ti-${open ? 'eye-off' : 'bulb'}`} />
          {open ? 'Hide Solution' : 'Show Approach & Solution'}
        </button>
        {open && (
          <div style={{ marginTop: 12 }}>
            <div style={{ background: 'var(--color-background-info)', border: '1px solid var(--color-border-info)', borderRadius: 'var(--border-radius-md)', padding: '9px 13px', marginBottom: 10, fontSize: 13, color: 'var(--color-text-info)', lineHeight: 1.68 }}>
              <strong>Approach: </strong>{approach}
            </div>
            <Code>{code}</Code>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — STRING MEMORY & FUNDAMENTALS
══════════════════════════════════════════════════════ */
function SectionMemory() {
  return (
    <div>
      <Note color="info" icon="ti-letter-case">
        <strong>String definition:</strong> A sequence of characters stored in contiguous memory. The character encoding determines how many bytes each character occupies — ASCII uses 8 bits (1 byte) for the 128 standard characters; UTF-16 uses 16 bits (2 bytes) to support Unicode's 65,536 characters.
      </Note>

      <H2>Character Explorer — ASCII Under the Hood</H2>
      <P>Every string algorithm that operates on characters depends on their integer representation. The <Mx>count[str[i] - 'a']</Mx> trick that powers anagram checkers and frequency maps only works because characters <em>are</em> integers. Hover any character below to see its complete numeric identity.</P>
      <AsciiViz />
      <Note color="success" icon="ti-math">
        The key trick: <code>str[i] - 'a'</code> maps any lowercase letter to 0–25. This turns a character into a perfect array index — no hash function needed. Uppercase: <code>str[i] - 'A'</code>. Any ASCII: use <code>count[256]</code> directly indexed by ASCII value.
      </Note>

      <H2>Memory Model — C / C++ / Java</H2>
      <Table
        heads={["Language", "Type", "Char Set", "Size", "Null Terminated?"]}
        rows={[
          ["C",    "char[]",      "ASCII",  "8-bit",  "Yes — \\0 at end, strlen() counts until \\0"],
          ["C++",  "char[]",      "ASCII",  "8-bit",  "Yes — same as C; pointer to literal is read-only"],
          ["C++",  "std::string", "ASCII",  "dynamic","No — length stored explicitly, O(1) .length()"],
          ["Java", "char",        "UTF-16", "16-bit", "No — String is an immutable object, not an array"],
          ["Python","str",        "Unicode","4 bytes/char (CPython)","No — len() is O(1)"],
        ]}
      />
      <Code>{{cpp: `// ── C-style strings — manual, dangerous ──────────────
char s1[] = "hello";          // array on stack, mutable
char *s2  = "hello";          // pointer to read-only literal (undefined if modified)
printf("%zu", strlen(s1));    // O(n): scans until \\0
// s2 = "world" is valid (pointer reassignment)
// s2[0] = 'H' is UNDEFINED BEHAVIOR (modifying literal)

// ── C++ string — safe, full-featured ──────────────────
#include <string>
string s = "hello";
s += " world";                // O(n) amortized append
cout << s.length();           // O(1) — stored separately
cout << s.substr(0, 5);       // O(k) — copies k chars
cout << s.find("world");      // O(n) naive; returns string::npos if absent
if (s.find("xyz") == string::npos) cout << "not found";`, python: `# Python — strings are immutable Unicode sequences
s = "hello"
print(len(s))            # O(1)
print(s[1:4])            # O(k) — slicing copies
print(s.find("ell"))     # O(n·m) — returns -1 if absent (not npos)
print(s.upper())         # O(n)
print(s.split(" "))      # O(n)

# String is IMMUTABLE — every "modification" creates a new object
# Use list for in-place char manipulation, then ''.join() at end`}}</Code>

      <H2>Reading Strings — cin vs getline</H2>
      <Grid cols={2}>
        <Card title="cin >> str" color="warning">
          Reads until whitespace. Input <code>"Hello World"</code> puts only <code>"Hello"</code> in str. Fast, but cannot capture spaces. Use for single-word tokens.
        </Card>
        <Card title='getline(cin, str)' color="success">
          Reads the entire line including spaces, until newline (or custom delimiter). Use when input may contain spaces. Call after <code>cin</code> reads: need <code>cin.ignore()</code> to flush leftover <code>\n</code>.
        </Card>
      </Grid>
      <Code lang="cpp">{`// After reading an int with cin, there's a leftover \\n
int n; cin >> n;
cin.ignore();               // discard the \\n before getline
string line;
getline(cin, line);         // now reads full line correctly

// Custom delimiter: stop at 'g'
getline(cin, line, 'g');    // reads until 'g' is encountered`}</Code>

      <H2>Character Frequency — The Hash Bucket Pattern</H2>
      <P>A fixed 26-element array indexed by <Mx>c - 'a'</Mx> acts as a perfect hash for lowercase letters. Filling this array in one pass and iterating in index order gives a <strong>sorted frequency count</strong> in O(n + 26) = O(n) — no sorting step needed.</P>
      <Code>{{cpp: `// Print frequencies in sorted lexicographic order — O(n)
void charFrequency(string& str) {
    int count[26] = {0};
    for (char c : str)
        count[c - 'a']++;           // hash: 'a'→0, 'b'→1, …, 'z'→25
    for (int i = 0; i < 26; i++)
        if (count[i] > 0)
            cout << (char)('a' + i) << ": " << count[i] << "\\n";
}
// "geeksforgeeks" → e:4, f:1, g:2, k:2, o:1, r:1, s:2  (sorted)`, python: `from collections import Counter

def char_frequency(s):
    count = [0] * 26
    for c in s: count[ord(c) - ord('a')] += 1
    for i in range(26):
        if count[i]: print(f"{chr(ord('a')+i)}: {count[i]}")

# Alternatively, use Counter (not sorted):
# Counter("geeksforgeeks") → {'e':4,'k':2,'g':2,'s':2,'f':1,'o':1,'r':1}`}}</Code>

      <QA q="Why do C-style string literals throw errors when you try to modify them?" a="String literals like <code>'hello'</code> are stored in the read-only data segment of the program's memory. The compiler places them there at compile time, and the OS marks that segment as non-writable. A pointer <code>char* p = 'hello'</code> points into this read-only region. Writing <code>p[0] = 'H'</code> triggers a segmentation fault on modern systems. Using <code>char arr[] = 'hello'</code> copies the literal onto the stack, making it mutable." />
      <QA q="In C++, why is string::npos returned for a failed .find() rather than -1?" a="<code>std::string::find()</code> returns a value of type <code>size_t</code>, which is an unsigned integer. The value -1 for an unsigned integer wraps around to the maximum value for that type (e.g., 2^64−1 on 64-bit systems). <code>string::npos</code> is defined as <code>(size_t)-1</code> — i.e., all bits set. Always compare with <code>== string::npos</code>, never with <code>!= -1</code>, since the signed/unsigned comparison can produce unexpected results." />
      <QA q="What is the time complexity of string concatenation s1 + s2 in C++ vs Python?" a="C++: <code>operator+</code> on std::string copies both strings into a new string — O(|s1| + |s2|). Using <code>+=</code> is O(|s2|) amortized (like vector append). Python: <code>s1 + s2</code> creates a new str object — O(n+m). Concatenating in a loop is O(n²) total. Use <code>''.join(list)</code> for O(n) multi-string concatenation in Python — it pre-calculates the total length and allocates once." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — CLASSIC STRING PATTERNS
══════════════════════════════════════════════════════ */
function SectionPatterns() {
  return (
    <div>
      <H2>Anagram Check — Live Frequency Comparison</H2>
      <P>Two strings are anagrams iff they have identical character frequencies. The O(n log n) sort approach is intuitive but unnecessary — a single-pass frequency build-and-compare is O(n) with O(1) extra space (26 or 256 buckets).</P>
      <AnagramViz />
      <Code>{{cpp: `bool areAnagram(string& s1, string& s2) {
    if (s1.length() != s2.length()) return false;
    int count[256] = {};             // universal ASCII bucket — O(1) extra space
    for (int i = 0; i < (int)s1.length(); i++) {
        count[(unsigned char)s1[i]]++;
        count[(unsigned char)s2[i]]--;
    }
    for (int i = 0; i < 256; i++)
        if (count[i]) return false;  // any nonzero → mismatch
    return true;
}
// "listen" / "silent" → true  |  "aab" / "bab" → false`, python: `def are_anagram(s1, s2):
    if len(s1) != len(s2): return False
    count = [0] * 256
    for c1, c2 in zip(s1, s2):
        count[ord(c1)] += 1; count[ord(c2)] -= 1
    return all(x == 0 for x in count)

# Pythonic:
from collections import Counter
def are_anagram_py(s1, s2): return Counter(s1) == Counter(s2)`}}</Code>

      <H2>Leftmost Repeating Character — Right-to-Left Trick</H2>
      <P>Naive O(n²): for each character, scan the rest. O(n) trick: scan <em>right to left</em>, maintaining a visited array. When you see a character you've seen before, update <Mx>res = i</Mx>. After the full scan, <Mx>res</Mx> holds the leftmost duplicate — because each update overwrites to a smaller index.</P>
      <Code>{{cpp: `int leftmostRepeating(string str) {
    bool visited[256] = {};
    int res = -1;
    for (int i = str.length() - 1; i >= 0; i--) {
        if (visited[(unsigned char)str[i]]) res = i;   // overwrite → keeps smallest i
        else visited[(unsigned char)str[i]] = true;
    }
    return res;
}
// "geeksforgeeks" → 0 ('g')  |  "abbce" → 1 ('b')  |  "abcd" → -1`, python: `def leftmost_repeating(s):
    visited = [False] * 256
    res = -1
    for i in range(len(s) - 1, -1, -1):
        if visited[ord(s[i])]: res = i
        else: visited[ord(s[i])] = True
    return res`}}</Code>

      <H2>Leftmost Non-Repeating Character — Index Tracking Map</H2>
      <P>Store the <em>index</em> of first occurrence for each character: <Mx>-1</Mx> = unseen, <Mx>i</Mx> = seen once at index <Mx>i</Mx>, <Mx>-2</Mx> = duplicate. After one pass, scan the index array for the smallest non-negative value.</P>
      <Code>{{cpp: `int leftmostNonRepeating(string str) {
    int fIndex[256];
    fill(fIndex, fIndex + 256, -1);        // -1 = not seen

    for (int i = 0; i < (int)str.length(); i++) {
        unsigned char c = str[i];
        if      (fIndex[c] == -1) fIndex[c] = i;   // first occurrence
        else if (fIndex[c] >= 0)  fIndex[c] = -2;   // duplicate — mark invalid
    }

    int res = INT_MAX;
    for (int i = 0; i < 256; i++)
        if (fIndex[i] >= 0) res = min(res, fIndex[i]);
    return res == INT_MAX ? -1 : res;
}
// "geeksforgeeks" → 5 ('f')  |  "aabb" → -1`, python: `def leftmost_non_repeating(s):
    f_index = [-1] * 256
    for i, c in enumerate(s):
        oc = ord(c)
        if   f_index[oc] == -1: f_index[oc] = i
        elif f_index[oc] >= 0:  f_index[oc] = -2
    valid = [x for x in f_index if x >= 0]
    return min(valid) if valid else -1`}}</Code>

      <H2>Reverse Words in a Sentence — O(n), O(1)</H2>
      <P>Two-step reversal: (1) reverse each individual word in place; (2) reverse the entire string. The effect: word order is reversed, but each word's characters remain in correct order.</P>
      <Code>{{cpp: `// Reverses characters in str[lo..hi] in-place
void rev(string& str, int lo, int hi) {
    while (lo < hi) { swap(str[lo++], str[hi--]); }
}

string reverseWords(string str) {
    int n = str.size(), start = 0;
    // Step 1: reverse each word individually
    for (int i = 0; i <= n; i++) {
        if (i == n || str[i] == ' ') {
            rev(str, start, i - 1);
            start = i + 1;
        }
    }
    // Step 2: reverse the entire string
    rev(str, 0, n - 1);
    return str;
}
// "Welcome to gfg" → "gfg to Welcome"`, python: `def reverse_words(s):
    # Pythonic O(n):
    return ' '.join(s.split()[::-1])

# O(1) auxiliary space equivalent:
def reverse_words_inplace(s):
    chars = list(s); n = len(chars); start = 0
    def rev(lo, hi):
        while lo < hi: chars[lo], chars[hi] = chars[hi], chars[lo]; lo+=1; hi-=1
    for i in range(n+1):
        if i == n or chars[i] == ' ':
            rev(start, i-1); start = i+1
    rev(0, n-1)
    return ''.join(chars)`}}</Code>

      <QA q="Why does the right-to-left scan find the leftmost repeating character?" a="When scanning right-to-left, every time we encounter a character already in the visited set (a duplicate), we update res = i. Since we're moving from right to left, each update replaces the previous candidate with a smaller index. After the full scan, res holds the minimum index among all characters that appear more than once — i.e., the leftmost repeating character. Scanning left-to-right would require a second pass to verify if the first occurrence is a duplicate." />
      <QA q="What's the difference between leftmost repeating and leftmost non-repeating? Can both return -1?" a="Leftmost repeating: the first character (by position) that appears at least twice. Returns -1 if all characters are distinct (e.g., 'abcd'). Leftmost non-repeating: the first character that appears exactly once. Returns -1 if all characters are duplicated (e.g., 'aabb'). A string of all identical chars (e.g., 'aaaa') returns index 0 for repeating and -1 for non-repeating." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — PATTERN SEARCHING & RABIN-KARP
══════════════════════════════════════════════════════ */
function SectionSearch() {
  return (
    <div>
      <H2>Pattern Searching Algorithms — Overview</H2>
      <Table
        heads={["Algorithm", "Time (worst)", "Space", "Key Idea"]}
        rows={[
          ["Naive",                "O((n−m+1)×m)", "O(1)", "Try each position, compare all m chars"],
          ["Naive (distinct pat)", "O(n)",         "O(1)", "On mismatch at j, skip j positions (all unique)"],
          ["Rabin-Karp",          "O((n−m+1)×m)", "O(1)", "Hash comparison; O(1) rolling hash update"],
          ["KMP",                 "O(n)",          "O(m)", "LPS array enables smart pattern backtracking"],
          ["Suffix Tree",         "O(m) query",   "O(n)", "Preprocess text; all queries in O(m)"],
        ]}
      />

      <H2>Naive Search &amp; the Distinct-Pattern Optimization</H2>
      <P>Standard naive: try every position, compare all <Mx>m</Mx> characters — O(nm). Optimization: if all pattern characters are <em>distinct</em>, a mismatch at position <Mx>j</Mx> means txt[i..i+j-1] matched pat[0..j-1], and since all pattern chars are distinct, none of them can be a prefix of the pattern when shifted less than <Mx>j</Mx> positions. Safe to advance by <Mx>j</Mx>.</P>
      <Code>{{cpp: `// Standard naive search
void naiveSearch(string txt, string pat) {
    int n = txt.length(), m = pat.length();
    for (int i = 0; i <= n - m; i++) {
        int j;
        for (j = 0; j < m; j++)
            if (txt[i + j] != pat[j]) break;
        if (j == m) cout << "Match at " << i << "\\n";
    }
}

// Optimized: pattern has all distinct characters
void distinctPatternSearch(string txt, string pat) {
    int n = txt.length(), m = pat.length(), i = 0;
    while (i <= n - m) {
        int j;
        for (j = 0; j < m; j++)
            if (pat[j] != txt[i + j]) break;
        if (j == m) cout << i << " ";   // full match
        i += (j == 0) ? 1 : j;          // skip j positions if j>0
    }
}`, python: `def naive_search(txt, pat):
    n, m = len(txt), len(pat)
    for i in range(n - m + 1):
        if txt[i:i+m] == pat: print(i, end=' ')

def distinct_pattern_search(txt, pat):
    n, m = len(txt), len(pat); i = 0
    while i <= n - m:
        j = 0
        while j < m and pat[j] == txt[i+j]: j += 1
        if j == m: print(i, end=' ')
        i += max(1, j)   # skip j if j > 0, else 1`}}</Code>

      <H2>Rabin-Karp — Rolling Hash</H2>
      <P>Instead of character-by-character comparison at each position, Rabin-Karp computes a <strong>hash</strong> of the current text window and compares it to the pattern hash. The key: the next window's hash can be computed from the current window's hash in <em>O(1)</em> using the rolling formula — no recomputation from scratch.</P>
      <RollingHashViz />
      <Code>{{cpp: `void rabinKarp(string txt, string pat, int d = 256, int q = 101) {
    int n = txt.size(), m = pat.size();
    int h = 1, p = 0, t = 0;
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;  // h = d^(m-1) % q

    // Initial hash for pattern and first window
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;    // Horner's method
        t = (d * t + txt[i]) % q;
    }

    for (int i = 0; i <= n - m; i++) {
        if (p == t) {                 // hash match — verify (may be spurious)
            int j;
            for (j = 0; j < m; j++)
                if (txt[i + j] != pat[j]) break;
            if (j == m) cout << i << " ";
        }
        // Rolling update: O(1) per step
        if (i < n - m) {
            t = (d * (t - txt[i] * h) + txt[i + m]) % q;
            if (t < 0) t += q;        // normalize negative modulo
        }
    }
}`, python: `def rabin_karp(txt, pat, d=256, q=101):
    n, m = len(txt), len(pat)
    h = pow(d, m-1, q)    # d^(m-1) % q
    p = t = 0
    for i in range(m):
        p = (d*p + ord(pat[i])) % q
        t = (d*t + ord(txt[i])) % q
    for i in range(n - m + 1):
        if p == t:
            if txt[i:i+m] == pat: print(i, end=' ')  # verify
        if i < n - m:
            t = (d*(t - ord(txt[i])*h) + ord(txt[i+m])) % q
            if t < 0: t += q`}}</Code>
      <Note color="warning" icon="ti-alert-triangle">
        <strong>Spurious hits:</strong> Two different strings can have the same hash (collision). When hash_window == hash_pattern, always verify character-by-character. A well-chosen prime <Mx>q</Mx> minimizes collisions. Average case: O(n+m). Worst case with many spurious hits: O(nm) — same as naive.
      </Note>

      <H2>String Rotation Check — The Elegant O(n) Trick</H2>
      <P>S2 is a rotation of S1 iff S2 is a <em>substring</em> of S1+S1. Why? Concatenating S1 with itself creates all possible rotations as substrings. Use any O(n) substring search (KMP, built-in) on the concatenated string.</P>
      <RotationViz />
      <Code>{{cpp: `bool areRotations(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    return (s1 + s1).find(s2) != string::npos;
    // Or use KMP for guaranteed O(n) instead of std::find's O(n²) worst case
}
// "ABCD" / "CDAB" → true  (found at index 2 in "ABCDABCD")
// "ABAB" / "ABBA" → false (not a substring of "ABABABAB")`, python: `def are_rotations(s1, s2):
    if len(s1) != len(s2): return False
    return s2 in (s1 + s1)   # Python's 'in' operator uses Boyer-Moore-Horspool`}}</Code>

      <QA q="What causes spurious hits in Rabin-Karp and how does the choice of q help?" a="A spurious hit occurs when two different strings produce the same hash — a collision. With a larger prime q, hash values are spread over a wider range, reducing collision probability to approximately 1/q. For q = 101, spurious hit probability per window ≈ 1%. For q = 10^9+7 (common in competitive programming), spurious hits are extremely rare. The tradeoff: larger q means we need 64-bit integers to avoid overflow during computation." />
      <QA q="Why does the rotation trick work? Doesn't S1+S1 contain false rotations?" a="Every rotation of S1 by k positions produces a string that appears exactly once as a substring of S1+S1 starting at position n-k. There are no false rotations: a string of the same length that is NOT a rotation cannot appear as a length-n substring of S1+S1 because all length-n substrings of S1+S1 are exactly the n rotations of S1. This bijection is the proof of correctness." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — KMP & THE LPS ARRAY
══════════════════════════════════════════════════════ */
function SectionKMP() {
  return (
    <div>
      <Note color="purple" icon="ti-bolt">
        <strong>KMP's superpower:</strong> When a mismatch occurs at pattern position <Mx>j</Mx>, naive search restarts from pattern[0]. KMP uses the LPS array to say: "the first <Mx>lps[j-1]</Mx> characters of the pattern still match — jump there instead." The text index <Mx>i</Mx> <em>never moves backward</em>, giving guaranteed O(n) regardless of input.
      </Note>

      <H2>The LPS Array — Definition</H2>
      <P><Mx>lps[i]</Mx> = length of the <strong>longest proper prefix</strong> of <Mx>str[0..i]</Mx> that is also a suffix of <Mx>str[0..i]</Mx>. "Proper" means the prefix cannot be the string itself (length &lt; i+1). This tells us: at any mismatch position, how far we can slide the pattern without missing a valid match.</P>
      <Grid cols={2}>
        <Card title="Examples" color="info">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
            "ababcd" → [0, 0, <strong>1, 2</strong>, 0, 0]<br/>
            "aaaa"   → [0, 1, 2, 3]<br/>
            "abcabc" → [0, 0, 0, 1, 2, 3]<br/>
            "abacabad" → [0, 0, 1, 0, 1, 2, 3, 0]
          </div>
        </Card>
        <Card title="Interpreting lps[i] = k" color="success">
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            str[0..k-1] is a prefix that equals str[i-k+1..i] (a suffix). On mismatch at pattern[i+1], jump pattern to position k — we know pattern[0..k-1] still matches the text.
          </div>
        </Card>
      </Grid>

      <H2>Building the LPS Array — Interactive Step-Through</H2>
      <P>Two pointers: <Mx>len</Mx> (green) tracks the current matching prefix length; <Mx>i</Mx> (blue) scans the string. The key — on mismatch with <Mx>len &gt; 0</Mx>, we don't reset <Mx>len</Mx> to 0. We fall back to <Mx>lps[len-1]</Mx>, reusing previously computed prefix info. This is what makes the build O(n).</P>
      <LPSBuilderViz />
      <Code>{{cpp: `// Build LPS array — O(n) time, O(n) space
void buildLPS(string pat, vector<int>& lps) {
    int m = pat.size(), len = 0;
    lps.resize(m, 0);
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            lps[i++] = ++len;      // match: extend prefix
        } else if (len > 0) {
            len = lps[len - 1];    // fallback: try shorter prefix
            // i stays — we re-compare pat[i] with pat[new len]
        } else {
            lps[i++] = 0;          // no prefix possible
        }
    }
}`, python: `def build_lps(pat):
    m, lps, len_, i = len(pat), [0]*len(pat), 0, 1
    while i < m:
        if pat[i] == pat[len_]:
            len_ += 1; lps[i] = len_; i += 1
        elif len_ > 0:
            len_ = lps[len_ - 1]   # fallback — i unchanged
        else:
            lps[i] = 0; i += 1
    return lps`}}</Code>

      <H2>KMP Search — Using the LPS to Skip</H2>
      <P>After building the LPS array in O(m), scan the text in O(n). On mismatch: if <Mx>j &gt; 0</Mx>, set <Mx>j = lps[j-1]</Mx> and retry (text index <Mx>i</Mx> unchanged). If <Mx>j = 0</Mx>, advance <Mx>i</Mx>. On match: advance both. When <Mx>j = m</Mx>, a full match is found at <Mx>i - m</Mx>; reset <Mx>j = lps[j-1]</Mx> to find overlapping matches.</P>
      <Code>{{cpp: `void KMPsearch(string txt, string pat) {
    int n = txt.size(), m = pat.size();
    vector<int> lps;
    buildLPS(pat, lps);

    int i = 0, j = 0;  // i: text pointer, j: pattern pointer
    while (i < n) {
        if (txt[i] == pat[j]) { i++; j++; }

        if (j == m) {
            cout << "Match at " << i - m << "\\n";
            j = lps[j - 1];   // reset to continue searching (finds overlapping)
        } else if (i < n && txt[i] != pat[j]) {
            if (j > 0) j = lps[j - 1];  // skip using LPS — i stays
            else       i++;              // no prefix to reuse, move text
        }
    }
}
// Time: O(n + m)  |  "AAAAA", "AAA" → matches at 0, 1, 2  (overlapping)`, python: `def kmp_search(txt, pat):
    lps = build_lps(pat)
    n, m = len(txt), len(pat); i = j = 0
    while i < n:
        if txt[i] == pat[j]: i += 1; j += 1
        if j == m:
            print(f"Match at {i - m}")
            j = lps[j - 1]
        elif i < n and txt[i] != pat[j]:
            if j > 0: j = lps[j - 1]
            else: i += 1`}}</Code>

      <H2>Why KMP is O(n) — The Amortized Argument</H2>
      <P><Mx>i</Mx> only ever moves <em>forward</em> (never decremented). <Mx>j</Mx> can decrease via fallbacks, but the total number of decreases is bounded by the total number of increases — and <Mx>j</Mx> increases at most n times (once per <Mx>i</Mx> advance). So total operations ≤ 2n. Combined with the O(m) LPS build: total O(n + m).</P>
      <Table
        heads={["Algorithm", "Preprocessing", "Search", "Total", "Space"]}
        rows={[
          ["Naive",     "—",    "O((n−m+1)m)", "O(nm)",   "O(1)"],
          ["KMP",       "O(m)", "O(n)",         "O(n+m)",  "O(m)"],
          ["Rabin-Karp","O(m)", "O(n) avg",     "O(n+m)",  "O(1)"],
        ]}
      />

      <QA q="Why does the LPS fallback use lps[len-1] and not lps[i-1]?" a="When a mismatch occurs between pat[i] and pat[len], we know pat[0..len-1] matches the previous i-1 characters. We want the next-longest prefix of pat[0..len-1] that is also a suffix — which is exactly lps[len-1] (the LPS value for the substring ending at len-1). Using lps[i-1] would be wrong because i is the position of the mismatch, not the end of the matching portion." />
      <QA q="Does KMP find overlapping occurrences? How?" a="Yes. After finding a match (j reaches m), instead of resetting j to 0 (which would skip potential overlapping matches), we set j = lps[m-1]. This positions the pattern so its longest prefix-suffix is aligned with the end of the found match — exactly where an overlapping match could start. Example: txt='AAAAA', pat='AAA' — KMP finds matches at 0, 1, 2 correctly." />
      <QA q="When would you choose Rabin-Karp over KMP?" a="KMP is strictly better for single-pattern search in most cases. Rabin-Karp excels at <em>multi-pattern search</em>: you can use a rolling hash and maintain a set of pattern hashes, matching any pattern in O(1) per text position after a hash match check. KMP would need to run k separate searches for k patterns (O(k×n)). Rabin-Karp's average case with good hashing is O(n + sum(m_i)) for all k patterns simultaneously." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — PROBLEMS
══════════════════════════════════════════════════════ */
function SectionProblems() {
  return (
    <div>
      <Note color="purple" icon="ti-tournament">
        6 problems from fundamentals to KMP. All are asked in IIT OAs and FAANG phone screens. Attempt independently before revealing solutions.
      </Note>

      <ProblemCard
        num={1}
        title="Character Frequency in Sorted Order"
        difficulty="OA Easy"
        tags={["Hash Bucket", "Warm-up"]}
        statement="Given a string <code>s</code> consisting of lowercase English letters, print each character that appears in <code>s</code> along with its frequency in <strong>sorted lexicographic order</strong>."
        constraints={["1 ≤ |s| ≤ 10⁵", "s contains only lowercase letters", "O(n) time, O(1) space"]}
        examples={[
          { input: 's = "geeksforgeeks"', output: "e:4 f:1 g:2 k:2 o:1 r:1 s:2" },
          { input: 's = "aab"',           output: "a:2 b:1" },
        ]}
        approach="Build a fixed 26-element frequency array indexed by (char - 'a'). Iterate the string once to fill counts. Then iterate the 26 buckets in order (already sorted) and print non-zero entries. The index order gives lexicographic order automatically — no sorting step needed."
        code={{cpp: `void charFreq(string& s) {
    int cnt[26] = {};
    for (char c : s) cnt[c - 'a']++;
    for (int i = 0; i < 26; i++)
        if (cnt[i]) cout << (char)('a'+i) << ":" << cnt[i] << " ";
}`, python: `def char_freq(s):
    cnt = [0] * 26
    for c in s: cnt[ord(c)-97] += 1
    for i in range(26):
        if cnt[i]: print(f"{chr(97+i)}:{cnt[i]}", end=' ')`}}
      />

      <ProblemCard
        num={2}
        title="Leftmost Non-Repeating Character"
        difficulty="OA Medium"
        tags={["Index Map", "Single Pass"]}
        statement="Given a string, find the index of the <strong>first character that does not repeat</strong> anywhere else in the string. If all characters repeat, return <code>-1</code>."
        constraints={["1 ≤ |s| ≤ 10⁵", "s contains only lowercase letters"]}
        examples={[
          { input: '"geeksforgeeks"', output: "5", note: "'f' at index 5 is the first non-repeating char" },
          { input: '"aabb"',          output: "-1" },
          { input: '"zxvzxv"',        output: "-1" },
        ]}
        approach="Two-pass approach: (1) count frequency of each character; (2) scan string left to right and return the first index where frequency == 1. Alternatively, one-pass with an index map: store -1 (unseen), i (first index), -2 (duplicate). Then find minimum non-negative value in the map."
        code={{cpp: `int leftmostNonRepeating(string s) {
    int cnt[26] = {};
    for (char c : s) cnt[c-'a']++;
    for (int i = 0; i < (int)s.size(); i++)
        if (cnt[s[i]-'a'] == 1) return i;
    return -1;
}`, python: `def leftmost_non_repeating(s):
    cnt = [0]*26
    for c in s: cnt[ord(c)-97] += 1
    for i, c in enumerate(s):
        if cnt[ord(c)-97] == 1: return i
    return -1`}}
      />

      <ProblemCard
        num={3}
        title="Reverse Words in a String"
        difficulty="OA Medium"
        tags={["Two-Phase Reversal", "In-place"]}
        statement="Given a string <code>s</code>, reverse the order of the <strong>words</strong>. Words are separated by single spaces. The individual characters of each word must remain in the same order."
        constraints={["1 ≤ |s| ≤ 10⁴", "s contains letters and single spaces", "No leading/trailing spaces"]}
        examples={[
          { input: '"Welcome to gfg"', output: '"gfg to Welcome"' },
          { input: '"the sky is blue"', output: '"blue is sky the"' },
        ]}
        approach="Two-phase reversal: (1) reverse each individual word in-place (use a start pointer, advance until space); (2) reverse the entire string. Phase 1 un-reverses each word's characters; phase 2 reverses word order. Total: O(n) time, O(1) space."
        code={{cpp: `string reverseWords(string s) {
    int n = s.size(), start = 0;
    auto rev = [&](int lo, int hi) {
        while (lo < hi) swap(s[lo++], s[hi--]);
    };
    for (int i = 0; i <= n; i++) {
        if (i == n || s[i] == ' ') { rev(start, i-1); start = i+1; }
    }
    rev(0, n-1);
    return s;
}`, python: `def reverse_words(s):
    return ' '.join(s.split()[::-1])

# O(1) auxiliary space (in-place list):
def reverse_words_inplace(s):
    chars = list(s); n = len(chars); start = 0
    def rev(lo, hi):
        while lo < hi: chars[lo],chars[hi]=chars[hi],chars[lo]; lo+=1; hi-=1
    for i in range(n+1):
        if i==n or chars[i]==' ': rev(start,i-1); start=i+1
    rev(0,n-1); return ''.join(chars)`}}
      />

      <ProblemCard
        num={4}
        title="Check If One String Is a Rotation of Another"
        difficulty="OA Medium"
        tags={["S1+S1 Trick", "Substring Search"]}
        statement="Given two strings <code>s1</code> and <code>s2</code> of equal length, determine whether <code>s2</code> is a <strong>rotation</strong> of <code>s1</code>. A rotation shifts all characters by some amount and wraps the end around to the beginning."
        constraints={["1 ≤ |s1|, |s2| ≤ 10⁵", "Strings consist of lowercase letters"]}
        examples={[
          { input: 's1="ABCD", s2="CDAB"', output: "true",  note: "Rotate left by 2: ABCD → CDAB" },
          { input: 's1="ABAB", s2="ABBA"', output: "false" },
          { input: 's1="abc",  s2="cab"',  output: "true",  note: "Rotate left by 1: abc → cab" },
        ]}
        approach="S2 is a rotation of S1 iff S2 is a substring of S1+S1. Proof: all n rotations of S1 appear as length-n substrings of S1+S1. First check lengths are equal (necessary condition), then use any O(n) substring search. KMP gives guaranteed O(n)."
        code={{cpp: `bool isRotation(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    return (s1 + s1).find(s2) != string::npos;
    // For guaranteed O(n): use KMP search instead of find()
}`, python: `def is_rotation(s1, s2):
    return len(s1) == len(s2) and s2 in (s1 + s1)`}}
      />

      <ProblemCard
        num={5}
        title="Permutation in String (Anagram Substring Search)"
        difficulty="LC Medium"
        tags={["Sliding Window", "LC 567"]}
        statement="Given strings <code>s1</code> and <code>s2</code>, return <code>true</code> if <code>s2</code> contains any <strong>permutation</strong> (anagram) of <code>s1</code> as a contiguous substring."
        constraints={["1 ≤ |s1|, |s2| ≤ 10⁴", "Both strings consist of lowercase letters"]}
        examples={[
          { input: 's1="ab", s2="eidbaooo"', output: "true",  note: '"ba" is an anagram of "ab" at index 3' },
          { input: 's1="ab", s2="eidboaoo"', output: "false" },
        ]}
        approach="Fixed sliding window of size m=|s1| over s2. Maintain frequency arrays need[] (from s1) and have[] (from current window). Track a 'satisfied' counter — increment when have[c] first equals need[c], decrement on over-removal. Window is valid when satisfied == required. Slide by adding new right char and removing old left char."
        code={{cpp: `bool checkInclusion(string s1, string s2) {
    if (s1.size() > s2.size()) return false;
    int need[26]={}, have[26]={}, satisfied=0, required=0;
    for (char c : s1) { if (++need[c-'a'] == 1) required++; }

    int m = s1.size();
    for (int i = 0; i < (int)s2.size(); i++) {
        // Add right char
        int r = s2[i] - 'a';
        if (++have[r] == need[r]) satisfied++;
        // Remove left char (once window > m)
        if (i >= m) {
            int l = s2[i-m] - 'a';
            if (have[l]-- == need[l]) satisfied--;
        }
        if (i >= m-1 && satisfied == required) return true;
    }
    return false;
}`, python: `def check_inclusion(s1, s2):
    if len(s1) > len(s2): return False
    need, have = [0]*26, [0]*26
    for c in s1: need[ord(c)-97] += 1
    satisfied = required = sum(1 for x in need if x > 0)
    m = len(s1)
    for i, c in enumerate(s2):
        r = ord(c)-97; have[r] += 1
        if have[r] == need[r]: satisfied -= 1  # countdown style
        if i >= m:
            l = ord(s2[i-m])-97; have[l] -= 1
            if have[l] == need[l]-1: satisfied += 1
        if i >= m-1 and satisfied == 0: return True
    return False`}}
      />

      <ProblemCard
        num={6}
        title="KMP — Count All Pattern Occurrences"
        difficulty="OA Hard"
        tags={["LPS Array", "KMP Search"]}
        statement="Given a text string <code>txt</code> and pattern string <code>pat</code>, find <strong>all starting indices</strong> where <code>pat</code> occurs in <code>txt</code>. The occurrences may overlap."
        constraints={["1 ≤ |txt| ≤ 10⁵", "1 ≤ |pat| ≤ |txt|", "O(n+m) time required"]}
        examples={[
          { input: 'txt="AAAAA", pat="AAA"',          output: "[0, 1, 2]",         note: "Overlapping matches" },
          { input: 'txt="GEEKSFORGEEKS", pat="GEEKS"', output: "[0, 8]" },
          { input: 'txt="AABCCAABC", pat="AABC"',      output: "[0, 5]" },
        ]}
        approach="KMP: (1) Build LPS array for pat in O(m). (2) Two-pointer scan over txt with pattern pointer j: on match advance both; on full match (j==m) record index and reset j=lps[m-1] (enables overlapping detection); on mismatch j=lps[j-1] if j>0 else advance i. Total: O(n+m), O(m) space."
        code={{cpp: `vector<int> KMPsearch(string txt, string pat) {
    int n = txt.size(), m = pat.size();
    // Build LPS
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) { lps[i++] = ++len; }
        else if (len)            { len = lps[len-1]; }
        else                     { lps[i++] = 0; }
    }
    // Search
    vector<int> res;
    i = 0; int j = 0;
    while (i < n) {
        if (txt[i] == pat[j]) { i++; j++; }
        if (j == m) { res.push_back(i-m); j = lps[j-1]; }
        else if (i < n && txt[i] != pat[j]) {
            if (j) j = lps[j-1]; else i++;
        }
    }
    return res;
}`, python: `def kmp_search(txt, pat):
    n, m = len(txt), len(pat)
    lps = [0]*m; l = 0; i = 1
    while i < m:
        if pat[i] == pat[l]: l+=1; lps[i]=l; i+=1
        elif l: l = lps[l-1]
        else: lps[i]=0; i+=1
    res = []; i = j = 0
    while i < n:
        if txt[i] == pat[j]: i+=1; j+=1
        if j == m: res.append(i-m); j = lps[j-1]
        elif i < n and txt[i] != pat[j]:
            if j: j = lps[j-1]
            else: i+=1
    return res`}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "memory",   label: "Memory & Fundamentals" },
  { id: "patterns", label: "Classic Patterns" },
  { id: "search",   label: "Pattern Searching" },
  { id: "kmp",      label: "KMP Algorithm" },
  { id: "problems", label: "Problems" },
];

export default function Strings() {
  const [active, setActive] = useState("memory");
  const map = {
    memory:   <SectionMemory />,
    patterns: <SectionPatterns />,
    search:   <SectionSearch />,
    kmp:      <SectionKMP />,
    problems: <SectionProblems />,
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">DSA — Module 06</div>
        <h1 className="page-header-title">Strings</h1>
        <p className="page-header-subtitle">
          ASCII · Character Hashing · Anagrams · Pattern Search · Rabin-Karp Rolling Hash · KMP &amp; LPS Array
        </p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={6} />
    </div>
  );
}
