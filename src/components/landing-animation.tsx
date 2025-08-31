"use client";

import { useState, useEffect } from 'react';

interface LandingAnimationProps {
  onComplete: () => void;
}

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500); // Start fade out after 2.5 seconds

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500); // Complete animation after 3.5 seconds

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative font-headline text-4xl md:text-6xl lg:text-8xl text-foreground">
        <h1
          className="relative tracking-widest"
          style={{
            animation: 'text-flicker 3s linear',
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
        <div
          className="absolute -inset-2 rounded-lg border-2 border-primary"
          style={{
            animation: 'border-flicker 2s linear',
            boxShadow: '0 0 10px hsl(var(--primary))',
          }}
        />
      </div>
    </div>
  );
}
