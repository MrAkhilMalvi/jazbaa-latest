import { gsap } from "gsap";
import { ChevronDown, Fingerprint, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Other",
];

const TRACKS = [
  "Dance",
  "Music",
  "Drawing",
  "Painting",
  "Photography",
  "Fitness",
  "Tech",
  "Cooking",
];

const VOLUNTEER_ROLES = [
  { value: "weekend-volunteer", label: "Weekend Volunteer", desc: "Show up, contribute, celebrate" },
  { value: "passion-lead", label: "Passion Lead", desc: "Lead a creative track in your city" },
  { value: "anchor", label: "Anchor", desc: "Own a chapter & build the community" },
];

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  city: string;
  track: string;
};

export default function SignupModal({ onClose, onSwitchToLogin }: SignupModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDialogElement>(null);
  const { register } = useAuth();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    city: "",
    track: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) return;
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      card,
      { opacity: 0, y: 36, scale: 0.97 },
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

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.password) nextErrors.password = "Password is required.";
    else if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords must match.";
    if (!form.role) nextErrors.role = "Select a volunteer role.";
    if (!form.city) nextErrors.city = "Select your city.";
    if (!form.track) nextErrors.track = "Select a creative track.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setBackendError(null);
    setIsSubmitting(true);

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        city: form.city,
        track: form.track,
      });
      onClose();
    } catch (err: unknown) {
      setBackendError(err instanceof Error ? err.message : "Unable to register.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
      data-ocid="signup.dialog"
    >
      <dialog
        ref={cardRef}
        open
        className="relative w-full max-w-lg rounded-2xl overflow-y-auto border-0 p-0 m-0"
        style={{
          background: "#ffffff",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
          maxHeight: "90vh",
        }}
        aria-label="Sign up"
      >
        <div className="h-1 w-full" style={{ background: "var(--color-accent)" }} />

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
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
                Create your account
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
                Register with your email and complete your profile.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-2 transition-smooth hover:bg-gray-100"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Close signup modal"
              data-ocid="signup.close_button"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Priya Sharma"
                  className={fieldClass(!!errors.name)}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass(!!errors.email)}
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Password" error={errors.password}>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="Create a password"
                  className={fieldClass(!!errors.password)}
                />
              </Field>
              <Field label="Confirm password" error={errors.confirmPassword}>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setField("confirmPassword", e.target.value)}
                  placeholder="Repeat your password"
                  className={fieldClass(!!errors.confirmPassword)}
                />
              </Field>
            </div>

            <Field label="Volunteer role" error={errors.role}>
              <div className="grid gap-3">
                {VOLUNTEER_ROLES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setField("role", option.value)}
                    className="rounded-2xl border p-4 text-left transition-smooth"
                    style={{
                      borderColor: form.role === option.value ? "var(--color-accent)" : "var(--color-border)",
                      background: form.role === option.value ? "var(--color-accent-soft)" : "#fafafa",
                    }}
                  >
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-slate-600">{option.desc}</div>
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="City" error={errors.city}>
                <select
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className={fieldClass(!!errors.city)}
                >
                  <option value="">Select city</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Creative track" error={errors.track}>
                <select
                  value={form.track}
                  onChange={(e) => setField("track", e.target.value)}
                  className={fieldClass(!!errors.track)}
                >
                  <option value="">Select track</option>
                  {TRACKS.map((track) => (
                    <option key={track} value={track}>
                      {track}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {backendError && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-[#b42318]">
                {backendError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl py-3.5 font-display font-semibold text-white"
              style={{
                background: isLoading ? "rgba(232,93,38,0.6)" : "var(--color-accent)",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-center mt-5" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold transition-smooth hover:opacity-70"
              style={{ color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer" }}
            >
              Log in
            </button>
          </p>
        </div>
      </dialog>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold">{label}</span>
      {children}
      {error && <span className="text-xs text-[#b42318]">{error}</span>}
    </label>
  );
}

function fieldClass(hasError: boolean) {
  return `rounded-xl border px-4 py-3 bg-slate-50 outline-none transition-smooth ${
    hasError ? "border-[#b42318]" : "border-slate-200"
  }`;
}
