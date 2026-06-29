'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  fadeInUp,
  fadeInDown,
  transitionDelayed,
} from '@/lib/animations/staggered-item';
import { Container } from '@/components/layout/Container';
import { SkillBar } from '@/components/ui/SkillBar';

// --- Tech icon data ---
const TECH_ICONS = [
  { name: 'Javascript', src: '/icons/tech/javascript.png' },
  { name: 'CSS', src: '/icons/tech/css.png' },
  { name: 'HTML', src: '/icons/tech/html.png' },
  { name: 'Express JS', src: '/icons/tech/express-js.png' },
  { name: 'MongoDB', src: '/icons/tech/mongo-db.png' },
  { name: 'React JS', src: '/icons/tech/react-js.png' },
  { name: 'TypeScript', src: '/icons/tech/typescript.png' },
  { name: 'Docker', src: '/icons/tech/docker.png' },
];

// --- Skill bar data ---
const SKILLS = [
  { name: 'React JS', percentage: 50 },
  { name: 'HTML', percentage: 80 },
  { name: 'Tailwind CSS', percentage: 90 },
  { name: 'HTML', percentage: 100 },
  { name: 'Docker', percentage: 70 },
  { name: 'Javascript', percentage: 90 },
];

// --- Delay ---
const D_LABEL = 0.0;
const D_TITLE = 0.15;
const D_ICON_ROW1_BASE = 0.3;
const D_ICON_ROW2_BASE = 0.3;
const D_ICON_STAGGER = 0.1;
const D_BAR_BASE = 0.5;
const D_BAR_STAGGER = 0.3;

// --- Skills section ---
export function Skills() {
  return (
    <section
      id='skills'
      className='w-full max-w-360 mx-auto bg-base-black py-10 md:pt-19'
    >
      <Container>
        <div className='flex flex-col gap-10 md:flex-row md:items-center md:gap-sec-skill-content'>
          {/* Skills content */}
          <div className='flex flex-col gap-6 md:basis-90.25 md:grow-4 md:gap-sec-skill-content'>
            <div className='flex flex-col gap-2'>
              {/* Skills label */}
              <motion.span
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_LABEL)}
                className='text-md font-medium text-primary-200 md:text-sec-label'
              >
                SKILLS
              </motion.span>

              {/* Skills title */}
              <motion.h2
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_TITLE)}
                className='text-display-md tracking-t-none font-extrabold text-neutral-25 md:text-sec-title'
              >
                SKILLS THAT BRING IDEAS TO LIFE
              </motion.h2>
            </div>

            {/* Tech icon grid */}
            <div className='flex flex-col gap-6'>
              {/* Baris 1 */}
              <div className='flex flex-row gap-6'>
                {TECH_ICONS.slice(0, 4).map((icon, i) => (
                  <motion.div
                    key={icon.name}
                    variants={fadeInDown}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    transition={transitionDelayed(
                      D_ICON_ROW1_BASE + i * D_ICON_STAGGER
                    )}
                    className='flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 p-1 md:h-16 md:w-16'
                  >
                    <Image
                      src={icon.src}
                      alt={icon.name}
                      width={48}
                      height={48}
                      className='h-full w-full object-contain'
                    />
                  </motion.div>
                ))}
              </div>

              {/* Baris 2 */}
              <div className='flex flex-row gap-6'>
                {TECH_ICONS.slice(4, 8).map((icon, i) => (
                  <motion.div
                    key={icon.name}
                    variants={fadeInUp}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    transition={transitionDelayed(
                      D_ICON_ROW2_BASE + i * D_ICON_STAGGER
                    )}
                    className='flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 p-1 md:h-16 md:w-16'
                  >
                    <Image
                      src={icon.src}
                      alt={icon.name}
                      width={48}
                      height={48}
                      className='h-full w-full object-contain'
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill bars */}
          <div className='flex w-full flex-col gap-4 md:basis-90.25 md:grow-6 md:gap-sec-skill-bar'>
            {SKILLS.map((skill, index) => (
              <SkillBar
                key={`${skill.name}-${index}`}
                name={skill.name}
                percentage={skill.percentage}
                index={index}
                baseDelay={D_BAR_BASE}
                stagger={D_BAR_STAGGER}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
