'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ExperienceItem {
  role: string;
  organization: string;
  type: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  accent: string;
}

const experiences: ExperienceItem[] = [
  {
    role: 'Core Member in AI',
    organization: 'GDG on Campus MCKV Institute of Engineering',
    type: 'Full-time · On-site',
    period: 'Sep 2025 – Present',
    location: 'Howrah, India',
    description:
      'An active member of Google Developer Groups on Campus, driving AI-focused workshops, speaker sessions, and developer events to build a stronger tech community at MCKV Institute of Engineering.',
    skills: ['Artificial Intelligence', 'Community Building', 'Event Management'],
    accent: 'hsl(180 100% 40%)',
  },
  {
    role: 'Contributor',
    organization: 'GirlScript Summer of Code 2025',
    type: 'Open Source Internship · Part-time',
    period: 'Aug 2025 – Feb 2026 · 7 mos',
    location: 'Remote',
    description:
      'Contributed to open-source projects, focusing on AI and Git-based workflows. Collaborated with mentors and fellow contributors to improve code quality and documentation.',
    skills: ['Open-Source Development', 'Git', 'GitHub', 'Artificial Intelligence (AI)'],
    accent: 'hsl(180 100% 40%)',
  },
  {
    role: 'Contributor',
    organization: 'Hacktoberfest',
    type: 'Part-time',
    period: 'Oct 2025 – Jan 2026 · 4 mos',
    location: 'Remote',
    description:
      'Became a Super-contributor and has been gifted a tree from Treenation. Contributed to 8 open source projects, fixing bugs, improving documentation, and adding features.',
    skills: ['Open-Source Development', 'GitHub', 'Collaboration'],
    accent: 'hsl(180 100% 40%)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, type: 'spring', bounce: 0.35 },
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

function NodePulse() {
  return (
    <span className="absolute inset-0 rounded-full">
      <span className="exp-pulse-ring" />
      <span className="exp-pulse-ring exp-pulse-ring--delay" />
    </span>
  );
}

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');}, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-center group md:mb-16"
      variants={itemVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Icon Node */}
      <div
        className={`absolute left-0 top-0 md:relative flex items-center md:gap-6 z-10 ${
          index % 2 === 0 ? 'md:col-start-1 md:justify-end' : 'md:col-start-2 md:justify-start'
        }`}
      >
        <div className="hidden md:block w-6 h-0.5 bg-gradient-to-r from-transparent to-primary/40" />
        <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-background border-2 border-primary/40 group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-primary/30 group-hover:shadow-lg">
          <NodePulse />
          <Briefcase className="relative z-10 w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="hidden md:block w-6 h-0.5 bg-gradient-to-l from-transparent to-primary/40" />
      </div>

      {/* Content */}
      <motion.div
        className={`w-full pl-16 md:pl-0 ${
          index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'
        }`}
        variants={itemVariants}
      >
        <div className="exp-card relative w-full py-1 md:p-6 bg-transparent md:bg-card/50 md:clip-card transition-all duration-500 md:border md:border-primary/20 md:hover:border-primary md:hover:bg-card md:hover:shadow-xl md:hover:shadow-primary/10 overflow-hidden">
          {/* Shimmer effect */}
          <span className="exp-shimmer" />

          {/* Role */}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-primary md:text-foreground md:group-hover:text-primary transition-colors mb-1">
            {exp.role}
          </h3>

          {/* Org & type */}
          <p className="text-sm font-medium text-foreground/80 mb-1">
            {exp.organization} · {exp.type}
          </p>

          {/* Period + Location */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {exp.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {exp.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
            {exp.description}
          </p>

          {/* Skills with stagger */}
          {exp.skills.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate={controls}
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } }, hidden: {} }}
            >
              {exp.skills.map((skill, sIdx) => (
                <motion.span
                  key={sIdx}
                  custom={sIdx}
                  variants={skillVariants}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-primary/30 text-muted-foreground bg-primary/5 hover:bg-primary/20 hover:text-primary hover:border-primary hover:scale-105 transition-all duration-200 cursor-default"
                >
                  <Sparkles className="w-2.5 h-2.5 opacity-60" />
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 overflow-hidden">
      {/* Section Header */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.p
          className="text-sm uppercase tracking-widest text-primary mb-2 font-medium"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Career
        </motion.p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experience</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Roles, contributions, and communities I&apos;ve been part of.
        </p>
      </motion.div>

      <motion.div
        className="relative space-y-16 md:space-y-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Desktop: vertical timeline line with animated fill */}
        <motion.div
          className="absolute hidden md:block left-1/2 w-[2px] h-full bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 transform -translate-x-1/2"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Mobile: left rail */}
        <motion.div
          className="absolute md:hidden left-[23px] w-[2px] h-full bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {experiences.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
