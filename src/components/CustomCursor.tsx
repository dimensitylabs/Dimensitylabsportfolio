"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);
  const { resolvedTheme } = useTheme();

  // Update cursor colours when theme changes
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || isTouch.current) return;

    const isDark = resolvedTheme === "dark";

    // Transition dot appearance
    gsap.to(dot, {
      boxShadow: isDark
        ? "0 0 6px rgba(198,241,53,0.6), 0 0 20px rgba(198,241,53,0.25)"
        : "none",
      duration: 0.35,
      ease: "power2.out",
    });
    // Removed dot.style.mixBlendMode = ... to keep it visible over all stacking contexts

    // Transition ring appearance
    gsap.to(ring, {
      borderColor: isDark
        ? "rgba(198,241,53,0.45)"
        : "var(--clr-ink)",
      boxShadow: isDark
        ? "0 0 12px rgba(198,241,53,0.1)"
        : "none",
      duration: 0.35,
      ease: "power2.out",
    });
  }, [resolvedTheme]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Detect touch device — hide cursor entirely
    const checkTouch = () => {
      isTouch.current = window.matchMedia("(pointer: coarse)").matches;
      if (isTouch.current) {
        dot.style.display = "none";
        ring.style.display = "none";
        document.body.classList.remove("custom-cursor-enabled");
      } else {
        dot.style.display = "block";
        ring.style.display = "block";
        document.body.classList.add("custom-cursor-enabled");
      }
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    // Helper: get the default ring border based on current theme
    const getDefaultRingBorder = () => {
      return document.documentElement.classList.contains("dark")
        ? "rgba(198,241,53,0.45)"
        : "var(--clr-ink)";
    };

    // Move handler
    const onMouseMove = (e: MouseEvent) => {
      if (isTouch.current) return;
      pos.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        z: 9999, // Force front
        duration: 0.08,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Ring follows with slight lag
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        z: 9998, // Just behind dot
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // Hover detection for interactive elements
    const interactiveSelector =
      'a, button, [role="button"], [role="link"], label, summary, .btn, .btn-arrow, .filter-btn, .nav-logo, .footer-social-link, .contact-social-link, .hamburger-btn, select';
    const cardSelector =
      ".proj-card, .work-card, .project-card, .pricing-card, .team-card, .value-card, .case-card, .service-row, .services-list-item, .office-card, .calc-service-btn, .calc-feature-btn";
    const inputSelector =
      'input:not([type="checkbox"]):not([type="radio"]), textarea';

    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 1.6,
        borderColor: "var(--clr-accent)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: getDefaultRingBorder(),
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const onEnterCard = () => {
      gsap.to(ring, {
        scale: 2.2,
        borderColor: "var(--clr-accent)",
        backgroundColor: "rgba(198, 241, 53, 0.08)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.25, ease: "power2.out" });
    };

    const onLeaveCard = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: getDefaultRingBorder(),
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const onEnterInput = () => {
      gsap.to(ring, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(dot, {
        width: 2,
        height: 20,
        borderRadius: 1,
        duration: 0.2,
      });
    };

    const onLeaveInput = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, {
        width: 8,
        height: 8,
        borderRadius: "50%",
        duration: 0.3,
      });
    };

    // Hide on mouse leave window
    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    // Mouse down/up feedback
    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.15 });
      gsap.to(dot, { scale: 1.4, duration: 0.15 });
    };
    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Delegate hover events via event delegation
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest(inputSelector)) {
        onEnterInput();
      } else if (target.closest(cardSelector)) {
        onEnterCard();
      } else if (target.closest(interactiveSelector)) {
        onEnterInteractive();
      }
    };

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest(inputSelector)) {
        onLeaveInput();
      } else if (target.closest(cardSelector)) {
        onLeaveCard();
      } else if (target.closest(interactiveSelector)) {
        onLeaveInteractive();
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", checkTouch);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
