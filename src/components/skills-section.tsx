
import Image from 'next/image';

const programmingLanguages = [
  { name: 'C', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" alt="C" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Java', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'JavaScript', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Python', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'TypeScript', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
];

const frontendSkills = [
  { name: 'Next.js', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'React', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
];

const backendSkills = [
  { name: 'Google Cloud', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'MongoDB', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'Node.js', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
  { name: 'SQL', icon: <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" alt="SQL" width={48} height={48} className="w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all" /> },
];

const skillCategories = [
  { title: 'Programming Languages', skills: programmingLanguages },
  { title: 'Frontend', skills: frontendSkills },
  { title: 'Backend', skills: backendSkills },
];

export function SkillsSection() {
    return (
        <section id="skills" className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">My Skills</h2>
                </div>
                <div className="space-y-12">
                  {skillCategories.map((category) => (
                    <div key={category.title}>
                      <h3 className="text-2xl font-bold text-center mb-8">{category.title}</h3>
                      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                          {category.skills.map((skill, index) => (
                              <div 
                                  key={skill.name} 
                                  className="relative group animated-gradient-border rounded-2xl w-28 h-28 md:w-32 md:h-32"
                                  style={{ animation: `float 2s ease-in-out infinite`, animationDelay: `${index * 0.1}s` }}
                              >
                                  <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-card h-full">
                                      {skill.icon}
                                      <span className="text-sm font-medium text-center">{skill.name}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </section>
    );
}
