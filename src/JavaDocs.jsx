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
    <div className="code-container">
      <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy} aria-label="Copy code">
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, background: 'transparent', fontSize: '0.875rem', padding: '20px 24px 24px', lineHeight: '1.7' }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const FunctionBlock = React.memo(({ name, signature, description, params, returnInfo, example, index, isJava }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ type: 'spring', damping: 30, stiffness: 90, delay: index * 0.04 }}
    className="func-block"
    id={name.replace(/\./g, '-')}
  >
    <div className="func-header">
      <h3>{name}</h3>
      <div className="func-badge-container">
        <span className={`type-badge ${isJava ? 'java-badge' : ''}`} style={{ whiteSpace: 'pre-wrap', display: 'inline-block', textAlign: 'left' }}>
          {signature.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      </div>
    </div>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.975rem' }}>{description}</p>

    {params && params.length > 0 && (
      <div style={{ marginBottom: '24px' }}>
        <h4 className="func-section-title">Parameters</h4>
        <ul className="param-list">
          {params.map((p, i) => (
            <li key={i}>
              <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>{p.name}</strong>
              <span className={`type-badge ${isJava ? 'java-badge' : ''}`} style={{ marginLeft: '10px', marginRight: '8px' }}>{p.type}</span>
              {p.desc && <span style={{ color: 'var(--text-muted)' }}>— {p.desc}</span>}
            </li>
          ))}
        </ul>
      </div>
    )}

    {returnInfo && (
      <div style={{ marginBottom: '24px' }}>
        <h4 className="func-section-title">Returns</h4>
        <ul className="param-list">
          <li>
            <span className={`type-badge ${isJava ? 'java-badge' : ''}`} style={{ marginRight: '8px' }}>{returnInfo.type}</span>
            {returnInfo.desc && <span style={{ color: 'var(--text-muted)' }}>— {returnInfo.desc}</span>}
          </li>
        </ul>
      </div>
    )}

    {example && (
      <>
        <h4 className="func-section-title">Example</h4>
        <CodeBlock code={example} language={isJava ? 'java' : 'python'} />
      </>
    )}
  </motion.div>
));

const javaPackages = [
  {
    id: 'misc',
    name: 'Misc',
    description: 'Mathematics & String Utilities',
    icon: '🧮',
    functions: [
      {
        name: 'Misc.isPrime',
        signature: 'boolean Misc.isPrime(int num)',
        description: 'Checks whether a given integer is a prime number.',
        params: [{ name: 'num', type: 'int', desc: 'The number to check.' }],
        returnInfo: { type: 'boolean', desc: 'true if the number is prime, false otherwise.' },
        example: `Misc.isPrime(2);   // true
Misc.isPrime(7);   // true
Misc.isPrime(1);   // false
Misc.isPrime(10);  // false
Misc.isPrime(97);  // true`
      },
      {
        name: 'Misc.primes',
        signature: 'List<Integer> Misc.primes(int start, int limit)',
        description: 'Generates all prime numbers in the range [start, limit] using the Sieve of Eratosthenes algorithm.',
        params: [{ name: 'start', type: 'int', desc: 'Lower bound. Must be ≥ 2.' }, { name: 'limit', type: 'int', desc: 'Upper bound. Must be ≥ 2.' }],
        returnInfo: { type: 'List<Integer>', desc: 'Containing all prime numbers in the given range.' },
        example: `Misc.primes(2, 10);   // [2, 3, 5, 7]
Misc.primes(10, 30);  // [11, 13, 17, 19, 23, 29]
Misc.primes(2, 2);    // [2]`
      },
      {
        name: 'Misc.fibonacci',
        signature: 'long Misc.fibonacci(int num)',
        description: 'Returns the Fibonacci number at the given index (0..92) using an iterative approach.',
        params: [{ name: 'num', type: 'int', desc: 'The index in the Fibonacci sequence.' }],
        returnInfo: { type: 'long', desc: 'The Fibonacci value at position num.' },
        example: `Misc.fibonacci(0);   // 0
Misc.fibonacci(1);   // 1
Misc.fibonacci(10);  // 55
Misc.fibonacci(50);  // 12586269025
Misc.fibonacci(92);  // 7540113804746346429`
      },
      {
        name: 'Misc.getFactors',
        signature: 'String Misc.getFactors(int num)',
        description: 'Returns all factors of the given number, including 1 but excluding the number itself.',
        params: [{ name: 'num', type: 'int', desc: 'The number to factorize.' }],
        returnInfo: { type: 'String', desc: 'String representation of the factor list.' },
        example: `Misc.getFactors(12);  // [1, 2, 3, 4, 6]
Misc.getFactors(28);  // [1, 2, 4, 7, 14]
Misc.getFactors(7);   // [1]        (7 is prime)
Misc.getFactors(1);   // [1]
Misc.getFactors(100); // [1, 2, 4, 5, 10, 20, 25, 50]`
      },
      {
        name: 'Misc.isPalindrome',
        signature: 'boolean Misc.isPalindrome(String val)',
        description: 'Checks whether a string is a valid palindrome using a two-pointer approach, ignoring non-alphanumeric characters and casing.',
        params: [{ name: 'val', type: 'String', desc: 'The string to evaluate.' }],
        returnInfo: { type: 'boolean', desc: 'true if the string is a palindrome.' },
        example: `Misc.isPalindrome("racecar");                           // true
Misc.isPalindrome("A man, a plan, a canal: Panama");   // true (spaces/punctuation ignored)
Misc.isPalindrome("hello");                            // false
Misc.isPalindrome("12321");                            // true
Misc.isPalindrome(null);                               // false`
      },
      {
        name: 'Misc.isAnagram',
        signature: 'boolean Misc.isAnagram(String str1, String str2, boolean caseSensitive)',
        description: 'Determines whether two strings are anagrams of each other. Whitespace is always ignored.',
        params: [{ name: 'str1', type: 'String', desc: 'The first string.' }, { name: 'str2', type: 'String', desc: 'The second string.' }, { name: 'caseSensitive', type: 'boolean', desc: 'true for case-sensitive.' }],
        returnInfo: { type: 'boolean', desc: 'true if the strings are anagrams, false otherwise.' },
        example: `// Case-insensitive (default behavior)
Misc.isAnagram("Listen", "Silent", false);           // true
Misc.isAnagram("Triangle", "Integral", false);       // true
Misc.isAnagram("Hello", "World", false);             // false

// Case-sensitive
Misc.isAnagram("Listen", "silent", true);            // false  ('L' != 'l')
Misc.isAnagram("listen", "silent", true);            // true

// Whitespace is always ignored
Misc.isAnagram("a b c", "cba", false);               // true
Misc.isAnagram("rail safety", "fairy tales", false); // true

// Null / empty handling
Misc.isAnagram(null, "test", false);                 // false
Misc.isAnagram("", "", false);                       // false`
      },
      {
        name: 'Misc.splitPrimeComposite',
        signature: 'List<List<Integer>> Misc.splitPrimeComposite(List<Integer> numbers)',
        description: 'Partitions a list of integers into two sublists — primes and composites.',
        params: [{ name: 'numbers', type: 'List<Integer>', desc: 'The list of integers to partition.' }],
        returnInfo: { type: 'List<List<Integer>>', desc: 'Index 0: Primes, Index 1: Composites' },
        example: `List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
List<List<Integer>> result = Misc.splitPrimeComposite(nums);

result.get(0);  // [2, 3, 5, 7]       — Primes
result.get(1);  // [4, 6, 8, 9, 10]   — Composites
// Note: 1 is excluded as it is neither prime nor composite

// Another example
List<Integer> mixed = List.of(13, 15, 17, 18, 19, 20, 23);
List<List<Integer>> split = Misc.splitPrimeComposite(mixed);

split.get(0);  // [13, 17, 19, 23]  — Primes
split.get(1);  // [15, 18, 20]      — Composites`
      },
      {
        name: 'Misc.capitalizeEachWord',
        signature: 'String Misc.capitalizeEachWord(String str)',
        description: 'Capitalizes the first character of each word in a string. Whitespace is normalized to single spaces.',
        params: [{ name: 'str', type: 'String', desc: 'The input string to capitalize.' }],
        returnInfo: { type: 'String', desc: 'The capitalized string.' },
        example: `Misc.capitalizeEachWord("hello world");              // "Hello World"
Misc.capitalizeEachWord("a");                        // "A"
Misc.capitalizeEachWord("hello  WORLD");             // "Hello World"  (multiple spaces collapsed)
Misc.capitalizeEachWord("hello\\tWORLD");             // "Hello World"  (tabs normalized)
Misc.capitalizeEachWord("123 abc");                  // "123 Abc"
Misc.capitalizeEachWord(null);                       // ""
Misc.capitalizeEachWord("   ");                      // ""  (whitespace-only)`
      },
      {
        name: 'Misc.truncate',
        signature: 'String Misc.truncate(String text, int maxLength)',
        description: 'Truncates a string to a maximum length.',
        params: [{ name: 'text', type: 'String', desc: 'The input text.' }, { name: 'maxLength', type: 'int', desc: 'The maximum allowed length.' }],
        returnInfo: { type: 'String', desc: 'The truncated or original string.' },
        example: `Misc.truncate("abcdefghijklmnop", 10);   // "abcdefghij"
Misc.truncate("hello", 10);               // "hello"  (already shorter)
Misc.truncate(null, 5);                   // ""
Misc.truncate("test", -1);                // throws IllegalArgumentException`
      },
      {
        name: 'Misc.clamp',
        signature: 'int Misc.clamp(long value, int min, int max)',
        description: 'Clamps a value to the inclusive range [min, max].',
        params: [{ name: 'value', type: 'long', desc: 'The value to clamp.' }, { name: 'min', type: 'int', desc: 'The minimum allowed value.' }, { name: 'max', type: 'int', desc: 'The maximum allowed value.' }],
        returnInfo: { type: 'int', desc: 'The clamped value.' },
        example: `Misc.clamp(150L, 0, 100);   // 100  (clamped to max)
Misc.clamp(-10L, 0, 100);   // 0    (clamped to min)
Misc.clamp(50L, 0, 100);    // 50   (within range)
Misc.clamp(100, 100, 100);  // 100  (exact boundary)`
      },
      {
        name: 'Misc.levenshteinDistance',
        signature: 'int Misc.levenshteinDistance(String str1, String str2)\nint[] Misc.levenshteinDistance(String target, String[] candidates)',
        description: 'Calculates the Levenshtein distance (minimum number of edits) between strings. A distance of 0 means identical.',
        params: [{ name: 'str1 / target', type: 'String', desc: 'First string to compare.' }, { name: 'str2 / candidates', type: 'String / String[]', desc: 'Second string or array of candidates.' }],
        returnInfo: { type: 'int / int[]', desc: 'Edit distance or array of distances.' },
        example: `// Single comparison
Misc.levenshteinDistance("hello", "hello");  // 0 (identical)
Misc.levenshteinDistance("hello", "holl");   // 2 (1 substitution, 1 deletion)
Misc.levenshteinDistance("abc", "xyz");      // 3 (completely different)
Misc.levenshteinDistance("hello", null);     // 5 (null treated as empty)

// Multiple candidates
int[] distances = Misc.levenshteinDistance("hello", new String[]{
    "heat",   // 3 edits
    "help",   // 2 edits
    "groot",  // 5 edits
    "hell"    // 1 edit
});
// Result: [3, 2, 5, 1]`
      },
      {
        name: 'Misc.fuzzyMatchScore',
        signature: 'double Misc.fuzzyMatchScore(String str1, String str2)\ndouble[] Misc.fuzzyMatchScore(String target, String[] candidates)',
        description: 'Calculates a normalized fuzzy match score based on Levenshtein distance. 1.0 means exact match, 0.0 means completely different.',
        params: [{ name: 'str1 / target', type: 'String', desc: 'First string to compare.' }, { name: 'str2 / candidates', type: 'String / String[]', desc: 'Second string or array of candidates.' }],
        returnInfo: { type: 'double / double[]', desc: 'Score between 0.0 and 1.0.' },
        example: `// Single comparison
Misc.fuzzyMatchScore("hello", "hello");  // 1.0 (exact match)
Misc.fuzzyMatchScore("hello", "hallo");  // 0.8 (very similar)
Misc.fuzzyMatchScore("hello", "xyz");    // 0.0 (completely different)

// Multiple candidates
double[] scores = Misc.fuzzyMatchScore("hello", new String[]{
    "hebdfat",  // 0.286
    "helgp",    // 0.6
    "groot",    // 0.0
    "hell"      // 0.8
});
// Result: [0.286, 0.6, 0.0, 0.8]`
      }
    ]
  },
  {
    id: 'io',
    name: 'funcBox.io',
    description: 'File & Resource Utilities',
    icon: '📁',
    functions: [
      {
        name: 'FileUtil.loadResource',
        signature: 'String FileUtil.loadResource(String path)',
        description: 'Load a UTF-8 text resource from src/main/resources (JAR-safe).',
        params: [{ name: 'path', type: 'String', desc: 'Resource path' }],
        returnInfo: { type: 'String', desc: 'Resource content' },
        example: `// 1) Loading a resource (inside JAR or in IDE)
String text = FileUtil.loadResource("funcbox_io_demo.txt");
System.out.println(text);`
      },
      {
        name: 'FileUtil.write',
        signature: 'void FileUtil.write(Path path, String content)',
        description: 'Performs a fast file write with minimal overhead. Creates parent directories automatically.',
        params: [{ name: 'path', type: 'Path', desc: 'Destination file path' }, { name: 'content', type: 'String', desc: 'Data to write in UTF-8 (null becomes empty string)' }],
        returnInfo: { type: 'void', desc: 'None' },
        example: `FileUtil.write(Path.of("logs", "app.txt"), "started\\n");`
      },
      {
        name: 'FileUtil.safeWrite',
        signature: 'void FileUtil.safeWrite(Path path, String content)',
        description: 'Atomic write using temp-file + backup + rollback.',
        params: [{ name: 'path', type: 'Path', desc: 'File path' }, { name: 'content', type: 'String', desc: 'Content' }],
        returnInfo: { type: 'void', desc: 'None' },
        example: `// 2) Safe write with backup
Path out = Path.of("output.txt");
FileUtil.safeWrite(out, "hello\\n");`
      },
      {
        name: 'FileUtil.getMimeType',
        signature: 'String FileUtil.getMimeType(File file)',
        description: 'Best-effort MIME detection (extension-free). Returns application/octet-stream when unknown.',
        params: [{ name: 'file', type: 'File', desc: 'File to check' }],
        returnInfo: { type: 'String', desc: 'MIME type' },
        example: `// 3) MIME detection
String mime = FileUtil.getMimeType(out.toFile());
System.out.println(mime);`
      }
    ]
  },
  {
    id: 'dig',
    name: 'funcBox.dig',
    description: 'Safe JSON Navigation',
    icon: '🧭',
    functions: [
      {
        name: 'Dig.of',
        signature: 'DigContext Dig.of(String json)\nDigContext Dig.of(Object source)',
        description: 'Factory entry point for creating DigContext instances from JSON Strings, or object graphs (Map/List/Array).',
        params: [{ name: 'json / source', type: 'String / Object', desc: 'Raw JSON text or normalized object tree.' }],
        returnInfo: { type: 'DigContext', desc: 'Immutable DigContext instance, never throws.' },
        example: `String json = "{\\"user\\": {\\"name\\": \\"Alice\\", \\"age\\": 30}}";
DigContext d = Dig.of(json);
System.out.println(d.getString("user.name")); // Alice

Map<String, Object> data = Map.of("name", "Bob", "age", 25);
DigContext d2 = Dig.of(data);
System.out.println(d2.getString("name")); // Bob`
      },
      {
        name: 'DigContext.get',
        signature: 'Object DigContext.get(Object path)\nObject DigContext.get(Object path, Object defaultValue)',
        description: 'Resolves a value from the context using a dot path, list path, or object-array path.',
        params: [{ name: 'path', type: 'Object', desc: 'Path expression (e.g. "user.profile.city")' }],
        returnInfo: { type: 'Object', desc: 'Resolved value or null/defaultValue if not found' },
        example: `DigContext d = Dig.of("{\\"user\\": {\\"profile\\": {\\"city\\": \\"NY\\"}}}");
String city = (String) d.get("user.profile.city"); // "NY"
Object missing = d.get("user.email");              // null

DigContext d2 = Dig.of("{\\"count\\": 5}");
Integer count = (Integer) d2.get("count", 0);         // 5
Integer missingFallback = (Integer) d2.get("missing", 0);     // 0 (default)`
      },
      {
        name: 'DigContext.has',
        signature: 'boolean DigContext.has(Object path)',
        description: 'Checks whether a path exists in the current context.',
        params: [{ name: 'path', type: 'Object', desc: 'Path expression' }],
        returnInfo: { type: 'boolean', desc: 'true if the path exists (even when value is null).' },
        example: `DigContext d = Dig.of("{\\"user\\": {\\"name\\": null}}");
System.out.println(d.has("user.name"));  // true (exists even though null)
System.out.println(d.has("user.email")); // false (doesn't exist)`
      },
      {
        name: 'DigContext.isEmpty',
        signature: 'boolean DigContext.isEmpty()',
        description: 'Indicates whether this context contains usable data or was instantiated from an empty/invalid blob.',
        returnInfo: { type: 'boolean', desc: 'true when context is empty.' },
        example: `DigContext valid = Dig.of("{\\"x\\": 1}");
DigContext empty = Dig.of(null);
System.out.println(valid.isEmpty());     // false
System.out.println(empty.isEmpty());     // true
System.out.println(empty == DigContext.EMPTY); // true`
      },
      {
        name: 'DigContext.scope',
        signature: 'DigContext DigContext.scope(Object path)',
        description: 'Re-roots the context to a nested node, creating a child DigContext.',
        params: [{ name: 'path', type: 'Object', desc: 'Path expression to scope to' }],
        returnInfo: { type: 'DigContext', desc: 'Child DigContext rooted at the path.' },
        example: `String json = "{\\"user\\": {\\"profile\\": {\\"city\\": \\"NY\\", \\"zip\\": 10001}}}";
DigContext d = Dig.of(json);
DigContext profile = d.scope("user.profile");
System.out.println(profile.getString("city")); // "NY"
System.out.println(profile.getString("zip"));  // 10001`
      },
      {
        name: 'DigContext.getAll',
        signature: 'List<Object> DigContext.getAll(String... paths)',
        description: 'Resolves multiple paths in one call.',
        params: [{ name: 'paths', type: 'String...', desc: 'One or more path strings' }],
        returnInfo: { type: 'List<Object>', desc: 'Ordered list of resolved values (same order as input paths).' },
        example: `DigContext d = Dig.of("{\\"a\\": 1, \\"b\\": 2, \\"c\\": 3}");
List<Object> values = d.getAll("a", "c", "b");
System.out.println(values); // [1, 3, 2]`
      },
      {
        name: 'DigContext.getString',
        signature: 'String DigContext.getString(String path)',
        description: 'Resolves a path and converts the value to String.',
        params: [{ name: 'path', type: 'String', desc: 'Dot path' }],
        returnInfo: { type: 'String', desc: 'String value' },
        example: `DigContext d = Dig.of("{\\"id\\": 42, \\"name\\": \\"Alice\\"}");
System.out.println(d.getString("name")); // "Alice"
System.out.println(d.getString("id"));   // "42" (converted to string)
System.out.println(d.getString("missing")); // null`
      },
      {
        name: 'DigContext.getInt',
        signature: 'Integer DigContext.getInt(String path)',
        description: 'Resolves a path and converts to Integer.',
        params: [{ name: 'path', type: 'String', desc: 'Dot path' }],
        returnInfo: { type: 'Integer', desc: 'Integer value' },
        example: `DigContext d = Dig.of("{\\"count\\": 42, \\"price\\": 19.99, \\"quantity\\": \\"100\\"}");
System.out.println(d.getInt("count"));     // 42
System.out.println(d.getInt("price"));     // 19 (truncated from double)
System.out.println(d.getInt("quantity"));  // 100 (parsed from string)
System.out.println(d.getInt("missing"));   // null`
      },
      {
        name: 'DigContext.getLong',
        signature: 'Long DigContext.getLong(String path)',
        description: 'Resolves a path and converts to Long.',
        params: [{ name: 'path', type: 'String', desc: 'Dot path' }],
        returnInfo: { type: 'Long', desc: 'Long value' },
        example: `DigContext d = Dig.of("{\\"timestamp\\": 1609459200000, \\"count\\": \\"9999999999\\"}");
System.out.println(d.getLong("timestamp")); // 1609459200000
System.out.println(d.getLong("count"));     // 9999999999
System.out.println(d.getLong("missing"));   // null`
      },
      {
        name: 'DigContext.getDouble',
        signature: 'Double DigContext.getDouble(String path)',
        description: 'Resolves a path and converts to Double.',
        params: [{ name: 'path', type: 'String', desc: 'Dot path' }],
        returnInfo: { type: 'Double', desc: 'Double value' },
        example: `DigContext d = Dig.of("{\\"price\\": 19.99, \\"rating\\": 4, \\"tax\\": \\"0.08\\"}");
System.out.println(d.getDouble("price"));  // 19.99
System.out.println(d.getDouble("rating")); // 4.0
System.out.println(d.getDouble("tax"));    // 0.08
System.out.println(d.getDouble("missing")); // null`
      },
      {
        name: 'DigContext.getBoolean',
        signature: 'Boolean DigContext.getBoolean(String path)',
        description: 'Resolves a path and converts to Boolean. 0.0 -> false, non-zero -> true. "true" -> true, "false" -> false.',
        params: [{ name: 'path', type: 'String', desc: 'Dot path' }],
        returnInfo: { type: 'Boolean', desc: 'Boolean value' },
        example: `DigContext d = Dig.of("{\\"active\\": true, \\"deleted\\": false, \\"count\\": 5, \\"enabled\\": \\"true\\"}");
System.out.println(d.getBoolean("active"));   // true
System.out.println(d.getBoolean("deleted"));  // false
System.out.println(d.getBoolean("count"));    // true (5 != 0)
System.out.println(d.getBoolean("enabled"));  // true (parsed from string)
System.out.println(d.getBoolean("missing"));  // null`
      }
    ]
  },
  {
    id: 'http',
    name: 'funcBox.http',
    description: 'Simplified Web Client',
    icon: '🌐',
    functions: [
      {
        name: 'HttpBox.get',
        signature: 'String HttpBox.get(String url)',
        description: 'Sends a GET request and returns the response body as a String. Returns null if status is not 2xx.',
        params: [{ name: 'url', type: 'String', desc: 'The URL to fetch' }],
        returnInfo: { type: 'String', desc: 'Response body' },
        example: `String response = HttpBox.get("https://api.github.com/repos/funcBox-i3/funcBox-java");
if (response != null) {
    System.out.println(response);
} else {
    System.out.println("Request failed (non-2xx status)");
}`
      },
      {
        name: 'HttpBox.getJson',
        signature: 'JSONObject HttpBox.getJson(String url)',
        description: 'Sends a GET request and parses the response as JSON.',
        params: [{ name: 'url', type: 'String', desc: 'The URL' }],
        returnInfo: { type: 'JSONObject', desc: 'Parsed JSON wrapper' },
        example: `JSONObject repo = HttpBox.getJson("https://api.github.com/repos/funcBox-i3/funcBox-java");
if (repo != null) {
    System.out.println("Stars: " + repo.getInt("stargazers_count"));
} else {
    System.out.println("Failed to fetch JSON");
}`
      },
      {
        name: 'HttpBox.post',
        signature: 'String HttpBox.post(String url, String body)',
        description: 'Sends a POST request with a String body.',
        params: [{ name: 'url', type: 'String', desc: 'The URL to post to' }, { name: 'body', type: 'String', desc: 'Request body' }],
        returnInfo: { type: 'String', desc: 'Response body' },
        example: `String json = "{\\"name\\": \\"Alice\\", \\"age\\": 30}";
String response = HttpBox.post("https://api.example.com/users", json);
if (response != null) {
    System.out.println("Created: " + response);
}`
      },
      {
        name: 'HttpBox.postJson',
        signature: 'String HttpBox.postJson(String url, JSONObject jsonObj)',
        description: 'Sends a POST request passing a JSONObject.',
        params: [{ name: 'url', type: 'String', desc: 'The URL to post to' }, { name: 'jsonObj', type: 'JSONObject', desc: 'Payload Object' }],
        returnInfo: { type: 'String', desc: 'Response body' },
        example: `JSONObject payload = new JSONObject();
payload.put("name", "Bob");
payload.put("email", "bob@example.com");

String response = HttpBox.postJson("https://api.example.com/users", payload);
if (response != null) {
    System.out.println("Success: " + response);
}`
      },
      {
        name: 'HttpBox.put',
        signature: 'String HttpBox.put(String url, String body)',
        description: 'Sends a PUT request with a String body and returns the response.',
        params: [{ name: 'url', type: 'String', desc: 'URL to put to' }, { name: 'body', type: 'String', desc: 'Request body' }],
        returnInfo: { type: 'String', desc: 'Response body' },
        example: `String json = "{\\"id\\": 123, \\"status\\": \\"active\\"}";
String response = HttpBox.put("https://api.example.com/users/123", json);
if (response != null) {
    System.out.println("Updated: " + response);
}`
      },
      {
        name: 'HttpBox.delete',
        signature: 'String HttpBox.delete(String url)',
        description: 'Sends a DELETE request and returns the response.',
        params: [{ name: 'url', type: 'String', desc: 'URL to delete' }],
        returnInfo: { type: 'String', desc: 'Response body' },
        example: `String response = HttpBox.delete("https://api.example.com/users/123");
if (response != null) {
    System.out.println("Deleted successfully: " + response);
}`
      },
      {
        name: 'HttpBox.request',
        signature: 'String HttpBox.request(String method, String url, String body, String contentType)',
        description: 'Generic request method supporting custom HTTP methods.',
        params: [{ name: 'method', type: 'String', desc: 'HTTP Methd' }, { name: 'url', type: 'String', desc: 'Target URL' }, { name: 'body', type: 'String', desc: 'Request Body' }, { name: 'contentType', type: 'String', desc: 'Content Header' }],
        returnInfo: { type: 'String', desc: 'Response body' },
        example: `String response = HttpBox.request(
    "PATCH",
    "https://api.example.com/data/1",
    "{\\"field\\": \\"value\\"}",
    "application/json"
);
if (response != null) {
    System.out.println("Patched: " + response);
}`
      }
    ]
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra',
    description: 'Graph Algorithms',
    icon: '🕸️',
    functions: [
      {
        name: 'Dijkstra.dijkstra',
        signature: 'Result Dijkstra.dijkstra(Map<String, Map<String, Integer>> graph, String startNode)\nResult Dijkstra.dijkstra(Map<...> graph, String startNode, String endNode)',
        description: 'Computes shortest paths using Dijkstra algorithm iteratively. Overloads exist for finding paths to all reachable nodes vs finding a path to a specific target node.',
        params: [{ name: 'graph', type: 'Map', desc: 'Adjacency map of weights' }, { name: 'startNode', type: 'String', desc: 'Start node' }, { name: 'endNode', type: 'String', desc: '(optional) Target node. Early exits when found.' }],
        returnInfo: { type: 'Result', desc: 'A result wrapper containing `distances` and `paths` Maps.' },
        example: `Map<String, Map<String, Integer>> graph = new HashMap<>();
graph.put("A", Map.of("B", 4, "C", 2));
graph.put("B", Map.of("D", 5, "E", 1));
graph.put("C", Map.of("B", 1, "E", 3));
graph.put("D", Map.of("F", 2));
graph.put("E", Map.of("D", 1, "F", 4));
graph.put("F", Map.of());

// Find path from A to F
Result result = Dijkstra.dijkstra(graph, "A", "F");

System.out.println(result.distances);
// {A=0, C=2, B=3, E=4, D=5, F=7}

System.out.println(result.paths.get("F"));        
// [A, C, B, E, D, F]`
      }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearch('');
  }, [activePackageId]);

  useEffect(() => {
    if (!activePackageId) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['package-info', ...filteredData.map(f => f.name.replace(/\./g, '-'))];
          let currentActiveId = '';
          for (const id of sections) {
            const element = document.getElementById(id);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 200 && rect.bottom >= 200) {
                currentActiveId = id;
                break;
              }
            }
          }
          if (currentActiveId) {
            setActiveId(prev => currentActiveId !== prev ? currentActiveId : prev);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredData, activePackageId]);

  const scrollToHash = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = (elementRect - bodyRect) - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', '#' + id);
      setActiveId(id);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="docs-layout"
        id="docs"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {/* ── Sidebar ── */}
        <aside className="docs-sidebar">
          {activePackageId ? (
            <>
              <button
                onClick={() => setActivePackageId(null)}
                className="sidebar-back"
              >
                ← All Packages
              </button>
              <p className="sidebar-title">{activePackage.name}</p>
              <input
                type="text"
                placeholder={`Search ${activePackage.name}…`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sidebar-search"
              />
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
                  );
                })}
              </nav>
            </>
          ) : (
            <>
              <Link to="/" className="sidebar-back">← Back to Home</Link>
              <p className="sidebar-title">Getting Started</p>
              <nav className="sidebar-nav">
                <a onClick={(e) => scrollToHash(e, 'installation')} href="#installation" className={`sidebar-link ${activeId === 'installation' ? 'active' : ''}`}>Installation</a>
                <a onClick={(e) => scrollToHash(e, 'usage')} href="#usage" className={`sidebar-link ${activeId === 'usage' ? 'active' : ''}`}>Basic Usage</a>
              </nav>

              <p className="sidebar-title">Packages</p>
              <nav className="sidebar-nav">
                {javaPackages.map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => setActivePackageId(pkg.id)}
                    className="sidebar-link"
                    style={{ cursor: 'pointer' }}
                  >
                    {pkg.name}
                  </button>
                ))}
              </nav>
            </>
          )}
        </aside>

        {/* ── Main Content ── */}
        <main className="docs-content">
          <div className="docs-header">
            <div className="docs-header-badge">☕ Java</div>
            <h1>Java Documentation</h1>
            <p style={{ marginBottom: 0 }}>
              Complete API reference for the funcBox Java library.
            </p>
          </div>

          {!activePackageId ? (
            <>
              <section id="installation">
                <h2>Installation</h2>
                <p>Add FuncBox to your project using your preferred build tool. The dependency lives on <strong>Maven Central</strong>.</p>
                
                <h4 style={{ marginTop: '24px', marginBottom: '8px' }}>Maven</h4>
                <p>Open your <code>pom.xml</code> and add the following inside the <code>&lt;dependencies&gt;</code> block:</p>
                <CodeBlock code={`<dependency>\n    <groupId>io.github.funcbox-i3</groupId>\n    <artifactId>funcBox</artifactId>\n    <version>1.1.0</version>\n</dependency>`} language="xml" />
                
                <h4 style={{ marginTop: '24px', marginBottom: '8px' }}>Gradle (Groovy)</h4>
                <p>Open your <code>build.gradle</code> and add the dependency inside the <code>dependencies</code> block:</p>
                <CodeBlock code={`dependencies {\n    implementation 'io.github.funcbox-i3:funcBox:1.1.0'\n}`} language="gradle" />

                <h4 style={{ marginTop: '24px', marginBottom: '8px' }}>Gradle (Kotlin DSL)</h4>
                <p>Open your <code>build.gradle.kts</code> and add:</p>
                <CodeBlock code={`dependencies {\n    implementation("io.github.funcbox-i3:funcBox:1.1.0")\n}`} language="kotlin" />
              </section>

              <section id="usage">
                <h2>Basic Usage</h2>
                <p>Import the required static methods and call them directly.</p>
                <CodeBlock code={"import funcBox.Misc;\n\nSystem.out.println(Misc.isPrime(17)); // true"} language="java" />
              </section>

              <h2 style={{ marginTop: '56px' }}>API Packages</h2>
              <p style={{ marginBottom: '24px' }}>
                Select a package below to explore its functions in detail.
              </p>

              <div className="package-grid">
                {javaPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    className="package-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => setActivePackageId(pkg.id)}
                  >
                    <div className="package-icon">{pkg.icon}</div>
                    <div className="package-name">{pkg.name}</div>
                    <p className="package-desc">{pkg.description}</p>
                    <div className="package-count">{pkg.functions.length} functions →</div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div id="package-info" style={{ marginBottom: '36px' }}>
                <h2 style={{ borderBottom: 'none', marginTop: 0 }}>
                  {activePackage.icon} {activePackage.name}
                </h2>
                <p>{activePackage.description}</p>
              </div>

              {filteredData.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No functions match "{search}".</p>
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
