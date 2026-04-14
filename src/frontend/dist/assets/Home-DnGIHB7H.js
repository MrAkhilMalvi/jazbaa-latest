import { r as reactExports, S as ScrollTrigger, j as jsxRuntimeExports, u as useGSAP, a as useScrollReveal, g as gsapWithCSS, b as useMagnetic, c as useTiltEffect } from "./index-B0jcs39S.js";
import { u as useEmblaCarousel } from "./embla-carousel-react.esm-BaRApnEA.js";
const PASSIONS = [
  {
    title: "Dance",
    tagline: "Move with freedom",
    members: "2.4k members",
    image: "https://images.unsplash.com/photo-1606788075761-4f1b81e1e32e?w=600&q=80",
    accent: "oklch(0.52 0.22 270)"
  },
  {
    title: "Music",
    tagline: "Find your frequency",
    members: "1.8k members",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80",
    accent: "oklch(0.48 0.24 285)"
  },
  {
    title: "Drawing",
    tagline: "Lines that tell stories",
    members: "1.2k members",
    image: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=600&q=80",
    accent: "oklch(0.70 0.16 55)"
  },
  {
    title: "Painting",
    tagline: "Color your world",
    members: "980 members",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
    accent: "oklch(0.68 0.18 35)"
  },
  {
    title: "Photography",
    tagline: "Capture the moment",
    members: "3.1k members",
    image: "https://images.unsplash.com/photo-1559181567-c3190bab3a7c?w=600&q=80",
    accent: "oklch(0.62 0.14 195)"
  },
  {
    title: "Fitness",
    tagline: "Build strength, build you",
    members: "4.2k members",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600&q=80",
    accent: "oklch(0.65 0.16 160)"
  },
  {
    title: "Tech",
    tagline: "Build what's next",
    members: "2.9k members",
    image: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600&q=80",
    accent: "oklch(0.55 0.18 240)"
  },
  {
    title: "Cooking",
    tagline: "Art you can taste",
    members: "1.6k members",
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=600&q=80",
    accent: "oklch(0.72 0.16 45)"
  }
];
const TESTIMONIALS = [
  {
    name: "Aisha Patel",
    city: "Mumbai",
    category: "Dance",
    quote: "JAZBAA changed how I think about dance. I found my people — the energy, the real friendships. Nothing else comes close.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80"
  },
  {
    name: "Rahul Verma",
    city: "Bangalore",
    category: "Music",
    quote: "Met incredible musicians I never would have found otherwise. Joining JAZBAA was the best decision I made this year.",
    avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&q=80"
  },
  {
    name: "Sara Khan",
    city: "Delhi",
    category: "Photography",
    quote: "Weekly meetups keep me inspired and growing. The feedback from this community is honest, warm, and incredibly valuable.",
    avatar: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=100&q=80"
  },
  {
    name: "Dev Mehta",
    city: "Pune",
    category: "Fitness",
    quote: "The accountability here is unmatched. I've hit goals I never thought possible — it's not just a group, it's a movement.",
    avatar: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=100&q=80"
  }
];
const BENEFITS = [
  {
    num: "01",
    title: "Find Your Tribe",
    desc: "Real friendships built around real passions."
  },
  {
    num: "02",
    title: "Learn & Grow",
    desc: "Expert workshops and peer feedback that sharpens your craft."
  },
  {
    num: "03",
    title: "Real Events",
    desc: "Meetups and experiences that happen IRL — not just online."
  },
  {
    num: "04",
    title: "Make an Impact",
    desc: "Showcase your work and leave a mark on your community."
  }
];
function CharReveal({ text, className }) {
  const chars = text.split("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, "aria-label": text, children: chars.map((ch, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "char-reveal inline-block",
      style: { display: ch === " " ? "inline" : "inline-block" },
      "aria-hidden": "true",
      children: ch === " " ? " " : ch
    },
    `char-${i}-${ch}`
  )) });
}
function MagneticButton({
  children,
  className,
  href,
  onClick,
  ...rest
}) {
  const ref = reactExports.useRef(null);
  const { handleMouseMove, handleMouseLeave } = useMagnetic(
    ref,
    0.35
  );
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      ref,
      href: href || "#",
      onClick,
      className: `inline-block will-change-transform ${className || ""}`,
      ...rest,
      children
    }
  );
}
function ImagePassionCard({
  card,
  index
}) {
  const ref = reactExports.useRef(null);
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(
    ref
  );
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      "data-ocid": `passion-card-${card.title.toLowerCase().replace(/[^a-z]/g, "-")}`,
      className: "passion-card relative overflow-hidden rounded-2xl cursor-pointer group will-change-transform",
      style: { aspectRatio: "3/4" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: card.image,
            alt: card.title,
            className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
            loading: index < 4 ? "eager" : "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(to top, oklch(0.08 0.02 260 / 0.92) 0%, oklch(0.08 0.02 260 / 0.30) 50%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 h-0.5 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left",
            style: { background: card.accent }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-white text-xl font-700 mb-1 leading-none", children: card.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm font-body mb-3", children: card.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-1.5 h-1.5 rounded-full",
                style: { background: card.accent }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 text-xs font-mono", children: card.members })
          ] })
        ] })
      ]
    }
  );
}
function HeroSection() {
  const sectionRef = reactExports.useRef(null);
  const headlineRef = reactExports.useRef(null);
  const subRef = reactExports.useRef(null);
  const ctaRef = reactExports.useRef(null);
  const badgeRef = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(null);
  const decorRef = reactExports.useRef(null);
  useGSAP(
    () => {
      var _a;
      const chars = (_a = headlineRef.current) == null ? void 0 : _a.querySelectorAll(".char-reveal");
      if (!(chars == null ? void 0 : chars.length)) return;
      gsapWithCSS.fromTo(
        chars,
        { opacity: 0, y: 70, rotateX: -50 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.035,
          duration: 1,
          ease: "power4.out",
          delay: 0.2
        }
      );
      if (badgeRef.current) {
        gsapWithCSS.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 }
        );
      }
      if (subRef.current) {
        gsapWithCSS.fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 1.1 }
        );
      }
      if (ctaRef.current) {
        gsapWithCSS.fromTo(
          Array.from(ctaRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            delay: 1.4
          }
        );
      }
      if (scrollRef.current) {
        gsapWithCSS.fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", delay: 2 }
        );
      }
    },
    { scope: sectionRef }
  );
  reactExports.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
      if (headlineRef.current) {
        gsapWithCSS.to(headlineRef.current, {
          x: xRatio * 10,
          y: yRatio * 6,
          duration: 0.9,
          ease: "power2.out"
        });
      }
      if (decorRef.current) {
        gsapWithCSS.to(decorRef.current, {
          x: xRatio * -22,
          y: yRatio * -16,
          duration: 1.3,
          ease: "power2.out"
        });
      }
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: sectionRef,
      className: "relative min-h-screen flex items-center overflow-hidden bg-background",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/jazbaa-hero-bg.dim_1920x1080.jpg",
              alt: "",
              className: "w-full h-full object-cover",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: {
                background: "linear-gradient(160deg, oklch(0.06 0.02 260 / 0.85) 0%, oklch(0.08 0.03 270 / 0.75) 60%, oklch(0.05 0.02 260 / 0.90) 100%)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: decorRef,
            className: "absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none z-1",
            style: {
              background: "oklch(0.52 0.22 270 / 0.08)",
              filter: "blur(120px)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "jazbaa-container relative z-10 pt-32 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              ref: badgeRef,
              className: "inline-flex items-center gap-2 text-xs font-mono tracking-[0.22em] uppercase text-white/50 mb-10",
              style: { opacity: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block w-4 h-px",
                    style: { background: "var(--jazbaa-coral)" }
                  }
                ),
                "Creative Community Platform"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h1",
            {
              ref: headlineRef,
              className: "font-display leading-[1.0] tracking-[-0.03em] text-white mb-8 will-change-transform",
              style: { fontSize: "clamp(3.8rem,9vw,8rem)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block overflow-hidden pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CharReveal, { text: "Unleash Your" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block overflow-hidden pb-2",
                    style: { color: "var(--jazbaa-coral)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CharReveal, { text: "JAZBAA" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              ref: subRef,
              className: "font-body text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12",
              style: { opacity: 0 },
              children: [
                "Passion meets community — dance, draw, create, grow.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
                "Find your tribe. Live your art."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: ctaRef,
              className: "flex flex-wrap gap-4 items-center",
              style: { opacity: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MagneticButton,
                  {
                    href: "/join",
                    className: "rounded-full px-8 py-4 font-display text-sm font-600 tracking-wide text-white inline-block transition-all duration-300 hover:scale-105",
                    style: { background: "var(--jazbaa-indigo)" },
                    "data-ocid": "hero-cta-explore",
                    children: "Explore Now"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MagneticButton,
                  {
                    href: "/join",
                    className: "rounded-full px-8 py-4 font-display text-sm font-600 tracking-wide text-white/80 inline-block border transition-all duration-300 hover:text-white hover:border-white/40",
                    style: { borderColor: "oklch(1 0 0 / 0.20)" },
                    "data-ocid": "hero-cta-join",
                    children: "Join Free →"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: scrollRef,
              className: "mt-24 flex items-center gap-3",
              style: { opacity: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-px h-10",
                    style: {
                      background: "linear-gradient(to bottom, transparent, oklch(1 0 0 / 0.3))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/30 font-mono tracking-widest uppercase", children: "Scroll to explore" })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
function WhatIsJazbaaSection() {
  const sectionRef = reactExports.useRef(null);
  useScrollReveal(sectionRef, ".reveal-line", {
    y: 40,
    stagger: 0.14,
    start: "top 78%"
  });
  useScrollReveal(sectionRef, ".reveal-fade", {
    y: 20,
    stagger: 0.1,
    start: "top 75%"
  });
  const stats = [
    { value: "10,000+", label: "Members" },
    { value: "50+", label: "Cities" },
    { value: "8", label: "Passion Categories" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: sectionRef, className: "py-32 bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "jazbaa-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-16 xl:gap-24 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "section-label mb-8 reveal-fade",
          style: { opacity: 0 },
          children: "What is JAZBAA"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-10", children: [
        [
          "A community built",
          "for people who believe",
          "in the power of"
        ].map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "reveal-line font-display font-700 text-foreground leading-[1.1]",
            style: {
              fontSize: "clamp(2rem,3.8vw,3.2rem)",
              opacity: 0
            },
            children: line
          },
          line
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "reveal-line font-display font-700 leading-[1.1]",
            style: {
              fontSize: "clamp(2rem,3.8vw,3.2rem)",
              opacity: 0,
              color: "var(--jazbaa-indigo)"
            },
            children: "creative expression."
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "reveal-fade font-body text-lg text-muted-foreground leading-relaxed max-w-md mb-12",
          style: { opacity: 0 },
          children: "Find your tribe, sharpen your craft. JAZBAA connects creative souls across cities for real events and real growth."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "reveal-fade grid grid-cols-3 gap-6 pt-8 border-t border-border",
          style: { opacity: 0 },
          children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display font-800 text-foreground mb-1",
                style: { fontSize: "clamp(1.6rem,2.5vw,2.2rem)" },
                children: s.value
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono tracking-wider uppercase", children: s.label })
          ] }, s.label))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal-fade relative", style: { opacity: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative overflow-hidden rounded-2xl",
          style: { aspectRatio: "4/5" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
                alt: "JAZBAA community — people together",
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bottom-0 left-0 right-0 h-1/3",
                style: {
                  background: "linear-gradient(to top, oklch(0.985 0.004 80 / 0.6) 0%, transparent 100%)"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "absolute -bottom-5 -left-5 bg-card border border-border rounded-2xl px-5 py-4 shadow-sm",
          style: { boxShadow: "var(--shadow-card)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-700 text-foreground text-lg leading-none mb-1", children: "10,000+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono tracking-wider", children: "Active members" })
          ]
        }
      )
    ] })
  ] }) }) });
}
function ExplorePassionSection() {
  const sectionRef = reactExports.useRef(null);
  useGSAP(
    () => {
      var _a;
      const cards = (_a = sectionRef.current) == null ? void 0 : _a.querySelectorAll(".passion-card");
      if (!(cards == null ? void 0 : cards.length)) return;
      gsapWithCSS.fromTo(
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
            once: true
          }
        }
      );
    },
    { scope: sectionRef }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref: sectionRef,
      className: "py-32 overflow-hidden",
      style: { background: "oklch(0.975 0.004 260)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "jazbaa-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-16 flex-wrap gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label mb-4", children: "Your Journey Starts Here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h2",
              {
                className: "font-display font-800 text-foreground leading-[1.1]",
                style: { fontSize: "clamp(2.2rem,4.5vw,4rem)" },
                children: [
                  "Explore Your ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Passion" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground max-w-xs text-base leading-relaxed", children: "Eight worlds of creative energy. One community." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: PASSIONS.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePassionCard, { card, index: i }, card.title)) })
      ] })
    }
  );
}
function WhyJoinSection() {
  const sectionRef = reactExports.useRef(null);
  useScrollReveal(sectionRef, ".benefit-reveal", {
    y: 30,
    stagger: 0.12,
    start: "top 78%"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: sectionRef, className: "py-32 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "jazbaa-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "section-label mb-4 benefit-reveal",
          style: { opacity: 0 },
          children: "Why JAZBAA"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          className: "font-display font-800 text-foreground leading-[1.1] benefit-reveal",
          style: { fontSize: "clamp(2.2rem,4.5vw,4rem)", opacity: 0 },
          children: [
            "Built for ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-warm", children: "creators" }),
            ",",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "by creators."
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: BENEFITS.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `benefit-item-${i}`,
        className: "benefit-reveal grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 py-10 items-start",
        style: { opacity: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-display font-800 text-muted-foreground/30 leading-none select-none",
              style: { fontSize: "clamp(2.5rem,4vw,3.5rem)" },
              children: b.num
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-700 text-foreground text-2xl leading-tight", children: b.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-base leading-relaxed", children: b.desc })
        ]
      },
      b.num
    )) })
  ] }) });
}
function StoriesSection() {
  const sectionRef = reactExports.useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false
  });
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);
  useScrollReveal(sectionRef, ".stories-reveal", { y: 30, stagger: 0.1 });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: sectionRef,
      className: "py-32 overflow-hidden",
      style: { background: "oklch(0.975 0.004 260)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "jazbaa-container mb-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label mb-4 stories-reveal", style: { opacity: 0 }, children: "Community Stories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h2",
              {
                className: "font-display font-800 text-foreground leading-[1.1] stories-reveal",
                style: { fontSize: "clamp(2.2rem,4.5vw,4rem)", opacity: 0 },
                children: [
                  "Voices that ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "inspire." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 stories-reveal", style: { opacity: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => emblaApi == null ? void 0 : emblaApi.scrollPrev(),
                  "data-ocid": "stories-prev",
                  className: "w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-200 hover:border-foreground/30 hover:bg-muted",
                  "aria-label": "Previous testimonial",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      className: "w-4 h-4",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M15 18l-6-6 6-6",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => emblaApi == null ? void 0 : emblaApi.scrollNext(),
                  "data-ocid": "stories-next",
                  className: "w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-200 hover:border-foreground/30 hover:bg-muted",
                  "aria-label": "Next testimonial",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      className: "w-4 h-4",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M9 18l6-6-6-6",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  )
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-6 md:pl-12 lg:pl-20 xl:pl-[max(5rem,calc(50vw-700px))]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: emblaRef, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-5 stories-reveal", style: { opacity: 0 }, children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `testimonial-${i}`,
            className: "flex-none w-[min(380px,85vw)] rounded-2xl bg-card border border-border p-8 flex flex-col gap-6 transition-all duration-500",
            style: {
              boxShadow: i === activeIndex ? "var(--shadow-soft)" : "var(--shadow-card)",
              transform: i === activeIndex ? "scale(1.02)" : "scale(1)",
              opacity: i === activeIndex ? 1 : 0.55,
              filter: i === activeIndex ? "none" : "blur(0.3px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-display text-5xl leading-none font-800 select-none",
                  style: { color: "var(--jazbaa-indigo)", opacity: 0.25 },
                  "aria-hidden": "true",
                  children: '"'
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-foreground leading-relaxed text-base flex-1", children: t.quote }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: t.avatar,
                    alt: t.name,
                    className: "w-11 h-11 rounded-full object-cover shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-700 text-foreground text-sm leading-tight", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: [
                    t.category,
                    " · ",
                    t.city
                  ] })
                ] })
              ] })
            ]
          },
          t.name
        )) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "jazbaa-container mt-10 flex gap-2", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => emblaApi == null ? void 0 : emblaApi.scrollTo(i),
            className: "h-1 rounded-full transition-all duration-300",
            style: {
              width: i === activeIndex ? "2rem" : "0.5rem",
              background: i === activeIndex ? "var(--jazbaa-indigo)" : "oklch(0.52 0.22 270 / 0.2)"
            },
            "aria-label": `Go to testimonial ${i + 1}`
          },
          t.name
        )) })
      ]
    }
  );
}
function CtaSection() {
  const sectionRef = reactExports.useRef(null);
  useScrollReveal(sectionRef, ".cta-reveal", { y: 30, stagger: 0.12 });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: sectionRef,
      className: "py-36 relative overflow-hidden bg-background",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none",
            style: {
              background: "oklch(0.52 0.22 270 / 0.04)",
              filter: "blur(150px)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "jazbaa-container relative z-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label mb-6 cta-reveal", style: { opacity: 0 }, children: "Start Today" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h2",
            {
              className: "font-display font-800 leading-[1.05] text-foreground mb-6 cta-reveal",
              style: { fontSize: "clamp(2.5rem,5.5vw,5rem)", opacity: 0 },
              children: [
                "Ready to find your",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Passion?" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-lg text-muted-foreground max-w-lg mx-auto mb-12 cta-reveal",
              style: { opacity: 0 },
              children: "Join 10,000+ people across India. No commitment — just community."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-wrap gap-4 justify-center mb-20 cta-reveal",
              style: { opacity: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MagneticButton,
                  {
                    href: "/join",
                    className: "rounded-full px-9 py-4 font-display text-sm font-600 tracking-wide text-white inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    style: { background: "var(--jazbaa-indigo)" },
                    "data-ocid": "cta-get-started",
                    children: "Join the Community"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MagneticButton,
                  {
                    href: "/events",
                    className: "rounded-full px-9 py-4 font-display text-sm font-600 tracking-wide text-foreground inline-block border border-border transition-all duration-300 hover:bg-muted",
                    "data-ocid": "cta-explore-events",
                    children: "Explore Events"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-3 max-w-2xl mx-auto gap-8 pt-12 border-t border-border cta-reveal",
              style: { opacity: 0 },
              children: [
                { value: "10k+", label: "Active Members" },
                { value: "50+", label: "Cities" },
                { value: "8", label: "Passion Categories" }
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center",
                  "data-ocid": `stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display font-800 text-foreground leading-none mb-2",
                        style: { fontSize: "clamp(2rem,3.5vw,3rem)" },
                        children: s.value
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono tracking-wider uppercase", children: s.label })
                  ]
                },
                s.label
              ))
            }
          )
        ] })
      ]
    }
  );
}
function Home() {
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatIsJazbaaSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExplorePassionSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyJoinSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoriesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CtaSection, {})
  ] });
}
export {
  Home as default
};
