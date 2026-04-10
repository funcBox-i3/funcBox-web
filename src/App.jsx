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
      <Link to="/" className="logo-container" onClick={() => setIsMobileMenuOpen(false)}>
        <motion.img
          src="/logo.png"
          alt="funcBox logo"
          whileHover={{ rotate: 90, scale: 1.15 }}
          whileTap={{ scale: 0.85, rotate: -90 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.55}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{ width: '34px', height: '34px', borderRadius: '8px', cursor: 'grab', userSelect: 'none', display: 'block' }}
        />
        <span className="logo-text">funcBox</span>
      </Link>

      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
          GitHub ↗
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

        <section className="info-section" id="about">
          <div className="footer-grid">
            <div className="footer-card">
              <div className="footer-card-icon">📦</div>
              <h3 className="footer-card-title">About</h3>
              <p className="footer-card-text">
                funcBox is the culmination of rewriting repeated algorithmic logic. Engineered to be a native,
                zero-dependency, ultra-fast foundational utility library for Python and Java projects worldwide.
              </p>
            </div>
            <div className="footer-card" id="contact">
              <div className="footer-card-icon">✉️</div>
              <h3 className="footer-card-title">Contact Us</h3>
              <p className="footer-card-text">
                Have ideas or want to contribute? Reach out via our standard channels.
              </p>
              <div className="footer-card-links">
                <a href="mailto:funcboxi3@gmail.com" className="footer-link-row">
                  <span className="footer-link-label">Email</span>
                  <span className="footer-link-value">funcboxi3@gmail.com</span>
                </a>
                <a href="https://github.com/funcBox-i3/" target="_blank" rel="noreferrer" className="footer-link-row">
                  <span className="footer-link-label">GitHub</span>
                  <span className="footer-link-value">github.com/funcBox-i3 ↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer-container">
          <p className="footer-bottom">
            &copy; {new Date().getFullYear()} funcBox Open Source — MIT License
          </p>
        </footer>
      </div>
    </Router>
  );
}
