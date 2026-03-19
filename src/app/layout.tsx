// src/app/layout.tsx
import type { Metadata } from 'next';
import { Syne, Instrument_Serif, Syne_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
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
    default: 'Dimensity Labs — Digital Agency',
    template: '%s — Dimensity Labs',
  },
  description:
    'Mumbai-based digital agency building websites, mobile apps, AI solutions and automations for startups and businesses ready to scale.',
  metadataBase: new URL('https://dimensitylabs.com'),
  openGraph: {
    title: 'Dimensity Labs — Digital Agency',
    description:
      'Mumbai-based digital agency building websites, mobile apps, AI solutions and automations for startups and businesses ready to scale.',
    url: 'https://dimensitylabs.com',
    siteName: 'Dimensity Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dimensity Labs — Digital Agency',
    description:
      'Mumbai-based digital agency building websites, mobile apps, AI solutions and automations for startups and businesses ready to scale.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://dimensitylabs.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${instrumentSerif.variable} ${syneMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-instrument), Georgia, serif' }}
      >
        <CustomCursor />
        <SmoothScrollProvider>
          <div className="page-load-bar" aria-hidden="true" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
