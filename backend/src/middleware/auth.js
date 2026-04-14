import { verifyToken } from "../utils/jwt.js";
import { findUserByPrincipal } from "../services/userService.js";

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = header.slice(7);
  try {
    const payload = verifyToken(token);
    if (!payload || typeof payload !== "object" || typeof payload.principal !== "string") {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const user = findUserByPrincipal(payload.principal);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
