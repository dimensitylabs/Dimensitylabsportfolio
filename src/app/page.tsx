// src/app/page.tsx
import type { Metadata } from 'next';
import HomeAnimations from '@/components/HomeAnimations';
import Preloader from '@/components/Preloader';
import { Hero } from '@/components/sections/home/Hero';
import { Services } from '@/components/sections/home/Services';
import { FeaturedWork } from '@/components/sections/home/FeaturedWork';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { CTA } from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  title: 'Digital Agency in Mumbai for Web, Mobile & AI',
  description:
    'Dimensity Labs is a Mumbai digital agency delivering web development, mobile app development, AI solutions, and automation for growing businesses.',
  keywords: [
    'digital agency mumbai',
    'web development company mumbai',
    'mobile app development company mumbai',
    'ai automation agency mumbai',
  ],
  alternates: {
    canonical: 'https://dimensitylabs.com',
  },
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HomeAnimations />
      <Hero />
      <Services />
      <FeaturedWork />
      <Testimonials />
      <CTA />
    </>
  );
}
