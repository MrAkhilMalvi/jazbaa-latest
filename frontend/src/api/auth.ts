export type UserProfile = {
  principal: string;
  name: string;
  email: string;
  role: string;
  city: string;
  track: string;
  createdAt: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
  city: string;
  track: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: UserProfile;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.error || body?.message || response.statusText;
    throw new Error(message);
  }
  return response.json();
}

const API_BASE = "/api/auth";

export async function registerUser(
  payload: SignupPayload,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(response);
}

export async function loginUser(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(response);
}

export async function refreshUser(token: string): Promise<UserProfile> {
  const response = await fetch(`${API_BASE}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse<UserProfile>(response);
}
