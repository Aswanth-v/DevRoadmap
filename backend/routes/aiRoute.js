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
  const { message } = req.body;

  /* -------------------- INPUT VALIDATION -------------------- */

  // 400 – missing field
  if (message === undefined) {
    return res.status(400).json({
      error: "Message field is required",
    });
  }
  // 422 – wrong data type
  if (typeof message !== "string") {
    return res.status(422).json({
      error: "Message must be a string",
    });
  }
  // 400 – empty or whitespace
  if (!message.trim()) {
    return res.status(400).json({
      error: "Message cannot be empty",
    });
  }
  /* AI CALL */
  try {
    const completion = await withTimeout(
      client.chat.completions.create({
        model: "moonshotai/Kimi-K2-Instruct-0905",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        max_tokens: 200,
      }),
      10_000 // 10 seconds timeout
    );

    // Defensive check (AI APIs can return weird shapes)
    const reply =
      completion?.choices?.[0]?.message?.content ??
      "Sorry, I could not generate a response.";

    return res.json({ reply });
  } catch (err) {
    console.error("AI error:", err);
    // 503 – AI timeout / upstream failure
    if (err.message === "AI_TIMEOUT") {
      return res.status(503).json({
        error: "AI service is currently unavailable. Please try again later.",
      });
    }
    // 500 – unknown server error
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
