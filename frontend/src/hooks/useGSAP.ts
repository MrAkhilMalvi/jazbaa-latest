import { useGSAP as useGSAPCore } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useRef } from "react";

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger);

// Primary export — @gsap/react hook
export { useGSAPCore as useGSAP };

/**
 * useGSAPContext — alias for backwards compatibility (used in Landing.tsx and others).
 * Wraps the GSAP context pattern with proper cleanup.
 */
export const useGSAPContext = useGSAPCore;

/**
 * Fades in elements matching a selector when they scroll into view.
 * Adds 'gsap-animated' class after animation to prevent re-triggering.
 */
export function useScrollReveal(
  containerRef: React.RefObject<Element | null>,
  selector = ".gsap-reveal",
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {},
) {
  const { y = 30, duration = 0.85, stagger = 0.1, start = "top 85%" } = options;

  useGSAPCore(
    () => {
      const elements =
        containerRef.current?.querySelectorAll<HTMLElement>(selector);
      if (!elements?.length) return;

      // Skip already-animated elements
      const targets = Array.from(elements).filter(
        (el) => !el.classList.contains("gsap-animated"),
      );
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
            onLeave: () => {
              for (const el of targets) el.classList.add("gsap-animated");
            },
          },
          onComplete: () => {
            for (const el of targets) el.classList.add("gsap-animated");
          },
        },
      );
    },
    { scope: containerRef, dependencies: [] },
  );
}

/**
 * Parallax scroll effect on a single element.
 */
export function useParallax(
  ref: React.RefObject<Element | null>,
  yPercent = -20,
) {
  useGSAPCore(
    () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [] },
  );
}

/**
 * 3D card tilt on mouse move.
 */
export function useTiltEffect(ref: React.RefObject<HTMLElement | null>) {
  const animRef = useRef<gsap.QuickToFunc | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      gsap.to(el, {
        rotateY: x * 8,
        rotateX: -y * 8,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    },
    [ref],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, [ref]);

  return { handleMouseMove, handleMouseLeave, animRef };
}

/**
 * Magnetic button pull effect.
 */
export function useMagnetic(
  ref: React.RefObject<HTMLElement | null>,
  strength = 0.4,
) {
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
    },
    [ref, strength],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  }, [ref]);

  return { handleMouseMove, handleMouseLeave };
}

export { gsap, ScrollTrigger };
