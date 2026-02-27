// src/app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingInline: 'var(--sp-lg)',
      }}
    >
      <div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(6rem, 15vw, 12rem)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: 1,
            color: 'var(--clr-accent)',
            display: 'block',
            marginBottom: 'var(--sp-md)',
          }}
        >
          404
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--clr-ink)',
            marginBottom: '12px',
          }}
        >
          Page not found.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            color: 'var(--clr-muted)',
            lineHeight: 1.6,
            maxWidth: '440px',
            margin: '0 auto var(--sp-xl)',
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div style={{ display: 'flex', gap: 'var(--sp-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button href="/" variant="primary">Back to Home</Button>
          <Button href="/contact" variant="outline">Get in Touch</Button>
        </div>
      </div>
    </section>
  );
}
