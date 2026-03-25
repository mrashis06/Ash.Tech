'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface ExperienceItem {
  role: string;
  organization: string;
  type: string; // e.g. "Full-time", "Part-time", "Internship"
  period: string;
  location: string;
  description: string;
  skills: string[];
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
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="mb-12 md:mb-16">
        <p className="text-sm uppercase tracking-widest text-primary mb-2 font-medium">Career</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experience</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Roles, contributions, and communities I&apos;ve been part of.
        </p>
      </div>

      <div className="relative space-y-16 md:space-y-0">
        {/* Desktop: vertical divider line */}
        <div className="absolute hidden md:block left-1/2 w-[2px] h-full bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 transform -translate-x-1/2" />

        {/* Mobile: left rail */}
        <div className="absolute md:hidden left-[23px] w-[2px] h-full bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-center group md:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.35, delay: index * 0.08 }}
          >
            {/* Icon Node — left rail on mobile, centred on desktop */}
            <div
              className={`absolute left-0 top-0 md:relative flex items-center md:gap-6 z-10 ${index % 2 === 0
                  ? 'md:col-start-1 md:justify-end'
                  : 'md:col-start-2 md:justify-start'
                }`}
            >
              <div className="hidden md:block w-6 h-0.5 bg-primary/20" />
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-background border-2 border-primary/40 group-hover:border-primary transition-colors shadow-sm">
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20" />
                <div className="relative z-10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="hidden md:block w-6 h-0.5 bg-primary/20" />
            </div>

            {/* Content */}
            <div
              className={`w-full pl-16 md:pl-0 ${index % 2 === 0
                  ? 'md:col-start-2'
                  : 'md:col-start-1 md:row-start-1'
                }`}
            >
              <div className="relative w-full py-1 md:p-6 bg-transparent md:bg-card/50 md:clip-card transition-all duration-300 md:border md:border-primary/20 md:hover:border-primary md:hover:bg-card md:hover:shadow-md md:hover:shadow-primary/10">
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

                {/* Skills */}
                {exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-3 py-1 rounded-full border border-primary/20 text-muted-foreground bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
