import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Code, Zap, ChevronDown, ChevronUp, Brain, Activity, ShoppingBag, LucideIcon } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'TumorTrack',
    subtitle: 'Brain Tumor Detection App',
    description: 'An advanced AI-powered application that uses deep learning to detect brain tumors from MRI scans with high accuracy. Built to assist medical professionals in early diagnosis.',
    Icon: Brain,
    iconColor: 'text-primary',
    tags: ['Python', 'TensorFlow', 'React', 'Flask'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    details: 'Leverages CNN architectures for image classification. Features a user-friendly dashboard for doctors to upload MRI images and receive instant analysis reports.'
  },
 

];

const ProjectCard = ({ project, index, onSelect }: { project: typeof projects[0], index: number, onSelect: (p: typeof projects[0]) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass-card group overflow-hidden flex flex-col"
    >
      <div 
        className="relative h-64 overflow-hidden cursor-pointer flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent"
        onClick={() => onSelect(project)}
      >
        <div className="relative z-10 p-8 bg-white/5 rounded-3xl border border-white/10 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500 shadow-2xl group-hover:shadow-primary/20">
          <project.Icon className={project.iconColor} size={64} />
        </div>
        
        {/* Animated Pulsing Gradient Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1,
            background: [
              "linear-gradient(45deg, rgba(0,245,255,0.2), transparent, rgba(139,92,246,0.2))",
              "linear-gradient(225deg, rgba(0,245,255,0.3), transparent, rgba(139,92,246,0.3))",
              "linear-gradient(45deg, rgba(0,245,255,0.2), transparent, rgba(139,92,246,0.2))"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-10 pointer-events-none"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="cursor-pointer" onClick={() => onSelect(project)}>
          <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-secondary text-sm font-medium mb-4">{project.subtitle}</p>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <p className="text-white/50 text-xs mb-6 italic">
                {project.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <p className="text-white/60 text-sm line-clamp-2 mb-6">
            {project.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-4">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github size={20} className="text-white/40 hover:text-white transition-colors" />
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={20} className="text-white/40 hover:text-white transition-colors" />
            </a>
          </div>
          <div className="flex gap-3">
           
            <button 
              onClick={() => onSelect(project)}
              className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1"
            >
              Learn More <Zap size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-12" />
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onSelect={setSelectedProject} 
            />
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-bg-dark/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-card overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 glass rounded-full z-10 hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent p-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="p-16 bg-white/5 rounded-[3rem] border border-white/10 shadow-3xl"
                  >
                    <selectedProject.Icon className={selectedProject.iconColor} size={120} />
                  </motion.div>
                </div>
                <div className="p-8 md:p-12 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-xl text-secondary font-medium">{selectedProject.subtitle}</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2"
                  >
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 glass rounded-full text-xs font-medium text-white/70">
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-bold flex items-center gap-2">
                      <Code className="text-primary" size={20} /> Project Overview
                    </h4>
                    <p className="text-white/70 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    <p className="text-white/70 leading-relaxed">
                      {selectedProject.details}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4 pt-4"
                  >
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                    >
                      <Github size={20} /> GitHub
                    </a>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-primary text-bg-dark rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] transition-all"
                    >
                      <ExternalLink size={20} /> Live Demo
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
