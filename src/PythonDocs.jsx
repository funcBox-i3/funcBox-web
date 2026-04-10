import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <button className="copy-btn" onClick={handleCopy} aria-label="Copy code">
        {copied ? 'Copied! ✨' : 'Copy'}
      </button>
      <SyntaxHighlighter 
        language={language} 
        style={vscDarkPlus}
        customStyle={{ margin: 0, background: 'transparent', fontSize: '1rem', padding: '24px', paddingTop: '40px' }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const FunctionBlock = ({ name, signature, description, params, returnInfo, example, index, isJava }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.4, delay: index * 0.05, type: "spring", stiffness: 120 }}
    className="func-block clay-panel"
    id={name.replace(/\./g, '-')}
  >
    <div className="func-header">
      <h3>{name}</h3>
      <div className="func-badge-container">
        <span className={`type-badge ${isJava ? 'java-badge' : ''}`}>{signature}</span>
      </div>
    </div>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem' }}>{description}</p>
    
    {params && params.length > 0 && (
      <div style={{ marginBottom: '32px' }}>
        <h4 className="func-section-title">Parameters</h4>
        <ul className="param-list">
          {params.map((p, i) => (
            <li key={i}>
              <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{p.name}</strong> 
              <span className={`type-badge ${isJava ? 'java-badge' : ''}`} style={{ marginLeft: '12px', marginRight: '8px' }}>{p.type}</span> 
              {p.desc && <span>- {p.desc}</span>}
            </li>
          ))}
        </ul>
      </div>
    )}

    {returnInfo && (
      <div style={{ marginBottom: '32px' }}>
        <h4 className="func-section-title">Returns</h4>
        <ul className="param-list">
          <li>
            <span className={`type-badge ${isJava ? 'java-badge' : ''}`} style={{ marginRight: '8px' }}>{returnInfo.type}</span> 
            {returnInfo.desc && <span>- {returnInfo.desc}</span>}
          </li>
        </ul>
      </div>
    )}

    {example && (
      <>
        <h4 className="func-section-title">Example Usage</h4>
        <CodeBlock code={example} language={isJava ? 'java' : 'python'} />
      </>
    )}
  </motion.div>
);

const pyFuncData = [
  {
    name: 'binary_search',
    signature: '(arr: Sequence, target: Any) -> int',
    description: 'Searches for a target value in a sorted sequence.',
    params: [
      { name: 'arr', type: 'Sequence', desc: 'A sorted sequence to search through.' },
      { name: 'target', type: 'Any', desc: 'The value to search for.' }
    ],
    returnInfo: { type: 'int', desc: 'The index of the target if found, -1 otherwise.' },
    example: 'binary_search([1, 3, 5, 7, 9], 7) # 3'
  },
  {
    name: 'is_prime',
    signature: '(n: int) -> bool',
    description: 'Efficiently check if a number is prime.',
    params: [{ name: 'n', type: 'int', desc: 'The number to check' }],
    returnInfo: { type: 'bool', desc: 'True if the number is prime, False otherwise' },
    example: 'is_prime(7) # True'
  },
  {
    name: 'fibonacci',
    signature: '(n: int, type="int") -> int | list[int]',
    description: 'Calculate Fibonacci sequence values.',
    params: [
      { name: 'n', type: 'int', desc: 'The sequence index (0-indexed).' },
      { name: 'type', type: 'str', desc: '"int" or "list".' }
    ],
    returnInfo: { type: 'int | list[int]', desc: 'Fibonacci number or list.' },
    example: 'fibonacci(5, output_type="list") # [0, 1, 1, 2, 3]'
  },
  {
    name: 'get_factors',
    signature: '(num: int) -> list[int]',
    description: 'Get all factors of a number, excluding the number itself.',
    params: [{ name: 'num', type: 'int', desc: 'The target integer.' }],
    returnInfo: { type: 'list[int]', desc: 'A sorted list of all proper factors.' },
    example: 'get_factors(12)  # [1, 2, 3, 4, 6]'
  },
  {
    name: 'dijkstra',
    signature: '(graph: dict, start_node: Any, end_node: Any = None) -> dict',
    description: 'Calculates the shortest paths in a graph using Dijkstra algorithms.',
    params: [
      { name: 'graph', type: 'dict', desc: 'Adjacency list.' },
      { name: 'start_node', type: 'Any', desc: 'Origin node.' },
      { name: 'end_node', type: 'Any', desc: '(Optional) Terminal node.' }
    ],
    returnInfo: { type: 'dict', desc: '{"distances": ..., "paths": ...}' },
    example: "dijkstra({'A': {'B': 4}, 'B': {}}, 'A')"
  },
  {
    name: 'primes',
    signature: '(start: int = 2, limit: int) -> list[int]',
    description: 'Generates primes within a range via the Sieve of Eratosthenes.',
    params: [
      { name: 'start', type: 'int', desc: 'Lower bound (inclusive).' },
      { name: 'limit', type: 'int', desc: 'Upper bound (inclusive).' }
    ],
    returnInfo: { type: 'list[int]', desc: 'Ordered list of prime numbers.' },
    example: 'primes(limit=10) # [2, 3, 5, 7]'
  },
  {
    name: 'classify_numbers',
    signature: '(numbers: list[int]) -> dict[str, list[int]]',
    description: 'Categorizes integers into prime, composite, and neutral sets.',
    params: [{ name: 'numbers', type: 'list[int]', desc: 'List of integers.' }],
    returnInfo: { type: 'dict', desc: '{"primes": [], "composites": [], "neither": []}' },
    example: "classify_numbers([0, 1, 2, 3, 4]) # {'primes':[2,3], 'composites':[4], 'neither':[0,1]}"
  },
  {
    name: 'fuzzy_search',
    signature: '(query: str, candidates: Sequence, threshold=0.0) -> list[dict]',
    description: 'Finds the best fuzzy matches for a query within candidates.',
    params: [
      { name: 'query', type: 'str', desc: 'Search query.' },
      { name: 'candidates', type: 'Sequence', desc: 'List of strings to search.' }
    ],
    returnInfo: { type: 'list[dict]', desc: 'List of matches with scores.' },
    example: "fuzzy_search('pyth', ['Python', 'Ruby'])"
  },
  {
    name: 'is_anagram',
    signature: '(str1: str, str2: str, ...) -> bool',
    description: 'Checks if two strings are anagrams of each other.',
    params: [
      { name: 'str1', type: 'str', desc: 'First string' },
      { name: 'str2', type: 'str', desc: 'Second string' }
    ],
    returnInfo: { type: 'bool', desc: 'True if anagrams.' },
    example: "is_anagram('listen', 'silent')"
  }
];

const PythonDocs = () => {
  const [activeId, setActiveId] = useState('');
  const [search, setSearch] = useState('');

  const filteredData = pyFuncData.filter(func => 
    func.name.toLowerCase().includes(search.toLowerCase()) || 
    func.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['installation', 'usage', ...filteredData.map(f => f.name.replace(/\\./g, '-'))];
      let currentActiveId = '';
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActiveId = id;
          }
        }
      }
      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId, filteredData]);

  const scrollToHash = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = (elementRect - bodyRect) - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, '', '#' + id);
      setActiveId(id);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg-color)' }}>
      {/* Adaptive Background for Python */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 0, opacity: 0.15, pointerEvents: 'none',
          backgroundImage: 'url(/python_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          mixBlendMode: 'screen'
        }} 
      />

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="docs-layout"
        id="docs"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <aside className="docs-sidebar">
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--accent)', fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>
            &larr; Back to Home
          </Link>
          <h3 className="sidebar-title">Getting Started</h3>
          <nav className="sidebar-nav">
            <a onClick={(e) => scrollToHash(e, 'installation')} href="#installation" className={`sidebar-link ${activeId === 'installation' ? 'active' : ''}`}>Installation</a>
            <a onClick={(e) => scrollToHash(e, 'usage')} href="#usage" className={`sidebar-link ${activeId === 'usage' ? 'active' : ''}`}>Basic Usage</a>
          </nav>

          <h3 className="sidebar-title">API Reference</h3>
          <div style={{ paddingBottom: '16px' }}>
            <input 
               type="text" 
               placeholder="Search Python functions..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="clay-panel"
               style={{ 
                 width: '100%', padding: '12px', borderRadius: '12px', border: 'var(--skeuo-border)', 
                 background: 'var(--clay-bg)', color: 'var(--text-main)', outline: 'none'
               }}
            />
          </div>
          <nav className="sidebar-nav">
            {filteredData.map(func => {
              const id = func.name.replace(/\\./g, '-');
              return (
                <a 
                  key={func.name} 
                  href={`#${id}`} 
                  onClick={(e) => scrollToHash(e, id)}
                  className={`sidebar-link ${activeId === id ? 'active' : ''}`}
                >
                   {func.name}
                </a>
              )
            })}
          </nav>
        </aside>
        
        <main className="docs-content">
          <h1>Python Documentation</h1>
          
          <motion.section id="installation">
            <h2>Installation</h2>
            <p>Install funcBox directly from PyPI utilizing pip package manager within your local or virtual environments.</p>
            <CodeBlock code="pip install -U funcbox" language="bash" />
          </motion.section>

          <motion.section id="usage">
            <h2>Basic Usage</h2>
            <p>Import into your python script to directly access evaluated parameters natively.</p>
            <CodeBlock code="from funcbox import *\n\nprint(is_prime(97))" language="python" />
          </motion.section>

          <h2 style={{ marginTop: '80px', border: 'none', color: 'var(--primary)', fontWeight: 700 }}>Available Functions</h2>
          <p style={{marginBottom: '40px'}}>Explore the full API provided natively within funcBox for Python.</p>
          
          {filteredData.length === 0 ? (
             <p>No functions found matching your search "{search}".</p>
          ) : (
             filteredData.map((data, index) => (
               <FunctionBlock key={data.name} {...data} index={index} isJava={false} />
             ))
          )}
        </main>
      </motion.div>
    </div>
  );
};

export default PythonDocs;
