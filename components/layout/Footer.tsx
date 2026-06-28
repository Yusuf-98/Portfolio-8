'use client';

import { motion } from 'framer-motion';
import {
  fadeInDown,
  fadeIn,
  transitionDelayed,
} from '@/lib/animations/staggered-item';

// --- Footer ---
export default function Footer() {
  return (
    <motion.footer
      variants={fadeInDown}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.5 }}
      transition={transitionDelayed(0)}
      className='w-full max-w-360 mx-auto bg-base-black border-t border-neutral-800'
    >
      <div className='flex items-center justify-center h-16 md:h-20 px-2'>
        <motion.p
          variants={fadeIn}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={transitionDelayed(0.2)}
          className='text-xs md:text-md font-normal text-neutral-400 text-center'
        >
          © 2025 Edwin Anderson. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
