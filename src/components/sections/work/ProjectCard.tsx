// src/components/sections/work/ProjectCard.tsx
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const layoutClass =
    project.layout === 'featured'
      ? 'case-card--featured'
      : project.layout === 'wide'
        ? 'case-card--wide'
        : 'case-card--standard';

  return (
    <AnimatedSection
      as="article"
      className={`case-card ${layoutClass}`}
      delay={index * 0.06}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        width={1200}
        height={750}
        className="case-img"
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
      />
      <div className="case-info">
        <div className="case-meta">
          <span className="case-cat">{project.category}</span>
          <span className="case-year">{project.year}</span>
        </div>
        <h3 className="case-title">{project.title}</h3>
        {project.description && (
          <p className="case-desc">{project.description}</p>
        )}
        <div className="case-link-row">
          <div className="case-tags">
            {project.tags.map((tag) => (
              <span className="pill" key={tag}>{tag}</span>
            ))}
          </div>
          {project.award && (
            <span
              className="pill"
              style={{ background: 'var(--clr-accent)', color: 'var(--clr-ink)' }}
            >
              {project.award}
            </span>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
