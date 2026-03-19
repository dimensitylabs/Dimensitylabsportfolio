"use client";

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function ContactAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        '.contact-heading',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' },
      ).fromTo(
        '.contact-badge',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
        '-=0.5',
      );

      gsap.fromTo(
        '.contact-info-item',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.3 },
      );

      gsap.fromTo(
        '.form-field',
        { opacity: 0, y: 25, x: -10 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
        },
      );

      const submitBtn = document.querySelector<HTMLElement>('.submit-btn');
      if (submitBtn) {
        const onMove = (e: MouseEvent) => {
          const r = submitBtn.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(submitBtn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
        };
        const onLeave = () => {
          gsap.to(submitBtn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        };

        submitBtn.addEventListener('mousemove', onMove);
        submitBtn.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          submitBtn.removeEventListener('mousemove', onMove);
          submitBtn.removeEventListener('mouseleave', onLeave);
        });
      }

      gsap.fromTo(
        '.location-card',
        { opacity: 0, y: 40, rotateX: 8, transformPerspective: 600, transformOrigin: 'top center' },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.locations-section',
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
