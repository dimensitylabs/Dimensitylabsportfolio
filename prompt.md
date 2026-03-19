# Trae Prompt — Dimensity Labs GSAP Immersive Scroll Animations
# Paste this entire prompt into Trae's AI chat panel

---

You are adding **immersive, cinematic GSAP scroll animations** to the Dimensity Labs Next.js website. The goal is a premium, 3D-feeling scroll experience — think Apple.com, Linear.app, or Stripe.com level polish. Every scroll should feel physical, intentional, and smooth.

**DO NOT** change any content, layout structure, colors, or fonts. Only add animation logic on top of what exists.

---

## STEP 1 — INSTALL DEPENDENCIES

Run in terminal:

```bash
npm install gsap @gsap/react
```

GSAP ScrollTrigger is included with the main gsap package. No extra install needed.

---

## STEP 2 — CREATE GLOBAL GSAP SETUP

Create a new file: `lib/gsap.ts`

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export { gsap, ScrollTrigger, ScrollSmoother };
```

---

## STEP 3 — SMOOTH SCROLL WRAPPER

Create `components/SmoothScrollProvider.tsx`:

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const smoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    smoother.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.4,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper" style={{ overflow: "hidden", position: "fixed", width: "100%", top: 0, left: 0 }}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
```

Wrap the root layout in `app/layout.tsx`:

```tsx
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

---

## STEP 4 — REUSABLE ANIMATION HOOKS

Create `hooks/useGSAP.ts`:

```ts
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useScrollReveal(
  selector: string,
  options?: gsap.TweenVars & { stagger?: number; scrollStart?: string }
) {
  useEffect(() => {
    const elements = gsap.utils.toArray<Element>(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options?.y ?? 60,
          rotateX: options?.rotateX ?? 8,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: options?.duration ?? 0.9,
          stagger: options?.stagger ?? 0.12,
          ease: options?.ease ?? "power3.out",
          scrollTrigger: {
            trigger: elements[0],
            start: options?.scrollStart ?? "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);
}

export function useParallax(selector: string, speed: number = 0.3) {
  useEffect(() => {
    const elements = gsap.utils.toArray<Element>(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.to(el, {
          yPercent: -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
```

---

## STEP 5 — HOME PAGE ANIMATIONS (`app/page.tsx`)

Create `components/HomeAnimations.tsx` and import it into the home page:

```tsx
"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HomeAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────
      // 1. HERO — Cinematic entrance, 3D letter drop
      // ─────────────────────────────────────────────
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl
        .fromTo(".hero-eyebrow",
          { opacity: 0, y: -20, letterSpacing: "0.4em" },
          { opacity: 1, y: 0, letterSpacing: "0.1em", duration: 0.8, ease: "power2.out" }
        )
        .fromTo(".hero-headline",
          { opacity: 0, y: 80, skewY: 4, transformOrigin: "left bottom" },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: "expo.out" },
          "-=0.4"
        )
        .fromTo(".hero-subheadline",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(".hero-cta",
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.4"
        )
        .fromTo(".hero-socials a",
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );

      // ─────────────────────────────────────────────
      // 2. HERO STATS — Counter animation + reveal
      // ─────────────────────────────────────────────
      const statElements = gsap.utils.toArray<HTMLElement>(".hero-stat-number");
      statElements.forEach((el) => {
        const end = parseInt(el.dataset.value || el.innerText, 10);
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(el.parentElement!,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
            gsap.to(obj, {
              val: end,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => { el.innerText = Math.round(obj.val) + "+"; },
            });
          },
        });
      });

      // ─────────────────────────────────────────────
      // 3. TICKER MARQUEE — parallax speedup on scroll
      // ─────────────────────────────────────────────
      gsap.to(".marquee-track", {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ─────────────────────────────────────────────
      // 4. WHAT WE DO — Services stagger reveal
      // ─────────────────────────────────────────────
      gsap.fromTo(".services-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: ".services-heading", start: "top 80%" },
        }
      );

      gsap.fromTo(".service-item",
        { opacity: 0, y: 40, x: -20 },
        {
          opacity: 1, y: 0, x: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".service-item",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Number labels on services slide in from left
      gsap.fromTo(".service-number",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.08, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".service-item", start: "top 80%" },
        }
      );

      // ─────────────────────────────────────────────
      // 5. FEATURED WORK — Staggered card tilt reveal
      // ─────────────────────────────────────────────
      const workCards = gsap.utils.toArray<HTMLElement>(".work-card");
      workCards.forEach((card, i) => {
        const direction = i % 2 === 0 ? 1 : -1;

        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            rotateY: 8 * direction,
            transformOrigin: "center center",
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.06,
          }
        );

        // Subtle hover parallax on each card image
        const img = card.querySelector("img");
        if (img) {
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
            gsap.to(img, { x, y: y * 0.6, duration: 0.4, ease: "power2.out" });
            gsap.to(card, { rotateY: x * 0.3, rotateX: -y * 0.3, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" });
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" });
          });
        }
      });

      // ─────────────────────────────────────────────
      // 6. MANIFESTO QUOTE — Word-by-word reveal
      // ─────────────────────────────────────────────
      const quoteEl = document.querySelector(".manifesto-quote");
      if (quoteEl) {
        const words = quoteEl.textContent!.trim().split(" ");
        quoteEl.innerHTML = words
          .map((w) => `<span class="word" style="display:inline-block;overflow:hidden"><span class="word-inner" style="display:inline-block">${w}&nbsp;</span></span>`)
          .join("");

        gsap.fromTo(".word-inner",
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.04,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteEl,
              start: "top 80%",
            },
          }
        );
      }

      // ─────────────────────────────────────────────
      // 7. BOTTOM STATS — Horizontal slide-in
      // ─────────────────────────────────────────────
      gsap.fromTo(".bottom-stat",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".bottom-stats",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ─────────────────────────────────────────────
      // 8. BOTTOM CTA — Scale punch-in
      // ─────────────────────────────────────────────
      gsap.fromTo(".bottom-cta-section",
        { opacity: 0, scale: 0.94, y: 40 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".bottom-cta-section",
            start: "top 85%",
          },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return null;
}
```

Add `<HomeAnimations />` at the top of your home page component (inside the JSX, before the first section).

Add these CSS class names to existing elements in `app/page.tsx`:
- Hero badge/eyebrow → add class `hero-eyebrow`
- Main hero heading → add class `hero-headline`
- Hero subtext → add class `hero-subheadline`
- Hero CTA buttons container → add class `hero-cta`
- Social links wrapper → add class `hero-socials`
- Each stat number → add class `hero-stat-number` and `data-value="10"` (the number without +)
- Marquee/ticker wrapper → add class `marquee-section`, inner track → `marquee-track`
- Services section heading → add class `services-heading`
- Each service list item (01, 02...) → add class `service-item`
- Each service number (01, 02...) → add class `service-number`
- Each work/project card → add class `work-card`
- Quote/manifesto text element → add class `manifesto-quote`
- Bottom stats container → add class `bottom-stats`, each stat → `bottom-stat`
- Bottom CTA section → add class `bottom-cta-section`

---

## STEP 6 — ABOUT PAGE ANIMATIONS (`app/about/page.tsx`)

Create `components/AboutAnimations.tsx`:

```tsx
"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function AboutAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────
      // 1. PAGE HEADLINE — Split line reveal
      // ─────────────────────────────────────────────
      gsap.fromTo(".about-headline",
        { opacity: 0, y: 70, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: "expo.out", delay: 0.1 }
      );

      // ─────────────────────────────────────────────
      // 2. INTRO — Text fade in + image parallax
      // ─────────────────────────────────────────────
      gsap.fromTo(".about-intro-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".about-intro-text", start: "top 85%" },
        }
      );

      gsap.to(".about-intro-image",
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-intro-image",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // ─────────────────────────────────────────────
      // 3. STATS — Cascade reveal
      // ─────────────────────────────────────────────
      gsap.fromTo(".about-stat",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: ".about-stat", start: "top 85%" },
        }
      );

      // ─────────────────────────────────────────────
      // 4. TIMELINE — Entries slide in alternating sides
      // ─────────────────────────────────────────────
      const timelineItems = gsap.utils.toArray<Element>(".timeline-item");
      timelineItems.forEach((item, i) => {
        const dir = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(item,
          { opacity: 0, x: dir, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Connecting line draws itself top-to-bottom
      gsap.fromTo(".timeline-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      // ─────────────────────────────────────────────
      // 5. VALUES — Stagger grid reveal with scale
      // ─────────────────────────────────────────────
      gsap.fromTo(".value-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ─────────────────────────────────────────────
      // 6. TEAM CARDS — Flip reveal with depth
      // ─────────────────────────────────────────────
      gsap.fromTo(".team-card",
        { opacity: 0, rotateX: 15, y: 50, transformPerspective: 800, transformOrigin: "top center" },
        {
          opacity: 1, rotateX: 0, y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Team card image hover parallax
      document.querySelectorAll<HTMLElement>(".team-card").forEach((card) => {
        const img = card.querySelector("img");
        if (!img) return;
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
          gsap.to(img, { scale: 1.06, x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "expo.out" });
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return null;
}
```

Add class names to `app/about/page.tsx` elements:
- Main heading → `about-headline`
- Intro text block → `about-intro-text`
- Intro image → `about-intro-image`
- Each stat item → `about-stat`
- Timeline container → `timeline-section`, vertical line element → `timeline-line`
- Each timeline entry → `timeline-item`
- Values grid container → `values-grid`, each value card → `value-card`
- Team grid container → `team-grid`, each team card → `team-card`

---

## STEP 7 — SERVICES PAGE ANIMATIONS (`app/services/page.tsx`)

Create `components/ServicesAnimations.tsx`:

```tsx
"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ServicesAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────
      // 1. PAGE HEADER — Cinematic drop
      // ─────────────────────────────────────────────
      const headerTl = gsap.timeline({ delay: 0.15 });
      headerTl
        .fromTo(".services-page-heading",
          { opacity: 0, y: 80, rotateX: 10, transformOrigin: "top center", transformPerspective: 600 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.1, ease: "expo.out" }
        )
        .fromTo(".services-page-sub",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // ─────────────────────────────────────────────
      // 2. SERVICE BLOCKS — Alternating slide reveal
      // ─────────────────────────────────────────────
      const serviceBlocks = gsap.utils.toArray<Element>(".service-block");
      serviceBlocks.forEach((block, i) => {
        const fromX = i % 2 === 0 ? -50 : 50;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(block.querySelector(".service-block-number"),
          { opacity: 0, x: fromX * 0.5, y: -10 },
          { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" }
        )
        .fromTo(block.querySelector(".service-block-title"),
          { opacity: 0, x: fromX },
          { opacity: 1, x: 0, duration: 0.8, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(block.querySelectorAll(".service-block-tag"),
          { opacity: 0, scale: 0.8, y: 10 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "back.out(1.5)" },
          "-=0.4"
        )
        .fromTo(block.querySelector(".service-block-body"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
      });

      // ─────────────────────────────────────────────
      // 3. PROCESS STEPS — Draw line + reveal each step
      // ─────────────────────────────────────────────
      gsap.fromTo(".process-connector",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      const processSteps = gsap.utils.toArray<Element>(".process-step");
      processSteps.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: ".process-section",
              start: "top 80%",
            },
          }
        );
      });

      // ─────────────────────────────────────────────
      // 4. PRICING CARDS — 3D lift stagger
      // ─────────────────────────────────────────────
      const pricingCards = gsap.utils.toArray<HTMLElement>(".pricing-card");
      pricingCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotateY: i % 2 === 0 ? -6 : 6, transformPerspective: 900 },
          {
            opacity: 1, y: 0, rotateY: 0,
            duration: 1.0,
            ease: "expo.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: ".pricing-section",
              start: "top 80%",
            },
          }
        );

        // Hover magnetic effect
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
          gsap.to(card, { rotateY: x, rotateX: -y, scale: 1.02, duration: 0.4, ease: "power2.out", transformPerspective: 900 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.7, ease: "expo.out" });
        });
      });

      // ─────────────────────────────────────────────
      // 5. FAQ — Accordion items stagger in
      // ─────────────────────────────────────────────
      gsap.fromTo(".faq-item",
        { opacity: 0, y: 25, x: -15 },
        {
          opacity: 1, y: 0, x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return null;
}
```

Add class names to `app/services/page.tsx` elements:
- Page heading → `services-page-heading`
- Page subtext → `services-page-sub`
- Each service block wrapper → `service-block`
- Inside each block: number label → `service-block-number`, title → `service-block-title`, each tag pill → `service-block-tag`, body text → `service-block-body`
- Process section wrapper → `process-section`, connector line element → `process-connector`, each step → `process-step`
- Pricing section wrapper → `pricing-section`, each card → `pricing-card`
- FAQ section wrapper → `faq-section`, each FAQ row → `faq-item`

---

## STEP 8 — WORK PAGE ANIMATIONS (`app/work/page.tsx`)

Create `components/WorkAnimations.tsx`:

```tsx
"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function WorkAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────
      // 1. PAGE HEADER
      // ─────────────────────────────────────────────
      gsap.fromTo(".work-page-heading",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.0, ease: "expo.out", delay: 0.1 }
      );

      // ─────────────────────────────────────────────
      // 2. FILTER PILLS — Pop in from center
      // ─────────────────────────────────────────────
      gsap.fromTo(".filter-pill",
        { opacity: 0, scale: 0.75, y: 10 },
        {
          opacity: 1, scale: 1, y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );

      // ─────────────────────────────────────────────
      // 3. PROJECT CARDS — Masonry cascade reveal
      // ─────────────────────────────────────────────
      const projectCards = gsap.utils.toArray<HTMLElement>(".project-card");
      projectCards.forEach((card, i) => {
        const col = i % 3;
        const delayOffset = col * 0.08;

        gsap.fromTo(card,
          {
            opacity: 0,
            y: 80,
            scale: 0.96,
            clipPath: "inset(20px 0px 0px 0px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0px 0px 0px 0px)",
            duration: 0.9,
            ease: "expo.out",
            delay: delayOffset,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // On hover: image scale + overlay fade + lift card
        const img = card.querySelector("img");
        const overlay = card.querySelector(".card-overlay");

        card.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.08, duration: 0.6, ease: "power2.out" });
          gsap.to(overlay, { opacity: 1, duration: 0.4 });
          gsap.to(card, { y: -6, boxShadow: "0 32px 80px rgba(0,0,0,0.45)", duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.7, ease: "expo.out" });
          gsap.to(overlay, { opacity: 0, duration: 0.4 });
          gsap.to(card, { y: 0, boxShadow: "none", duration: 0.6, ease: "expo.out" });
        });
      });

      // ─────────────────────────────────────────────
      // 4. CATEGORY TAGS — Slide in on each card
      // ─────────────────────────────────────────────
      gsap.fromTo(".project-tag",
        { opacity: 0, x: -12 },
        {
          opacity: 1, x: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".work-grid",
            start: "top 80%",
          },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return null;
}
```

Add class names to `app/work/page.tsx`:
- Page heading → `work-page-heading`
- Each filter pill/button → `filter-pill`
- Projects grid wrapper → `work-grid`
- Each project card → `project-card`
- Image inside each card → keep existing `img` tag (no class needed, selected by `card.querySelector("img")`)
- Dark overlay inside each card → add a `<div class="card-overlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.4);opacity:0;pointer-events:none"></div>` if not already present
- Category tag on each card → `project-tag`

---

## STEP 9 — CONTACT PAGE ANIMATIONS (`app/contact/page.tsx`)

Create `components/ContactAnimations.tsx`:

```tsx
"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ContactAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────
      // 1. PAGE HEADER — Entrance
      // ─────────────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(".contact-heading",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.0, ease: "expo.out" }
      )
      .fromTo(".contact-badge",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.5"
      );

      // ─────────────────────────────────────────────
      // 2. CONTACT INFO ITEMS — Slide in from right
      // ─────────────────────────────────────────────
      gsap.fromTo(".contact-info-item",
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // ─────────────────────────────────────────────
      // 3. FORM — Field-by-field reveal
      // ─────────────────────────────────────────────
      gsap.fromTo(".form-field",
        { opacity: 0, y: 25, x: -10 },
        {
          opacity: 1, y: 0, x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
          },
        }
      );

      // Submit button magnetic effect
      const submitBtn = document.querySelector<HTMLElement>(".submit-btn");
      if (submitBtn) {
        submitBtn.addEventListener("mousemove", (e) => {
          const r = submitBtn.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(submitBtn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
        });
        submitBtn.addEventListener("mouseleave", () => {
          gsap.to(submitBtn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        });
      }

      // ─────────────────────────────────────────────
      // 4. LOCATION CARDS — Cascade reveal
      // ─────────────────────────────────────────────
      gsap.fromTo(".location-card",
        { opacity: 0, y: 40, rotateX: 8, transformPerspective: 600, transformOrigin: "top center" },
        {
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".locations-section",
            start: "top 80%",
          },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return null;
}
```

Add class names to `app/contact/page.tsx`:
- Main heading → `contact-heading`
- Status badge → `contact-badge`
- Each email/contact info block → `contact-info-item`
- Contact form element → `contact-form`
- Each form field wrapper → `form-field`
- Submit button → `submit-btn`
- Locations section wrapper → `locations-section`
- Each location card → `location-card`

---

## STEP 10 — GLOBAL NAVBAR ANIMATION

Find your Navbar component and add this effect:

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Add inside your Navbar component:
useEffect(() => {
  // Entrance animation
  gsap.fromTo("nav",
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.5 }
  );

  // Shrink on scroll
  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    onUpdate: (self) => {
      if (self.direction === 1) {
        gsap.to("nav", { y: -10, opacity: 0.92, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to("nav", { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
      }
    },
  });

  // Nav links hover underline animation
  document.querySelectorAll<HTMLElement>("nav a").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, { y: -2, duration: 0.2, ease: "power2.out" });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, { y: 0, duration: 0.3, ease: "elastic.out(1, 0.6)" });
    });
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);
```

---

## STEP 11 — GLOBAL CSS ADDITIONS

Add to your global CSS file (`app/globals.css` or equivalent):

```css
/* Required for GSAP smooth scroll wrapper */
html, body {
  overflow: hidden;
  height: 100%;
}

/* 3D perspective for the entire document */
body {
  perspective: 1200px;
}

/* Prevent content flash before animation */
.hero-headline,
.hero-subheadline,
.hero-eyebrow {
  opacity: 0;
}

/* Smooth image overflow on card hover */
.work-card,
.project-card {
  overflow: hidden;
}

.work-card img,
.project-card img {
  will-change: transform;
  transform-origin: center center;
}

/* Cursor upgrade — global glowing cursor */
* { cursor: none !important; }

.cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s;
}

.cursor-ring {
  position: fixed;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(255,255,255,0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
}
```

Create `components/CustomCursor.tsx` and add it to layout:

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
    };

    const expandCursor = () => {
      gsap.to(dot.current, { scale: 2.5, duration: 0.3, ease: "power2.out" });
      gsap.to(ring.current, { scale: 1.6, opacity: 0.6, duration: 0.3, ease: "power2.out" });
    };

    const shrinkCursor = () => {
      gsap.to(dot.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    };

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button, [role=button]").forEach((el) => {
      el.addEventListener("mouseenter", expandCursor);
      el.addEventListener("mouseleave", shrinkCursor);
    });

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
```

Add `<CustomCursor />` in `app/layout.tsx` outside the SmoothScrollProvider.

---

## STEP 12 — FINAL CHECKS

After all files are created and classes are added:

- [ ] Run `npm run dev` — no console errors
- [ ] Home page hero animates on load
- [ ] Scrolling the page triggers section animations
- [ ] Work cards have hover parallax effect on images
- [ ] Pricing cards respond to mouse movement (tilt)
- [ ] Custom cursor is visible and follows mouse
- [ ] Navbar hides slightly on scroll down, returns on scroll up
- [ ] No layout shifts or flashes
- [ ] Mobile: disable smooth scroll on touch devices (ScrollSmoother `smoothTouch: 0.1` handles this)

---

## IMPORTANT RULES

1. **DO NOT** change any content, colors, fonts, or layout
2. Only ADD: new component files, class names to existing elements, one `globals.css` addition
3. All animation components must use `"use client"` directive (Next.js App Router)
4. Always clean up with `ctx.revert()` or `ScrollTrigger.getAll().forEach(t => t.kill())` on unmount
5. If a class name already exists on an element, append the animation class alongside it
6. Test each page individually after adding its animation component
7. The `data-value` attribute on stat numbers is only needed if you want counter animations — add it to the number elements with the numeric value as the attribute

---