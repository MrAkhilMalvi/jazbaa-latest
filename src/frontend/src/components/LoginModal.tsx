import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { gsap } from "gsap";
import { Eye, EyeOff, Fingerprint, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const { login, loginStatus } = useInternetIdentity();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  useEffect(() => {
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) return;
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    gsap.fromTo(
      card,
      { opacity: 0, y: 32, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        delay: 0.05,
      },
    );
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    login();
  };

  const isLoading = loginStatus === "logging-in";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
      }}
      data-ocid="login.dialog"
    >
      <dialog
        ref={cardRef}
        open
        className="relative w-full max-w-md rounded-2xl overflow-hidden border-0 p-0 m-0"
        style={{
          background: "#ffffff",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
        }}
        aria-label="Login"
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: "var(--color-accent)" }}
        />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ background: "var(--color-accent)" }}
                >
                  <span className="text-white font-bold text-xs">J</span>
                </div>
                <span
                  className="section-label"
                  style={{ color: "var(--color-accent)" }}
                >
                  JAZBAA
                </span>
              </div>
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: "1.625rem",
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-primary)",
                }}
              >
                Welcome back
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Log in to your JAZBAA account
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

          {/* Internet Identity CTA */}
          <button
            type="button"
            onClick={() => login()}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 mb-6 font-display font-semibold transition-smooth"
            style={{
              background: isLoading
                ? "rgba(232,93,38,0.6)"
                : "var(--color-accent)",
              color: "#ffffff",
              fontSize: "0.9375rem",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 20px rgba(232,93,38,0.28)",
            }}
            data-ocid="login.primary_button"
          >
            <Fingerprint size={20} />
            {isLoading
              ? "Authenticating..."
              : "Continue with Internet Identity"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex-1 h-px"
              style={{ background: "var(--color-border)" }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-secondary)",
              }}
            >
              or sign in with email
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--color-border)" }}
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                className="font-display font-semibold"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-primary)",
                }}
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: undefined }));
                }}
                placeholder="you@example.com"
                className="rounded-xl px-4 py-3 outline-none transition-smooth w-full"
                style={{
                  border: `1.5px solid ${errors.email ? "var(--color-accent)" : "var(--color-border)"}`,
                  fontSize: "0.9375rem",
                  background: "#fafafa",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                }}
                data-ocid="login.input"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "login-email-error" : undefined
                }
              />
              {errors.email && (
                <span
                  id="login-email-error"
                  className="text-xs"
                  style={{ color: "var(--color-accent)" }}
                  data-ocid="login.field_error"
                >
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-password"
                className="font-display font-semibold"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-primary)",
                }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 pr-12 outline-none transition-smooth"
                  style={{
                    border: `1.5px solid ${errors.password ? "var(--color-accent)" : "var(--color-border)"}`,
                    fontSize: "0.9375rem",
                    background: "#fafafa",
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                  data-ocid="login.input"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "login-pw-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-smooth"
                  style={{ color: "var(--color-text-secondary)" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span
                  id="login-pw-error"
                  className="text-xs"
                  style={{ color: "var(--color-accent)" }}
                  data-ocid="login.field_error"
                >
                  {errors.password}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary mt-2"
              style={{ opacity: isLoading ? 0.6 : 1 }}
              data-ocid="login.submit_button"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Footer */}
          <p
            className="text-center mt-6"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="font-semibold transition-smooth hover:opacity-70"
              style={{
                color: "var(--color-accent)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
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
