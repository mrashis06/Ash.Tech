"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Code2, Brain, Rocket, GitBranch, Mail, ArrowRight } from 'lucide-react';

/* ─── animated counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 18 });

  useEffect(() => { if (inView) raw.set(target); }, [inView, raw, target]);
  useEffect(() => spring.on('change', (v) => {
    if (ref.current) ref.current.textContent = Math.round(v) + suffix;
  }), [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { icon: GitBranch, label: 'GitHub Projects', value: 20, suffix: '+' },
  { icon: Code2, label: 'Open Source PRs', value: 8, suffix: '+' },
  { icon: Rocket, label: 'Hackathons', value: 3, suffix: '+' },
];

/* word stagger */
const bio = "A dedicated, results-driven developer with a strong passion for Artificial Intelligence and Machine Learning. I enjoy building scalable, efficient applications and am constantly exploring new technologies to push the boundaries of what's possible.";

export function AboutSection() {
  const words = bio.split(' ');

  return (
    <section id="about" className="w-full py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">

        {/* ── Mobile header (hidden on lg) ── */}
        <motion.div
          className="text-center mb-10 lg:hidden"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-2">Who I Am</p>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">About Me</h2>
        </motion.div>

        {/* ── Main editorial grid ── */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 xl:gap-24">

          {/* ══ LEFT: Framed Image ══ */}
          <motion.div
            className="flex-shrink-0 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, type: 'spring', bounce: 0.22 }}
          >
            <div className="about-frame-wrapper flex justify-center items-center">
              {/* decorative offset border — top-right */}
              <span className="about-deco-border" />
              {/* decorative offset border — bottom-left */}
              <span className="about-deco-border about-deco-border--alt" />

              {/* rotating orbit line */}
              <span className="about-orbit-line" />

              {/* image */}
              <motion.div
                className="about-img-rect relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <motion.div
                  className="w-full h-full"
                  initial={{ filter: 'grayscale(1)' }}
                  whileInView={{ filter: 'grayscale(0.15)' }}
                  viewport={{ once: false, margin: '-60px' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <Image
                    src="/profile-new.jpeg"
                    alt="Ashis Kumar Rai"
                    width={480}
                    height={580}
                    className="w-full h-full object-cover object-top"
                    data-ai-hint="professional portrait"
                  />
                </motion.div>
                {/* shimmer on hover */}
                <span className="exp-shimmer" style={{ borderRadius: 0 }} />
              </motion.div>
            </div>
          </motion.div>

          {/* ══ RIGHT: Editorial text ══ */}
          <div className="flex-1 flex flex-col justify-center space-y-6 lg:space-y-8">

            {/* greeting */}
            <motion.p
              className="text-sm md:text-base text-muted-foreground font-medium tracking-wide uppercase"
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              I am an
            </motion.p>

            {/* Giant editorial headline */}
            <div className="space-y-0 leading-none">
              {/* line 1 — big uppercase */}
              <motion.h2
                className="about-big-word text-foreground whitespace-normal"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.05, type: 'spring', bounce: 0.25 }}
              >
                AI & ML
              </motion.h2>

              {/* line 2 — italic primary highlight */}
              <motion.p
                className="about-highlight-word whitespace-normal"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15, type: 'spring', bounce: 0.25 }}
              >
                Full Stack Developer
              </motion.p>

              {/* line 3 — big uppercase */}
              <motion.h2
                className="about-big-word text-foreground"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.25, type: 'spring', bounce: 0.25 }}
              >
                ENGINEER
              </motion.h2>
            </div>



            {/* Bio — word stagger */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.25, delay: i * 0.01 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.45 }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  <Mail className="w-4 h-4" />
                  Get in touch
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}>
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/30 text-foreground font-semibold text-sm hover:border-primary hover:bg-primary/5 transition-all"
                >
                  Know more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="exp-card relative flex flex-col items-center gap-1 p-3 rounded-xl bg-card/50 border border-primary/15 hover:border-primary/40 hover:bg-card transition-all duration-300 overflow-hidden group cursor-default"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.5, type: 'spring', bounce: 0.3 }}
                    whileHover={{ y: -3 }}
                  >
                    <span className="exp-shimmer" />
                    <Icon className="w-4 h-4 text-primary relative z-10" />
                    <span className="text-xl font-bold text-primary relative z-10">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-[10px] text-muted-foreground text-center leading-tight relative z-10">{stat.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
