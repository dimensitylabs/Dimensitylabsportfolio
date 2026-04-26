// src/app/about/page.tsx
import type { Metadata } from 'next';
import AboutAnimations from '@/components/AboutAnimations';
import dynamic from 'next/dynamic';
import { Mission } from '@/components/sections/about/Mission';

const Stats = dynamic(() => import('@/components/sections/about/Stats').then((m) => m.Stats));
const Team = dynamic(() => import('@/components/sections/about/Team').then((m) => m.Team));
const CTA = dynamic(() => import('@/components/sections/home/CTA').then((m) => m.CTA));

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the team behind Dimensity Labs. A Mumbai digital agency focused on web development, mobile apps, AI solutions, and automation.',
  alternates: {
    canonical: 'https://www.dimensitylabs.dev/about',
  },
  openGraph: {
    title: 'About | Dimensity Labs',
    description:
      'Meet the team behind Dimensity Labs. A Mumbai digital agency focused on web development, mobile apps, AI solutions, and automation.',
    url: 'https://www.dimensitylabs.dev/about',
    type: 'website',
    images: [
      {
        url: '/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About Dimensity Labs',
      },
    ],
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
