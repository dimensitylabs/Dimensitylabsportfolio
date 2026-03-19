"use client";
import { useEffect,useState } from 'react';
import { useTheme } from 'next-themes';
import { gsap } from '@/lib/gsap';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const buttonStyle = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'var(--toggle-bg)',
    border: '1px solid var(--border-default)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const iconStyle = {
    display: 'block',
    fontSize: 16,
    color: 'var(--toggle-icon)',
    lineHeight: 1,
    userSelect: 'none' as const,
  };

  if (!mounted) {
    // Return a default light mode button for SSR to prevent hydration issues
    return (
      <button
        aria-label="Switch to dark mode"
        type="button"
        style={buttonStyle}
      >
        <span className="theme-toggle-icon" style={iconStyle}>
          ☽
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
      style={buttonStyle}
    >
      <span
        className="theme-toggle-icon"
        style={iconStyle}
      >
        {isDark ? '☀︎' : '☽'}
      </span>
    </button>
  );
}
