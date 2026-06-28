'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FloatingBoat } from '@/lib/animations/floating-boat';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  transitionDelayed,
  transitionXDelayed,
} from '@/lib/animations/staggered-item';

// --- Card variants ---
const getCardVariants = (direction: 'left' | 'right' | 'up') => {
  if (direction === 'left') return { ...fadeInLeft, hover: { scale: 1.05 } };
  if (direction === 'right') return { ...fadeInRight, hover: { scale: 1.05 } };
  return { ...fadeInUp, hover: { scale: 1.05 } };
};

const answerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0 },
  hover: { opacity: 1 },
};

// --- FAQ Item ---
interface FaqItemProps {
  question: string;
  answer: string;
  index?: number;
  direction?: 'left' | 'right' | 'up';
}

export function FaqItem({
  question,
  answer,
  index = 0,
  direction = 'up',
}: FaqItemProps) {
  const cardVariants = getCardVariants(direction);
  const cardTransition =
    direction === 'up'
      ? transitionDelayed(index * 0.15)
      : transitionXDelayed(index * 0.15);

  return (
    <motion.div
      variants={cardVariants}
      initial='hidden'
      whileInView='visible'
      whileHover='hover'
      viewport={{ once: true, amount: 0.2 }}
      transition={cardTransition}
    >
      <FloatingBoat index={index}>
        <div className='flex flex-col gap-2 md:gap-sec-card-title w-full cursor-pointer'>
          {/* Content: icon + question */}
          <div className='flex flex-row items-start gap-3'>
            {/* Icon */}
            <div className='relative shrink-0 w-6 h-6 md:w-8 md:h-8 mt-1'>
              <Image
                src='/icons/list-icon-bright.png'
                alt=''
                fill
                sizes='32px'
                className='object-contain'
              />
            </div>

            {/* Question */}
            <h3 className='font-bold text-neutral-25 text-lg md:text-sec-card-title'>
              {question}
            </h3>
          </div>

          {/* Answer */}
          <motion.p
            variants={answerVariants}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className='font-medium text-neutral-400 text-sm md:text-body-responsive'
          >
            {answer}
          </motion.p>
        </div>
      </FloatingBoat>
    </motion.div>
  );
}
