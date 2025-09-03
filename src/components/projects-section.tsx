import type { GitHubRepo } from '@/types';
import { ProjectCard } from './project-card';
import { FolderKanban } from 'lucide-react';

interface ProjectsSectionProps {
  repos: GitHubRepo[];
}

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  return (
    <section id="projects" className="w-full py-12 md:py-24 bg-black">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">My Projects</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Here are some of my top projects from GitHub.
          </p>
        </div>
        <div className="relative space-y-12">
          <div className="absolute left-1/2 hidden md:block w-0.5 h-full bg-primary/20 transform -translate-x-1/2"></div>
          {repos.map((repo, index) => (
            <div 
              key={repo.id} 
              className="relative md:grid md:grid-cols-2 md:gap-12 items-start group"
            >
              <div className={`hidden md:flex items-center gap-6 ${index % 2 === 0 ? 'col-start-1 justify-end' : 'col-start-2 justify-start'}`}>
                <div className="w-6 h-0.5 bg-primary/20"></div>
                <div 
                  className="relative p-3 rounded-full bg-card border border-primary/30 z-10"
                  style={{ animation: `float 2s ease-in-out infinite` }}
                >
                  <FolderKanban className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="w-6 h-0.5 bg-primary/20"></div>
              </div>
              <div 
                className={`relative transition-transform transform hover:scale-105 ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}
                style={{ animation: `float 2s ease-in-out infinite`, animationDelay: `${index * 0.2}s` }}
              >
                <ProjectCard repo={repo} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
