"use client";

import { useState, useMemo } from 'react';
import type { GitHubRepo } from '@/types';
import { ProjectCard } from './project-card';
import { FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectsSectionProps {
  repos: GitHubRepo[];
}

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Mobile', 'Web', 'AI & ML', 'Other'];

  const categoryCounts = useMemo(() => {
    const counts = { All: repos.length, Mobile: 0, Web: 0, 'AI & ML': 0, Other: 0 } as Record<string, number>;
    repos.forEach(repo => {
       const type = repo.appType || 'Other';
       if (counts[type] !== undefined) {
         counts[type]++;
       } else {
         counts.Other++;
       }
    });
    return counts;
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (activeCategory === 'All') return repos;
    return repos.filter(r => (r.appType || 'Other') === activeCategory);
  }, [repos, activeCategory]);

  return (
    <section id="projects" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">My Projects</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Here are some of my top projects from GitHub.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 p-1.5 sm:p-2 border border-primary/20 rounded-[2rem] bg-card overflow-hidden">
            {categories.map(category => {
              const count = categoryCounts[category] || 0;
              if (count === 0 && category !== 'All') return null;
              
              const isActive = activeCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/5 border-transparent'
                  }`}
                >
                  {category} <span className={`text-xs font-normal opacity-80 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative space-y-12">
          <div className="absolute left-1/2 hidden md:block w-0.5 h-full bg-primary/20 transform -translate-x-1/2 transition-all duration-500"></div>
          {filteredRepos.map((repo, index) => (
            <motion.div 
              key={repo.id} 
              className="relative md:grid md:grid-cols-2 md:gap-12 items-start group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4), ease: 'easeOut' }}
            >
              <div className={`hidden md:flex items-center gap-6 ${index % 2 === 0 ? 'col-start-1 justify-end' : 'col-start-2 justify-start'}`}>
                <div className="w-6 h-0.5 bg-primary/20"></div>
                <div 
                  className="relative p-3 rounded-full bg-card border border-primary/30 z-10"
                >
                  <FolderKanban className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="w-6 h-0.5 bg-primary/20"></div>
              </div>
              <div 
                className={`relative transition-transform duration-300 md:hover:scale-105 ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}
              >
                <ProjectCard repo={repo} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
