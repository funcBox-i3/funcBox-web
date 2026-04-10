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

const javaFuncData = [
  {
    name: 'Misc.isPrime',
    signature: 'boolean Misc.isPrime(int num)',
    description: 'Checks whether a given number is prime.',
    params: [{ name: 'num', type: 'int', desc: 'The number to check.' }],
    returnInfo: { type: 'boolean', desc: 'true if prime, false otherwise.' },
    example: 'Misc.isPrime(7);   // true\nMisc.isPrime(10);  // false'
  },
  {
    name: 'Misc.primes',
    signature: 'List<Integer> Misc.primes(int start, int limit)',
    description: 'Generates all prime numbers within a given range.',
    params: [
      { name: 'start', type: 'int', desc: 'Lower bound.' },
      { name: 'limit', type: 'int', desc: 'Upper bound.' }
    ],
    returnInfo: { type: 'List<Integer>', desc: 'List of primes.' },
    example: 'Misc.primes(2, 10);   // [2, 3, 5, 7]'
  },
  {
    name: 'Misc.fibonacci',
    signature: 'long Misc.fibonacci(int num)',
    description: 'Calculates the Fibonacci number at the specified index.',
    params: [{ name: 'num', type: 'int', desc: 'The index in the sequence.' }],
    returnInfo: { type: 'long', desc: 'The Fibonacci value.' },
    example: 'Misc.fibonacci(10);  // 55'
  },
  {
    name: 'Misc.getFactors',
    signature: 'String Misc.getFactors(int num)',
    description: 'Returns all factors of a number, excluding the number itself.',
    params: [{ name: 'num', type: 'int', desc: 'The number.' }],
    returnInfo: { type: 'String', desc: 'String representation of factor list.' },
    example: 'Misc.getFactors(12);  // [1, 2, 3, 4, 6]'
  },
  {
    name: 'Misc.isPalindrome',
    signature: 'boolean Misc.isPalindrome(String val)',
    description: 'Checks whether a string reads the same forward and backward.',
    params: [{ name: 'val', type: 'String', desc: 'String to evaluate.' }],
    returnInfo: { type: 'boolean', desc: 'true if palindrome' },
    example: 'Misc.isPalindrome("Racecar");  // true'
  },
  {
    name: 'Misc.isAnagram',
    signature: 'boolean Misc.isAnagram(String str1, String str2, boolean caseSensitive)',
    description: 'Determines whether two strings are anagrams of each other.',
    params: [
      { name: 'str1', type: 'String', desc: 'First string' },
      { name: 'str2', type: 'String', desc: 'Second string' },
      { name: 'caseSensitive', type: 'boolean', desc: 'Enable case sensitivity' }
    ],
    returnInfo: { type: 'boolean', desc: 'true if anagrams' },
    example: 'Misc.isAnagram("Listen", "Silent", false); // true'
  },
  {
    name: 'Dijkstra.dijkstra',
    signature: 'Result Dijkstra.dijkstra(Map<...> graph, String startNode, String endNode)',
    description: 'Computes shortest paths using Dijkstra algorithm.',
    params: [
      { name: 'graph', type: 'Map', desc: 'Adjacency map' },
      { name: 'startNode', type: 'String', desc: 'Start node' },
      { name: 'endNode', type: 'String', desc: '(optional) Target node' }
    ],
    returnInfo: { type: 'Result', desc: 'distances and paths.' },
    example: 'Result result = Dijkstra.dijkstra(graph, "A", "F");'
  },
  {
    name: 'Dig.of',
    signature: 'DigContext Dig.of(String json)',
    description: 'Creates a DigContext from a raw JSON string to parse and dig through data.',
    params: [{ name: 'json', type: 'String', desc: 'Raw JSON string' }],
    returnInfo: { type: 'DigContext', desc: 'Immutable DigContext' },
    example: 'DigContext d = Dig.of("{\\"user\\": \\"Alice\\"}");'
  }
];

const JavaDocs = () => {
  const [activeId, setActiveId] = useState('');
  const [search, setSearch] = useState('');

  const filteredData = javaFuncData.filter(func => 
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
      {/* Adaptive Background for Java */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 0, opacity: 0.15, pointerEvents: 'none',
          backgroundImage: 'url(/java_bg.png)',
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
               placeholder="Search Java functions..." 
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
          <h1>Java Documentation</h1>
          
          <motion.section id="installation">
            <h2>Installation</h2>
            <p>Integrate FuncBox into your project using Maven.</p>
            <CodeBlock code={`<dependency>\n    <groupId>io.github.funcbox-i3</groupId>\n    <artifactId>funcBox</artifactId>\n    <version>1.1.0</version>\n</dependency>`} language="xml" />
            <p style={{marginTop: '20px'}}>Or Gradle:</p>
            <CodeBlock code={`implementation 'io.github.funcbox-i3:funcBox:1.1.0'`} language="gradle" />
          </motion.section>

          <motion.section id="usage">
            <h2>Basic Usage</h2>
            <p>Import the required static methods and call them directly.</p>
            <CodeBlock code="import funcBox.Misc;\n\nSystem.out.println(Misc.isPrime(17)); // true" language="java" />
          </motion.section>

          <h2 style={{ marginTop: '80px', border: 'none', color: 'var(--primary)', fontWeight: 700 }}>Available Functions</h2>
          <p style={{marginBottom: '40px'}}>Explore the full API provided natively within funcBox for Java.</p>
          
          {filteredData.length === 0 ? (
             <p>No functions found matching your search "{search}".</p>
          ) : (
             filteredData.map((data, index) => (
               <FunctionBlock key={data.name} {...data} index={index} isJava={true} />
             ))
          )}
        </main>
      </motion.div>
    </div>
  );
};

export default JavaDocs;
