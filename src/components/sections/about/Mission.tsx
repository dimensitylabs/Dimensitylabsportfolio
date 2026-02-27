// src/components/sections/about/Mission.tsx
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { aboutStats, timeline } from '@/lib/data';

export function Mission() {
  return (
    <>
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="About Dimensity Labs "
              titleHtml='A small studio with<br />an <em>unreasonable</em><br />attention to detail.'
              title="A small studio with an unreasonable attention to detail."
            />
          </AnimatedSection>

          <div className="about-hero-grid">
            <AnimatedSection as="div" className="about-hero-img-wrap" delay={0.1}>
              <Image
                src="https://picsum.photos/seed/studio/800/1000"
                alt="Dimensity Labs Labs workspace"
                width={800}
                height={1000}
                className="about-hero-img"
                sizes="(max-width:768px) 100vw, 50vw"
                priority
              />
              <div className="about-hero-img-badge">
                <strong>12</strong>
                People, one shared standard
              </div>
            </AnimatedSection>

            <AnimatedSection as="div" className="about-hero-right" delay={0.2}>
              <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: 'var(--clr-ink-mid)' }}>
                Dimensity Labs Labs is a twelve-person creative agency based in Oslo,
                Norway. We specialise in brand identity, digital design, and
                creative campaigns for companies that take their visual presence
                as seriously as their product.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: 'var(--clr-ink-mid)' }}>
                We&apos;re small deliberately. Every project gets our senior team
                from day one — not juniors learning on your budget. That constraint
                is the reason our work looks the way it does.
              </p>
              <div style={{ display: 'flex', gap: 'var(--sp-xl)', marginTop: 'var(--sp-md)' }}>
                {aboutStats.map((s) => (
                  <div key={s.label}>
                    <div className="stat-num">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-sticky">
              <AnimatedSection as="div">
                <SectionHeading
                  eyebrow="Our Story"
                  titleHtml='How we got <em>here.</em>'
                  title="How we got here."
                />
                <p style={{ color: 'var(--clr-muted)', marginTop: 'var(--sp-md)', maxWidth: '440px', lineHeight: 1.65 }}>
                  We didn&apos;t start with a business plan. We started with a
                  conviction that most brand design was either decoration or
                  formula — and that something more rigorous and more human was
                  possible.
                </p>
                <div style={{ marginTop: 'var(--sp-lg)' }}>
                  <Button href="/contact" variant="outline">
                    Work With Us
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            <div>
              {timeline.map((event, i) => (
                <AnimatedSection
                  as="div"
                  key={event.year}
                  delay={i * 0.1}
                  style={{
                    paddingBlock: 'var(--sp-xl)',
                    borderBottom: '1px solid var(--clr-border)',
                  }}
                >
                  <span className="t-label" style={{ color: 'var(--clr-accent-dk)' }}>
                    {event.year}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      color: 'var(--clr-ink)',
                      margin: '10px 0 12px',
                    }}
                  >
                    {event.title}
                  </h3>
                  <p style={{ color: 'var(--clr-ink-mid)', lineHeight: 1.65, fontSize: '0.9375rem' }}>
                    {event.description}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
