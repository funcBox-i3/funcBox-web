import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Shared spring configs
const SPRING_ENTRY  = { type: 'spring', damping: 28, stiffness: 110 };
const SPRING_HOVER  = { type: 'spring', damping: 22, stiffness: 300 };
const EASE_VIEWPORT = { type: 'spring', damping: 30, stiffness: 90 };

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yPos    = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const features = [
    {
      icon: '⚡',
      title: 'Extremely Fast',
      desc: 'Built exclusively on optimized algorithms with no overhead. Available natively for both Python and Java.'
    },
    {
      icon: '🛡️',
      title: 'Zero Dependencies',
      desc: 'No arbitrary reliance on dense side architectures. Import exactly what you need — nothing more.'
    },
    {
      icon: '📦',
      title: 'Algorithm-Ready',
      desc: 'Implements structures like Dijkstra natively, so you can focus on building your application immediately.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ── Hero ── */}
      <section className="hero-section" id="hero">

        {/* Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING_ENTRY, delay: 0.05 }}
          style={{ y: yPos }}
        >
          <div className="hero-badge">Python &amp; Java Supported</div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING_ENTRY, delay: 0.15 }}
          style={{ y: yPos, opacity }}
          className="hero-title"
        >
          Streamlined Multi-Language<br />
          <span>Utility Library</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING_ENTRY, delay: 0.25 }}
          style={{ y: yPos, opacity }}
          className="hero-subtitle"
        >
          funcBox abstracts algorithmic complexity into clean, pure implementations.
          Calculate primes, sequence Fibonacci, or find shortest paths — without the hassle.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING_ENTRY, delay: 0.35 }}
          style={{ y: yPos }}
          className="hero-actions"
        >
          <motion.div
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_HOVER}
          >
            <Link to="/python" className="btn-primary">Python Docs</Link>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_HOVER}
          >
            <Link to="/java" className="btn-secondary">Java Docs</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="features-section">
        <div className="features-grid">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ ...EASE_VIEWPORT, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              transition={{ ...EASE_VIEWPORT, delay: index * 0.12 }}
              className="feature-card"
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
