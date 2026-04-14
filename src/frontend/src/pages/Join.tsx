import {
  gsap,
  useMagnetic,
  useScrollReveal,
  useTiltEffect,
} from "@/hooks/useGSAP";
import { useGSAP } from "@gsap/react";
import {
  Anchor,
  ArrowRight,
  ChevronDown,
  Flame,
  Heart,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    id: "passion",
    num: "01",
    icon: Flame,
    title: "Pick Your Passion",
    desc: "Choose the creative track that moves you — dance, music, art, fitness, or more.",
    img: "https://images.unsplash.com/photo-1606788075761-4f1b81e1e32e?w=400&q=80",
    accent: "oklch(0.52 0.22 270)",
  },
  {
    id: "city",
    num: "02",
    icon: MapPin,
    title: "Find Your City",
    desc: "Connect with your local JAZBAA chapter and the people already active in your neighbourhood.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    accent: "oklch(0.68 0.18 35)",
  },
  {
    id: "events",
    num: "03",
    icon: Users,
    title: "Join Live Events",
    desc: "Attend workshops, open jams, and community sessions designed for your passion track.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    accent: "oklch(0.62 0.14 195)",
  },
  {
    id: "lead",
    num: "04",
    icon: Heart,
    title: "Grow & Lead",
    desc: "Step up as a Passion Lead or Anchor — own a track, mentor others, shape the movement.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    accent: "oklch(0.65 0.16 160)",
  },
  {
    id: "impact",
    num: "05",
    icon: Heart,
    title: "Create Impact",
    desc: "Watch your community grow, one weekend at a time.",
    img: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=400&q=80",
    accent: "oklch(0.62 0.20 38)",
  },
];

const VOLUNTEER_ROLES = [
  {
    id: "weekend-volunteer",
    icon: Heart,
    title: "Weekend Volunteer",
    tagline: "Show up. Contribute. Celebrate.",
    desc: "You come, you help, you connect. Perfect for those who want to be part of something real without a long-term commitment.",
    whatYouDo: [
      "Assist at live events and workshops",
      "Welcome new members on-ground",
      "Share your creative energy freely",
      "Zero pressure — pure participation",
    ],
    accent: "oklch(0.62 0.14 195)",
    img: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=300&q=80",
    badge: "Most Popular",
  },
  {
    id: "passion-lead",
    icon: Flame,
    title: "Passion Lead",
    tagline: "Own a track. Drive a city.",
    desc: "You lead a creative track in your city — organizing sessions, curating experiences, and growing a dedicated community.",
    whatYouDo: [
      "Lead a Dance / Music / Art / Fitness track",
      "Curate and host regular city sessions",
      "Identify and mentor emerging voices",
      "Coordinate with city Anchor",
    ],
    accent: "oklch(0.68 0.18 35)",
    img: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=300&q=80",
    badge: "High Impact",
  },
  {
    id: "anchor",
    icon: Anchor,
    title: "Anchor",
    tagline: "Build the chapter. Own the city.",
    desc: "The Anchor is the backbone of a JAZBAA city chapter. You build the team, set the vision, and make JAZBAA real in your city.",
    whatYouDo: [
      "Lead all Passion Leads in your city",
      "Partner with venues and local brands",
      "Shape the city-wide culture and strategy",
      "Represent JAZBAA to the national team",
    ],
    accent: "oklch(0.52 0.22 270)",
    img: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=300&q=80",
    badge: "Leadership",
  },
];

const PASSIONS = [
  "Dance",
  "Music",
  "Visual Art",
  "Drawing & Painting",
  "Photography",
  "Sports & Fitness",
  "Theatre & Drama",
  "Writing & Poetry",
  "Tech & Innovation",
  "Culinary Arts",
];

// ─────────────────────────────────────────────
// HowItWorks Step Card
// ─────────────────────────────────────────────

function StepCard({
  step,
  index,
}: {
  step: (typeof HOW_IT_WORKS)[0];
  index: number;
}) {
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      data-ocid={`step-item-${step.id}`}
      className={`step-item flex flex-col md:flex-row gap-8 items-center ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      {/* Image block */}
      <div className="relative w-full md:w-1/2 flex-shrink-0">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ aspectRatio: "4/3" }}
        >
          <img
            src={step.img}
            alt={step.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${step.accent}cc 0%, transparent 55%)`,
            }}
          />
          <div className="absolute top-4 left-4">
            <span
              className="font-display font-bold text-white/90 leading-none"
              style={{ fontSize: "4rem", lineHeight: 1 }}
            >
              {step.num}
            </span>
          </div>
        </div>
      </div>

      {/* Content block */}
      <div className="w-full md:w-1/2">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5"
          style={{
            background: `${step.accent}18`,
            border: `1px solid ${step.accent}30`,
          }}
        >
          <Icon size={22} style={{ color: step.accent }} strokeWidth={1.8} />
        </div>
        <h3
          className="font-display font-bold text-foreground mb-3 leading-tight"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}
        >
          {step.title}
        </h3>
        <p
          className="font-body text-base leading-relaxed"
          style={{ color: "oklch(0.42 0.012 260)" }}
        >
          {step.desc}
        </p>
        <div
          className="mt-5 h-0.5 w-12 rounded-full"
          style={{ background: step.accent }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Volunteer Role Card
// ─────────────────────────────────────────────

function RoleCard({
  role,
  onApply,
}: {
  role: (typeof VOLUNTEER_ROLES)[0];
  onApply: (roleId: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(cardRef);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave as EventListener);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave as EventListener);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const Icon = role.icon;

  return (
    <div
      ref={cardRef}
      data-ocid={`role-card-${role.id}`}
      className="gsap-scale perspective-1000"
    >
      <div
        className="relative rounded-2xl border border-border bg-card overflow-hidden h-full transition-all duration-500 will-change-transform"
        style={{
          boxShadow: expanded
            ? `0 20px 60px -10px ${role.accent}22`
            : "0 2px 16px -4px oklch(0.12 0.018 260 / 0.08)",
        }}
      >
        {/* Hero image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={role.img}
            alt={role.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.08 0.02 260 / 0.85) 0%, transparent 55%)",
            }}
          />
          <div className="absolute top-3 right-3">
            <span
              className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{
                background: `${role.accent}22`,
                color: role.accent,
                border: `1px solid ${role.accent}44`,
              }}
            >
              {role.badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `${role.accent}33`,
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon size={16} style={{ color: "#fff" }} strokeWidth={1.8} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div
            className="h-0.5 w-6 mb-4 rounded-full"
            style={{ background: role.accent }}
          />
          <p className="section-label mb-1.5" style={{ color: role.accent }}>
            {role.tagline}
          </p>
          <h3 className="font-display text-xl text-foreground mb-3 leading-tight font-bold">
            {role.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.42 0.012 260)" }}
          >
            {role.desc}
          </p>

          <button
            type="button"
            className="mt-4 flex items-center gap-1 text-xs font-mono tracking-wider uppercase transition-colors duration-200"
            style={{ color: role.accent }}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            data-ocid={`role-expand-${role.id}`}
          >
            {expanded ? "Less" : "What you do"}
            <ChevronDown
              size={13}
              className="transition-transform duration-300"
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: expanded ? "200px" : "0px",
              opacity: expanded ? 1 : 0,
            }}
          >
            <ul className="mt-3 space-y-2">
              {role.whatYouDo.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: "oklch(0.4 0.012 260)" }}
                >
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: role.accent }}
                  />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="mt-5 w-full py-2.5 rounded-xl text-sm font-display font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: `${role.accent}12`,
              color: role.accent,
              border: `1px solid ${role.accent}30`,
            }}
            onClick={() => onApply(role.id)}
            data-ocid={`role-apply-${role.id}`}
          >
            Apply as {role.title}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

export default function Join() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const { handleMouseMove: magMove, handleMouseLeave: magLeave } =
    useMagnetic(submitRef);

  useEffect(() => {
    const el = submitRef.current;
    if (!el) return;
    el.addEventListener("mousemove", magMove as EventListener);
    el.addEventListener("mouseleave", magLeave as EventListener);
    return () => {
      el.removeEventListener("mousemove", magMove as EventListener);
      el.removeEventListener("mouseleave", magLeave as EventListener);
    };
  }, [magMove, magLeave]);

  useScrollReveal(rolesRef, ".gsap-scale", { stagger: 0.07, y: 30 });
  useScrollReveal(ctaRef, ".gsap-reveal", { stagger: 0.12, y: 40 });

  useGSAP(
    () => {
      if (!stepsRef.current) return;
      gsap.fromTo(
        stepsRef.current.querySelectorAll(".step-item"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    },
    { scope: stepsRef, dependencies: [] },
  );

  useGSAP(
    () => {
      if (!heroRef.current) return;
      const chars = heroRef.current.querySelectorAll(".hero-char");
      if (!chars.length) return;
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.025,
          ease: "power4.out",
          delay: 0.3,
        },
      );
      gsap.fromTo(
        ".join-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.9 },
      );
    },
    { scope: heroRef, dependencies: [] },
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    passion: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    passion: false,
  });

  const handleApplyRole = (roleId: string) => {
    setForm((f) => ({ ...f, role: roleId }));
    document
      .getElementById("cta-form-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !form.name.trim(),
      email: !form.email.trim(),
      passion: !form.passion,
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.passion) return;
    setSubmitted(true);
    if (ctaRef.current) {
      gsap.to(ctaRef.current.querySelector(".cta-form"), {
        y: -10,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          const successEl = ctaRef.current?.querySelector(".cta-success");
          if (!successEl) return;
          gsap.fromTo(
            successEl,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
          );
        },
      });
    }
  };

  const heroWords = [
    {
      word: "Join the",
      chars: Array.from("Join the").map((c, n) => ({ id: `jt-${n}`, char: c })),
    },
    {
      word: "Movement",
      chars: Array.from("Movement").map((c, n) => ({ id: `mv-${n}`, char: c })),
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-end pb-20 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,6,20,0.90) 0%, rgba(8,6,20,0.5) 55%, rgba(8,6,20,0.28) 100%)",
            }}
          />
        </div>

        <div className="jazbaa-container relative z-10 pt-48">
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-2 section-label"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <Sparkles size={11} />
              Be part of something real
            </span>
          </div>

          <div className="overflow-hidden mb-6">
            {heroWords.map(({ word, chars }) => (
              <div key={word} className="overflow-hidden block">
                <span
                  className="inline-block font-display leading-none text-white"
                  style={{
                    fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {chars.map(({ id, char }) => (
                    <span
                      key={id}
                      className="hero-char inline-block"
                      style={{
                        display: char === " " ? "inline" : "inline-block",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <div className="overflow-hidden block">
              <span
                className="hero-char inline-block font-display leading-none"
                style={{
                  fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
                  letterSpacing: "-0.03em",
                  color: "oklch(0.82 0.16 75)",
                }}
              >
                with JAZBAA
              </span>
            </div>
          </div>

          <p
            className="join-hero-sub max-w-xl text-base md:text-lg leading-relaxed text-white/65 mb-10"
            style={{ opacity: 0 }}
          >
            Join as a Weekend Volunteer, lead a Passion Track, or anchor an
            entire city chapter.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              data-ocid="hero-cta-join"
              className="rounded-full px-8 py-4 font-display text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: "oklch(0.82 0.16 75)", color: "#1a1a2e" }}
              onClick={() =>
                document
                  .getElementById("cta-form-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Involved
            </button>
            <button
              type="button"
              data-ocid="hero-cta-roles"
              className="rounded-full px-8 py-4 font-display text-sm font-semibold tracking-wide border border-white/25 text-white hover:bg-white/10 transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("roles-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See Roles
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — Visual alternating layout ── */}
      <section
        ref={stepsRef}
        id="how-it-works"
        className="relative py-32 overflow-hidden bg-background"
        style={{ borderTop: "1px solid oklch(0.91 0.008 260)" }}
      >
        <div className="jazbaa-container">
          <div className="text-center mb-20">
            <p className="section-label mb-4">The Journey</p>
            <h2
              className="font-display font-bold text-foreground"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              How It <span className="text-gradient">Works</span>
            </h2>
            <p
              className="mt-4 max-w-md mx-auto text-base leading-relaxed"
              style={{ color: "oklch(0.45 0.012 260)" }}
            >
              From first step to city leader — every path starts here.
            </p>
          </div>

          <div className="flex flex-col gap-20">
            {HOW_IT_WORKS.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER ROLES ── */}
      <section
        ref={rolesRef}
        id="roles-section"
        className="relative py-32 overflow-hidden"
        style={{
          background: "oklch(0.975 0.004 260)",
          borderTop: "1px solid oklch(0.91 0.008 260)",
        }}
      >
        <div className="jazbaa-container">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Three Ways to Join</p>
            <h2
              className="font-display font-bold text-foreground"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Find Your <span className="text-gradient-warm">Role</span>
            </h2>
            <p
              className="mt-4 max-w-md mx-auto text-base leading-relaxed"
              style={{ color: "oklch(0.42 0.012 260)" }}
            >
              No job titles. No hierarchies. Three ways to contribute — from
              weekend warrior to city anchor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {VOLUNTEER_ROLES.map((role) => (
              <RoleCard key={role.id} role={role} onApply={handleApplyRole} />
            ))}
          </div>

          {/* Comparison table */}
          <div
            className="mt-16 rounded-2xl border border-border bg-card p-8 overflow-x-auto"
            style={{
              boxShadow: "0 2px 16px oklch(0.12 0.018 260 / 0.06)",
            }}
          >
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 pr-8 text-left font-mono text-xs tracking-wider uppercase text-muted-foreground">
                    Commitment
                  </th>
                  {VOLUNTEER_ROLES.map((r) => (
                    <th
                      key={r.id}
                      className="pb-4 px-4 text-center font-display font-bold text-foreground"
                    >
                      {r.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Time/week", "2–4 hrs", "5–8 hrs", "10+ hrs"],
                  ["City events", "Attend", "Host", "Own all"],
                  ["Mentorship", "—", "Yes", "Yes + train"],
                  ["City strategy", "—", "—", "Full ownership"],
                ].map(([label, ...vals]) => (
                  <tr
                    key={label}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-3.5 pr-8 font-body text-muted-foreground">
                      {label}
                    </td>
                    {vals.map((v) => (
                      <td
                        key={`${label}-${v}`}
                        className="py-3.5 px-4 text-center font-body text-foreground"
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA FORM ── */}
      <section
        ref={ctaRef}
        id="cta-form-section"
        className="relative py-32 overflow-hidden bg-background"
        style={{ borderTop: "1px solid oklch(0.91 0.008 260)" }}
      >
        <div className="jazbaa-container relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="gsap-reveal section-label mb-4">
              Take the first step
            </p>
            <h2
              className="gsap-reveal font-display font-bold text-foreground"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Apply to <span className="text-gradient">Join</span>
            </h2>
            <p
              className="gsap-reveal mt-4 text-base leading-relaxed"
              style={{ color: "oklch(0.42 0.012 260)" }}
            >
              Tell us about yourself and we'll connect you with your community.
            </p>
          </div>

          <div className="gsap-reveal relative">
            {submitted && (
              <div
                className="cta-success absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-10 bg-background"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "oklch(0.12 0.018 260)" }}
                >
                  <ArrowRight size={24} className="text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Application Received!
                </h3>
                <p
                  className="text-sm text-center max-w-xs leading-relaxed"
                  style={{ color: "oklch(0.42 0.012 260)" }}
                >
                  We'll be in touch within 48 hours to connect you with your
                  chapter.
                </p>
              </div>
            )}

            <form
              className="cta-form rounded-2xl p-8 md:p-10 border border-border bg-card"
              style={{
                boxShadow: "0 4px 24px -4px oklch(0.12 0.018 260 / 0.08)",
              }}
              onSubmit={handleSubmit}
              data-ocid="join-form"
              noValidate
            >
              {/* Role pills */}
              <div className="mb-6">
                <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-3">
                  Joining as
                </p>
                <div className="flex flex-wrap gap-2">
                  {VOLUNTEER_ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className="px-4 py-2 rounded-full text-xs font-display font-semibold tracking-wide transition-all duration-200"
                      style={{
                        background:
                          form.role === r.id
                            ? r.accent
                            : "oklch(0.96 0.004 260)",
                        color:
                          form.role === r.id
                            ? "#ffffff"
                            : "oklch(0.45 0.012 260)",
                        border: `1px solid ${form.role === r.id ? r.accent : "oklch(0.88 0.008 260)"}`,
                      }}
                      onClick={() => setForm((f) => ({ ...f, role: r.id }))}
                      data-ocid={`join-role-pill-${r.id}`}
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="join-name"
                    className="text-xs font-mono tracking-wider uppercase text-muted-foreground"
                  >
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="join-name"
                    data-ocid="join-input-name"
                    type="text"
                    placeholder="Aanya Sharma"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all duration-200 bg-background text-foreground placeholder:text-muted-foreground"
                    style={{
                      borderColor: errors.name
                        ? "oklch(0.55 0.22 25)"
                        : "oklch(0.88 0.008 260)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "oklch(0.52 0.22 270)";
                      e.target.style.boxShadow =
                        "0 0 0 3px oklch(0.52 0.22 270 / 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.88 0.008 260)";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                  {errors.name && (
                    <span
                      className="text-xs text-destructive"
                      data-ocid="join.field_error"
                    >
                      Name is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="join-email"
                    className="text-xs font-mono tracking-wider uppercase text-muted-foreground"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="join-email"
                    data-ocid="join-input-email"
                    type="email"
                    placeholder="aanya@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all duration-200 bg-background text-foreground placeholder:text-muted-foreground"
                    style={{
                      borderColor: errors.email
                        ? "oklch(0.55 0.22 25)"
                        : "oklch(0.88 0.008 260)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "oklch(0.52 0.22 270)";
                      e.target.style.boxShadow =
                        "0 0 0 3px oklch(0.52 0.22 270 / 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.88 0.008 260)";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                  {errors.email && (
                    <span
                      className="text-xs text-destructive"
                      data-ocid="join.field_error"
                    >
                      Email is required
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-5">
                <label
                  htmlFor="join-city"
                  className="text-xs font-mono tracking-wider uppercase text-muted-foreground"
                >
                  Your City
                </label>
                <input
                  id="join-city"
                  data-ocid="join-input-city"
                  type="text"
                  placeholder="Mumbai, Delhi, Bangalore…"
                  value={form.city}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, city: e.target.value }))
                  }
                  className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all duration-200 bg-background text-foreground placeholder:text-muted-foreground"
                  style={{ borderColor: "oklch(0.88 0.008 260)" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.52 0.22 270)";
                    e.target.style.boxShadow =
                      "0 0 0 3px oklch(0.52 0.22 270 / 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(0.88 0.008 260)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <label
                  htmlFor="join-passion"
                  className="text-xs font-mono tracking-wider uppercase text-muted-foreground"
                >
                  Your Passion <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    id="join-passion"
                    data-ocid="join-select-passion"
                    value={form.passion}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, passion: e.target.value }))
                    }
                    className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all duration-200 bg-background text-foreground appearance-none cursor-pointer"
                    style={{
                      borderColor: errors.passion
                        ? "oklch(0.55 0.22 25)"
                        : "oklch(0.88 0.008 260)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "oklch(0.52 0.22 270)";
                      e.target.style.boxShadow =
                        "0 0 0 3px oklch(0.52 0.22 270 / 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.88 0.008 260)";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  >
                    <option value="" disabled>
                      Select what excites you most…
                    </option>
                    {PASSIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                  />
                </div>
                {errors.passion && (
                  <span
                    className="text-xs text-destructive"
                    data-ocid="join.field_error"
                  >
                    Please choose your passion
                  </span>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  ref={submitRef}
                  data-ocid="join-submit"
                  type="submit"
                  className="rounded-full px-10 py-4 font-display text-sm font-semibold tracking-wide text-white inline-flex items-center gap-2 will-change-transform transition-all duration-300 hover:scale-105"
                  style={{ background: "oklch(0.12 0.018 260)" }}
                >
                  <span>Apply to Join</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
