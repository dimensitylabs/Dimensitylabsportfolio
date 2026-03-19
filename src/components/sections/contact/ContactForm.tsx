// src/components/sections/contact/ContactForm.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { serviceOptions, budgetOptions } from '@/lib/data';

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited';

const calculatorServiceToContactService: Record<string, string> = {
  landing: 'web',
  website: 'web',
  webapp: 'web',
  mobile: 'mobile',
  'ai-chatbot': 'ai',
  'ai-automation': 'automation',
  branding: 'branding',
  consulting: 'consulting',
};

function formatCalculatorServices(services: string) {
  return services
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/-/g, ' '))
    .map((s) => s.replace(/\b\w/g, (m) => m.toUpperCase()))
    .join(', ');
}

function mapCalculatorServicesToContactService(services: string): string | null {
  const mapped = services
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => calculatorServiceToContactService[s])
    .filter(Boolean);

  const unique = Array.from(new Set(mapped));
  return unique.length === 1 ? unique[0] : null;
}

export function ContactForm({
  prefilledServices,
  prefilledBudget,
}: {
  prefilledServices?: string | null;
  prefilledBudget?: string | null;
}) {
  const inferredService =
    prefilledServices ? mapCalculatorServicesToContactService(prefilledServices) : null;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    service: inferredService || '',
    budget: prefilledBudget || '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Reset status if user starts typing again after an error
    if (status === 'error' || status === 'rate_limited') {
      setStatus('idle');
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    // Client-side validation
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.status === 429) {
        setStatus('rate_limited');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  function handleCloseModal() {
    setStatus('idle');
    setForm((prev) => ({
      ...prev,
      name: '',
      email: '',
      company: '',
      message: '',
      // keeping service and budget inferred if previously set, or we could reset completely.
    }));
  }

  return (
    <AnimatedSection as="div" className="contact-form-wrap" delay={0.1}>
      {status === 'success' && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal} aria-label="Close modal">
              <span aria-hidden="true">&times;</span>
            </button>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--sp-md)' }}>✓</span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--clr-ink)',
                marginBottom: '12px',
              }}
            >
              Message Sent
            </h3>
            <p style={{ color: 'var(--clr-ink-mid)', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto', marginBottom: 'var(--sp-lg)' }}>
              Thank you, {form.name}. We&apos;ll review your enquiry and respond
              within two business days.
            </p>
            <Button onClick={handleCloseModal} variant="primary">
              Done
            </Button>
          </div>
        </div>
      )}


    <AnimatedSection as="div" className="contact-form-wrap" delay={0.1}>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group form-field">
            <label htmlFor="name" className="form-label">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group form-field">
            <label htmlFor="email" className="form-label">
              Email Address <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group form-field">
          <label htmlFor="company" className="form-label">
            Company / Organisation
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="form-input"
            placeholder="Company name"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group form-field">
            <label htmlFor="service" className="form-label">
              Service Interested In
            </label>
            <select
              id="service"
              name="service"
              className="form-select"
              value={form.service}
              onChange={handleChange}
            >
              {prefilledServices && !inferredService && (
                <option value={prefilledServices}>
                  From calculator: {formatCalculatorServices(prefilledServices)}
                </option>
              )}
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {prefilledServices && (
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
                Selected from your calculator: {formatCalculatorServices(prefilledServices)}
              </p>
            )}
          </div>
          <div className="form-group form-field">
            <label htmlFor="budget" className="form-label">
              Estimated Budget
            </label>
            <select
              id="budget"
              name="budget"
              className="form-select"
              value={form.budget}
              onChange={handleChange}
            >
              {prefilledBudget && (
                <option value={prefilledBudget}>
                  Estimated: {prefilledBudget}
                </option>
              )}
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {prefilledBudget && (
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
                Estimated from your calculator: {prefilledBudget}
              </p>
            )}
          </div>
        </div>

        <div className="form-group form-field">
          <label htmlFor="message" className="form-label">
            Project Details <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            placeholder="Tell us about your project, timelines, and what success looks like for you..."
            rows={6}
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-footer">
          <span className="form-note">
            We typically respond within 2 business days.
          </span>
          <Button
            type="submit"
            variant="primary"
            className="submit-btn"
            disabled={status === 'submitting'}
            ariaLabel="Send project enquiry"
          >
            {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
          </Button>
        </div>

        {(status === 'error' || status === 'rate_limited') && (
          <p
            role="alert"
            style={{
              marginTop: 'var(--sp-md)',
              color: 'var(--text-error)',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {status === 'rate_limited' 
              ? 'You have sent too many requests. Please wait a few minutes and try again.'
              : 'Please fill in all required fields and try again.'}
          </p>
        )}
      </form>
    </AnimatedSection>
  );
}
