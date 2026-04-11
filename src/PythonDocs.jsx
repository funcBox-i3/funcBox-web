import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';

const CodeBlock = ({ code, language = 'python' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-container">
      <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy} aria-label="Copy code">
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          background: 'transparent',
          fontSize: '0.875rem',
          padding: '20px 24px 24px',
          lineHeight: '1.7',
        }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const FunctionBlock = React.memo(({ name, signature, description, params, returnInfo, raises, example, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: 'spring', damping: 30, stiffness: 90, delay: Math.min(index * 0.04, 0.2) }}
      className="func-block"
      id={name.replace(/\./g, '-')}
    >
      <div className="func-header">
        <h3 style={{ margin: 0 }}>{name}</h3>
        <div className="func-badge-container">
          <span className="type-badge">{signature}</span>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.975rem', lineHeight: 1.7 }}>{description}</p>

      {params && params.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4 className="func-section-title">Parameters</h4>
          <ul className="param-list">
            {params.map((p, i) => (
              <li key={i}>
                <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>{p.name}</strong>
                {p.type && <span className="type-badge" style={{ marginLeft: '10px', marginRight: '8px' }}>{p.type}</span>}
                {p.desc && <span style={{ color: 'var(--text-muted)' }}>— {p.desc}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {returnInfo && (
        <div style={{ marginBottom: '20px' }}>
          <h4 className="func-section-title">Returns</h4>
          <ul className="param-list">
            <li>
              <span className="type-badge" style={{ marginRight: '8px' }}>{returnInfo.type}</span>
              {returnInfo.desc && <span style={{ color: 'var(--text-muted)' }}>— {returnInfo.desc}</span>}
            </li>
          </ul>
        </div>
      )}

      {raises && raises.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4 className="func-section-title">Raises</h4>
          <ul className="param-list">
            {raises.map((r, i) => (
              <li key={i}>
                <strong style={{ color: '#f97c7c', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>{r.type}</strong>
                {r.desc && <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>— {r.desc}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {example && (
        <>
          <h4 className="func-section-title">Example</h4>
          <CodeBlock code={example} language="python" />
        </>
      )}
    </motion.div>
  );
});

// ─── Data from README ────────────────────────────────────────────────────────
const pyFuncData = [
  // ── Algorithms ──
  {
    name: 'binary_search',
    category: 'Algorithms',
    status: 'Beta',
    signature: '(arr: Sequence, target: Any) -> int',
    description: 'Searches for a target value in a sorted sequence.',
    params: [
      { name: 'arr', type: 'Sequence', desc: 'A sorted sequence to search through (e.g. list, tuple, range).' },
      { name: 'target', type: 'Any', desc: 'The value to search for.' }
    ],
    returnInfo: { type: 'int', desc: 'The index of the target if found, -1 otherwise.' },
    raises: [{ type: 'TypeError', desc: 'Raised if arr is not a Sequence.' }],
    example:
`from funcbox import binary_search

print(binary_search([1, 3, 5, 7, 9], 7))
# 3
print(binary_search([1, 3, 5, 7, 9], 4))
# -1`,
  },
  {
    name: 'dijkstra',
    category: 'Algorithms',
    status: 'Published',
    signature: '(graph: dict, start_node: Any, end_node: Any = None) -> dict',
    description: "Calculates the shortest paths from a source node to all other reachable nodes in a weighted graph using Dijkstra's algorithm.",
    params: [
      { name: 'graph', type: 'dict', desc: 'Adjacency list where each node maps to a dict of {neighbor: weight} pairs. All weights must be non-negative.' },
      { name: 'start_node', type: 'Any', desc: 'The origin node for pathfinding.' },
      { name: 'end_node', type: 'Any', desc: '(Optional) Terminal node. Terminates early once shortest path is found.' }
    ],
    returnInfo: { type: 'dict', desc: '{"distances": ..., "paths": ...} — distances from start_node to each node, and the ordered path sequences.' },
    raises: [{ type: 'ValueError', desc: 'Raised if graph is malformed, nodes are missing, weights are negative, or start/end nodes are not in the graph.' }],
    example:
`from funcbox import dijkstra
from pprint import pprint

graph = {
    'A': {'B': 4, 'C': 2},
    'B': {'D': 5, 'E': 1},
    'C': {'B': 1, 'E': 3},
    'D': {'F': 2},
    'E': {'D': 1, 'F': 4},
    'F': {}
}

result = dijkstra(graph, 'A')
pprint(result['distances'])
# {'A': 0, 'B': 3, 'C': 2, 'D': 5, 'E': 4, 'F': 7}

result = dijkstra(graph, 'A', 'F')
print(result['paths']['F'])
# ['A', 'C', 'B', 'E', 'D', 'F']`,
  },
  // ── Number Theory ──
  {
    name: 'is_prime',
    category: 'Number Theory',
    status: 'Published',
    signature: '(n: int) -> bool',
    description: 'Determines whether a given integer is prime.',
    params: [{ name: 'n', type: 'int', desc: 'The integer to evaluate. Must be a plain integer (not a bool or float).' }],
    returnInfo: { type: 'bool', desc: 'True if the integer is prime, False otherwise.' },
    raises: [{ type: 'TypeError', desc: 'Raised if n is not a plain integer.' }],
    example:
`from funcbox import is_prime

print(is_prime(7))
# True
print(is_prime(10))
# False`,
  },
  {
    name: 'primes',
    category: 'Number Theory',
    status: 'Published',
    signature: '(start: int = 2, limit: int) -> list[int]',
    description: 'Generates a sequence of prime numbers within a specified bounds using the Sieve of Eratosthenes algorithm.',
    params: [
      { name: 'start', type: 'int', desc: 'Inclusive lower bound. Defaults to 2.' },
      { name: 'limit', type: 'int', desc: 'Inclusive upper bound.' }
    ],
    returnInfo: { type: 'list[int]', desc: 'An ordered list of prime numbers from start up to limit.' },
    raises: [
      { type: 'TypeError', desc: 'Raised if start or limit is not a plain integer.' },
      { type: 'ValueError', desc: 'Raised if limit or start are less than 2.' }
    ],
    example:
`from funcbox import primes

print(primes(limit=10))
# [2, 3, 5, 7]
print(primes(start=10, limit=20))
# [11, 13, 17, 19]`,
  },
  {
    name: 'fibonacci',
    category: 'Number Theory',
    status: 'Published',
    signature: '(n: int, output_type: str = "int") -> int | list[int]',
    description: 'Computes Fibonacci sequence values. Supports retrieving an individual n-th term or an array containing the sequence up to the n-th element.',
    params: [
      { name: 'n', type: 'int', desc: 'The sequence index (0-indexed) or total count to generate.' },
      { name: 'output_type', type: 'str', desc: '"int" returns the n-th term (default). "list" returns the first n terms.' }
    ],
    returnInfo: { type: 'int | list[int]', desc: 'Single int or list based on output_type.' },
    raises: [
      { type: 'TypeError', desc: 'If n is not a plain integer or output_type is not a string.' },
      { type: 'ValueError', desc: 'If n is negative or an unsupported output_type is provided.' }
    ],
    example:
`from funcbox import fibonacci

print(fibonacci(0))
# 0
print(fibonacci(5))
# 5
print(fibonacci(5, output_type="list"))
# [0, 1, 1, 2, 3]`,
  },
  {
    name: 'get_factors',
    category: 'Number Theory',
    status: 'Published',
    signature: '(num: int) -> list[int]',
    description: 'Computes all proper divisors (factors) of an integer, excluding the number itself.',
    params: [{ name: 'num', type: 'int', desc: 'The target integer. Must be a plain integer (not a bool or float).' }],
    returnInfo: { type: 'list[int]', desc: 'A sorted list of all proper factors.' },
    raises: [{ type: 'TypeError', desc: 'Raised if num is not a plain integer.' }],
    example:
`from funcbox import get_factors

print(get_factors(12))  # [1, 2, 3, 4, 6]
print(get_factors(7))   # [1]`,
  },
  {
    name: 'classify_numbers',
    category: 'Number Theory',
    status: 'Beta',
    signature: '(numbers: list[int]) -> dict[str, list[int]]',
    description: 'Categorizes a sequence of integers into prime, composite, and neutral sets (0, 1, or negative numbers).',
    params: [{ name: 'numbers', type: 'list[int]', desc: 'A list of plain integers to categorize.' }],
    returnInfo: { type: 'dict', desc: '{"primes": [...], "composites": [...], "neither": [...]}' },
    raises: [{ type: 'TypeError', desc: 'If numbers is not a list, or any element is not a plain integer.' }],
    example:
`from funcbox import classify_numbers

print(classify_numbers([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
# {'primes': [2, 3, 5, 7], 'composites': [4, 6, 8, 9], 'neither': [0, 1]}`,
  },
  // ── String Processing ──
  {
    name: 'fuzzy_search',
    category: 'String Processing',
    status: 'Beta',
    signature: '(query: str, candidates: Sequence, *, threshold=0.0, limit=None, key=None) -> list[dict]',
    description: 'Ranks candidates by fuzzy similarity to a query string. Scores by a blend of OSA edit-distance (0.5), ordered subsequence coverage (0.3), and partial-window ratio (0.2). Zero external dependencies.',
    params: [
      { name: 'query', type: 'str', desc: 'The search string.' },
      { name: 'candidates', type: 'Sequence', desc: 'Items to search. Must be strings, or use key for arbitrary objects.' },
      { name: 'threshold', type: 'float', desc: 'Minimum score [0.0, 1.0]. Defaults to 0.0.' },
      { name: 'limit', type: 'int | None', desc: 'Max results to return. None returns all.' },
      { name: 'key', type: 'callable | None', desc: 'Extracts comparison string from each candidate.' }
    ],
    returnInfo: { type: 'list[dict]', desc: 'Sorted by score descending. Each dict has "match" (original item) and "score" (float 0.0–1.0).' },
    raises: [
      { type: 'TypeError', desc: 'If query is not str, candidates is not a Sequence, or candidates are not strings without a key.' },
      { type: 'ValueError', desc: 'If threshold is outside [0.0, 1.0] or limit is not a positive integer.' }
    ],
    example:
`from funcbox import fuzzy_search

fuzzy_search("pyth", ["Python", "Ruby", "Rust", "PyPy"])
# [{'match': 'Python', 'score': 0.8333}, {'match': 'PyPy', 'score': 0.75}, ...]

# Tolerate typos
fuzzy_search("dijktra", ["dijkstra", "binary search", "bubble sort"])
# [{'match': 'dijkstra', 'score': 0.8804}, ...]

# Filter by score
fuzzy_search("rust", ["Python", "Ruby", "Rust"], threshold=0.5)
# [{'match': 'Rust', 'score': 1.0}]

# Search objects with a key function
people = [{"name": "Alice"}, {"name": "Alicia"}, {"name": "Bob"}]
fuzzy_search("alic", people, key=lambda p: p["name"])`,
  },
  {
    name: 'similarity',
    category: 'String Processing',
    status: 'Beta',
    signature: '(query: str, candidate: str) -> float',
    description: 'Scores the fuzzy similarity between two strings using a blend of OSA edit-distance ratio (0.5), ordered subsequence coverage (0.3), and partial-window ratio (0.2). This is the same scoring function used internally by fuzzy_search.',
    params: [
      { name: 'query', type: 'str', desc: 'The reference string (e.g. the user\'s search term).' },
      { name: 'candidate', type: 'str', desc: 'The string to score against query.' }
    ],
    returnInfo: { type: 'float', desc: 'Score in [0.0, 1.0]. 1.0 means identical (case-insensitively); 0.0 means completely dissimilar.' },
    raises: [{ type: 'TypeError', desc: 'If either argument is not a str.' }],
    example:
`from funcbox import similarity

print(similarity("hello", "hello"))
# 1.0

print(similarity("pyth", "Python"))   # partial prefix
# 0.8333

print(similarity("dijktra", "dijkstra"))  # typo tolerance
# 0.8804

print(similarity("pytohn", "python"))  # transposition — 1 edit (OSA)
# 0.7833

# Sort a list manually by score
words = ["Python", "PyPy", "Ruby", "Rust"]
words.sort(key=lambda w: similarity("pyth", w), reverse=True)
print(words)
# ['Python', 'PyPy', 'Rust', 'Ruby']`,
  },
  {
    name: 'levenshtein_distance',
    category: 'String Processing',
    status: 'Beta',
    signature: '(a: str, b: str) -> int',
    description: 'Returns the Levenshtein edit distance between two strings — the minimum number of single-character insertions, deletions, and substitutions to transform a into b. Transpositions count as two edits.',
    params: [
      { name: 'a', type: 'str', desc: 'First string.' },
      { name: 'b', type: 'str', desc: 'Second string.' }
    ],
    returnInfo: { type: 'int', desc: 'Non-negative edit distance. 0 means the strings are identical.' },
    raises: [{ type: 'TypeError', desc: 'If either argument is not a str.' }],
    example:
`from funcbox import levenshtein_distance

print(levenshtein_distance("kitten", "sitting"))
# 3
print(levenshtein_distance("hello", "hello"))
# 0
print(levenshtein_distance("dijktra", "dijkstra"))  # 1 substitution
# 1`,
  },
  {
    name: 'is_anagram',
    category: 'String Processing',
    status: 'Beta',
    signature: '(str1: str, str2: str, case=False, spaces=False, punct=False) -> bool',
    description: 'Checks if two strings are anagrams of each other with optional case, whitespace, and punctuation normalization.',
    params: [
      { name: 'str1', type: 'str', desc: 'First string to compare.' },
      { name: 'str2', type: 'str', desc: 'Second string to compare.' },
      { name: 'case', type: 'bool', desc: 'Ignore case when comparing. Defaults to False.' },
      { name: 'spaces', type: 'bool', desc: 'Ignore spaces when comparing. Defaults to False.' },
      { name: 'punct', type: 'bool', desc: 'Ignore punctuation when comparing. Defaults to False.' }
    ],
    returnInfo: { type: 'bool', desc: 'True if the strings are anagrams, False otherwise.' },
    raises: [{ type: 'TypeError', desc: 'Raised if str1 or str2 is not a string.' }],
    example:
`from funcbox import is_anagram

print(is_anagram("listen", "silent"))
# True
print(is_anagram("Listen", "Silent", case=True))
# True
print(is_anagram("a gentleman", "elegant man", spaces=True))
# True
print(is_anagram("Astronomer!", "Moon starer", case=True, punct=True, spaces=True))
# True`,
  },
  {
    name: 'is_null_or_blank',
    category: 'String Processing',
    status: 'Beta',
    signature: '(value: object) -> bool',
    description: 'Returns True if value is None, a whitespace-only string (or empty string), or an empty collection. Emptiness for collections is detected via len(), which is O(1) for all built-in types.',
    params: [
      { name: 'value', type: 'object', desc: 'Any value. None, str, and any Sized (list, dict, tuple, set, frozenset, bytes, etc.) are all evaluated.' }
    ],
    returnInfo: { type: 'bool', desc: 'True if value is None, empty/blank string, or an empty Sized. False otherwise.' },
    raises: [],
    example:
`from funcbox import is_null_or_blank

print(is_null_or_blank(None))    # True
print(is_null_or_blank("\\t\\n"))  # True
print(is_null_or_blank([]))      # True
print(is_null_or_blank([1, 2]))  # False
print(is_null_or_blank({}))      # True`,
  },
  {
    name: 'truncate',
    category: 'String Processing',
    status: 'Beta',
    signature: '(text: str, max_length: int, suffix: str = "...", *, word_boundary=False) -> str',
    description: 'Shortens text to at most max_length characters (including the suffix). If the text already fits, it is returned unchanged.',
    params: [
      { name: 'text', type: 'str', desc: 'The source string to truncate.' },
      { name: 'max_length', type: 'int', desc: 'Maximum total length of the result, including the suffix. Must be ≥ len(suffix).' },
      { name: 'suffix', type: 'str', desc: 'Appended after the cut. Defaults to "...".' },
      { name: 'word_boundary', type: 'bool', desc: 'When True, snaps back to the last whitespace so words are never split.' }
    ],
    returnInfo: { type: 'str', desc: 'Original string if it fits, otherwise truncated with suffix appended.' },
    raises: [
      { type: 'TypeError', desc: 'If text or suffix is not a str, or max_length is not a plain int.' },
      { type: 'ValueError', desc: 'If max_length is not positive or is shorter than suffix.' }
    ],
    example:
`from funcbox import truncate

print(truncate("Hello, world!", 8))
# 'Hello...'

print(truncate("Hello, world!", 13))   # fits — returned unchanged
# 'Hello, world!'

print(truncate("Hello, world!", 10, suffix="…"))
# 'Hello, wo…'

print(truncate("The quick brown fox", 12, word_boundary=True))
# 'The quick...'`,
  },
  // ── Data Utilities ──
  {
    name: 'Dig',
    category: 'Data Utilities',
    status: 'Beta',
    signature: 'Dig(data: dict[str, Any])',
    description: 'Wraps a nested dictionary once and lets you query it repeatedly using dot-path strings, explicit key sequences, or multi-path batches — all through a single, consistent call interface.',
    params: [
      { name: 'data', type: 'dict[str, Any]', desc: 'The source dictionary to wrap.' }
    ],
    returnInfo: { type: 'Dig instance', desc: 'A Dig object supporting d(path), d[path], path in d, and d.scope(path).' },
    raises: [{ type: 'TypeError', desc: 'Raised if data is not a dict.' }],
    example:
`from funcbox import Dig

data = {
  "user": {
    "name": "Aditya Prasad S",
    "handle": "Pu94X",
    "age": 19,
    "address": {"city": "Kanyakumari", "zip": "629000"},
    "projects": [
      {"name": "funcBox", "stars": 42},
      {"name": "InfiniKit", "stars": 18},
    ]
  }
}

d = Dig(data)   # wrap once, query as many times as you like

# Dot-path navigation
d("user.name")             # 'Aditya Prasad S'
d("user.address.city")     # 'Kanyakumari'

# List index via numeric segment
d("user.projects.0.name")  # 'funcBox'

# Graceful missing keys
d("user.phone")             # None
d("user.phone", default="N/A")  # 'N/A'

# Multi-path batch
d(["user.name", "user.handle", "user.age"])
# ['Aditya Prasad S', 'Pu94X', 19]

# Subscript shorthand
d["user.age"]              # 19

# Membership test
"user.address" in d        # True

# Scoped sub-context
addr = d.scope("user.address")
addr("city")               # 'Kanyakumari'
addr(["city", "zip"])      # ['Kanyakumari', '629000']`,
  },
];

// Group functions by category for sidebar display
const CATEGORIES = ['Algorithms', 'Number Theory', 'String Processing', 'Data Utilities'];

const PythonDocs = () => {
  const [activeId, setActiveId] = useState('');
  const [search, setSearch] = useState('');

  const filteredData = pyFuncData.filter(func =>
    func.name.toLowerCase().includes(search.toLowerCase()) ||
    func.description.toLowerCase().includes(search.toLowerCase()) ||
    func.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const ids = ['installation', 'usage', ...filteredData.map(f => f.name.replace(/\./g, '-'))];
          let cur = '';
          for (const id of ids) {
            const el = document.getElementById(id);
            if (el) {
              const r = el.getBoundingClientRect();
              if (r.top <= 180 && r.bottom >= 180) { cur = id; break; }
            }
          }
          if (cur) setActiveId(prev => prev !== cur ? cur : prev);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredData]);

  const scrollToHash = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 110;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.pushState(null, '', '#' + id);
      setActiveId(id);
    }
  };

  // Build grouped sidebar items
  const grouped = CATEGORIES.map(cat => ({
    cat,
    items: filteredData.filter(f => f.category === cat),
  })).filter(g => g.items.length > 0);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Adaptive Background for Python */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 0, opacity: 0.1, pointerEvents: 'none',
          backgroundImage: 'url(/python_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          mixBlendMode: 'screen'
        }} 
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="docs-layout"
        id="docs"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {/* ── Sidebar ── */}
        <aside className="docs-sidebar">
          <Link to="/" className="sidebar-back">← Back to Home</Link>

          <p className="sidebar-title">Getting Started</p>
          <nav className="sidebar-nav">
            <a onClick={(e) => scrollToHash(e, 'installation')} href="#installation"
              className={`sidebar-link ${activeId === 'installation' ? 'active' : ''}`}>
              Installation
            </a>
            <a onClick={(e) => scrollToHash(e, 'usage')} href="#usage"
              className={`sidebar-link ${activeId === 'usage' ? 'active' : ''}`}>
              Quick Start
            </a>
          </nav>

          <p className="sidebar-title">API Reference</p>
          <input
            type="text"
            placeholder="Search functions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sidebar-search"
          />

          {grouped.map(({ cat, items }) => (
            <div key={cat}>
              <p className="sidebar-title" style={{ marginTop: '16px' }}>{cat}</p>
              <nav className="sidebar-nav">
                {items.map(func => {
                  const id = func.name.replace(/\./g, '-');
                  return (
                    <a key={func.name} href={`#${id}`}
                      onClick={(e) => scrollToHash(e, id)}
                      className={`sidebar-link ${activeId === id ? 'active' : ''}`}>
                      {func.name}
                    </a>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        {/* ── Main Content ── */}
        <main className="docs-content">
          <div className="docs-header">
            <div className="docs-header-badge">🐍 Python</div>
            <h1>Python Documentation</h1>
            <p style={{ marginBottom: 0 }}>
              Complete API reference for the funcBox Python library. Requires Python 3.8+ with zero external dependencies.
            </p>
          </div>

          <section id="installation">
            <h2>Installation</h2>
            <p>Install funcBox directly from PyPI using pip:</p>
            <CodeBlock code="pip install -U funcbox" language="bash" />
            <p>Or using the Python module syntax:</p>
            <CodeBlock code="python -m pip install -U funcbox" language="bash" />
            <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--accent)' }}>Beta (pre-release from GitHub):</strong>
            </p>
            <CodeBlock code="pip install git+https://github.com/funcBox-i3/funcBox.git" language="bash" />
          </section>

          <section id="usage">
            <h2>Quick Start</h2>
            <p>Import everything with a wildcard, or import only what you need:</p>
            <CodeBlock language="python" code={
`from funcbox import *

is_prime(17)
# True

classify_numbers([2, 3, 4, 5, 6])
# {'primes': [2, 3, 5], 'composites': [4, 6], 'neither': []}

d = Dig({"user": {"name": "Aditya Prasad S", "handle": "Pu94X", "age": 22}})
d("user.name")
# 'Aditya Prasad S'
d(["user.name", "user.handle", "user.age"])
# ['Aditya Prasad S', 'Pu94X', 22]`
            } />
          </section>

          {CATEGORIES.map(cat => {
            const catFuncs = filteredData.filter(f => f.category === cat);
            if (catFuncs.length === 0) return null;
            return (
              <div key={cat}>
                <h2 style={{ marginTop: '64px' }}>{cat}</h2>
                {catFuncs.map((data, index) => (
                  <FunctionBlock key={data.name} {...data} index={index} />
                ))}
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <p style={{ color: 'var(--text-muted)', marginTop: '32px' }}>
              No functions match "{search}".
            </p>
          )}
        </main>
      </motion.div>
    </div>
  );
};

export default PythonDocs;
