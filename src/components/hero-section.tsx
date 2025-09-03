
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  animated?: boolean;
}

export function HeroSection({ animated = false }: HeroSectionProps) {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center">
      <div className="container px-4 md:px-6 flex justify-center">
        <div className="flex flex-col items-start space-y-4 max-w-2xl">
          <p className={cn(
            "text-lg font-code text-primary opacity-0",
            animated && "animate-fade-in"
          )} style={{ animationDelay: '1s' }}>
            Hi, my name is
          </p>
          <h1 className={cn(
            "text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline opacity-0",
            animated && "animate-fade-in"
          )} style={{ animationDelay: '1.1s' }}>
            Ashis Kumar Rai
          </h1>
          <p className={cn(
            "max-w-[700px] text-primary text-xl md:text-2xl font-semibold opacity-0",
            animated && "animate-fade-in"
          )} style={{ animationDelay: '1.2s' }}>
            AI/ML & MLOps Enthusiast | Full Stack Developer | DevOps Practitioner
          </p>
          <p className={cn(
            "max-w-[700px] text-muted-foreground md:text-xl opacity-0",
            animated && "animate-fade-in"
          )} style={{ animationDelay: '1.3s' }}>
            Passionate about creating smart solutions, automating workflows, and deploying AI-driven applications efficiently
          </p>
        </div>
      </div>
    </section>
  );
}
