// src/components/StickyCTA.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setVisible(false);
    setDismissed(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/contact') return;

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setVisible(window.scrollY / total > 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (dismissed || pathname === '/contact') return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 18, stiffness: 220 }}
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Link
            href="/contact"
            className="btn btn--primary"
            style={{ boxShadow: '0 8px 32px rgba(14,14,14,0.18)' }}
          >
            Start a Project&nbsp;→
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss sticky button"
            type="button"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--clr-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--clr-muted)',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(14,14,14,0.1)',
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
