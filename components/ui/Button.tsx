'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// --- Button component ---
type ButtonProps = HTMLMotionProps<'button'> & {
  children: ReactNode;
  icon?: ReactNode;
};

export function Button({ children, icon, className, ...props }: ButtonProps) {
  return (
    <motion.button
      type='button'
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-primary-200 p-2 text-sm md:text-md font-bold text-neutral-950 shadow-glow-primary',
        'h-12 md:h-14',
        className
      )}
      {...props}
    >
      {children}
      {icon}
    </motion.button>
  );
}
