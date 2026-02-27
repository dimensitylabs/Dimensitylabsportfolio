// src/components/sections/home/Testimonials.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { testimonial, philosophyStats } from '@/lib/data';

export function Testimonials() {
  return (
    <section className="philosophy">
      <div className="container">
        <div className="philosophy-inner">
          <AnimatedSection as="div">
            <span className="big-quote" aria-hidden="true">&ldquo;</span>
            <blockquote>
              <p className="blockquote-text">{testimonial.quote}</p>
              <footer className="blockquote-attr">{testimonial.attribution}</footer>
            </blockquote>
          </AnimatedSection>

          <AnimatedSection as="div" className="philosophy-stats" delay={0.15}>
            {philosophyStats.map((s) => (
              <div key={s.label}>
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
