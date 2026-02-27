// src/components/sections/home/Hero.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { heroStats } from '@/lib/data';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-text" aria-hidden="true">
        Dimensity 
      </div>

      <div className="container">
        <div className="hero-inner">
          <div className="hero-main">
            <AnimatedSection as="div" className="hero-eyebrow" style={{ marginBottom: 'var(--sp-lg)' }}>
              <span className="live-dot" aria-hidden="true" />
              <span className="t-label">Currently Taking Projects — Est. 2016</span>
            </AnimatedSection>

            <AnimatedSection as="div" delay={0.1}>
              <h1 className="hero-title">
                We make the
                <br />
                <em>invisible,</em>
                <br />
                inevitable.
              </h1>
            </AnimatedSection>

            <AnimatedSection as="div" className="hero-sub" delay={0.22}>
              <p className="hero-desc">
                Dimensity Labs is a boutique creative agency crafting brand
                identities, digital platforms, and campaign systems for
                companies that refuse to be ordinary.
              </p>
              <div className="hero-meta">
                {heroStats.map((stat) => (
                  <div className="hero-stat" key={stat.label}>
                    <div className="hero-stat-num">{stat.value}</div>
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
