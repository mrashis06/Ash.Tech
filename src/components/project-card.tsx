import Link from 'next/link';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import type { GitHubRepo } from '@/types';

interface ProjectCardProps {
  repo: GitHubRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <div className="flex flex-col h-full group">
      {/* The Dark Box */}
      <div className="clip-card relative w-full bg-card/40 border border-primary/20 aspect-video flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:bg-card/60 group-hover:border-primary">
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

      {/* Description and GitHub Link */}
      <div className="mt-6 flex flex-col flex-grow px-2">
        <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3 md:line-clamp-none">
          {repo.description}
        </p>
        <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          View Project
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
