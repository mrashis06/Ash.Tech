import Link from 'next/link';
import { Star } from 'lucide-react';
import type { GitHubRepo } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  repo: GitHubRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-xl bg-card">
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
          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
            View on GitHub
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
