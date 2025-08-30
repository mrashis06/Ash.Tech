import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Getting Started with Next.js and Genkit',
    description: 'A comprehensive guide to building AI-powered applications using the latest web technologies.',
    tags: ['Next.js', 'Genkit', 'AI'],
    link: '#',
  },
  {
    title: 'The Rise of Large Language Models',
    description: 'Exploring the impact of LLMs on software development and future trends.',
    tags: ['LLM', 'AI', 'Tech'],
    link: '#',
  },
  {
    title: 'A Deep Dive into React Server Components',
    description: 'Understand the power of Server Components and how they are changing the React ecosystem.',
    tags: ['React', 'Next.js', 'WebDev'],
    link: '#',
  },
];

export function BlogsSection() {
  return (
    <section id="blogs" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Blogs</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Sharing my thoughts on technology, development, and AI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col h-full hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                 <Link href={post.link} className="text-sm font-medium text-primary hover:underline">
                  Read More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
