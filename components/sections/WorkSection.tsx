'use client';

import WorkTimeline from '@/components/work/WorkTimeline';
import { BoxPattern } from '@/components/ui/BoxPattern';
import { Container } from '../layout/Container';
import { motion } from 'framer-motion';
import {
  fadeIn,
  fadeInUp,
  transitionDelayed,
} from '@/lib/animations/staggered-item';

// --- Work Section ---
export default function WorkSection() {
  return (
    <section className='relative w-full max-w-360 mx-auto bg-base-black py-10 md:py-20 z-20'>
      {/* --- Box pattern kanan bawah --- */}
      <motion.div
        variants={fadeIn}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          y: { duration: 1.2, ease: 'easeOut' },
          opacity: { duration: 0.9, ease: 'easeOut' },
        }}
        className='absolute bottom-0 hidden md:flex'
        style={{ right: 0 }}
      >
        <BoxPattern rotate={270} />
      </motion.div>

      <Container>
        {/* --- Work Header --- */}
        <div className='flex flex-col items-center gap-2 mb-6 md:mb-16'>
          {/* Section label */}
          <motion.span
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0)}
            className='text-md font-medium text-primary-200 md:text-sec-label'
          >
            EXPERIENCE
          </motion.span>

          {/* Section title */}
          <motion.h2
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0.15)}
            className='text-display-md tracking-t-none font-extrabold text-neutral-25 text-center md:text-sec-title'
          >
            PROFESIONAL WORK
          </motion.h2>
        </div>

        {/* --- Work Timeline --- */}
        <WorkTimeline />
      </Container>
    </section>
  );
}
