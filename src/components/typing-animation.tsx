
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  className?: string;
  texts: string[];
  startDelay?: number;
}

export function TypingAnimation({ className, texts, startDelay = 0 }: TypingAnimationProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setCanStart(true);
      }, startDelay);
      return () => clearTimeout(startTimer);
    } else {
      setCanStart(true);
    }
  }, [startDelay]);

  useEffect(() => {
    if (!canStart) return;

    const typingSpeed = 150;
    const deletingSpeed = 75;
    const delayAfterTyping = 1500;

    const handleTyping = () => {
      const fullText = texts[textIndex];
      
      if (isDeleting) {
        // Deleting logic
        if (charIndex > 0) {
          setCurrentText(fullText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        // Typing logic
        if (charIndex < fullText.length) {
          setCurrentText(fullText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Wait then start deleting
          setTimeout(() => setIsDeleting(true), delayAfterTyping);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, canStart]);

  return (
    <span className={cn(className, canStart && "typing-cursor")}>
      {currentText}&nbsp;
    </span>
  );
}
