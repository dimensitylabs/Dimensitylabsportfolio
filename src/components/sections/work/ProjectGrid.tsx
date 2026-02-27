// src/components/sections/work/ProjectGrid.tsx
'use client';

import { useState, useMemo } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/sections/work/ProjectCard';
import { allProjects } from '@/lib/data';

const categories = ['All', ...Array.from(new Set(allProjects.flatMap((p) => p.tags)))];

export function ProjectGrid() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? allProjects
        : allProjects.filter((p) => p.tags.includes(filter)),
    [filter],
  );

  return (
    <>
      {/* Work Hero */}
      <section className="work-hero">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="Our Work"
              titleHtml='Selected projects,<br /><em>2021–2024.</em>'
              title="Selected projects, 2021–2024."
            />
          </AnimatedSection>

          <div className="work-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="work-grid">
        <div className="container">
          <div className="work-cases-grid">
            {filtered.map((proj, i) => (
              <ProjectCard key={proj.title} project={proj} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
