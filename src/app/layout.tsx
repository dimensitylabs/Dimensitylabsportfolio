// src/app/layout.tsx
import type { Metadata } from 'next';
import { Syne, Instrument_Serif, Syne_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

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
    default: 'Dimensity Labs — Creative Agency',
    template: '%s — Dimensity Labs',
  },
  description:
    'Dimensity Labs — We make the invisible, inevitable. A creative agency specialising in brand identity, digital experiences, and strategic design.',
  metadataBase: new URL('https://dimensitystudio.com'),
  openGraph: {
    title: 'Dimensity Labs — Creative Agency',
    description:
      'A boutique creative agency crafting brand identities, digital platforms, and campaign systems for companies that refuse to be ordinary.',
    url: 'https://dimensitystudio.com',
    siteName: 'Dimensity Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dimensity Labs — Creative Agency',
    description:
      'A boutique creative agency crafting brand identities, digital platforms, and campaign systems for companies that refuse to be ordinary.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://dimensitystudio.com',
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
        <div className="page-load-bar" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
