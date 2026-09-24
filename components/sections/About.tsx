'use client';

import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  transitionDelayed,
  transitionXDelayed,
  fadeInDown,
} from '@/lib/animations/staggered-item';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { BoxPattern } from '@/components/ui/BoxPattern';
import { FloatingBoat } from '@/lib/animations/floating-boat';

// --- Delays ---
const D_LABEL = 0.0;
const D_TITLE_1 = 0.15;
const D_TITLE_2 = 0.3;
const D_TEXT = 0.45;
const D_IMG_1 = 0.6;
const D_IMG_2 = 0.75;
const D_IMG_3 = 0.9;

// --- About section ---
export function About() {
  return (
    <section
      id='about'
      className='relative w-full max-w-360 mx-auto bg-base-black md:pb-30 overflow-x-hidden'
    >
      {/* Box pattern */}
      <motion.div
        variants={fadeInDown}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        transition={transitionDelayed(0.0)}
        className='absolute bottom-0'
      >
        <BoxPattern rotate={90} style={{ left: 0 }} />
      </motion.div>

      <Container className='flex flex-col md:pt-42'>
        <div className='flex flex-col items-center gap-4 md:gap-16'>
          {/* About Content */}
          <div className='flex flex-col items-center w-full gap-4'>
            {/* About Title */}
            <motion.span
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(D_LABEL)}
              className='text-md md:text-sec-label font-medium text-primary-200 text-center w-full'
            >
              ABOUT ME
            </motion.span>

            {/* About Details */}
            <div className='relative flex flex-col items-center gap-1 w-full'>
              {/* About Subtitle */}
              <motion.h2
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_TITLE_1)}
                className='text-display-md md:text-sec-title lg:text-display-2xl tracking-t-none font-extrabold text-neutral-25 text-center w-full z-2'
              >
                CRAFTING SEAMLESS
              </motion.h2>

              {/* About Description */}
              <motion.h2
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_TITLE_2)}
                className='text-display-md md:text-sec-title font-extrabold text-primary-200 text-center w-full md:max-w-[73.65%] z-3'
              >
                HIGH-PERFORMANCE WEB{' '}
                <span className='text-neutral-25'>EXPERIENCES</span>
              </motion.h2>

              {/* Image 1 */}
              <FloatingBoat
                index={0}
                className='absolute hidden md:block z-0'
                style={{ left: '10.47%', top: '-71.20%', width: '20.10%' }}
              >
                <motion.div
                  variants={fadeInLeft}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.2 }}
                  transition={transitionXDelayed(D_IMG_1)}
                >
                  <Image
                    src='/images/projects/sociality.webp'
                    alt=''
                    width={762}
                    height={568}
                    className='w-full h-auto rounded-xl'
                    sizes='20vw'
                  />
                </motion.div>
              </FloatingBoat>

              {/* Image 2 */}
              <FloatingBoat
                index={1}
                className='absolute hidden md:block z-1'
                style={{ left: '74.66%', top: '-51.09%', width: '21.11%' }}
              >
                <motion.div
                  variants={fadeInRight}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.2 }}
                  transition={transitionXDelayed(D_IMG_2)}
                >
                  <Image
                    src='/images/projects/company-profile.webp'
                    alt=''
                    width={762}
                    height={568}
                    className='w-full h-auto rounded-xl'
                    sizes='21vw'
                  />
                </motion.div>
              </FloatingBoat>

              {/* Image 3 */}
              <FloatingBoat
                index={2}
                className='absolute hidden md:block z-4'
                style={{ left: '63.18%', top: '73.37%', width: '9.88%' }}
              >
                <motion.div
                  variants={fadeInUp}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.2 }}
                  transition={transitionDelayed(D_IMG_3)}
                >
                  <Image
                    src='/images/projects/resto.webp'
                    alt=''
                    width={762}
                    height={568}
                    className='w-full h-auto rounded-xl'
                    sizes='10vw'
                  />
                </motion.div>
              </FloatingBoat>
            </div>
          </div>

          {/* About Text */}
          <motion.p
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(D_TEXT)}
            className='text-md md:text-sec-body font-medium tracking-t-none text-neutral-400 text-center w-full md:max-w-249'
          >
            I&apos;m a frontend developer who builds pixel-accurate web apps with
            React, Next.js and JavaScript/TypeScript. I ship complete products
            (authentication, data fetching with TanStack Query, forms, cart and
            checkout flows), with automated tests and CI on my recent projects.
            Based in Indonesia, open to remote roles worldwide, full-time or
            contract, and flexible to work in your time zone.
          </motion.p>

          {/* Mobile images */}
          <div className='relative w-full aspect-393/288 md:hidden'>
            <FloatingBoat
              index={0}
              style={{ left: '10.18%', top: '0%', width: '43.26%' }}
              className='absolute'
            >
              <motion.div
                variants={fadeInDown}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionXDelayed(D_IMG_1)}
              >
                <Image
                  src='/images/projects/sociality.webp'
                  alt=''
                  width={762}
                  height={568}
                  className='w-full h-auto rounded-xl'
                  sizes='43vw'
                />
              </motion.div>
            </FloatingBoat>

            <FloatingBoat
              index={1}
              style={{ left: '57.00%', top: '15.63%', width: '34.10%' }}
              className='absolute'
            >
              <motion.div
                variants={fadeInDown}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionXDelayed(D_IMG_2)}
              >
                <Image
                  src='/images/projects/company-profile.webp'
                  alt=''
                  width={762}
                  height={568}
                  className='w-full h-auto rounded-xl'
                  sizes='34vw'
                />
              </motion.div>
            </FloatingBoat>

            <FloatingBoat
              index={2}
              style={{ left: '36.64%', top: '56.94%', width: '33.59%' }}
              className='absolute'
            >
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_IMG_3)}
              >
                <Image
                  src='/images/projects/resto.webp'
                  alt=''
                  width={762}
                  height={568}
                  className='w-full h-auto rounded-xl'
                  sizes='34vw'
                />
              </motion.div>
            </FloatingBoat>
          </div>
        </div>
      </Container>
    </section>
  );
}
