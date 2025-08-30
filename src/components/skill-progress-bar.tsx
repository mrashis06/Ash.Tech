"use client";

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface SkillProgressBarProps {
  skill: string;
  level: number;
}

export function SkillProgressBar({ skill, level }: SkillProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 300);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-foreground">{skill}</span>
        <span className="text-sm font-medium text-primary">{level}%</span>
      </div>
      <Progress value={progress} className="w-full h-2 [&>div]:bg-primary" />
    </div>
  );
}
