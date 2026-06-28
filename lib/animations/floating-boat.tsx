'use client';

import { motion } from 'framer-motion';

// --- FloatingBoat ---
interface FloatingBoatProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FloatingBoat({
  children,
  index = 0,
  className,
  style,
}: FloatingBoatProps) {
  return (
    <motion.div
      animate={{
        y: [0, -5, 0, -3, 0],
        x: [0, 1.5, 0, -1.5, 0],
        rotate: [0, 0.5, 0, -0.5, 0],
      }}
      transition={{
        duration: 5,
        delay: index * 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
