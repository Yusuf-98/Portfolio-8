'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// --- Button component ---
type ButtonProps = HTMLMotionProps<'button'> & {
  children: ReactNode;
  icon?: ReactNode;
};

export function Button({ children, icon, className, ...props }: ButtonProps) {
  const shimmerRef = useRef<HTMLSpanElement>(null);

  // --- Shimmer sekali setelah mount ---
  useEffect(() => {
    const el = shimmerRef.current;
    if (!el) return;
    // Trigger shimmer setelah button muncul (sesuai delay button fade in di Hero)
    const t = setTimeout(() => {
      el.classList.add('shimmer-run');
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.button
      type='button'
      whileHover={{
        scale: 1.03,
        boxShadow: '0 0 24px 6px rgba(145, 255, 2, 0.45)',
      }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 overflow-hidden',
        'rounded-full bg-primary-200 p-2 text-sm lg:text-md font-bold text-neutral-950',
        'shadow-glow-primary h-12 lg:h-14',
        className
      )}
      {...props}
    >
      {/* Shimmer overlay */}
      <span
        ref={shimmerRef}
        aria-hidden
        className='shimmer-stripe pointer-events-none absolute inset-0'
      />
      {children}
      {icon}
    </motion.button>
  );
}
