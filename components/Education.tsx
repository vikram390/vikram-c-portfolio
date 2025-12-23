
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, School, Star } from 'lucide-react';
import { EDUCATION } from '../constants';

const Education: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16 relative">
        <span className="text-teal-600 font-bold uppercase tracking-widest text-[10px] mb-4 block">Qualifications</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 inline-block relative group">
          Education
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-2 left-0 h-1 bg-teal-500 rounded-full"
          />
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {EDUCATION.map((item, index) => {
          const isEven = index % 2 === 0;
          const Icon = item.icon === 'GraduationCap' ? GraduationCap : School;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring", 
                stiffness: 80, 
                damping: 20,
                duration: 0.8 
              }}
              whileHover={{ 
                scale: 1.01, 
                y: -4,
              }}
              className="elevated-card flex flex-col md:flex-row gap-8 items-start md:items-center p-8 md:p-12 rounded-[48px]"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-teal-50 rounded-[28px] flex items-center justify-center text-teal-600 shrink-0 shadow-inner border border-teal-100/20">
                <Icon size={32} className="md:size-[40px]" strokeWidth={1.5} />
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                    {item.institution}
                  </h3>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm self-start md:self-center">
                    <Calendar size={14} className="text-teal-600" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">{item.year}</span>
                  </div>
                </div>

                <p className="text-lg text-teal-600 font-bold mb-4">
                  {item.degree}
                </p>
                
                <div className="flex flex-wrap gap-5 items-center">
                  <p className="flex items-center gap-2 text-gray-500 font-semibold text-sm">
                    <MapPin size={14} className="text-gray-400" />
                    {item.location}
                  </p>
                  
                  {item.result && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-lg border border-teal-100">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Result: {item.result}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
