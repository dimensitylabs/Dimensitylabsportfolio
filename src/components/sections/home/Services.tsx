// src/components/sections/home/Services.tsx
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { homeServicesList, marqueeItems } from '@/lib/data';

export function Services() {
  return (
    <>
      {/* Marquee Strip */}
      <div className="marquee-strip marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Services Snapshot */}
      <section className="services-snap">
        <div className="container">
          <div className="services-snap-grid">
            <AnimatedSection as="div" className="services-heading">
              <SectionHeading
                eyebrow="What We Do"
                title="What We Do. One team, every digital need."
                titleHtml='What We Do.<br /><em>One team, every digital need.</em>'
              />
              <p style={{ color: 'var(--clr-muted)', marginTop: 'var(--sp-md)', maxWidth: '440px', lineHeight: 1.6 }}>
                From pixel-perfect websites to intelligent AI systems — we cover every layer of your digital presence under one roof.
              </p>
            </AnimatedSection>

            <AnimatedSection as="div" delay={0.1}>
              <div className="services-list">
                {homeServicesList.map((svc) => (
                  <Link href="/services" key={svc.num} className="services-list-item service-item">
                    <div className="sli-left">
                      <span className="sli-num service-number">{svc.num}</span>
                      <span className="sli-name">{svc.name}</span>
                    </div>
                    <span className="sli-arrow">↗</span>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
