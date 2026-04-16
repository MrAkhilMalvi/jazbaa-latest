import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app; 