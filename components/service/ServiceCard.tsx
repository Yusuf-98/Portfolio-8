'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NeonLine } from '@/components/ui/NeonLine';

// --- Service Card ---
interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  index: number;
}

export function ServiceCard({
  number,
  title,
  description,
  icon,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className='flex flex-1 flex-col gap-3 md:gap-sec-card-title cursor-pointer'
    >
      {/* Service number */}
      <span className='text-md md:text-sec-body font-semibold text-neutral-400'>
        {number}
      </span>

      {/* Divider + neon */}
      <div className='relative h-px w-full bg-neutral-800 overflow-hidden'>
        <NeonLine
          direction='horizontal'
          align='left'
          duration={3}
          delay={index * 0.8}
        />
      </div>

      {/* Service icon */}
      <Image src={icon} alt='' width={32} height={32} className='h-8 w-8' />

      {/* Service title */}
      <h3 className='text-xl md:text-sec-card-title font-semibold text-neutral-25'>
        {title}
      </h3>

      {/* Service description */}
      <p className='text-md md:text-sec-body font-normal text-neutral-400'>
        {description}
      </p>
    </motion.div>
  );
}
