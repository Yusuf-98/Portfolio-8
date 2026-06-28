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

// --- Adjuster: kecepatan animasi mendekat (0→1, lebih kecil = lebih cepat) ---
const SLIDE_END_MOBILE = 0.4;
const SLIDE_END = 0.8;

type ExperienceProps = {
  workRef: React.RefObject<HTMLDivElement | null>;
};

export function Experience({ workRef }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isFixedRef = useRef(false);
  const lastScrollY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const leftRowRefs = useRef<(HTMLDivElement | null)[]>(
    Array(COMPARISON.length).fill(null)
  );
  const rightRowRefs = useRef<(HTMLDivElement | null)[]>(
    Array(COMPARISON.length).fill(null)
  );

  // --- useScroll target sectionRef ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const xLeftDesktop = useTransform(
    scrollYProgress,
    [0, SLIDE_END],
    ['-40vw', '0vw']
  );
  const xRight = useTransform(scrollYProgress, [0, SLIDE_END], ['40vw', '0vw']);
  const xRight2 = useTransform(
    scrollYProgress,
    [0.1, SLIDE_END_MOBILE + 0.4],
    ['70vw', '0vw']
  );

  // --- Deteksi mobile ---
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // --- Sync tinggi baris kiri dan kanan ---
  const syncRowHeights = useCallback(() => {
    leftRowRefs.current.forEach((leftEl, i) => {
      const rightEl = rightRowRefs.current[i];
      if (!leftEl || !rightEl) return;
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

  // --- Sync container minHeight = tinggi section aktual ---
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const updateMinHeight = () => {
      if (!sectionRef.current || !containerRef.current) return;
      containerRef.current.style.minHeight = `${sectionRef.current.offsetHeight}px`;
    };

    updateMinHeight();

    const observer = new ResizeObserver(updateMinHeight);
    observer.observe(sectionRef.current);
    window.addEventListener('resize', updateMinHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateMinHeight);
    };
  }, []);

  // --- Fix/unfix via DOM ---
  useEffect(() => {
    const unfix = () => {
      if (!isFixedRef.current || !sectionRef.current) return;
      isFixedRef.current = false;
      sectionRef.current.style.position = 'relative';
      sectionRef.current.style.bottom = '';
      sectionRef.current.style.left = '';
      sectionRef.current.style.right = '';
      sectionRef.current.style.zIndex = '10';
    };

    const fix = () => {
      if (isFixedRef.current || !sectionRef.current) return;
      isFixedRef.current = true;
      sectionRef.current.style.position = 'fixed';
      sectionRef.current.style.bottom = '0';
      sectionRef.current.style.left = '0';
      sectionRef.current.style.right = '0';
      sectionRef.current.style.zIndex = '10';
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (isScrollingDown) {
        // Unfix saat work-top menyentuh top viewport
        if (workRef.current) {
          const workRect = workRef.current.getBoundingClientRect();
          if (workRect.top <= 0) {
            unfix();
            return;
          }
        }
        // Fix saat seluruh section sudah masuk viewport
        const shouldFix =
          sectionRect.bottom <= windowHeight && sectionRect.top < 0;
        if (shouldFix) fix();
      } else {
        if (workRef.current) {
          const workRect = workRef.current.getBoundingClientRect();
          if (workRect.top > windowHeight && workRect.top > 0) {
            unfix();
          } else if (workRect.top >= windowHeight && workRect.top < 0) {
            fix();
          } else if (workRect.top < windowHeight && workRect.top < 0) {
            fix();
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [workRef]);

  return (
    <div ref={containerRef} className='relative'>
      <motion.section
        ref={sectionRef}
        className='w-full max-w-360 mx-auto bg-base-black pt-10 pb-20 md:pt-30 md:pb-25'
        style={{ position: 'relative', zIndex: 10 }}
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
                className='text-md font-medium text-primary-200 md:text-sec-label'
              >
                WORKING
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_TITLE)}
                className='text-display-md tracking-t-none font-extrabold text-neutral-25 md:text-sec-title'
              >
                WHY CHOOSE ME?
              </motion.h2>
            </div>

            {/* Experience content */}
            <div className='flex w-full flex-col gap-8 md:flex-row md:gap-[clamp(40px,-12.5px+6.94vw,80px)]'>
              {/* Experience item kiri */}
              <motion.div
                style={{ x: isMobile ? xRight : xLeftDesktop }}
                className='flex flex-1 flex-col items-center gap-8'
              >
                <h3 className='text-xl font-bold text-neutral-25 md:text-sec-card-title'>
                  WORKING WITH ME
                </h3>
                <div className='relative h-15 w-15 shrink-0 overflow-hidden rounded-full bg-neutral-950 md:h-20 md:w-20'>
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
                style={{ x: isMobile ? xRight2 : xRight }}
                className='flex flex-1 flex-col items-center gap-8'
              >
                <h3 className='text-xl font-bold text-neutral-25 md:text-sec-card-title'>
                  ANOTHER TALENT
                </h3>
                <div className='relative h-15 w-15 shrink-0 overflow-hidden rounded-full bg-neutral-950 md:h-20 md:w-20'>
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
              viewport={{ once: true, amount: 0.5 }}
              className='w-full md:w-60'
            >
              <Button className='w-full cursor-pointer'>HIRE ME</Button>
            </motion.div>
          </div>
        </Container>
      </motion.section>
    </div>
  );
}
