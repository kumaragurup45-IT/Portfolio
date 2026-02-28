import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Journey } from './sections/Journey';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Globe } from './components/Globe';

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
    className="fixed inset-0 z-[200] bg-bg-dark flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold font-display">
        <span className="text-primary">K</span>
        <span className="text-white">P</span>
      </div>
    </motion.div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-6 text-white/40 text-sm font-medium tracking-widest uppercase"
    >
      Initializing Futuristic Experience...
    </motion.p>
  </motion.div>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[100] origin-left"
      style={{ scaleX }}
    />
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollY } = useScroll();
  const globeOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <div className="relative bg-bg-dark text-white min-h-screen selection:bg-primary/30 selection:text-primary">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-mesh relative"
        >
          {/* Global 3D Background - Fades out on scroll */}
          <motion.div style={{ opacity: globeOpacity }}>
            <Globe />
          </motion.div>

          <div className="relative z-10">
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            
            <main>
              <Hero />
              <About />
              <Journey />
              <Skills />
              <Projects />
              <Contact />
            </main>
            
            <Footer />
          </div>
        </motion.div>
      )}
    </div>
  );
}
