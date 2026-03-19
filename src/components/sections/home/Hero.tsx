// src/components/sections/home/Hero.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { heroStats } from '@/lib/data';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-text" aria-hidden="true">
        Dimensity Labs
      </div>

      <div className="container">
        <div className="hero-inner">
          <div className="hero-main">
            <AnimatedSection as="div" className="hero-eyebrow" style={{ marginBottom: 'var(--sp-lg)' }}>
              <span className="live-dot" aria-hidden="true" />
              <span className="t-label">Currently Taking Projects — Est. 2025</span>
            </AnimatedSection>

            <AnimatedSection as="div" delay={0.1}>
              <h1 className="hero-title hero-headline">
                Building Digital Products
                <br />
                <em>That Actually Work.</em>
                <br />
                &nbsp;
              </h1>
            </AnimatedSection>

            <AnimatedSection as="div" className="hero-sub" delay={0.22}>
              <p className="hero-desc hero-subheadline">
                We design and build websites, mobile apps, and AI-powered solutions for startups and businesses ready to scale.
              </p>
              <div className="hero-meta hero-cta">
                {heroStats.map((stat) => (
                  <div className="hero-stat" key={stat.label}>
                    <div
                      className="hero-stat-num hero-stat-number"
                      data-value={stat.value.replace(/[^\d]/g, '')}
                    >
                      {stat.value}
                    </div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-label">Scroll</span>
      </div>
    </section>
  );
}
