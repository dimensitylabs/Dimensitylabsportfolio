// src/components/ui/FAQAccordion.tsx
'use client';

import { useState } from 'react';
import type { FAQ } from '@/lib/types';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="faq-item"
            style={{ borderBottom: '1px solid var(--clr-border)', paddingBlock: 'var(--sp-lg)' }}
          >
            <button
              className="faq-question-btn"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <span>{faq.question}</span>
              <svg
                className={`faq-chevron${isOpen ? ' open' : ''}`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className={`faq-answer${isOpen ? ' open' : ''}`}
            >
              <div className="faq-answer-inner">
                <p
                  className="faq-a"
                  style={{ paddingTop: 'var(--sp-md)', paddingBottom: '4px' }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
