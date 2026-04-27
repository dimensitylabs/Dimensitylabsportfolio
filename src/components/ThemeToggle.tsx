"use client";
import { useTheme } from 'next-themes';
import { gsap } from '@/lib/gsap';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = (theme ?? 'light') === 'dark';

  const handleToggle = () => {
    gsap.to('.theme-toggle-icon', {
      rotate: 180,
      scale: 0.6,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setTheme(isDark ? 'light' : 'dark');
        gsap.fromTo(
          '.theme-toggle-icon',
          { rotate: -180, scale: 0.6, opacity: 0 },
          { rotate: 0, scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' },
        );
      },
    });
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
      className="theme-toggle-btn"
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--toggle-bg)',
        border: '1px solid var(--border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'var(--toggle-icon)',
      }}
    >
      <span
        className="theme-toggle-icon"
        suppressHydrationWarning
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
