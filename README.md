# Dimensity Labs — Creative Agency Website

A modern, sophisticated website for Dimensity Labs, a boutique creative agency that crafts brand identities, digital experiences, and strategic design for companies that refuse to be ordinary.

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4
- **Typography-First Design**: Custom font system using Syne, Instrument Serif, and Syne Mono
- **Animated Components**: Smooth scroll animations and micro-interactions
- **Responsive Layout**: Fully responsive design that works across all devices
- **SEO Optimized**: Complete metadata setup with Open Graph and Twitter cards
- **Component Architecture**: Well-organized component structure with reusable UI elements
- **Agency Showcase**: Portfolio, services, team, and contact sections

## 🛠 Technologies Used

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom design system
- **Fonts**: Google Fonts (Syne, Instrument Serif, Syne Mono)
- **Icons**: Custom SVG icons
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint with Next.js configuration

## 📋 Requirements

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agency
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
agency/
├── public/                 # Static assets (SVG icons, images)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── globals.css    # Global styles and Tailwind imports
│   │   ├── layout.tsx     # Root layout with metadata
│   │   └── page.tsx       # Home page component
│   ├── components/        # React components
│   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   ├── sections/      # Page sections (Hero, Services, etc.)
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities and data
│       ├── data.ts        # Site content and data
│       └── types.ts       # TypeScript type definitions
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── tailwind.config.mjs   # Tailwind CSS configuration
└── README.md             # This file
```

## 🎨 Design System

The project uses a custom design system with:

- **Color Palette**: Warm, sophisticated colors with cream backgrounds and dark ink
- **Typography**: Three-font system for display, body, and monospace text
- **Spacing**: Consistent spacing scale from 4px to 160px
- **Animation**: Smooth transitions using custom easing functions

### Key Colors
- Background: `#F5F0E8` (warm cream)
- Surface: `#EDE8DF` (darker cream)
- Ink: `#0E0E0E` (near black)
- Accent: `#C6F135` (bright lime green)

## 📄 Content Sections

The website includes:

- **Hero**: Eye-catching introduction with agency stats
- **Services**: Overview of six core service offerings
- **Featured Work**: Portfolio showcase with project highlights
- **Testimonials**: Client testimonials and agency philosophy
- **Team**: Team member profiles and roles
- **Contact**: Contact form and office information

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private. All rights reserved.

## 📞 Contact

- **Website**: https://DimensityLabsstudio.com
- **Email**: hello@DimensityLabsstudio.com
- **Location**: Oslo, Norway (HQ) with partner office in London

---

Built with ❤️ by Dimensity Labs — "We make the invisible, inevitable."
