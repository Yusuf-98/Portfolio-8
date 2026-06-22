import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ExperienceListItem } from '@/components/ui/ExperienceListItem';

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

// --- Experience section ---
export function Experience() {
  return (
    <section className='bg-base-black py-10 md:py-[120px]'>
      <Container>
        <div className='flex flex-col items-center gap-10 md:gap-12'>
          {/* Experience label */}
          <div className='flex flex-col items-center gap-4 text-center'>
            <span className='text-md font-medium text-primary-200 md:text-lg'>
              WORKING
            </span>

            {/* Experience title */}
            <h2 className='text-display-md font-extrabold text-neutral-25 md:text-display-2xl'>
              Why Choose Me?
            </h2>
          </div>

          {/* Experience content */}
          <div className='flex w-full flex-col md:hidden'>
            {/* Mobile: working with me block */}
            <div className='flex flex-col items-center gap-8'>
              <h3 className='text-xl font-bold text-neutral-25'>
                Working With Me
              </h3>

              {/* Avatar */}
              <div className='relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-neutral-950'>
                <Image
                  src='/icons/edwin-anderson.png'
                  alt='Edwin Anderson'
                  fill
                  className='object-cover'
                />
              </div>

              {/* List items */}
              <div className='flex w-full flex-col'>
                {COMPARISON.map((item, index) => (
                  <div key={item.self} className='flex flex-col gap-3 py-3'>
                    <ExperienceListItem text={item.self} variant='self' />
                    {index !== COMPARISON.length - 1 && (
                      <span className='h-px w-full bg-neutral-800' />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section divider */}
            <span className='my-8 h-px w-full bg-neutral-800' />

            {/* Mobile: another talent block */}
            <div className='flex flex-col items-center gap-8'>
              <h3 className='text-xl font-bold text-neutral-25'>
                Another Talent
              </h3>

              {/* Avatar */}
              <div className='relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-neutral-950'>
                <Image
                  src='/icons/others.png'
                  alt='Other developer'
                  fill
                  className='object-cover'
                />
              </div>

              {/* List items */}
              <div className='flex w-full flex-col'>
                {COMPARISON.map((item, index) => (
                  <div key={item.other} className='flex flex-col gap-3 py-3'>
                    <ExperienceListItem text={item.other} variant='other' />
                    {index !== COMPARISON.length - 1 && (
                      <span className='h-px w-full bg-neutral-800' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: comparison grid */}
          <div className='hidden w-full md:flex md:gap-20'>
            {/* Working with me header */}
            <div className='flex w-full flex-col items-center gap-8'>
              <h3 className='text-display-sm font-bold text-neutral-25'>
                Working With Me
              </h3>
              <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-neutral-950'>
                <Image
                  src='/icons/edwin-anderson.png'
                  alt='Edwin Anderson'
                  fill
                  className='object-cover'
                />
              </div>
            </div>

            {/* Another talent header */}
            <div className='flex w-full flex-col items-center gap-8'>
              <h3 className='text-display-sm font-bold text-neutral-25'>
                Another Talent
              </h3>
              <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-neutral-950'>
                <Image
                  src='/icons/others.png'
                  alt='Other developer'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>

          {/* Desktop: comparison rows */}
          <div className='hidden w-full grid-cols-2 gap-x-20 md:grid'>
            {COMPARISON.map((item, index) => (
              <div key={item.self} className='contents'>
                <ExperienceListItem
                  text={item.self}
                  variant='self'
                  className='items-start'
                />
                <ExperienceListItem
                  text={item.other}
                  variant='other'
                  className='items-start'
                />
                {index !== COMPARISON.length - 1 && (
                  <>
                    <span className='my-6 h-px w-full bg-neutral-800' />
                    <span className='my-6 h-px w-full bg-neutral-800' />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Hire me button */}
          <Button className='w-full uppercase md:w-[240px]'>Hire Me</Button>
        </div>
      </Container>
    </section>
  );
}
