# bugs.md — dimensitylabs.dev
## Conflict-Free Bug Assignment

All bugs are assigned by **file ownership**, not by feature.
Dev A owns `components/` `styles/` `public/` — Dev B owns `app/` `lib/` `next.config.js` `.env`
Neither developer ever edits the other's files. No exceptions.

**Legend:** 🔴 Critical · 🟠 High · 🟡 Medium · 🔵 Low

---

## Dev A — `components/` · `styles/` · `public/`

---

### BUG-A01 🔴 Moon emoji used as theme toggle — not accessible
**File:** `components/layout/Navbar.tsx`
**Symptom:** The dark/light mode toggle renders a raw `☽` emoji. Screen readers announce it as "crescent moon" with no actionable context. No keyboard focus ring. Fails WCAG 2.1 SC 4.1.2 (Name, Role, Value).
**Steps to reproduce:** Tab to the theme toggle using keyboard only. Notice no visible focus indicator. Run a screen reader — it reads "crescent moon" with no button role announced.
**Fix:**
```tsx
// Replace emoji button with proper SVG toggle
<button
  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  onClick={toggleTheme}
  className="theme-toggle"
>
  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
</button>
```
Add to `styles/globals.css`:
```css
.theme-toggle:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```
**Affects:** All pages (Navbar is global)

---

### BUG-A02 🔴 Social links are text abbreviations — no icons, no aria-labels
**File:** `components/layout/Footer.tsx`
**Symptom:** Footer social links render as raw text: "IG", "X", "LI", "DR", "BE". No SVG icons, no `aria-label`, no accessible name. Screen readers announce "I G link", "X link" — meaningless. Visually looks unfinished.
**Steps to reproduce:** Inspect the footer. View source — `<a href="...">IG</a>`.
**Fix:**
```tsx
// components/ui/SocialIcons.tsx — create this file (Dev A owns)
const socials = [
  { label: 'Instagram', href: 'https://instagram.com/dimensitylabs', Icon: InstagramIcon },
  { label: 'X (Twitter)', href: 'https://x.com/dimensitylabs', Icon: XIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/dimensitylabs', Icon: LinkedInIcon },
  { label: 'Dribbble', href: 'https://dribbble.com/dimensitylabs', Icon: DribbbleIcon },
  { label: 'Behance', href: 'https://behance.net/dimensitylabs', Icon: BehanceIcon },
]

// Each icon:
<a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
  <social.Icon width={20} height={20} />
</a>
```
Import `<SocialIcons />` into Footer — Dev A owns both files, no coordination needed.
**Affects:** Footer on all pages

---

### BUG-A03 🔴 Self-attribution blockquote — company quoting itself
**File:** `components/sections/HeroSection.tsx` or equivalent quote component
**Symptom:** A blockquote on the home page reads: *"We don't just build websites. We build digital businesses. — Dimensity Labs, 2025"* — attributed to the company itself. Blockquote semantics are for external citations. This reads as fabricated social proof and damages trust.
**Steps to reproduce:** Load `dimensitylabs.dev`. Scroll to the quote section.
**Fix:** Replace the entire quote component with a `TestimonialsSection`:
```tsx
// components/sections/TestimonialsSection.tsx
// Accept TestimonialItem[] from types/component.types.ts
// Render: avatar/initials, name, company, quote, outcome metric
// Layout: horizontal scroll on mobile, 3-column grid on desktop
```
Leave the data (actual client quotes) as props — content owner provides copy.
**Affects:** Home page

---

### BUG-A04 🔴 Founder identity is anonymous — placeholder name and photo
**File:** `components/sections/AboutTeam.tsx` or equivalent
**Symptom:** The team section shows "Dimensity Labs — Founder & CEO" with a picsum.photos placeholder photo. Anonymous founder = zero B2B trust. Any prospect researching before hiring will bounce.
**Steps to reproduce:** Visit `/about`. Inspect the team card image src — `picsum.photos/seed/founder`.
**Fix:**
1. Dev A builds the team card component to accept real props:
```tsx
interface TeamMember {
  name: string
  role: string
  bio: string
  imageUrl: string
  linkedinUrl?: string
}
```
2. Dev A drops the real founder photo into `public/images/team/founder.jpg`
3. Dev B updates the data reference in `app/about/page.tsx`
**Coordination:** Dev A owns image drop + component. Dev B updates data reference in `app/about/page.tsx`. No file overlap.
**Affects:** `/about`

---

### BUG-A05 🟠 Italic emphasis overused — heading hierarchy collapses
**File:** `components/sections/*.tsx` — all section heading components
**Symptom:** Every single heading on every page uses the pattern: `"Label. <em>Italic part.</em>"` — the italic decoration is applied so uniformly it has lost all emphasis function. By the 4th section, the eye ignores it.
**Steps to reproduce:** Scroll through any page. Count how many headings use italic. Every single one does.
**Fix:** Audit all `<h1>`, `<h2>`, `<h3>` elements inside `components/sections/`. Apply italic to a maximum of **1 heading per component**. Convert the rest to `font-weight: 500` or size differentiation. This is a markup change only — no style changes needed.
**Affects:** All pages (every section component)

---

### BUG-A06 🟠 Values section uses meaningless Unicode symbols
**File:** `components/sections/AboutValues.tsx` or equivalent
**Symptom:** The six company values use abstract Unicode decorators: `◉ ⟳ ◈ ◤ △ ✦`. These have no semantic relationship to their values — `⟳` for "Systems Thinking" and `◤` for "Earned Simplicity" are arbitrary. Reads as filler.
**Steps to reproduce:** Visit `/about`. View the values grid.
**Fix:** Replace Unicode chars with purposeful SVG icons. Each icon should reinforce the concept of its value. If no good icon mapping exists, remove icons entirely — strong typography carries the section better than meaningless symbols.
**Affects:** `/about`

---

### BUG-A07 🟠 Work filter tabs have no visible active or hover state
**File:** `components/ui/FilterTabs.tsx`
**Symptom:** The All / Web Development / Mobile App / AI Solutions filter tabs on `/work` have no visual differentiation between active and inactive states. Users cannot tell which filter is selected. Hover state gives no affordance.
**Steps to reproduce:** Visit `/work`. Click a filter tab. The active tab looks identical to inactive ones.
**Fix:**
```tsx
// Active state
.filter-tab[data-active="true"] {
  background: var(--color-accent-primary);
  color: var(--color-text-on-accent);
  border-radius: 9999px;
}

// Hover state
.filter-tab:hover:not([data-active="true"]) {
  background: var(--color-bg-surface);
  cursor: pointer;
}
```
Add a fade transition on content switch: `transition: opacity 0.2s ease`.
**Affects:** `/work`

---

### BUG-A08 🟠 No scroll-triggered reveal animations — page feels static
**File:** `components/animations/FadeUp.tsx` · `components/animations/StaggerGroup.tsx`
**Symptom:** No intersection observer animations exist on any page. Content appears as a flat wall as the user scrolls — no sense of progression or quality. Competing studios use subtle entrance animations as a baseline quality signal.
**Steps to reproduce:** Scroll through any page slowly. All content is static — no reveals, no stagger, no motion.
**Fix:** Create animation wrapper components:
```tsx
// components/animations/FadeUp.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```
Wrap section components in `<FadeUp>` inside the components themselves — Dev A owns all section files.
**Affects:** All pages

---

### BUG-A09 🟠 Service cards are numbered list items — no card UI
**File:** `components/sections/ServicesSection.tsx`
**Symptom:** Services are presented as a flat numbered list (01–06) with no visual card boundary, no CTA affordance, no hover state. There is no visual reason to click on any service item.
**Steps to reproduce:** Visit `/services`. The service list has no cards, no borders, no hover state.
**Fix:** Rebuild as proper cards:
```tsx
// Each service card should have:
// - Number badge (01, 02...) or category icon
// - Service name (h3)
// - One-line description
// - 2–3 pill tags (tech used)
// - Arrow CTA → links to /services/[slug]
// - Hover: border transitions to var(--color-accent-primary), bg lifts
```
**Affects:** `/services`

---

### BUG-A10 🟠 Pricing cards — Growth tier not visually differentiated
**File:** `components/ui/PricingCard.tsx`
**Symptom:** The "Most Common" Growth pricing plan has only a text label differentiating it from the other tiers. No accent border, no visual weight difference, no elevated card treatment. The recommended tier should be unmistakable.
**Steps to reproduce:** Visit `/services`. Find the pricing table. All three cards look identical at a glance.
**Fix:**
```tsx
// Growth card variant:
// - Border: 1.5px solid var(--color-accent-primary)
// - "Most Popular" pill badge above the card (not inside it)
// - Slight box-shadow elevation: 0 4px 24px rgba(0,0,0,0.12)
// - Background: slightly lighter than sibling cards
```
**Affects:** `/services`

---

### BUG-A11 🟡 "Start a Project→" — missing space before arrow character
**File:** `components/ui/Button.tsx` or wherever this CTA renders
**Symptom:** The primary CTA button renders "Start a Project→" with no space between the text and the arrow. Typographically incorrect and looks rushed.
**Steps to reproduce:** Inspect any CTA button. The text is `Start a Project→`.
**Fix:** Either:
- Change text to `"Start a Project →"` (unicode arrow with space)
- Or use an SVG `<ArrowRight />` icon with `ml-2` spacing inside the button component
**Affects:** All CTAs site-wide (fix once in the Button component)

---

### BUG-A12 🟡 Marquee ticker repeats content already visible on the same page
**File:** `components/ui/Marquee.tsx` or equivalent
**Symptom:** The infinite scrolling marquee reads: `"Web Development✦Mobile Apps✦AI Solutions✦AI Automation✦Digital Branding✦Consulting✦"` — the exact same services listed as cards 200px below. Adds no new information. Uses inconsistent dividers (`✦` mixed with other separators). Overused agency pattern as of 2024.
**Steps to reproduce:** Load home page. The marquee text is a duplicate of the service cards below it.
**Fix (Option A — recommended):** Replace the content with social proof or stack information that adds new context:
```
"React · Next.js · Flutter · n8n · OpenAI · Anthropic · Stripe · Supabase · Vercel · Figma"
```
**Fix (Option B):** Remove the marquee entirely. The service cards below it already communicate the services.
**Affects:** Home page

---

### BUG-A13 🟡 FAQ accordion has no open/close animation
**File:** `components/ui/FAQAccordion.tsx`
**Symptom:** FAQ accordion items open and close with a snap — no height transition, no chevron rotation. Feels like a 2014 jQuery accordion.
**Steps to reproduce:** Visit `/services`. Click any FAQ item. It opens instantly with no transition.
**Fix:**
```css
/* CSS grid trick for height: auto transition */
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}
.faq-answer.open {
  grid-template-rows: 1fr;
}
.faq-answer-inner {
  overflow: hidden;
}

/* Chevron rotation */
.faq-chevron {
  transition: transform 0.2s ease;
}
.faq-item.open .faq-chevron {
  transform: rotate(180deg);
}
```
**Affects:** `/services` and any page with FAQ component

---

### BUG-A14 🟡 Contact form inputs have no visible focus state
**File:** `components/ui/ContactForm.tsx` or equivalent form component
**Symptom:** Clicking into a contact form input shows no visible focus ring or border color change. Users cannot tell which field is active. Fails WCAG 2.1 SC 1.4.11 (Non-text Contrast).
**Steps to reproduce:** Visit `/contact`. Tab through form fields. Active input looks identical to inactive.
**Fix:**
```css
.form-input:focus-visible {
  border-color: var(--color-accent-primary);
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 0;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent-primary) 20%, transparent);
}
```
Also add error state styling and floating label animation on focus.
**Affects:** `/contact`

---

### BUG-A15 🟡 Light mode likely broken — dark-first build with no token audit
**File:** `styles/tokens.css` · `styles/globals.css` · `components/**`
**Symptom:** Dark-first builds almost always have incomplete light mode. Colors that work on dark backgrounds invert incorrectly on light. Placeholder images (grey picsum) look especially jarring on white.
**Steps to reproduce:** Click the theme toggle to switch to light mode. Scroll through every page and every section — note any text contrast failures or unexpected dark elements.
**Fix:**
1. Define explicit light mode token overrides in `styles/tokens.css`:
```css
[data-theme="light"] {
  --color-bg-base: #FAFAF8;
  --color-bg-surface: #F2F1EE;
  --color-bg-card: #FFFFFF;
  --color-text-primary: #111111;
  --color-text-secondary: #555555;
  --color-border-default: #E0DDD8;
}
```
2. Audit every component in light mode. Fix each contrast failure.
3. Check every hardcoded color — replace with token reference.
**Affects:** All pages in light mode

---

### BUG-A16 🔵 About page timeline — all entries show year "2025" only
**File:** `components/sections/AboutTimeline.tsx` or equivalent
**Symptom:** The company story timeline has four entries: The Idea (2025), First Clients (2025), Going Full-Service (2025), Now (2025). Every entry is the same year. Loses all narrative credibility — a timeline with no time differentiation is just a list.
**Steps to reproduce:** Visit `/about`. View the timeline section.
**Fix:** Update the milestone labels in the component data to use month + year:
```
Jan 2025 → The Idea
Mar 2025 → First Clients
Jun 2025 → Going Full-Service
Now → Growing Fast (no date — keep this relative)
```
**Affects:** `/about`

---

### BUG-A17 🔵 Stats section — numbers unsubstantiated without testimonials
**File:** `components/sections/StatsSection.tsx`
**Symptom:** "10+ Projects, 5+ Services, 100% Client Satisfaction" — with no testimonials anywhere on the site and all placeholder images, these numbers read as fabricated. "100% Client Satisfaction" as a standalone stat is a conversion anti-pattern when there is nothing backing it.
**Steps to reproduce:** View the stats section on home page. Check if any testimonial or case study is linked as evidence.
**Fix:** Either:
1. Add real client testimonials directly below the stats (Dev A builds `TestimonialsSection`)
2. Or replace "100% Client Satisfaction" with something honest and specific: "3 long-term clients · 10+ shipped projects · Mumbai & remote"
**Affects:** Home page

---

---

## Dev B — `app/` · `lib/` · `next.config.js` · `.env`

---

### BUG-B01 🔴 All portfolio images load from picsum.photos — fake work
**File:** `app/work/page.tsx` · `lib/services.data.ts` · `app/page.tsx`
**Symptom:** Every single image across the Work section, home page feature section, and case study thumbnails loads from `picsum.photos/seed/case01`, `picsum.photos/seed/case02`, etc. — a lorem ipsum image service. Any developer inspecting the network tab immediately sees the domain. The entire portfolio is visually fabricated.
**Steps to reproduce:** Open DevTools → Network → Images. Filter by `picsum`. 12+ requests visible on home page alone.
**Fix:**
1. Run: `grep -r "picsum.photos" app/ lib/ --include="*.tsx" --include="*.ts"`
2. Replace every src string with the corresponding real asset path from `public/images/` (Dev A drops real images — coordinate timing)
3. Interim until real images arrive — remove the `<Image>` and render a branded placeholder div instead of the picsum URL:
```tsx
// In app/work/page.tsx — interim placeholder, not picsum
<div className="aspect-video w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
```
4. Do **not** touch `components/WorkGrid.tsx` — that is Dev A's file. Update `src` values only in your owned files.
**Affects:** Home page, `/work`

---

### BUG-B02 🔴 Email domain mismatch — `.com` on a `.dev` site
**File:** `app/contact/page.tsx` · `lib/metadata.ts` · `.env`
**Symptom:** The contact page displays `business@dimensitylabs.com` as the contact email, but the site domain is `dimensitylabs.dev`. The mismatch is immediately visible and signals either a mistake or that the site is a template not fully configured.
**Steps to reproduce:** Visit `/contact`. Find the email display. It reads `business@dimensitylabs.com`.
**Fix:**
```bash
# Find every instance across your owned files
grep -r "dimensitylabs.com" app/ lib/ .env --include="*.tsx" --include="*.ts"
```
Update every hit to `dimensitylabs.dev`:
- `app/contact/page.tsx` — `mailto:` link
- `lib/metadata.ts` — if email is referenced in metadata
- `.env` — `CONTACT_EMAIL=business@dimensitylabs.dev`
- `app/api/contact/route.ts` — sender/recipient config
**Affects:** `/contact`, footer, any page referencing the email

---

### BUG-B03 🔴 Preloader blocks all content — negates Next.js SSR entirely
**File:** `app/layout.tsx`
**Symptom:** A 0%→100% progress animation blocks all page content on load. This is a client-side JavaScript animation that renders before React hydration. It defeats the entire performance benefit of Next.js 16 server-side rendering. On fast connections: artificial delay. On slow connections: user sees nothing while content is ready server-side.
**Steps to reproduce:** Load any page. The preloader occupies the full viewport before any content appears. In DevTools → Performance, you can see content is ready in the HTML payload but blocked by the preloader JS.
**Fix:**
1. Delete the preloader component import and usage from `app/layout.tsx`
2. Create `app/loading.tsx` using Next.js 16 loading UI (skeleton pattern):
```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse px-5 py-20 max-w-6xl mx-auto space-y-8">
      <div className="h-10 w-2/3 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      <div className="h-5 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
      <div className="h-5 w-1/3 rounded bg-zinc-100 dark:bg-zinc-800" />
    </div>
  )
}
```
3. Create `loading.tsx` in each route segment: `app/work/`, `app/services/`, `app/contact/`
**Coordination:** Dev A cannot implement scroll animations (BUG-A08) until this is resolved. Resolve BUG-B03 first.
**Affects:** All pages

---

### BUG-B04 🔴 Service sub-pages are empty skeleton pages — thin content
**File:** `app/services/[slug]/page.tsx` · `lib/services.data.ts`
**Symptom:** All 6 service sub-pages (`/services/web-development`, `/services/mobile-app-development` etc.) exist but contain only: a h1, 4 bullet points, and 3 CTAs. No social proof, no process, no pricing context, no FAQ. Google will rank these pages for high-value keywords ("web development agency Mumbai") and serve thin content that converts no one. Additionally, these pages currently have no `generateStaticParams()` — they are SSR when they should be SSG.
**Steps to reproduce:** Visit `/services/web-development`. Count the content elements.
**Fix:** Build `lib/services.data.ts` with full content for all 6 services. See `prompt.md` for the complete data structure and content. In `app/services/[slug]/page.tsx`:
```tsx
export async function generateStaticParams() {
  return getAllServiceSlugs().map(slug => ({ slug }))
}
```
Pass data to `<ServicePageLayout />` (Dev A's component — import only, never edit).
**Affects:** All 6 service sub-pages

---

### BUG-B05 🔴 No metadata on any page — all pages share default title
**File:** `app/page.tsx` · `app/about/page.tsx` · `app/work/page.tsx` · `app/services/page.tsx` · `app/services/[slug]/page.tsx` · `app/contact/page.tsx`
**Symptom:** Every page on the site has an identical or near-identical `<title>` tag. No unique `<meta name="description">`. No OpenGraph tags. This means: (1) all pages compete against each other in search, (2) social sharing shows no preview, (3) Google cannot understand what each page is about.
**Steps to reproduce:** `curl -s https://dimensitylabs.dev/about | grep -i '<title>'` — compare to home page. Same title.
**Fix:** Create `lib/metadata.ts` and add `generateMetadata()` to every page. See `prompt.md` Task B-05 for full implementation.
**Affects:** All pages, SEO ranking, social sharing CTR

---

### BUG-B06 🔴 Footer service links all point to `/services` — sub-pages are orphaned
**File:** `lib/navigation.config.ts` (create) → consumed by Dev A's Footer component
**Symptom:** The footer "Services" column lists all 6 services with links — but every link resolves to `/services` (the parent page). The actual sub-pages (`/services/web-development` etc.) exist and are crawlable but have zero internal links pointing to them. Google sees them as orphaned pages.
**Steps to reproduce:** Hover over any footer service link. Inspect `href` — all show `/services`.
**Fix:** In `lib/navigation.config.ts`, define the correct hrefs:
```ts
export const footerServiceLinks: NavItem[] = [
  { label: 'Web Development',  href: '/services/web-development' },
  { label: 'Mobile Apps',      href: '/services/mobile-app-development' },
  { label: 'AI Solutions',     href: '/services/ai-solutions' },
  { label: 'AI Automation',    href: '/services/ai-automation' },
  { label: 'Digital Branding', href: '/services/digital-branding' },
  { label: 'Consulting',       href: '/services/consulting' },
]
```
Dev A imports this array in `components/layout/Footer.tsx`. Dev B creates the config file — never edits Footer.tsx directly.
**Affects:** Footer on all pages, SEO crawlability of service sub-pages

---

### BUG-B07 🟠 Geolocation API blocks pricing render — loading state exposed to users
**File:** `app/services/page.tsx` · `lib/geolocation.ts` (create)
**Symptom:** The pricing section on `/services` displays the raw UI state: "Detecting your location..." — visible to users before the geolocation API resolves. The geolocation fetch runs synchronously before pricing renders, causing a visible content-less state. On failed geolocation or slow connections, this message may persist indefinitely.
**Steps to reproduce:** Visit `/services` on a throttled connection (DevTools → Network → Slow 3G). The pricing table shows "Detecting your location..." for 3–8 seconds.
**Fix:** Default to INR on first render. Update silently after geolocation resolves:
```tsx
'use client'
const [currency, setCurrency] = useState(CURRENCIES['INR']) // Paint INR immediately

useEffect(() => {
  detectCurrency().then(code => setCurrency(CURRENCIES[code]))
  // No loading state — INR is always the fallback
}, [])
```
The string "Detecting your location..." must be deleted from the codebase entirely. Search for it and remove it.
**Affects:** `/services` pricing section

---

### BUG-B08 🟠 Contact page has a picsum image labelled as a Mumbai map
**File:** `app/contact/page.tsx`
**Symptom:** The "Where We Work" section on the contact page renders an image with `alt="Map of Mumbai, India"` that loads from `picsum.photos/seed/mapMumbai` — a random, unrelated stock photo. Any user who checks the image URL or right-clicks immediately sees it is a placeholder.
**Steps to reproduce:** Visit `/contact`. Find the map section. Right-click the image → open in new tab — it's a picsum URL.
**Fix:** Two options — pick one:

**Option A (recommended):** Delete the image entirely. Replace with a clean text element:
```tsx
<div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
  <p className="text-sm font-medium">Mumbai, Maharashtra, India</p>
  <p className="text-sm text-zinc-500 mt-1">Remote-first · Available globally</p>
</div>
```

**Option B:** Use Google Maps Static API:
```
https://maps.googleapis.com/maps/api/staticmap?center=Mumbai,India&zoom=12&size=600x300&key=NEXT_PUBLIC_MAPS_KEY
```
Add `NEXT_PUBLIC_MAPS_KEY` to `.env`. Dev B owns `.env`.
**Affects:** `/contact`

---

### BUG-B09 🟠 Navigation duplicated in HTML — two full nav trees rendered simultaneously
**File:** `app/layout.tsx` · `lib/navigation.config.ts` (create)
**Symptom:** The markup renders two complete `<nav>` elements simultaneously — one for desktop, one for mobile — as static HTML. Both are always in the DOM; CSS hides one at each breakpoint. This creates: (1) duplicate link elements in the accessibility tree, (2) maintenance risk when adding pages — both navs must be updated separately, (3) content duplication that can confuse search crawlers.
**Steps to reproduce:** Inspect page source. Search for `<nav` — appears twice with identical link sets.
**Fix:** Create `lib/navigation.config.ts` with a single `navItems` array. Dev A's `Navbar.tsx` and `MobileDrawer.tsx` each import and map over this array. Dev B creates the config file and notifies Dev A. Result: one data source, two visual renderers, zero duplication risk.
**Affects:** All pages (layout-level bug)

---

### BUG-B10 🟠 All `next/image` components request `w=3840` — 4K images on mobile
**File:** `app/page.tsx` · `app/work/page.tsx` · `app/about/page.tsx` · `app/contact/page.tsx`
**Symptom:** Every `<Image>` in page files requests `w=3840` in the generated URL: `/_next/image?url=...&w=3840&q=75`. A portfolio thumbnail displayed at 480px wide is downloading a 3840px image. The `sizes` prop is missing on every image, preventing Next.js from generating a responsive `srcset`. This likely causes 60–80% excess image payload on mobile.
**Steps to reproduce:** DevTools → Network → Img. Filter by `_next/image`. Check `w=` parameter on any request.
**Fix:** Add `sizes` prop to every `<Image>` in your owned files (Dev A handles components/):
```tsx
// Full-width hero
<Image src="..." alt="..." sizes="100vw" priority />

// Portfolio grid (3-col)
<Image src="..." alt="..." sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />

// Two-column layouts
<Image src="..." alt="..." sizes="(max-width: 768px) 100vw, 50vw" />
```
**Affects:** All pages — Core Web Vitals, LCP, mobile performance

---

### BUG-B11 🟠 No JSON-LD structured data — invisible to Google rich results
**File:** `lib/structured-data.ts` (create) · `app/page.tsx` · `app/contact/page.tsx` · `app/services/[slug]/page.tsx`
**Symptom:** Zero `<script type="application/ld+json">` tags exist on any page. Google cannot identify the business type, location, services, or breadcrumb structure. Misses eligibility for rich results, business panel, and local SEO ("web development studio Mumbai") entirely.
**Steps to reproduce:** `curl -s https://dimensitylabs.dev | grep -i "ld+json"` — returns nothing.
**Fix:** Create `lib/structured-data.ts` with helper functions. Inject on relevant pages. See `prompt.md` Task B-08 for full implementation. Schemas needed:
- `organizationSchema()` → `app/page.tsx`
- `localBusinessSchema()` → `app/contact/page.tsx`
- `serviceSchema(service)` → `app/services/[slug]/page.tsx`
- `breadcrumbSchema(items)` → `app/services/[slug]/page.tsx`
**Affects:** All pages — SEO, local search ranking

---

### BUG-B12 🟠 Service sub-pages use SSR — should be fully static (SSG)
**File:** `app/services/[slug]/page.tsx`
**Symptom:** The 6 service sub-pages have no dynamic data — content never changes between requests. Without `generateStaticParams()`, Next.js defaults to SSR, generating each page on every request. This adds unnecessary cold-start latency and compute cost.
**Steps to reproduce:** Check `app/services/[slug]/page.tsx` — `generateStaticParams` is absent.
**Fix:**
```tsx
// app/services/[slug]/page.tsx
import { getAllServiceSlugs } from '@/lib/services.data'

export async function generateStaticParams() {
  return getAllServiceSlugs().map(slug => ({ slug }))
}
```
This converts all 6 pages to static HTML at build time.
**Affects:** All 6 service sub-pages — performance, hosting cost

---

### BUG-B13 🟡 No `priority` prop on above-fold hero image — LCP score hit
**File:** `app/page.tsx` (and any page with an above-fold image)
**Symptom:** The hero section image on the home page loads with the same priority as all other images — no `priority` prop, no `fetchpriority="high"` in the generated HTML. This is the Largest Contentful Paint element and should be the highest-priority network request on the page.
**Steps to reproduce:** View source of home page. Search for the hero image URL in `<img>` output — no `fetchpriority="high"` attribute.
**Fix:**
```tsx
// One image per page — the above-fold hero image only
<Image
  src="/images/hero.jpg"
  alt="..."
  sizes="100vw"
  priority  // ← this adds fetchpriority="high"
/>
```
Only apply `priority` to the single above-fold image per page. Applying it to multiple images defeats the purpose.
**Affects:** Home page LCP, Core Web Vitals score

---

### BUG-B14 🟡 Below-fold sections block initial bundle — no lazy loading
**File:** `app/page.tsx` · `app/services/page.tsx` · `app/work/page.tsx`
**Symptom:** All section components are imported statically at the top of each page file. Components like `WorkGrid`, `TestimonialsSection`, and `FAQAccordion` are bundled into the initial JS payload even though they are not visible until the user scrolls. This inflates the initial bundle unnecessarily.
**Steps to reproduce:** DevTools → Coverage tab. Load home page. Check how much of the loaded JS is unused on first render.
**Fix:**
```tsx
// In page files — dynamic import below-fold sections
import dynamic from 'next/dynamic'

const WorkGrid = dynamic(() => import('@/components/sections/WorkGrid'), {
  loading: () => <div className="h-96 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-lg" />,
})
```
Apply to: `WorkGrid`, `TestimonialsSection`, `FAQAccordion`, `StatsSection` (on pages where they are below the fold).
**Affects:** Home page, `/services`, `/work` — bundle size, Time to Interactive

---

### BUG-B15 🟡 Contact page map renders picsum — also missing from `next.config.js` domain allowlist
**File:** `next.config.js`
**Symptom:** `picsum.photos` is listed in `images.domains` or `images.remotePatterns` in `next.config.js` to allow the placeholder images. Once picsum images are replaced (BUG-B01, BUG-B08), this allowlist entry becomes unnecessary and slightly broadens the image fetch surface.
**Steps to reproduce:** Open `next.config.js`. Find `images.remotePatterns` or `images.domains` — `picsum.photos` is present.
**Fix:** After all picsum images are replaced, remove `picsum.photos` from the image domain allowlist. Add any new domains needed for real images (e.g. if images are hosted on a CDN).
**Affects:** `next.config.js` — security hygiene

---

### BUG-B16 🟡 No `robots.txt` or `sitemap.xml` — crawlability is undefined
**File:** `app/robots.ts` · `app/sitemap.ts` (create both)
**Symptom:** Neither `robots.txt` nor `sitemap.xml` exists. Google discovers pages by crawling links only. The sitemap would immediately surface all service sub-pages to Google, accelerating indexing. Without `robots.txt`, crawlers make their own assumptions about what to index.
**Steps to reproduce:** Visit `https://dimensitylabs.dev/robots.txt` → 404. Visit `https://dimensitylabs.dev/sitemap.xml` → 404.
**Fix:** Next.js 16 supports these as route handlers:
```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://dimensitylabs.dev/sitemap.xml',
  }
}

// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllServiceSlugs } from '@/lib/services.data'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllServiceSlugs()
  const serviceUrls = slugs.map(slug => ({
    url: `https://dimensitylabs.dev/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://dimensitylabs.dev', priority: 1.0 },
    { url: 'https://dimensitylabs.dev/work', priority: 0.9 },
    { url: 'https://dimensitylabs.dev/services', priority: 0.9 },
    { url: 'https://dimensitylabs.dev/about', priority: 0.7 },
    { url: 'https://dimensitylabs.dev/contact', priority: 0.7 },
    ...serviceUrls,
  ]
}
```
**Affects:** SEO — indexing speed and crawl efficiency

---

### BUG-B17 🟡 Stats on home page display without testimonials — no evidence layer
**File:** `app/page.tsx`
**Symptom:** The stats section renders "10+ Projects, 100% Client Satisfaction" but no testimonial, case study, or client name appears anywhere on the page to substantiate the claims. The stat rendering logic is in `app/page.tsx` (data side) — Dev A handles the visual component. This bug is about ensuring the testimonials *data* is present and passed to the component when it exists.
**Fix:** Once Dev A ships `TestimonialsSection`, pass real testimonial data from `app/page.tsx`:
```tsx
// app/page.tsx — pass data to Dev A's component
import TestimonialsSection from '@/components/sections/TestimonialsSection'

const testimonials: TestimonialItem[] = [
  {
    name: 'Client Name',
    company: 'Company Name',
    quote: 'Real client quote here.',
    outcome: 'Specific metric, e.g. 60% reduction in support tickets',
  },
  // ...
]

// In JSX:
<TestimonialsSection testimonials={testimonials} />
```
**Coordination:** Dev A builds the component and exports the `TestimonialItem` type via `types/component.types.ts`. Dev B provides the data in `app/page.tsx`. No file overlap.
**Affects:** Home page — conversion rate

---

### BUG-B18 🔵 `generateMetadata` missing on all pages — duplicate title tags
**File:** `app/page.tsx` · all other page files
**Symptom:** This is a direct extension of BUG-B05 with a specific technical detail — without `generateMetadata`, Next.js falls back to the root `layout.tsx` metadata, producing duplicate title tags in some configurations and stripping the `%s | Dimensity Labs` template pattern entirely on sub-pages.
**Steps to reproduce:** View source on any page. The `<title>` tag is identical regardless of page.
**Fix:** Already covered in BUG-B05 and `prompt.md` Task B-05. Ensure `lib/metadata.ts` is the single source with a `buildMetadata()` helper and every page overrides it.
**Affects:** All pages

---

### BUG-B19 🔵 `careers` footer link goes to `/contact` — no dedicated page or anchor
**File:** `lib/navigation.config.ts`
**Symptom:** The footer "Company" column includes a "Careers" link. It currently routes to `/contact` — the generic contact page with no career-specific content. Job seekers land on a contact form with no context.
**Steps to reproduce:** Click "Careers" in the footer. You land on the generic contact page.
**Fix:** In `lib/navigation.config.ts`:
```ts
// Option A — anchor link to a careers section on contact page
{ label: 'Careers', href: '/contact#careers' }

// Option B — minimal dedicated route (preferred)
{ label: 'Careers', href: '/careers' }
// Create app/careers/page.tsx with even a minimal "We're growing — email careers@dimensitylabs.dev"
```
**Affects:** Footer → Careers link

---

---

## Coordination Table — Bugs That Require Both Developers

| Bug ID | What Dev A does | What Dev B does | Who starts first |
|--------|----------------|----------------|-----------------|
| BUG-A04 + BUG-B01 | Drops real images in `public/images/` · Builds team card component | Updates `src` references in `app/` and `lib/` files | Dev A adds images first, then notifies Dev B |
| BUG-A03 | Builds `TestimonialsSection` component | Provides `TestimonialItem[]` data array in `app/page.tsx` | Dev A ships component first |
| BUG-A08 + BUG-B03 | Implements Framer Motion scroll animations | **Must remove preloader first (BUG-B03)** | Dev B removes preloader — Dev A animates after |
| BUG-A09 + BUG-B04 | Builds `ServicePageLayout` visual component | Passes `ServicePage` data from `lib/services.data.ts` | Dev A ships layout shell · Dev B wires data |
| BUG-B06 | Imports `footerServiceLinks` from lib in `Footer.tsx` (read-only) | Creates `lib/navigation.config.ts` with correct hrefs | Dev B creates config · Dev A imports it |
| BUG-B12 | No action required | Adds `generateStaticParams()` to `[slug]/page.tsx` | Dev B only |

---

## Fix Order — Recommended Sequence

```
Week 1 — Critical trust + performance (both devs in parallel, zero overlap)
  Dev A: BUG-A01, BUG-A02, BUG-A03, BUG-A04 (component side)
  Dev B: BUG-B01, BUG-B02, BUG-B03, BUG-B10

Week 2 — Foundation + SEO scaffolding
  Dev A: BUG-A05, BUG-A06, BUG-A15 (light mode)
  Dev B: BUG-B04, BUG-B05, BUG-B06, BUG-B07

Week 3 — Components + content
  Dev A: BUG-A07, BUG-A09, BUG-A10, BUG-A11, BUG-A12, BUG-A13, BUG-A14
  Dev B: BUG-B08, BUG-B09, BUG-B11, BUG-B16

Week 4 — Performance + polish
  Dev A: BUG-A08 (animations — only after BUG-B03 is closed), BUG-A16, BUG-A17
  Dev B: BUG-B12, BUG-B13, BUG-B14, BUG-B15, BUG-B17, BUG-B18, BUG-B19
```

---

## Ground Rules

```
❌ Dev A never opens any file in app/ lib/ next.config.js .env
❌ Dev B never opens any file in components/ styles/ public/ tailwind.config.ts
❌ Neither developer edits types/ without a joint PR that the other approves
❌ Neither developer adds an npm package without a joint PR
✅ When a bug fix touches a boundary — one dev provides data/config, the other provides the component
✅ All cross-boundary coordination is done via lib/ config files and types/ interfaces
✅ If unsure which file a bug lives in — check this doc before touching anything
```