"use client";

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function WorkAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-page-heading',
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', delay: 0.1 },
      );

      gsap.fromTo(
        '.filter-pill',
        { opacity: 0, scale: 0.75, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'back.out(1.7)',
          delay: 0.3,
        },
      );

      const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
      projectCards.forEach((card, i) => {
        const col = i % 3;
        const delayOffset = col * 0.08;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.96,
            clipPath: 'inset(20px 0px 0px 0px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: 'inset(0px 0px 0px 0px)',
            duration: 0.9,
            ease: 'expo.out',
            delay: delayOffset,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        const img = card.querySelector('img');
        const overlay = card.querySelector<HTMLElement>('.card-overlay');

        const onEnter = () => {
          if (img) gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' });
          if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4 });
          gsap.to(card, {
            y: -6,
            boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        const onLeave = () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: 'expo.out' });
          if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
          gsap.to(card, { y: 0, boxShadow: 'none', duration: 0.6, ease: 'expo.out' });
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
        });
      });

      gsap.fromTo(
        '.project-tag',
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.work-grid',
            start: 'top 80%',
          },
        },
      );
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return null;
}
