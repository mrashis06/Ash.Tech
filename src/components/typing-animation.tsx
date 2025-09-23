
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  className?: string;
  texts: string[];
}

export function TypingAnimation({ className, texts }: TypingAnimationProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
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
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span className={cn(className, "typing-cursor")}>
      {currentText}&nbsp;
    </span>
  );
}
