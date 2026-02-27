// src/components/sections/about/Stats.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { values } from '@/lib/data';

export function Stats() {
  return (
    <section className="about-values">
      <div className="container">
        <AnimatedSection as="div">
          <SectionHeading
            eyebrow="Our Values"
            titleHtml='Principles we <em>actually</em> follow.'
            title="Principles we actually follow."
          />
        </AnimatedSection>

        <div className="values-grid">
          {values.map((v, i) => (
            <AnimatedSection
              as="div"
              className="value-card"
              key={v.title}
              delay={i * 0.08}
            >
              <span className="value-icon" aria-hidden="true">{v.icon}</span>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
