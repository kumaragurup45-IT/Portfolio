import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-bg-darker/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold font-display tracking-tighter mb-2">
              <span className="text-primary">K</span>
              <span className="text-white">P</span>
            </h2>
            <p className="text-white/40 text-sm mb-6">
              Building the future, one line of code at a time.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {[
                { icon: <Github size={18} />, href: 'https://github.com/kumaragurup45-IT', label: 'GitHub', color: 'hover:text-primary' },
                { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/kumaraguru45-IT', label: 'LinkedIn', color: 'hover:text-blue-400' },
                { icon: <Twitter size={18} />, href: 'https://x.com/Kumaraguru81986', label: 'Twitter', color: 'hover:text-sky-400' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 glass rounded-lg text-white/60 ${social.color} transition-all duration-300`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-8 text-sm font-medium text-white/60">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <p className="text-white/40 text-xs flex items-center gap-1">
              © {new Date().getFullYear()} Kumaraguru Made with  in India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
