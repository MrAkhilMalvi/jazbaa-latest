import { d as createLucideIcon, r as reactExports, u as useGSAP, j as jsxRuntimeExports, L as Link, g as gsapWithCSS, S as ScrollTrigger } from "./index-B0jcs39S.js";
import { U as Users } from "./users-J76qWlBG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2", key: "epbg0q" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
];
const Frown = createLucideIcon("frown", __iconNode);
function CharReveal({ text, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, "aria-label": text, children: text.split("").map((ch, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.5
}) {
  const ref = reactExports.useRef(null);
  const triggered = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsapWithCSS.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
    return () => trigger.kill();
  }, [target, suffix, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    "0",
    suffix
  ] });
}
function AnimatedCheck({ delay = 0 }) {
  const pathRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const length = el.getTotalLength();
    gsapWithCSS.set(el, { strokeDasharray: length, strokeDashoffset: length });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        gsapWithCSS.to(el, {
          strokeDashoffset: 0,
          duration: 0.6,
          delay,
          ease: "power2.out"
        });
      }
    });
    return () => trigger.kill();
  }, [delay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 22 22",
      fill: "none",
      className: "flex-shrink-0 mt-0.5",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "11", cy: "11", r: "10", fill: "oklch(0.52 0.22 270 / 0.1)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            ref: pathRef,
            d: "M6.5 11.5 L9.5 14.5 L15.5 8.5",
            stroke: "oklch(0.52 0.22 270)",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function MorphingOrb() {
  const containerRef = reactExports.useRef(null);
  const orbRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    gsapWithCSS.to(orb, {
      r: 78,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    return () => {
      gsapWithCSS.killTweensOf(orb);
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
    { label: "Writing", angle: 315 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative flex items-center justify-center",
      style: { width: 320, height: 320 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "320", height: "320", viewBox: "0 0 320 320", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "orb-gradient-main", cx: "45%", cy: "38%", r: "60%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.68 0.18 270)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "55%", stopColor: "oklch(0.52 0.22 270)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.42 0.24 285)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "orb-glow-main", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "10", result: "blur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "160",
              cy: "160",
              r: "130",
              fill: "none",
              stroke: "oklch(0.52 0.22 270 / 0.1)",
              strokeWidth: "1",
              strokeDasharray: "4 8"
            }
          ),
          categories.map(({ label, angle }) => {
            const rad = angle * Math.PI / 180;
            const x = 160 + 130 * Math.cos(rad);
            const y = 160 + 130 * Math.sin(rad);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("g", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: x, cy: y, r: "5", fill: "oklch(0.52 0.22 270 / 0.4)" }) }, label);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              ref: orbRef,
              cx: "160",
              cy: "160",
              r: "72",
              fill: "url(#orb-gradient-main)",
              filter: "url(#orb-glow-main)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "145",
              cy: "140",
              r: "22",
              fill: "oklch(1 0 0 / 0.18)",
              style: { pointerEvents: "none" }
            }
          )
        ] }),
        categories.map(({ label, angle }) => {
          const rad = angle * Math.PI / 180;
          const x = 50 + 42 * Math.cos(rad);
          const y = 50 + 42 * Math.sin(rad);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute text-[10px] font-mono tracking-wider uppercase",
              style: {
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                color: "oklch(0.52 0.22 270)",
                whiteSpace: "nowrap"
              },
              children: label
            },
            label
          );
        })
      ]
    }
  );
}
function Landing() {
  const heroRef = reactExports.useRef(null);
  const heroHeadRef = reactExports.useRef(null);
  const heroSubRef = reactExports.useRef(null);
  const heroCTARef = reactExports.useRef(null);
  const problemRef = reactExports.useRef(null);
  const [email, setEmail] = reactExports.useState("");
  const [emailSubmitted, setEmailSubmitted] = reactExports.useState(false);
  useGSAP(
    () => {
      const head = heroHeadRef.current;
      if (!head) return;
      const chars = head.querySelectorAll(".char-reveal");
      if (!chars.length) return;
      gsapWithCSS.fromTo(
        chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.035,
          duration: 0.85,
          ease: "power4.out",
          delay: 0.4
        }
      );
      gsapWithCSS.fromTo(
        heroSubRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.1 }
      );
      gsapWithCSS.fromTo(
        heroCTARef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 1.4 }
      );
    },
    { scope: heroRef, dependencies: [] }
  );
  useGSAP(
    () => {
      const lines = document.querySelectorAll(".problem-line");
      if (!lines.length) return;
      gsapWithCSS.fromTo(
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
            once: true
          }
        }
      );
    },
    { scope: problemRef, dependencies: [] }
  );
  const benefits = [
    "Find your creative community in your city",
    "Expert-led workshops and hands-on sessions",
    "Real-world events — not just online content",
    "Learn at your own pace, your own way",
    "Zero gatekeeping — all levels are welcome",
    "Built by passion, for passion"
  ];
  const stats = [
    { value: 1e4, suffix: "+", label: "Active Members" },
    { value: 50, suffix: "+", label: "Cities Reached" },
    { value: 100, suffix: "+", label: "Events / Year" },
    { value: 8, suffix: "", label: "Passion Categories" }
  ];
  const problemPoints = [
    {
      text: "You have a passion — but no one around you shares it.",
      icon: Frown
    },
    {
      text: "You want to grow — but rigid classes feel suffocating.",
      icon: Clock
    },
    {
      text: "You crave real community — not just another social feed.",
      icon: Users
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: heroRef,
        className: "relative min-h-screen flex items-center justify-center overflow-hidden",
        "data-ocid": "landing-hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80",
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
                  background: "linear-gradient(to bottom, rgba(8,6,20,0.72) 0%, rgba(8,6,20,0.55) 50%, rgba(8,6,20,0.78) 100%)"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "jazbaa-container relative z-10 text-center py-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-white/80 animate-pulse inline-block" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono tracking-[0.25em] uppercase text-white/75", children: "The Creative Community Platform" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                ref: heroHeadRef,
                className: "font-display font-bold mb-6 leading-[0.95] tracking-tight overflow-hidden text-white",
                style: {
                  fontSize: "clamp(3.2rem, 9vw, 8rem)",
                  maxWidth: "900px",
                  margin: "0 auto 1.5rem"
                },
                "data-ocid": "landing-hero-heading",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CharReveal, { text: "What Will You" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "block overflow-hidden",
                      style: { color: "oklch(0.82 0.16 75)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CharReveal, { text: "Unleash?" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                ref: heroSubRef,
                className: "font-body text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed text-white/75",
                style: { maxWidth: "560px", margin: "0 auto 2.5rem", opacity: 0 },
                children: "Where passion meets its people. Join creators across India."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                ref: heroCTARef,
                className: "flex flex-col sm:flex-row gap-4 items-center justify-center",
                style: { opacity: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/join",
                      className: "rounded-full px-10 py-4 font-display text-sm font-semibold tracking-wide text-foreground inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg",
                      style: { background: "oklch(0.82 0.16 75)", color: "#1a1a2e" },
                      "data-ocid": "landing-hero-cta-primary",
                      children: "Join JAZBAA Free"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/about",
                      className: "rounded-full px-10 py-4 font-display text-sm font-semibold tracking-wide inline-block border border-white/30 text-white hover:bg-white/10 transition-all duration-300",
                      "data-ocid": "landing-hero-cta-secondary",
                      children: "Learn more"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-center gap-2 opacity-40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono tracking-widest uppercase text-white/60", children: "Scroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-12 bg-white/40 animate-pulse" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        ref: problemRef,
        className: "relative py-28 md:py-36",
        style: { background: "oklch(0.975 0.004 260)" },
        "data-ocid": "landing-problem",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "jazbaa-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label mb-4", children: "The Reality" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-bold tracking-tight",
                style: {
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  color: "oklch(0.12 0.018 260)"
                },
                children: "Sound familiar?"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: problemPoints.map((item, i) => {
            const Icon = item.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "problem-line flex items-start gap-6",
                style: { opacity: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center",
                      style: {
                        background: "oklch(0.52 0.22 270 / 0.08)",
                        border: "1px solid oklch(0.52 0.22 270 / 0.15)"
                      },
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Icon,
                        {
                          size: 20,
                          style: { color: "oklch(0.52 0.22 270)" },
                          strokeWidth: 1.5
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "block text-xs font-mono tracking-widest uppercase mb-2",
                        style: { color: "oklch(0.52 0.22 270 / 0.7)" },
                        children: [
                          "0",
                          i + 1
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-body text-xl md:text-2xl leading-relaxed",
                        style: { color: "oklch(0.18 0.018 260)" },
                        children: item.text
                      }
                    )
                  ] })
                ]
              },
              item.text
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mt-16 h-px w-full",
              style: { background: "oklch(0.88 0.008 260)" }
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative py-28 md:py-40",
        style: { background: "oklch(1 0 0)" },
        "data-ocid": "landing-solution",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "jazbaa-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label mb-5", children: "The Answer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h2",
              {
                className: "font-display font-bold tracking-tight mb-6",
                style: {
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  color: "oklch(0.12 0.018 260)"
                },
                children: [
                  "Enter ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "JAZBAA." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-lg md:text-xl leading-relaxed mb-8",
                style: { color: "oklch(0.38 0.014 260)" },
                children: "A living platform where your passion finds its people. Real community — built on shared curiosity and the drive to grow together."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
              "Dance",
              "Music",
              "Art",
              "Tech",
              "Photography",
              "Cooking",
              "Fitness",
              "Writing"
            ].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "px-4 py-2 rounded-full text-sm font-body font-medium border",
                style: {
                  borderColor: "oklch(0.52 0.22 270 / 0.2)",
                  color: "oklch(0.52 0.22 270)",
                  background: "oklch(0.52 0.22 270 / 0.05)"
                },
                children: cat
              },
              cat
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MorphingOrb, {}) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative py-24 md:py-32",
        style: {
          background: "oklch(0.975 0.004 260)",
          borderTop: "1px solid oklch(0.91 0.008 260)"
        },
        "data-ocid": "landing-stats",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "jazbaa-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label mb-3", children: "Our Community" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-bold tracking-tight",
                style: {
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "oklch(0.12 0.018 260)"
                },
                children: "Real people. Real impact."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-border border border-border rounded-2xl overflow-hidden bg-card", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-10 px-6",
              "data-ocid": `landing-stat-${stat.label.toLowerCase().replace(/ /g, "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-bold leading-none tracking-tighter text-gradient",
                    style: { fontSize: "clamp(2.5rem, 5vw, 4rem)" },
                    "aria-label": `${stat.value}${stat.suffix} ${stat.label}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: stat.value, suffix: stat.suffix })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-2 font-body text-sm font-medium text-center",
                    style: { color: "oklch(0.45 0.014 260)" },
                    children: stat.label
                  }
                )
              ]
            },
            stat.label
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative py-28 md:py-40",
        style: { background: "oklch(1 0 0)" },
        "data-ocid": "landing-benefits",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "jazbaa-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label mb-3", children: "Everything you need" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-bold tracking-tight",
                style: {
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                  color: "oklch(0.12 0.018 260)"
                },
                children: "What you get"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0", children: benefits.map((benefit, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(BenefitRow, { text: benefit, index }, benefit)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative py-28 md:py-40 overflow-hidden",
        style: { background: "oklch(0.975 0.004 260)" },
        "data-ocid": "landing-final-cta",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "jazbaa-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "max-w-2xl mx-auto text-center rounded-3xl p-12 md:p-16 border border-border bg-card",
            style: { boxShadow: "0 8px 40px -8px oklch(0.12 0.018 260 / 0.1)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label mb-4", children: "Don't wait" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  className: "font-display font-bold tracking-tight mb-4",
                  style: {
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    color: "oklch(0.12 0.018 260)"
                  },
                  children: [
                    "Your community",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "is waiting." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-lg mb-10 leading-relaxed",
                  style: { color: "oklch(0.42 0.014 260)" },
                  children: "Free forever. No gatekeeping. Just passion."
                }
              ),
              emailSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display text-xl font-semibold mb-2",
                    style: { color: "oklch(0.52 0.22 270)" },
                    children: "✓ You're on the list!"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We'll be in touch soon." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col sm:flex-row gap-3 mb-8 max-w-sm mx-auto",
                  "data-ocid": "landing-email-form",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "email",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: "your@email.com",
                        className: "flex-1 px-5 py-3.5 rounded-full border font-body text-sm outline-none transition-all duration-200",
                        style: {
                          borderColor: "oklch(0.88 0.008 260)",
                          background: "oklch(0.985 0.004 80)",
                          color: "oklch(0.12 0.018 260)"
                        },
                        onFocus: (e) => {
                          e.target.style.borderColor = "oklch(0.52 0.22 270)";
                        },
                        onBlur: (e) => {
                          e.target.style.borderColor = "oklch(0.88 0.008 260)";
                        },
                        "aria-label": "Email address",
                        "data-ocid": "landing-email-input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-primary whitespace-nowrap",
                        "data-ocid": "landing-email-submit",
                        onClick: () => {
                          if (email && email.indexOf("@") > 0)
                            setEmailSubmitted(true);
                        },
                        children: "Join Free"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center justify-center mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/join",
                    className: "btn-primary inline-block",
                    "data-ocid": "landing-cta-join",
                    children: "Join JAZBAA Free"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/about",
                    className: "btn-ghost-border inline-block text-foreground",
                    "data-ocid": "landing-cta-about",
                    children: "See how it works"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-xs font-mono text-muted-foreground", children: "No credit card. No catch. Cancel anytime." })
            ]
          }
        ) })
      }
    )
  ] });
}
function BenefitRow({ text, index }) {
  const rowRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    gsapWithCSS.set(el, { opacity: 0, x: -30 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        gsapWithCSS.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: index % 2 * 0.1,
          ease: "power3.out"
        });
      }
    });
    return () => trigger.kill();
  }, [index]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: rowRef,
      className: "flex items-start gap-4 py-5 border-b border-border last:border-0",
      style: { opacity: 0 },
      "data-ocid": `landing-benefit-${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCheck, { delay: index * 0.12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-body text-base md:text-lg",
            style: { color: "oklch(0.22 0.018 260)" },
            children: text
          }
        )
      ]
    }
  );
}
export {
  Landing as default
};
