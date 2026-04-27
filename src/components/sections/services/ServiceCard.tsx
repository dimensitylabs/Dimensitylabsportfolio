// src/components/sections/services/ServiceCard.tsx
'use client';
import { motion } from 'framer-motion';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      className="service-row service-block"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.08,
      }}
    >
      <div>
        <span className="service-row-num service-block-number">{service.num}</span>
      </div>
      <div>
        <h3 className="service-row-title service-block-title">{service.title}</h3>
        <div className="service-row-tags">
          {service.tags.map((tag) => (
            <span className="pill service-block-tag" key={tag}>{tag}</span>
          ))}
        </div>
        <p
          className="service-row-body service-block-body"
          style={{ marginTop: 'var(--sp-md)' }}
        >
          {service.description}
        </p>
        {service.detail && (
          <p
            className="service-row-body service-block-body"
            style={{ marginTop: '12px', fontStyle: 'italic', opacity: 0.75 }}
          >
            {service.detail}
          </p>
        )}
      </div>
      <span className="service-row-link" aria-hidden="true">
        Enquire ↗
      </span>
    </motion.div>
  );
}
