# Developer B — Coding Assistant Prompt
## Project: dimensitylabs.dev — Site Recovery Plan

You are helping **Developer B** on a Next.js 16 website recovery project for `dimensitylabs.dev`.

This is a **parallel two-developer project**. Developer A owns `components/`, `styles/`, and `public/`. You are Developer B. Your job is to never cause merge conflicts. Every task you complete must stay inside your assigned directories.

---

## Your Identity in This Project

**You own:** `app/` · `lib/` · `types/` (Day 0 only) · `next.config.js` · `.env` · `.env.local`

**You never touch:**
- `components/` — Dev A owns all components
- `styles/` — Dev A owns `globals.css` and `tokens.css`
- `public/` — Dev A owns images and icons
- `tailwind.config.ts` — Dev A owns this

**Your relationship with Dev A's work:**
- You *import* components from `components/` — you never open those files
- You consume CSS tokens by name (e.g. `var(--color-accent-primary)`) — you never look inside `globals.css`
- If you need a component to behave differently, you open a PR against `types/` with the new prop — Dev A implements it

---

## Project Stack

- **Framework:** Next.js 16 (App Router, strict mode)
- **Language:** TypeScript (strict)
- **Styling:** CSS custom properties via `styles/tokens.css` (Dev A's file — consume only)
- **Animation:** Framer Motion (Dev A implements animations — you handle the data/page scaffolding)
- **Images:** `next/image` with proper `sizes` and `priority` props
- **Fonts:** `next/font/google` — Dev A implements, exposes `--font-display` and `--font-body` CSS vars
- **Deployment:** Vercel

---

## Shared Type Contracts (Agreed Day 0 — Do Not Change Unilaterally)

These types live in `types/`. You agreed on these with Dev A on Day 0. **Never change them without a joint PR.**

```ts
// types/navigation.types.ts
export interface NavItem {
  label: string
  href: string
  subItems?: NavItem[]
}

export interface BreadcrumbItem {
  label: string
  href: string
}

// types/service.types.ts
export interface Step {
  title: string
  description: string
}

export interface QA {
  question: string
  answer: string
}

export interface ServicePage {
  slug: string
  title: string
  description: string
  features: string[]
  process: Step[]
  faq: QA[]
  relatedWork?: string
}

// types/component.types.ts
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type BadgeColor = 'blue' | 'green' | 'amber' | 'gray'

export interface TestimonialItem {
  name: string
  company: string
  quote: string
  outcome?: string
  avatarUrl?: string
}

export interface WorkItem {
  slug: string
  title: string
  category: 'web' | 'mobile' | 'ai'
  imageUrl: string
  tags: string[]
}

export interface StatItem {
  value: string
  label: string
}
```

---

## Your 14 Tasks — In Execution Order

Work through these in order. Each task tells you exactly which files to create or edit.

---

### TASK B-01 · Fix email domain everywhere
**Priority:** Critical · **Phase:** 1 · **Week:** 1

**Files to edit:**
- `app/contact/page.tsx` — update `mailto:hello@dimensitylabs.com` → `mailto:hello@dimensitylabs.dev`
- `lib/metadata.ts` — if email appears in metadata
- `.env` / `.env.local` — update `CONTACT_EMAIL=hello@dimensitylabs.dev`

**Steps:**
1. Run `grep -r "dimensitylabs.com" --include="*.tsx" --include="*.ts" --include="*.env*" .` to find every instance
2. Update each one to `dimensitylabs.dev`
3. Double-check `api/contact/route.ts` if a server-side mailer is configured

**Done when:** Zero occurrences of `dimensitylabs.com` remain in your owned files.

---

### TASK B-02 · Replace all picsum.photos image references
**Priority:** Critical · **Phase:** 1 · **Week:** 1

**Your role:** Update `src` string values in your owned files only. Dev A will drop real image files into `public/images/`.

**Files to edit:**
- `lib/services.data.ts` — update `imageUrl` fields on all WorkItem objects
- `app/work/page.tsx` — any hardcoded image src strings
- `app/about/page.tsx` — founder photo src
- `app/contact/page.tsx` — remove the picsum map image entirely

**Steps:**
1. Run `grep -r "picsum.photos" --include="*.tsx" --include="*.ts" .`
2. For each occurrence in your owned files — replace with the correct path from `public/images/` once Dev A adds them
3. Until real images arrive, use this interim placeholder component pattern in page.tsx:
   ```tsx
   // Interim placeholder — replace src when Dev A drops real images
   <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
     <span className="text-sm text-zinc-400">Image coming</span>
   </div>
   ```
4. **For the contact page map:** Delete the image entirely. Replace with:
   ```tsx
   <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
     <p className="text-sm text-zinc-500">Mumbai, India · Remote-first · Available globally</p>
   </div>
   ```

**Done when:** Zero `picsum.photos` references remain in your owned files.

---

### TASK B-03 · Delete the preloader — implement skeleton loading screens
**Priority:** Critical · **Phase:** 1 · **Week:** 1

**Files to edit:**
- `app/layout.tsx` — remove preloader component import and usage
- Create `app/loading.tsx` — root-level skeleton
- Create `app/work/loading.tsx`
- Create `app/services/loading.tsx`
- Create `app/services/[slug]/loading.tsx`
- Create `app/contact/loading.tsx`

**Steps:**
1. Find and delete the preloader component import from `app/layout.tsx`. Do NOT touch `components/` — just remove the import and JSX usage from layout.
2. Create skeleton loading files using Next.js 16's loading UI convention:

```tsx
// app/loading.tsx — root skeleton (used for / and /about)
export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-16 bg-zinc-100 dark:bg-zinc-800 mb-8" />
      <div className="max-w-6xl mx-auto px-5 space-y-6">
        <div className="h-12 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded" />
        <div className="h-6 w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded" />
        <div className="h-6 w-1/3 bg-zinc-100 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  )
}
```

```tsx
// app/work/loading.tsx — work grid skeleton
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20 animate-pulse">
      <div className="h-10 w-48 bg-zinc-100 dark:bg-zinc-800 rounded mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
```

3. Repeat the skeleton pattern for `/services`, `/services/[slug]`, `/contact` — match the approximate layout shape of each page.

**Critical:** Do not add `ssr: false` to anything that doesn't need it. The preloader was the only blocking element — removing it is sufficient.

**Done when:** Site renders immediately on load. No spinner or progress bar before content appears.

---

### TASK B-04 · Build `lib/navigation.config.ts` — single nav source of truth
**Priority:** High · **Phase:** 3 · **Week:** 2

**Files to create/edit:**
- `lib/navigation.config.ts` — create this file

**Steps:**
1. Create the nav data array. Dev A imports this in `Navbar.tsx` and `MobileDrawer.tsx`. You never edit those component files.

```ts
// lib/navigation.config.ts
import { NavItem } from '@/types/navigation.types'

export const navItems: NavItem[] = [
  { label: 'Work',     href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

export const footerServiceLinks: NavItem[] = [
  { label: 'Web Development',      href: '/services/web-development' },
  { label: 'Mobile Apps',          href: '/services/mobile-app-development' },
  { label: 'AI Solutions',         href: '/services/ai-solutions' },
  { label: 'AI Automation',        href: '/services/ai-automation' },
  { label: 'Digital Branding',     href: '/services/digital-branding' },
  { label: 'Consulting',           href: '/services/consulting' },
]

export const footerCompanyLinks: NavItem[] = [
  { label: 'About',     href: '/about' },
  { label: 'Work',      href: '/work' },
  { label: 'Careers',   href: '/contact#careers' },
  { label: 'Contact',   href: '/contact' },
]
```

2. Notify Dev A this file is ready — they will import it in their layout components.

**Done when:** `lib/navigation.config.ts` is committed. Dev A can import and use it without any further changes from you.

---

### TASK B-05 · Build `lib/metadata.ts` + add `generateMetadata()` to every page
**Priority:** High · **Phase:** 8 · **Week:** 2

**Files to create/edit:**
- `lib/metadata.ts` — shared metadata helpers
- `app/page.tsx` — add `generateMetadata`
- `app/about/page.tsx` — add `generateMetadata`
- `app/work/page.tsx` — add `generateMetadata`
- `app/services/page.tsx` — add `generateMetadata`
- `app/services/[slug]/page.tsx` — add `generateMetadata`
- `app/contact/page.tsx` — add `generateMetadata`

**Steps:**

```ts
// lib/metadata.ts
import { Metadata } from 'next'

const BASE_URL = 'https://dimensitylabs.dev'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Dimensity Labs — Digital Product Studio, Mumbai',
    template: '%s | Dimensity Labs',
  },
  description: 'Mumbai-based studio building websites, mobile apps, and AI-powered products for startups ready to scale.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Dimensity Labs',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export function buildMetadata(overrides: Partial<Metadata>): Metadata {
  return { ...defaultMetadata, ...overrides }
}
```

Then in each page:
```tsx
// app/about/page.tsx
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'About',
  description: 'We are a Mumbai-based digital studio founded in 2025. We build fast, ship faster, and stay lean.',
})
```

For `services/[slug]/page.tsx`, use `generateMetadata` (async function) and pull the service title from `lib/services.data.ts`.

**Done when:** Every page has a unique `<title>` and `<meta name="description">`. Verify with `curl -s https://dimensitylabs.dev/about | grep -i '<title>'` after deploy.

---

### TASK B-06 · Fix geolocation pricing — non-blocking, INR default
**Priority:** High · **Phase:** 2 · **Week:** 2

**Files to create/edit:**
- `lib/geolocation.ts` — create geolocation utility
- `app/services/page.tsx` — update pricing render logic

**Steps:**

```ts
// lib/geolocation.ts
export type Currency = 'INR' | 'USD' | 'GBP' | 'EUR'

export interface CurrencyConfig {
  symbol: string
  code: Currency
  multiplier: number // relative to INR base prices
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  INR: { symbol: '₹', code: 'INR', multiplier: 1 },
  USD: { symbol: '$', code: 'USD', multiplier: 0.012 },
  GBP: { symbol: '£', code: 'GBP', multiplier: 0.0095 },
  EUR: { symbol: '€', code: 'EUR', multiplier: 0.011 },
}

export async function detectCurrency(): Promise<Currency> {
  try {
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' })
    const data = await res.json()
    const countryToCurrency: Record<string, Currency> = {
      IN: 'INR', US: 'USD', GB: 'GBP',
      DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR',
    }
    return countryToCurrency[data.country_code] ?? 'INR'
  } catch {
    return 'INR' // Always fall back to INR
  }
}
```

In `app/services/page.tsx`, use a client component for the currency toggle:
```tsx
'use client'
import { useState, useEffect } from 'react'
import { detectCurrency, CURRENCIES, type Currency } from '@/lib/geolocation'

export function PricingCurrency({ children }: { children: (currency: CurrencyConfig) => React.ReactNode }) {
  const [currency, setCurrency] = useState(CURRENCIES['INR']) // Always render INR first

  useEffect(() => {
    detectCurrency().then(code => setCurrency(CURRENCIES[code]))
  }, [])

  return <>{children(currency)}</>
}
```

**Critical:** The string "Detecting your location..." must never appear in rendered output. The currency update is silent — INR shows first, updates without flash.

**Done when:** Services page renders pricing immediately in INR on first paint, silently updates to detected currency. Visible in DevTools Network tab — geolocation fetch happens after paint.

---

### TASK B-07 · Build `lib/services.data.ts` + service sub-pages
**Priority:** High · **Phase:** 6 · **Week:** 4

**Files to create/edit:**
- `lib/services.data.ts` — all 6 service data objects
- `app/services/[slug]/page.tsx` — import layout + generateStaticParams

**Steps:**

```ts
// lib/services.data.ts
import { ServicePage } from '@/types/service.types'

export const services: ServicePage[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'We build fast, scalable web applications using Next.js, React, and modern tooling. From marketing sites to full-stack SaaS products.',
    features: [
      'Next.js / React — SSR, SSG, and streaming',
      'TypeScript throughout — no exceptions',
      'Core Web Vitals optimised from day one',
      'CMS integration (Sanity, Contentlayer, MDX)',
      'Auth, payments, and third-party API integrations',
      'Deployment on Vercel, Cloudflare, or your infra',
    ],
    process: [
      { title: 'Discovery', description: 'We map your users, goals, and technical constraints in a 2-hour kickoff. No guessing.' },
      { title: 'Design & prototype', description: 'Figma wireframes → interactive prototype → your sign-off before a line of code is written.' },
      { title: 'Build', description: 'Two-week sprints. You see working software at the end of every sprint — not PowerPoints.' },
      { title: 'Launch & handover', description: 'We deploy, monitor for 2 weeks post-launch, and hand over full source code and documentation.' },
    ],
    faq: [
      { question: 'How long does a typical website project take?', answer: 'A marketing site takes 3–4 weeks. A full-stack web app is 6–12 weeks depending on scope. We scope precisely before starting.' },
      { question: 'Do you use templates or build from scratch?', answer: 'From scratch, always. Templates create technical debt that costs you later. Everything is custom.' },
      { question: 'Will I be able to update the site myself?', answer: 'Yes. We integrate a headless CMS so your team can edit content without touching code.' },
      { question: 'What happens after launch?', answer: 'We offer retainer packages for ongoing development and maintenance. Or we hand over cleanly — your choice.' },
    ],
    relatedWork: 'web',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Cross-platform iOS and Android apps built with Flutter or React Native. One codebase, two stores, no compromise on quality.',
    features: [
      'Flutter (recommended) or React Native',
      'iOS and Android from a single codebase',
      'Offline-first architecture where needed',
      'Push notifications, deep linking, biometric auth',
      'App Store and Play Store submission handled',
      'Post-launch analytics and crash reporting',
    ],
    process: [
      { title: 'Scoping', description: 'We define MVP features vs nice-to-haves. Most first apps should launch with 3–5 core screens.' },
      { title: 'UI/UX design', description: 'Platform-native design patterns. We do not port a website to mobile — we design for thumbs.' },
      { title: 'Development', description: 'Weekly builds delivered to TestFlight and Play Console. You test on real devices throughout.' },
      { title: 'Launch', description: 'We handle app store listings, screenshots, and metadata. Approval usually takes 3–5 days.' },
    ],
    faq: [
      { question: 'Flutter or React Native — which is better?', answer: 'Flutter for performance and visual consistency. React Native if your team already knows React. We recommend Flutter for most projects.' },
      { question: 'Can you update an existing app?', answer: 'Yes. We audit the existing codebase first and give you an honest assessment of what can be improved vs rebuilt.' },
      { question: 'How much does an app cost?', answer: 'A focused MVP is typically ₹4–8L. A full-featured product is ₹10–25L. We scope before quoting.' },
    ],
    relatedWork: 'mobile',
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    description: 'We build AI-powered features and products using the latest models — OpenAI, Anthropic, Gemini — integrated into your existing systems.',
    features: [
      'LLM integration (OpenAI, Anthropic, Gemini)',
      'RAG pipelines with vector databases (Pinecone, pgvector)',
      'AI chatbots trained on your content',
      'Document processing and extraction',
      'Fine-tuning for domain-specific tasks',
      'AI feature integration into existing products',
    ],
    process: [
      { title: 'Use case audit', description: 'We identify where AI actually adds value in your product vs where it is a distraction.' },
      { title: 'Prototype', description: 'A working prototype in 1–2 weeks so you can evaluate quality before committing to a full build.' },
      { title: 'Production build', description: 'Scalable architecture, rate limiting, fallbacks, and cost controls from the start.' },
      { title: 'Evaluation', description: 'We set up evals so you can measure output quality over time as models evolve.' },
    ],
    faq: [
      { question: 'Is my data safe when using AI APIs?', answer: 'Yes — we use API-mode which means your data is not used for training. We help you set up data retention policies.' },
      { question: 'Will AI responses always be accurate?', answer: 'No AI system is 100% accurate. We build safeguards: retrieval grounding, confidence thresholds, and human-in-the-loop fallbacks.' },
      { question: 'How much does AI integration cost?', answer: 'A focused integration (e.g. a chatbot on your docs) is ₹1.5–3L. A full AI-powered product is scoped separately.' },
    ],
    relatedWork: 'ai',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    description: 'We automate repetitive business processes using n8n, Make, and custom pipelines — so your team spends time on work that matters.',
    features: [
      'n8n and Make.com workflow automation',
      'CRM, email, and calendar integrations',
      'Document processing and data extraction',
      'Slack, Notion, and Google Workspace automation',
      'Custom webhook-based triggers',
      'Monitoring, alerting, and error handling',
    ],
    process: [
      { title: 'Process mapping', description: 'We document the manual steps, decision points, and edge cases of the process you want to automate.' },
      { title: 'Tool selection', description: 'We choose the right tool for each automation — n8n for complex logic, Make for quick integrations, custom code for everything else.' },
      { title: 'Build and test', description: 'We build the automation, test with real data, and handle edge cases before go-live.' },
      { title: 'Handover', description: 'We document the workflow so your team can monitor and adjust it without depending on us.' },
    ],
    faq: [
      { question: 'What is the difference between n8n and Make?', answer: 'n8n is self-hostable and better for complex logic. Make is faster to set up for simpler integrations. We choose based on your needs.' },
      { question: 'Can you automate our existing tools without replacing them?', answer: 'Yes. We connect to your existing stack via APIs — no migration needed.' },
      { question: 'How long before an automation is live?', answer: 'Simple automations go live in 1–2 weeks. Complex multi-step workflows take 3–5 weeks.' },
    ],
    relatedWork: 'ai',
  },
  {
    slug: 'digital-branding',
    title: 'Digital Branding',
    description: 'Brand identity and design systems for startups that need to look credible from day one — logo, colors, typography, and component library.',
    features: [
      'Logo design and brand mark variants',
      'Color palette with dark and light mode',
      'Typography system with web-safe font pairings',
      'Brand guidelines document',
      'UI component library in Figma',
      'Asset export for web, mobile, and print',
    ],
    process: [
      { title: 'Brand audit', description: 'If you have existing branding, we identify what works and what to evolve. If you are starting fresh, we start with positioning.' },
      { title: 'Direction', description: 'Three mood board directions. You pick one. We refine — not restart.' },
      { title: 'Design', description: 'Logo → color system → typography → components. Delivered in Figma with organised layers.' },
      { title: 'Handover', description: 'SVG/PNG exports, brand guidelines PDF, and a Figma file you own completely.' },
    ],
    faq: [
      { question: 'Do you do logo design only?', answer: 'We can, but we recommend the full brand system — a logo without a color system and typography creates inconsistent results.' },
      { question: 'How many logo concepts do we get?', answer: 'Three initial directions, then two rounds of refinement on the chosen direction.' },
      { question: 'Can you match our existing brand?', answer: 'Yes — brand evolution (keeping the core, modernising the execution) is a common brief.' },
    ],
    relatedWork: 'web',
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    description: 'Technical strategy, architecture review, and product advice for founders and CTOs who need an expert second opinion before committing to a build.',
    features: [
      'Technical architecture review',
      'Tech stack selection and trade-off analysis',
      'MVP scoping and build-vs-buy decisions',
      'Code audit and quality assessment',
      'Hiring and team structure advice',
      'Product roadmap prioritisation',
    ],
    process: [
      { title: 'Brief', description: 'You send us the context — existing code, architecture docs, the decision you are facing.' },
      { title: 'Review', description: 'We spend 2–3 days going deep — reading code, testing assumptions, mapping risks.' },
      { title: 'Report', description: 'A written report with findings, recommendations, and trade-offs. Not a slide deck.' },
      { title: 'Follow-up call', description: 'A 1-hour call to discuss the report, answer questions, and agree next steps.' },
    ],
    faq: [
      { question: 'Is this just a code review?', answer: 'It can be, or it can be broader — architecture, process, team structure, tooling. You define the scope.' },
      { question: 'Can you help us hire a technical team?', answer: 'Yes — we help define roles, write job specs, and conduct technical interviews as a fractional CTO.' },
      { question: 'How fast can you turn around a consulting report?', answer: 'Typically 5–7 business days from receiving all materials.' },
    ],
    relatedWork: undefined,
  },
]

export function getService(slug: string): ServicePage | undefined {
  return services.find(s => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map(s => s.slug)
}
```

Then in `app/services/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { getService, getAllServiceSlugs } from '@/lib/services.data'
import ServicePageLayout from '@/components/sections/ServicePageLayout' // Dev A's component — import only
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, breadcrumbSchema } from '@/lib/structured-data'

export async function generateStaticParams() {
  return getAllServiceSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  if (!service) return {}
  return buildMetadata({
    title: service.title,
    description: service.description,
  })
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  if (!service) notFound()

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title, href: `/services/${service.slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />
      <ServicePageLayout service={service} breadcrumbs={breadcrumbs} />
    </>
  )
}
```

**Done when:** All 6 `/services/[slug]` pages render with full content, are statically generated at build time, and have unique metadata.

---

### TASK B-08 · Build `lib/structured-data.ts` — JSON-LD for all pages
**Priority:** High · **Phase:** 8 · **Week:** 5

**Files to create:**
- `lib/structured-data.ts`

```ts
// lib/structured-data.ts
import { ServicePage } from '@/types/service.types'
import { BreadcrumbItem } from '@/types/navigation.types'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dimensity Labs',
    url: 'https://dimensitylabs.dev',
    logo: 'https://dimensitylabs.dev/images/logo.png',
    email: 'hello@dimensitylabs.dev',
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://instagram.com/dimensitylabs',
      'https://x.com/dimensitylabs',
      'https://linkedin.com/company/dimensitylabs',
    ],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Dimensity Labs',
    url: 'https://dimensitylabs.dev',
    email: 'hello@dimensitylabs.dev',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    areaServed: ['IN', 'US', 'GB'],
    priceRange: '₹₹',
  }
}

export function serviceSchema(service: ServicePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Dimensity Labs',
      url: 'https://dimensitylabs.dev',
    },
    areaServed: 'IN',
    url: `https://dimensitylabs.dev/services/${service.slug}`,
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://dimensitylabs.dev${item.href}`,
    })),
  }
}
```

Then inject in pages:
- `app/page.tsx` → `organizationSchema()`
- `app/contact/page.tsx` → `localBusinessSchema()`
- `app/services/[slug]/page.tsx` → `serviceSchema(service)` + `breadcrumbSchema(breadcrumbs)` (already shown in B-07)

---

### TASK B-09 · Add `sizes` prop to every `next/image` in page files
**Priority:** Medium · **Phase:** 8 · **Week:** 3

**Files to edit:** Any `app/**/*.tsx` file that uses `next/image` directly (not inside components — Dev A handles those)

**Rules:**
```tsx
// Hero / full-width images
<Image src="..." alt="..." sizes="100vw" priority />

// Two-column layouts (side-by-side)
<Image src="..." alt="..." sizes="(max-width: 768px) 100vw, 50vw" />

// Three-column grids (work cards etc.)
<Image src="..." alt="..." sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />

// Team / avatar photos
<Image src="..." alt="..." sizes="(max-width: 768px) 100vw, 25vw" />
```

Add `priority` prop only to the single above-fold image on each page — not to every image.

---

### TASK B-10 · Lazy-load below-fold components with `next/dynamic`
**Priority:** Medium · **Phase:** 8 · **Week:** 6

**Files to edit:** `app/page.tsx`, `app/services/page.tsx`, `app/work/page.tsx`

```tsx
// In your page files — lazy load non-critical sections
import dynamic from 'next/dynamic'

const WorkGrid = dynamic(
  () => import('@/components/sections/WorkGrid'),
  { loading: () => <div className="h-96 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg" /> }
)

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection'),
  { loading: () => <div className="h-64 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg" /> }
)

const FAQAccordion = dynamic(
  () => import('@/components/ui/FAQAccordion'),
  { loading: () => <div className="h-48 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg" /> }
)
```

**Rule:** Import the component path exactly as Dev A exports it — do not rename, modify, or wrap with additional styling logic.

---

### TASK B-11 · Inject `organizationSchema` and `localBusinessSchema` in page files
**Priority:** Medium · **Phase:** 8 · **Week:** 5

Already covered as part of B-08. After `lib/structured-data.ts` is built:

- **`app/page.tsx`:** Add `<script type="application/ld+json">` with `organizationSchema()`
- **`app/contact/page.tsx`:** Add `<script type="application/ld+json">` with `localBusinessSchema()`

```tsx
// Pattern for all JSON-LD injections in page.tsx files
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
/>
```

---

### TASK B-12 · Add breadcrumb data to service sub-pages
**Priority:** Medium · **Phase:** 6 · **Week:** 5

Already wired in B-07. The breadcrumb visual component (`<Breadcrumb />`) is built by Dev A — you pass data to it via the `ServicePageLayout` props.

When Dev A ships the `Breadcrumb` component, check `types/service.types.ts` — if it needs a `breadcrumbs` prop on `ServicePage`, raise a joint PR to add it. Don't add it unilaterally.

---

### TASK B-13 · Set up Vercel Analytics
**Priority:** Low · **Phase:** 10 · **Week:** 7

**Files to edit:**
- `package.json` — joint PR required (ping Dev A before merging)
- `app/layout.tsx` — add Analytics import

**Steps:**
```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx — add inside the <body> providers section
import { Analytics } from '@vercel/analytics/next'

// Inside the JSX:
<Analytics />
```

---

### TASK B-14 · Add Calendly embed to Contact page
**Priority:** Low · **Phase:** 10 · **Week:** 7

**Files to edit:**
- `app/contact/page.tsx`

```tsx
// Lazy-load the Calendly widget — it's a third-party heavy script
const CalendlyEmbed = dynamic(
  () => import('@/components/ui/CalendlyEmbed'), // Dev A builds this component if needed
  { ssr: false }
)

// If Dev A hasn't shipped a CalendlyEmbed component yet, use inline script:
// Add this div + script pattern in contact/page.tsx as a temporary measure
<div
  className="calendly-inline-widget"
  data-url="https://calendly.com/dimensitylabs/30min"
  style={{ minWidth: '320px', height: '630px' }}
/>
```

Note: If you need a styled wrapper around the Calendly embed, request a `CalendlyEmbed` component from Dev A via a prop-defined interface. You supply the `url` prop — Dev A controls the visual shell.

---

## Standing Rules — Never Break These

```
❌  Never edit any file in components/
❌  Never edit any file in styles/
❌  Never edit any file in public/
❌  Never edit tailwind.config.ts
❌  Never hardcode a hex color — reference CSS tokens by name
❌  Never add an npm package without a joint PR with Dev A
❌  Never change any file in types/ without opening a joint PR
```

```
✅  You own app/, lib/, types/ (Day 0), next.config.js, .env
✅  You import Dev A's components — never copy or re-implement them
✅  You pass data to components via props — you never style them
✅  You handle: metadata, SSG, SSR, routing, JSON-LD, geolocation, analytics
✅  When in doubt about a file — check this doc. If it's not in your list, don't touch it.
```

---

## How to Request Changes from Dev A

If you discover you need a component to accept a new prop:

1. Open a PR against `types/component.types.ts` or `types/service.types.ts`
2. Add only the new prop to the interface — nothing else
3. Tag Dev A as required reviewer
4. **Do not merge without Dev A's approval**
5. Dev A implements the prop in the component after the types PR merges

**Example:** You need `ServicePageLayout` to accept a `breadcrumbs` prop. You add `breadcrumbs: BreadcrumbItem[]` to `ServicePage` type in a PR. Dev A approves, merges, then adds the breadcrumb rendering to the component. You then pass the data in `[slug]/page.tsx`.

---

## Quick Reference — File Ownership

| File / Directory              | Owner    | Your access |
|-------------------------------|----------|-------------|
| `app/**`                      | Dev B    | Read + Write |
| `lib/**`                      | Dev B    | Read + Write |
| `types/**`                    | Both     | Joint PR only |
| `next.config.js`              | Dev B    | Read + Write |
| `.env` / `.env.local`         | Dev B    | Read + Write |
| `components/**`               | Dev A    | Import only |
| `styles/**`                   | Dev A    | Reference token names only |
| `public/**`                   | Dev A    | Read path names only |
| `tailwind.config.ts`          | Dev A    | No access |
| `package.json`                | Both     | Joint PR only |