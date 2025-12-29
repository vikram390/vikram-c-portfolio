
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Skills from './components/Skills.tsx';
import Education from './components/Education.tsx';
import Experience from './components/Experience.tsx';
import Projects from './components/Projects.tsx';
import Certifications from './components/Certifications.tsx';
import Languages from './components/Languages.tsx';
import Contact from './components/Contact.tsx';
import ThreeBackground from './components/ThreeBackground.tsx';
import Loader from './components/Loader.tsx';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const desktopScale = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [1, 1, 1, 0.98]);
  const mobileMainScale = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [1, 1, 1, 0.99]);
  const mainScale = isMobile ? mobileMainScale : desktopScale;

  useEffect(() => {
    // Fake progress animation
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 8;
      });
    }, 150);

    const finishLoading = () => {
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Safety: If window is already loaded or takes too long, finish loading anyway
    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }

    const safetyTimeout = setTimeout(finishLoading, 3000);

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
      
      <motion.main 
        style={{ scale: mainScale }}
        className="relative z-10 space-y-16 md:space-y-24 flex-grow will-change-transform"
      >
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-24 pb-20">
          <SectionWrapper id="about" isMobile={isMobile}>
            <About />
          </SectionWrapper>

          <SectionWrapper id="skills" isMobile={isMobile}>
            <Skills />
          </SectionWrapper>

          <SectionWrapper id="education" isMobile={isMobile}>
            <Education />
          </SectionWrapper>

          <SectionWrapper id="experience" isMobile={isMobile}>
            <Experience />
          </SectionWrapper>

          <SectionWrapper id="projects" isMobile={isMobile}>
            <Projects />
          </SectionWrapper>

          <SectionWrapper id="certifications" isMobile={isMobile}>
            <Certifications />
          </SectionWrapper>

          <SectionWrapper id="languages" isMobile={isMobile}>
            <Languages />
          </SectionWrapper>

          <SectionWrapper id="contact" isMobile={isMobile}>
            <Contact />
          </SectionWrapper>
        </div>
      </motion.main>

      <footer className="relative z-20 py-10 text-center text-gray-400 text-sm bg-white/40 backdrop-blur-md border-t border-gray-100">
        <p className="font-medium">© {new Date().getFullYear()} Vikram C. Crafted with smooth 3D Motion.</p>
      </footer>
    </div>
  );
};

const SectionWrapper: React.FC<{ children: React.ReactNode; id: string; isMobile: boolean }> = ({ children, id, isMobile }) => {
  const ref = useRef(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const desktopScale = useTransform(sectionProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const desktopOpacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const mobileOpacity = useTransform(sectionProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const mobileY = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [20, 0, 0, -20]);

  return (
    <motion.section 
      ref={ref}
      id={id}
      style={{ 
        scale: isMobile ? 1 : desktopScale, 
        opacity: isMobile ? mobileOpacity : desktopOpacity,
        y: isMobile ? mobileY : 0
      }}
      className="section-surface rounded-[40px] md:rounded-[64px] p-6 md:p-20 relative overflow-hidden backdrop-blur-[2px] last:mb-0 will-change-transform"
    >
      {children}
    </motion.section>
  );
};

export default App;
