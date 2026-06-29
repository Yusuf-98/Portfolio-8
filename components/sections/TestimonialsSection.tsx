'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import { NavigationButton } from '@/components/ui/NavigationButton';
import { Container } from '../layout/Container';
import {
  fadeInUp,
  fadeIn,
  transitionDelayed,
} from '@/lib/animations/staggered-item';

// --- Testimonials data ---
const testimonialsData = [
  {
    id: 1,
    name: 'Thom Haye',
    role: 'Project Manager',
    logo: '/images/upwork.png',
    logoAlt: 'Upwork',
    quote:
      '"Highly skilled frontend developer with an eye for design. Transformed our wireframes into a seamless and responsive web experience. Highly recommended!"',
  },
  {
    id: 2,
    name: 'Emily Carter',
    role: 'Head of Product',
    logo: '/images/trello.png',
    logoAlt: 'Trello',
    quote:
      '"An absolute pleasure to work with! Delivered a stunning, high-performance website that exceeded expectations. Attention to detail and problem-solving skills are top-notch!"',
  },
  {
    id: 3,
    name: 'Sarah Lee',
    role: 'Engineering Manager',
    logo: '/images/zapier.png',
    logoAlt: 'Zapier',
    quote:
      '"An exceptional frontend developer with a deep understanding of UI/UX principles. The ability to translate design into pixel-perfect code is truly impressive. A valuable asset to any team!"',
  },
  {
    id: 4,
    name: 'Michael Brown',
    role: 'Lead Developer',
    logo: '/images/zoom.png',
    logoAlt: 'Zoom',
    quote:
      'A pleasure to collaborate with! Writes clean, maintainable code while effectively working with designers and backend engineers. Outstanding work!',
  },
];

// --- Carousel variants ---
const carouselVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

// --- Testimonials Section ---
export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className='relative w-full max-w-360 mx-auto bg-base-black py-12 md:py-20 z-20'>
      <Container>
        {/* --- Testimonials Header --- */}
        <div className='flex flex-col items-center gap-2 mb-6 md:mb-16 z-20'>
          {/* Section label */}
          <motion.span
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0)}
            className='text-md font-medium text-primary-200 md:text-sec-label'
          >
            TESTIMONIALS
          </motion.span>

          {/* Section title */}
          <motion.h2
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0.15)}
            className='w-73 md:w-full text-display-md tracking-t-none font-bold text-neutral-25 text-center md:text-sec-title md:font-extrabold'
          >
            PEOPLE SAYS ABOUT ME
          </motion.h2>
        </div>

        {/* --- Desktop: 2x2 grid statis --- */}
        <div className='hidden md:flex flex-col gap-10'>
          {/* Row 1 */}
          <div className='flex flex-row gap-6'>
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(0.3)}
              className='flex-1'
            >
              <TestimonialCard {...testimonialsData[0]} index={0} />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(0.45)}
              className='flex-1'
            >
              <TestimonialCard {...testimonialsData[1]} index={1} />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className='flex flex-row gap-6'>
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(0.6)}
              className='flex-1'
            >
              <TestimonialCard {...testimonialsData[2]} index={2} />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(0.75)}
              className='flex-1'
            >
              <TestimonialCard {...testimonialsData[3]} index={3} />
            </motion.div>
          </div>
        </div>

        {/* --- Mobile: carousel 1 card --- */}
        <div className='flex md:hidden flex-col gap-6'>
          <div className='relative w-full overflow-hidden'>
            <AnimatePresence initial={false} custom={direction} mode='wait'>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={carouselVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <TestimonialCard
                  {...testimonialsData[activeIndex]}
                  index={activeIndex}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation mobile */}
          <motion.div
            variants={fadeIn}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0.9)}
            className='flex flex-row items-center justify-center gap-4'
          >
            <NavigationButton direction='left' size='sm' onClick={handlePrev} />
            <NavigationButton
              direction='right'
              size='sm'
              onClick={handleNext}
            />
          </motion.div>
        </div>

        {/* --- Desktop navigation --- */}
        <motion.div
          variants={fadeIn}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          transition={transitionDelayed(0.9)}
          className='hidden md:flex flex-row items-center justify-center gap-4 mt-10'
        >
          <NavigationButton direction='left' size='lg' />
          <NavigationButton direction='right' size='lg' />
        </motion.div>
      </Container>
    </section>
  );
}
