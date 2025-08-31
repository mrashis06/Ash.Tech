"use client";

import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">About Me</h2>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex justify-center items-center">
             <Image
              src="/profile.jpg"
              alt="Ashis Kumar Rai"
              width={400}
              height={400}
              className="rounded-full object-cover shadow-lg"
              data-ai-hint="professional portrait"
              onError={(e) => {
                e.currentTarget.src = 'https://picsum.photos/400/400';
                e.currentTarget.onerror = null; // prevent infinite loop if placeholder fails
              }}
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <p className="text-muted-foreground text-lg">
              I am a dedicated and results-driven developer with a strong passion for Artificial Intelligence and Machine Learning. With extensive experience in full-stack development, I enjoy building scalable, efficient, and user-friendly applications. My journey in tech is fueled by a desire to innovate and solve complex problems. I am constantly learning and exploring new technologies to push the boundaries of what's possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
