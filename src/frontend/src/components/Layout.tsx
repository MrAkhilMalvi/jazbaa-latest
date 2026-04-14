import { ScrollTrigger } from "@/hooks/useGSAP";
import { createLenis, destroyLenis, startLenisRaf } from "@/lib/lenis";
import { Outlet } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  const lenisStartedRef = useRef(false);

  useEffect(() => {
    if (lenisStartedRef.current) return;
    lenisStartedRef.current = true;

    const lenis = createLenis();

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    const stopRaf = startLenisRaf(lenis);

    return () => {
      stopRaf();
      destroyLenis();
      ScrollTrigger.killAll();
      lenisStartedRef.current = false;
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col cursor-none md:cursor-none"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
    >
      <Cursor />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
