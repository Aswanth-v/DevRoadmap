import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

/**
 * Utility: timeout wrapper
 */
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("AI_TIMEOUT")), ms)
    ),
  ]);
}

router.post("/chat", async (req, res) => {
  console.log("RAW BODY:", req.body);

  const { message } = req.body;

  /* -------------------- INPUT VALIDATION -------------------- */

  if (message === undefined) {
    return res.status(400).json({
      error: "Message field is required",
    });
  }

  if (typeof message !== "string") {
    return res.status(422).json({
      error: "Message must be a string",
    });
  }

  if (!message.trim()) {
    return res.status(400).json({
      error: "Message cannot be empty",
    });
  }

  /* -------------------- AI CALL -------------------- */
  try {
    const completion = await withTimeout(
      client.chat.completions.create({
        model: "moonshotai/Kimi-K2-Instruct-0905",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        max_tokens: 200,
      }),
      10_000
    );

    // 🔍 FULL RAW AI RESPONSE
    console.log("AI RAW RESPONSE:", completion);

    const reply =
      completion?.choices?.[0]?.message?.content ??
      "Sorry, I could not generate a response.";

    // 🔍 FINAL EXTRACTED TEXT
    console.log("AI FINAL REPLY:", reply);

    return res.json({ reply });
  } catch (err) {
    console.error("AI ERROR:", err);

    if (err.message === "AI_TIMEOUT") {
      return res.status(503).json({
        error: "AI service is currently unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
