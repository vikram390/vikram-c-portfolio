
import React, { useState, useEffect, useRef } from 'react';
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
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Removed mainTranslateY to fix the "hanging" scroll and bottom gap
  const mainScale = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [1, 1, 1, 0.98]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 5;
      });
    }, 100);

    const finishLoading = () => {
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }

    const safetyTimeout = setTimeout(finishLoading, 4000);

    return () => {
      window.removeEventListener('load', finishLoading);
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" progress={loadingProgress} />}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeBackground />
      </div>

      <Navbar />
      
      {/* Removed pb-24 and y: mainTranslateY to remove bottom gap */}
      <motion.main 
        style={{ scale: mainScale }}
        className="relative z-10 space-y-16 md:space-y-24 flex-grow will-change-transform"
      >
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-24">
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

      {/* Reduced py-16 to py-8 for a tighter footer */}
      <footer className="relative z-20 py-10 text-center text-gray-400 text-sm bg-white/40 backdrop-blur-md border-t border-gray-100 mt-16 md:mt-24">
        <p className="font-medium">© {new Date().getFullYear()} Vikram C. Crafted with smooth 3D Motion.</p>
      </footer>
    </div>
  );
};

const SectionWrapper: React.FC<{ children: React.ReactNode; id: string }> = ({ children, id }) => {
  const ref = useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(sectionProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={ref}
      id={id}
      style={{ scale, opacity }}
      className="section-surface rounded-[40px] md:rounded-[64px] p-6 md:p-20 relative overflow-hidden backdrop-blur-[2px] last:mb-0 will-change-transform"
    >
      {children}
    </motion.section>
  );
};

export default App;
