// src/app/page.tsx
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HomeAnimations from '@/components/HomeAnimations';
import { Hero } from '@/components/sections/home/Hero';

const Services = dynamic(() => import('@/components/sections/home/Services').then((m) => m.Services), {
  loading: () => <div className="skeleton-block" style={{ height: '400px', borderRadius: 'var(--radius-md)' }} />,
});
const FeaturedWork = dynamic(() => import('@/components/sections/home/FeaturedWork').then((m) => m.FeaturedWork), {
  loading: () => <div className="skeleton-block" style={{ height: '400px', borderRadius: 'var(--radius-md)' }} />,
});
const Testimonials = dynamic(() => import('@/components/sections/home/Testimonials').then((m) => m.Testimonials), {
  loading: () => <div className="skeleton-block" style={{ height: '300px', borderRadius: 'var(--radius-md)' }} />,
});
const CTA = dynamic(() => import('@/components/sections/home/CTA').then((m) => m.CTA), {
  loading: () => <div className="skeleton-block" style={{ height: '200px', borderRadius: 'var(--radius-md)' }} />,
});

export const metadata: Metadata = {
  title: 'Dimensity Labs',
  description:
    'Mumbai digital agency delivering web development, mobile app development, AI solutions, and automation for growing businesses.',
  alternates: {
    canonical: 'https://www.dimensitylabs.dev',
  },
  openGraph: {
    title: 'Dimensity Labs',
    description:
      'Web development, mobile app development, AI solutions, and automation for growing businesses.',
    url: 'https://www.dimensitylabs.dev',
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
      <HomeAnimations />
      <Hero />
      <Services />
      <FeaturedWork />
      <Testimonials />
      <CTA />
    </>
  );
}
