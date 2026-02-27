// src/components/sections/about/Team.tsx
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { teamMembers } from '@/lib/data';

export function Team() {
  return (
    <section className="about-team">
      <div className="container">
        <AnimatedSection as="div">
          <SectionHeading
            eyebrow="The Team"
            titleHtml='Twelve people.<br /><em>No departments.</em>'
            title="Twelve people. No departments."
          />
        </AnimatedSection>

        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <AnimatedSection
              as="div"
              className="team-card"
              key={member.name}
              delay={i * 0.06}
            >
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={533}
                className="team-img"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              <div className="team-info">
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
