# Trae Prompt — GSAP Scroll Animation FIX
# Paste this entire prompt into Trae's AI chat panel

---

## THE PROBLEM

The scroll animations have two bugs:
1. **Scrolling down** — elements don't appear (they stay invisible/hidden)
2. **Scrolling up** — elements that already appeared vanish again

Both bugs are caused by the same root issues. Fix ALL of them in this order.

---

## ROOT CAUSE ANALYSIS

**Bug 1 — Elements never appear on scroll down:**
- `opacity: 0` is set in CSS/inline styles permanently, so GSAP `fromTo` can't override it
- `ScrollTrigger` can't find the elements because `SmoothScrollProvider` wraps content in a fixed div, breaking the scroll container reference
- Elements are inside `position: fixed` wrapper so ScrollTrigger measures wrong positions

**Bug 2 — Elements vanish on scroll up:**
- `toggleActions: "play none none reverse"` is set — this explicitly REVERSES (re-hides) elements when scrolling back up
- Must be changed to `"play none none none"` so animations only play once and stay visible

---

## FIX 1 — `lib/gsap.ts` — Register plugins correctly

Replace the entire file:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

**Why:** Remove `ScrollSmoother` — it requires a GSAP Club membership and conflicts with standard Next.js scroll. We'll use CSS smooth scroll instead.

---

## FIX 2 — `components/SmoothScrollProvider.tsx` — Replace entirely

The fixed-position wrapper breaks ScrollTrigger's position calculations. Replace with a simple CSS-only smooth scroll:

```tsx
"use client";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

Then in `app/globals.css` add:

```css
html {
  scroll-behavior: smooth;
}

/* Remove these if they exist — they break ScrollTrigger: */
/* html, body { overflow: hidden; } ← DELETE THIS */
/* body { position: fixed; }        ← DELETE THIS */
```

**Also remove from `app/globals.css`:**
```css
/* DELETE these lines if present: */
html, body {
  overflow: hidden;
  height: 100%;
}
```

Replace with:
```css
html, body {
  overflow-x: hidden;
  height: auto;           /* NOT 100% */
  scroll-behavior: smooth;
}

body {
  perspective: none;      /* Remove — causes stacking context issues */
}
```

---

## FIX 3 — `app/layout.tsx` — Remove smooth wrapper reference

Remove the `#smooth-wrapper` / `#smooth-content` div IDs if present. The layout should be:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="dimensity-theme"
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## FIX 4 — `components/HomeAnimations.tsx` — Fix all ScrollTrigger configs

Open the file and make EVERY one of these changes:

### 4A — Remove ALL `toggleActions: "play none none reverse"`

Find every instance of:
```ts
toggleActions: "play none none reverse",
```
Replace ALL of them with:
```ts
toggleActions: "play none none none",
```

### 4B — Fix ScrollTrigger scroll container

After the `gsap.context(() => {` opening line, add this at the very top:

```ts
ScrollTrigger.defaults({
  markers: false,
});

ScrollTrigger.refresh();
```

### 4C — Fix the hero animation — remove `opacity: 0` conflict

The hero elements have `opacity: 0` set in CSS which permanently hides them. The GSAP `fromTo` tries to animate FROM opacity 0 TO opacity 1, but if the CSS is overriding it the element stays invisible.

Change every hero `fromTo` to use `gsap.from` instead (single direction, animates from the start state to the current/natural state):

```ts
// WRONG — fromTo with hardcoded opacity 0 start:
gsap.fromTo(".hero-eyebrow",
  { opacity: 0, y: -20 },
  { opacity: 1, y: 0, duration: 0.8 }
);

// RIGHT — use gsap.from only:
gsap.from(".hero-eyebrow", {
  opacity: 0,
  y: -20,
  duration: 0.8,
  ease: "power2.out",
  clearProps: "all",   // ← CRITICAL: clears inline styles after animation
});
```

Add `clearProps: "all"` to EVERY animation in the hero timeline.

### 4D — Fix the hero timeline

Replace the entire hero timeline with this corrected version:

```ts
const heroTl = gsap.timeline({ delay: 0.2 });

heroTl
  .from(".hero-eyebrow", {
    opacity: 0, y: -20, letterSpacing: "0.4em",
    duration: 0.8, ease: "power2.out", clearProps: "all",
  })
  .from(".hero-headline", {
    opacity: 0, y: 80, skewY: 4,
    duration: 1.1, ease: "expo.out", clearProps: "all",
  }, "-=0.4")
  .from(".hero-subheadline", {
    opacity: 0, y: 30,
    duration: 0.8, ease: "power3.out", clearProps: "all",
  }, "-=0.5")
  .from(".hero-cta", {
    opacity: 0, y: 20, scale: 0.96,
    duration: 0.6, ease: "back.out(1.4)", clearProps: "all",
  }, "-=0.4")
  .from(".hero-socials a", {
    opacity: 0, x: -12,
    stagger: 0.08, duration: 0.5, ease: "power2.out", clearProps: "all",
  }, "-=0.3");
```

### 4E — Fix ALL scroll-triggered `fromTo` animations

Find every `gsap.fromTo` that uses ScrollTrigger and convert to `gsap.from` with `clearProps`:

**Pattern to find:**
```ts
gsap.fromTo(".some-class",
  { opacity: 0, y: 40 },
  {
    opacity: 1, y: 0,
    scrollTrigger: { ... }
  }
);
```

**Replace with:**
```ts
gsap.from(".some-class", {
  opacity: 0, y: 40,
  duration: 0.9,
  ease: "power3.out",
  clearProps: "all",
  scrollTrigger: {
    trigger: ".some-class",
    start: "top 88%",
    toggleActions: "play none none none",
  },
});
```

Do this for EVERY animation in the file. The key changes:
- `fromTo` → `from`
- Remove the first object (the "from" state was the duplicate causing conflicts)
- Add `clearProps: "all"` to every tween
- Change `toggleActions` to `"play none none none"`

### 4F — Fix stagger animations

```ts
// BEFORE:
gsap.fromTo(".service-item",
  { opacity: 0, y: 40, x: -20 },
  {
    opacity: 1, y: 0, x: 0,
    stagger: 0.1,
    scrollTrigger: { trigger: ".service-item", start: "top 80%", toggleActions: "play none none reverse" }
  }
);

// AFTER:
gsap.from(".service-item", {
  opacity: 0, y: 40, x: -20,
  stagger: 0.1,
  duration: 0.7,
  ease: "power3.out",
  clearProps: "all",
  scrollTrigger: {
    trigger: ".service-item",
    start: "top 88%",
    toggleActions: "play none none none",
  },
});
```

### 4G — Fix ScrollTrigger `start` values

Change ALL `start: "top 80%"` to `start: "top 88%"`.
This means "trigger when the TOP of the element is at 88% from the top of the viewport" — elements trigger earlier, before they fully scroll in, so they're never invisible when visible on screen.

### 4H — Fix scrub animations (marquee, parallax)

Scrub animations that use `scrub: true` are fine — leave those as `fromTo`. Only fix the non-scrub entrance animations.

---

## FIX 5 — `components/AboutAnimations.tsx` — Same fixes

Apply ALL the same fixes from Fix 4:
- All `fromTo` → `from` with `clearProps: "all"`
- All `toggleActions: "play none none reverse"` → `"play none none none"`
- All `start: "top 80%"` → `"top 88%"`
- Add `ScrollTrigger.refresh()` at the top of the context

Special fix for the timeline line:
```ts
// BEFORE:
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

// AFTER — scrub is fine as fromTo, just fix the start:
gsap.fromTo(".timeline-line",
  { scaleY: 0, transformOrigin: "top center" },
  {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".timeline-section",
      start: "top 90%",      // ← changed
      end: "bottom 50%",
      scrub: 1,
    },
  }
);
```

---

## FIX 6 — `components/ServicesAnimations.tsx` — Same fixes

Apply ALL the same fixes:
- All `fromTo` → `from` with `clearProps: "all"`
- All `toggleActions` → `"play none none none"`
- All start values → `"top 88%"`

Special fix for process connector (scrub — keep as fromTo):
```ts
gsap.fromTo(".process-connector",
  { scaleX: 0, transformOrigin: "left center" },
  {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".process-section",
      start: "top 88%",
      end: "bottom 60%",
      scrub: 1,
    },
  }
);
```

---

## FIX 7 — `components/WorkAnimations.tsx` — Same fixes

Apply ALL the same fixes.

Special fix for clipPath animation — `clearProps` must include clipPath:

```ts
gsap.from(".project-card", {
  opacity: 0,
  y: 80,
  scale: 0.96,
  clipPath: "inset(20px 0px 0px 0px)",
  duration: 0.9,
  ease: "expo.out",
  clearProps: "opacity,y,scale,clipPath",   // ← explicit list for clipPath
  scrollTrigger: {
    trigger: ".project-card",
    start: "top 88%",
    toggleActions: "play none none none",
  },
  delay: 0,
});
```

---

## FIX 8 — `components/ContactAnimations.tsx` — Same fixes

Apply ALL the same fixes:
- All `fromTo` → `from` with `clearProps: "all"`
- All `toggleActions` → `"play none none none"`
- All start values → `"top 88%"`

---

## FIX 9 — `app/globals.css` — Remove permanent opacity: 0

Find and DELETE these lines if they exist:

```css
/* DELETE THESE: */
.hero-headline,
.hero-subheadline,
.hero-eyebrow {
  opacity: 0;
}
```

**Why:** Setting `opacity: 0` in CSS is permanent and overrides GSAP's inline style animation. GSAP controls visibility — never set `opacity: 0` in CSS for elements you want to animate in.

---

## FIX 10 — Add ScrollTrigger.refresh() after page load

In every animation component, add a `window.addEventListener` to refresh ScrollTrigger after fonts and images load (they change page height):

```ts
useEffect(() => {
  const ctx = gsap.context(() => {

    // ... all your animations ...

  });

  // Refresh after everything loads to recalculate positions
  const handleLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", handleLoad);

  return () => {
    ctx.revert();
    window.removeEventListener("load", handleLoad);
  };
}, []);
```

---

## FIX 11 — Navbar animation cleanup

In your Navbar component, fix the scroll hide/show:

```ts
// BEFORE (hides nav on scroll down — confusing with animations):
ScrollTrigger.create({
  start: "top -80",
  onUpdate: (self) => {
    if (self.direction === 1) {
      gsap.to("nav", { y: -10, opacity: 0.92, duration: 0.3 });
    } else {
      gsap.to("nav", { y: 0, opacity: 1, duration: 0.4 });
    }
  },
});

// AFTER — only add glass blur on scroll, never hide the nav:
ScrollTrigger.create({
  start: "top -10",
  end: 99999,
  onUpdate: (self) => {
    const scrolled = self.scroll() > 50;
    gsap.to("nav", {
      backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      borderBottomColor: scrolled ? "var(--nav-border)" : "transparent",
      duration: 0.3,
    });
  },
});
```

---

## FIX 12 — FINAL VERIFICATION CHECKLIST

After all fixes are applied:

**Test scroll DOWN:**
- [ ] Home page: Hero animates immediately on load (no scroll needed)
- [ ] Scroll down slowly — each section appears as it enters viewport
- [ ] Services section: service items slide in as you reach them
- [ ] Work page: project cards wipe in from bottom
- [ ] No sections are invisible or missing

**Test scroll UP:**
- [ ] Scroll back to top — ALL content remains visible
- [ ] Hero is still fully visible
- [ ] Previously animated sections stay in place
- [ ] Nothing disappears or fades out

**Test performance:**
- [ ] Open DevTools → Console → no GSAP errors
- [ ] Open DevTools → Console → no "ScrollTrigger: target not found" warnings
- [ ] Animations feel smooth, not jerky

**Quick debug — add markers temporarily:**
In any animation component, add `markers: true` to one ScrollTrigger to see where triggers fire:
```ts
scrollTrigger: {
  trigger: ".hero-headline",
  start: "top 88%",
  markers: true,   // ← add this, remove after testing
  toggleActions: "play none none none",
}
```
This shows red/blue lines in the browser so you can see exactly when animations fire.
Remove `markers: true` when everything works.

---

## SUMMARY OF ALL CHANGES

| File | Changes |
|---|---|
| `lib/gsap.ts` | Remove ScrollSmoother |
| `components/SmoothScrollProvider.tsx` | Replace with passthrough |
| `app/layout.tsx` | Remove smooth wrapper divs |
| `app/globals.css` | Fix html/body overflow, remove opacity:0 on hero elements |
| `components/HomeAnimations.tsx` | fromTo→from, clearProps, toggleActions fix, ScrollTrigger.refresh |
| `components/AboutAnimations.tsx` | Same fixes |
| `components/ServicesAnimations.tsx` | Same fixes |
| `components/WorkAnimations.tsx` | Same fixes + clipPath clearProps |
| `components/ContactAnimations.tsx` | Same fixes |
| Navbar component | Fix scroll handler — don't hide nav |

---