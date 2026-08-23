'use client';

import { useState } from 'react';
import { 
  Layers, 
  Database, 
  BarChart3, 
  BrainCircuit, 
  Cpu, 
  FileText, 
  ExternalLink, 
  Award,
  ShieldCheck,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const certificates = [
  {
    icon: Sparkles,
    bgGradient: 'bg-gradient-to-br from-blue-500 via-indigo-600 to-sky-600',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    title: 'Solution Challenge 2026',
    subtitle: 'Build with AI · Prototype Submission',
    description: 'Awarded in recognition of successful prototype submission for Solution Challenge 2026: Build with AI, contributing to the spirit of innovation and problem-solving.',
    link: 'https://drive.google.com/file/d/1vXCqwM39F9Wx5-02K_9LfTHHwP6TGfw_/view?usp=drive_link',
    tags: ['Solution Challenge', 'Build with AI', 'Prototype'],
  },
  {
    icon: FileText,
    bgGradient: 'bg-gradient-to-br from-slate-700 via-red-800 to-rose-700',
    glowColor: 'rgba(190, 24, 93, 0.45)',
    title: 'Port Mortem: Code Resurrection',
    subtitle: 'Worldwide Rank #29',
    description: 'Participated in Code Resurrection, a 72-hour online Hackathon Raptors event. As part of Team Kernel Coffin, built TinyColor-Go and achieved a worldwide rank of 29th.',
    link: 'https://drive.google.com/file/d/1uCd-aUjy6GEWBS5t0bKKhvO0O0gazzs6/view',
    tags: ['Hackathon Raptors', 'Kernel Coffin', 'Global Rank #29'],
  },
  {
    icon: Layers,
    bgGradient: 'bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    title: 'Nurturing Innovation 3.0',
    subtitle: 'Top 29 Finalist',
    description: 'Selected among Top 29 finalists for SmartSetu, a fintech platform that leverages AI and alternative data to assess creditworthiness of street vendors.',
    link: 'https://drive.google.com/file/d/1oFyeaTxsdiEUDdyae1nXtV-d2G2f-vhM/view?usp=drive_link',
    tags: ['Fintech', 'AI', 'Top 29'],
  },
  {
    icon: Database,
    bgGradient: 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-700',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    title: 'Adobe India Hackathon',
    subtitle: 'National AI Challenge',
    description: 'Participated in a national-level hackathon by Adobe, working on innovative AI-driven solutions.',
    link: 'https://drive.google.com/file/d/1oFyeaTxsdiEUDdyae1nXtV-d2G2f-vhM/view?usp=drive_link',
    tags: ['Hackathon', 'Adobe', 'AI'],
  },
  {
    icon: BarChart3,
    bgGradient: 'bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    title: 'National Coding League 2.0',
    subtitle: 'Regional Qualifier',
    description: 'Achieved the position of regional qualifier in a competitive national coding league.',
    link: 'https://drive.google.com/file/d/1Tfsksw1_OSRfxuZXDO2h3FdqtN2xuR8K/view?usp=drivesdk',
    tags: ['Competitive', 'NCL 2.0'],
  },
  {
    icon: BrainCircuit,
    bgGradient: 'bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-600',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    title: 'Google Cloud Facilitator',
    subtitle: 'Cloud & Compute',
    description: 'Hands-on experience in Compute Engine, BigQuery, and Cloud Functions for scalable cloud solutions.',
    link: 'https://drive.google.com/file/d/1SxkglvcgfX3ZJJZMkC9Ud3TxMLEqMkTi/view?usp=drivesdk',
    tags: ['Google Cloud', 'BigQuery'],
  },
  {
    icon: Cpu,
    bgGradient: 'bg-gradient-to-br from-rose-500 via-red-600 to-pink-700',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    title: 'Machine Learning',
    subtitle: 'Predictive Engineering',
    description: 'Advanced concepts in mathematics for ML, predictive modeling, and feature engineering.',
    link: 'https://drive.google.com/file/d/1yjUMsknw_BuhKVTVPAfdV2RyVlLPLDjB/view?usp=drivesdk',
    tags: ['ML', 'Mathematics'],
  },
];

function getDriveImageUrl(link: string) {
  const match = link.match(/\/file\/d\/([^\/]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}=w1200`;
  }
  return '';
}

function getDrivePreviewUrl(link: string) {
  const match = link.match(/\/file\/d\/([^\/]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return '';
}

export function AchievementsSection() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <section id="achievements" className="relative w-full py-16 md:py-28 overflow-hidden bg-background border-t border-border/40">
      
      {/* Soft Ambient Field */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-semibold tracking-widest text-primary uppercase mb-2.5 shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Award className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Verified Credentials</span>
          </motion.div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-headline text-foreground">
            Certifications
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-sm mx-auto mt-2">
            Click any certificate card to preview the official document.
          </p>
        </motion.div>

        {/* Desktop & Mobile Responsive Cards Grid — Full Text Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                whileHover={{ y: -3, scale: 1.01 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative flex items-center gap-4 p-4.5 sm:p-5 rounded-2xl bg-card/40 border border-border/40 hover:border-primary/40 hover:bg-card/80 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg backdrop-blur-md select-none overflow-hidden"
              >
                {/* Compact Gradient Icon */}
                <div className={`p-3 rounded-xl ${cert.bgGradient} text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 drop-shadow-sm" />
                </div>

                {/* Title & Subtitle — Full Text Visible */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 font-headline leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 font-sans leading-tight">
                    {cert.subtitle}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className="text-muted-foreground group-hover:text-primary transition-all duration-200 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certificate Preview Modal / Pop-up Dialog */}
        <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
          <DialogContent className="max-w-4xl w-[94vw] sm:w-[88vw] md:w-[80vw] max-h-[92vh] bg-background/95 border border-border/40 backdrop-blur-3xl p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col overflow-hidden">
            {selectedCert && (
              <div className="flex flex-col flex-1 overflow-hidden space-y-5">
                
                {/* Header Block */}
                <DialogHeader className="text-left space-y-2.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/40 text-foreground text-xs font-mono font-semibold">
                      <selectedCert.icon className="w-3.5 h-3.5 text-primary" />
                      <span>{selectedCert.subtitle}</span>
                    </div>
                  </div>

                  <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight font-headline text-foreground pt-1">
                    {selectedCert.title}
                  </DialogTitle>
                  
                  <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans max-w-2xl">
                    {selectedCert.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Document Viewer Frame — Ultra-Clean Cinema Presentation */}
                <div className="relative flex-1 min-h-[360px] sm:min-h-[480px] w-full rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md shadow-inner flex items-center justify-center overflow-hidden">
                  <iframe
                    src={getDrivePreviewUrl(selectedCert.link)}
                    title={selectedCert.title}
                    className="w-full h-full min-h-[360px] sm:min-h-[480px] border-0 rounded-xl"
                    allow="autoplay"
                  />
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Official Verified Credential</span>
                  </div>

                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background font-bold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] ml-auto"
                  >
                    <span>Open Full Document</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
