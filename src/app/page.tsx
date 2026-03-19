// src/app/page.tsx
import HomeAnimations from '@/components/HomeAnimations';
import { Hero } from '@/components/sections/home/Hero';
import { Services } from '@/components/sections/home/Services';
import { FeaturedWork } from '@/components/sections/home/FeaturedWork';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { CTA } from '@/components/sections/home/CTA';

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
