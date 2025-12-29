import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "moonshotai/Kimi-K2-Instruct-0905",
      messages: [
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });
  } catch (err) {
    console.error("AI error:", err.message);
    res.status(500).json({ error: "AI service failed" });
  }
});

export default router;
