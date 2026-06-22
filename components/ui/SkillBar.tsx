import { cn } from '@/lib/utils';

// --- Skill bar component ---
type SkillBarProps = {
  name: string;
  percentage: number;
  className?: string;
};

export function SkillBar({ name, percentage, className }: SkillBarProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-full items-center gap-4 md:h-16 md:gap-6',
        className
      )}
    >
      {/* Skill bar track */}
      <div className='relative flex h-full flex-1 items-center'>
        <span className='h-px w-full bg-neutral-700' />

        {/* Skill bar fill */}
        <div
          className='absolute left-0 flex h-full items-center rounded-[20px] px-4 md:px-6'
          style={{
            width: `${percentage}%`,
            minWidth: 'fit-content',
            backgroundColor: '#3A6601',
            backgroundImage:
              'repeating-linear-gradient(-115deg, transparent, transparent 7px, rgba(253,253,253,0.15) 7px, rgba(253,253,253,0.15) 8px, transparent 8px, transparent 16.52px)',
          }}
        >
          <span className='whitespace-nowrap text-sm font-semibold text-neutral-25 md:text-lg'>
            {name}
          </span>
        </div>
      </div>

      {/* Skill percentage */}
      <span className='text-sm font-semibold text-base-white md:text-xl'>
        {percentage}%
      </span>
    </div>
  );
}
