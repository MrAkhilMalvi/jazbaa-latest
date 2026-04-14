import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      window.location.replace("/");
    }
  }, [isAuthenticated, isReady]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
