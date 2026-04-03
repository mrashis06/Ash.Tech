"use client";

import { useState, useMemo, useRef } from 'react';
import type { GitHubRepo } from '@/types';
import { ProjectCard } from './project-card';
import { FolderKanban, Layers, Smartphone, Globe, Bot, Grid3X3 } from 'lucide-react';
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

const CATEGORY_META: Record<string, { icon: React.ElementType; label: string; shortLabel: string }> = {
  All:      { icon: Grid3X3,    label: 'All',    shortLabel: 'All' },
  Mobile:   { icon: Smartphone, label: 'Mobile', shortLabel: 'Mobile' },
  Web:      { icon: Globe,      label: 'Web',    shortLabel: 'Web' },
  'AI & ML':{ icon: Bot,        label: 'AI & ML',shortLabel: 'AI/ML' },
  Other:    { icon: Layers,     label: 'Other',  shortLabel: 'Other' },
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

  const visibleCategories = categories.filter(c => c === 'All' || (categoryCounts[c] || 0) > 0);

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

        {/* ── Premium Category Filter ── */}
        <motion.div
          className="w-full flex justify-center mb-12 px-4 sm:px-0"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
        >
          {/* Scroll-fade wrapper — masks edges on mobile */}
          <div
            className="relative max-w-full"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
            {/* Scrollable row */}
            <div className="overflow-x-auto pb-0.5 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {/* Outer glow ring */}
              <div className="relative p-[1.5px] rounded-[2.5rem] inline-flex"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)/0.55) 0%, transparent 50%, hsl(var(--primary)/0.25) 100%)',
                }}
              >
                {/* Inner pill container */}
                <div
                  className="relative flex items-center gap-0.5 p-1 sm:p-1.5 rounded-[2.5rem] overflow-hidden"
                  style={{ background: 'hsl(var(--card)/0.85)', backdropFilter: 'blur(16px)' }}
                >
              {/* Ambient background shimmer strip */}
              <span
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary)/0.18) 0%, transparent 70%)',
                }}
              />

              {visibleCategories.map((category, idx) => {
                const count = categoryCounts[category] || 0;
                const isActive = activeCategory === category;
                const { icon: Icon, shortLabel } = CATEGORY_META[category];
                return (
                  <div key={category} className="flex items-center">
                    {/* Faint divider between items (not before first) */}
                    {idx > 0 && (
                      <span
                        className="w-px h-4 rounded-full mx-0.5 shrink-0"
                        style={{ background: 'hsl(var(--primary)/0.18)' }}
                      />
                    )}

                    <motion.button
                      onClick={() => setActiveCategory(category)}
                      className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold select-none focus:outline-none whitespace-nowrap"
                      style={{ color: isActive ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))' }}
                      whileTap={{ scale: 0.93 }}
                      whileHover={!isActive ? { scale: 1.05 } : {}}
                      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    >
                      {/* Sliding pill background */}
                      {isActive && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 100%)',
                            boxShadow: '0 0 18px 4px hsl(var(--primary)/0.35), 0 2px 8px hsl(var(--primary)/0.4)',
                          }}
                          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                        />
                      )}

                      {/* Hover shimmer on inactive */}
                      {!isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                          style={{ background: 'hsl(var(--primary)/0.08)' }}
                          whileHover={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {/* Icon */}
                      <motion.span
                        className="relative z-10"
                        animate={{ rotate: isActive ? [0, -8, 8, 0] : 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                      >
                        <Icon
                          className="w-3.5 h-3.5 shrink-0"
                          style={{
                            color: isActive ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                            filter: isActive ? 'drop-shadow(0 0 4px hsl(var(--primary-foreground)/0.5))' : 'none',
                          }}
                        />
                      </motion.span>

                      {/* Label — short on xs, full on sm+ */}
                      <span className="relative z-10 tracking-wide sm:hidden">{shortLabel}</span>
                      <span className="relative z-10 tracking-wide hidden sm:inline">{category}</span>

                      {/* Count badge */}
                      <motion.span
                        className="relative z-10 inline-flex items-center justify-center min-w-[1.35rem] h-[1.35rem] rounded-full text-[0.65rem] font-bold px-1 tabular-nums"
                        style={{
                          background: isActive
                            ? 'hsl(var(--primary-foreground)/0.18)'
                            : 'hsl(var(--primary)/0.12)',
                          color: isActive
                            ? 'hsl(var(--primary-foreground)/0.9)'
                            : 'hsl(var(--primary))',
                          border: isActive
                            ? '1px solid hsl(var(--primary-foreground)/0.2)'
                            : '1px solid hsl(var(--primary)/0.25)',
                          backdropFilter: 'blur(6px)',
                        }}
                        initial={false}
                        animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {count}
                      </motion.span>
                    </motion.button>
                  </div>
                );
              })}
                </div>
              </div>
            </div>
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
