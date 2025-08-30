import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Zap, Code } from 'lucide-react';

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
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Experience</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            A few of my proudest accomplishments and experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <Card key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">{experience.icon}</div>
              <CardHeader className="p-0">
                <CardTitle>{experience.title}</CardTitle>
                <CardDescription className="mt-2">{experience.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
