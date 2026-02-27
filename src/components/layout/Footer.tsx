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
              Dimensity 
            </Link>
            <p className="footer-tagline">
              We make the invisible, inevitable. A creative studio that builds
              brands for companies that refuse to be ordinary.
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
              <li><Link href="/services">Brand Identity</Link></li>
              <li><Link href="/services">Digital Design</Link></li>
              <li><Link href="/services">Motion Design</Link></li>
              <li><Link href="/services">Campaigns</Link></li>
              <li><Link href="/services">Packaging</Link></li>
              <li><Link href="/services">Editorial</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Studio</p>
            <ul className="footer-links">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/about#team">The Team</Link></li>
              <li><Link href="/about#values">Values</Link></li>
              <li><Link href="/contact">Careers</Link></li>
              <li><Link href="/contact">Press Kit</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Dimensity Labs. All rights reserved.</p>
          <nav className="footer-bottom-links" aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Settings</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
