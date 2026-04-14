import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { gsap } from "gsap";
import { ChevronDown, Fingerprint, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const VOLUNTEER_ROLES = [
  {
    value: "weekend-volunteer",
    label: "Weekend Volunteer",
    desc: "Show up, contribute, celebrate",
  },
  {
    value: "passion-lead",
    label: "Passion Lead",
    desc: "Lead a creative track in your city",
  },
  {
    value: "anchor",
    label: "Anchor",
    desc: "Own a chapter & build the community",
  },
];

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

type FormState = {
  name: string;
  email: string;
  password: string;
  role: string;
  city: string;
  track: string;
};

export default function SignupModal({
  onClose,
  onSwitchToLogin,
}: SignupModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDialogElement>(null);
  const { login, loginStatus } = useInternetIdentity();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    role: "",
    city: "",
    track: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});

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
      { opacity: 0, y: 36, scale: 0.97 },
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
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = () => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "At least 6 characters";
    if (!form.role) errs.role = "Select your role";
    if (!form.city) errs.city = "Select your city";
    if (!form.track) errs.track = "Select a creative track";
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
      data-ocid="signup.dialog"
    >
      <dialog
        ref={cardRef}
        open
        className="relative w-full max-w-lg rounded-2xl overflow-y-auto border-0 p-0 m-0"
        style={{
          background: "#ffffff",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
          maxHeight: "90vh",
        }}
        aria-label="Sign up"
      >
        <div
          className="h-1 w-full"
          style={{ background: "var(--color-accent)" }}
        />

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
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
                Join the movement
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.25rem",
                }}
              >
                Create your free JAZBAA account
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-2 transition-smooth"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Close signup modal"
              data-ocid="signup.close_button"
            >
              <X size={18} />
            </button>
          </div>

          <fieldset className="border-0 p-0 m-0 mb-6">
            <legend
              className="font-display font-semibold mb-3"
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-text-primary)",
              }}
            >
              I want to join as a
            </legend>
            <div className="grid gap-2">
              {VOLUNTEER_ROLES.map((r) => (
                <label
                  key={r.value}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-smooth"
                  style={{
                    border:
                      form.role === r.value
                        ? "1.5px solid var(--color-accent)"
                        : "1.5px solid var(--color-border)",
                    background:
                      form.role === r.value
                        ? "var(--color-accent-soft)"
                        : "#fafafa",
                  }}
                  data-ocid="signup.radio"
                >
                  <input
                    type="radio"
                    name="volunteer-role"
                    value={r.value}
                    checked={form.role === r.value}
                    onChange={() => setField("role", r.value)}
                    className="sr-only"
                  />
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor:
                        form.role === r.value
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                    }}
                  >
                    {form.role === r.value && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--color-accent)" }}
                      />
                    )}
                  </div>
                  <div>
                    <div
                      className="font-display font-semibold"
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {r.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {r.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors.role && (
              <span
                className="text-xs mt-1 block"
                style={{ color: "var(--color-accent)" }}
                data-ocid="signup.field_error"
              >
                {errors.role}
              </span>
            )}
          </fieldset>

          <button
            type="button"
            onClick={() => {
              if (validate()) login();
            }}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 mb-5 font-display font-semibold transition-smooth"
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
            data-ocid="signup.primary_button"
          >
            <Fingerprint size={20} />
            {isLoading ? "Setting up..." : "Sign up with Internet Identity"}
          </button>

          <div className="flex items-center gap-3 mb-5">
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
              or fill in details
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--color-border)" }}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <FormField id="signup-name" label="Full Name" error={errors.name}>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Priya Sharma"
                style={fieldStyle(!!errors.name)}
                data-ocid="signup.input"
              />
            </FormField>

            <FormField id="signup-email" label="Email" error={errors.email}>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="priya@example.com"
                style={fieldStyle(!!errors.email)}
                data-ocid="signup.input"
              />
            </FormField>

            <FormField
              id="signup-password"
              label="Password"
              error={errors.password}
            >
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                placeholder="Min. 6 characters"
                style={fieldStyle(!!errors.password)}
                data-ocid="signup.input"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField id="signup-city" label="City" error={errors.city}>
                <SelectField
                  id="signup-city"
                  value={form.city}
                  onChange={(v) => setField("city", v)}
                  options={CITIES}
                  placeholder="Select city"
                  hasError={!!errors.city}
                />
              </FormField>
              <FormField
                id="signup-track"
                label="Creative Track"
                error={errors.track}
              >
                <SelectField
                  id="signup-track"
                  value={form.track}
                  onChange={(v) => setField("track", v)}
                  options={TRACKS}
                  placeholder="Select track"
                  hasError={!!errors.track}
                />
              </FormField>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary mt-1"
              style={{ opacity: isLoading ? 0.6 : 1 }}
              data-ocid="signup.submit_button"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p
            className="text-center mt-5"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold transition-smooth hover:opacity-70"
              style={{
                color: "var(--color-accent)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              data-ocid="signup.secondary_button"
            >
              Log in
            </button>
          </p>
        </div>
      </dialog>
    </div>
  );
}

function fieldStyle(hasError: boolean): React.CSSProperties {
  return {
    border: hasError
      ? "1.5px solid var(--color-accent)"
      : "1.5px solid var(--color-border)",
    fontSize: "0.9375rem",
    background: "#fafafa",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-body)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
  };
}

function FormField({
  id,
  label,
  error,
  children,
}: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-display font-semibold"
        style={{ fontSize: "0.8125rem", color: "var(--color-text-primary)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          className="text-xs"
          style={{ color: "var(--color-accent)" }}
          data-ocid="signup.field_error"
        >
          {error}
        </span>
      )}
    </div>
  );
}

function SelectField({
  id,
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  hasError: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...fieldStyle(hasError),
          appearance: "none",
          paddingRight: "2rem",
        }}
        data-ocid="signup.select"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--color-text-secondary)" }}
      />
    </div>
  );
}
