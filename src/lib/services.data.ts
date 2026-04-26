export interface Step {
  title: string;
  description: string;
}

export interface QA {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  title: string;
  description: string;
  features: string[];
  process: Step[];
  faq: QA[];
  relatedWork?: string;
}

export const services: ServicePage[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description:
      'We build fast, scalable web applications using Next.js, React, and modern tooling. From marketing sites to full-stack SaaS products.',
    features: [
      'Next.js / React — SSR, SSG, and streaming',
      'TypeScript throughout — no exceptions',
      'Core Web Vitals optimised from day one',
      'CMS integration (Sanity, Contentlayer, MDX)',
      'Auth, payments, and third-party API integrations',
      'Deployment on Vercel, Cloudflare, or your infra',
    ],
    process: [
      {
        title: 'Discovery',
        description:
          'We map your users, goals, and technical constraints in a 2-hour kickoff. No guessing.',
      },
      {
        title: 'Design & prototype',
        description:
          'Figma wireframes → interactive prototype → your sign-off before a line of code is written.',
      },
      {
        title: 'Build',
        description:
          'Two-week sprints. You see working software at the end of every sprint — not PowerPoints.',
      },
      {
        title: 'Launch & handover',
        description:
          'We deploy, monitor for 2 weeks post-launch, and hand over full source code and documentation.',
      },
    ],
    faq: [
      {
        question: 'How long does a typical website project take?',
        answer:
          'A marketing site takes 3–4 weeks. A full-stack web app is 6–12 weeks depending on scope. We scope precisely before starting.',
      },
      {
        question: 'Do you use templates or build from scratch?',
        answer:
          'From scratch, always. Templates create technical debt that costs you later. Everything is custom.',
      },
      {
        question: 'Will I be able to update the site myself?',
        answer:
          'Yes. We integrate a headless CMS so your team can edit content without touching code.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'We offer retainer packages for ongoing development and maintenance. Or we hand over cleanly — your choice.',
      },
    ],
    relatedWork: 'web',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    description:
      'Cross-platform iOS and Android apps built with Flutter or React Native. One codebase, two stores, no compromise on quality.',
    features: [
      'Flutter (recommended) or React Native',
      'iOS and Android from a single codebase',
      'Offline-first architecture where needed',
      'Push notifications, deep linking, biometric auth',
      'App Store and Play Store submission handled',
      'Post-launch analytics and crash reporting',
    ],
    process: [
      {
        title: 'Scoping',
        description:
          'We define MVP features vs nice-to-haves. Most first apps should launch with 3–5 core screens.',
      },
      {
        title: 'UI/UX design',
        description:
          'Platform-native design patterns. We do not port a website to mobile — we design for thumbs.',
      },
      {
        title: 'Development',
        description:
          'Weekly builds delivered to TestFlight and Play Console. You test on real devices throughout.',
      },
      {
        title: 'Launch',
        description:
          'We handle app store listings, screenshots, and metadata. Approval usually takes 3–5 days.',
      },
    ],
    faq: [
      {
        question: 'Flutter or React Native — which is better?',
        answer:
          'Flutter for performance and visual consistency. React Native if your team already knows React. We recommend Flutter for most projects.',
      },
      {
        question: 'Can you update an existing app?',
        answer:
          'Yes. We audit the existing codebase first and give you an honest assessment of what can be improved vs rebuilt.',
      },
      {
        question: 'How much does an app cost?',
        answer:
          'A focused MVP is typically ₹4–8L. A full-featured product is ₹10–25L. We scope before quoting.',
      },
    ],
    relatedWork: 'mobile',
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    description:
      'We build AI-powered features and products using the latest models — OpenAI, Anthropic, Gemini — integrated into your existing systems.',
    features: [
      'LLM integration (OpenAI, Anthropic, Gemini)',
      'RAG pipelines with vector databases (Pinecone, pgvector)',
      'AI chatbots trained on your content',
      'Document processing and extraction',
      'Fine-tuning for domain-specific tasks',
      'AI feature integration into existing products',
    ],
    process: [
      {
        title: 'Use case audit',
        description:
          'We identify where AI actually adds value in your product vs where it is a distraction.',
      },
      {
        title: 'Prototype',
        description:
          'A working prototype in 1–2 weeks so you can evaluate quality before committing to a full build.',
      },
      {
        title: 'Production build',
        description:
          'Scalable architecture, rate limiting, fallbacks, and cost controls from the start.',
      },
      {
        title: 'Evaluation',
        description:
          'We set up evals so you can measure output quality over time as models evolve.',
      },
    ],
    faq: [
      {
        question: 'Is my data safe when using AI APIs?',
        answer:
          'Yes — we use API-mode which means your data is not used for training. We help you set up data retention policies.',
      },
      {
        question: 'Will AI responses always be accurate?',
        answer:
          'No AI system is 100% accurate. We build safeguards: retrieval grounding, confidence thresholds, and human-in-the-loop fallbacks.',
      },
      {
        question: 'How much does AI integration cost?',
        answer:
          'A focused integration (e.g. a chatbot on your docs) is ₹1.5–3L. A full AI-powered product is scoped separately.',
      },
    ],
    relatedWork: 'ai',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    description:
      'We automate repetitive business processes using n8n, Make, and custom pipelines — so your team spends time on work that matters.',
    features: [
      'n8n and Make.com workflow automation',
      'CRM, email, and calendar integrations',
      'Document processing and data extraction',
      'Slack, Notion, and Google Workspace automation',
      'Custom webhook-based triggers',
      'Monitoring, alerting, and error handling',
    ],
    process: [
      {
        title: 'Process mapping',
        description:
          'We document the manual steps, decision points, and edge cases of the process you want to automate.',
      },
      {
        title: 'Tool selection',
        description:
          'We choose the right tool for each automation — n8n for complex logic, Make for quick integrations, custom code for everything else.',
      },
      {
        title: 'Build and test',
        description:
          'We build the automation, test with real data, and handle edge cases before go-live.',
      },
      {
        title: 'Handover',
        description:
          'We document the workflow so your team can adjust it without depending on us.',
      },
    ],
    faq: [
      {
        question: 'What is the difference between n8n and Make?',
        answer:
          'n8n is self-hostable and better for complex logic. Make is faster to set up for simpler integrations. We choose based on your needs.',
      },
      {
        question: 'Can you automate our existing tools without replacing them?',
        answer:
          'Yes. We connect to your existing stack via APIs — no migration needed.',
      },
      {
        question: 'How long before an automation is live?',
        answer:
          'Simple automations go live in 1–2 weeks. Complex multi-step workflows take 3–5 weeks.',
      },
    ],
    relatedWork: 'ai',
  },
  {
    slug: 'digital-branding',
    title: 'Digital Branding',
    description:
      'Brand identity and design systems for startups that need to look credible from day one — logo, colors, typography, and component library.',
    features: [
      'Logo design and brand mark variants',
      'Color palette with dark and light mode',
      'Typography system with web-safe font pairings',
      'Brand guidelines document',
      'UI component library in Figma',
      'Asset export for web, mobile, and print',
    ],
    process: [
      {
        title: 'Brand audit',
        description:
          'If you have existing branding, we identify what works and what to evolve. If you are starting fresh, we start with positioning.',
      },
      {
        title: 'Direction',
        description:
          'Three mood board directions. You pick one. We refine — not restart.',
      },
      {
        title: 'Design',
        description:
          'Logo → color system → typography → components. Delivered in Figma with organised layers.',
      },
      {
        title: 'Handover',
        description:
          'SVG/PNG exports, brand guidelines PDF, and a Figma file you own completely.',
      },
    ],
    faq: [
      {
        question: 'Do you do logo design only?',
        answer:
          'We can, but we recommend the full brand system — a logo without a color system and typography creates inconsistent results.',
      },
      {
        question: 'How many logo concepts do we get?',
        answer:
          'Three initial directions, then two rounds of refinement on the chosen direction.',
      },
      {
        question: 'Can you match our existing brand?',
        answer:
          'Yes — brand evolution (keeping the core, modernising the execution) is a common brief.',
      },
    ],
    relatedWork: 'web',
  },
  {
    slug: 'consulting-strategy',
    title: 'Consulting & Strategy',
    description:
      'Technical strategy, architecture review, and product advice for founders and CTOs who need an expert second opinion before committing to a build.',
    features: [
      'Technical architecture review',
      'Tech stack selection and trade-off analysis',
      'MVP scoping and build-vs-buy decisions',
      'Code audit and quality assessment',
      'Hiring and team structure advice',
      'Product roadmap prioritisation',
    ],
    process: [
      {
        title: 'Brief',
        description:
          'You send us the context — existing code, architecture docs, the decision you are facing.',
      },
      {
        title: 'Review',
        description:
          'We spend 2–3 days going deep — reading code, testing assumptions, mapping risks.',
      },
      {
        title: 'Report',
        description:
          'A written report with findings, recommendations, and trade-offs. Not a slide deck.',
      },
      {
        title: 'Follow-up call',
        description:
          'A 1-hour call to discuss the report, answer questions, and agree next steps.',
      },
    ],
    faq: [
      {
        question: 'Is this just a code review?',
        answer:
          'It can be, or it can be broader — architecture, process, team structure, tooling. You define the scope.',
      },
      {
        question: 'Can you help us hire a technical team?',
        answer:
          'Yes — we help define roles, write job specs, and conduct technical interviews as a fractional CTO.',
      },
      {
        question: 'How fast can you turn around a consulting report?',
        answer: 'Typically 5–7 business days from receiving all materials.',
      },
    ],
    relatedWork: undefined,
  },
];

export function getService(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
