'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Skill bar component ---
type SkillBarProps = {
  name: string;
  percentage: number;
  index: number;
  baseDelay: number;
  stagger: number;
  className?: string;
};

export function SkillBar({
  name,
  percentage,
  index,
  baseDelay,
  stagger,
  className,
}: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState<number | null>(null);
  const delay = baseDelay + index * stagger;
  const duration = 1.2;

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const controls = animate(0, percentage, {
        duration,
        ease: 'easeOut',
        onUpdate: (v) => setCount(Math.round(v)),
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, percentage, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'flex h-10 md:h-[clamp(2.5rem,1.937rem+2.292vw,4rem)] w-full items-center gap-4 md:gap-sec-skill-bar',
        className
      )}
    >
      {/* Skill bar content */}
      <div className='flex h-full flex-1 items-center'>
        {/* Skill bar label */}
        <motion.div
          className='relative flex h-full items-center overflow-hidden rounded-[12.94px] md:rounded-[20px]'
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${percentage}%` } : { width: '0%' }}
          transition={{ duration, ease: 'easeOut', delay }}
          style={{
            minWidth: '0px',
            backgroundImage: `repeating-linear-gradient(-115deg, #3A6601, #3A6601 7px, rgba(253,253,253,0.4) 7px, rgba(253,253,253,0.4) 8px, #3A6601 8px, #3A6601 16.52px)`,
            isolation: 'isolate',
          }}
        >
          <span className='relative z-10 whitespace-nowrap px-[15.52px] py-[5.17px] text-sm font-semibold text-neutral-25 md:px-6 md:py-2 md:text-sec-label'>
            {name}
          </span>
        </motion.div>

        {/* Skill bar line */}
        <motion.div
          className='h-px bg-neutral-800'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration, ease: 'easeOut', delay }}
          style={{ flex: 1 }}
        />
      </div>

      {/* Skill percentage */}
      <span className='text-right text-sm font-semibold text-base-white md:text-sec-body'>
        {count !== null ? `${count}%` : ''}
      </span>
    </div>
  );
}
