"use client";

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function AboutAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.from('.about-headline', {
        opacity: 0,
        y: 70,
        skewY: 3,
        duration: 1.1,
        ease: 'expo.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.about-headline',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.about-intro-text', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.about-intro-text',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

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

      gsap.from('.about-stat', {
        opacity: 0,
        y: 30,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.2)',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.about-stat',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      const timelineItems = gsap.utils.toArray<Element>('.timeline-item');
      timelineItems.forEach((item, i) => {
        const dir = i % 2 === 0 ? -60 : 60;
        gsap.from(item, {
          opacity: 0,
          x: dir,
          y: 20,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 90%',
            end: 'bottom 50%',
            scrub: 1,
          },
        },
      );

      gsap.from('.value-card', {
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.team-card', {
        opacity: 0,
        rotateX: 15,
        y: 50,
        transformPerspective: 800,
        transformOrigin: 'top center',
        stagger: 0.1,
        duration: 0.9,
        ease: 'expo.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

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
