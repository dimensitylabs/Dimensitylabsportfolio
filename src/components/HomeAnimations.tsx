"use client";

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function HomeAnimations() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];
    let originalQuoteText: string | null = null;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl
        .fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: -20, letterSpacing: '0.4em' },
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0.1em',
            duration: 0.8,
            ease: 'power2.out',
          },
        )
        .fromTo(
          '.hero-headline',
          { opacity: 0, y: 80, skewY: 4, transformOrigin: 'left bottom' },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'expo.out' },
          '-=0.4',
        )
        .fromTo(
          '.hero-subheadline',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5',
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
          '-=0.4',
        )
        .fromTo(
          '.hero-socials a',
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
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
          start: 'top 85%',
          onEnter: () => {
            if (el.parentElement) {
              gsap.fromTo(
                el.parentElement,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
              );
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

      gsap.fromTo(
        '.services-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.services-heading', start: 'top 80%' },
        },
      );

      gsap.fromTo(
        '.service-item',
        { opacity: 0, y: 40, x: -20 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.service-item',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.service-number',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.service-item', start: 'top 80%' },
        },
      );

      const workCards = gsap.utils.toArray<HTMLElement>('.work-card');
      workCards.forEach((card, i) => {
        const direction = i % 2 === 0 ? 1 : -1;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateY: 8 * direction,
            transformOrigin: 'center center',
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1.0,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.06,
          },
        );

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

      const quoteEl = document.querySelector<HTMLElement>('.manifesto-quote');
      if (quoteEl) {
        originalQuoteText = quoteEl.textContent ?? '';
        const words = originalQuoteText.trim().split(' ');
        quoteEl.innerHTML = words
          .map(
            (w) =>
              `<span class="word" style="display:inline-block;overflow:hidden"><span class="word-inner" style="display:inline-block">${w}&nbsp;</span></span>`,
          )
          .join('');

        gsap.fromTo(
          '.word-inner',
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.04,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteEl,
              start: 'top 80%',
            },
          },
        );
      }

      gsap.fromTo(
        '.bottom-stat',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.bottom-stats',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.bottom-cta-section',
        { opacity: 0, scale: 0.94, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.bottom-cta-section',
            start: 'top 85%',
          },
        },
      );
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
      if (originalQuoteText !== null) {
        const quoteEl = document.querySelector<HTMLElement>('.manifesto-quote');
        if (quoteEl) quoteEl.textContent = originalQuoteText;
      }
      ctx.revert();
    };
  }, []);

  return null;
}
