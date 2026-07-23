
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
  Sparkles,
  Maximize2,
  ShieldCheck
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
  {
    icon: FileText,
    bgGradient: 'bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-800',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    title: 'Full-Stack Development',
    subtitle: 'Software Architecture',
    description: 'Full stack web architecture, React, Node.js & modern cloud deployment certification.',
    link: 'https://drive.google.com/file/d/1oFyeaTxsdiEUDdyae1nXtV-d2G2f-vhM/view?usp=drive_link',
    tags: ['Full Stack', 'Web Architecture'],
  },
];

export function AchievementsSection() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <section id="achievements" className="relative w-full py-16 md:py-24 overflow-hidden bg-background border-t border-border/40">
      
      {/* Soft Ambient Glow Overlay (NO DIAGONAL LINES) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
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

        {/* Compact Grid: 2 cols on mobile, 3 cols on sm/md/lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 justify-items-center">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                onClick={() => setSelectedCert(cert)}
                className="group relative flex flex-col items-center w-full max-w-[130px] sm:max-w-[155px] md:max-w-[170px] cursor-pointer select-none"
              >
                {/* 3D Stacked Card Container */}
                <div className="relative w-full aspect-square flex items-center justify-center">
                  
                  {/* Back Stacked Color Card Layer */}
                  <div 
                    className={`absolute inset-0 rounded-[20px] sm:rounded-[24px] ${cert.bgGradient} transform transition-all duration-300 opacity-90 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-3 shadow-md`}
                    style={{
                      boxShadow: `0 8px 24px ${cert.glowColor}`,
                    }}
                  />

                  {/* Front Glossy Glassmorphism Card */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-white/20 via-white/10 to-transparent dark:from-white/15 dark:via-white/5 dark:to-black/50 backdrop-blur-xl border border-white/30 dark:border-white/15 shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/50 group-hover:bg-white/25 dark:group-hover:bg-black/30 overflow-hidden">
                    
                    {/* Shimmer sweep effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_infinite] pointer-events-none" />

                    {/* Pop-up Indicator Icon */}
                    <div className="absolute top-2 right-2 p-1 rounded-full bg-black/40 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>

                    {/* Minimalist White Icon */}
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="relative z-10"
                    >
                      <Icon className="w-8 h-8 sm:w-11 sm:h-11 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" />
                    </motion.div>
                  </div>
                </div>

                {/* Card Title & Subtitle Below */}
                <div className="mt-3 text-center px-1 w-full">
                  <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-medium line-clamp-1">
                    {cert.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-1 mt-1.5">
                    {cert.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-0.5 text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full border border-primary/20 text-muted-foreground bg-primary/5 group-hover:bg-primary/15 group-hover:text-primary transition-all duration-200"
                      >
                        <Sparkles className="w-2 h-2 opacity-70" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certificate Preview Modal / Pop-up Dialog */}
        <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
          <DialogContent className="max-w-3xl w-[94vw] sm:w-[85vw] md:w-[75vw] max-h-[92vh] bg-card/95 border-border/60 backdrop-blur-2xl p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {selectedCert && (
              <>
                {/* Top Theme Accent Bar */}
                <div className={`h-1.5 w-full ${selectedCert.bgGradient}`} />

                <div className="p-5 sm:p-7 flex flex-col flex-1 overflow-hidden relative">
                  
                  {/* Dynamic Soft Ambient Glow Background */}
                  <div 
                    className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-[90px] pointer-events-none opacity-40"
                    style={{ background: selectedCert.glowColor }}
                  />

                  {/* Header Block */}
                  <DialogHeader className="pb-4 border-b border-border/40 text-left space-y-2 relative z-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm ${selectedCert.bgGradient}`}>
                        <selectedCert.icon className="w-3.5 h-3.5" />
                        <span>{selectedCert.subtitle}</span>
                      </div>
                    </div>

                    <DialogTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground pt-1">
                      {selectedCert.title}
                    </DialogTitle>
                    
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {selectedCert.description}
                    </DialogDescription>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedCert.tags.map((t, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground border border-border/50">
                          <Sparkles className="w-2.5 h-2.5 opacity-60" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </DialogHeader>

                  {/* Document Viewer Frame */}
                  <div className="relative flex-1 min-h-[360px] sm:min-h-[480px] w-full my-4 rounded-2xl overflow-hidden border border-border/50 bg-black/90 shadow-2xl relative z-10">
                    <iframe
                      src={selectedCert.link.replace(/\/view.*/, '/preview')}
                      className="w-full h-full min-h-[360px] sm:min-h-[480px] border-0"
                      allow="autoplay"
                      title={selectedCert.title}
                    />
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="flex items-center justify-between pt-1 relative z-10">
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Official Verified Credential</span>
                    </div>

                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg ml-auto ${selectedCert.bgGradient}`}
                      style={{ boxShadow: `0 4px 20px ${selectedCert.glowColor}` }}
                    >
                      <span>Open Full Document</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
