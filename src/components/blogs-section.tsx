"use client";

import type { MediumPost } from '@/types';
import Link from 'next/link';
import { Rss, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogsSectionProps {
  blogs: MediumPost[];
}

const createSnippet = (html: string, length: number = 140) => {
  if (!html) return '';
  const stripped = html.replace(/<[^>]+>/g, '');
  return stripped.length > length ? `${stripped.substring(0, length)}...` : stripped;
};

const estimateReadTime = (html: string) => {
  const words = html.replace(/<[^>]+>/g, '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export function BlogsSection({ blogs }: BlogsSectionProps) {
  const displayBlogs = blogs.slice(0, 4);

  return (
    <section id="blogs" className="w-full py-20 md:py-32 bg-background border-t border-border/30 relative">

      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-semibold tracking-widest text-primary uppercase mb-3 shadow-[0_0_12px_hsl(var(--primary)/0.15)]">
            <Rss className="w-3.5 h-3.5 text-primary" />
            <span>Medium Insights</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-headline text-foreground">
            Featured Articles
          </h2>
          
          <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto mt-2 font-sans">
            Engineering thoughts on fintech, artificial intelligence, and software architecture.
          </p>
        </motion.div>

        {/* High-End Balanced 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {displayBlogs.map((post, index) => {
            const readTime = estimateReadTime(post.content || '');

            return (
              <motion.div
                key={post.guid || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group flex"
              >
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-card/80 to-card/40 border border-border/40 hover:border-primary/40 transition-all duration-300 backdrop-blur-xl shadow-sm hover:shadow-xl space-y-6"
                >
                  <div className="space-y-4">
                    {/* Top Meta Header */}
                    <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/60 border border-border/40">
                        <Clock className="w-3 h-3 text-primary" />
                        <span>{readTime} min read</span>
                      </div>

                      {post.categories && post.categories.length > 0 && (
                        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                          #{post.categories[0]}
                        </span>
                      )}
                    </div>

                    {/* Headline Title */}
                    <h3 className="text-xl sm:text-2xl font-bold font-headline tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed line-clamp-3">
                      {createSnippet(post.content)}
                    </p>
                  </div>

                  {/* Read Article CTA */}
                  <div className="pt-4 border-t border-border/30 flex items-center justify-between text-xs sm:text-sm font-bold font-headline text-foreground group-hover:text-primary transition-colors">
                    <span>Read Article</span>
                    <div className="p-2 rounded-xl bg-secondary/80 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
