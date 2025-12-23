
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';

const Certifications: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-20">
        <span className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-4 block">Verification</span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">Certifications</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {CERTIFICATIONS.map((cert, index) => (
          <div
            key={index}
            className="elevated-card p-12 rounded-[56px] flex flex-col md:flex-row items-center justify-between gap-8 group"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-20 h-20 bg-teal-600 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-teal-100 group-hover:rotate-6 transition-transform">
                <ShieldCheck size={40} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">{cert.name}</h3>
                <p className="text-teal-600 font-black text-sm uppercase tracking-[0.2em]">{cert.provider}</p>
              </div>
            </div>
            <div className="px-8 py-4 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} className="text-yellow-400"/> {cert.badge}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
