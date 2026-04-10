import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './index.css';
import Home from './Home';
import PythonDocs from './PythonDocs';
import JavaDocs from './JavaDocs';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Navigation = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="clay-nav">
      <Link to="/" className="logo-container" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
        <motion.img 
          src="/logo.png" 
          alt="funcBox logo" 
          whileHover={{ rotate: 90, scale: 1.15, filter: "drop-shadow(0 0 10px var(--accent))" }}
          whileTap={{ scale: 0.85, rotate: -90 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.6}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{ width: '40px', height: '40px', borderRadius: '10px', cursor: 'grab', userSelect: 'none' }}
        />
        <span className="logo-text">funcBox</span>
      </Link>
      
      <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
          Home
        </Link>
        <Link to="/python" className={`nav-link ${pathname === '/python' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
          Python API
        </Link>
        <Link to="/java" className={`nav-link ${pathname === '/java' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
          Java API
        </Link>
        <a href="https://github.com/funcBox-i3/" target="_blank" rel="noreferrer" className="github-btn" onClick={() => setIsMobileMenuOpen(false)}>
          <span>🔗 GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <motion.div 
        className="scroll-progress" 
        style={{ scaleX: scrollYProgress }} 
      />

      <div className="app-container">
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/python" element={<PythonDocs />} />
          <Route path="/java" element={<JavaDocs />} />
        </Routes>
        
        <footer className="footer-container" id="about">
          <div className="footer-grid">
            <div className="footer-section clay-panel">
               <h3 className="footer-title">About Me</h3>
               <p className="footer-text">
                 funcBox is the culmination of rewriting repeated algorithmic logic. Engineered specifically to be a native, zero-dependency, ultra-fast foundational utility library for Python and Java projects worldwide.
               </p>
            </div>
            <div className="footer-section clay-panel" id="contact">
               <h3 className="footer-title">Contact Us</h3>
               <p className="footer-text" style={{marginBottom: '20px'}}>
                 Have ideas or want to contribute? Reach out via our standard channels.
               </p>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                 <p className="footer-text">📧 <strong>Email:</strong> support@funcbox.dev</p>
                 <p className="footer-text">💻 <strong>GitHub:</strong> <a href="https://github.com/funcBox-i3/" style={{color: 'var(--accent)', textDecoration: 'none'}}>github.com/funcBox-i3</a></p>
               </div>
            </div>
          </div>
          
          <div style={{paddingTop: '30px', borderTop: '2px dashed #ffffff'}}>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>&copy; {new Date().getFullYear()} funcBox Open Source. All rights reserved.</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>Licensed under MIT.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
