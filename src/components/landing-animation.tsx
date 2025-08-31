
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LandingAnimationProps {
  onComplete: () => void;
}

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timers = [
      setTimeout(() => setAnimationStep(1), 0),      // top
      setTimeout(() => setAnimationStep(2), 500),    // right
      setTimeout(() => setAnimationStep(3), 1000),   // bottom
      setTimeout(() => setAnimationStep(4), 1500),   // left & start text fade-in
      setTimeout(() => setAnimationStep(5), 2500),   // text flicker
      setTimeout(() => setFadeOut(true), 4000),      // fade out
      setTimeout(() => onComplete(), 5000),          // complete
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const borderBaseClasses = "absolute bg-primary shadow-[0_0_10px_hsl(var(--primary))]";
  const borderTopBottomClasses = "h-[2px]";
  const borderLeftRightClasses = "w-[2px]";

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000",
      fadeOut ? 'opacity-0' : 'opacity-100'
    )}>
      <div className={cn(
        "relative font-headline text-4xl md:text-6xl lg:text-8xl text-foreground transition-opacity duration-300",
        isMounted ? 'opacity-100' : 'opacity-0'
      )}>
        <h1
          className={cn(
            "relative tracking-widest transition-opacity duration-1000",
            animationStep >= 4 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            animation: animationStep >= 5 ? 'text-flicker 1.5s linear' : 'none',
            textShadow: `
              0 0 5px hsl(var(--primary)),
              0 0 10px hsl(var(--primary)),
              0 0 20px hsl(var(--primary)),
              0 0 40px hsl(var(--primary)),
              0 0 80px hsl(var(--primary))
            `,
          }}
        >
          Ash.Tech
        </h1>
        <div className="absolute -inset-2 rounded-lg">
          {/* Top */}
          <div className={cn(borderBaseClasses, borderTopBottomClasses, "top-0 left-0")} style={{ width: animationStep >= 1 ? '100%' : '0', transition: 'width 0.5s linear' }} />
          {/* Right */}
          <div className={cn(borderBaseClasses, borderLeftRightClasses, "top-0 right-0")} style={{ height: animationStep >= 2 ? '100%' : '0', transition: 'height 0.5s linear' }} />
          {/* Bottom */}
          <div className={cn(borderBaseClasses, borderTopBottomClasses, "bottom-0 right-0 origin-right")} style={{ width: animationStep >= 3 ? '100%' : '0', transition: 'width 0.5s linear' }} />
          {/* Left */}
          <div className={cn(borderBaseClasses, borderLeftRightClasses, "bottom-0 left-0 origin-bottom")} style={{ height: animationStep >= 4 ? '100%' : '0', transition: 'height 0.5s linear' }} />
        </div>
      </div>
    </div>
  );
}
