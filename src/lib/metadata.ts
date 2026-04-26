import { Metadata } from 'next';

const BASE_URL = 'https://www.dimensitylabs.dev';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Dimensity Labs — Digital Product Studio, Mumbai',
    template: '%s | Dimensity Labs',
  },
  description:
    'Mumbai-based studio building websites, mobile apps, and AI-powered products for startups ready to scale.',
  keywords: [
    'digital agency mumbai',
    'web development company mumbai',
    'mobile app development company mumbai',
    'ai automation agency mumbai',
    'ai solutions company mumbai',
    'branding agency mumbai',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Dimensity Labs',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export function buildMetadata(overrides: Partial<Metadata>): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    title: overrides.title ?? defaultMetadata.title,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
    },
    alternates: {
      ...defaultMetadata.alternates,
      ...overrides.alternates,
    },
  };
}
