import { useScrollReveal } from "@/hooks/useGSAP";
import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { useRef } from "react";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";

const FOOTER_LINKS = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
  ],
  Community: [
    { label: "Join Us", href: "/join" },
    { label: "Stories", href: "/landing" },
    { label: "Cities", href: "/about" },
  ],
  Connect: [
    { label: "Instagram", href: "https://instagram.com", external: true },
    { label: "Twitter / X", href: "https://x.com", external: true },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
  ],
} as const;

const SOCIAL_LINKS = [
  { icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: SiX, href: "https://x.com", label: "X (Twitter)" },
  { icon: SiYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  useScrollReveal(footerRef, ".gsap-reveal", {
    stagger: 0.08,
    start: "top 95%",
  });
  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      data-ocid="footer"
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="jazbaa-container">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand — spans 2 cols */}
          <div className="md:col-span-2 gsap-reveal">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-4"
              data-cursor="pointer"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <span className="text-white font-display font-bold text-xs">
                  J
                </span>
              </div>
              <span
                className="font-display font-bold text-lg tracking-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                JAZBAA
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs mt-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Igniting passion. Discovering purpose. A platform where creativity
              meets community — for those who dare to explore.
            </p>

            {/* Social row */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="pointer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-smooth"
                  style={{
                    border: "1.5px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-accent)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--color-text-secondary)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--color-border)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="gsap-reveal">
              <h4
                className="font-display font-semibold text-sm mb-5 tracking-wide"
                style={{ color: "var(--color-text-primary)" }}
              >
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => {
                  const isExternal =
                    "external" in links[0] &&
                    (
                      links as readonly {
                        label: string;
                        href: string;
                        external?: boolean;
                      }[]
                    ).find((l) => l.label === label)?.external;
                  return (
                    <li key={label}>
                      {isExternal ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm transition-smooth relative group inline-block"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--color-accent)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--color-text-secondary)";
                          }}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          to={href as "/"}
                          className="text-sm transition-smooth inline-block"
                          style={{ color: "var(--color-text-secondary)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--color-accent)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--color-text-secondary)";
                          }}
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 gsap-reveal"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            © {year} JAZBAA. Made with passion in India.
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth underline underline-offset-2"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "var(--color-text-secondary)";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
