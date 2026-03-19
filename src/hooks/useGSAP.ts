"use client";

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function useScrollReveal(
  selector: string,
  options?: gsap.TweenVars & { stagger?: number; scrollStart?: string },
) {
  useEffect(() => {
    const elements = gsap.utils.toArray<Element>(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.defaults({ markers: false });
      ScrollTrigger.refresh();

      gsap.from(elements, {
        opacity: 0,
        y: options?.y ?? 60,
        rotateX: (options as { rotateX?: number } | undefined)?.rotateX ?? 8,
        transformOrigin: 'top center',
        duration: options?.duration ?? 0.9,
        stagger: options?.stagger ?? 0.12,
        ease: options?.ease ?? 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: elements[0],
          start: options?.scrollStart ?? 'top 88%',
          toggleActions: 'play none none none',
        },
      });
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
