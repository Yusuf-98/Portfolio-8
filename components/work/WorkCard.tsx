'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CornerGlow } from '@/lib/animations/corner-glow';
import { FloatingBoat } from '@/lib/animations/floating-boat';
import { fadeInUp, transitionDelayed } from '@/lib/animations/staggered-item';

// --- Work Card ---
interface WorkCardProps {
  year: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  index?: number;
}

export default function WorkCard({
  year,
  title,
  description,
  logo,
  logoAlt,
  index = 0,
}: WorkCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      transition={transitionDelayed(index * 0.1)}
    >
      <FloatingBoat index={index}>
        <div
          className='
            relative flex flex-col gap-4
            w-full h-full
            bg-base-black border border-neutral-800
            rounded-2xl md:rounded-[20px]
            p-4 md:p-6
          '
        >
          {/* Corner glow */}
          <CornerGlow delay={index * 1.5} />

          {/* Card header */}
          <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-4'>
            {/* Year and title */}
            <div className='flex flex-col gap-1'>
              {/* Year */}
              <span
                className='font-normal text-neutral-400 md:font-medium'
                style={{
                  fontSize: 'var(--text-label-responsive)',
                  lineHeight: 'var(--text-label-responsive--line-height)',
                }}
              >
                {year}
              </span>

              {/* Job title */}
              <span
                className='font-bold text-neutral-25'
                style={{
                  fontSize: 'var(--text-title-responsive)',
                  lineHeight: 'var(--text-title-responsive--line-height)',
                }}
              >
                {title}
              </span>
            </div>

            {/* Company logo */}
            <div
              className='relative shrink-0'
              style={{
                width: 'var(--work-logo-width)',
                height: 'var(--work-logo-height)',
              }}
            >
              <Image
                src={logo}
                alt={logoAlt}
                fill
                sizes='(max-width: 768px) 76px, 114px'
                className='object-contain object-left md:object-right'
              />
            </div>
          </div>

          {/* Description */}
          <p
            className='font-normal text-neutral-400'
            style={{
              fontSize: 'var(--text-body-responsive)',
              lineHeight: 'var(--text-body-responsive--line-height)',
            }}
          >
            {description}
          </p>
        </div>
      </FloatingBoat>
    </motion.div>
  );
}
