import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, MapPin, Calendar, Download } from 'lucide-react';
import profileImg from '../photos/profile.png';

const education = [
  {
    degree: 'B.Tech -Information Technology',
    institution: 'Mahendra Engineering College',
    duration: '2024 - 2028',
    location: 'Namakkal,Tamil Nadu, India'
  }
];

export const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square glass-card p-4 relative z-10 overflow-hidden group">
              <img
                src={profileImg}
                alt="Kumaraguru P"
                className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-primary/50 rounded-tl-3xl" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-accent/50 rounded-br-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <User className="text-primary" /> Introduction
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                I am a passionate B.Tech Information Technology student at Mahendra Engineering College.
                With a strong foundation in Web Development and cloud computing , I love building innovative
                solutions that solve real-world problems. My interest lies at the intersection of
                software engineering.
              </p>
              <motion.a
                href="https://example.com/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary/20 transition-all"
              >
                View Full Resume <Download size={18} className="rotate-0" />
              </motion.a>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="text-secondary" /> Education
              </h3>
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card p-6 border-l-4 border-secondary"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-white">{item.degree}</h4>
                    <span className="text-secondary font-medium flex items-center gap-1">
                      <Calendar size={14} /> {item.duration}
                    </span>
                  </div>
                  <p className="text-white/80 font-medium mb-2">{item.institution}</p>
                  <p className="text-white/60 text-sm flex items-center gap-1">
                    <MapPin size={14} /> {item.location}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
