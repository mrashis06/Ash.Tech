'use client';

import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    role: 'Core Member in AI',
    organization: 'GDG on Campus MCKV Institute of Engineering',
    period: 'Sep 2025 – Sep 2026',
    location: 'Howrah, India',
    description:
      'An active member of Google Developer Groups on Campus, driving AI-focused workshops, speaker sessions, and developer events to build a stronger tech community at MCKV Institute of Engineering.',
  },
  {
    role: 'Contributor',
    organization: 'GirlScript Summer of Code 2025',
    period: 'Aug 2025 – Feb 2026',
    location: 'Remote',
    description:
      'Contributed to open-source projects, focusing on AI and Git-based workflows. Collaborated with mentors and fellow contributors to improve code quality and documentation.',
  },
  {
    role: 'Contributor',
    organization: 'Hacktoberfest',
    period: 'Oct 2025 – Jan 2026',
    location: 'Remote',
    description:
      'Super-contributor recognized with a tree gift from Treenation. Contributed to 8 open-source projects by fixing bugs, refining documentation, and implementing new features.',
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-24 md:py-36 bg-background border-t border-border/20 relative overflow-hidden">
      
      {/* Soft Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container px-4 md:px-6 max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase mb-3 block">
            Career & Contributions
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline text-foreground">
            Experience
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mt-3 font-sans">
            Roles, engineering contributions, and communities I&apos;ve built with.
          </p>
        </motion.div>

        {/* Ultra-Spacious Minimal Timeline */}
        <div className="space-y-16 sm:space-y-24">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              className="group border-l-2 border-border/40 hover:border-primary pl-6 sm:pl-10 transition-colors duration-300 py-1"
            >
              <div className="space-y-2.5">
                
                {/* Role Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {exp.role}
                </h3>

                {/* Subtitle Meta Line */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-primary font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    {exp.organization}
                  </span>
                  <span>·</span>
                  <span>{exp.period}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>

                {/* Description Paragraph */}
                <p className="text-muted-foreground text-sm sm:text-base font-sans leading-relaxed max-w-2xl pt-2">
                  {exp.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
