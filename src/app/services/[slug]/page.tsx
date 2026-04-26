import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceSchema as buildServiceSchema, breadcrumbSchema as buildBreadcrumbSchema } from '@/lib/structured-data';
import { getService } from '@/lib/services.data';

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

  const url = `https://dimensitylabs.dev/services/${slug}`;

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
  const seoData = servicePages[slug];
  if (!seoData) {
    notFound();
  }

  const richData = getService(slug);

  const svcSchema = buildServiceSchema(seoData, slug);
  const bcSchema = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: seoData.shortTitle, href: `/services/${slug}` },
  ]);

  const faqSchema = richData?.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: richData.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <section style={{ paddingTop: 'calc(var(--nav-h) + var(--sp-2xl))', paddingBottom: 'var(--sp-2xl)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(svcSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Hero */}
        <p className="t-label" style={{ marginBottom: 'var(--sp-sm)' }}>Services</p>
        <h1 className="t-h1" style={{ marginBottom: 'var(--sp-md)' }}>{seoData.name}</h1>
        <p className="t-body-lg" style={{ color: 'var(--clr-ink-mid)', marginBottom: 'var(--sp-xl)' }}>
          {seoData.intro}
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: 'var(--sp-3xl)' }}>
          <Link href="/contact" className="btn btn--primary">Start a Project</Link>
          <Link href="/work" className="btn btn--outline">View Case Studies</Link>
        </div>

        {/* What You Get — rich features from services.data.ts */}
        <h2 className="t-h3" style={{ marginBottom: 'var(--sp-md)' }}>What You Get</h2>
        <ul style={{ display: 'grid', gap: '12px', marginBottom: 'var(--sp-3xl)' }}>
          {(richData?.features ?? seoData.deliverables).map((item) => (
            <li key={item} style={{ color: 'var(--clr-ink-mid)', paddingLeft: '1.25em', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Process */}
        {richData?.process && richData.process.length > 0 && (
          <>
            <h2 className="t-h3" style={{ marginBottom: 'var(--sp-lg)' }}>Our Process</h2>
            <div style={{ display: 'grid', gap: 'var(--sp-lg)', marginBottom: 'var(--sp-3xl)' }}>
              {richData.process.map((step, i) => (
                <div key={step.title} style={{ display: 'flex', gap: 'var(--sp-md)', alignItems: 'flex-start' }}>
                  <span
                    className="t-label"
                    style={{
                      flexShrink: 0,
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: '1px solid var(--clr-border)',
                      fontSize: '0.75rem',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, marginBottom: '4px' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: 'var(--clr-ink-mid)', lineHeight: 1.6 }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* FAQ */}
        {richData?.faq && richData.faq.length > 0 && (
          <>
            <h2 className="t-h3" style={{ marginBottom: 'var(--sp-lg)' }}>Frequently Asked Questions</h2>
            <div style={{ marginBottom: 'var(--sp-3xl)' }}>
              {richData.faq.map((item) => (
                <details
                  key={item.question}
                  style={{ borderBottom: '1px solid var(--clr-border)', paddingBlock: 'var(--sp-md)' }}
                >
                  <summary
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 'var(--sp-md)',
                    }}
                  >
                    {item.question}
                    <span style={{ flexShrink: 0, fontSize: '1.25rem', color: 'var(--clr-muted)' }}>+</span>
                  </summary>
                  <p style={{ marginTop: 'var(--sp-sm)', color: 'var(--clr-ink-mid)', lineHeight: 1.65 }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn--primary">Start a Project</Link>
          <Link href="/services" className="btn btn--outline">All Services</Link>
        </div>
      </div>
    </section>
  );
}
