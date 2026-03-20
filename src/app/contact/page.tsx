// src/app/contact/page.tsx
import type { Metadata } from 'next';
import ContactAnimations from '@/components/ContactAnimations';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactForm } from '@/components/sections/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Dimensity Labs. Start your web development, mobile app, AI solution, or automation project today.',
  alternates: {
    canonical: 'https://www.dimensitylabs.dev/contact',
  },
  openGraph: {
    title: 'Contact | Dimensity Labs',
    description:
      'Get in touch with Dimensity Labs. Start your web development, mobile app, AI solution, or automation project today.',
    url: 'https://www.dimensitylabs.dev/contact',
    type: 'website',
    images: [
      {
        url: '/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact - Dimensity Labs',
      },
    ],
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

