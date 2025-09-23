
import { cn } from '@/lib/utils';
import { TypingAnimation } from './typing-animation';

interface HeroSectionProps {
  animated?: boolean;
}

const roles = [
  "AI/ML Enthusiast",
  "MLOps Enthusiast",
  "Full Stack Developer",
  "DevOps Practitioner",
];

export function HeroSection({ animated = false }: HeroSectionProps) {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
          <p className={cn(
            "text-lg font-code text-primary opacity-0",
            animated && "animate-fade-in"
          )} style={{ animationDelay: '0.5s' }}>
            Hi, my name is
          </p>
          <h1 className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter font-headline opacity-0 text-center",
            animated && "animate-fade-in"
          )} style={{ animationDelay: '0.7s' }}>
            Ashis Kumar Rai
          </h1>
          <div className={cn("h-10 md:h-12 opacity-0", animated && "animate-fade-in")} style={{ animationDelay: '0.9s' }}>
            <TypingAnimation
              texts={roles}
              className="text-primary text-lg md:text-2xl font-semibold text-center"
              startDelay={1400} // Delay in ms (1.1s + 0.3s fade-in)
            />
          </div>
          <p className={cn(
            "max-w-[700px] text-muted-foreground text-base md:text-xl opacity-0 text-center",
            animated && "animate-fade-in"
          )} style={{ animationDelay: '1.1s' }}>
            Passionate about creating smart solutions, automating workflows, and deploying AI-driven applications efficiently
          </p>
        </div>
      </div>
    </section>
  );
}
