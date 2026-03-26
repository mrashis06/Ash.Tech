
'use client';

import { Trophy, Zap, Code, Cloud, BrainCircuit, ExternalLink, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const achievements = [
  {
    icon: Trophy,
    gradient: 'from-yellow-400/20 to-amber-500/10',
    glow: 'rgba(251,191,36,0.3)',
    title: 'Nurturing Innovation Challenge 3.0',
    description: 'Selected among Top 29 finalists for SmartSetu, a fintech platform that leverages AI and alternative data to assess creditworthiness of street vendors, promoting financial inclusion.',
    tags: ['Fintech', 'AI', 'Top 29'],
  },
  {
    icon: Code,
    gradient: 'from-blue-400/20 to-cyan-500/10',
    glow: 'rgba(96,165,250,0.3)',
    title: 'Adobe India Hackathon',
    description: 'Participated in a national-level hackathon by Adobe, working on innovative AI-driven solutions.',
    link: 'https://drive.google.com/file/d/1oFyeaTxsdiEUDdyae1nXtV-d2G2f-vhM/view?usp=drive_link',
    tags: ['Hackathon', 'AI', 'National'],
  },
  {
    icon: Zap,
    gradient: 'from-violet-400/20 to-purple-500/10',
    glow: 'rgba(167,139,250,0.3)',
    title: 'National Coding League 2.0',
    description: 'Achieved the position of regional qualifier in a competitive national coding league.',
    link: 'https://drive.google.com/file/d/1Tfsksw1_OSRfxuZXDO2h3FdqtN2xuR8K/view?usp=drivesdk',
    tags: ['Competitive', 'Regional Qualifier'],
  },
  {
    icon: Cloud,
    gradient: 'from-sky-400/20 to-blue-500/10',
    glow: 'rgba(56,189,248,0.3)',
    title: 'Google Cloud Arcade Facilitator',
    description: 'Hands-on experience in Compute Engine, BigQuery, Cloud Functions for scalable cloud solutions.',
    link: 'https://drive.google.com/file/d/1SxkglvcgfX3ZJJZMkC9Ud3TxMLEqMkTi/view?usp=drivesdk',
    tags: ['GCP', 'BigQuery', 'Cloud Functions'],
  },
  {
    icon: BrainCircuit,
    gradient: 'from-pink-400/20 to-rose-500/10',
    glow: 'rgba(244,114,182,0.3)',
    title: 'Machine Learning',
    description: 'Advanced concepts in mathematics for ML, predictive modeling, and feature engineering.',
    link: 'https://drive.google.com/file/d/1yjUMsknw_BuhKVTVPAfdV2RyVlLPLDjB/view?usp=drivesdk',
    tags: ['ML', 'Predictive Modeling', 'Mathematics'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.65, type: 'spring', bounce: 0.32 },
  },
};

const skillVariants = {
  hidden: { opacity: 0, x: -12, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.06, type: 'spring', bounce: 0.4 },
  }),
};

const iconVariants = {
  hidden: { scale: 0.4, opacity: 0, rotate: -20 },
  visible: { scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 220, damping: 14 } },
};



function AchievementCard({ a, index }: { a: typeof achievements[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

  const Icon = a.icon;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col md:grid md:grid-cols-2 md:gap-12 items-start md:items-center group"
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      {/* Icon Node */}
      <div
        className={`absolute left-0 top-0 md:relative flex items-center md:gap-6 z-10 ${
          index % 2 === 0 ? 'md:col-start-1 md:justify-end' : 'md:col-start-2 md:justify-start'
        }`}
      >
        <div className="hidden md:block w-6 h-0.5 bg-gradient-to-r from-transparent to-primary/40" />
        <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-background border-2 border-primary/40 group-hover:border-primary transition-all duration-500 shadow-sm">
          <span className="exp-pulse-ring" />
          <span className="exp-pulse-ring exp-pulse-ring--delay" />
          <motion.div className="relative z-10 w-6 h-6 flex items-center justify-center" variants={iconVariants}>
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>
        </div>
        <div className="hidden md:block w-6 h-0.5 bg-gradient-to-l from-transparent to-primary/40" />
      </div>

      {/* Content Block */}
      <div
        className={`w-full pl-16 md:pl-0 min-h-[48px] flex flex-col md:block overflow-visible ${
          index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'
        }`}
      >
        <div
          className="exp-card relative group w-full py-1 md:p-6 md:clip-card transition-all duration-500 bg-transparent md:bg-card/50 md:border md:border-primary/20 md:hover:border-primary md:hover:bg-card md:hover:shadow-xl md:hover:shadow-primary/10 overflow-hidden"
        >
          {/* Shimmer sweep — same as all other cards */}
          <span className="exp-shimmer" />

          <motion.h3
            className="text-xl md:text-2xl font-bold tracking-tight text-primary md:text-foreground md:group-hover:text-primary transition-colors mb-3 md:mb-4"
            initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {a.title}
          </motion.h3>
          <motion.p
            className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {a.description}
          </motion.p>

          {/* Staggered tag pop-in — same as experience skills */}
          {a.tags && a.tags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial="hidden"
              animate={controls}
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } }, hidden: {} }}
            >
              {a.tags.map((tag, tIdx) => (
                <motion.span
                  key={tIdx}
                  custom={tIdx}
                  variants={skillVariants}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-primary/30 text-muted-foreground bg-primary/5 hover:bg-primary/20 hover:text-primary hover:border-primary hover:scale-105 transition-all duration-200 cursor-default"
                >
                  <Sparkles className="w-2.5 h-2.5 opacity-60" />
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}

          {a.link && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Link
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 transition-colors group/link"
              >
                View Details{' '}
                <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="w-full py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
          >
            <Star className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-sm uppercase tracking-widest text-primary font-medium">Honours</span>
            <Star className="w-5 h-5 text-primary animate-spin-slow-reverse" />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Achievements
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4 md:mt-6">
            A few of my proudest accomplishments and experiences.
          </p>
        </motion.div>

        <div className="relative space-y-16 md:space-y-12">
          {/* Timeline line */}
          <motion.div
            className="absolute left-[23px] md:left-1/2 w-[2px] h-full bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 transform md:-translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
          />

          {achievements.map((a, index) => (
            <AchievementCard key={index} a={a} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
