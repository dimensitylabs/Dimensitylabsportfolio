// src/app/layout.tsx
import type { Metadata } from 'next';
import { Syne, Instrument_Serif, Syne_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CustomCursor from '@/components/CustomCursor';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const syneMono = Syne_Mono({
  variable: '--font-syne-mono',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Dimensity Labs',
    template: '%s | Dimensity Labs',
  },
  description:
    'Mumbai digital agency for web development, mobile app development, AI solutions, and automation systems built for growth.',
  keywords: [
    'digital agency mumbai',
    'web development company mumbai',
    'mobile app development company mumbai',
    'ai automation agency mumbai',
    'ai solutions company mumbai',
    'branding agency mumbai',
  ],
  metadataBase: new URL('https://www.dimensitylabs.dev'),
  openGraph: {
    title: 'Dimensity Labs',
    description:
      'Web development, mobile app development, AI solutions, and workflow automation for startups and growing businesses.',
    url: 'https://www.dimensitylabs.dev',
    siteName: 'Dimensity Labs',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dimensity Labs - Web, Mobile & AI Automation Agency in Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dimensity Labs',
    description:
      'Web development, mobile app development, AI solutions, and workflow automation for startups and growing businesses.',
    images: ['/og-image.png'],
    site: '@dimensitylabs',
    creator: '@dimensitylabs',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.dimensitylabs.dev',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dimensity Labs',
  url: 'https://www.dimensitylabs.dev',
  logo: 'https://www.dimensitylabs.dev/favicon.ico',
  description:
    'Digital agency in Mumbai offering web development, mobile app development, AI solutions, and workflow automation.',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Dimensity Labs',
  image: 'https://www.dimensitylabs.dev/favicon.ico',
  url: 'https://www.dimensitylabs.dev',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressCountry: 'IN',
  },
  areaServed: ['Mumbai', 'India', 'Global'],
  serviceType: [
    'Web Development',
    'Mobile App Development',
    'AI Solutions',
    'AI Automation',
    'Digital Branding',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${instrumentSerif.variable} ${syneMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-instrument), Georgia, serif' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="dimensity-theme-v2"
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
          <div className="page-load-bar" aria-hidden="true" />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
