"use client";
// src/components/layout/Footer.tsx
import Link from 'next/link';
import { socialLinks } from '@/lib/data';

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
                >
                  {s.abbr}
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
