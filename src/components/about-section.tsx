"use client";

import Image from 'next/image';
import { motion, useAnimation, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Code2, Brain, Rocket, GitBranch } from 'lucide-react';

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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-24 xl:gap-32">

          {/* ══ LEFT: Framed Image ══ */}
          <motion.div
            className="flex-shrink-0 flex justify-center lg:justify-start lg:pl-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, type: 'spring', bounce: 0.22 }}
          >
            {/* Safe bounding container */}
            <div className="relative flex justify-center items-center group p-4 sm:p-8">
              
              {/* UNIQUE IDEA: Ambient Photographic Light Reflection (Apple UI Style)
                  Instead of a fake CSS color glow, we use a deeply blurred duplicate of your exact 
                  photograph to cast a perfectly color-matched, highly premium ambient shadow. */}
              <motion.div 
                className="absolute inset-0 z-0 flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
                animate={{ 
                  scale: [0.95, 1.05, 0.95],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-[200px] h-[260px] sm:w-[260px] sm:h-[340px] lg:w-[310px] lg:h-[400px] rounded-full blur-[40px] border-none overflow-hidden">
                  <Image
                    src="/profile-new.jpeg"
                    alt="Ashis Reflection"
                    width={480}
                    height={580}
                    className="w-full h-full object-cover object-top opacity-80 grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700 ease-in-out"
                  />
                </div>
              </motion.div>

              {/* Top Layer: The Flawless Core Image Carrier */}
              <motion.div
                className="relative overflow-hidden rounded-[1.8rem] bg-card z-10 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <div className="w-[250px] h-[320px] sm:w-[310px] sm:h-[400px] lg:w-[360px] lg:h-[460px] relative">
                  <Image
                    src="/profile-new.jpeg"
                    alt="Ashis Kumar Rai"
                    fill
                    sizes="(max-width: 640px) 250px, (max-width: 1024px) 310px, 360px"
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700 ease-in-out"
                    data-ai-hint="professional portrait"
                    priority
                  />
                  
                  {/* The Unique Animated Luxury Glass Foil Sweep */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-20 opacity-30 group-hover:opacity-60 transition-opacity duration-700" 
                    style={{
                      backgroundImage: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.03) 55%, transparent 65%)',
                      backgroundSize: '250% 100%',
                      animation: 'glass-shimmer-diagonal 5s linear infinite'
                    }}
                  />
                  
                  {/* Sleek Inner Shadow Reflection for 3D depth */}
                  <div className="absolute inset-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1px_3px_rgba(0,0,0,0.4)] pointer-events-none" />
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* ══ RIGHT: Editorial text ══ */}
          <div className="flex-1 flex flex-col justify-center space-y-6 lg:space-y-8 min-w-0 lg:pl-10 xl:pl-16 items-center text-center lg:items-end lg:text-right">

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

            {/* Shared Master Wrapper: Physically locks the left-edge of the text directly underneath the 'E' by dynamically calculating the box width from the ENGINEER text! */}
            <div className="flex flex-col items-center lg:items-start w-fit">
              
              {/* Giant editorial headline */}
              <div className="space-y-0 leading-none text-center lg:text-right w-full">
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

              {/* Bio — rigidly anchored to the exact calculated left boundary of the headlines! */}
              <div className="w-full max-w-[480px] lg:max-w-none pt-4 lg:pt-6">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-center lg:text-left">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-10px' }}
                      transition={{ duration: 0.35, delay: i * 0.015 }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </p>
              </div>
            </div>


            {/* Stats row */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 w-full lg:w-[110%] xl:w-[120%] lg:-ml-[10%] xl:-ml-[20%]"
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
                    className="exp-card relative flex flex-col items-center justify-center gap-1.5 py-4 px-2 sm:py-5 sm:px-4 rounded-xl bg-card border border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden group cursor-default shadow-lg shadow-black/20"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.5, type: 'spring', bounce: 0.3 }}
                    whileHover={{ y: -3 }}
                  >
                    <span className="exp-shimmer opacity-40 group-hover:opacity-100" />
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary relative z-10 mb-1" />
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-foreground relative z-10">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground text-center leading-snug relative z-10">{stat.label}</span>
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
