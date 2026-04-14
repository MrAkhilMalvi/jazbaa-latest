import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jazbaa-secret";
const TOKEN_EXPIRATION = "7d";

export function signToken(principal) {
  return jwt.sign({ principal }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
