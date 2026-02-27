// src/components/sections/services/ServicesList.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { services, processSteps, pricingTiers, faqs } from '@/lib/data';

export function ServicesList() {
  return (
    <>
      {/* Services Hero */}
      <section className="services-hero">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="Services"
              titleHtml='Six disciplines.<br /><em>One integrated</em> practice.'
              title="Six disciplines. One integrated practice."
            />
          </AnimatedSection>

          <div className="services-hero-grid">
            <AnimatedSection as="div" delay={0.1}>
              <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: 'var(--clr-ink-mid)' }}>
                Every project we take on draws from some combination of our six
                core practice areas. The precise mix depends on you — we
                don&apos;t sell fixed packages, we build the scope around the
                actual problem.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: 'var(--clr-ink-mid)', marginTop: 'var(--sp-md)' }}>
                Below is what we do, how we do it, and what it costs.
                Transparently. Because vague pricing helps no-one.
              </p>
            </AnimatedSection>

            <AnimatedSection as="div" delay={0.15}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 'var(--sp-md)', flexWrap: 'wrap' }}>
                  <Button href="/contact" variant="primary">Start a Project</Button>
                  <Button href="/work" variant="outline">See Our Work</Button>
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
      <section className="services-process dark-section">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="Our Process"
              titleHtml='Four phases.<br /><em>No filler.</em>'
              title="Four phases. No filler."
              dark
            />
          </AnimatedSection>

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
      <section className="services-pricing">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="Investment"
              titleHtml='Transparent pricing.<br /><em>Radical, we know.</em>'
              title="Transparent pricing. Radical, we know."
            />
          </AnimatedSection>

          <div className="pricing-grid">
            {pricingTiers.map((tier, i) => (
              <AnimatedSection
                as="div"
                className={`pricing-card${tier.featured ? ' pricing-card--featured' : ''}`}
                key={tier.tier}
                delay={i * 0.1}
              >
                <div className="pricing-header">
                  {tier.badge && (
                    <span className="pricing-badge">{tier.badge}</span>
                  )}
                  <div className="pricing-tier">{tier.tier}</div>
                  <div className="pricing-price">
                    <span className="pricing-price-num">{tier.price}</span>
                    {tier.period && (
                      <span className="pricing-price-period">{tier.period}</span>
                    )}
                  </div>
                  <p className="pricing-desc">{tier.description}</p>
                </div>
                <div className="pricing-body">
                  <div className="pricing-features">
                    {tier.features.map((feat) => (
                      <div className="pricing-feature" key={feat}>
                        {feat}
                      </div>
                    ))}
                  </div>
                  <Button
                    href="/contact"
                    variant={tier.featured ? 'accent' : 'outline'}
                    fullWidth
                  >
                    {tier.ctaLabel}
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ paddingBlock: 'var(--sp-3xl)', borderTop: '1px solid var(--clr-border)' }}>
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
