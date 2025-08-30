import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Zap, Code } from 'lucide-react';

const achievements = [
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: 'Hackathon Winner',
    description: '1st place at the National AI Innovation Challenge 2023 for developing a novel recommendation engine.',
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'Top Performer Award',
    description: 'Recognized for outstanding performance and contribution to the flagship product at TechCorp Inc.',
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Open Source Contributor',
    description: 'Active contributor to popular open-source machine learning libraries, including Scikit-learn.',
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="w-full py-12 md:py-24 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Achievements</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            A few of my proudest accomplishments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">{achievement.icon}</div>
              <CardHeader className="p-0">
                <CardTitle>{achievement.title}</CardTitle>
                <CardDescription className="mt-2">{achievement.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
