'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, transitionDelayed } from '@/lib/animations/staggered-item';

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

// --- Portfolio Card ---
interface PortfolioCardProps {
  image: string;
  title: string;
  description: string;
  index?: number;
}

export default function PortfolioCard({
  image,
  title,
  description,
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
      className='flex flex-col gap-3 md:gap-4 w-full cursor-pointer'
    >
      {/* Image */}
      <div
        className='relative w-full overflow-hidden rounded-2xl md:rounded-[20px]'
        style={{ aspectRatio: '381/284' }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
          className='object-cover'
        />
      </div>

      {/* Title */}
      <motion.h3
        variants={titleVariants}
        transition={{ duration: 0.2 }}
        className='
          font-bold
          text-xl md:text-display-xs
          leading-[34px] md:leading-[36px]
        '
      >
        {title}
      </motion.h3>

      {/* Description */}
      <p
        className='
          font-normal text-neutral-400
          text-sm md:text-md
          leading-[28px] md:leading-[30px]
        '
      >
        {description}
      </p>
    </motion.div>
  );
}
