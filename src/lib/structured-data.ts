const BASE_URL = 'https://www.dimensitylabs.dev';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dimensity Labs',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.ico`,
    email: 'business@dimensitylabs.dev',
    foundingDate: '2025',
    description:
      'Digital agency in Mumbai offering web development, mobile app development, AI solutions, and workflow automation.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://instagram.com/dimensitylabs',
      'https://x.com/dimensitylabs',
      'https://linkedin.com/company/dimensitylabs',
      'https://dribbble.com/dimensitylabs',
      'https://behance.net/dimensitylabs',
    ],
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Dimensity Labs',
    url: BASE_URL,
    email: 'business@dimensitylabs.dev',
    image: `${BASE_URL}/favicon.ico`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    areaServed: ['IN', 'US', 'GB', 'AE'],
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'AI Solutions',
      'AI Automation',
      'Digital Branding',
    ],
    priceRange: '₹₹',
  };
}

export function serviceSchema(service: { name: string; metaDescription: string; shortTitle: string }, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Dimensity Labs',
      url: BASE_URL,
    },
    areaServed: 'IN',
    serviceType: service.shortTitle,
    url: `${BASE_URL}/services/${slug}`,
  };
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}
