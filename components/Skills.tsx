
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Globe, Server, Layers, Settings, Bot, Cpu } from 'lucide-react';
import { SKILLS } from '../constants';

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming": <Terminal size={24} />,
  "Web Technologies": <Globe size={24} />,
  "Backend": <Server size={24} />,
  "Core Concepts": <Cpu size={24} />,
  "Tools & Services": <Settings size={24} />,
  "Additional": <Bot size={24} />
};

const categoryColorMap: Record<string, { bg: string, text: string, border: string, hoverShadow: string }> = {
  "Programming": { 
    bg: "bg-blue-50/80", 
    text: "text-blue-700", 
    border: "border-blue-100", 
    hoverShadow: "hover:shadow-blue-100" 
  },
  "Web Technologies": { 
    bg: "bg-indigo-50/80", 
    text: "text-indigo-700", 
    border: "border-indigo-100", 
    hoverShadow: "hover:shadow-indigo-100" 
  },
  "Backend": { 
    bg: "bg-emerald-50/80", 
    text: "text-emerald-700", 
    border: "border-emerald-100", 
    hoverShadow: "hover:shadow-emerald-100" 
  },
  "Core Concepts": { 
    bg: "bg-cyan-50/80", 
    text: "text-cyan-700", 
    border: "border-cyan-100", 
    hoverShadow: "hover:shadow-cyan-100" 
  },
  "Tools & Services": { 
    bg: "bg-orange-50/80", 
    text: "text-orange-700", 
    border: "border-orange-100", 
    hoverShadow: "hover:shadow-orange-100" 
  },
  "Additional": { 
    bg: "bg-pink-50/80", 
    text: "text-pink-700", 
    border: "border-pink-100", 
    hoverShadow: "hover:shadow-pink-100" 
  }
};

const Skills: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-20 relative">
        <span className="text-teal-600 font-bold uppercase tracking-widest text-[10px] mb-4 block">Abilities</span>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
          My <span className="text-teal-600">Skills</span>
        </h2>
        <div className="relative w-24 h-1.5 mx-auto bg-teal-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ left: '-100%' }}
            whileInView={{ left: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="absolute inset-0 bg-teal-500 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILLS.map((category, idx) => {
          const colors = categoryColorMap[category.category] || { 
            bg: "bg-gray-50", 
            text: "text-gray-600", 
            border: "border-gray-100", 
            hoverShadow: "hover:shadow-gray-100" 
          };
          
          return (
            <motion.div 
              key={category.category} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="elevated-card p-10 rounded-[42px] flex flex-col items-start bg-gradient-to-br from-blue-50/40 via-white to-white h-full"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-teal-600 shadow-sm border border-gray-100 mb-8 shrink-0">
                {categoryIcons[category.category] || <Layers size={24} />}
              </div>
              
              <h3 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight">
                {category.category}
              </h3>

              <div className="flex flex-wrap gap-3 mt-auto">
                {category.skills.map((skill) => (
                  <motion.span 
                    key={skill.name}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 ${colors.bg} border ${colors.border} ${colors.text} rounded-2xl text-xs font-bold shadow-sm ${colors.hoverShadow} hover:shadow-md transition-all cursor-pointer select-none`}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;