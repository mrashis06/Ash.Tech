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
    <div className="relative transition-transform transform hover:scale-105 group animated-gradient-border rounded-2xl h-full">
      <Card className="flex flex-col h-full bg-card rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold truncate">{repo.name}</CardTitle>
          <CardDescription className="text-sm h-24 overflow-hidden">{repo.description || 'No description provided.'}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
          <div className="flex justify-between items-center mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{repo.stargazers_count}</span>
            </Badge>
            <div className="flex items-center space-x-4">
              {repo.homepage && (
                <Link href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  View Live <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                View on GitHub
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
