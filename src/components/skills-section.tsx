
'use client';

import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Code2, Layers, Server } from 'lucide-react';

const programmingLanguages = [
  { name: 'C',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'Java',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
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

/* ─── variants ─── */
const categoryVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.88, rotate: -3 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.45, delay: i * 0.08, type: 'spring', bounce: 0.38 },
  }),
};

/* ─── skill card ─── */
function SkillCard({ name, icon, index }: { name: string; icon: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-40px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className="relative group animated-gradient-border rounded-2xl w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
      style={{ animationDelay: `${index * 0.12}s` }}
      whileHover={{ y: -6, scale: 1.07 }}
      transition={{ type: 'spring', stiffness: 280, damping: 16 }}
    >
      {/* inner card */}
      <div className="skill-inner flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-card h-full overflow-hidden">
        {/* shimmer sweep */}
        <span className="exp-shimmer" />

        {/* icon — greyscale fades to colour on inView */}
        <motion.div
          initial={{ filter: 'grayscale(1)', opacity: 0.5 }}
          animate={inView ? { filter: 'grayscale(0)', opacity: 1 } : { filter: 'grayscale(1)', opacity: 0.5 }}
          transition={{ duration: 0.55, delay: index * 0.06 }}
          className="relative z-10"
        >
          <Image
            src={icon}
            alt={name}
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)] transition-all duration-300"
          />
        </motion.div>

        <span className="relative z-10 text-[11px] sm:text-sm font-medium text-center group-hover:text-primary transition-colors duration-300">
          {name}
        </span>

        {/* bottom glow on hover */}
        <span className="skill-glow" />
      </div>
    </motion.div>
  );
}

/* ─── category block ─── */
function SkillCategory({ title, Icon, skills, catIdx }: {
  title: string; Icon: React.ElementType; skills: typeof programmingLanguages; catIdx: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      variants={categoryVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: catIdx * 0.12 }}
    >
      {/* category header */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.45, delay: catIdx * 0.1 + 0.1 }}
      >
        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/30" />
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        </div>
        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/30" />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} name={skill.name} icon={skill.icon} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">

        {/* Section header */}
        <motion.div
          className="text-center mb-14"
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
            Tech Stack
          </motion.p>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            My Skills
          </h2>
        </motion.div>

        {/* categories */}
        <div className="space-y-16">
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
