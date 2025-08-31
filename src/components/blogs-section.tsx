import type { MediumPost } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface BlogsSectionProps {
  blogs: MediumPost[];
}

// Helper function to strip HTML and truncate text
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((post) => (
            <div key={post.guid} className="relative transition-transform transform hover:scale-105 group animated-gradient-border rounded-2xl h-full">
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
          ))}
        </div>
      </div>
    </section>
  );
}
