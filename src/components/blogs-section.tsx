
"use client";

import type { MediumPost } from '@/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Rss } from 'lucide-react';
import { motion } from 'framer-motion';

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
            <motion.div 
              key={post.guid} 
              className="relative md:grid md:grid-cols-2 md:gap-12 items-start group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`hidden md:flex items-center gap-6 ${index % 2 === 0 ? 'col-start-1 justify-end' : 'col-start-2 justify-start'}`}>
                <div className="w-6 h-0.5 bg-primary/20"></div>
                <div 
                  className="relative p-3 rounded-full bg-card border border-primary/30 z-10"
                >
                   <Rss className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="w-6 h-0.5 bg-primary/20"></div>
              </div>

              <div 
                className={`relative ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}
              >
                <div className="clip-card relative group flex flex-col h-full p-5 md:p-6 transition-all duration-300 bg-card/50 border border-primary/20 hover:border-primary hover:bg-card hover:shadow-md hover:shadow-primary/10">
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold h-auto md:h-20 line-clamp-3 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm h-auto md:h-24 line-clamp-4 mt-2">{createSnippet(post.content)}</p>
                  </div>
                  <div className="flex-grow flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/50">{tag}</Badge>
                      ))}
                    </div>
                    <div>
                      <Link href={post.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                        Read More
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
