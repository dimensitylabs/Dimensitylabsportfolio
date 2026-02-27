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

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // In production, replace with an actual API call
    if (form.name && form.email && form.message) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <AnimatedSection as="div" className="contact-form-wrap">
        <div style={{ textAlign: 'center', padding: 'var(--sp-2xl) var(--sp-xl)' }}>
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
          <p style={{ color: 'var(--clr-ink-mid)', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto' }}>
            Thank you, {form.name}. We&apos;ll review your enquiry and respond
            within two business days.
          </p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection as="div" className="contact-form-wrap" delay={0.1}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
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
          <div className="form-group">
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

        <div className="form-group">
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
          <div className="form-group">
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
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
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
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
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
            variant="primary"
            disabled={status === 'submitting'}
            ariaLabel="Send project enquiry"
          >
            {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
          </Button>
        </div>

        {status === 'error' && (
          <p
            role="alert"
            style={{
              marginTop: 'var(--sp-md)',
              color: '#d94444',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Please fill in all required fields and try again.
          </p>
        )}
      </form>
    </AnimatedSection>
  );
}
