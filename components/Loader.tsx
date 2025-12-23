
import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo/Name Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-xl font-black tracking-[0.3em] text-gray-900 uppercase">
            Vikram <span className="text-teal-600">C</span>
          </h1>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-gray-100 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-teal-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Percentage Label */}
        <motion.span 
          className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>

      {/* Decorative background elements consistent with the site */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[100px] -z-10" />
    </motion.div>
  );
};

export default Loader;
