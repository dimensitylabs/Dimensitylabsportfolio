"use client";

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function WorkAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.from('.work-page-heading', {
        opacity: 0,
        y: 70,
        duration: 1.0,
        ease: 'expo.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.work-page-heading',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.filter-pill', {
        opacity: 0,
        scale: 0.75,
        y: 10,
        stagger: 0.06,
        duration: 0.5,
        ease: 'back.out(1.7)',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.work-filters',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
      projectCards.forEach((card, i) => {
        const col = i % 3;
        const delayOffset = col * 0.08;

        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.96,
          clipPath: 'inset(20px 0px 0px 0px)',
          duration: 0.9,
          ease: 'expo.out',
          delay: delayOffset,
          clearProps: 'opacity,y,scale,clipPath',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });

        const img = card.querySelector('img');
        const overlay = card.querySelector<HTMLElement>('.card-overlay');

        const onEnter = () => {
          if (img) gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' });
          if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.4 });
          gsap.to(card, {
            y: -6,
            boxShadow: 'var(--shadow-lg)',
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

      gsap.from('.project-tag', {
        opacity: 0,
        x: -12,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.work-grid',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      cleanupFns.forEach((fn) => fn());
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  return null;
}
