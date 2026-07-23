'use client';

import { useState, useMemo } from 'react';
import type { GitHubRepo } from '@/types';
import { CinemaStageDisplay } from './project-card';
import { Layers, Smartphone, Globe, Bot, Grid3X3, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsSectionProps {
  repos: GitHubRepo[];
}

const CATEGORY_META: Record<string, { icon: React.ElementType; label: string }> = {
  All:      { icon: Grid3X3,    label: 'All' },
  Mobile:   { icon: Smartphone, label: 'Mobile' },
  Web:      { icon: Globe,      label: 'Web' },
  'AI & ML':{ icon: Bot,        label: 'AI & ML' },
  Other:    { icon: Layers,     label: 'Other' },
};

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const categories = ['All', 'Mobile', 'Web', 'AI & ML', 'Other'];

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
  const currentRepo = filteredRepos[selectedIndex] || filteredRepos[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % filteredRepos.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + filteredRepos.length) % filteredRepos.length);
  };

  return (
    <section id="projects" className="w-full py-16 md:py-28 bg-background border-t border-border/30">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase mb-2.5 block">
            GitHub Showcase
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline text-foreground">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto mt-2 font-sans">
            Select any project from the index list to view specifications on the stage.
          </p>
        </motion.div>

        {/* Category Tabs Bar */}
        <motion.div
          className="flex items-center overflow-x-auto justify-start sm:justify-center gap-2 mb-8 md:mb-12 pb-2 no-scrollbar px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {visibleCategories.map((category) => {
            const count = categoryCounts[category] || 0;
            const isActive = activeCategory === category;
            const { icon: Icon, label } = CATEGORY_META[category];

            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedIndex(0);
                }}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none shrink-0 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-border/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-secondary text-muted-foreground'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Mobile Single-Row Stepper Header (Mobile Only) */}
        {filteredRepos.length > 0 && (
          <div className="flex lg:hidden items-center justify-between gap-3 mb-5 px-1 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(filteredRepos.length).padStart(2, '0')}
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300 font-headline font-semibold truncate max-w-[170px]">
                {currentRepo?.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-card/80 border border-border/40 text-foreground hover:border-primary transition-all active:scale-95 cursor-pointer"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-card/80 border border-border/40 text-foreground hover:border-primary transition-all active:scale-95 cursor-pointer"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Dual Cinema Stage */}
        {filteredRepos.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Index Menu List (Desktop Only) */}
            <div
              className="hidden lg:flex lg:col-span-5 flex-col gap-1 border-l border-border/30 pl-4 sm:pl-6 max-h-[480px] overflow-y-auto no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredRepos.map((repo, idx) => {
                const isSelected = selectedIndex === idx;
                const formattedIndex = String(idx + 1).padStart(2, '0');

                return (
                  <button
                    key={repo.id}
                    onClick={() => setSelectedIndex(idx)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`relative w-full py-3.5 px-4 text-left rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'text-foreground font-bold bg-secondary/50'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                    }`}
                  >
                    {/* Active White Accent Line */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeCinemaBar"
                        className="absolute -left-[17px] sm:-left-[25px] top-0 bottom-0 w-1 bg-foreground rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}

                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="text-xs font-mono font-medium text-muted-foreground">
                        {formattedIndex}
                      </span>
                      <span className="text-base font-headline tracking-tight truncate">
                        {repo.name}
                      </span>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'translate-x-1 text-foreground opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Cinema Stage Display (Desktop & Mobile) */}
            <div className="lg:col-span-7 w-full">
              <AnimatePresence mode="wait">
                {currentRepo && (
                  <CinemaStageDisplay key={currentRepo.id} repo={currentRepo} />
                )}
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
