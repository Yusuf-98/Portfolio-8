import Image from 'next/image';
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

// --- Skills section ---
export function Skills() {
  return (
    <section className='bg-base-black py-10 md:py-[120px]'>
      <Container>
        <div className='flex flex-col gap-10 md:flex-row md:items-center md:gap-[58px]'>
          {/* Skills content */}
          <div className='flex flex-col gap-6 md:w-[524px] md:shrink-0 md:gap-[58px]'>
            {/* Skills label */}
            <span className='text-md font-medium text-primary-200 md:text-lg'>
              SKILLS
            </span>

            {/* Skills title */}
            <h2 className='text-display-md font-extrabold text-neutral-25 md:text-display-2xl'>
              Skills That Bring Ideas To Life
            </h2>

            {/* Tech icon grid */}
            <div className='grid grid-cols-4 gap-3 md:gap-4'>
              {TECH_ICONS.map((icon) => (
                <div
                  key={icon.name}
                  className='flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 p-1 md:h-16 md:w-16'
                >
                  <Image
                    src={icon.src}
                    alt={icon.name}
                    width={48}
                    height={48}
                    className='h-full w-full object-contain'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skill bars */}
          <div className='flex w-full flex-col gap-4 md:gap-6'>
            {SKILLS.map((skill, index) => (
              <SkillBar
                key={`${skill.name}-${index}`}
                name={skill.name}
                percentage={skill.percentage}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
