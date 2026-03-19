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

export default function ContactPage() {
  return (
    <>
      <ContactAnimations />
      <ContactInfo formSlot={<ContactForm />} />
    </>
  );
}
