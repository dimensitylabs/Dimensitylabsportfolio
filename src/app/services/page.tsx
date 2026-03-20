// src/app/services/page.tsx
import type { Metadata } from 'next';
import ServicesAnimations from '@/components/ServicesAnimations';
import { ServicesList } from '@/components/sections/services/ServicesList';
import { CTA } from '@/components/sections/home/CTA';
import { faqs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web development, mobile app development, AI solutions, and AI automation services with transparent process and pricing.',
  alternates: {
    canonical: 'https://dimensitylabs.com/services',
  },
  openGraph: {
    title: 'Services | Dimensity Labs',
    description:
      'Web development, mobile app development, AI solutions, and AI automation services with transparent process and pricing.',
    url: 'https://dimensitylabs.com/services',
    type: 'website',
    images: [
      {
        url: '/og-services.png',
        width: 1200,
        height: 630,
        alt: 'Services - Dimensity Labs',
      },
    ],
  },
};

export default function ServicesPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesAnimations />
      <ServicesList />
      <CTA />
    </>
  );
}
