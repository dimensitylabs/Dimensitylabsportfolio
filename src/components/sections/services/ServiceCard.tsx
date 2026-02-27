// src/components/sections/services/ServiceCard.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <AnimatedSection as="div" className="service-row" delay={index * 0.08}>
      <div>
        <span className="service-row-num">{service.num}</span>
      </div>
      <div>
        <h3 className="service-row-title">{service.title}</h3>
        <div className="service-row-tags">
          {service.tags.map((tag) => (
            <span className="pill" key={tag}>{tag}</span>
          ))}
        </div>
        <p className="service-row-body" style={{ marginTop: 'var(--sp-md)' }}>
          {service.description}
        </p>
        {service.detail && (
          <p
            className="service-row-body"
            style={{ marginTop: '12px', fontStyle: 'italic', opacity: 0.75 }}
          >
            {service.detail}
          </p>
        )}
      </div>
      <span className="service-row-link" aria-hidden="true">
        Enquire ↗
      </span>
    </AnimatedSection>
  );
}
