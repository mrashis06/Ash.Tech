import type { MediumPost } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Rss } from 'lucide-react';

interface BlogsSectionProps {
  blogs: MediumPost[];
}

const createSnippet = (html: string, length: number = 100) => {
  if (!html) return '';
  const stripped = html.replace(/<[^>]+>/g, '');
  return stripped.length > length ? `${stripped.substring(0, length)}...` : stripped;
};

export function BlogsSection({ blogs }: BlogsSectionProps) {
  return (
    <section id="blogs" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Blogs</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Sharing my thoughts on technology, development, and AI.
          </p>
        </div>
        <div className="relative space-y-12">
          <div className="absolute left-1/2 hidden md:block w-0.5 h-full bg-primary/20 transform -translate-x-1/2"></div>
          {blogs.slice(0, 3).map((post, index) => (
            <div 
              key={post.guid} 
              className="relative md:grid md:grid-cols-2 md:gap-12 items-start group"
            >
              <div className={`hidden md:flex items-center gap-6 ${index % 2 === 0 ? 'col-start-1 justify-end' : 'col-start-2 justify-start'}`}>
                <div className="w-6 h-0.5 bg-primary/20"></div>
                <div 
                  className="relative p-3 rounded-full bg-card border border-primary/30 z-10"
                  style={{ animation: `float 2s ease-in-out infinite` }}
                >
                   <Rss className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="w-6 h-0.5 bg-primary/20"></div>
              </div>

              <div 
                className={`relative transition-transform transform hover:scale-105 ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}
                style={{ animation: `float 2s ease-in-out infinite`, animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative transition-transform transform hover:scale-105 group animated-gradient-border rounded-2xl h-full">
                  <Card className="flex flex-col h-full bg-card rounded-xl">
                    <CardHeader>
                      <CardTitle className="text-xl h-20 line-clamp-3">{post.title}</CardTitle>
                      <CardDescription className="h-24 line-clamp-4">{createSnippet(post.content)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {post.categories.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={post.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                        Read More on Medium
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
