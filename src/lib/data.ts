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

export const clientLogos: string[] = [
  'Meridian',
  'Ashford & Co.',
  'Lumio',
  'Drystone Capital',
  'Noctua Health',
  'Palaver',
  'Kova Systems',
  'The Verdant Group',
];

export const marqueeItems: string[] = [
  'Brand Identity',
  'Digital Experiences',
  'Motion Design',
  'Campaign Strategy',
  'Typography Systems',
  'Web Design',
  'Packaging',
  'Art Direction',
];

export const heroStats: Stat[] = [
  { value: '140+', label: 'Brands Transformed' },
  { value: '9', label: 'Years in Practice' },
  { value: '22', label: 'Industry Awards' },
];

export const aboutStats: Stat[] = [
  { value: '140+', label: 'Projects Completed' },
  { value: '22', label: 'Industry Awards' },
  { value: '12', label: 'Studio Members' },
];

export const philosophyStats: Stat[] = [
  { value: '140+', label: 'Brands Built' },
  { value: '22', label: 'Awards Won' },
  { value: '9', label: 'Years Active' },
  { value: '96%', label: 'Client Retention' },
];

export const services: Service[] = [
  {
    num: '01',
    title: 'Brand Identity & Strategy',
    tags: ['Visual Identity', 'Naming', 'Brand Voice', 'Strategy', 'Guidelines'],
    description:
      'The core of what we do. We build brand systems that have genuine coherence: a name that works, a visual identity that\'s distinctly yours, a tone of voice that sounds like a real perspective, and a set of guidelines that make every future touchpoint easier to get right.',
    detail:
      'We don\'t design logos — we build the logic that makes everything from a business card to a building wrap feel inevitable.',
  },
  {
    num: '02',
    title: 'Digital Experience Design',
    tags: ['Web Design', 'UX & UI', 'Design Systems', 'App Design'],
    description:
      'Digital products and websites built on the same thinking that drives our brand work. We design experiences that make complex systems feel simple, and simple brands feel substantial. Our process moves from strategy and UX architecture through detailed UI and a production-ready design system.',
    detail:
      'We hand off with Figma files that developers actually want to use, and we stay involved through build to make sure nothing gets lost in translation.',
  },
  {
    num: '03',
    title: 'Motion & Visual Systems',
    tags: ['Motion Identity', 'Animation', 'Video', 'UI Motion'],
    description:
      'Motion is where static identity becomes kinetic brand personality. We develop motion identities that can operate at every scale — from a sub-second UI micro-interaction to a sixty-second broadcast ident. The logic is always the same: movement should feel like it belongs to the brand, not borrowed from a trends reel.',
    detail:
      'We deliver in After Effects, Rive, Lottie, and code-based animation for web environments.',
  },
  {
    num: '04',
    title: 'Campaign & Art Direction',
    tags: ['Campaign Strategy', 'Art Direction', 'Photography', 'OOH', 'Social'],
    description:
      'When brands need to say something specific — a launch, a repositioning, a cultural moment — we build the visual and conceptual world around that idea. We work from campaign strategy through creative concept, art direction, photography briefs, and final asset production across all formats.',
    detail:
      'We\'re experienced with OOH, digital display, editorial placement, and social-first formats that don\'t feel like afterthoughts.',
  },
  {
    num: '05',
    title: 'Packaging & Print Design',
    tags: ['Packaging', 'Print', 'Structural Design', 'Production'],
    description:
      'Physical design that earns its place on a shelf, in a bag, or in someone\'s hand. We bring the same rigorous system thinking to packaging that we bring to digital — but add the tactile dimensions of material, texture, and production process. We work with print producers directly to make sure what we design actually gets made the way it was intended.',
    detail:
      'Experience across FMCG, spirits, food, beauty, and limited-edition collector formats.',
  },
  {
    num: '06',
    title: 'Content & Editorial Direction',
    tags: ['Editorial Design', 'Content Strategy', 'Publication Design', 'Photography Direction'],
    description:
      'For brands and institutions that publish — annual reports, magazines, books, research papers — we bring the same level of intentionality that book and magazine designers have refined over decades, applied with a contemporary eye. Great editorial design makes reading feel effortless and authoritative simultaneously.',
    detail:
      'We art-direct photography and illustration where needed, and work with writers to ensure copy and design are genuinely integrated, not in competition.',
  },
];

export const homeServicesList = services.map((s) => ({
  num: s.num,
  name: s.title,
}));

export const featuredProjects: Project[] = [
  {
    title: 'Meridian Financial — Full Brand Overhaul',
    category: 'Brand Identity',
    year: '2024',
    description: '',
    tags: ['Brand Identity'],
    image: 'https://picsum.photos/seed/Dimensity01/900/507',
    imageAlt: 'Meridian rebrand project',
    layout: 'featured',
  },
  {
    title: 'Lumio — App Design & System',
    category: 'Digital Product',
    year: '2024',
    description: '',
    tags: ['Digital Design'],
    image: 'https://picsum.photos/seed/Dimensity02/600/800',
    imageAlt: 'Lumio app design',
    layout: 'standard',
  },
  {
    title: 'Kova — Launch Campaign',
    category: 'Campaign',
    year: '2023',
    description: '',
    tags: ['Campaign'],
    image: 'https://picsum.photos/seed/Dimensity03/480/360',
    imageAlt: 'Kova campaign',
    layout: 'standard',
  },
  {
    title: 'Palaver — Magazine Redesign',
    category: 'Editorial',
    year: '2022',
    description: '',
    tags: ['Typography'],
    image: 'https://picsum.photos/seed/Dimensity04/480/360',
    imageAlt: 'Palaver editorial project',
    layout: 'standard',
  },
  {
    title: 'Verdant Group — Corporate Site',
    category: 'Web Design',
    year: '2022',
    description: '',
    tags: ['Web Design'],
    image: 'https://picsum.photos/seed/Dimensity05/480/360',
    imageAlt: 'Verdant website',
    layout: 'standard',
  },
];

export const allProjects: Project[] = [
  {
    title: 'Meridian Financial — Complete Brand Overhaul',
    category: 'Brand Identity',
    year: '2024',
    description:
      'A legacy wealth management firm repositioning for a new generation of clients. We rebuilt everything: naming, visual identity, tone of voice, and digital experience — anchored by a typographic system that communicates authority without coldness.',
    tags: ['Brand Identity', 'Strategy', 'Web Design'],
    image: 'https://picsum.photos/seed/case01/1200/750',
    imageAlt: 'Meridian Financial brand identity project',
    layout: 'featured',
    award: 'D&AD Shortlist',
  },
  {
    title: 'Lumio — Smart Home App & Design System',
    category: 'Digital Product',
    year: '2024',
    description:
      'From naming and identity through to a full Figma design system and shipped iOS app. A product that needed to feel intuitive for people who\'ve never considered smart home technology.',
    tags: ['UX Design', 'Design System'],
    image: 'https://picsum.photos/seed/case02/600/800',
    imageAlt: 'Lumio app design',
    layout: 'standard',
  },
  {
    title: 'Noctua Health — Sleep Tech Brand System',
    category: 'Brand Identity',
    year: '2023',
    description:
      'A sleep technology startup entering a crowded market. The identity needed to signal scientific credibility while feeling genuinely calm and reassuring — a rare combination in health tech.',
    tags: ['Brand Identity', 'Packaging'],
    image: 'https://picsum.photos/seed/case03/600/800',
    imageAlt: 'Noctua Health branding',
    layout: 'standard',
  },
  {
    title: 'Drystone Capital — Investment Brand & Site',
    category: 'Brand Identity + Web',
    year: '2023',
    description:
      'A boutique private equity firm with serious ambitions needed an identity that matched. We developed a restrained typographic system, a subdued palette, and a website built on considered silence.',
    tags: ['Brand', 'Web Design', 'Strategy'],
    image: 'https://picsum.photos/seed/case04/900/563',
    imageAlt: 'Drystone Capital brand work',
    layout: 'wide',
  },
  {
    title: 'Kova Systems — Product Launch Campaign',
    category: 'Campaign',
    year: '2023',
    description:
      'A B2B SaaS company launching its first consumer-facing product needed a campaign with genuine emotional pull. We built a visual world from scratch — art direction, photography, OOH, and digital — in twelve weeks.',
    tags: ['Campaign', 'Art Direction', 'Motion'],
    image: 'https://picsum.photos/seed/case05/900/563',
    imageAlt: 'Kova Systems campaign',
    layout: 'wide',
  },
  {
    title: 'Palaver — Magazine Complete Redesign',
    category: 'Editorial Design',
    year: '2022',
    description:
      'A quarterly cultural magazine that had been operating since the nineties needed to reconcile its storied editorial reputation with the visual expectations of a contemporary readership. We rebuilt the grid, the typeface system, and the cover formula — while keeping its essential character intact.',
    tags: ['Editorial', 'Typography'],
    image: 'https://picsum.photos/seed/case06/1200/750',
    imageAlt: 'Palaver magazine redesign',
    layout: 'featured',
    award: 'SND Award',
  },
  {
    title: 'Ashford & Co — Spirits Range Packaging',
    category: 'Packaging',
    year: '2022',
    description:
      'A premium gin distillery launching three new expressions needed packaging that could command shelf presence in international markets without relying on category clichés.',
    tags: ['Packaging', 'Print'],
    image: 'https://picsum.photos/seed/case07/600/800',
    imageAlt: 'Ashford and Co packaging',
    layout: 'standard',
  },
  {
    title: 'The Verdant Group — Corporate Website',
    category: 'Web Design',
    year: '2022',
    description:
      'A global sustainability consultancy needed a digital presence that matched the gravity and ambition of its work. We designed a website that navigates complexity without simplifying it.',
    tags: ['Web Design', 'UX'],
    image: 'https://picsum.photos/seed/case08/600/800',
    imageAlt: 'Verdant Group website',
    layout: 'standard',
  },
  {
    title: 'Hallmark Broadcast — Motion Identity System',
    category: 'Motion & Identity',
    year: '2021',
    description:
      'A European broadcast network undergoing digital transition needed a motion identity system that could span linear TV, streaming, and social. We delivered 200+ assets built on a single kinetic logic.',
    tags: ['Motion Design', 'Brand Identity'],
    image: 'https://picsum.photos/seed/case09/900/563',
    imageAlt: 'Hallmark motion graphics',
    layout: 'wide',
    award: 'Broadcast Award',
  },
  {
    title: 'Fold Architecture — Studio Identity & Website',
    category: 'Brand Identity',
    year: '2021',
    description:
      'An architecture practice whose conceptual approach to space deserved an identity with equivalent rigour. We developed a system derived from the logic of the fold — dynamic, structural, and impossible to ignore.',
    tags: ['Brand Identity', 'Web Design'],
    image: 'https://picsum.photos/seed/case10/900/563',
    imageAlt: 'Fold architecture studio',
    layout: 'wide',
  },
];

export const teamMembers: TeamMember[] = [
  { name: 'Maren Haugen', role: 'Co-Founder & Creative Director', image: 'https://picsum.photos/seed/person1/400/533' },
  { name: 'Tobias Eld', role: 'Co-Founder & Strategy Director', image: 'https://picsum.photos/seed/person2/400/533' },
  { name: 'Sienna Park', role: 'Head of Digital Design', image: 'https://picsum.photos/seed/person3/400/533' },
  { name: 'Raúl Montoya', role: 'Senior Motion Designer', image: 'https://picsum.photos/seed/person4/400/533' },
  { name: 'Astrid Voss', role: 'Brand Strategist', image: 'https://picsum.photos/seed/person5/400/533' },
  { name: 'Jin-ho Lim', role: 'Typography Lead', image: 'https://picsum.photos/seed/person6/400/533' },
  { name: 'Clara Fenwick', role: 'UX & Interaction Designer', image: 'https://picsum.photos/seed/person7/400/533' },
  { name: 'Marcus Dahl', role: 'Art Director', image: 'https://picsum.photos/seed/person8/400/533' },
];

export const values: Value[] = [
  {
    icon: '◉',
    title: 'Clarity over Cleverness',
    description:
      'The most sophisticated thing design can do is make a complex idea feel instantly obvious. We resist the temptation to be clever at the expense of being clear.',
  },
  {
    icon: '⟳',
    title: 'Systems Thinking',
    description:
      'We never design a single touchpoint in isolation. Every mark, colour, and word belongs to a larger system. That system is the real deliverable.',
  },
  {
    icon: '◈',
    title: 'Radical Honesty',
    description:
      "We tell clients what we genuinely think, even when it's uncomfortable. The most useful thing we can offer isn't agreement — it's a perspective unclouded by internal politics.",
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
    year: '2016',
    title: 'Founded in a rented flat in Grünerløkka',
    description:
      'Maren Haugen and Tobias Eld left their positions at a Stockholm agency to start something smaller, stranger, and more their own. The first three months were funded by one bold packaging client who took a chance on an unknown studio. That project won a D&AD pencil. The calls started coming.',
  },
  {
    year: '2018',
    title: 'The team grows to six; we move into our first proper studio',
    description:
      "We brought in our first senior motion designer, a brand strategist who'd spent a decade in New York, and two visual designers from the Copenhagen design scene. The culture was set early: no hierarchy of disciplines — every voice shapes every project.",
  },
  {
    year: '2021',
    title: 'First international clients; digital work takes centre stage',
    description:
      'The pandemic changed what clients needed. Print paused; digital accelerated. We invested heavily in interaction and digital product design, bringing our brand systems thinking into the screen. The result was a new hybrid approach that\'s since defined our practice.',
  },
  {
    year: 'Now',
    title: "Twelve people, a full-floor studio, and a waiting list we're proud of",
    description:
      "We now take on approximately 18 projects per year — deliberately fewer than we could. The constraint keeps our standards uncomfortably high and our thinking genuinely fresh. We're currently booking for Q2 2026.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery & Immersion',
    description:
      "We start by listening — properly. Two to three weeks of stakeholder interviews, competitive analysis, audience research, and honest audit of where things currently stand. We don't start designing until we understand the territory.",
  },
  {
    num: '02',
    title: 'Strategy & Direction',
    description:
      'A strategic brief that defines positioning, personality, and creative direction. This becomes the filter for every design decision that follows. We present it, debate it with you, and refine it until it\'s genuinely yours.',
  },
  {
    num: '03',
    title: 'Design & Develop',
    description:
      "We typically develop two distinct creative directions — not variations on a theme. We present them in working sessions, not polished pitch decks. The most interesting conversations happen when the work is still pliable.",
  },
  {
    num: '04',
    title: 'Refine & Deliver',
    description:
      'Chosen direction refined through two rounds of collaborative feedback. Final delivery includes a comprehensive system guide, all source files, and a handover call. We remain available for questions in the 30 days that follow.',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    tier: 'Foundation',
    price: '€18k',
    period: '/ project',
    description: 'For startups and early-stage brands establishing their identity for the first time.',
    features: [
      'Brand strategy document',
      'Visual identity system (logo, colour, type)',
      'Brand voice & tone guidelines',
      'Core brand guidelines (PDF + Figma)',
      'Two creative directions explored',
      'Two rounds of refinements',
      '30-day post-handover support',
    ],
    featured: false,
    ctaLabel: 'Enquire About Foundation',
  },
  {
    tier: 'System',
    price: '€42k',
    period: '/ project',
    description: 'A complete brand and digital build for companies ready to make a serious market statement.',
    features: [
      'Everything in Foundation, plus:',
      'Extended visual identity system',
      'Motion identity & animation principles',
      'Website design (up to 12 templates)',
      'Design system & component library',
      'Photography art direction brief',
      'Iconography & illustration style guide',
      'Three rounds of refinements',
      '60-day post-handover support',
    ],
    featured: true,
    badge: 'Most Common',
    ctaLabel: 'Enquire About System',
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    description: 'For established organisations undertaking major transformations or multi-brand architecture projects.',
    features: [
      'Everything in System, plus:',
      'Multi-brand architecture strategy',
      'Campaign creative development',
      'Packaging design (multiple SKUs)',
      'Editorial & content system',
      'Internal brand training workshops',
      'Dedicated account team',
      'Ongoing retainer available',
    ],
    featured: false,
    ctaLabel: 'Start a Conversation',
  },
];

export const faqs: FAQ[] = [
  {
    question: 'How far in advance do you book?',
    answer:
      "We're typically 6–10 weeks out. We're currently booking projects beginning in Q2 2026. If you have a tighter deadline, reach out and we'll be honest about whether we can make it work.",
  },
  {
    question: "What's the minimum project budget?",
    answer:
      "Our smallest projects start at €14,000. Below that threshold, it's genuinely difficult for us to do work we're proud of. If your budget is smaller, we'll try to point you toward studios who do excellent work at that scale.",
  },
  {
    question: 'Do you work with international clients?',
    answer:
      "Approximately 60% of our current clients are outside Norway. We work across time zones and have experience with clients in North America, the UK, the rest of Europe, and Southeast Asia. Remote collaboration is something we've refined to a genuine process, not a workaround.",
  },
  {
    question: 'Do you offer ongoing retainer work?',
    answer:
      "Yes, for clients we've completed a major project with. We offer creative retainer arrangements that give you regular, prioritised access to the team for ongoing brand management and new creative work. Ask us about the details.",
  },
  {
    question: "What if I'm not sure what I need?",
    answer:
      'That\'s the most common starting point. The best thing to do is fill in the form with as much context as you have and select "Not sure yet — let\'s talk." We\'ll schedule a 30-minute conversation and help you think it through, at no cost or commitment.',
  },
];

export const offices: Office[] = [
  {
    city: 'Oslo',
    badge: 'HQ',
    badgeAccent: true,
    address: 'Thorvald Meyers gate 12\n0555 Grünerløkka\nOslo, Norway',
    status: 'Studio open Mon–Fri, 09:00–18:00 CET',
    active: true,
  },
  {
    city: 'London',
    badge: 'Partner Office',
    badgeAccent: false,
    address: 'The Hoxton, Southwark\n40 Blackfriars Road\nLondon SE1 8NY, UK',
    status: 'Client meetings by appointment',
    active: true,
  },
  {
    city: 'Worldwide',
    badge: 'Remote',
    badgeAccent: false,
    address: "We've delivered projects across 18 countries. Remote collaboration is native to how we work — not a compromise.",
    status: 'Available across time zones',
    active: true,
  },
];

export const contactEmails: ContactEmail[] = [
  { label: 'New Business', email: 'hello@dimensitystudio.com' },
  { label: 'For Press & Speaking', email: 'press@dimensitystudio.com' },
  { label: 'Careers', email: 'careers@dimensitystudio.com' },
];

export const socialLinks = [
  { label: 'Instagram', abbr: 'IG', href: '#' },
  { label: 'Twitter/X', abbr: 'X', href: '#' },
  { label: 'LinkedIn', abbr: 'LI', href: '#' },
  { label: 'Dribbble', abbr: 'DR', href: '#' },
  { label: 'Behance', abbr: 'BE', href: '#' },
];

export const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'brand-identity', label: 'Brand Identity & Strategy' },
  { value: 'digital-design', label: 'Digital Experience Design' },
  { value: 'motion', label: 'Motion & Visual Systems' },
  { value: 'campaign', label: 'Campaign & Art Direction' },
  { value: 'packaging', label: 'Packaging & Print' },
  { value: 'editorial', label: 'Content & Editorial Direction' },
  { value: 'not-sure', label: "Not sure yet — let's talk" },
];

export const budgetOptions = [
  { value: '', label: 'Select a range...' },
  { value: 'under-15k', label: 'Under €15,000' },
  { value: '15-30k', label: '€15,000 – €30,000' },
  { value: '30-60k', label: '€30,000 – €60,000' },
  { value: '60-100k', label: '€60,000 – €100,000' },
  { value: 'over-100k', label: 'Over €100,000' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export const testimonial: Testimonial = {
  quote:
    'Good design is indistinguishable from the right idea, expressed at the right moment, in the right form.',
  attribution: '— Dimensity Labs Manifesto, 2016',
};

export const awardsLabels: string[] = [
  'D&AD Pencil',
  'Cannes Lions',
  'SND Award',
  'Awwwards SOTD',
  'Red Dot',
];
