import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Express backend is running" });
});

app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
