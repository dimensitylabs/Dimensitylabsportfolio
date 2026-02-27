// src/components/sections/contact/ContactInfo.tsx
import Image from 'next/image';
import type { ReactNode } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  contactEmails,
  socialLinks,
  offices,
  awardsLabels,
} from '@/lib/data';

interface ContactInfoProps {
  formSlot: ReactNode;
}

export function ContactInfo({ formSlot }: ContactInfoProps) {
  return (
    <>
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="Get In Touch"
              titleHtml="Let&rsquo;s build something<br /><em>inevitable.</em>"
              title="Let's build something inevitable."
            />
          </AnimatedSection>

          <div className="contact-hero-grid">
            <AnimatedSection as="div" className="contact-info" delay={0.1}>
              {/* Availability badge */}
              <div className="contact-availability">
                <span className="avail-dot" />
                <span className="avail-text">
                  Currently accepting projects — Booking Q2 2026
                </span>
              </div>

              {/* Emails */}
              {contactEmails.map((item) => (
                <div key={item.label}>
                  <div className="contact-info-label">{item.label}</div>
                  <div className="contact-info-value">
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div className="contact-socials">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="contact-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.abbr}
                  </a>
                ))}
              </div>

              {/* Awards */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'var(--sp-sm)' }}>
                {awardsLabels.map((a) => (
                  <span className="pill" key={a}>{a}</span>
                ))}
              </div>
            </AnimatedSection>

            {/* Form slot */}
            <div>{formSlot}</div>
          </div>
        </div>
      </section>

      {/* Map & Offices */}
      <section className="contact-offices">
        <div className="container">
          <AnimatedSection as="div">
            <SectionHeading
              eyebrow="Our Studios"
              titleHtml='Where to <em>find us.</em>'
              title="Where to find us."
            />
          </AnimatedSection>

          <div className="offices-grid">
            {offices.map((office, i) => (
              <AnimatedSection
                as="div"
                className="office-card"
                key={office.city}
                delay={i * 0.1}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--sp-md)' }}>
                  <h3 className="office-city" style={{ marginBottom: 0 }}>
                    {office.city}
                  </h3>
                  <span
                    className="pill"
                    style={
                      office.badgeAccent
                        ? { background: 'var(--clr-accent)', color: 'var(--clr-ink)' }
                        : undefined
                    }
                  >
                    {office.badge}
                  </span>
                </div>
                <p className="office-addr">{office.address}</p>
                <div className="office-status">
                  <span className="office-dot" />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--clr-ink-mid)' }}>
                    {office.status}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section style={{ paddingBlock: 'var(--sp-3xl)' }}>
        <div className="container">
          <div className="map-placeholder">
            <Image
              src="https://picsum.photos/seed/mapOslo/1200/900"
              alt="Map of Oslo, Norway"
              width={1200}
              height={900}
              sizes="100vw"
            />
            <div className="map-placeholder-overlay">
              <div className="map-pin" aria-label="Dimensity Labs Labs, Oslo">
                ◉
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
