"use client";

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function ServicesAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.services-page-heading',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
      headerTl
        .from('.services-page-heading', {
          opacity: 0,
          y: 80,
          rotateX: 10,
          transformOrigin: 'top center',
          transformPerspective: 600,
          duration: 1.1,
          ease: 'expo.out',
          clearProps: 'all',
        })
        .from(
          '.services-page-sub',
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.5',
        );

      const serviceBlocks = gsap.utils.toArray<Element>('.service-block');
      serviceBlocks.forEach((block, i) => {
        const fromX = i % 2 === 0 ? -50 : 50;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });

        const numberEl = block.querySelector('.service-block-number');
        const titleEl = block.querySelector('.service-block-title');
        const tagEls = block.querySelectorAll('.service-block-tag');
        const bodyEl = block.querySelector('.service-block-body');

        if (numberEl) {
          tl.from(numberEl, {
            opacity: 0,
            x: fromX * 0.5,
            y: -10,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'all',
          });
        }

        if (titleEl) {
          tl.from(
            titleEl,
            {
              opacity: 0,
              x: fromX,
              duration: 0.8,
              ease: 'expo.out',
              clearProps: 'all',
            },
            '-=0.3',
          );
        }

        if (tagEls.length > 0) {
          tl.from(
            tagEls,
            {
              opacity: 0,
              scale: 0.8,
              y: 10,
              stagger: 0.05,
              duration: 0.4,
              ease: 'back.out(1.5)',
              clearProps: 'all',
            },
            '-=0.4',
          );
        }

        if (bodyEl) {
          tl.from(
            bodyEl,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'all',
            },
            '-=0.3',
          );
        }
      });

      gsap.fromTo(
        '.process-connector',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 88%',
            end: 'bottom 60%',
            scrub: 1,
          },
        },
      );

      const processSteps = gsap.utils.toArray<Element>('.process-step');
      processSteps.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.15,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      const pricingCards = gsap.utils.toArray<HTMLElement>('.pricing-card');
      pricingCards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          rotateY: i % 2 === 0 ? -6 : 6,
          transformPerspective: 900,
          duration: 1.0,
          ease: 'expo.out',
          delay: i * 0.15,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.pricing-section',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });

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

      gsap.from('.calc-service-btn', {
        opacity: 0,
        scale: 0.92,
        y: 20,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.4)',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '#pricing-calculator',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.calc-feature-btn', {
        opacity: 0,
        x: -15,
        stagger: 0.04,
        duration: 0.4,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '#pricing-calculator',
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.faq-item', {
        opacity: 0,
        y: 25,
        x: -15,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.faq-section',
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
