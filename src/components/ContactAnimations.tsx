"use client";

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function ContactAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-heading',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
      tl.from('.contact-heading', {
        opacity: 0,
        y: 60,
        duration: 1.0,
        ease: 'expo.out',
        clearProps: 'all',
      }).from(
        '.contact-badge',
        {
          opacity: 0,
          scale: 0.85,
          duration: 0.5,
          ease: 'back.out(1.5)',
          clearProps: 'all',
        },
        '-=0.5',
      );

      gsap.from('.contact-info-item', {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.contact-info-item',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.form-field', {
        opacity: 0,
        y: 25,
        x: -10,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

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

      gsap.from('.location-card', {
        opacity: 0,
        y: 40,
        rotateX: 8,
        transformPerspective: 600,
        transformOrigin: 'top center',
        stagger: 0.12,
        duration: 0.8,
        ease: 'expo.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.locations-section',
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
