
import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Languages as LanguagesIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';

const Languages: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-4 block">Communication</span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">Languages</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {LANGUAGES.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="elevated-card p-8 rounded-[40px] flex flex-col items-center text-center group bg-white/50 backdrop-blur-sm"
          >
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 shadow-inner">
              <Globe2 size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{lang.name}</h3>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-6 opacity-80">{lang.level}</p>
            
            {/* Proficiency Dots */}
            <div className="flex gap-1.5 mt-auto">
              {[...Array(5)].map((_, i) => {
                const isActive = (i + 1) * 20 <= lang.proficiency;
                return (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isActive ? 'bg-teal-500 scale-110' : 'bg-gray-100'
                    }`}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
