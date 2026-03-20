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
  title: 'Dimensity Labs',
  description:
    'Mumbai digital agency delivering web development, mobile app development, AI solutions, and automation for growing businesses.',
  alternates: {
    canonical: 'https://dimensitylabs.com',
  },
  openGraph: {
    title: 'Dimensity Labs',
    description:
      'Web development, mobile app development, AI solutions, and automation for growing businesses.',
    url: 'https://dimensitylabs.com',
    type: 'website',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Dimensity Labs',
      },
    ],
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
