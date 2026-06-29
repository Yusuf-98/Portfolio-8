'use client';

import { useRef } from 'react';
import { Experience } from '@/components/sections/Experience';
import WorkSection from '@/components/sections/WorkSection';

// --- Experience + Work wrapper ---
export default function ExperienceWorkWrapper() {
  const workRef = useRef<HTMLDivElement>(null);

  return (
    <div className=''>
      <Experience workRef={workRef} />
      <div ref={workRef}>
        <WorkSection />
      </div>
    </div>
  );
}
