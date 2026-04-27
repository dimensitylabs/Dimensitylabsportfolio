// src/components/sections/about/Team.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { teamMembers } from '@/lib/data';

function TeamMemberPhoto({ name, image }: { name: string; image: string }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (errored || !image) {
    return (
      <div className="team-img-fallback" aria-hidden="true">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={name}
      width={400}
      height={533}
      className="team-img"
      sizes="(max-width:768px) 50vw, 25vw"
      onError={() => setErrored(true)}
    />
  );
}

export function Team() {
  return (
    <section className="about-team">
      <div className="container">
        <AnimatedSection as="div">
          <SectionHeading
            eyebrow="The Team"
            titleHtml='Small team.<br /><em>Big output.</em>'
            title="Small team. Big output."
          />
        </AnimatedSection>

        <div className="team-grid">
          {teamMembers.map((member, i) => {
            const isLinkedIn = member.href?.startsWith('https://linkedin');
            return (
              <AnimatedSection
                as="div"
                className="team-card"
                key={member.name}
                delay={i * 0.06}
              >
                <TeamMemberPhoto name={member.name} image={member.image} />
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  {member.bio && (
                    <p className="team-bio">{member.bio}</p>
                  )}
                  {member.href && (
                    <a
                      href={member.href}
                      className="team-link"
                      target={isLinkedIn ? '_blank' : undefined}
                      rel={isLinkedIn ? 'noopener noreferrer' : undefined}
                      aria-label={isLinkedIn ? `${member.name} on LinkedIn` : member.role}
                    >
                      {isLinkedIn ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                          LinkedIn
                        </>
                      ) : (
                        member.role
                      )}
                    </a>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
