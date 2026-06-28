'use client';

import { BoxPattern } from '@/components/ui/BoxPattern';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { Container } from '../layout/Container';
import { motion } from 'framer-motion';
import { FloatingBoat } from '@/lib/animations/floating-boat';
import {
  fadeInUp,
  fadeInDown,
  fadeIn,
  transitionDelayed,
} from '@/lib/animations/staggered-item';

// --- Portfolio data ---
const portfolioData = [
  {
    id: 1,
    image: '/images/portfolio-image01.png',
    title: 'Dashboard SaaS Task Management',
    description:
      'Lorem ipsum dolor sit amet consectetur. Aenean sed commodo aenean nunc lobortis.',
  },
  {
    id: 2,
    image: '/images/portfolio-image02.png',
    title: 'Dashboard SaaS Task Management',
    description:
      'Lorem ipsum dolor sit amet consectetur. Aenean sed commodo aenean nunc lobortis.',
  },
  {
    id: 3,
    image: '/images/portfolio-image03.png',
    title: 'Dashboard SaaS Task Management',
    description:
      'Lorem ipsum dolor sit amet consectetur. Aenean sed commodo aenean nunc lobortis.',
  },
  {
    id: 4,
    image: '/images/portfolio-image04.png',
    title: 'Dashboard SaaS Task Management',
    description:
      'Lorem ipsum dolor sit amet consectetur. Aenean sed commodo aenean nunc lobortis.',
  },
  {
    id: 5,
    image: '/images/portfolio-image05.png',
    title: 'Dashboard SaaS Task Management',
    description:
      'Lorem ipsum dolor sit amet consectetur. Aenean sed commodo aenean nunc lobortis.',
  },
  {
    id: 6,
    image: '/images/portfolio-image06.png',
    title: 'Dashboard SaaS Task Management',
    description:
      'Lorem ipsum dolor sit amet consectetur. Aenean sed commodo aenean nunc lobortis.',
  },
];

// --- Portfolio Section ---
export default function PortfolioSection() {
  return (
    <section
      id='portfolio'
      className='relative w-full max-w-360 mx-auto bg-base-black py-10 md:py-20 z-20'
    >
      {/* BoxPattern kanan atas — mobile only */}
      <BoxPattern
        rotate={270}
        className='absolute md:hidden'
        style={{ right: 0, top: '-21.62px' }}
      />

      <Container>
        {/* --- Portfolio Header --- */}
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
            PORTFOLIO
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
            SELECTED WORK
          </motion.h2>
        </div>

        {/* --- Portfolio Content --- */}

        {/* Desktop: 2 rows × 3 cards */}
        <div className='hidden md:flex flex-col gap-12'>
          {/* Row 1 */}
          <div className='flex flex-row gap-5'>
            {portfolioData.slice(0, 3).map((item, i) => (
              <div
                key={item.id}
                className={`flex-1${i === 1 ? ' relative' : ''}`}
              >
                <PortfolioCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  index={i}
                />
                {/* Visit button — hanya card nomor 2 */}
                {i === 1 && (
                  <FloatingBoat
                    index={0}
                    className='absolute z-10 -translate-x-1/2'
                    style={{ left: '50%', top: '236px' }}
                  >
                    <motion.div
                      variants={fadeIn}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true, amount: 0.2 }}
                      transition={transitionDelayed(0.6)}
                      className='flex items-center justify-center w-25 h-25 rounded-full bg-neutral-25 cursor-pointer'
                      style={{
                        boxShadow:
                          '0 8px 24px 0 rgba(0,0,0,0.35), 0 2px 6px 0 rgba(0,0,0,0.2)',
                      }}
                    >
                      <span className='text-lg font-bold text-neutral-950'>
                        VISIT
                      </span>
                    </motion.div>
                  </FloatingBoat>
                )}
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className='flex flex-row gap-5'>
            {portfolioData.slice(3, 6).map((item, i) => (
              <div key={item.id} className='flex-1'>
                <PortfolioCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  index={i + 3}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: 1 column, semua card */}
        <div className='flex md:hidden flex-col gap-8'>
          {portfolioData.map((item, i) => (
            <PortfolioCard
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              index={i}
            />
          ))}
        </div>

        {/* BoxPattern desktop kanan bawah — terakhir */}
        <motion.div
          variants={fadeInDown}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          transition={transitionDelayed(0.9)}
          className='absolute bottom-0 hidden md:flex'
          style={{ right: 0 }}
        >
          <BoxPattern rotate={270} />
        </motion.div>
      </Container>
    </section>
  );
}
