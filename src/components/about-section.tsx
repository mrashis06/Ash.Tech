import Image from 'next/image';
import { SkillProgressBar } from './skill-progress-bar';
import { GCPLogo, CLogo, JavaLogo, JSLogo, MongoDBLogo, NextJSLogo, NodeJSLogo, PythonLogo, ReactLogo, SQLLogo, TSLogo } from './skill-icons';

const skills = [
  { name: 'Python', level: 90, icon: <PythonLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#3776AB]" /> },
  { name: 'JavaScript / TypeScript', level: 85, icon: <div className="flex gap-2"><JSLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#F7DF1E]" /><TSLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#3178C6]" /></div> },
  { name: 'React / Next.js', level: 88, icon: <div className="flex gap-2"><ReactLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#61DAFB]" /><NextJSLogo className="w-8 h-8 text-primary transition-colors group-hover:text-white" /></div> },
  { name: 'Node.js', level: 80, icon: <NodeJSLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#339933]" /> },
  { name: 'Java', level: 85, icon: <JavaLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#007396]" /> },
  { name: 'C', level: 75, icon: <CLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#A8B9CC]" /> },
  { name: 'MongoDB', level: 82, icon: <MongoDBLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#47A248]" /> },
  { name: 'SQL', level: 82, icon: <SQLLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#4479A1]" /> },
  { name: 'Google Cloud', level: 78, icon: <GCPLogo className="w-8 h-8 text-primary transition-colors group-hover:text-[#4285F4]" /> },
];

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
              src="https://picsum.photos/400/400"
              alt="Ashis Kumar Rai"
              width={400}
              height={400}
              className="rounded-full object-cover shadow-lg"
              data-ai-hint="professional portrait"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <p className="text-muted-foreground text-lg">
              I am a dedicated and results-driven developer with a strong passion for Artificial Intelligence and Machine Learning. With extensive experience in full-stack development, I enjoy building scalable, efficient, and user-friendly applications. My journey in tech is fueled by a desire to innovate and solve complex problems. I am constantly learning and exploring new technologies to push the boundaries of what's possible.
            </p>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">My Skills</h3>
              <div className="grid gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 flex items-center justify-center">{skill.icon}</div>
                    <div className="w-full">
                      <SkillProgressBar skill={skill.name} level={skill.level} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
