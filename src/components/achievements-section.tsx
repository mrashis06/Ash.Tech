
import { Trophy, Zap, Code, Cloud, BrainCircuit, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const achievements = [
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

export function AchievementsSection() {
  return (
    <section id="achievements" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Achievements</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4 md:mt-6">
            A few of my proudest accomplishments and experiences.
          </p>
        </div>
        <div className="relative space-y-16 md:space-y-12">
          {/* Vertical line for the timeline effect */}
          <div className="absolute left-[23px] md:left-1/2 w-[2px] h-full bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 transform md:-translate-x-1/2"></div>
          
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index} 
              className="relative flex flex-col md:grid md:grid-cols-2 md:gap-12 items-start md:items-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.4, delay: index * 0.1 }}
            >
              {/* Icon and Connector */}
              <div className={`absolute left-0 top-0 md:relative flex items-center md:gap-6 z-10 ${index % 2 === 0 ? 'md:col-start-1 md:justify-end' : 'md:col-start-2 md:justify-start'}`}>
                <div className="hidden md:block w-6 h-0.5 bg-primary/20"></div>
                <div 
                  className="relative w-12 h-12 flex items-center justify-center rounded-full bg-background border-2 border-primary/40 group-hover:border-primary transition-colors shadow-sm"
                >
                    <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20 duration-1000"></span>
                    <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                      {achievement.icon}
                    </div>
                </div>
                <div className="hidden md:block w-6 h-0.5 bg-primary/20"></div>
              </div>
              
              {/* Content Block */}
              <div 
                className={`w-full pl-16 md:pl-0 min-h-[48px] flex flex-col md:block overflow-visible ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}
              >
                <div className="relative group w-full py-1 md:p-6 md:clip-card transition-all duration-300 bg-transparent md:bg-card/50 md:border md:border-primary/20 md:hover:border-primary md:hover:bg-card md:hover:shadow-md md:hover:shadow-primary/10">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-primary md:text-foreground md:group-hover:text-primary transition-colors mb-3 md:mb-4">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                    {achievement.description}
                  </p>
                  {achievement.link && (
                    <Link href={achievement.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 transition-colors">
                      View Details <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
