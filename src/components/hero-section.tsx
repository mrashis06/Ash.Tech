import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section id="hero" className="w-full py-24 md:py-32 lg:py-48">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Ashis Kumar Rai
          </h1>
          <p className="max-w-[700px] mx-auto text-primary text-xl md:text-2xl font-semibold">
            AI/ML Enthusiast | Full Stack Developer | Innovator
          </p>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Passionate about creating smart solutions, automating workflows, and deploying AI-driven applications efficiently
          </p>
        </div>
      </div>
    </section>
  );
}
