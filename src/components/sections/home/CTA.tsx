// src/components/sections/home/CTA.tsx
import { Button } from '@/components/ui/Button';

interface CTAProps {
  prefix?: string;
  emphasis?: string;
}

export function CTA({
  prefix = 'Ready to Build Something',
  emphasis = 'Extraordinary?',
}: CTAProps) {
  return (
    <>
      {/* CTA Band */}
      <section className="cta-band bottom-cta-section">
        <div className="container">
          <h2 className="cta-band-text">
            {prefix} <em>{emphasis}</em>
          </h2>
          <Button href="/contact" variant="accent">
            Start a Project
          </Button>
        </div>
      </section>
    </>
  );
}
