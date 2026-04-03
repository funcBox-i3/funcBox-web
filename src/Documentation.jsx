import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
        customStyle={{
          margin: 0,
          background: 'transparent',
          fontSize: '1rem',
          padding: '24px',
          paddingTop: '40px'
        }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const FunctionBlock = ({ name, signature, description, params, returnInfo, example, index, isJava }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
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
};

const Documentation = ({ isMultiPage = false }) => {
  const [activeId, setActiveId] = useState('');
  const [lang, setLang] = useState('python');

  const pyFuncData = [
    {
      name: 'is_prime',
      signature: '(n: int) -> bool',
      description: 'Efficiently check if a number is prime. Only checking potential divisors of form 6k±1 up to sqrt(n).',
      params: [{ name: 'n', type: 'int', desc: 'The number to check for primality' }],
      returnInfo: { type: 'bool', desc: 'True if the number is prime, False otherwise' },
      example: 'print(is_prime(7))  # Output: True\nprint(is_prime(10))  # Output: False'
    },
    {
      name: 'fibonacci',
      signature: '(n: int, type="int") -> Union[int, List[int]]',
      description: 'Calculate Fibonacci numbers efficiently.',
      params: [
        { name: 'n', type: 'int', desc: 'The index of Fibonacci number to calculate (0-indexed) or count of numbers for list' },
        { name: 'type', type: 'str', desc: 'Output format - "int" for single value or "list" for sequence. Defaults to "int".' }
      ],
      returnInfo: { type: 'Union[int, List[int]]', desc: 'Either the nth Fibonacci number or a list of n Fibonacci numbers' },
      example: 'print(fibonacci(0))  # Output: 0\nprint(fibonacci(5))  # Output: 5\nprint(fibonacci(5, "list"))  # Output: [0, 1, 1, 2, 3]'
    },
    {
      name: 'get_factors',
      signature: '(num: int) -> List[int]',
      description: 'Get all factors of a number, excluding the number itself.',
      params: [{ name: 'num', type: 'int', desc: 'The number to find factors for.' }],
      returnInfo: { type: 'List[int]', desc: 'A sorted list of all factors of the number (excluding the number itself).' },
      example: 'print(get_factors(12))  # Output: [1, 2, 3, 4, 6]\nprint(get_factors(7))   # Output: [1]'
    },
    {
      name: 'dijkstra',
      signature: '(graph: dict, start_node: Any, end_node: Any = None) -> dict',
      description: 'Compute Dijkstra\'s shortest path algorithm to find the shortest paths from a start node to all other nodes in a graph, or to a specific end node if specified.',
      params: [
        { name: 'graph', type: 'dict', desc: 'A graph represented as an adjacency list, where keys are nodes and values are dictionaries mapping neighbors to edge weights.' },
        { name: 'start_node', type: 'Any', desc: 'The node to start the pathfinding from.' },
        { name: 'end_node', type: 'Any', desc: '(Optional) If specified, the algorithm will terminate early once the shortest path to this node is found. Defaults to None.' }
      ],
      returnInfo: { type: 'dict', desc: 'A dictionary containing "distances" and "paths". Nodes not reachable from the start node will have a distance of infinity and path as None.' },
      example: `graph = {
    'A': {'B': 4, 'C': 2},
    'B': {'D': 5, 'E': 1},
    'C': {'B': 1, 'E': 3},
    'D': {'F': 2},
    'E': {'D': 1, 'F': 4},
    'F': {}
}
result = dijkstra(graph, 'A')
print(result['distances'])  # Output distances from A to all nodes
print(result['paths'])      # Output paths from A to all nodes

# Using end_node parameter
result = dijkstra(graph, 'A', 'F')
print(result['distances'])  # Output distances for nodes processed
print(result['paths'])      # Output paths for nodes processed`
    },
    {
      name: 'primes',
      signature: '(start: int = 2, limit: int = None) -> List[int]',
      description: 'Efficiently generate all prime numbers between start and limit using the Sieve of Eratosthenes algorithm.',
      params: [
        { name: 'start', type: 'int', desc: 'The lower bound for finding prime numbers (inclusive). Defaults to 2.' },
        { name: 'limit', type: 'int', desc: 'The upper bound for finding prime numbers (inclusive).' }
      ],
      returnInfo: { type: 'List[int]', desc: 'A list of all prime numbers from start to the given limit.' },
      example: 'print(primes(limit=10))  # Output: [2, 3, 5, 7]\nprint(primes(start=10, limit=20))  # Output: [11, 13, 17, 19]'
    }
  ];

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
      description: 'Generates all prime numbers within a given range using the Sieve of Eratosthenes. Both start and limit must be at least 2.',
      params: [
        { name: 'start', type: 'int', desc: 'Lower bound, inclusive (min: 2).' },
        { name: 'limit', type: 'int', desc: 'Upper bound, inclusive.' }
      ],
      returnInfo: { type: 'List<Integer>', desc: 'List of all primes between start and limit.' },
      example: 'Misc.primes(2, 10);   // [2, 3, 5, 7]\nMisc.primes(10, 20);  // [11, 13, 17, 19]'
    },
    {
      name: 'Misc.fibonacci',
      signature: 'Integer Misc.fibonacci(int num)',
      description: 'Calculates the Fibonacci number at the specified index.',
      params: [{ name: 'num', type: 'int', desc: 'The index in the Fibonacci sequence.' }],
      returnInfo: { type: 'Integer', desc: 'The Fibonacci value at position num.' },
      example: 'Misc.fibonacci(0);   // 0\nMisc.fibonacci(5);   // 5\nMisc.fibonacci(10);  // 55'
    },
    {
      name: 'Misc.getFactors',
      signature: 'String Misc.getFactors(int num)',
      description: 'Returns all factors of a number, excluding the number itself.',
      params: [{ name: 'num', type: 'int', desc: 'The number to find factors for.' }],
      returnInfo: { type: 'String', desc: 'A String representation of the factor list. Returns [1] for prime numbers.' },
      example: 'Misc.getFactors(12);  // [1, 2, 3, 4, 6]\nMisc.getFactors(7);   // [1]\nMisc.getFactors(28);  // [1, 2, 4, 7, 14]'
    },
    {
      name: 'Misc.isPalindrome',
      signature: 'boolean Misc.isPalindrome(String val)',
      description: 'Checks whether a string reads the same forward and backward. The comparison is case-insensitive.',
      params: [{ name: 'val', type: 'String', desc: 'The string to evaluate.' }],
      returnInfo: { type: 'boolean', desc: 'true if the string is a palindrome, false otherwise.' },
      example: 'Misc.isPalindrome("Racecar");  // true\nMisc.isPalindrome("madam");    // true\nMisc.isPalindrome("Hello");    // false'
    },
    {
      name: 'Misc.splitPrimeComposite',
      signature: 'List<List<Integer>> Misc.splitPrimeComposite(List<Integer> numbers)',
      description: 'Partitions a list of integers into primes and composites. Numbers less than or equal to 1 are ignored.',
      params: [{ name: 'numbers', type: 'List<Integer>', desc: 'The list of integers to analyze.' }],
      returnInfo: { type: 'List<List<Integer>>', desc: 'A List containing two sublists: Index 0 for Primes, Index 1 for Composites.' },
      example: `List<Integer> nums = List.of(2, 3, 4, 5, 6, 7, 8, 9, 10);
List<List<Integer>> result = Misc.splitPrimeComposite(nums);

result.get(0);  // [2, 3, 5, 7]      — Primes
result.get(1);  // [4, 6, 8, 9, 10]  — Composites`
    },
    {
      name: 'Dijkstra.dijkstra',
      signature: 'Result Dijkstra.dijkstra(Map<String, Map<String, Integer>> graph, String startNode, String endNode = null)',
      description: 'Computes shortest paths using Dijkstra\'s algorithm. Two overloads are available: Without endNode (returns path to farthest reachable node), and With endNode (returns exact shortest path from startNode to endNode).',
      params: [
        { name: 'graph', type: 'Map<String, Map<String, Integer>>', desc: 'Adjacency map: Node -> { Neighbor -> Edge Weight }.' },
        { name: 'startNode', type: 'String', desc: 'The starting node for pathfinding.' },
        { name: 'endNode', type: 'String', desc: '(optional) Target node. If specified, only the path to it is returned.' }
      ],
      returnInfo: { type: 'Result', desc: 'A Result object containing result.distances (Shortest distance to each node) and result.paths (Shortest path node lists).' },
      example: `Map<String, Map<String, Integer>> graph = new HashMap<>();
graph.put("A", Map.of("B", 4, "C", 2));
graph.put("B", Map.of("D", 5, "E", 1));
graph.put("C", Map.of("B", 1, "E", 3));
graph.put("D", Map.of("F", 2));
graph.put("E", Map.of("D", 1, "F", 4));
graph.put("F", Map.of());

Result result = Dijkstra.dijkstra(graph, "A", "F");

System.out.println(result.distances);
// {A=0, C=2, B=3, E=4, D=5, F=7}

System.out.println(result.paths);
// {A=[A], C=[A, C], B=[A, C, B], E=[A, C, B, E], D=[A, C, B, E, D], F=[A, C, B, E, D, F]}`
    }
  ];

  const currentData = lang === 'python' ? pyFuncData : javaFuncData;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['installation', 'usage', ...currentData.map(f => f.name.replace(/\./g, '-'))];
      
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
  }, [activeId, currentData]);

  const scrollToHash = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="docs-layout"
      id="docs"
    >
      <aside className="docs-sidebar">
        <h3 className="sidebar-title">Getting Started</h3>
        <nav className="sidebar-nav">
          <a onClick={(e) => scrollToHash(e, 'installation')} href="#installation" className={`sidebar-link ${activeId === 'installation' ? 'active' : ''}`}>
             Installation
          </a>
          <a onClick={(e) => scrollToHash(e, 'usage')} href="#usage" className={`sidebar-link ${activeId === 'usage' ? 'active' : ''}`}>
             Basic Usage
          </a>
        </nav>

        <h3 className="sidebar-title">API Reference </h3>
        <nav className="sidebar-nav">
          {currentData.map(func => {
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
      </aside>
      
      <main className="docs-content">
        <h1>Documentation</h1>

        <div className="lang-switcher">
          <button 
            className={`lang-btn ${lang === 'python' ? 'active' : ''}`}
            onClick={() => setLang('python')}
          >
            Python
          </button>
          <button 
            className={`lang-btn ${lang === 'java' ? 'active' : ''}`}
            onClick={() => setLang('java')}
          >
            Java
          </button>
        </div>
        
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="installation"
        >
          <h2>Installation</h2>
          {lang === 'python' ? (
            <>
              <p>Install funcBox directly from PyPI utilizing pip package manager within your local or virtual environments.</p>
              <CodeBlock code="pip install -U funcbox" language="bash" />
            </>
          ) : (
            <>
              <p>Integrate FuncBox into your project using Maven.</p>
              <CodeBlock code={`<dependency>\n    <groupId>io.github.funcbox-i3</groupId>\n    <artifactId>funcBox</artifactId>\n    <version>1.1.0</version>\n</dependency>`} language="xml" />
              <p style={{marginTop: '20px'}}>Or Gradle:</p>
              <CodeBlock code={`implementation 'io.github.funcbox-i3:funcBox:1.1.0'`} language="gradle" />
            </>
          )}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="usage"
        >
          <h2>Basic Usage</h2>
          {lang === 'python' ? (
            <>
              <p>Import into your python script to directly access evaluated parameters natively.</p>
              <CodeBlock code="from funcbox import *\n\nprint(is_prime(97))" language="python" />
            </>
          ) : (
             <>
              <p>Import the required static methods and call them directly.</p>
              <CodeBlock code="import funcBox.Misc;\n\nSystem.out.println(Misc.isPrime(17)); // true" language="java" />
            </>
          )}
        </motion.section>

        <h2 style={{ marginTop: '80px', border: 'none', color: 'var(--primary)', fontWeight: 700 }}>Available Functions</h2>
        <p style={{marginBottom: '40px'}}>Explore the full API provided natively within funcBox for {lang === 'python' ? 'Python' : 'Java'}.</p>
        
        {currentData.map((data, index) => (
          <FunctionBlock key={data.name} {...data} index={index} isJava={lang === 'java'} />
        ))}
      </main>
    </motion.div>
  );
};

export default Documentation;
