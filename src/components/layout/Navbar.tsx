// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from '@/lib/data';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ThemeToggle from '@/components/ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.5, clearProps: 'y,opacity' },
    );

    const shrinkTrigger = ScrollTrigger.create({
      start: 'top -10',
      end: 99999,
      onUpdate: (self) => {
        const isScrolled = self.scroll() > 50;
        nav.classList.toggle('scrolled', self.scroll() > 20);
        gsap.to(nav, {
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
          borderBottomColor: isScrolled ? 'var(--nav-border)' : 'transparent',
          duration: 0.3,
          overwrite: 'auto',
        });
      },
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    const links = Array.from(nav.querySelectorAll<HTMLElement>('a'));
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(el, { y: -2, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
    };
    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(el, { y: 0, duration: 0.3, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' });
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
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <header>
      <nav className="site-nav">
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ThemeToggle />
            <Link href="/contact" className="btn btn--primary nav-cta">
              Start a Project
              <span>→</span>
            </Link>
          </div>

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
