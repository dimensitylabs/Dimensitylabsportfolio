// src/app/about/page.tsx
import type { Metadata } from 'next';
import AboutAnimations from '@/components/AboutAnimations';
import { Mission } from '@/components/sections/about/Mission';
import { Stats } from '@/components/sections/about/Stats';
import { Team } from '@/components/sections/about/Team';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Dimensity Labs is a Mumbai-based digital agency building websites, mobile apps, AI solutions and automations.',
};

export default function AboutPage() {
  return (
    <>
      <AboutAnimations />
      <Mission />
      <Stats />
      <Team />
      <CTA />
    </>
  );
}
