"use client";

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export default function ServicesAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const headerTl = gsap.timeline({ delay: 0.15 });
      headerTl
        .fromTo(
          '.services-page-heading',
          {
            opacity: 0,
            y: 80,
            rotateX: 10,
            transformOrigin: 'top center',
            transformPerspective: 600,
          },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.1, ease: 'expo.out' },
        )
        .fromTo(
          '.services-page-sub',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5',
        );

      const serviceBlocks = gsap.utils.toArray<Element>('.service-block');
      serviceBlocks.forEach((block, i) => {
        const fromX = i % 2 === 0 ? -50 : 50;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          block.querySelector('.service-block-number'),
          { opacity: 0, x: fromX * 0.5, y: -10 },
          { opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power2.out' },
        )
          .fromTo(
            block.querySelector('.service-block-title'),
            { opacity: 0, x: fromX },
            { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' },
            '-=0.3',
          )
          .fromTo(
            block.querySelectorAll('.service-block-tag'),
            { opacity: 0, scale: 0.8, y: 10 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.4,
              ease: 'back.out(1.5)',
            },
            '-=0.4',
          )
          .fromTo(
            block.querySelector('.service-block-body'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3',
          );
      });

      gsap.fromTo(
        '.process-connector',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 1,
          },
        },
      );

      const processSteps = gsap.utils.toArray<Element>('.process-step');
      processSteps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: '.process-section',
              start: 'top 80%',
            },
          },
        );
      });

      const pricingCards = gsap.utils.toArray<HTMLElement>('.pricing-card');
      pricingCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateY: i % 2 === 0 ? -6 : 6,
            transformPerspective: 900,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1.0,
            ease: 'expo.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: '.pricing-section',
              start: 'top 80%',
            },
          },
        );

        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
          gsap.to(card, {
            rotateY: x,
            rotateX: -y,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 900,
          });
        };

        const onLeave = () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.7, ease: 'expo.out' });
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });

      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 25, x: -15 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
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
