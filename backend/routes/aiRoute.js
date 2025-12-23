import express from "express";
import { InferenceClient } from "@huggingface/inference";

const router = express.Router();
const client = new InferenceClient({ accessToken: process.env.HF_API_KEY });

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const output = await client.textGeneration({
      model: "google/flan-t5-small", // free-tier compatible
      inputs: message,
      parameters: { max_new_tokens: 150, temperature: 0.7 },
    });

    const reply = output[0]?.generated_text || "AI did not respond";
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

export default router;
