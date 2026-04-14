import {
  ScrollTrigger,
  gsap,
  useMagnetic,
  useScrollReveal,
  useTiltEffect,
} from "@/hooks/useGSAP";
import { useGSAP } from "@gsap/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface PassionCard {
  title: string;
  tagline: string;
  members: string;
  image: string;
  accent: string;
}

interface Testimonial {
  name: string;
  city: string;
  category: string;
  quote: string;
  avatar: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PASSIONS: PassionCard[] = [
  {
    title: "Dance",
    tagline: "Move with freedom",
    members: "2.4k members",
    image:
      "https://images.unsplash.com/photo-1606788075761-4f1b81e1e32e?w=600&q=80",
    accent: "oklch(0.52 0.22 270)",
  },
  {
    title: "Music",
    tagline: "Find your frequency",
    members: "1.8k members",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80",
    accent: "oklch(0.48 0.24 285)",
  },
  {
    title: "Drawing",
    tagline: "Lines that tell stories",
    members: "1.2k members",
    image:
      "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=600&q=80",
    accent: "oklch(0.70 0.16 55)",
  },
  {
    title: "Painting",
    tagline: "Color your world",
    members: "980 members",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
    accent: "oklch(0.68 0.18 35)",
  },
  {
    title: "Photography",
    tagline: "Capture the moment",
    members: "3.1k members",
    image:
      "https://images.unsplash.com/photo-1559181567-c3190bab3a7c?w=600&q=80",
    accent: "oklch(0.62 0.14 195)",
  },
  {
    title: "Fitness",
    tagline: "Build strength, build you",
    members: "4.2k members",
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600&q=80",
    accent: "oklch(0.65 0.16 160)",
  },
  {
    title: "Tech",
    tagline: "Build what's next",
    members: "2.9k members",
    image:
      "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600&q=80",
    accent: "oklch(0.55 0.18 240)",
  },
  {
    title: "Cooking",
    tagline: "Art you can taste",
    members: "1.6k members",
    image:
      "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=600&q=80",
    accent: "oklch(0.72 0.16 45)",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aisha Patel",
    city: "Mumbai",
    category: "Dance",
    quote:
      "JAZBAA changed how I think about dance. I found my people — the energy, the real friendships. Nothing else comes close.",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
  },
  {
    name: "Rahul Verma",
    city: "Bangalore",
    category: "Music",
    quote:
      "Met incredible musicians I never would have found otherwise. Joining JAZBAA was the best decision I made this year.",
    avatar:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&q=80",
  },
  {
    name: "Sara Khan",
    city: "Delhi",
    category: "Photography",
    quote:
      "Weekly meetups keep me inspired and growing. The feedback from this community is honest, warm, and incredibly valuable.",
    avatar:
      "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=100&q=80",
  },
  {
    name: "Dev Mehta",
    city: "Pune",
    category: "Fitness",
    quote:
      "The accountability here is unmatched. I've hit goals I never thought possible — it's not just a group, it's a movement.",
    avatar:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=100&q=80",
  },
];

const BENEFITS = [
  {
    num: "01",
    title: "Find Your Tribe",
    desc: "Real friendships built around real passions.",
  },
  {
    num: "02",
    title: "Learn & Grow",
    desc: "Expert workshops and peer feedback that sharpens your craft.",
  },
  {
    num: "03",
    title: "Real Events",
    desc: "Meetups and experiences that happen IRL — not just online.",
  },
  {
    num: "04",
    title: "Make an Impact",
    desc: "Showcase your work and leave a mark on your community.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function CharReveal({ text, className }: { text: string; className?: string }) {
  const chars = text.split("");
  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={`char-${i}-${ch}`}
          className="char-reveal inline-block"
          style={{ display: ch === " " ? "inline" : "inline-block" }}
          aria-hidden="true"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function MagneticButton({
  children,
  className,
  href,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { handleMouseMove, handleMouseLeave } = useMagnetic(
    ref as React.RefObject<HTMLElement | null>,
    0.35,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <a
      ref={ref}
      href={href || "#"}
      onClick={onClick}
      className={`inline-block will-change-transform ${className || ""}`}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </a>
  );
}

function ImagePassionCard({
  card,
  index,
}: { card: PassionCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(
    ref as React.RefObject<HTMLElement | null>,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={ref}
      data-ocid={`passion-card-${card.title.toLowerCase().replace(/[^a-z]/g, "-")}`}
      className="passion-card relative overflow-hidden rounded-2xl cursor-pointer group will-change-transform"
      style={{ aspectRatio: "3/4" }}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading={index < 4 ? "eager" : "lazy"}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.08 0.02 260 / 0.92) 0%, oklch(0.08 0.02 260 / 0.30) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
        style={{ background: card.accent }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-white text-xl font-700 mb-1 leading-none">
          {card.title}
        </h3>
        <p className="text-white/70 text-sm font-body mb-3">{card.tagline}</p>
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: card.accent }}
          />
          <span className="text-white/50 text-xs font-mono">
            {card.members}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = headlineRef.current?.querySelectorAll(".char-reveal");
      if (!chars?.length) return;

      gsap.fromTo(
        chars,
        { opacity: 0, y: 70, rotateX: -50 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.035,
          duration: 1.0,
          ease: "power4.out",
          delay: 0.2,
        },
      );

      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 },
        );
      }

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 1.1 },
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          Array.from(ctaRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            delay: 1.4,
          },
        );
      }

      if (scrollRef.current) {
        gsap.fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", delay: 2.0 },
        );
      }
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          x: xRatio * 10,
          y: yRatio * 6,
          duration: 0.9,
          ease: "power2.out",
        });
      }
      if (decorRef.current) {
        gsap.to(decorRef.current, {
          x: xRatio * -22,
          y: yRatio * -16,
          duration: 1.3,
          ease: "power2.out",
        });
      }
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/jazbaa-hero-bg.dim_1920x1080.jpg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.06 0.02 260 / 0.85) 0%, oklch(0.08 0.03 270 / 0.75) 60%, oklch(0.05 0.02 260 / 0.90) 100%)",
          }}
        />
      </div>

      <div
        ref={decorRef}
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none z-1"
        style={{
          background: "oklch(0.52 0.22 270 / 0.08)",
          filter: "blur(120px)",
        }}
        aria-hidden="true"
      />

      <div className="jazbaa-container relative z-10 pt-32 pb-24">
        <div className="max-w-4xl">
          <p
            ref={badgeRef}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.22em] uppercase text-white/50 mb-10"
            style={{ opacity: 0 }}
          >
            <span
              className="inline-block w-4 h-px"
              style={{ background: "var(--jazbaa-coral)" }}
            />
            Creative Community Platform
          </p>

          <h1
            ref={headlineRef}
            className="font-display leading-[1.0] tracking-[-0.03em] text-white mb-8 will-change-transform"
            style={{ fontSize: "clamp(3.8rem,9vw,8rem)" }}
          >
            <span className="block overflow-hidden pb-1">
              <CharReveal text="Unleash Your" />
            </span>
            <span
              className="block overflow-hidden pb-2"
              style={{ color: "var(--jazbaa-coral)" }}
            >
              <CharReveal text="JAZBAA" />
            </span>
          </h1>

          <p
            ref={subRef}
            className="font-body text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12"
            style={{ opacity: 0 }}
          >
            Passion meets community — dance, draw, create, grow.
            <br className="hidden md:block" />
            Find your tribe. Live your art.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 items-center"
            style={{ opacity: 0 }}
          >
            <MagneticButton
              href="/join"
              className="rounded-full px-8 py-4 font-display text-sm font-600 tracking-wide text-white inline-block transition-all duration-300 hover:scale-105"
              style={{ background: "var(--jazbaa-indigo)" }}
              data-ocid="hero-cta-explore"
            >
              Explore Now
            </MagneticButton>
            <MagneticButton
              href="/join"
              className="rounded-full px-8 py-4 font-display text-sm font-600 tracking-wide text-white/80 inline-block border transition-all duration-300 hover:text-white hover:border-white/40"
              style={{ borderColor: "oklch(1 0 0 / 0.20)" }}
              data-ocid="hero-cta-join"
            >
              Join Free →
            </MagneticButton>
          </div>

          <div
            ref={scrollRef}
            className="mt-24 flex items-center gap-3"
            style={{ opacity: 0 }}
          >
            <div
              className="w-px h-10"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, oklch(1 0 0 / 0.3))",
              }}
            />
            <span className="text-xs text-white/30 font-mono tracking-widest uppercase">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatIsJazbaaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, ".reveal-line", {
    y: 40,
    stagger: 0.14,
    start: "top 78%",
  });
  useScrollReveal(sectionRef, ".reveal-fade", {
    y: 20,
    stagger: 0.1,
    start: "top 75%",
  });

  const stats = [
    { value: "10,000+", label: "Members" },
    { value: "50+", label: "Cities" },
    { value: "8", label: "Passion Categories" },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-background overflow-hidden">
      <div className="jazbaa-container">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div>
            <p
              className="section-label mb-8 reveal-fade"
              style={{ opacity: 0 }}
            >
              What is JAZBAA
            </p>

            <div className="space-y-2 mb-10">
              {[
                "A community built",
                "for people who believe",
                "in the power of",
              ].map((line) => (
                <p
                  key={line}
                  className="reveal-line font-display font-700 text-foreground leading-[1.1]"
                  style={{
                    fontSize: "clamp(2rem,3.8vw,3.2rem)",
                    opacity: 0,
                  }}
                >
                  {line}
                </p>
              ))}
              <p
                className="reveal-line font-display font-700 leading-[1.1]"
                style={{
                  fontSize: "clamp(2rem,3.8vw,3.2rem)",
                  opacity: 0,
                  color: "var(--jazbaa-indigo)",
                }}
              >
                creative expression.
              </p>
            </div>

            <p
              className="reveal-fade font-body text-lg text-muted-foreground leading-relaxed max-w-md mb-12"
              style={{ opacity: 0 }}
            >
              Find your tribe, sharpen your craft. JAZBAA connects creative
              souls across cities for real events and real growth.
            </p>

            <div
              className="reveal-fade grid grid-cols-3 gap-6 pt-8 border-t border-border"
              style={{ opacity: 0 }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className="font-display font-800 text-foreground mb-1"
                    style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-fade relative" style={{ opacity: 0 }}>
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
                alt="JAZBAA community — people together"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.985 0.004 80 / 0.6) 0%, transparent 100%)",
                }}
              />
            </div>

            <div
              className="absolute -bottom-5 -left-5 bg-card border border-border rounded-2xl px-5 py-4 shadow-sm"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <p className="font-display font-700 text-foreground text-lg leading-none mb-1">
                10,000+
              </p>
              <p className="text-xs text-muted-foreground font-mono tracking-wider">
                Active members
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExplorePassionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".passion-card");
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 70, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: { amount: 0.7, from: "start" },
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 overflow-hidden"
      style={{ background: "oklch(0.975 0.004 260)" }}
    >
      <div className="jazbaa-container">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="section-label mb-4">Your Journey Starts Here</p>
            <h2
              className="font-display font-800 text-foreground leading-[1.1]"
              style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
            >
              Explore Your <span className="text-gradient">Passion</span>
            </h2>
          </div>
          <p className="font-body text-muted-foreground max-w-xs text-base leading-relaxed">
            Eight worlds of creative energy. One community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PASSIONS.map((card, i) => (
            <ImagePassionCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyJoinSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, ".benefit-reveal", {
    y: 30,
    stagger: 0.12,
    start: "top 78%",
  });

  return (
    <section ref={sectionRef} className="py-32 bg-background">
      <div className="jazbaa-container">
        <div className="max-w-xl mb-16">
          <p
            className="section-label mb-4 benefit-reveal"
            style={{ opacity: 0 }}
          >
            Why JAZBAA
          </p>
          <h2
            className="font-display font-800 text-foreground leading-[1.1] benefit-reveal"
            style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", opacity: 0 }}
          >
            Built for <span className="text-gradient-warm">creators</span>,
            <br />
            by creators.
          </h2>
        </div>

        <div className="divide-y divide-border">
          {BENEFITS.map((b, i) => (
            <div
              key={b.num}
              data-ocid={`benefit-item-${i}`}
              className="benefit-reveal grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 py-10 items-start"
              style={{ opacity: 0 }}
            >
              <span
                className="font-display font-800 text-muted-foreground/30 leading-none select-none"
                style={{ fontSize: "clamp(2.5rem,4vw,3.5rem)" }}
              >
                {b.num}
              </span>
              <h3 className="font-display font-700 text-foreground text-2xl leading-tight">
                {b.title}
              </h3>
              <p className="font-body text-muted-foreground text-base leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useScrollReveal(sectionRef, ".stories-reveal", { y: 30, stagger: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-32 overflow-hidden"
      style={{ background: "oklch(0.975 0.004 260)" }}
    >
      <div className="jazbaa-container mb-14">
        <p className="section-label mb-4 stories-reveal" style={{ opacity: 0 }}>
          Community Stories
        </p>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2
            className="font-display font-800 text-foreground leading-[1.1] stories-reveal"
            style={{ fontSize: "clamp(2.2rem,4.5vw,4rem)", opacity: 0 }}
          >
            Voices that <span className="text-gradient">inspire.</span>
          </h2>
          <div className="flex gap-3 stories-reveal" style={{ opacity: 0 }}>
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              data-ocid="stories-prev"
              className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-200 hover:border-foreground/30 hover:bg-muted"
              aria-label="Previous testimonial"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              data-ocid="stories-next"
              className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-200 hover:border-foreground/30 hover:bg-muted"
              aria-label="Next testimonial"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  d="M9 18l6-6-6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="pl-6 md:pl-12 lg:pl-20 xl:pl-[max(5rem,calc(50vw-700px))]">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5 stories-reveal" style={{ opacity: 0 }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                data-ocid={`testimonial-${i}`}
                className="flex-none w-[min(380px,85vw)] rounded-2xl bg-card border border-border p-8 flex flex-col gap-6 transition-all duration-500"
                style={{
                  boxShadow:
                    i === activeIndex
                      ? "var(--shadow-soft)"
                      : "var(--shadow-card)",
                  transform: i === activeIndex ? "scale(1.02)" : "scale(1)",
                  opacity: i === activeIndex ? 1 : 0.55,
                  filter: i === activeIndex ? "none" : "blur(0.3px)",
                }}
              >
                <div
                  className="font-display text-5xl leading-none font-800 select-none"
                  style={{ color: "var(--jazbaa-indigo)", opacity: 0.25 }}
                  aria-hidden="true"
                >
                  "
                </div>
                <p className="font-body text-foreground leading-relaxed text-base flex-1">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="font-display font-700 text-foreground text-sm leading-tight">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      {t.category} · {t.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="jazbaa-container mt-10 flex gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            type="button"
            key={t.name}
            onClick={() => emblaApi?.scrollTo(i)}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? "2rem" : "0.5rem",
              background:
                i === activeIndex
                  ? "var(--jazbaa-indigo)"
                  : "oklch(0.52 0.22 270 / 0.2)",
            }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, ".cta-reveal", { y: 30, stagger: 0.12 });

  return (
    <section
      ref={sectionRef}
      className="py-36 relative overflow-hidden bg-background"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "oklch(0.52 0.22 270 / 0.04)",
          filter: "blur(150px)",
        }}
        aria-hidden="true"
      />

      <div className="jazbaa-container relative z-10 text-center">
        <p className="section-label mb-6 cta-reveal" style={{ opacity: 0 }}>
          Start Today
        </p>
        <h2
          className="font-display font-800 leading-[1.05] text-foreground mb-6 cta-reveal"
          style={{ fontSize: "clamp(2.5rem,5.5vw,5rem)", opacity: 0 }}
        >
          Ready to find your
          <br />
          <span className="text-gradient">Passion?</span>
        </h2>
        <p
          className="font-body text-lg text-muted-foreground max-w-lg mx-auto mb-12 cta-reveal"
          style={{ opacity: 0 }}
        >
          Join 10,000+ people across India. No commitment — just community.
        </p>

        <div
          className="flex flex-wrap gap-4 justify-center mb-20 cta-reveal"
          style={{ opacity: 0 }}
        >
          <MagneticButton
            href="/join"
            className="rounded-full px-9 py-4 font-display text-sm font-600 tracking-wide text-white inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "var(--jazbaa-indigo)" }}
            data-ocid="cta-get-started"
          >
            Join the Community
          </MagneticButton>
          <MagneticButton
            href="/events"
            className="rounded-full px-9 py-4 font-display text-sm font-600 tracking-wide text-foreground inline-block border border-border transition-all duration-300 hover:bg-muted"
            data-ocid="cta-explore-events"
          >
            Explore Events
          </MagneticButton>
        </div>

        <div
          className="grid grid-cols-3 max-w-2xl mx-auto gap-8 pt-12 border-t border-border cta-reveal"
          style={{ opacity: 0 }}
        >
          {[
            { value: "10k+", label: "Active Members" },
            { value: "50+", label: "Cities" },
            { value: "8", label: "Passion Categories" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center"
              data-ocid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <p
                className="font-display font-800 text-foreground leading-none mb-2"
                style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      for (const t of ScrollTrigger.getAll()) {
        t.kill();
      }
    };
  }, []);

  return (
    <div>
      <HeroSection />
      <WhatIsJazbaaSection />
      <ExplorePassionSection />
      <WhyJoinSection />
      <StoriesSection />
      <CtaSection />
    </div>
  );
}
