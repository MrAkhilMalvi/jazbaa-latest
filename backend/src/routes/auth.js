import express from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, createUserProfile } from "../services/userService.js";
import { signToken } from "../utils/jwt.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { name, email, password, role, city, track } = req.body;
  if (!name || !email || !password || !role || !city || !track) {
    return res.status(400).json({ error: "Missing required registration fields" });
  }

  const normalizedEmail = email.toLowerCase();
  if (findUserByEmail(normalizedEmail)) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const passwordHash = bcrypt.hashSync(password, 8);
  const user = createUser({ name, email: normalizedEmail, passwordHash, role, city, track });

  return res.json({
    token: signToken(user.principal),
    user: createUserProfile(user),
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const normalizedEmail = email.toLowerCase();
  const user = findUserByEmail(normalizedEmail);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  return res.json({
    token: signToken(user.principal),
    user: createUserProfile(user),
  });
});

router.get("/profile", authMiddleware, (req, res) => {
  return res.json(createUserProfile(req.user));
});

export default router;
