
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, Layers, Server } from 'lucide-react';

const programmingLanguages = [
  { name: 'C',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'Java',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
];

const frontendSkills = [
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'React',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
];

const backendSkills = [
  { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
  { name: 'MongoDB',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Node.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'SQL',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' },
];

const skillCategories = [
  { title: 'Programming Languages', Icon: Code2,  skills: programmingLanguages },
  { title: 'Frontend',              Icon: Layers,  skills: frontendSkills },
  { title: 'Backend & Cloud',       Icon: Server,  skills: backendSkills },
];

/* ─── Classic Minimal Skill Card ─── */
function SkillCard({ name, icon, index }: { name: string; icon: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col items-center justify-center gap-2.5 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-md shadow-sm hover:border-primary/40 hover:bg-card/90 hover:shadow-md transition-all duration-200 min-w-[110px] sm:min-w-[125px] md:min-w-[135px] max-w-[170px] flex-1 sm:flex-none cursor-pointer"
    >
      {/* Icon */}
      <div className="relative flex items-center justify-center">
        <Image
          src={icon}
          alt={name}
          width={40}
          height={40}
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* Skill Name */}
      <span className="text-xs sm:text-sm font-semibold text-center text-foreground/90 group-hover:text-primary transition-colors duration-200 whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

/* ─── Category Block ─── */
function SkillCategory({ title, Icon, skills, catIdx }: {
  title: string; Icon: React.ElementType; skills: typeof programmingLanguages; catIdx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: catIdx * 0.1, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Category Header */}
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-border/50" />
        <div className="flex items-center gap-2 text-foreground font-headline">
          <Icon className="w-4 h-4 text-primary" />
          <h3 className="text-base sm:text-lg font-bold">{title}</h3>
        </div>
        <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-border/50" />
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center items-center gap-3.5 sm:gap-4 md:gap-5">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} name={skill.name} icon={skill.icon} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="w-full py-16 md:py-24 bg-background border-t border-border/40">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs font-mono tracking-widest text-primary uppercase mb-2 font-medium">
            Tech Stack
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline text-foreground">
            My Skills
          </h2>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12 sm:space-y-16">
          {skillCategories.map((cat, catIdx) => (
            <SkillCategory
              key={cat.title}
              title={cat.title}
              Icon={cat.Icon}
              skills={cat.skills}
              catIdx={catIdx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
