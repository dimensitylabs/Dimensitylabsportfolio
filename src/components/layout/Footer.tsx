"use client";
// src/components/layout/Footer.tsx
import Link from 'next/link';
import { socialLinks } from '@/lib/data';

function SocialIcon({ platform }: { platform: string }) {
  const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (platform) {
    case 'Instagram':
      return (
        <svg {...base}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'Twitter/X':
      return (
        <svg {...base}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg {...base}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'Dribbble':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72M10.17 2.05c3.74 5.1 5.47 9.38 6.92 14.23M2 11.5h10c2.5 0 5.5-.5 8-.5" />
        </svg>
      );
    case 'Behance':
      return (
        <svg {...base}>
          <path d="M3 6h7c1.66 0 3 1.34 3 3s-1.34 3-3 3H3V6zm0 6h8c1.66 0 3 1.34 3 3s-1.34 3-3 3H3v-6z" />
          <path d="M16 8h6M19 6v4" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="nav-logo" aria-label="Dimensity Labs Home">
              <span className="nav-logo-dot" />
              Dimensity Labs
            </Link>
            <p className="footer-tagline">
              Building the Digital Future. Websites, Apps, AI Solutions &amp; Automations for businesses ready to scale.
            </p>
            <div className="footer-socials">
              {socialLinks.map((s) => (
                <a
                  key={s.abbr}
                  href={s.href}
                  className="footer-social-link"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon platform={s.label} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-col-title">Navigation</p>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/work">Our Work</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              <li><Link href="/services">Web Development</Link></li>
              <li><Link href="/services">Mobile Apps</Link></li>
              <li><Link href="/services">AI Solutions</Link></li>
              <li><Link href="/services">AI Automation</Link></li>
              <li><Link href="/services">Digital Branding</Link></li>
              <li><Link href="/services">Consulting</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Studio</p>
            <ul className="footer-links">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/about#team">The Team</Link></li>
              <li><Link href="/about#values">Values</Link></li>
              <li><Link href="/contact">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Dimensity Labs. All rights reserved.</p>
          <nav className="footer-bottom-links" aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <a href="#" onClick={(e) => e.preventDefault()}>Cookie Settings</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
