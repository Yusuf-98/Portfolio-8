'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, MotionValue, motion } from 'framer-motion';
import WorkBubble from './WorkBubble';
import WorkCard from './WorkCard';

// --- Work data ---
const workData = [
  {
    id: 1,
    year: '2020 - 2022',
    title: 'Frontend Developer',
    description:
      'Builds responsive and high-performance web applications with clean, maintainable code. Expert in translating UI/UX designs into pixel-perfect interfaces using modern frameworks. Focused on optimizing performance, accessibility, and seamless user experiences',
    logo: '/images/upwork.png',
    logoAlt: 'Upwork',
  },
  {
    id: 2,
    year: '2020 - 2022',
    title: 'Frontend Developer',
    description:
      'Builds responsive and high-performance web applications with clean, maintainable code. Expert in translating UI/UX designs into pixel-perfect interfaces using modern frameworks. Focused on optimizing performance, accessibility, and seamless user experiences',
    logo: '/images/trello.png',
    logoAlt: 'Trello',
  },
  {
    id: 3,
    year: '2020 - 2022',
    title: 'Frontend Developer',
    description:
      'Builds responsive and high-performance web applications with clean, maintainable code. Expert in translating UI/UX designs into pixel-perfect interfaces using modern frameworks. Focused on optimizing performance, accessibility, and seamless user experiences',
    logo: '/images/zoom.png',
    logoAlt: 'Zoom',
  },
  {
    id: 4,
    year: '2020 - 2022',
    title: 'Frontend Developer',
    description:
      'Builds responsive and high-performance web applications with clean, maintainable code. Expert in translating UI/UX designs into pixel-perfect interfaces using modern frameworks. Focused on optimizing performance, accessibility, and seamless user experiences',
    logo: '/images/zapier.png',
    logoAlt: 'Zapier',
  },
];

// --- Phase values desktop ---
const PHASES_DESKTOP = {
  fill_b1: [0.0, 0.053],
  garis_12: [0.053, 0.316],
  fill_b2: [0.316, 0.368],
  garis_23: [0.368, 0.631],
  fill_b3: [0.631, 0.684],
  garis_34: [0.684, 0.947],
  fill_b4: [0.947, 1.0],
};

// --- Phase values mobile ---
const PHASES_MOBILE = {
  fill_b1: [0.0, 0.036],
  garis_12: [0.036, 0.321],
  fill_b2: [0.321, 0.357],
  garis_23: [0.357, 0.643],
  fill_b3: [0.643, 0.679],
  garis_34: [0.679, 0.964],
  fill_b4: [0.964, 1.0],
};

type Phases = typeof PHASES_MOBILE;

interface SegmentGeometry {
  top: number;
  height: number;
}

// --- Line segment ---
interface LineSegmentProps {
  progress: MotionValue<number>;
  phaseStart: number;
  phaseEnd: number;
  top: number;
  height: number;
}

function LineSegment({
  progress,
  phaseStart,
  phaseEnd,
  top,
  height,
}: LineSegmentProps) {
  const scaleY = useTransform(progress, [phaseStart, phaseEnd], [0, 1]);
  return (
    <motion.div
      style={{
        scaleY,
        transformOrigin: 'top',
        position: 'absolute',
        top,
        height,
        left: 0,
        width: '100%',
      }}
      className='bg-primary-200'
    />
  );
}

// --- Work Timeline ---
export default function WorkTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineWrapperRef = useRef<HTMLDivElement>(null);
  const mobileBubbleRefs = useRef<(HTMLDivElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const desktopBubbleRefs = useRef<(HTMLDivElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const [phases, setPhases] = useState<Phases>(PHASES_MOBILE);
  const [segments, setSegments] = useState<SegmentGeometry[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 50%', 'end 50%'],
  });

  const updateLinePosition = useCallback(() => {
    if (!containerRef.current || !lineWrapperRef.current) return;

    const isMobileNow = window.innerWidth < 768;
    const activeRefs = isMobileNow
      ? mobileBubbleRefs.current
      : desktopBubbleRefs.current;

    const bubbleRects = activeRefs.map((ref) =>
      ref ? ref.getBoundingClientRect() : null
    );
    if (bubbleRects.some((r) => r === null)) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const bubbleCenterX =
      bubbleRects[0]!.left - containerRect.left + bubbleRects[0]!.width / 2;

    const centerYs = bubbleRects.map(
      (rect) => rect!.top - containerRect.top + rect!.height / 2
    );

    const gTop = centerYs[0];
    const gBottom = centerYs[3];
    const gHeight = gBottom - gTop;

    // Direct DOM update — bypass React render cycle
    const el = lineWrapperRef.current;
    el.style.left = `${bubbleCenterX}px`;
    el.style.top = `${gTop}px`;
    el.style.height = `${gHeight}px`;
    el.style.display = gHeight > 0 ? 'block' : 'none';

    // Segments hanya update via state (tidak perlu secepat posisi)
    const segs: SegmentGeometry[] = [];
    for (let i = 0; i < 3; i++) {
      const fromBottom = bubbleRects[i]!.bottom - containerRect.top - gTop;
      const toTop = bubbleRects[i + 1]!.top - containerRect.top - gTop;
      segs.push({ top: fromBottom, height: toTop - fromBottom });
    }

    const newPhases = isMobileNow ? PHASES_MOBILE : PHASES_DESKTOP;
    setPhases(newPhases);
    setSegments(segs);
  }, []);

  useEffect(() => {
    updateLinePosition();
    window.addEventListener('resize', updateLinePosition);
    const observer = new ResizeObserver(updateLinePosition);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      window.removeEventListener('resize', updateLinePosition);
      observer.disconnect();
    };
  }, [updateLinePosition]);

  const segmentPhases = [
    { start: phases.garis_12[0], end: phases.garis_12[1] },
    { start: phases.garis_23[0], end: phases.garis_23[1] },
    { start: phases.garis_34[0], end: phases.garis_34[1] },
  ];

  return (
    <div ref={containerRef} className='relative w-full'>
      {/* --- Garis: direct DOM position --- */}
      <div
        ref={lineWrapperRef}
        className='absolute w-px pointer-events-none z-0 -translate-x-1/2'
        style={{ display: 'none' }}
      >
        <div className='absolute inset-0 bg-neutral-800' />
        {segments.map((seg, i) => (
          <LineSegment
            key={i}
            progress={scrollYProgress}
            phaseStart={segmentPhases[i].start}
            phaseEnd={segmentPhases[i].end}
            top={seg.top}
            height={seg.height}
          />
        ))}
      </div>

      {/* --- Work items --- */}
      <div className='flex flex-col gap-4 md:gap-0'>
        {workData.map((item, index) => {
          const isEven = index % 2 === 1;
          const fillPhaseKey = `fill_b${item.id}` as keyof Phases;

          return (
            <div
              key={item.id}
              className='relative flex items-center gap-4 md:gap-0'
            >
              {/* --- Mobile: bubble kiri + card kanan --- */}
              <div className='md:hidden shrink-0 self-center'>
                <WorkBubble
                  ref={(el) => {
                    mobileBubbleRefs.current[index] = el;
                  }}
                  number={item.id}
                  progress={scrollYProgress}
                  phaseStart={phases[fillPhaseKey][0]}
                  phaseEnd={phases[fillPhaseKey][1]}
                />
              </div>
              <div className='md:hidden flex-1'>
                <WorkCard
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  logo={item.logo}
                  logoAlt={item.logoAlt}
                  index={index}
                />
              </div>

              {/* --- Desktop --- */}
              <div className='hidden md:block w-[calc(50%-54px)] lg:w-[calc(50%-88px)] shrink-0'>
                {isEven && (
                  <WorkCard
                    year={item.year}
                    title={item.title}
                    description={item.description}
                    logo={item.logo}
                    logoAlt={item.logoAlt}
                    index={index}
                  />
                )}
              </div>

              {/* Spacer kiri */}
              <div className='hidden md:block w-[30px] lg:w-16 shrink-0' />

              {/* Bubble desktop */}
              <div className='hidden md:flex shrink-0 z-10'>
                <WorkBubble
                  ref={(el) => {
                    desktopBubbleRefs.current[index] = el;
                  }}
                  number={item.id}
                  progress={scrollYProgress}
                  phaseStart={phases[fillPhaseKey][0]}
                  phaseEnd={phases[fillPhaseKey][1]}
                />
              </div>

              {/* Spacer kanan */}
              <div className='hidden md:block w-[30px] lg:w-16 shrink-0' />

              <div className='hidden md:block w-[calc(50%-54px)] lg:w-[calc(50%-88px)] shrink-0'>
                {!isEven && (
                  <WorkCard
                    year={item.year}
                    title={item.title}
                    description={item.description}
                    logo={item.logo}
                    logoAlt={item.logoAlt}
                    index={index}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
