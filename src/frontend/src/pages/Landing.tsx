import { ScrollTrigger, gsap } from "@/hooks/useGSAP";
import { useGSAP } from "@gsap/react";
import { Link } from "@tanstack/react-router";
import { Clock, Frown, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── CharReveal (letter-by-letter) ──────────────────────────────────────────
function CharReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
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

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.5,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [target, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── SVG Checkmark with draw animation ──────────────────────────────────────
function AnimatedCheck({ delay = 0 }: { delay?: number }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const length = el.getTotalLength();
    gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 0.6,
          delay,
          ease: "power2.out",
        });
      },
    });
    return () => trigger.kill();
  }, [delay]);

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="10" fill="oklch(0.52 0.22 270 / 0.1)" />
      <path
        ref={pathRef}
        d="M6.5 11.5 L9.5 14.5 L15.5 8.5"
        stroke="oklch(0.52 0.22 270)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Morphing Orb SVG ─────────────────────────────────────────────────────
function MorphingOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    gsap.to(orb, {
      r: 78,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      gsap.killTweensOf(orb);
    };
  }, []);

  const categories = [
    { label: "Dance", angle: 0 },
    { label: "Music", angle: 45 },
    { label: "Art", angle: 90 },
    { label: "Fitness", angle: 135 },
    { label: "Tech", angle: 180 },
    { label: "Cooking", angle: 225 },
    { label: "Photography", angle: 270 },
    { label: "Writing", angle: 315 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: 320, height: 320 }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" aria-hidden="true">
        <defs>
          <radialGradient id="orb-gradient-main" cx="45%" cy="38%" r="60%">
            <stop offset="0%" stopColor="oklch(0.68 0.18 270)" />
            <stop offset="55%" stopColor="oklch(0.52 0.22 270)" />
            <stop offset="100%" stopColor="oklch(0.42 0.24 285)" />
          </radialGradient>
          <filter id="orb-glow-main">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="160"
          cy="160"
          r="130"
          fill="none"
          stroke="oklch(0.52 0.22 270 / 0.1)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        {categories.map(({ label, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 160 + 130 * Math.cos(rad);
          const y = 160 + 130 * Math.sin(rad);
          return (
            <g key={label}>
              <circle cx={x} cy={y} r="5" fill="oklch(0.52 0.22 270 / 0.4)" />
            </g>
          );
        })}
        <circle
          ref={orbRef}
          cx="160"
          cy="160"
          r="72"
          fill="url(#orb-gradient-main)"
          filter="url(#orb-glow-main)"
        />
        <circle
          cx="145"
          cy="140"
          r="22"
          fill="oklch(1 0 0 / 0.18)"
          style={{ pointerEvents: "none" }}
        />
      </svg>

      {categories.map(({ label, angle }) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 42 * Math.cos(rad);
        const y = 50 + 42 * Math.sin(rad);
        return (
          <span
            key={label}
            className="absolute text-[10px] font-mono tracking-wider uppercase"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              color: "oklch(0.52 0.22 270)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────
export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroHeadRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useGSAP(
    () => {
      const head = heroHeadRef.current;
      if (!head) return;

      const chars = head.querySelectorAll(".char-reveal");
      if (!chars.length) return;

      gsap.fromTo(
        chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.035,
          duration: 0.85,
          ease: "power4.out",
          delay: 0.4,
        },
      );

      gsap.fromTo(
        heroSubRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.1 },
      );

      gsap.fromTo(
        heroCTARef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 1.4 },
      );
    },
    { scope: heroRef, dependencies: [] },
  );

  useGSAP(
    () => {
      const lines = document.querySelectorAll(".problem-line");
      if (!lines.length) return;

      gsap.fromTo(
        lines,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.22,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: problemRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    },
    { scope: problemRef, dependencies: [] },
  );

  const benefits = [
    "Find your creative community in your city",
    "Expert-led workshops and hands-on sessions",
    "Real-world events — not just online content",
    "Learn at your own pace, your own way",
    "Zero gatekeeping — all levels are welcome",
    "Built by passion, for passion",
  ];

  const stats = [
    { value: 10000, suffix: "+", label: "Active Members" },
    { value: 50, suffix: "+", label: "Cities Reached" },
    { value: 100, suffix: "+", label: "Events / Year" },
    { value: 8, suffix: "", label: "Passion Categories" },
  ];

  const problemPoints = [
    {
      text: "You have a passion — but no one around you shares it.",
      icon: Frown,
    },
    {
      text: "You want to grow — but rigid classes feel suffocating.",
      icon: Clock,
    },
    {
      text: "You crave real community — not just another social feed.",
      icon: Users,
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-ocid="landing-hero"
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
                "linear-gradient(to bottom, rgba(8,6,20,0.72) 0%, rgba(8,6,20,0.55) 50%, rgba(8,6,20,0.78) 100%)",
            }}
          />
        </div>

        <div className="jazbaa-container relative z-10 text-center py-24">
          <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse inline-block" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/75">
              The Creative Community Platform
            </span>
          </div>

          <h1
            ref={heroHeadRef}
            className="font-display font-bold mb-6 leading-[0.95] tracking-tight overflow-hidden text-white"
            style={{
              fontSize: "clamp(3.2rem, 9vw, 8rem)",
              maxWidth: "900px",
              margin: "0 auto 1.5rem",
            }}
            data-ocid="landing-hero-heading"
          >
            <span className="block overflow-hidden">
              <CharReveal text="What Will You" />
            </span>
            <span
              className="block overflow-hidden"
              style={{ color: "oklch(0.82 0.16 75)" }}
            >
              <CharReveal text="Unleash?" />
            </span>
          </h1>

          <p
            ref={heroSubRef}
            className="font-body text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed text-white/75"
            style={{ maxWidth: "560px", margin: "0 auto 2.5rem", opacity: 0 }}
          >
            Where passion meets its people. Join creators across India.
          </p>

          <div
            ref={heroCTARef}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            style={{ opacity: 0 }}
          >
            <Link
              to="/join"
              className="rounded-full px-10 py-4 font-display text-sm font-semibold tracking-wide text-foreground inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: "oklch(0.82 0.16 75)", color: "#1a1a2e" }}
              data-ocid="landing-hero-cta-primary"
            >
              Join JAZBAA Free
            </Link>
            <Link
              to="/about"
              className="rounded-full px-10 py-4 font-display text-sm font-semibold tracking-wide inline-block border border-white/30 text-white hover:bg-white/10 transition-all duration-300"
              data-ocid="landing-hero-cta-secondary"
            >
              Learn more
            </Link>
          </div>

          <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Scroll
            </span>
            <div className="w-px h-12 bg-white/40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────── */}
      <section
        ref={problemRef}
        className="relative py-28 md:py-36"
        style={{ background: "oklch(0.975 0.004 260)" }}
        data-ocid="landing-problem"
      >
        <div className="jazbaa-container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-14">
              <p className="section-label mb-4">The Reality</p>
              <h2
                className="font-display font-bold tracking-tight"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  color: "oklch(0.12 0.018 260)",
                }}
              >
                Sound familiar?
              </h2>
            </div>

            <div className="space-y-10">
              {problemPoints.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="problem-line flex items-start gap-6"
                    style={{ opacity: 0 }}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "oklch(0.52 0.22 270 / 0.08)",
                        border: "1px solid oklch(0.52 0.22 270 / 0.15)",
                      }}
                      aria-hidden="true"
                    >
                      <Icon
                        size={20}
                        style={{ color: "oklch(0.52 0.22 270)" }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <span
                        className="block text-xs font-mono tracking-widest uppercase mb-2"
                        style={{ color: "oklch(0.52 0.22 270 / 0.7)" }}
                      >
                        0{i + 1}
                      </span>
                      <p
                        className="font-body text-xl md:text-2xl leading-relaxed"
                        style={{ color: "oklch(0.18 0.018 260)" }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-16 h-px w-full"
              style={{ background: "oklch(0.88 0.008 260)" }}
            />
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────── */}
      <section
        className="relative py-28 md:py-40"
        style={{ background: "oklch(1 0 0)" }}
        data-ocid="landing-solution"
      >
        <div className="jazbaa-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-5">The Answer</p>
              <h2
                className="font-display font-bold tracking-tight mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  color: "oklch(0.12 0.018 260)",
                }}
              >
                Enter <span className="text-gradient">JAZBAA.</span>
              </h2>
              <p
                className="font-body text-lg md:text-xl leading-relaxed mb-8"
                style={{ color: "oklch(0.38 0.014 260)" }}
              >
                A living platform where your passion finds its people. Real
                community — built on shared curiosity and the drive to grow
                together.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Dance",
                  "Music",
                  "Art",
                  "Tech",
                  "Photography",
                  "Cooking",
                  "Fitness",
                  "Writing",
                ].map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-2 rounded-full text-sm font-body font-medium border"
                    style={{
                      borderColor: "oklch(0.52 0.22 270 / 0.2)",
                      color: "oklch(0.52 0.22 270)",
                      background: "oklch(0.52 0.22 270 / 0.05)",
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <MorphingOrb />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS / SOCIAL PROOF ─────────────────────────────────── */}
      <section
        className="relative py-24 md:py-32"
        style={{
          background: "oklch(0.975 0.004 260)",
          borderTop: "1px solid oklch(0.91 0.008 260)",
        }}
        data-ocid="landing-stats"
      >
        <div className="jazbaa-container">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Our Community</p>
            <h2
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "oklch(0.12 0.018 260)",
              }}
            >
              Real people. Real impact.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-border border border-border rounded-2xl overflow-hidden bg-card">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-10 px-6"
                data-ocid={`landing-stat-${stat.label.toLowerCase().replace(/ /g, "-")}`}
              >
                <p
                  className="font-display font-bold leading-none tracking-tighter text-gradient"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                  aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p
                  className="mt-2 font-body text-sm font-medium text-center"
                  style={{ color: "oklch(0.45 0.014 260)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section
        className="relative py-28 md:py-40"
        style={{ background: "oklch(1 0 0)" }}
        data-ocid="landing-benefits"
      >
        <div className="jazbaa-container">
          <div className="max-w-xl mb-16">
            <p className="section-label mb-3">Everything you need</p>
            <h2
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                color: "oklch(0.12 0.018 260)",
              }}
            >
              What you get
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {benefits.map((benefit, index) => (
              <BenefitRow key={benefit} text={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section
        className="relative py-28 md:py-40 overflow-hidden"
        style={{ background: "oklch(0.975 0.004 260)" }}
        data-ocid="landing-final-cta"
      >
        <div className="jazbaa-container">
          <div
            className="max-w-2xl mx-auto text-center rounded-3xl p-12 md:p-16 border border-border bg-card"
            style={{ boxShadow: "0 8px 40px -8px oklch(0.12 0.018 260 / 0.1)" }}
          >
            <p className="section-label mb-4">Don't wait</p>
            <h2
              className="font-display font-bold tracking-tight mb-4"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                color: "oklch(0.12 0.018 260)",
              }}
            >
              Your community
              <br />
              <span className="text-gradient">is waiting.</span>
            </h2>
            <p
              className="font-body text-lg mb-10 leading-relaxed"
              style={{ color: "oklch(0.42 0.014 260)" }}
            >
              Free forever. No gatekeeping. Just passion.
            </p>

            {emailSubmitted ? (
              <div className="py-6">
                <p
                  className="font-display text-xl font-semibold mb-2"
                  style={{ color: "oklch(0.52 0.22 270)" }}
                >
                  ✓ You're on the list!
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll be in touch soon.
                </p>
              </div>
            ) : (
              <div
                className="flex flex-col sm:flex-row gap-3 mb-8 max-w-sm mx-auto"
                data-ocid="landing-email-form"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-full border font-body text-sm outline-none transition-all duration-200"
                  style={{
                    borderColor: "oklch(0.88 0.008 260)",
                    background: "oklch(0.985 0.004 80)",
                    color: "oklch(0.12 0.018 260)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.52 0.22 270)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(0.88 0.008 260)";
                  }}
                  aria-label="Email address"
                  data-ocid="landing-email-input"
                />
                <button
                  type="button"
                  className="btn-primary whitespace-nowrap"
                  data-ocid="landing-email-submit"
                  onClick={() => {
                    if (email && email.indexOf("@") > 0)
                      setEmailSubmitted(true);
                  }}
                >
                  Join Free
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
              <Link
                to="/join"
                className="btn-primary inline-block"
                data-ocid="landing-cta-join"
              >
                Join JAZBAA Free
              </Link>
              <Link
                to="/about"
                className="btn-ghost-border inline-block text-foreground"
                data-ocid="landing-cta-about"
              >
                See how it works
              </Link>
            </div>

            <p className="mt-8 text-xs font-mono text-muted-foreground">
              No credit card. No catch. Cancel anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Benefit Row ──────────────────────────────────────────────────────────
function BenefitRow({ text, index }: { text: string; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, x: -30 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: (index % 2) * 0.1,
          ease: "power3.out",
        });
      },
    });
    return () => trigger.kill();
  }, [index]);

  return (
    <div
      ref={rowRef}
      className="flex items-start gap-4 py-5 border-b border-border last:border-0"
      style={{ opacity: 0 }}
      data-ocid={`landing-benefit-${index}`}
    >
      <AnimatedCheck delay={index * 0.12} />
      <p
        className="font-body text-base md:text-lg"
        style={{ color: "oklch(0.22 0.018 260)" }}
      >
        {text}
      </p>
    </div>
  );
}
