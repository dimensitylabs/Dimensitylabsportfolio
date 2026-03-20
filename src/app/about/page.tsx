// src/app/about/page.tsx
import type { Metadata } from 'next';
import AboutAnimations from '@/components/AboutAnimations';
import { Mission } from '@/components/sections/about/Mission';
import { Stats } from '@/components/sections/about/Stats';
import { Team } from '@/components/sections/about/Team';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'About Dimensity Labs | Digital Agency in Mumbai',
  description:
    'Meet Dimensity Labs, a Mumbai digital agency focused on web development, mobile apps, AI solutions, and automation delivery.',
  alternates: {
    canonical: 'https://dimensitylabs.com/about',
  },
  openGraph: {
    title: 'About Dimensity Labs',
    description:
      'Learn about our team, process, and delivery approach for web, mobile, and AI projects.',
    url: 'https://dimensitylabs.com/about',
    type: 'website',
  },
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
