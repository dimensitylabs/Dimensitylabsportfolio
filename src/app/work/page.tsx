// src/app/work/page.tsx
import type { Metadata } from 'next';
import WorkAnimations from '@/components/WorkAnimations';
import { ProjectGrid } from '@/components/sections/work/ProjectGrid';
import dynamic from 'next/dynamic';

const CTA = dynamic(() => import('@/components/sections/home/CTA').then((m) => m.CTA));

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Explore case studies from Dimensity Labs. Web development, mobile apps, AI solutions, and automation projects.',
  alternates: {
    canonical: 'https://www.dimensitylabs.dev/work',
  },
  openGraph: {
    title: 'Work | Dimensity Labs',
    description:
      'Explore case studies from Dimensity Labs. Web development, mobile apps, AI solutions, and automation projects.',
    url: 'https://www.dimensitylabs.dev/work',
    type: 'website',
    images: [
      {
        url: '/og-work.png',
        width: 1200,
        height: 630,
        alt: 'Work - Dimensity Labs',
      },
    ],
  },
};

export default function WorkPage() {
  return (
    <>
      <WorkAnimations />
      <ProjectGrid />
      <CTA prefix="Your project could be next." emphasis="Let's talk." />
    </>
  );
}
