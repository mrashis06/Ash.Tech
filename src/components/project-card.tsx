import Link from 'next/link';
import { Star, GitFork, ArrowUpRight, Sparkles } from 'lucide-react';
import type { GitHubRepo } from '@/types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  repo: GitHubRepo;
}

const tagVariants = {
  hidden: { opacity: 0, x: -12, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.06, type: 'spring', bounce: 0.4 },
  }),
};

export function ProjectCard({ repo }: ProjectCardProps) {
  const tags = [repo.appType].filter(Boolean) as string[];

  return (
    <div className="flex flex-col h-full group">
      {/* The Dark Box */}
      <div className="exp-card clip-card relative w-full bg-card/40 border border-primary/20 aspect-video flex flex-col items-center justify-center p-6 transition-all duration-500 group-hover:bg-card/60 group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/10 overflow-hidden">
        {/* Shimmer sweep */}
        <span className="exp-shimmer" />

        {repo.homepage && (
          <Link
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 group/live flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wider uppercase bg-background/70 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 live-demo-btn"
          >
            {/* Pulsing live dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live
            {/* Sliding arrow */}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
          </Link>
        )}
        
        <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors text-center line-clamp-2">
          {repo.name}
        </h3>
        
        <div className="flex items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 hover:text-yellow-400 transition-colors" />
            <span className="text-sm font-medium">{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 hover:text-primary transition-colors" />
            <span className="text-sm font-medium">{repo.forks_count || 0}</span>
          </div>
        </div>
      </div>

      {/* Description, Tags and GitHub Link */}
      <div className="mt-6 flex flex-col flex-grow px-2">
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3 md:line-clamp-none">
          {repo.description}
        </p>

        {/* Staggered tag pop-in — same as experience skills */}
        {tags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }, hidden: {} }}
          >
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={tagVariants}
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-primary/30 text-muted-foreground bg-primary/5 hover:bg-primary/20 hover:text-primary hover:border-primary hover:scale-105 transition-all duration-200 cursor-default"
              >
                <Sparkles className="w-2.5 h-2.5 opacity-60" />
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          View Project
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
