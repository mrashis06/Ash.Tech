"use client";

import { useState, useMemo, useRef } from 'react';
import type { GitHubRepo } from '@/types';
import { ProjectCard } from './project-card';
import { FolderKanban, Layers } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface ProjectsSectionProps {
  repos: GitHubRepo[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, type: 'spring', bounce: 0.3 },
  },
  exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.25 } },
};

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Mobile', 'Web', 'AI & ML', 'Other'];
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const categoryCounts = useMemo(() => {
    const counts = { All: repos.length, Mobile: 0, Web: 0, 'AI & ML': 0, Other: 0 } as Record<string, number>;
    repos.forEach(repo => {
      const type = repo.appType || 'Other';
      if (counts[type] !== undefined) counts[type]++;
      else counts.Other++;
    });
    return counts;
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (activeCategory === 'All') return repos;
    return repos.filter(r => (r.appType || 'Other') === activeCategory);
  }, [repos, activeCategory]);

  return (
    <section id="projects" className="w-full py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring' }}
          >
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm uppercase tracking-widest text-primary font-medium">GitHub</span>
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">My Projects</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Here are some of my top projects from GitHub.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 p-1.5 sm:p-2 border border-primary/20 rounded-[2rem] bg-card overflow-hidden">
            {categories.map(category => {
              const count = categoryCounts[category] || 0;
              if (count === 0 && category !== 'All') return null;
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/5 border-transparent'
                  }`}
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: isActive ? 1 : 1.04 }}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                      layoutId="filter-glow"
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    />
                  )}
                  <span className="relative">{category}</span>
                  <span className={`relative text-xs font-normal opacity-80 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects list */}
        <div ref={sectionRef} className="relative space-y-12">
          <motion.div
            className="absolute left-1/2 hidden md:block w-0.5 h-full bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 transform -translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : undefined}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  className="relative md:grid md:grid-cols-2 md:gap-12 items-start group mb-12"
                  variants={rowVariants}
                  layout
                >
                  {/* Icon node (desktop) */}
                  <div
                    className={`hidden md:flex items-center gap-6 ${
                      index % 2 === 0 ? 'col-start-1 justify-end' : 'col-start-2 justify-start'
                    }`}
                  >
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-primary/40" />
                    <motion.div
                      className="relative p-3 rounded-full bg-card border border-primary/30 z-10 shadow-sm hover:shadow-primary/30 hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                    >
                      <span className="exp-pulse-ring" />
                      <span className="exp-pulse-ring exp-pulse-ring--delay" />
                      <FolderKanban className="w-8 h-8 text-primary" />
                    </motion.div>
                    <div className="w-6 h-0.5 bg-gradient-to-l from-transparent to-primary/40" />
                  </div>

                  {/* Card */}
                  <motion.div
                    className={`relative ${
                      index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'
                    }`}
                    whileHover={{ scale: 1.025, y: -4 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  >
                    <ProjectCard repo={repo} />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
