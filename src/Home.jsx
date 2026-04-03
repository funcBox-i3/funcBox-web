import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: '⚡',
      title: 'Extremely Fast',
      desc: 'Built strictly on optimized algorithms. Available for both Python and Java.'
    },
    {
      icon: '🛡️',
      title: 'Dependency Free',
      desc: 'No arbitrary reliance on dense side architectures. Just import exactly what you need.'
    },
    {
      icon: '📦',
      title: 'Algorithm-Ready',
      desc: 'Implements structures like Dijkstra natively so you can focus on building your app immediately.'
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if(el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="hero-section" id="hero">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{ y: yPos }}
        >
          <div className="hero-badge">✨ Python & Java Supported</div>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ y: yPos, opacity }}
          className="hero-title"
        >
          Streamlined Multi-Language <br/> <span>Utility Library</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ y: yPos, opacity }}
          className="hero-subtitle"
        >
          funcBox abstracts algorithmic complexity into clean, pure implementations. 
          Calculate primes, sequence Fibonacci, or find Dijkstra's shortest paths without hassle.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ y: yPos }}
          className="hero-actions"
        >
          <button className="btn-primary" onClick={() => scrollToSection('docs')}>
            📖 Read Documentation
          </button>
          <button className="btn-secondary" onClick={() => scrollToSection('about')}>
            🙋‍♂️ About Us
          </button>
        </motion.div>
      </section>

      {/* Parallax Feature Cards */}
      <section className="features-section">
        <div className="features-grid">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
              className="feature-card clay-panel"
            >
              <div className="feature-icon">{item.icon}</div>
              <div className="feature-title">{item.title}</div>
              <div className="feature-description">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
