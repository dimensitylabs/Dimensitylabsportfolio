export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerServiceLinks: NavItem[] = [
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Mobile Apps', href: '/services/mobile-app-development' },
  { label: 'AI Solutions', href: '/services/ai-solutions' },
  { label: 'AI Automation', href: '/services/ai-automation' },
  { label: 'Digital Branding', href: '/services/digital-branding' },
  { label: 'Consulting & Strategy', href: '/services/consulting-strategy' },
];

export const footerCompanyLinks: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Careers', href: '/contact#careers' },
  { label: 'Contact', href: '/contact' },
];
