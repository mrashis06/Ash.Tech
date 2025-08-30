import Image from 'next/image';

const skills = [
  { name: 'Python', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'JavaScript', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'TypeScript', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'React', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Next.js', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Node.js', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Java', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'C', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" alt="C" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'MongoDB', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'SQL', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" alt="SQL" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Google Cloud', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
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
              <div className="flex flex-wrap gap-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-card/50 w-32 h-32 group transition-transform transform hover:scale-105 hover:shadow-xl">
                    {skill.icon}
                    <span className="text-sm font-medium text-center">{skill.name}</span>
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
