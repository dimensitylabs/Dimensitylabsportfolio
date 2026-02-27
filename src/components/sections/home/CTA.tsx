// src/components/sections/home/CTA.tsx
import { Button } from '@/components/ui/Button';
import { clientLogos } from '@/lib/data';

export function CTA() {
  return (
    <>
      {/* CTA Band */}
      <section className="cta-band">
        <div className="container">
          <h2 className="cta-band-text">
            Ready to build something <em>inevitable?</em>
          </h2>
          <Button href="/contact" variant="accent">
            Start a Project
          </Button>
        </div>
      </section>

      {/* Clients Strip */}
      <section className="clients-strip">
        <div className="container">
          <div className="clients-inner">
            <span className="clients-label">Trusted By</span>
            <div className="clients-logos">
              {clientLogos.map((name) => (
                <span className="client-logo" key={name}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
