// src/components/sections/work/ProjectCard.tsx
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
      className={`case-card project-card ${layoutClass}`}
      delay={index * 0.06}
    >
      <motion.div
        style={{ position: 'relative', overflow: 'hidden' }}
        initial="rest"
        whileHover="hovered"
        animate="rest"
      >
        <motion.div
          variants={{
            rest: { scale: 1 },
            hovered: { scale: 1.04 },
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: 'transform' }}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={750}
            className="case-img"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        </motion.div>
        <motion.div
          className="card-overlay"
          variants={{
            rest: { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
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
              <span className="pill project-tag" key={tag}>{tag}</span>
            ))}
          </div>
          {project.award && (
            <span
              className="pill project-tag"
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
