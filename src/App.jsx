import React from 'react';
import { motion, useScroll } from 'framer-motion';
import './index.css';
import Home from './Home';
import Documentation from './Documentation';

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <>
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
        <nav className="clay-nav">
          <div className="logo-container" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="logo-icon">{`{ }`}</span>
            <span className="logo-text">funcBox</span>
          </div>
          
          <div className="nav-links">
            <button 
              className="nav-link" 
              style={{background:'none', border:'none', fontFamily: 'var(--font-main)'}}
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              Home
            </button>
            <button 
              className="nav-link"
              style={{background:'none', border:'none', fontFamily: 'var(--font-main)'}} 
              onClick={() => { document.getElementById('docs')?.scrollIntoView({behavior: 'smooth'}) }}
            >
              Docs
            </button>
            <button 
              className="nav-link" 
              style={{background:'none', border:'none', fontFamily: 'var(--font-main)'}}
              onClick={() => { document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}) }}
            >
              About Me
            </button>
            <button 
              className="nav-link" 
              style={{background:'none', border:'none', fontFamily: 'var(--font-main)'}}
              onClick={() => { document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}) }}
            >
              Contact Us
            </button>
            <a href="https://github.com/funcBox-i3/" target="_blank" rel="noreferrer" className="github-btn">
              <span>🔗 GitHub</span>
            </a>
          </div>
        </nav>

        <Home />
        <Documentation />
        
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
    </>
  );
}
