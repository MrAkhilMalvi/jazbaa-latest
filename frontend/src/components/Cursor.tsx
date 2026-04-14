import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only show on pointer: fine devices (non-touch)
    if (window.matchMedia("(pointer: coarse)").matches) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    // GSAP quickTo — dot follows instantly, ring lags for inertia feel
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const ringY = gsap.quickTo(ring, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    // Start off-screen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    function onMouseMove(e: MouseEvent) {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    }

    function onEnterInteractive() {
      ring!.classList.add("expanded");
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.out" });
    }

    function onLeaveInteractive() {
      ring!.classList.remove("expanded");
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: "back.out(1.7)",
      });
    }

    window.addEventListener("mousemove", onMouseMove);

    function attachListeners() {
      const targets = document.querySelectorAll<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']",
      );
      for (const el of targets) {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      }
    }

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        aria-hidden="true"
      />
    </>
  );
}
