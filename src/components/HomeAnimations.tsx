"use client";

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function HomeAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {

      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .from('.hero-eyebrow', {
          opacity: 0,
          y: -20,
          letterSpacing: '0.4em',
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all',
        })
        .from(
          '.hero-headline',
          {
            opacity: 0,
            y: 80,
            skewY: 4,
            duration: 1.1,
            ease: 'expo.out',
            clearProps: 'all',
          },
          '-=0.4',
        )
        .from(
          '.hero-subheadline',
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.5',
        )
        .from(
          '.hero-cta',
          {
            opacity: 0,
            y: 20,
            scale: 0.96,
            duration: 0.6,
            ease: 'back.out(1.4)',
            clearProps: 'all',
          },
          '-=0.4',
        )
        .from(
          '.hero-socials a',
          {
            opacity: 0,
            x: -12,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'all',
          },
          '-=0.3',
        );

      const statElements = gsap.utils.toArray<HTMLElement>('.hero-stat-number');
      statElements.forEach((el) => {
        const initialText = el.innerText.trim();
        const suffix = initialText.replace(/[0-9]/g, '') || '+';
        const end = Number.parseInt(el.dataset.value || initialText, 10);
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => {
            if (el.parentElement) {
              gsap.from(el.parentElement, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power3.out',
                clearProps: 'all',
              });
            }
            gsap.to(obj, {
              val: end,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.innerText = `${Math.round(obj.val)}${suffix}`;
              },
            });
          },
        });
      });

      gsap.to('.marquee-track', {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.marquee-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.from('.services-heading', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'expo.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.services-heading',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.service-item', {
        opacity: 0,
        y: 40,
        x: -20,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.service-item',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.service-number', {
        opacity: 0,
        x: -30,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.service-item',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      const workCards = gsap.utils.toArray<HTMLElement>('.work-card');
      workCards.forEach((card, i) => {
        const direction = i % 2 === 0 ? 1 : -1;

        gsap.from(card, {
          opacity: 0,
          y: 60,
          rotateY: 8 * direction,
          transformOrigin: 'center center',
          transformPerspective: 1000,
          duration: 1.0,
          ease: 'expo.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.06,
        });

        const img = card.querySelector('img');
        if (!img) return;

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
          gsap.to(img, { x, y: y * 0.6, duration: 0.4, ease: 'power2.out' });
          gsap.to(card, {
            rotateY: x * 0.3,
            rotateX: -y * 0.3,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800,
          });
        };

        const onLeave = () => {
          gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' });
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.6)',
          });
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });

      gsap.from('.testimonial-card', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.testimonials-list',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.bottom-stat', {
        opacity: 0,
        x: -40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'expo.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.bottom-stats',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.bottom-cta-section', {
        opacity: 0,
        scale: 0.94,
        y: 40,
        duration: 1.0,
        ease: 'expo.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.bottom-cta-section',
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
