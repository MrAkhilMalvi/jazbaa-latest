import { ScrollTrigger, gsap } from "@/hooks/useGSAP";
import { useGSAP } from "@gsap/react";
import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { CheckCircle2 } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ─── GLOBE UTILS & DATA ───────────────────────────────────────────────────

const RADIUS = 1.8;

// Convert Lat/Lng to 3D Cartesian Coordinates
function getVertex(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 90) * (Math.PI / 180); // +90 centers India nicely

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

const CITIES = [
  { id: "mumbai", name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { id: "blr", name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { id: "delhi", name: "New Delhi", lat: 28.6139, lng: 77.209 },
  { id: "ny", name: "New York", lat: 40.7128, lng: -74.006 },
  { id: "london", name: "London", lat: 51.5074, lng: -0.1278 },
  { id: "tokyo", name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { id: "dubai", name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { id: "sydney", name: "Sydney", lat: -33.8688, lng: 151.2093 },
];

const CONNECTIONS = [
  { from: "mumbai", to: "london" },
  { from: "mumbai", to: "dubai" },
  { from: "blr", to: "tokyo" },
  { from: "delhi", to: "ny" },
  { from: "blr", to: "sydney" },
  { from: "mumbai", to: "ny" },
  { from: "delhi", to: "blr" },
];

// ─── PREMIUM GLOBE COMPONENTS ─────────────────────────────────────────────

// Creates the premium dotted grid wrapped around the earth
function DottedEarth() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const samples = 2500; // Density of the dots
    const phi = Math.PI * (3 - Math.sqrt(5));

    // Fibonacci sphere algorithm to distribute dots evenly
    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      // Slightly larger than the solid core to sit on the surface
      pts.push(new THREE.Vector3(x * (RADIUS + 0.01), y * (RADIUS + 0.01), z * (RADIUS + 0.01)));
    }
    return pts;
  }, []);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#00aaff"
        size={0.018}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CityPoint({
  city,
  radius,
  onHover,
}: {
  city: (typeof CITIES)[0];
  radius: number;
  onHover: (c: typeof city | null) => void;
}) {
  const pos = useMemo(() => getVertex(city.lat, city.lng, radius), [city, radius]);
  const lookAtPos = useMemo(() => pos.clone().multiplyScalar(2), [pos]);
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      const scale = 1 + Math.sin(t * 4 + city.lng) * 0.4;
      ringRef.current.scale.set(scale, scale, scale);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8 - scale * 0.3;
    }
  });

  return (
    <group
      position={pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(city);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onHover(null);
        document.body.style.cursor = "auto";
      }}
    >
      <mesh>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#ff7a18" : "#ffffff"} />
      </mesh>

      <mesh ref={ringRef} onUpdate={(self) => self.lookAt(lookAtPos)}>
        <ringGeometry args={[0.05, 0.09, 32]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {hovered && (
        <Html center distanceFactor={12} zIndexRange={[100, 0]}>
          <div className="bg-[#0b1f3a]/90 backdrop-blur-md border border-[#00d2ff]/50 text-white text-[10px] font-mono tracking-widest uppercase px-4 py-2 rounded-full whitespace-nowrap shadow-[0_0_20px_rgba(0,210,255,0.6)] transition-all pointer-events-none">
            {city.name}
            <div className="absolute top-1/2 -left-1.5 w-2 h-2 bg-[#ff7a18] rounded-full -translate-y-1/2 animate-pulse" />
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectionLine({
  from,
  to,
  radius,
  index,
}: {
  from: (typeof CITIES)[0];
  to: (typeof CITIES)[0];
  radius: number;
  index: number;
}) {
  const curve = useMemo(() => {
    const v1 = getVertex(from.lat, from.lng, radius);
    const v2 = getVertex(to.lat, to.lng, radius);
    const dist = v1.distanceTo(v2);
    const mid = v1.clone().lerp(v2, 0.5);
    mid.normalize().multiplyScalar(radius + dist * 0.5); // Elevate the arc clearly
    return new THREE.QuadraticBezierCurve3(v1, mid, v2);
  }, [from, to, radius]);

  const particleGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    // Slower, smooth data packet movement
    const t = (clock.getElapsedTime() * 0.2 + index * 0.15) % 1;
    const pos = curve.getPoint(t);
    if (particleGroupRef.current) {
      particleGroupRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* 3D Tube Arc instead of a flat line for vastly improved visibility */}
      <mesh>
        <tubeGeometry args={[curve, 40, 0.008, 8, false]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Traveling Data Particle with Glow Halo */}
      <group ref={particleGroupRef}>
        {/* Core bright particle */}
        <mesh>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#ff7a18" transparent opacity={1} />
        </mesh>
        {/* Outer pulsing halo */}
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial
            color="#ff7a18"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

function PremiumGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredCity, setHoveredCity] = useState<(typeof CITIES)[0] | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!hoveredCity) {
      groupRef.current.rotation.y += delta * 0.08;
      state.camera.position.lerp(new THREE.Vector3(0, 0, 5), delta * 2);
    } else {
      const localPos = getVertex(hoveredCity.lat, hoveredCity.lng, RADIUS);
      const worldPos = localPos.clone().applyMatrix4(groupRef.current.matrixWorld);
      const camTarget = worldPos.clone().normalize().multiplyScalar(3.2);
      state.camera.position.lerp(camTarget, delta * 3);
    }
    
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Soft Cyan Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.15, 64, 64]} />
        <meshBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Vibrant Blue Core Sphere (Replaced the Black) */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshStandardMaterial
          color="#003388"
          emissive="#001144"
          emissiveIntensity={0.6}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      <group ref={groupRef}>
        {/* Dotted Grid wrapped around the globe */}
        <DottedEarth />

        {/* Cities */}
        {CITIES.map((city) => (
          <CityPoint
            key={city.id}
            city={city}
            radius={RADIUS}
            onHover={setHoveredCity}
          />
        ))}

        {/* Traveling Arcs */}
        {CONNECTIONS.map((conn, i) => {
          const fromCity = CITIES.find((c) => c.id === conn.from);
          const toCity = CITIES.find((c) => c.id === conn.to);
          if (!fromCity || !toCity) return null;
          return (
            <ConnectionLine
              key={i}
              index={i}
              from={fromCity}
              to={toCity}
              radius={RADIUS}
            />
          );
        })}
      </group>
    </group>
  );
}

// ─── MISSION & PERSONA DATA ───────────────────────────────────────────────
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

  useGSAP(() => {
    const words = heroHeadRef.current?.querySelectorAll(".hero-word");
    if (!words?.length) return;

    gsap.fromTo(
      words,
      { opacity: 0, y: 60, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.07, ease: "power4.out", delay: 0.3 }
    );

    gsap.fromTo(
      ".about-hero-sub",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.8, ease: "power3.out" }
    );
  }, { scope: heroRef });

  useGSAP(() => {
    gsap.fromTo(
      ".vision-line",
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.85, stagger: 0.16, ease: "power3.out", scrollTrigger: { trigger: visionRef.current, start: "top 75%", once: true } }
    );
  }, { scope: visionRef });

  useGSAP(() => {
    gsap.fromTo(
      ".mission-item",
      { opacity: 0, x: -36 },
      { opacity: 1, x: 0, duration: 0.7, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: missionRef.current, start: "top 75%", once: true } }
    );

    gsap.fromTo(
      ".mission-head",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: missionRef.current, start: "top 80%", once: true } }
    );
  }, { scope: missionRef });

  useGSAP(() => {
    gsap.fromTo(
      ".persona-card",
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: audienceRef.current, start: "top 75%", once: true } }
    );

    gsap.fromTo(
      ".audience-head",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: audienceRef.current, start: "top 80%", once: true } }
    );
  }, { scope: audienceRef });

  const heroWords = "We believe passion changes everything.".split(" ");

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[80vh] flex flex-col justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(8,6,20,0.88) 0%, rgba(8,6,20,0.5) 50%, rgba(8,6,20,0.35) 100%)",
            }}
          />
        </div>

        <div className="jazbaa-container relative z-10 pt-48">
          <span className="about-hero-sub section-label mb-6 block" style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}>
            About Jazbaa
          </span>

          <h1 ref={heroHeadRef} className="font-display font-bold tracking-tight leading-[1.05] mb-8" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "#ffffff" }}>
            {heroWords.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.22em] will-change-transform" style={{ opacity: 0 }}>
                {word === "everything." ? (
                  <span style={{ color: "oklch(0.82 0.16 75)" }}>{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <div className="about-hero-sub max-w-xl" style={{ opacity: 0 }}>
            <p className="font-body text-lg md:text-xl leading-relaxed text-white/70">
              JAZBAA was born from a simple truth: every person carries a spark.{" "}
              <em className="font-semibold not-italic text-[#ff7a18]">Jazbaa</em> means passion and spirit in Urdu — that is exactly what we celebrate.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VISION (PREMIUM GLOBE) ────────────────────────────────────── */}
      <section ref={visionRef} className="py-32 bg-background overflow-hidden" id="vision">
        <div className="jazbaa-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="z-10 relative">
              <p className="vision-line section-label mb-6 block opacity-0">Our Vision</p>
              <div className="vision-line h-0.5 w-12 mb-10 rounded-full opacity-0" style={{ background: "var(--gradient-accent)" }} />

              <p className="vision-line font-display font-semibold leading-tight mb-6 opacity-0" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "oklch(0.12 0.018 260)" }}>
                A world where no passion goes unshared.
              </p>
              <p className="vision-line font-body text-base leading-relaxed mb-5 opacity-0 text-foreground/70">
                Where the painter finds her tribe, the dancer finds his stage,
                and the coder finds her collaborator.
              </p>
              <p className="vision-line font-body text-base leading-relaxed font-medium opacity-0 text-foreground/80">
                This is not just a platform. This is a global movement.
              </p>
            </div>

            <div 
              className="relative flex items-center justify-center w-full focus:outline-none"
              style={{ height: "500px", outline: "none", border: "none" }}
            >
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                className="w-full h-full focus:outline-none focus:ring-0"
                style={{ outline: "none", border: "none" }}
              >
                {/* Updated Brighter Lighting to match the ocean-blue globe */}
                <ambientLight intensity={1.2} color="#ffffff" />
                <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
                <directionalLight position={[-5, -3, -5]} intensity={1} color="#00aaff" />
                
                <PremiumGlobe />
              </Canvas>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-[#00d2ff] opacity-60">
                  Interactive — Global Network
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MISSION ───────────────────────────────────────────────────── */}
      <section ref={missionRef} className="py-32 overflow-hidden bg-card border-y border-foreground/5" id="mission">
        <div className="jazbaa-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="mission-head opacity-0">
              <p className="section-label mb-4">Our Mission</p>
              <h2 className="font-display font-bold tracking-tight mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Five commitments that drive <span className="text-gradient">everything we do.</span>
              </h2>
              <div className="rounded-2xl overflow-hidden h-[280px]">
                <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80" alt="Community gathering" className="w-full h-full object-cover" />
              </div>
            </div>

            <ul className="space-y-5 pt-2">
              {MISSIONS.map((item) => (
                <li key={item.num} className="mission-item flex items-start gap-5 group opacity-0">
                  <span className="flex-shrink-0 font-mono text-xs font-semibold mt-1 text-[#ff7a18]/70">{item.num}</span>
                  <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center bg-[#ff7a18]/10">
                    <CheckCircle2 size={15} className="text-[#ff7a18]" />
                  </div>
                  <p className="font-body text-base md:text-lg leading-relaxed text-foreground/80">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── AUDIENCE ──────────────────────────────────────────────────── */}
      <section ref={audienceRef} className="py-32 bg-background overflow-hidden" id="audience">
        <div className="jazbaa-container">
          <div className="text-center mb-16 audience-head opacity-0">
            <p className="section-label mb-4">Who is JAZBAA for?</p>
            <h2 className="font-display font-bold tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "oklch(0.12 0.018 260)" }}>
              Everyone who carries <span className="text-gradient">a spark.</span>
            </h2>
            <p className="font-body text-base md:text-lg mt-4 max-w-md mx-auto text-foreground/70">
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

      {/* ─── CTA STRIP ─────────────────────────────────────────────────── */}
      <section className="py-24 overflow-hidden bg-[#0a101d] border-t border-white/5">
        <div className="jazbaa-container text-center">
          <p className="section-label mb-4 text-white/50">Get started today</p>
          <h2 className="font-display font-bold text-white mb-8 tracking-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Ready to find your people?
          </h2>
          <a href="/join" className="inline-block rounded-full px-10 py-4 font-display text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 bg-[#ff7a18] text-[#1a1a2e]">
            Join JAZBAA Today
          </a>
        </div>
      </section>
    </div>
  );
}