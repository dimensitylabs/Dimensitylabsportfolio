"use client";

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function AboutAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-headline',
        { opacity: 0, y: 70, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'expo.out', delay: 0.1 },
      );

      gsap.fromTo(
        '.about-intro-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-intro-text', start: 'top 85%' },
        },
      );

      gsap.to('.about-intro-image', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-intro-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.fromTo(
        '.about-stat',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.about-stat', start: 'top 85%' },
        },
      );

      const timelineItems = gsap.utils.toArray<Element>('.timeline-item');
      timelineItems.forEach((item, i) => {
        const dir = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(
          item,
          { opacity: 0, x: dir, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.team-card',
        {
          opacity: 0,
          rotateX: 15,
          y: 50,
          transformPerspective: 800,
          transformOrigin: 'top center',
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      document.querySelectorAll<HTMLElement>('.team-card').forEach((card) => {
        const img = card.querySelector('img');
        if (!img) return;

        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
          gsap.to(img, {
            scale: 1.06,
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        const onLeave = () => {
          gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.7, ease: 'expo.out' });
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return null;
}
