// src/app/work/page.tsx
import type { Metadata } from 'next';
import WorkAnimations from '@/components/WorkAnimations';
import { ProjectGrid } from '@/components/sections/work/ProjectGrid';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'Our Work | Web, Mobile & AI Case Studies',
  description:
    'Explore case studies from Dimensity Labs across web development, mobile apps, AI solutions, and automation projects.',
  alternates: {
    canonical: 'https://dimensitylabs.com/work',
  },
  openGraph: {
    title: 'Dimensity Labs Case Studies',
    description:
      'Project examples across web, mobile, AI, and automation delivery for growth-focused teams.',
    url: 'https://dimensitylabs.com/work',
    type: 'website',
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
