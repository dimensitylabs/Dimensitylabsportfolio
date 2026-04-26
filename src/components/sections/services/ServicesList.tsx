// src/components/sections/services/ServicesList.tsx
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { PricingCards } from '@/components/sections/services/PricingCards';
import PricingCalculator from '@/components/PricingCalculator';
import { services, processSteps, faqs } from '@/lib/data';

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
              titleHtml='Four phases.<br /><em>No filler.</em>'
              title="Four phases. No filler."
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
              titleHtml='Transparent pricing.<br /><em>Radical, we know.</em>'
              title="Transparent pricing. Radical, we know."
            />
          </AnimatedSection>
        </div>
      </section>

      <PricingCards />

      <PricingCalculator />

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
            {faqs.map((faq, i) => (
              <AnimatedSection
                as="div"
                className="faq-item"
                key={i}
                delay={i * 0.06}
                style={{
                  borderBottom: '1px solid var(--clr-border)',
                  paddingBlock: 'var(--sp-lg)',
                }}
              >
                <details>
                <summary
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--clr-ink)',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--sp-md)',
                  }}
                >
                  {faq.question}
                  <span style={{ flexShrink: 0, fontSize: '1.25rem', color: 'var(--clr-muted)' }}>+</span>
                </summary>
                <p
                  style={{
                    marginTop: 'var(--sp-md)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.65,
                    color: 'var(--clr-ink-mid)',
                  }}
                >
                  {faq.answer}
                </p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
