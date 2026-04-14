import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  loginUser,
  registerUser,
  refreshUser,
  type AuthResponse,
  type LoginPayload,
  type SignupPayload,
  type UserProfile,
} from "@/api/auth";

const TOKEN_KEY = "jazbaa-auth-token";
const USER_KEY = "jazbaa-auth-user";

type AuthContextType = {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(TOKEN_KEY);
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(USER_KEY);
    return stored ? (JSON.parse(stored) as UserProfile) : null;
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function restoreAuth() {
      if (!token) {
        setIsReady(true);
        return;
      }

      if (user) {
        setIsReady(true);
        return;
      }

      try {
        const profile = await refreshUser(token);
        window.localStorage.setItem(USER_KEY, JSON.stringify(profile));
        setUser(profile);
      } catch {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsReady(true);
      }
    }

    restoreAuth();
  }, [token, user]);

  const saveSession = (response: AuthResponse) => {
    window.localStorage.setItem(TOKEN_KEY, response.token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
  };

  const clearSession = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const login = async (payload: LoginPayload) => {
    const response = await loginUser(payload);
    saveSession(response);
  };

  const register = async (payload: SignupPayload) => {
    const response = await registerUser(payload);
    saveSession(response);
  };

  const logout = () => {
    clearSession();
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isReady,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
