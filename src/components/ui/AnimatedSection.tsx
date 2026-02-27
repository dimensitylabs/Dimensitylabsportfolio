// src/components/ui/AnimatedSection.tsx
'use client';

import { useRef, useEffect } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function AnimatedSection({
  children,
  className = '',
  as = 'section',
  id,
  style,
  delay,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <div
      ref={ref}
      className={`anim-section ${className}`}
      id={id}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}s` : undefined,
      }}
      role={Tag === 'section' ? 'region' : undefined}
      data-as={Tag !== 'div' && Tag !== 'section' ? Tag : undefined}
    >
      {children}
    </div>
  );
}
