
// Fix: Cleaned up malformed and duplicate React imports
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Languages from './components/Languages';
import Contact from './components/Contact';
import ThreeBackground from './components/ThreeBackground';
import Loader from './components/Loader';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Very subtle parallax for the entire content container to give a sense of depth
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    // Simulate initial loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    const handleLoad = () => {
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-teal-100 selection:text-teal-900">
      <AnimatePresence>
        {isLoading && <Loader progress={loadingProgress} />}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeBackground />
      </div>

      <Navbar />
      
      <motion.main 
        style={{ y: yContent }}
        className="relative z-10 space-y-24 pb-24"
      >
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <SectionWrapper id="about">
            <About />
          </SectionWrapper>

          <SectionWrapper id="skills">
            <Skills />
          </SectionWrapper>

          <SectionWrapper id="education">
            <Education />
          </SectionWrapper>

          <SectionWrapper id="experience">
            <Experience />
          </SectionWrapper>

          <SectionWrapper id="projects">
            <Projects />
          </SectionWrapper>

          <SectionWrapper id="certifications">
            <Certifications />
          </SectionWrapper>

          <SectionWrapper id="languages">
            <Languages />
          </SectionWrapper>

          <SectionWrapper id="contact">
            <Contact />
          </SectionWrapper>
        </div>
      </motion.main>

      <footer className="relative z-20 py-16 text-center text-gray-400 text-sm bg-white/40 backdrop-blur-md border-t border-gray-100">
        <p className="font-medium">© {new Date().getFullYear()} Vikram C. Designed for modern performance.</p>
      </footer>
    </div>
  );
};

const SectionWrapper: React.FC<{ children: React.ReactNode; id: string }> = ({ children, id }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className="section-surface rounded-[64px] p-8 md:p-20 relative overflow-hidden backdrop-blur-[2px]"
  >
    {children}
  </motion.section>
);

export default App;
