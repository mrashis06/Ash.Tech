import Image from 'next/image';
import { SkillProgressBar } from './skill-progress-bar';

const skills = [
  { name: 'Python', level: 90, icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'JavaScript / TypeScript', level: 85, icon: <div className="flex gap-2"><Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /><Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /></div> },
  { name: 'React / Next.js', level: 88, icon: <div className="flex gap-2"><Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /><Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /></div> },
  { name: 'Node.js', level: 80, icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Java', level: 85, icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'C', level: 75, icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" alt="C" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'MongoDB', level: 82, icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'SQL', level: 82, icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" alt="SQL" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Google Cloud', level: 78, icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud" width={32} height={32} className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-all" /> },
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
