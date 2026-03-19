// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { navLinks } from '@/lib/data';
import { gsap, ScrollTrigger } from '@/lib/gsap';

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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.site-nav');
    if (!nav) return;

    const entranceTween = gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.5 },
    );

    const shrinkTrigger = ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(nav, { y: -10, opacity: 0.92, duration: 0.3, ease: 'power2.out', overwrite: true });
        } else {
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: true });
        }
      },
    });

    const links = Array.from(nav.querySelectorAll<HTMLElement>('a'));
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(el, { y: -2, duration: 0.2, ease: 'power2.out', overwrite: true });
    };
    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(el, { y: 0, duration: 0.3, ease: 'elastic.out(1, 0.6)', overwrite: true });
    };
    links.forEach((link) => {
      link.addEventListener('mouseenter', onEnter);
      link.addEventListener('mouseleave', onLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onEnter);
        link.removeEventListener('mouseleave', onLeave);
      });
      shrinkTrigger.kill();
      entranceTween.kill();
    };
  }, []);

  return (
    <header>
      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <Link href="/" className="nav-logo" aria-label="Dimensity Labs Home">
            <span className="nav-logo-dot" />
            Dimensity Labs
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
