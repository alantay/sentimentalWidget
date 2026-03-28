import cors from "cors";
import express from "express";
import { z } from "zod";
import { addSubmission, getSummary } from "./feedbackStore";

const app = express();
const PORT = 3001;

const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional().default(""),
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://backend-integration.d1y15iaue9shp7.amplifyapp.com",
    ],
  }),
);

app.use(express.json());

app.get("/api/health", (_, res) => {
  res.json({ ok: true });
});

app.post("/api/feedback", (req, res) => {
  const parsed = feedbackSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400);
  }

  const { rating, comment } = parsed.data;

  addSubmission({ rating, comment });
  return res.status(201).json({ message: "Feedback successfully" });
});

app.get("/api/feedback/summary", (_, res) => {
  res.json(getSummary());
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
