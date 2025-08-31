
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LandingAnimationProps {
  onComplete: () => void;
}

const textToAnimate = "Ash.Tech";

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [flickerText, setFlickerText] = useState(false);

  useEffect(() => {
    const flickerTimer = setTimeout(() => {
      setFlickerText(true);
    }, textToAnimate.length * 150 + 500);

    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, textToAnimate.length * 150 + 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, textToAnimate.length * 150 + 3000);


    return () => {
      clearTimeout(flickerTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000",
      fadeOut ? 'opacity-0' : 'opacity-100'
    )}>
      <div className="relative font-headline text-4xl md:text-6xl lg:text-8xl text-foreground">
        <h1
          className={cn(
            "relative tracking-widest transition-opacity duration-1000"
          )}
          style={{
            animation: flickerText ? 'text-flicker 1.5s linear' : 'none',
            textShadow: flickerText ? `
              0 0 5px hsl(var(--primary)),
              0 0 10px hsl(var(--primary)),
              0 0 20px hsl(var(--primary)),
              0 0 40px hsl(var(--primary)),
              0 0 80px hsl(var(--primary))
            ` : 'none',
          }}
        >
          {textToAnimate.split('').map((char, index) => (
            <span
              key={index}
              className="animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
