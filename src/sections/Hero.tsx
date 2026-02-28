import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowRight, Download, Send } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 glass rounded-full text-primary text-sm font-medium mb-6 neon-border"
          >
            WELCOME TO MY UNIVERSE 
          </motion.span>
          
          <motion.h1 
            style={{ y: y2 }}
            className="text-5xl md:text-8xl font-bold font-display tracking-tight mb-6"
          >
            Hi, I'm <motion.span 
              className="text-gradient inline-block cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: [0, -1, 1, -1, 1, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.5 },
                scale: { duration: 0.8, delay: 0.5 },
                x: { duration: 0.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }
              }}
              whileHover={{ 
                scale: 1.05,
                x: [0, -2, 2, -2, 2, 0],
                y: [0, 1, -1, 1, -1, 0],
                transition: {
                  duration: 0.1,
                  repeat: Infinity
                }
              }}
            >
              Kumaraguru P
            </motion.span>
          </motion.h1>
          
          <div className="text-xl md:text-3xl font-medium text-white/80 mb-10 h-12">
            <Typewriter
              words={[
                'WEB DEVELOPER  ',
                'CLOUD COMPUTING',
                'AI Enthusiast',
                'CODER'
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-bg-dark font-bold rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] transition-all"
            >
              View Projects <ArrowRight size={20} />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass text-white font-bold rounded-xl flex items-center gap-2 hover:border-primary/50 transition-all"
            >
              Contact Me <Send size={20} />
            </motion.a>
            
            <motion.a
              href="https://example.com/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all"
            >
              View Resume <Download size={20} />
            </motion.a>
          </div>

          {/* Sub-CTA Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">Discover More</p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
            />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
