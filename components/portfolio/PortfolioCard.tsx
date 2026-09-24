'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { transitionDelayed } from '@/lib/animations/staggered-item';

// --- Card hover variants ---
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 },
};

const titleVariants = {
  hidden: { color: '#fdfdfd' },
  visible: { color: '#fdfdfd' },
  hover: { color: '#91FF02' },
};

const MAX_CHIPS = 3;

// --- Portfolio Card ---
interface PortfolioCardProps {
  image: string;
  title: string;
  description: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  onOpen: () => void;
  index?: number;
}

export default function PortfolioCard({
  image,
  title,
  description,
  stack,
  liveUrl,
  repoUrl,
  onOpen,
  index = 0,
}: PortfolioCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial='hidden'
      whileInView='visible'
      whileHover='hover'
      viewport={{ once: true, amount: 0.2 }}
      transition={transitionDelayed(index * 0.15)}
      className='flex flex-col gap-3 md:gap-sec-card-title w-full cursor-pointer'
    >
      {/* Preview */}
      <button
        type='button'
        onClick={onOpen}
        aria-label={`View ${title} details`}
        className='flex w-full cursor-pointer flex-col gap-3 text-left md:gap-sec-card-title'
      >
        <div
          className='relative w-full overflow-hidden rounded-2xl md:rounded-[20px]'
          style={{ aspectRatio: '381/284' }}
        >
          <Image
            src={image}
            alt=''
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            className='object-cover'
          />
        </div>

        <motion.h3
          variants={titleVariants}
          transition={{ duration: 0.2 }}
          className='font-bold text-xl md:text-sec-card-title'
        >
          {title}
        </motion.h3>
      </button>

      {/* Description */}
      <p className='font-normal text-neutral-400 text-sm md:text-body-responsive'>
        {description}
      </p>

      {/* Stack */}
      <ul className='flex flex-wrap gap-2'>
        {stack.slice(0, MAX_CHIPS).map((tech) => (
          <li
            key={tech}
            className='rounded-full border border-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-400'
          >
            {tech}
          </li>
        ))}
        {stack.length > MAX_CHIPS && (
          <li className='rounded-full border border-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-400'>
            +{stack.length - MAX_CHIPS}
          </li>
        )}
      </ul>

      {/* Links */}
      <div className='flex items-center gap-5 text-sm font-semibold'>
        <a
          href={liveUrl}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${title} live demo`}
          className='text-primary-200 transition-opacity hover:opacity-80'
        >
          Live demo ↗
        </a>
        <a
          href={repoUrl}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${title} source code on GitHub`}
          className='text-neutral-25 transition-opacity hover:opacity-80'
        >
          GitHub ↗
        </a>
      </div>
    </motion.div>
  );
}
