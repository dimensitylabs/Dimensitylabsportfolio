// src/app/work/page.tsx
import type { Metadata } from 'next';
import WorkAnimations from '@/components/WorkAnimations';
import { ProjectGrid } from '@/components/sections/work/ProjectGrid';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Projects from Dimensity Labs. Web development, mobile apps, AI solutions, automation, and branding.',
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
