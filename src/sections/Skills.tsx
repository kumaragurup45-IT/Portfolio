import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Database, Brain, Layout, Search, Filter, Sparkles, Code2, Terminal, Cpu, Award, ExternalLink, X } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
  tags: string[];
}

const sampleCertificates: Certificate[] = [
 
];

const CertificateCard = ({ cert, index, onFilter, onShowDetails }: { cert: Certificate; index: number; onFilter: () => void; onShowDetails: (e: React.MouseEvent) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 flex flex-col items-center text-center group relative overflow-hidden cursor-pointer h-full"
      onClick={onFilter}
    >
      {/* Pulsing Background Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 mb-4 p-6 bg-white/5 rounded-2xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
      >
        <Award className="text-primary" size={40} />
      </div>

      <h4
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 text-xl font-bold mb-1 group-hover:text-primary transition-colors"
      >
        {cert.title}
      </h4>
      <p
        style={{ transform: "translateZ(20px)" }}
        className="relative z-10 text-white/40 text-xs uppercase tracking-widest font-bold mb-3"
      >
        {cert.issuer} • {cert.date}
      </p>

      <div
        style={{ transform: "translateZ(10px)" }}
        className="relative z-10 flex flex-wrap justify-center gap-1 mt-auto mb-4"
      >
        {cert.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] text-white/40 uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={onShowDetails}
        className="relative z-10 mt-2 px-4 py-1.5 bg-white/5 hover:bg-primary hover:text-bg-dark border border-white/10 hover:border-primary rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
      >
        View Details
      </button>

      <div className="absolute -bottom-1 -left-1 -right-1 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
    </motion.div>
  );
};

const CertificateModal = ({ cert, onClose, allSkills }: { cert: Certificate; onClose: () => void; allSkills: any[] }) => {
  const relatedSkills = useMemo(() => {
    const certTags = cert.tags.map(t => t.toLowerCase());
    return allSkills.filter(skill => {
      const skillName = skill.name.toLowerCase();
      const skillTags = (skill.tags || []).map((t: string) => t.toLowerCase());
      return certTags.some(tag => skillName.includes(tag) || tag.includes(skillName)) ||
        skillTags.some((st: string) => certTags.some(ct => st.includes(ct) || ct.includes(st)));
    });
  }, [cert, allSkills]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-bg-dark/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative max-w-5xl w-full bg-bg-darker border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Award className="text-primary" size={32} />
              </div>
              <div>
                <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-1">{cert.issuer}</p>
                <p className="text-white/40 text-sm">{cert.date}</p>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{cert.title}</h3>

            <p className="text-white/60 mb-8 text-lg leading-relaxed">
              This certification validates advanced proficiency in {cert.title}, demonstrating a commitment to professional growth and technical excellence.
            </p>

            {relatedSkills.length > 0 && (
              <div className="mb-8">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-primary" />
                  Validated Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedSkills.map(skill => (
                    <div key={skill.name} className="px-3 py-1 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-white/80">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-10">
              {cert.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-bg-dark font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-300 group"
            >
              Verify Certificate
              <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CircularProgress = ({ level, index }: { level: number; index: number }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;
  const gradientId = `gradient-${index}`;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-white/5"
        />
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-white">{level}%</span>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getSkillLevelText = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Intermediate";
    return "Learning";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 flex flex-col items-center text-center group relative overflow-hidden"
    >
      {/* Shimmering Pulse Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />
      </motion.div>

      {/* Moving Shimmer Streak */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-150%', skewX: -20 }}
        animate={{ x: '150%', skewX: -20 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 4
        }}
      >
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>

      {/* Pulsing Background Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 mb-4 p-4 bg-white/5 rounded-2xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
      >
        <CircularProgress level={skill.level} index={index} />
      </div>

      <h4
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 text-xl font-bold mb-1 group-hover:text-primary transition-colors"
      >
        {skill.name}
      </h4>
      <p
        style={{ transform: "translateZ(20px)" }}
        className="relative z-10 text-white/40 text-xs uppercase tracking-widest font-bold mb-3"
      >
        {getSkillLevelText(skill.level)}
      </p>

      <div
        style={{ transform: "translateZ(10px)" }}
        className="relative z-10 flex flex-wrap justify-center gap-1 mt-auto"
      >
        {skill.tags?.map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] text-white/40 uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute -bottom-1 -left-1 -right-1 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
    </motion.div>
  );
};

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: <Layout className="text-primary" />,
    skills: [
      { name: 'HTML', level: 90, tags: ['CSS', 'JavaScript'] },
      { name: 'React', level: 50, tags: ['Hooks', 'Context', 'Redux'] },


    ]
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    icon: <Database className="text-secondary" />,
    skills: [
      { name: 'Java', level: 65, tags: ['Spring Boot', 'OOP', 'Multithreading'] },


    ]
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: <Brain className="text-accent" />,
    skills: [

      { name: 'Python', level: 70, tags: ['Pandas', 'NumPy', 'Scikit-Learn'] },


    ]
  },
  {
    id: 'tools',
    title: 'DevOps & Tools',
    icon: <Terminal className="text-white/60" />,
    skills: [
      { name: 'Git/GitHub', level: 85, tags: ['Version Control', 'Actions', 'Workflow'] },


    ]
  }
];

export const Skills = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeCertId, setActiveCertId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'skills' | 'certs'>('skills');

  const activeCert = useMemo(() =>
    activeCertId ? sampleCertificates.find(c => c.id === activeCertId) : null
    , [activeCertId]);

  const allSkillsList = useMemo(() => {
    let all: any[] = [];
    skillCategories.forEach(cat => {
      all = [...all, ...cat.skills.map(s => ({ ...s, category: cat.id }))];
    });
    return all;
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeCert) {
      const certTags = activeCert.tags.map(t => t.toLowerCase());
      return allSkillsList.filter(skill => {
        const skillName = skill.name.toLowerCase();
        const skillTags = (skill.tags || []).map((t: string) => t.toLowerCase());

        // Match if skill name is in cert tags or any skill tag is in cert tags
        return certTags.some(tag => skillName.includes(tag) || tag.includes(skillName)) ||
          skillTags.some((st: string) => certTags.some(ct => st.includes(ct) || ct.includes(st)));
      });
    }

    return allSkillsList;
  }, [activeCert, allSkillsList]);

  const filteredCerts = useMemo(() => {
    return sampleCertificates;
  }, []);

  return (
    <section id="skills" className="py-24 bg-bg-darker/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical expertise and the professional certifications that validate my skills.
          </p>
        </motion.div>

        {/* View Switcher */}
        <div className="flex justify-center mb-12">
          <div className="p-1 bg-white/5 border border-white/10 rounded-2xl flex gap-1">
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'skills'
                ? 'bg-primary text-bg-dark shadow-[0_0_20px_rgba(0,245,255,0.3)]'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              <Cpu size={18} />
              Technical Skills
            </button>
            <button
              onClick={() => setActiveTab('certs')}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'certs'
                ? 'bg-primary text-bg-dark shadow-[0_0_20px_rgba(0,245,255,0.3)]'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              <Award size={18} />
              Certifications
            </button>
          </div>
        </div>

        {activeTab === 'skills' && (
          <>
            {activeCertId && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 mb-12"
              >
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full flex items-center gap-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Skills related to: {activeCert?.title}
                  </span>
                  <button
                    onClick={() => setActiveCertId(null)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={14} className="text-primary" />
                  </button>
                </div>
                <h3 className="text-xl font-bold font-display text-white/80">
                  Showing <span className="text-primary">{filteredSkills.length}</span> matching skills
                </h3>
              </motion.div>
            )}

            {/* Skills Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <SkillCard
                    key={`${skill.category}-${skill.name}`}
                    skill={skill}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {/* Certifications Section */}
        {activeTab === 'certs' && filteredCerts.length > 0 && (
          <div className="mt-8">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredCerts.map((cert, index) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    index={index}
                    onFilter={() => {
                      setActiveCertId(cert.id);
                      setActiveTab('skills');
                      // Scroll to skills section top smoothly
                      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onShowDetails={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {(filteredSkills.length === 0 && filteredCerts.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Sparkles className="mx-auto text-white/10 mb-4" size={48} />
            <p className="text-white/40">No results found matching your search.</p>
          </motion.div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
            allSkills={allSkillsList}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
