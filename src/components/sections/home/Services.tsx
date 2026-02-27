// src/components/sections/home/Services.tsx
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { homeServicesList, marqueeItems } from '@/lib/data';

export function Services() {
  return (
    <>
      {/* Marquee Strip */}
      <div className="marquee-strip" aria-hidden="true">
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
            <AnimatedSection as="div">
              <SectionHeading
                eyebrow="What We Do"
                title="Six disciplines."
                titleHtml='Six disciplines.<br /><em>One integrated practice.</em>'
              />
              <p style={{ color: 'var(--clr-muted)', marginTop: 'var(--sp-md)', maxWidth: '440px', lineHeight: 1.6 }}>
                Every project draws on some combination of these six areas. The
                precise mix depends on you — we don&apos;t sell fixed packages, we
                build the scope around the actual problem.
              </p>
            </AnimatedSection>

            <AnimatedSection as="div" delay={0.1}>
              <div className="services-list">
                {homeServicesList.map((svc) => (
                  <Link href="/services" key={svc.num} className="services-list-item">
                    <div className="sli-left">
                      <span className="sli-num">{svc.num}</span>
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
