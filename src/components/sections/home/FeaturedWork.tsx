// src/components/sections/home/FeaturedWork.tsx
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { featuredProjects } from '@/lib/data';

export function FeaturedWork() {
  return (
    <section className="featured-work">
      <div className="container">
        <AnimatedSection as="div" className="section-header">
          <SectionHeading
            eyebrow="Selected Projects"
            title="Work that speaks&nbsp;louder."
          />
          <Button href="/work" variant="outline">
            View All Work
          </Button>
        </AnimatedSection>

        <div className="projects-grid">
          {featuredProjects.map((proj, i) => {
            const sizeClass =
              i === 0
                ? 'proj-card--wide'
                : i === 1
                  ? 'proj-card--tall'
                  : 'proj-card--small';

            return (
              <AnimatedSection
                as="div"
                className={`proj-card ${sizeClass}`}
                key={proj.title}
                delay={i * 0.08}
              >
                <Link href="/work" aria-label={`View ${proj.title}`}>
                  <Image
                    src={proj.image}
                    alt={proj.imageAlt}
                    width={900}
                    height={600}
                    className="proj-img"
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                  <div className="proj-overlay">
                    <span className="proj-overlay-cat">{proj.category}</span>
                    <span className="proj-overlay-title">{proj.title}</span>
                    <span className="proj-overlay-arrow">↗</span>
                  </div>
                  {proj.tags[0] && (
                    <span className="proj-tag">{proj.tags[0]}</span>
                  )}
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
