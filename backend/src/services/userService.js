import { randomUUID } from "crypto";

const usersByEmail = new Map();
const usersByPrincipal = new Map();

export function findUserByEmail(email) {
  return usersByEmail.get(email.toLowerCase());
}

export function findUserByPrincipal(principal) {
  return usersByPrincipal.get(principal);
}

export function createUser({ name, email, passwordHash, role, city, track }) {
  const principal = randomUUID();
  const user = {
    principal,
    name,
    email: email.toLowerCase(),
    passwordHash,
    role,
    city,
    track,
    createdAt: new Date().toISOString(),
  };

  usersByEmail.set(user.email, user);
  usersByPrincipal.set(principal, user);
  return user;
}

export function createUserProfile(user) {
  return {
    principal: user.principal,
    name: user.name,
    email: user.email,
    role: user.role,
    city: user.city,
    track: user.track,
    createdAt: user.createdAt,
  };
}
