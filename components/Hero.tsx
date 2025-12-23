
import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FileDown, ArrowRight } from 'lucide-react';
import { USER_INFO } from '../constants';

const Hero: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Subtle rotation for 3D effect on the card container
  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const moveX = event.clientX - centerX;
    // Fix: Using clientY instead of non-existent centerY on MouseEvent
    const moveY = event.clientY - centerY;
    
    x.set(moveX);
    y.set(moveY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById('contact');
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elemRect = elem.getBoundingClientRect().top;
      const elemPosition = elemRect - bodyRect;
      const offsetPosition = elemPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden lg:overflow-visible">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center lg:text-left z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm mb-8"
          >
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Available for New Opportunities</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">
            Building <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-500">Digital Logic.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-lg font-medium leading-relaxed mx-auto lg:mx-0">
            I'm <span className="text-gray-900 font-bold underline decoration-teal-200 decoration-4">Vikram C</span>, an aspiring developer bridging the gap between elegant UI and robust backend architecture.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-5">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={USER_INFO.resume}
              target="_blank"
              className="px-8 md:px-10 py-4 md:py-5 bg-gray-900 text-white rounded-2xl md:rounded-3xl font-bold flex items-center gap-3 shadow-2xl shadow-gray-200"
            >
              Resume <FileDown size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={handleContactClick}
              className="px-8 md:px-10 py-4 md:py-5 bg-white border border-gray-100 text-gray-900 rounded-2xl md:rounded-3xl font-bold flex items-center gap-3 hover:border-teal-200 transition-all cursor-pointer"
            >
              Contact <ArrowRight size={18} className="text-teal-500" />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Interactive Profile Card with True 3D Layering */}
        <div 
          className="flex justify-center items-center perspective-2000 py-16 lg:py-12"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main 3D tilt container */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-[300px] h-[360px] md:w-[420px] md:h-[500px] bg-white rounded-[50px] md:rounded-[70px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] flex items-center justify-center p-3 md:p-5 border border-gray-100/50"
          >
            {/* Ambient Background Glow (Behind Card) */}
            <div 
              className="absolute inset-20 bg-teal-50/20 rounded-full blur-[80px] -z-10"
              style={{ transform: 'translateZ(-60px)' }}
            />

            {/* Profile Image Container - FLAT Base Layer */}
            <div className="relative w-full h-full rounded-[38px] md:rounded-[56px] bg-gray-50/40 border border-gray-100 shadow-inner flex items-center justify-center p-2 md:p-2.5">
              <div className="relative w-full h-full overflow-hidden rounded-[32px] md:rounded-[48px] bg-white ring-1 ring-gray-100 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent z-10 pointer-events-none opacity-20" />
                <img 
                  src={USER_INFO.profilePhoto}
                  alt={USER_INFO.name}
                  className="w-full h-full object-cover object-[center_20%] scale-[1.1]"
                />
              </div>
            </div>
            
            {/* Floating Content Box - MOBILE: Top Center | DESKTOP: Side Overlap moved further right */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ 
                transform: 'translateZ(180px)', 
                zIndex: 60 
              }}
              className="absolute 
                -top-12 left-1/2 -translate-x-1/2 w-[90%] 
                md:-top-0 md:left-auto md:translate-x-0 md:-right-36 md:top-[22%] md:w-auto md:min-w-[240px]
                glass-effect p-4 md:p-6 rounded-[24px] md:rounded-[36px] shadow-[0_25px_50px_rgba(0,0,0,0.12)] border border-white/95"
            >
              <div className="flex flex-col gap-3 md:gap-4 whitespace-nowrap">
                <span className="text-[9px] md:text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] md:tracking-[0.25em] leading-none block border-b border-teal-50 pb-2 md:pb-3">
                  Currently Learning
                </span>
                <div className="flex flex-col gap-2.5 md:gap-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.6)]" />
                    <span className="text-[11px] md:text-sm font-bold text-gray-800 tracking-tight">Spring Boot</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
                    <span className="text-[11px] md:text-sm font-bold text-gray-800 tracking-tight">Japanese Language (N4)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Label - PUSHED FORWARD IN 3D SPACE */}
            <div 
              className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2" 
              style={{ transform: 'translateZ(80px)' }}
            >
               <span className="text-[10px] md:text-[11px] font-black text-gray-500 bg-white/95 backdrop-blur-2xl px-6 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-2xl border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] tracking-[0.2em] md:tracking-[0.25em] whitespace-nowrap uppercase">
                 Vikram C
               </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
