// src/lib/data.ts

import type {
  NavLink,
  Service,
  Project,
  TeamMember,
  Testimonial,
  Value,
  ProcessStep,
  PricingTier,
  FAQ,
  Office,
  TimelineEvent,
  Stat,
  ContactEmail,
} from './types';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export const marqueeItems: string[] = [
  'Web Development',
  'Mobile Apps',
  'AI Solutions',
  'AI Automation',
  'Digital Branding',
  'Consulting',
  'Web Development',
  'Mobile Apps',
];

export const heroStats: Stat[] = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '5+', label: 'Services Offered' },
  { value: '100%', label: 'Client Satisfaction' },
];

export const aboutStats: Stat[] = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '5+', label: 'Services Offered' },
  { value: 'Global', label: 'Clients' },
];

export const philosophyStats: Stat[] = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '5+', label: 'Services' },
  { value: 'Est. 2025', label: '' },
  { value: '100%', label: 'Client Satisfaction' },
];

export const services: Service[] = [
  {
    num: '01',
    title: 'Web Design & Development',
    tags: ['Landing Pages', 'Web Apps', 'E-Commerce', 'CMS', 'SEO'],
    description:
      "We craft high-performance websites using Next.js, React, and modern UI frameworks. From portfolio sites to full-stack SaaS dashboards — built for speed, SEO, and scale. We don't just make things look good; we make them convert.",
    detail: '',
  },
  {
    num: '02',
    title: 'Mobile App Development',
    tags: ['iOS & Android', 'React Native', 'Flutter', 'UI/UX', 'App Store Publishing'],
    description:
      'Cross-platform mobile apps built with React Native or Flutter. We handle everything — design, development, and deployment to both the App Store and Google Play. Apps your users will actually enjoy using.',
    detail: '',
  },
  {
    num: '03',
    title: 'AI Solutions',
    tags: ['Chatbots', 'LLM Integration', 'Recommendation Engines', 'AI Dashboards'],
    description:
      "From custom AI chatbots to full LLM integrations using OpenAI, Claude, and Gemini — we bring the power of AI directly into your product. Whether it's automating customer support or building intelligent dashboards, we make AI practical and accessible.",
    detail: '',
  },
  {
    num: '04',
    title: 'AI Automation',
    tags: ['Make', 'n8n', 'Zapier', 'CRM Automation', 'Data Pipelines', 'API Integration'],
    description:
      "We build automation pipelines that eliminate manual work — from lead generation to reporting. Using Make, n8n, Zapier, and custom APIs, we help businesses reclaim hours every week and scale without adding headcount.",
    detail: '',
  },
  {
    num: '05',
    title: 'Digital Branding',
    tags: ['Logo Design', 'Brand Identity', 'Style Guide', 'Social Assets', 'Pitch Decks'],
    description:
      'We create visual identities that are distinctive, scalable, and on-brand — across every touchpoint. Logo, color system, typography, and a brand guide that makes everything future-consistent. Because your brand is the first thing people judge you on.',
    detail: '',
  },
  {
    num: '06',
    title: 'Consulting & Strategy',
    tags: ['Digital Audit', 'Tech Stack Review', 'Growth Roadmap', 'AI Readiness'],
    description:
      "Not sure what you need? We'll audit your current digital setup and give you a clear, actionable roadmap. No fluff, no vague decks — just an honest assessment of where you are and exactly what to do next.",
    detail: '',
  },
];

export const homeServicesList = services.map((s) => ({
  num: s.num,
  name: s.title,
}));

export const featuredProjects: Project[] = [
  {
    title: 'E-Commerce Platform — Full Stack Build',
    category: 'Web Development',
    year: '2025',
    description: '',
    tags: ['Web Development'],
    image: '/images/work/ecommerce-platform.jpg',
    imageAlt: 'E-commerce platform project',
    layout: 'featured',
  },
  {
    title: 'AI Chatbot — Customer Support Automation',
    category: 'AI Solutions',
    year: '2025',
    description: '',
    tags: ['AI Solutions'],
    image: '/images/work/ai-chatbot.jpg',
    imageAlt: 'AI chatbot project',
    layout: 'standard',
  },
  {
    title: 'FinTech Mobile App — React Native',
    category: 'Mobile App',
    year: '2025',
    description: '',
    tags: ['Mobile App'],
    image: '/images/work/fintech-app.jpg',
    imageAlt: 'FinTech mobile app project',
    layout: 'standard',
  },
  {
    title: 'Workflow Automation — Lead Gen Pipeline',
    category: 'AI Automation',
    year: '2025',
    description: '',
    tags: ['AI Automation'],
    image: '/images/work/workflow-automation.jpg',
    imageAlt: 'Workflow automation project',
    layout: 'standard',
  },
  {
    title: 'Brand Identity — SaaS Startup',
    category: 'Branding',
    year: '2025',
    description: '',
    tags: ['Branding'],
    image: '/images/work/brand-identity.jpg',
    imageAlt: 'Brand identity project',
    layout: 'standard',
  },
];

export const allProjects: Project[] = [
  {
    title: 'E-Commerce Platform — Full Stack Build',
    category: 'Web Development',
    year: '2025',
    description:
      'A complete e-commerce store built with Next.js, Stripe payments, and a headless CMS. Mobile-first, fast, and conversion-optimised.',
    tags: ['Web Development'],
    image: '/images/work/ecommerce-platform.jpg',
    imageAlt: 'E-commerce platform project',
    layout: 'featured',
  },
  {
    title: 'AI Chatbot — Customer Support Automation',
    category: 'AI Solutions',
    year: '2025',
    description:
      'A custom LLM-powered chatbot trained on client documentation, reducing support tickets by 60%.',
    tags: ['AI Solutions'],
    image: '/images/work/ai-chatbot.jpg',
    imageAlt: 'AI chatbot project',
    layout: 'standard',
  },
  {
    title: 'FinTech Mobile App — React Native',
    category: 'Mobile App',
    year: '2025',
    description:
      'Cross-platform personal finance tracker built with React Native. Available on iOS and Android.',
    tags: ['Mobile App'],
    image: '/images/work/fintech-app.jpg',
    imageAlt: 'Mobile app project',
    layout: 'standard',
  },
  {
    title: 'Workflow Automation — Lead Gen Pipeline',
    category: 'AI Automation',
    year: '2025',
    description:
      'Make.com automation pipeline connecting CRM, email, and Slack — saving 20+ hours per week.',
    tags: ['AI Automation'],
    image: '/images/work/workflow-automation.jpg',
    imageAlt: 'Automation pipeline project',
    layout: 'wide',
  },
  {
    title: 'Brand Identity — SaaS Startup',
    category: 'Branding',
    year: '2025',
    description:
      'Logo, colour system, typography, and a complete brand guide for a growing B2B SaaS product.',
    tags: ['Branding'],
    image: '/images/work/brand-identity.jpg',
    imageAlt: 'Brand identity project',
    layout: 'wide',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Dimensity Labs',
    role: 'Founder & CEO',
    bio: 'Designer, developer, and AI enthusiast. Building Dimensity Labs to bridge the gap between great ideas and great digital products.',
    image: '/images/team/founder.jpg',
  },
  {
    name: "We're Growing",
    role: 'Interested in working together? Reach out.',
    href: '/contact',
    image: '/images/team/growing.jpg',
  },
];

export const values: Value[] = [
  {
    icon: '◉',
    title: 'Clarity over Cleverness',
    description:
      "We build things that are easy to use, easy to understand, and easy to scale. We don't over-engineer for the sake of it.",
  },
  {
    icon: '⟳',
    title: 'Systems Thinking',
    description:
      'Every product we build is designed to grow with you. We think in systems, not one-off solutions.',
  },
  {
    icon: '◈',
    title: 'Radical Honesty',
    description:
      "We tell you what we think — even when it's not what you want to hear. Honest feedback is how we protect your investment.",
  },
  {
    icon: '◤',
    title: 'Earned Simplicity',
    description:
      "Simplicity isn't a starting position — it's the result of working through everything that could be there and removing it one layer at a time. That process takes real effort.",
  },
  {
    icon: '△',
    title: 'Durability Over Trend',
    description:
      "We're not interested in what's fashionable this quarter. We ask: will this still feel right in ten years? That question shapes every decision we make at a formal level.",
  },
  {
    icon: '✦',
    title: 'Deep Collaboration',
    description:
      "Our best work comes when clients are genuine partners. We run working sessions, not presentations. We want you in the room when the thinking is happening — not just the reveal.",
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: '2025',
    title: 'The Idea',
    description:
      'Dimensity Labs started with a simple belief: most businesses deserve better digital tools than what they have. It began as a one-person studio with a laptop, a strong coffee habit, and a genuine obsession with technology.',
  },
  {
    year: '2025',
    title: 'First Clients',
    description:
      'We took on our first real clients — small businesses and startups who needed websites, automation, and digital help. Every project taught us something new. Every client became a case study.',
  },
  {
    year: '2025',
    title: 'Going Full-Service',
    description:
      "We expanded from web design to mobile apps, AI solutions, and automation pipelines. One roof. Every digital need. That's when Dimensity Labs became what it is today.",
  },
  {
    year: 'Now',
    title: 'Now — Growing Fast',
    description:
      "We're actively growing — taking on new projects, expanding our service offering, and building the team. If you're reading this, you're early. That's a good thing.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery & Immersion',
    description:
      'We start with a discovery call to understand your business, goals, and constraints. No assumptions — just listening.',
  },
  {
    num: '02',
    title: 'Strategy & Direction',
    description:
      'We map out the project scope, timeline, and deliverables. You get a clear plan before any work begins.',
  },
  {
    num: '03',
    title: 'Design & Develop',
    description:
      'We build fast and iterate faster. Regular check-ins keep you in the loop, and nothing ships without your sign-off.',
  },
  {
    num: '04',
    title: 'Refine & Deliver',
    description:
      'Final delivery with all source files, documentation, and a handover walkthrough. Plus 14 days of post-launch support.',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    tier: 'Starter',
    price: '₹25,000',
    period: '/ project',
    description: 'For individuals and early-stage startups who need a fast, professional web presence.',
    features: [
      'Landing Page Design',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Contact Form Integration',
      '2 Revision Rounds',
      '7-day Delivery',
      '14-day Post-Launch Support',
    ],
    featured: false,
    ctaLabel: 'Enquire About Starter',
  },
  {
    tier: 'Growth',
    price: '₹75,000',
    period: '/ project',
    description: 'For growing businesses that need a full website or app with advanced features.',
    features: [
      'Full Website (up to 8 pages)',
      'CMS Integration',
      'SEO Optimization',
      'Contact Form + Email Notification Setup',
      '3 Revision Rounds',
      'Performance Optimization',
      '14-day Delivery',
      '30-day Post-Launch Support',
    ],
    featured: true,
    badge: 'Most Common',
    ctaLabel: 'Enquire About Growth',
  },
  {
    tier: 'Custom',
    price: "Let's Talk",
    description: 'For businesses needing AI solutions, mobile apps, automations, or large-scale digital builds.',
    features: [
      'Everything in Growth, plus:',
      'AI Integration (Chatbot / Automation)',
      'Mobile App Development',
      'Custom Automation Pipeline',
      'Dedicated Project Manager',
      'Priority Support',
      'Custom Timeline',
    ],
    featured: false,
    ctaLabel: "Let's Talk",
  },
];

export const faqs: FAQ[] = [
  {
    question: 'How long does a project take?',
    answer:
      "Depends on scope. A landing page: 3–7 days. A full website: 2–4 weeks. An AI solution: 1–3 weeks. We'll give you a clear timeline before we start.",
  },
  {
    question: "What's your minimum project cost?",
    answer:
      "Our smallest projects start at ₹15,000. We're flexible — reach out and we'll find something that works for your budget.",
  },
  {
    question: 'Do you work with international clients?',
    answer:
      "Absolutely. We work with clients across India, the US, the UK, the Middle East, and beyond. We're remote-first and used to working across time zones.",
  },
  {
    question: 'Do you offer ongoing retainer work?',
    answer:
      "Yes. Once we've completed a project together, we offer monthly retainer packages for ongoing work, updates, and support.",
  },
  {
    question: "What if I'm not sure what I need?",
    answer:
      'That\'s the most common starting point. The best thing to do is fill in the form with as much context as you have and select "Not sure yet — let\'s talk." We\'ll schedule a 30-minute conversation and help you think it through, at no cost or commitment.',
  },
];

export const offices: Office[] = [
  {
    city: 'Mumbai, India',
    badge: 'HQ',
    badgeAccent: true,
    address: 'Maharashtra, India',
    status: 'Remote-first. Available across time zones.',
    active: true,
  },
  {
    city: 'Worldwide',
    badge: 'Remote',
    badgeAccent: false,
    address: "We work with clients globally — India, US, UK, Middle East, and beyond. Remote-first, always.",
    status: 'Available across time zones',
    active: true,
  },
];

export const contactEmails: ContactEmail[] = [
  { label: 'New Business', email: 'hello@dimensitylabs.dev' },
];

export const socialLinks = [
  { label: 'Instagram', abbr: 'IG', href: 'https://instagram.com/dimensitylabs' },
  { label: 'Twitter/X', abbr: 'X', href: 'https://x.com/dimensitylabs' },
  { label: 'LinkedIn', abbr: 'LI', href: 'https://linkedin.com/company/dimensitylabs' },
  { label: 'Dribbble', abbr: 'DR', href: 'https://dribbble.com/dimensitylabs' },
  { label: 'Behance', abbr: 'BE', href: 'https://behance.net/dimensitylabs' },
];

export const awardsLabels: string[] = [
  'Next.js',
  'React',
  'React Native',
  'n8n',
  'Stripe',
];

export const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'web', label: 'Web Design & Development' },
  { value: 'mobile', label: 'Mobile App Development' },
  { value: 'ai', label: 'AI Solutions' },
  { value: 'automation', label: 'AI Automation' },
  { value: 'branding', label: 'Digital Branding' },
  { value: 'consulting', label: 'Consulting & Strategy' },
  { value: 'not-sure', label: "Not sure yet — let's talk" },
];

export const budgetOptions = [
  { value: '', label: 'Select a range...' },
  { value: 'under-25k', label: 'Under ₹25,000' },
  { value: '25-75k', label: '₹25,000 – ₹75,000' },
  { value: '75-200k', label: '₹75,000 – ₹2,00,000' },
  { value: '200k-plus', label: '₹2,00,000+' },
  { value: 'not-sure', label: "Not sure — let's discuss" },
];

export const testimonial: Testimonial = {
  quote: "We don't just build websites. We build digital businesses.",
  attribution: '— Dimensity Labs, 2025',
};

