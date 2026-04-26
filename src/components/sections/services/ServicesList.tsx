// src/components/sections/services/ServicesList.tsx
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { PricingCards } from '@/components/sections/services/PricingCards';
import PricingCalculator from '@/components/PricingCalculator';
import { services, processSteps, faqs, testimonials } from '@/lib/data';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

const serviceLinks = [
  { href: '/services/web-development', label: 'Web Development' },
  { href: '/services/mobile-app-development', label: 'Mobile App Development' },
  { href: '/services/ai-solutions', label: 'AI Solutions' },
  { href: '/services/ai-automation', label: 'AI Automation' },
  { href: '/services/digital-branding', label: 'Digital Branding' },
  { href: '/services/consulting-strategy', label: 'Consulting & Strategy' },
];

export function ServicesList() {
  return (
    <>
      {/* Services Hero */}
      <section className="services-hero">
        <div className="container">
          <AnimatedSection as="div" className="services-page-heading">
            <SectionHeading
              eyebrow="Services"
              titleHtml='What We Do.<br /><em>End-to-end</em> digital services.'
              title="What We Do. End-to-end digital services."
            />
          </AnimatedSection>

          <div className="services-hero-grid">
            <AnimatedSection as="div" className="services-page-sub" delay={0.1}>
              <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: 'var(--clr-ink-mid)' }}>
                From landing pages to full AI automation pipelines — everything your business needs to grow digitally, under one roof.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: 'var(--clr-ink-mid)', marginTop: 'var(--sp-md)' }}>
                Clear scope. Clear pricing. Clear outcomes.
              </p>
            </AnimatedSection>

            <AnimatedSection as="div" delay={0.15}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 'var(--sp-md)', flexWrap: 'wrap' }}>
                  <Button href="/contact" variant="primary">Start a Project</Button>
                  <Button href="/work" variant="outline">See Our Work</Button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {serviceLinks.map((serviceLink) => (
                    <Link
                      key={serviceLink.href}
                      href={serviceLink.href}
                      className="btn btn--outline"
                      style={{ padding: '10px 16px', fontSize: '0.72rem' }}
                    >
                      {serviceLink.label}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="services-main">
        <div className="container">
          {services.map((svc, i) => (
            <ServiceCard key={svc.num} service={svc} index={i} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="services-process dark-section process-section">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="Our Process"
              titleHtml='Four Phases. No Filler.'
              title="Four Phases. No Filler."
              dark
            />
          </AnimatedSection>

          <div
            className="process-connector"
            aria-hidden="true"
            style={{
              height: '1px',
              background: 'var(--border-subtle)',
              width: '100%',
              marginTop: 'var(--sp-xl)',
              transformOrigin: 'left center',
            }}
          />
          <div className="process-steps">
            {processSteps.map((step, i) => (
              <AnimatedSection
                as="div"
                className="process-step"
                key={step.num}
                delay={i * 0.1}
              >
                <div className="process-step-num">{step.num}</div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="services-pricing pricing-section">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="Investment"
              titleHtml='Transparent Pricing.'
              title="Transparent Pricing."
            />
          </AnimatedSection>
        </div>
      </section>

      <PricingCards />

      <PricingCalculator />

      {/* Testimonials strip */}
      <section style={{ paddingBlock: 'var(--sp-3xl)', borderTop: '1px solid var(--clr-border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="What Clients Say"
              title="Results that speak for themselves."
            />
          </AnimatedSection>
          <div className="testimonials-list">
            {testimonials.map((t, i) => (
              <AnimatedSection as="div" key={i} delay={i * 0.08}>
                <div className="testimonial-card">
                  <p className="testimonial-quote">&#8220;{t.quote}&#8221;</p>
                  <div className="testimonial-attribution">
                    <div className="testimonial-avatar" aria-hidden="true">{t.initials}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-meta">{t.title}, {t.company}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section
        className="faq-section"
        style={{ paddingBlock: 'var(--sp-3xl)', borderTop: '1px solid var(--clr-border)' }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="FAQs"
              titleHtml='Common questions,<br /><em>honest answers.</em>'
              title="Common questions, honest answers."
            />
          </AnimatedSection>
          <div style={{ marginTop: 'var(--sp-xl)' }}>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
