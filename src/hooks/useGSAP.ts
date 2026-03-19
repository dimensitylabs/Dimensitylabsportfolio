"use client";

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export function useScrollReveal(
  selector: string,
  options?: gsap.TweenVars & { stagger?: number; scrollStart?: string },
) {
  useEffect(() => {
    const elements = gsap.utils.toArray<Element>(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options?.y ?? 60,
          rotateX: (options as { rotateX?: number } | undefined)?.rotateX ?? 8,
          transformOrigin: 'top center',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: options?.duration ?? 0.9,
          stagger: options?.stagger ?? 0.12,
          ease: options?.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: elements[0],
            start: options?.scrollStart ?? 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    });

    return () => ctx.revert();
  }, [options, selector]);
}

export function useParallax(selector: string, speed: number = 0.3) {
  useEffect(() => {
    const elements = gsap.utils.toArray<Element>(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.to(el, {
          yPercent: -100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector, speed]);
}
