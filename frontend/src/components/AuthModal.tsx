import { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export type AuthModalView = "login" | "signup";

interface AuthModalProps {
  initialView?: AuthModalView;
  onClose: () => void;
}

export default function AuthModal({
  initialView = "login",
  onClose,
}: AuthModalProps) {
  const [view, setView] = useState<AuthModalView>(initialView);

  if (view === "login") {
    return (
      <LoginModal
        onClose={onClose}
        onSwitchToSignup={() => setView("signup")}
      />
    );
  }

  return (
    <SignupModal onClose={onClose} onSwitchToLogin={() => setView("login")} />
  );
}
