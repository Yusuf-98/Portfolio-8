import WorkTimeline from '@/components/work/WorkTimeline';
import { BoxPattern } from '@/components/ui/BoxPattern';

// --- Work Section ---
export default function WorkSection() {
  return (
    <section className='relative bg-base-black py-10 md:py-20 overflow-hidden'>
      {/* --- Box pattern kanan bawah --- */}
      <BoxPattern
        rotate={270}
        className='bottom-0'
        style={{ right: 'max(0px, calc((100vw - 1440px) / 2))' }}
      />

      <div className='custom-container'>
        {/* --- Work Header --- */}
        <div className='flex flex-col items-center gap-2 mb-6 md:mb-16'>
          {/* Section label */}
          <span className='text-md font-medium text-primary-200 md:text-lg'>
            EXPERIENCE
          </span>

          {/* Section title */}
          <h2
            className='
            text-display-md font-extrabold text-neutral-25 text-center
            md:text-display-2xl
          '
          >
            PROFESIONAL WORK
          </h2>
        </div>

        {/* --- Work Timeline --- */}
        <WorkTimeline />
      </div>
    </section>
  );
}
