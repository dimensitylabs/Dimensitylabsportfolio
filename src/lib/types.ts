// src/lib/types.ts

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  num: string;
  title: string;
  tags: string[];
  description: string;
  detail: string;
}

export interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  layout: 'featured' | 'standard' | 'wide';
  award?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
}

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export interface PricingTier {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  featured: boolean;
  badge?: string;
  ctaLabel: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Office {
  city: string;
  badge: string;
  badgeAccent: boolean;
  address: string;
  status: string;
  active: boolean;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactEmail {
  label: string;
  email: string;
}
