import React from 'react';
import { motion } from 'framer-motion';
import { School, BookOpen, Code, Briefcase, Rocket, Star } from 'lucide-react';

const journeyData = [
  {
    year: '2021 - 2022',
    title: 'Secondary Schooling (SSLC)',
    institution: 'Government Higher  School',
    description: 'Completed secondary education with a strong focus on mathematics and science, laying the foundation for a technical career.',
    icon: <BookOpen className="text-primary" size={24} />,
    tags: ['Mathematics', 'Science', 'Social-science']
  },
  {
    year: '2023 - 2024',
    title: 'Higher Secondary Education (HSC)',
    institution: 'Government Higher Secondary School',
    description: 'Specialized in Biology and Mathematics. Developed early interests in programming and logic building.',
    icon: <School className="text-primary" size={24} />,
    tags: ['Biology', 'Physics', 'Mathematics']
  },
  {
    year: '2024 - Present',
    title: 'B.Tech Information Technology',
    institution: 'Mahendra Engineering College',
    description: 'Deep diving into Software Engineering, Data Structures, and Artificial Intelligence. Actively involved in technical clubs and research projects.',
    icon: <Rocket className="text-primary" size={24} />,
    tags: ['C', 'C++','Data Structures']
  },
  {
    year: 'Summer 2026',
    title: 'Full Stack Intern',
    institution: 'Self Study',
    description: 'Developed responsive web applications using React and Node.js. Collaborated with the design team to implement UI components.',
    icon: <Briefcase className="text-primary" size={24} />,
    tags: ['React', 'Node.js', 'MERN stack']
  },
  {
    year: 'Present',
    title: 'AI Research & Projects',
    institution: 'Self-Initiated / My-Team',
    description: 'Smart Agricultural Mnitoring System .This project is using ONLY AI (No IoT devices )',
    icon: <Code className="text-primary" size={24} />,
    tags: ['Deep Learning','Machine Learning','IOT ']
  },
  {
    year: 'Present FEATURE',
    title: 'Aspiring AI Engineer',
    institution: 'Ongoing Learning',
    description: 'Currently mastering advanced Generative AI and MLOps while building scalable full-stack applications.',
    icon: <Star className="text-primary" size={24} />,
    tags: ['GenAI', 'MLOps', 'Full Stack']
  }
];

export const Journey = () => {
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            My <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto">
            A timeline of my educational background and professional growth, from the early days of school to my current expertise in Web Development.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-20" />

          <div className="space-y-12">
            {journeyData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start px-4 md:px-12">
                  <div className="glass-card p-8 w-full hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-primary text-xs font-bold uppercase tracking-widest">{item.year}</span>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-secondary text-sm font-medium mb-3">{item.institution}</p>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-white/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-bg-dark border-2 border-primary z-20 hidden md:block">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full text-sm font-medium text-white/60">
            <Star className="text-primary" size={18} />
            Continuously learning and evolving...
          </div>
        </motion.div>
      </div>
    </section>
  );
};


