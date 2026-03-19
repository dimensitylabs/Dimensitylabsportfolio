// src/app/services/page.tsx
import type { Metadata } from 'next';
import ServicesAnimations from '@/components/ServicesAnimations';
import { ServicesList } from '@/components/sections/services/ServicesList';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'End-to-end digital services: web development, mobile apps, AI solutions, automation, and branding — with transparent pricing.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesAnimations />
      <ServicesList />
      <CTA />
    </>
  );
}
