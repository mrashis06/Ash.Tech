
import Link from 'next/link';
import { Star, ExternalLink } from 'lucide-react';
import type { GitHubRepo } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  repo: GitHubRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <div className="relative group animated-gradient-border rounded-2xl h-full">
      <Card className="flex flex-col h-full bg-card rounded-xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{repo.name}</CardTitle>
            <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                {repo.homepage && (
                  <Link href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-5 h-5" />
                    <span className="sr-only">View Live</span>
                  </Link>
                )}
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  <span className="sr-only">View on GitHub</span>
                </Link>
              </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <CardDescription className="text-sm h-24 overflow-hidden">{repo.description || 'No description provided.'}</CardDescription>
          <div className="flex justify-between items-center mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{repo.stargazers_count}</span>
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
