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
          <AnimatedSection as="div" className="about-headline">
            <SectionHeading
              eyebrow="About Dimensity Labs"
              titleHtml='A digital studio<br />built for <em>speed</em><br />and scale.'
              title="A digital studio built for speed and scale."
            />
          </AnimatedSection>

          <div className="about-hero-grid">
            <AnimatedSection
              as="div"
              className="about-hero-img-wrap about-intro-image"
              delay={0.1}
            >
              <Image
                src="https://picsum.photos/seed/studio/800/1000"
                alt="Dimensity Labs workspace"
                width={800}
                height={1000}
                className="about-hero-img"
                sizes="(max-width:768px) 100vw, 50vw"
                priority
              />
              <div className="about-hero-img-badge">
                <strong>2025</strong>
                Est. Mumbai, India
              </div>
            </AnimatedSection>

            <AnimatedSection
              as="div"
              className="about-hero-right about-intro-text"
              delay={0.2}
            >
              <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: 'var(--clr-ink-mid)' }}>
                Dimensity Labs is a Mumbai-based digital agency building websites,
                mobile apps, and AI-powered systems for startups and businesses
                ready to scale.
              </p>
              <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: 'var(--clr-ink-mid)' }}>
                We ship fast, communicate clearly, and focus on outcomes: speed,
                conversions, and systems that keep working after launch.
              </p>
              <div style={{ display: 'flex', gap: 'var(--sp-xl)', marginTop: 'var(--sp-md)' }}>
                {aboutStats.map((s) => (
                  <div className="about-stat" key={s.label}>
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
      <section className="about-story timeline-section">
        <div className="container">
          <div className="about-story-grid" style={{ position: 'relative' }}>
            <div className="about-story-sticky">
              <AnimatedSection as="div">
                <SectionHeading
                  eyebrow="Our Story"
                  titleHtml='How We Got Here.'
                  title="How We Got Here."
                />
                <p style={{ color: 'var(--clr-muted)', marginTop: 'var(--sp-md)', maxWidth: '440px', lineHeight: 1.65 }}>
                  We started Dimensity Labs to help founders and teams move from
                  idea to launch without the usual chaos. Clear planning, strong
                  execution, and technology that solves real problems.
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
                  className="timeline-item"
                  key={`${event.year}-${i}`}
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
            <div
              className="timeline-line"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'var(--clr-border)',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
