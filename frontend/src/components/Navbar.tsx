import { Link, useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";
import { LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AuthModal from "./AuthModal";
import type { AuthModalView } from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/join", label: "Join" },
  { to: "/landing", label: "Explore" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<AuthModalView | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -72, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 },
    );
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu || !menuOpen) return;
    gsap.fromTo(
      menu,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );
    gsap.fromTo(
      menu.querySelectorAll("a, button"),
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.05,
      },
    );
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const userLabel = user ? user.name || user.email.split("@")[0] : "Member";

  return (
    <>
      <nav
        ref={navRef}
        data-ocid="navbar"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "72px",
          backgroundColor: scrolled ? "#ffffff" : "transparent",
          boxShadow: scrolled ? "0 1px 0 #e8e8e8" : "none",
          transition: "background-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div className="jazbaa-container h-full">
          <div className="flex items-center justify-between h-full">
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="JAZBAA Home"
              data-cursor="pointer"
            >
              <img
                src="/assets/images/jazbaa-logo.png"
                alt="JAZBAA Logo"
                className={`h-12 md:h-24 w-auto object-contain transition-all duration-300 ${
                  scrolled ? "brightness-100" : "brightness-0 invert"
                }`}
              />

              <span
                className={`font-display font-black text-2xl md:text-3xl uppercase transition-all duration-500 ${
                  scrolled
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent"
                    : "text-white"
                }`}
                style={{
                  letterSpacing: "0.15em",
                  textShadow: scrolled
                    ? "none"
                    : "0 4px 24px rgba(255, 255, 255, 0.45)",
                  transform: scrolled ? "scale(0.95)" : "scale(1)",
                  transformOrigin: "left center",
                }}
              >
                JAZBAA
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link ${pathname === to ? "active" : ""}`}
                  data-ocid={`nav-link-${label.toLowerCase()}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full px-3 py-2 transition-smooth"
                    style={{
                      border: "1.5px solid var(--color-border)",
                      background: "transparent",
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                    }}
                    aria-label="User menu"
                    data-ocid="nav-user-button"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "var(--color-accent)" }}
                    >
                      <User size={12} color="#fff" />
                    </div>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {userLabel}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden"
                      style={{
                        background: "#ffffff",
                        border: "1px solid var(--color-border)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        minWidth: "160px",
                      }}
                      data-ocid="nav-user-dropdown"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 transition-smooth text-left"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-primary)",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        data-ocid="nav-logout-button"
                      >
                        <LogOut size={14} />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setAuthModal("login")}
                    className="btn-outline"
                    style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem" }}
                    data-ocid="nav-login-button"
                    data-cursor="pointer"
                  >
                    Log in
                  </button>
                  <Link
                    to="/join"
                    className="btn-primary"
                    style={{
                      padding: "0.625rem 1.25rem",
                      fontSize: "0.8125rem",
                    }}
                    data-ocid="nav-cta-join"
                    data-cursor="pointer"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg transition-smooth"
              style={{ color: "var(--color-text-primary)" }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-ocid="nav-menu-toggle"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          style={{
            backgroundColor: "#ffffff",
            paddingTop: "80px",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingBottom: "2rem",
          }}
          data-ocid="mobile-menu"
        >
          <nav className="flex flex-col flex-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-display font-bold py-5 border-b transition-smooth"
                style={{
                  fontSize: "1.75rem",
                  letterSpacing: "-0.02em",
                  color:
                    pathname === to
                      ? "var(--color-accent)"
                      : "var(--color-text-primary)",
                  borderColor: "var(--color-border)",
                }}
                data-ocid={`mobile-nav-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 mt-8">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="btn-outline text-center"
                data-ocid="mobile-nav-logout"
              >
                Log out
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setAuthModal("login");
                  }}
                  className="btn-outline text-center"
                  data-ocid="mobile-nav-login"
                >
                  Log in
                </button>
                <Link
                  to="/join"
                  className="btn-primary text-center"
                  data-ocid="mobile-nav-cta"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {authModal && (
        <AuthModal initialView={authModal} onClose={() => setAuthModal(null)} />
      )}
    </>
  );
}
