
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-4 block">Journey</span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">Work <span className="text-teal-600">Experience</span></h2>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-teal-100 before:to-transparent">
        {EXPERIENCE.map((item, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-teal-500 text-white shadow-xl md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shrink-0 z-10">
              <Briefcase size={18} />
            </div>

            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] elevated-card p-10 rounded-[48px] relative">
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-teal-600 font-black text-[10px] uppercase tracking-widest">{item.period}</span>
                <h3 className="text-2xl font-black text-gray-900 leading-tight">{item.title}</h3>
                <div className="flex flex-wrap gap-4 mt-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                    <Briefcase size={12} className="text-teal-500" />
                    {item.company}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                    <MapPin size={12} className="text-teal-500" />
                    {item.location}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-4">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 shrink-0">
                      <CheckCircle2 size={14} className="text-teal-400" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {resp}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
