// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { navLinks } from '@/lib/data';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header>
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <Link href="/" className="nav-logo" aria-label="Dimensity Labs Home">
            <span className="nav-logo-dot" />
            Dimensity 
          </Link>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn btn--primary nav-cta">
            Start a Project
            <span>→</span>
          </Link>

          <button
            className={`hamburger-btn${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu-overlay${mobileOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'active' : ''}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="btn btn--primary"
          onClick={() => setMobileOpen(false)}
          style={{ marginTop: '1rem' }}
        >
          Start a Project <span>→</span>
        </Link>
      </div>
    </header>
  );
}
