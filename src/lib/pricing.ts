export type Currency = {
  code: string;
  symbol: string;
  name: string;
  rate: number;
};

export const CURRENCIES: Record<string, Currency> = {
  IN: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5 },
  US: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  GB: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  EU: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  AU: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
  CA: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  SG: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34 },
  AE: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  DEFAULT: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
};

export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  IN: 'IN',
  US: 'US',
  GB: 'GB',
  AU: 'AU',
  CA: 'CA',
  SG: 'SG',
  AE: 'AE',
  DE: 'EU',
  FR: 'EU',
  IT: 'EU',
  ES: 'EU',
  NL: 'EU',
  PT: 'EU',
  BE: 'EU',
  AT: 'EU',
  CH: 'EU',
};

export type ServiceOption = {
  id: string;
  label: string;
  description: string;
  baseUSD: number;
  icon: string;
};

export type FeatureOption = {
  id: string;
  label: string;
  description: string;
  baseUSD: number;
  applicableTo: string[];
};

export const SERVICES: ServiceOption[] = [
  {
    id: 'landing',
    label: 'Landing Page',
    description: 'Single-page marketing site, conversion-optimised',
    baseUSD: 399,
    icon: '🌐',
  },
  {
    id: 'website',
    label: 'Full Website',
    description: 'Multi-page business or portfolio site (up to 8 pages)',
    baseUSD: 999,
    icon: '💻',
  },
  {
    id: 'webapp',
    label: 'Web App / SaaS',
    description: 'Full-stack application with auth, dashboard, and database',
    baseUSD: 2999,
    icon: '⚡',
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    description: 'React Native app for iOS + Android',
    baseUSD: 3999,
    icon: '📱',
  },
  {
    id: 'ai-chatbot',
    label: 'AI Chatbot',
    description: 'Custom LLM-powered chatbot for your product or support',
    baseUSD: 899,
    icon: '🤖',
  },
  {
    id: 'ai-automation',
    label: 'AI Automation',
    description: 'Workflow automation with Make, n8n, or custom APIs',
    baseUSD: 699,
    icon: '⚙️',
  },
  {
    id: 'branding',
    label: 'Digital Branding',
    description: 'Logo, color system, typography, and brand guidelines',
    baseUSD: 599,
    icon: '🎨',
  },
  {
    id: 'consulting',
    label: 'Consulting / Audit',
    description: 'Digital audit + tech stack roadmap',
    baseUSD: 299,
    icon: '🔍',
  },
];

export const FEATURES: FeatureOption[] = [
  {
    id: 'cms',
    label: 'CMS Integration',
    description: 'Sanity / Contentful',
    baseUSD: 299,
    applicableTo: ['landing', 'website', 'webapp'],
  },
  {
    id: 'seo',
    label: 'SEO Optimisation',
    description: 'Meta, sitemap, structured data',
    baseUSD: 149,
    applicableTo: ['landing', 'website', 'webapp'],
  },
  {
    id: 'analytics',
    label: 'Analytics Setup',
    description: 'GA4 + Hotjar / Clarity',
    baseUSD: 99,
    applicableTo: ['landing', 'website', 'webapp', 'mobile'],
  },
  {
    id: 'auth',
    label: 'User Auth',
    description: 'Email + OAuth login',
    baseUSD: 399,
    applicableTo: ['webapp', 'mobile'],
  },
  {
    id: 'payments',
    label: 'Payment Integration',
    description: 'Stripe / Razorpay checkout',
    baseUSD: 349,
    applicableTo: ['webapp', 'mobile', 'website'],
  },
  {
    id: 'email',
    label: 'Email Automation',
    description: 'Transactional + marketing emails',
    baseUSD: 199,
    applicableTo: ['webapp', 'website', 'landing', 'ai-automation'],
  },
  {
    id: 'multilang',
    label: 'Multi-language',
    description: 'i18n support',
    baseUSD: 299,
    applicableTo: ['website', 'webapp', 'landing'],
  },
  {
    id: 'dashboard',
    label: 'Admin Dashboard',
    description: 'Custom internal dashboard',
    baseUSD: 799,
    applicableTo: ['webapp', 'ai-chatbot', 'ai-automation'],
  },
  {
    id: 'crm',
    label: 'CRM Integration',
    description: 'HubSpot / Airtable sync',
    baseUSD: 249,
    applicableTo: ['website', 'webapp', 'ai-automation'],
  },
  {
    id: 'push',
    label: 'Push Notifications',
    description: 'In-app + web push',
    baseUSD: 199,
    applicableTo: ['mobile', 'webapp'],
  },
  {
    id: 'offline',
    label: 'Offline Mode',
    description: 'PWA or offline-first mobile',
    baseUSD: 349,
    applicableTo: ['mobile', 'webapp'],
  },
  {
    id: 'voiceai',
    label: 'Voice AI',
    description: 'Speech input / text-to-speech',
    baseUSD: 599,
    applicableTo: ['ai-chatbot', 'mobile', 'webapp'],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Integration',
    description: 'Bot on WhatsApp Business API',
    baseUSD: 399,
    applicableTo: ['ai-chatbot', 'ai-automation'],
  },
  {
    id: 'priority',
    label: 'Priority Delivery',
    description: '50% faster turnaround',
    baseUSD: 299,
    applicableTo: [
      'landing',
      'website',
      'webapp',
      'mobile',
      'ai-chatbot',
      'ai-automation',
      'branding',
      'consulting',
    ],
  },
  {
    id: 'support',
    label: '3-Month Support',
    description: 'Bug fixes + minor updates',
    baseUSD: 249,
    applicableTo: ['landing', 'website', 'webapp', 'mobile', 'ai-chatbot', 'ai-automation'],
  },
];

export function formatPrice(usdAmount: number, currency: Currency): string {
  const amount = Math.round(usdAmount * currency.rate);
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calcTotal(
  selectedServices: string[],
  selectedFeatures: string[],
  currency: Currency,
): { subtotal: number; tax: number; total: number; perService: Record<string, number> } {
  let subtotal = 0;
  const perService: Record<string, number> = {};

  selectedServices.forEach((sid) => {
    const svc = SERVICES.find((s) => s.id === sid);
    if (svc) {
      perService[sid] = svc.baseUSD;
      subtotal += svc.baseUSD;
    }
  });

  selectedFeatures.forEach((fid) => {
    const feat = FEATURES.find((f) => f.id === fid);
    if (feat) subtotal += feat.baseUSD;
  });

  const taxRate =
    currency.code === 'INR'
      ? 0.18
      : currency.code === 'GBP' || currency.code === 'EUR'
        ? 0.2
        : 0;

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return { subtotal, tax, total, perService };
}

