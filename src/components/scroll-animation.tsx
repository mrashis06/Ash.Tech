'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function ScrollAnimation({
  children,
  delay = 0,
  duration = 0.5,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  // once: false → re-triggers every time the element enters/exits the viewport
  const isInView = useInView(ref, { once: false, amount: 0.05 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    } else {
      // Reverse: slide back down + fade out when scrolled past
      mainControls.start('hidden');
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
