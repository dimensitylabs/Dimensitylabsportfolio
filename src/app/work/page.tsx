// src/app/work/page.tsx
import type { Metadata } from 'next';
import { ProjectGrid } from '@/components/sections/work/ProjectGrid';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from Dimensity Labs Labs, 2021–2024. Brand identity, digital design, campaign, editorial, and packaging work.',
};

export default function WorkPage() {
  return (
    <>
      <ProjectGrid />
      <CTA />
    </>
  );
}
