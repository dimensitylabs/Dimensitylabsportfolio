// src/app/about/page.tsx
import type { Metadata } from 'next';
import { Mission } from '@/components/sections/about/Mission';
import { Stats } from '@/components/sections/about/Stats';
import { Team } from '@/components/sections/about/Team';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Dimensity Labs is a twelve-person creative agency in Oslo. We specialise in brand identity, digital design, and creative campaigns for companies that take design seriously.',
};

export default function AboutPage() {
  return (
    <>
      <Mission />
      <Stats />
      <Team />
      <CTA />
    </>
  );
}
