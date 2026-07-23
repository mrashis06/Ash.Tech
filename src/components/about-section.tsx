"use client";

import Image from 'next/image';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Code2, Rocket, GitBranch } from 'lucide-react';

/* ─── animated counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 20, damping: 25 });

  useEffect(() => { if (inView) raw.set(target); }, [inView, raw, target]);
  useEffect(() => spring.on('change', (v) => {
    if (ref.current) ref.current.textContent = Math.round(v) + suffix;
  }), [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { icon: GitBranch, label: 'GitHub Repos', value: 20, suffix: '+' },
  { icon: Code2, label: 'Open Source PRs', value: 8, suffix: '+' },
  { icon: Rocket, label: 'Hackathons', value: 3, suffix: '+' },
];

export function AboutSection() {
  return (
    <section id="about" className="w-full py-16 md:py-28 overflow-hidden bg-background border-t border-border/30">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">

        {/* ── Mobile Header ── */}
        <motion.div
          className="text-center mb-10 lg:hidden"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase font-mono tracking-widest text-primary font-semibold mb-2 block">
            Who I Am
          </span>
          <h2 className="text-3xl font-bold tracking-tight font-headline text-foreground">
            About Me
          </h2>
        </motion.div>

        {/* ── Main Editorial Grid ── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-20">

          {/* ══ LEFT: Cinematic Profile Image ══ */}
          <motion.div
            className="flex-shrink-0 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative group p-4">
              {/* Outer Subtle Frame */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />

              {/* Photo Frame */}
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-card shadow-2xl"
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <div className="w-[260px] h-[340px] sm:w-[310px] sm:h-[410px] lg:w-[350px] lg:h-[465px] relative">
                  <Image
                    src="/profile-new.jpeg"
                    alt="Ashis Kumar Rai"
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 310px, 350px"
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    priority
                  />
                  {/* Glass foil shimmer sweep */}
                  <div className="absolute inset-0 pointer-events-none z-10 opacity-25 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ══ RIGHT: Editorial Typography & Clean Stat Counters ══ */}
          <div className="flex-1 flex flex-col justify-center space-y-6 min-w-0 text-left">

            {/* Giant Editorial Headline */}
            <div className="space-y-1">
              <motion.h2
                className="about-big-word text-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                AI & ML
              </motion.h2>

              <motion.p
                className="about-highlight-word text-primary"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Full Stack Developer
              </motion.p>

              <motion.h2
                className="about-big-word text-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                ENGINEER
              </motion.h2>
            </div>

            {/* Bio Paragraph */}
            <motion.p
              className="text-muted-foreground text-sm sm:text-base md:text-lg font-sans leading-relaxed pt-2 max-w-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Specializing in building high-performance web applications, intelligent AI models, and scalable open-source software solutions.
            </motion.p>

            {/* Hairline Divider & Minimalist Stat Counters Row */}
            <motion.div
              className="pt-6 border-t border-border/30 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex items-center gap-2 text-primary text-2xl sm:text-3xl md:text-4xl font-extrabold font-headline">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs sm:text-sm font-mono text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
