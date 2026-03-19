"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useGeoCurrency } from '@/hooks/useGeoLocation';
import {
  CURRENCIES,
  FEATURES,
  SERVICES,
  calcTotal,
  formatPrice,
  type Currency,
} from '@/lib/pricing';

export default function PricingCalculator() {
  const { currency, loading, setCurrency } = useGeoCurrency();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const totalRef = useRef<HTMLSpanElement>(null);
  const prevTotal = useRef(0);

  const { subtotal, tax, total } = calcTotal(selectedServices, selectedFeatures, currency);
  const hasSelection = selectedServices.length > 0;

  useEffect(() => {
    if (!totalRef.current || !hasSelection) return;

    const obj = { val: prevTotal.current };
    gsap.to(obj, {
      val: total,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (totalRef.current) totalRef.current.textContent = formatPrice(obj.val, currency);
      },
    });
    prevTotal.current = total;
  }, [currency, hasSelection, total]);

  const availableFeatures = FEATURES.filter((f) =>
    selectedServices.some((s) => f.applicableTo.includes(s)),
  );

  const toggleService = (id: string) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

    setSelectedFeatures((prev) =>
      prev.filter((fid) => {
        const feat = FEATURES.find((f) => f.id === fid);
        const newServices = selectedServices.includes(id)
          ? selectedServices.filter((s) => s !== id)
          : [...selectedServices, id];
        return feat?.applicableTo.some((s) => newServices.includes(s));
      }),
    );
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const reset = () => {
    setSelectedServices([]);
    setSelectedFeatures([]);
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>
        Detecting your location...
      </div>
    );
  }

  const taxLabel =
    currency.code === 'INR'
      ? 'GST (18%)'
      : currency.code === 'GBP' || currency.code === 'EUR'
        ? 'VAT (20%)'
        : null;

  const budgetParam = encodeURIComponent(formatPrice(total, currency));
  const servicesParam = encodeURIComponent(selectedServices.join(','));

  return (
    <section id="pricing-calculator" style={{ padding: '6rem 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.15em', color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase' }}>
          Estimate Your Budget
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.1 }}>
          Build Your{' '}
          <em style={{ fontStyle: 'italic', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Custom Quote.
          </em>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 520, lineHeight: 1.7 }}>
          Select the services and features you need. We&apos;ll calculate a rough project estimate instantly. All prices are indicative — final quotes follow a discovery call.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Showing prices in:</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(CURRENCIES)
            .filter(([k]) => k !== 'DEFAULT')
            .map(([key, cur]) => (
              <button
                key={key}
                onClick={() => setCurrency(cur as Currency)}
                type="button"
                style={{
                  padding: '5px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  border: `1px solid ${currency.code === cur.code ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                  background: currency.code === cur.code ? 'var(--accent-primary)' : 'transparent',
                  color: currency.code === cur.code ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cur.symbol} {cur.code}
              </button>
            ))}
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginLeft: 4 }}>
          Auto-detected from your location
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr min(360px, 100%)', gap: '3rem', alignItems: 'start' }}>
        <div>
          <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16, fontWeight: 500 }}>
            1. Choose Services
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, marginBottom: '2.5rem' }}>
            {SERVICES.map((svc) => {
              const selected = selectedServices.includes(svc.id);
              return (
                <button
                  key={svc.id}
                  onClick={() => toggleService(svc.id)}
                  type="button"
                  className="calc-service-btn"
                  style={{
                    textAlign: 'left',
                    padding: '16px 18px',
                    borderRadius: 12,
                    border: `1px solid ${selected ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                    background: selected ? 'rgba(198, 241, 53, 0.10)' : 'var(--bg-card)',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {selected && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 12,
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--accent-primary)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      ✓ Added
                    </span>
                  )}
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{svc.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{svc.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{svc.description}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {formatPrice(svc.baseUSD, currency)}
                  </div>
                </button>
              );
            })}
          </div>

          {hasSelection && availableFeatures.length > 0 && (
            <>
              <h3 style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16, fontWeight: 500 }}>
                2. Add Features <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>(optional)</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {availableFeatures.map((feat) => {
                  const active = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      type="button"
                      className="calc-feature-btn"
                      style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        borderRadius: 10,
                        border: `1px solid ${active ? 'var(--accent-secondary)' : 'var(--border-subtle)'}`,
                        background: active ? 'rgba(198, 241, 53, 0.08)' : 'var(--bg-card)',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{feat.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{feat.description}</div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: active ? 'var(--accent-secondary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        +{formatPrice(feat.baseUSD, currency)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div style={{ position: 'sticky', top: 100, background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 16, padding: '28px 24px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Your Estimate
          </div>

          {!hasSelection ? (
            <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, textAlign: 'center', padding: '2rem 0' }}>
              Select at least one service to see your estimate.
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 20 }}>
                {selectedServices.map((sid) => {
                  const svc = SERVICES.find((s) => s.id === sid);
                  if (!svc) return null;
                  return (
                    <div key={sid} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '7px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-primary)' }}>
                        {svc.icon} {svc.label}
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{formatPrice(svc.baseUSD, currency)}</span>
                    </div>
                  );
                })}
                {selectedFeatures.map((fid) => {
                  const feat = FEATURES.find((f) => f.id === fid);
                  if (!feat) return null;
                  return (
                    <div key={fid} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>+ {feat.label}</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>+{formatPrice(feat.baseUSD, currency)}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>

              {taxLabel && tax > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>
                  <span>{taxLabel}</span>
                  <span>+{formatPrice(tax, currency)}</span>
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Estimated Total</span>
                <div>
                  <span ref={totalRef} style={{ fontSize: 26, fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {formatPrice(total, currency)}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.6, marginBottom: 20 }}>
                This is a rough estimate. Final pricing is confirmed after a free 30-min discovery call where we scope the project properly.
              </div>

              <a
                href={`/contact?services=${servicesParam}&budget=${budgetParam}`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 0',
                  borderRadius: 999,
                  background: 'var(--accent-gradient)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'none',
                  marginBottom: 10,
                }}
              >
                Get a Detailed Quote →
              </a>

              <button
                onClick={reset}
                type="button"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '12px 0',
                  borderRadius: 999,
                  background: 'transparent',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                  fontSize: 13,
                }}
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
