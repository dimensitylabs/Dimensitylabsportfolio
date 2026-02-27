// src/hooks/useScrollAnimation.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px'
) {
  const ref = useRef<T>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    []
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin]);

  return ref;
}

export function useScrollAnimationGroup(
  containerSelector?: string,
  childSelector = '.anim-item',
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px'
) {
  useEffect(() => {
    const targets = containerSelector
      ? document.querySelectorAll(`${containerSelector} ${childSelector}`)
      : document.querySelectorAll(childSelector);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerSelector, childSelector, threshold, rootMargin]);
}
