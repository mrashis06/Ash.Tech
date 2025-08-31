import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Zap, Code, Cloud, BrainCircuit, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const experiences = [
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: 'Nurturing Innovation Challenge 3.0',
    description: 'Selected among Top 29 finalists for SmartSetu, a fintech platform that leverages AI and alternative data to assess creditworthiness of street vendors, promoting financial inclusion.',
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Adobe India Hackathon',
    description: 'Participated in a national-level hackathon by Adobe, working on innovative AI-driven solutions.',
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'National Coding League 2.0',
    description: 'Achieved the position of regional qualifier in a competitive national coding league.',
    link: 'https://drive.google.com/file/d/1Tfsksw1_OSRfxuZXDO2h3FdqtN2xuR8K/view?usp=drivesdk'
  },
  {
    icon: <Cloud className="w-8 h-8 text-primary" />,
    title: 'Google Cloud Arcade Facilitator',
    description: 'Hands-on experience in Compute Engine, BigQuery, Cloud Functions for scalable cloud solutions.',
    link: 'https://drive.google.com/file/d/1SxkglvcgfX3ZJJZMkC9Ud3TxMLEqMkTi/view?usp=drivesdk'
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Machine Learning',
    description: 'Advanced concepts in mathematics for ML, predictive modeling, and feature engineering.',
    link: 'https://drive.google.com/file/d/1yjUMsknw_BuhKVTVPAfdV2RyVlLPLDjB/view?usp=drivesdk'
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Experience</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-6">
            A few of my proudest accomplishments and experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <div key={index} className="relative transition-transform transform hover:scale-105 group animated-gradient-border rounded-2xl">
              <Card className="text-center p-6 bg-card h-full rounded-xl flex flex-col justify-start">
                <div>
                  {experience.link && (
                    <Link href={experience.link} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-6 h-6" />
                      <span className="sr-only">View Certificate</span>
                    </Link>
                  )}
                  <div className="flex justify-center mb-4">{experience.icon}</div>
                  <CardHeader className="p-0">
                    <CardTitle className="mt-4">{experience.title}</CardTitle>
                  </CardHeader>
                </div>
                <CardDescription className="text-sm text-muted-foreground mt-4 flex-grow">{experience.description}</CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
