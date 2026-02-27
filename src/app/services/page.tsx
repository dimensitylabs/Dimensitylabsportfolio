// src/app/services/page.tsx
import type { Metadata } from 'next';
import { ServicesList } from '@/components/sections/services/ServicesList';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Six disciplines, one integrated practice. Brand identity, digital experience, motion, campaigns, packaging, and editorial — with transparent pricing.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesList />
      <CTA />
    </>
  );
}
