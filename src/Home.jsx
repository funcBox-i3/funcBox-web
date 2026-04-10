import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

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
      transition={{ duration: 0.4 }}
    >
      {/* ── Hero ── */}
      <section className="hero-section" id="hero">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ y: yPos }}
        >
          <div className="hero-badge">Python &amp; Java Supported</div>
        </motion.div>

        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          style={{ y: yPos, opacity }}
          className="hero-title"
        >
          Streamlined Multi-Language<br />
          <span>Utility Library</span>
        </motion.h1>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ y: yPos, opacity }}
          className="hero-subtitle"
        >
          funcBox abstracts algorithmic complexity into clean, pure implementations.
          Calculate primes, sequence Fibonacci, or find shortest paths — without the hassle.
        </motion.p>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ y: yPos }}
          className="hero-actions"
        >
          <Link to="/python" className="btn-primary">
            Python Docs
          </Link>
          <Link to="/java" className="btn-secondary">
            Java Docs
          </Link>
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
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
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
