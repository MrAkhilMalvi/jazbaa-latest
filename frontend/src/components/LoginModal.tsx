import { gsap } from "gsap";
import { Fingerprint, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";

interface LoginModalProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({
  onClose,
  onSwitchToSignup,
}: LoginModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDialogElement>(null);
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) return;
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      card,
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out", delay: 0.05 },
    );
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
    gsap.to(cardRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.97,
      duration: 0.25,
      onComplete: onClose,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
      data-ocid="login.dialog"
    >
      <dialog
        ref={cardRef}
        open
        className="relative w-full max-w-md rounded-2xl overflow-hidden border-0 p-0 m-0"
        style={{
          background: "#ffffff",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
        }}
        aria-label="Login"
      >
        <div className="h-1 w-full" style={{ background: "var(--color-accent)" }} />
        <div className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "var(--color-accent)" }}>
                  <span className="text-white font-bold text-xs">J</span>
                </div>
                <span className="section-label" style={{ color: "var(--color-accent)" }}>
                  JAZBAA
                </span>
              </div>
              <h2 className="font-display font-bold" style={{ fontSize: "1.625rem", letterSpacing: "-0.03em", color: "var(--color-text-primary)" }}>
                Welcome back
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
                Sign in with your email and password.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-2 transition-smooth hover:bg-gray-100"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Close login modal"
              data-ocid="login.close_button"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-var(--color-accent)"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-var(--color-accent)"
              />
            </label>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-[#b42318]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 font-display font-semibold text-white"
              style={{
                background: isSubmitting ? "rgba(232,93,38,0.6)" : "var(--color-accent)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: "0 4px 20px rgba(232,93,38,0.28)",
              }}
              data-ocid="login.primary_button"
            >
              <Fingerprint size={20} />
              {isSubmitting ? "Signing in..." : "Log in"}
            </button>
          </form>

          <p className="text-center mt-5" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="font-semibold transition-smooth hover:opacity-70"
              style={{ color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer" }}
              data-ocid="login.secondary_button"
            >
              Sign up
            </button>
          </p>
        </div>
      </dialog>
    </div>
  );
}
