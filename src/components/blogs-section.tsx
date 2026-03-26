
"use client";

import type { MediumPost } from '@/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Rss, Clock, ArrowRight } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface BlogsSectionProps {
  blogs: MediumPost[];
}

const createSnippet = (html: string, length: number = 120) => {
  if (!html) return '';
  const stripped = html.replace(/<[^>]+>/g, '');
  return stripped.length > length ? `${stripped.substring(0, length)}...` : stripped;
};

const estimateReadTime = (html: string) => {
  const words = html.replace(/<[^>]+>/g, '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.65, type: 'spring', bounce: 0.3 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.07, type: 'spring', bounce: 0.4 },
  }),
};

function ReadingBar({ readTime }: { readTime: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
      <Clock className="w-3.5 h-3.5" />
      <span>{readTime} min read</span>
      <div className="blog-reading-bar">
        <motion.div
          className="blog-reading-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(readTime * 15, 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  );
}

function BlogCard({ post, index }: { post: MediumPost; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const readTime = estimateReadTime(post.content || '');

  return (
    <motion.div
      ref={ref}
      className="relative md:grid md:grid-cols-2 md:gap-12 items-start group"
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      {/* Icon Node (desktop) */}
      <div
        className={`hidden md:flex items-center gap-6 ${
          index % 2 === 0 ? 'col-start-1 justify-end' : 'col-start-2 justify-start'
        }`}
      >
        <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-primary/40" />
        <motion.div
          className="relative p-3 rounded-full bg-card border border-primary/30 z-10 shadow-sm"
          whileHover={{ scale: 1.15, rotate: -8 }}
          transition={{ type: 'spring', stiffness: 320, damping: 14 }}
        >
          <span className="exp-pulse-ring" />
          <span className="exp-pulse-ring exp-pulse-ring--delay" />
          <Rss className="w-8 h-8 text-primary" />
        </motion.div>
        <div className="w-6 h-0.5 bg-gradient-to-l from-transparent to-primary/40" />
      </div>

      {/* Card Content */}
      <div
        className={`relative ${
          index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'
        }`}
      >
        <motion.div
          className="exp-card blog-card clip-card relative group flex flex-col h-full p-5 md:p-6 transition-all duration-500 bg-card/50 border border-primary/20 hover:border-primary hover:bg-card hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
          whileHover={{ y: -4, scale: 1.015 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          {/* Shimmer sweep — same as experience cards */}
          <span className="exp-shimmer" />

          {/* Number badge */}
          <motion.span
            className="blog-num-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          >
            0{index + 1}
          </motion.span>

          <div className="mb-4 mt-2">
            <motion.h3
              className="text-lg md:text-xl font-bold h-auto md:h-20 line-clamp-3 group-hover:text-primary transition-colors duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {post.title}
            </motion.h3>
            <motion.p
              className="text-muted-foreground text-sm line-clamp-3 mt-2 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              {createSnippet(post.content)}
            </motion.p>
          </div>

          <div className="flex-grow flex flex-col justify-end">
            <ReadingBar readTime={readTime} />

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial="hidden"
              animate={controls}
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } }, hidden: {} }}
            >
              {post.categories.slice(0, 3).map((tag, tIdx) => (
                <motion.div key={tag} custom={tIdx} variants={tagVariants}>
                  <Badge
                    variant="secondary"
                    className="bg-secondary/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-transparent transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Read More link */}
            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link w-fit"
            >
              Read More
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function BlogsSection({ blogs }: BlogsSectionProps) {
  return (
    <section id="blogs" className="w-full py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Rss className="w-4 h-4 text-primary" />
            <span className="text-sm uppercase tracking-widest text-primary font-medium">Medium</span>
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Blogs</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Sharing my thoughts on technology, development, and AI.
          </p>
        </motion.div>

        <div className="relative space-y-12">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-1/2 hidden md:block w-0.5 h-full bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 transform -translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {blogs.slice(0, 3).map((post, index) => (
            <BlogCard key={post.guid} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
