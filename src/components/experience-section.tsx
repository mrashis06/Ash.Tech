import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Zap, Code, Cloud, BrainCircuit, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const experiences = [
  {
    icon: <Trophy className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Nurturing Innovation Challenge 3.0',
    description: 'Selected among Top 29 finalists for SmartSetu, a fintech platform that leverages AI and alternative data to assess creditworthiness of street vendors, promoting financial inclusion.',
  },
  {
    icon: <Code className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Adobe India Hackathon',
    description: 'Participated in a national-level hackathon by Adobe, working on innovative AI-driven solutions.',
    link: 'https://drive.google.com/file/d/1oFyeaTxsdiEUDdyae1nXtV-d2G2f-vhM/view?usp=drive_link',
  },
  {
    icon: <Zap className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'National Coding League 2.0',
    description: 'Achieved the position of regional qualifier in a competitive national coding league.',
    link: 'https://drive.google.com/file/d/1Tfsksw1_OSRfxuZXDO2h3FdqtN2xuR8K/view?usp=drivesdk'
  },
  {
    icon: <Cloud className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Google Cloud Arcade Facilitator',
    description: 'Hands-on experience in Compute Engine, BigQuery, Cloud Functions for scalable cloud solutions.',
    link: 'https://drive.google.com/file/d/1SxkglvcgfX3ZJJZMkC9Ud3TxMLEqMkTi/view?usp=drivesdk'
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Machine Learning',
    description: 'Advanced concepts in mathematics for ML, predictive modeling, and feature engineering.',
    link: 'https://drive.google.com/file/d/1yjUMsknw_BuhKVTVPAfdV2RyVlLPLDjB/view?usp=drivesdk'
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 bg-black">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Experience</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-6">
            A few of my proudest accomplishments and experiences.
          </p>
        </div>
        <div className="relative space-y-12">
          {/* Vertical line for the timeline effect */}
          <div className="absolute left-1/2 hidden md:block w-0.5 h-full bg-primary/20 transform -translate-x-1/2"></div>
          
          {experiences.map((experience, index) => (
            <div 
              key={index} 
              className="relative md:grid md:grid-cols-2 md:gap-12 items-center group"
            >
              {/* Icon and Connector */}
              <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:col-start-1 md:justify-end' : 'md:col-start-2 md:justify-start'}`}>
                <div className="hidden md:block w-6 h-0.5 bg-primary/20"></div>
                <div className="relative p-3 rounded-full bg-card border border-primary/30 z-10">
                  {experience.icon}
                </div>
                <div className="hidden md:block w-6 h-0.5 bg-primary/20"></div>
              </div>
              
              {/* Card Content */}
              <div 
                className={`relative transition-transform transform hover:scale-105 ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}
                style={{ animation: `float 2s ease-in-out infinite`, animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative transition-transform transform hover:scale-105 group animated-gradient-border rounded-2xl h-full">
                  <Card className="p-6 bg-card rounded-xl shadow-lg h-full">
                    <CardHeader className="p-0">
                      <div className="flex justify-between items-center">
                        <CardTitle>{experience.title}</CardTitle>
                        {experience.link && (
                          <Link href={experience.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <ExternalLink className="w-5 h-5" />
                            <span className="sr-only">View Certificate</span>
                          </Link>
                        )}
                      </div>
                    </CardHeader>
                    <CardDescription className="text-muted-foreground mt-2">{experience.description}</CardDescription>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
