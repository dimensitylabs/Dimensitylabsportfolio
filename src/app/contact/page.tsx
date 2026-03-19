// src/app/contact/page.tsx
import type { Metadata } from 'next';
import ContactAnimations from '@/components/ContactAnimations';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactForm } from '@/components/sections/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with Dimensity Labs. Get in touch for web development, mobile apps, AI solutions and automations.',
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

