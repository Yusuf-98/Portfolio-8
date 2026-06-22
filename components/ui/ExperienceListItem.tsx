import Image from 'next/image';
import { cn } from '@/lib/utils';

// --- Experience list item component ---
type ExperienceListItemProps = {
  text: string;
  variant: 'self' | 'other';
  className?: string;
};

export function ExperienceListItem({
  text,
  variant,
  className,
}: ExperienceListItemProps) {
  const isSelf = variant === 'self';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* List icon */}
      <Image
        src={
          isSelf ? '/icons/list-icon-bright.png' : '/icons/list-icon-dark.png'
        }
        alt=''
        width={24}
        height={24}
        className='h-6 w-6 shrink-0 self-start md:h-8 md:w-8'
      />

      {/* List text */}
      <span
        className={cn(
          isSelf
            ? 'text-md font-bold text-neutral-25 md:text-xl'
            : 'text-md font-normal text-neutral-400 md:text-display-xs'
        )}
      >
        {text}
      </span>
    </div>
  );
}
