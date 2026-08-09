
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LandingAnimationProps {
  onComplete: () => void;
}

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Keep the branded intro brief so visitors reach the portfolio immediately.
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 150);

    // Reveal the portfolio in well under one second.
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 450);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const nameChars = "ASHIS KUMAR RAI".split("");

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-800 ease-in-out select-none overflow-hidden",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-primary/15 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      {/* Main Landing Container */}
      <div className="relative flex flex-col items-center justify-center p-6 text-center">
        {/* Animated Signature Logo with Neon Flicker */}
        <div className="relative mb-6">
          {/* Light Mode Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-black.png"
            alt="Signature Logo"
            className="block dark:hidden h-24 md:h-36 lg:h-44 w-auto object-contain animate-logo-flicker"
          />

          {/* Dark Mode Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-white.png"
            alt="Signature Logo"
            className="hidden dark:block h-24 md:h-36 lg:h-44 w-auto object-contain animate-logo-flicker"
          />
        </div>

        {/* Sub-label: ASHIS KUMAR RAI with Bold Font & Neon Accent */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 md:gap-6 mt-2"
        >
          <span className="h-[2px] w-8 md:w-16 bg-gradient-to-r from-transparent via-primary/60 to-primary rounded-full" />
          <div className="flex items-center tracking-[0.3em] font-extrabold text-sm md:text-xl lg:text-2xl text-primary uppercase font-mono">
            {nameChars.map((char, index) => (
              <span
                key={index}
                className="inline-block animate-fade-in opacity-0"
                style={{
                  animationDelay: `${600 + index * 50}ms`,
                  animationFillMode: 'forwards',
                  textShadow: '0 0 10px hsl(var(--primary) / 0.6), 0 0 20px hsl(var(--primary) / 0.3)',
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
          <span className="h-[2px] w-8 md:w-16 bg-gradient-to-l from-transparent via-primary/60 to-primary rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
