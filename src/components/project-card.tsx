'use client';

import Link from 'next/link';
import { Star, GitFork, ArrowUpRight, Github, Code2 } from 'lucide-react';
import type { GitHubRepo } from '@/types';
import { motion } from 'framer-motion';

interface CinemaStageProps {
  repo: GitHubRepo;
}

export function CinemaStageDisplay({ repo }: CinemaStageProps) {
  const tags = [repo.appType].filter(Boolean) as string[];
  const isLongTitle = repo.name.length > 18;

  return (
    <motion.div
      key={repo.id}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col justify-between min-h-[360px] sm:min-h-[440px] p-6 sm:p-10 rounded-3xl bg-[#070709] border border-border/40 hover:border-primary/40 transition-all duration-300 shadow-2xl relative overflow-hidden group/stage"
    >
      {/* Ambient Top Light Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-primary shrink-0 shadow-sm"
            >
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            {tags.length > 0 && (
              <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                #{tags[0]}
              </span>
            )}
          </div>

          {repo.homepage && (
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Live Application</span>
            </div>
          )}
        </div>

        {/* Title — Deep Black High Contrast */}
        <h3 className={`font-extrabold tracking-tight text-white font-headline mb-3 sm:mb-4 leading-tight break-words overflow-hidden relative z-10 ${
          isLongTitle ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'
        }`}>
          {repo.name}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-xs sm:text-base font-sans leading-relaxed max-w-2xl mb-6 sm:mb-8 relative z-10">
          {repo.description || 'High-performance software development project hosted on GitHub.'}
        </p>
      </div>

      <div className="relative z-10">
        {/* Metrics Row */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 pt-5 border-t border-zinc-800/60">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
            <span className="font-bold text-white">{repo.stargazers_count}</span>
            <span>Stars</span>
          </div>

          {(repo.forks_count || 0) > 0 && (
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <GitFork className="w-4 h-4 text-primary" />
              <span className="font-bold text-white">{repo.forks_count}</span>
              <span>Forks</span>
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs sm:text-sm transition-all border border-zinc-800 hover:border-zinc-700 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Github className="w-4 h-4" />
            <span>Source Code</span>
          </Link>

          {repo.homepage && (
            <Link
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.03] active:scale-[0.98] sm:ml-auto"
            >
              <span>Visit Live App</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

    </motion.div>
  );
}

export function ProjectCard({ repo }: { repo: GitHubRepo }) {
  return null;
}
