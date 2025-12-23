
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Database, Terminal, Cloud, Globe } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      title: "Backend Development",
      icon: <Database size={28} strokeWidth={1.5} />,
      label: "Architect"
    },
    {
      title: "Problem Solving",
      icon: <Terminal size={28} strokeWidth={1.5} />,
      label: "Logic"
    },
    {
      title: "Cloud Technologies",
      icon: <Cloud size={28} strokeWidth={1.5} />,
      label: "Deployment"
    },
    {
      title: "Full-Stack Web",
      icon: <Globe size={28} strokeWidth={1.5} />,
      label: "Interface"
    }
  ];

  // Fix: Explicitly typing as Variants avoids issues with deep property inference in Framer Motion for the container's transition
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Fix: Explicitly typing as Variants and using 'as const' on the ease array ensures it's treated as a fixed-size BezierDefinition tuple
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-teal-600 font-bold uppercase tracking-widest text-[10px] mb-4 block">Introduction</span>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
          The Developer <span className="text-teal-600">Persona</span>
        </h2>
        <div className="h-1 w-16 bg-teal-100 mx-auto rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            className="h-full bg-teal-500"
          />
        </div>
      </div>

      <div className="space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
            I’m <span className="text-teal-600 font-bold">Vikram C</span>, a B.Tech IT student with a strong interest in backend development. I enjoy building reliable web applications and solving real-world problems through clean code.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
           {highlights.map((item) => (
             <motion.div 
               key={item.title}
               variants={itemVariants}
               className="elevated-card py-10 px-6 rounded-[40px] text-center flex flex-col items-center bg-gradient-to-br from-blue-50/50 via-white to-white group"
             >
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-teal-600 shadow-sm border border-gray-100 mb-6 group-hover:scale-110 transition-transform duration-500">
                 {item.icon}
               </div>
               <span className="block text-[10px] font-black text-teal-600 uppercase tracking-widest mb-2 opacity-60">
                 {item.label}
               </span>
               <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight">
                 {item.title}
               </h3>
             </motion.div>
           ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
