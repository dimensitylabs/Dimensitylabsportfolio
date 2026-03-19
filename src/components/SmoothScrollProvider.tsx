"use client";

import { useEffect, useRef } from 'react';
import { ScrollSmoother, ScrollTrigger } from '@/lib/gsap';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    smoother.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.4,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      id="smooth-wrapper"
      style={{
        overflow: 'hidden',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
      }}
    >
      <div id="smooth-content">{children}</div>
    </div>
  );
}
