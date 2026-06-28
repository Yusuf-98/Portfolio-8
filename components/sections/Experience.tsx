'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ExperienceListItem } from '@/components/ui/ExperienceListItem';
import { fadeInUp, transitionDelayed } from '@/lib/animations/staggered-item';

// --- Experience comparison data ---
const COMPARISON = [
  { self: 'React Expert', other: 'Basic React Knowledge' },
  {
    self: 'Precise Website Implementation',
    other: 'Inconsistent Design Translation',
  },
  {
    self: 'TypeScript Proficiency',
    other: 'Little to No TypeScript Knowledge',
  },
  { self: 'Clean, Maintainable Code', other: 'Unstructured Code' },
  {
    self: 'Responsive Website Development',
    other: 'Inconsistent Responsiveness',
  },
  { self: 'UI Design Proficiency (Figma)', other: 'No Design Skills' },
];

const D_LABEL = 0.0;
const D_TITLE = 0.15;

type ExperienceProps = {
  workRef: React.RefObject<HTMLDivElement | null>;
};

export function Experience({ workRef }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isFixedRef = useRef(false);
  const [isFixed, setIsFixed] = useState(false);

  // Refs untuk setiap baris kiri dan kanan
  const leftRowRefs = useRef<(HTMLDivElement | null)[]>(
    Array(COMPARISON.length).fill(null)
  );
  const rightRowRefs = useRef<(HTMLDivElement | null)[]>(
    Array(COMPARISON.length).fill(null)
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const xLeft = useTransform(scrollYProgress, [0, 0.8], ['-20vw', '0vw']);
  const xRight = useTransform(scrollYProgress, [0, 0.8], ['20vw', '0vw']);

  // Sync tinggi baris kiri dan kanan
  const syncRowHeights = useCallback(() => {
    leftRowRefs.current.forEach((leftEl, i) => {
      const rightEl = rightRowRefs.current[i];
      if (!leftEl || !rightEl) return;

      // Reset dulu supaya pengukuran akurat
      leftEl.style.minHeight = '';
      rightEl.style.minHeight = '';

      const maxH = Math.max(leftEl.offsetHeight, rightEl.offsetHeight);
      leftEl.style.minHeight = `${maxH}px`;
      rightEl.style.minHeight = `${maxH}px`;
    });
  }, []);

  useEffect(() => {
    syncRowHeights();
    window.addEventListener('resize', syncRowHeights);
    return () => window.removeEventListener('resize', syncRowHeights);
  }, [syncRowHeights]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !sectionRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (workRef.current) {
        const workRect = workRef.current.getBoundingClientRect();
        if (workRect.bottom <= windowHeight) {
          if (isFixedRef.current) {
            isFixedRef.current = false;
            setIsFixed(false);
          }
          return;
        }
      }

      const shouldFix =
        containerRect.bottom <= windowHeight && containerRect.top < 0;
      if (shouldFix !== isFixedRef.current) {
        isFixedRef.current = shouldFix;
        setIsFixed(shouldFix);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [workRef]);

  return (
    <div ref={containerRef} className='relative min-h-[150vh]'>
      <motion.section
        ref={sectionRef}
        className='w-full max-w-360 mx-auto bg-base-black py-10 md:py-[120px]'
        style={
          isFixed
            ? { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }
            : { position: 'relative', zIndex: 10 }
        }
      >
        <Container>
          <div className='flex flex-col items-center gap-10 md:gap-6xl'>
            {/* Experience header */}
            <div className='flex flex-col items-center gap-2 text-center'>
              <motion.span
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_LABEL)}
                className='text-md font-medium text-primary-200 md:text-lg'
              >
                WORKING
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_TITLE)}
                className='text-display-md tracking-t-none font-extrabold text-neutral-25 md:text-display-2xl'
              >
                WHY CHOOSE ME?
              </motion.h2>
            </div>

            {/* Experience content */}
            <div className='flex w-full flex-col gap-8 md:flex-row md:gap-[clamp(40px,-12.5px+6.94vw,80px)]'>
              {/* Experience item kiri */}
              <motion.div
                style={{ x: xLeft }}
                className='flex flex-1 flex-col items-center gap-8'
              >
                <h3 className='text-xl font-bold text-neutral-25 md:text-display-sm'>
                  WORKING WITH ME
                </h3>
                <div className='relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-neutral-950 md:h-20 md:w-20'>
                  <Image
                    src='/icons/edwin-anderson.png'
                    alt='Edwin Anderson'
                    fill
                    sizes='(min-width: 768px) 80px, 60px'
                    className='object-cover'
                  />
                </div>
                <div className='flex w-full flex-col'>
                  {COMPARISON.map((item, index) => (
                    <div
                      key={item.self}
                      ref={(el) => {
                        leftRowRefs.current[index] = el;
                      }}
                      className='flex flex-col justify-center gap-3 py-3'
                    >
                      <ExperienceListItem text={item.self} variant='self' />
                      {index !== COMPARISON.length - 1 && (
                        <span className='h-px w-full bg-neutral-800' />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Divider mobile */}
              <span className='h-px w-full bg-neutral-800 md:hidden' />

              {/* Experience item kanan */}
              <motion.div
                style={{ x: xRight }}
                className='flex flex-1 flex-col items-center gap-8'
              >
                <h3 className='text-xl font-bold text-neutral-25 md:text-display-sm'>
                  ANOTHER TALENT
                </h3>
                <div className='relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-neutral-950 md:h-20 md:w-20'>
                  <Image
                    src='/icons/others.png'
                    alt='Other developer'
                    fill
                    sizes='(min-width: 768px) 80px, 60px'
                    className='object-cover'
                  />
                </div>
                <div className='flex w-full flex-col'>
                  {COMPARISON.map((item, index) => (
                    <div
                      key={item.other}
                      ref={(el) => {
                        rightRowRefs.current[index] = el;
                      }}
                      className='flex flex-col justify-center gap-3 py-3'
                    >
                      <ExperienceListItem text={item.other} variant='other' />
                      {index !== COMPARISON.length - 1 && (
                        <span className='h-px w-full bg-neutral-800' />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Hire me button */}
            <motion.div
              variants={fadeInUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 1 }}
              className='w-full md:w-[240px]'
            >
              <Button className='w-full uppercase'>Hire Me</Button>
            </motion.div>
          </div>
        </Container>
      </motion.section>
    </div>
  );
}
