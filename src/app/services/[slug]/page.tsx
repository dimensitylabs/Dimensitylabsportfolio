import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ServiceSeoData = {
  name: string;
  shortTitle: string;
  metaDescription: string;
  intro: string;
  deliverables: string[];
  keywords: string[];
};

const servicePages: Record<string, ServiceSeoData> = {
  'web-development': {
    name: 'Web Development Services in Mumbai',
    shortTitle: 'Web Development',
    metaDescription:
      'Web development company in Mumbai building high-performance websites and web apps with SEO-ready architecture and conversion-first UX.',
    intro:
      'We design and develop fast, SEO-ready websites and web applications for startups and growing businesses that need measurable results.',
    deliverables: [
      'Marketing websites and landing pages',
      'Custom web applications with modern stacks',
      'Technical SEO architecture and performance optimization',
      'Conversion-focused UX and analytics setup',
    ],
    keywords: [
      'web development company mumbai',
      'website development agency mumbai',
      'next js development agency',
    ],
  },
  'mobile-app-development': {
    name: 'Mobile App Development Services in Mumbai',
    shortTitle: 'Mobile App Development',
    metaDescription:
      'Mobile app development company in Mumbai delivering scalable iOS and Android apps with product strategy, UI UX, and launch support.',
    intro:
      'We build mobile apps that are designed for retention and performance, from MVP to production rollout across iOS and Android.',
    deliverables: [
      'Cross-platform and native app development',
      'App UX design and user journey optimization',
      'API integrations and backend architecture',
      'App launch support and iteration roadmap',
    ],
    keywords: [
      'mobile app development company mumbai',
      'app development agency mumbai',
      'react native development mumbai',
    ],
  },
  'ai-solutions': {
    name: 'AI Solutions Development in Mumbai',
    shortTitle: 'AI Solutions',
    metaDescription:
      'AI solutions company in Mumbai building custom AI assistants, recommendation systems, and practical AI integrations for businesses.',
    intro:
      'We build practical AI products that improve customer experience and internal decision-making with reliable, business-first implementation.',
    deliverables: [
      'Custom AI assistant and chatbot systems',
      'Knowledge base and retrieval integrations',
      'AI workflow and dashboard implementation',
      'Model evaluation and reliability safeguards',
    ],
    keywords: [
      'ai solutions company mumbai',
      'ai development agency mumbai',
      'custom ai chatbot development',
    ],
  },
  'ai-automation': {
    name: 'AI Automation Agency in Mumbai',
    shortTitle: 'AI Automation',
    metaDescription:
      'AI automation agency in Mumbai for workflow automation, CRM integrations, and operational systems that reduce manual work.',
    intro:
      'We automate repetitive workflows using AI and integrations so your team can focus on growth instead of manual operations.',
    deliverables: [
      'Lead qualification and CRM automation flows',
      'Internal operations automation with integrations',
      'Reporting and process orchestration systems',
      'Automation monitoring and optimization',
    ],
    keywords: [
      'ai automation agency mumbai',
      'workflow automation services mumbai',
      'n8n automation agency india',
    ],
  },
  'digital-branding': {
    name: 'Digital Branding Services in Mumbai',
    shortTitle: 'Digital Branding',
    metaDescription:
      'Digital branding agency in Mumbai creating brand identity systems, visual language, and digital assets for modern growth brands.',
    intro:
      'We create digital brand systems that stay consistent across websites, products, social channels, and performance campaigns.',
    deliverables: [
      'Brand strategy and positioning',
      'Logo, typography, and visual identity systems',
      'Digital brand guidelines and asset kits',
      'Website and social touchpoint consistency',
    ],
    keywords: [
      'branding agency mumbai',
      'digital branding agency mumbai',
      'brand identity design mumbai',
    ],
  },
  'consulting-strategy': {
    name: 'Digital Consulting and Strategy in Mumbai',
    shortTitle: 'Consulting & Strategy',
    metaDescription:
      'Digital consulting services in Mumbai for technology roadmap, growth strategy, and AI readiness planning for scaling teams.',
    intro:
      'We help teams choose the right digital roadmap with practical consulting across product, technology, automation, and growth systems.',
    deliverables: [
      'Technology and product audits',
      'Growth roadmap and prioritization',
      'AI readiness and automation planning',
      'Execution strategy with delivery milestones',
    ],
    keywords: [
      'digital consulting services mumbai',
      'technology strategy consulting mumbai',
      'ai readiness consulting india',
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages[slug];
  if (!service) {
    return {};
  }

  const url = `https://dimensitylabs.com/services/${slug}`;

  return {
    title: service.name,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: service.name,
      description: service.metaDescription,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.name,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicePages[slug];
  if (!service) {
    notFound();
  }

  const serviceUrl = `https://dimensitylabs.com/services/${slug}`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    provider: {
      '@type': 'Organization',
      name: 'Dimensity Labs',
      url: 'https://dimensitylabs.com',
    },
    areaServed: 'Mumbai',
    description: service.metaDescription,
    serviceType: service.shortTitle,
    url: serviceUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dimensitylabs.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://dimensitylabs.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.shortTitle,
        item: serviceUrl,
      },
    ],
  };

  return (
    <section style={{ paddingTop: 'calc(var(--nav-h) + var(--sp-2xl))', paddingBottom: 'var(--sp-2xl)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container" style={{ maxWidth: '900px' }}>
        <p className="t-label" style={{ marginBottom: 'var(--sp-sm)' }}>Services</p>
        <h1 className="t-h1" style={{ marginBottom: 'var(--sp-md)' }}>{service.name}</h1>
        <p className="t-body-lg" style={{ color: 'var(--clr-ink-mid)', marginBottom: 'var(--sp-xl)' }}>
          {service.intro}
        </p>

        <h2 className="t-h3" style={{ marginBottom: 'var(--sp-md)' }}>What You Get</h2>
        <ul style={{ display: 'grid', gap: '12px', marginBottom: 'var(--sp-xl)' }}>
          {service.deliverables.map((item) => (
            <li key={item} style={{ color: 'var(--clr-ink-mid)' }}>{item}</li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn--primary">Start a Project</Link>
          <Link href="/work" className="btn btn--outline">View Case Studies</Link>
          <Link href="/services" className="btn btn--outline">All Services</Link>
        </div>
      </div>
    </section>
  );
}
