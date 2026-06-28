'use client';

import { motion } from 'framer-motion';

// --- NeonLine ---
interface NeonLineProps {
  direction?: 'horizontal' | 'vertical';
  align?: 'center' | 'left' | 'right';
  duration?: number;
  delay?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export function NeonLine({
  direction = 'horizontal',
  align = 'center',
  duration = 3,
  delay = 0,
  color = '#91FF02',
  opacity = 1,
  className,
}: NeonLineProps) {
  const isHorizontal = direction === 'horizontal';
  const axis = isHorizontal ? 'to right' : 'to bottom';

  const gradientMap = {
    center: `linear-gradient(${axis}, transparent 0%, #252B37 20%, ${color} 50%, #252B37 80%, transparent 100%)`,
    left: `linear-gradient(${axis}, ${color} 0%, #252B37 80%, transparent 100%)`,
    right: `linear-gradient(${axis}, transparent 0%, #252B37 20%, ${color} 100%)`,
  };

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className ?? ''}`}
      style={{ background: gradientMap[align] }}
      animate={{ opacity: [0, opacity, 0] }}
      transition={{
        duration: duration * 2,
        ease: 'easeInOut',
        repeat: Infinity,
        delay,
        times: [0, 0.5, 1],
      }}
    />
  );
}
