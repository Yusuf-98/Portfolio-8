import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* --- Hero Section (next step) --- */}
      <section id='hero' className='flex h-[50vh] items-center justify-center'>
        <p className='text-md text-neutral-500'>Hero Section — coming next</p>
      </section>
    </main>
  );
}
