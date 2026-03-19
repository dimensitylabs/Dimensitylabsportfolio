"use client";

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none' });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
    };

    const expandCursor = () => {
      gsap.to(dot.current, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(ring.current, { scale: 1.6, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
    };

    const shrinkCursor = () => {
      gsap.to(dot.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
      gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    };

    window.addEventListener('mousemove', moveCursor);
    const interactives = Array.from(
      document.querySelectorAll<HTMLElement>('a, button, [role=button]'),
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', expandCursor);
      el.addEventListener('mouseleave', shrinkCursor);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', expandCursor);
        el.removeEventListener('mouseleave', shrinkCursor);
      });
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
