import { ScrollTrigger, gsap } from "@/hooks/useGSAP";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CheckCircle2 } from "lucide-react";
import { useCallback, useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ─── 3D Globe ──────────────────────────────────────────────────────────────
function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.12;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.y = t * 0.18;
      edgesRef.current.rotation.x = Math.sin(t * 0.08) * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <meshBasicMaterial
          color={new THREE.Color("oklch(0.52 0.22 270)")}
          transparent
          opacity={0.04}
          wireframe={false}
        />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.6, 4)]} />
        <lineBasicMaterial
          color={new THREE.Color("oklch(0.52 0.22 270)")}
          transparent
          opacity={0.55}
        />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color("oklch(0.52 0.22 270)")}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// ─── Mission bullet item ───────────────────────────────────────────────────
const MISSIONS = [
  { num: "01", text: "Connect passion communities across 1,000+ cities" },
  { num: "02", text: "Make creative learning accessible to everyone" },
  { num: "03", text: "Foster real human connection through shared interests" },
  {
    num: "04",
    text: "Celebrate every form of creative expression — no gatekeeping",
  },
  { num: "05", text: "Build bridges between beginners and masters" },
];

// ─── Persona data — Indian/Asian avatars ──────────────────────────────────
const PERSONAS = [
  {
    role: "Students",
    label: "Start Here",
    desc: "Curious first-steps takers exploring without judgment.",
    img: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=400&q=80",
    accent: "oklch(0.52 0.22 270)",
  },
  {
    role: "Professionals",
    label: "Find Community",
    desc: "Working adults seeking a creative outlet beyond the 9-to-5.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    accent: "oklch(0.62 0.14 195)",
  },
  {
    role: "Creatives",
    label: "Share Craft",
    desc: "Artists sharing expertise and mentoring the next generation.",
    img: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=400&q=80",
    accent: "oklch(0.68 0.18 35)",
  },
  {
    role: "Leaders",
    label: "Lead & Grow",
    desc: "Restless minds turning passion into purpose across cities.",
    img: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&q=80",
    accent: "oklch(0.65 0.16 160)",
  },
];

// ─── Tilt card ────────────────────────────────────────────────────────────
function PersonaCard({
  persona,
  index,
}: {
  persona: (typeof PERSONAS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    gsap.to(el, {
      rotateY: x * 8,
      rotateX: -y * 8,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 800,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="persona-card relative rounded-2xl overflow-hidden cursor-default will-change-transform"
      style={{
        boxShadow: "0 2px 20px -4px oklch(0.12 0.018 260 / 0.1)",
        border: "1px solid oklch(0.91 0.008 260)",
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-ocid={`persona-card-${persona.role.toLowerCase()}`}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={persona.img}
          alt={persona.role}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${persona.accent}99 0%, transparent 60%)`,
          }}
        />
        <div className="absolute bottom-4 left-4">
          <span
            className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {persona.label}
          </span>
        </div>
      </div>

      <div className="bg-card p-6">
        <div
          className="h-0.5 w-8 mb-4 rounded-full"
          style={{ background: persona.accent }}
        />
        <h3 className="font-display text-xl font-bold text-foreground mb-2 tracking-tight">
          {persona.role}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.45 0.012 260)" }}
        >
          {persona.desc}
        </p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const heroHeadRef = useRef<HTMLHeadingElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const audienceRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  // ── Hero word-by-word reveal ───────────────────────────────────────────
  useGSAP(
    () => {
      const words = heroHeadRef.current?.querySelectorAll(".hero-word");
      if (!words?.length) return;

      gsap.fromTo(
        words,
        { opacity: 0, y: 60, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
          delay: 0.3,
        },
      );

      gsap.fromTo(
        ".about-hero-sub",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.8, ease: "power3.out" },
      );
    },
    { scope: heroRef, dependencies: [] as unknown[] },
  );

  // ── Vision text line-by-line ───────────────────────────────────────────
  useGSAP(
    () => {
      gsap.fromTo(
        ".vision-line",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      if (globeRef.current) {
        gsap.to(globeRef.current, {
          rotateZ: 12,
          ease: "none",
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: visionRef, dependencies: [] as unknown[] },
  );

  // ── Mission stagger ────────────────────────────────────────────────────
  useGSAP(
    () => {
      gsap.fromTo(
        ".mission-item",
        { opacity: 0, x: -36 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".mission-head",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: missionRef, dependencies: [] as unknown[] },
  );

  // ── Audience cards stagger ─────────────────────────────────────────────
  useGSAP(
    () => {
      gsap.fromTo(
        ".persona-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: audienceRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".audience-head",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: audienceRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: audienceRef, dependencies: [] as unknown[] },
  );

  const heroWords = "We believe passion changes everything.".split(" ");

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO / PHILOSOPHY ───────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex flex-col justify-end pb-20 overflow-hidden"
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
                "linear-gradient(to top, rgba(8,6,20,0.88) 0%, rgba(8,6,20,0.5) 50%, rgba(8,6,20,0.35) 100%)",
            }}
          />
        </div>

        <div className="jazbaa-container relative z-10 pt-48">
          <span
            className="about-hero-sub section-label mb-6 block"
            style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}
          >
            About Jazbaa
          </span>

          <h1
            ref={heroHeadRef}
            className="font-display font-bold tracking-tight leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "#ffffff" }}
            aria-label="We believe passion changes everything."
          >
            {heroWords.map((word, i) => (
              <span
                key={`hero-word-${i}-${word}`}
                className="hero-word inline-block mr-[0.22em] will-change-transform"
                style={{ opacity: 0 }}
              >
                {word === "everything." ? (
                  <span style={{ color: "oklch(0.82 0.16 75)" }}>{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <div className="about-hero-sub max-w-xl" style={{ opacity: 0 }}>
            <p
              className="font-body text-lg md:text-xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              JAZBAA was born from a simple truth: every person carries a spark.{" "}
              <em
                className="font-semibold not-italic"
                style={{ color: "oklch(0.82 0.16 75)" }}
              >
                Jazbaa
              </em>{" "}
              means passion and spirit in Urdu — that is exactly what we
              celebrate.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VISION ──────────────────────────────────────────────────────── */}
      <section
        ref={visionRef}
        className="py-32 bg-background overflow-hidden"
        id="vision"
      >
        <div className="jazbaa-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p
                className="vision-line section-label mb-6 block"
                style={{ opacity: 0 }}
              >
                Our Vision
              </p>
              <div
                className="vision-line h-0.5 w-12 mb-10 rounded-full"
                style={{ background: "var(--gradient-accent)", opacity: 0 }}
              />

              <p
                className="vision-line font-display font-semibold leading-tight mb-6"
                style={{
                  opacity: 0,
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "oklch(0.12 0.018 260)",
                }}
              >
                A world where no passion goes unshared.
              </p>
              <p
                className="vision-line font-body text-base leading-relaxed mb-5"
                style={{ opacity: 0, color: "oklch(0.42 0.012 260)" }}
              >
                Where the painter finds her tribe, the dancer finds his stage,
                and the coder finds her collaborator.
              </p>
              <p
                className="vision-line font-body text-base leading-relaxed font-medium"
                style={{ opacity: 0, color: "oklch(0.28 0.018 260)" }}
              >
                This is not just a platform. This is a movement.
              </p>
            </div>

            <div
              ref={globeRef}
              className="relative flex items-center justify-center rounded-2xl overflow-hidden"
              style={{
                height: "420px",
                background: "oklch(0.975 0.004 260)",
                border: "1px solid oklch(0.91 0.008 260)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full m-auto"
                style={{
                  width: "320px",
                  height: "320px",
                  background:
                    "radial-gradient(circle, oklch(0.52 0.22 270 / 0.06) 0%, transparent 70%)",
                }}
              />
              <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                style={{ width: "100%", height: "100%" }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.5} />
                <WireframeGlobe />
              </Canvas>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                <span className="section-label text-[10px]">Global Vision</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─────────────────────────────────────────────────────── */}
      <section
        ref={missionRef}
        className="py-32 overflow-hidden bg-card"
        style={{
          borderTop: "1px solid oklch(0.91 0.008 260)",
          borderBottom: "1px solid oklch(0.91 0.008 260)",
        }}
        id="mission"
      >
        <div className="jazbaa-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="mission-head" style={{ opacity: 0 }}>
              <p className="section-label mb-4">Our Mission</p>
              <h2
                className="font-display font-bold tracking-tight mb-8"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "oklch(0.12 0.018 260)",
                }}
              >
                Five commitments that drive{" "}
                <span className="text-gradient">everything we do.</span>
              </h2>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ height: 280 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <ul className="space-y-5 pt-2" aria-label="Mission statements">
              {MISSIONS.map((item) => (
                <li
                  key={item.num}
                  className="mission-item flex items-start gap-5 group"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="flex-shrink-0 font-mono text-xs font-semibold mt-1"
                    style={{ color: "oklch(0.52 0.22 270 / 0.5)" }}
                  >
                    {item.num}
                  </span>
                  <div
                    className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "oklch(0.52 0.22 270 / 0.08)" }}
                    aria-hidden="true"
                  >
                    <CheckCircle2
                      size={15}
                      style={{ color: "oklch(0.52 0.22 270)" }}
                    />
                  </div>
                  <p
                    className="font-body text-base md:text-lg leading-relaxed"
                    style={{ color: "oklch(0.25 0.018 260)" }}
                  >
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── AUDIENCE ────────────────────────────────────────────────────── */}
      <section
        ref={audienceRef}
        className="py-32 bg-background overflow-hidden"
        id="audience"
      >
        <div className="jazbaa-container">
          <div
            className="text-center mb-16 audience-head"
            style={{ opacity: 0 }}
          >
            <p className="section-label mb-4">Who is JAZBAA for?</p>
            <h2
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "oklch(0.12 0.018 260)",
              }}
            >
              Everyone who carries{" "}
              <span className="text-gradient">a spark.</span>
            </h2>
            <p
              className="font-body text-base md:text-lg mt-4 max-w-md mx-auto"
              style={{ color: "oklch(0.42 0.012 260)" }}
            >
              Beginners or masters — there is a place for you in JAZBAA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERSONAS.map((persona, i) => (
              <PersonaCard key={persona.role} persona={persona} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ───────────────────────────────────────────────────── */}
      <section
        className="py-24 overflow-hidden"
        style={{
          background: "oklch(0.12 0.018 260)",
          borderTop: "1px solid oklch(0.18 0.018 260)",
        }}
      >
        <div className="jazbaa-container text-center">
          <p
            className="section-label mb-4"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Get started today
          </p>
          <h2
            className="font-display font-bold text-white mb-8 tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Ready to find your people?
          </h2>
          <a
            href="/join"
            className="inline-block rounded-full px-10 py-4 font-display text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            style={{ background: "oklch(0.82 0.16 75)", color: "#1a1a2e" }}
            data-ocid="about-cta-join"
          >
            Join JAZBAA Today
          </a>
        </div>
      </section>
    </div>
  );
}
