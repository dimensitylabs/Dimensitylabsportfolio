// src/app/contact/page.tsx
import type { Metadata } from 'next';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactForm } from '@/components/sections/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with Dimensity Labs. Get in touch for brand identity, digital design, campaigns, and more. Currently booking Q2 2026.',
};

export default function ContactPage() {
  return (
    <ContactInfo formSlot={<ContactForm />} />
  );
}
