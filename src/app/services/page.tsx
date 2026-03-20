// src/app/services/page.tsx
import type { Metadata } from 'next';
import ServicesAnimations from '@/components/ServicesAnimations';
import { ServicesList } from '@/components/sections/services/ServicesList';
import { CTA } from '@/components/sections/home/CTA';
import { faqs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Web, Mobile App & AI Automation Services in Mumbai',
  description:
    'Web development, mobile app development, AI solutions, and AI automation services in Mumbai with transparent process and pricing.',
  keywords: [
    'web development services mumbai',
    'mobile app development services mumbai',
    'ai automation services mumbai',
    'digital agency services mumbai',
  ],
  alternates: {
    canonical: 'https://dimensitylabs.com/services',
  },
  openGraph: {
    title: 'Dimensity Labs Services | Web, Mobile & AI Automation',
    description:
      'Explore web development, mobile app, AI solutions, automation, branding, and consulting services for growth-focused businesses.',
    url: 'https://dimensitylabs.com/services',
    type: 'website',
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
