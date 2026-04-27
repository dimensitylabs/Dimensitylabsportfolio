// src/components/sections/home/Testimonials.tsx
import { testimonials, philosophyStats } from '@/lib/data';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Testimonials() {
  return (
    <section className="philosophy">
      <div className="container">
        <div className="philosophy-inner">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="What Clients Say"
              title="Results that speak for themselves."
            />
            <div className="testimonials-list">
              {testimonials.map((t, i) => (
                <div className="testimonial-card" key={i}>
                  <p className="testimonial-quote">&#8220;{t.quote}&#8221;</p>
                  <div className="testimonial-attribution">
                    <div className="testimonial-avatar" aria-hidden="true">{t.initials}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-meta">{t.title}, {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection as="div" className="philosophy-stats bottom-stats" delay={0.15}>
            {philosophyStats.map((s) => (
              <div className="bottom-stat" key={s.label}>
                <div className="phil-stat-num">{s.value}</div>
                <div className="phil-stat-label">{s.label}</div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
