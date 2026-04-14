import { Badge } from "@/components/ui/badge";
import {
  ScrollTrigger,
  gsap,
  useScrollReveal,
  useTiltEffect,
} from "@/hooks/useGSAP";
import { useGSAP } from "@gsap/react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

type EventCategory =
  | "All"
  | "Dance"
  | "Music"
  | "Art"
  | "Fitness"
  | "Tech"
  | "Cooking"
  | "Photography";

interface Event {
  id: number;
  category: Exclude<EventCategory, "All">;
  name: string;
  date: string;
  city: string;
  description: string;
  participants: number;
  img: string;
  accent: string;
  tag: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    id: 1,
    category: "Dance",
    name: "Contemporary Moves Workshop",
    date: "May 10, 2026",
    city: "Mumbai",
    description:
      "Contemporary dance vocabulary — floor work to aerial transitions. Led by choreographer Priya Desai.",
    participants: 40,
    img: "https://images.unsplash.com/photo-1606788075761-4f1b81e1e32e?w=600&q=80",
    accent: "oklch(0.52 0.22 270)",
    tag: "Workshop",
  },
  {
    id: 2,
    category: "Music",
    name: "Indie Jam Session",
    date: "May 18, 2026",
    city: "Bangalore",
    description:
      "Open collaborative jam with indie musicians, loop artists, and beat-makers. All levels welcome.",
    participants: 30,
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    accent: "oklch(0.68 0.18 35)",
    tag: "Live",
  },
  {
    id: 3,
    category: "Art",
    name: "Urban Canvas: Painting Circle",
    date: "May 24, 2026",
    city: "Delhi",
    description:
      "Group painting in an open urban landscape. Acrylics, watercolours, mixed media. No experience needed.",
    participants: 20,
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
    accent: "oklch(0.62 0.14 195)",
    tag: "Creative",
  },
  {
    id: 4,
    category: "Photography",
    name: "Golden Hour Photo Walk",
    date: "June 1, 2026",
    city: "Jaipur",
    description:
      "Explore the pink city's architecture and street life during magic hour. Portfolio critique included.",
    participants: 25,
    img: "https://images.unsplash.com/photo-1559181567-c3190bab3a7c?w=600&q=80",
    accent: "oklch(0.80 0.16 75)",
    tag: "Walk",
  },
  {
    id: 5,
    category: "Fitness",
    name: "Sunrise Boot Camp",
    date: "June 8, 2026",
    city: "Pune",
    description:
      "High-energy outdoor functional fitness at sunrise. HIIT, mobility drills and partner exercises.",
    participants: 50,
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    accent: "oklch(0.56 0.18 160)",
    tag: "Outdoor",
  },
  {
    id: 6,
    category: "Cooking",
    name: "Regional Flavours Masterclass",
    date: "June 15, 2026",
    city: "Chennai",
    description:
      "Deep dive into regional Indian cooking — Chettinad spices to Kerala curries. Hands-on with Chef Nandita.",
    participants: 16,
    img: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=600&q=80",
    accent: "oklch(0.65 0.20 45)",
    tag: "Masterclass",
  },
  {
    id: 7,
    category: "Tech",
    name: "Design × Code Hackathon",
    date: "June 22, 2026",
    city: "Hyderabad",
    description:
      "16-hour hackathon at the intersection of design and engineering — build expressive web experiences.",
    participants: 60,
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    accent: "oklch(0.52 0.22 270)",
    tag: "Hackathon",
  },
  {
    id: 8,
    category: "Art",
    name: "Sketching the City",
    date: "June 29, 2026",
    city: "Kolkata",
    description:
      "Urban sketching through Kolkata's colonial spaces. Guided critique by illustrator Aarav Sen.",
    participants: 22,
    img: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=600&q=80",
    accent: "oklch(0.48 0.24 285)",
    tag: "Illustration",
  },
];

const PAST_EVENTS = [
  {
    id: 101,
    name: "Kathak Heritage Workshop",
    date: "March 12, 2026",
    city: "Varanasi",
    category: "Dance",
    description:
      "Two-day classical Kathak exploration with live tabla accompaniment and cultural discussion.",
    participants: 35,
    img: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600&q=80",
    tag: "Workshop",
  },
  {
    id: 102,
    name: "Electronic Soundscapes",
    date: "March 22, 2026",
    city: "Mumbai",
    category: "Music",
    description:
      "Intimate showcase of ambient and electronic music by emerging JAZBAA artists.",
    participants: 45,
    img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80",
    tag: "Showcase",
  },
  {
    id: 103,
    name: "Yoga & Breathwork Retreat",
    date: "April 5, 2026",
    city: "Rishikesh",
    category: "Fitness",
    description:
      "Sunrise yoga and pranayama on the banks of the Ganges — mindfulness in motion.",
    participants: 28,
    img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600&q=80",
    tag: "Retreat",
  },
];

const FILTER_TABS: EventCategory[] = [
  "All",
  "Dance",
  "Music",
  "Art",
  "Fitness",
  "Tech",
  "Cooking",
  "Photography",
];

// ─── EventCard ───────────────────────────────────────────────────────────────

function EventCard({
  event,
  index,
  onSelect,
}: {
  event: Event;
  index: number;
  onSelect: (event: Event) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(
    cardRef as unknown as React.RefObject<HTMLElement>,
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      handleMouseMove(e.nativeEvent);
    },
    [handleMouseMove],
  );

  const onMouseLeave = useCallback(() => {
    handleMouseLeave();
  }, [handleMouseLeave]);

  return (
    <button
      ref={cardRef}
      type="button"
      className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer select-none will-change-transform text-left group"
      style={{
        width: "300px",
        height: "400px",
        animationDelay: `${index * 0.08}s`,
        border: "1px solid oklch(0.91 0.008 260)",
        background: "oklch(1 0 0)",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onSelect(event)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(event);
      }}
      data-ocid={`event-card-${event.id}`}
    >
      <div className="relative h-[60%] overflow-hidden">
        <img
          src={event.img}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(8,6,20,0.6)",
              color: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            {event.tag}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className="text-[10px] font-mono tracking-[0.15em] uppercase px-2 py-1 rounded-full"
            style={{
              background: `${event.accent}22`,
              color: event.accent,
              border: `1px solid ${event.accent}44`,
            }}
          >
            {event.category}
          </span>
        </div>
        <div
          className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(8,6,20,0.75) 0%, transparent 60%)",
          }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-white">
            View Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      <div className="h-[40%] flex flex-col justify-between p-5">
        <h3 className="text-base font-display font-bold leading-snug text-foreground line-clamp-2">
          {event.name}
        </h3>
        <div className="flex flex-col gap-1.5 mt-auto">
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {event.date}
          </div>
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            {event.city}
          </div>
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            {event.participants} spots
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── PastEventCard ────────────────────────────────────────────────────────────

function PastEventCard({ event }: { event: (typeof PAST_EVENTS)[0] }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden gsap-reveal"
      style={{ border: "1px solid oklch(0.91 0.008 260)" }}
      data-ocid={`past-event-${event.id}`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={event.img}
          alt={event.name}
          className="w-full h-full object-cover filter saturate-50 brightness-90 group-hover:saturate-75 transition-all duration-500"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(8,6,20,0.35)" }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            {event.tag}
          </span>
          <Badge
            variant="outline"
            className="border-white/20 text-white/60 text-[10px]"
          >
            Past
          </Badge>
        </div>
      </div>
      <div className="bg-card p-5">
        <h4 className="text-base font-display font-bold text-foreground mb-2 leading-snug">
          {event.name}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            {event.city}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── EventDetailPanel ─────────────────────────────────────────────────────────

function EventDetailPanel({
  event,
  onClose,
}: {
  event: Event | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!event || !panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
    );
  }, [event]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      data-ocid="event-detail-overlay"
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm border-0 cursor-default"
        aria-label="Close event detail"
        onClick={onClose}
      />
      <dialog
        ref={panelRef}
        open
        className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl p-0 border-0 m-auto bg-card"
        style={{ border: "1px solid oklch(0.91 0.008 260)" }}
        data-ocid="event-detail-panel"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={event.img}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,6,20,0.7) 0%, rgba(8,6,20,0.2) 100%)",
            }}
          />
          <button
            type="button"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
            onClick={onClose}
            aria-label="Close detail panel"
            data-ocid="event-detail-close"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
              }}
            >
              {event.tag}
            </span>
          </div>
        </div>

        <div className="p-7">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 leading-tight text-foreground">
            {event.name}
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
            {event.description}
          </p>

          <div className="flex flex-col gap-3 mb-7">
            {[
              { icon: Calendar, text: event.date },
              { icon: MapPin, text: event.city },
              { icon: Users, text: `${event.participants} spots available` },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 text-sm font-body text-muted-foreground"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-white"
            style={{ background: "oklch(0.12 0.018 260)" }}
            data-ocid="event-register-btn"
          >
            Register Interest
          </button>
        </div>
      </dialog>
    </div>
  );
}

// ─── Main Events Page ─────────────────────────────────────────────────────────

export default function Events() {
  const [activeFilter, setActiveFilter] = useState<EventCategory>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroHeadRef = useRef<HTMLHeadingElement>(null);
  const carouselSectionRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const filteredEvents =
    activeFilter === "All"
      ? UPCOMING_EVENTS
      : UPCOMING_EVENTS.filter((e) => e.category === activeFilter);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const emblaApiRef = useRef(emblaApi);
  useEffect(() => {
    emblaApiRef.current = emblaApi;
  }, [emblaApi]);

  useGSAP(
    () => {
      const words = heroHeadRef.current?.querySelectorAll(".hero-word");
      if (!words?.length) return;

      gsap.fromTo(
        words,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3,
        },
      );

      gsap.fromTo(
        ".events-hero-sub",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.85 },
      );
    },
    { scope: heroRef, dependencies: [] as unknown[] },
  );

  useEffect(() => {
    if (!carouselSectionRef.current) return;
    const cards =
      carouselSectionRef.current.querySelectorAll("[data-card-index]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselSectionRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!filterContainerRef.current || !underlineRef.current) return;
    const activeEl = filterContainerRef.current.querySelector(
      `[data-filter="${activeFilter}"]`,
    ) as HTMLElement;
    if (!activeEl) return;
    gsap.to(underlineRef.current, {
      x: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [activeFilter]);

  useScrollReveal(pastRef, ".gsap-reveal", {
    y: 40,
    stagger: 0.12,
    start: "top 80%",
  });

  useEffect(() => {
    if (!statsRef.current) return;
    const el = statsRef.current.querySelector(".counter-num");
    if (!el) return;
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 50,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}+`;
          },
        });
      },
    });
  }, []);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,6,20,0.88) 0%, rgba(8,6,20,0.45) 60%, rgba(8,6,20,0.3) 100%)",
            }}
          />
        </div>

        <div className="jazbaa-container relative z-10 pb-16 pt-40">
          <p
            className="section-label mb-5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            JAZBAA Events
          </p>

          <h1
            ref={heroHeadRef}
            className="font-display font-bold leading-[1.0] tracking-tight overflow-hidden mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            {["Upcoming", "Events"].map((word) => (
              <span key={word} className="block overflow-hidden">
                <span
                  className="hero-word inline-block text-white"
                  style={{ opacity: 0 }}
                >
                  {word === "Events" ? (
                    <span style={{ color: "oklch(0.82 0.16 75)" }}>{word}</span>
                  ) : (
                    word
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <p
              className="events-hero-sub max-w-md text-base font-body leading-relaxed text-white/65"
              style={{ opacity: 0 }}
            >
              Workshops, jams, and community sessions across India.
            </p>
            <div
              ref={statsRef}
              className="events-hero-sub flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                opacity: 0,
              }}
            >
              <span className="counter-num text-4xl font-display font-bold text-white">
                50+
              </span>
              <span className="text-xs font-mono text-white/60 tracking-wider uppercase leading-tight">
                Events
                <br />
                this season
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Filter Tabs ──────────────────────────────────────────────────── */}
      <section
        ref={filterRef}
        className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50"
      >
        <div className="jazbaa-container py-0">
          <div
            ref={filterContainerRef}
            className="relative flex items-center gap-0 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
            data-ocid="event-filter-tabs"
          >
            {FILTER_TABS.map((tab) => (
              <button
                type="button"
                key={tab}
                data-filter={tab}
                className="relative flex-shrink-0 px-5 py-5 text-sm font-body font-medium transition-colors duration-200 whitespace-nowrap"
                style={{
                  color:
                    activeFilter === tab
                      ? "oklch(0.52 0.22 270)"
                      : "oklch(0.52 0.012 260)",
                }}
                onClick={() => {
                  setActiveFilter(tab);
                  setTimeout(() => {
                    emblaApiRef.current?.reInit();
                    setActiveIndex(0);
                  }, 0);
                }}
                data-ocid={`filter-tab-${tab.toLowerCase()}`}
              >
                {tab}
              </button>
            ))}
            <span
              ref={underlineRef}
              className="absolute bottom-0 h-0.5 rounded-full"
              style={{
                background: "var(--gradient-accent)",
                left: 0,
                width: 60,
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── Horizontal Scroll Gallery ────────────────────────────────────── */}
      <section
        ref={carouselSectionRef}
        className="py-16 bg-background overflow-hidden"
      >
        <div className="jazbaa-container mb-8">
          <div className="flex items-end justify-between">
            <p className="section-label">Explore Events</p>
            <p className="text-xs font-mono text-muted-foreground">
              {filteredEvents.length} event
              {filteredEvents.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div
            className="jazbaa-container flex flex-col items-center justify-center py-24 gap-4"
            data-ocid="events-empty-state"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.52 0.22 270 / 0.08)" }}
            >
              <Calendar
                className="w-7 h-7"
                style={{ color: "oklch(0.52 0.22 270)" }}
              />
            </div>
            <p className="font-display font-bold text-xl">
              No events in this category yet
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon — something exciting is being planned.
            </p>
          </div>
        ) : (
          <div
            className="pl-6 md:pl-12 lg:pl-20"
            ref={emblaRef}
            style={{ overflow: "hidden" }}
          >
            <div className="flex gap-5 cursor-grab active:cursor-grabbing">
              {filteredEvents.map((event, i) => (
                <div
                  key={event.id}
                  data-card-index={i}
                  style={{
                    filter:
                      Math.abs(i - activeIndex) > 2 ? "blur(1px)" : "none",
                    opacity: Math.abs(i - activeIndex) > 3 ? 0.7 : 1,
                    transition: "filter 0.3s ease, opacity 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  <EventCard
                    event={event}
                    index={i}
                    onSelect={setSelectedEvent}
                  />
                </div>
              ))}
              <div style={{ width: "80px", flexShrink: 0 }} />
            </div>
          </div>
        )}
      </section>

      {/* ─── Past Events ──────────────────────────────────────────────────── */}
      <section
        ref={pastRef}
        className="py-20"
        style={{
          background: "oklch(0.975 0.004 260)",
          borderTop: "1px solid oklch(0.91 0.008 260)",
        }}
      >
        <div className="jazbaa-container">
          <div className="flex flex-col gap-3 mb-12 gsap-reveal">
            <p className="section-label">Previously</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Past Events
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg">
              A look back at what the community has created together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAST_EVENTS.map((event) => (
              <PastEventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="flex justify-center mt-16 gsap-reveal">
            <a
              href="/join"
              className="btn-primary inline-flex items-center gap-3"
              data-ocid="events-join-cta"
            >
              Host Your Own Event <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {selectedEvent && (
        <EventDetailPanel
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
