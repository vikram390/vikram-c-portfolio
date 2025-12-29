
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Globe, ChevronRight, X, Clock, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleRepoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.repoUrl) {
      window.open(project.repoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15, 
          delay: index * 0.1,
          duration: 0.8
        }}
        onClick={() => setIsOpen(true)}
        className="elevated-card rounded-[40px] overflow-hidden cursor-pointer group h-full flex flex-col"
      >
        <motion.div layoutId={`image-${project.id}`} className="h-52 overflow-hidden relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/10 transition-colors" />
          
          {/* Direct Repo Icon Link on Card */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <button 
               onClick={handleRepoClick}
               className="p-4 bg-white/90 backdrop-blur-md rounded-full shadow-xl text-gray-900 hover:bg-teal-600 hover:text-white transition-all transform hover:scale-110"
               title="View Repository"
             >
               <Github size={24} />
             </button>
          </div>

          {project.status && (
            <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2 border border-white/50 shadow-sm">
              <Clock size={12} className="text-teal-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">{project.status}</span>
            </div>
          )}
        </motion.div>
        
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[9px] font-black uppercase tracking-widest py-1 px-3 bg-teal-50/50 border border-teal-100 text-teal-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <motion.h3 layoutId={`title-${project.id}`} className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
            {project.title}
          </motion.h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">
            {project.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center text-teal-600 font-bold text-xs gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              View Details <ChevronRight size={14} />
            </div>
            {project.repoUrl && (
              <button 
                onClick={handleRepoClick}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-teal-600 transition-colors"
              >
                <Github size={12} />
                View Code
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            />
            <motion.div
              layoutId={`container-${project.id}`}
              className="relative w-full max-w-4xl bg-white rounded-[48px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg z-[110] hover:bg-teal-600 hover:text-white transition-all">
                <X size={20} />
              </button>

              <div className="overflow-y-auto">
                <motion.div layoutId={`image-${project.id}`} className="w-full h-[320px]">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </motion.div>
                
                <div className="p-10 md:p-14">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    {project.status && (
                      <span className="px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-teal-100">
                        {project.status}
                      </span>
                    )}
                    <span className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Project Insight</span>
                  </div>

                  <motion.h3 layoutId={`title-${project.id}`} className="text-4xl font-black text-gray-900 leading-tight mb-8">
                    {project.title}
                  </motion.h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    <div className="md:col-span-2">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Description</h4>
                      <p className="text-lg text-gray-600 leading-relaxed font-medium">{project.description}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-100">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {project.repoUrl && (
                    <div className="flex">
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-5 bg-gray-900 text-white rounded-[28px] text-center font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200"
                      >
                        <Github size={20} />
                        View Repository
                        <ExternalLink size={16} className="opacity-50" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-4 block">Portfolio</span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">Recent <span className="text-teal-600">Projects</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
