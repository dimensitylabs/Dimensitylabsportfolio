// src/app/contact/page.tsx
import type { Metadata } from 'next';
import ContactAnimations from '@/components/ContactAnimations';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactForm } from '@/components/sections/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Dimensity Labs | Start Your Project',
  description:
    'Contact Dimensity Labs in Mumbai for web development, mobile app development, AI solutions, and automation projects.',
  alternates: {
    canonical: 'https://dimensitylabs.com/contact',
  },
  openGraph: {
    title: 'Contact Dimensity Labs',
    description:
      'Start a web, mobile, AI solution, or automation project with our team.',
    url: 'https://dimensitylabs.com/contact',
    type: 'website',
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ services?: string; budget?: string }>;
}) {
  const params = await searchParams;
  const prefilledServices = params?.services ?? null;
  const prefilledBudget = params?.budget ?? null;

  return (
    <>
      <ContactAnimations />
      <ContactInfo
        formSlot={
          <ContactForm
            prefilledServices={prefilledServices}
            prefilledBudget={prefilledBudget}
          />
        }
      />
    </>
  );
}

