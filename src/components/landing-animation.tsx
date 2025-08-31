
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LandingAnimationProps {
  onComplete: () => void;
}

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [showText, setShowText] = useState(false);
  const [flickerText, setFlickerText] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStartAnimation(true), 100),    // Start border animation
      setTimeout(() => setShowText(true), 1500),         // Start text fade-in
      setTimeout(() => setFlickerText(true), 2500),      // Start text flicker
      setTimeout(() => setFadeOut(true), 4000),          // Start fade out of whole component
      setTimeout(() => onComplete(), 5000),              // Animation complete
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
      <div className="relative font-headline text-4xl md:text-6xl lg:text-8xl text-foreground">
        <h1
          className={cn(
            "relative tracking-widest transition-opacity duration-1000",
            showText ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            animation: flickerText ? 'text-flicker 1.5s linear' : 'none',
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
          <div className={cn(borderBaseClasses, borderTopBottomClasses, "top-0 left-0", startAnimation ? 'w-full' : 'w-0')} style={{ transition: 'width 0.5s linear' }} />
          {/* Right */}
          <div className={cn(borderBaseClasses, borderLeftRightClasses, "top-0 right-0", startAnimation ? 'h-full' : 'h-0')} style={{ transition: 'height 0.5s linear 0.5s' }} />
          {/* Bottom */}
          <div className={cn(borderBaseClasses, borderTopBottomClasses, "bottom-0 right-0 origin-right", startAnimation ? 'w-full' : 'w-0')} style={{ transition: 'width 0.5s linear 1s' }} />
          {/* Left */}
          <div className={cn(borderBaseClasses, borderLeftRightClasses, "bottom-0 left-0 origin-bottom", startAnimation ? 'h-full' : 'h-0')} style={{ transition: 'height 0.5s linear 1.5s' }} />
        </div>
      </div>
    </div>
  );
}
