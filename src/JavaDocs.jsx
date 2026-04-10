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

const javaPackages = [
  {
    id: 'misc',
    name: 'Misc',
    description: 'Mathematics & String Utilities',
    functions: [
      { name: 'Misc.isPrime', signature: 'boolean Misc.isPrime(int num)', description: 'Checks whether a given number is prime.', params: [{ name: 'num', type: 'int', desc: 'The number to check.' }], returnInfo: { type: 'boolean', desc: 'true if prime, false otherwise.' }, example: 'Misc.isPrime(7);   // true\nMisc.isPrime(10);  // false' },
      { name: 'Misc.primes', signature: 'List<Integer> Misc.primes(int start, int limit)', description: 'Generates all prime numbers within a given range.', params: [{ name: 'start', type: 'int', desc: 'Lower bound.' }, { name: 'limit', type: 'int', desc: 'Upper bound.' }], returnInfo: { type: 'List<Integer>', desc: 'List of primes.' }, example: 'Misc.primes(2, 10);   // [2, 3, 5, 7]' },
      { name: 'Misc.fibonacci', signature: 'long Misc.fibonacci(int num)', description: 'Calculates the Fibonacci number at the specified index.', params: [{ name: 'num', type: 'int', desc: 'The index in the sequence.' }], returnInfo: { type: 'long', desc: 'The Fibonacci value.' }, example: 'Misc.fibonacci(10);  // 55' },
      { name: 'Misc.getFactors', signature: 'String Misc.getFactors(int num)', description: 'Returns all factors of a number, excluding the number itself.', params: [{ name: 'num', type: 'int', desc: 'The number.' }], returnInfo: { type: 'String', desc: 'String representation of factor list.' }, example: 'Misc.getFactors(12);  // [1, 2, 3, 4, 6]' },
      { name: 'Misc.isPalindrome', signature: 'boolean Misc.isPalindrome(String val)', description: 'Checks whether a string reads the same forward and backward.', params: [{ name: 'val', type: 'String', desc: 'String to evaluate.' }], returnInfo: { type: 'boolean', desc: 'true if palindrome' }, example: 'Misc.isPalindrome("Racecar");  // true' },
      { name: 'Misc.isAnagram', signature: 'boolean Misc.isAnagram(String str1, String str2, boolean caseSensitive)', description: 'Determines whether two strings are anagrams of each other.', params: [{ name: 'str1', type: 'String', desc: 'First string' }, { name: 'str2', type: 'String', desc: 'Second string' }, { name: 'caseSensitive', type: 'boolean', desc: 'Enable case sensitivity' }], returnInfo: { type: 'boolean', desc: 'true if anagrams' }, example: 'Misc.isAnagram("Listen", "Silent", false); // true' },
      { name: 'Misc.capitalizeEachWord', signature: 'String Misc.capitalizeEachWord(String str)', description: 'Capitalizes the first character of each word in a string.', params: [{ name: 'str', type: 'String', desc: 'The input string' }], returnInfo: { type: 'String', desc: 'Capitalized string' }, example: 'Misc.capitalizeEachWord("hello world"); // "Hello World"' },
      { name: 'Misc.truncate', signature: 'String Misc.truncate(String text, int maxLength)', description: 'Truncates a string to a maximum length.', params: [{ name: 'text', type: 'String', desc: 'Input text' }, { name: 'maxLength', type: 'int', desc: 'Max allowed length' }], returnInfo: { type: 'String', desc: 'Truncated string' }, example: 'Misc.truncate("abcdefghijklmnop", 10); // "abcdefghij"' },
      { name: 'Misc.clamp', signature: 'int Misc.clamp(long value, int min, int max)', description: 'Clamps a value to the inclusive range.', params: [{ name: 'value', type: 'long', desc: 'Value to clamp' }, { name: 'min', type: 'int', desc: 'Min allowed' }, { name: 'max', type: 'int', desc: 'Max allowed' }], returnInfo: { type: 'int', desc: 'Clamped value' }, example: 'Misc.clamp(150L, 0, 100); // 100' },
      { name: 'Misc.splitPrimeComposite', signature: 'List<List<Integer>> Misc.splitPrimeComposite(List<Integer> numbers)', description: 'Partitions a list of integers into two sublists — primes and composites.', params: [{ name: 'numbers', type: 'List<Integer>', desc: 'List to partition' }], returnInfo: { type: 'List<List<Integer>>', desc: '[Primes, Composites]' }, example: 'Misc.splitPrimeComposite(List.of(2, 4)); // [[2], [4]]' },
      { name: 'Misc.levenshteinDistance', signature: 'int Misc.levenshteinDistance(String str1, String str2)', description: 'Calculates the Levenshtein distance (edit distance) between two strings.', params: [{ name: 'str1', type: 'String', desc: 'First string' }, { name: 'str2', type: 'String', desc: 'Second string' }], returnInfo: { type: 'int', desc: 'Edit distance' }, example: 'Misc.levenshteinDistance("hello", "holl"); // 2' },
      { name: 'Misc.fuzzyMatchScore', signature: 'double Misc.fuzzyMatchScore(String str1, String str2)', description: 'Calculates a normalized fuzzy match score between two strings.', params: [{ name: 'str1', type: 'String', desc: 'First string' }, { name: 'str2', type: 'String', desc: 'Second string' }], returnInfo: { type: 'double', desc: 'Score between 0.0 and 1.0' }, example: 'Misc.fuzzyMatchScore("hello", "hallo"); // 0.8' }
    ]
  },
  {
    id: 'io',
    name: 'funcBox.io',
    description: 'File & Resource Utilities',
    functions: [
      { name: 'FileUtil.loadResource', signature: 'String FileUtil.loadResource(String path)', description: 'Load a UTF-8 text resource from src/main/resources.', params: [{ name: 'path', type: 'String', desc: 'Resource path' }], returnInfo: { type: 'String', desc: 'Resource content' }, example: 'FileUtil.loadResource("demo.txt");' },
      { name: 'FileUtil.safeWrite', signature: 'void FileUtil.safeWrite(Path path, String content)', description: 'Atomic write using temp-file + backup + rollback.', params: [{ name: 'path', type: 'Path', desc: 'File path' }, { name: 'content', type: 'String', desc: 'Content' }], returnInfo: { type: 'void', desc: 'None' }, example: 'FileUtil.safeWrite(Path.of("out.txt"), "hello");' },
      { name: 'FileUtil.getMimeType', signature: 'String FileUtil.getMimeType(File file)', description: 'Best-effort MIME detection.', params: [{ name: 'file', type: 'File', desc: 'File to check' }], returnInfo: { type: 'String', desc: 'MIME type' }, example: 'FileUtil.getMimeType(new File("img.png")); // "image/png"' }
    ]
  },
  {
    id: 'dig',
    name: 'funcBox.dig',
    description: 'Safe JSON Navigation',
    functions: [
      { name: 'Dig.of', signature: 'DigContext Dig.of(String json)', description: 'Creates a DigContext from a raw JSON string to parse and dig through data.', params: [{ name: 'json', type: 'String', desc: 'Raw JSON string' }], returnInfo: { type: 'DigContext', desc: 'Immutable DigContext' }, example: 'DigContext d = Dig.of("{\\"user\\": \\"Alice\\"}");' },
      { name: 'DigContext.get', signature: 'Object DigContext.get(Object path)', description: 'Resolves a value from the context using a dot path.', params: [{ name: 'path', type: 'Object', desc: 'Path expression' }], returnInfo: { type: 'Object', desc: 'Resolved value or null' }, example: 'd.get("user.name");' },
      { name: 'DigContext.getString', signature: 'String DigContext.getString(String path)', description: 'Resolves a path and converts the value to string.', params: [{ name: 'path', type: 'String', desc: 'Dot path' }], returnInfo: { type: 'String', desc: 'String value' }, example: 'd.getString("user.name");' },
      { name: 'DigContext.getInt', signature: 'Integer DigContext.getInt(String path)', description: 'Resolves a path and converts to Integer.', params: [{ name: 'path', type: 'String', desc: 'Dot path' }], returnInfo: { type: 'Integer', desc: 'Integer value' }, example: 'd.getInt("user.age");' },
      { name: 'DigContext.getBoolean', signature: 'Boolean DigContext.getBoolean(String path)', description: 'Resolves a path and converts to Boolean.', params: [{ name: 'path', type: 'String', desc: 'Dot path' }], returnInfo: { type: 'Boolean', desc: 'Boolean value' }, example: 'd.getBoolean("active");' }
    ]
  },
  {
    id: 'http',
    name: 'funcBox.http',
    description: 'Simplified Web Client',
    functions: [
      { name: 'HttpBox.get', signature: 'String HttpBox.get(String url)', description: 'Sends a GET request and returns the response body as a String.', params: [{ name: 'url', type: 'String', desc: 'The URL to fetch' }], returnInfo: { type: 'String', desc: 'Response body' }, example: 'HttpBox.get("https://api.github.com");' },
      { name: 'HttpBox.post', signature: 'String HttpBox.post(String url, String body)', description: 'Sends a POST request with a String body.', params: [{ name: 'url', type: 'String', desc: 'The URL to post to' }, { name: 'body', type: 'String', desc: 'Request body' }], returnInfo: { type: 'String', desc: 'Response body' }, example: 'HttpBox.post("https://api.example.com", "{\\"id\\": 1}");' },
      { name: 'HttpBox.getJson', signature: 'JSONObject HttpBox.getJson(String url)', description: 'Sends a GET request and parses the response as JSON.', params: [{ name: 'url', type: 'String', desc: 'The URL' }], returnInfo: { type: 'JSONObject', desc: 'Parsed JSON' }, example: 'HttpBox.getJson("https://api.github.com");' }
    ]
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra',
    description: 'Graph Algorithms',
    functions: [
      { name: 'Dijkstra.dijkstra', signature: 'Result Dijkstra.dijkstra(Map<...> graph, String startNode, String endNode)', description: 'Computes shortest paths using Dijkstra algorithm.', params: [ { name: 'graph', type: 'Map', desc: 'Adjacency map' }, { name: 'startNode', type: 'String', desc: 'Start node' }, { name: 'endNode', type: 'String', desc: '(optional) Target node' } ], returnInfo: { type: 'Result', desc: 'distances and paths.' }, example: 'Result result = Dijkstra.dijkstra(graph, "A", "F");' }
    ]
  }
];

const JavaDocs = () => {
  const [activeId, setActiveId] = useState('');
  const [activePackageId, setActivePackageId] = useState(null);
  const [search, setSearch] = useState('');

  const activePackage = javaPackages.find(p => p.id === activePackageId);
  const filteredData = activePackage 
    ? activePackage.functions.filter(func => 
        func.name.toLowerCase().includes(search.toLowerCase()) || 
        func.description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    // Scroll to top when switching packages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearch('');
  }, [activePackageId]);

  useEffect(() => {
    if (!activePackageId) return;
    const handleScroll = () => {
      const sections = ['package-info', ...filteredData.map(f => f.name.replace(/\./g, '-'))];
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
  }, [activeId, filteredData, activePackageId]);

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
          {activePackageId ? (
            <>
              <button 
                onClick={() => setActivePackageId(null)} 
                style={{ 
                  background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 'bold', 
                  display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '20px', fontSize: '1rem' 
                }}
              >
                &larr; Back to Packages
              </button>
              <h3 className="sidebar-title">{activePackage.name} Functions</h3>
              <div style={{ paddingBottom: '16px' }}>
                <input 
                   type="text" 
                   placeholder={`Search ${activePackage.name}...`} 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="clay-panel"
                   style={{ 
                     width: '100%', padding: '12px', borderRadius: '12px', border: 'var(--skeuo-border)', 
                     background: 'var(--clay-bg)', color: 'var(--text-main)', outline: 'none',
                     boxShadow: 'var(--clay-shadow-inset)'
                   }}
                />
              </div>
              <nav className="sidebar-nav">
                {filteredData.map(func => {
                  const id = func.name.replace(/\./g, '-');
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
            </>
          ) : (
            <>
              <Link to="/" style={{ textDecoration: 'none', color: 'var(--accent)', fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>
                &larr; Back to Home
              </Link>
              <h3 className="sidebar-title">Getting Started</h3>
              <nav className="sidebar-nav">
                <a onClick={(e) => scrollToHash(e, 'installation')} href="#installation" className={`sidebar-link ${activeId === 'installation' ? 'active' : ''}`}>Installation</a>
                <a onClick={(e) => scrollToHash(e, 'usage')} href="#usage" className={`sidebar-link ${activeId === 'usage' ? 'active' : ''}`}>Basic Usage</a>
              </nav>

              <h3 className="sidebar-title">API Reference</h3>
              <nav className="sidebar-nav">
                {javaPackages.map(pkg => (
                  <button 
                    key={pkg.id} 
                    onClick={() => setActivePackageId(pkg.id)}
                    className="sidebar-link"
                    style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}
                  >
                     {pkg.name}
                  </button>
                ))}
              </nav>
            </>
          )}
        </aside>
        
        <main className="docs-content">
          <h1>Java Documentation</h1>
          
          {!activePackageId ? (
            <>
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

              <h2 style={{ marginTop: '80px', border: 'none', color: 'var(--primary)', fontWeight: 700 }}>API Reference Packages</h2>
              <p style={{marginBottom: '40px'}}>Explore the modules provided natively within funcBox for Java. Select a package below to view its functions in detail.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {javaPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    className="clay-panel"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActivePackageId(pkg.id)}
                    style={{ 
                      padding: '30px', 
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '12px',
                      border: '2px solid transparent',
                      transition: 'border 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.border = '2px solid var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.border = '2px solid transparent'}
                  >
                    <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--accent)' }}>{pkg.name}</h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.5 }}>{pkg.description}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '16px', color: 'var(--primary)', fontWeight: 'bold' }}>
                      {pkg.functions.length} functions &rarr;
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div id="package-info" style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--accent)', borderBottom: 'none' }}>Package: {activePackage.name}</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{activePackage.description}</p>
              </div>

              {filteredData.length === 0 ? (
                 <p>No functions found matching your search "{search}".</p>
              ) : (
                 filteredData.map((data, index) => (
                   <FunctionBlock key={data.name} {...data} index={index} isJava={true} />
                 ))
              )}
            </motion.div>
          )}
        </main>
      </motion.div>
    </div>
  );
};

export default JavaDocs;
